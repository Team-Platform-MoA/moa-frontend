import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchReportsForMonth, fetchReportDetail } from '@/services/api';

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
  dailySummary: string;
  moaLetter: string;
  letterStyle: 'envelope1' | 'envelope2' | 'envelope3' | 'envelope4';
}

interface PostboxState {
  currentYear: number;
  currentMonth: number;
  letters: Letter[];
  selectedLetter: Letter | null;
  isLoading: boolean;
  error: string | null;
}

interface PostboxContextType {
  state: PostboxState;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  selectLetter: (letter: Letter) => void;
  closeLetter: () => void;
  getLettersForCurrentMonth: () => Letter[];
  refreshLetters: () => void;
}

const PostboxContext = createContext<PostboxContextType | undefined>(undefined);

// Mock data는 더 이상 사용하지 않음 (API에서 실시간 데이터 사용)

export const PostboxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<PostboxState>({
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    letters: [],
    selectedLetter: null,
    isLoading: false,
    error: null,
  });

  // API에서 해당 년월의 리포트 데이터를 가져오는 함수
  const fetchLettersForMonth = async (year: number, month: number) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      console.log(`우체통: ${year}년 ${month}월 리포트 조회 시작`);
      const reportsResponse = await fetchReportsForMonth(year, month);
      console.log('우체통: 리포트 목록:', reportsResponse);

      // 각 리포트의 상세 정보를 가져와서 Letter 형식으로 변환
      const letters: Letter[] = [];
      
      for (const report of reportsResponse.reports) {
        try {
          const reportDetail = await fetchReportDetail(report.report_id);
          
          // API 데이터를 Letter 형식으로 변환
          const letter: Letter = {
            id: report.report_id,
            date: `${year}-${String(month).padStart(2, '0')}-${report.report_date.replace(/[월일]/g, '').split(' ').join('').padStart(2, '0')}`, // "8월 17일" -> "2025-08-17"
            title: reportDetail.daily_summary,
            emotionScore: reportDetail.emotion_score,
            emotionalAnalysis: {
              stress: reportDetail.emotion_analysis.stress,
              resilience: reportDetail.emotion_analysis.resilience,
              emotionalStability: reportDetail.emotion_analysis.stability,
            },
            dailySummary: reportDetail.daily_summary,
            moaLetter: reportDetail.letter,
            letterStyle: (['envelope1', 'envelope2', 'envelope3', 'envelope4'] as const)[Math.floor(Math.random() * 4)],
          };
          
          letters.push(letter);
        } catch (error) {
          console.error(`리포트 ${report.report_id} 상세 조회 실패:`, error);
        }
      }

      console.log(`우체통: ${year}년 ${month}월 편지 ${letters.length}개 로드 완료`);
      setState(prev => ({ 
        ...prev, 
        letters,
        isLoading: false,
        error: null 
      }));
      
    } catch (error) {
      console.error('우체통: 리포트 조회 실패:', error);
      setState(prev => ({ 
        ...prev, 
        letters: [],
        isLoading: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.' 
      }));
    }
  };

  // 현재 년월이 변경될 때마다 데이터 로드
  useEffect(() => {
    fetchLettersForMonth(state.currentYear, state.currentMonth);
  }, [state.currentYear, state.currentMonth]);

  const goToPreviousMonth = () => {
    setState((prev) => {
      const newMonth = prev.currentMonth === 1 ? 12 : prev.currentMonth - 1;
      const newYear =
        prev.currentMonth === 1 ? prev.currentYear - 1 : prev.currentYear;
      return {
        ...prev,
        currentMonth: newMonth,
        currentYear: newYear,
      };
    });
  };

  const goToNextMonth = () => {
    setState((prev) => {
      const newMonth = prev.currentMonth === 12 ? 1 : prev.currentMonth + 1;
      const newYear =
        prev.currentMonth === 12 ? prev.currentYear + 1 : prev.currentYear;
      return {
        ...prev,
        currentMonth: newMonth,
        currentYear: newYear,
      };
    });
  };

  const refreshLetters = () => {
    fetchLettersForMonth(state.currentYear, state.currentMonth);
  };

  const selectLetter = (letter: Letter) => {
    setState((prev) => ({
      ...prev,
      selectedLetter: letter,
    }));
  };

  const closeLetter = () => {
    setState((prev) => ({
      ...prev,
      selectedLetter: null,
    }));
  };

  const getLettersForCurrentMonth = () => {
    return state.letters.filter((letter) => {
      const letterDate = new Date(letter.date);
      return (
        letterDate.getFullYear() === state.currentYear &&
        letterDate.getMonth() + 1 === state.currentMonth
      );
    });
  };

  return (
    <PostboxContext.Provider
      value={{
        state,
        goToPreviousMonth,
        goToNextMonth,
        selectLetter,
        closeLetter,
        getLettersForCurrentMonth,
        refreshLetters,
      }}
    >
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
