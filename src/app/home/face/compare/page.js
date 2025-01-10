'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useRouter } from 'next/navigation';

export default function Compare() {
    const [tempAccount, setTempAccount] = useState('');
    const [localUserStream, setLocalUserStream] = useState(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [faceApiLoaded, setFaceApiLoaded] = useState(false);
    const [loginResult, setLoginResult] = useState('PENDING');
    const [imageError, setImageError] = useState(false);
    const [counter, setCounter] = useState(5);
    const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState({});
    const videoRef = useRef();
    const canvasRef = useRef();
    const faceApiIntervalRef = useRef();
    const videoWidth = 640;
    const videoHeight = 360;
    const router = useRouter();

    useEffect(() => {
        // Set temporary account from query params (adjust according to your needs)
        const account = router.query.account; // Assuming account is passed as a query parameter
        if (account) {
            setTempAccount(JSON.parse(account));
        }
    }, [router.query]);

    const loadModels = async () => {
        const uri = '/models';

        await faceapi.nets.ssdMobilenetv1.loadFromUri(uri);
        await faceapi.nets.faceLandmark68Net.loadFromUri(uri);
        await faceapi.nets.faceRecognitionNet.loadFromUri(uri);
    };

    useEffect(() => {
        if (tempAccount) {
            loadModels()
                .then(async () => {
                    const labeledFaceDescriptors = await loadLabeledImages();
                    setLabeledFaceDescriptors(labeledFaceDescriptors);
                })
                .then(() => setModelsLoaded(true));
        }
    }, [tempAccount]);

    useEffect(() => {
        if (loginResult === 'SUCCESS') {
            const counterInterval = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);

            if (counter === 0) {
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.srcObject = null;
                }
                localUserStream?.getTracks().forEach((track) => track.stop());
                clearInterval(counterInterval);
                clearInterval(faceApiIntervalRef.current);
                localStorage.setItem('faceAuth', JSON.stringify({ status: true, account: tempAccount }));
                router.push('/protected');
            }

            return () => clearInterval(counterInterval);
        }
        setCounter(5);
    }, [loginResult, counter, localUserStream, tempAccount]);

    const getLocalUserVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
            videoRef.current.srcObject = stream;
            setLocalUserStream(stream);
        } catch (err) {
            console.error('Error accessing media devices.', err);
        }
    };

    const scanFace = async () => {
        faceapi.matchDimensions(canvasRef.current, videoRef.current);
        const faceApiInterval = setInterval(async () => {
            const detections = await faceapi
                .detectAllFaces(videoRef.current)
                .withFaceLandmarks()
                .withFaceDescriptors();
            const resizedDetections = faceapi.resizeResults(detections, {
                width: videoWidth,
                height: videoHeight,
            });

            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
            const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));

            if (!canvasRef.current) return;

            canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

            if (results.length > 0 && tempAccount.id === results[0].label) {
                setLoginResult('SUCCESS');
            } else {
                setLoginResult('FAILED');
            }

            if (!faceApiLoaded) {
                setFaceApiLoaded(true);
            }
        }, 1000 / 15);
        faceApiIntervalRef.current = faceApiInterval;
    };

    async function loadLabeledImages() {
        if (!tempAccount) {
            return null;
        }
        const descriptions = [];
        let img;

        try {
            const imgPath = `/temp-accounts/${tempAccount.picture}`;
            img = await faceapi.fetchImage(imgPath);
        } catch {
            setImageError(true);
            return;
        }

        const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (detections) {
            descriptions.push(detections.descriptor);
        }

        return new faceapi.LabeledFaceDescriptors(tempAccount.id, descriptions);
    }

    if (imageError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 max-w-xl mx-auto">
                <h2 className="text-center text-3xl font-extrabold text-rose-700">Upps! No profile picture found.</h2>
                <span>Please contact administration for registration or try again later.</span>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col items-center justify-center gap-6 max-w-xl mx-auto">
            {!localUserStream && !modelsLoaded && (
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    <span>You're Attempting to Log In With Your Face.</span>
                    <span className="text-indigo-600 mt-2">Loading Models...</span>
                </h2>
            )}
            {!localUserStream && modelsLoaded && (
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    <span>Please Recognize Your Face to Log In.</span>
                </h2>
            )}
            {localUserStream && loginResult === 'SUCCESS' && (
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    <span>We've successfully recognized your face!</span>
                    <span>Please stay {counter} more seconds...</span>
                </h2>
            )}
            {localUserStream && loginResult === 'FAILED' && (
                <h2 className="text-center text-3xl font-extrabold text-rose-700">
                    <span>Upps! We did not recognize your face.</span>
                </h2>
            )}
            {localUserStream && !faceApiLoaded && loginResult === 'PENDING' && (
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    <span>Scanning Face...</span>
                </h2>
            )}
            <div className="relative w-full flex flex-col items-center">
                <video
                    muted
                    autoPlay
                    ref={videoRef}
                    width={videoWidth}
                    height={videoHeight}
                    onPlay={scanFace}
                    style={{ display: localUserStream ? 'block' : 'none' }}
                />
                <canvas ref={canvasRef} style={{ position: 'absolute', display: localUserStream ? 'block' : 'none' }} />
            </div>
            {!localUserStream && (
                <button
                    onClick={getLocalUserVideo}
                    type="button"
                    className="py-2 px-4 bg-indigo-600 text-white rounded"
                >
                    Scan my face
                </button>
            )}
        </div>
    );
};