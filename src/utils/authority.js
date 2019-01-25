// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('authority') : str;

  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['guest'];
}

export function setAuthority(userInfo) {
  let Authority = 'undefined';
  if (userInfo.role !== undefined) Authority = userInfo.role === 1 ? ['helper'] : ['owner'];
  localStorage.setItem('authority', JSON.stringify(Authority));
  localStorage.setItem('user', JSON.stringify(userInfo));
}
