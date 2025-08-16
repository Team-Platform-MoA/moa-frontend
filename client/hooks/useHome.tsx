import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getTodayStoryFromStorage } from "@/services/api";

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

  // localStorage에서 오늘의 이야기를 확인하고 상태를 업데이트하는 함수
  const checkTodayStory = () => {
    const todayStory = getTodayStoryFromStorage();
    console.log('Home: localStorage에서 가져온 데이터:', todayStory);
    
    if (todayStory) {
      console.log('Home: 오늘의 이야기 발견, 상세 데이터:', {
        title: todayStory.title,
        emotionScore: todayStory.emotionScore,
        emotionalAnalysis: todayStory.emotionalAnalysis,
        moaLetter: todayStory.moaLetter
      });
      
      setHomeState(prev => ({
        ...prev,
        hasConsultationRecords: true,
        todayStory: {
          summary: todayStory.title,
          score: todayStory.emotionScore,
          emotionalAnalysis: {
            stress: todayStory.emotionalAnalysis.stress,
            resilience: todayStory.emotionalAnalysis.resilience,
            emotionalStability: todayStory.emotionalAnalysis.emotionalStability,
          },
          moaLetter: todayStory.moaLetter,
        }
      }));
    } else {
      console.log('Home: 오늘의 이야기 없음, EmptyHome 표시');
      setHomeState(prev => ({
        ...prev,
        hasConsultationRecords: false,
        todayStory: undefined,
      }));
    }
  };

  // 컴포넌트 마운트 시 localStorage에서 오늘의 이야기 확인
  useEffect(() => {
    checkTodayStory();
  }, []);


  // 페이지 포커스 시 다시 확인
  useEffect(() => {
    const handleFocus = () => {
      checkTodayStory();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // localStorage 변화 감지 (다른 탭에서 변경된 경우)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'todayStories') {
        checkTodayStory();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
