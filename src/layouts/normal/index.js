import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const PREFIX_CLS = 'layout-normal';

const NormalLayout = ({ children }) => (
  <div className={PREFIX_CLS}>{children}</div>
);

NormalLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NormalLayout;
