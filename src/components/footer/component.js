import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
export default function Footer() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{
        mt: 8,
        mb: 1,
        position: "fixed",
        bottom: 0,
        textAlign: "right",
        right: 50,
        width: "100%",
      }}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://muhammadameen252.github.io/My-Portfolio/"
      >
        Muhammad Ameen
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
