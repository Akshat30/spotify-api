import * as React from "react";
import { SiSpotify } from "react-icons/si";

export default function CurrentSong({track}:{track:any}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferer"
      href={
        track?.isPlaying
          ? track.songUrl
          : "https://open.spotify.com/user/31kdt6sl2iasi2mhtuxdpkqqscoa?si=75a37c65ed884222"
      }
      className="flex border-2 border-zinc-800 relative bg-neutral-900 items-center space-x-4 w-72 rounded-lg hover:bg-zinc-800 transition duration-300"
    >
      {track?.isPlaying ? (
        <div className="w-16">
          <img
            className="w-16 rounded-lg"
            src={track?.albumImageUrl}
            alt={track?.album}
          />
        </div>
      ) : (
        <div className="w-16 px-4 py-4 mr-4">
          <SiSpotify size={48} color={"#1ED760"} />
        </div>
      )}
      <div className="flex flex-row">
        <div className="flex-1">
          <p className="component font-bold">
            {track?.isPlaying
              ? track.title.length >= 22
                ? track.title.substring(0, 22) + "..."
                : track.title
              : "Not Listening"}
          </p>
          <p className="font-dark text-xs">
            {track?.isPlaying
              ? track.artist.length >= 28
                ? track.artist.substring(0, 28) + "..."
                : track.artist
              : "Spotify"}
          </p>
        </div>
        {/* <div className="ml-4">
          <SiSpotify size={20} color={"#1ED760"} />
        </div> */}
      </div>
    </a>
  );
}
