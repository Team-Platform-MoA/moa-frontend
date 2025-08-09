import { Home, Phone, Mail, BarChart3, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab = "home" }) => {
  const tabs = [
    { id: "home", icon: Home, label: "홈" },
    { id: "call", icon: Phone, label: "전화" },
    { id: "message", icon: Mail, label: "메시지" },
    { id: "chart", icon: BarChart3, label: "차트" },
    { id: "profile", icon: User, label: "프로필" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-screen h-21 bg-[#FFFBEE] shadow-[0_2px_14px_0_rgba(0,0,0,0.25)] flex">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <div
            key={tab.id}
            className="flex-1 flex items-center justify-center py-4 px-11"
          >
            <Icon 
              className={`w-8 h-8 ${
                isActive ? "text-korean-brown-dark" : "text-korean-brown-border"
              }`}
              strokeWidth={isActive ? 2.5 : 2}
            />
          </div>
        );
      })}
    </div>
  );
};
