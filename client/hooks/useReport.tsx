import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface WeeklyReport {
  id: string;
  weekStart: string; // ISO date string for start of week (Sunday)
  weekEnd: string; // ISO date string for end of week (Saturday)
  title: string;
  emotionScore: number;
  isNew: boolean; // For "N" badge
  emotionalAnalysis: {
    stress: number;
    resilience: number;
    emotionalStability: number;
  };
  insights: string;
  aiRecommendations: string;
  generatedDate: string; // When report was generated (Sunday)
}

interface ReportState {
  reports: WeeklyReport[];
  selectedReport: WeeklyReport | null;
  currentView: "list" | "detail";
}

interface ReportContextType extends ReportState {
  selectReport: (report: WeeklyReport) => void;
  goBackToList: () => void;
  markReportAsRead: (reportId: string) => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

// Mock data for weekly reports
const mockReports: WeeklyReport[] = [
  {
    id: "2025-w4",
    weekStart: "2025-01-19",
    weekEnd: "2025-01-25",
    title: "1월 4주차 감정 리포트",
    emotionScore: 65,
    isNew: true,
    emotionalAnalysis: {
      stress: 45,
      resilience: 62,
      emotionalStability: 58,
    },
    insights:
      "이번 주는 전반적으로 안정적인 감정 상태를 유지하셨습니다. 스트레스 수준이 평균보다 낮고, 회복 탄력성이 향상되었습니다.",
    aiRecommendations:
      "계속해서 규칙적인 생활 패턴을 유지하시고, 감정 기록을 통해 자신의 변화를 관찰해보세요. 스트레스 관리를 위해 명상이나 가벼운 운동을 추천합니다.",
    generatedDate: "2025-01-26",
  },
  {
    id: "2025-w3",
    weekStart: "2025-01-12",
    weekEnd: "2025-01-18",
    title: "1월 3주차 감정 리포트",
    emotionScore: 72,
    isNew: false,
    emotionalAnalysis: {
      stress: 38,
      resilience: 75,
      emotionalStability: 68,
    },
    insights:
      "이번 주는 특히 회복 탄력성이 높았습니다. 어려운 상황에서도 긍정적으로 대처하는 모습을 보였습니다.",
    aiRecommendations:
      "현재의 긍정적인 마인드를 유지하세요. 어려운 일이 있어�� 차근차근 해결해 나가는 능력이 있습니다.",
    generatedDate: "2025-01-19",
  },
  {
    id: "2025-w2",
    weekStart: "2025-01-05",
    weekEnd: "2025-01-11",
    title: "1월 2주차 감정 리포트",
    emotionScore: 58,
    isNew: false,
    emotionalAnalysis: {
      stress: 55,
      resilience: 48,
      emotionalStability: 52,
    },
    insights:
      "새해 시작과 함께 약간의 스트레스가 있었지만, 점차 적응해 가는 모습입니다.",
    aiRecommendations:
      "새로운 환경에 적응하는 시간을 가지세요. 천천히 하루하루 기록하며 변화를 관찰해보세요.",
    generatedDate: "2025-01-12",
  },
];

export function ReportProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ReportState>({
    reports: mockReports,
    selectedReport: null,
    currentView: "list",
  });

  // Simulate new report generation on Sundays
  useEffect(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();

    // If it's Sunday (0), check if we need to generate a new report
    if (dayOfWeek === 0) {
      const todayStr = now.toISOString().split("T")[0];
      const hasReportForThisWeek = state.reports.some(
        (report) => report.generatedDate === todayStr,
      );

      if (!hasReportForThisWeek) {
        // Generate new report (in real app, this would be an API call)
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - 6); // Start of week (Sunday)

        const weekEnd = new Date(now);
        weekEnd.setDate(now.getDate()); // End of week (Saturday, today is Sunday)

        // 정확한 주차 계산
        const weekOfYear = Math.ceil((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
        
        const newReport: WeeklyReport = {
          id: `2025-w${weekOfYear}-${now.getTime()}`, // 타임스탬프 추가로 고유성 보장
          weekStart: weekStart.toISOString().split("T")[0],
          weekEnd: weekEnd.toISOString().split("T")[0],
          title: `${now.getMonth() + 1}월 ${weekOfYear}주차 감정 리포트`,
          emotionScore: Math.floor(Math.random() * 40) + 60, // 60-100
          isNew: true,
          emotionalAnalysis: {
            stress: Math.floor(Math.random() * 50) + 25,
            resilience: Math.floor(Math.random() * 50) + 25,
            emotionalStability: Math.floor(Math.random() * 50) + 25,
          },
          insights: "이번 주의 감정 분석이 완료되었습니다.",
          aiRecommendations: "새로운 주간 리포트를 확인해보세요.",
          generatedDate: todayStr,
        };

        setState((prev) => ({
          ...prev,
          reports: [newReport, ...prev.reports],
        }));
      }
    }
  }, []);

  const selectReport = (report: WeeklyReport) => {
    setState((prev) => ({
      ...prev,
      selectedReport: report,
      currentView: "detail",
    }));
  };

  const goBackToList = () => {
    setState((prev) => ({
      ...prev,
      selectedReport: null,
      currentView: "list",
    }));
  };

  const markReportAsRead = (reportId: string) => {
    setState((prev) => ({
      ...prev,
      reports: prev.reports.map((report) =>
        report.id === reportId ? { ...report, isNew: false } : report,
      ),
    }));
  };

  return (
    <ReportContext.Provider
      value={{
        ...state,
        selectReport,
        goBackToList,
        markReportAsRead,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error("useReport must be used within a ReportProvider");
  }
  return context;
}
