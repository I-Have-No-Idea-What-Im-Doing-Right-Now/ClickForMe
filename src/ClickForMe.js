let autoClickerRunning = false;
let autoClicker;
let shimmeringVeilStatus;

function updateAutoclickerState(state) {
  autoClickerRunning = state;
  if (autoClickerRunning) {
    autoClicker = setInterval(function () { // Set an interval to auto click the cookie
      for (let i = 0; i < 100; i++) {
        Game.ClickCookie(); // Click the cookie
      }
    }, 1);
  }
  else {
    clearInterval(autoClicker); // Clear the autoclicker interval
  }
}

function init() {
  console.info("LOADED MOD: ClickForMe");
  Game.Notify("Loaded Mod", "Loaded Click for Me mod", [16, 5]);
  autoClickerRunning = false;
  shimmeringVeilStatus = Game.UpgradesById[563].bought; // Get inital shimmering veil status by checking bought

  // Half the volume of the cookie click sound to save your ears
  Game.playCookieClickSound = function () {
    if (Game.prefs.cookiesound) PlaySound('snd/clickb' + (Game.cookieClickSound) + '.mp3', 0.25);
    else PlaySound('snd/click' + (Game.cookieClickSound) + '.mp3', 0.25);
    Game.cookieClickSound += Math.floor(Math.random() * 4) + 1;
    if (Game.cookieClickSound > 7) Game.cookieClickSound -= 7;
  }

  // Add a buy function to shimmering veil (off) to disable autoclicker when buying
  Game.UpgradesById[563].buyFunction = function () {
    updateAutoclickerState(false); // Disable autoclicker
    shimmeringVeilStatus = 1; // Buying off means toggle on
  }
  Game.UpgradesById[564].buyFunction = function () {
    shimmeringVeilStatus = 0; // Buying on means toggle off
  }

  document.addEventListener('keydown', // Add an event listener on keydown
    function (event) {
      if (event.key !== "\\") return; // Only run on backslash key pressed
      if (shimmeringVeilStatus) { // Prompt if shimmering veil is on
        Game.Prompt("Are you sure you want to enable autoclicker? Shimmering Veil is enabled.",
          [
            ["Yes", "updateAutoclickerState(!autoClickerRunning); Game.ClosePrompt();"], // Toggle autoclicker as callback for yes
            ["No"]
          ]
        )
      }
      else {
        updateAutoclickerState(!autoClickerRunning);
      }
    }
  )

  // Register an on-click hook to check if shimmering veil broke
  Game.registerHook("click",
    function () {
      shimmeringVeilStatus = Game.UpgradesById[563].bought;
    }
  )
}

function save() {

}

function load() {

}

CFM = {
  init,
  save,
  load,
};

Game.registerMod("ClickForMe", CFM);
