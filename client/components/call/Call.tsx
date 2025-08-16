import { useCall } from "@/hooks/useCall";
import { CallIntro } from "./CallIntro";
import { CallQuestion } from "./CallQuestion";
import { CallLoading } from "./CallLoading";
import { CallCompleted } from "./CallCompleted";
import { TodayStory } from "./TodayStory";
import { CallError } from "./CallError";
import { CallAlreadyCompleted } from "./CallAlreadyCompleted";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchQuestion, TodayStory as TodayStoryType, createTodayStory, saveTodayStoryToStorage, getTodayStoryFromStorage } from "@/services/api";

export const Call: React.FC = () => {
  const { state, nextStep, setStep, startTimer } = useCall();
  const { currentStep } = state;
  const location = useLocation();
  const [questions, setQuestions] = useState<string[]>([
    "질문을 불러오는 중...",
    "질문을 불러오는 중...",
    "질문을 불러오는 중..."
  ]);
  const [todayStory, setTodayStory] = useState<TodayStoryType | null>(null);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  
  // 컴포넌트 진입 시 오늘의 이야기 확인 - Call 페이지에서는 이미 완료 메시지 표시
  useEffect(() => {
    const existingTodayStory = getTodayStoryFromStorage();
    if (existingTodayStory) {
      console.log('오늘의 이야기가 이미 존재함, 이미 완료 상태로 설정:', existingTodayStory);
      setTodayStory(existingTodayStory);
      setStep('already_completed'); // 새로운 상태 추가
    }
  }, [setStep]);
  
  // 질문들을 API에서 불러오기
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const question1 = await fetchQuestion(1);
        const question2 = await fetchQuestion(2);
        const question3 = await fetchQuestion(3);
        
        setQuestions([
          question1.question_text,
          question2.question_text,
          question3.question_text
        ]);
      } catch (error) {
        console.error('질문 불러오기 실패:', error);
        // 실패 시 기본 질문 사용
        setQuestions([
          "가족의 상태 중에서 오늘 가장 신경 쓰인 부분이 있으셨나요?",
          "오늘 돌봄 과정에서 '아, 이건 정말 나 혼자서는 안되겠다'라고 느낀 순간이 있으셨나요?", 
          "오늘 본인을 위해 챙긴 것이 있다면 어떤 것이었나요? 혹시 챙기지 못했다면 그 이유는 뭐였을까요?"
        ]);
      }
    };

    loadQuestions();
  }, []);
  
  // URL 파라미터에서 skipIntro 확인하고 첫 번째 질문으로 바로 이동 (오늘의 이야기가 없을 때만)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('skipIntro') === 'true' && !todayStory) {
      setStep('question1');
      startTimer();
    }
  }, [location.search, setStep, startTimer, todayStory]);

  const loadingMessages = [
    "열심히 추억 만드는 중...",
    "감정 분석 하는 중...",
    "편지를 작성하는 중...",
    "모아가 우편물을 모으는 중...", 
    "모아가 우편물을 배달하는 중..."
  ];

  const handleStartCall = () => {
    setStep('question1');
    startTimer();
  };

  const handleNext = () => {
    nextStep();
  };

  const handleQuestion3Complete = (uploadResult: any) => {
    console.log('질문 3 완료 결과:', uploadResult);
    
    // 로딩 시작 시간 기록
    setLoadingStartTime(Date.now());
    
    // 오늘의 이야기 생성
    const story = createTodayStory(uploadResult);
    if (story) {
      setTodayStory(story);
      saveTodayStoryToStorage(story);
      console.log('오늘의 이야기 생성 완료:', story);
    } else {
      console.log('오늘의 이야기 생성 실패, 데이터 확인 필요:', uploadResult);
    }
  };

  // 오늘의 이야기가 준비되면 completed로 이동 (최소 10초 후)
  useEffect(() => {
    console.log('todayStory useEffect:', { todayStory, currentStep, loadingStartTime });
    if (todayStory && currentStep.startsWith('loading') && loadingStartTime) {
      const elapsedTime = Date.now() - loadingStartTime;
      const minWaitTime = 10000; // 10초
      
      console.log('최소 대기 시간 체크:', { elapsedTime, minWaitTime });
      
      if (elapsedTime >= minWaitTime) {
        // 최소 시간이 지났으면 바로 이동
        console.log('최소 시간 경과, completed로 이동');
        setStep('completed');
      } else {
        // 최소 시간까지 대기
        const waitTime = minWaitTime - elapsedTime;
        console.log('최소 시간까지 대기:', waitTime + 'ms');
        const timer = setTimeout(() => {
          console.log('타이머 완료, completed로 이동');
          setStep('completed');
        }, waitTime);
        
        return () => clearTimeout(timer);
      }
    }
  }, [todayStory, currentStep, loadingStartTime, setStep]);

  // 1분 초과 시 오류 처리
  useEffect(() => {
    if (loadingStartTime && currentStep.startsWith('loading')) {
      const timer = setTimeout(() => {
        if (!todayStory) {
          setHasError(true);
        }
      }, 60000); // 1분
      
      return () => clearTimeout(timer);
    }
  }, [loadingStartTime, currentStep, todayStory]);

  const handleBack = () => {
    const stepOrder: CallStep[] = [
      "intro",
      "question1",
      "question2", 
      "question3",
      "loading1",
      "loading2",
      "loading3",
      "loading4",
      "loading5",
      "completed",
    ];

    const currentIndex = stepOrder.indexOf(currentStep);
    
    if (currentIndex > 0) {
      const previousStep = stepOrder[currentIndex - 1];
      setStep(previousStep);
    } else {
      // 첫 번째 단계일 때는 홈으로 이동
      window.history.back();
    }
  };

  // 로딩 화면들을 자동으로 넘기기 (응답 대기 중일 때는 계속 순환)
  useEffect(() => {
    if (currentStep.startsWith('loading') && !todayStory && !hasError) {
      const timer = setTimeout(() => {
        nextStep();
      }, 4000); // 4초씩 순환

      return () => clearTimeout(timer);
    }
  }, [currentStep, nextStep, todayStory, hasError]);

  // 오류가 발생한 경우 오류 화면 표시
  if (hasError) {
    return <CallError />;
  }

  switch (currentStep) {
    case 'intro':
      return <CallIntro onStartCall={handleStartCall} />;
      
    case 'question1':
      return (
        <CallQuestion 
          questionNumber={1}
          question={questions[0]}
          onNext={handleNext}
          onBack={handleBack}
        />
      );
      
    case 'question2':
      return (
        <CallQuestion 
          questionNumber={2}
          question={questions[1]}
          onNext={handleNext}
          onBack={handleBack}
        />
      );
      
    case 'question3':
      return (
        <CallQuestion 
          questionNumber={3}
          question={questions[2]}
          onNext={handleNext}
          onBack={handleBack}
          onComplete={handleQuestion3Complete}
        />
      );
      
    case 'loading1':
      return <CallLoading message={loadingMessages[0]} characterPosition={1} />;
      
    case 'loading2':
      return <CallLoading message={loadingMessages[1]} characterPosition={2} />;
      
    case 'loading3':
      return <CallLoading message={loadingMessages[2]} characterPosition={3} />;
      
    case 'loading4':
      return <CallLoading message={loadingMessages[3]} characterPosition={4} />;
      
    case 'loading5':
      return <CallLoading message={loadingMessages[4]} characterPosition={5} />;
      
    case 'completed':
      console.log('completed 화면 렌더링, todayStory:', todayStory);
      return todayStory ? <TodayStory story={todayStory} /> : <CallCompleted />;
      
    case 'already_completed':
      return <CallAlreadyCompleted />;
      
    default:
      return <CallIntro onStartCall={handleStartCall} />;
  }
};
