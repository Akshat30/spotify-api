import { NextApiRequest, NextApiResponse } from "next";
import { getSession, useSession } from "next-auth/react";

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sess = useSession();
  const accesstoken = sess?.data?.accessToken;

  return res.status(200).json(sess.data);
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
