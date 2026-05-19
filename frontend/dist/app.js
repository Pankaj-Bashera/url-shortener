"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect;
var _ReactDOM = ReactDOM,
  createRoot = _ReactDOM.createRoot;
var _ReactRouterDOM = ReactRouterDOM,
  MemoryRouter = _ReactRouterDOM.MemoryRouter,
  Routes = _ReactRouterDOM.Routes,
  Route = _ReactRouterDOM.Route,
  Link = _ReactRouterDOM.Link,
  useNavigate = _ReactRouterDOM.useNavigate,
  useLocation = _ReactRouterDOM.useLocation;

// --- Shared Components ---
var TopNav = function TopNav() {
  var location = useLocation();
  var isActive = function isActive(path) {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-lg"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/",
    className: "font-headline-md text-xl font-bold text-primary tracking-tight"
  }, "DevShort"), /*#__PURE__*/React.createElement("nav", {
    className: "hidden md:flex gap-md"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/",
    className: "font-medium pb-5 pt-5 border-b-2 ".concat(isActive('/') && location.pathname === '/' ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-primary')
  }, "Home"), /*#__PURE__*/)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-md"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/",
    className: "btn-gradient text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
  }, "Create Link")));
};
var DocLayout = function DocLayout(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col min-h-screen"
  }, /*#__PURE__*/React.createElement(TopNav, null), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-1 pt-16"
  }, /*#__PURE__*/React.createElement("main", {
    className: "flex-1 lg:ml-64 pt-8 p-gutter lg:p-lg min-h-screen flex flex-col relative z-10 w-full max-w-container-max mx-auto"
  }, children)));
};

// --- Screens ---

var Home = function Home() {
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    url = _useState2[0],
    setUrl = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    shortUrl = _useState4[0],
    setShortUrl = _useState4[1];
  var _useState5 = useState(''),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];
  var handleShorten = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var trimmedUrl, res, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            trimmedUrl = url.trim();
            if (trimmedUrl) {
              _context.n = 1;
              break;
            }
            setError('Please enter a URL.');
            setShortUrl('');
            return _context.a(2);
          case 1:
            setLoading(true);
            setError('');
            setShortUrl('');
            _context.p = 2;
            _context.n = 3;
            return fetch('/shorten', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                original_url: trimmedUrl
              })
            });
          case 3:
            res = _context.v;
            if (res.ok) {
              _context.n = 4;
              break;
            }
            throw new Error('Server error');
          case 4:
            _context.n = 5;
            return res.json();
          case 5:
            data = _context.v;
            setShortUrl(data.short_url);
            _context.n = 7;
            break;
          case 6:
            _context.p = 6;
            _t = _context.v;
            setError('Error: Could not shorten URL. Is the API running?');
          case 7:
            _context.p = 7;
            setLoading(false);
            return _context.f(7);
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[2, 6, 7, 8]]);
    }));
    return function handleShorten() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col min-h-screen relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute rounded-full bg-primary/20 w-[500px] h-[500px] blur-[80px] top-[-100px] left-[-100px] -z-10 pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute rounded-full bg-secondary/20 w-[400px] h-[400px] blur-[80px] top-[30%] right-[-50px] -z-10 pointer-events-none"
  }), /*#__PURE__*/React.createElement(TopNav, null), /*#__PURE__*/React.createElement("main", {
    className: "flex-grow pt-32 pb-xl px-gutter max-w-container-max mx-auto w-full flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("section", {
    className: "text-center max-w-3xl mx-auto mb-xl pt-lg w-full"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-4"
  }, "Shorten URLs ", /*#__PURE__*/React.createElement("span", {
    className: "text-gradient"
  }, "Instantly"), "."), /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-on-surface-variant mb-8"
  }, "Build for Speed. Optimize your devops workflow with high-velocity link management."), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel w-full p-2 rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-2 mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-grow flex items-center bg-white rounded-md px-3 py-3 border border-outline-variant/50 w-full"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-outline mr-2"
  }, "link"), /*#__PURE__*/React.createElement("input", {
    className: "bg-transparent border-none focus:outline-none text-on-surface w-full",
    placeholder: "Paste long URL here...",
    type: "url",
    value: url,
    onChange: function onChange(e) {
      return setUrl(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      return e.key === 'Enter' && handleShorten();
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: handleShorten,
    disabled: loading,
    className: "btn-gradient text-white px-6 py-3 rounded-md w-full sm:w-auto text-center font-medium hover:opacity-90 transition-opacity disabled:opacity-70"
  }, loading ? 'Shortening...' : 'Shorten')), error && /*#__PURE__*/React.createElement("div", {
    className: "text-left bg-error/10 text-error border border-error/20 p-4 rounded-md mb-8"
  }, error), shortUrl && /*#__PURE__*/React.createElement("div", {
    className: "text-left bg-primary/10 text-primary-container border border-primary/20 p-4 rounded-md mb-8 flex items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "Short URL:"), ' ', /*#__PURE__*/React.createElement("a", {
    href: shortUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "font-mono hover:underline break-all"
  }, shortUrl))))));
};
var Dashboard = function Dashboard() {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col min-h-screen bg-background"
  }, /*#__PURE__*/React.createElement(TopNav, null), /*#__PURE__*/React.createElement("div", {
    className: "max-w-container-max mx-auto px-gutter py-8 mt-16 flex flex-col lg:flex-row gap-6 w-full"
  }, /*#__PURE__*/React.createElement("main", {
    className: "flex-1 flex flex-col gap-6"
  }, /*#__PURE__*/React.createElement("header", {
    className: "flex justify-between items-end"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold text-on-surface mb-1"
  }, "All Links"), /*#__PURE__*/React.createElement("p", {
    className: "text-on-surface-variant"
  }, "Manage and track shortened URLs."))), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-xl shadow-sm overflow-hidden flex-1"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left border-collapse"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "bg-surface-container-low text-on-surface-variant text-sm uppercase"
  }, /*#__PURE__*/React.createElement("th", {
    className: "px-6 py-4 font-medium"
  }, "Original URL"), /*#__PURE__*/React.createElement("th", {
    className: "px-6 py-4 font-medium"
  }, "Short URL"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", {
    className: "border-b border-outline-variant/30 hover:bg-surface-variant/30 transition-colors"
  }, /*#__PURE__*/React.createElement("td", {
    className: "px-6 py-4 truncate max-w-[200px]"
  }, "https://github.com/docker/compose"), /*#__PURE__*/React.createElement("td", {
    className: "px-6 py-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-primary font-mono text-sm hover:underline"
  }, "devsh.rt/dkr-cmp"))), /*#__PURE__*/React.createElement("tr", {
    className: "hover:bg-surface-variant/30 transition-colors"
  }, /*#__PURE__*/React.createElement("td", {
    className: "px-6 py-4 truncate max-w-[200px]"
  }, "https://kubernetes.io/docs/"), /*#__PURE__*/React.createElement("td", {
    className: "px-6 py-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-primary font-mono text-sm hover:underline"
  }, "devsh.rt/k8s-pod")))))))));
};
var App = function App() {
  return /*#__PURE__*/React.createElement(MemoryRouter, null, /*#__PURE__*/React.createElement(Routes, null, /*#__PURE__*/React.createElement(Route, {
    path: "/",
    element: /*#__PURE__*/React.createElement(Home, null)
  })));
};
var root = createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));