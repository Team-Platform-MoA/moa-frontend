import { Button } from "@/components/korean/Button";
import { BottomNavigation } from "@/components/korean/BottomNavigation";
import { useHome } from "@/hooks/useHome";
import { useNavigate } from "react-router-dom";

export const EmptyHome: React.FC = () => {
  const { setHasConsultationRecords, setTodayStory } = useHome();
  const navigate = useNavigate();

  const handleCallClick = () => {
    navigate("/call?skipIntro=true");
  };

  const handleDemoData = () => {
    // Demo function to show data state
    setTodayStory({
      summary: "고생이 많은 하루였던 것 같아요.",
      score: 65,
      emotionalAnalysis: {
        stress: 45,
        resilience: 45,
        emotionalStability: 45,
      },
      moaLetter: `안녕하세요! 오늘 하루도 수고하셨어요.

오늘의 이야기를 들어보니 조금 힘든 하루를 보내신 것 같네요. 하지만 그 속에서도 열심히 노력하시는 모습이 느껴져요.

스트레스가 조금 높게 나왔지만, 이럴 때일수록 충분한 휴식을 취하시기 바라요. 좋아하시는 음악을 듣거나 잘쏙 스트레칭을 해보세요.`,
    });
    setHasConsultationRecords(true);
  };

  return (
    <div className="w-screen h-dvh bg-korean-cream flex flex-col fixed inset-0 animate-in fade-in duration-300 pb-safe-bottom">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between px-8 py-8 min-h-0 overflow-auto">
        {/* Header Section */}
        <div className="w-full max-w-82 flex flex-col gap-3">
          <h1 className="text-black font-pretendard text-[32px] font-bold tracking-tight">
            오늘의 이야기
          </h1>
          <p className="text-black font-pretendard text-xl font-normal tracking-tight leading-relaxed">
            아직 오늘의 이야기를 들려주지 않으셨어요.
            <br />
            오늘의 이야기를 들려주시겠어요?
          </p>
        </div>

        {/* Character and Message Section */}
        <div className="flex flex-col items-center gap-7">
          <p className="text-black text-center font-ownglyph text-2xl font-normal max-w-100 bg-[#FDE7BE] rounded-xl px-4 py-3 shadow-sm border border-[#D8C2A1]">
            함께 감정을 돌아보고
            <br />
            위로 편지를 전달해드릴게요 :)
          </p>

          {/* Character Image */}
          <div className="relative">
            <img
              src="/images/character-empty.png"
              alt="모아 캐릭터 - 빈 상태"
              className="w-55 h-55 object-contain"
            />
          </div>
        </div>

        {/* Call Button */}
        <div className="px-6 pb-20 pb-safe-bottom">
          <Button variant="primary" onClick={handleCallClick}>
            전화 걸기
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />
    </div>
  );
};
