import { useReport } from "../../hooks/useReport";
import { ProgressBar } from "../korean/ProgressBar";

export function ReportList() {
  const { reports, selectReport, markReportAsRead } = useReport();

  const handleReportClick = (report: any) => {
    if (report.isNew) {
      markReportAsRead(report.id);
    }
    selectReport(report);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const formatWeekRange = (startStr: string, endStr: string) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    return `${start.getMonth() + 1}월 ${start.getDate()}일 - ${end.getMonth() + 1}월 ${end.getDate()}일`;
  };

  return (
    <div className="flex flex-col min-h-full bg-[#FFFAE7]">
      {/* Header */}
      <div className="pt-6 pb-4 px-6">
        <h1 className="text-[32px] font-bold text-black leading-none tracking-[-0.64px] font-['Pretendard']">
          주간 리포트
        </h1>
        <p className="text-[20px] text-black mt-4 font-['Pretendard']">
          매주 일요일에 생성되는 감정 분석 리포트입니다.
        </p>
      </div>

      {/* Reports List */}
      <div className="flex-1 px-6 pb-6">
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              onClick={() => handleReportClick(report)}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow relative"
            >
              {/* New Badge */}
              {report.isNew && (
                <div className="absolute top-4 right-4 bg-[#FF6B6B] text-white text-xs font-bold px-2 py-1 rounded-full">
                  N
                </div>
              )}

              {/* Report Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-[20px] font-bold text-black leading-none tracking-[-0.4px] font-['Pretendard']">
                    {report.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 mt-1 font-['Pretendard']">
                    {formatWeekRange(report.weekStart, report.weekEnd)}
                  </p>
                </div>
              </div>

              {/* Emotion Score Circle */}
              <div className="flex items-center mb-4">
                <div className="relative">
                  {/* Circle background */}
                  <div className="w-16 h-16 bg-[#DCEAEB] rounded-full flex items-center justify-center">
                    <span className="text-[24px] font-medium text-black font-['Pretendard']">
                      {report.emotionScore}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-[14px] text-gray-600 mb-1 font-['Pretendard']">
                    이번 주 종합 감정 점수
                  </div>
                  <ProgressBar
                    progress={report.emotionScore}
                    color="#4CC3BE"
                    backgroundColor="#D9EEF0"
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-[12px] text-gray-500 mb-1 font-['Pretendard']">
                    스트레스
                  </div>
                  <div className="w-full h-2 bg-[#FFDBDB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF6E6E] rounded-full transition-all duration-300"
                      style={{ width: `${report.emotionalAnalysis.stress}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-gray-600 mt-1 font-['Pretendard']">
                    {report.emotionalAnalysis.stress}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[12px] text-gray-500 mb-1 font-['Pretendard']">
                    회복력
                  </div>
                  <div className="w-full h-2 bg-[#E1F7BE] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B2E96F] rounded-full transition-all duration-300"
                      style={{
                        width: `${report.emotionalAnalysis.resilience}%`,
                      }}
                    />
                  </div>
                  <div className="text-[11px] text-gray-600 mt-1 font-['Pretendard']">
                    {report.emotionalAnalysis.resilience}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[12px] text-gray-500 mb-1 font-['Pretendard']">
                    안정성
                  </div>
                  <div className="w-full h-2 bg-[#EAE3ED] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#8A50C1] rounded-full transition-all duration-300"
                      style={{
                        width: `${report.emotionalAnalysis.emotionalStability}%`,
                      }}
                    />
                  </div>
                  <div className="text-[11px] text-gray-600 mt-1 font-['Pretendard']">
                    {report.emotionalAnalysis.emotionalStability}%
                  </div>
                </div>
              </div>

              {/* Generated Date */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-[12px] text-gray-500 font-['Pretendard']">
                  생성일: {formatDate(report.generatedDate)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
