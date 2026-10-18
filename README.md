# Click For Me

Click For Me is a mod for Cookie Clicker (https://orteil.dashnet.org/cookieclicker/) that adds an auto clicker that can be toggled by pressing the backslash (vertical bar) key on your keyboard. The auto clicker works even when the mouse is not over the cookie.

### Installation

##### Manually
- Open the developer tools of your browser
- Run this code in the console section: 
	```Game.LoadMod("https://i-have-no-idea-what-im-doing-right-now.github.io/ClickForMe/ClickForMe.js")```
- This command must be run every time you load into the game

##### With a bookmarklet
- Create a new bookmark in your browser
- Put ```Game.LoadMod('https://i-have-no-idea-what-im-doing-right-now/ClickForMe/ClickForMe.js');``` inside the bookmark
- Click the bookmark while in the game

##### With a userscript
- Make sure you have Violent Monkey extension installed
- Create a new userscript and paste in this code
`````
```
// ==UserScript==
// @name         Cookie Clicker Click For Me Mod
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically loads a mod when Cookie Clicker finishes initializing
// @author       You
// @match        https://orteil.dashnet.org/cookieclicker/
// @match        https://orteil.dashnet.org/cookieclicker/beta/
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // -------------------------------------------------------------
    // REPLACE THIS WITH YOUR MOD'S DIRECT JS URL:
    const MOD_URL = 'https://i-have-no-idea-what-im-doing-right-now.github.io/ClickForMe/ClickForMe.js';
    // -------------------------------------------------------------

    function loadModWhenReady() {
        // Check if Game and Game.ready exist and are initialized
        if (typeof Game !== 'undefined' && Game.ready) {
            console.log('[ClickForMe Loader] Cookie Clicker is ready. Loading Click For Me...');
            Game.LoadMod(MOD_URL);
        } else {
            // Re-check every 500ms until the game is loaded
            setTimeout(loadModWhenReady, 500);
        }
    }

    // Start checking for game load
    loadModWhenReady();
})();
```

