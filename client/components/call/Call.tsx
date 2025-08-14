import { useCall } from "@/hooks/useCall";
import { CallIntro } from "./CallIntro";
import { CallQuestion } from "./CallQuestion";
import { CallLoading } from "./CallLoading";
import { CallCompleted } from "./CallCompleted";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Call: React.FC = () => {
  const { state, nextStep, setStep, startTimer } = useCall();
  const { currentStep } = state;
  const location = useLocation();
  
  // URL 파라미터에서 skipIntro 확인하고 첫 번째 질문으로 바로 이동
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('skipIntro') === 'true') {
      setStep('question1');
      startTimer();
    }
  }, [location.search, setStep, startTimer]);

  const questions = [
    "오늘 보살핌 시간 중\n어떤 순간이 가장 기억에 남나요?",
    "지금 이 순간 마음속에서\n가장 큰 감정은 무엇인가요?", 
    "오늘 나 자신에게\n해주고 싶은 말이 있다면?"
  ];

  const loadingMessages = [
    "열심히 추억 만드는 중...",
    "모아가 우편물을 모으는 중...", 
    "편지를 작성하는 중...",
    "감정 분석 하는 중...",
    "모아가 우편물을 배달하는 중..."
  ];

  const handleStartCall = () => {
    setStep('question1');
    startTimer();
  };

  const handleNext = () => {
    nextStep();
  };

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

  // 로딩 화면들을 자동으로 넘기기
  useEffect(() => {
    if (currentStep.startsWith('loading')) {
      const timer = setTimeout(() => {
        nextStep();
      }, 2000); // 2초 후 다음 단계로

      return () => clearTimeout(timer);
    }
  }, [currentStep, nextStep]);

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
      return <CallCompleted />;
      
    default:
      return <CallIntro onStartCall={handleStartCall} />;
  }
};
