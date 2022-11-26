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
import ViewListIcon from '@mui/icons-material/ViewList';
import { DashboardSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 260;

export default function MyDrawer() {
  const navigate = useNavigate()
  const [menuItems, setMenuItems] = useState([
    {
      name: "Dashboard",
      path: "/",
      icon: <DashboardSharp />,
      subMenu: [
      ],
      isOpen: false,
    },
    {
      name: "Categories",
      path: null,
      subMenu: [
        { name: "Add a category", path: "/addCarCategory", icon: <AddIcon /> },
        { name: "View categories", path: "/viewCarCategories", icon:<ViewListIcon /> },
      ],
      isOpen: false,
      icon: <CategoryIcon />
    },
    {
      name: "Cars",
      path: null,
      subMenu: [
        { name: "Add a car", path: "/addCar", icon: <AddIcon /> },
        { name: "View cars", path: "/viewCars", icon:<ViewListIcon /> },
      ],
      isOpen: false,
      icon: <TimeToLeaveIcon />
    },
  ])
  const onClickListMenuItem = (index) => {
    const items = menuItems
    const item = items[index]
    if(item.path){
      navigate(item.path)
    }
    items[index].isOpen = !items[index].isOpen
    setMenuItems([...items])
  }
  const onClickListSubMenuItem = (itemIndex, subItemIndex) => {
    const subMenuItem = menuItems[itemIndex].subMenu[subItemIndex]
    if(subMenuItem.path){
      navigate(subMenuItem.path)
    }
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
          <div key={index + item.name}>
            <ListItem key={index + item.name} disablePadding>
              <ListItemButton onClick={()=>onClickListMenuItem(index)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={index+1 + ". " +item.name} />
                {item.subMenu.length > 0 && (item.isOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            <Collapse in={item.isOpen} timeout="auto" unmountOnExit>
              {item.subMenu.map((subItem, i) => (
                <List key={i + subItem.name} component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={()=>onClickListSubMenuItem(index, i)}>
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