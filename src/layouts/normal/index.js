import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const NormalLayout = ({ children }) => (
  <div className="normalLayout">{children}</div>
);

NormalLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NormalLayout;
