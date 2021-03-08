import t_LiveBroadcast from '@/pages/BrightKitchen/LiveBroadcast';         //实时直播
import t_MonitoringPanel from '@/pages/BrightKitchen/MonitoringPanel';         //监控面板
import t_Playback from '@/pages/BrightKitchen/MonitoringPanel/playback';         //监控面板-回放
import t_Panel from '@/pages/BrightKitchen/MonitoringPanel/panel';         //监控面板 -面板
export default [
  {
    path: 't_LiveBroadcast',
    name: 't_LiveBroadcast',
    component: t_LiveBroadcast,
    meta: {
      requireAuth: true,
      relation:"t_LiveBroadcast"
    }
  },
  {
    path: 't_MonitoringPanel',
    name: 't_MonitoringPanel',
    component: t_MonitoringPanel,
    redirect: "/ManagementPanel/t_MonitoringPanel/t_Panel",
    children:[
      {
        path: 't_Panel',
        name: 't_Panel',
        component: t_Panel,
        meta: {
          requireAuth: true,
          relation:"t_MonitoringPanel"
        }
      },
      {
        path: 't_Playback',
        name: 't_Playback',
        component: t_Playback,
        meta: {
          requireAuth: true,
          relation:"t_MonitoringPanel"
        }
      },
    ]
  },
]
