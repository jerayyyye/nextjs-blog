import React from "react";
import Login from "@/components/Login";
import About from "@/components/About"; 
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";

const SignIn = () => {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <About /> 
      <h2>{session ? null : null}</h2>
      <Login />
    </Box>
  );
};

export default SignIn;
