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
  const { workId, ...newParams } = params;
  return request(`${apiUrl}/works/${workId}`, {
    method: 'PUT',
    body: newParams,
  });
}

export async function ChangePassword(params) {
  return request(`${apiUrl}/users/reset_password`, {
    method: 'POST',
    body: params,
  });
}
export async function queryTodayWork() {
  return request(`${apiUrl}/works/`, {
    method: 'GET',
  });
}

export async function queryWork() {
  return request(`${apiUrl}/works/pending`, {
    method: 'GET',
  });
}

export async function addWalletAddress() {
  return request(`${apiUrl}/users/walletAddress`, {
    method: 'POST',
  });
}

export async function addContractAddress() {
  return request(`${apiUrl}/works/contractAddress`, {
    method: 'POST',
  });
}
