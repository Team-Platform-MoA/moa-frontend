import { Header } from "@/components/korean/Header";
import { ProgressBar } from "@/components/korean/ProgressBar";
import { Input } from "@/components/korean/Input";
import { Button } from "@/components/korean/Button";
import { useOnboarding } from "@/hooks/useOnboarding";

export const FamilyNameStep: React.FC = () => {
  const { state, dispatch } = useOnboarding();
  const { familyProfile } = state;

  const handleNext = () => {
    if (familyProfile.name.trim()) {
      dispatch({ type: "NEXT_STEP" });
    }
  };

  const handleBack = () => {
    dispatch({ type: "SET_FLOW", payload: "user" });
    dispatch({ type: "SET_STEP", payload: 6 }); // Go back to user completion
  };

  const isValid = familyProfile.name.trim().length > 0;

  return (
    <div className="w-screen h-dvh bg-korean-cream flex flex-col fixed inset-0 pb-safe-bottom">
      {/* Header */}
      <div className="pt-6 pb-6">
        <Header title="가족 프로필 설정" />
      </div>

      {/* Progress */}
      <div className="pb-4">
        <ProgressBar current={1} total={5} />
      </div>

      {/* Step indicator */}
      <div className="px-6 pb-6">
        <span className="text-black font-pretendard text-base font-normal tracking-tight">
          1/5
        </span>
      </div>

      {/* Question */}
      <div className="px-6 pb-8">
        <h2 className="text-black font-pretendard text-2xl font-bold tracking-tight">
          가족은 어떻게 불러드릴까요?
        </h2>
      </div>

      {/* Input */}
      <div className="pb-8">
        <Input
          placeholder="예시: 내 사랑"
          value={familyProfile.name}
          onChange={(value) =>
            dispatch({
              type: "UPDATE_FAMILY_PROFILE",
              payload: { name: value },
            })
          }
        />
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
