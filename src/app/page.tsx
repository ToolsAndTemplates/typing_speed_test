'use client';

import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTypingGame } from '@/hooks/useTypingGame';
import { TypingArea, StatsDisplay, ModeSelector, ResultsModal } from '@/components';

export default function Home() {
  const {
    state,
    startGame,
    resetGame,
    handleInput,
    setTimeLimit,
    setMode,
  } = useTypingGame(60, 'words');

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Tab + Enter to restart
    if (e.key === 'Tab') {
      e.preventDefault();
    }
    if (e.key === 'Enter' && (state.status === 'finished' || state.status === 'idle')) {
      resetGame();
    }
  }, [state.status, resetGame]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">TypeMaster</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              Test your typing speed and accuracy. Challenge yourself to type faster!
            </p>
          </motion.div>
        </motion.header>

        {/* Stats display */}
        <div className="mb-6 md:mb-8">
          <StatsDisplay
            stats={state.stats}
            timeRemaining={state.timeRemaining}
            timeLimit={state.timeLimit}
            isRunning={state.status === 'running'}
          />
        </div>

        {/* Typing area */}
        <div className="mb-6 md:mb-8">
          <TypingArea
            text={state.text}
            userInput={state.userInput}
            currentIndex={state.currentIndex}
            errors={state.errors}
            isActive={state.status === 'running'}
            onInput={handleInput}
            onStart={startGame}
          />
        </div>

        {/* Mode selector */}
        <div className="mb-8">
          <ModeSelector
            currentMode={state.mode}
            currentTime={state.timeLimit}
            onModeChange={setMode}
            onTimeChange={setTimeLimit}
            disabled={state.status === 'running'}
          />
        </div>

        {/* Reset button */}
        {state.status === 'running' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <button
              onClick={resetGame}
              className="px-6 py-3 rounded-xl font-medium text-slate-300 bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Reset
            </button>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-slate-500 text-sm"
        >
          <p>
            Built with{' '}
            <span className="text-red-400">♥</span>
            {' '}using Next.js & Tailwind CSS
          </p>
          <p className="mt-2">
            Standard word = 5 characters • WPM = (correct characters / 5) / minutes
          </p>
        </motion.footer>
      </div>

      {/* Results modal */}
      <ResultsModal
        isOpen={state.status === 'finished'}
        stats={state.stats}
        onRestart={resetGame}
      />
    </main>
  );
}
