let autoClickerRunning = false;
let autoClicker;

function init() {
  console.info("LOADED MOD: ClickForMe");
  Game.Popup("Loaded Click For Me Mod!");
  autoClickerRunning = false;

  // Half the volume of the cookie click sound
  Game.playCookieClickSound = function () {
    if (Game.prefs.cookiesound) PlaySound('snd/clickb' + (Game.cookieClickSound) + '.mp3', 0.25);
    else PlaySound('snd/click' + (Game.cookieClickSound) + '.mp3', 0.25);
    Game.cookieClickSound += Math.floor(Math.random() * 4) + 1;
    if (Game.cookieClickSound > 7) Game.cookieClickSound -= 7;
  }

  // Add a buy function to shimmering veil (off) to disable autoclicker when buying
  Game.UpgradesById[563].buyFunction = function () {
    autoClickerRunning = false; // Disable autoclicker
  }

  document.addEventListener('keydown', // Add an event listener on keydown
    function (event) {
      if (event.key !== "\\") return; // Only run on backslash key pressed
      autoClickerRunning = !autoClickerRunning; // Toggle state of autoClickerRunning
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
