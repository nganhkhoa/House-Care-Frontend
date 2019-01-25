// import { stringify } from 'qs';
import request from '@/utils/request';
import { apiUrl } from '@/defaultSettings';

export async function AccountLogin(params) {
  return request(`${apiUrl}/users/signin`, {
    method: 'POST',
    body: params,
  });
}

export async function Register(params) {
  return request(`${apiUrl}/register`, {
    method: 'POST',
    body: params,
  });
}
