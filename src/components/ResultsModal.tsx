'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats } from '@/hooks/useTypingGame';

interface ResultsModalProps {
  isOpen: boolean;
  stats: GameStats;
  onRestart: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  stats,
  onRestart,
}) => {
  const getWpmRating = (wpm: number) => {
    if (wpm >= 80) return { label: 'Outstanding!', color: 'text-yellow-400', emoji: '🏆' };
    if (wpm >= 60) return { label: 'Excellent!', color: 'text-emerald-400', emoji: '🌟' };
    if (wpm >= 40) return { label: 'Good Job!', color: 'text-primary-400', emoji: '👍' };
    if (wpm >= 25) return { label: 'Keep Practicing!', color: 'text-orange-400', emoji: '💪' };
    return { label: 'Getting Started!', color: 'text-slate-400', emoji: '🎯' };
  };

  const rating = getWpmRating(stats.wpm);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          onClick={onRestart}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass rounded-3xl p-6 md:p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-6xl mb-4"
              >
                {rating.emoji}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-2xl md:text-3xl font-bold ${rating.color}`}
              >
                {rating.label}
              </motion.h2>
              <p className="text-slate-400 mt-2">Test Complete</p>
            </div>

            {/* Main WPM display */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <div className="text-6xl md:text-7xl font-bold gradient-text mb-2">
                {stats.wpm}
              </div>
              <div className="text-slate-400 text-lg">Words Per Minute</div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-emerald-400">{stats.accuracy}%</div>
                <div className="text-sm text-slate-400">Accuracy</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-accent-400">{stats.rawWpm}</div>
                <div className="text-sm text-slate-400">Raw WPM</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary-400">{stats.correctChars}</div>
                <div className="text-sm text-slate-400">Correct</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-400">{stats.incorrectChars}</div>
                <div className="text-sm text-slate-400">Errors</div>
              </div>
            </motion.div>

            {/* Time taken */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mb-6 text-slate-400"
            >
              Time: {Math.round(stats.timeElapsed)}s
            </motion.div>

            {/* Restart button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRestart}
              className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-shadow"
            >
              Try Again
            </motion.button>

            <p className="text-center text-slate-500 text-sm mt-4">
              Press <kbd className="px-2 py-1 bg-slate-800 rounded">Enter</kbd> or click anywhere to restart
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
