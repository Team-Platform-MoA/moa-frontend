import { Letter } from "@/hooks/usePostbox";

interface LetterItemProps {
  letter: Letter;
  onClick: (letter: Letter) => void;
}

export const LetterItem: React.FC<LetterItemProps> = ({ letter, onClick }) => {
  const getLetterImagePath = (style: Letter["letterStyle"]) => {
    const styleMap = {
      envelope1: "envelope1.png",
      envelope2: "envelope2.png",
      envelope3: "envelope3.png",
      envelope4: "envelope4.png",
    };
    return `/images/postbox/${styleMap[style]}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}��� ${date.getDate()}일`;
  };

  return (
    <button
      onClick={() => onClick(letter)}
      className="flex flex-col items-center gap-0.5 w-[115px] h-[100px] p-0 px-4"
    >
      {/* Letter Image */}
      <div className="w-[98px] h-[78px] flex-shrink-0">
        <img
          src={getLetterImagePath(letter.letterStyle)}
          alt={`${formatDate(letter.date)} 편지`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Date */}
      <div className="text-black text-center font-pretendard text-sm font-normal leading-normal tracking-tight">
        {formatDate(letter.date)}
      </div>
    </button>
  );
};
