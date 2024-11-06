import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Collapse,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookIcon from '@mui/icons-material/Book';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function MenuLateral() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const nomeUsuario = localStorage.getItem('nome');
  const emailUsuario = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    navigate('/login');
    window.location.reload();
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Ícone para alternar o menu */}
      <IconButton onClick={toggleDrawer} sx={{ marginLeft: 1, position: 'fixed', top: 16 }}>
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          transition: 'width 0.3s',
          [`& .MuiDrawer-paper`]: {
            width: open ? 240 : 60,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <IconButton>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          {open && (
            <Box sx={{ ml: 2 }}>
              <strong>{nomeUsuario}</strong>
              <p>{emailUsuario}</p>
            </Box>
          )}
        </Box>
        <Divider />
        <List>
          <ListItem button={true} onClick={() => navigate('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItem>

          <ListItem button={true} onClick={toggleExpand}>
            <ListItemIcon>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemIcon>
            {open && <ListItemText primary="Cadastros" />}
          </ListItem>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button={true} onClick={() => navigate('/creditos')}>
                <ListItemIcon>
                  <CreditCardIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Créditos" />}
              </ListItem>
              <ListItem button={true} onClick={() => navigate('/debitos')}>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Débitos" />}
              </ListItem>
              <ListItem button={true} onClick={() => navigate('/reservas')}>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Reservas" />}
              </ListItem>
            </List>
          </Collapse>

          <Divider />
          <ListItem button={true} onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default MenuLateral;
