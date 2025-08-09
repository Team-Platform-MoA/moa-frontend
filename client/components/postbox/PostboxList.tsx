import { Header } from "@/components/korean/Header";
import { BottomNavigation } from "@/components/korean/BottomNavigation";
import { usePostbox } from "@/hooks/usePostbox";
import { LetterItem } from "./LetterItem";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const PostboxList: React.FC = () => {
  const { state, goToPreviousMonth, goToNextMonth, selectLetter, getLettersForCurrentMonth } = usePostbox();
  const { currentYear, currentMonth } = state;
  const currentMonthLetters = getLettersForCurrentMonth();

  const getMonthName = (month: number) => {
    return `${month}월`;
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 pt-[60px] pb-4">
          <h1 className="text-black font-pretendard text-[32px] font-bold leading-normal tracking-tight">
            모아 우체통
          </h1>
        </div>

        {/* Month Navigation */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between">
            <button onClick={goToPreviousMonth} className="p-1">
              <ChevronLeft className="w-2.5 h-2.5 text-[#D8C2A1] rotate-0" />
            </button>
            
            <h2 className="text-black font-pretendard text-xl font-bold leading-normal tracking-tight">
              {currentYear}년 {getMonthName(currentMonth)}
            </h2>
            
            <button onClick={goToNextMonth} className="p-1">
              <ChevronRight className="w-2.5 h-2.5 text-[#D8C2A1]" />
            </button>
          </div>
        </div>

        {/* Letters Count */}
        <div className="px-6 pb-4">
          <p className="text-black font-pretendard text-xl font-normal leading-normal tracking-tight">
            총 <span className="font-bold">{currentMonthLetters.length}통</span>의 이야기가 있어요.
          </p>
        </div>

        {/* Letters Grid */}
        <div className="flex-1 px-6 pb-6">
          <div className="grid grid-cols-3 gap-0 w-full max-w-[345px]">
            {currentMonthLetters.map((letter) => (
              <LetterItem 
                key={letter.id} 
                letter={letter} 
                onClick={selectLetter}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="message" />

      {/* Home Indicator */}
      <div className="w-full h-5 flex justify-center items-center pb-2">
        <div className="w-[139px] h-[5px] bg-black rounded-full"></div>
      </div>
    </div>
  );
};
