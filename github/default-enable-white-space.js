// ==UserScript==
// @name         default enable white space
// @namespace    http://tampermonkey.net/
// @version      2024-10-30
// @description  try to take over the world!
// @author       You
// @match        *://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  window.navigation.addEventListener("navigate", (event) => {
    const url = location.href;
    // const search= location.search;
    console.log("location changed!", url);
    if (url.endsWith("files")) {
      document.location.href = `${url}?diff=split&w=1`;
    }
  });

  // Your code here...
})();
