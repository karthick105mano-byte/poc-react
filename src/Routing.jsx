import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import PrivateRoute from './PrivateRoute';
import { Toaster, toast } from 'react-hot-toast';

NProgress.configure({ showSpinner: false });

// Lazy-loaded components
const Login = lazyWithLoader(() => import('./pages/LoginPage'));
const Logout = lazyWithLoader(() => import('./pages/LogoutPage'));
const Home = lazyWithLoader(() => import('./pages/Home'));
const About = lazyWithLoader(() => import('./pages/About'), 1000);
const CRUD = lazyWithLoader(() => import('./pages/CRUD'));
const Chart = lazyWithLoader(() => import('./pages/Chart'));
const FullForm = lazyWithLoader(() => import('./Form/FullForm'));
const FormikYup = lazyWithLoader(() => import('./Form/FormikYup'));
const FileUpload = lazyWithLoader(() => import('./Form/FileUpload'));
const SimpleSlider = lazyWithLoader(() => import('./pages/SimpleSlider'));
const CalendarPage = lazyWithLoader(() => import('./pages/CalendarPage'));
const NotFound = lazyWithLoader(() => import('./pages/NotFound'));
const Newsletter = lazyWithLoader(() => import('./pages/Newsletter.tsx'));
const Popup = lazyWithLoader(() => import('./pages/Popup.jsx'));

const PageLoading = () => <div>Loading...</div>;

export function lazyWithLoader(importFn, delay = 300) {
  return lazy(() => {
    NProgress.start();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(importFn());
      }, delay);
    }).then((module) => {
      NProgress.done();
      return module;
    });
  });
}

function AppWithMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Show toast whenever the route changes
  useEffect(() => {
    toast.success(`Navigated to ${location.pathname}`);
  }, [location.pathname]);

  const menuItems = [
    { label: 'Login', icon: 'pi pi-sign-in', command: () => navigate('/login') },
    { label: 'Home', icon: 'pi pi-home', command: () => navigate('/') },
    { label: 'About', icon: 'pi pi-info-circle', command: () => navigate('/about') },
    { label: 'CRUD', icon: 'pi pi-database', command: () => navigate('/crud') },
    { label: 'FullForm', icon: 'pi pi-file', command: () => navigate('/fullform') },
    { label: 'FormikYup', icon: 'pi pi-check-square', command: () => navigate('/formikyup') },
    { label: 'FileUpload', icon: 'pi pi-upload', command: () => navigate('/fileupload') },
    { label: 'SimpleSlider', icon: 'pi pi-images', command: () => navigate('/simpleslider') },
    { label: 'Calendar', icon: 'pi pi-calendar', command: () => navigate('/calendarpage') },
    { label: 'Chart', icon: 'pi pi-chart-bar', command: () => navigate('/chart') },
    { label: 'Newsletter', icon: 'pi pi-chart-bar', command: () => navigate('/newsletter') },
    { label: 'Popup', icon: 'pi pi-chart-bar', command: () => navigate('/popup') },
  ];

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/logout');
  };

  return (
    <>
      <Menubar model={menuItems} end={<Logout />} />

      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/crud" element={<PrivateRoute><CRUD /></PrivateRoute>} />
          <Route path="/fullform" element={<FullForm />} />
          <Route path="/formikyup" element={<FormikYup />} />
          <Route path="/fileupload" element={<PrivateRoute><FileUpload /></PrivateRoute>} />
          <Route path="/simpleslider" element={<SimpleSlider />} />
          <Route path="/calendarpage" element={<CalendarPage />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/popup" element={<Popup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* ✅ Toast container */}
      <Toaster position="top-right" />
    </>
  );
}

export function Routing() {
  return (
    <Router>
      <AppWithMenu />
    </Router>
  );
}
