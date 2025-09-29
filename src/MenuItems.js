// src/MenuItems.js
export const getMenuItems = (navigate) => [
  {
    label: 'Login',
    icon: 'pi pi-sign-in',
    command: () => navigate('/login'),
  },
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => navigate('/'),
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    command: () => navigate('/about'),
  },
  {
    label: 'CRUD',
    icon: 'pi pi-database',
    command: () => navigate('/crud'),
  },
  {
    label: 'FullForm',
    icon: 'pi pi-file',
    command: () => navigate('/fullform'),
  },
  {
    label: 'FormikYup',
    icon: 'pi pi-check-square',
    command: () => navigate('/formikyup'),
  },
  {
    label: 'FileUpload',
    icon: 'pi pi-upload',
    command: () => navigate('/fileupload'),
  },
  {
    label: 'SimpleSlider',
    icon: 'pi pi-images',
    command: () => navigate('/simpleslider'),
  },
  {
    label: 'CalendarPage',
    icon: 'pi pi-calendar',
    command: () => navigate('/calendarpage'),
  },
  {
    label: 'Chart',
    icon: 'pi pi-chart-bar',
    command: () => navigate('/chart'),
  },
];
