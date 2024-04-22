//https://github.com/spotify/web-api-examples/blob/master/authorization/authorization_code_pkce/public/app.js

import axios from "axios";

interface Token {
  access_token: string | null;
  refresh_token: string | null;
  expires_in: string | null;
  expires: string | null;
}

export async function getToken(
  tokenEndpoint: string,
  code: string,
  codeVerifier: string,
  clientId: string,
  redirectUri: string
): Promise<Token> {
  const response = await axios.post(
    tokenEndpoint,
    new URLSearchParams({
      code: code,
      client_id: clientId,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
      grant_type: "authorization_code",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}

export function getCodeVerifier(): string {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  return randomValues.reduce(
    (acc, x) => acc + possible[x % possible.length],
    ""
  );
}

export async function getCodeChallenge(codeVerifier: string): Promise<string> {
  const data = new TextEncoder().encode(codeVerifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  return btoa(String.fromCharCode(...new Uint8Array(hashed)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
