import { useState, useCallback, useEffect, useRef } from 'react';
import { generateText, TextMode } from '@/data/words';

export interface GameStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsed: number;
}

export interface GameState {
  status: 'idle' | 'running' | 'finished';
  text: string;
  userInput: string;
  currentIndex: number;
  errors: Set<number>;
  stats: GameStats;
  timeLimit: number;
  timeRemaining: number;
  mode: TextMode;
}

const initialStats: GameStats = {
  wpm: 0,
  rawWpm: 0,
  accuracy: 100,
  correctChars: 0,
  incorrectChars: 0,
  totalChars: 0,
  timeElapsed: 0,
};

export const useTypingGame = (initialTimeLimit: number = 60, initialMode: TextMode = 'words') => {
  const [state, setState] = useState<GameState>({
    status: 'idle',
    text: generateText(initialMode, 100),
    userInput: '',
    currentIndex: 0,
    errors: new Set<number>(),
    stats: initialStats,
    timeLimit: initialTimeLimit,
    timeRemaining: initialTimeLimit,
    mode: initialMode,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const calculateStats = useCallback((
    correctChars: number,
    incorrectChars: number,
    timeElapsed: number
  ): GameStats => {
    const totalChars = correctChars + incorrectChars;
    const minutes = timeElapsed / 60;

    // WPM calculation: (characters / 5) / minutes
    // Standard word length is considered 5 characters
    const rawWpm = minutes > 0 ? Math.round((totalChars / 5) / minutes) : 0;
    const wpm = minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

    return {
      wpm,
      rawWpm,
      accuracy,
      correctChars,
      incorrectChars,
      totalChars,
      timeElapsed,
    };
  }, []);

  const startGame = useCallback(() => {
    const newText = generateText(state.mode, 100);
    setState(prev => ({
      ...prev,
      status: 'running',
      text: newText,
      userInput: '',
      currentIndex: 0,
      errors: new Set<number>(),
      stats: initialStats,
      timeRemaining: prev.timeLimit,
    }));
    startTimeRef.current = Date.now();
  }, [state.mode]);

  const resetGame = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const newText = generateText(state.mode, 100);
    setState(prev => ({
      ...prev,
      status: 'idle',
      text: newText,
      userInput: '',
      currentIndex: 0,
      errors: new Set<number>(),
      stats: initialStats,
      timeRemaining: prev.timeLimit,
    }));
    startTimeRef.current = null;
  }, [state.mode]);

  const finishGame = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setState(prev => ({
      ...prev,
      status: 'finished',
    }));
  }, []);

  const handleInput = useCallback((input: string) => {
    if (state.status !== 'running') return;

    const newIndex = input.length;
    const newErrors = new Set(state.errors);
    let correctChars = 0;
    let incorrectChars = 0;

    // Check each character
    for (let i = 0; i < input.length; i++) {
      if (i < state.text.length) {
        if (input[i] === state.text[i]) {
          correctChars++;
        } else {
          incorrectChars++;
          newErrors.add(i);
        }
      }
    }

    const timeElapsed = startTimeRef.current
      ? (Date.now() - startTimeRef.current) / 1000
      : 0;

    const newStats = calculateStats(correctChars, incorrectChars, timeElapsed);

    // Check if user completed the text
    if (newIndex >= state.text.length) {
      setState(prev => ({
        ...prev,
        userInput: input,
        currentIndex: newIndex,
        errors: newErrors,
        stats: newStats,
        status: 'finished',
      }));
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    setState(prev => ({
      ...prev,
      userInput: input,
      currentIndex: newIndex,
      errors: newErrors,
      stats: newStats,
    }));
  }, [state.status, state.text, state.errors, calculateStats]);

  const setTimeLimit = useCallback((time: number) => {
    setState(prev => ({
      ...prev,
      timeLimit: time,
      timeRemaining: time,
    }));
  }, []);

  const setMode = useCallback((mode: TextMode) => {
    const newText = generateText(mode, 100);
    setState(prev => ({
      ...prev,
      mode,
      text: newText,
      userInput: '',
      currentIndex: 0,
      errors: new Set<number>(),
      stats: initialStats,
    }));
  }, []);

  // Timer effect
  useEffect(() => {
    if (state.status === 'running') {
      timerRef.current = setInterval(() => {
        setState(prev => {
          const newTimeRemaining = prev.timeRemaining - 1;

          if (newTimeRemaining <= 0) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return {
              ...prev,
              timeRemaining: 0,
              status: 'finished',
            };
          }

          // Update stats with elapsed time
          const timeElapsed = prev.timeLimit - newTimeRemaining;
          const newStats = calculateStats(
            prev.stats.correctChars,
            prev.stats.incorrectChars,
            timeElapsed
          );

          return {
            ...prev,
            timeRemaining: newTimeRemaining,
            stats: newStats,
          };
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [state.status, calculateStats]);

  return {
    state,
    startGame,
    resetGame,
    finishGame,
    handleInput,
    setTimeLimit,
    setMode,
  };
};
