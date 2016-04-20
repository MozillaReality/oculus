/* global OCULUS_SETTINGS */
(function () {

'use strict';

function toArray (obj) {
  return Array.prototype.slice.apply(obj);
}

function $ (selector, parent) {
  parent = parent || document;
  return parent.querySelector(selector);
}

function $$ (selector, parent) {
  parent = parent || document;
  return toArray(parent.querySelectorAll(selector));
}

window.addEventListener('keypress', function (e) {
  if (e.keyCode === 112) {  // `P`
    sounds.toggle();
  }
});

function Sounds () {
  var self = this;

  self.muted = false;

  self.toggle = function () {
    if (self.muted) {
      self.play();
    } else {
      self.stop();
    }
  };

  self.playEl = function (el) {
    el.components.sound.sound.autoplay = el.components.sound.sound._autoplay;
    el.components.sound.sound.src = el.components.sound.sound._src;
    el.components.sound.play();
  };

  self.stopEl = function (el) {
    el.components.sound.pause();
    el.components.sound.sound._autoplay = el.components.sound.sound._autoplay;
    el.components.sound.sound.autoplay = false;
    el.components.sound.sound._src = el.components.sound.sound.src;
    el.components.sound.sound.src = '';
  };

  self.play = function () {
    self.muted = false;
    self.remember();
    $$('a-scene [sound]').forEach(self.playEl);
  };

  self.stop = function () {
    self.muted = true;
    self.remember();
    $$('a-scene [sound]').forEach(self.stopEl);
  };

  self.remember = function () {
    try {
      localStorage.audioMuted = self.muted ? 'true' : 'false';
    } catch (e) {
    }
  };

  self.muteOnLoad = function () {
    try {
      return localStorage.audioMuted === 'true';
    } catch (e) {
      return null;
    }
  };

  if (self.muteOnLoad()) {
    self.stop();
  }
}

var sounds = new Sounds();

window.addEventListener('gamepad.buttonhold.oculusremote.center', function () {
  window.location.reload();
});

window.addEventListener('gamepad.buttonhold.oculusremote.back', function () {
  window.location.href = OCULUS_SETTINGS.urls.root;
});

window.addEventListener('gamepad.buttonhold.oculusremote.left', function () {
  window.history.back();
});

window.addEventListener('gamepad.buttonhold.oculusremote.right', function () {
  window.history.forward();
});

window.addEventListener('gamepad.buttondown.oculusremote.center', fire('mousedown'));
window.addEventListener('gamepad.buttonup.oculusremote.center', fire('mouseup'));
window.addEventListener('gamepad.buttonup.oculusremote.center', fire('click'));

window.addEventListener('gamepad.buttondown.oculusremote.center', fire('cursor-mousedown'));
window.addEventListener('gamepad.buttonup.oculusremote.center', fire('cursor-mouseup'));
window.addEventListener('gamepad.buttonup.oculusremote.center', fire('cursor-click'));

window.addEventListener('gamepad.buttondown.oculusremote.up', fireKey('down', 'w'));
window.addEventListener('gamepad.buttonup.oculusremote.up', fireKey('up', 'w'));

window.addEventListener('gamepad.buttondown.oculusremote.left', fireKey('down', 'a'));
window.addEventListener('gamepad.buttonup.oculusremote.left', fireKey('up', 'a'));

window.addEventListener('gamepad.buttondown.oculusremote.right', fireKey('down', 'd'));
window.addEventListener('gamepad.buttonup.oculusremote.right', fireKey('up', 'd'));

window.addEventListener('gamepad.buttondown.oculusremote.down', fireKey('down', 's'));
window.addEventListener('gamepad.buttonup.oculusremote.down', fireKey('up', 's'));

function fireKey (keyEventNameSuffix, key) {
  var keyUpper = key.toUpperCase();
  return function () {
    var e = new CustomEvent('key' + keyEventNameSuffix, {bubbles: true});
    e.keyCode = e.key = keyUpper.charCodeAt(0);
    document.body.dispatchEvent(e);
  };
}

function fire (eventName) {
  return function () {
    var e = new CustomEvent(eventName, {bubbles: true});
    var target = $('a-scene canvas') || document.body;
    target.dispatchEvent(e);
  };
}

})();
