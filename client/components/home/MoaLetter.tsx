interface MoaLetterProps {
  content: string;
}

export const MoaLetter: React.FC<MoaLetterProps> = ({ content }) => {
  return (
    <div className="w-full bg-[#FDE7BE] rounded-xl p-5 flex flex-col items-center gap-2.5">
      {/* Title */}
      <h3 className="w-full text-black font-ownglyph text-2xl font-normal tracking-tight border-b border-[#D8C2A1] pb-2 mb-1">
        모아의 편지
      </h3>
      
      {/* Letter Content */}
      <div className="w-full h-77 bg-[#FFFCF2] rounded-xl relative">
        {/* Letter text */}
        <div className="absolute left-2 top-3 w-76 text-black font-ownglyph text-xl font-normal tracking-tight leading-relaxed italic">
          {content}
        </div>
        
        {/* Moa character illustration */}
        <img
          src="/images/moa-letter.png"
          alt="모아 캐릭터 - 편지"
          className="absolute right-12 bottom-12 w-29 h-29 object-contain"
        />
      </div>
    </div>
  );
};
