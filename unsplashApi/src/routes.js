import { MainPage, PhotoPage } from './containers'

const dashboardRoutes = [
    {
        path: "main",
        layout: "/",
        namme: "Main",
        component: MainPage
    },
    { 
        path: ":id", 
        layout: "/",
        name: "Photo",
        component: PhotoPage
    },
  ];
  
  export default dashboardRoutes;
  