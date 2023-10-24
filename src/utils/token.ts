const TOKEN_KEY = 'THE_BEST_TOKEN';

export function setToken(value: string): void {
  localStorage.setItem(TOKEN_KEY, value);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function isLogin(): boolean {
  return !!getToken();
}
