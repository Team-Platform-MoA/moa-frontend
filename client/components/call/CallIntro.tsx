import { Button } from "@/components/korean/Button";
import { BottomNavigation } from "@/components/korean/BottomNavigation";

interface CallIntroProps {
  onStartCall: () => void;
}

export const CallIntro: React.FC<CallIntroProps> = ({ onStartCall }) => {
  return (
    <div className="w-screen h-screen bg-korean-cream flex flex-col fixed inset-0">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between px-8 py-8 min-h-0 overflow-auto">
        {/* Header Section */}
        <div className="w-full max-w-82 flex flex-col gap-3">
          <h1 className="text-black font-pretendard text-[32px] font-bold tracking-tight">
            모아 Call
          </h1>
          <p className="text-black font-pretendard text-xl font-normal tracking-tight leading-relaxed">
            모아에게 말해봐!
            <br />
            오늘 있었던 일과 상담하고 싶은 것들을
            <br />
            털어 놓아보세요.
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
        <div className="px-6 pb-20">
          <Button variant="primary" onClick={onStartCall}>
            전화 걸기
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="call" />
    </div>
  );
};
