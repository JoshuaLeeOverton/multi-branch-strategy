import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Toolbar,
  Typography
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { RouteConfig } from '../types';

interface SidebarProps {
  routes: RouteConfig[];
  drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ routes, drawerWidth }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to check if a route is active
  const isRouteActive = (routePath: string, isParent: boolean = false) => {
    // Basic active check. For parents, we might want to check if the current pathname starts with the parent path
    if (routePath === '/') return location.pathname === '/';
    // Remove trailing slash for comparison
    const cleanPath = routePath.replace(/\/$/, '');
    const cleanLocation = location.pathname.replace(/\/$/, '');
    
    if (isParent) {
        return cleanLocation.startsWith(cleanPath);
    }
    return cleanLocation === cleanPath;
  };

  // Recursive component to render menu items
  const MenuItem: React.FC<{ item: RouteConfig; parentPath: string }> = ({ item, parentPath }) => {
    if (item.disabled) return null;

    // Resolve full path. If item.path is absolute, use it, else append to parent
    const fullPath = item.path.startsWith('/') 
      ? item.path 
      : `${parentPath.replace(/\/$/, '')}/${item.path}`;

    const hasChildren = item.children && item.children.some(child => !child.disabled);
    
    // Manage open state for nested items
    // Initialize open if current location is within this item's tree
    const [open, setOpen] = useState(() => isRouteActive(fullPath, true));

    // Effect to auto-expand parent when child is visited directly via URL
    useEffect(() => {
        if (hasChildren && isRouteActive(fullPath, true)) {
            setOpen(true);
        }
    }, [location.pathname, fullPath, hasChildren]);

    const handleClick = () => {
      if (hasChildren) {
        setOpen(!open);
      } else {
        navigate(fullPath);
      }
    };

    const isActive = !hasChildren && isRouteActive(fullPath);
    const Icon = item.icon;

    return (
      <>
        <ListItemButton 
          onClick={handleClick}
          selected={isActive}
          sx={{
            pl: parentPath === '/' ? 2 : 4, // Indent based on nesting (simplified for 1 level deep, can be prop-driven for deeper)
            '&.Mui-selected': {
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRight: '3px solid #3b82f6',
              '&:hover': {
                 backgroundColor: 'rgba(59, 130, 246, 0.2)',
              }
            }
          }}
        >
          {Icon && (
            <ListItemIcon sx={{ minWidth: 40, color: isActive ? '#3b82f6' : 'inherit' }}>
              <Icon fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText 
            primary={item.title} 
            primaryTypographyProps={{ 
                fontSize: '0.9rem', 
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#1d4ed8' : 'inherit'
            }} 
          />
          {hasChildren ? (open ? <ExpandLess /> : <ExpandMore />) : null}
        </ListItemButton>
        
        {hasChildren && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map((child) => (
                <MenuItem key={child.id} item={child} parentPath={fullPath} />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', borderRight: '1px solid #e5e7eb' },
      }}
    >
      <Toolbar className="bg-slate-900 text-white shadow-md">
        <Typography variant="h6" noWrap component="div" sx={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.05em' }}>
          STRATEGY MGR
        </Typography>
      </Toolbar>
      <div className="overflow-auto bg-slate-50 h-full">
        <List component="nav" className="pt-2">
          {routes.map((route) => (
            <MenuItem key={route.id} item={route} parentPath="/" />
          ))}
        </List>
      </div>
      <Divider />
      <div className="p-4 text-xs text-center text-gray-400">
        v1.0.0 Beta
      </div>
    </Drawer>
  );
};

export default Sidebar;
