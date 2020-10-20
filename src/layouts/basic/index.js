import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { Dropdown, Avatar, Menu, Popover } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';

import logo from '../../assets/logo.svg';
import './styles.scss';

const PREFIX_CLS = 'layout-basic';
const BASE_URL = '/';

const BasicLayout = () => {
  const { t } = useTranslation();
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

  const renderSiderBody = () => {};

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
        {/* logout */}
        <div role="presentation">
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

  const renderContent = () => {
    return <div className={`${PREFIX_CLS}-content`}>{renderHeader()}</div>;
  };

  return (
    <div className={PREFIX_CLS}>
      {renderSider()}
      {renderContent()}
    </div>
  );
};

export default BasicLayout;
