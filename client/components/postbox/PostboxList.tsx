import { Header } from '@/components/korean/Header';
import { BottomNavigation } from '@/components/korean/BottomNavigation';
import { usePostbox } from '@/hooks/usePostbox';
import { LetterItem } from './LetterItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PostboxList: React.FC = () => {
  const {
    state,
    goToPreviousMonth,
    goToNextMonth,
    selectLetter,
    getLettersForCurrentMonth,
  } = usePostbox();
  const { currentYear, currentMonth } = state;
  const currentMonthLetters = getLettersForCurrentMonth();

  const getMonthName = (month: number) => {
    return `${month}월`;
  };

  return (
    <div className="w-full h-screen bg-[#FFFAE7] flex flex-col overflow-hidden py-2 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex-shrink-0">
        <Header title="모아 우체통" variant="large" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 py-2 min-h-0">
        {/* Month Navigation */}
        <div className="flex-shrink-0 mb-4">
          <div className="flex items-center justify-between bg-korean-cream rounded-lg p-3">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-lg hover:bg-korean-brown-light transition-colors"
              aria-label="이전 달"
            >
              <ChevronLeft className="w-5 h-5 text-korean-brown-primary" />
            </button>
            <h2 className="text-korean-brown-primary font-pretendard text-lg font-bold leading-normal tracking-tight">
              {currentYear}년 {getMonthName(currentMonth)}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-korean-brown-light transition-colors"
              aria-label="다음 달"
            >
              <ChevronRight className="w-5 h-5 text-korean-brown-primary" />
            </button>
          </div>
        </div>

        {/* Letters Count */}
        <div className="pb-4">
          <p className="text-black font-pretendard text-xl font-normal leading-normal tracking-tight">
            총 <span className="font-bold">{currentMonthLetters.length}통</span>
            의 이야기가 있어요.
          </p>
        </div>

        {/* Letters Grid */}
        <div className="flex-1 overflow-y-auto px-2">
          <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto pb-6">
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
