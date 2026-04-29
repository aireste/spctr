import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#05050a",
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="52" height="52" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="22" fill="none" stroke="#c0fc04" stroke-width="2.5"/>
          <circle cx="32" cy="32" r="8" fill="none" stroke="#c0fc04" stroke-width="2"/>
          <circle cx="32" cy="32" r="2.5" fill="#c0fc04"/>
          <line x1="32" y1="6" x2="32" y2="20" stroke="#c0fc04" stroke-width="2"/>
          <line x1="32" y1="44" x2="32" y2="58" stroke="#c0fc04" stroke-width="2"/>
          <line x1="6" y1="32" x2="20" y2="32" stroke="#c0fc04" stroke-width="2"/>
          <line x1="44" y1="32" x2="58" y2="32" stroke="#c0fc04" stroke-width="2"/>
        </svg>
      </div>
    ),
    size
  );
}
