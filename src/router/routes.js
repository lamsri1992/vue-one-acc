import Dashboard from "../pages/Dashboard.vue"
import List from "../pages/list/List.vue"
import ListCreate from "../pages/list/ListCreate.vue"
import ListView from "../pages/list/ListView.vue"
import NotFoundPage from "../pages/NotFoundPage.vue"
import Login from "../components/Login.vue"
import AccList from "../pages/setting/AccList.vue"
import SubList from "../pages/setting/SubList.vue"
import CreditorList from "../pages/setting/CreditorList.vue"

const routes = [
    {
        path: "/",
        component: Dashboard,
        name: 'dashboard',
        meta: {
            auth: true,
            layout : 'DefaultLayout'
        },
    },
    {
        path: '/list',
        component: List,
        name: 'list',
        meta: {
            auth: true,
        },
    },
    {
        path: '/list/create',
        component: ListCreate,
        name: 'listCreate',
        meta: {
            auth: true,
        },
    },
    {
        path: '/list/:id',
        component: ListView,
        name: 'listView',
        params: true,
        meta: {
            auth: true,
        },
    },
    {
        path: '/setting/creditorlist',
        component: CreditorList,
        name: 'creditorlist',
        meta: {
            auth: true,
        },
    },
    {
        path: '/setting/acclist',
        component: AccList,
        name: 'acclist',
        meta: {
            auth: true,
        },
    },
    {
        path: '/setting/sublist',
        component: SubList,
        name: 'sublist',
        meta: {
            auth: true,
        },
    },
    // AUTH FUNCTION
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
          guest: true,
        },
    },
    {
        path: '/:notFound(.*)',
        name: 'eror.404',
        component: NotFoundPage
    }
]

export default routes;