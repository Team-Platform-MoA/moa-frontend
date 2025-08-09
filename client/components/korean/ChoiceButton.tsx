import { cn } from "@/lib/utils";

interface ChoiceButtonProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  children,
  selected = false,
  onClick,
  className,
}) => {
  const baseClasses = "flex w-full justify-center items-center gap-2.5 rounded-xl h-16 font-pretendard text-xl font-normal tracking-tight transition-colors";
  
  const variantClasses = selected
    ? "bg-korean-brown-primary border border-korean-brown-primary text-white"
    : "bg-korean-brown-light border border-korean-brown-border-alt text-korean-brown-dark hover:bg-korean-brown-secondary";

  return (
    <button
      onClick={onClick}
      className={cn(baseClasses, variantClasses, className)}
    >
      {children}
    </button>
  );
};
