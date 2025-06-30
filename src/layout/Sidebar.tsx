import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { t } from "i18next";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}

const Sidebar = ({
  mobileOpen,
  handleDrawerToggle,
  isMobile,
}: SidebarProps) => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/home"
            selected={location.pathname === "/home"}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t('Layout.home')} />
          </ListItemButton>
        </ListItem>

        {isAdmin && (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/admin/admin-panel"
                selected={location.pathname === "/admin/admin-panel"}
              >
                <ListItemIcon>
                  <AdminPanelSettingsIcon/>
                </ListItemIcon>
                <ListItemText primary={t('Layout.admin')} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/admin/user-management"
                selected={location.pathname === "/admin/user-management"}
              >
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary={t('Layout.users')} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <>
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
