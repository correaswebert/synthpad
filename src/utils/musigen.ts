import { decodeUrl, encodeUrl } from "./hash";

const musigenUrl = "http://localhost:8000";

export async function fetchMusigen({ grid, scale, bpm }) {
  const urlData = encodeUrl({ grid, scale, bpm });

  const requestUrl = `${musigenUrl}/${urlData}`;
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  let result: string = urlData;
  try {
    const response = await fetch(requestUrl, requestOptions);
    result = await response.text();
  } catch (error) {
    console.error(error);
  }

  const sanitizedResult = result.replace(/['"]+/g, "");
  return decodeUrl(sanitizedResult);
}
