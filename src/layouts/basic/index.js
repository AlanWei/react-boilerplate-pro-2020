import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { Dropdown, Avatar, Menu, Popover, Badge, Breadcrumb } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  DeleteOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import i18n from '../../i18n';
import menuData from '../../app/init/menus';
import Notification from '../../components/notification';
import {
  appSlice,
  getNotices,
  deleteNotice,
  selectNotices,
  selectNotificationTitle,
  selectNotificationContent,
} from '../../app/init/appSlice';
import {
  loginSlice,
  selectIsLogin,
  selectUser,
} from '../../views/login/loginSlice';
import {
  formatMenuPath,
  formatSelectedKeys,
  generateBreadcrumb,
} from './menuUtils';
import checkPermissions from './permissionUtils';

import logo from '../../assets/logo.svg';
import './styles.scss';

const { SubMenu } = Menu;

const PREFIX_CLS = 'layout-basic';
const BASE_URL = '/';

const BasicLayout = ({ pageTitle, breadcrumb, permissionList, children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  // check login
  const isLogin = useSelector(selectIsLogin);
  const user = useSelector(selectUser);
  const notices = useSelector(selectNotices);
  const notificationTitle = useSelector(selectNotificationTitle);
  const notificationContent = useSelector(selectNotificationContent);

  useEffect(() => {
    if (isLogin) {
      // fetch notices
      dispatch(getNotices());
      // check permission
      const { authorities } = user;
      const hasPermission = checkPermissions(authorities, permissionList);
      if (!hasPermission) {
        dispatch(push('/exception/403'));
      }
    } else {
      dispatch(push('/login'));
    }
  }, [isLogin, dispatch, permissionList, user]);

  // pathname
  const pathname = useSelector((state) => {
    return state.router.location.pathname;
  });

  const selectedKeys = formatSelectedKeys(formatMenuPath(menuData), pathname);

  const [openKeys, setOpenKeys] = useState(selectedKeys);

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

  const handleDeleteNotice = (id) =>
    dispatch(deleteNotice(id)).then(() => {
      dispatch(getNotices());
    });

  const noticeMenu = isEmpty(notices) ? (
    <div className={`${PREFIX_CLS}-noticeEmpty`}>
      {t('basicLayout_readall_notice')}
    </div>
  ) : (
    map(notices, (notice) => (
      <div
        key={notice.id}
        className={`${PREFIX_CLS}-noticeItem`}
        role="presentation"
      >
        <div className={`${PREFIX_CLS}-noticeTitle`}>
          <div>{notice.title}</div>
          <DeleteOutlined onClick={() => handleDeleteNotice(notice.id)} />
        </div>
        <div className={`${PREFIX_CLS}-noticeMessage`}>{notice.message}</div>
      </div>
    ))
  );

  const handleLogout = () => {
    dispatch(loginSlice.actions.logoutUser());
  };

  const userMenu = (
    <Menu>
      <Menu.Item disabled className={`${PREFIX_CLS}-header-menuItem`}>
        <div>
          <UserOutlined className={`${PREFIX_CLS}-header-menuIcon`} />
          <span>{t('basicLayout_profile')}</span>
        </div>
      </Menu.Item>
      <Menu.Item disabled className={`${PREFIX_CLS}-header-menuItem`}>
        <div>
          <SettingOutlined className={`${PREFIX_CLS}-header-menuIcon`} />
          <span>{t('basicLayout_setting')}</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className={`${PREFIX_CLS}-header-menuItem`}>
        <div role="presentation" onClick={handleLogout}>
          <LogoutOutlined className={`${PREFIX_CLS}-header-menuIcon`} />
          <span>{t('basicLayout_logout')}</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  const intlMenu = (
    <Menu>
      <Menu.Item
        className={clsx({
          [`${PREFIX_CLS}-header-menuItem`]: true,
          [`${PREFIX_CLS}-header-menuItem-active`]: currentLanguage === 'en',
        })}
        onClick={() => i18n.changeLanguage('en')}
      >
        {t('english')}
      </Menu.Item>
      <Menu.Item
        className={clsx({
          [`${PREFIX_CLS}-header-menuItem`]: true,
          [`${PREFIX_CLS}-header-menuItem-active`]: currentLanguage === 'zh',
        })}
        onClick={() => i18n.changeLanguage('zh')}
      >
        {t('chinese')}
      </Menu.Item>
    </Menu>
  );

  const renderHeader = () => {
    return (
      <div className={`${PREFIX_CLS}-header`}>
        <Popover
          placement="bottomRight"
          arrowPointAtCenter
          trigger="click"
          content={noticeMenu}
        >
          <div className={`${PREFIX_CLS}-notice`}>
            <Badge count={notices.length}>
              <BellOutlined className={`${PREFIX_CLS}-header-icon`} />
            </Badge>
          </div>
        </Popover>

        <Dropdown overlay={userMenu} placement="bottomRight">
          <div className={`${PREFIX_CLS}-avatarContainer`}>
            <Avatar className={`${PREFIX_CLS}-avatar`}>{user.name}</Avatar>
          </div>
        </Dropdown>

        <Dropdown overlay={intlMenu} placement="bottomRight">
          <div className={`${PREFIX_CLS}-intl`}>
            <TranslationOutlined className={`${PREFIX_CLS}-header-icon`} />
          </div>
        </Dropdown>
      </div>
    );
  };

  const renderBreadcrumb = () => {
    const breadcrumbData = generateBreadcrumb(breadcrumb);

    return (
      <Breadcrumb className={`${PREFIX_CLS}-breadcrumb`}>
        {map(breadcrumbData, (item) => (
          <Breadcrumb.Item key={item.href}>
            <Link href={item.href} to={item.href}>
              {t(item.text)}
            </Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  };

  const renderPageHeader = () => {
    if (isEmpty(pageTitle)) {
      return null;
    }
    return (
      <div className={`${PREFIX_CLS}-pageHeader`}>
        {renderBreadcrumb()}
        <div className={`${PREFIX_CLS}-pageTitle`}>{t(`${pageTitle}`)}</div>
      </div>
    );
  };

  const renderPageContent = () => {
    return <div className={`${PREFIX_CLS}-mainContent`}>{children}</div>;
  };

  const renderFooter = () => {
    return (
      <div className={`${PREFIX_CLS}-footer`}>{t('basicLayout_footer')}</div>
    );
  };

  const renderContent = () => {
    return (
      <div className={`${PREFIX_CLS}-content`}>
        {renderHeader()}
        {renderPageHeader()}
        {renderPageContent()}
        {renderFooter()}
      </div>
    );
  };

  const renderNotification = () => {
    const { resetNotification } = appSlice.actions;

    if (isEmpty(notificationTitle) && isEmpty(notificationContent)) {
      return null;
    }

    return (
      <Notification
        title={notificationTitle}
        content={notificationContent}
        onDismiss={() => dispatch(resetNotification())}
      />
    );
  };

  return (
    <div className={PREFIX_CLS}>
      {renderSider()}
      {renderContent()}
      {renderNotification()}
    </div>
  );
};

BasicLayout.propTypes = {
  pageTitle: PropTypes.string,
  breadcrumb: PropTypes.array,
  permissionList: PropTypes.array,
  children: PropTypes.node.isRequired,
};

BasicLayout.defaultProps = {
  pageTitle: '',
  breadcrumb: [],
  permissionList: [],
};

export default BasicLayout;
