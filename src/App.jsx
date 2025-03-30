
import './App.css'
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NavBar from './Componenets/NavBar';
import Home from './Componenets/Home';
import Notes from './Componenets/Notes';
import ViewNote from './Componenets/ViewNote';
import Share from './Componenets/share';

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <NavBar/>
        <Home/>
      </div>
    },
    {
      path:"/notes",
      element:
      <div>
      <NavBar/>
      <Notes/>
    </div>
    },
    {
      path:"/notes/:id",
      element:
      <div>
      <NavBar/>
      <ViewNote/>
    </div>
    },
      {
        path:"/share/:id",
        element:
        <div>
        {/* <Notes/> */}
        <Share/>
      </div>
    }
  ]
);
function App() {

  return (
   <div>
   <RouterProvider router={router} />
   </div>
  )
}

export default App
