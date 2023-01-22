import Image from "next/image";

interface Props {
  art: string;
  album: string;
}

export function AlbumCover({ art, album }: Props) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-11 h-11 sm:w-16 sm:h-16 relative">
        <Image src={art} alt={album} fill />
      </div>
    </div>
  );
}
