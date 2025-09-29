import logo from './logo.svg';
import './App.css';
import React, {Suspense,lazy} from 'react';
import {BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom';
import {Routing,lazyWithLoader} from './Routing';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// const Home = lazy(() => import ('./pages/Home'));
// //const About = lazy(() => import ('./pages/About'));
// const NotFound = lazy(() => import ('./pages/NotFound'));
// const PageLoading = lazy(() => import('./Loading/PageLoading'));
// const CRUD = lazy(() => import('./API/CRUD'));
// const FullForm = lazy(() => import('./Form/FullForm'));
// const FormikYup = lazy(() => import('./Form/FormikYup'));


//  function lazyWithLoader(importFn, delay = 300) {
//   return lazy(() => {
//     NProgress.start();

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(importFn());
//       }, delay); // Optional: simulate slow network (remove in prod)
//     }).then((module) => {
//       NProgress.done();
//       return module;
//     });
//   });
// }


// const About = lazyWithLoader(() =>
// {
//     new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(import('./pages/About'));
//       }, 2000); // ⏱️ 2-second delay
//     })
// }
// );

const About = lazyWithLoader(() => import('./pages/About'), 1000);


function App() {

  return (
    <Routing/>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
