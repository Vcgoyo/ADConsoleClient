import request from '../../utils/request';

import qs from 'qs';

export async function dologin(params) {

  return request('login/v1/dologin',{
    method:'post',
    body:JSON.stringify(params)
  });
}
