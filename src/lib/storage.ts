export const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
};

export const loadFromStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error('Failed to load from localStorage', err);
    return null;
  }
};

export const clearStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Failed to clear localStorage', err);
  }
};
