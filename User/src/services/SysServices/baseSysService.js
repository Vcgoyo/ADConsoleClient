import request from '../../utils/request';
import qs from 'qs';

export async function menusLoading() {
  return request('sys/menus',{});
}
export async function userLoading() {
  return request('sys/user',{});
}
export async function logOutReq() {
  return request('login/v1/loginout');
}
