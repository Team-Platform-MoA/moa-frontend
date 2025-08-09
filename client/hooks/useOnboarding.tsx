import { createContext, useContext, useReducer, ReactNode } from "react";
import {
  OnboardingState,
  UserProfile,
  FamilyProfile,
  initialOnboardingState,
} from "@/types/onboarding";

type OnboardingAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_FLOW"; payload: "user" | "family" }
  | { type: "SET_STEP"; payload: number }
  | { type: "UPDATE_USER_PROFILE"; payload: Partial<UserProfile> }
  | { type: "UPDATE_FAMILY_PROFILE"; payload: Partial<FamilyProfile> }
  | { type: "RESET" };

const onboardingReducer = (
  state: OnboardingState,
  action: OnboardingAction,
): OnboardingState => {
  switch (action.type) {
    case "NEXT_STEP":
      if (state.currentFlow === "user" && state.currentStep === 5) {
        return { ...state, currentFlow: "family", currentStep: 1 };
      }
      return { ...state, currentStep: state.currentStep + 1 };

    case "PREV_STEP":
      if (state.currentFlow === "family" && state.currentStep === 1) {
        return { ...state, currentFlow: "user", currentStep: 5 };
      }
      return { ...state, currentStep: Math.max(1, state.currentStep - 1) };

    case "SET_FLOW":
      return { ...state, currentFlow: action.payload };

    case "SET_STEP":
      return { ...state, currentStep: action.payload };

    case "UPDATE_USER_PROFILE":
      return {
        ...state,
        userProfile: { ...state.userProfile, ...action.payload },
      };

    case "UPDATE_FAMILY_PROFILE":
      return {
        ...state,
        familyProfile: { ...state.familyProfile, ...action.payload },
      };

    case "RESET":
      return initialOnboardingState;

    default:
      return state;
  }
};

const OnboardingContext = createContext<{
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
} | null>(null);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    onboardingReducer,
    initialOnboardingState,
  );

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
