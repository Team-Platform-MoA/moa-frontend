import { Button } from "@/components/korean/Button";
import { Header } from "@/components/korean/Header";
import { useCall } from "@/hooks/useCall";

interface CallQuestionProps {
  questionNumber: number;
  question: string;
  onNext: () => void;
  onBack?: () => void;
}

export const CallQuestion: React.FC<CallQuestionProps> = ({ 
  questionNumber, 
  question, 
  onNext, 
  onBack 
}) => {
  const { state } = useCall();
  const { timer, canProceed, isRecommendedTimeReached } = state;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-[#FFFAE7] flex flex-col">
      {/* Status Bar */}
      <div className="w-full h-12 flex items-center justify-between px-7 pt-3.5">
        <div className="text-[#1D1E18] text-[17px] font-semibold font-['SF Pro Text'] leading-snug tracking-tight">
          9:41
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <path d="M6.11231 8.95898C7.49091 7.68035 9.51017 7.68017 10.8887 8.95898C10.9579 9.02774 10.9981 9.12508 11 9.22753C11.0019 9.33007 10.9652 9.42913 10.8984 9.50097L8.73926 11.8906C8.67602 11.9606 8.58985 12 8.50001 12C8.41015 12 8.32398 11.9606 8.26075 11.8906L6.10157 9.50097C6.03487 9.42907 5.99803 9.33008 6.00001 9.22753C6.00199 9.12499 6.04291 9.02771 6.11231 8.95898Z" fill="#1D1E18"/>
            </svg>
          </div>
          <div className="w-[27px] h-3 opacity-35 border border-black rounded-sm"></div>
        </div>
      </div>

      {/* Header */}
      <Header 
        title="모아 Call" 
        showBackButton={true} 
        onBack={onBack}
      />

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-start pt-8">
        <div className="text-center px-6 mb-8">
          <p className="text-black font-['Ownglyph ryuttung'] text-2xl font-normal leading-normal max-w-[255px]">
            {String(questionNumber).padStart(2, '0')}<br />
            {question}<br />
            (권장시간 1분)
          </p>
        </div>

        {/* Timer */}
        <div className="mb-8">
          <div className="text-black font-pretendard text-4xl font-bold leading-normal tracking-tight">
            {formatTime(timer)}
          </div>
        </div>

        {/* Character Image */}
        <div className="w-56 h-56 mb-8">
          <img 
            src="/images/call/character-question.png" 
            alt="모아 캐릭터" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Next Button */}
      <div className="px-6 pb-6">
        <Button
          variant={isRecommendedTimeReached ? "primary" : "waiting"}
          onClick={onNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
