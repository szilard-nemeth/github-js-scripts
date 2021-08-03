// ==UserScript==
// @name         GitHub Apache Hadoop Hide comments
// @namespace    https://github.com/apache/hadoop/
// @version      0.1
// @description  Hides all comments from Apache Yetus
// @author       Szilard Nemeth
// @include      /https?:\/\/github\.com.*\/apache\/hadoop\/.*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const comments = document.querySelectorAll(".timeline-comment")
    let yetusComments = [];
    for (let i = 0; i < comments.length; ++i) {
        let comment = comments[i]
        let yetus = Array.from(comment.querySelectorAll("a"))
            .find(link => link.textContent.includes("hadoop-yetus"));
        if (yetus) {
            yetusComments.push(comment.querySelector(".edit-comment-hide"));
        }
    }

    let visible = true;
    const gh_header_actions = document.querySelector('.gh-header-actions')
    let toggleButton = document.createElement("button");
    toggleButton.innerHTML = "Toggle comments"
    toggleButton.id = "toggle-comments";
    toggleButton.className = "btn btn-sm float-none"
    toggleButton.addEventListener('click', function() {
        visible = !visible;
        yetusComments.forEach(div => div.style.display = (visible ? "block" : "none"));
    });
    gh_header_actions.appendChild(toggleButton)
})();