import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBack,
}) => {
  return (
    <div className="flex items-center justify-between w-full h-9 px-6 py-0">
      <div className="w-6 h-6 flex-shrink-0">
        {showBackButton && (
          <button onClick={onBack} className="w-full h-full">
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
        )}
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-black text-xl font-bold tracking-tight font-pretendard">
          {title}
        </h1>
      </div>
      <div className="w-6 h-6 flex-shrink-0" />
    </div>
  );
};
