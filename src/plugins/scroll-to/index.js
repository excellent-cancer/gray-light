import Vue from 'vue'

function throttle (delay, noTrailing, callback, debounceMode) {
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */
  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  } // `noTrailing` defaults to falsy.


  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */


  function wrapper() {
    var self = this;
    var elapsed = Date.now() - lastExec;
    var args = arguments;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, args);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      /*
       * In throttle mode, if `delay` time has been exceeded, execute
       * `callback`.
       */
      exec();
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}

import {top} from "@/plugins/scroll-to/utils";

class ScrollToFactory {
  constructor() {
    document.addEventListener(
      "scroll",
      throttle(50, false, this.scroll.bind(this)),
      false)

    this.head = null
    this.tail = null
  }

  scroll() {
    for (let scroll = this.head; scroll != null; scroll = scroll.next) {
      scroll.update()
    }
  }

  newGroup(options) {
    let group = new ScrollGroup(this, options || {})
    this.addGroup(group)
    return group
  }

  addGroup(group) {
    if (this.tail == null) {
      this.head = this.tail = group
    } else {
      this.tail.next = group
      group.prev = this.tail
      this.tail = group
    }
  }

}

class ScrollGroup {

  constructor(factory, options) {
    this.next = null
    this.prev = null
    this.factory = factory
    this.views = []
    this.options = options
  }

  disable() {

    if (this.prev != null) {
      this.prev.next = this.next
    }
    if (this.next != null) {
      this.next.prev = this.prev
    }

    if (this.factory.head === this) {
      this.factory.head = this.next
    }

    if (this.factory.tail === this) {
      this.factory.tail = this.prev
    }

    this.prev = this.next = null
  }

  enable() {
    this.factory.addGroup(this)
    this.views.forEach(v => v.reset())
  }

  add(env) {
    this.views.push(new Scroll(this, env))
  }

  update() {
    let result = null
    for (let v of this.views) {
      v.update()
      if (result == null) {
        result= v
        continue
      }

      if (result.location > 0) {
        if (v.location <= 0 || v.location <= result.location) {
          result = v
        }
      } else {
        if (v.location <= 0 && v.location >= result.location) {
          result = v
        }
      }
    }

    if (result == null) {
      this.options.active(null)
    } else {
      this.options.active({ id: result.env.id })
    }
  }

}


class Scroll {

  constructor(group, env) {
    this.offset = group.options.offset || 0
    this.over = group.options.over || 0
    this.group = group
    this.location = null
    this.env = env
    this.reset()
    this.compute()
  }

  update() {
    this.compute()
    let offset = this.offset
    // let bottom = this.bottom
    let top = this.top


    this.location = ((top + offset) - window.pageYOffset - this.over)

    /*    let withinTopBounds = (bottom - offset) - window.pageYOffset > 0
        let withinBottomBounds = (top + offset) - window.pageYOffset <= window.innerHeight*/
  }

  compute() {
    this.top = top(this.el)
    this.bottom = this.top + this.el.clientHeight
  }

  reset() {
    this.el = document.getElementById(this.env.id)
  }

}

Vue.prototype.$scrollToFactory = new ScrollToFactory()