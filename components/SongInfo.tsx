interface Props {
  title: string;
  artist: string;
  isLive: boolean;
  streamerName: string;
}

export function SongInfo({ title, artist, isLive, streamerName }: Props) {
  return (
    <div className="flex flex-col grow h-10 text-left px-2">
      {isLive && (
        <span className="text-xs text-red-500 font-medium ">
          <span className="bg-red-500 text-gray-100 text-xs font-medium mr-1 px-2 py-0.3 rounded-full">
            live
          </span>
          <span className="">{streamerName}</span>
        </span>
      )}
      <span className="text-sm text-red-500 font-semibold">{title}</span>
      <span className="text-xs text-gray-100 font-medium ">{artist}</span>
    </div>
  );
}
