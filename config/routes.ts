export default [
    {
        path: '/',
        component: '@/main',
        routes: [
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
                        component: '@/pages/Find/index'
                    },
                    {
                        path: '/leaderboard',
                        exact: true,
                        component: '@/pages/Leaderboard/index'
                    },
                    {
                        path: '/songList',
                        exact: true,
                        component: '@/pages/SongList/index'
                    },
                    {
                        path: '/singer',
                        exact: true,
                        component: '@/pages/Singer/index'
                    },
                    {
                        path: '/songListDetail',
                        exact: true,
                        component: '@/pages/Details/SongList/index'
                    },
                    {
                        path: '/singerDetail',
                        exact: true,
                        component: '@/pages/Details/Singer/index'
                    },
                    {
                        path: '/search',
                        exact: true,
                        component: '@/pages/Search/index'
                    },
                    {
                        path: '/user',
                        exact: true,
                        wrappers: ['@/wrappers/auth'],
                        component: '@/pages/User/index'
                    },
                    {
                        component: '@/pages/NotFound/index'
                    }
                ]
            }
        ]
    }
]
