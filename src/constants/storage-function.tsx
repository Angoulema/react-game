function storage(key: string, data?: any): any {
  if (arguments.length === 1) {
    const storedData = localStorage.getItem(key);
    if (storedData !== null) {
      return JSON.parse(storedData);
    }
    return [];
  }

  localStorage.setItem(key, JSON.stringify(data));
  return true;
}

export default storage;