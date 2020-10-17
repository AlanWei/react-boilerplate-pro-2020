import React, { lazy, Suspense } from 'react';

import Loading from '../../views/loading';
import NormalLayout from '../../layouts/normal';
import BasicLayout from '../../layouts/basic';

const Login = lazy(() => import('../../views/login'));
const Outlets = lazy(() => import('../../views/outlets'));

const Home = lazy(() => import('../../views/home'));
const User = lazy(() => import('../../views/user'));

const routes = [
  {
    path: '/',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
  },
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
    path: '/user',
    component: () => (
      <Suspense fallback={<Loading />}>
        <User />
      </Suspense>
    ),
  },
];

export default routes;
