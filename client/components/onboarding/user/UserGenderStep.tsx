import { Header } from "@/components/korean/Header";
import { ProgressBar } from "@/components/korean/ProgressBar";
import { ChoiceButton } from "@/components/korean/ChoiceButton";
import { Button } from "@/components/korean/Button";
import { useOnboarding } from "@/hooks/useOnboarding";

export const UserGenderStep: React.FC = () => {
  const { state, dispatch } = useOnboarding();
  const { userProfile } = state;

  const genderOptions = ["여성", "남성", "기타"] as const;

  const handleNext = () => {
    if (userProfile.gender) {
      dispatch({ type: "NEXT_STEP" });
    }
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
  };

  const handleGenderSelect = (gender: (typeof genderOptions)[number]) => {
    dispatch({
      type: "UPDATE_USER_PROFILE",
      payload: { gender },
    });
  };

  const isValid = userProfile.gender !== "";

  return (
    <div className="w-full h-screen bg-korean-cream flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6">
        <Header title="내 프로필 설정" showBackButton onBack={handleBack} />
      </div>

      {/* Progress */}
      <div className="pb-4">
        <ProgressBar current={3} total={5} />
      </div>

      {/* Step indicator */}
      <div className="px-6 pb-6">
        <span className="text-black font-pretendard text-base font-normal tracking-tight">
          3/5
        </span>
      </div>

      {/* Question */}
      <div className="px-6 pb-8">
        <h2 className="text-black font-pretendard text-2xl font-bold tracking-tight">
          성별이 어떻게 되시나요?
        </h2>
      </div>

      {/* Gender options */}
      <div className="px-6 space-y-4 pb-8">
        {genderOptions.map((gender) => (
          <ChoiceButton
            key={gender}
            selected={userProfile.gender === gender}
            onClick={() => handleGenderSelect(gender)}
          >
            {gender}
          </ChoiceButton>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Next button */}
      <div className="px-6 pb-8">
        <Button variant={isValid ? "primary" : "disabled"} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  );
};
