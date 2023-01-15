import { useEffect, useState } from "react";
import Image from "next/image";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import { ProgressBar } from "./ProgressBar";
import { ProgressTime } from "./ProgressTime";
import { PlayButton } from "./PlayButton";
import { AlbumCover } from "./AlbumCover";
import { SongInfo } from "./SongInfo";

// Feel free to use "https://demo.azuracast.com/api/nowplaying/1" for testing
const AZURACAST_URL = "https://admin.anarres.fm/api/nowplaying/1";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [live, setLive] = useState({
    isLive: false,
    streamerName: "akjshkd",
  });
  const [audioElement, setAudioElement] = useState<HTMLAudioElement>();
  const [nowPlaying, setNowPlaying] = useState({
    duration: 10,
    elapsed: 0,
    remaining: 0,
    song: {
      artist: "ajsdhasjhd",
      album: "",
      title: "aksjhjd",
      art: "/images/generic_album_art.jpg",
    },
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
    <div className="flex flex-col fixed bottom-0 overflow-hidden w-full text-center bg-gray-800">
      <ProgressBar
        elapsed={nowPlaying.elapsed}
        duration={nowPlaying.duration}
      />
      <div className="flex w-full justify-between py-1">
        <div className="flex min-w-[0] whitespace-nowrap">
          <PlayButton isPlaying={isPlaying} onClick={togglePlay} />
          <AlbumCover art={nowPlaying.song.art} album={nowPlaying.song.album} />
          <SongInfo
            title={nowPlaying.song.title}
            artist={nowPlaying.song.artist}
            isLive={live.isLive}
            streamerName={live.streamerName}
          />
        </div>
        <div className="pt-0.5">
          <ProgressTime
            elapsed={nowPlaying.elapsed}
            duration={nowPlaying.duration}
          />
        </div>
      </div>
    </div>
  );
}
