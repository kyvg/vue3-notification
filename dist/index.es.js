(function(){"use strict";var o;try{if(typeof document<"u"){var e=document.createElement("style");e.nonce=(o=document.head.querySelector("meta[property=csp-nonce]"))==null?void 0:o.content,e.appendChild(document.createTextNode(".vue-notification-group{display:block;position:fixed;z-index:5000}.vue-notification-wrapper{display:block;overflow:hidden;width:100%;margin:0;padding:0}.notification-title{font-weight:600}.vue-notification-template{display:block;box-sizing:border-box;background:white;text-align:left}.vue-notification{display:block;box-sizing:border-box;text-align:left;font-size:12px;padding:10px;margin:0 5px 5px;color:#fff;background:#44A4FC;border-left:5px solid #187FE7}.vue-notification.warn{background:#ffb648;border-left-color:#f48a06}.vue-notification.error{background:#E54D42;border-left-color:#b82e24}.vue-notification.success{background:#68CD86;border-left-color:#42a85f}.vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move{transition:all .5s}.vn-fade-enter-from,.vn-fade-leave-to{opacity:0}")),document.head.appendChild(e)}}catch(i){console.error("vite-plugin-css-injected-by-js",i)}})();
import { defineComponent as S, createVNode as s, TransitionGroup as H, ref as b, computed as y, onMounted as tt, Fragment as L, withDirectives as et, resolveDirective as nt, isVNode as it } from "vue";
const R = /* @__PURE__ */ new Map();
class ot {
  constructor(n, o, i) {
    this.remaining = o, this.callback = n, this.notifyItem = i, this.resume();
  }
  pause() {
    clearTimeout(this.notifyItem.timer), this.remaining -= Date.now() - this.start;
  }
  resume() {
    this.start = Date.now(), clearTimeout(this.notifyItem.timer), this.notifyItem.timer = setTimeout(this.callback, this.remaining);
  }
}
function at(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(n, o) {
    var i = t.get(n);
    i ? i.push(o) : t.set(n, [o]);
  }, off: function(n, o) {
    var i = t.get(n);
    i && (o ? i.splice(i.indexOf(o) >>> 0, 1) : t.set(n, []));
  }, emit: function(n, o) {
    var i = t.get(n);
    i && i.slice().map(function(c) {
      c(o);
    }), (i = t.get("*")) && i.slice().map(function(c) {
      c(n, o);
    });
  } };
}
const T = at(), D = "[-+]?[0-9]*.?[0-9]+", M = [
  {
    name: "px",
    regexp: new RegExp(`^${D}px$`)
  },
  {
    name: "%",
    regexp: new RegExp(`^${D}%$`)
  },
  /**
   * Fallback option
   * If no suffix specified, assigning "px"
   */
  {
    name: "px",
    regexp: new RegExp(`^${D}$`)
  }
], rt = (t) => {
  if (t === "auto")
    return {
      type: t,
      value: 0
    };
  for (let n = 0; n < M.length; n++) {
    const o = M[n];
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
}, st = (t) => {
  switch (typeof t) {
    case "number":
      return { type: "px", value: t };
    case "string":
      return rt(t);
    default:
      return { type: "", value: t };
  }
}, k = {
  x: /* @__PURE__ */ new Set(["left", "center", "right"]),
  y: /* @__PURE__ */ new Set(["top", "bottom"])
}, lt = /* @__PURE__ */ ((t) => () => t++)(0), ct = (t) => typeof t != "string" ? [] : t.split(/\s+/gi).filter(Boolean), ut = (t) => {
  typeof t == "string" && (t = ct(t));
  let n = null, o = null;
  return t.forEach((i) => {
    k.y.has(i) && (o = i), k.x.has(i) && (n = i);
  }), { x: n, y: o };
}, E = {
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
}, ft = /* @__PURE__ */ S({
  name: "velocity-group",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    enter: (t, n) => !0,
    leave: (t, n) => !0,
    "after-leave": () => !0
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  setup: (t, {
    slots: n,
    emit: o
  }) => {
    const i = (l, g) => {
      o("enter", l, g);
    }, c = (l, g) => {
      o("leave", l, g);
    }, h = () => {
      o("after-leave");
    };
    return () => s(H, {
      tag: "name",
      css: !1,
      name: t.name,
      onEnter: i,
      onLeave: c,
      onAfterLeave: h
    }, {
      default: () => {
        var l;
        return [(l = n.default) == null ? void 0 : l.call(n)];
      }
    });
  }
}), dt = /* @__PURE__ */ S({
  name: "css-group",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup: (t, {
    slots: n
  }) => () => s(H, {
    tag: "name",
    name: t.name
  }, {
    default: () => {
      var o;
      return [(o = n.default) == null ? void 0 : o.call(n)];
    }
  })
});
function pt(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !it(t);
}
const x = {
  IDLE: 0,
  DESTROYED: 2
}, mt = /* @__PURE__ */ S({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "notifications",
  props: {
    group: {
      type: String,
      default: ""
    },
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
      default: () => E.position
    },
    classes: {
      type: String,
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
        return E.velocityAnimation;
      }
    },
    animationName: {
      type: String,
      default: E.cssAnimation
    },
    speed: {
      type: Number,
      default: 300
    },
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
  setup: (t, {
    emit: n,
    slots: o
  }) => {
    const i = b([]), c = b(null), h = b(R.get("velocity")), l = y(() => t.animationType === "velocity"), g = y(() => l.value ? ft : dt), u = y(() => i.value.filter((e) => e.state !== x.DESTROYED)), A = y(() => st(t.width)), N = y(() => {
      const {
        x: e,
        y: a
      } = ut(t.position), r = A.value.value, f = A.value.type, m = {
        width: r + f
      };
      return a && (m[a] = "0px"), e && (e === "center" ? m.left = `calc(50% - ${+r / 2}${f})` : m[e] = "0px"), m;
    }), O = y(() => "bottom" in N.value), j = (e) => {
      n("click", e), t.closeOnClick && p(e);
    }, B = () => {
      var e;
      t.pauseOnHover && ((e = c.value) == null || e.pause());
    }, V = () => {
      var e;
      t.pauseOnHover && ((e = c.value) == null || e.resume());
    }, Y = (e = {}) => {
      if (e.group || (e.group = ""), e.data || (e.data = {}), t.group !== e.group)
        return;
      if (e.clean || e.clear) {
        W();
        return;
      }
      const a = typeof e.duration == "number" ? e.duration : t.duration, r = typeof e.speed == "number" ? e.speed : t.speed, f = typeof e.ignoreDuplicates == "boolean" ? e.ignoreDuplicates : t.ignoreDuplicates, {
        title: m,
        text: J,
        type: K,
        data: Q,
        id: U
      } = e, d = {
        id: U || lt(),
        title: m,
        text: J,
        type: K,
        state: x.IDLE,
        speed: r,
        length: a + 2 * r,
        data: Q
      };
      a >= 0 && (c.value = new ot(() => p(d), d.length, d));
      const X = t.reverse ? !O.value : O.value;
      let v = -1;
      const Z = u.value.some((C) => C.title === e.title && C.text === e.text);
      (!f || !Z) && (X ? (i.value.push(d), n("start", d), u.value.length > t.max && (v = 0)) : (i.value.unshift(d), n("start", d), u.value.length > t.max && (v = u.value.length - 1)), v !== -1 && p(u.value[v]));
    }, G = (e) => {
      P(e);
    }, _ = (e) => ["vue-notification-template", t.classes, e.type || ""], F = (e) => l.value ? void 0 : {
      transition: `all ${e.speed}ms`
    }, p = (e) => {
      clearTimeout(e.timer), e.state = x.DESTROYED, $(), n("destroy", e);
    }, P = (e) => {
      const a = i.value.find((r) => r.id === e);
      a && p(a);
    }, W = () => {
      u.value.forEach(p);
    }, I = (e, a) => {
      var f;
      const r = (f = t.animation) == null ? void 0 : f[e];
      return typeof r == "function" ? r(a) : r;
    }, q = (e, a) => {
      if (!l.value)
        return;
      const r = I("enter", e);
      h.value(e, r, {
        duration: t.speed,
        complete: a
      });
    }, z = (e, a) => {
      if (!l.value)
        return;
      const r = I("leave", e);
      h.value(e, r, {
        duration: t.speed,
        complete: a
      });
    };
    function $() {
      i.value = i.value.filter((e) => e.state !== x.DESTROYED);
    }
    return tt(() => {
      T.on("add", Y), T.on("close", G);
    }), () => {
      let e;
      return s("div", {
        class: "vue-notification-group",
        style: N.value
      }, [s(g.value, {
        name: t.animationName,
        onEnter: q,
        onLeave: z,
        "onAfter-leave": $
      }, pt(e = u.value.map((a) => s("div", {
        key: a.id,
        class: "vue-notification-wrapper",
        style: F(a),
        "data-id": a.id,
        onMouseenter: B,
        onMouseleave: V
      }, [o.body ? o.body({
        item: a,
        class: [t.classes, a.type].join(""),
        close: () => p(a)
      }) : s("div", {
        class: _(a),
        onClick: () => j(a)
      }, [t.dangerouslySetInnerHtml ? s(L, null, [a.title ? s("div", {
        class: "notification-title",
        innerHTML: "item.title"
      }, null) : null, s("div", {
        class: "notification-content",
        innerHTML: "item.text"
      }, null)]) : s(L, null, [a.title ? et(s("div", {
        class: "notification-title"
      }, [a.title]), [[nt("if"), "item.title"]]) : null, s("div", {
        class: "notification-content"
      }, [a.text])])])]))) ? e : {
        default: () => [e]
      })]);
    };
  }
}), w = (t) => {
  typeof t == "string" && (t = { title: "", text: t }), typeof t == "object" && T.emit("add", t);
};
w.close = (t) => {
  T.emit("close", t);
};
const xt = () => ({ notify: w }), yt = "Notifications";
function gt(t, n = {}) {
  Object.entries(n).forEach((i) => R.set(...i));
  const o = n.name || "notify";
  t.config.globalProperties["$" + o] = w, t.component(n.componentName || yt, mt);
}
const Tt = {
  install: gt
};
export {
  Tt as default,
  w as notify,
  xt as useNotification
};
