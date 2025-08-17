import { Header } from '@/components/korean/Header';
import { usePostbox } from '@/hooks/usePostbox';

export const PostboxDetail: React.FC = () => {
  const { state, closeLetter } = usePostbox();
  const { selectedLetter } = state;

  if (!selectedLetter) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const getProgressBarColor = (
    type: 'stress' | 'resilience' | 'emotionalStability',
  ) => {
    switch (type) {
      case 'stress':
        return { bg: '#FFDBDB', fill: '#FF6E6E' };
      case 'resilience':
        return { bg: '#E1F7BE', fill: '#B2E96F' };
      case 'emotionalStability':
        return { bg: '#EAE3ED', fill: '#8A50C1' };
      default:
        return { bg: '#D9EEF0', fill: '#4CC3BE' };
    }
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-[#FFFAE7] flex flex-col overflow-hidden py-4">
      {/* Header */}
      <Header title="모아 우체통" showBackButton={true} onBack={closeLetter} />

      <div className="flex-1 overflow-y-auto px-6 pb-28">
        {/* Title */}
        <div className="pt-8 pb-4">
          <h1 className="text-black font-pretendard text-[32px] font-bold leading-normal tracking-tight">
            {formatDate(selectedLetter.date)}의 이야기
          </h1>
        </div>

        {/* Moa's Letter */}
        <div className="w-full bg-[#FDE7BE] rounded-xl p-5 mt-4 mb-6 relative">
          <h3 className="text-black font-ownglyph text-2xl font-normal leading-normal tracking-tight mb-4">
            모아의 편지
          </h3>

          <div className="bg-[#FFFCF2] rounded-xl p-3 min-h-[200px] relative">
            <p className="text-black font-ownglyph text-xl font-normal leading-normal tracking-tight whitespace-pre-line">
              {selectedLetter.moaLetter}
            </p>
            <p className="text-black font-ownglyph text-xl font-bold leading-normal tracking-tight whitespace-pre-line mt-4">
              모아가 추천하는 오늘의 조언
            </p>
            <p className="text-black font-ownglyph text-xl font-normal leading-normal tracking-tight whitespace-pre-line mt-2">
              액션 플랜 데이터
            </p>
          </div>
        </div>

        {/* Emotion Score Section */}
        <div className="w-full bg-[#FFFCF2] rounded-t-xl p-5 relative">
          <h3 className="text-[20px] font-bold text-black mb-6 font-['Pretendard']">
            {selectedLetter.title}
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
                  {selectedLetter.emotionScore}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="ml-8 flex-1">
              <div className="w-full h-[9px] bg-[#D9EEF0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4CC3BE] rounded-full transition-all duration-300"
                  style={{
                    width: `${selectedLetter.emotionScore}%`,
                  }}
                />
              </div>
              {/* Happy/Sad faces */}
              <div className="flex justify-between mt-2">
                <img
                  src="/images/postbox/bad.png"
                  alt="슬픈 얼굴"
                  className="w-3 h-3 object-contain"
                />
                <img
                  src="/images/postbox/character-letter.png"
                  alt="행복한 얼굴"
                  className="w-3 h-3 object-contain"
                />
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
                        width: `${selectedLetter.emotionalAnalysis.stress}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-[16px] text-black font-['Pretendard']">
                  {selectedLetter.emotionalAnalysis.stress}%
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
                        width: `${selectedLetter.emotionalAnalysis.resilience}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-[16px] text-black font-['Pretendard']">
                  {selectedLetter.emotionalAnalysis.resilience}%
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
                        width: `${selectedLetter.emotionalAnalysis.emotionalStability}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-[16px] text-black font-['Pretendard']">
                  {selectedLetter.emotionalAnalysis.emotionalStability}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
