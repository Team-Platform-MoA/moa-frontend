import { Header } from "@/components/korean/Header";
import { ProgressBar } from "@/components/korean/ProgressBar";
import { ChoiceButton } from "@/components/korean/ChoiceButton";
import { Button } from "@/components/korean/Button";
import { useOnboarding } from "@/hooks/useOnboarding";

export const UserRelationshipStep: React.FC = () => {
  const { state, dispatch } = useOnboarding();
  const { userProfile } = state;

  const relationshipOptions = [
    "제가 자녀예요",
    "제가 배우자예요",
    "제가 며느리/사위예요",
    "제가 손주예요",
  ] as const;

  const handleNext = () => {
    if (userProfile.familyRelationship) {
      dispatch({ type: "NEXT_STEP" });
    }
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
  };

  const handleRelationshipSelect = (
    relationship: (typeof relationshipOptions)[number],
  ) => {
    dispatch({
      type: "UPDATE_USER_PROFILE",
      payload: { familyRelationship: relationship },
    });
  };

  const isValid = userProfile.familyRelationship !== "";

  return (
    <div className="w-screen h-dvh bg-korean-cream flex flex-col fixed inset-0 pb-safe-bottom">
      {/* Header */}
      <div className="pt-6 pb-6">
        <Header title="내 프로필 설정" showBackButton onBack={handleBack} />
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
          가족과는 어떤 관계세요?
        </h2>
      </div>

      {/* Relationship options */}
      <div className="px-6 space-y-4 pb-8">
        {relationshipOptions.map((relationship) => (
          <ChoiceButton
            key={relationship}
            selected={userProfile.familyRelationship === relationship}
            onClick={() => handleRelationshipSelect(relationship)}
          >
            {relationship}
          </ChoiceButton>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Next button */}
      <div className="px-6 pb-16 pt-4">
        <Button variant={isValid ? "primary" : "disabled"} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  );
};
