import { Header } from "@/components/korean/Header";

interface CallLoadingProps {
  message: string;
  characterPosition: number; // 1-5 for different positions
}

export const CallLoading: React.FC<CallLoadingProps> = ({ message, characterPosition }) => {
  const getCharacterStyle = (position: number) => {
    const positions = [
      "left-20", // 1st position
      "left-[207px]", // 2nd position  
      "left-[165px]", // 3rd position
      "left-[123px]", // 4th position
      "left-[249px]", // 5th position
    ];
    return positions[position - 1] || "left-20";
  };

  const getDots = (position: number) => {
    const dotConfigs = [
      [163, 205, 247, 289], // 1st: dots at different positions
      [82, 123, 165, 289],  // 2nd
      [82, 123, 247, 289],  // 3rd  
      [82, 205, 247, 289],  // 4th
      [82, 123, 165, 207],  // 5th
    ];
    return dotConfigs[position - 1] || dotConfigs[0];
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
          {/* Character Image */}
          <div className={`absolute top-[331px - 47px] ${getCharacterStyle(characterPosition)} w-[52px] h-[102px]`}>
            <img 
              src="/images/call/character-loading.png" 
              alt="모아 캐릭터" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Loading Dots */}
          {getDots(characterPosition).map((leftPos, index) => (
            <div 
              key={index}
              className={`absolute top-[382px - 47px] w-3 h-3 rounded-full bg-[#D2BEA0] animate-pulse`}
              style={{ left: `${leftPos}px` }}
            />
          ))}
        </div>

        {/* Loading Message */}
        <div className="text-center px-6">
          <p className="text-black font-['Ownglyph ryuttung'] text-4xl font-normal leading-normal">
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
