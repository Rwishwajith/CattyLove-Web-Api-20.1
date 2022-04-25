import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            style={{ borderRadius: "2em", marginTop: "1em" }}
            type="submit"
            fullWidth
            variant="outlined"
            onClick={() => loginWithRedirect({ redirectUri: "http://localhost:3000/user" })}
        >
            Sign In With Google
        </Button>
    );
};

export default LoginButton;