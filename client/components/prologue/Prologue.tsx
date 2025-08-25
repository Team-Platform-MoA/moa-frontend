import { Button } from '@/components/korean/Button';
import { usePrologue } from '@/hooks/usePrologue';
import { useNavigate } from 'react-router-dom';

export const Prologue: React.FC = () => {
  const { state, nextStep } = usePrologue();
  const navigate = useNavigate();
  const { currentStep } = state;

  const handleNext = () => {
    if (currentStep === 4) {
      // 마지막 화면에서는 온보딩으로 이동
      navigate('/onboarding');
    } else {
      nextStep();
    }
  };

  const getPrologueContent = () => {
    switch (currentStep) {
      case 1:
        return {
          image: '/images/character-empty.png',
          description:
            '안녕하세요! 저는 모아예요.\n\n치매 가족을 돌보는 당신의 마음을 이해하고\n함께하는 친구가 되어드릴게요',
        };
      case 2:
        return {
          image: '/images/character-empty.png',
          description:
            '매일 힘든 하루를 보내고 계시죠?\n\n혼자 감당하기 어려운 감정들을\n저와 함께 나누어보세요',
        };
      case 3:
        return {
          image: '/images/character-empty.png',
          description:
            '오늘의 이야기를 들려주시면\n\nAI가 분석한 맞춤형 감정일기와\n따뜻한 편지를 써드릴게요',
        };
      case 4:
        return {
          image: '/images/character-empty.png',
          description:
            '준비되셨나요? 함께 시작해볼까요?\n\n당신의 마음을 돌보는 첫걸음을\n지금 시작해보세요',
        };
      default:
        return {
          image: '/images/character-empty.png',
          description:
            '안녕하세요! 저는 모아예요.\n\n치매 가족을 돌보는 당신의 마음을 이해하고\n함께하는 친구가 되어드릴게요',
        };
    }
  };

  const content = getPrologueContent();
  const isLastStep = currentStep === 4;

  return (
    <div className="w-screen h-dvh bg-korean-cream flex flex-col fixed inset-0 pb-safe-bottom">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Character and Message Section */}
        <div className="flex flex-col items-center gap-8 mb-16">
          {/* Character Image */}
          <div className="relative">
            <img
              src={content.image}
              alt="모아 캐릭터"
              className="w-55 h-55 object-contain"
            />
          </div>

          {/* Description */}
          <div className="max-w-80">
            <p className="text-black text-center font-ownglyph text-2xl font-normal leading-relaxed whitespace-pre-line">
              {content.description}
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors ${
                step === currentStep ? 'bg-[#6A3E01]' : 'bg-[#D8C2A1]'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <div className="w-full max-w-86 px-6 pb-safe-bottom">
          <Button variant="primary" onClick={handleNext}>
            {isLastStep ? '시작하기' : '다음'}
          </Button>
        </div>
      </div>
    </div>
  );
};
