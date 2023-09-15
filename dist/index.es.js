(function(){var o;"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.nonce=(o=document.head.querySelector("meta[property=csp-nonce]"))==null?void 0:o.content,e.appendChild(document.createTextNode(".vue-notification-group{display:block;position:fixed;z-index:5000}.vue-notification-wrapper{display:block;overflow:hidden;width:100%;margin:0;padding:0}.notification-title{font-weight:600}.vue-notification-template{display:block;box-sizing:border-box;background:white;text-align:left}.vue-notification{display:block;box-sizing:border-box;text-align:left;font-size:12px;padding:10px;margin:0 5px 5px;color:#fff;background:#44A4FC;border-left:5px solid #187FE7}.vue-notification.warn{background:#ffb648;border-left-color:#f48a06}.vue-notification.error{background:#E54D42;border-left-color:#b82e24}.vue-notification.success{background:#68CD86;border-left-color:#42a85f}.vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move{transition:all .5s}.vn-fade-enter-from,.vn-fade-leave-to{opacity:0}")),document.head.appendChild(e)}}catch(i){console.error("vite-plugin-css-injected-by-js",i)}})();
import { defineComponent as $, openBlock as l, createBlock as A, TransitionGroup as z, withCtx as I, renderSlot as b, ref as T, computed as g, onMounted as ct, createElementBlock as m, normalizeStyle as M, resolveDynamicComponent as ut, Fragment as D, renderList as ft, normalizeClass as R, createElementVNode as E, createCommentVNode as V, toDisplayString as Y } from "vue";
const F = /* @__PURE__ */ new Map();
class pt {
  constructor(o, n, s) {
    this.remaining = n, this.callback = o, this.notifyItem = s, this.resume();
  }
  pause() {
    clearTimeout(this.notifyItem.timer), this.remaining -= Date.now() - this.start;
  }
  resume() {
    this.start = Date.now(), clearTimeout(this.notifyItem.timer), this.notifyItem.timer = setTimeout(this.callback, this.remaining);
  }
}
function dt(e) {
  return { all: e = e || /* @__PURE__ */ new Map(), on: function(o, n) {
    var s = e.get(o);
    s ? s.push(n) : e.set(o, [n]);
  }, off: function(o, n) {
    var s = e.get(o);
    s && (n ? s.splice(s.indexOf(n) >>> 0, 1) : e.set(o, []));
  }, emit: function(o, n) {
    var s = e.get(o);
    s && s.slice().map(function(r) {
      r(n);
    }), (s = e.get("*")) && s.slice().map(function(r) {
      r(o, n);
    });
  } };
}
const x = dt(), w = "[-+]?[0-9]*.?[0-9]+", G = [
  {
    name: "px",
    regexp: new RegExp(`^${w}px$`)
  },
  {
    name: "%",
    regexp: new RegExp(`^${w}%$`)
  },
  /**
   * Fallback option
   * If no suffix specified, assigning "px"
   */
  {
    name: "px",
    regexp: new RegExp(`^${w}$`)
  }
], mt = (e) => {
  if (e === "auto")
    return {
      type: e,
      value: 0
    };
  for (let o = 0; o < G.length; o++) {
    const n = G[o];
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
}, yt = (e) => {
  switch (typeof e) {
    case "number":
      return { type: "px", value: e };
    case "string":
      return mt(e);
    default:
      return { type: "", value: e };
  }
}, j = {
  x: /* @__PURE__ */ new Set(["left", "center", "right"]),
  y: /* @__PURE__ */ new Set(["top", "bottom"])
}, ht = ((e) => () => e++)(0), gt = (e) => typeof e != "string" ? [] : e.split(/\s+/gi).filter(Boolean), vt = (e) => {
  typeof e == "string" && (e = gt(e));
  let o = null, n = null;
  return e.forEach((s) => {
    j.y.has(s) && (n = s), j.x.has(s) && (o = s);
  }), { x: o, y: n };
}, k = {
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
}, _t = /* @__PURE__ */ $({
  __name: "VelocityGroup",
  emits: ["enter", "leave", "after-leave"],
  setup(e, { emit: o }) {
    const n = (c, f) => {
      o("enter", c, f);
    }, s = (c, f) => {
      o("leave", c, f);
    }, r = () => {
      o("after-leave");
    };
    return (c, f) => (l(), A(z, {
      tag: "span",
      css: !1,
      onEnter: n,
      onLeave: s,
      onAfterLeave: r
    }, {
      default: I(() => [
        b(c.$slots, "default")
      ]),
      _: 3
    }));
  }
}), xt = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "CssGroup",
  props: {
    name: {}
  },
  setup(e) {
    return (o, n) => (l(), A(z, {
      tag: "span",
      name: o.name
    }, {
      default: I(() => [
        b(o.$slots, "default")
      ]),
      _: 3
    }, 8, ["name"]));
  }
}), Tt = ["data-id"], Dt = ["onClick"], Et = ["innerHTML"], wt = ["innerHTML"], kt = {
  key: 0,
  class: "notification-title"
}, $t = { class: "notification-content" }, At = /* @__PURE__ */ $({
  __name: "Notifications",
  props: {
    group: { default: "" },
    width: { default: 300 },
    reverse: { type: Boolean, default: !1 },
    position: { default: k.position },
    classes: { default: "vue-notification" },
    animationType: { default: "css" },
    animation: { default: k.velocityAnimation },
    animationName: { default: k.cssAnimation },
    speed: { default: 300 },
    duration: { default: 3e3 },
    delay: { default: 0 },
    max: { default: 1 / 0 },
    ignoreDuplicates: { type: Boolean, default: !1 },
    closeOnClick: { type: Boolean, default: !0 },
    pauseOnHover: { type: Boolean, default: !1 },
    dangerouslySetInnerHtml: { type: Boolean, default: !1 }
  },
  emits: ["click", "destroy", "start"],
  setup(e, { emit: o }) {
    const n = e, s = {
      IDLE: 0,
      DESTROYED: 2
    }, r = T([]), c = T(null), f = T(F.get("velocity")), v = g(() => n.animationType === "velocity"), W = g(() => v.value ? _t : xt), p = g(() => r.value.filter((t) => t.state !== s.DESTROYED)), S = g(() => yt(n.width)), C = g(() => {
      const { x: t, y: a } = vt(n.position), i = S.value.value, u = S.value.type, h = {
        width: i + u
      };
      return a && (h[a] = "0px"), t && (t === "center" ? h.left = `calc(50% - ${+i / 2}${u})` : h[t] = "0px"), h;
    }), O = g(() => "bottom" in C.value), P = (t) => {
      o("click", t), n.closeOnClick && y(t);
    }, q = () => {
      var t;
      n.pauseOnHover && ((t = c.value) == null || t.pause());
    }, J = () => {
      var t;
      n.pauseOnHover && ((t = c.value) == null || t.resume());
    }, K = (t = {}) => {
      if (t.group || (t.group = ""), t.data || (t.data = {}), n.group !== t.group)
        return;
      if (t.clean || t.clear) {
        tt();
        return;
      }
      const a = typeof t.duration == "number" ? t.duration : n.duration, i = typeof t.speed == "number" ? t.speed : n.speed, u = typeof t.ignoreDuplicates == "boolean" ? t.ignoreDuplicates : n.ignoreDuplicates, { title: h, text: ot, type: it, data: st, id: at } = t, d = {
        id: at || ht(),
        title: h,
        text: ot,
        type: it,
        state: s.IDLE,
        speed: i,
        length: a + 2 * i,
        data: st
      };
      a >= 0 && (c.value = new pt(() => y(d), d.length, d));
      const rt = n.reverse ? !O.value : O.value;
      let _ = -1;
      const lt = p.value.some((N) => N.title === t.title && N.text === t.text);
      (!u || !lt) && (rt ? (r.value.push(d), o("start", d), p.value.length > n.max && (_ = 0)) : (r.value.unshift(d), o("start", d), p.value.length > n.max && (_ = p.value.length - 1)), _ !== -1 && y(p.value[_]));
    }, Q = (t) => {
      Z(t);
    }, U = (t) => [
      "vue-notification-template",
      n.classes,
      t.type || ""
    ], X = (t) => v.value ? void 0 : { transition: `all ${t.speed}ms` }, y = (t) => {
      clearTimeout(t.timer), t.state = s.DESTROYED, H(), o("destroy", t);
    }, Z = (t) => {
      const a = r.value.find((i) => i.id === t);
      a && y(a);
    }, tt = () => {
      p.value.forEach(y);
    }, B = (t, a) => {
      var u;
      const i = (u = n.animation) == null ? void 0 : u[t];
      return typeof i == "function" ? i(a) : i;
    }, et = (t, a) => {
      if (!v.value)
        return;
      const i = B("enter", t);
      f.value(t, i, {
        duration: n.speed,
        complete: a
      });
    }, nt = (t, a) => {
      if (!v.value)
        return;
      const i = B("leave", t);
      f.value(t, i, {
        duration: n.speed,
        complete: a
      });
    };
    function H() {
      r.value = r.value.filter((t) => t.state !== s.DESTROYED);
    }
    return ct(() => {
      x.on("add", K), x.on("close", Q);
    }), (t, a) => (l(), m("div", {
      class: "vue-notification-group",
      style: M(C.value)
    }, [
      (l(), A(ut(W.value), {
        name: t.animationName,
        onEnter: et,
        onLeave: nt,
        onAfterLeave: H
      }, {
        default: I(() => [
          (l(!0), m(D, null, ft(p.value, (i) => (l(), m("div", {
            key: i.id,
            class: "vue-notification-wrapper",
            style: M(X(i)),
            "data-id": i.id,
            onMouseenter: q,
            onMouseleave: J
          }, [
            b(t.$slots, "body", {
              class: R([t.classes, i.type]),
              item: i,
              close: () => y(i)
            }, () => [
              E("div", {
                class: R(U(i)),
                onClick: (u) => P(i)
              }, [
                t.dangerouslySetInnerHtml ? (l(), m(D, { key: 0 }, [
                  i.title ? (l(), m("div", {
                    key: 0,
                    class: "notification-title",
                    innerHTML: i.title
                  }, null, 8, Et)) : V("", !0),
                  E("div", {
                    class: "notification-content",
                    innerHTML: i.text
                  }, null, 8, wt)
                ], 64)) : (l(), m(D, { key: 1 }, [
                  i.title ? (l(), m("div", kt, Y(i.title), 1)) : V("", !0),
                  E("div", $t, Y(i.text), 1)
                ], 64))
              ], 10, Dt)
            ])
          ], 44, Tt))), 128))
        ]),
        _: 3
      }, 40, ["name"]))
    ], 4));
  }
});
const L = (e) => {
  typeof e == "string" && (e = { title: "", text: e }), typeof e == "object" && x.emit("add", e);
};
L.close = (e) => {
  x.emit("close", e);
};
const St = () => ({ notify: L });
function It(e, o = {}) {
  Object.entries(o).forEach((s) => F.set(...s));
  const n = o.name || "notify";
  e.config.globalProperties["$" + n] = L, e.component(o.componentName || "Notifications", At);
}
const Ct = {
  install: It
};
export {
  Ct as default,
  L as notify,
  St as useNotification
};
