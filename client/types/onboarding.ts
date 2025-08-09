export interface UserProfile {
  name: string;
  birthYear: string;
  gender: "여성" | "남성" | "기타" | "";
  familyRelationship:
    | "제가 자녀예요"
    | "제가 배우자예요"
    | "제가 며느리/사위예요"
    | "제가 손주예요"
    | "";
  careHours: string;
}

export interface FamilyProfile {
  name: string;
  birthYear: string;
  gender: "여성" | "남성" | "기타" | "";
  dementiaStage: "초기" | "중기" | "말기" | "";
}

export interface OnboardingState {
  currentFlow: "user" | "family";
  currentStep: number;
  userProfile: UserProfile;
  familyProfile: FamilyProfile;
}

export const initialOnboardingState: OnboardingState = {
  currentFlow: "user",
  currentStep: 1,
  userProfile: {
    name: "",
    birthYear: "",
    gender: "",
    familyRelationship: "",
    careHours: "",
  },
  familyProfile: {
    name: "",
    birthYear: "",
    gender: "",
    dementiaStage: "",
  },
};
