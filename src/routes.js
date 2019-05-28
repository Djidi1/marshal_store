import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import DynamicRoutePage from './components/pages/DynamicRoutePage';
import NotFoundPage from './components/pages/NotFoundPage';
import NewCarPage from "./components/pages/NewCarPage";
import NewResponsePage from "./components/pages/NewResponsePage";
import ResponsesPage from "./components/pages/ResponsesPage";
import ResponsePage from "./components/pages/ResponsePage";
import StoresList from "./components/pages/StoresList";
import LoginPage from "./components/pages/LoginPage";
import EditUserPage from "./components/pages/EditUserPage";
import RegisterUserPage from "./components/pages/RegisterUserPage";
import EditStorePage from "./components/pages/EditStorePage";

export default [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/about/',
        component: AboutPage,
    },
    {
        path: '/login/',
        component: LoginPage,
    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage,
    },
    {
        path: '/response_to_request/:reqId/',
        component: NewResponsePage,
    },
    {
        path: '/open_car/:carId/',
        component: NewCarPage,
    },
    {
        path: '/requests/:reqId/',
        component: ResponsesPage,
    },
    {
        path: '/requests/response/:reqId/',
        component: ResponsePage,
    },
    {
        path: '/stores_list/',
        component: StoresList,
    },
    {
        path: '/edit_user/',
        component: EditUserPage,
    },
    {
        path: '/register_user/',
        component: RegisterUserPage,
    },
    {
        path: '/edit_store/:storeId/',
        component: EditStorePage,
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];
