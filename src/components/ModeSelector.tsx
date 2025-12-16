'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TextMode } from '@/data/words';

interface ModeSelectorProps {
  currentMode: TextMode;
  currentTime: number;
  onModeChange: (mode: TextMode) => void;
  onTimeChange: (time: number) => void;
  disabled: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  currentTime,
  onModeChange,
  onTimeChange,
  disabled,
}) => {
  const modes: { value: TextMode; label: string; icon: string }[] = [
    { value: 'words', label: 'Common Words', icon: '📝' },
    { value: 'programming', label: 'Programming', icon: '💻' },
    { value: 'quotes', label: 'Quotes', icon: '💬' },
  ];

  const timeOptions = [15, 30, 60, 120];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
    >
      <div className="glass rounded-2xl p-4 md:p-6">
        {/* Mode selection */}
        <div className="mb-6">
          <label className="block text-sm text-slate-400 mb-3">Text Mode</label>
          <div className="flex flex-wrap gap-2">
            {modes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => !disabled && onModeChange(mode.value)}
                disabled={disabled}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300
                  ${
                    currentMode === mode.value
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <span>{mode.icon}</span>
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time selection */}
        <div>
          <label className="block text-sm text-slate-400 mb-3">Time Limit</label>
          <div className="flex flex-wrap gap-2">
            {timeOptions.map((time) => (
              <button
                key={time}
                onClick={() => !disabled && onTimeChange(time)}
                disabled={disabled}
                className={`
                  px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300
                  ${
                    currentTime === time
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {time}s
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
