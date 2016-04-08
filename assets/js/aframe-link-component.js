(function () {

/**
 * Link component.
 *
 * @namespace href
 */

AFRAME.registerComponent('href', {
  schema: {
    type: 'string'
  },

  init: function () {
    this.clickListener = function () { window.location.href = this.data; }.bind(this);
    this.el.addEventListener('click', this.clickListener);
  },

  remove: function () {
    this.el.removeEventListener('click', this.clickListener);
  }
});

})();
