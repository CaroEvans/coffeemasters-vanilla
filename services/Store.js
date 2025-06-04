// Store data global to the app
// Singleton object - capital letter for file name is the convention
// JSON syntax
// will use ES modules
// To use ES modules, we need to be within the umbrella of modules

const Store = {
  menu: null,
  cart: [],
}

const proxiedStore = new Proxy(Store, {
  // set is a trap
  set(target, property, value) {
    target[property] = value;
    if (property == "menu") {
      window.dispatchEvent(new Event("appmenuchange"));
    }
    if (property == "cart") {
      window.dispatchEvent(new Event("appcartchange"));
    }
    return true; // indicates success
  },
  get(target, property) {
    return target[property]
  }
});

export default proxiedStore;