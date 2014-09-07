var Backbone = require('backbone');
var Radio = require('backbone.radio');
var nprogress = require('nprogress');
var Application = require('src/common/application');
var LayoutView = require('./layout-view');

var routerChannel = Radio.channel('router');

nprogress.configure({
  showSpinner: false
});

module.exports = Application.extend({
  initialize: function() {
    this.layout = new LayoutView();
    this.layout.render();

    this.listenTo(routerChannel, {
      'before:enter:route' : this.onBeforeEnterRoute,
      'enter:route'        : this.onEnterRoute,
      'error:route'        : this.onErrorRoute
    });
  },

  onBeforeEnterRoute: function() {
    nprogress.start();
  },

  onEnterRoute: function() {
    this.layout.$el.scrollTop(0);
    nprogress.done();
  },

  onErrorRoute: function() {
    nprogress.done(true);
  }
});