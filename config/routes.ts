export default [
    {
        path: '/login',
        exact: true,
        component: '@/pages/Login/index'
    },
    {
        path: '/',
        component: '@/layouts/index',
        routes: [
            {
                path: '/',
                exact: true,
                redirect: '/find'
            },
            {
                path: '/find',
                exact: true,
                component: '@/pages/Find/index'
            },
            {
                path: '/leaderboard',
                exact: true,
                component: '@/pages/Leaderboard/index'
            },
            {
                path: '/singer',
                exact: true,
                component: '@/pages/Singer/index'
            },
            {
                component: '@/pages/NotFound/index'
            }
        ]
    }
];