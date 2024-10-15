class StorageService {
  get(name: string) {
    return localStorage.getItem(name);
  }
  set(name: string, value: string) {
    return localStorage.setItem(name, value);
  }
  remove(name: string) {
    return localStorage.removeItem(name);
  }
}

export default new StorageService();
