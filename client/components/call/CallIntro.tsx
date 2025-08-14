import { Button } from "@/components/korean/Button";
import { BottomNavigation } from "@/components/korean/BottomNavigation";
import { Header } from "@/components/korean/Header";

interface CallIntroProps {
  onStartCall: () => void;
}

export const CallIntro: React.FC<CallIntroProps> = ({ onStartCall }) => {
  return (
    <div className="w-screen h-screen bg-korean-cream flex flex-col fixed inset-0">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-8 pb-20" style={{ paddingTop: '100px' }}>
        {/* Header Section */}
        <div className="w-full max-w-82 flex flex-col gap-3 mb-15">
          <h1 className="text-black font-pretendard text-[32px] font-bold tracking-tight">
            오늘의 이야기
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
        <div className="flex flex-col items-center gap-7 mb-15">
          <p className="text-black text-center font-ownglyph text-2xl font-normal max-w-64 bg-[#FDE7BE] rounded-xl px-4 py-3 shadow-sm border border-[#D8C2A1]">
            이야기를 들려주시면
            <br />
            제가 맞춤 감정일기를 써드릴게요!
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
        <div className="w-full max-w-86 px-6">
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
