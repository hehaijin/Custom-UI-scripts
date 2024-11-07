// ==UserScript==
// @name         remove-plus-minus-on-github
// @namespace    http://tampermonkey.net/
// @version      2024-10-08
// @description  try to take over the world!
// @author       You
// @match         *://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";
  function removeMarkers() {
    const markers = document.querySelectorAll(".diff-text-marker");
    markers.forEach((marker) => marker.remove());
  }

  // Remove markers initially
  // removeMarkers();

  function clearDataCodeMarker() {
    const spans = document.querySelectorAll("span[data-code-marker]");
    spans.forEach((span) => {
      if (span) {
        span.setAttribute("data-code-marker", "");
      }
    });
  }

  //clearDataCodeMarker();

  // Optional: Observe for future DOM changes and remove new markers
  const observer = new MutationObserver(() => {
    removeMarkers();
    clearDataCodeMarker();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Your code here...
})();
