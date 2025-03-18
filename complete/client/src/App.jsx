import React, { Children } from 'react'
import RootLayout from './RootLayout'
import Home from './Home'
import Data from './Data'
import { createBrowserRouter, RouterProvider } from'react-router-dom';
function App({}) {
  const browserRouter=createBrowserRouter([
   {
    path:'',
    element:<RootLayout/>,
    children:[
      {
        path:'',
        element:<Home/>,

      },
      {
        path:'data',
        element:<Data/>,
      }
    ]

   }
  ]);
  return <RouterProvider router={browserRouter}>
    {Children}
    </RouterProvider>
}

export default App