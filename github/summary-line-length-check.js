// ==UserScript==
// @name         summary line length check
// @namespace    http://tampermonkey.net/
// @version      2024-10-29
// @description  try to take over the world!
// @author       You
// @match        *://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const MAX_LINE_LENGTH = 71;
  let summaryNode;
  function getSummaryNode() {
    return document.querySelector("textarea[name='pull_request[body]']");
  }

  function changeResponse() {
    let newSummaryNode = getSummaryNode();
    if (newSummaryNode && newSummaryNode !== summaryNode) {
      summaryNode = newSummaryNode;
      summaryNode.addEventListener("input", (event) => {
        // console.log('input', event.target.value);
        checkTextLength(event.target.value);
      });
    }
  }

  function checkTextLength(text) {
    const lines = text.split("\n");
    let alertMessage = "";

    for (let line of lines) {
      if (line === "## Test Plan:") {
        break;
      } else {
        if (line.length > MAX_LINE_LENGTH && !line.includes("image")) {
          console.log(line.length);
          alertMessage =
            alertMessage +
            `${line} length is ${line.length}, exceeds ${MAX_LINE_LENGTH} \n`;
        }
      }
    }
    if (alertMessage.length > 0) {
      alert(alertMessage);
    }
  }

  // Your code here...
  const observer = new MutationObserver(changeResponse);
  observer.observe(document.body, { childList: true, subtree: true });
})();
