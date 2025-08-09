interface MoaLetterProps {
  content: string;
}

export const MoaLetter: React.FC<MoaLetterProps> = ({ content }) => {
  return (
    <div className="w-full bg-[#FDE7BE] rounded-xl p-5 flex flex-col items-center gap-2.5">
      {/* Title */}
      <h3 className="w-full text-black font-ownglyph text-2xl font-normal tracking-tight">
        모아의 편지
      </h3>
      
      {/* Letter Content */}
      <div className="w-full h-77 bg-[#FFFCF2] rounded-xl relative">
        {/* Letter text */}
        <div className="absolute left-2 top-3 w-76 text-black font-ownglyph text-xl font-normal tracking-tight leading-relaxed">
          {content}
        </div>
        
        {/* Moa character illustration placeholder */}
        <div className="absolute right-12 bottom-12 w-29 h-29 bg-korean-brown-secondary rounded-full flex items-center justify-center">
          <div className="w-20 h-20 bg-korean-brown-primary rounded-full"></div>
          {/* Letter/envelope icon */}
          <div className="absolute -top-2 -left-2 w-8 h-6 bg-korean-brown-light rounded border border-korean-brown-border"></div>
        </div>
      </div>
    </div>
  );
};
