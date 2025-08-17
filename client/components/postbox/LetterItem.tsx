import { Letter } from '@/hooks/usePostbox';

interface LetterItemProps {
  letter: Letter;
  onClick: (letter: Letter) => void;
}

export const LetterItem: React.FC<LetterItemProps> = ({ letter, onClick }) => {
  const getLetterImagePath = (style: Letter['letterStyle']) => {
    const styleMap = {
      envelope1: 'envelope1.png',
      envelope2: 'envelope2.png',
      envelope3: 'envelope3.png',
      envelope4: 'envelope4.png',
    };
    return `/images/postbox/${styleMap[style]}`;
  };

  const formatDate = (dateString: string) => {
    // API에서 이미 "8월 17일" 형식으로 오므로 그대로 반환
    return dateString;
  };

  return (
    <button
      onClick={() => onClick(letter)}
      className="flex flex-col items-center gap-1 w-full aspect-[1.1/1] p-1 border-none"
    >
      {/* Letter Image */}
      <div className="w-full h-5/6 flex-shrink-0">
        <img
          src={getLetterImagePath(letter.letterStyle)}
          alt={`${formatDate(letter.date)} 편지`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Date */}
      <div className="text-black text-center font-pretendard text-base sm:text-lg md:text-xl font-normal leading-tight tracking-tight">
        {formatDate(letter.date)}
      </div>
    </button>
  );
};
