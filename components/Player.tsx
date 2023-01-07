import { useEffect, useState } from "react";
import Image from "next/image";
import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement>();
  const [nowPlaying, setNowPlaying] = useState({
    duration: 0,
    elapsed: 0,
    song: { artist: "", title: "", art: "" },
  });

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
    <div className="flex fixed bottom-0 overflow-hidden w-full p-2 bg-gray-700">
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
          <span className="text-sm text-red-500 capitalize font-semibold pt-1">
            I think I need a sunrise, I am tired of the sunset
          </span>
          <span className="text-xs text-gray-100 uppercase font-medium ">
            - Boston Augustana
          </span>
        </div>
        <div className="flex justify-end mx-2">
          <span className="text-xs text-gray-100 uppercase font-medium pl-2">
            02:00/04:00
          </span>
        </div>
        <div className="flex bg-gray-100 rounded-full h-2.5 m-2">
          <div className="bg-red-500 rounded-full" style={{ width: "25%" }} />
        </div>
      </div>
    </div>
  );
}

export default Player;
