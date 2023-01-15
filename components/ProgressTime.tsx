import { intervalToDuration } from "date-fns";

const zeroPad = (num: number | undefined) =>
  num == null ? "00" : String(num).padStart(2, "0");

const formatTime = (milliseconds: number) => {
  const elapsedHMS = intervalToDuration({
    start: 0,
    end: milliseconds * 1000,
  });

  return `${zeroPad(elapsedHMS.minutes)}:${zeroPad(elapsedHMS.seconds)}`;
};

interface Props {
  elapsed: number;
  duration: number;
}

export function ProgressTime({ elapsed, duration }: Props) {
  return (
    <>
      {duration !== 0 && (
        <div className="flex justify-center whitespace-nowrap px-1">
          <div className="flex justify-between">
            <span className="text-xs whitespace-nowrap text-gray-100 invisible sm:visible">
              {`${formatTime(elapsed)} / ${formatTime(duration)}`}
            </span>
            <span className="text-xs whitespace-nowrap text-gray-100 visible sm:hidden">
              {`${formatTime(elapsed)}/${formatTime(duration)}`}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
