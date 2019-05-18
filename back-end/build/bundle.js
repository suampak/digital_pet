/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _routes_userRouters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/userRouters */ \"./src/routes/userRouters.js\");\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nconst db = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.connect(\"mongodb://localhost/petAPI\");\nconst port = process.env.PORT || 3000;\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({\n  extended: true\n}));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());\napp.use(\"/\", _routes_userRouters__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\napp.listen(port, () => {\n  console.log(`Running on port ${port}`);\n});\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/models/userModel.js":
/*!*********************************!*\
  !*** ./src/models/userModel.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst userModel = new mongoose__WEBPACK_IMPORTED_MODULE_0__[\"Schema\"]({\n  name: {\n    type: String\n  },\n  password: {\n    type: String\n  },\n  gender: {\n    type: String\n  },\n  exp: {\n    type: Number\n  },\n  point: {\n    type: Number\n  },\n  pets: {\n    type: Array\n  },\n  timestamp: {\n    type: Date\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model(\"User\", userModel));\n\n//# sourceURL=webpack:///./src/models/userModel.js?");

/***/ }),

/***/ "./src/routes/userRouters.js":
/*!***********************************!*\
  !*** ./src/routes/userRouters.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _models_userModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../models/userModel */ \"./src/models/userModel.js\");\n\n\n\nconst userRouter = (userModel => {\n  const router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n  router.use(\"/users\", (req, res, next) => {\n    const query = {};\n\n    if (req.query.name) {\n      query.name = req.query.name;\n    }\n\n    userModel.find(query, (err, users) => {\n      if (err) {\n        return res.send(err);\n      }\n\n      if (users) {\n        req.users = users;\n        return next();\n      }\n\n      return res.sendStatus(404);\n    });\n  });\n  router.route(\"/users\").get((req, res) => {\n    res.json(req.users);\n  }).delete((req, res) => {\n    for (let user of req.users) {\n      user.remove(err => {\n        if (err) {\n          return res.send(err);\n        }\n      });\n    }\n\n    return res.sendStatus(204);\n  }).post((req, res) => {\n    const user = new userModel(req.body);\n    user.save();\n    return res.json(user);\n  });\n  router.use(\"/users/:userId\", (req, res, next) => {\n    userModel.findById(req.params.userId, (err, user) => {\n      if (err) {\n        return res.send(err);\n      }\n\n      if (user) {\n        req.user = user;\n        return next();\n      }\n\n      return res.sendStatus(404);\n    });\n  });\n  router.route(\"/users/:userId\").get((req, res) => res.json(req.user)).put((req, res) => {\n    const {\n      user\n    } = req;\n    const {\n      body\n    } = req;\n    user.name = body.name;\n    user.password = body.password;\n    user.gender = body.gender;\n    user.exp = body.exp;\n    user.point = body.point;\n    user.pets = body.pets;\n    user.timestamp = body.timestamp;\n    req.user.save(err => {\n      if (err) {\n        return res.send(err);\n      }\n\n      return res.json(user);\n    });\n  }).delete((req, res) => {\n    req.user.remove(err => {\n      if (err) {\n        return res.send(err);\n      }\n\n      return res.sendStatus(204);\n    });\n  });\n  return router;\n})(_models_userModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (userRouter);\n\n//# sourceURL=webpack:///./src/routes/userRouters.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ })

/******/ });