import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import { intervalToDuration } from "date-fns";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement>();
  const [nowPlaying, setNowPlaying] = useState({
    duration: 0,
    elapsed: 0,
    remaining: 0,
    song: { artist: "", title: "", art: "/images/generic_album_art.jpg" },
  });

  const getProgressText = useCallback(() => {
    const elapsed = intervalToDuration({
      start: 0,
      end: nowPlaying.elapsed * 1000,
    });
    const duration = intervalToDuration({
      start: 0,
      end: nowPlaying.duration * 1000,
    });

    return `${elapsed.minutes}:${elapsed.seconds}/${duration.minutes}:${duration.seconds}`;
  }, [nowPlaying]);

  const getProgressPercentage = useCallback(() => {
    return (nowPlaying.elapsed / nowPlaying.duration) * 100;
  }, [nowPlaying]);

  const fetchData = async () => {
    const data = await fetch("https://admin.anarres.fm/api/nowplaying/1");
    const json = await data.json();
    return json;
  };

  useEffect(() => {
    fetchData().then((res) => {
      setAudioElement(new Audio(res.station.listen_url));
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchData().then((res) => {
        setNowPlaying(res.now_playing);
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  function togglePlay() {
    if (!audioElement) {
      return;
    }

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="flex fixed bottom-0 overflow-hidden w-full p-2 text-center bg-gray-700">
      <div className="flex">
        <button type="button" onClick={() => togglePlay()} className="">
          {isPlaying ? (
            <PauseIcon className="h-20 w-20 text-red-500" />
          ) : (
            <PlayIcon className="h-20 w-20 text-red-500" />
          )}

          <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
        </button>
        <div className="h-20 w-20 relative">
          <Image src={nowPlaying.song.art} alt="Album cover" fill />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col grow h-10">
          <span className="text-sm text-red-500 font-semibold pt-1">
            {nowPlaying.song.title}
          </span>
          <span className="text-xs text-gray-100 font-medium ">
            {nowPlaying.song.artist}
          </span>
        </div>
        <div className="flex justify-end mx-2">
          <span className="text-xs text-gray-100 font-medium pl-2">
            {getProgressText()}
          </span>
        </div>
        <div className="flex bg-gray-100 rounded-full h-2.5 m-2">
          <div
            className="bg-red-500 rounded-full"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>
    </div>
  );
}
