import { useReport } from '../../hooks/useReport';
import { Header } from '../korean/Header';

export function ReportDetail() {
  const { selectedReport, goBackToList } = useReport();

  if (!selectedReport) {
    return null;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const formatWeekRange = (startStr: string, endStr: string) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    return `${start.getMonth() + 1}월 ${start.getDate()}일 - ${end.getMonth() + 1}월 ${end.getDate()}일`;
  };

  return (
    <div className="w-full h-dvh bg-[#FFFAE7] flex flex-col py-4 animate-in fade-in slide-in-from-right duration-300 pb-safe-bottom">
      {/* Header */}
      <Header title="주간 리포트" showBackButton={true} onBack={goBackToList} />

      <div className="flex-1 overflow-y-auto px-6 pb-28">
        {/* Title */}
        <div className="pt-8 pb-4">
          <h2 className="text-[32px] font-bold text-black leading-none tracking-[-0.64px] font-['Pretendard']">
            {selectedReport.title}
          </h2>
          <p className="text-[16px] text-gray-600 mt-2 font-['Pretendard']">
            {formatWeekRange(selectedReport.weekStart, selectedReport.weekEnd)}
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="w-full mb-6 bg-[#FFFCF2] rounded-t-xl p-5">
          <h3 className="text-[20px] font-bold text-black mb-6 font-['Pretendard']">
            종합 감정 점수
          </h3>

          {/* Score Circle and Progress */}
          <div className="flex items-center mb-4">
            {/* Blob background */}
            <div className="relative">
              <svg
                width="60"
                height="68"
                viewBox="0 0 60 68"
                fill="none"
                className="absolute"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M27.2439 0.0623599C41.2201 -0.864778 53.9289 8.6456 58.3322 21.9643C62.812 35.5145 58.0451 50.2685 46.6968 58.9016C34.5208 68.1643 17.075 72.097 5.34526 62.2735C-5.07195 53.5492 2.16781 38.2178 6.68306 25.3906C10.6768 14.0448 15.2598 0.857353 27.2439 0.0623599Z"
                  fill="#DCEAEB"
                />
              </svg>
              <div className="relative z-10 w-[60px] h-[68px] flex items-center justify-center">
                <span className="text-[36px] font-medium text-black font-['Pretendard']">
                  {selectedReport.emotionScore}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="ml-8 flex-1">
              <div className="w-full h-[9px] bg-[#D9EEF0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4CC3BE] rounded-full transition-all duration-300"
                  style={{
                    width: `${selectedReport.emotionScore}%`,
                  }}
                />
              </div>
              {/* Happy/Sad faces */}
              <div className="flex justify-between mt-2">
                <span className="text-[12px]">😢</span>
                <span className="text-[12px]">😊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="w-full bg-[#FFFCF2] rounded-b-xl p-5">
          <h3 className="text-[20px] font-bold text-black mb-6 font-['Pretendard']">
            감정점수 상세 분석
          </h3>

          <div className="space-y-6">
            {/* Stress */}
            <div className="space-y-2">
              <h4 className="text-[16px] font-bold text-black font-['Pretendard']">
                스트레스
              </h4>
              <p className="text-[16px] text-black font-['Pretendard'] leading-normal">
                당신의 이야기 속에서 얼마나 많은 스트레스가
                <br />
                느껴지는 지에 대한 지표예요.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="w-full h-[9px] bg-[#FFDBDB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF6E6E] rounded-full transition-all duration-300"
                      style={{
                        width: `${selectedReport.emotionalAnalysis.stress}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-[16px] text-black font-['Pretendard']">
                  {selectedReport.emotionalAnalysis.stress}%
                </span>
              </div>
            </div>

            {/* Resilience */}
            <div className="space-y-2">
              <h4 className="text-[16px] font-bold text-black font-['Pretendard']">
                회복 탄력성
              </h4>
              <p className="text-[16px] text-black font-['Pretendard'] leading-normal">
                마주한 사건에 대해 긍정적으로 극복하며 도약의
                <br />
                발판으로 삼을 수 있는 마음 가짐을 의미해요.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="w-full h-[9px] bg-[#E1F7BE] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B2E96F] rounded-full transition-all duration-300"
                      style={{
                        width: `${selectedReport.emotionalAnalysis.resilience}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-[16px] text-black font-['Pretendard']">
                  {selectedReport.emotionalAnalysis.resilience}%
                </span>
              </div>
            </div>

            {/* Emotional Stability */}
            <div className="space-y-2">
              <h4 className="text-[16px] font-bold text-black font-['Pretendard']">
                정서 안정
              </h4>
              <p className="text-[16px] text-black font-['Pretendard'] leading-normal">
                당신이 얼마나 차분하고
                <br />
                안정 되었는지에 대한 지표예요.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="w-full h-[9px] bg-[#EAE3ED] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#8A50C1] rounded-full transition-all duration-300"
                      style={{
                        width: `${selectedReport.emotionalAnalysis.emotionalStability}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-[16px] text-black font-['Pretendard']">
                  {selectedReport.emotionalAnalysis.emotionalStability}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Letter */}
        <div className="w-full mt-6 bg-[#FDE7BE] rounded-xl p-5">
          <h3 className="text-[24px] font-['Ownglyph_ryuttung'] text-black mb-4 leading-none tracking-[-0.48px]">
            모아의 편지
          </h3>

          <div className="bg-[#FFFCF2] rounded-xl p-4">
            <div className="text-[20px] font-['Ownglyph_ryuttung'] text-black leading-normal tracking-[-0.4px]">
              {selectedReport.aiRecommendations}
              <br />
              <br />
              {selectedReport.insights}
            </div>
          </div>

          {/* Moa Character */}
          <div className="flex justify-center mt-4">
            <div className="w-[116px] h-[116px] bg-[#4CC3BE] rounded-full flex items-center justify-center">
              {/* Simple character representation */}
              <div className="text-[48px]">🐦</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
