import React, { lazy, Suspense } from 'react';

import Loading from '../../views/loading';
import NormalLayout from '../../layouts/normal';
import BasicLayout from '../../layouts/basic';

const Login = lazy(() => import('../../views/login'));
const Outlets = lazy(() => import('../../views/outlets'));

const routes = [
  {
    path: '/login',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <NormalLayout>
          <Login />
        </NormalLayout>
      </Suspense>
    ),
  },
  {
    path: '/outlets',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <BasicLayout>
          <Outlets />
        </BasicLayout>
      </Suspense>
    ),
  },
  {
    component: () => (
      <BasicLayout>
        <div>404</div>
      </BasicLayout>
    ),
  },
];

export default routes;
