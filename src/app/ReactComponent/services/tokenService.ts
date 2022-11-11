/* eslint-disable no-debugger */

import { enviornmentConstant } from '../constant';

/**
 * @param {RequestInfo} url
 * @param {RequestInit} options
 * @returns {Promise<Response>}
 */
const fetchWithRetry = async (url: any, options: any) => {
  const MAX_RETRIES = 4;
  let error = Error('something went wrong');
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await fetch(url, options);
    } catch (err: any) {
      error = err;
    }
  }
  console.error('Fetch failed after max retries', { url, options });
  throw error;
};

export default async function getToken(
  tokenEndpoint: any,
  userId: any,
  role: any,
  roomId: any
) {
  try {
    const response = await fetchWithRetry(`${tokenEndpoint}api/token`, {
      method: 'POST',
      body: JSON.stringify({
        role,
        room_id: roomId,
        user_id: userId,
      }),
    });

    if (!response.ok) {
      let error: any = new Error('Request failed!');
      error.response = response;
      throw error;
    }

    const data = await response.json();
    const { token } = data;
    // response will be sucess and token is null when url is valid but response
    // domain is not present in 100ms
    if (token === null) {
      throw Error(data.msg);
    }
    return token;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getUserToken(name: any) {
  const extractUrlCode = () => {
    const path: any = window.location.pathname;
    const regex = /(\/streaming)?\/(preview|meeting)\/(?<code>[^/]+)/;
    return path.match(regex)?.groups?.code || null;
  };

  const code = extractUrlCode();

  const url = getBackendEndpoint() + 'get-token';

  const headers = {
    'Content-Type': 'application/json',
    //subdomain: enviornmentConstant?.REACT_APP_TOKEN_GENERATION_ENDPOINT_DOMAIN,
  };

  const response = await fetchWithRetry(url, {
    method: 'post',
    body: JSON.stringify({
      code: code,
      user_id: name,
    }),
    headers,
  });

  if (!response.ok) {
    let error: any = new Error('Request failed!');
    error.response = response;
    throw error;
  }

  const { token } = await response.json();
  return token;
}

export function getBackendEndpoint() {
  let BASE_BACKEND_URL;
  const baseDomain = window.location.hostname;
  if (
    baseDomain === 'qa2.100ms.live' ||
    enviornmentConstant.REACT_APP_ENV === 'qa'
  ) {
    BASE_BACKEND_URL = 'https://qa-in.100ms.live/hmsapi/';
  } else if (
    baseDomain === 'prod2.100ms.live' ||
    enviornmentConstant.REACT_APP_ENV === 'prod'
  ) {
    BASE_BACKEND_URL = 'https://prod-in.100ms.live/hmsapi/';
  } else {
    const env = enviornmentConstant.REACT_APP_ENV || 'prod';
    const apiBasePath = `https://${env}-in2.100ms.live/hmsapi/`;
    BASE_BACKEND_URL = apiBasePath || 'https://prod-in.100ms.live/hmsapi/';
  }
  return BASE_BACKEND_URL;
}
