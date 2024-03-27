import Dashboard from "../pages/Dashboard.vue"
import List from "../pages/list/List.vue"
import ListFinance from "../pages/list/ListFinance.vue"
import ListCreate from "../pages/list/ListCreate.vue"
import ListView from "../pages/list/ListView.vue"
import ListFinanceView from "../pages/list/ListFinanceView.vue"
import NotFoundPage from "../pages/NotFoundPage.vue"
import Login from "../components/Login.vue"
import Department from "../pages/setting/Department.vue"
import UserMan from "../pages/setting/UserMan.vue"
import AccList from "../pages/setting/AccList.vue"
import SubList from "../pages/setting/SubList.vue"
import CreditorList from "../pages/setting/CreditorList.vue"
import Report from "../pages/list/Report.vue"

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
        path: '/finance/list',
        component: ListFinance,
        name: 'listFinance',
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
        path: '/finance/list/:id',
        component: ListFinanceView,
        name: 'listFinanceView',
        params: true,
        meta: {
            auth: true,
        },
    },
    {
        path: '/report',
        component: Report,
        name: 'report',
        meta: {
            auth: true,
        },
    },
    // Admin Mode
    {
        path: '/setting/department',
        component: Department,
        name: 'department',
        meta: {
            auth: true,
        },
    },
    {
        path: '/setting/usermanage',
        component: UserMan,
        name: 'usermanage',
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