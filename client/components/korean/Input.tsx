import { cn } from "@/lib/utils";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  className,
}) => {
  const isEmpty = !value.trim();
  const borderColor = isEmpty ? "border-korean-brown-border" : "border-korean-brown-dark";
  const textColor = isEmpty ? "text-korean-brown-border" : "text-korean-brown-dark";

  return (
    <div className="w-full px-6">
      <div
        className={cn(
          "flex w-full h-12 px-4 py-3 items-center rounded-lg border bg-korean-input transition-colors",
          borderColor,
          className
        )}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent font-pretendard text-xl font-light tracking-tight outline-none placeholder:text-korean-brown-border",
            textColor
          )}
        />
      </div>
    </div>
  );
};
