import { SoundBar } from "./SoundBar";

interface Props {
  title: string;
  artist: string;
  isLive: boolean;
  streamerName: string;
  isPlaying: boolean;
}

export function SongInfo({
  title,
  artist,
  isLive,
  streamerName,
  isPlaying,
}: Props) {
  return (
    <span
      className={`flex flex-col ${
        isLive ? "justify-between" : "justify-start"
      }  min-w-[0] text-left px-1 sm:px-3 sm:py-2 text-xs sm:text-sm h-full`}
    >
      {isLive && (
        <span className="flex space-x-1">
          <span className="text-xs inline-block px-1 py-0.5 sm:py-1 leading-none text-center whitespace-nowrap font-bold bg-red-500 text-gray-100 rounded">
            Live
          </span>
          <span className="">{streamerName}</span>
          <SoundBar isPlaying={isPlaying} />
        </span>
      )}
      {title && (
        <span className="flex">
          <span className="text-gray-100 overflow-hidden overflow-ellipsis">
            {title}
          </span>
          <SoundBar isPlaying={isPlaying} />
        </span>
      )}
      {artist && (
        <span className="text-gray-400 overflow-hidden overflow-ellipsis text-xs">
          {artist}
        </span>
      )}
    </span>
  );
}
