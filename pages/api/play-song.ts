import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const PLAY_ENDPOINT = `https://api.spotify.com/v1/me/player/play`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  let uri;

  if (Array.isArray(query.uri)) {
    uri = query.uri[0];
  } else {
    uri = query.uri;
  }

  const sess = await getSession({ req });
  const accesstoken = sess?.accessToken;

  if (req.method === "GET") {
    const response = await putPlay(accesstoken!, uri!);
    return res.status(200).json(response);
  }
};

export default handler;

export const putPlay = async (refresh_token: string, uri: string) => {
  try {
    // Make the request to the Spotify API with the new access token
    const response = await fetch(PLAY_ENDPOINT, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
      body: JSON.stringify({
        uris: [uri],
      }),
    });

    if (response.status === 403) {
      console.log("play failed");
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
