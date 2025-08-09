import { Header } from "@/components/korean/Header";
import { ProgressBar } from "@/components/korean/ProgressBar";
import { ChoiceButton } from "@/components/korean/ChoiceButton";
import { Button } from "@/components/korean/Button";
import { useOnboarding } from "@/hooks/useOnboarding";

export const FamilyDementiaStep: React.FC = () => {
  const { state, dispatch } = useOnboarding();
  const { familyProfile } = state;

  const stageOptions = ["초기", "중기", "말기"] as const;

  const handleNext = () => {
    if (familyProfile.dementiaStage) {
      dispatch({ type: "NEXT_STEP" });
    }
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
  };

  const handleStageSelect = (stage: typeof stageOptions[number]) => {
    dispatch({
      type: "UPDATE_FAMILY_PROFILE",
      payload: { dementiaStage: stage },
    });
  };

  const isValid = familyProfile.dementiaStage !== "";

  return (
    <div className="w-full h-screen bg-korean-cream flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6">
        <Header title="가족 프로필 설정" showBackButton onBack={handleBack} />
      </div>

      {/* Progress */}
      <div className="pb-4">
        <ProgressBar current={4} total={5} />
      </div>

      {/* Step indicator */}
      <div className="px-6 pb-6">
        <span className="text-black font-pretendard text-base font-normal tracking-tight">
          4/5
        </span>
      </div>

      {/* Question */}
      <div className="px-6 pb-8">
        <h2 className="text-black font-pretendard text-2xl font-bold tracking-tight">
          치매 정도가 어떻게 되시나요?
        </h2>
      </div>

      {/* Stage options */}
      <div className="px-6 space-y-4 pb-8">
        {stageOptions.map((stage) => (
          <ChoiceButton
            key={stage}
            selected={familyProfile.dementiaStage === stage}
            onClick={() => handleStageSelect(stage)}
          >
            {stage}
          </ChoiceButton>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Next button */}
      <div className="px-6 pb-8">
        <Button
          variant={isValid ? "primary" : "disabled"}
          onClick={handleNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
