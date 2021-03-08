import login from '@/pages/login'; //登录
import SettingPassword from '@/pages/login/SettingPassword'; //登录
import UpdatePass from '@/pages/login/UpdatePass'; //修改密码
// import Personal from '@/pages/login/Personal'; //个人中心

export default [{
        path: '/',
        name: 'login',
        meta: { requireAuth: false },
        component: login
    },
    {
        path: '/SettingPassword',
        name: 'SettingPassword',
        component: SettingPassword
    },
    {
        path: '/UpdatePass',
        name: 'UpdatePass',
        component: UpdatePass
    },
    // {
    //     path: '/Personal',
    //     name: 'Personal',
    //     meta: { requireAuth: false },
    //     component: Personal
    // },
]