/*
  - Copyright (c) 2014-2016 Cloudware S.A. All rights reserved.
  -
  - This file is part of casper-utils.
  -
  - casper-utils is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - casper-utils  is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with casper-utils.  If not, see <http://www.gnu.org/licenses/>.
  -
*/

class CasperLogger {
  constructor() {
    if (window.console.constructor.name !== "CasperLogger") {
      this.console = window.console;
    }
    return new Proxy(this, this);
  }
  get (target, prop) {
    //return Function.prototype.bind.call(this.console[prop], this.console);
    if (typeof this[prop] === "function") {
      return this[prop];
    }
    if (!this['enabled']()) {
      return function () { };
    }
    return Function.prototype.bind.call(this.console[prop], this.console);
  }
  enable () {
    localStorage.setItem("casperLoggerActive", true);
  }
  disable () {
    localStorage.removeItem("casperLoggerActive");
  }
  enabled () {
    return localStorage.casperLoggerActive === "true";
  }
}

// window.console = new CasperLogger();


/**
* Casper Browser
*/

export class CasperBrowser {

  static get isFirefox () {
    return /Firefox\//.test(navigator.userAgent);
  }

  static get isIE () {
    return navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode;
  }

  static get isEdge () {
    return /Edg\//.test(navigator.userAgent);
  }

  static get isChrome () {
    return /Chrome\//.test(navigator.userAgent) && !/(Edg|Opera|OPR)\//.test(navigator.userAgent);
  }

  static get isOpera () {
    return /Opera|OPR\//.test(navigator.userAgent);
  }

  static get isSafari () {
    return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && /Safari\//.test(navigator.userAgent);
  }

  static get isIos () {
    return navigator && (['iPad', 'iPhone'].includes(navigator.platform) || new RegExp('\\biPhone\\b|\\biPod\\b').test(window.navigator.userAgent));
  }
}

window.CasperBrowser = CasperBrowser;
