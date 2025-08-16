import { Button } from "@/components/korean/Button";
import { Header } from "@/components/korean/Header";
import { useCall } from "@/hooks/useCall";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useState } from "react";

interface CallQuestionProps {
  questionNumber: number;
  question: string;
  onNext: () => void;
  onBack?: () => void;
  onComplete?: (data: any) => void;
}

export const CallQuestion: React.FC<CallQuestionProps> = ({
  questionNumber,
  question,
  onNext,
  onBack,
  onComplete,
}) => {
  const { state } = useCall();
  const { timer, canProceed, isRecommendedTimeReached } = state;
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);

  const {
    recordingState,
    recordingTime,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    resetRecording,
    uploadAudio,
    isRecording,
    canUpload,
    isUploading,
    isUploaded,
  } = useAudioRecorder({
    onRecordingComplete: () => {
      setIsRecordingComplete(true);
    }
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleUploadAndNext = async () => {
    if (canUpload && audioBlob) {
      try {
        const result = await uploadAudio(audioBlob, questionNumber);
        
        // 질문 3 완료 시 onComplete 콜백 호출
        if (questionNumber === 3 && onComplete && result) {
          console.log('질문 3 완료, onComplete 콜백 호출:', result);
          onComplete(result);
        }
        
        onNext();
      } catch (error) {
        console.error('Upload failed:', error);
      }
    } else if (isUploaded) {
      onNext();
    }
  };


  return (
    <div className="w-full h-screen bg-[#FFFAE7] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0">
        <Header title="모아 Call" showBackButton={true} onBack={onBack} />
      </div>

      {/* Main Content - 뷰포트 높이에 맞춤 */}
      <div className="flex-1 flex flex-col justify-between px-4 py-2 min-h-0">
        
        {/* Question Section */}
        <div className="text-center mb-2 mt-10">
          <p className="text-black font-ownglyph text-2xl sm:text-3xl font-normal leading-tight">
            {String(questionNumber).padStart(2, "0")}
            <br />
            {question}
            <br />
            <span className="text-base sm:text-lg text-korean-brown-secondary">(권장시간 1분)</span>
          </p>
        </div>

        {/* 녹음 타이머 - 모바일 최적화 */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-korean-cream rounded-xl shadow-md px-4 py-4 mx-2 border-2 border-korean-brown-border">
            <div className="text-korean-brown-primary font-pretendard text-sm font-medium mb-1 text-center">
              {isRecording ? "녹음 시간" : "대기 중"}
            </div>
            <div className={`font-pretendard text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-center ${
              isRecording ? "text-korean-brown-primary" : "text-korean-brown-secondary"
            }`}>
              {formatTime(isRecording ? recordingTime : 0)}
            </div>
            {isRecording && (
              <div className="flex items-center justify-center mt-2">
                <div className="w-2 h-2 bg-korean-brown-primary rounded-full animate-pulse mr-2"></div>
                <span className="text-korean-brown-primary font-medium text-sm">녹음 중</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - 캐릭터, 컨트롤, 상태 */}
        <div className="flex-shrink-0">
          {/* Recording Status - 간결하게 */}
          {(recordingState === 'stopped' || isUploading || isUploaded || error) && (
            <div className="mb-3 text-center px-2">
              {recordingState === 'stopped' && (
                <div className="bg-korean-brown-light border border-korean-brown-border-alt rounded-lg px-3 py-2">
                  <div className="text-korean-brown-primary font-medium text-sm">
                    ✅ 녹음 완료!
                  </div>
                </div>
              )}
              {isUploading && (
                <div className="bg-korean-brown-light border border-korean-brown-border-alt rounded-lg px-3 py-2">
                  <div className="text-korean-brown-primary font-medium text-sm">
                    📤 업로드 중...
                  </div>
                </div>
              )}
              {isUploaded && (
                <div className="bg-korean-brown-light border border-korean-brown-border-alt rounded-lg px-3 py-2">
                  <div className="text-korean-brown-primary font-medium text-sm">
                    ✅ 업로드 완료!
                  </div>
                </div>
              )}
              {error && (
                <div className="bg-korean-cream border border-red-300 rounded-lg px-3 py-2">
                  <div className="text-red-600 font-medium text-sm">
                    ❌ {error}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Character Image - 사이즈 키움 */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 mb-3 mx-auto">
            <img
              src="/images/call/character-question.png"
              alt="모아 캐릭터"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Recording Controls - 모바일 최적화 */}
          <div className="mb-3 flex flex-col items-center gap-2">
            <Button
              variant={isRecording ? "danger" : "primary"}
              onClick={handleRecordingToggle}
              className="w-full h-14 text-lg font-bold max-w-xs"
            >
              {isRecording ? "🛑 녹음 정지" : "🎤 녹음 시작"}
            </Button>
            
            {recordingState === 'stopped' && (
              <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
                <Button
                  variant="secondary"
                  onClick={resetRecording}
                  className="flex-1 h-12 text-sm"
                >
                  🔄 다시 녹음
                </Button>
                
                {/* 테스트용 다운로드 버튼 */}
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (audioBlob) {
                      const url = URL.createObjectURL(audioBlob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `질문${questionNumber}_녹음.webm`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }
                  }}
                  className="flex-1 h-12 text-sm bg-korean-brown-secondary hover:bg-korean-brown-border text-korean-brown-primary border-korean-brown-border-alt"
                >
                  💾 다운로드
                </Button>
              </div>
            )}
          </div>

          {/* Next Button */}
          <div className="flex flex-col gap-2">
            <Button
              variant={canUpload || isUploaded ? "primary" : "waiting"}
              onClick={handleUploadAndNext}
              disabled={isUploading || (!canUpload && !isUploaded)}
              className="w-full h-14 text-lg font-bold"
            >
              {isUploading ? "📤 업로드 중..." : 
               isUploaded ? "✅ 다음 질문으로" : 
               "녹음 완료 후 다음"}
            </Button>
            
            {/* 매직 버튼 - 테스트용 */}
            <Button
              variant="secondary"
              onClick={onNext}
              className="w-full h-12 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300"
            >
              🪄 매직 버튼 (테스트용)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
