import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import isEmpty from 'lodash/isEmpty';

import { loginUser, selectError } from './loginSlice';
import i18n from '../../i18n';

import logo from '../../assets/logo.svg';
import './styles.scss';

const PREFIX_CLS = 'view-login';
const ENGLISH = 'English';
const CHINESE = '中文';

const Login = () => {
  // i18n
  const currentLanguage = i18n.language;
  const { t } = useTranslation();

  // redux
  const dispatch = useDispatch();
  const errorMsg = useSelector(selectError);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(
      loginUser({
        username,
        password,
      }),
    );
  };

  const renderErrorMsg = () => {
    const show = !isEmpty(errorMsg);
    if (show) {
      return <div className={`${PREFIX_CLS}-errorMsg`}>{errorMsg}</div>;
    }
    return null;
  };

  const renderLoginPanel = () => (
    <div className={`${PREFIX_CLS}-loginPanel`}>
      <div className={`${PREFIX_CLS}-appInfo`}>
        <img className={`${PREFIX_CLS}-appLogo`} src={logo} alt="logo" />
        <span className={`${PREFIX_CLS}-appName`}>{t('appName')}</span>
      </div>
      <div className={`${PREFIX_CLS}-appDesc`}>{t('login_appDesc')}</div>
      <Input
        className={`${PREFIX_CLS}-loginInput`}
        placeholder={t('login_usernameInput_placeholder')}
        type="text"
        prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} />}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        onPressEnter={() => handleLogin()}
      />
      <Input
        className={`${PREFIX_CLS}-loginInput`}
        placeholder={t('login_passwordInput_placeholder')}
        type="password"
        prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} />}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onPressEnter={() => handleLogin()}
      />
      <Button
        className={`${PREFIX_CLS}-loginBtn`}
        type="primary"
        onClick={() => handleLogin()}
      >
        {t('login_login_btn')}
      </Button>
      {renderErrorMsg()}
    </div>
  );

  const renderIntlSwitch = () => (
    <div className={`${PREFIX_CLS}-intlSwitch`}>
      <span
        className={clsx({
          [`${PREFIX_CLS}-intlItem`]: true,
          [`${PREFIX_CLS}-intlItem-active`]: currentLanguage === 'en',
        })}
        onClick={() => i18n.changeLanguage('en')}
        role="presentation"
      >
        {ENGLISH}
      </span>
      <span className={`${PREFIX_CLS}-intlSwitchSeparator`}>|</span>
      <span
        className={clsx({
          [`${PREFIX_CLS}-intlItem`]: true,
          [`${PREFIX_CLS}-intlItem-active`]: currentLanguage === 'zh',
        })}
        onClick={() => i18n.changeLanguage('zh')}
        role="presentation"
      >
        {CHINESE}
      </span>
    </div>
  );

  return (
    <div className={PREFIX_CLS}>
      {renderLoginPanel()}
      {renderIntlSwitch()}
    </div>
  );
};

export default Login;
