// ==UserScript==
// @name         Shorts auto scroll
// @namespace    http://tampermonkey.net/
// @version      2024-06-14
// @description  Sit back and relax. YT Shorts will automaticaly scroll when finished
// @author       vincent bruneau
// @match        https://www.youtube.com/*
// @match        http://youtube.com/*
// @match        http*://*.youtube.com/*
// @match        *://*youtu.be/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license       MIT
// ==/UserScript==

(function() {
    'use strict';
    var t,conf,cs;


    const mo = new MutationObserver((mo)=>{

        mo.forEach((m)=>{
            if(m.type === "attributes" && m.attributeName === "aria-valuenow") {
                let I = parseInt(m.oldValue);
                if(I === 99) {
                    document.querySelector('#navigation-button-down button').click();
                    window.setTimeout( ()=> _u(), 2200 );
                }
            }
        });

    });

    const mo2 = new MutationObserver((mo)=>{
        mo.forEach((m)=>{
            if(m.type === "attributes" && m.attributeName === "is-active") {
                mo.disconnect();
                window.setTimeout( ()=> _u(), 2200 );
            }
        });
    });

    function _a() {
        cs = document.getElementById("#shorts-inner-container");

        if(cs != null) {
            mo2.observe(cs, {
                childList: true,
                subtree: true,
            });
        }
        else {
            window.setTimeout( ()=> _u(), 2200 );
        }
    }

    function _u() {
        t = document.querySelector("#short-video-container .PlayerControlsProgressBarHost");
        console.log(t);

        if(t != null) {
            mo.observe(t, {
                attributeOldValue: true,
                subtree: true,
            });
        }
        else {
            window.setTimeout( ()=> _u(), 2200 );
        }
    }

    _u();
})();
