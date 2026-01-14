import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
    { path: '/home/map', name: 'homeMap', component: () => import('@/pages/HomeMapFullPage.vue') },
    { path: '/home/arrivals', name: 'homeArrivals', component: () => import('@/pages/HomeBusArrivalFullPage.vue') },
    { path: '/bus/search/number', name: 'busSearchNumber', component: () => import('@/pages/BusSearchNumberPage.vue') },
    { path: '/bus/search/destination', name: 'busSearchDestination', component: () => import('@/pages/BusSearchDestinationPage.vue') },
    {
      path: '/bus/search/destination/detail',
      name: 'busSearchDestinationDetail',
      component: () => import('@/pages/BusSearchDestinationDetailPage.vue')
    },
    { path: '/bus/detail', name: 'busDetail', component: () => import('@/pages/BusDetailPage.vue') },
    { path: '/destination', name: 'destinationMain', component: () => import('@/pages/DestinationSearchMainPage.vue') },
    {
      path: '/destination/busstop',
      name: 'destinationBusstopSearch',
      component: () => import('@/pages/DestinationSearchBusstopPage.vue')
    },
    {
      path: '/destination/subway',
      name: 'destinationSubwaySearch',
      component: () => import('@/pages/DestinationSearchSubwayPage.vue')
    },
    {
      path: '/destination/address',
      name: 'destinationAddressSearch',
      component: () => import('@/pages/DestinationSearchAddressPage.vue')
    },
    {
      path: '/destination/category',
      name: 'destinationCategorySearch',
      component: () => import('@/pages/DestinationSearchCategoryPage.vue')
    },
    {
      path: '/destination/direct',
      name: 'destinationDirectSearch',
      component: () => import('@/pages/DestinationSearchDirectPage.vue')
    },
    {
      path: '/destination/detail/busstop',
      name: 'destinationDetailBusstop',
      component: () => import('@/pages/DestinationDetailBusstopPage.vue')
    },
    {
      path: '/destination/detail/subway',
      name: 'destinationDetailSubway',
      component: () => import('@/pages/DestinationDetailSubwayPage.vue')
    },
    {
      path: '/destination/detail/category',
      name: 'destinationDetailCategory',
      component: () => import('@/pages/DestinationDetailCategoryPage.vue')
    },
    { path: '/routes', name: 'routeList', component: () => import('@/pages/RouteListPage.vue') },
    { path: '/routes/detail', name: 'routeDetail', component: () => import('@/pages/RouteDetailPage.vue') },
    { path: '/traffic', name: 'trafficList', component: () => import('@/pages/TrafficInfoListPage.vue') },
    { path: '/traffic/detail', name: 'trafficDetail', component: () => import('@/pages/TrafficInfoDetailPage.vue') },
    { path: '/news', name: 'newsList', component: () => import('@/pages/NewsListPage.vue') },
    { path: '/news/detail', name: 'newsDetail', component: () => import('@/pages/NewsDetailPage.vue') }
  ]
});

export default router;
