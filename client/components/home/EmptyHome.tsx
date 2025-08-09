import { Button } from "@/components/korean/Button";
import { BottomNavigation } from "@/components/korean/BottomNavigation";

export const EmptyHome: React.FC = () => {
  const handleCallClick = () => {
    // TODO: Implement call functionality
    console.log("전화 걸기 clicked");
  };

  return (
    <div className="w-screen h-screen bg-korean-cream flex flex-col fixed inset-0">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-8 pt-25 pb-20">
        {/* Header Section */}
        <div className="w-full max-w-82 flex flex-col gap-3 mb-15">
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
        <div className="flex flex-col items-center gap-7 mb-15">
          <p className="text-black text-center font-ownglyph text-2xl font-normal max-w-64">
            이야기를 들려주시면
            <br />
            제가 맞춤 감정일기를 써드릴게요!
          </p>
          
          {/* Character Image Placeholder */}
          <div className="w-55 h-55 bg-korean-brown-secondary rounded-full flex items-center justify-center relative">
            <div className="w-32 h-32 bg-korean-brown-primary rounded-full"></div>
            {/* Phone icon in speech bubble */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-korean-brown-light rounded-full border-2 border-korean-brown-border flex items-center justify-center">
              <div className="w-8 h-8 bg-korean-brown-primary rounded"></div>
            </div>
          </div>
        </div>

        {/* Call Button */}
        <div className="w-full max-w-86 px-6">
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
