import { useReport } from "../../hooks/useReport";
import { ReportList } from "./ReportList";
import { ReportDetail } from "./ReportDetail";

export function Report() {
  const { currentView } = useReport();

  return (
    <div className="min-h-screen bg-[#FFFAE7]">
      {currentView === "list" ? <ReportList /> : <ReportDetail />}
    </div>
  );
}
