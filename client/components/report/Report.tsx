import { useReport } from "../../hooks/useReport";
import { ReportList } from "./ReportList";
import { ReportDetail } from "./ReportDetail";

export function Report() {
  const { currentView } = useReport();

  return (
    <div className="min-h-dvh bg-[#FFFAE7] pb-safe-bottom">
      {currentView === "list" ? <ReportList /> : <ReportDetail />}
    </div>
  );
}
