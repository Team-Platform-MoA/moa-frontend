import { useOnboarding } from "@/hooks/useOnboarding";

// User profile steps
import { UserNameStep } from "./user/UserNameStep";
import { UserBirthYearStep } from "./user/UserBirthYearStep";
import { UserGenderStep } from "./user/UserGenderStep";
import { UserRelationshipStep } from "./user/UserRelationshipStep";
import { UserCareHoursStep } from "./user/UserCareHoursStep";
import { UserCompletionStep } from "./user/UserCompletionStep";

// Family profile steps
import { FamilyNameStep } from "./family/FamilyNameStep";
import { FamilyBirthYearStep } from "./family/FamilyBirthYearStep";
import { FamilyGenderStep } from "./family/FamilyGenderStep";
import { FamilyDementiaStep } from "./family/FamilyDementiaStep";
import { FinalCompletionStep } from "./family/FinalCompletionStep";

export const OnboardingFlow: React.FC = () => {
  const { state } = useOnboarding();
  const { currentFlow, currentStep } = state;

  // Mobile-only container - no desktop considerations
  // containerClasses variable removed as we don't need responsive breakpoints

  // User profile flow
  if (currentFlow === "user") {
    switch (currentStep) {
      case 1:
        return <UserNameStep />;
      case 2:
        return <UserBirthYearStep />;
      case 3:
        return <UserGenderStep />;
      case 4:
        return <UserRelationshipStep />;
      case 5:
        return <UserCareHoursStep />;
      case 6:
        return <UserCompletionStep />;
      default:
        return <UserNameStep />;
    }
  }

  // Family profile flow
  if (currentFlow === "family") {
    switch (currentStep) {
      case 1:
        return <FamilyNameStep />;
      case 2:
        return <FamilyBirthYearStep />;
      case 3:
        return <FamilyGenderStep />;
      case 4:
        return <FamilyDementiaStep />;
      case 5:
        return <FinalCompletionStep />;
      default:
        return <FamilyNameStep />;
    }
  }

  return <UserNameStep />;
};
