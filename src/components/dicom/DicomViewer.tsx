'use client';

import { useEffect, useRef } from 'react';
import { initializeViewer } from '@ohif/viewer';

interface DicomViewerProps {
  imageUrl: string;
}

export function DicomViewer({ imageUrl }: DicomViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      initializeViewer(containerRef.current, {
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
      });
    }
  }, [imageUrl]);

  return (
    <div ref={containerRef} className="w-full h-[500px] bg-black rounded-lg" />
  );
}
