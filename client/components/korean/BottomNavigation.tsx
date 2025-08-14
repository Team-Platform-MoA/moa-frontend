import { Home, Phone, Mail, BarChart3, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReport } from "../../hooks/useReport";

interface BottomNavigationProps {
  activeTab?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab = "home",
}) => {
  const navigate = useNavigate();

  // Get new reports count for badge
  let newReportsCount = 0;
  try {
    const { reports } = useReport();
    newReportsCount = reports.filter((report) => report.isNew).length;
  } catch (error) {
    // useReport hook is only available when ReportProvider is present
    // This is fine for pages that don't need report functionality
  }

  const tabs = [
    { id: "home", icon: Home, label: "홈", path: "/home" },
    { id: "call", icon: Phone, label: "전화", path: "/call" },
    { id: "message", icon: Mail, label: "메시지", path: "/postbox" },
    {
      id: "report",
      icon: BarChart3,
      label: "리포트",
      path: "/report",
      badge: newReportsCount,
    },
    { id: "profile", icon: User, label: "프로필", path: "#" },
  ];

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    if (tab.path !== "#") {
      navigate(tab.path);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-[#FFFBEE] shadow-[0_2px_14px_0_rgba(0,0,0,0.25)] safe-area-bottom">
      <div className="flex w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className="flex-1 flex flex-col items-center justify-center py-2 px-1 relative min-h-[68px]"
              onClick={() => handleTabClick(tab)}
            >
              <Icon
                className={`w-6 h-6 mb-1 ${
                  isActive ? "text-korean-brown-dark" : "text-korean-brown-border"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-korean-brown-dark" : "text-korean-brown-border"
                }`}
              >
                {tab.label}
              </span>
              {/* Badge for new reports */}
              {tab.badge && tab.badge > 0 && (
                <div className="absolute top-1 right-2 bg-[#FF6B6B] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  N
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
