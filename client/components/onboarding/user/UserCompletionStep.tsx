import { Header } from "@/components/korean/Header";
import { ProgressBar } from "@/components/korean/ProgressBar";
import { Button } from "@/components/korean/Button";
import { useOnboarding } from "@/hooks/useOnboarding";

export const UserCompletionStep: React.FC = () => {
  const { state, dispatch } = useOnboarding();
  const { userProfile } = state;

  const handleNext = () => {
    dispatch({ type: "SET_FLOW", payload: "family" });
    dispatch({ type: "SET_STEP", payload: 1 });
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
  };

  return (
    <div className="w-screen h-screen bg-korean-cream flex flex-col fixed inset-0">
      {/* Header */}
      <div className="pt-6 pb-6">
        <Header title="내 프로필 설정" showBackButton onBack={handleBack} />
      </div>

      {/* Progress */}
      <div className="pb-4">
        <ProgressBar current={5} total={5} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-10">
        <div className="text-center mb-12">
          <h2 className="text-black font-ownglyph text-[32px] font-normal leading-tight tracking-tight mb-8">
            {userProfile.name}님의 프로필이
            <br />
            완성되었어요.
            <br />
            <br />
            이제 가족에 대한 간단한 정보를
            <br />
            알려주세요!
          </h2>
        </div>

        {/* Placeholder for image - using a simple colored circle */}
        <div className="w-60 h-60 bg-korean-brown-secondary rounded-full mb-12 flex items-center justify-center">
          <div className="w-32 h-32 bg-korean-brown-primary rounded-full"></div>
        </div>
      </div>

      {/* Next button */}
      <div className="px-6 pb-8">
        <Button variant="primary" onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  );
};
