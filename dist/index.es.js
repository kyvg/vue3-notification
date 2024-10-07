(function(){"use strict";var o;try{if(typeof document<"u"){var e=document.createElement("style");e.nonce=(o=document.head.querySelector("meta[property=csp-nonce]"))==null?void 0:o.content,e.appendChild(document.createTextNode(".vue-notification-group{display:block;position:fixed;z-index:5000}.vue-notification-wrapper{display:block;overflow:hidden;width:100%;margin:0;padding:0}.notification-title{font-weight:600}.vue-notification-template{display:block;box-sizing:border-box;background:#fff;text-align:left}.vue-notification{display:block;box-sizing:border-box;text-align:left;font-size:12px;padding:10px;margin:0 5px 5px;color:#fff;background:#44a4fc;border-left:5px solid #187FE7}.vue-notification.warn{background:#ffb648;border-left-color:#f48a06}.vue-notification.error{background:#e54d42;border-left-color:#b82e24}.vue-notification.success{background:#68cd86;border-left-color:#42a85f}.vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move{transition:all .5s}.vn-fade-enter-from,.vn-fade-leave-to{opacity:0}")),document.head.appendChild(e)}}catch(n){console.error("vite-plugin-css-injected-by-js",n)}})();
import { defineComponent as Z, ref as M, computed as y, onMounted as tt, createVNode as l, TransitionGroup as et, mergeProps as nt, Fragment as k, isVNode as it } from "vue";
const j = /* @__PURE__ */ new Map();
class ot {
  constructor(i, o, a) {
    this.remaining = o, this.callback = i, this.notifyItem = a, this.resume();
  }
  pause() {
    clearTimeout(this.notifyItem.timer), this.remaining -= Date.now() - this.start;
  }
  resume() {
    this.start = Date.now(), clearTimeout(this.notifyItem.timer), this.notifyItem.timer = setTimeout(this.callback, this.remaining);
  }
}
function at(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(i, o) {
    var a = t.get(i);
    a ? a.push(o) : t.set(i, [o]);
  }, off: function(i, o) {
    var a = t.get(i);
    a && (o ? a.splice(a.indexOf(o) >>> 0, 1) : t.set(i, []));
  }, emit: function(i, o) {
    var a = t.get(i);
    a && a.slice().map(function(r) {
      r(o);
    }), (a = t.get("*")) && a.slice().map(function(r) {
      r(i, o);
    });
  } };
}
const h = at(), b = "[-+]?[0-9]*.?[0-9]+", H = [
  {
    name: "px",
    regexp: new RegExp(`^${b}px$`)
  },
  {
    name: "%",
    regexp: new RegExp(`^${b}%$`)
  },
  /**
   * Fallback option
   * If no suffix specified, assigning "px"
   */
  {
    name: "px",
    regexp: new RegExp(`^${b}$`)
  }
], st = (t) => {
  if (t === "auto")
    return {
      type: t,
      value: 0
    };
  for (let i = 0; i < H.length; i++) {
    const o = H[i];
    if (o.regexp.test(t))
      return {
        type: o.name,
        value: parseFloat(t)
      };
  }
  return {
    type: "",
    value: t
  };
}, rt = (t) => {
  switch (typeof t) {
    case "number":
      return { type: "px", value: t };
    case "string":
      return st(t);
    default:
      return { type: "", value: t };
  }
}, R = {
  x: /* @__PURE__ */ new Set(["left", "center", "right"]),
  y: /* @__PURE__ */ new Set(["top", "bottom"])
}, lt = /* @__PURE__ */ ((t) => () => t++)(0), ct = (t) => typeof t != "string" ? [] : t.split(/\s+/gi).filter(Boolean), ut = (t) => {
  typeof t == "string" && (t = ct(t));
  let i = null, o = null;
  return t.forEach((a) => {
    R.y.has(a) && (o = a), R.x.has(a) && (i = a);
  }), { x: i, y: o };
}, T = {
  position: ["top", "right"],
  cssAnimation: "vn-fade",
  velocityAnimation: {
    enter: (t) => ({
      height: [t.clientHeight, 0],
      opacity: [1, 0]
    }),
    leave: {
      height: 0,
      opacity: [0, 1]
    }
  }
};
function ft(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !it(t);
}
const g = {
  IDLE: 0,
  DESTROYED: 2
}, dt = /* @__PURE__ */ Z({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "notifications",
  props: {
    group: {
      type: String,
      default: ""
    },
    /** 
     * Width of notification holder, can be `%`, `px` string or number.
     * @example '100%', '200px', 200 
     * */
    width: {
      type: [Number, String],
      default: 300
    },
    reverse: {
      type: Boolean,
      default: !1
    },
    position: {
      type: [String, Array],
      default: () => T.position
    },
    classes: {
      type: [String, Array],
      default: "vue-notification"
    },
    animationType: {
      type: String,
      default: "css",
      validator(t) {
        return t === "css" || t === "velocity";
      }
    },
    animation: {
      type: Object,
      default() {
        return T.velocityAnimation;
      }
    },
    animationName: {
      type: String,
      default: T.cssAnimation
    },
    speed: {
      type: Number,
      default: 300
    },
    /** Time (in ms) to keep the notification on screen (if **negative** - notification will stay **forever** or until clicked) */
    duration: {
      type: Number,
      default: 3e3
    },
    delay: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1 / 0
    },
    ignoreDuplicates: {
      type: Boolean,
      default: !1
    },
    closeOnClick: {
      type: Boolean,
      default: !0
    },
    pauseOnHover: {
      type: Boolean,
      default: !1
    },
    /** Use [v-html](https://vuejs.org/api/built-in-directives.html#v-html) to set `title` and `text` */
    dangerouslySetInnerHtml: {
      type: Boolean,
      default: !1
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    click: (t) => !0,
    destroy: (t) => !0,
    start: (t) => !0
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  slots: Object,
  setup: (t, {
    emit: i,
    slots: o,
    expose: a
  }) => {
    const r = M([]), x = M(null), D = j.get("velocity"), v = y(() => t.animationType === "velocity"), c = y(() => r.value.filter((e) => e.state !== g.DESTROYED)), S = y(() => rt(t.width)), N = y(() => {
      const {
        x: e,
        y: n
      } = ut(t.position), s = S.value.value, u = S.value.type, p = {
        width: s + u
      };
      return n && (p[n] = "0px"), e && (e === "center" ? p.left = `calc(50% - ${+s / 2}${u})` : p[e] = "0px"), p;
    }), B = y(() => v.value ? {
      onEnter: q,
      onLeave: z,
      onAfterLeave: w
    } : {}), C = (e) => {
      i("click", e), t.closeOnClick && d(e);
    }, L = () => {
      var e;
      t.pauseOnHover && ((e = x.value) == null || e.pause());
    }, P = () => {
      var e;
      t.pauseOnHover && ((e = x.value) == null || e.resume());
    }, Y = (e = {}) => {
      if (e.group || (e.group = ""), e.data || (e.data = {}), t.group !== e.group)
        return;
      if (e.clean || e.clear) {
        W();
        return;
      }
      const n = typeof e.duration == "number" ? e.duration : t.duration, s = typeof e.speed == "number" ? e.speed : t.speed, u = typeof e.ignoreDuplicates == "boolean" ? e.ignoreDuplicates : t.ignoreDuplicates, {
        title: p,
        text: J,
        type: K,
        data: Q,
        id: U
      } = e, f = {
        id: U || lt(),
        title: p,
        text: J,
        type: K,
        state: g.IDLE,
        speed: s,
        length: n + 2 * s,
        data: Q,
        duplicates: 0
      };
      n >= 0 && (x.value = new ot(() => d(f), f.length, f));
      const I = "bottom" in N.value, X = t.reverse ? !I : I;
      let m = -1;
      const A = c.value.find(($) => $.title === e.title && $.text === e.text);
      if (u && A) {
        A.duplicates++;
        return;
      }
      X ? (r.value.push(f), i("start", f), c.value.length > t.max && (m = 0)) : (r.value.unshift(f), i("start", f), c.value.length > t.max && (m = c.value.length - 1)), m !== -1 && d(c.value[m]);
    }, V = (e) => {
      G(e);
    }, _ = (e) => ["vue-notification-template", t.classes, e.type || ""], F = (e) => v.value ? void 0 : {
      transition: `all ${e.speed}ms`
    }, d = (e) => {
      clearTimeout(e.timer), e.state = g.DESTROYED, w(), i("destroy", e);
    }, G = (e) => {
      const n = r.value.find((s) => s.id === e);
      n && d(n);
    }, W = () => {
      c.value.forEach(d);
    }, O = (e, n) => {
      var u;
      const s = (u = t.animation) == null ? void 0 : u[e];
      return typeof s == "function" ? s(n) : s;
    }, q = (e, n) => {
      const s = O("enter", e);
      D(e, s, {
        duration: t.speed,
        complete: n
      });
    }, z = (e, n) => {
      const s = O("leave", e);
      D(e, s, {
        duration: t.speed,
        complete: n
      });
    };
    function w() {
      r.value = r.value.filter((e) => e.state !== g.DESTROYED);
    }
    return tt(() => {
      h.on("add", Y), h.on("close", V);
    }), () => {
      let e;
      return l("div", {
        class: "vue-notification-group",
        style: N.value
      }, [l(et, nt(B.value, {
        tag: "div",
        css: !v.value,
        name: t.animationName
      }), ft(e = c.value.map((n) => l("div", {
        key: n.id,
        class: "vue-notification-wrapper",
        style: F(n),
        "data-id": n.id,
        onMouseenter: L,
        onMouseleave: P
      }, [o.body ? o.body({
        item: n,
        class: [t.classes, n.type],
        close: () => d(n)
      }) : l("div", {
        class: _(n),
        onClick: () => C(n)
      }, [t.dangerouslySetInnerHtml ? l(k, null, [n.title ? l("div", {
        class: "notification-title",
        innerHTML: n.title
      }, null) : null, l("div", {
        class: "notification-content",
        innerHTML: n.text
      }, null)]) : l(k, null, [n.title ? l("div", {
        class: "notification-title"
      }, [n.title]) : null, l("div", {
        class: "notification-content"
      }, [n.text])])])]))) ? e : {
        default: () => [e]
      })]);
    };
  }
}), E = (t) => {
  typeof t == "string" && (t = { title: "", text: t }), typeof t == "object" && h.emit("add", t);
};
E.close = (t) => {
  h.emit("close", t);
};
const gt = () => ({ notify: E }), pt = "Notifications";
function yt(t, i = {}) {
  Object.entries(i).forEach((a) => j.set(...a));
  const o = i.name || "notify";
  t.config.globalProperties["$" + o] = E, t.component(i.componentName || pt, dt);
}
const ht = {
  install: yt
};
export {
  dt as Notifications,
  ht as default,
  E as notify,
  gt as useNotification
};
