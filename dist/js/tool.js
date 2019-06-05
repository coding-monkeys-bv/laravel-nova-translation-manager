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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(6);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router, store) {

    Vue.config.devtools = true;

    router.addRoutes([{
        name: 'nova-translation-manager',
        path: '/nova-translation-manager',
        component: __webpack_require__(2)
    }]);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(3)
/* script */
var __vue_script__ = __webpack_require__(4)
/* template */
var __vue_template__ = __webpack_require__(5)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Tool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68ff5483", Component.options)
  } else {
    hotAPI.reload("data-v-68ff5483", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({

    computed: {
        groupSelected: function groupSelected() {
            return this.group !== null;
        }
    },

    data: function data() {
        return {
            group: null,
            groups: [],
            selectedGroup: null,
            keywords: null,
            locales: [],
            selected: {},
            translations: [],
            createModalOpened: false,
            updateModalOpened: false,
            apiUrl: '/voicecode/nova-translation-manager/'
        };
    },
    mounted: function mounted() {
        this.getGroups();
        this.getLocales();
    },


    methods: {
        getGroups: function getGroups() {
            var _this = this;

            axios.get(this.apiUrl + 'translations').then(function (response) {
                _this.groups = response.data;
            });
        },
        getLocales: function getLocales() {
            var _this2 = this;

            axios.get(this.apiUrl + 'locales').then(function (response) {
                _this2.locales = response.data;
            });
        },
        setGroup: function setGroup() {
            var _this3 = this;

            axios.get(this.apiUrl + 'translations/' + this.group).then(function (response) {
                _this3.translations = response.data;
            });
        },
        createKeywords: function createKeywords() {
            var _this4 = this;

            // Setup data.
            var data = {};
            data.group = this.group;
            data.keywords = this.keywords;

            axios.post(this.apiUrl + 'translations', data).then(function (response) {

                // Close the modal.
                _this4.closeCreateModal();

                // Show message.
                _this4.$toasted.show('The translation has been updated!', { type: 'success' });
            });
        },
        updateTranslation: function updateTranslation() {
            var _this5 = this;

            // Setup data.
            var data = {};
            data.id = this.selected.id;
            data.value = this.selected.value;

            axios.put(this.apiUrl + 'translations/' + this.selected.id, data).then(function (response) {

                // Close the modal.
                _this5.closeUpdateModal();

                // Make sure the data is being refreshed.
                _this5.setGroup(_this5.group);

                // Show message.
                _this5.$toasted.show('The translation has been updated!', { type: 'success' });
            });
        },
        exportTranslations: function exportTranslations() {
            var _this6 = this;

            // Setup data.
            var data = {};
            data.group = this.group;

            axios.post(this.apiUrl + 'translations/export', data).then(function (response) {
                // Show message.
                _this6.$toasted.show('The translations have been exported!', { type: 'success' });
            });
        },
        openCreateModal: function openCreateModal() {
            this.createModalOpened = true;
        },
        closeCreateModal: function closeCreateModal() {
            this.keywords = null;
            this.createModalOpened = false;
        },
        openUpdateModal: function openUpdateModal(data) {
            this.selected = Object.assign({}, data);
            this.updateModalOpened = true;
        },
        closeUpdateModal: function closeUpdateModal() {
            this.selected = Object.assign({}, {});
            this.updateModalOpened = false;
        }
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("heading", { staticClass: "mb-6" }, [_vm._v("Translation Manager")]),
      _vm._v(" "),
      _c("card", { staticClass: "p-6" }, [
        _c("div", { staticClass: "flex items-end" }, [
          _c("div", [
            _c("label", { staticClass: "block mb-4" }, [
              _vm._v(_vm._s(_vm.__("Select a group")))
            ]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.group,
                    expression: "group"
                  }
                ],
                staticClass: "form-control form-input form-input-bordered",
                attrs: { size: "1" },
                on: {
                  change: [
                    function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.group = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    },
                    _vm.setGroup
                  ]
                }
              },
              _vm._l(_vm.groups, function(item, index) {
                return _c("option", { domProps: { value: item } }, [
                  _vm._v(_vm._s(item))
                ])
              }),
              0
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "ml-4" }, [
            _vm.groupSelected
              ? _c(
                  "button",
                  {
                    staticClass: "btn btn-default btn-primary",
                    on: { click: _vm.exportTranslations }
                  },
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.__("Publish")) +
                        "\n                "
                    )
                  ]
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "ml-4" }, [
            _vm.groupSelected
              ? _c(
                  "button",
                  {
                    staticClass: "btn btn-default btn-primary",
                    on: { click: _vm.openCreateModal }
                  },
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.__("Add Keyword")) +
                        "\n                "
                    )
                  ]
                )
              : _vm._e()
          ])
        ])
      ]),
      _vm._v(" "),
      _vm.groupSelected
        ? _c("card", { staticClass: "mt-6" }, [
            _c("table", { staticClass: "table w-full" }, [
              _c(
                "thead",
                [
                  _c("th", { staticClass: "text-left" }, [_vm._v("Keyword")]),
                  _vm._v(" "),
                  _vm._l(_vm.locales, function(locale, index) {
                    return _c("th", { staticClass: "text-left" }, [
                      _vm._v(_vm._s(locale))
                    ])
                  })
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.translations, function(translation) {
                  return _c(
                    "tr",
                    [
                      _c("td", [
                        _vm._v(_vm._s(translation[_vm.locales[0]].key))
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.locales, function(locale, index) {
                        return _c(
                          "td",
                          {
                            on: {
                              click: function($event) {
                                return _vm.openUpdateModal(translation[locale])
                              }
                            }
                          },
                          [
                            translation[locale] &&
                            translation[locale].value !== null
                              ? _c("span", { staticClass: "cursor-pointer" }, [
                                  translation[locale].value.length > 80
                                    ? _c("span", [
                                        _vm._v(
                                          _vm._s(
                                            translation[locale].value.substring(
                                              0,
                                              80
                                            )
                                          ) + "..."
                                        )
                                      ])
                                    : _c("span", [
                                        _vm._v(
                                          _vm._s(translation[locale].value)
                                        )
                                      ])
                                ])
                              : _c("span", [
                                  _c("em", { staticClass: "text-danger" }, [
                                    _vm._v(_vm._s(_vm.__("Not Available")))
                                  ])
                                ])
                          ]
                        )
                      })
                    ],
                    2
                  )
                }),
                0
              )
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "portal",
        { attrs: { to: "modals" } },
        [
          _c(
            "transition",
            { attrs: { name: "fade" } },
            [
              _vm.updateModalOpened
                ? _c(
                    "modal",
                    {
                      staticClass: "modal",
                      attrs: { tabindex: "-1", role: "dialog" }
                    },
                    [
                      _c(
                        "card",
                        { staticClass: "w-full" },
                        [
                          _c(
                            "heading",
                            { staticClass: "pt-8 px-8", attrs: { level: 2 } },
                            [_vm._v(_vm._s(_vm.__("Update Translation")))]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "p-8" }, [
                            _c("textarea", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.selected.value,
                                  expression: "selected.value"
                                }
                              ],
                              staticClass:
                                "w-full form-input form-input-bordered p-4",
                              attrs: { rows: "6", cols: "90" },
                              domProps: { value: _vm.selected.value },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.selected,
                                    "value",
                                    $event.target.value
                                  )
                                }
                              }
                            })
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "bg-30 px-6 py-3 flex" }, [
                            _c(
                              "div",
                              { staticClass: "flex items-center ml-auto" },
                              [
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn text-80 font-normal h-9 px-3 mr-3 btn-link",
                                    attrs: { type: "button" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.closeUpdateModal($event)
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(_vm.__("Cancel")) +
                                        "\n                            "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn btn-default btn-primary",
                                    attrs: { type: "submit" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.updateTranslation($event)
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(_vm.__("Save")) +
                                        "\n                            "
                                    )
                                  ]
                                )
                              ]
                            )
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.createModalOpened
                ? _c(
                    "modal",
                    {
                      staticClass: "modal",
                      attrs: { tabindex: "-1", role: "dialog" }
                    },
                    [
                      _c(
                        "card",
                        { staticClass: "w-full" },
                        [
                          _c(
                            "heading",
                            { staticClass: "pt-8 px-8", attrs: { level: 2 } },
                            [_vm._v(_vm._s(_vm.__("Add Keywords")))]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "px-8 mt-3" }, [
                            _c("p", [
                              _vm._v(
                                _vm._s(
                                  _vm.__(
                                    "Add 1 key per line, without the group prefix"
                                  )
                                )
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "p-8" }, [
                            _c("textarea", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.keywords,
                                  expression: "keywords"
                                }
                              ],
                              staticClass:
                                "w-full form-input form-input-bordered p-4",
                              attrs: { rows: "6", cols: "90" },
                              domProps: { value: _vm.keywords },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.keywords = $event.target.value
                                }
                              }
                            })
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "bg-30 px-6 py-3 flex" }, [
                            _c(
                              "div",
                              { staticClass: "flex items-center ml-auto" },
                              [
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn text-80 font-normal h-9 px-3 mr-3 btn-link",
                                    attrs: { type: "button" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.closeCreateModal($event)
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(_vm.__("Cancel")) +
                                        "\n                            "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn btn-default btn-primary",
                                    attrs: { type: "submit" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.createKeywords($event)
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(_vm.__("Save")) +
                                        "\n                            "
                                    )
                                  ]
                                )
                              ]
                            )
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68ff5483", module.exports)
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);