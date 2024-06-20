import { Location } from 'react-router-dom';

export const mockLocation = (path: string): Location => {
  return {
    pathname: path,
    search: '',
    state: null,
    hash: '',
    key: 'mockKey',
  };
};
