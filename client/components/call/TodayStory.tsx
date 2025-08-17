import { Header } from '@/components/korean/Header';
import { Button } from '@/components/korean/Button';
import { TodayStory as TodayStoryType } from '@/services/api';
import { useNavigate } from 'react-router-dom';

interface TodayStoryProps {
  story: TodayStoryType;
}

export const TodayStory: React.FC<TodayStoryProps> = ({ story }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleRetakeCall = () => {
    // 오늘의 이야기를 삭제하고 새로 상담 시작
    const confirmed = window.confirm(
      '오늘의 이야기를 삭제하고 새로 상담을 시작하시겠습니까?',
    );
    if (confirmed) {
      try {
        const existingStories = JSON.parse(
          localStorage.getItem('todayStories') || '[]',
        );
        const updatedStories = existingStories.filter(
          (s: any) => s.date !== story.date,
        );
        localStorage.setItem('todayStories', JSON.stringify(updatedStories));

        // 페이지 새로고침하여 처음부터 시작
        window.location.reload();
      } catch (error) {
        console.error('이야기 삭제 실패:', error);
      }
    }
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-[#FFFAE7] flex flex-col overflow-hidden py-4 animate-in fade-in slide-in-from-right duration-300">
      {/* Header */}
      <Header title="오늘의 이야기" showBackButton={false} />

      <div className="flex-1 overflow-y-auto px-6 pb-28">
        {/* Title */}
        <div className="pt-8 pb-4">
          <h1 className="text-black font-pretendard text-[32px] font-bold leading-normal tracking-tight">
            {formatDate(story.date)}의 이야기
          </h1>
        </div>

        {/* Moa's Letter */}
        <div className="w-full bg-[#FDE7BE] rounded-xl p-5 mt-4 mb-6 relative">
          <h3 className="text-black font-ownglyph text-2xl font-normal leading-normal tracking-tight mb-4">
            모아의 편지
          </h3>

          <div className="bg-[#FFFCF2] rounded-xl p-3 min-h-[200px] relative">
            <p className="text-black font-ownglyph text-xl font-normal leading-normal tracking-tight whitespace-pre-line">
              {story.moaLetter}
            </p>
          </div>
        </div>

        {/* Emotion Score Section */}
        <div className="w-full bg-[#FFFCF2] rounded-t-xl p-5 relative">
          <h3 className="text-[20px] font-bold text-black mb-6 font-['Pretendard']">
            {story.title}
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
                  {story.emotionScore}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="ml-8 flex-1">
              <div className="relative">
                <div className="w-full h-[9px] bg-[#D9EEF0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4CC3BE] rounded-full transition-all duration-300"
                    style={{
                      width: `${story.emotionScore}%`,
                    }}
                  />
                </div>
                {/* Bird on progress bar */}
                <img
                  src="/images/postbox/bird-small.png"
                  alt="새"
                  className="absolute top-[-24px] w-6 h-6 object-contain transition-all duration-300"
                  style={{
                    left: `calc(${story.emotionScore}% - 12px)`,
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
                        width: `${story.emotionalAnalysis.stress}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-[16px] text-black font-['Pretendard']">
                  {story.emotionalAnalysis.stress}%
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
                        width: `${story.emotionalAnalysis.resilience}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-[16px] text-black font-['Pretendard']">
                  {story.emotionalAnalysis.resilience}%
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
                        width: `${story.emotionalAnalysis.emotionalStability}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-[16px] text-black font-['Pretendard']">
                  {story.emotionalAnalysis.emotionalStability}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 px-4 space-y-3">
          <Button
            variant="primary"
            onClick={handleGoHome}
            className="w-full h-14 text-lg font-bold"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};
