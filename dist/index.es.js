(function(){"use strict";try{if(typeof document!="undefined"){var e=document.createElement("style");e.appendChild(document.createTextNode(".vue-notification-group{display:block;position:fixed;z-index:5000}.vue-notification-wrapper{display:block;overflow:hidden;width:100%;margin:0;padding:0}.notification-title{font-weight:600}.vue-notification-template{display:block;box-sizing:border-box;background:white;text-align:left}.vue-notification{display:block;box-sizing:border-box;text-align:left;font-size:12px;padding:10px;margin:0 5px 5px;color:#fff;background:#44A4FC;border-left:5px solid #187FE7}.vue-notification.warn{background:#ffb648;border-left-color:#f48a06}.vue-notification.error{background:#E54D42;border-left-color:#b82e24}.vue-notification.success{background:#68CD86;border-left-color:#42a85f}.vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move{transition:all .5s}.vn-fade-enter-from,.vn-fade-leave-to{opacity:0}")),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
var _ = Object.defineProperty;
var B = (t, e, i) => e in t ? _(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var c = (t, e, i) => (B(t, typeof e != "symbol" ? e + "" : e, i), i);
import { defineComponent as g, openBlock as r, createBlock as $, TransitionGroup as x, withCtx as T, renderSlot as v, createElementBlock as f, normalizeStyle as D, resolveDynamicComponent as H, Fragment as M, renderList as R, normalizeClass as N, createElementVNode as w, createCommentVNode as V } from "vue";
function W(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(e, i) {
    var n = t.get(e);
    n ? n.push(i) : t.set(e, [i]);
  }, off: function(e, i) {
    var n = t.get(e);
    n && (i ? n.splice(n.indexOf(i) >>> 0, 1) : t.set(e, []));
  }, emit: function(e, i) {
    var n = t.get(e);
    n && n.slice().map(function(s) {
      s(i);
    }), (n = t.get("*")) && n.slice().map(function(s) {
      s(e, i);
    });
  } };
}
const m = W(), C = /* @__PURE__ */ new Map(), I = {
  x: ["left", "center", "right"],
  y: ["top", "bottom"]
}, Y = ((t) => () => t++)(0), j = (t) => typeof t != "string" ? [] : t.split(/\s+/gi).filter((e) => e), G = (t) => {
  typeof t == "string" && (t = j(t));
  let e = null, i = null;
  return t.forEach((n) => {
    I.y.indexOf(n) !== -1 && (i = n), I.x.indexOf(n) !== -1 && (e = n);
  }), { x: e, y: i };
};
class z {
  constructor(e, i, n) {
    c(this, "start");
    c(this, "remaining");
    c(this, "notifyItem");
    c(this, "callback");
    this.remaining = i, this.callback = e, this.notifyItem = n, this.resume();
  }
  pause() {
    clearTimeout(this.notifyItem.timer), this.remaining -= Date.now() - this.start;
  }
  resume() {
    this.start = Date.now(), clearTimeout(this.notifyItem.timer), this.notifyItem.timer = setTimeout(this.callback, this.remaining);
  }
}
const h = {
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
}, F = g({
  name: "velocity-group",
  emits: ["after-leave", "leave", "enter"],
  methods: {
    enter(t, e) {
      this.$emit("enter", t, e);
    },
    leave(t, e) {
      this.$emit("leave", t, e);
    },
    afterLeave() {
      this.$emit("after-leave");
    }
  }
}), b = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [n, s] of e)
    i[n] = s;
  return i;
};
function P(t, e, i, n, s, u) {
  return r(), $(x, {
    tag: "span",
    css: !1,
    onEnter: t.enter,
    onLeave: t.leave,
    onAfterLeave: t.afterLeave
  }, {
    default: T(() => [
      v(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["onEnter", "onLeave", "onAfterLeave"]);
}
const q = /* @__PURE__ */ b(F, [["render", P]]), J = g({
  name: "css-group",
  inheritAttrs: !1,
  props: {
    name: { type: String, required: !0 }
  }
});
function K(t, e, i, n, s, u) {
  return r(), $(x, {
    tag: "span",
    name: t.name
  }, {
    default: T(() => [
      v(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["name"]);
}
const Q = /* @__PURE__ */ b(J, [["render", K]]), y = "[-+]?[0-9]*.?[0-9]+", L = [
  {
    name: "px",
    regexp: new RegExp(`^${y}px$`)
  },
  {
    name: "%",
    regexp: new RegExp(`^${y}%$`)
  },
  {
    name: "px",
    regexp: new RegExp(`^${y}$`)
  }
], U = (t) => {
  if (t === "auto")
    return {
      type: t,
      value: 0
    };
  for (let e = 0; e < L.length; e++) {
    const i = L[e];
    if (i.regexp.test(t))
      return {
        type: i.name,
        value: parseFloat(t)
      };
  }
  return {
    type: "",
    value: t
  };
}, X = (t) => {
  switch (typeof t) {
    case "number":
      return { type: "px", value: t };
    case "string":
      return U(t);
    default:
      return { type: "", value: t };
  }
}, d = {
  IDLE: 0,
  DESTROYED: 2
}, Z = g({
  name: "notifications",
  components: {
    VelocityGroup: q,
    CssGroup: Q
  },
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
      default: h.position
    },
    classes: {
      type: String,
      default: "vue-notification"
    },
    animationType: {
      type: String,
      default: "css"
    },
    animation: {
      type: Object,
      default: h.velocityAnimation
    },
    animationName: {
      type: String,
      default: h.cssAnimation
    },
    speed: {
      type: Number,
      default: 300
    },
    cooldown: {
      type: Number,
      default: 0
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
    }
  },
  emits: ["click", "destroy"],
  data() {
    return {
      list: [],
      velocity: C.get("velocity"),
      timerControl: null
    };
  },
  computed: {
    actualWidth() {
      return X(this.width);
    },
    isVA() {
      return this.animationType === "velocity";
    },
    componentName() {
      return this.isVA ? "velocity-group" : "css-group";
    },
    styles() {
      const { x: t, y: e } = G(this.position), i = this.actualWidth.value, n = this.actualWidth.type, s = {
        width: i + n
      };
      return e && (s[e] = "0px"), t && (t === "center" ? s.left = `calc(50% - ${+i / 2}${n})` : s[t] = "0px"), s;
    },
    active() {
      return this.list.filter((t) => t.state !== d.DESTROYED);
    },
    botToTop() {
      return this.styles.hasOwnProperty("bottom");
    }
  },
  mounted() {
    m.on("add", this.addItem), m.on("close", this.closeItem);
  },
  methods: {
    destroyIfNecessary(t) {
      this.$emit("click", t), this.closeOnClick && this.destroy(t);
    },
    pauseTimeout() {
      var t;
      this.pauseOnHover && ((t = this.timerControl) == null || t.pause());
    },
    resumeTimeout() {
      var t;
      this.pauseOnHover && ((t = this.timerControl) == null || t.resume());
    },
    addItem(t = {}) {
      if (t.group || (t.group = ""), t.data || (t.data = {}), this.group !== t.group)
        return;
      if (t.clean || t.clear) {
        this.destroyAll();
        return;
      }
      const e = typeof t.duration == "number" ? t.duration : this.duration, i = typeof t.speed == "number" ? t.speed : this.speed, n = typeof t.ignoreDuplicates == "boolean" ? t.ignoreDuplicates : this.ignoreDuplicates, { title: s, text: u, type: o, data: a, id: O } = t, l = {
        id: O || Y(),
        title: s,
        text: u,
        type: o,
        state: d.IDLE,
        speed: i,
        length: e + 2 * i,
        data: a
      };
      e >= 0 && (this.timerControl = new z(() => this.destroy(l), l.length, l));
      const S = this.reverse ? !this.botToTop : this.botToTop;
      let p = -1;
      const k = this.active.some((E) => E.title === t.title && E.text === t.text);
      (!n || !k) && (S ? (this.list.push(l), this.active.length > this.max && (p = 0)) : (this.list.unshift(l), this.active.length > this.max && (p = this.active.length - 1)), p !== -1 && this.destroy(this.active[p]));
    },
    closeItem(t) {
      this.destroyById(t);
    },
    notifyClass(t) {
      var e;
      return [
        "vue-notification-template",
        this.classes,
        (e = t.type) != null ? e : ""
      ];
    },
    notifyWrapperStyle(t) {
      return this.isVA ? void 0 : { transition: `all ${t.speed}ms` };
    },
    destroy(t) {
      clearTimeout(t.timer), t.state = d.DESTROYED, this.clean(), this.$emit("destroy", t);
    },
    destroyById(t) {
      const e = this.list.find((i) => i.id === t);
      e && this.destroy(e);
    },
    destroyAll() {
      this.active.forEach(this.destroy);
    },
    getAnimation(t, e) {
      var n;
      const i = (n = this.animation) == null ? void 0 : n[t];
      return typeof i == "function" ? i.call(this, e) : i;
    },
    enter(t, e) {
      if (!this.isVA)
        return;
      const i = this.getAnimation("enter", t);
      this.velocity(t, i, {
        duration: this.speed,
        complete: e
      });
    },
    leave(t, e) {
      if (!this.isVA)
        return;
      const i = this.getAnimation("leave", t);
      this.velocity(t, i, {
        duration: this.speed,
        complete: e
      });
    },
    clean() {
      this.list = this.list.filter((t) => t.state !== d.DESTROYED);
    }
  }
});
const tt = ["data-id"], et = ["onClick"], it = ["innerHTML"], nt = ["innerHTML"];
function st(t, e, i, n, s, u) {
  return r(), f("div", {
    class: "vue-notification-group",
    style: D(t.styles)
  }, [
    (r(), $(H(t.componentName), {
      name: t.animationName,
      onEnter: t.enter,
      onLeave: t.leave,
      onAfterLeave: t.clean
    }, {
      default: T(() => [
        (r(!0), f(M, null, R(t.active, (o) => (r(), f("div", {
          key: o.id,
          class: "vue-notification-wrapper",
          style: D(t.notifyWrapperStyle(o)),
          "data-id": o.id,
          onMouseenter: e[0] || (e[0] = (...a) => t.pauseTimeout && t.pauseTimeout(...a)),
          onMouseleave: e[1] || (e[1] = (...a) => t.resumeTimeout && t.resumeTimeout(...a))
        }, [
          v(t.$slots, "body", {
            class: N([t.classes, o.type]),
            item: o,
            close: () => t.destroy(o)
          }, () => [
            w("div", {
              class: N(t.notifyClass(o)),
              onClick: (a) => t.destroyIfNecessary(o)
            }, [
              o.title ? (r(), f("div", {
                key: 0,
                class: "notification-title",
                innerHTML: o.title
              }, null, 8, it)) : V("", !0),
              w("div", {
                class: "notification-content",
                innerHTML: o.text
              }, null, 8, nt)
            ], 10, et)
          ])
        ], 44, tt))), 128))
      ]),
      _: 3
    }, 40, ["name", "onEnter", "onLeave", "onAfterLeave"]))
  ], 4);
}
const ot = /* @__PURE__ */ b(Z, [["render", st]]), A = (t) => {
  typeof t == "string" && (t = { title: "", text: t }), typeof t == "object" && m.emit("add", t);
};
A.close = (t) => {
  m.emit("close", t);
};
const ut = () => ({ notify: A });
function rt(t, e = {}) {
  Object.entries(e).forEach((n) => C.set(...n));
  const i = e.name || "notify";
  t.config.globalProperties["$" + i] = A, t.component(e.componentName || "Notifications", ot);
}
const pt = {
  install: rt
};
export {
  pt as default,
  A as notify,
  ut as useNotification
};
