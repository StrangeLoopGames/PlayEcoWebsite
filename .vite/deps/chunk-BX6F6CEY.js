import {
  require_jsx_runtime
} from "./chunk-JOIKUS3V.js";
import {
  require_react
} from "./chunk-NNCLXYIK.js";
import {
  __commonJS,
  __toESM
} from "./chunk-3SPBDNLE.js";

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React13 = require_react();
        var ReactSharedInternals = React13.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var useState2 = React13.useState, useEffect6 = React13.useEffect, useLayoutEffect5 = React13.useLayoutEffect, useDebugValue = React13.useDebugValue;
        var didWarnOld18Alpha = false;
        var didWarnUncachedGetSnapshot = false;
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          {
            if (!didWarnOld18Alpha) {
              if (React13.startTransition !== void 0) {
                didWarnOld18Alpha = true;
                error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.");
              }
            }
          }
          var value = getSnapshot();
          {
            if (!didWarnUncachedGetSnapshot) {
              var cachedValue = getSnapshot();
              if (!objectIs(value, cachedValue)) {
                error("The result of getSnapshot should be cached to avoid an infinite loop");
                didWarnUncachedGetSnapshot = true;
              }
            }
          }
          var _useState = useState2({
            inst: {
              value,
              getSnapshot
            }
          }), inst = _useState[0].inst, forceUpdate = _useState[1];
          useLayoutEffect5(function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
          }, [subscribe, value, getSnapshot]);
          useEffect6(function() {
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
            var handleStoreChange = function() {
              if (checkIfSnapshotChanged(inst)) {
                forceUpdate({
                  inst
                });
              }
            };
            return subscribe(handleStoreChange);
          }, [subscribe]);
          useDebugValue(value);
          return value;
        }
        function checkIfSnapshotChanged(inst) {
          var latestGetSnapshot = inst.getSnapshot;
          var prevValue = inst.value;
          try {
            var nextValue = latestGetSnapshot();
            return !objectIs(prevValue, nextValue);
          } catch (error2) {
            return true;
          }
        }
        function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
          return getSnapshot();
        }
        var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
        var isServerEnvironment = !canUseDOM;
        var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
        var useSyncExternalStore$2 = React13.useSyncExternalStore !== void 0 ? React13.useSyncExternalStore : shim;
        exports.useSyncExternalStore = useSyncExternalStore$2;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React13 = require_react();
        var shim = require_shim();
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var useSyncExternalStore = shim.useSyncExternalStore;
        var useRef3 = React13.useRef, useEffect6 = React13.useEffect, useMemo = React13.useMemo, useDebugValue = React13.useDebugValue;
        function useSyncExternalStoreWithSelector2(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
          var instRef = useRef3(null);
          var inst;
          if (instRef.current === null) {
            inst = {
              hasValue: false,
              value: null
            };
            instRef.current = inst;
          } else {
            inst = instRef.current;
          }
          var _useMemo = useMemo(function() {
            var hasMemo = false;
            var memoizedSnapshot;
            var memoizedSelection;
            var memoizedSelector = function(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                var _nextSelection = selector(nextSnapshot);
                if (isEqual !== void 0) {
                  if (inst.hasValue) {
                    var currentSelection = inst.value;
                    if (isEqual(currentSelection, _nextSelection)) {
                      memoizedSelection = currentSelection;
                      return currentSelection;
                    }
                  }
                }
                memoizedSelection = _nextSelection;
                return _nextSelection;
              }
              var prevSnapshot = memoizedSnapshot;
              var prevSelection = memoizedSelection;
              if (objectIs(prevSnapshot, nextSnapshot)) {
                return prevSelection;
              }
              var nextSelection = selector(nextSnapshot);
              if (isEqual !== void 0 && isEqual(prevSelection, nextSelection)) {
                return prevSelection;
              }
              memoizedSnapshot = nextSnapshot;
              memoizedSelection = nextSelection;
              return nextSelection;
            };
            var maybeGetServerSnapshot = getServerSnapshot === void 0 ? null : getServerSnapshot;
            var getSnapshotWithSelector = function() {
              return memoizedSelector(getSnapshot());
            };
            var getServerSnapshotWithSelector = maybeGetServerSnapshot === null ? void 0 : function() {
              return memoizedSelector(maybeGetServerSnapshot());
            };
            return [getSnapshotWithSelector, getServerSnapshotWithSelector];
          }, [getSnapshot, getServerSnapshot, selector, isEqual]), getSelection = _useMemo[0], getServerSelection = _useMemo[1];
          var value = useSyncExternalStore(subscribe, getSelection, getServerSelection);
          useEffect6(function() {
            inst.hasValue = true;
            inst.value = value;
          }, [value]);
          useDebugValue(value);
          return value;
        }
        exports.useSyncExternalStoreWithSelector = useSyncExternalStoreWithSelector2;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// node_modules/@tanstack/history/dist/esm/index.js
var pushStateEvent = "pushstate";
var popStateEvent = "popstate";
var beforeUnloadEvent = "beforeunload";
var beforeUnloadListener = (event) => {
  event.preventDefault();
  return event.returnValue = "";
};
var stopBlocking = () => {
  removeEventListener(beforeUnloadEvent, beforeUnloadListener, {
    capture: true
  });
};
function createHistory(opts) {
  let location = opts.getLocation();
  const subscribers = /* @__PURE__ */ new Set();
  let blockers = [];
  const onUpdate = () => {
    location = opts.getLocation();
    subscribers.forEach((subscriber) => subscriber());
  };
  const tryNavigation = async (task) => {
    var _a;
    if (typeof document !== "undefined" && blockers.length) {
      for (const blocker of blockers) {
        const allowed = await blocker();
        if (!allowed) {
          (_a = opts.onBlocked) == null ? void 0 : _a.call(opts, onUpdate);
          return;
        }
      }
    }
    task();
  };
  return {
    get location() {
      return location;
    },
    subscribe: (cb) => {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
    push: (path, state) => {
      state = assignKey(state);
      tryNavigation(() => {
        opts.pushState(path, state);
        onUpdate();
      });
    },
    replace: (path, state) => {
      state = assignKey(state);
      tryNavigation(() => {
        opts.replaceState(path, state);
        onUpdate();
      });
    },
    go: (index) => {
      tryNavigation(() => {
        opts.go(index);
        onUpdate();
      });
    },
    back: () => {
      tryNavigation(() => {
        opts.back();
        onUpdate();
      });
    },
    forward: () => {
      tryNavigation(() => {
        opts.forward();
        onUpdate();
      });
    },
    createHref: (str) => opts.createHref(str),
    block: (blocker) => {
      blockers.push(blocker);
      if (blockers.length === 1) {
        addEventListener(beforeUnloadEvent, beforeUnloadListener, {
          capture: true
        });
      }
      return () => {
        blockers = blockers.filter((b) => b !== blocker);
        if (!blockers.length) {
          stopBlocking();
        }
      };
    },
    flush: () => {
      var _a;
      return (_a = opts.flush) == null ? void 0 : _a.call(opts);
    },
    destroy: () => {
      var _a;
      return (_a = opts.destroy) == null ? void 0 : _a.call(opts);
    },
    notify: onUpdate
  };
}
function assignKey(state) {
  if (!state) {
    state = {};
  }
  return {
    ...state,
    key: createRandomKey()
  };
}
function createBrowserHistory(opts) {
  const win = (opts == null ? void 0 : opts.window) ?? (typeof document !== "undefined" ? window : void 0);
  const createHref = (opts == null ? void 0 : opts.createHref) ?? ((path) => path);
  const parseLocation = (opts == null ? void 0 : opts.parseLocation) ?? (() => parseHref(
    `${win.location.pathname}${win.location.search}${win.location.hash}`,
    win.history.state
  ));
  let currentLocation = parseLocation();
  let rollbackLocation;
  const getLocation = () => currentLocation;
  let next;
  let tracking = true;
  let scheduled;
  const untrack = (fn) => {
    tracking = false;
    fn();
    tracking = true;
  };
  const flush = () => {
    untrack(() => {
      if (!next)
        return;
      win.history[next.isPush ? "pushState" : "replaceState"](
        next.state,
        "",
        next.href
      );
      next = void 0;
      scheduled = void 0;
      rollbackLocation = void 0;
    });
  };
  const queueHistoryAction = (type, destHref, state) => {
    const href = createHref(destHref);
    if (!scheduled) {
      rollbackLocation = currentLocation;
    }
    currentLocation = parseHref(destHref, state);
    next = {
      href,
      state,
      isPush: (next == null ? void 0 : next.isPush) || type === "push"
    };
    if (!scheduled) {
      scheduled = Promise.resolve().then(() => flush());
    }
  };
  const onPushPop = () => {
    currentLocation = parseLocation();
    history.notify();
  };
  const originalPushState = win.history.pushState;
  const originalReplaceState = win.history.replaceState;
  const history = createHistory({
    getLocation,
    pushState: (href, state) => queueHistoryAction("push", href, state),
    replaceState: (href, state) => queueHistoryAction("replace", href, state),
    back: () => win.history.back(),
    forward: () => win.history.forward(),
    go: (n) => win.history.go(n),
    createHref: (href) => createHref(href),
    flush,
    destroy: () => {
      win.history.pushState = originalPushState;
      win.history.replaceState = originalReplaceState;
      win.removeEventListener(pushStateEvent, onPushPop);
      win.removeEventListener(popStateEvent, onPushPop);
    },
    onBlocked: (onUpdate) => {
      if (rollbackLocation && currentLocation !== rollbackLocation) {
        currentLocation = rollbackLocation;
        onUpdate();
      }
    }
  });
  win.addEventListener(pushStateEvent, onPushPop);
  win.addEventListener(popStateEvent, onPushPop);
  win.history.pushState = function(...args) {
    const res = originalPushState.apply(win.history, args);
    if (tracking)
      history.notify();
    return res;
  };
  win.history.replaceState = function(...args) {
    const res = originalReplaceState.apply(win.history, args);
    if (tracking)
      history.notify();
    return res;
  };
  return history;
}
function createHashHistory(opts) {
  const win = (opts == null ? void 0 : opts.window) ?? (typeof document !== "undefined" ? window : void 0);
  return createBrowserHistory({
    window: win,
    parseLocation: () => {
      const hashHref = win.location.hash.split("#").slice(1).join("#") ?? "/";
      return parseHref(hashHref, win.history.state);
    },
    createHref: (href) => `${win.location.pathname}${win.location.search}#${href}`
  });
}
function createMemoryHistory(opts = {
  initialEntries: ["/"]
}) {
  const entries = opts.initialEntries;
  let index = opts.initialIndex ?? entries.length - 1;
  let currentState = {
    key: createRandomKey()
  };
  const getLocation = () => parseHref(entries[index], currentState);
  return createHistory({
    getLocation,
    pushState: (path, state) => {
      currentState = state;
      entries.push(path);
      index++;
    },
    replaceState: (path, state) => {
      currentState = state;
      entries[index] = path;
    },
    back: () => {
      index--;
    },
    forward: () => {
      index = Math.min(index + 1, entries.length - 1);
    },
    go: (n) => {
      index = Math.min(Math.max(index + n, 0), entries.length - 1);
    },
    createHref: (path) => path
  });
}
function parseHref(href, state) {
  const hashIndex = href.indexOf("#");
  const searchIndex = href.indexOf("?");
  return {
    href,
    pathname: href.substring(
      0,
      hashIndex > 0 ? searchIndex > 0 ? Math.min(hashIndex, searchIndex) : hashIndex : searchIndex > 0 ? searchIndex : href.length
    ),
    hash: hashIndex > -1 ? href.substring(hashIndex) : "",
    search: searchIndex > -1 ? href.slice(searchIndex, hashIndex === -1 ? void 0 : hashIndex) : "",
    state: state || {}
  };
}
function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}

// node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var isProduction = false;
var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction) {
    throw new Error(prefix);
  }
  var provided = typeof message === "function" ? message() : message;
  var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
  throw new Error(value);
}

// node_modules/tiny-warning/dist/tiny-warning.esm.js
var isProduction2 = false;
function warning(condition, message) {
  if (!isProduction2) {
    if (condition) {
      return;
    }
    var text = "Warning: " + message;
    if (typeof console !== "undefined") {
      console.warn(text);
    }
    try {
      throw Error(text);
    } catch (x) {
    }
  }
}
var tiny_warning_esm_default = warning;

// node_modules/@tanstack/react-router/dist/esm/awaited.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var React8 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-router/dist/esm/useRouter.js
var React2 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-router/dist/esm/routerContext.js
var React = __toESM(require_react(), 1);
var routerContext = React.createContext(null);
function getRouterContext() {
  if (typeof document === "undefined") {
    return routerContext;
  }
  if (window.__TSR_ROUTER_CONTEXT__) {
    return window.__TSR_ROUTER_CONTEXT__;
  }
  window.__TSR_ROUTER_CONTEXT__ = routerContext;
  return routerContext;
}

// node_modules/@tanstack/react-router/dist/esm/useRouter.js
function useRouter(opts) {
  const value = React2.useContext(getRouterContext());
  tiny_warning_esm_default(
    !(((opts == null ? void 0 : opts.warn) ?? true) && !value),
    "useRouter must be used inside a <RouterProvider> component!"
  );
  return value;
}

// node_modules/@tanstack/react-store/build/modern/index.js
var import_with_selector = __toESM(require_with_selector());

// node_modules/@tanstack/store/build/modern/index.js
var Store = class {
  constructor(initialState, options) {
    this.listeners = /* @__PURE__ */ new Set();
    this._batching = false;
    this._flushing = 0;
    this._nextPriority = null;
    this.subscribe = (listener) => {
      var _a, _b;
      this.listeners.add(listener);
      const unsub = (_b = (_a = this.options) == null ? void 0 : _a.onSubscribe) == null ? void 0 : _b.call(_a, listener, this);
      return () => {
        this.listeners.delete(listener);
        unsub == null ? void 0 : unsub();
      };
    };
    this.setState = (updater, opts) => {
      var _a, _b, _c, _d, _e;
      const previous = this.state;
      this.state = ((_a = this.options) == null ? void 0 : _a.updateFn) ? this.options.updateFn(previous)(updater) : updater(previous);
      const priority = (opts == null ? void 0 : opts.priority) ?? ((_b = this.options) == null ? void 0 : _b.defaultPriority) ?? "high";
      if (this._nextPriority === null) {
        this._nextPriority = priority;
      } else if (this._nextPriority === "high") {
        this._nextPriority = priority;
      } else {
        this._nextPriority = ((_c = this.options) == null ? void 0 : _c.defaultPriority) ?? "high";
      }
      (_e = (_d = this.options) == null ? void 0 : _d.onUpdate) == null ? void 0 : _e.call(_d, {
        priority: this._nextPriority
      });
      this._flush();
    };
    this._flush = () => {
      if (this._batching)
        return;
      const flushId = ++this._flushing;
      this.listeners.forEach((listener) => {
        if (this._flushing !== flushId)
          return;
        listener({
          priority: this._nextPriority ?? "high"
        });
      });
    };
    this.batch = (cb) => {
      if (this._batching)
        return cb();
      this._batching = true;
      cb();
      this._batching = false;
      this._flush();
    };
    this.state = initialState;
    this.options = options;
  }
};

// node_modules/@tanstack/react-store/build/modern/index.js
function useStore(store, selector = (d) => d) {
  const slice = (0, import_with_selector.useSyncExternalStoreWithSelector)(
    store.subscribe,
    () => store.state,
    () => store.state,
    selector,
    shallow
  );
  return slice;
}
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}

// node_modules/@tanstack/react-router/dist/esm/Matches.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var React5 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var React3 = __toESM(require_react(), 1);
function CatchBoundary(props) {
  const errorComponent = props.errorComponent ?? ErrorComponent;
  return (0, import_jsx_runtime.jsx)(
    CatchBoundaryImpl,
    {
      getResetKey: props.getResetKey,
      onCatch: props.onCatch,
      children: ({ error, reset }) => {
        if (error) {
          return React3.createElement(errorComponent, {
            error,
            reset
          });
        }
        return props.children;
      }
    }
  );
}
var CatchBoundaryImpl = class extends React3.Component {
  constructor() {
    super(...arguments);
    this.state = { error: null };
  }
  static getDerivedStateFromProps(props) {
    return { resetKey: props.getResetKey() };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  reset() {
    this.setState({ error: null });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.error && prevState.resetKey !== this.state.resetKey) {
      this.reset();
    }
  }
  componentDidCatch(error) {
    if (this.props.onCatch) {
      this.props.onCatch(error);
    } else {
      console.error(error);
    }
  }
  render() {
    return this.props.children({
      error: this.state.error,
      reset: () => {
        this.reset();
      }
    });
  }
};
function ErrorComponent({ error }) {
  const [show, setShow] = React3.useState(true);
  return (0, import_jsx_runtime.jsxs)("div", { style: { padding: ".5rem", maxWidth: "100%" }, children: [
    (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: ".5rem" }, children: [
      (0, import_jsx_runtime.jsx)("strong", { style: { fontSize: "1rem" }, children: "Something went wrong!" }),
      (0, import_jsx_runtime.jsx)(
        "button",
        {
          style: {
            appearance: "none",
            fontSize: ".6em",
            border: "1px solid currentColor",
            padding: ".1rem .2rem",
            fontWeight: "bold",
            borderRadius: ".25rem"
          },
          onClick: () => setShow((d) => !d),
          children: show ? "Hide Error" : "Show Error"
        }
      )
    ] }),
    (0, import_jsx_runtime.jsx)("div", { style: { height: ".25rem" } }),
    show ? (0, import_jsx_runtime.jsx)("div", { children: (0, import_jsx_runtime.jsx)(
      "pre",
      {
        style: {
          fontSize: ".7em",
          border: "1px solid red",
          borderRadius: ".25rem",
          padding: ".3rem",
          color: "red",
          overflow: "auto"
        },
        children: error.message ? (0, import_jsx_runtime.jsx)("code", { children: error.message }) : null
      }
    ) }) : null
  ] });
}

// node_modules/@tanstack/react-router/dist/esm/useRouterState.js
function useRouterState(opts) {
  const contextRouter = useRouter({
    warn: (opts == null ? void 0 : opts.router) === void 0
  });
  return useStore(((opts == null ? void 0 : opts.router) || contextRouter).__store, opts == null ? void 0 : opts.select);
}

// node_modules/@tanstack/react-router/dist/esm/utils.js
var React4 = __toESM(require_react(), 1);
var isServer = typeof document === "undefined";
function last(arr) {
  return arr[arr.length - 1];
}
function isFunction(d) {
  return typeof d === "function";
}
function functionalUpdate(updater, previous) {
  if (isFunction(updater)) {
    return updater(previous);
  }
  return updater;
}
function pick(parent, keys) {
  return keys.reduce((obj, key) => {
    obj[key] = parent[key];
    return obj;
  }, {});
}
function replaceEqualDeep(prev, _next) {
  if (prev === _next) {
    return prev;
  }
  const next = _next;
  const array = isPlainArray(prev) && isPlainArray(next);
  if (array || isPlainObject(prev) && isPlainObject(next)) {
    const prevItems = array ? prev : Object.keys(prev);
    const prevSize = prevItems.length;
    const nextItems = array ? next : Object.keys(next);
    const nextSize = nextItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < nextSize; i++) {
      const key = array ? i : nextItems[i];
      if (!array && prev[key] === void 0 && next[key] === void 0 && prevItems.includes(key)) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(prev[key], next[key]);
        if (copy[key] === prev[key] && prev[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return prevSize === nextSize && equalItems === prevSize ? prev : copy;
  }
  return next;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function deepEqual(a, b, partial = false) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (!partial && aKeys.length !== bKeys.length) {
      return false;
    }
    return !bKeys.some(
      (key) => !(key in a) || !deepEqual(a[key], b[key], partial)
    );
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return !a.some((item, index) => !deepEqual(item, b[index], partial));
  }
  return false;
}
function useStableCallback(fn) {
  const fnRef = React4.useRef(fn);
  fnRef.current = fn;
  const ref = React4.useRef((...args) => fnRef.current(...args));
  return ref.current;
}
function shallow2(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (const item of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, item) || !Object.is(objA[item], objB[item])) {
      return false;
    }
  }
  return true;
}
var useLayoutEffect2 = typeof window !== "undefined" ? React4.useLayoutEffect : React4.useEffect;
function escapeJSON(jsonString) {
  return jsonString.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');
}
function removeTrailingSlash(value) {
  if (value.endsWith("/") && value !== "/") {
    return value.slice(0, -1);
  }
  return value;
}
function exactPathTest(pathName1, pathName2) {
  return removeTrailingSlash(pathName1) === removeTrailingSlash(pathName2);
}

// node_modules/@tanstack/react-router/dist/esm/not-found.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function notFound(options = {}) {
  options.isNotFound = true;
  if (options.throw)
    throw options;
  return options;
}
function isNotFound(obj) {
  return !!(obj == null ? void 0 : obj.isNotFound);
}
function CatchNotFound(props) {
  const resetKey = useRouterState({
    select: (s) => `not-found-${s.location.pathname}-${s.status}`
  });
  return (0, import_jsx_runtime2.jsx)(
    CatchBoundary,
    {
      getResetKey: () => resetKey,
      onCatch: (error) => {
        var _a;
        if (isNotFound(error)) {
          (_a = props.onCatch) == null ? void 0 : _a.call(props, error);
        } else {
          throw error;
        }
      },
      errorComponent: ({ error }) => {
        var _a;
        return (_a = props.fallback) == null ? void 0 : _a.call(props, error);
      },
      children: props.children
    }
  );
}
function DefaultGlobalNotFound() {
  return (0, import_jsx_runtime2.jsx)("p", { children: "Not Found" });
}

// node_modules/@tanstack/react-router/dist/esm/redirects.js
function redirect(opts) {
  opts.isRedirect = true;
  opts.statusCode = opts.statusCode || opts.code || 301;
  opts.headers = opts.headers || {};
  if (opts.throw) {
    throw opts;
  }
  return opts;
}
function isRedirect(obj) {
  return !!(obj == null ? void 0 : obj.isRedirect);
}

// node_modules/@tanstack/react-router/dist/esm/Matches.js
var matchContext = React5.createContext(void 0);
function Matches() {
  useRouter();
  const matchId = useRouterState({
    select: (s) => {
      var _a;
      return (_a = getRenderedMatches(s)[0]) == null ? void 0 : _a.id;
    }
  });
  const resetKey = useRouterState({
    select: (s) => s.resolvedLocation.state.key
  });
  return (0, import_jsx_runtime3.jsx)(matchContext.Provider, { value: matchId, children: (0, import_jsx_runtime3.jsx)(
    CatchBoundary,
    {
      getResetKey: () => resetKey,
      errorComponent: ErrorComponent,
      onCatch: (error) => {
        tiny_warning_esm_default(
          false,
          `The following error wasn't caught by any route! 👇 At the very least, consider setting an 'errorComponent' in your RootRoute!`
        );
        console.error(error);
      },
      children: matchId ? (0, import_jsx_runtime3.jsx)(Match, { matchId }) : null
    }
  ) });
}
function SafeFragment(props) {
  return (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: props.children });
}
function Match({ matchId }) {
  var _a, _b, _c, _d;
  const router = useRouter();
  const routeId = useRouterState({
    select: (s) => {
      var _a2;
      return (_a2 = getRenderedMatches(s).find((d) => d.id === matchId)) == null ? void 0 : _a2.routeId;
    }
  });
  invariant(
    routeId,
    `Could not find routeId for matchId "${matchId}". Please file an issue!`
  );
  const route = router.routesById[routeId];
  const PendingComponent = route.options.pendingComponent ?? router.options.defaultPendingComponent;
  const pendingElement = PendingComponent ? (0, import_jsx_runtime3.jsx)(PendingComponent, {}) : null;
  const routeErrorComponent = route.options.errorComponent ?? router.options.defaultErrorComponent;
  const routeNotFoundComponent = route.isRoot ? (
    // If it's the root route, use the globalNotFound option, with fallback to the notFoundRoute's component
    route.options.notFoundComponent ?? ((_a = router.options.notFoundRoute) == null ? void 0 : _a.options.component)
  ) : route.options.notFoundComponent;
  const ResolvedSuspenseBoundary = route.options.wrapInSuspense ?? PendingComponent ?? ((_b = route.options.component) == null ? void 0 : _b.preload) ?? ((_c = route.options.pendingComponent) == null ? void 0 : _c.preload) ?? ((_d = route.options.errorComponent) == null ? void 0 : _d.preload) ? React5.Suspense : SafeFragment;
  const ResolvedCatchBoundary = routeErrorComponent ? CatchBoundary : SafeFragment;
  const ResolvedNotFoundBoundary = routeNotFoundComponent ? CatchNotFound : SafeFragment;
  const resetKey = useRouterState({
    select: (s) => s.resolvedLocation.state.key
  });
  return (0, import_jsx_runtime3.jsx)(matchContext.Provider, { value: matchId, children: (0, import_jsx_runtime3.jsx)(ResolvedSuspenseBoundary, { fallback: pendingElement, children: (0, import_jsx_runtime3.jsx)(
    ResolvedCatchBoundary,
    {
      getResetKey: () => resetKey,
      errorComponent: routeErrorComponent ?? ErrorComponent,
      onCatch: (error) => {
        if (isNotFound(error))
          throw error;
        tiny_warning_esm_default(false, `Error in route match: ${matchId}`);
        console.error(error);
      },
      children: (0, import_jsx_runtime3.jsx)(
        ResolvedNotFoundBoundary,
        {
          fallback: (error) => {
            if (!routeNotFoundComponent || error.routeId && error.routeId !== routeId || !error.routeId && !route.isRoot)
              throw error;
            return React5.createElement(routeNotFoundComponent, error);
          },
          children: (0, import_jsx_runtime3.jsx)(MatchInner, { matchId, pendingElement })
        }
      )
    }
  ) }) });
}
function MatchInner({
  matchId,
  pendingElement
}) {
  var _a, _b;
  const router = useRouter();
  const routeId = useRouterState({
    select: (s) => {
      var _a2;
      return (_a2 = getRenderedMatches(s).find((d) => d.id === matchId)) == null ? void 0 : _a2.routeId;
    }
  });
  const route = router.routesById[routeId];
  const match = useRouterState({
    select: (s) => pick(getRenderedMatches(s).find((d) => d.id === matchId), [
      "status",
      "error",
      "showPending",
      "loadPromise"
    ])
  });
  const RouteErrorComponent = (route.options.errorComponent ?? router.options.defaultErrorComponent) || ErrorComponent;
  if (match.status === "notFound") {
    let error;
    if (isServerSideError(match.error)) {
      const deserializeError = ((_a = router.options.errorSerializer) == null ? void 0 : _a.deserialize) ?? defaultDeserializeError;
      error = deserializeError(match.error.data);
    } else {
      error = match.error;
    }
    invariant(isNotFound(error), "Expected a notFound error");
    return renderRouteNotFound(router, route, error);
  }
  if (match.status === "redirected") {
    invariant(isRedirect(match.error), "Expected a redirect error");
    tiny_warning_esm_default(
      false,
      "Tried to render a redirected route match! This is a weird circumstance, please file an issue!"
    );
    return null;
  }
  if (match.status === "error") {
    if (isServer) {
      return (0, import_jsx_runtime3.jsx)(
        RouteErrorComponent,
        {
          error: match.error,
          info: {
            componentStack: ""
          }
        }
      );
    }
    if (isServerSideError(match.error)) {
      const deserializeError = ((_b = router.options.errorSerializer) == null ? void 0 : _b.deserialize) ?? defaultDeserializeError;
      throw deserializeError(match.error.data);
    } else {
      throw match.error;
    }
  }
  if (match.status === "pending") {
    if (match.showPending) {
      return pendingElement;
    }
    throw match.loadPromise;
  }
  if (match.status === "success") {
    const Comp = route.options.component ?? router.options.defaultComponent;
    if (Comp) {
      return (0, import_jsx_runtime3.jsx)(Comp, {});
    }
    return (0, import_jsx_runtime3.jsx)(Outlet, {});
  }
  invariant(
    false,
    "Idle routeMatch status encountered during rendering! You should never see this. File an issue!"
  );
}
var Outlet = React5.memo(function Outlet2() {
  const router = useRouter();
  const matchId = React5.useContext(matchContext);
  const routeId = useRouterState({
    select: (s) => {
      var _a;
      return (_a = getRenderedMatches(s).find((d) => d.id === matchId)) == null ? void 0 : _a.routeId;
    }
  });
  const route = router.routesById[routeId];
  const { parentGlobalNotFound } = useRouterState({
    select: (s) => {
      const matches = getRenderedMatches(s);
      const parentMatch = matches.find((d) => d.id === matchId);
      invariant(
        parentMatch,
        `Could not find parent match for matchId "${matchId}"`
      );
      return {
        parentGlobalNotFound: parentMatch.globalNotFound
      };
    }
  });
  const childMatchId = useRouterState({
    select: (s) => {
      var _a;
      const matches = getRenderedMatches(s);
      const index = matches.findIndex((d) => d.id === matchId);
      return (_a = matches[index + 1]) == null ? void 0 : _a.id;
    }
  });
  if (parentGlobalNotFound) {
    return renderRouteNotFound(router, route, void 0);
  }
  if (!childMatchId) {
    return null;
  }
  return (0, import_jsx_runtime3.jsx)(Match, { matchId: childMatchId });
});
function renderRouteNotFound(router, route, data) {
  if (!route.options.notFoundComponent) {
    if (router.options.defaultNotFoundComponent) {
      return (0, import_jsx_runtime3.jsx)(router.options.defaultNotFoundComponent, { data });
    }
    if (true) {
      tiny_warning_esm_default(
        route.options.notFoundComponent,
        `A notFoundError was encountered on the route with ID "${route.id}", but a notFoundComponent option was not configured, nor was a router level defaultNotFoundComponent configured. Consider configuring at least one of these to avoid TanStack Router's overly generic defaultNotFoundComponent (<div>Not Found<div>)`
      );
    }
    return (0, import_jsx_runtime3.jsx)(DefaultGlobalNotFound, {});
  }
  return (0, import_jsx_runtime3.jsx)(route.options.notFoundComponent, { data });
}
function useMatchRoute() {
  const router = useRouter();
  return React5.useCallback(
    (opts) => {
      const { pending, caseSensitive, fuzzy, includeSearch, ...rest } = opts;
      return router.matchRoute(rest, {
        pending,
        caseSensitive,
        fuzzy,
        includeSearch
      });
    },
    [router]
  );
}
function MatchRoute(props) {
  const matchRoute = useMatchRoute();
  const params = matchRoute(props);
  if (typeof props.children === "function") {
    return props.children(params);
  }
  return params ? props.children : null;
}
function getRenderedMatches(state) {
  var _a;
  return ((_a = state.pendingMatches) == null ? void 0 : _a.some((d) => d.showPending)) ? state.pendingMatches : state.matches;
}
function useMatch(opts) {
  const nearestMatchId = React5.useContext(matchContext);
  const matchSelection = useRouterState({
    select: (state) => {
      const match = getRenderedMatches(state).find(
        (d) => opts.from ? opts.from === d.routeId : d.id === nearestMatchId
      );
      invariant(
        match,
        `Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`
      );
      return opts.select ? opts.select(match) : match;
    }
  });
  return matchSelection;
}
function useMatches(opts) {
  return useRouterState({
    select: (state) => {
      const matches = getRenderedMatches(state);
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    }
  });
}
function useParentMatches(opts) {
  const contextMatchId = React5.useContext(matchContext);
  return useMatches({
    select: (matches) => {
      matches = matches.slice(
        0,
        matches.findIndex((d) => d.id === contextMatchId)
      );
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    }
  });
}
function useChildMatches(opts) {
  const contextMatchId = React5.useContext(matchContext);
  return useMatches({
    select: (matches) => {
      matches = matches.slice(
        matches.findIndex((d) => d.id === contextMatchId) + 1
      );
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    }
  });
}
function useLoaderDeps(opts) {
  return useMatch({
    ...opts,
    select: (s) => {
      return typeof opts.select === "function" ? opts.select(s.loaderDeps) : s.loaderDeps;
    }
  });
}
function useLoaderData(opts) {
  return useMatch({
    ...opts,
    select: (s) => {
      return typeof opts.select === "function" ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}
function isServerSideError(error) {
  if (!(typeof error === "object" && error && "data" in error))
    return false;
  if (!("__isServerError" in error && error.__isServerError))
    return false;
  if (!(typeof error.data === "object" && error.data))
    return false;
  return error.__isServerError === true;
}
function defaultDeserializeError(serializedData) {
  if ("name" in serializedData && "message" in serializedData) {
    const error = new Error(serializedData.message);
    error.name = serializedData.name;
    if (true) {
      error.stack = serializedData.stack;
    }
    return error;
  }
  return serializedData.data;
}

// node_modules/@tanstack/react-router/dist/esm/path.js
function joinPaths(paths) {
  return cleanPath(paths.filter(Boolean).join("/"));
}
function cleanPath(path) {
  return path.replace(/\/{2,}/g, "/");
}
function trimPathLeft(path) {
  return path === "/" ? path : path.replace(/^\/{1,}/, "");
}
function trimPathRight(path) {
  return path === "/" ? path : path.replace(/\/{1,}$/, "");
}
function trimPath(path) {
  return trimPathRight(trimPathLeft(path));
}
function resolvePath(basepath, base, to) {
  var _a;
  base = base.replace(new RegExp(`^${basepath}`), "/");
  to = to.replace(new RegExp(`^${basepath}`), "/");
  let baseSegments = parsePathname(base);
  const toSegments = parsePathname(to);
  if (baseSegments.length > 1 && ((_a = last(baseSegments)) == null ? void 0 : _a.value) === "/") {
    baseSegments.pop();
  }
  toSegments.forEach((toSegment, index) => {
    if (toSegment.value === "/") {
      if (!index) {
        baseSegments = [toSegment];
      } else if (index === toSegments.length - 1) {
        baseSegments.push(toSegment);
      } else
        ;
    } else if (toSegment.value === "..") {
      baseSegments.pop();
    } else if (toSegment.value === ".")
      ;
    else {
      baseSegments.push(toSegment);
    }
  });
  const joined = joinPaths([basepath, ...baseSegments.map((d) => d.value)]);
  return cleanPath(trimPathRight(joined));
}
function parsePathname(pathname) {
  if (!pathname) {
    return [];
  }
  pathname = cleanPath(pathname);
  const segments = [];
  if (pathname.slice(0, 1) === "/") {
    pathname = pathname.substring(1);
    segments.push({
      type: "pathname",
      value: "/"
    });
  }
  if (!pathname) {
    return segments;
  }
  const split = pathname.split("/").filter(Boolean);
  segments.push(
    ...split.map((part) => {
      if (part === "$" || part === "*") {
        return {
          type: "wildcard",
          value: part
        };
      }
      if (part.charAt(0) === "$") {
        return {
          type: "param",
          value: part
        };
      }
      return {
        type: "pathname",
        value: part
      };
    })
  );
  if (pathname.slice(-1) === "/") {
    pathname = pathname.substring(1);
    segments.push({
      type: "pathname",
      value: "/"
    });
  }
  return segments;
}
function interpolatePath({
  path,
  params,
  leaveWildcards,
  leaveParams
}) {
  const interpolatedPathSegments = parsePathname(path);
  return joinPaths(
    interpolatedPathSegments.map((segment) => {
      if (segment.type === "wildcard") {
        const value = params._splat;
        if (leaveWildcards)
          return `${segment.value}${value ?? ""}`;
        return value;
      }
      if (segment.type === "param") {
        if (leaveParams) {
          const value = params[segment.value];
          return `${segment.value}${value ?? ""}`;
        }
        return params[segment.value.substring(1)] ?? "undefined";
      }
      return segment.value;
    })
  );
}
function matchPathname(basepath, currentPathname, matchLocation) {
  const pathParams = matchByPath(basepath, currentPathname, matchLocation);
  if (matchLocation.to && !pathParams) {
    return;
  }
  return pathParams ?? {};
}
function removeBasepath(basepath, pathname) {
  return basepath != "/" ? pathname.replace(basepath, "") : pathname;
}
function matchByPath(basepath, from, matchLocation) {
  from = removeBasepath(basepath, from);
  const to = removeBasepath(basepath, `${matchLocation.to ?? "$"}`);
  const baseSegments = parsePathname(from);
  const routeSegments = parsePathname(to);
  if (!from.startsWith("/")) {
    baseSegments.unshift({
      type: "pathname",
      value: "/"
    });
  }
  if (!to.startsWith("/")) {
    routeSegments.unshift({
      type: "pathname",
      value: "/"
    });
  }
  const params = {};
  const isMatch = (() => {
    for (let i = 0; i < Math.max(baseSegments.length, routeSegments.length); i++) {
      const baseSegment = baseSegments[i];
      const routeSegment = routeSegments[i];
      const isLastBaseSegment = i >= baseSegments.length - 1;
      const isLastRouteSegment = i >= routeSegments.length - 1;
      if (routeSegment) {
        if (routeSegment.type === "wildcard") {
          if (baseSegment == null ? void 0 : baseSegment.value) {
            const _splat = decodeURI(
              joinPaths(baseSegments.slice(i).map((d) => d.value))
            );
            params["*"] = _splat;
            params["_splat"] = _splat;
            return true;
          }
          return false;
        }
        if (routeSegment.type === "pathname") {
          if (routeSegment.value === "/" && !(baseSegment == null ? void 0 : baseSegment.value)) {
            return true;
          }
          if (baseSegment) {
            if (matchLocation.caseSensitive) {
              if (routeSegment.value !== baseSegment.value) {
                return false;
              }
            } else if (routeSegment.value.toLowerCase() !== baseSegment.value.toLowerCase()) {
              return false;
            }
          }
        }
        if (!baseSegment) {
          return false;
        }
        if (routeSegment.type === "param") {
          if (baseSegment.value === "/") {
            return false;
          }
          if (baseSegment.value.charAt(0) !== "$") {
            params[routeSegment.value.substring(1)] = decodeURI(
              baseSegment.value
            );
          }
        }
      }
      if (!isLastBaseSegment && isLastRouteSegment) {
        params["**"] = joinPaths(baseSegments.slice(i + 1).map((d) => d.value));
        return !!matchLocation.fuzzy && (routeSegment == null ? void 0 : routeSegment.value) !== "/";
      }
    }
    return true;
  })();
  return isMatch ? params : void 0;
}

// node_modules/@tanstack/react-router/dist/esm/useParams.js
function useParams(opts) {
  return useMatch({
    ...opts,
    select: (match) => {
      return opts.select ? opts.select(match.params) : match.params;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useSearch.js
function useSearch(opts) {
  return useMatch({
    ...opts,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useNavigate.js
var React6 = __toESM(require_react(), 1);
function useNavigate(_defaultOpts) {
  const router = useRouter();
  return React6.useCallback(
    (options) => {
      return router.navigate({
        ...options,
        from: options.to ? router.state.resolvedLocation.pathname : void 0
      });
    },
    [router]
  );
}
function Navigate(props) {
  const { navigate } = useRouter();
  const match = useMatch({ strict: false });
  React6.useEffect(() => {
    navigate({
      from: props.to ? match.pathname : void 0,
      ...props
    });
  }, []);
  return null;
}

// node_modules/@tanstack/react-router/dist/esm/route.js
var rootRouteId = "__root__";
function getRouteApi(id) {
  return new RouteApi({ id });
}
var RouteApi = class {
  /**
   * @deprecated Use the `getRouteApi` function instead.
   */
  constructor({ id }) {
    this.useMatch = (opts) => {
      return useMatch({ select: opts == null ? void 0 : opts.select, from: this.id });
    };
    this.useRouteContext = (opts) => {
      return useMatch({
        from: this.id,
        select: (d) => (opts == null ? void 0 : opts.select) ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return useSearch({ ...opts, from: this.id });
    };
    this.useParams = (opts) => {
      return useParams({ ...opts, from: this.id });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({ ...opts, from: this.id, strict: false });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({ ...opts, from: this.id, strict: false });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.id });
    };
    this.notFound = (opts) => {
      return notFound({ routeId: this.id, ...opts });
    };
    this.id = id;
  }
};
var Route = class {
  /**
   * @deprecated Use the `createRoute` function instead.
   */
  constructor(options) {
    this.init = (opts) => {
      var _a, _b;
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !(options2 == null ? void 0 : options2.path) && !(options2 == null ? void 0 : options2.id);
      this.parentRoute = (_b = (_a = this.options) == null ? void 0 : _a.getParentRoute) == null ? void 0 : _b.call(_a);
      if (isRoot) {
        this.path = rootRouteId;
      } else {
        invariant(
          this.parentRoute,
          `Child Route instances must pass a 'getParentRoute: () => ParentRoute' option that returns a Route instance.`
        );
      }
      let path = isRoot ? rootRouteId : options2.path;
      if (path && path !== "/") {
        path = trimPathLeft(path);
      }
      const customId = (options2 == null ? void 0 : options2.id) || path;
      let id = isRoot ? rootRouteId : joinPaths([
        this.parentRoute.id === rootRouteId ? "" : this.parentRoute.id,
        customId
      ]);
      if (path === rootRouteId) {
        path = "/";
      }
      if (id !== rootRouteId) {
        id = joinPaths(["/", id]);
      }
      const fullPath = id === rootRouteId ? "/" : joinPaths([this.parentRoute.fullPath, path]);
      this.path = path;
      this.id = id;
      this.fullPath = fullPath;
      this.to = fullPath;
    };
    this.addChildren = (children) => {
      this.children = children;
      return this;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn2) => {
      this.lazyFn = lazyFn2;
      return this;
    };
    this.useMatch = (opts) => {
      return useMatch({ ...opts, from: this.id });
    };
    this.useRouteContext = (opts) => {
      return useMatch({
        ...opts,
        from: this.id,
        select: (d) => (opts == null ? void 0 : opts.select) ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return useSearch({ ...opts, from: this.id });
    };
    this.useParams = (opts) => {
      return useParams({ ...opts, from: this.id });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.id });
    };
    this.options = options || {};
    this.isRoot = !(options == null ? void 0 : options.getParentRoute);
    invariant(
      !((options == null ? void 0 : options.id) && (options == null ? void 0 : options.path)),
      `Route cannot have both an 'id' and a 'path' option.`
    );
    this.$$typeof = Symbol.for("react.memo");
  }
};
function createRoute(options) {
  return new Route(options);
}
function createRootRouteWithContext() {
  return (options) => {
    return createRootRoute(options);
  };
}
var rootRouteWithContext = createRootRouteWithContext;
var RootRoute = class extends Route {
  /**
   * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
   */
  constructor(options) {
    super(options);
  }
};
function createRootRoute(options) {
  return new RootRoute(options);
}
function createRouteMask(opts) {
  return opts;
}
var NotFoundRoute = class extends Route {
  constructor(options) {
    super({
      ...options,
      id: "404"
    });
  }
};

// node_modules/@tanstack/react-router/dist/esm/qss.js
function encode(obj, pfx) {
  let k, i, tmp, str = "";
  for (k in obj) {
    if ((tmp = obj[k]) !== void 0) {
      if (Array.isArray(tmp)) {
        for (i = 0; i < tmp.length; i++) {
          str && (str += "&");
          str += encodeURIComponent(k) + "=" + encodeURIComponent(tmp[i]);
        }
      } else {
        str && (str += "&");
        str += encodeURIComponent(k) + "=" + encodeURIComponent(tmp);
      }
    }
  }
  return (pfx || "") + str;
}
function toValue(mix) {
  if (!mix)
    return "";
  const str = decodeURIComponent(mix);
  if (str === "false")
    return false;
  if (str === "true")
    return true;
  return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str, pfx) {
  let tmp, k;
  const out = {}, arr = (pfx ? str.substr(pfx.length) : str).split("&");
  while (tmp = arr.shift()) {
    const equalIndex = tmp.indexOf("=");
    if (equalIndex !== -1) {
      k = tmp.slice(0, equalIndex);
      const value = tmp.slice(equalIndex + 1);
      if (out[k] !== void 0) {
        out[k] = [].concat(out[k], toValue(value));
      } else {
        out[k] = toValue(value);
      }
    } else {
      k = tmp;
      out[k] = "";
    }
  }
  return out;
}

// node_modules/@tanstack/react-router/dist/esm/searchParams.js
var defaultParseSearch = parseSearchWith(JSON.parse);
var defaultStringifySearch = stringifySearchWith(
  JSON.stringify,
  JSON.parse
);
function parseSearchWith(parser) {
  return (searchStr) => {
    if (searchStr.substring(0, 1) === "?") {
      searchStr = searchStr.substring(1);
    }
    const query = decode(searchStr);
    for (const key in query) {
      const value = query[key];
      if (typeof value === "string") {
        try {
          query[key] = parser(value);
        } catch (err) {
        }
      }
    }
    return query;
  };
}
function stringifySearchWith(stringify, parser) {
  function stringifyValue(val) {
    if (typeof val === "object" && val !== null) {
      try {
        return stringify(val);
      } catch (err) {
      }
    } else if (typeof val === "string" && typeof parser === "function") {
      try {
        parser(val);
        return stringify(val);
      } catch (err) {
      }
    }
    return val;
  }
  return (search) => {
    search = { ...search };
    Object.keys(search).forEach((key) => {
      const val = search[key];
      if (typeof val === "undefined" || val === void 0) {
        delete search[key];
      } else {
        search[key] = stringifyValue(val);
      }
    });
    const searchStr = encode(search).toString();
    return searchStr ? `?${searchStr}` : "";
  };
}

// node_modules/@tanstack/react-router/dist/esm/RouterProvider.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var React7 = __toESM(require_react(), 1);
var useTransition2 = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  React7.useTransition || (() => [
    false,
    (cb) => {
      cb();
    }
  ])
);
function RouterProvider({ router, ...rest }) {
  router.update({
    ...router.options,
    ...rest,
    context: {
      ...router.options.context,
      ...rest.context
    }
  });
  const matches = router.options.InnerWrap ? (0, import_jsx_runtime4.jsx)(router.options.InnerWrap, { children: (0, import_jsx_runtime4.jsx)(Matches, {}) }) : (0, import_jsx_runtime4.jsx)(Matches, {});
  const routerContext2 = getRouterContext();
  const provider = (0, import_jsx_runtime4.jsxs)(routerContext2.Provider, { value: router, children: [
    matches,
    (0, import_jsx_runtime4.jsx)(Transitioner, {})
  ] });
  if (router.options.Wrap) {
    return (0, import_jsx_runtime4.jsx)(router.options.Wrap, { children: provider });
  }
  return provider;
}
function Transitioner() {
  const router = useRouter();
  const mountLoadForRouter = React7.useRef({ router, mounted: false });
  const routerState = useRouterState({
    select: (s) => pick(s, ["isLoading", "location", "resolvedLocation", "isTransitioning"])
  });
  const [isTransitioning, startReactTransition] = useTransition2();
  router.startReactTransition = startReactTransition;
  React7.useEffect(() => {
    if (isTransitioning) {
      router.__store.setState((s) => ({
        ...s,
        isTransitioning
      }));
    }
  }, [isTransitioning, router]);
  const tryLoad = () => {
    const apply = (cb) => {
      if (!routerState.isTransitioning) {
        startReactTransition(() => cb());
      } else {
        cb();
      }
    };
    apply(() => {
      try {
        router.load();
      } catch (err) {
        console.error(err);
      }
    });
  };
  useLayoutEffect2(() => {
    const unsub = router.history.subscribe(() => {
      router.latestLocation = router.parseLocation(router.latestLocation);
      if (router.state.location !== router.latestLocation) {
        tryLoad();
      }
    });
    const nextLocation = router.buildLocation({
      to: router.latestLocation.pathname,
      search: true,
      params: true,
      hash: true,
      state: true
    });
    if (routerState.location.href !== nextLocation.href) {
      router.commitLocation({ ...nextLocation, replace: true });
    }
    return () => {
      unsub();
    };
  }, [router, router.history]);
  useLayoutEffect2(() => {
    if (React7.useTransition ? routerState.isTransitioning && !isTransitioning : !routerState.isLoading && routerState.resolvedLocation !== routerState.location) {
      router.emit({
        type: "onResolved",
        fromLocation: routerState.resolvedLocation,
        toLocation: routerState.location,
        pathChanged: routerState.location.href !== routerState.resolvedLocation.href
      });
      if (document.querySelector) {
        if (routerState.location.hash !== "") {
          const el = document.getElementById(routerState.location.hash);
          if (el) {
            el.scrollIntoView();
          }
        }
      }
      router.__store.setState((s) => ({
        ...s,
        isTransitioning: false,
        resolvedLocation: s.location
      }));
    }
  }, [
    routerState.isTransitioning,
    isTransitioning,
    routerState.isLoading,
    routerState.resolvedLocation,
    routerState.location,
    router
  ]);
  useLayoutEffect2(() => {
    if (window.__TSR_DEHYDRATED__ || mountLoadForRouter.current.router === router && mountLoadForRouter.current.mounted) {
      return;
    }
    mountLoadForRouter.current = { router, mounted: true };
    tryLoad();
  }, [router]);
  return null;
}
function getRouteMatch(state, id) {
  return [
    ...state.cachedMatches,
    ...state.pendingMatches ?? [],
    ...state.matches
  ].find((d) => d.id === id);
}

// node_modules/@tanstack/react-router/dist/esm/router.js
var componentTypes = [
  "component",
  "errorComponent",
  "pendingComponent",
  "notFoundComponent"
];
function createRouter(options) {
  return new Router(options);
}
var Router = class {
  /**
   * @deprecated Use the `createRouter` function instead
   */
  constructor(options) {
    this.tempLocationKey = `${Math.round(
      Math.random() * 1e7
    )}`;
    this.resetNextScroll = true;
    this.navigateTimeout = null;
    this.latestLoadPromise = Promise.resolve();
    this.subscribers = /* @__PURE__ */ new Set();
    this.injectedHtml = [];
    this.startReactTransition = (fn) => fn();
    this.update = (newOptions) => {
      if (newOptions.notFoundRoute) {
        console.warn(
          "The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/guide/not-found-errors#migrating-from-notfoundroute for more info."
        );
      }
      const previousOptions = this.options;
      this.options = {
        ...this.options,
        ...newOptions
      };
      if (!this.basepath || newOptions.basepath && newOptions.basepath !== previousOptions.basepath) {
        if (newOptions.basepath === void 0 || newOptions.basepath === "" || newOptions.basepath === "/") {
          this.basepath = "/";
        } else {
          this.basepath = `/${trimPath(newOptions.basepath)}`;
        }
      }
      if (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        !this.history || this.options.history && this.options.history !== this.history
      ) {
        this.history = this.options.history ?? (typeof document !== "undefined" ? createBrowserHistory() : createMemoryHistory({
          initialEntries: [this.options.basepath || "/"]
        }));
        this.latestLocation = this.parseLocation();
      }
      if (this.options.routeTree !== this.routeTree) {
        this.routeTree = this.options.routeTree;
        this.buildRouteTree();
      }
      if (!this.__store) {
        this.__store = new Store(getInitialRouterState(this.latestLocation), {
          onUpdate: () => {
            this.__store.state = {
              ...this.state,
              status: this.state.isTransitioning || this.state.isLoading ? "pending" : "idle",
              cachedMatches: this.state.cachedMatches.filter(
                (d) => !["redirected"].includes(d.status)
              )
            };
          }
        });
      }
    };
    this.buildRouteTree = () => {
      this.routesById = {};
      this.routesByPath = {};
      const notFoundRoute = this.options.notFoundRoute;
      if (notFoundRoute) {
        notFoundRoute.init({ originalIndex: 99999999999 });
        this.routesById[notFoundRoute.id] = notFoundRoute;
      }
      const recurseRoutes = (childRoutes) => {
        childRoutes.forEach((childRoute, i) => {
          childRoute.init({ originalIndex: i });
          const existingRoute = this.routesById[childRoute.id];
          invariant(
            !existingRoute,
            `Duplicate routes found with id: ${String(childRoute.id)}`
          );
          this.routesById[childRoute.id] = childRoute;
          if (!childRoute.isRoot && childRoute.path) {
            const trimmedFullPath = trimPathRight(childRoute.fullPath);
            if (!this.routesByPath[trimmedFullPath] || childRoute.fullPath.endsWith("/")) {
              this.routesByPath[trimmedFullPath] = childRoute;
            }
          }
          const children = childRoute.children;
          if (children == null ? void 0 : children.length) {
            recurseRoutes(children);
          }
        });
      };
      recurseRoutes([this.routeTree]);
      const scoredRoutes = [];
      const routes = Object.values(this.routesById);
      routes.forEach((d, i) => {
        var _a;
        if (d.isRoot || !d.path) {
          return;
        }
        const trimmed = trimPathLeft(d.fullPath);
        const parsed = parsePathname(trimmed);
        while (parsed.length > 1 && ((_a = parsed[0]) == null ? void 0 : _a.value) === "/") {
          parsed.shift();
        }
        const scores = parsed.map((segment) => {
          if (segment.value === "/") {
            return 0.75;
          }
          if (segment.type === "param") {
            return 0.5;
          }
          if (segment.type === "wildcard") {
            return 0.25;
          }
          return 1;
        });
        scoredRoutes.push({ child: d, trimmed, parsed, index: i, scores });
      });
      this.flatRoutes = scoredRoutes.sort((a, b) => {
        const minLength = Math.min(a.scores.length, b.scores.length);
        for (let i = 0; i < minLength; i++) {
          if (a.scores[i] !== b.scores[i]) {
            return b.scores[i] - a.scores[i];
          }
        }
        if (a.scores.length !== b.scores.length) {
          return b.scores.length - a.scores.length;
        }
        for (let i = 0; i < minLength; i++) {
          if (a.parsed[i].value !== b.parsed[i].value) {
            return a.parsed[i].value > b.parsed[i].value ? 1 : -1;
          }
        }
        return a.index - b.index;
      }).map((d, i) => {
        d.child.rank = i;
        return d.child;
      });
    };
    this.subscribe = (eventType, fn) => {
      const listener = {
        eventType,
        fn
      };
      this.subscribers.add(listener);
      return () => {
        this.subscribers.delete(listener);
      };
    };
    this.emit = (routerEvent) => {
      this.subscribers.forEach((listener) => {
        if (listener.eventType === routerEvent.type) {
          listener.fn(routerEvent);
        }
      });
    };
    this.checkLatest = (promise) => {
      return this.latestLoadPromise !== promise ? this.latestLoadPromise : void 0;
    };
    this.parseLocation = (previousLocation) => {
      const parse = ({
        pathname,
        search,
        hash,
        state
      }) => {
        const parsedSearch = this.options.parseSearch(search);
        const searchStr = this.options.stringifySearch(parsedSearch);
        return {
          pathname,
          searchStr,
          search: replaceEqualDeep(previousLocation == null ? void 0 : previousLocation.search, parsedSearch),
          hash: hash.split("#").reverse()[0] ?? "",
          href: `${pathname}${searchStr}${hash}`,
          state: replaceEqualDeep(previousLocation == null ? void 0 : previousLocation.state, state)
        };
      };
      const location = parse(this.history.location);
      const { __tempLocation, __tempKey } = location.state;
      if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
        const parsedTempLocation = parse(__tempLocation);
        parsedTempLocation.state.key = location.state.key;
        delete parsedTempLocation.state.__tempLocation;
        return {
          ...parsedTempLocation,
          maskedLocation: location
        };
      }
      return location;
    };
    this.resolvePathWithBase = (from, path) => {
      return resolvePath(this.basepath, from, cleanPath(path));
    };
    this.matchRoutes = (pathname, locationSearch, opts) => {
      let routeParams = {};
      const foundRoute = this.flatRoutes.find((route) => {
        const matchedParams = matchPathname(
          this.basepath,
          trimPathRight(pathname),
          {
            to: route.fullPath,
            caseSensitive: route.options.caseSensitive ?? this.options.caseSensitive,
            fuzzy: true
          }
        );
        if (matchedParams) {
          routeParams = matchedParams;
          return true;
        }
        return false;
      });
      let routeCursor = foundRoute || this.routesById[rootRouteId];
      const matchedRoutes = [routeCursor];
      let isGlobalNotFound = false;
      if (
        // If we found a route, and it's not an index route and we have left over path
        foundRoute ? foundRoute.path !== "/" && routeParams["**"] : (
          // Or if we didn't find a route and we have left over path
          trimPathRight(pathname)
        )
      ) {
        if (this.options.notFoundRoute) {
          matchedRoutes.push(this.options.notFoundRoute);
        } else {
          isGlobalNotFound = true;
        }
      }
      while (routeCursor.parentRoute) {
        routeCursor = routeCursor.parentRoute;
        matchedRoutes.unshift(routeCursor);
      }
      const globalNotFoundRouteId = (() => {
        if (!isGlobalNotFound) {
          return void 0;
        }
        if (this.options.notFoundMode !== "root") {
          for (let i = matchedRoutes.length - 1; i >= 0; i--) {
            const route = matchedRoutes[i];
            if (route.children) {
              return route.id;
            }
          }
        }
        return rootRouteId;
      })();
      const parseErrors = matchedRoutes.map((route) => {
        let parsedParamsError;
        if (route.options.parseParams) {
          try {
            const parsedParams = route.options.parseParams(routeParams);
            Object.assign(routeParams, parsedParams);
          } catch (err) {
            parsedParamsError = new PathParamError(err.message, {
              cause: err
            });
            if (opts == null ? void 0 : opts.throwOnError) {
              throw parsedParamsError;
            }
            return parsedParamsError;
          }
        }
        return;
      });
      const matches = [];
      matchedRoutes.forEach((route, index) => {
        var _a, _b, _c, _d, _e, _f;
        const parentMatch = matches[index - 1];
        const [preMatchSearch, searchError] = (() => {
          const parentSearch = (parentMatch == null ? void 0 : parentMatch.search) ?? locationSearch;
          try {
            const validator = typeof route.options.validateSearch === "object" ? route.options.validateSearch.parse : route.options.validateSearch;
            const search = (validator == null ? void 0 : validator(parentSearch)) ?? {};
            return [
              {
                ...parentSearch,
                ...search
              },
              void 0
            ];
          } catch (err) {
            const searchParamError = new SearchParamError(err.message, {
              cause: err
            });
            if (opts == null ? void 0 : opts.throwOnError) {
              throw searchParamError;
            }
            return [parentSearch, searchParamError];
          }
        })();
        const loaderDeps = ((_b = (_a = route.options).loaderDeps) == null ? void 0 : _b.call(_a, {
          search: preMatchSearch
        })) ?? "";
        const loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) : "";
        const interpolatedPath = interpolatePath({
          path: route.fullPath,
          params: routeParams
        });
        const matchId = interpolatePath({
          path: route.id,
          params: routeParams,
          leaveWildcards: true
        }) + loaderDepsHash;
        const existingMatch = getRouteMatch(this.state, matchId);
        const cause = this.state.matches.find((d) => d.id === matchId) ? "stay" : "enter";
        const match = existingMatch ? {
          ...existingMatch,
          cause,
          params: routeParams
        } : {
          id: matchId,
          routeId: route.id,
          params: routeParams,
          pathname: joinPaths([this.basepath, interpolatedPath]),
          updatedAt: Date.now(),
          search: {},
          searchError: void 0,
          status: "pending",
          showPending: false,
          isFetching: false,
          error: void 0,
          paramsError: parseErrors[index],
          loadPromise: Promise.resolve(),
          routeContext: void 0,
          context: void 0,
          abortController: new AbortController(),
          fetchCount: 0,
          cause,
          loaderDeps,
          invalid: false,
          preload: false,
          links: (_d = (_c = route.options).links) == null ? void 0 : _d.call(_c),
          scripts: (_f = (_e = route.options).scripts) == null ? void 0 : _f.call(_e),
          staticData: route.options.staticData || {}
        };
        if (!(opts == null ? void 0 : opts.preload)) {
          match.globalNotFound = globalNotFoundRouteId === route.id;
        }
        match.search = replaceEqualDeep(match.search, preMatchSearch);
        match.searchError = searchError;
        matches.push(match);
      });
      return matches;
    };
    this.cancelMatch = (id) => {
      var _a;
      (_a = getRouteMatch(this.state, id)) == null ? void 0 : _a.abortController.abort();
    };
    this.cancelMatches = () => {
      var _a;
      (_a = this.state.pendingMatches) == null ? void 0 : _a.forEach((match) => {
        this.cancelMatch(match.id);
      });
    };
    this.buildLocation = (opts) => {
      const build = (dest = {}, matches) => {
        var _a, _b, _c;
        const relevantMatches = this.state.pendingMatches || this.state.matches;
        const fromSearch = (
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          ((_a = relevantMatches[relevantMatches.length - 1]) == null ? void 0 : _a.search) || this.latestLocation.search
        );
        const fromMatches = this.matchRoutes(
          this.latestLocation.pathname,
          fromSearch
        );
        const stayingMatches = matches == null ? void 0 : matches.filter(
          (d) => fromMatches.find((e) => e.routeId === d.routeId)
        );
        const fromRoute = this.looseRoutesById[(_b = last(fromMatches)) == null ? void 0 : _b.routeId];
        let pathname = dest.to ? this.resolvePathWithBase(
          dest.from ?? this.latestLocation.pathname,
          `${dest.to}`
        ) : this.resolvePathWithBase(fromRoute == null ? void 0 : fromRoute.fullPath, fromRoute == null ? void 0 : fromRoute.fullPath);
        const prevParams = { ...(_c = last(fromMatches)) == null ? void 0 : _c.params };
        let nextParams = (dest.params ?? true) === true ? prevParams : { ...prevParams, ...functionalUpdate(dest.params, prevParams) };
        if (Object.keys(nextParams).length > 0) {
          matches == null ? void 0 : matches.map((d) => this.looseRoutesById[d.routeId].options.stringifyParams).filter(Boolean).forEach((fn) => {
            nextParams = { ...nextParams, ...fn(nextParams) };
          });
        }
        pathname = interpolatePath({
          path: pathname,
          params: nextParams ?? {},
          leaveWildcards: false,
          leaveParams: opts.leaveParams
        });
        const preSearchFilters = (stayingMatches == null ? void 0 : stayingMatches.map(
          (match) => this.looseRoutesById[match.routeId].options.preSearchFilters ?? []
        ).flat().filter(Boolean)) ?? [];
        const postSearchFilters = (stayingMatches == null ? void 0 : stayingMatches.map(
          (match) => this.looseRoutesById[match.routeId].options.postSearchFilters ?? []
        ).flat().filter(Boolean)) ?? [];
        const preFilteredSearch = preSearchFilters.length ? preSearchFilters.reduce((prev, next) => next(prev), fromSearch) : fromSearch;
        const destSearch = dest.search === true ? preFilteredSearch : dest.search ? functionalUpdate(dest.search, preFilteredSearch) : preSearchFilters.length ? preFilteredSearch : {};
        const postFilteredSearch = postSearchFilters.length ? postSearchFilters.reduce((prev, next) => next(prev), destSearch) : destSearch;
        const search = replaceEqualDeep(fromSearch, postFilteredSearch);
        const searchStr = this.options.stringifySearch(search);
        const hash = dest.hash === true ? this.latestLocation.hash : dest.hash ? functionalUpdate(dest.hash, this.latestLocation.hash) : void 0;
        const hashStr = hash ? `#${hash}` : "";
        let nextState = dest.state === true ? this.latestLocation.state : dest.state ? functionalUpdate(dest.state, this.latestLocation.state) : {};
        nextState = replaceEqualDeep(this.latestLocation.state, nextState);
        return {
          pathname,
          search,
          searchStr,
          state: nextState,
          hash: hash ?? "",
          href: `${pathname}${searchStr}${hashStr}`,
          unmaskOnReload: dest.unmaskOnReload
        };
      };
      const buildWithMatches = (dest = {}, maskedDest) => {
        var _a;
        const next = build(dest);
        let maskedNext = maskedDest ? build(maskedDest) : void 0;
        if (!maskedNext) {
          let params = {};
          const foundMask = (_a = this.options.routeMasks) == null ? void 0 : _a.find((d) => {
            const match = matchPathname(this.basepath, next.pathname, {
              to: d.from,
              caseSensitive: false,
              fuzzy: false
            });
            if (match) {
              params = match;
              return true;
            }
            return false;
          });
          if (foundMask) {
            maskedDest = {
              ...pick(opts, ["from"]),
              ...foundMask,
              params
            };
            maskedNext = build(maskedDest);
          }
        }
        const nextMatches = this.matchRoutes(next.pathname, next.search);
        const maskedMatches = maskedNext ? this.matchRoutes(maskedNext.pathname, maskedNext.search) : void 0;
        const maskedFinal = maskedNext ? build(maskedDest, maskedMatches) : void 0;
        const final = build(dest, nextMatches);
        if (maskedFinal) {
          final.maskedLocation = maskedFinal;
        }
        return final;
      };
      if (opts.mask) {
        return buildWithMatches(opts, {
          ...pick(opts, ["from"]),
          ...opts.mask
        });
      }
      return buildWithMatches(opts);
    };
    this.commitLocation = async ({
      startTransition: startTransition2,
      ...next
    }) => {
      if (this.navigateTimeout)
        clearTimeout(this.navigateTimeout);
      const isSameUrl = this.latestLocation.href === next.href;
      if (!isSameUrl) {
        let { maskedLocation, ...nextHistory } = next;
        if (maskedLocation) {
          nextHistory = {
            ...maskedLocation,
            state: {
              ...maskedLocation.state,
              __tempKey: void 0,
              __tempLocation: {
                ...nextHistory,
                search: nextHistory.searchStr,
                state: {
                  ...nextHistory.state,
                  __tempKey: void 0,
                  __tempLocation: void 0,
                  key: void 0
                }
              }
            }
          };
          if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) {
            nextHistory.state.__tempKey = this.tempLocationKey;
          }
        }
        const apply = () => {
          this.history[next.replace ? "replace" : "push"](
            nextHistory.href,
            nextHistory.state
          );
        };
        if (startTransition2 ?? true) {
          this.startReactTransition(apply);
        } else {
          apply();
        }
      }
      this.resetNextScroll = next.resetScroll ?? true;
      return this.latestLoadPromise;
    };
    this.buildAndCommitLocation = ({
      replace,
      resetScroll,
      startTransition: startTransition2,
      ...rest
    } = {}) => {
      const location = this.buildLocation(rest);
      return this.commitLocation({
        ...location,
        startTransition: startTransition2,
        replace,
        resetScroll
      });
    };
    this.navigate = ({ from, to, ...rest }) => {
      const toString = String(to);
      let isExternal;
      try {
        new URL(`${toString}`);
        isExternal = true;
      } catch (e) {
      }
      invariant(
        !isExternal,
        "Attempting to navigate to external url with this.navigate!"
      );
      return this.buildAndCommitLocation({
        ...rest,
        from,
        to
        // to: toString,
      });
    };
    this.loadMatches = async ({
      checkLatest,
      location,
      matches,
      preload
    }) => {
      var _a, _b;
      let latestPromise;
      let firstBadMatchIndex;
      const updateMatch = (match, opts) => {
        var _a2;
        const isPending = (_a2 = this.state.pendingMatches) == null ? void 0 : _a2.find(
          (d) => d.id === match.id
        );
        const isMatched = this.state.matches.find((d) => d.id === match.id);
        const matchesKey = isPending ? "pendingMatches" : isMatched ? "matches" : "cachedMatches";
        this.__store.setState((s) => {
          var _a3, _b2;
          return {
            ...s,
            [matchesKey]: (opts == null ? void 0 : opts.remove) ? (_a3 = s[matchesKey]) == null ? void 0 : _a3.filter((d) => d.id !== match.id) : (_b2 = s[matchesKey]) == null ? void 0 : _b2.map((d) => d.id === match.id ? match : d)
          };
        });
      };
      const handleMatchSpecialError = (match, err) => {
        match = {
          ...match,
          status: isRedirect(err) ? "redirected" : isNotFound(err) ? "notFound" : "error",
          isFetching: false,
          error: err
        };
        updateMatch(match);
        if (!err.routeId) {
          err.routeId = match.routeId;
        }
        throw err;
      };
      for (let [index, match] of matches.entries()) {
        const parentMatch = matches[index - 1];
        const route = this.looseRoutesById[match.routeId];
        const abortController = new AbortController();
        const handleSerialError = (err, code) => {
          var _a2, _b2;
          err.routerCode = code;
          firstBadMatchIndex = firstBadMatchIndex ?? index;
          if (isRedirect(err) || isNotFound(err)) {
            handleMatchSpecialError(match, err);
          }
          try {
            (_b2 = (_a2 = route.options).onError) == null ? void 0 : _b2.call(_a2, err);
          } catch (errorHandlerErr) {
            err = errorHandlerErr;
            if (isRedirect(err) || isNotFound(err)) {
              handleMatchSpecialError(match, errorHandlerErr);
            }
          }
          matches[index] = match = {
            ...match,
            error: err,
            status: "error",
            updatedAt: Date.now(),
            abortController: new AbortController()
          };
        };
        if (match.paramsError) {
          handleSerialError(match.paramsError, "PARSE_PARAMS");
        }
        if (match.searchError) {
          handleSerialError(match.searchError, "VALIDATE_SEARCH");
        }
        try {
          const parentContext = (parentMatch == null ? void 0 : parentMatch.context) ?? this.options.context ?? {};
          const pendingMs = route.options.pendingMs ?? this.options.defaultPendingMs;
          const pendingPromise = typeof pendingMs === "number" && pendingMs <= 0 ? Promise.resolve() : new Promise((r) => setTimeout(r, pendingMs));
          const beforeLoadContext = await ((_b = (_a = route.options).beforeLoad) == null ? void 0 : _b.call(_a, {
            search: match.search,
            abortController,
            params: match.params,
            preload: !!preload,
            context: parentContext,
            location,
            navigate: (opts) => this.navigate({ ...opts, from: match.pathname }),
            buildLocation: this.buildLocation,
            cause: preload ? "preload" : match.cause
          })) ?? {};
          if (isRedirect(beforeLoadContext) || isNotFound(beforeLoadContext)) {
            handleSerialError(beforeLoadContext, "BEFORE_LOAD");
          }
          const context = {
            ...parentContext,
            ...beforeLoadContext
          };
          matches[index] = match = {
            ...match,
            routeContext: replaceEqualDeep(match.routeContext, beforeLoadContext),
            context: replaceEqualDeep(match.context, context),
            abortController,
            pendingPromise
          };
        } catch (err) {
          handleSerialError(err, "BEFORE_LOAD");
          break;
        }
      }
      const validResolvedMatches = matches.slice(0, firstBadMatchIndex);
      const matchPromises = [];
      validResolvedMatches.forEach((match, index) => {
        matchPromises.push(
          // eslint-disable-next-line no-async-promise-executor
          new Promise(async (resolve, reject) => {
            var _a2;
            const parentMatchPromise = matchPromises[index - 1];
            const route = this.looseRoutesById[match.routeId];
            const handleError = (err) => {
              if (isRedirect(err) || isNotFound(err)) {
                handleMatchSpecialError(match, err);
              }
            };
            let loadPromise;
            matches[index] = match = {
              ...match,
              showPending: false
            };
            let didShowPending = false;
            const pendingMs = route.options.pendingMs ?? this.options.defaultPendingMs;
            const pendingMinMs = route.options.pendingMinMs ?? this.options.defaultPendingMinMs;
            const loaderContext = {
              params: match.params,
              deps: match.loaderDeps,
              preload: !!preload,
              parentMatchPromise,
              abortController: match.abortController,
              context: match.context,
              location,
              navigate: (opts) => this.navigate({ ...opts, from: match.pathname }),
              cause: preload ? "preload" : match.cause,
              route
            };
            const fetch = async () => {
              var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
              try {
                if (match.isFetching) {
                  loadPromise = (_a3 = getRouteMatch(this.state, match.id)) == null ? void 0 : _a3.loadPromise;
                } else {
                  matches[index] = match = {
                    ...match,
                    isFetching: true,
                    fetchCount: match.fetchCount + 1
                  };
                  const lazyPromise = ((_b2 = route.lazyFn) == null ? void 0 : _b2.call(route).then((lazyRoute) => {
                    Object.assign(route.options, lazyRoute.options);
                  })) || Promise.resolve();
                  const componentsPromise = lazyPromise.then(
                    () => Promise.all(
                      componentTypes.map(async (type) => {
                        const component = route.options[type];
                        if (component == null ? void 0 : component.preload) {
                          await component.preload();
                        }
                      })
                    )
                  );
                  const loaderPromise = (_d = (_c = route.options).loader) == null ? void 0 : _d.call(_c, loaderContext);
                  loadPromise = Promise.all([
                    componentsPromise,
                    loaderPromise,
                    lazyPromise
                  ]).then((d) => d[1]);
                }
                matches[index] = match = {
                  ...match,
                  loadPromise
                };
                updateMatch(match);
                const loaderData = await loadPromise;
                if (latestPromise = checkLatest())
                  return await latestPromise;
                handleError(loaderData);
                if (didShowPending && pendingMinMs) {
                  await new Promise((r) => setTimeout(r, pendingMinMs));
                }
                if (latestPromise = checkLatest())
                  return await latestPromise;
                const [meta, headers] = await Promise.all([
                  (_f = (_e = route.options).meta) == null ? void 0 : _f.call(_e, {
                    params: match.params,
                    loaderData
                  }),
                  (_h = (_g = route.options).headers) == null ? void 0 : _h.call(_g, {
                    loaderData
                  })
                ]);
                matches[index] = match = {
                  ...match,
                  error: void 0,
                  status: "success",
                  isFetching: false,
                  updatedAt: Date.now(),
                  loaderData,
                  loadPromise: void 0,
                  meta,
                  headers
                };
              } catch (e) {
                let error = e;
                if (latestPromise = checkLatest())
                  return await latestPromise;
                handleError(e);
                try {
                  (_j = (_i = route.options).onError) == null ? void 0 : _j.call(_i, e);
                } catch (onErrorError) {
                  error = onErrorError;
                  handleError(onErrorError);
                }
                matches[index] = match = {
                  ...match,
                  error,
                  status: "error",
                  isFetching: false
                };
              }
              updateMatch(match);
            };
            const age = Date.now() - match.updatedAt;
            const staleAge = preload ? route.options.preloadStaleTime ?? this.options.defaultPreloadStaleTime ?? 3e4 : route.options.staleTime ?? this.options.defaultStaleTime ?? 0;
            const shouldReloadOption = route.options.shouldReload;
            const shouldReload = typeof shouldReloadOption === "function" ? shouldReloadOption(loaderContext) : shouldReloadOption;
            matches[index] = match = {
              ...match,
              preload: !!preload && !this.state.matches.find((d) => d.id === match.id)
            };
            if (match.status === "success" && (match.invalid || (shouldReload ?? age > staleAge))) {
              (async () => {
                try {
                  await fetch();
                } catch (err) {
                  console.info("Background Fetching Error", err);
                  if (isRedirect(err)) {
                    (this.state.pendingMatches || this.state.matches).find((d) => d.id === match.id);
                    handleError(err);
                    invariant(
                      false,
                      "You need to redirect from a background fetch? This is not supported yet. File an issue."
                    );
                  }
                }
              })();
              return resolve();
            }
            const shouldPending = !preload && route.options.loader && typeof pendingMs === "number" && (route.options.pendingComponent ?? this.options.defaultPendingComponent);
            if (match.status !== "success") {
              try {
                if (shouldPending) {
                  (_a2 = match.pendingPromise) == null ? void 0 : _a2.then(async () => {
                    if (latestPromise = checkLatest())
                      return latestPromise;
                    didShowPending = true;
                    matches[index] = match = {
                      ...match,
                      showPending: true
                    };
                    updateMatch(match);
                    resolve();
                  });
                }
                await fetch();
              } catch (err) {
                reject(err);
              }
            }
            resolve();
          })
        );
      });
      await Promise.all(matchPromises);
      return matches;
    };
    this.invalidate = () => {
      const invalidate = (d) => ({
        ...d,
        invalid: true,
        ...d.status === "error" ? { status: "pending" } : {}
      });
      this.__store.setState((s) => {
        var _a;
        return {
          ...s,
          matches: s.matches.map(invalidate),
          cachedMatches: s.cachedMatches.map(invalidate),
          pendingMatches: (_a = s.pendingMatches) == null ? void 0 : _a.map(invalidate)
        };
      });
      return this.load();
    };
    this.load = async () => {
      const promise = new Promise(async (resolve, reject) => {
        const next = this.latestLocation;
        const prevLocation = this.state.resolvedLocation;
        const pathDidChange = prevLocation.href !== next.href;
        let latestPromise;
        this.cancelMatches();
        this.emit({
          type: "onBeforeLoad",
          fromLocation: prevLocation,
          toLocation: next,
          pathChanged: pathDidChange
        });
        let pendingMatches;
        const previousMatches = this.state.matches;
        this.__store.batch(() => {
          this.cleanCache();
          pendingMatches = this.matchRoutes(next.pathname, next.search, {
            debug: true
          });
          this.__store.setState((s) => ({
            ...s,
            isLoading: true,
            location: next,
            pendingMatches,
            cachedMatches: s.cachedMatches.filter((d) => {
              return !pendingMatches.find((e) => e.id === d.id);
            })
          }));
        });
        try {
          let redirect2;
          let notFound2;
          try {
            await this.loadMatches({
              matches: pendingMatches,
              location: next,
              checkLatest: () => this.checkLatest(promise)
            });
          } catch (err) {
            if (isRedirect(err)) {
              redirect2 = this.resolveRedirect(err);
              if (!isServer) {
                this.navigate({ ...redirect2, replace: true });
              }
            } else if (isNotFound(err)) {
              notFound2 = err;
              this.handleNotFound(pendingMatches, err);
            }
          }
          if (latestPromise = this.checkLatest(promise)) {
            return latestPromise;
          }
          const exitingMatches = previousMatches.filter(
            (match) => !pendingMatches.find((d) => d.id === match.id)
          );
          const enteringMatches = pendingMatches.filter(
            (match) => !previousMatches.find((d) => d.id === match.id)
          );
          const stayingMatches = previousMatches.filter(
            (match) => pendingMatches.find((d) => d.id === match.id)
          );
          this.__store.batch(() => {
            this.__store.setState((s) => ({
              ...s,
              isLoading: false,
              matches: s.pendingMatches,
              pendingMatches: void 0,
              cachedMatches: [
                ...s.cachedMatches,
                ...exitingMatches.filter((d) => d.status !== "error")
              ],
              statusCode: (redirect2 == null ? void 0 : redirect2.statusCode) || notFound2 ? 404 : s.matches.some((d) => d.status === "error") ? 500 : 200,
              redirect: redirect2
            }));
            this.cleanCache();
          });
          [
            [exitingMatches, "onLeave"],
            [enteringMatches, "onEnter"],
            [stayingMatches, "onStay"]
          ].forEach(([matches, hook]) => {
            matches.forEach((match) => {
              var _a, _b;
              (_b = (_a = this.looseRoutesById[match.routeId].options)[hook]) == null ? void 0 : _b.call(_a, match);
            });
          });
          this.emit({
            type: "onLoad",
            fromLocation: prevLocation,
            toLocation: next,
            pathChanged: pathDidChange
          });
          resolve();
        } catch (err) {
          if (latestPromise = this.checkLatest(promise)) {
            return latestPromise;
          }
          console.log("Load Error", err);
          reject(err);
        }
      });
      this.latestLoadPromise = promise;
      return this.latestLoadPromise;
    };
    this.resolveRedirect = (err) => {
      const redirect2 = err;
      if (!redirect2.href) {
        redirect2.href = this.buildLocation(redirect2).href;
      }
      return redirect2;
    };
    this.cleanCache = () => {
      this.__store.setState((s) => {
        return {
          ...s,
          cachedMatches: s.cachedMatches.filter((d) => {
            const route = this.looseRoutesById[d.routeId];
            if (!route.options.loader) {
              return false;
            }
            const gcTime = (d.preload ? route.options.preloadGcTime ?? this.options.defaultPreloadGcTime : route.options.gcTime ?? this.options.defaultGcTime) ?? 5 * 60 * 1e3;
            return d.status !== "error" && Date.now() - d.updatedAt < gcTime;
          })
        };
      });
    };
    this.preloadRoute = async (opts) => {
      const next = this.buildLocation(opts);
      let matches = this.matchRoutes(next.pathname, next.search, {
        throwOnError: true,
        preload: true
      });
      const loadedMatchIds = Object.fromEntries(
        [
          ...this.state.matches,
          ...this.state.pendingMatches ?? [],
          ...this.state.cachedMatches
        ].map((d) => [d.id, true])
      );
      this.__store.batch(() => {
        matches.forEach((match) => {
          if (!loadedMatchIds[match.id]) {
            this.__store.setState((s) => ({
              ...s,
              cachedMatches: [...s.cachedMatches, match]
            }));
          }
        });
      });
      try {
        matches = await this.loadMatches({
          matches,
          location: next,
          preload: true,
          checkLatest: () => void 0
        });
        return matches;
      } catch (err) {
        if (isRedirect(err)) {
          return await this.preloadRoute(err);
        }
        console.error(err);
        return void 0;
      }
    };
    this.matchRoute = (location, opts) => {
      const matchLocation = {
        ...location,
        to: location.to ? this.resolvePathWithBase(location.from || "", location.to) : void 0,
        params: location.params || {},
        leaveParams: true
      };
      const next = this.buildLocation(matchLocation);
      if ((opts == null ? void 0 : opts.pending) && this.state.status !== "pending") {
        return false;
      }
      const baseLocation = (opts == null ? void 0 : opts.pending) ? this.latestLocation : this.state.resolvedLocation;
      const match = matchPathname(this.basepath, baseLocation.pathname, {
        ...opts,
        to: next.pathname
      });
      if (!match) {
        return false;
      }
      if (location.params) {
        if (!deepEqual(match, location.params, true)) {
          return false;
        }
      }
      if (match && ((opts == null ? void 0 : opts.includeSearch) ?? true)) {
        return deepEqual(baseLocation.search, next.search, true) ? match : false;
      }
      return match;
    };
    this.injectHtml = async (html) => {
      this.injectedHtml.push(html);
    };
    this.registeredDeferredsIds = /* @__PURE__ */ new Map();
    this.registeredDeferreds = /* @__PURE__ */ new WeakMap();
    this.getDeferred = (uid) => {
      const token = this.registeredDeferredsIds.get(uid);
      if (!token) {
        return void 0;
      }
      return this.registeredDeferreds.get(token);
    };
    this.dehydrateData = (key, getData) => {
      tiny_warning_esm_default(
        false,
        `The dehydrateData method is deprecated. Please use the injectHtml method to inject your own data.`
      );
      if (typeof document === "undefined") {
        const strKey = typeof key === "string" ? key : JSON.stringify(key);
        this.injectHtml(async () => {
          const id = `__TSR_DEHYDRATED__${strKey}`;
          const data = typeof getData === "function" ? await getData() : getData;
          return `<script id='${id}' suppressHydrationWarning>
  window["__TSR_DEHYDRATED__${escapeJSON(
            strKey
          )}"] = ${JSON.stringify(this.options.transformer.stringify(data))}
<\/script>`;
        });
        return () => this.hydrateData(key);
      }
      return () => void 0;
    };
    this.hydrateData = (key) => {
      tiny_warning_esm_default(
        false,
        `The hydrateData method is deprecated. Please use the extractHtml method to extract your own data.`
      );
      if (typeof document !== "undefined") {
        const strKey = typeof key === "string" ? key : JSON.stringify(key);
        return this.options.transformer.parse(
          window[`__TSR_DEHYDRATED__${strKey}`]
        );
      }
      return void 0;
    };
    this.dehydrate = () => {
      var _a;
      const pickError = ((_a = this.options.errorSerializer) == null ? void 0 : _a.serialize) ?? defaultSerializeError;
      return {
        state: {
          dehydratedMatches: this.state.matches.map((d) => ({
            ...pick(d, ["id", "status", "updatedAt", "loaderData"]),
            // If an error occurs server-side during SSRing,
            // send a small subset of the error to the client
            error: d.error ? {
              data: pickError(d.error),
              __isServerError: true
            } : void 0
          }))
        }
      };
    };
    this.hydrate = async (__do_not_use_server_ctx) => {
      var _a, _b, _c;
      let _ctx = __do_not_use_server_ctx;
      if (typeof document !== "undefined") {
        _ctx = (_a = window.__TSR_DEHYDRATED__) == null ? void 0 : _a.data;
      }
      invariant(
        _ctx,
        "Expected to find a __TSR_DEHYDRATED__ property on window... but we did not. Did you forget to render <DehydrateRouter /> in your app?"
      );
      const ctx = this.options.transformer.parse(_ctx);
      this.dehydratedData = ctx.payload;
      (_c = (_b = this.options).hydrate) == null ? void 0 : _c.call(_b, ctx.payload);
      const dehydratedState = ctx.router.state;
      const matches = this.matchRoutes(
        this.state.location.pathname,
        this.state.location.search
      ).map((match) => {
        var _a2, _b2, _c2, _d, _e, _f;
        const dehydratedMatch = dehydratedState.dehydratedMatches.find(
          (d) => d.id === match.id
        );
        invariant(
          dehydratedMatch,
          `Could not find a client-side match for dehydrated match with id: ${match.id}!`
        );
        const route = this.looseRoutesById[match.routeId];
        const assets = dehydratedMatch.status === "notFound" || dehydratedMatch.status === "redirected" ? {} : {
          meta: (_b2 = (_a2 = route.options).meta) == null ? void 0 : _b2.call(_a2, {
            params: match.params,
            loaderData: dehydratedMatch.loaderData
          }),
          links: (_d = (_c2 = route.options).links) == null ? void 0 : _d.call(_c2),
          scripts: (_f = (_e = route.options).scripts) == null ? void 0 : _f.call(_e)
        };
        return {
          ...match,
          ...dehydratedMatch,
          ...assets
        };
      });
      this.__store.setState((s) => {
        return {
          ...s,
          matches,
          lastUpdated: Date.now()
        };
      });
    };
    this.handleNotFound = (matches, err) => {
      const matchesByRouteId = Object.fromEntries(
        matches.map((match2) => [match2.routeId, match2])
      );
      let routeCursor = (err.global ? this.looseRoutesById[rootRouteId] : this.looseRoutesById[err.routeId]) || this.looseRoutesById[rootRouteId];
      while (!routeCursor.options.notFoundComponent && !this.options.defaultNotFoundComponent && routeCursor.id !== rootRouteId) {
        routeCursor = routeCursor.parentRoute;
        invariant(
          routeCursor,
          "Found invalid route tree while trying to find not-found handler."
        );
      }
      const match = matchesByRouteId[routeCursor.id];
      invariant(match, "Could not find match for route: " + routeCursor.id);
      Object.assign(match, {
        status: "notFound",
        error: err,
        isFetching: false
      });
    };
    this.hasNotFoundMatch = () => {
      return this.__store.state.matches.some(
        (d) => d.status === "notFound" || d.globalNotFound
      );
    };
    this.update({
      defaultPreloadDelay: 50,
      defaultPendingMs: 1e3,
      defaultPendingMinMs: 500,
      context: void 0,
      ...options,
      stringifySearch: options.stringifySearch ?? defaultStringifySearch,
      parseSearch: options.parseSearch ?? defaultParseSearch,
      transformer: options.transformer ?? JSON
    });
    if (typeof document !== "undefined") {
      window.__TSR__ROUTER__ = this;
    }
  }
  get state() {
    return this.__store.state;
  }
  get looseRoutesById() {
    return this.routesById;
  }
  // resolveMatchPromise = (matchId: string, key: string, value: any) => {
  //   state.matches
  //     .find((d) => d.id === matchId)
  //     ?.__promisesByKey[key]?.resolve(value)
  // }
};
function lazyFn(fn, key) {
  return async (...args) => {
    const imported = await fn();
    return imported[key || "default"](...args);
  };
}
var SearchParamError = class extends Error {
};
var PathParamError = class extends Error {
};
function getInitialRouterState(location) {
  return {
    isLoading: false,
    isTransitioning: false,
    status: "idle",
    resolvedLocation: { ...location },
    location,
    matches: [],
    pendingMatches: [],
    cachedMatches: [],
    lastUpdated: 0,
    statusCode: 200
  };
}
function defaultSerializeError(err) {
  if (err instanceof Error) {
    const obj = {
      name: err.name,
      message: err.message
    };
    if (true) {
      obj.stack = err.stack;
    }
    return obj;
  }
  return {
    data: err
  };
}

// node_modules/@tanstack/react-router/dist/esm/defer.js
function defer(_promise, options) {
  const promise = _promise;
  if (!promise.__deferredState) {
    promise.__deferredState = {
      uid: Math.random().toString(36).slice(2),
      status: "pending"
    };
    const state = promise.__deferredState;
    promise.then((data) => {
      state.status = "success";
      state.data = data;
    }).catch((error) => {
      state.status = "error";
      state.error = {
        data: ((options == null ? void 0 : options.serializeError) ?? defaultSerializeError)(error),
        __isServerError: true
      };
    });
  }
  return promise;
}
function isDehydratedDeferred(obj) {
  return typeof obj === "object" && obj !== null && !(obj instanceof Promise) && !obj.then && "__deferredState" in obj;
}

// node_modules/@tanstack/react-router/dist/esm/awaited.js
function useAwaited({ promise }) {
  var _a, _b;
  const router = useRouter();
  const state = promise.__deferredState;
  if (isDehydratedDeferred(promise) && state.status === "pending") {
    const streamedData = window[`__TSR__DEFERRED__${state.uid}`];
    if (streamedData) {
      Object.assign(state, router.options.transformer.parse(streamedData));
    } else {
      let token = router.registeredDeferredsIds.get(state.uid);
      if (!token) {
        token = {};
        router.registeredDeferredsIds.set(state.uid, token);
        router.registeredDeferreds.set(token, state);
        Object.assign(state, {
          resolve: () => {
            var _a2;
            (_a2 = state.__resolvePromise) == null ? void 0 : _a2.call(state);
          },
          promise: new Promise((r) => {
            state.__resolvePromise = r;
          }),
          __resolvePromise: () => {
          }
        });
      }
    }
  }
  if (state.status === "pending") {
    throw isDehydratedDeferred(promise) ? state.promise : promise;
  }
  if (!isDehydratedDeferred(promise)) {
    router.injectHtml(`<script class='tsr_deferred_data'>window.__TSR__DEFERRED__${state.uid} = ${JSON.stringify(router.options.transformer.stringify(state))}<\/script>
<script class='tsr_deferred_handler'>
  if (window.__TSR__ROUTER__) {
    let deferred = window.__TSR__ROUTER__.getDeferred('${state.uid}')
    if (deferred) deferred.resolve(window.__TSR__DEFERRED__${state.uid})
  }
  document.querySelectorAll('.tsr_deferred_handler').forEach((el) => el.parentElement.removeChild(el))
<\/script>`);
  }
  if (state.status === "error") {
    if (typeof document !== "undefined") {
      if (isServerSideError(state.error)) {
        throw (((_a = router.options.errorSerializer) == null ? void 0 : _a.deserialize) ?? defaultDeserializeError)(state.error.data);
      } else {
        tiny_warning_esm_default(
          false,
          "Encountered a server-side error that doesn't fit the expected shape"
        );
        throw state.error;
      }
    } else {
      throw {
        data: (((_b = router.options.errorSerializer) == null ? void 0 : _b.serialize) ?? defaultSerializeError)(state.error),
        __isServerError: true
      };
    }
  }
  return [promise.__deferredState.data];
}
function Await(props) {
  const inner = (0, import_jsx_runtime5.jsx)(AwaitInner, { ...props });
  if (props.fallback) {
    return (0, import_jsx_runtime5.jsx)(React8.Suspense, { fallback: props.fallback, children: inner });
  }
  return inner;
}
function AwaitInner(props) {
  const awaited = useAwaited(props);
  return props.children(...awaited);
}

// node_modules/@tanstack/react-router/dist/esm/fileRoute.js
function createFileRoute(path) {
  return new FileRoute(path, {
    silent: true
  }).createRoute;
}
var FileRoute = class {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      tiny_warning_esm_default(
        this.silent,
        "FileRoute is deprecated and will be removed in the next major version. Use the createFileRoute(path)(options) function instead."
      );
      const route = createRoute(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts == null ? void 0 : _opts.silent;
  }
};
function FileRouteLoader(_path) {
  tiny_warning_esm_default(
    false,
    `FileRouteLoader is deprecated and will be removed in the next major version. Please place the loader function in the the main route file, inside the \`createFileRoute('/path/to/file')(options)\` options`
  );
  return (loaderFn) => loaderFn;
}
var LazyRoute = class {
  constructor(opts) {
    this.useMatch = (opts2) => {
      return useMatch({ select: opts2 == null ? void 0 : opts2.select, from: this.options.id });
    };
    this.useRouteContext = (opts2) => {
      return useMatch({
        from: this.options.id,
        select: (d) => (opts2 == null ? void 0 : opts2.select) ? opts2.select(d.context) : d.context
      });
    };
    this.useSearch = (opts2) => {
      return useSearch({ ...opts2, from: this.options.id });
    };
    this.useParams = (opts2) => {
      return useParams({ ...opts2, from: this.options.id });
    };
    this.useLoaderDeps = (opts2) => {
      return useLoaderDeps({ ...opts2, from: this.options.id });
    };
    this.useLoaderData = (opts2) => {
      return useLoaderData({ ...opts2, from: this.options.id });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.options.id });
    };
    this.options = opts;
    this.$$typeof = Symbol.for("react.memo");
  }
};
function createLazyRoute(id) {
  return (opts) => {
    return new LazyRoute({ id, ...opts });
  };
}
function createLazyFileRoute(path) {
  const id = removeGroups(path);
  return (opts) => new LazyRoute({ id, ...opts });
}
var routeGroupPatternRegex = /\(.+\)/g;
function removeGroups(s) {
  return s.replaceAll(routeGroupPatternRegex, "").replaceAll("//", "/");
}

// node_modules/@tanstack/react-router/dist/esm/lazyRouteComponent.js
var React9 = __toESM(require_react(), 1);
function isModuleNotFoundError(error) {
  return typeof (error == null ? void 0 : error.message) === "string" && /Failed to fetch dynamically imported module/.test(error.message);
}
function lazyRouteComponent(importer, exportName) {
  let loadPromise;
  const load = () => {
    if (!loadPromise) {
      loadPromise = importer().catch((error) => {
        if (isModuleNotFoundError(error)) {
          loadPromise.moduleNotFoundError = error;
          return null;
        }
        throw error;
      });
    }
    return loadPromise;
  };
  const lazyComp = React9.lazy(async () => {
    try {
      const promise = load();
      if (promise.moduleNotFoundError) {
        throw promise.moduleNotFoundError;
      }
      const moduleExports = await promise;
      const comp = moduleExports[exportName ?? "default"];
      return {
        default: comp
      };
    } catch (error) {
      if (error instanceof Error && isModuleNotFoundError(error) && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
        const storageKey = `tanstack_router_reload:${error.message}`;
        if (!sessionStorage.getItem(storageKey)) {
          sessionStorage.setItem(storageKey, "1");
          window.location.reload();
          return {
            default: () => null
          };
        }
      }
      throw error;
    }
  });
  lazyComp.preload = load;
  return lazyComp;
}

// node_modules/@tanstack/react-router/dist/esm/link.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var React10 = __toESM(require_react(), 1);
var preloadWarning = "Error preloading route! ☝️";
function useLinkProps(options) {
  const router = useRouter();
  const matchPathname2 = useMatch({
    strict: false,
    select: (s) => s.pathname
  });
  const {
    // custom props
    activeProps = () => ({ className: "active" }),
    inactiveProps = () => ({}),
    activeOptions,
    hash,
    search,
    params,
    to,
    state,
    mask,
    preload: userPreload,
    preloadDelay: userPreloadDelay,
    replace,
    startTransition: startTransition2,
    resetScroll,
    // element props
    children,
    target,
    disabled,
    style,
    className,
    onClick,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    ...rest
  } = options;
  const dest = {
    ...options.to && { from: matchPathname2 },
    ...options
  };
  let type = "internal";
  try {
    new URL(`${to}`);
    type = "external";
  } catch {
  }
  const next = router.buildLocation(dest);
  const preload = userPreload ?? router.options.defaultPreload;
  const preloadDelay = userPreloadDelay ?? router.options.defaultPreloadDelay ?? 0;
  const isActive = useRouterState({
    select: (s) => {
      const currentPathSplit = s.location.pathname.split("/");
      const nextPathSplit = next.pathname.split("/");
      const pathIsFuzzyEqual = nextPathSplit.every(
        (d, i) => d === currentPathSplit[i]
      );
      const pathTest = (activeOptions == null ? void 0 : activeOptions.exact) ? exactPathTest(s.location.pathname, next.pathname) : pathIsFuzzyEqual;
      const hashTest = (activeOptions == null ? void 0 : activeOptions.includeHash) ? s.location.hash === next.hash : true;
      const searchTest = (activeOptions == null ? void 0 : activeOptions.includeSearch) ?? true ? deepEqual(s.location.search, next.search, !(activeOptions == null ? void 0 : activeOptions.exact)) : true;
      return pathTest && hashTest && searchTest;
    }
  });
  if (type === "external") {
    return {
      ...rest,
      type,
      href: to,
      ...children && { children },
      ...target && { target },
      ...disabled && { disabled },
      ...style && { style },
      ...className && { className },
      ...onClick && { onClick },
      ...onFocus && { onFocus },
      ...onMouseEnter && { onMouseEnter },
      ...onMouseLeave && { onMouseLeave },
      ...onTouchStart && { onTouchStart }
    };
  }
  const handleClick = (e) => {
    if (!disabled && !isCtrlEvent(e) && !e.defaultPrevented && (!target || target === "_self") && e.button === 0) {
      e.preventDefault();
      router.commitLocation({ ...next, replace, resetScroll, startTransition: startTransition2 });
    }
  };
  const doPreload = () => {
    React10.startTransition(() => {
      router.preloadRoute(dest).catch((err) => {
        console.warn(err);
        console.warn(preloadWarning);
      });
    });
  };
  const handleFocus = (e) => {
    if (disabled)
      return;
    if (preload) {
      doPreload();
    }
  };
  const handleTouchStart = handleFocus;
  const handleEnter = (e) => {
    if (disabled)
      return;
    const eventTarget = e.target || {};
    if (preload) {
      if (eventTarget.preloadTimeout) {
        return;
      }
      eventTarget.preloadTimeout = setTimeout(() => {
        eventTarget.preloadTimeout = null;
        doPreload();
      }, preloadDelay);
    }
  };
  const handleLeave = (e) => {
    if (disabled)
      return;
    const eventTarget = e.target || {};
    if (eventTarget.preloadTimeout) {
      clearTimeout(eventTarget.preloadTimeout);
      eventTarget.preloadTimeout = null;
    }
  };
  const composeHandlers = (handlers) => (e) => {
    var _a;
    (_a = e.persist) == null ? void 0 : _a.call(e);
    handlers.filter(Boolean).forEach((handler) => {
      if (e.defaultPrevented)
        return;
      handler(e);
    });
  };
  const resolvedActiveProps = isActive ? functionalUpdate(activeProps, {}) ?? {} : {};
  const resolvedInactiveProps = isActive ? {} : functionalUpdate(inactiveProps, {});
  const resolvedClassName = [
    className,
    resolvedActiveProps.className,
    resolvedInactiveProps.className
  ].filter(Boolean).join(" ");
  const resolvedStyle = {
    ...style,
    ...resolvedActiveProps.style,
    ...resolvedInactiveProps.style
  };
  return {
    ...resolvedActiveProps,
    ...resolvedInactiveProps,
    ...rest,
    href: disabled ? void 0 : next.maskedLocation ? router.history.createHref(next.maskedLocation.href) : router.history.createHref(next.href),
    onClick: composeHandlers([onClick, handleClick]),
    onFocus: composeHandlers([onFocus, handleFocus]),
    onMouseEnter: composeHandlers([onMouseEnter, handleEnter]),
    onMouseLeave: composeHandlers([onMouseLeave, handleLeave]),
    onTouchStart: composeHandlers([onTouchStart, handleTouchStart]),
    target,
    ...Object.keys(resolvedStyle).length && { style: resolvedStyle },
    ...resolvedClassName && { className: resolvedClassName },
    ...disabled && {
      role: "link",
      "aria-disabled": true
    },
    ...isActive && { "data-status": "active" }
  };
}
function createLink(Comp) {
  return React10.forwardRef(function CreatedLink(props, ref) {
    return (0, import_jsx_runtime6.jsx)(Link, { ...props, _asChild: Comp, ref });
  });
}
var Link = React10.forwardRef((props, ref) => {
  const { _asChild, ...rest } = props;
  const { type, ...linkProps } = useLinkProps(rest);
  const children = typeof rest.children === "function" ? rest.children({
    isActive: linkProps["data-status"] === "active"
  }) : rest.children;
  return React10.createElement(
    _asChild ? _asChild : "a",
    {
      ...linkProps,
      ref
    },
    children
  );
});
function isCtrlEvent(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}

// node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js
var React11 = __toESM(require_react(), 1);
var useLayoutEffect4 = typeof window !== "undefined" ? React11.useLayoutEffect : React11.useEffect;
var windowKey = "window";
var delimiter = "___";
var weakScrolledElements = /* @__PURE__ */ new WeakSet();
var sessionsStorage = typeof window !== "undefined" && window.sessionStorage;
var cache = sessionsStorage ? (() => {
  const storageKey = "tsr-scroll-restoration-v2";
  const state = JSON.parse(
    window.sessionStorage.getItem(storageKey) || "null"
  ) || { cached: {}, next: {} };
  return {
    state,
    set: (updater) => {
      cache.state = functionalUpdate(updater, cache.state);
      window.sessionStorage.setItem(storageKey, JSON.stringify(cache.state));
    }
  };
})() : void 0;
var defaultGetKey = (location) => location.state.key;
function useScrollRestoration(options) {
  const router = useRouter();
  useLayoutEffect4(() => {
    const getKey = (options == null ? void 0 : options.getKey) || defaultGetKey;
    const { history } = window;
    history.scrollRestoration = "manual";
    const onScroll = (event) => {
      if (weakScrolledElements.has(event.target))
        return;
      weakScrolledElements.add(event.target);
      let elementSelector = "";
      if (event.target === document || event.target === window) {
        elementSelector = windowKey;
      } else {
        const attrId = event.target.getAttribute(
          "data-scroll-restoration-id"
        );
        if (attrId) {
          elementSelector = `[data-scroll-restoration-id="${attrId}"]`;
        } else {
          elementSelector = getCssSelector(event.target);
        }
      }
      if (!cache.state.next[elementSelector]) {
        cache.set((c) => ({
          ...c,
          next: {
            ...c.next,
            [elementSelector]: {
              scrollX: NaN,
              scrollY: NaN
            }
          }
        }));
      }
    };
    if (typeof document !== "undefined") {
      document.addEventListener("scroll", onScroll, true);
    }
    const unsubOnBeforeLoad = router.subscribe("onBeforeLoad", (event) => {
      if (event.pathChanged) {
        const restoreKey = getKey(event.fromLocation);
        for (const elementSelector in cache.state.next) {
          const entry = cache.state.next[elementSelector];
          if (elementSelector === windowKey) {
            entry.scrollX = window.scrollX || 0;
            entry.scrollY = window.scrollY || 0;
          } else if (elementSelector) {
            const element = document.querySelector(elementSelector);
            entry.scrollX = (element == null ? void 0 : element.scrollLeft) || 0;
            entry.scrollY = (element == null ? void 0 : element.scrollTop) || 0;
          }
          cache.set((c) => {
            const next = { ...c.next };
            delete next[elementSelector];
            return {
              ...c,
              next,
              cached: {
                ...c.cached,
                [[restoreKey, elementSelector].join(delimiter)]: entry
              }
            };
          });
        }
      }
    });
    const unsubOnResolved = router.subscribe("onResolved", (event) => {
      if (event.pathChanged) {
        if (!router.resetNextScroll) {
          return;
        }
        router.resetNextScroll = true;
        const restoreKey = getKey(event.toLocation);
        let windowRestored = false;
        for (const cacheKey in cache.state.cached) {
          const entry = cache.state.cached[cacheKey];
          const [key, elementSelector] = cacheKey.split(delimiter);
          if (key === restoreKey) {
            if (elementSelector === windowKey) {
              windowRestored = true;
              window.scrollTo(entry.scrollX, entry.scrollY);
            } else if (elementSelector) {
              const element = document.querySelector(elementSelector);
              if (element) {
                element.scrollLeft = entry.scrollX;
                element.scrollTop = entry.scrollY;
              }
            }
          }
        }
        if (!windowRestored) {
          window.scrollTo(0, 0);
        }
        cache.set((c) => ({ ...c, next: {} }));
        weakScrolledElements = /* @__PURE__ */ new WeakSet();
      }
    });
    return () => {
      document.removeEventListener("scroll", onScroll);
      unsubOnBeforeLoad();
      unsubOnResolved();
    };
  }, [options == null ? void 0 : options.getKey, router]);
}
function ScrollRestoration(props) {
  useScrollRestoration(props);
  return null;
}
function useElementScrollRestoration(options) {
  var _a;
  const router = useRouter();
  const getKey = options.getKey || defaultGetKey;
  let elementSelector = "";
  if (options.id) {
    elementSelector = `[data-scroll-restoration-id="${options.id}"]`;
  } else {
    const element = (_a = options.getElement) == null ? void 0 : _a.call(options);
    if (!element) {
      return;
    }
    elementSelector = getCssSelector(element);
  }
  const restoreKey = getKey(router.latestLocation);
  const cacheKey = [restoreKey, elementSelector].join(delimiter);
  return cache.state.cached[cacheKey];
}
function getCssSelector(el) {
  const path = [];
  let parent;
  while (parent = el.parentNode) {
    path.unshift(
      `${el.tagName}:nth-child(${[].indexOf.call(parent.children, el) + 1})`
    );
    el = parent;
  }
  return `${path.join(" > ")}`.toLowerCase();
}

// node_modules/@tanstack/react-router/dist/esm/useBlocker.js
var React12 = __toESM(require_react(), 1);
function useBlocker(blockerFn, condition = true) {
  const { history } = useRouter();
  React12.useEffect(() => {
    if (!condition)
      return;
    return history.block(blockerFn);
  });
}
function Block({ blocker, condition, children }) {
  useBlocker(blocker, condition);
  return children ?? null;
}

// node_modules/@tanstack/react-router/dist/esm/useRouteContext.js
function useRouteContext(opts) {
  return useMatch({
    ...opts,
    select: (match) => opts.select ? opts.select(match.context) : match.context
  });
}

export {
  createHistory,
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  invariant,
  tiny_warning_esm_default,
  getRouterContext,
  useRouter,
  CatchBoundary,
  ErrorComponent,
  useRouterState,
  functionalUpdate,
  pick,
  replaceEqualDeep,
  isPlainObject,
  isPlainArray,
  deepEqual,
  useStableCallback,
  shallow2 as shallow,
  useLayoutEffect2 as useLayoutEffect,
  escapeJSON,
  notFound,
  isNotFound,
  CatchNotFound,
  DefaultGlobalNotFound,
  redirect,
  isRedirect,
  matchContext,
  Matches,
  Match,
  Outlet,
  useMatchRoute,
  MatchRoute,
  getRenderedMatches,
  useMatch,
  useMatches,
  useParentMatches,
  useChildMatches,
  useLoaderDeps,
  useLoaderData,
  isServerSideError,
  defaultDeserializeError,
  joinPaths,
  cleanPath,
  trimPathLeft,
  trimPathRight,
  trimPath,
  resolvePath,
  parsePathname,
  interpolatePath,
  matchPathname,
  removeBasepath,
  matchByPath,
  useParams,
  useSearch,
  useNavigate,
  Navigate,
  rootRouteId,
  getRouteApi,
  RouteApi,
  Route,
  createRoute,
  createRootRouteWithContext,
  rootRouteWithContext,
  RootRoute,
  createRootRoute,
  createRouteMask,
  NotFoundRoute,
  encode,
  decode,
  defaultParseSearch,
  defaultStringifySearch,
  parseSearchWith,
  stringifySearchWith,
  RouterProvider,
  getRouteMatch,
  componentTypes,
  createRouter,
  Router,
  lazyFn,
  SearchParamError,
  PathParamError,
  getInitialRouterState,
  defaultSerializeError,
  defer,
  isDehydratedDeferred,
  useAwaited,
  Await,
  createFileRoute,
  FileRoute,
  FileRouteLoader,
  LazyRoute,
  createLazyRoute,
  createLazyFileRoute,
  lazyRouteComponent,
  useLinkProps,
  createLink,
  Link,
  useScrollRestoration,
  ScrollRestoration,
  useElementScrollRestoration,
  useBlocker,
  Block,
  useRouteContext
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-BX6F6CEY.js.map
