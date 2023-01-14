import {RouteRecordRaw} from 'vue-router';
import RouteName from "@/router/RouteName";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteName.BUS_LINES,
    component: () => import('@/views/BusLines/BusLines.vue'),
  },
  {
    path: '/stops',
    name: RouteName.BUS_STOPS,
    component: () => import('@/views/BusStops/BusStops.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: RouteName.NOT_FOUND,
    redirect: {
      name: RouteName.BUS_LINES
    }
  }
];

export default routes;
