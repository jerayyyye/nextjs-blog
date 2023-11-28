import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@mui/material/Button";


const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (null);
  }
  return (
    <>
      <Button variant={"contained"} color={"success"} onClick={() => signIn()}>
        Log in
      </Button>
    </>
  );
};

export default Login;