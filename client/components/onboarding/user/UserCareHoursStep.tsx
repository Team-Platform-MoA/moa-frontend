import { Header } from "@/components/korean/Header";
import { ProgressBar } from "@/components/korean/ProgressBar";
import { Input } from "@/components/korean/Input";
import { Button } from "@/components/korean/Button";
import { useOnboarding } from "@/hooks/useOnboarding";

export const UserCareHoursStep: React.FC = () => {
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
    userProfile.careHours.trim().length > 0 &&
    /^\d+$/.test(userProfile.careHours) &&
    parseInt(userProfile.careHours) >= 0 &&
    parseInt(userProfile.careHours) <= 24;

  return (
    <div className="w-screen h-dvh bg-korean-cream flex flex-col fixed inset-0 pb-safe-bottom">
      {/* Header */}
      <div className="pt-6 pb-6">
        <Header title="내 프로필 설정" showBackButton onBack={handleBack} />
      </div>

      {/* Progress */}
      <div className="pb-4">
        <ProgressBar current={5} total={5} />
      </div>

      {/* Step indicator */}
      <div className="px-6 pb-6">
        <span className="text-black font-pretendard text-base font-normal tracking-tight">
          5/5
        </span>
      </div>

      {/* Question */}
      <div className="px-6 pb-8">
        <h2 className="text-black font-pretendard text-2xl font-bold tracking-tight">
          하루 돌봄 시간이 몇 시간인가요?
        </h2>
      </div>

      {/* Input */}
      <div className="pb-8">
        <Input
          placeholder="숫자만 작성해주세요. 예시: 12"
          value={userProfile.careHours}
          onChange={(value) =>
            dispatch({
              type: "UPDATE_USER_PROFILE",
              payload: { careHours: value },
            })
          }
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Next button */}
      <div className="px-6 pb-16 pt-4">
        <Button variant={isValid ? "primary" : "disabled"} onClick={handleNext}>
          완료
        </Button>
      </div>
    </div>
  );
};
