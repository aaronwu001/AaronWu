// Supports YouTube, Vimeo, and direct video files
// Usage in MDX: <VideoEmbed url="https://youtube.com/watch?v=..." />

interface Props {
  url: string;
  title?: string;
}

function getEmbedUrl(url: string): { type: "iframe" | "video"; src: string } {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (ytMatch) {
    return { type: "iframe", src: `https://www.youtube.com/embed/${ytMatch[1]}` };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return { type: "iframe", src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  // Direct MP4 / video file
  return { type: "video", src: url };
}

export default function VideoEmbed({ url, title = "Project video" }: Props) {
  const embed = getEmbedUrl(url);

  return (
    <div className="video-embed">
      {embed.type === "iframe" ? (
        <iframe
          src={embed.src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video controls style={{ width: "100%", height: "100%" }}>
          <source src={embed.src} />
        </video>
      )}
    </div>
  );
}
