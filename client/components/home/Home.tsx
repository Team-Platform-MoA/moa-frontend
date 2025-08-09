import { useHome } from "@/hooks/useHome";
import { EmptyHome } from "./EmptyHome";
import { DataHome } from "./DataHome";

export const Home: React.FC = () => {
  const { homeState } = useHome();

  // Mock data for when consultation records exist
  const mockTodayStory = {
    summary: "고생이 많은 하루였던 것 같아요.",
    score: 65,
    emotionalAnalysis: {
      stress: 45,
      resilience: 45,
      emotionalStability: 45,
    },
    moaLetter: `모아의 편지를 써봅시다...
모아가 친절히 당신의 감정을 분석하여
하면 좋은 것들을 추천해줍니다...

상세 분석에 대한 이야기와 액션플랜을 넣읍시다`,
  };

  if (!homeState.hasConsultationRecords) {
    return <EmptyHome />;
  }

  return <DataHome todayStory={homeState.todayStory || mockTodayStory} />;
};
