import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloseCircleOutlined } from '@ant-design/icons';
import { DEFAULT_NOTIFICATION_TIMEOUT } from '../../app/const';

import './styles.scss';

const PREFIX_CLS = 'components-notification';

function Notification({ title, content, onDismiss, timeout }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={PREFIX_CLS}>
      <CloseCircleOutlined
        className={`${PREFIX_CLS}-close`}
        onClick={onDismiss}
      />
      <div className={`${PREFIX_CLS}-title`}>{title}</div>
      <div>{content}</div>
    </div>
  );
}

Notification.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  timeout: PropTypes.number,
  onDismiss: PropTypes.func,
};

Notification.defaultProps = {
  title: '',
  content: '',
  timeout: DEFAULT_NOTIFICATION_TIMEOUT,
  onDismiss: () => {},
};

export default Notification;
