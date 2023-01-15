interface Props {
  isPlaying: boolean;
}

export function SoundBar({ isPlaying }: Props) {
  return (
    <>
      {isPlaying && (
        <span className="flex pl-1 sm:pl-1.5 sm:pt-1">
          <span className="sound-bar"></span>
          <span className="sound-bar"></span>
          <span className="sound-bar"></span>
          <span className="sound-bar"></span>
        </span>
      )}
    </>
  );
}
