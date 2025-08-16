import { useHome } from "@/hooks/useHome";
import { EmptyHome } from "./EmptyHome";
import { DataHome } from "./DataHome";
import { useEffect } from "react";
import { getTodayStoryFromStorage } from "@/services/api";

export const Home: React.FC = () => {
  const { homeState, setHasConsultationRecords, setTodayStory } = useHome();

  // 홈 컴포넌트 마운트 시 한 번만 localStorage 확인
  useEffect(() => {
    const todayStory = getTodayStoryFromStorage();
    if (todayStory) {
      setHasConsultationRecords(true);
      setTodayStory({
        summary: todayStory.title,
        score: todayStory.emotionScore,
        emotionalAnalysis: {
          stress: todayStory.emotionalAnalysis.stress,
          resilience: todayStory.emotionalAnalysis.resilience,
          emotionalStability: todayStory.emotionalAnalysis.emotionalStability,
        },
        moaLetter: todayStory.moaLetter,
      });
    }
  }, []); // 빈 배열로 한 번만 실행

  // Default fallback data when todayStory exists but is incomplete
  const defaultTodayStory = {
    summary: "오늘 하루 수고하셨어요.",
    score: 50,
    emotionalAnalysis: {
      stress: 30,
      resilience: 60,
      emotionalStability: 55,
    },
    moaLetter: `안녕하세요! 오늘 하루도 고생 많으셨어요.

감정 분석 결과를 바탕으로 맞춤형 조언을 드릴게요. 스트레스가 있으시더라도 충분한 휴식을 취하시길 바라며, 작은 성취들도 인정해 주세요.

내일도 좋은 하루 되시기 바랍니다! 💙`,
  };

  // Show EmptyHome when no consultation records exist or todayStory is missing
  if (!homeState.hasConsultationRecords || !homeState.todayStory) {
    return <EmptyHome />;
  }

  // Validate required fields and use defaults if needed
  const validatedStory = {
    summary: homeState.todayStory.summary || defaultTodayStory.summary,
    score: homeState.todayStory.score ?? defaultTodayStory.score,
    emotionalAnalysis: {
      stress: homeState.todayStory.emotionalAnalysis?.stress ?? defaultTodayStory.emotionalAnalysis.stress,
      resilience: homeState.todayStory.emotionalAnalysis?.resilience ?? defaultTodayStory.emotionalAnalysis.resilience,
      emotionalStability: homeState.todayStory.emotionalAnalysis?.emotionalStability ?? defaultTodayStory.emotionalAnalysis.emotionalStability,
    },
    moaLetter: homeState.todayStory.moaLetter || defaultTodayStory.moaLetter,
  };

  return <DataHome todayStory={validatedStory} />;
};
