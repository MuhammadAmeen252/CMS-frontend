import * as React from "react";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useTheme } from "@mui/material/styles";

const drawerWidth = 260;

export default function MyDrawer() {
    const theme = useTheme()
  const [menuItems, setMenuItems] = useState([
    {
      name: "Categories",
      path: "/",
      subMenu: [
        { name: "Add category", path: "/", icon: <AddIcon /> },
        { name: "Update category", path: "/", icon: <UpdateIcon /> },
        { name: "Delete category", path: "/", icon: <DeleteSweepIcon /> },
        { name: "View categories", path: "/", icon:<ViewListIcon /> },
      ],
      isOpen: false,
      icon: <CategoryIcon />
    },
    {
      name: "cars",
      path: "/",
      subMenu: [
        { name: "Add car", path: "/", icon: <AddIcon /> },
        { name: "Update car", path: "/", icon: <UpdateIcon /> },
        { name: "Delete car", path: "/" , icon: <DeleteSweepIcon /> },
        { name: "View cars", path: "/", icon:<ViewListIcon /> },
      ],
      isOpen: false,
      icon: <TimeToLeaveIcon />
      
    },
  ])
  const onClickListItem = (index) => {
    const items = menuItems
    items[index].isOpen = !items[index].isOpen
    console.log("menu items", items)
    setMenuItems([...items])
  }
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          mt: { xs: 8.5 },
        //   pl:{xs:theme.screenPadding - 45.4}
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <div>
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={()=>onClickListItem(index)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {item.isOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={item.isOpen} timeout="auto" unmountOnExit>
              {item.subMenu.map((subItem) => (
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>{subItem.icon}</ListItemIcon>
                    <ListItemText primary={subItem.name} />
                  </ListItemButton>
                </List>
              ))}
            </Collapse>
          </div>
        ))}
      </List>
    </Drawer>
  );
}
