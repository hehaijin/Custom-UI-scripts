// ==UserScript==
// @name         hide-comment-button
// @namespace    http://tampermonkey.net/
// @version      2024-10-15
// @description  try to take over the world!
// @author       You
// @match        *://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  let isHideCommentButtonShown = false;
  let isCommentShown = true;
  const githubPrFilesPath = /github.com\/.+?\/.+?\/pull\/.+?\/files/;

  function clearComments() {
    const markers = document.querySelectorAll(".inline-comments");
    markers.forEach((marker) => marker.remove());
  }

  function onPageProcess() {
    const currUrl = window.location.href;
    // do the match here, inside single page app the script is not reloaded.
    if (githubPrFilesPath.test(currUrl)) {
      if (!isHideCommentButtonShown) {
        document.body.appendChild(button);
        isHideCommentButtonShown = true;
      }
    } else {
      if (isHideCommentButtonShown) {
        button.remove();
        isHideCommentButtonShown = false;
      }
    }
  }

  function addComments() {}

  function createButton() {
    const button = document.createElement("button");
    // Set button text content
    button.textContent = "Hide Comments";
    button.id = "myButton";
    button.style.padding = "5px 10px";
    button.style.fontSize = "14px";
    button.style.position = "fixed";
    button.style.bottom = "20px"; // Adjust the values as needed
    button.style.left = "40px"; // Adjust the values as needed

    // Add an event listener to the button
    button.addEventListener("click", () => {
      if (isCommentShown) {
        clearComments();
        button.textContent = "Comments Hidden";
      } else {
        addComments();
        // button.textContent = "Show Comments";
      }
      isCommentHidden = !isCommentHidden;
    });
    return button;
  }

  const button = createButton();

  // onPageProcess();

  // Append the button to the container div or any other element
  const observer = new MutationObserver(() => {
    onPageProcess();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
