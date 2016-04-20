(function () {

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js');
// }

var oculusSettings = {
  urls: {
    root: '/'
  }
};

if (window.location.pathname.indexOf('/oculus/') === -1) {
  oculusSettings.urls.root = window.location.pathname.split('/oculus/')[0] + '/oculus/';
}

var gamepadsSettings = {};

window.GAMEPADS_SETTINGS = gamepadsSettings;

window.OCULUS_SETTINGS = oculusSettings;

})();

