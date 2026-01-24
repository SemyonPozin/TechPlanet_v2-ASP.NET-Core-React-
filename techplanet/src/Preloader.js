import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export default function Preloader({ width, height}){

    return (
        <Box
          sx={{
            display: "flex",
            width: width,
            height: height,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
    )
}