const getProgressPercentage = (elapsed: number, duration: number) => {
  return (elapsed / duration) * 100;
};

interface Props {
  elapsed: number;
  duration: number;
  isPlaying: boolean;
}

export function ProgressBar({ elapsed, duration, isPlaying }: Props) {
  return (
    <>
      <div className="flex bg-gray-100 h-0.5 sm:h-1 mb-0.5">
        <div
          className={
            isPlaying
              ? "transition-property: background-color; bg-red-500 duration-500 ..."
              : "transition-property: background-color; bg-gray-400 duration-500 ..."
          }
          style={{ width: `${getProgressPercentage(elapsed, duration)}%` }}
        />
      </div>
    </>
  );
}
