import { BottomNavigation } from "@/components/korean/BottomNavigation";
import { TodaySummary } from "./TodaySummary";
import { EmotionAnalysis } from "./EmotionAnalysis";
import { MoaLetter } from "./MoaLetter";

interface DataHomeProps {
  todayStory: {
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

export const DataHome: React.FC<DataHomeProps> = ({ todayStory }) => {
  return (
    <div className="w-screen h-screen bg-korean-cream flex flex-col fixed inset-0">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pt-25 pb-28">
        {/* Header */}
        <h1 className="text-black font-pretendard text-[32px] font-bold tracking-tight mb-6">
          오늘의 이야기
        </h1>

        {/* Today's Analysis Card */}
        <div className="flex flex-col mb-6">
          <TodaySummary summary={todayStory.summary} score={todayStory.score} />
          <EmotionAnalysis analysis={todayStory.emotionalAnalysis} />
        </div>

        {/* Moa's Letter */}
        <MoaLetter content={todayStory.moaLetter} />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />
    </div>
  );
};
