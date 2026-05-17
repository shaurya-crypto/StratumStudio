import Ut, { ipcMain as Se, app as He, BrowserWindow as Xl, dialog as fn, shell as Ba, safeStorage as Kr } from "electron";
import { fileURLToPath as Lc } from "node:url";
import Rt from "fs";
import Uc from "constants";
import br from "stream";
import pa from "util";
import Jl from "assert";
import ke from "path";
import Qr from "child_process";
import Kl from "events";
import Pr from "crypto";
import Ql from "tty";
import Zr from "os";
import At from "url";
import Zl from "zlib";
import kc from "http";
import we from "node:path";
import { exec as jt, spawn as da, execFile as ja, execSync as eu } from "node:child_process";
import fe from "node:fs";
import Xt from "node:os";
import dn from "node:http";
import Ha from "node:https";
import $c from "node-pty";
import { SerialPort as tr } from "serialport";
var st = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, It = {}, hn = {}, $r = {}, Ga;
function et() {
  return Ga || (Ga = 1, $r.fromCallback = function(i) {
    return Object.defineProperty(function(...h) {
      if (typeof h[h.length - 1] == "function") i.apply(this, h);
      else
        return new Promise((d, l) => {
          h.push((u, c) => u != null ? l(u) : d(c)), i.apply(this, h);
        });
    }, "name", { value: i.name });
  }, $r.fromPromise = function(i) {
    return Object.defineProperty(function(...h) {
      const d = h[h.length - 1];
      if (typeof d != "function") return i.apply(this, h);
      h.pop(), i.apply(this, h).then((l) => d(null, l), d);
    }, "name", { value: i.name });
  }), $r;
}
var pn, Wa;
function qc() {
  if (Wa) return pn;
  Wa = 1;
  var i = Uc, h = process.cwd, d = null, l = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return d || (d = h.call(process)), d;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var u = process.chdir;
    process.chdir = function(r) {
      d = null, u.call(process, r);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, u);
  }
  pn = c;
  function c(r) {
    i.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && f(r), r.lutimes || a(r), r.chown = t(r.chown), r.fchown = t(r.fchown), r.lchown = t(r.lchown), r.chmod = o(r.chmod), r.fchmod = o(r.fchmod), r.lchmod = o(r.lchmod), r.chownSync = e(r.chownSync), r.fchownSync = e(r.fchownSync), r.lchownSync = e(r.lchownSync), r.chmodSync = s(r.chmodSync), r.fchmodSync = s(r.fchmodSync), r.lchmodSync = s(r.lchmodSync), r.stat = p(r.stat), r.fstat = p(r.fstat), r.lstat = p(r.lstat), r.statSync = y(r.statSync), r.fstatSync = y(r.fstatSync), r.lstatSync = y(r.lstatSync), r.chmod && !r.lchmod && (r.lchmod = function(m, _, A) {
      A && process.nextTick(A);
    }, r.lchmodSync = function() {
    }), r.chown && !r.lchown && (r.lchown = function(m, _, A, P) {
      P && process.nextTick(P);
    }, r.lchownSync = function() {
    }), l === "win32" && (r.rename = typeof r.rename != "function" ? r.rename : (function(m) {
      function _(A, P, N) {
        var C = Date.now(), D = 0;
        m(A, P, function b(S) {
          if (S && (S.code === "EACCES" || S.code === "EPERM" || S.code === "EBUSY") && Date.now() - C < 6e4) {
            setTimeout(function() {
              r.stat(P, function(O, w) {
                O && O.code === "ENOENT" ? m(A, P, b) : N(S);
              });
            }, D), D < 100 && (D += 10);
            return;
          }
          N && N(S);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(_, m), _;
    })(r.rename)), r.read = typeof r.read != "function" ? r.read : (function(m) {
      function _(A, P, N, C, D, b) {
        var S;
        if (b && typeof b == "function") {
          var O = 0;
          S = function(w, $, k) {
            if (w && w.code === "EAGAIN" && O < 10)
              return O++, m.call(r, A, P, N, C, D, S);
            b.apply(this, arguments);
          };
        }
        return m.call(r, A, P, N, C, D, S);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(_, m), _;
    })(r.read), r.readSync = typeof r.readSync != "function" ? r.readSync : /* @__PURE__ */ (function(m) {
      return function(_, A, P, N, C) {
        for (var D = 0; ; )
          try {
            return m.call(r, _, A, P, N, C);
          } catch (b) {
            if (b.code === "EAGAIN" && D < 10) {
              D++;
              continue;
            }
            throw b;
          }
      };
    })(r.readSync);
    function f(m) {
      m.lchmod = function(_, A, P) {
        m.open(
          _,
          i.O_WRONLY | i.O_SYMLINK,
          A,
          function(N, C) {
            if (N) {
              P && P(N);
              return;
            }
            m.fchmod(C, A, function(D) {
              m.close(C, function(b) {
                P && P(D || b);
              });
            });
          }
        );
      }, m.lchmodSync = function(_, A) {
        var P = m.openSync(_, i.O_WRONLY | i.O_SYMLINK, A), N = !0, C;
        try {
          C = m.fchmodSync(P, A), N = !1;
        } finally {
          if (N)
            try {
              m.closeSync(P);
            } catch {
            }
          else
            m.closeSync(P);
        }
        return C;
      };
    }
    function a(m) {
      i.hasOwnProperty("O_SYMLINK") && m.futimes ? (m.lutimes = function(_, A, P, N) {
        m.open(_, i.O_SYMLINK, function(C, D) {
          if (C) {
            N && N(C);
            return;
          }
          m.futimes(D, A, P, function(b) {
            m.close(D, function(S) {
              N && N(b || S);
            });
          });
        });
      }, m.lutimesSync = function(_, A, P) {
        var N = m.openSync(_, i.O_SYMLINK), C, D = !0;
        try {
          C = m.futimesSync(N, A, P), D = !1;
        } finally {
          if (D)
            try {
              m.closeSync(N);
            } catch {
            }
          else
            m.closeSync(N);
        }
        return C;
      }) : m.futimes && (m.lutimes = function(_, A, P, N) {
        N && process.nextTick(N);
      }, m.lutimesSync = function() {
      });
    }
    function o(m) {
      return m && function(_, A, P) {
        return m.call(r, _, A, function(N) {
          v(N) && (N = null), P && P.apply(this, arguments);
        });
      };
    }
    function s(m) {
      return m && function(_, A) {
        try {
          return m.call(r, _, A);
        } catch (P) {
          if (!v(P)) throw P;
        }
      };
    }
    function t(m) {
      return m && function(_, A, P, N) {
        return m.call(r, _, A, P, function(C) {
          v(C) && (C = null), N && N.apply(this, arguments);
        });
      };
    }
    function e(m) {
      return m && function(_, A, P) {
        try {
          return m.call(r, _, A, P);
        } catch (N) {
          if (!v(N)) throw N;
        }
      };
    }
    function p(m) {
      return m && function(_, A, P) {
        typeof A == "function" && (P = A, A = null);
        function N(C, D) {
          D && (D.uid < 0 && (D.uid += 4294967296), D.gid < 0 && (D.gid += 4294967296)), P && P.apply(this, arguments);
        }
        return A ? m.call(r, _, A, N) : m.call(r, _, N);
      };
    }
    function y(m) {
      return m && function(_, A) {
        var P = A ? m.call(r, _, A) : m.call(r, _);
        return P && (P.uid < 0 && (P.uid += 4294967296), P.gid < 0 && (P.gid += 4294967296)), P;
      };
    }
    function v(m) {
      if (!m || m.code === "ENOSYS")
        return !0;
      var _ = !process.getuid || process.getuid() !== 0;
      return !!(_ && (m.code === "EINVAL" || m.code === "EPERM"));
    }
  }
  return pn;
}
var mn, Va;
function Mc() {
  if (Va) return mn;
  Va = 1;
  var i = br.Stream;
  mn = h;
  function h(d) {
    return {
      ReadStream: l,
      WriteStream: u
    };
    function l(c, r) {
      if (!(this instanceof l)) return new l(c, r);
      i.call(this);
      var f = this;
      this.path = c, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, r = r || {};
      for (var a = Object.keys(r), o = 0, s = a.length; o < s; o++) {
        var t = a[o];
        this[t] = r[t];
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
          f._read();
        });
        return;
      }
      d.open(this.path, this.flags, this.mode, function(e, p) {
        if (e) {
          f.emit("error", e), f.readable = !1;
          return;
        }
        f.fd = p, f.emit("open", p), f._read();
      });
    }
    function u(c, r) {
      if (!(this instanceof u)) return new u(c, r);
      i.call(this), this.path = c, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, r = r || {};
      for (var f = Object.keys(r), a = 0, o = f.length; a < o; a++) {
        var s = f[a];
        this[s] = r[s];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = d.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return mn;
}
var gn, Ya;
function Bc() {
  if (Ya) return gn;
  Ya = 1, gn = h;
  var i = Object.getPrototypeOf || function(d) {
    return d.__proto__;
  };
  function h(d) {
    if (d === null || typeof d != "object")
      return d;
    if (d instanceof Object)
      var l = { __proto__: i(d) };
    else
      var l = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(d).forEach(function(u) {
      Object.defineProperty(l, u, Object.getOwnPropertyDescriptor(d, u));
    }), l;
  }
  return gn;
}
var qr, za;
function Qe() {
  if (za) return qr;
  za = 1;
  var i = Rt, h = qc(), d = Mc(), l = Bc(), u = pa, c, r;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (c = /* @__PURE__ */ Symbol.for("graceful-fs.queue"), r = /* @__PURE__ */ Symbol.for("graceful-fs.previous")) : (c = "___graceful-fs.queue", r = "___graceful-fs.previous");
  function f() {
  }
  function a(m, _) {
    Object.defineProperty(m, c, {
      get: function() {
        return _;
      }
    });
  }
  var o = f;
  if (u.debuglog ? o = u.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (o = function() {
    var m = u.format.apply(u, arguments);
    m = "GFS4: " + m.split(/\n/).join(`
GFS4: `), console.error(m);
  }), !i[c]) {
    var s = st[c] || [];
    a(i, s), i.close = (function(m) {
      function _(A, P) {
        return m.call(i, A, function(N) {
          N || y(), typeof P == "function" && P.apply(this, arguments);
        });
      }
      return Object.defineProperty(_, r, {
        value: m
      }), _;
    })(i.close), i.closeSync = (function(m) {
      function _(A) {
        m.apply(i, arguments), y();
      }
      return Object.defineProperty(_, r, {
        value: m
      }), _;
    })(i.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      o(i[c]), Jl.equal(i[c].length, 0);
    });
  }
  st[c] || a(st, i[c]), qr = t(l(i)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !i.__patched && (qr = t(i), i.__patched = !0);
  function t(m) {
    h(m), m.gracefulify = t, m.createReadStream = me, m.createWriteStream = Z;
    var _ = m.readFile;
    m.readFile = A;
    function A(Q, ce, Ee) {
      return typeof ce == "function" && (Ee = ce, ce = null), be(Q, ce, Ee);
      function be(Ne, Ie, Te, E) {
        return _(Ne, Ie, function(g) {
          g && (g.code === "EMFILE" || g.code === "ENFILE") ? e([be, [Ne, Ie, Te], g, E || Date.now(), Date.now()]) : typeof Te == "function" && Te.apply(this, arguments);
        });
      }
    }
    var P = m.writeFile;
    m.writeFile = N;
    function N(Q, ce, Ee, be) {
      return typeof Ee == "function" && (be = Ee, Ee = null), Ne(Q, ce, Ee, be);
      function Ne(Ie, Te, E, g, q) {
        return P(Ie, Te, E, function(I) {
          I && (I.code === "EMFILE" || I.code === "ENFILE") ? e([Ne, [Ie, Te, E, g], I, q || Date.now(), Date.now()]) : typeof g == "function" && g.apply(this, arguments);
        });
      }
    }
    var C = m.appendFile;
    C && (m.appendFile = D);
    function D(Q, ce, Ee, be) {
      return typeof Ee == "function" && (be = Ee, Ee = null), Ne(Q, ce, Ee, be);
      function Ne(Ie, Te, E, g, q) {
        return C(Ie, Te, E, function(I) {
          I && (I.code === "EMFILE" || I.code === "ENFILE") ? e([Ne, [Ie, Te, E, g], I, q || Date.now(), Date.now()]) : typeof g == "function" && g.apply(this, arguments);
        });
      }
    }
    var b = m.copyFile;
    b && (m.copyFile = S);
    function S(Q, ce, Ee, be) {
      return typeof Ee == "function" && (be = Ee, Ee = 0), Ne(Q, ce, Ee, be);
      function Ne(Ie, Te, E, g, q) {
        return b(Ie, Te, E, function(I) {
          I && (I.code === "EMFILE" || I.code === "ENFILE") ? e([Ne, [Ie, Te, E, g], I, q || Date.now(), Date.now()]) : typeof g == "function" && g.apply(this, arguments);
        });
      }
    }
    var O = m.readdir;
    m.readdir = $;
    var w = /^v[0-5]\./;
    function $(Q, ce, Ee) {
      typeof ce == "function" && (Ee = ce, ce = null);
      var be = w.test(process.version) ? function(Te, E, g, q) {
        return O(Te, Ne(
          Te,
          E,
          g,
          q
        ));
      } : function(Te, E, g, q) {
        return O(Te, E, Ne(
          Te,
          E,
          g,
          q
        ));
      };
      return be(Q, ce, Ee);
      function Ne(Ie, Te, E, g) {
        return function(q, I) {
          q && (q.code === "EMFILE" || q.code === "ENFILE") ? e([
            be,
            [Ie, Te, E],
            q,
            g || Date.now(),
            Date.now()
          ]) : (I && I.sort && I.sort(), typeof E == "function" && E.call(this, q, I));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var k = d(m);
      F = k.ReadStream, Y = k.WriteStream;
    }
    var M = m.ReadStream;
    M && (F.prototype = Object.create(M.prototype), F.prototype.open = G);
    var L = m.WriteStream;
    L && (Y.prototype = Object.create(L.prototype), Y.prototype.open = ee), Object.defineProperty(m, "ReadStream", {
      get: function() {
        return F;
      },
      set: function(Q) {
        F = Q;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(m, "WriteStream", {
      get: function() {
        return Y;
      },
      set: function(Q) {
        Y = Q;
      },
      enumerable: !0,
      configurable: !0
    });
    var x = F;
    Object.defineProperty(m, "FileReadStream", {
      get: function() {
        return x;
      },
      set: function(Q) {
        x = Q;
      },
      enumerable: !0,
      configurable: !0
    });
    var H = Y;
    Object.defineProperty(m, "FileWriteStream", {
      get: function() {
        return H;
      },
      set: function(Q) {
        H = Q;
      },
      enumerable: !0,
      configurable: !0
    });
    function F(Q, ce) {
      return this instanceof F ? (M.apply(this, arguments), this) : F.apply(Object.create(F.prototype), arguments);
    }
    function G() {
      var Q = this;
      ge(Q.path, Q.flags, Q.mode, function(ce, Ee) {
        ce ? (Q.autoClose && Q.destroy(), Q.emit("error", ce)) : (Q.fd = Ee, Q.emit("open", Ee), Q.read());
      });
    }
    function Y(Q, ce) {
      return this instanceof Y ? (L.apply(this, arguments), this) : Y.apply(Object.create(Y.prototype), arguments);
    }
    function ee() {
      var Q = this;
      ge(Q.path, Q.flags, Q.mode, function(ce, Ee) {
        ce ? (Q.destroy(), Q.emit("error", ce)) : (Q.fd = Ee, Q.emit("open", Ee));
      });
    }
    function me(Q, ce) {
      return new m.ReadStream(Q, ce);
    }
    function Z(Q, ce) {
      return new m.WriteStream(Q, ce);
    }
    var ve = m.open;
    m.open = ge;
    function ge(Q, ce, Ee, be) {
      return typeof Ee == "function" && (be = Ee, Ee = null), Ne(Q, ce, Ee, be);
      function Ne(Ie, Te, E, g, q) {
        return ve(Ie, Te, E, function(I, Ae) {
          I && (I.code === "EMFILE" || I.code === "ENFILE") ? e([Ne, [Ie, Te, E, g], I, q || Date.now(), Date.now()]) : typeof g == "function" && g.apply(this, arguments);
        });
      }
    }
    return m;
  }
  function e(m) {
    o("ENQUEUE", m[0].name, m[1]), i[c].push(m), v();
  }
  var p;
  function y() {
    for (var m = Date.now(), _ = 0; _ < i[c].length; ++_)
      i[c][_].length > 2 && (i[c][_][3] = m, i[c][_][4] = m);
    v();
  }
  function v() {
    if (clearTimeout(p), p = void 0, i[c].length !== 0) {
      var m = i[c].shift(), _ = m[0], A = m[1], P = m[2], N = m[3], C = m[4];
      if (N === void 0)
        o("RETRY", _.name, A), _.apply(null, A);
      else if (Date.now() - N >= 6e4) {
        o("TIMEOUT", _.name, A);
        var D = A.pop();
        typeof D == "function" && D.call(null, P);
      } else {
        var b = Date.now() - C, S = Math.max(C - N, 1), O = Math.min(S * 1.2, 100);
        b >= O ? (o("RETRY", _.name, A), _.apply(null, A.concat([N]))) : i[c].push(m);
      }
      p === void 0 && (p = setTimeout(v, 0));
    }
  }
  return qr;
}
var Xa;
function Jt() {
  return Xa || (Xa = 1, (function(i) {
    const h = et().fromCallback, d = Qe(), l = [
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
    ].filter((u) => typeof d[u] == "function");
    Object.assign(i, d), l.forEach((u) => {
      i[u] = h(d[u]);
    }), i.exists = function(u, c) {
      return typeof c == "function" ? d.exists(u, c) : new Promise((r) => d.exists(u, r));
    }, i.read = function(u, c, r, f, a, o) {
      return typeof o == "function" ? d.read(u, c, r, f, a, o) : new Promise((s, t) => {
        d.read(u, c, r, f, a, (e, p, y) => {
          if (e) return t(e);
          s({ bytesRead: p, buffer: y });
        });
      });
    }, i.write = function(u, c, ...r) {
      return typeof r[r.length - 1] == "function" ? d.write(u, c, ...r) : new Promise((f, a) => {
        d.write(u, c, ...r, (o, s, t) => {
          if (o) return a(o);
          f({ bytesWritten: s, buffer: t });
        });
      });
    }, typeof d.writev == "function" && (i.writev = function(u, c, ...r) {
      return typeof r[r.length - 1] == "function" ? d.writev(u, c, ...r) : new Promise((f, a) => {
        d.writev(u, c, ...r, (o, s, t) => {
          if (o) return a(o);
          f({ bytesWritten: s, buffers: t });
        });
      });
    }), typeof d.realpath.native == "function" ? i.realpath.native = h(d.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  })(hn)), hn;
}
var Mr = {}, yn = {}, Ja;
function jc() {
  if (Ja) return yn;
  Ja = 1;
  const i = ke;
  return yn.checkPath = function(d) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(d.replace(i.parse(d).root, ""))) {
      const u = new Error(`Path contains invalid characters: ${d}`);
      throw u.code = "EINVAL", u;
    }
  }, yn;
}
var Ka;
function Hc() {
  if (Ka) return Mr;
  Ka = 1;
  const i = /* @__PURE__ */ Jt(), { checkPath: h } = /* @__PURE__ */ jc(), d = (l) => {
    const u = { mode: 511 };
    return typeof l == "number" ? l : { ...u, ...l }.mode;
  };
  return Mr.makeDir = async (l, u) => (h(l), i.mkdir(l, {
    mode: d(u),
    recursive: !0
  })), Mr.makeDirSync = (l, u) => (h(l), i.mkdirSync(l, {
    mode: d(u),
    recursive: !0
  })), Mr;
}
var vn, Qa;
function ft() {
  if (Qa) return vn;
  Qa = 1;
  const i = et().fromPromise, { makeDir: h, makeDirSync: d } = /* @__PURE__ */ Hc(), l = i(h);
  return vn = {
    mkdirs: l,
    mkdirsSync: d,
    // alias
    mkdirp: l,
    mkdirpSync: d,
    ensureDir: l,
    ensureDirSync: d
  }, vn;
}
var En, Za;
function kt() {
  if (Za) return En;
  Za = 1;
  const i = et().fromPromise, h = /* @__PURE__ */ Jt();
  function d(l) {
    return h.access(l).then(() => !0).catch(() => !1);
  }
  return En = {
    pathExists: i(d),
    pathExistsSync: h.existsSync
  }, En;
}
var wn, es;
function tu() {
  if (es) return wn;
  es = 1;
  const i = Qe();
  function h(l, u, c, r) {
    i.open(l, "r+", (f, a) => {
      if (f) return r(f);
      i.futimes(a, u, c, (o) => {
        i.close(a, (s) => {
          r && r(o || s);
        });
      });
    });
  }
  function d(l, u, c) {
    const r = i.openSync(l, "r+");
    return i.futimesSync(r, u, c), i.closeSync(r);
  }
  return wn = {
    utimesMillis: h,
    utimesMillisSync: d
  }, wn;
}
var _n, ts;
function Kt() {
  if (ts) return _n;
  ts = 1;
  const i = /* @__PURE__ */ Jt(), h = ke, d = pa;
  function l(e, p, y) {
    const v = y.dereference ? (m) => i.stat(m, { bigint: !0 }) : (m) => i.lstat(m, { bigint: !0 });
    return Promise.all([
      v(e),
      v(p).catch((m) => {
        if (m.code === "ENOENT") return null;
        throw m;
      })
    ]).then(([m, _]) => ({ srcStat: m, destStat: _ }));
  }
  function u(e, p, y) {
    let v;
    const m = y.dereference ? (A) => i.statSync(A, { bigint: !0 }) : (A) => i.lstatSync(A, { bigint: !0 }), _ = m(e);
    try {
      v = m(p);
    } catch (A) {
      if (A.code === "ENOENT") return { srcStat: _, destStat: null };
      throw A;
    }
    return { srcStat: _, destStat: v };
  }
  function c(e, p, y, v, m) {
    d.callbackify(l)(e, p, v, (_, A) => {
      if (_) return m(_);
      const { srcStat: P, destStat: N } = A;
      if (N) {
        if (o(P, N)) {
          const C = h.basename(e), D = h.basename(p);
          return y === "move" && C !== D && C.toLowerCase() === D.toLowerCase() ? m(null, { srcStat: P, destStat: N, isChangingCase: !0 }) : m(new Error("Source and destination must not be the same."));
        }
        if (P.isDirectory() && !N.isDirectory())
          return m(new Error(`Cannot overwrite non-directory '${p}' with directory '${e}'.`));
        if (!P.isDirectory() && N.isDirectory())
          return m(new Error(`Cannot overwrite directory '${p}' with non-directory '${e}'.`));
      }
      return P.isDirectory() && s(e, p) ? m(new Error(t(e, p, y))) : m(null, { srcStat: P, destStat: N });
    });
  }
  function r(e, p, y, v) {
    const { srcStat: m, destStat: _ } = u(e, p, v);
    if (_) {
      if (o(m, _)) {
        const A = h.basename(e), P = h.basename(p);
        if (y === "move" && A !== P && A.toLowerCase() === P.toLowerCase())
          return { srcStat: m, destStat: _, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (m.isDirectory() && !_.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${e}'.`);
      if (!m.isDirectory() && _.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${e}'.`);
    }
    if (m.isDirectory() && s(e, p))
      throw new Error(t(e, p, y));
    return { srcStat: m, destStat: _ };
  }
  function f(e, p, y, v, m) {
    const _ = h.resolve(h.dirname(e)), A = h.resolve(h.dirname(y));
    if (A === _ || A === h.parse(A).root) return m();
    i.stat(A, { bigint: !0 }, (P, N) => P ? P.code === "ENOENT" ? m() : m(P) : o(p, N) ? m(new Error(t(e, y, v))) : f(e, p, A, v, m));
  }
  function a(e, p, y, v) {
    const m = h.resolve(h.dirname(e)), _ = h.resolve(h.dirname(y));
    if (_ === m || _ === h.parse(_).root) return;
    let A;
    try {
      A = i.statSync(_, { bigint: !0 });
    } catch (P) {
      if (P.code === "ENOENT") return;
      throw P;
    }
    if (o(p, A))
      throw new Error(t(e, y, v));
    return a(e, p, _, v);
  }
  function o(e, p) {
    return p.ino && p.dev && p.ino === e.ino && p.dev === e.dev;
  }
  function s(e, p) {
    const y = h.resolve(e).split(h.sep).filter((m) => m), v = h.resolve(p).split(h.sep).filter((m) => m);
    return y.reduce((m, _, A) => m && v[A] === _, !0);
  }
  function t(e, p, y) {
    return `Cannot ${y} '${e}' to a subdirectory of itself, '${p}'.`;
  }
  return _n = {
    checkPaths: c,
    checkPathsSync: r,
    checkParentPaths: f,
    checkParentPathsSync: a,
    isSrcSubdir: s,
    areIdentical: o
  }, _n;
}
var Sn, rs;
function Gc() {
  if (rs) return Sn;
  rs = 1;
  const i = Qe(), h = ke, d = ft().mkdirs, l = kt().pathExists, u = tu().utimesMillis, c = /* @__PURE__ */ Kt();
  function r($, k, M, L) {
    typeof M == "function" && !L ? (L = M, M = {}) : typeof M == "function" && (M = { filter: M }), L = L || function() {
    }, M = M || {}, M.clobber = "clobber" in M ? !!M.clobber : !0, M.overwrite = "overwrite" in M ? !!M.overwrite : M.clobber, M.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), c.checkPaths($, k, "copy", M, (x, H) => {
      if (x) return L(x);
      const { srcStat: F, destStat: G } = H;
      c.checkParentPaths($, F, k, "copy", (Y) => Y ? L(Y) : M.filter ? a(f, G, $, k, M, L) : f(G, $, k, M, L));
    });
  }
  function f($, k, M, L, x) {
    const H = h.dirname(M);
    l(H, (F, G) => {
      if (F) return x(F);
      if (G) return s($, k, M, L, x);
      d(H, (Y) => Y ? x(Y) : s($, k, M, L, x));
    });
  }
  function a($, k, M, L, x, H) {
    Promise.resolve(x.filter(M, L)).then((F) => F ? $(k, M, L, x, H) : H(), (F) => H(F));
  }
  function o($, k, M, L, x) {
    return L.filter ? a(s, $, k, M, L, x) : s($, k, M, L, x);
  }
  function s($, k, M, L, x) {
    (L.dereference ? i.stat : i.lstat)(k, (F, G) => F ? x(F) : G.isDirectory() ? N(G, $, k, M, L, x) : G.isFile() || G.isCharacterDevice() || G.isBlockDevice() ? t(G, $, k, M, L, x) : G.isSymbolicLink() ? O($, k, M, L, x) : G.isSocket() ? x(new Error(`Cannot copy a socket file: ${k}`)) : G.isFIFO() ? x(new Error(`Cannot copy a FIFO pipe: ${k}`)) : x(new Error(`Unknown file: ${k}`)));
  }
  function t($, k, M, L, x, H) {
    return k ? e($, M, L, x, H) : p($, M, L, x, H);
  }
  function e($, k, M, L, x) {
    if (L.overwrite)
      i.unlink(M, (H) => H ? x(H) : p($, k, M, L, x));
    else return L.errorOnExist ? x(new Error(`'${M}' already exists`)) : x();
  }
  function p($, k, M, L, x) {
    i.copyFile(k, M, (H) => H ? x(H) : L.preserveTimestamps ? y($.mode, k, M, x) : A(M, $.mode, x));
  }
  function y($, k, M, L) {
    return v($) ? m(M, $, (x) => x ? L(x) : _($, k, M, L)) : _($, k, M, L);
  }
  function v($) {
    return ($ & 128) === 0;
  }
  function m($, k, M) {
    return A($, k | 128, M);
  }
  function _($, k, M, L) {
    P(k, M, (x) => x ? L(x) : A(M, $, L));
  }
  function A($, k, M) {
    return i.chmod($, k, M);
  }
  function P($, k, M) {
    i.stat($, (L, x) => L ? M(L) : u(k, x.atime, x.mtime, M));
  }
  function N($, k, M, L, x, H) {
    return k ? D(M, L, x, H) : C($.mode, M, L, x, H);
  }
  function C($, k, M, L, x) {
    i.mkdir(M, (H) => {
      if (H) return x(H);
      D(k, M, L, (F) => F ? x(F) : A(M, $, x));
    });
  }
  function D($, k, M, L) {
    i.readdir($, (x, H) => x ? L(x) : b(H, $, k, M, L));
  }
  function b($, k, M, L, x) {
    const H = $.pop();
    return H ? S($, H, k, M, L, x) : x();
  }
  function S($, k, M, L, x, H) {
    const F = h.join(M, k), G = h.join(L, k);
    c.checkPaths(F, G, "copy", x, (Y, ee) => {
      if (Y) return H(Y);
      const { destStat: me } = ee;
      o(me, F, G, x, (Z) => Z ? H(Z) : b($, M, L, x, H));
    });
  }
  function O($, k, M, L, x) {
    i.readlink(k, (H, F) => {
      if (H) return x(H);
      if (L.dereference && (F = h.resolve(process.cwd(), F)), $)
        i.readlink(M, (G, Y) => G ? G.code === "EINVAL" || G.code === "UNKNOWN" ? i.symlink(F, M, x) : x(G) : (L.dereference && (Y = h.resolve(process.cwd(), Y)), c.isSrcSubdir(F, Y) ? x(new Error(`Cannot copy '${F}' to a subdirectory of itself, '${Y}'.`)) : $.isDirectory() && c.isSrcSubdir(Y, F) ? x(new Error(`Cannot overwrite '${Y}' with '${F}'.`)) : w(F, M, x)));
      else
        return i.symlink(F, M, x);
    });
  }
  function w($, k, M) {
    i.unlink(k, (L) => L ? M(L) : i.symlink($, k, M));
  }
  return Sn = r, Sn;
}
var Rn, ns;
function Wc() {
  if (ns) return Rn;
  ns = 1;
  const i = Qe(), h = ke, d = ft().mkdirsSync, l = tu().utimesMillisSync, u = /* @__PURE__ */ Kt();
  function c(b, S, O) {
    typeof O == "function" && (O = { filter: O }), O = O || {}, O.clobber = "clobber" in O ? !!O.clobber : !0, O.overwrite = "overwrite" in O ? !!O.overwrite : O.clobber, O.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: w, destStat: $ } = u.checkPathsSync(b, S, "copy", O);
    return u.checkParentPathsSync(b, w, S, "copy"), r($, b, S, O);
  }
  function r(b, S, O, w) {
    if (w.filter && !w.filter(S, O)) return;
    const $ = h.dirname(O);
    return i.existsSync($) || d($), a(b, S, O, w);
  }
  function f(b, S, O, w) {
    if (!(w.filter && !w.filter(S, O)))
      return a(b, S, O, w);
  }
  function a(b, S, O, w) {
    const k = (w.dereference ? i.statSync : i.lstatSync)(S);
    if (k.isDirectory()) return _(k, b, S, O, w);
    if (k.isFile() || k.isCharacterDevice() || k.isBlockDevice()) return o(k, b, S, O, w);
    if (k.isSymbolicLink()) return C(b, S, O, w);
    throw k.isSocket() ? new Error(`Cannot copy a socket file: ${S}`) : k.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${S}`) : new Error(`Unknown file: ${S}`);
  }
  function o(b, S, O, w, $) {
    return S ? s(b, O, w, $) : t(b, O, w, $);
  }
  function s(b, S, O, w) {
    if (w.overwrite)
      return i.unlinkSync(O), t(b, S, O, w);
    if (w.errorOnExist)
      throw new Error(`'${O}' already exists`);
  }
  function t(b, S, O, w) {
    return i.copyFileSync(S, O), w.preserveTimestamps && e(b.mode, S, O), v(O, b.mode);
  }
  function e(b, S, O) {
    return p(b) && y(O, b), m(S, O);
  }
  function p(b) {
    return (b & 128) === 0;
  }
  function y(b, S) {
    return v(b, S | 128);
  }
  function v(b, S) {
    return i.chmodSync(b, S);
  }
  function m(b, S) {
    const O = i.statSync(b);
    return l(S, O.atime, O.mtime);
  }
  function _(b, S, O, w, $) {
    return S ? P(O, w, $) : A(b.mode, O, w, $);
  }
  function A(b, S, O, w) {
    return i.mkdirSync(O), P(S, O, w), v(O, b);
  }
  function P(b, S, O) {
    i.readdirSync(b).forEach((w) => N(w, b, S, O));
  }
  function N(b, S, O, w) {
    const $ = h.join(S, b), k = h.join(O, b), { destStat: M } = u.checkPathsSync($, k, "copy", w);
    return f(M, $, k, w);
  }
  function C(b, S, O, w) {
    let $ = i.readlinkSync(S);
    if (w.dereference && ($ = h.resolve(process.cwd(), $)), b) {
      let k;
      try {
        k = i.readlinkSync(O);
      } catch (M) {
        if (M.code === "EINVAL" || M.code === "UNKNOWN") return i.symlinkSync($, O);
        throw M;
      }
      if (w.dereference && (k = h.resolve(process.cwd(), k)), u.isSrcSubdir($, k))
        throw new Error(`Cannot copy '${$}' to a subdirectory of itself, '${k}'.`);
      if (i.statSync(O).isDirectory() && u.isSrcSubdir(k, $))
        throw new Error(`Cannot overwrite '${k}' with '${$}'.`);
      return D($, O);
    } else
      return i.symlinkSync($, O);
  }
  function D(b, S) {
    return i.unlinkSync(S), i.symlinkSync(b, S);
  }
  return Rn = c, Rn;
}
var An, is;
function ma() {
  if (is) return An;
  is = 1;
  const i = et().fromCallback;
  return An = {
    copy: i(/* @__PURE__ */ Gc()),
    copySync: /* @__PURE__ */ Wc()
  }, An;
}
var Cn, as;
function Vc() {
  if (as) return Cn;
  as = 1;
  const i = Qe(), h = ke, d = Jl, l = process.platform === "win32";
  function u(y) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((m) => {
      y[m] = y[m] || i[m], m = m + "Sync", y[m] = y[m] || i[m];
    }), y.maxBusyTries = y.maxBusyTries || 3;
  }
  function c(y, v, m) {
    let _ = 0;
    typeof v == "function" && (m = v, v = {}), d(y, "rimraf: missing path"), d.strictEqual(typeof y, "string", "rimraf: path should be a string"), d.strictEqual(typeof m, "function", "rimraf: callback function required"), d(v, "rimraf: invalid options argument provided"), d.strictEqual(typeof v, "object", "rimraf: options should be object"), u(v), r(y, v, function A(P) {
      if (P) {
        if ((P.code === "EBUSY" || P.code === "ENOTEMPTY" || P.code === "EPERM") && _ < v.maxBusyTries) {
          _++;
          const N = _ * 100;
          return setTimeout(() => r(y, v, A), N);
        }
        P.code === "ENOENT" && (P = null);
      }
      m(P);
    });
  }
  function r(y, v, m) {
    d(y), d(v), d(typeof m == "function"), v.lstat(y, (_, A) => {
      if (_ && _.code === "ENOENT")
        return m(null);
      if (_ && _.code === "EPERM" && l)
        return f(y, v, _, m);
      if (A && A.isDirectory())
        return o(y, v, _, m);
      v.unlink(y, (P) => {
        if (P) {
          if (P.code === "ENOENT")
            return m(null);
          if (P.code === "EPERM")
            return l ? f(y, v, P, m) : o(y, v, P, m);
          if (P.code === "EISDIR")
            return o(y, v, P, m);
        }
        return m(P);
      });
    });
  }
  function f(y, v, m, _) {
    d(y), d(v), d(typeof _ == "function"), v.chmod(y, 438, (A) => {
      A ? _(A.code === "ENOENT" ? null : m) : v.stat(y, (P, N) => {
        P ? _(P.code === "ENOENT" ? null : m) : N.isDirectory() ? o(y, v, m, _) : v.unlink(y, _);
      });
    });
  }
  function a(y, v, m) {
    let _;
    d(y), d(v);
    try {
      v.chmodSync(y, 438);
    } catch (A) {
      if (A.code === "ENOENT")
        return;
      throw m;
    }
    try {
      _ = v.statSync(y);
    } catch (A) {
      if (A.code === "ENOENT")
        return;
      throw m;
    }
    _.isDirectory() ? e(y, v, m) : v.unlinkSync(y);
  }
  function o(y, v, m, _) {
    d(y), d(v), d(typeof _ == "function"), v.rmdir(y, (A) => {
      A && (A.code === "ENOTEMPTY" || A.code === "EEXIST" || A.code === "EPERM") ? s(y, v, _) : A && A.code === "ENOTDIR" ? _(m) : _(A);
    });
  }
  function s(y, v, m) {
    d(y), d(v), d(typeof m == "function"), v.readdir(y, (_, A) => {
      if (_) return m(_);
      let P = A.length, N;
      if (P === 0) return v.rmdir(y, m);
      A.forEach((C) => {
        c(h.join(y, C), v, (D) => {
          if (!N) {
            if (D) return m(N = D);
            --P === 0 && v.rmdir(y, m);
          }
        });
      });
    });
  }
  function t(y, v) {
    let m;
    v = v || {}, u(v), d(y, "rimraf: missing path"), d.strictEqual(typeof y, "string", "rimraf: path should be a string"), d(v, "rimraf: missing options"), d.strictEqual(typeof v, "object", "rimraf: options should be object");
    try {
      m = v.lstatSync(y);
    } catch (_) {
      if (_.code === "ENOENT")
        return;
      _.code === "EPERM" && l && a(y, v, _);
    }
    try {
      m && m.isDirectory() ? e(y, v, null) : v.unlinkSync(y);
    } catch (_) {
      if (_.code === "ENOENT")
        return;
      if (_.code === "EPERM")
        return l ? a(y, v, _) : e(y, v, _);
      if (_.code !== "EISDIR")
        throw _;
      e(y, v, _);
    }
  }
  function e(y, v, m) {
    d(y), d(v);
    try {
      v.rmdirSync(y);
    } catch (_) {
      if (_.code === "ENOTDIR")
        throw m;
      if (_.code === "ENOTEMPTY" || _.code === "EEXIST" || _.code === "EPERM")
        p(y, v);
      else if (_.code !== "ENOENT")
        throw _;
    }
  }
  function p(y, v) {
    if (d(y), d(v), v.readdirSync(y).forEach((m) => t(h.join(y, m), v)), l) {
      const m = Date.now();
      do
        try {
          return v.rmdirSync(y, v);
        } catch {
        }
      while (Date.now() - m < 500);
    } else
      return v.rmdirSync(y, v);
  }
  return Cn = c, c.sync = t, Cn;
}
var Tn, ss;
function en() {
  if (ss) return Tn;
  ss = 1;
  const i = Qe(), h = et().fromCallback, d = /* @__PURE__ */ Vc();
  function l(c, r) {
    if (i.rm) return i.rm(c, { recursive: !0, force: !0 }, r);
    d(c, r);
  }
  function u(c) {
    if (i.rmSync) return i.rmSync(c, { recursive: !0, force: !0 });
    d.sync(c);
  }
  return Tn = {
    remove: h(l),
    removeSync: u
  }, Tn;
}
var bn, os;
function Yc() {
  if (os) return bn;
  os = 1;
  const i = et().fromPromise, h = /* @__PURE__ */ Jt(), d = ke, l = /* @__PURE__ */ ft(), u = /* @__PURE__ */ en(), c = i(async function(a) {
    let o;
    try {
      o = await h.readdir(a);
    } catch {
      return l.mkdirs(a);
    }
    return Promise.all(o.map((s) => u.remove(d.join(a, s))));
  });
  function r(f) {
    let a;
    try {
      a = h.readdirSync(f);
    } catch {
      return l.mkdirsSync(f);
    }
    a.forEach((o) => {
      o = d.join(f, o), u.removeSync(o);
    });
  }
  return bn = {
    emptyDirSync: r,
    emptydirSync: r,
    emptyDir: c,
    emptydir: c
  }, bn;
}
var Pn, ls;
function zc() {
  if (ls) return Pn;
  ls = 1;
  const i = et().fromCallback, h = ke, d = Qe(), l = /* @__PURE__ */ ft();
  function u(r, f) {
    function a() {
      d.writeFile(r, "", (o) => {
        if (o) return f(o);
        f();
      });
    }
    d.stat(r, (o, s) => {
      if (!o && s.isFile()) return f();
      const t = h.dirname(r);
      d.stat(t, (e, p) => {
        if (e)
          return e.code === "ENOENT" ? l.mkdirs(t, (y) => {
            if (y) return f(y);
            a();
          }) : f(e);
        p.isDirectory() ? a() : d.readdir(t, (y) => {
          if (y) return f(y);
        });
      });
    });
  }
  function c(r) {
    let f;
    try {
      f = d.statSync(r);
    } catch {
    }
    if (f && f.isFile()) return;
    const a = h.dirname(r);
    try {
      d.statSync(a).isDirectory() || d.readdirSync(a);
    } catch (o) {
      if (o && o.code === "ENOENT") l.mkdirsSync(a);
      else throw o;
    }
    d.writeFileSync(r, "");
  }
  return Pn = {
    createFile: i(u),
    createFileSync: c
  }, Pn;
}
var On, us;
function Xc() {
  if (us) return On;
  us = 1;
  const i = et().fromCallback, h = ke, d = Qe(), l = /* @__PURE__ */ ft(), u = kt().pathExists, { areIdentical: c } = /* @__PURE__ */ Kt();
  function r(a, o, s) {
    function t(e, p) {
      d.link(e, p, (y) => {
        if (y) return s(y);
        s(null);
      });
    }
    d.lstat(o, (e, p) => {
      d.lstat(a, (y, v) => {
        if (y)
          return y.message = y.message.replace("lstat", "ensureLink"), s(y);
        if (p && c(v, p)) return s(null);
        const m = h.dirname(o);
        u(m, (_, A) => {
          if (_) return s(_);
          if (A) return t(a, o);
          l.mkdirs(m, (P) => {
            if (P) return s(P);
            t(a, o);
          });
        });
      });
    });
  }
  function f(a, o) {
    let s;
    try {
      s = d.lstatSync(o);
    } catch {
    }
    try {
      const p = d.lstatSync(a);
      if (s && c(p, s)) return;
    } catch (p) {
      throw p.message = p.message.replace("lstat", "ensureLink"), p;
    }
    const t = h.dirname(o);
    return d.existsSync(t) || l.mkdirsSync(t), d.linkSync(a, o);
  }
  return On = {
    createLink: i(r),
    createLinkSync: f
  }, On;
}
var Dn, cs;
function Jc() {
  if (cs) return Dn;
  cs = 1;
  const i = ke, h = Qe(), d = kt().pathExists;
  function l(c, r, f) {
    if (i.isAbsolute(c))
      return h.lstat(c, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), f(a)) : f(null, {
        toCwd: c,
        toDst: c
      }));
    {
      const a = i.dirname(r), o = i.join(a, c);
      return d(o, (s, t) => s ? f(s) : t ? f(null, {
        toCwd: o,
        toDst: c
      }) : h.lstat(c, (e) => e ? (e.message = e.message.replace("lstat", "ensureSymlink"), f(e)) : f(null, {
        toCwd: c,
        toDst: i.relative(a, c)
      })));
    }
  }
  function u(c, r) {
    let f;
    if (i.isAbsolute(c)) {
      if (f = h.existsSync(c), !f) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: c,
        toDst: c
      };
    } else {
      const a = i.dirname(r), o = i.join(a, c);
      if (f = h.existsSync(o), f)
        return {
          toCwd: o,
          toDst: c
        };
      if (f = h.existsSync(c), !f) throw new Error("relative srcpath does not exist");
      return {
        toCwd: c,
        toDst: i.relative(a, c)
      };
    }
  }
  return Dn = {
    symlinkPaths: l,
    symlinkPathsSync: u
  }, Dn;
}
var In, fs;
function Kc() {
  if (fs) return In;
  fs = 1;
  const i = Qe();
  function h(l, u, c) {
    if (c = typeof u == "function" ? u : c, u = typeof u == "function" ? !1 : u, u) return c(null, u);
    i.lstat(l, (r, f) => {
      if (r) return c(null, "file");
      u = f && f.isDirectory() ? "dir" : "file", c(null, u);
    });
  }
  function d(l, u) {
    let c;
    if (u) return u;
    try {
      c = i.lstatSync(l);
    } catch {
      return "file";
    }
    return c && c.isDirectory() ? "dir" : "file";
  }
  return In = {
    symlinkType: h,
    symlinkTypeSync: d
  }, In;
}
var Nn, ds;
function Qc() {
  if (ds) return Nn;
  ds = 1;
  const i = et().fromCallback, h = ke, d = /* @__PURE__ */ Jt(), l = /* @__PURE__ */ ft(), u = l.mkdirs, c = l.mkdirsSync, r = /* @__PURE__ */ Jc(), f = r.symlinkPaths, a = r.symlinkPathsSync, o = /* @__PURE__ */ Kc(), s = o.symlinkType, t = o.symlinkTypeSync, e = kt().pathExists, { areIdentical: p } = /* @__PURE__ */ Kt();
  function y(_, A, P, N) {
    N = typeof P == "function" ? P : N, P = typeof P == "function" ? !1 : P, d.lstat(A, (C, D) => {
      !C && D.isSymbolicLink() ? Promise.all([
        d.stat(_),
        d.stat(A)
      ]).then(([b, S]) => {
        if (p(b, S)) return N(null);
        v(_, A, P, N);
      }) : v(_, A, P, N);
    });
  }
  function v(_, A, P, N) {
    f(_, A, (C, D) => {
      if (C) return N(C);
      _ = D.toDst, s(D.toCwd, P, (b, S) => {
        if (b) return N(b);
        const O = h.dirname(A);
        e(O, (w, $) => {
          if (w) return N(w);
          if ($) return d.symlink(_, A, S, N);
          u(O, (k) => {
            if (k) return N(k);
            d.symlink(_, A, S, N);
          });
        });
      });
    });
  }
  function m(_, A, P) {
    let N;
    try {
      N = d.lstatSync(A);
    } catch {
    }
    if (N && N.isSymbolicLink()) {
      const S = d.statSync(_), O = d.statSync(A);
      if (p(S, O)) return;
    }
    const C = a(_, A);
    _ = C.toDst, P = t(C.toCwd, P);
    const D = h.dirname(A);
    return d.existsSync(D) || c(D), d.symlinkSync(_, A, P);
  }
  return Nn = {
    createSymlink: i(y),
    createSymlinkSync: m
  }, Nn;
}
var Fn, hs;
function Zc() {
  if (hs) return Fn;
  hs = 1;
  const { createFile: i, createFileSync: h } = /* @__PURE__ */ zc(), { createLink: d, createLinkSync: l } = /* @__PURE__ */ Xc(), { createSymlink: u, createSymlinkSync: c } = /* @__PURE__ */ Qc();
  return Fn = {
    // file
    createFile: i,
    createFileSync: h,
    ensureFile: i,
    ensureFileSync: h,
    // link
    createLink: d,
    createLinkSync: l,
    ensureLink: d,
    ensureLinkSync: l,
    // symlink
    createSymlink: u,
    createSymlinkSync: c,
    ensureSymlink: u,
    ensureSymlinkSync: c
  }, Fn;
}
var xn, ps;
function ga() {
  if (ps) return xn;
  ps = 1;
  function i(d, { EOL: l = `
`, finalEOL: u = !0, replacer: c = null, spaces: r } = {}) {
    const f = u ? l : "", a = JSON.stringify(d, c, r);
    if (a === void 0)
      throw new TypeError(`Converting ${typeof d} value to JSON is not supported`);
    return a.replace(/\n/g, l) + f;
  }
  function h(d) {
    return Buffer.isBuffer(d) && (d = d.toString("utf8")), d.replace(/^\uFEFF/, "");
  }
  return xn = { stringify: i, stripBom: h }, xn;
}
var Ln, ms;
function ef() {
  if (ms) return Ln;
  ms = 1;
  let i;
  try {
    i = Qe();
  } catch {
    i = Rt;
  }
  const h = et(), { stringify: d, stripBom: l } = ga();
  async function u(s, t = {}) {
    typeof t == "string" && (t = { encoding: t });
    const e = t.fs || i, p = "throws" in t ? t.throws : !0;
    let y = await h.fromCallback(e.readFile)(s, t);
    y = l(y);
    let v;
    try {
      v = JSON.parse(y, t ? t.reviver : null);
    } catch (m) {
      if (p)
        throw m.message = `${s}: ${m.message}`, m;
      return null;
    }
    return v;
  }
  const c = h.fromPromise(u);
  function r(s, t = {}) {
    typeof t == "string" && (t = { encoding: t });
    const e = t.fs || i, p = "throws" in t ? t.throws : !0;
    try {
      let y = e.readFileSync(s, t);
      return y = l(y), JSON.parse(y, t.reviver);
    } catch (y) {
      if (p)
        throw y.message = `${s}: ${y.message}`, y;
      return null;
    }
  }
  async function f(s, t, e = {}) {
    const p = e.fs || i, y = d(t, e);
    await h.fromCallback(p.writeFile)(s, y, e);
  }
  const a = h.fromPromise(f);
  function o(s, t, e = {}) {
    const p = e.fs || i, y = d(t, e);
    return p.writeFileSync(s, y, e);
  }
  return Ln = {
    readFile: c,
    readFileSync: r,
    writeFile: a,
    writeFileSync: o
  }, Ln;
}
var Un, gs;
function tf() {
  if (gs) return Un;
  gs = 1;
  const i = ef();
  return Un = {
    // jsonfile exports
    readJson: i.readFile,
    readJsonSync: i.readFileSync,
    writeJson: i.writeFile,
    writeJsonSync: i.writeFileSync
  }, Un;
}
var kn, ys;
function ya() {
  if (ys) return kn;
  ys = 1;
  const i = et().fromCallback, h = Qe(), d = ke, l = /* @__PURE__ */ ft(), u = kt().pathExists;
  function c(f, a, o, s) {
    typeof o == "function" && (s = o, o = "utf8");
    const t = d.dirname(f);
    u(t, (e, p) => {
      if (e) return s(e);
      if (p) return h.writeFile(f, a, o, s);
      l.mkdirs(t, (y) => {
        if (y) return s(y);
        h.writeFile(f, a, o, s);
      });
    });
  }
  function r(f, ...a) {
    const o = d.dirname(f);
    if (h.existsSync(o))
      return h.writeFileSync(f, ...a);
    l.mkdirsSync(o), h.writeFileSync(f, ...a);
  }
  return kn = {
    outputFile: i(c),
    outputFileSync: r
  }, kn;
}
var $n, vs;
function rf() {
  if (vs) return $n;
  vs = 1;
  const { stringify: i } = ga(), { outputFile: h } = /* @__PURE__ */ ya();
  async function d(l, u, c = {}) {
    const r = i(u, c);
    await h(l, r, c);
  }
  return $n = d, $n;
}
var qn, Es;
function nf() {
  if (Es) return qn;
  Es = 1;
  const { stringify: i } = ga(), { outputFileSync: h } = /* @__PURE__ */ ya();
  function d(l, u, c) {
    const r = i(u, c);
    h(l, r, c);
  }
  return qn = d, qn;
}
var Mn, ws;
function af() {
  if (ws) return Mn;
  ws = 1;
  const i = et().fromPromise, h = /* @__PURE__ */ tf();
  return h.outputJson = i(/* @__PURE__ */ rf()), h.outputJsonSync = /* @__PURE__ */ nf(), h.outputJSON = h.outputJson, h.outputJSONSync = h.outputJsonSync, h.writeJSON = h.writeJson, h.writeJSONSync = h.writeJsonSync, h.readJSON = h.readJson, h.readJSONSync = h.readJsonSync, Mn = h, Mn;
}
var Bn, _s;
function sf() {
  if (_s) return Bn;
  _s = 1;
  const i = Qe(), h = ke, d = ma().copy, l = en().remove, u = ft().mkdirp, c = kt().pathExists, r = /* @__PURE__ */ Kt();
  function f(e, p, y, v) {
    typeof y == "function" && (v = y, y = {}), y = y || {};
    const m = y.overwrite || y.clobber || !1;
    r.checkPaths(e, p, "move", y, (_, A) => {
      if (_) return v(_);
      const { srcStat: P, isChangingCase: N = !1 } = A;
      r.checkParentPaths(e, P, p, "move", (C) => {
        if (C) return v(C);
        if (a(p)) return o(e, p, m, N, v);
        u(h.dirname(p), (D) => D ? v(D) : o(e, p, m, N, v));
      });
    });
  }
  function a(e) {
    const p = h.dirname(e);
    return h.parse(p).root === p;
  }
  function o(e, p, y, v, m) {
    if (v) return s(e, p, y, m);
    if (y)
      return l(p, (_) => _ ? m(_) : s(e, p, y, m));
    c(p, (_, A) => _ ? m(_) : A ? m(new Error("dest already exists.")) : s(e, p, y, m));
  }
  function s(e, p, y, v) {
    i.rename(e, p, (m) => m ? m.code !== "EXDEV" ? v(m) : t(e, p, y, v) : v());
  }
  function t(e, p, y, v) {
    d(e, p, {
      overwrite: y,
      errorOnExist: !0
    }, (_) => _ ? v(_) : l(e, v));
  }
  return Bn = f, Bn;
}
var jn, Ss;
function of() {
  if (Ss) return jn;
  Ss = 1;
  const i = Qe(), h = ke, d = ma().copySync, l = en().removeSync, u = ft().mkdirpSync, c = /* @__PURE__ */ Kt();
  function r(t, e, p) {
    p = p || {};
    const y = p.overwrite || p.clobber || !1, { srcStat: v, isChangingCase: m = !1 } = c.checkPathsSync(t, e, "move", p);
    return c.checkParentPathsSync(t, v, e, "move"), f(e) || u(h.dirname(e)), a(t, e, y, m);
  }
  function f(t) {
    const e = h.dirname(t);
    return h.parse(e).root === e;
  }
  function a(t, e, p, y) {
    if (y) return o(t, e, p);
    if (p)
      return l(e), o(t, e, p);
    if (i.existsSync(e)) throw new Error("dest already exists.");
    return o(t, e, p);
  }
  function o(t, e, p) {
    try {
      i.renameSync(t, e);
    } catch (y) {
      if (y.code !== "EXDEV") throw y;
      return s(t, e, p);
    }
  }
  function s(t, e, p) {
    return d(t, e, {
      overwrite: p,
      errorOnExist: !0
    }), l(t);
  }
  return jn = r, jn;
}
var Hn, Rs;
function lf() {
  if (Rs) return Hn;
  Rs = 1;
  const i = et().fromCallback;
  return Hn = {
    move: i(/* @__PURE__ */ sf()),
    moveSync: /* @__PURE__ */ of()
  }, Hn;
}
var Gn, As;
function Ct() {
  return As || (As = 1, Gn = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ Jt(),
    // Export extra methods:
    .../* @__PURE__ */ ma(),
    .../* @__PURE__ */ Yc(),
    .../* @__PURE__ */ Zc(),
    .../* @__PURE__ */ af(),
    .../* @__PURE__ */ ft(),
    .../* @__PURE__ */ lf(),
    .../* @__PURE__ */ ya(),
    .../* @__PURE__ */ kt(),
    .../* @__PURE__ */ en()
  }), Gn;
}
var rr = {}, Nt = {}, Wn = {}, Ft = {}, Cs;
function va() {
  if (Cs) return Ft;
  Cs = 1, Object.defineProperty(Ft, "__esModule", { value: !0 }), Ft.CancellationError = Ft.CancellationToken = void 0;
  const i = Kl;
  let h = class extends i.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(u) {
      this.removeParentCancelHandler(), this._parent = u, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(u) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, u != null && (this.parent = u);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(u) {
      this.cancelled ? u() : this.once("cancel", u);
    }
    createPromise(u) {
      if (this.cancelled)
        return Promise.reject(new d());
      const c = () => {
        if (r != null)
          try {
            this.removeListener("cancel", r), r = null;
          } catch {
          }
      };
      let r = null;
      return new Promise((f, a) => {
        let o = null;
        if (r = () => {
          try {
            o != null && (o(), o = null);
          } finally {
            a(new d());
          }
        }, this.cancelled) {
          r();
          return;
        }
        this.onCancel(r), u(f, a, (s) => {
          o = s;
        });
      }).then((f) => (c(), f)).catch((f) => {
        throw c(), f;
      });
    }
    removeParentCancelHandler() {
      const u = this._parent;
      u != null && this.parentCancelHandler != null && (u.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  Ft.CancellationToken = h;
  class d extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return Ft.CancellationError = d, Ft;
}
var Br = {}, Ts;
function tn() {
  if (Ts) return Br;
  Ts = 1, Object.defineProperty(Br, "__esModule", { value: !0 }), Br.newError = i;
  function i(h, d) {
    const l = new Error(h);
    return l.code = d, l;
  }
  return Br;
}
var ze = {}, jr = { exports: {} }, Hr = { exports: {} }, Vn, bs;
function uf() {
  if (bs) return Vn;
  bs = 1;
  var i = 1e3, h = i * 60, d = h * 60, l = d * 24, u = l * 7, c = l * 365.25;
  Vn = function(s, t) {
    t = t || {};
    var e = typeof s;
    if (e === "string" && s.length > 0)
      return r(s);
    if (e === "number" && isFinite(s))
      return t.long ? a(s) : f(s);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(s)
    );
  };
  function r(s) {
    if (s = String(s), !(s.length > 100)) {
      var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        s
      );
      if (t) {
        var e = parseFloat(t[1]), p = (t[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return e * c;
          case "weeks":
          case "week":
          case "w":
            return e * u;
          case "days":
          case "day":
          case "d":
            return e * l;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return e * d;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return e * h;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return e * i;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return e;
          default:
            return;
        }
      }
    }
  }
  function f(s) {
    var t = Math.abs(s);
    return t >= l ? Math.round(s / l) + "d" : t >= d ? Math.round(s / d) + "h" : t >= h ? Math.round(s / h) + "m" : t >= i ? Math.round(s / i) + "s" : s + "ms";
  }
  function a(s) {
    var t = Math.abs(s);
    return t >= l ? o(s, t, l, "day") : t >= d ? o(s, t, d, "hour") : t >= h ? o(s, t, h, "minute") : t >= i ? o(s, t, i, "second") : s + " ms";
  }
  function o(s, t, e, p) {
    var y = t >= e * 1.5;
    return Math.round(s / e) + " " + p + (y ? "s" : "");
  }
  return Vn;
}
var Yn, Ps;
function ru() {
  if (Ps) return Yn;
  Ps = 1;
  function i(h) {
    l.debug = l, l.default = l, l.coerce = o, l.disable = f, l.enable = c, l.enabled = a, l.humanize = uf(), l.destroy = s, Object.keys(h).forEach((t) => {
      l[t] = h[t];
    }), l.names = [], l.skips = [], l.formatters = {};
    function d(t) {
      let e = 0;
      for (let p = 0; p < t.length; p++)
        e = (e << 5) - e + t.charCodeAt(p), e |= 0;
      return l.colors[Math.abs(e) % l.colors.length];
    }
    l.selectColor = d;
    function l(t) {
      let e, p = null, y, v;
      function m(..._) {
        if (!m.enabled)
          return;
        const A = m, P = Number(/* @__PURE__ */ new Date()), N = P - (e || P);
        A.diff = N, A.prev = e, A.curr = P, e = P, _[0] = l.coerce(_[0]), typeof _[0] != "string" && _.unshift("%O");
        let C = 0;
        _[0] = _[0].replace(/%([a-zA-Z%])/g, (b, S) => {
          if (b === "%%")
            return "%";
          C++;
          const O = l.formatters[S];
          if (typeof O == "function") {
            const w = _[C];
            b = O.call(A, w), _.splice(C, 1), C--;
          }
          return b;
        }), l.formatArgs.call(A, _), (A.log || l.log).apply(A, _);
      }
      return m.namespace = t, m.useColors = l.useColors(), m.color = l.selectColor(t), m.extend = u, m.destroy = l.destroy, Object.defineProperty(m, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => p !== null ? p : (y !== l.namespaces && (y = l.namespaces, v = l.enabled(t)), v),
        set: (_) => {
          p = _;
        }
      }), typeof l.init == "function" && l.init(m), m;
    }
    function u(t, e) {
      const p = l(this.namespace + (typeof e > "u" ? ":" : e) + t);
      return p.log = this.log, p;
    }
    function c(t) {
      l.save(t), l.namespaces = t, l.names = [], l.skips = [];
      const e = (typeof t == "string" ? t : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const p of e)
        p[0] === "-" ? l.skips.push(p.slice(1)) : l.names.push(p);
    }
    function r(t, e) {
      let p = 0, y = 0, v = -1, m = 0;
      for (; p < t.length; )
        if (y < e.length && (e[y] === t[p] || e[y] === "*"))
          e[y] === "*" ? (v = y, m = p, y++) : (p++, y++);
        else if (v !== -1)
          y = v + 1, m++, p = m;
        else
          return !1;
      for (; y < e.length && e[y] === "*"; )
        y++;
      return y === e.length;
    }
    function f() {
      const t = [
        ...l.names,
        ...l.skips.map((e) => "-" + e)
      ].join(",");
      return l.enable(""), t;
    }
    function a(t) {
      for (const e of l.skips)
        if (r(t, e))
          return !1;
      for (const e of l.names)
        if (r(t, e))
          return !0;
      return !1;
    }
    function o(t) {
      return t instanceof Error ? t.stack || t.message : t;
    }
    function s() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return l.enable(l.load()), l;
  }
  return Yn = i, Yn;
}
var Os;
function cf() {
  return Os || (Os = 1, (function(i, h) {
    h.formatArgs = l, h.save = u, h.load = c, h.useColors = d, h.storage = r(), h.destroy = /* @__PURE__ */ (() => {
      let a = !1;
      return () => {
        a || (a = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
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
    function d() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let a;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (a = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(a[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function l(a) {
      if (a[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + a[0] + (this.useColors ? "%c " : " ") + "+" + i.exports.humanize(this.diff), !this.useColors)
        return;
      const o = "color: " + this.color;
      a.splice(1, 0, o, "color: inherit");
      let s = 0, t = 0;
      a[0].replace(/%[a-zA-Z%]/g, (e) => {
        e !== "%%" && (s++, e === "%c" && (t = s));
      }), a.splice(t, 0, o);
    }
    h.log = console.debug || console.log || (() => {
    });
    function u(a) {
      try {
        a ? h.storage.setItem("debug", a) : h.storage.removeItem("debug");
      } catch {
      }
    }
    function c() {
      let a;
      try {
        a = h.storage.getItem("debug") || h.storage.getItem("DEBUG");
      } catch {
      }
      return !a && typeof process < "u" && "env" in process && (a = process.env.DEBUG), a;
    }
    function r() {
      try {
        return localStorage;
      } catch {
      }
    }
    i.exports = ru()(h);
    const { formatters: f } = i.exports;
    f.j = function(a) {
      try {
        return JSON.stringify(a);
      } catch (o) {
        return "[UnexpectedJSONParseError]: " + o.message;
      }
    };
  })(Hr, Hr.exports)), Hr.exports;
}
var Gr = { exports: {} }, zn, Ds;
function ff() {
  return Ds || (Ds = 1, zn = (i, h = process.argv) => {
    const d = i.startsWith("-") ? "" : i.length === 1 ? "-" : "--", l = h.indexOf(d + i), u = h.indexOf("--");
    return l !== -1 && (u === -1 || l < u);
  }), zn;
}
var Xn, Is;
function df() {
  if (Is) return Xn;
  Is = 1;
  const i = Zr, h = Ql, d = ff(), { env: l } = process;
  let u;
  d("no-color") || d("no-colors") || d("color=false") || d("color=never") ? u = 0 : (d("color") || d("colors") || d("color=true") || d("color=always")) && (u = 1), "FORCE_COLOR" in l && (l.FORCE_COLOR === "true" ? u = 1 : l.FORCE_COLOR === "false" ? u = 0 : u = l.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(l.FORCE_COLOR, 10), 3));
  function c(a) {
    return a === 0 ? !1 : {
      level: a,
      hasBasic: !0,
      has256: a >= 2,
      has16m: a >= 3
    };
  }
  function r(a, o) {
    if (u === 0)
      return 0;
    if (d("color=16m") || d("color=full") || d("color=truecolor"))
      return 3;
    if (d("color=256"))
      return 2;
    if (a && !o && u === void 0)
      return 0;
    const s = u || 0;
    if (l.TERM === "dumb")
      return s;
    if (process.platform === "win32") {
      const t = i.release().split(".");
      return Number(t[0]) >= 10 && Number(t[2]) >= 10586 ? Number(t[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in l)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((t) => t in l) || l.CI_NAME === "codeship" ? 1 : s;
    if ("TEAMCITY_VERSION" in l)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(l.TEAMCITY_VERSION) ? 1 : 0;
    if (l.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in l) {
      const t = parseInt((l.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (l.TERM_PROGRAM) {
        case "iTerm.app":
          return t >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(l.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(l.TERM) || "COLORTERM" in l ? 1 : s;
  }
  function f(a) {
    const o = r(a, a && a.isTTY);
    return c(o);
  }
  return Xn = {
    supportsColor: f,
    stdout: c(r(!0, h.isatty(1))),
    stderr: c(r(!0, h.isatty(2)))
  }, Xn;
}
var Ns;
function hf() {
  return Ns || (Ns = 1, (function(i, h) {
    const d = Ql, l = pa;
    h.init = s, h.log = f, h.formatArgs = c, h.save = a, h.load = o, h.useColors = u, h.destroy = l.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), h.colors = [6, 2, 3, 4, 5, 1];
    try {
      const e = df();
      e && (e.stderr || e).level >= 2 && (h.colors = [
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
    h.inspectOpts = Object.keys(process.env).filter((e) => /^debug_/i.test(e)).reduce((e, p) => {
      const y = p.substring(6).toLowerCase().replace(/_([a-z])/g, (m, _) => _.toUpperCase());
      let v = process.env[p];
      return /^(yes|on|true|enabled)$/i.test(v) ? v = !0 : /^(no|off|false|disabled)$/i.test(v) ? v = !1 : v === "null" ? v = null : v = Number(v), e[y] = v, e;
    }, {});
    function u() {
      return "colors" in h.inspectOpts ? !!h.inspectOpts.colors : d.isatty(process.stderr.fd);
    }
    function c(e) {
      const { namespace: p, useColors: y } = this;
      if (y) {
        const v = this.color, m = "\x1B[3" + (v < 8 ? v : "8;5;" + v), _ = `  ${m};1m${p} \x1B[0m`;
        e[0] = _ + e[0].split(`
`).join(`
` + _), e.push(m + "m+" + i.exports.humanize(this.diff) + "\x1B[0m");
      } else
        e[0] = r() + p + " " + e[0];
    }
    function r() {
      return h.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function f(...e) {
      return process.stderr.write(l.formatWithOptions(h.inspectOpts, ...e) + `
`);
    }
    function a(e) {
      e ? process.env.DEBUG = e : delete process.env.DEBUG;
    }
    function o() {
      return process.env.DEBUG;
    }
    function s(e) {
      e.inspectOpts = {};
      const p = Object.keys(h.inspectOpts);
      for (let y = 0; y < p.length; y++)
        e.inspectOpts[p[y]] = h.inspectOpts[p[y]];
    }
    i.exports = ru()(h);
    const { formatters: t } = i.exports;
    t.o = function(e) {
      return this.inspectOpts.colors = this.useColors, l.inspect(e, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, t.O = function(e) {
      return this.inspectOpts.colors = this.useColors, l.inspect(e, this.inspectOpts);
    };
  })(Gr, Gr.exports)), Gr.exports;
}
var Fs;
function pf() {
  return Fs || (Fs = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? jr.exports = cf() : jr.exports = hf()), jr.exports;
}
var nr = {}, xs;
function nu() {
  if (xs) return nr;
  xs = 1, Object.defineProperty(nr, "__esModule", { value: !0 }), nr.ProgressCallbackTransform = void 0;
  const i = br;
  let h = class extends i.Transform {
    constructor(l, u, c) {
      super(), this.total = l, this.cancellationToken = u, this.onProgress = c, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(l, u, c) {
      if (this.cancellationToken.cancelled) {
        c(new Error("cancelled"), null);
        return;
      }
      this.transferred += l.length, this.delta += l.length;
      const r = Date.now();
      r >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = r + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((r - this.start) / 1e3))
      }), this.delta = 0), c(null, l);
    }
    _flush(l) {
      if (this.cancellationToken.cancelled) {
        l(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, l(null);
    }
  };
  return nr.ProgressCallbackTransform = h, nr;
}
var Ls;
function mf() {
  if (Ls) return ze;
  Ls = 1, Object.defineProperty(ze, "__esModule", { value: !0 }), ze.DigestTransform = ze.HttpExecutor = ze.HttpError = void 0, ze.createHttpError = o, ze.parseJson = e, ze.configureRequestOptionsFromUrl = v, ze.configureRequestUrl = m, ze.safeGetHeader = P, ze.configureRequestOptions = C, ze.safeStringifyJson = D;
  const i = Pr, h = pf(), d = Rt, l = br, u = At, c = va(), r = tn(), f = nu(), a = (0, h.default)("electron-builder");
  function o(b, S = null) {
    return new t(b.statusCode || -1, `${b.statusCode} ${b.statusMessage}` + (S == null ? "" : `
` + JSON.stringify(S, null, "  ")) + `
Headers: ` + D(b.headers), S);
  }
  const s = /* @__PURE__ */ new Map([
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
    constructor(S, O = `HTTP error: ${s.get(S) || S}`, w = null) {
      super(O), this.statusCode = S, this.description = w, this.name = "HttpError", this.code = `HTTP_ERROR_${S}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  ze.HttpError = t;
  function e(b) {
    return b.then((S) => S == null || S.length === 0 ? null : JSON.parse(S));
  }
  class p {
    constructor() {
      this.maxRedirects = 10;
    }
    request(S, O = new c.CancellationToken(), w) {
      C(S);
      const $ = w == null ? void 0 : JSON.stringify(w), k = $ ? Buffer.from($) : void 0;
      if (k != null) {
        a($);
        const { headers: M, ...L } = S;
        S = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": k.length,
            ...M
          },
          ...L
        };
      }
      return this.doApiRequest(S, O, (M) => M.end(k));
    }
    doApiRequest(S, O, w, $ = 0) {
      return a.enabled && a(`Request: ${D(S)}`), O.createPromise((k, M, L) => {
        const x = this.createRequest(S, (H) => {
          try {
            this.handleResponse(H, S, O, k, M, $, w);
          } catch (F) {
            M(F);
          }
        });
        this.addErrorAndTimeoutHandlers(x, M, S.timeout), this.addRedirectHandlers(x, S, M, $, (H) => {
          this.doApiRequest(H, O, w, $).then(k).catch(M);
        }), w(x, M), L(() => x.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(S, O, w, $, k) {
    }
    addErrorAndTimeoutHandlers(S, O, w = 60 * 1e3) {
      this.addTimeOutHandler(S, O, w), S.on("error", O), S.on("aborted", () => {
        O(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(S, O, w, $, k, M, L) {
      var x;
      if (a.enabled && a(`Response: ${S.statusCode} ${S.statusMessage}, request options: ${D(O)}`), S.statusCode === 404) {
        k(o(S, `method: ${O.method || "GET"} url: ${O.protocol || "https:"}//${O.hostname}${O.port ? `:${O.port}` : ""}${O.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (S.statusCode === 204) {
        $();
        return;
      }
      const H = (x = S.statusCode) !== null && x !== void 0 ? x : 0, F = H >= 300 && H < 400, G = P(S, "location");
      if (F && G != null) {
        if (M > this.maxRedirects) {
          k(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(p.prepareRedirectUrlOptions(G, O), w, L, M).then($).catch(k);
        return;
      }
      S.setEncoding("utf8");
      let Y = "";
      S.on("error", k), S.on("data", (ee) => Y += ee), S.on("end", () => {
        try {
          if (S.statusCode != null && S.statusCode >= 400) {
            const ee = P(S, "content-type"), me = ee != null && (Array.isArray(ee) ? ee.find((Z) => Z.includes("json")) != null : ee.includes("json"));
            k(o(S, `method: ${O.method || "GET"} url: ${O.protocol || "https:"}//${O.hostname}${O.port ? `:${O.port}` : ""}${O.path}

          Data:
          ${me ? JSON.stringify(JSON.parse(Y)) : Y}
          `));
          } else
            $(Y.length === 0 ? null : Y);
        } catch (ee) {
          k(ee);
        }
      });
    }
    async downloadToBuffer(S, O) {
      return await O.cancellationToken.createPromise((w, $, k) => {
        const M = [], L = {
          headers: O.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        m(S, L), C(L), this.doDownload(L, {
          destination: null,
          options: O,
          onCancel: k,
          callback: (x) => {
            x == null ? w(Buffer.concat(M)) : $(x);
          },
          responseHandler: (x, H) => {
            let F = 0;
            x.on("data", (G) => {
              if (F += G.length, F > 524288e3) {
                H(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              M.push(G);
            }), x.on("end", () => {
              H(null);
            });
          }
        }, 0);
      });
    }
    doDownload(S, O, w) {
      const $ = this.createRequest(S, (k) => {
        if (k.statusCode >= 400) {
          O.callback(new Error(`Cannot download "${S.protocol || "https:"}//${S.hostname}${S.path}", status ${k.statusCode}: ${k.statusMessage}`));
          return;
        }
        k.on("error", O.callback);
        const M = P(k, "location");
        if (M != null) {
          w < this.maxRedirects ? this.doDownload(p.prepareRedirectUrlOptions(M, S), O, w++) : O.callback(this.createMaxRedirectError());
          return;
        }
        O.responseHandler == null ? N(O, k) : O.responseHandler(k, O.callback);
      });
      this.addErrorAndTimeoutHandlers($, O.callback, S.timeout), this.addRedirectHandlers($, S, O.callback, w, (k) => {
        this.doDownload(k, O, w++);
      }), $.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(S, O, w) {
      S.on("socket", ($) => {
        $.setTimeout(w, () => {
          S.abort(), O(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(S, O) {
      const w = v(S, { ...O }), $ = w.headers;
      if ($?.authorization) {
        const k = p.reconstructOriginalUrl(O), M = y(S, O);
        p.isCrossOriginRedirect(k, M) && (a.enabled && a(`Given the cross-origin redirect (from ${k.host} to ${M.host}), the Authorization header will be stripped out.`), delete $.authorization);
      }
      return w;
    }
    static reconstructOriginalUrl(S) {
      const O = S.protocol || "https:";
      if (!S.hostname)
        throw new Error("Missing hostname in request options");
      const w = S.hostname, $ = S.port ? `:${S.port}` : "", k = S.path || "/";
      return new u.URL(`${O}//${w}${$}${k}`);
    }
    static isCrossOriginRedirect(S, O) {
      if (S.hostname.toLowerCase() !== O.hostname.toLowerCase())
        return !0;
      if (S.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
      ["80", ""].includes(S.port) && O.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
      ["443", ""].includes(O.port))
        return !1;
      if (S.protocol !== O.protocol)
        return !0;
      const w = S.port, $ = O.port;
      return w !== $;
    }
    static retryOnServerError(S, O = 3) {
      for (let w = 0; ; w++)
        try {
          return S();
        } catch ($) {
          if (w < O && ($ instanceof t && $.isServerError() || $.code === "EPIPE"))
            continue;
          throw $;
        }
    }
  }
  ze.HttpExecutor = p;
  function y(b, S) {
    try {
      return new u.URL(b);
    } catch {
      const O = S.hostname, w = S.protocol || "https:", $ = S.port ? `:${S.port}` : "", k = `${w}//${O}${$}`;
      return new u.URL(b, k);
    }
  }
  function v(b, S) {
    const O = C(S), w = y(b, S);
    return m(w, O), O;
  }
  function m(b, S) {
    S.protocol = b.protocol, S.hostname = b.hostname, b.port ? S.port = b.port : S.port && delete S.port, S.path = b.pathname + b.search;
  }
  class _ extends l.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(S, O = "sha512", w = "base64") {
      super(), this.expected = S, this.algorithm = O, this.encoding = w, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, i.createHash)(O);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(S, O, w) {
      this.digester.update(S), w(null, S);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(S) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (O) {
          S(O);
          return;
        }
      S(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, r.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, r.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  ze.DigestTransform = _;
  function A(b, S, O) {
    return b != null && S != null && b !== S ? (O(new Error(`checksum mismatch: expected ${S} but got ${b} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function P(b, S) {
    const O = b.headers[S];
    return O == null ? null : Array.isArray(O) ? O.length === 0 ? null : O[O.length - 1] : O;
  }
  function N(b, S) {
    if (!A(P(S, "X-Checksum-Sha2"), b.options.sha2, b.callback))
      return;
    const O = [];
    if (b.options.onProgress != null) {
      const M = P(S, "content-length");
      M != null && O.push(new f.ProgressCallbackTransform(parseInt(M, 10), b.options.cancellationToken, b.options.onProgress));
    }
    const w = b.options.sha512;
    w != null ? O.push(new _(w, "sha512", w.length === 128 && !w.includes("+") && !w.includes("Z") && !w.includes("=") ? "hex" : "base64")) : b.options.sha2 != null && O.push(new _(b.options.sha2, "sha256", "hex"));
    const $ = (0, d.createWriteStream)(b.destination);
    O.push($);
    let k = S;
    for (const M of O)
      M.on("error", (L) => {
        $.close(), b.options.cancellationToken.cancelled || b.callback(L);
      }), k = k.pipe(M);
    $.on("finish", () => {
      $.close(b.callback);
    });
  }
  function C(b, S, O) {
    O != null && (b.method = O), b.headers = { ...b.headers };
    const w = b.headers;
    return S != null && (w.authorization = S.startsWith("Basic") || S.startsWith("Bearer") ? S : `token ${S}`), w["User-Agent"] == null && (w["User-Agent"] = "electron-builder"), (O == null || O === "GET" || w["Cache-Control"] == null) && (w["Cache-Control"] = "no-cache"), b.protocol == null && process.versions.electron != null && (b.protocol = "https:"), b;
  }
  function D(b, S) {
    return JSON.stringify(b, (O, w) => O.endsWith("Authorization") || O.endsWith("authorization") || O.endsWith("Password") || O.endsWith("PASSWORD") || O.endsWith("Token") || O.includes("password") || O.includes("token") || S != null && S.has(O) ? "<stripped sensitive data>" : w, 2);
  }
  return ze;
}
var ir = {}, Us;
function gf() {
  if (Us) return ir;
  Us = 1, Object.defineProperty(ir, "__esModule", { value: !0 }), ir.MemoLazy = void 0;
  let i = class {
    constructor(l, u) {
      this.selector = l, this.creator = u, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const l = this.selector();
      if (this._value !== void 0 && h(this.selected, l))
        return this._value;
      this.selected = l;
      const u = this.creator(l);
      return this.value = u, u;
    }
    set value(l) {
      this._value = l;
    }
  };
  ir.MemoLazy = i;
  function h(d, l) {
    if (typeof d == "object" && d !== null && (typeof l == "object" && l !== null)) {
      const r = Object.keys(d), f = Object.keys(l);
      return r.length === f.length && r.every((a) => h(d[a], l[a]));
    }
    return d === l;
  }
  return ir;
}
var Ht = {}, ks;
function yf() {
  if (ks) return Ht;
  ks = 1, Object.defineProperty(Ht, "__esModule", { value: !0 }), Ht.githubUrl = i, Ht.githubTagPrefix = h, Ht.getS3LikeProviderBaseUrl = d;
  function i(r, f = "github.com") {
    return `${r.protocol || "https"}://${r.host || f}`;
  }
  function h(r) {
    var f;
    return r.tagNamePrefix ? r.tagNamePrefix : !((f = r.vPrefixedTagName) !== null && f !== void 0) || f ? "v" : "";
  }
  function d(r) {
    const f = r.provider;
    if (f === "s3")
      return l(r);
    if (f === "spaces")
      return c(r);
    throw new Error(`Not supported provider: ${f}`);
  }
  function l(r) {
    let f;
    if (r.accelerate == !0)
      f = `https://${r.bucket}.s3-accelerate.amazonaws.com`;
    else if (r.endpoint != null)
      f = `${r.endpoint}/${r.bucket}`;
    else if (r.bucket.includes(".")) {
      if (r.region == null)
        throw new Error(`Bucket name "${r.bucket}" includes a dot, but S3 region is missing`);
      r.region === "us-east-1" ? f = `https://s3.amazonaws.com/${r.bucket}` : f = `https://s3-${r.region}.amazonaws.com/${r.bucket}`;
    } else r.region === "cn-north-1" ? f = `https://${r.bucket}.s3.${r.region}.amazonaws.com.cn` : f = `https://${r.bucket}.s3.amazonaws.com`;
    return u(f, r.path);
  }
  function u(r, f) {
    return f != null && f.length > 0 && (f.startsWith("/") || (r += "/"), r += f), r;
  }
  function c(r) {
    if (r.name == null)
      throw new Error("name is missing");
    if (r.region == null)
      throw new Error("region is missing");
    return u(`https://${r.name}.${r.region}.digitaloceanspaces.com`, r.path);
  }
  return Ht;
}
var Wr = {}, $s;
function vf() {
  if ($s) return Wr;
  $s = 1, Object.defineProperty(Wr, "__esModule", { value: !0 }), Wr.retry = h;
  const i = va();
  async function h(d, l) {
    var u;
    const { retries: c, interval: r, backoff: f = 0, attempt: a = 0, shouldRetry: o, cancellationToken: s = new i.CancellationToken() } = l;
    try {
      return await d();
    } catch (t) {
      if (await Promise.resolve((u = o?.(t)) !== null && u !== void 0 ? u : !0) && c > 0 && !s.cancelled)
        return await new Promise((e) => setTimeout(e, r + f * a)), await h(d, { ...l, retries: c - 1, attempt: a + 1 });
      throw t;
    }
  }
  return Wr;
}
var Vr = {}, qs;
function Ef() {
  if (qs) return Vr;
  qs = 1, Object.defineProperty(Vr, "__esModule", { value: !0 }), Vr.parseDn = i;
  function i(h) {
    let d = !1, l = null, u = "", c = 0;
    h = h.trim();
    const r = /* @__PURE__ */ new Map();
    for (let f = 0; f <= h.length; f++) {
      if (f === h.length) {
        l !== null && r.set(l, u);
        break;
      }
      const a = h[f];
      if (d) {
        if (a === '"') {
          d = !1;
          continue;
        }
      } else {
        if (a === '"') {
          d = !0;
          continue;
        }
        if (a === "\\") {
          f++;
          const o = parseInt(h.slice(f, f + 2), 16);
          Number.isNaN(o) ? u += h[f] : (f++, u += String.fromCharCode(o));
          continue;
        }
        if (l === null && a === "=") {
          l = u, u = "";
          continue;
        }
        if (a === "," || a === ";" || a === "+") {
          l !== null && r.set(l, u), l = null, u = "";
          continue;
        }
      }
      if (a === " " && !d) {
        if (u.length === 0)
          continue;
        if (f > c) {
          let o = f;
          for (; h[o] === " "; )
            o++;
          c = o;
        }
        if (c >= h.length || h[c] === "," || h[c] === ";" || l === null && h[c] === "=" || l !== null && h[c] === "+") {
          f = c - 1;
          continue;
        }
      }
      u += a;
    }
    return r;
  }
  return Vr;
}
var xt = {}, Ms;
function wf() {
  if (Ms) return xt;
  Ms = 1, Object.defineProperty(xt, "__esModule", { value: !0 }), xt.nil = xt.UUID = void 0;
  const i = Pr, h = tn(), d = "options.name must be either a string or a Buffer", l = (0, i.randomBytes)(16);
  l[0] = l[0] | 1;
  const u = {}, c = [];
  for (let t = 0; t < 256; t++) {
    const e = (t + 256).toString(16).substr(1);
    u[e] = t, c[t] = e;
  }
  class r {
    constructor(e) {
      this.ascii = null, this.binary = null;
      const p = r.check(e);
      if (!p)
        throw new Error("not a UUID");
      this.version = p.version, p.format === "ascii" ? this.ascii = e : this.binary = e;
    }
    static v5(e, p) {
      return o(e, "sha1", 80, p);
    }
    toString() {
      return this.ascii == null && (this.ascii = s(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(e, p = 0) {
      if (typeof e == "string")
        return e = e.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(e) ? e === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (u[e[14] + e[15]] & 240) >> 4,
          variant: f((u[e[19] + e[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(e)) {
        if (e.length < p + 16)
          return !1;
        let y = 0;
        for (; y < 16 && e[p + y] === 0; y++)
          ;
        return y === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (e[p + 6] & 240) >> 4,
          variant: f((e[p + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, h.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(e) {
      const p = Buffer.allocUnsafe(16);
      let y = 0;
      for (let v = 0; v < 16; v++)
        p[v] = u[e[y++] + e[y++]], (v === 3 || v === 5 || v === 7 || v === 9) && (y += 1);
      return p;
    }
  }
  xt.UUID = r, r.OID = r.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function f(t) {
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
  var a;
  (function(t) {
    t[t.ASCII = 0] = "ASCII", t[t.BINARY = 1] = "BINARY", t[t.OBJECT = 2] = "OBJECT";
  })(a || (a = {}));
  function o(t, e, p, y, v = a.ASCII) {
    const m = (0, i.createHash)(e);
    if (typeof t != "string" && !Buffer.isBuffer(t))
      throw (0, h.newError)(d, "ERR_INVALID_UUID_NAME");
    m.update(y), m.update(t);
    const A = m.digest();
    let P;
    switch (v) {
      case a.BINARY:
        A[6] = A[6] & 15 | p, A[8] = A[8] & 63 | 128, P = A;
        break;
      case a.OBJECT:
        A[6] = A[6] & 15 | p, A[8] = A[8] & 63 | 128, P = new r(A);
        break;
      default:
        P = c[A[0]] + c[A[1]] + c[A[2]] + c[A[3]] + "-" + c[A[4]] + c[A[5]] + "-" + c[A[6] & 15 | p] + c[A[7]] + "-" + c[A[8] & 63 | 128] + c[A[9]] + "-" + c[A[10]] + c[A[11]] + c[A[12]] + c[A[13]] + c[A[14]] + c[A[15]];
        break;
    }
    return P;
  }
  function s(t) {
    return c[t[0]] + c[t[1]] + c[t[2]] + c[t[3]] + "-" + c[t[4]] + c[t[5]] + "-" + c[t[6]] + c[t[7]] + "-" + c[t[8]] + c[t[9]] + "-" + c[t[10]] + c[t[11]] + c[t[12]] + c[t[13]] + c[t[14]] + c[t[15]];
  }
  return xt.nil = new r("00000000-0000-0000-0000-000000000000"), xt;
}
var Gt = {}, Jn = {}, Bs;
function _f() {
  return Bs || (Bs = 1, (function(i) {
    (function(h) {
      h.parser = function(E, g) {
        return new l(E, g);
      }, h.SAXParser = l, h.SAXStream = t, h.createStream = o, h.MAX_BUFFER_LENGTH = 64 * 1024;
      var d = [
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
      function l(E, g) {
        if (!(this instanceof l))
          return new l(E, g);
        var q = this;
        c(q), q.q = q.c = "", q.bufferCheckPosition = h.MAX_BUFFER_LENGTH, q.encoding = null, q.opt = g || {}, q.opt.lowercase = q.opt.lowercase || q.opt.lowercasetags, q.looseCase = q.opt.lowercase ? "toLowerCase" : "toUpperCase", q.opt.maxEntityCount = q.opt.maxEntityCount || 512, q.opt.maxEntityDepth = q.opt.maxEntityDepth || 4, q.entityCount = q.entityDepth = 0, q.tags = [], q.closed = q.closedRoot = q.sawRoot = !1, q.tag = q.error = null, q.strict = !!E, q.noscript = !!(E || q.opt.noscript), q.state = w.BEGIN, q.strictEntities = q.opt.strictEntities, q.ENTITIES = q.strictEntities ? Object.create(h.XML_ENTITIES) : Object.create(h.ENTITIES), q.attribList = [], q.opt.xmlns && (q.ns = Object.create(m)), q.opt.unquotedAttributeValues === void 0 && (q.opt.unquotedAttributeValues = !E), q.trackPosition = q.opt.position !== !1, q.trackPosition && (q.position = q.line = q.column = 0), k(q, "onready");
      }
      Object.create || (Object.create = function(E) {
        function g() {
        }
        g.prototype = E;
        var q = new g();
        return q;
      }), Object.keys || (Object.keys = function(E) {
        var g = [];
        for (var q in E) E.hasOwnProperty(q) && g.push(q);
        return g;
      });
      function u(E) {
        for (var g = Math.max(h.MAX_BUFFER_LENGTH, 10), q = 0, I = 0, Ae = d.length; I < Ae; I++) {
          var Ce = E[d[I]].length;
          if (Ce > g)
            switch (d[I]) {
              case "textNode":
                G(E);
                break;
              case "cdata":
                F(E, "oncdata", E.cdata), E.cdata = "";
                break;
              case "script":
                F(E, "onscript", E.script), E.script = "";
                break;
              default:
                ee(E, "Max buffer length exceeded: " + d[I]);
            }
          q = Math.max(q, Ce);
        }
        var xe = h.MAX_BUFFER_LENGTH - q;
        E.bufferCheckPosition = xe + E.position;
      }
      function c(E) {
        for (var g = 0, q = d.length; g < q; g++)
          E[d[g]] = "";
      }
      function r(E) {
        G(E), E.cdata !== "" && (F(E, "oncdata", E.cdata), E.cdata = ""), E.script !== "" && (F(E, "onscript", E.script), E.script = "");
      }
      l.prototype = {
        end: function() {
          me(this);
        },
        write: Te,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          r(this);
        }
      };
      var f;
      try {
        f = require("stream").Stream;
      } catch {
        f = function() {
        };
      }
      f || (f = function() {
      });
      var a = h.EVENTS.filter(function(E) {
        return E !== "error" && E !== "end";
      });
      function o(E, g) {
        return new t(E, g);
      }
      function s(E, g) {
        if (E.length >= 2) {
          if (E[0] === 255 && E[1] === 254)
            return "utf-16le";
          if (E[0] === 254 && E[1] === 255)
            return "utf-16be";
        }
        return E.length >= 3 && E[0] === 239 && E[1] === 187 && E[2] === 191 ? "utf8" : E.length >= 4 ? E[0] === 60 && E[1] === 0 && E[2] === 63 && E[3] === 0 ? "utf-16le" : E[0] === 0 && E[1] === 60 && E[2] === 0 && E[3] === 63 ? "utf-16be" : "utf8" : g ? "utf8" : null;
      }
      function t(E, g) {
        if (!(this instanceof t))
          return new t(E, g);
        f.apply(this), this._parser = new l(E, g), this.writable = !0, this.readable = !0;
        var q = this;
        this._parser.onend = function() {
          q.emit("end");
        }, this._parser.onerror = function(I) {
          q.emit("error", I), q._parser.error = null;
        }, this._decoder = null, this._decoderBuffer = null, a.forEach(function(I) {
          Object.defineProperty(q, "on" + I, {
            get: function() {
              return q._parser["on" + I];
            },
            set: function(Ae) {
              if (!Ae)
                return q.removeAllListeners(I), q._parser["on" + I] = Ae, Ae;
              q.on(I, Ae);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      t.prototype = Object.create(f.prototype, {
        constructor: {
          value: t
        }
      }), t.prototype._decodeBuffer = function(E, g) {
        if (this._decoderBuffer && (E = Buffer.concat([this._decoderBuffer, E]), this._decoderBuffer = null), !this._decoder) {
          var q = s(E, g);
          if (!q)
            return this._decoderBuffer = E, "";
          this._parser.encoding = q, this._decoder = new TextDecoder(q);
        }
        return this._decoder.decode(E, { stream: !g });
      }, t.prototype.write = function(E) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(E))
          E = this._decodeBuffer(E, !1);
        else if (this._decoderBuffer) {
          var g = this._decodeBuffer(Buffer.alloc(0), !0);
          g && (this._parser.write(g), this.emit("data", g));
        }
        return this._parser.write(E.toString()), this.emit("data", E), !0;
      }, t.prototype.end = function(E) {
        if (E && E.length && this.write(E), this._decoderBuffer) {
          var g = this._decodeBuffer(Buffer.alloc(0), !0);
          g && (this._parser.write(g), this.emit("data", g));
        } else if (this._decoder) {
          var q = this._decoder.decode();
          q && (this._parser.write(q), this.emit("data", q));
        }
        return this._parser.end(), !0;
      }, t.prototype.on = function(E, g) {
        var q = this;
        return !q._parser["on" + E] && a.indexOf(E) !== -1 && (q._parser["on" + E] = function() {
          var I = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          I.splice(0, 0, E), q.emit.apply(q, I);
        }), f.prototype.on.call(q, E, g);
      };
      var e = "[CDATA[", p = "DOCTYPE", y = "http://www.w3.org/XML/1998/namespace", v = "http://www.w3.org/2000/xmlns/", m = { xml: y, xmlns: v }, _ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, A = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, P = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, N = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function C(E) {
        return E === " " || E === `
` || E === "\r" || E === "	";
      }
      function D(E) {
        return E === '"' || E === "'";
      }
      function b(E) {
        return E === ">" || C(E);
      }
      function S(E, g) {
        return E.test(g);
      }
      function O(E, g) {
        return !S(E, g);
      }
      var w = 0;
      h.STATE = {
        BEGIN: w++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: w++,
        // leading whitespace
        TEXT: w++,
        // general stuff
        TEXT_ENTITY: w++,
        // &amp and such.
        OPEN_WAKA: w++,
        // <
        SGML_DECL: w++,
        // <!BLARG
        SGML_DECL_QUOTED: w++,
        // <!BLARG foo "bar
        DOCTYPE: w++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: w++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: w++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: w++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: w++,
        // <!-
        COMMENT: w++,
        // <!--
        COMMENT_ENDING: w++,
        // <!-- blah -
        COMMENT_ENDED: w++,
        // <!-- blah --
        CDATA: w++,
        // <![CDATA[ something
        CDATA_ENDING: w++,
        // ]
        CDATA_ENDING_2: w++,
        // ]]
        PROC_INST: w++,
        // <?hi
        PROC_INST_BODY: w++,
        // <?hi there
        PROC_INST_ENDING: w++,
        // <?hi "there" ?
        OPEN_TAG: w++,
        // <strong
        OPEN_TAG_SLASH: w++,
        // <strong /
        ATTRIB: w++,
        // <a
        ATTRIB_NAME: w++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: w++,
        // <a foo _
        ATTRIB_VALUE: w++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: w++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: w++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: w++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: w++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: w++,
        // <foo bar=&quot
        CLOSE_TAG: w++,
        // </a
        CLOSE_TAG_SAW_WHITE: w++,
        // </a   >
        SCRIPT: w++,
        // <script> ...
        SCRIPT_ENDING: w++
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
        var g = h.ENTITIES[E], q = typeof g == "number" ? String.fromCharCode(g) : g;
        h.ENTITIES[E] = q;
      });
      for (var $ in h.STATE)
        h.STATE[h.STATE[$]] = $;
      w = h.STATE;
      function k(E, g, q) {
        E[g] && E[g](q);
      }
      function M(E) {
        var g = E && E.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
        return g ? g[2] : null;
      }
      function L(E) {
        return E ? E.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
      }
      function x(E, g) {
        const q = L(E), I = L(g);
        return !q || !I ? !0 : I === "utf16" ? q === "utf16le" || q === "utf16be" : q === I;
      }
      function H(E, g) {
        if (!(!E.strict || !E.encoding || !g || g.name !== "xml")) {
          var q = M(g.body);
          q && !x(E.encoding, q) && Z(
            E,
            "XML declaration encoding " + q + " does not match detected stream encoding " + E.encoding.toUpperCase()
          );
        }
      }
      function F(E, g, q) {
        E.textNode && G(E), k(E, g, q);
      }
      function G(E) {
        E.textNode = Y(E.opt, E.textNode), E.textNode && k(E, "ontext", E.textNode), E.textNode = "";
      }
      function Y(E, g) {
        return E.trim && (g = g.trim()), E.normalize && (g = g.replace(/\s+/g, " ")), g;
      }
      function ee(E, g) {
        return G(E), E.trackPosition && (g += `
Line: ` + E.line + `
Column: ` + E.column + `
Char: ` + E.c), g = new Error(g), E.error = g, k(E, "onerror", g), E;
      }
      function me(E) {
        return E.sawRoot && !E.closedRoot && Z(E, "Unclosed root tag"), E.state !== w.BEGIN && E.state !== w.BEGIN_WHITESPACE && E.state !== w.TEXT && ee(E, "Unexpected end"), G(E), E.c = "", E.closed = !0, k(E, "onend"), l.call(E, E.strict, E.opt), E;
      }
      function Z(E, g) {
        if (typeof E != "object" || !(E instanceof l))
          throw new Error("bad call to strictFail");
        E.strict && ee(E, g);
      }
      function ve(E) {
        E.strict || (E.tagName = E.tagName[E.looseCase]());
        var g = E.tags[E.tags.length - 1] || E, q = E.tag = { name: E.tagName, attributes: {} };
        E.opt.xmlns && (q.ns = g.ns), E.attribList.length = 0, F(E, "onopentagstart", q);
      }
      function ge(E, g) {
        var q = E.indexOf(":"), I = q < 0 ? ["", E] : E.split(":"), Ae = I[0], Ce = I[1];
        return g && E === "xmlns" && (Ae = "xmlns", Ce = ""), { prefix: Ae, local: Ce };
      }
      function Q(E) {
        if (E.strict || (E.attribName = E.attribName[E.looseCase]()), E.attribList.indexOf(E.attribName) !== -1 || E.tag.attributes.hasOwnProperty(E.attribName)) {
          E.attribName = E.attribValue = "";
          return;
        }
        if (E.opt.xmlns) {
          var g = ge(E.attribName, !0), q = g.prefix, I = g.local;
          if (q === "xmlns")
            if (I === "xml" && E.attribValue !== y)
              Z(
                E,
                "xml: prefix must be bound to " + y + `
Actual: ` + E.attribValue
              );
            else if (I === "xmlns" && E.attribValue !== v)
              Z(
                E,
                "xmlns: prefix must be bound to " + v + `
Actual: ` + E.attribValue
              );
            else {
              var Ae = E.tag, Ce = E.tags[E.tags.length - 1] || E;
              Ae.ns === Ce.ns && (Ae.ns = Object.create(Ce.ns)), Ae.ns[I] = E.attribValue;
            }
          E.attribList.push([E.attribName, E.attribValue]);
        } else
          E.tag.attributes[E.attribName] = E.attribValue, F(E, "onattribute", {
            name: E.attribName,
            value: E.attribValue
          });
        E.attribName = E.attribValue = "";
      }
      function ce(E, g) {
        if (E.opt.xmlns) {
          var q = E.tag, I = ge(E.tagName);
          q.prefix = I.prefix, q.local = I.local, q.uri = q.ns[I.prefix] || "", q.prefix && !q.uri && (Z(
            E,
            "Unbound namespace prefix: " + JSON.stringify(E.tagName)
          ), q.uri = I.prefix);
          var Ae = E.tags[E.tags.length - 1] || E;
          q.ns && Ae.ns !== q.ns && Object.keys(q.ns).forEach(function(ne) {
            F(E, "onopennamespace", {
              prefix: ne,
              uri: q.ns[ne]
            });
          });
          for (var Ce = 0, xe = E.attribList.length; Ce < xe; Ce++) {
            var Me = E.attribList[Ce], Be = Me[0], Ve = Me[1], n = ge(Be, !0), B = n.prefix, W = n.local, ie = B === "" ? "" : q.ns[B] || "", V = {
              name: Be,
              value: Ve,
              prefix: B,
              local: W,
              uri: ie
            };
            B && B !== "xmlns" && !ie && (Z(
              E,
              "Unbound namespace prefix: " + JSON.stringify(B)
            ), V.uri = B), E.tag.attributes[Be] = V, F(E, "onattribute", V);
          }
          E.attribList.length = 0;
        }
        E.tag.isSelfClosing = !!g, E.sawRoot = !0, E.tags.push(E.tag), F(E, "onopentag", E.tag), g || (!E.noscript && E.tagName.toLowerCase() === "script" ? E.state = w.SCRIPT : E.state = w.TEXT, E.tag = null, E.tagName = ""), E.attribName = E.attribValue = "", E.attribList.length = 0;
      }
      function Ee(E) {
        if (!E.tagName) {
          Z(E, "Weird empty close tag."), E.textNode += "</>", E.state = w.TEXT;
          return;
        }
        if (E.script) {
          if (E.tagName !== "script") {
            E.script += "</" + E.tagName + ">", E.tagName = "", E.state = w.SCRIPT;
            return;
          }
          F(E, "onscript", E.script), E.script = "";
        }
        var g = E.tags.length, q = E.tagName;
        E.strict || (q = q[E.looseCase]());
        for (var I = q; g--; ) {
          var Ae = E.tags[g];
          if (Ae.name !== I)
            Z(E, "Unexpected close tag");
          else
            break;
        }
        if (g < 0) {
          Z(E, "Unmatched closing tag: " + E.tagName), E.textNode += "</" + E.tagName + ">", E.state = w.TEXT;
          return;
        }
        E.tagName = q;
        for (var Ce = E.tags.length; Ce-- > g; ) {
          var xe = E.tag = E.tags.pop();
          E.tagName = E.tag.name, F(E, "onclosetag", E.tagName);
          var Me = {};
          for (var Be in xe.ns)
            Me[Be] = xe.ns[Be];
          var Ve = E.tags[E.tags.length - 1] || E;
          E.opt.xmlns && xe.ns !== Ve.ns && Object.keys(xe.ns).forEach(function(n) {
            var B = xe.ns[n];
            F(E, "onclosenamespace", { prefix: n, uri: B });
          });
        }
        g === 0 && (E.closedRoot = !0), E.tagName = E.attribValue = E.attribName = "", E.attribList.length = 0, E.state = w.TEXT;
      }
      function be(E) {
        var g = E.entity, q = g.toLowerCase(), I, Ae = "";
        return E.ENTITIES[g] ? E.ENTITIES[g] : E.ENTITIES[q] ? E.ENTITIES[q] : (g = q, g.charAt(0) === "#" && (g.charAt(1) === "x" ? (g = g.slice(2), I = parseInt(g, 16), Ae = I.toString(16)) : (g = g.slice(1), I = parseInt(g, 10), Ae = I.toString(10))), g = g.replace(/^0+/, ""), isNaN(I) || Ae.toLowerCase() !== g || I < 0 || I > 1114111 ? (Z(E, "Invalid character entity"), "&" + E.entity + ";") : String.fromCodePoint(I));
      }
      function Ne(E, g) {
        g === "<" ? (E.state = w.OPEN_WAKA, E.startTagPosition = E.position) : C(g) || (Z(E, "Non-whitespace before first tag."), E.textNode = g, E.state = w.TEXT);
      }
      function Ie(E, g) {
        var q = "";
        return g < E.length && (q = E.charAt(g)), q;
      }
      function Te(E) {
        var g = this;
        if (this.error)
          throw this.error;
        if (g.closed)
          return ee(
            g,
            "Cannot write after close. Assign an onready handler."
          );
        if (E === null)
          return me(g);
        typeof E == "object" && (E = E.toString());
        for (var q = 0, I = ""; I = Ie(E, q++), g.c = I, !!I; )
          switch (g.trackPosition && (g.position++, I === `
` ? (g.line++, g.column = 0) : g.column++), g.state) {
            case w.BEGIN:
              if (g.state = w.BEGIN_WHITESPACE, I === "\uFEFF")
                continue;
              Ne(g, I);
              continue;
            case w.BEGIN_WHITESPACE:
              Ne(g, I);
              continue;
            case w.TEXT:
              if (g.sawRoot && !g.closedRoot) {
                for (var Ce = q - 1; I && I !== "<" && I !== "&"; )
                  I = Ie(E, q++), I && g.trackPosition && (g.position++, I === `
` ? (g.line++, g.column = 0) : g.column++);
                g.textNode += E.substring(Ce, q - 1);
              }
              I === "<" && !(g.sawRoot && g.closedRoot && !g.strict) ? (g.state = w.OPEN_WAKA, g.startTagPosition = g.position) : (!C(I) && (!g.sawRoot || g.closedRoot) && Z(g, "Text data outside of root node."), I === "&" ? g.state = w.TEXT_ENTITY : g.textNode += I);
              continue;
            case w.SCRIPT:
              I === "<" ? g.state = w.SCRIPT_ENDING : g.script += I;
              continue;
            case w.SCRIPT_ENDING:
              I === "/" ? g.state = w.CLOSE_TAG : (g.script += "<" + I, g.state = w.SCRIPT);
              continue;
            case w.OPEN_WAKA:
              if (I === "!")
                g.state = w.SGML_DECL, g.sgmlDecl = "";
              else if (!C(I)) if (S(_, I))
                g.state = w.OPEN_TAG, g.tagName = I;
              else if (I === "/")
                g.state = w.CLOSE_TAG, g.tagName = "";
              else if (I === "?")
                g.state = w.PROC_INST, g.procInstName = g.procInstBody = "";
              else {
                if (Z(g, "Unencoded <"), g.startTagPosition + 1 < g.position) {
                  var Ae = g.position - g.startTagPosition;
                  I = new Array(Ae).join(" ") + I;
                }
                g.textNode += "<" + I, g.state = w.TEXT;
              }
              continue;
            case w.SGML_DECL:
              if (g.sgmlDecl + I === "--") {
                g.state = w.COMMENT, g.comment = "", g.sgmlDecl = "";
                continue;
              }
              g.doctype && g.doctype !== !0 && g.sgmlDecl ? (g.state = w.DOCTYPE_DTD, g.doctype += "<!" + g.sgmlDecl + I, g.sgmlDecl = "") : (g.sgmlDecl + I).toUpperCase() === e ? (F(g, "onopencdata"), g.state = w.CDATA, g.sgmlDecl = "", g.cdata = "") : (g.sgmlDecl + I).toUpperCase() === p ? (g.state = w.DOCTYPE, (g.doctype || g.sawRoot) && Z(
                g,
                "Inappropriately located doctype declaration"
              ), g.doctype = "", g.sgmlDecl = "") : I === ">" ? (F(g, "onsgmldeclaration", g.sgmlDecl), g.sgmlDecl = "", g.state = w.TEXT) : (D(I) && (g.state = w.SGML_DECL_QUOTED), g.sgmlDecl += I);
              continue;
            case w.SGML_DECL_QUOTED:
              I === g.q && (g.state = w.SGML_DECL, g.q = ""), g.sgmlDecl += I;
              continue;
            case w.DOCTYPE:
              I === ">" ? (g.state = w.TEXT, F(g, "ondoctype", g.doctype), g.doctype = !0) : (g.doctype += I, I === "[" ? g.state = w.DOCTYPE_DTD : D(I) && (g.state = w.DOCTYPE_QUOTED, g.q = I));
              continue;
            case w.DOCTYPE_QUOTED:
              g.doctype += I, I === g.q && (g.q = "", g.state = w.DOCTYPE);
              continue;
            case w.DOCTYPE_DTD:
              I === "]" ? (g.doctype += I, g.state = w.DOCTYPE) : I === "<" ? (g.state = w.OPEN_WAKA, g.startTagPosition = g.position) : D(I) ? (g.doctype += I, g.state = w.DOCTYPE_DTD_QUOTED, g.q = I) : g.doctype += I;
              continue;
            case w.DOCTYPE_DTD_QUOTED:
              g.doctype += I, I === g.q && (g.state = w.DOCTYPE_DTD, g.q = "");
              continue;
            case w.COMMENT:
              I === "-" ? g.state = w.COMMENT_ENDING : g.comment += I;
              continue;
            case w.COMMENT_ENDING:
              I === "-" ? (g.state = w.COMMENT_ENDED, g.comment = Y(g.opt, g.comment), g.comment && F(g, "oncomment", g.comment), g.comment = "") : (g.comment += "-" + I, g.state = w.COMMENT);
              continue;
            case w.COMMENT_ENDED:
              I !== ">" ? (Z(g, "Malformed comment"), g.comment += "--" + I, g.state = w.COMMENT) : g.doctype && g.doctype !== !0 ? g.state = w.DOCTYPE_DTD : g.state = w.TEXT;
              continue;
            case w.CDATA:
              for (var Ce = q - 1; I && I !== "]"; )
                I = Ie(E, q++), I && g.trackPosition && (g.position++, I === `
` ? (g.line++, g.column = 0) : g.column++);
              g.cdata += E.substring(Ce, q - 1), I === "]" && (g.state = w.CDATA_ENDING);
              continue;
            case w.CDATA_ENDING:
              I === "]" ? g.state = w.CDATA_ENDING_2 : (g.cdata += "]" + I, g.state = w.CDATA);
              continue;
            case w.CDATA_ENDING_2:
              I === ">" ? (g.cdata && F(g, "oncdata", g.cdata), F(g, "onclosecdata"), g.cdata = "", g.state = w.TEXT) : I === "]" ? g.cdata += "]" : (g.cdata += "]]" + I, g.state = w.CDATA);
              continue;
            case w.PROC_INST:
              I === "?" ? g.state = w.PROC_INST_ENDING : C(I) ? g.state = w.PROC_INST_BODY : g.procInstName += I;
              continue;
            case w.PROC_INST_BODY:
              if (!g.procInstBody && C(I))
                continue;
              I === "?" ? g.state = w.PROC_INST_ENDING : g.procInstBody += I;
              continue;
            case w.PROC_INST_ENDING:
              if (I === ">") {
                const Ve = {
                  name: g.procInstName,
                  body: g.procInstBody
                };
                H(g, Ve), F(g, "onprocessinginstruction", Ve), g.procInstName = g.procInstBody = "", g.state = w.TEXT;
              } else
                g.procInstBody += "?" + I, g.state = w.PROC_INST_BODY;
              continue;
            case w.OPEN_TAG:
              S(A, I) ? g.tagName += I : (ve(g), I === ">" ? ce(g) : I === "/" ? g.state = w.OPEN_TAG_SLASH : (C(I) || Z(g, "Invalid character in tag name"), g.state = w.ATTRIB));
              continue;
            case w.OPEN_TAG_SLASH:
              I === ">" ? (ce(g, !0), Ee(g)) : (Z(
                g,
                "Forward-slash in opening tag not followed by >"
              ), g.state = w.ATTRIB);
              continue;
            case w.ATTRIB:
              if (C(I))
                continue;
              I === ">" ? ce(g) : I === "/" ? g.state = w.OPEN_TAG_SLASH : S(_, I) ? (g.attribName = I, g.attribValue = "", g.state = w.ATTRIB_NAME) : Z(g, "Invalid attribute name");
              continue;
            case w.ATTRIB_NAME:
              I === "=" ? g.state = w.ATTRIB_VALUE : I === ">" ? (Z(g, "Attribute without value"), g.attribValue = g.attribName, Q(g), ce(g)) : C(I) ? g.state = w.ATTRIB_NAME_SAW_WHITE : S(A, I) ? g.attribName += I : Z(g, "Invalid attribute name");
              continue;
            case w.ATTRIB_NAME_SAW_WHITE:
              if (I === "=")
                g.state = w.ATTRIB_VALUE;
              else {
                if (C(I))
                  continue;
                Z(g, "Attribute without value"), g.tag.attributes[g.attribName] = "", g.attribValue = "", F(g, "onattribute", {
                  name: g.attribName,
                  value: ""
                }), g.attribName = "", I === ">" ? ce(g) : S(_, I) ? (g.attribName = I, g.state = w.ATTRIB_NAME) : (Z(g, "Invalid attribute name"), g.state = w.ATTRIB);
              }
              continue;
            case w.ATTRIB_VALUE:
              if (C(I))
                continue;
              D(I) ? (g.q = I, g.state = w.ATTRIB_VALUE_QUOTED) : (g.opt.unquotedAttributeValues || ee(g, "Unquoted attribute value"), g.state = w.ATTRIB_VALUE_UNQUOTED, g.attribValue = I);
              continue;
            case w.ATTRIB_VALUE_QUOTED:
              if (I !== g.q) {
                I === "&" ? g.state = w.ATTRIB_VALUE_ENTITY_Q : g.attribValue += I;
                continue;
              }
              Q(g), g.q = "", g.state = w.ATTRIB_VALUE_CLOSED;
              continue;
            case w.ATTRIB_VALUE_CLOSED:
              C(I) ? g.state = w.ATTRIB : I === ">" ? ce(g) : I === "/" ? g.state = w.OPEN_TAG_SLASH : S(_, I) ? (Z(g, "No whitespace between attributes"), g.attribName = I, g.attribValue = "", g.state = w.ATTRIB_NAME) : Z(g, "Invalid attribute name");
              continue;
            case w.ATTRIB_VALUE_UNQUOTED:
              if (!b(I)) {
                I === "&" ? g.state = w.ATTRIB_VALUE_ENTITY_U : g.attribValue += I;
                continue;
              }
              Q(g), I === ">" ? ce(g) : g.state = w.ATTRIB;
              continue;
            case w.CLOSE_TAG:
              if (g.tagName)
                I === ">" ? Ee(g) : S(A, I) ? g.tagName += I : g.script ? (g.script += "</" + g.tagName + I, g.tagName = "", g.state = w.SCRIPT) : (C(I) || Z(g, "Invalid tagname in closing tag"), g.state = w.CLOSE_TAG_SAW_WHITE);
              else {
                if (C(I))
                  continue;
                O(_, I) ? g.script ? (g.script += "</" + I, g.state = w.SCRIPT) : Z(g, "Invalid tagname in closing tag.") : g.tagName = I;
              }
              continue;
            case w.CLOSE_TAG_SAW_WHITE:
              if (C(I))
                continue;
              I === ">" ? Ee(g) : Z(g, "Invalid characters in closing tag");
              continue;
            case w.TEXT_ENTITY:
            case w.ATTRIB_VALUE_ENTITY_Q:
            case w.ATTRIB_VALUE_ENTITY_U:
              var xe, Me;
              switch (g.state) {
                case w.TEXT_ENTITY:
                  xe = w.TEXT, Me = "textNode";
                  break;
                case w.ATTRIB_VALUE_ENTITY_Q:
                  xe = w.ATTRIB_VALUE_QUOTED, Me = "attribValue";
                  break;
                case w.ATTRIB_VALUE_ENTITY_U:
                  xe = w.ATTRIB_VALUE_UNQUOTED, Me = "attribValue";
                  break;
              }
              if (I === ";") {
                var Be = be(g);
                g.opt.unparsedEntities && !Object.values(h.XML_ENTITIES).includes(Be) ? ((g.entityCount += 1) > g.opt.maxEntityCount && ee(
                  g,
                  "Parsed entity count exceeds max entity count"
                ), (g.entityDepth += 1) > g.opt.maxEntityDepth && ee(
                  g,
                  "Parsed entity depth exceeds max entity depth"
                ), g.entity = "", g.state = xe, g.write(Be), g.entityDepth -= 1) : (g[Me] += Be, g.entity = "", g.state = xe);
              } else S(g.entity.length ? N : P, I) ? g.entity += I : (Z(g, "Invalid character in entity name"), g[Me] += "&" + g.entity + I, g.entity = "", g.state = xe);
              continue;
            default:
              throw new Error(g, "Unknown state: " + g.state);
          }
        return g.position >= g.bufferCheckPosition && u(g), g;
      }
      String.fromCodePoint || (function() {
        var E = String.fromCharCode, g = Math.floor, q = function() {
          var I = 16384, Ae = [], Ce, xe, Me = -1, Be = arguments.length;
          if (!Be)
            return "";
          for (var Ve = ""; ++Me < Be; ) {
            var n = Number(arguments[Me]);
            if (!isFinite(n) || // `NaN`, `+Infinity`, or `-Infinity`
            n < 0 || // not a valid Unicode code point
            n > 1114111 || // not a valid Unicode code point
            g(n) !== n)
              throw RangeError("Invalid code point: " + n);
            n <= 65535 ? Ae.push(n) : (n -= 65536, Ce = (n >> 10) + 55296, xe = n % 1024 + 56320, Ae.push(Ce, xe)), (Me + 1 === Be || Ae.length > I) && (Ve += E.apply(null, Ae), Ae.length = 0);
          }
          return Ve;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: q,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = q;
      })();
    })(i);
  })(Jn)), Jn;
}
var js;
function Sf() {
  if (js) return Gt;
  js = 1, Object.defineProperty(Gt, "__esModule", { value: !0 }), Gt.XElement = void 0, Gt.parseXml = r;
  const i = _f(), h = tn();
  class d {
    constructor(a) {
      if (this.name = a, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !a)
        throw (0, h.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!u(a))
        throw (0, h.newError)(`Invalid element name: ${a}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(a) {
      const o = this.attributes === null ? null : this.attributes[a];
      if (o == null)
        throw (0, h.newError)(`No attribute "${a}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return o;
    }
    removeAttribute(a) {
      this.attributes !== null && delete this.attributes[a];
    }
    element(a, o = !1, s = null) {
      const t = this.elementOrNull(a, o);
      if (t === null)
        throw (0, h.newError)(s || `No element "${a}"`, "ERR_XML_MISSED_ELEMENT");
      return t;
    }
    elementOrNull(a, o = !1) {
      if (this.elements === null)
        return null;
      for (const s of this.elements)
        if (c(s, a, o))
          return s;
      return null;
    }
    getElements(a, o = !1) {
      return this.elements === null ? [] : this.elements.filter((s) => c(s, a, o));
    }
    elementValueOrEmpty(a, o = !1) {
      const s = this.elementOrNull(a, o);
      return s === null ? "" : s.value;
    }
  }
  Gt.XElement = d;
  const l = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function u(f) {
    return l.test(f);
  }
  function c(f, a, o) {
    const s = f.name;
    return s === a || o === !0 && s.length === a.length && s.toLowerCase() === a.toLowerCase();
  }
  function r(f) {
    let a = null;
    const o = i.parser(!0, {}), s = [];
    return o.onopentag = (t) => {
      const e = new d(t.name);
      if (e.attributes = t.attributes, a === null)
        a = e;
      else {
        const p = s[s.length - 1];
        p.elements == null && (p.elements = []), p.elements.push(e);
      }
      s.push(e);
    }, o.onclosetag = () => {
      s.pop();
    }, o.ontext = (t) => {
      s.length > 0 && (s[s.length - 1].value = t);
    }, o.oncdata = (t) => {
      const e = s[s.length - 1];
      e.value = t, e.isCData = !0;
    }, o.onerror = (t) => {
      throw t;
    }, o.write(f), a;
  }
  return Gt;
}
var Hs;
function Ge() {
  return Hs || (Hs = 1, (function(i) {
    Object.defineProperty(i, "__esModule", { value: !0 }), i.CURRENT_APP_PACKAGE_FILE_NAME = i.CURRENT_APP_INSTALLER_FILE_NAME = i.XElement = i.parseXml = i.UUID = i.parseDn = i.retry = i.githubTagPrefix = i.githubUrl = i.getS3LikeProviderBaseUrl = i.ProgressCallbackTransform = i.MemoLazy = i.safeStringifyJson = i.safeGetHeader = i.parseJson = i.HttpExecutor = i.HttpError = i.DigestTransform = i.createHttpError = i.configureRequestUrl = i.configureRequestOptionsFromUrl = i.configureRequestOptions = i.newError = i.CancellationToken = i.CancellationError = void 0, i.asArray = t;
    var h = va();
    Object.defineProperty(i, "CancellationError", { enumerable: !0, get: function() {
      return h.CancellationError;
    } }), Object.defineProperty(i, "CancellationToken", { enumerable: !0, get: function() {
      return h.CancellationToken;
    } });
    var d = tn();
    Object.defineProperty(i, "newError", { enumerable: !0, get: function() {
      return d.newError;
    } });
    var l = mf();
    Object.defineProperty(i, "configureRequestOptions", { enumerable: !0, get: function() {
      return l.configureRequestOptions;
    } }), Object.defineProperty(i, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return l.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(i, "configureRequestUrl", { enumerable: !0, get: function() {
      return l.configureRequestUrl;
    } }), Object.defineProperty(i, "createHttpError", { enumerable: !0, get: function() {
      return l.createHttpError;
    } }), Object.defineProperty(i, "DigestTransform", { enumerable: !0, get: function() {
      return l.DigestTransform;
    } }), Object.defineProperty(i, "HttpError", { enumerable: !0, get: function() {
      return l.HttpError;
    } }), Object.defineProperty(i, "HttpExecutor", { enumerable: !0, get: function() {
      return l.HttpExecutor;
    } }), Object.defineProperty(i, "parseJson", { enumerable: !0, get: function() {
      return l.parseJson;
    } }), Object.defineProperty(i, "safeGetHeader", { enumerable: !0, get: function() {
      return l.safeGetHeader;
    } }), Object.defineProperty(i, "safeStringifyJson", { enumerable: !0, get: function() {
      return l.safeStringifyJson;
    } });
    var u = gf();
    Object.defineProperty(i, "MemoLazy", { enumerable: !0, get: function() {
      return u.MemoLazy;
    } });
    var c = nu();
    Object.defineProperty(i, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return c.ProgressCallbackTransform;
    } });
    var r = yf();
    Object.defineProperty(i, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return r.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(i, "githubUrl", { enumerable: !0, get: function() {
      return r.githubUrl;
    } }), Object.defineProperty(i, "githubTagPrefix", { enumerable: !0, get: function() {
      return r.githubTagPrefix;
    } });
    var f = vf();
    Object.defineProperty(i, "retry", { enumerable: !0, get: function() {
      return f.retry;
    } });
    var a = Ef();
    Object.defineProperty(i, "parseDn", { enumerable: !0, get: function() {
      return a.parseDn;
    } });
    var o = wf();
    Object.defineProperty(i, "UUID", { enumerable: !0, get: function() {
      return o.UUID;
    } });
    var s = Sf();
    Object.defineProperty(i, "parseXml", { enumerable: !0, get: function() {
      return s.parseXml;
    } }), Object.defineProperty(i, "XElement", { enumerable: !0, get: function() {
      return s.XElement;
    } }), i.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", i.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function t(e) {
      return e == null ? [] : Array.isArray(e) ? e : [e];
    }
  })(Wn)), Wn;
}
var Xe = {}, Yr = {}, wt = {}, Gs;
function Or() {
  if (Gs) return wt;
  Gs = 1;
  function i(r) {
    return typeof r > "u" || r === null;
  }
  function h(r) {
    return typeof r == "object" && r !== null;
  }
  function d(r) {
    return Array.isArray(r) ? r : i(r) ? [] : [r];
  }
  function l(r, f) {
    var a, o, s, t;
    if (f)
      for (t = Object.keys(f), a = 0, o = t.length; a < o; a += 1)
        s = t[a], r[s] = f[s];
    return r;
  }
  function u(r, f) {
    var a = "", o;
    for (o = 0; o < f; o += 1)
      a += r;
    return a;
  }
  function c(r) {
    return r === 0 && Number.NEGATIVE_INFINITY === 1 / r;
  }
  return wt.isNothing = i, wt.isObject = h, wt.toArray = d, wt.repeat = u, wt.isNegativeZero = c, wt.extend = l, wt;
}
var Kn, Ws;
function Dr() {
  if (Ws) return Kn;
  Ws = 1;
  function i(d, l) {
    var u = "", c = d.reason || "(unknown reason)";
    return d.mark ? (d.mark.name && (u += 'in "' + d.mark.name + '" '), u += "(" + (d.mark.line + 1) + ":" + (d.mark.column + 1) + ")", !l && d.mark.snippet && (u += `

` + d.mark.snippet), c + " " + u) : c;
  }
  function h(d, l) {
    Error.call(this), this.name = "YAMLException", this.reason = d, this.mark = l, this.message = i(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return h.prototype = Object.create(Error.prototype), h.prototype.constructor = h, h.prototype.toString = function(l) {
    return this.name + ": " + i(this, l);
  }, Kn = h, Kn;
}
var Qn, Vs;
function Rf() {
  if (Vs) return Qn;
  Vs = 1;
  var i = Or();
  function h(u, c, r, f, a) {
    var o = "", s = "", t = Math.floor(a / 2) - 1;
    return f - c > t && (o = " ... ", c = f - t + o.length), r - f > t && (s = " ...", r = f + t - s.length), {
      str: o + u.slice(c, r).replace(/\t/g, "→") + s,
      pos: f - c + o.length
      // relative position
    };
  }
  function d(u, c) {
    return i.repeat(" ", c - u.length) + u;
  }
  function l(u, c) {
    if (c = Object.create(c || null), !u.buffer) return null;
    c.maxLength || (c.maxLength = 79), typeof c.indent != "number" && (c.indent = 1), typeof c.linesBefore != "number" && (c.linesBefore = 3), typeof c.linesAfter != "number" && (c.linesAfter = 2);
    for (var r = /\r?\n|\r|\0/g, f = [0], a = [], o, s = -1; o = r.exec(u.buffer); )
      a.push(o.index), f.push(o.index + o[0].length), u.position <= o.index && s < 0 && (s = f.length - 2);
    s < 0 && (s = f.length - 1);
    var t = "", e, p, y = Math.min(u.line + c.linesAfter, a.length).toString().length, v = c.maxLength - (c.indent + y + 3);
    for (e = 1; e <= c.linesBefore && !(s - e < 0); e++)
      p = h(
        u.buffer,
        f[s - e],
        a[s - e],
        u.position - (f[s] - f[s - e]),
        v
      ), t = i.repeat(" ", c.indent) + d((u.line - e + 1).toString(), y) + " | " + p.str + `
` + t;
    for (p = h(u.buffer, f[s], a[s], u.position, v), t += i.repeat(" ", c.indent) + d((u.line + 1).toString(), y) + " | " + p.str + `
`, t += i.repeat("-", c.indent + y + 3 + p.pos) + `^
`, e = 1; e <= c.linesAfter && !(s + e >= a.length); e++)
      p = h(
        u.buffer,
        f[s + e],
        a[s + e],
        u.position - (f[s] - f[s + e]),
        v
      ), t += i.repeat(" ", c.indent) + d((u.line + e + 1).toString(), y) + " | " + p.str + `
`;
    return t.replace(/\n$/, "");
  }
  return Qn = l, Qn;
}
var Zn, Ys;
function Je() {
  if (Ys) return Zn;
  Ys = 1;
  var i = Dr(), h = [
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
  ], d = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function l(c) {
    var r = {};
    return c !== null && Object.keys(c).forEach(function(f) {
      c[f].forEach(function(a) {
        r[String(a)] = f;
      });
    }), r;
  }
  function u(c, r) {
    if (r = r || {}, Object.keys(r).forEach(function(f) {
      if (h.indexOf(f) === -1)
        throw new i('Unknown option "' + f + '" is met in definition of "' + c + '" YAML type.');
    }), this.options = r, this.tag = c, this.kind = r.kind || null, this.resolve = r.resolve || function() {
      return !0;
    }, this.construct = r.construct || function(f) {
      return f;
    }, this.instanceOf = r.instanceOf || null, this.predicate = r.predicate || null, this.represent = r.represent || null, this.representName = r.representName || null, this.defaultStyle = r.defaultStyle || null, this.multi = r.multi || !1, this.styleAliases = l(r.styleAliases || null), d.indexOf(this.kind) === -1)
      throw new i('Unknown kind "' + this.kind + '" is specified for "' + c + '" YAML type.');
  }
  return Zn = u, Zn;
}
var ei, zs;
function iu() {
  if (zs) return ei;
  zs = 1;
  var i = Dr(), h = Je();
  function d(c, r) {
    var f = [];
    return c[r].forEach(function(a) {
      var o = f.length;
      f.forEach(function(s, t) {
        s.tag === a.tag && s.kind === a.kind && s.multi === a.multi && (o = t);
      }), f[o] = a;
    }), f;
  }
  function l() {
    var c = {
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
    }, r, f;
    function a(o) {
      o.multi ? (c.multi[o.kind].push(o), c.multi.fallback.push(o)) : c[o.kind][o.tag] = c.fallback[o.tag] = o;
    }
    for (r = 0, f = arguments.length; r < f; r += 1)
      arguments[r].forEach(a);
    return c;
  }
  function u(c) {
    return this.extend(c);
  }
  return u.prototype.extend = function(r) {
    var f = [], a = [];
    if (r instanceof h)
      a.push(r);
    else if (Array.isArray(r))
      a = a.concat(r);
    else if (r && (Array.isArray(r.implicit) || Array.isArray(r.explicit)))
      r.implicit && (f = f.concat(r.implicit)), r.explicit && (a = a.concat(r.explicit));
    else
      throw new i("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    f.forEach(function(s) {
      if (!(s instanceof h))
        throw new i("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (s.loadKind && s.loadKind !== "scalar")
        throw new i("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (s.multi)
        throw new i("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), a.forEach(function(s) {
      if (!(s instanceof h))
        throw new i("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var o = Object.create(u.prototype);
    return o.implicit = (this.implicit || []).concat(f), o.explicit = (this.explicit || []).concat(a), o.compiledImplicit = d(o, "implicit"), o.compiledExplicit = d(o, "explicit"), o.compiledTypeMap = l(o.compiledImplicit, o.compiledExplicit), o;
  }, ei = u, ei;
}
var ti, Xs;
function au() {
  if (Xs) return ti;
  Xs = 1;
  var i = Je();
  return ti = new i("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(h) {
      return h !== null ? h : "";
    }
  }), ti;
}
var ri, Js;
function su() {
  if (Js) return ri;
  Js = 1;
  var i = Je();
  return ri = new i("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(h) {
      return h !== null ? h : [];
    }
  }), ri;
}
var ni, Ks;
function ou() {
  if (Ks) return ni;
  Ks = 1;
  var i = Je();
  return ni = new i("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(h) {
      return h !== null ? h : {};
    }
  }), ni;
}
var ii, Qs;
function lu() {
  if (Qs) return ii;
  Qs = 1;
  var i = iu();
  return ii = new i({
    explicit: [
      au(),
      su(),
      ou()
    ]
  }), ii;
}
var ai, Zs;
function uu() {
  if (Zs) return ai;
  Zs = 1;
  var i = Je();
  function h(u) {
    if (u === null) return !0;
    var c = u.length;
    return c === 1 && u === "~" || c === 4 && (u === "null" || u === "Null" || u === "NULL");
  }
  function d() {
    return null;
  }
  function l(u) {
    return u === null;
  }
  return ai = new i("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: h,
    construct: d,
    predicate: l,
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
  }), ai;
}
var si, eo;
function cu() {
  if (eo) return si;
  eo = 1;
  var i = Je();
  function h(u) {
    if (u === null) return !1;
    var c = u.length;
    return c === 4 && (u === "true" || u === "True" || u === "TRUE") || c === 5 && (u === "false" || u === "False" || u === "FALSE");
  }
  function d(u) {
    return u === "true" || u === "True" || u === "TRUE";
  }
  function l(u) {
    return Object.prototype.toString.call(u) === "[object Boolean]";
  }
  return si = new i("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: h,
    construct: d,
    predicate: l,
    represent: {
      lowercase: function(u) {
        return u ? "true" : "false";
      },
      uppercase: function(u) {
        return u ? "TRUE" : "FALSE";
      },
      camelcase: function(u) {
        return u ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), si;
}
var oi, to;
function fu() {
  if (to) return oi;
  to = 1;
  var i = Or(), h = Je();
  function d(a) {
    return 48 <= a && a <= 57 || 65 <= a && a <= 70 || 97 <= a && a <= 102;
  }
  function l(a) {
    return 48 <= a && a <= 55;
  }
  function u(a) {
    return 48 <= a && a <= 57;
  }
  function c(a) {
    if (a === null) return !1;
    var o = a.length, s = 0, t = !1, e;
    if (!o) return !1;
    if (e = a[s], (e === "-" || e === "+") && (e = a[++s]), e === "0") {
      if (s + 1 === o) return !0;
      if (e = a[++s], e === "b") {
        for (s++; s < o; s++)
          if (e = a[s], e !== "_") {
            if (e !== "0" && e !== "1") return !1;
            t = !0;
          }
        return t && e !== "_";
      }
      if (e === "x") {
        for (s++; s < o; s++)
          if (e = a[s], e !== "_") {
            if (!d(a.charCodeAt(s))) return !1;
            t = !0;
          }
        return t && e !== "_";
      }
      if (e === "o") {
        for (s++; s < o; s++)
          if (e = a[s], e !== "_") {
            if (!l(a.charCodeAt(s))) return !1;
            t = !0;
          }
        return t && e !== "_";
      }
    }
    if (e === "_") return !1;
    for (; s < o; s++)
      if (e = a[s], e !== "_") {
        if (!u(a.charCodeAt(s)))
          return !1;
        t = !0;
      }
    return !(!t || e === "_");
  }
  function r(a) {
    var o = a, s = 1, t;
    if (o.indexOf("_") !== -1 && (o = o.replace(/_/g, "")), t = o[0], (t === "-" || t === "+") && (t === "-" && (s = -1), o = o.slice(1), t = o[0]), o === "0") return 0;
    if (t === "0") {
      if (o[1] === "b") return s * parseInt(o.slice(2), 2);
      if (o[1] === "x") return s * parseInt(o.slice(2), 16);
      if (o[1] === "o") return s * parseInt(o.slice(2), 8);
    }
    return s * parseInt(o, 10);
  }
  function f(a) {
    return Object.prototype.toString.call(a) === "[object Number]" && a % 1 === 0 && !i.isNegativeZero(a);
  }
  return oi = new h("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: c,
    construct: r,
    predicate: f,
    represent: {
      binary: function(a) {
        return a >= 0 ? "0b" + a.toString(2) : "-0b" + a.toString(2).slice(1);
      },
      octal: function(a) {
        return a >= 0 ? "0o" + a.toString(8) : "-0o" + a.toString(8).slice(1);
      },
      decimal: function(a) {
        return a.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(a) {
        return a >= 0 ? "0x" + a.toString(16).toUpperCase() : "-0x" + a.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), oi;
}
var li, ro;
function du() {
  if (ro) return li;
  ro = 1;
  var i = Or(), h = Je(), d = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function l(a) {
    return !(a === null || !d.test(a) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    a[a.length - 1] === "_");
  }
  function u(a) {
    var o, s;
    return o = a.replace(/_/g, "").toLowerCase(), s = o[0] === "-" ? -1 : 1, "+-".indexOf(o[0]) >= 0 && (o = o.slice(1)), o === ".inf" ? s === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : o === ".nan" ? NaN : s * parseFloat(o, 10);
  }
  var c = /^[-+]?[0-9]+e/;
  function r(a, o) {
    var s;
    if (isNaN(a))
      switch (o) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === a)
      switch (o) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === a)
      switch (o) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (i.isNegativeZero(a))
      return "-0.0";
    return s = a.toString(10), c.test(s) ? s.replace("e", ".e") : s;
  }
  function f(a) {
    return Object.prototype.toString.call(a) === "[object Number]" && (a % 1 !== 0 || i.isNegativeZero(a));
  }
  return li = new h("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: l,
    construct: u,
    predicate: f,
    represent: r,
    defaultStyle: "lowercase"
  }), li;
}
var ui, no;
function hu() {
  return no || (no = 1, ui = lu().extend({
    implicit: [
      uu(),
      cu(),
      fu(),
      du()
    ]
  })), ui;
}
var ci, io;
function pu() {
  return io || (io = 1, ci = hu()), ci;
}
var fi, ao;
function mu() {
  if (ao) return fi;
  ao = 1;
  var i = Je(), h = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), d = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function l(r) {
    return r === null ? !1 : h.exec(r) !== null || d.exec(r) !== null;
  }
  function u(r) {
    var f, a, o, s, t, e, p, y = 0, v = null, m, _, A;
    if (f = h.exec(r), f === null && (f = d.exec(r)), f === null) throw new Error("Date resolve error");
    if (a = +f[1], o = +f[2] - 1, s = +f[3], !f[4])
      return new Date(Date.UTC(a, o, s));
    if (t = +f[4], e = +f[5], p = +f[6], f[7]) {
      for (y = f[7].slice(0, 3); y.length < 3; )
        y += "0";
      y = +y;
    }
    return f[9] && (m = +f[10], _ = +(f[11] || 0), v = (m * 60 + _) * 6e4, f[9] === "-" && (v = -v)), A = new Date(Date.UTC(a, o, s, t, e, p, y)), v && A.setTime(A.getTime() - v), A;
  }
  function c(r) {
    return r.toISOString();
  }
  return fi = new i("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: l,
    construct: u,
    instanceOf: Date,
    represent: c
  }), fi;
}
var di, so;
function gu() {
  if (so) return di;
  so = 1;
  var i = Je();
  function h(d) {
    return d === "<<" || d === null;
  }
  return di = new i("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: h
  }), di;
}
var hi, oo;
function yu() {
  if (oo) return hi;
  oo = 1;
  var i = Je(), h = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function d(r) {
    if (r === null) return !1;
    var f, a, o = 0, s = r.length, t = h;
    for (a = 0; a < s; a++)
      if (f = t.indexOf(r.charAt(a)), !(f > 64)) {
        if (f < 0) return !1;
        o += 6;
      }
    return o % 8 === 0;
  }
  function l(r) {
    var f, a, o = r.replace(/[\r\n=]/g, ""), s = o.length, t = h, e = 0, p = [];
    for (f = 0; f < s; f++)
      f % 4 === 0 && f && (p.push(e >> 16 & 255), p.push(e >> 8 & 255), p.push(e & 255)), e = e << 6 | t.indexOf(o.charAt(f));
    return a = s % 4 * 6, a === 0 ? (p.push(e >> 16 & 255), p.push(e >> 8 & 255), p.push(e & 255)) : a === 18 ? (p.push(e >> 10 & 255), p.push(e >> 2 & 255)) : a === 12 && p.push(e >> 4 & 255), new Uint8Array(p);
  }
  function u(r) {
    var f = "", a = 0, o, s, t = r.length, e = h;
    for (o = 0; o < t; o++)
      o % 3 === 0 && o && (f += e[a >> 18 & 63], f += e[a >> 12 & 63], f += e[a >> 6 & 63], f += e[a & 63]), a = (a << 8) + r[o];
    return s = t % 3, s === 0 ? (f += e[a >> 18 & 63], f += e[a >> 12 & 63], f += e[a >> 6 & 63], f += e[a & 63]) : s === 2 ? (f += e[a >> 10 & 63], f += e[a >> 4 & 63], f += e[a << 2 & 63], f += e[64]) : s === 1 && (f += e[a >> 2 & 63], f += e[a << 4 & 63], f += e[64], f += e[64]), f;
  }
  function c(r) {
    return Object.prototype.toString.call(r) === "[object Uint8Array]";
  }
  return hi = new i("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: d,
    construct: l,
    predicate: c,
    represent: u
  }), hi;
}
var pi, lo;
function vu() {
  if (lo) return pi;
  lo = 1;
  var i = Je(), h = Object.prototype.hasOwnProperty, d = Object.prototype.toString;
  function l(c) {
    if (c === null) return !0;
    var r = [], f, a, o, s, t, e = c;
    for (f = 0, a = e.length; f < a; f += 1) {
      if (o = e[f], t = !1, d.call(o) !== "[object Object]") return !1;
      for (s in o)
        if (h.call(o, s))
          if (!t) t = !0;
          else return !1;
      if (!t) return !1;
      if (r.indexOf(s) === -1) r.push(s);
      else return !1;
    }
    return !0;
  }
  function u(c) {
    return c !== null ? c : [];
  }
  return pi = new i("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: l,
    construct: u
  }), pi;
}
var mi, uo;
function Eu() {
  if (uo) return mi;
  uo = 1;
  var i = Je(), h = Object.prototype.toString;
  function d(u) {
    if (u === null) return !0;
    var c, r, f, a, o, s = u;
    for (o = new Array(s.length), c = 0, r = s.length; c < r; c += 1) {
      if (f = s[c], h.call(f) !== "[object Object]" || (a = Object.keys(f), a.length !== 1)) return !1;
      o[c] = [a[0], f[a[0]]];
    }
    return !0;
  }
  function l(u) {
    if (u === null) return [];
    var c, r, f, a, o, s = u;
    for (o = new Array(s.length), c = 0, r = s.length; c < r; c += 1)
      f = s[c], a = Object.keys(f), o[c] = [a[0], f[a[0]]];
    return o;
  }
  return mi = new i("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: d,
    construct: l
  }), mi;
}
var gi, co;
function wu() {
  if (co) return gi;
  co = 1;
  var i = Je(), h = Object.prototype.hasOwnProperty;
  function d(u) {
    if (u === null) return !0;
    var c, r = u;
    for (c in r)
      if (h.call(r, c) && r[c] !== null)
        return !1;
    return !0;
  }
  function l(u) {
    return u !== null ? u : {};
  }
  return gi = new i("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: d,
    construct: l
  }), gi;
}
var yi, fo;
function Ea() {
  return fo || (fo = 1, yi = pu().extend({
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
  })), yi;
}
var ho;
function Af() {
  if (ho) return Yr;
  ho = 1;
  var i = Or(), h = Dr(), d = Rf(), l = Ea(), u = Object.prototype.hasOwnProperty, c = 1, r = 2, f = 3, a = 4, o = 1, s = 2, t = 3, e = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, p = /[\x85\u2028\u2029]/, y = /[,\[\]\{\}]/, v = /^(?:!|!!|![a-z\-]+!)$/i, m = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function _(n) {
    return Object.prototype.toString.call(n);
  }
  function A(n) {
    return n === 10 || n === 13;
  }
  function P(n) {
    return n === 9 || n === 32;
  }
  function N(n) {
    return n === 9 || n === 32 || n === 10 || n === 13;
  }
  function C(n) {
    return n === 44 || n === 91 || n === 93 || n === 123 || n === 125;
  }
  function D(n) {
    var B;
    return 48 <= n && n <= 57 ? n - 48 : (B = n | 32, 97 <= B && B <= 102 ? B - 97 + 10 : -1);
  }
  function b(n) {
    return n === 120 ? 2 : n === 117 ? 4 : n === 85 ? 8 : 0;
  }
  function S(n) {
    return 48 <= n && n <= 57 ? n - 48 : -1;
  }
  function O(n) {
    return n === 48 ? "\0" : n === 97 ? "\x07" : n === 98 ? "\b" : n === 116 || n === 9 ? "	" : n === 110 ? `
` : n === 118 ? "\v" : n === 102 ? "\f" : n === 114 ? "\r" : n === 101 ? "\x1B" : n === 32 ? " " : n === 34 ? '"' : n === 47 ? "/" : n === 92 ? "\\" : n === 78 ? "" : n === 95 ? " " : n === 76 ? "\u2028" : n === 80 ? "\u2029" : "";
  }
  function w(n) {
    return n <= 65535 ? String.fromCharCode(n) : String.fromCharCode(
      (n - 65536 >> 10) + 55296,
      (n - 65536 & 1023) + 56320
    );
  }
  function $(n, B, W) {
    B === "__proto__" ? Object.defineProperty(n, B, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: W
    }) : n[B] = W;
  }
  for (var k = new Array(256), M = new Array(256), L = 0; L < 256; L++)
    k[L] = O(L) ? 1 : 0, M[L] = O(L);
  function x(n, B) {
    this.input = n, this.filename = B.filename || null, this.schema = B.schema || l, this.onWarning = B.onWarning || null, this.legacy = B.legacy || !1, this.json = B.json || !1, this.listener = B.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = n.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function H(n, B) {
    var W = {
      name: n.filename,
      buffer: n.input.slice(0, -1),
      // omit trailing \0
      position: n.position,
      line: n.line,
      column: n.position - n.lineStart
    };
    return W.snippet = d(W), new h(B, W);
  }
  function F(n, B) {
    throw H(n, B);
  }
  function G(n, B) {
    n.onWarning && n.onWarning.call(null, H(n, B));
  }
  var Y = {
    YAML: function(B, W, ie) {
      var V, ne, te;
      B.version !== null && F(B, "duplication of %YAML directive"), ie.length !== 1 && F(B, "YAML directive accepts exactly one argument"), V = /^([0-9]+)\.([0-9]+)$/.exec(ie[0]), V === null && F(B, "ill-formed argument of the YAML directive"), ne = parseInt(V[1], 10), te = parseInt(V[2], 10), ne !== 1 && F(B, "unacceptable YAML version of the document"), B.version = ie[0], B.checkLineBreaks = te < 2, te !== 1 && te !== 2 && G(B, "unsupported YAML version of the document");
    },
    TAG: function(B, W, ie) {
      var V, ne;
      ie.length !== 2 && F(B, "TAG directive accepts exactly two arguments"), V = ie[0], ne = ie[1], v.test(V) || F(B, "ill-formed tag handle (first argument) of the TAG directive"), u.call(B.tagMap, V) && F(B, 'there is a previously declared suffix for "' + V + '" tag handle'), m.test(ne) || F(B, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        ne = decodeURIComponent(ne);
      } catch {
        F(B, "tag prefix is malformed: " + ne);
      }
      B.tagMap[V] = ne;
    }
  };
  function ee(n, B, W, ie) {
    var V, ne, te, se;
    if (B < W) {
      if (se = n.input.slice(B, W), ie)
        for (V = 0, ne = se.length; V < ne; V += 1)
          te = se.charCodeAt(V), te === 9 || 32 <= te && te <= 1114111 || F(n, "expected valid JSON character");
      else e.test(se) && F(n, "the stream contains non-printable characters");
      n.result += se;
    }
  }
  function me(n, B, W, ie) {
    var V, ne, te, se;
    for (i.isObject(W) || F(n, "cannot merge mappings; the provided source object is unacceptable"), V = Object.keys(W), te = 0, se = V.length; te < se; te += 1)
      ne = V[te], u.call(B, ne) || ($(B, ne, W[ne]), ie[ne] = !0);
  }
  function Z(n, B, W, ie, V, ne, te, se, ue) {
    var Pe, Oe;
    if (Array.isArray(V))
      for (V = Array.prototype.slice.call(V), Pe = 0, Oe = V.length; Pe < Oe; Pe += 1)
        Array.isArray(V[Pe]) && F(n, "nested arrays are not supported inside keys"), typeof V == "object" && _(V[Pe]) === "[object Object]" && (V[Pe] = "[object Object]");
    if (typeof V == "object" && _(V) === "[object Object]" && (V = "[object Object]"), V = String(V), B === null && (B = {}), ie === "tag:yaml.org,2002:merge")
      if (Array.isArray(ne))
        for (Pe = 0, Oe = ne.length; Pe < Oe; Pe += 1)
          me(n, B, ne[Pe], W);
      else
        me(n, B, ne, W);
    else
      !n.json && !u.call(W, V) && u.call(B, V) && (n.line = te || n.line, n.lineStart = se || n.lineStart, n.position = ue || n.position, F(n, "duplicated mapping key")), $(B, V, ne), delete W[V];
    return B;
  }
  function ve(n) {
    var B;
    B = n.input.charCodeAt(n.position), B === 10 ? n.position++ : B === 13 ? (n.position++, n.input.charCodeAt(n.position) === 10 && n.position++) : F(n, "a line break is expected"), n.line += 1, n.lineStart = n.position, n.firstTabInLine = -1;
  }
  function ge(n, B, W) {
    for (var ie = 0, V = n.input.charCodeAt(n.position); V !== 0; ) {
      for (; P(V); )
        V === 9 && n.firstTabInLine === -1 && (n.firstTabInLine = n.position), V = n.input.charCodeAt(++n.position);
      if (B && V === 35)
        do
          V = n.input.charCodeAt(++n.position);
        while (V !== 10 && V !== 13 && V !== 0);
      if (A(V))
        for (ve(n), V = n.input.charCodeAt(n.position), ie++, n.lineIndent = 0; V === 32; )
          n.lineIndent++, V = n.input.charCodeAt(++n.position);
      else
        break;
    }
    return W !== -1 && ie !== 0 && n.lineIndent < W && G(n, "deficient indentation"), ie;
  }
  function Q(n) {
    var B = n.position, W;
    return W = n.input.charCodeAt(B), !!((W === 45 || W === 46) && W === n.input.charCodeAt(B + 1) && W === n.input.charCodeAt(B + 2) && (B += 3, W = n.input.charCodeAt(B), W === 0 || N(W)));
  }
  function ce(n, B) {
    B === 1 ? n.result += " " : B > 1 && (n.result += i.repeat(`
`, B - 1));
  }
  function Ee(n, B, W) {
    var ie, V, ne, te, se, ue, Pe, Oe, he = n.kind, R = n.result, j;
    if (j = n.input.charCodeAt(n.position), N(j) || C(j) || j === 35 || j === 38 || j === 42 || j === 33 || j === 124 || j === 62 || j === 39 || j === 34 || j === 37 || j === 64 || j === 96 || (j === 63 || j === 45) && (V = n.input.charCodeAt(n.position + 1), N(V) || W && C(V)))
      return !1;
    for (n.kind = "scalar", n.result = "", ne = te = n.position, se = !1; j !== 0; ) {
      if (j === 58) {
        if (V = n.input.charCodeAt(n.position + 1), N(V) || W && C(V))
          break;
      } else if (j === 35) {
        if (ie = n.input.charCodeAt(n.position - 1), N(ie))
          break;
      } else {
        if (n.position === n.lineStart && Q(n) || W && C(j))
          break;
        if (A(j))
          if (ue = n.line, Pe = n.lineStart, Oe = n.lineIndent, ge(n, !1, -1), n.lineIndent >= B) {
            se = !0, j = n.input.charCodeAt(n.position);
            continue;
          } else {
            n.position = te, n.line = ue, n.lineStart = Pe, n.lineIndent = Oe;
            break;
          }
      }
      se && (ee(n, ne, te, !1), ce(n, n.line - ue), ne = te = n.position, se = !1), P(j) || (te = n.position + 1), j = n.input.charCodeAt(++n.position);
    }
    return ee(n, ne, te, !1), n.result ? !0 : (n.kind = he, n.result = R, !1);
  }
  function be(n, B) {
    var W, ie, V;
    if (W = n.input.charCodeAt(n.position), W !== 39)
      return !1;
    for (n.kind = "scalar", n.result = "", n.position++, ie = V = n.position; (W = n.input.charCodeAt(n.position)) !== 0; )
      if (W === 39)
        if (ee(n, ie, n.position, !0), W = n.input.charCodeAt(++n.position), W === 39)
          ie = n.position, n.position++, V = n.position;
        else
          return !0;
      else A(W) ? (ee(n, ie, V, !0), ce(n, ge(n, !1, B)), ie = V = n.position) : n.position === n.lineStart && Q(n) ? F(n, "unexpected end of the document within a single quoted scalar") : (n.position++, V = n.position);
    F(n, "unexpected end of the stream within a single quoted scalar");
  }
  function Ne(n, B) {
    var W, ie, V, ne, te, se;
    if (se = n.input.charCodeAt(n.position), se !== 34)
      return !1;
    for (n.kind = "scalar", n.result = "", n.position++, W = ie = n.position; (se = n.input.charCodeAt(n.position)) !== 0; ) {
      if (se === 34)
        return ee(n, W, n.position, !0), n.position++, !0;
      if (se === 92) {
        if (ee(n, W, n.position, !0), se = n.input.charCodeAt(++n.position), A(se))
          ge(n, !1, B);
        else if (se < 256 && k[se])
          n.result += M[se], n.position++;
        else if ((te = b(se)) > 0) {
          for (V = te, ne = 0; V > 0; V--)
            se = n.input.charCodeAt(++n.position), (te = D(se)) >= 0 ? ne = (ne << 4) + te : F(n, "expected hexadecimal character");
          n.result += w(ne), n.position++;
        } else
          F(n, "unknown escape sequence");
        W = ie = n.position;
      } else A(se) ? (ee(n, W, ie, !0), ce(n, ge(n, !1, B)), W = ie = n.position) : n.position === n.lineStart && Q(n) ? F(n, "unexpected end of the document within a double quoted scalar") : (n.position++, ie = n.position);
    }
    F(n, "unexpected end of the stream within a double quoted scalar");
  }
  function Ie(n, B) {
    var W = !0, ie, V, ne, te = n.tag, se, ue = n.anchor, Pe, Oe, he, R, j, z = /* @__PURE__ */ Object.create(null), X, J, ae, re;
    if (re = n.input.charCodeAt(n.position), re === 91)
      Oe = 93, j = !1, se = [];
    else if (re === 123)
      Oe = 125, j = !0, se = {};
    else
      return !1;
    for (n.anchor !== null && (n.anchorMap[n.anchor] = se), re = n.input.charCodeAt(++n.position); re !== 0; ) {
      if (ge(n, !0, B), re = n.input.charCodeAt(n.position), re === Oe)
        return n.position++, n.tag = te, n.anchor = ue, n.kind = j ? "mapping" : "sequence", n.result = se, !0;
      W ? re === 44 && F(n, "expected the node content, but found ','") : F(n, "missed comma between flow collection entries"), J = X = ae = null, he = R = !1, re === 63 && (Pe = n.input.charCodeAt(n.position + 1), N(Pe) && (he = R = !0, n.position++, ge(n, !0, B))), ie = n.line, V = n.lineStart, ne = n.position, Ce(n, B, c, !1, !0), J = n.tag, X = n.result, ge(n, !0, B), re = n.input.charCodeAt(n.position), (R || n.line === ie) && re === 58 && (he = !0, re = n.input.charCodeAt(++n.position), ge(n, !0, B), Ce(n, B, c, !1, !0), ae = n.result), j ? Z(n, se, z, J, X, ae, ie, V, ne) : he ? se.push(Z(n, null, z, J, X, ae, ie, V, ne)) : se.push(X), ge(n, !0, B), re = n.input.charCodeAt(n.position), re === 44 ? (W = !0, re = n.input.charCodeAt(++n.position)) : W = !1;
    }
    F(n, "unexpected end of the stream within a flow collection");
  }
  function Te(n, B) {
    var W, ie, V = o, ne = !1, te = !1, se = B, ue = 0, Pe = !1, Oe, he;
    if (he = n.input.charCodeAt(n.position), he === 124)
      ie = !1;
    else if (he === 62)
      ie = !0;
    else
      return !1;
    for (n.kind = "scalar", n.result = ""; he !== 0; )
      if (he = n.input.charCodeAt(++n.position), he === 43 || he === 45)
        o === V ? V = he === 43 ? t : s : F(n, "repeat of a chomping mode identifier");
      else if ((Oe = S(he)) >= 0)
        Oe === 0 ? F(n, "bad explicit indentation width of a block scalar; it cannot be less than one") : te ? F(n, "repeat of an indentation width identifier") : (se = B + Oe - 1, te = !0);
      else
        break;
    if (P(he)) {
      do
        he = n.input.charCodeAt(++n.position);
      while (P(he));
      if (he === 35)
        do
          he = n.input.charCodeAt(++n.position);
        while (!A(he) && he !== 0);
    }
    for (; he !== 0; ) {
      for (ve(n), n.lineIndent = 0, he = n.input.charCodeAt(n.position); (!te || n.lineIndent < se) && he === 32; )
        n.lineIndent++, he = n.input.charCodeAt(++n.position);
      if (!te && n.lineIndent > se && (se = n.lineIndent), A(he)) {
        ue++;
        continue;
      }
      if (n.lineIndent < se) {
        V === t ? n.result += i.repeat(`
`, ne ? 1 + ue : ue) : V === o && ne && (n.result += `
`);
        break;
      }
      for (ie ? P(he) ? (Pe = !0, n.result += i.repeat(`
`, ne ? 1 + ue : ue)) : Pe ? (Pe = !1, n.result += i.repeat(`
`, ue + 1)) : ue === 0 ? ne && (n.result += " ") : n.result += i.repeat(`
`, ue) : n.result += i.repeat(`
`, ne ? 1 + ue : ue), ne = !0, te = !0, ue = 0, W = n.position; !A(he) && he !== 0; )
        he = n.input.charCodeAt(++n.position);
      ee(n, W, n.position, !1);
    }
    return !0;
  }
  function E(n, B) {
    var W, ie = n.tag, V = n.anchor, ne = [], te, se = !1, ue;
    if (n.firstTabInLine !== -1) return !1;
    for (n.anchor !== null && (n.anchorMap[n.anchor] = ne), ue = n.input.charCodeAt(n.position); ue !== 0 && (n.firstTabInLine !== -1 && (n.position = n.firstTabInLine, F(n, "tab characters must not be used in indentation")), !(ue !== 45 || (te = n.input.charCodeAt(n.position + 1), !N(te)))); ) {
      if (se = !0, n.position++, ge(n, !0, -1) && n.lineIndent <= B) {
        ne.push(null), ue = n.input.charCodeAt(n.position);
        continue;
      }
      if (W = n.line, Ce(n, B, f, !1, !0), ne.push(n.result), ge(n, !0, -1), ue = n.input.charCodeAt(n.position), (n.line === W || n.lineIndent > B) && ue !== 0)
        F(n, "bad indentation of a sequence entry");
      else if (n.lineIndent < B)
        break;
    }
    return se ? (n.tag = ie, n.anchor = V, n.kind = "sequence", n.result = ne, !0) : !1;
  }
  function g(n, B, W) {
    var ie, V, ne, te, se, ue, Pe = n.tag, Oe = n.anchor, he = {}, R = /* @__PURE__ */ Object.create(null), j = null, z = null, X = null, J = !1, ae = !1, re;
    if (n.firstTabInLine !== -1) return !1;
    for (n.anchor !== null && (n.anchorMap[n.anchor] = he), re = n.input.charCodeAt(n.position); re !== 0; ) {
      if (!J && n.firstTabInLine !== -1 && (n.position = n.firstTabInLine, F(n, "tab characters must not be used in indentation")), ie = n.input.charCodeAt(n.position + 1), ne = n.line, (re === 63 || re === 58) && N(ie))
        re === 63 ? (J && (Z(n, he, R, j, z, null, te, se, ue), j = z = X = null), ae = !0, J = !0, V = !0) : J ? (J = !1, V = !0) : F(n, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), n.position += 1, re = ie;
      else {
        if (te = n.line, se = n.lineStart, ue = n.position, !Ce(n, W, r, !1, !0))
          break;
        if (n.line === ne) {
          for (re = n.input.charCodeAt(n.position); P(re); )
            re = n.input.charCodeAt(++n.position);
          if (re === 58)
            re = n.input.charCodeAt(++n.position), N(re) || F(n, "a whitespace character is expected after the key-value separator within a block mapping"), J && (Z(n, he, R, j, z, null, te, se, ue), j = z = X = null), ae = !0, J = !1, V = !1, j = n.tag, z = n.result;
          else if (ae)
            F(n, "can not read an implicit mapping pair; a colon is missed");
          else
            return n.tag = Pe, n.anchor = Oe, !0;
        } else if (ae)
          F(n, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return n.tag = Pe, n.anchor = Oe, !0;
      }
      if ((n.line === ne || n.lineIndent > B) && (J && (te = n.line, se = n.lineStart, ue = n.position), Ce(n, B, a, !0, V) && (J ? z = n.result : X = n.result), J || (Z(n, he, R, j, z, X, te, se, ue), j = z = X = null), ge(n, !0, -1), re = n.input.charCodeAt(n.position)), (n.line === ne || n.lineIndent > B) && re !== 0)
        F(n, "bad indentation of a mapping entry");
      else if (n.lineIndent < B)
        break;
    }
    return J && Z(n, he, R, j, z, null, te, se, ue), ae && (n.tag = Pe, n.anchor = Oe, n.kind = "mapping", n.result = he), ae;
  }
  function q(n) {
    var B, W = !1, ie = !1, V, ne, te;
    if (te = n.input.charCodeAt(n.position), te !== 33) return !1;
    if (n.tag !== null && F(n, "duplication of a tag property"), te = n.input.charCodeAt(++n.position), te === 60 ? (W = !0, te = n.input.charCodeAt(++n.position)) : te === 33 ? (ie = !0, V = "!!", te = n.input.charCodeAt(++n.position)) : V = "!", B = n.position, W) {
      do
        te = n.input.charCodeAt(++n.position);
      while (te !== 0 && te !== 62);
      n.position < n.length ? (ne = n.input.slice(B, n.position), te = n.input.charCodeAt(++n.position)) : F(n, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; te !== 0 && !N(te); )
        te === 33 && (ie ? F(n, "tag suffix cannot contain exclamation marks") : (V = n.input.slice(B - 1, n.position + 1), v.test(V) || F(n, "named tag handle cannot contain such characters"), ie = !0, B = n.position + 1)), te = n.input.charCodeAt(++n.position);
      ne = n.input.slice(B, n.position), y.test(ne) && F(n, "tag suffix cannot contain flow indicator characters");
    }
    ne && !m.test(ne) && F(n, "tag name cannot contain such characters: " + ne);
    try {
      ne = decodeURIComponent(ne);
    } catch {
      F(n, "tag name is malformed: " + ne);
    }
    return W ? n.tag = ne : u.call(n.tagMap, V) ? n.tag = n.tagMap[V] + ne : V === "!" ? n.tag = "!" + ne : V === "!!" ? n.tag = "tag:yaml.org,2002:" + ne : F(n, 'undeclared tag handle "' + V + '"'), !0;
  }
  function I(n) {
    var B, W;
    if (W = n.input.charCodeAt(n.position), W !== 38) return !1;
    for (n.anchor !== null && F(n, "duplication of an anchor property"), W = n.input.charCodeAt(++n.position), B = n.position; W !== 0 && !N(W) && !C(W); )
      W = n.input.charCodeAt(++n.position);
    return n.position === B && F(n, "name of an anchor node must contain at least one character"), n.anchor = n.input.slice(B, n.position), !0;
  }
  function Ae(n) {
    var B, W, ie;
    if (ie = n.input.charCodeAt(n.position), ie !== 42) return !1;
    for (ie = n.input.charCodeAt(++n.position), B = n.position; ie !== 0 && !N(ie) && !C(ie); )
      ie = n.input.charCodeAt(++n.position);
    return n.position === B && F(n, "name of an alias node must contain at least one character"), W = n.input.slice(B, n.position), u.call(n.anchorMap, W) || F(n, 'unidentified alias "' + W + '"'), n.result = n.anchorMap[W], ge(n, !0, -1), !0;
  }
  function Ce(n, B, W, ie, V) {
    var ne, te, se, ue = 1, Pe = !1, Oe = !1, he, R, j, z, X, J;
    if (n.listener !== null && n.listener("open", n), n.tag = null, n.anchor = null, n.kind = null, n.result = null, ne = te = se = a === W || f === W, ie && ge(n, !0, -1) && (Pe = !0, n.lineIndent > B ? ue = 1 : n.lineIndent === B ? ue = 0 : n.lineIndent < B && (ue = -1)), ue === 1)
      for (; q(n) || I(n); )
        ge(n, !0, -1) ? (Pe = !0, se = ne, n.lineIndent > B ? ue = 1 : n.lineIndent === B ? ue = 0 : n.lineIndent < B && (ue = -1)) : se = !1;
    if (se && (se = Pe || V), (ue === 1 || a === W) && (c === W || r === W ? X = B : X = B + 1, J = n.position - n.lineStart, ue === 1 ? se && (E(n, J) || g(n, J, X)) || Ie(n, X) ? Oe = !0 : (te && Te(n, X) || be(n, X) || Ne(n, X) ? Oe = !0 : Ae(n) ? (Oe = !0, (n.tag !== null || n.anchor !== null) && F(n, "alias node should not have any properties")) : Ee(n, X, c === W) && (Oe = !0, n.tag === null && (n.tag = "?")), n.anchor !== null && (n.anchorMap[n.anchor] = n.result)) : ue === 0 && (Oe = se && E(n, J))), n.tag === null)
      n.anchor !== null && (n.anchorMap[n.anchor] = n.result);
    else if (n.tag === "?") {
      for (n.result !== null && n.kind !== "scalar" && F(n, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + n.kind + '"'), he = 0, R = n.implicitTypes.length; he < R; he += 1)
        if (z = n.implicitTypes[he], z.resolve(n.result)) {
          n.result = z.construct(n.result), n.tag = z.tag, n.anchor !== null && (n.anchorMap[n.anchor] = n.result);
          break;
        }
    } else if (n.tag !== "!") {
      if (u.call(n.typeMap[n.kind || "fallback"], n.tag))
        z = n.typeMap[n.kind || "fallback"][n.tag];
      else
        for (z = null, j = n.typeMap.multi[n.kind || "fallback"], he = 0, R = j.length; he < R; he += 1)
          if (n.tag.slice(0, j[he].tag.length) === j[he].tag) {
            z = j[he];
            break;
          }
      z || F(n, "unknown tag !<" + n.tag + ">"), n.result !== null && z.kind !== n.kind && F(n, "unacceptable node kind for !<" + n.tag + '> tag; it should be "' + z.kind + '", not "' + n.kind + '"'), z.resolve(n.result, n.tag) ? (n.result = z.construct(n.result, n.tag), n.anchor !== null && (n.anchorMap[n.anchor] = n.result)) : F(n, "cannot resolve a node with !<" + n.tag + "> explicit tag");
    }
    return n.listener !== null && n.listener("close", n), n.tag !== null || n.anchor !== null || Oe;
  }
  function xe(n) {
    var B = n.position, W, ie, V, ne = !1, te;
    for (n.version = null, n.checkLineBreaks = n.legacy, n.tagMap = /* @__PURE__ */ Object.create(null), n.anchorMap = /* @__PURE__ */ Object.create(null); (te = n.input.charCodeAt(n.position)) !== 0 && (ge(n, !0, -1), te = n.input.charCodeAt(n.position), !(n.lineIndent > 0 || te !== 37)); ) {
      for (ne = !0, te = n.input.charCodeAt(++n.position), W = n.position; te !== 0 && !N(te); )
        te = n.input.charCodeAt(++n.position);
      for (ie = n.input.slice(W, n.position), V = [], ie.length < 1 && F(n, "directive name must not be less than one character in length"); te !== 0; ) {
        for (; P(te); )
          te = n.input.charCodeAt(++n.position);
        if (te === 35) {
          do
            te = n.input.charCodeAt(++n.position);
          while (te !== 0 && !A(te));
          break;
        }
        if (A(te)) break;
        for (W = n.position; te !== 0 && !N(te); )
          te = n.input.charCodeAt(++n.position);
        V.push(n.input.slice(W, n.position));
      }
      te !== 0 && ve(n), u.call(Y, ie) ? Y[ie](n, ie, V) : G(n, 'unknown document directive "' + ie + '"');
    }
    if (ge(n, !0, -1), n.lineIndent === 0 && n.input.charCodeAt(n.position) === 45 && n.input.charCodeAt(n.position + 1) === 45 && n.input.charCodeAt(n.position + 2) === 45 ? (n.position += 3, ge(n, !0, -1)) : ne && F(n, "directives end mark is expected"), Ce(n, n.lineIndent - 1, a, !1, !0), ge(n, !0, -1), n.checkLineBreaks && p.test(n.input.slice(B, n.position)) && G(n, "non-ASCII line breaks are interpreted as content"), n.documents.push(n.result), n.position === n.lineStart && Q(n)) {
      n.input.charCodeAt(n.position) === 46 && (n.position += 3, ge(n, !0, -1));
      return;
    }
    if (n.position < n.length - 1)
      F(n, "end of the stream or a document separator is expected");
    else
      return;
  }
  function Me(n, B) {
    n = String(n), B = B || {}, n.length !== 0 && (n.charCodeAt(n.length - 1) !== 10 && n.charCodeAt(n.length - 1) !== 13 && (n += `
`), n.charCodeAt(0) === 65279 && (n = n.slice(1)));
    var W = new x(n, B), ie = n.indexOf("\0");
    for (ie !== -1 && (W.position = ie, F(W, "null byte is not allowed in input")), W.input += "\0"; W.input.charCodeAt(W.position) === 32; )
      W.lineIndent += 1, W.position += 1;
    for (; W.position < W.length - 1; )
      xe(W);
    return W.documents;
  }
  function Be(n, B, W) {
    B !== null && typeof B == "object" && typeof W > "u" && (W = B, B = null);
    var ie = Me(n, W);
    if (typeof B != "function")
      return ie;
    for (var V = 0, ne = ie.length; V < ne; V += 1)
      B(ie[V]);
  }
  function Ve(n, B) {
    var W = Me(n, B);
    if (W.length !== 0) {
      if (W.length === 1)
        return W[0];
      throw new h("expected a single document in the stream, but found more");
    }
  }
  return Yr.loadAll = Be, Yr.load = Ve, Yr;
}
var vi = {}, po;
function Cf() {
  if (po) return vi;
  po = 1;
  var i = Or(), h = Dr(), d = Ea(), l = Object.prototype.toString, u = Object.prototype.hasOwnProperty, c = 65279, r = 9, f = 10, a = 13, o = 32, s = 33, t = 34, e = 35, p = 37, y = 38, v = 39, m = 42, _ = 44, A = 45, P = 58, N = 61, C = 62, D = 63, b = 64, S = 91, O = 93, w = 96, $ = 123, k = 124, M = 125, L = {};
  L[0] = "\\0", L[7] = "\\a", L[8] = "\\b", L[9] = "\\t", L[10] = "\\n", L[11] = "\\v", L[12] = "\\f", L[13] = "\\r", L[27] = "\\e", L[34] = '\\"', L[92] = "\\\\", L[133] = "\\N", L[160] = "\\_", L[8232] = "\\L", L[8233] = "\\P";
  var x = [
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
  function F(R, j) {
    var z, X, J, ae, re, oe, de;
    if (j === null) return {};
    for (z = {}, X = Object.keys(j), J = 0, ae = X.length; J < ae; J += 1)
      re = X[J], oe = String(j[re]), re.slice(0, 2) === "!!" && (re = "tag:yaml.org,2002:" + re.slice(2)), de = R.compiledTypeMap.fallback[re], de && u.call(de.styleAliases, oe) && (oe = de.styleAliases[oe]), z[re] = oe;
    return z;
  }
  function G(R) {
    var j, z, X;
    if (j = R.toString(16).toUpperCase(), R <= 255)
      z = "x", X = 2;
    else if (R <= 65535)
      z = "u", X = 4;
    else if (R <= 4294967295)
      z = "U", X = 8;
    else
      throw new h("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + z + i.repeat("0", X - j.length) + j;
  }
  var Y = 1, ee = 2;
  function me(R) {
    this.schema = R.schema || d, this.indent = Math.max(1, R.indent || 2), this.noArrayIndent = R.noArrayIndent || !1, this.skipInvalid = R.skipInvalid || !1, this.flowLevel = i.isNothing(R.flowLevel) ? -1 : R.flowLevel, this.styleMap = F(this.schema, R.styles || null), this.sortKeys = R.sortKeys || !1, this.lineWidth = R.lineWidth || 80, this.noRefs = R.noRefs || !1, this.noCompatMode = R.noCompatMode || !1, this.condenseFlow = R.condenseFlow || !1, this.quotingType = R.quotingType === '"' ? ee : Y, this.forceQuotes = R.forceQuotes || !1, this.replacer = typeof R.replacer == "function" ? R.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function Z(R, j) {
    for (var z = i.repeat(" ", j), X = 0, J = -1, ae = "", re, oe = R.length; X < oe; )
      J = R.indexOf(`
`, X), J === -1 ? (re = R.slice(X), X = oe) : (re = R.slice(X, J + 1), X = J + 1), re.length && re !== `
` && (ae += z), ae += re;
    return ae;
  }
  function ve(R, j) {
    return `
` + i.repeat(" ", R.indent * j);
  }
  function ge(R, j) {
    var z, X, J;
    for (z = 0, X = R.implicitTypes.length; z < X; z += 1)
      if (J = R.implicitTypes[z], J.resolve(j))
        return !0;
    return !1;
  }
  function Q(R) {
    return R === o || R === r;
  }
  function ce(R) {
    return 32 <= R && R <= 126 || 161 <= R && R <= 55295 && R !== 8232 && R !== 8233 || 57344 <= R && R <= 65533 && R !== c || 65536 <= R && R <= 1114111;
  }
  function Ee(R) {
    return ce(R) && R !== c && R !== a && R !== f;
  }
  function be(R, j, z) {
    var X = Ee(R), J = X && !Q(R);
    return (
      // ns-plain-safe
      (z ? (
        // c = flow-in
        X
      ) : X && R !== _ && R !== S && R !== O && R !== $ && R !== M) && R !== e && !(j === P && !J) || Ee(j) && !Q(j) && R === e || j === P && J
    );
  }
  function Ne(R) {
    return ce(R) && R !== c && !Q(R) && R !== A && R !== D && R !== P && R !== _ && R !== S && R !== O && R !== $ && R !== M && R !== e && R !== y && R !== m && R !== s && R !== k && R !== N && R !== C && R !== v && R !== t && R !== p && R !== b && R !== w;
  }
  function Ie(R) {
    return !Q(R) && R !== P;
  }
  function Te(R, j) {
    var z = R.charCodeAt(j), X;
    return z >= 55296 && z <= 56319 && j + 1 < R.length && (X = R.charCodeAt(j + 1), X >= 56320 && X <= 57343) ? (z - 55296) * 1024 + X - 56320 + 65536 : z;
  }
  function E(R) {
    var j = /^\n* /;
    return j.test(R);
  }
  var g = 1, q = 2, I = 3, Ae = 4, Ce = 5;
  function xe(R, j, z, X, J, ae, re, oe) {
    var de, ye = 0, Fe = null, $e = !1, De = !1, Mt = X !== -1, it = -1, Tt = Ne(Te(R, 0)) && Ie(Te(R, R.length - 1));
    if (j || re)
      for (de = 0; de < R.length; ye >= 65536 ? de += 2 : de++) {
        if (ye = Te(R, de), !ce(ye))
          return Ce;
        Tt = Tt && be(ye, Fe, oe), Fe = ye;
      }
    else {
      for (de = 0; de < R.length; ye >= 65536 ? de += 2 : de++) {
        if (ye = Te(R, de), ye === f)
          $e = !0, Mt && (De = De || // Foldable line = too long, and not more-indented.
          de - it - 1 > X && R[it + 1] !== " ", it = de);
        else if (!ce(ye))
          return Ce;
        Tt = Tt && be(ye, Fe, oe), Fe = ye;
      }
      De = De || Mt && de - it - 1 > X && R[it + 1] !== " ";
    }
    return !$e && !De ? Tt && !re && !J(R) ? g : ae === ee ? Ce : q : z > 9 && E(R) ? Ce : re ? ae === ee ? Ce : q : De ? Ae : I;
  }
  function Me(R, j, z, X, J) {
    R.dump = (function() {
      if (j.length === 0)
        return R.quotingType === ee ? '""' : "''";
      if (!R.noCompatMode && (x.indexOf(j) !== -1 || H.test(j)))
        return R.quotingType === ee ? '"' + j + '"' : "'" + j + "'";
      var ae = R.indent * Math.max(1, z), re = R.lineWidth === -1 ? -1 : Math.max(Math.min(R.lineWidth, 40), R.lineWidth - ae), oe = X || R.flowLevel > -1 && z >= R.flowLevel;
      function de(ye) {
        return ge(R, ye);
      }
      switch (xe(
        j,
        oe,
        R.indent,
        re,
        de,
        R.quotingType,
        R.forceQuotes && !X,
        J
      )) {
        case g:
          return j;
        case q:
          return "'" + j.replace(/'/g, "''") + "'";
        case I:
          return "|" + Be(j, R.indent) + Ve(Z(j, ae));
        case Ae:
          return ">" + Be(j, R.indent) + Ve(Z(n(j, re), ae));
        case Ce:
          return '"' + W(j) + '"';
        default:
          throw new h("impossible error: invalid scalar style");
      }
    })();
  }
  function Be(R, j) {
    var z = E(R) ? String(j) : "", X = R[R.length - 1] === `
`, J = X && (R[R.length - 2] === `
` || R === `
`), ae = J ? "+" : X ? "" : "-";
    return z + ae + `
`;
  }
  function Ve(R) {
    return R[R.length - 1] === `
` ? R.slice(0, -1) : R;
  }
  function n(R, j) {
    for (var z = /(\n+)([^\n]*)/g, X = (function() {
      var ye = R.indexOf(`
`);
      return ye = ye !== -1 ? ye : R.length, z.lastIndex = ye, B(R.slice(0, ye), j);
    })(), J = R[0] === `
` || R[0] === " ", ae, re; re = z.exec(R); ) {
      var oe = re[1], de = re[2];
      ae = de[0] === " ", X += oe + (!J && !ae && de !== "" ? `
` : "") + B(de, j), J = ae;
    }
    return X;
  }
  function B(R, j) {
    if (R === "" || R[0] === " ") return R;
    for (var z = / [^ ]/g, X, J = 0, ae, re = 0, oe = 0, de = ""; X = z.exec(R); )
      oe = X.index, oe - J > j && (ae = re > J ? re : oe, de += `
` + R.slice(J, ae), J = ae + 1), re = oe;
    return de += `
`, R.length - J > j && re > J ? de += R.slice(J, re) + `
` + R.slice(re + 1) : de += R.slice(J), de.slice(1);
  }
  function W(R) {
    for (var j = "", z = 0, X, J = 0; J < R.length; z >= 65536 ? J += 2 : J++)
      z = Te(R, J), X = L[z], !X && ce(z) ? (j += R[J], z >= 65536 && (j += R[J + 1])) : j += X || G(z);
    return j;
  }
  function ie(R, j, z) {
    var X = "", J = R.tag, ae, re, oe;
    for (ae = 0, re = z.length; ae < re; ae += 1)
      oe = z[ae], R.replacer && (oe = R.replacer.call(z, String(ae), oe)), (ue(R, j, oe, !1, !1) || typeof oe > "u" && ue(R, j, null, !1, !1)) && (X !== "" && (X += "," + (R.condenseFlow ? "" : " ")), X += R.dump);
    R.tag = J, R.dump = "[" + X + "]";
  }
  function V(R, j, z, X) {
    var J = "", ae = R.tag, re, oe, de;
    for (re = 0, oe = z.length; re < oe; re += 1)
      de = z[re], R.replacer && (de = R.replacer.call(z, String(re), de)), (ue(R, j + 1, de, !0, !0, !1, !0) || typeof de > "u" && ue(R, j + 1, null, !0, !0, !1, !0)) && ((!X || J !== "") && (J += ve(R, j)), R.dump && f === R.dump.charCodeAt(0) ? J += "-" : J += "- ", J += R.dump);
    R.tag = ae, R.dump = J || "[]";
  }
  function ne(R, j, z) {
    var X = "", J = R.tag, ae = Object.keys(z), re, oe, de, ye, Fe;
    for (re = 0, oe = ae.length; re < oe; re += 1)
      Fe = "", X !== "" && (Fe += ", "), R.condenseFlow && (Fe += '"'), de = ae[re], ye = z[de], R.replacer && (ye = R.replacer.call(z, de, ye)), ue(R, j, de, !1, !1) && (R.dump.length > 1024 && (Fe += "? "), Fe += R.dump + (R.condenseFlow ? '"' : "") + ":" + (R.condenseFlow ? "" : " "), ue(R, j, ye, !1, !1) && (Fe += R.dump, X += Fe));
    R.tag = J, R.dump = "{" + X + "}";
  }
  function te(R, j, z, X) {
    var J = "", ae = R.tag, re = Object.keys(z), oe, de, ye, Fe, $e, De;
    if (R.sortKeys === !0)
      re.sort();
    else if (typeof R.sortKeys == "function")
      re.sort(R.sortKeys);
    else if (R.sortKeys)
      throw new h("sortKeys must be a boolean or a function");
    for (oe = 0, de = re.length; oe < de; oe += 1)
      De = "", (!X || J !== "") && (De += ve(R, j)), ye = re[oe], Fe = z[ye], R.replacer && (Fe = R.replacer.call(z, ye, Fe)), ue(R, j + 1, ye, !0, !0, !0) && ($e = R.tag !== null && R.tag !== "?" || R.dump && R.dump.length > 1024, $e && (R.dump && f === R.dump.charCodeAt(0) ? De += "?" : De += "? "), De += R.dump, $e && (De += ve(R, j)), ue(R, j + 1, Fe, !0, $e) && (R.dump && f === R.dump.charCodeAt(0) ? De += ":" : De += ": ", De += R.dump, J += De));
    R.tag = ae, R.dump = J || "{}";
  }
  function se(R, j, z) {
    var X, J, ae, re, oe, de;
    for (J = z ? R.explicitTypes : R.implicitTypes, ae = 0, re = J.length; ae < re; ae += 1)
      if (oe = J[ae], (oe.instanceOf || oe.predicate) && (!oe.instanceOf || typeof j == "object" && j instanceof oe.instanceOf) && (!oe.predicate || oe.predicate(j))) {
        if (z ? oe.multi && oe.representName ? R.tag = oe.representName(j) : R.tag = oe.tag : R.tag = "?", oe.represent) {
          if (de = R.styleMap[oe.tag] || oe.defaultStyle, l.call(oe.represent) === "[object Function]")
            X = oe.represent(j, de);
          else if (u.call(oe.represent, de))
            X = oe.represent[de](j, de);
          else
            throw new h("!<" + oe.tag + '> tag resolver accepts not "' + de + '" style');
          R.dump = X;
        }
        return !0;
      }
    return !1;
  }
  function ue(R, j, z, X, J, ae, re) {
    R.tag = null, R.dump = z, se(R, z, !1) || se(R, z, !0);
    var oe = l.call(R.dump), de = X, ye;
    X && (X = R.flowLevel < 0 || R.flowLevel > j);
    var Fe = oe === "[object Object]" || oe === "[object Array]", $e, De;
    if (Fe && ($e = R.duplicates.indexOf(z), De = $e !== -1), (R.tag !== null && R.tag !== "?" || De || R.indent !== 2 && j > 0) && (J = !1), De && R.usedDuplicates[$e])
      R.dump = "*ref_" + $e;
    else {
      if (Fe && De && !R.usedDuplicates[$e] && (R.usedDuplicates[$e] = !0), oe === "[object Object]")
        X && Object.keys(R.dump).length !== 0 ? (te(R, j, R.dump, J), De && (R.dump = "&ref_" + $e + R.dump)) : (ne(R, j, R.dump), De && (R.dump = "&ref_" + $e + " " + R.dump));
      else if (oe === "[object Array]")
        X && R.dump.length !== 0 ? (R.noArrayIndent && !re && j > 0 ? V(R, j - 1, R.dump, J) : V(R, j, R.dump, J), De && (R.dump = "&ref_" + $e + R.dump)) : (ie(R, j, R.dump), De && (R.dump = "&ref_" + $e + " " + R.dump));
      else if (oe === "[object String]")
        R.tag !== "?" && Me(R, R.dump, j, ae, de);
      else {
        if (oe === "[object Undefined]")
          return !1;
        if (R.skipInvalid) return !1;
        throw new h("unacceptable kind of an object to dump " + oe);
      }
      R.tag !== null && R.tag !== "?" && (ye = encodeURI(
        R.tag[0] === "!" ? R.tag.slice(1) : R.tag
      ).replace(/!/g, "%21"), R.tag[0] === "!" ? ye = "!" + ye : ye.slice(0, 18) === "tag:yaml.org,2002:" ? ye = "!!" + ye.slice(18) : ye = "!<" + ye + ">", R.dump = ye + " " + R.dump);
    }
    return !0;
  }
  function Pe(R, j) {
    var z = [], X = [], J, ae;
    for (Oe(R, z, X), J = 0, ae = X.length; J < ae; J += 1)
      j.duplicates.push(z[X[J]]);
    j.usedDuplicates = new Array(ae);
  }
  function Oe(R, j, z) {
    var X, J, ae;
    if (R !== null && typeof R == "object")
      if (J = j.indexOf(R), J !== -1)
        z.indexOf(J) === -1 && z.push(J);
      else if (j.push(R), Array.isArray(R))
        for (J = 0, ae = R.length; J < ae; J += 1)
          Oe(R[J], j, z);
      else
        for (X = Object.keys(R), J = 0, ae = X.length; J < ae; J += 1)
          Oe(R[X[J]], j, z);
  }
  function he(R, j) {
    j = j || {};
    var z = new me(j);
    z.noRefs || Pe(R, z);
    var X = R;
    return z.replacer && (X = z.replacer.call({ "": X }, "", X)), ue(z, 0, X, !0, !0) ? z.dump + `
` : "";
  }
  return vi.dump = he, vi;
}
var mo;
function wa() {
  if (mo) return Xe;
  mo = 1;
  var i = Af(), h = Cf();
  function d(l, u) {
    return function() {
      throw new Error("Function yaml." + l + " is removed in js-yaml 4. Use yaml." + u + " instead, which is now safe by default.");
    };
  }
  return Xe.Type = Je(), Xe.Schema = iu(), Xe.FAILSAFE_SCHEMA = lu(), Xe.JSON_SCHEMA = hu(), Xe.CORE_SCHEMA = pu(), Xe.DEFAULT_SCHEMA = Ea(), Xe.load = i.load, Xe.loadAll = i.loadAll, Xe.dump = h.dump, Xe.YAMLException = Dr(), Xe.types = {
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
  }, Xe.safeLoad = d("safeLoad", "load"), Xe.safeLoadAll = d("safeLoadAll", "loadAll"), Xe.safeDump = d("safeDump", "dump"), Xe;
}
var ar = {}, go;
function Tf() {
  if (go) return ar;
  go = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.Lazy = void 0;
  class i {
    constructor(d) {
      this._value = null, this.creator = d;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const d = this.creator();
      return this.value = d, d;
    }
    set value(d) {
      this._value = d, this.creator = null;
    }
  }
  return ar.Lazy = i, ar;
}
var zr = { exports: {} }, Ei, yo;
function rn() {
  if (yo) return Ei;
  yo = 1;
  const i = "2.0.0", h = 256, d = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, l = 16, u = h - 6;
  return Ei = {
    MAX_LENGTH: h,
    MAX_SAFE_COMPONENT_LENGTH: l,
    MAX_SAFE_BUILD_LENGTH: u,
    MAX_SAFE_INTEGER: d,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: i,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, Ei;
}
var wi, vo;
function nn() {
  return vo || (vo = 1, wi = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...h) => console.error("SEMVER", ...h) : () => {
  }), wi;
}
var Eo;
function Ir() {
  return Eo || (Eo = 1, (function(i, h) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: d,
      MAX_SAFE_BUILD_LENGTH: l,
      MAX_LENGTH: u
    } = rn(), c = nn();
    h = i.exports = {};
    const r = h.re = [], f = h.safeRe = [], a = h.src = [], o = h.safeSrc = [], s = h.t = {};
    let t = 0;
    const e = "[a-zA-Z0-9-]", p = [
      ["\\s", 1],
      ["\\d", u],
      [e, l]
    ], y = (m) => {
      for (const [_, A] of p)
        m = m.split(`${_}*`).join(`${_}{0,${A}}`).split(`${_}+`).join(`${_}{1,${A}}`);
      return m;
    }, v = (m, _, A) => {
      const P = y(_), N = t++;
      c(m, N, _), s[m] = N, a[N] = _, o[N] = P, r[N] = new RegExp(_, A ? "g" : void 0), f[N] = new RegExp(P, A ? "g" : void 0);
    };
    v("NUMERICIDENTIFIER", "0|[1-9]\\d*"), v("NUMERICIDENTIFIERLOOSE", "\\d+"), v("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${e}*`), v("MAINVERSION", `(${a[s.NUMERICIDENTIFIER]})\\.(${a[s.NUMERICIDENTIFIER]})\\.(${a[s.NUMERICIDENTIFIER]})`), v("MAINVERSIONLOOSE", `(${a[s.NUMERICIDENTIFIERLOOSE]})\\.(${a[s.NUMERICIDENTIFIERLOOSE]})\\.(${a[s.NUMERICIDENTIFIERLOOSE]})`), v("PRERELEASEIDENTIFIER", `(?:${a[s.NONNUMERICIDENTIFIER]}|${a[s.NUMERICIDENTIFIER]})`), v("PRERELEASEIDENTIFIERLOOSE", `(?:${a[s.NONNUMERICIDENTIFIER]}|${a[s.NUMERICIDENTIFIERLOOSE]})`), v("PRERELEASE", `(?:-(${a[s.PRERELEASEIDENTIFIER]}(?:\\.${a[s.PRERELEASEIDENTIFIER]})*))`), v("PRERELEASELOOSE", `(?:-?(${a[s.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${a[s.PRERELEASEIDENTIFIERLOOSE]})*))`), v("BUILDIDENTIFIER", `${e}+`), v("BUILD", `(?:\\+(${a[s.BUILDIDENTIFIER]}(?:\\.${a[s.BUILDIDENTIFIER]})*))`), v("FULLPLAIN", `v?${a[s.MAINVERSION]}${a[s.PRERELEASE]}?${a[s.BUILD]}?`), v("FULL", `^${a[s.FULLPLAIN]}$`), v("LOOSEPLAIN", `[v=\\s]*${a[s.MAINVERSIONLOOSE]}${a[s.PRERELEASELOOSE]}?${a[s.BUILD]}?`), v("LOOSE", `^${a[s.LOOSEPLAIN]}$`), v("GTLT", "((?:<|>)?=?)"), v("XRANGEIDENTIFIERLOOSE", `${a[s.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), v("XRANGEIDENTIFIER", `${a[s.NUMERICIDENTIFIER]}|x|X|\\*`), v("XRANGEPLAIN", `[v=\\s]*(${a[s.XRANGEIDENTIFIER]})(?:\\.(${a[s.XRANGEIDENTIFIER]})(?:\\.(${a[s.XRANGEIDENTIFIER]})(?:${a[s.PRERELEASE]})?${a[s.BUILD]}?)?)?`), v("XRANGEPLAINLOOSE", `[v=\\s]*(${a[s.XRANGEIDENTIFIERLOOSE]})(?:\\.(${a[s.XRANGEIDENTIFIERLOOSE]})(?:\\.(${a[s.XRANGEIDENTIFIERLOOSE]})(?:${a[s.PRERELEASELOOSE]})?${a[s.BUILD]}?)?)?`), v("XRANGE", `^${a[s.GTLT]}\\s*${a[s.XRANGEPLAIN]}$`), v("XRANGELOOSE", `^${a[s.GTLT]}\\s*${a[s.XRANGEPLAINLOOSE]}$`), v("COERCEPLAIN", `(^|[^\\d])(\\d{1,${d}})(?:\\.(\\d{1,${d}}))?(?:\\.(\\d{1,${d}}))?`), v("COERCE", `${a[s.COERCEPLAIN]}(?:$|[^\\d])`), v("COERCEFULL", a[s.COERCEPLAIN] + `(?:${a[s.PRERELEASE]})?(?:${a[s.BUILD]})?(?:$|[^\\d])`), v("COERCERTL", a[s.COERCE], !0), v("COERCERTLFULL", a[s.COERCEFULL], !0), v("LONETILDE", "(?:~>?)"), v("TILDETRIM", `(\\s*)${a[s.LONETILDE]}\\s+`, !0), h.tildeTrimReplace = "$1~", v("TILDE", `^${a[s.LONETILDE]}${a[s.XRANGEPLAIN]}$`), v("TILDELOOSE", `^${a[s.LONETILDE]}${a[s.XRANGEPLAINLOOSE]}$`), v("LONECARET", "(?:\\^)"), v("CARETTRIM", `(\\s*)${a[s.LONECARET]}\\s+`, !0), h.caretTrimReplace = "$1^", v("CARET", `^${a[s.LONECARET]}${a[s.XRANGEPLAIN]}$`), v("CARETLOOSE", `^${a[s.LONECARET]}${a[s.XRANGEPLAINLOOSE]}$`), v("COMPARATORLOOSE", `^${a[s.GTLT]}\\s*(${a[s.LOOSEPLAIN]})$|^$`), v("COMPARATOR", `^${a[s.GTLT]}\\s*(${a[s.FULLPLAIN]})$|^$`), v("COMPARATORTRIM", `(\\s*)${a[s.GTLT]}\\s*(${a[s.LOOSEPLAIN]}|${a[s.XRANGEPLAIN]})`, !0), h.comparatorTrimReplace = "$1$2$3", v("HYPHENRANGE", `^\\s*(${a[s.XRANGEPLAIN]})\\s+-\\s+(${a[s.XRANGEPLAIN]})\\s*$`), v("HYPHENRANGELOOSE", `^\\s*(${a[s.XRANGEPLAINLOOSE]})\\s+-\\s+(${a[s.XRANGEPLAINLOOSE]})\\s*$`), v("STAR", "(<|>)?=?\\s*\\*"), v("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), v("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(zr, zr.exports)), zr.exports;
}
var _i, wo;
function _a() {
  if (wo) return _i;
  wo = 1;
  const i = Object.freeze({ loose: !0 }), h = Object.freeze({});
  return _i = (l) => l ? typeof l != "object" ? i : l : h, _i;
}
var Si, _o;
function _u() {
  if (_o) return Si;
  _o = 1;
  const i = /^[0-9]+$/, h = (l, u) => {
    if (typeof l == "number" && typeof u == "number")
      return l === u ? 0 : l < u ? -1 : 1;
    const c = i.test(l), r = i.test(u);
    return c && r && (l = +l, u = +u), l === u ? 0 : c && !r ? -1 : r && !c ? 1 : l < u ? -1 : 1;
  };
  return Si = {
    compareIdentifiers: h,
    rcompareIdentifiers: (l, u) => h(u, l)
  }, Si;
}
var Ri, So;
function Ke() {
  if (So) return Ri;
  So = 1;
  const i = nn(), { MAX_LENGTH: h, MAX_SAFE_INTEGER: d } = rn(), { safeRe: l, t: u } = Ir(), c = _a(), { compareIdentifiers: r } = _u();
  class f {
    constructor(o, s) {
      if (s = c(s), o instanceof f) {
        if (o.loose === !!s.loose && o.includePrerelease === !!s.includePrerelease)
          return o;
        o = o.version;
      } else if (typeof o != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof o}".`);
      if (o.length > h)
        throw new TypeError(
          `version is longer than ${h} characters`
        );
      i("SemVer", o, s), this.options = s, this.loose = !!s.loose, this.includePrerelease = !!s.includePrerelease;
      const t = o.trim().match(s.loose ? l[u.LOOSE] : l[u.FULL]);
      if (!t)
        throw new TypeError(`Invalid Version: ${o}`);
      if (this.raw = o, this.major = +t[1], this.minor = +t[2], this.patch = +t[3], this.major > d || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > d || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > d || this.patch < 0)
        throw new TypeError("Invalid patch version");
      t[4] ? this.prerelease = t[4].split(".").map((e) => {
        if (/^[0-9]+$/.test(e)) {
          const p = +e;
          if (p >= 0 && p < d)
            return p;
        }
        return e;
      }) : this.prerelease = [], this.build = t[5] ? t[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(o) {
      if (i("SemVer.compare", this.version, this.options, o), !(o instanceof f)) {
        if (typeof o == "string" && o === this.version)
          return 0;
        o = new f(o, this.options);
      }
      return o.version === this.version ? 0 : this.compareMain(o) || this.comparePre(o);
    }
    compareMain(o) {
      return o instanceof f || (o = new f(o, this.options)), this.major < o.major ? -1 : this.major > o.major ? 1 : this.minor < o.minor ? -1 : this.minor > o.minor ? 1 : this.patch < o.patch ? -1 : this.patch > o.patch ? 1 : 0;
    }
    comparePre(o) {
      if (o instanceof f || (o = new f(o, this.options)), this.prerelease.length && !o.prerelease.length)
        return -1;
      if (!this.prerelease.length && o.prerelease.length)
        return 1;
      if (!this.prerelease.length && !o.prerelease.length)
        return 0;
      let s = 0;
      do {
        const t = this.prerelease[s], e = o.prerelease[s];
        if (i("prerelease compare", s, t, e), t === void 0 && e === void 0)
          return 0;
        if (e === void 0)
          return 1;
        if (t === void 0)
          return -1;
        if (t === e)
          continue;
        return r(t, e);
      } while (++s);
    }
    compareBuild(o) {
      o instanceof f || (o = new f(o, this.options));
      let s = 0;
      do {
        const t = this.build[s], e = o.build[s];
        if (i("build compare", s, t, e), t === void 0 && e === void 0)
          return 0;
        if (e === void 0)
          return 1;
        if (t === void 0)
          return -1;
        if (t === e)
          continue;
        return r(t, e);
      } while (++s);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(o, s, t) {
      if (o.startsWith("pre")) {
        if (!s && t === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (s) {
          const e = `-${s}`.match(this.options.loose ? l[u.PRERELEASELOOSE] : l[u.PRERELEASE]);
          if (!e || e[1] !== s)
            throw new Error(`invalid identifier: ${s}`);
        }
      }
      switch (o) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", s, t);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", s, t);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", s, t), this.inc("pre", s, t);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", s, t), this.inc("pre", s, t);
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
          const e = Number(t) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [e];
          else {
            let p = this.prerelease.length;
            for (; --p >= 0; )
              typeof this.prerelease[p] == "number" && (this.prerelease[p]++, p = -2);
            if (p === -1) {
              if (s === this.prerelease.join(".") && t === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(e);
            }
          }
          if (s) {
            let p = [s, e];
            t === !1 && (p = [s]), r(this.prerelease[0], s) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = p) : this.prerelease = p;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${o}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return Ri = f, Ri;
}
var Ai, Ro;
function Qt() {
  if (Ro) return Ai;
  Ro = 1;
  const i = Ke();
  return Ai = (d, l, u = !1) => {
    if (d instanceof i)
      return d;
    try {
      return new i(d, l);
    } catch (c) {
      if (!u)
        return null;
      throw c;
    }
  }, Ai;
}
var Ci, Ao;
function bf() {
  if (Ao) return Ci;
  Ao = 1;
  const i = Qt();
  return Ci = (d, l) => {
    const u = i(d, l);
    return u ? u.version : null;
  }, Ci;
}
var Ti, Co;
function Pf() {
  if (Co) return Ti;
  Co = 1;
  const i = Qt();
  return Ti = (d, l) => {
    const u = i(d.trim().replace(/^[=v]+/, ""), l);
    return u ? u.version : null;
  }, Ti;
}
var bi, To;
function Of() {
  if (To) return bi;
  To = 1;
  const i = Ke();
  return bi = (d, l, u, c, r) => {
    typeof u == "string" && (r = c, c = u, u = void 0);
    try {
      return new i(
        d instanceof i ? d.version : d,
        u
      ).inc(l, c, r).version;
    } catch {
      return null;
    }
  }, bi;
}
var Pi, bo;
function Df() {
  if (bo) return Pi;
  bo = 1;
  const i = Qt();
  return Pi = (d, l) => {
    const u = i(d, null, !0), c = i(l, null, !0), r = u.compare(c);
    if (r === 0)
      return null;
    const f = r > 0, a = f ? u : c, o = f ? c : u, s = !!a.prerelease.length;
    if (!!o.prerelease.length && !s) {
      if (!o.patch && !o.minor)
        return "major";
      if (o.compareMain(a) === 0)
        return o.minor && !o.patch ? "minor" : "patch";
    }
    const e = s ? "pre" : "";
    return u.major !== c.major ? e + "major" : u.minor !== c.minor ? e + "minor" : u.patch !== c.patch ? e + "patch" : "prerelease";
  }, Pi;
}
var Oi, Po;
function If() {
  if (Po) return Oi;
  Po = 1;
  const i = Ke();
  return Oi = (d, l) => new i(d, l).major, Oi;
}
var Di, Oo;
function Nf() {
  if (Oo) return Di;
  Oo = 1;
  const i = Ke();
  return Di = (d, l) => new i(d, l).minor, Di;
}
var Ii, Do;
function Ff() {
  if (Do) return Ii;
  Do = 1;
  const i = Ke();
  return Ii = (d, l) => new i(d, l).patch, Ii;
}
var Ni, Io;
function xf() {
  if (Io) return Ni;
  Io = 1;
  const i = Qt();
  return Ni = (d, l) => {
    const u = i(d, l);
    return u && u.prerelease.length ? u.prerelease : null;
  }, Ni;
}
var Fi, No;
function ot() {
  if (No) return Fi;
  No = 1;
  const i = Ke();
  return Fi = (d, l, u) => new i(d, u).compare(new i(l, u)), Fi;
}
var xi, Fo;
function Lf() {
  if (Fo) return xi;
  Fo = 1;
  const i = ot();
  return xi = (d, l, u) => i(l, d, u), xi;
}
var Li, xo;
function Uf() {
  if (xo) return Li;
  xo = 1;
  const i = ot();
  return Li = (d, l) => i(d, l, !0), Li;
}
var Ui, Lo;
function Sa() {
  if (Lo) return Ui;
  Lo = 1;
  const i = Ke();
  return Ui = (d, l, u) => {
    const c = new i(d, u), r = new i(l, u);
    return c.compare(r) || c.compareBuild(r);
  }, Ui;
}
var ki, Uo;
function kf() {
  if (Uo) return ki;
  Uo = 1;
  const i = Sa();
  return ki = (d, l) => d.sort((u, c) => i(u, c, l)), ki;
}
var $i, ko;
function $f() {
  if (ko) return $i;
  ko = 1;
  const i = Sa();
  return $i = (d, l) => d.sort((u, c) => i(c, u, l)), $i;
}
var qi, $o;
function an() {
  if ($o) return qi;
  $o = 1;
  const i = ot();
  return qi = (d, l, u) => i(d, l, u) > 0, qi;
}
var Mi, qo;
function Ra() {
  if (qo) return Mi;
  qo = 1;
  const i = ot();
  return Mi = (d, l, u) => i(d, l, u) < 0, Mi;
}
var Bi, Mo;
function Su() {
  if (Mo) return Bi;
  Mo = 1;
  const i = ot();
  return Bi = (d, l, u) => i(d, l, u) === 0, Bi;
}
var ji, Bo;
function Ru() {
  if (Bo) return ji;
  Bo = 1;
  const i = ot();
  return ji = (d, l, u) => i(d, l, u) !== 0, ji;
}
var Hi, jo;
function Aa() {
  if (jo) return Hi;
  jo = 1;
  const i = ot();
  return Hi = (d, l, u) => i(d, l, u) >= 0, Hi;
}
var Gi, Ho;
function Ca() {
  if (Ho) return Gi;
  Ho = 1;
  const i = ot();
  return Gi = (d, l, u) => i(d, l, u) <= 0, Gi;
}
var Wi, Go;
function Au() {
  if (Go) return Wi;
  Go = 1;
  const i = Su(), h = Ru(), d = an(), l = Aa(), u = Ra(), c = Ca();
  return Wi = (f, a, o, s) => {
    switch (a) {
      case "===":
        return typeof f == "object" && (f = f.version), typeof o == "object" && (o = o.version), f === o;
      case "!==":
        return typeof f == "object" && (f = f.version), typeof o == "object" && (o = o.version), f !== o;
      case "":
      case "=":
      case "==":
        return i(f, o, s);
      case "!=":
        return h(f, o, s);
      case ">":
        return d(f, o, s);
      case ">=":
        return l(f, o, s);
      case "<":
        return u(f, o, s);
      case "<=":
        return c(f, o, s);
      default:
        throw new TypeError(`Invalid operator: ${a}`);
    }
  }, Wi;
}
var Vi, Wo;
function qf() {
  if (Wo) return Vi;
  Wo = 1;
  const i = Ke(), h = Qt(), { safeRe: d, t: l } = Ir();
  return Vi = (c, r) => {
    if (c instanceof i)
      return c;
    if (typeof c == "number" && (c = String(c)), typeof c != "string")
      return null;
    r = r || {};
    let f = null;
    if (!r.rtl)
      f = c.match(r.includePrerelease ? d[l.COERCEFULL] : d[l.COERCE]);
    else {
      const p = r.includePrerelease ? d[l.COERCERTLFULL] : d[l.COERCERTL];
      let y;
      for (; (y = p.exec(c)) && (!f || f.index + f[0].length !== c.length); )
        (!f || y.index + y[0].length !== f.index + f[0].length) && (f = y), p.lastIndex = y.index + y[1].length + y[2].length;
      p.lastIndex = -1;
    }
    if (f === null)
      return null;
    const a = f[2], o = f[3] || "0", s = f[4] || "0", t = r.includePrerelease && f[5] ? `-${f[5]}` : "", e = r.includePrerelease && f[6] ? `+${f[6]}` : "";
    return h(`${a}.${o}.${s}${t}${e}`, r);
  }, Vi;
}
var Yi, Vo;
function Mf() {
  if (Vo) return Yi;
  Vo = 1;
  class i {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(d) {
      const l = this.map.get(d);
      if (l !== void 0)
        return this.map.delete(d), this.map.set(d, l), l;
    }
    delete(d) {
      return this.map.delete(d);
    }
    set(d, l) {
      if (!this.delete(d) && l !== void 0) {
        if (this.map.size >= this.max) {
          const c = this.map.keys().next().value;
          this.delete(c);
        }
        this.map.set(d, l);
      }
      return this;
    }
  }
  return Yi = i, Yi;
}
var zi, Yo;
function lt() {
  if (Yo) return zi;
  Yo = 1;
  const i = /\s+/g;
  class h {
    constructor(x, H) {
      if (H = u(H), x instanceof h)
        return x.loose === !!H.loose && x.includePrerelease === !!H.includePrerelease ? x : new h(x.raw, H);
      if (x instanceof c)
        return this.raw = x.value, this.set = [[x]], this.formatted = void 0, this;
      if (this.options = H, this.loose = !!H.loose, this.includePrerelease = !!H.includePrerelease, this.raw = x.trim().replace(i, " "), this.set = this.raw.split("||").map((F) => this.parseRange(F.trim())).filter((F) => F.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const F = this.set[0];
        if (this.set = this.set.filter((G) => !v(G[0])), this.set.length === 0)
          this.set = [F];
        else if (this.set.length > 1) {
          for (const G of this.set)
            if (G.length === 1 && m(G[0])) {
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
        for (let x = 0; x < this.set.length; x++) {
          x > 0 && (this.formatted += "||");
          const H = this.set[x];
          for (let F = 0; F < H.length; F++)
            F > 0 && (this.formatted += " "), this.formatted += H[F].toString().trim();
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
    parseRange(x) {
      const F = ((this.options.includePrerelease && p) | (this.options.loose && y)) + ":" + x, G = l.get(F);
      if (G)
        return G;
      const Y = this.options.loose, ee = Y ? a[o.HYPHENRANGELOOSE] : a[o.HYPHENRANGE];
      x = x.replace(ee, k(this.options.includePrerelease)), r("hyphen replace", x), x = x.replace(a[o.COMPARATORTRIM], s), r("comparator trim", x), x = x.replace(a[o.TILDETRIM], t), r("tilde trim", x), x = x.replace(a[o.CARETTRIM], e), r("caret trim", x);
      let me = x.split(" ").map((Q) => A(Q, this.options)).join(" ").split(/\s+/).map((Q) => $(Q, this.options));
      Y && (me = me.filter((Q) => (r("loose invalid filter", Q, this.options), !!Q.match(a[o.COMPARATORLOOSE])))), r("range list", me);
      const Z = /* @__PURE__ */ new Map(), ve = me.map((Q) => new c(Q, this.options));
      for (const Q of ve) {
        if (v(Q))
          return [Q];
        Z.set(Q.value, Q);
      }
      Z.size > 1 && Z.has("") && Z.delete("");
      const ge = [...Z.values()];
      return l.set(F, ge), ge;
    }
    intersects(x, H) {
      if (!(x instanceof h))
        throw new TypeError("a Range is required");
      return this.set.some((F) => _(F, H) && x.set.some((G) => _(G, H) && F.every((Y) => G.every((ee) => Y.intersects(ee, H)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(x) {
      if (!x)
        return !1;
      if (typeof x == "string")
        try {
          x = new f(x, this.options);
        } catch {
          return !1;
        }
      for (let H = 0; H < this.set.length; H++)
        if (M(this.set[H], x, this.options))
          return !0;
      return !1;
    }
  }
  zi = h;
  const d = Mf(), l = new d(), u = _a(), c = sn(), r = nn(), f = Ke(), {
    safeRe: a,
    t: o,
    comparatorTrimReplace: s,
    tildeTrimReplace: t,
    caretTrimReplace: e
  } = Ir(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: y } = rn(), v = (L) => L.value === "<0.0.0-0", m = (L) => L.value === "", _ = (L, x) => {
    let H = !0;
    const F = L.slice();
    let G = F.pop();
    for (; H && F.length; )
      H = F.every((Y) => G.intersects(Y, x)), G = F.pop();
    return H;
  }, A = (L, x) => (L = L.replace(a[o.BUILD], ""), r("comp", L, x), L = D(L, x), r("caret", L), L = N(L, x), r("tildes", L), L = S(L, x), r("xrange", L), L = w(L, x), r("stars", L), L), P = (L) => !L || L.toLowerCase() === "x" || L === "*", N = (L, x) => L.trim().split(/\s+/).map((H) => C(H, x)).join(" "), C = (L, x) => {
    const H = x.loose ? a[o.TILDELOOSE] : a[o.TILDE];
    return L.replace(H, (F, G, Y, ee, me) => {
      r("tilde", L, F, G, Y, ee, me);
      let Z;
      return P(G) ? Z = "" : P(Y) ? Z = `>=${G}.0.0 <${+G + 1}.0.0-0` : P(ee) ? Z = `>=${G}.${Y}.0 <${G}.${+Y + 1}.0-0` : me ? (r("replaceTilde pr", me), Z = `>=${G}.${Y}.${ee}-${me} <${G}.${+Y + 1}.0-0`) : Z = `>=${G}.${Y}.${ee} <${G}.${+Y + 1}.0-0`, r("tilde return", Z), Z;
    });
  }, D = (L, x) => L.trim().split(/\s+/).map((H) => b(H, x)).join(" "), b = (L, x) => {
    r("caret", L, x);
    const H = x.loose ? a[o.CARETLOOSE] : a[o.CARET], F = x.includePrerelease ? "-0" : "";
    return L.replace(H, (G, Y, ee, me, Z) => {
      r("caret", L, G, Y, ee, me, Z);
      let ve;
      return P(Y) ? ve = "" : P(ee) ? ve = `>=${Y}.0.0${F} <${+Y + 1}.0.0-0` : P(me) ? Y === "0" ? ve = `>=${Y}.${ee}.0${F} <${Y}.${+ee + 1}.0-0` : ve = `>=${Y}.${ee}.0${F} <${+Y + 1}.0.0-0` : Z ? (r("replaceCaret pr", Z), Y === "0" ? ee === "0" ? ve = `>=${Y}.${ee}.${me}-${Z} <${Y}.${ee}.${+me + 1}-0` : ve = `>=${Y}.${ee}.${me}-${Z} <${Y}.${+ee + 1}.0-0` : ve = `>=${Y}.${ee}.${me}-${Z} <${+Y + 1}.0.0-0`) : (r("no pr"), Y === "0" ? ee === "0" ? ve = `>=${Y}.${ee}.${me}${F} <${Y}.${ee}.${+me + 1}-0` : ve = `>=${Y}.${ee}.${me}${F} <${Y}.${+ee + 1}.0-0` : ve = `>=${Y}.${ee}.${me} <${+Y + 1}.0.0-0`), r("caret return", ve), ve;
    });
  }, S = (L, x) => (r("replaceXRanges", L, x), L.split(/\s+/).map((H) => O(H, x)).join(" ")), O = (L, x) => {
    L = L.trim();
    const H = x.loose ? a[o.XRANGELOOSE] : a[o.XRANGE];
    return L.replace(H, (F, G, Y, ee, me, Z) => {
      r("xRange", L, F, G, Y, ee, me, Z);
      const ve = P(Y), ge = ve || P(ee), Q = ge || P(me), ce = Q;
      return G === "=" && ce && (G = ""), Z = x.includePrerelease ? "-0" : "", ve ? G === ">" || G === "<" ? F = "<0.0.0-0" : F = "*" : G && ce ? (ge && (ee = 0), me = 0, G === ">" ? (G = ">=", ge ? (Y = +Y + 1, ee = 0, me = 0) : (ee = +ee + 1, me = 0)) : G === "<=" && (G = "<", ge ? Y = +Y + 1 : ee = +ee + 1), G === "<" && (Z = "-0"), F = `${G + Y}.${ee}.${me}${Z}`) : ge ? F = `>=${Y}.0.0${Z} <${+Y + 1}.0.0-0` : Q && (F = `>=${Y}.${ee}.0${Z} <${Y}.${+ee + 1}.0-0`), r("xRange return", F), F;
    });
  }, w = (L, x) => (r("replaceStars", L, x), L.trim().replace(a[o.STAR], "")), $ = (L, x) => (r("replaceGTE0", L, x), L.trim().replace(a[x.includePrerelease ? o.GTE0PRE : o.GTE0], "")), k = (L) => (x, H, F, G, Y, ee, me, Z, ve, ge, Q, ce) => (P(F) ? H = "" : P(G) ? H = `>=${F}.0.0${L ? "-0" : ""}` : P(Y) ? H = `>=${F}.${G}.0${L ? "-0" : ""}` : ee ? H = `>=${H}` : H = `>=${H}${L ? "-0" : ""}`, P(ve) ? Z = "" : P(ge) ? Z = `<${+ve + 1}.0.0-0` : P(Q) ? Z = `<${ve}.${+ge + 1}.0-0` : ce ? Z = `<=${ve}.${ge}.${Q}-${ce}` : L ? Z = `<${ve}.${ge}.${+Q + 1}-0` : Z = `<=${Z}`, `${H} ${Z}`.trim()), M = (L, x, H) => {
    for (let F = 0; F < L.length; F++)
      if (!L[F].test(x))
        return !1;
    if (x.prerelease.length && !H.includePrerelease) {
      for (let F = 0; F < L.length; F++)
        if (r(L[F].semver), L[F].semver !== c.ANY && L[F].semver.prerelease.length > 0) {
          const G = L[F].semver;
          if (G.major === x.major && G.minor === x.minor && G.patch === x.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return zi;
}
var Xi, zo;
function sn() {
  if (zo) return Xi;
  zo = 1;
  const i = /* @__PURE__ */ Symbol("SemVer ANY");
  class h {
    static get ANY() {
      return i;
    }
    constructor(s, t) {
      if (t = d(t), s instanceof h) {
        if (s.loose === !!t.loose)
          return s;
        s = s.value;
      }
      s = s.trim().split(/\s+/).join(" "), r("comparator", s, t), this.options = t, this.loose = !!t.loose, this.parse(s), this.semver === i ? this.value = "" : this.value = this.operator + this.semver.version, r("comp", this);
    }
    parse(s) {
      const t = this.options.loose ? l[u.COMPARATORLOOSE] : l[u.COMPARATOR], e = s.match(t);
      if (!e)
        throw new TypeError(`Invalid comparator: ${s}`);
      this.operator = e[1] !== void 0 ? e[1] : "", this.operator === "=" && (this.operator = ""), e[2] ? this.semver = new f(e[2], this.options.loose) : this.semver = i;
    }
    toString() {
      return this.value;
    }
    test(s) {
      if (r("Comparator.test", s, this.options.loose), this.semver === i || s === i)
        return !0;
      if (typeof s == "string")
        try {
          s = new f(s, this.options);
        } catch {
          return !1;
        }
      return c(s, this.operator, this.semver, this.options);
    }
    intersects(s, t) {
      if (!(s instanceof h))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new a(s.value, t).test(this.value) : s.operator === "" ? s.value === "" ? !0 : new a(this.value, t).test(s.semver) : (t = d(t), t.includePrerelease && (this.value === "<0.0.0-0" || s.value === "<0.0.0-0") || !t.includePrerelease && (this.value.startsWith("<0.0.0") || s.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && s.operator.startsWith(">") || this.operator.startsWith("<") && s.operator.startsWith("<") || this.semver.version === s.semver.version && this.operator.includes("=") && s.operator.includes("=") || c(this.semver, "<", s.semver, t) && this.operator.startsWith(">") && s.operator.startsWith("<") || c(this.semver, ">", s.semver, t) && this.operator.startsWith("<") && s.operator.startsWith(">")));
    }
  }
  Xi = h;
  const d = _a(), { safeRe: l, t: u } = Ir(), c = Au(), r = nn(), f = Ke(), a = lt();
  return Xi;
}
var Ji, Xo;
function on() {
  if (Xo) return Ji;
  Xo = 1;
  const i = lt();
  return Ji = (d, l, u) => {
    try {
      l = new i(l, u);
    } catch {
      return !1;
    }
    return l.test(d);
  }, Ji;
}
var Ki, Jo;
function Bf() {
  if (Jo) return Ki;
  Jo = 1;
  const i = lt();
  return Ki = (d, l) => new i(d, l).set.map((u) => u.map((c) => c.value).join(" ").trim().split(" ")), Ki;
}
var Qi, Ko;
function jf() {
  if (Ko) return Qi;
  Ko = 1;
  const i = Ke(), h = lt();
  return Qi = (l, u, c) => {
    let r = null, f = null, a = null;
    try {
      a = new h(u, c);
    } catch {
      return null;
    }
    return l.forEach((o) => {
      a.test(o) && (!r || f.compare(o) === -1) && (r = o, f = new i(r, c));
    }), r;
  }, Qi;
}
var Zi, Qo;
function Hf() {
  if (Qo) return Zi;
  Qo = 1;
  const i = Ke(), h = lt();
  return Zi = (l, u, c) => {
    let r = null, f = null, a = null;
    try {
      a = new h(u, c);
    } catch {
      return null;
    }
    return l.forEach((o) => {
      a.test(o) && (!r || f.compare(o) === 1) && (r = o, f = new i(r, c));
    }), r;
  }, Zi;
}
var ea, Zo;
function Gf() {
  if (Zo) return ea;
  Zo = 1;
  const i = Ke(), h = lt(), d = an();
  return ea = (u, c) => {
    u = new h(u, c);
    let r = new i("0.0.0");
    if (u.test(r) || (r = new i("0.0.0-0"), u.test(r)))
      return r;
    r = null;
    for (let f = 0; f < u.set.length; ++f) {
      const a = u.set[f];
      let o = null;
      a.forEach((s) => {
        const t = new i(s.semver.version);
        switch (s.operator) {
          case ">":
            t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
          /* fallthrough */
          case "":
          case ">=":
            (!o || d(t, o)) && (o = t);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${s.operator}`);
        }
      }), o && (!r || d(r, o)) && (r = o);
    }
    return r && u.test(r) ? r : null;
  }, ea;
}
var ta, el;
function Wf() {
  if (el) return ta;
  el = 1;
  const i = lt();
  return ta = (d, l) => {
    try {
      return new i(d, l).range || "*";
    } catch {
      return null;
    }
  }, ta;
}
var ra, tl;
function Ta() {
  if (tl) return ra;
  tl = 1;
  const i = Ke(), h = sn(), { ANY: d } = h, l = lt(), u = on(), c = an(), r = Ra(), f = Ca(), a = Aa();
  return ra = (s, t, e, p) => {
    s = new i(s, p), t = new l(t, p);
    let y, v, m, _, A;
    switch (e) {
      case ">":
        y = c, v = f, m = r, _ = ">", A = ">=";
        break;
      case "<":
        y = r, v = a, m = c, _ = "<", A = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (u(s, t, p))
      return !1;
    for (let P = 0; P < t.set.length; ++P) {
      const N = t.set[P];
      let C = null, D = null;
      if (N.forEach((b) => {
        b.semver === d && (b = new h(">=0.0.0")), C = C || b, D = D || b, y(b.semver, C.semver, p) ? C = b : m(b.semver, D.semver, p) && (D = b);
      }), C.operator === _ || C.operator === A || (!D.operator || D.operator === _) && v(s, D.semver))
        return !1;
      if (D.operator === A && m(s, D.semver))
        return !1;
    }
    return !0;
  }, ra;
}
var na, rl;
function Vf() {
  if (rl) return na;
  rl = 1;
  const i = Ta();
  return na = (d, l, u) => i(d, l, ">", u), na;
}
var ia, nl;
function Yf() {
  if (nl) return ia;
  nl = 1;
  const i = Ta();
  return ia = (d, l, u) => i(d, l, "<", u), ia;
}
var aa, il;
function zf() {
  if (il) return aa;
  il = 1;
  const i = lt();
  return aa = (d, l, u) => (d = new i(d, u), l = new i(l, u), d.intersects(l, u)), aa;
}
var sa, al;
function Xf() {
  if (al) return sa;
  al = 1;
  const i = on(), h = ot();
  return sa = (d, l, u) => {
    const c = [];
    let r = null, f = null;
    const a = d.sort((e, p) => h(e, p, u));
    for (const e of a)
      i(e, l, u) ? (f = e, r || (r = e)) : (f && c.push([r, f]), f = null, r = null);
    r && c.push([r, null]);
    const o = [];
    for (const [e, p] of c)
      e === p ? o.push(e) : !p && e === a[0] ? o.push("*") : p ? e === a[0] ? o.push(`<=${p}`) : o.push(`${e} - ${p}`) : o.push(`>=${e}`);
    const s = o.join(" || "), t = typeof l.raw == "string" ? l.raw : String(l);
    return s.length < t.length ? s : l;
  }, sa;
}
var oa, sl;
function Jf() {
  if (sl) return oa;
  sl = 1;
  const i = lt(), h = sn(), { ANY: d } = h, l = on(), u = ot(), c = (t, e, p = {}) => {
    if (t === e)
      return !0;
    t = new i(t, p), e = new i(e, p);
    let y = !1;
    e: for (const v of t.set) {
      for (const m of e.set) {
        const _ = a(v, m, p);
        if (y = y || _ !== null, _)
          continue e;
      }
      if (y)
        return !1;
    }
    return !0;
  }, r = [new h(">=0.0.0-0")], f = [new h(">=0.0.0")], a = (t, e, p) => {
    if (t === e)
      return !0;
    if (t.length === 1 && t[0].semver === d) {
      if (e.length === 1 && e[0].semver === d)
        return !0;
      p.includePrerelease ? t = r : t = f;
    }
    if (e.length === 1 && e[0].semver === d) {
      if (p.includePrerelease)
        return !0;
      e = f;
    }
    const y = /* @__PURE__ */ new Set();
    let v, m;
    for (const S of t)
      S.operator === ">" || S.operator === ">=" ? v = o(v, S, p) : S.operator === "<" || S.operator === "<=" ? m = s(m, S, p) : y.add(S.semver);
    if (y.size > 1)
      return null;
    let _;
    if (v && m) {
      if (_ = u(v.semver, m.semver, p), _ > 0)
        return null;
      if (_ === 0 && (v.operator !== ">=" || m.operator !== "<="))
        return null;
    }
    for (const S of y) {
      if (v && !l(S, String(v), p) || m && !l(S, String(m), p))
        return null;
      for (const O of e)
        if (!l(S, String(O), p))
          return !1;
      return !0;
    }
    let A, P, N, C, D = m && !p.includePrerelease && m.semver.prerelease.length ? m.semver : !1, b = v && !p.includePrerelease && v.semver.prerelease.length ? v.semver : !1;
    D && D.prerelease.length === 1 && m.operator === "<" && D.prerelease[0] === 0 && (D = !1);
    for (const S of e) {
      if (C = C || S.operator === ">" || S.operator === ">=", N = N || S.operator === "<" || S.operator === "<=", v) {
        if (b && S.semver.prerelease && S.semver.prerelease.length && S.semver.major === b.major && S.semver.minor === b.minor && S.semver.patch === b.patch && (b = !1), S.operator === ">" || S.operator === ">=") {
          if (A = o(v, S, p), A === S && A !== v)
            return !1;
        } else if (v.operator === ">=" && !l(v.semver, String(S), p))
          return !1;
      }
      if (m) {
        if (D && S.semver.prerelease && S.semver.prerelease.length && S.semver.major === D.major && S.semver.minor === D.minor && S.semver.patch === D.patch && (D = !1), S.operator === "<" || S.operator === "<=") {
          if (P = s(m, S, p), P === S && P !== m)
            return !1;
        } else if (m.operator === "<=" && !l(m.semver, String(S), p))
          return !1;
      }
      if (!S.operator && (m || v) && _ !== 0)
        return !1;
    }
    return !(v && N && !m && _ !== 0 || m && C && !v && _ !== 0 || b || D);
  }, o = (t, e, p) => {
    if (!t)
      return e;
    const y = u(t.semver, e.semver, p);
    return y > 0 ? t : y < 0 || e.operator === ">" && t.operator === ">=" ? e : t;
  }, s = (t, e, p) => {
    if (!t)
      return e;
    const y = u(t.semver, e.semver, p);
    return y < 0 ? t : y > 0 || e.operator === "<" && t.operator === "<=" ? e : t;
  };
  return oa = c, oa;
}
var la, ol;
function Cu() {
  if (ol) return la;
  ol = 1;
  const i = Ir(), h = rn(), d = Ke(), l = _u(), u = Qt(), c = bf(), r = Pf(), f = Of(), a = Df(), o = If(), s = Nf(), t = Ff(), e = xf(), p = ot(), y = Lf(), v = Uf(), m = Sa(), _ = kf(), A = $f(), P = an(), N = Ra(), C = Su(), D = Ru(), b = Aa(), S = Ca(), O = Au(), w = qf(), $ = sn(), k = lt(), M = on(), L = Bf(), x = jf(), H = Hf(), F = Gf(), G = Wf(), Y = Ta(), ee = Vf(), me = Yf(), Z = zf(), ve = Xf(), ge = Jf();
  return la = {
    parse: u,
    valid: c,
    clean: r,
    inc: f,
    diff: a,
    major: o,
    minor: s,
    patch: t,
    prerelease: e,
    compare: p,
    rcompare: y,
    compareLoose: v,
    compareBuild: m,
    sort: _,
    rsort: A,
    gt: P,
    lt: N,
    eq: C,
    neq: D,
    gte: b,
    lte: S,
    cmp: O,
    coerce: w,
    Comparator: $,
    Range: k,
    satisfies: M,
    toComparators: L,
    maxSatisfying: x,
    minSatisfying: H,
    minVersion: F,
    validRange: G,
    outside: Y,
    gtr: ee,
    ltr: me,
    intersects: Z,
    simplifyRange: ve,
    subset: ge,
    SemVer: d,
    re: i.re,
    src: i.src,
    tokens: i.t,
    SEMVER_SPEC_VERSION: h.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: h.RELEASE_TYPES,
    compareIdentifiers: l.compareIdentifiers,
    rcompareIdentifiers: l.rcompareIdentifiers
  }, la;
}
var Wt = {}, Tr = { exports: {} };
Tr.exports;
var ll;
function Kf() {
  return ll || (ll = 1, (function(i, h) {
    var d = 200, l = "__lodash_hash_undefined__", u = 1, c = 2, r = 9007199254740991, f = "[object Arguments]", a = "[object Array]", o = "[object AsyncFunction]", s = "[object Boolean]", t = "[object Date]", e = "[object Error]", p = "[object Function]", y = "[object GeneratorFunction]", v = "[object Map]", m = "[object Number]", _ = "[object Null]", A = "[object Object]", P = "[object Promise]", N = "[object Proxy]", C = "[object RegExp]", D = "[object Set]", b = "[object String]", S = "[object Symbol]", O = "[object Undefined]", w = "[object WeakMap]", $ = "[object ArrayBuffer]", k = "[object DataView]", M = "[object Float32Array]", L = "[object Float64Array]", x = "[object Int8Array]", H = "[object Int16Array]", F = "[object Int32Array]", G = "[object Uint8Array]", Y = "[object Uint8ClampedArray]", ee = "[object Uint16Array]", me = "[object Uint32Array]", Z = /[\\^$.*+?()[\]{}|]/g, ve = /^\[object .+?Constructor\]$/, ge = /^(?:0|[1-9]\d*)$/, Q = {};
    Q[M] = Q[L] = Q[x] = Q[H] = Q[F] = Q[G] = Q[Y] = Q[ee] = Q[me] = !0, Q[f] = Q[a] = Q[$] = Q[s] = Q[k] = Q[t] = Q[e] = Q[p] = Q[v] = Q[m] = Q[A] = Q[C] = Q[D] = Q[b] = Q[w] = !1;
    var ce = typeof st == "object" && st && st.Object === Object && st, Ee = typeof self == "object" && self && self.Object === Object && self, be = ce || Ee || Function("return this")(), Ne = h && !h.nodeType && h, Ie = Ne && !0 && i && !i.nodeType && i, Te = Ie && Ie.exports === Ne, E = Te && ce.process, g = (function() {
      try {
        return E && E.binding && E.binding("util");
      } catch {
      }
    })(), q = g && g.isTypedArray;
    function I(T, U) {
      for (var K = -1, le = T == null ? 0 : T.length, Le = 0, _e = []; ++K < le; ) {
        var qe = T[K];
        U(qe, K, T) && (_e[Le++] = qe);
      }
      return _e;
    }
    function Ae(T, U) {
      for (var K = -1, le = U.length, Le = T.length; ++K < le; )
        T[Le + K] = U[K];
      return T;
    }
    function Ce(T, U) {
      for (var K = -1, le = T == null ? 0 : T.length; ++K < le; )
        if (U(T[K], K, T))
          return !0;
      return !1;
    }
    function xe(T, U) {
      for (var K = -1, le = Array(T); ++K < T; )
        le[K] = U(K);
      return le;
    }
    function Me(T) {
      return function(U) {
        return T(U);
      };
    }
    function Be(T, U) {
      return T.has(U);
    }
    function Ve(T, U) {
      return T?.[U];
    }
    function n(T) {
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
    })(), Oe = ne.toString, he = RegExp(
      "^" + se.call(ue).replace(Z, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), R = Te ? be.Buffer : void 0, j = be.Symbol, z = be.Uint8Array, X = ne.propertyIsEnumerable, J = ie.splice, ae = j ? j.toStringTag : void 0, re = Object.getOwnPropertySymbols, oe = R ? R.isBuffer : void 0, de = B(Object.keys, Object), ye = Bt(be, "DataView"), Fe = Bt(be, "Map"), $e = Bt(be, "Promise"), De = Bt(be, "Set"), Mt = Bt(be, "WeakMap"), it = Bt(Object, "create"), Tt = Ot(ye), ju = Ot(Fe), Hu = Ot($e), Gu = Ot(De), Wu = Ot(Mt), Da = j ? j.prototype : void 0, un = Da ? Da.valueOf : void 0;
    function bt(T) {
      var U = -1, K = T == null ? 0 : T.length;
      for (this.clear(); ++U < K; ) {
        var le = T[U];
        this.set(le[0], le[1]);
      }
    }
    function Vu() {
      this.__data__ = it ? it(null) : {}, this.size = 0;
    }
    function Yu(T) {
      var U = this.has(T) && delete this.__data__[T];
      return this.size -= U ? 1 : 0, U;
    }
    function zu(T) {
      var U = this.__data__;
      if (it) {
        var K = U[T];
        return K === l ? void 0 : K;
      }
      return ue.call(U, T) ? U[T] : void 0;
    }
    function Xu(T) {
      var U = this.__data__;
      return it ? U[T] !== void 0 : ue.call(U, T);
    }
    function Ju(T, U) {
      var K = this.__data__;
      return this.size += this.has(T) ? 0 : 1, K[T] = it && U === void 0 ? l : U, this;
    }
    bt.prototype.clear = Vu, bt.prototype.delete = Yu, bt.prototype.get = zu, bt.prototype.has = Xu, bt.prototype.set = Ju;
    function dt(T) {
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
      var U = this.__data__, K = Fr(U, T);
      if (K < 0)
        return !1;
      var le = U.length - 1;
      return K == le ? U.pop() : J.call(U, K, 1), --this.size, !0;
    }
    function Zu(T) {
      var U = this.__data__, K = Fr(U, T);
      return K < 0 ? void 0 : U[K][1];
    }
    function ec(T) {
      return Fr(this.__data__, T) > -1;
    }
    function tc(T, U) {
      var K = this.__data__, le = Fr(K, T);
      return le < 0 ? (++this.size, K.push([T, U])) : K[le][1] = U, this;
    }
    dt.prototype.clear = Ku, dt.prototype.delete = Qu, dt.prototype.get = Zu, dt.prototype.has = ec, dt.prototype.set = tc;
    function Pt(T) {
      var U = -1, K = T == null ? 0 : T.length;
      for (this.clear(); ++U < K; ) {
        var le = T[U];
        this.set(le[0], le[1]);
      }
    }
    function rc() {
      this.size = 0, this.__data__ = {
        hash: new bt(),
        map: new (Fe || dt)(),
        string: new bt()
      };
    }
    function nc(T) {
      var U = xr(this, T).delete(T);
      return this.size -= U ? 1 : 0, U;
    }
    function ic(T) {
      return xr(this, T).get(T);
    }
    function ac(T) {
      return xr(this, T).has(T);
    }
    function sc(T, U) {
      var K = xr(this, T), le = K.size;
      return K.set(T, U), this.size += K.size == le ? 0 : 1, this;
    }
    Pt.prototype.clear = rc, Pt.prototype.delete = nc, Pt.prototype.get = ic, Pt.prototype.has = ac, Pt.prototype.set = sc;
    function Nr(T) {
      var U = -1, K = T == null ? 0 : T.length;
      for (this.__data__ = new Pt(); ++U < K; )
        this.add(T[U]);
    }
    function oc(T) {
      return this.__data__.set(T, l), this;
    }
    function lc(T) {
      return this.__data__.has(T);
    }
    Nr.prototype.add = Nr.prototype.push = oc, Nr.prototype.has = lc;
    function yt(T) {
      var U = this.__data__ = new dt(T);
      this.size = U.size;
    }
    function uc() {
      this.__data__ = new dt(), this.size = 0;
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
      if (K instanceof dt) {
        var le = K.__data__;
        if (!Fe || le.length < d - 1)
          return le.push([T, U]), this.size = ++K.size, this;
        K = this.__data__ = new Pt(le);
      }
      return K.set(T, U), this.size = K.size, this;
    }
    yt.prototype.clear = uc, yt.prototype.delete = cc, yt.prototype.get = fc, yt.prototype.has = dc, yt.prototype.set = hc;
    function pc(T, U) {
      var K = Lr(T), le = !K && Oc(T), Le = !K && !le && cn(T), _e = !K && !le && !Le && qa(T), qe = K || le || Le || _e, je = qe ? xe(T.length, String) : [], We = je.length;
      for (var Ue in T)
        ue.call(T, Ue) && !(qe && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ue == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Le && (Ue == "offset" || Ue == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        _e && (Ue == "buffer" || Ue == "byteLength" || Ue == "byteOffset") || // Skip index properties.
        Ac(Ue, We))) && je.push(Ue);
      return je;
    }
    function Fr(T, U) {
      for (var K = T.length; K--; )
        if (La(T[K][0], U))
          return K;
      return -1;
    }
    function mc(T, U, K) {
      var le = U(T);
      return Lr(T) ? le : Ae(le, K(T));
    }
    function Zt(T) {
      return T == null ? T === void 0 ? O : _ : ae && ae in Object(T) ? Sc(T) : Pc(T);
    }
    function Ia(T) {
      return er(T) && Zt(T) == f;
    }
    function Na(T, U, K, le, Le) {
      return T === U ? !0 : T == null || U == null || !er(T) && !er(U) ? T !== T && U !== U : gc(T, U, K, le, Na, Le);
    }
    function gc(T, U, K, le, Le, _e) {
      var qe = Lr(T), je = Lr(U), We = qe ? a : vt(T), Ue = je ? a : vt(U);
      We = We == f ? A : We, Ue = Ue == f ? A : Ue;
      var Ze = We == A, at = Ue == A, Ye = We == Ue;
      if (Ye && cn(T)) {
        if (!cn(U))
          return !1;
        qe = !0, Ze = !1;
      }
      if (Ye && !Ze)
        return _e || (_e = new yt()), qe || qa(T) ? Fa(T, U, K, le, Le, _e) : wc(T, U, We, K, le, Le, _e);
      if (!(K & u)) {
        var rt = Ze && ue.call(T, "__wrapped__"), nt = at && ue.call(U, "__wrapped__");
        if (rt || nt) {
          var Et = rt ? T.value() : T, ht = nt ? U.value() : U;
          return _e || (_e = new yt()), Le(Et, ht, K, le, _e);
        }
      }
      return Ye ? (_e || (_e = new yt()), _c(T, U, K, le, Le, _e)) : !1;
    }
    function yc(T) {
      if (!$a(T) || Tc(T))
        return !1;
      var U = Ua(T) ? he : ve;
      return U.test(Ot(T));
    }
    function vc(T) {
      return er(T) && ka(T.length) && !!Q[Zt(T)];
    }
    function Ec(T) {
      if (!bc(T))
        return de(T);
      var U = [];
      for (var K in Object(T))
        ue.call(T, K) && K != "constructor" && U.push(K);
      return U;
    }
    function Fa(T, U, K, le, Le, _e) {
      var qe = K & u, je = T.length, We = U.length;
      if (je != We && !(qe && We > je))
        return !1;
      var Ue = _e.get(T);
      if (Ue && _e.get(U))
        return Ue == U;
      var Ze = -1, at = !0, Ye = K & c ? new Nr() : void 0;
      for (_e.set(T, U), _e.set(U, T); ++Ze < je; ) {
        var rt = T[Ze], nt = U[Ze];
        if (le)
          var Et = qe ? le(nt, rt, Ze, U, T, _e) : le(rt, nt, Ze, T, U, _e);
        if (Et !== void 0) {
          if (Et)
            continue;
          at = !1;
          break;
        }
        if (Ye) {
          if (!Ce(U, function(ht, Dt) {
            if (!Be(Ye, Dt) && (rt === ht || Le(rt, ht, K, le, _e)))
              return Ye.push(Dt);
          })) {
            at = !1;
            break;
          }
        } else if (!(rt === nt || Le(rt, nt, K, le, _e))) {
          at = !1;
          break;
        }
      }
      return _e.delete(T), _e.delete(U), at;
    }
    function wc(T, U, K, le, Le, _e, qe) {
      switch (K) {
        case k:
          if (T.byteLength != U.byteLength || T.byteOffset != U.byteOffset)
            return !1;
          T = T.buffer, U = U.buffer;
        case $:
          return !(T.byteLength != U.byteLength || !_e(new z(T), new z(U)));
        case s:
        case t:
        case m:
          return La(+T, +U);
        case e:
          return T.name == U.name && T.message == U.message;
        case C:
        case b:
          return T == U + "";
        case v:
          var je = n;
        case D:
          var We = le & u;
          if (je || (je = W), T.size != U.size && !We)
            return !1;
          var Ue = qe.get(T);
          if (Ue)
            return Ue == U;
          le |= c, qe.set(T, U);
          var Ze = Fa(je(T), je(U), le, Le, _e, qe);
          return qe.delete(T), Ze;
        case S:
          if (un)
            return un.call(T) == un.call(U);
      }
      return !1;
    }
    function _c(T, U, K, le, Le, _e) {
      var qe = K & u, je = xa(T), We = je.length, Ue = xa(U), Ze = Ue.length;
      if (We != Ze && !qe)
        return !1;
      for (var at = We; at--; ) {
        var Ye = je[at];
        if (!(qe ? Ye in U : ue.call(U, Ye)))
          return !1;
      }
      var rt = _e.get(T);
      if (rt && _e.get(U))
        return rt == U;
      var nt = !0;
      _e.set(T, U), _e.set(U, T);
      for (var Et = qe; ++at < We; ) {
        Ye = je[at];
        var ht = T[Ye], Dt = U[Ye];
        if (le)
          var Ma = qe ? le(Dt, ht, Ye, U, T, _e) : le(ht, Dt, Ye, T, U, _e);
        if (!(Ma === void 0 ? ht === Dt || Le(ht, Dt, K, le, _e) : Ma)) {
          nt = !1;
          break;
        }
        Et || (Et = Ye == "constructor");
      }
      if (nt && !Et) {
        var Ur = T.constructor, kr = U.constructor;
        Ur != kr && "constructor" in T && "constructor" in U && !(typeof Ur == "function" && Ur instanceof Ur && typeof kr == "function" && kr instanceof kr) && (nt = !1);
      }
      return _e.delete(T), _e.delete(U), nt;
    }
    function xa(T) {
      return mc(T, Nc, Rc);
    }
    function xr(T, U) {
      var K = T.__data__;
      return Cc(U) ? K[typeof U == "string" ? "string" : "hash"] : K.map;
    }
    function Bt(T, U) {
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
      var Le = Oe.call(T);
      return le && (U ? T[ae] = K : delete T[ae]), Le;
    }
    var Rc = re ? function(T) {
      return T == null ? [] : (T = Object(T), I(re(T), function(U) {
        return X.call(T, U);
      }));
    } : Fc, vt = Zt;
    (ye && vt(new ye(new ArrayBuffer(1))) != k || Fe && vt(new Fe()) != v || $e && vt($e.resolve()) != P || De && vt(new De()) != D || Mt && vt(new Mt()) != w) && (vt = function(T) {
      var U = Zt(T), K = U == A ? T.constructor : void 0, le = K ? Ot(K) : "";
      if (le)
        switch (le) {
          case Tt:
            return k;
          case ju:
            return v;
          case Hu:
            return P;
          case Gu:
            return D;
          case Wu:
            return w;
        }
      return U;
    });
    function Ac(T, U) {
      return U = U ?? r, !!U && (typeof T == "number" || ge.test(T)) && T > -1 && T % 1 == 0 && T < U;
    }
    function Cc(T) {
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
      return Oe.call(T);
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
    function La(T, U) {
      return T === U || T !== T && U !== U;
    }
    var Oc = Ia(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? Ia : function(T) {
      return er(T) && ue.call(T, "callee") && !X.call(T, "callee");
    }, Lr = Array.isArray;
    function Dc(T) {
      return T != null && ka(T.length) && !Ua(T);
    }
    var cn = oe || xc;
    function Ic(T, U) {
      return Na(T, U);
    }
    function Ua(T) {
      if (!$a(T))
        return !1;
      var U = Zt(T);
      return U == p || U == y || U == o || U == N;
    }
    function ka(T) {
      return typeof T == "number" && T > -1 && T % 1 == 0 && T <= r;
    }
    function $a(T) {
      var U = typeof T;
      return T != null && (U == "object" || U == "function");
    }
    function er(T) {
      return T != null && typeof T == "object";
    }
    var qa = q ? Me(q) : vc;
    function Nc(T) {
      return Dc(T) ? pc(T) : Ec(T);
    }
    function Fc() {
      return [];
    }
    function xc() {
      return !1;
    }
    i.exports = Ic;
  })(Tr, Tr.exports)), Tr.exports;
}
var ul;
function Qf() {
  if (ul) return Wt;
  ul = 1, Object.defineProperty(Wt, "__esModule", { value: !0 }), Wt.DownloadedUpdateHelper = void 0, Wt.createTempUpdateFile = f;
  const i = Pr, h = Rt, d = Kf(), l = /* @__PURE__ */ Ct(), u = ke;
  let c = class {
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
      return u.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(o, s, t, e) {
      if (this.versionInfo != null && this.file === o && this.fileInfo != null)
        return d(this.versionInfo, s) && d(this.fileInfo.info, t.info) && await (0, l.pathExists)(o) ? o : null;
      const p = await this.getValidCachedUpdateFile(t, e);
      return p === null ? null : (e.info(`Update has already been downloaded to ${o}).`), this._file = p, p);
    }
    async setDownloadedFile(o, s, t, e, p, y) {
      this._file = o, this._packageFile = s, this.versionInfo = t, this.fileInfo = e, this._downloadedFileInfo = {
        fileName: p,
        sha512: e.info.sha512,
        isAdminRightsRequired: e.info.isAdminRightsRequired === !0
      }, y && await (0, l.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, l.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(o, s) {
      const t = this.getUpdateInfoFile();
      if (!await (0, l.pathExists)(t))
        return null;
      let p;
      try {
        p = await (0, l.readJson)(t);
      } catch (_) {
        let A = "No cached update info available";
        return _.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), A += ` (error on read: ${_.message})`), s.info(A), null;
      }
      if (!(p?.fileName !== null))
        return s.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (o.info.sha512 !== p.sha512)
        return s.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p.sha512}, expected: ${o.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const v = u.join(this.cacheDirForPendingUpdate, p.fileName);
      if (!await (0, l.pathExists)(v))
        return s.info("Cached update file doesn't exist"), null;
      const m = await r(v);
      return o.info.sha512 !== m ? (s.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${m}, expected: ${o.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = p, v);
    }
    getUpdateInfoFile() {
      return u.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  Wt.DownloadedUpdateHelper = c;
  function r(a, o = "sha512", s = "base64", t) {
    return new Promise((e, p) => {
      const y = (0, i.createHash)(o);
      y.on("error", p).setEncoding(s), (0, h.createReadStream)(a, {
        ...t,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", p).on("end", () => {
        y.end(), e(y.read());
      }).pipe(y, { end: !1 });
    });
  }
  async function f(a, o, s) {
    let t = 0, e = u.join(o, a);
    for (let p = 0; p < 3; p++)
      try {
        return await (0, l.unlink)(e), e;
      } catch (y) {
        if (y.code === "ENOENT")
          return e;
        s.warn(`Error on remove temp update file: ${y}`), e = u.join(o, `${t++}-${a}`);
      }
    return e;
  }
  return Wt;
}
var sr = {}, Xr = {}, cl;
function Zf() {
  if (cl) return Xr;
  cl = 1, Object.defineProperty(Xr, "__esModule", { value: !0 }), Xr.getAppCacheDir = d;
  const i = ke, h = Zr;
  function d() {
    const l = (0, h.homedir)();
    let u;
    return process.platform === "win32" ? u = process.env.LOCALAPPDATA || i.join(l, "AppData", "Local") : process.platform === "darwin" ? u = i.join(l, "Library", "Caches") : u = process.env.XDG_CACHE_HOME || i.join(l, ".cache"), u;
  }
  return Xr;
}
var fl;
function ed() {
  if (fl) return sr;
  fl = 1, Object.defineProperty(sr, "__esModule", { value: !0 }), sr.ElectronAppAdapter = void 0;
  const i = ke, h = Zf();
  let d = class {
    constructor(u = Ut.app) {
      this.app = u;
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
      return this.isPackaged ? i.join(process.resourcesPath, "app-update.yml") : i.join(this.app.getAppPath(), "dev-app-update.yml");
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
    onQuit(u) {
      this.app.once("quit", (c, r) => u(r));
    }
  };
  return sr.ElectronAppAdapter = d, sr;
}
var ua = {}, dl;
function td() {
  return dl || (dl = 1, (function(i) {
    Object.defineProperty(i, "__esModule", { value: !0 }), i.ElectronHttpExecutor = i.NET_SESSION_NAME = void 0, i.getNetSession = d;
    const h = Ge();
    i.NET_SESSION_NAME = "electron-updater";
    function d() {
      return Ut.session.fromPartition(i.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class l extends h.HttpExecutor {
      constructor(c) {
        super(), this.proxyLoginCallback = c, this.cachedSession = null;
      }
      async download(c, r, f) {
        return await f.cancellationToken.createPromise((a, o, s) => {
          const t = {
            headers: f.headers || void 0,
            redirect: "manual"
          };
          (0, h.configureRequestUrl)(c, t), (0, h.configureRequestOptions)(t), this.doDownload(t, {
            destination: r,
            options: f,
            onCancel: s,
            callback: (e) => {
              e == null ? a(r) : o(e);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(c, r) {
        c.headers && c.headers.Host && (c.host = c.headers.Host, delete c.headers.Host), this.cachedSession == null && (this.cachedSession = d());
        const f = Ut.net.request({
          ...c,
          session: this.cachedSession
        });
        return f.on("response", r), this.proxyLoginCallback != null && f.on("login", this.proxyLoginCallback), f;
      }
      addRedirectHandlers(c, r, f, a, o) {
        c.on("redirect", (s, t, e) => {
          c.abort(), a > this.maxRedirects ? f(this.createMaxRedirectError()) : o(h.HttpExecutor.prepareRedirectUrlOptions(e, r));
        });
      }
    }
    i.ElectronHttpExecutor = l;
  })(ua)), ua;
}
var or = {}, Vt = {}, hl;
function $t() {
  if (hl) return Vt;
  hl = 1, Object.defineProperty(Vt, "__esModule", { value: !0 }), Vt.newBaseUrl = h, Vt.newUrlFromBase = d, Vt.getChannelFilename = l;
  const i = At;
  function h(u) {
    const c = new i.URL(u);
    return c.pathname.endsWith("/") || (c.pathname += "/"), c;
  }
  function d(u, c, r = !1) {
    const f = new i.URL(u, c), a = c.search;
    return a != null && a.length !== 0 ? f.search = a : r && (f.search = `noCache=${Date.now().toString(32)}`), f;
  }
  function l(u) {
    return `${u}.yml`;
  }
  return Vt;
}
var pt = {}, ca, pl;
function Tu() {
  if (pl) return ca;
  pl = 1;
  var i = "[object Symbol]", h = /[\\^$.*+?()[\]{}|]/g, d = RegExp(h.source), l = typeof st == "object" && st && st.Object === Object && st, u = typeof self == "object" && self && self.Object === Object && self, c = l || u || Function("return this")(), r = Object.prototype, f = r.toString, a = c.Symbol, o = a ? a.prototype : void 0, s = o ? o.toString : void 0;
  function t(m) {
    if (typeof m == "string")
      return m;
    if (p(m))
      return s ? s.call(m) : "";
    var _ = m + "";
    return _ == "0" && 1 / m == -1 / 0 ? "-0" : _;
  }
  function e(m) {
    return !!m && typeof m == "object";
  }
  function p(m) {
    return typeof m == "symbol" || e(m) && f.call(m) == i;
  }
  function y(m) {
    return m == null ? "" : t(m);
  }
  function v(m) {
    return m = y(m), m && d.test(m) ? m.replace(h, "\\$&") : m;
  }
  return ca = v, ca;
}
var ml;
function tt() {
  if (ml) return pt;
  ml = 1, Object.defineProperty(pt, "__esModule", { value: !0 }), pt.Provider = void 0, pt.findFile = r, pt.parseUpdateInfo = f, pt.getFileList = a, pt.resolveFiles = o;
  const i = Ge(), h = wa(), d = At, l = $t(), u = Tu();
  let c = class {
    constructor(t) {
      this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
    }
    // By default, the blockmap file is in the same directory as the main file
    // But some providers may have a different blockmap file, so we need to override this method
    getBlockMapFiles(t, e, p, y = null) {
      const v = (0, l.newUrlFromBase)(`${t.pathname}.blockmap`, t);
      return [(0, l.newUrlFromBase)(`${t.pathname.replace(new RegExp(u(p), "g"), e)}.blockmap`, y ? new d.URL(y) : t), v];
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
    httpRequest(t, e, p) {
      return this.executor.request(this.createRequestOptions(t, e), p);
    }
    createRequestOptions(t, e) {
      const p = {};
      return this.requestHeaders == null ? e != null && (p.headers = e) : p.headers = e == null ? this.requestHeaders : { ...this.requestHeaders, ...e }, (0, i.configureRequestUrl)(t, p), p;
    }
  };
  pt.Provider = c;
  function r(s, t, e) {
    var p;
    if (s.length === 0)
      throw (0, i.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const y = s.filter((m) => m.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), v = (p = y.find((m) => [m.url.pathname, m.info.url].some((_) => _.includes(process.arch)))) !== null && p !== void 0 ? p : y.shift();
    return v || (e == null ? s[0] : s.find((m) => !e.some((_) => m.url.pathname.toLowerCase().endsWith(`.${_.toLowerCase()}`))));
  }
  function f(s, t, e) {
    if (s == null)
      throw (0, i.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${e}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let p;
    try {
      p = (0, h.load)(s);
    } catch (y) {
      throw (0, i.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${e}): ${y.stack || y.message}, rawData: ${s}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return p;
  }
  function a(s) {
    const t = s.files;
    if (t != null && t.length > 0)
      return t;
    if (s.path != null)
      return [
        {
          url: s.path,
          sha2: s.sha2,
          sha512: s.sha512
        }
      ];
    throw (0, i.newError)(`No files provided: ${(0, i.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function o(s, t, e = (p) => p) {
    const y = a(s).map((_) => {
      if (_.sha2 == null && _.sha512 == null)
        throw (0, i.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, i.safeStringifyJson)(_)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, l.newUrlFromBase)(e(_.url), t),
        info: _
      };
    }), v = s.packages, m = v == null ? null : v[process.arch] || v.ia32;
    return m != null && (y[0].packageInfo = {
      ...m,
      path: (0, l.newUrlFromBase)(e(m.path), t).href
    }), y;
  }
  return pt;
}
var gl;
function bu() {
  if (gl) return or;
  gl = 1, Object.defineProperty(or, "__esModule", { value: !0 }), or.GenericProvider = void 0;
  const i = Ge(), h = $t(), d = tt();
  let l = class extends d.Provider {
    constructor(c, r, f) {
      super(f), this.configuration = c, this.updater = r, this.baseUrl = (0, h.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const c = this.updater.channel || this.configuration.channel;
      return c == null ? this.getDefaultChannelName() : this.getCustomChannelName(c);
    }
    async getLatestVersion() {
      const c = (0, h.getChannelFilename)(this.channel), r = (0, h.newUrlFromBase)(c, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let f = 0; ; f++)
        try {
          return (0, d.parseUpdateInfo)(await this.httpRequest(r), c, r);
        } catch (a) {
          if (a instanceof i.HttpError && a.statusCode === 404)
            throw (0, i.newError)(`Cannot find channel "${c}" update info: ${a.stack || a.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (a.code === "ECONNREFUSED" && f < 3) {
            await new Promise((o, s) => {
              try {
                setTimeout(o, 1e3 * f);
              } catch (t) {
                s(t);
              }
            });
            continue;
          }
          throw a;
        }
    }
    resolveFiles(c) {
      return (0, d.resolveFiles)(c, this.baseUrl);
    }
  };
  return or.GenericProvider = l, or;
}
var lr = {}, ur = {}, yl;
function rd() {
  if (yl) return ur;
  yl = 1, Object.defineProperty(ur, "__esModule", { value: !0 }), ur.BitbucketProvider = void 0;
  const i = Ge(), h = $t(), d = tt();
  let l = class extends d.Provider {
    constructor(c, r, f) {
      super({
        ...f,
        isUseMultipleRangeRequest: !1
      }), this.configuration = c, this.updater = r;
      const { owner: a, slug: o } = c;
      this.baseUrl = (0, h.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${a}/${o}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const c = new i.CancellationToken(), r = (0, h.getChannelFilename)(this.getCustomChannelName(this.channel)), f = (0, h.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const a = await this.httpRequest(f, void 0, c);
        return (0, d.parseUpdateInfo)(a, r, f);
      } catch (a) {
        throw (0, i.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${a.stack || a.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(c) {
      return (0, d.resolveFiles)(c, this.baseUrl);
    }
    toString() {
      const { owner: c, slug: r } = this.configuration;
      return `Bitbucket (owner: ${c}, slug: ${r}, channel: ${this.channel})`;
    }
  };
  return ur.BitbucketProvider = l, ur;
}
var _t = {}, vl;
function Pu() {
  if (vl) return _t;
  vl = 1, Object.defineProperty(_t, "__esModule", { value: !0 }), _t.GitHubProvider = _t.BaseGitHubProvider = void 0, _t.computeReleaseNotes = o;
  const i = Ge(), h = Cu(), d = At, l = $t(), u = tt(), c = /\/tag\/([^/]+)$/;
  class r extends u.Provider {
    constructor(t, e, p) {
      super({
        ...p,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = t, this.baseUrl = (0, l.newBaseUrl)((0, i.githubUrl)(t, e));
      const y = e === "github.com" ? "api.github.com" : e;
      this.baseApiUrl = (0, l.newBaseUrl)((0, i.githubUrl)(t, y));
    }
    computeGithubBasePath(t) {
      const e = this.options.host;
      return e && !["github.com", "api.github.com"].includes(e) ? `/api/v3${t}` : t;
    }
  }
  _t.BaseGitHubProvider = r;
  let f = class extends r {
    constructor(t, e, p) {
      super(t, "github.com", p), this.options = t, this.updater = e;
    }
    get channel() {
      const t = this.updater.channel || this.options.channel;
      return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
    }
    async getLatestVersion() {
      var t, e, p, y, v;
      const m = new i.CancellationToken(), _ = await this.httpRequest((0, l.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, m), A = (0, i.parseXml)(_);
      let P = A.element("entry", !1, "No published versions on GitHub"), N = null;
      try {
        if (this.updater.allowPrerelease) {
          const w = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((e = h.prerelease(this.updater.currentVersion)) === null || e === void 0 ? void 0 : e[0]) || null;
          if (w === null)
            N = c.exec(P.element("link").attribute("href"))[1];
          else
            for (const $ of A.getElements("entry")) {
              const k = c.exec($.element("link").attribute("href"));
              if (k === null)
                continue;
              const M = k[1], L = ((p = h.prerelease(M)) === null || p === void 0 ? void 0 : p[0]) || null, x = !w || ["alpha", "beta"].includes(w), H = L !== null && !["alpha", "beta"].includes(String(L));
              if (x && !H && !(w === "beta" && L === "alpha")) {
                N = M;
                break;
              }
              if (L && L === w) {
                N = M;
                break;
              }
            }
        } else {
          N = await this.getLatestTagName(m);
          for (const w of A.getElements("entry"))
            if (c.exec(w.element("link").attribute("href"))[1] === N) {
              P = w;
              break;
            }
        }
      } catch (w) {
        throw (0, i.newError)(`Cannot parse releases feed: ${w.stack || w.message},
XML:
${_}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (N == null)
        throw (0, i.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let C, D = "", b = "";
      const S = async (w) => {
        D = (0, l.getChannelFilename)(w), b = (0, l.newUrlFromBase)(this.getBaseDownloadPath(String(N), D), this.baseUrl);
        const $ = this.createRequestOptions(b);
        try {
          return await this.executor.request($, m);
        } catch (k) {
          throw k instanceof i.HttpError && k.statusCode === 404 ? (0, i.newError)(`Cannot find ${D} in the latest release artifacts (${b}): ${k.stack || k.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : k;
        }
      };
      try {
        let w = this.channel;
        this.updater.allowPrerelease && (!((y = h.prerelease(N)) === null || y === void 0) && y[0]) && (w = this.getCustomChannelName(String((v = h.prerelease(N)) === null || v === void 0 ? void 0 : v[0]))), C = await S(w);
      } catch (w) {
        if (this.updater.allowPrerelease)
          C = await S(this.getDefaultChannelName());
        else
          throw w;
      }
      const O = (0, u.parseUpdateInfo)(C, D, b);
      return O.releaseName == null && (O.releaseName = P.elementValueOrEmpty("title")), O.releaseNotes == null && (O.releaseNotes = o(this.updater.currentVersion, this.updater.fullChangelog, A, P)), {
        tag: N,
        ...O
      };
    }
    async getLatestTagName(t) {
      const e = this.options, p = e.host == null || e.host === "github.com" ? (0, l.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new d.URL(`${this.computeGithubBasePath(`/repos/${e.owner}/${e.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const y = await this.httpRequest(p, { Accept: "application/json" }, t);
        return y == null ? null : JSON.parse(y).tag_name;
      } catch (y) {
        throw (0, i.newError)(`Unable to find latest version on GitHub (${p}), please ensure a production release exists: ${y.stack || y.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(t) {
      return (0, u.resolveFiles)(t, this.baseUrl, (e) => this.getBaseDownloadPath(t.tag, e.replace(/ /g, "-")));
    }
    getBaseDownloadPath(t, e) {
      return `${this.basePath}/download/${t}/${e}`;
    }
  };
  _t.GitHubProvider = f;
  function a(s) {
    const t = s.elementValueOrEmpty("content");
    return t === "No content." ? "" : t;
  }
  function o(s, t, e, p) {
    if (!t)
      return a(p);
    const y = [];
    for (const v of e.getElements("entry")) {
      const m = /\/tag\/v?([^/]+)$/.exec(v.element("link").attribute("href"))[1];
      h.valid(m) && h.lt(s, m) && y.push({
        version: m,
        note: a(v)
      });
    }
    return y.sort((v, m) => h.rcompare(v.version, m.version));
  }
  return _t;
}
var cr = {}, El;
function nd() {
  if (El) return cr;
  El = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), cr.GitLabProvider = void 0;
  const i = Ge(), h = At, d = Tu(), l = $t(), u = tt();
  let c = class extends u.Provider {
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
    normalizeFilename(f) {
      return f.replace(/ |_/g, "-");
    }
    constructor(f, a, o) {
      super({
        ...o,
        // GitLab might not support multiple range requests efficiently
        isUseMultipleRangeRequest: !1
      }), this.options = f, this.updater = a, this.cachedLatestVersion = null;
      const t = f.host || "gitlab.com";
      this.baseApiUrl = (0, l.newBaseUrl)(`https://${t}/api/v4`);
    }
    get channel() {
      const f = this.updater.channel || this.options.channel;
      return f == null ? this.getDefaultChannelName() : this.getCustomChannelName(f);
    }
    async getLatestVersion() {
      const f = new i.CancellationToken(), a = (0, l.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
      let o;
      try {
        const A = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, P = await this.httpRequest(a, A, f);
        if (!P)
          throw (0, i.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
        o = JSON.parse(P);
      } catch (A) {
        throw (0, i.newError)(`Unable to find latest release on GitLab (${a}): ${A.stack || A.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
      const s = o.tag_name;
      let t = null, e = "", p = null;
      const y = async (A) => {
        e = (0, l.getChannelFilename)(A);
        const P = o.assets.links.find((C) => C.name === e);
        if (!P)
          throw (0, i.newError)(`Cannot find ${e} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        p = new h.URL(P.direct_asset_url);
        const N = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
        try {
          const C = await this.httpRequest(p, N, f);
          if (!C)
            throw (0, i.newError)(`Empty response from ${p}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          return C;
        } catch (C) {
          throw C instanceof i.HttpError && C.statusCode === 404 ? (0, i.newError)(`Cannot find ${e} in the latest release artifacts (${p}): ${C.stack || C.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : C;
        }
      };
      try {
        t = await y(this.channel);
      } catch (A) {
        if (this.channel !== this.getDefaultChannelName())
          t = await y(this.getDefaultChannelName());
        else
          throw A;
      }
      if (!t)
        throw (0, i.newError)(`Unable to parse channel data from ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
      const v = (0, u.parseUpdateInfo)(t, e, p);
      v.releaseName == null && (v.releaseName = o.name), v.releaseNotes == null && (v.releaseNotes = o.description || null);
      const m = /* @__PURE__ */ new Map();
      for (const A of o.assets.links)
        m.set(this.normalizeFilename(A.name), A.direct_asset_url);
      const _ = {
        tag: s,
        assets: m,
        ...v
      };
      return this.cachedLatestVersion = _, _;
    }
    /**
     * Utility function to convert GitlabReleaseAsset to Map<string, string>
     * Maps asset names to their download URLs
     */
    convertAssetsToMap(f) {
      const a = /* @__PURE__ */ new Map();
      for (const o of f.links)
        a.set(this.normalizeFilename(o.name), o.direct_asset_url);
      return a;
    }
    /**
     * Find blockmap file URL in assets map for a specific filename
     */
    findBlockMapInAssets(f, a) {
      const o = [`${a}.blockmap`, `${this.normalizeFilename(a)}.blockmap`];
      for (const s of o) {
        const t = f.get(s);
        if (t)
          return new h.URL(t);
      }
      return null;
    }
    async fetchReleaseInfoByVersion(f) {
      const a = new i.CancellationToken(), o = [`v${f}`, f];
      for (const s of o) {
        const t = (0, l.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(s)}`, this.baseApiUrl);
        try {
          const e = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, p = await this.httpRequest(t, e, a);
          if (p)
            return JSON.parse(p);
        } catch (e) {
          if (e instanceof i.HttpError && e.statusCode === 404)
            continue;
          throw (0, i.newError)(`Unable to find release ${s} on GitLab (${t}): ${e.stack || e.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
        }
      }
      throw (0, i.newError)(`Unable to find release with version ${f} (tried: ${o.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
    }
    setAuthHeaderForToken(f) {
      const a = {};
      return f != null && (f.startsWith("Bearer") ? a.authorization = f : a["PRIVATE-TOKEN"] = f), a;
    }
    /**
     * Get version info for blockmap files, using cache when possible
     */
    async getVersionInfoForBlockMap(f) {
      if (this.cachedLatestVersion && this.cachedLatestVersion.version === f)
        return this.cachedLatestVersion.assets;
      const a = await this.fetchReleaseInfoByVersion(f);
      return a && a.assets ? this.convertAssetsToMap(a.assets) : null;
    }
    /**
     * Find blockmap URLs from version assets
     */
    async findBlockMapUrlsFromAssets(f, a, o) {
      let s = null, t = null;
      const e = await this.getVersionInfoForBlockMap(a);
      e && (s = this.findBlockMapInAssets(e, o));
      const p = await this.getVersionInfoForBlockMap(f);
      if (p) {
        const y = o.replace(new RegExp(d(a), "g"), f);
        t = this.findBlockMapInAssets(p, y);
      }
      return [t, s];
    }
    async getBlockMapFiles(f, a, o, s = null) {
      if (this.options.uploadTarget === "project_upload") {
        const t = f.pathname.split("/").pop() || "", [e, p] = await this.findBlockMapUrlsFromAssets(a, o, t);
        if (!p)
          throw (0, i.newError)(`Cannot find blockmap file for ${o} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        if (!e)
          throw (0, i.newError)(`Cannot find blockmap file for ${a} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        return [e, p];
      } else
        return super.getBlockMapFiles(f, a, o, s);
    }
    resolveFiles(f) {
      return (0, u.getFileList)(f).map((a) => {
        const s = [
          a.url,
          // Original filename
          this.normalizeFilename(a.url)
          // Normalized filename (spaces/underscores → dashes)
        ].find((e) => f.assets.has(e)), t = s ? f.assets.get(s) : void 0;
        if (!t)
          throw (0, i.newError)(`Cannot find asset "${a.url}" in GitLab release assets. Available assets: ${Array.from(f.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new h.URL(t),
          info: a
        };
      });
    }
    toString() {
      return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
    }
  };
  return cr.GitLabProvider = c, cr;
}
var fr = {}, wl;
function id() {
  if (wl) return fr;
  wl = 1, Object.defineProperty(fr, "__esModule", { value: !0 }), fr.KeygenProvider = void 0;
  const i = Ge(), h = $t(), d = tt();
  let l = class extends d.Provider {
    constructor(c, r, f) {
      super({
        ...f,
        isUseMultipleRangeRequest: !1
      }), this.configuration = c, this.updater = r, this.defaultHostname = "api.keygen.sh";
      const a = this.configuration.host || this.defaultHostname;
      this.baseUrl = (0, h.newBaseUrl)(`https://${a}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const c = new i.CancellationToken(), r = (0, h.getChannelFilename)(this.getCustomChannelName(this.channel)), f = (0, h.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const a = await this.httpRequest(f, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, c);
        return (0, d.parseUpdateInfo)(a, r, f);
      } catch (a) {
        throw (0, i.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${a.stack || a.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(c) {
      return (0, d.resolveFiles)(c, this.baseUrl);
    }
    toString() {
      const { account: c, product: r, platform: f } = this.configuration;
      return `Keygen (account: ${c}, product: ${r}, platform: ${f}, channel: ${this.channel})`;
    }
  };
  return fr.KeygenProvider = l, fr;
}
var dr = {}, _l;
function ad() {
  if (_l) return dr;
  _l = 1, Object.defineProperty(dr, "__esModule", { value: !0 }), dr.PrivateGitHubProvider = void 0;
  const i = Ge(), h = wa(), d = ke, l = At, u = $t(), c = Pu(), r = tt();
  let f = class extends c.BaseGitHubProvider {
    constructor(o, s, t, e) {
      super(o, "api.github.com", e), this.updater = s, this.token = t;
    }
    createRequestOptions(o, s) {
      const t = super.createRequestOptions(o, s);
      return t.redirect = "manual", t;
    }
    async getLatestVersion() {
      const o = new i.CancellationToken(), s = (0, u.getChannelFilename)(this.getDefaultChannelName()), t = await this.getLatestVersionInfo(o), e = t.assets.find((v) => v.name === s);
      if (e == null)
        throw (0, i.newError)(`Cannot find ${s} in the release ${t.html_url || t.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const p = new l.URL(e.url);
      let y;
      try {
        y = (0, h.load)(await this.httpRequest(p, this.configureHeaders("application/octet-stream"), o));
      } catch (v) {
        throw v instanceof i.HttpError && v.statusCode === 404 ? (0, i.newError)(`Cannot find ${s} in the latest release artifacts (${p}): ${v.stack || v.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : v;
      }
      return y.assets = t.assets, y;
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
      const s = this.updater.allowPrerelease;
      let t = this.basePath;
      s || (t = `${t}/latest`);
      const e = (0, u.newUrlFromBase)(t, this.baseUrl);
      try {
        const p = JSON.parse(await this.httpRequest(e, this.configureHeaders("application/vnd.github.v3+json"), o));
        return s ? p.find((y) => y.prerelease) || p[0] : p;
      } catch (p) {
        throw (0, i.newError)(`Unable to find latest version on GitHub (${e}), please ensure a production release exists: ${p.stack || p.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(o) {
      return (0, r.getFileList)(o).map((s) => {
        const t = d.posix.basename(s.url).replace(/ /g, "-"), e = o.assets.find((p) => p != null && p.name === t);
        if (e == null)
          throw (0, i.newError)(`Cannot find asset "${t}" in: ${JSON.stringify(o.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new l.URL(e.url),
          info: s
        };
      });
    }
  };
  return dr.PrivateGitHubProvider = f, dr;
}
var Sl;
function sd() {
  if (Sl) return lr;
  Sl = 1, Object.defineProperty(lr, "__esModule", { value: !0 }), lr.isUrlProbablySupportMultiRangeRequests = f, lr.createClient = a;
  const i = Ge(), h = rd(), d = bu(), l = Pu(), u = nd(), c = id(), r = ad();
  function f(o) {
    return !o.includes("s3.amazonaws.com");
  }
  function a(o, s, t) {
    if (typeof o == "string")
      throw (0, i.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const e = o.provider;
    switch (e) {
      case "github": {
        const p = o, y = (p.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || p.token;
        return y == null ? new l.GitHubProvider(p, s, t) : new r.PrivateGitHubProvider(p, s, y, t);
      }
      case "bitbucket":
        return new h.BitbucketProvider(o, s, t);
      case "gitlab":
        return new u.GitLabProvider(o, s, t);
      case "keygen":
        return new c.KeygenProvider(o, s, t);
      case "s3":
      case "spaces":
        return new d.GenericProvider({
          provider: "generic",
          url: (0, i.getS3LikeProviderBaseUrl)(o),
          channel: o.channel || null
        }, s, {
          ...t,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const p = o;
        return new d.GenericProvider(p, s, {
          ...t,
          isUseMultipleRangeRequest: p.useMultipleRangeRequest !== !1 && f(p.url)
        });
      }
      case "custom": {
        const p = o, y = p.updateProvider;
        if (!y)
          throw (0, i.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new y(p, s, t);
      }
      default:
        throw (0, i.newError)(`Unsupported provider: ${e}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return lr;
}
var hr = {}, pr = {}, Yt = {}, zt = {}, Rl;
function ba() {
  if (Rl) return zt;
  Rl = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.OperationKind = void 0, zt.computeOperations = h;
  var i;
  (function(r) {
    r[r.COPY = 0] = "COPY", r[r.DOWNLOAD = 1] = "DOWNLOAD";
  })(i || (zt.OperationKind = i = {}));
  function h(r, f, a) {
    const o = c(r.files), s = c(f.files);
    let t = null;
    const e = f.files[0], p = [], y = e.name, v = o.get(y);
    if (v == null)
      throw new Error(`no file ${y} in old blockmap`);
    const m = s.get(y);
    let _ = 0;
    const { checksumToOffset: A, checksumToOldSize: P } = u(o.get(y), v.offset, a);
    let N = e.offset;
    for (let C = 0; C < m.checksums.length; N += m.sizes[C], C++) {
      const D = m.sizes[C], b = m.checksums[C];
      let S = A.get(b);
      S != null && P.get(b) !== D && (a.warn(`Checksum ("${b}") matches, but size differs (old: ${P.get(b)}, new: ${D})`), S = void 0), S === void 0 ? (_++, t != null && t.kind === i.DOWNLOAD && t.end === N ? t.end += D : (t = {
        kind: i.DOWNLOAD,
        start: N,
        end: N + D
        // oldBlocks: null,
      }, l(t, p, b, C))) : t != null && t.kind === i.COPY && t.end === S ? t.end += D : (t = {
        kind: i.COPY,
        start: S,
        end: S + D
        // oldBlocks: [checksum]
      }, l(t, p, b, C));
    }
    return _ > 0 && a.info(`File${e.name === "file" ? "" : " " + e.name} has ${_} changed blocks`), p;
  }
  const d = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function l(r, f, a, o) {
    if (d && f.length !== 0) {
      const s = f[f.length - 1];
      if (s.kind === r.kind && r.start < s.end && r.start > s.start) {
        const t = [s.start, s.end, r.start, r.end].reduce((e, p) => e < p ? e : p);
        throw new Error(`operation (block index: ${o}, checksum: ${a}, kind: ${i[r.kind]}) overlaps previous operation (checksum: ${a}):
abs: ${s.start} until ${s.end} and ${r.start} until ${r.end}
rel: ${s.start - t} until ${s.end - t} and ${r.start - t} until ${r.end - t}`);
      }
    }
    f.push(r);
  }
  function u(r, f, a) {
    const o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
    let t = f;
    for (let e = 0; e < r.checksums.length; e++) {
      const p = r.checksums[e], y = r.sizes[e], v = s.get(p);
      if (v === void 0)
        o.set(p, t), s.set(p, y);
      else if (a.debug != null) {
        const m = v === y ? "(same size)" : `(size: ${v}, this size: ${y})`;
        a.debug(`${p} duplicated in blockmap ${m}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      t += y;
    }
    return { checksumToOffset: o, checksumToOldSize: s };
  }
  function c(r) {
    const f = /* @__PURE__ */ new Map();
    for (const a of r)
      f.set(a.name, a);
    return f;
  }
  return zt;
}
var Al;
function Ou() {
  if (Al) return Yt;
  Al = 1, Object.defineProperty(Yt, "__esModule", { value: !0 }), Yt.DataSplitter = void 0, Yt.copyData = r;
  const i = Ge(), h = Rt, d = br, l = ba(), u = Buffer.from(`\r
\r
`);
  var c;
  (function(a) {
    a[a.INIT = 0] = "INIT", a[a.HEADER = 1] = "HEADER", a[a.BODY = 2] = "BODY";
  })(c || (c = {}));
  function r(a, o, s, t, e) {
    const p = (0, h.createReadStream)("", {
      fd: s,
      autoClose: !1,
      start: a.start,
      // end is inclusive
      end: a.end - 1
    });
    p.on("error", t), p.once("end", e), p.pipe(o, {
      end: !1
    });
  }
  let f = class extends d.Writable {
    constructor(o, s, t, e, p, y, v, m) {
      super(), this.out = o, this.options = s, this.partIndexToTaskIndex = t, this.partIndexToLength = p, this.finishHandler = y, this.grandTotalBytes = v, this.onProgress = m, this.start = Date.now(), this.nextUpdate = this.start + 1e3, this.transferred = 0, this.delta = 0, this.partIndex = -1, this.headerListBuffer = null, this.readState = c.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = e.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(o, s, t) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${o.length} bytes`);
        return;
      }
      this.handleData(o).then(() => {
        if (this.onProgress) {
          const e = Date.now();
          (e >= this.nextUpdate || this.transferred === this.grandTotalBytes) && this.grandTotalBytes && (e - this.start) / 1e3 && (this.nextUpdate = e + 1e3, this.onProgress({
            total: this.grandTotalBytes,
            delta: this.delta,
            transferred: this.transferred,
            percent: this.transferred / this.grandTotalBytes * 100,
            bytesPerSecond: Math.round(this.transferred / ((e - this.start) / 1e3))
          }), this.delta = 0);
        }
        t();
      }).catch(t);
    }
    async handleData(o) {
      let s = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, i.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const t = Math.min(this.ignoreByteCount, o.length);
        this.ignoreByteCount -= t, s = t;
      } else if (this.remainingPartDataCount > 0) {
        const t = Math.min(this.remainingPartDataCount, o.length);
        this.remainingPartDataCount -= t, await this.processPartData(o, 0, t), s = t;
      }
      if (s !== o.length) {
        if (this.readState === c.HEADER) {
          const t = this.searchHeaderListEnd(o, s);
          if (t === -1)
            return;
          s = t, this.readState = c.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === c.BODY)
            this.readState = c.INIT;
          else {
            this.partIndex++;
            let y = this.partIndexToTaskIndex.get(this.partIndex);
            if (y == null)
              if (this.isFinished)
                y = this.options.end;
              else
                throw (0, i.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const v = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (v < y)
              await this.copyExistingData(v, y);
            else if (v > y)
              throw (0, i.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (s = this.searchHeaderListEnd(o, s), s === -1) {
              this.readState = c.HEADER;
              return;
            }
          }
          const t = this.partIndexToLength[this.partIndex], e = s + t, p = Math.min(e, o.length);
          if (await this.processPartStarted(o, s, p), this.remainingPartDataCount = t - (p - s), this.remainingPartDataCount > 0)
            return;
          if (s = e + this.boundaryLength, s >= o.length) {
            this.ignoreByteCount = this.boundaryLength - (o.length - e);
            return;
          }
        }
      }
    }
    copyExistingData(o, s) {
      return new Promise((t, e) => {
        const p = () => {
          if (o === s) {
            t();
            return;
          }
          const y = this.options.tasks[o];
          if (y.kind !== l.OperationKind.COPY) {
            e(new Error("Task kind must be COPY"));
            return;
          }
          r(y, this.out, this.options.oldFileFd, e, () => {
            o++, p();
          });
        };
        p();
      });
    }
    searchHeaderListEnd(o, s) {
      const t = o.indexOf(u, s);
      if (t !== -1)
        return t + u.length;
      const e = s === 0 ? o : o.slice(s);
      return this.headerListBuffer == null ? this.headerListBuffer = e : this.headerListBuffer = Buffer.concat([this.headerListBuffer, e]), -1;
    }
    onPartEnd() {
      const o = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== o)
        throw (0, i.newError)(`Expected length: ${o} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(o, s, t) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(o, s, t);
    }
    processPartData(o, s, t) {
      this.actualPartLength += t - s, this.transferred += t - s, this.delta += t - s;
      const e = this.out;
      return e.write(s === 0 && o.length === t ? o : o.slice(s, t)) ? Promise.resolve() : new Promise((p, y) => {
        e.on("error", y), e.once("drain", () => {
          e.removeListener("error", y), p();
        });
      });
    }
  };
  return Yt.DataSplitter = f, Yt;
}
var mr = {}, Cl;
function od() {
  if (Cl) return mr;
  Cl = 1, Object.defineProperty(mr, "__esModule", { value: !0 }), mr.executeTasksUsingMultipleRangeRequests = l, mr.checkIsRangesSupported = c;
  const i = Ge(), h = Ou(), d = ba();
  function l(r, f, a, o, s) {
    const t = (e) => {
      if (e >= f.length) {
        r.fileMetadataBuffer != null && a.write(r.fileMetadataBuffer), a.end();
        return;
      }
      const p = e + 1e3;
      u(r, {
        tasks: f,
        start: e,
        end: Math.min(f.length, p),
        oldFileFd: o
      }, a, () => t(p), s);
    };
    return t;
  }
  function u(r, f, a, o, s) {
    let t = "bytes=", e = 0, p = 0;
    const y = /* @__PURE__ */ new Map(), v = [];
    for (let A = f.start; A < f.end; A++) {
      const P = f.tasks[A];
      P.kind === d.OperationKind.DOWNLOAD && (t += `${P.start}-${P.end - 1}, `, y.set(e, A), e++, v.push(P.end - P.start), p += P.end - P.start);
    }
    if (e <= 1) {
      const A = (P) => {
        if (P >= f.end) {
          o();
          return;
        }
        const N = f.tasks[P++];
        if (N.kind === d.OperationKind.COPY)
          (0, h.copyData)(N, a, f.oldFileFd, s, () => A(P));
        else {
          const C = r.createRequestOptions();
          C.headers.Range = `bytes=${N.start}-${N.end - 1}`;
          const D = r.httpExecutor.createRequest(C, (b) => {
            b.on("error", s), c(b, s) && (b.pipe(a, {
              end: !1
            }), b.once("end", () => A(P)));
          });
          r.httpExecutor.addErrorAndTimeoutHandlers(D, s), D.end();
        }
      };
      A(f.start);
      return;
    }
    const m = r.createRequestOptions();
    m.headers.Range = t.substring(0, t.length - 2);
    const _ = r.httpExecutor.createRequest(m, (A) => {
      if (!c(A, s))
        return;
      const P = (0, i.safeGetHeader)(A, "content-type"), N = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(P);
      if (N == null) {
        s(new Error(`Content-Type "multipart/byteranges" is expected, but got "${P}"`));
        return;
      }
      const C = new h.DataSplitter(a, f, y, N[1] || N[2], v, o, p, r.options.onProgress);
      C.on("error", s), A.pipe(C), A.on("end", () => {
        setTimeout(() => {
          _.abort(), s(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    r.httpExecutor.addErrorAndTimeoutHandlers(_, s), _.end();
  }
  function c(r, f) {
    if (r.statusCode >= 400)
      return f((0, i.createHttpError)(r)), !1;
    if (r.statusCode !== 206) {
      const a = (0, i.safeGetHeader)(r, "accept-ranges");
      if (a == null || a === "none")
        return f(new Error(`Server doesn't support Accept-Ranges (response code ${r.statusCode})`)), !1;
    }
    return !0;
  }
  return mr;
}
var gr = {}, Tl;
function ld() {
  if (Tl) return gr;
  Tl = 1, Object.defineProperty(gr, "__esModule", { value: !0 }), gr.ProgressDifferentialDownloadCallbackTransform = void 0;
  const i = br;
  var h;
  (function(l) {
    l[l.COPY = 0] = "COPY", l[l.DOWNLOAD = 1] = "DOWNLOAD";
  })(h || (h = {}));
  let d = class extends i.Transform {
    constructor(u, c, r) {
      super(), this.progressDifferentialDownloadInfo = u, this.cancellationToken = c, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = h.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(u, c, r) {
      if (this.cancellationToken.cancelled) {
        r(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == h.COPY) {
        r(null, u);
        return;
      }
      this.transferred += u.length, this.delta += u.length;
      const f = Date.now();
      f >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = f + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((f - this.start) / 1e3))
      }), this.delta = 0), r(null, u);
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
    _flush(u) {
      if (this.cancellationToken.cancelled) {
        u(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, u(null);
    }
  };
  return gr.ProgressDifferentialDownloadCallbackTransform = d, gr;
}
var bl;
function Du() {
  if (bl) return pr;
  bl = 1, Object.defineProperty(pr, "__esModule", { value: !0 }), pr.DifferentialDownloader = void 0;
  const i = Ge(), h = /* @__PURE__ */ Ct(), d = Rt, l = Ou(), u = At, c = ba(), r = od(), f = ld();
  let a = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(e, p, y) {
      this.blockAwareFileInfo = e, this.httpExecutor = p, this.options = y, this.fileMetadataBuffer = null, this.logger = y.logger;
    }
    createRequestOptions() {
      const e = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, i.configureRequestUrl)(this.options.newUrl, e), (0, i.configureRequestOptions)(e), e;
    }
    doDownload(e, p) {
      if (e.version !== p.version)
        throw new Error(`version is different (${e.version} - ${p.version}), full download is required`);
      const y = this.logger, v = (0, c.computeOperations)(e, p, y);
      y.debug != null && y.debug(JSON.stringify(v, null, 2));
      let m = 0, _ = 0;
      for (const P of v) {
        const N = P.end - P.start;
        P.kind === c.OperationKind.DOWNLOAD ? m += N : _ += N;
      }
      const A = this.blockAwareFileInfo.size;
      if (m + _ + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== A)
        throw new Error(`Internal error, size mismatch: downloadSize: ${m}, copySize: ${_}, newSize: ${A}`);
      return y.info(`Full: ${o(A)}, To download: ${o(m)} (${Math.round(m / (A / 100))}%)`), this.downloadFile(v);
    }
    downloadFile(e) {
      const p = [], y = () => Promise.all(p.map((v) => (0, h.close)(v.descriptor).catch((m) => {
        this.logger.error(`cannot close file "${v.path}": ${m}`);
      })));
      return this.doDownloadFile(e, p).then(y).catch((v) => y().catch((m) => {
        try {
          this.logger.error(`cannot close files: ${m}`);
        } catch (_) {
          try {
            console.error(_);
          } catch {
          }
        }
        throw v;
      }).then(() => {
        throw v;
      }));
    }
    async doDownloadFile(e, p) {
      const y = await (0, h.open)(this.options.oldFile, "r");
      p.push({ descriptor: y, path: this.options.oldFile });
      const v = await (0, h.open)(this.options.newFile, "w");
      p.push({ descriptor: v, path: this.options.newFile });
      const m = (0, d.createWriteStream)(this.options.newFile, { fd: v });
      await new Promise((_, A) => {
        const P = [];
        let N;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const k = [];
          let M = 0;
          for (const x of e)
            x.kind === c.OperationKind.DOWNLOAD && (k.push(x.end - x.start), M += x.end - x.start);
          const L = {
            expectedByteCounts: k,
            grandTotal: M
          };
          N = new f.ProgressDifferentialDownloadCallbackTransform(L, this.options.cancellationToken, this.options.onProgress), P.push(N);
        }
        const C = new i.DigestTransform(this.blockAwareFileInfo.sha512);
        C.isValidateOnEnd = !1, P.push(C), m.on("finish", () => {
          m.close(() => {
            p.splice(1, 1);
            try {
              C.validate();
            } catch (k) {
              A(k);
              return;
            }
            _(void 0);
          });
        }), P.push(m);
        let D = null;
        for (const k of P)
          k.on("error", A), D == null ? D = k : D = D.pipe(k);
        const b = P[0];
        let S;
        if (this.options.isUseMultipleRangeRequest) {
          S = (0, r.executeTasksUsingMultipleRangeRequests)(this, e, b, y, A), S(0);
          return;
        }
        let O = 0, w = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const $ = this.createRequestOptions();
        $.redirect = "manual", S = (k) => {
          var M, L;
          if (k >= e.length) {
            this.fileMetadataBuffer != null && b.write(this.fileMetadataBuffer), b.end();
            return;
          }
          const x = e[k++];
          if (x.kind === c.OperationKind.COPY) {
            N && N.beginFileCopy(), (0, l.copyData)(x, b, y, A, () => S(k));
            return;
          }
          const H = `bytes=${x.start}-${x.end - 1}`;
          $.headers.range = H, (L = (M = this.logger) === null || M === void 0 ? void 0 : M.debug) === null || L === void 0 || L.call(M, `download range: ${H}`), N && N.beginRangeDownload();
          const F = this.httpExecutor.createRequest($, (G) => {
            G.on("error", A), G.on("aborted", () => {
              A(new Error("response has been aborted by the server"));
            }), G.statusCode >= 400 && A((0, i.createHttpError)(G)), G.pipe(b, {
              end: !1
            }), G.once("end", () => {
              N && N.endRangeDownload(), ++O === 100 ? (O = 0, setTimeout(() => S(k), 1e3)) : S(k);
            });
          });
          F.on("redirect", (G, Y, ee) => {
            this.logger.info(`Redirect to ${s(ee)}`), w = ee, (0, i.configureRequestUrl)(new u.URL(w), $), F.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(F, A), F.end();
        }, S(0);
      });
    }
    async readRemoteBytes(e, p) {
      const y = Buffer.allocUnsafe(p + 1 - e), v = this.createRequestOptions();
      v.headers.range = `bytes=${e}-${p}`;
      let m = 0;
      if (await this.request(v, (_) => {
        _.copy(y, m), m += _.length;
      }), m !== y.length)
        throw new Error(`Received data length ${m} is not equal to expected ${y.length}`);
      return y;
    }
    request(e, p) {
      return new Promise((y, v) => {
        const m = this.httpExecutor.createRequest(e, (_) => {
          (0, r.checkIsRangesSupported)(_, v) && (_.on("error", v), _.on("aborted", () => {
            v(new Error("response has been aborted by the server"));
          }), _.on("data", p), _.on("end", () => y()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(m, v), m.end();
      });
    }
  };
  pr.DifferentialDownloader = a;
  function o(t, e = " KB") {
    return new Intl.NumberFormat("en").format((t / 1024).toFixed(2)) + e;
  }
  function s(t) {
    const e = t.indexOf("?");
    return e < 0 ? t : t.substring(0, e);
  }
  return pr;
}
var Pl;
function ud() {
  if (Pl) return hr;
  Pl = 1, Object.defineProperty(hr, "__esModule", { value: !0 }), hr.GenericDifferentialDownloader = void 0;
  const i = Du();
  let h = class extends i.DifferentialDownloader {
    download(l, u) {
      return this.doDownload(l, u);
    }
  };
  return hr.GenericDifferentialDownloader = h, hr;
}
var fa = {}, Ol;
function qt() {
  return Ol || (Ol = 1, (function(i) {
    Object.defineProperty(i, "__esModule", { value: !0 }), i.UpdaterSignal = i.UPDATE_DOWNLOADED = i.DOWNLOAD_PROGRESS = i.CancellationToken = void 0, i.addHandler = l;
    const h = Ge();
    Object.defineProperty(i, "CancellationToken", { enumerable: !0, get: function() {
      return h.CancellationToken;
    } }), i.DOWNLOAD_PROGRESS = "download-progress", i.UPDATE_DOWNLOADED = "update-downloaded";
    class d {
      constructor(c) {
        this.emitter = c;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(c) {
        l(this.emitter, "login", c);
      }
      progress(c) {
        l(this.emitter, i.DOWNLOAD_PROGRESS, c);
      }
      updateDownloaded(c) {
        l(this.emitter, i.UPDATE_DOWNLOADED, c);
      }
      updateCancelled(c) {
        l(this.emitter, "update-cancelled", c);
      }
    }
    i.UpdaterSignal = d;
    function l(u, c, r) {
      u.on(c, r);
    }
  })(fa)), fa;
}
var Dl;
function Pa() {
  if (Dl) return Nt;
  Dl = 1, Object.defineProperty(Nt, "__esModule", { value: !0 }), Nt.NoOpLogger = Nt.AppUpdater = void 0;
  const i = Ge(), h = Pr, d = Zr, l = Kl, u = /* @__PURE__ */ Ct(), c = wa(), r = Tf(), f = ke, a = Cu(), o = Qf(), s = ed(), t = td(), e = bu(), p = sd(), y = Zl, v = ud(), m = qt();
  let _ = class Iu extends l.EventEmitter {
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
    set channel(C) {
      if (this._channel != null) {
        if (typeof C != "string")
          throw (0, i.newError)(`Channel must be a string, but got: ${C}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (C.length === 0)
          throw (0, i.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = C, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(C) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: C
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
    set logger(C) {
      this._logger = C ?? new P();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(C) {
      this.clientPromise = null, this._appUpdateConfigPath = C, this.configOnDisk = new r.Lazy(() => this.loadUpdateConfig());
    }
    /**
     * Allows developer to override default logic for determining if an update is supported.
     * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
     */
    get isUpdateSupported() {
      return this._isUpdateSupported;
    }
    set isUpdateSupported(C) {
      C && (this._isUpdateSupported = C);
    }
    /**
     * Allows developer to override default logic for determining if the user is below the rollout threshold.
     * The default logic compares the staging percentage with numerical representation of user ID.
     * An override can define custom logic, or bypass it if needed.
     */
    get isUserWithinRollout() {
      return this._isUserWithinRollout;
    }
    set isUserWithinRollout(C) {
      C && (this._isUserWithinRollout = C);
    }
    constructor(C, D) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new m.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (O) => this.checkIfUpdateSupported(O), this._isUserWithinRollout = (O) => this.isStagingMatch(O), this.clientPromise = null, this.stagingUserIdPromise = new r.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new r.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (O) => {
        this._logger.error(`Error: ${O.stack || O.message}`);
      }), D == null ? (this.app = new s.ElectronAppAdapter(), this.httpExecutor = new t.ElectronHttpExecutor((O, w) => this.emit("login", O, w))) : (this.app = D, this.httpExecutor = null);
      const b = this.app.version, S = (0, a.parse)(b);
      if (S == null)
        throw (0, i.newError)(`App version is not a valid semver version: "${b}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = S, this.allowPrerelease = A(S), C != null && (this.setFeedURL(C), typeof C != "string" && C.requestHeaders && (this.requestHeaders = C.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(C) {
      const D = this.createProviderRuntimeOptions();
      let b;
      typeof C == "string" ? b = new e.GenericProvider({ provider: "generic", url: C }, this, {
        ...D,
        isUseMultipleRangeRequest: (0, p.isUrlProbablySupportMultiRangeRequests)(C)
      }) : b = (0, p.createClient)(C, this, D), this.clientPromise = Promise.resolve(b);
    }
    /**
     * Asks the server whether there is an update.
     * @returns null if the updater is disabled, otherwise info about the latest version
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let C = this.checkForUpdatesPromise;
      if (C != null)
        return this._logger.info("Checking for update (already in progress)"), C;
      const D = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), C = this.doCheckForUpdates().then((b) => (D(), b)).catch((b) => {
        throw D(), this.emit("error", b, `Cannot check for updates: ${(b.stack || b).toString()}`), b;
      }), this.checkForUpdatesPromise = C, C;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(C) {
      return this.checkForUpdates().then((D) => D?.downloadPromise ? (D.downloadPromise.then(() => {
        const b = Iu.formatDownloadNotification(D.updateInfo.version, this.app.name, C);
        new Ut.Notification(b).show();
      }), D) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), D));
    }
    static formatDownloadNotification(C, D, b) {
      return b == null && (b = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), b = {
        title: b.title.replace("{appName}", D).replace("{version}", C),
        body: b.body.replace("{appName}", D).replace("{version}", C)
      }, b;
    }
    async isStagingMatch(C) {
      const D = C.stagingPercentage;
      let b = D;
      if (b == null)
        return !0;
      if (b = parseInt(b, 10), isNaN(b))
        return this._logger.warn(`Staging percentage is NaN: ${D}`), !0;
      b = b / 100;
      const S = await this.stagingUserIdPromise.value, w = i.UUID.parse(S).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${b}, percentage: ${w}, user id: ${S}`), w < b;
    }
    computeFinalHeaders(C) {
      return this.requestHeaders != null && Object.assign(C, this.requestHeaders), C;
    }
    async isUpdateAvailable(C) {
      const D = (0, a.parse)(C.version);
      if (D == null)
        throw (0, i.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${C.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const b = this.currentVersion;
      if ((0, a.eq)(D, b) || !await Promise.resolve(this.isUpdateSupported(C)) || !await Promise.resolve(this.isUserWithinRollout(C)))
        return !1;
      const O = (0, a.gt)(D, b), w = (0, a.lt)(D, b);
      return O ? !0 : this.allowDowngrade && w;
    }
    checkIfUpdateSupported(C) {
      const D = C?.minimumSystemVersion, b = (0, d.release)();
      if (D)
        try {
          if ((0, a.lt)(b, D))
            return this._logger.info(`Current OS version ${b} is less than the minimum OS version required ${D} for version ${b}`), !1;
        } catch (S) {
          this._logger.warn(`Failed to compare current OS version(${b}) with minimum OS version(${D}): ${(S.message || S).toString()}`);
        }
      return !0;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((b) => (0, p.createClient)(b, this, this.createProviderRuntimeOptions())));
      const C = await this.clientPromise, D = await this.stagingUserIdPromise.value;
      return C.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": D })), {
        info: await C.getLatestVersion(),
        provider: C
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
      const C = await this.getUpdateInfoAndProvider(), D = C.info;
      if (!await this.isUpdateAvailable(D))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${D.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", D), {
          isUpdateAvailable: !1,
          versionInfo: D,
          updateInfo: D
        };
      this.updateInfoAndProvider = C, this.onUpdateAvailable(D);
      const b = new i.CancellationToken();
      return {
        isUpdateAvailable: !0,
        versionInfo: D,
        updateInfo: D,
        cancellationToken: b,
        downloadPromise: this.autoDownload ? this.downloadUpdate(b) : null
      };
    }
    onUpdateAvailable(C) {
      this._logger.info(`Found version ${C.version} (url: ${(0, i.asArray)(C.files).map((D) => D.url).join(", ")})`), this.emit("update-available", C);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(C = new i.CancellationToken()) {
      const D = this.updateInfoAndProvider;
      if (D == null) {
        const S = new Error("Please check update first");
        return this.dispatchError(S), Promise.reject(S);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, i.asArray)(D.info.files).map((S) => S.url).join(", ")}`);
      const b = (S) => {
        if (!(S instanceof i.CancellationError))
          try {
            this.dispatchError(S);
          } catch (O) {
            this._logger.warn(`Cannot dispatch error event: ${O.stack || O}`);
          }
        return S;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: D,
        requestHeaders: this.computeRequestHeaders(D.provider),
        cancellationToken: C,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((S) => {
        throw b(S);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(C) {
      this.emit("error", C, (C.stack || C).toString());
    }
    dispatchUpdateDownloaded(C) {
      this.emit(m.UPDATE_DOWNLOADED, C);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, c.load)(await (0, u.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(C) {
      const D = C.fileExtraDownloadHeaders;
      if (D != null) {
        const b = this.requestHeaders;
        return b == null ? D : {
          ...D,
          ...b
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const C = f.join(this.app.userDataPath, ".updaterId");
      try {
        const b = await (0, u.readFile)(C, "utf-8");
        if (i.UUID.check(b))
          return b;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${b}`);
      } catch (b) {
        b.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${b}`);
      }
      const D = i.UUID.v5((0, h.randomBytes)(4096), i.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${D}`);
      try {
        await (0, u.outputFile)(C, D);
      } catch (b) {
        this._logger.warn(`Couldn't write out staging user ID: ${b}`);
      }
      return D;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const C = this.requestHeaders;
      if (C == null)
        return !0;
      for (const D of Object.keys(C)) {
        const b = D.toLowerCase();
        if (b === "authorization" || b === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let C = this.downloadedUpdateHelper;
      if (C == null) {
        const D = (await this.configOnDisk.value).updaterCacheDirName, b = this._logger;
        D == null && b.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const S = f.join(this.app.baseCachePath, D || this.app.name);
        b.debug != null && b.debug(`updater cache dir: ${S}`), C = new o.DownloadedUpdateHelper(S), this.downloadedUpdateHelper = C;
      }
      return C;
    }
    async executeDownload(C) {
      const D = C.fileInfo, b = {
        headers: C.downloadUpdateOptions.requestHeaders,
        cancellationToken: C.downloadUpdateOptions.cancellationToken,
        sha2: D.info.sha2,
        sha512: D.info.sha512
      };
      this.listenerCount(m.DOWNLOAD_PROGRESS) > 0 && (b.onProgress = (Z) => this.emit(m.DOWNLOAD_PROGRESS, Z));
      const S = C.downloadUpdateOptions.updateInfoAndProvider.info, O = S.version, w = D.packageInfo;
      function $() {
        const Z = decodeURIComponent(C.fileInfo.url.pathname);
        return Z.toLowerCase().endsWith(`.${C.fileExtension.toLowerCase()}`) ? f.basename(Z) : C.fileInfo.info.url;
      }
      const k = await this.getOrCreateDownloadHelper(), M = k.cacheDirForPendingUpdate;
      await (0, u.mkdir)(M, { recursive: !0 });
      const L = $();
      let x = f.join(M, L);
      const H = w == null ? null : f.join(M, `package-${O}${f.extname(w.path) || ".7z"}`), F = async (Z) => {
        await k.setDownloadedFile(x, H, S, D, L, Z), await C.done({
          ...S,
          downloadedFile: x
        });
        const ve = f.join(M, "current.blockmap");
        return await (0, u.pathExists)(ve) && await (0, u.copyFile)(ve, f.join(k.cacheDir, "current.blockmap")), H == null ? [x] : [x, H];
      }, G = this._logger, Y = await k.validateDownloadedPath(x, S, D, G);
      if (Y != null)
        return x = Y, await F(!1);
      const ee = async () => (await k.clear().catch(() => {
      }), await (0, u.unlink)(x).catch(() => {
      })), me = await (0, o.createTempUpdateFile)(`temp-${L}`, M, G);
      try {
        await C.task(me, b, H, ee), await (0, i.retry)(() => (0, u.rename)(me, x), {
          retries: 60,
          interval: 500,
          shouldRetry: (Z) => Z instanceof Error && /^EBUSY:/.test(Z.message) ? !0 : (G.warn(`Cannot rename temp file to final file: ${Z.message || Z.stack}`), !1)
        });
      } catch (Z) {
        throw await ee(), Z instanceof i.CancellationError && (G.info("cancelled"), this.emit("update-cancelled", S)), Z;
      }
      return G.info(`New version ${O} has been downloaded to ${x}`), await F(!0);
    }
    async differentialDownloadInstaller(C, D, b, S, O) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const w = D.updateInfoAndProvider.provider, $ = await w.getBlockMapFiles(C.url, this.app.version, D.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
        this._logger.info(`Download block maps (old: "${$[0]}", new: ${$[1]})`);
        const k = async (G) => {
          const Y = await this.httpExecutor.downloadToBuffer(G, {
            headers: D.requestHeaders,
            cancellationToken: D.cancellationToken
          });
          if (Y == null || Y.length === 0)
            throw new Error(`Blockmap "${G.href}" is empty`);
          try {
            return JSON.parse((0, y.gunzipSync)(Y).toString());
          } catch (ee) {
            throw new Error(`Cannot parse blockmap "${G.href}", error: ${ee}`);
          }
        }, M = {
          newUrl: C.url,
          oldFile: f.join(this.downloadedUpdateHelper.cacheDir, O),
          logger: this._logger,
          newFile: b,
          isUseMultipleRangeRequest: w.isUseMultipleRangeRequest,
          requestHeaders: D.requestHeaders,
          cancellationToken: D.cancellationToken
        };
        this.listenerCount(m.DOWNLOAD_PROGRESS) > 0 && (M.onProgress = (G) => this.emit(m.DOWNLOAD_PROGRESS, G));
        const L = async (G, Y) => {
          const ee = f.join(Y, "current.blockmap");
          await (0, u.outputFile)(ee, (0, y.gzipSync)(JSON.stringify(G)));
        }, x = async (G) => {
          const Y = f.join(G, "current.blockmap");
          try {
            if (await (0, u.pathExists)(Y))
              return JSON.parse((0, y.gunzipSync)(await (0, u.readFile)(Y)).toString());
          } catch (ee) {
            this._logger.warn(`Cannot parse blockmap "${Y}", error: ${ee}`);
          }
          return null;
        }, H = await k($[1]);
        await L(H, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
        let F = await x(this.downloadedUpdateHelper.cacheDir);
        return F == null && (F = await k($[0])), await new v.GenericDifferentialDownloader(C.info, this.httpExecutor, M).download(F, H), !1;
      } catch (w) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${w.stack || w}`), this._testOnlyOptions != null)
          throw w;
        return !0;
      }
    }
  };
  Nt.AppUpdater = _;
  function A(N) {
    const C = (0, a.prerelease)(N);
    return C != null && C.length > 0;
  }
  class P {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(C) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(C) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(C) {
    }
  }
  return Nt.NoOpLogger = P, Nt;
}
var Il;
function ln() {
  if (Il) return rr;
  Il = 1, Object.defineProperty(rr, "__esModule", { value: !0 }), rr.BaseUpdater = void 0;
  const i = Qr, h = Pa();
  let d = class extends h.AppUpdater {
    constructor(u, c) {
      super(u, c), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(u = !1, c = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(u, u ? c : this.autoRunAppAfterInstall) ? setImmediate(() => {
        Ut.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(u) {
      return super.executeDownload({
        ...u,
        done: (c) => (this.dispatchUpdateDownloaded(c), this.addQuitHandler(), Promise.resolve())
      });
    }
    get installerPath() {
      return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
    }
    // must be sync (because quit even handler is not async)
    install(u = !1, c = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const r = this.downloadedUpdateHelper, f = this.installerPath, a = r == null ? null : r.downloadedFileInfo;
      if (f == null || a == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${u}, isForceRunAfter: ${c}`), this.doInstall({
          isSilent: u,
          isForceRunAfter: c,
          isAdminRightsRequired: a.isAdminRightsRequired
        });
      } catch (o) {
        return this.dispatchError(o), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((u) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (u !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${u}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    spawnSyncLog(u, c = [], r = {}) {
      this._logger.info(`Executing: ${u} with args: ${c}`);
      const f = (0, i.spawnSync)(u, c, {
        env: { ...process.env, ...r },
        encoding: "utf-8",
        shell: !0
      }), { error: a, status: o, stdout: s, stderr: t } = f;
      if (a != null)
        throw this._logger.error(t), a;
      if (o != null && o !== 0)
        throw this._logger.error(t), new Error(`Command ${u} exited with code ${o}`);
      return s.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(u, c = [], r = void 0, f = "ignore") {
      return this._logger.info(`Executing: ${u} with args: ${c}`), new Promise((a, o) => {
        try {
          const s = { stdio: f, env: r, detached: !0 }, t = (0, i.spawn)(u, c, s);
          t.on("error", (e) => {
            o(e);
          }), t.unref(), t.pid !== void 0 && a(!0);
        } catch (s) {
          o(s);
        }
      });
    }
  };
  return rr.BaseUpdater = d, rr;
}
var yr = {}, vr = {}, Nl;
function Nu() {
  if (Nl) return vr;
  Nl = 1, Object.defineProperty(vr, "__esModule", { value: !0 }), vr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const i = /* @__PURE__ */ Ct(), h = Du(), d = Zl;
  let l = class extends h.DifferentialDownloader {
    async download() {
      const f = this.blockAwareFileInfo, a = f.size, o = a - (f.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(o, a - 1);
      const s = u(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await c(this.options.oldFile), s);
    }
  };
  vr.FileWithEmbeddedBlockMapDifferentialDownloader = l;
  function u(r) {
    return JSON.parse((0, d.inflateRawSync)(r).toString());
  }
  async function c(r) {
    const f = await (0, i.open)(r, "r");
    try {
      const a = (await (0, i.fstat)(f)).size, o = Buffer.allocUnsafe(4);
      await (0, i.read)(f, o, 0, o.length, a - o.length);
      const s = Buffer.allocUnsafe(o.readUInt32BE(0));
      return await (0, i.read)(f, s, 0, s.length, a - o.length - s.length), await (0, i.close)(f), u(s);
    } catch (a) {
      throw await (0, i.close)(f), a;
    }
  }
  return vr;
}
var Fl;
function xl() {
  if (Fl) return yr;
  Fl = 1, Object.defineProperty(yr, "__esModule", { value: !0 }), yr.AppImageUpdater = void 0;
  const i = Ge(), h = Qr, d = /* @__PURE__ */ Ct(), l = Rt, u = ke, c = ln(), r = Nu(), f = tt(), a = qt();
  let o = class extends c.BaseUpdater {
    constructor(t, e) {
      super(t, e);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(t) {
      const e = t.updateInfoAndProvider.provider, p = (0, f.findFile)(e.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: p,
        downloadUpdateOptions: t,
        task: async (y, v) => {
          const m = process.env.APPIMAGE;
          if (m == null)
            throw (0, i.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          (t.disableDifferentialDownload || await this.downloadDifferential(p, m, y, e, t)) && await this.httpExecutor.download(p.url, y, v), await (0, d.chmod)(y, 493);
        }
      });
    }
    async downloadDifferential(t, e, p, y, v) {
      try {
        const m = {
          newUrl: t.url,
          oldFile: e,
          logger: this._logger,
          newFile: p,
          isUseMultipleRangeRequest: y.isUseMultipleRangeRequest,
          requestHeaders: v.requestHeaders,
          cancellationToken: v.cancellationToken
        };
        return this.listenerCount(a.DOWNLOAD_PROGRESS) > 0 && (m.onProgress = (_) => this.emit(a.DOWNLOAD_PROGRESS, _)), await new r.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, m).download(), !1;
      } catch (m) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${m.stack || m}`), process.platform === "linux";
      }
    }
    doInstall(t) {
      const e = process.env.APPIMAGE;
      if (e == null)
        throw (0, i.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, l.unlinkSync)(e);
      let p;
      const y = u.basename(e), v = this.installerPath;
      if (v == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      u.basename(v) === y || !/\d+\.\d+\.\d+/.test(y) ? p = e : p = u.join(u.dirname(e), u.basename(v)), (0, h.execFileSync)("mv", ["-f", v, p]), p !== e && this.emit("appimage-filename-updated", p);
      const m = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return t.isForceRunAfter ? this.spawnLog(p, [], m) : (m.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, h.execFileSync)(p, [], { env: m })), !0;
    }
  };
  return yr.AppImageUpdater = o, yr;
}
var Er = {}, wr = {}, Ll;
function Oa() {
  if (Ll) return wr;
  Ll = 1, Object.defineProperty(wr, "__esModule", { value: !0 }), wr.LinuxUpdater = void 0;
  const i = ln();
  let h = class extends i.BaseUpdater {
    constructor(l, u) {
      super(l, u);
    }
    /**
     * Returns true if the current process is running as root.
     */
    isRunningAsRoot() {
      var l;
      return ((l = process.getuid) === null || l === void 0 ? void 0 : l.call(process)) === 0;
    }
    /**
     * Sanitizies the installer path for using with command line tools.
     */
    get installerPath() {
      var l, u;
      return (u = (l = super.installerPath) === null || l === void 0 ? void 0 : l.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && u !== void 0 ? u : null;
    }
    runCommandWithSudoIfNeeded(l) {
      if (this.isRunningAsRoot())
        return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(l[0], l.slice(1));
      const { name: u } = this.app, c = `"${u} would like to update"`, r = this.sudoWithArgs(c);
      this._logger.info(`Running as non-root user, using sudo to install: ${r}`);
      let f = '"';
      return (/pkexec/i.test(r[0]) || r[0] === "sudo") && (f = ""), this.spawnSyncLog(r[0], [...r.length > 1 ? r.slice(1) : [], `${f}/bin/bash`, "-c", `'${l.join(" ")}'${f}`]);
    }
    sudoWithArgs(l) {
      const u = this.determineSudoCommand(), c = [u];
      return /kdesudo/i.test(u) ? (c.push("--comment", l), c.push("-c")) : /gksudo/i.test(u) ? c.push("--message", l) : /pkexec/i.test(u) && c.push("--disable-internal-agent"), c;
    }
    hasCommand(l) {
      try {
        return this.spawnSyncLog("command", ["-v", l]), !0;
      } catch {
        return !1;
      }
    }
    determineSudoCommand() {
      const l = ["gksudo", "kdesudo", "pkexec", "beesu"];
      for (const u of l)
        if (this.hasCommand(u))
          return u;
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
    detectPackageManager(l) {
      var u;
      const c = (u = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || u === void 0 ? void 0 : u.trim();
      if (c)
        return c;
      for (const r of l)
        if (this.hasCommand(r))
          return r;
      return this._logger.warn(`No package manager found in the list: ${l.join(", ")}. Defaulting to the first one: ${l[0]}`), l[0];
    }
  };
  return wr.LinuxUpdater = h, wr;
}
var Ul;
function kl() {
  if (Ul) return Er;
  Ul = 1, Object.defineProperty(Er, "__esModule", { value: !0 }), Er.DebUpdater = void 0;
  const i = tt(), h = qt(), d = Oa();
  let l = class Fu extends d.LinuxUpdater {
    constructor(c, r) {
      super(c, r);
    }
    /*** @private */
    doDownloadUpdate(c) {
      const r = c.updateInfoAndProvider.provider, f = (0, i.findFile)(r.resolveFiles(c.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: f,
        downloadUpdateOptions: c,
        task: async (a, o) => {
          this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(h.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(f.url, a, o);
        }
      });
    }
    doInstall(c) {
      const r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
        return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
      const f = ["dpkg", "apt"], a = this.detectPackageManager(f);
      try {
        Fu.installWithCommandRunner(a, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (o) {
        return this.dispatchError(o), !1;
      }
      return c.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(c, r, f, a) {
      var o;
      if (c === "dpkg")
        try {
          f(["dpkg", "-i", r]);
        } catch (s) {
          a.warn((o = s.message) !== null && o !== void 0 ? o : s), a.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), f(["apt-get", "install", "-f", "-y"]);
        }
      else if (c === "apt")
        a.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), f([
          "apt",
          "install",
          "-y",
          "--allow-unauthenticated",
          // needed for unsigned .debs
          "--allow-downgrades",
          // allow lower version installs
          "--allow-change-held-packages",
          r
        ]);
      else
        throw new Error(`Package manager ${c} not supported`);
    }
  };
  return Er.DebUpdater = l, Er;
}
var _r = {}, $l;
function ql() {
  if ($l) return _r;
  $l = 1, Object.defineProperty(_r, "__esModule", { value: !0 }), _r.PacmanUpdater = void 0;
  const i = qt(), h = tt(), d = Oa();
  let l = class xu extends d.LinuxUpdater {
    constructor(c, r) {
      super(c, r);
    }
    /*** @private */
    doDownloadUpdate(c) {
      const r = c.updateInfoAndProvider.provider, f = (0, h.findFile)(r.resolveFiles(c.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
      return this.executeDownload({
        fileExtension: "pacman",
        fileInfo: f,
        downloadUpdateOptions: c,
        task: async (a, o) => {
          this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(i.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(f.url, a, o);
        }
      });
    }
    doInstall(c) {
      const r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      try {
        xu.installWithCommandRunner(r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (f) {
        return this.dispatchError(f), !1;
      }
      return c.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(c, r, f) {
      var a;
      try {
        r(["pacman", "-U", "--noconfirm", c]);
      } catch (o) {
        f.warn((a = o.message) !== null && a !== void 0 ? a : o), f.warn("pacman installation failed, attempting to update package database and retry");
        try {
          r(["pacman", "-Sy", "--noconfirm"]), r(["pacman", "-U", "--noconfirm", c]);
        } catch (s) {
          throw f.error("Retry after pacman -Sy failed"), s;
        }
      }
    }
  };
  return _r.PacmanUpdater = l, _r;
}
var Sr = {}, Ml;
function Bl() {
  if (Ml) return Sr;
  Ml = 1, Object.defineProperty(Sr, "__esModule", { value: !0 }), Sr.RpmUpdater = void 0;
  const i = qt(), h = tt(), d = Oa();
  let l = class Lu extends d.LinuxUpdater {
    constructor(c, r) {
      super(c, r);
    }
    /*** @private */
    doDownloadUpdate(c) {
      const r = c.updateInfoAndProvider.provider, f = (0, h.findFile)(r.resolveFiles(c.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: f,
        downloadUpdateOptions: c,
        task: async (a, o) => {
          this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(i.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(f.url, a, o);
        }
      });
    }
    doInstall(c) {
      const r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const f = ["zypper", "dnf", "yum", "rpm"], a = this.detectPackageManager(f);
      try {
        Lu.installWithCommandRunner(a, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (o) {
        return this.dispatchError(o), !1;
      }
      return c.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(c, r, f, a) {
      if (c === "zypper")
        return f(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", r]);
      if (c === "dnf")
        return f(["dnf", "install", "--nogpgcheck", "-y", r]);
      if (c === "yum")
        return f(["yum", "install", "--nogpgcheck", "-y", r]);
      if (c === "rpm")
        return a.warn("Installing with rpm only (no dependency resolution)."), f(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", r]);
      throw new Error(`Package manager ${c} not supported`);
    }
  };
  return Sr.RpmUpdater = l, Sr;
}
var Rr = {}, jl;
function Hl() {
  if (jl) return Rr;
  jl = 1, Object.defineProperty(Rr, "__esModule", { value: !0 }), Rr.MacUpdater = void 0;
  const i = Ge(), h = /* @__PURE__ */ Ct(), d = Rt, l = ke, u = kc, c = Pa(), r = tt(), f = Qr, a = Pr;
  let o = class extends c.AppUpdater {
    constructor(t, e) {
      super(t, e), this.nativeUpdater = Ut.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (p) => {
        this._logger.warn(p), this.emit("error", p);
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
      let e = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
      const p = this._logger, y = "sysctl.proc_translated";
      let v = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), v = (0, f.execFileSync)("sysctl", [y], { encoding: "utf8" }).includes(`${y}: 1`), p.info(`Checked for macOS Rosetta environment (isRosetta=${v})`);
      } catch (C) {
        p.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${C}`);
      }
      let m = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const D = (0, f.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        p.info(`Checked 'uname -a': arm64=${D}`), m = m || D;
      } catch (C) {
        p.warn(`uname shell command to check for arm64 failed: ${C}`);
      }
      m = m || process.arch === "arm64" || v;
      const _ = (C) => {
        var D;
        return C.url.pathname.includes("arm64") || ((D = C.info.url) === null || D === void 0 ? void 0 : D.includes("arm64"));
      };
      m && e.some(_) ? e = e.filter((C) => m === _(C)) : e = e.filter((C) => !_(C));
      const A = (0, r.findFile)(e, "zip", ["pkg", "dmg"]);
      if (A == null)
        throw (0, i.newError)(`ZIP file not provided: ${(0, i.safeStringifyJson)(e)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const P = t.updateInfoAndProvider.provider, N = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: A,
        downloadUpdateOptions: t,
        task: async (C, D) => {
          const b = l.join(this.downloadedUpdateHelper.cacheDir, N), S = () => (0, h.pathExistsSync)(b) ? !t.disableDifferentialDownload : (p.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let O = !0;
          S() && (O = await this.differentialDownloadInstaller(A, t, C, P, N)), O && await this.httpExecutor.download(A.url, C, D);
        },
        done: async (C) => {
          if (!t.disableDifferentialDownload)
            try {
              const D = l.join(this.downloadedUpdateHelper.cacheDir, N);
              await (0, h.copyFile)(C.downloadedFile, D);
            } catch (D) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${D.message}`);
            }
          return this.updateDownloaded(A, C);
        }
      });
    }
    async updateDownloaded(t, e) {
      var p;
      const y = e.downloadedFile, v = (p = t.info.size) !== null && p !== void 0 ? p : (await (0, h.stat)(y)).size, m = this._logger, _ = `fileToProxy=${t.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${_})`), this.server = (0, u.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${_})`), this.server.on("close", () => {
        m.info(`Proxy server for native Squirrel.Mac is closed (${_})`);
      });
      const A = (P) => {
        const N = P.address();
        return typeof N == "string" ? N : `http://127.0.0.1:${N?.port}`;
      };
      return await new Promise((P, N) => {
        const C = (0, a.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), D = Buffer.from(`autoupdater:${C}`, "ascii"), b = `/${(0, a.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (S, O) => {
          const w = S.url;
          if (m.info(`${w} requested`), w === "/") {
            if (!S.headers.authorization || S.headers.authorization.indexOf("Basic ") === -1) {
              O.statusCode = 401, O.statusMessage = "Invalid Authentication Credentials", O.end(), m.warn("No authenthication info");
              return;
            }
            const M = S.headers.authorization.split(" ")[1], L = Buffer.from(M, "base64").toString("ascii"), [x, H] = L.split(":");
            if (x !== "autoupdater" || H !== C) {
              O.statusCode = 401, O.statusMessage = "Invalid Authentication Credentials", O.end(), m.warn("Invalid authenthication credentials");
              return;
            }
            const F = Buffer.from(`{ "url": "${A(this.server)}${b}" }`);
            O.writeHead(200, { "Content-Type": "application/json", "Content-Length": F.length }), O.end(F);
            return;
          }
          if (!w.startsWith(b)) {
            m.warn(`${w} requested, but not supported`), O.writeHead(404), O.end();
            return;
          }
          m.info(`${b} requested by Squirrel.Mac, pipe ${y}`);
          let $ = !1;
          O.on("finish", () => {
            $ || (this.nativeUpdater.removeListener("error", N), P([]));
          });
          const k = (0, d.createReadStream)(y);
          k.on("error", (M) => {
            try {
              O.end();
            } catch (L) {
              m.warn(`cannot end response: ${L}`);
            }
            $ = !0, this.nativeUpdater.removeListener("error", N), N(new Error(`Cannot pipe "${y}": ${M}`));
          }), O.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": v
          }), k.pipe(O);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${_})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${A(this.server)}, ${_})`), this.nativeUpdater.setFeedURL({
            url: A(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${D.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(e), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", N), this.nativeUpdater.checkForUpdates()) : P([]);
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
  return Rr.MacUpdater = o, Rr;
}
var Ar = {}, Jr = {}, Gl;
function cd() {
  if (Gl) return Jr;
  Gl = 1, Object.defineProperty(Jr, "__esModule", { value: !0 }), Jr.verifySignature = c;
  const i = Ge(), h = Qr, d = Zr, l = ke;
  function u(o, s) {
    return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", o], {
      shell: !0,
      timeout: s
    }];
  }
  function c(o, s, t) {
    return new Promise((e, p) => {
      const y = s.replace(/'/g, "''");
      t.info(`Verifying signature ${y}`), (0, h.execFile)(...u(`"Get-AuthenticodeSignature -LiteralPath '${y}' | ConvertTo-Json -Compress"`, 20 * 1e3), (v, m, _) => {
        var A;
        try {
          if (v != null || _) {
            f(t, v, _, p), e(null);
            return;
          }
          const P = r(m);
          if (P.Status === 0) {
            try {
              const b = l.normalize(P.Path), S = l.normalize(s);
              if (t.info(`LiteralPath: ${b}. Update Path: ${S}`), b !== S) {
                f(t, new Error(`LiteralPath of ${b} is different than ${S}`), _, p), e(null);
                return;
              }
            } catch (b) {
              t.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(A = b.message) !== null && A !== void 0 ? A : b.stack}`);
            }
            const C = (0, i.parseDn)(P.SignerCertificate.Subject);
            let D = !1;
            for (const b of o) {
              const S = (0, i.parseDn)(b);
              if (S.size ? D = Array.from(S.keys()).every((w) => S.get(w) === C.get(w)) : b === C.get("CN") && (t.warn(`Signature validated using only CN ${b}. Please add your full Distinguished Name (DN) to publisherNames configuration`), D = !0), D) {
                e(null);
                return;
              }
            }
          }
          const N = `publisherNames: ${o.join(" | ")}, raw info: ` + JSON.stringify(P, (C, D) => C === "RawData" ? void 0 : D, 2);
          t.warn(`Sign verification failed, installer signed with incorrect certificate: ${N}`), e(N);
        } catch (P) {
          f(t, P, null, p), e(null);
          return;
        }
      });
    });
  }
  function r(o) {
    const s = JSON.parse(o);
    delete s.PrivateKey, delete s.IsOSBinary, delete s.SignatureType;
    const t = s.SignerCertificate;
    return t != null && (delete t.Archived, delete t.Extensions, delete t.Handle, delete t.HasPrivateKey, delete t.SubjectName), s;
  }
  function f(o, s, t, e) {
    if (a()) {
      o.warn(`Cannot execute Get-AuthenticodeSignature: ${s || t}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, h.execFileSync)(...u("ConvertTo-Json test", 10 * 1e3));
    } catch (p) {
      o.warn(`Cannot execute ConvertTo-Json: ${p.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    s != null && e(s), t && e(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${t}. Failing signature validation due to unknown stderr.`));
  }
  function a() {
    const o = d.release();
    return o.startsWith("6.") && !o.startsWith("6.3");
  }
  return Jr;
}
var Wl;
function Vl() {
  if (Wl) return Ar;
  Wl = 1, Object.defineProperty(Ar, "__esModule", { value: !0 }), Ar.NsisUpdater = void 0;
  const i = Ge(), h = ke, d = ln(), l = Nu(), u = qt(), c = tt(), r = /* @__PURE__ */ Ct(), f = cd(), a = At;
  let o = class extends d.BaseUpdater {
    constructor(t, e) {
      super(t, e), this._verifyUpdateCodeSignature = (p, y) => (0, f.verifySignature)(p, y, this._logger);
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
      const e = t.updateInfoAndProvider.provider, p = (0, c.findFile)(e.resolveFiles(t.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: t,
        fileInfo: p,
        task: async (y, v, m, _) => {
          const A = p.packageInfo, P = A != null && m != null;
          if (P && t.disableWebInstaller)
            throw (0, i.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !P && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (P || t.disableDifferentialDownload || await this.differentialDownloadInstaller(p, t, y, e, i.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(p.url, y, v);
          const N = await this.verifySignature(y);
          if (N != null)
            throw await _(), (0, i.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${N}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (P && await this.differentialDownloadWebPackage(t, A, m, e))
            try {
              await this.httpExecutor.download(new a.URL(A.path), m, {
                headers: t.requestHeaders,
                cancellationToken: t.cancellationToken,
                sha512: A.sha512
              });
            } catch (C) {
              try {
                await (0, r.unlink)(m);
              } catch {
              }
              throw C;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(t) {
      let e;
      try {
        if (e = (await this.configOnDisk.value).publisherName, e == null)
          return null;
      } catch (p) {
        if (p.code === "ENOENT")
          return null;
        throw p;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(e) ? e : [e], t);
    }
    doInstall(t) {
      const e = this.installerPath;
      if (e == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const p = ["--updated"];
      t.isSilent && p.push("/S"), t.isForceRunAfter && p.push("--force-run"), this.installDirectory && p.push(`/D=${this.installDirectory}`);
      const y = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      y != null && p.push(`--package-file=${y}`);
      const v = () => {
        this.spawnLog(h.join(process.resourcesPath, "elevate.exe"), [e].concat(p)).catch((m) => this.dispatchError(m));
      };
      return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), v(), !0) : (this.spawnLog(e, p).catch((m) => {
        const _ = m.code;
        this._logger.info(`Cannot run installer: error code: ${_}, error message: "${m.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), _ === "UNKNOWN" || _ === "EACCES" ? v() : _ === "ENOENT" ? Ut.shell.openPath(e).catch((A) => this.dispatchError(A)) : this.dispatchError(m);
      }), !0);
    }
    async differentialDownloadWebPackage(t, e, p, y) {
      if (e.blockMapSize == null)
        return !0;
      try {
        const v = {
          newUrl: new a.URL(e.path),
          oldFile: h.join(this.downloadedUpdateHelper.cacheDir, i.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: p,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: y.isUseMultipleRangeRequest,
          cancellationToken: t.cancellationToken
        };
        this.listenerCount(u.DOWNLOAD_PROGRESS) > 0 && (v.onProgress = (m) => this.emit(u.DOWNLOAD_PROGRESS, m)), await new l.FileWithEmbeddedBlockMapDifferentialDownloader(e, this.httpExecutor, v).download();
      } catch (v) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${v.stack || v}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return Ar.NsisUpdater = o, Ar;
}
var Yl;
function fd() {
  return Yl || (Yl = 1, (function(i) {
    var h = It && It.__createBinding || (Object.create ? (function(m, _, A, P) {
      P === void 0 && (P = A);
      var N = Object.getOwnPropertyDescriptor(_, A);
      (!N || ("get" in N ? !_.__esModule : N.writable || N.configurable)) && (N = { enumerable: !0, get: function() {
        return _[A];
      } }), Object.defineProperty(m, P, N);
    }) : (function(m, _, A, P) {
      P === void 0 && (P = A), m[P] = _[A];
    })), d = It && It.__exportStar || function(m, _) {
      for (var A in m) A !== "default" && !Object.prototype.hasOwnProperty.call(_, A) && h(_, m, A);
    };
    Object.defineProperty(i, "__esModule", { value: !0 }), i.NsisUpdater = i.MacUpdater = i.RpmUpdater = i.PacmanUpdater = i.DebUpdater = i.AppImageUpdater = i.Provider = i.NoOpLogger = i.AppUpdater = i.BaseUpdater = void 0;
    const l = /* @__PURE__ */ Ct(), u = ke;
    var c = ln();
    Object.defineProperty(i, "BaseUpdater", { enumerable: !0, get: function() {
      return c.BaseUpdater;
    } });
    var r = Pa();
    Object.defineProperty(i, "AppUpdater", { enumerable: !0, get: function() {
      return r.AppUpdater;
    } }), Object.defineProperty(i, "NoOpLogger", { enumerable: !0, get: function() {
      return r.NoOpLogger;
    } });
    var f = tt();
    Object.defineProperty(i, "Provider", { enumerable: !0, get: function() {
      return f.Provider;
    } });
    var a = xl();
    Object.defineProperty(i, "AppImageUpdater", { enumerable: !0, get: function() {
      return a.AppImageUpdater;
    } });
    var o = kl();
    Object.defineProperty(i, "DebUpdater", { enumerable: !0, get: function() {
      return o.DebUpdater;
    } });
    var s = ql();
    Object.defineProperty(i, "PacmanUpdater", { enumerable: !0, get: function() {
      return s.PacmanUpdater;
    } });
    var t = Bl();
    Object.defineProperty(i, "RpmUpdater", { enumerable: !0, get: function() {
      return t.RpmUpdater;
    } });
    var e = Hl();
    Object.defineProperty(i, "MacUpdater", { enumerable: !0, get: function() {
      return e.MacUpdater;
    } });
    var p = Vl();
    Object.defineProperty(i, "NsisUpdater", { enumerable: !0, get: function() {
      return p.NsisUpdater;
    } }), d(qt(), i);
    let y;
    function v() {
      if (process.platform === "win32")
        y = new (Vl()).NsisUpdater();
      else if (process.platform === "darwin")
        y = new (Hl()).MacUpdater();
      else {
        y = new (xl()).AppImageUpdater();
        try {
          const m = u.join(process.resourcesPath, "package-type");
          if (!(0, l.existsSync)(m))
            return y;
          switch ((0, l.readFileSync)(m).toString().trim()) {
            case "deb":
              y = new (kl()).DebUpdater();
              break;
            case "rpm":
              y = new (Bl()).RpmUpdater();
              break;
            case "pacman":
              y = new (ql()).PacmanUpdater();
              break;
            default:
              break;
          }
        } catch (m) {
          console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", m.message);
        }
      }
      return y;
    }
    Object.defineProperty(i, "autoUpdater", {
      enumerable: !0,
      get: () => y || v()
    });
  })(It)), It;
}
var gt = fd();
gt.autoUpdater.autoDownload = !1;
gt.autoUpdater.autoInstallOnAppQuit = !0;
gt.autoUpdater.on("update-available", (i) => {
  pe && pe.webContents.send("update:available", i);
});
gt.autoUpdater.on("download-progress", (i) => {
  pe && pe.webContents.send("update:progress", i);
});
gt.autoUpdater.on("update-downloaded", () => {
  pe && pe.webContents.send("update:downloaded");
});
gt.autoUpdater.on("error", (i) => {
  pe && pe.webContents.send("update:error", i.message);
});
Se.on("update:download", () => gt.autoUpdater.downloadUpdate());
Se.on("update:install", () => gt.autoUpdater.quitAndInstall());
const Uu = we.dirname(Lc(import.meta.url));
process.env.APP_ROOT = we.join(Uu, "..");
const ha = process.env.VITE_DEV_SERVER_URL, sh = we.join(process.env.APP_ROOT, "dist-electron"), ku = we.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = ha ? we.join(process.env.APP_ROOT, "public") : ku;
let pe, Re = null, ut = null, ct = null;
const $u = He.requestSingleInstanceLock();
$u || He.quit();
function St(i) {
  return He.isPackaged ? we.join(process.resourcesPath, "_internal", i) : we.join(process.env.APP_ROOT, "..", i);
}
function mt() {
  if (process.platform === "win32") {
    const i = we.join(Xt.homedir(), "AppData", "Local", "Programs", "Thonny", "python.exe");
    return fe.existsSync(i) ? i : "python";
  }
  try {
    return eu("python3 --version", { stdio: "ignore" }), "python3";
  } catch {
    return "python";
  }
}
function dd(i) {
  if (!i) return "";
  try {
    return Kr.isEncryptionAvailable() ? `enc:${Kr.encryptString(i).toString("base64")}` : (console.warn("[Security] safeStorage not available. Storing in plain-text."), i);
  } catch (h) {
    return console.error("[Security] Encryption failed:", h), i;
  }
}
function zl(i) {
  if (!i || !i.startsWith("enc:")) return i;
  try {
    if (Kr.isEncryptionAvailable()) {
      const h = i.substring(4), d = Buffer.from(h, "base64");
      return Kr.decryptString(d);
    }
    return i;
  } catch (h) {
    return console.error("[Security] Decryption failed:", h), i;
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
    icon: He.isPackaged ? we.join(process.resourcesPath, "icon.ico") : we.join(process.env.VITE_PUBLIC, "icon.ico"),
    webPreferences: {
      preload: we.join(Uu, "preload.js"),
      // Vite plugin-electron compiles preload.ts to .js
      contextIsolation: !0,
      // Security requirement
      nodeIntegration: !1
    }
  }), pe.webContents.on("did-finish-load", () => {
    pe?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), ha ? pe.loadURL(ha) : pe.loadFile(we.join(ku, "index.html"));
}
async function Lt() {
  return new Promise((i) => {
    if (!Re) return i(!0);
    const h = Re;
    Re = null, h.isOpen ? h.close((d) => {
      d && console.error("[Serial] Error closing port:", d), setTimeout(() => i(!0), 200);
    }) : i(!0);
  });
}
async function Cr(i, h) {
  return await Lt(), await h();
}
function hd() {
  Se.handle("dialog:openFolder", async () => {
    const { canceled: h, filePaths: d } = await fn.showOpenDialog({
      properties: ["openDirectory"]
    });
    return h ? null : d[0];
  }), Se.handle("dialog:openFile", async () => {
    const { canceled: h, filePaths: d } = await fn.showOpenDialog({
      properties: ["openFile"],
      filters: [
        { name: "Code Files", extensions: ["py", "js", "ts", "json", "html", "css", "md", "txt", "c", "cpp", "h", "hpp"] },
        { name: "All Files", extensions: ["*"] }
      ]
    });
    if (!h && d.length > 0)
      try {
        const l = d[0], u = fe.readFileSync(l, "utf-8");
        return {
          path: l,
          name: we.basename(l),
          content: u
        };
      } catch (l) {
        return { error: l.message };
      }
    return null;
  }), Se.handle("fs:readDir", async (h, { dirPath: d }) => {
    try {
      return fe.existsSync(d) ? fe.statSync(d).isDirectory() ? fe.readdirSync(d).map((c) => {
        const r = we.join(d, c);
        let f = !1;
        try {
          f = fe.statSync(r).isDirectory();
        } catch {
        }
        return {
          id: r,
          name: c,
          type: f ? "folder" : "file",
          filePath: r,
          children: f ? [] : void 0
          // Empty array signifies an unloaded folder
        };
      }).sort((c, r) => c.type === r.type ? c.name.localeCompare(r.name) : c.type === "folder" ? -1 : 1) : [] : [];
    } catch {
      return [];
    }
  }), Se.handle("fs:readFile", async (h, { filePath: d }) => {
    try {
      return { content: fe.readFileSync(d, "utf-8") };
    } catch {
      return null;
    }
  }), Se.handle("fs:createFile", async (h, { filePath: d, content: l = "" }) => {
    try {
      return fe.writeFileSync(d, l, "utf-8"), { success: !0 };
    } catch (u) {
      return { success: !1, message: u.message };
    }
  }), Se.handle("fs:createFolder", async (h, { folderPath: d }) => {
    try {
      return fe.mkdirSync(d, { recursive: !0 }), { success: !0 };
    } catch (l) {
      return { success: !1, message: l.message };
    }
  }), Se.handle("fs:delete", async (h, { filePath: d }) => {
    try {
      return fe.rmSync(d, { recursive: !0, force: !0 }), { success: !0 };
    } catch (l) {
      return { success: !1, message: l.message };
    }
  }), Se.handle("fs:deleteSafe", async (h, { filePath: d }) => {
    try {
      return fe.existsSync(d) ? (await Ba.trashItem(d), { success: !0 }) : { success: !0 };
    } catch (l) {
      try {
        return fe.rmSync(d, { recursive: !0, force: !0 }), { success: !0 };
      } catch (u) {
        return { success: !1, message: l.message + " | " + u.message };
      }
    }
  }), Se.handle("fs:exists", async (h, { filePath: d }) => {
    try {
      return { success: !0, exists: fe.existsSync(d) };
    } catch (l) {
      return { success: !1, message: l.message };
    }
  }), Se.handle("fs:writeFile", async (h, { filePath: d, content: l }) => {
    try {
      const u = we.dirname(d);
      return fe.existsSync(u) || fe.mkdirSync(u, { recursive: !0 }), fe.writeFileSync(d, l, "utf-8"), { success: !0 };
    } catch (u) {
      return { success: !1, message: u.message };
    }
  }), Se.handle("fs:readDeep", async (h, { folderPath: d }) => {
    const l = /* @__PURE__ */ new Set(["node_modules", ".git", "__pycache__", "venv", ".venv", "build", "dist", ".idea", ".vscode"]), u = 50 * 1024, c = [];
    async function r(f) {
      try {
        const a = await fe.promises.readdir(f, { withFileTypes: !0 });
        for (const o of a) {
          if (l.has(o.name) || o.name.startsWith(".")) continue;
          const s = we.join(f, o.name);
          if (o.isDirectory())
            await r(s);
          else if (o.isFile()) {
            const t = we.extname(o.name).toLowerCase();
            if ([".exe", ".dll", ".png", ".jpg", ".jpeg", ".gif", ".bin", ".uf2", ".zip", ".tar", ".gz", ".pdf", ".mp4", ".mp3"].includes(t) || (await fe.promises.stat(s)).size > u) continue;
            const y = await fe.promises.readFile(s, "utf-8");
            c.push({ path: we.relative(d, s), content: y });
          }
        }
      } catch {
      }
    }
    return await r(d), c;
  }), Se.handle("fs:rename", async (h, { oldPath: d, newPath: l }) => {
    try {
      return fe.renameSync(d, l), { success: !0 };
    } catch (u) {
      return { success: !1, message: u.message };
    }
  }), Se.handle("saveApiSettings", async (h, d) => {
    try {
      const l = we.join(He.getPath("userData"), "config");
      fe.existsSync(l) || fe.mkdirSync(l, { recursive: !0 });
      const u = we.join(l, "settings.json"), c = {
        ...d,
        apiKey: dd(d.apiKey),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      return fe.writeFileSync(u, JSON.stringify(c, null, 2), "utf-8"), { success: !0, path: u };
    } catch (l) {
      return { success: !1, message: l.message };
    }
  }), Se.handle("loadApiSettings", async () => {
    try {
      const h = we.join(He.getPath("userData"), "config", "settings.json");
      if (!fe.existsSync(h)) return null;
      const d = fe.readFileSync(h, "utf-8"), l = JSON.parse(d);
      return {
        ...l,
        apiKey: zl(l.apiKey)
      };
    } catch {
      return null;
    }
  }), Se.handle("resetApiSettings", async () => {
    try {
      const h = we.join(He.getPath("userData"), "config", "settings.json");
      return fe.existsSync(h) && fe.unlinkSync(h), { success: !0 };
    } catch (h) {
      return { success: !1, message: h.message };
    }
  }), Se.handle("hardware:listPorts", async () => new Promise((h) => {
    jt(
      `"${mt()}" -c "import json,serial.tools.list_ports;print(json.dumps([{'path':p.device,'description':p.description or '','manufacturer':p.manufacturer or ''} for p in serial.tools.list_ports.comports()]))"`,
      { timeout: 1e4 },
      (d, l) => {
        if (d) {
          h([]);
          return;
        }
        try {
          const u = JSON.parse(l.trim());
          h(u);
        } catch {
          console.error(
            "[ElectroAI] Could not parse port list. stdout:",
            l
          ), h([]);
        }
      }
    );
  })), Se.handle("hardware:checkChip", async (h, { port: d }) => (await Lt(), new Promise((l) => {
    let u = !1;
    const c = (s) => {
      u || (u = !0, l(s));
    }, r = da(mt(), [
      "-c",
      `
import serial, sys, time
try:
    s = serial.Serial('${d}', 115200, timeout=2)
    time.sleep(0.3)
    s.close()
    print('ok')
    sys.stdout.flush()
except Exception as e:
    print('fail:' + str(e), file=sys.stderr)
    sys.stderr.flush()
    sys.exit(1)
`
    ]);
    let f = "", a = "";
    r.stdout.on("data", (s) => f += s.toString()), r.stderr.on("data", (s) => a += s.toString()), r.on("error", (s) => {
      console.error("[ElectroAI] spawn error:", s.message), c({
        connected: !1,
        message: "Python not found. Install Python and pyserial."
      });
    }), r.on("close", (s) => {
      if (console.log(
        `[ElectroAI] checkChip python exited code=${s}, stdout="${f.trim()}", stderr="${a.trim()}"`
      ), f.trim() === "ok")
        c({ connected: !0 });
      else {
        const t = a.trim() || `Could not open ${d}. Check USB cable, drivers, and close other serial tools.`;
        c({ connected: !1, message: t });
      }
    });
    const o = setTimeout(() => {
      r.kill(), c({
        connected: !1,
        message: `Timeout — no response from ${d}.`
      });
    }, 8e3);
    r.on("close", () => clearTimeout(o));
  }))), Se.handle("dialog:saveFile", async (h, { content: d, defaultName: l }) => {
    const { canceled: u, filePath: c } = await fn.showSaveDialog({
      defaultPath: l ?? "untitled.py",
      filters: [
        { name: "Python", extensions: ["py"] },
        { name: "C/C++", extensions: ["c", "cpp", "ino", "h"] },
        { name: "All Files", extensions: ["*"] }
      ]
    });
    if (u || !c) return { success: !1 };
    try {
      return fe.writeFileSync(c, d, "utf-8"), { success: !0, filePath: c, path: c };
    } catch (r) {
      return { success: !1, message: r.message };
    }
  }), Se.handle(
    "hardware:flash",
    async (h, { code: d, port: l, language: u, boardId: c, deviceName: r, mode: f }) => (await Lt(), await new Promise((a) => {
      const o = `
import serial, sys, time
for attempt in range(5):
    try:
        s = serial.Serial('${l}', 115200, timeout=0.5)
        s.write(b'\\r\\x03\\x03\\x03')  
        time.sleep(0.2)
        s.close()
        break
    except Exception:
        time.sleep(0.2)
`;
      da(mt(), ["-c", o]).on("close", a);
    }), new Promise(async (a) => {
      const o = we.join(Xt.tmpdir(), "electro_temp.py");
      try {
        fe.writeFileSync(o, d, "utf-8");
      } catch {
        a({ success: !1, message: "Failed to write temp file" });
        return;
      }
      setTimeout(async () => {
        const t = [
          St(we.join("firmware-tools", "core", "uploader.py")),
          "--port",
          l,
          "--file",
          o,
          "--language",
          u,
          "--board-id",
          c ?? "arduino:avr:uno"
        ];
        if (r && t.push("--device-name", r), f && t.push("--mode", f), f === "run")
          try {
            Re && await Lt(), Re = new tr({ path: l, baudRate: 115200 }), Re.on("data", (e) => {
              pe && pe.webContents.send("terminal-output", e.toString("utf8"));
            }), Re.on("error", () => {
              Re = null;
            }), Re.on("close", () => {
              Re = null;
            }), Re.on("open", () => {
              Re.write(Buffer.from("\r", "utf-8")), setTimeout(() => {
                Re.write(Buffer.from("", "utf-8")), setTimeout(() => {
                  Re.write(Buffer.from(d, "utf-8")), setTimeout(() => {
                    Re.write(Buffer.from("", "utf-8")), a({ success: !0, message: "Execution started natively" });
                  }, 100);
                }, 100);
              }, 200);
            });
          } catch (e) {
            a({ success: !1, message: e.message });
          }
        else
          ja(
            mt(),
            t,
            { timeout: 6e4 },
            async (e, p, y) => {
              if (e) {
                a({
                  success: !1,
                  message: y.trim() || p.trim() || e.message
                });
                return;
              }
              try {
                Re && await Lt(), Re = new tr({ path: l, baudRate: 115200 }), Re.on("data", (v) => {
                  pe && pe.webContents.send("terminal-output", v.toString("utf8"));
                }), Re.on("error", () => {
                  Re = null;
                }), Re.on("close", () => {
                  Re = null;
                });
              } catch (v) {
                console.error("Could not resume monitor:", v);
              }
              a({
                success: !0,
                message: p.trim() || "Upload complete — device running"
              });
            }
          );
      }, 1e3);
    }))
  ), Se.handle(
    "hardware:startMonitor",
    async (h, { port: d, baudRate: l = 115200 }) => {
      if (Re)
        return { success: !1, message: "Monitor already running" };
      try {
        return Re = new tr({ path: d, baudRate: l }), Re.on("data", (u) => {
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
  ), Se.handle("hardware:stopMonitor", async () => (await Lt(), { success: !0 }));
  let i = !1;
  Se.handle("hardware:stopExecution", async (h, { port: d }) => i ? { success: !1, message: "Stop already in progress" } : (i = !0, await Lt(), new Promise((l) => {
    const u = new tr({ path: d, baudRate: 115200 }, (c) => {
      if (c)
        return i = !1, l({ success: !1, message: c.message });
      u.write(Buffer.from("\r", "utf-8"), (r) => {
        r && console.error("Error writing break:", r), setTimeout(() => {
          u.close(() => {
            try {
              Re = new tr({ path: d, baudRate: 115200 }), Re.on("data", (f) => {
                pe && pe.webContents.send("terminal-output", f.toString("utf8"));
              }), Re.on("error", () => {
                Re = null;
              }), Re.on("close", () => {
                Re = null;
              });
            } catch (f) {
              console.error("Could not resume monitor automatically:", f);
            }
            i = !1, l({ success: !0 });
          });
        }, 400);
      });
    });
  }))), Se.handle("hardware:listFiles", async (h, { port: d }) => Cr(d, () => new Promise((l) => {
    const u = St(we.join("firmware-tools", "core", "fs_manager.py"));
    jt(
      `"${mt()}" "${u}" --port ${d} --action list`,
      { timeout: 3e4 },
      (c, r) => {
        if (c) {
          console.error("[ElectroAI] listFiles error:", c.message), l({ error: "Failed to read device" });
          return;
        }
        try {
          const f = JSON.parse(r.trim());
          l(f);
        } catch {
          console.error("[ElectroAI] listFiles parse error:", r), l({ error: "Invalid data from device" });
        }
      }
    );
  }))), Se.handle("hardware:readFile", async (h, { port: d, filePath: l }) => Cr(d, () => new Promise((u) => {
    const c = St(we.join("firmware-tools", "core", "fs_manager.py"));
    jt(
      `"${mt()}" "${c}" --port ${d} --action read --path "${l}"`,
      { timeout: 3e4 },
      (r, f, a) => {
        if (r) {
          console.error("[ElectroAI] readFile error:", r.message), u({ error: a || r.message });
          return;
        }
        try {
          const o = JSON.parse(f.trim());
          u(o);
        } catch {
          console.error("[ElectroAI] readFile parse error:", f), u({ error: "Invalid response from device" });
        }
      }
    );
  }))), Se.handle(
    "hardware:writeFile",
    async (h, { port: d, filePath: l, content: u }) => Cr(d, () => new Promise((c) => {
      const r = we.join(
        Xt.tmpdir(),
        "electro_write_temp_" + Date.now() + ".py"
      );
      try {
        fe.writeFileSync(r, u, "utf-8");
      } catch {
        c({ success: !1, message: "Temp file error" });
        return;
      }
      const f = St(we.join("firmware-tools", "core", "fs_manager.py"));
      ja(
        mt(),
        [
          f,
          "--port",
          d,
          "--action",
          "write",
          "--path",
          l,
          "--localpath",
          r
        ],
        { timeout: 3e4 },
        (a, o) => {
          try {
            fe.unlinkSync(r);
          } catch {
          }
          a ? (console.error("[ElectroAI] writeFile error:", o || a.message), c({ success: !1, message: o || a.message })) : (console.log("[ElectroAI] writeFile success:", l), c({ success: !0 }));
        }
      );
    }))
  ), Se.handle("hardware:deleteFile", async (h, { port: d, filePath: l }) => Cr(d, () => new Promise((u) => {
    const c = St(we.join("firmware-tools", "core", "fs_manager.py"));
    jt(
      `"${mt()}" "${c}" --port ${d} --action delete --path "${l}"`,
      { timeout: 3e4 },
      (r, f) => {
        if (r) {
          u({ success: !1, message: "Failed to delete device file" });
          return;
        }
        try {
          const a = JSON.parse(f.trim());
          u(a);
        } catch {
          u({ success: !1, message: "Invalid output from device" });
        }
      }
    );
  }))), Se.handle("hardware:renameFile", async (h, { port: d, oldPath: l, newPath: u }) => Cr(d, () => new Promise((c) => {
    const r = St(we.join("firmware-tools", "core", "fs_manager.py"));
    jt(
      `"${mt()}" "${r}" --port ${d} --action rename --path "${l}" --newpath "${u}"`,
      { timeout: 3e4 },
      (f, a) => {
        if (f) {
          c({ success: !1, message: "Failed to rename device file" });
          return;
        }
        try {
          const o = JSON.parse(a.trim());
          c(o);
        } catch {
          c({ success: !1, message: "Invalid output from device" });
        }
      }
    );
  }))), Se.handle("ai:generate", async (h, d) => {
    try {
      const l = we.join(He.getPath("userData"), "config", "settings.json");
      if (!fe.existsSync(l))
        throw new Error("API Settings not configured. Go to Tools > Settings.");
      const u = fe.readFileSync(l, "utf-8"), c = JSON.parse(u), r = zl(c.apiKey), f = JSON.stringify({
        ...d,
        apiConfig: {
          ...c,
          apiKey: r
        }
      });
      return {
        success: !0,
        response_text: (await new Promise((o, s) => {
          const t = dn.request(
            {
              hostname: "127.0.0.1",
              port: 4e3,
              path: "/api/v1/ai/generate",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(f)
              }
            },
            (e) => {
              let p = "";
              e.on("data", (y) => p += y), e.on("end", () => {
                try {
                  const y = JSON.parse(p);
                  e.statusCode >= 200 && e.statusCode < 300 ? o(y) : s(new Error(y.error || `MCP Server error: ${e.statusCode}`));
                } catch {
                  s(new Error(`MCP Server returned invalid JSON (status ${e.statusCode})`));
                }
              });
            }
          );
          t.on("error", (e) => {
            s(new Error(`Cannot reach MCP Server: ${e.message}. Is it running?`));
          }), t.write(f), t.end();
        })).data
      };
    } catch (l) {
      return console.error("[AiProxy] Generation failed:", l), { success: !1, error: { type: "RUNTIME", message: l.message } };
    }
  }), Se.handle("window:minimize", () => {
    pe?.minimize();
  }), Se.handle("window:maximize", () => {
    pe?.isMaximized() ? pe.unmaximize() : pe?.maximize();
  }), Se.handle("window:close", () => {
    pe?.close();
  }), Se.handle("terminal:sendInput", async (h, d) => {
    if (Re && Re.isOpen)
      try {
        return Re.write(d), { success: !0 };
      } catch (l) {
        return { success: !1, message: l.message };
      }
    return { success: !1, message: "No active serial monitor" };
  }), Se.handle("pty:start", async (h, d) => {
    if (ut)
      try {
        ut.kill();
      } catch {
      }
    const l = Xt.platform() === "win32" ? "powershell.exe" : "bash";
    try {
      return ut = $c.spawn(l, [], {
        name: "xterm-color",
        cols: 80,
        rows: 24,
        cwd: d || Xt.homedir(),
        env: process.env
      }), ut.onData((u) => {
        pe && pe.webContents.send("pty:output", u);
      }), { success: !0 };
    } catch (u) {
      return { success: !1, message: u.message };
    }
  }), Se.handle("pty:input", async (h, d) => ut ? (ut.write(d), { success: !0 }) : { success: !1, message: "No active shell process" }), Se.handle("pty:resize", async (h, { cols: d, rows: l }) => ut ? (ut.resize(d, l), { success: !0 }) : { success: !1 }), Se.handle("firmware:listVolumes", async () => {
    try {
      if (process.platform === "win32")
        return new Promise((h) => {
          jt('wmic logicaldisk where "DriveType=2" get DeviceID,VolumeName /format:csv', (d, l) => {
            if (d) {
              h([]);
              return;
            }
            const c = l.trim().split(`
`).filter((r) => r.includes(",")).slice(1).map((r) => {
              const f = r.trim().split(","), a = f[1] || "", o = f[2] || "Removable Disk";
              return { path: a + "\\", label: `${o} (${a})` };
            }).filter((r) => r.path.length > 1);
            h(c);
          });
        });
      if (process.platform === "darwin") {
        const h = "/Volumes";
        return fe.existsSync(h) ? fe.readdirSync(h).map((l) => ({
          path: we.join(h, l),
          label: l
        })) : [];
      } else {
        const h = Xt.userInfo().username, d = [`/media/${h}`, `/run/media/${h}`], l = [];
        for (const u of d)
          if (fe.existsSync(u))
            for (const c of fe.readdirSync(u))
              l.push({ path: we.join(u, c), label: c });
        return l;
      }
    } catch {
      return [];
    }
  }), Se.handle("firmware:install", async (h, { sourcePath: d, targetVolume: l }) => {
    try {
      if (!fe.existsSync(d))
        return { success: !1, message: "Firmware file not found: " + d };
      const u = we.basename(d), c = we.join(l, u), f = fe.statSync(d).size;
      if (f === 0)
        return { success: !1, message: "Firmware file is empty" };
      const a = fe.createReadStream(d), o = fe.createWriteStream(c);
      let s = 0;
      return a.on("data", (t) => {
        s += t.length;
        const e = Math.round(s / f * 100);
        pe && pe.webContents.send("firmware-progress", {
          percent: e,
          message: `Copying ${u}... ${e}%`
        });
      }), new Promise((t) => {
        o.on("finish", () => {
          pe && pe.webContents.send("firmware-progress", {
            percent: 100,
            message: "Firmware installed successfully!",
            done: !0
          }), t({ success: !0 });
        }), o.on("error", (e) => {
          pe && pe.webContents.send("firmware-progress", {
            percent: 0,
            message: e.message,
            error: e.message
          }), t({ success: !1, message: e.message });
        }), a.on("error", (e) => {
          pe && pe.webContents.send("firmware-progress", {
            percent: 0,
            message: e.message,
            error: e.message
          }), t({ success: !1, message: e.message });
        }), a.pipe(o);
      });
    } catch (u) {
      return { success: !1, message: u.message };
    }
  }), Se.handle("shell:openExternal", async (h, d) => {
    try {
      return await Ba.openExternal(d), { success: !0 };
    } catch (l) {
      return { success: !1, message: l.message };
    }
  }), Se.handle("firmware:download", async (h, { url: d, fileName: l }) => {
    try {
      const u = we.join(He.getPath("userData"), "firmware-cache");
      fe.existsSync(u) || fe.mkdirSync(u, { recursive: !0 });
      const c = we.join(u, l);
      return fe.existsSync(c) && fe.statSync(c).size > 0 ? (console.log(`[Firmware] Using cached: ${c}`), pe && pe.webContents.send("firmware-progress", {
        percent: 100,
        message: "Using cached firmware file..."
      }), { success: !0, filePath: c }) : new Promise((r) => {
        const f = (o, s = 0) => {
          if (s > 5) {
            r({ success: !1, message: "Too many redirects" });
            return;
          }
          (o.startsWith("https") ? Ha : dn).get(o, (e) => {
            if (e.statusCode >= 300 && e.statusCode < 400 && e.headers.location) {
              const p = e.headers.location;
              (p.startsWith("https") ? Ha : dn).get(p, (v) => {
                if (v.statusCode >= 300 && v.statusCode < 400 && v.headers.location) {
                  f(v.headers.location, s + 2);
                  return;
                }
                a(v);
              }).on("error", (v) => {
                r({ success: !1, message: `Download failed: ${v.message}` });
              });
              return;
            }
            a(e);
          }).on("error", (e) => {
            r({ success: !1, message: `Download failed: ${e.message}` });
          });
        }, a = (o) => {
          if (o.statusCode !== 200) {
            r({ success: !1, message: `Server returned ${o.statusCode}` });
            return;
          }
          const s = parseInt(o.headers["content-length"] || "0", 10);
          let t = 0;
          const e = fe.createWriteStream(c);
          o.on("data", (p) => {
            if (t += p.length, s > 0) {
              const y = Math.round(t / s * 100);
              pe && pe.webContents.send("firmware-progress", {
                percent: y,
                message: `Downloading ${l}... ${(t / 1024 / 1024).toFixed(1)} MB`
              });
            } else
              pe && pe.webContents.send("firmware-progress", {
                percent: -1,
                message: `Downloading ${l}... ${(t / 1024 / 1024).toFixed(1)} MB`
              });
          }), o.pipe(e), e.on("finish", () => {
            e.close(), console.log(`[Firmware] Downloaded: ${c}`), r({ success: !0, filePath: c });
          }), e.on("error", (p) => {
            fe.unlinkSync(c), r({ success: !1, message: p.message });
          });
        };
        f(d);
      });
    } catch (u) {
      return { success: !1, message: u.message };
    }
  });
}
function Mu(i = 0) {
  const h = St(we.join("mcp-server", "src", "server.js")), d = St("mcp-server");
  if (fe.existsSync(h)) {
    console.log(`[ElectroAI] Starting MCP Server at ${h}...`), ct = da(process.execPath, [h], {
      cwd: d,
      stdio: "pipe",
      env: {
        ...process.env,
        ELECTRON_RUN_AS_NODE: "1",
        PORT: "4000",
        WS_PORT: "4001",
        // Ensure require() can find node_modules in the bundled mcp-server
        NODE_PATH: we.join(d, "node_modules")
      }
    });
    const l = we.join(He.getPath("userData"), "mcp_debug.log");
    fe.appendFileSync(l, `
--- STARTING MCP SERVER at ${(/* @__PURE__ */ new Date()).toISOString()} ---
`), fe.appendFileSync(l, `mcpPath: ${h}
cwd: ${d}
NODE_PATH: ${we.join(d, "node_modules")}
retry: ${i}
`), ct.stdout?.on("data", (u) => {
      console.log(`[MCP] ${u}`), fe.appendFileSync(l, `[STDOUT] ${u}`);
    }), ct.stderr?.on("data", (u) => {
      console.error(`[MCP] ${u}`), fe.appendFileSync(l, `[STDERR] ${u}`);
    }), ct.on("error", (u) => {
      console.error("[ElectroAI] Failed to start MCP Server:", u), fe.appendFileSync(l, `[SPAWN ERROR] ${u.message}
${u.stack}
`);
    }), ct.on("close", (u) => {
      console.log(`[ElectroAI] MCP Server exited with code ${u}`), fe.appendFileSync(l, `[EXIT] Code ${u}
`), ct = null, u !== 0 && u !== null && i < 3 && (console.log(`[ElectroAI] MCP crashed — restarting (attempt ${i + 1}/3)...`), fe.appendFileSync(l, `[RESTART] Attempt ${i + 1}/3
`), setTimeout(() => Mu(i + 1), 2e3));
    });
  } else {
    console.warn(`[ElectroAI] MCP Server not found at ${h}`);
    const l = we.join(He.getPath("userData"), "mcp_debug.log");
    fe.appendFileSync(l, `
[NOT FOUND] ${h}
resourcesPath: ${process.resourcesPath}
isPackaged: ${He.isPackaged}
`);
  }
}
function Bu() {
  if (Re)
    try {
      Re.close();
    } catch {
    }
  if (ut)
    try {
      ut.kill();
    } catch {
    }
  if (ct)
    try {
      process.platform === "win32" && ct.pid ? eu(`taskkill /pid ${ct.pid} /T /F`, { stdio: "ignore" }) : ct.kill("SIGKILL");
    } catch {
    }
}
He.on("before-quit", () => {
  Bu();
});
He.on("window-all-closed", () => {
  Bu(), process.platform !== "darwin" && (He.quit(), pe = null);
});
He.on("second-instance", () => {
  pe && (pe.isMinimized() && pe.restore(), pe.focus());
});
He.on("activate", () => {
  Xl.getAllWindows().length === 0 && qu();
});
$u && He.whenReady().then(() => {
  hd(), Mu(), qu(), setTimeout(() => gt.autoUpdater.checkForUpdates(), 3e3);
});
export {
  sh as MAIN_DIST,
  ku as RENDERER_DIST,
  ha as VITE_DEV_SERVER_URL
};
