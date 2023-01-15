import { intervalToDuration } from "date-fns";

const zeroPad = (num: number | undefined) =>
  num == null ? "00" : String(num).padStart(2, "0");

const getProgressText = (milliseconds: number) => {
  const elapsedHMS = intervalToDuration({
    start: 0,
    end: milliseconds * 1000,
  });

  return `${zeroPad(elapsedHMS.minutes)}:${zeroPad(elapsedHMS.seconds)}`;
};

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
        {/* <div className="flex justify-between">
            <span className="text-xs text-gray-100">
              {getProgressText(elapsed)}
            </span>
            <span className="text-xs text-gray-100">
              {getProgressText(duration)}
            </span>
          </div> */}
      </div>
    </>
  );
}
