
import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { SculptureSettings } from '../types';
import { useColorGradient } from '../hooks/useColorGradient';

const KineticSculpture: React.FC<SculptureSettings> = (settings) => {
  const { 
    elementCount, 
    sculptureRadius, 
    lineLength, 
    lineWidth, 
    baseSpeed, 
    speedIncrement, 
    startColor, 
    endColor 
  } = settings;

  const [time, setTime] = useState(0);
  // FIX: Initialize useRef with null and provide a compatible type.
  // useRef<number>() expects an initial value of type number.
  const animationFrameId = useRef<number | null>(null);

  const colors = useColorGradient(startColor, endColor, elementCount);

  useEffect(() => {
    const animate = (timestamp: number) => {
      setTime(timestamp * 0.001); // convert to seconds
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const lines = useMemo(() => {
    return Array.from({ length: elementCount }, (_, i) => {
      const groupAngle = (360 / elementCount) * i;
      const speed = baseSpeed + i * speedIncrement;

      // Base linear rotation
      const linearRotation = time * speed;
      
      // Add a sinusoidal easing effect for a more fluid, organic motion.
      // The easing amplitude determines how far it deviates from the linear path.
      // The phase is shifted for each line (i * 0.1) to create a ripple effect.
      const easingAmplitude = 30; // degrees
      const easingFrequency = 0.5; // cycles per second
      const easingOffset = Math.sin(time * easingFrequency + i * 0.1) * easingAmplitude;

      const selfAngle = linearRotation + easingOffset;
      
      const transform = `rotate(${groupAngle}) translate(${sculptureRadius}, 0) rotate(${selfAngle})`;

      return {
        id: i,
        transform,
        color: colors[i] || '#ffffff',
      };
    });
  }, [elementCount, sculptureRadius, baseSpeed, speedIncrement, time, colors]);

  const viewBoxSize = (sculptureRadius + lineLength / 2) * 2.2;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox={`-${viewBoxSize / 2} -${viewBoxSize / 2} ${viewBoxSize} ${viewBoxSize}`}
        className="w-full h-full"
        aria-label="An animated kinetic sculpture with multiple rotating lines"
      >
        <g>
          {lines.map((line) => (
            <line
              key={line.id}
              x1={-lineLength / 2}
              y1="0"
              x2={lineLength / 2}
              y2="0"
              stroke={line.color}
              strokeWidth={lineWidth}
              strokeLinecap="round"
              transform={line.transform}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default KineticSculpture;
