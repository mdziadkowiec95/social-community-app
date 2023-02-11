export function getAuthTokenFromStorage() {
  return localStorage.getItem('auth_token') ?? '';
}

export function setAuthTokenToStorage(authToken: string) {
  localStorage.setItem('auth_token', authToken);
}
