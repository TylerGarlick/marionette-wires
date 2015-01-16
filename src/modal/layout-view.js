import LayoutView from '../common/layout-view';
import $ from 'jquery';
import template from './layout-template.hbs';

export default class ModalView extends LayoutView {
  get template() {
    return template;
  }

  get className() {
    return 'modal fade';
  }

  get attributes() {
    return {
      'tabindex' : -1,
      'role' : 'dialog'
    };
  }

  regions() {
    return {
      content: '.modal-content'
    };
  }

  initialize() {
    this.$el.modal({ show: false, backdrop: 'static' });
  }

  get triggers() {
    return {
      'show.bs.modal'   : { preventDefault: false, event: 'before:open' },
      'shown.bs.modal'  : { preventDefault: false, event: 'open' },
      'hide.bs.modal'   : { preventDefault: false, event: 'before:close' },
      'hidden.bs.modal' : { preventDefault: false, event: 'close' }
    };
  }

  open(view) {
    var deferred = $.Deferred();
    this.once('open', deferred.resolve);
    this.content.show(view);
    this.$el.modal('show');
    return deferred;
  }

  close() {
    var deferred = $.Deferred();
    this.once('close', function() {
      this.content.empty();
      deferred.resolve();
    });
    this.$el.modal('hide');
    return deferred;
  }
}
