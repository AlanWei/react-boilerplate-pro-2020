import React, { lazy, Suspense } from 'react';

import Loading from '../../views/loading';

const Login = lazy(() => import('../../views/login'));
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
        <Login />
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
