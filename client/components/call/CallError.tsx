import { Header } from "@/components/korean/Header";
import { Button } from "@/components/korean/Button";
import { useNavigate } from "react-router-dom";

export const CallError: React.FC = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // 페이지 새로고침으로 다시 시도
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-[#FFFAE7] flex flex-col">
      {/* Header */}
      <Header title="모아 Call" showBackButton={false} />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Error Icon */}
        <div className="w-32 h-32 mb-8 flex items-center justify-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-500 text-4xl">⚠️</span>
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center mb-8">
          <h2 className="text-black font-ownglyph text-2xl font-normal leading-tight mb-4">
            오늘의 이야기를 생성하는 중
            <br />
            문제가 발생했어요
          </h2>
          <p className="text-korean-brown-secondary font-pretendard text-base leading-relaxed">
            네트워크 연결을 확인하시고
            <br />
            다시 시도해주세요
          </p>
        </div>

        {/* Character Image */}
        <div className="w-32 h-32 mb-8">
          <img
            src="/images/postbox/character-letter.png"
            alt="모아 캐릭터"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-4">
          <Button 
            variant="primary" 
            onClick={handleRetry}
            className="w-full h-14 text-lg font-bold"
          >
            다시 시도하기
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={handleGoHome}
            className="w-full h-12 text-base"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};