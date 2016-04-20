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

window.addEventListener('gamepad.buttonup.oculusremote.back', function (e) {
  if (e.button.seconds >= 3) {
    window.location.href = OCULUS_SETTINGS.urls.root
  }
});

})();
