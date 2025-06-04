// this router is not reusable

const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const route = link.getAttribute("href");
        Router.go(route);
      });
    })
    // Event handler for url changes
    window.addEventListener("popstate", (event) => {
      Router.go(event.state?.route, false)
    })
  Router.go(location.pathname);
  },
  go: (route, addToHistory=true) => {
    console.log(`Going to ${route}`);
    if (addToHistory) {
      history.pushState({ route }, '', route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        pageElement.textContent = "Order";
        break;
      default:
        if (route?.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          pageElement.textContent = "Details";
          const paramId = route.substring(route.lastIndexOf("-") + 1);
          pageElement.dataset.productId = paramId;
          
        }
    }
    if (pageElement) {
      const cache = document.querySelector("main");
      cache.innerHTML = "";
      cache.appendChild(pageElement);
    } else {
      // 404
      document.querySelector("main").innerHTML = "Oops, 404!"
    }
  }
}

// addToHistory false for login page for example

export default Router;