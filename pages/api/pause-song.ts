import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const PAUSE_ENDPOINT = `https://api.spotify.com/v1/me/player/pause`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sess = await getSession({ req });
  const accesstoken = sess?.accessToken;

  if (req.method === "GET") {
    const response = await putPause(accesstoken!);
    return res.status(200).json(response);
  }
};

export default handler;

export const putPause = async (refresh_token: string) => {
  try {
    // Make the request to the Spotify API with the new access token
    const response = await fetch(PAUSE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
      method: "PUT",
    });

    if (response.status === 403) {
            console.log("pause failed");
      return "";
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
