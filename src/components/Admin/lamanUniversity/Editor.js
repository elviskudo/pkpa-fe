import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    }, [onTextChange, onSelectionChange]);

    useEffect(() => {
      if (ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [readOnly, ref]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div')
      );

      const quill = new Quill(editorContainer, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image']
          ],
        },
      });

      ref.current = quill;

      // Set default value
      if (defaultValueRef.current) {
        quill.clipboard.dangerouslyPasteHTML(defaultValueRef.current);
      }

      // Listen for text changes and update formik value
      quill.on(Quill.events.TEXT_CHANGE, () => {
        onTextChangeRef.current?.(quill.root.innerHTML);
      });

      // Listen for selection changes
      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = 'Editor';
export default Editor;
