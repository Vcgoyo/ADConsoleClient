import request from '../../utils/request';

import qs from 'qs';

export async function query(params) {
  return request('user/v1/users?'+qs.stringify(params),{
    mode:'cors'
  });
}

export async function create(params) {
  return request('user/v1/users',{
    method:'post',
    body:JSON.stringify(params),
  });
}

export async function update(params) {
  return request('user/v1/users/'+params.id,{
    method:'put',
    body:JSON.stringify(params),
  });
}
export async function remove(params) {
  return request('user/v1/users/'+params, {
    method: 'delete',
  //  body: qs.stringify(params),
  });
}
export async function rolelist() {
  return request('role/v1/roles',{});
}
