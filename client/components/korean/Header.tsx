import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightElement?: ReactNode;
  variant?: "default" | "large" | "compact";
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBack,
  rightElement,
  variant = "default",
  className = "",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "large":
        return {
          container: "h-16 px-6 py-4",
          title: "text-xl sm:text-2xl font-bold",
          button: "w-12 h-12",
          icon: "w-7 h-7",
        };
      case "compact":
        return {
          container: "h-10 px-3 py-2",
          title: "text-base sm:text-lg font-semibold",
          button: "w-8 h-8",
          icon: "w-5 h-5",
        };
      default:
        return {
          container: "h-12 px-4 py-2",
          title: "text-xl sm:text-2xl font-bold",
          button: "w-10 h-10",
          icon: "w-6 h-6",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`flex items-center justify-between w-full bg-korean-cream ${styles.container} ${className}`}>
      {/* Left Side - Back Button */}
      <div className={`${styles.button} flex-shrink-0`}>
        {showBackButton && (
          <button 
            onClick={onBack} 
            className="w-full h-full flex items-center justify-center rounded-lg hover:bg-korean-brown-light transition-colors active:bg-korean-brown-secondary"
            aria-label="뒤로가기"
          >
            <ChevronLeft className={`${styles.icon} text-korean-brown-primary`} />
          </button>
        )}
      </div>
      
      {/* Center - Title */}
      <div className="flex-1 text-center px-2">
        <h1 className={`text-black ${styles.title} tracking-tight font-pretendard truncate`}>
          {title}
        </h1>
      </div>
      
      {/* Right Side - Custom Element or Spacer */}
      <div className={`${styles.button} flex-shrink-0 flex items-center justify-center`}>
        {rightElement || <div />}
      </div>
    </div>
  );
};
