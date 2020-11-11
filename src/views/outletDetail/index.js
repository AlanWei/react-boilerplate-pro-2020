import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Button, Tag } from 'antd';
import map from 'lodash/map';
import { appSlice } from '../../app/init/appSlice';
import { DEFAULT_NOTIFICATION_TIMEOUT_IN_SECONDS } from '../../app/const';
import { getOutlet, selectOutlet } from './outletDetailSlice';

import './styles.scss';

const PREFIX_CLS = 'view-outletDetail';

const OutletDetail = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const pathname = useSelector((state) => {
    return state.router.location.pathname;
  });
  const { params } = matchPath(pathname, {
    path: '/outlets/:id',
  });
  const outletId = params.id;
  useEffect(() => {
    dispatch(getOutlet(outletId));
  }, [outletId, dispatch]);

  const outlet = useSelector(selectOutlet);

  const showNotification = () => {
    dispatch(
      appSlice.actions.updateNotification({
        title: t('outletDetail_notificationTitle'),
        content: t('outletDetail_notificationContent', {
          seconds: DEFAULT_NOTIFICATION_TIMEOUT_IN_SECONDS,
        }),
      }),
    );
  };

  return (
    <div className={`${PREFIX_CLS}`}>
      <Card>
        <div className={`${PREFIX_CLS}-title`}>{outlet.name}</div>
        <div className={`${PREFIX_CLS}-info`}>
          <span className={`${PREFIX_CLS}-label`}>
            {t('outletDetail_description')}
          </span>
          {outlet.description}
        </div>
        <div className={`${PREFIX_CLS}-info`}>
          <span className={`${PREFIX_CLS}-label`}>
            {t('outletDetail_hours')}
          </span>
          {outlet.hours}
        </div>
        <div className={`${PREFIX_CLS}-info`}>
          <span className={`${PREFIX_CLS}-label`}>
            {t('outletDetail_phone')}
          </span>
          {outlet.phone}
        </div>
        <div className={`${PREFIX_CLS}-info`}>
          <span className={`${PREFIX_CLS}-label`}>
            {t('outletDetail_categories')}
          </span>
          {map(outlet.categories, (item, idx) => (
            <Tag key={idx}>{item}</Tag>
          ))}
        </div>
      </Card>
      <Button
        className={`${PREFIX_CLS}-notificationBtn`}
        type="primary"
        onClick={showNotification}
      >
        {t('outletDetail_showNotification')}
      </Button>
    </div>
  );
};

export default OutletDetail;
