import React, { createContext, useContext, useState } from 'react';

export interface Letter {
  id: string;
  date: string;
  title: string;
  emotionScore: number;
  emotionalAnalysis: {
    stress: number;
    resilience: number;
    emotionalStability: number;
  };
  moaLetter: string;
  letterStyle: 'envelope1' | 'envelope2' | 'envelope3' | 'envelope4';
}

interface PostboxState {
  currentYear: number;
  currentMonth: number;
  letters: Letter[];
  selectedLetter: Letter | null;
}

interface PostboxContextType {
  state: PostboxState;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  selectLetter: (letter: Letter) => void;
  closeLetter: () => void;
  getLettersForCurrentMonth: () => Letter[];
}

const PostboxContext = createContext<PostboxContextType | undefined>(undefined);

// Mock data - 실제로는 백엔드에서 가져올 데이터
const mockLetters: Letter[] = [
  {
    id: '1',
    date: '2025-08-01',
    title: '고생이 많은 하루였던 것 같아요.',
    emotionScore: 65,
    emotionalAnalysis: {
      stress: 45,
      resilience: 45,
      emotionalStability: 45,
    },
    moaLetter: `모아의 편지를 써봅시다...
모아가 친절히 당신의 감정을 분석하여
하면 좋은 것들을 추천해줍니다... 

상세 분석에 대한 이야기와 액션플랜을 넣읍시다`,
    letterStyle: 'envelope1'
  },
  {
    id: '2',
    date: '2025-08-02',
    title: '평온한 하루를 보냈어요.',
    emotionScore: 78,
    emotionalAnalysis: {
      stress: 25,
      resilience: 70,
      emotionalStability: 80,
    },
    moaLetter: '오늘은 정말 평온한 하루였네요. 이런 날들이 계속되길 바라요.',
    letterStyle: 'envelope2'
  },
  {
    id: '3',
    date: '2025-08-03',
    title: '조금 힘든 하루였어요.',
    emotionScore: 45,
    emotionalAnalysis: {
      stress: 65,
      resilience: 35,
      emotionalStability: 40,
    },
    moaLetter: '힘든 하루였지만, 이런 날들도 지나갈 거예요. 충분히 휴식을 취하세요.',
    letterStyle: 'envelope3'
  },
  // 더 많은 편지들...
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `${i + 4}`,
    date: `2025-08-${String(i + 4).padStart(2, '0')}`,
    title: `8월 ${i + 4}일의 이야기`,
    emotionScore: Math.floor(Math.random() * 50) + 40,
    emotionalAnalysis: {
      stress: Math.floor(Math.random() * 60) + 20,
      resilience: Math.floor(Math.random() * 60) + 20,
      emotionalStability: Math.floor(Math.random() * 60) + 20,
    },
    moaLetter: `${i + 4}일의 모아 편지입니다...`,
    letterStyle: (['envelope1', 'envelope2', 'envelope3', 'envelope4'] as const)[i % 4]
  }))
];

export const PostboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PostboxState>({
    currentYear: 2025,
    currentMonth: 8,
    letters: mockLetters,
    selectedLetter: null,
  });

  const goToPreviousMonth = () => {
    setState(prev => {
      const newMonth = prev.currentMonth === 1 ? 12 : prev.currentMonth - 1;
      const newYear = prev.currentMonth === 1 ? prev.currentYear - 1 : prev.currentYear;
      return {
        ...prev,
        currentMonth: newMonth,
        currentYear: newYear,
      };
    });
  };

  const goToNextMonth = () => {
    setState(prev => {
      const newMonth = prev.currentMonth === 12 ? 1 : prev.currentMonth + 1;
      const newYear = prev.currentMonth === 12 ? prev.currentYear + 1 : prev.currentYear;
      return {
        ...prev,
        currentMonth: newMonth,
        currentYear: newYear,
      };
    });
  };

  const selectLetter = (letter: Letter) => {
    setState(prev => ({
      ...prev,
      selectedLetter: letter,
    }));
  };

  const closeLetter = () => {
    setState(prev => ({
      ...prev,
      selectedLetter: null,
    }));
  };

  const getLettersForCurrentMonth = () => {
    return state.letters.filter(letter => {
      const letterDate = new Date(letter.date);
      return letterDate.getFullYear() === state.currentYear && 
             letterDate.getMonth() + 1 === state.currentMonth;
    });
  };

  return (
    <PostboxContext.Provider value={{ 
      state, 
      goToPreviousMonth, 
      goToNextMonth, 
      selectLetter, 
      closeLetter,
      getLettersForCurrentMonth 
    }}>
      {children}
    </PostboxContext.Provider>
  );
};

export const usePostbox = () => {
  const context = useContext(PostboxContext);
  if (context === undefined) {
    throw new Error('usePostbox must be used within a PostboxProvider');
  }
  return context;
};
