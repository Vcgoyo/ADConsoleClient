import request from '../../utils/request';

import qs from 'qs';

export async function dologin(params) {

  return request('login/v1/dologin/'+params.userName+'/'+params.password,{
    method:'post',
  });
}
