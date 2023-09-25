const cg = (function () {
    const t = document.createElement("link").relList;
    return t && t.supports && t.supports("modulepreload")
      ? "modulepreload"
      : "preload";
  })(),
  vf = {},
  fg = "/",
  to = function (t, n) {
    return !n || n.length === 0
      ? t()
      : Promise.all(
          n.map((r) => {
            if (((r = `${fg}${r}`), r in vf)) return;
            vf[r] = !0;
            const o = r.endsWith(".css"),
              a = o ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${r}"]${a}`)) return;
            const i = document.createElement("link");
            if (
              ((i.rel = o ? "stylesheet" : cg),
              o || ((i.as = "script"), (i.crossOrigin = "")),
              (i.href = r),
              document.head.appendChild(i),
              o)
            )
              return new Promise((l, s) => {
                i.addEventListener("load", l),
                  i.addEventListener("error", () =>
                    s(new Error(`Unable to preload CSS for ${r}`))
                  );
              });
          })
        ).then(() => t());
  };
function ql(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let o = 0; o < r.length; o++) n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const ct = {},
  qo = [],
  Hn = () => {},
  dg = () => !1,
  hg = /^on[^a-z]/,
  va = (e) => hg.test(e),
  Zu = (e) => e.startsWith("onUpdate:"),
  gt = Object.assign,
  ec = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  vg = Object.prototype.hasOwnProperty,
  nt = (e, t) => vg.call(e, t),
  Te = Array.isArray,
  Ho = (e) => oi(e) === "[object Map]",
  bo = (e) => oi(e) === "[object Set]",
  pf = (e) => oi(e) === "[object Date]",
  pg = (e) => oi(e) === "[object RegExp]",
  je = (e) => typeof e == "function",
  Ct = (e) => typeof e == "string",
  Ji = (e) => typeof e == "symbol",
  dt = (e) => e !== null && typeof e == "object",
  tc = (e) => dt(e) && je(e.then) && je(e.catch),
  Dh = Object.prototype.toString,
  oi = (e) => Dh.call(e),
  mg = (e) => oi(e).slice(8, -1),
  Mh = (e) => oi(e) === "[object Object]",
  nc = (e) =>
    Ct(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Mi = ql(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Hl = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  gg = /-(\w)/g,
  dn = Hl((e) => e.replace(gg, (t, n) => (n ? n.toUpperCase() : ""))),
  yg = /\B([A-Z])/g,
  On = Hl((e) => e.replace(yg, "-$1").toLowerCase()),
  pa = Hl((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  $i = Hl((e) => (e ? `on${pa(e)}` : "")),
  Go = (e, t) => !Object.is(e, t),
  _o = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  pl = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  ml = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  gl = (e) => {
    const t = Ct(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let mf;
const au = () =>
    mf ||
    (mf =
      typeof globalThis != "undefined"
        ? globalThis
        : typeof self != "undefined"
        ? self
        : typeof window != "undefined"
        ? window
        : typeof global != "undefined"
        ? global
        : {}),
  bg =
    "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console",
  Sg = ql(bg);
function ii(e) {
  if (Te(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        o = Ct(r) ? Cg(r) : ii(r);
      if (o) for (const a in o) t[a] = o[a];
    }
    return t;
  } else {
    if (Ct(e)) return e;
    if (dt(e)) return e;
  }
}
const wg = /;(?![^(]*\))/g,
  xg = /:([^]+)/,
  Eg = /\/\*[^]*?\*\//g;
function Cg(e) {
  const t = {};
  return (
    e
      .replace(Eg, "")
      .split(wg)
      .forEach((n) => {
        if (n) {
          const r = n.split(xg);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function ma(e) {
  let t = "";
  if (Ct(e)) t = e;
  else if (Te(e))
    for (let n = 0; n < e.length; n++) {
      const r = ma(e[n]);
      r && (t += r + " ");
    }
  else if (dt(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
function Fi(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !Ct(t) && (e.class = ma(t)), n && (e.style = ii(n)), e;
}
const Og =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Tg = ql(Og);
function $h(e) {
  return !!e || e === "";
}
function Pg(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++) n = Mr(e[r], t[r]);
  return n;
}
function Mr(e, t) {
  if (e === t) return !0;
  let n = pf(e),
    r = pf(t);
  if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
  if (((n = Ji(e)), (r = Ji(t)), n || r)) return e === t;
  if (((n = Te(e)), (r = Te(t)), n || r)) return n && r ? Pg(e, t) : !1;
  if (((n = dt(e)), (r = dt(t)), n || r)) {
    if (!n || !r) return !1;
    const o = Object.keys(e).length,
      a = Object.keys(t).length;
    if (o !== a) return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i),
        s = t.hasOwnProperty(i);
      if ((l && !s) || (!l && s) || !Mr(e[i], t[i])) return !1;
    }
  }
  return String(e) === String(t);
}
function _l(e, t) {
  return e.findIndex((n) => Mr(n, t));
}
const tt = (e) =>
    Ct(e)
      ? e
      : e == null
      ? ""
      : Te(e) || (dt(e) && (e.toString === Dh || !je(e.toString)))
      ? JSON.stringify(e, Fh, 2)
      : String(e),
  Fh = (e, t) =>
    t && t.__v_isRef
      ? Fh(e, t.value)
      : Ho(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, o]) => ((n[`${r} =>`] = o), n),
            {}
          ),
        }
      : bo(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : dt(t) && !Te(t) && !Mh(t)
      ? String(t)
      : t;
let mn;
class rc {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = mn),
      !t && mn && (this.index = (mn.scopes || (mn.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = mn;
      try {
        return (mn = this), t();
      } finally {
        mn = n;
      }
    }
  }
  on() {
    mn = this;
  }
  off() {
    mn = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function oc(e) {
  return new rc(e);
}
function Nh(e, t = mn) {
  t && t.active && t.effects.push(e);
}
function ic() {
  return mn;
}
function Bh(e) {
  mn && mn.cleanups.push(e);
}
const ac = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  jh = (e) => (e.w & $r) > 0,
  Vh = (e) => (e.n & $r) > 0,
  Rg = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= $r;
  },
  Ag = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const o = t[r];
        jh(o) && !Vh(o) ? o.delete(e) : (t[n++] = o),
          (o.w &= ~$r),
          (o.n &= ~$r);
      }
      t.length = n;
    }
  },
  yl = new WeakMap();
let Oi = 0,
  $r = 1;
const lu = 30;
let jn;
const ao = Symbol(""),
  su = Symbol("");
class ga {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Nh(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = jn,
      n = Ir;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = jn),
        (jn = this),
        (Ir = !0),
        ($r = 1 << ++Oi),
        Oi <= lu ? Rg(this) : gf(this),
        this.fn()
      );
    } finally {
      Oi <= lu && Ag(this),
        ($r = 1 << --Oi),
        (jn = this.parent),
        (Ir = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    jn === this
      ? (this.deferStop = !0)
      : this.active &&
        (gf(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function gf(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
function Ig(e, t) {
  e.effect && (e = e.effect.fn);
  const n = new ga(e);
  t && (gt(n, t), t.scope && Nh(n, t.scope)), (!t || !t.lazy) && n.run();
  const r = n.run.bind(n);
  return (r.effect = n), r;
}
function Lg(e) {
  e.effect.stop();
}
let Ir = !0;
const qh = [];
function ai() {
  qh.push(Ir), (Ir = !1);
}
function li() {
  const e = qh.pop();
  Ir = e === void 0 ? !0 : e;
}
function hn(e, t, n) {
  if (Ir && jn) {
    let r = yl.get(e);
    r || yl.set(e, (r = new Map()));
    let o = r.get(n);
    o || r.set(n, (o = ac())), Hh(o);
  }
}
function Hh(e, t) {
  let n = !1;
  Oi <= lu ? Vh(e) || ((e.n |= $r), (n = !jh(e))) : (n = !e.has(jn)),
    n && (e.add(jn), jn.deps.push(e));
}
function dr(e, t, n, r, o, a) {
  const i = yl.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && Te(e)) {
    const s = Number(r);
    i.forEach((u, c) => {
      (c === "length" || c >= s) && l.push(u);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        Te(e)
          ? nc(n) && l.push(i.get("length"))
          : (l.push(i.get(ao)), Ho(e) && l.push(i.get(su)));
        break;
      case "delete":
        Te(e) || (l.push(i.get(ao)), Ho(e) && l.push(i.get(su)));
        break;
      case "set":
        Ho(e) && l.push(i.get(ao));
        break;
    }
  if (l.length === 1) l[0] && uu(l[0]);
  else {
    const s = [];
    for (const u of l) u && s.push(...u);
    uu(ac(s));
  }
}
function uu(e, t) {
  const n = Te(e) ? e : [...e];
  for (const r of n) r.computed && yf(r);
  for (const r of n) r.computed || yf(r);
}
function yf(e, t) {
  (e !== jn || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function kg(e, t) {
  var n;
  return (n = yl.get(e)) == null ? void 0 : n.get(t);
}
const Dg = ql("__proto__,__v_isRef,__isVue"),
  _h = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Ji)
  ),
  Mg = Ul(),
  $g = Ul(!1, !0),
  Fg = Ul(!0),
  Ng = Ul(!0, !0),
  bf = Bg();
function Bg() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = He(this);
        for (let a = 0, i = this.length; a < i; a++) hn(r, "get", a + "");
        const o = r[t](...n);
        return o === -1 || o === !1 ? r[t](...n.map(He)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        ai();
        const r = He(this)[t].apply(this, n);
        return li(), r;
      };
    }),
    e
  );
}
function jg(e) {
  const t = He(this);
  return hn(t, "has", e), t.hasOwnProperty(e);
}
function Ul(e = !1, t = !1) {
  return function (r, o, a) {
    if (o === "__v_isReactive") return !e;
    if (o === "__v_isReadonly") return e;
    if (o === "__v_isShallow") return t;
    if (o === "__v_raw" && a === (e ? (t ? Xh : Gh) : t ? Qh : Wh).get(r))
      return r;
    const i = Te(r);
    if (!e) {
      if (i && nt(bf, o)) return Reflect.get(bf, o, a);
      if (o === "hasOwnProperty") return jg;
    }
    const l = Reflect.get(r, o, a);
    return (Ji(o) ? _h.has(o) : Dg(o)) || (e || hn(r, "get", o), t)
      ? l
      : Et(l)
      ? i && nc(o)
        ? l
        : l.value
      : dt(l)
      ? e
        ? uc(l)
        : Pn(l)
      : l;
  };
}
const Vg = Uh(),
  qg = Uh(!0);
function Uh(e = !1) {
  return function (n, r, o, a) {
    let i = n[r];
    if (vo(i) && Et(i) && !Et(o)) return !1;
    if (
      !e &&
      (!Zi(o) && !vo(o) && ((i = He(i)), (o = He(o))),
      !Te(n) && Et(i) && !Et(o))
    )
      return (i.value = o), !0;
    const l = Te(n) && nc(r) ? Number(r) < n.length : nt(n, r),
      s = Reflect.set(n, r, o, a);
    return (
      n === He(a) && (l ? Go(o, i) && dr(n, "set", r, o) : dr(n, "add", r, o)),
      s
    );
  };
}
function Hg(e, t) {
  const n = nt(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && dr(e, "delete", t, void 0), r;
}
function _g(e, t) {
  const n = Reflect.has(e, t);
  return (!Ji(t) || !_h.has(t)) && hn(e, "has", t), n;
}
function Ug(e) {
  return hn(e, "iterate", Te(e) ? "length" : ao), Reflect.ownKeys(e);
}
const zh = { get: Mg, set: Vg, deleteProperty: Hg, has: _g, ownKeys: Ug },
  Kh = {
    get: Fg,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  zg = gt({}, zh, { get: $g, set: qg }),
  Kg = gt({}, Kh, { get: Ng }),
  lc = (e) => e,
  zl = (e) => Reflect.getPrototypeOf(e);
function Aa(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = He(e),
    a = He(t);
  n || (t !== a && hn(o, "get", t), hn(o, "get", a));
  const { has: i } = zl(o),
    l = r ? lc : n ? fc : ea;
  if (i.call(o, t)) return l(e.get(t));
  if (i.call(o, a)) return l(e.get(a));
  e !== o && e.get(t);
}
function Ia(e, t = !1) {
  const n = this.__v_raw,
    r = He(n),
    o = He(e);
  return (
    t || (e !== o && hn(r, "has", e), hn(r, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function La(e, t = !1) {
  return (
    (e = e.__v_raw), !t && hn(He(e), "iterate", ao), Reflect.get(e, "size", e)
  );
}
function Sf(e) {
  e = He(e);
  const t = He(this);
  return zl(t).has.call(t, e) || (t.add(e), dr(t, "add", e, e)), this;
}
function wf(e, t) {
  t = He(t);
  const n = He(this),
    { has: r, get: o } = zl(n);
  let a = r.call(n, e);
  a || ((e = He(e)), (a = r.call(n, e)));
  const i = o.call(n, e);
  return (
    n.set(e, t), a ? Go(t, i) && dr(n, "set", e, t) : dr(n, "add", e, t), this
  );
}
function xf(e) {
  const t = He(this),
    { has: n, get: r } = zl(t);
  let o = n.call(t, e);
  o || ((e = He(e)), (o = n.call(t, e))), r && r.call(t, e);
  const a = t.delete(e);
  return o && dr(t, "delete", e, void 0), a;
}
function Ef() {
  const e = He(this),
    t = e.size !== 0,
    n = e.clear();
  return t && dr(e, "clear", void 0, void 0), n;
}
function ka(e, t) {
  return function (r, o) {
    const a = this,
      i = a.__v_raw,
      l = He(i),
      s = t ? lc : e ? fc : ea;
    return (
      !e && hn(l, "iterate", ao), i.forEach((u, c) => r.call(o, s(u), s(c), a))
    );
  };
}
function Da(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      a = He(o),
      i = Ho(a),
      l = e === "entries" || (e === Symbol.iterator && i),
      s = e === "keys" && i,
      u = o[e](...r),
      c = n ? lc : t ? fc : ea;
    return (
      !t && hn(a, "iterate", s ? su : ao),
      {
        next() {
          const { value: f, done: d } = u.next();
          return d
            ? { value: f, done: d }
            : { value: l ? [c(f[0]), c(f[1])] : c(f), done: d };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function mr(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Wg() {
  const e = {
      get(a) {
        return Aa(this, a);
      },
      get size() {
        return La(this);
      },
      has: Ia,
      add: Sf,
      set: wf,
      delete: xf,
      clear: Ef,
      forEach: ka(!1, !1),
    },
    t = {
      get(a) {
        return Aa(this, a, !1, !0);
      },
      get size() {
        return La(this);
      },
      has: Ia,
      add: Sf,
      set: wf,
      delete: xf,
      clear: Ef,
      forEach: ka(!1, !0),
    },
    n = {
      get(a) {
        return Aa(this, a, !0);
      },
      get size() {
        return La(this, !0);
      },
      has(a) {
        return Ia.call(this, a, !0);
      },
      add: mr("add"),
      set: mr("set"),
      delete: mr("delete"),
      clear: mr("clear"),
      forEach: ka(!0, !1),
    },
    r = {
      get(a) {
        return Aa(this, a, !0, !0);
      },
      get size() {
        return La(this, !0);
      },
      has(a) {
        return Ia.call(this, a, !0);
      },
      add: mr("add"),
      set: mr("set"),
      delete: mr("delete"),
      clear: mr("clear"),
      forEach: ka(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((a) => {
      (e[a] = Da(a, !1, !1)),
        (n[a] = Da(a, !0, !1)),
        (t[a] = Da(a, !1, !0)),
        (r[a] = Da(a, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [Qg, Gg, Xg, Yg] = Wg();
function Kl(e, t) {
  const n = t ? (e ? Yg : Xg) : e ? Gg : Qg;
  return (r, o, a) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? r
      : Reflect.get(nt(n, o) && o in r ? n : r, o, a);
}
const Jg = { get: Kl(!1, !1) },
  Zg = { get: Kl(!1, !0) },
  ey = { get: Kl(!0, !1) },
  ty = { get: Kl(!0, !0) },
  Wh = new WeakMap(),
  Qh = new WeakMap(),
  Gh = new WeakMap(),
  Xh = new WeakMap();
function ny(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ry(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ny(mg(e));
}
function Pn(e) {
  return vo(e) ? e : Wl(e, !1, zh, Jg, Wh);
}
function sc(e) {
  return Wl(e, !1, zg, Zg, Qh);
}
function uc(e) {
  return Wl(e, !0, Kh, ey, Gh);
}
function oy(e) {
  return Wl(e, !0, Kg, ty, Xh);
}
function Wl(e, t, n, r, o) {
  if (!dt(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const a = o.get(e);
  if (a) return a;
  const i = ry(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? r : n);
  return o.set(e, l), l;
}
function Yn(e) {
  return vo(e) ? Yn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function vo(e) {
  return !!(e && e.__v_isReadonly);
}
function Zi(e) {
  return !!(e && e.__v_isShallow);
}
function cc(e) {
  return Yn(e) || vo(e);
}
function He(e) {
  const t = e && e.__v_raw;
  return t ? He(t) : e;
}
function hr(e) {
  return pl(e, "__v_skip", !0), e;
}
const ea = (e) => (dt(e) ? Pn(e) : e),
  fc = (e) => (dt(e) ? uc(e) : e);
function dc(e) {
  Ir && jn && ((e = He(e)), Hh(e.dep || (e.dep = ac())));
}
function Ql(e, t) {
  e = He(e);
  const n = e.dep;
  n && uu(n);
}
function Et(e) {
  return !!(e && e.__v_isRef === !0);
}
function fe(e) {
  return Jh(e, !1);
}
function Yh(e) {
  return Jh(e, !0);
}
function Jh(e, t) {
  return Et(e) ? e : new iy(e, t);
}
class iy {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : He(t)),
      (this._value = n ? t : ea(t));
  }
  get value() {
    return dc(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Zi(t) || vo(t);
    (t = n ? t : He(t)),
      Go(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : ea(t)), Ql(this));
  }
}
function ay(e) {
  Ql(e);
}
function sr(e) {
  return Et(e) ? e.value : e;
}
function ly(e) {
  return je(e) ? e() : sr(e);
}
const sy = {
  get: (e, t, n) => sr(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return Et(o) && !Et(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function hc(e) {
  return Yn(e) ? e : new Proxy(e, sy);
}
class uy {
  constructor(t) {
    (this.dep = void 0), (this.__v_isRef = !0);
    const { get: n, set: r } = t(
      () => dc(this),
      () => Ql(this)
    );
    (this._get = n), (this._set = r);
  }
  get value() {
    return this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function cy(e) {
  return new uy(e);
}
function Zh(e) {
  const t = Te(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = tv(e, n);
  return t;
}
class fy {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return kg(He(this._object), this._key);
  }
}
class dy {
  constructor(t) {
    (this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
  }
  get value() {
    return this._getter();
  }
}
function ev(e, t, n) {
  return Et(e)
    ? e
    : je(e)
    ? new dy(e)
    : dt(e) && arguments.length > 1
    ? tv(e, t, n)
    : fe(e);
}
function tv(e, t, n) {
  const r = e[t];
  return Et(r) ? r : new fy(e, t, n);
}
class hy {
  constructor(t, n, r, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new ga(t, () => {
        this._dirty || ((this._dirty = !0), Ql(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = He(this);
    return (
      dc(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function vy(e, t, n = !1) {
  let r, o;
  const a = je(e);
  return (
    a ? ((r = e), (o = Hn)) : ((r = e.get), (o = e.set)),
    new hy(r, o, a || !o, n)
  );
}
function py(e, ...t) {}
function my(e, t) {}
function ur(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (a) {
    So(a, t, n);
  }
  return o;
}
function Sn(e, t, n, r) {
  if (je(e)) {
    const a = ur(e, t, n, r);
    return (
      a &&
        tc(a) &&
        a.catch((i) => {
          So(i, t, n);
        }),
      a
    );
  }
  const o = [];
  for (let a = 0; a < e.length; a++) o.push(Sn(e[a], t, n, r));
  return o;
}
function So(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let a = t.parent;
    const i = t.proxy,
      l = n;
    for (; a; ) {
      const u = a.ec;
      if (u) {
        for (let c = 0; c < u.length; c++) if (u[c](e, i, l) === !1) return;
      }
      a = a.parent;
    }
    const s = t.appContext.config.errorHandler;
    if (s) {
      ur(s, null, 10, [e, i, l]);
      return;
    }
  }
  gy(e, n, o, r);
}
function gy(e, t, n, r = !0) {
  console.error(e);
}
let ta = !1,
  cu = !1;
const Jt = [];
let Gn = 0;
const Uo = [];
let or = null,
  Yr = 0;
const nv = Promise.resolve();
let vc = null;
function at(e) {
  const t = vc || nv;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function yy(e) {
  let t = Gn + 1,
    n = Jt.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    na(Jt[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Gl(e) {
  (!Jt.length || !Jt.includes(e, ta && e.allowRecurse ? Gn + 1 : Gn)) &&
    (e.id == null ? Jt.push(e) : Jt.splice(yy(e.id), 0, e), rv());
}
function rv() {
  !ta && !cu && ((cu = !0), (vc = nv.then(ov)));
}
function by(e) {
  const t = Jt.indexOf(e);
  t > Gn && Jt.splice(t, 1);
}
function pc(e) {
  Te(e)
    ? Uo.push(...e)
    : (!or || !or.includes(e, e.allowRecurse ? Yr + 1 : Yr)) && Uo.push(e),
    rv();
}
function Cf(e, t = ta ? Gn + 1 : 0) {
  for (; t < Jt.length; t++) {
    const n = Jt[t];
    n && n.pre && (Jt.splice(t, 1), t--, n());
  }
}
function bl(e) {
  if (Uo.length) {
    const t = [...new Set(Uo)];
    if (((Uo.length = 0), or)) {
      or.push(...t);
      return;
    }
    for (or = t, or.sort((n, r) => na(n) - na(r)), Yr = 0; Yr < or.length; Yr++)
      or[Yr]();
    (or = null), (Yr = 0);
  }
}
const na = (e) => (e.id == null ? 1 / 0 : e.id),
  Sy = (e, t) => {
    const n = na(e) - na(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function ov(e) {
  (cu = !1), (ta = !0), Jt.sort(Sy);
  const t = Hn;
  try {
    for (Gn = 0; Gn < Jt.length; Gn++) {
      const n = Jt[Gn];
      n && n.active !== !1 && ur(n, null, 14);
    }
  } finally {
    (Gn = 0),
      (Jt.length = 0),
      bl(),
      (ta = !1),
      (vc = null),
      (Jt.length || Uo.length) && ov();
  }
}
let $o,
  Ma = [];
function iv(e, t) {
  var n, r;
  ($o = e),
    $o
      ? (($o.enabled = !0),
        Ma.forEach(({ event: o, args: a }) => $o.emit(o, ...a)),
        (Ma = []))
      : typeof window != "undefined" &&
        window.HTMLElement &&
        !(
          (r = (n = window.navigator) == null ? void 0 : n.userAgent) != null &&
          r.includes("jsdom")
        )
      ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ =
          t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((a) => {
          iv(a, t);
        }),
        setTimeout(() => {
          $o || ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null), (Ma = []));
        }, 3e3))
      : (Ma = []);
}
function wy(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ct;
  let o = n;
  const a = t.startsWith("update:"),
    i = a && t.slice(7);
  if (i && i in r) {
    const c = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: f, trim: d } = r[c] || ct;
    d && (o = n.map((h) => (Ct(h) ? h.trim() : h))), f && (o = n.map(ml));
  }
  let l,
    s = r[(l = $i(t))] || r[(l = $i(dn(t)))];
  !s && a && (s = r[(l = $i(On(t)))]), s && Sn(s, e, 6, o);
  const u = r[l + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Sn(u, e, 6, o);
  }
}
function av(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e);
  if (o !== void 0) return o;
  const a = e.emits;
  let i = {},
    l = !1;
  if (!je(e)) {
    const s = (u) => {
      const c = av(u, t, !0);
      c && ((l = !0), gt(i, c));
    };
    !n && t.mixins.length && t.mixins.forEach(s),
      e.extends && s(e.extends),
      e.mixins && e.mixins.forEach(s);
  }
  return !a && !l
    ? (dt(e) && r.set(e, null), null)
    : (Te(a) ? a.forEach((s) => (i[s] = null)) : gt(i, a),
      dt(e) && r.set(e, i),
      i);
}
function Xl(e, t) {
  return !e || !va(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      nt(e, t[0].toLowerCase() + t.slice(1)) || nt(e, On(t)) || nt(e, t));
}
let zt = null,
  Yl = null;
function ra(e) {
  const t = zt;
  return (zt = e), (Yl = (e && e.type.__scopeId) || null), t;
}
function xy(e) {
  Yl = e;
}
function Ey() {
  Yl = null;
}
const Cy = (e) => z;
function z(e, t = zt, n) {
  if (!t || e._n) return e;
  const r = (...o) => {
    r._d && yu(-1);
    const a = ra(t);
    let i;
    try {
      i = e(...o);
    } finally {
      ra(a), r._d && yu(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function el(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: a,
    propsOptions: [i],
    slots: l,
    attrs: s,
    emit: u,
    render: c,
    renderCache: f,
    data: d,
    setupState: h,
    ctx: v,
    inheritAttrs: m,
  } = e;
  let g, y;
  const p = ra(e);
  try {
    if (n.shapeFlag & 4) {
      const b = o || r;
      (g = yn(c.call(b, b, f, a, h, d, v))), (y = s);
    } else {
      const b = t;
      (g = yn(
        b.length > 1 ? b(a, { attrs: s, slots: l, emit: u }) : b(a, null)
      )),
        (y = t.props ? s : Ty(s));
    }
  } catch (b) {
    (ji.length = 0), So(b, e, 1), (g = M(tn));
  }
  let w = g;
  if (y && m !== !1) {
    const b = Object.keys(y),
      { shapeFlag: S } = w;
    b.length && S & 7 && (i && b.some(Zu) && (y = Py(y, i)), (w = Zn(w, y)));
  }
  return (
    n.dirs && ((w = Zn(w)), (w.dirs = w.dirs ? w.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (w.transition = n.transition),
    (g = w),
    ra(p),
    g
  );
}
function Oy(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    if (Fr(r)) {
      if (r.type !== tn || r.children === "v-if") {
        if (t) return;
        t = r;
      }
    } else return;
  }
  return t;
}
const Ty = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || va(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Py = (e, t) => {
    const n = {};
    for (const r in e) (!Zu(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Ry(e, t, n) {
  const { props: r, children: o, component: a } = e,
    { props: i, children: l, patchFlag: s } = t,
    u = a.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && s >= 0) {
    if (s & 1024) return !0;
    if (s & 16) return r ? Of(r, i, u) : !!i;
    if (s & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const d = c[f];
        if (i[d] !== r[d] && !Xl(u, d)) return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? Of(r, i, u)
        : !0
      : !!i;
  return !1;
}
function Of(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    if (t[a] !== e[a] && !Xl(n, a)) return !0;
  }
  return !1;
}
function mc({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const lv = (e) => e.__isSuspense,
  Ay = {
    name: "Suspense",
    __isSuspense: !0,
    process(e, t, n, r, o, a, i, l, s, u) {
      e == null ? Ly(t, n, r, o, a, i, l, s, u) : ky(e, t, n, r, o, i, l, s, u);
    },
    hydrate: Dy,
    create: gc,
    normalize: My,
  },
  Iy = Ay;
function oa(e, t) {
  const n = e.props && e.props[t];
  je(n) && n();
}
function Ly(e, t, n, r, o, a, i, l, s) {
  const {
      p: u,
      o: { createElement: c },
    } = s,
    f = c("div"),
    d = (e.suspense = gc(e, o, r, t, f, n, a, i, l, s));
  u(null, (d.pendingBranch = e.ssContent), f, null, r, d, a, i),
    d.deps > 0
      ? (oa(e, "onPending"),
        oa(e, "onFallback"),
        u(null, e.ssFallback, t, n, r, null, a, i),
        zo(d, e.ssFallback))
      : d.resolve(!1, !0);
}
function ky(e, t, n, r, o, a, i, l, { p: s, um: u, o: { createElement: c } }) {
  const f = (t.suspense = e.suspense);
  (f.vnode = t), (t.el = e.el);
  const d = t.ssContent,
    h = t.ssFallback,
    { activeBranch: v, pendingBranch: m, isInFallback: g, isHydrating: y } = f;
  if (m)
    (f.pendingBranch = d),
      Vn(d, m)
        ? (s(m, d, f.hiddenContainer, null, o, f, a, i, l),
          f.deps <= 0
            ? f.resolve()
            : g && (s(v, h, n, r, o, null, a, i, l), zo(f, h)))
        : (f.pendingId++,
          y ? ((f.isHydrating = !1), (f.activeBranch = m)) : u(m, o, f),
          (f.deps = 0),
          (f.effects.length = 0),
          (f.hiddenContainer = c("div")),
          g
            ? (s(null, d, f.hiddenContainer, null, o, f, a, i, l),
              f.deps <= 0
                ? f.resolve()
                : (s(v, h, n, r, o, null, a, i, l), zo(f, h)))
            : v && Vn(d, v)
            ? (s(v, d, n, r, o, f, a, i, l), f.resolve(!0))
            : (s(null, d, f.hiddenContainer, null, o, f, a, i, l),
              f.deps <= 0 && f.resolve()));
  else if (v && Vn(d, v)) s(v, d, n, r, o, f, a, i, l), zo(f, d);
  else if (
    (oa(t, "onPending"),
    (f.pendingBranch = d),
    f.pendingId++,
    s(null, d, f.hiddenContainer, null, o, f, a, i, l),
    f.deps <= 0)
  )
    f.resolve();
  else {
    const { timeout: p, pendingId: w } = f;
    p > 0
      ? setTimeout(() => {
          f.pendingId === w && f.fallback(h);
        }, p)
      : p === 0 && f.fallback(h);
  }
}
function gc(e, t, n, r, o, a, i, l, s, u, c = !1) {
  const {
    p: f,
    m: d,
    um: h,
    n: v,
    o: { parentNode: m, remove: g },
  } = u;
  let y;
  const p = $y(e);
  p && t != null && t.pendingBranch && ((y = t.pendingId), t.deps++);
  const w = e.props ? gl(e.props.timeout) : void 0,
    b = {
      vnode: e,
      parent: t,
      parentComponent: n,
      isSVG: i,
      container: r,
      hiddenContainer: o,
      anchor: a,
      deps: 0,
      pendingId: 0,
      timeout: typeof w == "number" ? w : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !0,
      isHydrating: c,
      isUnmounted: !1,
      effects: [],
      resolve(S = !1, E = !1) {
        const {
          vnode: A,
          activeBranch: T,
          pendingBranch: x,
          pendingId: C,
          effects: D,
          parentComponent: I,
          container: $,
        } = b;
        if (b.isHydrating) b.isHydrating = !1;
        else if (!S) {
          const j = T && x.transition && x.transition.mode === "out-in";
          j &&
            (T.transition.afterLeave = () => {
              C === b.pendingId && d(x, $, V, 0);
            });
          let { anchor: V } = b;
          T && ((V = v(T)), h(T, I, b, !0)), j || d(x, $, V, 0);
        }
        zo(b, x), (b.pendingBranch = null), (b.isInFallback = !1);
        let L = b.parent,
          G = !1;
        for (; L; ) {
          if (L.pendingBranch) {
            L.effects.push(...D), (G = !0);
            break;
          }
          L = L.parent;
        }
        G || pc(D),
          (b.effects = []),
          p &&
            t &&
            t.pendingBranch &&
            y === t.pendingId &&
            (t.deps--, t.deps === 0 && !E && t.resolve()),
          oa(A, "onResolve");
      },
      fallback(S) {
        if (!b.pendingBranch) return;
        const {
          vnode: E,
          activeBranch: A,
          parentComponent: T,
          container: x,
          isSVG: C,
        } = b;
        oa(E, "onFallback");
        const D = v(A),
          I = () => {
            !b.isInFallback || (f(null, S, x, D, T, null, C, l, s), zo(b, S));
          },
          $ = S.transition && S.transition.mode === "out-in";
        $ && (A.transition.afterLeave = I),
          (b.isInFallback = !0),
          h(A, T, null, !0),
          $ || I();
      },
      move(S, E, A) {
        b.activeBranch && d(b.activeBranch, S, E, A), (b.container = S);
      },
      next() {
        return b.activeBranch && v(b.activeBranch);
      },
      registerDep(S, E) {
        const A = !!b.pendingBranch;
        A && b.deps++;
        const T = S.vnode.el;
        S.asyncDep
          .catch((x) => {
            So(x, S, 0);
          })
          .then((x) => {
            if (S.isUnmounted || b.isUnmounted || b.pendingId !== S.suspenseId)
              return;
            S.asyncResolved = !0;
            const { vnode: C } = S;
            bu(S, x, !1), T && (C.el = T);
            const D = !T && S.subTree.el;
            E(S, C, m(T || S.subTree.el), T ? null : v(S.subTree), b, i, s),
              D && g(D),
              mc(S, C.el),
              A && --b.deps === 0 && b.resolve();
          });
      },
      unmount(S, E) {
        (b.isUnmounted = !0),
          b.activeBranch && h(b.activeBranch, n, S, E),
          b.pendingBranch && h(b.pendingBranch, n, S, E);
      },
    };
  return b;
}
function Dy(e, t, n, r, o, a, i, l, s) {
  const u = (t.suspense = gc(
      t,
      r,
      n,
      e.parentNode,
      document.createElement("div"),
      null,
      o,
      a,
      i,
      l,
      !0
    )),
    c = s(e, (u.pendingBranch = t.ssContent), n, u, a, i);
  return u.deps === 0 && u.resolve(!1, !0), c;
}
function My(e) {
  const { shapeFlag: t, children: n } = e,
    r = t & 32;
  (e.ssContent = Tf(r ? n.default : n)),
    (e.ssFallback = r ? Tf(n.fallback) : M(tn));
}
function Tf(e) {
  let t;
  if (je(e)) {
    const n = go && e._c;
    n && ((e._d = !1), lt()), (e = e()), n && ((e._d = !0), (t = fn), $v());
  }
  return (
    Te(e) && (e = Oy(e)),
    (e = yn(e)),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter((n) => n !== e)),
    e
  );
}
function sv(e, t) {
  t && t.pendingBranch
    ? Te(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : pc(e);
}
function zo(e, t) {
  e.activeBranch = t;
  const { vnode: n, parentComponent: r } = e,
    o = (n.el = t.el);
  r && r.subTree === n && ((r.vnode.el = o), mc(r, o));
}
function $y(e) {
  var t;
  return (
    ((t = e.props) == null ? void 0 : t.suspensible) != null &&
    e.props.suspensible !== !1
  );
}
function Fy(e, t) {
  return ya(e, null, t);
}
function uv(e, t) {
  return ya(e, null, { flush: "post" });
}
function Ny(e, t) {
  return ya(e, null, { flush: "sync" });
}
const $a = {};
function me(e, t, n) {
  return ya(e, t, n);
}
function ya(
  e,
  t,
  { immediate: n, deep: r, flush: o, onTrack: a, onTrigger: i } = ct
) {
  var l;
  const s = ic() === ((l = Vt) == null ? void 0 : l.scope) ? Vt : null;
  let u,
    c = !1,
    f = !1;
  if (
    (Et(e)
      ? ((u = () => e.value), (c = Zi(e)))
      : Yn(e)
      ? ((u = () => e), (r = !0))
      : Te(e)
      ? ((f = !0),
        (c = e.some((b) => Yn(b) || Zi(b))),
        (u = () =>
          e.map((b) => {
            if (Et(b)) return b.value;
            if (Yn(b)) return no(b);
            if (je(b)) return ur(b, s, 2);
          })))
      : je(e)
      ? t
        ? (u = () => ur(e, s, 2))
        : (u = () => {
            if (!(s && s.isUnmounted)) return d && d(), Sn(e, s, 3, [h]);
          })
      : (u = Hn),
    t && r)
  ) {
    const b = u;
    u = () => no(b());
  }
  let d,
    h = (b) => {
      d = p.onStop = () => {
        ur(b, s, 4);
      };
    },
    v;
  if (Yo)
    if (
      ((h = Hn),
      t ? n && Sn(t, s, 3, [u(), f ? [] : void 0, h]) : u(),
      o === "sync")
    ) {
      const b = zv();
      v = b.__watcherHandles || (b.__watcherHandles = []);
    } else return Hn;
  let m = f ? new Array(e.length).fill($a) : $a;
  const g = () => {
    if (!!p.active)
      if (t) {
        const b = p.run();
        (r || c || (f ? b.some((S, E) => Go(S, m[E])) : Go(b, m))) &&
          (d && d(),
          Sn(t, s, 3, [b, m === $a ? void 0 : f && m[0] === $a ? [] : m, h]),
          (m = b));
      } else p.run();
  };
  g.allowRecurse = !!t;
  let y;
  o === "sync"
    ? (y = g)
    : o === "post"
    ? (y = () => Qt(g, s && s.suspense))
    : ((g.pre = !0), s && (g.id = s.uid), (y = () => Gl(g)));
  const p = new ga(u, y);
  t
    ? n
      ? g()
      : (m = p.run())
    : o === "post"
    ? Qt(p.run.bind(p), s && s.suspense)
    : p.run();
  const w = () => {
    p.stop(), s && s.scope && ec(s.scope.effects, p);
  };
  return v && v.push(w), w;
}
function By(e, t, n) {
  const r = this.proxy,
    o = Ct(e) ? (e.includes(".") ? cv(r, e) : () => r[e]) : e.bind(r, r);
  let a;
  je(t) ? (a = t) : ((a = t.handler), (n = t));
  const i = Vt;
  Nr(this);
  const l = ya(o, a.bind(r), n);
  return i ? Nr(i) : Dr(), l;
}
function cv(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++) r = r[n[o]];
    return r;
  };
}
function no(e, t) {
  if (!dt(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), Et(e))) no(e.value, t);
  else if (Te(e)) for (let n = 0; n < e.length; n++) no(e[n], t);
  else if (bo(e) || Ho(e))
    e.forEach((n) => {
      no(n, t);
    });
  else if (Mh(e)) for (const n in e) no(e[n], t);
  return e;
}
function St(e, t) {
  const n = zt;
  if (n === null) return e;
  const r = ns(n) || n.proxy,
    o = e.dirs || (e.dirs = []);
  for (let a = 0; a < t.length; a++) {
    let [i, l, s, u = ct] = t[a];
    i &&
      (je(i) && (i = { mounted: i, updated: i }),
      i.deep && no(l),
      o.push({
        dir: i,
        instance: r,
        value: l,
        oldValue: void 0,
        arg: s,
        modifiers: u,
      }));
  }
  return e;
}
function Qn(e, t, n, r) {
  const o = e.dirs,
    a = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    a && (l.oldValue = a[i].value);
    let s = l.dir[r];
    s && (ai(), Sn(s, n, 8, [e.el, l, e, t]), li());
  }
}
function yc() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Ft(() => {
      e.isMounted = !0;
    }),
    vt(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const wn = [Function, Array],
  bc = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: wn,
    onEnter: wn,
    onAfterEnter: wn,
    onEnterCancelled: wn,
    onBeforeLeave: wn,
    onLeave: wn,
    onAfterLeave: wn,
    onLeaveCancelled: wn,
    onBeforeAppear: wn,
    onAppear: wn,
    onAfterAppear: wn,
    onAppearCancelled: wn,
  },
  jy = {
    name: "BaseTransition",
    props: bc,
    setup(e, { slots: t }) {
      const n = Fe(),
        r = yc();
      let o;
      return () => {
        const a = t.default && Jl(t.default(), !0);
        if (!a || !a.length) return;
        let i = a[0];
        if (a.length > 1) {
          for (const m of a)
            if (m.type !== tn) {
              i = m;
              break;
            }
        }
        const l = He(e),
          { mode: s } = l;
        if (r.isLeaving) return ys(i);
        const u = Pf(i);
        if (!u) return ys(i);
        const c = Xo(u, l, r, n);
        po(u, c);
        const f = n.subTree,
          d = f && Pf(f);
        let h = !1;
        const { getTransitionKey: v } = u.type;
        if (v) {
          const m = v();
          o === void 0 ? (o = m) : m !== o && ((o = m), (h = !0));
        }
        if (d && d.type !== tn && (!Vn(u, d) || h)) {
          const m = Xo(d, l, r, n);
          if ((po(d, m), s === "out-in"))
            return (
              (r.isLeaving = !0),
              (m.afterLeave = () => {
                (r.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              ys(i)
            );
          s === "in-out" &&
            u.type !== tn &&
            (m.delayLeave = (g, y, p) => {
              const w = dv(r, d);
              (w[String(d.key)] = d),
                (g._leaveCb = () => {
                  y(), (g._leaveCb = void 0), delete c.delayedLeave;
                }),
                (c.delayedLeave = p);
            });
        }
        return i;
      };
    },
  },
  fv = jy;
function dv(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function Xo(e, t, n, r) {
  const {
      appear: o,
      mode: a,
      persisted: i = !1,
      onBeforeEnter: l,
      onEnter: s,
      onAfterEnter: u,
      onEnterCancelled: c,
      onBeforeLeave: f,
      onLeave: d,
      onAfterLeave: h,
      onLeaveCancelled: v,
      onBeforeAppear: m,
      onAppear: g,
      onAfterAppear: y,
      onAppearCancelled: p,
    } = t,
    w = String(e.key),
    b = dv(n, e),
    S = (T, x) => {
      T && Sn(T, r, 9, x);
    },
    E = (T, x) => {
      const C = x[1];
      S(T, x),
        Te(T) ? T.every((D) => D.length <= 1) && C() : T.length <= 1 && C();
    },
    A = {
      mode: a,
      persisted: i,
      beforeEnter(T) {
        let x = l;
        if (!n.isMounted)
          if (o) x = m || l;
          else return;
        T._leaveCb && T._leaveCb(!0);
        const C = b[w];
        C && Vn(e, C) && C.el._leaveCb && C.el._leaveCb(), S(x, [T]);
      },
      enter(T) {
        let x = s,
          C = u,
          D = c;
        if (!n.isMounted)
          if (o) (x = g || s), (C = y || u), (D = p || c);
          else return;
        let I = !1;
        const $ = (T._enterCb = (L) => {
          I ||
            ((I = !0),
            L ? S(D, [T]) : S(C, [T]),
            A.delayedLeave && A.delayedLeave(),
            (T._enterCb = void 0));
        });
        x ? E(x, [T, $]) : $();
      },
      leave(T, x) {
        const C = String(e.key);
        if ((T._enterCb && T._enterCb(!0), n.isUnmounting)) return x();
        S(f, [T]);
        let D = !1;
        const I = (T._leaveCb = ($) => {
          D ||
            ((D = !0),
            x(),
            $ ? S(v, [T]) : S(h, [T]),
            (T._leaveCb = void 0),
            b[C] === e && delete b[C]);
        });
        (b[C] = e), d ? E(d, [T, I]) : I();
      },
      clone(T) {
        return Xo(T, t, n, r);
      },
    };
  return A;
}
function ys(e) {
  if (ba(e)) return (e = Zn(e)), (e.children = null), e;
}
function Pf(e) {
  return ba(e) ? (e.children ? e.children[0] : void 0) : e;
}
function po(e, t) {
  e.shapeFlag & 6 && e.component
    ? po(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Jl(e, t = !1, n) {
  let r = [],
    o = 0;
  for (let a = 0; a < e.length; a++) {
    let i = e[a];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : a);
    i.type === jt
      ? (i.patchFlag & 128 && o++, (r = r.concat(Jl(i.children, t, l))))
      : (t || i.type !== tn) && r.push(l != null ? Zn(i, { key: l }) : i);
  }
  if (o > 1) for (let a = 0; a < r.length; a++) r[a].patchFlag = -2;
  return r;
}
function zn(e, t) {
  return je(e) ? (() => gt({ name: e.name }, t, { setup: e }))() : e;
}
const lo = (e) => !!e.type.__asyncLoader;
function Vy(e) {
  je(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: r,
    delay: o = 200,
    timeout: a,
    suspensible: i = !0,
    onError: l,
  } = e;
  let s = null,
    u,
    c = 0;
  const f = () => (c++, (s = null), d()),
    d = () => {
      let h;
      return (
        s ||
        (h = s =
          t()
            .catch((v) => {
              if (((v = v instanceof Error ? v : new Error(String(v))), l))
                return new Promise((m, g) => {
                  l(
                    v,
                    () => m(f()),
                    () => g(v),
                    c + 1
                  );
                });
              throw v;
            })
            .then((v) =>
              h !== s && s
                ? s
                : (v &&
                    (v.__esModule || v[Symbol.toStringTag] === "Module") &&
                    (v = v.default),
                  (u = v),
                  v)
            ))
      );
    };
  return zn({
    name: "AsyncComponentWrapper",
    __asyncLoader: d,
    get __asyncResolved() {
      return u;
    },
    setup() {
      const h = Vt;
      if (u) return () => bs(u, h);
      const v = (p) => {
        (s = null), So(p, h, 13, !r);
      };
      if ((i && h.suspense) || Yo)
        return d()
          .then((p) => () => bs(p, h))
          .catch((p) => (v(p), () => (r ? M(r, { error: p }) : null)));
      const m = fe(!1),
        g = fe(),
        y = fe(!!o);
      return (
        o &&
          setTimeout(() => {
            y.value = !1;
          }, o),
        a != null &&
          setTimeout(() => {
            if (!m.value && !g.value) {
              const p = new Error(`Async component timed out after ${a}ms.`);
              v(p), (g.value = p);
            }
          }, a),
        d()
          .then(() => {
            (m.value = !0),
              h.parent && ba(h.parent.vnode) && Gl(h.parent.update);
          })
          .catch((p) => {
            v(p), (g.value = p);
          }),
        () => {
          if (m.value && u) return bs(u, h);
          if (g.value && r) return M(r, { error: g.value });
          if (n && !y.value) return M(n);
        }
      );
    },
  });
}
function bs(e, t) {
  const { ref: n, props: r, children: o, ce: a } = t.vnode,
    i = M(e, r, o);
  return (i.ref = n), (i.ce = a), delete t.vnode.ce, i;
}
const ba = (e) => e.type.__isKeepAlive,
  qy = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number],
    },
    setup(e, { slots: t }) {
      const n = Fe(),
        r = n.ctx;
      if (!r.renderer)
        return () => {
          const p = t.default && t.default();
          return p && p.length === 1 ? p[0] : p;
        };
      const o = new Map(),
        a = new Set();
      let i = null;
      const l = n.suspense,
        {
          renderer: {
            p: s,
            m: u,
            um: c,
            o: { createElement: f },
          },
        } = r,
        d = f("div");
      (r.activate = (p, w, b, S, E) => {
        const A = p.component;
        u(p, w, b, 0, l),
          s(A.vnode, p, w, b, A, l, S, p.slotScopeIds, E),
          Qt(() => {
            (A.isDeactivated = !1), A.a && _o(A.a);
            const T = p.props && p.props.onVnodeMounted;
            T && un(T, A.parent, p);
          }, l);
      }),
        (r.deactivate = (p) => {
          const w = p.component;
          u(p, d, null, 1, l),
            Qt(() => {
              w.da && _o(w.da);
              const b = p.props && p.props.onVnodeUnmounted;
              b && un(b, w.parent, p), (w.isDeactivated = !0);
            }, l);
        });
      function h(p) {
        Ss(p), c(p, n, l, !0);
      }
      function v(p) {
        o.forEach((w, b) => {
          const S = wu(w.type);
          S && (!p || !p(S)) && m(b);
        });
      }
      function m(p) {
        const w = o.get(p);
        !i || !Vn(w, i) ? h(w) : i && Ss(i), o.delete(p), a.delete(p);
      }
      me(
        () => [e.include, e.exclude],
        ([p, w]) => {
          p && v((b) => Ti(p, b)), w && v((b) => !Ti(w, b));
        },
        { flush: "post", deep: !0 }
      );
      let g = null;
      const y = () => {
        g != null && o.set(g, ws(n.subTree));
      };
      return (
        Ft(y),
        wa(y),
        vt(() => {
          o.forEach((p) => {
            const { subTree: w, suspense: b } = n,
              S = ws(w);
            if (p.type === S.type && p.key === S.key) {
              Ss(S);
              const E = S.component.da;
              E && Qt(E, b);
              return;
            }
            h(p);
          });
        }),
        () => {
          if (((g = null), !t.default)) return null;
          const p = t.default(),
            w = p[0];
          if (p.length > 1) return (i = null), p;
          if (!Fr(w) || (!(w.shapeFlag & 4) && !(w.shapeFlag & 128)))
            return (i = null), w;
          let b = ws(w);
          const S = b.type,
            E = wu(lo(b) ? b.type.__asyncResolved || {} : S),
            { include: A, exclude: T, max: x } = e;
          if ((A && (!E || !Ti(A, E))) || (T && E && Ti(T, E)))
            return (i = b), w;
          const C = b.key == null ? S : b.key,
            D = o.get(C);
          return (
            b.el && ((b = Zn(b)), w.shapeFlag & 128 && (w.ssContent = b)),
            (g = C),
            D
              ? ((b.el = D.el),
                (b.component = D.component),
                b.transition && po(b, b.transition),
                (b.shapeFlag |= 512),
                a.delete(C),
                a.add(C))
              : (a.add(C),
                x && a.size > parseInt(x, 10) && m(a.values().next().value)),
            (b.shapeFlag |= 256),
            (i = b),
            lv(w.type) ? w : b
          );
        }
      );
    },
  },
  Hy = qy;
function Ti(e, t) {
  return Te(e)
    ? e.some((n) => Ti(n, t))
    : Ct(e)
    ? e.split(",").includes(t)
    : pg(e)
    ? e.test(t)
    : !1;
}
function si(e, t) {
  hv(e, "a", t);
}
function qr(e, t) {
  hv(e, "da", t);
}
function hv(e, t, n = Vt) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((Zl(t, r, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      ba(o.parent.vnode) && _y(r, t, n, o), (o = o.parent);
  }
}
function _y(e, t, n, r) {
  const o = Zl(t, e, r, !0);
  ui(() => {
    ec(r[t], o);
  }, n);
}
function Ss(e) {
  (e.shapeFlag &= -257), (e.shapeFlag &= -513);
}
function ws(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function Zl(e, t, n = Vt, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      a =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          ai(), Nr(n);
          const l = Sn(t, n, e, i);
          return Dr(), li(), l;
        });
    return r ? o.unshift(a) : o.push(a), a;
  }
}
const vr =
    (e) =>
    (t, n = Vt) =>
      (!Yo || e === "sp") && Zl(e, (...r) => t(...r), n),
  Sa = vr("bm"),
  Ft = vr("m"),
  es = vr("bu"),
  wa = vr("u"),
  vt = vr("bum"),
  ui = vr("um"),
  vv = vr("sp"),
  pv = vr("rtg"),
  mv = vr("rtc");
function gv(e, t = Vt) {
  Zl("ec", e, t);
}
const Sc = "components",
  Uy = "directives";
function ia(e, t) {
  return wc(Sc, e, !0, t) || e;
}
const yv = Symbol.for("v-ndc");
function zy(e) {
  return Ct(e) ? wc(Sc, e, !1) || e : e || yv;
}
function Ky(e) {
  return wc(Uy, e);
}
function wc(e, t, n = !0, r = !1) {
  const o = zt || Vt;
  if (o) {
    const a = o.type;
    if (e === Sc) {
      const l = wu(a, !1);
      if (l && (l === t || l === dn(t) || l === pa(dn(t)))) return a;
    }
    const i = Rf(o[e] || a[e], t) || Rf(o.appContext[e], t);
    return !i && r ? a : i;
  }
}
function Rf(e, t) {
  return e && (e[t] || e[dn(t)] || e[pa(dn(t))]);
}
function fu(e, t, n, r) {
  let o;
  const a = n && n[r];
  if (Te(e) || Ct(e)) {
    o = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      o[i] = t(e[i], i, void 0, a && a[i]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let i = 0; i < e; i++) o[i] = t(i + 1, i, void 0, a && a[i]);
  } else if (dt(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (i, l) => t(i, l, void 0, a && a[l]));
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let l = 0, s = i.length; l < s; l++) {
        const u = i[l];
        o[l] = t(e[u], u, l, a && a[l]);
      }
    }
  else o = [];
  return n && (n[r] = o), o;
}
function bv(e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (Te(r)) for (let o = 0; o < r.length; o++) e[r[o].name] = r[o].fn;
    else
      r &&
        (e[r.name] = r.key
          ? (...o) => {
              const a = r.fn(...o);
              return a && (a.key = r.key), a;
            }
          : r.fn);
  }
  return e;
}
function Wy(e, t, n = {}, r, o) {
  if (zt.isCE || (zt.parent && lo(zt.parent) && zt.parent.isCE))
    return t !== "default" && (n.name = t), M("slot", n, r && r());
  let a = e[t];
  a && a._c && (a._d = !1), lt();
  const i = a && Sv(a(n)),
    l = It(
      jt,
      { key: n.key || (i && i.key) || `_${t}` },
      i || (r ? r() : []),
      i && e._ === 1 ? 64 : -2
    );
  return (
    !o && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    a && a._c && (a._d = !0),
    l
  );
}
function Sv(e) {
  return e.some((t) =>
    Fr(t) ? !(t.type === tn || (t.type === jt && !Sv(t.children))) : !0
  )
    ? e
    : null;
}
function Qy(e, t) {
  const n = {};
  for (const r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : $i(r)] = e[r];
  return n;
}
const du = (e) => (e ? (Vv(e) ? ns(e) || e.proxy : du(e.parent)) : null),
  Ni = gt(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => du(e.parent),
    $root: (e) => du(e.root),
    $emit: (e) => e.emit,
    $options: (e) => xc(e),
    $forceUpdate: (e) => e.f || (e.f = () => Gl(e.update)),
    $nextTick: (e) => e.n || (e.n = at.bind(e.proxy)),
    $watch: (e) => By.bind(e),
  }),
  xs = (e, t) => e !== ct && !e.__isScriptSetup && nt(e, t),
  hu = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: o,
        props: a,
        accessCache: i,
        type: l,
        appContext: s,
      } = e;
      let u;
      if (t[0] !== "$") {
        const h = i[t];
        if (h !== void 0)
          switch (h) {
            case 1:
              return r[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return a[t];
          }
        else {
          if (xs(r, t)) return (i[t] = 1), r[t];
          if (o !== ct && nt(o, t)) return (i[t] = 2), o[t];
          if ((u = e.propsOptions[0]) && nt(u, t)) return (i[t] = 3), a[t];
          if (n !== ct && nt(n, t)) return (i[t] = 4), n[t];
          vu && (i[t] = 0);
        }
      }
      const c = Ni[t];
      let f, d;
      if (c) return t === "$attrs" && hn(e, "get", t), c(e);
      if ((f = l.__cssModules) && (f = f[t])) return f;
      if (n !== ct && nt(n, t)) return (i[t] = 4), n[t];
      if (((d = s.config.globalProperties), nt(d, t))) return d[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: a } = e;
      return xs(o, t)
        ? ((o[t] = n), !0)
        : r !== ct && nt(r, t)
        ? ((r[t] = n), !0)
        : nt(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((a[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: o,
          propsOptions: a,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== ct && nt(e, i)) ||
        xs(t, i) ||
        ((l = a[0]) && nt(l, i)) ||
        nt(r, i) ||
        nt(Ni, i) ||
        nt(o.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : nt(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  },
  Gy = gt({}, hu, {
    get(e, t) {
      if (t !== Symbol.unscopables) return hu.get(e, t, e);
    },
    has(e, t) {
      return t[0] !== "_" && !Sg(t);
    },
  });
function Xy() {
  return null;
}
function Yy() {
  return null;
}
function Jy(e) {}
function Zy(e) {}
function eb() {
  return null;
}
function tb() {}
function nb(e, t) {
  return null;
}
function rb() {
  return wv().slots;
}
function ob() {
  return wv().attrs;
}
function ib(e, t, n) {
  const r = Fe();
  if (n && n.local) {
    const o = fe(e[t]);
    return (
      me(
        () => e[t],
        (a) => (o.value = a)
      ),
      me(o, (a) => {
        a !== e[t] && r.emit(`update:${t}`, a);
      }),
      o
    );
  } else
    return {
      __v_isRef: !0,
      get value() {
        return e[t];
      },
      set value(o) {
        r.emit(`update:${t}`, o);
      },
    };
}
function wv() {
  const e = Fe();
  return e.setupContext || (e.setupContext = _v(e));
}
function aa(e) {
  return Te(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
function ab(e, t) {
  const n = aa(e);
  for (const r in t) {
    if (r.startsWith("__skip")) continue;
    let o = n[r];
    o
      ? Te(o) || je(o)
        ? (o = n[r] = { type: o, default: t[r] })
        : (o.default = t[r])
      : o === null && (o = n[r] = { default: t[r] }),
      o && t[`__skip_${r}`] && (o.skipFactory = !0);
  }
  return n;
}
function lb(e, t) {
  return !e || !t
    ? e || t
    : Te(e) && Te(t)
    ? e.concat(t)
    : gt({}, aa(e), aa(t));
}
function sb(e, t) {
  const n = {};
  for (const r in e)
    t.includes(r) ||
      Object.defineProperty(n, r, { enumerable: !0, get: () => e[r] });
  return n;
}
function ub(e) {
  const t = Fe();
  let n = e();
  return (
    Dr(),
    tc(n) &&
      (n = n.catch((r) => {
        throw (Nr(t), r);
      })),
    [n, () => Nr(t)]
  );
}
let vu = !0;
function cb(e) {
  const t = xc(e),
    n = e.proxy,
    r = e.ctx;
  (vu = !1), t.beforeCreate && Af(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: a,
    methods: i,
    watch: l,
    provide: s,
    inject: u,
    created: c,
    beforeMount: f,
    mounted: d,
    beforeUpdate: h,
    updated: v,
    activated: m,
    deactivated: g,
    beforeDestroy: y,
    beforeUnmount: p,
    destroyed: w,
    unmounted: b,
    render: S,
    renderTracked: E,
    renderTriggered: A,
    errorCaptured: T,
    serverPrefetch: x,
    expose: C,
    inheritAttrs: D,
    components: I,
    directives: $,
    filters: L,
  } = t;
  if ((u && fb(u, r, null), i))
    for (const V in i) {
      const oe = i[V];
      je(oe) && (r[V] = oe.bind(n));
    }
  if (o) {
    const V = o.call(n, n);
    dt(V) && (e.data = Pn(V));
  }
  if (((vu = !0), a))
    for (const V in a) {
      const oe = a[V],
        xe = je(oe) ? oe.bind(n, n) : je(oe.get) ? oe.get.bind(n, n) : Hn,
        J = !je(oe) && je(oe.set) ? oe.set.bind(n) : Hn,
        X = O({ get: xe, set: J });
      Object.defineProperty(r, V, {
        enumerable: !0,
        configurable: !0,
        get: () => X.value,
        set: (H) => (X.value = H),
      });
    }
  if (l) for (const V in l) xv(l[V], r, n, V);
  if (s) {
    const V = je(s) ? s.call(n) : s;
    Reflect.ownKeys(V).forEach((oe) => {
      Lr(oe, V[oe]);
    });
  }
  c && Af(c, e, "c");
  function j(V, oe) {
    Te(oe) ? oe.forEach((xe) => V(xe.bind(n))) : oe && V(oe.bind(n));
  }
  if (
    (j(Sa, f),
    j(Ft, d),
    j(es, h),
    j(wa, v),
    j(si, m),
    j(qr, g),
    j(gv, T),
    j(mv, E),
    j(pv, A),
    j(vt, p),
    j(ui, b),
    j(vv, x),
    Te(C))
  )
    if (C.length) {
      const V = e.exposed || (e.exposed = {});
      C.forEach((oe) => {
        Object.defineProperty(V, oe, {
          get: () => n[oe],
          set: (xe) => (n[oe] = xe),
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === Hn && (e.render = S),
    D != null && (e.inheritAttrs = D),
    I && (e.components = I),
    $ && (e.directives = $);
}
function fb(e, t, n = Hn) {
  Te(e) && (e = pu(e));
  for (const r in e) {
    const o = e[r];
    let a;
    dt(o)
      ? "default" in o
        ? (a = qt(o.from || r, o.default, !0))
        : (a = qt(o.from || r))
      : (a = qt(o)),
      Et(a)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => a.value,
            set: (i) => (a.value = i),
          })
        : (t[r] = a);
  }
}
function Af(e, t, n) {
  Sn(Te(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function xv(e, t, n, r) {
  const o = r.includes(".") ? cv(n, r) : () => n[r];
  if (Ct(e)) {
    const a = t[e];
    je(a) && me(o, a);
  } else if (je(e)) me(o, e.bind(n));
  else if (dt(e))
    if (Te(e)) e.forEach((a) => xv(a, t, n, r));
    else {
      const a = je(e.handler) ? e.handler.bind(n) : t[e.handler];
      je(a) && me(o, a, e);
    }
}
function xc(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: a,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = a.get(t);
  let s;
  return (
    l
      ? (s = l)
      : !o.length && !n && !r
      ? (s = t)
      : ((s = {}), o.length && o.forEach((u) => Sl(s, u, i, !0)), Sl(s, t, i)),
    dt(t) && a.set(t, s),
    s
  );
}
function Sl(e, t, n, r = !1) {
  const { mixins: o, extends: a } = t;
  a && Sl(e, a, n, !0), o && o.forEach((i) => Sl(e, i, n, !0));
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = db[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const db = {
  data: If,
  props: Lf,
  emits: Lf,
  methods: Pi,
  computed: Pi,
  beforeCreate: rn,
  created: rn,
  beforeMount: rn,
  mounted: rn,
  beforeUpdate: rn,
  updated: rn,
  beforeDestroy: rn,
  beforeUnmount: rn,
  destroyed: rn,
  unmounted: rn,
  activated: rn,
  deactivated: rn,
  errorCaptured: rn,
  serverPrefetch: rn,
  components: Pi,
  directives: Pi,
  watch: vb,
  provide: If,
  inject: hb,
};
function If(e, t) {
  return t
    ? e
      ? function () {
          return gt(
            je(e) ? e.call(this, this) : e,
            je(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function hb(e, t) {
  return Pi(pu(e), pu(t));
}
function pu(e) {
  if (Te(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function rn(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Pi(e, t) {
  return e ? gt(Object.create(null), e, t) : t;
}
function Lf(e, t) {
  return e
    ? Te(e) && Te(t)
      ? [...new Set([...e, ...t])]
      : gt(Object.create(null), aa(e), aa(t != null ? t : {}))
    : t;
}
function vb(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = gt(Object.create(null), e);
  for (const r in t) n[r] = rn(e[r], t[r]);
  return n;
}
function Ev() {
  return {
    app: null,
    config: {
      isNativeTag: dg,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let pb = 0;
function mb(e, t) {
  return function (r, o = null) {
    je(r) || (r = gt({}, r)), o != null && !dt(o) && (o = null);
    const a = Ev(),
      i = new Set();
    let l = !1;
    const s = (a.app = {
      _uid: pb++,
      _component: r,
      _props: o,
      _container: null,
      _context: a,
      _instance: null,
      version: Wv,
      get config() {
        return a.config;
      },
      set config(u) {},
      use(u, ...c) {
        return (
          i.has(u) ||
            (u && je(u.install)
              ? (i.add(u), u.install(s, ...c))
              : je(u) && (i.add(u), u(s, ...c))),
          s
        );
      },
      mixin(u) {
        return a.mixins.includes(u) || a.mixins.push(u), s;
      },
      component(u, c) {
        return c ? ((a.components[u] = c), s) : a.components[u];
      },
      directive(u, c) {
        return c ? ((a.directives[u] = c), s) : a.directives[u];
      },
      mount(u, c, f) {
        if (!l) {
          const d = M(r, o);
          return (
            (d.appContext = a),
            c && t ? t(d, u) : e(d, u, f),
            (l = !0),
            (s._container = u),
            (u.__vue_app__ = s),
            ns(d.component) || d.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, s._container), delete s._container.__vue_app__);
      },
      provide(u, c) {
        return (a.provides[u] = c), s;
      },
      runWithContext(u) {
        la = s;
        try {
          return u();
        } finally {
          la = null;
        }
      },
    });
    return s;
  };
}
let la = null;
function Lr(e, t) {
  if (Vt) {
    let n = Vt.provides;
    const r = Vt.parent && Vt.parent.provides;
    r === n && (n = Vt.provides = Object.create(r)), (n[e] = t);
  }
}
function qt(e, t, n = !1) {
  const r = Vt || zt;
  if (r || la) {
    const o = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : la._context.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && je(t) ? t.call(r && r.proxy) : t;
  }
}
function Cv() {
  return !!(Vt || zt || la);
}
function gb(e, t, n, r = !1) {
  const o = {},
    a = {};
  pl(a, ts, 1), (e.propsDefaults = Object.create(null)), Ov(e, t, o, a);
  for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
  n ? (e.props = r ? o : sc(o)) : e.type.props ? (e.props = o) : (e.props = a),
    (e.attrs = a);
}
function yb(e, t, n, r) {
  const {
      props: o,
      attrs: a,
      vnode: { patchFlag: i },
    } = e,
    l = He(o),
    [s] = e.propsOptions;
  let u = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const c = e.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let d = c[f];
        if (Xl(e.emitsOptions, d)) continue;
        const h = t[d];
        if (s)
          if (nt(a, d)) h !== a[d] && ((a[d] = h), (u = !0));
          else {
            const v = dn(d);
            o[v] = mu(s, l, v, h, e, !1);
          }
        else h !== a[d] && ((a[d] = h), (u = !0));
      }
    }
  } else {
    Ov(e, t, o, a) && (u = !0);
    let c;
    for (const f in l)
      (!t || (!nt(t, f) && ((c = On(f)) === f || !nt(t, c)))) &&
        (s
          ? n &&
            (n[f] !== void 0 || n[c] !== void 0) &&
            (o[f] = mu(s, l, f, void 0, e, !0))
          : delete o[f]);
    if (a !== l)
      for (const f in a) (!t || (!nt(t, f) && !0)) && (delete a[f], (u = !0));
  }
  u && dr(e, "set", "$attrs");
}
function Ov(e, t, n, r) {
  const [o, a] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let s in t) {
      if (Mi(s)) continue;
      const u = t[s];
      let c;
      o && nt(o, (c = dn(s)))
        ? !a || !a.includes(c)
          ? (n[c] = u)
          : ((l || (l = {}))[c] = u)
        : Xl(e.emitsOptions, s) ||
          ((!(s in r) || u !== r[s]) && ((r[s] = u), (i = !0)));
    }
  if (a) {
    const s = He(n),
      u = l || ct;
    for (let c = 0; c < a.length; c++) {
      const f = a[c];
      n[f] = mu(o, s, f, u[f], e, !nt(u, f));
    }
  }
  return i;
}
function mu(e, t, n, r, o, a) {
  const i = e[n];
  if (i != null) {
    const l = nt(i, "default");
    if (l && r === void 0) {
      const s = i.default;
      if (i.type !== Function && !i.skipFactory && je(s)) {
        const { propsDefaults: u } = o;
        n in u ? (r = u[n]) : (Nr(o), (r = u[n] = s.call(null, t)), Dr());
      } else r = s;
    }
    i[0] &&
      (a && !l ? (r = !1) : i[1] && (r === "" || r === On(n)) && (r = !0));
  }
  return r;
}
function Tv(e, t, n = !1) {
  const r = t.propsCache,
    o = r.get(e);
  if (o) return o;
  const a = e.props,
    i = {},
    l = [];
  let s = !1;
  if (!je(e)) {
    const c = (f) => {
      s = !0;
      const [d, h] = Tv(f, t, !0);
      gt(i, d), h && l.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  if (!a && !s) return dt(e) && r.set(e, qo), qo;
  if (Te(a))
    for (let c = 0; c < a.length; c++) {
      const f = dn(a[c]);
      kf(f) && (i[f] = ct);
    }
  else if (a)
    for (const c in a) {
      const f = dn(c);
      if (kf(f)) {
        const d = a[c],
          h = (i[f] = Te(d) || je(d) ? { type: d } : gt({}, d));
        if (h) {
          const v = $f(Boolean, h.type),
            m = $f(String, h.type);
          (h[0] = v > -1),
            (h[1] = m < 0 || v < m),
            (v > -1 || nt(h, "default")) && l.push(f);
        }
      }
    }
  const u = [i, l];
  return dt(e) && r.set(e, u), u;
}
function kf(e) {
  return e[0] !== "$";
}
function Df(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Mf(e, t) {
  return Df(e) === Df(t);
}
function $f(e, t) {
  return Te(t) ? t.findIndex((n) => Mf(n, e)) : je(t) && Mf(t, e) ? 0 : -1;
}
const Pv = (e) => e[0] === "_" || e === "$stable",
  Ec = (e) => (Te(e) ? e.map(yn) : [yn(e)]),
  bb = (e, t, n) => {
    if (t._n) return t;
    const r = z((...o) => Ec(t(...o)), n);
    return (r._c = !1), r;
  },
  Rv = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
      if (Pv(o)) continue;
      const a = e[o];
      if (je(a)) t[o] = bb(o, a, r);
      else if (a != null) {
        const i = Ec(a);
        t[o] = () => i;
      }
    }
  },
  Av = (e, t) => {
    const n = Ec(t);
    e.slots.default = () => n;
  },
  Sb = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = He(t)), pl(t, "_", n)) : Rv(t, (e.slots = {}));
    } else (e.slots = {}), t && Av(e, t);
    pl(e.slots, ts, 1);
  },
  wb = (e, t, n) => {
    const { vnode: r, slots: o } = e;
    let a = !0,
      i = ct;
    if (r.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (a = !1)
          : (gt(o, t), !n && l === 1 && delete o._)
        : ((a = !t.$stable), Rv(t, o)),
        (i = t);
    } else t && (Av(e, t), (i = { default: 1 }));
    if (a) for (const l in o) !Pv(l) && !(l in i) && delete o[l];
  };
function wl(e, t, n, r, o = !1) {
  if (Te(e)) {
    e.forEach((d, h) => wl(d, t && (Te(t) ? t[h] : t), n, r, o));
    return;
  }
  if (lo(r) && !o) return;
  const a = r.shapeFlag & 4 ? ns(r.component) || r.component.proxy : r.el,
    i = o ? null : a,
    { i: l, r: s } = e,
    u = t && t.r,
    c = l.refs === ct ? (l.refs = {}) : l.refs,
    f = l.setupState;
  if (
    (u != null &&
      u !== s &&
      (Ct(u)
        ? ((c[u] = null), nt(f, u) && (f[u] = null))
        : Et(u) && (u.value = null)),
    je(s))
  )
    ur(s, l, 12, [i, c]);
  else {
    const d = Ct(s),
      h = Et(s);
    if (d || h) {
      const v = () => {
        if (e.f) {
          const m = d ? (nt(f, s) ? f[s] : c[s]) : s.value;
          o
            ? Te(m) && ec(m, a)
            : Te(m)
            ? m.includes(a) || m.push(a)
            : d
            ? ((c[s] = [a]), nt(f, s) && (f[s] = c[s]))
            : ((s.value = [a]), e.k && (c[e.k] = s.value));
        } else
          d
            ? ((c[s] = i), nt(f, s) && (f[s] = i))
            : h && ((s.value = i), e.k && (c[e.k] = i));
      };
      i ? ((v.id = -1), Qt(v, n)) : v();
    }
  }
}
let gr = !1;
const Fa = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  Na = (e) => e.nodeType === 8;
function xb(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: r,
        createText: o,
        nextSibling: a,
        parentNode: i,
        remove: l,
        insert: s,
        createComment: u,
      },
    } = e,
    c = (y, p) => {
      if (!p.hasChildNodes()) {
        n(null, y, p), bl(), (p._vnode = y);
        return;
      }
      (gr = !1),
        f(p.firstChild, y, null, null, null),
        bl(),
        (p._vnode = y),
        gr && console.error("Hydration completed but contains mismatches.");
    },
    f = (y, p, w, b, S, E = !1) => {
      const A = Na(y) && y.data === "[",
        T = () => m(y, p, w, b, S, A),
        { type: x, ref: C, shapeFlag: D, patchFlag: I } = p;
      let $ = y.nodeType;
      (p.el = y), I === -2 && ((E = !1), (p.dynamicChildren = null));
      let L = null;
      switch (x) {
        case mo:
          $ !== 3
            ? p.children === ""
              ? (s((p.el = o("")), i(y), y), (L = y))
              : (L = T())
            : (y.data !== p.children && ((gr = !0), (y.data = p.children)),
              (L = a(y)));
          break;
        case tn:
          $ !== 8 || A ? (L = T()) : (L = a(y));
          break;
        case so:
          if ((A && ((y = a(y)), ($ = y.nodeType)), $ === 1 || $ === 3)) {
            L = y;
            const G = !p.children.length;
            for (let j = 0; j < p.staticCount; j++)
              G && (p.children += L.nodeType === 1 ? L.outerHTML : L.data),
                j === p.staticCount - 1 && (p.anchor = L),
                (L = a(L));
            return A ? a(L) : L;
          } else T();
          break;
        case jt:
          A ? (L = v(y, p, w, b, S, E)) : (L = T());
          break;
        default:
          if (D & 1)
            $ !== 1 || p.type.toLowerCase() !== y.tagName.toLowerCase()
              ? (L = T())
              : (L = d(y, p, w, b, S, E));
          else if (D & 6) {
            p.slotScopeIds = S;
            const G = i(y);
            if (
              (t(p, G, null, w, b, Fa(G), E),
              (L = A ? g(y) : a(y)),
              L && Na(L) && L.data === "teleport end" && (L = a(L)),
              lo(p))
            ) {
              let j;
              A
                ? ((j = M(jt)),
                  (j.anchor = L ? L.previousSibling : G.lastChild))
                : (j = y.nodeType === 3 ? Ge("") : M("div")),
                (j.el = y),
                (p.component.subTree = j);
            }
          } else
            D & 64
              ? $ !== 8
                ? (L = T())
                : (L = p.type.hydrate(y, p, w, b, S, E, e, h))
              : D & 128 &&
                (L = p.type.hydrate(y, p, w, b, Fa(i(y)), S, E, e, f));
      }
      return C != null && wl(C, null, b, p), L;
    },
    d = (y, p, w, b, S, E) => {
      E = E || !!p.dynamicChildren;
      const { type: A, props: T, patchFlag: x, shapeFlag: C, dirs: D } = p,
        I = (A === "input" && D) || A === "option";
      if (I || x !== -1) {
        if ((D && Qn(p, null, w, "created"), T))
          if (I || !E || x & 48)
            for (const L in T)
              ((I && L.endsWith("value")) || (va(L) && !Mi(L))) &&
                r(y, L, null, T[L], !1, void 0, w);
          else T.onClick && r(y, "onClick", null, T.onClick, !1, void 0, w);
        let $;
        if (
          (($ = T && T.onVnodeBeforeMount) && un($, w, p),
          D && Qn(p, null, w, "beforeMount"),
          (($ = T && T.onVnodeMounted) || D) &&
            sv(() => {
              $ && un($, w, p), D && Qn(p, null, w, "mounted");
            }, b),
          C & 16 && !(T && (T.innerHTML || T.textContent)))
        ) {
          let L = h(y.firstChild, p, y, w, b, S, E);
          for (; L; ) {
            gr = !0;
            const G = L;
            (L = L.nextSibling), l(G);
          }
        } else
          C & 8 &&
            y.textContent !== p.children &&
            ((gr = !0), (y.textContent = p.children));
      }
      return y.nextSibling;
    },
    h = (y, p, w, b, S, E, A) => {
      A = A || !!p.dynamicChildren;
      const T = p.children,
        x = T.length;
      for (let C = 0; C < x; C++) {
        const D = A ? T[C] : (T[C] = yn(T[C]));
        if (y) y = f(y, D, b, S, E, A);
        else {
          if (D.type === mo && !D.children) continue;
          (gr = !0), n(null, D, w, null, b, S, Fa(w), E);
        }
      }
      return y;
    },
    v = (y, p, w, b, S, E) => {
      const { slotScopeIds: A } = p;
      A && (S = S ? S.concat(A) : A);
      const T = i(y),
        x = h(a(y), p, T, w, b, S, E);
      return x && Na(x) && x.data === "]"
        ? a((p.anchor = x))
        : ((gr = !0), s((p.anchor = u("]")), T, x), x);
    },
    m = (y, p, w, b, S, E) => {
      if (((gr = !0), (p.el = null), E)) {
        const x = g(y);
        for (;;) {
          const C = a(y);
          if (C && C !== x) l(C);
          else break;
        }
      }
      const A = a(y),
        T = i(y);
      return l(y), n(null, p, T, A, w, b, Fa(T), S), A;
    },
    g = (y) => {
      let p = 0;
      for (; y; )
        if (
          ((y = a(y)), y && Na(y) && (y.data === "[" && p++, y.data === "]"))
        ) {
          if (p === 0) return a(y);
          p--;
        }
      return y;
    };
  return [c, f];
}
const Qt = sv;
function Iv(e) {
  return kv(e);
}
function Lv(e) {
  return kv(e, xb);
}
function kv(e, t) {
  const n = au();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: o,
      patchProp: a,
      createElement: i,
      createText: l,
      createComment: s,
      setText: u,
      setElementText: c,
      parentNode: f,
      nextSibling: d,
      setScopeId: h = Hn,
      insertStaticContent: v,
    } = e,
    m = (
      R,
      P,
      B,
      Q = null,
      Y = null,
      te = null,
      ve = !1,
      ue = null,
      ie = !!P.dynamicChildren
    ) => {
      if (R === P) return;
      R && !Vn(R, P) && ((Q = N(R)), H(R, Y, te, !0), (R = null)),
        P.patchFlag === -2 && ((ie = !1), (P.dynamicChildren = null));
      const { type: ee, ref: ye, shapeFlag: K } = P;
      switch (ee) {
        case mo:
          g(R, P, B, Q);
          break;
        case tn:
          y(R, P, B, Q);
          break;
        case so:
          R == null && p(P, B, Q, ve);
          break;
        case jt:
          I(R, P, B, Q, Y, te, ve, ue, ie);
          break;
        default:
          K & 1
            ? S(R, P, B, Q, Y, te, ve, ue, ie)
            : K & 6
            ? $(R, P, B, Q, Y, te, ve, ue, ie)
            : (K & 64 || K & 128) &&
              ee.process(R, P, B, Q, Y, te, ve, ue, ie, U);
      }
      ye != null && Y && wl(ye, R && R.ref, te, P || R, !P);
    },
    g = (R, P, B, Q) => {
      if (R == null) r((P.el = l(P.children)), B, Q);
      else {
        const Y = (P.el = R.el);
        P.children !== R.children && u(Y, P.children);
      }
    },
    y = (R, P, B, Q) => {
      R == null ? r((P.el = s(P.children || "")), B, Q) : (P.el = R.el);
    },
    p = (R, P, B, Q) => {
      [R.el, R.anchor] = v(R.children, P, B, Q, R.el, R.anchor);
    },
    w = ({ el: R, anchor: P }, B, Q) => {
      let Y;
      for (; R && R !== P; ) (Y = d(R)), r(R, B, Q), (R = Y);
      r(P, B, Q);
    },
    b = ({ el: R, anchor: P }) => {
      let B;
      for (; R && R !== P; ) (B = d(R)), o(R), (R = B);
      o(P);
    },
    S = (R, P, B, Q, Y, te, ve, ue, ie) => {
      (ve = ve || P.type === "svg"),
        R == null ? E(P, B, Q, Y, te, ve, ue, ie) : x(R, P, Y, te, ve, ue, ie);
    },
    E = (R, P, B, Q, Y, te, ve, ue) => {
      let ie, ee;
      const { type: ye, props: K, shapeFlag: ce, transition: we, dirs: ke } = R;
      if (
        ((ie = R.el = i(R.type, te, K && K.is, K)),
        ce & 8
          ? c(ie, R.children)
          : ce & 16 &&
            T(R.children, ie, null, Q, Y, te && ye !== "foreignObject", ve, ue),
        ke && Qn(R, null, Q, "created"),
        A(ie, R, R.scopeId, ve, Q),
        K)
      ) {
        for (const ze in K)
          ze !== "value" &&
            !Mi(ze) &&
            a(ie, ze, null, K[ze], te, R.children, Q, Y, ne);
        "value" in K && a(ie, "value", null, K.value),
          (ee = K.onVnodeBeforeMount) && un(ee, Q, R);
      }
      ke && Qn(R, null, Q, "beforeMount");
      const We = (!Y || (Y && !Y.pendingBranch)) && we && !we.persisted;
      We && we.beforeEnter(ie),
        r(ie, P, B),
        ((ee = K && K.onVnodeMounted) || We || ke) &&
          Qt(() => {
            ee && un(ee, Q, R),
              We && we.enter(ie),
              ke && Qn(R, null, Q, "mounted");
          }, Y);
    },
    A = (R, P, B, Q, Y) => {
      if ((B && h(R, B), Q)) for (let te = 0; te < Q.length; te++) h(R, Q[te]);
      if (Y) {
        let te = Y.subTree;
        if (P === te) {
          const ve = Y.vnode;
          A(R, ve, ve.scopeId, ve.slotScopeIds, Y.parent);
        }
      }
    },
    T = (R, P, B, Q, Y, te, ve, ue, ie = 0) => {
      for (let ee = ie; ee < R.length; ee++) {
        const ye = (R[ee] = ue ? Cr(R[ee]) : yn(R[ee]));
        m(null, ye, P, B, Q, Y, te, ve, ue);
      }
    },
    x = (R, P, B, Q, Y, te, ve) => {
      const ue = (P.el = R.el);
      let { patchFlag: ie, dynamicChildren: ee, dirs: ye } = P;
      ie |= R.patchFlag & 16;
      const K = R.props || ct,
        ce = P.props || ct;
      let we;
      B && Ur(B, !1),
        (we = ce.onVnodeBeforeUpdate) && un(we, B, P, R),
        ye && Qn(P, R, B, "beforeUpdate"),
        B && Ur(B, !0);
      const ke = Y && P.type !== "foreignObject";
      if (
        (ee
          ? C(R.dynamicChildren, ee, ue, B, Q, ke, te)
          : ve || oe(R, P, ue, null, B, Q, ke, te, !1),
        ie > 0)
      ) {
        if (ie & 16) D(ue, P, K, ce, B, Q, Y);
        else if (
          (ie & 2 && K.class !== ce.class && a(ue, "class", null, ce.class, Y),
          ie & 4 && a(ue, "style", K.style, ce.style, Y),
          ie & 8)
        ) {
          const We = P.dynamicProps;
          for (let ze = 0; ze < We.length; ze++) {
            const q = We[ze],
              _ = K[q],
              W = ce[q];
            (W !== _ || q === "value") &&
              a(ue, q, _, W, Y, R.children, B, Q, ne);
          }
        }
        ie & 1 && R.children !== P.children && c(ue, P.children);
      } else !ve && ee == null && D(ue, P, K, ce, B, Q, Y);
      ((we = ce.onVnodeUpdated) || ye) &&
        Qt(() => {
          we && un(we, B, P, R), ye && Qn(P, R, B, "updated");
        }, Q);
    },
    C = (R, P, B, Q, Y, te, ve) => {
      for (let ue = 0; ue < P.length; ue++) {
        const ie = R[ue],
          ee = P[ue],
          ye =
            ie.el && (ie.type === jt || !Vn(ie, ee) || ie.shapeFlag & 70)
              ? f(ie.el)
              : B;
        m(ie, ee, ye, null, Q, Y, te, ve, !0);
      }
    },
    D = (R, P, B, Q, Y, te, ve) => {
      if (B !== Q) {
        if (B !== ct)
          for (const ue in B)
            !Mi(ue) &&
              !(ue in Q) &&
              a(R, ue, B[ue], null, ve, P.children, Y, te, ne);
        for (const ue in Q) {
          if (Mi(ue)) continue;
          const ie = Q[ue],
            ee = B[ue];
          ie !== ee &&
            ue !== "value" &&
            a(R, ue, ee, ie, ve, P.children, Y, te, ne);
        }
        "value" in Q && a(R, "value", B.value, Q.value);
      }
    },
    I = (R, P, B, Q, Y, te, ve, ue, ie) => {
      const ee = (P.el = R ? R.el : l("")),
        ye = (P.anchor = R ? R.anchor : l(""));
      let { patchFlag: K, dynamicChildren: ce, slotScopeIds: we } = P;
      we && (ue = ue ? ue.concat(we) : we),
        R == null
          ? (r(ee, B, Q), r(ye, B, Q), T(P.children, B, ye, Y, te, ve, ue, ie))
          : K > 0 && K & 64 && ce && R.dynamicChildren
          ? (C(R.dynamicChildren, ce, B, Y, te, ve, ue),
            (P.key != null || (Y && P === Y.subTree)) && Cc(R, P, !0))
          : oe(R, P, B, ye, Y, te, ve, ue, ie);
    },
    $ = (R, P, B, Q, Y, te, ve, ue, ie) => {
      (P.slotScopeIds = ue),
        R == null
          ? P.shapeFlag & 512
            ? Y.ctx.activate(P, B, Q, ve, ie)
            : L(P, B, Q, Y, te, ve, ie)
          : G(R, P, ie);
    },
    L = (R, P, B, Q, Y, te, ve) => {
      const ue = (R.component = jv(R, Q, Y));
      if ((ba(R) && (ue.ctx.renderer = U), qv(ue), ue.asyncDep)) {
        if ((Y && Y.registerDep(ue, j), !R.el)) {
          const ie = (ue.subTree = M(tn));
          y(null, ie, P, B);
        }
        return;
      }
      j(ue, R, P, B, Y, te, ve);
    },
    G = (R, P, B) => {
      const Q = (P.component = R.component);
      if (Ry(R, P, B))
        if (Q.asyncDep && !Q.asyncResolved) {
          V(Q, P, B);
          return;
        } else (Q.next = P), by(Q.update), Q.update();
      else (P.el = R.el), (Q.vnode = P);
    },
    j = (R, P, B, Q, Y, te, ve) => {
      const ue = () => {
          if (R.isMounted) {
            let { next: ye, bu: K, u: ce, parent: we, vnode: ke } = R,
              We = ye,
              ze;
            Ur(R, !1),
              ye ? ((ye.el = ke.el), V(R, ye, ve)) : (ye = ke),
              K && _o(K),
              (ze = ye.props && ye.props.onVnodeBeforeUpdate) &&
                un(ze, we, ye, ke),
              Ur(R, !0);
            const q = el(R),
              _ = R.subTree;
            (R.subTree = q),
              m(_, q, f(_.el), N(_), R, Y, te),
              (ye.el = q.el),
              We === null && mc(R, q.el),
              ce && Qt(ce, Y),
              (ze = ye.props && ye.props.onVnodeUpdated) &&
                Qt(() => un(ze, we, ye, ke), Y);
          } else {
            let ye;
            const { el: K, props: ce } = P,
              { bm: we, m: ke, parent: We } = R,
              ze = lo(P);
            if (
              (Ur(R, !1),
              we && _o(we),
              !ze && (ye = ce && ce.onVnodeBeforeMount) && un(ye, We, P),
              Ur(R, !0),
              K && Le)
            ) {
              const q = () => {
                (R.subTree = el(R)), Le(K, R.subTree, R, Y, null);
              };
              ze
                ? P.type.__asyncLoader().then(() => !R.isUnmounted && q())
                : q();
            } else {
              const q = (R.subTree = el(R));
              m(null, q, B, Q, R, Y, te), (P.el = q.el);
            }
            if ((ke && Qt(ke, Y), !ze && (ye = ce && ce.onVnodeMounted))) {
              const q = P;
              Qt(() => un(ye, We, q), Y);
            }
            (P.shapeFlag & 256 ||
              (We && lo(We.vnode) && We.vnode.shapeFlag & 256)) &&
              R.a &&
              Qt(R.a, Y),
              (R.isMounted = !0),
              (P = B = Q = null);
          }
        },
        ie = (R.effect = new ga(ue, () => Gl(ee), R.scope)),
        ee = (R.update = () => ie.run());
      (ee.id = R.uid), Ur(R, !0), ee();
    },
    V = (R, P, B) => {
      P.component = R;
      const Q = R.vnode.props;
      (R.vnode = P),
        (R.next = null),
        yb(R, P.props, Q, B),
        wb(R, P.children, B),
        ai(),
        Cf(),
        li();
    },
    oe = (R, P, B, Q, Y, te, ve, ue, ie = !1) => {
      const ee = R && R.children,
        ye = R ? R.shapeFlag : 0,
        K = P.children,
        { patchFlag: ce, shapeFlag: we } = P;
      if (ce > 0) {
        if (ce & 128) {
          J(ee, K, B, Q, Y, te, ve, ue, ie);
          return;
        } else if (ce & 256) {
          xe(ee, K, B, Q, Y, te, ve, ue, ie);
          return;
        }
      }
      we & 8
        ? (ye & 16 && ne(ee, Y, te), K !== ee && c(B, K))
        : ye & 16
        ? we & 16
          ? J(ee, K, B, Q, Y, te, ve, ue, ie)
          : ne(ee, Y, te, !0)
        : (ye & 8 && c(B, ""), we & 16 && T(K, B, Q, Y, te, ve, ue, ie));
    },
    xe = (R, P, B, Q, Y, te, ve, ue, ie) => {
      (R = R || qo), (P = P || qo);
      const ee = R.length,
        ye = P.length,
        K = Math.min(ee, ye);
      let ce;
      for (ce = 0; ce < K; ce++) {
        const we = (P[ce] = ie ? Cr(P[ce]) : yn(P[ce]));
        m(R[ce], we, B, null, Y, te, ve, ue, ie);
      }
      ee > ye ? ne(R, Y, te, !0, !1, K) : T(P, B, Q, Y, te, ve, ue, ie, K);
    },
    J = (R, P, B, Q, Y, te, ve, ue, ie) => {
      let ee = 0;
      const ye = P.length;
      let K = R.length - 1,
        ce = ye - 1;
      for (; ee <= K && ee <= ce; ) {
        const we = R[ee],
          ke = (P[ee] = ie ? Cr(P[ee]) : yn(P[ee]));
        if (Vn(we, ke)) m(we, ke, B, null, Y, te, ve, ue, ie);
        else break;
        ee++;
      }
      for (; ee <= K && ee <= ce; ) {
        const we = R[K],
          ke = (P[ce] = ie ? Cr(P[ce]) : yn(P[ce]));
        if (Vn(we, ke)) m(we, ke, B, null, Y, te, ve, ue, ie);
        else break;
        K--, ce--;
      }
      if (ee > K) {
        if (ee <= ce) {
          const we = ce + 1,
            ke = we < ye ? P[we].el : Q;
          for (; ee <= ce; )
            m(
              null,
              (P[ee] = ie ? Cr(P[ee]) : yn(P[ee])),
              B,
              ke,
              Y,
              te,
              ve,
              ue,
              ie
            ),
              ee++;
        }
      } else if (ee > ce) for (; ee <= K; ) H(R[ee], Y, te, !0), ee++;
      else {
        const we = ee,
          ke = ee,
          We = new Map();
        for (ee = ke; ee <= ce; ee++) {
          const Pe = (P[ee] = ie ? Cr(P[ee]) : yn(P[ee]));
          Pe.key != null && We.set(Pe.key, ee);
        }
        let ze,
          q = 0;
        const _ = ce - ke + 1;
        let W = !1,
          le = 0;
        const ge = new Array(_);
        for (ee = 0; ee < _; ee++) ge[ee] = 0;
        for (ee = we; ee <= K; ee++) {
          const Pe = R[ee];
          if (q >= _) {
            H(Pe, Y, te, !0);
            continue;
          }
          let Ne;
          if (Pe.key != null) Ne = We.get(Pe.key);
          else
            for (ze = ke; ze <= ce; ze++)
              if (ge[ze - ke] === 0 && Vn(Pe, P[ze])) {
                Ne = ze;
                break;
              }
          Ne === void 0
            ? H(Pe, Y, te, !0)
            : ((ge[Ne - ke] = ee + 1),
              Ne >= le ? (le = Ne) : (W = !0),
              m(Pe, P[Ne], B, null, Y, te, ve, ue, ie),
              q++);
        }
        const Ae = W ? Eb(ge) : qo;
        for (ze = Ae.length - 1, ee = _ - 1; ee >= 0; ee--) {
          const Pe = ke + ee,
            Ne = P[Pe],
            it = Pe + 1 < ye ? P[Pe + 1].el : Q;
          ge[ee] === 0
            ? m(null, Ne, B, it, Y, te, ve, ue, ie)
            : W && (ze < 0 || ee !== Ae[ze] ? X(Ne, B, it, 2) : ze--);
        }
      }
    },
    X = (R, P, B, Q, Y = null) => {
      const {
        el: te,
        type: ve,
        transition: ue,
        children: ie,
        shapeFlag: ee,
      } = R;
      if (ee & 6) {
        X(R.component.subTree, P, B, Q);
        return;
      }
      if (ee & 128) {
        R.suspense.move(P, B, Q);
        return;
      }
      if (ee & 64) {
        ve.move(R, P, B, U);
        return;
      }
      if (ve === jt) {
        r(te, P, B);
        for (let K = 0; K < ie.length; K++) X(ie[K], P, B, Q);
        r(R.anchor, P, B);
        return;
      }
      if (ve === so) {
        w(R, P, B);
        return;
      }
      if (Q !== 2 && ee & 1 && ue)
        if (Q === 0) ue.beforeEnter(te), r(te, P, B), Qt(() => ue.enter(te), Y);
        else {
          const { leave: K, delayLeave: ce, afterLeave: we } = ue,
            ke = () => r(te, P, B),
            We = () => {
              K(te, () => {
                ke(), we && we();
              });
            };
          ce ? ce(te, ke, We) : We();
        }
      else r(te, P, B);
    },
    H = (R, P, B, Q = !1, Y = !1) => {
      const {
        type: te,
        props: ve,
        ref: ue,
        children: ie,
        dynamicChildren: ee,
        shapeFlag: ye,
        patchFlag: K,
        dirs: ce,
      } = R;
      if ((ue != null && wl(ue, null, B, R, !0), ye & 256)) {
        P.ctx.deactivate(R);
        return;
      }
      const we = ye & 1 && ce,
        ke = !lo(R);
      let We;
      if ((ke && (We = ve && ve.onVnodeBeforeUnmount) && un(We, P, R), ye & 6))
        de(R.component, B, Q);
      else {
        if (ye & 128) {
          R.suspense.unmount(B, Q);
          return;
        }
        we && Qn(R, null, P, "beforeUnmount"),
          ye & 64
            ? R.type.remove(R, P, B, Y, U, Q)
            : ee && (te !== jt || (K > 0 && K & 64))
            ? ne(ee, P, B, !1, !0)
            : ((te === jt && K & 384) || (!Y && ye & 16)) && ne(ie, P, B),
          Q && se(R);
      }
      ((ke && (We = ve && ve.onVnodeUnmounted)) || we) &&
        Qt(() => {
          We && un(We, P, R), we && Qn(R, null, P, "unmounted");
        }, B);
    },
    se = (R) => {
      const { type: P, el: B, anchor: Q, transition: Y } = R;
      if (P === jt) {
        Ee(B, Q);
        return;
      }
      if (P === so) {
        b(R);
        return;
      }
      const te = () => {
        o(B), Y && !Y.persisted && Y.afterLeave && Y.afterLeave();
      };
      if (R.shapeFlag & 1 && Y && !Y.persisted) {
        const { leave: ve, delayLeave: ue } = Y,
          ie = () => ve(B, te);
        ue ? ue(R.el, te, ie) : ie();
      } else te();
    },
    Ee = (R, P) => {
      let B;
      for (; R !== P; ) (B = d(R)), o(R), (R = B);
      o(P);
    },
    de = (R, P, B) => {
      const { bum: Q, scope: Y, update: te, subTree: ve, um: ue } = R;
      Q && _o(Q),
        Y.stop(),
        te && ((te.active = !1), H(ve, R, P, B)),
        ue && Qt(ue, P),
        Qt(() => {
          R.isUnmounted = !0;
        }, P),
        P &&
          P.pendingBranch &&
          !P.isUnmounted &&
          R.asyncDep &&
          !R.asyncResolved &&
          R.suspenseId === P.pendingId &&
          (P.deps--, P.deps === 0 && P.resolve());
    },
    ne = (R, P, B, Q = !1, Y = !1, te = 0) => {
      for (let ve = te; ve < R.length; ve++) H(R[ve], P, B, Q, Y);
    },
    N = (R) =>
      R.shapeFlag & 6
        ? N(R.component.subTree)
        : R.shapeFlag & 128
        ? R.suspense.next()
        : d(R.anchor || R.el),
    ae = (R, P, B) => {
      R == null
        ? P._vnode && H(P._vnode, null, null, !0)
        : m(P._vnode || null, R, P, null, null, null, B),
        Cf(),
        bl(),
        (P._vnode = R);
    },
    U = { p: m, um: H, m: X, r: se, mt: L, mc: T, pc: oe, pbc: C, n: N, o: e };
  let he, Le;
  return (
    t && ([he, Le] = t(U)), { render: ae, hydrate: he, createApp: mb(ae, he) }
  );
}
function Ur({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Cc(e, t, n = !1) {
  const r = e.children,
    o = t.children;
  if (Te(r) && Te(o))
    for (let a = 0; a < r.length; a++) {
      const i = r[a];
      let l = o[a];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = o[a] = Cr(o[a])), (l.el = i.el)),
        n || Cc(i, l)),
        l.type === mo && (l.el = i.el);
    }
}
function Eb(e) {
  const t = e.slice(),
    n = [0];
  let r, o, a, i, l;
  const s = e.length;
  for (r = 0; r < s; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((o = n[n.length - 1]), e[o] < u)) {
        (t[r] = o), n.push(r);
        continue;
      }
      for (a = 0, i = n.length - 1; a < i; )
        (l = (a + i) >> 1), e[n[l]] < u ? (a = l + 1) : (i = l);
      u < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), (n[a] = r));
    }
  }
  for (a = n.length, i = n[a - 1]; a-- > 0; ) (n[a] = i), (i = t[i]);
  return n;
}
const Cb = (e) => e.__isTeleport,
  Bi = (e) => e && (e.disabled || e.disabled === ""),
  Ff = (e) => typeof SVGElement != "undefined" && e instanceof SVGElement,
  gu = (e, t) => {
    const n = e && e.to;
    return Ct(n) ? (t ? t(n) : null) : n;
  },
  Ob = {
    __isTeleport: !0,
    process(e, t, n, r, o, a, i, l, s, u) {
      const {
          mc: c,
          pc: f,
          pbc: d,
          o: { insert: h, querySelector: v, createText: m, createComment: g },
        } = u,
        y = Bi(t.props);
      let { shapeFlag: p, children: w, dynamicChildren: b } = t;
      if (e == null) {
        const S = (t.el = m("")),
          E = (t.anchor = m(""));
        h(S, n, r), h(E, n, r);
        const A = (t.target = gu(t.props, v)),
          T = (t.targetAnchor = m(""));
        A && (h(T, A), (i = i || Ff(A)));
        const x = (C, D) => {
          p & 16 && c(w, C, D, o, a, i, l, s);
        };
        y ? x(n, E) : A && x(A, T);
      } else {
        t.el = e.el;
        const S = (t.anchor = e.anchor),
          E = (t.target = e.target),
          A = (t.targetAnchor = e.targetAnchor),
          T = Bi(e.props),
          x = T ? n : E,
          C = T ? S : A;
        if (
          ((i = i || Ff(E)),
          b
            ? (d(e.dynamicChildren, b, x, o, a, i, l), Cc(e, t, !0))
            : s || f(e, t, x, C, o, a, i, l, !1),
          y)
        )
          T || Ba(t, n, S, u, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const D = (t.target = gu(t.props, v));
          D && Ba(t, D, null, u, 0);
        } else T && Ba(t, E, A, u, 1);
      }
      Mv(t);
    },
    remove(e, t, n, r, { um: o, o: { remove: a } }, i) {
      const {
        shapeFlag: l,
        children: s,
        anchor: u,
        targetAnchor: c,
        target: f,
        props: d,
      } = e;
      if ((f && a(c), (i || !Bi(d)) && (a(u), l & 16)))
        for (let h = 0; h < s.length; h++) {
          const v = s[h];
          o(v, t, n, !0, !!v.dynamicChildren);
        }
    },
    move: Ba,
    hydrate: Tb,
  };
function Ba(e, t, n, { o: { insert: r }, m: o }, a = 2) {
  a === 0 && r(e.targetAnchor, t, n);
  const { el: i, anchor: l, shapeFlag: s, children: u, props: c } = e,
    f = a === 2;
  if ((f && r(i, t, n), (!f || Bi(c)) && s & 16))
    for (let d = 0; d < u.length; d++) o(u[d], t, n, 2);
  f && r(l, t, n);
}
function Tb(
  e,
  t,
  n,
  r,
  o,
  a,
  { o: { nextSibling: i, parentNode: l, querySelector: s } },
  u
) {
  const c = (t.target = gu(t.props, s));
  if (c) {
    const f = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (Bi(t.props))
        (t.anchor = u(i(e), t, l(e), n, r, o, a)), (t.targetAnchor = f);
      else {
        t.anchor = i(e);
        let d = f;
        for (; d; )
          if (
            ((d = i(d)), d && d.nodeType === 8 && d.data === "teleport anchor")
          ) {
            (t.targetAnchor = d),
              (c._lpa = t.targetAnchor && i(t.targetAnchor));
            break;
          }
        u(f, t, c, n, r, o, a);
      }
    Mv(t);
  }
  return t.anchor && i(t.anchor);
}
const Dv = Ob;
function Mv(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
        (n = n.nextSibling);
    t.ut();
  }
}
const jt = Symbol.for("v-fgt"),
  mo = Symbol.for("v-txt"),
  tn = Symbol.for("v-cmt"),
  so = Symbol.for("v-stc"),
  ji = [];
let fn = null;
function lt(e = !1) {
  ji.push((fn = e ? null : []));
}
function $v() {
  ji.pop(), (fn = ji[ji.length - 1] || null);
}
let go = 1;
function yu(e) {
  go += e;
}
function Fv(e) {
  return (
    (e.dynamicChildren = go > 0 ? fn || qo : null),
    $v(),
    go > 0 && fn && fn.push(e),
    e
  );
}
function kr(e, t, n, r, o, a) {
  return Fv(et(e, t, n, r, o, a, !0));
}
function It(e, t, n, r, o) {
  return Fv(M(e, t, n, r, o, !0));
}
function Fr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Vn(e, t) {
  return e.type === t.type && e.key === t.key;
}
function Pb(e) {}
const ts = "__vInternal",
  Nv = ({ key: e }) => (e != null ? e : null),
  tl = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? Ct(e) || Et(e) || je(e)
        ? { i: zt, r: e, k: t, f: !!n }
        : e
      : null
  );
function et(
  e,
  t = null,
  n = null,
  r = 0,
  o = null,
  a = e === jt ? 0 : 1,
  i = !1,
  l = !1
) {
  const s = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Nv(t),
    ref: t && tl(t),
    scopeId: Yl,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: zt,
  };
  return (
    l
      ? (Oc(s, n), a & 128 && e.normalize(s))
      : n && (s.shapeFlag |= Ct(n) ? 8 : 16),
    go > 0 &&
      !i &&
      fn &&
      (s.patchFlag > 0 || a & 6) &&
      s.patchFlag !== 32 &&
      fn.push(s),
    s
  );
}
const M = Rb;
function Rb(e, t = null, n = null, r = 0, o = null, a = !1) {
  if (((!e || e === yv) && (e = tn), Fr(e))) {
    const l = Zn(e, t, !0);
    return (
      n && Oc(l, n),
      go > 0 &&
        !a &&
        fn &&
        (l.shapeFlag & 6 ? (fn[fn.indexOf(e)] = l) : fn.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Fb(e) && (e = e.__vccOpts), t)) {
    t = Ko(t);
    let { class: l, style: s } = t;
    l && !Ct(l) && (t.class = ma(l)),
      dt(s) && (cc(s) && !Te(s) && (s = gt({}, s)), (t.style = ii(s)));
  }
  const i = Ct(e) ? 1 : lv(e) ? 128 : Cb(e) ? 64 : dt(e) ? 4 : je(e) ? 2 : 0;
  return et(e, t, n, r, o, i, a, !0);
}
function Ko(e) {
  return e ? (cc(e) || ts in e ? gt({}, e) : e) : null;
}
function Zn(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: a, children: i } = e,
    l = t ? Bv(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Nv(l),
    ref:
      t && t.ref
        ? n && o
          ? Te(o)
            ? o.concat(tl(t))
            : [o, tl(t)]
          : tl(t)
        : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== jt ? (a === -1 ? 16 : a | 16) : a,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Zn(e.ssContent),
    ssFallback: e.ssFallback && Zn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Ge(e = " ", t = 0) {
  return M(mo, null, e, t);
}
function Ab(e, t) {
  const n = M(so, null, e);
  return (n.staticCount = t), n;
}
function Cn(e = "", t = !1) {
  return t ? (lt(), It(tn, null, e)) : M(tn, null, e);
}
function yn(e) {
  return e == null || typeof e == "boolean"
    ? M(tn)
    : Te(e)
    ? M(jt, null, e.slice())
    : typeof e == "object"
    ? Cr(e)
    : M(mo, null, String(e));
}
function Cr(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Zn(e);
}
function Oc(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (Te(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Oc(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(ts in t)
        ? (t._ctx = zt)
        : o === 3 &&
          zt &&
          (zt.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    je(t)
      ? ((t = { default: t, _ctx: zt }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Ge(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Bv(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = ma([t.class, r.class]));
      else if (o === "style") t.style = ii([t.style, r.style]);
      else if (va(o)) {
        const a = t[o],
          i = r[o];
        i &&
          a !== i &&
          !(Te(a) && a.includes(i)) &&
          (t[o] = a ? [].concat(a, i) : i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function un(e, t, n, r = null) {
  Sn(e, t, 7, [n, r]);
}
const Ib = Ev();
let Lb = 0;
function jv(e, t, n) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || Ib,
    a = {
      uid: Lb++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new rc(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Tv(r, o),
      emitsOptions: av(r, o),
      emit: null,
      emitted: null,
      propsDefaults: ct,
      inheritAttrs: r.inheritAttrs,
      ctx: ct,
      data: ct,
      props: ct,
      attrs: ct,
      slots: ct,
      refs: ct,
      setupState: ct,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (a.ctx = { _: a }),
    (a.root = t ? t.root : a),
    (a.emit = wy.bind(null, a)),
    e.ce && e.ce(a),
    a
  );
}
let Vt = null;
const Fe = () => Vt || zt;
let Tc,
  Po,
  Nf = "__VUE_INSTANCE_SETTERS__";
(Po = au()[Nf]) || (Po = au()[Nf] = []),
  Po.push((e) => (Vt = e)),
  (Tc = (e) => {
    Po.length > 1 ? Po.forEach((t) => t(e)) : Po[0](e);
  });
const Nr = (e) => {
    Tc(e), e.scope.on();
  },
  Dr = () => {
    Vt && Vt.scope.off(), Tc(null);
  };
function Vv(e) {
  return e.vnode.shapeFlag & 4;
}
let Yo = !1;
function qv(e, t = !1) {
  Yo = t;
  const { props: n, children: r } = e.vnode,
    o = Vv(e);
  gb(e, n, o, t), Sb(e, r);
  const a = o ? kb(e, t) : void 0;
  return (Yo = !1), a;
}
function kb(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = hr(new Proxy(e.ctx, hu)));
  const { setup: r } = n;
  if (r) {
    const o = (e.setupContext = r.length > 1 ? _v(e) : null);
    Nr(e), ai();
    const a = ur(r, e, 0, [e.props, o]);
    if ((li(), Dr(), tc(a))) {
      if ((a.then(Dr, Dr), t))
        return a
          .then((i) => {
            bu(e, i, t);
          })
          .catch((i) => {
            So(i, e, 0);
          });
      e.asyncDep = a;
    } else bu(e, a, t);
  } else Hv(e, t);
}
function bu(e, t, n) {
  je(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : dt(t) && (e.setupState = hc(t)),
    Hv(e, n);
}
let xl, Su;
function Db(e) {
  (xl = e),
    (Su = (t) => {
      t.render._rc && (t.withProxy = new Proxy(t.ctx, Gy));
    });
}
const Mb = () => !xl;
function Hv(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && xl && !r.render) {
      const o = r.template || xc(e).template;
      if (o) {
        const { isCustomElement: a, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: s } = r,
          u = gt(gt({ isCustomElement: a, delimiters: l }, i), s);
        r.render = xl(o, u);
      }
    }
    (e.render = r.render || Hn), Su && Su(e);
  }
  Nr(e), ai(), cb(e), li(), Dr();
}
function $b(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return hn(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function _v(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return $b(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function ns(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(hc(hr(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Ni) return Ni[n](e);
        },
        has(t, n) {
          return n in t || n in Ni;
        },
      }))
    );
}
function wu(e, t = !0) {
  return je(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Fb(e) {
  return je(e) && "__vccOpts" in e;
}
const O = (e, t) => vy(e, t, Yo);
function k(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? dt(t) && !Te(t)
      ? Fr(t)
        ? M(e, null, [t])
        : M(e, t)
      : M(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && Fr(n) && (n = [n]),
      M(e, t, n));
}
const Uv = Symbol.for("v-scx"),
  zv = () => qt(Uv);
function Nb() {}
function Bb(e, t, n, r) {
  const o = n[r];
  if (o && Kv(o, e)) return o;
  const a = t();
  return (a.memo = e.slice()), (n[r] = a);
}
function Kv(e, t) {
  const n = e.memo;
  if (n.length != t.length) return !1;
  for (let r = 0; r < n.length; r++) if (Go(n[r], t[r])) return !1;
  return go > 0 && fn && fn.push(e), !0;
}
const Wv = "3.3.4",
  jb = {
    createComponentInstance: jv,
    setupComponent: qv,
    renderComponentRoot: el,
    setCurrentRenderingInstance: ra,
    isVNode: Fr,
    normalizeVNode: yn,
  },
  Vb = jb,
  qb = null,
  Hb = null,
  _b = "http://www.w3.org/2000/svg",
  Jr = typeof document != "undefined" ? document : null,
  Bf = Jr && Jr.createElement("template"),
  Ub = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const o = t
        ? Jr.createElementNS(_b, e)
        : Jr.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          o.setAttribute("multiple", r.multiple),
        o
      );
    },
    createText: (e) => Jr.createTextNode(e),
    createComment: (e) => Jr.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Jr.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, o, a) {
      const i = n ? n.previousSibling : t.lastChild;
      if (o && (o === a || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === a || !(o = o.nextSibling));

        );
      else {
        Bf.innerHTML = r ? `<svg>${e}</svg>` : e;
        const l = Bf.content;
        if (r) {
          const s = l.firstChild;
          for (; s.firstChild; ) l.appendChild(s.firstChild);
          l.removeChild(s);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function zb(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Kb(e, t, n) {
  const r = e.style,
    o = Ct(n);
  if (n && !o) {
    if (t && !Ct(t)) for (const a in t) n[a] == null && xu(r, a, "");
    for (const a in n) xu(r, a, n[a]);
  } else {
    const a = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = a);
  }
}
const jf = /\s*!important$/;
function xu(e, t, n) {
  if (Te(n)) n.forEach((r) => xu(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Wb(e, t);
    jf.test(n)
      ? e.setProperty(On(r), n.replace(jf, ""), "important")
      : (e[r] = n);
  }
}
const Vf = ["Webkit", "Moz", "ms"],
  Es = {};
function Wb(e, t) {
  const n = Es[t];
  if (n) return n;
  let r = dn(t);
  if (r !== "filter" && r in e) return (Es[t] = r);
  r = pa(r);
  for (let o = 0; o < Vf.length; o++) {
    const a = Vf[o] + r;
    if (a in e) return (Es[t] = a);
  }
  return t;
}
const qf = "http://www.w3.org/1999/xlink";
function Qb(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(qf, t.slice(6, t.length))
      : e.setAttributeNS(qf, t, n);
  else {
    const a = Tg(t);
    n == null || (a && !$h(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, a ? "" : n);
  }
}
function Gb(e, t, n, r, o, a, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, o, a), (e[t] = n == null ? "" : n);
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const u = l === "OPTION" ? e.getAttribute("value") : e.value,
      c = n == null ? "" : n;
    u !== c && (e.value = c), n == null && e.removeAttribute(t);
    return;
  }
  let s = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean"
      ? (n = $h(n))
      : n == null && u === "string"
      ? ((n = ""), (s = !0))
      : u === "number" && ((n = 0), (s = !0));
  }
  try {
    e[t] = n;
  } catch {}
  s && e.removeAttribute(t);
}
function ar(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Xb(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Yb(e, t, n, r, o = null) {
  const a = e._vei || (e._vei = {}),
    i = a[t];
  if (r && i) i.value = r;
  else {
    const [l, s] = Jb(t);
    if (r) {
      const u = (a[t] = t0(r, o));
      ar(e, l, u, s);
    } else i && (Xb(e, l, i, s), (a[t] = void 0));
  }
}
const Hf = /(?:Once|Passive|Capture)$/;
function Jb(e) {
  let t;
  if (Hf.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Hf)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : On(e.slice(2)), t];
}
let Cs = 0;
const Zb = Promise.resolve(),
  e0 = () => Cs || (Zb.then(() => (Cs = 0)), (Cs = Date.now()));
function t0(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Sn(n0(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = e0()), n;
}
function n0(e, t) {
  if (Te(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (o) => !o._stopped && r && r(o))
    );
  } else return t;
}
const _f = /^on[a-z]/,
  r0 = (e, t, n, r, o = !1, a, i, l, s) => {
    t === "class"
      ? zb(e, r, o)
      : t === "style"
      ? Kb(e, n, r)
      : va(t)
      ? Zu(t) || Yb(e, t, n, r, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : o0(e, t, r, o)
        )
      ? Gb(e, t, r, a, i, l, s)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        Qb(e, t, r, o));
  };
function o0(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && _f.test(t) && je(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (_f.test(t) && Ct(n))
    ? !1
    : t in e;
}
function Qv(e, t) {
  const n = zn(e);
  class r extends rs {
    constructor(a) {
      super(n, a, t);
    }
  }
  return (r.def = n), r;
}
const i0 = (e) => Qv(e, fp),
  a0 = typeof HTMLElement != "undefined" ? HTMLElement : class {};
class rs extends a0 {
  constructor(t, n = {}, r) {
    super(),
      (this._def = t),
      (this._props = n),
      (this._instance = null),
      (this._connected = !1),
      (this._resolved = !1),
      (this._numberProps = null),
      this.shadowRoot && r
        ? r(this._createVNode(), this.shadowRoot)
        : (this.attachShadow({ mode: "open" }),
          this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    (this._connected = !0),
      this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    (this._connected = !1),
      at(() => {
        this._connected || (Ou(null, this.shadowRoot), (this._instance = null));
      });
  }
  _resolveDef() {
    this._resolved = !0;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    new MutationObserver((r) => {
      for (const o of r) this._setAttr(o.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (r, o = !1) => {
        const { props: a, styles: i } = r;
        let l;
        if (a && !Te(a))
          for (const s in a) {
            const u = a[s];
            (u === Number || (u && u.type === Number)) &&
              (s in this._props && (this._props[s] = gl(this._props[s])),
              ((l || (l = Object.create(null)))[dn(s)] = !0));
          }
        (this._numberProps = l),
          o && this._resolveProps(r),
          this._applyStyles(i),
          this._update();
      },
      n = this._def.__asyncLoader;
    n ? n().then((r) => t(r, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t,
      r = Te(n) ? n : Object.keys(n || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && r.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of r.map(dn))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(a) {
          this._setProp(o, a);
        },
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const r = dn(t);
    this._numberProps && this._numberProps[r] && (n = gl(n)),
      this._setProp(r, n, !1);
  }
  _getProp(t) {
    return this._props[t];
  }
  _setProp(t, n, r = !0, o = !0) {
    n !== this._props[t] &&
      ((this._props[t] = n),
      o && this._instance && this._update(),
      r &&
        (n === !0
          ? this.setAttribute(On(t), "")
          : typeof n == "string" || typeof n == "number"
          ? this.setAttribute(On(t), n + "")
          : n || this.removeAttribute(On(t))));
  }
  _update() {
    Ou(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = M(this._def, gt({}, this._props));
    return (
      this._instance ||
        (t.ce = (n) => {
          (this._instance = n), (n.isCE = !0);
          const r = (a, i) => {
            this.dispatchEvent(new CustomEvent(a, { detail: i }));
          };
          n.emit = (a, ...i) => {
            r(a, i), On(a) !== a && r(On(a), i);
          };
          let o = this;
          for (; (o = o && (o.parentNode || o.host)); )
            if (o instanceof rs) {
              (n.parent = o._instance), (n.provides = o._instance.provides);
              break;
            }
        }),
      t
    );
  }
  _applyStyles(t) {
    t &&
      t.forEach((n) => {
        const r = document.createElement("style");
        (r.textContent = n), this.shadowRoot.appendChild(r);
      });
  }
}
function l0(e = "$style") {
  {
    const t = Fe();
    if (!t) return ct;
    const n = t.type.__cssModules;
    if (!n) return ct;
    const r = n[e];
    return r || ct;
  }
}
function s0(e) {
  const t = Fe();
  if (!t) return;
  const n = (t.ut = (o = e(t.proxy)) => {
      Array.from(
        document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
      ).forEach((a) => Cu(a, o));
    }),
    r = () => {
      const o = e(t.proxy);
      Eu(t.subTree, o), n(o);
    };
  uv(r),
    Ft(() => {
      const o = new MutationObserver(r);
      o.observe(t.subTree.el.parentNode, { childList: !0 }),
        ui(() => o.disconnect());
    });
}
function Eu(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    (e = n.activeBranch),
      n.pendingBranch &&
        !n.isHydrating &&
        n.effects.push(() => {
          Eu(n.activeBranch, t);
        });
  }
  for (; e.component; ) e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el) Cu(e.el, t);
  else if (e.type === jt) e.children.forEach((n) => Eu(n, t));
  else if (e.type === so) {
    let { el: n, anchor: r } = e;
    for (; n && (Cu(n, t), n !== r); ) n = n.nextSibling;
  }
}
function Cu(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const r in t) n.setProperty(`--${r}`, t[r]);
  }
}
const yr = "transition",
  vi = "animation",
  Br = (e, { slots: t }) => k(fv, Xv(e), t);
Br.displayName = "Transition";
const Gv = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  u0 = (Br.props = gt({}, bc, Gv)),
  zr = (e, t = []) => {
    Te(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Uf = (e) => (e ? (Te(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Xv(e) {
  const t = {};
  for (const I in e) I in Gv || (t[I] = e[I]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: r,
      duration: o,
      enterFromClass: a = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: s = a,
      appearActiveClass: u = i,
      appearToClass: c = l,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: d = `${n}-leave-active`,
      leaveToClass: h = `${n}-leave-to`,
    } = e,
    v = c0(o),
    m = v && v[0],
    g = v && v[1],
    {
      onBeforeEnter: y,
      onEnter: p,
      onEnterCancelled: w,
      onLeave: b,
      onLeaveCancelled: S,
      onBeforeAppear: E = y,
      onAppear: A = p,
      onAppearCancelled: T = w,
    } = t,
    x = (I, $, L) => {
      xr(I, $ ? c : l), xr(I, $ ? u : i), L && L();
    },
    C = (I, $) => {
      (I._isLeaving = !1), xr(I, f), xr(I, h), xr(I, d), $ && $();
    },
    D = (I) => ($, L) => {
      const G = I ? A : p,
        j = () => x($, I, L);
      zr(G, [$, j]),
        zf(() => {
          xr($, I ? s : a), rr($, I ? c : l), Uf(G) || Kf($, r, m, j);
        });
    };
  return gt(t, {
    onBeforeEnter(I) {
      zr(y, [I]), rr(I, a), rr(I, i);
    },
    onBeforeAppear(I) {
      zr(E, [I]), rr(I, s), rr(I, u);
    },
    onEnter: D(!1),
    onAppear: D(!0),
    onLeave(I, $) {
      I._isLeaving = !0;
      const L = () => C(I, $);
      rr(I, f),
        Jv(),
        rr(I, d),
        zf(() => {
          !I._isLeaving || (xr(I, f), rr(I, h), Uf(b) || Kf(I, r, g, L));
        }),
        zr(b, [I, L]);
    },
    onEnterCancelled(I) {
      x(I, !1), zr(w, [I]);
    },
    onAppearCancelled(I) {
      x(I, !0), zr(T, [I]);
    },
    onLeaveCancelled(I) {
      C(I), zr(S, [I]);
    },
  });
}
function c0(e) {
  if (e == null) return null;
  if (dt(e)) return [Os(e.enter), Os(e.leave)];
  {
    const t = Os(e);
    return [t, t];
  }
}
function Os(e) {
  return gl(e);
}
function rr(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function xr(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function zf(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let f0 = 0;
function Kf(e, t, n, r) {
  const o = (e._endId = ++f0),
    a = () => {
      o === e._endId && r();
    };
  if (n) return setTimeout(a, n);
  const { type: i, timeout: l, propCount: s } = Yv(e, t);
  if (!i) return r();
  const u = i + "end";
  let c = 0;
  const f = () => {
      e.removeEventListener(u, d), a();
    },
    d = (h) => {
      h.target === e && ++c >= s && f();
    };
  setTimeout(() => {
    c < s && f();
  }, l + 1),
    e.addEventListener(u, d);
}
function Yv(e, t) {
  const n = window.getComputedStyle(e),
    r = (v) => (n[v] || "").split(", "),
    o = r(`${yr}Delay`),
    a = r(`${yr}Duration`),
    i = Wf(o, a),
    l = r(`${vi}Delay`),
    s = r(`${vi}Duration`),
    u = Wf(l, s);
  let c = null,
    f = 0,
    d = 0;
  t === yr
    ? i > 0 && ((c = yr), (f = i), (d = a.length))
    : t === vi
    ? u > 0 && ((c = vi), (f = u), (d = s.length))
    : ((f = Math.max(i, u)),
      (c = f > 0 ? (i > u ? yr : vi) : null),
      (d = c ? (c === yr ? a.length : s.length) : 0));
  const h =
    c === yr && /\b(transform|all)(,|$)/.test(r(`${yr}Property`).toString());
  return { type: c, timeout: f, propCount: d, hasTransform: h };
}
function Wf(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => Qf(n) + Qf(e[r])));
}
function Qf(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Jv() {
  return document.body.offsetHeight;
}
const Zv = new WeakMap(),
  ep = new WeakMap(),
  tp = {
    name: "TransitionGroup",
    props: gt({}, u0, { tag: String, moveClass: String }),
    setup(e, { slots: t }) {
      const n = Fe(),
        r = yc();
      let o, a;
      return (
        wa(() => {
          if (!o.length) return;
          const i = e.moveClass || `${e.name || "v"}-move`;
          if (!m0(o[0].el, n.vnode.el, i)) return;
          o.forEach(h0), o.forEach(v0);
          const l = o.filter(p0);
          Jv(),
            l.forEach((s) => {
              const u = s.el,
                c = u.style;
              rr(u, i),
                (c.transform = c.webkitTransform = c.transitionDuration = "");
              const f = (u._moveCb = (d) => {
                (d && d.target !== u) ||
                  ((!d || /transform$/.test(d.propertyName)) &&
                    (u.removeEventListener("transitionend", f),
                    (u._moveCb = null),
                    xr(u, i)));
              });
              u.addEventListener("transitionend", f);
            });
        }),
        () => {
          const i = He(e),
            l = Xv(i);
          let s = i.tag || jt;
          (o = a), (a = t.default ? Jl(t.default()) : []);
          for (let u = 0; u < a.length; u++) {
            const c = a[u];
            c.key != null && po(c, Xo(c, l, r, n));
          }
          if (o)
            for (let u = 0; u < o.length; u++) {
              const c = o[u];
              po(c, Xo(c, l, r, n)), Zv.set(c, c.el.getBoundingClientRect());
            }
          return M(s, null, a);
        }
      );
    },
  },
  d0 = (e) => delete e.mode;
tp.props;
const np = tp;
function h0(e) {
  const t = e.el;
  t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
}
function v0(e) {
  ep.set(e, e.el.getBoundingClientRect());
}
function p0(e) {
  const t = Zv.get(e),
    n = ep.get(e),
    r = t.left - n.left,
    o = t.top - n.top;
  if (r || o) {
    const a = e.el.style;
    return (
      (a.transform = a.webkitTransform = `translate(${r}px,${o}px)`),
      (a.transitionDuration = "0s"),
      e
    );
  }
}
function m0(e, t, n) {
  const r = e.cloneNode();
  e._vtc &&
    e._vtc.forEach((i) => {
      i.split(/\s+/).forEach((l) => l && r.classList.remove(l));
    }),
    n.split(/\s+/).forEach((i) => i && r.classList.add(i)),
    (r.style.display = "none");
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(r);
  const { hasTransform: a } = Yv(r);
  return o.removeChild(r), a;
}
const jr = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return Te(t) ? (n) => _o(t, n) : t;
};
function g0(e) {
  e.target.composing = !0;
}
function Gf(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const El = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, o) {
      e._assign = jr(o);
      const a = r || (o.props && o.props.type === "number");
      ar(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let l = e.value;
        n && (l = l.trim()), a && (l = ml(l)), e._assign(l);
      }),
        n &&
          ar(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (ar(e, "compositionstart", g0),
          ar(e, "compositionend", Gf),
          ar(e, "change", Gf));
    },
    mounted(e, { value: t }) {
      e.value = t == null ? "" : t;
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: r, number: o } },
      a
    ) {
      if (
        ((e._assign = jr(a)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (r && e.value.trim() === t) ||
              ((o || e.type === "number") && ml(e.value) === t))))
      )
        return;
      const i = t == null ? "" : t;
      e.value !== i && (e.value = i);
    },
  },
  Pc = {
    deep: !0,
    created(e, t, n) {
      (e._assign = jr(n)),
        ar(e, "change", () => {
          const r = e._modelValue,
            o = Jo(e),
            a = e.checked,
            i = e._assign;
          if (Te(r)) {
            const l = _l(r, o),
              s = l !== -1;
            if (a && !s) i(r.concat(o));
            else if (!a && s) {
              const u = [...r];
              u.splice(l, 1), i(u);
            }
          } else if (bo(r)) {
            const l = new Set(r);
            a ? l.add(o) : l.delete(o), i(l);
          } else i(op(e, a));
        });
    },
    mounted: Xf,
    beforeUpdate(e, t, n) {
      (e._assign = jr(n)), Xf(e, t, n);
    },
  };
function Xf(e, { value: t, oldValue: n }, r) {
  (e._modelValue = t),
    Te(t)
      ? (e.checked = _l(t, r.props.value) > -1)
      : bo(t)
      ? (e.checked = t.has(r.props.value))
      : t !== n && (e.checked = Mr(t, op(e, !0)));
}
const Rc = {
    created(e, { value: t }, n) {
      (e.checked = Mr(t, n.props.value)),
        (e._assign = jr(n)),
        ar(e, "change", () => {
          e._assign(Jo(e));
        });
    },
    beforeUpdate(e, { value: t, oldValue: n }, r) {
      (e._assign = jr(r)), t !== n && (e.checked = Mr(t, r.props.value));
    },
  },
  rp = {
    deep: !0,
    created(e, { value: t, modifiers: { number: n } }, r) {
      const o = bo(t);
      ar(e, "change", () => {
        const a = Array.prototype.filter
          .call(e.options, (i) => i.selected)
          .map((i) => (n ? ml(Jo(i)) : Jo(i)));
        e._assign(e.multiple ? (o ? new Set(a) : a) : a[0]);
      }),
        (e._assign = jr(r));
    },
    mounted(e, { value: t }) {
      Yf(e, t);
    },
    beforeUpdate(e, t, n) {
      e._assign = jr(n);
    },
    updated(e, { value: t }) {
      Yf(e, t);
    },
  };
function Yf(e, t) {
  const n = e.multiple;
  if (!(n && !Te(t) && !bo(t))) {
    for (let r = 0, o = e.options.length; r < o; r++) {
      const a = e.options[r],
        i = Jo(a);
      if (n) Te(t) ? (a.selected = _l(t, i) > -1) : (a.selected = t.has(i));
      else if (Mr(Jo(a), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Jo(e) {
  return "_value" in e ? e._value : e.value;
}
function op(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const ip = {
  created(e, t, n) {
    ja(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    ja(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, r) {
    ja(e, t, n, r, "beforeUpdate");
  },
  updated(e, t, n, r) {
    ja(e, t, n, r, "updated");
  },
};
function ap(e, t) {
  switch (e) {
    case "SELECT":
      return rp;
    case "TEXTAREA":
      return El;
    default:
      switch (t) {
        case "checkbox":
          return Pc;
        case "radio":
          return Rc;
        default:
          return El;
      }
  }
}
function ja(e, t, n, r, o) {
  const i = ap(e.tagName, n.props && n.props.type)[o];
  i && i(e, t, n, r);
}
function y0() {
  (El.getSSRProps = ({ value: e }) => ({ value: e })),
    (Rc.getSSRProps = ({ value: e }, t) => {
      if (t.props && Mr(t.props.value, e)) return { checked: !0 };
    }),
    (Pc.getSSRProps = ({ value: e }, t) => {
      if (Te(e)) {
        if (t.props && _l(e, t.props.value) > -1) return { checked: !0 };
      } else if (bo(e)) {
        if (t.props && e.has(t.props.value)) return { checked: !0 };
      } else if (e) return { checked: !0 };
    }),
    (ip.getSSRProps = (e, t) => {
      if (typeof t.type != "string") return;
      const n = ap(t.type.toUpperCase(), t.props && t.props.type);
      if (n.getSSRProps) return n.getSSRProps(e, t);
    });
}
const b0 = ["ctrl", "shift", "alt", "meta"],
  S0 = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => b0.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  w0 =
    (e, t) =>
    (n, ...r) => {
      for (let o = 0; o < t.length; o++) {
        const a = S0[t[o]];
        if (a && a(n, t)) return;
      }
      return e(n, ...r);
    },
  x0 = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  E0 = (e, t) => (n) => {
    if (!("key" in n)) return;
    const r = On(n.key);
    if (t.some((o) => o === r || x0[o] === r)) return e(n);
  },
  lp = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e._vod = e.style.display === "none" ? "" : e.style.display),
        n && t ? n.beforeEnter(e) : pi(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), pi(e, !0), r.enter(e))
            : r.leave(e, () => {
                pi(e, !1);
              })
          : pi(e, t));
    },
    beforeUnmount(e, { value: t }) {
      pi(e, t);
    },
  };
function pi(e, t) {
  e.style.display = t ? e._vod : "none";
}
function C0() {
  lp.getSSRProps = ({ value: e }) => {
    if (!e) return { style: { display: "none" } };
  };
}
const sp = gt({ patchProp: r0 }, Ub);
let Vi,
  Jf = !1;
function up() {
  return Vi || (Vi = Iv(sp));
}
function cp() {
  return (Vi = Jf ? Vi : Lv(sp)), (Jf = !0), Vi;
}
const Ou = (...e) => {
    up().render(...e);
  },
  fp = (...e) => {
    cp().hydrate(...e);
  },
  Ac = (...e) => {
    const t = up().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const o = dp(r);
        if (!o) return;
        const a = t._component;
        !je(a) && !a.render && !a.template && (a.template = o.innerHTML),
          (o.innerHTML = "");
        const i = n(o, !1, o instanceof SVGElement);
        return (
          o instanceof Element &&
            (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
          i
        );
      }),
      t
    );
  },
  O0 = (...e) => {
    const t = cp().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const o = dp(r);
        if (o) return n(o, !0, o instanceof SVGElement);
      }),
      t
    );
  };
function dp(e) {
  return Ct(e) ? document.querySelector(e) : e;
}
let Zf = !1;
const T0 = () => {
    Zf || ((Zf = !0), y0(), C0());
  },
  P0 = () => {};
var R0 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      compile: P0,
      EffectScope: rc,
      ReactiveEffect: ga,
      customRef: cy,
      effect: Ig,
      effectScope: oc,
      getCurrentScope: ic,
      isProxy: cc,
      isReactive: Yn,
      isReadonly: vo,
      isRef: Et,
      isShallow: Zi,
      markRaw: hr,
      onScopeDispose: Bh,
      proxyRefs: hc,
      reactive: Pn,
      readonly: uc,
      ref: fe,
      shallowReactive: sc,
      shallowReadonly: oy,
      shallowRef: Yh,
      stop: Lg,
      toRaw: He,
      toRef: ev,
      toRefs: Zh,
      toValue: ly,
      triggerRef: ay,
      unref: sr,
      camelize: dn,
      capitalize: pa,
      normalizeClass: ma,
      normalizeProps: Fi,
      normalizeStyle: ii,
      toDisplayString: tt,
      toHandlerKey: $i,
      BaseTransition: fv,
      BaseTransitionPropsValidators: bc,
      Comment: tn,
      Fragment: jt,
      KeepAlive: Hy,
      Static: so,
      Suspense: Iy,
      Teleport: Dv,
      Text: mo,
      assertNumber: my,
      callWithAsyncErrorHandling: Sn,
      callWithErrorHandling: ur,
      cloneVNode: Zn,
      compatUtils: Hb,
      computed: O,
      createBlock: It,
      createCommentVNode: Cn,
      createElementBlock: kr,
      createElementVNode: et,
      createHydrationRenderer: Lv,
      createPropsRestProxy: sb,
      createRenderer: Iv,
      createSlots: bv,
      createStaticVNode: Ab,
      createTextVNode: Ge,
      createVNode: M,
      defineAsyncComponent: Vy,
      defineComponent: zn,
      defineEmits: Yy,
      defineExpose: Jy,
      defineModel: tb,
      defineOptions: Zy,
      defineProps: Xy,
      defineSlots: eb,
      get devtools() {
        return $o;
      },
      getCurrentInstance: Fe,
      getTransitionRawChildren: Jl,
      guardReactiveProps: Ko,
      h: k,
      handleError: So,
      hasInjectionContext: Cv,
      initCustomFormatter: Nb,
      inject: qt,
      isMemoSame: Kv,
      isRuntimeOnly: Mb,
      isVNode: Fr,
      mergeDefaults: ab,
      mergeModels: lb,
      mergeProps: Bv,
      nextTick: at,
      onActivated: si,
      onBeforeMount: Sa,
      onBeforeUnmount: vt,
      onBeforeUpdate: es,
      onDeactivated: qr,
      onErrorCaptured: gv,
      onMounted: Ft,
      onRenderTracked: mv,
      onRenderTriggered: pv,
      onServerPrefetch: vv,
      onUnmounted: ui,
      onUpdated: wa,
      openBlock: lt,
      popScopeId: Ey,
      provide: Lr,
      pushScopeId: xy,
      queuePostFlushCb: pc,
      registerRuntimeCompiler: Db,
      renderList: fu,
      renderSlot: Wy,
      resolveComponent: ia,
      resolveDirective: Ky,
      resolveDynamicComponent: zy,
      resolveFilter: qb,
      resolveTransitionHooks: Xo,
      setBlockTracking: yu,
      setDevtoolsHook: iv,
      setTransitionHooks: po,
      ssrContextKey: Uv,
      ssrUtils: Vb,
      toHandlers: Qy,
      transformVNodeArgs: Pb,
      useAttrs: ob,
      useModel: ib,
      useSSRContext: zv,
      useSlots: rb,
      useTransitionState: yc,
      version: Wv,
      warn: py,
      watch: me,
      watchEffect: Fy,
      watchPostEffect: uv,
      watchSyncEffect: Ny,
      withAsyncContext: ub,
      withCtx: z,
      withDefaults: nb,
      withDirectives: St,
      withMemo: Bb,
      withScopeId: Cy,
      Transition: Br,
      TransitionGroup: np,
      VueElement: rs,
      createApp: Ac,
      createSSRApp: O0,
      defineCustomElement: Qv,
      defineSSRCustomElement: i0,
      hydrate: fp,
      initDirectivesForSSR: T0,
      render: Ou,
      useCssModule: l0,
      useCssVars: s0,
      vModelCheckbox: Pc,
      vModelDynamic: ip,
      vModelRadio: Rc,
      vModelSelect: rp,
      vModelText: El,
      vShow: lp,
      withKeys: E0,
      withModifiers: w0,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
function Tn(e, t, n, r) {
  return Object.defineProperty(e, t, { get: n, set: r, enumerable: !0 }), e;
}
function A0(e, t) {
  for (const n in t) Tn(e, n, t[n]);
  return e;
}
const _n = fe(!1);
let os;
function I0(e, t) {
  const n =
    /(edg|edge|edga|edgios)\/([\w.]+)/.exec(e) ||
    /(opr)[\/]([\w.]+)/.exec(e) ||
    /(vivaldi)[\/]([\w.]+)/.exec(e) ||
    /(chrome|crios)[\/]([\w.]+)/.exec(e) ||
    /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) ||
    /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(
      e
    ) ||
    /(firefox|fxios)[\/]([\w.]+)/.exec(e) ||
    /(webkit)[\/]([\w.]+)/.exec(e) ||
    /(opera)(?:.*version|)[\/]([\w.]+)/.exec(e) ||
    [];
  return {
    browser: n[5] || n[3] || n[1] || "",
    version: n[2] || n[4] || "0",
    versionNumber: n[4] || n[2] || "0",
    platform: t[0] || "",
  };
}
function L0(e) {
  return (
    /(ipad)/.exec(e) ||
    /(ipod)/.exec(e) ||
    /(windows phone)/.exec(e) ||
    /(iphone)/.exec(e) ||
    /(kindle)/.exec(e) ||
    /(silk)/.exec(e) ||
    /(android)/.exec(e) ||
    /(win)/.exec(e) ||
    /(mac)/.exec(e) ||
    /(linux)/.exec(e) ||
    /(cros)/.exec(e) ||
    /(playbook)/.exec(e) ||
    /(bb)/.exec(e) ||
    /(blackberry)/.exec(e) ||
    []
  );
}
const hp = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function k0(e) {
  (os = { is: { ...e } }), delete e.mac, delete e.desktop;
  const t =
    Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
  Object.assign(e, { mobile: !0, ios: !0, platform: t, [t]: !0 });
}
function D0(e) {
  const t = e.toLowerCase(),
    n = L0(t),
    r = I0(t, n),
    o = {};
  r.browser &&
    ((o[r.browser] = !0),
    (o.version = r.version),
    (o.versionNumber = parseInt(r.versionNumber, 10))),
    r.platform && (o[r.platform] = !0);
  const a =
    o.android ||
    o.ios ||
    o.bb ||
    o.blackberry ||
    o.ipad ||
    o.iphone ||
    o.ipod ||
    o.kindle ||
    o.playbook ||
    o.silk ||
    o["windows phone"];
  return (
    a === !0 || t.indexOf("mobile") > -1
      ? ((o.mobile = !0),
        o.edga || o.edgios
          ? ((o.edge = !0), (r.browser = "edge"))
          : o.crios
          ? ((o.chrome = !0), (r.browser = "chrome"))
          : o.fxios && ((o.firefox = !0), (r.browser = "firefox")))
      : (o.desktop = !0),
    (o.ipod || o.ipad || o.iphone) && (o.ios = !0),
    o["windows phone"] && ((o.winphone = !0), delete o["windows phone"]),
    (o.chrome ||
      o.opr ||
      o.safari ||
      o.vivaldi ||
      (o.mobile === !0 && o.ios !== !0 && a !== !0)) &&
      (o.webkit = !0),
    o.edg && ((r.browser = "edgechromium"), (o.edgeChromium = !0)),
    ((o.safari && o.blackberry) || o.bb) &&
      ((r.browser = "blackberry"), (o.blackberry = !0)),
    o.safari && o.playbook && ((r.browser = "playbook"), (o.playbook = !0)),
    o.opr && ((r.browser = "opera"), (o.opera = !0)),
    o.safari && o.android && ((r.browser = "android"), (o.android = !0)),
    o.safari && o.kindle && ((r.browser = "kindle"), (o.kindle = !0)),
    o.safari && o.silk && ((r.browser = "silk"), (o.silk = !0)),
    o.vivaldi && ((r.browser = "vivaldi"), (o.vivaldi = !0)),
    (o.name = r.browser),
    (o.platform = r.platform),
    t.indexOf("electron") > -1
      ? (o.electron = !0)
      : document.location.href.indexOf("-extension://") > -1
      ? (o.bex = !0)
      : (window.Capacitor !== void 0
          ? ((o.capacitor = !0),
            (o.nativeMobile = !0),
            (o.nativeMobileWrapper = "capacitor"))
          : (window._cordovaNative !== void 0 || window.cordova !== void 0) &&
            ((o.cordova = !0),
            (o.nativeMobile = !0),
            (o.nativeMobileWrapper = "cordova")),
        hp === !0 &&
          o.mac === !0 &&
          ((o.desktop === !0 && o.safari === !0) ||
            (o.nativeMobile === !0 &&
              o.android !== !0 &&
              o.ios !== !0 &&
              o.ipad !== !0)) &&
          k0(o)),
    o
  );
}
const ed = navigator.userAgent || navigator.vendor || window.opera,
  M0 = { has: { touch: !1, webStorage: !1 }, within: { iframe: !1 } },
  ft = {
    userAgent: ed,
    is: D0(ed),
    has: { touch: hp },
    within: { iframe: window.self !== window.top },
  },
  Cl = {
    install(e) {
      const { $q: t } = e;
      _n.value === !0
        ? (e.onSSRHydrated.push(() => {
            Object.assign(t.platform, ft), (_n.value = !1), (os = void 0);
          }),
          (t.platform = Pn(this)))
        : (t.platform = this);
    },
  };
{
  let e;
  Tn(ft.has, "webStorage", () => {
    if (e !== void 0) return e;
    try {
      if (window.localStorage) return (e = !0), !0;
    } catch {}
    return (e = !1), !1;
  }),
    ft.is.ios === !0 && window.navigator.vendor.toLowerCase().indexOf("apple"),
    _n.value === !0 ? Object.assign(Cl, ft, os, M0) : Object.assign(Cl, ft);
}
var xa = (e, t) => {
  const n = Pn(e);
  for (const r in e)
    Tn(
      t,
      r,
      () => n[r],
      (o) => {
        n[r] = o;
      }
    );
  return t;
};
const kt = { hasPassive: !1, passiveCapture: !0, notPassiveCapture: !0 };
try {
  const e = Object.defineProperty({}, "passive", {
    get() {
      Object.assign(kt, {
        hasPassive: !0,
        passive: { passive: !0 },
        notPassive: { passive: !1 },
        passiveCapture: { passive: !0, capture: !0 },
        notPassiveCapture: { passive: !1, capture: !0 },
      });
    },
  });
  window.addEventListener("qtest", null, e),
    window.removeEventListener("qtest", null, e);
} catch {}
function en() {}
function $0(e) {
  return e.button === 0;
}
function sa(e) {
  return (
    e.touches && e.touches[0]
      ? (e = e.touches[0])
      : e.changedTouches && e.changedTouches[0]
      ? (e = e.changedTouches[0])
      : e.targetTouches && e.targetTouches[0] && (e = e.targetTouches[0]),
    { top: e.clientY, left: e.clientX }
  );
}
function F0(e) {
  if (e.path) return e.path;
  if (e.composedPath) return e.composedPath();
  const t = [];
  let n = e.target;
  for (; n; ) {
    if ((t.push(n), n.tagName === "HTML"))
      return t.push(document), t.push(window), t;
    n = n.parentElement;
  }
}
function bn(e) {
  e.stopPropagation();
}
function an(e) {
  e.cancelable !== !1 && e.preventDefault();
}
function Dt(e) {
  e.cancelable !== !1 && e.preventDefault(), e.stopPropagation();
}
function Ts(e, t) {
  if (e === void 0 || (t === !0 && e.__dragPrevented === !0)) return;
  const n =
    t === !0
      ? (r) => {
          (r.__dragPrevented = !0),
            r.addEventListener("dragstart", an, kt.notPassiveCapture);
        }
      : (r) => {
          delete r.__dragPrevented,
            r.removeEventListener("dragstart", an, kt.notPassiveCapture);
        };
  e.querySelectorAll("a, img").forEach(n);
}
function ro(e, t, n) {
  const r = `__q_${t}_evt`;
  (e[r] = e[r] !== void 0 ? e[r].concat(n) : n),
    n.forEach((o) => {
      o[0].addEventListener(o[1], e[o[2]], kt[o[3]]);
    });
}
function qi(e, t) {
  const n = `__q_${t}_evt`;
  e[n] !== void 0 &&
    (e[n].forEach((r) => {
      r[0].removeEventListener(r[1], e[r[2]], kt[r[3]]);
    }),
    (e[n] = void 0));
}
function Ic(e, t = 250, n) {
  let r = null;
  function o() {
    const a = arguments,
      i = () => {
        (r = null), n !== !0 && e.apply(this, a);
      };
    r !== null ? clearTimeout(r) : n === !0 && e.apply(this, a),
      (r = setTimeout(i, t));
  }
  return (
    (o.cancel = () => {
      r !== null && clearTimeout(r);
    }),
    o
  );
}
const Ps = ["sm", "md", "lg", "xl"],
  { passive: td } = kt;
var N0 = xa(
  {
    width: 0,
    height: 0,
    name: "xs",
    sizes: { sm: 600, md: 1024, lg: 1440, xl: 1920 },
    lt: { sm: !0, md: !0, lg: !0, xl: !0 },
    gt: { xs: !1, sm: !1, md: !1, lg: !1 },
    xs: !0,
    sm: !1,
    md: !1,
    lg: !1,
    xl: !1,
  },
  {
    setSizes: en,
    setDebounce: en,
    install({ $q: e, onSSRHydrated: t }) {
      if (((e.screen = this), this.__installed === !0)) {
        e.config.screen !== void 0 &&
          (e.config.screen.bodyClasses === !1
            ? document.body.classList.remove(`screen--${this.name}`)
            : this.__update(!0));
        return;
      }
      const { visualViewport: n } = window,
        r = n || window,
        o = document.scrollingElement || document.documentElement,
        a =
          n === void 0 || ft.is.mobile === !0
            ? () => [
                Math.max(window.innerWidth, o.clientWidth),
                Math.max(window.innerHeight, o.clientHeight),
              ]
            : () => [
                n.width * n.scale + window.innerWidth - o.clientWidth,
                n.height * n.scale + window.innerHeight - o.clientHeight,
              ],
        i = e.config.screen !== void 0 && e.config.screen.bodyClasses === !0;
      this.__update = (f) => {
        const [d, h] = a();
        if ((h !== this.height && (this.height = h), d !== this.width))
          this.width = d;
        else if (f !== !0) return;
        let v = this.sizes;
        (this.gt.xs = d >= v.sm),
          (this.gt.sm = d >= v.md),
          (this.gt.md = d >= v.lg),
          (this.gt.lg = d >= v.xl),
          (this.lt.sm = d < v.sm),
          (this.lt.md = d < v.md),
          (this.lt.lg = d < v.lg),
          (this.lt.xl = d < v.xl),
          (this.xs = this.lt.sm),
          (this.sm = this.gt.xs === !0 && this.lt.md === !0),
          (this.md = this.gt.sm === !0 && this.lt.lg === !0),
          (this.lg = this.gt.md === !0 && this.lt.xl === !0),
          (this.xl = this.gt.lg),
          (v =
            (this.xs === !0 && "xs") ||
            (this.sm === !0 && "sm") ||
            (this.md === !0 && "md") ||
            (this.lg === !0 && "lg") ||
            "xl"),
          v !== this.name &&
            (i === !0 &&
              (document.body.classList.remove(`screen--${this.name}`),
              document.body.classList.add(`screen--${v}`)),
            (this.name = v));
      };
      let l,
        s = {},
        u = 16;
      (this.setSizes = (f) => {
        Ps.forEach((d) => {
          f[d] !== void 0 && (s[d] = f[d]);
        });
      }),
        (this.setDebounce = (f) => {
          u = f;
        });
      const c = () => {
        const f = getComputedStyle(document.body);
        f.getPropertyValue("--q-size-sm") &&
          Ps.forEach((d) => {
            this.sizes[d] = parseInt(f.getPropertyValue(`--q-size-${d}`), 10);
          }),
          (this.setSizes = (d) => {
            Ps.forEach((h) => {
              d[h] && (this.sizes[h] = d[h]);
            }),
              this.__update(!0);
          }),
          (this.setDebounce = (d) => {
            l !== void 0 && r.removeEventListener("resize", l, td),
              (l = d > 0 ? Ic(this.__update, d) : this.__update),
              r.addEventListener("resize", l, td);
          }),
          this.setDebounce(u),
          Object.keys(s).length !== 0
            ? (this.setSizes(s), (s = void 0))
            : this.__update(),
          i === !0 &&
            this.name === "xs" &&
            document.body.classList.add("screen--xs");
      };
      _n.value === !0 ? t.push(c) : c();
    },
  }
);
const Yt = xa(
    { isActive: !1, mode: !1 },
    {
      __media: void 0,
      set(e) {
        (Yt.mode = e),
          e === "auto"
            ? (Yt.__media === void 0 &&
                ((Yt.__media = window.matchMedia(
                  "(prefers-color-scheme: dark)"
                )),
                (Yt.__updateMedia = () => {
                  Yt.set("auto");
                }),
                Yt.__media.addListener(Yt.__updateMedia)),
              (e = Yt.__media.matches))
            : Yt.__media !== void 0 &&
              (Yt.__media.removeListener(Yt.__updateMedia),
              (Yt.__media = void 0)),
          (Yt.isActive = e === !0),
          document.body.classList.remove(
            `body--${e === !0 ? "light" : "dark"}`
          ),
          document.body.classList.add(`body--${e === !0 ? "dark" : "light"}`);
      },
      toggle() {
        Yt.set(Yt.isActive === !1);
      },
      install({ $q: e, onSSRHydrated: t, ssrContext: n }) {
        const { dark: r } = e.config;
        if (((e.dark = this), this.__installed === !0 && r === void 0)) return;
        this.isActive = r === !0;
        const o = r !== void 0 ? r : !1;
        if (_n.value === !0) {
          const a = (l) => {
              this.__fromSSR = l;
            },
            i = this.set;
          (this.set = a),
            a(o),
            t.push(() => {
              (this.set = i), this.set(this.__fromSSR);
            });
        } else this.set(o);
      },
    }
  ),
  vp = () => !0;
function B0(e) {
  return typeof e == "string" && e !== "" && e !== "/" && e !== "#/";
}
function j0(e) {
  return (
    e.startsWith("#") === !0 && (e = e.substring(1)),
    e.startsWith("/") === !1 && (e = "/" + e),
    e.endsWith("/") === !0 && (e = e.substring(0, e.length - 1)),
    "#" + e
  );
}
function V0(e) {
  if (e.backButtonExit === !1) return () => !1;
  if (e.backButtonExit === "*") return vp;
  const t = ["#/"];
  return (
    Array.isArray(e.backButtonExit) === !0 &&
      t.push(...e.backButtonExit.filter(B0).map(j0)),
    () => t.includes(window.location.hash)
  );
}
var ua = {
    __history: [],
    add: en,
    remove: en,
    install({ $q: e }) {
      if (this.__installed === !0) return;
      const { cordova: t, capacitor: n } = ft.is;
      if (t !== !0 && n !== !0) return;
      const r = e.config[t === !0 ? "cordova" : "capacitor"];
      if (
        (r !== void 0 && r.backButton === !1) ||
        (n === !0 &&
          (window.Capacitor === void 0 ||
            window.Capacitor.Plugins.App === void 0))
      )
        return;
      (this.add = (i) => {
        i.condition === void 0 && (i.condition = vp), this.__history.push(i);
      }),
        (this.remove = (i) => {
          const l = this.__history.indexOf(i);
          l >= 0 && this.__history.splice(l, 1);
        });
      const o = V0(Object.assign({ backButtonExit: !0 }, r)),
        a = () => {
          if (this.__history.length) {
            const i = this.__history[this.__history.length - 1];
            i.condition() === !0 && (this.__history.pop(), i.handler());
          } else o() === !0 ? navigator.app.exitApp() : window.history.back();
        };
      t === !0
        ? document.addEventListener("deviceready", () => {
            document.addEventListener("backbutton", a, !1);
          })
        : window.Capacitor.Plugins.App.addListener("backButton", a);
    },
  },
  nd = {
    isoName: "en-US",
    nativeName: "English (US)",
    label: {
      clear: "Clear",
      ok: "OK",
      cancel: "Cancel",
      close: "Close",
      set: "Set",
      select: "Select",
      reset: "Reset",
      remove: "Remove",
      update: "Update",
      create: "Create",
      search: "Search",
      filter: "Filter",
      refresh: "Refresh",
      expand: (e) => (e ? `Expand "${e}"` : "Expand"),
      collapse: (e) => (e ? `Collapse "${e}"` : "Collapse"),
    },
    date: {
      days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
        "_"
      ),
      daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      months:
        "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      firstDayOfWeek: 0,
      format24h: !1,
      pluralDay: "days",
    },
    table: {
      noData: "No data available",
      noResults: "No matching records found",
      loading: "Loading...",
      selectedRecords: (e) =>
        e === 1
          ? "1 record selected."
          : (e === 0 ? "No" : e) + " records selected.",
      recordsPerPage: "Records per page:",
      allRows: "All",
      pagination: (e, t, n) => e + "-" + t + " of " + n,
      columns: "Columns",
    },
    editor: {
      url: "URL",
      bold: "Bold",
      italic: "Italic",
      strikethrough: "Strikethrough",
      underline: "Underline",
      unorderedList: "Unordered List",
      orderedList: "Ordered List",
      subscript: "Subscript",
      superscript: "Superscript",
      hyperlink: "Hyperlink",
      toggleFullscreen: "Toggle Fullscreen",
      quote: "Quote",
      left: "Left align",
      center: "Center align",
      right: "Right align",
      justify: "Justify align",
      print: "Print",
      outdent: "Decrease indentation",
      indent: "Increase indentation",
      removeFormat: "Remove formatting",
      formatting: "Formatting",
      fontSize: "Font Size",
      align: "Align",
      hr: "Insert Horizontal Rule",
      undo: "Undo",
      redo: "Redo",
      heading1: "Heading 1",
      heading2: "Heading 2",
      heading3: "Heading 3",
      heading4: "Heading 4",
      heading5: "Heading 5",
      heading6: "Heading 6",
      paragraph: "Paragraph",
      code: "Code",
      size1: "Very small",
      size2: "A bit small",
      size3: "Normal",
      size4: "Medium-large",
      size5: "Big",
      size6: "Very big",
      size7: "Maximum",
      defaultFont: "Default Font",
      viewSource: "View Source",
    },
    tree: {
      noNodes: "No nodes available",
      noResults: "No matching nodes found",
    },
  };
function rd() {
  const e =
    Array.isArray(navigator.languages) === !0 &&
    navigator.languages.length !== 0
      ? navigator.languages[0]
      : navigator.language;
  if (typeof e == "string")
    return e
      .split(/[-_]/)
      .map((t, n) =>
        n === 0
          ? t.toLowerCase()
          : n > 1 || t.length < 4
          ? t.toUpperCase()
          : t[0].toUpperCase() + t.slice(1).toLowerCase()
      )
      .join("-");
}
const $n = xa(
  { __langPack: {} },
  {
    getLocale: rd,
    set(e = nd, t) {
      const n = { ...e, rtl: e.rtl === !0, getLocale: rd };
      {
        if (
          ((n.set = $n.set),
          $n.__langConfig === void 0 || $n.__langConfig.noHtmlAttrs !== !0)
        ) {
          const r = document.documentElement;
          r.setAttribute("dir", n.rtl === !0 ? "rtl" : "ltr"),
            r.setAttribute("lang", n.isoName);
        }
        Object.assign($n.__langPack, n),
          ($n.props = n),
          ($n.isoName = n.isoName),
          ($n.nativeName = n.nativeName);
      }
    },
    install({ $q: e, lang: t, ssrContext: n }) {
      (e.lang = $n.__langPack),
        ($n.__langConfig = e.config.lang),
        this.__installed === !0
          ? t !== void 0 && this.set(t)
          : this.set(t || nd);
    },
  }
);
function q0(e, t, n = document.body) {
  if (typeof e != "string")
    throw new TypeError("Expected a string as propName");
  if (typeof t != "string") throw new TypeError("Expected a string as value");
  if (!(n instanceof Element)) throw new TypeError("Expected a DOM element");
  n.style.setProperty(`--q-${e}`, t);
}
let pp = !1;
function H0(e) {
  pp = e.isComposing === !0;
}
function Lc(e) {
  return (
    pp === !0 || e !== Object(e) || e.isComposing === !0 || e.qKeyEvent === !0
  );
}
function Vr(e, t) {
  return Lc(e) === !0 ? !1 : [].concat(t).includes(e.keyCode);
}
function mp(e) {
  if (e.ios === !0) return "ios";
  if (e.android === !0) return "android";
}
function _0({ is: e, has: t, within: n }, r) {
  const o = [
    e.desktop === !0 ? "desktop" : "mobile",
    `${t.touch === !1 ? "no-" : ""}touch`,
  ];
  if (e.mobile === !0) {
    const a = mp(e);
    a !== void 0 && o.push("platform-" + a);
  }
  if (e.nativeMobile === !0) {
    const a = e.nativeMobileWrapper;
    o.push(a),
      o.push("native-mobile"),
      e.ios === !0 &&
        (r[a] === void 0 || r[a].iosStatusBarPadding !== !1) &&
        o.push("q-ios-padding");
  } else e.electron === !0 ? o.push("electron") : e.bex === !0 && o.push("bex");
  return n.iframe === !0 && o.push("within-iframe"), o;
}
function U0() {
  const { is: e } = ft,
    t = document.body.className,
    n = new Set(t.replace(/ {2}/g, " ").split(" "));
  if (os !== void 0)
    n.delete("desktop"), n.add("platform-ios"), n.add("mobile");
  else if (e.nativeMobile !== !0 && e.electron !== !0 && e.bex !== !0) {
    if (e.desktop === !0)
      n.delete("mobile"),
        n.delete("platform-ios"),
        n.delete("platform-android"),
        n.add("desktop");
    else if (e.mobile === !0) {
      n.delete("desktop"), n.add("mobile");
      const o = mp(e);
      o !== void 0
        ? (n.add(`platform-${o}`),
          n.delete(`platform-${o === "ios" ? "android" : "ios"}`))
        : (n.delete("platform-ios"), n.delete("platform-android"));
    }
  }
  ft.has.touch === !0 && (n.delete("no-touch"), n.add("touch")),
    ft.within.iframe === !0 && n.add("within-iframe");
  const r = Array.from(n).join(" ");
  t !== r && (document.body.className = r);
}
function z0(e) {
  for (const t in e) q0(t, e[t]);
}
var K0 = {
    install(e) {
      if (this.__installed !== !0) {
        if (_n.value === !0) U0();
        else {
          const { $q: t } = e;
          t.config.brand !== void 0 && z0(t.config.brand);
          const n = _0(ft, t.config);
          document.body.classList.add.apply(document.body.classList, n);
        }
        ft.is.ios === !0 && document.body.addEventListener("touchstart", en),
          window.addEventListener("keydown", H0, !0);
      }
    },
  },
  W0 = {
    name: "material-icons",
    type: {
      positive: "check_circle",
      negative: "warning",
      info: "info",
      warning: "priority_high",
    },
    arrow: {
      up: "arrow_upward",
      right: "arrow_forward",
      down: "arrow_downward",
      left: "arrow_back",
      dropdown: "arrow_drop_down",
    },
    chevron: { left: "chevron_left", right: "chevron_right" },
    colorPicker: { spectrum: "gradient", tune: "tune", palette: "style" },
    pullToRefresh: { icon: "refresh" },
    carousel: {
      left: "chevron_left",
      right: "chevron_right",
      up: "keyboard_arrow_up",
      down: "keyboard_arrow_down",
      navigationIcon: "lens",
    },
    chip: { remove: "cancel", selected: "check" },
    datetime: {
      arrowLeft: "chevron_left",
      arrowRight: "chevron_right",
      now: "access_time",
      today: "today",
    },
    editor: {
      bold: "format_bold",
      italic: "format_italic",
      strikethrough: "strikethrough_s",
      underline: "format_underlined",
      unorderedList: "format_list_bulleted",
      orderedList: "format_list_numbered",
      subscript: "vertical_align_bottom",
      superscript: "vertical_align_top",
      hyperlink: "link",
      toggleFullscreen: "fullscreen",
      quote: "format_quote",
      left: "format_align_left",
      center: "format_align_center",
      right: "format_align_right",
      justify: "format_align_justify",
      print: "print",
      outdent: "format_indent_decrease",
      indent: "format_indent_increase",
      removeFormat: "format_clear",
      formatting: "text_format",
      fontSize: "format_size",
      align: "format_align_left",
      hr: "remove",
      undo: "undo",
      redo: "redo",
      heading: "format_size",
      code: "code",
      size: "format_size",
      font: "font_download",
      viewSource: "code",
    },
    expansionItem: {
      icon: "keyboard_arrow_down",
      denseIcon: "arrow_drop_down",
    },
    fab: { icon: "add", activeIcon: "close" },
    field: { clear: "cancel", error: "error" },
    pagination: {
      first: "first_page",
      prev: "keyboard_arrow_left",
      next: "keyboard_arrow_right",
      last: "last_page",
    },
    rating: { icon: "grade" },
    stepper: { done: "check", active: "edit", error: "warning" },
    tabs: {
      left: "chevron_left",
      right: "chevron_right",
      up: "keyboard_arrow_up",
      down: "keyboard_arrow_down",
    },
    table: {
      arrowUp: "arrow_upward",
      warning: "warning",
      firstPage: "first_page",
      prevPage: "chevron_left",
      nextPage: "chevron_right",
      lastPage: "last_page",
    },
    tree: { icon: "play_arrow" },
    uploader: {
      done: "done",
      clear: "clear",
      add: "add_box",
      upload: "cloud_upload",
      removeQueue: "clear_all",
      removeUploaded: "done_all",
    },
  };
const Ol = xa(
    { iconMapFn: null, __icons: {} },
    {
      set(e, t) {
        const n = { ...e, rtl: e.rtl === !0 };
        (n.set = Ol.set), Object.assign(Ol.__icons, n);
      },
      install({ $q: e, iconSet: t, ssrContext: n }) {
        e.config.iconMapFn !== void 0 && (this.iconMapFn = e.config.iconMapFn),
          (e.iconSet = this.__icons),
          Tn(
            e,
            "iconMapFn",
            () => this.iconMapFn,
            (r) => {
              this.iconMapFn = r;
            }
          ),
          this.__installed === !0
            ? t !== void 0 && this.set(t)
            : this.set(t || W0);
      },
    }
  ),
  Q0 = "_q_",
  wo = "_q_l_",
  gp = "_q_pc_",
  yp = "_q_fo_",
  $t = () => {},
  Tl = {};
let bp = !1;
function G0() {
  bp = !0;
}
function Pr(e, t) {
  if (e === t) return !0;
  if (
    e !== null &&
    t !== null &&
    typeof e == "object" &&
    typeof t == "object"
  ) {
    if (e.constructor !== t.constructor) return !1;
    let n, r;
    if (e.constructor === Array) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (Pr(e[r], t[r]) !== !0) return !1;
      return !0;
    }
    if (e.constructor === Map) {
      if (e.size !== t.size) return !1;
      let a = e.entries();
      for (r = a.next(); r.done !== !0; ) {
        if (t.has(r.value[0]) !== !0) return !1;
        r = a.next();
      }
      for (a = e.entries(), r = a.next(); r.done !== !0; ) {
        if (Pr(r.value[1], t.get(r.value[0])) !== !0) return !1;
        r = a.next();
      }
      return !0;
    }
    if (e.constructor === Set) {
      if (e.size !== t.size) return !1;
      const a = e.entries();
      for (r = a.next(); r.done !== !0; ) {
        if (t.has(r.value[0]) !== !0) return !1;
        r = a.next();
      }
      return !0;
    }
    if (e.buffer != null && e.buffer.constructor === ArrayBuffer) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (e[r] !== t[r]) return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    const o = Object.keys(e).filter((a) => e[a] !== void 0);
    if (
      ((n = o.length),
      n !== Object.keys(t).filter((a) => t[a] !== void 0).length)
    )
      return !1;
    for (r = n; r-- !== 0; ) {
      const a = o[r];
      if (Pr(e[a], t[a]) !== !0) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function yo(e) {
  return e !== null && typeof e == "object" && Array.isArray(e) !== !0;
}
function Tu(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function X0(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
function Pu(e) {
  return typeof e == "number" && isFinite(e);
}
const od = [Cl, K0, Yt, N0, ua, $n, Ol];
function Sp(e, t) {
  const n = Ac(e);
  n.config.globalProperties = t.config.globalProperties;
  const { reload: r, ...o } = t._context;
  return Object.assign(n._context, o), n;
}
function id(e, t) {
  t.forEach((n) => {
    n.install(e), (n.__installed = !0);
  });
}
function Y0(e, t, n) {
  (e.config.globalProperties.$q = n.$q),
    e.provide(Q0, n.$q),
    id(n, od),
    t.components !== void 0 &&
      Object.values(t.components).forEach((r) => {
        yo(r) === !0 && r.name !== void 0 && e.component(r.name, r);
      }),
    t.directives !== void 0 &&
      Object.values(t.directives).forEach((r) => {
        yo(r) === !0 && r.name !== void 0 && e.directive(r.name, r);
      }),
    t.plugins !== void 0 &&
      id(
        n,
        Object.values(t.plugins).filter(
          (r) => typeof r.install == "function" && od.includes(r) === !1
        )
      ),
    _n.value === !0 &&
      (n.$q.onSSRHydrated = () => {
        n.onSSRHydrated.forEach((r) => {
          r();
        }),
          (n.$q.onSSRHydrated = () => {});
      });
}
var J0 = function (e, t = {}) {
    const n = { version: "2.12.4" };
    bp === !1
      ? (t.config !== void 0 && Object.assign(Tl, t.config),
        (n.config = { ...Tl }),
        G0())
      : (n.config = t.config || {}),
      Y0(e, t, {
        parentApp: e,
        $q: n,
        lang: t.lang,
        iconSet: t.iconSet,
        onSSRHydrated: [],
      });
  },
  Z0 = { version: "2.12.4", install: J0, lang: $n, iconSet: Ol },
  ci = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, o] of t) n[r] = o;
    return n;
  };
const eS = zn({ name: "App" });
function tS(e, t, n, r, o, a) {
  const i = ia("router-view");
  return lt(), It(i);
}
var nS = ci(eS, [["render", tS]]);
var rS = !1;
/*!
 * pinia v2.1.6
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ let wp;
const is = (e) => (wp = e),
  xp = Symbol();
function Ru(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var Hi;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(Hi || (Hi = {}));
function oS() {
  const e = oc(!0),
    t = e.run(() => fe({}));
  let n = [],
    r = [];
  const o = hr({
    install(a) {
      is(o),
        (o._a = a),
        a.provide(xp, o),
        (a.config.globalProperties.$pinia = o),
        r.forEach((i) => n.push(i)),
        (r = []);
    },
    use(a) {
      return !this._a && !rS ? r.push(a) : n.push(a), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return o;
}
const Ep = () => {};
function ad(e, t, n, r = Ep) {
  e.push(t);
  const o = () => {
    const a = e.indexOf(t);
    a > -1 && (e.splice(a, 1), r());
  };
  return !n && ic() && Bh(o), o;
}
function Ro(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const iS = (e) => e();
function Au(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, r) => e.set(r, n)),
    e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const r = t[n],
      o = e[n];
    Ru(o) && Ru(r) && e.hasOwnProperty(n) && !Et(r) && !Yn(r)
      ? (e[n] = Au(o, r))
      : (e[n] = r);
  }
  return e;
}
const aS = Symbol();
function lS(e) {
  return !Ru(e) || !e.hasOwnProperty(aS);
}
const { assign: Er } = Object;
function sS(e) {
  return !!(Et(e) && e.effect);
}
function uS(e, t, n, r) {
  const { state: o, actions: a, getters: i } = t,
    l = n.state.value[e];
  let s;
  function u() {
    l || (n.state.value[e] = o ? o() : {});
    const c = Zh(n.state.value[e]);
    return Er(
      c,
      a,
      Object.keys(i || {}).reduce(
        (f, d) => (
          (f[d] = hr(
            O(() => {
              is(n);
              const h = n._s.get(e);
              return i[d].call(h, h);
            })
          )),
          f
        ),
        {}
      )
    );
  }
  return (s = Cp(e, u, t, n, r, !0)), s;
}
function Cp(e, t, n = {}, r, o, a) {
  let i;
  const l = Er({ actions: {} }, n),
    s = { deep: !0 };
  let u,
    c,
    f = [],
    d = [],
    h;
  const v = r.state.value[e];
  !a && !v && (r.state.value[e] = {}), fe({});
  let m;
  function g(T) {
    let x;
    (u = c = !1),
      typeof T == "function"
        ? (T(r.state.value[e]),
          (x = { type: Hi.patchFunction, storeId: e, events: h }))
        : (Au(r.state.value[e], T),
          (x = { type: Hi.patchObject, payload: T, storeId: e, events: h }));
    const C = (m = Symbol());
    at().then(() => {
      m === C && (u = !0);
    }),
      (c = !0),
      Ro(f, x, r.state.value[e]);
  }
  const y = a
    ? function () {
        const { state: x } = n,
          C = x ? x() : {};
        this.$patch((D) => {
          Er(D, C);
        });
      }
    : Ep;
  function p() {
    i.stop(), (f = []), (d = []), r._s.delete(e);
  }
  function w(T, x) {
    return function () {
      is(r);
      const C = Array.from(arguments),
        D = [],
        I = [];
      function $(j) {
        D.push(j);
      }
      function L(j) {
        I.push(j);
      }
      Ro(d, { args: C, name: T, store: S, after: $, onError: L });
      let G;
      try {
        G = x.apply(this && this.$id === e ? this : S, C);
      } catch (j) {
        throw (Ro(I, j), j);
      }
      return G instanceof Promise
        ? G.then((j) => (Ro(D, j), j)).catch(
            (j) => (Ro(I, j), Promise.reject(j))
          )
        : (Ro(D, G), G);
    };
  }
  const b = {
      _p: r,
      $id: e,
      $onAction: ad.bind(null, d),
      $patch: g,
      $reset: y,
      $subscribe(T, x = {}) {
        const C = ad(f, T, x.detached, () => D()),
          D = i.run(() =>
            me(
              () => r.state.value[e],
              (I) => {
                (x.flush === "sync" ? c : u) &&
                  T({ storeId: e, type: Hi.direct, events: h }, I);
              },
              Er({}, s, x)
            )
          );
        return C;
      },
      $dispose: p,
    },
    S = Pn(b);
  r._s.set(e, S);
  const E = (r._a && r._a.runWithContext) || iS,
    A = r._e.run(() => ((i = oc()), E(() => i.run(t))));
  for (const T in A) {
    const x = A[T];
    if ((Et(x) && !sS(x)) || Yn(x))
      a ||
        (v && lS(x) && (Et(x) ? (x.value = v[T]) : Au(x, v[T])),
        (r.state.value[e][T] = x));
    else if (typeof x == "function") {
      const C = w(T, x);
      (A[T] = C), (l.actions[T] = x);
    }
  }
  return (
    Er(S, A),
    Er(He(S), A),
    Object.defineProperty(S, "$state", {
      get: () => r.state.value[e],
      set: (T) => {
        g((x) => {
          Er(x, T);
        });
      },
    }),
    r._p.forEach((T) => {
      Er(
        S,
        i.run(() => T({ store: S, app: r._a, pinia: r, options: l }))
      );
    }),
    v && a && n.hydrate && n.hydrate(S.$state, v),
    (u = !0),
    (c = !0),
    S
  );
}
function cS(e, t, n) {
  let r, o;
  const a = typeof t == "function";
  typeof e == "string" ? ((r = e), (o = a ? n : t)) : ((o = e), (r = e.id));
  function i(l, s) {
    const u = Cv();
    return (
      (l = l || (u ? qt(xp, null) : null)),
      l && is(l),
      (l = wp),
      l._s.has(r) || (a ? Cp(r, t, o, l) : uS(r, o, l)),
      l._s.get(r)
    );
  }
  return (i.$id = r), i;
}
function kc(e) {
  {
    e = He(e);
    const t = {};
    for (const n in e) {
      const r = e[n];
      (Et(r) || Yn(r)) && (t[n] = ev(e, n));
    }
    return t;
  }
}
var Rs = () => oS();
/*!
 * vue-router v4.2.4
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const Fo = typeof window != "undefined";
function fS(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const ut = Object.assign;
function As(e, t) {
  const n = {};
  for (const r in t) {
    const o = t[r];
    n[r] = Un(o) ? o.map(e) : e(o);
  }
  return n;
}
const _i = () => {},
  Un = Array.isArray,
  dS = /\/$/,
  hS = (e) => e.replace(dS, "");
function Is(e, t, n = "/") {
  let r,
    o = {},
    a = "",
    i = "";
  const l = t.indexOf("#");
  let s = t.indexOf("?");
  return (
    l < s && l >= 0 && (s = -1),
    s > -1 &&
      ((r = t.slice(0, s)),
      (a = t.slice(s + 1, l > -1 ? l : t.length)),
      (o = e(a))),
    l > -1 && ((r = r || t.slice(0, l)), (i = t.slice(l, t.length))),
    (r = gS(r != null ? r : t, n)),
    { fullPath: r + (a && "?") + a + i, path: r, query: o, hash: i }
  );
}
function vS(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ld(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function pS(e, t, n) {
  const r = t.matched.length - 1,
    o = n.matched.length - 1;
  return (
    r > -1 &&
    r === o &&
    Zo(t.matched[r], n.matched[o]) &&
    Op(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function Zo(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Op(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!mS(e[n], t[n])) return !1;
  return !0;
}
function mS(e, t) {
  return Un(e) ? sd(e, t) : Un(t) ? sd(t, e) : e === t;
}
function sd(e, t) {
  return Un(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function gS(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/"),
    o = r[r.length - 1];
  (o === ".." || o === ".") && r.push("");
  let a = n.length - 1,
    i,
    l;
  for (i = 0; i < r.length; i++)
    if (((l = r[i]), l !== "."))
      if (l === "..") a > 1 && a--;
      else break;
  return (
    n.slice(0, a).join("/") +
    "/" +
    r.slice(i - (i === r.length ? 1 : 0)).join("/")
  );
}
var ca;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(ca || (ca = {}));
var Ui;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Ui || (Ui = {}));
function yS(e) {
  if (!e)
    if (Fo) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), hS(e);
}
const bS = /^[^#]+#/;
function SS(e, t) {
  return e.replace(bS, "#") + t;
}
function wS(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const as = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function xS(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      o =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!o) return;
    t = wS(o, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function ud(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Iu = new Map();
function ES(e, t) {
  Iu.set(e, t);
}
function CS(e) {
  const t = Iu.get(e);
  return Iu.delete(e), t;
}
let OS = () => location.protocol + "//" + location.host;
function Tp(e, t) {
  const { pathname: n, search: r, hash: o } = t,
    a = e.indexOf("#");
  if (a > -1) {
    let l = o.includes(e.slice(a)) ? e.slice(a).length : 1,
      s = o.slice(l);
    return s[0] !== "/" && (s = "/" + s), ld(s, "");
  }
  return ld(n, e) + r + o;
}
function TS(e, t, n, r) {
  let o = [],
    a = [],
    i = null;
  const l = ({ state: d }) => {
    const h = Tp(e, location),
      v = n.value,
      m = t.value;
    let g = 0;
    if (d) {
      if (((n.value = h), (t.value = d), i && i === v)) {
        i = null;
        return;
      }
      g = m ? d.position - m.position : 0;
    } else r(h);
    o.forEach((y) => {
      y(n.value, v, {
        delta: g,
        type: ca.pop,
        direction: g ? (g > 0 ? Ui.forward : Ui.back) : Ui.unknown,
      });
    });
  };
  function s() {
    i = n.value;
  }
  function u(d) {
    o.push(d);
    const h = () => {
      const v = o.indexOf(d);
      v > -1 && o.splice(v, 1);
    };
    return a.push(h), h;
  }
  function c() {
    const { history: d } = window;
    !d.state || d.replaceState(ut({}, d.state, { scroll: as() }), "");
  }
  function f() {
    for (const d of a) d();
    (a = []),
      window.removeEventListener("popstate", l),
      window.removeEventListener("beforeunload", c);
  }
  return (
    window.addEventListener("popstate", l),
    window.addEventListener("beforeunload", c, { passive: !0 }),
    { pauseListeners: s, listen: u, destroy: f }
  );
}
function cd(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? as() : null,
  };
}
function PS(e) {
  const { history: t, location: n } = window,
    r = { value: Tp(e, n) },
    o = { value: t.state };
  o.value ||
    a(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function a(s, u, c) {
    const f = e.indexOf("#"),
      d =
        f > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(f)) + s
          : OS() + e + s;
    try {
      t[c ? "replaceState" : "pushState"](u, "", d), (o.value = u);
    } catch (h) {
      console.error(h), n[c ? "replace" : "assign"](d);
    }
  }
  function i(s, u) {
    const c = ut({}, t.state, cd(o.value.back, s, o.value.forward, !0), u, {
      position: o.value.position,
    });
    a(s, c, !0), (r.value = s);
  }
  function l(s, u) {
    const c = ut({}, o.value, t.state, { forward: s, scroll: as() });
    a(c.current, c, !0);
    const f = ut({}, cd(r.value, s, null), { position: c.position + 1 }, u);
    a(s, f, !1), (r.value = s);
  }
  return { location: r, state: o, push: l, replace: i };
}
function RS(e) {
  e = yS(e);
  const t = PS(e),
    n = TS(e, t.state, t.location, t.replace);
  function r(a, i = !0) {
    i || n.pauseListeners(), history.go(a);
  }
  const o = ut(
    { location: "", base: e, go: r, createHref: SS.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(o, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(o, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    o
  );
}
function AS(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ""),
    e.includes("#") || (e += "#"),
    RS(e)
  );
}
function IS(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function Pp(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const br = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Rp = Symbol("");
var fd;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(fd || (fd = {}));
function ei(e, t) {
  return ut(new Error(), { type: e, [Rp]: !0 }, t);
}
function nr(e, t) {
  return e instanceof Error && Rp in e && (t == null || !!(e.type & t));
}
const dd = "[^/]+?",
  LS = { sensitive: !1, strict: !1, start: !0, end: !0 },
  kS = /[.+*?^${}()[\]/\\]/g;
function DS(e, t) {
  const n = ut({}, LS, t),
    r = [];
  let o = n.start ? "^" : "";
  const a = [];
  for (const u of e) {
    const c = u.length ? [] : [90];
    n.strict && !u.length && (o += "/");
    for (let f = 0; f < u.length; f++) {
      const d = u[f];
      let h = 40 + (n.sensitive ? 0.25 : 0);
      if (d.type === 0)
        f || (o += "/"), (o += d.value.replace(kS, "\\$&")), (h += 40);
      else if (d.type === 1) {
        const { value: v, repeatable: m, optional: g, regexp: y } = d;
        a.push({ name: v, repeatable: m, optional: g });
        const p = y || dd;
        if (p !== dd) {
          h += 10;
          try {
            new RegExp(`(${p})`);
          } catch (b) {
            throw new Error(
              `Invalid custom RegExp for param "${v}" (${p}): ` + b.message
            );
          }
        }
        let w = m ? `((?:${p})(?:/(?:${p}))*)` : `(${p})`;
        f || (w = g && u.length < 2 ? `(?:/${w})` : "/" + w),
          g && (w += "?"),
          (o += w),
          (h += 20),
          g && (h += -8),
          m && (h += -20),
          p === ".*" && (h += -50);
      }
      c.push(h);
    }
    r.push(c);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (o += "/?"), n.end ? (o += "$") : n.strict && (o += "(?:/|$)");
  const i = new RegExp(o, n.sensitive ? "" : "i");
  function l(u) {
    const c = u.match(i),
      f = {};
    if (!c) return null;
    for (let d = 1; d < c.length; d++) {
      const h = c[d] || "",
        v = a[d - 1];
      f[v.name] = h && v.repeatable ? h.split("/") : h;
    }
    return f;
  }
  function s(u) {
    let c = "",
      f = !1;
    for (const d of e) {
      (!f || !c.endsWith("/")) && (c += "/"), (f = !1);
      for (const h of d)
        if (h.type === 0) c += h.value;
        else if (h.type === 1) {
          const { value: v, repeatable: m, optional: g } = h,
            y = v in u ? u[v] : "";
          if (Un(y) && !m)
            throw new Error(
              `Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`
            );
          const p = Un(y) ? y.join("/") : y;
          if (!p)
            if (g)
              d.length < 2 &&
                (c.endsWith("/") ? (c = c.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${v}"`);
          c += p;
        }
    }
    return c || "/";
  }
  return { re: i, score: r, keys: a, parse: l, stringify: s };
}
function MS(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function $S(e, t) {
  let n = 0;
  const r = e.score,
    o = t.score;
  for (; n < r.length && n < o.length; ) {
    const a = MS(r[n], o[n]);
    if (a) return a;
    n++;
  }
  if (Math.abs(o.length - r.length) === 1) {
    if (hd(r)) return 1;
    if (hd(o)) return -1;
  }
  return o.length - r.length;
}
function hd(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const FS = { type: 0, value: "" },
  NS = /[a-zA-Z0-9_]/;
function BS(e) {
  if (!e) return [[]];
  if (e === "/") return [[FS]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(h) {
    throw new Error(`ERR (${n})/"${u}": ${h}`);
  }
  let n = 0,
    r = n;
  const o = [];
  let a;
  function i() {
    a && o.push(a), (a = []);
  }
  let l = 0,
    s,
    u = "",
    c = "";
  function f() {
    !u ||
      (n === 0
        ? a.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
        ? (a.length > 1 &&
            (s === "*" || s === "+") &&
            t(
              `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
            ),
          a.push({
            type: 1,
            value: u,
            regexp: c,
            repeatable: s === "*" || s === "+",
            optional: s === "*" || s === "?",
          }))
        : t("Invalid state to consume buffer"),
      (u = ""));
  }
  function d() {
    u += s;
  }
  for (; l < e.length; ) {
    if (((s = e[l++]), s === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        s === "/" ? (u && f(), i()) : s === ":" ? (f(), (n = 1)) : d();
        break;
      case 4:
        d(), (n = r);
        break;
      case 1:
        s === "("
          ? (n = 2)
          : NS.test(s)
          ? d()
          : (f(), (n = 0), s !== "*" && s !== "?" && s !== "+" && l--);
        break;
      case 2:
        s === ")"
          ? c[c.length - 1] == "\\"
            ? (c = c.slice(0, -1) + s)
            : (n = 3)
          : (c += s);
        break;
      case 3:
        f(), (n = 0), s !== "*" && s !== "?" && s !== "+" && l--, (c = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), f(), i(), o;
}
function jS(e, t, n) {
  const r = DS(BS(e.path), n),
    o = ut(r, { record: e, parent: t, children: [], alias: [] });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function VS(e, t) {
  const n = [],
    r = new Map();
  t = md({ strict: !1, end: !0, sensitive: !1 }, t);
  function o(c) {
    return r.get(c);
  }
  function a(c, f, d) {
    const h = !d,
      v = qS(c);
    v.aliasOf = d && d.record;
    const m = md(t, c),
      g = [v];
    if ("alias" in c) {
      const w = typeof c.alias == "string" ? [c.alias] : c.alias;
      for (const b of w)
        g.push(
          ut({}, v, {
            components: d ? d.record.components : v.components,
            path: b,
            aliasOf: d ? d.record : v,
          })
        );
    }
    let y, p;
    for (const w of g) {
      const { path: b } = w;
      if (f && b[0] !== "/") {
        const S = f.record.path,
          E = S[S.length - 1] === "/" ? "" : "/";
        w.path = f.record.path + (b && E + b);
      }
      if (
        ((y = jS(w, f, m)),
        d
          ? d.alias.push(y)
          : ((p = p || y),
            p !== y && p.alias.push(y),
            h && c.name && !pd(y) && i(c.name)),
        v.children)
      ) {
        const S = v.children;
        for (let E = 0; E < S.length; E++) a(S[E], y, d && d.children[E]);
      }
      (d = d || y),
        ((y.record.components && Object.keys(y.record.components).length) ||
          y.record.name ||
          y.record.redirect) &&
          s(y);
    }
    return p
      ? () => {
          i(p);
        }
      : _i;
  }
  function i(c) {
    if (Pp(c)) {
      const f = r.get(c);
      f &&
        (r.delete(c),
        n.splice(n.indexOf(f), 1),
        f.children.forEach(i),
        f.alias.forEach(i));
    } else {
      const f = n.indexOf(c);
      f > -1 &&
        (n.splice(f, 1),
        c.record.name && r.delete(c.record.name),
        c.children.forEach(i),
        c.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function s(c) {
    let f = 0;
    for (
      ;
      f < n.length &&
      $S(c, n[f]) >= 0 &&
      (c.record.path !== n[f].record.path || !Ap(c, n[f]));

    )
      f++;
    n.splice(f, 0, c), c.record.name && !pd(c) && r.set(c.record.name, c);
  }
  function u(c, f) {
    let d,
      h = {},
      v,
      m;
    if ("name" in c && c.name) {
      if (((d = r.get(c.name)), !d)) throw ei(1, { location: c });
      (m = d.record.name),
        (h = ut(
          vd(
            f.params,
            d.keys.filter((p) => !p.optional).map((p) => p.name)
          ),
          c.params &&
            vd(
              c.params,
              d.keys.map((p) => p.name)
            )
        )),
        (v = d.stringify(h));
    } else if ("path" in c)
      (v = c.path),
        (d = n.find((p) => p.re.test(v))),
        d && ((h = d.parse(v)), (m = d.record.name));
    else {
      if (((d = f.name ? r.get(f.name) : n.find((p) => p.re.test(f.path))), !d))
        throw ei(1, { location: c, currentLocation: f });
      (m = d.record.name),
        (h = ut({}, f.params, c.params)),
        (v = d.stringify(h));
    }
    const g = [];
    let y = d;
    for (; y; ) g.unshift(y.record), (y = y.parent);
    return { name: m, path: v, params: h, matched: g, meta: _S(g) };
  }
  return (
    e.forEach((c) => a(c)),
    {
      addRoute: a,
      resolve: u,
      removeRoute: i,
      getRoutes: l,
      getRecordMatcher: o,
    }
  );
}
function vd(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function qS(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: HS(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function HS(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function pd(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function _S(e) {
  return e.reduce((t, n) => ut(t, n.meta), {});
}
function md(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Ap(e, t) {
  return t.children.some((n) => n === e || Ap(e, n));
}
const Ip = /#/g,
  US = /&/g,
  zS = /\//g,
  KS = /=/g,
  WS = /\?/g,
  Lp = /\+/g,
  QS = /%5B/g,
  GS = /%5D/g,
  kp = /%5E/g,
  XS = /%60/g,
  Dp = /%7B/g,
  YS = /%7C/g,
  Mp = /%7D/g,
  JS = /%20/g;
function Dc(e) {
  return encodeURI("" + e)
    .replace(YS, "|")
    .replace(QS, "[")
    .replace(GS, "]");
}
function ZS(e) {
  return Dc(e).replace(Dp, "{").replace(Mp, "}").replace(kp, "^");
}
function Lu(e) {
  return Dc(e)
    .replace(Lp, "%2B")
    .replace(JS, "+")
    .replace(Ip, "%23")
    .replace(US, "%26")
    .replace(XS, "`")
    .replace(Dp, "{")
    .replace(Mp, "}")
    .replace(kp, "^");
}
function ew(e) {
  return Lu(e).replace(KS, "%3D");
}
function tw(e) {
  return Dc(e).replace(Ip, "%23").replace(WS, "%3F");
}
function nw(e) {
  return e == null ? "" : tw(e).replace(zS, "%2F");
}
function Pl(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function rw(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let o = 0; o < r.length; ++o) {
    const a = r[o].replace(Lp, " "),
      i = a.indexOf("="),
      l = Pl(i < 0 ? a : a.slice(0, i)),
      s = i < 0 ? null : Pl(a.slice(i + 1));
    if (l in t) {
      let u = t[l];
      Un(u) || (u = t[l] = [u]), u.push(s);
    } else t[l] = s;
  }
  return t;
}
function gd(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = ew(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Un(r) ? r.map((a) => a && Lu(a)) : [r && Lu(r)]).forEach((a) => {
      a !== void 0 &&
        ((t += (t.length ? "&" : "") + n), a != null && (t += "=" + a));
    });
  }
  return t;
}
function ow(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = Un(r)
        ? r.map((o) => (o == null ? null : "" + o))
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
const iw = Symbol(""),
  yd = Symbol(""),
  Mc = Symbol(""),
  $c = Symbol(""),
  ku = Symbol("");
function mi() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const o = e.indexOf(r);
        o > -1 && e.splice(o, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function Or(e, t, n, r, o) {
  const a = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
  return () =>
    new Promise((i, l) => {
      const s = (f) => {
          f === !1
            ? l(ei(4, { from: n, to: t }))
            : f instanceof Error
            ? l(f)
            : IS(f)
            ? l(ei(2, { from: t, to: f }))
            : (a &&
                r.enterCallbacks[o] === a &&
                typeof f == "function" &&
                a.push(f),
              i());
        },
        u = e.call(r && r.instances[o], t, n, s);
      let c = Promise.resolve(u);
      e.length < 3 && (c = c.then(s)), c.catch((f) => l(f));
    });
}
function Ls(e, t, n, r) {
  const o = [];
  for (const a of e)
    for (const i in a.components) {
      let l = a.components[i];
      if (!(t !== "beforeRouteEnter" && !a.instances[i]))
        if (aw(l)) {
          const u = (l.__vccOpts || l)[t];
          u && o.push(Or(u, n, r, a, i));
        } else {
          let s = l();
          o.push(() =>
            s.then((u) => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${a.path}"`)
                );
              const c = fS(u) ? u.default : u;
              a.components[i] = c;
              const d = (c.__vccOpts || c)[t];
              return d && Or(d, n, r, a, i)();
            })
          );
        }
    }
  return o;
}
function aw(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function bd(e) {
  const t = qt(Mc),
    n = qt($c),
    r = O(() => t.resolve(sr(e.to))),
    o = O(() => {
      const { matched: s } = r.value,
        { length: u } = s,
        c = s[u - 1],
        f = n.matched;
      if (!c || !f.length) return -1;
      const d = f.findIndex(Zo.bind(null, c));
      if (d > -1) return d;
      const h = Sd(s[u - 2]);
      return u > 1 && Sd(c) === h && f[f.length - 1].path !== h
        ? f.findIndex(Zo.bind(null, s[u - 2]))
        : d;
    }),
    a = O(() => o.value > -1 && cw(n.params, r.value.params)),
    i = O(
      () =>
        o.value > -1 &&
        o.value === n.matched.length - 1 &&
        Op(n.params, r.value.params)
    );
  function l(s = {}) {
    return uw(s)
      ? t[sr(e.replace) ? "replace" : "push"](sr(e.to)).catch(_i)
      : Promise.resolve();
  }
  return {
    route: r,
    href: O(() => r.value.href),
    isActive: a,
    isExactActive: i,
    navigate: l,
  };
}
const lw = zn({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: bd,
    setup(e, { slots: t }) {
      const n = Pn(bd(e)),
        { options: r } = qt(Mc),
        o = O(() => ({
          [wd(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [wd(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const a = t.default && t.default(n);
        return e.custom
          ? a
          : k(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: o.value,
              },
              a
            );
      };
    },
  }),
  sw = lw;
function uw(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function cw(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n];
    if (typeof r == "string") {
      if (r !== o) return !1;
    } else if (!Un(o) || o.length !== r.length || r.some((a, i) => a !== o[i]))
      return !1;
  }
  return !0;
}
function Sd(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const wd = (e, t, n) => (e != null ? e : t != null ? t : n),
  fw = zn({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = qt(ku),
        o = O(() => e.route || r.value),
        a = qt(yd, 0),
        i = O(() => {
          let u = sr(a);
          const { matched: c } = o.value;
          let f;
          for (; (f = c[u]) && !f.components; ) u++;
          return u;
        }),
        l = O(() => o.value.matched[i.value]);
      Lr(
        yd,
        O(() => i.value + 1)
      ),
        Lr(iw, l),
        Lr(ku, o);
      const s = fe();
      return (
        me(
          () => [s.value, l.value, e.name],
          ([u, c, f], [d, h, v]) => {
            c &&
              ((c.instances[f] = u),
              h &&
                h !== c &&
                u &&
                u === d &&
                (c.leaveGuards.size || (c.leaveGuards = h.leaveGuards),
                c.updateGuards.size || (c.updateGuards = h.updateGuards))),
              u &&
                c &&
                (!h || !Zo(c, h) || !d) &&
                (c.enterCallbacks[f] || []).forEach((m) => m(u));
          },
          { flush: "post" }
        ),
        () => {
          const u = o.value,
            c = e.name,
            f = l.value,
            d = f && f.components[c];
          if (!d) return xd(n.default, { Component: d, route: u });
          const h = f.props[c],
            v = h
              ? h === !0
                ? u.params
                : typeof h == "function"
                ? h(u)
                : h
              : null,
            g = k(
              d,
              ut({}, v, t, {
                onVnodeUnmounted: (y) => {
                  y.component.isUnmounted && (f.instances[c] = null);
                },
                ref: s,
              })
            );
          return xd(n.default, { Component: g, route: u }) || g;
        }
      );
    },
  });
function xd(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const dw = fw;
function hw(e) {
  const t = VS(e.routes, e),
    n = e.parseQuery || rw,
    r = e.stringifyQuery || gd,
    o = e.history,
    a = mi(),
    i = mi(),
    l = mi(),
    s = Yh(br);
  let u = br;
  Fo &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const c = As.bind(null, (N) => "" + N),
    f = As.bind(null, nw),
    d = As.bind(null, Pl);
  function h(N, ae) {
    let U, he;
    return (
      Pp(N) ? ((U = t.getRecordMatcher(N)), (he = ae)) : (he = N),
      t.addRoute(he, U)
    );
  }
  function v(N) {
    const ae = t.getRecordMatcher(N);
    ae && t.removeRoute(ae);
  }
  function m() {
    return t.getRoutes().map((N) => N.record);
  }
  function g(N) {
    return !!t.getRecordMatcher(N);
  }
  function y(N, ae) {
    if (((ae = ut({}, ae || s.value)), typeof N == "string")) {
      const B = Is(n, N, ae.path),
        Q = t.resolve({ path: B.path }, ae),
        Y = o.createHref(B.fullPath);
      return ut(B, Q, {
        params: d(Q.params),
        hash: Pl(B.hash),
        redirectedFrom: void 0,
        href: Y,
      });
    }
    let U;
    if ("path" in N) U = ut({}, N, { path: Is(n, N.path, ae.path).path });
    else {
      const B = ut({}, N.params);
      for (const Q in B) B[Q] == null && delete B[Q];
      (U = ut({}, N, { params: f(B) })), (ae.params = f(ae.params));
    }
    const he = t.resolve(U, ae),
      Le = N.hash || "";
    he.params = c(d(he.params));
    const R = vS(r, ut({}, N, { hash: ZS(Le), path: he.path })),
      P = o.createHref(R);
    return ut(
      { fullPath: R, hash: Le, query: r === gd ? ow(N.query) : N.query || {} },
      he,
      { redirectedFrom: void 0, href: P }
    );
  }
  function p(N) {
    return typeof N == "string" ? Is(n, N, s.value.path) : ut({}, N);
  }
  function w(N, ae) {
    if (u !== N) return ei(8, { from: ae, to: N });
  }
  function b(N) {
    return A(N);
  }
  function S(N) {
    return b(ut(p(N), { replace: !0 }));
  }
  function E(N) {
    const ae = N.matched[N.matched.length - 1];
    if (ae && ae.redirect) {
      const { redirect: U } = ae;
      let he = typeof U == "function" ? U(N) : U;
      return (
        typeof he == "string" &&
          ((he =
            he.includes("?") || he.includes("#") ? (he = p(he)) : { path: he }),
          (he.params = {})),
        ut(
          {
            query: N.query,
            hash: N.hash,
            params: "path" in he ? {} : N.params,
          },
          he
        )
      );
    }
  }
  function A(N, ae) {
    const U = (u = y(N)),
      he = s.value,
      Le = N.state,
      R = N.force,
      P = N.replace === !0,
      B = E(U);
    if (B)
      return A(
        ut(p(B), {
          state: typeof B == "object" ? ut({}, Le, B.state) : Le,
          force: R,
          replace: P,
        }),
        ae || U
      );
    const Q = U;
    Q.redirectedFrom = ae;
    let Y;
    return (
      !R &&
        pS(r, he, U) &&
        ((Y = ei(16, { to: Q, from: he })), X(he, he, !0, !1)),
      (Y ? Promise.resolve(Y) : C(Q, he))
        .catch((te) => (nr(te) ? (nr(te, 2) ? te : J(te)) : oe(te, Q, he)))
        .then((te) => {
          if (te) {
            if (nr(te, 2))
              return A(
                ut({ replace: P }, p(te.to), {
                  state:
                    typeof te.to == "object" ? ut({}, Le, te.to.state) : Le,
                  force: R,
                }),
                ae || Q
              );
          } else te = I(Q, he, !0, P, Le);
          return D(Q, he, te), te;
        })
    );
  }
  function T(N, ae) {
    const U = w(N, ae);
    return U ? Promise.reject(U) : Promise.resolve();
  }
  function x(N) {
    const ae = Ee.values().next().value;
    return ae && typeof ae.runWithContext == "function"
      ? ae.runWithContext(N)
      : N();
  }
  function C(N, ae) {
    let U;
    const [he, Le, R] = vw(N, ae);
    U = Ls(he.reverse(), "beforeRouteLeave", N, ae);
    for (const B of he)
      B.leaveGuards.forEach((Q) => {
        U.push(Or(Q, N, ae));
      });
    const P = T.bind(null, N, ae);
    return (
      U.push(P),
      ne(U)
        .then(() => {
          U = [];
          for (const B of a.list()) U.push(Or(B, N, ae));
          return U.push(P), ne(U);
        })
        .then(() => {
          U = Ls(Le, "beforeRouteUpdate", N, ae);
          for (const B of Le)
            B.updateGuards.forEach((Q) => {
              U.push(Or(Q, N, ae));
            });
          return U.push(P), ne(U);
        })
        .then(() => {
          U = [];
          for (const B of R)
            if (B.beforeEnter)
              if (Un(B.beforeEnter))
                for (const Q of B.beforeEnter) U.push(Or(Q, N, ae));
              else U.push(Or(B.beforeEnter, N, ae));
          return U.push(P), ne(U);
        })
        .then(
          () => (
            N.matched.forEach((B) => (B.enterCallbacks = {})),
            (U = Ls(R, "beforeRouteEnter", N, ae)),
            U.push(P),
            ne(U)
          )
        )
        .then(() => {
          U = [];
          for (const B of i.list()) U.push(Or(B, N, ae));
          return U.push(P), ne(U);
        })
        .catch((B) => (nr(B, 8) ? B : Promise.reject(B)))
    );
  }
  function D(N, ae, U) {
    l.list().forEach((he) => x(() => he(N, ae, U)));
  }
  function I(N, ae, U, he, Le) {
    const R = w(N, ae);
    if (R) return R;
    const P = ae === br,
      B = Fo ? history.state : {};
    U &&
      (he || P
        ? o.replace(N.fullPath, ut({ scroll: P && B && B.scroll }, Le))
        : o.push(N.fullPath, Le)),
      (s.value = N),
      X(N, ae, U, P),
      J();
  }
  let $;
  function L() {
    $ ||
      ($ = o.listen((N, ae, U) => {
        if (!de.listening) return;
        const he = y(N),
          Le = E(he);
        if (Le) {
          A(ut(Le, { replace: !0 }), he).catch(_i);
          return;
        }
        u = he;
        const R = s.value;
        Fo && ES(ud(R.fullPath, U.delta), as()),
          C(he, R)
            .catch((P) =>
              nr(P, 12)
                ? P
                : nr(P, 2)
                ? (A(P.to, he)
                    .then((B) => {
                      nr(B, 20) &&
                        !U.delta &&
                        U.type === ca.pop &&
                        o.go(-1, !1);
                    })
                    .catch(_i),
                  Promise.reject())
                : (U.delta && o.go(-U.delta, !1), oe(P, he, R))
            )
            .then((P) => {
              (P = P || I(he, R, !1)),
                P &&
                  (U.delta && !nr(P, 8)
                    ? o.go(-U.delta, !1)
                    : U.type === ca.pop && nr(P, 20) && o.go(-1, !1)),
                D(he, R, P);
            })
            .catch(_i);
      }));
  }
  let G = mi(),
    j = mi(),
    V;
  function oe(N, ae, U) {
    J(N);
    const he = j.list();
    return (
      he.length ? he.forEach((Le) => Le(N, ae, U)) : console.error(N),
      Promise.reject(N)
    );
  }
  function xe() {
    return V && s.value !== br
      ? Promise.resolve()
      : new Promise((N, ae) => {
          G.add([N, ae]);
        });
  }
  function J(N) {
    return (
      V ||
        ((V = !N),
        L(),
        G.list().forEach(([ae, U]) => (N ? U(N) : ae())),
        G.reset()),
      N
    );
  }
  function X(N, ae, U, he) {
    const { scrollBehavior: Le } = e;
    if (!Fo || !Le) return Promise.resolve();
    const R =
      (!U && CS(ud(N.fullPath, 0))) ||
      ((he || !U) && history.state && history.state.scroll) ||
      null;
    return at()
      .then(() => Le(N, ae, R))
      .then((P) => P && xS(P))
      .catch((P) => oe(P, N, ae));
  }
  const H = (N) => o.go(N);
  let se;
  const Ee = new Set(),
    de = {
      currentRoute: s,
      listening: !0,
      addRoute: h,
      removeRoute: v,
      hasRoute: g,
      getRoutes: m,
      resolve: y,
      options: e,
      push: b,
      replace: S,
      go: H,
      back: () => H(-1),
      forward: () => H(1),
      beforeEach: a.add,
      beforeResolve: i.add,
      afterEach: l.add,
      onError: j.add,
      isReady: xe,
      install(N) {
        const ae = this;
        N.component("RouterLink", sw),
          N.component("RouterView", dw),
          (N.config.globalProperties.$router = ae),
          Object.defineProperty(N.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => sr(s),
          }),
          Fo &&
            !se &&
            s.value === br &&
            ((se = !0), b(o.location).catch((Le) => {}));
        const U = {};
        for (const Le in br)
          Object.defineProperty(U, Le, {
            get: () => s.value[Le],
            enumerable: !0,
          });
        N.provide(Mc, ae), N.provide($c, sc(U)), N.provide(ku, s);
        const he = N.unmount;
        Ee.add(N),
          (N.unmount = function () {
            Ee.delete(N),
              Ee.size < 1 &&
                ((u = br),
                $ && $(),
                ($ = null),
                (s.value = br),
                (se = !1),
                (V = !1)),
              he();
          });
      },
    };
  function ne(N) {
    return N.reduce((ae, U) => ae.then(() => x(U)), Promise.resolve());
  }
  return de;
}
function vw(e, t) {
  const n = [],
    r = [],
    o = [],
    a = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < a; i++) {
    const l = t.matched[i];
    l && (e.matched.find((u) => Zo(u, l)) ? r.push(l) : n.push(l));
    const s = e.matched[i];
    s && (t.matched.find((u) => Zo(u, s)) || o.push(s));
  }
  return [n, r, o];
}
function pw() {
  return qt($c);
}
const mw = [
  {
    path: "/",
    component: () =>
      to(
        () =>
          Promise.resolve().then(function () {
            return $1;
          }),
        void 0
      ),
    children: [
      {
        path: "",
        component: () =>
          to(
            () =>
              Promise.resolve().then(function () {
                return q1;
              }),
            void 0
          ),
      },
      {
        path: "/:id",
        component: () =>
          to(
            () =>
              Promise.resolve().then(function () {
                return UO;
              }),
            void 0
          ),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () =>
      to(
        () =>
          Promise.resolve().then(function () {
            return YO;
          }),
        void 0
      ),
  },
];
var ks = function () {
  return hw({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: mw,
    history: AS("/"),
  });
};
async function gw(e, t) {
  const n = e(nS);
  n.use(Z0, t);
  const r = typeof Rs == "function" ? await Rs({}) : Rs;
  n.use(r);
  const o = hr(typeof ks == "function" ? await ks({ store: r }) : ks);
  return (
    r.use(({ store: a }) => {
      a.router = o;
    }),
    { app: n, store: r, router: o }
  );
}
let yw = 1,
  bw = document.body;
function Fc(e, t) {
  const n = document.createElement("div");
  if (
    ((n.id = t !== void 0 ? `q-portal--${t}--${yw++}` : e),
    Tl.globalNodes !== void 0)
  ) {
    const r = Tl.globalNodes.class;
    r !== void 0 && (n.className = r);
  }
  return bw.appendChild(n), n;
}
function Sw(e) {
  e.remove();
}
const Ue = (e) => hr(zn(e)),
  Nc = (e) => hr(e);
function Ri(e, t, n) {
  return n <= t ? t : Math.min(n, Math.max(t, e));
}
function Ed(e, t, n) {
  if (n <= t) return t;
  const r = n - t + 1;
  let o = t + ((e - t) % r);
  return o < t && (o = r + o), o === 0 ? 0 : o;
}
const Bc = XMLHttpRequest,
  $p = Bc.prototype.open,
  ww = ["top", "right", "bottom", "left"];
let Rl = [],
  zi = 0;
function xw({ p: e, pos: t, active: n, horiz: r, reverse: o, dir: a }) {
  let i = 1,
    l = 1;
  return r === !0
    ? (o === !0 && (i = -1),
      t === "bottom" && (l = -1),
      { transform: `translate3d(${i * (e - 100)}%,${n ? 0 : l * -200}%,0)` })
    : (o === !0 && (l = -1),
      t === "right" && (i = -1),
      {
        transform: `translate3d(${n ? 0 : a * i * -200}%,${l * (e - 100)}%,0)`,
      });
}
function Ew(e, t) {
  return (
    typeof t != "number" &&
      (e < 25
        ? (t = Math.random() * 3 + 3)
        : e < 65
        ? (t = Math.random() * 3)
        : e < 85
        ? (t = Math.random() * 2)
        : e < 99
        ? (t = 0.6)
        : (t = 0)),
    Ri(e + t, 0, 100)
  );
}
function Cw(e) {
  zi++,
    Rl.push(e),
    !(zi > 1) &&
      (Bc.prototype.open = function (t, n) {
        const r = [],
          o = () => {
            Rl.forEach((i) => {
              (i.hijackFilter.value === null ||
                i.hijackFilter.value(n) === !0) &&
                (i.start(), r.push(i.stop));
            });
          },
          a = () => {
            r.forEach((i) => {
              i();
            });
          };
        this.addEventListener("loadstart", o, { once: !0 }),
          this.addEventListener("loadend", a, { once: !0 }),
          $p.apply(this, arguments);
      });
}
function Ow(e) {
  (Rl = Rl.filter((t) => t.start !== e)),
    (zi = Math.max(0, zi - 1)),
    zi === 0 && (Bc.prototype.open = $p);
}
var Tw = Ue({
  name: "QAjaxBar",
  props: {
    position: {
      type: String,
      default: "top",
      validator: (e) => ww.includes(e),
    },
    size: { type: String, default: "2px" },
    color: String,
    skipHijack: Boolean,
    reverse: Boolean,
    hijackFilter: Function,
  },
  emits: ["start", "stop"],
  setup(e, { emit: t }) {
    const { proxy: n } = Fe(),
      r = fe(0),
      o = fe(!1),
      a = fe(!0);
    let i = 0,
      l = null,
      s;
    const u = O(
        () =>
          `q-loading-bar q-loading-bar--${e.position}` +
          (e.color !== void 0 ? ` bg-${e.color}` : "") +
          (a.value === !0 ? "" : " no-transition")
      ),
      c = O(() => e.position === "top" || e.position === "bottom"),
      f = O(() => (c.value === !0 ? "height" : "width")),
      d = O(() => {
        const w = o.value,
          b = xw({
            p: r.value,
            pos: e.position,
            active: w,
            horiz: c.value,
            reverse:
              n.$q.lang.rtl === !0 && ["top", "bottom"].includes(e.position)
                ? e.reverse === !1
                : e.reverse,
            dir: n.$q.lang.rtl === !0 ? -1 : 1,
          });
        return (b[f.value] = e.size), (b.opacity = w ? 1 : 0), b;
      }),
      h = O(() =>
        o.value === !0
          ? {
              role: "progressbar",
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": r.value,
            }
          : { "aria-hidden": "true" }
      );
    function v(w = 300) {
      const b = s;
      return (
        (s = Math.max(0, w) || 0),
        i++,
        i > 1
          ? (b === 0 && w > 0
              ? y()
              : l !== null && b > 0 && w <= 0 && (clearTimeout(l), (l = null)),
            i)
          : (l !== null && clearTimeout(l),
            t("start"),
            (r.value = 0),
            (l = setTimeout(
              () => {
                (l = null), (a.value = !0), w > 0 && y();
              },
              o.value === !0 ? 500 : 1
            )),
            o.value !== !0 && ((o.value = !0), (a.value = !1)),
            i)
      );
    }
    function m(w) {
      return i > 0 && (r.value = Ew(r.value, w)), i;
    }
    function g() {
      if (((i = Math.max(0, i - 1)), i > 0)) return i;
      l !== null && (clearTimeout(l), (l = null)), t("stop");
      const w = () => {
        (a.value = !0),
          (r.value = 100),
          (l = setTimeout(() => {
            (l = null), (o.value = !1);
          }, 1e3));
      };
      return r.value === 0 ? (l = setTimeout(w, 1)) : w(), i;
    }
    function y() {
      r.value < 100 &&
        (l = setTimeout(() => {
          (l = null), m(), y();
        }, s));
    }
    let p;
    return (
      Ft(() => {
        e.skipHijack !== !0 &&
          ((p = !0),
          Cw({
            start: v,
            stop: g,
            hijackFilter: O(() => e.hijackFilter || null),
          }));
      }),
      vt(() => {
        l !== null && clearTimeout(l), p === !0 && Ow(v);
      }),
      Object.assign(n, { start: v, stop: g, increment: m }),
      () => k("div", { class: u.value, style: d.value, ...h.value })
    );
  },
});
const Va = fe(null),
  Du = xa(
    { isActive: !1 },
    {
      start: en,
      stop: en,
      increment: en,
      setDefaults: en,
      install({ $q: e, parentApp: t }) {
        if (((e.loadingBar = this), this.__installed === !0)) {
          e.config.loadingBar !== void 0 &&
            this.setDefaults(e.config.loadingBar);
          return;
        }
        const n = fe(
          e.config.loadingBar !== void 0 ? { ...e.config.loadingBar } : {}
        );
        function r() {
          Du.isActive = !0;
        }
        function o() {
          Du.isActive = !1;
        }
        const a = Fc("q-loading-bar");
        Sp(
          {
            name: "LoadingBar",
            devtools: { hide: !0 },
            setup: () => () =>
              k(Tw, { ...n.value, onStart: r, onStop: o, ref: Va }),
          },
          t
        ).mount(a),
          Object.assign(this, {
            start(i) {
              Va.value.start(i);
            },
            stop() {
              Va.value.stop();
            },
            increment() {
              Va.value.increment.apply(null, arguments);
            },
            setDefaults(i) {
              yo(i) === !0 && Object.assign(n.value, i);
            },
          });
      },
    }
  ),
  Mu = { xs: 18, sm: 24, md: 32, lg: 38, xl: 46 },
  fi = { size: String };
function di(e, t = Mu) {
  return O(() =>
    e.size !== void 0
      ? { fontSize: e.size in t ? `${t[e.size]}px` : e.size }
      : null
  );
}
function ht(e, t) {
  return (e !== void 0 && e()) || t;
}
function jc(e, t) {
  if (e !== void 0) {
    const n = e();
    if (n != null) return n.slice();
  }
  return t;
}
function qn(e, t) {
  return e !== void 0 ? t.concat(e()) : t;
}
function Fp(e, t) {
  return e === void 0 ? t : t !== void 0 ? t.concat(e()) : e();
}
function $u(e, t, n, r, o, a) {
  t.key = r + o;
  const i = k(e, t, n);
  return o === !0 ? St(i, a()) : i;
}
const Cd = "0 0 24 24",
  Od = (e) => e,
  Ds = (e) => `ionicons ${e}`,
  Np = {
    "mdi-": (e) => `mdi ${e}`,
    "icon-": Od,
    "bt-": (e) => `bt ${e}`,
    "eva-": (e) => `eva ${e}`,
    "ion-md": Ds,
    "ion-ios": Ds,
    "ion-logo": Ds,
    "iconfont ": Od,
    "ti-": (e) => `themify-icon ${e}`,
    "bi-": (e) => `bootstrap-icons ${e}`,
  },
  Bp = { o_: "-outlined", r_: "-round", s_: "-sharp" },
  jp = { sym_o_: "-outlined", sym_r_: "-rounded", sym_s_: "-sharp" },
  Pw = new RegExp("^(" + Object.keys(Np).join("|") + ")"),
  Rw = new RegExp("^(" + Object.keys(Bp).join("|") + ")"),
  Td = new RegExp("^(" + Object.keys(jp).join("|") + ")"),
  Aw = /^[Mm]\s?[-+]?\.?\d/,
  Iw = /^img:/,
  Lw = /^svguse:/,
  kw = /^ion-/,
  Dw = /^(fa-(sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var wt = Ue({
    name: "QIcon",
    props: {
      ...fi,
      tag: { type: String, default: "i" },
      name: String,
      color: String,
      left: Boolean,
      right: Boolean,
    },
    setup(e, { slots: t }) {
      const {
          proxy: { $q: n },
        } = Fe(),
        r = di(e),
        o = O(
          () =>
            "q-icon" +
            (e.left === !0 ? " on-left" : "") +
            (e.right === !0 ? " on-right" : "") +
            (e.color !== void 0 ? ` text-${e.color}` : "")
        ),
        a = O(() => {
          let i,
            l = e.name;
          if (l === "none" || !l) return { none: !0 };
          if (n.iconMapFn !== null) {
            const c = n.iconMapFn(l);
            if (c !== void 0)
              if (c.icon !== void 0) {
                if (((l = c.icon), l === "none" || !l)) return { none: !0 };
              } else
                return {
                  cls: c.cls,
                  content: c.content !== void 0 ? c.content : " ",
                };
          }
          if (Aw.test(l) === !0) {
            const [c, f = Cd] = l.split("|");
            return {
              svg: !0,
              viewBox: f,
              nodes: c.split("&&").map((d) => {
                const [h, v, m] = d.split("@@");
                return k("path", { style: v, d: h, transform: m });
              }),
            };
          }
          if (Iw.test(l) === !0) return { img: !0, src: l.substring(4) };
          if (Lw.test(l) === !0) {
            const [c, f = Cd] = l.split("|");
            return { svguse: !0, src: c.substring(7), viewBox: f };
          }
          let s = " ";
          const u = l.match(Pw);
          if (u !== null) i = Np[u[1]](l);
          else if (Dw.test(l) === !0) i = l;
          else if (kw.test(l) === !0)
            i = `ionicons ion-${
              n.platform.is.ios === !0 ? "ios" : "md"
            }${l.substring(3)}`;
          else if (Td.test(l) === !0) {
            i = "notranslate material-symbols";
            const c = l.match(Td);
            c !== null && ((l = l.substring(6)), (i += jp[c[1]])), (s = l);
          } else {
            i = "notranslate material-icons";
            const c = l.match(Rw);
            c !== null && ((l = l.substring(2)), (i += Bp[c[1]])), (s = l);
          }
          return { cls: i, content: s };
        });
      return () => {
        const i = {
          class: o.value,
          style: r.value,
          "aria-hidden": "true",
          role: "presentation",
        };
        return a.value.none === !0
          ? k(e.tag, i, ht(t.default))
          : a.value.img === !0
          ? k("span", i, qn(t.default, [k("img", { src: a.value.src })]))
          : a.value.svg === !0
          ? k(
              "span",
              i,
              qn(t.default, [
                k(
                  "svg",
                  { viewBox: a.value.viewBox || "0 0 24 24" },
                  a.value.nodes
                ),
              ])
            )
          : a.value.svguse === !0
          ? k(
              "span",
              i,
              qn(t.default, [
                k("svg", { viewBox: a.value.viewBox }, [
                  k("use", { "xlink:href": a.value.src }),
                ]),
              ])
            )
          : (a.value.cls !== void 0 && (i.class += " " + a.value.cls),
            k(e.tag, i, qn(t.default, [a.value.content])));
      };
    },
  }),
  cn = Ue({
    name: "QAvatar",
    props: {
      ...fi,
      fontSize: String,
      color: String,
      textColor: String,
      icon: String,
      square: Boolean,
      rounded: Boolean,
    },
    setup(e, { slots: t }) {
      const n = di(e),
        r = O(
          () =>
            "q-avatar" +
            (e.color ? ` bg-${e.color}` : "") +
            (e.textColor ? ` text-${e.textColor} q-chip--colored` : "") +
            (e.square === !0
              ? " q-avatar--square"
              : e.rounded === !0
              ? " rounded-borders"
              : "")
        ),
        o = O(() => (e.fontSize ? { fontSize: e.fontSize } : null));
      return () => {
        const a = e.icon !== void 0 ? [k(wt, { name: e.icon })] : void 0;
        return k("div", { class: r.value, style: n.value }, [
          k(
            "div",
            {
              class: "q-avatar__content row flex-center overflow-hidden",
              style: o.value,
            },
            Fp(t.default, a)
          ),
        ]);
      };
    },
  });
const Mw = { size: { type: [Number, String], default: "1em" }, color: String };
function $w(e) {
  return {
    cSize: O(() => (e.size in Mu ? `${Mu[e.size]}px` : e.size)),
    classes: O(() => "q-spinner" + (e.color ? ` text-${e.color}` : "")),
  };
}
var Ea = Ue({
  name: "QSpinner",
  props: { ...Mw, thickness: { type: Number, default: 5 } },
  setup(e) {
    const { cSize: t, classes: n } = $w(e);
    return () =>
      k(
        "svg",
        {
          class: n.value + " q-spinner-mat",
          width: t.value,
          height: t.value,
          viewBox: "25 25 50 50",
        },
        [
          k("circle", {
            class: "path",
            cx: "50",
            cy: "50",
            r: "20",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": e.thickness,
            "stroke-miterlimit": "10",
          }),
        ]
      );
  },
});
function Fu(e, t) {
  const n = e.style;
  for (const r in t) n[r] = t[r];
}
function Fw(e) {
  if (e == null) return;
  if (typeof e == "string")
    try {
      return document.querySelector(e) || void 0;
    } catch {
      return;
    }
  const t = sr(e);
  if (t) return t.$el || t;
}
function Vp(e, t) {
  if (e == null || e.contains(t) === !0) return !0;
  for (let n = e.nextElementSibling; n !== null; n = n.nextElementSibling)
    if (n.contains(t)) return !0;
  return !1;
}
function Nw(e, t = 250) {
  let n = !1,
    r;
  return function () {
    return (
      n === !1 &&
        ((n = !0),
        setTimeout(() => {
          n = !1;
        }, t),
        (r = e.apply(this, arguments))),
      r
    );
  };
}
function Pd(e, t, n, r) {
  n.modifiers.stop === !0 && bn(e);
  const o = n.modifiers.color;
  let a = n.modifiers.center;
  a = a === !0 || r === !0;
  const i = document.createElement("span"),
    l = document.createElement("span"),
    s = sa(e),
    { left: u, top: c, width: f, height: d } = t.getBoundingClientRect(),
    h = Math.sqrt(f * f + d * d),
    v = h / 2,
    m = `${(f - h) / 2}px`,
    g = a ? m : `${s.left - u - v}px`,
    y = `${(d - h) / 2}px`,
    p = a ? y : `${s.top - c - v}px`;
  (l.className = "q-ripple__inner"),
    Fu(l, {
      height: `${h}px`,
      width: `${h}px`,
      transform: `translate3d(${g},${p},0) scale3d(.2,.2,1)`,
      opacity: 0,
    }),
    (i.className = `q-ripple${o ? " text-" + o : ""}`),
    i.setAttribute("dir", "ltr"),
    i.appendChild(l),
    t.appendChild(i);
  const w = () => {
    i.remove(), clearTimeout(b);
  };
  n.abort.push(w);
  let b = setTimeout(() => {
    l.classList.add("q-ripple__inner--enter"),
      (l.style.transform = `translate3d(${m},${y},0) scale3d(1,1,1)`),
      (l.style.opacity = 0.2),
      (b = setTimeout(() => {
        l.classList.remove("q-ripple__inner--enter"),
          l.classList.add("q-ripple__inner--leave"),
          (l.style.opacity = 0),
          (b = setTimeout(() => {
            i.remove(), n.abort.splice(n.abort.indexOf(w), 1);
          }, 275));
      }, 250));
  }, 50);
}
function Rd(e, { modifiers: t, value: n, arg: r }) {
  const o = Object.assign({}, e.cfg.ripple, t, n);
  e.modifiers = {
    early: o.early === !0,
    stop: o.stop === !0,
    center: o.center === !0,
    color: o.color || r,
    keyCodes: [].concat(o.keyCodes || 13),
  };
}
var ir = Nc({
  name: "ripple",
  beforeMount(e, t) {
    const n = t.instance.$.appContext.config.globalProperties.$q.config || {};
    if (n.ripple === !1) return;
    const r = {
      cfg: n,
      enabled: t.value !== !1,
      modifiers: {},
      abort: [],
      start(o) {
        r.enabled === !0 &&
          o.qSkipRipple !== !0 &&
          o.type === (r.modifiers.early === !0 ? "pointerdown" : "click") &&
          Pd(o, e, r, o.qKeyEvent === !0);
      },
      keystart: Nw((o) => {
        r.enabled === !0 &&
          o.qSkipRipple !== !0 &&
          Vr(o, r.modifiers.keyCodes) === !0 &&
          o.type === `key${r.modifiers.early === !0 ? "down" : "up"}` &&
          Pd(o, e, r, !0);
      }, 300),
    };
    Rd(r, t),
      (e.__qripple = r),
      ro(r, "main", [
        [e, "pointerdown", "start", "passive"],
        [e, "click", "start", "passive"],
        [e, "keydown", "keystart", "passive"],
        [e, "keyup", "keystart", "passive"],
      ]);
  },
  updated(e, t) {
    if (t.oldValue !== t.value) {
      const n = e.__qripple;
      n !== void 0 &&
        ((n.enabled = t.value !== !1),
        n.enabled === !0 && Object(t.value) === t.value && Rd(n, t));
    }
  },
  beforeUnmount(e) {
    const t = e.__qripple;
    t !== void 0 &&
      (t.abort.forEach((n) => {
        n();
      }),
      qi(t, "main"),
      delete e._qripple);
  },
});
const qp = {
    left: "start",
    center: "center",
    right: "end",
    between: "between",
    around: "around",
    evenly: "evenly",
    stretch: "stretch",
  },
  Bw = Object.keys(qp),
  Hp = { align: { type: String, validator: (e) => Bw.includes(e) } };
function _p(e) {
  return O(() => {
    const t =
      e.align === void 0 ? (e.vertical === !0 ? "stretch" : "left") : e.align;
    return `${e.vertical === !0 ? "items" : "justify"}-${qp[t]}`;
  });
}
function nl(e) {
  if (Object(e.$parent) === e.$parent) return e.$parent;
  let { parent: t } = e.$;
  for (; Object(t) === t; ) {
    if (Object(t.proxy) === t.proxy) return t.proxy;
    t = t.parent;
  }
}
function Vc(e) {
  return e.appContext.config.globalProperties.$router !== void 0;
}
function qc(e) {
  return e.isUnmounted === !0 || e.isDeactivated === !0;
}
function Ad(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
function Id(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function jw(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n];
    if (typeof r == "string") {
      if (r !== o) return !1;
    } else if (
      Array.isArray(o) === !1 ||
      o.length !== r.length ||
      r.some((a, i) => a !== o[i])
    )
      return !1;
  }
  return !0;
}
function Ld(e, t) {
  return Array.isArray(t) === !0
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function Vw(e, t) {
  return Array.isArray(e) === !0
    ? Ld(e, t)
    : Array.isArray(t) === !0
    ? Ld(t, e)
    : e === t;
}
function qw(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (Vw(e[n], t[n]) === !1) return !1;
  return !0;
}
const Up = {
  to: [String, Object],
  replace: Boolean,
  exact: Boolean,
  activeClass: { type: String, default: "q-router-link--active" },
  exactActiveClass: { type: String, default: "q-router-link--exact-active" },
  href: String,
  target: String,
  disable: Boolean,
};
function zp({ fallbackTag: e, useDisableForRouterLinkProps: t = !0 } = {}) {
  const n = Fe(),
    { props: r, proxy: o, emit: a } = n,
    i = Vc(n),
    l = O(() => r.disable !== !0 && r.href !== void 0),
    s = O(
      t === !0
        ? () =>
            i === !0 &&
            r.disable !== !0 &&
            l.value !== !0 &&
            r.to !== void 0 &&
            r.to !== null &&
            r.to !== ""
        : () =>
            i === !0 &&
            l.value !== !0 &&
            r.to !== void 0 &&
            r.to !== null &&
            r.to !== ""
    ),
    u = O(() => (s.value === !0 ? p(r.to) : null)),
    c = O(() => u.value !== null),
    f = O(() => l.value === !0 || c.value === !0),
    d = O(() => (r.type === "a" || f.value === !0 ? "a" : r.tag || e || "div")),
    h = O(() =>
      l.value === !0
        ? { href: r.href, target: r.target }
        : c.value === !0
        ? { href: u.value.href, target: r.target }
        : {}
    ),
    v = O(() => {
      if (c.value === !1) return -1;
      const { matched: S } = u.value,
        { length: E } = S,
        A = S[E - 1];
      if (A === void 0) return -1;
      const T = o.$route.matched;
      if (T.length === 0) return -1;
      const x = T.findIndex(Id.bind(null, A));
      if (x > -1) return x;
      const C = Ad(S[E - 2]);
      return E > 1 && Ad(A) === C && T[T.length - 1].path !== C
        ? T.findIndex(Id.bind(null, S[E - 2]))
        : x;
    }),
    m = O(
      () =>
        c.value === !0 && v.value !== -1 && jw(o.$route.params, u.value.params)
    ),
    g = O(
      () =>
        m.value === !0 &&
        v.value === o.$route.matched.length - 1 &&
        qw(o.$route.params, u.value.params)
    ),
    y = O(() =>
      c.value === !0
        ? g.value === !0
          ? ` ${r.exactActiveClass} ${r.activeClass}`
          : r.exact === !0
          ? ""
          : m.value === !0
          ? ` ${r.activeClass}`
          : ""
        : ""
    );
  function p(S) {
    try {
      return o.$router.resolve(S);
    } catch {}
    return null;
  }
  function w(
    S,
    { returnRouterError: E, to: A = r.to, replace: T = r.replace } = {}
  ) {
    if (r.disable === !0) return S.preventDefault(), Promise.resolve(!1);
    if (
      S.metaKey ||
      S.altKey ||
      S.ctrlKey ||
      S.shiftKey ||
      (S.button !== void 0 && S.button !== 0) ||
      r.target === "_blank"
    )
      return Promise.resolve(!1);
    S.preventDefault();
    const x = o.$router[T === !0 ? "replace" : "push"](A);
    return E === !0 ? x : x.then(() => {}).catch(() => {});
  }
  function b(S) {
    if (c.value === !0) {
      const E = (A) => w(S, A);
      a("click", S, E), S.defaultPrevented !== !0 && E();
    } else a("click", S);
  }
  return {
    hasRouterLink: c,
    hasHrefLink: l,
    hasLink: f,
    linkTag: d,
    resolvedLink: u,
    linkIsActive: m,
    linkIsExactActive: g,
    linkClass: y,
    linkAttrs: h,
    getLink: p,
    navigateToRouterLink: w,
    navigateOnClick: b,
  };
}
const kd = { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  Hw = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 },
  _w = ["button", "submit", "reset"],
  Uw = /[^\s]\/[^\s]/,
  zw = ["flat", "outline", "push", "unelevated"],
  Kw = (e, t) =>
    e.flat === !0
      ? "flat"
      : e.outline === !0
      ? "outline"
      : e.push === !0
      ? "push"
      : e.unelevated === !0
      ? "unelevated"
      : t,
  Ww = {
    ...fi,
    ...Up,
    type: { type: String, default: "button" },
    label: [Number, String],
    icon: String,
    iconRight: String,
    ...zw.reduce((e, t) => (e[t] = Boolean) && e, {}),
    square: Boolean,
    round: Boolean,
    rounded: Boolean,
    glossy: Boolean,
    size: String,
    fab: Boolean,
    fabMini: Boolean,
    padding: String,
    color: String,
    textColor: String,
    noCaps: Boolean,
    noWrap: Boolean,
    dense: Boolean,
    tabindex: [Number, String],
    ripple: { type: [Boolean, Object], default: !0 },
    align: { ...Hp.align, default: "center" },
    stack: Boolean,
    stretch: Boolean,
    loading: { type: Boolean, default: null },
    disable: Boolean,
  };
function Qw(e) {
  const t = di(e, Hw),
    n = _p(e),
    {
      hasRouterLink: r,
      hasLink: o,
      linkTag: a,
      linkAttrs: i,
      navigateOnClick: l,
    } = zp({ fallbackTag: "button" }),
    s = O(() => {
      const g = e.fab === !1 && e.fabMini === !1 ? t.value : {};
      return e.padding !== void 0
        ? Object.assign({}, g, {
            padding: e.padding
              .split(/\s+/)
              .map((y) => (y in kd ? kd[y] + "px" : y))
              .join(" "),
            minWidth: "0",
            minHeight: "0",
          })
        : g;
    }),
    u = O(() => e.rounded === !0 || e.fab === !0 || e.fabMini === !0),
    c = O(() => e.disable !== !0 && e.loading !== !0),
    f = O(() => (c.value === !0 ? e.tabindex || 0 : -1)),
    d = O(() => Kw(e, "standard")),
    h = O(() => {
      const g = { tabindex: f.value };
      return (
        o.value === !0
          ? Object.assign(g, i.value)
          : _w.includes(e.type) === !0 && (g.type = e.type),
        a.value === "a"
          ? (e.disable === !0
              ? (g["aria-disabled"] = "true")
              : g.href === void 0 && (g.role = "button"),
            r.value !== !0 && Uw.test(e.type) === !0 && (g.type = e.type))
          : e.disable === !0 &&
            ((g.disabled = ""), (g["aria-disabled"] = "true")),
        e.loading === !0 &&
          e.percentage !== void 0 &&
          Object.assign(g, {
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": e.percentage,
          }),
        g
      );
    }),
    v = O(() => {
      let g;
      e.color !== void 0
        ? e.flat === !0 || e.outline === !0
          ? (g = `text-${e.textColor || e.color}`)
          : (g = `bg-${e.color} text-${e.textColor || "white"}`)
        : e.textColor && (g = `text-${e.textColor}`);
      const y =
        e.round === !0
          ? "round"
          : `rectangle${
              u.value === !0
                ? " q-btn--rounded"
                : e.square === !0
                ? " q-btn--square"
                : ""
            }`;
      return (
        `q-btn--${d.value} q-btn--${y}` +
        (g !== void 0 ? " " + g : "") +
        (c.value === !0
          ? " q-btn--actionable q-focusable q-hoverable"
          : e.disable === !0
          ? " disabled"
          : "") +
        (e.fab === !0
          ? " q-btn--fab"
          : e.fabMini === !0
          ? " q-btn--fab-mini"
          : "") +
        (e.noCaps === !0 ? " q-btn--no-uppercase" : "") +
        (e.dense === !0 ? " q-btn--dense" : "") +
        (e.stretch === !0 ? " no-border-radius self-stretch" : "") +
        (e.glossy === !0 ? " glossy" : "") +
        (e.square ? " q-btn--square" : "")
      );
    }),
    m = O(
      () =>
        n.value +
        (e.stack === !0 ? " column" : " row") +
        (e.noWrap === !0 ? " no-wrap text-no-wrap" : "") +
        (e.loading === !0 ? " q-btn__content--hidden" : "")
    );
  return {
    classes: v,
    style: s,
    innerClasses: m,
    attributes: h,
    hasLink: o,
    linkTag: a,
    navigateOnClick: l,
    isActionable: c,
  };
}
const { passiveCapture: xn } = kt;
let Ao = null,
  Io = null,
  Lo = null;
var ot = Ue({
  name: "QBtn",
  props: {
    ...Ww,
    percentage: Number,
    darkPercentage: Boolean,
    onTouchstart: [Function, Array],
  },
  emits: ["click", "keydown", "mousedown", "keyup"],
  setup(e, { slots: t, emit: n }) {
    const { proxy: r } = Fe(),
      {
        classes: o,
        style: a,
        innerClasses: i,
        attributes: l,
        hasLink: s,
        linkTag: u,
        navigateOnClick: c,
        isActionable: f,
      } = Qw(e),
      d = fe(null),
      h = fe(null);
    let v = null,
      m,
      g = null;
    const y = O(() => e.label !== void 0 && e.label !== null && e.label !== ""),
      p = O(() =>
        e.disable === !0 || e.ripple === !1
          ? !1
          : {
              keyCodes: s.value === !0 ? [13, 32] : [13],
              ...(e.ripple === !0 ? {} : e.ripple),
            }
      ),
      w = O(() => ({ center: e.round })),
      b = O(() => {
        const L = Math.max(0, Math.min(100, e.percentage));
        return L > 0
          ? {
              transition: "transform 0.6s",
              transform: `translateX(${L - 100}%)`,
            }
          : {};
      }),
      S = O(() => {
        if (e.loading === !0)
          return {
            onMousedown: $,
            onTouchstart: $,
            onClick: $,
            onKeydown: $,
            onKeyup: $,
          };
        if (f.value === !0) {
          const L = { onClick: A, onKeydown: T, onMousedown: C };
          if (r.$q.platform.has.touch === !0) {
            const G = e.onTouchstart !== void 0 ? "" : "Passive";
            L[`onTouchstart${G}`] = x;
          }
          return L;
        }
        return { onClick: Dt };
      }),
      E = O(() => ({
        ref: d,
        class: "q-btn q-btn-item non-selectable no-outline " + o.value,
        style: a.value,
        ...l.value,
        ...S.value,
      }));
    function A(L) {
      if (d.value !== null) {
        if (L !== void 0) {
          if (L.defaultPrevented === !0) return;
          const G = document.activeElement;
          if (
            e.type === "submit" &&
            G !== document.body &&
            d.value.contains(G) === !1 &&
            G.contains(d.value) === !1
          ) {
            d.value.focus();
            const j = () => {
              document.removeEventListener("keydown", Dt, !0),
                document.removeEventListener("keyup", j, xn),
                d.value !== null && d.value.removeEventListener("blur", j, xn);
            };
            document.addEventListener("keydown", Dt, !0),
              document.addEventListener("keyup", j, xn),
              d.value.addEventListener("blur", j, xn);
          }
        }
        c(L);
      }
    }
    function T(L) {
      d.value !== null &&
        (n("keydown", L),
        Vr(L, [13, 32]) === !0 &&
          Io !== d.value &&
          (Io !== null && I(),
          L.defaultPrevented !== !0 &&
            (d.value.focus(),
            (Io = d.value),
            d.value.classList.add("q-btn--active"),
            document.addEventListener("keyup", D, !0),
            d.value.addEventListener("blur", D, xn)),
          Dt(L)));
    }
    function x(L) {
      d.value !== null &&
        (n("touchstart", L),
        L.defaultPrevented !== !0 &&
          (Ao !== d.value &&
            (Ao !== null && I(),
            (Ao = d.value),
            (v = L.target),
            v.addEventListener("touchcancel", D, xn),
            v.addEventListener("touchend", D, xn)),
          (m = !0),
          g !== null && clearTimeout(g),
          (g = setTimeout(() => {
            (g = null), (m = !1);
          }, 200))));
    }
    function C(L) {
      d.value !== null &&
        ((L.qSkipRipple = m === !0),
        n("mousedown", L),
        L.defaultPrevented !== !0 &&
          Lo !== d.value &&
          (Lo !== null && I(),
          (Lo = d.value),
          d.value.classList.add("q-btn--active"),
          document.addEventListener("mouseup", D, xn)));
    }
    function D(L) {
      if (
        d.value !== null &&
        !(
          L !== void 0 &&
          L.type === "blur" &&
          document.activeElement === d.value
        )
      ) {
        if (L !== void 0 && L.type === "keyup") {
          if (Io === d.value && Vr(L, [13, 32]) === !0) {
            const G = new MouseEvent("click", L);
            (G.qKeyEvent = !0),
              L.defaultPrevented === !0 && an(G),
              L.cancelBubble === !0 && bn(G),
              d.value.dispatchEvent(G),
              Dt(L),
              (L.qKeyEvent = !0);
          }
          n("keyup", L);
        }
        I();
      }
    }
    function I(L) {
      const G = h.value;
      L !== !0 &&
        (Ao === d.value || Lo === d.value) &&
        G !== null &&
        G !== document.activeElement &&
        (G.setAttribute("tabindex", -1), G.focus()),
        Ao === d.value &&
          (v !== null &&
            (v.removeEventListener("touchcancel", D, xn),
            v.removeEventListener("touchend", D, xn)),
          (Ao = v = null)),
        Lo === d.value &&
          (document.removeEventListener("mouseup", D, xn), (Lo = null)),
        Io === d.value &&
          (document.removeEventListener("keyup", D, !0),
          d.value !== null && d.value.removeEventListener("blur", D, xn),
          (Io = null)),
        d.value !== null && d.value.classList.remove("q-btn--active");
    }
    function $(L) {
      Dt(L), (L.qSkipRipple = !0);
    }
    return (
      vt(() => {
        I(!0);
      }),
      Object.assign(r, { click: A }),
      () => {
        let L = [];
        e.icon !== void 0 &&
          L.push(
            k(wt, {
              name: e.icon,
              left: e.stack === !1 && y.value === !0,
              role: "img",
              "aria-hidden": "true",
            })
          ),
          y.value === !0 && L.push(k("span", { class: "block" }, [e.label])),
          (L = qn(t.default, L)),
          e.iconRight !== void 0 &&
            e.round === !1 &&
            L.push(
              k(wt, {
                name: e.iconRight,
                right: e.stack === !1 && y.value === !0,
                role: "img",
                "aria-hidden": "true",
              })
            );
        const G = [k("span", { class: "q-focus-helper", ref: h })];
        return (
          e.loading === !0 &&
            e.percentage !== void 0 &&
            G.push(
              k(
                "span",
                {
                  class:
                    "q-btn__progress absolute-full overflow-hidden" +
                    (e.darkPercentage === !0 ? " q-btn__progress--dark" : ""),
                },
                [
                  k("span", {
                    class: "q-btn__progress-indicator fit block",
                    style: b.value,
                  }),
                ]
              )
            ),
          G.push(
            k(
              "span",
              {
                class:
                  "q-btn__content text-center col items-center q-anchor--skip " +
                  i.value,
              },
              L
            )
          ),
          e.loading !== null &&
            G.push(
              k(Br, { name: "q-transition--fade" }, () =>
                e.loading === !0
                  ? [
                      k(
                        "span",
                        {
                          key: "loading",
                          class: "absolute-full flex flex-center",
                        },
                        t.loading !== void 0 ? t.loading() : [k(Ea)]
                      ),
                    ]
                  : null
              )
            ),
          St(k(u.value, E.value, G), [[ir, p.value, void 0, w.value]])
        );
      }
    );
  },
});
let Gw = 0;
const rl = {},
  ol = {},
  Fn = {},
  Kp = {},
  Xw = /^\s*$/,
  Wp = [],
  Hc = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "top",
    "bottom",
    "left",
    "right",
    "center",
  ],
  Yw = ["top-left", "top-right", "bottom-left", "bottom-right"],
  No = {
    positive: { icon: (e) => e.iconSet.type.positive, color: "positive" },
    negative: { icon: (e) => e.iconSet.type.negative, color: "negative" },
    warning: {
      icon: (e) => e.iconSet.type.warning,
      color: "warning",
      textColor: "dark",
    },
    info: { icon: (e) => e.iconSet.type.info, color: "info" },
    ongoing: { group: !1, timeout: 0, spinner: !0, color: "grey-8" },
  };
function Qp(e, t, n) {
  if (!e) return gi("parameter required");
  let r;
  const o = { textColor: "white" };
  if (
    (e.ignoreDefaults !== !0 && Object.assign(o, rl),
    yo(e) === !1 &&
      (o.type && Object.assign(o, No[o.type]), (e = { message: e })),
    Object.assign(o, No[e.type || o.type], e),
    typeof o.icon == "function" && (o.icon = o.icon(t)),
    o.spinner
      ? (o.spinner === !0 && (o.spinner = Ea), (o.spinner = hr(o.spinner)))
      : (o.spinner = !1),
    (o.meta = {
      hasMedia: Boolean(o.spinner !== !1 || o.icon || o.avatar),
      hasText: Dd(o.message) || Dd(o.caption),
    }),
    o.position)
  ) {
    if (Hc.includes(o.position) === !1) return gi("wrong position", e);
  } else o.position = "bottom";
  if (o.timeout === void 0) o.timeout = 5e3;
  else {
    const s = parseInt(o.timeout, 10);
    if (isNaN(s) || s < 0) return gi("wrong timeout", e);
    o.timeout = s;
  }
  o.timeout === 0
    ? (o.progress = !1)
    : o.progress === !0 &&
      ((o.meta.progressClass =
        "q-notification__progress" +
        (o.progressClass ? ` ${o.progressClass}` : "")),
      (o.meta.progressStyle = { animationDuration: `${o.timeout + 1e3}ms` }));
  const a = (Array.isArray(e.actions) === !0 ? e.actions : [])
      .concat(
        e.ignoreDefaults !== !0 && Array.isArray(rl.actions) === !0
          ? rl.actions
          : []
      )
      .concat(
        No[e.type] !== void 0 && Array.isArray(No[e.type].actions) === !0
          ? No[e.type].actions
          : []
      ),
    { closeBtn: i } = o;
  if (
    (i && a.push({ label: typeof i == "string" ? i : t.lang.label.close }),
    (o.actions = a.map(({ handler: s, noDismiss: u, ...c }) => ({
      flat: !0,
      ...c,
      onClick:
        typeof s == "function"
          ? () => {
              s(), u !== !0 && l();
            }
          : () => {
              l();
            },
    }))),
    o.multiLine === void 0 && (o.multiLine = o.actions.length > 1),
    Object.assign(o.meta, {
      class:
        `q-notification row items-stretch q-notification--${
          o.multiLine === !0 ? "multi-line" : "standard"
        }` +
        (o.color !== void 0 ? ` bg-${o.color}` : "") +
        (o.textColor !== void 0 ? ` text-${o.textColor}` : "") +
        (o.classes !== void 0 ? ` ${o.classes}` : ""),
      wrapperClass:
        "q-notification__wrapper col relative-position border-radius-inherit " +
        (o.multiLine === !0
          ? "column no-wrap justify-center"
          : "row items-center"),
      contentClass:
        "q-notification__content row items-center" +
        (o.multiLine === !0 ? "" : " col"),
      leftClass: o.meta.hasText === !0 ? "additional" : "single",
      attrs: { role: "alert", ...o.attrs },
    }),
    o.group === !1
      ? ((o.group = void 0), (o.meta.group = void 0))
      : ((o.group === void 0 || o.group === !0) &&
          (o.group = [o.message, o.caption, o.multiline]
            .concat(o.actions.map((s) => `${s.label}*${s.icon}`))
            .join("|")),
        (o.meta.group = o.group + "|" + o.position)),
    o.actions.length === 0
      ? (o.actions = void 0)
      : (o.meta.actionsClass =
          "q-notification__actions row items-center " +
          (o.multiLine === !0 ? "justify-end" : "col-auto") +
          (o.meta.hasMedia === !0
            ? " q-notification__actions--with-media"
            : "")),
    n !== void 0)
  ) {
    n.notif.meta.timer &&
      (clearTimeout(n.notif.meta.timer), (n.notif.meta.timer = void 0)),
      (o.meta.uid = n.notif.meta.uid);
    const s = Fn[o.position].value.indexOf(n.notif);
    Fn[o.position].value[s] = o;
  } else {
    const s = ol[o.meta.group];
    if (s === void 0) {
      if (
        ((o.meta.uid = Gw++),
        (o.meta.badge = 1),
        ["left", "right", "center"].indexOf(o.position) !== -1)
      )
        Fn[o.position].value.splice(
          Math.floor(Fn[o.position].value.length / 2),
          0,
          o
        );
      else {
        const u = o.position.indexOf("top") > -1 ? "unshift" : "push";
        Fn[o.position].value[u](o);
      }
      o.group !== void 0 && (ol[o.meta.group] = o);
    } else {
      if (
        (s.meta.timer && (clearTimeout(s.meta.timer), (s.meta.timer = void 0)),
        o.badgePosition !== void 0)
      ) {
        if (Yw.includes(o.badgePosition) === !1)
          return gi("wrong badgePosition", e);
      } else
        o.badgePosition = `top-${
          o.position.indexOf("left") > -1 ? "right" : "left"
        }`;
      (o.meta.uid = s.meta.uid),
        (o.meta.badge = s.meta.badge + 1),
        (o.meta.badgeClass =
          `q-notification__badge q-notification__badge--${o.badgePosition}` +
          (o.badgeColor !== void 0 ? ` bg-${o.badgeColor}` : "") +
          (o.badgeTextColor !== void 0 ? ` text-${o.badgeTextColor}` : "") +
          (o.badgeClass ? ` ${o.badgeClass}` : ""));
      const u = Fn[o.position].value.indexOf(s);
      Fn[o.position].value[u] = ol[o.meta.group] = o;
    }
  }
  const l = () => {
    Jw(o), (r = void 0);
  };
  if (
    (o.timeout > 0 &&
      (o.meta.timer = setTimeout(() => {
        (o.meta.timer = void 0), l();
      }, o.timeout + 1e3)),
    o.group !== void 0)
  )
    return (s) => {
      s !== void 0
        ? gi("trying to update a grouped one which is forbidden", e)
        : l();
    };
  if (((r = { dismiss: l, config: e, notif: o }), n !== void 0)) {
    Object.assign(n, r);
    return;
  }
  return (s) => {
    if (r !== void 0)
      if (s === void 0) r.dismiss();
      else {
        const u = Object.assign({}, r.config, s, {
          group: !1,
          position: o.position,
        });
        Qp(u, t, r);
      }
  };
}
function Jw(e) {
  e.meta.timer && (clearTimeout(e.meta.timer), (e.meta.timer = void 0));
  const t = Fn[e.position].value.indexOf(e);
  if (t !== -1) {
    e.group !== void 0 && delete ol[e.meta.group];
    const n = Wp["" + e.meta.uid];
    if (n) {
      const { width: r, height: o } = getComputedStyle(n);
      (n.style.left = `${n.offsetLeft}px`),
        (n.style.width = r),
        (n.style.height = o);
    }
    Fn[e.position].value.splice(t, 1),
      typeof e.onDismiss == "function" && e.onDismiss();
  }
}
function Dd(e) {
  return e != null && Xw.test(e) !== !0;
}
function gi(e, t) {
  return console.error(`Notify: ${e}`, t), !1;
}
function Zw() {
  return Ue({
    name: "QNotifications",
    devtools: { hide: !0 },
    setup() {
      return () =>
        k(
          "div",
          { class: "q-notifications" },
          Hc.map((e) =>
            k(
              np,
              {
                key: e,
                class: Kp[e],
                tag: "div",
                name: `q-notification--${e}`,
              },
              () =>
                Fn[e].value.map((t) => {
                  const n = t.meta,
                    r = [];
                  if (
                    (n.hasMedia === !0 &&
                      (t.spinner !== !1
                        ? r.push(
                            k(t.spinner, {
                              class:
                                "q-notification__spinner q-notification__spinner--" +
                                n.leftClass,
                              color: t.spinnerColor,
                              size: t.spinnerSize,
                            })
                          )
                        : t.icon
                        ? r.push(
                            k(wt, {
                              class:
                                "q-notification__icon q-notification__icon--" +
                                n.leftClass,
                              name: t.icon,
                              color: t.iconColor,
                              size: t.iconSize,
                              role: "img",
                            })
                          )
                        : t.avatar &&
                          r.push(
                            k(
                              cn,
                              {
                                class:
                                  "q-notification__avatar q-notification__avatar--" +
                                  n.leftClass,
                              },
                              () =>
                                k("img", {
                                  src: t.avatar,
                                  "aria-hidden": "true",
                                })
                            )
                          )),
                    n.hasText === !0)
                  ) {
                    let a;
                    const i = { class: "q-notification__message col" };
                    if (t.html === !0)
                      i.innerHTML = t.caption
                        ? `<div>${t.message}</div><div class="q-notification__caption">${t.caption}</div>`
                        : t.message;
                    else {
                      const l = [t.message];
                      a = t.caption
                        ? [
                            k("div", l),
                            k("div", { class: "q-notification__caption" }, [
                              t.caption,
                            ]),
                          ]
                        : l;
                    }
                    r.push(k("div", i, a));
                  }
                  const o = [k("div", { class: n.contentClass }, r)];
                  return (
                    t.progress === !0 &&
                      o.push(
                        k("div", {
                          key: `${n.uid}|p|${n.badge}`,
                          class: n.progressClass,
                          style: n.progressStyle,
                        })
                      ),
                    t.actions !== void 0 &&
                      o.push(
                        k(
                          "div",
                          { class: n.actionsClass },
                          t.actions.map((a) => k(ot, a))
                        )
                      ),
                    n.badge > 1 &&
                      o.push(
                        k(
                          "div",
                          {
                            key: `${n.uid}|${n.badge}`,
                            class: t.meta.badgeClass,
                            style: t.badgeStyle,
                          },
                          [n.badge]
                        )
                      ),
                    k(
                      "div",
                      {
                        ref: (a) => {
                          Wp["" + n.uid] = a;
                        },
                        key: n.uid,
                        class: n.class,
                        ...n.attrs,
                      },
                      [k("div", { class: n.wrapperClass }, o)]
                    )
                  );
                })
            )
          )
        );
    },
  });
}
var Nu = {
  setDefaults(e) {
    yo(e) === !0 && Object.assign(rl, e);
  },
  registerType(e, t) {
    yo(t) === !0 && (No[e] = t);
  },
  install({ $q: e, parentApp: t }) {
    if (
      ((e.notify = this.create = (n) => Qp(n, e)),
      (e.notify.setDefaults = this.setDefaults),
      (e.notify.registerType = this.registerType),
      e.config.notify !== void 0 && this.setDefaults(e.config.notify),
      this.__installed !== !0)
    ) {
      Hc.forEach((r) => {
        Fn[r] = fe([]);
        const o =
            ["left", "center", "right"].includes(r) === !0
              ? "center"
              : r.indexOf("top") > -1
              ? "top"
              : "bottom",
          a =
            r.indexOf("left") > -1
              ? "start"
              : r.indexOf("right") > -1
              ? "end"
              : "center",
          i = ["left", "right"].includes(r)
            ? `items-${r === "left" ? "start" : "end"} justify-center`
            : r === "center"
            ? "flex-center"
            : `items-${a}`;
        Kp[
          r
        ] = `q-notifications__list q-notifications__list--${o} fixed column no-wrap ${i}`;
      });
      const n = Fc("q-notify");
      Sp(Zw(), t).mount(n);
    }
  },
};
function ex(e) {
  return Tu(e) === !0
    ? "__q_date|" + e.toUTCString()
    : X0(e) === !0
    ? "__q_expr|" + e.source
    : typeof e == "number"
    ? "__q_numb|" + e
    : typeof e == "boolean"
    ? "__q_bool|" + (e ? "1" : "0")
    : typeof e == "string"
    ? "__q_strn|" + e
    : typeof e == "function"
    ? "__q_strn|" + e.toString()
    : e === Object(e)
    ? "__q_objt|" + JSON.stringify(e)
    : e;
}
function tx(e) {
  if (e.length < 9) return e;
  const n = e.substring(0, 8),
    r = e.substring(9);
  switch (n) {
    case "__q_date":
      return new Date(r);
    case "__q_expr":
      return new RegExp(r);
    case "__q_numb":
      return Number(r);
    case "__q_bool":
      return Boolean(r === "1");
    case "__q_strn":
      return "" + r;
    case "__q_objt":
      return JSON.parse(r);
    default:
      return e;
  }
}
function nx() {
  const e = () => null;
  return {
    has: () => !1,
    getLength: () => 0,
    getItem: e,
    getIndex: e,
    getKey: e,
    getAll: () => {},
    getAllKeys: () => [],
    set: en,
    remove: en,
    clear: en,
    isEmpty: () => !0,
  };
}
function rx(e) {
  const t = window[e + "Storage"],
    n = (r) => {
      const o = t.getItem(r);
      return o ? tx(o) : null;
    };
  return {
    has: (r) => t.getItem(r) !== null,
    getLength: () => t.length,
    getItem: n,
    getIndex: (r) => (r < t.length ? n(t.key(r)) : null),
    getKey: (r) => (r < t.length ? t.key(r) : null),
    getAll: () => {
      let r;
      const o = {},
        a = t.length;
      for (let i = 0; i < a; i++) (r = t.key(i)), (o[r] = n(r));
      return o;
    },
    getAllKeys: () => {
      const r = [],
        o = t.length;
      for (let a = 0; a < o; a++) r.push(t.key(a));
      return r;
    },
    set: (r, o) => {
      t.setItem(r, ex(o));
    },
    remove: (r) => {
      t.removeItem(r);
    },
    clear: () => {
      t.clear();
    },
    isEmpty: () => t.length === 0,
  };
}
const Gp = ft.has.webStorage === !1 ? nx() : rx("local"),
  Kn = {
    install({ $q: e }) {
      e.localStorage = Gp;
    },
  };
Object.assign(Kn, Gp);
var ox = {
  config: {
    brand: { primary: "rgb(48, 182, 119)", secondary: "#2755a6" },
    loadingBar: { position: "top" },
    notify: { position: "top" },
  },
  plugins: { LoadingBar: Du, Notify: Nu, LocalStorage: Kn },
};
const ix = "/";
async function ax({ app: e, router: t, store: n }, r) {
  let o = !1;
  const a = (s) => {
      try {
        return t.resolve(s).href;
      } catch {}
      return Object(s) === s ? null : s;
    },
    i = (s) => {
      if (((o = !0), typeof s == "string" && /^https?:\/\//.test(s))) {
        window.location.href = s;
        return;
      }
      const u = a(s);
      u !== null && ((window.location.href = u), window.location.reload());
    },
    l = window.location.href.replace(window.location.origin, "");
  for (let s = 0; o === !1 && s < r.length; s++)
    try {
      await r[s]({
        app: e,
        router: t,
        store: n,
        ssrContext: null,
        redirect: i,
        urlPath: l,
        publicPath: ix,
      });
    } catch (u) {
      if (u && u.url) {
        i(u.url);
        return;
      }
      console.error("[Quasar] boot error:", u);
      return;
    }
  o !== !0 && (e.use(t), e.mount("#q-app"));
}
gw(Ac, ox).then((e) => {
  const [t, n] =
    Promise.allSettled !== void 0
      ? [
          "allSettled",
          (r) =>
            r.map((o) => {
              if (o.status === "rejected") {
                console.error("[Quasar] boot error:", o.reason);
                return;
              }
              return o.value.default;
            }),
        ]
      : ["all", (r) => r.map((o) => o.default)];
  return Promise[t]([
    to(
      () =>
        Promise.resolve().then(function () {
          return PC;
        }),
      void 0
    ),
    to(
      () =>
        Promise.resolve().then(function () {
          return OC;
        }),
      void 0
    ),
    to(
      () =>
        Promise.resolve().then(function () {
          return TC;
        }),
      void 0
    ),
  ]).then((r) => {
    const o = n(r).filter((a) => typeof a == "function");
    ax(e, o);
  });
});
var Xp = Ue({
    name: "QToolbarTitle",
    props: { shrink: Boolean },
    setup(e, { slots: t }) {
      const n = O(
        () =>
          "q-toolbar__title ellipsis" + (e.shrink === !0 ? " col-shrink" : "")
      );
      return () => k("div", { class: n.value }, ht(t.default));
    },
  }),
  Bu = Ue({
    name: "QToolbar",
    props: { inset: Boolean },
    setup(e, { slots: t }) {
      const n = O(
        () =>
          "q-toolbar row no-wrap items-center" +
          (e.inset === !0 ? " q-toolbar--inset" : "")
      );
      return () => k("div", { class: n.value, role: "toolbar" }, ht(t.default));
    },
  });
function lx() {
  const e = fe(!_n.value);
  return (
    e.value === !1 &&
      Ft(() => {
        e.value = !0;
      }),
    e
  );
}
const Yp = typeof ResizeObserver != "undefined",
  Md =
    Yp === !0
      ? {}
      : {
          style:
            "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
          url: "about:blank",
        };
var Al = Ue({
    name: "QResizeObserver",
    props: { debounce: { type: [String, Number], default: 100 } },
    emits: ["resize"],
    setup(e, { emit: t }) {
      let n = null,
        r,
        o = { width: -1, height: -1 };
      function a(c) {
        c === !0 || e.debounce === 0 || e.debounce === "0"
          ? i()
          : n === null && (n = setTimeout(i, e.debounce));
      }
      function i() {
        if ((n !== null && (clearTimeout(n), (n = null)), r)) {
          const { offsetWidth: c, offsetHeight: f } = r;
          (c !== o.width || f !== o.height) &&
            ((o = { width: c, height: f }), t("resize", o));
        }
      }
      const { proxy: l } = Fe();
      if (Yp === !0) {
        let c;
        const f = (d) => {
          (r = l.$el.parentNode),
            r
              ? ((c = new ResizeObserver(a)), c.observe(r), i())
              : d !== !0 &&
                at(() => {
                  f(!0);
                });
        };
        return (
          Ft(() => {
            f();
          }),
          vt(() => {
            n !== null && clearTimeout(n),
              c !== void 0 &&
                (c.disconnect !== void 0
                  ? c.disconnect()
                  : r && c.unobserve(r));
          }),
          en
        );
      } else {
        let d = function () {
            n !== null && (clearTimeout(n), (n = null)),
              f !== void 0 &&
                (f.removeEventListener !== void 0 &&
                  f.removeEventListener("resize", a, kt.passive),
                (f = void 0));
          },
          h = function () {
            d(),
              r &&
                r.contentDocument &&
                ((f = r.contentDocument.defaultView),
                f.addEventListener("resize", a, kt.passive),
                i());
          };
        var s = d,
          u = h;
        const c = lx();
        let f;
        return (
          Ft(() => {
            at(() => {
              (r = l.$el), r && h();
            });
          }),
          vt(d),
          (l.trigger = a),
          () => {
            if (c.value === !0)
              return k("object", {
                style: Md.style,
                tabindex: -1,
                type: "text/html",
                data: Md.url,
                "aria-hidden": "true",
                onLoad: h,
              });
          }
        );
      }
    },
  }),
  Jp = Ue({
    name: "QHeader",
    props: {
      modelValue: { type: Boolean, default: !0 },
      reveal: Boolean,
      revealOffset: { type: Number, default: 250 },
      bordered: Boolean,
      elevated: Boolean,
      heightHint: { type: [String, Number], default: 50 },
    },
    emits: ["reveal", "focusin"],
    setup(e, { slots: t, emit: n }) {
      const {
          proxy: { $q: r },
        } = Fe(),
        o = qt(wo, $t);
      if (o === $t)
        return console.error("QHeader needs to be child of QLayout"), $t;
      const a = fe(parseInt(e.heightHint, 10)),
        i = fe(!0),
        l = O(
          () =>
            e.reveal === !0 ||
            o.view.value.indexOf("H") > -1 ||
            (r.platform.is.ios && o.isContainer.value === !0)
        ),
        s = O(() => {
          if (e.modelValue !== !0) return 0;
          if (l.value === !0) return i.value === !0 ? a.value : 0;
          const p = a.value - o.scroll.value.position;
          return p > 0 ? p : 0;
        }),
        u = O(() => e.modelValue !== !0 || (l.value === !0 && i.value !== !0)),
        c = O(() => e.modelValue === !0 && u.value === !0 && e.reveal === !0),
        f = O(
          () =>
            "q-header q-layout__section--marginal " +
            (l.value === !0 ? "fixed" : "absolute") +
            "-top" +
            (e.bordered === !0 ? " q-header--bordered" : "") +
            (u.value === !0 ? " q-header--hidden" : "") +
            (e.modelValue !== !0 ? " q-layout--prevent-focus" : "")
        ),
        d = O(() => {
          const p = o.rows.value.top,
            w = {};
          return (
            p[0] === "l" &&
              o.left.space === !0 &&
              (w[r.lang.rtl === !0 ? "right" : "left"] = `${o.left.size}px`),
            p[2] === "r" &&
              o.right.space === !0 &&
              (w[r.lang.rtl === !0 ? "left" : "right"] = `${o.right.size}px`),
            w
          );
        });
      function h(p, w) {
        o.update("header", p, w);
      }
      function v(p, w) {
        p.value !== w && (p.value = w);
      }
      function m({ height: p }) {
        v(a, p), h("size", p);
      }
      function g(p) {
        c.value === !0 && v(i, !0), n("focusin", p);
      }
      me(
        () => e.modelValue,
        (p) => {
          h("space", p), v(i, !0), o.animate();
        }
      ),
        me(s, (p) => {
          h("offset", p);
        }),
        me(
          () => e.reveal,
          (p) => {
            p === !1 && v(i, e.modelValue);
          }
        ),
        me(i, (p) => {
          o.animate(), n("reveal", p);
        }),
        me(o.scroll, (p) => {
          e.reveal === !0 &&
            v(
              i,
              p.direction === "up" ||
                p.position <= e.revealOffset ||
                p.position - p.inflectionPoint < 100
            );
        });
      const y = {};
      return (
        (o.instances.header = y),
        e.modelValue === !0 && h("size", a.value),
        h("space", e.modelValue),
        h("offset", s.value),
        vt(() => {
          o.instances.header === y &&
            ((o.instances.header = void 0),
            h("size", 0),
            h("offset", 0),
            h("space", !1));
        }),
        () => {
          const p = jc(t.default, []);
          return (
            e.elevated === !0 &&
              p.push(
                k("div", {
                  class:
                    "q-layout__shadow absolute-full overflow-hidden no-pointer-events",
                })
              ),
            p.push(k(Al, { debounce: 0, onResize: m })),
            k("header", { class: f.value, style: d.value, onFocusin: g }, p)
          );
        }
      );
    },
  });
function Zp(e, t, n) {
  let r;
  function o() {
    r !== void 0 && (ua.remove(r), (r = void 0));
  }
  return (
    vt(() => {
      e.value === !0 && o();
    }),
    {
      removeFromHistory: o,
      addToHistory() {
        (r = { condition: () => n.value === !0, handler: t }), ua.add(r);
      },
    }
  );
}
const _c = {
    modelValue: { type: Boolean, default: null },
    "onUpdate:modelValue": [Function, Array],
  },
  Uc = ["beforeShow", "show", "beforeHide", "hide"];
function zc({
  showing: e,
  canShow: t,
  hideOnRouteChange: n,
  handleShow: r,
  handleHide: o,
  processOnMount: a,
}) {
  const i = Fe(),
    { props: l, emit: s, proxy: u } = i;
  let c;
  function f(p) {
    e.value === !0 ? v(p) : d(p);
  }
  function d(p) {
    if (
      l.disable === !0 ||
      (p !== void 0 && p.qAnchorHandled === !0) ||
      (t !== void 0 && t(p) !== !0)
    )
      return;
    const w = l["onUpdate:modelValue"] !== void 0;
    w === !0 &&
      (s("update:modelValue", !0),
      (c = p),
      at(() => {
        c === p && (c = void 0);
      })),
      (l.modelValue === null || w === !1) && h(p);
  }
  function h(p) {
    e.value !== !0 &&
      ((e.value = !0), s("beforeShow", p), r !== void 0 ? r(p) : s("show", p));
  }
  function v(p) {
    if (l.disable === !0) return;
    const w = l["onUpdate:modelValue"] !== void 0;
    w === !0 &&
      (s("update:modelValue", !1),
      (c = p),
      at(() => {
        c === p && (c = void 0);
      })),
      (l.modelValue === null || w === !1) && m(p);
  }
  function m(p) {
    e.value !== !1 &&
      ((e.value = !1), s("beforeHide", p), o !== void 0 ? o(p) : s("hide", p));
  }
  function g(p) {
    l.disable === !0 && p === !0
      ? l["onUpdate:modelValue"] !== void 0 && s("update:modelValue", !1)
      : (p === !0) !== e.value && (p === !0 ? h : m)(c);
  }
  me(() => l.modelValue, g),
    n !== void 0 &&
      Vc(i) === !0 &&
      me(
        () => u.$route.fullPath,
        () => {
          n.value === !0 && e.value === !0 && v();
        }
      ),
    a === !0 &&
      Ft(() => {
        g(l.modelValue);
      });
  const y = { show: d, hide: v, toggle: f };
  return Object.assign(u, y), y;
}
const sx = [
  null,
  document,
  document.body,
  document.scrollingElement,
  document.documentElement,
];
function Kc(e, t) {
  let n = Fw(t);
  if (n === void 0) {
    if (e == null) return window;
    n = e.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return sx.includes(n) ? window : n;
}
function em(e) {
  return e === window
    ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0
    : e.scrollTop;
}
function tm(e) {
  return e === window
    ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
    : e.scrollLeft;
}
let qa;
function il() {
  if (qa !== void 0) return qa;
  const e = document.createElement("p"),
    t = document.createElement("div");
  Fu(e, { width: "100%", height: "200px" }),
    Fu(t, {
      position: "absolute",
      top: "0px",
      left: "0px",
      visibility: "hidden",
      width: "200px",
      height: "150px",
      overflow: "hidden",
    }),
    t.appendChild(e),
    document.body.appendChild(t);
  const n = e.offsetWidth;
  t.style.overflow = "scroll";
  let r = e.offsetWidth;
  return n === r && (r = t.clientWidth), t.remove(), (qa = n - r), qa;
}
function ux(e, t = !0) {
  return !e || e.nodeType !== Node.ELEMENT_NODE
    ? !1
    : t
    ? e.scrollHeight > e.clientHeight &&
      (e.classList.contains("scroll") ||
        e.classList.contains("overflow-auto") ||
        ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"]))
    : e.scrollWidth > e.clientWidth &&
      (e.classList.contains("scroll") ||
        e.classList.contains("overflow-auto") ||
        ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"]));
}
let yi = 0,
  Ms,
  $s,
  Ai,
  Fs = !1,
  $d,
  Fd,
  Nd,
  Kr = null;
function cx(e) {
  fx(e) && Dt(e);
}
function fx(e) {
  if (
    e.target === document.body ||
    e.target.classList.contains("q-layout__backdrop")
  )
    return !0;
  const t = F0(e),
    n = e.shiftKey && !e.deltaX,
    r = !n && Math.abs(e.deltaX) <= Math.abs(e.deltaY),
    o = n || r ? e.deltaY : e.deltaX;
  for (let a = 0; a < t.length; a++) {
    const i = t[a];
    if (ux(i, r))
      return r
        ? o < 0 && i.scrollTop === 0
          ? !0
          : o > 0 && i.scrollTop + i.clientHeight === i.scrollHeight
        : o < 0 && i.scrollLeft === 0
        ? !0
        : o > 0 && i.scrollLeft + i.clientWidth === i.scrollWidth;
  }
  return !0;
}
function Bd(e) {
  e.target === document &&
    (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop);
}
function Ha(e) {
  Fs !== !0 &&
    ((Fs = !0),
    requestAnimationFrame(() => {
      Fs = !1;
      const { height: t } = e.target,
        { clientHeight: n, scrollTop: r } = document.scrollingElement;
      (Ai === void 0 || t !== window.innerHeight) &&
        ((Ai = n - t), (document.scrollingElement.scrollTop = r)),
        r > Ai &&
          (document.scrollingElement.scrollTop -= Math.ceil((r - Ai) / 8));
    }));
}
function jd(e) {
  const t = document.body,
    n = window.visualViewport !== void 0;
  if (e === "add") {
    const { overflowY: r, overflowX: o } = window.getComputedStyle(t);
    (Ms = tm(window)),
      ($s = em(window)),
      ($d = t.style.left),
      (Fd = t.style.top),
      (Nd = window.location.href),
      (t.style.left = `-${Ms}px`),
      (t.style.top = `-${$s}px`),
      o !== "hidden" &&
        (o === "scroll" || t.scrollWidth > window.innerWidth) &&
        t.classList.add("q-body--force-scrollbar-x"),
      r !== "hidden" &&
        (r === "scroll" || t.scrollHeight > window.innerHeight) &&
        t.classList.add("q-body--force-scrollbar-y"),
      t.classList.add("q-body--prevent-scroll"),
      (document.qScrollPrevented = !0),
      ft.is.ios === !0 &&
        (n === !0
          ? (window.scrollTo(0, 0),
            window.visualViewport.addEventListener(
              "resize",
              Ha,
              kt.passiveCapture
            ),
            window.visualViewport.addEventListener(
              "scroll",
              Ha,
              kt.passiveCapture
            ),
            window.scrollTo(0, 0))
          : window.addEventListener("scroll", Bd, kt.passiveCapture));
  }
  ft.is.desktop === !0 &&
    ft.is.mac === !0 &&
    window[`${e}EventListener`]("wheel", cx, kt.notPassive),
    e === "remove" &&
      (ft.is.ios === !0 &&
        (n === !0
          ? (window.visualViewport.removeEventListener(
              "resize",
              Ha,
              kt.passiveCapture
            ),
            window.visualViewport.removeEventListener(
              "scroll",
              Ha,
              kt.passiveCapture
            ))
          : window.removeEventListener("scroll", Bd, kt.passiveCapture)),
      t.classList.remove("q-body--prevent-scroll"),
      t.classList.remove("q-body--force-scrollbar-x"),
      t.classList.remove("q-body--force-scrollbar-y"),
      (document.qScrollPrevented = !1),
      (t.style.left = $d),
      (t.style.top = Fd),
      window.location.href === Nd && window.scrollTo(Ms, $s),
      (Ai = void 0));
}
function dx(e) {
  let t = "add";
  if (e === !0) {
    if ((yi++, Kr !== null)) {
      clearTimeout(Kr), (Kr = null);
      return;
    }
    if (yi > 1) return;
  } else {
    if (yi === 0 || (yi--, yi > 0)) return;
    if (((t = "remove"), ft.is.ios === !0 && ft.is.nativeMobile === !0)) {
      Kr !== null && clearTimeout(Kr),
        (Kr = setTimeout(() => {
          jd(t), (Kr = null);
        }, 100));
      return;
    }
  }
  jd(t);
}
function nm() {
  let e;
  return {
    preventBodyScroll(t) {
      t !== e && (e !== void 0 || t === !0) && ((e = t), dx(t));
    },
  };
}
function Wc() {
  let e = null;
  const t = Fe();
  function n() {
    e !== null && (clearTimeout(e), (e = null));
  }
  return (
    qr(n),
    vt(n),
    {
      removeTimeout: n,
      registerTimeout(r, o) {
        n(), qc(t) === !1 && (e = setTimeout(r, o));
      },
    }
  );
}
const In = { dark: { type: Boolean, default: null } };
function Ln(e, t) {
  return O(() => (e.dark === null ? t.dark.isActive : e.dark));
}
const Qc = {
    left: !0,
    right: !0,
    up: !0,
    down: !0,
    horizontal: !0,
    vertical: !0,
  },
  hx = Object.keys(Qc);
Qc.all = !0;
function Vd(e) {
  const t = {};
  for (const n of hx) e[n] === !0 && (t[n] = !0);
  return Object.keys(t).length === 0
    ? Qc
    : (t.horizontal === !0
        ? (t.left = t.right = !0)
        : t.left === !0 && t.right === !0 && (t.horizontal = !0),
      t.vertical === !0
        ? (t.up = t.down = !0)
        : t.up === !0 && t.down === !0 && (t.vertical = !0),
      t.horizontal === !0 && t.vertical === !0 && (t.all = !0),
      t);
}
const vx = ["INPUT", "TEXTAREA"];
function qd(e, t) {
  return (
    t.event === void 0 &&
    e.target !== void 0 &&
    e.target.draggable !== !0 &&
    typeof t.handler == "function" &&
    vx.includes(e.target.nodeName.toUpperCase()) === !1 &&
    (e.qClonedBy === void 0 || e.qClonedBy.indexOf(t.uid) === -1)
  );
}
function rm() {
  if (window.getSelection !== void 0) {
    const e = window.getSelection();
    e.empty !== void 0
      ? e.empty()
      : e.removeAllRanges !== void 0 &&
        (e.removeAllRanges(),
        Cl.is.mobile !== !0 && e.addRange(document.createRange()));
  } else document.selection !== void 0 && document.selection.empty();
}
function Ns(e, t, n) {
  const r = sa(e);
  let o,
    a = r.left - t.event.x,
    i = r.top - t.event.y,
    l = Math.abs(a),
    s = Math.abs(i);
  const u = t.direction;
  u.horizontal === !0 && u.vertical !== !0
    ? (o = a < 0 ? "left" : "right")
    : u.horizontal !== !0 && u.vertical === !0
    ? (o = i < 0 ? "up" : "down")
    : u.up === !0 && i < 0
    ? ((o = "up"),
      l > s &&
        (u.left === !0 && a < 0
          ? (o = "left")
          : u.right === !0 && a > 0 && (o = "right")))
    : u.down === !0 && i > 0
    ? ((o = "down"),
      l > s &&
        (u.left === !0 && a < 0
          ? (o = "left")
          : u.right === !0 && a > 0 && (o = "right")))
    : u.left === !0 && a < 0
    ? ((o = "left"),
      l < s &&
        (u.up === !0 && i < 0
          ? (o = "up")
          : u.down === !0 && i > 0 && (o = "down")))
    : u.right === !0 &&
      a > 0 &&
      ((o = "right"),
      l < s &&
        (u.up === !0 && i < 0
          ? (o = "up")
          : u.down === !0 && i > 0 && (o = "down")));
  let c = !1;
  if (o === void 0 && n === !1) {
    if (t.event.isFirst === !0 || t.event.lastDir === void 0) return {};
    (o = t.event.lastDir),
      (c = !0),
      o === "left" || o === "right"
        ? ((r.left -= a), (l = 0), (a = 0))
        : ((r.top -= i), (s = 0), (i = 0));
  }
  return {
    synthetic: c,
    payload: {
      evt: e,
      touch: t.event.mouse !== !0,
      mouse: t.event.mouse === !0,
      position: r,
      direction: o,
      isFirst: t.event.isFirst,
      isFinal: n === !0,
      duration: Date.now() - t.event.time,
      distance: { x: l, y: s },
      offset: { x: a, y: i },
      delta: { x: r.left - t.event.lastX, y: r.top - t.event.lastY },
    },
  };
}
let px = 0;
var Bs = Nc({
  name: "touch-pan",
  beforeMount(e, { value: t, modifiers: n }) {
    if (n.mouse !== !0 && ft.has.touch !== !0) return;
    function r(a, i) {
      n.mouse === !0 && i === !0
        ? Dt(a)
        : (n.stop === !0 && bn(a), n.prevent === !0 && an(a));
    }
    const o = {
      uid: "qvtp_" + px++,
      handler: t,
      modifiers: n,
      direction: Vd(n),
      noop: en,
      mouseStart(a) {
        qd(a, o) &&
          $0(a) &&
          (ro(o, "temp", [
            [document, "mousemove", "move", "notPassiveCapture"],
            [document, "mouseup", "end", "passiveCapture"],
          ]),
          o.start(a, !0));
      },
      touchStart(a) {
        if (qd(a, o)) {
          const i = a.target;
          ro(o, "temp", [
            [i, "touchmove", "move", "notPassiveCapture"],
            [i, "touchcancel", "end", "passiveCapture"],
            [i, "touchend", "end", "passiveCapture"],
          ]),
            o.start(a);
        }
      },
      start(a, i) {
        if (
          (ft.is.firefox === !0 && Ts(e, !0),
          (o.lastEvt = a),
          i === !0 || n.stop === !0)
        ) {
          if (
            o.direction.all !== !0 &&
            (i !== !0 ||
              (o.modifiers.mouseAllDir !== !0 &&
                o.modifiers.mousealldir !== !0))
          ) {
            const u =
              a.type.indexOf("mouse") > -1
                ? new MouseEvent(a.type, a)
                : new TouchEvent(a.type, a);
            a.defaultPrevented === !0 && an(u),
              a.cancelBubble === !0 && bn(u),
              Object.assign(u, {
                qKeyEvent: a.qKeyEvent,
                qClickOutside: a.qClickOutside,
                qAnchorHandled: a.qAnchorHandled,
                qClonedBy:
                  a.qClonedBy === void 0 ? [o.uid] : a.qClonedBy.concat(o.uid),
              }),
              (o.initialEvent = { target: a.target, event: u });
          }
          bn(a);
        }
        const { left: l, top: s } = sa(a);
        o.event = {
          x: l,
          y: s,
          time: Date.now(),
          mouse: i === !0,
          detected: !1,
          isFirst: !0,
          isFinal: !1,
          lastX: l,
          lastY: s,
        };
      },
      move(a) {
        if (o.event === void 0) return;
        const i = sa(a),
          l = i.left - o.event.x,
          s = i.top - o.event.y;
        if (l === 0 && s === 0) return;
        o.lastEvt = a;
        const u = o.event.mouse === !0,
          c = () => {
            r(a, u);
            let h;
            n.preserveCursor !== !0 &&
              n.preservecursor !== !0 &&
              ((h = document.documentElement.style.cursor || ""),
              (document.documentElement.style.cursor = "grabbing")),
              u === !0 &&
                document.body.classList.add("no-pointer-events--children"),
              document.body.classList.add("non-selectable"),
              rm(),
              (o.styleCleanup = (v) => {
                if (
                  ((o.styleCleanup = void 0),
                  h !== void 0 && (document.documentElement.style.cursor = h),
                  document.body.classList.remove("non-selectable"),
                  u === !0)
                ) {
                  const m = () => {
                    document.body.classList.remove(
                      "no-pointer-events--children"
                    );
                  };
                  v !== void 0
                    ? setTimeout(() => {
                        m(), v();
                      }, 50)
                    : m();
                } else v !== void 0 && v();
              });
          };
        if (o.event.detected === !0) {
          o.event.isFirst !== !0 && r(a, o.event.mouse);
          const { payload: h, synthetic: v } = Ns(a, o, !1);
          h !== void 0 &&
            (o.handler(h) === !1
              ? o.end(a)
              : (o.styleCleanup === void 0 && o.event.isFirst === !0 && c(),
                (o.event.lastX = h.position.left),
                (o.event.lastY = h.position.top),
                (o.event.lastDir = v === !0 ? void 0 : h.direction),
                (o.event.isFirst = !1)));
          return;
        }
        if (
          o.direction.all === !0 ||
          (u === !0 &&
            (o.modifiers.mouseAllDir === !0 || o.modifiers.mousealldir === !0))
        ) {
          c(), (o.event.detected = !0), o.move(a);
          return;
        }
        const f = Math.abs(l),
          d = Math.abs(s);
        f !== d &&
          ((o.direction.horizontal === !0 && f > d) ||
          (o.direction.vertical === !0 && f < d) ||
          (o.direction.up === !0 && f < d && s < 0) ||
          (o.direction.down === !0 && f < d && s > 0) ||
          (o.direction.left === !0 && f > d && l < 0) ||
          (o.direction.right === !0 && f > d && l > 0)
            ? ((o.event.detected = !0), o.move(a))
            : o.end(a, !0));
      },
      end(a, i) {
        if (o.event !== void 0) {
          if ((qi(o, "temp"), ft.is.firefox === !0 && Ts(e, !1), i === !0))
            o.styleCleanup !== void 0 && o.styleCleanup(),
              o.event.detected !== !0 &&
                o.initialEvent !== void 0 &&
                o.initialEvent.target.dispatchEvent(o.initialEvent.event);
          else if (o.event.detected === !0) {
            o.event.isFirst === !0 &&
              o.handler(Ns(a === void 0 ? o.lastEvt : a, o).payload);
            const { payload: l } = Ns(a === void 0 ? o.lastEvt : a, o, !0),
              s = () => {
                o.handler(l);
              };
            o.styleCleanup !== void 0 ? o.styleCleanup(s) : s();
          }
          (o.event = void 0), (o.initialEvent = void 0), (o.lastEvt = void 0);
        }
      },
    };
    if (((e.__qtouchpan = o), n.mouse === !0)) {
      const a = n.mouseCapture === !0 || n.mousecapture === !0 ? "Capture" : "";
      ro(o, "main", [[e, "mousedown", "mouseStart", `passive${a}`]]);
    }
    ft.has.touch === !0 &&
      ro(o, "main", [
        [
          e,
          "touchstart",
          "touchStart",
          `passive${n.capture === !0 ? "Capture" : ""}`,
        ],
        [e, "touchmove", "noop", "notPassiveCapture"],
      ]);
  },
  updated(e, t) {
    const n = e.__qtouchpan;
    n !== void 0 &&
      (t.oldValue !== t.value &&
        (typeof value != "function" && n.end(), (n.handler = t.value)),
      (n.direction = Vd(t.modifiers)));
  },
  beforeUnmount(e) {
    const t = e.__qtouchpan;
    t !== void 0 &&
      (t.event !== void 0 && t.end(),
      qi(t, "main"),
      qi(t, "temp"),
      ft.is.firefox === !0 && Ts(e, !1),
      t.styleCleanup !== void 0 && t.styleCleanup(),
      delete e.__qtouchpan);
  },
});
const Hd = 150;
var mx = Ue({
    name: "QDrawer",
    inheritAttrs: !1,
    props: {
      ..._c,
      ...In,
      side: {
        type: String,
        default: "left",
        validator: (e) => ["left", "right"].includes(e),
      },
      width: { type: Number, default: 300 },
      mini: Boolean,
      miniToOverlay: Boolean,
      miniWidth: { type: Number, default: 57 },
      noMiniAnimation: Boolean,
      breakpoint: { type: Number, default: 1023 },
      showIfAbove: Boolean,
      behavior: {
        type: String,
        validator: (e) => ["default", "desktop", "mobile"].includes(e),
        default: "default",
      },
      bordered: Boolean,
      elevated: Boolean,
      overlay: Boolean,
      persistent: Boolean,
      noSwipeOpen: Boolean,
      noSwipeClose: Boolean,
      noSwipeBackdrop: Boolean,
    },
    emits: [...Uc, "onLayout", "miniState"],
    setup(e, { slots: t, emit: n, attrs: r }) {
      const o = Fe(),
        {
          proxy: { $q: a },
        } = o,
        i = Ln(e, a),
        { preventBodyScroll: l } = nm(),
        { registerTimeout: s, removeTimeout: u } = Wc(),
        c = qt(wo, $t);
      if (c === $t)
        return console.error("QDrawer needs to be child of QLayout"), $t;
      let f,
        d = null,
        h;
      const v = fe(
          e.behavior === "mobile" ||
            (e.behavior !== "desktop" && c.totalWidth.value <= e.breakpoint)
        ),
        m = O(() => e.mini === !0 && v.value !== !0),
        g = O(() => (m.value === !0 ? e.miniWidth : e.width)),
        y = fe(
          e.showIfAbove === !0 && v.value === !1 ? !0 : e.modelValue === !0
        ),
        p = O(() => e.persistent !== !0 && (v.value === !0 || J.value === !0));
      function w(K, ce) {
        if ((A(), K !== !1 && c.animate(), P(0), v.value === !0)) {
          const we = c.instances[j.value];
          we !== void 0 && we.belowBreakpoint === !0 && we.hide(!1),
            B(1),
            c.isContainer.value !== !0 && l(!0);
        } else B(0), K !== !1 && Q(!1);
        s(() => {
          K !== !1 && Q(!0), ce !== !0 && n("show", K);
        }, Hd);
      }
      function b(K, ce) {
        T(),
          K !== !1 && c.animate(),
          B(0),
          P(D.value * g.value),
          ue(),
          ce !== !0
            ? s(() => {
                n("hide", K);
              }, Hd)
            : u();
      }
      const { show: S, hide: E } = zc({
          showing: y,
          hideOnRouteChange: p,
          handleShow: w,
          handleHide: b,
        }),
        { addToHistory: A, removeFromHistory: T } = Zp(y, E, p),
        x = { belowBreakpoint: v, hide: E },
        C = O(() => e.side === "right"),
        D = O(() => (a.lang.rtl === !0 ? -1 : 1) * (C.value === !0 ? 1 : -1)),
        I = fe(0),
        $ = fe(!1),
        L = fe(!1),
        G = fe(g.value * D.value),
        j = O(() => (C.value === !0 ? "left" : "right")),
        V = O(() =>
          y.value === !0 && v.value === !1 && e.overlay === !1
            ? e.miniToOverlay === !0
              ? e.miniWidth
              : g.value
            : 0
        ),
        oe = O(
          () =>
            e.overlay === !0 ||
            e.miniToOverlay === !0 ||
            c.view.value.indexOf(C.value ? "R" : "L") > -1 ||
            (a.platform.is.ios === !0 && c.isContainer.value === !0)
        ),
        xe = O(() => e.overlay === !1 && y.value === !0 && v.value === !1),
        J = O(() => e.overlay === !0 && y.value === !0 && v.value === !1),
        X = O(
          () =>
            "fullscreen q-drawer__backdrop" +
            (y.value === !1 && $.value === !1 ? " hidden" : "")
        ),
        H = O(() => ({ backgroundColor: `rgba(0,0,0,${I.value * 0.4})` })),
        se = O(() =>
          C.value === !0
            ? c.rows.value.top[2] === "r"
            : c.rows.value.top[0] === "l"
        ),
        Ee = O(() =>
          C.value === !0
            ? c.rows.value.bottom[2] === "r"
            : c.rows.value.bottom[0] === "l"
        ),
        de = O(() => {
          const K = {};
          return (
            c.header.space === !0 &&
              se.value === !1 &&
              (oe.value === !0
                ? (K.top = `${c.header.offset}px`)
                : c.header.space === !0 && (K.top = `${c.header.size}px`)),
            c.footer.space === !0 &&
              Ee.value === !1 &&
              (oe.value === !0
                ? (K.bottom = `${c.footer.offset}px`)
                : c.footer.space === !0 && (K.bottom = `${c.footer.size}px`)),
            K
          );
        }),
        ne = O(() => {
          const K = {
            width: `${g.value}px`,
            transform: `translateX(${G.value}px)`,
          };
          return v.value === !0 ? K : Object.assign(K, de.value);
        }),
        N = O(
          () =>
            "q-drawer__content fit " +
            (c.isContainer.value !== !0 ? "scroll" : "overflow-auto")
        ),
        ae = O(
          () =>
            `q-drawer q-drawer--${e.side}` +
            (L.value === !0 ? " q-drawer--mini-animate" : "") +
            (e.bordered === !0 ? " q-drawer--bordered" : "") +
            (i.value === !0 ? " q-drawer--dark q-dark" : "") +
            ($.value === !0
              ? " no-transition"
              : y.value === !0
              ? ""
              : " q-layout--prevent-focus") +
            (v.value === !0
              ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding"
              : ` q-drawer--${m.value === !0 ? "mini" : "standard"}` +
                (oe.value === !0 || xe.value !== !0 ? " fixed" : "") +
                (e.overlay === !0 || e.miniToOverlay === !0
                  ? " q-drawer--on-top"
                  : "") +
                (se.value === !0 ? " q-drawer--top-padding" : ""))
        ),
        U = O(() => {
          const K = a.lang.rtl === !0 ? e.side : j.value;
          return [[Bs, te, void 0, { [K]: !0, mouse: !0 }]];
        }),
        he = O(() => {
          const K = a.lang.rtl === !0 ? j.value : e.side;
          return [[Bs, ve, void 0, { [K]: !0, mouse: !0 }]];
        }),
        Le = O(() => {
          const K = a.lang.rtl === !0 ? j.value : e.side;
          return [[Bs, ve, void 0, { [K]: !0, mouse: !0, mouseAllDir: !0 }]];
        });
      function R() {
        ee(
          v,
          e.behavior === "mobile" ||
            (e.behavior !== "desktop" && c.totalWidth.value <= e.breakpoint)
        );
      }
      me(v, (K) => {
        K === !0
          ? ((f = y.value), y.value === !0 && E(!1))
          : e.overlay === !1 &&
            e.behavior !== "mobile" &&
            f !== !1 &&
            (y.value === !0 ? (P(0), B(0), ue()) : S(!1));
      }),
        me(
          () => e.side,
          (K, ce) => {
            c.instances[ce] === x &&
              ((c.instances[ce] = void 0),
              (c[ce].space = !1),
              (c[ce].offset = 0)),
              (c.instances[K] = x),
              (c[K].size = g.value),
              (c[K].space = xe.value),
              (c[K].offset = V.value);
          }
        ),
        me(c.totalWidth, () => {
          (c.isContainer.value === !0 || document.qScrollPrevented !== !0) &&
            R();
        }),
        me(() => e.behavior + e.breakpoint, R),
        me(c.isContainer, (K) => {
          y.value === !0 && l(K !== !0), K === !0 && R();
        }),
        me(c.scrollbarWidth, () => {
          P(y.value === !0 ? 0 : void 0);
        }),
        me(V, (K) => {
          ie("offset", K);
        }),
        me(xe, (K) => {
          n("onLayout", K), ie("space", K);
        }),
        me(C, () => {
          P();
        }),
        me(g, (K) => {
          P(), ye(e.miniToOverlay, K);
        }),
        me(
          () => e.miniToOverlay,
          (K) => {
            ye(K, g.value);
          }
        ),
        me(
          () => a.lang.rtl,
          () => {
            P();
          }
        ),
        me(
          () => e.mini,
          () => {
            e.noMiniAnimation || (e.modelValue === !0 && (Y(), c.animate()));
          }
        ),
        me(m, (K) => {
          n("miniState", K);
        });
      function P(K) {
        K === void 0
          ? at(() => {
              (K = y.value === !0 ? 0 : g.value), P(D.value * K);
            })
          : (c.isContainer.value === !0 &&
              C.value === !0 &&
              (v.value === !0 || Math.abs(K) === g.value) &&
              (K += D.value * c.scrollbarWidth.value),
            (G.value = K));
      }
      function B(K) {
        I.value = K;
      }
      function Q(K) {
        const ce =
          K === !0 ? "remove" : c.isContainer.value !== !0 ? "add" : "";
        ce !== "" && document.body.classList[ce]("q-body--drawer-toggle");
      }
      function Y() {
        d !== null && clearTimeout(d),
          o.proxy &&
            o.proxy.$el &&
            o.proxy.$el.classList.add("q-drawer--mini-animate"),
          (L.value = !0),
          (d = setTimeout(() => {
            (d = null),
              (L.value = !1),
              o &&
                o.proxy &&
                o.proxy.$el &&
                o.proxy.$el.classList.remove("q-drawer--mini-animate");
          }, 150));
      }
      function te(K) {
        if (y.value !== !1) return;
        const ce = g.value,
          we = Ri(K.distance.x, 0, ce);
        if (K.isFinal === !0) {
          we >= Math.min(75, ce) === !0
            ? S()
            : (c.animate(), B(0), P(D.value * ce)),
            ($.value = !1);
          return;
        }
        P(
          (a.lang.rtl === !0 ? C.value !== !0 : C.value)
            ? Math.max(ce - we, 0)
            : Math.min(0, we - ce)
        ),
          B(Ri(we / ce, 0, 1)),
          K.isFirst === !0 && ($.value = !0);
      }
      function ve(K) {
        if (y.value !== !0) return;
        const ce = g.value,
          we = K.direction === e.side,
          ke = (a.lang.rtl === !0 ? we !== !0 : we)
            ? Ri(K.distance.x, 0, ce)
            : 0;
        if (K.isFinal === !0) {
          Math.abs(ke) < Math.min(75, ce) === !0
            ? (c.animate(), B(1), P(0))
            : E(),
            ($.value = !1);
          return;
        }
        P(D.value * ke),
          B(Ri(1 - ke / ce, 0, 1)),
          K.isFirst === !0 && ($.value = !0);
      }
      function ue() {
        l(!1), Q(!0);
      }
      function ie(K, ce) {
        c.update(e.side, K, ce);
      }
      function ee(K, ce) {
        K.value !== ce && (K.value = ce);
      }
      function ye(K, ce) {
        ie("size", K === !0 ? e.miniWidth : ce);
      }
      return (
        (c.instances[e.side] = x),
        ye(e.miniToOverlay, g.value),
        ie("space", xe.value),
        ie("offset", V.value),
        e.showIfAbove === !0 &&
          e.modelValue !== !0 &&
          y.value === !0 &&
          e["onUpdate:modelValue"] !== void 0 &&
          n("update:modelValue", !0),
        Ft(() => {
          n("onLayout", xe.value),
            n("miniState", m.value),
            (f = e.showIfAbove === !0);
          const K = () => {
            (y.value === !0 ? w : b)(!1, !0);
          };
          if (c.totalWidth.value !== 0) {
            at(K);
            return;
          }
          h = me(c.totalWidth, () => {
            h(),
              (h = void 0),
              y.value === !1 && e.showIfAbove === !0 && v.value === !1
                ? S(!1)
                : K();
          });
        }),
        vt(() => {
          h !== void 0 && h(),
            d !== null && (clearTimeout(d), (d = null)),
            y.value === !0 && ue(),
            c.instances[e.side] === x &&
              ((c.instances[e.side] = void 0),
              ie("size", 0),
              ie("offset", 0),
              ie("space", !1));
        }),
        () => {
          const K = [];
          v.value === !0 &&
            (e.noSwipeOpen === !1 &&
              K.push(
                St(
                  k("div", {
                    key: "open",
                    class: `q-drawer__opener fixed-${e.side}`,
                    "aria-hidden": "true",
                  }),
                  U.value
                )
              ),
            K.push(
              $u(
                "div",
                {
                  ref: "backdrop",
                  class: X.value,
                  style: H.value,
                  "aria-hidden": "true",
                  onClick: E,
                },
                void 0,
                "backdrop",
                e.noSwipeBackdrop !== !0 && y.value === !0,
                () => Le.value
              )
            ));
          const ce = m.value === !0 && t.mini !== void 0,
            we = [
              k(
                "div",
                { ...r, key: "" + ce, class: [N.value, r.class] },
                ce === !0 ? t.mini() : ht(t.default)
              ),
            ];
          return (
            e.elevated === !0 &&
              y.value === !0 &&
              we.push(
                k("div", {
                  class:
                    "q-layout__shadow absolute-full overflow-hidden no-pointer-events",
                })
              ),
            K.push(
              $u(
                "aside",
                { ref: "content", class: ae.value, style: ne.value },
                we,
                "contentclose",
                e.noSwipeClose !== !0 && v.value === !0,
                () => he.value
              )
            ),
            k("div", { class: "q-drawer-container" }, K)
          );
        }
      );
    },
  }),
  om = Ue({
    name: "QPageContainer",
    setup(e, { slots: t }) {
      const {
          proxy: { $q: n },
        } = Fe(),
        r = qt(wo, $t);
      if (r === $t)
        return console.error("QPageContainer needs to be child of QLayout"), $t;
      Lr(gp, !0);
      const o = O(() => {
        const a = {};
        return (
          r.header.space === !0 && (a.paddingTop = `${r.header.size}px`),
          r.right.space === !0 &&
            (a[
              `padding${n.lang.rtl === !0 ? "Left" : "Right"}`
            ] = `${r.right.size}px`),
          r.footer.space === !0 && (a.paddingBottom = `${r.footer.size}px`),
          r.left.space === !0 &&
            (a[
              `padding${n.lang.rtl === !0 ? "Right" : "Left"}`
            ] = `${r.left.size}px`),
          a
        );
      });
      return () =>
        k("div", { class: "q-page-container", style: o.value }, ht(t.default));
    },
  });
const { passive: _d } = kt,
  gx = ["both", "horizontal", "vertical"];
var yx = Ue({
    name: "QScrollObserver",
    props: {
      axis: {
        type: String,
        validator: (e) => gx.includes(e),
        default: "vertical",
      },
      debounce: [String, Number],
      scrollTarget: { default: void 0 },
    },
    emits: ["scroll"],
    setup(e, { emit: t }) {
      const n = {
        position: { top: 0, left: 0 },
        direction: "down",
        directionChanged: !1,
        delta: { top: 0, left: 0 },
        inflectionPoint: { top: 0, left: 0 },
      };
      let r = null,
        o,
        a;
      me(
        () => e.scrollTarget,
        () => {
          s(), l();
        }
      );
      function i() {
        r !== null && r();
        const f = Math.max(0, em(o)),
          d = tm(o),
          h = { top: f - n.position.top, left: d - n.position.left };
        if (
          (e.axis === "vertical" && h.top === 0) ||
          (e.axis === "horizontal" && h.left === 0)
        )
          return;
        const v =
          Math.abs(h.top) >= Math.abs(h.left)
            ? h.top < 0
              ? "up"
              : "down"
            : h.left < 0
            ? "left"
            : "right";
        (n.position = { top: f, left: d }),
          (n.directionChanged = n.direction !== v),
          (n.delta = h),
          n.directionChanged === !0 &&
            ((n.direction = v), (n.inflectionPoint = n.position)),
          t("scroll", { ...n });
      }
      function l() {
        (o = Kc(a, e.scrollTarget)), o.addEventListener("scroll", u, _d), u(!0);
      }
      function s() {
        o !== void 0 && (o.removeEventListener("scroll", u, _d), (o = void 0));
      }
      function u(f) {
        if (f === !0 || e.debounce === 0 || e.debounce === "0") i();
        else if (r === null) {
          const [d, h] = e.debounce
            ? [setTimeout(i, e.debounce), clearTimeout]
            : [requestAnimationFrame(i), cancelAnimationFrame];
          r = () => {
            h(d), (r = null);
          };
        }
      }
      const { proxy: c } = Fe();
      return (
        me(() => c.$q.lang.rtl, i),
        Ft(() => {
          (a = c.$el.parentNode), l();
        }),
        vt(() => {
          r !== null && r(), s();
        }),
        Object.assign(c, { trigger: u, getPosition: () => n }),
        en
      );
    },
  }),
  im = Ue({
    name: "QLayout",
    props: {
      container: Boolean,
      view: {
        type: String,
        default: "hhh lpr fff",
        validator: (e) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase()),
      },
      onScroll: Function,
      onScrollHeight: Function,
      onResize: Function,
    },
    setup(e, { slots: t, emit: n }) {
      const {
          proxy: { $q: r },
        } = Fe(),
        o = fe(null),
        a = fe(r.screen.height),
        i = fe(e.container === !0 ? 0 : r.screen.width),
        l = fe({ position: 0, direction: "down", inflectionPoint: 0 }),
        s = fe(0),
        u = fe(_n.value === !0 ? 0 : il()),
        c = O(
          () =>
            "q-layout q-layout--" +
            (e.container === !0 ? "containerized" : "standard")
        ),
        f = O(() =>
          e.container === !1 ? { minHeight: r.screen.height + "px" } : null
        ),
        d = O(() =>
          u.value !== 0
            ? { [r.lang.rtl === !0 ? "left" : "right"]: `${u.value}px` }
            : null
        ),
        h = O(() =>
          u.value !== 0
            ? {
                [r.lang.rtl === !0 ? "right" : "left"]: 0,
                [r.lang.rtl === !0 ? "left" : "right"]: `-${u.value}px`,
                width: `calc(100% + ${u.value}px)`,
              }
            : null
        );
      function v(A) {
        if (e.container === !0 || document.qScrollPrevented !== !0) {
          const T = {
            position: A.position.top,
            direction: A.direction,
            directionChanged: A.directionChanged,
            inflectionPoint: A.inflectionPoint.top,
            delta: A.delta.top,
          };
          (l.value = T), e.onScroll !== void 0 && n("scroll", T);
        }
      }
      function m(A) {
        const { height: T, width: x } = A;
        let C = !1;
        a.value !== T &&
          ((C = !0),
          (a.value = T),
          e.onScrollHeight !== void 0 && n("scrollHeight", T),
          y()),
          i.value !== x && ((C = !0), (i.value = x)),
          C === !0 && e.onResize !== void 0 && n("resize", A);
      }
      function g({ height: A }) {
        s.value !== A && ((s.value = A), y());
      }
      function y() {
        if (e.container === !0) {
          const A = a.value > s.value ? il() : 0;
          u.value !== A && (u.value = A);
        }
      }
      let p = null;
      const w = {
        instances: {},
        view: O(() => e.view),
        isContainer: O(() => e.container),
        rootRef: o,
        height: a,
        containerHeight: s,
        scrollbarWidth: u,
        totalWidth: O(() => i.value + u.value),
        rows: O(() => {
          const A = e.view.toLowerCase().split(" ");
          return {
            top: A[0].split(""),
            middle: A[1].split(""),
            bottom: A[2].split(""),
          };
        }),
        header: Pn({ size: 0, offset: 0, space: !1 }),
        right: Pn({ size: 300, offset: 0, space: !1 }),
        footer: Pn({ size: 0, offset: 0, space: !1 }),
        left: Pn({ size: 300, offset: 0, space: !1 }),
        scroll: l,
        animate() {
          p !== null
            ? clearTimeout(p)
            : document.body.classList.add("q-body--layout-animate"),
            (p = setTimeout(() => {
              (p = null),
                document.body.classList.remove("q-body--layout-animate");
            }, 155));
        },
        update(A, T, x) {
          w[A][T] = x;
        },
      };
      if ((Lr(wo, w), il() > 0)) {
        let x = function () {
            (A = null), T.classList.remove("hide-scrollbar");
          },
          C = function () {
            if (A === null) {
              if (T.scrollHeight > r.screen.height) return;
              T.classList.add("hide-scrollbar");
            } else clearTimeout(A);
            A = setTimeout(x, 300);
          },
          D = function (I) {
            A !== null && I === "remove" && (clearTimeout(A), x()),
              window[`${I}EventListener`]("resize", C);
          };
        var E = x,
          b = C,
          S = D;
        let A = null;
        const T = document.body;
        me(() => (e.container !== !0 ? "add" : "remove"), D),
          e.container !== !0 && D("add"),
          ui(() => {
            D("remove");
          });
      }
      return () => {
        const A = qn(t.default, [
            k(yx, { onScroll: v }),
            k(Al, { onResize: m }),
          ]),
          T = k(
            "div",
            {
              class: c.value,
              style: f.value,
              ref: e.container === !0 ? void 0 : o,
              tabindex: -1,
            },
            A
          );
        return e.container === !0
          ? k("div", { class: "q-layout-container overflow-hidden", ref: o }, [
              k(Al, { onResize: g }),
              k("div", { class: "absolute-full", style: d.value }, [
                k("div", { class: "scroll", style: h.value }, [T]),
              ]),
            ])
          : T;
      };
    },
  });
function am() {
  let e;
  const t = Fe();
  function n() {
    e = void 0;
  }
  return (
    qr(n),
    vt(n),
    {
      removeTick: n,
      registerTick(r) {
        (e = r),
          at(() => {
            e === r && (qc(t) === !1 && e(), (e = void 0));
          });
      },
    }
  );
}
const lm = {
  transitionShow: { type: String, default: "fade" },
  transitionHide: { type: String, default: "fade" },
  transitionDuration: { type: [String, Number], default: 300 },
};
function sm(e, t = () => {}, n = () => {}) {
  return {
    transitionProps: O(() => {
      const r = `q-transition--${e.transitionShow || t()}`,
        o = `q-transition--${e.transitionHide || n()}`;
      return {
        appear: !0,
        enterFromClass: `${r}-enter-from`,
        enterActiveClass: `${r}-enter-active`,
        enterToClass: `${r}-enter-to`,
        leaveFromClass: `${o}-leave-from`,
        leaveActiveClass: `${o}-leave-active`,
        leaveToClass: `${o}-leave-to`,
      };
    }),
    transitionStyle: O(
      () => `--q-transition-duration: ${e.transitionDuration}ms`
    ),
  };
}
let oo = [],
  fa = [];
function um(e) {
  fa = fa.filter((t) => t !== e);
}
function bx(e) {
  um(e), fa.push(e);
}
function Ud(e) {
  um(e), fa.length === 0 && oo.length !== 0 && (oo[oo.length - 1](), (oo = []));
}
function Ca(e) {
  fa.length === 0 ? e() : oo.push(e);
}
function Sx(e) {
  oo = oo.filter((t) => t !== e);
}
const Wo = [];
function wx(e) {
  return Wo.find((t) => t.contentEl !== null && t.contentEl.contains(e));
}
function cm(e, t) {
  do {
    if (e.$options.name === "QMenu") {
      if ((e.hide(t), e.$props.separateClosePopup === !0)) return nl(e);
    } else if (e.__qPortal === !0) {
      const n = nl(e);
      return n !== void 0 && n.$options.name === "QPopupProxy"
        ? (e.hide(t), n)
        : e;
    }
    e = nl(e);
  } while (e != null);
}
function xx(e, t, n) {
  for (; n !== 0 && e !== void 0 && e !== null; ) {
    if (e.__qPortal === !0) {
      if ((n--, e.$options.name === "QMenu")) {
        e = cm(e, t);
        continue;
      }
      e.hide(t);
    }
    e = nl(e);
  }
}
function Ex(e) {
  for (e = e.parent; e != null; ) {
    if (e.type.name === "QGlobalDialog") return !0;
    if (e.type.name === "QDialog" || e.type.name === "QMenu") return !1;
    e = e.parent;
  }
  return !1;
}
function fm(e, t, n, r) {
  const o = fe(!1),
    a = fe(!1);
  let i = null;
  const l = {},
    s = r === "dialog" && Ex(e);
  function u(f) {
    if (f === !0) {
      Ud(l), (a.value = !0);
      return;
    }
    (a.value = !1),
      o.value === !1 &&
        (s === !1 && i === null && (i = Fc(!1, r)),
        (o.value = !0),
        Wo.push(e.proxy),
        bx(l));
  }
  function c(f) {
    if (((a.value = !1), f !== !0)) return;
    Ud(l), (o.value = !1);
    const d = Wo.indexOf(e.proxy);
    d !== -1 && Wo.splice(d, 1), i !== null && (Sw(i), (i = null));
  }
  return (
    ui(() => {
      c(!0);
    }),
    (e.proxy.__qPortal = !0),
    Tn(e.proxy, "contentEl", () => t.value),
    {
      showPortal: u,
      hidePortal: c,
      portalIsActive: o,
      portalIsAccessible: a,
      renderPortal: () =>
        s === !0 ? n() : o.value === !0 ? [k(Dv, { to: i }, n())] : void 0,
    }
  );
}
const uo = [];
let ti;
function Cx(e) {
  ti = e.keyCode === 27;
}
function Ox() {
  ti === !0 && (ti = !1);
}
function Tx(e) {
  ti === !0 && ((ti = !1), Vr(e, 27) === !0 && uo[uo.length - 1](e));
}
function dm(e) {
  window[e]("keydown", Cx),
    window[e]("blur", Ox),
    window[e]("keyup", Tx),
    (ti = !1);
}
function hm(e) {
  ft.is.desktop === !0 &&
    (uo.push(e), uo.length === 1 && dm("addEventListener"));
}
function Il(e) {
  const t = uo.indexOf(e);
  t > -1 && (uo.splice(t, 1), uo.length === 0 && dm("removeEventListener"));
}
const co = [];
function vm(e) {
  co[co.length - 1](e);
}
function pm(e) {
  ft.is.desktop === !0 &&
    (co.push(e),
    co.length === 1 && document.body.addEventListener("focusin", vm));
}
function ju(e) {
  const t = co.indexOf(e);
  t > -1 &&
    (co.splice(t, 1),
    co.length === 0 && document.body.removeEventListener("focusin", vm));
}
let _a = 0;
const Px = {
    standard: "fixed-full flex-center",
    top: "fixed-top justify-center",
    bottom: "fixed-bottom justify-center",
    right: "fixed-right items-center",
    left: "fixed-left items-center",
  },
  zd = {
    standard: ["scale", "scale"],
    top: ["slide-down", "slide-up"],
    bottom: ["slide-up", "slide-down"],
    right: ["slide-left", "slide-right"],
    left: ["slide-right", "slide-left"],
  };
var lr = Ue({
  name: "QDialog",
  inheritAttrs: !1,
  props: {
    ..._c,
    ...lm,
    transitionShow: String,
    transitionHide: String,
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    position: {
      type: String,
      default: "standard",
      validator: (e) =>
        e === "standard" || ["top", "bottom", "left", "right"].includes(e),
    },
  },
  emits: [...Uc, "shake", "click", "escapeKey"],
  setup(e, { slots: t, emit: n, attrs: r }) {
    const o = Fe(),
      a = fe(null),
      i = fe(!1),
      l = fe(!1);
    let s = null,
      u = null,
      c,
      f;
    const d = O(
        () =>
          e.persistent !== !0 && e.noRouteDismiss !== !0 && e.seamless !== !0
      ),
      { preventBodyScroll: h } = nm(),
      { registerTimeout: v } = Wc(),
      { registerTick: m, removeTick: g } = am(),
      { transitionProps: y, transitionStyle: p } = sm(
        e,
        () => zd[e.position][0],
        () => zd[e.position][1]
      ),
      {
        showPortal: w,
        hidePortal: b,
        portalIsAccessible: S,
        renderPortal: E,
      } = fm(o, a, Ee, "dialog"),
      { hide: A } = zc({
        showing: i,
        hideOnRouteChange: d,
        handleShow: L,
        handleHide: G,
        processOnMount: !0,
      }),
      { addToHistory: T, removeFromHistory: x } = Zp(i, A, d),
      C = O(
        () =>
          `q-dialog__inner flex no-pointer-events q-dialog__inner--${
            e.maximized === !0 ? "maximized" : "minimized"
          } q-dialog__inner--${e.position} ${Px[e.position]}` +
          (l.value === !0 ? " q-dialog__inner--animating" : "") +
          (e.fullWidth === !0 ? " q-dialog__inner--fullwidth" : "") +
          (e.fullHeight === !0 ? " q-dialog__inner--fullheight" : "") +
          (e.square === !0 ? " q-dialog__inner--square" : "")
      ),
      D = O(() => i.value === !0 && e.seamless !== !0),
      I = O(() => (e.autoClose === !0 ? { onClick: X } : {})),
      $ = O(() => [
        `q-dialog fullscreen no-pointer-events q-dialog--${
          D.value === !0 ? "modal" : "seamless"
        }`,
        r.class,
      ]);
    me(
      () => e.maximized,
      (de) => {
        i.value === !0 && J(de);
      }
    ),
      me(D, (de) => {
        h(de), de === !0 ? (pm(se), hm(oe)) : (ju(se), Il(oe));
      });
    function L(de) {
      T(),
        (u =
          e.noRefocus === !1 && document.activeElement !== null
            ? document.activeElement
            : null),
        J(e.maximized),
        w(),
        (l.value = !0),
        e.noFocus !== !0
          ? (document.activeElement !== null && document.activeElement.blur(),
            m(j))
          : g(),
        v(() => {
          if (o.proxy.$q.platform.is.ios === !0) {
            if (e.seamless !== !0 && document.activeElement) {
              const { top: ne, bottom: N } =
                  document.activeElement.getBoundingClientRect(),
                { innerHeight: ae } = window,
                U =
                  window.visualViewport !== void 0
                    ? window.visualViewport.height
                    : ae;
              ne > 0 &&
                N > U / 2 &&
                (document.scrollingElement.scrollTop = Math.min(
                  document.scrollingElement.scrollHeight - U,
                  N >= ae
                    ? 1 / 0
                    : Math.ceil(document.scrollingElement.scrollTop + N - U / 2)
                )),
                document.activeElement.scrollIntoView();
            }
            (f = !0), a.value.click(), (f = !1);
          }
          w(!0), (l.value = !1), n("show", de);
        }, e.transitionDuration);
    }
    function G(de) {
      g(),
        x(),
        xe(!0),
        (l.value = !0),
        b(),
        u !== null &&
          ((
            (de && de.type.indexOf("key") === 0
              ? u.closest('[tabindex]:not([tabindex^="-"])')
              : void 0) || u
          ).focus(),
          (u = null)),
        v(() => {
          b(!0), (l.value = !1), n("hide", de);
        }, e.transitionDuration);
    }
    function j(de) {
      Ca(() => {
        let ne = a.value;
        ne === null ||
          ne.contains(document.activeElement) === !0 ||
          ((ne =
            (de !== "" ? ne.querySelector(de) : null) ||
            ne.querySelector(
              "[autofocus][tabindex], [data-autofocus][tabindex]"
            ) ||
            ne.querySelector(
              "[autofocus] [tabindex], [data-autofocus] [tabindex]"
            ) ||
            ne.querySelector("[autofocus], [data-autofocus]") ||
            ne),
          ne.focus({ preventScroll: !0 }));
      });
    }
    function V(de) {
      de && typeof de.focus == "function"
        ? de.focus({ preventScroll: !0 })
        : j(),
        n("shake");
      const ne = a.value;
      ne !== null &&
        (ne.classList.remove("q-animate--scale"),
        ne.classList.add("q-animate--scale"),
        s !== null && clearTimeout(s),
        (s = setTimeout(() => {
          (s = null),
            a.value !== null && (ne.classList.remove("q-animate--scale"), j());
        }, 170)));
    }
    function oe() {
      e.seamless !== !0 &&
        (e.persistent === !0 || e.noEscDismiss === !0
          ? e.maximized !== !0 && e.noShake !== !0 && V()
          : (n("escapeKey"), A()));
    }
    function xe(de) {
      s !== null && (clearTimeout(s), (s = null)),
        (de === !0 || i.value === !0) &&
          (J(!1), e.seamless !== !0 && (h(!1), ju(se), Il(oe))),
        de !== !0 && (u = null);
    }
    function J(de) {
      de === !0
        ? c !== !0 &&
          (_a < 1 && document.body.classList.add("q-body--dialog"),
          _a++,
          (c = !0))
        : c === !0 &&
          (_a < 2 && document.body.classList.remove("q-body--dialog"),
          _a--,
          (c = !1));
    }
    function X(de) {
      f !== !0 && (A(de), n("click", de));
    }
    function H(de) {
      e.persistent !== !0 && e.noBackdropDismiss !== !0
        ? A(de)
        : e.noShake !== !0 && V();
    }
    function se(de) {
      e.allowFocusOutside !== !0 &&
        S.value === !0 &&
        Vp(a.value, de.target) !== !0 &&
        j('[tabindex]:not([tabindex="-1"])');
    }
    Object.assign(o.proxy, {
      focus: j,
      shake: V,
      __updateRefocusTarget(de) {
        u = de || null;
      },
    }),
      vt(xe);
    function Ee() {
      return k(
        "div",
        {
          role: "dialog",
          "aria-modal": D.value === !0 ? "true" : "false",
          ...r,
          class: $.value,
        },
        [
          k(Br, { name: "q-transition--fade", appear: !0 }, () =>
            D.value === !0
              ? k("div", {
                  class: "q-dialog__backdrop fixed-full",
                  style: p.value,
                  "aria-hidden": "true",
                  tabindex: -1,
                  onClick: H,
                })
              : null
          ),
          k(Br, y.value, () =>
            i.value === !0
              ? k(
                  "div",
                  {
                    ref: a,
                    class: C.value,
                    style: p.value,
                    tabindex: -1,
                    ...I.value,
                  },
                  ht(t.default)
                )
              : null
          ),
        ]
      );
    }
    return E;
  },
});
function Rx({ validate: e, resetValidation: t, requiresQForm: n }) {
  const r = qt(yp, !1);
  if (r !== !1) {
    const { props: o, proxy: a } = Fe();
    Object.assign(a, { validate: e, resetValidation: t }),
      me(
        () => o.disable,
        (i) => {
          i === !0
            ? (typeof t == "function" && t(), r.unbindComponent(a))
            : r.bindComponent(a);
        }
      ),
      Ft(() => {
        o.disable !== !0 && r.bindComponent(a);
      }),
      vt(() => {
        o.disable !== !0 && r.unbindComponent(a);
      });
  } else n === !0 && console.error("Parent QForm not found on useFormChild()!");
}
const Kd = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,
  Wd = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,
  Qd = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  Ua =
    /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,
  za =
    /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,
  js = {
    date: (e) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),
    time: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),
    fulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),
    timeOrFulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),
    email: (e) =>
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e
      ),
    hexColor: (e) => Kd.test(e),
    hexaColor: (e) => Wd.test(e),
    hexOrHexaColor: (e) => Qd.test(e),
    rgbColor: (e) => Ua.test(e),
    rgbaColor: (e) => za.test(e),
    rgbOrRgbaColor: (e) => Ua.test(e) || za.test(e),
    hexOrRgbColor: (e) => Kd.test(e) || Ua.test(e),
    hexaOrRgbaColor: (e) => Wd.test(e) || za.test(e),
    anyColor: (e) => Qd.test(e) || Ua.test(e) || za.test(e),
  },
  Ax = [!0, !1, "ondemand"],
  Ix = {
    modelValue: {},
    error: { type: Boolean, default: null },
    errorMessage: String,
    noErrorIcon: Boolean,
    rules: Array,
    reactiveRules: Boolean,
    lazyRules: { type: [Boolean, String], validator: (e) => Ax.includes(e) },
  };
function Lx(e, t) {
  const { props: n, proxy: r } = Fe(),
    o = fe(!1),
    a = fe(null),
    i = fe(null);
  Rx({ validate: v, resetValidation: h });
  let l = 0,
    s;
  const u = O(
      () => n.rules !== void 0 && n.rules !== null && n.rules.length !== 0
    ),
    c = O(() => n.disable !== !0 && u.value === !0),
    f = O(() => n.error === !0 || o.value === !0),
    d = O(() =>
      typeof n.errorMessage == "string" && n.errorMessage.length !== 0
        ? n.errorMessage
        : a.value
    );
  me(
    () => n.modelValue,
    () => {
      m();
    }
  ),
    me(
      () => n.reactiveRules,
      (y) => {
        y === !0
          ? s === void 0 &&
            (s = me(
              () => n.rules,
              () => {
                m(!0);
              }
            ))
          : s !== void 0 && (s(), (s = void 0));
      },
      { immediate: !0 }
    ),
    me(e, (y) => {
      y === !0
        ? i.value === null && (i.value = !1)
        : i.value === !1 &&
          ((i.value = !0),
          c.value === !0 &&
            n.lazyRules !== "ondemand" &&
            t.value === !1 &&
            g());
    });
  function h() {
    l++,
      (t.value = !1),
      (i.value = null),
      (o.value = !1),
      (a.value = null),
      g.cancel();
  }
  function v(y = n.modelValue) {
    if (c.value !== !0) return !0;
    const p = ++l,
      w =
        t.value !== !0
          ? () => {
              i.value = !0;
            }
          : () => {},
      b = (E, A) => {
        E === !0 && w(), (o.value = E), (a.value = A || null), (t.value = !1);
      },
      S = [];
    for (let E = 0; E < n.rules.length; E++) {
      const A = n.rules[E];
      let T;
      if (
        (typeof A == "function"
          ? (T = A(y, js))
          : typeof A == "string" && js[A] !== void 0 && (T = js[A](y)),
        T === !1 || typeof T == "string")
      )
        return b(!0, T), !1;
      T !== !0 && T !== void 0 && S.push(T);
    }
    return S.length === 0
      ? (b(!1), !0)
      : ((t.value = !0),
        Promise.all(S).then(
          (E) => {
            if (E === void 0 || Array.isArray(E) === !1 || E.length === 0)
              return p === l && b(!1), !0;
            const A = E.find((T) => T === !1 || typeof T == "string");
            return p === l && b(A !== void 0, A), A === void 0;
          },
          (E) => (p === l && (console.error(E), b(!0)), !1)
        ));
  }
  function m(y) {
    c.value === !0 &&
      n.lazyRules !== "ondemand" &&
      (i.value === !0 || (n.lazyRules !== !0 && y !== !0)) &&
      g();
  }
  const g = Ic(v, 0);
  return (
    vt(() => {
      s !== void 0 && s(), g.cancel();
    }),
    Object.assign(r, { resetValidation: h, validate: v }),
    Tn(r, "hasError", () => f.value),
    {
      isDirtyModel: i,
      hasRules: u,
      hasError: f,
      errorMessage: d,
      validate: v,
      resetValidation: h,
    }
  );
}
const Gd = /^on[A-Z]/;
function kx(e, t) {
  const n = { listeners: fe({}), attributes: fe({}) };
  function r() {
    const o = {},
      a = {};
    for (const i in e)
      i !== "class" && i !== "style" && Gd.test(i) === !1 && (o[i] = e[i]);
    for (const i in t.props) Gd.test(i) === !0 && (a[i] = t.props[i]);
    (n.attributes.value = o), (n.listeners.value = a);
  }
  return es(r), r(), n;
}
let Vs,
  Ka = 0;
const Kt = new Array(256);
for (let e = 0; e < 256; e++) Kt[e] = (e + 256).toString(16).substring(1);
const Dx = (() => {
    const e =
      typeof crypto != "undefined"
        ? crypto
        : typeof window != "undefined"
        ? window.crypto || window.msCrypto
        : void 0;
    if (e !== void 0) {
      if (e.randomBytes !== void 0) return e.randomBytes;
      if (e.getRandomValues !== void 0)
        return (t) => {
          const n = new Uint8Array(t);
          return e.getRandomValues(n), n;
        };
    }
    return (t) => {
      const n = [];
      for (let r = t; r > 0; r--) n.push(Math.floor(Math.random() * 256));
      return n;
    };
  })(),
  Xd = 4096;
function Mx() {
  (Vs === void 0 || Ka + 16 > Xd) && ((Ka = 0), (Vs = Dx(Xd)));
  const e = Array.prototype.slice.call(Vs, Ka, (Ka += 16));
  return (
    (e[6] = (e[6] & 15) | 64),
    (e[8] = (e[8] & 63) | 128),
    Kt[e[0]] +
      Kt[e[1]] +
      Kt[e[2]] +
      Kt[e[3]] +
      "-" +
      Kt[e[4]] +
      Kt[e[5]] +
      "-" +
      Kt[e[6]] +
      Kt[e[7]] +
      "-" +
      Kt[e[8]] +
      Kt[e[9]] +
      "-" +
      Kt[e[10]] +
      Kt[e[11]] +
      Kt[e[12]] +
      Kt[e[13]] +
      Kt[e[14]] +
      Kt[e[15]]
  );
}
function Vu(e) {
  return e === void 0 ? `f_${Mx()}` : e;
}
function da(e) {
  return e != null && ("" + e).length !== 0;
}
const ls = {
    ...In,
    ...Ix,
    label: String,
    stackLabel: Boolean,
    hint: String,
    hideHint: Boolean,
    prefix: String,
    suffix: String,
    labelColor: String,
    color: String,
    bgColor: String,
    filled: Boolean,
    outlined: Boolean,
    borderless: Boolean,
    standout: [Boolean, String],
    square: Boolean,
    loading: Boolean,
    labelSlot: Boolean,
    bottomSlots: Boolean,
    hideBottomSpace: Boolean,
    rounded: Boolean,
    dense: Boolean,
    itemAligned: Boolean,
    counter: Boolean,
    clearable: Boolean,
    clearIcon: String,
    disable: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    for: String,
    maxlength: [Number, String],
  },
  Gc = [
    "update:modelValue",
    "clear",
    "focus",
    "blur",
    "popupShow",
    "popupHide",
  ];
function Xc() {
  const { props: e, attrs: t, proxy: n, vnode: r } = Fe();
  return {
    isDark: Ln(e, n.$q),
    editable: O(() => e.disable !== !0 && e.readonly !== !0),
    innerLoading: fe(!1),
    focused: fe(!1),
    hasPopupOpen: !1,
    splitAttrs: kx(t, r),
    targetUid: fe(Vu(e.for)),
    rootRef: fe(null),
    targetRef: fe(null),
    controlRef: fe(null),
  };
}
function Yc(e) {
  const { props: t, emit: n, slots: r, attrs: o, proxy: a } = Fe(),
    { $q: i } = a;
  let l = null;
  e.hasValue === void 0 && (e.hasValue = O(() => da(t.modelValue))),
    e.emitValue === void 0 &&
      (e.emitValue = (V) => {
        n("update:modelValue", V);
      }),
    e.controlEvents === void 0 &&
      (e.controlEvents = { onFocusin: x, onFocusout: C }),
    Object.assign(e, {
      clearValue: D,
      onControlFocusin: x,
      onControlFocusout: C,
      focus: A,
    }),
    e.computedCounter === void 0 &&
      (e.computedCounter = O(() => {
        if (t.counter !== !1) {
          const V =
              typeof t.modelValue == "string" || typeof t.modelValue == "number"
                ? ("" + t.modelValue).length
                : Array.isArray(t.modelValue) === !0
                ? t.modelValue.length
                : 0,
            oe = t.maxlength !== void 0 ? t.maxlength : t.maxValues;
          return V + (oe !== void 0 ? " / " + oe : "");
        }
      }));
  const {
      isDirtyModel: s,
      hasRules: u,
      hasError: c,
      errorMessage: f,
      resetValidation: d,
    } = Lx(e.focused, e.innerLoading),
    h =
      e.floatingLabel !== void 0
        ? O(
            () =>
              t.stackLabel === !0 ||
              e.focused.value === !0 ||
              e.floatingLabel.value === !0
          )
        : O(
            () =>
              t.stackLabel === !0 ||
              e.focused.value === !0 ||
              e.hasValue.value === !0
          ),
    v = O(
      () =>
        t.bottomSlots === !0 ||
        t.hint !== void 0 ||
        u.value === !0 ||
        t.counter === !0 ||
        t.error !== null
    ),
    m = O(() =>
      t.filled === !0
        ? "filled"
        : t.outlined === !0
        ? "outlined"
        : t.borderless === !0
        ? "borderless"
        : t.standout
        ? "standout"
        : "standard"
    ),
    g = O(
      () =>
        `q-field row no-wrap items-start q-field--${m.value}` +
        (e.fieldClass !== void 0 ? ` ${e.fieldClass.value}` : "") +
        (t.rounded === !0 ? " q-field--rounded" : "") +
        (t.square === !0 ? " q-field--square" : "") +
        (h.value === !0 ? " q-field--float" : "") +
        (p.value === !0 ? " q-field--labeled" : "") +
        (t.dense === !0 ? " q-field--dense" : "") +
        (t.itemAligned === !0 ? " q-field--item-aligned q-item-type" : "") +
        (e.isDark.value === !0 ? " q-field--dark" : "") +
        (e.getControl === void 0 ? " q-field--auto-height" : "") +
        (e.focused.value === !0 ? " q-field--focused" : "") +
        (c.value === !0 ? " q-field--error" : "") +
        (c.value === !0 || e.focused.value === !0
          ? " q-field--highlighted"
          : "") +
        (t.hideBottomSpace !== !0 && v.value === !0
          ? " q-field--with-bottom"
          : "") +
        (t.disable === !0
          ? " q-field--disabled"
          : t.readonly === !0
          ? " q-field--readonly"
          : "")
    ),
    y = O(
      () =>
        "q-field__control relative-position row no-wrap" +
        (t.bgColor !== void 0 ? ` bg-${t.bgColor}` : "") +
        (c.value === !0
          ? " text-negative"
          : typeof t.standout == "string" &&
            t.standout.length !== 0 &&
            e.focused.value === !0
          ? ` ${t.standout}`
          : t.color !== void 0
          ? ` text-${t.color}`
          : "")
    ),
    p = O(() => t.labelSlot === !0 || t.label !== void 0),
    w = O(
      () =>
        "q-field__label no-pointer-events absolute ellipsis" +
        (t.labelColor !== void 0 && c.value !== !0
          ? ` text-${t.labelColor}`
          : "")
    ),
    b = O(() => ({
      id: e.targetUid.value,
      editable: e.editable.value,
      focused: e.focused.value,
      floatingLabel: h.value,
      modelValue: t.modelValue,
      emitValue: e.emitValue,
    })),
    S = O(() => {
      const V = { for: e.targetUid.value };
      return (
        t.disable === !0
          ? (V["aria-disabled"] = "true")
          : t.readonly === !0 && (V["aria-readonly"] = "true"),
        V
      );
    });
  me(
    () => t.for,
    (V) => {
      e.targetUid.value = Vu(V);
    }
  );
  function E() {
    const V = document.activeElement;
    let oe = e.targetRef !== void 0 && e.targetRef.value;
    oe &&
      (V === null || V.id !== e.targetUid.value) &&
      (oe.hasAttribute("tabindex") === !0 ||
        (oe = oe.querySelector("[tabindex]")),
      oe && oe !== V && oe.focus({ preventScroll: !0 }));
  }
  function A() {
    Ca(E);
  }
  function T() {
    Sx(E);
    const V = document.activeElement;
    V !== null && e.rootRef.value.contains(V) && V.blur();
  }
  function x(V) {
    l !== null && (clearTimeout(l), (l = null)),
      e.editable.value === !0 &&
        e.focused.value === !1 &&
        ((e.focused.value = !0), n("focus", V));
  }
  function C(V, oe) {
    l !== null && clearTimeout(l),
      (l = setTimeout(() => {
        (l = null),
          !(
            document.hasFocus() === !0 &&
            (e.hasPopupOpen === !0 ||
              e.controlRef === void 0 ||
              e.controlRef.value === null ||
              e.controlRef.value.contains(document.activeElement) !== !1)
          ) &&
            (e.focused.value === !0 && ((e.focused.value = !1), n("blur", V)),
            oe !== void 0 && oe());
      }));
  }
  function D(V) {
    Dt(V),
      i.platform.is.mobile !== !0
        ? (
            (e.targetRef !== void 0 && e.targetRef.value) ||
            e.rootRef.value
          ).focus()
        : e.rootRef.value.contains(document.activeElement) === !0 &&
          document.activeElement.blur(),
      t.type === "file" && (e.inputRef.value.value = null),
      n("update:modelValue", null),
      n("clear", t.modelValue),
      at(() => {
        d(), i.platform.is.mobile !== !0 && (s.value = !1);
      });
  }
  function I() {
    const V = [];
    return (
      r.prepend !== void 0 &&
        V.push(
          k(
            "div",
            {
              class:
                "q-field__prepend q-field__marginal row no-wrap items-center",
              key: "prepend",
              onClick: an,
            },
            r.prepend()
          )
        ),
      V.push(
        k(
          "div",
          {
            class:
              "q-field__control-container col relative-position row no-wrap q-anchor--skip",
          },
          $()
        )
      ),
      c.value === !0 &&
        t.noErrorIcon === !1 &&
        V.push(
          G("error", [
            k(wt, { name: i.iconSet.field.error, color: "negative" }),
          ])
        ),
      t.loading === !0 || e.innerLoading.value === !0
        ? V.push(
            G(
              "inner-loading-append",
              r.loading !== void 0 ? r.loading() : [k(Ea, { color: t.color })]
            )
          )
        : t.clearable === !0 &&
          e.hasValue.value === !0 &&
          e.editable.value === !0 &&
          V.push(
            G("inner-clearable-append", [
              k(wt, {
                class: "q-field__focusable-action",
                tag: "button",
                name: t.clearIcon || i.iconSet.field.clear,
                tabindex: 0,
                type: "button",
                "aria-hidden": null,
                role: null,
                onClick: D,
              }),
            ])
          ),
      r.append !== void 0 &&
        V.push(
          k(
            "div",
            {
              class:
                "q-field__append q-field__marginal row no-wrap items-center",
              key: "append",
              onClick: an,
            },
            r.append()
          )
        ),
      e.getInnerAppend !== void 0 &&
        V.push(G("inner-append", e.getInnerAppend())),
      e.getControlChild !== void 0 && V.push(e.getControlChild()),
      V
    );
  }
  function $() {
    const V = [];
    return (
      t.prefix !== void 0 &&
        t.prefix !== null &&
        V.push(
          k(
            "div",
            { class: "q-field__prefix no-pointer-events row items-center" },
            t.prefix
          )
        ),
      e.getShadowControl !== void 0 &&
        e.hasShadow.value === !0 &&
        V.push(e.getShadowControl()),
      e.getControl !== void 0
        ? V.push(e.getControl())
        : r.rawControl !== void 0
        ? V.push(r.rawControl())
        : r.control !== void 0 &&
          V.push(
            k(
              "div",
              {
                ref: e.targetRef,
                class: "q-field__native row",
                tabindex: -1,
                ...e.splitAttrs.attributes.value,
                "data-autofocus": t.autofocus === !0 || void 0,
              },
              r.control(b.value)
            )
          ),
      p.value === !0 &&
        V.push(k("div", { class: w.value }, ht(r.label, t.label))),
      t.suffix !== void 0 &&
        t.suffix !== null &&
        V.push(
          k(
            "div",
            { class: "q-field__suffix no-pointer-events row items-center" },
            t.suffix
          )
        ),
      V.concat(ht(r.default))
    );
  }
  function L() {
    let V, oe;
    c.value === !0
      ? f.value !== null
        ? ((V = [k("div", { role: "alert" }, f.value)]),
          (oe = `q--slot-error-${f.value}`))
        : ((V = ht(r.error)), (oe = "q--slot-error"))
      : (t.hideHint !== !0 || e.focused.value === !0) &&
        (t.hint !== void 0
          ? ((V = [k("div", t.hint)]), (oe = `q--slot-hint-${t.hint}`))
          : ((V = ht(r.hint)), (oe = "q--slot-hint")));
    const xe = t.counter === !0 || r.counter !== void 0;
    if (t.hideBottomSpace === !0 && xe === !1 && V === void 0) return;
    const J = k("div", { key: oe, class: "q-field__messages col" }, V);
    return k(
      "div",
      {
        class:
          "q-field__bottom row items-start q-field__bottom--" +
          (t.hideBottomSpace !== !0 ? "animated" : "stale"),
        onClick: an,
      },
      [
        t.hideBottomSpace === !0
          ? J
          : k(Br, { name: "q-transition--field-message" }, () => J),
        xe === !0
          ? k(
              "div",
              { class: "q-field__counter" },
              r.counter !== void 0 ? r.counter() : e.computedCounter.value
            )
          : null,
      ]
    );
  }
  function G(V, oe) {
    return oe === null
      ? null
      : k(
          "div",
          {
            key: V,
            class:
              "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip",
          },
          oe
        );
  }
  let j = !1;
  return (
    qr(() => {
      j = !0;
    }),
    si(() => {
      j === !0 && t.autofocus === !0 && a.focus();
    }),
    Ft(() => {
      _n.value === !0 && t.for === void 0 && (e.targetUid.value = Vu()),
        t.autofocus === !0 && a.focus();
    }),
    vt(() => {
      l !== null && clearTimeout(l);
    }),
    Object.assign(a, { focus: A, blur: T }),
    function () {
      const oe =
        e.getControl === void 0 && r.control === void 0
          ? {
              ...e.splitAttrs.attributes.value,
              "data-autofocus": t.autofocus === !0 || void 0,
              ...S.value,
            }
          : S.value;
      return k(
        "label",
        { ref: e.rootRef, class: [g.value, o.class], style: o.style, ...oe },
        [
          r.before !== void 0
            ? k(
                "div",
                {
                  class:
                    "q-field__before q-field__marginal row no-wrap items-center",
                  onClick: an,
                },
                r.before()
              )
            : null,
          k(
            "div",
            { class: "q-field__inner relative-position col self-stretch" },
            [
              k(
                "div",
                {
                  ref: e.controlRef,
                  class: y.value,
                  tabindex: -1,
                  ...e.controlEvents,
                },
                I()
              ),
              v.value === !0 ? L() : null,
            ]
          ),
          r.after !== void 0
            ? k(
                "div",
                {
                  class:
                    "q-field__after q-field__marginal row no-wrap items-center",
                  onClick: an,
                },
                r.after()
              )
            : null,
        ]
      );
    }
  );
}
const Yd = {
    date: "####/##/##",
    datetime: "####/##/## ##:##",
    time: "##:##",
    fulltime: "##:##:##",
    phone: "(###) ### - ####",
    card: "#### #### #### ####",
  },
  Ll = {
    "#": { pattern: "[\\d]", negate: "[^\\d]" },
    S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
    N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
    A: {
      pattern: "[a-zA-Z]",
      negate: "[^a-zA-Z]",
      transform: (e) => e.toLocaleUpperCase(),
    },
    a: {
      pattern: "[a-zA-Z]",
      negate: "[^a-zA-Z]",
      transform: (e) => e.toLocaleLowerCase(),
    },
    X: {
      pattern: "[0-9a-zA-Z]",
      negate: "[^0-9a-zA-Z]",
      transform: (e) => e.toLocaleUpperCase(),
    },
    x: {
      pattern: "[0-9a-zA-Z]",
      negate: "[^0-9a-zA-Z]",
      transform: (e) => e.toLocaleLowerCase(),
    },
  },
  mm = Object.keys(Ll);
mm.forEach((e) => {
  Ll[e].regex = new RegExp(Ll[e].pattern);
});
const $x = new RegExp(
    "\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + mm.join("") + "])|(.)",
    "g"
  ),
  Jd = /[.*+?^${}()|[\]\\]/g,
  Nt = String.fromCharCode(1),
  Fx = {
    mask: String,
    reverseFillMask: Boolean,
    fillMask: [Boolean, String],
    unmaskedValue: Boolean,
  };
function Nx(e, t, n, r) {
  let o, a, i, l, s, u;
  const c = fe(null),
    f = fe(h());
  function d() {
    return (
      e.autogrow === !0 ||
      ["textarea", "text", "search", "url", "tel", "password"].includes(e.type)
    );
  }
  me(() => e.type + e.autogrow, m),
    me(
      () => e.mask,
      (x) => {
        if (x !== void 0) g(f.value, !0);
        else {
          const C = A(f.value);
          m(), e.modelValue !== C && t("update:modelValue", C);
        }
      }
    ),
    me(
      () => e.fillMask + e.reverseFillMask,
      () => {
        c.value === !0 && g(f.value, !0);
      }
    ),
    me(
      () => e.unmaskedValue,
      () => {
        c.value === !0 && g(f.value);
      }
    );
  function h() {
    if ((m(), c.value === !0)) {
      const x = S(A(e.modelValue));
      return e.fillMask !== !1 ? T(x) : x;
    }
    return e.modelValue;
  }
  function v(x) {
    if (x < o.length) return o.slice(-x);
    let C = "",
      D = o;
    const I = D.indexOf(Nt);
    if (I > -1) {
      for (let $ = x - D.length; $ > 0; $--) C += Nt;
      D = D.slice(0, I) + C + D.slice(I);
    }
    return D;
  }
  function m() {
    if (
      ((c.value = e.mask !== void 0 && e.mask.length !== 0 && d()),
      c.value === !1)
    ) {
      (l = void 0), (o = ""), (a = "");
      return;
    }
    const x = Yd[e.mask] === void 0 ? e.mask : Yd[e.mask],
      C =
        typeof e.fillMask == "string" && e.fillMask.length !== 0
          ? e.fillMask.slice(0, 1)
          : "_",
      D = C.replace(Jd, "\\$&"),
      I = [],
      $ = [],
      L = [];
    let G = e.reverseFillMask === !0,
      j = "",
      V = "";
    x.replace($x, (X, H, se, Ee, de) => {
      if (Ee !== void 0) {
        const ne = Ll[Ee];
        L.push(ne),
          (V = ne.negate),
          G === !0 &&
            ($.push(
              "(?:" +
                V +
                "+)?(" +
                ne.pattern +
                "+)?(?:" +
                V +
                "+)?(" +
                ne.pattern +
                "+)?"
            ),
            (G = !1)),
          $.push("(?:" + V + "+)?(" + ne.pattern + ")?");
      } else if (se !== void 0)
        (j = "\\" + (se === "\\" ? "" : se)),
          L.push(se),
          I.push("([^" + j + "]+)?" + j + "?");
      else {
        const ne = H !== void 0 ? H : de;
        (j = ne === "\\" ? "\\\\\\\\" : ne.replace(Jd, "\\\\$&")),
          L.push(ne),
          I.push("([^" + j + "]+)?" + j + "?");
      }
    });
    const oe = new RegExp(
        "^" +
          I.join("") +
          "(" +
          (j === "" ? "." : "[^" + j + "]") +
          "+)?" +
          (j === "" ? "" : "[" + j + "]*") +
          "$"
      ),
      xe = $.length - 1,
      J = $.map((X, H) =>
        H === 0 && e.reverseFillMask === !0
          ? new RegExp("^" + D + "*" + X)
          : H === xe
          ? new RegExp(
              "^" +
                X +
                "(" +
                (V === "" ? "." : V) +
                "+)?" +
                (e.reverseFillMask === !0 ? "$" : D + "*")
            )
          : new RegExp("^" + X)
      );
    (i = L),
      (l = (X) => {
        const H = oe.exec(
          e.reverseFillMask === !0 ? X : X.slice(0, L.length + 1)
        );
        H !== null && (X = H.slice(1).join(""));
        const se = [],
          Ee = J.length;
        for (let de = 0, ne = X; de < Ee; de++) {
          const N = J[de].exec(ne);
          if (N === null) break;
          (ne = ne.slice(N.shift().length)), se.push(...N);
        }
        return se.length !== 0 ? se.join("") : X;
      }),
      (o = L.map((X) => (typeof X == "string" ? X : Nt)).join("")),
      (a = o.split(Nt).join(C));
  }
  function g(x, C, D) {
    const I = r.value,
      $ = I.selectionEnd,
      L = I.value.length - $,
      G = A(x);
    C === !0 && m();
    const j = S(G),
      V = e.fillMask !== !1 ? T(j) : j,
      oe = f.value !== V;
    I.value !== V && (I.value = V),
      oe === !0 && (f.value = V),
      document.activeElement === I &&
        at(() => {
          if (V === a) {
            const J = e.reverseFillMask === !0 ? a.length : 0;
            I.setSelectionRange(J, J, "forward");
            return;
          }
          if (D === "insertFromPaste" && e.reverseFillMask !== !0) {
            const J = I.selectionEnd;
            let X = $ - 1;
            for (let H = s; H <= X && H < J; H++) o[H] !== Nt && X++;
            p.right(I, X);
            return;
          }
          if (
            ["deleteContentBackward", "deleteContentForward"].indexOf(D) > -1
          ) {
            const J =
              e.reverseFillMask === !0
                ? $ === 0
                  ? V.length > j.length
                    ? 1
                    : 0
                  : Math.max(
                      0,
                      V.length - (V === a ? 0 : Math.min(j.length, L) + 1)
                    ) + 1
                : $;
            I.setSelectionRange(J, J, "forward");
            return;
          }
          if (e.reverseFillMask === !0)
            if (oe === !0) {
              const J = Math.max(
                0,
                V.length - (V === a ? 0 : Math.min(j.length, L + 1))
              );
              J === 1 && $ === 1
                ? I.setSelectionRange(J, J, "forward")
                : p.rightReverse(I, J);
            } else {
              const J = V.length - L;
              I.setSelectionRange(J, J, "backward");
            }
          else if (oe === !0) {
            const J = Math.max(0, o.indexOf(Nt), Math.min(j.length, $) - 1);
            p.right(I, J);
          } else {
            const J = $ - 1;
            p.right(I, J);
          }
        });
    const xe = e.unmaskedValue === !0 ? A(V) : V;
    String(e.modelValue) !== xe && n(xe, !0);
  }
  function y(x, C, D) {
    const I = S(A(x.value));
    (C = Math.max(0, o.indexOf(Nt), Math.min(I.length, C))),
      (s = C),
      x.setSelectionRange(C, D, "forward");
  }
  const p = {
    left(x, C) {
      const D = o.slice(C - 1).indexOf(Nt) === -1;
      let I = Math.max(0, C - 1);
      for (; I >= 0; I--)
        if (o[I] === Nt) {
          (C = I), D === !0 && C++;
          break;
        }
      if (I < 0 && o[C] !== void 0 && o[C] !== Nt) return p.right(x, 0);
      C >= 0 && x.setSelectionRange(C, C, "backward");
    },
    right(x, C) {
      const D = x.value.length;
      let I = Math.min(D, C + 1);
      for (; I <= D; I++)
        if (o[I] === Nt) {
          C = I;
          break;
        } else o[I - 1] === Nt && (C = I);
      if (I > D && o[C - 1] !== void 0 && o[C - 1] !== Nt) return p.left(x, D);
      x.setSelectionRange(C, C, "forward");
    },
    leftReverse(x, C) {
      const D = v(x.value.length);
      let I = Math.max(0, C - 1);
      for (; I >= 0; I--)
        if (D[I - 1] === Nt) {
          C = I;
          break;
        } else if (D[I] === Nt && ((C = I), I === 0)) break;
      if (I < 0 && D[C] !== void 0 && D[C] !== Nt) return p.rightReverse(x, 0);
      C >= 0 && x.setSelectionRange(C, C, "backward");
    },
    rightReverse(x, C) {
      const D = x.value.length,
        I = v(D),
        $ = I.slice(0, C + 1).indexOf(Nt) === -1;
      let L = Math.min(D, C + 1);
      for (; L <= D; L++)
        if (I[L - 1] === Nt) {
          (C = L), C > 0 && $ === !0 && C--;
          break;
        }
      if (L > D && I[C - 1] !== void 0 && I[C - 1] !== Nt)
        return p.leftReverse(x, D);
      x.setSelectionRange(C, C, "forward");
    },
  };
  function w(x) {
    t("click", x), (u = void 0);
  }
  function b(x) {
    if ((t("keydown", x), Lc(x) === !0 || x.altKey === !0)) return;
    const C = r.value,
      D = C.selectionStart,
      I = C.selectionEnd;
    if ((x.shiftKey || (u = void 0), x.keyCode === 37 || x.keyCode === 39)) {
      x.shiftKey &&
        u === void 0 &&
        (u = C.selectionDirection === "forward" ? D : I);
      const $ =
        p[
          (x.keyCode === 39 ? "right" : "left") +
            (e.reverseFillMask === !0 ? "Reverse" : "")
        ];
      if ((x.preventDefault(), $(C, u === D ? I : D), x.shiftKey)) {
        const L = C.selectionStart;
        C.setSelectionRange(Math.min(u, L), Math.max(u, L), "forward");
      }
    } else
      x.keyCode === 8 && e.reverseFillMask !== !0 && D === I
        ? (p.left(C, D), C.setSelectionRange(C.selectionStart, I, "backward"))
        : x.keyCode === 46 &&
          e.reverseFillMask === !0 &&
          D === I &&
          (p.rightReverse(C, I),
          C.setSelectionRange(D, C.selectionEnd, "forward"));
  }
  function S(x) {
    if (x == null || x === "") return "";
    if (e.reverseFillMask === !0) return E(x);
    const C = i;
    let D = 0,
      I = "";
    for (let $ = 0; $ < C.length; $++) {
      const L = x[D],
        G = C[$];
      if (typeof G == "string") (I += G), L === G && D++;
      else if (L !== void 0 && G.regex.test(L))
        (I += G.transform !== void 0 ? G.transform(L) : L), D++;
      else return I;
    }
    return I;
  }
  function E(x) {
    const C = i,
      D = o.indexOf(Nt);
    let I = x.length - 1,
      $ = "";
    for (let L = C.length - 1; L >= 0 && I > -1; L--) {
      const G = C[L];
      let j = x[I];
      if (typeof G == "string") ($ = G + $), j === G && I--;
      else if (j !== void 0 && G.regex.test(j))
        do
          ($ = (G.transform !== void 0 ? G.transform(j) : j) + $),
            I--,
            (j = x[I]);
        while (D === L && j !== void 0 && G.regex.test(j));
      else return $;
    }
    return $;
  }
  function A(x) {
    return typeof x != "string" || l === void 0
      ? typeof x == "number"
        ? l("" + x)
        : x
      : l(x);
  }
  function T(x) {
    return a.length - x.length <= 0
      ? x
      : e.reverseFillMask === !0 && x.length !== 0
      ? a.slice(0, -x.length) + x
      : x + a.slice(x.length);
  }
  return {
    innerValue: f,
    hasMask: c,
    moveCursorForPaste: y,
    updateMaskValue: g,
    onMaskedKeydown: b,
    onMaskedClick: w,
  };
}
const Jc = { name: String };
function Bx(e = {}) {
  return (t, n, r) => {
    t[n](k("input", { class: "hidden" + (r || ""), ...e.value }));
  };
}
function gm(e) {
  return O(() => e.name || e.for);
}
function jx(e, t) {
  function n() {
    const r = e.modelValue;
    try {
      const o =
        "DataTransfer" in window
          ? new DataTransfer()
          : "ClipboardEvent" in window
          ? new ClipboardEvent("").clipboardData
          : void 0;
      return (
        Object(r) === r &&
          ("length" in r ? Array.from(r) : [r]).forEach((a) => {
            o.items.add(a);
          }),
        { files: o.files }
      );
    } catch {
      return { files: void 0 };
    }
  }
  return O(
    t === !0
      ? () => {
          if (e.type === "file") return n();
        }
      : n
  );
}
const Vx =
    /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,
  qx =
    /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,
  Hx = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,
  _x = /[a-z0-9_ -]$/i;
function ym(e) {
  return function (n) {
    if (n.type === "compositionend" || n.type === "change") {
      if (n.target.qComposing !== !0) return;
      (n.target.qComposing = !1), e(n);
    } else
      n.type === "compositionupdate" &&
        n.target.qComposing !== !0 &&
        typeof n.data == "string" &&
        (ft.is.firefox === !0
          ? _x.test(n.data) === !1
          : Vx.test(n.data) === !0 ||
            qx.test(n.data) === !0 ||
            Hx.test(n.data) === !0) === !0 &&
        (n.target.qComposing = !0);
  };
}
var Zr = Ue({
    name: "QInput",
    inheritAttrs: !1,
    props: {
      ...ls,
      ...Fx,
      ...Jc,
      modelValue: { required: !1 },
      shadowText: String,
      type: { type: String, default: "text" },
      debounce: [String, Number],
      autogrow: Boolean,
      inputClass: [Array, String, Object],
      inputStyle: [Array, String, Object],
    },
    emits: [...Gc, "paste", "change", "keydown", "click", "animationend"],
    setup(e, { emit: t, attrs: n }) {
      const { proxy: r } = Fe(),
        { $q: o } = r,
        a = {};
      let i = NaN,
        l,
        s,
        u = null,
        c;
      const f = fe(null),
        d = gm(e),
        {
          innerValue: h,
          hasMask: v,
          moveCursorForPaste: m,
          updateMaskValue: g,
          onMaskedKeydown: y,
          onMaskedClick: p,
        } = Nx(e, t, j, f),
        w = jx(e, !0),
        b = O(() => da(h.value)),
        S = ym(L),
        E = Xc(),
        A = O(() => e.type === "textarea" || e.autogrow === !0),
        T = O(
          () =>
            A.value === !0 ||
            ["text", "search", "url", "tel", "password"].includes(e.type)
        ),
        x = O(() => {
          const H = {
            ...E.splitAttrs.listeners.value,
            onInput: L,
            onPaste: $,
            onChange: oe,
            onBlur: xe,
            onFocus: bn,
          };
          return (
            (H.onCompositionstart =
              H.onCompositionupdate =
              H.onCompositionend =
                S),
            v.value === !0 && ((H.onKeydown = y), (H.onClick = p)),
            e.autogrow === !0 && (H.onAnimationend = G),
            H
          );
        }),
        C = O(() => {
          const H = {
            tabindex: 0,
            "data-autofocus": e.autofocus === !0 || void 0,
            rows: e.type === "textarea" ? 6 : void 0,
            "aria-label": e.label,
            name: d.value,
            ...E.splitAttrs.attributes.value,
            id: E.targetUid.value,
            maxlength: e.maxlength,
            disabled: e.disable === !0,
            readonly: e.readonly === !0,
          };
          return (
            A.value === !1 && (H.type = e.type),
            e.autogrow === !0 && (H.rows = 1),
            H
          );
        });
      me(
        () => e.type,
        () => {
          f.value && (f.value.value = e.modelValue);
        }
      ),
        me(
          () => e.modelValue,
          (H) => {
            if (v.value === !0) {
              if (s === !0 && ((s = !1), String(H) === i)) return;
              g(H);
            } else
              h.value !== H &&
                ((h.value = H),
                e.type === "number" &&
                  a.hasOwnProperty("value") === !0 &&
                  (l === !0 ? (l = !1) : delete a.value));
            e.autogrow === !0 && at(V);
          }
        ),
        me(
          () => e.autogrow,
          (H) => {
            H === !0
              ? at(V)
              : f.value !== null &&
                n.rows > 0 &&
                (f.value.style.height = "auto");
          }
        ),
        me(
          () => e.dense,
          () => {
            e.autogrow === !0 && at(V);
          }
        );
      function D() {
        Ca(() => {
          const H = document.activeElement;
          f.value !== null &&
            f.value !== H &&
            (H === null || H.id !== E.targetUid.value) &&
            f.value.focus({ preventScroll: !0 });
        });
      }
      function I() {
        f.value !== null && f.value.select();
      }
      function $(H) {
        if (v.value === !0 && e.reverseFillMask !== !0) {
          const se = H.target;
          m(se, se.selectionStart, se.selectionEnd);
        }
        t("paste", H);
      }
      function L(H) {
        if (!H || !H.target) return;
        if (e.type === "file") {
          t("update:modelValue", H.target.files);
          return;
        }
        const se = H.target.value;
        if (H.target.qComposing === !0) {
          a.value = se;
          return;
        }
        if (v.value === !0) g(se, !1, H.inputType);
        else if (
          (j(se), T.value === !0 && H.target === document.activeElement)
        ) {
          const { selectionStart: Ee, selectionEnd: de } = H.target;
          Ee !== void 0 &&
            de !== void 0 &&
            at(() => {
              H.target === document.activeElement &&
                se.indexOf(H.target.value) === 0 &&
                H.target.setSelectionRange(Ee, de);
            });
        }
        e.autogrow === !0 && V();
      }
      function G(H) {
        t("animationend", H), V();
      }
      function j(H, se) {
        (c = () => {
          (u = null),
            e.type !== "number" &&
              a.hasOwnProperty("value") === !0 &&
              delete a.value,
            e.modelValue !== H &&
              i !== H &&
              ((i = H),
              se === !0 && (s = !0),
              t("update:modelValue", H),
              at(() => {
                i === H && (i = NaN);
              })),
            (c = void 0);
        }),
          e.type === "number" && ((l = !0), (a.value = H)),
          e.debounce !== void 0
            ? (u !== null && clearTimeout(u),
              (a.value = H),
              (u = setTimeout(c, e.debounce)))
            : c();
      }
      function V() {
        requestAnimationFrame(() => {
          const H = f.value;
          if (H !== null) {
            const se = H.parentNode.style,
              { scrollTop: Ee } = H,
              { overflowY: de, maxHeight: ne } =
                o.platform.is.firefox === !0 ? {} : window.getComputedStyle(H),
              N = de !== void 0 && de !== "scroll";
            N === !0 && (H.style.overflowY = "hidden"),
              (se.marginBottom = H.scrollHeight - 1 + "px"),
              (H.style.height = "1px"),
              (H.style.height = H.scrollHeight + "px"),
              N === !0 &&
                (H.style.overflowY =
                  parseInt(ne, 10) < H.scrollHeight ? "auto" : "hidden"),
              (se.marginBottom = ""),
              (H.scrollTop = Ee);
          }
        });
      }
      function oe(H) {
        S(H),
          u !== null && (clearTimeout(u), (u = null)),
          c !== void 0 && c(),
          t("change", H.target.value);
      }
      function xe(H) {
        H !== void 0 && bn(H),
          u !== null && (clearTimeout(u), (u = null)),
          c !== void 0 && c(),
          (l = !1),
          (s = !1),
          delete a.value,
          e.type !== "file" &&
            setTimeout(() => {
              f.value !== null &&
                (f.value.value = h.value !== void 0 ? h.value : "");
            });
      }
      function J() {
        return a.hasOwnProperty("value") === !0
          ? a.value
          : h.value !== void 0
          ? h.value
          : "";
      }
      vt(() => {
        xe();
      }),
        Ft(() => {
          e.autogrow === !0 && V();
        }),
        Object.assign(E, {
          innerValue: h,
          fieldClass: O(
            () =>
              `q-${A.value === !0 ? "textarea" : "input"}` +
              (e.autogrow === !0 ? " q-textarea--autogrow" : "")
          ),
          hasShadow: O(
            () =>
              e.type !== "file" &&
              typeof e.shadowText == "string" &&
              e.shadowText.length !== 0
          ),
          inputRef: f,
          emitValue: j,
          hasValue: b,
          floatingLabel: O(
            () =>
              (b.value === !0 &&
                (e.type !== "number" || isNaN(h.value) === !1)) ||
              da(e.displayValue)
          ),
          getControl: () =>
            k(A.value === !0 ? "textarea" : "input", {
              ref: f,
              class: ["q-field__native q-placeholder", e.inputClass],
              style: e.inputStyle,
              ...C.value,
              ...x.value,
              ...(e.type !== "file" ? { value: J() } : w.value),
            }),
          getShadowControl: () =>
            k(
              "div",
              {
                class:
                  "q-field__native q-field__shadow absolute-bottom no-pointer-events" +
                  (A.value === !0 ? "" : " text-no-wrap"),
              },
              [k("span", { class: "invisible" }, J()), k("span", e.shadowText)]
            ),
        });
      const X = Yc(E);
      return (
        Object.assign(r, {
          focus: D,
          select: I,
          getNativeElement: () => f.value,
        }),
        Tn(r, "nativeEl", () => f.value),
        X
      );
    },
  }),
  Je = Ue({
    name: "QItemSection",
    props: {
      avatar: Boolean,
      thumbnail: Boolean,
      side: Boolean,
      top: Boolean,
      noWrap: Boolean,
    },
    setup(e, { slots: t }) {
      const n = O(
        () =>
          `q-item__section column q-item__section--${
            e.avatar === !0 || e.side === !0 || e.thumbnail === !0
              ? "side"
              : "main"
          }` +
          (e.top === !0
            ? " q-item__section--top justify-start"
            : " justify-center") +
          (e.avatar === !0 ? " q-item__section--avatar" : "") +
          (e.thumbnail === !0 ? " q-item__section--thumbnail" : "") +
          (e.noWrap === !0 ? " q-item__section--nowrap" : "")
      );
      return () => k("div", { class: n.value }, ht(t.default));
    },
  }),
  _t = Ue({
    name: "QItem",
    props: {
      ...In,
      ...Up,
      tag: { type: String, default: "div" },
      active: { type: Boolean, default: null },
      clickable: Boolean,
      dense: Boolean,
      insetLevel: Number,
      tabindex: [String, Number],
      focused: Boolean,
      manualFocus: Boolean,
    },
    emits: ["click", "keyup"],
    setup(e, { slots: t, emit: n }) {
      const {
          proxy: { $q: r },
        } = Fe(),
        o = Ln(e, r),
        {
          hasLink: a,
          linkAttrs: i,
          linkClass: l,
          linkTag: s,
          navigateOnClick: u,
        } = zp(),
        c = fe(null),
        f = fe(null),
        d = O(() => e.clickable === !0 || a.value === !0 || e.tag === "label"),
        h = O(() => e.disable !== !0 && d.value === !0),
        v = O(
          () =>
            "q-item q-item-type row no-wrap" +
            (e.dense === !0 ? " q-item--dense" : "") +
            (o.value === !0 ? " q-item--dark" : "") +
            (a.value === !0 && e.active === null
              ? l.value
              : e.active === !0
              ? ` q-item--active${
                  e.activeClass !== void 0 ? ` ${e.activeClass}` : ""
                }`
              : "") +
            (e.disable === !0 ? " disabled" : "") +
            (h.value === !0
              ? " q-item--clickable q-link cursor-pointer " +
                (e.manualFocus === !0
                  ? "q-manual-focusable"
                  : "q-focusable q-hoverable") +
                (e.focused === !0 ? " q-manual-focusable--focused" : "")
              : "")
        ),
        m = O(() => {
          if (e.insetLevel === void 0) return null;
          const w = r.lang.rtl === !0 ? "Right" : "Left";
          return { ["padding" + w]: 16 + e.insetLevel * 56 + "px" };
        });
      function g(w) {
        h.value === !0 &&
          (f.value !== null &&
            (w.qKeyEvent !== !0 && document.activeElement === c.value
              ? f.value.focus()
              : document.activeElement === f.value && c.value.focus()),
          u(w));
      }
      function y(w) {
        if (h.value === !0 && Vr(w, 13) === !0) {
          Dt(w), (w.qKeyEvent = !0);
          const b = new MouseEvent("click", w);
          (b.qKeyEvent = !0), c.value.dispatchEvent(b);
        }
        n("keyup", w);
      }
      function p() {
        const w = jc(t.default, []);
        return (
          h.value === !0 &&
            w.unshift(
              k("div", { class: "q-focus-helper", tabindex: -1, ref: f })
            ),
          w
        );
      }
      return () => {
        const w = {
          ref: c,
          class: v.value,
          style: m.value,
          role: "listitem",
          onClick: g,
          onKeyup: y,
        };
        return (
          h.value === !0
            ? ((w.tabindex = e.tabindex || "0"), Object.assign(w, i.value))
            : d.value === !0 && (w["aria-disabled"] = "true"),
          k(s.value, w, p())
        );
      };
    },
  }),
  At = Ue({
    name: "QItemLabel",
    props: {
      overline: Boolean,
      caption: Boolean,
      header: Boolean,
      lines: [Number, String],
    },
    setup(e, { slots: t }) {
      const n = O(() => parseInt(e.lines, 10)),
        r = O(
          () =>
            "q-item__label" +
            (e.overline === !0
              ? " q-item__label--overline text-overline"
              : "") +
            (e.caption === !0 ? " q-item__label--caption text-caption" : "") +
            (e.header === !0 ? " q-item__label--header" : "") +
            (n.value === 1 ? " ellipsis" : "")
        ),
        o = O(() =>
          e.lines !== void 0 && n.value > 1
            ? {
                overflow: "hidden",
                display: "-webkit-box",
                "-webkit-box-orient": "vertical",
                "-webkit-line-clamp": n.value,
              }
            : null
        );
      return () => k("div", { style: o.value, class: r.value }, ht(t.default));
    },
  }),
  Wn = Ue({
    name: "QCardSection",
    props: { tag: { type: String, default: "div" }, horizontal: Boolean },
    setup(e, { slots: t }) {
      const n = O(
        () =>
          `q-card__section q-card__section--${
            e.horizontal === !0 ? "horiz row no-wrap" : "vert"
          }`
      );
      return () => k(e.tag, { class: n.value }, ht(t.default));
    },
  }),
  Ux = Ue({
    name: "QField",
    inheritAttrs: !1,
    props: ls,
    emits: Gc,
    setup() {
      return Yc(Xc());
    },
  });
const zx = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 };
var qu = Ue({
  name: "QChip",
  props: {
    ...In,
    ...fi,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: { type: Boolean, default: !0 },
    selected: { type: Boolean, default: null },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    removeAriaLabel: String,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: { type: [Boolean, Object], default: !0 },
  },
  emits: ["update:modelValue", "update:selected", "remove", "click"],
  setup(e, { slots: t, emit: n }) {
    const {
        proxy: { $q: r },
      } = Fe(),
      o = Ln(e, r),
      a = di(e, zx),
      i = O(() => e.selected === !0 || e.icon !== void 0),
      l = O(() =>
        e.selected === !0 ? e.iconSelected || r.iconSet.chip.selected : e.icon
      ),
      s = O(() => e.iconRemove || r.iconSet.chip.remove),
      u = O(
        () => e.disable === !1 && (e.clickable === !0 || e.selected !== null)
      ),
      c = O(() => {
        const g = (e.outline === !0 && e.color) || e.textColor;
        return (
          "q-chip row inline no-wrap items-center" +
          (e.outline === !1 && e.color !== void 0 ? ` bg-${e.color}` : "") +
          (g ? ` text-${g} q-chip--colored` : "") +
          (e.disable === !0 ? " disabled" : "") +
          (e.dense === !0 ? " q-chip--dense" : "") +
          (e.outline === !0 ? " q-chip--outline" : "") +
          (e.selected === !0 ? " q-chip--selected" : "") +
          (u.value === !0
            ? " q-chip--clickable cursor-pointer non-selectable q-hoverable"
            : "") +
          (e.square === !0 ? " q-chip--square" : "") +
          (o.value === !0 ? " q-chip--dark q-dark" : "")
        );
      }),
      f = O(() => {
        const g =
            e.disable === !0
              ? { tabindex: -1, "aria-disabled": "true" }
              : { tabindex: e.tabindex || 0 },
          y = {
            ...g,
            role: "button",
            "aria-hidden": "false",
            "aria-label": e.removeAriaLabel || r.lang.label.remove,
          };
        return { chip: g, remove: y };
      });
    function d(g) {
      g.keyCode === 13 && h(g);
    }
    function h(g) {
      e.disable || (n("update:selected", !e.selected), n("click", g));
    }
    function v(g) {
      (g.keyCode === void 0 || g.keyCode === 13) &&
        (Dt(g), e.disable === !1 && (n("update:modelValue", !1), n("remove")));
    }
    function m() {
      const g = [];
      u.value === !0 && g.push(k("div", { class: "q-focus-helper" })),
        i.value === !0 &&
          g.push(
            k(wt, { class: "q-chip__icon q-chip__icon--left", name: l.value })
          );
      const y =
        e.label !== void 0
          ? [k("div", { class: "ellipsis" }, [e.label])]
          : void 0;
      return (
        g.push(
          k(
            "div",
            {
              class:
                "q-chip__content col row no-wrap items-center q-anchor--skip",
            },
            Fp(t.default, y)
          )
        ),
        e.iconRight &&
          g.push(
            k(wt, {
              class: "q-chip__icon q-chip__icon--right",
              name: e.iconRight,
            })
          ),
        e.removable === !0 &&
          g.push(
            k(wt, {
              class: "q-chip__icon q-chip__icon--remove cursor-pointer",
              name: s.value,
              ...f.value.remove,
              onClick: v,
              onKeyup: v,
            })
          ),
        g
      );
    }
    return () => {
      if (e.modelValue === !1) return;
      const g = { class: c.value, style: a.value };
      return (
        u.value === !0 &&
          Object.assign(g, f.value.chip, { onClick: h, onKeyup: d }),
        $u("div", g, m(), "ripple", e.ripple !== !1 && e.disable !== !0, () => [
          [ir, e.ripple],
        ])
      );
    };
  },
});
const Kx = {
  target: { default: !0 },
  noParentEvent: Boolean,
  contextMenu: Boolean,
};
function Wx({ showing: e, avoidEmit: t, configureAnchorEl: n }) {
  const { props: r, proxy: o, emit: a } = Fe(),
    i = fe(null);
  let l = null;
  function s(h) {
    return i.value === null
      ? !1
      : h === void 0 || h.touches === void 0 || h.touches.length <= 1;
  }
  const u = {};
  n === void 0 &&
    (Object.assign(u, {
      hide(h) {
        o.hide(h);
      },
      toggle(h) {
        o.toggle(h), (h.qAnchorHandled = !0);
      },
      toggleKey(h) {
        Vr(h, 13) === !0 && u.toggle(h);
      },
      contextClick(h) {
        o.hide(h),
          an(h),
          at(() => {
            o.show(h), (h.qAnchorHandled = !0);
          });
      },
      prevent: an,
      mobileTouch(h) {
        if ((u.mobileCleanup(h), s(h) !== !0)) return;
        o.hide(h), i.value.classList.add("non-selectable");
        const v = h.target;
        ro(u, "anchor", [
          [v, "touchmove", "mobileCleanup", "passive"],
          [v, "touchend", "mobileCleanup", "passive"],
          [v, "touchcancel", "mobileCleanup", "passive"],
          [i.value, "contextmenu", "prevent", "notPassive"],
        ]),
          (l = setTimeout(() => {
            (l = null), o.show(h), (h.qAnchorHandled = !0);
          }, 300));
      },
      mobileCleanup(h) {
        i.value.classList.remove("non-selectable"),
          l !== null && (clearTimeout(l), (l = null)),
          e.value === !0 && h !== void 0 && rm();
      },
    }),
    (n = function (h = r.contextMenu) {
      if (r.noParentEvent === !0 || i.value === null) return;
      let v;
      h === !0
        ? o.$q.platform.is.mobile === !0
          ? (v = [[i.value, "touchstart", "mobileTouch", "passive"]])
          : (v = [
              [i.value, "mousedown", "hide", "passive"],
              [i.value, "contextmenu", "contextClick", "notPassive"],
            ])
        : (v = [
            [i.value, "click", "toggle", "passive"],
            [i.value, "keyup", "toggleKey", "passive"],
          ]),
        ro(u, "anchor", v);
    }));
  function c() {
    qi(u, "anchor");
  }
  function f(h) {
    for (i.value = h; i.value.classList.contains("q-anchor--skip"); )
      i.value = i.value.parentNode;
    n();
  }
  function d() {
    if (r.target === !1 || r.target === "" || o.$el.parentNode === null)
      i.value = null;
    else if (r.target === !0) f(o.$el.parentNode);
    else {
      let h = r.target;
      if (typeof r.target == "string")
        try {
          h = document.querySelector(r.target);
        } catch {
          h = void 0;
        }
      h != null
        ? ((i.value = h.$el || h), n())
        : ((i.value = null),
          console.error(`Anchor: target "${r.target}" not found`));
    }
  }
  return (
    me(
      () => r.contextMenu,
      (h) => {
        i.value !== null && (c(), n(h));
      }
    ),
    me(
      () => r.target,
      () => {
        i.value !== null && c(), d();
      }
    ),
    me(
      () => r.noParentEvent,
      (h) => {
        i.value !== null && (h === !0 ? c() : n());
      }
    ),
    Ft(() => {
      d(),
        t !== !0 &&
          r.modelValue === !0 &&
          i.value === null &&
          a("update:modelValue", !1);
    }),
    vt(() => {
      l !== null && clearTimeout(l), c();
    }),
    { anchorEl: i, canShow: s, anchorEvents: u }
  );
}
function Qx(e, t) {
  const n = fe(null);
  let r;
  function o(l, s) {
    const u = `${s !== void 0 ? "add" : "remove"}EventListener`,
      c = s !== void 0 ? s : r;
    l !== window && l[u]("scroll", c, kt.passive),
      window[u]("scroll", c, kt.passive),
      (r = s);
  }
  function a() {
    n.value !== null && (o(n.value), (n.value = null));
  }
  const i = me(
    () => e.noParentEvent,
    () => {
      n.value !== null && (a(), t());
    }
  );
  return (
    vt(i),
    { localScrollTarget: n, unconfigureScrollTarget: a, changeScrollEvent: o }
  );
}
const { notPassiveCapture: kl } = kt,
  fo = [];
function Dl(e) {
  const t = e.target;
  if (
    t === void 0 ||
    t.nodeType === 8 ||
    t.classList.contains("no-pointer-events") === !0
  )
    return;
  let n = Wo.length - 1;
  for (; n >= 0; ) {
    const r = Wo[n].$;
    if (r.type.name === "QTooltip") {
      n--;
      continue;
    }
    if (r.type.name !== "QDialog") break;
    if (r.props.seamless !== !0) return;
    n--;
  }
  for (let r = fo.length - 1; r >= 0; r--) {
    const o = fo[r];
    if (
      (o.anchorEl.value === null || o.anchorEl.value.contains(t) === !1) &&
      (t === document.body ||
        (o.innerRef.value !== null && o.innerRef.value.contains(t) === !1))
    )
      (e.qClickOutside = !0), o.onClickOutside(e);
    else return;
  }
}
function Gx(e) {
  fo.push(e),
    fo.length === 1 &&
      (document.addEventListener("mousedown", Dl, kl),
      document.addEventListener("touchstart", Dl, kl));
}
function Zd(e) {
  const t = fo.findIndex((n) => n === e);
  t > -1 &&
    (fo.splice(t, 1),
    fo.length === 0 &&
      (document.removeEventListener("mousedown", Dl, kl),
      document.removeEventListener("touchstart", Dl, kl)));
}
let eh, th;
function nh(e) {
  const t = e.split(" ");
  return t.length !== 2
    ? !1
    : ["top", "center", "bottom"].includes(t[0]) !== !0
    ? (console.error(
        "Anchor/Self position must start with one of top/center/bottom"
      ),
      !1)
    : ["left", "middle", "right", "start", "end"].includes(t[1]) !== !0
    ? (console.error(
        "Anchor/Self position must end with one of left/middle/right/start/end"
      ),
      !1)
    : !0;
}
function Xx(e) {
  return e
    ? !(e.length !== 2 || typeof e[0] != "number" || typeof e[1] != "number")
    : !0;
}
const Hu = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left",
};
["left", "middle", "right"].forEach((e) => {
  (Hu[`${e}#ltr`] = e), (Hu[`${e}#rtl`] = e);
});
function rh(e, t) {
  const n = e.split(" ");
  return {
    vertical: n[0],
    horizontal: Hu[`${n[1]}#${t === !0 ? "rtl" : "ltr"}`],
  };
}
function Yx(e, t) {
  let {
    top: n,
    left: r,
    right: o,
    bottom: a,
    width: i,
    height: l,
  } = e.getBoundingClientRect();
  return (
    t !== void 0 &&
      ((n -= t[1]),
      (r -= t[0]),
      (a += t[1]),
      (o += t[0]),
      (i += t[0]),
      (l += t[1])),
    {
      top: n,
      bottom: a,
      height: l,
      left: r,
      right: o,
      width: i,
      middle: r + (o - r) / 2,
      center: n + (a - n) / 2,
    }
  );
}
function Jx(e, t, n) {
  let { top: r, left: o } = e.getBoundingClientRect();
  return (
    (r += t.top),
    (o += t.left),
    n !== void 0 && ((r += n[1]), (o += n[0])),
    {
      top: r,
      bottom: r + 1,
      height: 1,
      left: o,
      right: o + 1,
      width: 1,
      middle: o,
      center: r,
    }
  );
}
function Zx(e, t) {
  return { top: 0, center: t / 2, bottom: t, left: 0, middle: e / 2, right: e };
}
function oh(e, t, n, r) {
  return {
    top: e[n.vertical] - t[r.vertical],
    left: e[n.horizontal] - t[r.horizontal],
  };
}
function bm(e, t = 0) {
  if (e.targetEl === null || e.anchorEl === null || t > 5) return;
  if (e.targetEl.offsetHeight === 0 || e.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      bm(e, t + 1);
    }, 10);
    return;
  }
  const {
    targetEl: n,
    offset: r,
    anchorEl: o,
    anchorOrigin: a,
    selfOrigin: i,
    absoluteOffset: l,
    fit: s,
    cover: u,
    maxHeight: c,
    maxWidth: f,
  } = e;
  if (ft.is.ios === !0 && window.visualViewport !== void 0) {
    const E = document.body.style,
      { offsetLeft: A, offsetTop: T } = window.visualViewport;
    A !== eh && (E.setProperty("--q-pe-left", A + "px"), (eh = A)),
      T !== th && (E.setProperty("--q-pe-top", T + "px"), (th = T));
  }
  const { scrollLeft: d, scrollTop: h } = n,
    v = l === void 0 ? Yx(o, u === !0 ? [0, 0] : r) : Jx(o, l, r);
  Object.assign(n.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth: f || "100vw",
    maxHeight: c || "100vh",
    visibility: "visible",
  });
  const { offsetWidth: m, offsetHeight: g } = n,
    { elWidth: y, elHeight: p } =
      s === !0 || u === !0
        ? {
            elWidth: Math.max(v.width, m),
            elHeight: u === !0 ? Math.max(v.height, g) : g,
          }
        : { elWidth: m, elHeight: g };
  let w = { maxWidth: f, maxHeight: c };
  (s === !0 || u === !0) &&
    ((w.minWidth = v.width + "px"),
    u === !0 && (w.minHeight = v.height + "px")),
    Object.assign(n.style, w);
  const b = Zx(y, p);
  let S = oh(v, b, a, i);
  if (l === void 0 || r === void 0) qs(S, v, b, a, i);
  else {
    const { top: E, left: A } = S;
    qs(S, v, b, a, i);
    let T = !1;
    if (S.top !== E) {
      T = !0;
      const x = 2 * r[1];
      (v.center = v.top -= x), (v.bottom -= x + 2);
    }
    if (S.left !== A) {
      T = !0;
      const x = 2 * r[0];
      (v.middle = v.left -= x), (v.right -= x + 2);
    }
    T === !0 && ((S = oh(v, b, a, i)), qs(S, v, b, a, i));
  }
  (w = { top: S.top + "px", left: S.left + "px" }),
    S.maxHeight !== void 0 &&
      ((w.maxHeight = S.maxHeight + "px"),
      v.height > S.maxHeight && (w.minHeight = w.maxHeight)),
    S.maxWidth !== void 0 &&
      ((w.maxWidth = S.maxWidth + "px"),
      v.width > S.maxWidth && (w.minWidth = w.maxWidth)),
    Object.assign(n.style, w),
    n.scrollTop !== h && (n.scrollTop = h),
    n.scrollLeft !== d && (n.scrollLeft = d);
}
function qs(e, t, n, r, o) {
  const a = n.bottom,
    i = n.right,
    l = il(),
    s = window.innerHeight - l,
    u = document.body.clientWidth;
  if (e.top < 0 || e.top + a > s)
    if (o.vertical === "center")
      (e.top = t[r.vertical] > s / 2 ? Math.max(0, s - a) : 0),
        (e.maxHeight = Math.min(a, s));
    else if (t[r.vertical] > s / 2) {
      const c = Math.min(
        s,
        r.vertical === "center"
          ? t.center
          : r.vertical === o.vertical
          ? t.bottom
          : t.top
      );
      (e.maxHeight = Math.min(a, c)), (e.top = Math.max(0, c - a));
    } else
      (e.top = Math.max(
        0,
        r.vertical === "center"
          ? t.center
          : r.vertical === o.vertical
          ? t.top
          : t.bottom
      )),
        (e.maxHeight = Math.min(a, s - e.top));
  if (e.left < 0 || e.left + i > u)
    if (((e.maxWidth = Math.min(i, u)), o.horizontal === "middle"))
      e.left = t[r.horizontal] > u / 2 ? Math.max(0, u - i) : 0;
    else if (t[r.horizontal] > u / 2) {
      const c = Math.min(
        u,
        r.horizontal === "middle"
          ? t.middle
          : r.horizontal === o.horizontal
          ? t.right
          : t.left
      );
      (e.maxWidth = Math.min(i, c)), (e.left = Math.max(0, c - e.maxWidth));
    } else
      (e.left = Math.max(
        0,
        r.horizontal === "middle"
          ? t.middle
          : r.horizontal === o.horizontal
          ? t.left
          : t.right
      )),
        (e.maxWidth = Math.min(i, u - e.left));
}
var eE = Ue({
  name: "QMenu",
  inheritAttrs: !1,
  props: {
    ...Kx,
    ..._c,
    ...In,
    ...lm,
    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    fit: Boolean,
    cover: Boolean,
    square: Boolean,
    anchor: { type: String, validator: nh },
    self: { type: String, validator: nh },
    offset: { type: Array, validator: Xx },
    scrollTarget: { default: void 0 },
    touchPosition: Boolean,
    maxHeight: { type: String, default: null },
    maxWidth: { type: String, default: null },
  },
  emits: [...Uc, "click", "escapeKey"],
  setup(e, { slots: t, emit: n, attrs: r }) {
    let o = null,
      a,
      i,
      l;
    const s = Fe(),
      { proxy: u } = s,
      { $q: c } = u,
      f = fe(null),
      d = fe(!1),
      h = O(() => e.persistent !== !0 && e.noRouteDismiss !== !0),
      v = Ln(e, c),
      { registerTick: m, removeTick: g } = am(),
      { registerTimeout: y } = Wc(),
      { transitionProps: p, transitionStyle: w } = sm(e),
      {
        localScrollTarget: b,
        changeScrollEvent: S,
        unconfigureScrollTarget: E,
      } = Qx(e, se),
      { anchorEl: A, canShow: T } = Wx({ showing: d }),
      { hide: x } = zc({
        showing: d,
        canShow: T,
        handleShow: J,
        handleHide: X,
        hideOnRouteChange: h,
        processOnMount: !0,
      }),
      { showPortal: C, hidePortal: D, renderPortal: I } = fm(s, f, ae, "menu"),
      $ = {
        anchorEl: A,
        innerRef: f,
        onClickOutside(U) {
          if (e.persistent !== !0 && d.value === !0)
            return (
              x(U),
              (U.type === "touchstart" ||
                U.target.classList.contains("q-dialog__backdrop")) &&
                Dt(U),
              !0
            );
        },
      },
      L = O(() =>
        rh(
          e.anchor || (e.cover === !0 ? "center middle" : "bottom start"),
          c.lang.rtl
        )
      ),
      G = O(() =>
        e.cover === !0 ? L.value : rh(e.self || "top start", c.lang.rtl)
      ),
      j = O(
        () =>
          (e.square === !0 ? " q-menu--square" : "") +
          (v.value === !0 ? " q-menu--dark q-dark" : "")
      ),
      V = O(() => (e.autoClose === !0 ? { onClick: Ee } : {})),
      oe = O(() => d.value === !0 && e.persistent !== !0);
    me(oe, (U) => {
      U === !0 ? (hm(ne), Gx($)) : (Il(ne), Zd($));
    });
    function xe() {
      Ca(() => {
        let U = f.value;
        U &&
          U.contains(document.activeElement) !== !0 &&
          ((U =
            U.querySelector(
              "[autofocus][tabindex], [data-autofocus][tabindex]"
            ) ||
            U.querySelector(
              "[autofocus] [tabindex], [data-autofocus] [tabindex]"
            ) ||
            U.querySelector("[autofocus], [data-autofocus]") ||
            U),
          U.focus({ preventScroll: !0 }));
      });
    }
    function J(U) {
      if (
        ((o = e.noRefocus === !1 ? document.activeElement : null),
        pm(de),
        C(),
        se(),
        (a = void 0),
        U !== void 0 && (e.touchPosition || e.contextMenu))
      ) {
        const he = sa(U);
        if (he.left !== void 0) {
          const { top: Le, left: R } = A.value.getBoundingClientRect();
          a = { left: he.left - R, top: he.top - Le };
        }
      }
      i === void 0 &&
        (i = me(
          () =>
            c.screen.width +
            "|" +
            c.screen.height +
            "|" +
            e.self +
            "|" +
            e.anchor +
            "|" +
            c.lang.rtl,
          N
        )),
        e.noFocus !== !0 && document.activeElement.blur(),
        m(() => {
          N(), e.noFocus !== !0 && xe();
        }),
        y(() => {
          c.platform.is.ios === !0 && ((l = e.autoClose), f.value.click()),
            N(),
            C(!0),
            n("show", U);
        }, e.transitionDuration);
    }
    function X(U) {
      g(),
        D(),
        H(!0),
        o !== null &&
          (U === void 0 || U.qClickOutside !== !0) &&
          ((
            (U && U.type.indexOf("key") === 0
              ? o.closest('[tabindex]:not([tabindex^="-"])')
              : void 0) || o
          ).focus(),
          (o = null)),
        y(() => {
          D(!0), n("hide", U);
        }, e.transitionDuration);
    }
    function H(U) {
      (a = void 0),
        i !== void 0 && (i(), (i = void 0)),
        (U === !0 || d.value === !0) && (ju(de), E(), Zd($), Il(ne)),
        U !== !0 && (o = null);
    }
    function se() {
      (A.value !== null || e.scrollTarget !== void 0) &&
        ((b.value = Kc(A.value, e.scrollTarget)), S(b.value, N));
    }
    function Ee(U) {
      l !== !0 ? (cm(u, U), n("click", U)) : (l = !1);
    }
    function de(U) {
      oe.value === !0 &&
        e.noFocus !== !0 &&
        Vp(f.value, U.target) !== !0 &&
        xe();
    }
    function ne(U) {
      n("escapeKey"), x(U);
    }
    function N() {
      bm({
        targetEl: f.value,
        offset: e.offset,
        anchorEl: A.value,
        anchorOrigin: L.value,
        selfOrigin: G.value,
        absoluteOffset: a,
        fit: e.fit,
        cover: e.cover,
        maxHeight: e.maxHeight,
        maxWidth: e.maxWidth,
      });
    }
    function ae() {
      return k(Br, p.value, () =>
        d.value === !0
          ? k(
              "div",
              {
                role: "menu",
                ...r,
                ref: f,
                tabindex: -1,
                class: ["q-menu q-position-engine scroll" + j.value, r.class],
                style: [r.style, w.value],
                ...V.value,
              },
              ht(t.default)
            )
          : null
      );
    }
    return vt(H), Object.assign(u, { focus: xe, updatePosition: N }), I;
  },
});
let Ml = !1;
{
  const e = document.createElement("div");
  e.setAttribute("dir", "rtl"),
    Object.assign(e.style, { width: "1px", height: "1px", overflow: "auto" });
  const t = document.createElement("div");
  Object.assign(t.style, { width: "1000px", height: "1px" }),
    document.body.appendChild(e),
    e.appendChild(t),
    (e.scrollLeft = -1e3),
    (Ml = e.scrollLeft >= 0),
    e.remove();
}
const Bn = 1e3,
  tE = ["start", "center", "end", "start-force", "center-force", "end-force"],
  Sm = Array.prototype.filter,
  nE =
    window.getComputedStyle(document.body).overflowAnchor === void 0
      ? en
      : function (e, t) {
          e !== null &&
            (e._qOverflowAnimationFrame !== void 0 &&
              cancelAnimationFrame(e._qOverflowAnimationFrame),
            (e._qOverflowAnimationFrame = requestAnimationFrame(() => {
              if (e === null) return;
              e._qOverflowAnimationFrame = void 0;
              const n = e.children || [];
              Sm.call(
                n,
                (o) => o.dataset && o.dataset.qVsAnchor !== void 0
              ).forEach((o) => {
                delete o.dataset.qVsAnchor;
              });
              const r = n[t];
              r && r.dataset && (r.dataset.qVsAnchor = "");
            })));
        };
function Qo(e, t) {
  return e + t;
}
function Hs(e, t, n, r, o, a, i, l) {
  const s =
      e === window ? document.scrollingElement || document.documentElement : e,
    u = o === !0 ? "offsetWidth" : "offsetHeight",
    c = {
      scrollStart: 0,
      scrollViewSize: -i - l,
      scrollMaxSize: 0,
      offsetStart: -i,
      offsetEnd: -l,
    };
  if (
    (o === !0
      ? (e === window
          ? ((c.scrollStart =
              window.pageXOffset ||
              window.scrollX ||
              document.body.scrollLeft ||
              0),
            (c.scrollViewSize += document.documentElement.clientWidth))
          : ((c.scrollStart = s.scrollLeft),
            (c.scrollViewSize += s.clientWidth)),
        (c.scrollMaxSize = s.scrollWidth),
        a === !0 &&
          (c.scrollStart =
            (Ml === !0 ? c.scrollMaxSize - c.scrollViewSize : 0) -
            c.scrollStart))
      : (e === window
          ? ((c.scrollStart =
              window.pageYOffset ||
              window.scrollY ||
              document.body.scrollTop ||
              0),
            (c.scrollViewSize += document.documentElement.clientHeight))
          : ((c.scrollStart = s.scrollTop),
            (c.scrollViewSize += s.clientHeight)),
        (c.scrollMaxSize = s.scrollHeight)),
    n !== null)
  )
    for (
      let f = n.previousElementSibling;
      f !== null;
      f = f.previousElementSibling
    )
      f.classList.contains("q-virtual-scroll--skip") === !1 &&
        (c.offsetStart += f[u]);
  if (r !== null)
    for (let f = r.nextElementSibling; f !== null; f = f.nextElementSibling)
      f.classList.contains("q-virtual-scroll--skip") === !1 &&
        (c.offsetEnd += f[u]);
  if (t !== e) {
    const f = s.getBoundingClientRect(),
      d = t.getBoundingClientRect();
    o === !0
      ? ((c.offsetStart += d.left - f.left), (c.offsetEnd -= d.width))
      : ((c.offsetStart += d.top - f.top), (c.offsetEnd -= d.height)),
      e !== window && (c.offsetStart += c.scrollStart),
      (c.offsetEnd += c.scrollMaxSize - c.offsetStart);
  }
  return c;
}
function ih(e, t, n, r) {
  t === "end" &&
    (t = (e === window ? document.body : e)[
      n === !0 ? "scrollWidth" : "scrollHeight"
    ]),
    e === window
      ? n === !0
        ? (r === !0 &&
            (t =
              (Ml === !0
                ? document.body.scrollWidth -
                  document.documentElement.clientWidth
                : 0) - t),
          window.scrollTo(
            t,
            window.pageYOffset || window.scrollY || document.body.scrollTop || 0
          ))
        : window.scrollTo(
            window.pageXOffset ||
              window.scrollX ||
              document.body.scrollLeft ||
              0,
            t
          )
      : n === !0
      ? (r === !0 && (t = (Ml === !0 ? e.scrollWidth - e.offsetWidth : 0) - t),
        (e.scrollLeft = t))
      : (e.scrollTop = t);
}
function bi(e, t, n, r) {
  if (n >= r) return 0;
  const o = t.length,
    a = Math.floor(n / Bn),
    i = Math.floor((r - 1) / Bn) + 1;
  let l = e.slice(a, i).reduce(Qo, 0);
  return (
    n % Bn !== 0 && (l -= t.slice(a * Bn, n).reduce(Qo, 0)),
    r % Bn !== 0 && r !== o && (l -= t.slice(r, i * Bn).reduce(Qo, 0)),
    l
  );
}
const wm = {
    virtualScrollSliceSize: { type: [Number, String], default: null },
    virtualScrollSliceRatioBefore: { type: [Number, String], default: 1 },
    virtualScrollSliceRatioAfter: { type: [Number, String], default: 1 },
    virtualScrollItemSize: { type: [Number, String], default: 24 },
    virtualScrollStickySizeStart: { type: [Number, String], default: 0 },
    virtualScrollStickySizeEnd: { type: [Number, String], default: 0 },
    tableColspan: [Number, String],
  },
  xm = Object.keys(wm),
  Em = { virtualScrollHorizontal: Boolean, onVirtualScroll: Function, ...wm };
function Cm({
  virtualScrollLength: e,
  getVirtualScrollTarget: t,
  getVirtualScrollEl: n,
  virtualScrollItemSizeComputed: r,
}) {
  const o = Fe(),
    { props: a, emit: i, proxy: l } = o,
    { $q: s } = l;
  let u,
    c,
    f,
    d = [],
    h;
  const v = fe(0),
    m = fe(0),
    g = fe({}),
    y = fe(null),
    p = fe(null),
    w = fe(null),
    b = fe({ from: 0, to: 0 }),
    S = O(() => (a.tableColspan !== void 0 ? a.tableColspan : 100));
  r === void 0 && (r = O(() => a.virtualScrollItemSize));
  const E = O(() => r.value + ";" + a.virtualScrollHorizontal),
    A = O(
      () =>
        E.value +
        ";" +
        a.virtualScrollSliceRatioBefore +
        ";" +
        a.virtualScrollSliceRatioAfter
    );
  me(A, () => {
    j();
  }),
    me(E, T);
  function T() {
    G(c, !0);
  }
  function x(X) {
    G(X === void 0 ? c : X);
  }
  function C(X, H) {
    const se = t();
    if (se == null || se.nodeType === 8) return;
    const Ee = Hs(
      se,
      n(),
      y.value,
      p.value,
      a.virtualScrollHorizontal,
      s.lang.rtl,
      a.virtualScrollStickySizeStart,
      a.virtualScrollStickySizeEnd
    );
    f !== Ee.scrollViewSize && j(Ee.scrollViewSize),
      I(
        se,
        Ee,
        Math.min(e.value - 1, Math.max(0, parseInt(X, 10) || 0)),
        0,
        tE.indexOf(H) > -1 ? H : c > -1 && X > c ? "end" : "start"
      );
  }
  function D() {
    const X = t();
    if (X == null || X.nodeType === 8) return;
    const H = Hs(
        X,
        n(),
        y.value,
        p.value,
        a.virtualScrollHorizontal,
        s.lang.rtl,
        a.virtualScrollStickySizeStart,
        a.virtualScrollStickySizeEnd
      ),
      se = e.value - 1,
      Ee = H.scrollMaxSize - H.offsetStart - H.offsetEnd - m.value;
    if (u === H.scrollStart) return;
    if (H.scrollMaxSize <= 0) {
      I(X, H, 0, 0);
      return;
    }
    f !== H.scrollViewSize && j(H.scrollViewSize), $(b.value.from);
    const de = Math.floor(
      H.scrollMaxSize -
        Math.max(H.scrollViewSize, H.offsetEnd) -
        Math.min(h[se], H.scrollViewSize / 2)
    );
    if (de > 0 && Math.ceil(H.scrollStart) >= de) {
      I(X, H, se, H.scrollMaxSize - H.offsetEnd - d.reduce(Qo, 0));
      return;
    }
    let ne = 0,
      N = H.scrollStart - H.offsetStart,
      ae = N;
    if (N <= Ee && N + H.scrollViewSize >= v.value)
      (N -= v.value), (ne = b.value.from), (ae = N);
    else for (let U = 0; N >= d[U] && ne < se; U++) (N -= d[U]), (ne += Bn);
    for (; N > 0 && ne < se; )
      (N -= h[ne]), N > -H.scrollViewSize ? (ne++, (ae = N)) : (ae = h[ne] + N);
    I(X, H, ne, ae);
  }
  function I(X, H, se, Ee, de) {
    const ne = typeof de == "string" && de.indexOf("-force") > -1,
      N = ne === !0 ? de.replace("-force", "") : de,
      ae = N !== void 0 ? N : "start";
    let U = Math.max(0, se - g.value[ae]),
      he = U + g.value.total;
    he > e.value && ((he = e.value), (U = Math.max(0, he - g.value.total))),
      (u = H.scrollStart);
    const Le = U !== b.value.from || he !== b.value.to;
    if (Le === !1 && N === void 0) {
      oe(se);
      return;
    }
    const { activeElement: R } = document,
      P = w.value;
    Le === !0 &&
      P !== null &&
      P !== R &&
      P.contains(R) === !0 &&
      (P.addEventListener("focusout", L),
      setTimeout(() => {
        P !== null && P.removeEventListener("focusout", L);
      })),
      nE(P, se - U);
    const B = N !== void 0 ? h.slice(U, se).reduce(Qo, 0) : 0;
    if (Le === !0) {
      const Q = he >= b.value.from && U <= b.value.to ? b.value.to : he;
      (b.value = { from: U, to: Q }),
        (v.value = bi(d, h, 0, U)),
        (m.value = bi(d, h, he, e.value)),
        requestAnimationFrame(() => {
          b.value.to !== he &&
            u === H.scrollStart &&
            ((b.value = { from: b.value.from, to: he }),
            (m.value = bi(d, h, he, e.value)));
        });
    }
    requestAnimationFrame(() => {
      if (u !== H.scrollStart) return;
      Le === !0 && $(U);
      const Q = h.slice(U, se).reduce(Qo, 0),
        Y = Q + H.offsetStart + v.value,
        te = Y + h[se];
      let ve = Y + Ee;
      if (N !== void 0) {
        const ue = Q - B,
          ie = H.scrollStart + ue;
        ve =
          ne !== !0 && ie < Y && te < ie + H.scrollViewSize
            ? ie
            : N === "end"
            ? te - H.scrollViewSize
            : Y -
              (N === "start" ? 0 : Math.round((H.scrollViewSize - h[se]) / 2));
      }
      (u = ve), ih(X, ve, a.virtualScrollHorizontal, s.lang.rtl), oe(se);
    });
  }
  function $(X) {
    const H = w.value;
    if (H) {
      const se = Sm.call(
          H.children,
          (U) =>
            U.classList && U.classList.contains("q-virtual-scroll--skip") === !1
        ),
        Ee = se.length,
        de =
          a.virtualScrollHorizontal === !0
            ? (U) => U.getBoundingClientRect().width
            : (U) => U.offsetHeight;
      let ne = X,
        N,
        ae;
      for (let U = 0; U < Ee; ) {
        for (
          N = de(se[U]), U++;
          U < Ee &&
          se[U].classList.contains("q-virtual-scroll--with-prev") === !0;

        )
          (N += de(se[U])), U++;
        (ae = N - h[ne]),
          ae !== 0 && ((h[ne] += ae), (d[Math.floor(ne / Bn)] += ae)),
          ne++;
      }
    }
  }
  function L() {
    w.value !== null && w.value !== void 0 && w.value.focus();
  }
  function G(X, H) {
    const se = 1 * r.value;
    (H === !0 || Array.isArray(h) === !1) && (h = []);
    const Ee = h.length;
    h.length = e.value;
    for (let ne = e.value - 1; ne >= Ee; ne--) h[ne] = se;
    const de = Math.floor((e.value - 1) / Bn);
    d = [];
    for (let ne = 0; ne <= de; ne++) {
      let N = 0;
      const ae = Math.min((ne + 1) * Bn, e.value);
      for (let U = ne * Bn; U < ae; U++) N += h[U];
      d.push(N);
    }
    (c = -1),
      (u = void 0),
      (v.value = bi(d, h, 0, b.value.from)),
      (m.value = bi(d, h, b.value.to, e.value)),
      X >= 0
        ? ($(b.value.from),
          at(() => {
            C(X);
          }))
        : xe();
  }
  function j(X) {
    if (X === void 0 && typeof window != "undefined") {
      const N = t();
      N != null &&
        N.nodeType !== 8 &&
        (X = Hs(
          N,
          n(),
          y.value,
          p.value,
          a.virtualScrollHorizontal,
          s.lang.rtl,
          a.virtualScrollStickySizeStart,
          a.virtualScrollStickySizeEnd
        ).scrollViewSize);
    }
    f = X;
    const H = parseFloat(a.virtualScrollSliceRatioBefore) || 0,
      se = parseFloat(a.virtualScrollSliceRatioAfter) || 0,
      Ee = 1 + H + se,
      de = X === void 0 || X <= 0 ? 1 : Math.ceil(X / r.value),
      ne = Math.max(
        1,
        de,
        Math.ceil(
          (a.virtualScrollSliceSize > 0 ? a.virtualScrollSliceSize : 10) / Ee
        )
      );
    g.value = {
      total: Math.ceil(ne * Ee),
      start: Math.ceil(ne * H),
      center: Math.ceil(ne * (0.5 + H)),
      end: Math.ceil(ne * (1 + H)),
      view: de,
    };
  }
  function V(X, H) {
    const se = a.virtualScrollHorizontal === !0 ? "width" : "height",
      Ee = { ["--q-virtual-scroll-item-" + se]: r.value + "px" };
    return [
      X === "tbody"
        ? k(X, { class: "q-virtual-scroll__padding", key: "before", ref: y }, [
            k("tr", [
              k("td", {
                style: { [se]: `${v.value}px`, ...Ee },
                colspan: S.value,
              }),
            ]),
          ])
        : k(X, {
            class: "q-virtual-scroll__padding",
            key: "before",
            ref: y,
            style: { [se]: `${v.value}px`, ...Ee },
          }),
      k(
        X,
        {
          class: "q-virtual-scroll__content",
          key: "content",
          ref: w,
          tabindex: -1,
        },
        H.flat()
      ),
      X === "tbody"
        ? k(X, { class: "q-virtual-scroll__padding", key: "after", ref: p }, [
            k("tr", [
              k("td", {
                style: { [se]: `${m.value}px`, ...Ee },
                colspan: S.value,
              }),
            ]),
          ])
        : k(X, {
            class: "q-virtual-scroll__padding",
            key: "after",
            ref: p,
            style: { [se]: `${m.value}px`, ...Ee },
          }),
    ];
  }
  function oe(X) {
    c !== X &&
      (a.onVirtualScroll !== void 0 &&
        i("virtualScroll", {
          index: X,
          from: b.value.from,
          to: b.value.to - 1,
          direction: X < c ? "decrease" : "increase",
          ref: l,
        }),
      (c = X));
  }
  j();
  const xe = Ic(D, s.platform.is.ios === !0 ? 120 : 35);
  Sa(() => {
    j();
  });
  let J = !1;
  return (
    qr(() => {
      J = !0;
    }),
    si(() => {
      if (J !== !0) return;
      const X = t();
      u !== void 0 && X !== void 0 && X !== null && X.nodeType !== 8
        ? ih(X, u, a.virtualScrollHorizontal, s.lang.rtl)
        : C(c);
    }),
    vt(() => {
      xe.cancel();
    }),
    Object.assign(l, { scrollTo: C, reset: T, refresh: x }),
    {
      virtualScrollSliceRange: b,
      virtualScrollSliceSizeComputed: g,
      setVirtualScrollSize: j,
      onVirtualScrollEvt: xe,
      localResetVirtualScroll: G,
      padVirtualScroll: V,
      scrollTo: C,
      reset: T,
      refresh: x,
    }
  );
}
const ah = (e) => ["add", "add-unique", "toggle"].includes(e),
  rE = ".*+?^${}()|[]\\",
  oE = Object.keys(ls);
var Ki = Ue({
    name: "QSelect",
    inheritAttrs: !1,
    props: {
      ...Em,
      ...Jc,
      ...ls,
      modelValue: { required: !0 },
      multiple: Boolean,
      displayValue: [String, Number],
      displayValueHtml: Boolean,
      dropdownIcon: String,
      options: { type: Array, default: () => [] },
      optionValue: [Function, String],
      optionLabel: [Function, String],
      optionDisable: [Function, String],
      hideSelected: Boolean,
      hideDropdownIcon: Boolean,
      fillInput: Boolean,
      maxValues: [Number, String],
      optionsDense: Boolean,
      optionsDark: { type: Boolean, default: null },
      optionsSelectedClass: String,
      optionsHtml: Boolean,
      optionsCover: Boolean,
      menuShrink: Boolean,
      menuAnchor: String,
      menuSelf: String,
      menuOffset: Array,
      popupContentClass: String,
      popupContentStyle: [String, Array, Object],
      useInput: Boolean,
      useChips: Boolean,
      newValueMode: { type: String, validator: ah },
      mapOptions: Boolean,
      emitValue: Boolean,
      inputDebounce: { type: [Number, String], default: 500 },
      inputClass: [Array, String, Object],
      inputStyle: [Array, String, Object],
      tabindex: { type: [String, Number], default: 0 },
      autocomplete: String,
      transitionShow: String,
      transitionHide: String,
      transitionDuration: [String, Number],
      behavior: {
        type: String,
        validator: (e) => ["default", "menu", "dialog"].includes(e),
        default: "default",
      },
      virtualScrollItemSize: { type: [Number, String], default: void 0 },
      onNewValue: Function,
      onFilter: Function,
    },
    emits: [
      ...Gc,
      "add",
      "remove",
      "inputValue",
      "newValue",
      "keyup",
      "keypress",
      "keydown",
      "filterAbort",
    ],
    setup(e, { slots: t, emit: n }) {
      const { proxy: r } = Fe(),
        { $q: o } = r,
        a = fe(!1),
        i = fe(!1),
        l = fe(-1),
        s = fe(""),
        u = fe(!1),
        c = fe(!1);
      let f = null,
        d,
        h,
        v,
        m = null,
        g,
        y,
        p,
        w;
      const b = fe(null),
        S = fe(null),
        E = fe(null),
        A = fe(null),
        T = fe(null),
        x = gm(e),
        C = ym(Z),
        D = O(() => (Array.isArray(e.options) ? e.options.length : 0)),
        I = O(() =>
          e.virtualScrollItemSize === void 0
            ? e.optionsDense === !0
              ? 24
              : 48
            : e.virtualScrollItemSize
        ),
        {
          virtualScrollSliceRange: $,
          virtualScrollSliceSizeComputed: L,
          localResetVirtualScroll: G,
          padVirtualScroll: j,
          onVirtualScrollEvt: V,
          scrollTo: oe,
          setVirtualScrollSize: xe,
        } = Cm({
          virtualScrollLength: D,
          getVirtualScrollTarget: Ke,
          getVirtualScrollEl: Ie,
          virtualScrollItemSizeComputed: I,
        }),
        J = Xc(),
        X = O(() => {
          const F = e.mapOptions === !0 && e.multiple !== !0,
            Oe =
              e.modelValue !== void 0 && (e.modelValue !== null || F === !0)
                ? e.multiple === !0 && Array.isArray(e.modelValue)
                  ? e.modelValue
                  : [e.modelValue]
                : [];
          if (e.mapOptions === !0 && Array.isArray(e.options) === !0) {
            const Se = e.mapOptions === !0 && d !== void 0 ? d : [],
              qe = Oe.map((pt) => le(pt, Se));
            return e.modelValue === null && F === !0
              ? qe.filter((pt) => pt !== null)
              : qe;
          }
          return Oe;
        }),
        H = O(() => {
          const F = {};
          return (
            oE.forEach((Oe) => {
              const Se = e[Oe];
              Se !== void 0 && (F[Oe] = Se);
            }),
            F
          );
        }),
        se = O(() => (e.optionsDark === null ? J.isDark.value : e.optionsDark)),
        Ee = O(() => da(X.value)),
        de = O(() => {
          let F = "q-field__input q-placeholder col";
          return e.hideSelected === !0 || X.value.length === 0
            ? [F, e.inputClass]
            : ((F += " q-field__input--padding"),
              e.inputClass === void 0 ? F : [F, e.inputClass]);
        }),
        ne = O(
          () =>
            (e.virtualScrollHorizontal === !0
              ? "q-virtual-scroll--horizontal"
              : "") + (e.popupContentClass ? " " + e.popupContentClass : "")
        ),
        N = O(() => D.value === 0),
        ae = O(() => X.value.map((F) => ee.value(F)).join(", ")),
        U = O(() => (e.displayValue !== void 0 ? e.displayValue : ae.value)),
        he = O(() =>
          e.optionsHtml === !0 ? () => !0 : (F) => F != null && F.html === !0
        ),
        Le = O(
          () =>
            e.displayValueHtml === !0 ||
            (e.displayValue === void 0 &&
              (e.optionsHtml === !0 || X.value.some(he.value)))
        ),
        R = O(() => (J.focused.value === !0 ? e.tabindex : -1)),
        P = O(() => {
          const F = {
            tabindex: e.tabindex,
            role: "combobox",
            "aria-label": e.label,
            "aria-readonly": e.readonly === !0 ? "true" : "false",
            "aria-autocomplete": e.useInput === !0 ? "list" : "none",
            "aria-expanded": a.value === !0 ? "true" : "false",
            "aria-controls": `${J.targetUid.value}_lb`,
          };
          return (
            l.value >= 0 &&
              (F["aria-activedescendant"] = `${J.targetUid.value}_${l.value}`),
            F
          );
        }),
        B = O(() => ({
          id: `${J.targetUid.value}_lb`,
          role: "listbox",
          "aria-multiselectable": e.multiple === !0 ? "true" : "false",
        })),
        Q = O(() =>
          X.value.map((F, Oe) => ({
            index: Oe,
            opt: F,
            html: he.value(F),
            selected: !0,
            removeAtIndex: We,
            toggleOption: q,
            tabindex: R.value,
          }))
        ),
        Y = O(() => {
          if (D.value === 0) return [];
          const { from: F, to: Oe } = $.value;
          return e.options.slice(F, Oe).map((Se, qe) => {
            const pt = ye.value(Se) === !0,
              st = F + qe,
              Mt = {
                clickable: !0,
                active: !1,
                activeClass: ue.value,
                manualFocus: !0,
                focused: !1,
                disable: pt,
                tabindex: -1,
                dense: e.optionsDense,
                dark: se.value,
                role: "option",
                id: `${J.targetUid.value}_${st}`,
                onClick: () => {
                  q(Se);
                },
              };
            return (
              pt !== !0 &&
                (Ae(Se) === !0 && (Mt.active = !0),
                l.value === st && (Mt.focused = !0),
                (Mt["aria-selected"] = Mt.active === !0 ? "true" : "false"),
                o.platform.is.desktop === !0 &&
                  (Mt.onMousemove = () => {
                    a.value === !0 && _(st);
                  })),
              {
                index: st,
                opt: Se,
                html: he.value(Se),
                label: ee.value(Se),
                selected: Mt.active,
                focused: Mt.focused,
                toggleOption: q,
                setOptionIndex: _,
                itemProps: Mt,
              }
            );
          });
        }),
        te = O(() =>
          e.dropdownIcon !== void 0 ? e.dropdownIcon : o.iconSet.arrow.dropdown
        ),
        ve = O(
          () =>
            e.optionsCover === !1 &&
            e.outlined !== !0 &&
            e.standout !== !0 &&
            e.borderless !== !0 &&
            e.rounded !== !0
        ),
        ue = O(() =>
          e.optionsSelectedClass !== void 0
            ? e.optionsSelectedClass
            : e.color !== void 0
            ? `text-${e.color}`
            : ""
        ),
        ie = O(() => ge(e.optionValue, "value")),
        ee = O(() => ge(e.optionLabel, "label")),
        ye = O(() => ge(e.optionDisable, "disable")),
        K = O(() => X.value.map((F) => ie.value(F))),
        ce = O(() => {
          const F = {
            onInput: Z,
            onChange: C,
            onKeydown: Ce,
            onKeyup: it,
            onKeypress: De,
            onFocus: Pe,
            onClick(Oe) {
              h === !0 && bn(Oe);
            },
          };
          return (
            (F.onCompositionstart =
              F.onCompositionupdate =
              F.onCompositionend =
                C),
            F
          );
        });
      me(
        X,
        (F) => {
          (d = F),
            e.useInput === !0 &&
              e.fillInput === !0 &&
              e.multiple !== !0 &&
              J.innerLoading.value !== !0 &&
              ((i.value !== !0 && a.value !== !0) || Ee.value !== !0) &&
              (v !== !0 && To(), (i.value === !0 || a.value === !0) && Be(""));
        },
        { immediate: !0 }
      ),
        me(() => e.fillInput, To),
        me(a, ms),
        me(D, ug);
      function we(F) {
        return e.emitValue === !0 ? ie.value(F) : F;
      }
      function ke(F) {
        if (F > -1 && F < X.value.length)
          if (e.multiple === !0) {
            const Oe = e.modelValue.slice();
            n("remove", { index: F, value: Oe.splice(F, 1)[0] }),
              n("update:modelValue", Oe);
          } else n("update:modelValue", null);
      }
      function We(F) {
        ke(F), J.focus();
      }
      function ze(F, Oe) {
        const Se = we(F);
        if (e.multiple !== !0) {
          e.fillInput === !0 && Me(ee.value(F), !0, !0),
            n("update:modelValue", Se);
          return;
        }
        if (X.value.length === 0) {
          n("add", { index: 0, value: Se }),
            n("update:modelValue", e.multiple === !0 ? [Se] : Se);
          return;
        }
        if (
          (Oe === !0 && Ae(F) === !0) ||
          (e.maxValues !== void 0 && e.modelValue.length >= e.maxValues)
        )
          return;
        const qe = e.modelValue.slice();
        n("add", { index: qe.length, value: Se }),
          qe.push(Se),
          n("update:modelValue", qe);
      }
      function q(F, Oe) {
        if (J.editable.value !== !0 || F === void 0 || ye.value(F) === !0)
          return;
        const Se = ie.value(F);
        if (e.multiple !== !0) {
          Oe !== !0 &&
            (Me(e.fillInput === !0 ? ee.value(F) : "", !0, !0), _r()),
            S.value !== null && S.value.focus(),
            (X.value.length === 0 || Pr(ie.value(X.value[0]), Se) !== !0) &&
              n("update:modelValue", e.emitValue === !0 ? Se : F);
          return;
        }
        if (
          ((h !== !0 || u.value === !0) && J.focus(),
          Pe(),
          X.value.length === 0)
        ) {
          const st = e.emitValue === !0 ? Se : F;
          n("add", { index: 0, value: st }),
            n("update:modelValue", e.multiple === !0 ? [st] : st);
          return;
        }
        const qe = e.modelValue.slice(),
          pt = K.value.findIndex((st) => Pr(st, Se));
        if (pt > -1) n("remove", { index: pt, value: qe.splice(pt, 1)[0] });
        else {
          if (e.maxValues !== void 0 && qe.length >= e.maxValues) return;
          const st = e.emitValue === !0 ? Se : F;
          n("add", { index: qe.length, value: st }), qe.push(st);
        }
        n("update:modelValue", qe);
      }
      function _(F) {
        if (o.platform.is.desktop !== !0) return;
        const Oe = F > -1 && F < D.value ? F : -1;
        l.value !== Oe && (l.value = Oe);
      }
      function W(F = 1, Oe) {
        if (a.value === !0) {
          let Se = l.value;
          do Se = Ed(Se + F, -1, D.value - 1);
          while (Se !== -1 && Se !== l.value && ye.value(e.options[Se]) === !0);
          l.value !== Se &&
            (_(Se),
            oe(Se),
            Oe !== !0 &&
              e.useInput === !0 &&
              e.fillInput === !0 &&
              be(Se >= 0 ? ee.value(e.options[Se]) : g));
        }
      }
      function le(F, Oe) {
        const Se = (qe) => Pr(ie.value(qe), F);
        return e.options.find(Se) || Oe.find(Se) || F;
      }
      function ge(F, Oe) {
        const Se = F !== void 0 ? F : Oe;
        return typeof Se == "function"
          ? Se
          : (qe) =>
              qe !== null && typeof qe == "object" && Se in qe ? qe[Se] : qe;
      }
      function Ae(F) {
        const Oe = ie.value(F);
        return K.value.find((Se) => Pr(Se, Oe)) !== void 0;
      }
      function Pe(F) {
        e.useInput === !0 &&
          S.value !== null &&
          (F === void 0 ||
            (S.value === F.target && F.target.value === ae.value)) &&
          S.value.select();
      }
      function Ne(F) {
        Vr(F, 27) === !0 && a.value === !0 && (bn(F), _r(), To()),
          n("keyup", F);
      }
      function it(F) {
        const { value: Oe } = F.target;
        if (F.keyCode !== void 0) {
          Ne(F);
          return;
        }
        if (
          ((F.target.value = ""),
          f !== null && (clearTimeout(f), (f = null)),
          To(),
          typeof Oe == "string" && Oe.length !== 0)
        ) {
          const Se = Oe.toLocaleLowerCase(),
            qe = (st) => {
              const Mt = e.options.find(
                (nn) => st.value(nn).toLocaleLowerCase() === Se
              );
              return Mt === void 0
                ? !1
                : (X.value.indexOf(Mt) === -1 ? q(Mt) : _r(), !0);
            },
            pt = (st) => {
              qe(ie) !== !0 &&
                (qe(ee) === !0 || st === !0 || Be(Oe, !0, () => pt(!0)));
            };
          pt();
        } else J.clearValue(F);
      }
      function De(F) {
        n("keypress", F);
      }
      function Ce(F) {
        if ((n("keydown", F), Lc(F) === !0)) return;
        const Oe =
            s.value.length !== 0 &&
            (e.newValueMode !== void 0 || e.onNewValue !== void 0),
          Se =
            F.shiftKey !== !0 &&
            e.multiple !== !0 &&
            (l.value > -1 || Oe === !0);
        if (F.keyCode === 27) {
          an(F);
          return;
        }
        if (F.keyCode === 9 && Se === !1) {
          Co();
          return;
        }
        if (
          F.target === void 0 ||
          F.target.id !== J.targetUid.value ||
          J.editable.value !== !0
        )
          return;
        if (F.keyCode === 40 && J.innerLoading.value !== !0 && a.value === !1) {
          Dt(F), Oo();
          return;
        }
        if (F.keyCode === 8 && e.hideSelected !== !0 && s.value.length === 0) {
          e.multiple === !0 && Array.isArray(e.modelValue) === !0
            ? ke(e.modelValue.length - 1)
            : e.multiple !== !0 &&
              e.modelValue !== null &&
              n("update:modelValue", null);
          return;
        }
        (F.keyCode === 35 || F.keyCode === 36) &&
          (typeof s.value != "string" || s.value.length === 0) &&
          (Dt(F), (l.value = -1), W(F.keyCode === 36 ? 1 : -1, e.multiple)),
          (F.keyCode === 33 || F.keyCode === 34) &&
            L.value !== void 0 &&
            (Dt(F),
            (l.value = Math.max(
              -1,
              Math.min(
                D.value,
                l.value + (F.keyCode === 33 ? -1 : 1) * L.value.view
              )
            )),
            W(F.keyCode === 33 ? 1 : -1, e.multiple)),
          (F.keyCode === 38 || F.keyCode === 40) &&
            (Dt(F), W(F.keyCode === 38 ? -1 : 1, e.multiple));
        const qe = D.value;
        if (
          ((p === void 0 || w < Date.now()) && (p = ""),
          qe > 0 &&
            e.useInput !== !0 &&
            F.key !== void 0 &&
            F.key.length === 1 &&
            F.altKey === !1 &&
            F.ctrlKey === !1 &&
            F.metaKey === !1 &&
            (F.keyCode !== 32 || p.length !== 0))
        ) {
          a.value !== !0 && Oo(F);
          const pt = F.key.toLocaleLowerCase(),
            st = p.length === 1 && p[0] === pt;
          (w = Date.now() + 1500), st === !1 && (Dt(F), (p += pt));
          const Mt = new RegExp(
            "^" +
              p
                .split("")
                .map((gs) => (rE.indexOf(gs) > -1 ? "\\" + gs : gs))
                .join(".*"),
            "i"
          );
          let nn = l.value;
          if (st === !0 || nn < 0 || Mt.test(ee.value(e.options[nn])) !== !0)
            do nn = Ed(nn + 1, -1, qe - 1);
            while (
              nn !== l.value &&
              (ye.value(e.options[nn]) === !0 ||
                Mt.test(ee.value(e.options[nn])) !== !0)
            );
          l.value !== nn &&
            at(() => {
              _(nn),
                oe(nn),
                nn >= 0 &&
                  e.useInput === !0 &&
                  e.fillInput === !0 &&
                  be(ee.value(e.options[nn]));
            });
          return;
        }
        if (
          !(
            F.keyCode !== 13 &&
            (F.keyCode !== 32 || e.useInput === !0 || p !== "") &&
            (F.keyCode !== 9 || Se === !1)
          )
        ) {
          if ((F.keyCode !== 9 && Dt(F), l.value > -1 && l.value < qe)) {
            q(e.options[l.value]);
            return;
          }
          if (Oe === !0) {
            const pt = (st, Mt) => {
              if (Mt) {
                if (ah(Mt) !== !0) return;
              } else Mt = e.newValueMode;
              if ((Me("", e.multiple !== !0, !0), st == null)) return;
              (Mt === "toggle" ? q : ze)(st, Mt === "add-unique"),
                e.multiple !== !0 &&
                  (S.value !== null && S.value.focus(), _r());
            };
            if (
              (e.onNewValue !== void 0
                ? n("newValue", s.value, pt)
                : pt(s.value),
              e.multiple !== !0)
            )
              return;
          }
          a.value === !0 ? Co() : J.innerLoading.value !== !0 && Oo();
        }
      }
      function Ie() {
        return h === !0
          ? T.value
          : E.value !== null && E.value.contentEl !== null
          ? E.value.contentEl
          : void 0;
      }
      function Ke() {
        return Ie();
      }
      function Xe() {
        return e.hideSelected === !0
          ? []
          : t["selected-item"] !== void 0
          ? Q.value.map((F) => t["selected-item"](F)).slice()
          : t.selected !== void 0
          ? [].concat(t.selected())
          : e.useChips === !0
          ? Q.value.map((F, Oe) =>
              k(
                qu,
                {
                  key: "option-" + Oe,
                  removable: J.editable.value === !0 && ye.value(F.opt) !== !0,
                  dense: !0,
                  textColor: e.color,
                  tabindex: R.value,
                  onRemove() {
                    F.removeAtIndex(Oe);
                  },
                },
                () =>
                  k("span", {
                    class: "ellipsis",
                    [F.html === !0 ? "innerHTML" : "textContent"]: ee.value(
                      F.opt
                    ),
                  })
              )
            )
          : [
              k("span", {
                [Le.value === !0 ? "innerHTML" : "textContent"]: U.value,
              }),
            ];
      }
      function Ht() {
        if (N.value === !0)
          return t["no-option"] !== void 0
            ? t["no-option"]({ inputValue: s.value })
            : void 0;
        const F =
          t.option !== void 0
            ? t.option
            : (Se) =>
                k(_t, { key: Se.index, ...Se.itemProps }, () =>
                  k(Je, () =>
                    k(At, () =>
                      k("span", {
                        [Se.html === !0 ? "innerHTML" : "textContent"]:
                          Se.label,
                      })
                    )
                  )
                );
        let Oe = j("div", Y.value.map(F));
        return (
          t["before-options"] !== void 0 &&
            (Oe = t["before-options"]().concat(Oe)),
          qn(t["after-options"], Oe)
        );
      }
      function Hr(F, Oe) {
        const Se =
            Oe === !0
              ? { ...P.value, ...J.splitAttrs.attributes.value }
              : void 0,
          qe = {
            ref: Oe === !0 ? S : void 0,
            key: "i_t",
            class: de.value,
            style: e.inputStyle,
            value: s.value !== void 0 ? s.value : "",
            type: "search",
            ...Se,
            id: Oe === !0 ? J.targetUid.value : void 0,
            maxlength: e.maxlength,
            autocomplete: e.autocomplete,
            "data-autofocus": F === !0 || e.autofocus === !0 || void 0,
            disabled: e.disable === !0,
            readonly: e.readonly === !0,
            ...ce.value,
          };
        return (
          F !== !0 &&
            h === !0 &&
            (Array.isArray(qe.class) === !0
              ? (qe.class = [...qe.class, "no-pointer-events"])
              : (qe.class += " no-pointer-events")),
          k("input", qe)
        );
      }
      function Z(F) {
        f !== null && (clearTimeout(f), (f = null)),
          !(F && F.target && F.target.qComposing === !0) &&
            (be(F.target.value || ""),
            (v = !0),
            (g = s.value),
            J.focused.value !== !0 && (h !== !0 || u.value === !0) && J.focus(),
            e.onFilter !== void 0 &&
              (f = setTimeout(() => {
                (f = null), Be(s.value);
              }, e.inputDebounce)));
      }
      function be(F) {
        s.value !== F && ((s.value = F), n("inputValue", F));
      }
      function Me(F, Oe, Se) {
        (v = Se !== !0),
          e.useInput === !0 &&
            (be(F), (Oe === !0 || Se !== !0) && (g = F), Oe !== !0 && Be(F));
      }
      function Be(F, Oe, Se) {
        if (e.onFilter === void 0 || (Oe !== !0 && J.focused.value !== !0))
          return;
        J.innerLoading.value === !0
          ? n("filterAbort")
          : ((J.innerLoading.value = !0), (c.value = !0)),
          F !== "" &&
            e.multiple !== !0 &&
            X.value.length !== 0 &&
            v !== !0 &&
            F === ee.value(X.value[0]) &&
            (F = "");
        const qe = setTimeout(() => {
          a.value === !0 && (a.value = !1);
        }, 10);
        m !== null && clearTimeout(m),
          (m = qe),
          n(
            "filter",
            F,
            (pt, st) => {
              (Oe === !0 || J.focused.value === !0) &&
                m === qe &&
                (clearTimeout(m),
                typeof pt == "function" && pt(),
                (c.value = !1),
                at(() => {
                  (J.innerLoading.value = !1),
                    J.editable.value === !0 &&
                      (Oe === !0
                        ? a.value === !0 && _r()
                        : a.value === !0
                        ? ms(!0)
                        : (a.value = !0)),
                    typeof st == "function" &&
                      at(() => {
                        st(r);
                      }),
                    typeof Se == "function" &&
                      at(() => {
                        Se(r);
                      });
                }));
            },
            () => {
              J.focused.value === !0 &&
                m === qe &&
                (clearTimeout(m), (J.innerLoading.value = !1), (c.value = !1)),
                a.value === !0 && (a.value = !1);
            }
          );
      }
      function Ye() {
        return k(
          eE,
          {
            ref: E,
            class: ne.value,
            style: e.popupContentStyle,
            modelValue: a.value,
            fit: e.menuShrink !== !0,
            cover: e.optionsCover === !0 && N.value !== !0 && e.useInput !== !0,
            anchor: e.menuAnchor,
            self: e.menuSelf,
            offset: e.menuOffset,
            dark: se.value,
            noParentEvent: !0,
            noRefocus: !0,
            noFocus: !0,
            square: ve.value,
            transitionShow: e.transitionShow,
            transitionHide: e.transitionHide,
            transitionDuration: e.transitionDuration,
            separateClosePopup: !0,
            ...B.value,
            onScrollPassive: V,
            onBeforeShow: ff,
            onBeforeHide: Ot,
            onShow: yt,
          },
          Ht
        );
      }
      function Ot(F) {
        df(F), Co();
      }
      function yt() {
        xe();
      }
      function kn(F) {
        bn(F),
          S.value !== null && S.value.focus(),
          (u.value = !0),
          window.scrollTo(
            window.pageXOffset ||
              window.scrollX ||
              document.body.scrollLeft ||
              0,
            0
          );
      }
      function Gt(F) {
        bn(F),
          at(() => {
            u.value = !1;
          });
      }
      function xo() {
        const F = [
          k(
            Ux,
            {
              class: `col-auto ${J.fieldClass.value}`,
              ...H.value,
              for: J.targetUid.value,
              dark: se.value,
              square: !0,
              loading: c.value,
              itemAligned: !1,
              filled: !0,
              stackLabel: s.value.length !== 0,
              ...J.splitAttrs.listeners.value,
              onFocus: kn,
              onBlur: Gt,
            },
            {
              ...t,
              rawControl: () => J.getControl(!0),
              before: void 0,
              after: void 0,
            }
          ),
        ];
        return (
          a.value === !0 &&
            F.push(
              k(
                "div",
                {
                  ref: T,
                  class: ne.value + " scroll",
                  style: e.popupContentStyle,
                  ...B.value,
                  onClick: an,
                  onScrollPassive: V,
                },
                Ht()
              )
            ),
          k(
            lr,
            {
              ref: A,
              modelValue: i.value,
              position: e.useInput === !0 ? "top" : void 0,
              transitionShow: y,
              transitionHide: e.transitionHide,
              transitionDuration: e.transitionDuration,
              onBeforeShow: ff,
              onBeforeHide: Eo,
              onHide: ps,
              onShow: sg,
            },
            () =>
              k(
                "div",
                {
                  class:
                    "q-select__dialog" +
                    (se.value === !0 ? " q-select__dialog--dark q-dark" : "") +
                    (u.value === !0 ? " q-select__dialog--focused" : ""),
                },
                F
              )
          )
        );
      }
      function Eo(F) {
        df(F),
          A.value !== null &&
            A.value.__updateRefocusTarget(
              J.rootRef.value.querySelector(
                ".q-field__native > [tabindex]:last-child"
              )
            ),
          (J.focused.value = !1);
      }
      function ps(F) {
        _r(), J.focused.value === !1 && n("blur", F), To();
      }
      function sg() {
        const F = document.activeElement;
        (F === null || F.id !== J.targetUid.value) &&
          S.value !== null &&
          S.value !== F &&
          S.value.focus(),
          xe();
      }
      function Co() {
        i.value !== !0 &&
          ((l.value = -1),
          a.value === !0 && (a.value = !1),
          J.focused.value === !1 &&
            (m !== null && (clearTimeout(m), (m = null)),
            J.innerLoading.value === !0 &&
              (n("filterAbort"), (J.innerLoading.value = !1), (c.value = !1))));
      }
      function Oo(F) {
        J.editable.value === !0 &&
          (h === !0
            ? (J.onControlFocusin(F),
              (i.value = !0),
              at(() => {
                J.focus();
              }))
            : J.focus(),
          e.onFilter !== void 0
            ? Be(s.value)
            : (N.value !== !0 || t["no-option"] !== void 0) && (a.value = !0));
      }
      function _r() {
        (i.value = !1), Co();
      }
      function To() {
        e.useInput === !0 &&
          Me(
            (e.multiple !== !0 &&
              e.fillInput === !0 &&
              X.value.length !== 0 &&
              ee.value(X.value[0])) ||
              "",
            !0,
            !0
          );
      }
      function ms(F) {
        let Oe = -1;
        if (F === !0) {
          if (X.value.length !== 0) {
            const Se = ie.value(X.value[0]);
            Oe = e.options.findIndex((qe) => Pr(ie.value(qe), Se));
          }
          G(Oe);
        }
        _(Oe);
      }
      function ug(F, Oe) {
        a.value === !0 &&
          J.innerLoading.value === !1 &&
          (G(-1, !0),
          at(() => {
            a.value === !0 &&
              J.innerLoading.value === !1 &&
              (F > Oe ? G() : ms(!0));
          }));
      }
      function cf() {
        i.value === !1 && E.value !== null && E.value.updatePosition();
      }
      function ff(F) {
        F !== void 0 && bn(F),
          n("popupShow", F),
          (J.hasPopupOpen = !0),
          J.onControlFocusin(F);
      }
      function df(F) {
        F !== void 0 && bn(F),
          n("popupHide", F),
          (J.hasPopupOpen = !1),
          J.onControlFocusout(F);
      }
      function hf() {
        (h =
          o.platform.is.mobile !== !0 && e.behavior !== "dialog"
            ? !1
            : e.behavior !== "menu" &&
              (e.useInput === !0
                ? t["no-option"] !== void 0 ||
                  e.onFilter !== void 0 ||
                  N.value === !1
                : !0)),
          (y =
            o.platform.is.ios === !0 && h === !0 && e.useInput === !0
              ? "fade"
              : e.transitionShow);
      }
      return (
        es(hf),
        wa(cf),
        hf(),
        vt(() => {
          f !== null && clearTimeout(f);
        }),
        Object.assign(r, {
          showPopup: Oo,
          hidePopup: _r,
          removeAtIndex: ke,
          add: ze,
          toggleOption: q,
          getOptionIndex: () => l.value,
          setOptionIndex: _,
          moveOptionSelection: W,
          filter: Be,
          updateMenuPosition: cf,
          updateInputValue: Me,
          isOptionSelected: Ae,
          getEmittingOptionValue: we,
          isOptionDisabled: (...F) => ye.value.apply(null, F) === !0,
          getOptionValue: (...F) => ie.value.apply(null, F),
          getOptionLabel: (...F) => ee.value.apply(null, F),
        }),
        Object.assign(J, {
          innerValue: X,
          fieldClass: O(
            () =>
              `q-select q-field--auto-height q-select--with${
                e.useInput !== !0 ? "out" : ""
              }-input q-select--with${
                e.useChips !== !0 ? "out" : ""
              }-chips q-select--${e.multiple === !0 ? "multiple" : "single"}`
          ),
          inputRef: b,
          targetRef: S,
          hasValue: Ee,
          showPopup: Oo,
          floatingLabel: O(
            () =>
              (e.hideSelected !== !0 && Ee.value === !0) ||
              typeof s.value == "number" ||
              s.value.length !== 0 ||
              da(e.displayValue)
          ),
          getControlChild: () => {
            if (
              J.editable.value !== !1 &&
              (i.value === !0 || N.value !== !0 || t["no-option"] !== void 0)
            )
              return h === !0 ? xo() : Ye();
            J.hasPopupOpen === !0 && (J.hasPopupOpen = !1);
          },
          controlEvents: {
            onFocusin(F) {
              J.onControlFocusin(F);
            },
            onFocusout(F) {
              J.onControlFocusout(F, () => {
                To(), Co();
              });
            },
            onClick(F) {
              if ((an(F), h !== !0 && a.value === !0)) {
                Co(), S.value !== null && S.value.focus();
                return;
              }
              Oo(F);
            },
          },
          getControl: (F) => {
            const Oe = Xe(),
              Se = F === !0 || i.value !== !0 || h !== !0;
            if (e.useInput === !0) Oe.push(Hr(F, Se));
            else if (J.editable.value === !0) {
              const pt = Se === !0 ? P.value : void 0;
              Oe.push(
                k("input", {
                  ref: Se === !0 ? S : void 0,
                  key: "d_t",
                  class: "q-select__focus-target",
                  id: Se === !0 ? J.targetUid.value : void 0,
                  value: U.value,
                  readonly: !0,
                  "data-autofocus": F === !0 || e.autofocus === !0 || void 0,
                  ...pt,
                  onKeydown: Ce,
                  onKeyup: Ne,
                  onKeypress: De,
                })
              ),
                Se === !0 &&
                  typeof e.autocomplete == "string" &&
                  e.autocomplete.length !== 0 &&
                  Oe.push(
                    k("input", {
                      class: "q-select__autocomplete-input",
                      autocomplete: e.autocomplete,
                      tabindex: -1,
                      onKeyup: it,
                    })
                  );
            }
            if (
              x.value !== void 0 &&
              e.disable !== !0 &&
              K.value.length !== 0
            ) {
              const pt = K.value.map((st) =>
                k("option", { value: st, selected: !0 })
              );
              Oe.push(
                k(
                  "select",
                  { class: "hidden", name: x.value, multiple: e.multiple },
                  pt
                )
              );
            }
            const qe =
              e.useInput === !0 || Se !== !0
                ? void 0
                : J.splitAttrs.attributes.value;
            return k(
              "div",
              {
                class: "q-field__native row items-center",
                ...qe,
                ...J.splitAttrs.listeners.value,
              },
              Oe
            );
          },
          getInnerAppend: () =>
            e.loading !== !0 && c.value !== !0 && e.hideDropdownIcon !== !0
              ? [
                  k(wt, {
                    class:
                      "q-select__dropdown-icon" +
                      (a.value === !0 ? " rotate-180" : ""),
                    name: te.value,
                  }),
                ]
              : null,
        }),
        Yc(J)
      );
    },
  }),
  jo = Ue({
    name: "QCardActions",
    props: { ...Hp, vertical: Boolean },
    setup(e, { slots: t }) {
      const n = _p(e),
        r = O(
          () =>
            `q-card__actions ${n.value} q-card__actions--${
              e.vertical === !0 ? "vert column" : "horiz row"
            }`
        );
      return () => k("div", { class: r.value }, ht(t.default));
    },
  }),
  _s = Ue({
    name: "QForm",
    props: {
      autofocus: Boolean,
      noErrorFocus: Boolean,
      noResetFocus: Boolean,
      greedy: Boolean,
      onSubmit: Function,
    },
    emits: ["reset", "validationSuccess", "validationError"],
    setup(e, { slots: t, emit: n }) {
      const r = Fe(),
        o = fe(null);
      let a = 0;
      const i = [];
      function l(h) {
        const v = typeof h == "boolean" ? h : e.noErrorFocus !== !0,
          m = ++a,
          g = (w, b) => {
            n("validation" + (w === !0 ? "Success" : "Error"), b);
          },
          y = (w) => {
            const b = w.validate();
            return typeof b.then == "function"
              ? b.then(
                  (S) => ({ valid: S, comp: w }),
                  (S) => ({ valid: !1, comp: w, err: S })
                )
              : Promise.resolve({ valid: b, comp: w });
          };
        return (
          e.greedy === !0
            ? Promise.all(i.map(y)).then((w) => w.filter((b) => b.valid !== !0))
            : i
                .reduce(
                  (w, b) =>
                    w.then(() =>
                      y(b).then((S) => {
                        if (S.valid === !1) return Promise.reject(S);
                      })
                    ),
                  Promise.resolve()
                )
                .catch((w) => [w])
        ).then((w) => {
          if (w === void 0 || w.length === 0) return m === a && g(!0), !0;
          if (m === a) {
            const { comp: b, err: S } = w[0];
            if ((S !== void 0 && console.error(S), g(!1, b), v === !0)) {
              const E = w.find(
                ({ comp: A }) => typeof A.focus == "function" && qc(A.$) === !1
              );
              E !== void 0 && E.comp.focus();
            }
          }
          return !1;
        });
      }
      function s() {
        a++,
          i.forEach((h) => {
            typeof h.resetValidation == "function" && h.resetValidation();
          });
      }
      function u(h) {
        h !== void 0 && Dt(h);
        const v = a + 1;
        l().then((m) => {
          v === a &&
            m === !0 &&
            (e.onSubmit !== void 0
              ? n("submit", h)
              : h !== void 0 &&
                h.target !== void 0 &&
                typeof h.target.submit == "function" &&
                h.target.submit());
        });
      }
      function c(h) {
        h !== void 0 && Dt(h),
          n("reset"),
          at(() => {
            s(), e.autofocus === !0 && e.noResetFocus !== !0 && f();
          });
      }
      function f() {
        Ca(() => {
          if (o.value === null) return;
          const h =
            o.value.querySelector(
              "[autofocus][tabindex], [data-autofocus][tabindex]"
            ) ||
            o.value.querySelector(
              "[autofocus] [tabindex], [data-autofocus] [tabindex]"
            ) ||
            o.value.querySelector("[autofocus], [data-autofocus]") ||
            Array.prototype.find.call(
              o.value.querySelectorAll("[tabindex]"),
              (v) => v.tabIndex > -1
            );
          h != null && h.focus({ preventScroll: !0 });
        });
      }
      Lr(yp, {
        bindComponent(h) {
          i.push(h);
        },
        unbindComponent(h) {
          const v = i.indexOf(h);
          v > -1 && i.splice(v, 1);
        },
      });
      let d = !1;
      return (
        qr(() => {
          d = !0;
        }),
        si(() => {
          d === !0 && e.autofocus === !0 && f();
        }),
        Ft(() => {
          e.autofocus === !0 && f();
        }),
        Object.assign(r.proxy, {
          validate: l,
          resetValidation: s,
          submit: u,
          reset: c,
          focus: f,
          getValidationComponents: () => i,
        }),
        () =>
          k(
            "form",
            { class: "q-form", ref: o, onSubmit: u, onReset: c },
            ht(t.default)
          )
      );
    },
  }),
  eo = Ue({
    name: "QCard",
    props: {
      ...In,
      tag: { type: String, default: "div" },
      square: Boolean,
      flat: Boolean,
      bordered: Boolean,
    },
    setup(e, { slots: t }) {
      const {
          proxy: { $q: n },
        } = Fe(),
        r = Ln(e, n),
        o = O(
          () =>
            "q-card" +
            (r.value === !0 ? " q-card--dark q-dark" : "") +
            (e.bordered === !0 ? " q-card--bordered" : "") +
            (e.square === !0 ? " q-card--square no-border-radius" : "") +
            (e.flat === !0 ? " q-card--flat no-shadow" : "")
        );
      return () => k(e.tag, { class: o.value }, ht(t.default));
    },
  });
const iE = {
    true: "inset",
    item: "item-inset",
    "item-thumbnail": "item-thumbnail-inset",
  },
  Us = { xs: 2, sm: 4, md: 8, lg: 16, xl: 24 };
var Gr = Ue({
    name: "QSeparator",
    props: {
      ...In,
      spaced: [Boolean, String],
      inset: [Boolean, String],
      vertical: Boolean,
      color: String,
      size: String,
    },
    setup(e) {
      const t = Fe(),
        n = Ln(e, t.proxy.$q),
        r = O(() => (e.vertical === !0 ? "vertical" : "horizontal")),
        o = O(() => ` q-separator--${r.value}`),
        a = O(() => (e.inset !== !1 ? `${o.value}-${iE[e.inset]}` : "")),
        i = O(
          () =>
            `q-separator${o.value}${a.value}` +
            (e.color !== void 0 ? ` bg-${e.color}` : "") +
            (n.value === !0 ? " q-separator--dark" : "")
        ),
        l = O(() => {
          const s = {};
          if (
            (e.size !== void 0 &&
              (s[e.vertical === !0 ? "width" : "height"] = e.size),
            e.spaced !== !1)
          ) {
            const u =
                e.spaced === !0
                  ? `${Us.md}px`
                  : e.spaced in Us
                  ? `${Us[e.spaced]}px`
                  : e.spaced,
              c = e.vertical === !0 ? ["Left", "Right"] : ["Top", "Bottom"];
            s[`margin${c[0]}`] = s[`margin${c[1]}`] = u;
          }
          return s;
        });
      return () =>
        k("hr", {
          class: i.value,
          style: l.value,
          "aria-orientation": r.value,
        });
    },
  }),
  _u = Ue({
    name: "QList",
    props: {
      ...In,
      bordered: Boolean,
      dense: Boolean,
      separator: Boolean,
      padding: Boolean,
      tag: { type: String, default: "div" },
    },
    setup(e, { slots: t }) {
      const n = Fe(),
        r = Ln(e, n.proxy.$q),
        o = O(
          () =>
            "q-list" +
            (e.bordered === !0 ? " q-list--bordered" : "") +
            (e.dense === !0 ? " q-list--dense" : "") +
            (e.separator === !0 ? " q-list--separator" : "") +
            (r.value === !0 ? " q-list--dark" : "") +
            (e.padding === !0 ? " q-list--padding" : "")
        );
      return () => k(e.tag, { class: o.value }, ht(t.default));
    },
  });
const aE = k("div", { class: "q-space" });
var lE = Ue({
    name: "QSpace",
    setup() {
      return () => aE;
    },
  }),
  sE = Ue({
    name: "QFooter",
    props: {
      modelValue: { type: Boolean, default: !0 },
      reveal: Boolean,
      bordered: Boolean,
      elevated: Boolean,
      heightHint: { type: [String, Number], default: 50 },
    },
    emits: ["reveal", "focusin"],
    setup(e, { slots: t, emit: n }) {
      const {
          proxy: { $q: r },
        } = Fe(),
        o = qt(wo, $t);
      if (o === $t)
        return console.error("QFooter needs to be child of QLayout"), $t;
      const a = fe(parseInt(e.heightHint, 10)),
        i = fe(!0),
        l = fe(
          _n.value === !0 || o.isContainer.value === !0 ? 0 : window.innerHeight
        ),
        s = O(
          () =>
            e.reveal === !0 ||
            o.view.value.indexOf("F") > -1 ||
            (r.platform.is.ios && o.isContainer.value === !0)
        ),
        u = O(() =>
          o.isContainer.value === !0 ? o.containerHeight.value : l.value
        ),
        c = O(() => {
          if (e.modelValue !== !0) return 0;
          if (s.value === !0) return i.value === !0 ? a.value : 0;
          const S =
            o.scroll.value.position + u.value + a.value - o.height.value;
          return S > 0 ? S : 0;
        }),
        f = O(() => e.modelValue !== !0 || (s.value === !0 && i.value !== !0)),
        d = O(() => e.modelValue === !0 && f.value === !0 && e.reveal === !0),
        h = O(
          () =>
            "q-footer q-layout__section--marginal " +
            (s.value === !0 ? "fixed" : "absolute") +
            "-bottom" +
            (e.bordered === !0 ? " q-footer--bordered" : "") +
            (f.value === !0 ? " q-footer--hidden" : "") +
            (e.modelValue !== !0
              ? " q-layout--prevent-focus" + (s.value !== !0 ? " hidden" : "")
              : "")
        ),
        v = O(() => {
          const S = o.rows.value.bottom,
            E = {};
          return (
            S[0] === "l" &&
              o.left.space === !0 &&
              (E[r.lang.rtl === !0 ? "right" : "left"] = `${o.left.size}px`),
            S[2] === "r" &&
              o.right.space === !0 &&
              (E[r.lang.rtl === !0 ? "left" : "right"] = `${o.right.size}px`),
            E
          );
        });
      function m(S, E) {
        o.update("footer", S, E);
      }
      function g(S, E) {
        S.value !== E && (S.value = E);
      }
      function y({ height: S }) {
        g(a, S), m("size", S);
      }
      function p() {
        if (e.reveal !== !0) return;
        const {
          direction: S,
          position: E,
          inflectionPoint: A,
        } = o.scroll.value;
        g(
          i,
          S === "up" ||
            E - A < 100 ||
            o.height.value - u.value - E - a.value < 300
        );
      }
      function w(S) {
        d.value === !0 && g(i, !0), n("focusin", S);
      }
      me(
        () => e.modelValue,
        (S) => {
          m("space", S), g(i, !0), o.animate();
        }
      ),
        me(c, (S) => {
          m("offset", S);
        }),
        me(
          () => e.reveal,
          (S) => {
            S === !1 && g(i, e.modelValue);
          }
        ),
        me(i, (S) => {
          o.animate(), n("reveal", S);
        }),
        me([a, o.scroll, o.height], p),
        me(
          () => r.screen.height,
          (S) => {
            o.isContainer.value !== !0 && g(l, S);
          }
        );
      const b = {};
      return (
        (o.instances.footer = b),
        e.modelValue === !0 && m("size", a.value),
        m("space", e.modelValue),
        m("offset", c.value),
        vt(() => {
          o.instances.footer === b &&
            ((o.instances.footer = void 0),
            m("size", 0),
            m("offset", 0),
            m("space", !1));
        }),
        () => {
          const S = qn(t.default, [k(Al, { debounce: 0, onResize: y })]);
          return (
            e.elevated === !0 &&
              S.push(
                k("div", {
                  class:
                    "q-layout__shadow absolute-full overflow-hidden no-pointer-events",
                })
              ),
            k("footer", { class: h.value, style: v.value, onFocusin: w }, S)
          );
        }
      );
    },
  });
function lh(e) {
  if (e === !1) return 0;
  if (e === !0 || e === void 0) return 1;
  const t = parseInt(e, 10);
  return isNaN(t) ? 0 : t;
}
var gn = Nc({
  name: "close-popup",
  beforeMount(e, { value: t }) {
    const n = {
      depth: lh(t),
      handler(r) {
        n.depth !== 0 &&
          setTimeout(() => {
            const o = wx(e);
            o !== void 0 && xx(o, r, n.depth);
          });
      },
      handlerKey(r) {
        Vr(r, 13) === !0 && n.handler(r);
      },
    };
    (e.__qclosepopup = n),
      e.addEventListener("click", n.handler),
      e.addEventListener("keyup", n.handlerKey);
  },
  updated(e, { value: t, oldValue: n }) {
    t !== n && (e.__qclosepopup.depth = lh(t));
  },
  beforeUnmount(e) {
    const t = e.__qclosepopup;
    e.removeEventListener("click", t.handler),
      e.removeEventListener("keyup", t.handlerKey),
      delete e.__qclosepopup;
  },
});
function Om(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: uE } = Object.prototype,
  { getPrototypeOf: Zc } = Object,
  ss = ((e) => (t) => {
    const n = uE.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  tr = (e) => ((e = e.toLowerCase()), (t) => ss(t) === e),
  us = (e) => (t) => typeof t === e,
  { isArray: hi } = Array,
  ha = us("undefined");
function cE(e) {
  return (
    e !== null &&
    !ha(e) &&
    e.constructor !== null &&
    !ha(e.constructor) &&
    Rn(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const Tm = tr("ArrayBuffer");
function fE(e) {
  let t;
  return (
    typeof ArrayBuffer != "undefined" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Tm(e.buffer)),
    t
  );
}
const dE = us("string"),
  Rn = us("function"),
  Pm = us("number"),
  cs = (e) => e !== null && typeof e == "object",
  hE = (e) => e === !0 || e === !1,
  al = (e) => {
    if (ss(e) !== "object") return !1;
    const t = Zc(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  vE = tr("Date"),
  pE = tr("File"),
  mE = tr("Blob"),
  gE = tr("FileList"),
  yE = (e) => cs(e) && Rn(e.pipe),
  bE = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (Rn(e.append) &&
          ((t = ss(e)) === "formdata" ||
            (t === "object" &&
              Rn(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  SE = tr("URLSearchParams"),
  wE = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Oa(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e == "undefined") return;
  let r, o;
  if ((typeof e != "object" && (e = [e]), hi(e)))
    for (r = 0, o = e.length; r < o; r++) t.call(null, e[r], r, e);
  else {
    const a = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = a.length;
    let l;
    for (r = 0; r < i; r++) (l = a[r]), t.call(null, e[l], l, e);
  }
}
function Rm(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    o;
  for (; r-- > 0; ) if (((o = n[r]), t === o.toLowerCase())) return o;
  return null;
}
const Am = (() =>
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : global)(),
  Im = (e) => !ha(e) && e !== Am;
function Uu() {
  const { caseless: e } = (Im(this) && this) || {},
    t = {},
    n = (r, o) => {
      const a = (e && Rm(t, o)) || o;
      al(t[a]) && al(r)
        ? (t[a] = Uu(t[a], r))
        : al(r)
        ? (t[a] = Uu({}, r))
        : hi(r)
        ? (t[a] = r.slice())
        : (t[a] = r);
    };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && Oa(arguments[r], n);
  return t;
}
const xE = (e, t, n, { allOwnKeys: r } = {}) => (
    Oa(
      t,
      (o, a) => {
        n && Rn(o) ? (e[a] = Om(o, n)) : (e[a] = o);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  EE = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  CE = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  OE = (e, t, n, r) => {
    let o, a, i;
    const l = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (o = Object.getOwnPropertyNames(e), a = o.length; a-- > 0; )
        (i = o[a]), (!r || r(i, e, t)) && !l[i] && ((t[i] = e[i]), (l[i] = !0));
      e = n !== !1 && Zc(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  TE = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  PE = (e) => {
    if (!e) return null;
    if (hi(e)) return e;
    let t = e.length;
    if (!Pm(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  RE = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array != "undefined" && Zc(Uint8Array)),
  AE = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let o;
    for (; (o = r.next()) && !o.done; ) {
      const a = o.value;
      t.call(e, a[0], a[1]);
    }
  },
  IE = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  LE = tr("HTMLFormElement"),
  kE = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, o) {
      return r.toUpperCase() + o;
    }),
  sh = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  DE = tr("RegExp"),
  Lm = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    Oa(n, (o, a) => {
      t(o, a, e) !== !1 && (r[a] = o);
    }),
      Object.defineProperties(e, r);
  },
  ME = (e) => {
    Lm(e, (t, n) => {
      if (Rn(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (!!Rn(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  $E = (e, t) => {
    const n = {},
      r = (o) => {
        o.forEach((a) => {
          n[a] = !0;
        });
      };
    return hi(e) ? r(e) : r(String(e).split(t)), n;
  },
  FE = () => {},
  NE = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  zs = "abcdefghijklmnopqrstuvwxyz",
  uh = "0123456789",
  km = { DIGIT: uh, ALPHA: zs, ALPHA_DIGIT: zs + zs.toUpperCase() + uh },
  BE = (e = 16, t = km.ALPHA_DIGIT) => {
    let n = "";
    const { length: r } = t;
    for (; e--; ) n += t[(Math.random() * r) | 0];
    return n;
  };
function jE(e) {
  return !!(
    e &&
    Rn(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
const VE = (e) => {
    const t = new Array(10),
      n = (r, o) => {
        if (cs(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[o] = r;
            const a = hi(r) ? [] : {};
            return (
              Oa(r, (i, l) => {
                const s = n(i, o + 1);
                !ha(s) && (a[l] = s);
              }),
              (t[o] = void 0),
              a
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  qE = tr("AsyncFunction"),
  HE = (e) => e && (cs(e) || Rn(e)) && Rn(e.then) && Rn(e.catch);
var re = {
  isArray: hi,
  isArrayBuffer: Tm,
  isBuffer: cE,
  isFormData: bE,
  isArrayBufferView: fE,
  isString: dE,
  isNumber: Pm,
  isBoolean: hE,
  isObject: cs,
  isPlainObject: al,
  isUndefined: ha,
  isDate: vE,
  isFile: pE,
  isBlob: mE,
  isRegExp: DE,
  isFunction: Rn,
  isStream: yE,
  isURLSearchParams: SE,
  isTypedArray: RE,
  isFileList: gE,
  forEach: Oa,
  merge: Uu,
  extend: xE,
  trim: wE,
  stripBOM: EE,
  inherits: CE,
  toFlatObject: OE,
  kindOf: ss,
  kindOfTest: tr,
  endsWith: TE,
  toArray: PE,
  forEachEntry: AE,
  matchAll: IE,
  isHTMLForm: LE,
  hasOwnProperty: sh,
  hasOwnProp: sh,
  reduceDescriptors: Lm,
  freezeMethods: ME,
  toObjectSet: $E,
  toCamelCase: kE,
  noop: FE,
  toFiniteNumber: NE,
  findKey: Rm,
  global: Am,
  isContextDefined: Im,
  ALPHABET: km,
  generateString: BE,
  isSpecCompliantForm: jE,
  toJSONObject: VE,
  isAsyncFn: qE,
  isThenable: HE,
};
function rt(e, t, n, r, o) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    o && (this.response = o);
}
re.inherits(rt, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: re.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const Dm = rt.prototype,
  Mm = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  Mm[e] = { value: e };
});
Object.defineProperties(rt, Mm);
Object.defineProperty(Dm, "isAxiosError", { value: !0 });
rt.from = (e, t, n, r, o, a) => {
  const i = Object.create(Dm);
  return (
    re.toFlatObject(
      e,
      i,
      function (s) {
        return s !== Error.prototype;
      },
      (l) => l !== "isAxiosError"
    ),
    rt.call(i, e.message, t, n, r, o),
    (i.cause = e),
    (i.name = e.name),
    a && Object.assign(i, a),
    i
  );
};
var _E = null;
function zu(e) {
  return re.isPlainObject(e) || re.isArray(e);
}
function $m(e) {
  return re.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ch(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (o, a) {
          return (o = $m(o)), !n && a ? "[" + o + "]" : o;
        })
        .join(n ? "." : "")
    : t;
}
function UE(e) {
  return re.isArray(e) && !e.some(zu);
}
const zE = re.toFlatObject(re, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function fs(e, t, n) {
  if (!re.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = re.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (m, g) {
        return !re.isUndefined(g[m]);
      }
    ));
  const r = n.metaTokens,
    o = n.visitor || c,
    a = n.dots,
    i = n.indexes,
    s =
      (n.Blob || (typeof Blob != "undefined" && Blob)) &&
      re.isSpecCompliantForm(t);
  if (!re.isFunction(o)) throw new TypeError("visitor must be a function");
  function u(v) {
    if (v === null) return "";
    if (re.isDate(v)) return v.toISOString();
    if (!s && re.isBlob(v))
      throw new rt("Blob is not supported. Use a Buffer instead.");
    return re.isArrayBuffer(v) || re.isTypedArray(v)
      ? s && typeof Blob == "function"
        ? new Blob([v])
        : Buffer.from(v)
      : v;
  }
  function c(v, m, g) {
    let y = v;
    if (v && !g && typeof v == "object") {
      if (re.endsWith(m, "{}"))
        (m = r ? m : m.slice(0, -2)), (v = JSON.stringify(v));
      else if (
        (re.isArray(v) && UE(v)) ||
        ((re.isFileList(v) || re.endsWith(m, "[]")) && (y = re.toArray(v)))
      )
        return (
          (m = $m(m)),
          y.forEach(function (w, b) {
            !(re.isUndefined(w) || w === null) &&
              t.append(
                i === !0 ? ch([m], b, a) : i === null ? m : m + "[]",
                u(w)
              );
          }),
          !1
        );
    }
    return zu(v) ? !0 : (t.append(ch(g, m, a), u(v)), !1);
  }
  const f = [],
    d = Object.assign(zE, {
      defaultVisitor: c,
      convertValue: u,
      isVisitable: zu,
    });
  function h(v, m) {
    if (!re.isUndefined(v)) {
      if (f.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + m.join("."));
      f.push(v),
        re.forEach(v, function (y, p) {
          (!(re.isUndefined(y) || y === null) &&
            o.call(t, y, re.isString(p) ? p.trim() : p, m, d)) === !0 &&
            h(y, m ? m.concat(p) : [p]);
        }),
        f.pop();
    }
  }
  if (!re.isObject(e)) throw new TypeError("data must be an object");
  return h(e), t;
}
function fh(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function ef(e, t) {
  (this._pairs = []), e && fs(e, this, t);
}
const Fm = ef.prototype;
Fm.append = function (t, n) {
  this._pairs.push([t, n]);
};
Fm.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, fh);
      }
    : fh;
  return this._pairs
    .map(function (o) {
      return n(o[0]) + "=" + n(o[1]);
    }, "")
    .join("&");
};
function KE(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function Nm(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || KE,
    o = n && n.serialize;
  let a;
  if (
    (o
      ? (a = o(t, n))
      : (a = re.isURLSearchParams(t) ? t.toString() : new ef(t, n).toString(r)),
    a)
  ) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + a);
  }
  return e;
}
class WE {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    re.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
var dh = WE,
  Bm = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  QE = typeof URLSearchParams != "undefined" ? URLSearchParams : ef,
  GE = typeof FormData != "undefined" ? FormData : null,
  XE = typeof Blob != "undefined" ? Blob : null;
const YE = (() => {
    let e;
    return typeof navigator != "undefined" &&
      ((e = navigator.product) === "ReactNative" ||
        e === "NativeScript" ||
        e === "NS")
      ? !1
      : typeof window != "undefined" && typeof document != "undefined";
  })(),
  JE = (() =>
    typeof WorkerGlobalScope != "undefined" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function")();
var Xn = {
  isBrowser: !0,
  classes: { URLSearchParams: QE, FormData: GE, Blob: XE },
  isStandardBrowserEnv: YE,
  isStandardBrowserWebWorkerEnv: JE,
  protocols: ["http", "https", "file", "blob", "url", "data"],
};
function ZE(e, t) {
  return fs(
    e,
    new Xn.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, o, a) {
          return Xn.isNode && re.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : a.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function eC(e) {
  return re
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function tC(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const o = n.length;
  let a;
  for (r = 0; r < o; r++) (a = n[r]), (t[a] = e[a]);
  return t;
}
function jm(e) {
  function t(n, r, o, a) {
    let i = n[a++];
    const l = Number.isFinite(+i),
      s = a >= n.length;
    return (
      (i = !i && re.isArray(o) ? o.length : i),
      s
        ? (re.hasOwnProp(o, i) ? (o[i] = [o[i], r]) : (o[i] = r), !l)
        : ((!o[i] || !re.isObject(o[i])) && (o[i] = []),
          t(n, r, o[i], a) && re.isArray(o[i]) && (o[i] = tC(o[i])),
          !l)
    );
  }
  if (re.isFormData(e) && re.isFunction(e.entries)) {
    const n = {};
    return (
      re.forEachEntry(e, (r, o) => {
        t(eC(r), o, n, 0);
      }),
      n
    );
  }
  return null;
}
const nC = { "Content-Type": void 0 };
function rC(e, t, n) {
  if (re.isString(e))
    try {
      return (t || JSON.parse)(e), re.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const ds = {
  transitional: Bm,
  adapter: ["xhr", "http"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        o = r.indexOf("application/json") > -1,
        a = re.isObject(t);
      if ((a && re.isHTMLForm(t) && (t = new FormData(t)), re.isFormData(t)))
        return o && o ? JSON.stringify(jm(t)) : t;
      if (
        re.isArrayBuffer(t) ||
        re.isBuffer(t) ||
        re.isStream(t) ||
        re.isFile(t) ||
        re.isBlob(t)
      )
        return t;
      if (re.isArrayBufferView(t)) return t.buffer;
      if (re.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let l;
      if (a) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return ZE(t, this.formSerializer).toString();
        if ((l = re.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const s = this.env && this.env.FormData;
          return fs(
            l ? { "files[]": t } : t,
            s && new s(),
            this.formSerializer
          );
        }
      }
      return a || o ? (n.setContentType("application/json", !1), rC(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || ds.transitional,
        r = n && n.forcedJSONParsing,
        o = this.responseType === "json";
      if (t && re.isString(t) && ((r && !this.responseType) || o)) {
        const i = !(n && n.silentJSONParsing) && o;
        try {
          return JSON.parse(t);
        } catch (l) {
          if (i)
            throw l.name === "SyntaxError"
              ? rt.from(l, rt.ERR_BAD_RESPONSE, this, null, this.response)
              : l;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Xn.classes.FormData, Blob: Xn.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: { common: { Accept: "application/json, text/plain, */*" } },
};
re.forEach(["delete", "get", "head"], function (t) {
  ds.headers[t] = {};
});
re.forEach(["post", "put", "patch"], function (t) {
  ds.headers[t] = re.merge(nC);
});
var tf = ds;
const oC = re.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent",
]);
var iC = (e) => {
  const t = {};
  let n, r, o;
  return (
    e &&
      e
        .split(
          `
`
        )
        .forEach(function (i) {
          (o = i.indexOf(":")),
            (n = i.substring(0, o).trim().toLowerCase()),
            (r = i.substring(o + 1).trim()),
            !(!n || (t[n] && oC[n])) &&
              (n === "set-cookie"
                ? t[n]
                  ? t[n].push(r)
                  : (t[n] = [r])
                : (t[n] = t[n] ? t[n] + ", " + r : r));
        }),
    t
  );
};
const hh = Symbol("internals");
function Si(e) {
  return e && String(e).trim().toLowerCase();
}
function ll(e) {
  return e === !1 || e == null ? e : re.isArray(e) ? e.map(ll) : String(e);
}
function aC(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const lC = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ks(e, t, n, r, o) {
  if (re.isFunction(r)) return r.call(this, t, n);
  if ((o && (t = n), !!re.isString(t))) {
    if (re.isString(r)) return t.indexOf(r) !== -1;
    if (re.isRegExp(r)) return r.test(t);
  }
}
function sC(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function uC(e, t) {
  const n = re.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (o, a, i) {
        return this[r].call(this, t, o, a, i);
      },
      configurable: !0,
    });
  });
}
class hs {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function a(l, s, u) {
      const c = Si(s);
      if (!c) throw new Error("header name must be a non-empty string");
      const f = re.findKey(o, c);
      (!f || o[f] === void 0 || u === !0 || (u === void 0 && o[f] !== !1)) &&
        (o[f || s] = ll(l));
    }
    const i = (l, s) => re.forEach(l, (u, c) => a(u, c, s));
    return (
      re.isPlainObject(t) || t instanceof this.constructor
        ? i(t, n)
        : re.isString(t) && (t = t.trim()) && !lC(t)
        ? i(iC(t), n)
        : t != null && a(n, t, r),
      this
    );
  }
  get(t, n) {
    if (((t = Si(t)), t)) {
      const r = re.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n) return o;
        if (n === !0) return aC(o);
        if (re.isFunction(n)) return n.call(this, o, r);
        if (re.isRegExp(n)) return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = Si(t)), t)) {
      const r = re.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Ks(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function a(i) {
      if (((i = Si(i)), i)) {
        const l = re.findKey(r, i);
        l && (!n || Ks(r, r[l], l, n)) && (delete r[l], (o = !0));
      }
    }
    return re.isArray(t) ? t.forEach(a) : a(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      o = !1;
    for (; r--; ) {
      const a = n[r];
      (!t || Ks(this, this[a], a, t, !0)) && (delete this[a], (o = !0));
    }
    return o;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      re.forEach(this, (o, a) => {
        const i = re.findKey(r, a);
        if (i) {
          (n[i] = ll(o)), delete n[a];
          return;
        }
        const l = t ? sC(a) : String(a).trim();
        l !== a && delete n[a], (n[l] = ll(o)), (r[l] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      re.forEach(this, (r, o) => {
        r != null && r !== !1 && (n[o] = t && re.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((o) => r.set(o)), r;
  }
  static accessor(t) {
    const r = (this[hh] = this[hh] = { accessors: {} }).accessors,
      o = this.prototype;
    function a(i) {
      const l = Si(i);
      r[l] || (uC(o, i), (r[l] = !0));
    }
    return re.isArray(t) ? t.forEach(a) : a(t), this;
  }
}
hs.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
re.freezeMethods(hs.prototype);
re.freezeMethods(hs);
var cr = hs;
function Ws(e, t) {
  const n = this || tf,
    r = t || n,
    o = cr.from(r.headers);
  let a = r.data;
  return (
    re.forEach(e, function (l) {
      a = l.call(n, a, o.normalize(), t ? t.status : void 0);
    }),
    o.normalize(),
    a
  );
}
function Vm(e) {
  return !!(e && e.__CANCEL__);
}
function Ta(e, t, n) {
  rt.call(this, e == null ? "canceled" : e, rt.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
re.inherits(Ta, rt, { __CANCEL__: !0 });
function cC(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new rt(
          "Request failed with status code " + n.status,
          [rt.ERR_BAD_REQUEST, rt.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
var fC = Xn.isStandardBrowserEnv
  ? (function () {
      return {
        write: function (n, r, o, a, i, l) {
          const s = [];
          s.push(n + "=" + encodeURIComponent(r)),
            re.isNumber(o) && s.push("expires=" + new Date(o).toGMTString()),
            re.isString(a) && s.push("path=" + a),
            re.isString(i) && s.push("domain=" + i),
            l === !0 && s.push("secure"),
            (document.cookie = s.join("; "));
        },
        read: function (n) {
          const r = document.cookie.match(
            new RegExp("(^|;\\s*)(" + n + ")=([^;]*)")
          );
          return r ? decodeURIComponent(r[3]) : null;
        },
        remove: function (n) {
          this.write(n, "", Date.now() - 864e5);
        },
      };
    })()
  : (function () {
      return {
        write: function () {},
        read: function () {
          return null;
        },
        remove: function () {},
      };
    })();
function dC(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function hC(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function qm(e, t) {
  return e && !dC(t) ? hC(e, t) : t;
}
var vC = Xn.isStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement("a");
      let r;
      function o(a) {
        let i = a;
        return (
          t && (n.setAttribute("href", i), (i = n.href)),
          n.setAttribute("href", i),
          {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, "") : "",
            hash: n.hash ? n.hash.replace(/^#/, "") : "",
            hostname: n.hostname,
            port: n.port,
            pathname:
              n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
          }
        );
      }
      return (
        (r = o(window.location.href)),
        function (i) {
          const l = re.isString(i) ? o(i) : i;
          return l.protocol === r.protocol && l.host === r.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function pC(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function mC(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let o = 0,
    a = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (s) {
      const u = Date.now(),
        c = r[a];
      i || (i = u), (n[o] = s), (r[o] = u);
      let f = a,
        d = 0;
      for (; f !== o; ) (d += n[f++]), (f = f % e);
      if (((o = (o + 1) % e), o === a && (a = (a + 1) % e), u - i < t)) return;
      const h = c && u - c;
      return h ? Math.round((d * 1e3) / h) : void 0;
    }
  );
}
function vh(e, t) {
  let n = 0;
  const r = mC(50, 250);
  return (o) => {
    const a = o.loaded,
      i = o.lengthComputable ? o.total : void 0,
      l = a - n,
      s = r(l),
      u = a <= i;
    n = a;
    const c = {
      loaded: a,
      total: i,
      progress: i ? a / i : void 0,
      bytes: l,
      rate: s || void 0,
      estimated: s && i && u ? (i - a) / s : void 0,
      event: o,
    };
    (c[t ? "download" : "upload"] = !0), e(c);
  };
}
const gC = typeof XMLHttpRequest != "undefined";
var yC =
  gC &&
  function (e) {
    return new Promise(function (n, r) {
      let o = e.data;
      const a = cr.from(e.headers).normalize(),
        i = e.responseType;
      let l;
      function s() {
        e.cancelToken && e.cancelToken.unsubscribe(l),
          e.signal && e.signal.removeEventListener("abort", l);
      }
      re.isFormData(o) &&
        (Xn.isStandardBrowserEnv || Xn.isStandardBrowserWebWorkerEnv
          ? a.setContentType(!1)
          : a.setContentType("multipart/form-data;", !1));
      let u = new XMLHttpRequest();
      if (e.auth) {
        const h = e.auth.username || "",
          v = e.auth.password
            ? unescape(encodeURIComponent(e.auth.password))
            : "";
        a.set("Authorization", "Basic " + btoa(h + ":" + v));
      }
      const c = qm(e.baseURL, e.url);
      u.open(e.method.toUpperCase(), Nm(c, e.params, e.paramsSerializer), !0),
        (u.timeout = e.timeout);
      function f() {
        if (!u) return;
        const h = cr.from(
            "getAllResponseHeaders" in u && u.getAllResponseHeaders()
          ),
          m = {
            data:
              !i || i === "text" || i === "json" ? u.responseText : u.response,
            status: u.status,
            statusText: u.statusText,
            headers: h,
            config: e,
            request: u,
          };
        cC(
          function (y) {
            n(y), s();
          },
          function (y) {
            r(y), s();
          },
          m
        ),
          (u = null);
      }
      if (
        ("onloadend" in u
          ? (u.onloadend = f)
          : (u.onreadystatechange = function () {
              !u ||
                u.readyState !== 4 ||
                (u.status === 0 &&
                  !(u.responseURL && u.responseURL.indexOf("file:") === 0)) ||
                setTimeout(f);
            }),
        (u.onabort = function () {
          !u ||
            (r(new rt("Request aborted", rt.ECONNABORTED, e, u)), (u = null));
        }),
        (u.onerror = function () {
          r(new rt("Network Error", rt.ERR_NETWORK, e, u)), (u = null);
        }),
        (u.ontimeout = function () {
          let v = e.timeout
            ? "timeout of " + e.timeout + "ms exceeded"
            : "timeout exceeded";
          const m = e.transitional || Bm;
          e.timeoutErrorMessage && (v = e.timeoutErrorMessage),
            r(
              new rt(
                v,
                m.clarifyTimeoutError ? rt.ETIMEDOUT : rt.ECONNABORTED,
                e,
                u
              )
            ),
            (u = null);
        }),
        Xn.isStandardBrowserEnv)
      ) {
        const h =
          (e.withCredentials || vC(c)) &&
          e.xsrfCookieName &&
          fC.read(e.xsrfCookieName);
        h && a.set(e.xsrfHeaderName, h);
      }
      o === void 0 && a.setContentType(null),
        "setRequestHeader" in u &&
          re.forEach(a.toJSON(), function (v, m) {
            u.setRequestHeader(m, v);
          }),
        re.isUndefined(e.withCredentials) ||
          (u.withCredentials = !!e.withCredentials),
        i && i !== "json" && (u.responseType = e.responseType),
        typeof e.onDownloadProgress == "function" &&
          u.addEventListener("progress", vh(e.onDownloadProgress, !0)),
        typeof e.onUploadProgress == "function" &&
          u.upload &&
          u.upload.addEventListener("progress", vh(e.onUploadProgress)),
        (e.cancelToken || e.signal) &&
          ((l = (h) => {
            !u ||
              (r(!h || h.type ? new Ta(null, e, u) : h), u.abort(), (u = null));
          }),
          e.cancelToken && e.cancelToken.subscribe(l),
          e.signal &&
            (e.signal.aborted ? l() : e.signal.addEventListener("abort", l)));
      const d = pC(c);
      if (d && Xn.protocols.indexOf(d) === -1) {
        r(new rt("Unsupported protocol " + d + ":", rt.ERR_BAD_REQUEST, e));
        return;
      }
      u.send(o || null);
    });
  };
const sl = { http: _E, xhr: yC };
re.forEach(sl, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
var bC = {
  getAdapter: (e) => {
    e = re.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    for (
      let o = 0;
      o < t && ((n = e[o]), !(r = re.isString(n) ? sl[n.toLowerCase()] : n));
      o++
    );
    if (!r)
      throw r === !1
        ? new rt(
            `Adapter ${n} is not supported by the environment`,
            "ERR_NOT_SUPPORT"
          )
        : new Error(
            re.hasOwnProp(sl, n)
              ? `Adapter '${n}' is not available in the build`
              : `Unknown adapter '${n}'`
          );
    if (!re.isFunction(r)) throw new TypeError("adapter is not a function");
    return r;
  },
  adapters: sl,
};
function Qs(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Ta(null, e);
}
function ph(e) {
  return (
    Qs(e),
    (e.headers = cr.from(e.headers)),
    (e.data = Ws.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    bC
      .getAdapter(e.adapter || tf.adapter)(e)
      .then(
        function (r) {
          return (
            Qs(e),
            (r.data = Ws.call(e, e.transformResponse, r)),
            (r.headers = cr.from(r.headers)),
            r
          );
        },
        function (r) {
          return (
            Vm(r) ||
              (Qs(e),
              r &&
                r.response &&
                ((r.response.data = Ws.call(
                  e,
                  e.transformResponse,
                  r.response
                )),
                (r.response.headers = cr.from(r.response.headers)))),
            Promise.reject(r)
          );
        }
      )
  );
}
const mh = (e) => (e instanceof cr ? e.toJSON() : e);
function ni(e, t) {
  t = t || {};
  const n = {};
  function r(u, c, f) {
    return re.isPlainObject(u) && re.isPlainObject(c)
      ? re.merge.call({ caseless: f }, u, c)
      : re.isPlainObject(c)
      ? re.merge({}, c)
      : re.isArray(c)
      ? c.slice()
      : c;
  }
  function o(u, c, f) {
    if (re.isUndefined(c)) {
      if (!re.isUndefined(u)) return r(void 0, u, f);
    } else return r(u, c, f);
  }
  function a(u, c) {
    if (!re.isUndefined(c)) return r(void 0, c);
  }
  function i(u, c) {
    if (re.isUndefined(c)) {
      if (!re.isUndefined(u)) return r(void 0, u);
    } else return r(void 0, c);
  }
  function l(u, c, f) {
    if (f in t) return r(u, c);
    if (f in e) return r(void 0, u);
  }
  const s = {
    url: a,
    method: a,
    data: a,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: l,
    headers: (u, c) => o(mh(u), mh(c), !0),
  };
  return (
    re.forEach(Object.keys(Object.assign({}, e, t)), function (c) {
      const f = s[c] || o,
        d = f(e[c], t[c], c);
      (re.isUndefined(d) && f !== l) || (n[c] = d);
    }),
    n
  );
}
const Hm = "1.4.0",
  nf = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    nf[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const gh = {};
nf.transitional = function (t, n, r) {
  function o(a, i) {
    return (
      "[Axios v" +
      Hm +
      "] Transitional option '" +
      a +
      "'" +
      i +
      (r ? ". " + r : "")
    );
  }
  return (a, i, l) => {
    if (t === !1)
      throw new rt(
        o(i, " has been removed" + (n ? " in " + n : "")),
        rt.ERR_DEPRECATED
      );
    return (
      n &&
        !gh[i] &&
        ((gh[i] = !0),
        console.warn(
          o(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(a, i, l) : !0
    );
  };
};
function SC(e, t, n) {
  if (typeof e != "object")
    throw new rt("options must be an object", rt.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const a = r[o],
      i = t[a];
    if (i) {
      const l = e[a],
        s = l === void 0 || i(l, a, e);
      if (s !== !0)
        throw new rt("option " + a + " must be " + s, rt.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new rt("Unknown option " + a, rt.ERR_BAD_OPTION);
  }
}
var Ku = { assertOptions: SC, validators: nf };
const Sr = Ku.validators;
class $l {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new dh(), response: new dh() });
  }
  request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = ni(this.defaults, n));
    const { transitional: r, paramsSerializer: o, headers: a } = n;
    r !== void 0 &&
      Ku.assertOptions(
        r,
        {
          silentJSONParsing: Sr.transitional(Sr.boolean),
          forcedJSONParsing: Sr.transitional(Sr.boolean),
          clarifyTimeoutError: Sr.transitional(Sr.boolean),
        },
        !1
      ),
      o != null &&
        (re.isFunction(o)
          ? (n.paramsSerializer = { serialize: o })
          : Ku.assertOptions(
              o,
              { encode: Sr.function, serialize: Sr.function },
              !0
            )),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let i;
    (i = a && re.merge(a.common, a[n.method])),
      i &&
        re.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          (v) => {
            delete a[v];
          }
        ),
      (n.headers = cr.concat(i, a));
    const l = [];
    let s = !0;
    this.interceptors.request.forEach(function (m) {
      (typeof m.runWhen == "function" && m.runWhen(n) === !1) ||
        ((s = s && m.synchronous), l.unshift(m.fulfilled, m.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function (m) {
      u.push(m.fulfilled, m.rejected);
    });
    let c,
      f = 0,
      d;
    if (!s) {
      const v = [ph.bind(this), void 0];
      for (
        v.unshift.apply(v, l),
          v.push.apply(v, u),
          d = v.length,
          c = Promise.resolve(n);
        f < d;

      )
        c = c.then(v[f++], v[f++]);
      return c;
    }
    d = l.length;
    let h = n;
    for (f = 0; f < d; ) {
      const v = l[f++],
        m = l[f++];
      try {
        h = v(h);
      } catch (g) {
        m.call(this, g);
        break;
      }
    }
    try {
      c = ph.call(this, h);
    } catch (v) {
      return Promise.reject(v);
    }
    for (f = 0, d = u.length; f < d; ) c = c.then(u[f++], u[f++]);
    return c;
  }
  getUri(t) {
    t = ni(this.defaults, t);
    const n = qm(t.baseURL, t.url);
    return Nm(n, t.params, t.paramsSerializer);
  }
}
re.forEach(["delete", "get", "head", "options"], function (t) {
  $l.prototype[t] = function (n, r) {
    return this.request(
      ni(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
re.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (a, i, l) {
      return this.request(
        ni(l || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: a,
          data: i,
        })
      );
    };
  }
  ($l.prototype[t] = n()), ($l.prototype[t + "Form"] = n(!0));
});
var ul = $l;
class rf {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (a) {
      n = a;
    });
    const r = this;
    this.promise.then((o) => {
      if (!r._listeners) return;
      let a = r._listeners.length;
      for (; a-- > 0; ) r._listeners[a](o);
      r._listeners = null;
    }),
      (this.promise.then = (o) => {
        let a;
        const i = new Promise((l) => {
          r.subscribe(l), (a = l);
        }).then(o);
        return (
          (i.cancel = function () {
            r.unsubscribe(a);
          }),
          i
        );
      }),
      t(function (a, i, l) {
        r.reason || ((r.reason = new Ta(a, i, l)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let t;
    return {
      token: new rf(function (o) {
        t = o;
      }),
      cancel: t,
    };
  }
}
var wC = rf;
function xC(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function EC(e) {
  return re.isObject(e) && e.isAxiosError === !0;
}
const Wu = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Wu).forEach(([e, t]) => {
  Wu[t] = e;
});
var CC = Wu;
function _m(e) {
  const t = new ul(e),
    n = Om(ul.prototype.request, t);
  return (
    re.extend(n, ul.prototype, t, { allOwnKeys: !0 }),
    re.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (o) {
      return _m(ni(e, o));
    }),
    n
  );
}
const Ut = _m(tf);
Ut.Axios = ul;
Ut.CanceledError = Ta;
Ut.CancelToken = wC;
Ut.isCancel = Vm;
Ut.VERSION = Hm;
Ut.toFormData = fs;
Ut.AxiosError = rt;
Ut.Cancel = Ut.CanceledError;
Ut.all = function (t) {
  return Promise.all(t);
};
Ut.spread = xC;
Ut.isAxiosError = EC;
Ut.mergeConfig = ni;
Ut.AxiosHeaders = cr;
Ut.formToJSON = (e) => jm(re.isHTMLForm(e) ? new FormData(e) : e);
Ut.HttpStatusCode = CC;
Ut.default = Ut;
var io = Ut;
const Um = (e) => {
  const t = io.create({
      baseURL: "https://api.bundleb2b.net/api/v2/",
      timeout: 3e6,
      headers: { Accept: "application/json", authToken: e },
    }),
    n = io.create({
      baseURL: "https://xw4bawiae0.execute-api.ap-southeast-2.amazonaws.com/",
      headers: { Accept: "application/json" },
    }),
    r = io.create({
      baseURL: "https://pm574a52v1.execute-api.ap-southeast-2.amazonaws.com/",
      headers: { Accept: "application/json" },
    }),
    o = io.create({
      baseURL: "https://xzhb97xk10.execute-api.ap-southeast-2.amazonaws.com/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  return { b3request: t, BCProducts: n, BCVariants: r, BCSort: o };
};
var OC = Object.freeze(
  Object.defineProperty(
    { __proto__: null, getAxiosInstances: Um },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
const zm = (e) => {
  const { b3request: t, BCProducts: n, BCVariants: r, BCSort: o } = Um(e);
  return {
    search: async (S) =>
      new Promise((E, A) => {
        try {
          window.stencilUtils.api.search.search(
            S,
            { template: "b3/b3json" },
            (T, x) => {
              var C, D, I;
              if (T) A(T);
              else {
                const $ = JSON.parse(x);
                if (
                  !(
                    (D =
                      (C = $ == null ? void 0 : $.product_results) == null
                        ? void 0
                        : C.products) != null && D.length
                  ) > 0
                )
                  throw new Error("No products found");
                E((I = $.product_results) == null ? void 0 : I.products);
              }
            }
          );
        } catch (T) {
          A(T);
        }
      }),
    getCart: () =>
      new Promise((S, E) => {
        io.get("/api/storefront/carts")
          .then((A) => {
            A.status === 200 ? S(A.data) : E(A);
          })
          .catch((A) => {
            E(A);
          });
      }),
    createCart: (S) =>
      new Promise((E, A) => {
        io.post("/api/storefront/carts", S)
          .then((T) => {
            T.status === 200 ? E(T.data) : A(T);
          })
          .catch((T) => {
            A(T);
          });
      }),
    updateCart: (S, E) =>
      new Promise((A, T) => {
        io.post(`/api/storefront/carts/${S}/items`, E)
          .then((x) => {
            x.status === 200 ? A(x.data) : T(x);
          })
          .catch((x) => {
            T(x);
          });
      }),
    getListProducts: (S) => n.get(`default/getProducts2?list_id=${S}`),
    getVariants: (S) => r.get(`default/getVariants?product_id=${S}`),
    getShoppingLists: () => t.get("shoppinglists"),
    getListProductsRaw: (S) =>
      t.get(`shoppinglists/items-extension?id=${S}&limit=1`),
    deleteShoppingListItem: (S, E) => t.delete(`shoppinglists/${S}/items/${E}`),
    getProductVariants: (S) => t.get(`catalogs/quick-product?variantSkus=${S}`),
    addShoppingListItem: (S) => t.post("shoppinglists/items", S),
    updateShoppingListItem: (S) => t.put("shoppinglists/items", S),
    updateShoppingList: (S) => t.put("shoppinglists", S),
    createShoppingList: (S) => t.post("shoppinglists", S),
    deleteShoppingList: (S) => t.delete(`shoppinglists/${S}`),
    sortShoppingList: (S, E) => o.put(`default/updateListSort?list_id=${S}`, E),
  };
};
var TC = Object.freeze(
  Object.defineProperty({ __proto__: null, getApi: zm }, Symbol.toStringTag, {
    value: "Module",
  })
);
const Km = async () => {
  try {
    const e = await fetch(
      "/customer/current.jwt?app_client_id=dl7c39mdpul6hyc489yk0vzxl6jesyx"
    ).then((n) => n.text());
    return (
      await fetch("https://api.bundleb2b.net/api/v2/login", {
        method: "POST",
        body: JSON.stringify({ bcToken: e }),
      }).then((n) => n.text())
    ).data.token;
  } catch (e) {
    throw new Error(e);
  }
};
var PC = Object.freeze(
  Object.defineProperty({ __proto__: null, init: Km }, Symbol.toStringTag, {
    value: "Module",
  })
);
const of = cS("ShoppingLists", {
  state: () => ({
    api: null,
    lists: [],
    list: null,
    loading: !0,
    error: null,
    listLoading: !1,
    listError: null,
    cartLoading: !1,
    cartError: null,
    cart: null,
    BASEURL: "https://www.ztwholesale.com.au",
    addToCartDialog: !1,
    sortedProducts: null,
    sortListDialog: !1,
    sortLoading: !1,
    shoppingListTable: null,
    searchResult: {
      loading: !1,
      result: null,
      variants: null,
      product: null,
      searchTerm: null,
      variantsLoading: !0,
      variant: null,
    },
    inputCache: {
      newName: null,
      newDescription: null,
      editName: null,
      editDescription: null,
    },
    leftDrawerOpen: !0,
    layout: !1,
    sortOptions: [
      { label: "Custom", value: "ItemId" },
      { label: "Alphabetical", value: "ProductName" },
      { label: "Date Added", value: "LineNo" },
      { label: "Quantity", value: "Quantity" },
    ],
    sortOrder: null,
  }),
  getters: {
    getListById: (e) => (t) => e.lists.find((n) => n.id === t),
    getProductById: (e) => (t) =>
      e.list.products.find((n) => n.productId === t),
    getListQuantity: (e) => (t) => {
      let n = 0;
      const r = e.lists.find((o) => o.id === t);
      if (r != null && r.products)
        for (let o of r.products) !o.quantity || (n += parseFloat(o.quantity));
      return n;
    },
    getTotalQauntity: (e) => {
      let t = 0;
      if (e.lists.length > 0) {
        for (let n of e.lists)
          if (!!n.products)
            for (let r of n.products)
              !r.quantity || (t += parseFloat(r.quantity));
      }
      return t;
    },
  },
  actions: {
    async setApi() {
      try {
        const e = await Km();
        return (this.api = zm(e)), !0;
      } catch (e) {
        return console.log(e), !1;
      }
    },
    async setList(e) {
      if (!e) {
        this.list = null;
        return;
      }
      const t = this.getListById(e);
      t
        ? ((this.list = t),
          (this.inputCache.editName = t.name),
          (this.inputCache.editDescription = t.description),
          this.list.products || (await this.fetchListProducts()),
          (this.sortOrder = this.getSortOrder()),
          this.sortTable(this.sortOrder))
        : (this.list = { error: "Shopping List not found." });
    },
    prepareSortArray() {
      (this.sortedProducts = this.list.products.sort((e, t) =>
        parseInt(e.itemId) < parseInt(t.itemId)
          ? 1
          : parseInt(e.itemId) > parseInt(t.itemId)
          ? -1
          : 0
      )),
        (this.sortListDialog = !0);
    },
    sortTable(e) {
      this.storeSortOrder(e), this.shoppingListTable.sort(e.value);
    },
    getSortOrder(e = null) {
      const t = Kn.getItem(`${this.list.id}-sort`);
      return e || t || this.sortOptions[0];
    },
    storeSortOrder(e) {
      Kn.set(`${this.list.id}-sort`, e);
    },
    closeList() {
      (this.layout = !1), this.router.push("/");
    },
    notifyError(e, t = [], n = 5e3) {
      Nu.create({
        message: e,
        type: "negative",
        timeout: n,
        actions: [...t, { icon: "close", color: "white", round: !0 }],
      });
    },
    notifySuccess(e, t = [], n = 1e3) {
      Nu.create({
        message: e,
        type: "positive",
        timeout: n,
        actions: [...t, { icon: "close", color: "white", round: !0 }],
      });
    },
    async fetchShoppingLists() {
      var e, t, n;
      (this.loading = !0), (this.lists = []);
      try {
        const r = await this.api.getShoppingLists();
        if (
          ((e = r.data) == null ? void 0 : e.code) !== 200 ||
          !((n = (t = r.data) == null ? void 0 : t.data) != null && n.list)
        )
          throw new Error(
            "Error connecting to Shopping Lists. Please try again later, or contact support."
          );
        this.lists = r.data.data.list.map((o) => ({
          id: o.id.toString(),
          totalCount: o.totalCount,
          totalQuantity: 0,
          name: o.name,
          description: o.description,
          status: o.status,
          customerName:
            o.customerInfo.firstName + " " + o.customerInfo.lastName,
          products: null,
        }));
      } catch (r) {
        console.log(r),
          this.notifyError(
            "Unable to load shopping lists. Please refresh the page.",
            [
              {
                label: "Refresh",
                icon: "refresh",
                color: "white",
                round: !1,
                handler: () => {
                  window.location.reload();
                },
              },
            ]
          );
      } finally {
        this.loading = !1;
      }
    },
    async createShoppingList() {
      var t, n, r;
      const e = {
        status: "0",
        name: this.inputCache.newName,
        description: this.inputCache.newDescription,
      };
      try {
        const o = await this.api.createShoppingList(e);
        if (
          ((t = o == null ? void 0 : o.data) == null ? void 0 : t.code) !==
            200 ||
          !(
            (r = (n = o == null ? void 0 : o.data) == null ? void 0 : n.data) !=
              null && r.shopplistId
          )
        )
          throw new Error(
            "Error creating shopping list - please refresh the page."
          );
        this.lists.unshift({
          id: o.data.data.shopplistId.toString(),
          totalCount: 0,
          name: this.inputCache.newName,
          description: this.inputCache.newDescription,
          status: "0",
          customerName: "",
        }),
          this.router.push(`/${this.lists[0].id}`),
          this.notifySuccess(`New list ${this.inputCache.newName} created.`);
      } catch (o) {
        console.log(o),
          this.notifyError(
            "Unable to create shopping list. Please refresh the page and try again.",
            [
              {
                label: "Refresh",
                icon: "refresh",
                color: "white",
                round: !1,
                handler: () => {
                  window.location.reload();
                },
              },
            ]
          );
      }
    },
    async updateShoppingList() {
      var t;
      if (
        this.list.name === this.inputCache.editName &&
        this.list.description === this.inputCache.editDescription
      )
        return;
      const e = {
        id: this.list.id,
        status: this.list.status,
        name: this.inputCache.editName,
        description: this.inputCache.editDescription,
      };
      try {
        const n = await this.api.updateShoppingList(e);
        if (
          ((t = n == null ? void 0 : n.data) == null ? void 0 : t.code) !== 200
        )
          throw new Error("Error updating shopping list.");
        (this.list.name = this.inputCache.editName),
          (this.list.description = this.inputCache.editDescription),
          this.notifySuccess("List updated.");
      } catch (n) {
        console.log(n),
          this.notifyError(
            "Unable to update shopping list. Please try again later, or contact support."
          );
      }
    },
    async deleteShoppingList() {
      var e;
      try {
        const t = await this.api.deleteShoppingList(this.list.id);
        if (
          ((e = t == null ? void 0 : t.data) == null ? void 0 : e.code) !== 200
        )
          throw new Error("Error deleting shopping list.");
        this.notifySuccess("List deleted."),
          (this.lists = this.lists.filter((n) => n.id !== this.list.id)),
          this.router.push(`/${this.lists[0].id}`);
      } catch (t) {
        console.log(t),
          this.notifyError(
            "Unable to delete shopping list. Please try again later, or contact support."
          );
      }
    },
    async deleteShoppingListItem(e) {
      var t;
      console.dir(e);
      try {
        const n = await this.api.deleteShoppingListItem(this.list.id, e);
        if (
          ((t = n == null ? void 0 : n.data) == null ? void 0 : t.code) !== 200
        )
          throw new Error("Error deleting shopping list item.");
        (this.list.products = this.list.products
          .filter((r) => r.itemId !== e)
          .map((r, o) => ({ ...r, lineNo: o + 1 }))),
          this.notifySuccess("Item deleted.");
      } catch (n) {
        console.log(n),
          this.notifyError(
            "Unable to delete shopping list item. Please try again later, or contact support."
          );
      }
    },
    async fetchListProducts() {
      var e;
      this.listLoading = !0;
      try {
        const t = await this.api.getListProducts(this.list.id);
        if (!((e = t == null ? void 0 : t.data) != null && e.length) > 0)
          return (this.list.products = null), !1;
        this.list.products = t.data;
        const n = Kn.getItem(this.list.id);
        for (let r of this.list.products)
          if (((r.quantity = (n && n[r.productId]) || 0), r.variants)) {
            for (let o of r.variants)
              if (o.variantId === r.variantId) {
                r.variant = o;
                break;
              }
            r.variant || (r.variant = r.variants[0]),
              r.variant.option_id ||
                ((r.variant.option_id = null),
                (r.variant.option_value = null),
                (r.variant.label = "N/A"));
          }
      } catch (t) {
        console.log(t),
          this.notifyError(
            "Unable to load shopping list products. Please refresh the page to try again.",
            [
              {
                label: "Refresh",
                icon: "refresh",
                color: "white",
                round: !1,
                handler: () => {
                  window.location.reload();
                },
              },
            ]
          );
      } finally {
        (this.listLoading = !1), this.loadPricing();
      }
    },
    async loadPricing(e = []) {
      if (!!this.list.products)
        try {
          e.length === 0 &&
            this.list.products.forEach((a) => {
              a.variants.forEach((i) => {
                e.push(i.sku);
              });
            });
          const t = [];
          for (let a = 0; a < e.length; a += 50)
            t.push(e.slice(a, a + 50).join("|"));
          const n = await Promise.all(
              t.map((a) => this.api.getProductVariants(a))
            ),
            r = [].concat(...n.map((a) => a.data.data)),
            o = new Map(r.map((a) => [a.sku, a.calculated_price]));
          this.list.products.forEach((a) => {
            a.variants.forEach((i) => {
              let l = o.get(i.sku);
              l !== void 0 && (i.calculated_price = l);
            });
          });
        } catch (t) {
          console.log(t);
        }
    },
    async updateProduct(e, t) {
      try {
        await this.api.updateShoppingListItem({
          shoppinglistId: this.list.id,
          itemId: e.itemId,
          qty: 0,
          optionList: [
            {
              option_id: `attribute[${t.option_id}]`,
              option_value: t.option_value,
            },
          ],
          variantId: t.variantId,
        }),
          (e.variant = t),
          this.notifySuccess("Product updated.");
      } catch (n) {
        console.log(n),
          this.notifyError(
            "Unable to update product. Please try again later, or contact support."
          );
      }
    },
    async addSearchedProductToList() {
      try {
        (this.listLoading = !0),
          await this.api.addShoppingListItem({
            id: this.list.id,
            items: [
              {
                productId: this.searchResult.product.id,
                qty: 1,
                optionList: [
                  {
                    option_id: `attribute[${this.searchResult.variant.option_id}]`,
                    option_value: this.searchResult.variant.option_value,
                  },
                ],
                variantId: this.searchResult.variant.variantId.toString(),
              },
            ],
          }),
          this.pushProductToList(
            this.searchResult.product.id,
            this.searchResult.variants
          ),
          this.notifySuccess("Product added to list.");
      } catch (e) {
        console.log(e),
          this.notifyError(
            "Unable to add product to list. Please try again later, or contact support."
          );
      } finally {
        this.listLoading = !1;
      }
    },
    async pushProductToList(e, t) {
      try {
        const o = (
          await this.api.getListProductsRaw(this.list.id)
        ).data.data.products.find(
          (a) => a.productId.toString() === e.toString()
        );
        if (o) {
          const a = {
            name: o.productName,
            itemId: o.itemId.toString(),
            productId: o.productId.toString(),
            productUrl: o.productUrl,
            urlThumbnail: o.primaryImage.urlThumbnail,
            variantId: o.variantId.toString(),
            price: parseFloat(o.basePrice),
            variants: t,
            quantity: 0,
          };
          for (let i of a.variants)
            if (i.variantId === a.variantId) {
              a.variant = i;
              break;
            }
          this.list.products.unshift(a),
            (this.list.products = this.list.products.map((i, l) => ({
              ...i,
              lineNo: l + 1,
            }))),
            this.loadPricing(
              a.variants.reduce((i, l) => (i.push(l.sku), i), [])
            );
        }
      } catch (n) {
        console.log(n),
          this.notifyError(
            "There was an error updating list. Please refresh the page.",
            [
              {
                label: "Refresh",
                icon: "refresh",
                color: "white",
                round: !1,
                handler: () => {
                  window.location.reload();
                },
              },
            ]
          );
      }
    },
    async searchProducts(e) {
      var t;
      if (
        ((this.searchResult.searchTerm = e),
        ((t = this.searchResult.searchTerm) == null ? void 0 : t.length) < 3)
      )
        this.searchResult.result = null;
      else
        try {
          this.searchResult.loading = !0;
          const n = await this.api.search(this.searchResult.searchTerm);
          this.searchResult.result = n.map((r) => {
            var o;
            return {
              ...r,
              imgUrl:
                (o = r.image) == null
                  ? void 0
                  : o.data.replace("{:size}", "250x100"),
            };
          });
        } catch (n) {
          console.log(n),
            this.notifyError(
              "Unable to search products. Please try again later, or contact support."
            );
        } finally {
          this.searchResult.loading = !1;
        }
    },
    clearSearch() {
      this.searchResult = {
        loading: !1,
        result: null,
        variants: null,
        variant: null,
        product: null,
        searchTerm: null,
        variantsLoading: !0,
      };
    },
    async searchLoadVariants() {
      this.searchResult.variantsLoading = !0;
      try {
        const e = await this.api.getVariants(this.searchResult.product.id);
        (this.searchResult.variants = e.data[0].variants),
          (this.searchResult.variant = this.searchResult.variants[0]),
          console.dir(e.data);
      } catch (e) {
        console.log(e),
          this.notifyError(
            "Unable to load product variants. Please try again later, or contact support."
          );
      } finally {
        this.searchResult.variantsLoading = !1;
      }
    },
    async getCart() {
      try {
        const e = await this.api.getCart();
        (this.cart = e[0]), console.log("this.cart"), console.dir(this.cart);
      } catch (e) {
        this.notifyError(
          "Unable to load shopping cart. To checkout, please close the Shopping Lists page and navigate to the cart from the main menu."
        ),
          console.log(e);
      }
    },
    async addToCart() {
      var t;
      (this.cartLoading = !0), await this.getCart();
      const e = { lineItems: [] };
      for (let n of this.lists)
        if (!!n.products)
          for (let r of n.products)
            !r.quantity ||
              e.lineItems.push({
                productId: parseInt(r.productId),
                quantity: parseInt(r.quantity),
                optionSelections: [
                  {
                    optionId: parseInt(r.variant.option_id),
                    optionValue: parseInt(r.variant.option_value),
                  },
                ],
              });
      try {
        let n = null;
        if (
          ((t = this == null ? void 0 : this.cart) != null && t.id
            ? (n = await this.api.updateCart(this.cart.id, e))
            : (n = await this.api.createCart(e)),
          console.log("added"),
          console.dir(n),
          !n.id)
        )
          throw new Error(n);
        (this.cart = n), (this.addToCartDialog = !0), this.resetAllQuantities();
      } catch (n) {
        console.log(n),
          this.notifyError(
            "Unable to add to cart. Please try again later, or contact support."
          );
      } finally {
        this.cartLoading = !1;
      }
    },
    async saveSortedList(e) {
      var t;
      try {
        this.sortLoading = !0;
        let n = [];
        for (let a = 0; a < this.list.products.length; a++)
          this.list.products[a].productId !== e[a].productId &&
            n.push({
              id: parseInt(this.list.products[a].itemId),
              productId: parseInt(e[a].productId),
              variantId: parseInt(e[a].variant.variantId),
              quantity: 1,
            });
        const r = { items: n },
          o = await this.api.sortShoppingList(this.list.id, JSON.stringify(r));
        if (
          ((t = o == null ? void 0 : o.data) == null ? void 0 : t.code) !== 200
        )
          throw new Error("Bad response from server.");
        this.sortOrder.value !== "ItemId" &&
          (this.sortTable(this.sortOptions[0]),
          (this.sortOrder = this.sortOptions[0])),
          this.fetchListProducts(),
          (this.sortListDialog = !1),
          this.notifySuccess("Custom sort saved.");
      } catch (n) {
        console.log(n),
          this.notifyError(
            "Unable to save sorted list. Please try again later, or contact support."
          );
      } finally {
        this.sortLoading = !1;
      }
    },
    storeQuantity(e) {
      const t = Kn.getItem(this.list.id);
      try {
        t
          ? Kn.set(this.list.id, { ...t, [e.productId]: e.quantity })
          : Kn.set(this.list.id, { [e.productId]: e.quantity });
      } catch (n) {
        console.log(n);
      }
    },
    incrementQty(e) {
      e.quantity++, this.storeQuantity(e);
    },
    decrementQty(e) {
      e.quantity > 0 && (e.quantity--, this.storeQuantity(e));
    },
    resetQuantities() {
      for (let e of this.list.products) e.quantity = 0;
      Kn.set(this.list.id, null);
    },
    resetAllQuantities() {
      for (let e of this.lists)
        if (!(!e.products || !e.products.length > 0)) {
          for (let t of e.products) t.quantity = 0;
          Kn.set(e.id, null);
        }
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
});
var RC =
  typeof globalThis != "undefined"
    ? globalThis
    : typeof window != "undefined"
    ? window
    : typeof global != "undefined"
    ? global
    : typeof self != "undefined"
    ? self
    : {};
function AC(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function Wm(e) {
  if (e.__esModule) return e;
  var t = Object.defineProperty({}, "__esModule", { value: !0 });
  return (
    Object.keys(e).forEach(function (n) {
      var r = Object.getOwnPropertyDescriptor(e, n);
      Object.defineProperty(
        t,
        n,
        r.get
          ? r
          : {
              enumerable: !0,
              get: function () {
                return e[n];
              },
            }
      );
    }),
    t
  );
}
var Qm = { exports: {} },
  IC = Wm(R0);
/**!
 * Sortable 1.14.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */ function yh(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function er(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? yh(Object(n), !0).forEach(function (r) {
          LC(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : yh(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function cl(e) {
  return (
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? (cl = function (t) {
          return typeof t;
        })
      : (cl = function (t) {
          return t &&
            typeof Symbol == "function" &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? "symbol"
            : typeof t;
        }),
    cl(e)
  );
}
function LC(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function An() {
  return (
    (An =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }),
    An.apply(this, arguments)
  );
}
function kC(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    o,
    a;
  for (a = 0; a < r.length; a++)
    (o = r[a]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function DC(e, t) {
  if (e == null) return {};
  var n = kC(e, t),
    r,
    o;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (o = 0; o < a.length; o++)
      (r = a[o]),
        !(t.indexOf(r) >= 0) &&
          (!Object.prototype.propertyIsEnumerable.call(e, r) || (n[r] = e[r]));
  }
  return n;
}
function MC(e) {
  return $C(e) || FC(e) || NC(e) || BC();
}
function $C(e) {
  if (Array.isArray(e)) return Qu(e);
}
function FC(e) {
  if (
    (typeof Symbol != "undefined" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function NC(e, t) {
  if (!!e) {
    if (typeof e == "string") return Qu(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (n === "Object" && e.constructor && (n = e.constructor.name),
      n === "Map" || n === "Set")
    )
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Qu(e, t);
  }
}
function Qu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function BC() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var jC = "1.14.0";
function fr(e) {
  if (typeof window != "undefined" && window.navigator)
    return !!navigator.userAgent.match(e);
}
var pr = fr(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
  Pa = fr(/Edge/i),
  bh = fr(/firefox/i),
  Wi = fr(/safari/i) && !fr(/chrome/i) && !fr(/android/i),
  Gm = fr(/iP(ad|od|hone)/i),
  VC = fr(/chrome/i) && fr(/android/i),
  Xm = { capture: !1, passive: !1 };
function Ze(e, t, n) {
  e.addEventListener(t, n, !pr && Xm);
}
function Qe(e, t, n) {
  e.removeEventListener(t, n, !pr && Xm);
}
function Fl(e, t) {
  if (!!t) {
    if ((t[0] === ">" && (t = t.substring(1)), e))
      try {
        if (e.matches) return e.matches(t);
        if (e.msMatchesSelector) return e.msMatchesSelector(t);
        if (e.webkitMatchesSelector) return e.webkitMatchesSelector(t);
      } catch {
        return !1;
      }
    return !1;
  }
}
function qC(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function Nn(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (
        (t != null &&
          (t[0] === ">" ? e.parentNode === n && Fl(e, t) : Fl(e, t))) ||
        (r && e === n)
      )
        return e;
      if (e === n) break;
    } while ((e = qC(e)));
  }
  return null;
}
var Sh = /\s+/g;
function Tt(e, t, n) {
  if (e && t)
    if (e.classList) e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ")
        .replace(Sh, " ")
        .replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(Sh, " ");
    }
}
function Re(e, t, n) {
  var r = e && e.style;
  if (r) {
    if (n === void 0)
      return (
        document.defaultView && document.defaultView.getComputedStyle
          ? (n = document.defaultView.getComputedStyle(e, ""))
          : e.currentStyle && (n = e.currentStyle),
        t === void 0 ? n : n[t]
      );
    !(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t),
      (r[t] = n + (typeof n == "string" ? "" : "px"));
  }
}
function ho(e, t) {
  var n = "";
  if (typeof e == "string") n = e;
  else
    do {
      var r = Re(e, "transform");
      r && r !== "none" && (n = r + " " + n);
    } while (!t && (e = e.parentNode));
  var o =
    window.DOMMatrix ||
    window.WebKitCSSMatrix ||
    window.CSSMatrix ||
    window.MSCSSMatrix;
  return o && new o(n);
}
function Ym(e, t, n) {
  if (e) {
    var r = e.getElementsByTagName(t),
      o = 0,
      a = r.length;
    if (n) for (; o < a; o++) n(r[o], o);
    return r;
  }
  return [];
}
function Jn() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function xt(e, t, n, r, o) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var a, i, l, s, u, c, f;
    if (
      (e !== window && e.parentNode && e !== Jn()
        ? ((a = e.getBoundingClientRect()),
          (i = a.top),
          (l = a.left),
          (s = a.bottom),
          (u = a.right),
          (c = a.height),
          (f = a.width))
        : ((i = 0),
          (l = 0),
          (s = window.innerHeight),
          (u = window.innerWidth),
          (c = window.innerHeight),
          (f = window.innerWidth)),
      (t || n) && e !== window && ((o = o || e.parentNode), !pr))
    )
      do
        if (
          o &&
          o.getBoundingClientRect &&
          (Re(o, "transform") !== "none" ||
            (n && Re(o, "position") !== "static"))
        ) {
          var d = o.getBoundingClientRect();
          (i -= d.top + parseInt(Re(o, "border-top-width"))),
            (l -= d.left + parseInt(Re(o, "border-left-width"))),
            (s = i + a.height),
            (u = l + a.width);
          break;
        }
      while ((o = o.parentNode));
    if (r && e !== window) {
      var h = ho(o || e),
        v = h && h.a,
        m = h && h.d;
      h && ((i /= m), (l /= v), (f /= v), (c /= m), (s = i + c), (u = l + f));
    }
    return { top: i, left: l, bottom: s, right: u, width: f, height: c };
  }
}
function wh(e, t, n) {
  for (var r = Ar(e, !0), o = xt(e)[t]; r; ) {
    var a = xt(r)[n],
      i = void 0;
    if ((n === "top" || n === "left" ? (i = o >= a) : (i = o <= a), !i))
      return r;
    if (r === Jn()) break;
    r = Ar(r, !1);
  }
  return !1;
}
function ri(e, t, n, r) {
  for (var o = 0, a = 0, i = e.children; a < i.length; ) {
    if (
      i[a].style.display !== "none" &&
      i[a] !== $e.ghost &&
      (r || i[a] !== $e.dragged) &&
      Nn(i[a], n.draggable, e, !1)
    ) {
      if (o === t) return i[a];
      o++;
    }
    a++;
  }
  return null;
}
function af(e, t) {
  for (
    var n = e.lastElementChild;
    n && (n === $e.ghost || Re(n, "display") === "none" || (t && !Fl(n, t)));

  )
    n = n.previousElementSibling;
  return n || null;
}
function Lt(e, t) {
  var n = 0;
  if (!e || !e.parentNode) return -1;
  for (; (e = e.previousElementSibling); )
    e.nodeName.toUpperCase() !== "TEMPLATE" &&
      e !== $e.clone &&
      (!t || Fl(e, t)) &&
      n++;
  return n;
}
function xh(e) {
  var t = 0,
    n = 0,
    r = Jn();
  if (e)
    do {
      var o = ho(e),
        a = o.a,
        i = o.d;
      (t += e.scrollLeft * a), (n += e.scrollTop * i);
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function HC(e, t) {
  for (var n in e)
    if (!!e.hasOwnProperty(n)) {
      for (var r in t)
        if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
    }
  return -1;
}
function Ar(e, t) {
  if (!e || !e.getBoundingClientRect) return Jn();
  var n = e,
    r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var o = Re(n);
      if (
        (n.clientWidth < n.scrollWidth &&
          (o.overflowX == "auto" || o.overflowX == "scroll")) ||
        (n.clientHeight < n.scrollHeight &&
          (o.overflowY == "auto" || o.overflowY == "scroll"))
      ) {
        if (!n.getBoundingClientRect || n === document.body) return Jn();
        if (r || t) return n;
        r = !0;
      }
    }
  while ((n = n.parentNode));
  return Jn();
}
function _C(e, t) {
  if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Gs(e, t) {
  return (
    Math.round(e.top) === Math.round(t.top) &&
    Math.round(e.left) === Math.round(t.left) &&
    Math.round(e.height) === Math.round(t.height) &&
    Math.round(e.width) === Math.round(t.width)
  );
}
var Qi;
function Jm(e, t) {
  return function () {
    if (!Qi) {
      var n = arguments,
        r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n),
        (Qi = setTimeout(function () {
          Qi = void 0;
        }, t));
    }
  };
}
function UC() {
  clearTimeout(Qi), (Qi = void 0);
}
function Zm(e, t, n) {
  (e.scrollLeft += t), (e.scrollTop += n);
}
function lf(e) {
  var t = window.Polymer,
    n = window.jQuery || window.Zepto;
  return t && t.dom
    ? t.dom(e).cloneNode(!0)
    : n
    ? n(e).clone(!0)[0]
    : e.cloneNode(!0);
}
function Eh(e, t) {
  Re(e, "position", "absolute"),
    Re(e, "top", t.top),
    Re(e, "left", t.left),
    Re(e, "width", t.width),
    Re(e, "height", t.height);
}
function Xs(e) {
  Re(e, "position", ""),
    Re(e, "top", ""),
    Re(e, "left", ""),
    Re(e, "width", ""),
    Re(e, "height", "");
}
var Zt = "Sortable" + new Date().getTime();
function zC() {
  var e = [],
    t;
  return {
    captureAnimationState: function () {
      if (((e = []), !!this.options.animation)) {
        var r = [].slice.call(this.el.children);
        r.forEach(function (o) {
          if (!(Re(o, "display") === "none" || o === $e.ghost)) {
            e.push({ target: o, rect: xt(o) });
            var a = er({}, e[e.length - 1].rect);
            if (o.thisAnimationDuration) {
              var i = ho(o, !0);
              i && ((a.top -= i.f), (a.left -= i.e));
            }
            o.fromRect = a;
          }
        });
      }
    },
    addAnimationState: function (r) {
      e.push(r);
    },
    removeAnimationState: function (r) {
      e.splice(HC(e, { target: r }), 1);
    },
    animateAll: function (r) {
      var o = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof r == "function" && r();
        return;
      }
      var a = !1,
        i = 0;
      e.forEach(function (l) {
        var s = 0,
          u = l.target,
          c = u.fromRect,
          f = xt(u),
          d = u.prevFromRect,
          h = u.prevToRect,
          v = l.rect,
          m = ho(u, !0);
        m && ((f.top -= m.f), (f.left -= m.e)),
          (u.toRect = f),
          u.thisAnimationDuration &&
            Gs(d, f) &&
            !Gs(c, f) &&
            (v.top - f.top) / (v.left - f.left) ===
              (c.top - f.top) / (c.left - f.left) &&
            (s = WC(v, d, h, o.options)),
          Gs(f, c) ||
            ((u.prevFromRect = c),
            (u.prevToRect = f),
            s || (s = o.options.animation),
            o.animate(u, v, f, s)),
          s &&
            ((a = !0),
            (i = Math.max(i, s)),
            clearTimeout(u.animationResetTimer),
            (u.animationResetTimer = setTimeout(function () {
              (u.animationTime = 0),
                (u.prevFromRect = null),
                (u.fromRect = null),
                (u.prevToRect = null),
                (u.thisAnimationDuration = null);
            }, s)),
            (u.thisAnimationDuration = s));
      }),
        clearTimeout(t),
        a
          ? (t = setTimeout(function () {
              typeof r == "function" && r();
            }, i))
          : typeof r == "function" && r(),
        (e = []);
    },
    animate: function (r, o, a, i) {
      if (i) {
        Re(r, "transition", ""), Re(r, "transform", "");
        var l = ho(this.el),
          s = l && l.a,
          u = l && l.d,
          c = (o.left - a.left) / (s || 1),
          f = (o.top - a.top) / (u || 1);
        (r.animatingX = !!c),
          (r.animatingY = !!f),
          Re(r, "transform", "translate3d(" + c + "px," + f + "px,0)"),
          (this.forRepaintDummy = KC(r)),
          Re(
            r,
            "transition",
            "transform " +
              i +
              "ms" +
              (this.options.easing ? " " + this.options.easing : "")
          ),
          Re(r, "transform", "translate3d(0,0,0)"),
          typeof r.animated == "number" && clearTimeout(r.animated),
          (r.animated = setTimeout(function () {
            Re(r, "transition", ""),
              Re(r, "transform", ""),
              (r.animated = !1),
              (r.animatingX = !1),
              (r.animatingY = !1);
          }, i));
      }
    },
  };
}
function KC(e) {
  return e.offsetWidth;
}
function WC(e, t, n, r) {
  return (
    (Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) /
      Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2))) *
    r.animation
  );
}
var ko = [],
  Ys = { initializeByDefault: !0 },
  Ra = {
    mount: function (t) {
      for (var n in Ys) Ys.hasOwnProperty(n) && !(n in t) && (t[n] = Ys[n]);
      ko.forEach(function (r) {
        if (r.pluginName === t.pluginName)
          throw "Sortable: Cannot mount plugin ".concat(
            t.pluginName,
            " more than once"
          );
      }),
        ko.push(t);
    },
    pluginEvent: function (t, n, r) {
      var o = this;
      (this.eventCanceled = !1),
        (r.cancel = function () {
          o.eventCanceled = !0;
        });
      var a = t + "Global";
      ko.forEach(function (i) {
        !n[i.pluginName] ||
          (n[i.pluginName][a] && n[i.pluginName][a](er({ sortable: n }, r)),
          n.options[i.pluginName] &&
            n[i.pluginName][t] &&
            n[i.pluginName][t](er({ sortable: n }, r)));
      });
    },
    initializePlugins: function (t, n, r, o) {
      ko.forEach(function (l) {
        var s = l.pluginName;
        if (!(!t.options[s] && !l.initializeByDefault)) {
          var u = new l(t, n, t.options);
          (u.sortable = t),
            (u.options = t.options),
            (t[s] = u),
            An(r, u.defaults);
        }
      });
      for (var a in t.options)
        if (!!t.options.hasOwnProperty(a)) {
          var i = this.modifyOption(t, a, t.options[a]);
          typeof i != "undefined" && (t.options[a] = i);
        }
    },
    getEventProperties: function (t, n) {
      var r = {};
      return (
        ko.forEach(function (o) {
          typeof o.eventProperties == "function" &&
            An(r, o.eventProperties.call(n[o.pluginName], t));
        }),
        r
      );
    },
    modifyOption: function (t, n, r) {
      var o;
      return (
        ko.forEach(function (a) {
          !t[a.pluginName] ||
            (a.optionListeners &&
              typeof a.optionListeners[n] == "function" &&
              (o = a.optionListeners[n].call(t[a.pluginName], r)));
        }),
        o
      );
    },
  };
function Ii(e) {
  var t = e.sortable,
    n = e.rootEl,
    r = e.name,
    o = e.targetEl,
    a = e.cloneEl,
    i = e.toEl,
    l = e.fromEl,
    s = e.oldIndex,
    u = e.newIndex,
    c = e.oldDraggableIndex,
    f = e.newDraggableIndex,
    d = e.originalEvent,
    h = e.putSortable,
    v = e.extraEventProperties;
  if (((t = t || (n && n[Zt])), !!t)) {
    var m,
      g = t.options,
      y = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !pr && !Pa
      ? (m = new CustomEvent(r, { bubbles: !0, cancelable: !0 }))
      : ((m = document.createEvent("Event")), m.initEvent(r, !0, !0)),
      (m.to = i || n),
      (m.from = l || n),
      (m.item = o || n),
      (m.clone = a),
      (m.oldIndex = s),
      (m.newIndex = u),
      (m.oldDraggableIndex = c),
      (m.newDraggableIndex = f),
      (m.originalEvent = d),
      (m.pullMode = h ? h.lastPutMode : void 0);
    var p = er(er({}, v), Ra.getEventProperties(r, t));
    for (var w in p) m[w] = p[w];
    n && n.dispatchEvent(m), g[y] && g[y].call(t, m);
  }
}
var QC = ["evt"],
  ln = function (t, n) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      o = r.evt,
      a = DC(r, QC);
    Ra.pluginEvent.bind($e)(
      t,
      n,
      er(
        {
          dragEl: pe,
          parentEl: Pt,
          ghostEl: _e,
          rootEl: bt,
          nextEl: Xr,
          lastDownEl: fl,
          cloneEl: Rt,
          cloneHidden: Rr,
          dragStarted: Li,
          putSortable: Wt,
          activeSortable: $e.active,
          originalEvent: o,
          oldIndex: Vo,
          oldDraggableIndex: Gi,
          newIndex: pn,
          newDraggableIndex: Tr,
          hideGhostForTarget: rg,
          unhideGhostForTarget: og,
          cloneNowHidden: function () {
            Rr = !0;
          },
          cloneNowShown: function () {
            Rr = !1;
          },
          dispatchSortableEvent: function (l) {
            on({ sortable: n, name: l, originalEvent: o });
          },
        },
        a
      )
    );
  };
function on(e) {
  Ii(
    er(
      {
        putSortable: Wt,
        cloneEl: Rt,
        targetEl: pe,
        rootEl: bt,
        oldIndex: Vo,
        oldDraggableIndex: Gi,
        newIndex: pn,
        newDraggableIndex: Tr,
      },
      e
    )
  );
}
var pe,
  Pt,
  _e,
  bt,
  Xr,
  fl,
  Rt,
  Rr,
  Vo,
  pn,
  Gi,
  Tr,
  Wa,
  Wt,
  Bo = !1,
  Nl = !1,
  Bl = [],
  Wr,
  Dn,
  Js,
  Zs,
  Ch,
  Oh,
  Li,
  Do,
  Xi,
  Yi = !1,
  Qa = !1,
  dl,
  Xt,
  eu = [],
  Gu = !1,
  jl = [],
  vs = typeof document != "undefined",
  Ga = Gm,
  Th = Pa || pr ? "cssFloat" : "float",
  GC = vs && !VC && !Gm && "draggable" in document.createElement("div"),
  eg = (function () {
    if (!!vs) {
      if (pr) return !1;
      var e = document.createElement("x");
      return (
        (e.style.cssText = "pointer-events:auto"),
        e.style.pointerEvents === "auto"
      );
    }
  })(),
  tg = function (t, n) {
    var r = Re(t),
      o =
        parseInt(r.width) -
        parseInt(r.paddingLeft) -
        parseInt(r.paddingRight) -
        parseInt(r.borderLeftWidth) -
        parseInt(r.borderRightWidth),
      a = ri(t, 0, n),
      i = ri(t, 1, n),
      l = a && Re(a),
      s = i && Re(i),
      u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + xt(a).width,
      c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + xt(i).width;
    if (r.display === "flex")
      return r.flexDirection === "column" ||
        r.flexDirection === "column-reverse"
        ? "vertical"
        : "horizontal";
    if (r.display === "grid")
      return r.gridTemplateColumns.split(" ").length <= 1
        ? "vertical"
        : "horizontal";
    if (a && l.float && l.float !== "none") {
      var f = l.float === "left" ? "left" : "right";
      return i && (s.clear === "both" || s.clear === f)
        ? "vertical"
        : "horizontal";
    }
    return a &&
      (l.display === "block" ||
        l.display === "flex" ||
        l.display === "table" ||
        l.display === "grid" ||
        (u >= o && r[Th] === "none") ||
        (i && r[Th] === "none" && u + c > o))
      ? "vertical"
      : "horizontal";
  },
  XC = function (t, n, r) {
    var o = r ? t.left : t.top,
      a = r ? t.right : t.bottom,
      i = r ? t.width : t.height,
      l = r ? n.left : n.top,
      s = r ? n.right : n.bottom,
      u = r ? n.width : n.height;
    return o === l || a === s || o + i / 2 === l + u / 2;
  },
  YC = function (t, n) {
    var r;
    return (
      Bl.some(function (o) {
        var a = o[Zt].options.emptyInsertThreshold;
        if (!(!a || af(o))) {
          var i = xt(o),
            l = t >= i.left - a && t <= i.right + a,
            s = n >= i.top - a && n <= i.bottom + a;
          if (l && s) return (r = o);
        }
      }),
      r
    );
  },
  ng = function (t) {
    function n(a, i) {
      return function (l, s, u, c) {
        var f =
          l.options.group.name &&
          s.options.group.name &&
          l.options.group.name === s.options.group.name;
        if (a == null && (i || f)) return !0;
        if (a == null || a === !1) return !1;
        if (i && a === "clone") return a;
        if (typeof a == "function") return n(a(l, s, u, c), i)(l, s, u, c);
        var d = (i ? l : s).options.group.name;
        return (
          a === !0 ||
          (typeof a == "string" && a === d) ||
          (a.join && a.indexOf(d) > -1)
        );
      };
    }
    var r = {},
      o = t.group;
    (!o || cl(o) != "object") && (o = { name: o }),
      (r.name = o.name),
      (r.checkPull = n(o.pull, !0)),
      (r.checkPut = n(o.put)),
      (r.revertClone = o.revertClone),
      (t.group = r);
  },
  rg = function () {
    !eg && _e && Re(_e, "display", "none");
  },
  og = function () {
    !eg && _e && Re(_e, "display", "");
  };
vs &&
  document.addEventListener(
    "click",
    function (e) {
      if (Nl)
        return (
          e.preventDefault(),
          e.stopPropagation && e.stopPropagation(),
          e.stopImmediatePropagation && e.stopImmediatePropagation(),
          (Nl = !1),
          !1
        );
    },
    !0
  );
var Qr = function (t) {
    if (pe) {
      t = t.touches ? t.touches[0] : t;
      var n = YC(t.clientX, t.clientY);
      if (n) {
        var r = {};
        for (var o in t) t.hasOwnProperty(o) && (r[o] = t[o]);
        (r.target = r.rootEl = n),
          (r.preventDefault = void 0),
          (r.stopPropagation = void 0),
          n[Zt]._onDragOver(r);
      }
    }
  },
  JC = function (t) {
    pe && pe.parentNode[Zt]._isOutsideThisEl(t.target);
  };
function $e(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat(
      {}.toString.call(e)
    );
  (this.el = e), (this.options = t = An({}, t)), (e[Zt] = this);
  var n = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    invertSwap: !1,
    invertedSwapThreshold: null,
    removeCloneOnHide: !0,
    direction: function () {
      return tg(e, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function (i, l) {
      i.setData("Text", l.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold:
      (Number.parseInt ? Number : window).parseInt(
        window.devicePixelRatio,
        10
      ) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: { x: 0, y: 0 },
    supportPointer: $e.supportPointer !== !1 && "PointerEvent" in window && !Wi,
    emptyInsertThreshold: 5,
  };
  Ra.initializePlugins(this, e, n);
  for (var r in n) !(r in t) && (t[r] = n[r]);
  ng(t);
  for (var o in this)
    o.charAt(0) === "_" &&
      typeof this[o] == "function" &&
      (this[o] = this[o].bind(this));
  (this.nativeDraggable = t.forceFallback ? !1 : GC),
    this.nativeDraggable && (this.options.touchStartThreshold = 1),
    t.supportPointer
      ? Ze(e, "pointerdown", this._onTapStart)
      : (Ze(e, "mousedown", this._onTapStart),
        Ze(e, "touchstart", this._onTapStart)),
    this.nativeDraggable && (Ze(e, "dragover", this), Ze(e, "dragenter", this)),
    Bl.push(this.el),
    t.store && t.store.get && this.sort(t.store.get(this) || []),
    An(this, zC());
}
$e.prototype = {
  constructor: $e,
  _isOutsideThisEl: function (t) {
    !this.el.contains(t) && t !== this.el && (Do = null);
  },
  _getDirection: function (t, n) {
    return typeof this.options.direction == "function"
      ? this.options.direction.call(this, t, n, pe)
      : this.options.direction;
  },
  _onTapStart: function (t) {
    if (!!t.cancelable) {
      var n = this,
        r = this.el,
        o = this.options,
        a = o.preventOnFilter,
        i = t.type,
        l =
          (t.touches && t.touches[0]) ||
          (t.pointerType && t.pointerType === "touch" && t),
        s = (l || t).target,
        u =
          (t.target.shadowRoot &&
            ((t.path && t.path[0]) ||
              (t.composedPath && t.composedPath()[0]))) ||
          s,
        c = o.filter;
      if (
        (a1(r),
        !pe &&
          !(
            (/mousedown|pointerdown/.test(i) && t.button !== 0) ||
            o.disabled
          ) &&
          !u.isContentEditable &&
          !(
            !this.nativeDraggable &&
            Wi &&
            s &&
            s.tagName.toUpperCase() === "SELECT"
          ) &&
          ((s = Nn(s, o.draggable, r, !1)), !(s && s.animated) && fl !== s))
      ) {
        if (((Vo = Lt(s)), (Gi = Lt(s, o.draggable)), typeof c == "function")) {
          if (c.call(this, t, s, this)) {
            on({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: r,
              fromEl: r,
            }),
              ln("filter", n, { evt: t }),
              a && t.cancelable && t.preventDefault();
            return;
          }
        } else if (
          c &&
          ((c = c.split(",").some(function (f) {
            if (((f = Nn(u, f.trim(), r, !1)), f))
              return (
                on({
                  sortable: n,
                  rootEl: f,
                  name: "filter",
                  targetEl: s,
                  fromEl: r,
                  toEl: r,
                }),
                ln("filter", n, { evt: t }),
                !0
              );
          })),
          c)
        ) {
          a && t.cancelable && t.preventDefault();
          return;
        }
        (o.handle && !Nn(u, o.handle, r, !1)) ||
          this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function (t, n, r) {
    var o = this,
      a = o.el,
      i = o.options,
      l = a.ownerDocument,
      s;
    if (r && !pe && r.parentNode === a) {
      var u = xt(r);
      if (
        ((bt = a),
        (pe = r),
        (Pt = pe.parentNode),
        (Xr = pe.nextSibling),
        (fl = r),
        (Wa = i.group),
        ($e.dragged = pe),
        (Wr = {
          target: pe,
          clientX: (n || t).clientX,
          clientY: (n || t).clientY,
        }),
        (Ch = Wr.clientX - u.left),
        (Oh = Wr.clientY - u.top),
        (this._lastX = (n || t).clientX),
        (this._lastY = (n || t).clientY),
        (pe.style["will-change"] = "all"),
        (s = function () {
          if ((ln("delayEnded", o, { evt: t }), $e.eventCanceled)) {
            o._onDrop();
            return;
          }
          o._disableDelayedDragEvents(),
            !bh && o.nativeDraggable && (pe.draggable = !0),
            o._triggerDragStart(t, n),
            on({ sortable: o, name: "choose", originalEvent: t }),
            Tt(pe, i.chosenClass, !0);
        }),
        i.ignore.split(",").forEach(function (c) {
          Ym(pe, c.trim(), tu);
        }),
        Ze(l, "dragover", Qr),
        Ze(l, "mousemove", Qr),
        Ze(l, "touchmove", Qr),
        Ze(l, "mouseup", o._onDrop),
        Ze(l, "touchend", o._onDrop),
        Ze(l, "touchcancel", o._onDrop),
        bh &&
          this.nativeDraggable &&
          ((this.options.touchStartThreshold = 4), (pe.draggable = !0)),
        ln("delayStart", this, { evt: t }),
        i.delay &&
          (!i.delayOnTouchOnly || n) &&
          (!this.nativeDraggable || !(Pa || pr)))
      ) {
        if ($e.eventCanceled) {
          this._onDrop();
          return;
        }
        Ze(l, "mouseup", o._disableDelayedDrag),
          Ze(l, "touchend", o._disableDelayedDrag),
          Ze(l, "touchcancel", o._disableDelayedDrag),
          Ze(l, "mousemove", o._delayedDragTouchMoveHandler),
          Ze(l, "touchmove", o._delayedDragTouchMoveHandler),
          i.supportPointer &&
            Ze(l, "pointermove", o._delayedDragTouchMoveHandler),
          (o._dragStartTimer = setTimeout(s, i.delay));
      } else s();
    }
  },
  _delayedDragTouchMoveHandler: function (t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(
      Math.abs(n.clientX - this._lastX),
      Math.abs(n.clientY - this._lastY)
    ) >=
      Math.floor(
        this.options.touchStartThreshold /
          ((this.nativeDraggable && window.devicePixelRatio) || 1)
      ) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function () {
    pe && tu(pe),
      clearTimeout(this._dragStartTimer),
      this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function () {
    var t = this.el.ownerDocument;
    Qe(t, "mouseup", this._disableDelayedDrag),
      Qe(t, "touchend", this._disableDelayedDrag),
      Qe(t, "touchcancel", this._disableDelayedDrag),
      Qe(t, "mousemove", this._delayedDragTouchMoveHandler),
      Qe(t, "touchmove", this._delayedDragTouchMoveHandler),
      Qe(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function (t, n) {
    (n = n || (t.pointerType == "touch" && t)),
      !this.nativeDraggable || n
        ? this.options.supportPointer
          ? Ze(document, "pointermove", this._onTouchMove)
          : n
          ? Ze(document, "touchmove", this._onTouchMove)
          : Ze(document, "mousemove", this._onTouchMove)
        : (Ze(pe, "dragend", this), Ze(bt, "dragstart", this._onDragStart));
    try {
      document.selection
        ? hl(function () {
            document.selection.empty();
          })
        : window.getSelection().removeAllRanges();
    } catch {}
  },
  _dragStarted: function (t, n) {
    if (((Bo = !1), bt && pe)) {
      ln("dragStarted", this, { evt: n }),
        this.nativeDraggable && Ze(document, "dragover", JC);
      var r = this.options;
      !t && Tt(pe, r.dragClass, !1),
        Tt(pe, r.ghostClass, !0),
        ($e.active = this),
        t && this._appendGhost(),
        on({ sortable: this, name: "start", originalEvent: n });
    } else this._nulling();
  },
  _emulateDragOver: function () {
    if (Dn) {
      (this._lastX = Dn.clientX), (this._lastY = Dn.clientY), rg();
      for (
        var t = document.elementFromPoint(Dn.clientX, Dn.clientY), n = t;
        t &&
        t.shadowRoot &&
        ((t = t.shadowRoot.elementFromPoint(Dn.clientX, Dn.clientY)), t !== n);

      )
        n = t;
      if ((pe.parentNode[Zt]._isOutsideThisEl(t), n))
        do {
          if (n[Zt]) {
            var r = void 0;
            if (
              ((r = n[Zt]._onDragOver({
                clientX: Dn.clientX,
                clientY: Dn.clientY,
                target: t,
                rootEl: n,
              })),
              r && !this.options.dragoverBubble)
            )
              break;
          }
          t = n;
        } while ((n = n.parentNode));
      og();
    }
  },
  _onTouchMove: function (t) {
    if (Wr) {
      var n = this.options,
        r = n.fallbackTolerance,
        o = n.fallbackOffset,
        a = t.touches ? t.touches[0] : t,
        i = _e && ho(_e, !0),
        l = _e && i && i.a,
        s = _e && i && i.d,
        u = Ga && Xt && xh(Xt),
        c =
          (a.clientX - Wr.clientX + o.x) / (l || 1) +
          (u ? u[0] - eu[0] : 0) / (l || 1),
        f =
          (a.clientY - Wr.clientY + o.y) / (s || 1) +
          (u ? u[1] - eu[1] : 0) / (s || 1);
      if (!$e.active && !Bo) {
        if (
          r &&
          Math.max(
            Math.abs(a.clientX - this._lastX),
            Math.abs(a.clientY - this._lastY)
          ) < r
        )
          return;
        this._onDragStart(t, !0);
      }
      if (_e) {
        i
          ? ((i.e += c - (Js || 0)), (i.f += f - (Zs || 0)))
          : (i = { a: 1, b: 0, c: 0, d: 1, e: c, f });
        var d = "matrix("
          .concat(i.a, ",")
          .concat(i.b, ",")
          .concat(i.c, ",")
          .concat(i.d, ",")
          .concat(i.e, ",")
          .concat(i.f, ")");
        Re(_e, "webkitTransform", d),
          Re(_e, "mozTransform", d),
          Re(_e, "msTransform", d),
          Re(_e, "transform", d),
          (Js = c),
          (Zs = f),
          (Dn = a);
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function () {
    if (!_e) {
      var t = this.options.fallbackOnBody ? document.body : bt,
        n = xt(pe, !0, Ga, !0, t),
        r = this.options;
      if (Ga) {
        for (
          Xt = t;
          Re(Xt, "position") === "static" &&
          Re(Xt, "transform") === "none" &&
          Xt !== document;

        )
          Xt = Xt.parentNode;
        Xt !== document.body && Xt !== document.documentElement
          ? (Xt === document && (Xt = Jn()),
            (n.top += Xt.scrollTop),
            (n.left += Xt.scrollLeft))
          : (Xt = Jn()),
          (eu = xh(Xt));
      }
      (_e = pe.cloneNode(!0)),
        Tt(_e, r.ghostClass, !1),
        Tt(_e, r.fallbackClass, !0),
        Tt(_e, r.dragClass, !0),
        Re(_e, "transition", ""),
        Re(_e, "transform", ""),
        Re(_e, "box-sizing", "border-box"),
        Re(_e, "margin", 0),
        Re(_e, "top", n.top),
        Re(_e, "left", n.left),
        Re(_e, "width", n.width),
        Re(_e, "height", n.height),
        Re(_e, "opacity", "0.8"),
        Re(_e, "position", Ga ? "absolute" : "fixed"),
        Re(_e, "zIndex", "100000"),
        Re(_e, "pointerEvents", "none"),
        ($e.ghost = _e),
        t.appendChild(_e),
        Re(
          _e,
          "transform-origin",
          (Ch / parseInt(_e.style.width)) * 100 +
            "% " +
            (Oh / parseInt(_e.style.height)) * 100 +
            "%"
        );
    }
  },
  _onDragStart: function (t, n) {
    var r = this,
      o = t.dataTransfer,
      a = r.options;
    if ((ln("dragStart", this, { evt: t }), $e.eventCanceled)) {
      this._onDrop();
      return;
    }
    ln("setupClone", this),
      $e.eventCanceled ||
        ((Rt = lf(pe)),
        (Rt.draggable = !1),
        (Rt.style["will-change"] = ""),
        this._hideClone(),
        Tt(Rt, this.options.chosenClass, !1),
        ($e.clone = Rt)),
      (r.cloneId = hl(function () {
        ln("clone", r),
          !$e.eventCanceled &&
            (r.options.removeCloneOnHide || bt.insertBefore(Rt, pe),
            r._hideClone(),
            on({ sortable: r, name: "clone" }));
      })),
      !n && Tt(pe, a.dragClass, !0),
      n
        ? ((Nl = !0), (r._loopId = setInterval(r._emulateDragOver, 50)))
        : (Qe(document, "mouseup", r._onDrop),
          Qe(document, "touchend", r._onDrop),
          Qe(document, "touchcancel", r._onDrop),
          o &&
            ((o.effectAllowed = "move"), a.setData && a.setData.call(r, o, pe)),
          Ze(document, "drop", r),
          Re(pe, "transform", "translateZ(0)")),
      (Bo = !0),
      (r._dragStartId = hl(r._dragStarted.bind(r, n, t))),
      Ze(document, "selectstart", r),
      (Li = !0),
      Wi && Re(document.body, "user-select", "none");
  },
  _onDragOver: function (t) {
    var n = this.el,
      r = t.target,
      o,
      a,
      i,
      l = this.options,
      s = l.group,
      u = $e.active,
      c = Wa === s,
      f = l.sort,
      d = Wt || u,
      h,
      v = this,
      m = !1;
    if (Gu) return;
    function g(oe, xe) {
      ln(
        oe,
        v,
        er(
          {
            evt: t,
            isOwner: c,
            axis: h ? "vertical" : "horizontal",
            revert: i,
            dragRect: o,
            targetRect: a,
            canSort: f,
            fromSortable: d,
            target: r,
            completed: p,
            onMove: function (X, H) {
              return Xa(bt, n, pe, o, X, xt(X), t, H);
            },
            changed: w,
          },
          xe
        )
      );
    }
    function y() {
      g("dragOverAnimationCapture"),
        v.captureAnimationState(),
        v !== d && d.captureAnimationState();
    }
    function p(oe) {
      return (
        g("dragOverCompleted", { insertion: oe }),
        oe &&
          (c ? u._hideClone() : u._showClone(v),
          v !== d &&
            (Tt(pe, Wt ? Wt.options.ghostClass : u.options.ghostClass, !1),
            Tt(pe, l.ghostClass, !0)),
          Wt !== v && v !== $e.active
            ? (Wt = v)
            : v === $e.active && Wt && (Wt = null),
          d === v && (v._ignoreWhileAnimating = r),
          v.animateAll(function () {
            g("dragOverAnimationComplete"), (v._ignoreWhileAnimating = null);
          }),
          v !== d && (d.animateAll(), (d._ignoreWhileAnimating = null))),
        ((r === pe && !pe.animated) || (r === n && !r.animated)) && (Do = null),
        !l.dragoverBubble &&
          !t.rootEl &&
          r !== document &&
          (pe.parentNode[Zt]._isOutsideThisEl(t.target), !oe && Qr(t)),
        !l.dragoverBubble && t.stopPropagation && t.stopPropagation(),
        (m = !0)
      );
    }
    function w() {
      (pn = Lt(pe)),
        (Tr = Lt(pe, l.draggable)),
        on({
          sortable: v,
          name: "change",
          toEl: n,
          newIndex: pn,
          newDraggableIndex: Tr,
          originalEvent: t,
        });
    }
    if (
      (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(),
      (r = Nn(r, l.draggable, n, !0)),
      g("dragOver"),
      $e.eventCanceled)
    )
      return m;
    if (
      pe.contains(t.target) ||
      (r.animated && r.animatingX && r.animatingY) ||
      v._ignoreWhileAnimating === r
    )
      return p(!1);
    if (
      ((Nl = !1),
      u &&
        !l.disabled &&
        (c
          ? f || (i = Pt !== bt)
          : Wt === this ||
            ((this.lastPutMode = Wa.checkPull(this, u, pe, t)) &&
              s.checkPut(this, u, pe, t))))
    ) {
      if (
        ((h = this._getDirection(t, r) === "vertical"),
        (o = xt(pe)),
        g("dragOverValid"),
        $e.eventCanceled)
      )
        return m;
      if (i)
        return (
          (Pt = bt),
          y(),
          this._hideClone(),
          g("revert"),
          $e.eventCanceled ||
            (Xr ? bt.insertBefore(pe, Xr) : bt.appendChild(pe)),
          p(!0)
        );
      var b = af(n, l.draggable);
      if (!b || (n1(t, h, this) && !b.animated)) {
        if (b === pe) return p(!1);
        if (
          (b && n === t.target && (r = b),
          r && (a = xt(r)),
          Xa(bt, n, pe, o, r, a, t, !!r) !== !1)
        )
          return y(), n.appendChild(pe), (Pt = n), w(), p(!0);
      } else if (b && t1(t, h, this)) {
        var S = ri(n, 0, l, !0);
        if (S === pe) return p(!1);
        if (((r = S), (a = xt(r)), Xa(bt, n, pe, o, r, a, t, !1) !== !1))
          return y(), n.insertBefore(pe, S), (Pt = n), w(), p(!0);
      } else if (r.parentNode === n) {
        a = xt(r);
        var E = 0,
          A,
          T = pe.parentNode !== n,
          x = !XC(
            (pe.animated && pe.toRect) || o,
            (r.animated && r.toRect) || a,
            h
          ),
          C = h ? "top" : "left",
          D = wh(r, "top", "top") || wh(pe, "top", "top"),
          I = D ? D.scrollTop : void 0;
        Do !== r && ((A = a[C]), (Yi = !1), (Qa = (!x && l.invertSwap) || T)),
          (E = r1(
            t,
            r,
            a,
            h,
            x ? 1 : l.swapThreshold,
            l.invertedSwapThreshold == null
              ? l.swapThreshold
              : l.invertedSwapThreshold,
            Qa,
            Do === r
          ));
        var $;
        if (E !== 0) {
          var L = Lt(pe);
          do (L -= E), ($ = Pt.children[L]);
          while ($ && (Re($, "display") === "none" || $ === _e));
        }
        if (E === 0 || $ === r) return p(!1);
        (Do = r), (Xi = E);
        var G = r.nextElementSibling,
          j = !1;
        j = E === 1;
        var V = Xa(bt, n, pe, o, r, a, t, j);
        if (V !== !1)
          return (
            (V === 1 || V === -1) && (j = V === 1),
            (Gu = !0),
            setTimeout(e1, 30),
            y(),
            j && !G
              ? n.appendChild(pe)
              : r.parentNode.insertBefore(pe, j ? G : r),
            D && Zm(D, 0, I - D.scrollTop),
            (Pt = pe.parentNode),
            A !== void 0 && !Qa && (dl = Math.abs(A - xt(r)[C])),
            w(),
            p(!0)
          );
      }
      if (n.contains(pe)) return p(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function () {
    Qe(document, "mousemove", this._onTouchMove),
      Qe(document, "touchmove", this._onTouchMove),
      Qe(document, "pointermove", this._onTouchMove),
      Qe(document, "dragover", Qr),
      Qe(document, "mousemove", Qr),
      Qe(document, "touchmove", Qr);
  },
  _offUpEvents: function () {
    var t = this.el.ownerDocument;
    Qe(t, "mouseup", this._onDrop),
      Qe(t, "touchend", this._onDrop),
      Qe(t, "pointerup", this._onDrop),
      Qe(t, "touchcancel", this._onDrop),
      Qe(document, "selectstart", this);
  },
  _onDrop: function (t) {
    var n = this.el,
      r = this.options;
    if (
      ((pn = Lt(pe)),
      (Tr = Lt(pe, r.draggable)),
      ln("drop", this, { evt: t }),
      (Pt = pe && pe.parentNode),
      (pn = Lt(pe)),
      (Tr = Lt(pe, r.draggable)),
      $e.eventCanceled)
    ) {
      this._nulling();
      return;
    }
    (Bo = !1),
      (Qa = !1),
      (Yi = !1),
      clearInterval(this._loopId),
      clearTimeout(this._dragStartTimer),
      Xu(this.cloneId),
      Xu(this._dragStartId),
      this.nativeDraggable &&
        (Qe(document, "drop", this), Qe(n, "dragstart", this._onDragStart)),
      this._offMoveEvents(),
      this._offUpEvents(),
      Wi && Re(document.body, "user-select", ""),
      Re(pe, "transform", ""),
      t &&
        (Li &&
          (t.cancelable && t.preventDefault(),
          !r.dropBubble && t.stopPropagation()),
        _e && _e.parentNode && _e.parentNode.removeChild(_e),
        (bt === Pt || (Wt && Wt.lastPutMode !== "clone")) &&
          Rt &&
          Rt.parentNode &&
          Rt.parentNode.removeChild(Rt),
        pe &&
          (this.nativeDraggable && Qe(pe, "dragend", this),
          tu(pe),
          (pe.style["will-change"] = ""),
          Li &&
            !Bo &&
            Tt(pe, Wt ? Wt.options.ghostClass : this.options.ghostClass, !1),
          Tt(pe, this.options.chosenClass, !1),
          on({
            sortable: this,
            name: "unchoose",
            toEl: Pt,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: t,
          }),
          bt !== Pt
            ? (pn >= 0 &&
                (on({
                  rootEl: Pt,
                  name: "add",
                  toEl: Pt,
                  fromEl: bt,
                  originalEvent: t,
                }),
                on({
                  sortable: this,
                  name: "remove",
                  toEl: Pt,
                  originalEvent: t,
                }),
                on({
                  rootEl: Pt,
                  name: "sort",
                  toEl: Pt,
                  fromEl: bt,
                  originalEvent: t,
                }),
                on({
                  sortable: this,
                  name: "sort",
                  toEl: Pt,
                  originalEvent: t,
                })),
              Wt && Wt.save())
            : pn !== Vo &&
              pn >= 0 &&
              (on({
                sortable: this,
                name: "update",
                toEl: Pt,
                originalEvent: t,
              }),
              on({ sortable: this, name: "sort", toEl: Pt, originalEvent: t })),
          $e.active &&
            ((pn == null || pn === -1) && ((pn = Vo), (Tr = Gi)),
            on({ sortable: this, name: "end", toEl: Pt, originalEvent: t }),
            this.save()))),
      this._nulling();
  },
  _nulling: function () {
    ln("nulling", this),
      (bt =
        pe =
        Pt =
        _e =
        Xr =
        Rt =
        fl =
        Rr =
        Wr =
        Dn =
        Li =
        pn =
        Tr =
        Vo =
        Gi =
        Do =
        Xi =
        Wt =
        Wa =
        $e.dragged =
        $e.ghost =
        $e.clone =
        $e.active =
          null),
      jl.forEach(function (t) {
        t.checked = !0;
      }),
      (jl.length = Js = Zs = 0);
  },
  handleEvent: function (t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        pe && (this._onDragOver(t), ZC(t));
        break;
      case "selectstart":
        t.preventDefault();
        break;
    }
  },
  toArray: function () {
    for (
      var t = [],
        n,
        r = this.el.children,
        o = 0,
        a = r.length,
        i = this.options;
      o < a;
      o++
    )
      (n = r[o]),
        Nn(n, i.draggable, this.el, !1) &&
          t.push(n.getAttribute(i.dataIdAttr) || i1(n));
    return t;
  },
  sort: function (t, n) {
    var r = {},
      o = this.el;
    this.toArray().forEach(function (a, i) {
      var l = o.children[i];
      Nn(l, this.options.draggable, o, !1) && (r[a] = l);
    }, this),
      n && this.captureAnimationState(),
      t.forEach(function (a) {
        r[a] && (o.removeChild(r[a]), o.appendChild(r[a]));
      }),
      n && this.animateAll();
  },
  save: function () {
    var t = this.options.store;
    t && t.set && t.set(this);
  },
  closest: function (t, n) {
    return Nn(t, n || this.options.draggable, this.el, !1);
  },
  option: function (t, n) {
    var r = this.options;
    if (n === void 0) return r[t];
    var o = Ra.modifyOption(this, t, n);
    typeof o != "undefined" ? (r[t] = o) : (r[t] = n), t === "group" && ng(r);
  },
  destroy: function () {
    ln("destroy", this);
    var t = this.el;
    (t[Zt] = null),
      Qe(t, "mousedown", this._onTapStart),
      Qe(t, "touchstart", this._onTapStart),
      Qe(t, "pointerdown", this._onTapStart),
      this.nativeDraggable &&
        (Qe(t, "dragover", this), Qe(t, "dragenter", this)),
      Array.prototype.forEach.call(
        t.querySelectorAll("[draggable]"),
        function (n) {
          n.removeAttribute("draggable");
        }
      ),
      this._onDrop(),
      this._disableDelayedDragEvents(),
      Bl.splice(Bl.indexOf(this.el), 1),
      (this.el = t = null);
  },
  _hideClone: function () {
    if (!Rr) {
      if ((ln("hideClone", this), $e.eventCanceled)) return;
      Re(Rt, "display", "none"),
        this.options.removeCloneOnHide &&
          Rt.parentNode &&
          Rt.parentNode.removeChild(Rt),
        (Rr = !0);
    }
  },
  _showClone: function (t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Rr) {
      if ((ln("showClone", this), $e.eventCanceled)) return;
      pe.parentNode == bt && !this.options.group.revertClone
        ? bt.insertBefore(Rt, pe)
        : Xr
        ? bt.insertBefore(Rt, Xr)
        : bt.appendChild(Rt),
        this.options.group.revertClone && this.animate(pe, Rt),
        Re(Rt, "display", ""),
        (Rr = !1);
    }
  },
};
function ZC(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"),
    e.cancelable && e.preventDefault();
}
function Xa(e, t, n, r, o, a, i, l) {
  var s,
    u = e[Zt],
    c = u.options.onMove,
    f;
  return (
    window.CustomEvent && !pr && !Pa
      ? (s = new CustomEvent("move", { bubbles: !0, cancelable: !0 }))
      : ((s = document.createEvent("Event")), s.initEvent("move", !0, !0)),
    (s.to = t),
    (s.from = e),
    (s.dragged = n),
    (s.draggedRect = r),
    (s.related = o || t),
    (s.relatedRect = a || xt(t)),
    (s.willInsertAfter = l),
    (s.originalEvent = i),
    e.dispatchEvent(s),
    c && (f = c.call(u, s, i)),
    f
  );
}
function tu(e) {
  e.draggable = !1;
}
function e1() {
  Gu = !1;
}
function t1(e, t, n) {
  var r = xt(ri(n.el, 0, n.options, !0)),
    o = 10;
  return t
    ? e.clientX < r.left - o || (e.clientY < r.top && e.clientX < r.right)
    : e.clientY < r.top - o || (e.clientY < r.bottom && e.clientX < r.left);
}
function n1(e, t, n) {
  var r = xt(af(n.el, n.options.draggable)),
    o = 10;
  return t
    ? e.clientX > r.right + o ||
        (e.clientX <= r.right && e.clientY > r.bottom && e.clientX >= r.left)
    : (e.clientX > r.right && e.clientY > r.top) ||
        (e.clientX <= r.right && e.clientY > r.bottom + o);
}
function r1(e, t, n, r, o, a, i, l) {
  var s = r ? e.clientY : e.clientX,
    u = r ? n.height : n.width,
    c = r ? n.top : n.left,
    f = r ? n.bottom : n.right,
    d = !1;
  if (!i) {
    if (l && dl < u * o) {
      if (
        (!Yi &&
          (Xi === 1 ? s > c + (u * a) / 2 : s < f - (u * a) / 2) &&
          (Yi = !0),
        Yi)
      )
        d = !0;
      else if (Xi === 1 ? s < c + dl : s > f - dl) return -Xi;
    } else if (s > c + (u * (1 - o)) / 2 && s < f - (u * (1 - o)) / 2)
      return o1(t);
  }
  return (
    (d = d || i),
    d && (s < c + (u * a) / 2 || s > f - (u * a) / 2)
      ? s > c + u / 2
        ? 1
        : -1
      : 0
  );
}
function o1(e) {
  return Lt(pe) < Lt(e) ? 1 : -1;
}
function i1(e) {
  for (
    var t = e.tagName + e.className + e.src + e.href + e.textContent,
      n = t.length,
      r = 0;
    n--;

  )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function a1(e) {
  jl.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && jl.push(r);
  }
}
function hl(e) {
  return setTimeout(e, 0);
}
function Xu(e) {
  return clearTimeout(e);
}
vs &&
  Ze(document, "touchmove", function (e) {
    ($e.active || Bo) && e.cancelable && e.preventDefault();
  });
$e.utils = {
  on: Ze,
  off: Qe,
  css: Re,
  find: Ym,
  is: function (t, n) {
    return !!Nn(t, n, t, !1);
  },
  extend: _C,
  throttle: Jm,
  closest: Nn,
  toggleClass: Tt,
  clone: lf,
  index: Lt,
  nextTick: hl,
  cancelNextTick: Xu,
  detectDirection: tg,
  getChild: ri,
};
$e.get = function (e) {
  return e[Zt];
};
$e.mount = function () {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]),
    t.forEach(function (r) {
      if (!r.prototype || !r.prototype.constructor)
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat(
          {}.toString.call(r)
        );
      r.utils && ($e.utils = er(er({}, $e.utils), r.utils)), Ra.mount(r);
    });
};
$e.create = function (e, t) {
  return new $e(e, t);
};
$e.version = jC;
var Bt = [],
  ki,
  Yu,
  Ju = !1,
  nu,
  ru,
  Vl,
  Di;
function l1() {
  function e() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0,
    };
    for (var t in this)
      t.charAt(0) === "_" &&
        typeof this[t] == "function" &&
        (this[t] = this[t].bind(this));
  }
  return (
    (e.prototype = {
      dragStarted: function (n) {
        var r = n.originalEvent;
        this.sortable.nativeDraggable
          ? Ze(document, "dragover", this._handleAutoScroll)
          : this.options.supportPointer
          ? Ze(document, "pointermove", this._handleFallbackAutoScroll)
          : r.touches
          ? Ze(document, "touchmove", this._handleFallbackAutoScroll)
          : Ze(document, "mousemove", this._handleFallbackAutoScroll);
      },
      dragOverCompleted: function (n) {
        var r = n.originalEvent;
        !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
      },
      drop: function () {
        this.sortable.nativeDraggable
          ? Qe(document, "dragover", this._handleAutoScroll)
          : (Qe(document, "pointermove", this._handleFallbackAutoScroll),
            Qe(document, "touchmove", this._handleFallbackAutoScroll),
            Qe(document, "mousemove", this._handleFallbackAutoScroll)),
          Ph(),
          vl(),
          UC();
      },
      nulling: function () {
        (Vl = Yu = ki = Ju = Di = nu = ru = null), (Bt.length = 0);
      },
      _handleFallbackAutoScroll: function (n) {
        this._handleAutoScroll(n, !0);
      },
      _handleAutoScroll: function (n, r) {
        var o = this,
          a = (n.touches ? n.touches[0] : n).clientX,
          i = (n.touches ? n.touches[0] : n).clientY,
          l = document.elementFromPoint(a, i);
        if (
          ((Vl = n),
          r || this.options.forceAutoScrollFallback || Pa || pr || Wi)
        ) {
          ou(n, this.options, l, r);
          var s = Ar(l, !0);
          Ju &&
            (!Di || a !== nu || i !== ru) &&
            (Di && Ph(),
            (Di = setInterval(function () {
              var u = Ar(document.elementFromPoint(a, i), !0);
              u !== s && ((s = u), vl()), ou(n, o.options, u, r);
            }, 10)),
            (nu = a),
            (ru = i));
        } else {
          if (!this.options.bubbleScroll || Ar(l, !0) === Jn()) {
            vl();
            return;
          }
          ou(n, this.options, Ar(l, !1), !1);
        }
      },
    }),
    An(e, { pluginName: "scroll", initializeByDefault: !0 })
  );
}
function vl() {
  Bt.forEach(function (e) {
    clearInterval(e.pid);
  }),
    (Bt = []);
}
function Ph() {
  clearInterval(Di);
}
var ou = Jm(function (e, t, n, r) {
    if (!!t.scroll) {
      var o = (e.touches ? e.touches[0] : e).clientX,
        a = (e.touches ? e.touches[0] : e).clientY,
        i = t.scrollSensitivity,
        l = t.scrollSpeed,
        s = Jn(),
        u = !1,
        c;
      Yu !== n &&
        ((Yu = n),
        vl(),
        (ki = t.scroll),
        (c = t.scrollFn),
        ki === !0 && (ki = Ar(n, !0)));
      var f = 0,
        d = ki;
      do {
        var h = d,
          v = xt(h),
          m = v.top,
          g = v.bottom,
          y = v.left,
          p = v.right,
          w = v.width,
          b = v.height,
          S = void 0,
          E = void 0,
          A = h.scrollWidth,
          T = h.scrollHeight,
          x = Re(h),
          C = h.scrollLeft,
          D = h.scrollTop;
        h === s
          ? ((S =
              w < A &&
              (x.overflowX === "auto" ||
                x.overflowX === "scroll" ||
                x.overflowX === "visible")),
            (E =
              b < T &&
              (x.overflowY === "auto" ||
                x.overflowY === "scroll" ||
                x.overflowY === "visible")))
          : ((S =
              w < A && (x.overflowX === "auto" || x.overflowX === "scroll")),
            (E =
              b < T && (x.overflowY === "auto" || x.overflowY === "scroll")));
        var I =
            S &&
            (Math.abs(p - o) <= i && C + w < A) - (Math.abs(y - o) <= i && !!C),
          $ =
            E &&
            (Math.abs(g - a) <= i && D + b < T) - (Math.abs(m - a) <= i && !!D);
        if (!Bt[f]) for (var L = 0; L <= f; L++) Bt[L] || (Bt[L] = {});
        (Bt[f].vx != I || Bt[f].vy != $ || Bt[f].el !== h) &&
          ((Bt[f].el = h),
          (Bt[f].vx = I),
          (Bt[f].vy = $),
          clearInterval(Bt[f].pid),
          (I != 0 || $ != 0) &&
            ((u = !0),
            (Bt[f].pid = setInterval(
              function () {
                r && this.layer === 0 && $e.active._onTouchMove(Vl);
                var G = Bt[this.layer].vy ? Bt[this.layer].vy * l : 0,
                  j = Bt[this.layer].vx ? Bt[this.layer].vx * l : 0;
                (typeof c == "function" &&
                  c.call(
                    $e.dragged.parentNode[Zt],
                    j,
                    G,
                    e,
                    Vl,
                    Bt[this.layer].el
                  ) !== "continue") ||
                  Zm(Bt[this.layer].el, j, G);
              }.bind({ layer: f }),
              24
            )))),
          f++;
      } while (t.bubbleScroll && d !== s && (d = Ar(d, !1)));
      Ju = u;
    }
  }, 30),
  ig = function (t) {
    var n = t.originalEvent,
      r = t.putSortable,
      o = t.dragEl,
      a = t.activeSortable,
      i = t.dispatchSortableEvent,
      l = t.hideGhostForTarget,
      s = t.unhideGhostForTarget;
    if (!!n) {
      var u = r || a;
      l();
      var c =
          n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n,
        f = document.elementFromPoint(c.clientX, c.clientY);
      s(),
        u &&
          !u.el.contains(f) &&
          (i("spill"), this.onSpill({ dragEl: o, putSortable: r }));
    }
  };
function sf() {}
sf.prototype = {
  startIndex: null,
  dragStart: function (t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function (t) {
    var n = t.dragEl,
      r = t.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var o = ri(this.sortable.el, this.startIndex, this.options);
    o ? this.sortable.el.insertBefore(n, o) : this.sortable.el.appendChild(n),
      this.sortable.animateAll(),
      r && r.animateAll();
  },
  drop: ig,
};
An(sf, { pluginName: "revertOnSpill" });
function uf() {}
uf.prototype = {
  onSpill: function (t) {
    var n = t.dragEl,
      r = t.putSortable,
      o = r || this.sortable;
    o.captureAnimationState(),
      n.parentNode && n.parentNode.removeChild(n),
      o.animateAll();
  },
  drop: ig,
};
An(uf, { pluginName: "removeOnSpill" });
var En;
function s1() {
  function e() {
    this.defaults = { swapClass: "sortable-swap-highlight" };
  }
  return (
    (e.prototype = {
      dragStart: function (n) {
        var r = n.dragEl;
        En = r;
      },
      dragOverValid: function (n) {
        var r = n.completed,
          o = n.target,
          a = n.onMove,
          i = n.activeSortable,
          l = n.changed,
          s = n.cancel;
        if (!!i.options.swap) {
          var u = this.sortable.el,
            c = this.options;
          if (o && o !== u) {
            var f = En;
            a(o) !== !1 ? (Tt(o, c.swapClass, !0), (En = o)) : (En = null),
              f && f !== En && Tt(f, c.swapClass, !1);
          }
          l(), r(!0), s();
        }
      },
      drop: function (n) {
        var r = n.activeSortable,
          o = n.putSortable,
          a = n.dragEl,
          i = o || this.sortable,
          l = this.options;
        En && Tt(En, l.swapClass, !1),
          En &&
            (l.swap || (o && o.options.swap)) &&
            a !== En &&
            (i.captureAnimationState(),
            i !== r && r.captureAnimationState(),
            u1(a, En),
            i.animateAll(),
            i !== r && r.animateAll());
      },
      nulling: function () {
        En = null;
      },
    }),
    An(e, {
      pluginName: "swap",
      eventProperties: function () {
        return { swapItem: En };
      },
    })
  );
}
function u1(e, t) {
  var n = e.parentNode,
    r = t.parentNode,
    o,
    a;
  !n ||
    !r ||
    n.isEqualNode(t) ||
    r.isEqualNode(e) ||
    ((o = Lt(e)),
    (a = Lt(t)),
    n.isEqualNode(r) && o < a && a++,
    n.insertBefore(t, n.children[o]),
    r.insertBefore(e, r.children[a]));
}
var Ve = [],
  vn = [],
  wi,
  Mn,
  xi = !1,
  sn = !1,
  Mo = !1,
  mt,
  Ei,
  Ya;
function c1() {
  function e(t) {
    for (var n in this)
      n.charAt(0) === "_" &&
        typeof this[n] == "function" &&
        (this[n] = this[n].bind(this));
    t.options.supportPointer
      ? Ze(document, "pointerup", this._deselectMultiDrag)
      : (Ze(document, "mouseup", this._deselectMultiDrag),
        Ze(document, "touchend", this._deselectMultiDrag)),
      Ze(document, "keydown", this._checkKeyDown),
      Ze(document, "keyup", this._checkKeyUp),
      (this.defaults = {
        selectedClass: "sortable-selected",
        multiDragKey: null,
        setData: function (o, a) {
          var i = "";
          Ve.length && Mn === t
            ? Ve.forEach(function (l, s) {
                i += (s ? ", " : "") + l.textContent;
              })
            : (i = a.textContent),
            o.setData("Text", i);
        },
      });
  }
  return (
    (e.prototype = {
      multiDragKeyDown: !1,
      isMultiDrag: !1,
      delayStartGlobal: function (n) {
        var r = n.dragEl;
        mt = r;
      },
      delayEnded: function () {
        this.isMultiDrag = ~Ve.indexOf(mt);
      },
      setupClone: function (n) {
        var r = n.sortable,
          o = n.cancel;
        if (!!this.isMultiDrag) {
          for (var a = 0; a < Ve.length; a++)
            vn.push(lf(Ve[a])),
              (vn[a].sortableIndex = Ve[a].sortableIndex),
              (vn[a].draggable = !1),
              (vn[a].style["will-change"] = ""),
              Tt(vn[a], this.options.selectedClass, !1),
              Ve[a] === mt && Tt(vn[a], this.options.chosenClass, !1);
          r._hideClone(), o();
        }
      },
      clone: function (n) {
        var r = n.sortable,
          o = n.rootEl,
          a = n.dispatchSortableEvent,
          i = n.cancel;
        !this.isMultiDrag ||
          this.options.removeCloneOnHide ||
          (Ve.length && Mn === r && (Rh(!0, o), a("clone"), i()));
      },
      showClone: function (n) {
        var r = n.cloneNowShown,
          o = n.rootEl,
          a = n.cancel;
        !this.isMultiDrag ||
          (Rh(!1, o),
          vn.forEach(function (i) {
            Re(i, "display", "");
          }),
          r(),
          (Ya = !1),
          a());
      },
      hideClone: function (n) {
        var r = this;
        n.sortable;
        var o = n.cloneNowHidden,
          a = n.cancel;
        !this.isMultiDrag ||
          (vn.forEach(function (i) {
            Re(i, "display", "none"),
              r.options.removeCloneOnHide &&
                i.parentNode &&
                i.parentNode.removeChild(i);
          }),
          o(),
          (Ya = !0),
          a());
      },
      dragStartGlobal: function (n) {
        n.sortable,
          !this.isMultiDrag && Mn && Mn.multiDrag._deselectMultiDrag(),
          Ve.forEach(function (r) {
            r.sortableIndex = Lt(r);
          }),
          (Ve = Ve.sort(function (r, o) {
            return r.sortableIndex - o.sortableIndex;
          })),
          (Mo = !0);
      },
      dragStarted: function (n) {
        var r = this,
          o = n.sortable;
        if (!!this.isMultiDrag) {
          if (
            this.options.sort &&
            (o.captureAnimationState(), this.options.animation)
          ) {
            Ve.forEach(function (i) {
              i !== mt && Re(i, "position", "absolute");
            });
            var a = xt(mt, !1, !0, !0);
            Ve.forEach(function (i) {
              i !== mt && Eh(i, a);
            }),
              (sn = !0),
              (xi = !0);
          }
          o.animateAll(function () {
            (sn = !1),
              (xi = !1),
              r.options.animation &&
                Ve.forEach(function (i) {
                  Xs(i);
                }),
              r.options.sort && Ja();
          });
        }
      },
      dragOver: function (n) {
        var r = n.target,
          o = n.completed,
          a = n.cancel;
        sn && ~Ve.indexOf(r) && (o(!1), a());
      },
      revert: function (n) {
        var r = n.fromSortable,
          o = n.rootEl,
          a = n.sortable,
          i = n.dragRect;
        Ve.length > 1 &&
          (Ve.forEach(function (l) {
            a.addAnimationState({ target: l, rect: sn ? xt(l) : i }),
              Xs(l),
              (l.fromRect = i),
              r.removeAnimationState(l);
          }),
          (sn = !1),
          f1(!this.options.removeCloneOnHide, o));
      },
      dragOverCompleted: function (n) {
        var r = n.sortable,
          o = n.isOwner,
          a = n.insertion,
          i = n.activeSortable,
          l = n.parentEl,
          s = n.putSortable,
          u = this.options;
        if (a) {
          if (
            (o && i._hideClone(),
            (xi = !1),
            u.animation &&
              Ve.length > 1 &&
              (sn || (!o && !i.options.sort && !s)))
          ) {
            var c = xt(mt, !1, !0, !0);
            Ve.forEach(function (d) {
              d !== mt && (Eh(d, c), l.appendChild(d));
            }),
              (sn = !0);
          }
          if (!o)
            if ((sn || Ja(), Ve.length > 1)) {
              var f = Ya;
              i._showClone(r),
                i.options.animation &&
                  !Ya &&
                  f &&
                  vn.forEach(function (d) {
                    i.addAnimationState({ target: d, rect: Ei }),
                      (d.fromRect = Ei),
                      (d.thisAnimationDuration = null);
                  });
            } else i._showClone(r);
        }
      },
      dragOverAnimationCapture: function (n) {
        var r = n.dragRect,
          o = n.isOwner,
          a = n.activeSortable;
        if (
          (Ve.forEach(function (l) {
            l.thisAnimationDuration = null;
          }),
          a.options.animation && !o && a.multiDrag.isMultiDrag)
        ) {
          Ei = An({}, r);
          var i = ho(mt, !0);
          (Ei.top -= i.f), (Ei.left -= i.e);
        }
      },
      dragOverAnimationComplete: function () {
        sn && ((sn = !1), Ja());
      },
      drop: function (n) {
        var r = n.originalEvent,
          o = n.rootEl,
          a = n.parentEl,
          i = n.sortable,
          l = n.dispatchSortableEvent,
          s = n.oldIndex,
          u = n.putSortable,
          c = u || this.sortable;
        if (!!r) {
          var f = this.options,
            d = a.children;
          if (!Mo)
            if (
              (f.multiDragKey &&
                !this.multiDragKeyDown &&
                this._deselectMultiDrag(),
              Tt(mt, f.selectedClass, !~Ve.indexOf(mt)),
              ~Ve.indexOf(mt))
            )
              Ve.splice(Ve.indexOf(mt), 1),
                (wi = null),
                Ii({
                  sortable: i,
                  rootEl: o,
                  name: "deselect",
                  targetEl: mt,
                  originalEvt: r,
                });
            else {
              if (
                (Ve.push(mt),
                Ii({
                  sortable: i,
                  rootEl: o,
                  name: "select",
                  targetEl: mt,
                  originalEvt: r,
                }),
                r.shiftKey && wi && i.el.contains(wi))
              ) {
                var h = Lt(wi),
                  v = Lt(mt);
                if (~h && ~v && h !== v) {
                  var m, g;
                  for (
                    v > h ? ((g = h), (m = v)) : ((g = v), (m = h + 1));
                    g < m;
                    g++
                  )
                    ~Ve.indexOf(d[g]) ||
                      (Tt(d[g], f.selectedClass, !0),
                      Ve.push(d[g]),
                      Ii({
                        sortable: i,
                        rootEl: o,
                        name: "select",
                        targetEl: d[g],
                        originalEvt: r,
                      }));
                }
              } else wi = mt;
              Mn = c;
            }
          if (Mo && this.isMultiDrag) {
            if (((sn = !1), (a[Zt].options.sort || a !== o) && Ve.length > 1)) {
              var y = xt(mt),
                p = Lt(mt, ":not(." + this.options.selectedClass + ")");
              if (
                (!xi && f.animation && (mt.thisAnimationDuration = null),
                c.captureAnimationState(),
                !xi &&
                  (f.animation &&
                    ((mt.fromRect = y),
                    Ve.forEach(function (b) {
                      if (((b.thisAnimationDuration = null), b !== mt)) {
                        var S = sn ? xt(b) : y;
                        (b.fromRect = S),
                          c.addAnimationState({ target: b, rect: S });
                      }
                    })),
                  Ja(),
                  Ve.forEach(function (b) {
                    d[p] ? a.insertBefore(b, d[p]) : a.appendChild(b), p++;
                  }),
                  s === Lt(mt)))
              ) {
                var w = !1;
                Ve.forEach(function (b) {
                  if (b.sortableIndex !== Lt(b)) {
                    w = !0;
                    return;
                  }
                }),
                  w && l("update");
              }
              Ve.forEach(function (b) {
                Xs(b);
              }),
                c.animateAll();
            }
            Mn = c;
          }
          (o === a || (u && u.lastPutMode !== "clone")) &&
            vn.forEach(function (b) {
              b.parentNode && b.parentNode.removeChild(b);
            });
        }
      },
      nullingGlobal: function () {
        (this.isMultiDrag = Mo = !1), (vn.length = 0);
      },
      destroyGlobal: function () {
        this._deselectMultiDrag(),
          Qe(document, "pointerup", this._deselectMultiDrag),
          Qe(document, "mouseup", this._deselectMultiDrag),
          Qe(document, "touchend", this._deselectMultiDrag),
          Qe(document, "keydown", this._checkKeyDown),
          Qe(document, "keyup", this._checkKeyUp);
      },
      _deselectMultiDrag: function (n) {
        if (
          !(typeof Mo != "undefined" && Mo) &&
          Mn === this.sortable &&
          !(n && Nn(n.target, this.options.draggable, this.sortable.el, !1)) &&
          !(n && n.button !== 0)
        )
          for (; Ve.length; ) {
            var r = Ve[0];
            Tt(r, this.options.selectedClass, !1),
              Ve.shift(),
              Ii({
                sortable: this.sortable,
                rootEl: this.sortable.el,
                name: "deselect",
                targetEl: r,
                originalEvt: n,
              });
          }
      },
      _checkKeyDown: function (n) {
        n.key === this.options.multiDragKey && (this.multiDragKeyDown = !0);
      },
      _checkKeyUp: function (n) {
        n.key === this.options.multiDragKey && (this.multiDragKeyDown = !1);
      },
    }),
    An(e, {
      pluginName: "multiDrag",
      utils: {
        select: function (n) {
          var r = n.parentNode[Zt];
          !r ||
            !r.options.multiDrag ||
            ~Ve.indexOf(n) ||
            (Mn && Mn !== r && (Mn.multiDrag._deselectMultiDrag(), (Mn = r)),
            Tt(n, r.options.selectedClass, !0),
            Ve.push(n));
        },
        deselect: function (n) {
          var r = n.parentNode[Zt],
            o = Ve.indexOf(n);
          !r ||
            !r.options.multiDrag ||
            !~o ||
            (Tt(n, r.options.selectedClass, !1), Ve.splice(o, 1));
        },
      },
      eventProperties: function () {
        var n = this,
          r = [],
          o = [];
        return (
          Ve.forEach(function (a) {
            r.push({ multiDragElement: a, index: a.sortableIndex });
            var i;
            sn && a !== mt
              ? (i = -1)
              : sn
              ? (i = Lt(a, ":not(." + n.options.selectedClass + ")"))
              : (i = Lt(a)),
              o.push({ multiDragElement: a, index: i });
          }),
          {
            items: MC(Ve),
            clones: [].concat(vn),
            oldIndicies: r,
            newIndicies: o,
          }
        );
      },
      optionListeners: {
        multiDragKey: function (n) {
          return (
            (n = n.toLowerCase()),
            n === "ctrl"
              ? (n = "Control")
              : n.length > 1 && (n = n.charAt(0).toUpperCase() + n.substr(1)),
            n
          );
        },
      },
    })
  );
}
function f1(e, t) {
  Ve.forEach(function (n, r) {
    var o = t.children[n.sortableIndex + (e ? Number(r) : 0)];
    o ? t.insertBefore(n, o) : t.appendChild(n);
  });
}
function Rh(e, t) {
  vn.forEach(function (n, r) {
    var o = t.children[n.sortableIndex + (e ? Number(r) : 0)];
    o ? t.insertBefore(n, o) : t.appendChild(n);
  });
}
function Ja() {
  Ve.forEach(function (e) {
    e !== mt && e.parentNode && e.parentNode.removeChild(e);
  });
}
$e.mount(new l1());
$e.mount(uf, sf);
var d1 = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: $e, MultiDrag: c1, Sortable: $e, Swap: s1 },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  h1 = Wm(d1);
(function (e, t) {
  (function (r, o) {
    e.exports = o(IC, h1);
  })(typeof self != "undefined" ? self : RC, function (n, r) {
    return (function (o) {
      var a = {};
      function i(l) {
        if (a[l]) return a[l].exports;
        var s = (a[l] = { i: l, l: !1, exports: {} });
        return o[l].call(s.exports, s, s.exports, i), (s.l = !0), s.exports;
      }
      return (
        (i.m = o),
        (i.c = a),
        (i.d = function (l, s, u) {
          i.o(l, s) || Object.defineProperty(l, s, { enumerable: !0, get: u });
        }),
        (i.r = function (l) {
          typeof Symbol != "undefined" &&
            Symbol.toStringTag &&
            Object.defineProperty(l, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(l, "__esModule", { value: !0 });
        }),
        (i.t = function (l, s) {
          if (
            (s & 1 && (l = i(l)),
            s & 8 || (s & 4 && typeof l == "object" && l && l.__esModule))
          )
            return l;
          var u = Object.create(null);
          if (
            (i.r(u),
            Object.defineProperty(u, "default", { enumerable: !0, value: l }),
            s & 2 && typeof l != "string")
          )
            for (var c in l)
              i.d(
                u,
                c,
                function (f) {
                  return l[f];
                }.bind(null, c)
              );
          return u;
        }),
        (i.n = function (l) {
          var s =
            l && l.__esModule
              ? function () {
                  return l.default;
                }
              : function () {
                  return l;
                };
          return i.d(s, "a", s), s;
        }),
        (i.o = function (l, s) {
          return Object.prototype.hasOwnProperty.call(l, s);
        }),
        (i.p = ""),
        i((i.s = "fb15"))
      );
    })({
      "00ee": function (o, a, i) {
        var l = i("b622"),
          s = l("toStringTag"),
          u = {};
        (u[s] = "z"), (o.exports = String(u) === "[object z]");
      },
      "0366": function (o, a, i) {
        var l = i("1c0b");
        o.exports = function (s, u, c) {
          if ((l(s), u === void 0)) return s;
          switch (c) {
            case 0:
              return function () {
                return s.call(u);
              };
            case 1:
              return function (f) {
                return s.call(u, f);
              };
            case 2:
              return function (f, d) {
                return s.call(u, f, d);
              };
            case 3:
              return function (f, d, h) {
                return s.call(u, f, d, h);
              };
          }
          return function () {
            return s.apply(u, arguments);
          };
        };
      },
      "057f": function (o, a, i) {
        var l = i("fc6a"),
          s = i("241c").f,
          u = {}.toString,
          c =
            typeof window == "object" && window && Object.getOwnPropertyNames
              ? Object.getOwnPropertyNames(window)
              : [],
          f = function (d) {
            try {
              return s(d);
            } catch {
              return c.slice();
            }
          };
        o.exports.f = function (h) {
          return c && u.call(h) == "[object Window]" ? f(h) : s(l(h));
        };
      },
      "06cf": function (o, a, i) {
        var l = i("83ab"),
          s = i("d1e7"),
          u = i("5c6c"),
          c = i("fc6a"),
          f = i("c04e"),
          d = i("5135"),
          h = i("0cfb"),
          v = Object.getOwnPropertyDescriptor;
        a.f = l
          ? v
          : function (g, y) {
              if (((g = c(g)), (y = f(y, !0)), h))
                try {
                  return v(g, y);
                } catch {}
              if (d(g, y)) return u(!s.f.call(g, y), g[y]);
            };
      },
      "0cfb": function (o, a, i) {
        var l = i("83ab"),
          s = i("d039"),
          u = i("cc12");
        o.exports =
          !l &&
          !s(function () {
            return (
              Object.defineProperty(u("div"), "a", {
                get: function () {
                  return 7;
                },
              }).a != 7
            );
          });
      },
      "13d5": function (o, a, i) {
        var l = i("23e7"),
          s = i("d58f").left,
          u = i("a640"),
          c = i("ae40"),
          f = u("reduce"),
          d = c("reduce", { 1: 0 });
        l(
          { target: "Array", proto: !0, forced: !f || !d },
          {
            reduce: function (v) {
              return s(
                this,
                v,
                arguments.length,
                arguments.length > 1 ? arguments[1] : void 0
              );
            },
          }
        );
      },
      "14c3": function (o, a, i) {
        var l = i("c6b6"),
          s = i("9263");
        o.exports = function (u, c) {
          var f = u.exec;
          if (typeof f == "function") {
            var d = f.call(u, c);
            if (typeof d != "object")
              throw TypeError(
                "RegExp exec method returned something other than an Object or null"
              );
            return d;
          }
          if (l(u) !== "RegExp")
            throw TypeError("RegExp#exec called on incompatible receiver");
          return s.call(u, c);
        };
      },
      "159b": function (o, a, i) {
        var l = i("da84"),
          s = i("fdbc"),
          u = i("17c2"),
          c = i("9112");
        for (var f in s) {
          var d = l[f],
            h = d && d.prototype;
          if (h && h.forEach !== u)
            try {
              c(h, "forEach", u);
            } catch {
              h.forEach = u;
            }
        }
      },
      "17c2": function (o, a, i) {
        var l = i("b727").forEach,
          s = i("a640"),
          u = i("ae40"),
          c = s("forEach"),
          f = u("forEach");
        o.exports =
          !c || !f
            ? function (h) {
                return l(this, h, arguments.length > 1 ? arguments[1] : void 0);
              }
            : [].forEach;
      },
      "1be4": function (o, a, i) {
        var l = i("d066");
        o.exports = l("document", "documentElement");
      },
      "1c0b": function (o, a) {
        o.exports = function (i) {
          if (typeof i != "function")
            throw TypeError(String(i) + " is not a function");
          return i;
        };
      },
      "1c7e": function (o, a, i) {
        var l = i("b622"),
          s = l("iterator"),
          u = !1;
        try {
          var c = 0,
            f = {
              next: function () {
                return { done: !!c++ };
              },
              return: function () {
                u = !0;
              },
            };
          (f[s] = function () {
            return this;
          }),
            Array.from(f, function () {
              throw 2;
            });
        } catch {}
        o.exports = function (d, h) {
          if (!h && !u) return !1;
          var v = !1;
          try {
            var m = {};
            (m[s] = function () {
              return {
                next: function () {
                  return { done: (v = !0) };
                },
              };
            }),
              d(m);
          } catch {}
          return v;
        };
      },
      "1d80": function (o, a) {
        o.exports = function (i) {
          if (i == null) throw TypeError("Can't call method on " + i);
          return i;
        };
      },
      "1dde": function (o, a, i) {
        var l = i("d039"),
          s = i("b622"),
          u = i("2d00"),
          c = s("species");
        o.exports = function (f) {
          return (
            u >= 51 ||
            !l(function () {
              var d = [],
                h = (d.constructor = {});
              return (
                (h[c] = function () {
                  return { foo: 1 };
                }),
                d[f](Boolean).foo !== 1
              );
            })
          );
        };
      },
      "23cb": function (o, a, i) {
        var l = i("a691"),
          s = Math.max,
          u = Math.min;
        o.exports = function (c, f) {
          var d = l(c);
          return d < 0 ? s(d + f, 0) : u(d, f);
        };
      },
      "23e7": function (o, a, i) {
        var l = i("da84"),
          s = i("06cf").f,
          u = i("9112"),
          c = i("6eeb"),
          f = i("ce4e"),
          d = i("e893"),
          h = i("94ca");
        o.exports = function (v, m) {
          var g = v.target,
            y = v.global,
            p = v.stat,
            w,
            b,
            S,
            E,
            A,
            T;
          if (
            (y
              ? (b = l)
              : p
              ? (b = l[g] || f(g, {}))
              : (b = (l[g] || {}).prototype),
            b)
          )
            for (S in m) {
              if (
                ((A = m[S]),
                v.noTargetGet
                  ? ((T = s(b, S)), (E = T && T.value))
                  : (E = b[S]),
                (w = h(y ? S : g + (p ? "." : "#") + S, v.forced)),
                !w && E !== void 0)
              ) {
                if (typeof A == typeof E) continue;
                d(A, E);
              }
              (v.sham || (E && E.sham)) && u(A, "sham", !0), c(b, S, A, v);
            }
        };
      },
      "241c": function (o, a, i) {
        var l = i("ca84"),
          s = i("7839"),
          u = s.concat("length", "prototype");
        a.f =
          Object.getOwnPropertyNames ||
          function (f) {
            return l(f, u);
          };
      },
      "25f0": function (o, a, i) {
        var l = i("6eeb"),
          s = i("825a"),
          u = i("d039"),
          c = i("ad6d"),
          f = "toString",
          d = RegExp.prototype,
          h = d[f],
          v = u(function () {
            return h.call({ source: "a", flags: "b" }) != "/a/b";
          }),
          m = h.name != f;
        (v || m) &&
          l(
            RegExp.prototype,
            f,
            function () {
              var y = s(this),
                p = String(y.source),
                w = y.flags,
                b = String(
                  w === void 0 && y instanceof RegExp && !("flags" in d)
                    ? c.call(y)
                    : w
                );
              return "/" + p + "/" + b;
            },
            { unsafe: !0 }
          );
      },
      "2ca0": function (o, a, i) {
        var l = i("23e7"),
          s = i("06cf").f,
          u = i("50c4"),
          c = i("5a34"),
          f = i("1d80"),
          d = i("ab13"),
          h = i("c430"),
          v = "".startsWith,
          m = Math.min,
          g = d("startsWith"),
          y =
            !h &&
            !g &&
            !!(function () {
              var p = s(String.prototype, "startsWith");
              return p && !p.writable;
            })();
        l(
          { target: "String", proto: !0, forced: !y && !g },
          {
            startsWith: function (w) {
              var b = String(f(this));
              c(w);
              var S = u(
                  m(arguments.length > 1 ? arguments[1] : void 0, b.length)
                ),
                E = String(w);
              return v ? v.call(b, E, S) : b.slice(S, S + E.length) === E;
            },
          }
        );
      },
      "2d00": function (o, a, i) {
        var l = i("da84"),
          s = i("342f"),
          u = l.process,
          c = u && u.versions,
          f = c && c.v8,
          d,
          h;
        f
          ? ((d = f.split(".")), (h = d[0] + d[1]))
          : s &&
            ((d = s.match(/Edge\/(\d+)/)),
            (!d || d[1] >= 74) &&
              ((d = s.match(/Chrome\/(\d+)/)), d && (h = d[1]))),
          (o.exports = h && +h);
      },
      "342f": function (o, a, i) {
        var l = i("d066");
        o.exports = l("navigator", "userAgent") || "";
      },
      "35a1": function (o, a, i) {
        var l = i("f5df"),
          s = i("3f8c"),
          u = i("b622"),
          c = u("iterator");
        o.exports = function (f) {
          if (f != null) return f[c] || f["@@iterator"] || s[l(f)];
        };
      },
      "37e8": function (o, a, i) {
        var l = i("83ab"),
          s = i("9bf2"),
          u = i("825a"),
          c = i("df75");
        o.exports = l
          ? Object.defineProperties
          : function (d, h) {
              u(d);
              for (var v = c(h), m = v.length, g = 0, y; m > g; )
                s.f(d, (y = v[g++]), h[y]);
              return d;
            };
      },
      "3bbe": function (o, a, i) {
        var l = i("861d");
        o.exports = function (s) {
          if (!l(s) && s !== null)
            throw TypeError("Can't set " + String(s) + " as a prototype");
          return s;
        };
      },
      "3ca3": function (o, a, i) {
        var l = i("6547").charAt,
          s = i("69f3"),
          u = i("7dd0"),
          c = "String Iterator",
          f = s.set,
          d = s.getterFor(c);
        u(
          String,
          "String",
          function (h) {
            f(this, { type: c, string: String(h), index: 0 });
          },
          function () {
            var v = d(this),
              m = v.string,
              g = v.index,
              y;
            return g >= m.length
              ? { value: void 0, done: !0 }
              : ((y = l(m, g)), (v.index += y.length), { value: y, done: !1 });
          }
        );
      },
      "3f8c": function (o, a) {
        o.exports = {};
      },
      4160: function (o, a, i) {
        var l = i("23e7"),
          s = i("17c2");
        l(
          { target: "Array", proto: !0, forced: [].forEach != s },
          { forEach: s }
        );
      },
      "428f": function (o, a, i) {
        var l = i("da84");
        o.exports = l;
      },
      "44ad": function (o, a, i) {
        var l = i("d039"),
          s = i("c6b6"),
          u = "".split;
        o.exports = l(function () {
          return !Object("z").propertyIsEnumerable(0);
        })
          ? function (c) {
              return s(c) == "String" ? u.call(c, "") : Object(c);
            }
          : Object;
      },
      "44d2": function (o, a, i) {
        var l = i("b622"),
          s = i("7c73"),
          u = i("9bf2"),
          c = l("unscopables"),
          f = Array.prototype;
        f[c] == null && u.f(f, c, { configurable: !0, value: s(null) }),
          (o.exports = function (d) {
            f[c][d] = !0;
          });
      },
      "44e7": function (o, a, i) {
        var l = i("861d"),
          s = i("c6b6"),
          u = i("b622"),
          c = u("match");
        o.exports = function (f) {
          var d;
          return l(f) && ((d = f[c]) !== void 0 ? !!d : s(f) == "RegExp");
        };
      },
      4930: function (o, a, i) {
        var l = i("d039");
        o.exports =
          !!Object.getOwnPropertySymbols &&
          !l(function () {
            return !String(Symbol());
          });
      },
      "4d64": function (o, a, i) {
        var l = i("fc6a"),
          s = i("50c4"),
          u = i("23cb"),
          c = function (f) {
            return function (d, h, v) {
              var m = l(d),
                g = s(m.length),
                y = u(v, g),
                p;
              if (f && h != h) {
                for (; g > y; ) if (((p = m[y++]), p != p)) return !0;
              } else
                for (; g > y; y++)
                  if ((f || y in m) && m[y] === h) return f || y || 0;
              return !f && -1;
            };
          };
        o.exports = { includes: c(!0), indexOf: c(!1) };
      },
      "4de4": function (o, a, i) {
        var l = i("23e7"),
          s = i("b727").filter,
          u = i("1dde"),
          c = i("ae40"),
          f = u("filter"),
          d = c("filter");
        l(
          { target: "Array", proto: !0, forced: !f || !d },
          {
            filter: function (v) {
              return s(this, v, arguments.length > 1 ? arguments[1] : void 0);
            },
          }
        );
      },
      "4df4": function (o, a, i) {
        var l = i("0366"),
          s = i("7b0b"),
          u = i("9bdd"),
          c = i("e95a"),
          f = i("50c4"),
          d = i("8418"),
          h = i("35a1");
        o.exports = function (m) {
          var g = s(m),
            y = typeof this == "function" ? this : Array,
            p = arguments.length,
            w = p > 1 ? arguments[1] : void 0,
            b = w !== void 0,
            S = h(g),
            E = 0,
            A,
            T,
            x,
            C,
            D,
            I;
          if (
            (b && (w = l(w, p > 2 ? arguments[2] : void 0, 2)),
            S != null && !(y == Array && c(S)))
          )
            for (
              C = S.call(g), D = C.next, T = new y();
              !(x = D.call(C)).done;
              E++
            )
              (I = b ? u(C, w, [x.value, E], !0) : x.value), d(T, E, I);
          else
            for (A = f(g.length), T = new y(A); A > E; E++)
              (I = b ? w(g[E], E) : g[E]), d(T, E, I);
          return (T.length = E), T;
        };
      },
      "4fad": function (o, a, i) {
        var l = i("23e7"),
          s = i("6f53").entries;
        l(
          { target: "Object", stat: !0 },
          {
            entries: function (c) {
              return s(c);
            },
          }
        );
      },
      "50c4": function (o, a, i) {
        var l = i("a691"),
          s = Math.min;
        o.exports = function (u) {
          return u > 0 ? s(l(u), 9007199254740991) : 0;
        };
      },
      5135: function (o, a) {
        var i = {}.hasOwnProperty;
        o.exports = function (l, s) {
          return i.call(l, s);
        };
      },
      5319: function (o, a, i) {
        var l = i("d784"),
          s = i("825a"),
          u = i("7b0b"),
          c = i("50c4"),
          f = i("a691"),
          d = i("1d80"),
          h = i("8aa5"),
          v = i("14c3"),
          m = Math.max,
          g = Math.min,
          y = Math.floor,
          p = /\$([$&'`]|\d\d?|<[^>]*>)/g,
          w = /\$([$&'`]|\d\d?)/g,
          b = function (S) {
            return S === void 0 ? S : String(S);
          };
        l("replace", 2, function (S, E, A, T) {
          var x = T.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
            C = T.REPLACE_KEEPS_$0,
            D = x ? "$" : "$0";
          return [
            function (L, G) {
              var j = d(this),
                V = L == null ? void 0 : L[S];
              return V !== void 0 ? V.call(L, j, G) : E.call(String(j), L, G);
            },
            function ($, L) {
              if ((!x && C) || (typeof L == "string" && L.indexOf(D) === -1)) {
                var G = A(E, $, this, L);
                if (G.done) return G.value;
              }
              var j = s($),
                V = String(this),
                oe = typeof L == "function";
              oe || (L = String(L));
              var xe = j.global;
              if (xe) {
                var J = j.unicode;
                j.lastIndex = 0;
              }
              for (var X = []; ; ) {
                var H = v(j, V);
                if (H === null || (X.push(H), !xe)) break;
                var se = String(H[0]);
                se === "" && (j.lastIndex = h(V, c(j.lastIndex), J));
              }
              for (var Ee = "", de = 0, ne = 0; ne < X.length; ne++) {
                H = X[ne];
                for (
                  var N = String(H[0]),
                    ae = m(g(f(H.index), V.length), 0),
                    U = [],
                    he = 1;
                  he < H.length;
                  he++
                )
                  U.push(b(H[he]));
                var Le = H.groups;
                if (oe) {
                  var R = [N].concat(U, ae, V);
                  Le !== void 0 && R.push(Le);
                  var P = String(L.apply(void 0, R));
                } else P = I(N, V, ae, U, Le, L);
                ae >= de && ((Ee += V.slice(de, ae) + P), (de = ae + N.length));
              }
              return Ee + V.slice(de);
            },
          ];
          function I($, L, G, j, V, oe) {
            var xe = G + $.length,
              J = j.length,
              X = w;
            return (
              V !== void 0 && ((V = u(V)), (X = p)),
              E.call(oe, X, function (H, se) {
                var Ee;
                switch (se.charAt(0)) {
                  case "$":
                    return "$";
                  case "&":
                    return $;
                  case "`":
                    return L.slice(0, G);
                  case "'":
                    return L.slice(xe);
                  case "<":
                    Ee = V[se.slice(1, -1)];
                    break;
                  default:
                    var de = +se;
                    if (de === 0) return H;
                    if (de > J) {
                      var ne = y(de / 10);
                      return ne === 0
                        ? H
                        : ne <= J
                        ? j[ne - 1] === void 0
                          ? se.charAt(1)
                          : j[ne - 1] + se.charAt(1)
                        : H;
                    }
                    Ee = j[de - 1];
                }
                return Ee === void 0 ? "" : Ee;
              })
            );
          }
        });
      },
      5692: function (o, a, i) {
        var l = i("c430"),
          s = i("c6cd");
        (o.exports = function (u, c) {
          return s[u] || (s[u] = c !== void 0 ? c : {});
        })("versions", []).push({
          version: "3.6.5",
          mode: l ? "pure" : "global",
          copyright: "\xA9 2020 Denis Pushkarev (zloirock.ru)",
        });
      },
      "56ef": function (o, a, i) {
        var l = i("d066"),
          s = i("241c"),
          u = i("7418"),
          c = i("825a");
        o.exports =
          l("Reflect", "ownKeys") ||
          function (d) {
            var h = s.f(c(d)),
              v = u.f;
            return v ? h.concat(v(d)) : h;
          };
      },
      "5a34": function (o, a, i) {
        var l = i("44e7");
        o.exports = function (s) {
          if (l(s))
            throw TypeError("The method doesn't accept regular expressions");
          return s;
        };
      },
      "5c6c": function (o, a) {
        o.exports = function (i, l) {
          return {
            enumerable: !(i & 1),
            configurable: !(i & 2),
            writable: !(i & 4),
            value: l,
          };
        };
      },
      "5db7": function (o, a, i) {
        var l = i("23e7"),
          s = i("a2bf"),
          u = i("7b0b"),
          c = i("50c4"),
          f = i("1c0b"),
          d = i("65f0");
        l(
          { target: "Array", proto: !0 },
          {
            flatMap: function (v) {
              var m = u(this),
                g = c(m.length),
                y;
              return (
                f(v),
                (y = d(m, 0)),
                (y.length = s(
                  y,
                  m,
                  m,
                  g,
                  0,
                  1,
                  v,
                  arguments.length > 1 ? arguments[1] : void 0
                )),
                y
              );
            },
          }
        );
      },
      6547: function (o, a, i) {
        var l = i("a691"),
          s = i("1d80"),
          u = function (c) {
            return function (f, d) {
              var h = String(s(f)),
                v = l(d),
                m = h.length,
                g,
                y;
              return v < 0 || v >= m
                ? c
                  ? ""
                  : void 0
                : ((g = h.charCodeAt(v)),
                  g < 55296 ||
                  g > 56319 ||
                  v + 1 === m ||
                  (y = h.charCodeAt(v + 1)) < 56320 ||
                  y > 57343
                    ? c
                      ? h.charAt(v)
                      : g
                    : c
                    ? h.slice(v, v + 2)
                    : ((g - 55296) << 10) + (y - 56320) + 65536);
            };
          };
        o.exports = { codeAt: u(!1), charAt: u(!0) };
      },
      "65f0": function (o, a, i) {
        var l = i("861d"),
          s = i("e8b5"),
          u = i("b622"),
          c = u("species");
        o.exports = function (f, d) {
          var h;
          return (
            s(f) &&
              ((h = f.constructor),
              typeof h == "function" && (h === Array || s(h.prototype))
                ? (h = void 0)
                : l(h) && ((h = h[c]), h === null && (h = void 0))),
            new (h === void 0 ? Array : h)(d === 0 ? 0 : d)
          );
        };
      },
      "69f3": function (o, a, i) {
        var l = i("7f9a"),
          s = i("da84"),
          u = i("861d"),
          c = i("9112"),
          f = i("5135"),
          d = i("f772"),
          h = i("d012"),
          v = s.WeakMap,
          m,
          g,
          y,
          p = function (x) {
            return y(x) ? g(x) : m(x, {});
          },
          w = function (x) {
            return function (C) {
              var D;
              if (!u(C) || (D = g(C)).type !== x)
                throw TypeError("Incompatible receiver, " + x + " required");
              return D;
            };
          };
        if (l) {
          var b = new v(),
            S = b.get,
            E = b.has,
            A = b.set;
          (m = function (x, C) {
            return A.call(b, x, C), C;
          }),
            (g = function (x) {
              return S.call(b, x) || {};
            }),
            (y = function (x) {
              return E.call(b, x);
            });
        } else {
          var T = d("state");
          (h[T] = !0),
            (m = function (x, C) {
              return c(x, T, C), C;
            }),
            (g = function (x) {
              return f(x, T) ? x[T] : {};
            }),
            (y = function (x) {
              return f(x, T);
            });
        }
        o.exports = { set: m, get: g, has: y, enforce: p, getterFor: w };
      },
      "6eeb": function (o, a, i) {
        var l = i("da84"),
          s = i("9112"),
          u = i("5135"),
          c = i("ce4e"),
          f = i("8925"),
          d = i("69f3"),
          h = d.get,
          v = d.enforce,
          m = String(String).split("String");
        (o.exports = function (g, y, p, w) {
          var b = w ? !!w.unsafe : !1,
            S = w ? !!w.enumerable : !1,
            E = w ? !!w.noTargetGet : !1;
          if (
            (typeof p == "function" &&
              (typeof y == "string" && !u(p, "name") && s(p, "name", y),
              (v(p).source = m.join(typeof y == "string" ? y : ""))),
            g === l)
          ) {
            S ? (g[y] = p) : c(y, p);
            return;
          } else b ? !E && g[y] && (S = !0) : delete g[y];
          S ? (g[y] = p) : s(g, y, p);
        })(Function.prototype, "toString", function () {
          return (typeof this == "function" && h(this).source) || f(this);
        });
      },
      "6f53": function (o, a, i) {
        var l = i("83ab"),
          s = i("df75"),
          u = i("fc6a"),
          c = i("d1e7").f,
          f = function (d) {
            return function (h) {
              for (
                var v = u(h), m = s(v), g = m.length, y = 0, p = [], w;
                g > y;

              )
                (w = m[y++]),
                  (!l || c.call(v, w)) && p.push(d ? [w, v[w]] : v[w]);
              return p;
            };
          };
        o.exports = { entries: f(!0), values: f(!1) };
      },
      "73d9": function (o, a, i) {
        var l = i("44d2");
        l("flatMap");
      },
      7418: function (o, a) {
        a.f = Object.getOwnPropertySymbols;
      },
      "746f": function (o, a, i) {
        var l = i("428f"),
          s = i("5135"),
          u = i("e538"),
          c = i("9bf2").f;
        o.exports = function (f) {
          var d = l.Symbol || (l.Symbol = {});
          s(d, f) || c(d, f, { value: u.f(f) });
        };
      },
      7839: function (o, a) {
        o.exports = [
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf",
        ];
      },
      "7b0b": function (o, a, i) {
        var l = i("1d80");
        o.exports = function (s) {
          return Object(l(s));
        };
      },
      "7c73": function (o, a, i) {
        var l = i("825a"),
          s = i("37e8"),
          u = i("7839"),
          c = i("d012"),
          f = i("1be4"),
          d = i("cc12"),
          h = i("f772"),
          v = ">",
          m = "<",
          g = "prototype",
          y = "script",
          p = h("IE_PROTO"),
          w = function () {},
          b = function (x) {
            return m + y + v + x + m + "/" + y + v;
          },
          S = function (x) {
            x.write(b("")), x.close();
            var C = x.parentWindow.Object;
            return (x = null), C;
          },
          E = function () {
            var x = d("iframe"),
              C = "java" + y + ":",
              D;
            return (
              (x.style.display = "none"),
              f.appendChild(x),
              (x.src = String(C)),
              (D = x.contentWindow.document),
              D.open(),
              D.write(b("document.F=Object")),
              D.close(),
              D.F
            );
          },
          A,
          T = function () {
            try {
              A = document.domain && new ActiveXObject("htmlfile");
            } catch {}
            T = A ? S(A) : E();
            for (var x = u.length; x--; ) delete T[g][u[x]];
            return T();
          };
        (c[p] = !0),
          (o.exports =
            Object.create ||
            function (C, D) {
              var I;
              return (
                C !== null
                  ? ((w[g] = l(C)), (I = new w()), (w[g] = null), (I[p] = C))
                  : (I = T()),
                D === void 0 ? I : s(I, D)
              );
            });
      },
      "7dd0": function (o, a, i) {
        var l = i("23e7"),
          s = i("9ed3"),
          u = i("e163"),
          c = i("d2bb"),
          f = i("d44e"),
          d = i("9112"),
          h = i("6eeb"),
          v = i("b622"),
          m = i("c430"),
          g = i("3f8c"),
          y = i("ae93"),
          p = y.IteratorPrototype,
          w = y.BUGGY_SAFARI_ITERATORS,
          b = v("iterator"),
          S = "keys",
          E = "values",
          A = "entries",
          T = function () {
            return this;
          };
        o.exports = function (x, C, D, I, $, L, G) {
          s(D, C, I);
          var j = function (ne) {
              if (ne === $ && X) return X;
              if (!w && ne in xe) return xe[ne];
              switch (ne) {
                case S:
                  return function () {
                    return new D(this, ne);
                  };
                case E:
                  return function () {
                    return new D(this, ne);
                  };
                case A:
                  return function () {
                    return new D(this, ne);
                  };
              }
              return function () {
                return new D(this);
              };
            },
            V = C + " Iterator",
            oe = !1,
            xe = x.prototype,
            J = xe[b] || xe["@@iterator"] || ($ && xe[$]),
            X = (!w && J) || j($),
            H = (C == "Array" && xe.entries) || J,
            se,
            Ee,
            de;
          if (
            (H &&
              ((se = u(H.call(new x()))),
              p !== Object.prototype &&
                se.next &&
                (!m &&
                  u(se) !== p &&
                  (c ? c(se, p) : typeof se[b] != "function" && d(se, b, T)),
                f(se, V, !0, !0),
                m && (g[V] = T))),
            $ == E &&
              J &&
              J.name !== E &&
              ((oe = !0),
              (X = function () {
                return J.call(this);
              })),
            (!m || G) && xe[b] !== X && d(xe, b, X),
            (g[C] = X),
            $)
          )
            if (((Ee = { values: j(E), keys: L ? X : j(S), entries: j(A) }), G))
              for (de in Ee) (w || oe || !(de in xe)) && h(xe, de, Ee[de]);
            else l({ target: C, proto: !0, forced: w || oe }, Ee);
          return Ee;
        };
      },
      "7f9a": function (o, a, i) {
        var l = i("da84"),
          s = i("8925"),
          u = l.WeakMap;
        o.exports = typeof u == "function" && /native code/.test(s(u));
      },
      "825a": function (o, a, i) {
        var l = i("861d");
        o.exports = function (s) {
          if (!l(s)) throw TypeError(String(s) + " is not an object");
          return s;
        };
      },
      "83ab": function (o, a, i) {
        var l = i("d039");
        o.exports = !l(function () {
          return (
            Object.defineProperty({}, 1, {
              get: function () {
                return 7;
              },
            })[1] != 7
          );
        });
      },
      8418: function (o, a, i) {
        var l = i("c04e"),
          s = i("9bf2"),
          u = i("5c6c");
        o.exports = function (c, f, d) {
          var h = l(f);
          h in c ? s.f(c, h, u(0, d)) : (c[h] = d);
        };
      },
      "861d": function (o, a) {
        o.exports = function (i) {
          return typeof i == "object" ? i !== null : typeof i == "function";
        };
      },
      8875: function (o, a, i) {
        var l, s, u;
        (function (c, f) {
          (s = []),
            (l = f),
            (u = typeof l == "function" ? l.apply(a, s) : l),
            u !== void 0 && (o.exports = u);
        })(typeof self != "undefined" ? self : this, function () {
          function c() {
            var f = Object.getOwnPropertyDescriptor(document, "currentScript");
            if (
              (!f && "currentScript" in document && document.currentScript) ||
              (f && f.get !== c && document.currentScript)
            )
              return document.currentScript;
            try {
              throw new Error();
            } catch (A) {
              var d = /.*at [^(]*\((.*):(.+):(.+)\)$/gi,
                h = /@([^@]*):(\d+):(\d+)\s*$/gi,
                v = d.exec(A.stack) || h.exec(A.stack),
                m = (v && v[1]) || !1,
                g = (v && v[2]) || !1,
                y = document.location.href.replace(document.location.hash, ""),
                p,
                w,
                b,
                S = document.getElementsByTagName("script");
              m === y &&
                ((p = document.documentElement.outerHTML),
                (w = new RegExp(
                  "(?:[^\\n]+?\\n){0," +
                    (g - 2) +
                    "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*",
                  "i"
                )),
                (b = p.replace(w, "$1").trim()));
              for (var E = 0; E < S.length; E++)
                if (
                  S[E].readyState === "interactive" ||
                  S[E].src === m ||
                  (m === y && S[E].innerHTML && S[E].innerHTML.trim() === b)
                )
                  return S[E];
              return null;
            }
          }
          return c;
        });
      },
      8925: function (o, a, i) {
        var l = i("c6cd"),
          s = Function.toString;
        typeof l.inspectSource != "function" &&
          (l.inspectSource = function (u) {
            return s.call(u);
          }),
          (o.exports = l.inspectSource);
      },
      "8aa5": function (o, a, i) {
        var l = i("6547").charAt;
        o.exports = function (s, u, c) {
          return u + (c ? l(s, u).length : 1);
        };
      },
      "8bbf": function (o, a) {
        o.exports = n;
      },
      "90e3": function (o, a) {
        var i = 0,
          l = Math.random();
        o.exports = function (s) {
          return (
            "Symbol(" +
            String(s === void 0 ? "" : s) +
            ")_" +
            (++i + l).toString(36)
          );
        };
      },
      9112: function (o, a, i) {
        var l = i("83ab"),
          s = i("9bf2"),
          u = i("5c6c");
        o.exports = l
          ? function (c, f, d) {
              return s.f(c, f, u(1, d));
            }
          : function (c, f, d) {
              return (c[f] = d), c;
            };
      },
      9263: function (o, a, i) {
        var l = i("ad6d"),
          s = i("9f7f"),
          u = RegExp.prototype.exec,
          c = String.prototype.replace,
          f = u,
          d = (function () {
            var g = /a/,
              y = /b*/g;
            return (
              u.call(g, "a"),
              u.call(y, "a"),
              g.lastIndex !== 0 || y.lastIndex !== 0
            );
          })(),
          h = s.UNSUPPORTED_Y || s.BROKEN_CARET,
          v = /()??/.exec("")[1] !== void 0,
          m = d || v || h;
        m &&
          (f = function (y) {
            var p = this,
              w,
              b,
              S,
              E,
              A = h && p.sticky,
              T = l.call(p),
              x = p.source,
              C = 0,
              D = y;
            return (
              A &&
                ((T = T.replace("y", "")),
                T.indexOf("g") === -1 && (T += "g"),
                (D = String(y).slice(p.lastIndex)),
                p.lastIndex > 0 &&
                  (!p.multiline ||
                    (p.multiline &&
                      y[p.lastIndex - 1] !==
                        `
`)) &&
                  ((x = "(?: " + x + ")"), (D = " " + D), C++),
                (b = new RegExp("^(?:" + x + ")", T))),
              v && (b = new RegExp("^" + x + "$(?!\\s)", T)),
              d && (w = p.lastIndex),
              (S = u.call(A ? b : p, D)),
              A
                ? S
                  ? ((S.input = S.input.slice(C)),
                    (S[0] = S[0].slice(C)),
                    (S.index = p.lastIndex),
                    (p.lastIndex += S[0].length))
                  : (p.lastIndex = 0)
                : d &&
                  S &&
                  (p.lastIndex = p.global ? S.index + S[0].length : w),
              v &&
                S &&
                S.length > 1 &&
                c.call(S[0], b, function () {
                  for (E = 1; E < arguments.length - 2; E++)
                    arguments[E] === void 0 && (S[E] = void 0);
                }),
              S
            );
          }),
          (o.exports = f);
      },
      "94ca": function (o, a, i) {
        var l = i("d039"),
          s = /#|\.prototype\./,
          u = function (v, m) {
            var g = f[c(v)];
            return g == h
              ? !0
              : g == d
              ? !1
              : typeof m == "function"
              ? l(m)
              : !!m;
          },
          c = (u.normalize = function (v) {
            return String(v).replace(s, ".").toLowerCase();
          }),
          f = (u.data = {}),
          d = (u.NATIVE = "N"),
          h = (u.POLYFILL = "P");
        o.exports = u;
      },
      "99af": function (o, a, i) {
        var l = i("23e7"),
          s = i("d039"),
          u = i("e8b5"),
          c = i("861d"),
          f = i("7b0b"),
          d = i("50c4"),
          h = i("8418"),
          v = i("65f0"),
          m = i("1dde"),
          g = i("b622"),
          y = i("2d00"),
          p = g("isConcatSpreadable"),
          w = 9007199254740991,
          b = "Maximum allowed index exceeded",
          S =
            y >= 51 ||
            !s(function () {
              var x = [];
              return (x[p] = !1), x.concat()[0] !== x;
            }),
          E = m("concat"),
          A = function (x) {
            if (!c(x)) return !1;
            var C = x[p];
            return C !== void 0 ? !!C : u(x);
          },
          T = !S || !E;
        l(
          { target: "Array", proto: !0, forced: T },
          {
            concat: function (C) {
              var D = f(this),
                I = v(D, 0),
                $ = 0,
                L,
                G,
                j,
                V,
                oe;
              for (L = -1, j = arguments.length; L < j; L++)
                if (((oe = L === -1 ? D : arguments[L]), A(oe))) {
                  if (((V = d(oe.length)), $ + V > w)) throw TypeError(b);
                  for (G = 0; G < V; G++, $++) G in oe && h(I, $, oe[G]);
                } else {
                  if ($ >= w) throw TypeError(b);
                  h(I, $++, oe);
                }
              return (I.length = $), I;
            },
          }
        );
      },
      "9bdd": function (o, a, i) {
        var l = i("825a");
        o.exports = function (s, u, c, f) {
          try {
            return f ? u(l(c)[0], c[1]) : u(c);
          } catch (h) {
            var d = s.return;
            throw (d !== void 0 && l(d.call(s)), h);
          }
        };
      },
      "9bf2": function (o, a, i) {
        var l = i("83ab"),
          s = i("0cfb"),
          u = i("825a"),
          c = i("c04e"),
          f = Object.defineProperty;
        a.f = l
          ? f
          : function (h, v, m) {
              if ((u(h), (v = c(v, !0)), u(m), s))
                try {
                  return f(h, v, m);
                } catch {}
              if ("get" in m || "set" in m)
                throw TypeError("Accessors not supported");
              return "value" in m && (h[v] = m.value), h;
            };
      },
      "9ed3": function (o, a, i) {
        var l = i("ae93").IteratorPrototype,
          s = i("7c73"),
          u = i("5c6c"),
          c = i("d44e"),
          f = i("3f8c"),
          d = function () {
            return this;
          };
        o.exports = function (h, v, m) {
          var g = v + " Iterator";
          return (
            (h.prototype = s(l, { next: u(1, m) })),
            c(h, g, !1, !0),
            (f[g] = d),
            h
          );
        };
      },
      "9f7f": function (o, a, i) {
        var l = i("d039");
        function s(u, c) {
          return RegExp(u, c);
        }
        (a.UNSUPPORTED_Y = l(function () {
          var u = s("a", "y");
          return (u.lastIndex = 2), u.exec("abcd") != null;
        })),
          (a.BROKEN_CARET = l(function () {
            var u = s("^r", "gy");
            return (u.lastIndex = 2), u.exec("str") != null;
          }));
      },
      a2bf: function (o, a, i) {
        var l = i("e8b5"),
          s = i("50c4"),
          u = i("0366"),
          c = function (f, d, h, v, m, g, y, p) {
            for (var w = m, b = 0, S = y ? u(y, p, 3) : !1, E; b < v; ) {
              if (b in h) {
                if (((E = S ? S(h[b], b, d) : h[b]), g > 0 && l(E)))
                  w = c(f, d, E, s(E.length), w, g - 1) - 1;
                else {
                  if (w >= 9007199254740991)
                    throw TypeError("Exceed the acceptable array length");
                  f[w] = E;
                }
                w++;
              }
              b++;
            }
            return w;
          };
        o.exports = c;
      },
      a352: function (o, a) {
        o.exports = r;
      },
      a434: function (o, a, i) {
        var l = i("23e7"),
          s = i("23cb"),
          u = i("a691"),
          c = i("50c4"),
          f = i("7b0b"),
          d = i("65f0"),
          h = i("8418"),
          v = i("1dde"),
          m = i("ae40"),
          g = v("splice"),
          y = m("splice", { ACCESSORS: !0, 0: 0, 1: 2 }),
          p = Math.max,
          w = Math.min,
          b = 9007199254740991,
          S = "Maximum allowed length exceeded";
        l(
          { target: "Array", proto: !0, forced: !g || !y },
          {
            splice: function (A, T) {
              var x = f(this),
                C = c(x.length),
                D = s(A, C),
                I = arguments.length,
                $,
                L,
                G,
                j,
                V,
                oe;
              if (
                (I === 0
                  ? ($ = L = 0)
                  : I === 1
                  ? (($ = 0), (L = C - D))
                  : (($ = I - 2), (L = w(p(u(T), 0), C - D))),
                C + $ - L > b)
              )
                throw TypeError(S);
              for (G = d(x, L), j = 0; j < L; j++)
                (V = D + j), V in x && h(G, j, x[V]);
              if (((G.length = L), $ < L)) {
                for (j = D; j < C - L; j++)
                  (V = j + L),
                    (oe = j + $),
                    V in x ? (x[oe] = x[V]) : delete x[oe];
                for (j = C; j > C - L + $; j--) delete x[j - 1];
              } else if ($ > L)
                for (j = C - L; j > D; j--)
                  (V = j + L - 1),
                    (oe = j + $ - 1),
                    V in x ? (x[oe] = x[V]) : delete x[oe];
              for (j = 0; j < $; j++) x[j + D] = arguments[j + 2];
              return (x.length = C - L + $), G;
            },
          }
        );
      },
      a4d3: function (o, a, i) {
        var l = i("23e7"),
          s = i("da84"),
          u = i("d066"),
          c = i("c430"),
          f = i("83ab"),
          d = i("4930"),
          h = i("fdbf"),
          v = i("d039"),
          m = i("5135"),
          g = i("e8b5"),
          y = i("861d"),
          p = i("825a"),
          w = i("7b0b"),
          b = i("fc6a"),
          S = i("c04e"),
          E = i("5c6c"),
          A = i("7c73"),
          T = i("df75"),
          x = i("241c"),
          C = i("057f"),
          D = i("7418"),
          I = i("06cf"),
          $ = i("9bf2"),
          L = i("d1e7"),
          G = i("9112"),
          j = i("6eeb"),
          V = i("5692"),
          oe = i("f772"),
          xe = i("d012"),
          J = i("90e3"),
          X = i("b622"),
          H = i("e538"),
          se = i("746f"),
          Ee = i("d44e"),
          de = i("69f3"),
          ne = i("b727").forEach,
          N = oe("hidden"),
          ae = "Symbol",
          U = "prototype",
          he = X("toPrimitive"),
          Le = de.set,
          R = de.getterFor(ae),
          P = Object[U],
          B = s.Symbol,
          Q = u("JSON", "stringify"),
          Y = I.f,
          te = $.f,
          ve = C.f,
          ue = L.f,
          ie = V("symbols"),
          ee = V("op-symbols"),
          ye = V("string-to-symbol-registry"),
          K = V("symbol-to-string-registry"),
          ce = V("wks"),
          we = s.QObject,
          ke = !we || !we[U] || !we[U].findChild,
          We =
            f &&
            v(function () {
              return (
                A(
                  te({}, "a", {
                    get: function () {
                      return te(this, "a", { value: 7 }).a;
                    },
                  })
                ).a != 7
              );
            })
              ? function (De, Ce, Ie) {
                  var Ke = Y(P, Ce);
                  Ke && delete P[Ce],
                    te(De, Ce, Ie),
                    Ke && De !== P && te(P, Ce, Ke);
                }
              : te,
          ze = function (De, Ce) {
            var Ie = (ie[De] = A(B[U]));
            return (
              Le(Ie, { type: ae, tag: De, description: Ce }),
              f || (Ie.description = Ce),
              Ie
            );
          },
          q = h
            ? function (De) {
                return typeof De == "symbol";
              }
            : function (De) {
                return Object(De) instanceof B;
              },
          _ = function (Ce, Ie, Ke) {
            Ce === P && _(ee, Ie, Ke), p(Ce);
            var Xe = S(Ie, !0);
            return (
              p(Ke),
              m(ie, Xe)
                ? (Ke.enumerable
                    ? (m(Ce, N) && Ce[N][Xe] && (Ce[N][Xe] = !1),
                      (Ke = A(Ke, { enumerable: E(0, !1) })))
                    : (m(Ce, N) || te(Ce, N, E(1, {})), (Ce[N][Xe] = !0)),
                  We(Ce, Xe, Ke))
                : te(Ce, Xe, Ke)
            );
          },
          W = function (Ce, Ie) {
            p(Ce);
            var Ke = b(Ie),
              Xe = T(Ke).concat(Ne(Ke));
            return (
              ne(Xe, function (Ht) {
                (!f || ge.call(Ke, Ht)) && _(Ce, Ht, Ke[Ht]);
              }),
              Ce
            );
          },
          le = function (Ce, Ie) {
            return Ie === void 0 ? A(Ce) : W(A(Ce), Ie);
          },
          ge = function (Ce) {
            var Ie = S(Ce, !0),
              Ke = ue.call(this, Ie);
            return this === P && m(ie, Ie) && !m(ee, Ie)
              ? !1
              : Ke || !m(this, Ie) || !m(ie, Ie) || (m(this, N) && this[N][Ie])
              ? Ke
              : !0;
          },
          Ae = function (Ce, Ie) {
            var Ke = b(Ce),
              Xe = S(Ie, !0);
            if (!(Ke === P && m(ie, Xe) && !m(ee, Xe))) {
              var Ht = Y(Ke, Xe);
              return (
                Ht &&
                  m(ie, Xe) &&
                  !(m(Ke, N) && Ke[N][Xe]) &&
                  (Ht.enumerable = !0),
                Ht
              );
            }
          },
          Pe = function (Ce) {
            var Ie = ve(b(Ce)),
              Ke = [];
            return (
              ne(Ie, function (Xe) {
                !m(ie, Xe) && !m(xe, Xe) && Ke.push(Xe);
              }),
              Ke
            );
          },
          Ne = function (Ce) {
            var Ie = Ce === P,
              Ke = ve(Ie ? ee : b(Ce)),
              Xe = [];
            return (
              ne(Ke, function (Ht) {
                m(ie, Ht) && (!Ie || m(P, Ht)) && Xe.push(ie[Ht]);
              }),
              Xe
            );
          };
        if (
          (d ||
            ((B = function () {
              if (this instanceof B)
                throw TypeError("Symbol is not a constructor");
              var Ce =
                  !arguments.length || arguments[0] === void 0
                    ? void 0
                    : String(arguments[0]),
                Ie = J(Ce),
                Ke = function (Xe) {
                  this === P && Ke.call(ee, Xe),
                    m(this, N) && m(this[N], Ie) && (this[N][Ie] = !1),
                    We(this, Ie, E(1, Xe));
                };
              return (
                f && ke && We(P, Ie, { configurable: !0, set: Ke }), ze(Ie, Ce)
              );
            }),
            j(B[U], "toString", function () {
              return R(this).tag;
            }),
            j(B, "withoutSetter", function (De) {
              return ze(J(De), De);
            }),
            (L.f = ge),
            ($.f = _),
            (I.f = Ae),
            (x.f = C.f = Pe),
            (D.f = Ne),
            (H.f = function (De) {
              return ze(X(De), De);
            }),
            f &&
              (te(B[U], "description", {
                configurable: !0,
                get: function () {
                  return R(this).description;
                },
              }),
              c || j(P, "propertyIsEnumerable", ge, { unsafe: !0 }))),
          l({ global: !0, wrap: !0, forced: !d, sham: !d }, { Symbol: B }),
          ne(T(ce), function (De) {
            se(De);
          }),
          l(
            { target: ae, stat: !0, forced: !d },
            {
              for: function (De) {
                var Ce = String(De);
                if (m(ye, Ce)) return ye[Ce];
                var Ie = B(Ce);
                return (ye[Ce] = Ie), (K[Ie] = Ce), Ie;
              },
              keyFor: function (Ce) {
                if (!q(Ce)) throw TypeError(Ce + " is not a symbol");
                if (m(K, Ce)) return K[Ce];
              },
              useSetter: function () {
                ke = !0;
              },
              useSimple: function () {
                ke = !1;
              },
            }
          ),
          l(
            { target: "Object", stat: !0, forced: !d, sham: !f },
            {
              create: le,
              defineProperty: _,
              defineProperties: W,
              getOwnPropertyDescriptor: Ae,
            }
          ),
          l(
            { target: "Object", stat: !0, forced: !d },
            { getOwnPropertyNames: Pe, getOwnPropertySymbols: Ne }
          ),
          l(
            {
              target: "Object",
              stat: !0,
              forced: v(function () {
                D.f(1);
              }),
            },
            {
              getOwnPropertySymbols: function (Ce) {
                return D.f(w(Ce));
              },
            }
          ),
          Q)
        ) {
          var it =
            !d ||
            v(function () {
              var De = B();
              return (
                Q([De]) != "[null]" ||
                Q({ a: De }) != "{}" ||
                Q(Object(De)) != "{}"
              );
            });
          l(
            { target: "JSON", stat: !0, forced: it },
            {
              stringify: function (Ce, Ie, Ke) {
                for (var Xe = [Ce], Ht = 1, Hr; arguments.length > Ht; )
                  Xe.push(arguments[Ht++]);
                if (((Hr = Ie), !((!y(Ie) && Ce === void 0) || q(Ce))))
                  return (
                    g(Ie) ||
                      (Ie = function (Z, be) {
                        if (
                          (typeof Hr == "function" &&
                            (be = Hr.call(this, Z, be)),
                          !q(be))
                        )
                          return be;
                      }),
                    (Xe[1] = Ie),
                    Q.apply(null, Xe)
                  );
              },
            }
          );
        }
        B[U][he] || G(B[U], he, B[U].valueOf), Ee(B, ae), (xe[N] = !0);
      },
      a630: function (o, a, i) {
        var l = i("23e7"),
          s = i("4df4"),
          u = i("1c7e"),
          c = !u(function (f) {
            Array.from(f);
          });
        l({ target: "Array", stat: !0, forced: c }, { from: s });
      },
      a640: function (o, a, i) {
        var l = i("d039");
        o.exports = function (s, u) {
          var c = [][s];
          return (
            !!c &&
            l(function () {
              c.call(
                null,
                u ||
                  function () {
                    throw 1;
                  },
                1
              );
            })
          );
        };
      },
      a691: function (o, a) {
        var i = Math.ceil,
          l = Math.floor;
        o.exports = function (s) {
          return isNaN((s = +s)) ? 0 : (s > 0 ? l : i)(s);
        };
      },
      ab13: function (o, a, i) {
        var l = i("b622"),
          s = l("match");
        o.exports = function (u) {
          var c = /./;
          try {
            "/./"[u](c);
          } catch {
            try {
              return (c[s] = !1), "/./"[u](c);
            } catch {}
          }
          return !1;
        };
      },
      ac1f: function (o, a, i) {
        var l = i("23e7"),
          s = i("9263");
        l({ target: "RegExp", proto: !0, forced: /./.exec !== s }, { exec: s });
      },
      ad6d: function (o, a, i) {
        var l = i("825a");
        o.exports = function () {
          var s = l(this),
            u = "";
          return (
            s.global && (u += "g"),
            s.ignoreCase && (u += "i"),
            s.multiline && (u += "m"),
            s.dotAll && (u += "s"),
            s.unicode && (u += "u"),
            s.sticky && (u += "y"),
            u
          );
        };
      },
      ae40: function (o, a, i) {
        var l = i("83ab"),
          s = i("d039"),
          u = i("5135"),
          c = Object.defineProperty,
          f = {},
          d = function (h) {
            throw h;
          };
        o.exports = function (h, v) {
          if (u(f, h)) return f[h];
          v || (v = {});
          var m = [][h],
            g = u(v, "ACCESSORS") ? v.ACCESSORS : !1,
            y = u(v, 0) ? v[0] : d,
            p = u(v, 1) ? v[1] : void 0;
          return (f[h] =
            !!m &&
            !s(function () {
              if (g && !l) return !0;
              var w = { length: -1 };
              g ? c(w, 1, { enumerable: !0, get: d }) : (w[1] = 1),
                m.call(w, y, p);
            }));
        };
      },
      ae93: function (o, a, i) {
        var l = i("e163"),
          s = i("9112"),
          u = i("5135"),
          c = i("b622"),
          f = i("c430"),
          d = c("iterator"),
          h = !1,
          v = function () {
            return this;
          },
          m,
          g,
          y;
        [].keys &&
          ((y = [].keys()),
          "next" in y
            ? ((g = l(l(y))), g !== Object.prototype && (m = g))
            : (h = !0)),
          m == null && (m = {}),
          !f && !u(m, d) && s(m, d, v),
          (o.exports = { IteratorPrototype: m, BUGGY_SAFARI_ITERATORS: h });
      },
      b041: function (o, a, i) {
        var l = i("00ee"),
          s = i("f5df");
        o.exports = l
          ? {}.toString
          : function () {
              return "[object " + s(this) + "]";
            };
      },
      b0c0: function (o, a, i) {
        var l = i("83ab"),
          s = i("9bf2").f,
          u = Function.prototype,
          c = u.toString,
          f = /^\s*function ([^ (]*)/,
          d = "name";
        l &&
          !(d in u) &&
          s(u, d, {
            configurable: !0,
            get: function () {
              try {
                return c.call(this).match(f)[1];
              } catch {
                return "";
              }
            },
          });
      },
      b622: function (o, a, i) {
        var l = i("da84"),
          s = i("5692"),
          u = i("5135"),
          c = i("90e3"),
          f = i("4930"),
          d = i("fdbf"),
          h = s("wks"),
          v = l.Symbol,
          m = d ? v : (v && v.withoutSetter) || c;
        o.exports = function (g) {
          return (
            u(h, g) ||
              (f && u(v, g) ? (h[g] = v[g]) : (h[g] = m("Symbol." + g))),
            h[g]
          );
        };
      },
      b64b: function (o, a, i) {
        var l = i("23e7"),
          s = i("7b0b"),
          u = i("df75"),
          c = i("d039"),
          f = c(function () {
            u(1);
          });
        l(
          { target: "Object", stat: !0, forced: f },
          {
            keys: function (h) {
              return u(s(h));
            },
          }
        );
      },
      b727: function (o, a, i) {
        var l = i("0366"),
          s = i("44ad"),
          u = i("7b0b"),
          c = i("50c4"),
          f = i("65f0"),
          d = [].push,
          h = function (v) {
            var m = v == 1,
              g = v == 2,
              y = v == 3,
              p = v == 4,
              w = v == 6,
              b = v == 5 || w;
            return function (S, E, A, T) {
              for (
                var x = u(S),
                  C = s(x),
                  D = l(E, A, 3),
                  I = c(C.length),
                  $ = 0,
                  L = T || f,
                  G = m ? L(S, I) : g ? L(S, 0) : void 0,
                  j,
                  V;
                I > $;
                $++
              )
                if ((b || $ in C) && ((j = C[$]), (V = D(j, $, x)), v)) {
                  if (m) G[$] = V;
                  else if (V)
                    switch (v) {
                      case 3:
                        return !0;
                      case 5:
                        return j;
                      case 6:
                        return $;
                      case 2:
                        d.call(G, j);
                    }
                  else if (p) return !1;
                }
              return w ? -1 : y || p ? p : G;
            };
          };
        o.exports = {
          forEach: h(0),
          map: h(1),
          filter: h(2),
          some: h(3),
          every: h(4),
          find: h(5),
          findIndex: h(6),
        };
      },
      c04e: function (o, a, i) {
        var l = i("861d");
        o.exports = function (s, u) {
          if (!l(s)) return s;
          var c, f;
          if (
            (u &&
              typeof (c = s.toString) == "function" &&
              !l((f = c.call(s)))) ||
            (typeof (c = s.valueOf) == "function" && !l((f = c.call(s)))) ||
            (!u && typeof (c = s.toString) == "function" && !l((f = c.call(s))))
          )
            return f;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      c430: function (o, a) {
        o.exports = !1;
      },
      c6b6: function (o, a) {
        var i = {}.toString;
        o.exports = function (l) {
          return i.call(l).slice(8, -1);
        };
      },
      c6cd: function (o, a, i) {
        var l = i("da84"),
          s = i("ce4e"),
          u = "__core-js_shared__",
          c = l[u] || s(u, {});
        o.exports = c;
      },
      c740: function (o, a, i) {
        var l = i("23e7"),
          s = i("b727").findIndex,
          u = i("44d2"),
          c = i("ae40"),
          f = "findIndex",
          d = !0,
          h = c(f);
        f in [] &&
          Array(1)[f](function () {
            d = !1;
          }),
          l(
            { target: "Array", proto: !0, forced: d || !h },
            {
              findIndex: function (m) {
                return s(this, m, arguments.length > 1 ? arguments[1] : void 0);
              },
            }
          ),
          u(f);
      },
      c8ba: function (o, a) {
        var i;
        i = (function () {
          return this;
        })();
        try {
          i = i || new Function("return this")();
        } catch {
          typeof window == "object" && (i = window);
        }
        o.exports = i;
      },
      c975: function (o, a, i) {
        var l = i("23e7"),
          s = i("4d64").indexOf,
          u = i("a640"),
          c = i("ae40"),
          f = [].indexOf,
          d = !!f && 1 / [1].indexOf(1, -0) < 0,
          h = u("indexOf"),
          v = c("indexOf", { ACCESSORS: !0, 1: 0 });
        l(
          { target: "Array", proto: !0, forced: d || !h || !v },
          {
            indexOf: function (g) {
              return d
                ? f.apply(this, arguments) || 0
                : s(this, g, arguments.length > 1 ? arguments[1] : void 0);
            },
          }
        );
      },
      ca84: function (o, a, i) {
        var l = i("5135"),
          s = i("fc6a"),
          u = i("4d64").indexOf,
          c = i("d012");
        o.exports = function (f, d) {
          var h = s(f),
            v = 0,
            m = [],
            g;
          for (g in h) !l(c, g) && l(h, g) && m.push(g);
          for (; d.length > v; ) l(h, (g = d[v++])) && (~u(m, g) || m.push(g));
          return m;
        };
      },
      caad: function (o, a, i) {
        var l = i("23e7"),
          s = i("4d64").includes,
          u = i("44d2"),
          c = i("ae40"),
          f = c("indexOf", { ACCESSORS: !0, 1: 0 });
        l(
          { target: "Array", proto: !0, forced: !f },
          {
            includes: function (h) {
              return s(this, h, arguments.length > 1 ? arguments[1] : void 0);
            },
          }
        ),
          u("includes");
      },
      cc12: function (o, a, i) {
        var l = i("da84"),
          s = i("861d"),
          u = l.document,
          c = s(u) && s(u.createElement);
        o.exports = function (f) {
          return c ? u.createElement(f) : {};
        };
      },
      ce4e: function (o, a, i) {
        var l = i("da84"),
          s = i("9112");
        o.exports = function (u, c) {
          try {
            s(l, u, c);
          } catch {
            l[u] = c;
          }
          return c;
        };
      },
      d012: function (o, a) {
        o.exports = {};
      },
      d039: function (o, a) {
        o.exports = function (i) {
          try {
            return !!i();
          } catch {
            return !0;
          }
        };
      },
      d066: function (o, a, i) {
        var l = i("428f"),
          s = i("da84"),
          u = function (c) {
            return typeof c == "function" ? c : void 0;
          };
        o.exports = function (c, f) {
          return arguments.length < 2
            ? u(l[c]) || u(s[c])
            : (l[c] && l[c][f]) || (s[c] && s[c][f]);
        };
      },
      d1e7: function (o, a, i) {
        var l = {}.propertyIsEnumerable,
          s = Object.getOwnPropertyDescriptor,
          u = s && !l.call({ 1: 2 }, 1);
        a.f = u
          ? function (f) {
              var d = s(this, f);
              return !!d && d.enumerable;
            }
          : l;
      },
      d28b: function (o, a, i) {
        var l = i("746f");
        l("iterator");
      },
      d2bb: function (o, a, i) {
        var l = i("825a"),
          s = i("3bbe");
        o.exports =
          Object.setPrototypeOf ||
          ("__proto__" in {}
            ? (function () {
                var u = !1,
                  c = {},
                  f;
                try {
                  (f = Object.getOwnPropertyDescriptor(
                    Object.prototype,
                    "__proto__"
                  ).set),
                    f.call(c, []),
                    (u = c instanceof Array);
                } catch {}
                return function (h, v) {
                  return l(h), s(v), u ? f.call(h, v) : (h.__proto__ = v), h;
                };
              })()
            : void 0);
      },
      d3b7: function (o, a, i) {
        var l = i("00ee"),
          s = i("6eeb"),
          u = i("b041");
        l || s(Object.prototype, "toString", u, { unsafe: !0 });
      },
      d44e: function (o, a, i) {
        var l = i("9bf2").f,
          s = i("5135"),
          u = i("b622"),
          c = u("toStringTag");
        o.exports = function (f, d, h) {
          f &&
            !s((f = h ? f : f.prototype), c) &&
            l(f, c, { configurable: !0, value: d });
        };
      },
      d58f: function (o, a, i) {
        var l = i("1c0b"),
          s = i("7b0b"),
          u = i("44ad"),
          c = i("50c4"),
          f = function (d) {
            return function (h, v, m, g) {
              l(v);
              var y = s(h),
                p = u(y),
                w = c(y.length),
                b = d ? w - 1 : 0,
                S = d ? -1 : 1;
              if (m < 2)
                for (;;) {
                  if (b in p) {
                    (g = p[b]), (b += S);
                    break;
                  }
                  if (((b += S), d ? b < 0 : w <= b))
                    throw TypeError(
                      "Reduce of empty array with no initial value"
                    );
                }
              for (; d ? b >= 0 : w > b; b += S)
                b in p && (g = v(g, p[b], b, y));
              return g;
            };
          };
        o.exports = { left: f(!1), right: f(!0) };
      },
      d784: function (o, a, i) {
        i("ac1f");
        var l = i("6eeb"),
          s = i("d039"),
          u = i("b622"),
          c = i("9263"),
          f = i("9112"),
          d = u("species"),
          h = !s(function () {
            var p = /./;
            return (
              (p.exec = function () {
                var w = [];
                return (w.groups = { a: "7" }), w;
              }),
              "".replace(p, "$<a>") !== "7"
            );
          }),
          v = (function () {
            return "a".replace(/./, "$0") === "$0";
          })(),
          m = u("replace"),
          g = (function () {
            return /./[m] ? /./[m]("a", "$0") === "" : !1;
          })(),
          y = !s(function () {
            var p = /(?:)/,
              w = p.exec;
            p.exec = function () {
              return w.apply(this, arguments);
            };
            var b = "ab".split(p);
            return b.length !== 2 || b[0] !== "a" || b[1] !== "b";
          });
        o.exports = function (p, w, b, S) {
          var E = u(p),
            A = !s(function () {
              var $ = {};
              return (
                ($[E] = function () {
                  return 7;
                }),
                ""[p]($) != 7
              );
            }),
            T =
              A &&
              !s(function () {
                var $ = !1,
                  L = /a/;
                return (
                  p === "split" &&
                    ((L = {}),
                    (L.constructor = {}),
                    (L.constructor[d] = function () {
                      return L;
                    }),
                    (L.flags = ""),
                    (L[E] = /./[E])),
                  (L.exec = function () {
                    return ($ = !0), null;
                  }),
                  L[E](""),
                  !$
                );
              });
          if (
            !A ||
            !T ||
            (p === "replace" && !(h && v && !g)) ||
            (p === "split" && !y)
          ) {
            var x = /./[E],
              C = b(
                E,
                ""[p],
                function ($, L, G, j, V) {
                  return L.exec === c
                    ? A && !V
                      ? { done: !0, value: x.call(L, G, j) }
                      : { done: !0, value: $.call(G, L, j) }
                    : { done: !1 };
                },
                {
                  REPLACE_KEEPS_$0: v,
                  REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: g,
                }
              ),
              D = C[0],
              I = C[1];
            l(String.prototype, p, D),
              l(
                RegExp.prototype,
                E,
                w == 2
                  ? function ($, L) {
                      return I.call($, this, L);
                    }
                  : function ($) {
                      return I.call($, this);
                    }
              );
          }
          S && f(RegExp.prototype[E], "sham", !0);
        };
      },
      d81d: function (o, a, i) {
        var l = i("23e7"),
          s = i("b727").map,
          u = i("1dde"),
          c = i("ae40"),
          f = u("map"),
          d = c("map");
        l(
          { target: "Array", proto: !0, forced: !f || !d },
          {
            map: function (v) {
              return s(this, v, arguments.length > 1 ? arguments[1] : void 0);
            },
          }
        );
      },
      da84: function (o, a, i) {
        (function (l) {
          var s = function (u) {
            return u && u.Math == Math && u;
          };
          o.exports =
            s(typeof globalThis == "object" && globalThis) ||
            s(typeof window == "object" && window) ||
            s(typeof self == "object" && self) ||
            s(typeof l == "object" && l) ||
            Function("return this")();
        }).call(this, i("c8ba"));
      },
      dbb4: function (o, a, i) {
        var l = i("23e7"),
          s = i("83ab"),
          u = i("56ef"),
          c = i("fc6a"),
          f = i("06cf"),
          d = i("8418");
        l(
          { target: "Object", stat: !0, sham: !s },
          {
            getOwnPropertyDescriptors: function (v) {
              for (
                var m = c(v), g = f.f, y = u(m), p = {}, w = 0, b, S;
                y.length > w;

              )
                (S = g(m, (b = y[w++]))), S !== void 0 && d(p, b, S);
              return p;
            },
          }
        );
      },
      dbf1: function (o, a, i) {
        (function (l) {
          i.d(a, "a", function () {
            return u;
          });
          function s() {
            return typeof window != "undefined" ? window.console : l.console;
          }
          var u = s();
        }).call(this, i("c8ba"));
      },
      ddb0: function (o, a, i) {
        var l = i("da84"),
          s = i("fdbc"),
          u = i("e260"),
          c = i("9112"),
          f = i("b622"),
          d = f("iterator"),
          h = f("toStringTag"),
          v = u.values;
        for (var m in s) {
          var g = l[m],
            y = g && g.prototype;
          if (y) {
            if (y[d] !== v)
              try {
                c(y, d, v);
              } catch {
                y[d] = v;
              }
            if ((y[h] || c(y, h, m), s[m])) {
              for (var p in u)
                if (y[p] !== u[p])
                  try {
                    c(y, p, u[p]);
                  } catch {
                    y[p] = u[p];
                  }
            }
          }
        }
      },
      df75: function (o, a, i) {
        var l = i("ca84"),
          s = i("7839");
        o.exports =
          Object.keys ||
          function (c) {
            return l(c, s);
          };
      },
      e01a: function (o, a, i) {
        var l = i("23e7"),
          s = i("83ab"),
          u = i("da84"),
          c = i("5135"),
          f = i("861d"),
          d = i("9bf2").f,
          h = i("e893"),
          v = u.Symbol;
        if (
          s &&
          typeof v == "function" &&
          (!("description" in v.prototype) || v().description !== void 0)
        ) {
          var m = {},
            g = function () {
              var E =
                  arguments.length < 1 || arguments[0] === void 0
                    ? void 0
                    : String(arguments[0]),
                A = this instanceof g ? new v(E) : E === void 0 ? v() : v(E);
              return E === "" && (m[A] = !0), A;
            };
          h(g, v);
          var y = (g.prototype = v.prototype);
          y.constructor = g;
          var p = y.toString,
            w = String(v("test")) == "Symbol(test)",
            b = /^Symbol\((.*)\)[^)]+$/;
          d(y, "description", {
            configurable: !0,
            get: function () {
              var E = f(this) ? this.valueOf() : this,
                A = p.call(E);
              if (c(m, E)) return "";
              var T = w ? A.slice(7, -1) : A.replace(b, "$1");
              return T === "" ? void 0 : T;
            },
          }),
            l({ global: !0, forced: !0 }, { Symbol: g });
        }
      },
      e163: function (o, a, i) {
        var l = i("5135"),
          s = i("7b0b"),
          u = i("f772"),
          c = i("e177"),
          f = u("IE_PROTO"),
          d = Object.prototype;
        o.exports = c
          ? Object.getPrototypeOf
          : function (h) {
              return (
                (h = s(h)),
                l(h, f)
                  ? h[f]
                  : typeof h.constructor == "function" &&
                    h instanceof h.constructor
                  ? h.constructor.prototype
                  : h instanceof Object
                  ? d
                  : null
              );
            };
      },
      e177: function (o, a, i) {
        var l = i("d039");
        o.exports = !l(function () {
          function s() {}
          return (
            (s.prototype.constructor = null),
            Object.getPrototypeOf(new s()) !== s.prototype
          );
        });
      },
      e260: function (o, a, i) {
        var l = i("fc6a"),
          s = i("44d2"),
          u = i("3f8c"),
          c = i("69f3"),
          f = i("7dd0"),
          d = "Array Iterator",
          h = c.set,
          v = c.getterFor(d);
        (o.exports = f(
          Array,
          "Array",
          function (m, g) {
            h(this, { type: d, target: l(m), index: 0, kind: g });
          },
          function () {
            var m = v(this),
              g = m.target,
              y = m.kind,
              p = m.index++;
            return !g || p >= g.length
              ? ((m.target = void 0), { value: void 0, done: !0 })
              : y == "keys"
              ? { value: p, done: !1 }
              : y == "values"
              ? { value: g[p], done: !1 }
              : { value: [p, g[p]], done: !1 };
          },
          "values"
        )),
          (u.Arguments = u.Array),
          s("keys"),
          s("values"),
          s("entries");
      },
      e439: function (o, a, i) {
        var l = i("23e7"),
          s = i("d039"),
          u = i("fc6a"),
          c = i("06cf").f,
          f = i("83ab"),
          d = s(function () {
            c(1);
          }),
          h = !f || d;
        l(
          { target: "Object", stat: !0, forced: h, sham: !f },
          {
            getOwnPropertyDescriptor: function (m, g) {
              return c(u(m), g);
            },
          }
        );
      },
      e538: function (o, a, i) {
        var l = i("b622");
        a.f = l;
      },
      e893: function (o, a, i) {
        var l = i("5135"),
          s = i("56ef"),
          u = i("06cf"),
          c = i("9bf2");
        o.exports = function (f, d) {
          for (var h = s(d), v = c.f, m = u.f, g = 0; g < h.length; g++) {
            var y = h[g];
            l(f, y) || v(f, y, m(d, y));
          }
        };
      },
      e8b5: function (o, a, i) {
        var l = i("c6b6");
        o.exports =
          Array.isArray ||
          function (u) {
            return l(u) == "Array";
          };
      },
      e95a: function (o, a, i) {
        var l = i("b622"),
          s = i("3f8c"),
          u = l("iterator"),
          c = Array.prototype;
        o.exports = function (f) {
          return f !== void 0 && (s.Array === f || c[u] === f);
        };
      },
      f5df: function (o, a, i) {
        var l = i("00ee"),
          s = i("c6b6"),
          u = i("b622"),
          c = u("toStringTag"),
          f =
            s(
              (function () {
                return arguments;
              })()
            ) == "Arguments",
          d = function (h, v) {
            try {
              return h[v];
            } catch {}
          };
        o.exports = l
          ? s
          : function (h) {
              var v, m, g;
              return h === void 0
                ? "Undefined"
                : h === null
                ? "Null"
                : typeof (m = d((v = Object(h)), c)) == "string"
                ? m
                : f
                ? s(v)
                : (g = s(v)) == "Object" && typeof v.callee == "function"
                ? "Arguments"
                : g;
            };
      },
      f772: function (o, a, i) {
        var l = i("5692"),
          s = i("90e3"),
          u = l("keys");
        o.exports = function (c) {
          return u[c] || (u[c] = s(c));
        };
      },
      fb15: function (o, a, i) {
        if ((i.r(a), typeof window != "undefined")) {
          var l = window.document.currentScript;
          {
            var s = i("8875");
            (l = s()),
              "currentScript" in document ||
                Object.defineProperty(document, "currentScript", { get: s });
          }
          var u = l && l.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
          u && (i.p = u[1]);
        }
        i("99af"),
          i("4de4"),
          i("4160"),
          i("c975"),
          i("d81d"),
          i("a434"),
          i("159b"),
          i("a4d3"),
          i("e439"),
          i("dbb4"),
          i("b64b");
        function c(q, _, W) {
          return (
            _ in q
              ? Object.defineProperty(q, _, {
                  value: W,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (q[_] = W),
            q
          );
        }
        function f(q, _) {
          var W = Object.keys(q);
          if (Object.getOwnPropertySymbols) {
            var le = Object.getOwnPropertySymbols(q);
            _ &&
              (le = le.filter(function (ge) {
                return Object.getOwnPropertyDescriptor(q, ge).enumerable;
              })),
              W.push.apply(W, le);
          }
          return W;
        }
        function d(q) {
          for (var _ = 1; _ < arguments.length; _++) {
            var W = arguments[_] != null ? arguments[_] : {};
            _ % 2
              ? f(Object(W), !0).forEach(function (le) {
                  c(q, le, W[le]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(q, Object.getOwnPropertyDescriptors(W))
              : f(Object(W)).forEach(function (le) {
                  Object.defineProperty(
                    q,
                    le,
                    Object.getOwnPropertyDescriptor(W, le)
                  );
                });
          }
          return q;
        }
        function h(q) {
          if (Array.isArray(q)) return q;
        }
        i("e01a"), i("d28b"), i("e260"), i("d3b7"), i("3ca3"), i("ddb0");
        function v(q, _) {
          if (
            !(typeof Symbol == "undefined" || !(Symbol.iterator in Object(q)))
          ) {
            var W = [],
              le = !0,
              ge = !1,
              Ae = void 0;
            try {
              for (
                var Pe = q[Symbol.iterator](), Ne;
                !(le = (Ne = Pe.next()).done) &&
                (W.push(Ne.value), !(_ && W.length === _));
                le = !0
              );
            } catch (it) {
              (ge = !0), (Ae = it);
            } finally {
              try {
                !le && Pe.return != null && Pe.return();
              } finally {
                if (ge) throw Ae;
              }
            }
            return W;
          }
        }
        i("a630"), i("fb6a"), i("b0c0"), i("25f0");
        function m(q, _) {
          (_ == null || _ > q.length) && (_ = q.length);
          for (var W = 0, le = new Array(_); W < _; W++) le[W] = q[W];
          return le;
        }
        function g(q, _) {
          if (!!q) {
            if (typeof q == "string") return m(q, _);
            var W = Object.prototype.toString.call(q).slice(8, -1);
            if (
              (W === "Object" && q.constructor && (W = q.constructor.name),
              W === "Map" || W === "Set")
            )
              return Array.from(q);
            if (
              W === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(W)
            )
              return m(q, _);
          }
        }
        function y() {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        function p(q, _) {
          return h(q) || v(q, _) || g(q, _) || y();
        }
        function w(q) {
          if (Array.isArray(q)) return m(q);
        }
        function b(q) {
          if (typeof Symbol != "undefined" && Symbol.iterator in Object(q))
            return Array.from(q);
        }
        function S() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        function E(q) {
          return w(q) || b(q) || g(q) || S();
        }
        var A = i("a352"),
          T = i.n(A);
        function x(q) {
          q.parentElement !== null && q.parentElement.removeChild(q);
        }
        function C(q, _, W) {
          var le = W === 0 ? q.children[0] : q.children[W - 1].nextSibling;
          q.insertBefore(_, le);
        }
        var D = i("dbf1");
        i("13d5"), i("4fad"), i("ac1f"), i("5319");
        function I(q) {
          var _ = Object.create(null);
          return function (le) {
            var ge = _[le];
            return ge || (_[le] = q(le));
          };
        }
        var $ = /-(\w)/g,
          L = I(function (q) {
            return q.replace($, function (_, W) {
              return W.toUpperCase();
            });
          });
        i("5db7"), i("73d9");
        var G = ["Start", "Add", "Remove", "Update", "End"],
          j = ["Choose", "Unchoose", "Sort", "Filter", "Clone"],
          V = ["Move"],
          oe = [V, G, j]
            .flatMap(function (q) {
              return q;
            })
            .map(function (q) {
              return "on".concat(q);
            }),
          xe = { manage: V, manageAndEmit: G, emit: j };
        function J(q) {
          return oe.indexOf(q) !== -1;
        }
        i("caad"), i("2ca0");
        var X = [
          "a",
          "abbr",
          "address",
          "area",
          "article",
          "aside",
          "audio",
          "b",
          "base",
          "bdi",
          "bdo",
          "blockquote",
          "body",
          "br",
          "button",
          "canvas",
          "caption",
          "cite",
          "code",
          "col",
          "colgroup",
          "data",
          "datalist",
          "dd",
          "del",
          "details",
          "dfn",
          "dialog",
          "div",
          "dl",
          "dt",
          "em",
          "embed",
          "fieldset",
          "figcaption",
          "figure",
          "footer",
          "form",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "head",
          "header",
          "hgroup",
          "hr",
          "html",
          "i",
          "iframe",
          "img",
          "input",
          "ins",
          "kbd",
          "label",
          "legend",
          "li",
          "link",
          "main",
          "map",
          "mark",
          "math",
          "menu",
          "menuitem",
          "meta",
          "meter",
          "nav",
          "noscript",
          "object",
          "ol",
          "optgroup",
          "option",
          "output",
          "p",
          "param",
          "picture",
          "pre",
          "progress",
          "q",
          "rb",
          "rp",
          "rt",
          "rtc",
          "ruby",
          "s",
          "samp",
          "script",
          "section",
          "select",
          "slot",
          "small",
          "source",
          "span",
          "strong",
          "style",
          "sub",
          "summary",
          "sup",
          "svg",
          "table",
          "tbody",
          "td",
          "template",
          "textarea",
          "tfoot",
          "th",
          "thead",
          "time",
          "title",
          "tr",
          "track",
          "u",
          "ul",
          "var",
          "video",
          "wbr",
        ];
        function H(q) {
          return X.includes(q);
        }
        function se(q) {
          return ["transition-group", "TransitionGroup"].includes(q);
        }
        function Ee(q) {
          return (
            ["id", "class", "role", "style"].includes(q) ||
            q.startsWith("data-") ||
            q.startsWith("aria-") ||
            q.startsWith("on")
          );
        }
        function de(q) {
          return q.reduce(function (_, W) {
            var le = p(W, 2),
              ge = le[0],
              Ae = le[1];
            return (_[ge] = Ae), _;
          }, {});
        }
        function ne(q) {
          var _ = q.$attrs,
            W = q.componentData,
            le = W === void 0 ? {} : W,
            ge = de(
              Object.entries(_).filter(function (Ae) {
                var Pe = p(Ae, 2),
                  Ne = Pe[0];
                return Pe[1], Ee(Ne);
              })
            );
          return d(d({}, ge), le);
        }
        function N(q) {
          var _ = q.$attrs,
            W = q.callBackBuilder,
            le = de(ae(_));
          Object.entries(W).forEach(function (Ae) {
            var Pe = p(Ae, 2),
              Ne = Pe[0],
              it = Pe[1];
            xe[Ne].forEach(function (De) {
              le["on".concat(De)] = it(De);
            });
          });
          var ge = "[data-draggable]".concat(le.draggable || "");
          return d(d({}, le), {}, { draggable: ge });
        }
        function ae(q) {
          return Object.entries(q)
            .filter(function (_) {
              var W = p(_, 2),
                le = W[0];
              return W[1], !Ee(le);
            })
            .map(function (_) {
              var W = p(_, 2),
                le = W[0],
                ge = W[1];
              return [L(le), ge];
            })
            .filter(function (_) {
              var W = p(_, 2),
                le = W[0];
              return W[1], !J(le);
            });
        }
        i("c740");
        function U(q, _) {
          if (!(q instanceof _))
            throw new TypeError("Cannot call a class as a function");
        }
        function he(q, _) {
          for (var W = 0; W < _.length; W++) {
            var le = _[W];
            (le.enumerable = le.enumerable || !1),
              (le.configurable = !0),
              "value" in le && (le.writable = !0),
              Object.defineProperty(q, le.key, le);
          }
        }
        function Le(q, _, W) {
          return _ && he(q.prototype, _), W && he(q, W), q;
        }
        var R = function (_) {
            var W = _.el;
            return W;
          },
          P = function (_, W) {
            return (_.__draggable_context = W);
          },
          B = function (_) {
            return _.__draggable_context;
          },
          Q = (function () {
            function q(_) {
              var W = _.nodes,
                le = W.header,
                ge = W.default,
                Ae = W.footer,
                Pe = _.root,
                Ne = _.realList;
              U(this, q),
                (this.defaultNodes = ge),
                (this.children = [].concat(E(le), E(ge), E(Ae))),
                (this.externalComponent = Pe.externalComponent),
                (this.rootTransition = Pe.transition),
                (this.tag = Pe.tag),
                (this.realList = Ne);
            }
            return (
              Le(q, [
                {
                  key: "render",
                  value: function (W, le) {
                    var ge = this.tag,
                      Ae = this.children,
                      Pe = this._isRootComponent,
                      Ne = Pe
                        ? {
                            default: function () {
                              return Ae;
                            },
                          }
                        : Ae;
                    return W(ge, le, Ne);
                  },
                },
                {
                  key: "updated",
                  value: function () {
                    var W = this.defaultNodes,
                      le = this.realList;
                    W.forEach(function (ge, Ae) {
                      P(R(ge), { element: le[Ae], index: Ae });
                    });
                  },
                },
                {
                  key: "getUnderlyingVm",
                  value: function (W) {
                    return B(W);
                  },
                },
                {
                  key: "getVmIndexFromDomIndex",
                  value: function (W, le) {
                    var ge = this.defaultNodes,
                      Ae = ge.length,
                      Pe = le.children,
                      Ne = Pe.item(W);
                    if (Ne === null) return Ae;
                    var it = B(Ne);
                    if (it) return it.index;
                    if (Ae === 0) return 0;
                    var De = R(ge[0]),
                      Ce = E(Pe).findIndex(function (Ie) {
                        return Ie === De;
                      });
                    return W < Ce ? 0 : Ae;
                  },
                },
                {
                  key: "_isRootComponent",
                  get: function () {
                    return this.externalComponent || this.rootTransition;
                  },
                },
              ]),
              q
            );
          })(),
          Y = i("8bbf");
        function te(q, _) {
          var W = q[_];
          return W ? W() : [];
        }
        function ve(q) {
          var _ = q.$slots,
            W = q.realList,
            le = q.getKey,
            ge = W || [],
            Ae = ["header", "footer"].map(function (Ie) {
              return te(_, Ie);
            }),
            Pe = p(Ae, 2),
            Ne = Pe[0],
            it = Pe[1],
            De = _.item;
          if (!De) throw new Error("draggable element must have an item slot");
          var Ce = ge.flatMap(function (Ie, Ke) {
            return De({ element: Ie, index: Ke }).map(function (Xe) {
              return (
                (Xe.key = le(Ie)),
                (Xe.props = d(
                  d({}, Xe.props || {}),
                  {},
                  { "data-draggable": !0 }
                )),
                Xe
              );
            });
          });
          if (Ce.length !== ge.length)
            throw new Error("Item slot must have only one child");
          return { header: Ne, footer: it, default: Ce };
        }
        function ue(q) {
          var _ = se(q),
            W = !H(q) && !_;
          return {
            transition: _,
            externalComponent: W,
            tag: W ? Object(Y.resolveComponent)(q) : _ ? Y.TransitionGroup : q,
          };
        }
        function ie(q) {
          var _ = q.$slots,
            W = q.tag,
            le = q.realList,
            ge = q.getKey,
            Ae = ve({ $slots: _, realList: le, getKey: ge }),
            Pe = ue(W);
          return new Q({ nodes: Ae, root: Pe, realList: le });
        }
        function ee(q, _) {
          var W = this;
          Object(Y.nextTick)(function () {
            return W.$emit(q.toLowerCase(), _);
          });
        }
        function ye(q) {
          var _ = this;
          return function (W, le) {
            if (_.realList !== null) return _["onDrag".concat(q)](W, le);
          };
        }
        function K(q) {
          var _ = this,
            W = ye.call(this, q);
          return function (le, ge) {
            W.call(_, le, ge), ee.call(_, q, le);
          };
        }
        var ce = null,
          we = {
            list: { type: Array, required: !1, default: null },
            modelValue: { type: Array, required: !1, default: null },
            itemKey: { type: [String, Function], required: !0 },
            clone: {
              type: Function,
              default: function (_) {
                return _;
              },
            },
            tag: { type: String, default: "div" },
            move: { type: Function, default: null },
            componentData: { type: Object, required: !1, default: null },
          },
          ke = ["update:modelValue", "change"].concat(
            E(
              [].concat(E(xe.manageAndEmit), E(xe.emit)).map(function (q) {
                return q.toLowerCase();
              })
            )
          ),
          We = Object(Y.defineComponent)({
            name: "draggable",
            inheritAttrs: !1,
            props: we,
            emits: ke,
            data: function () {
              return { error: !1 };
            },
            render: function () {
              try {
                this.error = !1;
                var _ = this.$slots,
                  W = this.$attrs,
                  le = this.tag,
                  ge = this.componentData,
                  Ae = this.realList,
                  Pe = this.getKey,
                  Ne = ie({ $slots: _, tag: le, realList: Ae, getKey: Pe });
                this.componentStructure = Ne;
                var it = ne({ $attrs: W, componentData: ge });
                return Ne.render(Y.h, it);
              } catch (De) {
                return (
                  (this.error = !0),
                  Object(Y.h)("pre", { style: { color: "red" } }, De.stack)
                );
              }
            },
            created: function () {
              this.list !== null &&
                this.modelValue !== null &&
                D.a.error(
                  "modelValue and list props are mutually exclusive! Please set one or another."
                );
            },
            mounted: function () {
              var _ = this;
              if (!this.error) {
                var W = this.$attrs,
                  le = this.$el,
                  ge = this.componentStructure;
                ge.updated();
                var Ae = N({
                    $attrs: W,
                    callBackBuilder: {
                      manageAndEmit: function (it) {
                        return K.call(_, it);
                      },
                      emit: function (it) {
                        return ee.bind(_, it);
                      },
                      manage: function (it) {
                        return ye.call(_, it);
                      },
                    },
                  }),
                  Pe = le.nodeType === 1 ? le : le.parentElement;
                (this._sortable = new T.a(Pe, Ae)),
                  (this.targetDomElement = Pe),
                  (Pe.__draggable_component__ = this);
              }
            },
            updated: function () {
              this.componentStructure.updated();
            },
            beforeUnmount: function () {
              this._sortable !== void 0 && this._sortable.destroy();
            },
            computed: {
              realList: function () {
                var _ = this.list;
                return _ || this.modelValue;
              },
              getKey: function () {
                var _ = this.itemKey;
                return typeof _ == "function"
                  ? _
                  : function (W) {
                      return W[_];
                    };
              },
            },
            watch: {
              $attrs: {
                handler: function (_) {
                  var W = this._sortable;
                  !W ||
                    ae(_).forEach(function (le) {
                      var ge = p(le, 2),
                        Ae = ge[0],
                        Pe = ge[1];
                      W.option(Ae, Pe);
                    });
                },
                deep: !0,
              },
            },
            methods: {
              getUnderlyingVm: function (_) {
                return this.componentStructure.getUnderlyingVm(_) || null;
              },
              getUnderlyingPotencialDraggableComponent: function (_) {
                return _.__draggable_component__;
              },
              emitChanges: function (_) {
                var W = this;
                Object(Y.nextTick)(function () {
                  return W.$emit("change", _);
                });
              },
              alterList: function (_) {
                if (this.list) {
                  _(this.list);
                  return;
                }
                var W = E(this.modelValue);
                _(W), this.$emit("update:modelValue", W);
              },
              spliceList: function () {
                var _ = arguments,
                  W = function (ge) {
                    return ge.splice.apply(ge, E(_));
                  };
                this.alterList(W);
              },
              updatePosition: function (_, W) {
                var le = function (Ae) {
                  return Ae.splice(W, 0, Ae.splice(_, 1)[0]);
                };
                this.alterList(le);
              },
              getRelatedContextFromMoveEvent: function (_) {
                var W = _.to,
                  le = _.related,
                  ge = this.getUnderlyingPotencialDraggableComponent(W);
                if (!ge) return { component: ge };
                var Ae = ge.realList,
                  Pe = { list: Ae, component: ge };
                if (W !== le && Ae) {
                  var Ne = ge.getUnderlyingVm(le) || {};
                  return d(d({}, Ne), Pe);
                }
                return Pe;
              },
              getVmIndexFromDomIndex: function (_) {
                return this.componentStructure.getVmIndexFromDomIndex(
                  _,
                  this.targetDomElement
                );
              },
              onDragStart: function (_) {
                (this.context = this.getUnderlyingVm(_.item)),
                  (_.item._underlying_vm_ = this.clone(this.context.element)),
                  (ce = _.item);
              },
              onDragAdd: function (_) {
                var W = _.item._underlying_vm_;
                if (W !== void 0) {
                  x(_.item);
                  var le = this.getVmIndexFromDomIndex(_.newIndex);
                  this.spliceList(le, 0, W);
                  var ge = { element: W, newIndex: le };
                  this.emitChanges({ added: ge });
                }
              },
              onDragRemove: function (_) {
                if ((C(this.$el, _.item, _.oldIndex), _.pullMode === "clone")) {
                  x(_.clone);
                  return;
                }
                var W = this.context,
                  le = W.index,
                  ge = W.element;
                this.spliceList(le, 1);
                var Ae = { element: ge, oldIndex: le };
                this.emitChanges({ removed: Ae });
              },
              onDragUpdate: function (_) {
                x(_.item), C(_.from, _.item, _.oldIndex);
                var W = this.context.index,
                  le = this.getVmIndexFromDomIndex(_.newIndex);
                this.updatePosition(W, le);
                var ge = {
                  element: this.context.element,
                  oldIndex: W,
                  newIndex: le,
                };
                this.emitChanges({ moved: ge });
              },
              computeFutureIndex: function (_, W) {
                if (!_.element) return 0;
                var le = E(W.to.children).filter(function (Ne) {
                    return Ne.style.display !== "none";
                  }),
                  ge = le.indexOf(W.related),
                  Ae = _.component.getVmIndexFromDomIndex(ge),
                  Pe = le.indexOf(ce) !== -1;
                return Pe || !W.willInsertAfter ? Ae : Ae + 1;
              },
              onDragMove: function (_, W) {
                var le = this.move,
                  ge = this.realList;
                if (!le || !ge) return !0;
                var Ae = this.getRelatedContextFromMoveEvent(_),
                  Pe = this.computeFutureIndex(Ae, _),
                  Ne = d(d({}, this.context), {}, { futureIndex: Pe }),
                  it = d(
                    d({}, _),
                    {},
                    { relatedContext: Ae, draggedContext: Ne }
                  );
                return le(it, W);
              },
              onDragEnd: function () {
                ce = null;
              },
            },
          }),
          ze = We;
        a.default = ze;
      },
      fb6a: function (o, a, i) {
        var l = i("23e7"),
          s = i("861d"),
          u = i("e8b5"),
          c = i("23cb"),
          f = i("50c4"),
          d = i("fc6a"),
          h = i("8418"),
          v = i("b622"),
          m = i("1dde"),
          g = i("ae40"),
          y = m("slice"),
          p = g("slice", { ACCESSORS: !0, 0: 0, 1: 2 }),
          w = v("species"),
          b = [].slice,
          S = Math.max;
        l(
          { target: "Array", proto: !0, forced: !y || !p },
          {
            slice: function (A, T) {
              var x = d(this),
                C = f(x.length),
                D = c(A, C),
                I = c(T === void 0 ? C : T, C),
                $,
                L,
                G;
              if (
                u(x) &&
                (($ = x.constructor),
                typeof $ == "function" && ($ === Array || u($.prototype))
                  ? ($ = void 0)
                  : s($) && (($ = $[w]), $ === null && ($ = void 0)),
                $ === Array || $ === void 0)
              )
                return b.call(x, D, I);
              for (
                L = new ($ === void 0 ? Array : $)(S(I - D, 0)), G = 0;
                D < I;
                D++, G++
              )
                D in x && h(L, G, x[D]);
              return (L.length = G), L;
            },
          }
        );
      },
      fc6a: function (o, a, i) {
        var l = i("44ad"),
          s = i("1d80");
        o.exports = function (u) {
          return l(s(u));
        };
      },
      fdbc: function (o, a) {
        o.exports = {
          CSSRuleList: 0,
          CSSStyleDeclaration: 0,
          CSSValueList: 0,
          ClientRectList: 0,
          DOMRectList: 0,
          DOMStringList: 0,
          DOMTokenList: 1,
          DataTransferItemList: 0,
          FileList: 0,
          HTMLAllCollection: 0,
          HTMLCollection: 0,
          HTMLFormElement: 0,
          HTMLSelectElement: 0,
          MediaList: 0,
          MimeTypeArray: 0,
          NamedNodeMap: 0,
          NodeList: 1,
          PaintRequestList: 0,
          Plugin: 0,
          PluginArray: 0,
          SVGLengthList: 0,
          SVGNumberList: 0,
          SVGPathSegList: 0,
          SVGPointList: 0,
          SVGStringList: 0,
          SVGTransformList: 0,
          SourceBufferList: 0,
          StyleSheetList: 0,
          TextTrackCueList: 0,
          TextTrackList: 0,
          TouchList: 0,
        };
      },
      fdbf: function (o, a, i) {
        var l = i("4930");
        o.exports = l && !Symbol.sham && typeof Symbol.iterator == "symbol";
      },
    }).default;
  });
})(Qm);
var v1 = AC(Qm.exports);
const p1 = zn({
    name: "ShoppingLists",
    components: { draggable: v1 },
    setup() {
      const e = of(),
        {
          list: t,
          lists: n,
          loading: r,
          searchResult: o,
          inputCache: a,
          getListQuantity: i,
          listLoading: l,
          layout: s,
          sortedProducts: u,
          sortListDialog: c,
          sortLoading: f,
        } = kc(e),
        d = fe(""),
        h = fe(!1),
        v = async (m) => {
          (o.value.product = m), await e.searchLoadVariants(), (h.value = !0);
        };
      return {
        getListQuantity: i,
        sortedProducts: u,
        listLoading: l,
        searchResult: o,
        list: t,
        lists: n,
        loading: r,
        listsStore: e,
        filter: d,
        inputCache: a,
        editListDialog: fe(!1),
        createListDialog: fe(!1),
        confirmDeleteDialog: fe(!1),
        sortListDialog: c,
        sortLoading: f,
        chooseVariantDialog: h,
        openVariantDialog: v,
        layout: s,
        drag: fe(!1),
      };
    },
  }),
  m1 = { class: "q-pa-xs" },
  g1 = ["src"],
  y1 = et("div", { class: "text-h6" }, "Choose Size", -1),
  b1 = { class: "text-subtitle1" },
  S1 = et("small", null, "NEW", -1),
  w1 = { class: "list-group-item" },
  x1 = ["src"],
  E1 = { class: "text-h6" },
  C1 = et(
    "div",
    { class: "text-subtitle2" },
    " Please enter a name, and an optional description. ",
    -1
  ),
  O1 = { class: "q-ml-sm" },
  T1 = et("div", { class: "text-h6" }, "Add New list", -1),
  P1 = et(
    "div",
    { class: "text-subtitle2" },
    " Please enter a name, and an optional description. ",
    -1
  );
function R1(e, t, n, r, o, a) {
  const i = ia("draggable");
  return (
    lt(),
    kr("div", m1, [
      M(
        _u,
        { borderless: "" },
        {
          default: z(() => [
            M(_t, null, {
              default: z(() => [
                M(Je, null, {
                  default: z(() => [
                    M(
                      Zr,
                      {
                        filled: "",
                        placeholder: "Add products to list...",
                        "model-value": e.searchResult.searchTerm,
                        "onUpdate:modelValue": e.listsStore.searchProducts,
                        debounce: "300",
                        type: "search",
                        disable: !e.list || e.listLoading,
                      },
                      {
                        append: z(() => [
                          e.searchResult.searchTerm
                            ? (lt(),
                              It(
                                ot,
                                {
                                  key: 0,
                                  flat: "",
                                  round: "",
                                  icon: "close",
                                  class: "text-grey-8",
                                  onClick: e.listsStore.clearSearch,
                                },
                                null,
                                8,
                                ["onClick"]
                              ))
                            : Cn("", !0),
                          M(ot, {
                            flat: "",
                            round: "",
                            icon: "search",
                            class: "text-grey-8",
                          }),
                        ]),
                        _: 1,
                      },
                      8,
                      ["model-value", "onUpdate:modelValue", "disable"]
                    ),
                  ]),
                  _: 1,
                }),
                e.searchResult.loading
                  ? (lt(),
                    It(
                      Je,
                      { key: 0, side: "" },
                      { default: z(() => [M(Ea, { size: "24px" })]), _: 1 }
                    ))
                  : Cn("", !0),
              ]),
              _: 1,
            }),
            (lt(!0),
            kr(
              jt,
              null,
              fu(
                e.searchResult.result,
                (l) => (
                  lt(),
                  It(
                    _t,
                    { key: l.id },
                    {
                      default: z(() => [
                        M(
                          Je,
                          { avatar: "" },
                          {
                            default: z(() => [
                              M(
                                cn,
                                null,
                                {
                                  default: z(() => [
                                    et("img", { src: l.imgUrl }, null, 8, g1),
                                  ]),
                                  _: 2,
                                },
                                1024
                              ),
                            ]),
                            _: 2,
                          },
                          1024
                        ),
                        M(
                          Je,
                          null,
                          {
                            default: z(() => [
                              M(
                                At,
                                null,
                                { default: z(() => [Ge(tt(l.name), 1)]), _: 2 },
                                1024
                              ),
                              M(
                                At,
                                { caption: "", lines: "1" },
                                {
                                  default: z(() => [
                                    Ge(tt(l.calculated_price), 1),
                                  ]),
                                  _: 2,
                                },
                                1024
                              ),
                              M(
                                At,
                                { caption: "", lines: "1" },
                                {
                                  default: z(() => [
                                    Ge("SKU: " + tt(l.sku), 1),
                                  ]),
                                  _: 2,
                                },
                                1024
                              ),
                            ]),
                            _: 2,
                          },
                          1024
                        ),
                        M(
                          Je,
                          { side: "" },
                          {
                            default: z(() => [
                              M(
                                ot,
                                {
                                  dense: "",
                                  flat: "",
                                  round: "",
                                  icon: "add",
                                  color: "primary",
                                  onClick: (s) => e.openVariantDialog(l),
                                },
                                null,
                                8,
                                ["onClick"]
                              ),
                            ]),
                            _: 2,
                          },
                          1024
                        ),
                      ]),
                      _: 2,
                    },
                    1024
                  )
                )
              ),
              128
            )),
            M(
              lr,
              {
                modelValue: e.chooseVariantDialog,
                "onUpdate:modelValue":
                  t[1] || (t[1] = (l) => (e.chooseVariantDialog = l)),
                persistent: "",
              },
              {
                default: z(() => [
                  M(eo, null, {
                    default: z(() => [
                      M(Wn, null, {
                        default: z(() => [
                          y1,
                          et(
                            "div",
                            b1,
                            " Adding " +
                              tt(e.searchResult.product.name) +
                              " to " +
                              tt(e.list.name) +
                              " List. ",
                            1
                          ),
                        ]),
                        _: 1,
                      }),
                      M(Wn, null, {
                        default: z(() => [
                          M(
                            _s,
                            { onSubmit: e.listsStore.addSearchedProductToList },
                            {
                              default: z(() => [
                                M(
                                  Ki,
                                  {
                                    modelValue: e.searchResult.variant,
                                    "onUpdate:modelValue":
                                      t[0] ||
                                      (t[0] = (l) =>
                                        (e.searchResult.variant = l)),
                                    options: e.searchResult.variants,
                                    loading: e.searchResult.variantsLoading,
                                    dense: "",
                                    filled: "",
                                    placeholder: "Select Size Option",
                                  },
                                  {
                                    "no-option": z(() => [
                                      M(_t, null, {
                                        default: z(() => [
                                          M(
                                            Je,
                                            { class: "text-grey-8" },
                                            {
                                              default: z(() => [
                                                Ge(" Error loading variants. "),
                                              ]),
                                              _: 1,
                                            }
                                          ),
                                        ]),
                                        _: 1,
                                      }),
                                    ]),
                                    option: z((l) => [
                                      M(
                                        _t,
                                        Fi(Ko(l.itemProps)),
                                        {
                                          default: z(() => [
                                            M(
                                              Je,
                                              null,
                                              {
                                                default: z(() => [
                                                  M(
                                                    At,
                                                    null,
                                                    {
                                                      default: z(() => [
                                                        Ge(tt(l.opt.label), 1),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                  M(
                                                    At,
                                                    { caption: "" },
                                                    {
                                                      default: z(() => [
                                                        Ge(tt(l.opt.sku), 1),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                ]),
                                                _: 2,
                                              },
                                              1024
                                            ),
                                            M(
                                              Je,
                                              { side: "" },
                                              {
                                                default: z(() => [
                                                  Ge(" $" + tt(l.opt.price), 1),
                                                ]),
                                                _: 2,
                                              },
                                              1024
                                            ),
                                          ]),
                                          _: 2,
                                        },
                                        1040
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["modelValue", "options", "loading"]
                                ),
                                M(
                                  jo,
                                  { align: "right" },
                                  {
                                    default: z(() => [
                                      St(
                                        M(
                                          ot,
                                          {
                                            flat: "",
                                            square: "",
                                            color: "dark",
                                            label: "Cancel",
                                          },
                                          null,
                                          512
                                        ),
                                        [[gn]]
                                      ),
                                      St(
                                        M(
                                          ot,
                                          {
                                            flat: "",
                                            square: "",
                                            color: "primary",
                                            label: "Add Product",
                                            type: "submit",
                                            disable:
                                              e.searchResult.variantsLoading,
                                          },
                                          null,
                                          8,
                                          ["disable"]
                                        ),
                                        [[gn]]
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ["onSubmit"]
                          ),
                        ]),
                        _: 1,
                      }),
                    ]),
                    _: 1,
                  }),
                ]),
                _: 1,
              },
              8,
              ["modelValue"]
            ),
            e.searchResult.result ? (lt(), It(Gr, { key: 0 })) : Cn("", !0),
            (lt(!0),
            kr(
              jt,
              null,
              fu(e.lists, (l) =>
                St(
                  (lt(),
                  It(
                    _t,
                    {
                      key: l.id,
                      clickable: "",
                      to: `/${l.id}`,
                      active: l.id == e.$route.params.id,
                      "active-class": "active-list",
                      onClick:
                        t[2] ||
                        (t[2] = (s) =>
                          e.$q.screen.lt.md
                            ? e.listsStore.toggleLeftDrawer()
                            : null),
                    },
                    {
                      default: z(() => [
                        M(
                          Je,
                          null,
                          {
                            default: z(() => [
                              M(
                                At,
                                { class: "text-weight-bold" },
                                { default: z(() => [Ge(tt(l.name), 1)]), _: 2 },
                                1024
                              ),
                              M(
                                At,
                                { caption: "" },
                                {
                                  default: z(() => [Ge(tt(l.description), 1)]),
                                  _: 2,
                                },
                                1024
                              ),
                            ]),
                            _: 2,
                          },
                          1024
                        ),
                        M(
                          Je,
                          { side: "", class: "text-caption" },
                          {
                            default: z(() => [
                              Ge(
                                tt(
                                  l.totalCount === 1
                                    ? "1 Item"
                                    : `${l.totalCount} Items`
                                ) + " ",
                                1
                              ),
                              e.getListQuantity(l.id) > 0
                                ? (lt(),
                                  It(
                                    qu,
                                    {
                                      key: 0,
                                      dense: "",
                                      class:
                                        "bg-primary text-white text-caption",
                                    },
                                    {
                                      default: z(() => [
                                        Ge(
                                          tt(
                                            e.getListQuantity(l.id) === 1
                                              ? "1 Selected"
                                              : `${e.getListQuantity(
                                                  l.id
                                                )} Selected`
                                          ),
                                          1
                                        ),
                                      ]),
                                      _: 2,
                                    },
                                    1024
                                  ))
                                : Cn("", !0),
                            ]),
                            _: 2,
                          },
                          1024
                        ),
                      ]),
                      _: 2,
                    },
                    1032,
                    ["to", "active"]
                  )),
                  [[ir]]
                )
              ),
              128
            )),
            M(Gr),
            e.list && e.getListQuantity(e.list.id) > 0
              ? St(
                  (lt(),
                  It(
                    _t,
                    {
                      key: 1,
                      dense: "",
                      clickable: "",
                      disable: !e.list || e.listLoading,
                      onClick: e.listsStore.resetQuantities,
                    },
                    {
                      default: z(() => [
                        M(
                          Je,
                          { avatar: "" },
                          {
                            default: z(() => [
                              M(cn, null, {
                                default: z(() => [M(wt, { name: "clear" })]),
                                _: 1,
                              }),
                            ]),
                            _: 1,
                          }
                        ),
                        M(Je, null, {
                          default: z(() => [
                            M(
                              At,
                              { class: "text-bold" },
                              {
                                default: z(() => [
                                  Ge("Clear Selected Quantities"),
                                ]),
                                _: 1,
                              }
                            ),
                          ]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    },
                    8,
                    ["disable", "onClick"]
                  )),
                  [[ir]]
                )
              : Cn("", !0),
            e.list && e.getListQuantity(e.list.id) > 0
              ? (lt(), It(Gr, { key: 2 }))
              : Cn("", !0),
            St(
              (lt(),
              It(
                _t,
                {
                  dense: "",
                  clickable: "",
                  onClick:
                    t[3] || (t[3] = (l) => e.listsStore.prepareSortArray()),
                  disable: !e.list || e.listLoading,
                },
                {
                  default: z(() => [
                    M(
                      Je,
                      { avatar: "" },
                      {
                        default: z(() => [
                          M(cn, null, {
                            default: z(() => [M(wt, { name: "sort" })]),
                            _: 1,
                          }),
                        ]),
                        _: 1,
                      }
                    ),
                    M(Je, null, {
                      default: z(() => [
                        M(At, null, {
                          default: z(() => [Ge("Arrange Items")]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    }),
                    M(
                      Je,
                      { side: "" },
                      {
                        default: z(() => [
                          M(
                            qu,
                            { color: "primary", class: "text-white" },
                            { default: z(() => [S1]), _: 1 }
                          ),
                        ]),
                        _: 1,
                      }
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["disable"]
              )),
              [[ir]]
            ),
            M(
              lr,
              {
                modelValue: e.sortListDialog,
                "onUpdate:modelValue":
                  t[6] || (t[6] = (l) => (e.sortListDialog = l)),
              },
              {
                default: z(() => [
                  M(
                    im,
                    { class: "bg-white", container: "", view: "hHh lpR fFf" },
                    {
                      default: z(() => [
                        M(
                          Jp,
                          { elevated: "", class: "text-white bg-secondary" },
                          {
                            default: z(() => [
                              M(Bu, null, {
                                default: z(() => [
                                  M(Xp, null, {
                                    default: z(() => [
                                      Ge("Sorting " + tt(e.list.name), 1),
                                    ]),
                                    _: 1,
                                  }),
                                ]),
                                _: 1,
                              }),
                            ]),
                            _: 1,
                          }
                        ),
                        M(om, null, {
                          default: z(() => [
                            M(
                              eo,
                              { flat: "" },
                              {
                                default: z(() => [
                                  M(Wn, null, {
                                    default: z(() => [
                                      M(_u, null, {
                                        default: z(() => [
                                          M(
                                            i,
                                            {
                                              modelValue: e.sortedProducts,
                                              "onUpdate:modelValue":
                                                t[4] ||
                                                (t[4] = (l) =>
                                                  (e.sortedProducts = l)),
                                              tag: "tbody",
                                              "item-key": "itemId",
                                              class: "list-group",
                                              "ghost-class": "ghost",
                                            },
                                            {
                                              item: z(({ element: l }) => [
                                                et("div", w1, [
                                                  M(
                                                    _t,
                                                    null,
                                                    {
                                                      default: z(() => [
                                                        M(
                                                          Je,
                                                          { avatar: "" },
                                                          {
                                                            default: z(() => [
                                                              M(
                                                                cn,
                                                                null,
                                                                {
                                                                  default: z(
                                                                    () => [
                                                                      et(
                                                                        "img",
                                                                        {
                                                                          src: l.urlThumbnail,
                                                                        },
                                                                        null,
                                                                        8,
                                                                        x1
                                                                      ),
                                                                    ]
                                                                  ),
                                                                  _: 2,
                                                                },
                                                                1024
                                                              ),
                                                            ]),
                                                            _: 2,
                                                          },
                                                          1024
                                                        ),
                                                        M(
                                                          Je,
                                                          null,
                                                          {
                                                            default: z(() => [
                                                              M(
                                                                At,
                                                                null,
                                                                {
                                                                  default: z(
                                                                    () => [
                                                                      Ge(
                                                                        tt(
                                                                          l.name
                                                                        ),
                                                                        1
                                                                      ),
                                                                    ]
                                                                  ),
                                                                  _: 2,
                                                                },
                                                                1024
                                                              ),
                                                              M(
                                                                At,
                                                                {
                                                                  caption: "",
                                                                  lines: "1",
                                                                },
                                                                {
                                                                  default: z(
                                                                    () => [
                                                                      Ge(
                                                                        tt(
                                                                          l.calculated_price
                                                                        ),
                                                                        1
                                                                      ),
                                                                    ]
                                                                  ),
                                                                  _: 2,
                                                                },
                                                                1024
                                                              ),
                                                            ]),
                                                            _: 2,
                                                          },
                                                          1024
                                                        ),
                                                        M(
                                                          Je,
                                                          { side: "" },
                                                          {
                                                            default: z(() => [
                                                              M(wt, {
                                                                name: "drag_handle",
                                                              }),
                                                            ]),
                                                            _: 1,
                                                          }
                                                        ),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                  M(Gr),
                                                ]),
                                              ]),
                                              default: z(() => [
                                                M(_t, null, {
                                                  default: z(() => [
                                                    M(
                                                      Je,
                                                      { avatar: "" },
                                                      {
                                                        default: z(() => [
                                                          M(cn, null, {
                                                            default: z(() => [
                                                              M(wt, {
                                                                name: "drag_handle",
                                                              }),
                                                            ]),
                                                            _: 1,
                                                          }),
                                                        ]),
                                                        _: 1,
                                                      }
                                                    ),
                                                    M(Je, null, {
                                                      default: z(() => [
                                                        M(At, null, {
                                                          default: z(() => [
                                                            Ge(
                                                              "Drag and drop items to sort, then press 'Save'"
                                                            ),
                                                          ]),
                                                          _: 1,
                                                        }),
                                                      ]),
                                                      _: 1,
                                                    }),
                                                  ]),
                                                  _: 1,
                                                }),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["modelValue"]
                                          ),
                                        ]),
                                        _: 1,
                                      }),
                                    ]),
                                    _: 1,
                                  }),
                                ]),
                                _: 1,
                              }
                            ),
                          ]),
                          _: 1,
                        }),
                        M(
                          sE,
                          { elevated: "" },
                          {
                            default: z(() => [
                              M(
                                Bu,
                                { class: "bg-white" },
                                {
                                  default: z(() => [
                                    St(
                                      M(
                                        ot,
                                        {
                                          flat: "",
                                          square: "",
                                          color: "dark",
                                          label: "Cancel",
                                          icon: "arrow_back",
                                        },
                                        null,
                                        512
                                      ),
                                      [[gn]]
                                    ),
                                    M(lE),
                                    M(
                                      ot,
                                      {
                                        flat: "",
                                        square: "",
                                        loading: e.sortLoading,
                                        class: "bg-primary text-white",
                                        label: "Save",
                                        icon: "save",
                                        disabled: e.sortLoading,
                                        onClick:
                                          t[5] ||
                                          (t[5] = (l) =>
                                            e.listsStore.saveSortedList(
                                              e.sortedProducts
                                            )),
                                      },
                                      null,
                                      8,
                                      ["loading", "disabled"]
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                ]),
                _: 1,
              },
              8,
              ["modelValue"]
            ),
            St(
              (lt(),
              It(
                _t,
                {
                  dense: "",
                  clickable: "",
                  onClick: t[7] || (t[7] = (l) => (e.editListDialog = !0)),
                  disable: !e.list || e.listLoading,
                },
                {
                  default: z(() => [
                    M(
                      Je,
                      { avatar: "" },
                      {
                        default: z(() => [
                          M(cn, null, {
                            default: z(() => [M(wt, { name: "edit" })]),
                            _: 1,
                          }),
                        ]),
                        _: 1,
                      }
                    ),
                    M(Je, null, {
                      default: z(() => [
                        M(At, null, {
                          default: z(() => [Ge("Edit List")]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    }),
                  ]),
                  _: 1,
                },
                8,
                ["disable"]
              )),
              [[ir]]
            ),
            M(
              lr,
              {
                modelValue: e.editListDialog,
                "onUpdate:modelValue":
                  t[12] || (t[12] = (l) => (e.editListDialog = l)),
                persistent: "",
              },
              {
                default: z(() => [
                  M(eo, null, {
                    default: z(() => [
                      M(Wn, null, {
                        default: z(() => [
                          et("div", E1, "Edit " + tt(e.list.name), 1),
                          C1,
                        ]),
                        _: 1,
                      }),
                      M(Wn, null, {
                        default: z(() => [
                          M(
                            _s,
                            {
                              onSubmit:
                                t[11] ||
                                (t[11] = (l) =>
                                  e.listsStore.updateShoppingList()),
                            },
                            {
                              default: z(() => [
                                M(
                                  Zr,
                                  {
                                    modelValue: e.inputCache.editName,
                                    "onUpdate:modelValue":
                                      t[8] ||
                                      (t[8] = (l) =>
                                        (e.inputCache.editName = l)),
                                    label: "Name",
                                    type: "text",
                                    value: "toot",
                                    rules: [
                                      (l) => !!l || "* Required",
                                      (l) =>
                                        l.length > 2 ||
                                        "Please enter at least 3 characters",
                                    ],
                                  },
                                  null,
                                  8,
                                  ["modelValue", "rules"]
                                ),
                                M(
                                  Zr,
                                  {
                                    modelValue: e.inputCache.editDescription,
                                    "onUpdate:modelValue":
                                      t[9] ||
                                      (t[9] = (l) =>
                                        (e.inputCache.editDescription = l)),
                                    label: "Description",
                                    type: "textarea",
                                  },
                                  null,
                                  8,
                                  ["modelValue"]
                                ),
                                M(
                                  jo,
                                  { align: "right" },
                                  {
                                    default: z(() => [
                                      St(
                                        M(
                                          ot,
                                          {
                                            flat: "",
                                            square: "",
                                            color: "dark",
                                            label: "Cancel",
                                            onClick:
                                              t[10] ||
                                              (t[10] = (l) => (
                                                (e.inputCache.editName =
                                                  e.list.name),
                                                (e.inputCache.editDescription =
                                                  e.list.description)
                                              )),
                                          },
                                          null,
                                          512
                                        ),
                                        [[gn]]
                                      ),
                                      St(
                                        M(
                                          ot,
                                          {
                                            flat: "",
                                            square: "",
                                            color: "primary",
                                            label: "Submit",
                                            type: "submit",
                                          },
                                          null,
                                          512
                                        ),
                                        [[gn]]
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ]),
                              _: 1,
                            }
                          ),
                        ]),
                        _: 1,
                      }),
                    ]),
                    _: 1,
                  }),
                ]),
                _: 1,
              },
              8,
              ["modelValue"]
            ),
            St(
              (lt(),
              It(
                _t,
                {
                  dense: "",
                  clickable: "",
                  onClick:
                    t[13] || (t[13] = (l) => (e.confirmDeleteDialog = !0)),
                  disable: !e.list || e.listLoading,
                },
                {
                  default: z(() => [
                    M(
                      Je,
                      { avatar: "" },
                      {
                        default: z(() => [
                          M(cn, null, {
                            default: z(() => [M(wt, { name: "delete" })]),
                            _: 1,
                          }),
                        ]),
                        _: 1,
                      }
                    ),
                    M(Je, null, {
                      default: z(() => [
                        M(At, null, {
                          default: z(() => [Ge("Delete List")]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    }),
                  ]),
                  _: 1,
                },
                8,
                ["disable"]
              )),
              [[ir]]
            ),
            M(
              lr,
              {
                modelValue: e.confirmDeleteDialog,
                "onUpdate:modelValue":
                  t[15] || (t[15] = (l) => (e.confirmDeleteDialog = l)),
                persistent: "",
              },
              {
                default: z(() => [
                  M(eo, null, {
                    default: z(() => [
                      M(
                        Wn,
                        { class: "row items-center" },
                        {
                          default: z(() => [
                            M(cn, { icon: "warning" }),
                            et(
                              "span",
                              O1,
                              "Are you sure you want to delete list: " +
                                tt(e.list.name) +
                                "?",
                              1
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                      M(
                        jo,
                        { align: "right" },
                        {
                          default: z(() => [
                            St(
                              M(
                                ot,
                                { flat: "", label: "No", color: "dark" },
                                null,
                                512
                              ),
                              [[gn]]
                            ),
                            St(
                              M(
                                ot,
                                {
                                  flat: "",
                                  label: "Yes",
                                  color: "negative",
                                  onClick:
                                    t[14] ||
                                    (t[14] = (l) =>
                                      e.listsStore.deleteShoppingList()),
                                },
                                null,
                                512
                              ),
                              [[gn]]
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                    _: 1,
                  }),
                ]),
                _: 1,
              },
              8,
              ["modelValue"]
            ),
            M(Gr),
            St(
              (lt(),
              It(
                _t,
                {
                  dense: "",
                  clickable: "",
                  onClick: t[16] || (t[16] = (l) => (e.createListDialog = !0)),
                  disable: e.loading,
                },
                {
                  default: z(() => [
                    M(
                      Je,
                      { avatar: "" },
                      {
                        default: z(() => [
                          M(cn, null, {
                            default: z(() => [M(wt, { name: "add" })]),
                            _: 1,
                          }),
                        ]),
                        _: 1,
                      }
                    ),
                    M(Je, null, {
                      default: z(() => [
                        M(At, null, {
                          default: z(() => [Ge("New List")]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    }),
                  ]),
                  _: 1,
                },
                8,
                ["disable"]
              )),
              [[ir]]
            ),
            M(
              lr,
              {
                modelValue: e.createListDialog,
                "onUpdate:modelValue":
                  t[21] || (t[21] = (l) => (e.createListDialog = l)),
                persistent: "",
              },
              {
                default: z(() => [
                  M(eo, null, {
                    default: z(() => [
                      M(Wn, null, { default: z(() => [T1, P1]), _: 1 }),
                      M(Wn, null, {
                        default: z(() => [
                          M(
                            _s,
                            {
                              onSubmit:
                                t[20] ||
                                (t[20] = (l) =>
                                  e.listsStore.createShoppingList()),
                            },
                            {
                              default: z(() => [
                                M(
                                  Zr,
                                  {
                                    modelValue: e.inputCache.newName,
                                    "onUpdate:modelValue":
                                      t[17] ||
                                      (t[17] = (l) =>
                                        (e.inputCache.newName = l)),
                                    label: "Name",
                                    type: "text",
                                    rules: [
                                      (l) => !!l || "* Required",
                                      (l) =>
                                        l.length > 2 ||
                                        "Please enter at least 3 characters",
                                    ],
                                  },
                                  null,
                                  8,
                                  ["modelValue", "rules"]
                                ),
                                M(
                                  Zr,
                                  {
                                    modelValue: e.inputCache.newDescription,
                                    "onUpdate:modelValue":
                                      t[18] ||
                                      (t[18] = (l) =>
                                        (e.inputCache.newDescription = l)),
                                    label: "Description",
                                    type: "textarea",
                                  },
                                  null,
                                  8,
                                  ["modelValue"]
                                ),
                                M(
                                  jo,
                                  { align: "right" },
                                  {
                                    default: z(() => [
                                      St(
                                        M(
                                          ot,
                                          {
                                            flat: "",
                                            square: "",
                                            color: "dark",
                                            label: "Cancel",
                                            onClick:
                                              t[19] ||
                                              (t[19] = (l) => (
                                                (e.inputCache.newName = null),
                                                (e.inputCache.newDescription =
                                                  null)
                                              )),
                                          },
                                          null,
                                          512
                                        ),
                                        [[gn]]
                                      ),
                                      St(
                                        M(
                                          ot,
                                          {
                                            flat: "",
                                            square: "",
                                            color: "primary",
                                            label: "Submit",
                                            type: "submit",
                                          },
                                          null,
                                          512
                                        ),
                                        [[gn]]
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ]),
                              _: 1,
                            }
                          ),
                        ]),
                        _: 1,
                      }),
                    ]),
                    _: 1,
                  }),
                ]),
                _: 1,
              },
              8,
              ["modelValue"]
            ),
            M(Gr),
            St(
              (lt(),
              It(
                _t,
                { dense: "", clickable: "", onClick: e.listsStore.closeList },
                {
                  default: z(() => [
                    M(
                      Je,
                      { avatar: "" },
                      {
                        default: z(() => [
                          M(cn, null, {
                            default: z(() => [M(wt, { name: "arrow_back" })]),
                            _: 1,
                          }),
                        ]),
                        _: 1,
                      }
                    ),
                    M(Je, null, {
                      default: z(() => [
                        M(At, null, {
                          default: z(() => [Ge("Back to main website")]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    }),
                  ]),
                  _: 1,
                },
                8,
                ["onClick"]
              )),
              [[ir]]
            ),
          ]),
          _: 1,
        }
      ),
    ])
  );
}
var A1 = ci(p1, [["render", R1]]);
const I1 = {
    setup() {
      const e = pw(),
        t = of(),
        { leftDrawerOpen: n, layout: r } = kc(t);
      return (
        Ft(async () => {
          var a;
          (await t.setApi()) &&
            ((t.layout = !0),
            await t.fetchShoppingLists(),
            (a = e == null ? void 0 : e.params) != null &&
              a.id &&
              t.setList(e.params.id),
            me(() => e.params.id, t.setList));
        }),
        { listsStore: t, leftDrawerOpen: n, layout: r }
      );
    },
    components: { ShoppingLists: A1 },
  },
  L1 = { class: "q-pa-md" },
  k1 = { class: "row justify-center" };
function D1(e, t, n, r, o, a) {
  const i = ia("ShoppingLists"),
    l = ia("router-view");
  return (
    lt(),
    kr(
      jt,
      null,
      [
        et("div", L1, [
          et("div", k1, [
            M(
              ot,
              {
                square: "",
                icon: "list",
                class: "bg-secondary text-white",
                onClick: t[0] || (t[0] = (s) => (r.layout = !0)),
              },
              { default: z(() => [Ge(" Open Shopping Lists ")]), _: 1 }
            ),
          ]),
        ]),
        M(
          lr,
          {
            persistent: "",
            maximized: "",
            modelValue: r.layout,
            "onUpdate:modelValue": t[3] || (t[3] = (s) => (r.layout = s)),
          },
          {
            default: z(() => [
              M(
                im,
                { container: "", view: "hHh lpR fFf" },
                {
                  default: z(() => [
                    M(
                      Jp,
                      { reveal: "", class: "bg-secondary text-white" },
                      {
                        default: z(() => [
                          M(Bu, null, {
                            default: z(() => [
                              M(
                                ot,
                                {
                                  dense: "",
                                  flat: "",
                                  square: "",
                                  icon: "menu",
                                  label: "View Lists",
                                  onClick: r.listsStore.toggleLeftDrawer,
                                },
                                null,
                                8,
                                ["onClick"]
                              ),
                              M(Xp),
                              M(ot, {
                                dense: "",
                                flat: "",
                                square: "",
                                icon: "close",
                                class: "text-white",
                                label: "close",
                                onClick:
                                  t[1] || (t[1] = (s) => (r.layout = !1)),
                              }),
                            ]),
                            _: 1,
                          }),
                        ]),
                        _: 1,
                      }
                    ),
                    M(
                      mx,
                      {
                        "show-if-above": "",
                        persistent: "",
                        modelValue: r.leftDrawerOpen,
                        "onUpdate:modelValue":
                          t[2] || (t[2] = (s) => (r.leftDrawerOpen = s)),
                        side: "left",
                        bordered: "",
                      },
                      { default: z(() => [M(i)]), _: 1 },
                      8,
                      ["modelValue"]
                    ),
                    M(om, null, { default: z(() => [M(l)]), _: 1 }),
                  ]),
                  _: 1,
                }
              ),
            ]),
            _: 1,
          },
          8,
          ["modelValue"]
        ),
      ],
      64
    )
  );
}
var M1 = ci(I1, [["render", D1]]),
  $1 = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: M1 },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  F1 = Ue({
    name: "QPage",
    props: { padding: Boolean, styleFn: Function },
    setup(e, { slots: t }) {
      const {
          proxy: { $q: n },
        } = Fe(),
        r = qt(wo, $t);
      if (r === $t)
        return console.error("QPage needs to be a deep child of QLayout"), $t;
      if (qt(gp, $t) === $t)
        return console.error("QPage needs to be child of QPageContainer"), $t;
      const a = O(() => {
          const l =
            (r.header.space === !0 ? r.header.size : 0) +
            (r.footer.space === !0 ? r.footer.size : 0);
          if (typeof e.styleFn == "function") {
            const s =
              r.isContainer.value === !0
                ? r.containerHeight.value
                : n.screen.height;
            return e.styleFn(l, s);
          }
          return {
            minHeight:
              r.isContainer.value === !0
                ? r.containerHeight.value - l + "px"
                : n.screen.height === 0
                ? l !== 0
                  ? `calc(100vh - ${l}px)`
                  : "100vh"
                : n.screen.height - l + "px",
          };
        }),
        i = O(() => `q-page${e.padding === !0 ? " q-layout-padding" : ""}`);
      return () => k("main", { class: i.value, style: a.value }, ht(t.default));
    },
  });
const N1 = zn({ name: "IndexPage" }),
  B1 = { class: "text-h6" };
function j1(e, t, n, r, o, a) {
  return (
    lt(),
    It(
      F1,
      { class: "flex flex-center bg-white" },
      {
        default: z(() => [
          et("div", B1, [
            M(wt, { name: "arrow_left" }),
            Ge(
              " Select a Shopping List to open, or create a new List, using the menu to the left. "
            ),
          ]),
        ]),
        _: 1,
      }
    )
  );
}
var V1 = ci(N1, [["render", j1]]),
  q1 = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: V1 },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  wr = Ue({
    name: "QTd",
    props: { props: Object, autoWidth: Boolean, noHover: Boolean },
    setup(e, { slots: t }) {
      const n = Fe(),
        r = O(
          () =>
            "q-td" +
            (e.autoWidth === !0 ? " q-table--col-auto-width" : "") +
            (e.noHover === !0 ? " q-td--no-hover" : "") +
            " "
        );
      return () => {
        if (e.props === void 0)
          return k("td", { class: r.value }, ht(t.default));
        const o = n.vnode.key,
          a =
            (e.props.colsMap !== void 0 ? e.props.colsMap[o] : null) ||
            e.props.col;
        if (a === void 0) return;
        const { row: i } = e.props;
        return k(
          "td",
          { class: r.value + a.__tdClass(i), style: a.__tdStyle(i) },
          ht(t.default)
        );
      };
    },
  }),
  Ah = Ue({
    name: "QTr",
    props: { props: Object, noHover: Boolean },
    setup(e, { slots: t }) {
      const n = O(
        () =>
          "q-tr" +
          (e.props === void 0 || e.props.header === !0
            ? ""
            : " " + e.props.__trClass) +
          (e.noHover === !0 ? " q-tr--no-hover" : "")
      );
      return () => k("tr", { class: n.value }, ht(t.default));
    },
  }),
  H1 = Ue({
    name: "QTh",
    props: { props: Object, autoWidth: Boolean },
    emits: ["click"],
    setup(e, { slots: t, emit: n }) {
      const r = Fe(),
        {
          proxy: { $q: o },
        } = r,
        a = (i) => {
          n("click", i);
        };
      return () => {
        if (e.props === void 0)
          return k(
            "th",
            {
              class: e.autoWidth === !0 ? "q-table--col-auto-width" : "",
              onClick: a,
            },
            ht(t.default)
          );
        let i, l;
        const s = r.vnode.key;
        if (s) {
          if (((i = e.props.colsMap[s]), i === void 0)) return;
        } else i = e.props.col;
        if (i.sortable === !0) {
          const c = i.align === "right" ? "unshift" : "push";
          (l = jc(t.default, [])),
            l[c](
              k(wt, { class: i.__iconClass, name: o.iconSet.table.arrowUp })
            );
        } else l = ht(t.default);
        const u = {
          class:
            i.__thClass +
            (e.autoWidth === !0 ? " q-table--col-auto-width" : ""),
          style: i.headerStyle,
          onClick: (c) => {
            i.sortable === !0 && e.props.sort(i), a(c);
          },
        };
        return k("th", u, l);
      };
    },
  });
const _1 = ["horizontal", "vertical", "cell", "none"];
var U1 = Ue({
  name: "QMarkupTable",
  props: {
    ...In,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    wrapCells: Boolean,
    separator: {
      type: String,
      default: "horizontal",
      validator: (e) => _1.includes(e),
    },
  },
  setup(e, { slots: t }) {
    const n = Fe(),
      r = Ln(e, n.proxy.$q),
      o = O(
        () =>
          `q-markup-table q-table__container q-table__card q-table--${e.separator}-separator` +
          (r.value === !0 ? " q-table--dark q-table__card--dark q-dark" : "") +
          (e.dense === !0 ? " q-table--dense" : "") +
          (e.flat === !0 ? " q-table--flat" : "") +
          (e.bordered === !0 ? " q-table--bordered" : "") +
          (e.square === !0 ? " q-table--square" : "") +
          (e.wrapCells === !1 ? " q-table--no-wrap" : "")
      );
    return () =>
      k("div", { class: o.value }, [
        k("table", { class: "q-table" }, ht(t.default)),
      ]);
  },
});
function ag(e, t) {
  return k("div", e, [k("table", { class: "q-table" }, t)]);
}
const z1 = { list: _u, table: U1 },
  K1 = ["list", "table", "__qtable"];
var W1 = Ue({
  name: "QVirtualScroll",
  props: {
    ...Em,
    type: { type: String, default: "list", validator: (e) => K1.includes(e) },
    items: { type: Array, default: () => [] },
    itemsFn: Function,
    itemsSize: Number,
    scrollTarget: { default: void 0 },
  },
  setup(e, { slots: t, attrs: n }) {
    let r;
    const o = fe(null),
      a = O(() =>
        e.itemsSize >= 0 && e.itemsFn !== void 0
          ? parseInt(e.itemsSize, 10)
          : Array.isArray(e.items)
          ? e.items.length
          : 0
      ),
      {
        virtualScrollSliceRange: i,
        localResetVirtualScroll: l,
        padVirtualScroll: s,
        onVirtualScrollEvt: u,
      } = Cm({
        virtualScrollLength: a,
        getVirtualScrollTarget: v,
        getVirtualScrollEl: h,
      }),
      c = O(() => {
        if (a.value === 0) return [];
        const p = (w, b) => ({ index: i.value.from + b, item: w });
        return e.itemsFn === void 0
          ? e.items.slice(i.value.from, i.value.to).map(p)
          : e.itemsFn(i.value.from, i.value.to - i.value.from).map(p);
      }),
      f = O(
        () =>
          "q-virtual-scroll q-virtual-scroll" +
          (e.virtualScrollHorizontal === !0 ? "--horizontal" : "--vertical") +
          (e.scrollTarget !== void 0 ? "" : " scroll")
      ),
      d = O(() => (e.scrollTarget !== void 0 ? {} : { tabindex: 0 }));
    me(a, () => {
      l();
    }),
      me(
        () => e.scrollTarget,
        () => {
          g(), m();
        }
      );
    function h() {
      return o.value.$el || o.value;
    }
    function v() {
      return r;
    }
    function m() {
      (r = Kc(h(), e.scrollTarget)),
        r.addEventListener("scroll", u, kt.passive);
    }
    function g() {
      r !== void 0 &&
        (r.removeEventListener("scroll", u, kt.passive), (r = void 0));
    }
    function y() {
      let p = s(e.type === "list" ? "div" : "tbody", c.value.map(t.default));
      return t.before !== void 0 && (p = t.before().concat(p)), qn(t.after, p);
    }
    return (
      Sa(() => {
        l();
      }),
      Ft(() => {
        m();
      }),
      si(() => {
        m();
      }),
      qr(() => {
        g();
      }),
      vt(() => {
        g();
      }),
      () => {
        if (t.default === void 0) {
          console.error(
            "QVirtualScroll: default scoped slot is required for rendering"
          );
          return;
        }
        return e.type === "__qtable"
          ? ag({ ref: o, class: "q-table__middle " + f.value }, y())
          : k(
              z1[e.type],
              { ...n, ref: o, class: [n.class, f.value], ...d.value },
              y
            );
      }
    );
  },
});
const Q1 = { xs: 2, sm: 4, md: 6, lg: 10, xl: 14 };
function Ih(e, t, n) {
  return {
    transform:
      t === !0
        ? `translateX(${n.lang.rtl === !0 ? "-" : ""}100%) scale3d(${-e},1,1)`
        : `scale3d(${e},1,1)`,
  };
}
var G1 = Ue({
  name: "QLinearProgress",
  props: {
    ...In,
    ...fi,
    value: { type: Number, default: 0 },
    buffer: Number,
    color: String,
    trackColor: String,
    reverse: Boolean,
    stripe: Boolean,
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean,
    animationSpeed: { type: [String, Number], default: 2100 },
    instantFeedback: Boolean,
  },
  setup(e, { slots: t }) {
    const { proxy: n } = Fe(),
      r = Ln(e, n.$q),
      o = di(e, Q1),
      a = O(() => e.indeterminate === !0 || e.query === !0),
      i = O(() => e.reverse !== e.query),
      l = O(() => ({
        ...(o.value !== null ? o.value : {}),
        "--q-linear-progress-speed": `${e.animationSpeed}ms`,
      })),
      s = O(
        () =>
          "q-linear-progress" +
          (e.color !== void 0 ? ` text-${e.color}` : "") +
          (e.reverse === !0 || e.query === !0
            ? " q-linear-progress--reverse"
            : "") +
          (e.rounded === !0 ? " rounded-borders" : "")
      ),
      u = O(() => Ih(e.buffer !== void 0 ? e.buffer : 1, i.value, n.$q)),
      c = O(() => `with${e.instantFeedback === !0 ? "out" : ""}-transition`),
      f = O(
        () =>
          `q-linear-progress__track absolute-full q-linear-progress__track--${
            c.value
          } q-linear-progress__track--${r.value === !0 ? "dark" : "light"}` +
          (e.trackColor !== void 0 ? ` bg-${e.trackColor}` : "")
      ),
      d = O(() => Ih(a.value === !0 ? 1 : e.value, i.value, n.$q)),
      h = O(
        () =>
          `q-linear-progress__model absolute-full q-linear-progress__model--${
            c.value
          } q-linear-progress__model--${a.value === !0 ? "in" : ""}determinate`
      ),
      v = O(() => ({ width: `${e.value * 100}%` })),
      m = O(
        () =>
          `q-linear-progress__stripe absolute-${
            e.reverse === !0 ? "right" : "left"
          } q-linear-progress__stripe--${c.value}`
      );
    return () => {
      const g = [
        k("div", { class: f.value, style: u.value }),
        k("div", { class: h.value, style: d.value }),
      ];
      return (
        e.stripe === !0 &&
          a.value === !1 &&
          g.push(k("div", { class: m.value, style: v.value })),
        k(
          "div",
          {
            class: s.value,
            style: l.value,
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 1,
            "aria-valuenow": e.indeterminate === !0 ? void 0 : e.value,
          },
          qn(t.default, g)
        )
      );
    };
  },
});
function X1(e, t) {
  const n = fe(null),
    r = O(() =>
      e.disable === !0
        ? null
        : k("span", { ref: n, class: "no-outline", tabindex: -1 })
    );
  function o(a) {
    const i = t.value;
    a !== void 0 && a.type.indexOf("key") === 0
      ? i !== null &&
        document.activeElement !== i &&
        i.contains(document.activeElement) === !0 &&
        i.focus()
      : n.value !== null &&
        (a === void 0 || (i !== null && i.contains(a.target) === !0)) &&
        n.value.focus();
  }
  return { refocusTargetEl: r, refocusTarget: o };
}
var Y1 = { xs: 30, sm: 35, md: 40, lg: 50, xl: 60 };
const J1 = {
    ...In,
    ...fi,
    ...Jc,
    modelValue: { required: !0, default: null },
    val: {},
    trueValue: { default: !0 },
    falseValue: { default: !1 },
    indeterminateValue: { default: null },
    checkedIcon: String,
    uncheckedIcon: String,
    indeterminateIcon: String,
    toggleOrder: { type: String, validator: (e) => e === "tf" || e === "ft" },
    toggleIndeterminate: Boolean,
    label: String,
    leftLabel: Boolean,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number],
  },
  Z1 = ["update:modelValue"];
function eO(e, t) {
  const { props: n, slots: r, emit: o, proxy: a } = Fe(),
    { $q: i } = a,
    l = Ln(n, i),
    s = fe(null),
    { refocusTargetEl: u, refocusTarget: c } = X1(n, s),
    f = di(n, Y1),
    d = O(() => n.val !== void 0 && Array.isArray(n.modelValue)),
    h = O(() => {
      const I = He(n.val);
      return d.value === !0 ? n.modelValue.findIndex(($) => He($) === I) : -1;
    }),
    v = O(() =>
      d.value === !0 ? h.value > -1 : He(n.modelValue) === He(n.trueValue)
    ),
    m = O(() =>
      d.value === !0 ? h.value === -1 : He(n.modelValue) === He(n.falseValue)
    ),
    g = O(() => v.value === !1 && m.value === !1),
    y = O(() => (n.disable === !0 ? -1 : n.tabindex || 0)),
    p = O(
      () =>
        `q-${e} cursor-pointer no-outline row inline no-wrap items-center` +
        (n.disable === !0 ? " disabled" : "") +
        (l.value === !0 ? ` q-${e}--dark` : "") +
        (n.dense === !0 ? ` q-${e}--dense` : "") +
        (n.leftLabel === !0 ? " reverse" : "")
    ),
    w = O(() => {
      const I = v.value === !0 ? "truthy" : m.value === !0 ? "falsy" : "indet",
        $ =
          n.color !== void 0 &&
          (n.keepColor === !0 ||
            (e === "toggle" ? v.value === !0 : m.value !== !0))
            ? ` text-${n.color}`
            : "";
      return `q-${e}__inner relative-position non-selectable q-${e}__inner--${I}${$}`;
    }),
    b = O(() => {
      const I = { type: "checkbox" };
      return (
        n.name !== void 0 &&
          Object.assign(I, {
            ".checked": v.value,
            "^checked": v.value === !0 ? "checked" : void 0,
            name: n.name,
            value: d.value === !0 ? n.val : n.trueValue,
          }),
        I
      );
    }),
    S = Bx(b),
    E = O(() => {
      const I = {
        tabindex: y.value,
        role: e === "toggle" ? "switch" : "checkbox",
        "aria-label": n.label,
        "aria-checked":
          g.value === !0 ? "mixed" : v.value === !0 ? "true" : "false",
      };
      return n.disable === !0 && (I["aria-disabled"] = "true"), I;
    });
  function A(I) {
    I !== void 0 && (Dt(I), c(I)),
      n.disable !== !0 && o("update:modelValue", T(), I);
  }
  function T() {
    if (d.value === !0) {
      if (v.value === !0) {
        const I = n.modelValue.slice();
        return I.splice(h.value, 1), I;
      }
      return n.modelValue.concat([n.val]);
    }
    if (v.value === !0) {
      if (n.toggleOrder !== "ft" || n.toggleIndeterminate === !1)
        return n.falseValue;
    } else if (m.value === !0) {
      if (n.toggleOrder === "ft" || n.toggleIndeterminate === !1)
        return n.trueValue;
    } else return n.toggleOrder !== "ft" ? n.trueValue : n.falseValue;
    return n.indeterminateValue;
  }
  function x(I) {
    (I.keyCode === 13 || I.keyCode === 32) && Dt(I);
  }
  function C(I) {
    (I.keyCode === 13 || I.keyCode === 32) && A(I);
  }
  const D = t(v, g);
  return (
    Object.assign(a, { toggle: A }),
    () => {
      const I = D();
      n.disable !== !0 &&
        S(I, "unshift", ` q-${e}__native absolute q-ma-none q-pa-none`);
      const $ = [
        k("div", { class: w.value, style: f.value, "aria-hidden": "true" }, I),
      ];
      u.value !== null && $.push(u.value);
      const L = n.label !== void 0 ? qn(r.default, [n.label]) : ht(r.default);
      return (
        L !== void 0 &&
          $.push(k("div", { class: `q-${e}__label q-anchor--skip` }, L)),
        k(
          "div",
          {
            ref: s,
            class: p.value,
            ...E.value,
            onClick: A,
            onKeydown: x,
            onKeyup: C,
          },
          $
        )
      );
    }
  );
}
const tO = k("div", { key: "svg", class: "q-checkbox__bg absolute" }, [
  k(
    "svg",
    { class: "q-checkbox__svg fit absolute-full", viewBox: "0 0 24 24" },
    [
      k("path", {
        class: "q-checkbox__truthy",
        fill: "none",
        d: "M1.73,12.91 8.1,19.28 22.79,4.59",
      }),
      k("path", { class: "q-checkbox__indet", d: "M4,14H20V10H4" }),
    ]
  ),
]);
var iu = Ue({
  name: "QCheckbox",
  props: J1,
  emits: Z1,
  setup(e) {
    function t(n, r) {
      const o = O(
        () =>
          (n.value === !0
            ? e.checkedIcon
            : r.value === !0
            ? e.indeterminateIcon
            : e.uncheckedIcon) || null
      );
      return () =>
        o.value !== null
          ? [
              k(
                "div",
                {
                  key: "icon",
                  class:
                    "q-checkbox__icon-container absolute-full flex flex-center no-wrap",
                },
                [k(wt, { class: "q-checkbox__icon", name: o.value })]
              ),
            ]
          : [tO];
    }
    return eO("checkbox", t);
  },
});
let Ci = 0;
const nO = { fullscreen: Boolean, noRouteFullscreenExit: Boolean },
  rO = ["update:fullscreen", "fullscreen"];
function oO() {
  const e = Fe(),
    { props: t, emit: n, proxy: r } = e;
  let o, a, i;
  const l = fe(!1);
  Vc(e) === !0 &&
    me(
      () => r.$route.fullPath,
      () => {
        t.noRouteFullscreenExit !== !0 && c();
      }
    ),
    me(
      () => t.fullscreen,
      (f) => {
        l.value !== f && s();
      }
    ),
    me(l, (f) => {
      n("update:fullscreen", f), n("fullscreen", f);
    });
  function s() {
    l.value === !0 ? c() : u();
  }
  function u() {
    l.value !== !0 &&
      ((l.value = !0),
      (i = r.$el.parentNode),
      i.replaceChild(a, r.$el),
      document.body.appendChild(r.$el),
      Ci++,
      Ci === 1 && document.body.classList.add("q-body--fullscreen-mixin"),
      (o = { handler: c }),
      ua.add(o));
  }
  function c() {
    l.value === !0 &&
      (o !== void 0 && (ua.remove(o), (o = void 0)),
      i.replaceChild(r.$el, a),
      (l.value = !1),
      (Ci = Math.max(0, Ci - 1)),
      Ci === 0 &&
        (document.body.classList.remove("q-body--fullscreen-mixin"),
        r.$el.scrollIntoView !== void 0 &&
          setTimeout(() => {
            r.$el.scrollIntoView();
          })));
  }
  return (
    Sa(() => {
      a = document.createElement("span");
    }),
    Ft(() => {
      t.fullscreen === !0 && u();
    }),
    vt(c),
    Object.assign(r, {
      toggleFullscreen: s,
      setFullscreen: u,
      exitFullscreen: c,
    }),
    { inFullscreen: l, toggleFullscreen: s }
  );
}
function iO(e, t) {
  return new Date(e) - new Date(t);
}
const aO = {
  sortMethod: Function,
  binaryStateSort: Boolean,
  columnSortOrder: {
    type: String,
    validator: (e) => e === "ad" || e === "da",
    default: "ad",
  },
};
function lO(e, t, n, r) {
  const o = O(() => {
      const { sortBy: l } = t.value;
      return (l && n.value.find((s) => s.name === l)) || null;
    }),
    a = O(() =>
      e.sortMethod !== void 0
        ? e.sortMethod
        : (l, s, u) => {
            const c = n.value.find((h) => h.name === s);
            if (c === void 0 || c.field === void 0) return l;
            const f = u === !0 ? -1 : 1,
              d =
                typeof c.field == "function"
                  ? (h) => c.field(h)
                  : (h) => h[c.field];
            return l.sort((h, v) => {
              let m = d(h),
                g = d(v);
              return m == null
                ? -1 * f
                : g == null
                ? 1 * f
                : c.sort !== void 0
                ? c.sort(m, g, h, v) * f
                : Pu(m) === !0 && Pu(g) === !0
                ? (m - g) * f
                : Tu(m) === !0 && Tu(g) === !0
                ? iO(m, g) * f
                : typeof m == "boolean" && typeof g == "boolean"
                ? (m - g) * f
                : (([m, g] = [m, g].map((y) =>
                    (y + "").toLocaleString().toLowerCase()
                  )),
                  m < g ? -1 * f : m === g ? 0 : f);
            });
          }
    );
  function i(l) {
    let s = e.columnSortOrder;
    if (yo(l) === !0) l.sortOrder && (s = l.sortOrder), (l = l.name);
    else {
      const f = n.value.find((d) => d.name === l);
      f !== void 0 && f.sortOrder && (s = f.sortOrder);
    }
    let { sortBy: u, descending: c } = t.value;
    u !== l
      ? ((u = l), (c = s === "da"))
      : e.binaryStateSort === !0
      ? (c = !c)
      : c === !0
      ? s === "ad"
        ? (u = null)
        : (c = !1)
      : s === "ad"
      ? (c = !0)
      : (u = null),
      r({ sortBy: u, descending: c, page: 1 });
  }
  return { columnToSort: o, computedSortMethod: a, sort: i };
}
const sO = { filter: [String, Object], filterMethod: Function };
function uO(e, t) {
  const n = O(() =>
    e.filterMethod !== void 0
      ? e.filterMethod
      : (r, o, a, i) => {
          const l = o ? o.toLowerCase() : "";
          return r.filter((s) =>
            a.some((u) => {
              const c = i(u, s) + "";
              return (
                (c === "undefined" || c === "null"
                  ? ""
                  : c.toLowerCase()
                ).indexOf(l) !== -1
              );
            })
          );
        }
  );
  return (
    me(
      () => e.filter,
      () => {
        at(() => {
          t({ page: 1 }, !0);
        });
      },
      { deep: !0 }
    ),
    { computedFilterMethod: n }
  );
}
function cO(e, t) {
  for (const n in t) if (t[n] !== e[n]) return !1;
  return !0;
}
function Lh(e) {
  return (
    e.page < 1 && (e.page = 1),
    e.rowsPerPage !== void 0 && e.rowsPerPage < 1 && (e.rowsPerPage = 0),
    e
  );
}
const fO = {
  pagination: Object,
  rowsPerPageOptions: {
    type: Array,
    default: () => [5, 7, 10, 15, 20, 25, 50, 0],
  },
  "onUpdate:pagination": [Function, Array],
};
function dO(e, t) {
  const { props: n, emit: r } = e,
    o = fe(
      Object.assign(
        {
          sortBy: null,
          descending: !1,
          page: 1,
          rowsPerPage:
            n.rowsPerPageOptions.length !== 0 ? n.rowsPerPageOptions[0] : 5,
        },
        n.pagination
      )
    ),
    a = O(() => {
      const c =
        n["onUpdate:pagination"] !== void 0
          ? { ...o.value, ...n.pagination }
          : o.value;
      return Lh(c);
    }),
    i = O(() => a.value.rowsNumber !== void 0);
  function l(c) {
    s({ pagination: c, filter: n.filter });
  }
  function s(c = {}) {
    at(() => {
      r("request", {
        pagination: c.pagination || a.value,
        filter: c.filter || n.filter,
        getCellValue: t,
      });
    });
  }
  function u(c, f) {
    const d = Lh({ ...a.value, ...c });
    if (cO(a.value, d) === !0) {
      i.value === !0 && f === !0 && l(d);
      return;
    }
    if (i.value === !0) {
      l(d);
      return;
    }
    n.pagination !== void 0 && n["onUpdate:pagination"] !== void 0
      ? r("update:pagination", d)
      : (o.value = d);
  }
  return {
    innerPagination: o,
    computedPagination: a,
    isServerSide: i,
    requestServerInteraction: s,
    setPagination: u,
  };
}
function hO(e, t, n, r, o, a) {
  const {
      props: i,
      emit: l,
      proxy: { $q: s },
    } = e,
    u = O(() => (r.value === !0 ? n.value.rowsNumber || 0 : a.value)),
    c = O(() => {
      const { page: b, rowsPerPage: S } = n.value;
      return (b - 1) * S;
    }),
    f = O(() => {
      const { page: b, rowsPerPage: S } = n.value;
      return b * S;
    }),
    d = O(() => n.value.page === 1),
    h = O(() =>
      n.value.rowsPerPage === 0
        ? 1
        : Math.max(1, Math.ceil(u.value / n.value.rowsPerPage))
    ),
    v = O(() => (f.value === 0 ? !0 : n.value.page >= h.value)),
    m = O(() =>
      (i.rowsPerPageOptions.includes(t.value.rowsPerPage)
        ? i.rowsPerPageOptions
        : [t.value.rowsPerPage].concat(i.rowsPerPageOptions)
      ).map((S) => ({
        label: S === 0 ? s.lang.table.allRows : "" + S,
        value: S,
      }))
    );
  me(h, (b, S) => {
    if (b === S) return;
    const E = n.value.page;
    b && !E ? o({ page: 1 }) : b < E && o({ page: b });
  });
  function g() {
    o({ page: 1 });
  }
  function y() {
    const { page: b } = n.value;
    b > 1 && o({ page: b - 1 });
  }
  function p() {
    const { page: b, rowsPerPage: S } = n.value;
    f.value > 0 && b * S < u.value && o({ page: b + 1 });
  }
  function w() {
    o({ page: h.value });
  }
  return (
    i["onUpdate:pagination"] !== void 0 &&
      l("update:pagination", { ...n.value }),
    {
      firstRowIndex: c,
      lastRowIndex: f,
      isFirstPage: d,
      isLastPage: v,
      pagesNumber: h,
      computedRowsPerPageOptions: m,
      computedRowsNumber: u,
      firstPage: g,
      prevPage: y,
      nextPage: p,
      lastPage: w,
    }
  );
}
const vO = {
    selection: {
      type: String,
      default: "none",
      validator: (e) => ["single", "multiple", "none"].includes(e),
    },
    selected: { type: Array, default: () => [] },
  },
  pO = ["update:selected", "selection"];
function mO(e, t, n, r) {
  const o = O(() => {
      const v = {};
      return (
        e.selected.map(r.value).forEach((m) => {
          v[m] = !0;
        }),
        v
      );
    }),
    a = O(() => e.selection !== "none"),
    i = O(() => e.selection === "single"),
    l = O(() => e.selection === "multiple"),
    s = O(
      () =>
        n.value.length !== 0 && n.value.every((v) => o.value[r.value(v)] === !0)
    ),
    u = O(
      () => s.value !== !0 && n.value.some((v) => o.value[r.value(v)] === !0)
    ),
    c = O(() => e.selected.length);
  function f(v) {
    return o.value[v] === !0;
  }
  function d() {
    t("update:selected", []);
  }
  function h(v, m, g, y) {
    t("selection", { rows: m, added: g, keys: v, evt: y });
    const p =
      i.value === !0
        ? g === !0
          ? m
          : []
        : g === !0
        ? e.selected.concat(m)
        : e.selected.filter((w) => v.includes(r.value(w)) === !1);
    t("update:selected", p);
  }
  return {
    hasSelectionMode: a,
    singleSelection: i,
    multipleSelection: l,
    allRowsSelected: s,
    someRowsSelected: u,
    rowsSelectedNumber: c,
    isRowSelected: f,
    clearSelection: d,
    updateSelection: h,
  };
}
function kh(e) {
  return Array.isArray(e) ? e.slice() : [];
}
const gO = { expanded: Array },
  yO = ["update:expanded"];
function bO(e, t) {
  const n = fe(kh(e.expanded));
  me(
    () => e.expanded,
    (i) => {
      n.value = kh(i);
    }
  );
  function r(i) {
    return n.value.includes(i);
  }
  function o(i) {
    e.expanded !== void 0 ? t("update:expanded", i) : (n.value = i);
  }
  function a(i, l) {
    const s = n.value.slice(),
      u = s.indexOf(i);
    l === !0
      ? u === -1 && (s.push(i), o(s))
      : u !== -1 && (s.splice(u, 1), o(s));
  }
  return { isRowExpanded: r, setExpanded: o, updateExpanded: a };
}
const SO = { visibleColumns: Array };
function wO(e, t, n) {
  const r = O(() => {
      if (e.columns !== void 0) return e.columns;
      const l = e.rows[0];
      return l !== void 0
        ? Object.keys(l).map((s) => ({
            name: s,
            label: s.toUpperCase(),
            field: s,
            align: Pu(l[s]) ? "right" : "left",
            sortable: !0,
          }))
        : [];
    }),
    o = O(() => {
      const { sortBy: l, descending: s } = t.value;
      return (
        e.visibleColumns !== void 0
          ? r.value.filter(
              (c) =>
                c.required === !0 || e.visibleColumns.includes(c.name) === !0
            )
          : r.value
      ).map((c) => {
        const f = c.align || "right",
          d = `text-${f}`;
        return {
          ...c,
          align: f,
          __iconClass: `q-table__sort-icon q-table__sort-icon--${f}`,
          __thClass:
            d +
            (c.headerClasses !== void 0 ? " " + c.headerClasses : "") +
            (c.sortable === !0 ? " sortable" : "") +
            (c.name === l ? ` sorted ${s === !0 ? "sort-desc" : ""}` : ""),
          __tdStyle:
            c.style !== void 0
              ? typeof c.style != "function"
                ? () => c.style
                : c.style
              : () => null,
          __tdClass:
            c.classes !== void 0
              ? typeof c.classes != "function"
                ? () => d + " " + c.classes
                : (h) => d + " " + c.classes(h)
              : () => d,
        };
      });
    }),
    a = O(() => {
      const l = {};
      return (
        o.value.forEach((s) => {
          l[s.name] = s;
        }),
        l
      );
    }),
    i = O(() =>
      e.tableColspan !== void 0
        ? e.tableColspan
        : o.value.length + (n.value === !0 ? 1 : 0)
    );
  return {
    colList: r,
    computedCols: o,
    computedColsMap: a,
    computedColspan: i,
  };
}
const Za = "q-table__bottom row items-center",
  lg = {};
xm.forEach((e) => {
  lg[e] = {};
});
var xO = Ue({
  name: "QTable",
  props: {
    rows: { type: Array, default: () => [] },
    rowKey: { type: [String, Function], default: "id" },
    columns: Array,
    loading: Boolean,
    iconFirstPage: String,
    iconPrevPage: String,
    iconNextPage: String,
    iconLastPage: String,
    title: String,
    hideHeader: Boolean,
    grid: Boolean,
    gridHeader: Boolean,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    separator: {
      type: String,
      default: "horizontal",
      validator: (e) => ["horizontal", "vertical", "cell", "none"].includes(e),
    },
    wrapCells: Boolean,
    virtualScroll: Boolean,
    virtualScrollTarget: { default: void 0 },
    ...lg,
    noDataLabel: String,
    noResultsLabel: String,
    loadingLabel: String,
    selectedRowsLabel: Function,
    rowsPerPageLabel: String,
    paginationLabel: Function,
    color: { type: String, default: "grey-8" },
    titleClass: [String, Array, Object],
    tableStyle: [String, Array, Object],
    tableClass: [String, Array, Object],
    tableHeaderStyle: [String, Array, Object],
    tableHeaderClass: [String, Array, Object],
    cardContainerClass: [String, Array, Object],
    cardContainerStyle: [String, Array, Object],
    cardStyle: [String, Array, Object],
    cardClass: [String, Array, Object],
    hideBottom: Boolean,
    hideSelectedBanner: Boolean,
    hideNoData: Boolean,
    hidePagination: Boolean,
    onRowClick: Function,
    onRowDblclick: Function,
    onRowContextmenu: Function,
    ...In,
    ...nO,
    ...SO,
    ...sO,
    ...fO,
    ...gO,
    ...vO,
    ...aO,
  },
  emits: ["request", "virtualScroll", ...rO, ...yO, ...pO],
  setup(e, { slots: t, emit: n }) {
    const r = Fe(),
      {
        proxy: { $q: o },
      } = r,
      a = Ln(e, o),
      { inFullscreen: i, toggleFullscreen: l } = oO(),
      s = O(() =>
        typeof e.rowKey == "function" ? e.rowKey : (Z) => Z[e.rowKey]
      ),
      u = fe(null),
      c = fe(null),
      f = O(() => e.grid !== !0 && e.virtualScroll === !0),
      d = O(
        () =>
          " q-table__card" +
          (a.value === !0 ? " q-table__card--dark q-dark" : "") +
          (e.square === !0 ? " q-table--square" : "") +
          (e.flat === !0 ? " q-table--flat" : "") +
          (e.bordered === !0 ? " q-table--bordered" : "")
      ),
      h = O(
        () =>
          `q-table__container q-table--${e.separator}-separator column no-wrap` +
          (e.grid === !0 ? " q-table--grid" : d.value) +
          (a.value === !0 ? " q-table--dark" : "") +
          (e.dense === !0 ? " q-table--dense" : "") +
          (e.wrapCells === !1 ? " q-table--no-wrap" : "") +
          (i.value === !0 ? " fullscreen scroll" : "")
      ),
      v = O(() => h.value + (e.loading === !0 ? " q-table--loading" : ""));
    me(
      () =>
        e.tableStyle +
        e.tableClass +
        e.tableHeaderStyle +
        e.tableHeaderClass +
        h.value,
      () => {
        f.value === !0 && c.value !== null && c.value.reset();
      }
    );
    const {
        innerPagination: m,
        computedPagination: g,
        isServerSide: y,
        requestServerInteraction: p,
        setPagination: w,
      } = dO(r, W),
      { computedFilterMethod: b } = uO(e, w),
      { isRowExpanded: S, setExpanded: E, updateExpanded: A } = bO(e, n),
      T = O(() => {
        let Z = e.rows;
        if (y.value === !0 || Z.length === 0) return Z;
        const { sortBy: be, descending: Me } = g.value;
        return (
          e.filter && (Z = b.value(Z, e.filter, X.value, W)),
          Ee.value !== null &&
            (Z = de.value(e.rows === Z ? Z.slice() : Z, be, Me)),
          Z
        );
      }),
      x = O(() => T.value.length),
      C = O(() => {
        let Z = T.value;
        if (y.value === !0) return Z;
        const { rowsPerPage: be } = g.value;
        return (
          be !== 0 &&
            (N.value === 0 && e.rows !== Z
              ? Z.length > ae.value && (Z = Z.slice(0, ae.value))
              : (Z = Z.slice(N.value, ae.value))),
          Z
        );
      }),
      {
        hasSelectionMode: D,
        singleSelection: I,
        multipleSelection: $,
        allRowsSelected: L,
        someRowsSelected: G,
        rowsSelectedNumber: j,
        isRowSelected: V,
        clearSelection: oe,
        updateSelection: xe,
      } = mO(e, n, C, s),
      {
        colList: J,
        computedCols: X,
        computedColsMap: H,
        computedColspan: se,
      } = wO(e, g, D),
      { columnToSort: Ee, computedSortMethod: de, sort: ne } = lO(e, g, J, w),
      {
        firstRowIndex: N,
        lastRowIndex: ae,
        isFirstPage: U,
        isLastPage: he,
        pagesNumber: Le,
        computedRowsPerPageOptions: R,
        computedRowsNumber: P,
        firstPage: B,
        prevPage: Q,
        nextPage: Y,
        lastPage: te,
      } = hO(r, m, g, y, w, x),
      ve = O(() => C.value.length === 0),
      ue = O(() => {
        const Z = {};
        return (
          xm.forEach((be) => {
            Z[be] = e[be];
          }),
          Z.virtualScrollItemSize === void 0 &&
            (Z.virtualScrollItemSize = e.dense === !0 ? 28 : 48),
          Z
        );
      });
    function ie() {
      f.value === !0 && c.value.reset();
    }
    function ee() {
      if (e.grid === !0) return Hr();
      const Z = e.hideHeader !== !0 ? Pe : null;
      if (f.value === !0) {
        const Me = t["top-row"],
          Be = t["bottom-row"],
          Ye = { default: (Ot) => we(Ot.item, t.body, Ot.index) };
        if (Me !== void 0) {
          const Ot = k("tbody", Me({ cols: X.value }));
          Ye.before = Z === null ? () => Ot : () => [Z()].concat(Ot);
        } else Z !== null && (Ye.before = Z);
        return (
          Be !== void 0 && (Ye.after = () => k("tbody", Be({ cols: X.value }))),
          k(
            W1,
            {
              ref: c,
              class: e.tableClass,
              style: e.tableStyle,
              ...ue.value,
              scrollTarget: e.virtualScrollTarget,
              items: C.value,
              type: "__qtable",
              tableColspan: se.value,
              onVirtualScroll: K,
            },
            Ye
          )
        );
      }
      const be = [ke()];
      return (
        Z !== null && be.unshift(Z()),
        ag(
          {
            class: ["q-table__middle scroll", e.tableClass],
            style: e.tableStyle,
          },
          be
        )
      );
    }
    function ye(Z, be) {
      if (c.value !== null) {
        c.value.scrollTo(Z, be);
        return;
      }
      Z = parseInt(Z, 10);
      const Me = u.value.querySelector(`tbody tr:nth-of-type(${Z + 1})`);
      if (Me !== null) {
        const Be = u.value.querySelector(".q-table__middle.scroll"),
          Ye = Me.offsetTop - e.virtualScrollStickySizeStart,
          Ot = Ye < Be.scrollTop ? "decrease" : "increase";
        (Be.scrollTop = Ye),
          n("virtualScroll", {
            index: Z,
            from: 0,
            to: m.value.rowsPerPage - 1,
            direction: Ot,
          });
      }
    }
    function K(Z) {
      n("virtualScroll", Z);
    }
    function ce() {
      return [
        k(G1, {
          class: "q-table__linear-progress",
          color: e.color,
          dark: a.value,
          indeterminate: !0,
          trackColor: "transparent",
        }),
      ];
    }
    function we(Z, be, Me) {
      const Be = s.value(Z),
        Ye = V(Be);
      if (be !== void 0)
        return be(
          We({
            key: Be,
            row: Z,
            pageIndex: Me,
            __trClass: Ye ? "selected" : "",
          })
        );
      const Ot = t["body-cell"],
        yt = X.value.map((Gt) => {
          const xo = t[`body-cell-${Gt.name}`],
            Eo = xo !== void 0 ? xo : Ot;
          return Eo !== void 0
            ? Eo(ze({ key: Be, row: Z, pageIndex: Me, col: Gt }))
            : k(
                "td",
                { class: Gt.__tdClass(Z), style: Gt.__tdStyle(Z) },
                W(Gt, Z)
              );
        });
      if (D.value === !0) {
        const Gt = t["body-selection"],
          xo =
            Gt !== void 0
              ? Gt(q({ key: Be, row: Z, pageIndex: Me }))
              : [
                  k(iu, {
                    modelValue: Ye,
                    color: e.color,
                    dark: a.value,
                    dense: e.dense,
                    "onUpdate:modelValue": (Eo, ps) => {
                      xe([Be], [Z], Eo, ps);
                    },
                  }),
                ];
        yt.unshift(k("td", { class: "q-table--col-auto-width" }, xo));
      }
      const kn = { key: Be, class: { selected: Ye } };
      return (
        e.onRowClick !== void 0 &&
          ((kn.class["cursor-pointer"] = !0),
          (kn.onClick = (Gt) => {
            n("RowClick", Gt, Z, Me);
          })),
        e.onRowDblclick !== void 0 &&
          ((kn.class["cursor-pointer"] = !0),
          (kn.onDblclick = (Gt) => {
            n("RowDblclick", Gt, Z, Me);
          })),
        e.onRowContextmenu !== void 0 &&
          ((kn.class["cursor-pointer"] = !0),
          (kn.onContextmenu = (Gt) => {
            n("RowContextmenu", Gt, Z, Me);
          })),
        k("tr", kn, yt)
      );
    }
    function ke() {
      const Z = t.body,
        be = t["top-row"],
        Me = t["bottom-row"];
      let Be = C.value.map((Ye, Ot) => we(Ye, Z, Ot));
      return (
        be !== void 0 && (Be = be({ cols: X.value }).concat(Be)),
        Me !== void 0 && (Be = Be.concat(Me({ cols: X.value }))),
        k("tbody", Be)
      );
    }
    function We(Z) {
      return (
        _(Z),
        (Z.cols = Z.cols.map((be) =>
          Tn({ ...be }, "value", () => W(be, Z.row))
        )),
        Z
      );
    }
    function ze(Z) {
      return _(Z), Tn(Z, "value", () => W(Z.col, Z.row)), Z;
    }
    function q(Z) {
      return _(Z), Z;
    }
    function _(Z) {
      Object.assign(Z, {
        cols: X.value,
        colsMap: H.value,
        sort: ne,
        rowIndex: N.value + Z.pageIndex,
        color: e.color,
        dark: a.value,
        dense: e.dense,
      }),
        D.value === !0 &&
          Tn(
            Z,
            "selected",
            () => V(Z.key),
            (be, Me) => {
              xe([Z.key], [Z.row], be, Me);
            }
          ),
        Tn(
          Z,
          "expand",
          () => S(Z.key),
          (be) => {
            A(Z.key, be);
          }
        );
    }
    function W(Z, be) {
      const Me = typeof Z.field == "function" ? Z.field(be) : be[Z.field];
      return Z.format !== void 0 ? Z.format(Me, be) : Me;
    }
    const le = O(() => ({
      pagination: g.value,
      pagesNumber: Le.value,
      isFirstPage: U.value,
      isLastPage: he.value,
      firstPage: B,
      prevPage: Q,
      nextPage: Y,
      lastPage: te,
      inFullscreen: i.value,
      toggleFullscreen: l,
    }));
    function ge() {
      const Z = t.top,
        be = t["top-left"],
        Me = t["top-right"],
        Be = t["top-selection"],
        Ye = D.value === !0 && Be !== void 0 && j.value > 0,
        Ot = "q-table__top relative-position row items-center";
      if (Z !== void 0) return k("div", { class: Ot }, [Z(le.value)]);
      let yt;
      if (
        (Ye === !0
          ? (yt = Be(le.value).slice())
          : ((yt = []),
            be !== void 0
              ? yt.push(k("div", { class: "q-table__control" }, [be(le.value)]))
              : e.title &&
                yt.push(
                  k("div", { class: "q-table__control" }, [
                    k(
                      "div",
                      { class: ["q-table__title", e.titleClass] },
                      e.title
                    ),
                  ])
                )),
        Me !== void 0 &&
          (yt.push(k("div", { class: "q-table__separator col" })),
          yt.push(k("div", { class: "q-table__control" }, [Me(le.value)]))),
        yt.length !== 0)
      )
        return k("div", { class: Ot }, yt);
    }
    const Ae = O(() => (G.value === !0 ? null : L.value));
    function Pe() {
      const Z = Ne();
      return (
        e.loading === !0 &&
          t.loading === void 0 &&
          Z.push(
            k("tr", { class: "q-table__progress" }, [
              k("th", { class: "relative-position", colspan: se.value }, ce()),
            ])
          ),
        k("thead", Z)
      );
    }
    function Ne() {
      const Z = t.header,
        be = t["header-cell"];
      if (Z !== void 0) return Z(it({ header: !0 })).slice();
      const Me = X.value.map((Be) => {
        const Ye = t[`header-cell-${Be.name}`],
          Ot = Ye !== void 0 ? Ye : be,
          yt = it({ col: Be });
        return Ot !== void 0
          ? Ot(yt)
          : k(H1, { key: Be.name, props: yt }, () => Be.label);
      });
      if (I.value === !0 && e.grid !== !0)
        Me.unshift(k("th", { class: "q-table--col-auto-width" }, " "));
      else if ($.value === !0) {
        const Be = t["header-selection"],
          Ye =
            Be !== void 0
              ? Be(it({}))
              : [
                  k(iu, {
                    color: e.color,
                    modelValue: Ae.value,
                    dark: a.value,
                    dense: e.dense,
                    "onUpdate:modelValue": De,
                  }),
                ];
        Me.unshift(k("th", { class: "q-table--col-auto-width" }, Ye));
      }
      return [
        k("tr", { class: e.tableHeaderClass, style: e.tableHeaderStyle }, Me),
      ];
    }
    function it(Z) {
      return (
        Object.assign(Z, {
          cols: X.value,
          sort: ne,
          colsMap: H.value,
          color: e.color,
          dark: a.value,
          dense: e.dense,
        }),
        $.value === !0 && Tn(Z, "selected", () => Ae.value, De),
        Z
      );
    }
    function De(Z) {
      G.value === !0 && (Z = !1), xe(C.value.map(s.value), C.value, Z);
    }
    const Ce = O(() => {
      const Z = [
        e.iconFirstPage || o.iconSet.table.firstPage,
        e.iconPrevPage || o.iconSet.table.prevPage,
        e.iconNextPage || o.iconSet.table.nextPage,
        e.iconLastPage || o.iconSet.table.lastPage,
      ];
      return o.lang.rtl === !0 ? Z.reverse() : Z;
    });
    function Ie() {
      if (e.hideBottom === !0) return;
      if (ve.value === !0) {
        if (e.hideNoData === !0) return;
        const Me =
            e.loading === !0
              ? e.loadingLabel || o.lang.table.loading
              : e.filter
              ? e.noResultsLabel || o.lang.table.noResults
              : e.noDataLabel || o.lang.table.noData,
          Be = t["no-data"],
          Ye =
            Be !== void 0
              ? [
                  Be({
                    message: Me,
                    icon: o.iconSet.table.warning,
                    filter: e.filter,
                  }),
                ]
              : [
                  k(wt, {
                    class: "q-table__bottom-nodata-icon",
                    name: o.iconSet.table.warning,
                  }),
                  Me,
                ];
        return k("div", { class: Za + " q-table__bottom--nodata" }, Ye);
      }
      const Z = t.bottom;
      if (Z !== void 0) return k("div", { class: Za }, [Z(le.value)]);
      const be =
        e.hideSelectedBanner !== !0 && D.value === !0 && j.value > 0
          ? [
              k("div", { class: "q-table__control" }, [
                k("div", [
                  (e.selectedRowsLabel || o.lang.table.selectedRecords)(
                    j.value
                  ),
                ]),
              ]),
            ]
          : [];
      if (e.hidePagination !== !0)
        return k("div", { class: Za + " justify-end" }, Xe(be));
      if (be.length !== 0) return k("div", { class: Za }, be);
    }
    function Ke(Z) {
      w({ page: 1, rowsPerPage: Z.value });
    }
    function Xe(Z) {
      let be;
      const { rowsPerPage: Me } = g.value,
        Be = e.paginationLabel || o.lang.table.pagination,
        Ye = t.pagination,
        Ot = e.rowsPerPageOptions.length > 1;
      if (
        (Z.push(k("div", { class: "q-table__separator col" })),
        Ot === !0 &&
          Z.push(
            k("div", { class: "q-table__control" }, [
              k("span", { class: "q-table__bottom-item" }, [
                e.rowsPerPageLabel || o.lang.table.recordsPerPage,
              ]),
              k(Ki, {
                class: "q-table__select inline q-table__bottom-item",
                color: e.color,
                modelValue: Me,
                options: R.value,
                displayValue: Me === 0 ? o.lang.table.allRows : Me,
                dark: a.value,
                borderless: !0,
                dense: !0,
                optionsDense: !0,
                optionsCover: !0,
                "onUpdate:modelValue": Ke,
              }),
            ])
          ),
        Ye !== void 0)
      )
        be = Ye(le.value);
      else if (
        ((be = [
          k("span", Me !== 0 ? { class: "q-table__bottom-item" } : {}, [
            Me
              ? Be(N.value + 1, Math.min(ae.value, P.value), P.value)
              : Be(1, x.value, P.value),
          ]),
        ]),
        Me !== 0 && Le.value > 1)
      ) {
        const yt = { color: e.color, round: !0, dense: !0, flat: !0 };
        e.dense === !0 && (yt.size = "sm"),
          Le.value > 2 &&
            be.push(
              k(ot, {
                key: "pgFirst",
                ...yt,
                icon: Ce.value[0],
                disable: U.value,
                onClick: B,
              })
            ),
          be.push(
            k(ot, {
              key: "pgPrev",
              ...yt,
              icon: Ce.value[1],
              disable: U.value,
              onClick: Q,
            }),
            k(ot, {
              key: "pgNext",
              ...yt,
              icon: Ce.value[2],
              disable: he.value,
              onClick: Y,
            })
          ),
          Le.value > 2 &&
            be.push(
              k(ot, {
                key: "pgLast",
                ...yt,
                icon: Ce.value[3],
                disable: he.value,
                onClick: te,
              })
            );
      }
      return Z.push(k("div", { class: "q-table__control" }, be)), Z;
    }
    function Ht() {
      const Z =
        e.gridHeader === !0
          ? [k("table", { class: "q-table" }, [Pe()])]
          : e.loading === !0 && t.loading === void 0
          ? ce()
          : void 0;
      return k("div", { class: "q-table__middle" }, Z);
    }
    function Hr() {
      const Z =
        t.item !== void 0
          ? t.item
          : (be) => {
              const Me = be.cols.map((Ye) =>
                k("div", { class: "q-table__grid-item-row" }, [
                  k("div", { class: "q-table__grid-item-title" }, [Ye.label]),
                  k("div", { class: "q-table__grid-item-value" }, [Ye.value]),
                ])
              );
              if (D.value === !0) {
                const Ye = t["body-selection"],
                  Ot =
                    Ye !== void 0
                      ? Ye(be)
                      : [
                          k(iu, {
                            modelValue: be.selected,
                            color: e.color,
                            dark: a.value,
                            dense: e.dense,
                            "onUpdate:modelValue": (yt, kn) => {
                              xe([be.key], [be.row], yt, kn);
                            },
                          }),
                        ];
                Me.unshift(
                  k("div", { class: "q-table__grid-item-row" }, Ot),
                  k(Gr, { dark: a.value })
                );
              }
              const Be = {
                class: ["q-table__grid-item-card" + d.value, e.cardClass],
                style: e.cardStyle,
              };
              return (
                (e.onRowClick !== void 0 || e.onRowDblclick !== void 0) &&
                  ((Be.class[0] += " cursor-pointer"),
                  e.onRowClick !== void 0 &&
                    (Be.onClick = (Ye) => {
                      n("RowClick", Ye, be.row, be.pageIndex);
                    }),
                  e.onRowDblclick !== void 0 &&
                    (Be.onDblclick = (Ye) => {
                      n("RowDblclick", Ye, be.row, be.pageIndex);
                    })),
                k(
                  "div",
                  {
                    class:
                      "q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3" +
                      (be.selected === !0
                        ? " q-table__grid-item--selected"
                        : ""),
                  },
                  [k("div", Be, Me)]
                )
              );
            };
      return k(
        "div",
        {
          class: ["q-table__grid-content row", e.cardContainerClass],
          style: e.cardContainerStyle,
        },
        C.value.map((be, Me) =>
          Z(We({ key: s.value(be), row: be, pageIndex: Me }))
        )
      );
    }
    return (
      Object.assign(r.proxy, {
        requestServerInteraction: p,
        setPagination: w,
        firstPage: B,
        prevPage: Q,
        nextPage: Y,
        lastPage: te,
        isRowSelected: V,
        clearSelection: oe,
        isRowExpanded: S,
        setExpanded: E,
        sort: ne,
        resetVirtualScroll: ie,
        scrollTo: ye,
        getCellValue: W,
      }),
      A0(r.proxy, {
        filteredSortedRows: () => T.value,
        computedRows: () => C.value,
        computedRowsNumber: () => P.value,
      }),
      () => {
        const Z = [ge()],
          be = { ref: u, class: v.value };
        return (
          e.grid === !0
            ? Z.push(Ht())
            : Object.assign(be, {
                class: [be.class, e.cardClass],
                style: e.cardStyle,
              }),
          Z.push(ee(), Ie()),
          e.loading === !0 && t.loading !== void 0 && Z.push(t.loading()),
          k("div", be, Z)
        );
      }
    );
  },
});
const EO = {
  position: {
    type: String,
    default: "bottom-right",
    validator: (e) =>
      [
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
        "top",
        "right",
        "bottom",
        "left",
      ].includes(e),
  },
  offset: { type: Array, validator: (e) => e.length === 2 },
  expand: Boolean,
};
function CO() {
  const {
      props: e,
      proxy: { $q: t },
    } = Fe(),
    n = qt(wo, $t);
  if (n === $t)
    return console.error("QPageSticky needs to be child of QLayout"), $t;
  const r = O(() => {
      const f = e.position;
      return {
        top: f.indexOf("top") > -1,
        right: f.indexOf("right") > -1,
        bottom: f.indexOf("bottom") > -1,
        left: f.indexOf("left") > -1,
        vertical: f === "top" || f === "bottom",
        horizontal: f === "left" || f === "right",
      };
    }),
    o = O(() => n.header.offset),
    a = O(() => n.right.offset),
    i = O(() => n.footer.offset),
    l = O(() => n.left.offset),
    s = O(() => {
      let f = 0,
        d = 0;
      const h = r.value,
        v = t.lang.rtl === !0 ? -1 : 1;
      h.top === !0 && o.value !== 0
        ? (d = `${o.value}px`)
        : h.bottom === !0 && i.value !== 0 && (d = `${-i.value}px`),
        h.left === !0 && l.value !== 0
          ? (f = `${v * l.value}px`)
          : h.right === !0 && a.value !== 0 && (f = `${-v * a.value}px`);
      const m = { transform: `translate(${f}, ${d})` };
      return (
        e.offset && (m.margin = `${e.offset[1]}px ${e.offset[0]}px`),
        h.vertical === !0
          ? (l.value !== 0 &&
              (m[t.lang.rtl === !0 ? "right" : "left"] = `${l.value}px`),
            a.value !== 0 &&
              (m[t.lang.rtl === !0 ? "left" : "right"] = `${a.value}px`))
          : h.horizontal === !0 &&
            (o.value !== 0 && (m.top = `${o.value}px`),
            i.value !== 0 && (m.bottom = `${i.value}px`)),
        m
      );
    }),
    u = O(
      () =>
        `q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${
          e.expand === !0 ? "expand" : "shrink"
        }`
    );
  function c(f) {
    const d = ht(f.default);
    return k(
      "div",
      { class: u.value, style: s.value },
      e.expand === !0 ? d : [k("div", d)]
    );
  }
  return { $layout: n, getStickyContent: c };
}
var OO = Ue({
  name: "QPageSticky",
  props: EO,
  setup(e, { slots: t }) {
    const { getStickyContent: n } = CO();
    return () => n(t);
  },
});
const TO = [
    {
      name: "Quantity",
      label: "Quantity",
      sortable: !0,
      align: "center",
      field: "quantity",
      sortOrder: "da",
    },
    { name: "ImgUrl", label: "\u{1F5BC}\uFE0F", sortable: !1, align: "center" },
    {
      name: "ProductName",
      label: "Item Name",
      field: "name",
      sortable: !1,
      align: "left",
      sortOrder: "ad",
    },
    { name: "Variants", label: "Size", sortable: !1, align: "left" },
    {
      name: "ItemId",
      label: "Item Id",
      field: "itemId",
      sortable: !0,
      sortOrder: "ad",
      sort: (e, t) =>
        parseInt(e) < parseInt(t) ? 1 : parseInt(e) > parseInt(t) ? -1 : 0,
    },
    {
      name: "BasePrice",
      label: "Item Price",
      field: (e) => {
        var t;
        return e.price || ((t = e.variant) == null ? void 0 : t.price) || 0;
      },
      align: "left",
    },
    {
      name: "VariantSku",
      label: "SKU",
      field: (e) => e.variant.sku,
      sortable: !1,
      align: "left",
    },
    {
      name: "LineNo",
      label: "#",
      field: "lineNo",
      sortable: !1,
      sortOrder: "ad",
      align: "center",
    },
    {
      name: "Remove",
      label: "Remove from List",
      sortable: !1,
      align: "center",
    },
  ],
  PO = zn({
    name: "htg-shopping-list",
    setup() {
      const e = of(),
        {
          list: t,
          listLoading: n,
          getTotalQauntity: r,
          cartLoading: o,
          cart: a,
          BASEURL: i,
          addToCartDialog: l,
          sortOptions: s,
          sortOrder: u,
          shoppingListTable: c,
        } = kc(e),
        f = fe(""),
        d = fe(null),
        h = fe(!1),
        v = (m) => {
          (d.value = m), (h.value = !0);
        };
      return (
        Ft(() => {
          e.getCart();
        }),
        {
          cart: a,
          addToCartDialog: l,
          cartLoading: o,
          getTotalQauntity: r,
          listsStore: e,
          list: t,
          listLoading: n,
          columns: TO,
          filter: f,
          productToDelete: d,
          confirmDeleteDialog: h,
          openConfirmDeleteDialog: v,
          BASEURL: i,
          shoppingListTable: c,
          sortOptions: s,
          sortOrder: u,
        }
      );
    },
  }),
  RO = { class: "q-pa-none" },
  AO = { class: "text-h6" },
  IO = et("small", null, "Arrange Items", -1),
  LO = { class: "q-gutter-xs justify-center row no-wrap" },
  kO = { class: "col" },
  DO = { class: "col" },
  MO = ["src", "alt"],
  $O = ["href"],
  FO = et("br", null, null, -1),
  NO = { key: 0 },
  BO = { class: "q-ml-sm" },
  jO = ["href"],
  VO = et(
    "span",
    { class: "q-ml-sm" },
    "Successfully added Item(s) to your shopping cart.",
    -1
  ),
  qO = ["href"];
function HO(e, t, n, r, o, a) {
  var i, l;
  return (
    lt(),
    kr("div", RO, [
      M(
        xO,
        {
          dense: "",
          flat: "",
          square: "",
          borderless: "",
          class: "ShoppingListTbl",
          title: "{{ list?.name ? list.name : 'Shopping List'}}",
          rows: (i = e.list) != null && i.products ? e.list.products : [],
          columns: e.columns,
          "row-key": "itemId",
          "rows-per-page-options": [0, 20, 50, 100],
          "table-class": "text-center",
          filter: e.filter,
          loading: e.listLoading,
          "rows-per-page-label": "Items per page:",
          ref: "shoppingListTable",
          "visible-columns": [
            "Quantity",
            "ImgUrl",
            "ProductName",
            "BasePrice",
            "VariantSku",
            "Remove",
          ],
        },
        bv(
          {
            "top-left": z(() => {
              var s, u, c;
              return [
                et("span", AO, tt((s = e.list) == null ? void 0 : s.name), 1),
                ((u = e.list) == null ? void 0 : u.products) &&
                ((c = e.listsStore.sortOrder) == null ? void 0 : c.value) ===
                  "ItemId"
                  ? (lt(),
                    It(
                      ot,
                      {
                        key: 0,
                        style: {
                          "margin-left": "10px",
                          "margin-bottom": "5px",
                        },
                        dense: "",
                        square: "",
                        bordered: "",
                        icon: "sort",
                        onClick:
                          t[0] ||
                          (t[0] = (f) => e.listsStore.prepareSortArray()),
                        disable: e.listLoading,
                      },
                      { default: z(() => [IO]), _: 1 },
                      8,
                      ["disable"]
                    ))
                  : Cn("", !0),
              ];
            }),
            "top-right": z(() => [
              M(
                Ki,
                {
                  modelValue: e.sortOrder,
                  "onUpdate:modelValue": [
                    t[1] || (t[1] = (s) => (e.sortOrder = s)),
                    t[2] || (t[2] = (s) => e.listsStore.sortTable(s)),
                  ],
                  options: e.sortOptions,
                  dense: "",
                  placeholder: "Sort Order",
                  style: { "margin-right": "10px", "min-width": "75px" },
                  label: "Sorting",
                },
                {
                  option: z((s) => [
                    M(
                      _t,
                      Fi(Ko(s.itemProps)),
                      {
                        default: z(() => [
                          M(
                            Je,
                            null,
                            {
                              default: z(() => [
                                M(
                                  At,
                                  null,
                                  {
                                    default: z(() => [Ge(tt(s.opt.label), 1)]),
                                    _: 2,
                                  },
                                  1024
                                ),
                              ]),
                              _: 2,
                            },
                            1024
                          ),
                        ]),
                        _: 2,
                      },
                      1040
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["modelValue", "options"]
              ),
              M(
                Zr,
                {
                  dense: "",
                  filled: "",
                  debounce: "300",
                  modelValue: e.filter,
                  "onUpdate:modelValue": t[3] || (t[3] = (s) => (e.filter = s)),
                  placeholder: "Search List...",
                  clearable: "",
                },
                { append: z(() => [M(wt, { name: "search" })]), _: 1 },
                8,
                ["modelValue"]
              ),
            ]),
            "body-cell-Quantity": z((s) => [
              M(
                wr,
                { props: s, style: { "max-width": "150px" } },
                {
                  default: z(() => [
                    et("div", LO, [
                      et("div", kO, [
                        M(
                          ot,
                          {
                            flat: "",
                            dense: "",
                            icon: "remove",
                            title: "Decrement qty",
                            color: "dark",
                            onClick: (u) => e.listsStore.decrementQty(s.row),
                            disable: s.row.quantity <= 0,
                          },
                          null,
                          8,
                          ["onClick", "disable"]
                        ),
                      ]),
                      et(
                        "div",
                        {
                          class: "col",
                          style: ii(
                            `min-width:${
                              s.row.quantity.toString().length < 2 ? 3 : 5
                            }em`
                          ),
                        },
                        [
                          M(
                            Zr,
                            {
                              modelValue: s.row.quantity,
                              "onUpdate:modelValue": [
                                (u) => (s.row.quantity = u),
                                (u) => e.listsStore.storeQuantity(s.row),
                              ],
                              modelModifiers: { number: !0 },
                              type: "number",
                              dense: "",
                              filled: "",
                              class: "text-center text-weight-bold",
                              placeholder: "0",
                              disable:
                                s.row.variant.label === "N/A" || e.cartLoading,
                              "input-class":
                                s.row.quantity > 0
                                  ? "text-weight-bold"
                                  : "text-grey-5",
                            },
                            null,
                            8,
                            [
                              "modelValue",
                              "onUpdate:modelValue",
                              "disable",
                              "input-class",
                            ]
                          ),
                        ],
                        4
                      ),
                      et("div", DO, [
                        M(
                          ot,
                          {
                            color: "primary",
                            flat: "",
                            dense: "",
                            square: "",
                            icon: "add_box",
                            title: "Increment qty",
                            onClick: (u) => e.listsStore.incrementQty(s.row),
                            disable:
                              s.row.variant.label === "N/A" || e.cartLoading,
                          },
                          null,
                          8,
                          ["onClick", "disable"]
                        ),
                      ]),
                    ]),
                  ]),
                  _: 2,
                },
                1032,
                ["props"]
              ),
            ]),
            "body-cell-ImgUrl": z((s) => [
              M(
                wr,
                { props: s },
                {
                  default: z(() => [
                    M(
                      cn,
                      { size: "55px" },
                      {
                        default: z(() => [
                          et(
                            "img",
                            { src: s.row.urlThumbnail, alt: s.row.name },
                            null,
                            8,
                            MO
                          ),
                        ]),
                        _: 2,
                      },
                      1024
                    ),
                  ]),
                  _: 2,
                },
                1032,
                ["props"]
              ),
            ]),
            "body-cell-ProductName": z((s) => [
              M(
                wr,
                { props: s },
                {
                  default: z(() => [
                    et(
                      "a",
                      {
                        href: e.BASEURL + s.row.productUrl,
                        target: "_blank",
                        class: "text-body2 text-bold",
                      },
                      tt(s.row.name),
                      9,
                      $O
                    ),
                    FO,
                    M(
                      Ki,
                      {
                        modelValue: s.row.variant,
                        "onUpdate:modelValue": [
                          (u) => (s.row.variant = u),
                          (u) => e.listsStore.updateProduct(s.row, u),
                        ],
                        options: s.row.variants,
                        dense: "",
                        filled: "",
                        placeholder: "Select Size Option",
                        "hide-dropdown-icon": "",
                      },
                      {
                        prepend: z(() => [M(wt, { name: "arrow_drop_down" })]),
                        selected: z(() => [
                          et("span", null, tt(s.row.variant.label), 1),
                        ]),
                        "no-option": z(() => [
                          M(_t, null, {
                            default: z(() => [
                              M(
                                Je,
                                { class: "text-grey" },
                                {
                                  default: z(() => [
                                    Ge(" No Size Variants available "),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            _: 1,
                          }),
                        ]),
                        option: z((u) => [
                          M(
                            _t,
                            Fi(Ko(u.itemProps)),
                            {
                              default: z(() => [
                                M(
                                  Je,
                                  null,
                                  {
                                    default: z(() => [
                                      M(
                                        At,
                                        null,
                                        {
                                          default: z(() => [
                                            Ge(tt(u.opt.label), 1),
                                          ]),
                                          _: 2,
                                        },
                                        1024
                                      ),
                                      M(
                                        At,
                                        { caption: "" },
                                        {
                                          default: z(() => [
                                            Ge(tt(u.opt.sku), 1),
                                          ]),
                                          _: 2,
                                        },
                                        1024
                                      ),
                                    ]),
                                    _: 2,
                                  },
                                  1024
                                ),
                                M(
                                  Je,
                                  { side: "" },
                                  {
                                    default: z(() => {
                                      var c;
                                      return [
                                        Ge(
                                          " $ " +
                                            tt(
                                              (c = u.opt.calculated_price) ==
                                                null
                                                ? void 0
                                                : c.toFixed(2)
                                            ),
                                          1
                                        ),
                                      ];
                                    }),
                                    _: 2,
                                  },
                                  1024
                                ),
                              ]),
                              _: 2,
                            },
                            1040
                          ),
                        ]),
                        _: 2,
                      },
                      1032,
                      ["modelValue", "onUpdate:modelValue", "options"]
                    ),
                  ]),
                  _: 2,
                },
                1032,
                ["props"]
              ),
            ]),
            "body-cell-Variants": z((s) => [
              M(
                wr,
                { props: s },
                {
                  default: z(() => [
                    M(
                      Ki,
                      {
                        modelValue: s.row.variant,
                        "onUpdate:modelValue": [
                          (u) => (s.row.variant = u),
                          (u) => e.listsStore.updateProduct(s.row, u),
                        ],
                        options: s.row.variants,
                        dense: "",
                        filled: "",
                        placeholder: "Select Size Option",
                      },
                      {
                        "no-option": z(() => [
                          M(_t, null, {
                            default: z(() => [
                              M(
                                Je,
                                { class: "text-grey" },
                                {
                                  default: z(() => [
                                    Ge(" No Size Variants available "),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            _: 1,
                          }),
                        ]),
                        option: z((u) => [
                          M(
                            _t,
                            Fi(Ko(u.itemProps)),
                            {
                              default: z(() => [
                                M(
                                  Je,
                                  null,
                                  {
                                    default: z(() => [
                                      M(
                                        At,
                                        null,
                                        {
                                          default: z(() => [
                                            Ge(tt(u.opt.label), 1),
                                          ]),
                                          _: 2,
                                        },
                                        1024
                                      ),
                                      M(
                                        At,
                                        { caption: "" },
                                        {
                                          default: z(() => [
                                            Ge(tt(u.opt.sku), 1),
                                          ]),
                                          _: 2,
                                        },
                                        1024
                                      ),
                                    ]),
                                    _: 2,
                                  },
                                  1024
                                ),
                                M(
                                  Je,
                                  { side: "" },
                                  {
                                    default: z(() => {
                                      var c;
                                      return [
                                        Ge(
                                          " $ " +
                                            tt(
                                              (c = u.opt.calculated_price) ==
                                                null
                                                ? void 0
                                                : c.toFixed(2)
                                            ),
                                          1
                                        ),
                                      ];
                                    }),
                                    _: 2,
                                  },
                                  1024
                                ),
                              ]),
                              _: 2,
                            },
                            1040
                          ),
                        ]),
                        _: 2,
                      },
                      1032,
                      ["modelValue", "onUpdate:modelValue", "options"]
                    ),
                  ]),
                  _: 2,
                },
                1032,
                ["props"]
              ),
            ]),
            "body-cell-BasePrice": z((s) => [
              M(
                wr,
                { props: s },
                {
                  default: z(() => {
                    var u, c;
                    return [
                      (u = s.row.variant) != null && u.calculated_price
                        ? (lt(),
                          kr(
                            "span",
                            NO,
                            tt(
                              "$ " +
                                (s.row.variant.calculated_price.toFixed(2) ||
                                  "")
                            ),
                            1
                          ))
                        : Cn("", !0),
                      (c = s.row.variant) != null && c.calculated_price
                        ? Cn("", !0)
                        : (lt(),
                          It(Ea, { key: 1, color: "primary", size: "2em" })),
                    ];
                  }),
                  _: 2,
                },
                1032,
                ["props"]
              ),
            ]),
            "body-cell-Remove": z((s) => [
              M(
                wr,
                { props: s },
                {
                  default: z(() => [
                    M(
                      ot,
                      {
                        dense: "",
                        flat: "",
                        round: "",
                        icon: "delete",
                        onClick: (u) => e.openConfirmDeleteDialog(s.row),
                        class: "text-grey-8",
                      },
                      null,
                      8,
                      ["onClick"]
                    ),
                    M(
                      lr,
                      {
                        modelValue: e.confirmDeleteDialog,
                        "onUpdate:modelValue":
                          t[5] || (t[5] = (u) => (e.confirmDeleteDialog = u)),
                        persistent: "",
                      },
                      {
                        default: z(() => [
                          M(eo, null, {
                            default: z(() => [
                              M(
                                Wn,
                                { class: "row items-center" },
                                {
                                  default: z(() => [
                                    M(cn, { icon: "warning" }),
                                    et(
                                      "span",
                                      BO,
                                      "Remove " +
                                        tt(e.productToDelete.name) +
                                        ' from "' +
                                        tt(e.list.name) +
                                        '" List?',
                                      1
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                              M(
                                jo,
                                { align: "right" },
                                {
                                  default: z(() => [
                                    St(
                                      M(
                                        ot,
                                        {
                                          flat: "",
                                          label: "No",
                                          color: "dark",
                                        },
                                        null,
                                        512
                                      ),
                                      [[gn]]
                                    ),
                                    St(
                                      M(
                                        ot,
                                        {
                                          flat: "",
                                          label: "Yes",
                                          color: "negative",
                                          onClick:
                                            t[4] ||
                                            (t[4] = (u) =>
                                              e.listsStore.deleteShoppingListItem(
                                                e.productToDelete.itemId
                                              )),
                                        },
                                        null,
                                        512
                                      ),
                                      [[gn]]
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            _: 1,
                          }),
                        ]),
                        _: 1,
                      },
                      8,
                      ["modelValue"]
                    ),
                  ]),
                  _: 2,
                },
                1032,
                ["props"]
              ),
            ]),
            "bottom-row": z(() => [
              M(Ah, null, {
                default: z(() => [
                  M(wr, { colspan: "100%", style: { height: "56px" } }),
                ]),
                _: 1,
              }),
            ]),
            _: 2,
          },
          [
            !e.listLoading && !((l = e.list) != null && l.products)
              ? {
                  name: "top-row",
                  fn: z(() => [
                    M(Ah, null, {
                      default: z(() => [
                        M(
                          wr,
                          { colspan: "100%" },
                          {
                            default: z(() => [
                              Ge(
                                " This list has no products. Search for products to add using the menu to the left. "
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }),
                  ]),
                  key: "0",
                }
              : void 0,
          ]
        ),
        1032,
        ["rows", "columns", "filter", "loading"]
      ),
      M(
        OO,
        { position: "bottom-right", offset: [15, 45] },
        {
          default: z(() => {
            var s, u, c;
            return [
              e.getTotalQauntity > 0
                ? (lt(),
                  It(
                    ot,
                    {
                      key: 0,
                      class: "text-caption",
                      fab: "",
                      icon: "add_shopping_cart",
                      color: "primary",
                      onClick: t[6] || (t[6] = (f) => e.listsStore.addToCart()),
                      disable: e.cartLoading,
                    },
                    {
                      default: z(() => [
                        Ge(" Add to Cart (" + tt(e.getTotalQauntity) + ") ", 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ["disable"]
                  ))
                : Cn("", !0),
              et(
                "a",
                { href: `${e.BASEURL}/cart.php` },
                [
                  ((c =
                    (u = (s = e.cart) == null ? void 0 : s.lineItems) == null
                      ? void 0
                      : u.physicalItems) == null
                    ? void 0
                    : c.length) > 0
                    ? (lt(),
                      It(
                        ot,
                        {
                          key: 0,
                          class: "text-caption",
                          fab: "",
                          icon: "shopping_cart_checkout",
                          color: "secondary",
                          push: "",
                          disable: e.cartLoading,
                          style: { "margin-left": "5px" },
                        },
                        {
                          default: z(() => [
                            Ge(
                              " View Cart (" +
                                tt(
                                  e.cart.lineItems.physicalItems.reduce(
                                    (f, d) =>
                                      (f += parseFloat(
                                        d == null ? void 0 : d.quantity
                                      )),
                                    0
                                  )
                                ) +
                                ") ",
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ["disable"]
                      ))
                    : Cn("", !0),
                ],
                8,
                jO
              ),
            ];
          }),
          _: 1,
        }
      ),
      M(
        lr,
        {
          modelValue: e.addToCartDialog,
          "onUpdate:modelValue":
            t[7] || (t[7] = (s) => (e.addToCartDialog = s)),
          persistent: "",
        },
        {
          default: z(() => [
            M(eo, null, {
              default: z(() => [
                M(
                  Wn,
                  { class: "row items-center" },
                  {
                    default: z(() => [
                      M(cn, { class: "text-primary", icon: "done" }),
                      VO,
                    ]),
                    _: 1,
                  }
                ),
                M(
                  jo,
                  { align: "right" },
                  {
                    default: z(() => [
                      St(
                        M(
                          ot,
                          {
                            flat: "",
                            label: "Add more items",
                            icon: "arrow_back",
                          },
                          null,
                          512
                        ),
                        [[gn]]
                      ),
                      et(
                        "a",
                        { href: `${e.BASEURL}/cart.php` },
                        [
                          St(
                            M(
                              ot,
                              {
                                flat: "",
                                filled: "",
                                icon: "shopping_cart_checkout",
                                label: "Go to Checkout",
                                class: "bg-primary text-white",
                              },
                              null,
                              512
                            ),
                            [[gn]]
                          ),
                        ],
                        8,
                        qO
                      ),
                    ]),
                    _: 1,
                  }
                ),
              ]),
              _: 1,
            }),
          ]),
          _: 1,
        },
        8,
        ["modelValue"]
      ),
    ])
  );
}
var _O = ci(PO, [["render", HO]]),
  UO = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: _O },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
const zO = zn({ name: "ErrorNotFound" }),
  KO = {
    class: "fullscreen bg-blue text-white text-center q-pa-md flex flex-center",
  },
  WO = et("div", { style: { "font-size": "30vh" } }, " 404 ", -1),
  QO = et(
    "div",
    { class: "text-h2", style: { opacity: ".4" } },
    " Oops. Nothing here... ",
    -1
  );
function GO(e, t, n, r, o, a) {
  return (
    lt(),
    kr("div", KO, [
      et("div", null, [
        WO,
        QO,
        M(ot, {
          class: "q-mt-xl",
          color: "white",
          "text-color": "blue",
          unelevated: "",
          to: "/",
          label: "Go Home",
          "no-caps": "",
        }),
      ]),
    ])
  );
}
var XO = ci(zO, [["render", GO]]),
  YO = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: XO },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
