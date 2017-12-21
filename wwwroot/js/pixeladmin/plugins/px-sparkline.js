function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),PxSparkline=function(t){"use strict";if(!t.fn.sparkline)throw new Error("jquery.sparkline.js required.");var e="pxSparkline",n="px.sparkline",r=t.fn[e],a={RESIZE:"resize."+n},i=function(){function r(e,n,a){_classCallCheck(this,r),this.uniqueId=pxUtil.generateUniqueId(),this.element=e,this.$parent=t(e.parentNode),this.update(n,a),this._setListeners()}return _createClass(r,[{key:"update",value:function(e,n){null!==e&&(this._values=e),null!==n&&("100%"!==n.width||"bar"!==n.type&&"tristate"!==n.type||void 0!==n.barSpacing||(n.barSpacing="2px"),this.config=n);var r=t.extend(!0,{},this.config);"100%"===r.width&&("bar"===r.type||"tristate"===r.type?r.barWidth=this._getBarWidth(this.$parent,this._values.length,r.barSpacing):r.width=Math.floor(this.$parent.width())),t(this.element).sparkline(this._values,r)}},{key:"destroy",value:function(){this._unsetListeners(),t(this.element).removeData(n).removeData("_jqs_mhandler").removeData("_jqs_vcanvas").off().find("canvas").remove()}},{key:"_getBarWidth",value:function(t,e,n){var r=t.width(),a=parseInt(n,10)*(e-1);return Math.floor((r-a)/e)}},{key:"_setListeners",value:function(){var e=this;t(window).on(this.constructor.Event.RESIZE+"."+this.uniqueId,function(){if("100%"===e.config.width){var n=t.extend(!0,{},e.config);"bar"===n.type||"tristate"===n.type?n.barWidth=e._getBarWidth(e.$parent,e._values.length,n.barSpacing):n.width=Math.floor(e.$parent.width()),t(e.element).sparkline(e._values,n)}})}},{key:"_unsetListeners",value:function(){t(window).off(this.constructor.Event.RESIZE+"."+this.uniqueId)}}],[{key:"_parseArgs",value:function(e,n){var r=void 0,a=void 0;return"[object Array]"===Object.prototype.toString.call(n[0])||"html"===n[0]||null===n[0]?(r=n[0],a=n[1]||null):a=n[0]||null,"html"!==r&&void 0!==r||null===r||(r=e.getAttribute("values"),void 0!==r&&null!==r||(r=t(e).html()),r=r.replace(/(^\s*<!--)|(-->\s*$)|\s+/g,"").split(",")),r&&"[object Array]"===Object.prototype.toString.call(r)&&0!==r.length||(r=null),{values:r,config:a}}},{key:"_jQueryInterface",value:function(){for(var e=arguments.length,a=Array(e),i=0;i<e;i++)a[i]=arguments[i];return this.each(function(){var e=t(this).data(n),i="update"===a[0]||"destroy"===a[0]?a[0]:null,s=r._parseArgs(this,i?a.slice(1):a),u=s.values,l=s.config;e?u&&e.update(u,l):(e=new r(this,u||[],l||{}),t(this).data(n,e)),"update"===i?e.update(u,l):"destroy"===i&&e.destroy()})}},{key:"NAME",get:function(){return e}},{key:"DATA_KEY",get:function(){return n}},{key:"Event",get:function(){return a}},{key:"EVENT_KEY",get:function(){return"."+n}}]),r}();return t.fn[e]=i._jQueryInterface,t.fn[e].Constructor=i,t.fn[e].noConflict=function(){return t.fn[e]=r,i._jQueryInterface},i}(jQuery);