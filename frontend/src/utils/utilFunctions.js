import React from 'react';
import {useDispatch} from 'react-redux';
import { userLogOut } from '../redux/UserActions';
import { deleteToken } from '../redux/TokenActions';
import { resetSideffects } from '../redux/SideEffectsActions';


export function is401(error) {
    return error.response.status === 401 ? true : false;
}

export const useAsyncError = () => {

  const dispatch = useDispatch();
    // eslint-disable-next-line
    const [_, setError] = React.useState();
    return React.useCallback(
      e => {

        dispatch(deleteToken());
        dispatch(resetSideffects());
        dispatch(userLogOut());
        setError(() => {
          throw e;
        });
      },
      // eslint-disable-next-line
      [setError],
    );
  };