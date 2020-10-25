import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';

import './styles.scss';

const PREFIX_CLS = 'view-workingInProgress';

function WorkingInProgress() {
  const { t } = useTranslation();

  return (
    <div className={PREFIX_CLS}>
      <div className={`${PREFIX_CLS}-colLayout`}>
        <Card className={`${PREFIX_CLS}-colLayout-item`}>
          {t('workingInProgress')}
        </Card>
        <Card className={`${PREFIX_CLS}-colLayout-item`}>
          {t('workingInProgress')}
        </Card>
      </div>
      <div className={`${PREFIX_CLS}-colLayout`}>
        <Card className={`${PREFIX_CLS}-colLayout-item`}>
          {t('workingInProgress')}
        </Card>
        <Card className={`${PREFIX_CLS}-colLayout-item`}>
          {t('workingInProgress')}
        </Card>
      </div>
      <div className={`${PREFIX_CLS}-rowLayout`}>
        <Card className={`${PREFIX_CLS}-rowLayout-item`}>
          {t('workingInProgress')}
        </Card>
      </div>
    </div>
  );
}

export default WorkingInProgress;
