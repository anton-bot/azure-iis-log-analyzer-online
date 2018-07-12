import Vue from 'vue';
import Router from 'vue-router';
import IisLogsAnalyzer from '@/components/IisLogsAnalyzer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IisLogsAnalyzer',
      component: IisLogsAnalyzer,
    },
  ],
});
