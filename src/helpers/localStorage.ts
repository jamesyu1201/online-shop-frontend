export function getValueFromLocalStorage(key: string): string | null {
  return localStorage.getItem(key);
}

export function setValueToLocalStorage(key: string, value: string) {
  return localStorage.setItem(key, value);
}
