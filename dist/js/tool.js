!function(t){var e={};function s(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:a})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){s(1),t.exports=s(6)},function(t,e,s){Nova.booting(function(t,e,a){t.config.devtools=!0,e.addRoutes([{name:"nova-translation-manager",path:"/nova-translation-manager",component:s(2)}])})},function(t,e,s){var a=s(3)(s(4),s(5),!1,null,null,null);t.exports=a.exports},function(t,e){t.exports=function(t,e,s,a,n,o){var l,i=t=t||{},r=typeof t.default;"object"!==r&&"function"!==r||(l=t,i=t.default);var c,u="function"==typeof i?i.options:i;if(e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0),s&&(u.functional=!0),n&&(u._scopeId=n),o?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},u._ssrRegister=c):a&&(c=a),c){var d=u.functional,p=d?u.render:u.beforeCreate;d?(u._injectStyles=c,u.render=function(t,e){return c.call(e),p(t,e)}):u.beforeCreate=p?[].concat(p,c):[c]}return{esModule:l,exports:i,options:u}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={computed:{groupSelected:function(){return null!==this.group}},data:function(){return{group:null,groups:[],newGroup:null,selectedGroup:null,importType:null,keywords:null,updatedKeyword:null,selectedKeyword:null,locales:[],newLocale:null,defaultLocale:null,selectedLocale:null,selected:{},translations:[],createModalOpened:!1,updateModalOpened:!1,deleteModalOpened:!1,deleteGroupModalOpened:!1,deleteLocaleModalOpened:!1,updateKeywordModalOpened:!1,apiUrl:"/voicecode/nova-translation-manager/"}},mounted:function(){this.getGroups(),this.getLocales()},methods:{getGroups:function(){var t=this;axios.get(this.apiUrl+"translations").then(function(e){t.groups=e.data})},getLocales:function(){var t=this;axios.get(this.apiUrl+"locales").then(function(e){t.locales=e.data.locales,t.defaultLocale=e.data.defaultLocale})},setGroup:function(){var t=this;axios.get(this.apiUrl+"translations/"+this.group).then(function(e){t.translations=e.data})},createGroup:function(){var t=this;if(null!==this.newGroup&&""!==this.newGroup){var e={};e.group=this.newGroup,axios.post(this.apiUrl+"groups",e).then(function(e){t.group=e.data.group,t.getGroups(),t.setGroup(t.group),t.newGroup=null}).catch(function(e){t.$toasted.show(e.response.data.errors.group[0],{type:"error"})})}},deleteGroup:function(){var t=this;null!==this.group&&""!==this.group&&axios.delete(this.apiUrl+"groups/"+this.group).then(function(e){t.$toasted.show("The group has been deleted!",{type:"success"}),t.getGroups(),t.group=null,t.deleteGroupModalOpened=!1})},createKeywords:function(){var t=this,e={};e.group=this.group,e.keywords=this.keywords,axios.post(this.apiUrl+"translations",e).then(function(e){t.closeCreateModal(),t.setGroup(t.group),t.$toasted.show("The translation has been created!",{type:"success"})})},updateKeyword:function(){var t=this;if(null!==this.selectedGroup&&""!==this.selectedGroup&&null!==this.selectedKeyword&&""!==this.selectedKeyword&&null!==this.updatedKeyword&&""!==this.updatedKeyword){var e={};e.group=this.selectedGroup,e.new_key=this.updatedKeyword,e.old_key=this.selectedKeyword,axios.put(this.apiUrl+"translations/key",e).then(function(e){t.setGroup(t.group),t.closeUpdateKeywordModal(),t.$toasted.show("The keyword has been updated!",{type:"success"})})}},deleteKeyword:function(){var t=this;null!==this.selectedGroup&&""!==this.selectedGroup&&null!==this.selectedKeyword&&""!==this.selectedKeyword&&axios.delete(this.apiUrl+"translations/"+this.selectedGroup+"/"+this.selectedKeyword).then(function(e){t.setGroup(t.group),t.closeDeleteModal(),t.$toasted.show("The translation has been updated!",{type:"success"})})},updateTranslation:function(){var t=this,e={};e.id=this.selected.id,e.value=this.selected.value,axios.put(this.apiUrl+"translations/"+this.selected.id,e).then(function(e){t.closeUpdateModal(),t.setGroup(t.group),t.$toasted.show("The translation has been updated!",{type:"success"})})},exportTranslations:function(){var t=this,e={};e.group=this.group,axios.post(this.apiUrl+"translations/export",e).then(function(e){t.$toasted.show("The translations have been exported!",{type:"success"}),t.setGroup()})},exportAllTranslations:function(){var t=this,e={group:"*"};axios.post(this.apiUrl+"translations/export",e).then(function(e){t.$toasted.show("The translations have been exported!",{type:"success"})})},importTranslations:function(){var t=this;if(null!==this.importType&&""!==this.importType){var e={};e.type=this.importType,axios.post(this.apiUrl+"translations/import",e).then(function(e){t.$toasted.show("The translations have been imported!",{type:"success"})})}},fixMissingTranslation:function(t){var e=this,s=t[Object.keys(t)[0]],a={};a.key=s.key,a.group=s.group,axios.post(this.apiUrl+"translations/fix",a).then(function(t){e.setGroup(e.group),e.$toasted.show("The translation has been fixed!",{type:"success"})})},fixMissingTranslations:function(){var t=this,e={};e.group=this.group,axios.post(this.apiUrl+"translations/fix/group",e).then(function(e){t.setGroup(t.group),t.$toasted.show("All translations within this group have been fixed!",{type:"success"})})},createLocale:function(){var t=this;if(null!==this.newLocale&&""!==this.newLocale){var e={};e.locale=this.newLocale,axios.post(this.apiUrl+"locales",e).then(function(e){t.getLocales(),t.newLocale=null,t.$toasted.show("The locale has been created!",{type:"success"})}).catch(function(e){t.$toasted.show(e.response.data.errors.locale[0],{type:"error"})})}},deleteLocale:function(){var t=this;null!==this.selectedLocale&&""!==this.selectedLocale&&axios.delete(this.apiUrl+"locales/"+this.selectedLocale).then(function(e){t.closeDeleteLocaleModal(),t.setGroup(t.group),t.getLocales(),t.$toasted.show("The locale has been deleted!",{type:"success"})})},openCreateModal:function(){this.createModalOpened=!0},closeCreateModal:function(){this.keywords=null,this.createModalOpened=!1},openUpdateModal:function(t){this.selected=Object.assign({},t),this.updateModalOpened=!0},closeUpdateModal:function(){this.selected=Object.assign({},{}),this.updateModalOpened=!1},openDeleteGroupModal:function(){this.deleteGroupModalOpened=!0},closeDeleteGroupModal:function(){this.deleteGroupModalOpened=!1},openDeleteModal:function(t){this.selectedGroup=this.group,this.selectedKeyword=t,this.deleteModalOpened=!0},closeDeleteModal:function(){this.selectedGroup=null,this.selectedKeyword=null,this.deleteModalOpened=!1},openUpdateKeywordModal:function(t){this.selectedGroup=this.group,this.updatedKeyword=t,this.selectedKeyword=t,this.updateKeywordModalOpened=!0},closeUpdateKeywordModal:function(){this.selectedKeyword=null,this.updatedKeyword=null,this.updateKeywordModalOpened=!1},openDeleteLocaleModal:function(){this.deleteLocaleModalOpened=!0},closeDeleteLocaleModal:function(){this.deleteLocaleModalOpened=!1}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("heading",{staticClass:"mb-6"},[t._v(t._s(t.__("Translation Manager")))]),t._v(" "),s("div",{staticClass:"flex flex-wrap -mx-2"},[s("div",{staticClass:"w-1/2 px-2"},[s("card",{staticClass:"p-6"},[s("h3",{staticClass:"mb-4"},[t._v(t._s(t.__("Import Translations")))]),t._v(" "),s("div",{staticClass:"flex items-end"},[s("div",{staticClass:"w-1/3"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.importType,expression:"importType"}],staticClass:"form-control form-input form-input-bordered w-full",attrs:{size:"1"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.importType=e.target.multiple?s:s[0]}}},[s("option",{attrs:{value:"replace"}},[t._v(t._s(t.__("Replace")))]),t._v(" "),s("option",{attrs:{value:"append"}},[t._v(t._s(t.__("Append")))])])]),t._v(" "),s("div",{staticClass:"w-1/3 px-2"},[s("button",{staticClass:"btn btn-default btn-primary w-full",on:{click:t.importTranslations}},[t._v("\n                            "+t._s(t.__("Import"))+"\n                        ")])])])])],1),t._v(" "),s("div",{staticClass:"w-1/2 px-2"},[s("card",{staticClass:"p-6"},[s("h3",{staticClass:"mb-4"},[t._v(t._s(t.__("Select A Group")))]),t._v(" "),s("div",{staticClass:"flex items-end"},[s("div",{staticClass:"w-1/2"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.group,expression:"group"}],staticClass:"form-control form-input form-input-bordered w-full",attrs:{size:"1"},on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.group=e.target.multiple?s:s[0]},t.setGroup]}},t._l(t.groups,function(e,a){return s("option",{domProps:{value:e}},[t._v(t._s(e))])}),0)])])])],1),t._v(" "),s("div",{staticClass:"w-1/2 px-2 mt-6"},[s("card",{staticClass:"p-6"},[s("h3",{staticClass:"mb-4"},[t._v(t._s(t.__("Create A Group")))]),t._v(" "),s("div",{staticClass:"flex items-end"},[s("div",{staticClass:"w-1/3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newGroup,expression:"newGroup"}],staticClass:"form-control form-input form-input-bordered w-full",domProps:{value:t.newGroup},on:{input:function(e){e.target.composing||(t.newGroup=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"w-1/3 px-2"},[s("button",{staticClass:"btn btn-default btn-primary w-full",on:{click:t.createGroup}},[t._v("\n                            "+t._s(t.__("Create Group"))+"\n                        ")])]),t._v(" "),s("div",{staticClass:"w-1/3"})])])],1),t._v(" "),s("div",{staticClass:"w-1/2 px-2 mt-6"},[s("card",{staticClass:"p-6"},[s("h3",{staticClass:"mb-4"},[t._v(t._s(t.__("Locales")))]),t._v(" "),s("div",{staticClass:"flex"},[s("div",{staticClass:"w-1/3"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedLocale,expression:"selectedLocale"}],staticClass:"form-control form-input form-input-bordered w-full",attrs:{size:"1"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectedLocale=e.target.multiple?s:s[0]}}},t._l(t.locales,function(e,a){return s("option",{domProps:{value:e}},[t._v(t._s(e))])}),0)]),t._v(" "),s("div",{staticClass:"w-1/3 px-2"},[s("button",{staticClass:"btn btn-default btn-danger",on:{click:t.openDeleteLocaleModal}},[t._v("\n                            "+t._s(t.__("Delete Locale"))+"\n                        ")])])])])],1),t._v(" "),s("div",{staticClass:"w-1/2 px-2 mt-6"},[s("card",{staticClass:"p-6"},[s("h3",{staticClass:"mb-4"},[t._v(t._s(t.__("Create Locale")))]),t._v(" "),s("div",{staticClass:"flex items-end"},[s("div",{staticClass:"w-1/3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newLocale,expression:"newLocale"}],staticClass:"form-control form-input form-input-bordered w-full",domProps:{value:t.newLocale},on:{input:function(e){e.target.composing||(t.newLocale=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"w-1/3 px-2"},[s("button",{staticClass:"btn btn-default btn-primary w-full",on:{click:t.createLocale}},[t._v("\n                            "+t._s(t.__("Create Locale"))+"\n                        ")])])])])],1)]),t._v(" "),t.groupSelected?s("div",{staticClass:"mt-6"},[t.groupSelected?s("button",{staticClass:"btn btn-default btn-primary mr-3",on:{click:t.openCreateModal}},[t._v("\n            "+t._s(t.__("Add Keyword"))+"\n        ")]):t._e(),t._v(" "),t.groupSelected?s("button",{staticClass:"btn btn-default btn-primary mr-3",on:{click:t.exportTranslations}},[t._v("\n            "+t._s(t.__("Publish"))+"\n        ")]):t._e(),t._v(" "),t.groupSelected?s("button",{staticClass:"btn btn-default btn-primary mr-3",on:{click:t.fixMissingTranslations}},[t._v("\n            "+t._s(t.__("Fix Translations"))+"\n        ")]):t._e(),t._v(" "),t.groupSelected?s("button",{staticClass:"btn btn-default btn-danger",on:{click:t.openDeleteGroupModal}},[t._v("\n            "+t._s(t.__("Delete Group"))+"\n        ")]):t._e()]):t._e(),t._v(" "),t.groupSelected?s("card",{staticClass:"mt-6"},[s("table",{staticClass:"table w-full"},[s("thead",[s("th",{staticClass:"text-left"},[t._v("Keyword")]),t._v(" "),t._l(t.locales,function(e,a){return s("th",{staticClass:"text-left"},[t._v(t._s(e))])}),t._v(" "),s("th",{staticClass:"text-right"})],2),t._v(" "),s("tbody",t._l(t.translations,function(e){return e[t.defaultLocale]?s("tr",[s("td",[s("span",{staticClass:"cursor-pointer",on:{click:function(s){return t.openUpdateKeywordModal(e[t.defaultLocale].key)}}},[t._v("\n                            "+t._s(e[t.defaultLocale].key)+"\n                        ")])]),t._v(" "),t._l(t.locales,function(a,n){return e[a]?s("td",{on:{click:function(s){return t.openUpdateModal(e[a])}}},[e[a]&&null!==e[a].value?s("span",{class:["cursor-pointer",1==e[a].status?"font-bold":""]},[e[a].value.length>80?s("span",[t._v(t._s(e[a].value.substring(0,80))+"...")]):s("span",[t._v(t._s(e[a].value))])]):s("span",[s("em",{staticClass:"text-danger"},[t._v(t._s(t.__("Not Available")))])])]):s("td",[s("button",{staticClass:"btn btn-default btn-icon btn-white float-right",on:{click:function(s){return t.fixMissingTranslation(e)}}},[t._v("\n                            "+t._s(t.__("Fix Translation"))+"\n                        ")])])}),t._v(" "),s("td",{staticClass:"text-right"},[s("button",{staticClass:"btn btn-default btn-icon btn-white float-right",on:{click:function(s){return t.openDeleteModal(e[t.defaultLocale].id)}}},[s("icon",{staticClass:"text-80",attrs:{type:"delete"}})],1)])],2):s("tr",[s("td",[s("span",{staticClass:"text-danger"},[t._v(t._s(t.__("This translation needs fixing")))])]),t._v(" "),t._l(t.locales,function(t,e){return s("td")}),s("td",{staticClass:"text-right"},[s("button",{staticClass:"btn btn-default btn-icon btn-white float-right",on:{click:function(s){return t.fixMissingTranslation(e)}}},[t._v("\n                            "+t._s(t.__("Fix Translation"))+"\n                        ")])])],2)}),0)])]):t._e(),t._v(" "),t.updateModalOpened?s("modal",{staticClass:"modal",attrs:{tabindex:"-1",role:"dialog"}},[s("card",{staticClass:"w-full"},[s("heading",{staticClass:"pt-8 px-8",attrs:{level:2}},[t._v(t._s(t.__("Update Translation")))]),t._v(" "),s("div",{staticClass:"p-8"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.selected.value,expression:"selected.value"}],staticClass:"w-full form-input form-input-bordered p-4",attrs:{rows:"6",cols:"90"},domProps:{value:t.selected.value},on:{input:function(e){e.target.composing||t.$set(t.selected,"value",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"bg-30 px-6 py-3 flex"},[s("div",{staticClass:"flex items-center ml-auto"},[s("button",{staticClass:"btn text-80 font-normal h-9 px-3 mr-3 btn-link",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.closeUpdateModal(e)}}},[t._v("\n                        "+t._s(t.__("Cancel"))+"\n                    ")]),t._v(" "),s("button",{staticClass:"btn btn-default btn-primary",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.updateTranslation(t.selected)}}},[t._v("\n                        "+t._s(t.__("Save"))+"\n                    ")])])])],1)],1):t._e(),t._v(" "),t.updateKeywordModalOpened?s("modal",{staticClass:"modal",attrs:{tabindex:"-1",role:"dialog"}},[s("card",{staticClass:"w-full"},[s("heading",{staticClass:"pt-8 px-8",attrs:{level:2}},[t._v(t._s(t.__("Update Keyword")))]),t._v(" "),s("div",{staticClass:"p-8"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.updatedKeyword,expression:"updatedKeyword"}],staticClass:"w-full form-input form-input-bordered p-4",domProps:{value:t.updatedKeyword},on:{input:function(e){e.target.composing||(t.updatedKeyword=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"bg-30 px-6 py-3 flex"},[s("div",{staticClass:"flex items-center ml-auto"},[s("button",{staticClass:"btn text-80 font-normal h-9 px-3 mr-3 btn-link",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.closeUpdateKeywordModal(e)}}},[t._v("\n                        "+t._s(t.__("Cancel"))+"\n                    ")]),t._v(" "),s("button",{staticClass:"btn btn-default btn-primary",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.updateKeyword(e)}}},[t._v("\n                        "+t._s(t.__("Save"))+"\n                    ")])])])],1)],1):t._e(),t._v(" "),t.createModalOpened?s("modal",{staticClass:"modal",attrs:{tabindex:"-1",role:"dialog"}},[s("card",{staticClass:"w-full"},[s("heading",{staticClass:"pt-8 px-8",attrs:{level:2}},[t._v(t._s(t.__("Add Keywords")))]),t._v(" "),s("div",{staticClass:"px-8 mt-3"},[s("p",[t._v(t._s(t.__("Add 1 key per line, without the group prefix")))])]),t._v(" "),s("div",{staticClass:"p-8"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.keywords,expression:"keywords"}],staticClass:"w-full form-input form-input-bordered p-4",attrs:{rows:"6",cols:"90"},domProps:{value:t.keywords},on:{input:function(e){e.target.composing||(t.keywords=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"bg-30 px-6 py-3 flex"},[s("div",{staticClass:"flex items-center ml-auto"},[s("button",{staticClass:"btn text-80 font-normal h-9 px-3 mr-3 btn-link",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.closeCreateModal(e)}}},[t._v("\n                        "+t._s(t.__("Cancel"))+"\n                    ")]),t._v(" "),s("button",{staticClass:"btn btn-default btn-primary",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.createKeywords(e)}}},[t._v("\n                        "+t._s(t.__("Save"))+"\n                    ")])])])],1)],1):t._e(),t._v(" "),t.deleteModalOpened?s("modal",{staticClass:"modal",attrs:{tabindex:"-1",role:"dialog"}},[s("card",{staticClass:"w-full"},[s("heading",{staticClass:"pt-8 px-8",attrs:{level:2}},[t._v(t._s(t.__("Delete This Translation")))]),t._v(" "),s("div",{staticClass:"px-8 mt-3 mb-3"},[s("p",[t._v(t._s(t.__("Are you sure?")))])]),t._v(" "),s("div",{staticClass:"bg-30 px-6 py-3 flex"},[s("div",{staticClass:"flex items-center ml-auto"},[s("button",{staticClass:"btn text-80 font-normal h-9 px-3 mr-3 btn-link",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.closeDeleteModal(e)}}},[t._v("\n                        "+t._s(t.__("Cancel"))+"\n                    ")]),t._v(" "),s("button",{staticClass:"btn btn-default btn-danger",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.deleteKeyword(e)}}},[t._v("\n                        "+t._s(t.__("Delete"))+"\n                    ")])])])],1)],1):t._e(),t._v(" "),t.deleteGroupModalOpened?s("modal",{staticClass:"modal",attrs:{tabindex:"-1",role:"dialog"}},[s("card",{staticClass:"w-full"},[s("heading",{staticClass:"pt-8 px-8",attrs:{level:2}},[t._v(t._s(t.__("Delete This Group")))]),t._v(" "),s("div",{staticClass:"px-8 mt-3 mb-3"},[s("p",[t._v(t._s(t.__("Are you sure?")))])]),t._v(" "),s("div",{staticClass:"bg-30 px-6 py-3 flex"},[s("div",{staticClass:"flex items-center ml-auto"},[s("button",{staticClass:"btn text-80 font-normal h-9 px-3 mr-3 btn-link",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.closeDeleteGroupModal(e)}}},[t._v("\n                        "+t._s(t.__("Cancel"))+"\n                    ")]),t._v(" "),s("button",{staticClass:"btn btn-default btn-danger",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.deleteGroup(e)}}},[t._v("\n                        "+t._s(t.__("Delete"))+"\n                    ")])])])],1)],1):t._e(),t._v(" "),t.deleteLocaleModalOpened?s("modal",{staticClass:"modal",attrs:{tabindex:"-1",role:"dialog"}},[s("card",{staticClass:"w-full"},[s("heading",{staticClass:"pt-8 px-8",attrs:{level:2}},[t._v(t._s(t.__("Delete This Locale")))]),t._v(" "),s("div",{staticClass:"px-8 mt-3 mb-3"},[s("p",[t._v(t._s(t.__("Are you sure?")))])]),t._v(" "),s("div",{staticClass:"bg-30 px-6 py-3 flex"},[s("div",{staticClass:"flex items-center ml-auto"},[s("button",{staticClass:"btn text-80 font-normal h-9 px-3 mr-3 btn-link",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.closeDeleteLocaleModal(e)}}},[t._v("\n                        "+t._s(t.__("Cancel"))+"\n                    ")]),t._v(" "),s("button",{staticClass:"btn btn-default btn-danger",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.deleteLocale(e)}}},[t._v("\n                        "+t._s(t.__("Delete"))+"\n                    ")])])])],1)],1):t._e()],1)},staticRenderFns:[]}},function(t,e){}]);