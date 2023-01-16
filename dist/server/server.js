(()=>{var e={738:(e,t,s)=>{const n=s(147),r=s(17),i=s(37),o=s(968).version,a=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;function d(e){console.log(`[dotenv@${o}][DEBUG] ${e}`)}const c={config:function(e){let t=r.resolve(process.cwd(),".env"),s="utf8";const o=Boolean(e&&e.debug),a=Boolean(e&&e.override);var l;e&&(null!=e.path&&(t="~"===(l=e.path)[0]?r.join(i.homedir(),l.slice(1)):l),null!=e.encoding&&(s=e.encoding));try{const e=c.parse(n.readFileSync(t,{encoding:s}));return Object.keys(e).forEach((function(t){Object.prototype.hasOwnProperty.call(process.env,t)?(!0===a&&(process.env[t]=e[t]),o&&d(!0===a?`"${t}" is already defined in \`process.env\` and WAS overwritten`:`"${t}" is already defined in \`process.env\` and was NOT overwritten`)):process.env[t]=e[t]})),{parsed:e}}catch(e){return o&&d(`Failed to load ${t} ${e.message}`),{error:e}}},parse:function(e){const t={};let s,n=e.toString();for(n=n.replace(/\r\n?/gm,"\n");null!=(s=a.exec(n));){const e=s[1];let n=s[2]||"";n=n.trim();const r=n[0];n=n.replace(/^(['"`])([\s\S]*)\1$/gm,"$2"),'"'===r&&(n=n.replace(/\\n/g,"\n"),n=n.replace(/\\r/g,"\r")),t[e]=n}return t}};e.exports.config=c.config,e.exports.parse=c.parse,e.exports=c},19:function(e,t,s){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(s(17));n(s(738)).default.config({path:r.default.resolve(__dirname,"./.env")});const i=(e=>{for(const[t,s]of Object.entries(e))if(void 0===s)throw new Error(`Missing key ${t} in config.env`);return e})({NODE_ENV:"production",PORT:process.env.PORT?Number(process.env.PORT):4e3,API_URL:"api",HOST:process.env.HOST||"localhost"});t.default=i},89:(e,t)=>{"use strict";var s,n;Object.defineProperty(t,"__esModule",{value:!0}),t.StatusCodes=t.ApiMethods=t.ApiPath=void 0,(t.ApiPath||(t.ApiPath={})).API_USERS="/api/users",(n=t.ApiMethods||(t.ApiMethods={})).GET="GET",n.POST="POST",n.DELETE="DELETE",n.PUT="PUT",(s=t.StatusCodes||(t.StatusCodes={}))[s.OK=200]="OK",s[s.CREATED=201]="CREATED",s[s.NO_CONTENT=204]="NO_CONTENT",s[s.BAD_REQUEST=400]="BAD_REQUEST",s[s.NOT_FOUND=404]="NOT_FOUND",s[s.INTERNAL_SERVER_ERROR=500]="INTERNAL_SERVER_ERROR"},799:function(e,t,s){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(s(17)),i=s(21),o=n(s(292));class a{static async readDataFile(){try{return await o.default.readFile(r.default.resolve(__dirname,"./data.json"),{encoding:"utf8"})||""}catch(e){console.log(e)}}static async getUsers(){return new Promise((async(e,t)=>e(JSON.parse(await a.readDataFile()||"[]"))))}static async getUser(e){return new Promise((async(t,s)=>{const n=(await a.getUsers())?.find((t=>t.id===e));n?t(n):s(`user with id ${e} was not found `)}))}static async createUser(e){return new Promise(((t,s)=>{const{age:n,username:r,hobbies:o}=e;"number"==typeof n&&"string"==typeof r&&Array.isArray(o)&&o?.every((e=>"string"==typeof e))?t({...e,id:(0,i.v4)()}):(n&&"number"==typeof n||s("age field is required and should be number"),r&&"string"!=typeof r||s("username field is required and should be string"),o&&!Array.isArray(o)||s("hobbies field is required and should be Array"))}))}static async updateUser(e,t){return new Promise((async(s,n)=>{(await a.getUsers()).find((e=>e.id===t))||n(`No user with id ${e.id} found`),s({...e,id:t})}))}static async deleteUser(e){return new Promise((async(t,s)=>{(await a.getUsers()).find((t=>t.id===e))||s(`No user with id ${e} found`),t("user deleted successfully")}))}}t.default=a},341:function(e,t,s){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(s(685)),i=s(89),o=n(s(799)),a=n(s(530)),d=s(147),c=n(s(17)),l=n(s(39)),u=n(s(19)),p=process.env.PORT||u.default.PORT||4e3;r.default.createServer((async(e,t)=>{if(e.url===i.ApiPath.API_USERS)switch(e.method){case i.ApiMethods.GET:const s=await o.default.getUsers();t.writeHead(i.StatusCodes.OK,{"Content-Type":"application/json"}),t.end(JSON.stringify(s));break;case i.ApiMethods.POST:try{const s=await(0,a.default)(e),n=await o.default.createUser(JSON.parse(s)),r=await o.default.getUsers();r.push(n),(0,d.writeFile)(c.default.join(__dirname,"./data.json"),JSON.stringify(r),(e=>{if(e){const e={message:"could not persist data!"};t.writeHead(i.StatusCodes.INTERNAL_SERVER_ERROR,{"Content-Type":"application/json"}),t.end(JSON.stringify(e,null,2))}else t.writeHead(i.StatusCodes.CREATED,{"Content-Type":"application/json"}),t.end(JSON.stringify(r,null,2))})),t.writeHead(i.StatusCodes.CREATED,{"Content-Type":"application/json"}),t.end(JSON.stringify(n))}catch(e){t.writeHead(i.StatusCodes.BAD_REQUEST,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:e}))}}else if(e?.url?.includes(i.ApiPath.API_USERS+"/")){const s=e?.url?.split("/")[3];switch((0,l.default)(s)||(t.writeHead(i.StatusCodes.BAD_REQUEST,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"You should use uuid for id"}))),e.method){case i.ApiMethods.GET:try{const e=await o.default.getUser(s);t.writeHead(i.StatusCodes.OK,{"Content-Type":"application/json"}),t.end(JSON.stringify(e))}catch(e){t.writeHead(i.StatusCodes.NOT_FOUND,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:e}))}break;case i.ApiMethods.DELETE:try{let e=await o.default.deleteUser(s);const n=(await o.default.getUsers()).filter((e=>e.id!==s));(0,d.writeFile)(c.default.join(__dirname,"./data.json"),JSON.stringify(n),(s=>{if(s){const e={message:"could not persist data!"};t.writeHead(i.StatusCodes.INTERNAL_SERVER_ERROR,{"Content-Type":"application/json"}),t.end(JSON.stringify(e,null,2))}else t.writeHead(i.StatusCodes.NO_CONTENT,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:e}))}))}catch(e){t.writeHead(i.StatusCodes.NOT_FOUND,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:e}))}break;case i.ApiMethods.PUT:try{const n=await(0,a.default)(e),r=await o.default.updateUser(JSON.parse(n),s),l=(await o.default.getUsers()).filter((e=>e.id!==s));l.push(r),(0,d.writeFile)(c.default.join(__dirname,"./data.json"),JSON.stringify(l),(e=>{if(e){const e={message:"could not persist data!"};t.writeHead(i.StatusCodes.INTERNAL_SERVER_ERROR,{"Content-Type":"application/json"}),t.end(JSON.stringify(e,null,2))}else t.writeHead(i.StatusCodes.OK,{"Content-Type":"application/json"}),t.end(JSON.stringify(r,null,2))}))}catch(e){t.writeHead(i.StatusCodes.NOT_FOUND,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:e}))}break;default:t.writeHead(i.StatusCodes.NOT_FOUND,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:"Incorrect method"}))}}else t.writeHead(i.StatusCodes.NOT_FOUND,{"Content-Type":"application/json"}),t.end(JSON.stringify({message:"Route not found"}))})).listen(p,(()=>{console.log(`server started on port: ${p}`)}))},530:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return new Promise(((t,s)=>{try{let s="";e.on("data",(e=>{s+=e.toString()})),e.on("end",(()=>{t(s)}))}catch(e){s(e)}}))}},39:(e,t,s)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UUID_VERSION=void 0;const n=s(21),r=s(21);t.UUID_VERSION=4,t.default=function(e){return(0,r.validate)(e)&&(0,n.version)(e)===t.UUID_VERSION}},21:(e,t,s)=>{"use strict";s.r(t),s.d(t,{NIL:()=>E,parse:()=>O,stringify:()=>u,v1:()=>v,v3:()=>m,v4:()=>h,v5:()=>w,validate:()=>c,version:()=>_});const n=require("crypto");var r=s.n(n);const i=new Uint8Array(256);let o=i.length;function a(){return o>i.length-16&&(r().randomFillSync(i),o=0),i.slice(o,o+=16)}const d=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,c=function(e){return"string"==typeof e&&d.test(e)},l=[];for(let e=0;e<256;++e)l.push((e+256).toString(16).substr(1));const u=function(e,t=0){const s=(l[e[t+0]]+l[e[t+1]]+l[e[t+2]]+l[e[t+3]]+"-"+l[e[t+4]]+l[e[t+5]]+"-"+l[e[t+6]]+l[e[t+7]]+"-"+l[e[t+8]]+l[e[t+9]]+"-"+l[e[t+10]]+l[e[t+11]]+l[e[t+12]]+l[e[t+13]]+l[e[t+14]]+l[e[t+15]]).toLowerCase();if(!c(s))throw TypeError("Stringified UUID is invalid");return s};let p,f,y=0,g=0;const v=function(e,t,s){let n=t&&s||0;const r=t||new Array(16);let i=(e=e||{}).node||p,o=void 0!==e.clockseq?e.clockseq:f;if(null==i||null==o){const t=e.random||(e.rng||a)();null==i&&(i=p=[1|t[0],t[1],t[2],t[3],t[4],t[5]]),null==o&&(o=f=16383&(t[6]<<8|t[7]))}let d=void 0!==e.msecs?e.msecs:Date.now(),c=void 0!==e.nsecs?e.nsecs:g+1;const l=d-y+(c-g)/1e4;if(l<0&&void 0===e.clockseq&&(o=o+1&16383),(l<0||d>y)&&void 0===e.nsecs&&(c=0),c>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");y=d,g=c,f=o,d+=122192928e5;const v=(1e4*(268435455&d)+c)%4294967296;r[n++]=v>>>24&255,r[n++]=v>>>16&255,r[n++]=v>>>8&255,r[n++]=255&v;const O=d/4294967296*1e4&268435455;r[n++]=O>>>8&255,r[n++]=255&O,r[n++]=O>>>24&15|16,r[n++]=O>>>16&255,r[n++]=o>>>8|128,r[n++]=255&o;for(let e=0;e<6;++e)r[n+e]=i[e];return t||u(r)},O=function(e){if(!c(e))throw TypeError("Invalid UUID");let t;const s=new Uint8Array(16);return s[0]=(t=parseInt(e.slice(0,8),16))>>>24,s[1]=t>>>16&255,s[2]=t>>>8&255,s[3]=255&t,s[4]=(t=parseInt(e.slice(9,13),16))>>>8,s[5]=255&t,s[6]=(t=parseInt(e.slice(14,18),16))>>>8,s[7]=255&t,s[8]=(t=parseInt(e.slice(19,23),16))>>>8,s[9]=255&t,s[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,s[11]=t/4294967296&255,s[12]=t>>>24&255,s[13]=t>>>16&255,s[14]=t>>>8&255,s[15]=255&t,s};function S(e,t,s){function n(e,n,r,i){if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let s=0;s<e.length;++s)t.push(e.charCodeAt(s));return t}(e)),"string"==typeof n&&(n=O(n)),16!==n.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let o=new Uint8Array(16+e.length);if(o.set(n),o.set(e,n.length),o=s(o),o[6]=15&o[6]|t,o[8]=63&o[8]|128,r){i=i||0;for(let e=0;e<16;++e)r[i+e]=o[e];return r}return u(o)}try{n.name=e}catch(e){}return n.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",n.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",n}const m=S("v3",48,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),r().createHash("md5").update(e).digest()})),h=function(e,t,s){const n=(e=e||{}).random||(e.rng||a)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){s=s||0;for(let e=0;e<16;++e)t[s+e]=n[e];return t}return u(n)},w=S("v5",80,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),r().createHash("sha1").update(e).digest()})),E="00000000-0000-0000-0000-000000000000",_=function(e){if(!c(e))throw TypeError("Invalid UUID");return parseInt(e.substr(14,1),16)}},147:e=>{"use strict";e.exports=require("fs")},292:e=>{"use strict";e.exports=require("fs/promises")},685:e=>{"use strict";e.exports=require("http")},37:e=>{"use strict";e.exports=require("os")},17:e=>{"use strict";e.exports=require("path")},968:e=>{"use strict";e.exports=JSON.parse('{"name":"dotenv","version":"16.0.3","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"require":"./lib/main.js","types":"./lib/main.d.ts","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@types/node":"^17.0.9","decache":"^4.6.1","dtslint":"^3.7.0","sinon":"^12.0.1","standard":"^16.0.4","standard-markdown":"^7.1.0","standard-version":"^9.3.2","tap":"^15.1.6","tar":"^6.1.11","typescript":"^4.5.4"},"engines":{"node":">=12"}}')}},t={};function s(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,s),i.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s(341)})();