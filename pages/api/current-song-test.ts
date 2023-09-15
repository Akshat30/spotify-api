import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sess = await getSession({ req });
  const accesstoken = sess?.accessToken;

  if (req.method === "GET") {
    const response = await getNowPlaying(accesstoken!);
    const parsed = await response.json();
    if (
      response.status === 204 ||
      response.status > 400 ||
      parsed.currently_playing_type !== "track"
    ) {
      //? s-maxage=180 because song usually lasts 3 minutes
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=180, stale-while-revalidate=90"
      );
      return res.status(200).json(response.status);
    }

    const data = {
      isPlaying: parsed.is_playing,
      id: parsed.item.id,
      title: parsed.item.name,
      album: parsed.item.album.name,
      artist: parsed.item.album.artists
        .map((artist: any) => artist.name)
        .join(", "),
      albumImageUrl: parsed.item.album.images[0].url,
      songUrl: parsed.item.external_urls.spotify,
    };

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=180, stale-while-revalidate=90"
    );
    return res.status(200).json(data);
  }
};

export default handler;

export const getNowPlaying = async (refresh_token: string) => {
  try {
    // Make the request to the Spotify API with the new access token
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    });

    if (response.status === 401) {
      console.log("couldn't get current song");
      return response;
    }

    if (!response.ok) {
      // Handle error response here if needed
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return response;
  } catch (error) {
    // Handle errors here, e.g., log or throw them
    console.error("Error in getNowPlayingFetch:", error);
    throw error;
  }
};
