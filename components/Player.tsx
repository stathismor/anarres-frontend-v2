import { useEffect, useState } from "react";
import Image from "next/image";
import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import { Progress } from "./Progress";
import { SongInfo } from "./SongInfo";

// Feel free to use "https://demo.azuracast.com/api/nowplaying/1" for testing
const AZURACAST_URL = "https://admin.anarres.fm/api/nowplaying/1";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [live, setLive] = useState({ isLive: false, streamerName: "" });
  const [audioElement, setAudioElement] = useState<HTMLAudioElement>();
  const [nowPlaying, setNowPlaying] = useState({
    duration: 0,
    elapsed: 0,
    remaining: 0,
    song: { artist: "", title: "", art: "/images/generic_album_art.jpg" },
  });

  const fetchData = async () => {
    const data = await fetch(AZURACAST_URL);
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
        setLive({
          isLive: res.live.is_live,
          streamerName: res.live.streamer_name,
        });
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
        <div className="flex flex-col grow h-10 text-left">
          <SongInfo
            title={nowPlaying.song.title}
            artist={nowPlaying.song.artist}
            isLive={live.isLive}
            streamerName={live.streamerName}
          />
        </div>
        <Progress elapsed={nowPlaying.elapsed} duration={nowPlaying.duration} />
      </div>
    </div>
  );
}
