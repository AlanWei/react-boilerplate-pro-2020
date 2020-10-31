import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router-dom';

import Loading from '../../views/loading';
import NormalLayout from '../../layouts/normal';
import BasicLayout from '../../layouts/basic';

const Login = lazy(() => import('../../views/login'));
const WIP = lazy(() => import('../../views/workingInProgress'));
const Outlets = lazy(() => import('../../views/outlets'));
const OutletDetail = lazy(() => import('../../views/outletDetail'));
const Unauthorised = lazy(() => import('../../views/unauthorised'));
const NotFound = lazy(() => import('../../views/notFound'));

const USER_LEVEL_PERMISSION = ['god', 'admin', 'user'];
const ADMIN_LEVEL_PERMISSION = ['god', 'admin'];
const GOD_LEVEL_PERMISSION = ['god'];

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard/analysis/realtime" />,
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
    path: '/dashboard/analysis/realtime',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <BasicLayout permissionList={USER_LEVEL_PERMISSION}>
          <WIP />
        </BasicLayout>
      </Suspense>
    ),
  },
  {
    path: '/dashboard/analysis/offline',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <BasicLayout permissionList={ADMIN_LEVEL_PERMISSION}>
          <WIP />
        </BasicLayout>
      </Suspense>
    ),
  },
  {
    path: '/dashboard/workplace',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <BasicLayout permissionList={GOD_LEVEL_PERMISSION}>
          <WIP />
        </BasicLayout>
      </Suspense>
    ),
  },
  {
    path: '/outlets',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <BasicLayout
          pageTitle="pageTitle_outlets"
          breadcrumb={['/', '/outlets']}
          permissionList={USER_LEVEL_PERMISSION}
        >
          <Outlets />
        </BasicLayout>
      </Suspense>
    ),
  },
  {
    path: '/outlets/:id',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <BasicLayout
          pageTitle="pageTitle_outletDetail"
          breadcrumb={['/', '/outlets', '/outlets/:id']}
          permissionList={USER_LEVEL_PERMISSION}
        >
          <OutletDetail />
        </BasicLayout>
      </Suspense>
    ),
  },
  {
    path: '/exception/403',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <BasicLayout>
          <Unauthorised />
        </BasicLayout>
      </Suspense>
    ),
  },
  {
    component: () => (
      <Suspense fallback={<Loading />}>
        <BasicLayout>
          <NotFound />
        </BasicLayout>
      </Suspense>
    ),
  },
];

export default routes;
