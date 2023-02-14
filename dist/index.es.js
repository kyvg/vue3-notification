import { defineComponent as y, openBlock as a, createBlock as g, TransitionGroup as x, withCtx as $, renderSlot as T, createElementBlock as p, normalizeStyle as b, resolveDynamicComponent as k, Fragment as _, renderList as B, normalizeClass as D, createElementVNode as N, createCommentVNode as H } from "vue";
function M(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(e, i) {
    var s = t.get(e);
    s ? s.push(i) : t.set(e, [i]);
  }, off: function(e, i) {
    var s = t.get(e);
    s && (i ? s.splice(s.indexOf(i) >>> 0, 1) : t.set(e, []));
  }, emit: function(e, i) {
    var s = t.get(e);
    s && s.slice().map(function(n) {
      n(i);
    }), (s = t.get("*")) && s.slice().map(function(n) {
      n(e, i);
    });
  } };
}
const d = M(), C = /* @__PURE__ */ new Map(), w = {
  x: ["left", "center", "right"],
  y: ["top", "bottom"]
}, R = ((t) => () => t++)(0), V = (t) => typeof t != "string" ? [] : t.split(/\s+/gi).filter((e) => e), W = (t) => {
  typeof t == "string" && (t = V(t));
  let e = null, i = null;
  return t.forEach((s) => {
    w.y.indexOf(s) !== -1 && (i = s), w.x.indexOf(s) !== -1 && (e = s);
  }), { x: e, y: i };
};
class Y {
  constructor(e, i, s) {
    this.remaining = i, this.callback = e, this.notifyItem = s, this.resume();
  }
  pause() {
    clearTimeout(this.notifyItem.timer), this.remaining -= Date.now() - this.start;
  }
  resume() {
    this.start = Date.now(), clearTimeout(this.notifyItem.timer), this.notifyItem.timer = setTimeout(this.callback, this.remaining);
  }
}
const m = {
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
}, j = y({
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
}), v = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [s, n] of e)
    i[s] = n;
  return i;
};
function G(t, e, i, s, n, c) {
  return a(), g(x, {
    tag: "span",
    css: !1,
    onEnter: t.enter,
    onLeave: t.leave,
    onAfterLeave: t.afterLeave
  }, {
    default: $(() => [
      T(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["onEnter", "onLeave", "onAfterLeave"]);
}
const z = /* @__PURE__ */ v(j, [["render", G]]), F = y({
  name: "css-group",
  inheritAttrs: !1,
  props: {
    name: { type: String, required: !0 }
  }
});
function P(t, e, i, s, n, c) {
  return a(), g(x, {
    tag: "span",
    name: t.name
  }, {
    default: $(() => [
      T(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["name"]);
}
const q = /* @__PURE__ */ v(F, [["render", P]]), h = "[-+]?[0-9]*.?[0-9]+", L = [
  {
    name: "px",
    regexp: new RegExp(`^${h}px$`)
  },
  {
    name: "%",
    regexp: new RegExp(`^${h}%$`)
  },
  /**
   * Fallback option
   * If no suffix specified, assigning "px"
   */
  {
    name: "px",
    regexp: new RegExp(`^${h}$`)
  }
], J = (t) => {
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
}, K = (t) => {
  switch (typeof t) {
    case "number":
      return { type: "px", value: t };
    case "string":
      return J(t);
    default:
      return { type: "", value: t };
  }
}, f = {
  IDLE: 0,
  DESTROYED: 2
}, Q = y({
  name: "notifications",
  components: {
    VelocityGroup: z,
    CssGroup: q
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
      default: m.position
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
      default: m.velocityAnimation
    },
    animationName: {
      type: String,
      default: m.cssAnimation
    },
    speed: {
      type: Number,
      default: 300
    },
    /* Todo */
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
  emits: ["click", "destroy", "start"],
  data() {
    return {
      list: [],
      velocity: C.get("velocity"),
      timerControl: null
    };
  },
  computed: {
    actualWidth() {
      return K(this.width);
    },
    isVA() {
      return this.animationType === "velocity";
    },
    componentName() {
      return this.isVA ? "velocity-group" : "css-group";
    },
    styles() {
      const { x: t, y: e } = W(this.position), i = this.actualWidth.value, s = this.actualWidth.type, n = {
        width: i + s
      };
      return e && (n[e] = "0px"), t && (t === "center" ? n.left = `calc(50% - ${+i / 2}${s})` : n[t] = "0px"), n;
    },
    active() {
      return this.list.filter((t) => t.state !== f.DESTROYED);
    },
    botToTop() {
      return this.styles.hasOwnProperty("bottom");
    }
  },
  mounted() {
    d.on("add", this.addItem), d.on("close", this.closeItem);
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
      const e = typeof t.duration == "number" ? t.duration : this.duration, i = typeof t.speed == "number" ? t.speed : this.speed, s = typeof t.ignoreDuplicates == "boolean" ? t.ignoreDuplicates : this.ignoreDuplicates, { title: n, text: c, type: o, data: l, id: I } = t, r = {
        id: I || R(),
        title: n,
        text: c,
        type: o,
        state: f.IDLE,
        speed: i,
        length: e + 2 * i,
        data: l
      };
      e >= 0 && (this.timerControl = new Y(() => this.destroy(r), r.length, r));
      const O = this.reverse ? !this.botToTop : this.botToTop;
      let u = -1;
      const S = this.active.some((E) => E.title === t.title && E.text === t.text);
      (!s || !S) && (O ? (this.list.push(r), this.$emit("start", r), this.active.length > this.max && (u = 0)) : (this.list.unshift(r), this.$emit("start", r), this.active.length > this.max && (u = this.active.length - 1)), u !== -1 && this.destroy(this.active[u]));
    },
    closeItem(t) {
      this.destroyById(t);
    },
    notifyClass(t) {
      return [
        "vue-notification-template",
        this.classes,
        t.type || ""
      ];
    },
    notifyWrapperStyle(t) {
      return this.isVA ? void 0 : { transition: `all ${t.speed}ms` };
    },
    destroy(t) {
      clearTimeout(t.timer), t.state = f.DESTROYED, this.clean(), this.$emit("destroy", t);
    },
    destroyById(t) {
      const e = this.list.find((i) => i.id === t);
      e && this.destroy(e);
    },
    destroyAll() {
      this.active.forEach(this.destroy);
    },
    getAnimation(t, e) {
      var s;
      const i = (s = this.animation) == null ? void 0 : s[t];
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
      this.list = this.list.filter((t) => t.state !== f.DESTROYED);
    }
  }
});
const U = ["data-id"], X = ["onClick"], Z = ["innerHTML"], tt = ["innerHTML"];
function et(t, e, i, s, n, c) {
  return a(), p("div", {
    class: "vue-notification-group",
    style: b(t.styles)
  }, [
    (a(), g(k(t.componentName), {
      name: t.animationName,
      onEnter: t.enter,
      onLeave: t.leave,
      onAfterLeave: t.clean
    }, {
      default: $(() => [
        (a(!0), p(_, null, B(t.active, (o) => (a(), p("div", {
          key: o.id,
          class: "vue-notification-wrapper",
          style: b(t.notifyWrapperStyle(o)),
          "data-id": o.id,
          onMouseenter: e[0] || (e[0] = (...l) => t.pauseTimeout && t.pauseTimeout(...l)),
          onMouseleave: e[1] || (e[1] = (...l) => t.resumeTimeout && t.resumeTimeout(...l))
        }, [
          T(t.$slots, "body", {
            class: D([t.classes, o.type]),
            item: o,
            close: () => t.destroy(o)
          }, () => [
            N("div", {
              class: D(t.notifyClass(o)),
              onClick: (l) => t.destroyIfNecessary(o)
            }, [
              o.title ? (a(), p("div", {
                key: 0,
                class: "notification-title",
                innerHTML: o.title
              }, null, 8, Z)) : H("", !0),
              N("div", {
                class: "notification-content",
                innerHTML: o.text
              }, null, 8, tt)
            ], 10, X)
          ])
        ], 44, U))), 128))
      ]),
      _: 3
    }, 40, ["name", "onEnter", "onLeave", "onAfterLeave"]))
  ], 4);
}
const it = /* @__PURE__ */ v(Q, [["render", et]]), A = (t) => {
  typeof t == "string" && (t = { title: "", text: t }), typeof t == "object" && d.emit("add", t);
};
A.close = (t) => {
  d.emit("close", t);
};
const rt = () => ({ notify: A });
function st(t, e = {}) {
  Object.entries(e).forEach((s) => C.set(...s));
  const i = e.name || "notify";
  t.config.globalProperties["$" + i] = A, t.component(e.componentName || "Notifications", it);
}
const at = {
  install: st
};
export {
  at as default,
  A as notify,
  rt as useNotification
};
(function(){var o;"use strict";try{if(typeof document!="undefined"){var e=document.createElement("style");e.nonce=(o=document.head.querySelector("meta[property=csp-nonce]"))==null?void 0:o.content,e.appendChild(document.createTextNode(".vue-notification-group{display:block;position:fixed;z-index:5000}.vue-notification-wrapper{display:block;overflow:hidden;width:100%;margin:0;padding:0}.notification-title{font-weight:600}.vue-notification-template{display:block;box-sizing:border-box;background:white;text-align:left}.vue-notification{display:block;box-sizing:border-box;text-align:left;font-size:12px;padding:10px;margin:0 5px 5px;color:#fff;background:#44A4FC;border-left:5px solid #187FE7}.vue-notification.warn{background:#ffb648;border-left-color:#f48a06}.vue-notification.error{background:#E54D42;border-left-color:#b82e24}.vue-notification.success{background:#68CD86;border-left-color:#42a85f}.vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move{transition:all .5s}.vn-fade-enter-from,.vn-fade-leave-to{opacity:0}")),document.head.appendChild(e)}}catch(i){console.error("vite-plugin-css-injected-by-js",i)}})();
