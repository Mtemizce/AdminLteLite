/*!
 * AdminLTE v3.2.0 (https://adminlte.io)
 * Copyright 2014-2022 Colorlib <https://colorlib.com>
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.adminlte = {}, global.jQuery));
})(this, (function (exports, $) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  
  
  /**
   * --------------------------------------------
   * AdminLTE CardWidget.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  var NAME$d = 'CardWidget';
  var DATA_KEY$d = 'lte.cardwidget';
  var EVENT_KEY$6 = "." + DATA_KEY$d;
  var JQUERY_NO_CONFLICT$d = $__default["default"].fn[NAME$d];
  var EVENT_EXPANDED$3 = "expanded" + EVENT_KEY$6;
  var EVENT_COLLAPSED$4 = "collapsed" + EVENT_KEY$6;
  var EVENT_MAXIMIZED = "maximized" + EVENT_KEY$6;
  var EVENT_MINIMIZED = "minimized" + EVENT_KEY$6;
  var EVENT_REMOVED$1 = "removed" + EVENT_KEY$6;
  var CLASS_NAME_CARD = 'card';
  var CLASS_NAME_COLLAPSED$1 = 'collapsed-card';
  var CLASS_NAME_COLLAPSING = 'collapsing-card';
  var CLASS_NAME_EXPANDING = 'expanding-card';
  var CLASS_NAME_WAS_COLLAPSED = 'was-collapsed';
  var CLASS_NAME_MAXIMIZED = 'maximized-card';
  var SELECTOR_DATA_REMOVE = '[data-card-widget="remove"]';
  var SELECTOR_DATA_COLLAPSE = '[data-card-widget="collapse"]';
  var SELECTOR_DATA_MAXIMIZE = '[data-card-widget="maximize"]';
  var SELECTOR_CARD = "." + CLASS_NAME_CARD;
  var SELECTOR_CARD_HEADER = '.card-header';
  var SELECTOR_CARD_BODY = '.card-body';
  var SELECTOR_CARD_FOOTER = '.card-footer';
  var Default$b = {
    animationSpeed: 'normal',
    collapseTrigger: SELECTOR_DATA_COLLAPSE,
    removeTrigger: SELECTOR_DATA_REMOVE,
    maximizeTrigger: SELECTOR_DATA_MAXIMIZE,
    collapseIcon: 'fa-minus',
    expandIcon: 'fa-plus',
    maximizeIcon: 'fa-expand',
    minimizeIcon: 'fa-compress'
  };

  var CardWidget = /*#__PURE__*/function () {
    function CardWidget(element, settings) {
      this._element = element;
      this._parent = element.parents(SELECTOR_CARD).first();

      if (element.hasClass(CLASS_NAME_CARD)) {
        this._parent = element;
      }

      this._settings = $__default["default"].extend({}, Default$b, settings);
    }

    var _proto = CardWidget.prototype;

    _proto.collapse = function collapse() {
      var _this = this;

      this._parent.addClass(CLASS_NAME_COLLAPSING).children(SELECTOR_CARD_BODY + ", " + SELECTOR_CARD_FOOTER).slideUp(this._settings.animationSpeed, function () {
        _this._parent.addClass(CLASS_NAME_COLLAPSED$1).removeClass(CLASS_NAME_COLLAPSING);
      });

      this._parent.find("> " + SELECTOR_CARD_HEADER + " " + this._settings.collapseTrigger + " ." + this._settings.collapseIcon).addClass(this._settings.expandIcon).removeClass(this._settings.collapseIcon);

      this._element.trigger($__default["default"].Event(EVENT_COLLAPSED$4), this._parent);
    };

    _proto.expand = function expand() {
      var _this2 = this;

      this._parent.addClass(CLASS_NAME_EXPANDING).children(SELECTOR_CARD_BODY + ", " + SELECTOR_CARD_FOOTER).slideDown(this._settings.animationSpeed, function () {
        _this2._parent.removeClass(CLASS_NAME_COLLAPSED$1).removeClass(CLASS_NAME_EXPANDING);
      });

      this._parent.find("> " + SELECTOR_CARD_HEADER + " " + this._settings.collapseTrigger + " ." + this._settings.expandIcon).addClass(this._settings.collapseIcon).removeClass(this._settings.expandIcon);

      this._element.trigger($__default["default"].Event(EVENT_EXPANDED$3), this._parent);
    };

    _proto.remove = function remove() {
      this._parent.slideUp();

      this._element.trigger($__default["default"].Event(EVENT_REMOVED$1), this._parent);
    };

    _proto.toggle = function toggle() {
      if (this._parent.hasClass(CLASS_NAME_COLLAPSED$1)) {
        this.expand();
        return;
      }

      this.collapse();
    };

    _proto.maximize = function maximize() {
      this._parent.find(this._settings.maximizeTrigger + " ." + this._settings.maximizeIcon).addClass(this._settings.minimizeIcon).removeClass(this._settings.maximizeIcon);

      this._parent.css({
        height: this._parent.height(),
        width: this._parent.width(),
        transition: 'all .15s'
      }).delay(150).queue(function () {
        var $element = $__default["default"](this);
        $element.addClass(CLASS_NAME_MAXIMIZED);
        $__default["default"]('html').addClass(CLASS_NAME_MAXIMIZED);

        if ($element.hasClass(CLASS_NAME_COLLAPSED$1)) {
          $element.addClass(CLASS_NAME_WAS_COLLAPSED);
        }

        $element.dequeue();
      });

      this._element.trigger($__default["default"].Event(EVENT_MAXIMIZED), this._parent);
    };

    _proto.minimize = function minimize() {
      this._parent.find(this._settings.maximizeTrigger + " ." + this._settings.minimizeIcon).addClass(this._settings.maximizeIcon).removeClass(this._settings.minimizeIcon);

      this._parent.css('cssText', "height: " + this._parent[0].style.height + " !important; width: " + this._parent[0].style.width + " !important; transition: all .15s;").delay(10).queue(function () {
        var $element = $__default["default"](this);
        $element.removeClass(CLASS_NAME_MAXIMIZED);
        $__default["default"]('html').removeClass(CLASS_NAME_MAXIMIZED);
        $element.css({
          height: 'inherit',
          width: 'inherit'
        });

        if ($element.hasClass(CLASS_NAME_WAS_COLLAPSED)) {
          $element.removeClass(CLASS_NAME_WAS_COLLAPSED);
        }

        $element.dequeue();
      });

      this._element.trigger($__default["default"].Event(EVENT_MINIMIZED), this._parent);
    };

    _proto.toggleMaximize = function toggleMaximize() {
      if (this._parent.hasClass(CLASS_NAME_MAXIMIZED)) {
        this.minimize();
        return;
      }

      this.maximize();
    } // Private
    ;

    _proto._init = function _init(card) {
      var _this3 = this;

      this._parent = card;
      $__default["default"](this).find(this._settings.collapseTrigger).click(function () {
        _this3.toggle();
      });
      $__default["default"](this).find(this._settings.maximizeTrigger).click(function () {
        _this3.toggleMaximize();
      });
      $__default["default"](this).find(this._settings.removeTrigger).click(function () {
        _this3.remove();
      });
    } // Static
    ;

    CardWidget._jQueryInterface = function _jQueryInterface(config) {
      var data = $__default["default"](this).data(DATA_KEY$d);

      var _options = $__default["default"].extend({}, Default$b, $__default["default"](this).data());

      if (!data) {
        data = new CardWidget($__default["default"](this), _options);
        $__default["default"](this).data(DATA_KEY$d, typeof config === 'string' ? data : config);
      }

      if (typeof config === 'string' && /collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/.test(config)) {
        data[config]();
      } else if (typeof config === 'object') {
        data._init($__default["default"](this));
      }
    };

    return CardWidget;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default["default"](document).on('click', SELECTOR_DATA_COLLAPSE, function (event) {
    if (event) {
      event.preventDefault();
    }

    CardWidget._jQueryInterface.call($__default["default"](this), 'toggle');
  });
  $__default["default"](document).on('click', SELECTOR_DATA_REMOVE, function (event) {
    if (event) {
      event.preventDefault();
    }

    CardWidget._jQueryInterface.call($__default["default"](this), 'remove');
  });
  $__default["default"](document).on('click', SELECTOR_DATA_MAXIMIZE, function (event) {
    if (event) {
      event.preventDefault();
    }

    CardWidget._jQueryInterface.call($__default["default"](this), 'toggleMaximize');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default["default"].fn[NAME$d] = CardWidget._jQueryInterface;
  $__default["default"].fn[NAME$d].Constructor = CardWidget;

  $__default["default"].fn[NAME$d].noConflict = function () {
    $__default["default"].fn[NAME$d] = JQUERY_NO_CONFLICT$d;
    return CardWidget._jQueryInterface;
  };
  
  
  /**
   * --------------------------------------------
   * AdminLTE Dropdown.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  var NAME$a = 'Dropdown';
  var DATA_KEY$a = 'lte.dropdown';
  var JQUERY_NO_CONFLICT$a = $__default["default"].fn[NAME$a];
  var SELECTOR_NAVBAR = '.navbar';
  var SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
  var SELECTOR_DROPDOWN_MENU_ACTIVE = '.dropdown-menu.show';
  var SELECTOR_DROPDOWN_TOGGLE = '[data-toggle="dropdown"]';
  var CLASS_NAME_DROPDOWN_RIGHT = 'dropdown-menu-right';
  var CLASS_NAME_DROPDOWN_SUBMENU = 'dropdown-submenu'; // TODO: this is unused; should be removed along with the extend?

  var Default$9 = {};
  /**
   * Class Definition
   * ====================================================
   */

  var Dropdown = /*#__PURE__*/function () {
    function Dropdown(element, config) {
      this._config = config;
      this._element = element;
    } // Public


    var _proto = Dropdown.prototype;

    _proto.toggleSubmenu = function toggleSubmenu() {
      this._element.siblings().show().toggleClass('show');

      if (!this._element.next().hasClass('show')) {
        this._element.parents(SELECTOR_DROPDOWN_MENU).first().find('.show').removeClass('show').hide();
      }

      this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function () {
        $__default["default"]('.dropdown-submenu .show').removeClass('show').hide();
      });
    };

    _proto.fixPosition = function fixPosition() {
      var $element = $__default["default"](SELECTOR_DROPDOWN_MENU_ACTIVE);

      if ($element.length === 0) {
        return;
      }

      if ($element.hasClass(CLASS_NAME_DROPDOWN_RIGHT)) {
        $element.css({
          left: 'inherit',
          right: 0
        });
      } else {
        $element.css({
          left: 0,
          right: 'inherit'
        });
      }

      var offset = $element.offset();
      var width = $element.width();
      var visiblePart = $__default["default"](window).width() - offset.left;

      if (offset.left < 0) {
        $element.css({
          left: 'inherit',
          right: offset.left - 5
        });
      } else if (visiblePart < width) {
        $element.css({
          left: 'inherit',
          right: 0
        });
      }
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default["default"](this).data(DATA_KEY$a);

        var _config = $__default["default"].extend({}, Default$9, $__default["default"](this).data());

        if (!data) {
          data = new Dropdown($__default["default"](this), _config);
          $__default["default"](this).data(DATA_KEY$a, data);
        }

        if (config === 'toggleSubmenu' || config === 'fixPosition') {
          data[config]();
        }
      });
    };

    return Dropdown;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default["default"](SELECTOR_DROPDOWN_MENU + " " + SELECTOR_DROPDOWN_TOGGLE).on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($__default["default"](this), 'toggleSubmenu');
  });
  $__default["default"](SELECTOR_NAVBAR + " " + SELECTOR_DROPDOWN_TOGGLE).on('click', function (event) {
    event.preventDefault();

    if ($__default["default"](event.target).parent().hasClass(CLASS_NAME_DROPDOWN_SUBMENU)) {
      return;
    }

    setTimeout(function () {
      Dropdown._jQueryInterface.call($__default["default"](this), 'fixPosition');
    }, 1);
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default["default"].fn[NAME$a] = Dropdown._jQueryInterface;
  $__default["default"].fn[NAME$a].Constructor = Dropdown;

  $__default["default"].fn[NAME$a].noConflict = function () {
    $__default["default"].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Dropdown._jQueryInterface;
  };
  
  /**
   * --------------------------------------------
   * AdminLTE Fullscreen.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  var NAME$8 = 'Fullscreen';
  var DATA_KEY$8 = 'lte.fullscreen';
  var JQUERY_NO_CONFLICT$8 = $__default["default"].fn[NAME$8];
  var SELECTOR_DATA_WIDGET$2 = '[data-widget="fullscreen"]';
  var SELECTOR_ICON = SELECTOR_DATA_WIDGET$2 + " i";
  var EVENT_FULLSCREEN_CHANGE = 'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange';
  var Default$8 = {
    minimizeIcon: 'fa-compress-arrows-alt',
    maximizeIcon: 'fa-expand-arrows-alt'
  };
  /**
   * Class Definition
   * ====================================================
   */

  var Fullscreen = /*#__PURE__*/function () {
    function Fullscreen(_element, _options) {
      this.element = _element;
      this.options = $__default["default"].extend({}, Default$8, _options);
    } // Public


    var _proto = Fullscreen.prototype;

    _proto.toggle = function toggle() {
      if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        this.windowed();
      } else {
        this.fullscreen();
      }
    };

    _proto.toggleIcon = function toggleIcon() {
      if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        $__default["default"](SELECTOR_ICON).removeClass(this.options.maximizeIcon).addClass(this.options.minimizeIcon);
      } else {
        $__default["default"](SELECTOR_ICON).removeClass(this.options.minimizeIcon).addClass(this.options.maximizeIcon);
      }
    };

    _proto.fullscreen = function fullscreen() {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    };

    _proto.windowed = function windowed() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } // Static
    ;

    Fullscreen._jQueryInterface = function _jQueryInterface(config) {
      var data = $__default["default"](this).data(DATA_KEY$8);

      if (!data) {
        data = $__default["default"](this).data();
      }

      var _options = $__default["default"].extend({}, Default$8, typeof config === 'object' ? config : data);

      var plugin = new Fullscreen($__default["default"](this), _options);
      $__default["default"](this).data(DATA_KEY$8, typeof config === 'object' ? config : data);

      if (typeof config === 'string' && /toggle|toggleIcon|fullscreen|windowed/.test(config)) {
        plugin[config]();
      } else {
        plugin.init();
      }
    };

    return Fullscreen;
  }();
  /**
    * Data API
    * ====================================================
    */


  $__default["default"](document).on('click', SELECTOR_DATA_WIDGET$2, function () {
    Fullscreen._jQueryInterface.call($__default["default"](this), 'toggle');
  });
  $__default["default"](document).on(EVENT_FULLSCREEN_CHANGE, function () {
    Fullscreen._jQueryInterface.call($__default["default"](SELECTOR_DATA_WIDGET$2), 'toggleIcon');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default["default"].fn[NAME$8] = Fullscreen._jQueryInterface;
  $__default["default"].fn[NAME$8].Constructor = Fullscreen;

  $__default["default"].fn[NAME$8].noConflict = function () {
    $__default["default"].fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return Fullscreen._jQueryInterface;
  };
  
  
  /**
   * --------------------------------------------
   * AdminLTE PushMenu.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  var NAME$5 = 'PushMenu';
  var DATA_KEY$5 = 'lte.pushmenu';
  var EVENT_KEY$2 = "." + DATA_KEY$5;
  var JQUERY_NO_CONFLICT$5 = $__default["default"].fn[NAME$5];
  var EVENT_COLLAPSED$1 = "collapsed" + EVENT_KEY$2;
  var EVENT_COLLAPSED_DONE = "collapsed-done" + EVENT_KEY$2;
  var EVENT_SHOWN = "shown" + EVENT_KEY$2;
  var SELECTOR_TOGGLE_BUTTON$1 = '[data-widget="pushmenu"]';
  var SELECTOR_BODY = 'body';
  var SELECTOR_OVERLAY = '#sidebar-overlay';
  var SELECTOR_WRAPPER = '.wrapper';
  var CLASS_NAME_COLLAPSED = 'sidebar-collapse';
  var CLASS_NAME_OPEN$3 = 'sidebar-open';
  var CLASS_NAME_IS_OPENING$1 = 'sidebar-is-opening';
  var CLASS_NAME_CLOSED = 'sidebar-closed';
  var Default$5 = {
    autoCollapseSize: 992,
    enableRemember: false,
    noTransitionAfterReload: true,
    animationSpeed: 300
  };
  /**
   * Class Definition
   * ====================================================
   */

  var PushMenu = /*#__PURE__*/function () {
    function PushMenu(element, options) {
      this._element = element;
      this._options = $__default["default"].extend({}, Default$5, options);

      if ($__default["default"](SELECTOR_OVERLAY).length === 0) {
        this._addOverlay();
      }

      this._init();
    } // Public


    var _proto = PushMenu.prototype;

    _proto.expand = function expand() {
      var $bodySelector = $__default["default"](SELECTOR_BODY);

      if (this._options.autoCollapseSize && $__default["default"](window).width() <= this._options.autoCollapseSize) {
        $bodySelector.addClass(CLASS_NAME_OPEN$3);
      }

      $bodySelector.addClass(CLASS_NAME_IS_OPENING$1).removeClass(CLASS_NAME_COLLAPSED + " " + CLASS_NAME_CLOSED).delay(50).queue(function () {
        $bodySelector.removeClass(CLASS_NAME_IS_OPENING$1);
        $__default["default"](this).dequeue();
      });

      if (this._options.enableRemember) {
        localStorage.setItem("remember" + EVENT_KEY$2, CLASS_NAME_OPEN$3);
      }

      $__default["default"](this._element).trigger($__default["default"].Event(EVENT_SHOWN));
    };

    _proto.collapse = function collapse() {
      var _this = this;

      var $bodySelector = $__default["default"](SELECTOR_BODY);

      if (this._options.autoCollapseSize && $__default["default"](window).width() <= this._options.autoCollapseSize) {
        $bodySelector.removeClass(CLASS_NAME_OPEN$3).addClass(CLASS_NAME_CLOSED);
      }

      $bodySelector.addClass(CLASS_NAME_COLLAPSED);

      if (this._options.enableRemember) {
        localStorage.setItem("remember" + EVENT_KEY$2, CLASS_NAME_COLLAPSED);
      }

      $__default["default"](this._element).trigger($__default["default"].Event(EVENT_COLLAPSED$1));
      setTimeout(function () {
        $__default["default"](_this._element).trigger($__default["default"].Event(EVENT_COLLAPSED_DONE));
      }, this._options.animationSpeed);
    };

    _proto.toggle = function toggle() {
      if ($__default["default"](SELECTOR_BODY).hasClass(CLASS_NAME_COLLAPSED)) {
        this.expand();
      } else {
        this.collapse();
      }
    };

    _proto.autoCollapse = function autoCollapse(resize) {
      if (resize === void 0) {
        resize = false;
      }

      if (!this._options.autoCollapseSize) {
        return;
      }

      var $bodySelector = $__default["default"](SELECTOR_BODY);

      if ($__default["default"](window).width() <= this._options.autoCollapseSize) {
        if (!$bodySelector.hasClass(CLASS_NAME_OPEN$3)) {
          this.collapse();
        }
      } else if (resize === true) {
        if ($bodySelector.hasClass(CLASS_NAME_OPEN$3)) {
          $bodySelector.removeClass(CLASS_NAME_OPEN$3);
        } else if ($bodySelector.hasClass(CLASS_NAME_CLOSED)) {
          this.expand();
        }
      }
    };

    _proto.remember = function remember() {
      if (!this._options.enableRemember) {
        return;
      }

      var $body = $__default["default"]('body');
      var toggleState = localStorage.getItem("remember" + EVENT_KEY$2);

      if (toggleState === CLASS_NAME_COLLAPSED) {
        if (this._options.noTransitionAfterReload) {
          $body.addClass('hold-transition').addClass(CLASS_NAME_COLLAPSED).delay(50).queue(function () {
            $__default["default"](this).removeClass('hold-transition');
            $__default["default"](this).dequeue();
          });
        } else {
          $body.addClass(CLASS_NAME_COLLAPSED);
        }
      } else if (this._options.noTransitionAfterReload) {
        $body.addClass('hold-transition').removeClass(CLASS_NAME_COLLAPSED).delay(50).queue(function () {
          $__default["default"](this).removeClass('hold-transition');
          $__default["default"](this).dequeue();
        });
      } else {
        $body.removeClass(CLASS_NAME_COLLAPSED);
      }
    } // Private
    ;

    _proto._init = function _init() {
      var _this2 = this;

      this.remember();
      this.autoCollapse();
      $__default["default"](window).resize(function () {
        _this2.autoCollapse(true);
      });
    };

    _proto._addOverlay = function _addOverlay() {
      var _this3 = this;

      var overlay = $__default["default"]('<div />', {
        id: 'sidebar-overlay'
      });
      overlay.on('click', function () {
        _this3.collapse();
      });
      $__default["default"](SELECTOR_WRAPPER).append(overlay);
    } // Static
    ;

    PushMenu._jQueryInterface = function _jQueryInterface(operation) {
      return this.each(function () {
        var data = $__default["default"](this).data(DATA_KEY$5);

        var _options = $__default["default"].extend({}, Default$5, $__default["default"](this).data());

        if (!data) {
          data = new PushMenu(this, _options);
          $__default["default"](this).data(DATA_KEY$5, data);
        }

        if (typeof operation === 'string' && /collapse|expand|toggle/.test(operation)) {
          data[operation]();
        }
      });
    };

    return PushMenu;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default["default"](document).on('click', SELECTOR_TOGGLE_BUTTON$1, function (event) {
    event.preventDefault();
    var button = event.currentTarget;

    if ($__default["default"](button).data('widget') !== 'pushmenu') {
      button = $__default["default"](button).closest(SELECTOR_TOGGLE_BUTTON$1);
    }

    PushMenu._jQueryInterface.call($__default["default"](button), 'toggle');
  });
  $__default["default"](window).on('load', function () {
    PushMenu._jQueryInterface.call($__default["default"](SELECTOR_TOGGLE_BUTTON$1));
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default["default"].fn[NAME$5] = PushMenu._jQueryInterface;
  $__default["default"].fn[NAME$5].Constructor = PushMenu;

  $__default["default"].fn[NAME$5].noConflict = function () {
    $__default["default"].fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return PushMenu._jQueryInterface;
  };
  
  /**
   * --------------------------------------------
   * AdminLTE SidebarSearch.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  var NAME$4 = 'SidebarSearch';
  var DATA_KEY$4 = 'lte.sidebar-search';
  var JQUERY_NO_CONFLICT$4 = $__default["default"].fn[NAME$4];
  var CLASS_NAME_OPEN$2 = 'sidebar-search-open';
  var CLASS_NAME_ICON_SEARCH = 'fa-search';
  var CLASS_NAME_ICON_CLOSE = 'fa-times';
  var CLASS_NAME_HEADER = 'nav-header';
  var CLASS_NAME_SEARCH_RESULTS = 'sidebar-search-results';
  var CLASS_NAME_LIST_GROUP = 'list-group';
  var SELECTOR_DATA_WIDGET$1 = '[data-widget="sidebar-search"]';
  var SELECTOR_SIDEBAR = '.main-sidebar .nav-sidebar';
  var SELECTOR_NAV_LINK = '.nav-link';
  var SELECTOR_NAV_TREEVIEW = '.nav-treeview';
  var SELECTOR_SEARCH_INPUT$1 = SELECTOR_DATA_WIDGET$1 + " .form-control";
  var SELECTOR_SEARCH_BUTTON = SELECTOR_DATA_WIDGET$1 + " .btn";
  var SELECTOR_SEARCH_ICON = SELECTOR_SEARCH_BUTTON + " i";
  var SELECTOR_SEARCH_LIST_GROUP = "." + CLASS_NAME_LIST_GROUP;
  var SELECTOR_SEARCH_RESULTS = "." + CLASS_NAME_SEARCH_RESULTS;
  var SELECTOR_SEARCH_RESULTS_GROUP = SELECTOR_SEARCH_RESULTS + " ." + CLASS_NAME_LIST_GROUP;
  var Default$4 = {
    arrowSign: '->',
    minLength: 3,
    maxResults: 7,
    highlightName: true,
    highlightPath: false,
    highlightClass: 'text-light',
    notFoundText: 'No element found!'
  };
  var SearchItems = [];
  /**
   * Class Definition
   * ====================================================
   */

  var SidebarSearch = /*#__PURE__*/function () {
    function SidebarSearch(_element, _options) {
      this.element = _element;
      this.options = $__default["default"].extend({}, Default$4, _options);
      this.items = [];
    } // Public


    var _proto = SidebarSearch.prototype;

    _proto.init = function init() {
      var _this = this;

      if ($__default["default"](SELECTOR_DATA_WIDGET$1).length === 0) {
        return;
      }

      if ($__default["default"](SELECTOR_DATA_WIDGET$1).next(SELECTOR_SEARCH_RESULTS).length === 0) {
        $__default["default"](SELECTOR_DATA_WIDGET$1).after($__default["default"]('<div />', {
          class: CLASS_NAME_SEARCH_RESULTS
        }));
      }

      if ($__default["default"](SELECTOR_SEARCH_RESULTS).children(SELECTOR_SEARCH_LIST_GROUP).length === 0) {
        $__default["default"](SELECTOR_SEARCH_RESULTS).append($__default["default"]('<div />', {
          class: CLASS_NAME_LIST_GROUP
        }));
      }

      this._addNotFound();

      $__default["default"](SELECTOR_SIDEBAR).children().each(function (i, child) {
        _this._parseItem(child);
      });
    };

    _proto.search = function search() {
      var _this2 = this;

      var searchValue = $__default["default"](SELECTOR_SEARCH_INPUT$1).val().toLowerCase();

      if (searchValue.length < this.options.minLength) {
        $__default["default"](SELECTOR_SEARCH_RESULTS_GROUP).empty();

        this._addNotFound();

        this.close();
        return;
      }

      var searchResults = SearchItems.filter(function (item) {
        return item.name.toLowerCase().includes(searchValue);
      });
      var endResults = $__default["default"](searchResults.slice(0, this.options.maxResults));
      $__default["default"](SELECTOR_SEARCH_RESULTS_GROUP).empty();

      if (endResults.length === 0) {
        this._addNotFound();
      } else {
        endResults.each(function (i, result) {
          $__default["default"](SELECTOR_SEARCH_RESULTS_GROUP).append(_this2._renderItem(escape(result.name), encodeURI(result.link), result.path));
        });
      }

      this.open();
    };

    _proto.open = function open() {
      $__default["default"](SELECTOR_DATA_WIDGET$1).parent().addClass(CLASS_NAME_OPEN$2);
      $__default["default"](SELECTOR_SEARCH_ICON).removeClass(CLASS_NAME_ICON_SEARCH).addClass(CLASS_NAME_ICON_CLOSE);
    };

    _proto.close = function close() {
      $__default["default"](SELECTOR_DATA_WIDGET$1).parent().removeClass(CLASS_NAME_OPEN$2);
      $__default["default"](SELECTOR_SEARCH_ICON).removeClass(CLASS_NAME_ICON_CLOSE).addClass(CLASS_NAME_ICON_SEARCH);
    };

    _proto.toggle = function toggle() {
      if ($__default["default"](SELECTOR_DATA_WIDGET$1).parent().hasClass(CLASS_NAME_OPEN$2)) {
        this.close();
      } else {
        this.open();
      }
    } // Private
    ;

    _proto._parseItem = function _parseItem(item, path) {
      var _this3 = this;

      if (path === void 0) {
        path = [];
      }

      if ($__default["default"](item).hasClass(CLASS_NAME_HEADER)) {
        return;
      }

      var itemObject = {};
      var navLink = $__default["default"](item).clone().find("> " + SELECTOR_NAV_LINK);
      var navTreeview = $__default["default"](item).clone().find("> " + SELECTOR_NAV_TREEVIEW);
      var link = navLink.attr('href');
      var name = navLink.find('p').children().remove().end().text();
      itemObject.name = this._trimText(name);
      itemObject.link = link;
      itemObject.path = path;

      if (navTreeview.length === 0) {
        SearchItems.push(itemObject);
      } else {
        var newPath = itemObject.path.concat([itemObject.name]);
        navTreeview.children().each(function (i, child) {
          _this3._parseItem(child, newPath);
        });
      }
    };

    _proto._trimText = function _trimText(text) {
      return $.trim(text.replace(/(\r\n|\n|\r)/gm, ' '));
    };

    _proto._renderItem = function _renderItem(name, link, path) {
      var _this4 = this;

      path = path.join(" " + this.options.arrowSign + " ");
      name = unescape(name);
      link = decodeURI(link);

      if (this.options.highlightName || this.options.highlightPath) {
        var searchValue = $__default["default"](SELECTOR_SEARCH_INPUT$1).val().toLowerCase();
        var regExp = new RegExp(searchValue, 'gi');

        if (this.options.highlightName) {
          name = name.replace(regExp, function (str) {
            return "<strong class=\"" + _this4.options.highlightClass + "\">" + str + "</strong>";
          });
        }

        if (this.options.highlightPath) {
          path = path.replace(regExp, function (str) {
            return "<strong class=\"" + _this4.options.highlightClass + "\">" + str + "</strong>";
          });
        }
      }

      var groupItemElement = $__default["default"]('<a/>', {
        href: decodeURIComponent(link),
        class: 'list-group-item'
      });
      var searchTitleElement = $__default["default"]('<div/>', {
        class: 'search-title'
      }).html(name);
      var searchPathElement = $__default["default"]('<div/>', {
        class: 'search-path'
      }).html(path);
      groupItemElement.append(searchTitleElement).append(searchPathElement);
      return groupItemElement;
    };

    _proto._addNotFound = function _addNotFound() {
      $__default["default"](SELECTOR_SEARCH_RESULTS_GROUP).append(this._renderItem(this.options.notFoundText, '#', []));
    } // Static
    ;

    SidebarSearch._jQueryInterface = function _jQueryInterface(config) {
      var data = $__default["default"](this).data(DATA_KEY$4);

      if (!data) {
        data = $__default["default"](this).data();
      }

      var _options = $__default["default"].extend({}, Default$4, typeof config === 'object' ? config : data);

      var plugin = new SidebarSearch($__default["default"](this), _options);
      $__default["default"](this).data(DATA_KEY$4, typeof config === 'object' ? config : data);

      if (typeof config === 'string' && /init|toggle|close|open|search/.test(config)) {
        plugin[config]();
      } else {
        plugin.init();
      }
    };

    return SidebarSearch;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default["default"](document).on('click', SELECTOR_SEARCH_BUTTON, function (event) {
    event.preventDefault();

    SidebarSearch._jQueryInterface.call($__default["default"](SELECTOR_DATA_WIDGET$1), 'toggle');
  });
  $__default["default"](document).on('keyup', SELECTOR_SEARCH_INPUT$1, function (event) {
    if (event.keyCode == 38) {
      event.preventDefault();
      $__default["default"](SELECTOR_SEARCH_RESULTS_GROUP).children().last().focus();
      return;
    }

    if (event.keyCode == 40) {
      event.preventDefault();
      $__default["default"](SELECTOR_SEARCH_RESULTS_GROUP).children().first().focus();
      return;
    }

    setTimeout(function () {
      SidebarSearch._jQueryInterface.call($__default["default"](SELECTOR_DATA_WIDGET$1), 'search');
    }, 100);
  });
  $__default["default"](document).on('keydown', SELECTOR_SEARCH_RESULTS_GROUP, function (event) {
    var $focused = $__default["default"](':focus');

    if (event.keyCode == 38) {
      event.preventDefault();

      if ($focused.is(':first-child')) {
        $focused.siblings().last().focus();
      } else {
        $focused.prev().focus();
      }
    }

    if (event.keyCode == 40) {
      event.preventDefault();

      if ($focused.is(':last-child')) {
        $focused.siblings().first().focus();
      } else {
        $focused.next().focus();
      }
    }
  });
  $__default["default"](window).on('load', function () {
    SidebarSearch._jQueryInterface.call($__default["default"](SELECTOR_DATA_WIDGET$1), 'init');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default["default"].fn[NAME$4] = SidebarSearch._jQueryInterface;
  $__default["default"].fn[NAME$4].Constructor = SidebarSearch;

  $__default["default"].fn[NAME$4].noConflict = function () {
    $__default["default"].fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return SidebarSearch._jQueryInterface;
  };
  
  /**
   * --------------------------------------------
   * AdminLTE NavbarSearch.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  var NAME$3 = 'NavbarSearch';
  var DATA_KEY$3 = 'lte.navbar-search';
  var JQUERY_NO_CONFLICT$3 = $__default["default"].fn[NAME$3];
  var SELECTOR_TOGGLE_BUTTON = '[data-widget="navbar-search"]';
  var SELECTOR_SEARCH_BLOCK = '.navbar-search-block';
  var SELECTOR_SEARCH_INPUT = '.form-control';
  var CLASS_NAME_OPEN$1 = 'navbar-search-open';
  var Default$3 = {
    resetOnClose: true,
    target: SELECTOR_SEARCH_BLOCK
  };
  /**
   * Class Definition
   * ====================================================
   */

  var NavbarSearch = /*#__PURE__*/function () {
    function NavbarSearch(_element, _options) {
      this._element = _element;
      this._config = $__default["default"].extend({}, Default$3, _options);
    } // Public


    var _proto = NavbarSearch.prototype;

    _proto.open = function open() {
      $__default["default"](this._config.target).css('display', 'flex').hide().fadeIn().addClass(CLASS_NAME_OPEN$1);
      $__default["default"](this._config.target + " " + SELECTOR_SEARCH_INPUT).focus();
    };

    _proto.close = function close() {
      $__default["default"](this._config.target).fadeOut().removeClass(CLASS_NAME_OPEN$1);

      if (this._config.resetOnClose) {
        $__default["default"](this._config.target + " " + SELECTOR_SEARCH_INPUT).val('');
      }
    };

    _proto.toggle = function toggle() {
      if ($__default["default"](this._config.target).hasClass(CLASS_NAME_OPEN$1)) {
        this.close();
      } else {
        this.open();
      }
    } // Static
    ;

    NavbarSearch._jQueryInterface = function _jQueryInterface(options) {
      return this.each(function () {
        var data = $__default["default"](this).data(DATA_KEY$3);

        var _options = $__default["default"].extend({}, Default$3, $__default["default"](this).data());

        if (!data) {
          data = new NavbarSearch(this, _options);
          $__default["default"](this).data(DATA_KEY$3, data);
        }

        if (!/toggle|close|open/.test(options)) {
          throw new Error("Undefined method " + options);
        }

        data[options]();
      });
    };

    return NavbarSearch;
  }();
  /**
   * Data API
   * ====================================================
   */


  $__default["default"](document).on('click', SELECTOR_TOGGLE_BUTTON, function (event) {
    event.preventDefault();
    var button = $__default["default"](event.currentTarget);

    if (button.data('widget') !== 'navbar-search') {
      button = button.closest(SELECTOR_TOGGLE_BUTTON);
    }

    NavbarSearch._jQueryInterface.call(button, 'toggle');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default["default"].fn[NAME$3] = NavbarSearch._jQueryInterface;
  $__default["default"].fn[NAME$3].Constructor = NavbarSearch;

  $__default["default"].fn[NAME$3].noConflict = function () {
    $__default["default"].fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return NavbarSearch._jQueryInterface;
  };
  
  /**
   * --------------------------------------------
   * AdminLTE Toasts.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  var NAME$2 = 'Toasts';
  var DATA_KEY$2 = 'lte.toasts';
  var EVENT_KEY$1 = "." + DATA_KEY$2;
  var JQUERY_NO_CONFLICT$2 = $__default["default"].fn[NAME$2];
  var EVENT_INIT = "init" + EVENT_KEY$1;
  var EVENT_CREATED = "created" + EVENT_KEY$1;
  var EVENT_REMOVED = "removed" + EVENT_KEY$1;
  var SELECTOR_CONTAINER_TOP_RIGHT = '#toastsContainerTopRight';
  var SELECTOR_CONTAINER_TOP_LEFT = '#toastsContainerTopLeft';
  var SELECTOR_CONTAINER_BOTTOM_RIGHT = '#toastsContainerBottomRight';
  var SELECTOR_CONTAINER_BOTTOM_LEFT = '#toastsContainerBottomLeft';
  var CLASS_NAME_TOP_RIGHT = 'toasts-top-right';
  var CLASS_NAME_TOP_LEFT = 'toasts-top-left';
  var CLASS_NAME_BOTTOM_RIGHT = 'toasts-bottom-right';
  var CLASS_NAME_BOTTOM_LEFT = 'toasts-bottom-left';
  var POSITION_TOP_RIGHT = 'topRight';
  var POSITION_TOP_LEFT = 'topLeft';
  var POSITION_BOTTOM_RIGHT = 'bottomRight';
  var POSITION_BOTTOM_LEFT = 'bottomLeft';
  var Default$2 = {
    position: POSITION_TOP_RIGHT,
    fixed: true,
    autohide: false,
    autoremove: true,
    delay: 1000,
    fade: true,
    icon: null,
    image: null,
    imageAlt: null,
    imageHeight: '25px',
    title: null,
    subtitle: null,
    close: true,
    body: null,
    class: null
  };
  /**
   * Class Definition
   * ====================================================
   */

  var Toasts = /*#__PURE__*/function () {
    function Toasts(element, config) {
      this._config = config;

      this._prepareContainer();

      $__default["default"]('body').trigger($__default["default"].Event(EVENT_INIT));
    } // Public


    var _proto = Toasts.prototype;

    _proto.create = function create() {
      var toast = $__default["default"]('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>');
      toast.data('autohide', this._config.autohide);
      toast.data('animation', this._config.fade);

      if (this._config.class) {
        toast.addClass(this._config.class);
      }

      if (this._config.delay && this._config.delay != 500) {
        toast.data('delay', this._config.delay);
      }

      var toastHeader = $__default["default"]('<div class="toast-header">');

      if (this._config.image != null) {
        var toastImage = $__default["default"]('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt);

        if (this._config.imageHeight != null) {
          toastImage.height(this._config.imageHeight).width('auto');
        }

        toastHeader.append(toastImage);
      }

      if (this._config.icon != null) {
        toastHeader.append($__default["default"]('<i />').addClass('mr-2').addClass(this._config.icon));
      }

      if (this._config.title != null) {
        toastHeader.append($__default["default"]('<strong />').addClass('mr-auto').html(this._config.title));
      }

      if (this._config.subtitle != null) {
        toastHeader.append($__default["default"]('<small />').html(this._config.subtitle));
      }

      if (this._config.close == true) {
        var toastClose = $__default["default"]('<button data-dismiss="toast" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden="true">&times;</span>');

        if (this._config.title == null) {
          toastClose.toggleClass('ml-2 ml-auto');
        }

        toastHeader.append(toastClose);
      }

      toast.append(toastHeader);

      if (this._config.body != null) {
        toast.append($__default["default"]('<div class="toast-body" />').html(this._config.body));
      }

      $__default["default"](this._getContainerId()).prepend(toast);
      var $body = $__default["default"]('body');
      $body.trigger($__default["default"].Event(EVENT_CREATED));
      toast.toast('show');

      if (this._config.autoremove) {
        toast.on('hidden.bs.toast', function () {
          $__default["default"](this).delay(200).remove();
          $body.trigger($__default["default"].Event(EVENT_REMOVED));
        });
      }
    } // Static
    ;

    _proto._getContainerId = function _getContainerId() {
      if (this._config.position == POSITION_TOP_RIGHT) {
        return SELECTOR_CONTAINER_TOP_RIGHT;
      }

      if (this._config.position == POSITION_TOP_LEFT) {
        return SELECTOR_CONTAINER_TOP_LEFT;
      }

      if (this._config.position == POSITION_BOTTOM_RIGHT) {
        return SELECTOR_CONTAINER_BOTTOM_RIGHT;
      }

      if (this._config.position == POSITION_BOTTOM_LEFT) {
        return SELECTOR_CONTAINER_BOTTOM_LEFT;
      }
    };

    _proto._prepareContainer = function _prepareContainer() {
      if ($__default["default"](this._getContainerId()).length === 0) {
        var container = $__default["default"]('<div />').attr('id', this._getContainerId().replace('#', ''));

        if (this._config.position == POSITION_TOP_RIGHT) {
          container.addClass(CLASS_NAME_TOP_RIGHT);
        } else if (this._config.position == POSITION_TOP_LEFT) {
          container.addClass(CLASS_NAME_TOP_LEFT);
        } else if (this._config.position == POSITION_BOTTOM_RIGHT) {
          container.addClass(CLASS_NAME_BOTTOM_RIGHT);
        } else if (this._config.position == POSITION_BOTTOM_LEFT) {
          container.addClass(CLASS_NAME_BOTTOM_LEFT);
        }

        $__default["default"]('body').append(container);
      }

      if (this._config.fixed) {
        $__default["default"](this._getContainerId()).addClass('fixed');
      } else {
        $__default["default"](this._getContainerId()).removeClass('fixed');
      }
    } // Static
    ;

    Toasts._jQueryInterface = function _jQueryInterface(option, config) {
      return this.each(function () {
        var _options = $__default["default"].extend({}, Default$2, config);

        var toast = new Toasts($__default["default"](this), _options);

        if (option === 'create') {
          toast[option]();
        }
      });
    };

    return Toasts;
  }();
  /**
   * jQuery API
   * ====================================================
   */


  $__default["default"].fn[NAME$2] = Toasts._jQueryInterface;
  $__default["default"].fn[NAME$2].Constructor = Toasts;

  $__default["default"].fn[NAME$2].noConflict = function () {
    $__default["default"].fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Toasts._jQueryInterface;
  };
  //# sourceMappingURL=adminlte.js.map
