export default class StoreService {
  save(key, data) {
    try {
      if (!key || !data) {
        throw new Error("Key is required");
      }
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }

  load(key) {
    try {
      if (!key) {
        throw new Error("Key is required");
      }
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.error(error);
    }
  }

  remove(key) {
    try {
      if (!key) {
        throw new Error("Key is required");
      }
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }
}
