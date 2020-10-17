import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../../assets/logo.svg';
import './styles.scss';

const PREFIX_CLS = 'layout-basic';
const BASE_URL = '/';

const BasicLayout = () => {
  const { t } = useTranslation();

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

  return <div className={PREFIX_CLS}>{renderSider()}</div>;
};

export default BasicLayout;
