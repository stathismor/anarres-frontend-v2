const getProgressPercentage = (elapsed: number, duration: number) => {
  return (elapsed / duration) * 100;
};

interface Props {
  elapsed: number;
  duration: number;
}

export function ProgressBar({ elapsed, duration }: Props) {
  return (
    <>
      <div className="">
        <div className="flex bg-gray-100 h-0.5 sm:h-1">
          <div
            className="bg-red-500"
            style={{ width: `${getProgressPercentage(elapsed, duration)}%` }}
          />
        </div>
      </div>
    </>
  );
}
