interface EmotionBarProps {
  title: string;
  description: string;
  percentage: number;
  color: {
    bg: string;
    fill: string;
  };
}

const EmotionBar: React.FC<EmotionBarProps> = ({ title, description, percentage, color }) => {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-black font-pretendard text-base font-semibold tracking-tight">
        {title}
      </h4>
      <p className="text-black font-pretendard text-base font-light tracking-tight leading-relaxed">
        {description}
      </p>
      <div className="flex justify-between items-center">
        <div className="w-61 h-2.5 relative">
          <div 
            className="w-full h-full rounded-full"
            style={{ backgroundColor: color.bg }}
          ></div>
          <div 
            className="h-full rounded-full absolute top-0 left-0"
            style={{ 
              backgroundColor: color.fill,
              width: `${Math.min(percentage, 100)}%`
            }}
          ></div>
        </div>
        <span className="text-black font-pretendard text-base font-normal tracking-tight">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

interface EmotionAnalysisProps {
  analysis: {
    stress: number;
    resilience: number;
    emotionalStability: number;
  };
}

export const EmotionAnalysis: React.FC<EmotionAnalysisProps> = ({ analysis }) => {
  const emotions = [
    {
      title: "스트레스",
      description: "당신의 이야기 속에서 얼마나 많은 스트레스가\n느껴지는 지에 대한 지표예요.",
      percentage: analysis.stress,
      color: { bg: "#FFDBDB", fill: "#FF6E6E" }
    },
    {
      title: "회복 탄력성", 
      description: "마주한 사건에 대해 긍정적으로 극복하며 도약의\n발판으로 삼을 수 있는 마음 가짐을 의미해요.",
      percentage: analysis.resilience,
      color: { bg: "#E1F7BE", fill: "#B2E96F" }
    },
    {
      title: "정서 안정",
      description: "당신이 얼마나 차분하고\n안정 되었는지에 대한 지표예요.",
      percentage: analysis.emotionalStability,
      color: { bg: "#EAE3ED", fill: "#8A50C1" }
    }
  ];

  return (
    <div className="w-full bg-[#FFFCF2] rounded-b-xl p-5 flex flex-col gap-5">
      <h3 className="text-black font-pretendard text-xl font-bold tracking-tight">
        감정점수 상세 분석
      </h3>
      <div className="flex flex-col gap-4.5">
        {emotions.map((emotion, index) => (
          <EmotionBar key={index} {...emotion} />
        ))}
      </div>
    </div>
  );
};
