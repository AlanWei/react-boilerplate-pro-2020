import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import './styles.scss';

const PREFIX_CLS = 'view-notFound';
const NOT_FOUND_ERROR_CODE = '404';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className={`${PREFIX_CLS}`}>
      <div className={`${PREFIX_CLS}-errorCode`}>{NOT_FOUND_ERROR_CODE}</div>
      <div className={`${PREFIX_CLS}-errorDesc`}>{t('notFound_404')}</div>
      <Link to="/" href="/">
        <Button type="primary">{t('exception_backToHome')}</Button>
      </Link>
    </div>
  );
};

export default NotFound;
