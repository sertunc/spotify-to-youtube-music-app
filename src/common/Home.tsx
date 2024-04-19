import { Box, Typography } from "@mui/material";

export default function Home() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px",
    backgroundColor: "#212121",
    color: "#FFFFFF",
    textAlign: "center",
  };

  const titleStyle = {
    marginBottom: "24px",
    fontWeight: "bold",
  };

  const textStyle = {
    marginBottom: "16px",
  };

  return (
    // <Box sx={containerStyle}>
    //   <Typography variant="h3" style={titleStyle}>
    //     Welcome to SpotTube!
    //   </Typography>
    //   <Typography variant="body1" style={textStyle}>
    //     Are you ready to take your music journey to the next level? SpotTube is
    //     here to elevate your music experience by seamlessly transferring your
    //     favorite Spotify playlists and tracks to YouTube Music.
    //   </Typography>
    //   <Typography variant="body1" style={textStyle}>
    //     With SpotTube, you can effortlessly migrate your curated playlists and
    //     beloved tracks from Spotify to YouTube Music with just a few clicks.
    //     Whether you're switching platforms or simply looking to explore a new
    //     realm of music discovery, SpotTube has you covered.
    //   </Typography>
    //   <Typography variant="body1" style={textStyle}>
    //     Experience the future of music migration with SpotTube today!
    //   </Typography>
    // </Box>
    <></>
  );
}
