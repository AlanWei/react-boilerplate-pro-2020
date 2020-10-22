import React from 'react';
import {
  DashboardOutlined,
  ShopOutlined,
  TableOutlined,
} from '@ant-design/icons';

const menuData = [
  {
    name: 'siderMenu_dashboard',
    icon: <DashboardOutlined />,
    path: 'dashboard',
    children: [
      {
        name: 'siderMenu_analysis',
        path: 'analysis',
        children: [
          {
            name: 'siderMenu_realtime',
            path: 'realtime',
          },
          {
            name: 'siderMenu_offline',
            path: 'offline',
          },
        ],
      },
      {
        name: 'siderMenu_workplace',
        path: 'workplace',
      },
    ],
  },
  {
    name: 'siderMenu_outlets',
    icon: <ShopOutlined />,
    path: 'outlets',
  },
  {
    name: 'siderMenu_exception',
    icon: <TableOutlined />,
    path: 'exception',
    children: [
      {
        name: 'siderMenu_403',
        path: '403',
      },
      {
        name: 'siderMenu_404',
        path: '404',
      },
    ],
  },
];

export default menuData;
