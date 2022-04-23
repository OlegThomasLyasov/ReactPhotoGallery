import {PHOTOGALLERY_ROUTE, PHOTO_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE} from "./utils/consts"
import Auth from "./pages/Auth"
import Photogallery from "./pages/photoGallery"
import PhotoPage from "./pages/photoPage"
import Admin from "./pages/Admin"

export const authRouters = [
    {
        path: PHOTO_ROUTE + '/:id',
        Component: PhotoPage
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: PHOTOGALLERY_ROUTE,
        Component:Photogallery
    },
   
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component:Auth
    },
    {
        path: PHOTOGALLERY_ROUTE,
        Component:Photogallery
    },
       
    {
        path: REGISTRATION_ROUTE,
        Component:Auth
    }, 

]
