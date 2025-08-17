import { BottomNavigation } from "@/components/korean/BottomNavigation";

export const CallCompleted: React.FC = () => {
  return (
    <div className="w-screen h-screen fixed inset-0 bg-[#FFFAE7] flex flex-col">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 pt-[60px] pb-4">
          <h1 className="text-black font-pretendard text-[32px] font-bold leading-normal tracking-tight">
            모아 Call
          </h1>
          <p className="text-black font-pretendard text-xl font-normal leading-normal tracking-tight mt-2 max-w-[294px]">
            모아에게 말해봐!
            <br />
            오늘 있었던 일과 상담하고 싶은 것들을
            <br />
            털어 놓아보세요.
          </p>
        </div>

        {/* Completion Message and Character */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center mb-8">
            <p className="text-black font-['Ownglyph ryuttung'] text-2xl font-normal leading-normal max-w-[224px]">
              오늘은 이미 상담을 완료했어요!
              <br />
              내일 찾아와주세요
            </p>
          </div>

          {/* Character Image */}
          <div className="w-[243px] h-[243px]">
            <img
              src="/images/call/character-completed.png"
              alt="모아 캐릭터"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="call" />
    </div>
  );
};
