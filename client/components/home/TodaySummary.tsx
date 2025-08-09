interface TodaySummaryProps {
  summary: string;
  score: number;
}

export const TodaySummary: React.FC<TodaySummaryProps> = ({ summary, score }) => {
  const progressPercentage = (score / 100) * 100; // Assuming score is out of 100

  return (
    <div className="w-full h-39 bg-[#FFFCF2] rounded-t-xl relative">
      {/* Score Circle Background */}
      <div className="absolute left-5.5 top-16 w-15 h-17">
        <svg width="60" height="68" viewBox="0 0 60 68" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M27.2439 0.0623599C41.2201 -0.864778 53.9289 8.6456 58.3322 21.9643C62.812 35.5145 58.0451 50.2685 46.6968 58.9016C34.5208 68.1643 17.075 72.097 5.34526 62.2735C-5.07195 53.5492 2.16781 38.2178 6.68306 25.3906C10.6768 14.0448 15.2598 0.857353 27.2439 0.0623599Z" fill="#DCEAEB"/>
        </svg>
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
        <div 
          className="absolute top-0 w-5 h-5 transition-all duration-500"
          style={{ left: `${Math.min(progressPercentage * 0.84, 84)}%` }}
        >
          <div className="w-5 h-5 bg-korean-brown-secondary rounded-full border border-korean-brown-primary"></div>
        </div>

        {/* Emotion faces */}
        <div className="absolute right-2 top-8 flex gap-1">
          {/* Sad face */}
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M3 5.5C3 5.5 3 5.5 3.02 5.52C3.04 5.54 3.08 5.57 3.13 5.60C3.17 5.64 3.23 5.68 3.36 5.80" stroke="black" strokeWidth="1" strokeLinecap="round"/>
            <path d="M8 5C8 5.03 8 5.05 8.01 5.09C8.04 5.12 8.06 5.16 8.13 5.20" stroke="black" strokeWidth="1" strokeLinecap="round"/>
            <path d="M4.21 8.05C4.54 7.57 4.64 7.38 4.85 7.27C5.05 7.17 5.33 7.00 5.55 6.89C5.71 6.81 5.96 6.80 6.16 6.75C6.83 6.60 7.35 6.68 7.5 6.75C8 7 8.22 7.73 8.30 7.93" stroke="black" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          
          {/* Happy face */}
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M9.1 5.92C8.84 5.92 8.57 5.92 8.57 6.05C8.57 6.18 8.83 6.44 9.1 6.52" stroke="black" strokeWidth="1" strokeLinecap="round"/>
            <path d="M10.88 5.92C10.94 5.92 11.01 5.92 11.01 6.02C11.01 6.12 10.94 6.31 11.11 6.41C11.27 6.52 11.67 6.52 11.67 6.12" stroke="black" strokeWidth="1" strokeLinecap="round"/>
            <path d="M9.49 7.10C10.28 7.15 10.28 7.69 10.34 7.60C10.81 7.50 11.14 7.30 11.34 7.03C11.54 6.77 11.61 6.44 11.67 6.10" stroke="black" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Summary Text */}
      <h2 className="absolute left-5 top-6 text-black font-pretendard text-xl font-bold tracking-tight max-w-76">
        {summary}
      </h2>
    </div>
  );
};
