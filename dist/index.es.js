import { defineComponent as nt, useSlots as ot, ref as it, computed as h, onMounted as st, onUnmounted as at, openBlock as f, createElementBlock as d, createVNode as rt, TransitionGroup as ct, mergeProps as lt, withCtx as ut, Fragment as E, renderList as pt, normalizeStyle as ft, renderSlot as dt, normalizeClass as H, createElementVNode as D, createCommentVNode as I, toDisplayString as L } from "vue";
const S = {
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
}, P = /* @__PURE__ */ new Map();
function yt(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(i, s) {
    var n = t.get(i);
    n ? n.push(s) : t.set(i, [s]);
  }, off: function(i, s) {
    var n = t.get(i);
    n && (s ? n.splice(n.indexOf(s) >>> 0, 1) : t.set(i, []));
  }, emit: function(i, s) {
    var n = t.get(i);
    n && n.slice().map(function(r) {
      r(s);
    }), (n = t.get("*")) && n.slice().map(function(r) {
      r(i, s);
    });
  } };
}
const g = yt(), N = "[-+]?[0-9]*.?[0-9]+", B = [
  {
    name: "px",
    regexp: new RegExp(`^${N}px$`)
  },
  {
    name: "%",
    regexp: new RegExp(`^${N}%$`)
  },
  /**
   * Fallback option
   * If no suffix specified, assigning "px"
   */
  {
    name: "px",
    regexp: new RegExp(`^${N}$`)
  }
], mt = (t) => {
  if (t === "auto")
    return {
      type: t,
      value: 0
    };
  for (let i = 0; i < B.length; i++) {
    const s = B[i];
    if (s.regexp.test(t))
      return {
        type: s.name,
        value: parseFloat(t)
      };
  }
  return {
    type: "",
    value: t
  };
}, gt = (t) => {
  switch (typeof t) {
    case "number":
      return { type: "px", value: t };
    case "string":
      return mt(t);
    default:
      return { type: "", value: t };
  }
}, R = {
  x: /* @__PURE__ */ new Set(["left", "center", "right"]),
  y: /* @__PURE__ */ new Set(["top", "bottom"])
}, ht = /* @__PURE__ */ ((t) => () => t++)(0), vt = (t) => typeof t != "string" ? [] : t.split(/\s+/gi).filter(Boolean), xt = (t) => {
  typeof t == "string" && (t = vt(t));
  let i = null, s = null;
  return t.forEach((n) => {
    R.y.has(n) && (s = n), R.x.has(n) && (i = n);
  }), { x: i, y: s };
}, Tt = (t, i) => {
  let s, n, r = i;
  const c = () => {
    n = Date.now(), s = setTimeout(t, r);
  }, v = () => {
    clearTimeout(s), r -= Date.now() - n;
  };
  return c(), {
    start: c,
    stop: v
  };
}, Et = {
  class: "vue-notification-group",
  style: {}
}, Dt = ["data-id", "onMouseenter", "onMouseleave"], St = ["onClick"], Nt = ["innerHTML"], bt = ["innerHTML"], _t = {
  key: 0,
  class: "notification-title"
}, wt = { class: "notification-content" }, $t = /* @__PURE__ */ nt({
  __name: "Notifications",
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
      default: () => S.position
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
        return S.velocityAnimation;
      }
    },
    animationName: {
      type: String,
      default: S.cssAnimation
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
  emits: ["click", "destroy", "start"],
  setup(t, { emit: i }) {
    const s = {
      IDLE: 0,
      DESTROYED: 2
    }, n = t, r = i;
    ot();
    const c = it([]), v = P.get("velocity"), T = h(() => n.animationType === "velocity"), l = h(() => c.value.filter((e) => e.state !== s.DESTROYED)), _ = h(() => gt(n.width)), V = h(() => {
      const { x: e, y: a } = xt(n.position), o = _.value.value, u = _.value.type, m = {
        width: o + u
      };
      return a && (m[a] = "0px"), e && (e === "center" ? m.left = `calc(50% - ${+o / 2}${u})` : m[e] = "0px"), m;
    }), Y = h(() => T.value ? {
      onEnter: J,
      onLeave: K,
      onAfterLeave: k
    } : {}), j = (e) => {
      r("click", e), n.closeOnClick && y(e);
    }, z = (e) => {
      n.pauseOnHover && e.timer?.stop();
    }, F = (e) => {
      n.pauseOnHover && e.timer?.start();
    }, w = (e = {}) => {
      if (e.group ||= "", e.data ||= {}, n.group !== e.group)
        return;
      if (e.clean || e.clear) {
        q();
        return;
      }
      const a = typeof e.duration == "number" ? e.duration : n.duration, o = typeof e.speed == "number" ? e.speed : n.speed, u = typeof e.ignoreDuplicates == "boolean" ? e.ignoreDuplicates : n.ignoreDuplicates, { title: m, text: Q, type: X, data: Z, id: tt } = e, p = {
        id: tt || ht(),
        title: m,
        text: Q,
        type: X,
        state: s.IDLE,
        speed: o,
        length: a + 2 * o,
        data: Z,
        duplicates: 0
      };
      a >= 0 && (p.timer = Tt(() => y(p), p.length));
      const M = "bottom" in V.value, et = n.reverse ? !M : M;
      let x = -1;
      const A = l.value.find((C) => C.title === e.title && C.text === e.text);
      if (u && A) {
        A.duplicates++;
        return;
      }
      et ? (c.value.push(p), r("start", p), l.value.length > n.max && (x = 0)) : (c.value.unshift(p), r("start", p), l.value.length > n.max && (x = l.value.length - 1)), x !== -1 && y(l.value[x]);
    }, $ = (e) => {
      U(e);
    }, G = (e) => ["vue-notification-template", n.classes, e.type || ""], W = (e) => T.value ? void 0 : { transition: `all ${e.speed}ms` }, y = (e) => {
      e.timer?.stop(), e.state = s.DESTROYED, k(), r("destroy", e);
    }, U = (e) => {
      const a = c.value.find((o) => o.id === e);
      a && y(a);
    }, q = () => {
      l.value.forEach(y);
    }, O = (e, a) => {
      const o = n.animation?.[e];
      return typeof o == "function" ? o(a) : o;
    }, J = (e, a) => {
      const o = O("enter", e);
      v(e, o, {
        duration: n.speed,
        complete: a
      });
    }, K = (e, a) => {
      const o = O("leave", e);
      v(e, o, {
        duration: n.speed,
        complete: a
      });
    };
    function k() {
      c.value = c.value.filter((e) => e.state !== s.DESTROYED);
    }
    return st(() => {
      g.on("add", w), g.on("close", $);
    }), at(() => {
      g.off("add", w), g.off("close", $);
    }), (e, a) => (f(), d("div", Et, [
      rt(ct, lt(Y.value, {
        tag: "div",
        css: !T.value,
        name: n.animationName
      }), {
        default: ut(() => [
          (f(!0), d(E, null, pt(l.value, (o) => (f(), d("div", {
            key: o.id,
            class: "vue-notification-wrapper",
            style: ft(W(o)),
            "data-id": o.id,
            onMouseenter: (u) => z(o),
            onMouseleave: (u) => F(o)
          }, [
            dt(e.$slots, "body", {
              item: o,
              class: H([t.classes, o.type]),
              close: () => y(o)
            }, () => [
              D("div", {
                class: H(G(o)),
                onClick: (u) => j(o)
              }, [
                t.dangerouslySetInnerHtml ? (f(), d(E, { key: 0 }, [
                  o.title ? (f(), d("div", {
                    key: 0,
                    class: "notification-title",
                    innerHTML: o.title
                  }, null, 8, Nt)) : I("", !0),
                  D("div", {
                    class: "notification-content",
                    innerHTML: o.text
                  }, null, 8, bt)
                ], 64)) : (f(), d(E, { key: 1 }, [
                  o.title ? (f(), d("div", _t, L(o.title), 1)) : I("", !0),
                  D("div", wt, L(o.text), 1)
                ], 64))
              ], 10, St)
            ])
          ], 44, Dt))), 128))
        ]),
        _: 3
      }, 16, ["css", "name"])
    ]));
  }
}), b = (t) => {
  typeof t == "string" && (t = { title: "", text: t }), typeof t == "object" && g.emit("add", t);
};
b.close = (t) => {
  g.emit("close", t);
};
const At = () => ({ notify: b }), Ot = "Notifications";
function kt(t, i = {}) {
  Object.entries(i).forEach((n) => {
    P.set(...n);
  });
  const s = i.name || "notify";
  t.config.globalProperties[`$${s}`] = b, t.component(i.componentName || Ot, $t);
}
const Ct = {
  install: kt
};
export {
  $t as Notifications,
  Ct as default,
  b as notify,
  At as useNotification
};
