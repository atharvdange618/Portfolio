import { useState, useEffect } from "react";

export interface LastFmTrack {
  name: string;
  artist: string;
  album: string;
  url: string;
  imageUrl: string;
  isPlaying: boolean;
}

export function useNowPlaying() {
  const [track, setTrack] = useState<LastFmTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fallbackTrack: LastFmTrack = {
      name: "About You",
      artist: "The 1975",
      album: "The 1975",
      url: "https://www.last.fm/music/The+1975/_/Robbers",
      imageUrl:
        "https://i.pinimg.com/736x/23/37/d8/2337d80326eaad3b74a5de147f854699.jpg",
      isPlaying: false,
    };

    const fetchNowPlaying = async () => {
      const username = import.meta.env.VITE_LASTFM_USERNAME;
      const apiKey = import.meta.env.VITE_LASTFM_API_KEY;

      if (!username || !apiKey) {
        setTrack(fallbackTrack);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch listening data");
        }

        const data = await response.json();

        const trackData = data.recenttracks?.track;

        if (trackData) {
          const latestTrack = Array.isArray(trackData)
            ? trackData[0]
            : trackData;

          const artistName = latestTrack.artist["#text"];
          const trackName = latestTrack.name;
          const isPlaying = latestTrack["@attr"]?.nowplaying === "true";

          let imageUrl =
            latestTrack.image?.[3]?.["#text"] ||
            latestTrack.image?.[2]?.["#text"] ||
            "";

          if (!imageUrl && artistName && trackName) {
            try {
              const infoResponse = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(artistName)}&track=${encodeURIComponent(trackName)}&format=json`,
              );
              if (infoResponse.ok) {
                const infoData = await infoResponse.json();
                const trackAlbum = infoData.track?.album;
                if (trackAlbum && trackAlbum.image) {
                  imageUrl =
                    trackAlbum.image[3]?.["#text"] ||
                    trackAlbum.image[2]?.["#text"] ||
                    "";
                }
              }
            } catch (fallbackErr) {
              console.error(
                "Failed to fetch Last.fm fallback artwork",
                fallbackErr,
              );
            }
          }

          if (!imageUrl && artistName && trackName) {
            try {
              const cleanTrackName = trackName
                .replace(/(\(.*?\)|\[.*?\])/g, "")
                .trim();
              const cleanArtistName = artistName.split(",")[0].trim();

              const itunesResponse = await fetch(
                `https://itunes.apple.com/search?term=${encodeURIComponent(cleanArtistName + " " + cleanTrackName)}&entity=song&limit=1`,
              );
              if (itunesResponse.ok) {
                const itunesData = await itunesResponse.json();
                if (
                  itunesData.results.length > 0 &&
                  itunesData.results[0].artworkUrl100
                ) {
                  imageUrl = itunesData.results[0].artworkUrl100.replace(
                    "100x100bb",
                    "600x600bb",
                  );
                }
              }
            } catch (itunesErr) {
              console.error(
                "Failed to fetch iTunes fallback artwork",
                itunesErr,
              );
            }
          }

          setTrack({
            name: trackName,
            artist: artistName,
            album: latestTrack.album["#text"],
            url:
              latestTrack.url && !latestTrack.url.includes("userdata:")
                ? latestTrack.url
                : `https://www.last.fm/search?q=${encodeURIComponent(artistName + " " + trackName)}`,
            imageUrl: imageUrl,
            isPlaying: isPlaying,
          });
        }
      } catch (err) {
        console.error("Last.fm fetch error (showing fallback):", err);
        setTrack(fallbackTrack);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();

    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  return { track, loading };
}
