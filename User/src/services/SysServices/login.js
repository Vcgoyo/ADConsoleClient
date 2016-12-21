import request from '../../utils/request';

import qs from 'qs';

export async function dologin(params) {

  return request('http://localhost:8082/login/v1/dologin/'+params.userName+'/'+params.password,{
    method:'post',
  });
}
