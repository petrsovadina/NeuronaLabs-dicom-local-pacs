'use client';

import { useEffect, useRef } from 'react';
import { initializeViewer } from '@ohif/viewer';

interface OHIFViewerProps {
  imageUrl: string;
  onClose?: () => void;
}

export function OHIFViewer({ imageUrl, onClose }: OHIFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const config = {
      servers: {
        dicomWeb: [{
          name: 'Orthanc',
          wadoUriRoot: imageUrl,
          qidoRoot: imageUrl,
          wadoRoot: imageUrl,
          qidoSupportsIncludeField: true,
          imageRendering: 'wadors',
          thumbnailRendering: 'wadors',
        }],
      },
      hotkeys: [
        {
          commandName: 'closeViewer',
          label: 'Close Viewer',
          keys: ['esc'],
          onKeyDown: onClose
        }
      ],
    };

    const viewer = initializeViewer(containerRef.current, config);

    return () => {
      viewer?.destroy();
    };
  }, [imageUrl, onClose]);

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div ref={containerRef} className="w-full h-full" />
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          Zavřít
        </button>
      )}
    </div>
  );
}
