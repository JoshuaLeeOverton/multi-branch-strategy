import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import Sidebar from './components/Sidebar';
import { APP_ROUTES } from './constants';
import { RouteConfig } from './types';

const DRAWER_WIDTH = 260;

// Recursive function to generate Route components
const renderRoutes = (routes: RouteConfig[], parentPath: string = '') => {
  return routes.map((route) => {
    // Even disabled routes might need to be defined in Router if we want to handle them (e.g. show permission denied),
    // but the requirement says "if a route is disabled dont show it". 
    // Usually, we might still want the route to theoretically exist but be hidden from UI. 
    // For this implementation, we'll exclude them from the Router entirely to be safe, 
    // or strictly follow "don't show it" (UI) vs "don't route it" (Logic).
    // Let's exclude strictly disabled routes for security/cleanliness.
    if (route.disabled) return null;

    // Construct path. Note: React Router v6 handles nested route paths automatically if nested in JSX,
    // but here we are flattening the route definition for the <Routes> block while keeping the Sidebar tree structure.
    // However, to support <Outlet/> style nesting, we would nest <Route>.
    // Given the component structure in constants.tsx doesn't explicitly use <Outlet/>, 
    // we will flatten the paths for the Router to ensure deep linking works easily.
    
    // Logic: If parentPath is '/', path is '/child'. If parentPath is '/parent', path is 'child' relative to it?
    // Actually, simply concatenating for a flat list is often easier if we don't have shared layouts per section.
    // BUT, let's try true nesting for better V6 practices.
    
    const Component = route.component;
    
    if (route.children && route.children.length > 0) {
      return (
        <Route key={route.id} path={route.path.replace(/^\//, '')} element={<Component />}>
           {/* If the parent component doesn't render an <Outlet />, these children won't show.
               However, our DynamicPage doesn't have an Outlet. 
               
               Strategy adjustment: 
               In many sidebar apps, parent items are just grouping folders or they are independent pages.
               The user config has "Strategies" (Page) -> "GitFlow" (Page).
               If we navigate to /strategies/gitflow, we want to see GitFlow content, not Strategies content wrapping GitFlow.
               
               Therefore, we will treat the config as a flat list of paths for the Router, 
               ignoring the React Router JSX nesting which requires Outlets.
           */}
           {renderRoutes(route.children, route.path)}
        </Route>
      );
    }

    return (
       <Route key={route.id} path={route.path.replace(/^\//, '')} element={<Component />} />
    );
  });
};

// Flatten routes utility for the router specifically 
// (Because our parent components in config don't have <Outlet/>, we can't strictly nest the <Route> JSX components)
const flattenRoutes = (routes: RouteConfig[], parentPath: string = ''): React.ReactElement[] => {
    let flatList: React.ReactElement[] = [];

    routes.forEach(route => {
        if (route.disabled) return;

        // Clean up paths to ensure they combine correctly
        const currentPathRaw = route.path.startsWith('/') ? route.path.substring(1) : route.path;
        const parentPathRaw = parentPath.endsWith('/') ? parentPath : `${parentPath}/`;
        
        // If it's a root level item (parentPath is empty), keep it as is.
        // If nested, combine. 
        // Note: HashRouter handles relative paths in nested <Route> well, but here we want to generate a list.
        
        // Let's use the standard "Route with children" approach but we need to ensure 
        // that if a parent is clicked, it shows its component, and if a child is clicked, it shows the child.
        // Since our parent components don't have <Outlet>, child routes MUST be defined as siblings or 
        // fully qualified paths at the top level?
        
        // Actually, React Router V6: 
        // <Route path="strategies" element={<Strategies />} /> 
        // <Route path="strategies/gitflow" element={<GitFlow />} />
        // This works perfectly fine as sibling routes.
        
        const fullPath = parentPath 
            ? `${parentPathRaw}${currentPathRaw}`.replace('//', '/')
            : route.path;

        flatList.push(
            <Route key={fullPath} path={fullPath} element={<route.component />} />
        );

        if (route.children) {
            flatList = [...flatList, ...flattenRoutes(route.children, fullPath)];
        }
    });

    return flatList;
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* Navigation Sidebar */}
        <Sidebar routes={APP_ROUTES} drawerWidth={DRAWER_WIDTH} />

        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1, p: 0, height: '100vh', overflow: 'auto', backgroundColor: '#f3f4f6' }}>
            <Toolbar /> {/* Spacer for the specific toolbar height if using fixed AppBar, though we use permanent drawer without AppBar here. 
                          However, Sidebar has a Toolbar component for title, so we might want some top padding or not. 
                          The Sidebar is 'variant=permanent' on the left.
                          Let's assume no top AppBar, just the content. */}
            
            <Routes>
                {flattenRoutes(APP_ROUTES)}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Box>
      </Box>
    </HashRouter>
  );
};

export default App;