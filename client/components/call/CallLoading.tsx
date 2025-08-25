import { Header } from "@/components/korean/Header";

interface CallLoadingProps {
  message: string;
  characterPosition: number; // 1-5 for different positions
}

export const CallLoading: React.FC<CallLoadingProps> = ({ message, characterPosition }) => {
  // 현재 위치에만 모아 이미지 표시 (나머지는 모두 도트)
  const isCurrentPosition = (index: number, position: number) => {
    return index === position - 1; // position이 1이면 index 0에 이미지
  };

  return (
    <div className="w-screen h-dvh fixed inset-0 bg-[#FFFAE7] flex flex-col py-2 animate-in fade-in duration-300 pb-safe-bottom">

      {/* Header */}
      <Header title="모아 Call" />

      {/* Loading Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* 모아 이미지들 - 현재 위치에만 이미지, 나머지는 도트 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="w-12 h-12 flex items-center justify-center">
              {isCurrentPosition(index, characterPosition) ? (
                <img 
                  src="/images/call/character-loading.png" 
                  alt={`모아 캐릭터`}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div className="w-3 h-3 rounded-full bg-[#D2BEA0]" />
              )}
            </div>
          ))}
        </div>

        {/* Loading Message */}
        <div className="text-center">
          <p className="text-black font-ownglyph text-3xl font-normal leading-normal">
            {message}
          </p>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="w-full h-5 flex justify-center items-center pb-2">
        <div className="w-[139px] h-[5px] bg-black rounded-full"></div>
      </div>
    </div>
  );
};
