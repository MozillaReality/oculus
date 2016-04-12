(function () {

importScripts('/assets/js/lib/sw-toolbox/sw-toolbox.js');

global.toolbox.options.debug = true;

global.toolbox.preCacheItems = [
  '/assets/css/style.css',
  '/assets/audio/JazzDrums.ogg',
  '/assets/audio/Piano.ogg',
  '/assets/audio/DoubleBass.ogg',
  '/assets/audio/Saxophone.ogg',
  '/assets/img/grid.png',
  '/assets/js/fonts/graph-black.js',
  '/assets/js/common.js',
  '/assets/js/main.js',
  '/worlds/theatre/assets/img/door.png',
  '/worlds/theatre/assets/img/exit-sign.png',
  '/worlds/theatre/assets/img/floor.jpg',
  '/worlds/theatre/assets/img/stars.jpg',
  '/worlds/theatre/assets/img/wall.jpg',
  '/worlds/theatre/assets/models/sofa.dae',
  '/worlds/theatre/assets/videos/dying-light.mp4',
  '/worlds/tron/assets/audio/tron.mp3',
  '/worlds/tron/assets/img/border.png',
  '/worlds/tron/assets/img/building.png',
  '/worlds/tron/assets/img/building2.png',
  '/worlds/tron/assets/img/caution.png',
  '/worlds/tron/assets/img/circuit.png',
  '/worlds/tron/assets/img/health-bar.png',
  '/worlds/tron/assets/img/highway.png',
  '/worlds/tron/assets/img/light-ray.png',
  '/worlds/tron/assets/img/robot.png',
  '/worlds/tron/assets/img/tron-ground.png',
  '/worlds/tron/assets/img/tron-ring.png',
  '/worlds/tron/assets/img/tron-vehicle.png',
  '/worlds/tron/assets/models/cycle.dae'
];

global.toolbox.router.default = global.toolbox.networkFirst;

// On install, cache resources and skip waiting so the Service Worker takes
// control of the page ASAP.
global.addEventListener('install', e => e.waitUntil(global.skipWaiting());

// On activation, delete any old caches and start controlling the clients
// without waiting for them to reload.
global.addEventListener('activate', e => e.waitUntil(global.clients.claim()));

})();
