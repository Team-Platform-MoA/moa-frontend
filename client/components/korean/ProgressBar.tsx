interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progressWidth = (current / total) * 100;

  return (
    <div className="w-full px-6">
      <div className="w-full h-2 bg-korean-progress rounded-full relative">
        <div
          className="h-2 bg-korean-brown-primary rounded-full transition-all duration-300"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
};
