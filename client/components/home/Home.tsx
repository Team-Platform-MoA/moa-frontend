import { EmptyHome } from "./EmptyHome";
import { DataHome } from "./DataHome";
import { useEffect, useState } from "react";
import { fetchTodayReport, TodayStory } from "@/services/api";

export const Home: React.FC = () => {
  const [todayStory, setTodayStory] = useState<TodayStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 홈 컴포넌트 마운트 시 API에서 오늘의 리포트 확인
  useEffect(() => {
    const checkTodayStory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // API에서 오늘의 리포트 조회 (실시간 데이터)
        console.log('API에서 오늘의 리포트 조회 시작');
        const apiStory = await fetchTodayReport();
        
        if (apiStory) {
          console.log('API에서 오늘의 리포트 발견:', apiStory);
          setTodayStory(apiStory);
          // API에서 가져온 데이터를 localStorage에도 저장
          // saveTodayStoryToStorage(apiStory);
        } else {
          console.log('오늘의 리포트가 없습니다.');
          setTodayStory(null);
        }
      } catch (err) {
        console.error('오늘의 리포트 조회 중 오류:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        setTodayStory(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkTodayStory();
  }, []);

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="w-full h-dvh bg-[#FFFAE7] flex items-center justify-center pb-safe-bottom">
        <div className="text-center">
          <div className="text-black font-pretendard text-lg">로딩 중...</div>
          <div className="text-black font-pretendard text-sm mt-2">오늘의 이야기를 확인하고 있어요</div>
        </div>
      </div>
    );
  }

  // 오류가 발생했을 때
  if (error) {
    console.log('오류 발생:', error);
    return <EmptyHome />; // 오류 시에도 기본 홈 화면 표시
  }

  // 실제 데이터가 없으면 EmptyHome 표시
  if (!todayStory) {
    console.log('오늘의 이야기가 없어서 EmptyHome 표시');
    return <EmptyHome />;
  }

  // 실제 데이터가 있으면 DataHome 표시
  console.log('오늘의 이야기가 있어서 DataHome 표시:', todayStory);
  const storyData = {
    summary: todayStory.title,
    score: todayStory.emotionScore,
    emotionalAnalysis: {
      stress: todayStory.emotionalAnalysis.stress,
      resilience: todayStory.emotionalAnalysis.resilience,
      emotionalStability: todayStory.emotionalAnalysis.emotionalStability,
    },
    moaLetter: todayStory.moaLetter,
    actions: todayStory.actions,
  };

  return <DataHome todayStory={storyData} />;
};
