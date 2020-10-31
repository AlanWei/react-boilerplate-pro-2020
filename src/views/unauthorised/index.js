import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import './styles.scss';

const PREFIX_CLS = 'view-unauthorized';
const NO_PERMISSION_ERROR_CODE = '403';

const Unauthorised = () => {
  const { t } = useTranslation();

  return (
    <div className={`${PREFIX_CLS}`}>
      <div className={`${PREFIX_CLS}-errorCode`}>
        {NO_PERMISSION_ERROR_CODE}
      </div>
      <div className={`${PREFIX_CLS}-errorDesc`}>{t('unauthorized_403')}</div>
      <Link to="/" href="/">
        <Button type="primary">{t('exception_backToHome')}</Button>
      </Link>
    </div>
  );
};

export default Unauthorised;
