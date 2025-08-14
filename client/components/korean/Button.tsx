import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "disabled" | "waiting" | "danger";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className,
  type = "button",
  disabled,
}) => {
  const baseClasses =
    "flex w-full justify-center items-center gap-2.5 rounded-xl h-16 font-pretendard text-xl font-normal tracking-tight transition-colors";

  const variantClasses = {
    primary:
      "bg-korean-brown-primary border border-korean-brown-primary text-white hover:bg-korean-brown-dark",
    secondary:
      "bg-korean-brown-light border border-korean-brown-border-alt text-korean-brown-dark hover:bg-korean-brown-secondary",
    disabled: "bg-korean-brown-secondary text-white cursor-not-allowed",
    waiting: "bg-[#D8C2A1] text-white hover:bg-[#D8C2A1]",
    danger: "bg-red-500 border border-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={variant === "disabled" || disabled}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </button>
  );
};
