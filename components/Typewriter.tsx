import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  speed = 30, 
  className = '', 
  onComplete,
  startDelay = 0
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    if (!hasStarted) {
      timeoutId = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);
      return () => clearTimeout(timeoutId);
    }

    if (displayedText.length < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
    } else if (onComplete) {
      onComplete();
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, hasStarted, text, speed, onComplete, startDelay]);

  return (
    <span className={`${className} font-mono`}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="animate-pulse inline-block w-2 h-4 bg-cyan-500 ml-1 align-middle"></span>
      )}
    </span>
  );
};