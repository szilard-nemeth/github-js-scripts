// ==UserScript==
// @name         GitHub Apache Hadoop Hide comments
// @namespace    https://github.com/apache/hadoop/
// @version      0.1
// @description  Hides all comments from Apache Yetus
// @author       Szilard Nemeth
// @include      /https?:\/\/github\.com.*\/apache\/hadoop\/.*/
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const gh_header_actions = jQuery('.gh-header-actions')
    const toggleButton = jQuery('<button id="toggle-comments" class="btn btn-sm float-none">Toggle comments</button>')
    gh_header_actions.append(toggleButton)
    const toggle_comments = jQuery('#toggle-comments');


    const comments = document.querySelectorAll(".timeline-comment")
    const yetusComments = [...comments].filter(comment => {
        const links = comment.querySelectorAll("a")
        const filteredLinks = [...links].filter(link => link.textContent.includes("hadoop-yetus"))
        if (filteredLinks.length > 0) {
            return comment;
        }
    }).map(c => c.querySelector(".edit-comment-hide"))

    var visible = true;
    toggle_comments.on('click', function() {
        var displayStyle
        if (visible) {
            displayStyle = "none"
        } else {
            displayStyle = "block"
        }
        yetusComments.forEach(div => div.style.display = displayStyle);
        visible = !visible
    });
})();