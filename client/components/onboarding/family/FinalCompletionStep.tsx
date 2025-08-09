import { Header } from "@/components/korean/Header";
import { ProgressBar } from "@/components/korean/ProgressBar";
import { Button } from "@/components/korean/Button";
import { useOnboarding } from "@/hooks/useOnboarding";

export const FinalCompletionStep: React.FC = () => {
  const { state, dispatch } = useOnboarding();
  const { userProfile } = state;

  const handleComplete = () => {
    // In a real app, you would save the data here
    console.log("Onboarding completed:", state);
    alert("온보딩이 완료되었습니다!");
    dispatch({ type: "RESET" });
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
  };

  return (
    <div className="w-full h-screen bg-korean-cream flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6">
        <Header title="가족 프로필 설정" showBackButton onBack={handleBack} />
      </div>

      {/* Progress */}
      <div className="pb-4">
        <ProgressBar current={5} total={5} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-16">
        <div className="text-center mb-12">
          <h2 className="text-black font-ownglyph text-[32px] font-normal leading-tight tracking-tight mb-8">
            전부 완성되었어요!
            <br />
            <br />
            이제 제가 {userProfile.name}님께 맞는
            <br />
            케어와 ~~를 해드릴게요.
          </h2>
        </div>

        {/* Placeholder for image - using a simple colored circle */}
        <div className="w-60 h-60 bg-korean-brown-secondary rounded-full mb-12 flex items-center justify-center">
          <div className="w-32 h-32 bg-korean-brown-primary rounded-full"></div>
        </div>
      </div>

      {/* Complete button */}
      <div className="px-6 pb-8">
        <Button variant="primary" onClick={handleComplete}>
          완료하기
        </Button>
      </div>
    </div>
  );
};
