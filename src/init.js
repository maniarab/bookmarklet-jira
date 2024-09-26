(async () => {
  const loadScript = async (src) => {
    return new Promise((res) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = res;
      document.body.appendChild(script);
    });
  };
  
  const loadStylesheet = async (src) => {
    return new Promise((res) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      link.onload = res;
      document.head.appendChild(link);
    });
  };

  const loadResources = async () => {
    return Promise.all([
      "https://cdn.jsdelivr.net/gh/maniarab/bookmarklet-jira@master/build/static/js/main.js"
    ].map(loadScript).concat([
      "https://cdn.jsdelivr.net/gh/maniarab/bookmarklet-jira@master/build/static/css/main.css"
    ].map(loadStylesheet)))
  };

  console.log("Loading bookmarklet...");
  await loadResources();
})();