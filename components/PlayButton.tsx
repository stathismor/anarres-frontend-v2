import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

interface Props {
  isPlaying: boolean;
  onClick: () => void;
}

export function PlayButton({ isPlaying, onClick }: Props) {
  return (
    <button type="button" onClick={() => onClick()} className="sm:px-2.5 px-1">
      {isPlaying ? (
        <PauseCircleIcon className="w-12 h-12 sm:w-18 sm:h-18 text-gray-100" />
      ) : (
        <PlayCircleIcon className="w-12 h-12 sm:w-18 sm:h-18 text-gray-100" />
      )}
    </button>
  );
}
