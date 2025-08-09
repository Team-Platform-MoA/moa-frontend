import { Home, Phone, Mail, BarChart3, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BottomNavigationProps {
  activeTab?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab = "home" }) => {
  const navigate = useNavigate();

  const tabs = [
    { id: "home", icon: Home, label: "홈", path: "/home" },
    { id: "call", icon: Phone, label: "전화", path: "/call" },
    { id: "message", icon: Mail, label: "메시지", path: "/postbox" },
    { id: "report", icon: BarChart3, label: "리포트", path: "/report" },
    { id: "profile", icon: User, label: "프로필", path: "#" },
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.path !== "#") {
      navigate(tab.path);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-screen h-21 bg-[#FFFBEE] shadow-[0_2px_14px_0_rgba(0,0,0,0.25)] flex">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            className="flex-1 flex items-center justify-center py-4 px-11"
            onClick={() => handleTabClick(tab)}
          >
            <Icon
              className={`w-8 h-8 ${
                isActive ? "text-korean-brown-dark" : "text-korean-brown-border"
              }`}
              strokeWidth={isActive ? 2.5 : 2}
            />
          </button>
        );
      })}
    </div>
  );
};
