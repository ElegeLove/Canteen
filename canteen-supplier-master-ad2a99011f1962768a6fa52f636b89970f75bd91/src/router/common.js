import login from '@/pages/login'; //登录
import UpdatePass from '@/pages/login/UpdatePass'; //修改密码 
import SettingPassword from '@/pages/login/SettingPassword'; //登录
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
  }
]
