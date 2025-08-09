import { Header } from "@/components/korean/Header";
import { ProgressBar } from "@/components/korean/ProgressBar";
import { Input } from "@/components/korean/Input";
import { Button } from "@/components/korean/Button";
import { useOnboarding } from "@/hooks/useOnboarding";

export const UserBirthYearStep: React.FC = () => {
  const { state, dispatch } = useOnboarding();
  const { userProfile } = state;

  const handleNext = () => {
    if (isValid) {
      dispatch({ type: "NEXT_STEP" });
    }
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
  };

  const isValid =
    userProfile.birthYear.trim().length === 4 &&
    /^\d{4}$/.test(userProfile.birthYear) &&
    parseInt(userProfile.birthYear) >= 1900 &&
    parseInt(userProfile.birthYear) <= new Date().getFullYear();

  return (
    <div className="w-full h-screen bg-korean-cream flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6">
        <Header title="내 프로필 설정" showBackButton onBack={handleBack} />
      </div>

      {/* Progress */}
      <div className="pb-4">
        <ProgressBar current={2} total={5} />
      </div>

      {/* Step indicator */}
      <div className="px-6 pb-6">
        <span className="text-black font-pretendard text-base font-normal tracking-tight">
          2/5
        </span>
      </div>

      {/* Question */}
      <div className="px-6 pb-8">
        <h2 className="text-black font-pretendard text-2xl font-bold tracking-tight">
          언제 태어나셨나요?
        </h2>
      </div>

      {/* Input */}
      <div className="pb-8">
        <Input
          placeholder="4자리로 입력해주세요. ex)1970"
          value={userProfile.birthYear}
          onChange={(value) =>
            dispatch({
              type: "UPDATE_USER_PROFILE",
              payload: { birthYear: value },
            })
          }
        />
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
