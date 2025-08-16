import { Header } from "@/components/korean/Header";

interface CallLoadingProps {
  message: string;
  characterPosition: number; // 1-5 for different positions
}

export const CallLoading: React.FC<CallLoadingProps> = ({ message, characterPosition }) => {
  const getCharacterStyle = (position: number) => {
    // 50px 간격으로 3번째가 화면 중앙에 오도록 조정
    const spacing = 50;
    const center = 187.5; // 화면 중앙
    const thirdPosition = center - 20; // 캐릭터 폭의 절반만큼 빼기
    
    const positions = [
      `left-[${thirdPosition - spacing * 2}px]`,  // 1st position
      `left-[${thirdPosition - spacing}px]`,      // 2nd position
      `left-[${thirdPosition}px]`,                // 3rd position (center)
      `left-[${thirdPosition + spacing}px]`,      // 4th position
      `left-[${thirdPosition + spacing * 2}px]`,  // 5th position
    ];
    return positions[position - 1] || positions[0];
  };

  const getAllDots = (currentPosition: number) => {
    // 50px 간격으로 캐릭터 중앙에 맞춰서 dot 위치 계산
    const spacing = 50;
    const center = 187.5;
    
    const allDotPositions = [
      center - spacing * 2, // 1st dot
      center - spacing,     // 2nd dot
      center,               // 3rd dot (화면 중앙)
      center + spacing,     // 4th dot
      center + spacing * 2, // 5th dot
    ];
    
    // 현재 캐릭터가 있는 위치는 제외하고 dot만 표시
    const visibleDots = [];
    for (let i = 0; i < allDotPositions.length; i++) {
      if (i + 1 !== currentPosition) {
        visibleDots.push(allDotPositions[i]);
      }
    }
    return visibleDots;
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-[#FFFAE7] flex flex-col">
      {/* Status Bar */}
      <div className="w-full h-12 flex items-center justify-between px-7 pt-3.5">
        <div className="text-[#1D1E18] text-[17px] font-semibold font-['SF Pro Text'] leading-snug tracking-tight">
          9:41
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <path d="M6.11231 8.95898C7.49091 7.68035 9.51017 7.68017 10.8887 8.95898C10.9579 9.02774 10.9981 9.12508 11 9.22753C11.0019 9.33007 10.9652 9.42913 10.8984 9.50097L8.73926 11.8906C8.67602 11.9606 8.58985 12 8.50001 12C8.41015 12 8.32398 11.9606 8.26075 11.8906L6.10157 9.50097C6.03487 9.42907 5.99803 9.33008 6.00001 9.22753C6.00199 9.12499 6.04291 9.02771 6.11231 8.95898Z" fill="#1D1E18"/>
            </svg>
          </div>
          <div className="w-[27px] h-3 opacity-35 border border-black rounded-sm"></div>
        </div>
      </div>

      {/* Header */}
      <Header title="모아 Call" />

      {/* Loading Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Character with Dots */}
        <div className="relative w-full mb-12">
          {/* Character Image - 사이즈 줄임 */}
          <div className={`absolute top-[284px - 47px] ${getCharacterStyle(characterPosition)} w-[40px] h-[80px]`}>
            <img 
              src="/images/call/character-loading.png" 
              alt="모아 캐릭터" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Loading Dots - 캐릭터 중앙과 높이 맞춰서 표시 */}
          {getAllDots(characterPosition).map((leftPos, index) => (
            <div 
              key={index}
              className={`absolute w-3 h-3 rounded-full bg-[#D2BEA0]`}
              style={{ 
                left: `${leftPos - 6}px`, // dot 폭의 절반만큼 빼기 (12px/2 = 6px)
                top: "320px" // 캐릭터 발 부근 고정값
              }}
            />
          ))}
        </div>

        {/* Loading Message */}
        <div className="text-center px-6">
          <p className="text-black font-ownglyph text-4xl font-normal leading-normal">
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
