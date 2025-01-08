'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import * as faceapi from 'face-api.js';
import { useSearchParams,useRouter } from 'next/navigation';
import axios from '../../../libs/axios';


// Constants
const CONFIG = {
  VIDEO_WIDTH: 640,
  VIDEO_HEIGHT: 360,
  RECOGNITION_THRESHOLD: 0.6,
  MODEL_URL: '/models'
};

// StatusDisplay Component
function StatusDisplay({ state, expressions, userName }) {
  return (
    <div className="mt-4 p-4 rounded-lg bg-black-100 shadow-md">
      <div className="space-y-2">
        <p className="text-lg font-semibold flex items-center">
          <span
            className={`inline-block h-3 w-3 rounded-full mr-2 ${
              state.detectionState === 'recognized' ? 'bg-green-500' :
              state.detectionState === 'detecting' ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
          />
          Status: {state.detectionState.charAt(0).toUpperCase() + state.detectionState.slice(1)}
        </p>
        
        {state.isModelLoading && (
          <p className="text-blue-600 animate-pulse">Loading models...</p>
        )}
        
        {state.recognizedName && (
          <p className={`font-medium ${
            state.detectionState === 'recognized' ? 'text-green-600' : 'text-gray-600'
          }`}>
            {state.recognizedName}
          </p>
        )}
        
        {expressions && (
          <div className="mt-2">
            <p className="font-medium mb-1">Expressions:</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(expressions)
                .sort(([, a], [, b]) => b - a)
                .map(([expression, probability]) => (
                  <div key={expression} className="flex items-center justify-between">
                    <span className="capitalize">{expression}</span>
                    <span className="font-mono">{(probability * 100).toFixed(1)}%</span>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {state.errorMessage && (
          <p className="text-red-600 bg-red-50 p-2 rounded">
            {state.errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

// Custom hook for face detection setup
const useFaceDetection = () => {
  const [state, setState] = useState({
    isModelLoading: true,
    isWebcamLoading: true,
    detectionState: 'initializing',
    recognizedName: '',
    errorMessage: '',
    expressions: null
  });

  const [modelState, setModelState] = useState({
    modelsLoaded: false,
    referenceDescriptor: null
  });

  const updateState = useCallback((newState) => {
    setState(prev => ({ ...prev, ...newState }));
  }, []);

  return {
    state,
    modelState,
    updateState,
    setModelState
  };
};

export default function CompareDemo() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const router = useRouter();
  const [imageUrl,setImageUrl] = useState('');
  const [name,setName] = useState('');
  
  
  useEffect(()=>{
   const fetchData = async () =>{
    if (email){
        try {
            const response = await axios.get(`/api/home/compare/${email}`);
            const data = response.data;

            setImageUrl(data.image_url);
            setName(data.name);
            console.log(data);
            console.log(email);                                                   
        } catch (error) {
            console.error("gagal melakukan fetch data",error);
            updateState({
                errorMessage:'gagal load data',
                detectionState:'error'
            })
        }
    }
   } 
   fetchData();
  },[])
  const {
    state,
    modelState,
    updateState,
    setModelState
  } = useFaceDetection();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const detectionRef = useRef(null);
  const isUnmounted = useRef(false);

  // Load models and reference image
  const loadModels = useCallback(async () => {
    if (isUnmounted.current) return;
    
    try {
      updateState({ isModelLoading: true });
      
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(CONFIG.MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(CONFIG.MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(CONFIG.MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(CONFIG.MODEL_URL)
      ]);

      if (!imageUrl || isUnmounted.current) return;

      const img = await faceapi.fetchImage(imageUrl);
      const detection = await faceapi
        .detectSingleFace(img, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        throw new Error('No face detected in reference image');
      }

      if (isUnmounted.current) return;

      setModelState({
        modelsLoaded: true,
        referenceDescriptor: detection.descriptor
      });

      updateState({
        isModelLoading: false,
        detectionState: 'detecting'
      });
    } catch (error) {
      console.error('Setup error:', error);
      if (!isUnmounted.current) {
        updateState({
          errorMessage: `Setup error: ${error.message}`,
          detectionState: 'error',
          isModelLoading: false
        });
      }
    }
  }, [imageUrl, updateState, setModelState]);

  // Initialize webcam
  const startWebcam = useCallback(async () => {
    if (isUnmounted.current) return;

    try {
      updateState({ isWebcamLoading: true });
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: CONFIG.VIDEO_WIDTH,
          height: CONFIG.VIDEO_HEIGHT,
          facingMode: 'user'
        }
      });

      if (isUnmounted.current) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }

      updateState({ isWebcamLoading: false });
    } catch (error) {
      console.error('Webcam error:', error);
      if (!isUnmounted.current) {
        updateState({
          errorMessage: `Webcam access error: ${error.message}`,
          detectionState: 'error',
          isWebcamLoading: false
        });
      }
    }
  }, [updateState]);

  // Face detection process
  const detectFaces = useCallback(async () => {
    if (isUnmounted.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video?.readyState === 4 || 
        !canvas || 
        !modelState.modelsLoaded || 
        !modelState.referenceDescriptor) {
      if (!isUnmounted.current) {
        detectionRef.current = requestAnimationFrame(detectFaces);
      }
      return;
    }
    
    try {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withFaceExpressions();

      if (isUnmounted.current) return;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      if (detections.length > 0) {
        const detection = detections[0];
        const match = faceapi.euclideanDistance(
          detection.descriptor,
          modelState.referenceDescriptor
        );
        
        const isRecognized = match < CONFIG.RECOGNITION_THRESHOLD;
        updateState({
          detectionState: match < CONFIG.RECOGNITION_THRESHOLD ? 'recognized' : 'detecting',
          recognizedName: match < CONFIG.RECOGNITION_THRESHOLD ? `Match found! (${name})` : 'Not Registered',
          expressions: detection.expressions
        });
        if (isRecognized) {
          // Tunggu sebentar sebelum redirect
          setTimeout(() => {
            router.push("/");
          }, 2000); // Tunggu 2 detik
    
        }
      } else {
        updateState({
          recognizedName: 'No faces detected',
          expressions: null
        });
      }
    } catch (error) {
      console.error('Detection error:', error);
      if (!isUnmounted.current) {
        updateState({
          errorMessage: `Detection error: ${error.message}`,
          detectionState: 'error'
        });
      }
    }

    if (!isUnmounted.current) {
      detectionRef.current = requestAnimationFrame(detectFaces);
    }
  }, [modelState, name, updateState,router]);

  useEffect(()=>{
    detectFaces();
  },[detectFaces]);

  // Initialize component
  useEffect(() => {
    isUnmounted.current = false;
    loadModels();
    startWebcam();

    const cleanupVideo = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };

    return () => {
      isUnmounted.current = true;
      cleanupVideo();
      if (detectionRef.current) {
        cancelAnimationFrame(detectionRef.current);
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [loadModels, startWebcam]);

  // Start detection when models are loaded
  useEffect(() => {
    let videoElement = videoRef.current;

    if (modelState.modelsLoaded && videoElement) {
      const handlePlay = () => {
        if (!isUnmounted.current) {
          detectFaces();
        }
      };

      videoElement.addEventListener('play', handlePlay);
      
      return () => {
        if (videoElement) {
          videoElement.removeEventListener('play', handlePlay);
        }
        if (detectionRef.current) {
          cancelAnimationFrame(detectionRef.current);
        }
      };
    }
  }, [modelState.modelsLoaded, detectFaces]);

  return (
    <div className="relative max-w-2xl mx-auto p-4">
      <div className="relative bg-white rounded-lg overflow-hidden shadow-xl">
        <video 
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full object-cover"
          style={{ maxWidth: CONFIG.VIDEO_WIDTH }}
        />
        <canvas 
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      
      <StatusDisplay 
        className="text-black" 
        state={state}
        expressions={state.expressions}
        userName={name}
      />
    </div>
  );
}