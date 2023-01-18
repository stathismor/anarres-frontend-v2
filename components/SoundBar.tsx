import classNames from "classnames";
interface Props {
  isPlaying: boolean;
}

export function SoundBar({ isPlaying }: Props) {
  return (
    <span className="flex pl-0.5 h-4 sm:h-5 pb-0.5 sm:pb-1">
      <span
        className={classNames("sound-bar-static", {
          "sound-bar-animated": isPlaying,
          "bg-gray-300": isPlaying,
          "bg-gray-500": !isPlaying,
        })}
      ></span>
      <span
        className={classNames("sound-bar-static", {
          "sound-bar-animated": isPlaying,
          "bg-gray-300": isPlaying,
          "bg-gray-500": !isPlaying,
        })}
      ></span>
      <span
        className={classNames("sound-bar-static", {
          "sound-bar-animated": isPlaying,
          "bg-gray-300": isPlaying,
          "bg-gray-500": !isPlaying,
        })}
      ></span>
      <span
        className={classNames("sound-bar-static", {
          "sound-bar-animated": isPlaying,
          "bg-gray-300": isPlaying,
          "bg-gray-500": !isPlaying,
        })}
      ></span>
    </span>
  );
}
