"use client";

import { InstagramEmbed } from "react-social-media-embed";

export default function InstaEmbed({ url }: { url: string }) {
  return <InstagramEmbed url={url} width={328} />;
}
