import { useState } from 'react';
import { IconButton, List,ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTheme } from '@mui/material/styles';

const DrawerMenu = ({item,index}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [submenuOpen, setsubmenuOpen] = useState(false);

    const handleSubmenu = () => {
        setsubmenuOpen(!submenuOpen);
        };

    return (
        <>
            <ListItem 
                button 
                key={index}
                onClick={() => item.path ? navigate(item.path,{replace: true}) : handleSubmenu() }>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.submenu && submenuOpen
                    ? <ExpandLess/>
                    : item.submenu
                    ? <ExpandMore/>
                    : null}
            </ListItem>
            {submenuOpen && item.submenu.map((item, index) => {
                return (
                    <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem 
                            button 
                            key={index}
                            onClick={() => navigate(item.path,{replace: true})}
                            sx={{paddingLeft: theme.spacing(4)}}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    </List>
                    </Collapse>
          )})}
            
        </>
    )
}

export default DrawerMenu;