import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { Dropdown, Avatar, Menu, Popover } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
import menuData from '../../app/init/menus';
import { loginSlice } from '../../views/login/loginSlice';
import { formatMenuPath, formatSelectedKeys } from './menuUtils';

import logo from '../../assets/logo.svg';
import './styles.scss';

const { SubMenu } = Menu;

const PREFIX_CLS = 'layout-basic';
const BASE_URL = '/';

const BasicLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // pathname
  const pathname = useSelector((state) => {
    return state.router.location.pathname;
  });

  const selectedKeys = formatSelectedKeys(formatMenuPath(menuData), pathname);

  const [openKeys, setOpenKeys] = useState(selectedKeys);

  // TODO: fetch notices
  const notices = [];

  const renderSiderHeader = () => (
    <Link to={BASE_URL} href={BASE_URL}>
      <div className={`${PREFIX_CLS}-sider-header`}>
        <img className={`${PREFIX_CLS}-sider-logo`} src={logo} alt="logo" />
        <div className={`${PREFIX_CLS}-sider-appName`}>{t('appName')}</div>
      </div>
    </Link>
  );

  const renderMenu = (data) => {
    const title = (item) => (
      <span>
        <span>{item.icon ? item.icon : null}</span>
        <span>{t(item.name)}</span>
      </span>
    );

    return map(data, (item) => {
      if (item.children) {
        return (
          <SubMenu key={item.path} title={title(item)}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path} href={item.path}>
            {title(item)}
          </Link>
        </Menu.Item>
      );
    });
  };

  const renderSiderBody = () => {
    return (
      <div className={`${PREFIX_CLS}-sider-body`}>
        <Menu
          style={{ padding: '16px 0', width: '100%' }}
          mode="inline"
          theme="dark"
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          selectedKeys={selectedKeys}
        >
          {renderMenu(formatMenuPath(menuData))}
        </Menu>
      </div>
    );
  };

  const renderSider = () => {
    return (
      <div className={`${PREFIX_CLS}-sider`}>
        {renderSiderHeader()}
        {renderSiderBody()}
      </div>
    );
  };

  const noticeMenu = isEmpty(notices) ? (
    <div className={`${PREFIX_CLS}-noticeEmpty`}>
      {t('basicLayout_readall_notice')}
    </div>
  ) : (
    map(notices, (notice) => (
      <div
        key={notice.id}
        className={`${PREFIX_CLS}-noticeItem`}
        // onClick={() => deleteNotice(notice.id)}
        role="presentation"
      >
        <div className={`${PREFIX_CLS}-noticeTitle`}>{notice.title}</div>
        <div className={`${PREFIX_CLS}-noticeMessage`}>{notice.message}</div>
      </div>
    ))
  );

  const handleLogout = () => {
    dispatch(loginSlice.actions.logoutUser());
  };

  const userMenu = (
    <Menu>
      <Menu.Item disabled className={`${PREFIX_CLS}-userMenuItem`}>
        <div>
          <UserOutlined className={`${PREFIX_CLS}-userMenuIcon`} />
          <span>{t('basicLayout_profile')}</span>
        </div>
      </Menu.Item>
      <Menu.Item disabled className={`${PREFIX_CLS}-userMenuItem`}>
        <div>
          <SettingOutlined className={`${PREFIX_CLS}-userMenuIcon`} />
          <span>{t('basicLayout_setting')}</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className={`${PREFIX_CLS}-userMenuItem`}>
        <div role="presentation" onClick={handleLogout}>
          <LogoutOutlined className={`${PREFIX_CLS}-userMenuIcon`} />
          <span>{t('basicLayout_logout')}</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  const renderHeader = () => {
    return (
      <div className={`${PREFIX_CLS}-header`}>
        <div className={`${PREFIX_CLS}-notice`}>
          <Popover
            placement="bottomRight"
            arrowPointAtCenter
            trigger="click"
            content={noticeMenu}
          >
            <BellOutlined className={`${PREFIX_CLS}-noticeIcon`} />
          </Popover>
        </div>
        <Dropdown overlay={userMenu} placement="bottomRight">
          <div className={`${PREFIX_CLS}-avatarContainer`}>
            {/* fetch user name */}
            <Avatar className={`${PREFIX_CLS}-avatar`}>A</Avatar>
          </div>
        </Dropdown>
      </div>
    );
  };

  const renderPageContent = () => {
    return <div className={`${PREFIX_CLS}-mainContent`}>{children}</div>;
  };

  const renderContent = () => {
    return (
      <div className={`${PREFIX_CLS}-content`}>
        {renderHeader()}
        {renderPageContent()}
      </div>
    );
  };

  return (
    <div className={PREFIX_CLS}>
      {renderSider()}
      {renderContent()}
    </div>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
