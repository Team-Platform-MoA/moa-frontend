import { Button } from '@/components/korean/Button';
import { Header } from '@/components/korean/Header';
import { useCall } from '@/hooks/useCall';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { useState, useRef } from 'react';
import { Mic, Square, RotateCcw, Play } from 'lucide-react';

interface CallQuestionProps {
  questionNumber: number;
  question: string;
  onNext: () => void;
  onBack?: () => void;
  onComplete?: (data: any) => void;
  onUploadStart?: () => void;
}

export const CallQuestion: React.FC<CallQuestionProps> = ({
  questionNumber,
  question,
  onNext,
  onBack,
  onComplete,
  onUploadStart,
}) => {
  const { state } = useCall();
  const { timer, canProceed, isRecommendedTimeReached } = state;
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);
  const shouldAutoUploadRef = useRef(false);

  const {
    recordingState,
    recordingTime,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    resetRecording,
    resumeRecording,
    uploadAudio,
    isRecording,
    canUpload,
    isUploading,
    isUploaded,
  } = useAudioRecorder({
    onRecordingComplete: async (blob) => {
      console.log('녹음 완료, shouldAutoUpload:', shouldAutoUploadRef.current);
      setIsRecordingComplete(true);

      // 자동 업로드가 필요한 경우
      if (shouldAutoUploadRef.current) {
        console.log('자동 업로드 시작');
        shouldAutoUploadRef.current = false;
        try {
          // 질문 3 업로드 시작 시 로딩 화면으로 이동
          if (questionNumber === 3 && onUploadStart) {
            onUploadStart();
          }

          const result = await uploadAudio(blob, questionNumber);
          console.log('업로드 결과:', result);

          // 질문 3 완료 시 onComplete 콜백 호출
          if (questionNumber === 3 && onComplete && result) {
            console.log('질문 3 완료, onComplete 콜백 호출:', result);
            onComplete(result);
            return; // 질문 3은 onComplete에서 화면 전환 처리
          }

          // 질문 1, 2인 경우 다음 질문으로 이동
          if (questionNumber === 1 || questionNumber === 2) {
            resetRecording();
            onNext();
          }
        } catch (error) {
          console.error('자동 업로드 실패:', error);
        }
      }
    },
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleUploadAndNext = async () => {
    // 이미 업로딩 중이면 중복 실행 방지
    if (isUploading) {
      return;
    }

    // 녹음을 한 번도 시작하지 않은 경우 (Skip)
    if (recordingState === 'idle') {
      onNext();
      return;
    }

    // 녹음 중이면 자동 업로드 플래그를 설정하고 녹음 정지
    if (isRecording) {
      shouldAutoUploadRef.current = true;
      stopRecording();
      return;
    }

    // 정지 상태에서 녹음 파일이 있으면 업로드
    if (recordingState === 'stopped' && audioBlob) {
      try {
        // 질문 3 업로드 시작 시 로딩 화면으로 이동
        if (questionNumber === 3 && onUploadStart) {
          onUploadStart();
        }

        const result = await uploadAudio(audioBlob, questionNumber);

        // 질문 3 완료 시 onComplete 콜백 호출
        if (questionNumber === 3 && onComplete && result) {
          onComplete(result);
          resetRecording();
          return;
        }

        // 질문 1, 2인 경우 다음 질문으로 이동
        if (questionNumber === 1 || questionNumber === 2) {
          resetRecording();
          onNext();
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <div className="w-full h-dvh bg-[#FFFAE7] flex flex-col py-2 pb-safe-bottom">
      {/* Header */}
      <div className="flex-shrink-0">
        <Header title="모아 Call" showBackButton={true} onBack={onBack} />
      </div>

      {/* Main Content - 스크롤 가능하도록 수정 */}
      <div className="flex-1 flex flex-col px-4 py-2 min-h-0 overflow-y-auto">
        {/* Question Section */}
        <div className="text-center mb-2 mt-10 px-8">
          <p className="text-black font-ownglyph text-3xl sm:text-3xl font-normal leading-tight">
            {String(questionNumber).padStart(2, '0')}
            <br />
            {question}
            <br />
            <span className="text-xl sm:text-xl text-korean-brown-primary">
              (권장시간 1분)
            </span>
          </p>
        </div>

        {/* 녹음 타이머 - 모바일 최적화 */}
        <div className="flex flex-col justify-center py-4">
          <div className="text-center">
            <div
              className={`font-pretendard text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-center ${
                isRecording
                  ? 'text-korean-brown-primary'
                  : 'text-korean-brown-secondary'
              }`}
            >
              {formatTime(recordingTime)}
            </div>
            {(isRecording || recordingState === 'stopped') && (
              <div className="flex items-center justify-center mt-2">
                <div
                  className={`w-2 h-2 bg-korean-brown-primary rounded-full mr-2 ${isRecording ? 'animate-pulse' : ''}`}
                ></div>
                <span className="text-korean-brown-primary font-medium text-sm">
                  {isRecording ? '녹음 중' : '녹음 정지'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - 캐릭터, 컨트롤, 상태 */}
        <div className="mt-auto flex-shrink-0">
          {/* Character Image */}
          <div className="relative mb-8 flex justify-center">
            <img
              src="/images/call/character-question.png"
              alt="모아 캐릭터"
              className="w-55 h-55 object-contain"
            />
          </div>

          {/* Recording Controls */}
          <div className="flex flex-col gap-2 mb-4">
            {recordingState !== 'stopped' && (
              <Button
                variant={isRecording ? 'danger' : 'primary'}
                onClick={handleRecordingToggle}
                className="w-full h-14 text-lg font-bold touch-manipulation select-none"
              >
                {isRecording ? (
                  <>
                    <Square className="w-5 h-5 mr-2" />
                    녹음 정지
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    녹음 시작
                  </>
                )}
              </Button>
            )}

            {recordingState === 'stopped' && !isRecording && (
              <div className="flex gap-2 w-full">
                <Button
                  variant="secondary"
                  onClick={() => {
                    resetRecording();
                    // 리셋 후 바로 녹음 시작
                    setTimeout(() => {
                      handleRecordingToggle();
                    }, 100);
                  }}
                  className="flex-1 h-12 text-sm touch-manipulation select-none"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  다시 녹음
                </Button>
                <Button
                  variant="secondary"
                  onClick={resumeRecording}
                  className="flex-1 h-12 text-sm touch-manipulation select-none"
                >
                  <Play className="w-4 h-4 mr-2" />
                  이어서 녹음
                </Button>
              </div>
            )}
          </div>

          {/* Next Button */}
          <div className="flex flex-col pb-4">
            <Button
              variant={
                canUpload ||
                isUploaded ||
                isRecording ||
                recordingState === 'idle'
                  ? 'primary'
                  : 'waiting'
              }
              onClick={handleUploadAndNext}
              disabled={isUploading}
              className="w-full h-14 text-lg font-bold touch-manipulation select-none cursor-pointer active:scale-95 transition-transform"
              style={{
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {(() => {
                if (isUploading) return '업로드 중...';
                if (recordingState === 'idle') return '다음 질문으로 넘어가기';
                return '녹음 완료 후 다음으로 넘어가기';
              })()}
            </Button>

            {/* 매직 버튼 - 테스트용 */}
            {/* <Button
              variant="secondary"
              onClick={onNext}
              className="w-full h-12 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300"
            >
              🪄 매직 버튼 (테스트용)
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
