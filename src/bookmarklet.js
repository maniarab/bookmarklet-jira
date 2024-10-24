(async () => {
  const createReactRoot = async () => {
    const reactDiv = document.createElement('div');
    reactDiv.setAttribute("id", "bookmarklet-jira");
    document.body.appendChild(reactDiv);
  };

  const loadScript = async (src) => {
    return new Promise((res) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = res;
      document.body.appendChild(script);
    });
  };
  

  const initUrl = "https://cdn.jsdelivr.net/gh/maniarab/bookmarklet-jira@latest/src/init.js";
  // const initUrl = "https://cdn.jsdelivr.net/gh/maniarab/bookmarklet-jira@main/build/static/js/init.js";

  const loadResources = async () => {
    return Promise.all([
      initUrl
    ].map(loadScript));
  };

  console.log("Loading bookmarklet...");
  await createReactRoot();
  await loadResources();
})();


/*
javascript:(function()%7B(async%20()%20%3D%3E%20%7B%0A%20%20const%20createReactRoot%20%3D%20async%20()%20%3D%3E%20%7B%0A%20%20%20%20const%20reactDiv%20%3D%20document.createElement('div')%3B%0A%20%20%20%20reactDiv.setAttribute(%22id%22%2C%20%22bookmarklet-jira%22)%3B%0A%20%20%20%20document.body.appendChild(reactDiv)%3B%0A%20%20%7D%3B%0A%0A%20%20const%20loadScript%20%3D%20async%20(src)%20%3D%3E%20%7B%0A%20%20%20%20return%20new%20Promise((res)%20%3D%3E%20%7B%0A%20%20%20%20%20%20const%20script%20%3D%20document.createElement('script')%3B%0A%20%20%20%20%20%20script.src%20%3D%20src%3B%0A%20%20%20%20%20%20script.onload%20%3D%20res%3B%0A%20%20%20%20%20%20document.body.appendChild(script)%3B%0A%20%20%20%20%7D)%3B%0A%20%20%7D%3B%0A%20%20%0A%0A%20%20%2F%2F%20const%20initUrl%20%3D%20%22https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmaniarab%2Fbookmarklet-jira%40main%2Fsrc%2Finit.js%22%3B%0A%20%20const%20initUrl%20%3D%20%22https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmaniarab%2Fbookmarklet-jira%40main%2Fbuild%2Fstatic%2Fjs%2Finit.js%22%3B%0A%0A%0A%20%20const%20loadResources%20%3D%20async%20()%20%3D%3E%20%7B%0A%20%20%20%20return%20Promise.all(%5B%0A%20%20%20%20%20%20initUrl%0A%20%20%20%20%5D.map(loadScript))%3B%0A%20%20%7D%3B%0A%0A%20%20console.log(%22Loading%20bookmarklet...%22)%3B%0A%20%20await%20createReactRoot()%3B%0A%20%20await%20loadResources()%3B%0A%7D)()%3B%7D)()%3B
*/