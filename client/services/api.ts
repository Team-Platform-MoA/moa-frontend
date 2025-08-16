import { OnboardingState } from "@/types/onboarding";

// 실제 API 서버 주소
const API_BASE_URL = "https://platform-moa.r-e.kr";

// 온보딩 요청 타입 정의
export interface OnboardingRequest {
  user_name: string;
  user_birth_year: number;
  user_gender: "여성" | "남성";
  family_relationship: "자녀" | "배우자" | "부모" | "손주" | "며느리/사위";
  daily_care_hours: number;
  family_member: {
    nickname: string;
    birth_year: number;
    gender: "여성" | "남성";
    dementia_stage: "초기" | "중기" | "말기";
  };
}

// 온보딩 응답 타입 정의
export interface OnboardingResponse {
  success: boolean;
  message?: string;
  data?: {
    user_id: string;
    [key: string]: any;
  };
}

// 온보딩 API 호출 함수
export const submitOnboarding = async (data: OnboardingRequest): Promise<OnboardingResponse> => {
  try {
    console.log("온보딩 API 요청 데이터:", JSON.stringify(data, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/api/users/onboarding`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("온보딩 API 응답 상태:", response.status);
    
    // 응답 텍스트를 먼저 받아서 확인
    const responseText = await response.text();
    console.log("온보딩 API 응답 텍스트:", responseText);

    if (!response.ok) {
      // 구체적인 에러 메시지를 포함
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorData.detail || errorMessage;
      } catch {
        errorMessage = responseText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // JSON 파싱 시도
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { message: "응답을 파싱할 수 없습니다." };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("온보딩 API 호출 오류:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
};

// 질문 응답 타입 정의
export interface QuestionResponse {
  question_id: number;
  question_text: string;
  [key: string]: any;
}

// 질문 API 호출 함수
export const fetchQuestion = async (questionId: number): Promise<QuestionResponse> => {
  try {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      throw new Error('사용자 ID가 없습니다. 다시 온보딩을 진행해주세요.');
    }

    const response = await fetch(`${API_BASE_URL}/api/answers/questions/${questionId}`, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "X-User-Id": userId,
      },
    });

    if (!response.ok) {
      throw new Error(`질문 ${questionId} 조회 실패: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`질문 ${questionId} 조회 오류:`, error);
    throw error;
  }
};

// 오디오 업로드 응답 타입 정의
export interface AudioUploadResponse {
  success: boolean;
  message?: string;
  data?: {
    conversation_id?: string;
    question_number: number;
    emotion_score?: number;
    daily_summary?: string;
    emotion_analysis?: {
      stress: number;
      resilience: number;
      stability: number;
    };
    letter?: string;
    report?: {
      emotion_score: number;
      daily_summary: string;
      emotion_analysis: {
        stress: number;
        resilience: number;
        stability: number;
      };
      letter: string;
    };
    [key: string]: any;
  };
}

// 오늘의 이야기 타입 정의
export interface TodayStory {
  date: string;
  title: string;
  emotionScore: number;
  emotionalAnalysis: {
    stress: number;
    resilience: number;
    emotionalStability: number;
  };
  moaLetter: string;
  conversationId: string;
}

// 오늘의 이야기 생성 함수
export const createTodayStory = (response: any): TodayStory | null => {
  console.log('createTodayStory 호출, 응답 데이터:', response);
  
  // AudioUploadResponse 형태인지 확인
  if (response.success && response.data) {
    const data = response.data;
    if (!data.conversation_id) {
      console.log('conversation_id가 없습니다:', data);
      return null;
    }

    // report 객체가 있으면 그것을 사용, 없으면 직접 데이터 사용
    const reportData = data.report || data;
    
    if (!reportData.emotion_score || !reportData.daily_summary || !reportData.emotion_analysis || !reportData.letter) {
      console.log('필수 데이터가 부족합니다:', reportData);
      return null;
    }

    const today = new Date().toISOString().split('T')[0];

    return {
      date: today,
      title: reportData.daily_summary,
      emotionScore: reportData.emotion_score,
      emotionalAnalysis: {
        stress: reportData.emotion_analysis.stress,
        resilience: reportData.emotion_analysis.resilience,
        emotionalStability: reportData.emotion_analysis.stability,
      },
      moaLetter: reportData.letter,
      conversationId: data.conversation_id,
    };
  }

  // 직접 데이터 형태인지 확인 (백엔드에서 바로 결과 객체를 반환하는 경우)
  if (response.conversation_id && response.report) {
    const reportData = response.report;
    
    if (!reportData.emotion_score || !reportData.daily_summary || !reportData.emotion_analysis || !reportData.letter) {
      console.log('report 데이터가 부족합니다:', reportData);
      return null;
    }

    const today = new Date().toISOString().split('T')[0];

    return {
      date: today,
      title: reportData.daily_summary,
      emotionScore: reportData.emotion_score,
      emotionalAnalysis: {
        stress: reportData.emotion_analysis.stress,
        resilience: reportData.emotion_analysis.resilience,
        emotionalStability: reportData.emotion_analysis.stability,
      },
      moaLetter: reportData.letter,
      conversationId: response.conversation_id,
    };
  }

  console.log('지원되지 않는 응답 형태입니다:', response);
  return null;
};

// localStorage에 오늘의 이야기 저장
export const saveTodayStoryToStorage = (story: TodayStory) => {
  try {
    const existingStories = JSON.parse(localStorage.getItem('todayStories') || '[]');
    const updatedStories = [story, ...existingStories.filter((s: TodayStory) => s.date !== story.date)];
    localStorage.setItem('todayStories', JSON.stringify(updatedStories));
  } catch (error) {
    console.error('오늘의 이야기 저장 실패:', error);
  }
};

// 오늘 날짜의 이야기 가져오기
export const getTodayStoryFromStorage = (): TodayStory | null => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const stories = JSON.parse(localStorage.getItem('todayStories') || '[]');
    const todayStory = stories.find((story: TodayStory) => story.date === today);
    
    console.log('오늘 날짜 이야기 확인:', { today, found: !!todayStory, todayStory });
    return todayStory || null;
  } catch (error) {
    console.error('오늘의 이야기 불러오기 실패:', error);
    return null;
  }
};

// 오디오 업로드 API 호출 함수
export const uploadAudio = async (audioBlob: Blob, questionNumber: number): Promise<AudioUploadResponse> => {
  try {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      throw new Error('사용자 ID가 없습니다. 다시 온보딩을 진행해주세요.');
    }

    const formData = new FormData();
    // 서버가 인식할 수 있는 단순한 MIME 타입으로 Blob 생성
    const audioFile = new File([audioBlob], `질문${questionNumber}_녹음.webm`, {
      type: 'audio/webm'
    });
    formData.append('audio_file', audioFile);
    formData.append('question_number', questionNumber.toString());

    const response = await fetch(`${API_BASE_URL}/api/answers/audio`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "X-User-Id": userId,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`오디오 업로드 실패: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(`오디오 업로드 오류:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
};

// 온보딩 상태를 API 요청 형식으로 변환하는 함수
export const convertOnboardingStateToRequest = (state: OnboardingState): OnboardingRequest => {
  // 가족 관계 텍스트를 API 형식으로 변환
  const convertFamilyRelationship = (relationship: string): "자녀" | "배우자" | "부모" | "손주" | "며느리/사위" => {
    switch (relationship) {
      case "제가 자녀예요":
        return "자녀";
      case "제가 배우자예요":
        return "배우자";
      case "제가 며느리/사위예요":
        return "며느리/사위";
      case "제가 손주예요":
        return "손주";
      default:
        return "자녀"; // 기본값을 "자녀"로 설정
    }
  };

  // 성별 변환 (기타는 여성으로 기본 설정)
  const convertGender = (gender: string): "여성" | "남성" => {
    return gender === "남성" ? "남성" : "여성";
  };

  return {
    user_name: state.userProfile.name,
    user_birth_year: parseInt(state.userProfile.birthYear) || 1900,
    user_gender: convertGender(state.userProfile.gender),
    family_relationship: convertFamilyRelationship(state.userProfile.familyRelationship),
    daily_care_hours: parseInt(state.userProfile.careHours) || 1,
    family_member: {
      nickname: state.familyProfile.name,
      birth_year: parseInt(state.familyProfile.birthYear) || 1900,
      gender: convertGender(state.familyProfile.gender),
      dementia_stage: state.familyProfile.dementiaStage || "초기",
    },
  };
};