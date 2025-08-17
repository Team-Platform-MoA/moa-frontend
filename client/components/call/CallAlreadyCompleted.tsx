import { Header } from '@/components/korean/Header';
import { Button } from '@/components/korean/Button';
import { useNavigate } from 'react-router-dom';

export const CallAlreadyCompleted: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleViewTodayStory = () => {
    // 홈에서 오늘의 이야기를 볼 수 있도록 홈으로 이동
    navigate('/home');
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-[#FFFAE7] flex flex-col py-4">
      {/* Header */}
      <Header title="모아 Call" showBackButton={false} />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Character Image */}
        <div className="w-40 h-40 mb-8">
          <img
            src="/images/call/character-completed.png"
            alt="모아 캐릭터"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Message */}
        <div className="text-center mb-12">
          <h2 className="text-black font-ownglyph text-3xl font-normal leading-tight mb-6">
            오늘은 이미
            <br />
            상담을 완료했어요!
          </h2>
          <p className="text-korean-brown-secondary font-pretendard text-lg leading-relaxed">
            내일 다시 찾아와주세요
            <br />
            오늘의 이야기는 홈에서 확인하실 수 있어요
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-4">
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
