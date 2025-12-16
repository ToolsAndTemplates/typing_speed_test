'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GameStats } from '@/hooks/useTypingGame';

interface StatsDisplayProps {
  stats: GameStats;
  timeRemaining: number;
  timeLimit: number;
  isRunning: boolean;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  timeRemaining,
  timeLimit,
  isRunning,
}) => {
  const progressPercentage = (timeRemaining / timeLimit) * 100;

  const getTimeColor = () => {
    if (timeRemaining <= 10) return 'text-red-400';
    if (timeRemaining <= 30) return 'text-yellow-400';
    return 'text-emerald-400';
  };

  const statItems = [
    {
      label: 'WPM',
      value: stats.wpm,
      color: 'from-primary-400 to-primary-600',
      description: 'Words per minute',
    },
    {
      label: 'Accuracy',
      value: `${stats.accuracy}%`,
      color: 'from-emerald-400 to-emerald-600',
      description: 'Typing accuracy',
    },
    {
      label: 'Raw WPM',
      value: stats.rawWpm,
      color: 'from-accent-400 to-accent-600',
      description: 'Including errors',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Timer display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">Time Remaining</span>
          <motion.span
            key={timeRemaining}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className={`text-3xl md:text-4xl font-bold tabular-nums ${getTimeColor()}`}
          >
            {timeRemaining}s
          </motion.span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              timeRemaining <= 10
                ? 'bg-red-500'
                : timeRemaining <= 30
                ? 'bg-yellow-500'
                : 'bg-gradient-to-r from-primary-500 to-accent-500'
            }`}
            initial={{ width: '100%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass rounded-xl p-3 md:p-4 text-center group hover:scale-105 transition-transform duration-300"
          >
            <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}>
              {item.value}
            </div>
            <div className="text-xs md:text-sm text-slate-400 mt-1">
              {item.label}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
              {item.description}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Character count */}
      {isRunning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex justify-center gap-4 text-xs md:text-sm"
        >
          <span className="text-emerald-400">
            <span className="text-slate-500">Correct:</span> {stats.correctChars}
          </span>
          <span className="text-red-400">
            <span className="text-slate-500">Errors:</span> {stats.incorrectChars}
          </span>
          <span className="text-slate-400">
            <span className="text-slate-500">Total:</span> {stats.totalChars}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};
