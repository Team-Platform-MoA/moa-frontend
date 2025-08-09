interface TodaySummaryProps {
  summary: string;
  score: number;
}

export const TodaySummary: React.FC<TodaySummaryProps> = ({ summary, score }) => {
  const progressPercentage = (score / 100) * 100; // Assuming score is out of 100

  return (
    <div className="w-full h-39 bg-[#FFFCF2] rounded-t-xl relative">
      {/* Score Circle Background */}
      <div className="absolute left-5.5 top-16 w-15 h-17 bg-[#DCEAEB] rounded-full flex items-center justify-center">
      </div>

      {/* Score Number */}
      <div className="absolute left-7.5 top-19 text-black font-pretendard text-4xl font-medium">
        {score}
      </div>

      {/* Progress Bar */}
      <div className="absolute left-24.5 top-19 w-56 h-10">
        {/* Background bar */}
        <div className="absolute top-5 w-full h-2.5 bg-[#D9EEF0] rounded-full"></div>
        {/* Progress fill */}
        <div 
          className="absolute top-5 h-2.5 bg-[#4CC3BE] rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
        ></div>
        
        {/* Character icon on progress bar */}
        <img
          src="/images/character-data.png"
          alt="모아 캐릭터"
          className="absolute top-0 w-5 h-5 transition-all duration-500 object-contain"
          style={{ left: `${Math.min(progressPercentage * 0.84, 84)}%` }}
        />

        {/* Emotion faces */}
        <div className="absolute right-2 top-8 flex gap-1">
          {/* Sad face */}
          <div className="w-3 h-2 text-xs flex items-center justify-center">🙁</div>
          {/* Happy face */}
          <div className="w-3 h-2 text-xs flex items-center justify-center">😊</div>
        </div>
      </div>

      {/* Summary Text */}
      <h2 className="absolute left-5 top-6 text-black font-pretendard text-xl font-bold tracking-tight max-w-76">
        {summary}
      </h2>
    </div>
  );
};
