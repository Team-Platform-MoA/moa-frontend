import { Header } from "@/components/korean/Header";
import { usePostbox } from "@/hooks/usePostbox";

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
    type: "stress" | "resilience" | "emotionalStability",
  ) => {
    switch (type) {
      case "stress":
        return { bg: "#FFDBDB", fill: "#FF6E6E" };
      case "resilience":
        return { bg: "#E1F7BE", fill: "#B2E96F" };
      case "emotionalStability":
        return { bg: "#EAE3ED", fill: "#8A50C1" };
      default:
        return { bg: "#D9EEF0", fill: "#4CC3BE" };
    }
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-[#FFFAE7] flex flex-col overflow-y-auto">
      {/* Header */}
      <Header title="모아 우체통" showBackButton={true} onBack={closeLetter} />

      <div className="flex-1 px-6 pb-6">
        {/* Title */}
        <div className="pt-8 pb-6">
          <h1 className="text-black font-pretendard text-[32px] font-bold leading-normal tracking-tight">
            {formatDate(selectedLetter.date)}의 이야기
          </h1>
        </div>

        {/* Emotion Score Section */}
        <div className="w-full bg-[#FFFCF2] rounded-t-xl p-5 relative">
          {/* Emotion Score */}
          <h2 className="text-black font-pretendard text-xl font-bold leading-normal tracking-tight mb-6">
            {selectedLetter.title}
          </h2>

          {/* Score Display */}
          <div className="flex items-center gap-4 mb-4">
            {/* Score Circle */}
            <div className="relative">
              <div className="w-15 h-[68px] bg-[#DCEAEB] rounded-full flex items-center justify-center">
                <span className="text-black font-pretendard text-4xl font-medium leading-normal">
                  {selectedLetter.emotionScore}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 relative">
                <div className="w-full h-2.5 bg-[#D9EEF0] rounded-full"></div>
                <div
                  className="h-2.5 bg-[#4CC3BE] rounded-full absolute top-0 left-0"
                  style={{
                    width: `${(selectedLetter.emotionScore / 100) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Happy Face */}
              <div className="w-5 h-5">
                <img
                  src="/images/postbox/character-letter.png"
                  alt="행복한 얼굴"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="w-full bg-[#FFFCF2] rounded-b-xl p-5">
          <h3 className="text-black font-pretendard text-xl font-bold leading-normal tracking-tight mb-5">
            감정점수 상세 분석
          </h3>

          <div className="space-y-[18px]">
            {/* Stress */}
            <div className="space-y-1">
              <div className="text-black font-pretendard text-base font-semibold leading-normal tracking-tight">
                스트레스
              </div>
              <div className="text-black font-pretendard text-base font-light leading-normal tracking-tight">
                당신의 이야기 속에서 얼마나 많은 스���레스가
                <br />
                느껴지는 지에 대한 지표예요.
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 relative mr-4">
                  <div className="w-full h-2.5 bg-[#FFDBDB] rounded-full"></div>
                  <div
                    className="h-2.5 bg-[#FF6E6E] rounded-full absolute top-0 left-0"
                    style={{
                      width: `${selectedLetter.emotionalAnalysis.stress}%`,
                    }}
                  ></div>
                </div>
                <span className="text-black font-pretendard text-base font-normal leading-normal tracking-tight">
                  {selectedLetter.emotionalAnalysis.stress}%
                </span>
              </div>
            </div>

            {/* Resilience */}
            <div className="space-y-1">
              <div className="text-black font-pretendard text-base font-semibold leading-normal tracking-tight">
                회복 탄력성
              </div>
              <div className="text-black font-pretendard text-base font-light leading-normal tracking-tight">
                마주한 사건에 대해 긍정적으로 극복하며 도약의
                <br />
                발판으로 삼을 수 있는 마음 가짐을 의미해요.
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 relative mr-4">
                  <div className="w-full h-2.5 bg-[#E1F7BE] rounded-full"></div>
                  <div
                    className="h-2.5 bg-[#B2E96F] rounded-full absolute top-0 left-0"
                    style={{
                      width: `${selectedLetter.emotionalAnalysis.resilience}%`,
                    }}
                  ></div>
                </div>
                <span className="text-black font-pretendard text-base font-normal leading-normal tracking-tight">
                  {selectedLetter.emotionalAnalysis.resilience}%
                </span>
              </div>
            </div>

            {/* Emotional Stability */}
            <div className="space-y-1">
              <div className="text-black font-pretendard text-base font-semibold leading-normal tracking-tight">
                정서 안정
              </div>
              <div className="text-black font-pretendard text-base font-light leading-normal tracking-tight">
                당신이 얼마나 차분하고
                <br />
                안정 되었는지에 대한 지표예요.
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 relative mr-4">
                  <div className="w-full h-2.5 bg-[#EAE3ED] rounded-full"></div>
                  <div
                    className="h-2.5 bg-[#8A50C1] rounded-full absolute top-0 left-0"
                    style={{
                      width: `${selectedLetter.emotionalAnalysis.emotionalStability}%`,
                    }}
                  ></div>
                </div>
                <span className="text-black font-pretendard text-base font-normal leading-normal tracking-tight">
                  {selectedLetter.emotionalAnalysis.emotionalStability}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Moa's Letter */}
        <div className="w-full bg-[#FDE7BE] rounded-xl p-5 mt-6 relative">
          <h3 className="text-black font-ownglyph text-2xl font-normal leading-normal tracking-tight mb-4">
            모아의 편지
          </h3>

          <div className="bg-[#FFFCF2] rounded-xl p-3 min-h-[200px] relative">
            <p className="text-black font-ownglyph text-xl font-normal leading-normal tracking-tight whitespace-pre-line">
              {selectedLetter.moaLetter}
            </p>
          </div>
        </div>

        {/* Character Image */}
        <div className="flex justify-center mt-8">
          <div className="w-[116px] h-[116px]">
            <img
              src="/images/postbox/character-letter.png"
              alt="모아 캐릭터"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
