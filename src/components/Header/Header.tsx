import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { signIn, signOut, useSession } from "next-auth/react";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { useMediaQuery } from "@mui/material";

export type HeaderProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
};

const Header = (props: HeaderProps) => {
  const { ColorModeContext } = props;
  const { data: session } = useSession();
  const userProfileImg = session?.user?.image as string;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const tabletCheck = useMediaQuery("(min-width: 768px)");

  return (
    <AppBar position="static" sx={{ marginBottom: "40px" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <PriceCheckIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
        >
          PayChecked
        </Typography>

        {tabletCheck && (
          <Box sx={{ paddingRight: 5 }}>
            <Typography>Signed in as {session?.user?.email}</Typography>
          </Box>
        )}
        <ThemeToggleButton ColorModeContext={ColorModeContext} />
        <Tooltip title="Sign out">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={session?.user?.name as string} src={userProfileImg} />
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={() => (session ? signOut() : signIn())}>
            <Typography textAlign="center">
              {session ? "Logout" : "Login"}
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
