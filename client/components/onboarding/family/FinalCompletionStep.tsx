import { Header } from "@/components/korean/Header";
import { ProgressBar } from "@/components/korean/ProgressBar";
import { Button } from "@/components/korean/Button";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useNavigate } from "react-router-dom";
import {
  submitOnboarding,
  convertOnboardingStateToRequest,
} from "@/services/api";
import { useState } from "react";

export const FinalCompletionStep: React.FC = () => {
  const { state, dispatch } = useOnboarding();
  const { userProfile } = state;
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleComplete = async () => {
    setIsLoading(true);

    try {
      // 온보딩 데이터를 API 형식으로 변환
      const requestData = convertOnboardingStateToRequest(state);
      console.log("온보딩 데이터 전송:", requestData);

      // API 호출
      const response = await submitOnboarding(requestData);

      if (response.success && response.data?.user_id) {
        console.log("온보딩 완료 성공:", response.data);
        // user_id를 localStorage에 저장
        localStorage.setItem("user_id", response.data.user_id);
        dispatch({ type: "RESET" });
        navigate("/home");
      } else {
        console.error("온보딩 실패:", response.message);
        alert("온보딩 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("온보딩 처리 오류:", error);
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
  };

  return (
    <div className="w-screen h-dvh bg-korean-cream flex flex-col fixed inset-0 pb-safe-bottom">
      {/* Header */}
      <div className="pt-6 pb-6">
        <Header title="가족 프로필 설정" showBackButton onBack={handleBack} />
      </div>

      {/* Progress */}
      <div className="pb-4">
        <ProgressBar current={5} total={5} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-16 pt-8">
        <div className="text-center mb-8">
          <h2 className="text-black font-ownglyph text-[32px] font-normal leading-tight tracking-tight mb-6">
            전부 완성되었어요!
            <br />
            <br />
            이제 제가 {userProfile.name}님께 맞는
            <br />
            마음 케어를 시작해드릴게요.
          </h2>
        </div>

        {/* Character Image */}
        <div className="mb-8 flex-shrink-0">
          <img
            src="/images/call/character-completed.png"
            alt="완료된 모아 캐릭터"
            className="w-48 h-48 object-contain"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-8" />
      </div>

      {/* Complete button */}
      <div className="px-6 pb-16 pt-4">
        <Button variant="primary" onClick={handleComplete} disabled={isLoading}>
          {isLoading ? "처리 중..." : "완료하기"}
        </Button>
      </div>
    </div>
  );
};
