import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { selectIsLogin } from '../login/loginSlice';

const Outlets = () => {
  const dispatch = useDispatch();
  // check login
  const isLogin = useSelector(selectIsLogin);
  useEffect(() => {
    if (!isLogin) {
      dispatch(push('/login'));
    }
  }, [isLogin]);
  return <div>123</div>;
};

export default Outlets;
