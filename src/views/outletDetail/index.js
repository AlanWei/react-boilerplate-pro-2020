import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Button, Tag } from 'antd';
import map from 'lodash/map';
import { getOutlet, selectStatus, selectOutlet } from './outletDetailSlice';

import './styles.scss';

const PREFIX_CLS = 'view-outletDetail';

function OutletDetail() {
  const { t } = useTranslation();

  const pathname = useSelector((state) => {
    return state.router.location.pathname;
  });
  const { params } = matchPath(pathname, {
    path: '/outlets/:id',
  });
  const outletId = params.id;

  const outlet = useSelector(selectOutlet);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();
  if (status === 'idle') {
    dispatch(getOutlet(outletId));
  }

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
      {/** TODO: Show Notification */}
      <Button className={`${PREFIX_CLS}-notificationBtn`} type="primary">
        {t('outletDetail_showNotification')}
      </Button>
    </div>
  );
}

export default OutletDetail;
