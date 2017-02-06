import request from '../../utils/request';
import qs from 'qs';

export async function query(params) {
  return request('role/v1/roles?'+qs.stringify(params),{});
}
export async function create(params) {
  return request('role/v1/roles',{
    method:'post',
    body:JSON.stringify(params)
  })
}

export async function remove(params) {
  return request('role/v1/roles/'+params,{
    method:'delete'
  })
}
export async function update(params) {
  return request('role/v1/roles',{
    method:'put',
    body:JSON.stringify(params)
  })
}
export async function menusList(params) {
  return request('poweritem/v1/menuslist?'+qs.stringify(params),{});
}

export async function queryOne(params) {
  return request('role/v1/roles/'+params,{});
}
