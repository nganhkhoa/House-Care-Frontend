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
  return request(`${apiUrl}/users/signup`, {
    method: 'POST',
    body: params,
  });
}

export async function fakeSubmitForm(params) {
  return request(`${apiUrl}/works`, {
    method: 'POST',
    body: params,
  });
}

export async function ChooseWork(params) {
  return request(`${apiUrl}/works/:workId`, {
    method: 'PUT',
    body: params,
  });
}

export async function ChangePassword(params) {
  return request(`${apiUrl}/users/reset_password`, {
    method: 'POST',
    body: params,
  });
}