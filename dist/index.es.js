(function(){var o;"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.nonce=(o=document.head.querySelector("meta[property=csp-nonce]"))==null?void 0:o.content,e.appendChild(document.createTextNode(".vue-notification-group{display:block;position:fixed;z-index:5000}.vue-notification-wrapper{display:block;overflow:hidden;width:100%;margin:0;padding:0}.notification-title{font-weight:600}.vue-notification-template{display:block;box-sizing:border-box;background:white;text-align:left}.vue-notification{display:block;box-sizing:border-box;text-align:left;font-size:12px;padding:10px;margin:0 5px 5px;color:#fff;background:#44A4FC;border-left:5px solid #187FE7}.vue-notification.warn{background:#ffb648;border-left-color:#f48a06}.vue-notification.error{background:#E54D42;border-left-color:#b82e24}.vue-notification.success{background:#68CD86;border-left-color:#42a85f}.vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move{transition:all .5s}.vn-fade-enter-from,.vn-fade-leave-to{opacity:0}")),document.head.appendChild(e)}}catch(i){console.error("vite-plugin-css-injected-by-js",i)}})();
import { defineComponent as $, openBlock as d, createBlock as w, TransitionGroup as Y, withCtx as A, renderSlot as b, ref as T, computed as h, onMounted as at, createElementBlock as _, normalizeStyle as B, resolveDynamicComponent as rt, Fragment as lt, renderList as ct, normalizeClass as H, createElementVNode as R, createCommentVNode as ut } from "vue";
function ft(e) {
  return { all: e = e || /* @__PURE__ */ new Map(), on: function(o, n) {
    var i = e.get(o);
    i ? i.push(n) : e.set(o, [n]);
  }, off: function(o, n) {
    var i = e.get(o);
    i && (n ? i.splice(i.indexOf(n) >>> 0, 1) : e.set(o, []));
  }, emit: function(o, n) {
    var i = e.get(o);
    i && i.slice().map(function(r) {
      r(n);
    }), (i = e.get("*")) && i.slice().map(function(r) {
      r(o, n);
    });
  } };
}
const x = ft(), G = /* @__PURE__ */ new Map(), S = {
  x: ["left", "center", "right"],
  y: ["top", "bottom"]
}, pt = ((e) => () => e++)(0), dt = (e) => typeof e != "string" ? [] : e.split(/\s+/gi).filter((o) => o), mt = (e) => {
  typeof e == "string" && (e = dt(e));
  let o = null, n = null;
  return e.forEach((i) => {
    S.y.indexOf(i) !== -1 && (n = i), S.x.indexOf(i) !== -1 && (o = i);
  }), { x: o, y: n };
};
class yt {
  constructor(o, n, i) {
    this.remaining = n, this.callback = o, this.notifyItem = i, this.resume();
  }
  pause() {
    clearTimeout(this.notifyItem.timer), this.remaining -= Date.now() - this.start;
  }
  resume() {
    this.start = Date.now(), clearTimeout(this.notifyItem.timer), this.notifyItem.timer = setTimeout(this.callback, this.remaining);
  }
}
const E = {
  position: ["top", "right"],
  cssAnimation: "vn-fade",
  velocityAnimation: {
    enter: (e) => ({
      height: [e.clientHeight, 0],
      opacity: [1, 0]
    }),
    leave: {
      height: 0,
      opacity: [0, 1]
    }
  }
}, ht = /* @__PURE__ */ $({
  __name: "VelocityGroup",
  emits: ["enter", "leave", "after-leave"],
  setup(e, { emit: o }) {
    const n = (l, u) => {
      o("enter", l, u);
    }, i = (l, u) => {
      o("leave", l, u);
    }, r = () => {
      o("after-leave");
    };
    return (l, u) => (d(), w(Y, {
      tag: "span",
      css: !1,
      onEnter: n,
      onLeave: i,
      onAfterLeave: r
    }, {
      default: A(() => [
        b(l.$slots, "default")
      ]),
      _: 3
    }));
  }
}), gt = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "CssGroup",
  props: {
    name: {}
  },
  setup(e) {
    return (o, n) => (d(), w(Y, {
      tag: "span",
      name: o.name
    }, {
      default: A(() => [
        b(o.$slots, "default")
      ]),
      _: 3
    }, 8, ["name"]));
  }
}), D = "[-+]?[0-9]*.?[0-9]+", V = [
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
], vt = (e) => {
  if (e === "auto")
    return {
      type: e,
      value: 0
    };
  for (let o = 0; o < V.length; o++) {
    const n = V[o];
    if (n.regexp.test(e))
      return {
        type: n.name,
        value: parseFloat(e)
      };
  }
  return {
    type: "",
    value: e
  };
}, _t = (e) => {
  switch (typeof e) {
    case "number":
      return { type: "px", value: e };
    case "string":
      return vt(e);
    default:
      return { type: "", value: e };
  }
}, xt = ["data-id"], Tt = ["onClick"], Et = ["innerHTML"], Dt = ["innerHTML"], $t = /* @__PURE__ */ $({
  __name: "Notifications",
  props: {
    group: { default: "" },
    width: { default: 300 },
    reverse: { type: Boolean, default: !1 },
    position: { default: E.position },
    classes: { default: "vue-notification" },
    animationType: { default: "css" },
    animation: { default: E.velocityAnimation },
    animationName: { default: E.cssAnimation },
    speed: { default: 300 },
    duration: { default: 3e3 },
    delay: { default: 0 },
    max: { default: 1 / 0 },
    ignoreDuplicates: { type: Boolean, default: !1 },
    closeOnClick: { type: Boolean, default: !0 },
    pauseOnHover: { type: Boolean, default: !1 }
  },
  emits: ["click", "destroy", "start"],
  setup(e, { emit: o }) {
    const n = e, i = {
      IDLE: 0,
      DESTROYED: 2
    }, r = T([]), l = T(null), u = T(G.get("velocity")), g = h(() => n.animationType === "velocity"), j = h(() => g.value ? ht : gt), f = h(() => r.value.filter((t) => t.state !== i.DESTROYED)), L = h(() => _t(n.width)), O = h(() => {
      const { x: t, y: a } = mt(n.position), s = L.value.value, c = L.value.type, y = {
        width: s + c
      };
      return a && (y[a] = "0px"), t && (t === "center" ? y.left = `calc(50% - ${+s / 2}${c})` : y[t] = "0px"), y;
    }), C = h(() => "bottom" in O.value), z = (t) => {
      o("click", t), n.closeOnClick && m(t);
    }, F = () => {
      var t;
      n.pauseOnHover && ((t = l.value) == null || t.pause());
    }, W = () => {
      var t;
      n.pauseOnHover && ((t = l.value) == null || t.resume());
    }, P = (t = {}) => {
      if (t.group || (t.group = ""), t.data || (t.data = {}), n.group !== t.group)
        return;
      if (t.clean || t.clear) {
        U();
        return;
      }
      const a = typeof t.duration == "number" ? t.duration : n.duration, s = typeof t.speed == "number" ? t.speed : n.speed, c = typeof t.ignoreDuplicates == "boolean" ? t.ignoreDuplicates : n.ignoreDuplicates, { title: y, text: tt, type: et, data: nt, id: ot } = t, p = {
        id: ot || pt(),
        title: y,
        text: tt,
        type: et,
        state: i.IDLE,
        speed: s,
        length: a + 2 * s,
        data: nt
      };
      a >= 0 && (l.value = new yt(() => m(p), p.length, p));
      const it = n.reverse ? !C.value : C.value;
      let v = -1;
      const st = f.value.some((M) => M.title === t.title && M.text === t.text);
      (!c || !st) && (it ? (r.value.push(p), o("start", p), f.value.length > n.max && (v = 0)) : (r.value.unshift(p), o("start", p), f.value.length > n.max && (v = f.value.length - 1)), v !== -1 && m(f.value[v]));
    }, q = (t) => {
      Q(t);
    }, J = (t) => [
      "vue-notification-template",
      n.classes,
      t.type || ""
    ], K = (t) => g.value ? void 0 : { transition: `all ${t.speed}ms` }, m = (t) => {
      clearTimeout(t.timer), t.state = i.DESTROYED, N(), o("destroy", t);
    }, Q = (t) => {
      const a = r.value.find((s) => s.id === t);
      a && m(a);
    }, U = () => {
      f.value.forEach(m);
    }, I = (t, a) => {
      var c;
      const s = (c = n.animation) == null ? void 0 : c[t];
      return typeof s == "function" ? s(a) : s;
    }, X = (t, a) => {
      if (!g.value)
        return;
      const s = I("enter", t);
      u.value(t, s, {
        duration: n.speed,
        complete: a
      });
    }, Z = (t, a) => {
      if (!g.value)
        return;
      const s = I("leave", t);
      u.value(t, s, {
        duration: n.speed,
        complete: a
      });
    };
    function N() {
      r.value = r.value.filter((t) => t.state !== i.DESTROYED);
    }
    return at(() => {
      x.on("add", P), x.on("close", q);
    }), (t, a) => (d(), _("div", {
      class: "vue-notification-group",
      style: B(O.value)
    }, [
      (d(), w(rt(j.value), {
        name: t.animationName,
        onEnter: X,
        onLeave: Z,
        onAfterLeave: N
      }, {
        default: A(() => [
          (d(!0), _(lt, null, ct(f.value, (s) => (d(), _("div", {
            key: s.id,
            class: "vue-notification-wrapper",
            style: B(K(s)),
            "data-id": s.id,
            onMouseenter: F,
            onMouseleave: W
          }, [
            b(t.$slots, "body", {
              class: H([t.classes, s.type]),
              item: s,
              close: () => m(s)
            }, () => [
              R("div", {
                class: H(J(s)),
                onClick: (c) => z(s)
              }, [
                s.title ? (d(), _("div", {
                  key: 0,
                  class: "notification-title",
                  innerHTML: s.title
                }, null, 8, Et)) : ut("", !0),
                R("div", {
                  class: "notification-content",
                  innerHTML: s.text
                }, null, 8, Dt)
              ], 10, Tt)
            ])
          ], 44, xt))), 128))
        ]),
        _: 3
      }, 40, ["name"]))
    ], 4));
  }
});
const k = (e) => {
  typeof e == "string" && (e = { title: "", text: e }), typeof e == "object" && x.emit("add", e);
};
k.close = (e) => {
  x.emit("close", e);
};
const kt = () => ({ notify: k });
function wt(e, o = {}) {
  Object.entries(o).forEach((i) => G.set(...i));
  const n = o.name || "notify";
  e.config.globalProperties["$" + n] = k, e.component(o.componentName || "Notifications", $t);
}
const Lt = {
  install: wt
};
export {
  Lt as default,
  k as notify,
  kt as useNotification
};
