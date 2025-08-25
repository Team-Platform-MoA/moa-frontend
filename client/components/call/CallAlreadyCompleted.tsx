import { Header } from '@/components/korean/Header';
import { Button } from '@/components/korean/Button';
import { BottomNavigation } from '@/components/korean/BottomNavigation';
import { useNavigate } from 'react-router-dom';

export const CallAlreadyCompleted: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-dvh fixed inset-0 bg-[#FFFAE7] flex flex-col py-4 pb-safe-bottom">
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
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="call" />
    </div>
  );
};
