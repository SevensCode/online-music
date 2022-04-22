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
                        component: '@/pages/NotFound/index'
                    }
                ]
            }
        ]
    }
]
