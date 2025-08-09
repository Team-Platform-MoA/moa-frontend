import React, { createContext, useContext, useState, useEffect } from 'react';

export type CallStep = 
  | 'intro'
  | 'question1'
  | 'question2' 
  | 'question3'
  | 'loading1'
  | 'loading2'
  | 'loading3'
  | 'loading4'
  | 'loading5'
  | 'completed';

interface CallState {
  currentStep: CallStep;
  timer: number;
  isTimerActive: boolean;
  canProceed: boolean;
  isRecommendedTimeReached: boolean;
}

interface CallContextType {
  state: CallState;
  nextStep: () => void;
  startTimer: () => void;
  resetTimer: () => void;
  setStep: (step: CallStep) => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CallState>({
    currentStep: 'intro',
    timer: 0,
    isTimerActive: false,
    canProceed: true,
    isRecommendedTimeReached: false,
  });

  // 타이머 로직
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (state.isTimerActive && state.timer < 60) {
      interval = setInterval(() => {
        setState(prev => {
          const newTimer = prev.timer + 1;
          const isRecommendedTimeReached = newTimer >= 60;

          return {
            ...prev,
            timer: newTimer,
            isRecommendedTimeReached,
            isTimerActive: newTimer < 60
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isTimerActive, state.timer]);

  const nextStep = () => {
    setState(prev => {
      const stepOrder: CallStep[] = [
        'intro',
        'question1',
        'question2',
        'question3',
        'loading1',
        'loading2',
        'loading3',
        'loading4',
        'loading5',
        'completed'
      ];
      
      const currentIndex = stepOrder.indexOf(prev.currentStep);
      const nextIndex = currentIndex + 1;
      
      if (nextIndex < stepOrder.length) {
        const nextStep = stepOrder[nextIndex];
        
        // 질문 단계에서는 타이머 리셋하고 시작
        if (nextStep.startsWith('question')) {
          return {
            ...prev,
            currentStep: nextStep,
            timer: 0,
            isTimerActive: true,
            canProceed: true,
            isRecommendedTimeReached: false
          };
        }
        
        return {
          ...prev,
          currentStep: nextStep,
          timer: 0,
          isTimerActive: false,
          canProceed: true
        };
      }
      
      return prev;
    });
  };

  const startTimer = () => {
    setState(prev => ({
      ...prev,
      timer: 0,
      isTimerActive: true,
      canProceed: true,
      isRecommendedTimeReached: false
    }));
  };

  const resetTimer = () => {
    setState(prev => ({
      ...prev,
      timer: 0,
      isTimerActive: false,
      canProceed: true,
      isRecommendedTimeReached: false
    }));
  };

  const setStep = (step: CallStep) => {
    setState(prev => ({
      ...prev,
      currentStep: step,
      timer: 0,
      isTimerActive: step.startsWith('question'),
      canProceed: true,
      isRecommendedTimeReached: false
    }));
  };

  return (
    <CallContext.Provider value={{ state, nextStep, startTimer, resetTimer, setStep }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};
