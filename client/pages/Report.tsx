import { Report } from '../components/report/Report';
import { BottomNavigation } from '../components/korean/BottomNavigation';

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-[#FFFAE7] flex flex-col">
      <div className="flex-1">
        <Report />
      </div>
      <BottomNavigation activeTab="report" />
    </div>
  );
}
