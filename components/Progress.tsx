import { intervalToDuration } from "date-fns";

const zeroPad = (num: number | undefined) =>
  num == null ? "00" : String(num).padStart(2, "0");

// Takes elapsed and duration numbers, in milliseconds and returns
// a text in the format of 03:11/04:55
const getProgressText = (elapsed: number, duration: number) => {
  const elapsedHMS = intervalToDuration({
    start: 0,
    end: elapsed * 1000,
  });
  const durationHMS = intervalToDuration({
    start: 0,
    end: duration * 1000,
  });

  const formattedElapsed = `${zeroPad(elapsedHMS.minutes)}:${zeroPad(
    elapsedHMS.seconds
  )}`;
  const formattedDuration = `${zeroPad(durationHMS.minutes)}:${zeroPad(
    durationHMS.seconds
  )}`;

  return `${formattedElapsed}/${formattedDuration}`;
};

const getProgressPercentage = (elapsed: number, duration: number) => {
  return (elapsed / duration) * 100;
};

interface Props {
  elapsed: number;
  duration: number;
}

export function Progress({ elapsed, duration }: Props) {
  return (
    <>
      {duration !== 0 && (
        <div className="px-2 py-1">
          <div className="flex justify-end pb-0.5">
            <span className="text-xs text-gray-100">
              {getProgressText(elapsed, duration)}
            </span>
          </div>
          <div className="flex bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-red-500 rounded-full"
              style={{ width: `${getProgressPercentage(elapsed, duration)}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
}
