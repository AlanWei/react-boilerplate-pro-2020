import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import map from 'lodash/map';
import { getOutlets, selectStatus, selectOutlets } from './outletsSlice';

import './styles.scss';

const { Meta } = Card;

const PREFIX_CLS = 'view-outlets';

const Outlets = () => {
  const outlets = useSelector(selectOutlets);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();
  if (status === 'idle') {
    dispatch(getOutlets());
  }

  return (
    <div className={`${PREFIX_CLS}-outlets`}>
      {map(outlets, (outlet) => {
        const link = `/outlets/${outlet.id}`;
        return (
          <Link
            href={link}
            to={link}
            key={outlet.id}
            className={`${PREFIX_CLS}-outlets-item`}
          >
            <Card cover={<img alt="" src={outlet.imgSrc} />}>
              <Meta title={outlet.name} description={outlet.description} />
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default Outlets;
