import { createContext, useContext, useState, ReactNode } from "react";

interface HomeState {
  hasConsultationRecords: boolean;
  todayStory?: {
    summary: string;
    score: number;
    emotionalAnalysis: {
      stress: number;
      resilience: number;
      emotionalStability: number;
    };
    moaLetter: string;
  };
}

interface HomeContextType {
  homeState: HomeState;
  setHasConsultationRecords: (hasRecords: boolean) => void;
  setTodayStory: (story: HomeState['todayStory']) => void;
}

const HomeContext = createContext<HomeContextType | null>(null);

export const HomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [homeState, setHomeState] = useState<HomeState>({
    hasConsultationRecords: false, // Start with empty state
  });

  const setHasConsultationRecords = (hasRecords: boolean) => {
    setHomeState(prev => ({ ...prev, hasConsultationRecords: hasRecords }));
  };

  const setTodayStory = (story: HomeState['todayStory']) => {
    setHomeState(prev => ({ ...prev, todayStory: story }));
  };

  return (
    <HomeContext.Provider value={{ homeState, setHasConsultationRecords, setTodayStory }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHome must be used within a HomeProvider");
  }
  return context;
};
