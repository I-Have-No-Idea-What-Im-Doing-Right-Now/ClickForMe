let autoClickerRunning = false;
let autoClicker;

function noHookClickCookie(e, ammount) {
  var now = Date.now();
  if (e) e.preventDefault();
  if (Game.OnAscend || Game.AscendTimer > 0 || Game.T < 3 || now - Game.lastClick < 1000 / ((e ? e.detail : 1) === 0 ? 3 : 50)) { }
  else {
    if (now - Game.lastClick < (1000 / 15)) {
      Game.autoclickerDetected += Game.fps;
      if (Game.autoclickerDetected >= Game.fps * 5) Game.Win('Uncanny clicker');
    }
    Game.loseShimmeringVeil('click');
    var amount = amount ? amount : Game.computedMouseCps;
    Game.Earn(amount);
    Game.handmadeCookies += amount;
    if (Game.prefs.particles) {
      Game.particleAdd();
      Game.particleAdd(Game.mouseX, Game.mouseY, Math.random() * 4 - 2, Math.random() * -2 - 2, Math.random() * 0.5 + 0.75, 1, 2);
    }
    if (Game.prefs.numbers) Game.particleAdd(Game.mouseX + Math.random() * 8 - 4, Game.mouseY - 8 + Math.random() * 8 - 4, 0, -2, 1, 4, 2, '', '+' + Beautify(amount, 1));

    Game.playCookieClickSound();
    Game.cookieClicks++;

    if (Game.clicksThisSession == 0) PlayCue('preplay');
    Game.clicksThisSession++;
    Game.lastClick = now;
  }
  Game.Click = 0;
}

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

  document.addEventListener('keydown',
    function (event) {
      if (event.key !== "\\") return;
      autoClickerRunning = !autoClickerRunning; // Toggle state of autoClickerRunning
      if (autoClickerRunning) {
        autoClicker = setInterval(function () { // Set an interval to auto click the cookie
          for (let i = 0; i < 100; i++) {
            noHookClickCookie(); // Run click cookie without mod hooks so that autoclicker does not toggle itself off
          }
        }, 1);
      }
      else {
        clearInterval(autoClicker);
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
