import kt, { ipcMain as ve, app as $e, BrowserWindow as Xl, dialog as mn, shell as Ha, safeStorage as tn } from "electron";
import { fileURLToPath as Lc } from "node:url";
import Ct from "fs";
import Uc from "constants";
import Or from "stream";
import ga from "util";
import Jl from "assert";
import ke from "path";
import rn from "child_process";
import Kl from "events";
import Ir from "crypto";
import Ql from "tty";
import nn from "os";
import At from "url";
import Zl from "zlib";
import $c from "http";
import fe from "node:path";
import { exec as Nt, spawn as en, execFile as wt, execSync as eu } from "node:child_process";
import ce from "node:fs";
import Jt from "node:os";
import rr from "node:http";
import nr from "node:https";
import kc from "node-pty";
import { SerialPort as ir } from "serialport";
var ot = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, xt = {}, gn = {}, Br = {}, Ga;
function tt() {
  return Ga || (Ga = 1, Br.fromCallback = function(s) {
    return Object.defineProperty(function(...h) {
      if (typeof h[h.length - 1] == "function") s.apply(this, h);
      else
        return new Promise((m, f) => {
          h.push((c, l) => c != null ? f(c) : m(l)), s.apply(this, h);
        });
    }, "name", { value: s.name });
  }, Br.fromPromise = function(s) {
    return Object.defineProperty(function(...h) {
      const m = h[h.length - 1];
      if (typeof m != "function") return s.apply(this, h);
      h.pop(), s.apply(this, h).then((f) => m(null, f), m);
    }, "name", { value: s.name });
  }), Br;
}
var yn, Wa;
function qc() {
  if (Wa) return yn;
  Wa = 1;
  var s = Uc, h = process.cwd, m = null, f = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return m || (m = h.call(process)), m;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var c = process.chdir;
    process.chdir = function(e) {
      m = null, c.call(process, e);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, c);
  }
  yn = l;
  function l(e) {
    s.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && u(e), e.lutimes || i(e), e.chown = t(e.chown), e.fchown = t(e.fchown), e.lchown = t(e.lchown), e.chmod = o(e.chmod), e.fchmod = o(e.fchmod), e.lchmod = o(e.lchmod), e.chownSync = r(e.chownSync), e.fchownSync = r(e.fchownSync), e.lchownSync = r(e.lchownSync), e.chmodSync = n(e.chmodSync), e.fchmodSync = n(e.fchmodSync), e.lchmodSync = n(e.lchmodSync), e.stat = d(e.stat), e.fstat = d(e.fstat), e.lstat = d(e.lstat), e.statSync = g(e.statSync), e.fstatSync = g(e.fstatSync), e.lstatSync = g(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(p, w, R) {
      R && process.nextTick(R);
    }, e.lchmodSync = function() {
    }), e.chown && !e.lchown && (e.lchown = function(p, w, R, P) {
      P && process.nextTick(P);
    }, e.lchownSync = function() {
    }), f === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : (function(p) {
      function w(R, P, N) {
        var A = Date.now(), O = 0;
        p(R, P, function b(S) {
          if (S && (S.code === "EACCES" || S.code === "EPERM" || S.code === "EBUSY") && Date.now() - A < 6e4) {
            setTimeout(function() {
              e.stat(P, function(D, _) {
                D && D.code === "ENOENT" ? p(R, P, b) : N(S);
              });
            }, O), O < 100 && (O += 10);
            return;
          }
          N && N(S);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(w, p), w;
    })(e.rename)), e.read = typeof e.read != "function" ? e.read : (function(p) {
      function w(R, P, N, A, O, b) {
        var S;
        if (b && typeof b == "function") {
          var D = 0;
          S = function(_, k, $) {
            if (_ && _.code === "EAGAIN" && D < 10)
              return D++, p.call(e, R, P, N, A, O, S);
            b.apply(this, arguments);
          };
        }
        return p.call(e, R, P, N, A, O, S);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(w, p), w;
    })(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ (function(p) {
      return function(w, R, P, N, A) {
        for (var O = 0; ; )
          try {
            return p.call(e, w, R, P, N, A);
          } catch (b) {
            if (b.code === "EAGAIN" && O < 10) {
              O++;
              continue;
            }
            throw b;
          }
      };
    })(e.readSync);
    function u(p) {
      p.lchmod = function(w, R, P) {
        p.open(
          w,
          s.O_WRONLY | s.O_SYMLINK,
          R,
          function(N, A) {
            if (N) {
              P && P(N);
              return;
            }
            p.fchmod(A, R, function(O) {
              p.close(A, function(b) {
                P && P(O || b);
              });
            });
          }
        );
      }, p.lchmodSync = function(w, R) {
        var P = p.openSync(w, s.O_WRONLY | s.O_SYMLINK, R), N = !0, A;
        try {
          A = p.fchmodSync(P, R), N = !1;
        } finally {
          if (N)
            try {
              p.closeSync(P);
            } catch {
            }
          else
            p.closeSync(P);
        }
        return A;
      };
    }
    function i(p) {
      s.hasOwnProperty("O_SYMLINK") && p.futimes ? (p.lutimes = function(w, R, P, N) {
        p.open(w, s.O_SYMLINK, function(A, O) {
          if (A) {
            N && N(A);
            return;
          }
          p.futimes(O, R, P, function(b) {
            p.close(O, function(S) {
              N && N(b || S);
            });
          });
        });
      }, p.lutimesSync = function(w, R, P) {
        var N = p.openSync(w, s.O_SYMLINK), A, O = !0;
        try {
          A = p.futimesSync(N, R, P), O = !1;
        } finally {
          if (O)
            try {
              p.closeSync(N);
            } catch {
            }
          else
            p.closeSync(N);
        }
        return A;
      }) : p.futimes && (p.lutimes = function(w, R, P, N) {
        N && process.nextTick(N);
      }, p.lutimesSync = function() {
      });
    }
    function o(p) {
      return p && function(w, R, P) {
        return p.call(e, w, R, function(N) {
          v(N) && (N = null), P && P.apply(this, arguments);
        });
      };
    }
    function n(p) {
      return p && function(w, R) {
        try {
          return p.call(e, w, R);
        } catch (P) {
          if (!v(P)) throw P;
        }
      };
    }
    function t(p) {
      return p && function(w, R, P, N) {
        return p.call(e, w, R, P, function(A) {
          v(A) && (A = null), N && N.apply(this, arguments);
        });
      };
    }
    function r(p) {
      return p && function(w, R, P) {
        try {
          return p.call(e, w, R, P);
        } catch (N) {
          if (!v(N)) throw N;
        }
      };
    }
    function d(p) {
      return p && function(w, R, P) {
        typeof R == "function" && (P = R, R = null);
        function N(A, O) {
          O && (O.uid < 0 && (O.uid += 4294967296), O.gid < 0 && (O.gid += 4294967296)), P && P.apply(this, arguments);
        }
        return R ? p.call(e, w, R, N) : p.call(e, w, N);
      };
    }
    function g(p) {
      return p && function(w, R) {
        var P = R ? p.call(e, w, R) : p.call(e, w);
        return P && (P.uid < 0 && (P.uid += 4294967296), P.gid < 0 && (P.gid += 4294967296)), P;
      };
    }
    function v(p) {
      if (!p || p.code === "ENOSYS")
        return !0;
      var w = !process.getuid || process.getuid() !== 0;
      return !!(w && (p.code === "EINVAL" || p.code === "EPERM"));
    }
  }
  return yn;
}
var vn, Va;
function Mc() {
  if (Va) return vn;
  Va = 1;
  var s = Or.Stream;
  vn = h;
  function h(m) {
    return {
      ReadStream: f,
      WriteStream: c
    };
    function f(l, e) {
      if (!(this instanceof f)) return new f(l, e);
      s.call(this);
      var u = this;
      this.path = l, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, e = e || {};
      for (var i = Object.keys(e), o = 0, n = i.length; o < n; o++) {
        var t = i[o];
        this[t] = e[t];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          u._read();
        });
        return;
      }
      m.open(this.path, this.flags, this.mode, function(r, d) {
        if (r) {
          u.emit("error", r), u.readable = !1;
          return;
        }
        u.fd = d, u.emit("open", d), u._read();
      });
    }
    function c(l, e) {
      if (!(this instanceof c)) return new c(l, e);
      s.call(this), this.path = l, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, e = e || {};
      for (var u = Object.keys(e), i = 0, o = u.length; i < o; i++) {
        var n = u[i];
        this[n] = e[n];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = m.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return vn;
}
var En, za;
function Bc() {
  if (za) return En;
  za = 1, En = h;
  var s = Object.getPrototypeOf || function(m) {
    return m.__proto__;
  };
  function h(m) {
    if (m === null || typeof m != "object")
      return m;
    if (m instanceof Object)
      var f = { __proto__: s(m) };
    else
      var f = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(m).forEach(function(c) {
      Object.defineProperty(f, c, Object.getOwnPropertyDescriptor(m, c));
    }), f;
  }
  return En;
}
var jr, Ya;
function Qe() {
  if (Ya) return jr;
  Ya = 1;
  var s = Ct, h = qc(), m = Mc(), f = Bc(), c = ga, l, e;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (l = /* @__PURE__ */ Symbol.for("graceful-fs.queue"), e = /* @__PURE__ */ Symbol.for("graceful-fs.previous")) : (l = "___graceful-fs.queue", e = "___graceful-fs.previous");
  function u() {
  }
  function i(p, w) {
    Object.defineProperty(p, l, {
      get: function() {
        return w;
      }
    });
  }
  var o = u;
  if (c.debuglog ? o = c.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (o = function() {
    var p = c.format.apply(c, arguments);
    p = "GFS4: " + p.split(/\n/).join(`
GFS4: `), console.error(p);
  }), !s[l]) {
    var n = ot[l] || [];
    i(s, n), s.close = (function(p) {
      function w(R, P) {
        return p.call(s, R, function(N) {
          N || g(), typeof P == "function" && P.apply(this, arguments);
        });
      }
      return Object.defineProperty(w, e, {
        value: p
      }), w;
    })(s.close), s.closeSync = (function(p) {
      function w(R) {
        p.apply(s, arguments), g();
      }
      return Object.defineProperty(w, e, {
        value: p
      }), w;
    })(s.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      o(s[l]), Jl.equal(s[l].length, 0);
    });
  }
  ot[l] || i(ot, s[l]), jr = t(f(s)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !s.__patched && (jr = t(s), s.__patched = !0);
  function t(p) {
    h(p), p.gracefulify = t, p.createReadStream = ge, p.createWriteStream = Z;
    var w = p.readFile;
    p.readFile = R;
    function R(Q, de, _e) {
      return typeof de == "function" && (_e = de, de = null), be(Q, de, _e);
      function be(Ne, Ie, Te, E) {
        return w(Ne, Ie, function(y) {
          y && (y.code === "EMFILE" || y.code === "ENFILE") ? r([be, [Ne, Ie, Te], y, E || Date.now(), Date.now()]) : typeof Te == "function" && Te.apply(this, arguments);
        });
      }
    }
    var P = p.writeFile;
    p.writeFile = N;
    function N(Q, de, _e, be) {
      return typeof _e == "function" && (be = _e, _e = null), Ne(Q, de, _e, be);
      function Ne(Ie, Te, E, y, q) {
        return P(Ie, Te, E, function(I) {
          I && (I.code === "EMFILE" || I.code === "ENFILE") ? r([Ne, [Ie, Te, E, y], I, q || Date.now(), Date.now()]) : typeof y == "function" && y.apply(this, arguments);
        });
      }
    }
    var A = p.appendFile;
    A && (p.appendFile = O);
    function O(Q, de, _e, be) {
      return typeof _e == "function" && (be = _e, _e = null), Ne(Q, de, _e, be);
      function Ne(Ie, Te, E, y, q) {
        return A(Ie, Te, E, function(I) {
          I && (I.code === "EMFILE" || I.code === "ENFILE") ? r([Ne, [Ie, Te, E, y], I, q || Date.now(), Date.now()]) : typeof y == "function" && y.apply(this, arguments);
        });
      }
    }
    var b = p.copyFile;
    b && (p.copyFile = S);
    function S(Q, de, _e, be) {
      return typeof _e == "function" && (be = _e, _e = 0), Ne(Q, de, _e, be);
      function Ne(Ie, Te, E, y, q) {
        return b(Ie, Te, E, function(I) {
          I && (I.code === "EMFILE" || I.code === "ENFILE") ? r([Ne, [Ie, Te, E, y], I, q || Date.now(), Date.now()]) : typeof y == "function" && y.apply(this, arguments);
        });
      }
    }
    var D = p.readdir;
    p.readdir = k;
    var _ = /^v[0-5]\./;
    function k(Q, de, _e) {
      typeof de == "function" && (_e = de, de = null);
      var be = _.test(process.version) ? function(Te, E, y, q) {
        return D(Te, Ne(
          Te,
          E,
          y,
          q
        ));
      } : function(Te, E, y, q) {
        return D(Te, E, Ne(
          Te,
          E,
          y,
          q
        ));
      };
      return be(Q, de, _e);
      function Ne(Ie, Te, E, y) {
        return function(q, I) {
          q && (q.code === "EMFILE" || q.code === "ENFILE") ? r([
            be,
            [Ie, Te, E],
            q,
            y || Date.now(),
            Date.now()
          ]) : (I && I.sort && I.sort(), typeof E == "function" && E.call(this, q, I));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var $ = m(p);
      x = $.ReadStream, z = $.WriteStream;
    }
    var M = p.ReadStream;
    M && (x.prototype = Object.create(M.prototype), x.prototype.open = G);
    var L = p.WriteStream;
    L && (z.prototype = Object.create(L.prototype), z.prototype.open = ee), Object.defineProperty(p, "ReadStream", {
      get: function() {
        return x;
      },
      set: function(Q) {
        x = Q;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(p, "WriteStream", {
      get: function() {
        return z;
      },
      set: function(Q) {
        z = Q;
      },
      enumerable: !0,
      configurable: !0
    });
    var F = x;
    Object.defineProperty(p, "FileReadStream", {
      get: function() {
        return F;
      },
      set: function(Q) {
        F = Q;
      },
      enumerable: !0,
      configurable: !0
    });
    var H = z;
    Object.defineProperty(p, "FileWriteStream", {
      get: function() {
        return H;
      },
      set: function(Q) {
        H = Q;
      },
      enumerable: !0,
      configurable: !0
    });
    function x(Q, de) {
      return this instanceof x ? (M.apply(this, arguments), this) : x.apply(Object.create(x.prototype), arguments);
    }
    function G() {
      var Q = this;
      ye(Q.path, Q.flags, Q.mode, function(de, _e) {
        de ? (Q.autoClose && Q.destroy(), Q.emit("error", de)) : (Q.fd = _e, Q.emit("open", _e), Q.read());
      });
    }
    function z(Q, de) {
      return this instanceof z ? (L.apply(this, arguments), this) : z.apply(Object.create(z.prototype), arguments);
    }
    function ee() {
      var Q = this;
      ye(Q.path, Q.flags, Q.mode, function(de, _e) {
        de ? (Q.destroy(), Q.emit("error", de)) : (Q.fd = _e, Q.emit("open", _e));
      });
    }
    function ge(Q, de) {
      return new p.ReadStream(Q, de);
    }
    function Z(Q, de) {
      return new p.WriteStream(Q, de);
    }
    var we = p.open;
    p.open = ye;
    function ye(Q, de, _e, be) {
      return typeof _e == "function" && (be = _e, _e = null), Ne(Q, de, _e, be);
      function Ne(Ie, Te, E, y, q) {
        return we(Ie, Te, E, function(I, Ce) {
          I && (I.code === "EMFILE" || I.code === "ENFILE") ? r([Ne, [Ie, Te, E, y], I, q || Date.now(), Date.now()]) : typeof y == "function" && y.apply(this, arguments);
        });
      }
    }
    return p;
  }
  function r(p) {
    o("ENQUEUE", p[0].name, p[1]), s[l].push(p), v();
  }
  var d;
  function g() {
    for (var p = Date.now(), w = 0; w < s[l].length; ++w)
      s[l][w].length > 2 && (s[l][w][3] = p, s[l][w][4] = p);
    v();
  }
  function v() {
    if (clearTimeout(d), d = void 0, s[l].length !== 0) {
      var p = s[l].shift(), w = p[0], R = p[1], P = p[2], N = p[3], A = p[4];
      if (N === void 0)
        o("RETRY", w.name, R), w.apply(null, R);
      else if (Date.now() - N >= 6e4) {
        o("TIMEOUT", w.name, R);
        var O = R.pop();
        typeof O == "function" && O.call(null, P);
      } else {
        var b = Date.now() - A, S = Math.max(A - N, 1), D = Math.min(S * 1.2, 100);
        b >= D ? (o("RETRY", w.name, R), w.apply(null, R.concat([N]))) : s[l].push(p);
      }
      d === void 0 && (d = setTimeout(v, 0));
    }
  }
  return jr;
}
var Xa;
function Kt() {
  return Xa || (Xa = 1, (function(s) {
    const h = tt().fromCallback, m = Qe(), f = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((c) => typeof m[c] == "function");
    Object.assign(s, m), f.forEach((c) => {
      s[c] = h(m[c]);
    }), s.exists = function(c, l) {
      return typeof l == "function" ? m.exists(c, l) : new Promise((e) => m.exists(c, e));
    }, s.read = function(c, l, e, u, i, o) {
      return typeof o == "function" ? m.read(c, l, e, u, i, o) : new Promise((n, t) => {
        m.read(c, l, e, u, i, (r, d, g) => {
          if (r) return t(r);
          n({ bytesRead: d, buffer: g });
        });
      });
    }, s.write = function(c, l, ...e) {
      return typeof e[e.length - 1] == "function" ? m.write(c, l, ...e) : new Promise((u, i) => {
        m.write(c, l, ...e, (o, n, t) => {
          if (o) return i(o);
          u({ bytesWritten: n, buffer: t });
        });
      });
    }, typeof m.writev == "function" && (s.writev = function(c, l, ...e) {
      return typeof e[e.length - 1] == "function" ? m.writev(c, l, ...e) : new Promise((u, i) => {
        m.writev(c, l, ...e, (o, n, t) => {
          if (o) return i(o);
          u({ bytesWritten: n, buffers: t });
        });
      });
    }), typeof m.realpath.native == "function" ? s.realpath.native = h(m.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  })(gn)), gn;
}
var Hr = {}, wn = {}, Ja;
function jc() {
  if (Ja) return wn;
  Ja = 1;
  const s = ke;
  return wn.checkPath = function(m) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(m.replace(s.parse(m).root, ""))) {
      const c = new Error(`Path contains invalid characters: ${m}`);
      throw c.code = "EINVAL", c;
    }
  }, wn;
}
var Ka;
function Hc() {
  if (Ka) return Hr;
  Ka = 1;
  const s = /* @__PURE__ */ Kt(), { checkPath: h } = /* @__PURE__ */ jc(), m = (f) => {
    const c = { mode: 511 };
    return typeof f == "number" ? f : { ...c, ...f }.mode;
  };
  return Hr.makeDir = async (f, c) => (h(f), s.mkdir(f, {
    mode: m(c),
    recursive: !0
  })), Hr.makeDirSync = (f, c) => (h(f), s.mkdirSync(f, {
    mode: m(c),
    recursive: !0
  })), Hr;
}
var _n, Qa;
function dt() {
  if (Qa) return _n;
  Qa = 1;
  const s = tt().fromPromise, { makeDir: h, makeDirSync: m } = /* @__PURE__ */ Hc(), f = s(h);
  return _n = {
    mkdirs: f,
    mkdirsSync: m,
    // alias
    mkdirp: f,
    mkdirpSync: m,
    ensureDir: f,
    ensureDirSync: m
  }, _n;
}
var Sn, Za;
function qt() {
  if (Za) return Sn;
  Za = 1;
  const s = tt().fromPromise, h = /* @__PURE__ */ Kt();
  function m(f) {
    return h.access(f).then(() => !0).catch(() => !1);
  }
  return Sn = {
    pathExists: s(m),
    pathExistsSync: h.existsSync
  }, Sn;
}
var Rn, es;
function tu() {
  if (es) return Rn;
  es = 1;
  const s = Qe();
  function h(f, c, l, e) {
    s.open(f, "r+", (u, i) => {
      if (u) return e(u);
      s.futimes(i, c, l, (o) => {
        s.close(i, (n) => {
          e && e(o || n);
        });
      });
    });
  }
  function m(f, c, l) {
    const e = s.openSync(f, "r+");
    return s.futimesSync(e, c, l), s.closeSync(e);
  }
  return Rn = {
    utimesMillis: h,
    utimesMillisSync: m
  }, Rn;
}
var Cn, ts;
function Qt() {
  if (ts) return Cn;
  ts = 1;
  const s = /* @__PURE__ */ Kt(), h = ke, m = ga;
  function f(r, d, g) {
    const v = g.dereference ? (p) => s.stat(p, { bigint: !0 }) : (p) => s.lstat(p, { bigint: !0 });
    return Promise.all([
      v(r),
      v(d).catch((p) => {
        if (p.code === "ENOENT") return null;
        throw p;
      })
    ]).then(([p, w]) => ({ srcStat: p, destStat: w }));
  }
  function c(r, d, g) {
    let v;
    const p = g.dereference ? (R) => s.statSync(R, { bigint: !0 }) : (R) => s.lstatSync(R, { bigint: !0 }), w = p(r);
    try {
      v = p(d);
    } catch (R) {
      if (R.code === "ENOENT") return { srcStat: w, destStat: null };
      throw R;
    }
    return { srcStat: w, destStat: v };
  }
  function l(r, d, g, v, p) {
    m.callbackify(f)(r, d, v, (w, R) => {
      if (w) return p(w);
      const { srcStat: P, destStat: N } = R;
      if (N) {
        if (o(P, N)) {
          const A = h.basename(r), O = h.basename(d);
          return g === "move" && A !== O && A.toLowerCase() === O.toLowerCase() ? p(null, { srcStat: P, destStat: N, isChangingCase: !0 }) : p(new Error("Source and destination must not be the same."));
        }
        if (P.isDirectory() && !N.isDirectory())
          return p(new Error(`Cannot overwrite non-directory '${d}' with directory '${r}'.`));
        if (!P.isDirectory() && N.isDirectory())
          return p(new Error(`Cannot overwrite directory '${d}' with non-directory '${r}'.`));
      }
      return P.isDirectory() && n(r, d) ? p(new Error(t(r, d, g))) : p(null, { srcStat: P, destStat: N });
    });
  }
  function e(r, d, g, v) {
    const { srcStat: p, destStat: w } = c(r, d, v);
    if (w) {
      if (o(p, w)) {
        const R = h.basename(r), P = h.basename(d);
        if (g === "move" && R !== P && R.toLowerCase() === P.toLowerCase())
          return { srcStat: p, destStat: w, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (p.isDirectory() && !w.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${d}' with directory '${r}'.`);
      if (!p.isDirectory() && w.isDirectory())
        throw new Error(`Cannot overwrite directory '${d}' with non-directory '${r}'.`);
    }
    if (p.isDirectory() && n(r, d))
      throw new Error(t(r, d, g));
    return { srcStat: p, destStat: w };
  }
  function u(r, d, g, v, p) {
    const w = h.resolve(h.dirname(r)), R = h.resolve(h.dirname(g));
    if (R === w || R === h.parse(R).root) return p();
    s.stat(R, { bigint: !0 }, (P, N) => P ? P.code === "ENOENT" ? p() : p(P) : o(d, N) ? p(new Error(t(r, g, v))) : u(r, d, R, v, p));
  }
  function i(r, d, g, v) {
    const p = h.resolve(h.dirname(r)), w = h.resolve(h.dirname(g));
    if (w === p || w === h.parse(w).root) return;
    let R;
    try {
      R = s.statSync(w, { bigint: !0 });
    } catch (P) {
      if (P.code === "ENOENT") return;
      throw P;
    }
    if (o(d, R))
      throw new Error(t(r, g, v));
    return i(r, d, w, v);
  }
  function o(r, d) {
    return d.ino && d.dev && d.ino === r.ino && d.dev === r.dev;
  }
  function n(r, d) {
    const g = h.resolve(r).split(h.sep).filter((p) => p), v = h.resolve(d).split(h.sep).filter((p) => p);
    return g.reduce((p, w, R) => p && v[R] === w, !0);
  }
  function t(r, d, g) {
    return `Cannot ${g} '${r}' to a subdirectory of itself, '${d}'.`;
  }
  return Cn = {
    checkPaths: l,
    checkPathsSync: e,
    checkParentPaths: u,
    checkParentPathsSync: i,
    isSrcSubdir: n,
    areIdentical: o
  }, Cn;
}
var An, rs;
function Gc() {
  if (rs) return An;
  rs = 1;
  const s = Qe(), h = ke, m = dt().mkdirs, f = qt().pathExists, c = tu().utimesMillis, l = /* @__PURE__ */ Qt();
  function e(k, $, M, L) {
    typeof M == "function" && !L ? (L = M, M = {}) : typeof M == "function" && (M = { filter: M }), L = L || function() {
    }, M = M || {}, M.clobber = "clobber" in M ? !!M.clobber : !0, M.overwrite = "overwrite" in M ? !!M.overwrite : M.clobber, M.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), l.checkPaths(k, $, "copy", M, (F, H) => {
      if (F) return L(F);
      const { srcStat: x, destStat: G } = H;
      l.checkParentPaths(k, x, $, "copy", (z) => z ? L(z) : M.filter ? i(u, G, k, $, M, L) : u(G, k, $, M, L));
    });
  }
  function u(k, $, M, L, F) {
    const H = h.dirname(M);
    f(H, (x, G) => {
      if (x) return F(x);
      if (G) return n(k, $, M, L, F);
      m(H, (z) => z ? F(z) : n(k, $, M, L, F));
    });
  }
  function i(k, $, M, L, F, H) {
    Promise.resolve(F.filter(M, L)).then((x) => x ? k($, M, L, F, H) : H(), (x) => H(x));
  }
  function o(k, $, M, L, F) {
    return L.filter ? i(n, k, $, M, L, F) : n(k, $, M, L, F);
  }
  function n(k, $, M, L, F) {
    (L.dereference ? s.stat : s.lstat)($, (x, G) => x ? F(x) : G.isDirectory() ? N(G, k, $, M, L, F) : G.isFile() || G.isCharacterDevice() || G.isBlockDevice() ? t(G, k, $, M, L, F) : G.isSymbolicLink() ? D(k, $, M, L, F) : G.isSocket() ? F(new Error(`Cannot copy a socket file: ${$}`)) : G.isFIFO() ? F(new Error(`Cannot copy a FIFO pipe: ${$}`)) : F(new Error(`Unknown file: ${$}`)));
  }
  function t(k, $, M, L, F, H) {
    return $ ? r(k, M, L, F, H) : d(k, M, L, F, H);
  }
  function r(k, $, M, L, F) {
    if (L.overwrite)
      s.unlink(M, (H) => H ? F(H) : d(k, $, M, L, F));
    else return L.errorOnExist ? F(new Error(`'${M}' already exists`)) : F();
  }
  function d(k, $, M, L, F) {
    s.copyFile($, M, (H) => H ? F(H) : L.preserveTimestamps ? g(k.mode, $, M, F) : R(M, k.mode, F));
  }
  function g(k, $, M, L) {
    return v(k) ? p(M, k, (F) => F ? L(F) : w(k, $, M, L)) : w(k, $, M, L);
  }
  function v(k) {
    return (k & 128) === 0;
  }
  function p(k, $, M) {
    return R(k, $ | 128, M);
  }
  function w(k, $, M, L) {
    P($, M, (F) => F ? L(F) : R(M, k, L));
  }
  function R(k, $, M) {
    return s.chmod(k, $, M);
  }
  function P(k, $, M) {
    s.stat(k, (L, F) => L ? M(L) : c($, F.atime, F.mtime, M));
  }
  function N(k, $, M, L, F, H) {
    return $ ? O(M, L, F, H) : A(k.mode, M, L, F, H);
  }
  function A(k, $, M, L, F) {
    s.mkdir(M, (H) => {
      if (H) return F(H);
      O($, M, L, (x) => x ? F(x) : R(M, k, F));
    });
  }
  function O(k, $, M, L) {
    s.readdir(k, (F, H) => F ? L(F) : b(H, k, $, M, L));
  }
  function b(k, $, M, L, F) {
    const H = k.pop();
    return H ? S(k, H, $, M, L, F) : F();
  }
  function S(k, $, M, L, F, H) {
    const x = h.join(M, $), G = h.join(L, $);
    l.checkPaths(x, G, "copy", F, (z, ee) => {
      if (z) return H(z);
      const { destStat: ge } = ee;
      o(ge, x, G, F, (Z) => Z ? H(Z) : b(k, M, L, F, H));
    });
  }
  function D(k, $, M, L, F) {
    s.readlink($, (H, x) => {
      if (H) return F(H);
      if (L.dereference && (x = h.resolve(process.cwd(), x)), k)
        s.readlink(M, (G, z) => G ? G.code === "EINVAL" || G.code === "UNKNOWN" ? s.symlink(x, M, F) : F(G) : (L.dereference && (z = h.resolve(process.cwd(), z)), l.isSrcSubdir(x, z) ? F(new Error(`Cannot copy '${x}' to a subdirectory of itself, '${z}'.`)) : k.isDirectory() && l.isSrcSubdir(z, x) ? F(new Error(`Cannot overwrite '${z}' with '${x}'.`)) : _(x, M, F)));
      else
        return s.symlink(x, M, F);
    });
  }
  function _(k, $, M) {
    s.unlink($, (L) => L ? M(L) : s.symlink(k, $, M));
  }
  return An = e, An;
}
var Tn, ns;
function Wc() {
  if (ns) return Tn;
  ns = 1;
  const s = Qe(), h = ke, m = dt().mkdirsSync, f = tu().utimesMillisSync, c = /* @__PURE__ */ Qt();
  function l(b, S, D) {
    typeof D == "function" && (D = { filter: D }), D = D || {}, D.clobber = "clobber" in D ? !!D.clobber : !0, D.overwrite = "overwrite" in D ? !!D.overwrite : D.clobber, D.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: _, destStat: k } = c.checkPathsSync(b, S, "copy", D);
    return c.checkParentPathsSync(b, _, S, "copy"), e(k, b, S, D);
  }
  function e(b, S, D, _) {
    if (_.filter && !_.filter(S, D)) return;
    const k = h.dirname(D);
    return s.existsSync(k) || m(k), i(b, S, D, _);
  }
  function u(b, S, D, _) {
    if (!(_.filter && !_.filter(S, D)))
      return i(b, S, D, _);
  }
  function i(b, S, D, _) {
    const $ = (_.dereference ? s.statSync : s.lstatSync)(S);
    if ($.isDirectory()) return w($, b, S, D, _);
    if ($.isFile() || $.isCharacterDevice() || $.isBlockDevice()) return o($, b, S, D, _);
    if ($.isSymbolicLink()) return A(b, S, D, _);
    throw $.isSocket() ? new Error(`Cannot copy a socket file: ${S}`) : $.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${S}`) : new Error(`Unknown file: ${S}`);
  }
  function o(b, S, D, _, k) {
    return S ? n(b, D, _, k) : t(b, D, _, k);
  }
  function n(b, S, D, _) {
    if (_.overwrite)
      return s.unlinkSync(D), t(b, S, D, _);
    if (_.errorOnExist)
      throw new Error(`'${D}' already exists`);
  }
  function t(b, S, D, _) {
    return s.copyFileSync(S, D), _.preserveTimestamps && r(b.mode, S, D), v(D, b.mode);
  }
  function r(b, S, D) {
    return d(b) && g(D, b), p(S, D);
  }
  function d(b) {
    return (b & 128) === 0;
  }
  function g(b, S) {
    return v(b, S | 128);
  }
  function v(b, S) {
    return s.chmodSync(b, S);
  }
  function p(b, S) {
    const D = s.statSync(b);
    return f(S, D.atime, D.mtime);
  }
  function w(b, S, D, _, k) {
    return S ? P(D, _, k) : R(b.mode, D, _, k);
  }
  function R(b, S, D, _) {
    return s.mkdirSync(D), P(S, D, _), v(D, b);
  }
  function P(b, S, D) {
    s.readdirSync(b).forEach((_) => N(_, b, S, D));
  }
  function N(b, S, D, _) {
    const k = h.join(S, b), $ = h.join(D, b), { destStat: M } = c.checkPathsSync(k, $, "copy", _);
    return u(M, k, $, _);
  }
  function A(b, S, D, _) {
    let k = s.readlinkSync(S);
    if (_.dereference && (k = h.resolve(process.cwd(), k)), b) {
      let $;
      try {
        $ = s.readlinkSync(D);
      } catch (M) {
        if (M.code === "EINVAL" || M.code === "UNKNOWN") return s.symlinkSync(k, D);
        throw M;
      }
      if (_.dereference && ($ = h.resolve(process.cwd(), $)), c.isSrcSubdir(k, $))
        throw new Error(`Cannot copy '${k}' to a subdirectory of itself, '${$}'.`);
      if (s.statSync(D).isDirectory() && c.isSrcSubdir($, k))
        throw new Error(`Cannot overwrite '${$}' with '${k}'.`);
      return O(k, D);
    } else
      return s.symlinkSync(k, D);
  }
  function O(b, S) {
    return s.unlinkSync(S), s.symlinkSync(b, S);
  }
  return Tn = l, Tn;
}
var bn, is;
function ya() {
  if (is) return bn;
  is = 1;
  const s = tt().fromCallback;
  return bn = {
    copy: s(/* @__PURE__ */ Gc()),
    copySync: /* @__PURE__ */ Wc()
  }, bn;
}
var Pn, as;
function Vc() {
  if (as) return Pn;
  as = 1;
  const s = Qe(), h = ke, m = Jl, f = process.platform === "win32";
  function c(g) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((p) => {
      g[p] = g[p] || s[p], p = p + "Sync", g[p] = g[p] || s[p];
    }), g.maxBusyTries = g.maxBusyTries || 3;
  }
  function l(g, v, p) {
    let w = 0;
    typeof v == "function" && (p = v, v = {}), m(g, "rimraf: missing path"), m.strictEqual(typeof g, "string", "rimraf: path should be a string"), m.strictEqual(typeof p, "function", "rimraf: callback function required"), m(v, "rimraf: invalid options argument provided"), m.strictEqual(typeof v, "object", "rimraf: options should be object"), c(v), e(g, v, function R(P) {
      if (P) {
        if ((P.code === "EBUSY" || P.code === "ENOTEMPTY" || P.code === "EPERM") && w < v.maxBusyTries) {
          w++;
          const N = w * 100;
          return setTimeout(() => e(g, v, R), N);
        }
        P.code === "ENOENT" && (P = null);
      }
      p(P);
    });
  }
  function e(g, v, p) {
    m(g), m(v), m(typeof p == "function"), v.lstat(g, (w, R) => {
      if (w && w.code === "ENOENT")
        return p(null);
      if (w && w.code === "EPERM" && f)
        return u(g, v, w, p);
      if (R && R.isDirectory())
        return o(g, v, w, p);
      v.unlink(g, (P) => {
        if (P) {
          if (P.code === "ENOENT")
            return p(null);
          if (P.code === "EPERM")
            return f ? u(g, v, P, p) : o(g, v, P, p);
          if (P.code === "EISDIR")
            return o(g, v, P, p);
        }
        return p(P);
      });
    });
  }
  function u(g, v, p, w) {
    m(g), m(v), m(typeof w == "function"), v.chmod(g, 438, (R) => {
      R ? w(R.code === "ENOENT" ? null : p) : v.stat(g, (P, N) => {
        P ? w(P.code === "ENOENT" ? null : p) : N.isDirectory() ? o(g, v, p, w) : v.unlink(g, w);
      });
    });
  }
  function i(g, v, p) {
    let w;
    m(g), m(v);
    try {
      v.chmodSync(g, 438);
    } catch (R) {
      if (R.code === "ENOENT")
        return;
      throw p;
    }
    try {
      w = v.statSync(g);
    } catch (R) {
      if (R.code === "ENOENT")
        return;
      throw p;
    }
    w.isDirectory() ? r(g, v, p) : v.unlinkSync(g);
  }
  function o(g, v, p, w) {
    m(g), m(v), m(typeof w == "function"), v.rmdir(g, (R) => {
      R && (R.code === "ENOTEMPTY" || R.code === "EEXIST" || R.code === "EPERM") ? n(g, v, w) : R && R.code === "ENOTDIR" ? w(p) : w(R);
    });
  }
  function n(g, v, p) {
    m(g), m(v), m(typeof p == "function"), v.readdir(g, (w, R) => {
      if (w) return p(w);
      let P = R.length, N;
      if (P === 0) return v.rmdir(g, p);
      R.forEach((A) => {
        l(h.join(g, A), v, (O) => {
          if (!N) {
            if (O) return p(N = O);
            --P === 0 && v.rmdir(g, p);
          }
        });
      });
    });
  }
  function t(g, v) {
    let p;
    v = v || {}, c(v), m(g, "rimraf: missing path"), m.strictEqual(typeof g, "string", "rimraf: path should be a string"), m(v, "rimraf: missing options"), m.strictEqual(typeof v, "object", "rimraf: options should be object");
    try {
      p = v.lstatSync(g);
    } catch (w) {
      if (w.code === "ENOENT")
        return;
      w.code === "EPERM" && f && i(g, v, w);
    }
    try {
      p && p.isDirectory() ? r(g, v, null) : v.unlinkSync(g);
    } catch (w) {
      if (w.code === "ENOENT")
        return;
      if (w.code === "EPERM")
        return f ? i(g, v, w) : r(g, v, w);
      if (w.code !== "EISDIR")
        throw w;
      r(g, v, w);
    }
  }
  function r(g, v, p) {
    m(g), m(v);
    try {
      v.rmdirSync(g);
    } catch (w) {
      if (w.code === "ENOTDIR")
        throw p;
      if (w.code === "ENOTEMPTY" || w.code === "EEXIST" || w.code === "EPERM")
        d(g, v);
      else if (w.code !== "ENOENT")
        throw w;
    }
  }
  function d(g, v) {
    if (m(g), m(v), v.readdirSync(g).forEach((p) => t(h.join(g, p), v)), f) {
      const p = Date.now();
      do
        try {
          return v.rmdirSync(g, v);
        } catch {
        }
      while (Date.now() - p < 500);
    } else
      return v.rmdirSync(g, v);
  }
  return Pn = l, l.sync = t, Pn;
}
var Dn, ss;
function an() {
  if (ss) return Dn;
  ss = 1;
  const s = Qe(), h = tt().fromCallback, m = /* @__PURE__ */ Vc();
  function f(l, e) {
    if (s.rm) return s.rm(l, { recursive: !0, force: !0 }, e);
    m(l, e);
  }
  function c(l) {
    if (s.rmSync) return s.rmSync(l, { recursive: !0, force: !0 });
    m.sync(l);
  }
  return Dn = {
    remove: h(f),
    removeSync: c
  }, Dn;
}
var On, os;
function zc() {
  if (os) return On;
  os = 1;
  const s = tt().fromPromise, h = /* @__PURE__ */ Kt(), m = ke, f = /* @__PURE__ */ dt(), c = /* @__PURE__ */ an(), l = s(async function(i) {
    let o;
    try {
      o = await h.readdir(i);
    } catch {
      return f.mkdirs(i);
    }
    return Promise.all(o.map((n) => c.remove(m.join(i, n))));
  });
  function e(u) {
    let i;
    try {
      i = h.readdirSync(u);
    } catch {
      return f.mkdirsSync(u);
    }
    i.forEach((o) => {
      o = m.join(u, o), c.removeSync(o);
    });
  }
  return On = {
    emptyDirSync: e,
    emptydirSync: e,
    emptyDir: l,
    emptydir: l
  }, On;
}
var In, ls;
function Yc() {
  if (ls) return In;
  ls = 1;
  const s = tt().fromCallback, h = ke, m = Qe(), f = /* @__PURE__ */ dt();
  function c(e, u) {
    function i() {
      m.writeFile(e, "", (o) => {
        if (o) return u(o);
        u();
      });
    }
    m.stat(e, (o, n) => {
      if (!o && n.isFile()) return u();
      const t = h.dirname(e);
      m.stat(t, (r, d) => {
        if (r)
          return r.code === "ENOENT" ? f.mkdirs(t, (g) => {
            if (g) return u(g);
            i();
          }) : u(r);
        d.isDirectory() ? i() : m.readdir(t, (g) => {
          if (g) return u(g);
        });
      });
    });
  }
  function l(e) {
    let u;
    try {
      u = m.statSync(e);
    } catch {
    }
    if (u && u.isFile()) return;
    const i = h.dirname(e);
    try {
      m.statSync(i).isDirectory() || m.readdirSync(i);
    } catch (o) {
      if (o && o.code === "ENOENT") f.mkdirsSync(i);
      else throw o;
    }
    m.writeFileSync(e, "");
  }
  return In = {
    createFile: s(c),
    createFileSync: l
  }, In;
}
var Nn, us;
function Xc() {
  if (us) return Nn;
  us = 1;
  const s = tt().fromCallback, h = ke, m = Qe(), f = /* @__PURE__ */ dt(), c = qt().pathExists, { areIdentical: l } = /* @__PURE__ */ Qt();
  function e(i, o, n) {
    function t(r, d) {
      m.link(r, d, (g) => {
        if (g) return n(g);
        n(null);
      });
    }
    m.lstat(o, (r, d) => {
      m.lstat(i, (g, v) => {
        if (g)
          return g.message = g.message.replace("lstat", "ensureLink"), n(g);
        if (d && l(v, d)) return n(null);
        const p = h.dirname(o);
        c(p, (w, R) => {
          if (w) return n(w);
          if (R) return t(i, o);
          f.mkdirs(p, (P) => {
            if (P) return n(P);
            t(i, o);
          });
        });
      });
    });
  }
  function u(i, o) {
    let n;
    try {
      n = m.lstatSync(o);
    } catch {
    }
    try {
      const d = m.lstatSync(i);
      if (n && l(d, n)) return;
    } catch (d) {
      throw d.message = d.message.replace("lstat", "ensureLink"), d;
    }
    const t = h.dirname(o);
    return m.existsSync(t) || f.mkdirsSync(t), m.linkSync(i, o);
  }
  return Nn = {
    createLink: s(e),
    createLinkSync: u
  }, Nn;
}
var xn, cs;
function Jc() {
  if (cs) return xn;
  cs = 1;
  const s = ke, h = Qe(), m = qt().pathExists;
  function f(l, e, u) {
    if (s.isAbsolute(l))
      return h.lstat(l, (i) => i ? (i.message = i.message.replace("lstat", "ensureSymlink"), u(i)) : u(null, {
        toCwd: l,
        toDst: l
      }));
    {
      const i = s.dirname(e), o = s.join(i, l);
      return m(o, (n, t) => n ? u(n) : t ? u(null, {
        toCwd: o,
        toDst: l
      }) : h.lstat(l, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), u(r)) : u(null, {
        toCwd: l,
        toDst: s.relative(i, l)
      })));
    }
  }
  function c(l, e) {
    let u;
    if (s.isAbsolute(l)) {
      if (u = h.existsSync(l), !u) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: l,
        toDst: l
      };
    } else {
      const i = s.dirname(e), o = s.join(i, l);
      if (u = h.existsSync(o), u)
        return {
          toCwd: o,
          toDst: l
        };
      if (u = h.existsSync(l), !u) throw new Error("relative srcpath does not exist");
      return {
        toCwd: l,
        toDst: s.relative(i, l)
      };
    }
  }
  return xn = {
    symlinkPaths: f,
    symlinkPathsSync: c
  }, xn;
}
var Fn, fs;
function Kc() {
  if (fs) return Fn;
  fs = 1;
  const s = Qe();
  function h(f, c, l) {
    if (l = typeof c == "function" ? c : l, c = typeof c == "function" ? !1 : c, c) return l(null, c);
    s.lstat(f, (e, u) => {
      if (e) return l(null, "file");
      c = u && u.isDirectory() ? "dir" : "file", l(null, c);
    });
  }
  function m(f, c) {
    let l;
    if (c) return c;
    try {
      l = s.lstatSync(f);
    } catch {
      return "file";
    }
    return l && l.isDirectory() ? "dir" : "file";
  }
  return Fn = {
    symlinkType: h,
    symlinkTypeSync: m
  }, Fn;
}
var Ln, ds;
function Qc() {
  if (ds) return Ln;
  ds = 1;
  const s = tt().fromCallback, h = ke, m = /* @__PURE__ */ Kt(), f = /* @__PURE__ */ dt(), c = f.mkdirs, l = f.mkdirsSync, e = /* @__PURE__ */ Jc(), u = e.symlinkPaths, i = e.symlinkPathsSync, o = /* @__PURE__ */ Kc(), n = o.symlinkType, t = o.symlinkTypeSync, r = qt().pathExists, { areIdentical: d } = /* @__PURE__ */ Qt();
  function g(w, R, P, N) {
    N = typeof P == "function" ? P : N, P = typeof P == "function" ? !1 : P, m.lstat(R, (A, O) => {
      !A && O.isSymbolicLink() ? Promise.all([
        m.stat(w),
        m.stat(R)
      ]).then(([b, S]) => {
        if (d(b, S)) return N(null);
        v(w, R, P, N);
      }) : v(w, R, P, N);
    });
  }
  function v(w, R, P, N) {
    u(w, R, (A, O) => {
      if (A) return N(A);
      w = O.toDst, n(O.toCwd, P, (b, S) => {
        if (b) return N(b);
        const D = h.dirname(R);
        r(D, (_, k) => {
          if (_) return N(_);
          if (k) return m.symlink(w, R, S, N);
          c(D, ($) => {
            if ($) return N($);
            m.symlink(w, R, S, N);
          });
        });
      });
    });
  }
  function p(w, R, P) {
    let N;
    try {
      N = m.lstatSync(R);
    } catch {
    }
    if (N && N.isSymbolicLink()) {
      const S = m.statSync(w), D = m.statSync(R);
      if (d(S, D)) return;
    }
    const A = i(w, R);
    w = A.toDst, P = t(A.toCwd, P);
    const O = h.dirname(R);
    return m.existsSync(O) || l(O), m.symlinkSync(w, R, P);
  }
  return Ln = {
    createSymlink: s(g),
    createSymlinkSync: p
  }, Ln;
}
var Un, hs;
function Zc() {
  if (hs) return Un;
  hs = 1;
  const { createFile: s, createFileSync: h } = /* @__PURE__ */ Yc(), { createLink: m, createLinkSync: f } = /* @__PURE__ */ Xc(), { createSymlink: c, createSymlinkSync: l } = /* @__PURE__ */ Qc();
  return Un = {
    // file
    createFile: s,
    createFileSync: h,
    ensureFile: s,
    ensureFileSync: h,
    // link
    createLink: m,
    createLinkSync: f,
    ensureLink: m,
    ensureLinkSync: f,
    // symlink
    createSymlink: c,
    createSymlinkSync: l,
    ensureSymlink: c,
    ensureSymlinkSync: l
  }, Un;
}
var $n, ps;
function va() {
  if (ps) return $n;
  ps = 1;
  function s(m, { EOL: f = `
`, finalEOL: c = !0, replacer: l = null, spaces: e } = {}) {
    const u = c ? f : "", i = JSON.stringify(m, l, e);
    if (i === void 0)
      throw new TypeError(`Converting ${typeof m} value to JSON is not supported`);
    return i.replace(/\n/g, f) + u;
  }
  function h(m) {
    return Buffer.isBuffer(m) && (m = m.toString("utf8")), m.replace(/^\uFEFF/, "");
  }
  return $n = { stringify: s, stripBom: h }, $n;
}
var kn, ms;
function ef() {
  if (ms) return kn;
  ms = 1;
  let s;
  try {
    s = Qe();
  } catch {
    s = Ct;
  }
  const h = tt(), { stringify: m, stripBom: f } = va();
  async function c(n, t = {}) {
    typeof t == "string" && (t = { encoding: t });
    const r = t.fs || s, d = "throws" in t ? t.throws : !0;
    let g = await h.fromCallback(r.readFile)(n, t);
    g = f(g);
    let v;
    try {
      v = JSON.parse(g, t ? t.reviver : null);
    } catch (p) {
      if (d)
        throw p.message = `${n}: ${p.message}`, p;
      return null;
    }
    return v;
  }
  const l = h.fromPromise(c);
  function e(n, t = {}) {
    typeof t == "string" && (t = { encoding: t });
    const r = t.fs || s, d = "throws" in t ? t.throws : !0;
    try {
      let g = r.readFileSync(n, t);
      return g = f(g), JSON.parse(g, t.reviver);
    } catch (g) {
      if (d)
        throw g.message = `${n}: ${g.message}`, g;
      return null;
    }
  }
  async function u(n, t, r = {}) {
    const d = r.fs || s, g = m(t, r);
    await h.fromCallback(d.writeFile)(n, g, r);
  }
  const i = h.fromPromise(u);
  function o(n, t, r = {}) {
    const d = r.fs || s, g = m(t, r);
    return d.writeFileSync(n, g, r);
  }
  return kn = {
    readFile: l,
    readFileSync: e,
    writeFile: i,
    writeFileSync: o
  }, kn;
}
var qn, gs;
function tf() {
  if (gs) return qn;
  gs = 1;
  const s = ef();
  return qn = {
    // jsonfile exports
    readJson: s.readFile,
    readJsonSync: s.readFileSync,
    writeJson: s.writeFile,
    writeJsonSync: s.writeFileSync
  }, qn;
}
var Mn, ys;
function Ea() {
  if (ys) return Mn;
  ys = 1;
  const s = tt().fromCallback, h = Qe(), m = ke, f = /* @__PURE__ */ dt(), c = qt().pathExists;
  function l(u, i, o, n) {
    typeof o == "function" && (n = o, o = "utf8");
    const t = m.dirname(u);
    c(t, (r, d) => {
      if (r) return n(r);
      if (d) return h.writeFile(u, i, o, n);
      f.mkdirs(t, (g) => {
        if (g) return n(g);
        h.writeFile(u, i, o, n);
      });
    });
  }
  function e(u, ...i) {
    const o = m.dirname(u);
    if (h.existsSync(o))
      return h.writeFileSync(u, ...i);
    f.mkdirsSync(o), h.writeFileSync(u, ...i);
  }
  return Mn = {
    outputFile: s(l),
    outputFileSync: e
  }, Mn;
}
var Bn, vs;
function rf() {
  if (vs) return Bn;
  vs = 1;
  const { stringify: s } = va(), { outputFile: h } = /* @__PURE__ */ Ea();
  async function m(f, c, l = {}) {
    const e = s(c, l);
    await h(f, e, l);
  }
  return Bn = m, Bn;
}
var jn, Es;
function nf() {
  if (Es) return jn;
  Es = 1;
  const { stringify: s } = va(), { outputFileSync: h } = /* @__PURE__ */ Ea();
  function m(f, c, l) {
    const e = s(c, l);
    h(f, e, l);
  }
  return jn = m, jn;
}
var Hn, ws;
function af() {
  if (ws) return Hn;
  ws = 1;
  const s = tt().fromPromise, h = /* @__PURE__ */ tf();
  return h.outputJson = s(/* @__PURE__ */ rf()), h.outputJsonSync = /* @__PURE__ */ nf(), h.outputJSON = h.outputJson, h.outputJSONSync = h.outputJsonSync, h.writeJSON = h.writeJson, h.writeJSONSync = h.writeJsonSync, h.readJSON = h.readJson, h.readJSONSync = h.readJsonSync, Hn = h, Hn;
}
var Gn, _s;
function sf() {
  if (_s) return Gn;
  _s = 1;
  const s = Qe(), h = ke, m = ya().copy, f = an().remove, c = dt().mkdirp, l = qt().pathExists, e = /* @__PURE__ */ Qt();
  function u(r, d, g, v) {
    typeof g == "function" && (v = g, g = {}), g = g || {};
    const p = g.overwrite || g.clobber || !1;
    e.checkPaths(r, d, "move", g, (w, R) => {
      if (w) return v(w);
      const { srcStat: P, isChangingCase: N = !1 } = R;
      e.checkParentPaths(r, P, d, "move", (A) => {
        if (A) return v(A);
        if (i(d)) return o(r, d, p, N, v);
        c(h.dirname(d), (O) => O ? v(O) : o(r, d, p, N, v));
      });
    });
  }
  function i(r) {
    const d = h.dirname(r);
    return h.parse(d).root === d;
  }
  function o(r, d, g, v, p) {
    if (v) return n(r, d, g, p);
    if (g)
      return f(d, (w) => w ? p(w) : n(r, d, g, p));
    l(d, (w, R) => w ? p(w) : R ? p(new Error("dest already exists.")) : n(r, d, g, p));
  }
  function n(r, d, g, v) {
    s.rename(r, d, (p) => p ? p.code !== "EXDEV" ? v(p) : t(r, d, g, v) : v());
  }
  function t(r, d, g, v) {
    m(r, d, {
      overwrite: g,
      errorOnExist: !0
    }, (w) => w ? v(w) : f(r, v));
  }
  return Gn = u, Gn;
}
var Wn, Ss;
function of() {
  if (Ss) return Wn;
  Ss = 1;
  const s = Qe(), h = ke, m = ya().copySync, f = an().removeSync, c = dt().mkdirpSync, l = /* @__PURE__ */ Qt();
  function e(t, r, d) {
    d = d || {};
    const g = d.overwrite || d.clobber || !1, { srcStat: v, isChangingCase: p = !1 } = l.checkPathsSync(t, r, "move", d);
    return l.checkParentPathsSync(t, v, r, "move"), u(r) || c(h.dirname(r)), i(t, r, g, p);
  }
  function u(t) {
    const r = h.dirname(t);
    return h.parse(r).root === r;
  }
  function i(t, r, d, g) {
    if (g) return o(t, r, d);
    if (d)
      return f(r), o(t, r, d);
    if (s.existsSync(r)) throw new Error("dest already exists.");
    return o(t, r, d);
  }
  function o(t, r, d) {
    try {
      s.renameSync(t, r);
    } catch (g) {
      if (g.code !== "EXDEV") throw g;
      return n(t, r, d);
    }
  }
  function n(t, r, d) {
    return m(t, r, {
      overwrite: d,
      errorOnExist: !0
    }), f(t);
  }
  return Wn = e, Wn;
}
var Vn, Rs;
function lf() {
  if (Rs) return Vn;
  Rs = 1;
  const s = tt().fromCallback;
  return Vn = {
    move: s(/* @__PURE__ */ sf()),
    moveSync: /* @__PURE__ */ of()
  }, Vn;
}
var zn, Cs;
function Tt() {
  return Cs || (Cs = 1, zn = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ Kt(),
    // Export extra methods:
    .../* @__PURE__ */ ya(),
    .../* @__PURE__ */ zc(),
    .../* @__PURE__ */ Zc(),
    .../* @__PURE__ */ af(),
    .../* @__PURE__ */ dt(),
    .../* @__PURE__ */ lf(),
    .../* @__PURE__ */ Ea(),
    .../* @__PURE__ */ qt(),
    .../* @__PURE__ */ an()
  }), zn;
}
var ar = {}, Ft = {}, Yn = {}, Lt = {}, As;
function wa() {
  if (As) return Lt;
  As = 1, Object.defineProperty(Lt, "__esModule", { value: !0 }), Lt.CancellationError = Lt.CancellationToken = void 0;
  const s = Kl;
  let h = class extends s.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(c) {
      this.removeParentCancelHandler(), this._parent = c, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(c) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, c != null && (this.parent = c);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(c) {
      this.cancelled ? c() : this.once("cancel", c);
    }
    createPromise(c) {
      if (this.cancelled)
        return Promise.reject(new m());
      const l = () => {
        if (e != null)
          try {
            this.removeListener("cancel", e), e = null;
          } catch {
          }
      };
      let e = null;
      return new Promise((u, i) => {
        let o = null;
        if (e = () => {
          try {
            o != null && (o(), o = null);
          } finally {
            i(new m());
          }
        }, this.cancelled) {
          e();
          return;
        }
        this.onCancel(e), c(u, i, (n) => {
          o = n;
        });
      }).then((u) => (l(), u)).catch((u) => {
        throw l(), u;
      });
    }
    removeParentCancelHandler() {
      const c = this._parent;
      c != null && this.parentCancelHandler != null && (c.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  Lt.CancellationToken = h;
  class m extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return Lt.CancellationError = m, Lt;
}
var Gr = {}, Ts;
function sn() {
  if (Ts) return Gr;
  Ts = 1, Object.defineProperty(Gr, "__esModule", { value: !0 }), Gr.newError = s;
  function s(h, m) {
    const f = new Error(h);
    return f.code = m, f;
  }
  return Gr;
}
var Ye = {}, Wr = { exports: {} }, Vr = { exports: {} }, Xn, bs;
function uf() {
  if (bs) return Xn;
  bs = 1;
  var s = 1e3, h = s * 60, m = h * 60, f = m * 24, c = f * 7, l = f * 365.25;
  Xn = function(n, t) {
    t = t || {};
    var r = typeof n;
    if (r === "string" && n.length > 0)
      return e(n);
    if (r === "number" && isFinite(n))
      return t.long ? i(n) : u(n);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(n)
    );
  };
  function e(n) {
    if (n = String(n), !(n.length > 100)) {
      var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        n
      );
      if (t) {
        var r = parseFloat(t[1]), d = (t[2] || "ms").toLowerCase();
        switch (d) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return r * l;
          case "weeks":
          case "week":
          case "w":
            return r * c;
          case "days":
          case "day":
          case "d":
            return r * f;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return r * m;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return r * h;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return r * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return r;
          default:
            return;
        }
      }
    }
  }
  function u(n) {
    var t = Math.abs(n);
    return t >= f ? Math.round(n / f) + "d" : t >= m ? Math.round(n / m) + "h" : t >= h ? Math.round(n / h) + "m" : t >= s ? Math.round(n / s) + "s" : n + "ms";
  }
  function i(n) {
    var t = Math.abs(n);
    return t >= f ? o(n, t, f, "day") : t >= m ? o(n, t, m, "hour") : t >= h ? o(n, t, h, "minute") : t >= s ? o(n, t, s, "second") : n + " ms";
  }
  function o(n, t, r, d) {
    var g = t >= r * 1.5;
    return Math.round(n / r) + " " + d + (g ? "s" : "");
  }
  return Xn;
}
var Jn, Ps;
function ru() {
  if (Ps) return Jn;
  Ps = 1;
  function s(h) {
    f.debug = f, f.default = f, f.coerce = o, f.disable = u, f.enable = l, f.enabled = i, f.humanize = uf(), f.destroy = n, Object.keys(h).forEach((t) => {
      f[t] = h[t];
    }), f.names = [], f.skips = [], f.formatters = {};
    function m(t) {
      let r = 0;
      for (let d = 0; d < t.length; d++)
        r = (r << 5) - r + t.charCodeAt(d), r |= 0;
      return f.colors[Math.abs(r) % f.colors.length];
    }
    f.selectColor = m;
    function f(t) {
      let r, d = null, g, v;
      function p(...w) {
        if (!p.enabled)
          return;
        const R = p, P = Number(/* @__PURE__ */ new Date()), N = P - (r || P);
        R.diff = N, R.prev = r, R.curr = P, r = P, w[0] = f.coerce(w[0]), typeof w[0] != "string" && w.unshift("%O");
        let A = 0;
        w[0] = w[0].replace(/%([a-zA-Z%])/g, (b, S) => {
          if (b === "%%")
            return "%";
          A++;
          const D = f.formatters[S];
          if (typeof D == "function") {
            const _ = w[A];
            b = D.call(R, _), w.splice(A, 1), A--;
          }
          return b;
        }), f.formatArgs.call(R, w), (R.log || f.log).apply(R, w);
      }
      return p.namespace = t, p.useColors = f.useColors(), p.color = f.selectColor(t), p.extend = c, p.destroy = f.destroy, Object.defineProperty(p, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => d !== null ? d : (g !== f.namespaces && (g = f.namespaces, v = f.enabled(t)), v),
        set: (w) => {
          d = w;
        }
      }), typeof f.init == "function" && f.init(p), p;
    }
    function c(t, r) {
      const d = f(this.namespace + (typeof r > "u" ? ":" : r) + t);
      return d.log = this.log, d;
    }
    function l(t) {
      f.save(t), f.namespaces = t, f.names = [], f.skips = [];
      const r = (typeof t == "string" ? t : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const d of r)
        d[0] === "-" ? f.skips.push(d.slice(1)) : f.names.push(d);
    }
    function e(t, r) {
      let d = 0, g = 0, v = -1, p = 0;
      for (; d < t.length; )
        if (g < r.length && (r[g] === t[d] || r[g] === "*"))
          r[g] === "*" ? (v = g, p = d, g++) : (d++, g++);
        else if (v !== -1)
          g = v + 1, p++, d = p;
        else
          return !1;
      for (; g < r.length && r[g] === "*"; )
        g++;
      return g === r.length;
    }
    function u() {
      const t = [
        ...f.names,
        ...f.skips.map((r) => "-" + r)
      ].join(",");
      return f.enable(""), t;
    }
    function i(t) {
      for (const r of f.skips)
        if (e(t, r))
          return !1;
      for (const r of f.names)
        if (e(t, r))
          return !0;
      return !1;
    }
    function o(t) {
      return t instanceof Error ? t.stack || t.message : t;
    }
    function n() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return f.enable(f.load()), f;
  }
  return Jn = s, Jn;
}
var Ds;
function cf() {
  return Ds || (Ds = 1, (function(s, h) {
    h.formatArgs = f, h.save = c, h.load = l, h.useColors = m, h.storage = e(), h.destroy = /* @__PURE__ */ (() => {
      let i = !1;
      return () => {
        i || (i = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), h.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function m() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let i;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (i = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(i[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function f(i) {
      if (i[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + i[0] + (this.useColors ? "%c " : " ") + "+" + s.exports.humanize(this.diff), !this.useColors)
        return;
      const o = "color: " + this.color;
      i.splice(1, 0, o, "color: inherit");
      let n = 0, t = 0;
      i[0].replace(/%[a-zA-Z%]/g, (r) => {
        r !== "%%" && (n++, r === "%c" && (t = n));
      }), i.splice(t, 0, o);
    }
    h.log = console.debug || console.log || (() => {
    });
    function c(i) {
      try {
        i ? h.storage.setItem("debug", i) : h.storage.removeItem("debug");
      } catch {
      }
    }
    function l() {
      let i;
      try {
        i = h.storage.getItem("debug") || h.storage.getItem("DEBUG");
      } catch {
      }
      return !i && typeof process < "u" && "env" in process && (i = process.env.DEBUG), i;
    }
    function e() {
      try {
        return localStorage;
      } catch {
      }
    }
    s.exports = ru()(h);
    const { formatters: u } = s.exports;
    u.j = function(i) {
      try {
        return JSON.stringify(i);
      } catch (o) {
        return "[UnexpectedJSONParseError]: " + o.message;
      }
    };
  })(Vr, Vr.exports)), Vr.exports;
}
var zr = { exports: {} }, Kn, Os;
function ff() {
  return Os || (Os = 1, Kn = (s, h = process.argv) => {
    const m = s.startsWith("-") ? "" : s.length === 1 ? "-" : "--", f = h.indexOf(m + s), c = h.indexOf("--");
    return f !== -1 && (c === -1 || f < c);
  }), Kn;
}
var Qn, Is;
function df() {
  if (Is) return Qn;
  Is = 1;
  const s = nn, h = Ql, m = ff(), { env: f } = process;
  let c;
  m("no-color") || m("no-colors") || m("color=false") || m("color=never") ? c = 0 : (m("color") || m("colors") || m("color=true") || m("color=always")) && (c = 1), "FORCE_COLOR" in f && (f.FORCE_COLOR === "true" ? c = 1 : f.FORCE_COLOR === "false" ? c = 0 : c = f.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(f.FORCE_COLOR, 10), 3));
  function l(i) {
    return i === 0 ? !1 : {
      level: i,
      hasBasic: !0,
      has256: i >= 2,
      has16m: i >= 3
    };
  }
  function e(i, o) {
    if (c === 0)
      return 0;
    if (m("color=16m") || m("color=full") || m("color=truecolor"))
      return 3;
    if (m("color=256"))
      return 2;
    if (i && !o && c === void 0)
      return 0;
    const n = c || 0;
    if (f.TERM === "dumb")
      return n;
    if (process.platform === "win32") {
      const t = s.release().split(".");
      return Number(t[0]) >= 10 && Number(t[2]) >= 10586 ? Number(t[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in f)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((t) => t in f) || f.CI_NAME === "codeship" ? 1 : n;
    if ("TEAMCITY_VERSION" in f)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(f.TEAMCITY_VERSION) ? 1 : 0;
    if (f.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in f) {
      const t = parseInt((f.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (f.TERM_PROGRAM) {
        case "iTerm.app":
          return t >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(f.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(f.TERM) || "COLORTERM" in f ? 1 : n;
  }
  function u(i) {
    const o = e(i, i && i.isTTY);
    return l(o);
  }
  return Qn = {
    supportsColor: u,
    stdout: l(e(!0, h.isatty(1))),
    stderr: l(e(!0, h.isatty(2)))
  }, Qn;
}
var Ns;
function hf() {
  return Ns || (Ns = 1, (function(s, h) {
    const m = Ql, f = ga;
    h.init = n, h.log = u, h.formatArgs = l, h.save = i, h.load = o, h.useColors = c, h.destroy = f.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), h.colors = [6, 2, 3, 4, 5, 1];
    try {
      const r = df();
      r && (r.stderr || r).level >= 2 && (h.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    h.inspectOpts = Object.keys(process.env).filter((r) => /^debug_/i.test(r)).reduce((r, d) => {
      const g = d.substring(6).toLowerCase().replace(/_([a-z])/g, (p, w) => w.toUpperCase());
      let v = process.env[d];
      return /^(yes|on|true|enabled)$/i.test(v) ? v = !0 : /^(no|off|false|disabled)$/i.test(v) ? v = !1 : v === "null" ? v = null : v = Number(v), r[g] = v, r;
    }, {});
    function c() {
      return "colors" in h.inspectOpts ? !!h.inspectOpts.colors : m.isatty(process.stderr.fd);
    }
    function l(r) {
      const { namespace: d, useColors: g } = this;
      if (g) {
        const v = this.color, p = "\x1B[3" + (v < 8 ? v : "8;5;" + v), w = `  ${p};1m${d} \x1B[0m`;
        r[0] = w + r[0].split(`
`).join(`
` + w), r.push(p + "m+" + s.exports.humanize(this.diff) + "\x1B[0m");
      } else
        r[0] = e() + d + " " + r[0];
    }
    function e() {
      return h.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function u(...r) {
      return process.stderr.write(f.formatWithOptions(h.inspectOpts, ...r) + `
`);
    }
    function i(r) {
      r ? process.env.DEBUG = r : delete process.env.DEBUG;
    }
    function o() {
      return process.env.DEBUG;
    }
    function n(r) {
      r.inspectOpts = {};
      const d = Object.keys(h.inspectOpts);
      for (let g = 0; g < d.length; g++)
        r.inspectOpts[d[g]] = h.inspectOpts[d[g]];
    }
    s.exports = ru()(h);
    const { formatters: t } = s.exports;
    t.o = function(r) {
      return this.inspectOpts.colors = this.useColors, f.inspect(r, this.inspectOpts).split(`
`).map((d) => d.trim()).join(" ");
    }, t.O = function(r) {
      return this.inspectOpts.colors = this.useColors, f.inspect(r, this.inspectOpts);
    };
  })(zr, zr.exports)), zr.exports;
}
var xs;
function pf() {
  return xs || (xs = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Wr.exports = cf() : Wr.exports = hf()), Wr.exports;
}
var sr = {}, Fs;
function nu() {
  if (Fs) return sr;
  Fs = 1, Object.defineProperty(sr, "__esModule", { value: !0 }), sr.ProgressCallbackTransform = void 0;
  const s = Or;
  let h = class extends s.Transform {
    constructor(f, c, l) {
      super(), this.total = f, this.cancellationToken = c, this.onProgress = l, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(f, c, l) {
      if (this.cancellationToken.cancelled) {
        l(new Error("cancelled"), null);
        return;
      }
      this.transferred += f.length, this.delta += f.length;
      const e = Date.now();
      e >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = e + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((e - this.start) / 1e3))
      }), this.delta = 0), l(null, f);
    }
    _flush(f) {
      if (this.cancellationToken.cancelled) {
        f(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, f(null);
    }
  };
  return sr.ProgressCallbackTransform = h, sr;
}
var Ls;
function mf() {
  if (Ls) return Ye;
  Ls = 1, Object.defineProperty(Ye, "__esModule", { value: !0 }), Ye.DigestTransform = Ye.HttpExecutor = Ye.HttpError = void 0, Ye.createHttpError = o, Ye.parseJson = r, Ye.configureRequestOptionsFromUrl = v, Ye.configureRequestUrl = p, Ye.safeGetHeader = P, Ye.configureRequestOptions = A, Ye.safeStringifyJson = O;
  const s = Ir, h = pf(), m = Ct, f = Or, c = At, l = wa(), e = sn(), u = nu(), i = (0, h.default)("electron-builder");
  function o(b, S = null) {
    return new t(b.statusCode || -1, `${b.statusCode} ${b.statusMessage}` + (S == null ? "" : `
` + JSON.stringify(S, null, "  ")) + `
Headers: ` + O(b.headers), S);
  }
  const n = /* @__PURE__ */ new Map([
    [429, "Too many requests"],
    [400, "Bad request"],
    [403, "Forbidden"],
    [404, "Not found"],
    [405, "Method not allowed"],
    [406, "Not acceptable"],
    [408, "Request timeout"],
    [413, "Request entity too large"],
    [500, "Internal server error"],
    [502, "Bad gateway"],
    [503, "Service unavailable"],
    [504, "Gateway timeout"],
    [505, "HTTP version not supported"]
  ]);
  class t extends Error {
    constructor(S, D = `HTTP error: ${n.get(S) || S}`, _ = null) {
      super(D), this.statusCode = S, this.description = _, this.name = "HttpError", this.code = `HTTP_ERROR_${S}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  Ye.HttpError = t;
  function r(b) {
    return b.then((S) => S == null || S.length === 0 ? null : JSON.parse(S));
  }
  class d {
    constructor() {
      this.maxRedirects = 10;
    }
    request(S, D = new l.CancellationToken(), _) {
      A(S);
      const k = _ == null ? void 0 : JSON.stringify(_), $ = k ? Buffer.from(k) : void 0;
      if ($ != null) {
        i(k);
        const { headers: M, ...L } = S;
        S = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": $.length,
            ...M
          },
          ...L
        };
      }
      return this.doApiRequest(S, D, (M) => M.end($));
    }
    doApiRequest(S, D, _, k = 0) {
      return i.enabled && i(`Request: ${O(S)}`), D.createPromise(($, M, L) => {
        const F = this.createRequest(S, (H) => {
          try {
            this.handleResponse(H, S, D, $, M, k, _);
          } catch (x) {
            M(x);
          }
        });
        this.addErrorAndTimeoutHandlers(F, M, S.timeout), this.addRedirectHandlers(F, S, M, k, (H) => {
          this.doApiRequest(H, D, _, k).then($).catch(M);
        }), _(F, M), L(() => F.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(S, D, _, k, $) {
    }
    addErrorAndTimeoutHandlers(S, D, _ = 60 * 1e3) {
      this.addTimeOutHandler(S, D, _), S.on("error", D), S.on("aborted", () => {
        D(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(S, D, _, k, $, M, L) {
      var F;
      if (i.enabled && i(`Response: ${S.statusCode} ${S.statusMessage}, request options: ${O(D)}`), S.statusCode === 404) {
        $(o(S, `method: ${D.method || "GET"} url: ${D.protocol || "https:"}//${D.hostname}${D.port ? `:${D.port}` : ""}${D.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (S.statusCode === 204) {
        k();
        return;
      }
      const H = (F = S.statusCode) !== null && F !== void 0 ? F : 0, x = H >= 300 && H < 400, G = P(S, "location");
      if (x && G != null) {
        if (M > this.maxRedirects) {
          $(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(d.prepareRedirectUrlOptions(G, D), _, L, M).then(k).catch($);
        return;
      }
      S.setEncoding("utf8");
      let z = "";
      S.on("error", $), S.on("data", (ee) => z += ee), S.on("end", () => {
        try {
          if (S.statusCode != null && S.statusCode >= 400) {
            const ee = P(S, "content-type"), ge = ee != null && (Array.isArray(ee) ? ee.find((Z) => Z.includes("json")) != null : ee.includes("json"));
            $(o(S, `method: ${D.method || "GET"} url: ${D.protocol || "https:"}//${D.hostname}${D.port ? `:${D.port}` : ""}${D.path}

          Data:
          ${ge ? JSON.stringify(JSON.parse(z)) : z}
          `));
          } else
            k(z.length === 0 ? null : z);
        } catch (ee) {
          $(ee);
        }
      });
    }
    async downloadToBuffer(S, D) {
      return await D.cancellationToken.createPromise((_, k, $) => {
        const M = [], L = {
          headers: D.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        p(S, L), A(L), this.doDownload(L, {
          destination: null,
          options: D,
          onCancel: $,
          callback: (F) => {
            F == null ? _(Buffer.concat(M)) : k(F);
          },
          responseHandler: (F, H) => {
            let x = 0;
            F.on("data", (G) => {
              if (x += G.length, x > 524288e3) {
                H(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              M.push(G);
            }), F.on("end", () => {
              H(null);
            });
          }
        }, 0);
      });
    }
    doDownload(S, D, _) {
      const k = this.createRequest(S, ($) => {
        if ($.statusCode >= 400) {
          D.callback(new Error(`Cannot download "${S.protocol || "https:"}//${S.hostname}${S.path}", status ${$.statusCode}: ${$.statusMessage}`));
          return;
        }
        $.on("error", D.callback);
        const M = P($, "location");
        if (M != null) {
          _ < this.maxRedirects ? this.doDownload(d.prepareRedirectUrlOptions(M, S), D, _++) : D.callback(this.createMaxRedirectError());
          return;
        }
        D.responseHandler == null ? N(D, $) : D.responseHandler($, D.callback);
      });
      this.addErrorAndTimeoutHandlers(k, D.callback, S.timeout), this.addRedirectHandlers(k, S, D.callback, _, ($) => {
        this.doDownload($, D, _++);
      }), k.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(S, D, _) {
      S.on("socket", (k) => {
        k.setTimeout(_, () => {
          S.abort(), D(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(S, D) {
      const _ = v(S, { ...D }), k = _.headers;
      if (k?.authorization) {
        const $ = d.reconstructOriginalUrl(D), M = g(S, D);
        d.isCrossOriginRedirect($, M) && (i.enabled && i(`Given the cross-origin redirect (from ${$.host} to ${M.host}), the Authorization header will be stripped out.`), delete k.authorization);
      }
      return _;
    }
    static reconstructOriginalUrl(S) {
      const D = S.protocol || "https:";
      if (!S.hostname)
        throw new Error("Missing hostname in request options");
      const _ = S.hostname, k = S.port ? `:${S.port}` : "", $ = S.path || "/";
      return new c.URL(`${D}//${_}${k}${$}`);
    }
    static isCrossOriginRedirect(S, D) {
      if (S.hostname.toLowerCase() !== D.hostname.toLowerCase())
        return !0;
      if (S.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
      ["80", ""].includes(S.port) && D.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
      ["443", ""].includes(D.port))
        return !1;
      if (S.protocol !== D.protocol)
        return !0;
      const _ = S.port, k = D.port;
      return _ !== k;
    }
    static retryOnServerError(S, D = 3) {
      for (let _ = 0; ; _++)
        try {
          return S();
        } catch (k) {
          if (_ < D && (k instanceof t && k.isServerError() || k.code === "EPIPE"))
            continue;
          throw k;
        }
    }
  }
  Ye.HttpExecutor = d;
  function g(b, S) {
    try {
      return new c.URL(b);
    } catch {
      const D = S.hostname, _ = S.protocol || "https:", k = S.port ? `:${S.port}` : "", $ = `${_}//${D}${k}`;
      return new c.URL(b, $);
    }
  }
  function v(b, S) {
    const D = A(S), _ = g(b, S);
    return p(_, D), D;
  }
  function p(b, S) {
    S.protocol = b.protocol, S.hostname = b.hostname, b.port ? S.port = b.port : S.port && delete S.port, S.path = b.pathname + b.search;
  }
  class w extends f.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(S, D = "sha512", _ = "base64") {
      super(), this.expected = S, this.algorithm = D, this.encoding = _, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, s.createHash)(D);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(S, D, _) {
      this.digester.update(S), _(null, S);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(S) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (D) {
          S(D);
          return;
        }
      S(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, e.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, e.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  Ye.DigestTransform = w;
  function R(b, S, D) {
    return b != null && S != null && b !== S ? (D(new Error(`checksum mismatch: expected ${S} but got ${b} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function P(b, S) {
    const D = b.headers[S];
    return D == null ? null : Array.isArray(D) ? D.length === 0 ? null : D[D.length - 1] : D;
  }
  function N(b, S) {
    if (!R(P(S, "X-Checksum-Sha2"), b.options.sha2, b.callback))
      return;
    const D = [];
    if (b.options.onProgress != null) {
      const M = P(S, "content-length");
      M != null && D.push(new u.ProgressCallbackTransform(parseInt(M, 10), b.options.cancellationToken, b.options.onProgress));
    }
    const _ = b.options.sha512;
    _ != null ? D.push(new w(_, "sha512", _.length === 128 && !_.includes("+") && !_.includes("Z") && !_.includes("=") ? "hex" : "base64")) : b.options.sha2 != null && D.push(new w(b.options.sha2, "sha256", "hex"));
    const k = (0, m.createWriteStream)(b.destination);
    D.push(k);
    let $ = S;
    for (const M of D)
      M.on("error", (L) => {
        k.close(), b.options.cancellationToken.cancelled || b.callback(L);
      }), $ = $.pipe(M);
    k.on("finish", () => {
      k.close(b.callback);
    });
  }
  function A(b, S, D) {
    D != null && (b.method = D), b.headers = { ...b.headers };
    const _ = b.headers;
    return S != null && (_.authorization = S.startsWith("Basic") || S.startsWith("Bearer") ? S : `token ${S}`), _["User-Agent"] == null && (_["User-Agent"] = "electron-builder"), (D == null || D === "GET" || _["Cache-Control"] == null) && (_["Cache-Control"] = "no-cache"), b.protocol == null && process.versions.electron != null && (b.protocol = "https:"), b;
  }
  function O(b, S) {
    return JSON.stringify(b, (D, _) => D.endsWith("Authorization") || D.endsWith("authorization") || D.endsWith("Password") || D.endsWith("PASSWORD") || D.endsWith("Token") || D.includes("password") || D.includes("token") || S != null && S.has(D) ? "<stripped sensitive data>" : _, 2);
  }
  return Ye;
}
var or = {}, Us;
function gf() {
  if (Us) return or;
  Us = 1, Object.defineProperty(or, "__esModule", { value: !0 }), or.MemoLazy = void 0;
  let s = class {
    constructor(f, c) {
      this.selector = f, this.creator = c, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const f = this.selector();
      if (this._value !== void 0 && h(this.selected, f))
        return this._value;
      this.selected = f;
      const c = this.creator(f);
      return this.value = c, c;
    }
    set value(f) {
      this._value = f;
    }
  };
  or.MemoLazy = s;
  function h(m, f) {
    if (typeof m == "object" && m !== null && (typeof f == "object" && f !== null)) {
      const e = Object.keys(m), u = Object.keys(f);
      return e.length === u.length && e.every((i) => h(m[i], f[i]));
    }
    return m === f;
  }
  return or;
}
var Gt = {}, $s;
function yf() {
  if ($s) return Gt;
  $s = 1, Object.defineProperty(Gt, "__esModule", { value: !0 }), Gt.githubUrl = s, Gt.githubTagPrefix = h, Gt.getS3LikeProviderBaseUrl = m;
  function s(e, u = "github.com") {
    return `${e.protocol || "https"}://${e.host || u}`;
  }
  function h(e) {
    var u;
    return e.tagNamePrefix ? e.tagNamePrefix : !((u = e.vPrefixedTagName) !== null && u !== void 0) || u ? "v" : "";
  }
  function m(e) {
    const u = e.provider;
    if (u === "s3")
      return f(e);
    if (u === "spaces")
      return l(e);
    throw new Error(`Not supported provider: ${u}`);
  }
  function f(e) {
    let u;
    if (e.accelerate == !0)
      u = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
    else if (e.endpoint != null)
      u = `${e.endpoint}/${e.bucket}`;
    else if (e.bucket.includes(".")) {
      if (e.region == null)
        throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
      e.region === "us-east-1" ? u = `https://s3.amazonaws.com/${e.bucket}` : u = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
    } else e.region === "cn-north-1" ? u = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : u = `https://${e.bucket}.s3.amazonaws.com`;
    return c(u, e.path);
  }
  function c(e, u) {
    return u != null && u.length > 0 && (u.startsWith("/") || (e += "/"), e += u), e;
  }
  function l(e) {
    if (e.name == null)
      throw new Error("name is missing");
    if (e.region == null)
      throw new Error("region is missing");
    return c(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
  }
  return Gt;
}
var Yr = {}, ks;
function vf() {
  if (ks) return Yr;
  ks = 1, Object.defineProperty(Yr, "__esModule", { value: !0 }), Yr.retry = h;
  const s = wa();
  async function h(m, f) {
    var c;
    const { retries: l, interval: e, backoff: u = 0, attempt: i = 0, shouldRetry: o, cancellationToken: n = new s.CancellationToken() } = f;
    try {
      return await m();
    } catch (t) {
      if (await Promise.resolve((c = o?.(t)) !== null && c !== void 0 ? c : !0) && l > 0 && !n.cancelled)
        return await new Promise((r) => setTimeout(r, e + u * i)), await h(m, { ...f, retries: l - 1, attempt: i + 1 });
      throw t;
    }
  }
  return Yr;
}
var Xr = {}, qs;
function Ef() {
  if (qs) return Xr;
  qs = 1, Object.defineProperty(Xr, "__esModule", { value: !0 }), Xr.parseDn = s;
  function s(h) {
    let m = !1, f = null, c = "", l = 0;
    h = h.trim();
    const e = /* @__PURE__ */ new Map();
    for (let u = 0; u <= h.length; u++) {
      if (u === h.length) {
        f !== null && e.set(f, c);
        break;
      }
      const i = h[u];
      if (m) {
        if (i === '"') {
          m = !1;
          continue;
        }
      } else {
        if (i === '"') {
          m = !0;
          continue;
        }
        if (i === "\\") {
          u++;
          const o = parseInt(h.slice(u, u + 2), 16);
          Number.isNaN(o) ? c += h[u] : (u++, c += String.fromCharCode(o));
          continue;
        }
        if (f === null && i === "=") {
          f = c, c = "";
          continue;
        }
        if (i === "," || i === ";" || i === "+") {
          f !== null && e.set(f, c), f = null, c = "";
          continue;
        }
      }
      if (i === " " && !m) {
        if (c.length === 0)
          continue;
        if (u > l) {
          let o = u;
          for (; h[o] === " "; )
            o++;
          l = o;
        }
        if (l >= h.length || h[l] === "," || h[l] === ";" || f === null && h[l] === "=" || f !== null && h[l] === "+") {
          u = l - 1;
          continue;
        }
      }
      c += i;
    }
    return e;
  }
  return Xr;
}
var Ut = {}, Ms;
function wf() {
  if (Ms) return Ut;
  Ms = 1, Object.defineProperty(Ut, "__esModule", { value: !0 }), Ut.nil = Ut.UUID = void 0;
  const s = Ir, h = sn(), m = "options.name must be either a string or a Buffer", f = (0, s.randomBytes)(16);
  f[0] = f[0] | 1;
  const c = {}, l = [];
  for (let t = 0; t < 256; t++) {
    const r = (t + 256).toString(16).substr(1);
    c[r] = t, l[t] = r;
  }
  class e {
    constructor(r) {
      this.ascii = null, this.binary = null;
      const d = e.check(r);
      if (!d)
        throw new Error("not a UUID");
      this.version = d.version, d.format === "ascii" ? this.ascii = r : this.binary = r;
    }
    static v5(r, d) {
      return o(r, "sha1", 80, d);
    }
    toString() {
      return this.ascii == null && (this.ascii = n(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(r, d = 0) {
      if (typeof r == "string")
        return r = r.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(r) ? r === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (c[r[14] + r[15]] & 240) >> 4,
          variant: u((c[r[19] + r[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(r)) {
        if (r.length < d + 16)
          return !1;
        let g = 0;
        for (; g < 16 && r[d + g] === 0; g++)
          ;
        return g === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (r[d + 6] & 240) >> 4,
          variant: u((r[d + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, h.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(r) {
      const d = Buffer.allocUnsafe(16);
      let g = 0;
      for (let v = 0; v < 16; v++)
        d[v] = c[r[g++] + r[g++]], (v === 3 || v === 5 || v === 7 || v === 9) && (g += 1);
      return d;
    }
  }
  Ut.UUID = e, e.OID = e.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function u(t) {
    switch (t) {
      case 0:
      case 1:
      case 3:
        return "ncs";
      case 4:
      case 5:
        return "rfc4122";
      case 6:
        return "microsoft";
      default:
        return "future";
    }
  }
  var i;
  (function(t) {
    t[t.ASCII = 0] = "ASCII", t[t.BINARY = 1] = "BINARY", t[t.OBJECT = 2] = "OBJECT";
  })(i || (i = {}));
  function o(t, r, d, g, v = i.ASCII) {
    const p = (0, s.createHash)(r);
    if (typeof t != "string" && !Buffer.isBuffer(t))
      throw (0, h.newError)(m, "ERR_INVALID_UUID_NAME");
    p.update(g), p.update(t);
    const R = p.digest();
    let P;
    switch (v) {
      case i.BINARY:
        R[6] = R[6] & 15 | d, R[8] = R[8] & 63 | 128, P = R;
        break;
      case i.OBJECT:
        R[6] = R[6] & 15 | d, R[8] = R[8] & 63 | 128, P = new e(R);
        break;
      default:
        P = l[R[0]] + l[R[1]] + l[R[2]] + l[R[3]] + "-" + l[R[4]] + l[R[5]] + "-" + l[R[6] & 15 | d] + l[R[7]] + "-" + l[R[8] & 63 | 128] + l[R[9]] + "-" + l[R[10]] + l[R[11]] + l[R[12]] + l[R[13]] + l[R[14]] + l[R[15]];
        break;
    }
    return P;
  }
  function n(t) {
    return l[t[0]] + l[t[1]] + l[t[2]] + l[t[3]] + "-" + l[t[4]] + l[t[5]] + "-" + l[t[6]] + l[t[7]] + "-" + l[t[8]] + l[t[9]] + "-" + l[t[10]] + l[t[11]] + l[t[12]] + l[t[13]] + l[t[14]] + l[t[15]];
  }
  return Ut.nil = new e("00000000-0000-0000-0000-000000000000"), Ut;
}
var Wt = {}, Zn = {}, Bs;
function _f() {
  return Bs || (Bs = 1, (function(s) {
    (function(h) {
      h.parser = function(E, y) {
        return new f(E, y);
      }, h.SAXParser = f, h.SAXStream = t, h.createStream = o, h.MAX_BUFFER_LENGTH = 64 * 1024;
      var m = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      h.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function f(E, y) {
        if (!(this instanceof f))
          return new f(E, y);
        var q = this;
        l(q), q.q = q.c = "", q.bufferCheckPosition = h.MAX_BUFFER_LENGTH, q.encoding = null, q.opt = y || {}, q.opt.lowercase = q.opt.lowercase || q.opt.lowercasetags, q.looseCase = q.opt.lowercase ? "toLowerCase" : "toUpperCase", q.opt.maxEntityCount = q.opt.maxEntityCount || 512, q.opt.maxEntityDepth = q.opt.maxEntityDepth || 4, q.entityCount = q.entityDepth = 0, q.tags = [], q.closed = q.closedRoot = q.sawRoot = !1, q.tag = q.error = null, q.strict = !!E, q.noscript = !!(E || q.opt.noscript), q.state = _.BEGIN, q.strictEntities = q.opt.strictEntities, q.ENTITIES = q.strictEntities ? Object.create(h.XML_ENTITIES) : Object.create(h.ENTITIES), q.attribList = [], q.opt.xmlns && (q.ns = Object.create(p)), q.opt.unquotedAttributeValues === void 0 && (q.opt.unquotedAttributeValues = !E), q.trackPosition = q.opt.position !== !1, q.trackPosition && (q.position = q.line = q.column = 0), $(q, "onready");
      }
      Object.create || (Object.create = function(E) {
        function y() {
        }
        y.prototype = E;
        var q = new y();
        return q;
      }), Object.keys || (Object.keys = function(E) {
        var y = [];
        for (var q in E) E.hasOwnProperty(q) && y.push(q);
        return y;
      });
      function c(E) {
        for (var y = Math.max(h.MAX_BUFFER_LENGTH, 10), q = 0, I = 0, Ce = m.length; I < Ce; I++) {
          var Ae = E[m[I]].length;
          if (Ae > y)
            switch (m[I]) {
              case "textNode":
                G(E);
                break;
              case "cdata":
                x(E, "oncdata", E.cdata), E.cdata = "";
                break;
              case "script":
                x(E, "onscript", E.script), E.script = "";
                break;
              default:
                ee(E, "Max buffer length exceeded: " + m[I]);
            }
          q = Math.max(q, Ae);
        }
        var Fe = h.MAX_BUFFER_LENGTH - q;
        E.bufferCheckPosition = Fe + E.position;
      }
      function l(E) {
        for (var y = 0, q = m.length; y < q; y++)
          E[m[y]] = "";
      }
      function e(E) {
        G(E), E.cdata !== "" && (x(E, "oncdata", E.cdata), E.cdata = ""), E.script !== "" && (x(E, "onscript", E.script), E.script = "");
      }
      f.prototype = {
        end: function() {
          ge(this);
        },
        write: Te,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          e(this);
        }
      };
      var u;
      try {
        u = require("stream").Stream;
      } catch {
        u = function() {
        };
      }
      u || (u = function() {
      });
      var i = h.EVENTS.filter(function(E) {
        return E !== "error" && E !== "end";
      });
      function o(E, y) {
        return new t(E, y);
      }
      function n(E, y) {
        if (E.length >= 2) {
          if (E[0] === 255 && E[1] === 254)
            return "utf-16le";
          if (E[0] === 254 && E[1] === 255)
            return "utf-16be";
        }
        return E.length >= 3 && E[0] === 239 && E[1] === 187 && E[2] === 191 ? "utf8" : E.length >= 4 ? E[0] === 60 && E[1] === 0 && E[2] === 63 && E[3] === 0 ? "utf-16le" : E[0] === 0 && E[1] === 60 && E[2] === 0 && E[3] === 63 ? "utf-16be" : "utf8" : y ? "utf8" : null;
      }
      function t(E, y) {
        if (!(this instanceof t))
          return new t(E, y);
        u.apply(this), this._parser = new f(E, y), this.writable = !0, this.readable = !0;
        var q = this;
        this._parser.onend = function() {
          q.emit("end");
        }, this._parser.onerror = function(I) {
          q.emit("error", I), q._parser.error = null;
        }, this._decoder = null, this._decoderBuffer = null, i.forEach(function(I) {
          Object.defineProperty(q, "on" + I, {
            get: function() {
              return q._parser["on" + I];
            },
            set: function(Ce) {
              if (!Ce)
                return q.removeAllListeners(I), q._parser["on" + I] = Ce, Ce;
              q.on(I, Ce);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      t.prototype = Object.create(u.prototype, {
        constructor: {
          value: t
        }
      }), t.prototype._decodeBuffer = function(E, y) {
        if (this._decoderBuffer && (E = Buffer.concat([this._decoderBuffer, E]), this._decoderBuffer = null), !this._decoder) {
          var q = n(E, y);
          if (!q)
            return this._decoderBuffer = E, "";
          this._parser.encoding = q, this._decoder = new TextDecoder(q);
        }
        return this._decoder.decode(E, { stream: !y });
      }, t.prototype.write = function(E) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(E))
          E = this._decodeBuffer(E, !1);
        else if (this._decoderBuffer) {
          var y = this._decodeBuffer(Buffer.alloc(0), !0);
          y && (this._parser.write(y), this.emit("data", y));
        }
        return this._parser.write(E.toString()), this.emit("data", E), !0;
      }, t.prototype.end = function(E) {
        if (E && E.length && this.write(E), this._decoderBuffer) {
          var y = this._decodeBuffer(Buffer.alloc(0), !0);
          y && (this._parser.write(y), this.emit("data", y));
        } else if (this._decoder) {
          var q = this._decoder.decode();
          q && (this._parser.write(q), this.emit("data", q));
        }
        return this._parser.end(), !0;
      }, t.prototype.on = function(E, y) {
        var q = this;
        return !q._parser["on" + E] && i.indexOf(E) !== -1 && (q._parser["on" + E] = function() {
          var I = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          I.splice(0, 0, E), q.emit.apply(q, I);
        }), u.prototype.on.call(q, E, y);
      };
      var r = "[CDATA[", d = "DOCTYPE", g = "http://www.w3.org/XML/1998/namespace", v = "http://www.w3.org/2000/xmlns/", p = { xml: g, xmlns: v }, w = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, R = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, P = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, N = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function A(E) {
        return E === " " || E === `
` || E === "\r" || E === "	";
      }
      function O(E) {
        return E === '"' || E === "'";
      }
      function b(E) {
        return E === ">" || A(E);
      }
      function S(E, y) {
        return E.test(y);
      }
      function D(E, y) {
        return !S(E, y);
      }
      var _ = 0;
      h.STATE = {
        BEGIN: _++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: _++,
        // leading whitespace
        TEXT: _++,
        // general stuff
        TEXT_ENTITY: _++,
        // &amp and such.
        OPEN_WAKA: _++,
        // <
        SGML_DECL: _++,
        // <!BLARG
        SGML_DECL_QUOTED: _++,
        // <!BLARG foo "bar
        DOCTYPE: _++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: _++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: _++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: _++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: _++,
        // <!-
        COMMENT: _++,
        // <!--
        COMMENT_ENDING: _++,
        // <!-- blah -
        COMMENT_ENDED: _++,
        // <!-- blah --
        CDATA: _++,
        // <![CDATA[ something
        CDATA_ENDING: _++,
        // ]
        CDATA_ENDING_2: _++,
        // ]]
        PROC_INST: _++,
        // <?hi
        PROC_INST_BODY: _++,
        // <?hi there
        PROC_INST_ENDING: _++,
        // <?hi "there" ?
        OPEN_TAG: _++,
        // <strong
        OPEN_TAG_SLASH: _++,
        // <strong /
        ATTRIB: _++,
        // <a
        ATTRIB_NAME: _++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: _++,
        // <a foo _
        ATTRIB_VALUE: _++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: _++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: _++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: _++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: _++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: _++,
        // <foo bar=&quot
        CLOSE_TAG: _++,
        // </a
        CLOSE_TAG_SAW_WHITE: _++,
        // </a   >
        SCRIPT: _++,
        // <script> ...
        SCRIPT_ENDING: _++
        // <script> ... <
      }, h.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, h.ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
        AElig: 198,
        Aacute: 193,
        Acirc: 194,
        Agrave: 192,
        Aring: 197,
        Atilde: 195,
        Auml: 196,
        Ccedil: 199,
        ETH: 208,
        Eacute: 201,
        Ecirc: 202,
        Egrave: 200,
        Euml: 203,
        Iacute: 205,
        Icirc: 206,
        Igrave: 204,
        Iuml: 207,
        Ntilde: 209,
        Oacute: 211,
        Ocirc: 212,
        Ograve: 210,
        Oslash: 216,
        Otilde: 213,
        Ouml: 214,
        THORN: 222,
        Uacute: 218,
        Ucirc: 219,
        Ugrave: 217,
        Uuml: 220,
        Yacute: 221,
        aacute: 225,
        acirc: 226,
        aelig: 230,
        agrave: 224,
        aring: 229,
        atilde: 227,
        auml: 228,
        ccedil: 231,
        eacute: 233,
        ecirc: 234,
        egrave: 232,
        eth: 240,
        euml: 235,
        iacute: 237,
        icirc: 238,
        igrave: 236,
        iuml: 239,
        ntilde: 241,
        oacute: 243,
        ocirc: 244,
        ograve: 242,
        oslash: 248,
        otilde: 245,
        ouml: 246,
        szlig: 223,
        thorn: 254,
        uacute: 250,
        ucirc: 251,
        ugrave: 249,
        uuml: 252,
        yacute: 253,
        yuml: 255,
        copy: 169,
        reg: 174,
        nbsp: 160,
        iexcl: 161,
        cent: 162,
        pound: 163,
        curren: 164,
        yen: 165,
        brvbar: 166,
        sect: 167,
        uml: 168,
        ordf: 170,
        laquo: 171,
        not: 172,
        shy: 173,
        macr: 175,
        deg: 176,
        plusmn: 177,
        sup1: 185,
        sup2: 178,
        sup3: 179,
        acute: 180,
        micro: 181,
        para: 182,
        middot: 183,
        cedil: 184,
        ordm: 186,
        raquo: 187,
        frac14: 188,
        frac12: 189,
        frac34: 190,
        iquest: 191,
        times: 215,
        divide: 247,
        OElig: 338,
        oelig: 339,
        Scaron: 352,
        scaron: 353,
        Yuml: 376,
        fnof: 402,
        circ: 710,
        tilde: 732,
        Alpha: 913,
        Beta: 914,
        Gamma: 915,
        Delta: 916,
        Epsilon: 917,
        Zeta: 918,
        Eta: 919,
        Theta: 920,
        Iota: 921,
        Kappa: 922,
        Lambda: 923,
        Mu: 924,
        Nu: 925,
        Xi: 926,
        Omicron: 927,
        Pi: 928,
        Rho: 929,
        Sigma: 931,
        Tau: 932,
        Upsilon: 933,
        Phi: 934,
        Chi: 935,
        Psi: 936,
        Omega: 937,
        alpha: 945,
        beta: 946,
        gamma: 947,
        delta: 948,
        epsilon: 949,
        zeta: 950,
        eta: 951,
        theta: 952,
        iota: 953,
        kappa: 954,
        lambda: 955,
        mu: 956,
        nu: 957,
        xi: 958,
        omicron: 959,
        pi: 960,
        rho: 961,
        sigmaf: 962,
        sigma: 963,
        tau: 964,
        upsilon: 965,
        phi: 966,
        chi: 967,
        psi: 968,
        omega: 969,
        thetasym: 977,
        upsih: 978,
        piv: 982,
        ensp: 8194,
        emsp: 8195,
        thinsp: 8201,
        zwnj: 8204,
        zwj: 8205,
        lrm: 8206,
        rlm: 8207,
        ndash: 8211,
        mdash: 8212,
        lsquo: 8216,
        rsquo: 8217,
        sbquo: 8218,
        ldquo: 8220,
        rdquo: 8221,
        bdquo: 8222,
        dagger: 8224,
        Dagger: 8225,
        bull: 8226,
        hellip: 8230,
        permil: 8240,
        prime: 8242,
        Prime: 8243,
        lsaquo: 8249,
        rsaquo: 8250,
        oline: 8254,
        frasl: 8260,
        euro: 8364,
        image: 8465,
        weierp: 8472,
        real: 8476,
        trade: 8482,
        alefsym: 8501,
        larr: 8592,
        uarr: 8593,
        rarr: 8594,
        darr: 8595,
        harr: 8596,
        crarr: 8629,
        lArr: 8656,
        uArr: 8657,
        rArr: 8658,
        dArr: 8659,
        hArr: 8660,
        forall: 8704,
        part: 8706,
        exist: 8707,
        empty: 8709,
        nabla: 8711,
        isin: 8712,
        notin: 8713,
        ni: 8715,
        prod: 8719,
        sum: 8721,
        minus: 8722,
        lowast: 8727,
        radic: 8730,
        prop: 8733,
        infin: 8734,
        ang: 8736,
        and: 8743,
        or: 8744,
        cap: 8745,
        cup: 8746,
        int: 8747,
        there4: 8756,
        sim: 8764,
        cong: 8773,
        asymp: 8776,
        ne: 8800,
        equiv: 8801,
        le: 8804,
        ge: 8805,
        sub: 8834,
        sup: 8835,
        nsub: 8836,
        sube: 8838,
        supe: 8839,
        oplus: 8853,
        otimes: 8855,
        perp: 8869,
        sdot: 8901,
        lceil: 8968,
        rceil: 8969,
        lfloor: 8970,
        rfloor: 8971,
        lang: 9001,
        rang: 9002,
        loz: 9674,
        spades: 9824,
        clubs: 9827,
        hearts: 9829,
        diams: 9830
      }, Object.keys(h.ENTITIES).forEach(function(E) {
        var y = h.ENTITIES[E], q = typeof y == "number" ? String.fromCharCode(y) : y;
        h.ENTITIES[E] = q;
      });
      for (var k in h.STATE)
        h.STATE[h.STATE[k]] = k;
      _ = h.STATE;
      function $(E, y, q) {
        E[y] && E[y](q);
      }
      function M(E) {
        var y = E && E.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
        return y ? y[2] : null;
      }
      function L(E) {
        return E ? E.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
      }
      function F(E, y) {
        const q = L(E), I = L(y);
        return !q || !I ? !0 : I === "utf16" ? q === "utf16le" || q === "utf16be" : q === I;
      }
      function H(E, y) {
        if (!(!E.strict || !E.encoding || !y || y.name !== "xml")) {
          var q = M(y.body);
          q && !F(E.encoding, q) && Z(
            E,
            "XML declaration encoding " + q + " does not match detected stream encoding " + E.encoding.toUpperCase()
          );
        }
      }
      function x(E, y, q) {
        E.textNode && G(E), $(E, y, q);
      }
      function G(E) {
        E.textNode = z(E.opt, E.textNode), E.textNode && $(E, "ontext", E.textNode), E.textNode = "";
      }
      function z(E, y) {
        return E.trim && (y = y.trim()), E.normalize && (y = y.replace(/\s+/g, " ")), y;
      }
      function ee(E, y) {
        return G(E), E.trackPosition && (y += `
Line: ` + E.line + `
Column: ` + E.column + `
Char: ` + E.c), y = new Error(y), E.error = y, $(E, "onerror", y), E;
      }
      function ge(E) {
        return E.sawRoot && !E.closedRoot && Z(E, "Unclosed root tag"), E.state !== _.BEGIN && E.state !== _.BEGIN_WHITESPACE && E.state !== _.TEXT && ee(E, "Unexpected end"), G(E), E.c = "", E.closed = !0, $(E, "onend"), f.call(E, E.strict, E.opt), E;
      }
      function Z(E, y) {
        if (typeof E != "object" || !(E instanceof f))
          throw new Error("bad call to strictFail");
        E.strict && ee(E, y);
      }
      function we(E) {
        E.strict || (E.tagName = E.tagName[E.looseCase]());
        var y = E.tags[E.tags.length - 1] || E, q = E.tag = { name: E.tagName, attributes: {} };
        E.opt.xmlns && (q.ns = y.ns), E.attribList.length = 0, x(E, "onopentagstart", q);
      }
      function ye(E, y) {
        var q = E.indexOf(":"), I = q < 0 ? ["", E] : E.split(":"), Ce = I[0], Ae = I[1];
        return y && E === "xmlns" && (Ce = "xmlns", Ae = ""), { prefix: Ce, local: Ae };
      }
      function Q(E) {
        if (E.strict || (E.attribName = E.attribName[E.looseCase]()), E.attribList.indexOf(E.attribName) !== -1 || E.tag.attributes.hasOwnProperty(E.attribName)) {
          E.attribName = E.attribValue = "";
          return;
        }
        if (E.opt.xmlns) {
          var y = ye(E.attribName, !0), q = y.prefix, I = y.local;
          if (q === "xmlns")
            if (I === "xml" && E.attribValue !== g)
              Z(
                E,
                "xml: prefix must be bound to " + g + `
Actual: ` + E.attribValue
              );
            else if (I === "xmlns" && E.attribValue !== v)
              Z(
                E,
                "xmlns: prefix must be bound to " + v + `
Actual: ` + E.attribValue
              );
            else {
              var Ce = E.tag, Ae = E.tags[E.tags.length - 1] || E;
              Ce.ns === Ae.ns && (Ce.ns = Object.create(Ae.ns)), Ce.ns[I] = E.attribValue;
            }
          E.attribList.push([E.attribName, E.attribValue]);
        } else
          E.tag.attributes[E.attribName] = E.attribValue, x(E, "onattribute", {
            name: E.attribName,
            value: E.attribValue
          });
        E.attribName = E.attribValue = "";
      }
      function de(E, y) {
        if (E.opt.xmlns) {
          var q = E.tag, I = ye(E.tagName);
          q.prefix = I.prefix, q.local = I.local, q.uri = q.ns[I.prefix] || "", q.prefix && !q.uri && (Z(
            E,
            "Unbound namespace prefix: " + JSON.stringify(E.tagName)
          ), q.uri = I.prefix);
          var Ce = E.tags[E.tags.length - 1] || E;
          q.ns && Ce.ns !== q.ns && Object.keys(q.ns).forEach(function(ne) {
            x(E, "onopennamespace", {
              prefix: ne,
              uri: q.ns[ne]
            });
          });
          for (var Ae = 0, Fe = E.attribList.length; Ae < Fe; Ae++) {
            var Be = E.attribList[Ae], je = Be[0], Ve = Be[1], a = ye(je, !0), B = a.prefix, W = a.local, ie = B === "" ? "" : q.ns[B] || "", V = {
              name: je,
              value: Ve,
              prefix: B,
              local: W,
              uri: ie
            };
            B && B !== "xmlns" && !ie && (Z(
              E,
              "Unbound namespace prefix: " + JSON.stringify(B)
            ), V.uri = B), E.tag.attributes[je] = V, x(E, "onattribute", V);
          }
          E.attribList.length = 0;
        }
        E.tag.isSelfClosing = !!y, E.sawRoot = !0, E.tags.push(E.tag), x(E, "onopentag", E.tag), y || (!E.noscript && E.tagName.toLowerCase() === "script" ? E.state = _.SCRIPT : E.state = _.TEXT, E.tag = null, E.tagName = ""), E.attribName = E.attribValue = "", E.attribList.length = 0;
      }
      function _e(E) {
        if (!E.tagName) {
          Z(E, "Weird empty close tag."), E.textNode += "</>", E.state = _.TEXT;
          return;
        }
        if (E.script) {
          if (E.tagName !== "script") {
            E.script += "</" + E.tagName + ">", E.tagName = "", E.state = _.SCRIPT;
            return;
          }
          x(E, "onscript", E.script), E.script = "";
        }
        var y = E.tags.length, q = E.tagName;
        E.strict || (q = q[E.looseCase]());
        for (var I = q; y--; ) {
          var Ce = E.tags[y];
          if (Ce.name !== I)
            Z(E, "Unexpected close tag");
          else
            break;
        }
        if (y < 0) {
          Z(E, "Unmatched closing tag: " + E.tagName), E.textNode += "</" + E.tagName + ">", E.state = _.TEXT;
          return;
        }
        E.tagName = q;
        for (var Ae = E.tags.length; Ae-- > y; ) {
          var Fe = E.tag = E.tags.pop();
          E.tagName = E.tag.name, x(E, "onclosetag", E.tagName);
          var Be = {};
          for (var je in Fe.ns)
            Be[je] = Fe.ns[je];
          var Ve = E.tags[E.tags.length - 1] || E;
          E.opt.xmlns && Fe.ns !== Ve.ns && Object.keys(Fe.ns).forEach(function(a) {
            var B = Fe.ns[a];
            x(E, "onclosenamespace", { prefix: a, uri: B });
          });
        }
        y === 0 && (E.closedRoot = !0), E.tagName = E.attribValue = E.attribName = "", E.attribList.length = 0, E.state = _.TEXT;
      }
      function be(E) {
        var y = E.entity, q = y.toLowerCase(), I, Ce = "";
        return E.ENTITIES[y] ? E.ENTITIES[y] : E.ENTITIES[q] ? E.ENTITIES[q] : (y = q, y.charAt(0) === "#" && (y.charAt(1) === "x" ? (y = y.slice(2), I = parseInt(y, 16), Ce = I.toString(16)) : (y = y.slice(1), I = parseInt(y, 10), Ce = I.toString(10))), y = y.replace(/^0+/, ""), isNaN(I) || Ce.toLowerCase() !== y || I < 0 || I > 1114111 ? (Z(E, "Invalid character entity"), "&" + E.entity + ";") : String.fromCodePoint(I));
      }
      function Ne(E, y) {
        y === "<" ? (E.state = _.OPEN_WAKA, E.startTagPosition = E.position) : A(y) || (Z(E, "Non-whitespace before first tag."), E.textNode = y, E.state = _.TEXT);
      }
      function Ie(E, y) {
        var q = "";
        return y < E.length && (q = E.charAt(y)), q;
      }
      function Te(E) {
        var y = this;
        if (this.error)
          throw this.error;
        if (y.closed)
          return ee(
            y,
            "Cannot write after close. Assign an onready handler."
          );
        if (E === null)
          return ge(y);
        typeof E == "object" && (E = E.toString());
        for (var q = 0, I = ""; I = Ie(E, q++), y.c = I, !!I; )
          switch (y.trackPosition && (y.position++, I === `
` ? (y.line++, y.column = 0) : y.column++), y.state) {
            case _.BEGIN:
              if (y.state = _.BEGIN_WHITESPACE, I === "\uFEFF")
                continue;
              Ne(y, I);
              continue;
            case _.BEGIN_WHITESPACE:
              Ne(y, I);
              continue;
            case _.TEXT:
              if (y.sawRoot && !y.closedRoot) {
                for (var Ae = q - 1; I && I !== "<" && I !== "&"; )
                  I = Ie(E, q++), I && y.trackPosition && (y.position++, I === `
` ? (y.line++, y.column = 0) : y.column++);
                y.textNode += E.substring(Ae, q - 1);
              }
              I === "<" && !(y.sawRoot && y.closedRoot && !y.strict) ? (y.state = _.OPEN_WAKA, y.startTagPosition = y.position) : (!A(I) && (!y.sawRoot || y.closedRoot) && Z(y, "Text data outside of root node."), I === "&" ? y.state = _.TEXT_ENTITY : y.textNode += I);
              continue;
            case _.SCRIPT:
              I === "<" ? y.state = _.SCRIPT_ENDING : y.script += I;
              continue;
            case _.SCRIPT_ENDING:
              I === "/" ? y.state = _.CLOSE_TAG : (y.script += "<" + I, y.state = _.SCRIPT);
              continue;
            case _.OPEN_WAKA:
              if (I === "!")
                y.state = _.SGML_DECL, y.sgmlDecl = "";
              else if (!A(I)) if (S(w, I))
                y.state = _.OPEN_TAG, y.tagName = I;
              else if (I === "/")
                y.state = _.CLOSE_TAG, y.tagName = "";
              else if (I === "?")
                y.state = _.PROC_INST, y.procInstName = y.procInstBody = "";
              else {
                if (Z(y, "Unencoded <"), y.startTagPosition + 1 < y.position) {
                  var Ce = y.position - y.startTagPosition;
                  I = new Array(Ce).join(" ") + I;
                }
                y.textNode += "<" + I, y.state = _.TEXT;
              }
              continue;
            case _.SGML_DECL:
              if (y.sgmlDecl + I === "--") {
                y.state = _.COMMENT, y.comment = "", y.sgmlDecl = "";
                continue;
              }
              y.doctype && y.doctype !== !0 && y.sgmlDecl ? (y.state = _.DOCTYPE_DTD, y.doctype += "<!" + y.sgmlDecl + I, y.sgmlDecl = "") : (y.sgmlDecl + I).toUpperCase() === r ? (x(y, "onopencdata"), y.state = _.CDATA, y.sgmlDecl = "", y.cdata = "") : (y.sgmlDecl + I).toUpperCase() === d ? (y.state = _.DOCTYPE, (y.doctype || y.sawRoot) && Z(
                y,
                "Inappropriately located doctype declaration"
              ), y.doctype = "", y.sgmlDecl = "") : I === ">" ? (x(y, "onsgmldeclaration", y.sgmlDecl), y.sgmlDecl = "", y.state = _.TEXT) : (O(I) && (y.state = _.SGML_DECL_QUOTED), y.sgmlDecl += I);
              continue;
            case _.SGML_DECL_QUOTED:
              I === y.q && (y.state = _.SGML_DECL, y.q = ""), y.sgmlDecl += I;
              continue;
            case _.DOCTYPE:
              I === ">" ? (y.state = _.TEXT, x(y, "ondoctype", y.doctype), y.doctype = !0) : (y.doctype += I, I === "[" ? y.state = _.DOCTYPE_DTD : O(I) && (y.state = _.DOCTYPE_QUOTED, y.q = I));
              continue;
            case _.DOCTYPE_QUOTED:
              y.doctype += I, I === y.q && (y.q = "", y.state = _.DOCTYPE);
              continue;
            case _.DOCTYPE_DTD:
              I === "]" ? (y.doctype += I, y.state = _.DOCTYPE) : I === "<" ? (y.state = _.OPEN_WAKA, y.startTagPosition = y.position) : O(I) ? (y.doctype += I, y.state = _.DOCTYPE_DTD_QUOTED, y.q = I) : y.doctype += I;
              continue;
            case _.DOCTYPE_DTD_QUOTED:
              y.doctype += I, I === y.q && (y.state = _.DOCTYPE_DTD, y.q = "");
              continue;
            case _.COMMENT:
              I === "-" ? y.state = _.COMMENT_ENDING : y.comment += I;
              continue;
            case _.COMMENT_ENDING:
              I === "-" ? (y.state = _.COMMENT_ENDED, y.comment = z(y.opt, y.comment), y.comment && x(y, "oncomment", y.comment), y.comment = "") : (y.comment += "-" + I, y.state = _.COMMENT);
              continue;
            case _.COMMENT_ENDED:
              I !== ">" ? (Z(y, "Malformed comment"), y.comment += "--" + I, y.state = _.COMMENT) : y.doctype && y.doctype !== !0 ? y.state = _.DOCTYPE_DTD : y.state = _.TEXT;
              continue;
            case _.CDATA:
              for (var Ae = q - 1; I && I !== "]"; )
                I = Ie(E, q++), I && y.trackPosition && (y.position++, I === `
` ? (y.line++, y.column = 0) : y.column++);
              y.cdata += E.substring(Ae, q - 1), I === "]" && (y.state = _.CDATA_ENDING);
              continue;
            case _.CDATA_ENDING:
              I === "]" ? y.state = _.CDATA_ENDING_2 : (y.cdata += "]" + I, y.state = _.CDATA);
              continue;
            case _.CDATA_ENDING_2:
              I === ">" ? (y.cdata && x(y, "oncdata", y.cdata), x(y, "onclosecdata"), y.cdata = "", y.state = _.TEXT) : I === "]" ? y.cdata += "]" : (y.cdata += "]]" + I, y.state = _.CDATA);
              continue;
            case _.PROC_INST:
              I === "?" ? y.state = _.PROC_INST_ENDING : A(I) ? y.state = _.PROC_INST_BODY : y.procInstName += I;
              continue;
            case _.PROC_INST_BODY:
              if (!y.procInstBody && A(I))
                continue;
              I === "?" ? y.state = _.PROC_INST_ENDING : y.procInstBody += I;
              continue;
            case _.PROC_INST_ENDING:
              if (I === ">") {
                const Ve = {
                  name: y.procInstName,
                  body: y.procInstBody
                };
                H(y, Ve), x(y, "onprocessinginstruction", Ve), y.procInstName = y.procInstBody = "", y.state = _.TEXT;
              } else
                y.procInstBody += "?" + I, y.state = _.PROC_INST_BODY;
              continue;
            case _.OPEN_TAG:
              S(R, I) ? y.tagName += I : (we(y), I === ">" ? de(y) : I === "/" ? y.state = _.OPEN_TAG_SLASH : (A(I) || Z(y, "Invalid character in tag name"), y.state = _.ATTRIB));
              continue;
            case _.OPEN_TAG_SLASH:
              I === ">" ? (de(y, !0), _e(y)) : (Z(
                y,
                "Forward-slash in opening tag not followed by >"
              ), y.state = _.ATTRIB);
              continue;
            case _.ATTRIB:
              if (A(I))
                continue;
              I === ">" ? de(y) : I === "/" ? y.state = _.OPEN_TAG_SLASH : S(w, I) ? (y.attribName = I, y.attribValue = "", y.state = _.ATTRIB_NAME) : Z(y, "Invalid attribute name");
              continue;
            case _.ATTRIB_NAME:
              I === "=" ? y.state = _.ATTRIB_VALUE : I === ">" ? (Z(y, "Attribute without value"), y.attribValue = y.attribName, Q(y), de(y)) : A(I) ? y.state = _.ATTRIB_NAME_SAW_WHITE : S(R, I) ? y.attribName += I : Z(y, "Invalid attribute name");
              continue;
            case _.ATTRIB_NAME_SAW_WHITE:
              if (I === "=")
                y.state = _.ATTRIB_VALUE;
              else {
                if (A(I))
                  continue;
                Z(y, "Attribute without value"), y.tag.attributes[y.attribName] = "", y.attribValue = "", x(y, "onattribute", {
                  name: y.attribName,
                  value: ""
                }), y.attribName = "", I === ">" ? de(y) : S(w, I) ? (y.attribName = I, y.state = _.ATTRIB_NAME) : (Z(y, "Invalid attribute name"), y.state = _.ATTRIB);
              }
              continue;
            case _.ATTRIB_VALUE:
              if (A(I))
                continue;
              O(I) ? (y.q = I, y.state = _.ATTRIB_VALUE_QUOTED) : (y.opt.unquotedAttributeValues || ee(y, "Unquoted attribute value"), y.state = _.ATTRIB_VALUE_UNQUOTED, y.attribValue = I);
              continue;
            case _.ATTRIB_VALUE_QUOTED:
              if (I !== y.q) {
                I === "&" ? y.state = _.ATTRIB_VALUE_ENTITY_Q : y.attribValue += I;
                continue;
              }
              Q(y), y.q = "", y.state = _.ATTRIB_VALUE_CLOSED;
              continue;
            case _.ATTRIB_VALUE_CLOSED:
              A(I) ? y.state = _.ATTRIB : I === ">" ? de(y) : I === "/" ? y.state = _.OPEN_TAG_SLASH : S(w, I) ? (Z(y, "No whitespace between attributes"), y.attribName = I, y.attribValue = "", y.state = _.ATTRIB_NAME) : Z(y, "Invalid attribute name");
              continue;
            case _.ATTRIB_VALUE_UNQUOTED:
              if (!b(I)) {
                I === "&" ? y.state = _.ATTRIB_VALUE_ENTITY_U : y.attribValue += I;
                continue;
              }
              Q(y), I === ">" ? de(y) : y.state = _.ATTRIB;
              continue;
            case _.CLOSE_TAG:
              if (y.tagName)
                I === ">" ? _e(y) : S(R, I) ? y.tagName += I : y.script ? (y.script += "</" + y.tagName + I, y.tagName = "", y.state = _.SCRIPT) : (A(I) || Z(y, "Invalid tagname in closing tag"), y.state = _.CLOSE_TAG_SAW_WHITE);
              else {
                if (A(I))
                  continue;
                D(w, I) ? y.script ? (y.script += "</" + I, y.state = _.SCRIPT) : Z(y, "Invalid tagname in closing tag.") : y.tagName = I;
              }
              continue;
            case _.CLOSE_TAG_SAW_WHITE:
              if (A(I))
                continue;
              I === ">" ? _e(y) : Z(y, "Invalid characters in closing tag");
              continue;
            case _.TEXT_ENTITY:
            case _.ATTRIB_VALUE_ENTITY_Q:
            case _.ATTRIB_VALUE_ENTITY_U:
              var Fe, Be;
              switch (y.state) {
                case _.TEXT_ENTITY:
                  Fe = _.TEXT, Be = "textNode";
                  break;
                case _.ATTRIB_VALUE_ENTITY_Q:
                  Fe = _.ATTRIB_VALUE_QUOTED, Be = "attribValue";
                  break;
                case _.ATTRIB_VALUE_ENTITY_U:
                  Fe = _.ATTRIB_VALUE_UNQUOTED, Be = "attribValue";
                  break;
              }
              if (I === ";") {
                var je = be(y);
                y.opt.unparsedEntities && !Object.values(h.XML_ENTITIES).includes(je) ? ((y.entityCount += 1) > y.opt.maxEntityCount && ee(
                  y,
                  "Parsed entity count exceeds max entity count"
                ), (y.entityDepth += 1) > y.opt.maxEntityDepth && ee(
                  y,
                  "Parsed entity depth exceeds max entity depth"
                ), y.entity = "", y.state = Fe, y.write(je), y.entityDepth -= 1) : (y[Be] += je, y.entity = "", y.state = Fe);
              } else S(y.entity.length ? N : P, I) ? y.entity += I : (Z(y, "Invalid character in entity name"), y[Be] += "&" + y.entity + I, y.entity = "", y.state = Fe);
              continue;
            default:
              throw new Error(y, "Unknown state: " + y.state);
          }
        return y.position >= y.bufferCheckPosition && c(y), y;
      }
      String.fromCodePoint || (function() {
        var E = String.fromCharCode, y = Math.floor, q = function() {
          var I = 16384, Ce = [], Ae, Fe, Be = -1, je = arguments.length;
          if (!je)
            return "";
          for (var Ve = ""; ++Be < je; ) {
            var a = Number(arguments[Be]);
            if (!isFinite(a) || // `NaN`, `+Infinity`, or `-Infinity`
            a < 0 || // not a valid Unicode code point
            a > 1114111 || // not a valid Unicode code point
            y(a) !== a)
              throw RangeError("Invalid code point: " + a);
            a <= 65535 ? Ce.push(a) : (a -= 65536, Ae = (a >> 10) + 55296, Fe = a % 1024 + 56320, Ce.push(Ae, Fe)), (Be + 1 === je || Ce.length > I) && (Ve += E.apply(null, Ce), Ce.length = 0);
          }
          return Ve;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: q,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = q;
      })();
    })(s);
  })(Zn)), Zn;
}
var js;
function Sf() {
  if (js) return Wt;
  js = 1, Object.defineProperty(Wt, "__esModule", { value: !0 }), Wt.XElement = void 0, Wt.parseXml = e;
  const s = _f(), h = sn();
  class m {
    constructor(i) {
      if (this.name = i, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !i)
        throw (0, h.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!c(i))
        throw (0, h.newError)(`Invalid element name: ${i}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(i) {
      const o = this.attributes === null ? null : this.attributes[i];
      if (o == null)
        throw (0, h.newError)(`No attribute "${i}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return o;
    }
    removeAttribute(i) {
      this.attributes !== null && delete this.attributes[i];
    }
    element(i, o = !1, n = null) {
      const t = this.elementOrNull(i, o);
      if (t === null)
        throw (0, h.newError)(n || `No element "${i}"`, "ERR_XML_MISSED_ELEMENT");
      return t;
    }
    elementOrNull(i, o = !1) {
      if (this.elements === null)
        return null;
      for (const n of this.elements)
        if (l(n, i, o))
          return n;
      return null;
    }
    getElements(i, o = !1) {
      return this.elements === null ? [] : this.elements.filter((n) => l(n, i, o));
    }
    elementValueOrEmpty(i, o = !1) {
      const n = this.elementOrNull(i, o);
      return n === null ? "" : n.value;
    }
  }
  Wt.XElement = m;
  const f = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function c(u) {
    return f.test(u);
  }
  function l(u, i, o) {
    const n = u.name;
    return n === i || o === !0 && n.length === i.length && n.toLowerCase() === i.toLowerCase();
  }
  function e(u) {
    let i = null;
    const o = s.parser(!0, {}), n = [];
    return o.onopentag = (t) => {
      const r = new m(t.name);
      if (r.attributes = t.attributes, i === null)
        i = r;
      else {
        const d = n[n.length - 1];
        d.elements == null && (d.elements = []), d.elements.push(r);
      }
      n.push(r);
    }, o.onclosetag = () => {
      n.pop();
    }, o.ontext = (t) => {
      n.length > 0 && (n[n.length - 1].value = t);
    }, o.oncdata = (t) => {
      const r = n[n.length - 1];
      r.value = t, r.isCData = !0;
    }, o.onerror = (t) => {
      throw t;
    }, o.write(u), i;
  }
  return Wt;
}
var Hs;
function Ge() {
  return Hs || (Hs = 1, (function(s) {
    Object.defineProperty(s, "__esModule", { value: !0 }), s.CURRENT_APP_PACKAGE_FILE_NAME = s.CURRENT_APP_INSTALLER_FILE_NAME = s.XElement = s.parseXml = s.UUID = s.parseDn = s.retry = s.githubTagPrefix = s.githubUrl = s.getS3LikeProviderBaseUrl = s.ProgressCallbackTransform = s.MemoLazy = s.safeStringifyJson = s.safeGetHeader = s.parseJson = s.HttpExecutor = s.HttpError = s.DigestTransform = s.createHttpError = s.configureRequestUrl = s.configureRequestOptionsFromUrl = s.configureRequestOptions = s.newError = s.CancellationToken = s.CancellationError = void 0, s.asArray = t;
    var h = wa();
    Object.defineProperty(s, "CancellationError", { enumerable: !0, get: function() {
      return h.CancellationError;
    } }), Object.defineProperty(s, "CancellationToken", { enumerable: !0, get: function() {
      return h.CancellationToken;
    } });
    var m = sn();
    Object.defineProperty(s, "newError", { enumerable: !0, get: function() {
      return m.newError;
    } });
    var f = mf();
    Object.defineProperty(s, "configureRequestOptions", { enumerable: !0, get: function() {
      return f.configureRequestOptions;
    } }), Object.defineProperty(s, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return f.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(s, "configureRequestUrl", { enumerable: !0, get: function() {
      return f.configureRequestUrl;
    } }), Object.defineProperty(s, "createHttpError", { enumerable: !0, get: function() {
      return f.createHttpError;
    } }), Object.defineProperty(s, "DigestTransform", { enumerable: !0, get: function() {
      return f.DigestTransform;
    } }), Object.defineProperty(s, "HttpError", { enumerable: !0, get: function() {
      return f.HttpError;
    } }), Object.defineProperty(s, "HttpExecutor", { enumerable: !0, get: function() {
      return f.HttpExecutor;
    } }), Object.defineProperty(s, "parseJson", { enumerable: !0, get: function() {
      return f.parseJson;
    } }), Object.defineProperty(s, "safeGetHeader", { enumerable: !0, get: function() {
      return f.safeGetHeader;
    } }), Object.defineProperty(s, "safeStringifyJson", { enumerable: !0, get: function() {
      return f.safeStringifyJson;
    } });
    var c = gf();
    Object.defineProperty(s, "MemoLazy", { enumerable: !0, get: function() {
      return c.MemoLazy;
    } });
    var l = nu();
    Object.defineProperty(s, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return l.ProgressCallbackTransform;
    } });
    var e = yf();
    Object.defineProperty(s, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return e.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(s, "githubUrl", { enumerable: !0, get: function() {
      return e.githubUrl;
    } }), Object.defineProperty(s, "githubTagPrefix", { enumerable: !0, get: function() {
      return e.githubTagPrefix;
    } });
    var u = vf();
    Object.defineProperty(s, "retry", { enumerable: !0, get: function() {
      return u.retry;
    } });
    var i = Ef();
    Object.defineProperty(s, "parseDn", { enumerable: !0, get: function() {
      return i.parseDn;
    } });
    var o = wf();
    Object.defineProperty(s, "UUID", { enumerable: !0, get: function() {
      return o.UUID;
    } });
    var n = Sf();
    Object.defineProperty(s, "parseXml", { enumerable: !0, get: function() {
      return n.parseXml;
    } }), Object.defineProperty(s, "XElement", { enumerable: !0, get: function() {
      return n.XElement;
    } }), s.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", s.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function t(r) {
      return r == null ? [] : Array.isArray(r) ? r : [r];
    }
  })(Yn)), Yn;
}
var Xe = {}, Jr = {}, _t = {}, Gs;
function Nr() {
  if (Gs) return _t;
  Gs = 1;
  function s(e) {
    return typeof e > "u" || e === null;
  }
  function h(e) {
    return typeof e == "object" && e !== null;
  }
  function m(e) {
    return Array.isArray(e) ? e : s(e) ? [] : [e];
  }
  function f(e, u) {
    var i, o, n, t;
    if (u)
      for (t = Object.keys(u), i = 0, o = t.length; i < o; i += 1)
        n = t[i], e[n] = u[n];
    return e;
  }
  function c(e, u) {
    var i = "", o;
    for (o = 0; o < u; o += 1)
      i += e;
    return i;
  }
  function l(e) {
    return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
  }
  return _t.isNothing = s, _t.isObject = h, _t.toArray = m, _t.repeat = c, _t.isNegativeZero = l, _t.extend = f, _t;
}
var ei, Ws;
function xr() {
  if (Ws) return ei;
  Ws = 1;
  function s(m, f) {
    var c = "", l = m.reason || "(unknown reason)";
    return m.mark ? (m.mark.name && (c += 'in "' + m.mark.name + '" '), c += "(" + (m.mark.line + 1) + ":" + (m.mark.column + 1) + ")", !f && m.mark.snippet && (c += `

` + m.mark.snippet), l + " " + c) : l;
  }
  function h(m, f) {
    Error.call(this), this.name = "YAMLException", this.reason = m, this.mark = f, this.message = s(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return h.prototype = Object.create(Error.prototype), h.prototype.constructor = h, h.prototype.toString = function(f) {
    return this.name + ": " + s(this, f);
  }, ei = h, ei;
}
var ti, Vs;
function Rf() {
  if (Vs) return ti;
  Vs = 1;
  var s = Nr();
  function h(c, l, e, u, i) {
    var o = "", n = "", t = Math.floor(i / 2) - 1;
    return u - l > t && (o = " ... ", l = u - t + o.length), e - u > t && (n = " ...", e = u + t - n.length), {
      str: o + c.slice(l, e).replace(/\t/g, "→") + n,
      pos: u - l + o.length
      // relative position
    };
  }
  function m(c, l) {
    return s.repeat(" ", l - c.length) + c;
  }
  function f(c, l) {
    if (l = Object.create(l || null), !c.buffer) return null;
    l.maxLength || (l.maxLength = 79), typeof l.indent != "number" && (l.indent = 1), typeof l.linesBefore != "number" && (l.linesBefore = 3), typeof l.linesAfter != "number" && (l.linesAfter = 2);
    for (var e = /\r?\n|\r|\0/g, u = [0], i = [], o, n = -1; o = e.exec(c.buffer); )
      i.push(o.index), u.push(o.index + o[0].length), c.position <= o.index && n < 0 && (n = u.length - 2);
    n < 0 && (n = u.length - 1);
    var t = "", r, d, g = Math.min(c.line + l.linesAfter, i.length).toString().length, v = l.maxLength - (l.indent + g + 3);
    for (r = 1; r <= l.linesBefore && !(n - r < 0); r++)
      d = h(
        c.buffer,
        u[n - r],
        i[n - r],
        c.position - (u[n] - u[n - r]),
        v
      ), t = s.repeat(" ", l.indent) + m((c.line - r + 1).toString(), g) + " | " + d.str + `
` + t;
    for (d = h(c.buffer, u[n], i[n], c.position, v), t += s.repeat(" ", l.indent) + m((c.line + 1).toString(), g) + " | " + d.str + `
`, t += s.repeat("-", l.indent + g + 3 + d.pos) + `^
`, r = 1; r <= l.linesAfter && !(n + r >= i.length); r++)
      d = h(
        c.buffer,
        u[n + r],
        i[n + r],
        c.position - (u[n] - u[n + r]),
        v
      ), t += s.repeat(" ", l.indent) + m((c.line + r + 1).toString(), g) + " | " + d.str + `
`;
    return t.replace(/\n$/, "");
  }
  return ti = f, ti;
}
var ri, zs;
function Je() {
  if (zs) return ri;
  zs = 1;
  var s = xr(), h = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ], m = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function f(l) {
    var e = {};
    return l !== null && Object.keys(l).forEach(function(u) {
      l[u].forEach(function(i) {
        e[String(i)] = u;
      });
    }), e;
  }
  function c(l, e) {
    if (e = e || {}, Object.keys(e).forEach(function(u) {
      if (h.indexOf(u) === -1)
        throw new s('Unknown option "' + u + '" is met in definition of "' + l + '" YAML type.');
    }), this.options = e, this.tag = l, this.kind = e.kind || null, this.resolve = e.resolve || function() {
      return !0;
    }, this.construct = e.construct || function(u) {
      return u;
    }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = f(e.styleAliases || null), m.indexOf(this.kind) === -1)
      throw new s('Unknown kind "' + this.kind + '" is specified for "' + l + '" YAML type.');
  }
  return ri = c, ri;
}
var ni, Ys;
function iu() {
  if (Ys) return ni;
  Ys = 1;
  var s = xr(), h = Je();
  function m(l, e) {
    var u = [];
    return l[e].forEach(function(i) {
      var o = u.length;
      u.forEach(function(n, t) {
        n.tag === i.tag && n.kind === i.kind && n.multi === i.multi && (o = t);
      }), u[o] = i;
    }), u;
  }
  function f() {
    var l = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    }, e, u;
    function i(o) {
      o.multi ? (l.multi[o.kind].push(o), l.multi.fallback.push(o)) : l[o.kind][o.tag] = l.fallback[o.tag] = o;
    }
    for (e = 0, u = arguments.length; e < u; e += 1)
      arguments[e].forEach(i);
    return l;
  }
  function c(l) {
    return this.extend(l);
  }
  return c.prototype.extend = function(e) {
    var u = [], i = [];
    if (e instanceof h)
      i.push(e);
    else if (Array.isArray(e))
      i = i.concat(e);
    else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
      e.implicit && (u = u.concat(e.implicit)), e.explicit && (i = i.concat(e.explicit));
    else
      throw new s("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    u.forEach(function(n) {
      if (!(n instanceof h))
        throw new s("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (n.loadKind && n.loadKind !== "scalar")
        throw new s("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (n.multi)
        throw new s("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), i.forEach(function(n) {
      if (!(n instanceof h))
        throw new s("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var o = Object.create(c.prototype);
    return o.implicit = (this.implicit || []).concat(u), o.explicit = (this.explicit || []).concat(i), o.compiledImplicit = m(o, "implicit"), o.compiledExplicit = m(o, "explicit"), o.compiledTypeMap = f(o.compiledImplicit, o.compiledExplicit), o;
  }, ni = c, ni;
}
var ii, Xs;
function au() {
  if (Xs) return ii;
  Xs = 1;
  var s = Je();
  return ii = new s("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(h) {
      return h !== null ? h : "";
    }
  }), ii;
}
var ai, Js;
function su() {
  if (Js) return ai;
  Js = 1;
  var s = Je();
  return ai = new s("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(h) {
      return h !== null ? h : [];
    }
  }), ai;
}
var si, Ks;
function ou() {
  if (Ks) return si;
  Ks = 1;
  var s = Je();
  return si = new s("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(h) {
      return h !== null ? h : {};
    }
  }), si;
}
var oi, Qs;
function lu() {
  if (Qs) return oi;
  Qs = 1;
  var s = iu();
  return oi = new s({
    explicit: [
      au(),
      su(),
      ou()
    ]
  }), oi;
}
var li, Zs;
function uu() {
  if (Zs) return li;
  Zs = 1;
  var s = Je();
  function h(c) {
    if (c === null) return !0;
    var l = c.length;
    return l === 1 && c === "~" || l === 4 && (c === "null" || c === "Null" || c === "NULL");
  }
  function m() {
    return null;
  }
  function f(c) {
    return c === null;
  }
  return li = new s("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: h,
    construct: m,
    predicate: f,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  }), li;
}
var ui, eo;
function cu() {
  if (eo) return ui;
  eo = 1;
  var s = Je();
  function h(c) {
    if (c === null) return !1;
    var l = c.length;
    return l === 4 && (c === "true" || c === "True" || c === "TRUE") || l === 5 && (c === "false" || c === "False" || c === "FALSE");
  }
  function m(c) {
    return c === "true" || c === "True" || c === "TRUE";
  }
  function f(c) {
    return Object.prototype.toString.call(c) === "[object Boolean]";
  }
  return ui = new s("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: h,
    construct: m,
    predicate: f,
    represent: {
      lowercase: function(c) {
        return c ? "true" : "false";
      },
      uppercase: function(c) {
        return c ? "TRUE" : "FALSE";
      },
      camelcase: function(c) {
        return c ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), ui;
}
var ci, to;
function fu() {
  if (to) return ci;
  to = 1;
  var s = Nr(), h = Je();
  function m(i) {
    return 48 <= i && i <= 57 || 65 <= i && i <= 70 || 97 <= i && i <= 102;
  }
  function f(i) {
    return 48 <= i && i <= 55;
  }
  function c(i) {
    return 48 <= i && i <= 57;
  }
  function l(i) {
    if (i === null) return !1;
    var o = i.length, n = 0, t = !1, r;
    if (!o) return !1;
    if (r = i[n], (r === "-" || r === "+") && (r = i[++n]), r === "0") {
      if (n + 1 === o) return !0;
      if (r = i[++n], r === "b") {
        for (n++; n < o; n++)
          if (r = i[n], r !== "_") {
            if (r !== "0" && r !== "1") return !1;
            t = !0;
          }
        return t && r !== "_";
      }
      if (r === "x") {
        for (n++; n < o; n++)
          if (r = i[n], r !== "_") {
            if (!m(i.charCodeAt(n))) return !1;
            t = !0;
          }
        return t && r !== "_";
      }
      if (r === "o") {
        for (n++; n < o; n++)
          if (r = i[n], r !== "_") {
            if (!f(i.charCodeAt(n))) return !1;
            t = !0;
          }
        return t && r !== "_";
      }
    }
    if (r === "_") return !1;
    for (; n < o; n++)
      if (r = i[n], r !== "_") {
        if (!c(i.charCodeAt(n)))
          return !1;
        t = !0;
      }
    return !(!t || r === "_");
  }
  function e(i) {
    var o = i, n = 1, t;
    if (o.indexOf("_") !== -1 && (o = o.replace(/_/g, "")), t = o[0], (t === "-" || t === "+") && (t === "-" && (n = -1), o = o.slice(1), t = o[0]), o === "0") return 0;
    if (t === "0") {
      if (o[1] === "b") return n * parseInt(o.slice(2), 2);
      if (o[1] === "x") return n * parseInt(o.slice(2), 16);
      if (o[1] === "o") return n * parseInt(o.slice(2), 8);
    }
    return n * parseInt(o, 10);
  }
  function u(i) {
    return Object.prototype.toString.call(i) === "[object Number]" && i % 1 === 0 && !s.isNegativeZero(i);
  }
  return ci = new h("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: l,
    construct: e,
    predicate: u,
    represent: {
      binary: function(i) {
        return i >= 0 ? "0b" + i.toString(2) : "-0b" + i.toString(2).slice(1);
      },
      octal: function(i) {
        return i >= 0 ? "0o" + i.toString(8) : "-0o" + i.toString(8).slice(1);
      },
      decimal: function(i) {
        return i.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(i) {
        return i >= 0 ? "0x" + i.toString(16).toUpperCase() : "-0x" + i.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), ci;
}
var fi, ro;
function du() {
  if (ro) return fi;
  ro = 1;
  var s = Nr(), h = Je(), m = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function f(i) {
    return !(i === null || !m.test(i) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    i[i.length - 1] === "_");
  }
  function c(i) {
    var o, n;
    return o = i.replace(/_/g, "").toLowerCase(), n = o[0] === "-" ? -1 : 1, "+-".indexOf(o[0]) >= 0 && (o = o.slice(1)), o === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : o === ".nan" ? NaN : n * parseFloat(o, 10);
  }
  var l = /^[-+]?[0-9]+e/;
  function e(i, o) {
    var n;
    if (isNaN(i))
      switch (o) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === i)
      switch (o) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === i)
      switch (o) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (s.isNegativeZero(i))
      return "-0.0";
    return n = i.toString(10), l.test(n) ? n.replace("e", ".e") : n;
  }
  function u(i) {
    return Object.prototype.toString.call(i) === "[object Number]" && (i % 1 !== 0 || s.isNegativeZero(i));
  }
  return fi = new h("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: f,
    construct: c,
    predicate: u,
    represent: e,
    defaultStyle: "lowercase"
  }), fi;
}
var di, no;
function hu() {
  return no || (no = 1, di = lu().extend({
    implicit: [
      uu(),
      cu(),
      fu(),
      du()
    ]
  })), di;
}
var hi, io;
function pu() {
  return io || (io = 1, hi = hu()), hi;
}
var pi, ao;
function mu() {
  if (ao) return pi;
  ao = 1;
  var s = Je(), h = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), m = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function f(e) {
    return e === null ? !1 : h.exec(e) !== null || m.exec(e) !== null;
  }
  function c(e) {
    var u, i, o, n, t, r, d, g = 0, v = null, p, w, R;
    if (u = h.exec(e), u === null && (u = m.exec(e)), u === null) throw new Error("Date resolve error");
    if (i = +u[1], o = +u[2] - 1, n = +u[3], !u[4])
      return new Date(Date.UTC(i, o, n));
    if (t = +u[4], r = +u[5], d = +u[6], u[7]) {
      for (g = u[7].slice(0, 3); g.length < 3; )
        g += "0";
      g = +g;
    }
    return u[9] && (p = +u[10], w = +(u[11] || 0), v = (p * 60 + w) * 6e4, u[9] === "-" && (v = -v)), R = new Date(Date.UTC(i, o, n, t, r, d, g)), v && R.setTime(R.getTime() - v), R;
  }
  function l(e) {
    return e.toISOString();
  }
  return pi = new s("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: f,
    construct: c,
    instanceOf: Date,
    represent: l
  }), pi;
}
var mi, so;
function gu() {
  if (so) return mi;
  so = 1;
  var s = Je();
  function h(m) {
    return m === "<<" || m === null;
  }
  return mi = new s("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: h
  }), mi;
}
var gi, oo;
function yu() {
  if (oo) return gi;
  oo = 1;
  var s = Je(), h = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function m(e) {
    if (e === null) return !1;
    var u, i, o = 0, n = e.length, t = h;
    for (i = 0; i < n; i++)
      if (u = t.indexOf(e.charAt(i)), !(u > 64)) {
        if (u < 0) return !1;
        o += 6;
      }
    return o % 8 === 0;
  }
  function f(e) {
    var u, i, o = e.replace(/[\r\n=]/g, ""), n = o.length, t = h, r = 0, d = [];
    for (u = 0; u < n; u++)
      u % 4 === 0 && u && (d.push(r >> 16 & 255), d.push(r >> 8 & 255), d.push(r & 255)), r = r << 6 | t.indexOf(o.charAt(u));
    return i = n % 4 * 6, i === 0 ? (d.push(r >> 16 & 255), d.push(r >> 8 & 255), d.push(r & 255)) : i === 18 ? (d.push(r >> 10 & 255), d.push(r >> 2 & 255)) : i === 12 && d.push(r >> 4 & 255), new Uint8Array(d);
  }
  function c(e) {
    var u = "", i = 0, o, n, t = e.length, r = h;
    for (o = 0; o < t; o++)
      o % 3 === 0 && o && (u += r[i >> 18 & 63], u += r[i >> 12 & 63], u += r[i >> 6 & 63], u += r[i & 63]), i = (i << 8) + e[o];
    return n = t % 3, n === 0 ? (u += r[i >> 18 & 63], u += r[i >> 12 & 63], u += r[i >> 6 & 63], u += r[i & 63]) : n === 2 ? (u += r[i >> 10 & 63], u += r[i >> 4 & 63], u += r[i << 2 & 63], u += r[64]) : n === 1 && (u += r[i >> 2 & 63], u += r[i << 4 & 63], u += r[64], u += r[64]), u;
  }
  function l(e) {
    return Object.prototype.toString.call(e) === "[object Uint8Array]";
  }
  return gi = new s("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: m,
    construct: f,
    predicate: l,
    represent: c
  }), gi;
}
var yi, lo;
function vu() {
  if (lo) return yi;
  lo = 1;
  var s = Je(), h = Object.prototype.hasOwnProperty, m = Object.prototype.toString;
  function f(l) {
    if (l === null) return !0;
    var e = [], u, i, o, n, t, r = l;
    for (u = 0, i = r.length; u < i; u += 1) {
      if (o = r[u], t = !1, m.call(o) !== "[object Object]") return !1;
      for (n in o)
        if (h.call(o, n))
          if (!t) t = !0;
          else return !1;
      if (!t) return !1;
      if (e.indexOf(n) === -1) e.push(n);
      else return !1;
    }
    return !0;
  }
  function c(l) {
    return l !== null ? l : [];
  }
  return yi = new s("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: f,
    construct: c
  }), yi;
}
var vi, uo;
function Eu() {
  if (uo) return vi;
  uo = 1;
  var s = Je(), h = Object.prototype.toString;
  function m(c) {
    if (c === null) return !0;
    var l, e, u, i, o, n = c;
    for (o = new Array(n.length), l = 0, e = n.length; l < e; l += 1) {
      if (u = n[l], h.call(u) !== "[object Object]" || (i = Object.keys(u), i.length !== 1)) return !1;
      o[l] = [i[0], u[i[0]]];
    }
    return !0;
  }
  function f(c) {
    if (c === null) return [];
    var l, e, u, i, o, n = c;
    for (o = new Array(n.length), l = 0, e = n.length; l < e; l += 1)
      u = n[l], i = Object.keys(u), o[l] = [i[0], u[i[0]]];
    return o;
  }
  return vi = new s("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: m,
    construct: f
  }), vi;
}
var Ei, co;
function wu() {
  if (co) return Ei;
  co = 1;
  var s = Je(), h = Object.prototype.hasOwnProperty;
  function m(c) {
    if (c === null) return !0;
    var l, e = c;
    for (l in e)
      if (h.call(e, l) && e[l] !== null)
        return !1;
    return !0;
  }
  function f(c) {
    return c !== null ? c : {};
  }
  return Ei = new s("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: m,
    construct: f
  }), Ei;
}
var wi, fo;
function _a() {
  return fo || (fo = 1, wi = pu().extend({
    implicit: [
      mu(),
      gu()
    ],
    explicit: [
      yu(),
      vu(),
      Eu(),
      wu()
    ]
  })), wi;
}
var ho;
function Cf() {
  if (ho) return Jr;
  ho = 1;
  var s = Nr(), h = xr(), m = Rf(), f = _a(), c = Object.prototype.hasOwnProperty, l = 1, e = 2, u = 3, i = 4, o = 1, n = 2, t = 3, r = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, d = /[\x85\u2028\u2029]/, g = /[,\[\]\{\}]/, v = /^(?:!|!!|![a-z\-]+!)$/i, p = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function w(a) {
    return Object.prototype.toString.call(a);
  }
  function R(a) {
    return a === 10 || a === 13;
  }
  function P(a) {
    return a === 9 || a === 32;
  }
  function N(a) {
    return a === 9 || a === 32 || a === 10 || a === 13;
  }
  function A(a) {
    return a === 44 || a === 91 || a === 93 || a === 123 || a === 125;
  }
  function O(a) {
    var B;
    return 48 <= a && a <= 57 ? a - 48 : (B = a | 32, 97 <= B && B <= 102 ? B - 97 + 10 : -1);
  }
  function b(a) {
    return a === 120 ? 2 : a === 117 ? 4 : a === 85 ? 8 : 0;
  }
  function S(a) {
    return 48 <= a && a <= 57 ? a - 48 : -1;
  }
  function D(a) {
    return a === 48 ? "\0" : a === 97 ? "\x07" : a === 98 ? "\b" : a === 116 || a === 9 ? "	" : a === 110 ? `
` : a === 118 ? "\v" : a === 102 ? "\f" : a === 114 ? "\r" : a === 101 ? "\x1B" : a === 32 ? " " : a === 34 ? '"' : a === 47 ? "/" : a === 92 ? "\\" : a === 78 ? "" : a === 95 ? " " : a === 76 ? "\u2028" : a === 80 ? "\u2029" : "";
  }
  function _(a) {
    return a <= 65535 ? String.fromCharCode(a) : String.fromCharCode(
      (a - 65536 >> 10) + 55296,
      (a - 65536 & 1023) + 56320
    );
  }
  function k(a, B, W) {
    B === "__proto__" ? Object.defineProperty(a, B, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: W
    }) : a[B] = W;
  }
  for (var $ = new Array(256), M = new Array(256), L = 0; L < 256; L++)
    $[L] = D(L) ? 1 : 0, M[L] = D(L);
  function F(a, B) {
    this.input = a, this.filename = B.filename || null, this.schema = B.schema || f, this.onWarning = B.onWarning || null, this.legacy = B.legacy || !1, this.json = B.json || !1, this.listener = B.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = a.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function H(a, B) {
    var W = {
      name: a.filename,
      buffer: a.input.slice(0, -1),
      // omit trailing \0
      position: a.position,
      line: a.line,
      column: a.position - a.lineStart
    };
    return W.snippet = m(W), new h(B, W);
  }
  function x(a, B) {
    throw H(a, B);
  }
  function G(a, B) {
    a.onWarning && a.onWarning.call(null, H(a, B));
  }
  var z = {
    YAML: function(B, W, ie) {
      var V, ne, te;
      B.version !== null && x(B, "duplication of %YAML directive"), ie.length !== 1 && x(B, "YAML directive accepts exactly one argument"), V = /^([0-9]+)\.([0-9]+)$/.exec(ie[0]), V === null && x(B, "ill-formed argument of the YAML directive"), ne = parseInt(V[1], 10), te = parseInt(V[2], 10), ne !== 1 && x(B, "unacceptable YAML version of the document"), B.version = ie[0], B.checkLineBreaks = te < 2, te !== 1 && te !== 2 && G(B, "unsupported YAML version of the document");
    },
    TAG: function(B, W, ie) {
      var V, ne;
      ie.length !== 2 && x(B, "TAG directive accepts exactly two arguments"), V = ie[0], ne = ie[1], v.test(V) || x(B, "ill-formed tag handle (first argument) of the TAG directive"), c.call(B.tagMap, V) && x(B, 'there is a previously declared suffix for "' + V + '" tag handle'), p.test(ne) || x(B, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        ne = decodeURIComponent(ne);
      } catch {
        x(B, "tag prefix is malformed: " + ne);
      }
      B.tagMap[V] = ne;
    }
  };
  function ee(a, B, W, ie) {
    var V, ne, te, se;
    if (B < W) {
      if (se = a.input.slice(B, W), ie)
        for (V = 0, ne = se.length; V < ne; V += 1)
          te = se.charCodeAt(V), te === 9 || 32 <= te && te <= 1114111 || x(a, "expected valid JSON character");
      else r.test(se) && x(a, "the stream contains non-printable characters");
      a.result += se;
    }
  }
  function ge(a, B, W, ie) {
    var V, ne, te, se;
    for (s.isObject(W) || x(a, "cannot merge mappings; the provided source object is unacceptable"), V = Object.keys(W), te = 0, se = V.length; te < se; te += 1)
      ne = V[te], c.call(B, ne) || (k(B, ne, W[ne]), ie[ne] = !0);
  }
  function Z(a, B, W, ie, V, ne, te, se, ue) {
    var Pe, De;
    if (Array.isArray(V))
      for (V = Array.prototype.slice.call(V), Pe = 0, De = V.length; Pe < De; Pe += 1)
        Array.isArray(V[Pe]) && x(a, "nested arrays are not supported inside keys"), typeof V == "object" && w(V[Pe]) === "[object Object]" && (V[Pe] = "[object Object]");
    if (typeof V == "object" && w(V) === "[object Object]" && (V = "[object Object]"), V = String(V), B === null && (B = {}), ie === "tag:yaml.org,2002:merge")
      if (Array.isArray(ne))
        for (Pe = 0, De = ne.length; Pe < De; Pe += 1)
          ge(a, B, ne[Pe], W);
      else
        ge(a, B, ne, W);
    else
      !a.json && !c.call(W, V) && c.call(B, V) && (a.line = te || a.line, a.lineStart = se || a.lineStart, a.position = ue || a.position, x(a, "duplicated mapping key")), k(B, V, ne), delete W[V];
    return B;
  }
  function we(a) {
    var B;
    B = a.input.charCodeAt(a.position), B === 10 ? a.position++ : B === 13 ? (a.position++, a.input.charCodeAt(a.position) === 10 && a.position++) : x(a, "a line break is expected"), a.line += 1, a.lineStart = a.position, a.firstTabInLine = -1;
  }
  function ye(a, B, W) {
    for (var ie = 0, V = a.input.charCodeAt(a.position); V !== 0; ) {
      for (; P(V); )
        V === 9 && a.firstTabInLine === -1 && (a.firstTabInLine = a.position), V = a.input.charCodeAt(++a.position);
      if (B && V === 35)
        do
          V = a.input.charCodeAt(++a.position);
        while (V !== 10 && V !== 13 && V !== 0);
      if (R(V))
        for (we(a), V = a.input.charCodeAt(a.position), ie++, a.lineIndent = 0; V === 32; )
          a.lineIndent++, V = a.input.charCodeAt(++a.position);
      else
        break;
    }
    return W !== -1 && ie !== 0 && a.lineIndent < W && G(a, "deficient indentation"), ie;
  }
  function Q(a) {
    var B = a.position, W;
    return W = a.input.charCodeAt(B), !!((W === 45 || W === 46) && W === a.input.charCodeAt(B + 1) && W === a.input.charCodeAt(B + 2) && (B += 3, W = a.input.charCodeAt(B), W === 0 || N(W)));
  }
  function de(a, B) {
    B === 1 ? a.result += " " : B > 1 && (a.result += s.repeat(`
`, B - 1));
  }
  function _e(a, B, W) {
    var ie, V, ne, te, se, ue, Pe, De, me = a.kind, C = a.result, j;
    if (j = a.input.charCodeAt(a.position), N(j) || A(j) || j === 35 || j === 38 || j === 42 || j === 33 || j === 124 || j === 62 || j === 39 || j === 34 || j === 37 || j === 64 || j === 96 || (j === 63 || j === 45) && (V = a.input.charCodeAt(a.position + 1), N(V) || W && A(V)))
      return !1;
    for (a.kind = "scalar", a.result = "", ne = te = a.position, se = !1; j !== 0; ) {
      if (j === 58) {
        if (V = a.input.charCodeAt(a.position + 1), N(V) || W && A(V))
          break;
      } else if (j === 35) {
        if (ie = a.input.charCodeAt(a.position - 1), N(ie))
          break;
      } else {
        if (a.position === a.lineStart && Q(a) || W && A(j))
          break;
        if (R(j))
          if (ue = a.line, Pe = a.lineStart, De = a.lineIndent, ye(a, !1, -1), a.lineIndent >= B) {
            se = !0, j = a.input.charCodeAt(a.position);
            continue;
          } else {
            a.position = te, a.line = ue, a.lineStart = Pe, a.lineIndent = De;
            break;
          }
      }
      se && (ee(a, ne, te, !1), de(a, a.line - ue), ne = te = a.position, se = !1), P(j) || (te = a.position + 1), j = a.input.charCodeAt(++a.position);
    }
    return ee(a, ne, te, !1), a.result ? !0 : (a.kind = me, a.result = C, !1);
  }
  function be(a, B) {
    var W, ie, V;
    if (W = a.input.charCodeAt(a.position), W !== 39)
      return !1;
    for (a.kind = "scalar", a.result = "", a.position++, ie = V = a.position; (W = a.input.charCodeAt(a.position)) !== 0; )
      if (W === 39)
        if (ee(a, ie, a.position, !0), W = a.input.charCodeAt(++a.position), W === 39)
          ie = a.position, a.position++, V = a.position;
        else
          return !0;
      else R(W) ? (ee(a, ie, V, !0), de(a, ye(a, !1, B)), ie = V = a.position) : a.position === a.lineStart && Q(a) ? x(a, "unexpected end of the document within a single quoted scalar") : (a.position++, V = a.position);
    x(a, "unexpected end of the stream within a single quoted scalar");
  }
  function Ne(a, B) {
    var W, ie, V, ne, te, se;
    if (se = a.input.charCodeAt(a.position), se !== 34)
      return !1;
    for (a.kind = "scalar", a.result = "", a.position++, W = ie = a.position; (se = a.input.charCodeAt(a.position)) !== 0; ) {
      if (se === 34)
        return ee(a, W, a.position, !0), a.position++, !0;
      if (se === 92) {
        if (ee(a, W, a.position, !0), se = a.input.charCodeAt(++a.position), R(se))
          ye(a, !1, B);
        else if (se < 256 && $[se])
          a.result += M[se], a.position++;
        else if ((te = b(se)) > 0) {
          for (V = te, ne = 0; V > 0; V--)
            se = a.input.charCodeAt(++a.position), (te = O(se)) >= 0 ? ne = (ne << 4) + te : x(a, "expected hexadecimal character");
          a.result += _(ne), a.position++;
        } else
          x(a, "unknown escape sequence");
        W = ie = a.position;
      } else R(se) ? (ee(a, W, ie, !0), de(a, ye(a, !1, B)), W = ie = a.position) : a.position === a.lineStart && Q(a) ? x(a, "unexpected end of the document within a double quoted scalar") : (a.position++, ie = a.position);
    }
    x(a, "unexpected end of the stream within a double quoted scalar");
  }
  function Ie(a, B) {
    var W = !0, ie, V, ne, te = a.tag, se, ue = a.anchor, Pe, De, me, C, j, Y = /* @__PURE__ */ Object.create(null), X, J, ae, re;
    if (re = a.input.charCodeAt(a.position), re === 91)
      De = 93, j = !1, se = [];
    else if (re === 123)
      De = 125, j = !0, se = {};
    else
      return !1;
    for (a.anchor !== null && (a.anchorMap[a.anchor] = se), re = a.input.charCodeAt(++a.position); re !== 0; ) {
      if (ye(a, !0, B), re = a.input.charCodeAt(a.position), re === De)
        return a.position++, a.tag = te, a.anchor = ue, a.kind = j ? "mapping" : "sequence", a.result = se, !0;
      W ? re === 44 && x(a, "expected the node content, but found ','") : x(a, "missed comma between flow collection entries"), J = X = ae = null, me = C = !1, re === 63 && (Pe = a.input.charCodeAt(a.position + 1), N(Pe) && (me = C = !0, a.position++, ye(a, !0, B))), ie = a.line, V = a.lineStart, ne = a.position, Ae(a, B, l, !1, !0), J = a.tag, X = a.result, ye(a, !0, B), re = a.input.charCodeAt(a.position), (C || a.line === ie) && re === 58 && (me = !0, re = a.input.charCodeAt(++a.position), ye(a, !0, B), Ae(a, B, l, !1, !0), ae = a.result), j ? Z(a, se, Y, J, X, ae, ie, V, ne) : me ? se.push(Z(a, null, Y, J, X, ae, ie, V, ne)) : se.push(X), ye(a, !0, B), re = a.input.charCodeAt(a.position), re === 44 ? (W = !0, re = a.input.charCodeAt(++a.position)) : W = !1;
    }
    x(a, "unexpected end of the stream within a flow collection");
  }
  function Te(a, B) {
    var W, ie, V = o, ne = !1, te = !1, se = B, ue = 0, Pe = !1, De, me;
    if (me = a.input.charCodeAt(a.position), me === 124)
      ie = !1;
    else if (me === 62)
      ie = !0;
    else
      return !1;
    for (a.kind = "scalar", a.result = ""; me !== 0; )
      if (me = a.input.charCodeAt(++a.position), me === 43 || me === 45)
        o === V ? V = me === 43 ? t : n : x(a, "repeat of a chomping mode identifier");
      else if ((De = S(me)) >= 0)
        De === 0 ? x(a, "bad explicit indentation width of a block scalar; it cannot be less than one") : te ? x(a, "repeat of an indentation width identifier") : (se = B + De - 1, te = !0);
      else
        break;
    if (P(me)) {
      do
        me = a.input.charCodeAt(++a.position);
      while (P(me));
      if (me === 35)
        do
          me = a.input.charCodeAt(++a.position);
        while (!R(me) && me !== 0);
    }
    for (; me !== 0; ) {
      for (we(a), a.lineIndent = 0, me = a.input.charCodeAt(a.position); (!te || a.lineIndent < se) && me === 32; )
        a.lineIndent++, me = a.input.charCodeAt(++a.position);
      if (!te && a.lineIndent > se && (se = a.lineIndent), R(me)) {
        ue++;
        continue;
      }
      if (a.lineIndent < se) {
        V === t ? a.result += s.repeat(`
`, ne ? 1 + ue : ue) : V === o && ne && (a.result += `
`);
        break;
      }
      for (ie ? P(me) ? (Pe = !0, a.result += s.repeat(`
`, ne ? 1 + ue : ue)) : Pe ? (Pe = !1, a.result += s.repeat(`
`, ue + 1)) : ue === 0 ? ne && (a.result += " ") : a.result += s.repeat(`
`, ue) : a.result += s.repeat(`
`, ne ? 1 + ue : ue), ne = !0, te = !0, ue = 0, W = a.position; !R(me) && me !== 0; )
        me = a.input.charCodeAt(++a.position);
      ee(a, W, a.position, !1);
    }
    return !0;
  }
  function E(a, B) {
    var W, ie = a.tag, V = a.anchor, ne = [], te, se = !1, ue;
    if (a.firstTabInLine !== -1) return !1;
    for (a.anchor !== null && (a.anchorMap[a.anchor] = ne), ue = a.input.charCodeAt(a.position); ue !== 0 && (a.firstTabInLine !== -1 && (a.position = a.firstTabInLine, x(a, "tab characters must not be used in indentation")), !(ue !== 45 || (te = a.input.charCodeAt(a.position + 1), !N(te)))); ) {
      if (se = !0, a.position++, ye(a, !0, -1) && a.lineIndent <= B) {
        ne.push(null), ue = a.input.charCodeAt(a.position);
        continue;
      }
      if (W = a.line, Ae(a, B, u, !1, !0), ne.push(a.result), ye(a, !0, -1), ue = a.input.charCodeAt(a.position), (a.line === W || a.lineIndent > B) && ue !== 0)
        x(a, "bad indentation of a sequence entry");
      else if (a.lineIndent < B)
        break;
    }
    return se ? (a.tag = ie, a.anchor = V, a.kind = "sequence", a.result = ne, !0) : !1;
  }
  function y(a, B, W) {
    var ie, V, ne, te, se, ue, Pe = a.tag, De = a.anchor, me = {}, C = /* @__PURE__ */ Object.create(null), j = null, Y = null, X = null, J = !1, ae = !1, re;
    if (a.firstTabInLine !== -1) return !1;
    for (a.anchor !== null && (a.anchorMap[a.anchor] = me), re = a.input.charCodeAt(a.position); re !== 0; ) {
      if (!J && a.firstTabInLine !== -1 && (a.position = a.firstTabInLine, x(a, "tab characters must not be used in indentation")), ie = a.input.charCodeAt(a.position + 1), ne = a.line, (re === 63 || re === 58) && N(ie))
        re === 63 ? (J && (Z(a, me, C, j, Y, null, te, se, ue), j = Y = X = null), ae = !0, J = !0, V = !0) : J ? (J = !1, V = !0) : x(a, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), a.position += 1, re = ie;
      else {
        if (te = a.line, se = a.lineStart, ue = a.position, !Ae(a, W, e, !1, !0))
          break;
        if (a.line === ne) {
          for (re = a.input.charCodeAt(a.position); P(re); )
            re = a.input.charCodeAt(++a.position);
          if (re === 58)
            re = a.input.charCodeAt(++a.position), N(re) || x(a, "a whitespace character is expected after the key-value separator within a block mapping"), J && (Z(a, me, C, j, Y, null, te, se, ue), j = Y = X = null), ae = !0, J = !1, V = !1, j = a.tag, Y = a.result;
          else if (ae)
            x(a, "can not read an implicit mapping pair; a colon is missed");
          else
            return a.tag = Pe, a.anchor = De, !0;
        } else if (ae)
          x(a, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return a.tag = Pe, a.anchor = De, !0;
      }
      if ((a.line === ne || a.lineIndent > B) && (J && (te = a.line, se = a.lineStart, ue = a.position), Ae(a, B, i, !0, V) && (J ? Y = a.result : X = a.result), J || (Z(a, me, C, j, Y, X, te, se, ue), j = Y = X = null), ye(a, !0, -1), re = a.input.charCodeAt(a.position)), (a.line === ne || a.lineIndent > B) && re !== 0)
        x(a, "bad indentation of a mapping entry");
      else if (a.lineIndent < B)
        break;
    }
    return J && Z(a, me, C, j, Y, null, te, se, ue), ae && (a.tag = Pe, a.anchor = De, a.kind = "mapping", a.result = me), ae;
  }
  function q(a) {
    var B, W = !1, ie = !1, V, ne, te;
    if (te = a.input.charCodeAt(a.position), te !== 33) return !1;
    if (a.tag !== null && x(a, "duplication of a tag property"), te = a.input.charCodeAt(++a.position), te === 60 ? (W = !0, te = a.input.charCodeAt(++a.position)) : te === 33 ? (ie = !0, V = "!!", te = a.input.charCodeAt(++a.position)) : V = "!", B = a.position, W) {
      do
        te = a.input.charCodeAt(++a.position);
      while (te !== 0 && te !== 62);
      a.position < a.length ? (ne = a.input.slice(B, a.position), te = a.input.charCodeAt(++a.position)) : x(a, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; te !== 0 && !N(te); )
        te === 33 && (ie ? x(a, "tag suffix cannot contain exclamation marks") : (V = a.input.slice(B - 1, a.position + 1), v.test(V) || x(a, "named tag handle cannot contain such characters"), ie = !0, B = a.position + 1)), te = a.input.charCodeAt(++a.position);
      ne = a.input.slice(B, a.position), g.test(ne) && x(a, "tag suffix cannot contain flow indicator characters");
    }
    ne && !p.test(ne) && x(a, "tag name cannot contain such characters: " + ne);
    try {
      ne = decodeURIComponent(ne);
    } catch {
      x(a, "tag name is malformed: " + ne);
    }
    return W ? a.tag = ne : c.call(a.tagMap, V) ? a.tag = a.tagMap[V] + ne : V === "!" ? a.tag = "!" + ne : V === "!!" ? a.tag = "tag:yaml.org,2002:" + ne : x(a, 'undeclared tag handle "' + V + '"'), !0;
  }
  function I(a) {
    var B, W;
    if (W = a.input.charCodeAt(a.position), W !== 38) return !1;
    for (a.anchor !== null && x(a, "duplication of an anchor property"), W = a.input.charCodeAt(++a.position), B = a.position; W !== 0 && !N(W) && !A(W); )
      W = a.input.charCodeAt(++a.position);
    return a.position === B && x(a, "name of an anchor node must contain at least one character"), a.anchor = a.input.slice(B, a.position), !0;
  }
  function Ce(a) {
    var B, W, ie;
    if (ie = a.input.charCodeAt(a.position), ie !== 42) return !1;
    for (ie = a.input.charCodeAt(++a.position), B = a.position; ie !== 0 && !N(ie) && !A(ie); )
      ie = a.input.charCodeAt(++a.position);
    return a.position === B && x(a, "name of an alias node must contain at least one character"), W = a.input.slice(B, a.position), c.call(a.anchorMap, W) || x(a, 'unidentified alias "' + W + '"'), a.result = a.anchorMap[W], ye(a, !0, -1), !0;
  }
  function Ae(a, B, W, ie, V) {
    var ne, te, se, ue = 1, Pe = !1, De = !1, me, C, j, Y, X, J;
    if (a.listener !== null && a.listener("open", a), a.tag = null, a.anchor = null, a.kind = null, a.result = null, ne = te = se = i === W || u === W, ie && ye(a, !0, -1) && (Pe = !0, a.lineIndent > B ? ue = 1 : a.lineIndent === B ? ue = 0 : a.lineIndent < B && (ue = -1)), ue === 1)
      for (; q(a) || I(a); )
        ye(a, !0, -1) ? (Pe = !0, se = ne, a.lineIndent > B ? ue = 1 : a.lineIndent === B ? ue = 0 : a.lineIndent < B && (ue = -1)) : se = !1;
    if (se && (se = Pe || V), (ue === 1 || i === W) && (l === W || e === W ? X = B : X = B + 1, J = a.position - a.lineStart, ue === 1 ? se && (E(a, J) || y(a, J, X)) || Ie(a, X) ? De = !0 : (te && Te(a, X) || be(a, X) || Ne(a, X) ? De = !0 : Ce(a) ? (De = !0, (a.tag !== null || a.anchor !== null) && x(a, "alias node should not have any properties")) : _e(a, X, l === W) && (De = !0, a.tag === null && (a.tag = "?")), a.anchor !== null && (a.anchorMap[a.anchor] = a.result)) : ue === 0 && (De = se && E(a, J))), a.tag === null)
      a.anchor !== null && (a.anchorMap[a.anchor] = a.result);
    else if (a.tag === "?") {
      for (a.result !== null && a.kind !== "scalar" && x(a, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + a.kind + '"'), me = 0, C = a.implicitTypes.length; me < C; me += 1)
        if (Y = a.implicitTypes[me], Y.resolve(a.result)) {
          a.result = Y.construct(a.result), a.tag = Y.tag, a.anchor !== null && (a.anchorMap[a.anchor] = a.result);
          break;
        }
    } else if (a.tag !== "!") {
      if (c.call(a.typeMap[a.kind || "fallback"], a.tag))
        Y = a.typeMap[a.kind || "fallback"][a.tag];
      else
        for (Y = null, j = a.typeMap.multi[a.kind || "fallback"], me = 0, C = j.length; me < C; me += 1)
          if (a.tag.slice(0, j[me].tag.length) === j[me].tag) {
            Y = j[me];
            break;
          }
      Y || x(a, "unknown tag !<" + a.tag + ">"), a.result !== null && Y.kind !== a.kind && x(a, "unacceptable node kind for !<" + a.tag + '> tag; it should be "' + Y.kind + '", not "' + a.kind + '"'), Y.resolve(a.result, a.tag) ? (a.result = Y.construct(a.result, a.tag), a.anchor !== null && (a.anchorMap[a.anchor] = a.result)) : x(a, "cannot resolve a node with !<" + a.tag + "> explicit tag");
    }
    return a.listener !== null && a.listener("close", a), a.tag !== null || a.anchor !== null || De;
  }
  function Fe(a) {
    var B = a.position, W, ie, V, ne = !1, te;
    for (a.version = null, a.checkLineBreaks = a.legacy, a.tagMap = /* @__PURE__ */ Object.create(null), a.anchorMap = /* @__PURE__ */ Object.create(null); (te = a.input.charCodeAt(a.position)) !== 0 && (ye(a, !0, -1), te = a.input.charCodeAt(a.position), !(a.lineIndent > 0 || te !== 37)); ) {
      for (ne = !0, te = a.input.charCodeAt(++a.position), W = a.position; te !== 0 && !N(te); )
        te = a.input.charCodeAt(++a.position);
      for (ie = a.input.slice(W, a.position), V = [], ie.length < 1 && x(a, "directive name must not be less than one character in length"); te !== 0; ) {
        for (; P(te); )
          te = a.input.charCodeAt(++a.position);
        if (te === 35) {
          do
            te = a.input.charCodeAt(++a.position);
          while (te !== 0 && !R(te));
          break;
        }
        if (R(te)) break;
        for (W = a.position; te !== 0 && !N(te); )
          te = a.input.charCodeAt(++a.position);
        V.push(a.input.slice(W, a.position));
      }
      te !== 0 && we(a), c.call(z, ie) ? z[ie](a, ie, V) : G(a, 'unknown document directive "' + ie + '"');
    }
    if (ye(a, !0, -1), a.lineIndent === 0 && a.input.charCodeAt(a.position) === 45 && a.input.charCodeAt(a.position + 1) === 45 && a.input.charCodeAt(a.position + 2) === 45 ? (a.position += 3, ye(a, !0, -1)) : ne && x(a, "directives end mark is expected"), Ae(a, a.lineIndent - 1, i, !1, !0), ye(a, !0, -1), a.checkLineBreaks && d.test(a.input.slice(B, a.position)) && G(a, "non-ASCII line breaks are interpreted as content"), a.documents.push(a.result), a.position === a.lineStart && Q(a)) {
      a.input.charCodeAt(a.position) === 46 && (a.position += 3, ye(a, !0, -1));
      return;
    }
    if (a.position < a.length - 1)
      x(a, "end of the stream or a document separator is expected");
    else
      return;
  }
  function Be(a, B) {
    a = String(a), B = B || {}, a.length !== 0 && (a.charCodeAt(a.length - 1) !== 10 && a.charCodeAt(a.length - 1) !== 13 && (a += `
`), a.charCodeAt(0) === 65279 && (a = a.slice(1)));
    var W = new F(a, B), ie = a.indexOf("\0");
    for (ie !== -1 && (W.position = ie, x(W, "null byte is not allowed in input")), W.input += "\0"; W.input.charCodeAt(W.position) === 32; )
      W.lineIndent += 1, W.position += 1;
    for (; W.position < W.length - 1; )
      Fe(W);
    return W.documents;
  }
  function je(a, B, W) {
    B !== null && typeof B == "object" && typeof W > "u" && (W = B, B = null);
    var ie = Be(a, W);
    if (typeof B != "function")
      return ie;
    for (var V = 0, ne = ie.length; V < ne; V += 1)
      B(ie[V]);
  }
  function Ve(a, B) {
    var W = Be(a, B);
    if (W.length !== 0) {
      if (W.length === 1)
        return W[0];
      throw new h("expected a single document in the stream, but found more");
    }
  }
  return Jr.loadAll = je, Jr.load = Ve, Jr;
}
var _i = {}, po;
function Af() {
  if (po) return _i;
  po = 1;
  var s = Nr(), h = xr(), m = _a(), f = Object.prototype.toString, c = Object.prototype.hasOwnProperty, l = 65279, e = 9, u = 10, i = 13, o = 32, n = 33, t = 34, r = 35, d = 37, g = 38, v = 39, p = 42, w = 44, R = 45, P = 58, N = 61, A = 62, O = 63, b = 64, S = 91, D = 93, _ = 96, k = 123, $ = 124, M = 125, L = {};
  L[0] = "\\0", L[7] = "\\a", L[8] = "\\b", L[9] = "\\t", L[10] = "\\n", L[11] = "\\v", L[12] = "\\f", L[13] = "\\r", L[27] = "\\e", L[34] = '\\"', L[92] = "\\\\", L[133] = "\\N", L[160] = "\\_", L[8232] = "\\L", L[8233] = "\\P";
  var F = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ], H = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function x(C, j) {
    var Y, X, J, ae, re, oe, he;
    if (j === null) return {};
    for (Y = {}, X = Object.keys(j), J = 0, ae = X.length; J < ae; J += 1)
      re = X[J], oe = String(j[re]), re.slice(0, 2) === "!!" && (re = "tag:yaml.org,2002:" + re.slice(2)), he = C.compiledTypeMap.fallback[re], he && c.call(he.styleAliases, oe) && (oe = he.styleAliases[oe]), Y[re] = oe;
    return Y;
  }
  function G(C) {
    var j, Y, X;
    if (j = C.toString(16).toUpperCase(), C <= 255)
      Y = "x", X = 2;
    else if (C <= 65535)
      Y = "u", X = 4;
    else if (C <= 4294967295)
      Y = "U", X = 8;
    else
      throw new h("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + Y + s.repeat("0", X - j.length) + j;
  }
  var z = 1, ee = 2;
  function ge(C) {
    this.schema = C.schema || m, this.indent = Math.max(1, C.indent || 2), this.noArrayIndent = C.noArrayIndent || !1, this.skipInvalid = C.skipInvalid || !1, this.flowLevel = s.isNothing(C.flowLevel) ? -1 : C.flowLevel, this.styleMap = x(this.schema, C.styles || null), this.sortKeys = C.sortKeys || !1, this.lineWidth = C.lineWidth || 80, this.noRefs = C.noRefs || !1, this.noCompatMode = C.noCompatMode || !1, this.condenseFlow = C.condenseFlow || !1, this.quotingType = C.quotingType === '"' ? ee : z, this.forceQuotes = C.forceQuotes || !1, this.replacer = typeof C.replacer == "function" ? C.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function Z(C, j) {
    for (var Y = s.repeat(" ", j), X = 0, J = -1, ae = "", re, oe = C.length; X < oe; )
      J = C.indexOf(`
`, X), J === -1 ? (re = C.slice(X), X = oe) : (re = C.slice(X, J + 1), X = J + 1), re.length && re !== `
` && (ae += Y), ae += re;
    return ae;
  }
  function we(C, j) {
    return `
` + s.repeat(" ", C.indent * j);
  }
  function ye(C, j) {
    var Y, X, J;
    for (Y = 0, X = C.implicitTypes.length; Y < X; Y += 1)
      if (J = C.implicitTypes[Y], J.resolve(j))
        return !0;
    return !1;
  }
  function Q(C) {
    return C === o || C === e;
  }
  function de(C) {
    return 32 <= C && C <= 126 || 161 <= C && C <= 55295 && C !== 8232 && C !== 8233 || 57344 <= C && C <= 65533 && C !== l || 65536 <= C && C <= 1114111;
  }
  function _e(C) {
    return de(C) && C !== l && C !== i && C !== u;
  }
  function be(C, j, Y) {
    var X = _e(C), J = X && !Q(C);
    return (
      // ns-plain-safe
      (Y ? (
        // c = flow-in
        X
      ) : X && C !== w && C !== S && C !== D && C !== k && C !== M) && C !== r && !(j === P && !J) || _e(j) && !Q(j) && C === r || j === P && J
    );
  }
  function Ne(C) {
    return de(C) && C !== l && !Q(C) && C !== R && C !== O && C !== P && C !== w && C !== S && C !== D && C !== k && C !== M && C !== r && C !== g && C !== p && C !== n && C !== $ && C !== N && C !== A && C !== v && C !== t && C !== d && C !== b && C !== _;
  }
  function Ie(C) {
    return !Q(C) && C !== P;
  }
  function Te(C, j) {
    var Y = C.charCodeAt(j), X;
    return Y >= 55296 && Y <= 56319 && j + 1 < C.length && (X = C.charCodeAt(j + 1), X >= 56320 && X <= 57343) ? (Y - 55296) * 1024 + X - 56320 + 65536 : Y;
  }
  function E(C) {
    var j = /^\n* /;
    return j.test(C);
  }
  var y = 1, q = 2, I = 3, Ce = 4, Ae = 5;
  function Fe(C, j, Y, X, J, ae, re, oe) {
    var he, Ee = 0, xe = null, qe = !1, Oe = !1, jt = X !== -1, at = -1, bt = Ne(Te(C, 0)) && Ie(Te(C, C.length - 1));
    if (j || re)
      for (he = 0; he < C.length; Ee >= 65536 ? he += 2 : he++) {
        if (Ee = Te(C, he), !de(Ee))
          return Ae;
        bt = bt && be(Ee, xe, oe), xe = Ee;
      }
    else {
      for (he = 0; he < C.length; Ee >= 65536 ? he += 2 : he++) {
        if (Ee = Te(C, he), Ee === u)
          qe = !0, jt && (Oe = Oe || // Foldable line = too long, and not more-indented.
          he - at - 1 > X && C[at + 1] !== " ", at = he);
        else if (!de(Ee))
          return Ae;
        bt = bt && be(Ee, xe, oe), xe = Ee;
      }
      Oe = Oe || jt && he - at - 1 > X && C[at + 1] !== " ";
    }
    return !qe && !Oe ? bt && !re && !J(C) ? y : ae === ee ? Ae : q : Y > 9 && E(C) ? Ae : re ? ae === ee ? Ae : q : Oe ? Ce : I;
  }
  function Be(C, j, Y, X, J) {
    C.dump = (function() {
      if (j.length === 0)
        return C.quotingType === ee ? '""' : "''";
      if (!C.noCompatMode && (F.indexOf(j) !== -1 || H.test(j)))
        return C.quotingType === ee ? '"' + j + '"' : "'" + j + "'";
      var ae = C.indent * Math.max(1, Y), re = C.lineWidth === -1 ? -1 : Math.max(Math.min(C.lineWidth, 40), C.lineWidth - ae), oe = X || C.flowLevel > -1 && Y >= C.flowLevel;
      function he(Ee) {
        return ye(C, Ee);
      }
      switch (Fe(
        j,
        oe,
        C.indent,
        re,
        he,
        C.quotingType,
        C.forceQuotes && !X,
        J
      )) {
        case y:
          return j;
        case q:
          return "'" + j.replace(/'/g, "''") + "'";
        case I:
          return "|" + je(j, C.indent) + Ve(Z(j, ae));
        case Ce:
          return ">" + je(j, C.indent) + Ve(Z(a(j, re), ae));
        case Ae:
          return '"' + W(j) + '"';
        default:
          throw new h("impossible error: invalid scalar style");
      }
    })();
  }
  function je(C, j) {
    var Y = E(C) ? String(j) : "", X = C[C.length - 1] === `
`, J = X && (C[C.length - 2] === `
` || C === `
`), ae = J ? "+" : X ? "" : "-";
    return Y + ae + `
`;
  }
  function Ve(C) {
    return C[C.length - 1] === `
` ? C.slice(0, -1) : C;
  }
  function a(C, j) {
    for (var Y = /(\n+)([^\n]*)/g, X = (function() {
      var Ee = C.indexOf(`
`);
      return Ee = Ee !== -1 ? Ee : C.length, Y.lastIndex = Ee, B(C.slice(0, Ee), j);
    })(), J = C[0] === `
` || C[0] === " ", ae, re; re = Y.exec(C); ) {
      var oe = re[1], he = re[2];
      ae = he[0] === " ", X += oe + (!J && !ae && he !== "" ? `
` : "") + B(he, j), J = ae;
    }
    return X;
  }
  function B(C, j) {
    if (C === "" || C[0] === " ") return C;
    for (var Y = / [^ ]/g, X, J = 0, ae, re = 0, oe = 0, he = ""; X = Y.exec(C); )
      oe = X.index, oe - J > j && (ae = re > J ? re : oe, he += `
` + C.slice(J, ae), J = ae + 1), re = oe;
    return he += `
`, C.length - J > j && re > J ? he += C.slice(J, re) + `
` + C.slice(re + 1) : he += C.slice(J), he.slice(1);
  }
  function W(C) {
    for (var j = "", Y = 0, X, J = 0; J < C.length; Y >= 65536 ? J += 2 : J++)
      Y = Te(C, J), X = L[Y], !X && de(Y) ? (j += C[J], Y >= 65536 && (j += C[J + 1])) : j += X || G(Y);
    return j;
  }
  function ie(C, j, Y) {
    var X = "", J = C.tag, ae, re, oe;
    for (ae = 0, re = Y.length; ae < re; ae += 1)
      oe = Y[ae], C.replacer && (oe = C.replacer.call(Y, String(ae), oe)), (ue(C, j, oe, !1, !1) || typeof oe > "u" && ue(C, j, null, !1, !1)) && (X !== "" && (X += "," + (C.condenseFlow ? "" : " ")), X += C.dump);
    C.tag = J, C.dump = "[" + X + "]";
  }
  function V(C, j, Y, X) {
    var J = "", ae = C.tag, re, oe, he;
    for (re = 0, oe = Y.length; re < oe; re += 1)
      he = Y[re], C.replacer && (he = C.replacer.call(Y, String(re), he)), (ue(C, j + 1, he, !0, !0, !1, !0) || typeof he > "u" && ue(C, j + 1, null, !0, !0, !1, !0)) && ((!X || J !== "") && (J += we(C, j)), C.dump && u === C.dump.charCodeAt(0) ? J += "-" : J += "- ", J += C.dump);
    C.tag = ae, C.dump = J || "[]";
  }
  function ne(C, j, Y) {
    var X = "", J = C.tag, ae = Object.keys(Y), re, oe, he, Ee, xe;
    for (re = 0, oe = ae.length; re < oe; re += 1)
      xe = "", X !== "" && (xe += ", "), C.condenseFlow && (xe += '"'), he = ae[re], Ee = Y[he], C.replacer && (Ee = C.replacer.call(Y, he, Ee)), ue(C, j, he, !1, !1) && (C.dump.length > 1024 && (xe += "? "), xe += C.dump + (C.condenseFlow ? '"' : "") + ":" + (C.condenseFlow ? "" : " "), ue(C, j, Ee, !1, !1) && (xe += C.dump, X += xe));
    C.tag = J, C.dump = "{" + X + "}";
  }
  function te(C, j, Y, X) {
    var J = "", ae = C.tag, re = Object.keys(Y), oe, he, Ee, xe, qe, Oe;
    if (C.sortKeys === !0)
      re.sort();
    else if (typeof C.sortKeys == "function")
      re.sort(C.sortKeys);
    else if (C.sortKeys)
      throw new h("sortKeys must be a boolean or a function");
    for (oe = 0, he = re.length; oe < he; oe += 1)
      Oe = "", (!X || J !== "") && (Oe += we(C, j)), Ee = re[oe], xe = Y[Ee], C.replacer && (xe = C.replacer.call(Y, Ee, xe)), ue(C, j + 1, Ee, !0, !0, !0) && (qe = C.tag !== null && C.tag !== "?" || C.dump && C.dump.length > 1024, qe && (C.dump && u === C.dump.charCodeAt(0) ? Oe += "?" : Oe += "? "), Oe += C.dump, qe && (Oe += we(C, j)), ue(C, j + 1, xe, !0, qe) && (C.dump && u === C.dump.charCodeAt(0) ? Oe += ":" : Oe += ": ", Oe += C.dump, J += Oe));
    C.tag = ae, C.dump = J || "{}";
  }
  function se(C, j, Y) {
    var X, J, ae, re, oe, he;
    for (J = Y ? C.explicitTypes : C.implicitTypes, ae = 0, re = J.length; ae < re; ae += 1)
      if (oe = J[ae], (oe.instanceOf || oe.predicate) && (!oe.instanceOf || typeof j == "object" && j instanceof oe.instanceOf) && (!oe.predicate || oe.predicate(j))) {
        if (Y ? oe.multi && oe.representName ? C.tag = oe.representName(j) : C.tag = oe.tag : C.tag = "?", oe.represent) {
          if (he = C.styleMap[oe.tag] || oe.defaultStyle, f.call(oe.represent) === "[object Function]")
            X = oe.represent(j, he);
          else if (c.call(oe.represent, he))
            X = oe.represent[he](j, he);
          else
            throw new h("!<" + oe.tag + '> tag resolver accepts not "' + he + '" style');
          C.dump = X;
        }
        return !0;
      }
    return !1;
  }
  function ue(C, j, Y, X, J, ae, re) {
    C.tag = null, C.dump = Y, se(C, Y, !1) || se(C, Y, !0);
    var oe = f.call(C.dump), he = X, Ee;
    X && (X = C.flowLevel < 0 || C.flowLevel > j);
    var xe = oe === "[object Object]" || oe === "[object Array]", qe, Oe;
    if (xe && (qe = C.duplicates.indexOf(Y), Oe = qe !== -1), (C.tag !== null && C.tag !== "?" || Oe || C.indent !== 2 && j > 0) && (J = !1), Oe && C.usedDuplicates[qe])
      C.dump = "*ref_" + qe;
    else {
      if (xe && Oe && !C.usedDuplicates[qe] && (C.usedDuplicates[qe] = !0), oe === "[object Object]")
        X && Object.keys(C.dump).length !== 0 ? (te(C, j, C.dump, J), Oe && (C.dump = "&ref_" + qe + C.dump)) : (ne(C, j, C.dump), Oe && (C.dump = "&ref_" + qe + " " + C.dump));
      else if (oe === "[object Array]")
        X && C.dump.length !== 0 ? (C.noArrayIndent && !re && j > 0 ? V(C, j - 1, C.dump, J) : V(C, j, C.dump, J), Oe && (C.dump = "&ref_" + qe + C.dump)) : (ie(C, j, C.dump), Oe && (C.dump = "&ref_" + qe + " " + C.dump));
      else if (oe === "[object String]")
        C.tag !== "?" && Be(C, C.dump, j, ae, he);
      else {
        if (oe === "[object Undefined]")
          return !1;
        if (C.skipInvalid) return !1;
        throw new h("unacceptable kind of an object to dump " + oe);
      }
      C.tag !== null && C.tag !== "?" && (Ee = encodeURI(
        C.tag[0] === "!" ? C.tag.slice(1) : C.tag
      ).replace(/!/g, "%21"), C.tag[0] === "!" ? Ee = "!" + Ee : Ee.slice(0, 18) === "tag:yaml.org,2002:" ? Ee = "!!" + Ee.slice(18) : Ee = "!<" + Ee + ">", C.dump = Ee + " " + C.dump);
    }
    return !0;
  }
  function Pe(C, j) {
    var Y = [], X = [], J, ae;
    for (De(C, Y, X), J = 0, ae = X.length; J < ae; J += 1)
      j.duplicates.push(Y[X[J]]);
    j.usedDuplicates = new Array(ae);
  }
  function De(C, j, Y) {
    var X, J, ae;
    if (C !== null && typeof C == "object")
      if (J = j.indexOf(C), J !== -1)
        Y.indexOf(J) === -1 && Y.push(J);
      else if (j.push(C), Array.isArray(C))
        for (J = 0, ae = C.length; J < ae; J += 1)
          De(C[J], j, Y);
      else
        for (X = Object.keys(C), J = 0, ae = X.length; J < ae; J += 1)
          De(C[X[J]], j, Y);
  }
  function me(C, j) {
    j = j || {};
    var Y = new ge(j);
    Y.noRefs || Pe(C, Y);
    var X = C;
    return Y.replacer && (X = Y.replacer.call({ "": X }, "", X)), ue(Y, 0, X, !0, !0) ? Y.dump + `
` : "";
  }
  return _i.dump = me, _i;
}
var mo;
function Sa() {
  if (mo) return Xe;
  mo = 1;
  var s = Cf(), h = Af();
  function m(f, c) {
    return function() {
      throw new Error("Function yaml." + f + " is removed in js-yaml 4. Use yaml." + c + " instead, which is now safe by default.");
    };
  }
  return Xe.Type = Je(), Xe.Schema = iu(), Xe.FAILSAFE_SCHEMA = lu(), Xe.JSON_SCHEMA = hu(), Xe.CORE_SCHEMA = pu(), Xe.DEFAULT_SCHEMA = _a(), Xe.load = s.load, Xe.loadAll = s.loadAll, Xe.dump = h.dump, Xe.YAMLException = xr(), Xe.types = {
    binary: yu(),
    float: du(),
    map: ou(),
    null: uu(),
    pairs: Eu(),
    set: wu(),
    timestamp: mu(),
    bool: cu(),
    int: fu(),
    merge: gu(),
    omap: vu(),
    seq: su(),
    str: au()
  }, Xe.safeLoad = m("safeLoad", "load"), Xe.safeLoadAll = m("safeLoadAll", "loadAll"), Xe.safeDump = m("safeDump", "dump"), Xe;
}
var lr = {}, go;
function Tf() {
  if (go) return lr;
  go = 1, Object.defineProperty(lr, "__esModule", { value: !0 }), lr.Lazy = void 0;
  class s {
    constructor(m) {
      this._value = null, this.creator = m;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const m = this.creator();
      return this.value = m, m;
    }
    set value(m) {
      this._value = m, this.creator = null;
    }
  }
  return lr.Lazy = s, lr;
}
var Kr = { exports: {} }, Si, yo;
function on() {
  if (yo) return Si;
  yo = 1;
  const s = "2.0.0", h = 256, m = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, f = 16, c = h - 6;
  return Si = {
    MAX_LENGTH: h,
    MAX_SAFE_COMPONENT_LENGTH: f,
    MAX_SAFE_BUILD_LENGTH: c,
    MAX_SAFE_INTEGER: m,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: s,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, Si;
}
var Ri, vo;
function ln() {
  return vo || (vo = 1, Ri = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...h) => console.error("SEMVER", ...h) : () => {
  }), Ri;
}
var Eo;
function Fr() {
  return Eo || (Eo = 1, (function(s, h) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: m,
      MAX_SAFE_BUILD_LENGTH: f,
      MAX_LENGTH: c
    } = on(), l = ln();
    h = s.exports = {};
    const e = h.re = [], u = h.safeRe = [], i = h.src = [], o = h.safeSrc = [], n = h.t = {};
    let t = 0;
    const r = "[a-zA-Z0-9-]", d = [
      ["\\s", 1],
      ["\\d", c],
      [r, f]
    ], g = (p) => {
      for (const [w, R] of d)
        p = p.split(`${w}*`).join(`${w}{0,${R}}`).split(`${w}+`).join(`${w}{1,${R}}`);
      return p;
    }, v = (p, w, R) => {
      const P = g(w), N = t++;
      l(p, N, w), n[p] = N, i[N] = w, o[N] = P, e[N] = new RegExp(w, R ? "g" : void 0), u[N] = new RegExp(P, R ? "g" : void 0);
    };
    v("NUMERICIDENTIFIER", "0|[1-9]\\d*"), v("NUMERICIDENTIFIERLOOSE", "\\d+"), v("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${r}*`), v("MAINVERSION", `(${i[n.NUMERICIDENTIFIER]})\\.(${i[n.NUMERICIDENTIFIER]})\\.(${i[n.NUMERICIDENTIFIER]})`), v("MAINVERSIONLOOSE", `(${i[n.NUMERICIDENTIFIERLOOSE]})\\.(${i[n.NUMERICIDENTIFIERLOOSE]})\\.(${i[n.NUMERICIDENTIFIERLOOSE]})`), v("PRERELEASEIDENTIFIER", `(?:${i[n.NONNUMERICIDENTIFIER]}|${i[n.NUMERICIDENTIFIER]})`), v("PRERELEASEIDENTIFIERLOOSE", `(?:${i[n.NONNUMERICIDENTIFIER]}|${i[n.NUMERICIDENTIFIERLOOSE]})`), v("PRERELEASE", `(?:-(${i[n.PRERELEASEIDENTIFIER]}(?:\\.${i[n.PRERELEASEIDENTIFIER]})*))`), v("PRERELEASELOOSE", `(?:-?(${i[n.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${i[n.PRERELEASEIDENTIFIERLOOSE]})*))`), v("BUILDIDENTIFIER", `${r}+`), v("BUILD", `(?:\\+(${i[n.BUILDIDENTIFIER]}(?:\\.${i[n.BUILDIDENTIFIER]})*))`), v("FULLPLAIN", `v?${i[n.MAINVERSION]}${i[n.PRERELEASE]}?${i[n.BUILD]}?`), v("FULL", `^${i[n.FULLPLAIN]}$`), v("LOOSEPLAIN", `[v=\\s]*${i[n.MAINVERSIONLOOSE]}${i[n.PRERELEASELOOSE]}?${i[n.BUILD]}?`), v("LOOSE", `^${i[n.LOOSEPLAIN]}$`), v("GTLT", "((?:<|>)?=?)"), v("XRANGEIDENTIFIERLOOSE", `${i[n.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), v("XRANGEIDENTIFIER", `${i[n.NUMERICIDENTIFIER]}|x|X|\\*`), v("XRANGEPLAIN", `[v=\\s]*(${i[n.XRANGEIDENTIFIER]})(?:\\.(${i[n.XRANGEIDENTIFIER]})(?:\\.(${i[n.XRANGEIDENTIFIER]})(?:${i[n.PRERELEASE]})?${i[n.BUILD]}?)?)?`), v("XRANGEPLAINLOOSE", `[v=\\s]*(${i[n.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[n.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[n.XRANGEIDENTIFIERLOOSE]})(?:${i[n.PRERELEASELOOSE]})?${i[n.BUILD]}?)?)?`), v("XRANGE", `^${i[n.GTLT]}\\s*${i[n.XRANGEPLAIN]}$`), v("XRANGELOOSE", `^${i[n.GTLT]}\\s*${i[n.XRANGEPLAINLOOSE]}$`), v("COERCEPLAIN", `(^|[^\\d])(\\d{1,${m}})(?:\\.(\\d{1,${m}}))?(?:\\.(\\d{1,${m}}))?`), v("COERCE", `${i[n.COERCEPLAIN]}(?:$|[^\\d])`), v("COERCEFULL", i[n.COERCEPLAIN] + `(?:${i[n.PRERELEASE]})?(?:${i[n.BUILD]})?(?:$|[^\\d])`), v("COERCERTL", i[n.COERCE], !0), v("COERCERTLFULL", i[n.COERCEFULL], !0), v("LONETILDE", "(?:~>?)"), v("TILDETRIM", `(\\s*)${i[n.LONETILDE]}\\s+`, !0), h.tildeTrimReplace = "$1~", v("TILDE", `^${i[n.LONETILDE]}${i[n.XRANGEPLAIN]}$`), v("TILDELOOSE", `^${i[n.LONETILDE]}${i[n.XRANGEPLAINLOOSE]}$`), v("LONECARET", "(?:\\^)"), v("CARETTRIM", `(\\s*)${i[n.LONECARET]}\\s+`, !0), h.caretTrimReplace = "$1^", v("CARET", `^${i[n.LONECARET]}${i[n.XRANGEPLAIN]}$`), v("CARETLOOSE", `^${i[n.LONECARET]}${i[n.XRANGEPLAINLOOSE]}$`), v("COMPARATORLOOSE", `^${i[n.GTLT]}\\s*(${i[n.LOOSEPLAIN]})$|^$`), v("COMPARATOR", `^${i[n.GTLT]}\\s*(${i[n.FULLPLAIN]})$|^$`), v("COMPARATORTRIM", `(\\s*)${i[n.GTLT]}\\s*(${i[n.LOOSEPLAIN]}|${i[n.XRANGEPLAIN]})`, !0), h.comparatorTrimReplace = "$1$2$3", v("HYPHENRANGE", `^\\s*(${i[n.XRANGEPLAIN]})\\s+-\\s+(${i[n.XRANGEPLAIN]})\\s*$`), v("HYPHENRANGELOOSE", `^\\s*(${i[n.XRANGEPLAINLOOSE]})\\s+-\\s+(${i[n.XRANGEPLAINLOOSE]})\\s*$`), v("STAR", "(<|>)?=?\\s*\\*"), v("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), v("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(Kr, Kr.exports)), Kr.exports;
}
var Ci, wo;
function Ra() {
  if (wo) return Ci;
  wo = 1;
  const s = Object.freeze({ loose: !0 }), h = Object.freeze({});
  return Ci = (f) => f ? typeof f != "object" ? s : f : h, Ci;
}
var Ai, _o;
function _u() {
  if (_o) return Ai;
  _o = 1;
  const s = /^[0-9]+$/, h = (f, c) => {
    if (typeof f == "number" && typeof c == "number")
      return f === c ? 0 : f < c ? -1 : 1;
    const l = s.test(f), e = s.test(c);
    return l && e && (f = +f, c = +c), f === c ? 0 : l && !e ? -1 : e && !l ? 1 : f < c ? -1 : 1;
  };
  return Ai = {
    compareIdentifiers: h,
    rcompareIdentifiers: (f, c) => h(c, f)
  }, Ai;
}
var Ti, So;
function Ke() {
  if (So) return Ti;
  So = 1;
  const s = ln(), { MAX_LENGTH: h, MAX_SAFE_INTEGER: m } = on(), { safeRe: f, t: c } = Fr(), l = Ra(), { compareIdentifiers: e } = _u();
  class u {
    constructor(o, n) {
      if (n = l(n), o instanceof u) {
        if (o.loose === !!n.loose && o.includePrerelease === !!n.includePrerelease)
          return o;
        o = o.version;
      } else if (typeof o != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof o}".`);
      if (o.length > h)
        throw new TypeError(
          `version is longer than ${h} characters`
        );
      s("SemVer", o, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
      const t = o.trim().match(n.loose ? f[c.LOOSE] : f[c.FULL]);
      if (!t)
        throw new TypeError(`Invalid Version: ${o}`);
      if (this.raw = o, this.major = +t[1], this.minor = +t[2], this.patch = +t[3], this.major > m || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > m || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > m || this.patch < 0)
        throw new TypeError("Invalid patch version");
      t[4] ? this.prerelease = t[4].split(".").map((r) => {
        if (/^[0-9]+$/.test(r)) {
          const d = +r;
          if (d >= 0 && d < m)
            return d;
        }
        return r;
      }) : this.prerelease = [], this.build = t[5] ? t[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(o) {
      if (s("SemVer.compare", this.version, this.options, o), !(o instanceof u)) {
        if (typeof o == "string" && o === this.version)
          return 0;
        o = new u(o, this.options);
      }
      return o.version === this.version ? 0 : this.compareMain(o) || this.comparePre(o);
    }
    compareMain(o) {
      return o instanceof u || (o = new u(o, this.options)), this.major < o.major ? -1 : this.major > o.major ? 1 : this.minor < o.minor ? -1 : this.minor > o.minor ? 1 : this.patch < o.patch ? -1 : this.patch > o.patch ? 1 : 0;
    }
    comparePre(o) {
      if (o instanceof u || (o = new u(o, this.options)), this.prerelease.length && !o.prerelease.length)
        return -1;
      if (!this.prerelease.length && o.prerelease.length)
        return 1;
      if (!this.prerelease.length && !o.prerelease.length)
        return 0;
      let n = 0;
      do {
        const t = this.prerelease[n], r = o.prerelease[n];
        if (s("prerelease compare", n, t, r), t === void 0 && r === void 0)
          return 0;
        if (r === void 0)
          return 1;
        if (t === void 0)
          return -1;
        if (t === r)
          continue;
        return e(t, r);
      } while (++n);
    }
    compareBuild(o) {
      o instanceof u || (o = new u(o, this.options));
      let n = 0;
      do {
        const t = this.build[n], r = o.build[n];
        if (s("build compare", n, t, r), t === void 0 && r === void 0)
          return 0;
        if (r === void 0)
          return 1;
        if (t === void 0)
          return -1;
        if (t === r)
          continue;
        return e(t, r);
      } while (++n);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(o, n, t) {
      if (o.startsWith("pre")) {
        if (!n && t === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (n) {
          const r = `-${n}`.match(this.options.loose ? f[c.PRERELEASELOOSE] : f[c.PRERELEASE]);
          if (!r || r[1] !== n)
            throw new Error(`invalid identifier: ${n}`);
        }
      }
      switch (o) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", n, t);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", n, t);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", n, t), this.inc("pre", n, t);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", n, t), this.inc("pre", n, t);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const r = Number(t) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [r];
          else {
            let d = this.prerelease.length;
            for (; --d >= 0; )
              typeof this.prerelease[d] == "number" && (this.prerelease[d]++, d = -2);
            if (d === -1) {
              if (n === this.prerelease.join(".") && t === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(r);
            }
          }
          if (n) {
            let d = [n, r];
            t === !1 && (d = [n]), e(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = d) : this.prerelease = d;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${o}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return Ti = u, Ti;
}
var bi, Ro;
function Zt() {
  if (Ro) return bi;
  Ro = 1;
  const s = Ke();
  return bi = (m, f, c = !1) => {
    if (m instanceof s)
      return m;
    try {
      return new s(m, f);
    } catch (l) {
      if (!c)
        return null;
      throw l;
    }
  }, bi;
}
var Pi, Co;
function bf() {
  if (Co) return Pi;
  Co = 1;
  const s = Zt();
  return Pi = (m, f) => {
    const c = s(m, f);
    return c ? c.version : null;
  }, Pi;
}
var Di, Ao;
function Pf() {
  if (Ao) return Di;
  Ao = 1;
  const s = Zt();
  return Di = (m, f) => {
    const c = s(m.trim().replace(/^[=v]+/, ""), f);
    return c ? c.version : null;
  }, Di;
}
var Oi, To;
function Df() {
  if (To) return Oi;
  To = 1;
  const s = Ke();
  return Oi = (m, f, c, l, e) => {
    typeof c == "string" && (e = l, l = c, c = void 0);
    try {
      return new s(
        m instanceof s ? m.version : m,
        c
      ).inc(f, l, e).version;
    } catch {
      return null;
    }
  }, Oi;
}
var Ii, bo;
function Of() {
  if (bo) return Ii;
  bo = 1;
  const s = Zt();
  return Ii = (m, f) => {
    const c = s(m, null, !0), l = s(f, null, !0), e = c.compare(l);
    if (e === 0)
      return null;
    const u = e > 0, i = u ? c : l, o = u ? l : c, n = !!i.prerelease.length;
    if (!!o.prerelease.length && !n) {
      if (!o.patch && !o.minor)
        return "major";
      if (o.compareMain(i) === 0)
        return o.minor && !o.patch ? "minor" : "patch";
    }
    const r = n ? "pre" : "";
    return c.major !== l.major ? r + "major" : c.minor !== l.minor ? r + "minor" : c.patch !== l.patch ? r + "patch" : "prerelease";
  }, Ii;
}
var Ni, Po;
function If() {
  if (Po) return Ni;
  Po = 1;
  const s = Ke();
  return Ni = (m, f) => new s(m, f).major, Ni;
}
var xi, Do;
function Nf() {
  if (Do) return xi;
  Do = 1;
  const s = Ke();
  return xi = (m, f) => new s(m, f).minor, xi;
}
var Fi, Oo;
function xf() {
  if (Oo) return Fi;
  Oo = 1;
  const s = Ke();
  return Fi = (m, f) => new s(m, f).patch, Fi;
}
var Li, Io;
function Ff() {
  if (Io) return Li;
  Io = 1;
  const s = Zt();
  return Li = (m, f) => {
    const c = s(m, f);
    return c && c.prerelease.length ? c.prerelease : null;
  }, Li;
}
var Ui, No;
function lt() {
  if (No) return Ui;
  No = 1;
  const s = Ke();
  return Ui = (m, f, c) => new s(m, c).compare(new s(f, c)), Ui;
}
var $i, xo;
function Lf() {
  if (xo) return $i;
  xo = 1;
  const s = lt();
  return $i = (m, f, c) => s(f, m, c), $i;
}
var ki, Fo;
function Uf() {
  if (Fo) return ki;
  Fo = 1;
  const s = lt();
  return ki = (m, f) => s(m, f, !0), ki;
}
var qi, Lo;
function Ca() {
  if (Lo) return qi;
  Lo = 1;
  const s = Ke();
  return qi = (m, f, c) => {
    const l = new s(m, c), e = new s(f, c);
    return l.compare(e) || l.compareBuild(e);
  }, qi;
}
var Mi, Uo;
function $f() {
  if (Uo) return Mi;
  Uo = 1;
  const s = Ca();
  return Mi = (m, f) => m.sort((c, l) => s(c, l, f)), Mi;
}
var Bi, $o;
function kf() {
  if ($o) return Bi;
  $o = 1;
  const s = Ca();
  return Bi = (m, f) => m.sort((c, l) => s(l, c, f)), Bi;
}
var ji, ko;
function un() {
  if (ko) return ji;
  ko = 1;
  const s = lt();
  return ji = (m, f, c) => s(m, f, c) > 0, ji;
}
var Hi, qo;
function Aa() {
  if (qo) return Hi;
  qo = 1;
  const s = lt();
  return Hi = (m, f, c) => s(m, f, c) < 0, Hi;
}
var Gi, Mo;
function Su() {
  if (Mo) return Gi;
  Mo = 1;
  const s = lt();
  return Gi = (m, f, c) => s(m, f, c) === 0, Gi;
}
var Wi, Bo;
function Ru() {
  if (Bo) return Wi;
  Bo = 1;
  const s = lt();
  return Wi = (m, f, c) => s(m, f, c) !== 0, Wi;
}
var Vi, jo;
function Ta() {
  if (jo) return Vi;
  jo = 1;
  const s = lt();
  return Vi = (m, f, c) => s(m, f, c) >= 0, Vi;
}
var zi, Ho;
function ba() {
  if (Ho) return zi;
  Ho = 1;
  const s = lt();
  return zi = (m, f, c) => s(m, f, c) <= 0, zi;
}
var Yi, Go;
function Cu() {
  if (Go) return Yi;
  Go = 1;
  const s = Su(), h = Ru(), m = un(), f = Ta(), c = Aa(), l = ba();
  return Yi = (u, i, o, n) => {
    switch (i) {
      case "===":
        return typeof u == "object" && (u = u.version), typeof o == "object" && (o = o.version), u === o;
      case "!==":
        return typeof u == "object" && (u = u.version), typeof o == "object" && (o = o.version), u !== o;
      case "":
      case "=":
      case "==":
        return s(u, o, n);
      case "!=":
        return h(u, o, n);
      case ">":
        return m(u, o, n);
      case ">=":
        return f(u, o, n);
      case "<":
        return c(u, o, n);
      case "<=":
        return l(u, o, n);
      default:
        throw new TypeError(`Invalid operator: ${i}`);
    }
  }, Yi;
}
var Xi, Wo;
function qf() {
  if (Wo) return Xi;
  Wo = 1;
  const s = Ke(), h = Zt(), { safeRe: m, t: f } = Fr();
  return Xi = (l, e) => {
    if (l instanceof s)
      return l;
    if (typeof l == "number" && (l = String(l)), typeof l != "string")
      return null;
    e = e || {};
    let u = null;
    if (!e.rtl)
      u = l.match(e.includePrerelease ? m[f.COERCEFULL] : m[f.COERCE]);
    else {
      const d = e.includePrerelease ? m[f.COERCERTLFULL] : m[f.COERCERTL];
      let g;
      for (; (g = d.exec(l)) && (!u || u.index + u[0].length !== l.length); )
        (!u || g.index + g[0].length !== u.index + u[0].length) && (u = g), d.lastIndex = g.index + g[1].length + g[2].length;
      d.lastIndex = -1;
    }
    if (u === null)
      return null;
    const i = u[2], o = u[3] || "0", n = u[4] || "0", t = e.includePrerelease && u[5] ? `-${u[5]}` : "", r = e.includePrerelease && u[6] ? `+${u[6]}` : "";
    return h(`${i}.${o}.${n}${t}${r}`, e);
  }, Xi;
}
var Ji, Vo;
function Mf() {
  if (Vo) return Ji;
  Vo = 1;
  class s {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(m) {
      const f = this.map.get(m);
      if (f !== void 0)
        return this.map.delete(m), this.map.set(m, f), f;
    }
    delete(m) {
      return this.map.delete(m);
    }
    set(m, f) {
      if (!this.delete(m) && f !== void 0) {
        if (this.map.size >= this.max) {
          const l = this.map.keys().next().value;
          this.delete(l);
        }
        this.map.set(m, f);
      }
      return this;
    }
  }
  return Ji = s, Ji;
}
var Ki, zo;
function ut() {
  if (zo) return Ki;
  zo = 1;
  const s = /\s+/g;
  class h {
    constructor(F, H) {
      if (H = c(H), F instanceof h)
        return F.loose === !!H.loose && F.includePrerelease === !!H.includePrerelease ? F : new h(F.raw, H);
      if (F instanceof l)
        return this.raw = F.value, this.set = [[F]], this.formatted = void 0, this;
      if (this.options = H, this.loose = !!H.loose, this.includePrerelease = !!H.includePrerelease, this.raw = F.trim().replace(s, " "), this.set = this.raw.split("||").map((x) => this.parseRange(x.trim())).filter((x) => x.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const x = this.set[0];
        if (this.set = this.set.filter((G) => !v(G[0])), this.set.length === 0)
          this.set = [x];
        else if (this.set.length > 1) {
          for (const G of this.set)
            if (G.length === 1 && p(G[0])) {
              this.set = [G];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let F = 0; F < this.set.length; F++) {
          F > 0 && (this.formatted += "||");
          const H = this.set[F];
          for (let x = 0; x < H.length; x++)
            x > 0 && (this.formatted += " "), this.formatted += H[x].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(F) {
      const x = ((this.options.includePrerelease && d) | (this.options.loose && g)) + ":" + F, G = f.get(x);
      if (G)
        return G;
      const z = this.options.loose, ee = z ? i[o.HYPHENRANGELOOSE] : i[o.HYPHENRANGE];
      F = F.replace(ee, $(this.options.includePrerelease)), e("hyphen replace", F), F = F.replace(i[o.COMPARATORTRIM], n), e("comparator trim", F), F = F.replace(i[o.TILDETRIM], t), e("tilde trim", F), F = F.replace(i[o.CARETTRIM], r), e("caret trim", F);
      let ge = F.split(" ").map((Q) => R(Q, this.options)).join(" ").split(/\s+/).map((Q) => k(Q, this.options));
      z && (ge = ge.filter((Q) => (e("loose invalid filter", Q, this.options), !!Q.match(i[o.COMPARATORLOOSE])))), e("range list", ge);
      const Z = /* @__PURE__ */ new Map(), we = ge.map((Q) => new l(Q, this.options));
      for (const Q of we) {
        if (v(Q))
          return [Q];
        Z.set(Q.value, Q);
      }
      Z.size > 1 && Z.has("") && Z.delete("");
      const ye = [...Z.values()];
      return f.set(x, ye), ye;
    }
    intersects(F, H) {
      if (!(F instanceof h))
        throw new TypeError("a Range is required");
      return this.set.some((x) => w(x, H) && F.set.some((G) => w(G, H) && x.every((z) => G.every((ee) => z.intersects(ee, H)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(F) {
      if (!F)
        return !1;
      if (typeof F == "string")
        try {
          F = new u(F, this.options);
        } catch {
          return !1;
        }
      for (let H = 0; H < this.set.length; H++)
        if (M(this.set[H], F, this.options))
          return !0;
      return !1;
    }
  }
  Ki = h;
  const m = Mf(), f = new m(), c = Ra(), l = cn(), e = ln(), u = Ke(), {
    safeRe: i,
    t: o,
    comparatorTrimReplace: n,
    tildeTrimReplace: t,
    caretTrimReplace: r
  } = Fr(), { FLAG_INCLUDE_PRERELEASE: d, FLAG_LOOSE: g } = on(), v = (L) => L.value === "<0.0.0-0", p = (L) => L.value === "", w = (L, F) => {
    let H = !0;
    const x = L.slice();
    let G = x.pop();
    for (; H && x.length; )
      H = x.every((z) => G.intersects(z, F)), G = x.pop();
    return H;
  }, R = (L, F) => (L = L.replace(i[o.BUILD], ""), e("comp", L, F), L = O(L, F), e("caret", L), L = N(L, F), e("tildes", L), L = S(L, F), e("xrange", L), L = _(L, F), e("stars", L), L), P = (L) => !L || L.toLowerCase() === "x" || L === "*", N = (L, F) => L.trim().split(/\s+/).map((H) => A(H, F)).join(" "), A = (L, F) => {
    const H = F.loose ? i[o.TILDELOOSE] : i[o.TILDE];
    return L.replace(H, (x, G, z, ee, ge) => {
      e("tilde", L, x, G, z, ee, ge);
      let Z;
      return P(G) ? Z = "" : P(z) ? Z = `>=${G}.0.0 <${+G + 1}.0.0-0` : P(ee) ? Z = `>=${G}.${z}.0 <${G}.${+z + 1}.0-0` : ge ? (e("replaceTilde pr", ge), Z = `>=${G}.${z}.${ee}-${ge} <${G}.${+z + 1}.0-0`) : Z = `>=${G}.${z}.${ee} <${G}.${+z + 1}.0-0`, e("tilde return", Z), Z;
    });
  }, O = (L, F) => L.trim().split(/\s+/).map((H) => b(H, F)).join(" "), b = (L, F) => {
    e("caret", L, F);
    const H = F.loose ? i[o.CARETLOOSE] : i[o.CARET], x = F.includePrerelease ? "-0" : "";
    return L.replace(H, (G, z, ee, ge, Z) => {
      e("caret", L, G, z, ee, ge, Z);
      let we;
      return P(z) ? we = "" : P(ee) ? we = `>=${z}.0.0${x} <${+z + 1}.0.0-0` : P(ge) ? z === "0" ? we = `>=${z}.${ee}.0${x} <${z}.${+ee + 1}.0-0` : we = `>=${z}.${ee}.0${x} <${+z + 1}.0.0-0` : Z ? (e("replaceCaret pr", Z), z === "0" ? ee === "0" ? we = `>=${z}.${ee}.${ge}-${Z} <${z}.${ee}.${+ge + 1}-0` : we = `>=${z}.${ee}.${ge}-${Z} <${z}.${+ee + 1}.0-0` : we = `>=${z}.${ee}.${ge}-${Z} <${+z + 1}.0.0-0`) : (e("no pr"), z === "0" ? ee === "0" ? we = `>=${z}.${ee}.${ge}${x} <${z}.${ee}.${+ge + 1}-0` : we = `>=${z}.${ee}.${ge}${x} <${z}.${+ee + 1}.0-0` : we = `>=${z}.${ee}.${ge} <${+z + 1}.0.0-0`), e("caret return", we), we;
    });
  }, S = (L, F) => (e("replaceXRanges", L, F), L.split(/\s+/).map((H) => D(H, F)).join(" ")), D = (L, F) => {
    L = L.trim();
    const H = F.loose ? i[o.XRANGELOOSE] : i[o.XRANGE];
    return L.replace(H, (x, G, z, ee, ge, Z) => {
      e("xRange", L, x, G, z, ee, ge, Z);
      const we = P(z), ye = we || P(ee), Q = ye || P(ge), de = Q;
      return G === "=" && de && (G = ""), Z = F.includePrerelease ? "-0" : "", we ? G === ">" || G === "<" ? x = "<0.0.0-0" : x = "*" : G && de ? (ye && (ee = 0), ge = 0, G === ">" ? (G = ">=", ye ? (z = +z + 1, ee = 0, ge = 0) : (ee = +ee + 1, ge = 0)) : G === "<=" && (G = "<", ye ? z = +z + 1 : ee = +ee + 1), G === "<" && (Z = "-0"), x = `${G + z}.${ee}.${ge}${Z}`) : ye ? x = `>=${z}.0.0${Z} <${+z + 1}.0.0-0` : Q && (x = `>=${z}.${ee}.0${Z} <${z}.${+ee + 1}.0-0`), e("xRange return", x), x;
    });
  }, _ = (L, F) => (e("replaceStars", L, F), L.trim().replace(i[o.STAR], "")), k = (L, F) => (e("replaceGTE0", L, F), L.trim().replace(i[F.includePrerelease ? o.GTE0PRE : o.GTE0], "")), $ = (L) => (F, H, x, G, z, ee, ge, Z, we, ye, Q, de) => (P(x) ? H = "" : P(G) ? H = `>=${x}.0.0${L ? "-0" : ""}` : P(z) ? H = `>=${x}.${G}.0${L ? "-0" : ""}` : ee ? H = `>=${H}` : H = `>=${H}${L ? "-0" : ""}`, P(we) ? Z = "" : P(ye) ? Z = `<${+we + 1}.0.0-0` : P(Q) ? Z = `<${we}.${+ye + 1}.0-0` : de ? Z = `<=${we}.${ye}.${Q}-${de}` : L ? Z = `<${we}.${ye}.${+Q + 1}-0` : Z = `<=${Z}`, `${H} ${Z}`.trim()), M = (L, F, H) => {
    for (let x = 0; x < L.length; x++)
      if (!L[x].test(F))
        return !1;
    if (F.prerelease.length && !H.includePrerelease) {
      for (let x = 0; x < L.length; x++)
        if (e(L[x].semver), L[x].semver !== l.ANY && L[x].semver.prerelease.length > 0) {
          const G = L[x].semver;
          if (G.major === F.major && G.minor === F.minor && G.patch === F.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ki;
}
var Qi, Yo;
function cn() {
  if (Yo) return Qi;
  Yo = 1;
  const s = /* @__PURE__ */ Symbol("SemVer ANY");
  class h {
    static get ANY() {
      return s;
    }
    constructor(n, t) {
      if (t = m(t), n instanceof h) {
        if (n.loose === !!t.loose)
          return n;
        n = n.value;
      }
      n = n.trim().split(/\s+/).join(" "), e("comparator", n, t), this.options = t, this.loose = !!t.loose, this.parse(n), this.semver === s ? this.value = "" : this.value = this.operator + this.semver.version, e("comp", this);
    }
    parse(n) {
      const t = this.options.loose ? f[c.COMPARATORLOOSE] : f[c.COMPARATOR], r = n.match(t);
      if (!r)
        throw new TypeError(`Invalid comparator: ${n}`);
      this.operator = r[1] !== void 0 ? r[1] : "", this.operator === "=" && (this.operator = ""), r[2] ? this.semver = new u(r[2], this.options.loose) : this.semver = s;
    }
    toString() {
      return this.value;
    }
    test(n) {
      if (e("Comparator.test", n, this.options.loose), this.semver === s || n === s)
        return !0;
      if (typeof n == "string")
        try {
          n = new u(n, this.options);
        } catch {
          return !1;
        }
      return l(n, this.operator, this.semver, this.options);
    }
    intersects(n, t) {
      if (!(n instanceof h))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new i(n.value, t).test(this.value) : n.operator === "" ? n.value === "" ? !0 : new i(this.value, t).test(n.semver) : (t = m(t), t.includePrerelease && (this.value === "<0.0.0-0" || n.value === "<0.0.0-0") || !t.includePrerelease && (this.value.startsWith("<0.0.0") || n.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && n.operator.startsWith(">") || this.operator.startsWith("<") && n.operator.startsWith("<") || this.semver.version === n.semver.version && this.operator.includes("=") && n.operator.includes("=") || l(this.semver, "<", n.semver, t) && this.operator.startsWith(">") && n.operator.startsWith("<") || l(this.semver, ">", n.semver, t) && this.operator.startsWith("<") && n.operator.startsWith(">")));
    }
  }
  Qi = h;
  const m = Ra(), { safeRe: f, t: c } = Fr(), l = Cu(), e = ln(), u = Ke(), i = ut();
  return Qi;
}
var Zi, Xo;
function fn() {
  if (Xo) return Zi;
  Xo = 1;
  const s = ut();
  return Zi = (m, f, c) => {
    try {
      f = new s(f, c);
    } catch {
      return !1;
    }
    return f.test(m);
  }, Zi;
}
var ea, Jo;
function Bf() {
  if (Jo) return ea;
  Jo = 1;
  const s = ut();
  return ea = (m, f) => new s(m, f).set.map((c) => c.map((l) => l.value).join(" ").trim().split(" ")), ea;
}
var ta, Ko;
function jf() {
  if (Ko) return ta;
  Ko = 1;
  const s = Ke(), h = ut();
  return ta = (f, c, l) => {
    let e = null, u = null, i = null;
    try {
      i = new h(c, l);
    } catch {
      return null;
    }
    return f.forEach((o) => {
      i.test(o) && (!e || u.compare(o) === -1) && (e = o, u = new s(e, l));
    }), e;
  }, ta;
}
var ra, Qo;
function Hf() {
  if (Qo) return ra;
  Qo = 1;
  const s = Ke(), h = ut();
  return ra = (f, c, l) => {
    let e = null, u = null, i = null;
    try {
      i = new h(c, l);
    } catch {
      return null;
    }
    return f.forEach((o) => {
      i.test(o) && (!e || u.compare(o) === 1) && (e = o, u = new s(e, l));
    }), e;
  }, ra;
}
var na, Zo;
function Gf() {
  if (Zo) return na;
  Zo = 1;
  const s = Ke(), h = ut(), m = un();
  return na = (c, l) => {
    c = new h(c, l);
    let e = new s("0.0.0");
    if (c.test(e) || (e = new s("0.0.0-0"), c.test(e)))
      return e;
    e = null;
    for (let u = 0; u < c.set.length; ++u) {
      const i = c.set[u];
      let o = null;
      i.forEach((n) => {
        const t = new s(n.semver.version);
        switch (n.operator) {
          case ">":
            t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
          /* fallthrough */
          case "":
          case ">=":
            (!o || m(t, o)) && (o = t);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${n.operator}`);
        }
      }), o && (!e || m(e, o)) && (e = o);
    }
    return e && c.test(e) ? e : null;
  }, na;
}
var ia, el;
function Wf() {
  if (el) return ia;
  el = 1;
  const s = ut();
  return ia = (m, f) => {
    try {
      return new s(m, f).range || "*";
    } catch {
      return null;
    }
  }, ia;
}
var aa, tl;
function Pa() {
  if (tl) return aa;
  tl = 1;
  const s = Ke(), h = cn(), { ANY: m } = h, f = ut(), c = fn(), l = un(), e = Aa(), u = ba(), i = Ta();
  return aa = (n, t, r, d) => {
    n = new s(n, d), t = new f(t, d);
    let g, v, p, w, R;
    switch (r) {
      case ">":
        g = l, v = u, p = e, w = ">", R = ">=";
        break;
      case "<":
        g = e, v = i, p = l, w = "<", R = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (c(n, t, d))
      return !1;
    for (let P = 0; P < t.set.length; ++P) {
      const N = t.set[P];
      let A = null, O = null;
      if (N.forEach((b) => {
        b.semver === m && (b = new h(">=0.0.0")), A = A || b, O = O || b, g(b.semver, A.semver, d) ? A = b : p(b.semver, O.semver, d) && (O = b);
      }), A.operator === w || A.operator === R || (!O.operator || O.operator === w) && v(n, O.semver))
        return !1;
      if (O.operator === R && p(n, O.semver))
        return !1;
    }
    return !0;
  }, aa;
}
var sa, rl;
function Vf() {
  if (rl) return sa;
  rl = 1;
  const s = Pa();
  return sa = (m, f, c) => s(m, f, ">", c), sa;
}
var oa, nl;
function zf() {
  if (nl) return oa;
  nl = 1;
  const s = Pa();
  return oa = (m, f, c) => s(m, f, "<", c), oa;
}
var la, il;
function Yf() {
  if (il) return la;
  il = 1;
  const s = ut();
  return la = (m, f, c) => (m = new s(m, c), f = new s(f, c), m.intersects(f, c)), la;
}
var ua, al;
function Xf() {
  if (al) return ua;
  al = 1;
  const s = fn(), h = lt();
  return ua = (m, f, c) => {
    const l = [];
    let e = null, u = null;
    const i = m.sort((r, d) => h(r, d, c));
    for (const r of i)
      s(r, f, c) ? (u = r, e || (e = r)) : (u && l.push([e, u]), u = null, e = null);
    e && l.push([e, null]);
    const o = [];
    for (const [r, d] of l)
      r === d ? o.push(r) : !d && r === i[0] ? o.push("*") : d ? r === i[0] ? o.push(`<=${d}`) : o.push(`${r} - ${d}`) : o.push(`>=${r}`);
    const n = o.join(" || "), t = typeof f.raw == "string" ? f.raw : String(f);
    return n.length < t.length ? n : f;
  }, ua;
}
var ca, sl;
function Jf() {
  if (sl) return ca;
  sl = 1;
  const s = ut(), h = cn(), { ANY: m } = h, f = fn(), c = lt(), l = (t, r, d = {}) => {
    if (t === r)
      return !0;
    t = new s(t, d), r = new s(r, d);
    let g = !1;
    e: for (const v of t.set) {
      for (const p of r.set) {
        const w = i(v, p, d);
        if (g = g || w !== null, w)
          continue e;
      }
      if (g)
        return !1;
    }
    return !0;
  }, e = [new h(">=0.0.0-0")], u = [new h(">=0.0.0")], i = (t, r, d) => {
    if (t === r)
      return !0;
    if (t.length === 1 && t[0].semver === m) {
      if (r.length === 1 && r[0].semver === m)
        return !0;
      d.includePrerelease ? t = e : t = u;
    }
    if (r.length === 1 && r[0].semver === m) {
      if (d.includePrerelease)
        return !0;
      r = u;
    }
    const g = /* @__PURE__ */ new Set();
    let v, p;
    for (const S of t)
      S.operator === ">" || S.operator === ">=" ? v = o(v, S, d) : S.operator === "<" || S.operator === "<=" ? p = n(p, S, d) : g.add(S.semver);
    if (g.size > 1)
      return null;
    let w;
    if (v && p) {
      if (w = c(v.semver, p.semver, d), w > 0)
        return null;
      if (w === 0 && (v.operator !== ">=" || p.operator !== "<="))
        return null;
    }
    for (const S of g) {
      if (v && !f(S, String(v), d) || p && !f(S, String(p), d))
        return null;
      for (const D of r)
        if (!f(S, String(D), d))
          return !1;
      return !0;
    }
    let R, P, N, A, O = p && !d.includePrerelease && p.semver.prerelease.length ? p.semver : !1, b = v && !d.includePrerelease && v.semver.prerelease.length ? v.semver : !1;
    O && O.prerelease.length === 1 && p.operator === "<" && O.prerelease[0] === 0 && (O = !1);
    for (const S of r) {
      if (A = A || S.operator === ">" || S.operator === ">=", N = N || S.operator === "<" || S.operator === "<=", v) {
        if (b && S.semver.prerelease && S.semver.prerelease.length && S.semver.major === b.major && S.semver.minor === b.minor && S.semver.patch === b.patch && (b = !1), S.operator === ">" || S.operator === ">=") {
          if (R = o(v, S, d), R === S && R !== v)
            return !1;
        } else if (v.operator === ">=" && !f(v.semver, String(S), d))
          return !1;
      }
      if (p) {
        if (O && S.semver.prerelease && S.semver.prerelease.length && S.semver.major === O.major && S.semver.minor === O.minor && S.semver.patch === O.patch && (O = !1), S.operator === "<" || S.operator === "<=") {
          if (P = n(p, S, d), P === S && P !== p)
            return !1;
        } else if (p.operator === "<=" && !f(p.semver, String(S), d))
          return !1;
      }
      if (!S.operator && (p || v) && w !== 0)
        return !1;
    }
    return !(v && N && !p && w !== 0 || p && A && !v && w !== 0 || b || O);
  }, o = (t, r, d) => {
    if (!t)
      return r;
    const g = c(t.semver, r.semver, d);
    return g > 0 ? t : g < 0 || r.operator === ">" && t.operator === ">=" ? r : t;
  }, n = (t, r, d) => {
    if (!t)
      return r;
    const g = c(t.semver, r.semver, d);
    return g < 0 ? t : g > 0 || r.operator === "<" && t.operator === "<=" ? r : t;
  };
  return ca = l, ca;
}
var fa, ol;
function Au() {
  if (ol) return fa;
  ol = 1;
  const s = Fr(), h = on(), m = Ke(), f = _u(), c = Zt(), l = bf(), e = Pf(), u = Df(), i = Of(), o = If(), n = Nf(), t = xf(), r = Ff(), d = lt(), g = Lf(), v = Uf(), p = Ca(), w = $f(), R = kf(), P = un(), N = Aa(), A = Su(), O = Ru(), b = Ta(), S = ba(), D = Cu(), _ = qf(), k = cn(), $ = ut(), M = fn(), L = Bf(), F = jf(), H = Hf(), x = Gf(), G = Wf(), z = Pa(), ee = Vf(), ge = zf(), Z = Yf(), we = Xf(), ye = Jf();
  return fa = {
    parse: c,
    valid: l,
    clean: e,
    inc: u,
    diff: i,
    major: o,
    minor: n,
    patch: t,
    prerelease: r,
    compare: d,
    rcompare: g,
    compareLoose: v,
    compareBuild: p,
    sort: w,
    rsort: R,
    gt: P,
    lt: N,
    eq: A,
    neq: O,
    gte: b,
    lte: S,
    cmp: D,
    coerce: _,
    Comparator: k,
    Range: $,
    satisfies: M,
    toComparators: L,
    maxSatisfying: F,
    minSatisfying: H,
    minVersion: x,
    validRange: G,
    outside: z,
    gtr: ee,
    ltr: ge,
    intersects: Z,
    simplifyRange: we,
    subset: ye,
    SemVer: m,
    re: s.re,
    src: s.src,
    tokens: s.t,
    SEMVER_SPEC_VERSION: h.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: h.RELEASE_TYPES,
    compareIdentifiers: f.compareIdentifiers,
    rcompareIdentifiers: f.rcompareIdentifiers
  }, fa;
}
var Vt = {}, Dr = { exports: {} };
Dr.exports;
var ll;
function Kf() {
  return ll || (ll = 1, (function(s, h) {
    var m = 200, f = "__lodash_hash_undefined__", c = 1, l = 2, e = 9007199254740991, u = "[object Arguments]", i = "[object Array]", o = "[object AsyncFunction]", n = "[object Boolean]", t = "[object Date]", r = "[object Error]", d = "[object Function]", g = "[object GeneratorFunction]", v = "[object Map]", p = "[object Number]", w = "[object Null]", R = "[object Object]", P = "[object Promise]", N = "[object Proxy]", A = "[object RegExp]", O = "[object Set]", b = "[object String]", S = "[object Symbol]", D = "[object Undefined]", _ = "[object WeakMap]", k = "[object ArrayBuffer]", $ = "[object DataView]", M = "[object Float32Array]", L = "[object Float64Array]", F = "[object Int8Array]", H = "[object Int16Array]", x = "[object Int32Array]", G = "[object Uint8Array]", z = "[object Uint8ClampedArray]", ee = "[object Uint16Array]", ge = "[object Uint32Array]", Z = /[\\^$.*+?()[\]{}|]/g, we = /^\[object .+?Constructor\]$/, ye = /^(?:0|[1-9]\d*)$/, Q = {};
    Q[M] = Q[L] = Q[F] = Q[H] = Q[x] = Q[G] = Q[z] = Q[ee] = Q[ge] = !0, Q[u] = Q[i] = Q[k] = Q[n] = Q[$] = Q[t] = Q[r] = Q[d] = Q[v] = Q[p] = Q[R] = Q[A] = Q[O] = Q[b] = Q[_] = !1;
    var de = typeof ot == "object" && ot && ot.Object === Object && ot, _e = typeof self == "object" && self && self.Object === Object && self, be = de || _e || Function("return this")(), Ne = h && !h.nodeType && h, Ie = Ne && !0 && s && !s.nodeType && s, Te = Ie && Ie.exports === Ne, E = Te && de.process, y = (function() {
      try {
        return E && E.binding && E.binding("util");
      } catch {
      }
    })(), q = y && y.isTypedArray;
    function I(T, U) {
      for (var K = -1, le = T == null ? 0 : T.length, Le = 0, Se = []; ++K < le; ) {
        var Me = T[K];
        U(Me, K, T) && (Se[Le++] = Me);
      }
      return Se;
    }
    function Ce(T, U) {
      for (var K = -1, le = U.length, Le = T.length; ++K < le; )
        T[Le + K] = U[K];
      return T;
    }
    function Ae(T, U) {
      for (var K = -1, le = T == null ? 0 : T.length; ++K < le; )
        if (U(T[K], K, T))
          return !0;
      return !1;
    }
    function Fe(T, U) {
      for (var K = -1, le = Array(T); ++K < T; )
        le[K] = U(K);
      return le;
    }
    function Be(T) {
      return function(U) {
        return T(U);
      };
    }
    function je(T, U) {
      return T.has(U);
    }
    function Ve(T, U) {
      return T?.[U];
    }
    function a(T) {
      var U = -1, K = Array(T.size);
      return T.forEach(function(le, Le) {
        K[++U] = [Le, le];
      }), K;
    }
    function B(T, U) {
      return function(K) {
        return T(U(K));
      };
    }
    function W(T) {
      var U = -1, K = Array(T.size);
      return T.forEach(function(le) {
        K[++U] = le;
      }), K;
    }
    var ie = Array.prototype, V = Function.prototype, ne = Object.prototype, te = be["__core-js_shared__"], se = V.toString, ue = ne.hasOwnProperty, Pe = (function() {
      var T = /[^.]+$/.exec(te && te.keys && te.keys.IE_PROTO || "");
      return T ? "Symbol(src)_1." + T : "";
    })(), De = ne.toString, me = RegExp(
      "^" + se.call(ue).replace(Z, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), C = Te ? be.Buffer : void 0, j = be.Symbol, Y = be.Uint8Array, X = ne.propertyIsEnumerable, J = ie.splice, ae = j ? j.toStringTag : void 0, re = Object.getOwnPropertySymbols, oe = C ? C.isBuffer : void 0, he = B(Object.keys, Object), Ee = Ht(be, "DataView"), xe = Ht(be, "Map"), qe = Ht(be, "Promise"), Oe = Ht(be, "Set"), jt = Ht(be, "WeakMap"), at = Ht(Object, "create"), bt = Ot(Ee), ju = Ot(xe), Hu = Ot(qe), Gu = Ot(Oe), Wu = Ot(jt), Na = j ? j.prototype : void 0, hn = Na ? Na.valueOf : void 0;
    function Pt(T) {
      var U = -1, K = T == null ? 0 : T.length;
      for (this.clear(); ++U < K; ) {
        var le = T[U];
        this.set(le[0], le[1]);
      }
    }
    function Vu() {
      this.__data__ = at ? at(null) : {}, this.size = 0;
    }
    function zu(T) {
      var U = this.has(T) && delete this.__data__[T];
      return this.size -= U ? 1 : 0, U;
    }
    function Yu(T) {
      var U = this.__data__;
      if (at) {
        var K = U[T];
        return K === f ? void 0 : K;
      }
      return ue.call(U, T) ? U[T] : void 0;
    }
    function Xu(T) {
      var U = this.__data__;
      return at ? U[T] !== void 0 : ue.call(U, T);
    }
    function Ju(T, U) {
      var K = this.__data__;
      return this.size += this.has(T) ? 0 : 1, K[T] = at && U === void 0 ? f : U, this;
    }
    Pt.prototype.clear = Vu, Pt.prototype.delete = zu, Pt.prototype.get = Yu, Pt.prototype.has = Xu, Pt.prototype.set = Ju;
    function ht(T) {
      var U = -1, K = T == null ? 0 : T.length;
      for (this.clear(); ++U < K; ) {
        var le = T[U];
        this.set(le[0], le[1]);
      }
    }
    function Ku() {
      this.__data__ = [], this.size = 0;
    }
    function Qu(T) {
      var U = this.__data__, K = Ur(U, T);
      if (K < 0)
        return !1;
      var le = U.length - 1;
      return K == le ? U.pop() : J.call(U, K, 1), --this.size, !0;
    }
    function Zu(T) {
      var U = this.__data__, K = Ur(U, T);
      return K < 0 ? void 0 : U[K][1];
    }
    function ec(T) {
      return Ur(this.__data__, T) > -1;
    }
    function tc(T, U) {
      var K = this.__data__, le = Ur(K, T);
      return le < 0 ? (++this.size, K.push([T, U])) : K[le][1] = U, this;
    }
    ht.prototype.clear = Ku, ht.prototype.delete = Qu, ht.prototype.get = Zu, ht.prototype.has = ec, ht.prototype.set = tc;
    function Dt(T) {
      var U = -1, K = T == null ? 0 : T.length;
      for (this.clear(); ++U < K; ) {
        var le = T[U];
        this.set(le[0], le[1]);
      }
    }
    function rc() {
      this.size = 0, this.__data__ = {
        hash: new Pt(),
        map: new (xe || ht)(),
        string: new Pt()
      };
    }
    function nc(T) {
      var U = $r(this, T).delete(T);
      return this.size -= U ? 1 : 0, U;
    }
    function ic(T) {
      return $r(this, T).get(T);
    }
    function ac(T) {
      return $r(this, T).has(T);
    }
    function sc(T, U) {
      var K = $r(this, T), le = K.size;
      return K.set(T, U), this.size += K.size == le ? 0 : 1, this;
    }
    Dt.prototype.clear = rc, Dt.prototype.delete = nc, Dt.prototype.get = ic, Dt.prototype.has = ac, Dt.prototype.set = sc;
    function Lr(T) {
      var U = -1, K = T == null ? 0 : T.length;
      for (this.__data__ = new Dt(); ++U < K; )
        this.add(T[U]);
    }
    function oc(T) {
      return this.__data__.set(T, f), this;
    }
    function lc(T) {
      return this.__data__.has(T);
    }
    Lr.prototype.add = Lr.prototype.push = oc, Lr.prototype.has = lc;
    function yt(T) {
      var U = this.__data__ = new ht(T);
      this.size = U.size;
    }
    function uc() {
      this.__data__ = new ht(), this.size = 0;
    }
    function cc(T) {
      var U = this.__data__, K = U.delete(T);
      return this.size = U.size, K;
    }
    function fc(T) {
      return this.__data__.get(T);
    }
    function dc(T) {
      return this.__data__.has(T);
    }
    function hc(T, U) {
      var K = this.__data__;
      if (K instanceof ht) {
        var le = K.__data__;
        if (!xe || le.length < m - 1)
          return le.push([T, U]), this.size = ++K.size, this;
        K = this.__data__ = new Dt(le);
      }
      return K.set(T, U), this.size = K.size, this;
    }
    yt.prototype.clear = uc, yt.prototype.delete = cc, yt.prototype.get = fc, yt.prototype.has = dc, yt.prototype.set = hc;
    function pc(T, U) {
      var K = kr(T), le = !K && Dc(T), Le = !K && !le && pn(T), Se = !K && !le && !Le && Ba(T), Me = K || le || Le || Se, He = Me ? Fe(T.length, String) : [], We = He.length;
      for (var Ue in T)
        ue.call(T, Ue) && !(Me && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ue == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Le && (Ue == "offset" || Ue == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Se && (Ue == "buffer" || Ue == "byteLength" || Ue == "byteOffset") || // Skip index properties.
        Cc(Ue, We))) && He.push(Ue);
      return He;
    }
    function Ur(T, U) {
      for (var K = T.length; K--; )
        if ($a(T[K][0], U))
          return K;
      return -1;
    }
    function mc(T, U, K) {
      var le = U(T);
      return kr(T) ? le : Ce(le, K(T));
    }
    function er(T) {
      return T == null ? T === void 0 ? D : w : ae && ae in Object(T) ? Sc(T) : Pc(T);
    }
    function xa(T) {
      return tr(T) && er(T) == u;
    }
    function Fa(T, U, K, le, Le) {
      return T === U ? !0 : T == null || U == null || !tr(T) && !tr(U) ? T !== T && U !== U : gc(T, U, K, le, Fa, Le);
    }
    function gc(T, U, K, le, Le, Se) {
      var Me = kr(T), He = kr(U), We = Me ? i : vt(T), Ue = He ? i : vt(U);
      We = We == u ? R : We, Ue = Ue == u ? R : Ue;
      var Ze = We == R, st = Ue == R, ze = We == Ue;
      if (ze && pn(T)) {
        if (!pn(U))
          return !1;
        Me = !0, Ze = !1;
      }
      if (ze && !Ze)
        return Se || (Se = new yt()), Me || Ba(T) ? La(T, U, K, le, Le, Se) : wc(T, U, We, K, le, Le, Se);
      if (!(K & c)) {
        var nt = Ze && ue.call(T, "__wrapped__"), it = st && ue.call(U, "__wrapped__");
        if (nt || it) {
          var Et = nt ? T.value() : T, pt = it ? U.value() : U;
          return Se || (Se = new yt()), Le(Et, pt, K, le, Se);
        }
      }
      return ze ? (Se || (Se = new yt()), _c(T, U, K, le, Le, Se)) : !1;
    }
    function yc(T) {
      if (!Ma(T) || Tc(T))
        return !1;
      var U = ka(T) ? me : we;
      return U.test(Ot(T));
    }
    function vc(T) {
      return tr(T) && qa(T.length) && !!Q[er(T)];
    }
    function Ec(T) {
      if (!bc(T))
        return he(T);
      var U = [];
      for (var K in Object(T))
        ue.call(T, K) && K != "constructor" && U.push(K);
      return U;
    }
    function La(T, U, K, le, Le, Se) {
      var Me = K & c, He = T.length, We = U.length;
      if (He != We && !(Me && We > He))
        return !1;
      var Ue = Se.get(T);
      if (Ue && Se.get(U))
        return Ue == U;
      var Ze = -1, st = !0, ze = K & l ? new Lr() : void 0;
      for (Se.set(T, U), Se.set(U, T); ++Ze < He; ) {
        var nt = T[Ze], it = U[Ze];
        if (le)
          var Et = Me ? le(it, nt, Ze, U, T, Se) : le(nt, it, Ze, T, U, Se);
        if (Et !== void 0) {
          if (Et)
            continue;
          st = !1;
          break;
        }
        if (ze) {
          if (!Ae(U, function(pt, It) {
            if (!je(ze, It) && (nt === pt || Le(nt, pt, K, le, Se)))
              return ze.push(It);
          })) {
            st = !1;
            break;
          }
        } else if (!(nt === it || Le(nt, it, K, le, Se))) {
          st = !1;
          break;
        }
      }
      return Se.delete(T), Se.delete(U), st;
    }
    function wc(T, U, K, le, Le, Se, Me) {
      switch (K) {
        case $:
          if (T.byteLength != U.byteLength || T.byteOffset != U.byteOffset)
            return !1;
          T = T.buffer, U = U.buffer;
        case k:
          return !(T.byteLength != U.byteLength || !Se(new Y(T), new Y(U)));
        case n:
        case t:
        case p:
          return $a(+T, +U);
        case r:
          return T.name == U.name && T.message == U.message;
        case A:
        case b:
          return T == U + "";
        case v:
          var He = a;
        case O:
          var We = le & c;
          if (He || (He = W), T.size != U.size && !We)
            return !1;
          var Ue = Me.get(T);
          if (Ue)
            return Ue == U;
          le |= l, Me.set(T, U);
          var Ze = La(He(T), He(U), le, Le, Se, Me);
          return Me.delete(T), Ze;
        case S:
          if (hn)
            return hn.call(T) == hn.call(U);
      }
      return !1;
    }
    function _c(T, U, K, le, Le, Se) {
      var Me = K & c, He = Ua(T), We = He.length, Ue = Ua(U), Ze = Ue.length;
      if (We != Ze && !Me)
        return !1;
      for (var st = We; st--; ) {
        var ze = He[st];
        if (!(Me ? ze in U : ue.call(U, ze)))
          return !1;
      }
      var nt = Se.get(T);
      if (nt && Se.get(U))
        return nt == U;
      var it = !0;
      Se.set(T, U), Se.set(U, T);
      for (var Et = Me; ++st < We; ) {
        ze = He[st];
        var pt = T[ze], It = U[ze];
        if (le)
          var ja = Me ? le(It, pt, ze, U, T, Se) : le(pt, It, ze, T, U, Se);
        if (!(ja === void 0 ? pt === It || Le(pt, It, K, le, Se) : ja)) {
          it = !1;
          break;
        }
        Et || (Et = ze == "constructor");
      }
      if (it && !Et) {
        var qr = T.constructor, Mr = U.constructor;
        qr != Mr && "constructor" in T && "constructor" in U && !(typeof qr == "function" && qr instanceof qr && typeof Mr == "function" && Mr instanceof Mr) && (it = !1);
      }
      return Se.delete(T), Se.delete(U), it;
    }
    function Ua(T) {
      return mc(T, Nc, Rc);
    }
    function $r(T, U) {
      var K = T.__data__;
      return Ac(U) ? K[typeof U == "string" ? "string" : "hash"] : K.map;
    }
    function Ht(T, U) {
      var K = Ve(T, U);
      return yc(K) ? K : void 0;
    }
    function Sc(T) {
      var U = ue.call(T, ae), K = T[ae];
      try {
        T[ae] = void 0;
        var le = !0;
      } catch {
      }
      var Le = De.call(T);
      return le && (U ? T[ae] = K : delete T[ae]), Le;
    }
    var Rc = re ? function(T) {
      return T == null ? [] : (T = Object(T), I(re(T), function(U) {
        return X.call(T, U);
      }));
    } : xc, vt = er;
    (Ee && vt(new Ee(new ArrayBuffer(1))) != $ || xe && vt(new xe()) != v || qe && vt(qe.resolve()) != P || Oe && vt(new Oe()) != O || jt && vt(new jt()) != _) && (vt = function(T) {
      var U = er(T), K = U == R ? T.constructor : void 0, le = K ? Ot(K) : "";
      if (le)
        switch (le) {
          case bt:
            return $;
          case ju:
            return v;
          case Hu:
            return P;
          case Gu:
            return O;
          case Wu:
            return _;
        }
      return U;
    });
    function Cc(T, U) {
      return U = U ?? e, !!U && (typeof T == "number" || ye.test(T)) && T > -1 && T % 1 == 0 && T < U;
    }
    function Ac(T) {
      var U = typeof T;
      return U == "string" || U == "number" || U == "symbol" || U == "boolean" ? T !== "__proto__" : T === null;
    }
    function Tc(T) {
      return !!Pe && Pe in T;
    }
    function bc(T) {
      var U = T && T.constructor, K = typeof U == "function" && U.prototype || ne;
      return T === K;
    }
    function Pc(T) {
      return De.call(T);
    }
    function Ot(T) {
      if (T != null) {
        try {
          return se.call(T);
        } catch {
        }
        try {
          return T + "";
        } catch {
        }
      }
      return "";
    }
    function $a(T, U) {
      return T === U || T !== T && U !== U;
    }
    var Dc = xa(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? xa : function(T) {
      return tr(T) && ue.call(T, "callee") && !X.call(T, "callee");
    }, kr = Array.isArray;
    function Oc(T) {
      return T != null && qa(T.length) && !ka(T);
    }
    var pn = oe || Fc;
    function Ic(T, U) {
      return Fa(T, U);
    }
    function ka(T) {
      if (!Ma(T))
        return !1;
      var U = er(T);
      return U == d || U == g || U == o || U == N;
    }
    function qa(T) {
      return typeof T == "number" && T > -1 && T % 1 == 0 && T <= e;
    }
    function Ma(T) {
      var U = typeof T;
      return T != null && (U == "object" || U == "function");
    }
    function tr(T) {
      return T != null && typeof T == "object";
    }
    var Ba = q ? Be(q) : vc;
    function Nc(T) {
      return Oc(T) ? pc(T) : Ec(T);
    }
    function xc() {
      return [];
    }
    function Fc() {
      return !1;
    }
    s.exports = Ic;
  })(Dr, Dr.exports)), Dr.exports;
}
var ul;
function Qf() {
  if (ul) return Vt;
  ul = 1, Object.defineProperty(Vt, "__esModule", { value: !0 }), Vt.DownloadedUpdateHelper = void 0, Vt.createTempUpdateFile = u;
  const s = Ir, h = Ct, m = Kf(), f = /* @__PURE__ */ Tt(), c = ke;
  let l = class {
    constructor(o) {
      this.cacheDir = o, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
    }
    get downloadedFileInfo() {
      return this._downloadedFileInfo;
    }
    get file() {
      return this._file;
    }
    get packageFile() {
      return this._packageFile;
    }
    get cacheDirForPendingUpdate() {
      return c.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(o, n, t, r) {
      if (this.versionInfo != null && this.file === o && this.fileInfo != null)
        return m(this.versionInfo, n) && m(this.fileInfo.info, t.info) && await (0, f.pathExists)(o) ? o : null;
      const d = await this.getValidCachedUpdateFile(t, r);
      return d === null ? null : (r.info(`Update has already been downloaded to ${o}).`), this._file = d, d);
    }
    async setDownloadedFile(o, n, t, r, d, g) {
      this._file = o, this._packageFile = n, this.versionInfo = t, this.fileInfo = r, this._downloadedFileInfo = {
        fileName: d,
        sha512: r.info.sha512,
        isAdminRightsRequired: r.info.isAdminRightsRequired === !0
      }, g && await (0, f.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, f.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(o, n) {
      const t = this.getUpdateInfoFile();
      if (!await (0, f.pathExists)(t))
        return null;
      let d;
      try {
        d = await (0, f.readJson)(t);
      } catch (w) {
        let R = "No cached update info available";
        return w.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), R += ` (error on read: ${w.message})`), n.info(R), null;
      }
      if (!(d?.fileName !== null))
        return n.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (o.info.sha512 !== d.sha512)
        return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${d.sha512}, expected: ${o.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const v = c.join(this.cacheDirForPendingUpdate, d.fileName);
      if (!await (0, f.pathExists)(v))
        return n.info("Cached update file doesn't exist"), null;
      const p = await e(v);
      return o.info.sha512 !== p ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p}, expected: ${o.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = d, v);
    }
    getUpdateInfoFile() {
      return c.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  Vt.DownloadedUpdateHelper = l;
  function e(i, o = "sha512", n = "base64", t) {
    return new Promise((r, d) => {
      const g = (0, s.createHash)(o);
      g.on("error", d).setEncoding(n), (0, h.createReadStream)(i, {
        ...t,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", d).on("end", () => {
        g.end(), r(g.read());
      }).pipe(g, { end: !1 });
    });
  }
  async function u(i, o, n) {
    let t = 0, r = c.join(o, i);
    for (let d = 0; d < 3; d++)
      try {
        return await (0, f.unlink)(r), r;
      } catch (g) {
        if (g.code === "ENOENT")
          return r;
        n.warn(`Error on remove temp update file: ${g}`), r = c.join(o, `${t++}-${i}`);
      }
    return r;
  }
  return Vt;
}
var ur = {}, Qr = {}, cl;
function Zf() {
  if (cl) return Qr;
  cl = 1, Object.defineProperty(Qr, "__esModule", { value: !0 }), Qr.getAppCacheDir = m;
  const s = ke, h = nn;
  function m() {
    const f = (0, h.homedir)();
    let c;
    return process.platform === "win32" ? c = process.env.LOCALAPPDATA || s.join(f, "AppData", "Local") : process.platform === "darwin" ? c = s.join(f, "Library", "Caches") : c = process.env.XDG_CACHE_HOME || s.join(f, ".cache"), c;
  }
  return Qr;
}
var fl;
function ed() {
  if (fl) return ur;
  fl = 1, Object.defineProperty(ur, "__esModule", { value: !0 }), ur.ElectronAppAdapter = void 0;
  const s = ke, h = Zf();
  let m = class {
    constructor(c = kt.app) {
      this.app = c;
    }
    whenReady() {
      return this.app.whenReady();
    }
    get version() {
      return this.app.getVersion();
    }
    get name() {
      return this.app.getName();
    }
    get isPackaged() {
      return this.app.isPackaged === !0;
    }
    get appUpdateConfigPath() {
      return this.isPackaged ? s.join(process.resourcesPath, "app-update.yml") : s.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, h.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(c) {
      this.app.once("quit", (l, e) => c(e));
    }
  };
  return ur.ElectronAppAdapter = m, ur;
}
var da = {}, dl;
function td() {
  return dl || (dl = 1, (function(s) {
    Object.defineProperty(s, "__esModule", { value: !0 }), s.ElectronHttpExecutor = s.NET_SESSION_NAME = void 0, s.getNetSession = m;
    const h = Ge();
    s.NET_SESSION_NAME = "electron-updater";
    function m() {
      return kt.session.fromPartition(s.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class f extends h.HttpExecutor {
      constructor(l) {
        super(), this.proxyLoginCallback = l, this.cachedSession = null;
      }
      async download(l, e, u) {
        return await u.cancellationToken.createPromise((i, o, n) => {
          const t = {
            headers: u.headers || void 0,
            redirect: "manual"
          };
          (0, h.configureRequestUrl)(l, t), (0, h.configureRequestOptions)(t), this.doDownload(t, {
            destination: e,
            options: u,
            onCancel: n,
            callback: (r) => {
              r == null ? i(e) : o(r);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(l, e) {
        l.headers && l.headers.Host && (l.host = l.headers.Host, delete l.headers.Host), this.cachedSession == null && (this.cachedSession = m());
        const u = kt.net.request({
          ...l,
          session: this.cachedSession
        });
        return u.on("response", e), this.proxyLoginCallback != null && u.on("login", this.proxyLoginCallback), u;
      }
      addRedirectHandlers(l, e, u, i, o) {
        l.on("redirect", (n, t, r) => {
          l.abort(), i > this.maxRedirects ? u(this.createMaxRedirectError()) : o(h.HttpExecutor.prepareRedirectUrlOptions(r, e));
        });
      }
    }
    s.ElectronHttpExecutor = f;
  })(da)), da;
}
var cr = {}, zt = {}, hl;
function Mt() {
  if (hl) return zt;
  hl = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.newBaseUrl = h, zt.newUrlFromBase = m, zt.getChannelFilename = f;
  const s = At;
  function h(c) {
    const l = new s.URL(c);
    return l.pathname.endsWith("/") || (l.pathname += "/"), l;
  }
  function m(c, l, e = !1) {
    const u = new s.URL(c, l), i = l.search;
    return i != null && i.length !== 0 ? u.search = i : e && (u.search = `noCache=${Date.now().toString(32)}`), u;
  }
  function f(c) {
    return `${c}.yml`;
  }
  return zt;
}
var mt = {}, ha, pl;
function Tu() {
  if (pl) return ha;
  pl = 1;
  var s = "[object Symbol]", h = /[\\^$.*+?()[\]{}|]/g, m = RegExp(h.source), f = typeof ot == "object" && ot && ot.Object === Object && ot, c = typeof self == "object" && self && self.Object === Object && self, l = f || c || Function("return this")(), e = Object.prototype, u = e.toString, i = l.Symbol, o = i ? i.prototype : void 0, n = o ? o.toString : void 0;
  function t(p) {
    if (typeof p == "string")
      return p;
    if (d(p))
      return n ? n.call(p) : "";
    var w = p + "";
    return w == "0" && 1 / p == -1 / 0 ? "-0" : w;
  }
  function r(p) {
    return !!p && typeof p == "object";
  }
  function d(p) {
    return typeof p == "symbol" || r(p) && u.call(p) == s;
  }
  function g(p) {
    return p == null ? "" : t(p);
  }
  function v(p) {
    return p = g(p), p && m.test(p) ? p.replace(h, "\\$&") : p;
  }
  return ha = v, ha;
}
var ml;
function rt() {
  if (ml) return mt;
  ml = 1, Object.defineProperty(mt, "__esModule", { value: !0 }), mt.Provider = void 0, mt.findFile = e, mt.parseUpdateInfo = u, mt.getFileList = i, mt.resolveFiles = o;
  const s = Ge(), h = Sa(), m = At, f = Mt(), c = Tu();
  let l = class {
    constructor(t) {
      this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
    }
    // By default, the blockmap file is in the same directory as the main file
    // But some providers may have a different blockmap file, so we need to override this method
    getBlockMapFiles(t, r, d, g = null) {
      const v = (0, f.newUrlFromBase)(`${t.pathname}.blockmap`, t);
      return [(0, f.newUrlFromBase)(`${t.pathname.replace(new RegExp(c(d), "g"), r)}.blockmap`, g ? new m.URL(g) : t), v];
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const t = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (t === "x64" ? "" : `-${t}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(t) {
      return `${t}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(t) {
      this.requestHeaders = t;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(t, r, d) {
      return this.executor.request(this.createRequestOptions(t, r), d);
    }
    createRequestOptions(t, r) {
      const d = {};
      return this.requestHeaders == null ? r != null && (d.headers = r) : d.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, s.configureRequestUrl)(t, d), d;
    }
  };
  mt.Provider = l;
  function e(n, t, r) {
    var d;
    if (n.length === 0)
      throw (0, s.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const g = n.filter((p) => p.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), v = (d = g.find((p) => [p.url.pathname, p.info.url].some((w) => w.includes(process.arch)))) !== null && d !== void 0 ? d : g.shift();
    return v || (r == null ? n[0] : n.find((p) => !r.some((w) => p.url.pathname.toLowerCase().endsWith(`.${w.toLowerCase()}`))));
  }
  function u(n, t, r) {
    if (n == null)
      throw (0, s.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let d;
    try {
      d = (0, h.load)(n);
    } catch (g) {
      throw (0, s.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${g.stack || g.message}, rawData: ${n}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return d;
  }
  function i(n) {
    const t = n.files;
    if (t != null && t.length > 0)
      return t;
    if (n.path != null)
      return [
        {
          url: n.path,
          sha2: n.sha2,
          sha512: n.sha512
        }
      ];
    throw (0, s.newError)(`No files provided: ${(0, s.safeStringifyJson)(n)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function o(n, t, r = (d) => d) {
    const g = i(n).map((w) => {
      if (w.sha2 == null && w.sha512 == null)
        throw (0, s.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, s.safeStringifyJson)(w)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, f.newUrlFromBase)(r(w.url), t),
        info: w
      };
    }), v = n.packages, p = v == null ? null : v[process.arch] || v.ia32;
    return p != null && (g[0].packageInfo = {
      ...p,
      path: (0, f.newUrlFromBase)(r(p.path), t).href
    }), g;
  }
  return mt;
}
var gl;
function bu() {
  if (gl) return cr;
  gl = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), cr.GenericProvider = void 0;
  const s = Ge(), h = Mt(), m = rt();
  let f = class extends m.Provider {
    constructor(l, e, u) {
      super(u), this.configuration = l, this.updater = e, this.baseUrl = (0, h.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const l = this.updater.channel || this.configuration.channel;
      return l == null ? this.getDefaultChannelName() : this.getCustomChannelName(l);
    }
    async getLatestVersion() {
      const l = (0, h.getChannelFilename)(this.channel), e = (0, h.newUrlFromBase)(l, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let u = 0; ; u++)
        try {
          return (0, m.parseUpdateInfo)(await this.httpRequest(e), l, e);
        } catch (i) {
          if (i instanceof s.HttpError && i.statusCode === 404)
            throw (0, s.newError)(`Cannot find channel "${l}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (i.code === "ECONNREFUSED" && u < 3) {
            await new Promise((o, n) => {
              try {
                setTimeout(o, 1e3 * u);
              } catch (t) {
                n(t);
              }
            });
            continue;
          }
          throw i;
        }
    }
    resolveFiles(l) {
      return (0, m.resolveFiles)(l, this.baseUrl);
    }
  };
  return cr.GenericProvider = f, cr;
}
var fr = {}, dr = {}, yl;
function rd() {
  if (yl) return dr;
  yl = 1, Object.defineProperty(dr, "__esModule", { value: !0 }), dr.BitbucketProvider = void 0;
  const s = Ge(), h = Mt(), m = rt();
  let f = class extends m.Provider {
    constructor(l, e, u) {
      super({
        ...u,
        isUseMultipleRangeRequest: !1
      }), this.configuration = l, this.updater = e;
      const { owner: i, slug: o } = l;
      this.baseUrl = (0, h.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const l = new s.CancellationToken(), e = (0, h.getChannelFilename)(this.getCustomChannelName(this.channel)), u = (0, h.newUrlFromBase)(e, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const i = await this.httpRequest(u, void 0, l);
        return (0, m.parseUpdateInfo)(i, e, u);
      } catch (i) {
        throw (0, s.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(l) {
      return (0, m.resolveFiles)(l, this.baseUrl);
    }
    toString() {
      const { owner: l, slug: e } = this.configuration;
      return `Bitbucket (owner: ${l}, slug: ${e}, channel: ${this.channel})`;
    }
  };
  return dr.BitbucketProvider = f, dr;
}
var St = {}, vl;
function Pu() {
  if (vl) return St;
  vl = 1, Object.defineProperty(St, "__esModule", { value: !0 }), St.GitHubProvider = St.BaseGitHubProvider = void 0, St.computeReleaseNotes = o;
  const s = Ge(), h = Au(), m = At, f = Mt(), c = rt(), l = /\/tag\/([^/]+)$/;
  class e extends c.Provider {
    constructor(t, r, d) {
      super({
        ...d,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = t, this.baseUrl = (0, f.newBaseUrl)((0, s.githubUrl)(t, r));
      const g = r === "github.com" ? "api.github.com" : r;
      this.baseApiUrl = (0, f.newBaseUrl)((0, s.githubUrl)(t, g));
    }
    computeGithubBasePath(t) {
      const r = this.options.host;
      return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
    }
  }
  St.BaseGitHubProvider = e;
  let u = class extends e {
    constructor(t, r, d) {
      super(t, "github.com", d), this.options = t, this.updater = r;
    }
    get channel() {
      const t = this.updater.channel || this.options.channel;
      return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
    }
    async getLatestVersion() {
      var t, r, d, g, v;
      const p = new s.CancellationToken(), w = await this.httpRequest((0, f.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, p), R = (0, s.parseXml)(w);
      let P = R.element("entry", !1, "No published versions on GitHub"), N = null;
      try {
        if (this.updater.allowPrerelease) {
          const _ = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = h.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
          if (_ === null)
            N = l.exec(P.element("link").attribute("href"))[1];
          else
            for (const k of R.getElements("entry")) {
              const $ = l.exec(k.element("link").attribute("href"));
              if ($ === null)
                continue;
              const M = $[1], L = ((d = h.prerelease(M)) === null || d === void 0 ? void 0 : d[0]) || null, F = !_ || ["alpha", "beta"].includes(_), H = L !== null && !["alpha", "beta"].includes(String(L));
              if (F && !H && !(_ === "beta" && L === "alpha")) {
                N = M;
                break;
              }
              if (L && L === _) {
                N = M;
                break;
              }
            }
        } else {
          N = await this.getLatestTagName(p);
          for (const _ of R.getElements("entry"))
            if (l.exec(_.element("link").attribute("href"))[1] === N) {
              P = _;
              break;
            }
        }
      } catch (_) {
        throw (0, s.newError)(`Cannot parse releases feed: ${_.stack || _.message},
XML:
${w}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (N == null)
        throw (0, s.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let A, O = "", b = "";
      const S = async (_) => {
        O = (0, f.getChannelFilename)(_), b = (0, f.newUrlFromBase)(this.getBaseDownloadPath(String(N), O), this.baseUrl);
        const k = this.createRequestOptions(b);
        try {
          return await this.executor.request(k, p);
        } catch ($) {
          throw $ instanceof s.HttpError && $.statusCode === 404 ? (0, s.newError)(`Cannot find ${O} in the latest release artifacts (${b}): ${$.stack || $.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : $;
        }
      };
      try {
        let _ = this.channel;
        this.updater.allowPrerelease && (!((g = h.prerelease(N)) === null || g === void 0) && g[0]) && (_ = this.getCustomChannelName(String((v = h.prerelease(N)) === null || v === void 0 ? void 0 : v[0]))), A = await S(_);
      } catch (_) {
        if (this.updater.allowPrerelease)
          A = await S(this.getDefaultChannelName());
        else
          throw _;
      }
      const D = (0, c.parseUpdateInfo)(A, O, b);
      return D.releaseName == null && (D.releaseName = P.elementValueOrEmpty("title")), D.releaseNotes == null && (D.releaseNotes = o(this.updater.currentVersion, this.updater.fullChangelog, R, P)), {
        tag: N,
        ...D
      };
    }
    async getLatestTagName(t) {
      const r = this.options, d = r.host == null || r.host === "github.com" ? (0, f.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new m.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const g = await this.httpRequest(d, { Accept: "application/json" }, t);
        return g == null ? null : JSON.parse(g).tag_name;
      } catch (g) {
        throw (0, s.newError)(`Unable to find latest version on GitHub (${d}), please ensure a production release exists: ${g.stack || g.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(t) {
      return (0, c.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
    }
    getBaseDownloadPath(t, r) {
      return `${this.basePath}/download/${t}/${r}`;
    }
  };
  St.GitHubProvider = u;
  function i(n) {
    const t = n.elementValueOrEmpty("content");
    return t === "No content." ? "" : t;
  }
  function o(n, t, r, d) {
    if (!t)
      return i(d);
    const g = [];
    for (const v of r.getElements("entry")) {
      const p = /\/tag\/v?([^/]+)$/.exec(v.element("link").attribute("href"))[1];
      h.valid(p) && h.lt(n, p) && g.push({
        version: p,
        note: i(v)
      });
    }
    return g.sort((v, p) => h.rcompare(v.version, p.version));
  }
  return St;
}
var hr = {}, El;
function nd() {
  if (El) return hr;
  El = 1, Object.defineProperty(hr, "__esModule", { value: !0 }), hr.GitLabProvider = void 0;
  const s = Ge(), h = At, m = Tu(), f = Mt(), c = rt();
  let l = class extends c.Provider {
    /**
     * Normalizes filenames by replacing spaces and underscores with dashes.
     *
     * This is a workaround to handle filename formatting differences between tools:
     * - electron-builder formats filenames like "test file.txt" as "test-file.txt"
     * - GitLab may provide asset URLs using underscores, such as "test_file.txt"
     *
     * Because of this mismatch, we can't reliably extract the correct filename from
     * the asset path without normalization. This function ensures consistent matching
     * across different filename formats by converting all spaces and underscores to dashes.
     *
     * @param filename The filename to normalize
     * @returns The normalized filename with spaces and underscores replaced by dashes
     */
    normalizeFilename(u) {
      return u.replace(/ |_/g, "-");
    }
    constructor(u, i, o) {
      super({
        ...o,
        // GitLab might not support multiple range requests efficiently
        isUseMultipleRangeRequest: !1
      }), this.options = u, this.updater = i, this.cachedLatestVersion = null;
      const t = u.host || "gitlab.com";
      this.baseApiUrl = (0, f.newBaseUrl)(`https://${t}/api/v4`);
    }
    get channel() {
      const u = this.updater.channel || this.options.channel;
      return u == null ? this.getDefaultChannelName() : this.getCustomChannelName(u);
    }
    async getLatestVersion() {
      const u = new s.CancellationToken(), i = (0, f.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
      let o;
      try {
        const R = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, P = await this.httpRequest(i, R, u);
        if (!P)
          throw (0, s.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
        o = JSON.parse(P);
      } catch (R) {
        throw (0, s.newError)(`Unable to find latest release on GitLab (${i}): ${R.stack || R.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
      const n = o.tag_name;
      let t = null, r = "", d = null;
      const g = async (R) => {
        r = (0, f.getChannelFilename)(R);
        const P = o.assets.links.find((A) => A.name === r);
        if (!P)
          throw (0, s.newError)(`Cannot find ${r} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        d = new h.URL(P.direct_asset_url);
        const N = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
        try {
          const A = await this.httpRequest(d, N, u);
          if (!A)
            throw (0, s.newError)(`Empty response from ${d}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          return A;
        } catch (A) {
          throw A instanceof s.HttpError && A.statusCode === 404 ? (0, s.newError)(`Cannot find ${r} in the latest release artifacts (${d}): ${A.stack || A.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : A;
        }
      };
      try {
        t = await g(this.channel);
      } catch (R) {
        if (this.channel !== this.getDefaultChannelName())
          t = await g(this.getDefaultChannelName());
        else
          throw R;
      }
      if (!t)
        throw (0, s.newError)(`Unable to parse channel data from ${r}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
      const v = (0, c.parseUpdateInfo)(t, r, d);
      v.releaseName == null && (v.releaseName = o.name), v.releaseNotes == null && (v.releaseNotes = o.description || null);
      const p = /* @__PURE__ */ new Map();
      for (const R of o.assets.links)
        p.set(this.normalizeFilename(R.name), R.direct_asset_url);
      const w = {
        tag: n,
        assets: p,
        ...v
      };
      return this.cachedLatestVersion = w, w;
    }
    /**
     * Utility function to convert GitlabReleaseAsset to Map<string, string>
     * Maps asset names to their download URLs
     */
    convertAssetsToMap(u) {
      const i = /* @__PURE__ */ new Map();
      for (const o of u.links)
        i.set(this.normalizeFilename(o.name), o.direct_asset_url);
      return i;
    }
    /**
     * Find blockmap file URL in assets map for a specific filename
     */
    findBlockMapInAssets(u, i) {
      const o = [`${i}.blockmap`, `${this.normalizeFilename(i)}.blockmap`];
      for (const n of o) {
        const t = u.get(n);
        if (t)
          return new h.URL(t);
      }
      return null;
    }
    async fetchReleaseInfoByVersion(u) {
      const i = new s.CancellationToken(), o = [`v${u}`, u];
      for (const n of o) {
        const t = (0, f.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(n)}`, this.baseApiUrl);
        try {
          const r = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, d = await this.httpRequest(t, r, i);
          if (d)
            return JSON.parse(d);
        } catch (r) {
          if (r instanceof s.HttpError && r.statusCode === 404)
            continue;
          throw (0, s.newError)(`Unable to find release ${n} on GitLab (${t}): ${r.stack || r.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
        }
      }
      throw (0, s.newError)(`Unable to find release with version ${u} (tried: ${o.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
    }
    setAuthHeaderForToken(u) {
      const i = {};
      return u != null && (u.startsWith("Bearer") ? i.authorization = u : i["PRIVATE-TOKEN"] = u), i;
    }
    /**
     * Get version info for blockmap files, using cache when possible
     */
    async getVersionInfoForBlockMap(u) {
      if (this.cachedLatestVersion && this.cachedLatestVersion.version === u)
        return this.cachedLatestVersion.assets;
      const i = await this.fetchReleaseInfoByVersion(u);
      return i && i.assets ? this.convertAssetsToMap(i.assets) : null;
    }
    /**
     * Find blockmap URLs from version assets
     */
    async findBlockMapUrlsFromAssets(u, i, o) {
      let n = null, t = null;
      const r = await this.getVersionInfoForBlockMap(i);
      r && (n = this.findBlockMapInAssets(r, o));
      const d = await this.getVersionInfoForBlockMap(u);
      if (d) {
        const g = o.replace(new RegExp(m(i), "g"), u);
        t = this.findBlockMapInAssets(d, g);
      }
      return [t, n];
    }
    async getBlockMapFiles(u, i, o, n = null) {
      if (this.options.uploadTarget === "project_upload") {
        const t = u.pathname.split("/").pop() || "", [r, d] = await this.findBlockMapUrlsFromAssets(i, o, t);
        if (!d)
          throw (0, s.newError)(`Cannot find blockmap file for ${o} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        if (!r)
          throw (0, s.newError)(`Cannot find blockmap file for ${i} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        return [r, d];
      } else
        return super.getBlockMapFiles(u, i, o, n);
    }
    resolveFiles(u) {
      return (0, c.getFileList)(u).map((i) => {
        const n = [
          i.url,
          // Original filename
          this.normalizeFilename(i.url)
          // Normalized filename (spaces/underscores → dashes)
        ].find((r) => u.assets.has(r)), t = n ? u.assets.get(n) : void 0;
        if (!t)
          throw (0, s.newError)(`Cannot find asset "${i.url}" in GitLab release assets. Available assets: ${Array.from(u.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new h.URL(t),
          info: i
        };
      });
    }
    toString() {
      return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
    }
  };
  return hr.GitLabProvider = l, hr;
}
var pr = {}, wl;
function id() {
  if (wl) return pr;
  wl = 1, Object.defineProperty(pr, "__esModule", { value: !0 }), pr.KeygenProvider = void 0;
  const s = Ge(), h = Mt(), m = rt();
  let f = class extends m.Provider {
    constructor(l, e, u) {
      super({
        ...u,
        isUseMultipleRangeRequest: !1
      }), this.configuration = l, this.updater = e, this.defaultHostname = "api.keygen.sh";
      const i = this.configuration.host || this.defaultHostname;
      this.baseUrl = (0, h.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const l = new s.CancellationToken(), e = (0, h.getChannelFilename)(this.getCustomChannelName(this.channel)), u = (0, h.newUrlFromBase)(e, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const i = await this.httpRequest(u, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, l);
        return (0, m.parseUpdateInfo)(i, e, u);
      } catch (i) {
        throw (0, s.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(l) {
      return (0, m.resolveFiles)(l, this.baseUrl);
    }
    toString() {
      const { account: l, product: e, platform: u } = this.configuration;
      return `Keygen (account: ${l}, product: ${e}, platform: ${u}, channel: ${this.channel})`;
    }
  };
  return pr.KeygenProvider = f, pr;
}
var mr = {}, _l;
function ad() {
  if (_l) return mr;
  _l = 1, Object.defineProperty(mr, "__esModule", { value: !0 }), mr.PrivateGitHubProvider = void 0;
  const s = Ge(), h = Sa(), m = ke, f = At, c = Mt(), l = Pu(), e = rt();
  let u = class extends l.BaseGitHubProvider {
    constructor(o, n, t, r) {
      super(o, "api.github.com", r), this.updater = n, this.token = t;
    }
    createRequestOptions(o, n) {
      const t = super.createRequestOptions(o, n);
      return t.redirect = "manual", t;
    }
    async getLatestVersion() {
      const o = new s.CancellationToken(), n = (0, c.getChannelFilename)(this.getDefaultChannelName()), t = await this.getLatestVersionInfo(o), r = t.assets.find((v) => v.name === n);
      if (r == null)
        throw (0, s.newError)(`Cannot find ${n} in the release ${t.html_url || t.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const d = new f.URL(r.url);
      let g;
      try {
        g = (0, h.load)(await this.httpRequest(d, this.configureHeaders("application/octet-stream"), o));
      } catch (v) {
        throw v instanceof s.HttpError && v.statusCode === 404 ? (0, s.newError)(`Cannot find ${n} in the latest release artifacts (${d}): ${v.stack || v.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : v;
      }
      return g.assets = t.assets, g;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(o) {
      return {
        accept: o,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(o) {
      const n = this.updater.allowPrerelease;
      let t = this.basePath;
      n || (t = `${t}/latest`);
      const r = (0, c.newUrlFromBase)(t, this.baseUrl);
      try {
        const d = JSON.parse(await this.httpRequest(r, this.configureHeaders("application/vnd.github.v3+json"), o));
        return n ? d.find((g) => g.prerelease) || d[0] : d;
      } catch (d) {
        throw (0, s.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${d.stack || d.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(o) {
      return (0, e.getFileList)(o).map((n) => {
        const t = m.posix.basename(n.url).replace(/ /g, "-"), r = o.assets.find((d) => d != null && d.name === t);
        if (r == null)
          throw (0, s.newError)(`Cannot find asset "${t}" in: ${JSON.stringify(o.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new f.URL(r.url),
          info: n
        };
      });
    }
  };
  return mr.PrivateGitHubProvider = u, mr;
}
var Sl;
function sd() {
  if (Sl) return fr;
  Sl = 1, Object.defineProperty(fr, "__esModule", { value: !0 }), fr.isUrlProbablySupportMultiRangeRequests = u, fr.createClient = i;
  const s = Ge(), h = rd(), m = bu(), f = Pu(), c = nd(), l = id(), e = ad();
  function u(o) {
    return !o.includes("s3.amazonaws.com");
  }
  function i(o, n, t) {
    if (typeof o == "string")
      throw (0, s.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const r = o.provider;
    switch (r) {
      case "github": {
        const d = o, g = (d.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || d.token;
        return g == null ? new f.GitHubProvider(d, n, t) : new e.PrivateGitHubProvider(d, n, g, t);
      }
      case "bitbucket":
        return new h.BitbucketProvider(o, n, t);
      case "gitlab":
        return new c.GitLabProvider(o, n, t);
      case "keygen":
        return new l.KeygenProvider(o, n, t);
      case "s3":
      case "spaces":
        return new m.GenericProvider({
          provider: "generic",
          url: (0, s.getS3LikeProviderBaseUrl)(o),
          channel: o.channel || null
        }, n, {
          ...t,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const d = o;
        return new m.GenericProvider(d, n, {
          ...t,
          isUseMultipleRangeRequest: d.useMultipleRangeRequest !== !1 && u(d.url)
        });
      }
      case "custom": {
        const d = o, g = d.updateProvider;
        if (!g)
          throw (0, s.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new g(d, n, t);
      }
      default:
        throw (0, s.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return fr;
}
var gr = {}, yr = {}, Yt = {}, Xt = {}, Rl;
function Da() {
  if (Rl) return Xt;
  Rl = 1, Object.defineProperty(Xt, "__esModule", { value: !0 }), Xt.OperationKind = void 0, Xt.computeOperations = h;
  var s;
  (function(e) {
    e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
  })(s || (Xt.OperationKind = s = {}));
  function h(e, u, i) {
    const o = l(e.files), n = l(u.files);
    let t = null;
    const r = u.files[0], d = [], g = r.name, v = o.get(g);
    if (v == null)
      throw new Error(`no file ${g} in old blockmap`);
    const p = n.get(g);
    let w = 0;
    const { checksumToOffset: R, checksumToOldSize: P } = c(o.get(g), v.offset, i);
    let N = r.offset;
    for (let A = 0; A < p.checksums.length; N += p.sizes[A], A++) {
      const O = p.sizes[A], b = p.checksums[A];
      let S = R.get(b);
      S != null && P.get(b) !== O && (i.warn(`Checksum ("${b}") matches, but size differs (old: ${P.get(b)}, new: ${O})`), S = void 0), S === void 0 ? (w++, t != null && t.kind === s.DOWNLOAD && t.end === N ? t.end += O : (t = {
        kind: s.DOWNLOAD,
        start: N,
        end: N + O
        // oldBlocks: null,
      }, f(t, d, b, A))) : t != null && t.kind === s.COPY && t.end === S ? t.end += O : (t = {
        kind: s.COPY,
        start: S,
        end: S + O
        // oldBlocks: [checksum]
      }, f(t, d, b, A));
    }
    return w > 0 && i.info(`File${r.name === "file" ? "" : " " + r.name} has ${w} changed blocks`), d;
  }
  const m = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function f(e, u, i, o) {
    if (m && u.length !== 0) {
      const n = u[u.length - 1];
      if (n.kind === e.kind && e.start < n.end && e.start > n.start) {
        const t = [n.start, n.end, e.start, e.end].reduce((r, d) => r < d ? r : d);
        throw new Error(`operation (block index: ${o}, checksum: ${i}, kind: ${s[e.kind]}) overlaps previous operation (checksum: ${i}):
abs: ${n.start} until ${n.end} and ${e.start} until ${e.end}
rel: ${n.start - t} until ${n.end - t} and ${e.start - t} until ${e.end - t}`);
      }
    }
    u.push(e);
  }
  function c(e, u, i) {
    const o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    let t = u;
    for (let r = 0; r < e.checksums.length; r++) {
      const d = e.checksums[r], g = e.sizes[r], v = n.get(d);
      if (v === void 0)
        o.set(d, t), n.set(d, g);
      else if (i.debug != null) {
        const p = v === g ? "(same size)" : `(size: ${v}, this size: ${g})`;
        i.debug(`${d} duplicated in blockmap ${p}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      t += g;
    }
    return { checksumToOffset: o, checksumToOldSize: n };
  }
  function l(e) {
    const u = /* @__PURE__ */ new Map();
    for (const i of e)
      u.set(i.name, i);
    return u;
  }
  return Xt;
}
var Cl;
function Du() {
  if (Cl) return Yt;
  Cl = 1, Object.defineProperty(Yt, "__esModule", { value: !0 }), Yt.DataSplitter = void 0, Yt.copyData = e;
  const s = Ge(), h = Ct, m = Or, f = Da(), c = Buffer.from(`\r
\r
`);
  var l;
  (function(i) {
    i[i.INIT = 0] = "INIT", i[i.HEADER = 1] = "HEADER", i[i.BODY = 2] = "BODY";
  })(l || (l = {}));
  function e(i, o, n, t, r) {
    const d = (0, h.createReadStream)("", {
      fd: n,
      autoClose: !1,
      start: i.start,
      // end is inclusive
      end: i.end - 1
    });
    d.on("error", t), d.once("end", r), d.pipe(o, {
      end: !1
    });
  }
  let u = class extends m.Writable {
    constructor(o, n, t, r, d, g, v, p) {
      super(), this.out = o, this.options = n, this.partIndexToTaskIndex = t, this.partIndexToLength = d, this.finishHandler = g, this.grandTotalBytes = v, this.onProgress = p, this.start = Date.now(), this.nextUpdate = this.start + 1e3, this.transferred = 0, this.delta = 0, this.partIndex = -1, this.headerListBuffer = null, this.readState = l.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = r.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(o, n, t) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${o.length} bytes`);
        return;
      }
      this.handleData(o).then(() => {
        if (this.onProgress) {
          const r = Date.now();
          (r >= this.nextUpdate || this.transferred === this.grandTotalBytes) && this.grandTotalBytes && (r - this.start) / 1e3 && (this.nextUpdate = r + 1e3, this.onProgress({
            total: this.grandTotalBytes,
            delta: this.delta,
            transferred: this.transferred,
            percent: this.transferred / this.grandTotalBytes * 100,
            bytesPerSecond: Math.round(this.transferred / ((r - this.start) / 1e3))
          }), this.delta = 0);
        }
        t();
      }).catch(t);
    }
    async handleData(o) {
      let n = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, s.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const t = Math.min(this.ignoreByteCount, o.length);
        this.ignoreByteCount -= t, n = t;
      } else if (this.remainingPartDataCount > 0) {
        const t = Math.min(this.remainingPartDataCount, o.length);
        this.remainingPartDataCount -= t, await this.processPartData(o, 0, t), n = t;
      }
      if (n !== o.length) {
        if (this.readState === l.HEADER) {
          const t = this.searchHeaderListEnd(o, n);
          if (t === -1)
            return;
          n = t, this.readState = l.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === l.BODY)
            this.readState = l.INIT;
          else {
            this.partIndex++;
            let g = this.partIndexToTaskIndex.get(this.partIndex);
            if (g == null)
              if (this.isFinished)
                g = this.options.end;
              else
                throw (0, s.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const v = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (v < g)
              await this.copyExistingData(v, g);
            else if (v > g)
              throw (0, s.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (n = this.searchHeaderListEnd(o, n), n === -1) {
              this.readState = l.HEADER;
              return;
            }
          }
          const t = this.partIndexToLength[this.partIndex], r = n + t, d = Math.min(r, o.length);
          if (await this.processPartStarted(o, n, d), this.remainingPartDataCount = t - (d - n), this.remainingPartDataCount > 0)
            return;
          if (n = r + this.boundaryLength, n >= o.length) {
            this.ignoreByteCount = this.boundaryLength - (o.length - r);
            return;
          }
        }
      }
    }
    copyExistingData(o, n) {
      return new Promise((t, r) => {
        const d = () => {
          if (o === n) {
            t();
            return;
          }
          const g = this.options.tasks[o];
          if (g.kind !== f.OperationKind.COPY) {
            r(new Error("Task kind must be COPY"));
            return;
          }
          e(g, this.out, this.options.oldFileFd, r, () => {
            o++, d();
          });
        };
        d();
      });
    }
    searchHeaderListEnd(o, n) {
      const t = o.indexOf(c, n);
      if (t !== -1)
        return t + c.length;
      const r = n === 0 ? o : o.slice(n);
      return this.headerListBuffer == null ? this.headerListBuffer = r : this.headerListBuffer = Buffer.concat([this.headerListBuffer, r]), -1;
    }
    onPartEnd() {
      const o = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== o)
        throw (0, s.newError)(`Expected length: ${o} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(o, n, t) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(o, n, t);
    }
    processPartData(o, n, t) {
      this.actualPartLength += t - n, this.transferred += t - n, this.delta += t - n;
      const r = this.out;
      return r.write(n === 0 && o.length === t ? o : o.slice(n, t)) ? Promise.resolve() : new Promise((d, g) => {
        r.on("error", g), r.once("drain", () => {
          r.removeListener("error", g), d();
        });
      });
    }
  };
  return Yt.DataSplitter = u, Yt;
}
var vr = {}, Al;
function od() {
  if (Al) return vr;
  Al = 1, Object.defineProperty(vr, "__esModule", { value: !0 }), vr.executeTasksUsingMultipleRangeRequests = f, vr.checkIsRangesSupported = l;
  const s = Ge(), h = Du(), m = Da();
  function f(e, u, i, o, n) {
    const t = (r) => {
      if (r >= u.length) {
        e.fileMetadataBuffer != null && i.write(e.fileMetadataBuffer), i.end();
        return;
      }
      const d = r + 1e3;
      c(e, {
        tasks: u,
        start: r,
        end: Math.min(u.length, d),
        oldFileFd: o
      }, i, () => t(d), n);
    };
    return t;
  }
  function c(e, u, i, o, n) {
    let t = "bytes=", r = 0, d = 0;
    const g = /* @__PURE__ */ new Map(), v = [];
    for (let R = u.start; R < u.end; R++) {
      const P = u.tasks[R];
      P.kind === m.OperationKind.DOWNLOAD && (t += `${P.start}-${P.end - 1}, `, g.set(r, R), r++, v.push(P.end - P.start), d += P.end - P.start);
    }
    if (r <= 1) {
      const R = (P) => {
        if (P >= u.end) {
          o();
          return;
        }
        const N = u.tasks[P++];
        if (N.kind === m.OperationKind.COPY)
          (0, h.copyData)(N, i, u.oldFileFd, n, () => R(P));
        else {
          const A = e.createRequestOptions();
          A.headers.Range = `bytes=${N.start}-${N.end - 1}`;
          const O = e.httpExecutor.createRequest(A, (b) => {
            b.on("error", n), l(b, n) && (b.pipe(i, {
              end: !1
            }), b.once("end", () => R(P)));
          });
          e.httpExecutor.addErrorAndTimeoutHandlers(O, n), O.end();
        }
      };
      R(u.start);
      return;
    }
    const p = e.createRequestOptions();
    p.headers.Range = t.substring(0, t.length - 2);
    const w = e.httpExecutor.createRequest(p, (R) => {
      if (!l(R, n))
        return;
      const P = (0, s.safeGetHeader)(R, "content-type"), N = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(P);
      if (N == null) {
        n(new Error(`Content-Type "multipart/byteranges" is expected, but got "${P}"`));
        return;
      }
      const A = new h.DataSplitter(i, u, g, N[1] || N[2], v, o, d, e.options.onProgress);
      A.on("error", n), R.pipe(A), R.on("end", () => {
        setTimeout(() => {
          w.abort(), n(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    e.httpExecutor.addErrorAndTimeoutHandlers(w, n), w.end();
  }
  function l(e, u) {
    if (e.statusCode >= 400)
      return u((0, s.createHttpError)(e)), !1;
    if (e.statusCode !== 206) {
      const i = (0, s.safeGetHeader)(e, "accept-ranges");
      if (i == null || i === "none")
        return u(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
    }
    return !0;
  }
  return vr;
}
var Er = {}, Tl;
function ld() {
  if (Tl) return Er;
  Tl = 1, Object.defineProperty(Er, "__esModule", { value: !0 }), Er.ProgressDifferentialDownloadCallbackTransform = void 0;
  const s = Or;
  var h;
  (function(f) {
    f[f.COPY = 0] = "COPY", f[f.DOWNLOAD = 1] = "DOWNLOAD";
  })(h || (h = {}));
  let m = class extends s.Transform {
    constructor(c, l, e) {
      super(), this.progressDifferentialDownloadInfo = c, this.cancellationToken = l, this.onProgress = e, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = h.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(c, l, e) {
      if (this.cancellationToken.cancelled) {
        e(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == h.COPY) {
        e(null, c);
        return;
      }
      this.transferred += c.length, this.delta += c.length;
      const u = Date.now();
      u >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = u + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((u - this.start) / 1e3))
      }), this.delta = 0), e(null, c);
    }
    beginFileCopy() {
      this.operationType = h.COPY;
    }
    beginRangeDownload() {
      this.operationType = h.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
    }
    endRangeDownload() {
      this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      });
    }
    // Called when we are 100% done with the connection/download
    _flush(c) {
      if (this.cancellationToken.cancelled) {
        c(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, c(null);
    }
  };
  return Er.ProgressDifferentialDownloadCallbackTransform = m, Er;
}
var bl;
function Ou() {
  if (bl) return yr;
  bl = 1, Object.defineProperty(yr, "__esModule", { value: !0 }), yr.DifferentialDownloader = void 0;
  const s = Ge(), h = /* @__PURE__ */ Tt(), m = Ct, f = Du(), c = At, l = Da(), e = od(), u = ld();
  let i = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(r, d, g) {
      this.blockAwareFileInfo = r, this.httpExecutor = d, this.options = g, this.fileMetadataBuffer = null, this.logger = g.logger;
    }
    createRequestOptions() {
      const r = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, s.configureRequestUrl)(this.options.newUrl, r), (0, s.configureRequestOptions)(r), r;
    }
    doDownload(r, d) {
      if (r.version !== d.version)
        throw new Error(`version is different (${r.version} - ${d.version}), full download is required`);
      const g = this.logger, v = (0, l.computeOperations)(r, d, g);
      g.debug != null && g.debug(JSON.stringify(v, null, 2));
      let p = 0, w = 0;
      for (const P of v) {
        const N = P.end - P.start;
        P.kind === l.OperationKind.DOWNLOAD ? p += N : w += N;
      }
      const R = this.blockAwareFileInfo.size;
      if (p + w + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== R)
        throw new Error(`Internal error, size mismatch: downloadSize: ${p}, copySize: ${w}, newSize: ${R}`);
      return g.info(`Full: ${o(R)}, To download: ${o(p)} (${Math.round(p / (R / 100))}%)`), this.downloadFile(v);
    }
    downloadFile(r) {
      const d = [], g = () => Promise.all(d.map((v) => (0, h.close)(v.descriptor).catch((p) => {
        this.logger.error(`cannot close file "${v.path}": ${p}`);
      })));
      return this.doDownloadFile(r, d).then(g).catch((v) => g().catch((p) => {
        try {
          this.logger.error(`cannot close files: ${p}`);
        } catch (w) {
          try {
            console.error(w);
          } catch {
          }
        }
        throw v;
      }).then(() => {
        throw v;
      }));
    }
    async doDownloadFile(r, d) {
      const g = await (0, h.open)(this.options.oldFile, "r");
      d.push({ descriptor: g, path: this.options.oldFile });
      const v = await (0, h.open)(this.options.newFile, "w");
      d.push({ descriptor: v, path: this.options.newFile });
      const p = (0, m.createWriteStream)(this.options.newFile, { fd: v });
      await new Promise((w, R) => {
        const P = [];
        let N;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const $ = [];
          let M = 0;
          for (const F of r)
            F.kind === l.OperationKind.DOWNLOAD && ($.push(F.end - F.start), M += F.end - F.start);
          const L = {
            expectedByteCounts: $,
            grandTotal: M
          };
          N = new u.ProgressDifferentialDownloadCallbackTransform(L, this.options.cancellationToken, this.options.onProgress), P.push(N);
        }
        const A = new s.DigestTransform(this.blockAwareFileInfo.sha512);
        A.isValidateOnEnd = !1, P.push(A), p.on("finish", () => {
          p.close(() => {
            d.splice(1, 1);
            try {
              A.validate();
            } catch ($) {
              R($);
              return;
            }
            w(void 0);
          });
        }), P.push(p);
        let O = null;
        for (const $ of P)
          $.on("error", R), O == null ? O = $ : O = O.pipe($);
        const b = P[0];
        let S;
        if (this.options.isUseMultipleRangeRequest) {
          S = (0, e.executeTasksUsingMultipleRangeRequests)(this, r, b, g, R), S(0);
          return;
        }
        let D = 0, _ = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const k = this.createRequestOptions();
        k.redirect = "manual", S = ($) => {
          var M, L;
          if ($ >= r.length) {
            this.fileMetadataBuffer != null && b.write(this.fileMetadataBuffer), b.end();
            return;
          }
          const F = r[$++];
          if (F.kind === l.OperationKind.COPY) {
            N && N.beginFileCopy(), (0, f.copyData)(F, b, g, R, () => S($));
            return;
          }
          const H = `bytes=${F.start}-${F.end - 1}`;
          k.headers.range = H, (L = (M = this.logger) === null || M === void 0 ? void 0 : M.debug) === null || L === void 0 || L.call(M, `download range: ${H}`), N && N.beginRangeDownload();
          const x = this.httpExecutor.createRequest(k, (G) => {
            G.on("error", R), G.on("aborted", () => {
              R(new Error("response has been aborted by the server"));
            }), G.statusCode >= 400 && R((0, s.createHttpError)(G)), G.pipe(b, {
              end: !1
            }), G.once("end", () => {
              N && N.endRangeDownload(), ++D === 100 ? (D = 0, setTimeout(() => S($), 1e3)) : S($);
            });
          });
          x.on("redirect", (G, z, ee) => {
            this.logger.info(`Redirect to ${n(ee)}`), _ = ee, (0, s.configureRequestUrl)(new c.URL(_), k), x.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(x, R), x.end();
        }, S(0);
      });
    }
    async readRemoteBytes(r, d) {
      const g = Buffer.allocUnsafe(d + 1 - r), v = this.createRequestOptions();
      v.headers.range = `bytes=${r}-${d}`;
      let p = 0;
      if (await this.request(v, (w) => {
        w.copy(g, p), p += w.length;
      }), p !== g.length)
        throw new Error(`Received data length ${p} is not equal to expected ${g.length}`);
      return g;
    }
    request(r, d) {
      return new Promise((g, v) => {
        const p = this.httpExecutor.createRequest(r, (w) => {
          (0, e.checkIsRangesSupported)(w, v) && (w.on("error", v), w.on("aborted", () => {
            v(new Error("response has been aborted by the server"));
          }), w.on("data", d), w.on("end", () => g()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(p, v), p.end();
      });
    }
  };
  yr.DifferentialDownloader = i;
  function o(t, r = " KB") {
    return new Intl.NumberFormat("en").format((t / 1024).toFixed(2)) + r;
  }
  function n(t) {
    const r = t.indexOf("?");
    return r < 0 ? t : t.substring(0, r);
  }
  return yr;
}
var Pl;
function ud() {
  if (Pl) return gr;
  Pl = 1, Object.defineProperty(gr, "__esModule", { value: !0 }), gr.GenericDifferentialDownloader = void 0;
  const s = Ou();
  let h = class extends s.DifferentialDownloader {
    download(f, c) {
      return this.doDownload(f, c);
    }
  };
  return gr.GenericDifferentialDownloader = h, gr;
}
var pa = {}, Dl;
function Bt() {
  return Dl || (Dl = 1, (function(s) {
    Object.defineProperty(s, "__esModule", { value: !0 }), s.UpdaterSignal = s.UPDATE_DOWNLOADED = s.DOWNLOAD_PROGRESS = s.CancellationToken = void 0, s.addHandler = f;
    const h = Ge();
    Object.defineProperty(s, "CancellationToken", { enumerable: !0, get: function() {
      return h.CancellationToken;
    } }), s.DOWNLOAD_PROGRESS = "download-progress", s.UPDATE_DOWNLOADED = "update-downloaded";
    class m {
      constructor(l) {
        this.emitter = l;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(l) {
        f(this.emitter, "login", l);
      }
      progress(l) {
        f(this.emitter, s.DOWNLOAD_PROGRESS, l);
      }
      updateDownloaded(l) {
        f(this.emitter, s.UPDATE_DOWNLOADED, l);
      }
      updateCancelled(l) {
        f(this.emitter, "update-cancelled", l);
      }
    }
    s.UpdaterSignal = m;
    function f(c, l, e) {
      c.on(l, e);
    }
  })(pa)), pa;
}
var Ol;
function Oa() {
  if (Ol) return Ft;
  Ol = 1, Object.defineProperty(Ft, "__esModule", { value: !0 }), Ft.NoOpLogger = Ft.AppUpdater = void 0;
  const s = Ge(), h = Ir, m = nn, f = Kl, c = /* @__PURE__ */ Tt(), l = Sa(), e = Tf(), u = ke, i = Au(), o = Qf(), n = ed(), t = td(), r = bu(), d = sd(), g = Zl, v = ud(), p = Bt();
  let w = class Iu extends f.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(A) {
      if (this._channel != null) {
        if (typeof A != "string")
          throw (0, s.newError)(`Channel must be a string, but got: ${A}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (A.length === 0)
          throw (0, s.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = A, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(A) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: A
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, t.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(A) {
      this._logger = A ?? new P();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(A) {
      this.clientPromise = null, this._appUpdateConfigPath = A, this.configOnDisk = new e.Lazy(() => this.loadUpdateConfig());
    }
    /**
     * Allows developer to override default logic for determining if an update is supported.
     * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
     */
    get isUpdateSupported() {
      return this._isUpdateSupported;
    }
    set isUpdateSupported(A) {
      A && (this._isUpdateSupported = A);
    }
    /**
     * Allows developer to override default logic for determining if the user is below the rollout threshold.
     * The default logic compares the staging percentage with numerical representation of user ID.
     * An override can define custom logic, or bypass it if needed.
     */
    get isUserWithinRollout() {
      return this._isUserWithinRollout;
    }
    set isUserWithinRollout(A) {
      A && (this._isUserWithinRollout = A);
    }
    constructor(A, O) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new p.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (D) => this.checkIfUpdateSupported(D), this._isUserWithinRollout = (D) => this.isStagingMatch(D), this.clientPromise = null, this.stagingUserIdPromise = new e.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new e.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (D) => {
        this._logger.error(`Error: ${D.stack || D.message}`);
      }), O == null ? (this.app = new n.ElectronAppAdapter(), this.httpExecutor = new t.ElectronHttpExecutor((D, _) => this.emit("login", D, _))) : (this.app = O, this.httpExecutor = null);
      const b = this.app.version, S = (0, i.parse)(b);
      if (S == null)
        throw (0, s.newError)(`App version is not a valid semver version: "${b}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = S, this.allowPrerelease = R(S), A != null && (this.setFeedURL(A), typeof A != "string" && A.requestHeaders && (this.requestHeaders = A.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(A) {
      const O = this.createProviderRuntimeOptions();
      let b;
      typeof A == "string" ? b = new r.GenericProvider({ provider: "generic", url: A }, this, {
        ...O,
        isUseMultipleRangeRequest: (0, d.isUrlProbablySupportMultiRangeRequests)(A)
      }) : b = (0, d.createClient)(A, this, O), this.clientPromise = Promise.resolve(b);
    }
    /**
     * Asks the server whether there is an update.
     * @returns null if the updater is disabled, otherwise info about the latest version
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let A = this.checkForUpdatesPromise;
      if (A != null)
        return this._logger.info("Checking for update (already in progress)"), A;
      const O = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), A = this.doCheckForUpdates().then((b) => (O(), b)).catch((b) => {
        throw O(), this.emit("error", b, `Cannot check for updates: ${(b.stack || b).toString()}`), b;
      }), this.checkForUpdatesPromise = A, A;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(A) {
      return this.checkForUpdates().then((O) => O?.downloadPromise ? (O.downloadPromise.then(() => {
        const b = Iu.formatDownloadNotification(O.updateInfo.version, this.app.name, A);
        new kt.Notification(b).show();
      }), O) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), O));
    }
    static formatDownloadNotification(A, O, b) {
      return b == null && (b = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), b = {
        title: b.title.replace("{appName}", O).replace("{version}", A),
        body: b.body.replace("{appName}", O).replace("{version}", A)
      }, b;
    }
    async isStagingMatch(A) {
      const O = A.stagingPercentage;
      let b = O;
      if (b == null)
        return !0;
      if (b = parseInt(b, 10), isNaN(b))
        return this._logger.warn(`Staging percentage is NaN: ${O}`), !0;
      b = b / 100;
      const S = await this.stagingUserIdPromise.value, _ = s.UUID.parse(S).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${b}, percentage: ${_}, user id: ${S}`), _ < b;
    }
    computeFinalHeaders(A) {
      return this.requestHeaders != null && Object.assign(A, this.requestHeaders), A;
    }
    async isUpdateAvailable(A) {
      const O = (0, i.parse)(A.version);
      if (O == null)
        throw (0, s.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${A.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const b = this.currentVersion;
      if ((0, i.eq)(O, b) || !await Promise.resolve(this.isUpdateSupported(A)) || !await Promise.resolve(this.isUserWithinRollout(A)))
        return !1;
      const D = (0, i.gt)(O, b), _ = (0, i.lt)(O, b);
      return D ? !0 : this.allowDowngrade && _;
    }
    checkIfUpdateSupported(A) {
      const O = A?.minimumSystemVersion, b = (0, m.release)();
      if (O)
        try {
          if ((0, i.lt)(b, O))
            return this._logger.info(`Current OS version ${b} is less than the minimum OS version required ${O} for version ${b}`), !1;
        } catch (S) {
          this._logger.warn(`Failed to compare current OS version(${b}) with minimum OS version(${O}): ${(S.message || S).toString()}`);
        }
      return !0;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((b) => (0, d.createClient)(b, this, this.createProviderRuntimeOptions())));
      const A = await this.clientPromise, O = await this.stagingUserIdPromise.value;
      return A.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": O })), {
        info: await A.getLatestVersion(),
        provider: A
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const A = await this.getUpdateInfoAndProvider(), O = A.info;
      if (!await this.isUpdateAvailable(O))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${O.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", O), {
          isUpdateAvailable: !1,
          versionInfo: O,
          updateInfo: O
        };
      this.updateInfoAndProvider = A, this.onUpdateAvailable(O);
      const b = new s.CancellationToken();
      return {
        isUpdateAvailable: !0,
        versionInfo: O,
        updateInfo: O,
        cancellationToken: b,
        downloadPromise: this.autoDownload ? this.downloadUpdate(b) : null
      };
    }
    onUpdateAvailable(A) {
      this._logger.info(`Found version ${A.version} (url: ${(0, s.asArray)(A.files).map((O) => O.url).join(", ")})`), this.emit("update-available", A);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(A = new s.CancellationToken()) {
      const O = this.updateInfoAndProvider;
      if (O == null) {
        const S = new Error("Please check update first");
        return this.dispatchError(S), Promise.reject(S);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, s.asArray)(O.info.files).map((S) => S.url).join(", ")}`);
      const b = (S) => {
        if (!(S instanceof s.CancellationError))
          try {
            this.dispatchError(S);
          } catch (D) {
            this._logger.warn(`Cannot dispatch error event: ${D.stack || D}`);
          }
        return S;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: O,
        requestHeaders: this.computeRequestHeaders(O.provider),
        cancellationToken: A,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((S) => {
        throw b(S);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(A) {
      this.emit("error", A, (A.stack || A).toString());
    }
    dispatchUpdateDownloaded(A) {
      this.emit(p.UPDATE_DOWNLOADED, A);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, l.load)(await (0, c.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(A) {
      const O = A.fileExtraDownloadHeaders;
      if (O != null) {
        const b = this.requestHeaders;
        return b == null ? O : {
          ...O,
          ...b
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const A = u.join(this.app.userDataPath, ".updaterId");
      try {
        const b = await (0, c.readFile)(A, "utf-8");
        if (s.UUID.check(b))
          return b;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${b}`);
      } catch (b) {
        b.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${b}`);
      }
      const O = s.UUID.v5((0, h.randomBytes)(4096), s.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${O}`);
      try {
        await (0, c.outputFile)(A, O);
      } catch (b) {
        this._logger.warn(`Couldn't write out staging user ID: ${b}`);
      }
      return O;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const A = this.requestHeaders;
      if (A == null)
        return !0;
      for (const O of Object.keys(A)) {
        const b = O.toLowerCase();
        if (b === "authorization" || b === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let A = this.downloadedUpdateHelper;
      if (A == null) {
        const O = (await this.configOnDisk.value).updaterCacheDirName, b = this._logger;
        O == null && b.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const S = u.join(this.app.baseCachePath, O || this.app.name);
        b.debug != null && b.debug(`updater cache dir: ${S}`), A = new o.DownloadedUpdateHelper(S), this.downloadedUpdateHelper = A;
      }
      return A;
    }
    async executeDownload(A) {
      const O = A.fileInfo, b = {
        headers: A.downloadUpdateOptions.requestHeaders,
        cancellationToken: A.downloadUpdateOptions.cancellationToken,
        sha2: O.info.sha2,
        sha512: O.info.sha512
      };
      this.listenerCount(p.DOWNLOAD_PROGRESS) > 0 && (b.onProgress = (Z) => this.emit(p.DOWNLOAD_PROGRESS, Z));
      const S = A.downloadUpdateOptions.updateInfoAndProvider.info, D = S.version, _ = O.packageInfo;
      function k() {
        const Z = decodeURIComponent(A.fileInfo.url.pathname);
        return Z.toLowerCase().endsWith(`.${A.fileExtension.toLowerCase()}`) ? u.basename(Z) : A.fileInfo.info.url;
      }
      const $ = await this.getOrCreateDownloadHelper(), M = $.cacheDirForPendingUpdate;
      await (0, c.mkdir)(M, { recursive: !0 });
      const L = k();
      let F = u.join(M, L);
      const H = _ == null ? null : u.join(M, `package-${D}${u.extname(_.path) || ".7z"}`), x = async (Z) => {
        await $.setDownloadedFile(F, H, S, O, L, Z), await A.done({
          ...S,
          downloadedFile: F
        });
        const we = u.join(M, "current.blockmap");
        return await (0, c.pathExists)(we) && await (0, c.copyFile)(we, u.join($.cacheDir, "current.blockmap")), H == null ? [F] : [F, H];
      }, G = this._logger, z = await $.validateDownloadedPath(F, S, O, G);
      if (z != null)
        return F = z, await x(!1);
      const ee = async () => (await $.clear().catch(() => {
      }), await (0, c.unlink)(F).catch(() => {
      })), ge = await (0, o.createTempUpdateFile)(`temp-${L}`, M, G);
      try {
        await A.task(ge, b, H, ee), await (0, s.retry)(() => (0, c.rename)(ge, F), {
          retries: 60,
          interval: 500,
          shouldRetry: (Z) => Z instanceof Error && /^EBUSY:/.test(Z.message) ? !0 : (G.warn(`Cannot rename temp file to final file: ${Z.message || Z.stack}`), !1)
        });
      } catch (Z) {
        throw await ee(), Z instanceof s.CancellationError && (G.info("cancelled"), this.emit("update-cancelled", S)), Z;
      }
      return G.info(`New version ${D} has been downloaded to ${F}`), await x(!0);
    }
    async differentialDownloadInstaller(A, O, b, S, D) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const _ = O.updateInfoAndProvider.provider, k = await _.getBlockMapFiles(A.url, this.app.version, O.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
        this._logger.info(`Download block maps (old: "${k[0]}", new: ${k[1]})`);
        const $ = async (G) => {
          const z = await this.httpExecutor.downloadToBuffer(G, {
            headers: O.requestHeaders,
            cancellationToken: O.cancellationToken
          });
          if (z == null || z.length === 0)
            throw new Error(`Blockmap "${G.href}" is empty`);
          try {
            return JSON.parse((0, g.gunzipSync)(z).toString());
          } catch (ee) {
            throw new Error(`Cannot parse blockmap "${G.href}", error: ${ee}`);
          }
        }, M = {
          newUrl: A.url,
          oldFile: u.join(this.downloadedUpdateHelper.cacheDir, D),
          logger: this._logger,
          newFile: b,
          isUseMultipleRangeRequest: _.isUseMultipleRangeRequest,
          requestHeaders: O.requestHeaders,
          cancellationToken: O.cancellationToken
        };
        this.listenerCount(p.DOWNLOAD_PROGRESS) > 0 && (M.onProgress = (G) => this.emit(p.DOWNLOAD_PROGRESS, G));
        const L = async (G, z) => {
          const ee = u.join(z, "current.blockmap");
          await (0, c.outputFile)(ee, (0, g.gzipSync)(JSON.stringify(G)));
        }, F = async (G) => {
          const z = u.join(G, "current.blockmap");
          try {
            if (await (0, c.pathExists)(z))
              return JSON.parse((0, g.gunzipSync)(await (0, c.readFile)(z)).toString());
          } catch (ee) {
            this._logger.warn(`Cannot parse blockmap "${z}", error: ${ee}`);
          }
          return null;
        }, H = await $(k[1]);
        await L(H, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
        let x = await F(this.downloadedUpdateHelper.cacheDir);
        return x == null && (x = await $(k[0])), await new v.GenericDifferentialDownloader(A.info, this.httpExecutor, M).download(x, H), !1;
      } catch (_) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${_.stack || _}`), this._testOnlyOptions != null)
          throw _;
        return !0;
      }
    }
  };
  Ft.AppUpdater = w;
  function R(N) {
    const A = (0, i.prerelease)(N);
    return A != null && A.length > 0;
  }
  class P {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(A) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(A) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(A) {
    }
  }
  return Ft.NoOpLogger = P, Ft;
}
var Il;
function dn() {
  if (Il) return ar;
  Il = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.BaseUpdater = void 0;
  const s = rn, h = Oa();
  let m = class extends h.AppUpdater {
    constructor(c, l) {
      super(c, l), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(c = !1, l = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(c, c ? l : this.autoRunAppAfterInstall) ? setImmediate(() => {
        kt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(c) {
      return super.executeDownload({
        ...c,
        done: (l) => (this.dispatchUpdateDownloaded(l), this.addQuitHandler(), Promise.resolve())
      });
    }
    get installerPath() {
      return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
    }
    // must be sync (because quit even handler is not async)
    install(c = !1, l = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const e = this.downloadedUpdateHelper, u = this.installerPath, i = e == null ? null : e.downloadedFileInfo;
      if (u == null || i == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${c}, isForceRunAfter: ${l}`), this.doInstall({
          isSilent: c,
          isForceRunAfter: l,
          isAdminRightsRequired: i.isAdminRightsRequired
        });
      } catch (o) {
        return this.dispatchError(o), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((c) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (c !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${c}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    spawnSyncLog(c, l = [], e = {}) {
      this._logger.info(`Executing: ${c} with args: ${l}`);
      const u = (0, s.spawnSync)(c, l, {
        env: { ...process.env, ...e },
        encoding: "utf-8",
        shell: !0
      }), { error: i, status: o, stdout: n, stderr: t } = u;
      if (i != null)
        throw this._logger.error(t), i;
      if (o != null && o !== 0)
        throw this._logger.error(t), new Error(`Command ${c} exited with code ${o}`);
      return n.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(c, l = [], e = void 0, u = "ignore") {
      return this._logger.info(`Executing: ${c} with args: ${l}`), new Promise((i, o) => {
        try {
          const n = { stdio: u, env: e, detached: !0 }, t = (0, s.spawn)(c, l, n);
          t.on("error", (r) => {
            o(r);
          }), t.unref(), t.pid !== void 0 && i(!0);
        } catch (n) {
          o(n);
        }
      });
    }
  };
  return ar.BaseUpdater = m, ar;
}
var wr = {}, _r = {}, Nl;
function Nu() {
  if (Nl) return _r;
  Nl = 1, Object.defineProperty(_r, "__esModule", { value: !0 }), _r.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const s = /* @__PURE__ */ Tt(), h = Ou(), m = Zl;
  let f = class extends h.DifferentialDownloader {
    async download() {
      const u = this.blockAwareFileInfo, i = u.size, o = i - (u.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(o, i - 1);
      const n = c(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await l(this.options.oldFile), n);
    }
  };
  _r.FileWithEmbeddedBlockMapDifferentialDownloader = f;
  function c(e) {
    return JSON.parse((0, m.inflateRawSync)(e).toString());
  }
  async function l(e) {
    const u = await (0, s.open)(e, "r");
    try {
      const i = (await (0, s.fstat)(u)).size, o = Buffer.allocUnsafe(4);
      await (0, s.read)(u, o, 0, o.length, i - o.length);
      const n = Buffer.allocUnsafe(o.readUInt32BE(0));
      return await (0, s.read)(u, n, 0, n.length, i - o.length - n.length), await (0, s.close)(u), c(n);
    } catch (i) {
      throw await (0, s.close)(u), i;
    }
  }
  return _r;
}
var xl;
function Fl() {
  if (xl) return wr;
  xl = 1, Object.defineProperty(wr, "__esModule", { value: !0 }), wr.AppImageUpdater = void 0;
  const s = Ge(), h = rn, m = /* @__PURE__ */ Tt(), f = Ct, c = ke, l = dn(), e = Nu(), u = rt(), i = Bt();
  let o = class extends l.BaseUpdater {
    constructor(t, r) {
      super(t, r);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(t) {
      const r = t.updateInfoAndProvider.provider, d = (0, u.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: d,
        downloadUpdateOptions: t,
        task: async (g, v) => {
          const p = process.env.APPIMAGE;
          if (p == null)
            throw (0, s.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          (t.disableDifferentialDownload || await this.downloadDifferential(d, p, g, r, t)) && await this.httpExecutor.download(d.url, g, v), await (0, m.chmod)(g, 493);
        }
      });
    }
    async downloadDifferential(t, r, d, g, v) {
      try {
        const p = {
          newUrl: t.url,
          oldFile: r,
          logger: this._logger,
          newFile: d,
          isUseMultipleRangeRequest: g.isUseMultipleRangeRequest,
          requestHeaders: v.requestHeaders,
          cancellationToken: v.cancellationToken
        };
        return this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (p.onProgress = (w) => this.emit(i.DOWNLOAD_PROGRESS, w)), await new e.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, p).download(), !1;
      } catch (p) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${p.stack || p}`), process.platform === "linux";
      }
    }
    doInstall(t) {
      const r = process.env.APPIMAGE;
      if (r == null)
        throw (0, s.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, f.unlinkSync)(r);
      let d;
      const g = c.basename(r), v = this.installerPath;
      if (v == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      c.basename(v) === g || !/\d+\.\d+\.\d+/.test(g) ? d = r : d = c.join(c.dirname(r), c.basename(v)), (0, h.execFileSync)("mv", ["-f", v, d]), d !== r && this.emit("appimage-filename-updated", d);
      const p = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return t.isForceRunAfter ? this.spawnLog(d, [], p) : (p.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, h.execFileSync)(d, [], { env: p })), !0;
    }
  };
  return wr.AppImageUpdater = o, wr;
}
var Sr = {}, Rr = {}, Ll;
function Ia() {
  if (Ll) return Rr;
  Ll = 1, Object.defineProperty(Rr, "__esModule", { value: !0 }), Rr.LinuxUpdater = void 0;
  const s = dn();
  let h = class extends s.BaseUpdater {
    constructor(f, c) {
      super(f, c);
    }
    /**
     * Returns true if the current process is running as root.
     */
    isRunningAsRoot() {
      var f;
      return ((f = process.getuid) === null || f === void 0 ? void 0 : f.call(process)) === 0;
    }
    /**
     * Sanitizies the installer path for using with command line tools.
     */
    get installerPath() {
      var f, c;
      return (c = (f = super.installerPath) === null || f === void 0 ? void 0 : f.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && c !== void 0 ? c : null;
    }
    runCommandWithSudoIfNeeded(f) {
      if (this.isRunningAsRoot())
        return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(f[0], f.slice(1));
      const { name: c } = this.app, l = `"${c} would like to update"`, e = this.sudoWithArgs(l);
      this._logger.info(`Running as non-root user, using sudo to install: ${e}`);
      let u = '"';
      return (/pkexec/i.test(e[0]) || e[0] === "sudo") && (u = ""), this.spawnSyncLog(e[0], [...e.length > 1 ? e.slice(1) : [], `${u}/bin/bash`, "-c", `'${f.join(" ")}'${u}`]);
    }
    sudoWithArgs(f) {
      const c = this.determineSudoCommand(), l = [c];
      return /kdesudo/i.test(c) ? (l.push("--comment", f), l.push("-c")) : /gksudo/i.test(c) ? l.push("--message", f) : /pkexec/i.test(c) && l.push("--disable-internal-agent"), l;
    }
    hasCommand(f) {
      try {
        return this.spawnSyncLog("command", ["-v", f]), !0;
      } catch {
        return !1;
      }
    }
    determineSudoCommand() {
      const f = ["gksudo", "kdesudo", "pkexec", "beesu"];
      for (const c of f)
        if (this.hasCommand(c))
          return c;
      return "sudo";
    }
    /**
     * Detects the package manager to use based on the available commands.
     * Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
     * If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
     * Otherwise, it checks for the presence of the specified package manager commands in the order provided.
     * @param pms - An array of package manager commands to check for, in priority order.
     * @returns The detected package manager command or "unknown" if none are found.
     */
    detectPackageManager(f) {
      var c;
      const l = (c = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || c === void 0 ? void 0 : c.trim();
      if (l)
        return l;
      for (const e of f)
        if (this.hasCommand(e))
          return e;
      return this._logger.warn(`No package manager found in the list: ${f.join(", ")}. Defaulting to the first one: ${f[0]}`), f[0];
    }
  };
  return Rr.LinuxUpdater = h, Rr;
}
var Ul;
function $l() {
  if (Ul) return Sr;
  Ul = 1, Object.defineProperty(Sr, "__esModule", { value: !0 }), Sr.DebUpdater = void 0;
  const s = rt(), h = Bt(), m = Ia();
  let f = class xu extends m.LinuxUpdater {
    constructor(l, e) {
      super(l, e);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const e = l.updateInfoAndProvider.provider, u = (0, s.findFile)(e.resolveFiles(l.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: u,
        downloadUpdateOptions: l,
        task: async (i, o) => {
          this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (n) => this.emit(h.DOWNLOAD_PROGRESS, n)), await this.httpExecutor.download(u.url, i, o);
        }
      });
    }
    doInstall(l) {
      const e = this.installerPath;
      if (e == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
        return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
      const u = ["dpkg", "apt"], i = this.detectPackageManager(u);
      try {
        xu.installWithCommandRunner(i, e, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (o) {
        return this.dispatchError(o), !1;
      }
      return l.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(l, e, u, i) {
      var o;
      if (l === "dpkg")
        try {
          u(["dpkg", "-i", e]);
        } catch (n) {
          i.warn((o = n.message) !== null && o !== void 0 ? o : n), i.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), u(["apt-get", "install", "-f", "-y"]);
        }
      else if (l === "apt")
        i.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), u([
          "apt",
          "install",
          "-y",
          "--allow-unauthenticated",
          // needed for unsigned .debs
          "--allow-downgrades",
          // allow lower version installs
          "--allow-change-held-packages",
          e
        ]);
      else
        throw new Error(`Package manager ${l} not supported`);
    }
  };
  return Sr.DebUpdater = f, Sr;
}
var Cr = {}, kl;
function ql() {
  if (kl) return Cr;
  kl = 1, Object.defineProperty(Cr, "__esModule", { value: !0 }), Cr.PacmanUpdater = void 0;
  const s = Bt(), h = rt(), m = Ia();
  let f = class Fu extends m.LinuxUpdater {
    constructor(l, e) {
      super(l, e);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const e = l.updateInfoAndProvider.provider, u = (0, h.findFile)(e.resolveFiles(l.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
      return this.executeDownload({
        fileExtension: "pacman",
        fileInfo: u,
        downloadUpdateOptions: l,
        task: async (i, o) => {
          this.listenerCount(s.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (n) => this.emit(s.DOWNLOAD_PROGRESS, n)), await this.httpExecutor.download(u.url, i, o);
        }
      });
    }
    doInstall(l) {
      const e = this.installerPath;
      if (e == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      try {
        Fu.installWithCommandRunner(e, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (u) {
        return this.dispatchError(u), !1;
      }
      return l.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(l, e, u) {
      var i;
      try {
        e(["pacman", "-U", "--noconfirm", l]);
      } catch (o) {
        u.warn((i = o.message) !== null && i !== void 0 ? i : o), u.warn("pacman installation failed, attempting to update package database and retry");
        try {
          e(["pacman", "-Sy", "--noconfirm"]), e(["pacman", "-U", "--noconfirm", l]);
        } catch (n) {
          throw u.error("Retry after pacman -Sy failed"), n;
        }
      }
    }
  };
  return Cr.PacmanUpdater = f, Cr;
}
var Ar = {}, Ml;
function Bl() {
  if (Ml) return Ar;
  Ml = 1, Object.defineProperty(Ar, "__esModule", { value: !0 }), Ar.RpmUpdater = void 0;
  const s = Bt(), h = rt(), m = Ia();
  let f = class Lu extends m.LinuxUpdater {
    constructor(l, e) {
      super(l, e);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const e = l.updateInfoAndProvider.provider, u = (0, h.findFile)(e.resolveFiles(l.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: u,
        downloadUpdateOptions: l,
        task: async (i, o) => {
          this.listenerCount(s.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (n) => this.emit(s.DOWNLOAD_PROGRESS, n)), await this.httpExecutor.download(u.url, i, o);
        }
      });
    }
    doInstall(l) {
      const e = this.installerPath;
      if (e == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const u = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(u);
      try {
        Lu.installWithCommandRunner(i, e, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (o) {
        return this.dispatchError(o), !1;
      }
      return l.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(l, e, u, i) {
      if (l === "zypper")
        return u(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", e]);
      if (l === "dnf")
        return u(["dnf", "install", "--nogpgcheck", "-y", e]);
      if (l === "yum")
        return u(["yum", "install", "--nogpgcheck", "-y", e]);
      if (l === "rpm")
        return i.warn("Installing with rpm only (no dependency resolution)."), u(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", e]);
      throw new Error(`Package manager ${l} not supported`);
    }
  };
  return Ar.RpmUpdater = f, Ar;
}
var Tr = {}, jl;
function Hl() {
  if (jl) return Tr;
  jl = 1, Object.defineProperty(Tr, "__esModule", { value: !0 }), Tr.MacUpdater = void 0;
  const s = Ge(), h = /* @__PURE__ */ Tt(), m = Ct, f = ke, c = $c, l = Oa(), e = rt(), u = rn, i = Ir;
  let o = class extends l.AppUpdater {
    constructor(t, r) {
      super(t, r), this.nativeUpdater = kt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (d) => {
        this._logger.warn(d), this.emit("error", d);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(t) {
      this._logger.debug != null && this._logger.debug(t);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
        t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(t) {
      let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
      const d = this._logger, g = "sysctl.proc_translated";
      let v = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), v = (0, u.execFileSync)("sysctl", [g], { encoding: "utf8" }).includes(`${g}: 1`), d.info(`Checked for macOS Rosetta environment (isRosetta=${v})`);
      } catch (A) {
        d.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${A}`);
      }
      let p = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const O = (0, u.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        d.info(`Checked 'uname -a': arm64=${O}`), p = p || O;
      } catch (A) {
        d.warn(`uname shell command to check for arm64 failed: ${A}`);
      }
      p = p || process.arch === "arm64" || v;
      const w = (A) => {
        var O;
        return A.url.pathname.includes("arm64") || ((O = A.info.url) === null || O === void 0 ? void 0 : O.includes("arm64"));
      };
      p && r.some(w) ? r = r.filter((A) => p === w(A)) : r = r.filter((A) => !w(A));
      const R = (0, e.findFile)(r, "zip", ["pkg", "dmg"]);
      if (R == null)
        throw (0, s.newError)(`ZIP file not provided: ${(0, s.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const P = t.updateInfoAndProvider.provider, N = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: R,
        downloadUpdateOptions: t,
        task: async (A, O) => {
          const b = f.join(this.downloadedUpdateHelper.cacheDir, N), S = () => (0, h.pathExistsSync)(b) ? !t.disableDifferentialDownload : (d.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let D = !0;
          S() && (D = await this.differentialDownloadInstaller(R, t, A, P, N)), D && await this.httpExecutor.download(R.url, A, O);
        },
        done: async (A) => {
          if (!t.disableDifferentialDownload)
            try {
              const O = f.join(this.downloadedUpdateHelper.cacheDir, N);
              await (0, h.copyFile)(A.downloadedFile, O);
            } catch (O) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${O.message}`);
            }
          return this.updateDownloaded(R, A);
        }
      });
    }
    async updateDownloaded(t, r) {
      var d;
      const g = r.downloadedFile, v = (d = t.info.size) !== null && d !== void 0 ? d : (await (0, h.stat)(g)).size, p = this._logger, w = `fileToProxy=${t.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${w})`), this.server = (0, c.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${w})`), this.server.on("close", () => {
        p.info(`Proxy server for native Squirrel.Mac is closed (${w})`);
      });
      const R = (P) => {
        const N = P.address();
        return typeof N == "string" ? N : `http://127.0.0.1:${N?.port}`;
      };
      return await new Promise((P, N) => {
        const A = (0, i.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), O = Buffer.from(`autoupdater:${A}`, "ascii"), b = `/${(0, i.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (S, D) => {
          const _ = S.url;
          if (p.info(`${_} requested`), _ === "/") {
            if (!S.headers.authorization || S.headers.authorization.indexOf("Basic ") === -1) {
              D.statusCode = 401, D.statusMessage = "Invalid Authentication Credentials", D.end(), p.warn("No authenthication info");
              return;
            }
            const M = S.headers.authorization.split(" ")[1], L = Buffer.from(M, "base64").toString("ascii"), [F, H] = L.split(":");
            if (F !== "autoupdater" || H !== A) {
              D.statusCode = 401, D.statusMessage = "Invalid Authentication Credentials", D.end(), p.warn("Invalid authenthication credentials");
              return;
            }
            const x = Buffer.from(`{ "url": "${R(this.server)}${b}" }`);
            D.writeHead(200, { "Content-Type": "application/json", "Content-Length": x.length }), D.end(x);
            return;
          }
          if (!_.startsWith(b)) {
            p.warn(`${_} requested, but not supported`), D.writeHead(404), D.end();
            return;
          }
          p.info(`${b} requested by Squirrel.Mac, pipe ${g}`);
          let k = !1;
          D.on("finish", () => {
            k || (this.nativeUpdater.removeListener("error", N), P([]));
          });
          const $ = (0, m.createReadStream)(g);
          $.on("error", (M) => {
            try {
              D.end();
            } catch (L) {
              p.warn(`cannot end response: ${L}`);
            }
            k = !0, this.nativeUpdater.removeListener("error", N), N(new Error(`Cannot pipe "${g}": ${M}`));
          }), D.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": v
          }), $.pipe(D);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${w})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${R(this.server)}, ${w})`), this.nativeUpdater.setFeedURL({
            url: R(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${O.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", N), this.nativeUpdater.checkForUpdates()) : P([]);
        });
      });
    }
    handleUpdateDownloaded() {
      this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return Tr.MacUpdater = o, Tr;
}
var br = {}, Zr = {}, Gl;
function cd() {
  if (Gl) return Zr;
  Gl = 1, Object.defineProperty(Zr, "__esModule", { value: !0 }), Zr.verifySignature = l;
  const s = Ge(), h = rn, m = nn, f = ke;
  function c(o, n) {
    return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", o], {
      shell: !0,
      timeout: n
    }];
  }
  function l(o, n, t) {
    return new Promise((r, d) => {
      const g = n.replace(/'/g, "''");
      t.info(`Verifying signature ${g}`), (0, h.execFile)(...c(`"Get-AuthenticodeSignature -LiteralPath '${g}' | ConvertTo-Json -Compress"`, 20 * 1e3), (v, p, w) => {
        var R;
        try {
          if (v != null || w) {
            u(t, v, w, d), r(null);
            return;
          }
          const P = e(p);
          if (P.Status === 0) {
            try {
              const b = f.normalize(P.Path), S = f.normalize(n);
              if (t.info(`LiteralPath: ${b}. Update Path: ${S}`), b !== S) {
                u(t, new Error(`LiteralPath of ${b} is different than ${S}`), w, d), r(null);
                return;
              }
            } catch (b) {
              t.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(R = b.message) !== null && R !== void 0 ? R : b.stack}`);
            }
            const A = (0, s.parseDn)(P.SignerCertificate.Subject);
            let O = !1;
            for (const b of o) {
              const S = (0, s.parseDn)(b);
              if (S.size ? O = Array.from(S.keys()).every((_) => S.get(_) === A.get(_)) : b === A.get("CN") && (t.warn(`Signature validated using only CN ${b}. Please add your full Distinguished Name (DN) to publisherNames configuration`), O = !0), O) {
                r(null);
                return;
              }
            }
          }
          const N = `publisherNames: ${o.join(" | ")}, raw info: ` + JSON.stringify(P, (A, O) => A === "RawData" ? void 0 : O, 2);
          t.warn(`Sign verification failed, installer signed with incorrect certificate: ${N}`), r(N);
        } catch (P) {
          u(t, P, null, d), r(null);
          return;
        }
      });
    });
  }
  function e(o) {
    const n = JSON.parse(o);
    delete n.PrivateKey, delete n.IsOSBinary, delete n.SignatureType;
    const t = n.SignerCertificate;
    return t != null && (delete t.Archived, delete t.Extensions, delete t.Handle, delete t.HasPrivateKey, delete t.SubjectName), n;
  }
  function u(o, n, t, r) {
    if (i()) {
      o.warn(`Cannot execute Get-AuthenticodeSignature: ${n || t}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, h.execFileSync)(...c("ConvertTo-Json test", 10 * 1e3));
    } catch (d) {
      o.warn(`Cannot execute ConvertTo-Json: ${d.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    n != null && r(n), t && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${t}. Failing signature validation due to unknown stderr.`));
  }
  function i() {
    const o = m.release();
    return o.startsWith("6.") && !o.startsWith("6.3");
  }
  return Zr;
}
var Wl;
function Vl() {
  if (Wl) return br;
  Wl = 1, Object.defineProperty(br, "__esModule", { value: !0 }), br.NsisUpdater = void 0;
  const s = Ge(), h = ke, m = dn(), f = Nu(), c = Bt(), l = rt(), e = /* @__PURE__ */ Tt(), u = cd(), i = At;
  let o = class extends m.BaseUpdater {
    constructor(t, r) {
      super(t, r), this._verifyUpdateCodeSignature = (d, g) => (0, u.verifySignature)(d, g, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(t) {
      t && (this._verifyUpdateCodeSignature = t);
    }
    /*** @private */
    doDownloadUpdate(t) {
      const r = t.updateInfoAndProvider.provider, d = (0, l.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: t,
        fileInfo: d,
        task: async (g, v, p, w) => {
          const R = d.packageInfo, P = R != null && p != null;
          if (P && t.disableWebInstaller)
            throw (0, s.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !P && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (P || t.disableDifferentialDownload || await this.differentialDownloadInstaller(d, t, g, r, s.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(d.url, g, v);
          const N = await this.verifySignature(g);
          if (N != null)
            throw await w(), (0, s.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${N}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (P && await this.differentialDownloadWebPackage(t, R, p, r))
            try {
              await this.httpExecutor.download(new i.URL(R.path), p, {
                headers: t.requestHeaders,
                cancellationToken: t.cancellationToken,
                sha512: R.sha512
              });
            } catch (A) {
              try {
                await (0, e.unlink)(p);
              } catch {
              }
              throw A;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(t) {
      let r;
      try {
        if (r = (await this.configOnDisk.value).publisherName, r == null)
          return null;
      } catch (d) {
        if (d.code === "ENOENT")
          return null;
        throw d;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
    }
    doInstall(t) {
      const r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const d = ["--updated"];
      t.isSilent && d.push("/S"), t.isForceRunAfter && d.push("--force-run"), this.installDirectory && d.push(`/D=${this.installDirectory}`);
      const g = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      g != null && d.push(`--package-file=${g}`);
      const v = () => {
        this.spawnLog(h.join(process.resourcesPath, "elevate.exe"), [r].concat(d)).catch((p) => this.dispatchError(p));
      };
      return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), v(), !0) : (this.spawnLog(r, d).catch((p) => {
        const w = p.code;
        this._logger.info(`Cannot run installer: error code: ${w}, error message: "${p.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), w === "UNKNOWN" || w === "EACCES" ? v() : w === "ENOENT" ? kt.shell.openPath(r).catch((R) => this.dispatchError(R)) : this.dispatchError(p);
      }), !0);
    }
    async differentialDownloadWebPackage(t, r, d, g) {
      if (r.blockMapSize == null)
        return !0;
      try {
        const v = {
          newUrl: new i.URL(r.path),
          oldFile: h.join(this.downloadedUpdateHelper.cacheDir, s.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: d,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: g.isUseMultipleRangeRequest,
          cancellationToken: t.cancellationToken
        };
        this.listenerCount(c.DOWNLOAD_PROGRESS) > 0 && (v.onProgress = (p) => this.emit(c.DOWNLOAD_PROGRESS, p)), await new f.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, v).download();
      } catch (v) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${v.stack || v}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return br.NsisUpdater = o, br;
}
var zl;
function fd() {
  return zl || (zl = 1, (function(s) {
    var h = xt && xt.__createBinding || (Object.create ? (function(p, w, R, P) {
      P === void 0 && (P = R);
      var N = Object.getOwnPropertyDescriptor(w, R);
      (!N || ("get" in N ? !w.__esModule : N.writable || N.configurable)) && (N = { enumerable: !0, get: function() {
        return w[R];
      } }), Object.defineProperty(p, P, N);
    }) : (function(p, w, R, P) {
      P === void 0 && (P = R), p[P] = w[R];
    })), m = xt && xt.__exportStar || function(p, w) {
      for (var R in p) R !== "default" && !Object.prototype.hasOwnProperty.call(w, R) && h(w, p, R);
    };
    Object.defineProperty(s, "__esModule", { value: !0 }), s.NsisUpdater = s.MacUpdater = s.RpmUpdater = s.PacmanUpdater = s.DebUpdater = s.AppImageUpdater = s.Provider = s.NoOpLogger = s.AppUpdater = s.BaseUpdater = void 0;
    const f = /* @__PURE__ */ Tt(), c = ke;
    var l = dn();
    Object.defineProperty(s, "BaseUpdater", { enumerable: !0, get: function() {
      return l.BaseUpdater;
    } });
    var e = Oa();
    Object.defineProperty(s, "AppUpdater", { enumerable: !0, get: function() {
      return e.AppUpdater;
    } }), Object.defineProperty(s, "NoOpLogger", { enumerable: !0, get: function() {
      return e.NoOpLogger;
    } });
    var u = rt();
    Object.defineProperty(s, "Provider", { enumerable: !0, get: function() {
      return u.Provider;
    } });
    var i = Fl();
    Object.defineProperty(s, "AppImageUpdater", { enumerable: !0, get: function() {
      return i.AppImageUpdater;
    } });
    var o = $l();
    Object.defineProperty(s, "DebUpdater", { enumerable: !0, get: function() {
      return o.DebUpdater;
    } });
    var n = ql();
    Object.defineProperty(s, "PacmanUpdater", { enumerable: !0, get: function() {
      return n.PacmanUpdater;
    } });
    var t = Bl();
    Object.defineProperty(s, "RpmUpdater", { enumerable: !0, get: function() {
      return t.RpmUpdater;
    } });
    var r = Hl();
    Object.defineProperty(s, "MacUpdater", { enumerable: !0, get: function() {
      return r.MacUpdater;
    } });
    var d = Vl();
    Object.defineProperty(s, "NsisUpdater", { enumerable: !0, get: function() {
      return d.NsisUpdater;
    } }), m(Bt(), s);
    let g;
    function v() {
      if (process.platform === "win32")
        g = new (Vl()).NsisUpdater();
      else if (process.platform === "darwin")
        g = new (Hl()).MacUpdater();
      else {
        g = new (Fl()).AppImageUpdater();
        try {
          const p = c.join(process.resourcesPath, "package-type");
          if (!(0, f.existsSync)(p))
            return g;
          switch ((0, f.readFileSync)(p).toString().trim()) {
            case "deb":
              g = new ($l()).DebUpdater();
              break;
            case "rpm":
              g = new (Bl()).RpmUpdater();
              break;
            case "pacman":
              g = new (ql()).PacmanUpdater();
              break;
            default:
              break;
          }
        } catch (p) {
          console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", p.message);
        }
      }
      return g;
    }
    Object.defineProperty(s, "autoUpdater", {
      enumerable: !0,
      get: () => g || v()
    });
  })(xt)), xt;
}
var gt = fd();
gt.autoUpdater.autoDownload = !1;
gt.autoUpdater.autoInstallOnAppQuit = !0;
gt.autoUpdater.on("update-available", (s) => {
  pe && pe.webContents.send("update:available", s);
});
gt.autoUpdater.on("download-progress", (s) => {
  pe && pe.webContents.send("update:progress", s);
});
gt.autoUpdater.on("update-downloaded", () => {
  pe && pe.webContents.send("update:downloaded");
});
gt.autoUpdater.on("error", (s) => {
  pe && pe.webContents.send("update:error", s.message);
});
ve.on("update:download", () => gt.autoUpdater.downloadUpdate());
ve.on("update:install", () => gt.autoUpdater.quitAndInstall());
const Uu = fe.dirname(Lc(import.meta.url));
process.env.APP_ROOT = fe.join(Uu, "..");
const ma = process.env.VITE_DEV_SERVER_URL, sh = fe.join(process.env.APP_ROOT, "dist-electron"), $u = fe.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = ma ? fe.join(process.env.APP_ROOT, "public") : $u;
let pe, Re = null, ct = null, ft = null;
const ku = $e.requestSingleInstanceLock();
ku || $e.quit();
function Rt(s) {
  return $e.isPackaged ? fe.join(process.resourcesPath, "_internal", s) : fe.join(process.env.APP_ROOT, "..", s);
}
function et() {
  if (process.platform === "win32") {
    const s = fe.join(Jt.homedir(), "AppData", "Local", "Programs", "Thonny", "python.exe");
    return ce.existsSync(s) ? s : "python";
  }
  try {
    return eu("python3 --version", { stdio: "ignore" }), "python3";
  } catch {
    return "python";
  }
}
function dd(s) {
  if (!s) return "";
  try {
    return tn.isEncryptionAvailable() ? `enc:${tn.encryptString(s).toString("base64")}` : (console.warn("[Security] safeStorage not available. Storing in plain-text."), s);
  } catch (h) {
    return console.error("[Security] Encryption failed:", h), s;
  }
}
function Yl(s) {
  if (!s || !s.startsWith("enc:")) return s;
  try {
    if (tn.isEncryptionAvailable()) {
      const h = s.substring(4), m = Buffer.from(h, "base64");
      return tn.decryptString(m);
    }
    return s;
  } catch (h) {
    return console.error("[Security] Decryption failed:", h), s;
  }
}
function qu() {
  pe = new Xl({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: !1,
    // Frameless window
    icon: $e.isPackaged ? fe.join(process.resourcesPath, "icon.ico") : fe.join(process.env.VITE_PUBLIC, "icon.ico"),
    webPreferences: {
      preload: fe.join(Uu, "preload.js"),
      // Vite plugin-electron compiles preload.ts to .js
      contextIsolation: !0,
      // Security requirement
      nodeIntegration: !1
    }
  }), pe.webContents.on("did-finish-load", () => {
    pe?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), ma ? pe.loadURL(ma) : pe.loadFile(fe.join($u, "index.html"));
}
async function $t() {
  return new Promise((s) => {
    if (!Re) return s(!0);
    const h = Re;
    Re = null, h.isOpen ? h.close((m) => {
      m && console.error("[Serial] Error closing port:", m), setTimeout(() => s(!0), 800);
    }) : s(!0);
  });
}
async function Pr(s, h) {
  return await $t(), await h();
}
function hd() {
  ve.handle("dialog:openFolder", async () => {
    const { canceled: c, filePaths: l } = await mn.showOpenDialog({
      properties: ["openDirectory"]
    });
    return c ? null : l[0];
  }), ve.handle("dialog:openFile", async () => {
    const { canceled: c, filePaths: l } = await mn.showOpenDialog({
      properties: ["openFile"],
      filters: [
        { name: "Code Files", extensions: ["py", "js", "ts", "json", "html", "css", "md", "txt", "c", "cpp", "h", "hpp"] },
        { name: "All Files", extensions: ["*"] }
      ]
    });
    if (!c && l.length > 0)
      try {
        const e = l[0], u = ce.readFileSync(e, "utf-8");
        return {
          path: e,
          name: fe.basename(e),
          content: u
        };
      } catch (e) {
        return { error: e.message };
      }
    return null;
  }), ve.handle("fs:readDir", async (c, { dirPath: l }) => {
    try {
      return ce.existsSync(l) ? ce.statSync(l).isDirectory() ? ce.readdirSync(l).map((i) => {
        const o = fe.join(l, i);
        let n = !1;
        try {
          n = ce.statSync(o).isDirectory();
        } catch {
        }
        return {
          id: o,
          name: i,
          type: n ? "folder" : "file",
          filePath: o,
          children: n ? [] : void 0
          // Empty array signifies an unloaded folder
        };
      }).sort((i, o) => i.type === o.type ? i.name.localeCompare(o.name) : i.type === "folder" ? -1 : 1) : [] : [];
    } catch {
      return [];
    }
  }), ve.handle("fs:readFile", async (c, { filePath: l }) => {
    try {
      return { content: ce.readFileSync(l, "utf-8") };
    } catch {
      return null;
    }
  }), ve.handle("fs:createFile", async (c, { filePath: l, content: e = "" }) => {
    try {
      return ce.writeFileSync(l, e, "utf-8"), { success: !0 };
    } catch (u) {
      return { success: !1, message: u.message };
    }
  }), ve.handle("fs:createFolder", async (c, { folderPath: l }) => {
    try {
      return ce.mkdirSync(l, { recursive: !0 }), { success: !0 };
    } catch (e) {
      return { success: !1, message: e.message };
    }
  }), ve.handle("fs:delete", async (c, { filePath: l }) => {
    try {
      return ce.rmSync(l, { recursive: !0, force: !0 }), { success: !0 };
    } catch (e) {
      return { success: !1, message: e.message };
    }
  }), ve.handle("fs:deleteSafe", async (c, { filePath: l }) => {
    try {
      return ce.existsSync(l) ? (await Ha.trashItem(l), { success: !0 }) : { success: !0 };
    } catch (e) {
      try {
        return ce.rmSync(l, { recursive: !0, force: !0 }), { success: !0 };
      } catch (u) {
        return { success: !1, message: e.message + " | " + u.message };
      }
    }
  }), ve.handle("fs:exists", async (c, { filePath: l }) => {
    try {
      return { success: !0, exists: ce.existsSync(l) };
    } catch (e) {
      return { success: !1, message: e.message };
    }
  }), ve.handle("fs:writeFile", async (c, { filePath: l, content: e }) => {
    try {
      const u = fe.dirname(l);
      return ce.existsSync(u) || ce.mkdirSync(u, { recursive: !0 }), ce.writeFileSync(l, e, "utf-8"), { success: !0 };
    } catch (u) {
      return { success: !1, message: u.message };
    }
  }), ve.handle("fs:readDeep", async (c, { folderPath: l }) => {
    const e = /* @__PURE__ */ new Set(["node_modules", ".git", "__pycache__", "venv", ".venv", "build", "dist", ".idea", ".vscode"]), u = 50 * 1024, i = [];
    async function o(n) {
      try {
        const t = await ce.promises.readdir(n, { withFileTypes: !0 });
        for (const r of t) {
          if (e.has(r.name) || r.name.startsWith(".")) continue;
          const d = fe.join(n, r.name);
          if (r.isDirectory())
            await o(d);
          else if (r.isFile()) {
            const g = fe.extname(r.name).toLowerCase();
            if ([".exe", ".dll", ".png", ".jpg", ".jpeg", ".gif", ".bin", ".uf2", ".zip", ".tar", ".gz", ".pdf", ".mp4", ".mp3"].includes(g) || (await ce.promises.stat(d)).size > u) continue;
            const w = await ce.promises.readFile(d, "utf-8");
            i.push({ path: fe.relative(l, d), content: w });
          }
        }
      } catch {
      }
    }
    return await o(l), i;
  }), ve.handle("fs:rename", async (c, { oldPath: l, newPath: e }) => {
    try {
      return ce.renameSync(l, e), { success: !0 };
    } catch (u) {
      return { success: !1, message: u.message };
    }
  }), ve.handle("saveApiSettings", async (c, l) => {
    try {
      const e = fe.join($e.getPath("userData"), "config");
      ce.existsSync(e) || ce.mkdirSync(e, { recursive: !0 });
      const u = fe.join(e, "settings.json"), i = {
        ...l,
        apiKey: dd(l.apiKey),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      return ce.writeFileSync(u, JSON.stringify(i, null, 2), "utf-8"), { success: !0, path: u };
    } catch (e) {
      return { success: !1, message: e.message };
    }
  }), ve.handle("loadApiSettings", async () => {
    try {
      const c = fe.join($e.getPath("userData"), "config", "settings.json");
      if (!ce.existsSync(c)) return null;
      const l = ce.readFileSync(c, "utf-8"), e = JSON.parse(l);
      return {
        ...e,
        apiKey: Yl(e.apiKey)
      };
    } catch {
      return null;
    }
  }), ve.handle("resetApiSettings", async () => {
    try {
      const c = fe.join($e.getPath("userData"), "config", "settings.json");
      return ce.existsSync(c) && ce.unlinkSync(c), { success: !0 };
    } catch (c) {
      return { success: !1, message: c.message };
    }
  }), ve.handle("hardware:listPorts", async () => new Promise((c) => {
    Nt(
      `"${et()}" -c "import json,serial.tools.list_ports;print(json.dumps([{'path':p.device,'description':p.description or '','manufacturer':p.manufacturer or ''} for p in serial.tools.list_ports.comports()]))"`,
      { timeout: 1e4 },
      (l, e) => {
        if (l) {
          c([]);
          return;
        }
        try {
          const u = JSON.parse(e.trim());
          c(u);
        } catch {
          console.error(
            "[ElectroAI] Could not parse port list. stdout:",
            e
          ), c([]);
        }
      }
    );
  })), ve.handle("hardware:checkChip", async (c, { port: l }) => (await $t(), new Promise((e) => {
    let u = !1;
    const i = (g) => {
      u || (u = !0, e(g));
    }, o = [
      "import serial, sys, time, json",
      "try:",
      `    s = serial.Serial('${l}', 115200, timeout=2)`,
      "    time.sleep(0.3)",
      "    s.write(bytes([13, 10, 3, 3, 13, 10]))",
      "    time.sleep(0.5)",
      "    resp = s.read(s.in_waiting or 1024).decode('utf-8', errors='replace')",
      "    s.close()",
      "    detected = 'unknown'",
      "    if 'MicroPython' in resp or '>>>' in resp:",
      "        detected = 'micropython'",
      "    elif 'CircuitPython' in resp:",
      "        detected = 'circuitpython'",
      "    elif 'Traceback' in resp:",
      "        detected = 'micropython'",
      "    result = {'connected': True, 'detected': detected, 'raw': resp[:200]}",
      "    print(json.dumps(result))",
      "    sys.stdout.flush()",
      "except Exception as e:",
      "    print(json.dumps({'connected': False, 'message': str(e)}))",
      "    sys.stdout.flush()",
      "    sys.exit(1)"
    ].join(`
`), n = en(et(), ["-c", o]);
    let t = "", r = "";
    n.stdout.on("data", (g) => t += g.toString()), n.stderr.on("data", (g) => r += g.toString()), n.on("error", (g) => {
      console.error("[StratumStudio] spawn error:", g.message), i({
        connected: !1,
        message: "Python not found. Install Python and pyserial."
      });
    }), n.on("close", (g) => {
      console.log(
        `[StratumStudio] checkChip python exited code=${g}, stdout="${t.trim()}", stderr="${r.trim()}"`
      );
      try {
        const v = JSON.parse(t.trim());
        i(v);
      } catch {
        if (t.trim() === "ok")
          i({ connected: !0, detected: "unknown" });
        else {
          const v = r.trim() || `Could not open ${l}. Check USB cable, drivers, and close other serial tools.`;
          i({ connected: !1, message: v });
        }
      }
    });
    const d = setTimeout(() => {
      n.kill(), i({
        connected: !0,
        detected: "no_repl",
        message: "Port opened but no REPL detected — likely an Arduino/AVR board."
      });
    }, 8e3);
    n.on("close", () => clearTimeout(d));
  }))), ve.handle("dialog:saveFile", async (c, { content: l, defaultName: e }) => {
    const { canceled: u, filePath: i } = await mn.showSaveDialog({
      defaultPath: e ?? "untitled.py",
      filters: [
        { name: "Python", extensions: ["py"] },
        { name: "C/C++", extensions: ["c", "cpp", "ino", "h"] },
        { name: "All Files", extensions: ["*"] }
      ]
    });
    if (u || !i) return { success: !1 };
    try {
      return ce.writeFileSync(i, l, "utf-8"), { success: !0, filePath: i, path: i };
    } catch (o) {
      return { success: !1, message: o.message };
    }
  }), ve.handle(
    "hardware:flash",
    async (c, { code: l, port: e, language: u, boardId: i, deviceName: o, mode: n }) => {
      await $t();
      const t = u === "arduino" || u === "c";
      return t || await new Promise((r) => {
        const d = [
          "import serial, sys, time",
          "for attempt in range(3):",
          "    try:",
          `        s = serial.Serial('${e}', 115200, timeout=0.5)`,
          "        s.write(bytes([13, 3, 3, 3]))",
          "        time.sleep(0.2)",
          "        s.close()",
          "        break",
          "    except Exception:",
          "        time.sleep(0.3)"
        ].join(`
`);
        en(et(), ["-c", d]).on("close", r);
      }), new Promise(async (r) => {
        const d = t ? ".ino" : ".py", g = fe.join(Jt.tmpdir(), `stratum_temp${d}`);
        try {
          ce.writeFileSync(g, l, "utf-8");
        } catch {
          r({ success: !1, message: "Failed to write temp file" });
          return;
        }
        setTimeout(async () => {
          const p = [
            Rt(fe.join("firmware-tools", "core", "uploader.py")),
            "--port",
            e,
            "--file",
            g,
            "--language",
            u,
            "--board-id",
            i ?? "arduino:avr:uno"
          ];
          if (o && p.push("--device-name", o), n && p.push("--mode", n), n === "run" && t)
            r({
              success: !1,
              message: "Run mode is not supported for Arduino/C++. Use Compile or Upload instead."
            });
          else if (n === "run")
            try {
              Re && await $t(), Re = new ir({ path: e, baudRate: 115200 }), Re.on("data", (w) => {
                pe && pe.webContents.send("terminal-output", w.toString("utf8"));
              }), Re.on("error", () => {
                Re = null;
              }), Re.on("close", () => {
                Re = null;
              }), Re.on("open", () => {
                Re.write(Buffer.from("\r", "utf-8")), setTimeout(() => {
                  Re.write(Buffer.from("", "utf-8")), setTimeout(() => {
                    Re.write(Buffer.from(l, "utf-8")), setTimeout(() => {
                      Re.write(Buffer.from("", "utf-8")), r({ success: !0, message: "Execution started natively" });
                    }, 100);
                  }, 100);
                }, 200);
              });
            } catch (w) {
              r({ success: !1, message: w.message });
            }
          else
            wt(
              et(),
              p,
              { timeout: 6e4 },
              async (w, R, P) => {
                if (w) {
                  r({
                    success: !1,
                    message: P.trim() || R.trim() || w.message
                  });
                  return;
                }
                const N = t ? 9600 : 115200;
                await new Promise((A) => setTimeout(A, 500));
                try {
                  Re && await $t(), Re = new ir({ path: e, baudRate: N }), Re.on("data", (A) => {
                    pe && pe.webContents.send("terminal-output", A.toString("utf8"));
                  }), Re.on("error", () => {
                    Re = null;
                  }), Re.on("close", () => {
                    Re = null;
                  });
                } catch (A) {
                  console.error("Could not resume monitor:", A);
                }
                r({
                  success: !0,
                  message: R.trim() || "Upload complete — device running"
                });
              }
            );
        }, 1e3);
      });
    }
  ), ve.handle(
    "hardware:startMonitor",
    async (c, { port: l, baudRate: e = 115200 }) => {
      if (Re)
        return { success: !1, message: "Monitor already running" };
      try {
        return Re = new ir({ path: l, baudRate: e }), Re.on("data", (u) => {
          pe && pe.webContents.send("terminal-output", u.toString("utf8"));
        }), Re.on("error", (u) => {
          console.error("[Serial] Monitor Error:", u.message), pe && pe.webContents.send("terminal-output", `\x1B[31m[Port Error: ${u.message}]\x1B[0m\r
`), Re = null;
        }), Re.on("close", () => {
          Re = null, pe && pe.webContents.send("terminal-output", `\x1B[33m[Port Closed]\x1B[0m\r
`);
        }), { success: !0 };
      } catch (u) {
        return { success: !1, message: u.message };
      }
    }
  ), ve.handle("hardware:stopMonitor", async () => (await $t(), { success: !0 }));
  let s = !1;
  ve.handle("hardware:stopExecution", async (c, { port: l }) => s ? { success: !1, message: "Stop already in progress" } : (s = !0, await $t(), new Promise((e) => {
    const u = new ir({ path: l, baudRate: 115200 }, (i) => {
      if (i)
        return s = !1, e({ success: !1, message: i.message });
      u.write(Buffer.from("\r", "utf-8"), (o) => {
        o && console.error("Error writing break:", o), setTimeout(() => {
          u.close(() => {
            try {
              Re = new ir({ path: l, baudRate: 115200 }), Re.on("data", (n) => {
                pe && pe.webContents.send("terminal-output", n.toString("utf8"));
              }), Re.on("error", () => {
                Re = null;
              }), Re.on("close", () => {
                Re = null;
              });
            } catch (n) {
              console.error("Could not resume monitor automatically:", n);
            }
            s = !1, e({ success: !0 });
          });
        }, 400);
      });
    });
  }))), ve.handle("hardware:listFiles", async (c, { port: l }) => Pr(l, () => new Promise((e) => {
    const u = Rt(fe.join("firmware-tools", "core", "fs_manager.py"));
    Nt(
      `"${et()}" "${u}" --port ${l} --action list`,
      { timeout: 3e4 },
      (i, o) => {
        if (i) {
          console.error("[ElectroAI] listFiles error:", i.message), e({ error: "Failed to read device" });
          return;
        }
        try {
          const n = JSON.parse(o.trim());
          e(n);
        } catch {
          console.error("[ElectroAI] listFiles parse error:", o), e({ error: "Invalid data from device" });
        }
      }
    );
  }))), ve.handle("hardware:readFile", async (c, { port: l, filePath: e }) => Pr(l, () => new Promise((u) => {
    const i = Rt(fe.join("firmware-tools", "core", "fs_manager.py"));
    Nt(
      `"${et()}" "${i}" --port ${l} --action read --path "${e}"`,
      { timeout: 3e4 },
      (o, n, t) => {
        if (o) {
          console.error("[ElectroAI] readFile error:", o.message), u({ error: t || o.message });
          return;
        }
        try {
          const r = JSON.parse(n.trim());
          u(r);
        } catch {
          console.error("[ElectroAI] readFile parse error:", n), u({ error: "Invalid response from device" });
        }
      }
    );
  }))), ve.handle(
    "hardware:writeFile",
    async (c, { port: l, filePath: e, content: u }) => Pr(l, () => new Promise((i) => {
      const o = fe.join(
        Jt.tmpdir(),
        "electro_write_temp_" + Date.now() + ".py"
      );
      try {
        ce.writeFileSync(o, u, "utf-8");
      } catch {
        i({ success: !1, message: "Temp file error" });
        return;
      }
      const n = Rt(fe.join("firmware-tools", "core", "fs_manager.py"));
      wt(
        et(),
        [
          n,
          "--port",
          l,
          "--action",
          "write",
          "--path",
          e,
          "--localpath",
          o
        ],
        { timeout: 3e4 },
        (t, r) => {
          try {
            ce.unlinkSync(o);
          } catch {
          }
          t ? (console.error("[ElectroAI] writeFile error:", r || t.message), i({ success: !1, message: r || t.message })) : (console.log("[ElectroAI] writeFile success:", e), i({ success: !0 }));
        }
      );
    }))
  ), ve.handle("hardware:deleteFile", async (c, { port: l, filePath: e }) => Pr(l, () => new Promise((u) => {
    const i = Rt(fe.join("firmware-tools", "core", "fs_manager.py"));
    Nt(
      `"${et()}" "${i}" --port ${l} --action delete --path "${e}"`,
      { timeout: 3e4 },
      (o, n) => {
        if (o) {
          u({ success: !1, message: "Failed to delete device file" });
          return;
        }
        try {
          const t = JSON.parse(n.trim());
          u(t);
        } catch {
          u({ success: !1, message: "Invalid output from device" });
        }
      }
    );
  }))), ve.handle("hardware:renameFile", async (c, { port: l, oldPath: e, newPath: u }) => Pr(l, () => new Promise((i) => {
    const o = Rt(fe.join("firmware-tools", "core", "fs_manager.py"));
    Nt(
      `"${et()}" "${o}" --port ${l} --action rename --path "${e}" --newpath "${u}"`,
      { timeout: 3e4 },
      (n, t) => {
        if (n) {
          i({ success: !1, message: "Failed to rename device file" });
          return;
        }
        try {
          const r = JSON.parse(t.trim());
          i(r);
        } catch {
          i({ success: !1, message: "Invalid output from device" });
        }
      }
    );
  }))), ve.handle("ai:generate", async (c, l) => {
    try {
      const e = fe.join($e.getPath("userData"), "config", "settings.json");
      if (!ce.existsSync(e))
        throw new Error("API Settings not configured. Go to Tools > Settings.");
      const u = ce.readFileSync(e, "utf-8"), i = JSON.parse(u), o = Yl(i.apiKey), n = JSON.stringify({
        ...l,
        apiConfig: {
          ...i,
          apiKey: o
        }
      });
      return {
        success: !0,
        response_text: (await new Promise((r, d) => {
          const g = rr.request(
            {
              hostname: "127.0.0.1",
              port: 4e3,
              path: "/api/v1/ai/generate",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(n)
              }
            },
            (v) => {
              let p = "";
              v.on("data", (w) => p += w), v.on("end", () => {
                try {
                  const w = JSON.parse(p);
                  v.statusCode >= 200 && v.statusCode < 300 ? r(w) : d(new Error(w.error || `MCP Server error: ${v.statusCode}`));
                } catch {
                  d(new Error(`MCP Server returned invalid JSON (status ${v.statusCode})`));
                }
              });
            }
          );
          g.on("error", (v) => {
            d(new Error(`Cannot reach MCP Server: ${v.message}. Is it running?`));
          }), g.write(n), g.end();
        })).data
      };
    } catch (e) {
      return console.error("[AiProxy] Generation failed:", e), { success: !1, error: { type: "RUNTIME", message: e.message } };
    }
  }), ve.handle("window:minimize", () => {
    pe?.minimize();
  }), ve.handle("window:maximize", () => {
    pe?.isMaximized() ? pe.unmaximize() : pe?.maximize();
  }), ve.handle("window:close", () => {
    pe?.close();
  }), ve.handle("terminal:sendInput", async (c, l) => {
    if (Re && Re.isOpen)
      try {
        return Re.write(l), { success: !0 };
      } catch (e) {
        return { success: !1, message: e.message };
      }
    return { success: !1, message: "No active serial monitor" };
  }), ve.handle("pty:start", async (c, l) => {
    if (ct)
      try {
        ct.kill();
      } catch {
      }
    const e = Jt.platform() === "win32" ? "powershell.exe" : "bash";
    try {
      return ct = kc.spawn(e, [], {
        name: "xterm-color",
        cols: 80,
        rows: 24,
        cwd: l || Jt.homedir(),
        env: process.env
      }), ct.onData((u) => {
        pe && pe.webContents.send("pty:output", u);
      }), { success: !0 };
    } catch (u) {
      return { success: !1, message: u.message };
    }
  }), ve.handle("pty:input", async (c, l) => ct ? (ct.write(l), { success: !0 }) : { success: !1, message: "No active shell process" }), ve.handle("hardware:checkArduinoCli", async () => new Promise((c) => {
    Nt("arduino-cli version", (l) => {
      if (!l)
        c(!0);
      else {
        const e = fe.join($e.getPath("userData"), "bin", "arduino-cli.exe");
        if (ce.existsSync(e)) {
          const u = fe.join($e.getPath("userData"), "bin");
          process.env.PATH = `${u};${process.env.PATH}`, c(!0);
        } else
          c(!1);
      }
    });
  })), ve.handle("hardware:installArduinoCli", async () => {
    const c = fe.join($e.getPath("userData"), "bin"), l = fe.join(c, "arduino-cli.exe");
    return ce.existsSync(l) ? (console.log("[StratumStudio] arduino-cli already exists at", l), { success: !0, message: "Already installed" }) : new Promise((e) => {
      const u = [
        "$ErrorActionPreference = 'Stop'",
        "try {",
        `  $binDir = '${c.replace(/\\/g, "\\\\")}'`,
        "  if (-not (Test-Path $binDir)) { New-Item -ItemType Directory -Path $binDir -Force | Out-Null }",
        "  $zipPath = Join-Path $env:TEMP 'arduino-cli.zip'",
        "  $extractDir = Join-Path $env:TEMP 'arduino-cli-extract'",
        "  ",
        "  Write-Host 'Fetching latest arduino-cli version...'",
        "  $release = Invoke-RestMethod -Uri 'https://api.github.com/repos/arduino/arduino-cli/releases/latest'",
        "  $tag = $release.tag_name",
        "  $ver = $tag -replace '^v', ''",
        '  $url = "https://github.com/arduino/arduino-cli/releases/download/$tag/arduino-cli_" + $ver + "_Windows_64bit.zip"',
        '  Write-Host "Downloading arduino-cli $tag from $url"',
        "  ",
        "  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12",
        "  Invoke-WebRequest -Uri $url -OutFile $zipPath -UseBasicParsing",
        "  ",
        "  Write-Host 'Extracting...'",
        "  if (Test-Path $extractDir) { Remove-Item $extractDir -Recurse -Force }",
        "  Expand-Archive -Path $zipPath -DestinationPath $extractDir -Force",
        "  ",
        "  Copy-Item (Join-Path $extractDir 'arduino-cli.exe') $binDir -Force",
        "  Remove-Item $zipPath -Force -ErrorAction SilentlyContinue",
        "  Remove-Item $extractDir -Recurse -Force -ErrorAction SilentlyContinue",
        "  ",
        '  $env:PATH = "$binDir;$env:PATH"',
        "  $cli = Join-Path $binDir 'arduino-cli.exe'",
        "  ",
        "  # Kill any lingering arduino-cli processes that may lock staging files",
        "  Get-Process -Name 'arduino-cli' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue",
        "  Start-Sleep -Seconds 1",
        "  ",
        "  # Clear corrupted staging packages if they exist",
        "  $stagingDir = Join-Path $env:LOCALAPPDATA 'Arduino15\\staging\\packages'",
        "  if (Test-Path $stagingDir) {",
        "    Write-Host 'Clearing staging packages...'",
        "    Remove-Item (Join-Path $stagingDir '*') -Recurse -Force -ErrorAction SilentlyContinue",
        "  }",
        "  ",
        "  Write-Host 'Running: arduino-cli core update-index'",
        "  & $cli core update-index",
        "  ",
        "  # Install arduino:avr with retry logic for corrupted archive errors",
        "  $maxRetries = 3",
        "  $installed = $false",
        "  for ($i = 1; $i -le $maxRetries; $i++) {",
        '    Write-Host "Installing arduino:avr core (attempt $i/$maxRetries)..."',
        "    $out = & $cli core install arduino:avr 2>&1 | Out-String",
        "    Write-Host $out",
        "    if ($LASTEXITCODE -eq 0) { $installed = $true; break }",
        "    if ($out -match 'corrupted') {",
        "      Write-Host 'Corrupted archive detected. Clearing staging and retrying...'",
        "      if (Test-Path $stagingDir) { Remove-Item (Join-Path $stagingDir '*') -Recurse -Force -ErrorAction SilentlyContinue }",
        "      Start-Sleep -Seconds 2",
        "    } else { break }",
        "  }",
        "  if (-not $installed) { Write-Error 'Failed to install arduino:avr core after retries'; exit 1 }",
        "  ",
        "  Write-Host 'arduino-cli installed successfully'",
        "} catch {",
        "  Write-Error $_.Exception.Message",
        "  exit 1",
        "}"
      ].join(`
`), i = en("powershell", ["-ExecutionPolicy", "Bypass", "-Command", u]);
      i.stdout.on("data", (o) => {
        const n = o.toString().trim();
        console.log("[arduino-cli install]", n), pe && pe.webContents.send("terminal-output", n + `
`);
      }), i.stderr.on("data", (o) => {
        const n = o.toString().trim();
        console.error("[arduino-cli install error]", n), pe && pe.webContents.send("terminal-output", "❌ " + n + `
`);
      }), i.on("close", (o) => {
        o === 0 ? (process.env.PATH = `${c};${process.env.PATH}`, console.log("[StratumStudio] arduino-cli installed to", c), e({ success: !0 })) : e({ success: !1, message: `Installation failed with exit code ${o}` });
      }), i.on("error", (o) => {
        e({ success: !1, message: o.message });
      });
    });
  });
  async function h(c) {
    return new Promise((l, e) => {
      (c.startsWith("https") ? nr : rr).get(c, (i) => {
        if (i.statusCode === 301 || i.statusCode === 302) {
          h(i.headers.location).then(l).catch(e);
          return;
        }
        if (i.statusCode !== 200) {
          e(new Error(`Failed to fetch ${c}, status: ${i.statusCode}`));
          return;
        }
        let o = "";
        i.on("data", (n) => o += n.toString()), i.on("end", () => l(o));
      }).on("error", e);
    });
  }
  async function m(c, l) {
    const e = fe.dirname(l);
    return ce.existsSync(e) || ce.mkdirSync(e, { recursive: !0 }), new Promise((u, i) => {
      (c.startsWith("https") ? nr : rr).get(c, (n) => {
        if (n.statusCode === 301 || n.statusCode === 302) {
          m(n.headers.location, l).then(u).catch(i);
          return;
        }
        if (n.statusCode !== 200) {
          i(new Error(`Failed to download ${c}, status: ${n.statusCode}`));
          return;
        }
        const t = ce.createWriteStream(l);
        n.pipe(t), t.on("finish", () => {
          t.close(), u();
        });
      }).on("error", i);
    });
  }
  async function f(c, l, e = "latest") {
    if ((c.startsWith("http://") || c.startsWith("https://")) && (c.endsWith(".py") || c.endsWith(".mpy"))) {
      const t = fe.basename(c);
      await m(c, fe.join(l, t));
      return;
    }
    const u = "https://micropython.org/pi/v2", i = `${u}/package/py/${c}/${e}.json`;
    console.log(`[lib:install] Downloading package info from ${i}`);
    const o = await h(i), n = JSON.parse(o);
    if (n.hashes)
      for (const [t, r] of n.hashes) {
        const d = `${u}/file/${r.slice(0, 2)}/${r}`, g = fe.join(l, t);
        console.log(`[lib:install] Downloading file ${t} from ${d}`), await m(d, g);
      }
    if (n.urls)
      for (const [t, r] of n.urls) {
        const d = fe.join(l, t);
        console.log(`[lib:install] Downloading url ${t} from ${r}`), await m(r, d);
      }
    if (n.deps)
      for (const [t, r] of n.deps)
        console.log(`[lib:install] Downloading dependency ${t}`), await f(t, l, r || "latest");
  }
  ve.handle("hardware:checkMpremote", async () => new Promise((c) => {
    wt(et(), ["-m", "mpremote", "--version"], (l) => {
      c(!l);
    });
  })), ve.handle("hardware:installMpremote", async () => new Promise((c) => {
    wt(et(), ["-m", "pip", "install", "mpremote"], (l, e, u) => {
      c(l ? { success: !1, message: u.trim() || l.message } : { success: !0, message: e.trim() });
    });
  })), ve.handle("lib:search", async (c, { query: l, language: e }) => {
    try {
      if (e === "arduino") {
        const u = fe.join($e.getPath("userData"), "bin"), i = ce.existsSync(fe.join(u, "arduino-cli.exe")) ? fe.join(u, "arduino-cli.exe") : "arduino-cli";
        return new Promise((o) => {
          wt(i, ["lib", "search", l, "--format", "json"], { timeout: 15e3 }, (n, t) => {
            if (n) {
              console.error("[lib:search] arduino-cli error:", n.message), o({ success: !1, packages: [], message: n.message });
              return;
            }
            try {
              const d = (JSON.parse(t).libraries || []).slice(0, 30).map((g) => ({
                name: g.name,
                author: g.latest?.author || "",
                description: g.latest?.sentence || "",
                version: g.latest?.version || "",
                license: g.latest?.license || "Unknown"
              }));
              o({ success: !0, packages: d });
            } catch {
              o({ success: !0, packages: [] });
            }
          });
        });
      } else
        return new Promise((u) => {
          nr.get("https://micropython.org/pi/v2/index.json", (i) => {
            let o = "";
            i.on("data", (n) => o += n.toString()), i.on("end", () => {
              try {
                const t = (JSON.parse(o).packages || []).filter((r) => r.name.toLowerCase().includes(l.toLowerCase())).slice(0, 30).map((r) => ({
                  name: r.name,
                  author: r.author || "",
                  description: r.description || "",
                  version: r.version || "",
                  license: r.license || "MIT"
                }));
                u({ success: !0, packages: t });
              } catch {
                u({ success: !0, packages: [] });
              }
            });
          }).on("error", (i) => {
            u({ success: !1, packages: [], message: i.message });
          });
        });
    } catch (u) {
      return { success: !1, packages: [], message: u.message };
    }
  }), ve.handle("lib:install", async (c, { nameOrUrl: l, workspacePath: e, language: u, port: i, name: o }) => {
    const n = l || o;
    if (!n) return { success: !1, message: "No package name provided" };
    try {
      if (u === "arduino") {
        const t = fe.join($e.getPath("userData"), "bin"), r = ce.existsSync(fe.join(t, "arduino-cli.exe")) ? fe.join(t, "arduino-cli.exe") : "arduino-cli";
        return new Promise((d) => {
          wt(r, ["lib", "install", n], { timeout: 6e4 }, (g, v, p) => {
            d(g ? { success: !1, message: p.trim() || g.message } : { success: !0, fileName: n, message: v.trim() || `Installed ${n}` });
          });
        });
      } else {
        let t = !1;
        try {
          t = await new Promise((d) => {
            wt(et(), ["-m", "mpremote", "--version"], (g) => {
              d(!g);
            });
          });
        } catch {
        }
        if (t) {
          console.log(`[lib:install] mpremote detected. Using mpremote mip install for ${n}`);
          const d = i || "", g = d ? ["-m", "mpremote", "connect", d, "mip", "install", n] : ["-m", "mpremote", "mip", "install", n], v = await new Promise((p) => {
            wt(et(), g, { timeout: 6e4 }, (w, R, P) => {
              p(w ? { success: !1, message: P.trim() || w.message } : { success: !0, fileName: n, message: R.trim() || `Installed ${n}` });
            });
          });
          if (v.success)
            return v;
          console.warn(`[lib:install] mpremote mip install failed: ${v.message}. Falling back to native Node.js downloader...`);
        }
        if (!e)
          return { success: !1, message: "No local workspace open to install package." };
        const r = fe.join(e, "lib");
        return await f(n, r), { success: !0, fileName: n, message: `Successfully installed ${n} natively into local /lib directory.` };
      }
    } catch (t) {
      return { success: !1, message: t.message };
    }
  }), ve.handle("pty:resize", async (c, { cols: l, rows: e }) => ct ? (ct.resize(l, e), { success: !0 }) : { success: !1 }), ve.handle("firmware:listVolumes", async () => {
    try {
      if (process.platform === "win32")
        return new Promise((c) => {
          Nt('wmic logicaldisk where "DriveType=2" get DeviceID,VolumeName /format:csv', (l, e) => {
            if (l) {
              c([]);
              return;
            }
            const i = e.trim().split(`
`).filter((o) => o.includes(",")).slice(1).map((o) => {
              const n = o.trim().split(","), t = n[1] || "", r = n[2] || "Removable Disk";
              return { path: t + "\\", label: `${r} (${t})` };
            }).filter((o) => o.path.length > 1);
            c(i);
          });
        });
      if (process.platform === "darwin") {
        const c = "/Volumes";
        return ce.existsSync(c) ? ce.readdirSync(c).map((e) => ({
          path: fe.join(c, e),
          label: e
        })) : [];
      } else {
        const c = Jt.userInfo().username, l = [`/media/${c}`, `/run/media/${c}`], e = [];
        for (const u of l)
          if (ce.existsSync(u))
            for (const i of ce.readdirSync(u))
              e.push({ path: fe.join(u, i), label: i });
        return e;
      }
    } catch {
      return [];
    }
  }), ve.handle("firmware:install", async (c, { sourcePath: l, targetVolume: e }) => {
    try {
      if (!ce.existsSync(l))
        return { success: !1, message: "Firmware file not found: " + l };
      const u = fe.basename(l), i = fe.join(e, u), n = ce.statSync(l).size;
      if (n === 0)
        return { success: !1, message: "Firmware file is empty" };
      const t = ce.createReadStream(l), r = ce.createWriteStream(i);
      let d = 0;
      return t.on("data", (g) => {
        d += g.length;
        const v = Math.round(d / n * 100);
        pe && pe.webContents.send("firmware-progress", {
          percent: v,
          message: `Copying ${u}... ${v}%`
        });
      }), new Promise((g) => {
        r.on("finish", () => {
          pe && pe.webContents.send("firmware-progress", {
            percent: 100,
            message: "Firmware installed successfully!",
            done: !0
          }), g({ success: !0 });
        }), r.on("error", (v) => {
          pe && pe.webContents.send("firmware-progress", {
            percent: 0,
            message: v.message,
            error: v.message
          }), g({ success: !1, message: v.message });
        }), t.on("error", (v) => {
          pe && pe.webContents.send("firmware-progress", {
            percent: 0,
            message: v.message,
            error: v.message
          }), g({ success: !1, message: v.message });
        }), t.pipe(r);
      });
    } catch (u) {
      return { success: !1, message: u.message };
    }
  }), ve.handle("shell:openExternal", async (c, l) => {
    try {
      return await Ha.openExternal(l), { success: !0 };
    } catch (e) {
      return { success: !1, message: e.message };
    }
  }), ve.handle("firmware:download", async (c, { url: l, fileName: e }) => {
    try {
      const u = fe.join($e.getPath("userData"), "firmware-cache");
      ce.existsSync(u) || ce.mkdirSync(u, { recursive: !0 });
      const i = fe.join(u, e);
      return ce.existsSync(i) && ce.statSync(i).size > 0 ? (console.log(`[Firmware] Using cached: ${i}`), pe && pe.webContents.send("firmware-progress", {
        percent: 100,
        message: "Using cached firmware file..."
      }), { success: !0, filePath: i }) : new Promise((o) => {
        const n = (r, d = 0) => {
          if (d > 5) {
            o({ success: !1, message: "Too many redirects" });
            return;
          }
          (r.startsWith("https") ? nr : rr).get(r, (v) => {
            if (v.statusCode >= 300 && v.statusCode < 400 && v.headers.location) {
              const p = v.headers.location;
              (p.startsWith("https") ? nr : rr).get(p, (R) => {
                if (R.statusCode >= 300 && R.statusCode < 400 && R.headers.location) {
                  n(R.headers.location, d + 2);
                  return;
                }
                t(R);
              }).on("error", (R) => {
                o({ success: !1, message: `Download failed: ${R.message}` });
              });
              return;
            }
            t(v);
          }).on("error", (v) => {
            o({ success: !1, message: `Download failed: ${v.message}` });
          });
        }, t = (r) => {
          if (r.statusCode !== 200) {
            o({ success: !1, message: `Server returned ${r.statusCode}` });
            return;
          }
          const d = parseInt(r.headers["content-length"] || "0", 10);
          let g = 0;
          const v = ce.createWriteStream(i);
          r.on("data", (p) => {
            if (g += p.length, d > 0) {
              const w = Math.round(g / d * 100);
              pe && pe.webContents.send("firmware-progress", {
                percent: w,
                message: `Downloading ${e}... ${(g / 1024 / 1024).toFixed(1)} MB`
              });
            } else
              pe && pe.webContents.send("firmware-progress", {
                percent: -1,
                message: `Downloading ${e}... ${(g / 1024 / 1024).toFixed(1)} MB`
              });
          }), r.pipe(v), v.on("finish", () => {
            v.close(), console.log(`[Firmware] Downloaded: ${i}`), o({ success: !0, filePath: i });
          }), v.on("error", (p) => {
            ce.unlinkSync(i), o({ success: !1, message: p.message });
          });
        };
        n(l);
      });
    } catch (u) {
      return { success: !1, message: u.message };
    }
  });
}
function Mu(s = 0) {
  const h = Rt(fe.join("mcp-server", "src", "server.js")), m = Rt("mcp-server");
  if (ce.existsSync(h)) {
    console.log(`[ElectroAI] Starting MCP Server at ${h}...`), ft = en(process.execPath, [h], {
      cwd: m,
      stdio: "pipe",
      env: {
        ...process.env,
        ELECTRON_RUN_AS_NODE: "1",
        PORT: "4000",
        WS_PORT: "4001",
        // Ensure require() can find node_modules in the bundled mcp-server
        NODE_PATH: fe.join(m, "node_modules")
      }
    });
    const f = fe.join($e.getPath("userData"), "mcp_debug.log");
    ce.appendFileSync(f, `
--- STARTING MCP SERVER at ${(/* @__PURE__ */ new Date()).toISOString()} ---
`), ce.appendFileSync(f, `mcpPath: ${h}
cwd: ${m}
NODE_PATH: ${fe.join(m, "node_modules")}
retry: ${s}
`), ft.stdout?.on("data", (c) => {
      console.log(`[MCP] ${c}`), ce.appendFileSync(f, `[STDOUT] ${c}`);
    }), ft.stderr?.on("data", (c) => {
      console.error(`[MCP] ${c}`), ce.appendFileSync(f, `[STDERR] ${c}`);
    }), ft.on("error", (c) => {
      console.error("[ElectroAI] Failed to start MCP Server:", c), ce.appendFileSync(f, `[SPAWN ERROR] ${c.message}
${c.stack}
`);
    }), ft.on("close", (c) => {
      console.log(`[ElectroAI] MCP Server exited with code ${c}`), ce.appendFileSync(f, `[EXIT] Code ${c}
`), ft = null, c !== 0 && c !== null && s < 3 && (console.log(`[ElectroAI] MCP crashed — restarting (attempt ${s + 1}/3)...`), ce.appendFileSync(f, `[RESTART] Attempt ${s + 1}/3
`), setTimeout(() => Mu(s + 1), 2e3));
    });
  } else {
    console.warn(`[ElectroAI] MCP Server not found at ${h}`);
    const f = fe.join($e.getPath("userData"), "mcp_debug.log");
    ce.appendFileSync(f, `
[NOT FOUND] ${h}
resourcesPath: ${process.resourcesPath}
isPackaged: ${$e.isPackaged}
`);
  }
}
function Bu() {
  if (Re)
    try {
      Re.close();
    } catch {
    }
  if (ct)
    try {
      ct.kill();
    } catch {
    }
  if (ft)
    try {
      process.platform === "win32" && ft.pid ? eu(`taskkill /pid ${ft.pid} /T /F`, { stdio: "ignore" }) : ft.kill("SIGKILL");
    } catch {
    }
}
$e.on("before-quit", () => {
  Bu();
});
$e.on("window-all-closed", () => {
  Bu(), process.platform !== "darwin" && ($e.quit(), pe = null);
});
$e.on("second-instance", () => {
  pe && (pe.isMinimized() && pe.restore(), pe.focus());
});
$e.on("activate", () => {
  Xl.getAllWindows().length === 0 && qu();
});
ku && $e.whenReady().then(() => {
  hd(), Mu(), qu(), setTimeout(() => gt.autoUpdater.checkForUpdates(), 3e3);
});
export {
  sh as MAIN_DIST,
  $u as RENDERER_DIST,
  ma as VITE_DEV_SERVER_URL
};
