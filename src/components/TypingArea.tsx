'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingAreaProps {
  text: string;
  userInput: string;
  currentIndex: number;
  errors: Set<number>;
  isActive: boolean;
  onInput: (input: string) => void;
  onStart: () => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  text,
  userInput,
  currentIndex,
  errors,
  isActive,
  onInput,
  onStart,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  // Auto-scroll to keep current character visible
  useEffect(() => {
    if (textContainerRef.current) {
      const container = textContainerRef.current;
      const currentChar = container.querySelector('.char-current');
      if (currentChar) {
        const charRect = currentChar.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (charRect.bottom > containerRect.bottom - 50) {
          container.scrollTop += 40;
        }
      }
    }
  }, [currentIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) {
      onStart();
    }
    onInput(e.target.value);
  };

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const renderCharacter = (char: string, index: number) => {
    let className = 'char-pending transition-colors duration-100';

    if (index < userInput.length) {
      if (errors.has(index)) {
        className = 'char-incorrect';
      } else {
        className = 'char-correct';
      }
    } else if (index === currentIndex) {
      className = 'char-current';
    }

    return (
      <span key={index} className={className}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <div
        ref={textContainerRef}
        onClick={handleContainerClick}
        className="glass rounded-2xl p-6 md:p-8 cursor-text relative overflow-hidden group"
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Text display */}
        <div
          className="relative z-10 text-lg md:text-xl lg:text-2xl leading-relaxed font-mono tracking-wide overflow-y-auto max-h-48 md:max-h-64 scrollbar-thin"
          style={{ wordBreak: 'break-word' }}
        >
          {text.split('').map((char, index) => renderCharacter(char, index))}
        </div>

        {/* Hidden input for capturing keystrokes */}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="absolute opacity-0 pointer-events-none"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        {/* Click to start hint */}
        {!isActive && userInput.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-2xl"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl md:text-2xl font-semibold gradient-text mb-2"
              >
                Click here and start typing
              </motion.div>
              <p className="text-slate-400 text-sm md:text-base">
                The timer will begin when you start
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Keyboard shortcut hint */}
      <div className="mt-4 flex justify-center gap-4 text-xs md:text-sm text-slate-500">
        <span className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-300">Tab</kbd>
          + <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-300">Enter</kbd>
          to restart
        </span>
      </div>
    </motion.div>
  );
};
