import { ImageResponse } from "next/og";
import { IconMark } from "@/lib/iconMark";

// 96px: Google wants favicons at a multiple of 48px
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<IconMark size={96} />, size);
}
