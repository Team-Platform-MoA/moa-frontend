import { createContext, useContext, useState, ReactNode } from "react";

export type PrologueStep = 1 | 2 | 3 | 4;

interface PrologueState {
  currentStep: PrologueStep;
}

interface PrologueContextType {
  state: PrologueState;
  nextStep: () => void;
  goToStep: (step: PrologueStep) => void;
}

const PrologueContext = createContext<PrologueContextType | null>(null);

export const PrologueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PrologueState>({
    currentStep: 1,
  });

  const nextStep = () => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4) as PrologueStep,
    }));
  };

  const goToStep = (step: PrologueStep) => {
    setState(prev => ({
      ...prev,
      currentStep: step,
    }));
  };

  return (
    <PrologueContext.Provider value={{ state, nextStep, goToStep }}>
      {children}
    </PrologueContext.Provider>
  );
};

export const usePrologue = () => {
  const context = useContext(PrologueContext);
  if (!context) {
    throw new Error("usePrologue must be used within a PrologueProvider");
  }
  return context;
};