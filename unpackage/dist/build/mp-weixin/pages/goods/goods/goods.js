(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/goods/goods"],{"08d7":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uniEasyinput:function(){return n.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(n.bind(null,"d1ee"))}},r=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"0ba3":function(t,e,n){"use strict";(function(t){n("cd70");i(n("dc04"));var e=i(n("7644"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("97ff")["createPage"])},"2ebc":function(t,e,n){"use strict";n.r(e);var i=n("f835"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},5157:function(t,e,n){"use strict";var i=n("99d6"),r=n.n(i);r.a},7644:function(t,e,n){"use strict";n.r(e);var i=n("08d7"),r=n("2ebc");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("5157");var o,c=n("f0c5"),u=Object(c["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);e["default"]=u.exports},"99d6":function(t,e,n){},f835:function(t,e,n){"use strict";(function(t){function n(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=i(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return c=t.done,t},e:function(t){u=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(u)throw o}}}}function i(t,e){if(t){if("string"===typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{search_name:"",brand_name:"",list:[],allCheck:{name:"全选",value:"all",checked:!1},checkedArr:[],page:0,isShow:-1}},onLoad:function(){this.page=0,this.listInterface()},onReachBottom:function(){var e=this;this.http({url:this.api.goods_list,method:"POST",data:{uid:this.common.get("uid"),name:this.search_name,brand_name:this.brand_name,page:this.page},success:function(n){e.page+=1,0==n.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):e.list=e.list.concat(n.list)}})},methods:{hideIsShow:function(){this.isShow=-1},edit_del_click:function(t,e){var n=this;if(e==n.isShow)return n.isShow=-1,!1;n.isShow=e},listInterface:function(){var t=this;this.http({url:this.api.goods_list,method:"POST",data:{uid:this.common.get("uid"),name:this.search_name,brand_name:this.brand_name,page:this.page},success:function(e){t.page+=1,t.list=e.list}})},search:function(){this.page=0,this.listInterface()},changeCheck:function(t){this.checkedArr=t.detail.value,this.checkedArr.length>0&&this.checkedArr.length==this.list.length?this.allCheck.checked=!0:this.allCheck.checked=!1},changeAll:function(t){var e=t.detail.value;if("all"==e[0]){this.allCheck.checked=!0;var i,r=n(this.list);try{for(r.s();!(i=r.n()).done;){var a=i.value,o=String(a.id);this.checkedArr.includes(o)||this.checkedArr.push(o)}}catch(c){r.e(c)}finally{r.f()}}else this.allCheck.checked=!1,this.checkedArr=[]},del:function(e){var n=this;t.showModal({title:"提示",content:"确定要删除此商品吗？",success:function(t){t.confirm&&n.http({url:n.api.goods_remove,method:"POST",data:{uid:n.common.get("uid"),id:e},success:function(t){n.page=0,n.listInterface()}})},fail:function(){},complete:function(){}})},editor:function(e){t.navigateTo({url:"/pages/goods/add/add?data="+encodeURIComponent(JSON.stringify(e))})}}};e.default=a}).call(this,n("d5d0")["default"])}},[["0ba3","common/runtime","common/vendor"]]]);