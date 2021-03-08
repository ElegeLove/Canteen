import login from '@/pages/login'; //登录
import SettingPassword from '@/pages/login/SettingPassword'; //登录
import UpdatePass from '@/pages/login/UpdatePass'; //修改密码
import EmptyPage from '@/pages/EmptyPage'; //404
export default [
  {
    path: '/',
    name: 'login',
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
  {
    path: '/error',
    name: 'EmptyPage',
    component: EmptyPage
  }
]
