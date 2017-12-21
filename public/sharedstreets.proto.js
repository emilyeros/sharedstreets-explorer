/*!
 * protobuf.js v6.8.3 (c) 2016, daniel wirtz
 * compiled wed, 29 nov 2017 11:13:36 utc
 * licensed under the bsd-3-clause license
 * see: https://github.com/dcodeio/protobuf.js for details
 */
!function(e,t){"use strict";!function(t,r,n){function i(e){var n=r[e];return n||t[e][0].call(n=r[e]={exports:{}},i,n,n.exports),n.exports}var o=e.protobuf=i(n[0]);"function"==typeof define&&define.amd&&define(["long"],function(e){return e&&e.isLong&&(o.util.Long=e,o.configure()),o}),"object"==typeof module&&module&&module.exports&&(module.exports=o)}({1:[function(e,t){function r(e,t){for(var r=Array(arguments.length-1),n=0,i=2,o=!0;i<arguments.length;)r[n++]=arguments[i++];return new Promise(function(i,s){r[n]=function(e){if(o)if(o=!1,e)s(e);else{for(var t=Array(arguments.length-1),r=0;r<t.length;)t[r++]=arguments[r];i.apply(null,t)}};try{e.apply(t||null,r)}catch(e){o&&(o=!1,s(e))}})}t.exports=r},{}],2:[function(e,r,n){var i=n;i.length=function(e){var t=e.length;if(!t)return 0;for(var r=0;--t%4>1&&"="===e.charAt(t);)++r;return Math.ceil(3*e.length)/4-r};for(var o=Array(64),s=Array(123),a=0;a<64;)s[o[a]=a<26?a+65:a<52?a+71:a<62?a-4:a-59|43]=a++;i.encode=function(e,t,r){for(var n,i=null,s=[],a=0,u=0;t<r;){var f=e[t++];switch(u){case 0:s[a++]=o[f>>2],n=(3&f)<<4,u=1;break;case 1:s[a++]=o[n|f>>4],n=(15&f)<<2,u=2;break;case 2:s[a++]=o[n|f>>6],s[a++]=o[63&f],u=0}a>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,s)),a=0)}return u&&(s[a++]=o[n],s[a++]=61,1===u&&(s[a++]=61)),i?(a&&i.push(String.fromCharCode.apply(String,s.slice(0,a))),i.join("")):String.fromCharCode.apply(String,s.slice(0,a))};i.decode=function(e,r,n){for(var i,o=n,a=0,u=0;u<e.length;){var f=e.charCodeAt(u++);if(61===f&&a>1)break;if((f=s[f])===t)throw Error("invalid encoding");switch(a){case 0:i=f,a=1;break;case 1:r[n++]=i<<2|(48&f)>>4,i=f,a=2;break;case 2:r[n++]=(15&i)<<4|(60&f)>>2,i=f,a=3;break;case 3:r[n++]=(3&i)<<6|f,a=0}}if(1===a)throw Error("invalid encoding");return n-o},i.test=function(e){return/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(e)}},{}],3:[function(e,r){function n(e,r){function i(e){if("string"!=typeof e){var t=o();if(n.verbose&&console.log("codegen: "+t),t="return "+t,e){for(var r=Object.keys(e),a=Array(r.length+1),u=Array(r.length),f=0;f<r.length;)a[f]=r[f],u[f]=e[r[f++]];return a[f]=t,Function.apply(null,a).apply(null,u)}return Function(t)()}for(var l=Array(arguments.length-1),p=0;p<l.length;)l[p]=arguments[++p];if(p=0,e=e.replace(/%([%dfijs])/g,function(e,t){var r=l[p++];switch(t){case"d":case"f":return+r+"";case"i":return Math.floor(r)+"";case"j":return JSON.stringify(r);case"s":return r+""}return"%"}),p!==l.length)throw Error("parameter count mismatch");return s.push(e),i}function o(t){return"function "+(t||r||"")+"("+(e&&e.join(",")||"")+"){\n  "+s.join("\n  ")+"\n}"}"string"==typeof e&&(r=e,e=t);var s=[];return i.toString=o,i}r.exports=n,n.verbose=!1},{}],4:[function(e,r){function n(){this.a={}}r.exports=n,n.prototype.on=function(e,t,r){return(this.a[e]||(this.a[e]=[])).push({fn:t,ctx:r||this}),this},n.prototype.off=function(e,r){if(e===t)this.a={};else if(r===t)this.a[e]=[];else for(var n=this.a[e],i=0;i<n.length;)n[i].fn===r?n.splice(i,1):++i;return this},n.prototype.emit=function(e){var t=this.a[e];if(t){for(var r=[],n=1;n<arguments.length;)r.push(arguments[n++]);for(n=0;n<t.length;)t[n].fn.apply(t[n++].ctx,r)}return this}},{}],5:[function(e,r){function n(e,t,r){return"function"==typeof t?(r=t,t={}):t||(t={}),r?!t.xhr&&s&&s.readFile?s.readFile(e,function(i,o){return i&&"undefined"!=typeof XMLHttpRequest?n.xhr(e,t,r):i?r(i):r(null,t.binary?o:o.toString("utf8"))}):n.xhr(e,t,r):i(n,this,e,t)}r.exports=n;var i=e(1),o=e(7),s=o("fs");n.xhr=function(e,r,n){var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4!==i.readyState)return t;if(0!==i.status&&200!==i.status)return n(Error("status "+i.status));if(r.binary){var e=i.response;if(!e){e=[];for(var o=0;o<i.responseText.length;++o)e.push(255&i.responseText.charCodeAt(o))}return n(null,"undefined"!=typeof Uint8Array?new Uint8Array(e):e)}return n(null,i.responseText)},r.binary&&("overrideMimeType"in i&&i.overrideMimeType("text/plain; charset=x-user-defined"),i.responseType="arraybuffer"),i.open("GET",e),i.send()}},{1:1,7:7}],6:[function(e,t){function r(e){return"undefined"!=typeof Float32Array?function(){function t(e,t,r){o[0]=e,t[r]=s[0],t[r+1]=s[1],t[r+2]=s[2],t[r+3]=s[3]}function r(e,t,r){o[0]=e,t[r]=s[3],t[r+1]=s[2],t[r+2]=s[1],t[r+3]=s[0]}function n(e,t){return s[0]=e[t],s[1]=e[t+1],s[2]=e[t+2],s[3]=e[t+3],o[0]}function i(e,t){return s[3]=e[t],s[2]=e[t+1],s[1]=e[t+2],s[0]=e[t+3],o[0]}var o=new Float32Array([-0]),s=new Uint8Array(o.buffer),a=128===s[3];e.writeFloatLE=a?t:r,e.writeFloatBE=a?r:t,e.readFloatLE=a?n:i,e.readFloatBE=a?i:n}():function(){function t(e,t,r,n){var i=t<0?1:0;if(i&&(t=-t),0===t)e(1/t>0?0:2147483648,r,n);else if(isNaN(t))e(2143289344,r,n);else if(t>3.4028234663852886e38)e((i<<31|2139095040)>>>0,r,n);else if(t<1.1754943508222875e-38)e((i<<31|Math.round(t/1.401298464324817e-45))>>>0,r,n);else{var o=Math.floor(Math.log(t)/Math.LN2),s=8388607&Math.round(t*Math.pow(2,-o)*8388608);e((i<<31|o+127<<23|s)>>>0,r,n)}}function r(e,t,r){var n=e(t,r),i=2*(n>>31)+1,o=n>>>23&255,s=8388607&n;return 255===o?s?NaN:i*(1/0):0===o?1.401298464324817e-45*i*s:i*Math.pow(2,o-150)*(s+8388608)}e.writeFloatLE=t.bind(null,n),e.writeFloatBE=t.bind(null,i),e.readFloatLE=r.bind(null,o),e.readFloatBE=r.bind(null,s)}(),"undefined"!=typeof Float64Array?function(){function t(e,t,r){o[0]=e,t[r]=s[0],t[r+1]=s[1],t[r+2]=s[2],t[r+3]=s[3],t[r+4]=s[4],t[r+5]=s[5],t[r+6]=s[6],t[r+7]=s[7]}function r(e,t,r){o[0]=e,t[r]=s[7],t[r+1]=s[6],t[r+2]=s[5],t[r+3]=s[4],t[r+4]=s[3],t[r+5]=s[2],t[r+6]=s[1],t[r+7]=s[0]}function n(e,t){return s[0]=e[t],s[1]=e[t+1],s[2]=e[t+2],s[3]=e[t+3],s[4]=e[t+4],s[5]=e[t+5],s[6]=e[t+6],s[7]=e[t+7],o[0]}function i(e,t){return s[7]=e[t],s[6]=e[t+1],s[5]=e[t+2],s[4]=e[t+3],s[3]=e[t+4],s[2]=e[t+5],s[1]=e[t+6],s[0]=e[t+7],o[0]}var o=new Float64Array([-0]),s=new Uint8Array(o.buffer),a=128===s[7];e.writeDoubleLE=a?t:r,e.writeDoubleBE=a?r:t,e.readDoubleLE=a?n:i,e.readDoubleBE=a?i:n}():function(){function t(e,t,r,n,i,o){var s=n<0?1:0;if(s&&(n=-n),0===n)e(0,i,o+t),e(1/n>0?0:2147483648,i,o+r);else if(isNaN(n))e(0,i,o+t),e(2146959360,i,o+r);else if(n>1.7976931348623157e308)e(0,i,o+t),e((s<<31|2146435072)>>>0,i,o+r);else{var a;if(n<2.2250738585072014e-308)a=n/5e-324,e(a>>>0,i,o+t),e((s<<31|a/4294967296)>>>0,i,o+r);else{var u=Math.floor(Math.log(n)/Math.LN2);1024===u&&(u=1023),a=n*Math.pow(2,-u),e(4503599627370496*a>>>0,i,o+t),e((s<<31|u+1023<<20|1048576*a&1048575)>>>0,i,o+r)}}}function r(e,t,r,n,i){var o=e(n,i+t),s=e(n,i+r),a=2*(s>>31)+1,u=s>>>20&2047,f=4294967296*(1048575&s)+o;return 2047===u?f?NaN:a*(1/0):0===u?5e-324*a*f:a*Math.pow(2,u-1075)*(f+4503599627370496)}e.writeDoubleLE=t.bind(null,n,0,4),e.writeDoubleBE=t.bind(null,i,4,0),e.readDoubleLE=r.bind(null,o,0,4),e.readDoubleBE=r.bind(null,s,4,0)}(),e}function n(e,t,r){t[r]=255&e,t[r+1]=e>>>8&255,t[r+2]=e>>>16&255,t[r+3]=e>>>24}function i(e,t,r){t[r]=e>>>24,t[r+1]=e>>>16&255,t[r+2]=e>>>8&255,t[r+3]=255&e}function o(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0}function s(e,t){return(e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3])>>>0}t.exports=r(r)},{}],7:[function(e,t,r){function n(e){try{var t=eval("quire".replace(/^/,"re"))(e);if(t&&(t.length||Object.keys(t).length))return t}catch(e){}return null}t.exports=n},{}],8:[function(e,t,r){var n=r,i=n.isAbsolute=function(e){return/^(?:\/|\w+:)/.test(e)},o=n.normalize=function(e){e=e.replace(/\\/g,"/").replace(/\/{2,}/g,"/");var t=e.split("/"),r=i(e),n="";r&&(n=t.shift()+"/");for(var o=0;o<t.length;)".."===t[o]?o>0&&".."!==t[o-1]?t.splice(--o,2):r?t.splice(o,1):++o:"."===t[o]?t.splice(o,1):++o;return n+t.join("/")};n.resolve=function(e,t,r){return r||(t=o(t)),i(t)?t:(r||(e=o(e)),(e=e.replace(/(?:\/|^)[^\/]+$/,"")).length?o(e+"/"+t):t)}},{}],9:[function(e,t){function r(e,t,r){var n=r||8192,i=n>>>1,o=null,s=n;return function(r){if(r<1||r>i)return e(r);s+r>n&&(o=e(n),s=0);var a=t.call(o,s,s+=r);return 7&s&&(s=1+(7|s)),a}}t.exports=r},{}],10:[function(e,t,r){var n=r;n.length=function(e){for(var t=0,r=0,n=0;n<e.length;++n)r=e.charCodeAt(n),r<128?t+=1:r<2048?t+=2:55296==(64512&r)&&56320==(64512&e.charCodeAt(n+1))?(++n,t+=4):t+=3;return t},n.read=function(e,t,r){if(r-t<1)return"";for(var n,i=null,o=[],s=0;t<r;)n=e[t++],n<128?o[s++]=n:n>191&&n<224?o[s++]=(31&n)<<6|63&e[t++]:n>239&&n<365?(n=((7&n)<<18|(63&e[t++])<<12|(63&e[t++])<<6|63&e[t++])-65536,o[s++]=55296+(n>>10),o[s++]=56320+(1023&n)):o[s++]=(15&n)<<12|(63&e[t++])<<6|63&e[t++],s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,o)),s=0);return i?(s&&i.push(String.fromCharCode.apply(String,o.slice(0,s))),i.join("")):String.fromCharCode.apply(String,o.slice(0,s))},n.write=function(e,t,r){for(var n,i,o=r,s=0;s<e.length;++s)n=e.charCodeAt(s),n<128?t[r++]=n:n<2048?(t[r++]=n>>6|192,t[r++]=63&n|128):55296==(64512&n)&&56320==(64512&(i=e.charCodeAt(s+1)))?(n=65536+((1023&n)<<10)+(1023&i),++s,t[r++]=n>>18|240,t[r++]=n>>12&63|128,t[r++]=n>>6&63|128,t[r++]=63&n|128):(t[r++]=n>>12|224,t[r++]=n>>6&63|128,t[r++]=63&n|128);return r-o}},{}],11:[function(e,t){function r(e,t){n.test(e)||(e="google/protobuf/"+e+".proto",t={nested:{google:{nested:{protobuf:{nested:t}}}}}),r[e]=t}t.exports=r;var n=/\/|\./;r("any",{Any:{fields:{type_url:{type:"string",id:1},value:{type:"bytes",id:2}}}});var i;r("duration",{Duration:i={fields:{seconds:{type:"int64",id:1},nanos:{type:"int32",id:2}}}}),r("timestamp",{Timestamp:i}),r("empty",{Empty:{fields:{}}}),r("struct",{Struct:{fields:{fields:{keyType:"string",type:"Value",id:1}}},Value:{oneofs:{kind:{oneof:["nullValue","numberValue","stringValue","boolValue","structValue","listValue"]}},fields:{nullValue:{type:"NullValue",id:1},numberValue:{type:"double",id:2},stringValue:{type:"string",id:3},boolValue:{type:"bool",id:4},structValue:{type:"Struct",id:5},listValue:{type:"ListValue",id:6}}},NullValue:{values:{NULL_VALUE:0}},ListValue:{fields:{values:{rule:"repeated",type:"Value",id:1}}}}),r("wrappers",{DoubleValue:{fields:{value:{type:"double",id:1}}},FloatValue:{fields:{value:{type:"float",id:1}}},Int64Value:{fields:{value:{type:"int64",id:1}}},UInt64Value:{fields:{value:{type:"uint64",id:1}}},Int32Value:{fields:{value:{type:"int32",id:1}}},UInt32Value:{fields:{value:{type:"uint32",id:1}}},BoolValue:{fields:{value:{type:"bool",id:1}}},StringValue:{fields:{value:{type:"string",id:1}}},BytesValue:{fields:{value:{type:"bytes",id:1}}}}),r.get=function(e){return r[e]||null}},{}],12:[function(e,t,r){function n(e,t,r,n){if(t.resolvedType)if(t.resolvedType instanceof s){e("switch(d%s){",n);for(var i=t.resolvedType.values,o=Object.keys(i),a=0;a<o.length;++a)t.repeated&&i[o[a]]===t.typeDefault&&e("default:"),e("case%j:",o[a])("case %i:",i[o[a]])("m%s=%j",n,i[o[a]])("break");e("}")}else e('if(typeof d%s!=="object")',n)("throw TypeError(%j)",t.fullName+": object expected")("m%s=types[%i].fromObject(d%s)",n,r,n);else{var u=!1;switch(t.type){case"double":case"float":e("m%s=Number(d%s)",n,n);break;case"uint32":case"fixed32":e("m%s=d%s>>>0",n,n);break;case"int32":case"sint32":case"sfixed32":e("m%s=d%s|0",n,n);break;case"uint64":u=!0;case"int64":case"sint64":case"fixed64":case"sfixed64":e("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j",n,n,u)('else if(typeof d%s==="string")',n)("m%s=parseInt(d%s,10)",n,n)('else if(typeof d%s==="number")',n)("m%s=d%s",n,n)('else if(typeof d%s==="object")',n)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)",n,n,n,u?"true":"");break;case"bytes":e('if(typeof d%s==="string")',n)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)",n,n,n)("else if(d%s.length)",n)("m%s=d%s",n,n);break;case"string":e("m%s=String(d%s)",n,n);break;case"bool":e("m%s=Boolean(d%s)",n,n)}}return e}function i(e,t,r,n){if(t.resolvedType)t.resolvedType instanceof s?e("d%s=o.enums===String?types[%i].values[m%s]:m%s",n,r,n,n):e("d%s=types[%i].toObject(m%s,o)",n,r,n);else{var i=!1;switch(t.type){case"double":case"float":e("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s",n,n,n,n);break;case"uint64":i=!0;case"int64":case"sint64":case"fixed64":case"sfixed64":e('if(typeof m%s==="number")',n)("d%s=o.longs===String?String(m%s):m%s",n,n,n)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s",n,n,n,n,i?"true":"",n);break;case"bytes":e("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s",n,n,n,n,n);break;default:e("d%s=m%s",n,n)}}return e}var o=r,s=e(15),a=e(37);o.fromObject=function(e){var t=e.fieldsArray,r=a.codegen(["d"],e.name+"$fromObject")("if(d instanceof this.ctor)")("return d");if(!t.length)return r("return new this.ctor");r("var m=new this.ctor");for(var i=0;i<t.length;++i){var o=t[i].resolve(),u=a.safeProp(o.name);o.map?(r("if(d%s){",u)('if(typeof d%s!=="object")',u)("throw TypeError(%j)",o.fullName+": object expected")("m%s={}",u)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){",u),n(r,o,i,u+"[ks[i]]")("}")("}")):o.repeated?(r("if(d%s){",u)("if(!Array.isArray(d%s))",u)("throw TypeError(%j)",o.fullName+": array expected")("m%s=[]",u)("for(var i=0;i<d%s.length;++i){",u),n(r,o,i,u+"[i]")("}")("}")):(o.resolvedType instanceof s||r("if(d%s!=null){",u),n(r,o,i,u),o.resolvedType instanceof s||r("}"))}return r("return m")},o.toObject=function(e){var t=e.fieldsArray.slice().sort(a.compareFieldsById);if(!t.length)return a.codegen()("return {}");for(var r=a.codegen(["m","o"],e.name+"$toObject")("if(!o)")("o={}")("var d={}"),n=[],o=[],s=[],u=0;u<t.length;++u)t[u].partOf||(t[u].resolve().repeated?n:t[u].map?o:s).push(t[u]);var f,l,p=!1;for(u=0;u<t.length;++u){var f=t[u],c=e.b.indexOf(f),l=a.safeProp(f.name);f.map?(p||(p=!0,r("var ks2")),r("if(m%s&&(ks2=Object.keys(m%s)).length){",l,l)("d%s={}",l)("for(var j=0;j<ks2.length;++j){"),i(r,f,c,l+"[ks2[j]]")("}")):f.repeated?(r("if(m%s&&m%s.length){",l,l)("d%s=[]",l)("for(var j=0;j<m%s.length;++j){",l),i(r,f,c,l+"[j]")("}")):(r("if(m%s!=null&&m.hasOwnProperty(%j)){",l,f.name),i(r,f,c,l),f.partOf&&r("if(o.oneofs)")("d%s=%j",a.safeProp(f.partOf.name),f.name)),r("}")}return r("return d")}},{15:15,37:37}],13:[function(e,r){function n(e){return"missing required '"+e.name+"'"}function i(e){var r=a.codegen(["r","l"],e.name+"$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor"+(e.fieldsArray.filter(function(e){return e.map}).length?",k":""))("while(r.pos<c){")("var t=r.uint32()");e.group&&r("if((t&7)===4)")("break"),r("switch(t>>>3){");for(var i=0;i<e.fieldsArray.length;++i){var u=e.b[i].resolve(),f=u.resolvedType instanceof o?"int32":u.type,l="m"+a.safeProp(u.name);r("case %i:",u.id),u.map?(r("r.skip().pos++")("if(%s===util.emptyObject)",l)("%s={}",l)("k=r.%s()",u.keyType)("r.pos++"),s.long[u.keyType]!==t?s.basic[f]===t?r('%s[typeof k==="object"?util.longToHash(k):k]=types[%i].decode(r,r.uint32())',l,i):r('%s[typeof k==="object"?util.longToHash(k):k]=r.%s()',l,f):s.basic[f]===t?r("%s[k]=types[%i].decode(r,r.uint32())",l,i):r("%s[k]=r.%s()",l,f)):u.repeated?(r("if(!(%s&&%s.length))",l,l)("%s=[]",l),s.packed[f]!==t&&r("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())",l,f)("}else"),s.basic[f]===t?r(u.resolvedType.group?"%s.push(types[%i].decode(r))":"%s.push(types[%i].decode(r,r.uint32()))",l,i):r("%s.push(r.%s())",l,f)):s.basic[f]===t?r(u.resolvedType.group?"%s=types[%i].decode(r)":"%s=types[%i].decode(r,r.uint32())",l,i):r("%s=r.%s()",l,f),r("break")}for(r("default:")("r.skipType(t&7)")("break")("}")("}"),i=0;i<e.b.length;++i){var p=e.b[i];p.required&&r("if(!m.hasOwnProperty(%j))",p.name)("throw util.ProtocolError(%j,{instance:m})",n(p))}return r("return m")}r.exports=i;var o=e(15),s=e(36),a=e(37)},{15:15,36:36,37:37}],14:[function(e,r){function n(e,t,r,n){return t.resolvedType.group?e("types[%i].encode(%s,w.uint32(%i)).uint32(%i)",r,n,(t.id<<3|3)>>>0,(t.id<<3|4)>>>0):e("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()",r,n,(t.id<<3|2)>>>0)}function i(e){for(var r,i,u=a.codegen(["m","w"],e.name+"$encode")("if(!w)")("w=Writer.create()"),f=e.fieldsArray.slice().sort(a.compareFieldsById),r=0;r<f.length;++r){var l=f[r].resolve(),p=e.b.indexOf(l),c=l.resolvedType instanceof o?"int32":l.type,h=s.basic[c];i="m"+a.safeProp(l.name),l.map?(u("if(%s!=null&&m.hasOwnProperty(%j)){",i,l.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){",i)("w.uint32(%i).fork().uint32(%i).%s(ks[i])",(l.id<<3|2)>>>0,8|s.mapKey[l.keyType],l.keyType),h===t?u("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()",p,i):u(".uint32(%i).%s(%s[ks[i]]).ldelim()",16|h,c,i),u("}")("}")):l.repeated?(u("if(%s!=null&&%s.length){",i,i),l.packed&&s.packed[c]!==t?u("w.uint32(%i).fork()",(l.id<<3|2)>>>0)("for(var i=0;i<%s.length;++i)",i)("w.%s(%s[i])",c,i)("w.ldelim()"):(u("for(var i=0;i<%s.length;++i)",i),h===t?n(u,l,p,i+"[i]"):u("w.uint32(%i).%s(%s[i])",(l.id<<3|h)>>>0,c,i)),u("}")):(l.optional&&u("if(%s!=null&&m.hasOwnProperty(%j))",i,l.name),h===t?n(u,l,p,i):u("w.uint32(%i).%s(%s)",(l.id<<3|h)>>>0,c,i))}return u("return w")}r.exports=i;var o=e(15),s=e(36),a=e(37)},{15:15,36:36,37:37}],15:[function(e,r){function n(e,r,n){if(i.call(this,e,n),r&&"object"!=typeof r)throw TypeError("values must be an object");if(this.valuesById={},this.values=Object.create(this.valuesById),this.comments={},this.reserved=t,r)for(var o=Object.keys(r),s=0;s<o.length;++s)"number"==typeof r[o[s]]&&(this.valuesById[this.values[o[s]]=r[o[s]]]=o[s])}r.exports=n;var i=e(24);((n.prototype=Object.create(i.prototype)).constructor=n).className="Enum";var o=e(23),s=e(37);n.fromJSON=function(e,t){var r=new n(e,t.values,t.options);return r.reserved=t.reserved,r},n.prototype.toJSON=function(){return s.toObject(["options",this.options,"values",this.values,"reserved",this.reserved&&this.reserved.length?this.reserved:t])},n.prototype.add=function(e,r,n){if(!s.isString(e))throw TypeError("name must be a string");if(!s.isInteger(r))throw TypeError("id must be an integer");if(this.values[e]!==t)throw Error("duplicate name '"+e+"' in "+this);if(this.isReservedId(r))throw Error("id "+r+" is reserved in "+this);if(this.isReservedName(e))throw Error("name '"+e+"' is reserved in "+this);if(this.valuesById[r]!==t){if(!this.options||!this.options.allow_alias)throw Error("duplicate id "+r+" in "+this);this.values[e]=r}else this.valuesById[this.values[e]=r]=e;return this.comments[e]=n||null,this},n.prototype.remove=function(e){if(!s.isString(e))throw TypeError("name must be a string");var t=this.values[e];if(null==t)throw Error("name '"+e+"' does not exist in "+this);return delete this.valuesById[t],delete this.values[e],delete this.comments[e],this},n.prototype.isReservedId=function(e){return o.isReservedId(this.reserved,e)},n.prototype.isReservedName=function(e){return o.isReservedName(this.reserved,e)}},{23:23,24:24,37:37}],16:[function(e,r){function n(e,r,n,o,s,l){if(u.isObject(o)?(l=o,o=s=t):u.isObject(s)&&(l=s,s=t),i.call(this,e,l),!u.isInteger(r)||r<0)throw TypeError("id must be a non-negative integer");if(!u.isString(n))throw TypeError("type must be a string");if(o!==t&&!f.test(o=(""+o).toLowerCase()))throw TypeError("rule must be a string rule");if(s!==t&&!u.isString(s))throw TypeError("extend must be a string");this.rule=o&&"optional"!==o?o:t,this.type=n,this.id=r,this.extend=s||t,this.required="required"===o,this.optional=!this.required,this.repeated="repeated"===o,this.map=!1,this.message=null,this.partOf=null,this.typeDefault=null,this.defaultValue=null,this.long=!!u.Long&&a.long[n]!==t,this.bytes="bytes"===n,this.resolvedType=null,this.extensionField=null,this.declaringField=null,this.c=null}r.exports=n;var i=e(24);((n.prototype=Object.create(i.prototype)).constructor=n).className="Field";var o,s=e(15),a=e(36),u=e(37),f=/^required|optional|repeated$/;n.fromJSON=function(e,t){return new n(e,t.id,t.type,t.rule,t.extend,t.options)},Object.defineProperty(n.prototype,"packed",{get:function(){return null===this.c&&(this.c=!1!==this.getOption("packed")),this.c}}),n.prototype.setOption=function(e,t,r){return"packed"===e&&(this.c=null),i.prototype.setOption.call(this,e,t,r)},n.prototype.toJSON=function(){return u.toObject(["rule","optional"!==this.rule&&this.rule||t,"type",this.type,"id",this.id,"extend",this.extend,"options",this.options])},n.prototype.resolve=function(){if(this.resolved)return this;if((this.typeDefault=a.defaults[this.type])===t&&(this.resolvedType=(this.declaringField?this.declaringField.parent:this.parent).lookupTypeOrEnum(this.type),this.resolvedType instanceof o?this.typeDefault=null:this.typeDefault=this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]),this.options&&null!=this.options.default&&(this.typeDefault=this.options.default,this.resolvedType instanceof s&&"string"==typeof this.typeDefault&&(this.typeDefault=this.resolvedType.values[this.typeDefault])),this.options&&(!0!==this.options.packed&&(this.options.packed===t||!this.resolvedType||this.resolvedType instanceof s)||delete this.options.packed,Object.keys(this.options).length||(this.options=t)),this.long)this.typeDefault=u.Long.fromNumber(this.typeDefault,"u"===this.type.charAt(0)),Object.freeze&&Object.freeze(this.typeDefault);else if(this.bytes&&"string"==typeof this.typeDefault){var e;u.base64.test(this.typeDefault)?u.base64.decode(this.typeDefault,e=u.newBuffer(u.base64.length(this.typeDefault)),0):u.utf8.write(this.typeDefault,e=u.newBuffer(u.utf8.length(this.typeDefault)),0),this.typeDefault=e}return this.map?this.defaultValue=u.emptyObject:this.repeated?this.defaultValue=u.emptyArray:this.defaultValue=this.typeDefault,this.parent instanceof o&&(this.parent.ctor.prototype[this.name]=this.defaultValue),i.prototype.resolve.call(this)},n.d=function(e,t,r,i){return"function"==typeof t?t=u.decorateType(t).name:t&&"object"==typeof t&&(t=u.decorateEnum(t).name),function(o,s){u.decorateType(o.constructor).add(new n(s,e,t,r,{default:i}))}},n.e=function(e){o=e}},{15:15,24:24,36:36,37:37}],17:[function(e,t){function r(e,t,r){return"function"==typeof t?(r=t,t=new i.Root):t||(t=new i.Root),t.load(e,r)}function n(e,t){return t||(t=new i.Root),t.loadSync(e)}var i=t.exports=e(18);i.build="light",i.load=r,i.loadSync=n,i.encoder=e(14),i.decoder=e(13),i.verifier=e(40),i.converter=e(12),i.ReflectionObject=e(24),i.Namespace=e(23),i.Root=e(29),i.Enum=e(15),i.Type=e(35),i.Field=e(16),i.OneOf=e(25),i.MapField=e(20),i.Service=e(33),i.Method=e(22),i.Message=e(21),i.wrappers=e(41),i.types=e(36),i.util=e(37),i.ReflectionObject.e(i.Root),i.Namespace.e(i.Type,i.Service),i.Root.e(i.Type),i.Field.e(i.Type)},{12:12,13:13,14:14,15:15,16:16,18:18,20:20,21:21,22:22,23:23,24:24,25:25,29:29,33:33,35:35,36:36,37:37,40:40,41:41}],18:[function(e,t,r){function n(){i.Reader.e(i.BufferReader),i.util.e()}var i=r;i.build="minimal",i.Writer=e(42),i.BufferWriter=e(43),i.Reader=e(27),i.BufferReader=e(28),i.util=e(39),i.rpc=e(31),i.roots=e(30),i.configure=n,i.Writer.e(i.BufferWriter),n()},{27:27,28:28,30:30,31:31,39:39,42:42,43:43}],19:[function(e,t){var r=t.exports=e(17);r.build="full",r.tokenize=e(34),r.parse=e(26),r.common=e(11),r.Root.e(r.Type,r.parse,r.common)},{11:11,17:17,26:26,34:34}],20:[function(e,r){function n(e,t,r,n,o){if(i.call(this,e,t,n,o),!s.isString(r))throw TypeError("keyType must be a string");this.keyType=r,this.resolvedKeyType=null,this.map=!0}r.exports=n;var i=e(16);((n.prototype=Object.create(i.prototype)).constructor=n).className="MapField";var o=e(36),s=e(37);n.fromJSON=function(e,t){return new n(e,t.id,t.keyType,t.type,t.options)},n.prototype.toJSON=function(){return s.toObject(["keyType",this.keyType,"type",this.type,"id",this.id,"extend",this.extend,"options",this.options])},n.prototype.resolve=function(){if(this.resolved)return this;if(o.mapKey[this.keyType]===t)throw Error("invalid key type: "+this.keyType);return i.prototype.resolve.call(this)},n.d=function(e,t,r){return"function"==typeof r?r=s.decorateType(r).name:r&&"object"==typeof r&&(r=s.decorateEnum(r).name),function(i,o){s.decorateType(i.constructor).add(new n(o,e,t,r))}}},{16:16,36:36,37:37}],21:[function(e,t){function r(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)this[t[r]]=e[t[r]]}t.exports=r;var n=e(39);r.create=function(e){return this.$type.create(e)},r.encode=function(e,t){return this.$type.encode(e,t)},r.encodeDelimited=function(e,t){return this.$type.encodeDelimited(e,t)},r.decode=function(e){return this.$type.decode(e)},r.decodeDelimited=function(e){return this.$type.decodeDelimited(e)},r.verify=function(e){return this.$type.verify(e)},r.fromObject=function(e){return this.$type.fromObject(e)},r.toObject=function(e,t){return this.$type.toObject(e,t)},r.prototype.toJSON=function(){return this.$type.toObject(this,n.toJSONOptions)}},{39:39}],22:[function(e,r){function n(e,r,n,s,a,u,f){if(o.isObject(a)?(f=a,a=u=t):o.isObject(u)&&(f=u,u=t),r!==t&&!o.isString(r))throw TypeError("type must be a string");if(!o.isString(n))throw TypeError("requestType must be a string");if(!o.isString(s))throw TypeError("responseType must be a string");i.call(this,e,f),this.type=r||"rpc",this.requestType=n,this.requestStream=!!a||t,this.responseType=s,this.responseStream=!!u||t,this.resolvedRequestType=null,this.resolvedResponseType=null}r.exports=n;var i=e(24);((n.prototype=Object.create(i.prototype)).constructor=n).className="Method";var o=e(37);n.fromJSON=function(e,t){return new n(e,t.type,t.requestType,t.responseType,t.requestStream,t.responseStream,t.options)},n.prototype.toJSON=function(){return o.toObject(["type","rpc"!==this.type&&this.type||t,"requestType",this.requestType,"requestStream",this.requestStream,"responseType",this.responseType,"responseStream",this.responseStream,"options",this.options])},n.prototype.resolve=function(){return this.resolved?this:(this.resolvedRequestType=this.parent.lookupType(this.requestType),this.resolvedResponseType=this.parent.lookupType(this.responseType),i.prototype.resolve.call(this))}},{24:24,37:37}],23:[function(e,r){function n(e){if(!e||!e.length)return t;for(var r={},n=0;n<e.length;++n)r[e[n].name]=e[n].toJSON();return r}function i(e,r){s.call(this,e,r),this.nested=t,this.f=null}function o(e){return e.f=null,e}r.exports=i;var s=e(24);((i.prototype=Object.create(s.prototype)).constructor=i).className="Namespace";var a,u,f=e(15),l=e(16),p=e(37);i.fromJSON=function(e,t){return new i(e,t.options).addJSON(t.nested)},i.arrayToJSON=n,i.isReservedId=function(e,t){if(e)for(var r=0;r<e.length;++r)if("string"!=typeof e[r]&&e[r][0]<=t&&e[r][1]>=t)return!0;return!1},i.isReservedName=function(e,t){if(e)for(var r=0;r<e.length;++r)if(e[r]===t)return!0;return!1},Object.defineProperty(i.prototype,"nestedArray",{get:function(){return this.f||(this.f=p.toArray(this.nested))}}),i.prototype.toJSON=function(){return p.toObject(["options",this.options,"nested",n(this.nestedArray)])},i.prototype.addJSON=function(e){var r=this;if(e)for(var n,o=Object.keys(e),s=0;s<o.length;++s)n=e[o[s]],r.add((n.fields!==t?a.fromJSON:n.values!==t?f.fromJSON:n.methods!==t?u.fromJSON:n.id!==t?l.fromJSON:i.fromJSON)(o[s],n));return this},i.prototype.get=function(e){return this.nested&&this.nested[e]||null},i.prototype.getEnum=function(e){if(this.nested&&this.nested[e]instanceof f)return this.nested[e].values;throw Error("no such enum")},i.prototype.add=function(e){if(!(e instanceof l&&e.extend!==t||e instanceof a||e instanceof f||e instanceof u||e instanceof i))throw TypeError("object must be a valid nested object");if(this.nested){var r=this.get(e.name);if(r){if(!(r instanceof i&&e instanceof i)||r instanceof a||r instanceof u)throw Error("duplicate name '"+e.name+"' in "+this);for(var n=r.nestedArray,s=0;s<n.length;++s)e.add(n[s]);this.remove(r),this.nested||(this.nested={}),e.setOptions(r.options,!0)}}else this.nested={};return this.nested[e.name]=e,e.onAdd(this),o(this)},i.prototype.remove=function(e){if(!(e instanceof s))throw TypeError("object must be a ReflectionObject");if(e.parent!==this)throw Error(e+" is not a member of "+this);return delete this.nested[e.name],Object.keys(this.nested).length||(this.nested=t),e.onRemove(this),o(this)},i.prototype.define=function(e,t){if(p.isString(e))e=e.split(".");else if(!Array.isArray(e))throw TypeError("illegal path");if(e&&e.length&&""===e[0])throw Error("path must be relative");for(var r=this;e.length>0;){var n=e.shift();if(r.nested&&r.nested[n]){if(!((r=r.nested[n])instanceof i))throw Error("path conflicts with non-namespace objects")}else r.add(r=new i(n))}return t&&r.addJSON(t),r},i.prototype.resolveAll=function(){for(var e=this.nestedArray,t=0;t<e.length;)e[t]instanceof i?e[t++].resolveAll():e[t++].resolve();return this.resolve()},i.prototype.lookup=function(e,r,n){if("boolean"==typeof r?(n=r,r=t):r&&!Array.isArray(r)&&(r=[r]),p.isString(e)&&e.length){if("."===e)return this.root;e=e.split(".")}else if(!e.length)return this;if(""===e[0])return this.root.lookup(e.slice(1),r);var o=this.get(e[0]);if(o){if(1===e.length){if(!r||r.indexOf(o.constructor)>-1)return o}else if(o instanceof i&&(o=o.lookup(e.slice(1),r,!0)))return o}else for(var s=0;s<this.nestedArray.length;++s)if(this.f[s]instanceof i&&(o=this.f[s].lookup(e,r,!0)))return o;return null===this.parent||n?null:this.parent.lookup(e,r)},i.prototype.lookupType=function(e){var t=this.lookup(e,[a]);if(!t)throw Error("no such type");return t},i.prototype.lookupEnum=function(e){var t=this.lookup(e,[f]);if(!t)throw Error("no such Enum '"+e+"' in "+this);return t},i.prototype.lookupTypeOrEnum=function(e){var t=this.lookup(e,[a,f]);if(!t)throw Error("no such Type or Enum '"+e+"' in "+this);return t},i.prototype.lookupService=function(e){var t=this.lookup(e,[u]);if(!t)throw Error("no such Service '"+e+"' in "+this);return t},i.e=function(e,t){a=e,u=t}},{15:15,16:16,24:24,37:37}],24:[function(e,r){function n(e,t){if(!o.isString(e))throw TypeError("name must be a string");if(t&&!o.isObject(t))throw TypeError("options must be an object");this.options=t,this.name=e,this.parent=null,this.resolved=!1,this.comment=null,this.filename=null}r.exports=n,n.className="ReflectionObject";var i,o=e(37);Object.defineProperties(n.prototype,{root:{get:function(){for(var e=this;null!==e.parent;)e=e.parent;return e}},fullName:{get:function(){for(var e=[this.name],t=this.parent;t;)e.unshift(t.name),t=t.parent;return e.join(".")}}}),n.prototype.toJSON=function(){throw Error()},n.prototype.onAdd=function(e){this.parent&&this.parent!==e&&this.parent.remove(this),this.parent=e,this.resolved=!1;var t=e.root;t instanceof i&&t.g(this)},n.prototype.onRemove=function(e){var t=e.root;t instanceof i&&t.h(this),this.parent=null,this.resolved=!1},n.prototype.resolve=function(){return this.resolved?this:(this.root instanceof i&&(this.resolved=!0),this)},n.prototype.getOption=function(e){return this.options?this.options[e]:t},n.prototype.setOption=function(e,r,n){return n&&this.options&&this.options[e]!==t||((this.options||(this.options={}))[e]=r),this},n.prototype.setOptions=function(e,t){if(e)for(var r=Object.keys(e),n=0;n<r.length;++n)this.setOption(r[n],e[r[n]],t);return this},n.prototype.toString=function(){var e=this.constructor.className,t=this.fullName;return t.length?e+" "+t:e},n.e=function(e){i=e}},{37:37}],25:[function(e,r){function n(e,r,n){if(Array.isArray(r)||(n=r,r=t),o.call(this,e,n),r!==t&&!Array.isArray(r))throw TypeError("fieldNames must be an Array");this.oneof=r||[],this.fieldsArray=[]}function i(e){if(e.parent)for(var t=0;t<e.fieldsArray.length;++t)e.fieldsArray[t].parent||e.parent.add(e.fieldsArray[t])}r.exports=n;var o=e(24);((n.prototype=Object.create(o.prototype)).constructor=n).className="OneOf";var s=e(16),a=e(37);n.fromJSON=function(e,t){return new n(e,t.oneof,t.options)},n.prototype.toJSON=function(){return a.toObject(["options",this.options,"oneof",this.oneof])},n.prototype.add=function(e){if(!(e instanceof s))throw TypeError("field must be a Field");return e.parent&&e.parent!==this.parent&&e.parent.remove(e),this.oneof.push(e.name),this.fieldsArray.push(e),e.partOf=this,i(this),this},n.prototype.remove=function(e){if(!(e instanceof s))throw TypeError("field must be a Field");var t=this.fieldsArray.indexOf(e);if(t<0)throw Error(e+" is not a member of "+this);return this.fieldsArray.splice(t,1),t=this.oneof.indexOf(e.name),t>-1&&this.oneof.splice(t,1),e.partOf=null,this},n.prototype.onAdd=function(e){o.prototype.onAdd.call(this,e);for(var t=this,r=0;r<this.oneof.length;++r){var n=e.get(this.oneof[r]);n&&!n.partOf&&(n.partOf=t,t.fieldsArray.push(n))}i(this)},n.prototype.onRemove=function(e){for(var t,r=0;r<this.fieldsArray.length;++r)(t=this.fieldsArray[r]).parent&&t.parent.remove(t);o.prototype.onRemove.call(this,e)},n.d=function(){for(var e=Array(arguments.length),t=0;t<arguments.length;)e[t]=arguments[t++];return function(t,r){a.decorateType(t.constructor).add(new n(r,e)),Object.defineProperty(t,r,{get:a.oneOfGetter(e),set:a.oneOfSetter(e)})}}},{16:16,24:24,37:37}],26:[function(e,r){function n(e,r,A){function S(e,t,r){var i=n.filename;return r||(n.filename=null),Error("illegal "+(t||"token")+" '"+e+"' ("+(i?i+", ":"")+"line "+Y.line+")")}function T(){var e,t=[];do{if('"'!==(e=ee())&&"'"!==e)throw S(e);t.push(ee()),ne(e),e=re()}while('"'===e||"'"===e);return t.join("")}function E(e){var t=ee();switch(t){case"'":case'"':return te(t),T();case"true":case"TRUE":return!0;case"false":case"FALSE":return!1}try{return R(t,!0)}catch(r){if(e&&j.test(t))return t;throw S(t,"value")}}function N(e,t){var r,n;do{!t||'"'!==(r=re())&&"'"!==r?e.push([n=I(ee()),ne("to",!0)?I(ee()):n]):e.push(T())}while(ne(",",!0));ne(";")}function R(e,t){var r=1;switch("-"===e.charAt(0)&&(r=-1,e=e.substring(1)),e){case"inf":case"INF":case"Inf":return r*(1/0);case"nan":case"NAN":case"Nan":case"NaN":return NaN;case"0":return 0}if(y.test(e))return r*parseInt(e,10);if(m.test(e))return r*parseInt(e,16);if(b.test(e))return r*parseInt(e,8);if(O.test(e))return r*parseFloat(e);throw S(e,"number",t)}function I(e,t){switch(e){case"max":case"MAX":case"Max":return 536870911;case"0":return 0}if(!t&&"-"===e.charAt(0))throw S(e,"id");if(v.test(e))return parseInt(e,10);if(g.test(e))return parseInt(e,16);if(w.test(e))return parseInt(e,8);throw S(e,"id")}function F(e,t){switch(t){case"option":return z(e,t),ne(";"),!0;case"message":return B(e,t),!0;case"enum":return V(e,t),!0;case"service":return _(e,t),!0;case"extend":return Z(e,t),!0}return!1}function L(e,t,r){var i=Y.line;if(e&&(e.comment=ie(),e.filename=n.filename),ne("{",!0)){for(var o;"}"!==(o=ee());)t(o);ne(";",!0)}else r&&r(),ne(";"),e&&"string"!=typeof e.comment&&(e.comment=ie(i))}function B(e,t){if(!k.test(t=ee()))throw S(t,"type name");var r=new s(t);L(r,function(e){if(!F(r,e))switch(e){case"map":D(r);break;case"required":case"optional":case"repeated":J(r,e);break;case"oneof":P(r,e);break;case"extensions":N(r.extensions||(r.extensions=[]));break;case"reserved":N(r.reserved||(r.reserved=[]),!0);break;default:if(!se||!j.test(e))throw S(e);te(e),J(r,"optional")}}),e.add(r)}function J(e,r,n){var i=ee();if("group"===i)return void $(e,r);if(!j.test(i))throw S(i,"type");var o=ee();if(!k.test(o))throw S(o,"name");o=ue(o),ne("=");var s=new a(o,I(ee()),i,r,n);L(s,function(e){if("option"!==e)throw S(e);z(s,e),ne(";")},function(){U(s)}),e.add(s),se||!s.repeated||h.packed[i]===t&&h.basic[i]!==t||s.setOption("packed",!1,!0)}function $(e,t){var r=ee();if(!k.test(r))throw S(r,"name");var i=d.lcFirst(r);r===i&&(r=d.ucFirst(r)),ne("=");var o=I(ee()),u=new s(r);u.group=!0;var f=new a(i,o,r,t);f.filename=n.filename,L(u,function(e){switch(e){case"option":z(u,e),ne(";");break;case"required":case"optional":case"repeated":J(u,e);break;default:throw S(e)}}),e.add(u).add(f)}function D(e){ne("<");var r=ee();if(h.mapKey[r]===t)throw S(r,"type");ne(",");var n=ee();if(!j.test(n))throw S(n,"type");ne(">");var i=ee();if(!k.test(i))throw S(i,"name");ne("=");var o=new u(ue(i),I(ee()),r,n);L(o,function(e){if("option"!==e)throw S(e);z(o,e),ne(";")},function(){U(o)}),e.add(o)}function P(e,t){if(!k.test(t=ee()))throw S(t,"name");var r=new f(ue(t));L(r,function(e){"option"===e?(z(r,e),ne(";")):(te(e),J(r,"optional"))}),e.add(r)}function V(e,t){if(!k.test(t=ee()))throw S(t,"name");var r=new l(t);L(r,function(e){switch(e){case"option":z(r,e),ne(";");break;case"reserved":N(r.reserved||(r.reserved=[]),!0);break;default:q(r,e)}}),e.add(r)}function q(e,t){if(!k.test(t))throw S(t,"name");ne("=");var r=I(ee(),!0),n={};L(n,function(e){if("option"!==e)throw S(e);z(n,e),ne(";")},function(){U(n)}),e.add(t,r,n.comment)}function z(e,t){var r=ne("(",!0);if(!j.test(t=ee()))throw S(t,"name");var n=t;r&&(ne(")"),n="("+n+")",t=re(),x.test(t)&&(n+=t,ee())),ne("="),C(e,n)}function C(e,t){if(ne("{",!0))do{if(!k.test(Q=ee()))throw S(Q,"name");"{"===re()?C(e,t+"."+Q):(ne(":"),"{"===re()?C(e,t+"."+Q):M(e,t+"."+Q,E(!0)))}while(!ne("}",!0));else M(e,t,E(!0))}function M(e,t,r){e.setOption&&e.setOption(t,r)}function U(e){if(ne("[",!0)){do{z(e,"option")}while(ne(",",!0));ne("]")}return e}function _(e,t){if(!k.test(t=ee()))throw S(t,"service name");var r=new p(t);L(r,function(e){if(!F(r,e)){if("rpc"!==e)throw S(e);H(r,e)}}),e.add(r)}function H(e,t){var r=t;if(!k.test(t=ee()))throw S(t,"name");var n,i,o,s,a=t;if(ne("("),ne("stream",!0)&&(i=!0),!j.test(t=ee()))throw S(t);if(n=t,ne(")"),ne("returns"),ne("("),ne("stream",!0)&&(s=!0),!j.test(t=ee()))throw S(t);o=t,ne(")");var u=new c(a,r,n,o,i,s);L(u,function(e){if("option"!==e)throw S(e);z(u,e),ne(";")}),e.add(u)}function Z(e,t){if(!j.test(t=ee()))throw S(t,"reference");var r=t;L(null,function(t){switch(t){case"required":case"repeated":case"optional":J(e,t,r);break;default:if(!se||!j.test(t))throw S(t);te(t),J(e,"optional",r)}})}r instanceof o||(A=r,r=new o),A||(A=n.defaults);for(var W,K,G,X,Q,Y=i(e),ee=Y.next,te=Y.push,re=Y.peek,ne=Y.skip,ie=Y.cmnt,oe=!0,se=!1,ae=r,ue=A.keepCase?function(e){return e}:d.camelCase;null!==(Q=ee());)switch(Q){case"package":if(!oe)throw S(Q);!function(){if(W!==t)throw S("package");if(W=ee(),!j.test(W))throw S(W,"name");ae=ae.define(W),ne(";")}();break;case"import":if(!oe)throw S(Q);!function(){var e,t=re();switch(t){case"weak":e=G||(G=[]),ee();break;case"public":ee();default:e=K||(K=[])}t=T(),ne(";"),e.push(t)}();break;case"syntax":if(!oe)throw S(Q);!function(){if(ne("="),X=T(),!(se="proto3"===X)&&"proto2"!==X)throw S(X,"syntax");ne(";")}();break;case"option":if(!oe)throw S(Q);z(ae,Q),ne(";");break;default:if(F(ae,Q)){oe=!1;continue}throw S(Q)}return n.filename=null,{package:W,imports:K,weakImports:G,syntax:X,root:r}}r.exports=n,n.filename=null,n.defaults={keepCase:!1};var i=e(34),o=e(29),s=e(35),a=e(16),u=e(20),f=e(25),l=e(15),p=e(33),c=e(22),h=e(36),d=e(37),y=/^[1-9][0-9]*$/,v=/^-?[1-9][0-9]*$/,m=/^0[x][0-9a-fA-F]+$/,g=/^-?0[x][0-9a-fA-F]+$/,b=/^0[0-7]+$/,w=/^-?0[0-7]+$/,O=/^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,k=/^[a-zA-Z_][a-zA-Z_0-9]*$/,j=/^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,x=/^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/},{15:15,16:16,20:20,22:22,25:25,29:29,33:33,34:34,35:35,36:36,37:37}],27:[function(e,t){function r(e,t){return RangeError("index out of range: "+e.pos+" + "+(t||1)+" > "+e.len)}function n(e){this.buf=e,this.pos=0,this.len=e.length}function i(){var e=new f(0,0),t=0;if(!(this.len-this.pos>4)){for(;t<3;++t){if(this.pos>=this.len)throw r(this);if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e}return e.lo=(e.lo|(127&this.buf[this.pos++])<<7*t)>>>0,e}for(;t<4;++t)if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e;if(e.lo=(e.lo|(127&this.buf[this.pos])<<28)>>>0,e.hi=(e.hi|(127&this.buf[this.pos])>>4)>>>0,this.buf[this.pos++]<128)return e;if(t=0,this.len-this.pos>4){for(;t<5;++t)if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}else for(;t<5;++t){if(this.pos>=this.len)throw r(this);if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}throw Error("invalid varint encoding")}function o(e,t){return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0}function s(){if(this.pos+8>this.len)throw r(this,8);return new f(o(this.buf,this.pos+=4),o(this.buf,this.pos+=4))}t.exports=n;var a,u=e(39),f=u.LongBits,l=u.utf8,p="undefined"!=typeof Uint8Array?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new n(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new n(e);throw Error("illegal buffer")};n.create=u.Buffer?function(e){return(n.create=function(e){return u.Buffer.isBuffer(e)?new a(e):p(e)})(e)}:p,n.prototype.i=u.Array.prototype.subarray||u.Array.prototype.slice,n.prototype.uint32=function(){var e=4294967295;return function(){if(e=(127&this.buf[this.pos])>>>0,this.buf[this.pos++]<128)return e;if(e=(e|(127&this.buf[this.pos])<<7)>>>0,this.buf[this.pos++]<128)return e;if(e=(e|(127&this.buf[this.pos])<<14)>>>0,this.buf[this.pos++]<128)return e;if(e=(e|(127&this.buf[this.pos])<<21)>>>0,this.buf[this.pos++]<128)return e;if(e=(e|(15&this.buf[this.pos])<<28)>>>0,this.buf[this.pos++]<128)return e;if((this.pos+=5)>this.len)throw this.pos=this.len,r(this,10);return e}}(),n.prototype.int32=function(){return 0|this.uint32()},n.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(1&e)|0},n.prototype.bool=function(){return 0!==this.uint32()},n.prototype.fixed32=function(){if(this.pos+4>this.len)throw r(this,4);return o(this.buf,this.pos+=4)},n.prototype.sfixed32=function(){if(this.pos+4>this.len)throw r(this,4);return 0|o(this.buf,this.pos+=4)},n.prototype.float=function(){if(this.pos+4>this.len)throw r(this,4);var e=u.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e},n.prototype.double=function(){if(this.pos+8>this.len)throw r(this,4);var e=u.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e},n.prototype.bytes=function(){var e=this.uint32(),t=this.pos,n=this.pos+e;if(n>this.len)throw r(this,e);return this.pos+=e,Array.isArray(this.buf)?this.buf.slice(t,n):t===n?new this.buf.constructor(0):this.i.call(this.buf,t,n)},n.prototype.string=function(){var e=this.bytes();return l.read(e,0,e.length)},n.prototype.skip=function(e){if("number"==typeof e){if(this.pos+e>this.len)throw r(this,e);this.pos+=e}else do{if(this.pos>=this.len)throw r(this)}while(128&this.buf[this.pos++]);return this},n.prototype.skipType=function(e){switch(e){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;;){if(4==(e=7&this.uint32()))break;this.skipType(e)}break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+e+" at offset "+this.pos)}return this},n.e=function(e){a=e;var t=u.Long?"toLong":"toNumber";u.merge(n.prototype,{int64:function(){return i.call(this)[t](!1)},uint64:function(){return i.call(this)[t](!0)},sint64:function(){return i.call(this).zzDecode()[t](!1)},fixed64:function(){return s.call(this)[t](!0)},sfixed64:function(){return s.call(this)[t](!1)}})}},{39:39}],28:[function(e,t){function r(e){n.call(this,e)}t.exports=r;var n=e(27);(r.prototype=Object.create(n.prototype)).constructor=r;var i=e(39);i.Buffer&&(r.prototype.i=i.Buffer.prototype.slice),r.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len))}},{27:27,39:39}],29:[function(e,r){function n(e){s.call(this,"",e),this.deferred=[],this.files=[]}function i(){}function o(e,r){var n=r.parent.lookup(r.extend);if(n){var i=new l(r.fullName,r.id,r.type,r.rule,t,r.options);return i.declaringField=r,r.extensionField=i,n.add(i),!0}return!1}r.exports=n;var s=e(23);((n.prototype=Object.create(s.prototype)).constructor=n).className="Root";var a,u,f,l=e(16),p=e(15),c=e(25),h=e(37);n.fromJSON=function(e,t){return t||(t=new n),e.options&&t.setOptions(e.options),t.addJSON(e.nested)},n.prototype.resolvePath=h.path.resolve,n.prototype.load=function e(r,n,o){function s(e,t){if(o){var r=o;if(o=null,c)throw e;r(e,t)}}function a(e,t){try{if(h.isString(t)&&"{"===t.charAt(0)&&(t=JSON.parse(t)),h.isString(t)){u.filename=e;var r,i=u(t,p,n),o=0;if(i.imports)for(;o<i.imports.length;++o)(r=p.resolvePath(e,i.imports[o]))&&l(r);if(i.weakImports)for(o=0;o<i.weakImports.length;++o)(r=p.resolvePath(e,i.weakImports[o]))&&l(r,!0)}else p.setOptions(t.options).addJSON(t.nested)}catch(e){s(e)}c||d||s(null,p)}function l(e,t){var r=e.lastIndexOf("google/protobuf/");if(r>-1){var n=e.substring(r);n in f&&(e=n)}if(!(p.files.indexOf(e)>-1)){if(p.files.push(e),e in f)return void(c?a(e,f[e]):(++d,setTimeout(function(){--d,a(e,f[e])})));if(c){var i;try{i=h.fs.readFileSync(e).toString("utf8")}catch(e){return void(t||s(e))}a(e,i)}else++d,h.fetch(e,function(r,n){if(--d,o)return r?void(t?d||s(null,p):s(r)):void a(e,n)})}}"function"==typeof n&&(o=n,n=t);var p=this;if(!o)return h.asPromise(e,p,r,n);var c=o===i,d=0;h.isString(r)&&(r=[r]);for(var y,v=0;v<r.length;++v)(y=p.resolvePath("",r[v]))&&l(y);return c?p:(d||s(null,p),t)},n.prototype.loadSync=function(e,t){if(!h.isNode)throw Error("not supported");return this.load(e,t,i)},n.prototype.resolveAll=function(){if(this.deferred.length)throw Error("unresolvable extensions: "+this.deferred.map(function(e){return"'extend "+e.extend+"' in "+e.parent.fullName}).join(", "));return s.prototype.resolveAll.call(this)};var d=/^[A-Z]/;n.prototype.g=function(e){if(e instanceof l)e.extend===t||e.extensionField||o(this,e)||this.deferred.push(e);else if(e instanceof p)d.test(e.name)&&(e.parent[e.name]=e.values);else if(!(e instanceof c)){if(e instanceof a)for(var r=0;r<this.deferred.length;)o(this,this.deferred[r])?this.deferred.splice(r,1):++r;for(var n=0;n<e.nestedArray.length;++n)this.g(e.f[n]);d.test(e.name)&&(e.parent[e.name]=e)}},n.prototype.h=function(e){if(e instanceof l){if(e.extend!==t)if(e.extensionField)e.extensionField.parent.remove(e.extensionField),e.extensionField=null;else{var r=this.deferred.indexOf(e);r>-1&&this.deferred.splice(r,1)}}else if(e instanceof p)d.test(e.name)&&delete e.parent[e.name];else if(e instanceof s){for(var n=0;n<e.nestedArray.length;++n)this.h(e.f[n]);d.test(e.name)&&delete e.parent[e.name]}},n.e=function(e,t,r){a=e,u=t,f=r}},{15:15,16:16,23:23,25:25,37:37}],30:[function(e,t){t.exports={}},{}],31:[function(e,t,r){r.Service=e(32)},{32:32}],32:[function(e,r){function n(e,t,r){if("function"!=typeof e)throw TypeError("rpcImpl must be a function");i.EventEmitter.call(this),this.rpcImpl=e,this.requestDelimited=!!t,this.responseDelimited=!!r}r.exports=n;var i=e(39);(n.prototype=Object.create(i.EventEmitter.prototype)).constructor=n,n.prototype.rpcCall=function e(r,n,o,s,a){if(!s)throw TypeError("request must be specified");var u=this;if(!a)return i.asPromise(e,u,r,n,o,s);if(!u.rpcImpl)return setTimeout(function(){a(Error("already ended"))},0),t;try{return u.rpcImpl(r,n[u.requestDelimited?"encodeDelimited":"encode"](s).finish(),function(e,n){if(e)return u.emit("error",e,r),a(e);if(null===n)return u.end(!0),t;if(!(n instanceof o))try{n=o[u.responseDelimited?"decodeDelimited":"decode"](n)}catch(e){return u.emit("error",e,r),a(e)}return u.emit("data",n,r),a(null,n)})}catch(e){return u.emit("error",e,r),setTimeout(function(){a(e)},0),t}},n.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}},{39:39}],33:[function(e,r){function n(e,t){o.call(this,e,t),this.methods={},this.j=null}function i(e){return e.j=null,e}r.exports=n;var o=e(23);((n.prototype=Object.create(o.prototype)).constructor=n).className="Service";var s=e(22),a=e(37),u=e(31);n.fromJSON=function(e,t){var r=new n(e,t.options);if(t.methods)for(var i=Object.keys(t.methods),o=0;o<i.length;++o)r.add(s.fromJSON(i[o],t.methods[i[o]]));return t.nested&&r.addJSON(t.nested),r},n.prototype.toJSON=function(){var e=o.prototype.toJSON.call(this);return a.toObject(["options",e&&e.options||t,"methods",o.arrayToJSON(this.methodsArray)||{},"nested",e&&e.nested||t])},Object.defineProperty(n.prototype,"methodsArray",{get:function(){return this.j||(this.j=a.toArray(this.methods))}}),n.prototype.get=function(e){return this.methods[e]||o.prototype.get.call(this,e)},n.prototype.resolveAll=function(){for(var e=this.methodsArray,t=0;t<e.length;++t)e[t].resolve();return o.prototype.resolve.call(this)},n.prototype.add=function(e){if(this.get(e.name))throw Error("duplicate name '"+e.name+"' in "+this);return e instanceof s?(this.methods[e.name]=e,e.parent=this,i(this)):o.prototype.add.call(this,e)},n.prototype.remove=function(e){if(e instanceof s){if(this.methods[e.name]!==e)throw Error(e+" is not a member of "+this);return delete this.methods[e.name],e.parent=null,i(this)}return o.prototype.remove.call(this,e)},n.prototype.create=function(e,t,r){for(var n,i=new u.Service(e,t,r),o=0;o<this.methodsArray.length;++o){var s=a.lcFirst((n=this.j[o]).resolve().name).replace(/[^$\w_]/g,"");i[s]=a.codegen(["r","c"],a.isReserved(s)?s+"_":s)("return this.rpcCall(m,q,s,r,c)")({m:n,q:n.resolvedRequestType.ctor,s:n.resolvedResponseType.ctor})}return i}},{22:22,23:23,31:31,37:37}],34:[function(e,r){function n(e){return e.replace(p,function(e,t){switch(t){case"\\":case"":return t;default:return c[t]||""}})}function i(e){function r(e){return Error("illegal "+e+" (line "+w+")")}function i(){var t="'"===S?a:s;t.lastIndex=g-1;var i=t.exec(e);if(!i)throw r("string");return g=t.lastIndex,d(S),S=null,n(i[1])}function p(t){return e.charAt(t)}function c(t,r){O=e.charAt(t++),j=w,x=!1;var n,i=t-3;do{if(--i<0||"\n"===(n=e.charAt(i))){x=!0;break}}while(" "===n||"\t"===n);for(var o=e.substring(t,r).split(f),s=0;s<o.length;++s)o[s]=o[s].replace(u,"").trim();k=o.join("\n").trim()}function h(){if(A.length>0)return A.shift();if(S)return i();var t,n,s,a,u;do{if(g===b)return null;for(t=!1;l.test(s=p(g));)if("\n"===s&&++w,++g===b)return null;if("/"===p(g)){if(++g===b)throw r("comment");if("/"===p(g)){for(u="/"===p(a=g+1);"\n"!==p(++g);)if(g===b)return null;++g,u&&c(a,g-1),++w,t=!0}else{if("*"!==(s=p(g)))return"/";u="*"===p(a=g+1);do{if("\n"===s&&++w,++g===b)throw r("comment");n=s,s=p(g)}while("*"!==n||"/"!==s);++g,u&&c(a,g-2),t=!0}}}while(t);var f=g;if(o.lastIndex=0,!o.test(p(f++)))for(;f<b&&!o.test(p(f));)++f;var h=e.substring(g,g=f);return'"'!==h&&"'"!==h||(S=h),h}function d(e){A.push(e)}function y(){if(!A.length){var e=h();if(null===e)return null;d(e)}return A[0]}function v(e,t){var n=y();if(n===e)return h(),!0;if(!t)throw r("token '"+n+"', '"+e+"' expected");return!1}function m(e){var r=null;return e===t?j!==w-1||"*"!==O&&!x||(r=k):(j<e&&y(),j!==e||x||"/"!==O||(r=k)),r}e=""+e;var g=0,b=e.length,w=1,O=null,k=null,j=0,x=!1,A=[],S=null;return Object.defineProperty({next:h,peek:y,push:d,skip:v,cmnt:m},"line",{get:function(){return w}})}r.exports=i;var o=/[\s{}=;:[\],'"()<>]/g,s=/(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,a=/(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,u=/^ *[*\/]+ */,f=/\n/g,l=/\s/,p=/\\(.?)/g,c={0:"\0",r:"\r",n:"\n",t:"\t"};i.unescape=n},{}],35:[function(e,r){function n(e,r){o.call(this,e,r),this.fields={},this.oneofs=t,this.extensions=t,this.reserved=t,this.group=t,this.k=null,this.b=null,this.l=null,this.o=null}function i(e){return e.k=e.b=e.l=null,delete e.encode,delete e.decode,delete e.verify,e}r.exports=n;var o=e(23);((n.prototype=Object.create(o.prototype)).constructor=n).className="Type";var s=e(15),a=e(25),u=e(16),f=e(20),l=e(33),p=e(21),c=e(27),h=e(42),d=e(37),y=e(14),v=e(13),m=e(40),g=e(12),b=e(41);Object.defineProperties(n.prototype,{fieldsById:{get:function(){if(this.k)return this.k;this.k={};for(var e=Object.keys(this.fields),t=0;t<e.length;++t){var r=this.fields[e[t]],n=r.id;if(this.k[n])throw Error("duplicate id "+n+" in "+this);this.k[n]=r}return this.k}},fieldsArray:{get:function(){return this.b||(this.b=d.toArray(this.fields))}},oneofsArray:{get:function(){return this.l||(this.l=d.toArray(this.oneofs))}},ctor:{get:function(){return this.o||(this.ctor=n.generateConstructor(this)())},set:function(e){var t=e.prototype;t instanceof p||((e.prototype=new p).constructor=e,d.merge(e.prototype,t)),e.$type=e.prototype.$type=this,d.merge(e,p,!0),this.o=e;for(var r=0;r<this.fieldsArray.length;++r)this.b[r].resolve();var n={};for(r=0;r<this.oneofsArray.length;++r)n[this.l[r].resolve().name]={get:d.oneOfGetter(this.l[r].oneof),set:d.oneOfSetter(this.l[r].oneof)};r&&Object.defineProperties(e.prototype,n)}}}),n.generateConstructor=function(e){for(var t,r=d.codegen(["p"],e.name),n=0;n<e.fieldsArray.length;++n)(t=e.b[n]).map?r("this%s={}",d.safeProp(t.name)):t.repeated&&r("this%s=[]",d.safeProp(t.name));return r("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]")},n.fromJSON=function(e,r){var i=new n(e,r.options);i.extensions=r.extensions,i.reserved=r.reserved;for(var p=Object.keys(r.fields),c=0;c<p.length;++c)i.add((t!==r.fields[p[c]].keyType?f.fromJSON:u.fromJSON)(p[c],r.fields[p[c]]));if(r.oneofs)for(p=Object.keys(r.oneofs),c=0;c<p.length;++c)i.add(a.fromJSON(p[c],r.oneofs[p[c]]));if(r.nested)for(p=Object.keys(r.nested),c=0;c<p.length;++c){var h=r.nested[p[c]];i.add((h.id!==t?u.fromJSON:h.fields!==t?n.fromJSON:h.values!==t?s.fromJSON:h.methods!==t?l.fromJSON:o.fromJSON)(p[c],h))}return r.extensions&&r.extensions.length&&(i.extensions=r.extensions),r.reserved&&r.reserved.length&&(i.reserved=r.reserved),r.group&&(i.group=!0),i},n.prototype.toJSON=function(){var e=o.prototype.toJSON.call(this);return d.toObject(["options",e&&e.options||t,"oneofs",o.arrayToJSON(this.oneofsArray),"fields",o.arrayToJSON(this.fieldsArray.filter(function(e){return!e.declaringField}))||{},"extensions",this.extensions&&this.extensions.length?this.extensions:t,"reserved",this.reserved&&this.reserved.length?this.reserved:t,"group",this.group||t,"nested",e&&e.nested||t])},n.prototype.resolveAll=function(){for(var e=this.fieldsArray,t=0;t<e.length;)e[t++].resolve();var r=this.oneofsArray;for(t=0;t<r.length;)r[t++].resolve();return o.prototype.resolveAll.call(this)},n.prototype.get=function(e){return this.fields[e]||this.oneofs&&this.oneofs[e]||this.nested&&this.nested[e]||null},n.prototype.add=function(e){if(this.get(e.name))throw Error("duplicate name '"+e.name+"' in "+this);if(e instanceof u&&e.extend===t){if(this.k?this.k[e.id]:this.fieldsById[e.id])throw Error("duplicate id "+e.id+" in "+this);if(this.isReservedId(e.id))throw Error("id "+e.id+" is reserved in "+this);if(this.isReservedName(e.name))throw Error("name '"+e.name+"' is reserved in "+this);return e.parent&&e.parent.remove(e),this.fields[e.name]=e,e.message=this,e.onAdd(this),i(this)}return e instanceof a?(this.oneofs||(this.oneofs={}),this.oneofs[e.name]=e,e.onAdd(this),i(this)):o.prototype.add.call(this,e)},n.prototype.remove=function(e){if(e instanceof u&&e.extend===t){if(!this.fields||this.fields[e.name]!==e)throw Error(e+" is not a member of "+this);return delete this.fields[e.name],e.parent=null,e.onRemove(this),i(this)}if(e instanceof a){if(!this.oneofs||this.oneofs[e.name]!==e)throw Error(e+" is not a member of "+this);return delete this.oneofs[e.name],e.parent=null,e.onRemove(this),i(this)}return o.prototype.remove.call(this,e)},n.prototype.isReservedId=function(e){return o.isReservedId(this.reserved,e)},n.prototype.isReservedName=function(e){return o.isReservedName(this.reserved,e)},n.prototype.create=function(e){return new this.ctor(e)},n.prototype.setup=function(){for(var e=this.fullName,t=[],r=0;r<this.fieldsArray.length;++r)t.push(this.b[r].resolve().resolvedType);this.encode=y(this)({Writer:h,types:t,util:d}),this.decode=v(this)({Reader:c,types:t,util:d}),this.verify=m(this)({types:t,util:d}),this.fromObject=g.fromObject(this)({types:t,util:d}),this.toObject=g.toObject(this)({types:t,util:d});var n=b[e];if(n){var i=Object.create(this);i.fromObject=this.fromObject,this.fromObject=n.fromObject.bind(i),i.toObject=this.toObject,this.toObject=n.toObject.bind(i)}return this},n.prototype.encode=function(e,t){return this.setup().encode(e,t)},n.prototype.encodeDelimited=function(e,t){return this.encode(e,t&&t.len?t.fork():t).ldelim()},n.prototype.decode=function(e,t){return this.setup().decode(e,t)},n.prototype.decodeDelimited=function(e){return e instanceof c||(e=c.create(e)),this.decode(e,e.uint32())},n.prototype.verify=function(e){return this.setup().verify(e)},n.prototype.fromObject=function(e){return this.setup().fromObject(e)},n.prototype.toObject=function(e,t){return this.setup().toObject(e,t)},n.d=function(e){return function(t){d.decorateType(t,e)}}},{12:12,13:13,14:14,15:15,16:16,20:20,21:21,23:23,25:25,27:27,33:33,37:37,40:40,41:41,42:42}],36:[function(e,t,r){function n(e,t){var r=0,n={};for(t|=0;r<e.length;)n[s[r+t]]=e[r++];return n}var i=r,o=e(37),s=["double","float","int32","uint32","sint32","fixed32","sfixed32","int64","uint64","sint64","fixed64","sfixed64","bool","string","bytes"];i.basic=n([1,5,0,0,0,5,5,0,0,0,1,1,0,2,2]),i.defaults=n([0,0,0,0,0,0,0,0,0,0,0,0,!1,"",o.emptyArray,null]),i.long=n([0,0,0,1,1],7),i.mapKey=n([0,0,0,5,5,0,0,0,1,1,0,2],2),i.packed=n([1,5,0,0,0,5,5,0,0,0,1,1,0])},{37:37}],37:[function(e,r){var n,i,o=r.exports=e(39),s=e(30);o.codegen=e(3),o.fetch=e(5),o.path=e(8),o.fs=o.inquire("fs"),o.toArray=function(e){if(e){for(var t=Object.keys(e),r=Array(t.length),n=0;n<t.length;)r[n]=e[t[n++]];return r}return[]},o.toObject=function(e){for(var r={},n=0;n<e.length;){var i=e[n++],o=e[n++];o!==t&&(r[i]=o)}return r};var a=/\\/g,u=/"/g;o.isReserved=function(e){return/^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(e)},o.safeProp=function(e){return!/^[$\w_]+$/.test(e)||o.isReserved(e)?'["'+e.replace(a,"\\\\").replace(u,'\\"')+'"]':"."+e},o.ucFirst=function(e){return e.charAt(0).toUpperCase()+e.substring(1)};var f=/_([a-z])/g;o.camelCase=function(e){return e.substring(0,1)+e.substring(1).replace(f,function(e,t){return t.toUpperCase()})},o.compareFieldsById=function(e,t){return e.id-t.id},o.decorateType=function(t,r){if(t.$type)return r&&t.$type.name!==r&&(o.decorateRoot.remove(t.$type),t.$type.name=r,o.decorateRoot.add(t.$type)),t.$type;n||(n=e(35));var i=new n(r||t.name);return o.decorateRoot.add(i),i.ctor=t,Object.defineProperty(t,"$type",{value:i,enumerable:!1}),Object.defineProperty(t.prototype,"$type",{value:i,enumerable:!1}),i};var l=0;o.decorateEnum=function(t){if(t.$type)return t.$type;i||(i=e(15));var r=new i("Enum"+l++,t);return o.decorateRoot.add(r),Object.defineProperty(t,"$type",{value:r,enumerable:!1}),r},Object.defineProperty(o,"decorateRoot",{get:function(){return s.decorated||(s.decorated=new(e(29)))}})},{15:15,29:29,3:3,30:30,35:35,39:39,5:5,8:8}],38:[function(e,t){function r(e,t){this.lo=e>>>0,this.hi=t>>>0}t.exports=r;var n=e(39),i=r.zero=new r(0,0);i.toNumber=function(){return 0},i.zzEncode=i.zzDecode=function(){return this},i.length=function(){return 1};var o=r.zeroHash="\0\0\0\0\0\0\0\0";r.fromNumber=function(e){if(0===e)return i;var t=e<0;t&&(e=-e);var n=e>>>0,o=(e-n)/4294967296>>>0;return t&&(o=~o>>>0,n=~n>>>0,++n>4294967295&&(n=0,++o>4294967295&&(o=0))),new r(n,o)},r.from=function(e){if("number"==typeof e)return r.fromNumber(e);if(n.isString(e)){if(!n.Long)return r.fromNumber(parseInt(e,10));e=n.Long.fromString(e)}return e.low||e.high?new r(e.low>>>0,e.high>>>0):i},r.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var t=1+~this.lo>>>0,r=~this.hi>>>0;return t||(r=r+1>>>0),-(t+4294967296*r)}return this.lo+4294967296*this.hi},r.prototype.toLong=function(e){return n.Long?new n.Long(0|this.lo,0|this.hi,!!e):{low:0|this.lo,high:0|this.hi,unsigned:!!e}};var s=String.prototype.charCodeAt;r.fromHash=function(e){return e===o?i:new r((s.call(e,0)|s.call(e,1)<<8|s.call(e,2)<<16|s.call(e,3)<<24)>>>0,(s.call(e,4)|s.call(e,5)<<8|s.call(e,6)<<16|s.call(e,7)<<24)>>>0)},r.prototype.toHash=function(){return String.fromCharCode(255&this.lo,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,255&this.hi,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)},r.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this},r.prototype.zzDecode=function(){var e=-(1&this.lo);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this},r.prototype.length=function(){var e=this.lo,t=(this.lo>>>28|this.hi<<4)>>>0,r=this.hi>>>24;return 0===r?0===t?e<16384?e<128?1:2:e<2097152?3:4:t<16384?t<128?5:6:t<2097152?7:8:r<128?9:10}},{39:39}],39:[function(r,n,i){function o(e,r,n){for(var i=Object.keys(r),o=0;o<i.length;++o)e[i[o]]!==t&&n||(e[i[o]]=r[i[o]]);return e}function s(e){function t(e,r){if(!(this instanceof t))return new t(e,r);Object.defineProperty(this,"message",{get:function(){return e}}),Error.captureStackTrace?Error.captureStackTrace(this,t):Object.defineProperty(this,"stack",{value:Error().stack||""}),r&&o(this,r)}return(t.prototype=Object.create(Error.prototype)).constructor=t,Object.defineProperty(t.prototype,"name",{get:function(){return e}}),t.prototype.toString=function(){return this.name+": "+this.message},t}var a=i;a.asPromise=r(1),a.base64=r(2),a.EventEmitter=r(4),a.float=r(6),a.inquire=r(7),a.utf8=r(10),a.pool=r(9),a.LongBits=r(38),a.emptyArray=Object.freeze?Object.freeze([]):[],a.emptyObject=Object.freeze?Object.freeze({}):{},a.isNode=!!(e.process&&e.process.versions&&e.process.versions.node),a.isInteger=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},a.isString=function(e){return"string"==typeof e||e instanceof String},a.isObject=function(e){return e&&"object"==typeof e},a.isset=a.isSet=function(e,t){var r=e[t];return!(null==r||!e.hasOwnProperty(t))&&("object"!=typeof r||(Array.isArray(r)?r.length:Object.keys(r).length)>0)},a.Buffer=function(){try{var e=a.inquire("buffer").Buffer;return e.prototype.utf8Write?e:null}catch(e){return null}}(),a.p=null,a.u=null,a.newBuffer=function(e){return"number"==typeof e?a.Buffer?a.u(e):new a.Array(e):a.Buffer?a.p(e):"undefined"==typeof Uint8Array?e:new Uint8Array(e)},a.Array="undefined"!=typeof Uint8Array?Uint8Array:Array,a.Long=e.dcodeIO&&e.dcodeIO.Long||a.inquire("long"),a.key2Re=/^true|false|0|1$/,a.key32Re=/^-?(?:0|[1-9][0-9]*)$/,a.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,a.longToHash=function(e){return e?a.LongBits.from(e).toHash():a.LongBits.zeroHash},a.longFromHash=function(e,t){var r=a.LongBits.fromHash(e);return a.Long?a.Long.fromBits(r.lo,r.hi,t):r.toNumber(!!t)},a.merge=o,a.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)},a.newError=s,a.ProtocolError=s("ProtocolError"),a.oneOfGetter=function(e){for(var r={},n=0;n<e.length;++n)r[e[n]]=1;return function(){for(var e=Object.keys(this),n=e.length-1;n>-1;--n)if(1===r[e[n]]&&this[e[n]]!==t&&null!==this[e[n]])return e[n]}},a.oneOfSetter=function(e){return function(t){for(var r=0;r<e.length;++r)e[r]!==t&&delete this[e[r]]}},a.toJSONOptions={longs:String,enums:String,bytes:String,json:!0},a.e=function(){var e=a.Buffer;if(!e)return void(a.p=a.u=null);a.p=e.from!==Uint8Array.from&&e.from||function(t,r){return new e(t,r)},a.u=e.allocUnsafe||function(t){return new e(t)}}},{1:1,10:10,2:2,38:38,4:4,6:6,7:7,9:9}],40:[function(e,t){function r(e,t){return e.name+": "+t+(e.repeated&&"array"!==t?"[]":e.map&&"object"!==t?"{k:"+e.keyType+"}":"")+" expected"}function n(e,t,n,i){if(t.resolvedType)if(t.resolvedType instanceof s){e("switch(%s){",i)("default:")("return%j",r(t,"enum value"));for(var o=Object.keys(t.resolvedType.values),a=0;a<o.length;++a)e("case %i:",t.resolvedType.values[o[a]]);e("break")("}")}else e("{")("var e=types[%i].verify(%s);",n,i)("if(e)")("return%j+e",t.name+".")("}");else switch(t.type){case"int32":case"uint32":case"sint32":case"fixed32":case"sfixed32":e("if(!util.isInteger(%s))",i)("return%j",r(t,"integer"));break;case"int64":case"uint64":case"sint64":case"fixed64":case"sfixed64":e("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))",i,i,i,i)("return%j",r(t,"integer|Long"));break;case"float":case"double":e('if(typeof %s!=="number")',i)("return%j",r(t,"number"));break;case"bool":e('if(typeof %s!=="boolean")',i)("return%j",r(t,"boolean"));break;case"string":e("if(!util.isString(%s))",i)("return%j",r(t,"string"));break;case"bytes":e('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))',i,i,i)("return%j",r(t,"buffer"))}return e}function i(e,t,n){switch(t.keyType){case"int32":case"uint32":case"sint32":case"fixed32":case"sfixed32":e("if(!util.key32Re.test(%s))",n)("return%j",r(t,"integer key"));break;case"int64":case"uint64":case"sint64":case"fixed64":case"sfixed64":e("if(!util.key64Re.test(%s))",n)("return%j",r(t,"integer|Long key"));break;case"bool":e("if(!util.key2Re.test(%s))",n)("return%j",r(t,"boolean key"))}return e}function o(e){var t=a.codegen(["m"],e.name+"$verify")('if(typeof m!=="object"||m===null)')("return%j","object expected"),o=e.oneofsArray,s={};o.length&&t("var p={}");for(var u=0;u<e.fieldsArray.length;++u){var f=e.b[u].resolve(),l="m"+a.safeProp(f.name);if(f.optional&&t("if(%s!=null&&m.hasOwnProperty(%j)){",l,f.name),f.map)t("if(!util.isObject(%s))",l)("return%j",r(f,"object"))("var k=Object.keys(%s)",l)("for(var i=0;i<k.length;++i){"),i(t,f,"k[i]"),n(t,f,u,l+"[k[i]]")("}");else if(f.repeated)t("if(!Array.isArray(%s))",l)("return%j",r(f,"array"))("for(var i=0;i<%s.length;++i){",l),n(t,f,u,l+"[i]")("}");else{if(f.partOf){var p=a.safeProp(f.partOf.name);1===s[f.partOf.name]&&t("if(p%s===1)",p)("return%j",f.partOf.name+": multiple values"),s[f.partOf.name]=1,t("p%s=1",p)}n(t,f,u,l)}f.optional&&t("}")}return t("return null")}t.exports=o;var s=e(15),a=e(37)},{15:15,37:37}],41:[function(e,t,r){var n=r,i=e(21);n[".google.protobuf.Any"]={fromObject:function(e){if(e&&e["@type"]){var t=this.lookup(e["@type"]);if(t){var r="."===e["@type"].charAt(0)?e["@type"].substr(1):e["@type"];return this.create({type_url:"/"+r,value:t.encode(t.fromObject(e)).finish()})}}return this.fromObject(e)},toObject:function(e,t){if(t&&t.json&&e.type_url&&e.value){var r=e.type_url.substring(e.type_url.lastIndexOf("/")+1),n=this.lookup(r);n&&(e=n.decode(e.value))}if(!(e instanceof this.ctor)&&e instanceof i){var o=e.$type.toObject(e,t);return o["@type"]=e.$type.fullName,o}return this.toObject(e,t)}}},{21:21}],42:[function(e,r){function n(e,r,n){this.fn=e,this.len=r,this.next=t,this.val=n}function i(){}function o(e){this.head=e.head,this.tail=e.tail,this.len=e.len,this.next=e.states}function s(){this.len=0,this.head=new n(i,0,0),this.tail=this.head,this.states=null}function a(e,t,r){t[r]=255&e}function u(e,t,r){for(;e>127;)t[r++]=127&e|128,e>>>=7;t[r]=e}function f(e,r){this.len=e,this.next=t,this.val=r}function l(e,t,r){for(;e.hi;)t[r++]=127&e.lo|128,e.lo=(e.lo>>>7|e.hi<<25)>>>0,e.hi>>>=7;for(;e.lo>127;)t[r++]=127&e.lo|128,e.lo=e.lo>>>7;t[r++]=e.lo}function p(e,t,r){t[r]=255&e,t[r+1]=e>>>8&255,t[r+2]=e>>>16&255,t[r+3]=e>>>24}r.exports=s;var c,h=e(39),d=h.LongBits,y=h.base64,v=h.utf8;s.create=h.Buffer?function(){return(s.create=function(){return new c})()}:function(){return new s},s.alloc=function(e){return new h.Array(e)},h.Array!==Array&&(s.alloc=h.pool(s.alloc,h.Array.prototype.subarray)),s.prototype.v=function(e,t,r){return this.tail=this.tail.next=new n(e,t,r),this.len+=t,this},f.prototype=Object.create(n.prototype),f.prototype.fn=u,s.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new f((e>>>=0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this},s.prototype.int32=function(e){return e<0?this.v(l,10,d.fromNumber(e)):this.uint32(e)},s.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)},s.prototype.uint64=function(e){var t=d.from(e);return this.v(l,t.length(),t)},s.prototype.int64=s.prototype.uint64,s.prototype.sint64=function(e){var t=d.from(e).zzEncode();return this.v(l,t.length(),t)},s.prototype.bool=function(e){return this.v(a,1,e?1:0)},s.prototype.fixed32=function(e){return this.v(p,4,e>>>0)},s.prototype.sfixed32=s.prototype.fixed32,s.prototype.fixed64=function(e){var t=d.from(e);return this.v(p,4,t.lo).v(p,4,t.hi)},s.prototype.sfixed64=s.prototype.fixed64,s.prototype.float=function(e){return this.v(h.float.writeFloatLE,4,e)},s.prototype.double=function(e){return this.v(h.float.writeDoubleLE,8,e)};var m=h.Array.prototype.set?function(e,t,r){t.set(e,r)}:function(e,t,r){for(var n=0;n<e.length;++n)t[r+n]=e[n]};s.prototype.bytes=function(e){var t=e.length>>>0;if(!t)return this.v(a,1,0);if(h.isString(e)){var r=s.alloc(t=y.length(e));y.decode(e,r,0),e=r}return this.uint32(t).v(m,t,e)},s.prototype.string=function(e){var t=v.length(e);return t?this.uint32(t).v(v.write,t,e):this.v(a,1,0)},s.prototype.fork=function(){return this.states=new o(this),this.head=this.tail=new n(i,0,0),this.len=0,this},s.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new n(i,0,0),this.len=0),this},s.prototype.ldelim=function(){var e=this.head,t=this.tail,r=this.len;return this.reset().uint32(r),r&&(this.tail.next=e.next,this.tail=t,this.len+=r),this},s.prototype.finish=function(){for(var e=this.head.next,t=this.constructor.alloc(this.len),r=0;e;)e.fn(e.val,t,r),r+=e.len,e=e.next;return t},s.e=function(e){c=e}},{39:39}],43:[function(e,t){function r(){i.call(this)}function n(e,t,r){e.length<40?o.utf8.write(e,t,r):t.utf8Write(e,r)}t.exports=r;var i=e(42);(r.prototype=Object.create(i.prototype)).constructor=r;var o=e(39),s=o.Buffer;r.alloc=function(e){return(r.alloc=o.u)(e)};var a=s&&s.prototype instanceof Uint8Array&&"set"===s.prototype.set.name?function(e,t,r){t.set(e,r)}:function(e,t,r){if(e.copy)e.copy(t,r,0,e.length);else for(var n=0;n<e.length;)t[r++]=e[n++]};r.prototype.bytes=function(e){o.isString(e)&&(e=o.p(e,"base64"));var t=e.length>>>0;return this.uint32(t),t&&this.v(a,t,e),this},r.prototype.string=function(e){var t=s.byteLength(e);return this.uint32(t),t&&this.v(n,t,e),this}},{39:39,42:42}]},{},[19])}("object"==typeof window&&window||"object"==typeof self&&self||this);
//# sourceMappingURL=protobuf.min.js.map
/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
(function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.Delimiter = (function() {
    
        /**
         * Properties of a Delimiter.
         * @exports IDelimiter
         * @interface IDelimiter
         * @property {number|null} [length] Delimiter length
         */
    
        /**
         * Constructs a new Delimiter.
         * @exports Delimiter
         * @classdesc Represents a Delimiter.
         * @implements IDelimiter
         * @constructor
         * @param {IDelimiter=} [properties] Properties to set
         */
        function Delimiter(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Delimiter length.
         * @member {number} length
         * @memberof Delimiter
         * @instance
         */
        Delimiter.prototype.length = 0;
    
        /**
         * Creates a new Delimiter instance using the specified properties.
         * @function create
         * @memberof Delimiter
         * @static
         * @param {IDelimiter=} [properties] Properties to set
         * @returns {Delimiter} Delimiter instance
         */
        Delimiter.create = function create(properties) {
            return new Delimiter(properties);
        };
    
        /**
         * Encodes the specified Delimiter message. Does not implicitly {@link Delimiter.verify|verify} messages.
         * @function encode
         * @memberof Delimiter
         * @static
         * @param {IDelimiter} message Delimiter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Delimiter.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.length != null && message.hasOwnProperty("length"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.length);
            return writer;
        };
    
        /**
         * Encodes the specified Delimiter message, length delimited. Does not implicitly {@link Delimiter.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Delimiter
         * @static
         * @param {IDelimiter} message Delimiter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Delimiter.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Delimiter message from the specified reader or buffer.
         * @function decode
         * @memberof Delimiter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Delimiter} Delimiter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Delimiter.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Delimiter();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.length = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Delimiter message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Delimiter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Delimiter} Delimiter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Delimiter.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Delimiter message.
         * @function verify
         * @memberof Delimiter
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Delimiter.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.length != null && message.hasOwnProperty("length"))
                if (!$util.isInteger(message.length))
                    return "length: integer expected";
            return null;
        };
    
        /**
         * Creates a Delimiter message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Delimiter
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Delimiter} Delimiter
         */
        Delimiter.fromObject = function fromObject(object) {
            if (object instanceof $root.Delimiter)
                return object;
            var message = new $root.Delimiter();
            if (object.length != null)
                message.length = object.length >>> 0;
            return message;
        };
    
        /**
         * Creates a plain object from a Delimiter message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Delimiter
         * @static
         * @param {Delimiter} message Delimiter
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Delimiter.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.length = 0;
            if (message.length != null && message.hasOwnProperty("length"))
                object.length = message.length;
            return object;
        };
    
        /**
         * Converts this Delimiter to JSON.
         * @function toJSON
         * @memberof Delimiter
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Delimiter.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Delimiter;
    })();
    
    $root.GISSectionMetadata = (function() {
    
        /**
         * Properties of a GISSectionMetadata.
         * @exports IGISSectionMetadata
         * @interface IGISSectionMetadata
         * @property {string|null} [sectionId] GISSectionMetadata sectionId
         * @property {string|null} [sectionProperties] GISSectionMetadata sectionProperties
         */
    
        /**
         * Constructs a new GISSectionMetadata.
         * @exports GISSectionMetadata
         * @classdesc Represents a GISSectionMetadata.
         * @implements IGISSectionMetadata
         * @constructor
         * @param {IGISSectionMetadata=} [properties] Properties to set
         */
        function GISSectionMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * GISSectionMetadata sectionId.
         * @member {string} sectionId
         * @memberof GISSectionMetadata
         * @instance
         */
        GISSectionMetadata.prototype.sectionId = "";
    
        /**
         * GISSectionMetadata sectionProperties.
         * @member {string} sectionProperties
         * @memberof GISSectionMetadata
         * @instance
         */
        GISSectionMetadata.prototype.sectionProperties = "";
    
        /**
         * Creates a new GISSectionMetadata instance using the specified properties.
         * @function create
         * @memberof GISSectionMetadata
         * @static
         * @param {IGISSectionMetadata=} [properties] Properties to set
         * @returns {GISSectionMetadata} GISSectionMetadata instance
         */
        GISSectionMetadata.create = function create(properties) {
            return new GISSectionMetadata(properties);
        };
    
        /**
         * Encodes the specified GISSectionMetadata message. Does not implicitly {@link GISSectionMetadata.verify|verify} messages.
         * @function encode
         * @memberof GISSectionMetadata
         * @static
         * @param {IGISSectionMetadata} message GISSectionMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GISSectionMetadata.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sectionId != null && message.hasOwnProperty("sectionId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sectionId);
            if (message.sectionProperties != null && message.hasOwnProperty("sectionProperties"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sectionProperties);
            return writer;
        };
    
        /**
         * Encodes the specified GISSectionMetadata message, length delimited. Does not implicitly {@link GISSectionMetadata.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GISSectionMetadata
         * @static
         * @param {IGISSectionMetadata} message GISSectionMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GISSectionMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a GISSectionMetadata message from the specified reader or buffer.
         * @function decode
         * @memberof GISSectionMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GISSectionMetadata} GISSectionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GISSectionMetadata.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GISSectionMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.sectionId = reader.string();
                    break;
                case 2:
                    message.sectionProperties = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a GISSectionMetadata message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GISSectionMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GISSectionMetadata} GISSectionMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GISSectionMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a GISSectionMetadata message.
         * @function verify
         * @memberof GISSectionMetadata
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GISSectionMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sectionId != null && message.hasOwnProperty("sectionId"))
                if (!$util.isString(message.sectionId))
                    return "sectionId: string expected";
            if (message.sectionProperties != null && message.hasOwnProperty("sectionProperties"))
                if (!$util.isString(message.sectionProperties))
                    return "sectionProperties: string expected";
            return null;
        };
    
        /**
         * Creates a GISSectionMetadata message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GISSectionMetadata
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GISSectionMetadata} GISSectionMetadata
         */
        GISSectionMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.GISSectionMetadata)
                return object;
            var message = new $root.GISSectionMetadata();
            if (object.sectionId != null)
                message.sectionId = String(object.sectionId);
            if (object.sectionProperties != null)
                message.sectionProperties = String(object.sectionProperties);
            return message;
        };
    
        /**
         * Creates a plain object from a GISSectionMetadata message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GISSectionMetadata
         * @static
         * @param {GISSectionMetadata} message GISSectionMetadata
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GISSectionMetadata.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.sectionId = "";
                object.sectionProperties = "";
            }
            if (message.sectionId != null && message.hasOwnProperty("sectionId"))
                object.sectionId = message.sectionId;
            if (message.sectionProperties != null && message.hasOwnProperty("sectionProperties"))
                object.sectionProperties = message.sectionProperties;
            return object;
        };
    
        /**
         * Converts this GISSectionMetadata to JSON.
         * @function toJSON
         * @memberof GISSectionMetadata
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GISSectionMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return GISSectionMetadata;
    })();
    
    $root.GISMetadata = (function() {
    
        /**
         * Properties of a GISMetadata.
         * @exports IGISMetadata
         * @interface IGISMetadata
         * @property {string|null} [source] GISMetadata source
         * @property {Array.<IGISSectionMetadata>|null} [sections] GISMetadata sections
         */
    
        /**
         * Constructs a new GISMetadata.
         * @exports GISMetadata
         * @classdesc Represents a GISMetadata.
         * @implements IGISMetadata
         * @constructor
         * @param {IGISMetadata=} [properties] Properties to set
         */
        function GISMetadata(properties) {
            this.sections = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * GISMetadata source.
         * @member {string} source
         * @memberof GISMetadata
         * @instance
         */
        GISMetadata.prototype.source = "";
    
        /**
         * GISMetadata sections.
         * @member {Array.<IGISSectionMetadata>} sections
         * @memberof GISMetadata
         * @instance
         */
        GISMetadata.prototype.sections = $util.emptyArray;
    
        /**
         * Creates a new GISMetadata instance using the specified properties.
         * @function create
         * @memberof GISMetadata
         * @static
         * @param {IGISMetadata=} [properties] Properties to set
         * @returns {GISMetadata} GISMetadata instance
         */
        GISMetadata.create = function create(properties) {
            return new GISMetadata(properties);
        };
    
        /**
         * Encodes the specified GISMetadata message. Does not implicitly {@link GISMetadata.verify|verify} messages.
         * @function encode
         * @memberof GISMetadata
         * @static
         * @param {IGISMetadata} message GISMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GISMetadata.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.source != null && message.hasOwnProperty("source"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.source);
            if (message.sections != null && message.sections.length)
                for (var i = 0; i < message.sections.length; ++i)
                    $root.GISSectionMetadata.encode(message.sections[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified GISMetadata message, length delimited. Does not implicitly {@link GISMetadata.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GISMetadata
         * @static
         * @param {IGISMetadata} message GISMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GISMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a GISMetadata message from the specified reader or buffer.
         * @function decode
         * @memberof GISMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GISMetadata} GISMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GISMetadata.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GISMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.source = reader.string();
                    break;
                case 2:
                    if (!(message.sections && message.sections.length))
                        message.sections = [];
                    message.sections.push($root.GISSectionMetadata.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a GISMetadata message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GISMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GISMetadata} GISMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GISMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a GISMetadata message.
         * @function verify
         * @memberof GISMetadata
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GISMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.source != null && message.hasOwnProperty("source"))
                if (!$util.isString(message.source))
                    return "source: string expected";
            if (message.sections != null && message.hasOwnProperty("sections")) {
                if (!Array.isArray(message.sections))
                    return "sections: array expected";
                for (var i = 0; i < message.sections.length; ++i) {
                    var error = $root.GISSectionMetadata.verify(message.sections[i]);
                    if (error)
                        return "sections." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a GISMetadata message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GISMetadata
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GISMetadata} GISMetadata
         */
        GISMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.GISMetadata)
                return object;
            var message = new $root.GISMetadata();
            if (object.source != null)
                message.source = String(object.source);
            if (object.sections) {
                if (!Array.isArray(object.sections))
                    throw TypeError(".GISMetadata.sections: array expected");
                message.sections = [];
                for (var i = 0; i < object.sections.length; ++i) {
                    if (typeof object.sections[i] !== "object")
                        throw TypeError(".GISMetadata.sections: object expected");
                    message.sections[i] = $root.GISSectionMetadata.fromObject(object.sections[i]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a GISMetadata message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GISMetadata
         * @static
         * @param {GISMetadata} message GISMetadata
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GISMetadata.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.sections = [];
            if (options.defaults)
                object.source = "";
            if (message.source != null && message.hasOwnProperty("source"))
                object.source = message.source;
            if (message.sections && message.sections.length) {
                object.sections = [];
                for (var j = 0; j < message.sections.length; ++j)
                    object.sections[j] = $root.GISSectionMetadata.toObject(message.sections[j], options);
            }
            return object;
        };
    
        /**
         * Converts this GISMetadata to JSON.
         * @function toJSON
         * @memberof GISMetadata
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GISMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return GISMetadata;
    })();
    
    /**
     * RoadClass enum.
     * @exports RoadClass
     * @enum {string}
     * @property {number} Motorway=0 Motorway value
     * @property {number} Trunk=1 Trunk value
     * @property {number} Primary=2 Primary value
     * @property {number} Secondary=3 Secondary value
     * @property {number} Tertiary=4 Tertiary value
     * @property {number} Residential=5 Residential value
     * @property {number} Unclassified=6 Unclassified value
     * @property {number} Service=7 Service value
     * @property {number} Other=8 Other value
     */
    $root.RoadClass = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Motorway"] = 0;
        values[valuesById[1] = "Trunk"] = 1;
        values[valuesById[2] = "Primary"] = 2;
        values[valuesById[3] = "Secondary"] = 3;
        values[valuesById[4] = "Tertiary"] = 4;
        values[valuesById[5] = "Residential"] = 5;
        values[valuesById[6] = "Unclassified"] = 6;
        values[valuesById[7] = "Service"] = 7;
        values[valuesById[8] = "Other"] = 8;
        return values;
    })();
    
    $root.WaySection = (function() {
    
        /**
         * Properties of a WaySection.
         * @exports IWaySection
         * @interface IWaySection
         * @property {number|Long|null} [wayId] WaySection wayId
         * @property {RoadClass|null} [roadClass] WaySection roadClass
         * @property {boolean|null} [oneWay] WaySection oneWay
         * @property {boolean|null} [roundabout] WaySection roundabout
         * @property {boolean|null} [link] WaySection link
         * @property {Array.<number|Long>|null} [nodeIds] WaySection nodeIds
         */
    
        /**
         * Constructs a new WaySection.
         * @exports WaySection
         * @classdesc Represents a WaySection.
         * @implements IWaySection
         * @constructor
         * @param {IWaySection=} [properties] Properties to set
         */
        function WaySection(properties) {
            this.nodeIds = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * WaySection wayId.
         * @member {number|Long} wayId
         * @memberof WaySection
         * @instance
         */
        WaySection.prototype.wayId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
        /**
         * WaySection roadClass.
         * @member {RoadClass} roadClass
         * @memberof WaySection
         * @instance
         */
        WaySection.prototype.roadClass = 0;
    
        /**
         * WaySection oneWay.
         * @member {boolean} oneWay
         * @memberof WaySection
         * @instance
         */
        WaySection.prototype.oneWay = false;
    
        /**
         * WaySection roundabout.
         * @member {boolean} roundabout
         * @memberof WaySection
         * @instance
         */
        WaySection.prototype.roundabout = false;
    
        /**
         * WaySection link.
         * @member {boolean} link
         * @memberof WaySection
         * @instance
         */
        WaySection.prototype.link = false;
    
        /**
         * WaySection nodeIds.
         * @member {Array.<number|Long>} nodeIds
         * @memberof WaySection
         * @instance
         */
        WaySection.prototype.nodeIds = $util.emptyArray;
    
        /**
         * Creates a new WaySection instance using the specified properties.
         * @function create
         * @memberof WaySection
         * @static
         * @param {IWaySection=} [properties] Properties to set
         * @returns {WaySection} WaySection instance
         */
        WaySection.create = function create(properties) {
            return new WaySection(properties);
        };
    
        /**
         * Encodes the specified WaySection message. Does not implicitly {@link WaySection.verify|verify} messages.
         * @function encode
         * @memberof WaySection
         * @static
         * @param {IWaySection} message WaySection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WaySection.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.wayId != null && message.hasOwnProperty("wayId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.wayId);
            if (message.roadClass != null && message.hasOwnProperty("roadClass"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roadClass);
            if (message.oneWay != null && message.hasOwnProperty("oneWay"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.oneWay);
            if (message.roundabout != null && message.hasOwnProperty("roundabout"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.roundabout);
            if (message.link != null && message.hasOwnProperty("link"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.link);
            if (message.nodeIds != null && message.nodeIds.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (var i = 0; i < message.nodeIds.length; ++i)
                    writer.uint64(message.nodeIds[i]);
                writer.ldelim();
            }
            return writer;
        };
    
        /**
         * Encodes the specified WaySection message, length delimited. Does not implicitly {@link WaySection.verify|verify} messages.
         * @function encodeDelimited
         * @memberof WaySection
         * @static
         * @param {IWaySection} message WaySection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WaySection.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a WaySection message from the specified reader or buffer.
         * @function decode
         * @memberof WaySection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {WaySection} WaySection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WaySection.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.WaySection();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.wayId = reader.uint64();
                    break;
                case 2:
                    message.roadClass = reader.int32();
                    break;
                case 3:
                    message.oneWay = reader.bool();
                    break;
                case 4:
                    message.roundabout = reader.bool();
                    break;
                case 5:
                    message.link = reader.bool();
                    break;
                case 6:
                    if (!(message.nodeIds && message.nodeIds.length))
                        message.nodeIds = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.nodeIds.push(reader.uint64());
                    } else
                        message.nodeIds.push(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a WaySection message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof WaySection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {WaySection} WaySection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WaySection.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a WaySection message.
         * @function verify
         * @memberof WaySection
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WaySection.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.wayId != null && message.hasOwnProperty("wayId"))
                if (!$util.isInteger(message.wayId) && !(message.wayId && $util.isInteger(message.wayId.low) && $util.isInteger(message.wayId.high)))
                    return "wayId: integer|Long expected";
            if (message.roadClass != null && message.hasOwnProperty("roadClass"))
                switch (message.roadClass) {
                default:
                    return "roadClass: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    break;
                }
            if (message.oneWay != null && message.hasOwnProperty("oneWay"))
                if (typeof message.oneWay !== "boolean")
                    return "oneWay: boolean expected";
            if (message.roundabout != null && message.hasOwnProperty("roundabout"))
                if (typeof message.roundabout !== "boolean")
                    return "roundabout: boolean expected";
            if (message.link != null && message.hasOwnProperty("link"))
                if (typeof message.link !== "boolean")
                    return "link: boolean expected";
            if (message.nodeIds != null && message.hasOwnProperty("nodeIds")) {
                if (!Array.isArray(message.nodeIds))
                    return "nodeIds: array expected";
                for (var i = 0; i < message.nodeIds.length; ++i)
                    if (!$util.isInteger(message.nodeIds[i]) && !(message.nodeIds[i] && $util.isInteger(message.nodeIds[i].low) && $util.isInteger(message.nodeIds[i].high)))
                        return "nodeIds: integer|Long[] expected";
            }
            return null;
        };
    
        /**
         * Creates a WaySection message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof WaySection
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {WaySection} WaySection
         */
        WaySection.fromObject = function fromObject(object) {
            if (object instanceof $root.WaySection)
                return object;
            var message = new $root.WaySection();
            if (object.wayId != null)
                if ($util.Long)
                    (message.wayId = $util.Long.fromValue(object.wayId)).unsigned = true;
                else if (typeof object.wayId === "string")
                    message.wayId = parseInt(object.wayId, 10);
                else if (typeof object.wayId === "number")
                    message.wayId = object.wayId;
                else if (typeof object.wayId === "object")
                    message.wayId = new $util.LongBits(object.wayId.low >>> 0, object.wayId.high >>> 0).toNumber(true);
            switch (object.roadClass) {
            case "Motorway":
            case 0:
                message.roadClass = 0;
                break;
            case "Trunk":
            case 1:
                message.roadClass = 1;
                break;
            case "Primary":
            case 2:
                message.roadClass = 2;
                break;
            case "Secondary":
            case 3:
                message.roadClass = 3;
                break;
            case "Tertiary":
            case 4:
                message.roadClass = 4;
                break;
            case "Residential":
            case 5:
                message.roadClass = 5;
                break;
            case "Unclassified":
            case 6:
                message.roadClass = 6;
                break;
            case "Service":
            case 7:
                message.roadClass = 7;
                break;
            case "Other":
            case 8:
                message.roadClass = 8;
                break;
            }
            if (object.oneWay != null)
                message.oneWay = Boolean(object.oneWay);
            if (object.roundabout != null)
                message.roundabout = Boolean(object.roundabout);
            if (object.link != null)
                message.link = Boolean(object.link);
            if (object.nodeIds) {
                if (!Array.isArray(object.nodeIds))
                    throw TypeError(".WaySection.nodeIds: array expected");
                message.nodeIds = [];
                for (var i = 0; i < object.nodeIds.length; ++i)
                    if ($util.Long)
                        (message.nodeIds[i] = $util.Long.fromValue(object.nodeIds[i])).unsigned = true;
                    else if (typeof object.nodeIds[i] === "string")
                        message.nodeIds[i] = parseInt(object.nodeIds[i], 10);
                    else if (typeof object.nodeIds[i] === "number")
                        message.nodeIds[i] = object.nodeIds[i];
                    else if (typeof object.nodeIds[i] === "object")
                        message.nodeIds[i] = new $util.LongBits(object.nodeIds[i].low >>> 0, object.nodeIds[i].high >>> 0).toNumber(true);
            }
            return message;
        };
    
        /**
         * Creates a plain object from a WaySection message. Also converts values to other types if specified.
         * @function toObject
         * @memberof WaySection
         * @static
         * @param {WaySection} message WaySection
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WaySection.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.nodeIds = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.wayId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.wayId = options.longs === String ? "0" : 0;
                object.roadClass = options.enums === String ? "Motorway" : 0;
                object.oneWay = false;
                object.roundabout = false;
                object.link = false;
            }
            if (message.wayId != null && message.hasOwnProperty("wayId"))
                if (typeof message.wayId === "number")
                    object.wayId = options.longs === String ? String(message.wayId) : message.wayId;
                else
                    object.wayId = options.longs === String ? $util.Long.prototype.toString.call(message.wayId) : options.longs === Number ? new $util.LongBits(message.wayId.low >>> 0, message.wayId.high >>> 0).toNumber(true) : message.wayId;
            if (message.roadClass != null && message.hasOwnProperty("roadClass"))
                object.roadClass = options.enums === String ? $root.RoadClass[message.roadClass] : message.roadClass;
            if (message.oneWay != null && message.hasOwnProperty("oneWay"))
                object.oneWay = message.oneWay;
            if (message.roundabout != null && message.hasOwnProperty("roundabout"))
                object.roundabout = message.roundabout;
            if (message.link != null && message.hasOwnProperty("link"))
                object.link = message.link;
            if (message.nodeIds && message.nodeIds.length) {
                object.nodeIds = [];
                for (var j = 0; j < message.nodeIds.length; ++j)
                    if (typeof message.nodeIds[j] === "number")
                        object.nodeIds[j] = options.longs === String ? String(message.nodeIds[j]) : message.nodeIds[j];
                    else
                        object.nodeIds[j] = options.longs === String ? $util.Long.prototype.toString.call(message.nodeIds[j]) : options.longs === Number ? new $util.LongBits(message.nodeIds[j].low >>> 0, message.nodeIds[j].high >>> 0).toNumber(true) : message.nodeIds[j];
            }
            return object;
        };
    
        /**
         * Converts this WaySection to JSON.
         * @function toJSON
         * @memberof WaySection
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WaySection.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return WaySection;
    })();
    
    $root.OSMMetadata = (function() {
    
        /**
         * Properties of a OSMMetadata.
         * @exports IOSMMetadata
         * @interface IOSMMetadata
         * @property {Array.<IWaySection>|null} [waySections] OSMMetadata waySections
         */
    
        /**
         * Constructs a new OSMMetadata.
         * @exports OSMMetadata
         * @classdesc Represents a OSMMetadata.
         * @implements IOSMMetadata
         * @constructor
         * @param {IOSMMetadata=} [properties] Properties to set
         */
        function OSMMetadata(properties) {
            this.waySections = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * OSMMetadata waySections.
         * @member {Array.<IWaySection>} waySections
         * @memberof OSMMetadata
         * @instance
         */
        OSMMetadata.prototype.waySections = $util.emptyArray;
    
        /**
         * Creates a new OSMMetadata instance using the specified properties.
         * @function create
         * @memberof OSMMetadata
         * @static
         * @param {IOSMMetadata=} [properties] Properties to set
         * @returns {OSMMetadata} OSMMetadata instance
         */
        OSMMetadata.create = function create(properties) {
            return new OSMMetadata(properties);
        };
    
        /**
         * Encodes the specified OSMMetadata message. Does not implicitly {@link OSMMetadata.verify|verify} messages.
         * @function encode
         * @memberof OSMMetadata
         * @static
         * @param {IOSMMetadata} message OSMMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OSMMetadata.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.waySections != null && message.waySections.length)
                for (var i = 0; i < message.waySections.length; ++i)
                    $root.WaySection.encode(message.waySections[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified OSMMetadata message, length delimited. Does not implicitly {@link OSMMetadata.verify|verify} messages.
         * @function encodeDelimited
         * @memberof OSMMetadata
         * @static
         * @param {IOSMMetadata} message OSMMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OSMMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a OSMMetadata message from the specified reader or buffer.
         * @function decode
         * @memberof OSMMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {OSMMetadata} OSMMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OSMMetadata.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.OSMMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.waySections && message.waySections.length))
                        message.waySections = [];
                    message.waySections.push($root.WaySection.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a OSMMetadata message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof OSMMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {OSMMetadata} OSMMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OSMMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a OSMMetadata message.
         * @function verify
         * @memberof OSMMetadata
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OSMMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.waySections != null && message.hasOwnProperty("waySections")) {
                if (!Array.isArray(message.waySections))
                    return "waySections: array expected";
                for (var i = 0; i < message.waySections.length; ++i) {
                    var error = $root.WaySection.verify(message.waySections[i]);
                    if (error)
                        return "waySections." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a OSMMetadata message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof OSMMetadata
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {OSMMetadata} OSMMetadata
         */
        OSMMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.OSMMetadata)
                return object;
            var message = new $root.OSMMetadata();
            if (object.waySections) {
                if (!Array.isArray(object.waySections))
                    throw TypeError(".OSMMetadata.waySections: array expected");
                message.waySections = [];
                for (var i = 0; i < object.waySections.length; ++i) {
                    if (typeof object.waySections[i] !== "object")
                        throw TypeError(".OSMMetadata.waySections: object expected");
                    message.waySections[i] = $root.WaySection.fromObject(object.waySections[i]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a OSMMetadata message. Also converts values to other types if specified.
         * @function toObject
         * @memberof OSMMetadata
         * @static
         * @param {OSMMetadata} message OSMMetadata
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OSMMetadata.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.waySections = [];
            if (message.waySections && message.waySections.length) {
                object.waySections = [];
                for (var j = 0; j < message.waySections.length; ++j)
                    object.waySections[j] = $root.WaySection.toObject(message.waySections[j], options);
            }
            return object;
        };
    
        /**
         * Converts this OSMMetadata to JSON.
         * @function toJSON
         * @memberof OSMMetadata
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OSMMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return OSMMetadata;
    })();
    
    $root.SharedStreetsMetadata = (function() {
    
        /**
         * Properties of a SharedStreetsMetadata.
         * @exports ISharedStreetsMetadata
         * @interface ISharedStreetsMetadata
         * @property {string|null} [geometryID] SharedStreetsMetadata geometryID
         * @property {IOSMMetadata|null} [osmMetadata] SharedStreetsMetadata osmMetadata
         * @property {Array.<IGISMetadata>|null} [gisMetadata] SharedStreetsMetadata gisMetadata
         */
    
        /**
         * Constructs a new SharedStreetsMetadata.
         * @exports SharedStreetsMetadata
         * @classdesc Represents a SharedStreetsMetadata.
         * @implements ISharedStreetsMetadata
         * @constructor
         * @param {ISharedStreetsMetadata=} [properties] Properties to set
         */
        function SharedStreetsMetadata(properties) {
            this.gisMetadata = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * SharedStreetsMetadata geometryID.
         * @member {string} geometryID
         * @memberof SharedStreetsMetadata
         * @instance
         */
        SharedStreetsMetadata.prototype.geometryID = "";
    
        /**
         * SharedStreetsMetadata osmMetadata.
         * @member {IOSMMetadata|null|undefined} osmMetadata
         * @memberof SharedStreetsMetadata
         * @instance
         */
        SharedStreetsMetadata.prototype.osmMetadata = null;
    
        /**
         * SharedStreetsMetadata gisMetadata.
         * @member {Array.<IGISMetadata>} gisMetadata
         * @memberof SharedStreetsMetadata
         * @instance
         */
        SharedStreetsMetadata.prototype.gisMetadata = $util.emptyArray;
    
        /**
         * Creates a new SharedStreetsMetadata instance using the specified properties.
         * @function create
         * @memberof SharedStreetsMetadata
         * @static
         * @param {ISharedStreetsMetadata=} [properties] Properties to set
         * @returns {SharedStreetsMetadata} SharedStreetsMetadata instance
         */
        SharedStreetsMetadata.create = function create(properties) {
            return new SharedStreetsMetadata(properties);
        };
    
        /**
         * Encodes the specified SharedStreetsMetadata message. Does not implicitly {@link SharedStreetsMetadata.verify|verify} messages.
         * @function encode
         * @memberof SharedStreetsMetadata
         * @static
         * @param {ISharedStreetsMetadata} message SharedStreetsMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedStreetsMetadata.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.geometryID != null && message.hasOwnProperty("geometryID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.geometryID);
            if (message.osmMetadata != null && message.hasOwnProperty("osmMetadata"))
                $root.OSMMetadata.encode(message.osmMetadata, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.gisMetadata != null && message.gisMetadata.length)
                for (var i = 0; i < message.gisMetadata.length; ++i)
                    $root.GISMetadata.encode(message.gisMetadata[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified SharedStreetsMetadata message, length delimited. Does not implicitly {@link SharedStreetsMetadata.verify|verify} messages.
         * @function encodeDelimited
         * @memberof SharedStreetsMetadata
         * @static
         * @param {ISharedStreetsMetadata} message SharedStreetsMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedStreetsMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a SharedStreetsMetadata message from the specified reader or buffer.
         * @function decode
         * @memberof SharedStreetsMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SharedStreetsMetadata} SharedStreetsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedStreetsMetadata.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SharedStreetsMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.geometryID = reader.string();
                    break;
                case 2:
                    message.osmMetadata = $root.OSMMetadata.decode(reader, reader.uint32());
                    break;
                case 3:
                    if (!(message.gisMetadata && message.gisMetadata.length))
                        message.gisMetadata = [];
                    message.gisMetadata.push($root.GISMetadata.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a SharedStreetsMetadata message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof SharedStreetsMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {SharedStreetsMetadata} SharedStreetsMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedStreetsMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a SharedStreetsMetadata message.
         * @function verify
         * @memberof SharedStreetsMetadata
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SharedStreetsMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.geometryID != null && message.hasOwnProperty("geometryID"))
                if (!$util.isString(message.geometryID))
                    return "geometryID: string expected";
            if (message.osmMetadata != null && message.hasOwnProperty("osmMetadata")) {
                var error = $root.OSMMetadata.verify(message.osmMetadata);
                if (error)
                    return "osmMetadata." + error;
            }
            if (message.gisMetadata != null && message.hasOwnProperty("gisMetadata")) {
                if (!Array.isArray(message.gisMetadata))
                    return "gisMetadata: array expected";
                for (var i = 0; i < message.gisMetadata.length; ++i) {
                    var error = $root.GISMetadata.verify(message.gisMetadata[i]);
                    if (error)
                        return "gisMetadata." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a SharedStreetsMetadata message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SharedStreetsMetadata
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SharedStreetsMetadata} SharedStreetsMetadata
         */
        SharedStreetsMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.SharedStreetsMetadata)
                return object;
            var message = new $root.SharedStreetsMetadata();
            if (object.geometryID != null)
                message.geometryID = String(object.geometryID);
            if (object.osmMetadata != null) {
                if (typeof object.osmMetadata !== "object")
                    throw TypeError(".SharedStreetsMetadata.osmMetadata: object expected");
                message.osmMetadata = $root.OSMMetadata.fromObject(object.osmMetadata);
            }
            if (object.gisMetadata) {
                if (!Array.isArray(object.gisMetadata))
                    throw TypeError(".SharedStreetsMetadata.gisMetadata: array expected");
                message.gisMetadata = [];
                for (var i = 0; i < object.gisMetadata.length; ++i) {
                    if (typeof object.gisMetadata[i] !== "object")
                        throw TypeError(".SharedStreetsMetadata.gisMetadata: object expected");
                    message.gisMetadata[i] = $root.GISMetadata.fromObject(object.gisMetadata[i]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a SharedStreetsMetadata message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SharedStreetsMetadata
         * @static
         * @param {SharedStreetsMetadata} message SharedStreetsMetadata
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharedStreetsMetadata.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.gisMetadata = [];
            if (options.defaults) {
                object.geometryID = "";
                object.osmMetadata = null;
            }
            if (message.geometryID != null && message.hasOwnProperty("geometryID"))
                object.geometryID = message.geometryID;
            if (message.osmMetadata != null && message.hasOwnProperty("osmMetadata"))
                object.osmMetadata = $root.OSMMetadata.toObject(message.osmMetadata, options);
            if (message.gisMetadata && message.gisMetadata.length) {
                object.gisMetadata = [];
                for (var j = 0; j < message.gisMetadata.length; ++j)
                    object.gisMetadata[j] = $root.GISMetadata.toObject(message.gisMetadata[j], options);
            }
            return object;
        };
    
        /**
         * Converts this SharedStreetsMetadata to JSON.
         * @function toJSON
         * @memberof SharedStreetsMetadata
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharedStreetsMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return SharedStreetsMetadata;
    })();
    
    $root.SharedStreetsGeometry = (function() {
    
        /**
         * Properties of a SharedStreetsGeometry.
         * @exports ISharedStreetsGeometry
         * @interface ISharedStreetsGeometry
         * @property {string|null} [id] SharedStreetsGeometry id
         * @property {string|null} [fromIntersectionId] SharedStreetsGeometry fromIntersectionId
         * @property {string|null} [toIntersectionId] SharedStreetsGeometry toIntersectionId
         * @property {string|null} [forwardReferenceId] SharedStreetsGeometry forwardReferenceId
         * @property {string|null} [backReferenceId] SharedStreetsGeometry backReferenceId
         * @property {RoadClass|null} [roadClass] SharedStreetsGeometry roadClass
         * @property {Array.<number>|null} [latlons] SharedStreetsGeometry latlons
         */
    
        /**
         * Constructs a new SharedStreetsGeometry.
         * @exports SharedStreetsGeometry
         * @classdesc Represents a SharedStreetsGeometry.
         * @implements ISharedStreetsGeometry
         * @constructor
         * @param {ISharedStreetsGeometry=} [properties] Properties to set
         */
        function SharedStreetsGeometry(properties) {
            this.latlons = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * SharedStreetsGeometry id.
         * @member {string} id
         * @memberof SharedStreetsGeometry
         * @instance
         */
        SharedStreetsGeometry.prototype.id = "";
    
        /**
         * SharedStreetsGeometry fromIntersectionId.
         * @member {string} fromIntersectionId
         * @memberof SharedStreetsGeometry
         * @instance
         */
        SharedStreetsGeometry.prototype.fromIntersectionId = "";
    
        /**
         * SharedStreetsGeometry toIntersectionId.
         * @member {string} toIntersectionId
         * @memberof SharedStreetsGeometry
         * @instance
         */
        SharedStreetsGeometry.prototype.toIntersectionId = "";
    
        /**
         * SharedStreetsGeometry forwardReferenceId.
         * @member {string} forwardReferenceId
         * @memberof SharedStreetsGeometry
         * @instance
         */
        SharedStreetsGeometry.prototype.forwardReferenceId = "";
    
        /**
         * SharedStreetsGeometry backReferenceId.
         * @member {string} backReferenceId
         * @memberof SharedStreetsGeometry
         * @instance
         */
        SharedStreetsGeometry.prototype.backReferenceId = "";
    
        /**
         * SharedStreetsGeometry roadClass.
         * @member {RoadClass} roadClass
         * @memberof SharedStreetsGeometry
         * @instance
         */
        SharedStreetsGeometry.prototype.roadClass = 0;
    
        /**
         * SharedStreetsGeometry latlons.
         * @member {Array.<number>} latlons
         * @memberof SharedStreetsGeometry
         * @instance
         */
        SharedStreetsGeometry.prototype.latlons = $util.emptyArray;
    
        /**
         * Creates a new SharedStreetsGeometry instance using the specified properties.
         * @function create
         * @memberof SharedStreetsGeometry
         * @static
         * @param {ISharedStreetsGeometry=} [properties] Properties to set
         * @returns {SharedStreetsGeometry} SharedStreetsGeometry instance
         */
        SharedStreetsGeometry.create = function create(properties) {
            return new SharedStreetsGeometry(properties);
        };
    
        /**
         * Encodes the specified SharedStreetsGeometry message. Does not implicitly {@link SharedStreetsGeometry.verify|verify} messages.
         * @function encode
         * @memberof SharedStreetsGeometry
         * @static
         * @param {ISharedStreetsGeometry} message SharedStreetsGeometry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedStreetsGeometry.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.fromIntersectionId != null && message.hasOwnProperty("fromIntersectionId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.fromIntersectionId);
            if (message.toIntersectionId != null && message.hasOwnProperty("toIntersectionId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.toIntersectionId);
            if (message.forwardReferenceId != null && message.hasOwnProperty("forwardReferenceId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.forwardReferenceId);
            if (message.backReferenceId != null && message.hasOwnProperty("backReferenceId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.backReferenceId);
            if (message.roadClass != null && message.hasOwnProperty("roadClass"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.roadClass);
            if (message.latlons != null && message.latlons.length) {
                writer.uint32(/* id 7, wireType 2 =*/58).fork();
                for (var i = 0; i < message.latlons.length; ++i)
                    writer.float(message.latlons[i]);
                writer.ldelim();
            }
            return writer;
        };
    
        /**
         * Encodes the specified SharedStreetsGeometry message, length delimited. Does not implicitly {@link SharedStreetsGeometry.verify|verify} messages.
         * @function encodeDelimited
         * @memberof SharedStreetsGeometry
         * @static
         * @param {ISharedStreetsGeometry} message SharedStreetsGeometry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedStreetsGeometry.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a SharedStreetsGeometry message from the specified reader or buffer.
         * @function decode
         * @memberof SharedStreetsGeometry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SharedStreetsGeometry} SharedStreetsGeometry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedStreetsGeometry.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SharedStreetsGeometry();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.fromIntersectionId = reader.string();
                    break;
                case 3:
                    message.toIntersectionId = reader.string();
                    break;
                case 4:
                    message.forwardReferenceId = reader.string();
                    break;
                case 5:
                    message.backReferenceId = reader.string();
                    break;
                case 6:
                    message.roadClass = reader.int32();
                    break;
                case 7:
                    if (!(message.latlons && message.latlons.length))
                        message.latlons = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.latlons.push(reader.float());
                    } else
                        message.latlons.push(reader.float());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a SharedStreetsGeometry message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof SharedStreetsGeometry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {SharedStreetsGeometry} SharedStreetsGeometry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedStreetsGeometry.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a SharedStreetsGeometry message.
         * @function verify
         * @memberof SharedStreetsGeometry
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SharedStreetsGeometry.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.fromIntersectionId != null && message.hasOwnProperty("fromIntersectionId"))
                if (!$util.isString(message.fromIntersectionId))
                    return "fromIntersectionId: string expected";
            if (message.toIntersectionId != null && message.hasOwnProperty("toIntersectionId"))
                if (!$util.isString(message.toIntersectionId))
                    return "toIntersectionId: string expected";
            if (message.forwardReferenceId != null && message.hasOwnProperty("forwardReferenceId"))
                if (!$util.isString(message.forwardReferenceId))
                    return "forwardReferenceId: string expected";
            if (message.backReferenceId != null && message.hasOwnProperty("backReferenceId"))
                if (!$util.isString(message.backReferenceId))
                    return "backReferenceId: string expected";
            if (message.roadClass != null && message.hasOwnProperty("roadClass"))
                switch (message.roadClass) {
                default:
                    return "roadClass: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    break;
                }
            if (message.latlons != null && message.hasOwnProperty("latlons")) {
                if (!Array.isArray(message.latlons))
                    return "latlons: array expected";
                for (var i = 0; i < message.latlons.length; ++i)
                    if (typeof message.latlons[i] !== "number")
                        return "latlons: number[] expected";
            }
            return null;
        };
    
        /**
         * Creates a SharedStreetsGeometry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SharedStreetsGeometry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SharedStreetsGeometry} SharedStreetsGeometry
         */
        SharedStreetsGeometry.fromObject = function fromObject(object) {
            if (object instanceof $root.SharedStreetsGeometry)
                return object;
            var message = new $root.SharedStreetsGeometry();
            if (object.id != null)
                message.id = String(object.id);
            if (object.fromIntersectionId != null)
                message.fromIntersectionId = String(object.fromIntersectionId);
            if (object.toIntersectionId != null)
                message.toIntersectionId = String(object.toIntersectionId);
            if (object.forwardReferenceId != null)
                message.forwardReferenceId = String(object.forwardReferenceId);
            if (object.backReferenceId != null)
                message.backReferenceId = String(object.backReferenceId);
            switch (object.roadClass) {
            case "Motorway":
            case 0:
                message.roadClass = 0;
                break;
            case "Trunk":
            case 1:
                message.roadClass = 1;
                break;
            case "Primary":
            case 2:
                message.roadClass = 2;
                break;
            case "Secondary":
            case 3:
                message.roadClass = 3;
                break;
            case "Tertiary":
            case 4:
                message.roadClass = 4;
                break;
            case "Residential":
            case 5:
                message.roadClass = 5;
                break;
            case "Unclassified":
            case 6:
                message.roadClass = 6;
                break;
            case "Service":
            case 7:
                message.roadClass = 7;
                break;
            case "Other":
            case 8:
                message.roadClass = 8;
                break;
            }
            if (object.latlons) {
                if (!Array.isArray(object.latlons))
                    throw TypeError(".SharedStreetsGeometry.latlons: array expected");
                message.latlons = [];
                for (var i = 0; i < object.latlons.length; ++i)
                    message.latlons[i] = Number(object.latlons[i]);
            }
            return message;
        };
    
        /**
         * Creates a plain object from a SharedStreetsGeometry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SharedStreetsGeometry
         * @static
         * @param {SharedStreetsGeometry} message SharedStreetsGeometry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharedStreetsGeometry.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.latlons = [];
            if (options.defaults) {
                object.id = "";
                object.fromIntersectionId = "";
                object.toIntersectionId = "";
                object.forwardReferenceId = "";
                object.backReferenceId = "";
                object.roadClass = options.enums === String ? "Motorway" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.fromIntersectionId != null && message.hasOwnProperty("fromIntersectionId"))
                object.fromIntersectionId = message.fromIntersectionId;
            if (message.toIntersectionId != null && message.hasOwnProperty("toIntersectionId"))
                object.toIntersectionId = message.toIntersectionId;
            if (message.forwardReferenceId != null && message.hasOwnProperty("forwardReferenceId"))
                object.forwardReferenceId = message.forwardReferenceId;
            if (message.backReferenceId != null && message.hasOwnProperty("backReferenceId"))
                object.backReferenceId = message.backReferenceId;
            if (message.roadClass != null && message.hasOwnProperty("roadClass"))
                object.roadClass = options.enums === String ? $root.RoadClass[message.roadClass] : message.roadClass;
            if (message.latlons && message.latlons.length) {
                object.latlons = [];
                for (var j = 0; j < message.latlons.length; ++j)
                    object.latlons[j] = options.json && !isFinite(message.latlons[j]) ? String(message.latlons[j]) : message.latlons[j];
            }
            return object;
        };
    
        /**
         * Converts this SharedStreetsGeometry to JSON.
         * @function toJSON
         * @memberof SharedStreetsGeometry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharedStreetsGeometry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return SharedStreetsGeometry;
    })();
    
    $root.LocationReference = (function() {
    
        /**
         * Properties of a LocationReference.
         * @exports ILocationReference
         * @interface ILocationReference
         * @property {string|null} [intersectionId] LocationReference intersectionId
         * @property {number|null} [lat] LocationReference lat
         * @property {number|null} [lon] LocationReference lon
         * @property {number|null} [inboundBearing] LocationReference inboundBearing
         * @property {number|null} [outboundBearing] LocationReference outboundBearing
         * @property {number|null} [distanceToNextRef] LocationReference distanceToNextRef
         */
    
        /**
         * Constructs a new LocationReference.
         * @exports LocationReference
         * @classdesc Represents a LocationReference.
         * @implements ILocationReference
         * @constructor
         * @param {ILocationReference=} [properties] Properties to set
         */
        function LocationReference(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * LocationReference intersectionId.
         * @member {string} intersectionId
         * @memberof LocationReference
         * @instance
         */
        LocationReference.prototype.intersectionId = "";
    
        /**
         * LocationReference lat.
         * @member {number} lat
         * @memberof LocationReference
         * @instance
         */
        LocationReference.prototype.lat = 0;
    
        /**
         * LocationReference lon.
         * @member {number} lon
         * @memberof LocationReference
         * @instance
         */
        LocationReference.prototype.lon = 0;
    
        /**
         * LocationReference inboundBearing.
         * @member {number} inboundBearing
         * @memberof LocationReference
         * @instance
         */
        LocationReference.prototype.inboundBearing = 0;
    
        /**
         * LocationReference outboundBearing.
         * @member {number} outboundBearing
         * @memberof LocationReference
         * @instance
         */
        LocationReference.prototype.outboundBearing = 0;
    
        /**
         * LocationReference distanceToNextRef.
         * @member {number} distanceToNextRef
         * @memberof LocationReference
         * @instance
         */
        LocationReference.prototype.distanceToNextRef = 0;
    
        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;
    
        /**
         * LocationReference inboundBearingPresent.
         * @member {"inboundBearing"|undefined} inboundBearingPresent
         * @memberof LocationReference
         * @instance
         */
        Object.defineProperty(LocationReference.prototype, "inboundBearingPresent", {
            get: $util.oneOfGetter($oneOfFields = ["inboundBearing"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * LocationReference outboundBearingPresent.
         * @member {"outboundBearing"|undefined} outboundBearingPresent
         * @memberof LocationReference
         * @instance
         */
        Object.defineProperty(LocationReference.prototype, "outboundBearingPresent", {
            get: $util.oneOfGetter($oneOfFields = ["outboundBearing"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * LocationReference distanceToNextRefPresent.
         * @member {"distanceToNextRef"|undefined} distanceToNextRefPresent
         * @memberof LocationReference
         * @instance
         */
        Object.defineProperty(LocationReference.prototype, "distanceToNextRefPresent", {
            get: $util.oneOfGetter($oneOfFields = ["distanceToNextRef"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * Creates a new LocationReference instance using the specified properties.
         * @function create
         * @memberof LocationReference
         * @static
         * @param {ILocationReference=} [properties] Properties to set
         * @returns {LocationReference} LocationReference instance
         */
        LocationReference.create = function create(properties) {
            return new LocationReference(properties);
        };
    
        /**
         * Encodes the specified LocationReference message. Does not implicitly {@link LocationReference.verify|verify} messages.
         * @function encode
         * @memberof LocationReference
         * @static
         * @param {ILocationReference} message LocationReference message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LocationReference.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.intersectionId != null && message.hasOwnProperty("intersectionId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.intersectionId);
            if (message.lat != null && message.hasOwnProperty("lat"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.lat);
            if (message.lon != null && message.hasOwnProperty("lon"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.lon);
            if (message.inboundBearing != null && message.hasOwnProperty("inboundBearing"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.inboundBearing);
            if (message.outboundBearing != null && message.hasOwnProperty("outboundBearing"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.outboundBearing);
            if (message.distanceToNextRef != null && message.hasOwnProperty("distanceToNextRef"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.distanceToNextRef);
            return writer;
        };
    
        /**
         * Encodes the specified LocationReference message, length delimited. Does not implicitly {@link LocationReference.verify|verify} messages.
         * @function encodeDelimited
         * @memberof LocationReference
         * @static
         * @param {ILocationReference} message LocationReference message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LocationReference.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a LocationReference message from the specified reader or buffer.
         * @function decode
         * @memberof LocationReference
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {LocationReference} LocationReference
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LocationReference.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.LocationReference();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.intersectionId = reader.string();
                    break;
                case 2:
                    message.lat = reader.float();
                    break;
                case 3:
                    message.lon = reader.float();
                    break;
                case 4:
                    message.inboundBearing = reader.int32();
                    break;
                case 5:
                    message.outboundBearing = reader.int32();
                    break;
                case 6:
                    message.distanceToNextRef = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a LocationReference message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof LocationReference
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {LocationReference} LocationReference
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LocationReference.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a LocationReference message.
         * @function verify
         * @memberof LocationReference
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LocationReference.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.intersectionId != null && message.hasOwnProperty("intersectionId"))
                if (!$util.isString(message.intersectionId))
                    return "intersectionId: string expected";
            if (message.lat != null && message.hasOwnProperty("lat"))
                if (typeof message.lat !== "number")
                    return "lat: number expected";
            if (message.lon != null && message.hasOwnProperty("lon"))
                if (typeof message.lon !== "number")
                    return "lon: number expected";
            if (message.inboundBearing != null && message.hasOwnProperty("inboundBearing")) {
                properties.inboundBearingPresent = 1;
                if (!$util.isInteger(message.inboundBearing))
                    return "inboundBearing: integer expected";
            }
            if (message.outboundBearing != null && message.hasOwnProperty("outboundBearing")) {
                properties.outboundBearingPresent = 1;
                if (!$util.isInteger(message.outboundBearing))
                    return "outboundBearing: integer expected";
            }
            if (message.distanceToNextRef != null && message.hasOwnProperty("distanceToNextRef")) {
                properties.distanceToNextRefPresent = 1;
                if (!$util.isInteger(message.distanceToNextRef))
                    return "distanceToNextRef: integer expected";
            }
            return null;
        };
    
        /**
         * Creates a LocationReference message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof LocationReference
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {LocationReference} LocationReference
         */
        LocationReference.fromObject = function fromObject(object) {
            if (object instanceof $root.LocationReference)
                return object;
            var message = new $root.LocationReference();
            if (object.intersectionId != null)
                message.intersectionId = String(object.intersectionId);
            if (object.lat != null)
                message.lat = Number(object.lat);
            if (object.lon != null)
                message.lon = Number(object.lon);
            if (object.inboundBearing != null)
                message.inboundBearing = object.inboundBearing | 0;
            if (object.outboundBearing != null)
                message.outboundBearing = object.outboundBearing | 0;
            if (object.distanceToNextRef != null)
                message.distanceToNextRef = object.distanceToNextRef | 0;
            return message;
        };
    
        /**
         * Creates a plain object from a LocationReference message. Also converts values to other types if specified.
         * @function toObject
         * @memberof LocationReference
         * @static
         * @param {LocationReference} message LocationReference
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LocationReference.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.intersectionId = "";
                object.lat = 0;
                object.lon = 0;
            }
            if (message.intersectionId != null && message.hasOwnProperty("intersectionId"))
                object.intersectionId = message.intersectionId;
            if (message.lat != null && message.hasOwnProperty("lat"))
                object.lat = options.json && !isFinite(message.lat) ? String(message.lat) : message.lat;
            if (message.lon != null && message.hasOwnProperty("lon"))
                object.lon = options.json && !isFinite(message.lon) ? String(message.lon) : message.lon;
            if (message.inboundBearing != null && message.hasOwnProperty("inboundBearing")) {
                object.inboundBearing = message.inboundBearing;
                if (options.oneofs)
                    object.inboundBearingPresent = "inboundBearing";
            }
            if (message.outboundBearing != null && message.hasOwnProperty("outboundBearing")) {
                object.outboundBearing = message.outboundBearing;
                if (options.oneofs)
                    object.outboundBearingPresent = "outboundBearing";
            }
            if (message.distanceToNextRef != null && message.hasOwnProperty("distanceToNextRef")) {
                object.distanceToNextRef = message.distanceToNextRef;
                if (options.oneofs)
                    object.distanceToNextRefPresent = "distanceToNextRef";
            }
            return object;
        };
    
        /**
         * Converts this LocationReference to JSON.
         * @function toJSON
         * @memberof LocationReference
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LocationReference.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return LocationReference;
    })();
    
    $root.SharedStreetsReference = (function() {
    
        /**
         * Properties of a SharedStreetsReference.
         * @exports ISharedStreetsReference
         * @interface ISharedStreetsReference
         * @property {string|null} [id] SharedStreetsReference id
         * @property {string|null} [geometryId] SharedStreetsReference geometryId
         * @property {SharedStreetsReference.FormOfWay|null} [formOfWay] SharedStreetsReference formOfWay
         * @property {Array.<ILocationReference>|null} [locationReferences] SharedStreetsReference locationReferences
         */
    
        /**
         * Constructs a new SharedStreetsReference.
         * @exports SharedStreetsReference
         * @classdesc Represents a SharedStreetsReference.
         * @implements ISharedStreetsReference
         * @constructor
         * @param {ISharedStreetsReference=} [properties] Properties to set
         */
        function SharedStreetsReference(properties) {
            this.locationReferences = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * SharedStreetsReference id.
         * @member {string} id
         * @memberof SharedStreetsReference
         * @instance
         */
        SharedStreetsReference.prototype.id = "";
    
        /**
         * SharedStreetsReference geometryId.
         * @member {string} geometryId
         * @memberof SharedStreetsReference
         * @instance
         */
        SharedStreetsReference.prototype.geometryId = "";
    
        /**
         * SharedStreetsReference formOfWay.
         * @member {SharedStreetsReference.FormOfWay} formOfWay
         * @memberof SharedStreetsReference
         * @instance
         */
        SharedStreetsReference.prototype.formOfWay = 0;
    
        /**
         * SharedStreetsReference locationReferences.
         * @member {Array.<ILocationReference>} locationReferences
         * @memberof SharedStreetsReference
         * @instance
         */
        SharedStreetsReference.prototype.locationReferences = $util.emptyArray;
    
        /**
         * Creates a new SharedStreetsReference instance using the specified properties.
         * @function create
         * @memberof SharedStreetsReference
         * @static
         * @param {ISharedStreetsReference=} [properties] Properties to set
         * @returns {SharedStreetsReference} SharedStreetsReference instance
         */
        SharedStreetsReference.create = function create(properties) {
            return new SharedStreetsReference(properties);
        };
    
        /**
         * Encodes the specified SharedStreetsReference message. Does not implicitly {@link SharedStreetsReference.verify|verify} messages.
         * @function encode
         * @memberof SharedStreetsReference
         * @static
         * @param {ISharedStreetsReference} message SharedStreetsReference message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedStreetsReference.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.geometryId != null && message.hasOwnProperty("geometryId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.geometryId);
            if (message.formOfWay != null && message.hasOwnProperty("formOfWay"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.formOfWay);
            if (message.locationReferences != null && message.locationReferences.length)
                for (var i = 0; i < message.locationReferences.length; ++i)
                    $root.LocationReference.encode(message.locationReferences[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified SharedStreetsReference message, length delimited. Does not implicitly {@link SharedStreetsReference.verify|verify} messages.
         * @function encodeDelimited
         * @memberof SharedStreetsReference
         * @static
         * @param {ISharedStreetsReference} message SharedStreetsReference message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedStreetsReference.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a SharedStreetsReference message from the specified reader or buffer.
         * @function decode
         * @memberof SharedStreetsReference
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SharedStreetsReference} SharedStreetsReference
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedStreetsReference.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SharedStreetsReference();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.geometryId = reader.string();
                    break;
                case 3:
                    message.formOfWay = reader.int32();
                    break;
                case 4:
                    if (!(message.locationReferences && message.locationReferences.length))
                        message.locationReferences = [];
                    message.locationReferences.push($root.LocationReference.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a SharedStreetsReference message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof SharedStreetsReference
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {SharedStreetsReference} SharedStreetsReference
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedStreetsReference.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a SharedStreetsReference message.
         * @function verify
         * @memberof SharedStreetsReference
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SharedStreetsReference.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.geometryId != null && message.hasOwnProperty("geometryId"))
                if (!$util.isString(message.geometryId))
                    return "geometryId: string expected";
            if (message.formOfWay != null && message.hasOwnProperty("formOfWay"))
                switch (message.formOfWay) {
                default:
                    return "formOfWay: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    break;
                }
            if (message.locationReferences != null && message.hasOwnProperty("locationReferences")) {
                if (!Array.isArray(message.locationReferences))
                    return "locationReferences: array expected";
                for (var i = 0; i < message.locationReferences.length; ++i) {
                    var error = $root.LocationReference.verify(message.locationReferences[i]);
                    if (error)
                        return "locationReferences." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a SharedStreetsReference message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SharedStreetsReference
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SharedStreetsReference} SharedStreetsReference
         */
        SharedStreetsReference.fromObject = function fromObject(object) {
            if (object instanceof $root.SharedStreetsReference)
                return object;
            var message = new $root.SharedStreetsReference();
            if (object.id != null)
                message.id = String(object.id);
            if (object.geometryId != null)
                message.geometryId = String(object.geometryId);
            switch (object.formOfWay) {
            case "Undefined":
            case 0:
                message.formOfWay = 0;
                break;
            case "Motorway":
            case 1:
                message.formOfWay = 1;
                break;
            case "MultipleCarriageway":
            case 2:
                message.formOfWay = 2;
                break;
            case "SingleCarriageway":
            case 3:
                message.formOfWay = 3;
                break;
            case "Roundabout":
            case 4:
                message.formOfWay = 4;
                break;
            case "TrafficSquare":
            case 5:
                message.formOfWay = 5;
                break;
            case "SlipRoad":
            case 6:
                message.formOfWay = 6;
                break;
            case "Other":
            case 7:
                message.formOfWay = 7;
                break;
            }
            if (object.locationReferences) {
                if (!Array.isArray(object.locationReferences))
                    throw TypeError(".SharedStreetsReference.locationReferences: array expected");
                message.locationReferences = [];
                for (var i = 0; i < object.locationReferences.length; ++i) {
                    if (typeof object.locationReferences[i] !== "object")
                        throw TypeError(".SharedStreetsReference.locationReferences: object expected");
                    message.locationReferences[i] = $root.LocationReference.fromObject(object.locationReferences[i]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a SharedStreetsReference message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SharedStreetsReference
         * @static
         * @param {SharedStreetsReference} message SharedStreetsReference
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharedStreetsReference.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.locationReferences = [];
            if (options.defaults) {
                object.id = "";
                object.geometryId = "";
                object.formOfWay = options.enums === String ? "Undefined" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.geometryId != null && message.hasOwnProperty("geometryId"))
                object.geometryId = message.geometryId;
            if (message.formOfWay != null && message.hasOwnProperty("formOfWay"))
                object.formOfWay = options.enums === String ? $root.SharedStreetsReference.FormOfWay[message.formOfWay] : message.formOfWay;
            if (message.locationReferences && message.locationReferences.length) {
                object.locationReferences = [];
                for (var j = 0; j < message.locationReferences.length; ++j)
                    object.locationReferences[j] = $root.LocationReference.toObject(message.locationReferences[j], options);
            }
            return object;
        };
    
        /**
         * Converts this SharedStreetsReference to JSON.
         * @function toJSON
         * @memberof SharedStreetsReference
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharedStreetsReference.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * FormOfWay enum.
         * @name SharedStreetsReference.FormOfWay
         * @enum {string}
         * @property {number} Undefined=0 Undefined value
         * @property {number} Motorway=1 Motorway value
         * @property {number} MultipleCarriageway=2 MultipleCarriageway value
         * @property {number} SingleCarriageway=3 SingleCarriageway value
         * @property {number} Roundabout=4 Roundabout value
         * @property {number} TrafficSquare=5 TrafficSquare value
         * @property {number} SlipRoad=6 SlipRoad value
         * @property {number} Other=7 Other value
         */
        SharedStreetsReference.FormOfWay = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Undefined"] = 0;
            values[valuesById[1] = "Motorway"] = 1;
            values[valuesById[2] = "MultipleCarriageway"] = 2;
            values[valuesById[3] = "SingleCarriageway"] = 3;
            values[valuesById[4] = "Roundabout"] = 4;
            values[valuesById[5] = "TrafficSquare"] = 5;
            values[valuesById[6] = "SlipRoad"] = 6;
            values[valuesById[7] = "Other"] = 7;
            return values;
        })();
    
        return SharedStreetsReference;
    })();
    
    $root.SharedStreetsIntersection = (function() {
    
        /**
         * Properties of a SharedStreetsIntersection.
         * @exports ISharedStreetsIntersection
         * @interface ISharedStreetsIntersection
         * @property {string|null} [id] SharedStreetsIntersection id
         * @property {number|Long|null} [nodeId] SharedStreetsIntersection nodeId
         * @property {number|null} [lat] SharedStreetsIntersection lat
         * @property {number|null} [lon] SharedStreetsIntersection lon
         * @property {Array.<string>|null} [inboundReferenceIds] SharedStreetsIntersection inboundReferenceIds
         * @property {Array.<string>|null} [outboundReferenceIds] SharedStreetsIntersection outboundReferenceIds
         */
    
        /**
         * Constructs a new SharedStreetsIntersection.
         * @exports SharedStreetsIntersection
         * @classdesc Represents a SharedStreetsIntersection.
         * @implements ISharedStreetsIntersection
         * @constructor
         * @param {ISharedStreetsIntersection=} [properties] Properties to set
         */
        function SharedStreetsIntersection(properties) {
            this.inboundReferenceIds = [];
            this.outboundReferenceIds = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * SharedStreetsIntersection id.
         * @member {string} id
         * @memberof SharedStreetsIntersection
         * @instance
         */
        SharedStreetsIntersection.prototype.id = "";
    
        /**
         * SharedStreetsIntersection nodeId.
         * @member {number|Long} nodeId
         * @memberof SharedStreetsIntersection
         * @instance
         */
        SharedStreetsIntersection.prototype.nodeId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
        /**
         * SharedStreetsIntersection lat.
         * @member {number} lat
         * @memberof SharedStreetsIntersection
         * @instance
         */
        SharedStreetsIntersection.prototype.lat = 0;
    
        /**
         * SharedStreetsIntersection lon.
         * @member {number} lon
         * @memberof SharedStreetsIntersection
         * @instance
         */
        SharedStreetsIntersection.prototype.lon = 0;
    
        /**
         * SharedStreetsIntersection inboundReferenceIds.
         * @member {Array.<string>} inboundReferenceIds
         * @memberof SharedStreetsIntersection
         * @instance
         */
        SharedStreetsIntersection.prototype.inboundReferenceIds = $util.emptyArray;
    
        /**
         * SharedStreetsIntersection outboundReferenceIds.
         * @member {Array.<string>} outboundReferenceIds
         * @memberof SharedStreetsIntersection
         * @instance
         */
        SharedStreetsIntersection.prototype.outboundReferenceIds = $util.emptyArray;
    
        /**
         * Creates a new SharedStreetsIntersection instance using the specified properties.
         * @function create
         * @memberof SharedStreetsIntersection
         * @static
         * @param {ISharedStreetsIntersection=} [properties] Properties to set
         * @returns {SharedStreetsIntersection} SharedStreetsIntersection instance
         */
        SharedStreetsIntersection.create = function create(properties) {
            return new SharedStreetsIntersection(properties);
        };
    
        /**
         * Encodes the specified SharedStreetsIntersection message. Does not implicitly {@link SharedStreetsIntersection.verify|verify} messages.
         * @function encode
         * @memberof SharedStreetsIntersection
         * @static
         * @param {ISharedStreetsIntersection} message SharedStreetsIntersection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedStreetsIntersection.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.nodeId != null && message.hasOwnProperty("nodeId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.nodeId);
            if (message.lat != null && message.hasOwnProperty("lat"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.lat);
            if (message.lon != null && message.hasOwnProperty("lon"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.lon);
            if (message.inboundReferenceIds != null && message.inboundReferenceIds.length)
                for (var i = 0; i < message.inboundReferenceIds.length; ++i)
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.inboundReferenceIds[i]);
            if (message.outboundReferenceIds != null && message.outboundReferenceIds.length)
                for (var i = 0; i < message.outboundReferenceIds.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.outboundReferenceIds[i]);
            return writer;
        };
    
        /**
         * Encodes the specified SharedStreetsIntersection message, length delimited. Does not implicitly {@link SharedStreetsIntersection.verify|verify} messages.
         * @function encodeDelimited
         * @memberof SharedStreetsIntersection
         * @static
         * @param {ISharedStreetsIntersection} message SharedStreetsIntersection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedStreetsIntersection.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a SharedStreetsIntersection message from the specified reader or buffer.
         * @function decode
         * @memberof SharedStreetsIntersection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SharedStreetsIntersection} SharedStreetsIntersection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedStreetsIntersection.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SharedStreetsIntersection();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.nodeId = reader.uint64();
                    break;
                case 3:
                    message.lat = reader.float();
                    break;
                case 4:
                    message.lon = reader.float();
                    break;
                case 5:
                    if (!(message.inboundReferenceIds && message.inboundReferenceIds.length))
                        message.inboundReferenceIds = [];
                    message.inboundReferenceIds.push(reader.string());
                    break;
                case 6:
                    if (!(message.outboundReferenceIds && message.outboundReferenceIds.length))
                        message.outboundReferenceIds = [];
                    message.outboundReferenceIds.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a SharedStreetsIntersection message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof SharedStreetsIntersection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {SharedStreetsIntersection} SharedStreetsIntersection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedStreetsIntersection.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a SharedStreetsIntersection message.
         * @function verify
         * @memberof SharedStreetsIntersection
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SharedStreetsIntersection.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.nodeId != null && message.hasOwnProperty("nodeId"))
                if (!$util.isInteger(message.nodeId) && !(message.nodeId && $util.isInteger(message.nodeId.low) && $util.isInteger(message.nodeId.high)))
                    return "nodeId: integer|Long expected";
            if (message.lat != null && message.hasOwnProperty("lat"))
                if (typeof message.lat !== "number")
                    return "lat: number expected";
            if (message.lon != null && message.hasOwnProperty("lon"))
                if (typeof message.lon !== "number")
                    return "lon: number expected";
            if (message.inboundReferenceIds != null && message.hasOwnProperty("inboundReferenceIds")) {
                if (!Array.isArray(message.inboundReferenceIds))
                    return "inboundReferenceIds: array expected";
                for (var i = 0; i < message.inboundReferenceIds.length; ++i)
                    if (!$util.isString(message.inboundReferenceIds[i]))
                        return "inboundReferenceIds: string[] expected";
            }
            if (message.outboundReferenceIds != null && message.hasOwnProperty("outboundReferenceIds")) {
                if (!Array.isArray(message.outboundReferenceIds))
                    return "outboundReferenceIds: array expected";
                for (var i = 0; i < message.outboundReferenceIds.length; ++i)
                    if (!$util.isString(message.outboundReferenceIds[i]))
                        return "outboundReferenceIds: string[] expected";
            }
            return null;
        };
    
        /**
         * Creates a SharedStreetsIntersection message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SharedStreetsIntersection
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SharedStreetsIntersection} SharedStreetsIntersection
         */
        SharedStreetsIntersection.fromObject = function fromObject(object) {
            if (object instanceof $root.SharedStreetsIntersection)
                return object;
            var message = new $root.SharedStreetsIntersection();
            if (object.id != null)
                message.id = String(object.id);
            if (object.nodeId != null)
                if ($util.Long)
                    (message.nodeId = $util.Long.fromValue(object.nodeId)).unsigned = true;
                else if (typeof object.nodeId === "string")
                    message.nodeId = parseInt(object.nodeId, 10);
                else if (typeof object.nodeId === "number")
                    message.nodeId = object.nodeId;
                else if (typeof object.nodeId === "object")
                    message.nodeId = new $util.LongBits(object.nodeId.low >>> 0, object.nodeId.high >>> 0).toNumber(true);
            if (object.lat != null)
                message.lat = Number(object.lat);
            if (object.lon != null)
                message.lon = Number(object.lon);
            if (object.inboundReferenceIds) {
                if (!Array.isArray(object.inboundReferenceIds))
                    throw TypeError(".SharedStreetsIntersection.inboundReferenceIds: array expected");
                message.inboundReferenceIds = [];
                for (var i = 0; i < object.inboundReferenceIds.length; ++i)
                    message.inboundReferenceIds[i] = String(object.inboundReferenceIds[i]);
            }
            if (object.outboundReferenceIds) {
                if (!Array.isArray(object.outboundReferenceIds))
                    throw TypeError(".SharedStreetsIntersection.outboundReferenceIds: array expected");
                message.outboundReferenceIds = [];
                for (var i = 0; i < object.outboundReferenceIds.length; ++i)
                    message.outboundReferenceIds[i] = String(object.outboundReferenceIds[i]);
            }
            return message;
        };
    
        /**
         * Creates a plain object from a SharedStreetsIntersection message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SharedStreetsIntersection
         * @static
         * @param {SharedStreetsIntersection} message SharedStreetsIntersection
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharedStreetsIntersection.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.inboundReferenceIds = [];
                object.outboundReferenceIds = [];
            }
            if (options.defaults) {
                object.id = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.nodeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.nodeId = options.longs === String ? "0" : 0;
                object.lat = 0;
                object.lon = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.nodeId != null && message.hasOwnProperty("nodeId"))
                if (typeof message.nodeId === "number")
                    object.nodeId = options.longs === String ? String(message.nodeId) : message.nodeId;
                else
                    object.nodeId = options.longs === String ? $util.Long.prototype.toString.call(message.nodeId) : options.longs === Number ? new $util.LongBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0).toNumber(true) : message.nodeId;
            if (message.lat != null && message.hasOwnProperty("lat"))
                object.lat = options.json && !isFinite(message.lat) ? String(message.lat) : message.lat;
            if (message.lon != null && message.hasOwnProperty("lon"))
                object.lon = options.json && !isFinite(message.lon) ? String(message.lon) : message.lon;
            if (message.inboundReferenceIds && message.inboundReferenceIds.length) {
                object.inboundReferenceIds = [];
                for (var j = 0; j < message.inboundReferenceIds.length; ++j)
                    object.inboundReferenceIds[j] = message.inboundReferenceIds[j];
            }
            if (message.outboundReferenceIds && message.outboundReferenceIds.length) {
                object.outboundReferenceIds = [];
                for (var j = 0; j < message.outboundReferenceIds.length; ++j)
                    object.outboundReferenceIds[j] = message.outboundReferenceIds[j];
            }
            return object;
        };
    
        /**
         * Converts this SharedStreetsIntersection to JSON.
         * @function toJSON
         * @memberof SharedStreetsIntersection
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharedStreetsIntersection.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return SharedStreetsIntersection;
    })();

    return $root;
})(protobuf);
