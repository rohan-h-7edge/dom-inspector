import{i as e,n as t}from"./chunk-C22JK1gz.js";import{_ as n,v as r}from"./chunk-JAPRZBRM-DaKLn-Ia.js";import{$ as i,B as a,C as o,D as s,E as c,F as l,G as u,H as d,J as f,K as p,L as m,O as h,Q as g,R as _,S as v,T as y,U as b,V as x,W as S,X as C,Y as w,Z as T,a as E,c as D,d as O,et as k,f as A,h as j,i as M,it as ee,j as N,l as P,m as te,n as ne,nt as re,o as ie,p as F,q as ae,r as oe,rt as se,s as ce,t as le,tt as ue,u as de,w as fe,x as pe,z as me}from"./PromptParamsDialog-89sMaI9G.js";import"./katex-DeQmVuSQ.js";import"./marked.esm-BQCgjGPS.js";import"./bundle-full-Dn7NdW6q.js";var I=e(r()),he=new TextEncoder;function ge(e){return he.encode(e)}function _e(e,t){return new TextDecoder(t).decode(e)}function ve(e){return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}function ye(){if(typeof navigator<`u`&&navigator.product===`ReactNative`)return!0;if(typeof process<`u`){let e=process.type;return e===`renderer`||e===`worker`?!1:!!(process.versions&&process.versions.node)}return!1}var be=/(%?)(%([sdijo]))/g;function xe(e,t){switch(t){case`s`:return e;case`d`:case`i`:return Number(e);case`j`:return JSON.stringify(e);case`o`:{if(typeof e==`string`)return e;let t=JSON.stringify(e);return t===`{}`||t===`[]`||/^\[object .+?\]$/.test(t)?e:t}}}function Se(e,...t){if(t.length===0)return e;let n=0,r=e.replace(be,(e,r,i,a)=>{let o=t[n],s=xe(o,a);return r?e:(n++,s)});return n<t.length&&(r+=` ${t.slice(n).join(` `)}`),r=r.replace(/%{2,2}/g,`%`),r}var Ce=2;function we(e){if(!e.stack)return;let t=e.stack.split(`
`);t.splice(1,Ce),e.stack=t.join(`
`)}var Te=class extends Error{constructor(e,...t){super(e),this.message=e,this.name=`Invariant Violation`,this.message=Se(e,...t),we(this)}},L=(e,t,...n)=>{if(!e)throw new Te(t,...n)};L.as=(e,t,n,...r)=>{if(!t){let t=r.length===0?n:Se(n,...r),i;try{i=Reflect.construct(e,[t])}catch{i=e(t)}throw i}};var Ee=Object.defineProperty,De=(e,t)=>{for(var n in t)Ee(e,n,{get:t[n],enumerable:!0})},Oe={};De(Oe,{blue:()=>Ae,gray:()=>je,green:()=>Ne,red:()=>Me,yellow:()=>ke});function ke(e){return`\x1B[33m${e}\x1B[0m`}function Ae(e){return`\x1B[34m${e}\x1B[0m`}function je(e){return`\x1B[90m${e}\x1B[0m`}function Me(e){return`\x1B[31m${e}\x1B[0m`}function Ne(e){return`\x1B[32m${e}\x1B[0m`}var Pe=ye(),Fe=class{constructor(e){this.name=e,this.prefix=`[${this.name}]`;let t=Be(`DEBUG`),n=Be(`LOG_LEVEL`);t===`1`||t===`true`||t!==void 0&&this.name.startsWith(t)?(this.debug=Ve(n,`debug`)?R:this.debug,this.info=Ve(n,`info`)?R:this.info,this.success=Ve(n,`success`)?R:this.success,this.warning=Ve(n,`warning`)?R:this.warning,this.error=Ve(n,`error`)?R:this.error):(this.info=R,this.success=R,this.warning=R,this.error=R,this.only=R)}prefix;extend(e){return new Fe(`${this.name}:${e}`)}debug(e,...t){this.logEntry({level:`debug`,message:je(e),positionals:t,prefix:this.prefix,colors:{prefix:`gray`}})}info(e,...t){this.logEntry({level:`info`,message:e,positionals:t,prefix:this.prefix,colors:{prefix:`blue`}});let n=new Ie;return(e,...t)=>{n.measure(),this.logEntry({level:`info`,message:`${e} ${je(`${n.deltaTime}ms`)}`,positionals:t,prefix:this.prefix,colors:{prefix:`blue`}})}}success(e,...t){this.logEntry({level:`info`,message:e,positionals:t,prefix:`\u2714 ${this.prefix}`,colors:{timestamp:`green`,prefix:`green`}})}warning(e,...t){this.logEntry({level:`warning`,message:e,positionals:t,prefix:`\u26A0 ${this.prefix}`,colors:{timestamp:`yellow`,prefix:`yellow`}})}error(e,...t){this.logEntry({level:`error`,message:e,positionals:t,prefix:`\u2716 ${this.prefix}`,colors:{timestamp:`red`,prefix:`red`}})}only(e){e()}createEntry(e,t){return{timestamp:new Date,level:e,message:t}}logEntry(e){let{level:t,message:n,prefix:r,colors:i,positionals:a=[]}=e,o=this.createEntry(t,n),s=i?.timestamp||`gray`,c=i?.prefix||`gray`,l={timestamp:Oe[s],prefix:Oe[c]};this.getWriter(t)([l.timestamp(this.formatTimestamp(o.timestamp))].concat(r==null?[]:l.prefix(r),He(n)).join(` `),...a.map(He))}formatTimestamp(e){return`${e.toLocaleTimeString(`en-GB`)}:${e.getMilliseconds()}`}getWriter(e){switch(e){case`debug`:case`success`:case`info`:return Le;case`warning`:return Re;case`error`:return ze}}},Ie=class{startTime;endTime;deltaTime;constructor(){this.startTime=performance.now()}measure(){this.endTime=performance.now(),this.deltaTime=(this.endTime-this.startTime).toFixed(2)}},R=()=>void 0;function Le(e,...t){if(Pe){process.stdout.write(Se(e,...t)+`
`);return}console.log(e,...t)}function Re(e,...t){if(Pe){process.stderr.write(Se(e,...t)+`
`);return}console.warn(e,...t)}function ze(e,...t){if(Pe){process.stderr.write(Se(e,...t)+`
`);return}console.error(e,...t)}function Be(e){return Pe?process.env[e]:globalThis[e]?.toString()}function Ve(e,t){return e!==void 0&&e!==t}function He(e){return e===void 0?`undefined`:e===null?`null`:typeof e==`string`?e:typeof e==`object`?JSON.stringify(e):e.toString()}var Ue=class extends Error{constructor(e,t,n){super(`Possible EventEmitter memory leak detected. ${n} ${t.toString()} listeners added. Use emitter.setMaxListeners() to increase limit`),this.emitter=e,this.type=t,this.count=n,this.name=`MaxListenersExceededWarning`}},We=class{static listenerCount(e,t){return e.listenerCount(t)}constructor(){this.events=new Map,this.maxListeners=We.defaultMaxListeners,this.hasWarnedAboutPotentialMemoryLeak=!1}_emitInternalEvent(e,t,n){this.emit(e,t,n)}_getListeners(e){return Array.prototype.concat.apply([],this.events.get(e))||[]}_removeListener(e,t){let n=e.indexOf(t);return n>-1&&e.splice(n,1),[]}_wrapOnceListener(e,t){let n=(...r)=>(this.removeListener(e,n),t.apply(this,r));return Object.defineProperty(n,`name`,{value:t.name}),n}setMaxListeners(e){return this.maxListeners=e,this}getMaxListeners(){return this.maxListeners}eventNames(){return Array.from(this.events.keys())}emit(e,...t){let n=this._getListeners(e);return n.forEach(e=>{e.apply(this,t)}),n.length>0}addListener(e,t){this._emitInternalEvent(`newListener`,e,t);let n=this._getListeners(e).concat(t);if(this.events.set(e,n),this.maxListeners>0&&this.listenerCount(e)>this.maxListeners&&!this.hasWarnedAboutPotentialMemoryLeak){this.hasWarnedAboutPotentialMemoryLeak=!0;let t=new Ue(this,e,this.listenerCount(e));console.warn(t)}return this}on(e,t){return this.addListener(e,t)}once(e,t){return this.addListener(e,this._wrapOnceListener(e,t))}prependListener(e,t){let n=this._getListeners(e);if(n.length>0){let r=[t].concat(n);this.events.set(e,r)}else this.events.set(e,n.concat(t));return this}prependOnceListener(e,t){return this.prependListener(e,this._wrapOnceListener(e,t))}removeListener(e,t){let n=this._getListeners(e);return n.length>0&&(this._removeListener(n,t),this.events.set(e,n),this._emitInternalEvent(`removeListener`,e,t)),this}off(e,t){return this.removeListener(e,t)}removeAllListeners(e){return e?this.events.delete(e):this.events.clear(),this}listeners(e){return Array.from(this._getListeners(e))}listenerCount(e){return this._getListeners(e).length}rawListeners(e){return this.listeners(e)}},Ge=We;Ge.defaultMaxListeners=10;var Ke=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},qe=(e,t,n)=>(Ke(e,t,`read from private field`),n?n.call(e):t.get(e)),Je=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ye=`x-interceptors-internal-request-id`;function Xe(e){return globalThis[e]||void 0}function Ze(e,t){globalThis[e]=t}function Qe(e){delete globalThis[e]}var $e=class{constructor(e){this.symbol=e,this.readyState=`INACTIVE`,this.emitter=new Ge,this.subscriptions=[],this.logger=new Fe(e.description),this.emitter.setMaxListeners(0),this.logger.info(`constructing the interceptor...`)}checkEnvironment(){return!0}apply(){let e=this.logger.extend(`apply`);if(e.info(`applying the interceptor...`),this.readyState===`APPLIED`){e.info(`intercepted already applied!`);return}if(!this.checkEnvironment()){e.info(`the interceptor cannot be applied in this environment!`);return}this.readyState=`APPLYING`;let t=this.getInstance();if(t){e.info(`found a running instance, reusing...`),this.on=(n,r)=>(e.info(`proxying the "%s" listener`,n),t.emitter.addListener(n,r),this.subscriptions.push(()=>{t.emitter.removeListener(n,r),e.info(`removed proxied "%s" listener!`,n)}),this),this.readyState=`APPLIED`;return}e.info(`no running instance found, setting up a new instance...`),this.setup(),this.setInstance(),this.readyState=`APPLIED`}setup(){}on(e,t){let n=this.logger.extend(`on`);return this.readyState===`DISPOSING`||this.readyState===`DISPOSED`?(n.info(`cannot listen to events, already disposed!`),this):(n.info(`adding "%s" event listener:`,e,t),this.emitter.on(e,t),this)}once(e,t){return this.emitter.once(e,t),this}off(e,t){return this.emitter.off(e,t),this}removeAllListeners(e){return this.emitter.removeAllListeners(e),this}dispose(){let e=this.logger.extend(`dispose`);if(this.readyState===`DISPOSED`){e.info(`cannot dispose, already disposed!`);return}if(e.info(`disposing the interceptor...`),this.readyState=`DISPOSING`,!this.getInstance()){e.info(`no interceptors running, skipping dispose...`);return}if(this.clearInstance(),e.info(`global symbol deleted:`,Xe(this.symbol)),this.subscriptions.length>0){e.info(`disposing of %d subscriptions...`,this.subscriptions.length);for(let e of this.subscriptions)e();this.subscriptions=[],e.info(`disposed of all subscriptions!`,this.subscriptions.length)}this.emitter.removeAllListeners(),e.info(`destroyed the listener!`),this.readyState=`DISPOSED`}getInstance(){let e=Xe(this.symbol);return this.logger.info(`retrieved global instance:`,e?.constructor?.name),e}setInstance(){Ze(this.symbol,this),this.logger.info(`set global instance!`,this.symbol.description)}clearInstance(){Qe(this.symbol),this.logger.info(`cleared global instance!`,this.symbol.description)}};function et(){return Math.random().toString(16).slice(2)}function tt(){let e=(t,n)=>{e.state=`pending`,e.resolve=n=>e.state===`pending`?(e.result=n,t(n instanceof Promise?n:Promise.resolve(n).then(t=>(e.state=`fulfilled`,t)))):void 0,e.reject=t=>{if(e.state===`pending`)return queueMicrotask(()=>{e.state=`rejected`}),n(e.rejectionReason=t)}};return e}var nt=class extends Promise{#e;resolve;reject;constructor(e=null){let t=tt();super((n,r)=>{t(n,r),e?.(t.resolve,t.reject)}),this.#e=t,this.resolve=this.#e.resolve,this.reject=this.#e.reject}get state(){return this.#e.state}get rejectionReason(){return this.#e.rejectionReason}then(e,t){return this.#t(super.then(e,t))}catch(e){return this.#t(super.catch(e))}finally(e){return this.#t(super.finally(e))}#t(e){return Object.defineProperties(e,{resolve:{configurable:!0,value:this.resolve},reject:{configurable:!0,value:this.reject}})}},rt=Symbol(`isPatchedModule`),it=class extends Error{constructor(e){super(e),this.name=`InterceptorError`,Object.setPrototypeOf(this,it.prototype)}},at,ot,st=class{constructor(e,t){this.request=e,this.source=t,Je(this,at),this.readyState=st.PENDING,this.handled=new nt}async passthrough(){L.as(it,this.readyState===st.PENDING,`Failed to passthrough the "%s %s" request: the request has already been handled`,this.request.method,this.request.url),this.readyState=st.PASSTHROUGH,await this.source.passthrough(),qe(this,at,ot).resolve()}respondWith(e){L.as(it,this.readyState===st.PENDING,`Failed to respond to the "%s %s" request with "%d %s": the request has already been handled (%d)`,this.request.method,this.request.url,e.status,e.statusText||`OK`,this.readyState),this.readyState=st.RESPONSE,qe(this,at,ot).resolve(),this.source.respondWith(e)}errorWith(e){L.as(it,this.readyState===st.PENDING,`Failed to error the "%s %s" request with "%s": the request has already been handled (%d)`,this.request.method,this.request.url,e?.toString(),this.readyState),this.readyState=st.ERROR,this.source.errorWith(e),qe(this,at,ot).resolve()}},ct=st;at=new WeakSet,ot=function(){return this.handled},ct.PENDING=0,ct.PASSTHROUGH=1,ct.RESPONSE=2,ct.ERROR=3;function lt(e){try{return new URL(e),!0}catch{return!1}}function ut(e,t){let n=Object.getOwnPropertySymbols(t).find(t=>t.description===e);if(n)return Reflect.get(t,n)}var dt=class extends Response{static isConfigurableStatusCode(e){return e>=200&&e<=599}static isRedirectResponse(e){return dt.STATUS_CODES_WITH_REDIRECT.includes(e)}static isResponseWithBody(e){return!dt.STATUS_CODES_WITHOUT_BODY.includes(e)}static setUrl(e,t){if(!e||e===`about:`||!lt(e))return;let n=ut(`state`,t);n?n.urlList.push(new URL(e)):Object.defineProperty(t,`url`,{value:e,enumerable:!0,configurable:!0,writable:!1})}static parseRawHeaders(e){let t=new Headers;for(let n=0;n<e.length;n+=2)t.append(e[n],e[n+1]);return t}constructor(e,t={}){let n=t.status??200,r=dt.isConfigurableStatusCode(n)?n:200,i=dt.isResponseWithBody(n)?e:null;if(super(i,{status:r,statusText:t.statusText,headers:t.headers}),n!==r){let e=ut(`state`,this);e?e.status=n:Object.defineProperty(this,`status`,{value:n,enumerable:!0,configurable:!0,writable:!1})}dt.setUrl(t.url,this)}},ft=dt;ft.STATUS_CODES_WITHOUT_BODY=[101,103,204,205,304],ft.STATUS_CODES_WITH_REDIRECT=[301,302,303,307,308];var pt=Symbol(`kRawRequest`);function mt(e,t){Reflect.set(e,pt,t)}var ht=class extends $e{constructor(e){ht.symbol=Symbol(e.name),super(ht.symbol),this.interceptors=e.interceptors}setup(){let e=this.logger.extend(`setup`);e.info(`applying all %d interceptors...`,this.interceptors.length);for(let t of this.interceptors)e.info(`applying "%s" interceptor...`,t.constructor.name),t.apply(),e.info(`adding interceptor dispose subscription`),this.subscriptions.push(()=>t.dispose())}on(e,t){for(let n of this.interceptors)n.on(e,t);return this}once(e,t){for(let n of this.interceptors)n.once(e,t);return this}off(e,t){for(let n of this.interceptors)n.off(e,t);return this}removeAllListeners(e){for(let t of this.interceptors)t.removeAllListeners(e);return this}};async function gt(e,t,...n){let r=e.listeners(t);if(r.length!==0)for(let t of r)await t.apply(e,n)}function _t(e){let t=Object.getOwnPropertyDescriptor(globalThis,e);return t===void 0||typeof t.get==`function`&&t.get()===void 0||t.get===void 0&&t.value==null?!1:t.set===void 0&&!t.configurable?(console.error(`[MSW] Failed to apply interceptor: the global \`${e}\` property is non-configurable. This is likely an issue with your environment. If you are using a framework, please open an issue about this in their repository.`),!1):!0}var vt=async e=>{try{return{error:null,data:await e().catch(e=>{throw e})}}catch(e){return{error:e,data:null}}};function yt(e,t=!1){return t?Object.prototype.toString.call(e).startsWith(`[object `):Object.prototype.toString.call(e)===`[object Object]`}function bt(e,t){try{return e[t],!0}catch{return!1}}function xt(e){return new Response(JSON.stringify(e instanceof Error?{name:e.name,message:e.message,stack:e.stack}:e),{status:500,statusText:`Unhandled Exception`,headers:{"Content-Type":`application/json`}})}function St(e){return e!=null&&e instanceof Response&&bt(e,`type`)&&e.type===`error`}function Ct(e){return yt(e,!0)&&bt(e,`status`)&&bt(e,`statusText`)&&bt(e,`bodyUsed`)}function wt(e){return e==null||!(e instanceof Error)?!1:`code`in e&&`errno`in e}async function Tt(e){let t=async t=>t instanceof Error?(await e.controller.errorWith(t),!0):St(t)||Ct(t)?(await e.controller.respondWith(t),!0):yt(t)?(await e.controller.errorWith(t),!0):!1,n=async n=>{if(n instanceof it)throw i.error;return wt(n)?(await e.controller.errorWith(n),!0):n instanceof Response?await t(n):!1},r=new nt;if(e.request.signal){if(e.request.signal.aborted){await e.controller.errorWith(e.request.signal.reason);return}e.request.signal.addEventListener(`abort`,()=>{r.reject(e.request.signal.reason)},{once:!0})}let i=await vt(async()=>{let t=gt(e.emitter,`request`,{requestId:e.requestId,request:e.request,controller:e.controller});await Promise.race([r,t,e.controller.handled])});if(r.state===`rejected`){await e.controller.errorWith(r.rejectionReason);return}if(i.error){if(await n(i.error))return;if(e.emitter.listenerCount(`unhandledException`)>0){let n=new ct(e.request,{passthrough(){},async respondWith(e){await t(e)},async errorWith(t){await e.controller.errorWith(t)}});if(await gt(e.emitter,`unhandledException`,{error:i.error,request:e.request,requestId:e.requestId,controller:n}),n.readyState!==ct.PENDING)return}await e.controller.respondWith(xt(i.error));return}return e.controller.readyState===ct.PENDING?await e.controller.passthrough():e.controller.handled}function Et(e){return Object.assign(TypeError(`Failed to fetch`),{cause:e})}var Dt=[`content-encoding`,`content-language`,`content-location`,`content-type`,`content-length`],Ot=Symbol(`kRedirectCount`);async function kt(e,t){if(t.status!==303&&e.body!=null)return Promise.reject(Et());let n=new URL(e.url),r;try{r=new URL(t.headers.get(`location`),e.url)}catch(e){return Promise.reject(Et(e))}if(!(r.protocol===`http:`||r.protocol===`https:`))return Promise.reject(Et(`URL scheme must be a HTTP(S) scheme`));if(Reflect.get(e,Ot)>20)return Promise.reject(Et(`redirect count exceeded`));if(Object.defineProperty(e,Ot,{value:(Reflect.get(e,Ot)||0)+1}),e.mode===`cors`&&(r.username||r.password)&&!At(n,r))return Promise.reject(Et(`cross origin not allowed for request mode "cors"`));let i={};([301,302].includes(t.status)&&e.method===`POST`||t.status===303&&![`HEAD`,`GET`].includes(e.method))&&(i.method=`GET`,i.body=null,Dt.forEach(t=>{e.headers.delete(t)})),At(n,r)||(e.headers.delete(`authorization`),e.headers.delete(`proxy-authorization`),e.headers.delete(`cookie`),e.headers.delete(`host`)),i.headers=e.headers;let a=await fetch(new Request(r,i));return Object.defineProperty(a,`redirected`,{value:!0,configurable:!0}),a}function At(e,t){return e.origin===t.origin&&e.origin===`null`||e.protocol===t.protocol&&e.hostname===t.hostname&&e.port===t.port}var jt=class extends TransformStream{constructor(){console.warn(`[Interceptors]: Brotli decompression of response streams is not supported in the browser`),super({transform(e,t){t.enqueue(e)}})}},Mt=class extends TransformStream{constructor(e,...t){super({},...t);let n=[super.readable,...e].reduce((e,t)=>e.pipeThrough(t));Object.defineProperty(this,`readable`,{get(){return n}})}};function Nt(e){return e.toLowerCase().split(`,`).map(e=>e.trim())}function Pt(e){if(e===``)return null;let t=Nt(e);return t.length===0?null:new Mt(t.reduceRight((e,t)=>t===`gzip`||t===`x-gzip`?e.concat(new DecompressionStream(`gzip`)):t===`deflate`?e.concat(new DecompressionStream(`deflate`)):t===`br`?e.concat(new jt):(e.length=0,e),[]))}function Ft(e){if(e.body===null)return null;let t=Pt(e.headers.get(`content-encoding`)||``);return t?(e.body.pipeTo(t.writable),t.readable):null}var It=class extends $e{constructor(){super(It.symbol)}checkEnvironment(){return _t(`fetch`)}async setup(){let e=globalThis.fetch;L(!e[rt],`Failed to patch the "fetch" module: already patched.`),globalThis.fetch=async(t,n)=>{let r=et(),i=typeof t==`string`&&typeof location<`u`&&!lt(t)?new URL(t,location.href):t,a=new Request(i,n);t instanceof Request&&mt(a,t);let o=new nt,s=new ct(a,{passthrough:async()=>{this.logger.info(`request has not been handled, passthrough...`);let t=a.clone(),{error:n,data:i}=await vt(()=>e(a));if(n)return o.reject(n);if(this.logger.info(`original fetch performed`,i),this.emitter.listenerCount(`response`)>0){this.logger.info(`emitting the "response" event...`);let e=i.clone();await gt(this.emitter,`response`,{response:e,isMockedResponse:!1,request:t,requestId:r})}o.resolve(i)},respondWith:async e=>{if(St(e)){this.logger.info(`request has errored!`,{response:e}),o.reject(Et(e));return}this.logger.info(`received mocked response!`,{rawResponse:e});let t=Ft(e),n=t===null?e:new ft(t,e);if(ft.setUrl(a.url,n),ft.isRedirectResponse(n.status)){if(a.redirect===`error`){o.reject(Et(`unexpected redirect`));return}if(a.redirect===`follow`){kt(a,n).then(e=>{o.resolve(e)},e=>{o.reject(e)});return}}this.emitter.listenerCount(`response`)>0&&(this.logger.info(`emitting the "response" event...`),await gt(this.emitter,`response`,{response:n.clone(),isMockedResponse:!0,request:a,requestId:r})),o.resolve(n)},errorWith:e=>{this.logger.info(`request has been aborted!`,{reason:e}),o.reject(e)}});return this.logger.info(`[%s] %s`,a.method,a.url),this.logger.info(`awaiting for the mocked response...`),this.logger.info(`emitting the "request" event for %s listener(s)...`,this.emitter.listenerCount(`request`)),await Tt({request:a,requestId:r,emitter:this.emitter,controller:s}),o},Object.defineProperty(globalThis.fetch,rt,{enumerable:!0,configurable:!0,value:!0}),this.subscriptions.push(()=>{Object.defineProperty(globalThis.fetch,rt,{value:void 0}),globalThis.fetch=e,this.logger.info(`restored native "globalThis.fetch"!`,globalThis.fetch.name)})}},Lt=It;Lt.symbol=Symbol(`fetch`);function Rt(e,t){let n=new Uint8Array(e.byteLength+t.byteLength);return n.set(e,0),n.set(t,e.byteLength),n}var zt=class{constructor(e,t){this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,this.type=``,this.srcElement=null,this.currentTarget=null,this.eventPhase=0,this.isTrusted=!0,this.composed=!1,this.cancelable=!0,this.defaultPrevented=!1,this.bubbles=!0,this.lengthComputable=!0,this.loaded=0,this.total=0,this.cancelBubble=!1,this.returnValue=!0,this.type=e,this.target=t?.target||null,this.currentTarget=t?.currentTarget||null,this.timeStamp=Date.now()}composedPath(){return[]}initEvent(e,t,n){this.type=e,this.bubbles=!!t,this.cancelable=!!n}preventDefault(){this.defaultPrevented=!0}stopPropagation(){}stopImmediatePropagation(){}},Bt=class extends zt{constructor(e,t){super(e),this.lengthComputable=t?.lengthComputable||!1,this.composed=t?.composed||!1,this.loaded=t?.loaded||0,this.total=t?.total||0}},Vt=typeof ProgressEvent<`u`;function Ht(e,t,n){let r=[`error`,`progress`,`loadstart`,`loadend`,`load`,`timeout`,`abort`],i=Vt?ProgressEvent:Bt;return r.includes(t)?new i(t,{lengthComputable:!0,loaded:n?.loaded||0,total:n?.total||0}):new zt(t,{target:e,currentTarget:e})}function Ut(e,t){if(!(t in e))return null;if(Object.prototype.hasOwnProperty.call(e,t))return e;let n=Reflect.getPrototypeOf(e);return n?Ut(n,t):null}function Wt(e,t){return new Proxy(e,Gt(t))}function Gt(e){let{constructorCall:t,methodCall:n,getProperty:r,setProperty:i}=e,a={};return t!==void 0&&(a.construct=function(e,n,r){let i=Reflect.construct.bind(null,e,n,r);return t.call(r,n,i)}),a.set=function(e,t,n){let r=()=>{let r=Ut(e,t)||e,i=Reflect.getOwnPropertyDescriptor(r,t);return i?.set===void 0?Reflect.defineProperty(r,t,{writable:!0,enumerable:!0,configurable:!0,value:n}):(i.set.apply(e,[n]),!0)};return i===void 0?r():i.call(e,[t,n],r)},a.get=function(e,t,i){let a=()=>e[t],o=r===void 0?a():r.call(e,[t,i],a);return typeof o==`function`?(...r)=>{let i=o.bind(e,...r);return n===void 0?i():n.call(e,[t,r],i)}:o},a}function Kt(e){return[`application/xhtml+xml`,`application/xml`,`image/svg+xml`,`text/html`,`text/xml`].some(t=>e.startsWith(t))}function qt(e){try{return JSON.parse(e)}catch{return null}}function Jt(e,t){return new ft(ft.isResponseWithBody(e.status)?t:null,{url:e.responseURL,status:e.status,statusText:e.statusText,headers:Yt(e.getAllResponseHeaders())})}function Yt(e){let t=new Headers,n=e.split(/[\r\n]+/);for(let e of n){if(e.trim()===``)continue;let[n,...r]=e.split(`: `),i=r.join(`: `);t.append(n,i)}return t}async function Xt(e){let t=e.headers.get(`content-length`);return t!=null&&t!==``?Number(t):(await e.arrayBuffer()).byteLength}var Zt=Symbol(`kIsRequestHandled`),Qt=ye(),$t=Symbol(`kFetchRequest`),en=class{constructor(e,t){this.initialRequest=e,this.logger=t,this.method=`GET`,this.url=null,this[Zt]=!1,this.events=new Map,this.uploadEvents=new Map,this.requestId=et(),this.requestHeaders=new Headers,this.responseBuffer=new Uint8Array,this.request=Wt(e,{setProperty:([e,t],n)=>{switch(e){case`ontimeout`:{let r=e.slice(2);return this.request.addEventListener(r,t),n()}default:return n()}},methodCall:([e,t],n)=>{switch(e){case`open`:{let[e,r]=t;return r===void 0?(this.method=`GET`,this.url=tn(e)):(this.method=e,this.url=tn(r)),this.logger=this.logger.extend(`${this.method} ${this.url.href}`),this.logger.info(`open`,this.method,this.url.href),n()}case`addEventListener`:{let[e,r]=t;return this.registerEvent(e,r),this.logger.info(`addEventListener`,e,r),n()}case`setRequestHeader`:{let[e,r]=t;return this.requestHeaders.set(e,r),this.logger.info(`setRequestHeader`,e,r),n()}case`send`:{let[e]=t;this.request.addEventListener(`load`,()=>{if(this.onResponse!==void 0){let e=Jt(this.request,this.request.response);this.onResponse.call(this,{response:e,isMockedResponse:this[Zt],request:i,requestId:this.requestId})}});let r=typeof e==`string`?ge(e):e,i=this.toFetchApiRequest(r);this[$t]=i.clone(),queueMicrotask(()=>{(this.onRequest?.call(this,{request:i,requestId:this.requestId})||Promise.resolve()).finally(()=>{if(!this[Zt])return this.logger.info(`request callback settled but request has not been handled (readystate %d), performing as-is...`,this.request.readyState),Qt&&this.request.setRequestHeader(Ye,this.requestId),n()})});break}default:return n()}}}),nn(this.request,`upload`,Wt(this.request.upload,{setProperty:([e,t],n)=>{switch(e){case`onloadstart`:case`onprogress`:case`onaboart`:case`onerror`:case`onload`:case`ontimeout`:case`onloadend`:{let n=e.slice(2);this.registerUploadEvent(n,t)}}return n()},methodCall:([e,t],n)=>{switch(e){case`addEventListener`:{let[e,r]=t;return this.registerUploadEvent(e,r),this.logger.info(`upload.addEventListener`,e,r),n()}}}}))}registerEvent(e,t){let n=(this.events.get(e)||[]).concat(t);this.events.set(e,n),this.logger.info(`registered event "%s"`,e,t)}registerUploadEvent(e,t){let n=(this.uploadEvents.get(e)||[]).concat(t);this.uploadEvents.set(e,n),this.logger.info(`registered upload event "%s"`,e,t)}async respondWith(e){if(this[Zt]=!0,this[$t]){let e=await Xt(this[$t]);this.trigger(`loadstart`,this.request.upload,{loaded:0,total:e}),this.trigger(`progress`,this.request.upload,{loaded:e,total:e}),this.trigger(`load`,this.request.upload,{loaded:e,total:e}),this.trigger(`loadend`,this.request.upload,{loaded:e,total:e})}this.logger.info(`responding with a mocked response: %d %s`,e.status,e.statusText),nn(this.request,`status`,e.status),nn(this.request,`statusText`,e.statusText),nn(this.request,`responseURL`,this.url.href),this.request.getResponseHeader=new Proxy(this.request.getResponseHeader,{apply:(t,n,r)=>{if(this.logger.info(`getResponseHeader`,r[0]),this.request.readyState<this.request.HEADERS_RECEIVED)return this.logger.info(`headers not received yet, returning null`),null;let i=e.headers.get(r[0]);return this.logger.info(`resolved response header "%s" to`,r[0],i),i}}),this.request.getAllResponseHeaders=new Proxy(this.request.getAllResponseHeaders,{apply:()=>{if(this.logger.info(`getAllResponseHeaders`),this.request.readyState<this.request.HEADERS_RECEIVED)return this.logger.info(`headers not received yet, returning empty string`),``;let t=Array.from(e.headers.entries()).map(([e,t])=>`${e}: ${t}`).join(`\r
`);return this.logger.info(`resolved all response headers to`,t),t}}),Object.defineProperties(this.request,{response:{enumerable:!0,configurable:!1,get:()=>this.response},responseText:{enumerable:!0,configurable:!1,get:()=>this.responseText},responseXML:{enumerable:!0,configurable:!1,get:()=>this.responseXML}});let t=await Xt(e.clone());this.logger.info(`calculated response body length`,t),this.trigger(`loadstart`,this.request,{loaded:0,total:t}),this.setReadyState(this.request.HEADERS_RECEIVED),this.setReadyState(this.request.LOADING);let n=()=>{this.logger.info(`finalizing the mocked response...`),this.setReadyState(this.request.DONE),this.trigger(`load`,this.request,{loaded:this.responseBuffer.byteLength,total:t}),this.trigger(`loadend`,this.request,{loaded:this.responseBuffer.byteLength,total:t})};if(e.body){this.logger.info(`mocked response has body, streaming...`);let r=e.body.getReader(),i=async()=>{let{value:e,done:a}=await r.read();if(a){this.logger.info(`response body stream done!`),n();return}e&&(this.logger.info(`read response body chunk:`,e),this.responseBuffer=Rt(this.responseBuffer,e),this.trigger(`progress`,this.request,{loaded:this.responseBuffer.byteLength,total:t})),i()};i()}else n()}responseBufferToText(){return _e(this.responseBuffer)}get response(){if(this.logger.info(`getResponse (responseType: %s)`,this.request.responseType),this.request.readyState!==this.request.DONE)return null;switch(this.request.responseType){case`json`:{let e=qt(this.responseBufferToText());return this.logger.info(`resolved response JSON`,e),e}case`arraybuffer`:{let e=ve(this.responseBuffer);return this.logger.info(`resolved response ArrayBuffer`,e),e}case`blob`:{let e=this.request.getResponseHeader(`Content-Type`)||`text/plain`,t=new Blob([this.responseBufferToText()],{type:e});return this.logger.info(`resolved response Blob (mime type: %s)`,t,e),t}default:{let e=this.responseBufferToText();return this.logger.info(`resolving "%s" response type as text`,this.request.responseType,e),e}}}get responseText(){if(L(this.request.responseType===``||this.request.responseType===`text`,`InvalidStateError: The object is in invalid state.`),this.request.readyState!==this.request.LOADING&&this.request.readyState!==this.request.DONE)return``;let e=this.responseBufferToText();return this.logger.info(`getResponseText: "%s"`,e),e}get responseXML(){if(L(this.request.responseType===``||this.request.responseType===`document`,`InvalidStateError: The object is in invalid state.`),this.request.readyState!==this.request.DONE)return null;let e=this.request.getResponseHeader(`Content-Type`)||``;return typeof DOMParser>`u`?(console.warn(`Cannot retrieve XMLHttpRequest response body as XML: DOMParser is not defined. You are likely using an environment that is not browser or does not polyfill browser globals correctly.`),null):Kt(e)?new DOMParser().parseFromString(this.responseBufferToText(),e):null}errorWith(e){this[Zt]=!0,this.logger.info(`responding with an error`),this.setReadyState(this.request.DONE),this.trigger(`error`,this.request),this.trigger(`loadend`,this.request)}setReadyState(e){if(this.logger.info(`setReadyState: %d -> %d`,this.request.readyState,e),this.request.readyState===e){this.logger.info(`ready state identical, skipping transition...`);return}nn(this.request,`readyState`,e),this.logger.info(`set readyState to: %d`,e),e!==this.request.UNSENT&&(this.logger.info(`triggering "readystatechange" event...`),this.trigger(`readystatechange`,this.request))}trigger(e,t,n){let r=t[`on${e}`],i=Ht(t,e,n);this.logger.info(`trigger "%s"`,e,n||``),typeof r==`function`&&(this.logger.info(`found a direct "%s" callback, calling...`,e),r.call(t,i));let a=t instanceof XMLHttpRequestUpload?this.uploadEvents:this.events;for(let[n,r]of a)n===e&&(this.logger.info(`found %d listener(s) for "%s" event, calling...`,r.length,e),r.forEach(e=>e.call(t,i)))}toFetchApiRequest(e){this.logger.info(`converting request to a Fetch API Request...`);let t=e instanceof Document?e.documentElement.innerText:e,n=new Request(this.url.href,{method:this.method,headers:this.requestHeaders,credentials:this.request.withCredentials?`include`:`same-origin`,body:[`GET`,`HEAD`].includes(this.method.toUpperCase())?null:t});return nn(n,`headers`,Wt(n.headers,{methodCall:([e,t],r)=>{switch(e){case`append`:case`set`:{let[e,n]=t;this.request.setRequestHeader(e,n);break}case`delete`:{let[e]=t;console.warn(`XMLHttpRequest: Cannot remove a "${e}" header from the Fetch API representation of the "${n.method} ${n.url}" request. XMLHttpRequest headers cannot be removed.`);break}}return r()}})),mt(n,this.request),this.logger.info(`converted request to a Fetch API Request!`,n),n}};function tn(e){return typeof location>`u`?new URL(e):new URL(e.toString(),location.href)}function nn(e,t,n){Reflect.defineProperty(e,t,{writable:!0,enumerable:!0,value:n})}function rn({emitter:e,logger:t}){return new Proxy(globalThis.XMLHttpRequest,{construct(n,r,i){t.info(`constructed new XMLHttpRequest`);let a=Reflect.construct(n,r,i),o=Object.getOwnPropertyDescriptors(n.prototype);for(let e in o)Reflect.defineProperty(a,e,o[e]);let s=new en(a,t);return s.onRequest=async function({request:t,requestId:n}){let r=new ct(t,{passthrough:()=>{this.logger.info(`no mocked response received, performing request as-is...`)},respondWith:async e=>{if(St(e)){this.errorWith(TypeError(`Network error`));return}await this.respondWith(e)},errorWith:e=>{this.logger.info(`request errored!`,{error:e}),e instanceof Error&&this.errorWith(e)}});this.logger.info(`awaiting mocked response...`),this.logger.info(`emitting the "request" event for %s listener(s)...`,e.listenerCount(`request`)),await Tt({request:t,requestId:n,controller:r,emitter:e})},s.onResponse=async function({response:t,isMockedResponse:n,request:r,requestId:i}){this.logger.info(`emitting the "response" event for %s listener(s)...`,e.listenerCount(`response`)),e.emit(`response`,{response:t,isMockedResponse:n,request:r,requestId:i})},s.request}})}var an=class extends $e{constructor(){super(an.interceptorSymbol)}checkEnvironment(){return _t(`XMLHttpRequest`)}setup(){let e=this.logger.extend(`setup`);e.info(`patching "XMLHttpRequest" module...`);let t=globalThis.XMLHttpRequest;L(!t[rt],`Failed to patch the "XMLHttpRequest" module: already patched.`),globalThis.XMLHttpRequest=rn({emitter:this.emitter,logger:this.logger}),e.info(`native "XMLHttpRequest" module patched!`,globalThis.XMLHttpRequest.name),Object.defineProperty(globalThis.XMLHttpRequest,rt,{enumerable:!0,configurable:!0,value:!0}),this.subscriptions.push(()=>{Object.defineProperty(globalThis.XMLHttpRequest,rt,{value:void 0}),globalThis.XMLHttpRequest=t,e.info(`native "XMLHttpRequest" module restored!`,globalThis.XMLHttpRequest.name)})}},on=an;on.interceptorSymbol=Symbol(`xhr`);const sn=1e4;function cn(e){if(!e?.disableChrome)return;let t=`${ue()}/__inspector__/log`,n={log:console.log,warn:console.warn,error:console.error,info:console.info,debug:console.debug};[`log`,`warn`,`error`,`info`,`debug`].forEach(e=>{console[e]=(...r)=>{n[e].apply(console,r);let i=r.map(e=>{try{if(typeof e==`object`&&e){let t=new Set;return JSON.parse(JSON.stringify(e,(e,n)=>{if(typeof n==`object`&&n){if(t.has(n))return`[Circular]`;t.add(n)}return n}))}return e}catch{return String(e)}});fetch(t,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({type:`console`,data:{type:e,args:i}}),keepalive:!0}).catch(()=>{})}});let r=new ht({name:`dom-inspector-interceptor`,interceptors:[new Lt,new on]});r.apply(),r.on(`response`,async({request:e,response:n})=>{if(!(e.url.includes(`/__inspector__`)||e.url.includes(`/__mcp__`)||e.url.includes(`/api/acp/chat`)))try{let r={};e.headers.forEach((e,t)=>{r[t]=e});let i={};n.headers.forEach((e,t)=>{i[t]=e});let a=``;try{let t=new URL(e.url),n=Object.fromEntries(t.searchParams.entries());Object.keys(n).length>0&&(a=JSON.stringify(n,null,2))}catch{a=``}let o=``;try{let t=await e.clone().text();if(t){let n=e.headers.get(`content-type`)||``;if(n.includes(`application/json`))try{o=JSON.stringify(JSON.parse(t),null,2)}catch{o=t}else if(n.includes(`application/x-www-form-urlencoded`)){let e=Object.fromEntries(new URLSearchParams(t).entries());o=JSON.stringify(e,null,2)}else o=n.includes(`multipart/form-data`)?`<multipart/form-data>`:t;o.length>sn&&(o=o.substring(0,sn)+`
... (truncated)`)}}catch{o=``}let s=``;try{let e=n.clone(),t=n.headers.get(`content-type`)||``;if(t.includes(`application/json`)){let t=await e.json();s=JSON.stringify(t,null,2)}else s=t.includes(`text/`)?await e.text():`<Binary data, ${t}>`;s.length>sn&&(s=s.substring(0,sn)+`
... (truncated)`)}catch{s=`<Failed to read response body>`}let c=`Request:
  Method: ${e.method}
  URL: ${e.url}${a?`
  Query Parameters:
${a.split(`
`).map(e=>`    ${e}`).join(`
`)}`:``}
  Headers:
${Object.entries(r).map(([e,t])=>`    ${e}: ${t}`).join(`
`)}${o?`
  Body:
${o.split(`
`).map(e=>`    ${e}`).join(`
`)}`:``}

Response:
  Status: ${n.status} ${n.statusText}
  Headers:
${Object.entries(i).map(([e,t])=>`    ${e}: ${t}`).join(`
`)}
  Body:
${s}`;fetch(t,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({type:`network`,data:{method:e.method,url:e.url,status:n.status,duration:0,details:c}}),keepalive:!0}).catch(()=>{})}catch{fetch(t,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({type:`network`,data:{method:e.method,url:e.url,status:n.status,duration:0}}),keepalive:!0}).catch(()=>{})}})}var z=e(n());const ln=({message:e})=>(0,z.jsx)(`div`,{className:`fixed top-5 right-5 z-1000000 animate-in slide-in-from-right duration-300`,children:(0,z.jsx)(`div`,{className:`bg-background border border-border rounded-lg shadow-lg px-4 py-3 text-sm font-medium text-foreground backdrop-blur-sm`,children:e})}),un=i(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),dn=i(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),fn=i(`chevron-right`,[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]),pn=i(`chevron-up`,[[`path`,{d:`m18 15-6-6-6 6`,key:`153udz`}]]),mn=i(`circle-alert`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]]),hn=i(`code`,[[`path`,{d:`m16 18 6-6-6-6`,key:`eg8j8`}],[`path`,{d:`m8 6-6 6 6 6`,key:`ppft3o`}]]),gn=i(`copy`,[[`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`,key:`17jyea`}],[`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,key:`zix9uf`}]]),_n=i(`eye`,[[`path`,{d:`M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`,key:`1nclc0`}],[`circle`,{cx:`12`,cy:`12`,r:`3`,key:`1v7zrd`}]]),vn=i(`globe`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20`,key:`13o1zl`}],[`path`,{d:`M2 12h20`,key:`9i4pu4`}]]),yn=i(`info`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 16v-4`,key:`1dtifu`}],[`path`,{d:`M12 8h.01`,key:`e9boi3`}]]),bn=i(`loader`,[[`path`,{d:`M12 2v4`,key:`3427ic`}],[`path`,{d:`m16.2 7.8 2.9-2.9`,key:`r700ao`}],[`path`,{d:`M18 12h4`,key:`wj9ykh`}],[`path`,{d:`m16.2 16.2 2.9 2.9`,key:`1bxg5t`}],[`path`,{d:`M12 18v4`,key:`jadmvz`}],[`path`,{d:`m4.9 19.1 2.9-2.9`,key:`bwix9q`}],[`path`,{d:`M2 12h4`,key:`j09sii`}],[`path`,{d:`m4.9 4.9 2.9 2.9`,key:`giyufr`}]]),xn=i(`message-square`,[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}]]),Sn=i(`octagon-x`,[[`path`,{d:`m15 9-6 6`,key:`1uzhvr`}],[`path`,{d:`M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z`,key:`2d38gg`}],[`path`,{d:`m9 9 6 6`,key:`z0biqf`}]]),Cn=i(`pin`,[[`path`,{d:`M12 17v5`,key:`bb1du9`}],[`path`,{d:`M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z`,key:`1nkz8b`}]]),wn=i(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),Tn=i(`sparkles`,[[`path`,{d:`M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z`,key:`1s2grr`}],[`path`,{d:`M20 2v4`,key:`1rf3ol`}],[`path`,{d:`M22 4h-4`,key:`gwowj6`}],[`circle`,{cx:`4`,cy:`20`,r:`2`,key:`6kqj1y`}]]),En=i(`square`,[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,key:`afitv7`}]]),Dn=i(`triangle-alert`,[[`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,key:`wmoenq`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),On=i(`type`,[[`path`,{d:`M12 4v16`,key:`1654pz`}],[`path`,{d:`M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2`,key:`e0r10z`}],[`path`,{d:`M9 20h6`,key:`s66wpe`}]]),kn=({children:e,className:t,...n})=>(0,z.jsx)(`div`,{className:b(`text-muted-foreground text-sm`,t),...n,children:e}),An=({defaultOpen:e=!0,className:t,...n})=>(0,z.jsx)(c,{className:b(t),defaultOpen:e,...n}),jn=({children:e,className:t,title:n,...r})=>(0,z.jsx)(h,{asChild:!0,className:b(`group`,t),...r,children:e??(0,z.jsxs)(`div`,{className:`flex w-full cursor-pointer items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground`,children:[(0,z.jsx)(wn,{className:`size-4`}),(0,z.jsx)(`p`,{className:`text-sm`,children:n}),(0,z.jsx)(g,{className:`size-4 transition-transform group-data-[state=open]:rotate-180`})]})}),Mn=({children:e,className:t,...n})=>(0,z.jsx)(s,{className:b(`data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in`,t),...n,children:(0,z.jsx)(`div`,{className:`mt-4 space-y-2 border-muted border-l-2 pl-4`,children:e})}),Nn=e=>e===`completed`?(0,z.jsx)(T,{className:`size-4 text-green-500`}):e===`in-progress`?(0,z.jsx)(bn,{className:`size-4 text-blue-500 animate-spin`}):e===`failed`?(0,z.jsx)(mn,{className:`size-4 text-red-500`}):(0,z.jsx)(w,{className:`size-4 text-gray-400`}),Pn=e=>e===`completed`?`Completed`:e===`in-progress`?`In Progress`:e===`failed`?`Failed`:`Pending`;function Fn({plan:e}){let[t,n]=(0,I.useState)(!0);if(!e||!e.steps||e.steps.length===0)return null;let r=e.steps.filter(e=>e.status===`completed`).length,i=e.steps.length;return(0,z.jsx)(`div`,{className:`w-full space-y-2`,children:(0,z.jsxs)(An,{defaultOpen:t,children:[(0,z.jsx)(jn,{title:`Plan Progress: ${r}/${i} (${Math.round(r/i*100)}%)`,onClick:()=>n(!t)}),(0,z.jsx)(Mn,{children:(0,z.jsx)(`div`,{className:`space-y-3`,children:e.steps.map(e=>(0,z.jsx)(kn,{children:(0,z.jsxs)(`div`,{className:`flex items-start gap-3`,children:[Nn(e.status),(0,z.jsxs)(`div`,{className:`flex-1`,children:[(0,z.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,z.jsx)(`span`,{className:`font-medium text-foreground`,children:e.title}),(0,z.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:Pn(e.status)})]}),e.description&&(0,z.jsx)(`p`,{className:`mt-1 text-xs text-muted-foreground`,children:e.description})]})]})},e.id))})})]})})}function In(){let[e,t]=(0,I.useState)(null);return(0,I.useEffect)(()=>{function e(e){t(e.detail.plan)}return window.addEventListener(`plan-progress-reported`,e),()=>window.removeEventListener(`plan-progress-reported`,e)},[]),e}function Ln(e,t,n=!0){let[r,i]=(0,I.useState)({consoleMessages:[],networkRequests:[],stdioMessages:[],loading:!1,error:null}),a=(0,I.useCallback)(async()=>{if(n){if(!e||!t){i(e=>({...e,error:`MCP client not ready`}));return}i(e=>({...e,loading:!0,error:null}));try{let t=``,n=``,r=[];try{let r=await e.callTool({name:`chrome_devtools`,arguments:{useTool:`chrome_list_console_messages`,hasDefinitions:[`chrome_list_console_messages`],chrome_list_console_messages:{}}}),i=await e.callTool({name:`chrome_devtools`,arguments:{useTool:`chrome_list_network_requests`,hasDefinitions:[`chrome_list_network_requests`],chrome_list_network_requests:{}}});t=(r?.content)?.map(e=>e.text).join(`
`)||``,n=(i?.content)?.map(e=>e.text).join(`
`)||``}catch(r){try{let r=await e.getPrompt({name:`get_console_messages`}),i=await e.getPrompt({name:`get_network_requests`}),a=r.messages[0]?.content,o=i.messages[0]?.content,s=(a?.type===`text`?a.text:``)+`
`+(o?.type===`text`?o.text:``);t=s,n=s}catch(e){throw console.error(`[useContextData] Prompts fallback failed:`,e),r}}try{let e=typeof window<`u`?window.__DOM_INSPECTOR_CONFIG__:null,t=``;e&&(t=e.baseUrl||`http://${e.host}:${e.port}${e.base||`/`}`,t.endsWith(`/`)&&(t=t.slice(0,-1)));let n=await fetch(`${t}/__inspector__/stdio`);n.ok&&(r=(await n.json()).map(e=>({stdioid:e.id,stream:e.stream,data:e.data})).reverse())}catch(e){console.warn(`[useContextData] Failed to fetch stdio messages:`,e)}i({consoleMessages:Rn(t),networkRequests:zn(n),stdioMessages:r,loading:!1,error:null})}catch(e){console.error(`[useContextData] Failed to fetch context data:`,e),i(t=>({...t,loading:!1,error:e instanceof Error?e.message:String(e)}))}}},[e,t]);return{...r,refresh:a}}function Rn(e){if(!e)return[];let t=[],n=e.split(`
`);for(let e of n){let n=e.match(/msgid=(\d+)\s+\[([^\]]+)\]\s+(.+)/);if(n){let[,e,r,i]=n;t.push({msgid:parseInt(e),level:r,text:i})}}return t}function zn(e){if(!e)return[];let t=[],n=e.split(`
`);for(let e of n){let n=e.match(/reqid=(\d+)\s+(GET|POST|PUT|DELETE|PATCH)\s+([^\s]+)\s+\[([^\]]+)\]/);if(n){let[,e,r,i,a]=n;t.push({reqid:parseInt(e),method:r,url:i,status:Bn(a)})}}return t}function Bn(e){let t=e.match(/\b(\d{3})\b/);return t?t[1]:e}function Vn(){let[e,t]=(0,I.useState)(null);return(0,I.useEffect)(()=>{let e=()=>({url:window.location.href,title:document.title,viewport:{width:window.innerWidth,height:window.innerHeight},language:document.documentElement.lang||navigator.language});t(e());let n=()=>t(e());return window.addEventListener(`resize`,n),()=>{window.removeEventListener(`resize`,n)}},[]),e}const Hn=e=>{switch(e.toUpperCase()){case`GET`:return`bg-green-500/20 text-green-600`;case`POST`:return`bg-blue-500/20 text-blue-500`;case`PUT`:return`bg-yellow-500/20 text-yellow-600`;case`DELETE`:return`bg-red-500/20 text-red-500`;case`PATCH`:return`bg-purple-500/20 text-purple-500`;default:return`bg-muted text-muted-foreground`}},Un=e=>{let t=e.match(/\b(\d{3})\b/),n=t?parseInt(t[1]):0;return n>=200&&n<300?`text-green-600`:n>=300&&n<400?`text-yellow-600`:n>=400?`text-red-500`:e.includes(`success`)?`text-green-600`:e.includes(`failed`)?`text-red-500`:e.includes(`pending`)?`text-yellow-600`:`text-muted-foreground`},Wn=({request:e,client:t,isClientReady:n,mode:r=`view`,isSelected:i=!1,onSelectionChange:a,onDetailsFetched:o,cachedDetails:s})=>{let[c,l]=(0,I.useState)(!1),[u,d]=(0,I.useState)(s??null),[f,p]=(0,I.useState)(!1);(0,I.useEffect)(()=>{s&&!u&&d(s)},[s,u]);let m=async()=>{if(u===null){p(!0);try{let r=typeof window<`u`?window.__DOM_INSPECTOR_CONFIG__:null;if(r&&!r.disableChrome&&r.isAutomated&&t&&n)try{let n=((await t.callTool({name:`chrome_devtools`,arguments:{useTool:`chrome_get_network_request`,hasDefinitions:[`chrome_get_network_request`],chrome_get_network_request:{reqid:e.reqid}}}))?.content)?.map(e=>e.text).join(`
`)||`No details`;d(n),o?.(e.reqid,n);return}catch{console.log(`[NetworkRequestItem] Chrome DevTools failed, using local storage`)}let i=r?(()=>{let e=r.baseUrl||`http://${r.host}:${r.port}${r.base||`/`}`;return e.endsWith(`/`)?e.slice(0,-1):e})():``,a=await fetch(`${i}/__inspector__/request-details/${e.reqid}`);if(a.ok){let t=await a.text();d(t),o?.(e.reqid,t)}else throw Error(`Failed to fetch: ${a.status} ${a.statusText}`)}catch(e){d(`Failed to fetch details: ${e instanceof Error?e.message:String(e)}`)}finally{p(!1)}}},h=e=>{e.stopPropagation(),c||m(),l(!c)},_=()=>{r===`select`&&a&&(!i&&!u&&m(),a(e.reqid,!i))};return(0,z.jsxs)(`div`,{className:`rounded hover:bg-accent/50 transition-colors`,children:[(0,z.jsxs)(`div`,{className:b(`flex items-start gap-2 p-2 cursor-pointer`,c&&`border-b border-border/50`),onClick:r===`view`?h:_,children:[r===`select`&&(0,z.jsx)(`input`,{type:`checkbox`,checked:i,onChange:_,onClick:e=>e.stopPropagation(),className:`mt-0.5 rounded border-border`}),(0,z.jsx)(`button`,{type:`button`,onClick:h,className:`flex-shrink-0 text-muted-foreground hover:text-foreground`,children:f?(0,z.jsx)(ae,{className:`w-3.5 h-3.5 animate-spin`}):c?(0,z.jsx)(g,{className:`w-3.5 h-3.5`}):(0,z.jsx)(fn,{className:`w-3.5 h-3.5`})}),(0,z.jsx)(`span`,{className:b(`px-1.5 py-0.5 text-[10px] font-medium rounded flex-shrink-0`,Hn(e.method)),children:e.method}),(0,z.jsx)(`span`,{className:`text-xs text-foreground/90 flex-1 font-mono truncate`,title:e.url,children:e.url}),(0,z.jsx)(`span`,{className:b(`text-[10px] font-medium flex-shrink-0`,Un(e.status)),children:e.status})]}),c&&(0,z.jsx)(`div`,{className:`p-2 bg-accent/30`,children:f?(0,z.jsxs)(`div`,{className:`flex items-center gap-2 py-2 text-xs text-muted-foreground`,children:[(0,z.jsx)(ae,{className:`w-3.5 h-3.5 animate-spin`}),`Loading...`]}):u?(0,z.jsx)(`pre`,{className:`text-[10px] text-muted-foreground font-mono whitespace-pre-wrap break-all max-h-[150px] overflow-auto`,children:u}):null})]})};function Gn(e){let t=e;if(!t.parts||!Array.isArray(t.parts))return null;for(let e of t.parts){let t=e;if(typeof t.type==`string`&&t.type.startsWith(`tool-`)&&t.input&&typeof t.input.toolName==`string`&&t.input.toolName.includes(`context_selector`))return t.input.args}return null}const Kn={code:{text:`text-indigo-500 dark:text-indigo-400`,gradient:`from-indigo-500 to-violet-500`,badge:`bg-indigo-500`},styles:{text:`text-fuchsia-500 dark:text-fuchsia-400`,gradient:`from-fuchsia-500 to-pink-500`,badge:`bg-fuchsia-500`},page:{text:`text-cyan-500 dark:text-cyan-400`,gradient:`from-cyan-500 to-sky-500`,badge:`bg-cyan-500`},screenshot:{text:`text-amber-500 dark:text-amber-400`,gradient:`from-amber-500 to-orange-500`,badge:`bg-amber-500`},console:{text:`text-emerald-500 dark:text-emerald-400`,gradient:`from-emerald-500 to-teal-500`,badge:`bg-emerald-500`},network:{text:`text-blue-500 dark:text-blue-400`,gradient:`from-blue-500 to-cyan-500`,badge:`bg-blue-500`},stdio:{text:`text-violet-500 dark:text-violet-400`,gradient:`from-violet-500 to-purple-500`,badge:`bg-violet-500`}},qn=({tab:e,isActive:t,onClick:n})=>{let r=Kn[e.id];return(0,z.jsxs)(`button`,{type:`button`,onClick:n,className:b(`px-3 py-1.5 text-xs font-medium transition-colors relative whitespace-nowrap inline-flex items-center`,t?r.text:`text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50`),children:[e.label,e.totalCount!==void 0&&e.totalCount>0&&(0,z.jsxs)(`span`,{className:`ml-1 text-xs text-neutral-500 dark:text-neutral-400`,children:[`(`,e.totalCount,`)`]}),e.selectedCount!==void 0&&e.selectedCount>0&&(0,z.jsx)(`span`,{className:b(`ml-1.5 inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-medium text-white rounded-full`,r.badge),children:e.selectedCount}),t&&(0,z.jsx)(`div`,{className:b(`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r`,r.gradient)})]})},Jn=({client:e,isClientReady:t,sourceInfo:n,selectedContext:r,onSelectionChange:i,screenshot:a,onDataReady:s,userInput:c,selectedAgent:l=ee})=>{let[u,d]=(0,I.useState)(`code`),[f,m]=(0,I.useState)(``),[h,g]=(0,I.useState)(``),[_,x]=(0,I.useState)({}),[C,w]=(0,I.useState)(null),T=Vn(),{consoleMessages:E,networkRequests:D,stdioMessages:O,loading:k,error:A,refresh:j}=Ln(e,t,!0),M=f?E.filter(e=>e.text.toLowerCase().includes(f.toLowerCase())||e.level.toLowerCase().includes(f.toLowerCase())):E,N=h?D.filter(e=>e.url.toLowerCase().includes(h.toLowerCase())||e.method.toLowerCase().includes(h.toLowerCase())):D;(0,I.useEffect)(()=>{t&&j()},[t,j]),(0,I.useEffect)(()=>{s&&(E.length>0||D.length>0||O.length>0)&&s({consoleMessages:E,networkRequests:D,stdioMessages:O,networkDetails:_})},[E,D,O,_,s]);let P=(e,t)=>{x(n=>({...n,[e]:t}))},ne=(e,t)=>{let n=t?[...r.networkIds,e]:r.networkIds.filter(t=>t!==e);i({...r,networkIds:n})},re=(r.includeElement?1:0)+(r.includeStyles?1:0)+(r.includeScreenshot?1:0)+(r.includePageInfo?1:0)+r.consoleIds.length+r.networkIds.length+r.stdioIds.length+r.relatedElementIds.length,ie=()=>{i({...r,includeElement:!r.includeElement})},F=()=>{i({...r,includeStyles:!r.includeStyles})},oe=()=>{i({...r,includeScreenshot:!r.includeScreenshot})},ce=()=>{i({...r,includePageInfo:!r.includePageInfo})},le=e=>{let t=r.consoleIds.includes(e)?r.consoleIds.filter(t=>t!==e):[...r.consoleIds,e];i({...r,consoleIds:t})},de=e=>{let t=r.stdioIds.includes(e)?r.stdioIds.filter(t=>t!==e):[...r.stdioIds,e];i({...r,stdioIds:t})},pe=e=>{let t=r.relatedElementIds.includes(e)?r.relatedElementIds.filter(t=>t!==e):[...r.relatedElementIds,e];i({...r,relatedElementIds:t})},{messages:me,status:he,sendMessage:ge,setMessages:_e}=fe({transport:new y({api:`${ue()}/api/acp/chat`})}),ve=he===`submitted`||he===`streaming`;(0,I.useEffect)(()=>{if(he===`streaming`||he===`submitted`)return;let e=me[me.length-1];if(!e)return;let t=Gn(e);if(t)try{let e=t;if(typeof e==`string`)try{e=JSON.parse(e)}catch(e){console.error(`Failed to parse tool args JSON`,e)}let n=e;console.log(`[ContextPicker] Tool call detected:`,{args:n}),i(e=>({...e,consoleIds:n?.consoleIds||[],networkIds:n?.networkIds||[],stdioIds:n?.stdioIds||[],includeElement:n?.includeElement??!0,includeStyles:n?.includeStyles??!1,reasoning:n?.reasoning,elementNotes:e.elementNotes}))}catch(e){console.error(`Failed to process context inference args`,e)}},[me,he,i]);let ye=async()=>{if(!n||ve)return;_e([]);let e=(e,t)=>e.length>t?e.slice(0,t)+`...`:e,t=E.slice(-50).map(t=>`[${t.msgid}] ${t.level}: ${e(t.text,200)}`).join(`
`),r=D.slice(-50).map(e=>`[${e.reqid}] ${e.method} ${e.url} (${e.status})`).join(`
`),i=O.slice(-50).map(t=>`[${t.stdioid}] ${t.stream}: ${e(t.data,200)}`).join(`
`),a=`
I am inspecting the following element:
${c?`Context/Interests: ${c}`:``}
Tag: ${n.elementInfo?.tagName}
File: ${n.file}:${n.line}
Component: ${n.component}

Available Console Logs (Recent 50):
${t||`None`}

Available Network Requests (Recent 50):
${r||`None`}

Available Terminal Logs (Recent 50):
${i||`None`}

IMPORTANT: For this task, you MUST call the "context_selector" tool to return your selection. Do NOT use inspector tools like list_inspections, capture_element_context, capture_area_context, update_inspection_status, or execute_page_script - the context is already provided above. You may read files if needed to understand the context better. Even if you select nothing, still call context_selector with empty arrays. Do not reply with text only. Note: You can ignore logs from dom-inspector itself.
`,o=se.find(e=>e.name===l)||se[0];await ge({text:a},{body:{agent:o,envVars:{},inferContext:!0,isAutomated:!0}})},be=e=>{switch(e){case`error`:return`bg-red-500/20 text-red-500`;case`warn`:return`bg-yellow-500/20 text-yellow-600`;case`info`:return`bg-blue-500/20 text-blue-500`;case`debug`:return`bg-purple-500/20 text-purple-500`;default:return`bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400`}},xe=n?.elementInfo?.computedStyles?.typography,Se=[{id:`code`,label:`Code`,selectedCount:r.includeElement?1:0},{id:`styles`,label:`Styles`,selectedCount:r.includeStyles?1:0},{id:`page`,label:`Page`,selectedCount:r.includePageInfo?1:0},{id:`screenshot`,label:`Visual`,selectedCount:r.includeScreenshot?1:0},{id:`console`,label:`Console`,totalCount:E.length,selectedCount:r.consoleIds.length},{id:`network`,label:`Network`,totalCount:D.length,selectedCount:r.networkIds.length},{id:`stdio`,label:`Terminal`,totalCount:O.length,selectedCount:r.stdioIds.length}];return(0,z.jsxs)(`div`,{className:`border border-neutral-200 dark:border-neutral-700 rounded-md overflow-hidden`,children:[(0,z.jsxs)(`div`,{className:`w-full flex items-center justify-between px-3 py-2 text-sm bg-linear-to-r from-muted/50 via-muted/30 to-muted/50 border-b border-neutral-200 dark:border-neutral-700`,children:[(0,z.jsxs)(`div`,{className:`flex items-center gap-2 text-neutral-500 dark:text-neutral-400 font-medium`,children:[(0,z.jsx)(`span`,{children:`Context`}),re>0&&(0,z.jsx)(`span`,{className:`px-1.5 py-0.5 text-xs font-semibold text-white bg-linear-to-r from-indigo-500 to-fuchsia-500 rounded-full shadow-sm shadow-fuchsia-500/30`,children:re})]}),(0,z.jsxs)(`div`,{className:`flex items-center gap-1`,children:[(0,z.jsxs)(`button`,{type:`button`,onClick:e=>{e.stopPropagation(),ye()},disabled:k||ve,className:b(`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full text-white transition-all shadow-sm`,ve?`bg-linear-to-r from-violet-500 to-fuchsia-500 shadow-fuchsia-500/30`:`bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 shadow-fuchsia-500/30 hover:shadow-md hover:shadow-fuchsia-500/40 hover:scale-[1.03]`),title:`Let AI analyze logs and network to select relevant context`,children:[(0,z.jsx)(Tn,{className:b(`w-3.5 h-3.5`,ve&&`animate-pulse`)}),(0,z.jsx)(`span`,{children:ve?`Analyzing...`:`Smart Select`})]}),(0,z.jsx)(`button`,{type:`button`,onClick:e=>{e.stopPropagation(),j()},disabled:k,className:`p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors`,title:`Refresh`,children:(0,z.jsx)(p,{className:b(`w-3.5 h-3.5`,k&&`animate-spin`)})})]})]}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`div`,{className:`flex gap-1 border-b border-neutral-200 dark:border-neutral-700 px-2 pt-1`,children:Se.map(e=>(0,z.jsx)(qn,{tab:e,isActive:u===e.id,onClick:()=>d(e.id)},e.id))}),(0,z.jsxs)(`div`,{className:`max-h-50 overflow-auto relative ${ve?`min-h-37.5`:``}`,children:[ve&&(()=>{let e=me[me.length-1],t=e?.role===`assistant`?v(e):``,n=e?.role===`assistant`?o(e):null;return(0,z.jsxs)(`div`,{className:`absolute inset-0 z-10 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 min-h-[120px]`,children:[(0,z.jsx)(Tn,{className:`w-6 h-6 text-blue-500 animate-pulse mb-3`}),(0,z.jsx)(`span`,{className:`text-sm font-medium text-neutral-900 dark:text-neutral-50 text-center max-w-full truncate px-2`,children:n?`Running: ${te(n)}`:`Analyzing context...`}),t&&(0,z.jsx)(`p`,{className:`text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed text-center mt-2 line-clamp-2 max-w-[280px]`,children:t})]})})(),A&&(u===`console`||u===`network`)&&(0,z.jsx)(`div`,{className:`p-2 text-xs text-red-600 dark:text-red-400`,children:A}),r.reasoning&&!ve&&(0,z.jsx)(`div`,{className:`bg-blue-50/50 p-2 border-b border-neutral-200 dark:border-neutral-700`,children:(0,z.jsxs)(`div`,{className:`flex items-start gap-2`,children:[(0,z.jsx)(Tn,{className:`w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0`}),(0,z.jsx)(`p`,{className:`text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed italic`,children:r.reasoning})]})}),u===`code`&&(0,z.jsx)(`div`,{className:`p-2 space-y-1`,children:(()=>{let e=n?.relatedElements&&n.relatedElements.length>0?n.relatedElements:n?[n]:[],t=n?.relatedElements&&n.relatedElements.length>0,a=e.reduce((e,t,n)=>{let r=t.file||`unknown`;return e[r]||(e[r]=[]),e[r].push({el:t,idx:n}),e},{});return(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`flex items-center gap-1.5 px-2 mb-2`,children:[(0,z.jsx)(hn,{className:t?`w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400`:`w-4 h-4 text-blue-500`}),(0,z.jsx)(`div`,{className:`text-xs font-medium text-neutral-500 dark:text-neutral-400`,children:t?`Related Elements`:`Source Location`}),t&&(0,z.jsx)(`span`,{className:`ml-auto px-1.5 py-0.5 text-[10px] bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400 rounded-full`,children:e.length})]}),(0,z.jsx)(`div`,{className:`space-y-2 max-h-60 overflow-y-auto`,children:Object.entries(a).map(([e,n])=>(0,z.jsxs)(`div`,{className:`space-y-0.5`,children:[(0,z.jsxs)(`div`,{className:`px-2 py-1 text-[11px] font-medium text-neutral-500/70 dark:text-neutral-400/70 bg-neutral-100/60 dark:bg-neutral-800/60 rounded sticky top-0`,children:[e,` (`,n.length,`)`]}),n.map(({el:e,idx:n})=>(0,z.jsxs)(`div`,{className:`group relative`,children:[(0,z.jsxs)(`label`,{className:`flex items-start gap-2 pl-4 pr-8 py-1.5 rounded hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 cursor-pointer transition-colors relative`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:t?r.relatedElementIds.includes(n):r.includeElement,onChange:()=>t?pe(n):ie(),className:`mt-0.5 rounded border-neutral-200 dark:border-neutral-700`}),(0,z.jsxs)(`div`,{className:`flex-1 min-w-0 text-xs font-mono`,children:[(0,z.jsxs)(`div`,{className:`flex items-center gap-1.5`,children:[(0,z.jsx)(`span`,{className:`text-neutral-800 dark:text-neutral-200 font-medium`,children:e.component}),(0,z.jsx)(`span`,{className:`text-neutral-500/50 dark:text-neutral-400/50`,children:`•`}),(0,z.jsxs)(`span`,{className:`text-neutral-500 dark:text-neutral-400`,children:[e.line,`:`,e.column]})]}),e.elementInfo&&(0,z.jsxs)(`div`,{className:`text-[10px] text-neutral-500/60 dark:text-neutral-400/60 mt-0.5 space-x-2`,children:[typeof e.elementInfo.className==`string`&&e.elementInfo.className&&(0,z.jsxs)(`span`,{children:[`.`,e.elementInfo.className.split(` `)[0]]}),e.elementInfo.id&&(0,z.jsxs)(`span`,{children:[`#`,e.elementInfo.id]}),e.elementInfo.textContent&&(0,z.jsxs)(`span`,{className:`italic`,children:[`"`,e.elementInfo.textContent.trim().slice(0,20),e.elementInfo.textContent.length>20?`...`:``,`"`]})]}),r.elementNotes[n]&&(0,z.jsxs)(`div`,{className:`mt-1.5 text-[11px] text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-1.5 py-0.5 rounded border border-yellow-200 dark:border-yellow-900/40 flex items-start gap-1`,children:[(0,z.jsx)(xn,{className:`w-3 h-3 mt-0.5 flex-shrink-0`}),(0,z.jsx)(`span`,{className:`break-words`,children:r.elementNotes[n]})]})]})]}),(0,z.jsx)(`button`,{onClick:e=>{e.stopPropagation(),e.preventDefault(),w(n)},className:b(`absolute right-1 top-1.5 p-1 rounded transition-colors`,r.elementNotes[n]?`text-yellow-600 hover:bg-yellow-100 opacity-100`:`text-neutral-500/40 dark:text-neutral-400/40 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100`),title:`Add note to element`,children:(0,z.jsx)(xn,{className:`w-3.5 h-3.5`})}),C===n&&(0,z.jsx)(`div`,{className:`px-4 py-2 bg-neutral-100/60 dark:bg-neutral-800/60 border-t border-b border-neutral-200 dark:border-neutral-700`,children:(0,z.jsxs)(`div`,{className:`flex gap-2`,children:[(0,z.jsx)(`input`,{type:`text`,autoFocus:!0,placeholder:`Describe issue with this element...`,className:`flex-1 text-xs bg-white dark:bg-neutral-900 border border-input rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary`,defaultValue:r.elementNotes[n]||``,onKeyDown:e=>{if(e.key===`Enter`){e.preventDefault();let t=e.currentTarget.value.trim();i(e=>{let r={...e.elementNotes};return t?r[n]=t:delete r[n],{...e,elementNotes:r}}),w(null)}else e.key===`Escape`&&w(null)},onBlur:e=>{let t=e.currentTarget.value.trim();t!==(r.elementNotes[n]||``)&&i(e=>{let r={...e.elementNotes};return t?r[n]=t:delete r[n],{...e,elementNotes:r}}),w(null)}}),(0,z.jsx)(`button`,{onClick:()=>w(null),className:`text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50`,children:(0,z.jsx)(S,{className:`w-3.5 h-3.5`})})]})})]},n))]},e))})]})})()}),u===`styles`&&(0,z.jsx)(`div`,{className:`p-2 space-y-1`,children:(0,z.jsxs)(`label`,{className:`flex items-start gap-2 p-2 rounded hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 cursor-pointer transition-colors`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:r.includeStyles,onChange:F,className:`mt-0.5 rounded border-neutral-200 dark:border-neutral-700`}),(0,z.jsx)(On,{className:`w-4 h-4 text-purple-500 flex-shrink-0`}),(0,z.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[(0,z.jsx)(`div`,{className:`text-xs font-medium text-neutral-900 dark:text-neutral-50`,children:`Computed Styles`}),xe&&(0,z.jsxs)(`div`,{className:`text-xs text-neutral-500 dark:text-neutral-400 space-y-0.5 mt-1`,children:[(0,z.jsxs)(`div`,{className:`flex gap-2`,children:[(0,z.jsx)(`span`,{className:`text-neutral-500/70 dark:text-neutral-400/70`,children:`Font:`}),(0,z.jsx)(`span`,{className:`font-mono truncate`,children:xe.fontFamily})]}),(0,z.jsxs)(`div`,{className:`flex gap-2`,children:[(0,z.jsx)(`span`,{className:`text-neutral-500/70 dark:text-neutral-400/70`,children:`Size:`}),(0,z.jsx)(`span`,{className:`font-mono`,children:xe.fontSize}),(0,z.jsx)(`span`,{className:`text-neutral-500/70 dark:text-neutral-400/70 ml-2`,children:`Weight:`}),(0,z.jsx)(`span`,{className:`font-mono`,children:xe.fontWeight})]}),(0,z.jsxs)(`div`,{className:`flex gap-2`,children:[(0,z.jsx)(`span`,{className:`text-neutral-500/70 dark:text-neutral-400/70`,children:`Color:`}),(0,z.jsxs)(`span`,{className:`font-mono flex items-center gap-1`,children:[(0,z.jsx)(`span`,{className:`inline-block w-3 h-3 rounded border border-neutral-200 dark:border-neutral-700`,style:{backgroundColor:xe.color}}),xe.color]})]}),(0,z.jsxs)(`div`,{className:`flex gap-2`,children:[(0,z.jsx)(`span`,{className:`text-neutral-500/70 dark:text-neutral-400/70`,children:`Line Height:`}),(0,z.jsx)(`span`,{className:`font-mono`,children:xe.lineHeight})]})]}),!xe&&(0,z.jsx)(`div`,{className:`text-xs text-neutral-500/50 dark:text-neutral-400/50 italic`,children:`No style data available`})]})]})}),u===`screenshot`&&(0,z.jsx)(`div`,{className:`p-2 space-y-1`,children:a?(0,z.jsxs)(`label`,{className:`flex items-start gap-2 p-2 rounded hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 cursor-pointer transition-colors`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:r.includeScreenshot,onChange:oe,className:`mt-0.5 rounded border-neutral-200 dark:border-neutral-700`}),(0,z.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[(0,z.jsx)(`div`,{className:`text-xs font-medium text-neutral-900 dark:text-neutral-50 mb-1`,children:`Element Visual`}),(0,z.jsx)(`div`,{className:`text-[10px] text-neutral-500/70 dark:text-neutral-400/70 mb-2`,children:`Note: Copy & Go only copies text (IDEs don't support mixed text/image paste). To include the image, please right-click and copy it manually.`}),(0,z.jsx)(`div`,{className:`rounded border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-neutral-100/60 dark:bg-neutral-800/60`,children:(0,z.jsx)(`img`,{src:a,alt:`Element Visual`,className:`w-full h-auto max-h-[150px] object-contain`})})]})]}):(0,z.jsx)(`p`,{className:`text-xs text-neutral-500 dark:text-neutral-400 text-center py-4`,children:`No visual available`})}),u===`page`&&(0,z.jsx)(`div`,{className:`p-2 space-y-1`,children:T?(0,z.jsxs)(`label`,{className:`flex items-start gap-2 p-2 rounded hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 cursor-pointer transition-colors`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:r.includePageInfo,onChange:ce,className:`mt-0.5 rounded border-neutral-200 dark:border-neutral-700`}),(0,z.jsx)(vn,{className:`w-4 h-4 text-green-500 flex-shrink-0`}),(0,z.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[(0,z.jsx)(`div`,{className:`text-xs font-medium text-neutral-900 dark:text-neutral-50 mb-1`,children:`Page Information`}),(0,z.jsxs)(`div`,{className:`text-xs text-neutral-500 dark:text-neutral-400 space-y-1`,children:[(0,z.jsxs)(`div`,{className:`flex gap-2`,children:[(0,z.jsx)(`span`,{className:`text-neutral-500/70 dark:text-neutral-400/70`,children:`URL:`}),(0,z.jsx)(`span`,{className:`font-mono truncate`,children:T.url})]}),(0,z.jsxs)(`div`,{className:`flex gap-2`,children:[(0,z.jsx)(`span`,{className:`text-neutral-500/70 dark:text-neutral-400/70`,children:`Title:`}),(0,z.jsx)(`span`,{className:`truncate`,children:T.title})]}),(0,z.jsxs)(`div`,{className:`flex gap-2`,children:[(0,z.jsx)(`span`,{className:`text-neutral-500/70 dark:text-neutral-400/70`,children:`Viewport:`}),(0,z.jsxs)(`span`,{className:`font-mono`,children:[T.viewport.width,` × `,T.viewport.height]})]}),(0,z.jsxs)(`div`,{className:`flex gap-2`,children:[(0,z.jsx)(`span`,{className:`text-neutral-500/70 dark:text-neutral-400/70`,children:`Language:`}),(0,z.jsx)(`span`,{className:`font-mono`,children:T.language})]})]})]})]}):(0,z.jsx)(`p`,{className:`text-xs text-neutral-500 dark:text-neutral-400 text-center py-4`,children:`Loading page info...`})}),k&&u!==`code`&&u!==`styles`&&u!==`screenshot`&&u!==`page`&&(0,z.jsx)(`div`,{className:`flex items-center justify-center py-6`,children:(0,z.jsx)(ae,{className:`w-5 h-5 animate-spin text-neutral-500 dark:text-neutral-400`})}),!k&&u===`console`&&(0,z.jsxs)(`div`,{className:`p-2 space-y-1`,children:[(0,z.jsxs)(`div`,{className:`relative mb-2`,children:[(0,z.jsx)(wn,{className:`absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400`}),(0,z.jsx)(`input`,{type:`text`,value:f,onChange:e=>m(e.target.value),placeholder:`Filter logs...`,className:`w-full pl-7 pr-7 py-1.5 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-ring`}),f&&(0,z.jsx)(`button`,{type:`button`,onClick:()=>m(``),className:`absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50`,children:(0,z.jsx)(S,{className:`w-3.5 h-3.5`})})]}),M.length===0?(0,z.jsx)(`p`,{className:`text-xs text-neutral-500 dark:text-neutral-400 text-center py-4`,children:f?`No matching logs`:`No console logs`}):M.map(e=>(0,z.jsxs)(`label`,{className:`flex items-start gap-2 p-2 rounded hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 cursor-pointer transition-colors`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:r.consoleIds.includes(e.msgid),onChange:()=>le(e.msgid),className:`mt-0.5 rounded border-neutral-200 dark:border-neutral-700`}),(0,z.jsx)(`span`,{className:b(`px-1.5 py-0.5 text-[10px] font-medium rounded flex-shrink-0`,be(e.level)),children:e.level}),(0,z.jsx)(`span`,{className:`text-xs text-neutral-900 dark:text-neutral-100 flex-1 font-mono break-all line-clamp-2`,children:e.text})]},e.msgid))]}),!k&&u===`network`&&(0,z.jsxs)(`div`,{className:`p-2 space-y-1`,children:[(0,z.jsxs)(`div`,{className:`relative mb-2`,children:[(0,z.jsx)(wn,{className:`absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400`}),(0,z.jsx)(`input`,{type:`text`,value:h,onChange:e=>g(e.target.value),placeholder:`Filter requests...`,className:`w-full pl-7 pr-7 py-1.5 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-ring`}),h&&(0,z.jsx)(`button`,{type:`button`,onClick:()=>g(``),className:`absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50`,children:(0,z.jsx)(S,{className:`w-3.5 h-3.5`})})]}),N.length===0?(0,z.jsx)(`p`,{className:`text-xs text-neutral-500 dark:text-neutral-400 text-center py-4`,children:h?`No matching requests`:`No network requests`}):N.map(n=>(0,z.jsx)(Wn,{request:n,client:e,isClientReady:t,mode:`select`,isSelected:r.networkIds.includes(n.reqid),onSelectionChange:ne,onDetailsFetched:P,cachedDetails:_[n.reqid]},n.reqid))]}),!k&&u===`stdio`&&(0,z.jsx)(`div`,{className:`p-2 space-y-1`,children:O.length===0?(0,z.jsx)(`p`,{className:`text-xs text-neutral-500 dark:text-neutral-400 text-center py-4`,children:`No terminal logs`}):O.map(e=>(0,z.jsxs)(`label`,{className:`flex items-start gap-2 p-2 rounded hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 cursor-pointer transition-colors`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:r.stdioIds.includes(e.stdioid),onChange:()=>de(e.stdioid),className:`mt-0.5 rounded border-neutral-200 dark:border-neutral-700`}),(0,z.jsx)(`span`,{className:b(`px-1.5 py-0.5 text-[10px] font-medium rounded flex-shrink-0 border`,e.stream===`stderr`?`bg-red-500/10 text-red-500 border-red-500/20`:`bg-zinc-500/10 text-zinc-500 border-zinc-500/20`),children:e.stream}),(0,z.jsx)(`span`,{className:`text-xs text-neutral-900 dark:text-neutral-100 flex-1 font-mono break-all whitespace-pre-wrap`,children:e.data})]},e.stdioid))})]})]})]})},Yn=({sourceInfo:e,screenshot:t=``,onClose:n,mode:r,onSubmit:i,resultMessage:o,client:s=null,isClientReady:c=!1,selectedAgent:u})=>{let f=In(),[p,h]=(0,I.useState)(``),[g,v]=(0,I.useState)(!0),y=Vn(),[b,S]=(0,I.useState)(()=>{let t=e?.relatedElements?.length||0;return{includeElement:!0,includeStyles:!0,includeScreenshot:t>0,includePageInfo:!0,consoleIds:[],networkIds:[],stdioIds:[],relatedElementIds:t>0?Array.from({length:t},(e,t)=>t):[],elementNotes:e.relatedElements?.reduce((e,t,n)=>(t.note&&(e[n]=t.note),e),{})||{}}}),[w,E]=(0,I.useState)({consoleMessages:[],networkRequests:[],stdioMessages:[],networkDetails:{}}),D=(0,I.useMemo)(()=>b.includeElement||b.includeStyles||b.consoleIds.length>0||b.networkIds.length>0||b.stdioIds.length>0,[b]),O=e=>{E(e)};(0,I.useEffect)(()=>{g||n()},[g,n]);let k=e=>{if(e.key===`Enter`&&i){e.preventDefault(),e.currentTarget.blur();let t=D?A():void 0;i(p,e.shiftKey,t)}},A=()=>{let e=w.consoleMessages.filter(e=>b.consoleIds.includes(e.msgid)),n=w.stdioMessages.filter(e=>b.stdioIds.includes(e.stdioid)),r=w.networkRequests.filter(e=>b.networkIds.includes(e.reqid)).map(e=>({...e,details:w.networkDetails[e.reqid]||null}));return{...b,consoleMessages:e,networkRequests:r,stdioMessages:n,screenshot:b.includeScreenshot?t:void 0}},j=async()=>{let t=A(),n=F({sourceInfo:t.includeElement||t.includeStyles?e:void 0,includeElement:t.includeElement,includeStyles:t.includeStyles,includePageInfo:t.includePageInfo,pageInfo:t.includePageInfo&&y?y:void 0,feedback:p||void 0,consoleMessages:t.consoleMessages.length>0?t.consoleMessages:void 0,networkRequests:t.networkRequests.length>0?t.networkRequests:void 0,stdioMessages:t.stdioMessages?.length?t.stdioMessages:void 0,relatedElements:e?.relatedElements,relatedElementIds:t.relatedElementIds,elementNotes:t.elementNotes});try{if(t.screenshot&&t.includeScreenshot){if(!(t.screenshot?.startsWith(`data:image/`)??!1)){console.warn(`Invalid screenshot data URL, skipping image in clipboard`),await navigator.clipboard.writeText(n),v(!1);return}let e=`<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
<img src="${t.screenshot}" alt="Element Screenshot" style="max-width: min(100%, 37.5rem); display: block; margin-bottom: 1rem; border-radius: 0.5rem; box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.1);">
<pre style="font-family: 'SF Mono', Monaco, 'Courier New', monospace; font-size: 0.75rem; white-space: pre-wrap; background: #f6f8fa; padding: 1rem; border-radius: 0.375rem; border: 1px solid #e1e4e8; overflow-x: auto;">${n.replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}</pre>
</div>`;await navigator.clipboard.write([new ClipboardItem({"text/html":new Blob([e],{type:`text/html`}),"text/plain":new Blob([n],{type:`text/plain`})})])}else await navigator.clipboard.writeText(n);v(!1)}catch(e){console.warn(`Clipboard copy failed, falling back to text-only:`,e);try{await navigator.clipboard.writeText(n);let e=new CustomEvent(`inspector-notification`,{detail:{message:`⚠️ Screenshot not copied - only text was copied to clipboard`}});window.dispatchEvent(e),v(!1)}catch{console.error(`Failed to copy to clipboard`)}}},M=e=>{i&&i(p,e,D?A():void 0)},ee=f?.steps.every(e=>e.status===`completed`);return(0,z.jsx)(m,{open:g,onOpenChange:v,children:(0,z.jsxs)(_,{onClose:()=>v(!1),className:`max-w-2xl`,children:[(0,z.jsxs)(x,{children:[(0,z.jsxs)(d,{className:`flex items-center gap-2`,children:[r===`success`||r===`loading`&&ee?(0,z.jsx)(T,{className:`h-5 w-5 text-green-600 dark:text-green-500`}):r===`error`?(0,z.jsx)(C,{className:`h-5 w-5 text-red-600 dark:text-red-500`}):r===`loading`?(0,z.jsx)(ae,{className:`h-5 w-5 animate-spin text-blue-600 dark:text-blue-500`}):(0,z.jsx)(`span`,{className:`flex items-center justify-center h-6 w-6 rounded-full bg-linear-to-br from-violet-600 via-fuchsia-500 to-pink-500 shadow-sm shadow-fuchsia-500/40`,children:(0,z.jsx)(Tn,{className:`h-3 w-3 text-white`})}),r===`success`?`Success`:r===`error`?`Error`:r===`loading`&&ee?`Success`:r===`loading`?`Processing...`:`Tell the AI`]}),(0,z.jsx)(me,{className:`text-xs text-muted-foreground`,children:r===`input`?`Describe what you want to fix or improve, then add context below`:(0,z.jsxs)(`span`,{className:`font-mono`,children:[e.component,` • `,e.file,`:`,e.line,`:`,e.column]})})]}),r===`input`&&(0,z.jsxs)(`div`,{className:`py-5 space-y-5`,children:[(0,z.jsx)(`textarea`,{autoFocus:!0,value:p,onChange:e=>h(e.target.value),onKeyDown:k,placeholder:`What should the AI do with this?`,className:`w-full min-h-[120px] px-4 py-3 rounded-lg border border-input bg-background text-sm resize-y transition-shadow focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 focus:border-fuchsia-500/60`}),(0,z.jsx)(`div`,{className:`border-t border-border`}),(0,z.jsx)(Jn,{client:s,isClientReady:c,sourceInfo:e,selectedContext:b,onSelectionChange:S,screenshot:t,onDataReady:O,isAutomated:!!e.automated,userInput:p,selectedAgent:u})]}),r===`loading`&&f&&(0,z.jsx)(`div`,{className:`space-y-4`,children:(0,z.jsx)(Fn,{plan:f})}),(r===`success`||r===`error`)&&(0,z.jsxs)(`div`,{className:`space-y-4`,children:[(0,z.jsx)(`p`,{className:`text-sm text-foreground`,children:o}),f&&(0,z.jsx)(Fn,{plan:f})]}),(0,z.jsx)(a,{className:`flex items-center gap-3 pt-2`,children:r===`input`?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(l,{variant:`ghost`,size:`sm`,onClick:j,className:`mr-auto text-fuchsia-600 hover:text-fuchsia-700 hover:bg-fuchsia-500/10 dark:text-fuchsia-400 dark:hover:text-fuchsia-300`,children:[(0,z.jsx)(gn,{className:`w-4 h-4 mr-1.5`}),`Copy & Go`]}),(0,z.jsxs)(`div`,{className:`flex gap-2`,children:[(0,z.jsx)(l,{variant:`outline`,onClick:()=>M(!0),className:`border-fuchsia-500/30 text-fuchsia-600 hover:bg-fuchsia-500/10 hover:text-fuchsia-700 dark:text-fuchsia-400`,children:`Submit & Continue`}),(0,z.jsx)(l,{onClick:()=>M(!1),className:`bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-sm shadow-fuchsia-500/30 hover:shadow-md hover:shadow-fuchsia-500/40 hover:scale-[1.02] transition-all`,children:`Submit`})]})]}):(0,z.jsx)(l,{onClick:()=>v(!1),className:`w-full bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-sm shadow-fuchsia-500/30`,children:`Close`})})]})})},Xn=(e=2500)=>{let[t,n]=(0,I.useState)(null);return{notification:t,showNotif:(0,I.useCallback)(t=>{n(t),setTimeout(()=>{n(null)},e)},[e])}};function Zn(e){let t=[],n=e;for(;n&&n.nodeType===Node.ELEMENT_NODE;){let e=n.tagName.toLowerCase();if(n.id){e+=`#${n.id}`,t.unshift(e);break}else if(n.className&&typeof n.className==`string`){let t=n.className.trim().split(/\s+/).slice(0,2);t.length>0&&t[0]&&(e+=`.${t.join(`.`)}`)}if(t.unshift(e),n=n.parentElement,t.length>=10)break}return t.join(` > `)}function Qn(e){let t=window.getComputedStyle(e),n=e.getBoundingClientRect(),r={display:t.display,position:t.position,width:t.width,height:t.height,backgroundColor:t.backgroundColor,color:t.color,fontSize:t.fontSize,padding:t.padding,margin:t.margin,border:t.border};return{tagName:e.tagName.toLowerCase(),textContent:e.textContent?.trim().slice(0,100)||``,className:e.className||``,id:e.id||``,attributes:Array.from(e.attributes).reduce((e,t)=>(!t.name.startsWith(`data-`)&&t.name!==`class`&&t.name!==`id`&&(e[t.name]=t.value),e),{}),styles:r,domPath:Zn(e),boundingBox:{top:n.top,left:n.left,width:n.width,height:n.height,right:n.right,bottom:n.bottom,x:n.x,y:n.y},computedStyles:{layout:{display:t.display,position:t.position,width:t.width,height:t.height,overflow:t.overflow,overflowX:t.overflowX,overflowY:t.overflowY,float:t.float,clear:t.clear,zIndex:t.zIndex},typography:{fontFamily:t.fontFamily,fontSize:t.fontSize,fontWeight:t.fontWeight,fontStyle:t.fontStyle,lineHeight:t.lineHeight,textAlign:t.textAlign,textDecoration:t.textDecoration,textTransform:t.textTransform,letterSpacing:t.letterSpacing,wordSpacing:t.wordSpacing,color:t.color},spacing:{padding:t.padding,paddingTop:t.paddingTop,paddingRight:t.paddingRight,paddingBottom:t.paddingBottom,paddingLeft:t.paddingLeft,margin:t.margin,marginTop:t.marginTop,marginRight:t.marginRight,marginBottom:t.marginBottom,marginLeft:t.marginLeft},background:{backgroundColor:t.backgroundColor,backgroundImage:t.backgroundImage,backgroundSize:t.backgroundSize,backgroundPosition:t.backgroundPosition,backgroundRepeat:t.backgroundRepeat},border:{border:t.border,borderTop:t.borderTop,borderRight:t.borderRight,borderBottom:t.borderBottom,borderLeft:t.borderLeft,borderRadius:t.borderRadius,borderColor:t.borderColor,borderWidth:t.borderWidth,borderStyle:t.borderStyle},effects:{opacity:t.opacity,visibility:t.visibility,boxShadow:t.boxShadow,textShadow:t.textShadow,filter:t.filter,transform:t.transform,transition:t.transition,animation:t.animation},flexbox:{flexDirection:t.flexDirection,flexWrap:t.flexWrap,justifyContent:t.justifyContent,alignItems:t.alignItems,alignContent:t.alignContent,flex:t.flex,flexGrow:t.flexGrow,flexShrink:t.flexShrink,flexBasis:t.flexBasis,order:t.order},grid:{gridTemplateColumns:t.gridTemplateColumns,gridTemplateRows:t.gridTemplateRows,gridTemplateAreas:t.gridTemplateAreas,gridGap:t.gap,gridColumnGap:t.columnGap,gridRowGap:t.rowGap,gridAutoFlow:t.gridAutoFlow,gridAutoColumns:t.gridAutoColumns,gridAutoRows:t.gridAutoRows}}}}const $n=e=>{let t=e,n=0;for(;t&&n<20;){let r=t.getAttribute(`data-source`),i=t.getAttribute(`data-insp-path`);if(i){let t=i.split(`:`);if(t.length>=4){let n=t.pop()||``,r=t.pop()||`0`,i=t.pop()||`0`;return{file:t.join(`:`),component:n||e.tagName.toLowerCase(),apis:[],line:parseInt(i,10),column:parseInt(r,10),element:e,elementInfo:Qn(e)}}}if(r){let t=r.split(`:`);if(t.length>=3){let n=t.pop()||`0`,r=t.pop()||`0`;return{file:t.join(`:`),component:e.tagName.toLowerCase(),apis:[],line:parseInt(r,10),column:parseInt(n,10),element:e,elementInfo:Qn(e)}}}t=t.parentElement,n++}for(t=e,n=0;t&&n<20;){let r=Object.keys(t).find(e=>e.startsWith(`__reactInternalInstance`)||e.startsWith(`__reactFiber`)||e.startsWith(`__react`));if(r){let n=t[r];for(;n;){if(n.type&&typeof n.type==`function`){let t=n.type.name||n.type.displayName||`Anonymous`;if(t&&t!==`Anonymous`&&t!==``){let n=window.__SOURCE_INSPECTOR__&&window.__SOURCE_INSPECTOR__[t];return n?{...n,element:e,elementInfo:Qn(e)}:{file:`unknown`,component:t,apis:[],line:0,column:0,element:e,elementInfo:Qn(e)}}}n=n._owner||n.return}}t=t.parentElement,n++}return{file:`unknown`,component:e.tagName.toLowerCase(),apis:[],line:0,column:0,element:e,elementInfo:Qn(e)}},er={on:function(e,t,n){return e.split(` `).forEach(e=>this.addEventListener(e,t,n)),this},off:function(e,t,n){return e.split(` `).forEach(e=>this.removeEventListener(e,t,n)),this},attr:function(e,t){return t===void 0?this.getAttribute(e):(t==null?this.removeAttribute(e):this.setAttribute(e,t),this)}};function B(e,t=document){let n=e instanceof NodeList||Array.isArray(e)?e:e instanceof HTMLElement||e instanceof SVGElement?[e]:t.querySelectorAll(e);return n.length||(n=[]),Object.assign(Array.from(n).map(e=>Object.assign(e,er)),{on:function(e,t,n){return this.forEach(r=>r.on(e,t,n)),this},off:function(e,t,n){return this.forEach(r=>r.off(e,t,n)),this},attr:function(e,t){return typeof e==`string`&&t===void 0?this[0].attr(e):(typeof e==`object`?this.forEach(t=>Object.entries(e).forEach(([e,n])=>t.attr(e,n))):typeof e==`string`&&this.forEach(n=>n.attr(e,t)),this)}})}const tr=typeof navigator<`u`?navigator.userAgent.toLowerCase().indexOf(`firefox`)>0:!1;function nr(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r):e.attachEvent&&e.attachEvent(`on${t}`,n)}function rr(e,t,n,r){e.removeEventListener?e.removeEventListener(t,n,r):e.detachEvent&&e.detachEvent(`on${t}`,n)}function ir(e,t){let n=t.slice(0,t.length-1);for(let t=0;t<n.length;t++)n[t]=e[n[t].toLowerCase()];return n}function ar(e){typeof e!=`string`&&(e=``),e=e.replace(/\s/g,``);let t=e.split(`,`),n=t.lastIndexOf(``);for(;n>=0;)t[n-1]+=`,`,t.splice(n,1),n=t.lastIndexOf(``);return t}function or(e,t){let n=e.length>=t.length?e:t,r=e.length>=t.length?t:e,i=!0;for(let e=0;e<n.length;e++)r.indexOf(n[e])===-1&&(i=!1);return i}const sr={backspace:8,"⌫":8,tab:9,clear:12,enter:13,"↩":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"⇪":20,",":188,".":190,"/":191,"`":192,"-":tr?173:189,"=":tr?61:187,";":tr?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},cr={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,meta:91,command:91},lr={16:`shiftKey`,18:`altKey`,17:`ctrlKey`,91:`metaKey`,shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},ur={16:!1,18:!1,17:!1,91:!1},V={};for(let e=1;e<20;e++)sr[`f${e}`]=111+e;let H=[],dr=null,fr=`all`;const pr=new Map,mr=e=>sr[e.toLowerCase()]||cr[e.toLowerCase()]||e.toUpperCase().charCodeAt(0),hr=e=>Object.keys(sr).find(t=>sr[t]===e),gr=e=>Object.keys(cr).find(t=>cr[t]===e);function _r(e){fr=e||`all`}function vr(){return fr||`all`}function yr(){return H.slice(0)}function br(){return H.map(e=>hr(e)||gr(e)||String.fromCharCode(e))}function xr(){let e=[];return Object.keys(V).forEach(t=>{V[t].forEach(t=>{let{key:n,scope:r,mods:i,shortcut:a}=t;e.push({scope:r,shortcut:a,mods:i,keys:n.split(`+`).map(e=>mr(e))})})}),e}function Sr(e){let t=e.target||e.srcElement,{tagName:n}=t,r=!0,i=n===`INPUT`&&![`checkbox`,`radio`,`range`,`button`,`file`,`reset`,`submit`,`color`].includes(t.type);return(t.isContentEditable||(i||n===`TEXTAREA`||n===`SELECT`)&&!t.readOnly)&&(r=!1),r}function Cr(e){return typeof e==`string`&&(e=mr(e)),H.indexOf(e)!==-1}function wr(e,t){let n,r;for(let t in e||=vr(),V)if(Object.prototype.hasOwnProperty.call(V,t))for(n=V[t],r=0;r<n.length;)n[r].scope===e?n.splice(r,1).forEach(e=>{let{element:t}=e;return jr(t)}):r++;vr()===e&&_r(t||`all`)}function Tr(e){let t=e.keyCode||e.which||e.charCode;e.key&&e.key.toLowerCase()===`capslock`&&(t=mr(e.key));let n=H.indexOf(t);if(n>=0&&H.splice(n,1),e.key&&e.key.toLowerCase()===`meta`&&H.splice(0,H.length),(t===93||t===224)&&(t=91),t in ur)for(let e in ur[t]=!1,cr)cr[e]===t&&(U[e]=!1)}function Er(e){if(e===void 0)Object.keys(V).forEach(e=>{Array.isArray(V[e])&&V[e].forEach(e=>Dr(e)),delete V[e]}),jr(null);else if(Array.isArray(e))e.forEach(e=>{e.key&&Dr(e)});else if(typeof e==`object`)e.key&&Dr(e);else if(typeof e==`string`){let[t,n]=[...arguments].slice(1);typeof t==`function`&&(n=t,t=``),Dr({key:e,scope:t,method:n,splitKey:`+`})}}const Dr=e=>{let{key:t,scope:n,method:r,splitKey:i=`+`}=e;ar(t).forEach(e=>{let t=e.split(i),a=t.length,o=t[a-1],s=o===`*`?`*`:mr(o);if(!V[s])return;n||=vr();let c=a>1?ir(cr,t):[],l=[];V[s]=V[s].filter(e=>{let t=(r?e.method===r:!0)&&e.scope===n&&or(e.mods,c);return t&&l.push(e.element),!t}),l.forEach(e=>jr(e))})};function Or(e,t,n,r){if(t.element!==r)return;let i;if(t.scope===n||t.scope===`all`){for(let e in i=t.mods.length>0,ur)Object.prototype.hasOwnProperty.call(ur,e)&&(!ur[e]&&t.mods.indexOf(+e)>-1||ur[e]&&t.mods.indexOf(+e)===-1)&&(i=!1);(t.mods.length===0&&!ur[16]&&!ur[18]&&!ur[17]&&!ur[91]||i||t.shortcut===`*`)&&(t.keys=[],t.keys=t.keys.concat(H),t.method(e,t)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&=!0))}}function kr(e,t){let n=V[`*`],r=e.keyCode||e.which||e.charCode;if(e.key&&e.key.toLowerCase()===`capslock`||!U.filter.call(this,e))return;if((r===93||r===224)&&(r=91),H.indexOf(r)===-1&&r!==229&&H.push(r),[`metaKey`,`ctrlKey`,`altKey`,`shiftKey`].forEach(t=>{let n=lr[t];e[t]&&H.indexOf(n)===-1?H.push(n):!e[t]&&H.indexOf(n)>-1?H.splice(H.indexOf(n),1):t===`metaKey`&&e[t]&&(H=H.filter(e=>e in lr||e===r))}),r in ur){for(let t in ur[r]=!0,cr)Object.prototype.hasOwnProperty.call(cr,t)&&(U[t]=e[lr[cr[t]]]);if(!n)return}for(let t in ur)Object.prototype.hasOwnProperty.call(ur,t)&&(ur[t]=e[lr[t]]);e.getModifierState&&!(e.altKey&&!e.ctrlKey)&&e.getModifierState(`AltGraph`)&&(H.indexOf(17)===-1&&H.push(17),H.indexOf(18)===-1&&H.push(18),ur[17]=!0,ur[18]=!0);let i=vr();if(n)for(let r=0;r<n.length;r++)n[r].scope===i&&(e.type===`keydown`&&n[r].keydown||e.type===`keyup`&&n[r].keyup)&&Or(e,n[r],i,t);if(!(r in V))return;let a=V[r],o=a.length;for(let n=0;n<o;n++)if((e.type===`keydown`&&a[n].keydown||e.type===`keyup`&&a[n].keyup)&&a[n].key){let r=a[n],{splitKey:o}=r,s=r.key.split(o),c=[];for(let e=0;e<s.length;e++)c.push(mr(s[e]));c.sort().join(``)===H.sort().join(``)&&Or(e,r,i,t)}}function U(e,t,n){H=[];let r=ar(e),i=[],a=`all`,o=document,s=0,c=!1,l=!0,u=`+`,d=!1,f=!1;for(n===void 0&&typeof t==`function`&&(n=t),Object.prototype.toString.call(t)===`[object Object]`&&(t.scope&&(a=t.scope),t.element&&(o=t.element),t.keyup&&(c=t.keyup),t.keydown!==void 0&&(l=t.keydown),t.capture!==void 0&&(d=t.capture),typeof t.splitKey==`string`&&(u=t.splitKey),t.single===!0&&(f=!0)),typeof t==`string`&&(a=t),f&&Er(e,a);s<r.length;s++)e=r[s].split(u),i=[],e.length>1&&(i=ir(cr,e)),e=e[e.length-1],e=e===`*`?`*`:mr(e),e in V||(V[e]=[]),V[e].push({keyup:c,keydown:l,scope:a,mods:i,shortcut:r[s],method:n,key:r[s],splitKey:u,element:o});if(o!==void 0&&window){if(!pr.has(o)){let e=function(){return kr(arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.event,o)},t=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.event;kr(e,o),Tr(e)};pr.set(o,{keydownListener:e,keyupListenr:t,capture:d}),nr(o,`keydown`,e,d),nr(o,`keyup`,t,d)}if(!dr){let e=()=>{H=[]};dr={listener:e,capture:d},nr(window,`focus`,e,d)}}}function Ar(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:`all`;Object.keys(V).forEach(n=>{V[n].filter(n=>n.scope===t&&n.shortcut===e).forEach(e=>{e&&e.method&&e.method()})})}function jr(e){let t=Object.values(V).flat();if(t.findIndex(t=>{let{element:n}=t;return n===e})<0){let{keydownListener:t,keyupListenr:n,capture:r}=pr.get(e)||{};t&&n&&(rr(e,`keyup`,n,r),rr(e,`keydown`,t,r),pr.delete(e))}if((t.length<=0||pr.size<=0)&&(Object.keys(pr).forEach(e=>{let{keydownListener:t,keyupListenr:n,capture:r}=pr.get(e)||{};t&&n&&(rr(e,`keyup`,n,r),rr(e,`keydown`,t,r),pr.delete(e))}),pr.clear(),Object.keys(V).forEach(e=>delete V[e]),dr)){let{listener:e,capture:t}=dr;rr(window,`focus`,e,t),dr=null}}const Mr={getPressedKeyString:br,setScope:_r,getScope:vr,deleteScope:wr,getPressedKeyCodes:yr,getAllKeyCodes:xr,isPressed:Cr,filter:Sr,trigger:Ar,unbind:Er,keyMap:sr,modifier:cr,modifierMap:lr};for(let e in Mr)Object.prototype.hasOwnProperty.call(Mr,e)&&(U[e]=Mr[e]);if(typeof window<`u`){let e=window.hotkeys;U.noConflict=t=>(t&&window.hotkeys===U&&(window.hotkeys=e),U),window.hotkeys=U}(function(){if(typeof document>`u`||`adoptedStyleSheets`in document)return;function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}var n=`ShadyCSS`in window&&!window.ShadyCSS.nativeShadow,r=[],i=[],a=[],o=new WeakMap,s=new WeakMap,c=new WeakMap,l=new WeakMap,u=new WeakMap,d=new WeakMap,f={loaded:!1},p={body:null,CSSStyleSheet:null},m=CSSStyleSheet,h=/@import/;function g(e,t){var n=t===document?`Document`:`ShadowRoot`;if(!Array.isArray(e))throw TypeError(`Failed to set the 'adoptedStyleSheets' property on `+n+`: Iterator getter is not callable.`);if(!e.every(T))throw TypeError(`Failed to set the 'adoptedStyleSheets' property on `+n+`: Failed to convert value to 'CSSStyleSheet'`);var r=e.filter(function(t,n){return e.indexOf(t)===n});return o.set(t,r),r}function _(){return document.readyState===`loading`}function v(e){return o.get(e.parentNode===document.documentElement?document:e)}function y(e){e===void 0&&(e=``);var t=e.match(h)||[],n=e;return t.length&&(console.warn(`@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418`),t.forEach(function(e){n=n.replace(e,``)})),n}var b=[`addImport`,`addPageRule`,`addRule`,`deleteRule`,`insertRule`,`removeImport`,`removeRule`],x=`Illegal invocation`;function S(e){e.replace=function(){return Promise.reject(new DOMException(`Can't call replace on non-constructed CSSStyleSheets.`))},e.replaceSync=function(){throw new DOMException(`Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.`)}}function C(e){var t=s.get(e),n=t.adopters,r=t.basicStyleElement;n.forEach(function(e){e.innerHTML=r.innerHTML})}var w=function(){function e(){var e=document.createElement(`style`);f.loaded?p.body.appendChild(e):(document.head.appendChild(e),e.disabled=!0,r.push(e)),s.set(this,{adopters:new Map,actions:[],basicStyleElement:e})}var n=e.prototype;return n.replace=function(e){var t=y(e);try{if(!s.has(this))throw TypeError(x);var n=s.get(this).basicStyleElement;return n.innerHTML=t,C(this),Promise.resolve(this)}catch(e){return Promise.reject(e)}},n.replaceSync=function(e){var t=y(e);if(!s.has(this))throw TypeError(x);var n=s.get(this).basicStyleElement;return n.innerHTML=t,C(this),this},t(e,[{key:`cssRules`,get:function(){if(!s.has(this))throw TypeError(x);return s.get(this).basicStyleElement.sheet.cssRules}}]),e}();b.forEach(function(e){w.prototype[e]=function(){if(!s.has(this))throw TypeError(x);var t=arguments,n=s.get(this),r=n.adopters,i=n.actions,a=n.basicStyleElement,o=a.sheet[e].apply(a.sheet,t);return r.forEach(function(n){n.sheet&&n.sheet[e].apply(n.sheet,t)}),i.push([e,t]),o}});function T(e){return e&&e.constructor===w||e instanceof m||e instanceof p.CSSStyleSheet}Object.defineProperty(w,Symbol.hasInstance,{configurable:!0,value:T});function E(e){for(var t=document.createDocumentFragment(),n=v(e),r=u.get(e),a=0,o=n.length;a<o;a++){var l=s.get(n[a]),f=l.adopters,p=l.basicStyleElement,m=f.get(e);m?(r.disconnect(),t.appendChild(m),(!m.innerHTML||m.sheet&&!m.sheet.cssText)&&(m.innerHTML=p.innerHTML),r.observe()):(m=document.createElement(`style`),m.innerHTML=p.innerHTML,c.set(m,e),d.set(m,0),f.set(e,m),t.appendChild(m)),e===document.head&&i.push(m)}e.insertBefore(t,e.lastChild);for(var h=0,g=n.length;h<g;h++){var _=s.get(n[h]),y=_.adopters,b=_.actions,x=y.get(e),S=d.get(x);if(b.length>0){for(var C=S,w=b.length;C<w;C++){var T=b[C],E=T[0],D=T[1];x.sheet[E].apply(x.sheet,D)}d.set(x,b.length-1)}}}function D(e,t){for(var n=v(e),r=0,i=t.length;r<i;r++)if(!(n.indexOf(t[r])>-1)){var a=s.get(t[r]).adopters,o=u.get(e),c=a.get(e);c||=a.get(document.head),o.disconnect(),c.parentNode.removeChild(c),o.observe()}}function O(e){if(document)for(var t=0,r=e.length;t<r;t++){for(var i=e[t],a=i.addedNodes,o=i.removedNodes,s=0,u=o.length;s<u;s++){var d=c.get(o[s]);d&&E(d)}if(!n)for(var f=0,p=a.length;f<p;f++)for(var m=document.createNodeIterator(a[f],NodeFilter.SHOW_ELEMENT,function(e){var t=l.get(e);return t&&t.adoptedStyleSheets.length>0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),h=void 0;h=m.nextNode();)E(l.get(h))}}function k(e){var t=new MutationObserver(O),n={observe:function(){t.observe(e,{childList:!0,subtree:!0})},disconnect:function(){t.disconnect()}};u.set(e,n),n.observe()}function A(){var e=document.createElement(`iframe`);e.hidden=!0,document.body.appendChild(e),p.body=e.contentWindow.document.body,p.CSSStyleSheet=e.contentWindow.CSSStyleSheet,S(e.contentWindow.CSSStyleSheet.prototype),k(document.body),f.loaded=!0;for(var t=document.createDocumentFragment(),n=0,o=r.length;n<o;n++)r[n].disabled=!1,t.appendChild(r[n]);p.body.appendChild(t);for(var s=0,c=i.length;s<c;s++)t.appendChild(i[s]);document.body.insertBefore(t,document.body.firstChild);for(var l=0,u=a.length;l<u;l++)E(a[l]);a.length=0,r.length=0,i.length=0}function j(){var e={configurable:!0,get:function(){return o.get(this)||[]},set:function(e){var t=o.get(this)||[];g(e,this);var n=this===document?_()?this.head:this.body:this;(`isConnected`in n?n.isConnected:document.body.contains(n))?window.requestAnimationFrame(function(){E(n),D(n,t)}):a.push(n)}};if(Object.defineProperty(Document.prototype,`adoptedStyleSheets`,e),typeof ShadowRoot<`u`){var t=Element.prototype.attachShadow;Element.prototype.attachShadow=function(){var e=n?this:t.apply(this,arguments);return l.set(this,e),k(e),e},Object.defineProperty(ShadowRoot.prototype,`adoptedStyleSheets`,e)}}S(m.prototype),window.CSSStyleSheet=w,j(),_()?document.addEventListener(`DOMContentLoaded`,A):A()})();var Nr=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host {
  position: fixed;
  inset: 0 auto auto 0;
  z-index: var(--layer-1);
  max-width: min-content;

  /* popover fixes */
  background: transparent;
  border: none;
  overflow: visible;

  opacity: 0;
  animation: present-yourself .3s ease forwards;
}

@media (prefers-reduced-motion: no-preference) {

:host {
    transform: translateX(-200%)
}
  }

:host [constructible-support="true"] aside {
    transition: opacity 0.3s ease, transform 0.2s ease;
  }

:host > ol {
  all: initial;
  cursor: inherit;
  font-size: 16px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
  display: flex;
  flex-direction: column;
  margin: 1em 0 0.5em 1em;
  padding: 0;
  list-style-type: none;
  border-radius: 2em;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

:host > ol:first-of-type {
    box-shadow: 0 0.25em 0.5em hsla(0,0%,0%,10%);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background-color: var(--theme-bd-2);
  }

:host > ol:first-of-type:active {
      cursor: grabbing !important;
    }

@media (prefers-color-scheme: dark) {

:host > ol:first-of-type {
      box-shadow: 0 0.25em 0.5em hsla(0,0%,0%,50%)
  }
    }

:host li {
  height: 2.25em;
  width: 2.25em;
  margin: 0.05em 0.25em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 50%;
}

:host li:first-child { margin-top: 0.25em; }

:host li:last-child { margin-bottom: 0.25em; }

:not([data-active=true]):host li[data-tool]:hover {
      cursor: pointer;
      background-color: var(--theme-icon_hover-bg);
    }

:host li[data-tool]:active {
      background-color: var(--theme-icon_active-bg);
    }

:host li[data-active=true] {
    background-color: var(--theme-icon_active-bg);
    box-shadow: var(--shadow-2);
  }

:host li[data-active=true] > .icon-cursor {
      stroke: var(--neon-pink);
    }

:host li[data-active=true] > svg:not(.icon-cursor) {
      fill: var(--neon-pink);
    }

@media (max-height: 768px) {
    :host li:is(:nth-of-type(7),:nth-of-type(8), :nth-of-type(9), :nth-of-type(10), :nth-of-type(11), :nth-of-type(12), :nth-of-type(13)) > aside {
      top: auto;
    }
  }

:host li > aside {
    overflow: hidden;
    position: absolute;
    direction: ltr;
    text-align: left;
    left: 3em;
    top: 0;
    z-index: -2;
    pointer-events: none;
    background: var(--theme-bg);
    color: var(--theme-text_color);
    box-shadow: 0 0.1em 4.5em hsla(0,0%,0%,15%);
    border-radius: 1em;

    opacity: 0;
    transform: translateX(-1em);
    will-change: transform, opacity;
  }

@media (prefers-reduced-motion: reduce) {

:host li > aside {
      transition-duration: 0s
  }
    }

:host li > aside > figure {
      margin: 0;
      display: grid;
    }

:host li > aside figcaption {
      padding: 1em;
      display: grid;
      gap: 1em;
    }

:host li > aside figcaption > :is(h2,p) {
        margin: 0;
      }

:host li > aside figcaption > h2 {
        font-size: 1.5em;
        line-height: 1.1;
        display: grid;
        grid-auto-flow: column;
        justify-content: space-between;
        align-items: center;
      }

:host li > aside figcaption > h2 u {
          text-decoration-color: var(--theme-color);
        }

:host li > aside figcaption > p {
        font-size: 1em;
        line-height: 1.5;
        color: var(--theme-icon_color);
      }

:host li > aside figcaption [table] {
        display: grid;
        gap: 0.5em;
      }

:host li > aside figcaption [table] > div {
          display: grid;
          grid-auto-flow: column;
          grid-template-columns: 1fr auto;
          justify-content: space-between;
        }

:host li > aside [hotkey] {
      border-radius: .25em;
      height: 1.5em;
      width: 1.5em;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--theme-color);
      color: var(--theme-color);
      font-weight: 300;
      font-size: 0.5em;
      text-transform: uppercase;
      box-shadow: 0 2px 2px hsla(0 0% 0% / .25)
    }

:host li:hover:not([data-tool="search"]) > aside,
  :host li[data-tool="search"] > svg:hover + aside {
    opacity: 1;
    transform: translateX(0);
    transition-delay: 1s;
  }

:host li input::-webkit-calendar-picker-indicator {
    background: inherit;
    color: var(--neon-pink);
  }

:host [colors] {
  margin-top: .5em;
}

:host [colors] > li {
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--theme-bg), 0 0.25em 0.5em hsla(0,0%,0%,25%);
  background: var(--contextual_color);
  margin-bottom: 0.5em;
}

:host [colors] > li:first-child {
    margin-top: 0;
  }

:host [colors] li:hover:after {
  top: 0;
}

:host li > svg {
  width: 50%;
  fill: var(--theme-icon_color);
}

:host li > svg.icon-cursor {
  width: 35%;
  fill: white;
  stroke: var(--theme-icon_color);
  stroke-width: 2px;
}

:host li[data-tool="search"]:before {
    transform: translateX(-1em);
    opacity: 0;
  }

:host li[data-tool="search"] > .search {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: -1;
  box-shadow: 0 0.25em 0.5em hsla(0,0%,0%,10%);
  border-radius: 2em;
  overflow: hidden;
}

:host li[data-tool="search"] > .search > input {
  direction: ltr;
  border: none;
  font-size: 1em;
  padding: 0.4em 0.4em 0.4em 3em;
  outline: none;
  height: 100%;
  width: 250px;
  box-sizing: border-box;
  caret-color: var(--neon-pink);
  background-color: var(--theme-bg);
  color: var(--theme-text_color);
  cursor: initial;
  -webkit-appearance: none;
}

:host li[data-tool="search"] > .search > input::placeholder {
    font-weight: lighter;
    font-size: 0.8em;
    color: var(--theme-icon_color);
  }

:host [colors] > li > svg {
  fill: var(--icon_color);
}

:host [colors] > li > svg > rect:last-child {
  stroke: hsla(0,0%,0%,20%);
  stroke-width: 0.5px;
}

:host input[type='color'] {
  opacity: 0.01;
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 1;
  box-sizing: border-box;
  border: white;
  padding: 0;
  cursor: pointer;
}

:host input[type='color']:focus {
  outline: none;
}

:host input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}

:host input[type='color']::-webkit-color-swatch {
  border: none;
}

:host input[type='color'][value='']::-webkit-color-swatch {
  background-color: transparent !important;
  background-image: linear-gradient(155deg, #ffffff 0%,#ffffff 46%,#ff0000 46%,#ff0000 54%,#ffffff 55%,#ffffff 100%);
}

@keyframes present-yourself {
  to {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
}

:host::backdrop {
  background: none !important;
}
`,Pr=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host {
  position: var(--position, 'absolute');
  inset: var(--top) auto auto var(--left);
  background: transparent;
  border: none;
  overflow: visible;
  padding: 0;
  pointer-events: none;
  z-index: var(--layer-3);
  width: var(--width);
  height: var(--height);
  display: grid;
  grid-template-rows: 1fr;
  isolation: isolate;
}

:host > svg {
  position: absolute;
}

:host::backdrop {
  background: none !important;
}
`,Fr=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host {
  display: grid;
  grid-area: 1 / -1;
  place-self: var(--align-self, center) var(--justify-self, center);
  transform: translate(var(--translate-x, 0), var(--translate-y, 0));
}

:host([hidden]) {
  display: none;
}

:host > button {
  pointer-events: auto;
  background-color: white;
  border: 1px solid var(--neon-pink);
  padding: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  position: relative;
  cursor: var(--cursor);
}

/* increase tap target size */

:host > button::before {
    content: '';
    position: absolute;
    inset: -0.5rem;
  }

:host([placement^="top"]) {
  --align-self: start;
  --translate-y: -50%;
}

:host([placement^="bottom"]) {
  --align-self: end;
  --translate-y: 50%;
}

:host([placement$="start"]) {
  --justify-self: start;
  --translate-x: -50%;
}

:host([placement$="end"]) {
  --justify-self: end;
  --translate-x: 50%;
}

:host([placement^="top"]),
:host([placement^="bottom"]) {
  --cursor: ns-resize;
}

:host([placement$="start"]),
:host([placement$="end"]) {
  --cursor: ew-resize;
}

:host([placement="top-start"]) {
  --cursor: nw-resize;
}

:host([placement="top-end"]) {
  --cursor: ne-resize;
}

:host([placement="bottom-start"]) {
  --cursor: sw-resize;
}

:host([placement="bottom-end"]) {
  --cursor: se-resize;
}
`,Ir=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host rect {
  width: 100%;
  height: 100%;
  vector-effect: non-scaling-stroke;
  stroke: var(--hover-stroke, var(--neon-purple, hsl(267 100% 58%)));
  stroke-width: 2px;
  fill: none;
}

:host > svg {
  z-index: var(--layer-5);
}
`,Lr=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host rect {
  width: 5px;
  height: 5px;
  vector-effect: non-scaling-stroke;
  stroke: var(--neon-purple);
  stroke-width: 1px;
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 10px;
  stroke-dashoffset: 5px;
  x: 1px;
  y: 1px;
}

:host rect:nth-child(2) {
    x: calc(100% - 6px);
    y: 1px;
    stroke-dashoffset: 0;
  }

:host rect:nth-child(3) {
    x: calc(100% - 6px);
    y: calc(100% - 6px);
    stroke-dashoffset: 15px;
  }

:host rect:nth-child(4) {
    x: 1px;
    y: calc(100% - 6px);
    stroke-dashoffset: 10px;
  }

:host > svg {
  z-index: var(--layer-5);
}
`,Rr=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host {
  --line-color: 1 0 1;
  --line-base: .75 0 1;
  --line-width: 1px;
  --distance-h: 5px;
  --distance-w: 5px;
  --line-w: 1px;
  --line-h: 1px;
  font-size: 16px;
  position: initial;
  background: transparent;
  border: none;
  overflow: visible;
  padding: 0;
  margin: 0;
}

:host > figure {
  margin: 0;
  position: absolute;
  height: var(--distance-h);
  width: var(--distance-w);
  inset: var(--top) var(--right) auto var(--left);
  overflow: visible;
  pointer-events: none;
  z-index: var(--layer-3);
  display: flex;
  align-items: center;
  justify-content: var(--justify, 'flex-start');
  flex-direction: var(--direction);
}

:host > figure figcaption {
  min-height: 3ex;
  width: max-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: var(--text-shadow);
  box-shadow: var(--text-shadow);
  background: color(display-p3 var(--line-color) / 75%);
  border: 1px solid color(display-p3 var(--line-color));
  border-radius: 1em;
  font-size: 0.7em;
  font-weight: bold;
  line-height: 1.1;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
  padding: 0 1ex;
}

:host > figure span {
  background: color(display-p3 var(--line-color));
  height: var(--line-h);
  width: var(--line-w);
}

:host > figure div {
  flex: 2;
  background: color(display-p3 var(--line-color));
  width: var(--line-w);
  height: var(--line-h);
}

:host figure:matches([quadrant="bottom"], [quadrant="right"]) > div:first-of-type,
:host figure:matches([quadrant="top"], [quadrant="left"]) > div:last-of-type {
  background: linear-gradient(to var(--quadrant), var(--neon-pink) 0%, color(display-p3 var(--line-color)) 100%);
}

:host::backdrop {
  background: none !important;
}
`,zr=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host {
  position: fixed;
  background: transparent;
  pointer-events: none;
  border: none;
  overflow: visible;
  padding: 0;
  margin: 0;
  inset: 0;
  width: 100%;
  height: 100%;
}

:host > svg {
  position:fixed;
  top:0;
  left:0;
  overflow:visible;
  pointer-events:none;
  z-index:var(--layer-5);
}

:host rect,
:host line {
  stroke: var(--neon-pink);
}

:host line {
  stroke-dasharray: 2;
  stroke-dasharray-offset: 3;
}

:host::backdrop {
  background: none !important;
}
`,Br=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host {
  font-size: 16px;
  position: initial;
  background: transparent;
  border: none;
  overflow: visible;
  padding: 0;
  margin: 0;
  --position: absolute;
  --top: 0;
  --left: 0;
  --max-width: 0;
}

:host > span {
  position: var(--position);
  inset: var(--top) auto auto var(--left);
  max-width: var(--max-width);
  z-index: var(--layer-4);
  transform: translateY(-100%);
  background: var(--label-bg, var(--neon-pink));
  text-shadow: var(--text-shadow);
  color: white;
  display: inline-flex;
  justify-content: center;
  font-size: 0.8em;
  font-weight: normal;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
  white-space: nowrap;
  padding: 2px 6px;
  line-height: 1.1;
}

:host a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-bottom: 1px;
}

:host a:hover {
    text-decoration: underline;
    color: white;
  }

:host a[node]:before {
    content: "\\003c";
  }

:host a[node]:after {
    content: "\\003e";
  }

:host::backdrop {
  background: none !important;
}
`,Vr=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host {
  font-size: 16px;
  position: initial;
  background: transparent;
  border: none;
  overflow: visible;
  padding: 0;
  margin: 0;
  --position: absolute;
  --top: 0;
  --left: 0;
  --max-width: 0;
}

:host > span {
  position: var(--position);
  inset: var(--top) auto auto var(--left);
  max-width: var(--max-width);
  z-index: var(--layer-4);
  transform: translateY(-100%);
  background: var(--label-bg, var(--neon-pink));
  text-shadow: var(--text-shadow);
  color: white;
  display: inline-flex;
  justify-content: center;
  font-size: 0.8em;
  font-weight: normal;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
  white-space: nowrap;
  padding: 2px 6px;
  line-height: 1.1;
}

:host a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-bottom: 1px;
}

:host a:hover {
    text-decoration: underline;
    color: white;
  }

:host a[node]:before {
    content: "\\003c";
  }

:host a[node]:after {
    content: "\\003e";
  }

:host::backdrop {
  background: none !important;
}

:host {
  --count: "\\00a0 0";
  --hover-text: "";
}

:host > [offscreen-label] {
  cursor: none;
}

:host > [offscreen-label]:after {
  content: var(--count);
}

:host > [offscreen-label]:hover:after {
  content: var(--hover-text);
}`,Hr=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host svg {
  display: none;
  position: absolute;
  top: var(--top);
  left: var(--left);
  overflow: visible;
  pointer-events: none;
  z-index: var(--layer-5);
}

:host svg > rect {
    fill: hsla(330, 100%, 71%, 0.5);
    width: 100%;
    height: 100%;
  }
`,Ur=`:host [mask] {
  pointer-events: none;
  position: absolute;
  z-index: var(--layer-5);
  width: var(--width);
  height: var(--height);
  top: var(--top);
  left: var(--left);
  background-color: var(--bg);
  clip-path: polygon(
    0% 0%, 0% 100%, var(--target-left) 100%,
    var(--target-left) var(--target-top),
    var(--offset-right) var(--target-top),
    var(--offset-right) var(--offset-bottom),
    0 var(--offset-bottom), 0 100%,
    100% 100%, 100% 0%
  );
}`,Wr=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host {
  position: absolute;
  inset: 0 auto auto 0;
  padding: 0;
  z-index: var(--layer-top);

  background: transparent;
  border: none;
  overflow: visible;

  --arrow-width: 15px;
  --arrow-height: 8px;

  --shadow-up: 5px;
  --shadow-down: -5px;
  --shadow-direction: var(--shadow-up);
  --shadow:
    0 3.6px 3.7px rgba(0, 0, 0, 0.101),
    0 12.1px 12.3px rgba(0, 0, 0, 0.149),
    0 -2px 4px rgba(0, 0, 0, 0.101),
    0 -12.1px 24px rgba(0, 0, 0, 0.149),
    0 54px 55px rgba(0, 0, 0, 0.25);

  --arrow-up: polygon(0 0, 100% 0, 50% 100%);
  --arrow-down: polygon(50% 0, 0 100%, 100% 100%);
  --arrow: var(--arrow-up);

  --border-radius: .75em;

  --copy-message-left-color: white;
  --copy-message-right-color: white;
}

:host figure {
  all: initial;
  direction: ltr;
  font-size: 16px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
  max-width: 90vw;
  color: var(--theme-text_color);
  line-height: initial;
  margin: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  border-radius: var(--border-radius);
  line-height: initial;
}

@media (min-width: 540px) {

:host figure {
    max-width: max(40ch, 50vw)
}
  }

:host figure:after {
    content: "";
    background: var(--theme-bg);
    width: var(--arrow-width);
    height: var(--arrow-height);
    clip-path: var(--arrow);
    position: absolute;
    top: var(--arrow-top);
    left: var(--arrow-left);
  }

:host figure a {
    text-decoration: none;
    color: inherit;
    overflow-x: auto;
    overscroll-behavior: contain;
    cursor: pointer;
  }

:host figure a:hover {
      color: var(--theme-color);
      text-decoration: underline;
    }

:host figure a:empty {
      display: none;
    }

:host figure a[node]:before {
      content: "\\003c";
    }

:host figure a[node]:after {
      content: "\\003e";
    }

:host h5 {
  display: flex;
  font-size: 1em;
  font-weight: bolder;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  max-width: max-content;
}

:host small {
  font-size: 0.7em;
  color: var(--theme-icon_color);
}

:host small > span {
    color: var(--theme-text_color);
  }

:host a:not(:hover) {
  text-decoration: none;
}

:host [brand] {
  color: var(--theme-color);
}

:host [divider] {
  color: var(--theme-blue);
}

:host header {
  padding: 5px 10px;
  user-select: none;
  text-shadow: var(--text-shadow);
  border-radius: var(--border-radius);
  border: 1px solid var(--theme-bg);
  margin-bottom: 2px;
  inline-size: max-content;
  max-inline-size: max(35ch, 45vw);

  background: var(--theme-bd);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  place-self: var(--is-flipped);
  text-align: var(--is-flipped);
}

:host [visbug-ally] > header {
  padding: .1ex 10px .25ex;
  border-radius: var(--radius-round);
}

:host code {
  display: grid;
  grid-template-columns: max-content auto;
  gap: .25em .5em;
  border-radius: var(--border-radius);
  list-style-type: none;
  color: var(--light-grey);
  background-color: var(--theme-bd-2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-top: 1px solid var(--theme-bg);
  font-size: 1em;
  box-shadow: var(--shadow);
  font-family: 'Dank Mono', 'Operator Mono', 'Inconsolata', 'Fira Mono', 'SF Mono', 'Monaco', 'Droid Sans Mono', 'Source Code Pro', monospace;
}

:host code[accessibility] > [prop]:first-of-type {
    color: var(--theme-text_color);
  }

:host details {
  place-self: var(--is-flipped);
}

:host details[open] > code {
    margin-top: 2px;
  }

:host details > :is(summary,code),
:host > figure > code {
  padding: 8px 14px 10px;
  border-radius: var(--border-radius);
}

:host section {
  max-width: max-content;
  border-radius: var(--border-radius);
  overflow: clip;
  box-shadow: var(--shadow);
}

:host summary {
  outline-offset: -2px;
  outline-color: var(--theme-color);
  max-inline-size: max-content;
  background: var(--theme-bd);
  backdrop-filter: blur(5px);
  margin-top: 1ch;
}

:host summary::marker {
    color: var(--theme-color);
  }

:host [value],
:host [local-change] {
  color: var(--theme-text_color);
  display: inline-grid;
  grid-auto-flow: column;
  gap: .5em;
  align-items: center;
  text-align: right;
  white-space: nowrap;
  overflow-x: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
}

:host [value]:has([color]), :host [local-change]:has([color]) {
    grid-template-columns: max-content max-content;
    place-self: end;
  }

:host [value]:has([gradient]), :host [local-change]:has([gradient]) {
    place-self: initial;
  }

:host [text] {
  white-space: normal;
}

:host [longform] {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
  text-wrap: pretty;
  text-align: left;
  line-height: 1.5;
}

:host [prop] {
  color: var(--theme-color);
}

:host [color] {
  position: relative;
  top: 1px;
  display: inline-block;
  width: 1em;
  min-width: 1em;
  height: 1em;
  border-radius: 50%;
  box-shadow: inset 0 0 1px 0 hsl(0 0% 0% / 50%);
}

:host [color][gradient] {
  --checkerboard:  repeating-conic-gradient(#222 0% 25%, transparent 0% 50%) 50% / 8px 8px;
  background: var(--_bg), var(--checkerboard);
  border-radius: 0px;
}

:host [color-value] {
  white-space: nowrap;
}

:host [local-modifications] {
  margin-top: 1em;
  margin-inline: 10px;
  color: var(--theme-purple);
  font-weight: bold;
}

:host [local-modifications] + div {
    margin-bottom: 1em;
  }

:host [contrast-compliance] {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 3ch;
  padding: 10px 10px 7.5px;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  background-color: var(--theme-bd-2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-top: 1px solid var(--theme-bg);
}

:host [contrast] {
  display: grid;
  justify-items: start;
  gap: .25ch;
}

:host [contrast] > [value] {
    font-size: 1.5em;
    line-height: 1;
  }

:host [compliance] {
  display: grid;
  align-content: space-between;
}

:host [compliance] > div {
    display: flex;
    align-items: center;
    gap: 2ch;
  }

:host [compliance] > div > span {
    display: flex;
    align-items: center;
    gap: .5ch;
  }

:host [compliance] svg {
    block-size: .75em;
  }

:host :is([contrast],[compliance]) [title] {
  font-size: .7em;
  opacity: .8;
}

:host [contrast] > [title] > [pass] {
    display: inline-flex;
  }

:host [contrast] > [title] svg {
    height: 1lh;
  }

:host [title] {
  display: flex;
  gap: .5ch;
  align-items: center;
}

:host [color-swatches] {
  display: flex;
  width: 100%;
  height: 7em;
  flex-direction: row;
  padding: 0;
}

@media (max-width: 700px) {

:host [color-swatches] {
    flex-direction: column;
    height: 14em
}
  }

:host [color-swatch] {
  min-width: 20ch;
  height: 7em;
  display: grid;
  position: relative;
  align-content: end;
  box-sizing: border-box;
  padding: 10px;
  margin: 0;
  cursor: copy;
  backdrop-filter: blur(5px);
}

@media (max-width: 700px) {

:host [color-swatch] {
    width: 100%
}
  }

:host [color-swatch] > small,
:host [color-swatch] > span,
:host [color-swatch]:after {
  cursor: copy;
}

:host [color-swatch] > small {
  opacity: .8;
}

:host [color-swatch]:after {
  content: "📋 \\00a0 copy";
  position: absolute;
  top: 10px;
  left: 10px;
  transition: opacity 0.3s;
  opacity: 0;
}

:host [color-swatch]:nth-child(1):after {
  color: var(--copy-message-left-color);
}

:host [color-swatch]:nth-child(2):after {
  color: var(--copy-message-right-color);
}

:host [color-swatch]:hover:after {
  opacity: 1;
}

:host [color-swatch]:focus:after {
  content: "📋 \\00a0 copied";
}

:host [accessibility] {
  display: flex;
  flex-direction: column;
  place-self: var(--is-flipped);
  margin-top: 2px;
  inline-size: max-content;
  max-inline-size: 40ch;
}

:host [accessibility] > :not([contrast-compliance]) {
    display: grid;
    grid-template-columns: max-content 1fr;
  }

:host [accessibility] > :not([contrast-compliance]) [value] {
      display: grid;
      justify-content: flex-start;
      padding-left: 1em;
      text-align: left;
    }

:host [accessibility] > [contrast-compliance] {
    justify-content: space-between;
  }

:host [accessibility] > [contrast-compliance] [value] {
      justify-content: flex-start;
      margin-right: 7px;
    }

:host [score] {
  font-size: 1.5em;
  line-height: .75;
}

:host [pass="true"] { color: green; }

:host [pass="false"] { color: red; }

@media (prefers-color-scheme: dark) {
    :host [pass="true"] { color: hsl(120deg 50% 75%); }
    :host [pass="false"] { color: hsl(0deg 50% 65%); }
  }

:host::backdrop {
  background: none !important;
}
`,Gr=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--layer-top);
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: var(--theme-bd-2);
  backdrop-filter: blur(5px);
  font-size: 16px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
  cursor: initial;

  --light-grey: hsl(0 0% 90%);
  --grey: hsl(0 0% 60%);
  --dark-grey: hsl(0 0% 40%);
}

@media (prefers-color-scheme: dark) {

:host {
    --light-grey: hsl(0 0% 20%);
    --grey: hsl(0 0% 60%);
    --dark-grey: hsl(0 0% 80%)
}
  }

:host [command] {
  padding: 1em;
  text-align: center;
  font-size: 3vw;
  font-weight: lighter;
  letter-spacing: 0.1em;
  color: var(--dark-grey);
}

:host [command] > [light] {
    color: var(--grey);
  }

:host [command] > [tool] {
    text-decoration: underline;
    text-decoration-color: var(--theme-color);
  }

:host [command] > :matches([negative],[side],[amount]) {
    font-weight: normal;
  }

:host [card] {
  padding: 1em;
  background: var(--theme-bg);
  border-radius: 0.5em;
  color: var(--dark-grey);
  display: flex;
  justify-content: space-evenly;
}

:host [card] > div:not([keyboard]) {
    display: flex;
    align-items: flex-end;
    margin-left: 1em;
  }

:host [tool-icon] {
  position: absolute;
  top: 1em;
  left: 0;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
}

:host [tool-icon] > span {
    color: var(--dark-grey);
    display: grid;
    grid-template-columns: 5vmax auto;
    grid-gap: 0.5em;
    align-items: center;
    text-transform: capitalize;
    font-size: 4vmax;
    font-weight: lighter;
  }

:host [tool-icon] svg {
    width: 100%;
    fill: var(--theme-color);
  }

:host section {
  display: flex;
  justify-content: center;
}

:host section > span, 
:host [arrows] > span {
  border: 1px solid transparent;
  border-radius: 0.5em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  padding: 1.5vw;
  font-size: 0.75em;
  white-space: nowrap;
}

:host section > span:not([pressed="true"]), 
:host [arrows] > span:not([pressed="true"]) {
  border: 1px solid var(--light-grey);
}

:host section > span:not([pressed="true"]):hover, :host [arrows] > span:not([pressed="true"]):hover {
    border-color: var(--grey);
  }

:host span[pressed="true"] {
  background: var(--theme-color);
  color: var(--theme-bg);
}

:host span:not([pressed="true"]):matches([used]) {
  background: var(--light-grey);
  cursor: pointer;
}

:host span[hotkey] {
  color: var(--theme-color);
  font-weight: bold;
  cursor: pointer;
}

:host section > span[hotkey]:not([pressed="true"]) {
  border-color: var(--theme-color);
}

:host [arrows] {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

:host [arrows] > span:nth-child(1) {
    grid-row: 1;
    grid-column: 2;
  }

:host [arrows] > span:nth-child(2) {
    grid-row: 2;
    grid-column: 2;
  }

:host [arrows] > span:nth-child(3) {
    grid-row: 2;
    grid-column: 1;
  }

:host [arrows] > span:nth-child(4) {
    grid-row: 2;
    grid-column: 3;
  }

:host [caps] > span:nth-child(1),
:host [shift] > span:nth-child(1)  { justify-content: flex-start; }
:host [shift] > span:nth-child(12) { justify-content: flex-end; }`,Kr=`:host{--shadow-color:220 3% 15%;--shadow-strength:1%;--inner-shadow-highlight:inset 0 -.5px 0 0 #fff,inset 0 .5px 0 0 rgba(0,0,0,.067);--shadow-1:0 1px 2px -1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--shadow-2:0 3px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 14px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%));--shadow-3:0 -1px 3px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 2px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 5px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 4px 12px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 12px 15px -5px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-4:0 -2px 5px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 1px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 2px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 9px 9px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 16px 16px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%));--shadow-5:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 2px 1px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 5px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 10px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 20px 20px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 40px 40px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--shadow-6:0 -1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 2%)),0 3px 2px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 7px 5px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 3%)),0 12px 10px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 4%)),0 22px 18px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 5%)),0 41px 33px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 6%)),0 100px 80px -2px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 7%));--inner-shadow-0:inset 0 0 0 1px hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%));--inner-shadow-1:inset 0 1px 2px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-2:inset 0 1px 4px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-3:inset 0 2px 8px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight);--inner-shadow-4:inset 0 2px 14px 0 hsl(var(--shadow-color)/calc(var(--shadow-strength) + 9%)),var(--inner-shadow-highlight)}@media (prefers-color-scheme:dark){:host{--shadow-color:220 40% 2%;--shadow-strength:25%;--inner-shadow-highlight:inset 0 -.5px 0 0 hsla(0,0%,100%,.067),inset 0 .5px 0 0 rgba(0,0,0,.467)}}
:host{--border-size-1:1px;--border-size-2:2px;--border-size-3:5px;--border-size-4:10px;--border-size-5:25px;--radius-1:2px;--radius-2:5px;--radius-3:1rem;--radius-4:2rem;--radius-5:4rem;--radius-6:8rem;--radius-drawn-1:255px 15px 225px 15px/15px 225px 15px 255px;--radius-drawn-2:125px 10px 20px 185px/25px 205px 205px 25px;--radius-drawn-3:15px 255px 15px 225px/225px 15px 255px 15px;--radius-drawn-4:15px 25px 155px 25px/225px 150px 25px 115px;--radius-drawn-5:250px 25px 15px 20px/15px 80px 105px 115px;--radius-drawn-6:28px 100px 20px 15px/150px 30px 205px 225px;--radius-round:1e5px;--radius-blob-1:30% 70% 70% 30%/53% 30% 70% 47%;--radius-blob-2:53% 47% 34% 66%/63% 46% 54% 37%;--radius-blob-3:37% 63% 56% 44%/49% 56% 44% 51%;--radius-blob-4:63% 37% 37% 63%/43% 37% 63% 57%;--radius-blob-5:49% 51% 48% 52%/57% 44% 56% 43%;--radius-conditional-1:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-1));--radius-conditional-2:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-2));--radius-conditional-3:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-3));--radius-conditional-4:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-4));--radius-conditional-5:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-5));--radius-conditional-6:clamp(0px,calc(100vw - 100%) * 1e5,var(--radius-6))}
:host{--gray-0:#f8f9fa;--gray-1:#f1f3f5;--gray-2:#e9ecef;--gray-3:#dee2e6;--gray-4:#ced4da;--gray-5:#adb5bd;--gray-6:#868e96;--gray-7:#495057;--gray-8:#343a40;--gray-9:#212529;--gray-10:#16191d;--gray-11:#0d0f12;--gray-12:#030507}
:host{--gray-0-hsl:210 17% 98%;--gray-1-hsl:210 17% 95%;--gray-2-hsl:210 16% 93%;--gray-3-hsl:210 14% 89%;--gray-4-hsl:210 14% 83%;--gray-5-hsl:210 11% 71%;--gray-6-hsl:210 7% 56%;--gray-7-hsl:210 9% 31%;--gray-8-hsl:210 10% 23%;--gray-9-hsl:210 11% 15%;--gray-10-hsl:214 14% 10%;--gray-11-hsl:216 16% 6%;--gray-12-hsl:210 40% 2%}

:host {
  --theme-bg: white;
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-bd-opacity: 1;
  --theme-bd-2-opacity: 1;
  --theme-color: hotpink;
  --theme-blue: hsl(188 90% 45%);
  --theme-purple: hsl(267 100% 58%);

  --neon-pink: color(display-p3 1 0 1);
  --neon-purple: color(display-p3 .5 0 1);
  --neon-lime:  color(display-p3 0.25 1 0);
  --neon-cyan:  color(display-p3 0 1 1);

  --theme-text_color: var(--gray-11);
  --theme-icon_color: var(--gray-9);
  --theme-icon_hover-bg: white;
  --theme-icon_active-bg: white;

  --layer-top: 2147483647;
  --layer-1: 2147483646;
  --layer-2: 2147483645;
  --layer-3: 2147483644;
  --layer-4: 2147483643;
  --layer-5: 2147483642;

  --text-shadow: 0 1px hsl(0 0% 0% / 40%);
}

@media (-webkit-min-device-pixel-ratio: 2) {

:host {
    --text-shadow: 0 .5px hsl(0 0% 0% / 50%)
}
  }

@media (prefers-color-scheme: dark) {

:host {
    --theme-bg: var(--gray-10);
    --theme-bd: hsl(var(--gray-10-hsl) / var(--theme-bd-opacity));
    --theme-bd-2: hsl(var(--gray-10-hsl) / var(--theme-bd-2-opacity));
    --theme-color: hsl(330deg 65% 75%);
    --theme-text_color: var(--gray-0);
    --theme-icon_color: var(--gray-2);
    --theme-icon_hover-bg: var(--gray-8);
    --theme-icon_active-bg: var(--gray-8)
}
  }

@supports (backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

@supports (-webkit-backdrop-filter: blur(5px)) {

:host {
    --theme-bd-opacity: .8;
    --theme-bd-2-opacity: .9
}
  }

:host g {
  transform: translate(calc(50% - 10%), calc(50% - .25em));
}

:host rect {
  vector-effect: non-scaling-stroke;
  height: .5em;
  width: 20%;
  max-width: 10vmax;
  stroke: var(--neon-pink);
  stroke-width: 1px;
  stroke-linecap: round;
  rx: 4;
}

:host > svg {
  z-index: var(--layer-5);
}

:host > svg[hovering] rect {
    fill: var(--neon-pink);
  }
`,qr=`:host {
  --theme-bg: hsl(0 0% 100%);
  --theme-bd: hsl(0 0% 100% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 100% / var(--theme-bd-2-opacity));
  --theme-color: hotpink;
  --theme-text_color: hsl(0 0% 10%);
  --theme-icon_color: hsl(0 0% 20%);
  --theme-icon_hover-bg: hsl(0 0% 95%);
  --theme-icon_active-bg: hsl(0 0% 90%);
}
`,Jr=`:host > ol:first-of-type {
    box-shadow: 0 0.25em 0.5em hsla(0,0%,0%,10%);
  }
`,Yr=`:host [pass="true"] { color: green; }
  :host [pass="false"] { color: red; }
`,Xr=`:host {
  --light-grey: hsl(0 0% 90%);
  --grey: hsl(0 0% 60%);
  --dark-grey: hsl(0 0% 40%);
}
`,Zr=`:host {
  --theme-bg: hsl(0 0% 10%);
  --theme-bd: hsl(0 0% 10% / var(--theme-bd-opacity));
  --theme-bd-2: hsl(0 0% 10% / var(--theme-bd-2-opacity));
  --theme-color: hsl(330deg 65% 75%);
  --theme-text_color: hsl(0 0% 90%);
  --theme-icon_color: hsl(0 0% 80%);
  --theme-icon_hover-bg: hsl(0 0% 15%);
  --theme-icon_active-bg: hsl(0 0% 20%);
}
`,Qr=`:host > ol:first-of-type {
    box-shadow: 0 0.25em 0.5em hsla(0,0%,0%,50%);
  }
`,$r=`:host [pass="true"] { color: hsl(120deg 50% 75%); }
  :host [pass="false"] { color: hsl(0deg 50% 65%); }
`,ei=`:host {
  --light-grey: hsl(0 0% 20%);
  --grey: hsl(0 0% 60%);
  --dark-grey: hsl(0 0% 80%);
}
`;const W=(e,t=new CSSStyleSheet)=>(t.replaceSync(e),t),ti=W(Nr),ni=W(Pr),ri=W(Fr),ii=W(Ir),ai=W(Lr),oi=W(Wr),si=W(Rr),ci=W(zr),li=W(Br),ui=W(Vr),di=W(Hr),fi=W(Ur),pi=W(Gr),mi=W(Kr),hi=W(qr),gi=W(Jr),_i=W(Yr),vi=W(Xr),yi=W(Zr),bi=W(Qr),xi=W($r),Si=W(ei),Ci=navigator.userAgent.search(`Firefox`)>0,wi=navigator.userAgent.search(`Safari`)>0,Ti=navigator.userAgent.search(`Chrome`)>0,Ei=wi&&!Ti,Di=(()=>{try{return new window.CSSStyleSheet(`a{}`),!0}catch{return!1}})(),Oi={color:`rgb(0, 0, 0)`,backgroundColor:`rgba(0, 0, 0, 0)`,backgroundImage:`none`,backgroundSize:`auto`,backgroundPosition:`0% 0%`,borderRadius:`0px`,boxShadow:`none`,padding:`0px`,margin:`0px`,fontFamily:`auto`,fontSize:`16px`,fontWeight:`400`,textAlign:`start`,textShadow:`none`,textTransform:`none`,lineHeight:`normal`,letterSpacing:`normal`,display:`block`,alignItems:`normal`,justifyContent:`normal`,flexDirection:`row`,flexWrap:`nowrap`,flexBasis:`auto`,fill:`rgb(0, 0, 0)`,stroke:`none`,gridTemplateColumns:`none`,gridAutoColumns:`auto`,gridTemplateRows:`none`,gridAutoRows:`auto`,gridTemplateAreas:`none`,gridArea:`auto`,gap:`normal`,gridAutoFlow:`row`};Ci&&(Oi.backgroundSize=`auto`,Oi.borderWidth=``,Oi.borderRadius=``,Oi.padding=``,Oi.margin=``,Oi.gap=``,Oi.gridArea=``,Oi.borderColor=``),Ei&&(Oi.gap=`normal normal`);const ki=[`role`,`tabindex`,`aria-*`,`for`,`alt`,`title`,`type`],Ai=[{fontSize:`24px`,fontWeight:`0`},{fontSize:`18.5px`,fontWeight:`700`}],G=(e,t)=>{if(document.defaultView&&document.defaultView.getComputedStyle){t=t.replace(/([A-Z])/g,`-$1`),t=t.toLowerCase();let n=document.defaultView.getComputedStyle(e,``);return n&&n.getPropertyValue(t)}},ji=e=>{e.style;let t=window.getComputedStyle(e,null),n=[],r=[];for(let i in e.style){let e=Oi[i];e&&e!=t[i]&&n.push({prop:i,value:t[i]}),(i===`borderColor`||i===`borderWidth`||i===`borderStyle`)&&(r[i]=t[i].replace(/, rgba/g,`\rrgba`))}let{borderColor:i,borderWidth:a,borderStyle:o}=r;return parseFloat(a)>0&&(n.push({prop:`borderColor`,value:i}),n.push({prop:`borderStyle`,value:o}),n.push({prop:`borderWidth`,value:a})),n.sort(function({prop:e},{prop:t}){return e<t?-1:e>t?1:0})};let Mi;const Ni=()=>{if(Mi)return Mi;let e=document.createElement(`span`);return e.style.backgroundColor=`Canvas`,document.body.appendChild(e),Mi=getComputedStyle(e).backgroundColor,document.body.removeChild(e),Mi},Pi=e=>{let t=G(e,`background-color`);if(t===`rgba(0, 0, 0, 0)`){let n=Fi(e),r=!1;for(;!r;){let e=G(n,`background-color`);n.nodeName===`HTML`&&(r=!0,t=Ni()),e!==`rgba(0, 0, 0, 0)`&&(r=!0,t=e),n=Fi(n)}}return t},Fi=e=>e.nodeName===`HTML`?e:e.parentNode&&e.parentNode.nodeType===1?e.parentNode:e.parentNode.nodeName===`#document-fragment`?e.parentNode.host:e.parentNode.parentNode.host,Ii=e=>{if(e.shadowRoot&&e.shadowRoot.children.length)return[...e.shadowRoot.children].filter(({nodeName:e})=>![`LINK`,`STYLE`,`SCRIPT`,`HTML`,`HEAD`].includes(e))[0];if(e.children.length)return e.children[0]},Li=e=>/([^\)]+\)) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/.exec(e),Ri=e=>/([^\)]+\)) ([^\s]+) ([^\s]+) ([^\s]+)/.exec(e),zi=new Map,Bi=e=>{if(zi.has(e))return zi.get(e);let t=e.split(`,`),n=window.document.createElement(`canvas`).getContext(`2d`),r=t.map(e=>e.trim()).map(e=>{let t=String(e).match(/^["']?(.+?)["']?$/i);return Array.isArray(t)?t[1]:``}).map(e=>{let t=n.measureText(12).width;return n.font=`12px ${e}, sans-serif`,t===n.measureText(`font-test`).width?!1:e}).filter(e=>e!==!1)[0];return zi.set(e,r),r},Vi=e=>{let t={},n=e.split(` `).map(e=>parseInt(e));switch(n.length){case 1:t={top:n[0],right:n[0],bottom:n[0],left:n[0]};break;case 2:t={top:n[0],right:n[1],bottom:n[0],left:n[1]};break;case 4:t={top:n[0],right:n[1],bottom:n[2],left:n[3]};break}return t},Hi=e=>{let t=e.getAttributeNames();return ki.reduce((n,r)=>(t.includes(r)&&n.push({prop:r,value:e.getAttribute(r)}),r===`aria-*`&&t.forEach(t=>{t.includes(`aria`)&&n.push({prop:t,value:e.getAttribute(t)})}),n),[])},Ui=e=>{let{fontSize:t=Oi.fontSize,fontWeight:n=Oi.fontWeight}=ji(e).reduce((e,t)=>(e[t.prop]=t.value,e),{});return Ai.some(e=>parseFloat(t)>=parseFloat(e.fontSize)&&parseFloat(n)>=parseFloat(e.fontWeight))?`Large`:`Small`},Wi=(e=``)=>e.replace(/([A-Z])/g,e=>`-`+e.toLowerCase()),Gi=e=>{let t=[],n=e;for(;n;)t.push(n),n=n.parentNode?n.parentNode:!1;return t.reduce((t,n)=>`
    ${t}${n.tagName}_${n.className}_${[...e.parentNode.children].indexOf(e)}_${e.children.length}
  `,``)},Ki=(e,t=!1)=>{if(!e.className)return``;let n=Array.from(e.classList).reduce((e,t)=>e+=`.`+qi(t),``);return t&&n.length>30?n.substring(0,30)+`...`:n},qi=e=>Array.from(e).map(e=>/[0-9a-zA-Z_\s-]/.test(e)?e:`\\${e}`).join(``),K=window.navigator.platform.includes(`Mac`)?`cmd`:`ctrl`,Ji=window.navigator.platform.includes(`Mac`)?`opt`:`alt`,Yi=`:not(dom-inspector-mcp):not(vis-bug):not(script):not(hotkey-map):not(.visbug-metatip):not(visbug-label):not(visbug-handles):not(visbug-corners):not(visbug-grip):not(visbug-gridlines)`,Xi=(e,t)=>{let n=document.elementFromPoint(e,t),r=n=>{if(n.shadowRoot){let i=n.shadowRoot.elementFromPoint(e,t);return i==n?n:i.shadowRoot?r(i):i}else return n};return r(n)||n},Zi=e=>{let t=e.split(`+`).pop().replace(/^\w/,e=>e.toUpperCase());return t==`Up`&&(t=`Top`),t==`Down`&&(t=`Bottom`),t},Qi=e=>[...e.parentElement.parentElement.children].indexOf(e.parentElement);function $i(e){return e.animate([{outline:`1px solid transparent`},{outline:`1px solid hsla(330, 100%, 71%, 80%)`},{outline:`1px solid transparent`}],600)}let ea={};const ta=(e,t=750)=>(e.setAttribute(`data-selected-hide`,!0),na(e,!0),ea[Gi(e)]&&clearTimeout(ea[Gi(e)]),ea[Gi(e)]=setTimeout(t=>{e.removeAttribute(`data-selected-hide`),na(e,!1)},t),e),na=(e,t=!1)=>{if(!e.hasAttribute(`data-label-id`))return;let n=e.getAttribute(`data-label-id`),r=B(`
    visbug-label[data-label-id="${n}"],
    visbug-handles[data-label-id="${n}"]
  `);r.length&&t?r.forEach(e=>e.style.display=`none`):r.forEach(e=>e.style.display=null)},ra=(e=``)=>new DOMParser().parseFromString(e,`text/html`).body.firstChild,ia=e=>{let t=e.getRootNode&&e.getRootNode();for(;t&&t.host;){if(t.host.tagName===`DOM-INSPECTOR-MCP`)return!0;t=t.host.getRootNode()}return!1},aa=e=>e.closest&&(ia(e)||e.closest(`vis-bug`)||e.closest(`hotkey-map`)||e.closest(`visbug-metatip`)||e.closest(`visbug-ally`)||e.closest(`visbug-label`)||e.closest(`visbug-handles`)||e.closest(`visbug-corners`)||e.closest(`visbug-grip`)||e.closest(`visbug-gridlines`)),oa=(e=>(t=>{try{e(t)}catch{return!1}return!0}))(e=>document.createDocumentFragment().querySelector(e)),sa=(e,t)=>{var n=document.createElement(`div`);e.parentNode.insertBefore(n,e),t.parentNode.insertBefore(e,t),n.parentNode.insertBefore(t,n),n.parentNode.removeChild(n)},ca=(e,t)=>{let n=e.parentNode?e.parentNode:document.body;if(!n)throw Error(`The node must already be attached`);let r=new MutationObserver(n=>{for(let i of n)for(let n of i.removedNodes)n===e&&(r.disconnect(),t())});r.observe(n,{childList:!0})};function la(){let e=window.innerHeight,t=window.innerWidth,n=document.documentElement.clientWidth;return{winHeight:e,winWidth:n<=t?n:t}}const ua=e=>{do if(window.getComputedStyle(e).position==`fixed`)return!0;while(e=e.offsetParent);return!1},da=(e,t,n,r)=>{let i=n?[t,hi,n]:[t,hi],a=r?[t,yi,r]:[t,yi];return n=>{n===`light`?e.adoptedStyleSheets=i:n===`dark`?e.adoptedStyleSheets=a:e.adoptedStyleSheets=[t]}};function q(e,t){let n=e.length;Array.isArray(e[0])||(e=[e]),Array.isArray(t[0])||(t=t.map(e=>[e]));let r=t[0].length,i=t[0].map((e,n)=>t.map(e=>e[n])),a=e.map(e=>i.map(t=>{let n=0;if(!Array.isArray(e)){for(let r of t)n+=e*r;return n}for(let r=0;r<e.length;r++)n+=e[r]*(t[r]||0);return n}));return n===1&&(a=a[0]),r===1?a.map(e=>e[0]):a}function fa(e){return pa(e)===`string`}function pa(e){return(Object.prototype.toString.call(e).match(/^\[object\s+(.*?)\]$/)[1]||``).toLowerCase()}function ma(e,{precision:t,unit:n}){return ha(e)?`none`:_a(e,t)+(n??``)}function ha(e){return Number.isNaN(e)||e instanceof Number&&e?.none}function ga(e){return ha(e)?0:e}function _a(e,t){if(e===0)return 0;let n=~~e,r=0;n&&t&&(r=~~Math.log10(Math.abs(n))+1);let i=10**(t-r);return Math.floor(e*i+.5)/i}const va={deg:1,grad:.9,rad:180/Math.PI,turn:360};function ya(e){if(!e)return;e=e.trim();let t=/^([a-z]+)\((.+?)\)$/i,n=/^-?[\d.]+$/,r=/%|deg|g?rad|turn$/,i=/\/?\s*(none|[-\w.]+(?:%|deg|g?rad|turn)?)/g,a=e.match(t);if(a){let e=[];return a[2].replace(i,(t,i)=>{let a=i.match(r),o=i;if(a){let e=a[0],t=o.slice(0,-e.length);e===`%`?(o=new Number(t/100),o.type=`<percentage>`):(o=new Number(t*va[e]),o.type=`<angle>`,o.unit=e)}else n.test(o)?(o=new Number(o),o.type=`<number>`):o===`none`&&(o=new Number(NaN),o.none=!0);t.startsWith(`/`)&&(o=o instanceof Number?o:new Number(o),o.alpha=!0),typeof o==`object`&&o instanceof Number&&(o.raw=i),e.push(o)}),{name:a[1].toLowerCase(),rawName:a[1],rawArgs:a[2],args:e}}}function ba(e){return e[e.length-1]}function xa(e,t,n){return isNaN(e)?t:isNaN(t)?e:e+(t-e)*n}function Sa(e,t,n){return(n-e)/(t-e)}function Ca(e,t,n){return xa(t[0],t[1],Sa(e[0],e[1],n))}function wa(e){return e.map(e=>e.split(`|`).map(e=>{e=e.trim();let t=e.match(/^(<[a-z]+>)\[(-?[.\d]+),\s*(-?[.\d]+)\]?$/);if(t){let e=new String(t[1]);return e.range=[+t[2],+t[3]],e}return e}))}function Ta(e,t,n){return Math.max(Math.min(n,t),e)}function Ea(e,t){return Math.sign(e)===Math.sign(t)?e:-e}function Da(e,t){return Ea(Math.abs(e)**t,e)}function Oa(e,t){return t===0?0:e/t}function ka(e,t,n=0,r=e.length){for(;n<r;){let i=n+r>>1;e[i]<t?n=i+1:r=i}return n}var Aa=Object.freeze({__proto__:null,bisectLeft:ka,clamp:Ta,copySign:Ea,interpolate:xa,interpolateInv:Sa,isNone:ha,isString:fa,last:ba,mapRange:Ca,multiplyMatrices:q,parseCoordGrammar:wa,parseFunction:ya,serializeNumber:ma,skipNone:ga,spow:Da,toPrecision:_a,type:pa,zdiv:Oa});const ja=new class{add(e,t,n){if(typeof arguments[0]!=`string`){for(var e in arguments[0])this.add(e,arguments[0][e],arguments[1]);return}(Array.isArray(e)?e:[e]).forEach(function(e){this[e]=this[e]||[],t&&this[e][n?`unshift`:`push`](t)},this)}run(e,t){this[e]=this[e]||[],this[e].forEach(function(e){e.call(t&&t.context?t.context:t,t)})}};var Ma={gamut_mapping:`css`,precision:5,deltaE:`76`,verbose:globalThis?.process?.env?.NODE_ENV?.toLowerCase()!==`test`,warn:function(e){this.verbose&&globalThis?.console?.warn?.(e)}};const Na={D50:[.3457/.3585,1,.2958/.3585],D65:[.3127/.329,1,.3583/.329]};function Pa(e){return Array.isArray(e)?e:Na[e]}function Fa(e,t,n,r={}){if(e=Pa(e),t=Pa(t),!e||!t)throw TypeError(`Missing white point to convert ${e?``:`from`}${!e&&!t?`/`:``}${t?``:`to`}`);if(e===t)return n;let i={W1:e,W2:t,XYZ:n,options:r};if(ja.run(`chromatic-adaptation-start`,i),i.M||(i.W1===Na.D65&&i.W2===Na.D50?i.M=[[1.0479297925449969,.022946870601609652,-.05019226628920524],[.02962780877005599,.9904344267538799,-.017073799063418826],[-.009243040646204504,.015055191490298152,.7518742814281371]]:i.W1===Na.D50&&i.W2===Na.D65&&(i.M=[[.955473421488075,-.02309845494876471,.06325924320057072],[-.0283697093338637,1.0099953980813041,.021041441191917323],[.012314014864481998,-.020507649298898964,1.330365926242124]])),ja.run(`chromatic-adaptation-end`,i),i.M)return q(i.M,i.XYZ);throw TypeError(`Only Bradford CAT with white points D50 and D65 supported for now.`)}const Ia=new Set([`<number>`,`<percentage>`,`<angle>`]);function La(e,t,n,r){return Object.entries(e.coords).map(([e,i],a)=>{let o=t.coordGrammar[a],s=r[a],c=s?.type,l;if(l=s.none?o.find(e=>Ia.has(e)):o.find(e=>e==c),!l){let t=i.name||e;throw TypeError(`${c??s.raw} not allowed for ${t} in ${n}()`)}let u=l.range;c===`<percentage>`&&(u||=[0,1]);let d=i.range||i.refRange;return u&&d&&(r[a]=Ca(u,d,r[a])),l})}function Ra(e,{meta:t}={}){let n={str:String(e)?.trim()};if(ja.run(`parse-start`,n),n.color)return n.color;if(n.parsed=ya(n.str),n.parsed){let e=n.parsed.name;if(e===`color`){let e=n.parsed.args.shift(),r=e.startsWith(`--`)?e.substring(2):`--${e}`,i=[e,r],a=n.parsed.rawArgs.indexOf(`/`)>0?n.parsed.args.pop():1;for(let r of Y.all){let o=r.getFormat(`color`);if(o&&(i.includes(o.id)||o.ids?.filter(e=>i.includes(e)).length)){let i=Object.keys(r.coords).map((e,t)=>n.parsed.args[t]||0),s;return o.coordGrammar&&(s=La(r,o,`color`,i)),t&&Object.assign(t,{formatId:`color`,types:s}),o.id.startsWith(`--`)&&!e.startsWith(`--`)&&Ma.warn(`${r.name} is a non-standard space and not currently supported in the CSS spec. Use prefixed color(${o.id}) instead of color(${e}).`),e.startsWith(`--`)&&!o.id.startsWith(`--`)&&Ma.warn(`${r.name} is a standard space and supported in the CSS spec. Use color(${o.id}) instead of prefixed color(${e}).`),{spaceId:r.id,coords:i,alpha:a}}}let o=``,s=e in Y.registry?e:r;if(s in Y.registry){let e=Y.registry[s].formats?.color?.id;e&&(o=`Did you mean color(${e})?`)}throw TypeError(`Cannot parse color(${e}). `+(o||`Missing a plugin?`))}else for(let r of Y.all){let i=r.getFormat(e);if(i&&i.type===`function`){let a=1;(i.lastAlpha||ba(n.parsed.args).alpha)&&(a=n.parsed.args.pop());let o=n.parsed.args,s;return i.coordGrammar&&(s=La(r,i,e,o)),t&&Object.assign(t,{formatId:i.name,types:s}),{spaceId:r.id,coords:o,alpha:a}}}}else for(let e of Y.all)for(let r in e.formats){let i=e.formats[r];if(i.type!==`custom`||i.test&&!i.test(n.str))continue;let a=i.parse(n.str);if(a)return a.alpha??=1,t&&(t.formatId=r),a}throw TypeError(`Could not parse ${e} as a color. Missing a plugin?`)}function J(e){if(Array.isArray(e))return e.map(J);if(!e)throw TypeError(`Empty color reference`);fa(e)&&(e=Ra(e));let t=e.space||e.spaceId;return t instanceof Y||(e.space=Y.get(t)),e.alpha===void 0&&(e.alpha=1),e}var Y=class e{constructor(t){this.id=t.id,this.name=t.name,this.base=t.base?e.get(t.base):null,this.aliases=t.aliases,this.base&&(this.fromBase=t.fromBase,this.toBase=t.toBase);let n=t.coords??this.base.coords;for(let e in n)`name`in n[e]||(n[e].name=e);for(let e in this.coords=n,this.white=Pa(t.white??this.base.white??`D65`),this.formats=t.formats??{},this.formats){let t=this.formats[e];t.type||=`function`,t.name||=e}this.formats.color?.id||(this.formats.color={...this.formats.color??{},id:t.cssId||this.id}),t.gamutSpace?this.gamutSpace=t.gamutSpace===`self`?this:e.get(t.gamutSpace):this.isPolar?this.gamutSpace=this.base:this.gamutSpace=this,this.gamutSpace.isUnbounded&&(this.inGamut=(e,t)=>!0),this.referred=t.referred,Object.defineProperty(this,`path`,{value:za(this).reverse(),writable:!1,enumerable:!0,configurable:!0}),ja.run(`colorspace-init-end`,this)}inGamut(e,{epsilon:t=75e-6}={}){if(!this.equals(this.gamutSpace))return e=this.to(this.gamutSpace,e),this.gamutSpace.inGamut(e,{epsilon:t});let n=Object.values(this.coords);return e.every((e,r)=>{let i=n[r];if(i.type!==`angle`&&i.range){if(Number.isNaN(e))return!0;let[n,r]=i.range;return(n===void 0||e>=n-t)&&(r===void 0||e<=r+t)}return!0})}get isUnbounded(){return Object.values(this.coords).every(e=>!(`range`in e))}get cssId(){return this.formats?.color?.id||this.id}get isPolar(){for(let e in this.coords)if(this.coords[e].type===`angle`)return!0;return!1}getFormat(e){if(typeof e==`object`)return e=Ba(e,this),e;let t;return t=e===`default`?Object.values(this.formats)[0]:this.formats[e],t?(t=Ba(t,this),t):null}equals(e){return e?this===e||this.id===e||this.id===e.id:!1}to(t,n){if(arguments.length===1){let e=J(t);[t,n]=[e.space,e.coords]}if(t=e.get(t),this.equals(t))return n;n=n.map(e=>Number.isNaN(e)?0:e);let r=this.path,i=t.path,a,o;for(let e=0;e<r.length&&r[e].equals(i[e]);e++)a=r[e],o=e;if(!a)throw Error(`Cannot convert between color spaces ${this} and ${t}: no connection space was found`);for(let e=r.length-1;e>o;e--)n=r[e].toBase(n);for(let e=o+1;e<i.length;e++)n=i[e].fromBase(n);return n}from(t,n){if(arguments.length===1){let e=J(t);[t,n]=[e.space,e.coords]}return t=e.get(t),t.to(this,n)}toString(){return`${this.name} (${this.id})`}getMinCoords(){let e=[];for(let t in this.coords){let n=this.coords[t],r=n.range||n.refRange;e.push(r?.min??0)}return e}static registry={};static get all(){return[...new Set(Object.values(e.registry))]}static register(e,t){if(arguments.length===1&&(t=arguments[0],e=t.id),t=this.get(t),this.registry[e]&&this.registry[e]!==t)throw Error(`Duplicate color space registration: '${e}'`);if(this.registry[e]=t,arguments.length===1&&t.aliases)for(let e of t.aliases)this.register(e,t);return t}static get(t,...n){if(!t||t instanceof e)return t;if(pa(t)===`string`){let n=e.registry[t.toLowerCase()];if(!n)throw TypeError(`No color space found with id = "${t}"`);return n}if(n.length)return e.get(...n);throw TypeError(`${t} is not a valid color space`)}static resolveCoord(t,n){let r=pa(t),i,a;if(r===`string`?t.includes(`.`)?[i,a]=t.split(`.`):[i,a]=[,t]:Array.isArray(t)?[i,a]=t:(i=t.space,a=t.coordId),i=e.get(i),i||=n,!i)throw TypeError(`Cannot resolve coordinate reference ${t}: No color space specified and relative references are not allowed here`);if(r=pa(a),r===`number`||r===`string`&&a>=0){let e=Object.entries(i.coords)[a];if(e)return{space:i,id:e[0],index:a,...e[1]}}i=e.get(i);let o=a.toLowerCase(),s=0;for(let e in i.coords){let t=i.coords[e];if(e.toLowerCase()===o||t.name?.toLowerCase()===o)return{space:i,id:e,index:s,...t};s++}throw TypeError(`No "${a}" coordinate found in ${i.name}. Its coordinates are: ${Object.keys(i.coords).join(`, `)}`)}static DEFAULT_FORMAT={type:`functions`,name:`color`}};function za(e){let t=[e];for(let n=e;n=n.base;)t.push(n);return t}function Ba(e,{coords:t}={}){if(e.coords&&!e.coordGrammar){e.type||=`function`,e.name||=`color`,e.coordGrammar=wa(e.coords);let n=Object.entries(t).map(([t,n],r)=>{let i=e.coordGrammar[r][0],a=n.range||n.refRange,o=i.range,s=``;return i==`<percentage>`?(o=[0,100],s=`%`):i==`<angle>`&&(s=`deg`),{fromRange:a,toRange:o,suffix:s}});e.serializeCoords=(e,t)=>e.map((e,r)=>{let{fromRange:i,toRange:a,suffix:o}=n[r];return i&&a&&(e=Ca(i,a,e)),e=ma(e,{precision:t,unit:o}),e})}return e}var Va=new Y({id:`xyz-d65`,name:`XYZ D65`,coords:{x:{name:`X`},y:{name:`Y`},z:{name:`Z`}},white:`D65`,formats:{color:{ids:[`xyz-d65`,`xyz`]}},aliases:[`xyz`]}),Ha=class extends Y{constructor(e){e.coords||={r:{range:[0,1],name:`Red`},g:{range:[0,1],name:`Green`},b:{range:[0,1],name:`Blue`}},e.base||=Va,e.toXYZ_M&&e.fromXYZ_M&&(e.toBase??=t=>{let n=q(e.toXYZ_M,t);return this.white!==this.base.white&&(n=Fa(this.white,this.base.white,n)),n},e.fromBase??=t=>(t=Fa(this.base.white,this.white,t),q(e.fromXYZ_M,t))),e.referred??=`display`,super(e)}};function Ua(e,t){return e=J(e),!t||e.space.equals(t)?e.coords.slice():(t=Y.get(t),t.from(e))}function Wa(e,t){e=J(e);let{space:n,index:r}=Y.resolveCoord(t,e.space);return Ua(e,n)[r]}function Ga(e,t,n){return e=J(e),t=Y.get(t),e.coords=t.to(e.space,n),e}Ga.returns=`color`;function Ka(e,t,n){if(e=J(e),arguments.length===2&&pa(arguments[1])===`object`){let t=arguments[1];for(let n in t)Ka(e,n,t[n])}else{typeof n==`function`&&(n=n(Wa(e,t)));let{space:r,index:i}=Y.resolveCoord(t,e.space),a=Ua(e,r);a[i]=n,Ga(e,r,a)}return e}Ka.returns=`color`;var qa=new Y({id:`xyz-d50`,name:`XYZ D50`,white:`D50`,base:Va,fromBase:e=>Fa(Va.white,`D50`,e),toBase:e=>Fa(`D50`,Va.white,e)});const Ja=24/116,Ya=24389/27;let Xa=Na.D50;var Za=new Y({id:`lab`,name:`Lab`,coords:{l:{refRange:[0,100],name:`Lightness`},a:{refRange:[-125,125]},b:{refRange:[-125,125]}},white:Xa,base:qa,fromBase(e){let t=e.map((e,t)=>e/Xa[t]).map(e=>e>.008856451679035631?Math.cbrt(e):(Ya*e+16)/116);return[116*t[1]-16,500*(t[0]-t[1]),200*(t[1]-t[2])]},toBase(e){let t=[];return t[1]=(e[0]+16)/116,t[0]=e[1]/500+t[1],t[2]=t[1]-e[2]/200,[t[0]>Ja?t[0]**3:(116*t[0]-16)/Ya,e[0]>8?((e[0]+16)/116)**3:e[0]/Ya,t[2]>Ja?t[2]**3:(116*t[2]-16)/Ya].map((e,t)=>e*Xa[t])},formats:{lab:{coords:[`<number> | <percentage>`,`<number> | <percentage>[-1,1]`,`<number> | <percentage>[-1,1]`]}}});function Qa(e){return(e%360+360)%360}function $a(e,t){if(e===`raw`)return t;let[n,r]=t.map(Qa),i=r-n;return e===`increasing`?i<0&&(r+=360):e===`decreasing`?i>0&&(n+=360):e===`longer`?-180<i&&i<180&&(i>0?n+=360:r+=360):e===`shorter`&&(i>180?n+=360:i<-180&&(r+=360)),[n,r]}var eo=new Y({id:`lch`,name:`LCH`,coords:{l:{refRange:[0,100],name:`Lightness`},c:{refRange:[0,150],name:`Chroma`},h:{refRange:[0,360],type:`angle`,name:`Hue`}},base:Za,fromBase(e){let[t,n,r]=e,i,a=.02;return i=Math.abs(n)<a&&Math.abs(r)<a?NaN:Math.atan2(r,n)*180/Math.PI,[t,Math.sqrt(n**2+r**2),Qa(i)]},toBase(e){let[t,n,r]=e;return n<0&&(n=0),isNaN(r)&&(r=0),[t,n*Math.cos(r*Math.PI/180),n*Math.sin(r*Math.PI/180)]},formats:{lch:{coords:[`<number> | <percentage>`,`<number> | <percentage>`,`<number> | <angle>`]}}});const to=25**7,no=Math.PI,ro=180/no,io=no/180;function ao(e){let t=e*e;return t*t*t*e}function oo(e,t,{kL:n=1,kC:r=1,kH:i=1}={}){[e,t]=J([e,t]);let[a,o,s]=Za.from(e),c=eo.from(Za,[a,o,s])[1],[l,u,d]=Za.from(t),f=eo.from(Za,[l,u,d])[1];c<0&&(c=0),f<0&&(f=0);let p=ao((c+f)/2),m=.5*(1-Math.sqrt(p/(p+to))),h=(1+m)*o,g=(1+m)*u,_=Math.sqrt(h**2+s**2),v=Math.sqrt(g**2+d**2),y=h===0&&s===0?0:Math.atan2(s,h),b=g===0&&d===0?0:Math.atan2(d,g);y<0&&(y+=2*no),b<0&&(b+=2*no),y*=ro,b*=ro;let x=l-a,S=v-_,C=b-y,w=y+b,T=Math.abs(C),E;_*v===0?E=0:T<=180?E=C:C>180?E=C-360:C<-180?E=C+360:Ma.warn(`the unthinkable has happened`);let D=2*Math.sqrt(v*_)*Math.sin(E*io/2),O=(a+l)/2,k=(_+v)/2,A=ao(k),j;j=_*v===0?w:T<=180?w/2:w<360?(w+360)/2:(w-360)/2;let M=(O-50)**2,ee=1+.015*M/Math.sqrt(20+M),N=1+.045*k,P=1;P-=.17*Math.cos((j-30)*io),P+=.24*Math.cos(2*j*io),P+=.32*Math.cos((3*j+6)*io),P-=.2*Math.cos((4*j-63)*io);let te=1+.015*k*P,ne=30*Math.exp(-1*((j-275)/25)**2),re=2*Math.sqrt(A/(A+to)),ie=-1*Math.sin(2*ne*io)*re,F=(x/(n*ee))**2;return F+=(S/(r*N))**2,F+=(D/(i*te))**2,F+=ie*(S/(r*N))*(D/(i*te)),Math.sqrt(F)}const so=[[.819022437996703,.3619062600528904,-.1288737815209879],[.0329836539323885,.9292868615863434,.0361446663506424],[.0481771893596242,.2642395317527308,.6335478284694309]],co=[[1.2268798758459243,-.5578149944602171,.2813910456659647],[-.0405757452148008,1.112286803280317,-.0717110580655164],[-.0763729366746601,-.4214933324022432,1.5869240198367816]],lo=[[.210454268309314,.7936177747023054,-.0040720430116193],[1.9779985324311684,-2.42859224204858,.450593709617411],[.0259040424655478,.7827717124575296,-.8086757549230774]],uo=[[1,.3963377773761749,.2158037573099136],[1,-.1055613458156586,-.0638541728258133],[1,-.0894841775298119,-1.2914855480194092]];var fo=new Y({id:`oklab`,name:`Oklab`,coords:{l:{refRange:[0,1],name:`Lightness`},a:{refRange:[-.4,.4]},b:{refRange:[-.4,.4]}},white:`D65`,base:Va,fromBase(e){return q(lo,q(so,e).map(e=>Math.cbrt(e)))},toBase(e){return q(co,q(uo,e).map(e=>e**3))},formats:{oklab:{coords:[`<percentage> | <number>`,`<number> | <percentage>[-1,1]`,`<number> | <percentage>[-1,1]`]}}});function po(e,t){[e,t]=J([e,t]);let[n,r,i]=fo.from(e),[a,o,s]=fo.from(t),c=n-a,l=r-o,u=i-s;return Math.sqrt(c**2+l**2+u**2)}function mo(e,t,{epsilon:n=75e-6}={}){e=J(e),t||=e.space,t=Y.get(t);let r=e.coords;return t!==e.space&&(r=t.from(e)),t.inGamut(r,{epsilon:n})}function ho(e){return{space:e.space,coords:e.coords.slice(),alpha:e.alpha}}function go(e,t,n=`lab`){n=Y.get(n);let r=n.from(e),i=n.from(t);return Math.sqrt(r.reduce((e,t,n)=>{let r=i[n];return isNaN(t)||isNaN(r)?e:e+(r-t)**2},0))}function _o(e,t){return go(e,t,`lab`)}const vo=Math.PI/180;function yo(e,t,{l:n=2,c:r=1}={}){[e,t]=J([e,t]);let[i,a,o]=Za.from(e),[,s,c]=eo.from(Za,[i,a,o]),[l,u,d]=Za.from(t),f=eo.from(Za,[l,u,d])[1];s<0&&(s=0),f<0&&(f=0);let p=i-l,m=s-f,h=a-u,g=o-d,_=h**2+g**2-m**2,v=.511;i>=16&&(v=.040975*i/(1+.01765*i));let y=.0638*s/(1+.0131*s)+.638,b;Number.isNaN(c)&&(c=0),b=c>=164&&c<=345?.56+Math.abs(.2*Math.cos((c+168)*vo)):.36+Math.abs(.4*Math.cos((c+35)*vo));let x=s**4,S=Math.sqrt(x/(x+1900)),C=y*(S*b+1-S),w=(p/(n*v))**2;return w+=(m/(r*y))**2,w+=_/C**2,Math.sqrt(w)}var bo=new Y({id:`xyz-abs-d65`,cssId:`--xyz-abs-d65`,name:`Absolute XYZ D65`,coords:{x:{refRange:[0,9504.7],name:`Xa`},y:{refRange:[0,1e4],name:`Ya`},z:{refRange:[0,10888.3],name:`Za`}},base:Va,fromBase(e){return e.map(e=>Math.max(e*203,0))},toBase(e){return e.map(e=>Math.max(e/203,0))}});const xo=1.15,So=.66,Co=2610/2**14,wo=2**14/2610,To=3424/2**12,Eo=2413/2**7,Do=2392/2**7,Oo=2**5/(1.7*2523),ko=-.56,Ao=16295499532821565e-27,jo=[[.41478972,.579999,.014648],[-.20151,1.120649,.0531008],[-.0166008,.2648,.6684799]],Mo=[[1.9242264357876067,-1.0047923125953657,.037651404030618],[.35031676209499907,.7264811939316552,-.06538442294808501],[-.09098281098284752,-.3127282905230739,1.5227665613052603]],No=[[.5,.5,0],[3.524,-4.066708,.542708],[.199076,1.096799,-1.295875]],Po=[[1,.1386050432715393,.05804731615611886],[.9999999999999999,-.1386050432715393,-.05804731615611886],[.9999999999999998,-.09601924202631895,-.8118918960560388]];var Fo=new Y({id:`jzazbz`,name:`Jzazbz`,coords:{jz:{refRange:[0,1],name:`Jz`},az:{refRange:[-.5,.5]},bz:{refRange:[-.5,.5]}},base:bo,fromBase(e){let[t,n,r]=e,[i,a,o]=q(No,q(jo,[xo*t-(xo-1)*r,So*n-(So-1)*t,r]).map(function(e){return((To+Eo*(e/1e4)**Co)/(1+Do*(e/1e4)**Co))**134.03437499999998}));return[(1+ko)*i/(1+ko*i)-Ao,a,o]},toBase(e){let[t,n,r]=e,[i,a,o]=q(Mo,q(Po,[(t+Ao)/(1+ko-ko*(t+Ao)),n,r]).map(function(e){return 1e4*((To-e**Oo)/(Do*e**Oo-Eo))**wo})),s=(i+(xo-1)*o)/xo;return[s,(a+(So-1)*s)/So,o]},formats:{color:{coords:[`<number> | <percentage>`,`<number> | <percentage>[-1,1]`,`<number> | <percentage>[-1,1]`]}}}),Io=new Y({id:`jzczhz`,name:`JzCzHz`,coords:{jz:{refRange:[0,1],name:`Jz`},cz:{refRange:[0,1],name:`Chroma`},hz:{refRange:[0,360],type:`angle`,name:`Hue`}},base:Fo,fromBase(e){let[t,n,r]=e,i,a=2e-4;return i=Math.abs(n)<a&&Math.abs(r)<a?NaN:Math.atan2(r,n)*180/Math.PI,[t,Math.sqrt(n**2+r**2),Qa(i)]},toBase(e){return[e[0],e[1]*Math.cos(e[2]*Math.PI/180),e[1]*Math.sin(e[2]*Math.PI/180)]}});function Lo(e,t){[e,t]=J([e,t]);let[n,r,i]=Io.from(e),[a,o,s]=Io.from(t),c=n-a,l=r-o;Number.isNaN(i)&&Number.isNaN(s)?(i=0,s=0):Number.isNaN(i)?i=s:Number.isNaN(s)&&(s=i);let u=i-s,d=2*Math.sqrt(r*o)*Math.sin(u/2*(Math.PI/180));return Math.sqrt(c**2+l**2+d**2)}const Ro=3424/4096,zo=2413/128,Bo=2392/128,Vo=2610/16384,Ho=32/2523,Uo=[[.3592832590121217,.6976051147779502,-.035891593232029],[-.1920808463704993,1.100476797037432,.0753748658519118],[.0070797844607479,.0748396662186362,.8433265453898765]],Wo=[[2048/4096,2048/4096,0],[6610/4096,-13613/4096,7003/4096],[17933/4096,-17390/4096,-543/4096]],Go=[[.9999999999999998,.0086090370379328,.111029625003026],[.9999999999999998,-.0086090370379328,-.1110296250030259],[.9999999999999998,.5600313357106791,-.3206271749873188]],Ko=[[2.0701522183894223,-1.3263473389671563,.2066510476294053],[.3647385209748072,.6805660249472273,-.0453045459220347],[-.0497472075358123,-.0492609666966131,1.1880659249923042]];var qo=new Y({id:`ictcp`,name:`ICTCP`,coords:{i:{refRange:[0,1],name:`I`},ct:{refRange:[-.5,.5],name:`CT`},cp:{refRange:[-.5,.5],name:`CP`}},base:bo,fromBase(e){return Jo(q(Uo,e))},toBase(e){return q(Ko,Yo(e))}});function Jo(e){return q(Wo,e.map(function(e){return((Ro+zo*(e/1e4)**Vo)/(1+Bo*(e/1e4)**Vo))**78.84375}))}function Yo(e){return q(Go,e).map(function(e){return 1e4*(Math.max(e**Ho-Ro,0)/(zo-Bo*e**Ho))**6.277394636015326})}function Xo(e,t){[e,t]=J([e,t]);let[n,r,i]=qo.from(e),[a,o,s]=qo.from(t);return 720*Math.sqrt((n-a)**2+.25*(r-o)**2+(i-s)**2)}const Zo=Na.D65,Qo=.42,$o=1/Qo,es=2*Math.PI,ts=[[.401288,.650173,-.051461],[-.250268,1.204414,.045854],[-.002079,.048952,.953127]],ns=[[1.8620678550872327,-1.0112546305316843,.14918677544445175],[.38752654323613717,.6214474419314753,-.008973985167612518],[-.015841498849333856,-.03412293802851557,1.0499644368778496]],rs=[[460,451,288],[460,-891,-261],[460,-220,-6300]],is={dark:[.8,.525,.8],dim:[.9,.59,.9],average:[1,.69,1]},as={h:[20.14,90,164.25,237.53,380.14],e:[.8,.7,1,1.2,.8],H:[0,100,200,300,400]},os=180/Math.PI,ss=Math.PI/180;function cs(e,t){return e.map(e=>{let n=Da(t*Math.abs(e)*.01,Qo);return 400*Ea(n,e)/(n+27.13)})}function ls(e,t){let n=100/t*27.13**$o;return e.map(e=>{let t=Math.abs(e);return Ea(n*Da(t/(400-t),$o),e)})}function us(e){let t=Qa(e);t<=as.h[0]&&(t+=360);let n=ka(as.h,t)-1,[r,i]=as.h.slice(n,n+2),[a,o]=as.e.slice(n,n+2),s=as.H[n],c=(t-r)/a;return s+100*c/(c+(i-t)/o)}function ds(e){let t=(e%400+400)%400,n=Math.floor(.01*t);t%=100;let[r,i]=as.h.slice(n,n+2),[a,o]=as.e.slice(n,n+2);return Qa((t*(o*r-a*i)-100*r*o)/(t*(o-a)-100*o))}function fs(e,t,n,r,i){let a={};a.discounting=i,a.refWhite=e,a.surround=r;let o=e.map(e=>e*100);a.la=t,a.yb=n;let s=o[1],c=q(ts,o);r=is[a.surround];let l=r[0];a.c=r[1],a.nc=r[2];let u=(1/(5*a.la+1))**4;a.fl=u*a.la+.1*(1-u)*(1-u)*Math.cbrt(5*a.la),a.flRoot=a.fl**.25,a.n=a.yb/s,a.z=1.48+Math.sqrt(a.n),a.nbb=.725*a.n**-.2,a.ncb=a.nbb;let d=i?1:Math.max(Math.min(l*(1-1/3.6*Math.exp((-a.la-42)/92)),1),0);a.dRgb=c.map(e=>xa(1,s/e,d)),a.dRgbInv=a.dRgb.map(e=>1/e);let f=cs(c.map((e,t)=>e*a.dRgb[t]),a.fl);return a.aW=a.nbb*(2*f[0]+f[1]+.05*f[2]),a}const ps=fs(Zo,64/Math.PI*.2,20,`average`,!1);function ms(e,t){if(!(e.J!==void 0^e.Q!==void 0))throw Error(`Conversion requires one and only one: 'J' or 'Q'`);if(!(e.C!==void 0^e.M!==void 0^e.s!==void 0))throw Error(`Conversion requires one and only one: 'C', 'M' or 's'`);if(!(e.h!==void 0^e.H!==void 0))throw Error(`Conversion requires one and only one: 'h' or 'H'`);if(e.J===0||e.Q===0)return[0,0,0];let n=0;n=e.h===void 0?ds(e.H)*ss:Qa(e.h)*ss;let r=Math.cos(n),i=Math.sin(n),a=0;e.J===void 0?e.Q!==void 0&&(a=.25*t.c*e.Q/((t.aW+4)*t.flRoot)):a=Da(e.J,1/2)*.1;let o=0;e.C===void 0?e.M===void 0?e.s!==void 0&&(o=4e-4*e.s**2*(t.aW+4)/t.c):o=e.M/t.flRoot/a:o=e.C/a;let s=Da(o*(1.64-.29**t.n)**-.73,10/9),c=.25*(Math.cos(n+2)+3.8),l=t.aW*Da(a,2/t.c/t.z),u=5e4/13*t.nc*t.ncb*c,d=l/t.nbb,f=23*(d+.305)*Oa(s,23*u+s*(11*r+108*i));return q(ns,ls(q(rs,[d,f*r,f*i]).map(e=>e*1/1403),t.fl).map((e,n)=>e*t.dRgbInv[n])).map(e=>e/100)}function hs(e,t){let n=cs(q(ts,e.map(e=>e*100)).map((e,n)=>e*t.dRgb[n]),t.fl),r=n[0]+(-12*n[1]+n[2])/11,i=(n[0]+n[1]-2*n[2])/9,a=(Math.atan2(i,r)%es+es)%es,o=.25*(Math.cos(a+2)+3.8),s=Da(5e4/13*t.nc*t.ncb*Oa(o*Math.sqrt(r**2+i**2),n[0]+n[1]+1.05*n[2]+.305),.9)*(1.64-.29**t.n)**.73,c=Da(t.nbb*(2*n[0]+n[1]+.05*n[2])/t.aW,.5*t.c*t.z),l=100*Da(c,2),u=4/t.c*c*(t.aW+4)*t.flRoot,d=s*c,f=d*t.flRoot,p=Qa(a*os),m=us(p);return{J:l,C:d,h:p,s:50*Da(t.c*s/(t.aW+4),1/2),Q:u,M:f,H:m}}var gs=new Y({id:`cam16-jmh`,cssId:`--cam16-jmh`,name:`CAM16-JMh`,coords:{j:{refRange:[0,100],name:`J`},m:{refRange:[0,105],name:`Colorfulness`},h:{refRange:[0,360],type:`angle`,name:`Hue`}},base:Va,fromBase(e){let t=hs(e,ps);return[t.J,t.M,t.h]},toBase(e){return ms({J:e[0],M:e[1],h:e[2]},ps)}});const _s=Na.D65,vs=24389/27;function ys(e){return 116*(e>.008856451679035631?Math.cbrt(e):(vs*e+16)/116)-16}function bs(e){return e>8?((e+16)/116)**3:e/vs}function xs(e,t){let[n,r,i]=e,a=[],o=0;if(i===0)return[0,0,0];let s=bs(i);o=i>0?.00379058511492914*i**2+.608983189401032*i+.9155088574762233:9514440756550361e-21*i**2+.08693057439788597*i-21.928975842194614;let c=0,l=1/0;for(;c<=15;){a=ms({J:o,C:r,h:n},t);let e=Math.abs(a[1]-s);if(e<l){if(e<=2e-12)return a;l=e}o-=(a[1]-s)*o/(2*a[1]),c+=1}return ms({J:o,C:r,h:n},t)}function Ss(e,t){let n=ys(e[1]);if(n===0)return[0,0,0];let r=hs(e,Cs);return[Qa(r.h),r.C,n]}const Cs=fs(_s,200/Math.PI*bs(50),bs(50)*100,`average`,!1);var ws=new Y({id:`hct`,name:`HCT`,coords:{h:{refRange:[0,360],type:`angle`,name:`Hue`},c:{refRange:[0,145],name:`Colorfulness`},t:{refRange:[0,100],name:`Tone`}},base:Va,fromBase(e){return Ss(e)},toBase(e){return xs(e,Cs)},formats:{color:{id:`--hct`,coords:[`<number> | <angle>`,`<percentage> | <number>`,`<percentage> | <number>`]}}});const Ts=Math.PI/180,Es=[1,.007,.0228];function Ds(e){e[1]<0&&(e=ws.fromBase(ws.toBase(e)));let t=Math.log(Math.max(1+Es[2]*e[1]*Cs.flRoot,1))/Es[2],n=e[0]*Ts,r=t*Math.cos(n),i=t*Math.sin(n);return[e[2],r,i]}function Os(e,t){[e,t]=J([e,t]);let[n,r,i]=Ds(ws.from(e)),[a,o,s]=Ds(ws.from(t));return Math.sqrt((n-a)**2+(r-o)**2+(i-s)**2)}var ks={deltaE76:_o,deltaECMC:yo,deltaE2000:oo,deltaEJz:Lo,deltaEITP:Xo,deltaEOK:po,deltaEHCT:Os};function As(e){let t=e?Math.floor(Math.log10(Math.abs(e))):0;return Math.max(parseFloat(`1e${t-2}`),1e-6)}const js={hct:{method:`hct.c`,jnd:2,deltaEMethod:`hct`,blackWhiteClamp:{}},"hct-tonal":{method:`hct.c`,jnd:0,deltaEMethod:`hct`,blackWhiteClamp:{channel:`hct.t`,min:0,max:100}}};function Ms(e,{method:t=Ma.gamut_mapping,space:n=void 0,deltaEMethod:r=``,jnd:i=2,blackWhiteClamp:a={}}={}){if(e=J(e),fa(arguments[1])?n=arguments[1]:n||=e.space,n=Y.get(n),mo(e,n,{epsilon:0}))return e;let o;if(t===`css`)o=Ps(e,{space:n});else{if(t!==`clip`&&!mo(e,n)){Object.prototype.hasOwnProperty.call(js,t)&&({method:t,jnd:i,deltaEMethod:r,blackWhiteClamp:a}=js[t]);let s=oo;if(r!==``){for(let e in ks)if(`deltae`+r.toLowerCase()===e.toLowerCase()){s=ks[e];break}}let c=Ms(X(e,n),{method:`clip`,space:n});if(s(e,c)>i){if(Object.keys(a).length===3){let t=Y.resolveCoord(a.channel),n=Wa(X(e,t.space),t.id);if(ha(n)&&(n=0),n>=a.max)return X({space:`xyz-d65`,coords:Na.D65},e.space);if(n<=a.min)return X({space:`xyz-d65`,coords:[0,0,0]},e.space)}let r=Y.resolveCoord(t),c=r.space,l=r.id,u=X(e,c);u.coords.forEach((e,t)=>{ha(e)&&(u.coords[t]=0)});let d=(r.range||r.refRange)[0],f=As(i),p=d,m=Wa(u,l);for(;m-p>f;){let e=ho(u);e=Ms(e,{space:n,method:`clip`}),s(u,e)-i<f?p=Wa(u,l):m=Wa(u,l),Ka(u,l,(p+m)/2)}o=X(u,n)}else o=c}else o=X(e,n);if(t===`clip`||!mo(o,n,{epsilon:0})){let e=Object.values(n.coords).map(e=>e.range||[]);o.coords=o.coords.map((t,n)=>{let[r,i]=e[n];return r!==void 0&&(t=Math.max(r,t)),i!==void 0&&(t=Math.min(t,i)),t})}}return n!==e.space&&(o=X(o,e.space)),e.coords=o.coords,e}Ms.returns=`color`;const Ns={WHITE:{space:fo,coords:[1,0,0]},BLACK:{space:fo,coords:[0,0,0]}};function Ps(e,{space:t}={}){let n=.02,r=1e-4;e=J(e),t||=e.space,t=Y.get(t);let i=Y.get(`oklch`);if(t.isUnbounded)return X(e,t);let a=X(e,i),o=a.coords[0];if(o>=1){let n=X(Ns.WHITE,t);return n.alpha=e.alpha,X(n,t)}if(o<=0){let n=X(Ns.BLACK,t);return n.alpha=e.alpha,X(n,t)}if(mo(a,t,{epsilon:0}))return X(a,t);function s(e){let n=X(e,t),r=Object.values(t.coords);return n.coords=n.coords.map((e,t)=>{if(`range`in r[t]){let[n,i]=r[t].range;return Ta(n,e,i)}return e}),n}let c=0,l=a.coords[1],u=!0,d=ho(a),f=s(d),p=po(f,d);if(p<n)return f;for(;l-c>r;){let e=(c+l)/2;if(d.coords[1]=e,u&&mo(d,t,{epsilon:0}))c=e;else if(f=s(d),p=po(f,d),p<n){if(n-p<r)break;u=!1,c=e}else l=e}return f}function X(e,t,{inGamut:n}={}){e=J(e),t=Y.get(t);let r=t.from(e),i={space:t,coords:r,alpha:e.alpha};return n&&(i=Ms(i,n===!0?void 0:n)),i}X.returns=`color`;function Fs(e,{precision:t=Ma.precision,format:n=`default`,inGamut:r=!0,...i}={}){let a;e=J(e);let o=n;n=e.space.getFormat(n)??e.space.getFormat(`default`)??Y.DEFAULT_FORMAT;let s=e.coords.slice();if(r||=n.toGamut,r&&!mo(e)&&(s=Ms(ho(e),r===!0?void 0:r).coords),n.type===`custom`)if(i.precision=t,n.serialize)a=n.serialize(s,e.alpha,i);else throw TypeError(`format ${o} can only be used to parse colors, not for serialization`);else{let r=n.name||`color`;n.serializeCoords?s=n.serializeCoords(s,t):t!==null&&(s=s.map(e=>ma(e,{precision:t})));let i=[...s];if(r===`color`){let t=n.id||n.ids?.[0]||e.space.id;i.unshift(t)}let o=e.alpha;t!==null&&(o=ma(o,{precision:t}));let c=e.alpha>=1||n.noAlpha?``:`${n.commas?`,`:` /`} ${o}`;a=`${r}(${i.join(n.commas?`, `:` `)}${c})`}return a}var Is=new Ha({id:`rec2020-linear`,cssId:`--rec2020-linear`,name:`Linear REC.2020`,white:`D65`,toXYZ_M:[[.6369580483012914,.14461690358620832,.1688809751641721],[.2627002120112671,.6779980715188708,.05930171646986196],[0,.028072693049087428,1.060985057710791]],fromXYZ_M:[[1.716651187971268,-.355670783776392,-.25336628137366],[-.666684351832489,1.616481236634939,.0157685458139111],[.017639857445311,-.042770613257809,.942103121235474]]});const Ls=1.09929682680944,Rs=.018053968510807;var zs=new Ha({id:`rec2020`,name:`REC.2020`,base:Is,toBase(e){return e.map(function(e){return e<Rs*4.5?e/4.5:((e+Ls-1)/Ls)**(1/.45)})},fromBase(e){return e.map(function(e){return e>=Rs?Ls*e**.45-(Ls-1):4.5*e})}}),Bs=new Ha({id:`p3-linear`,cssId:`--display-p3-linear`,name:`Linear P3`,white:`D65`,toXYZ_M:[[.4865709486482162,.26566769316909306,.1982172852343625],[.2289745640697488,.6917385218365064,.079286914093745],[0,.04511338185890264,1.043944368900976]],fromXYZ_M:[[2.493496911941425,-.9313836179191239,-.40271078445071684],[-.8294889695615747,1.7626640603183463,.023624685841943577],[.03584583024378447,-.07617238926804182,.9568845240076872]]});const Vs=[[.41239079926595934,.357584339383878,.1804807884018343],[.21263900587151027,.715168678767756,.07219231536073371],[.01933081871559182,.11919477979462598,.9505321522496607]],Hs=[[3.2409699419045226,-1.537383177570094,-.4986107602930034],[-.9692436362808796,1.8759675015077202,.04155505740717559],[.05563007969699366,-.20397695888897652,1.0569715142428786]];var Us=new Ha({id:`srgb-linear`,name:`Linear sRGB`,white:`D65`,toXYZ_M:Vs,fromXYZ_M:Hs}),Ws={aliceblue:[240/255,248/255,1],antiquewhite:[250/255,235/255,215/255],aqua:[0,1,1],aquamarine:[127/255,1,212/255],azure:[240/255,1,1],beige:[245/255,245/255,220/255],bisque:[1,228/255,196/255],black:[0,0,0],blanchedalmond:[1,235/255,205/255],blue:[0,0,1],blueviolet:[138/255,43/255,226/255],brown:[165/255,42/255,42/255],burlywood:[222/255,184/255,135/255],cadetblue:[95/255,158/255,160/255],chartreuse:[127/255,1,0],chocolate:[210/255,105/255,30/255],coral:[1,127/255,80/255],cornflowerblue:[100/255,149/255,237/255],cornsilk:[1,248/255,220/255],crimson:[220/255,20/255,60/255],cyan:[0,1,1],darkblue:[0,0,139/255],darkcyan:[0,139/255,139/255],darkgoldenrod:[184/255,134/255,11/255],darkgray:[169/255,169/255,169/255],darkgreen:[0,100/255,0],darkgrey:[169/255,169/255,169/255],darkkhaki:[189/255,183/255,107/255],darkmagenta:[139/255,0,139/255],darkolivegreen:[85/255,107/255,47/255],darkorange:[1,140/255,0],darkorchid:[153/255,50/255,204/255],darkred:[139/255,0,0],darksalmon:[233/255,150/255,122/255],darkseagreen:[143/255,188/255,143/255],darkslateblue:[72/255,61/255,139/255],darkslategray:[47/255,79/255,79/255],darkslategrey:[47/255,79/255,79/255],darkturquoise:[0,206/255,209/255],darkviolet:[148/255,0,211/255],deeppink:[1,20/255,147/255],deepskyblue:[0,191/255,1],dimgray:[105/255,105/255,105/255],dimgrey:[105/255,105/255,105/255],dodgerblue:[30/255,144/255,1],firebrick:[178/255,34/255,34/255],floralwhite:[1,250/255,240/255],forestgreen:[34/255,139/255,34/255],fuchsia:[1,0,1],gainsboro:[220/255,220/255,220/255],ghostwhite:[248/255,248/255,1],gold:[1,215/255,0],goldenrod:[218/255,165/255,32/255],gray:[128/255,128/255,128/255],green:[0,128/255,0],greenyellow:[173/255,1,47/255],grey:[128/255,128/255,128/255],honeydew:[240/255,1,240/255],hotpink:[1,105/255,180/255],indianred:[205/255,92/255,92/255],indigo:[75/255,0,130/255],ivory:[1,1,240/255],khaki:[240/255,230/255,140/255],lavender:[230/255,230/255,250/255],lavenderblush:[1,240/255,245/255],lawngreen:[124/255,252/255,0],lemonchiffon:[1,250/255,205/255],lightblue:[173/255,216/255,230/255],lightcoral:[240/255,128/255,128/255],lightcyan:[224/255,1,1],lightgoldenrodyellow:[250/255,250/255,210/255],lightgray:[211/255,211/255,211/255],lightgreen:[144/255,238/255,144/255],lightgrey:[211/255,211/255,211/255],lightpink:[1,182/255,193/255],lightsalmon:[1,160/255,122/255],lightseagreen:[32/255,178/255,170/255],lightskyblue:[135/255,206/255,250/255],lightslategray:[119/255,136/255,153/255],lightslategrey:[119/255,136/255,153/255],lightsteelblue:[176/255,196/255,222/255],lightyellow:[1,1,224/255],lime:[0,1,0],limegreen:[50/255,205/255,50/255],linen:[250/255,240/255,230/255],magenta:[1,0,1],maroon:[128/255,0,0],mediumaquamarine:[102/255,205/255,170/255],mediumblue:[0,0,205/255],mediumorchid:[186/255,85/255,211/255],mediumpurple:[147/255,112/255,219/255],mediumseagreen:[60/255,179/255,113/255],mediumslateblue:[123/255,104/255,238/255],mediumspringgreen:[0,250/255,154/255],mediumturquoise:[72/255,209/255,204/255],mediumvioletred:[199/255,21/255,133/255],midnightblue:[25/255,25/255,112/255],mintcream:[245/255,1,250/255],mistyrose:[1,228/255,225/255],moccasin:[1,228/255,181/255],navajowhite:[1,222/255,173/255],navy:[0,0,128/255],oldlace:[253/255,245/255,230/255],olive:[128/255,128/255,0],olivedrab:[107/255,142/255,35/255],orange:[1,165/255,0],orangered:[1,69/255,0],orchid:[218/255,112/255,214/255],palegoldenrod:[238/255,232/255,170/255],palegreen:[152/255,251/255,152/255],paleturquoise:[175/255,238/255,238/255],palevioletred:[219/255,112/255,147/255],papayawhip:[1,239/255,213/255],peachpuff:[1,218/255,185/255],peru:[205/255,133/255,63/255],pink:[1,192/255,203/255],plum:[221/255,160/255,221/255],powderblue:[176/255,224/255,230/255],purple:[128/255,0,128/255],rebeccapurple:[102/255,51/255,153/255],red:[1,0,0],rosybrown:[188/255,143/255,143/255],royalblue:[65/255,105/255,225/255],saddlebrown:[139/255,69/255,19/255],salmon:[250/255,128/255,114/255],sandybrown:[244/255,164/255,96/255],seagreen:[46/255,139/255,87/255],seashell:[1,245/255,238/255],sienna:[160/255,82/255,45/255],silver:[192/255,192/255,192/255],skyblue:[135/255,206/255,235/255],slateblue:[106/255,90/255,205/255],slategray:[112/255,128/255,144/255],slategrey:[112/255,128/255,144/255],snow:[1,250/255,250/255],springgreen:[0,1,127/255],steelblue:[70/255,130/255,180/255],tan:[210/255,180/255,140/255],teal:[0,128/255,128/255],thistle:[216/255,191/255,216/255],tomato:[1,99/255,71/255],turquoise:[64/255,224/255,208/255],violet:[238/255,130/255,238/255],wheat:[245/255,222/255,179/255],white:[1,1,1],whitesmoke:[245/255,245/255,245/255],yellow:[1,1,0],yellowgreen:[154/255,205/255,50/255]};let Gs=[,,,].fill(`<percentage> | <number>[0, 255]`),Ks=[,,,].fill(`<number>[0, 255]`);var qs=new Ha({id:`srgb`,name:`sRGB`,base:Us,fromBase:e=>e.map(e=>{let t=e<0?-1:1,n=e*t;return n>.0031308?t*(1.055*n**(1/2.4)-.055):12.92*e}),toBase:e=>e.map(e=>{let t=e<0?-1:1,n=e*t;return n<=.04045?e/12.92:t*((n+.055)/1.055)**2.4}),formats:{rgb:{coords:Gs},rgb_number:{name:`rgb`,commas:!0,coords:Ks,noAlpha:!0},color:{},rgba:{coords:Gs,commas:!0,lastAlpha:!0},rgba_number:{name:`rgba`,commas:!0,coords:Ks},hex:{type:`custom`,toGamut:!0,test:e=>/^#([a-f0-9]{3,4}){1,2}$/i.test(e),parse(e){e.length<=5&&(e=e.replace(/[a-f0-9]/gi,`$&$&`));let t=[];return e.replace(/[a-f0-9]{2}/gi,e=>{t.push(parseInt(e,16)/255)}),{spaceId:`srgb`,coords:t.slice(0,3),alpha:t.slice(3)[0]}},serialize:(e,t,{collapse:n=!0}={})=>{t<1&&e.push(t),e=e.map(e=>Math.round(e*255));let r=n&&e.every(e=>e%17==0);return`#`+e.map(e=>r?(e/17).toString(16):e.toString(16).padStart(2,`0`)).join(``)}},keyword:{type:`custom`,test:e=>/^[a-z]+$/i.test(e),parse(e){e=e.toLowerCase();let t={spaceId:`srgb`,coords:null,alpha:1};if(e===`transparent`?(t.coords=Ws.black,t.alpha=0):t.coords=Ws[e],t.coords)return t}}}}),Js=new Ha({id:`p3`,cssId:`display-p3`,name:`P3`,base:Bs,fromBase:qs.fromBase,toBase:qs.toBase});Ma.display_space=qs;let Ys;if(typeof CSS<`u`&&CSS.supports)for(let e of[Za,zs,Js]){let t=Fs({space:e,coords:e.getMinCoords(),alpha:1});if(CSS.supports(`color`,t)){Ma.display_space=e;break}}function Xs(e,{space:t=Ma.display_space,...n}={}){let r=Fs(e,n);if(typeof CSS>`u`||CSS.supports(`color`,r)||!Ma.display_space)r=new String(r),r.color=e;else{let i=e;if((e.coords.some(ha)||ha(e.alpha))&&!(Ys??=CSS.supports(`color`,`hsl(none 50% 50%)`))&&(i=ho(e),i.coords=i.coords.map(ga),i.alpha=ga(i.alpha),r=Fs(i,n),CSS.supports(`color`,r)))return r=new String(r),r.color=i,r;i=X(i,t),r=new String(Fs(i,n)),r.color=i}return r}function Zs(e,t){return e=J(e),t=J(t),e.space===t.space&&e.alpha===t.alpha&&e.coords.every((e,n)=>e===t.coords[n])}function Qs(e){return Wa(e,[Va,`y`])}function $s(e,t){Ka(e,[Va,`y`],t)}function ec(e){Object.defineProperty(e.prototype,`luminance`,{get(){return Qs(this)},set(e){$s(this,e)}})}var tc=Object.freeze({__proto__:null,getLuminance:Qs,register:ec,setLuminance:$s});function nc(e,t){e=J(e),t=J(t);let n=Math.max(Qs(e),0),r=Math.max(Qs(t),0);return r>n&&([n,r]=[r,n]),(n+.05)/(r+.05)}const rc=.022,ic=.027;function ac(e){return e>=rc?e:e+(rc-e)**1.414}function oc(e){return(e<0?-1:1)*Math.abs(e)**2.4}function sc(e,t){t=J(t),e=J(e);let n,r,i,a,o,s;t=X(t,`srgb`),[a,o,s]=t.coords;let c=oc(a)*.2126729+oc(o)*.7151522+oc(s)*.072175;e=X(e,`srgb`),[a,o,s]=e.coords;let l=oc(a)*.2126729+oc(o)*.7151522+oc(s)*.072175,u=ac(c),d=ac(l),f=d>u;return Math.abs(d-u)<5e-4?r=0:f?(n=d**.56-u**.57,r=n*1.14):(n=d**.65-u**.62,r=n*1.14),i=Math.abs(r)<.1?0:r>0?r-ic:r+ic,i*100}function cc(e,t){e=J(e),t=J(t);let n=Math.max(Qs(e),0),r=Math.max(Qs(t),0);r>n&&([n,r]=[r,n]);let i=n+r;return i===0?0:(n-r)/i}function lc(e,t){e=J(e),t=J(t);let n=Math.max(Qs(e),0),r=Math.max(Qs(t),0);return r>n&&([n,r]=[r,n]),r===0?5e4:(n-r)/r}function uc(e,t){e=J(e),t=J(t);let n=Wa(e,[Za,`l`]),r=Wa(t,[Za,`l`]);return Math.abs(n-r)}const dc=24/116,fc=24389/27;let pc=Na.D65;var mc=new Y({id:`lab-d65`,name:`Lab D65`,coords:{l:{refRange:[0,100],name:`Lightness`},a:{refRange:[-125,125]},b:{refRange:[-125,125]}},white:pc,base:Va,fromBase(e){let t=e.map((e,t)=>e/pc[t]).map(e=>e>.008856451679035631?Math.cbrt(e):(fc*e+16)/116);return[116*t[1]-16,500*(t[0]-t[1]),200*(t[1]-t[2])]},toBase(e){let t=[];return t[1]=(e[0]+16)/116,t[0]=e[1]/500+t[1],t[2]=t[1]-e[2]/200,[t[0]>dc?t[0]**3:(116*t[0]-16)/fc,e[0]>8?((e[0]+16)/116)**3:e[0]/fc,t[2]>dc?t[2]**3:(116*t[2]-16)/fc].map((e,t)=>e*pc[t])},formats:{"lab-d65":{coords:[`<number> | <percentage>`,`<number> | <percentage>[-1,1]`,`<number> | <percentage>[-1,1]`]}}});const hc=5**.5*.5+.5;function gc(e,t){e=J(e),t=J(t);let n=Wa(e,[mc,`l`]),r=Wa(t,[mc,`l`]),i=Math.abs(n**+hc-r**+hc)**(1/hc)*Math.SQRT2-40;return i<7.5?0:i}var _c=Object.freeze({__proto__:null,contrastAPCA:sc,contrastDeltaPhi:gc,contrastLstar:uc,contrastMichelson:cc,contrastWCAG21:nc,contrastWeber:lc});function vc(e,t,n={}){fa(n)&&(n={algorithm:n});let{algorithm:r,...i}=n;if(!r){let e=Object.keys(_c).map(e=>e.replace(/^contrast/,``)).join(`, `);throw TypeError(`contrast() function needs a contrast algorithm. Please specify one of: ${e}`)}for(let n in e=J(e),t=J(t),_c)if(`contrast`+r.toLowerCase()===n.toLowerCase())return _c[n](e,t,i);throw TypeError(`Unknown contrast algorithm: ${r}`)}function yc(e){let[t,n,r]=Ua(e,Va),i=t+15*n+3*r;return[4*t/i,9*n/i]}function bc(e){let[t,n,r]=Ua(e,Va),i=t+n+r;return[t/i,n/i]}function xc(e){Object.defineProperty(e.prototype,`uv`,{get(){return yc(this)}}),Object.defineProperty(e.prototype,`xy`,{get(){return bc(this)}})}var Sc=Object.freeze({__proto__:null,register:xc,uv:yc,xy:bc});function Cc(e,t,n={}){fa(n)&&(n={method:n});let{method:r=Ma.deltaE,...i}=n;for(let n in ks)if(`deltae`+r.toLowerCase()===n.toLowerCase())return ks[n](e,t,i);throw TypeError(`Unknown deltaE method: ${r}`)}function wc(e,t=.25){return Ka(e,[Y.get(`oklch`,`lch`),`l`],e=>e*(1+t))}function Tc(e,t=.25){return Ka(e,[Y.get(`oklch`,`lch`),`l`],e=>e*(1-t))}var Ec=Object.freeze({__proto__:null,darken:Tc,lighten:wc});function Dc(e,t,n=.5,r={}){return[e,t]=[J(e),J(t)],pa(n)===`object`&&([n,r]=[.5,n]),kc(e,t,r)(n)}function Oc(e,t,n={}){let r;Ac(e)&&([r,n]=[e,t],[e,t]=r.rangeArgs.colors);let{maxDeltaE:i,deltaEMethod:a,steps:o=2,maxSteps:s=1e3,...c}=n;r||=([e,t]=[J(e),J(t)],kc(e,t,c));let l=Cc(e,t),u=i>0?Math.max(o,Math.ceil(l/i)+1):o,d=[];if(s!==void 0&&(u=Math.min(u,s)),u===1)d=[{p:.5,color:r(.5)}];else{let e=1/(u-1);d=Array.from({length:u},(t,n)=>{let i=n*e;return{p:i,color:r(i)}})}if(i>0){let e=d.reduce((e,t,n)=>{if(n===0)return 0;let r=Cc(t.color,d[n-1].color,a);return Math.max(e,r)},0);for(;e>i;){e=0;for(let t=1;t<d.length&&d.length<s;t++){let n=d[t-1],i=d[t],a=(i.p+n.p)/2,o=r(a);e=Math.max(e,Cc(o,n.color),Cc(o,i.color)),d.splice(t,0,{p:a,color:r(a)}),t++}}}return d=d.map(e=>e.color),d}function kc(e,t,n={}){if(Ac(e)){let[n,r]=[e,t];return kc(...n.rangeArgs.colors,{...n.rangeArgs.options,...r})}let{space:r,outputSpace:i,progression:a,premultiplied:o}=n;e=J(e),t=J(t),e=ho(e),t=ho(t);let s={colors:[e,t],options:n};if(r=r?Y.get(r):Y.registry[Ma.interpolationSpace]||e.space,i=i?Y.get(i):r,e=X(e,r),t=X(t,r),e=Ms(e),t=Ms(t),r.coords.h&&r.coords.h.type===`angle`){let i=n.hue=n.hue||`shorter`,a=[r,`h`],[o,s]=[Wa(e,a),Wa(t,a)];isNaN(o)&&!isNaN(s)?o=s:isNaN(s)&&!isNaN(o)&&(s=o),[o,s]=$a(i,[o,s]),Ka(e,a,o),Ka(t,a,s)}return o&&(e.coords=e.coords.map(t=>t*e.alpha),t.coords=t.coords.map(e=>e*t.alpha)),Object.assign(n=>{n=a?a(n):n;let s=e.coords.map((e,r)=>{let i=t.coords[r];return xa(e,i,n)}),c=xa(e.alpha,t.alpha,n),l={space:r,coords:s,alpha:c};return o&&(l.coords=l.coords.map(e=>e/c)),i!==r&&(l=X(l,i)),l},{rangeArgs:s})}function Ac(e){return pa(e)===`function`&&!!e.rangeArgs}Ma.interpolationSpace=`lab`;function jc(e){e.defineFunction(`mix`,Dc,{returns:`color`}),e.defineFunction(`range`,kc,{returns:`function<color>`}),e.defineFunction(`steps`,Oc,{returns:`array<color>`})}var Mc=Object.freeze({__proto__:null,isRange:Ac,mix:Dc,range:kc,register:jc,steps:Oc}),Nc=new Y({id:`hsl`,name:`HSL`,coords:{h:{refRange:[0,360],type:`angle`,name:`Hue`},s:{range:[0,100],name:`Saturation`},l:{range:[0,100],name:`Lightness`}},base:qs,fromBase:e=>{let t=Math.max(...e),n=Math.min(...e),[r,i,a]=e,[o,s,c]=[NaN,0,(n+t)/2],l=t-n;if(l!==0){switch(s=c===0||c===1?0:(t-c)/Math.min(c,1-c),t){case r:o=(i-a)/l+(i<a?6:0);break;case i:o=(a-r)/l+2;break;case a:o=(r-i)/l+4}o*=60}return s<0&&(o+=180,s=Math.abs(s)),o>=360&&(o-=360),[o,s*100,c*100]},toBase:e=>{let[t,n,r]=e;t%=360,t<0&&(t+=360),n/=100,r/=100;function i(e){let i=(e+t/30)%12,a=n*Math.min(r,1-r);return r-a*Math.max(-1,Math.min(i-3,9-i,1))}return[i(0),i(8),i(4)]},formats:{hsl:{coords:[`<number> | <angle>`,`<percentage>`,`<percentage>`]},hsla:{coords:[`<number> | <angle>`,`<percentage>`,`<percentage>`],commas:!0,lastAlpha:!0}}}),Pc=new Y({id:`hsv`,name:`HSV`,coords:{h:{refRange:[0,360],type:`angle`,name:`Hue`},s:{range:[0,100],name:`Saturation`},v:{range:[0,100],name:`Value`}},base:Nc,fromBase(e){let[t,n,r]=e;n/=100,r/=100;let i=r+n*Math.min(r,1-r);return[t,i===0?0:200*(1-r/i),100*i]},toBase(e){let[t,n,r]=e;n/=100,r/=100;let i=r*(1-n/2);return[t,i===0||i===1?0:(r-i)/Math.min(i,1-i)*100,i*100]},formats:{color:{id:`--hsv`,coords:[`<number> | <angle>`,`<percentage> | <number>`,`<percentage> | <number>`]}}}),Fc=new Y({id:`hwb`,name:`HWB`,coords:{h:{refRange:[0,360],type:`angle`,name:`Hue`},w:{range:[0,100],name:`Whiteness`},b:{range:[0,100],name:`Blackness`}},base:Pc,fromBase(e){let[t,n,r]=e;return[t,r*(100-n)/100,100-r]},toBase(e){let[t,n,r]=e;n/=100,r/=100;let i=n+r;if(i>=1)return[t,0,n/i*100];let a=1-r;return[t,(a===0?0:1-n/a)*100,a*100]},formats:{hwb:{coords:[`<number> | <angle>`,`<percentage> | <number>`,`<percentage> | <number>`]}}}),Ic=new Ha({id:`a98rgb-linear`,cssId:`--a98-rgb-linear`,name:`Linear Adobe® 98 RGB compatible`,white:`D65`,toXYZ_M:[[.5766690429101305,.1855582379065463,.1882286462349947],[.29734497525053605,.6273635662554661,.07529145849399788],[.02703136138641234,.07068885253582723,.9913375368376388]],fromXYZ_M:[[2.0415879038107465,-.5650069742788596,-.34473135077832956],[-.9692436362808795,1.8759675015077202,.04155505740717557],[.013444280632031142,-.11836239223101838,1.0151749943912054]]}),Lc=new Ha({id:`a98rgb`,cssId:`a98-rgb`,name:`Adobe® 98 RGB compatible`,base:Ic,toBase:e=>e.map(e=>Math.abs(e)**(563/256)*Math.sign(e)),fromBase:e=>e.map(e=>Math.abs(e)**(256/563)*Math.sign(e))}),Rc=new Ha({id:`prophoto-linear`,cssId:`--prophoto-rgb-linear`,name:`Linear ProPhoto`,white:`D50`,base:qa,toXYZ_M:[[.7977666449006423,.13518129740053308,.0313477341283922],[.2880748288194013,.711835234241873,8993693872564e-17],[0,0,.8251046025104602]],fromXYZ_M:[[1.3457868816471583,-.25557208737979464,-.05110186497554526],[-.5446307051249019,1.5082477428451468,.02052744743642139],[0,0,1.2119675456389452]]}),zc=new Ha({id:`prophoto`,cssId:`prophoto-rgb`,name:`ProPhoto`,base:Rc,toBase(e){return e.map(e=>e<.03125?e/16:e**1.8)},fromBase(e){return e.map(e=>e>=.001953125?e**(1/1.8):16*e)}}),Bc=new Y({id:`oklch`,name:`Oklch`,coords:{l:{refRange:[0,1],name:`Lightness`},c:{refRange:[0,.4],name:`Chroma`},h:{refRange:[0,360],type:`angle`,name:`Hue`}},white:`D65`,base:fo,fromBase(e){let[t,n,r]=e,i,a=2e-4;return i=Math.abs(n)<a&&Math.abs(r)<a?NaN:Math.atan2(r,n)*180/Math.PI,[t,Math.sqrt(n**2+r**2),Qa(i)]},toBase(e){let[t,n,r]=e,i,a;return isNaN(r)?(i=0,a=0):(i=n*Math.cos(r*Math.PI/180),a=n*Math.sin(r*Math.PI/180)),[t,i,a]},formats:{oklch:{coords:[`<percentage> | <number>`,`<number> | <percentage>[0,1]`,`<number> | <angle>`]}}});let Vc=Na.D65;const Hc=24389/27,[Uc,Wc]=yc({space:Va,coords:Vc});var Gc=new Y({id:`luv`,name:`Luv`,coords:{l:{refRange:[0,100],name:`Lightness`},u:{refRange:[-215,215]},v:{refRange:[-215,215]}},white:Vc,base:Va,fromBase(e){let t=[ga(e[0]),ga(e[1]),ga(e[2])],n=t[1],[r,i]=yc({space:Va,coords:t});if(!Number.isFinite(r)||!Number.isFinite(i))return[0,0,0];let a=n<=.008856451679035631?Hc*n:116*Math.cbrt(n)-16;return[a,13*a*(r-Uc),13*a*(i-Wc)]},toBase(e){let[t,n,r]=e;if(t===0||ha(t))return[0,0,0];n=ga(n),r=ga(r);let i=n/(13*t)+Uc,a=r/(13*t)+Wc,o=t<=8?t/Hc:((t+16)/116)**3;return[o*(9*i/(4*a)),o,o*((12-3*i-20*a)/(4*a))]},formats:{color:{id:`--luv`,coords:[`<number> | <percentage>`,`<number> | <percentage>[-1,1]`,`<number> | <percentage>[-1,1]`]}}}),Kc=new Y({id:`lchuv`,name:`LChuv`,coords:{l:{refRange:[0,100],name:`Lightness`},c:{refRange:[0,220],name:`Chroma`},h:{refRange:[0,360],type:`angle`,name:`Hue`}},base:Gc,fromBase(e){let[t,n,r]=e,i,a=.02;return i=Math.abs(n)<a&&Math.abs(r)<a?NaN:Math.atan2(r,n)*180/Math.PI,[t,Math.sqrt(n**2+r**2),Qa(i)]},toBase(e){let[t,n,r]=e;return n<0&&(n=0),isNaN(r)&&(r=0),[t,n*Math.cos(r*Math.PI/180),n*Math.sin(r*Math.PI/180)]},formats:{color:{id:`--lchuv`,coords:[`<number> | <percentage>`,`<number> | <percentage>`,`<number> | <angle>`]}}});const qc=Hs[0][0],Jc=Hs[0][1],Yc=Hs[0][2],Xc=Hs[1][0],Zc=Hs[1][1],Qc=Hs[1][2],$c=Hs[2][0],el=Hs[2][1],tl=Hs[2][2];function nl(e,t,n){let r=t/(Math.sin(n)-e*Math.cos(n));return r<0?1/0:r}function rl(e){let t=(e+16)**3/1560896,n=t>.008856451679035631?t:e/903.2962962962963,r=n*(284517*qc-94839*Yc),i=n*(838422*Yc+769860*Jc+731718*qc),a=n*(632260*Yc-126452*Jc),o=n*(284517*Xc-94839*Qc),s=n*(838422*Qc+769860*Zc+731718*Xc),c=n*(632260*Qc-126452*Zc),l=n*(284517*$c-94839*tl),u=n*(838422*tl+769860*el+731718*$c),d=n*(632260*tl-126452*el);return{r0s:r/a,r0i:i*e/a,r1s:r/(a+126452),r1i:(i-769860)*e/(a+126452),g0s:o/c,g0i:s*e/c,g1s:o/(c+126452),g1i:(s-769860)*e/(c+126452),b0s:l/d,b0i:u*e/d,b1s:l/(d+126452),b1i:(u-769860)*e/(d+126452)}}function il(e,t){let n=t/360*Math.PI*2,r=nl(e.r0s,e.r0i,n),i=nl(e.r1s,e.r1i,n),a=nl(e.g0s,e.g0i,n),o=nl(e.g1s,e.g1i,n),s=nl(e.b0s,e.b0i,n),c=nl(e.b1s,e.b1i,n);return Math.min(r,i,a,o,s,c)}var al=new Y({id:`hsluv`,name:`HSLuv`,coords:{h:{refRange:[0,360],type:`angle`,name:`Hue`},s:{range:[0,100],name:`Saturation`},l:{range:[0,100],name:`Lightness`}},base:Kc,gamutSpace:qs,fromBase(e){let[t,n,r]=[ga(e[0]),ga(e[1]),ga(e[2])],i;return t>99.9999999?(i=0,t=100):t<1e-8?(i=0,t=0):i=n/il(rl(t),r)*100,[r,i,t]},toBase(e){let[t,n,r]=[ga(e[0]),ga(e[1]),ga(e[2])],i;return r>99.9999999?(r=100,i=0):r<1e-8?(r=0,i=0):i=il(rl(r),t)/100*n,[r,i,t]},formats:{color:{id:`--hsluv`,coords:[`<number> | <angle>`,`<percentage> | <number>`,`<percentage> | <number>`]}}});Hs[0][0],Hs[0][1],Hs[0][2],Hs[1][0],Hs[1][1],Hs[1][2],Hs[2][0],Hs[2][1],Hs[2][2];function ol(e,t){return Math.abs(t)/Math.sqrt(e**2+1)}function sl(e){let t=ol(e.r0s,e.r0i),n=ol(e.r1s,e.r1i),r=ol(e.g0s,e.g0i),i=ol(e.g1s,e.g1i),a=ol(e.b0s,e.b0i),o=ol(e.b1s,e.b1i);return Math.min(t,n,r,i,a,o)}var cl=new Y({id:`hpluv`,name:`HPLuv`,coords:{h:{refRange:[0,360],type:`angle`,name:`Hue`},s:{range:[0,100],name:`Saturation`},l:{range:[0,100],name:`Lightness`}},base:Kc,gamutSpace:`self`,fromBase(e){let[t,n,r]=[ga(e[0]),ga(e[1]),ga(e[2])],i;return t>99.9999999?(i=0,t=100):t<1e-8?(i=0,t=0):i=n/sl(rl(t))*100,[r,i,t]},toBase(e){let[t,n,r]=[ga(e[0]),ga(e[1]),ga(e[2])],i;return r>99.9999999?(r=100,i=0):r<1e-8?(r=0,i=0):i=sl(rl(r))/100*n,[r,i,t]},formats:{color:{id:`--hpluv`,coords:[`<number> | <angle>`,`<percentage> | <number>`,`<percentage> | <number>`]}}});const ll=2610/2**14,ul=2**14/2610,dl=2**5/2523,fl=3424/2**12,pl=2413/2**7,ml=2392/2**7;var hl=new Ha({id:`rec2100pq`,cssId:`rec2100-pq`,name:`REC.2100-PQ`,base:Is,toBase(e){return e.map(function(e){return(Math.max(e**dl-fl,0)/(pl-ml*e**dl))**ul*1e4/203})},fromBase(e){return e.map(function(e){let t=Math.max(e*203/1e4,0);return((fl+pl*t**ll)/(1+ml*t**ll))**78.84375})}});const gl=.17883277,_l=.28466892,vl=.55991073,yl=3.7743;var bl=new Ha({id:`rec2100hlg`,cssId:`rec2100-hlg`,name:`REC.2100-HLG`,referred:`scene`,base:Is,toBase(e){return e.map(function(e){return e<=.5?e**2/3*yl:(Math.exp((e-vl)/gl)+_l)/12*yl})},fromBase(e){return e.map(function(e){return e/=yl,e<=1/12?Math.sqrt(3*e):gl*Math.log(12*e-_l)+vl})}});const xl={};ja.add(`chromatic-adaptation-start`,e=>{e.options.method&&(e.M=Cl(e.W1,e.W2,e.options.method))}),ja.add(`chromatic-adaptation-end`,e=>{e.M||=Cl(e.W1,e.W2,e.options.method)});function Sl({id:e,toCone_M:t,fromCone_M:n}){xl[e]=arguments[0]}function Cl(e,t,n=`Bradford`){let r=xl[n],[i,a,o]=q(r.toCone_M,e),[s,c,l]=q(r.toCone_M,t),u=q([[s/i,0,0],[0,c/a,0],[0,0,l/o]],r.toCone_M);return q(r.fromCone_M,u)}Sl({id:`von Kries`,toCone_M:[[.40024,.7076,-.08081],[-.2263,1.16532,.0457],[0,0,.91822]],fromCone_M:[[1.8599363874558397,-1.1293816185800916,.21989740959619328],[.3611914362417676,.6388124632850422,-6370596838649899e-21],[0,0,1.0890636230968613]]}),Sl({id:`Bradford`,toCone_M:[[.8951,.2664,-.1614],[-.7502,1.7135,.0367],[.0389,-.0685,1.0296]],fromCone_M:[[.9869929054667121,-.14705425642099013,.15996265166373122],[.4323052697233945,.5183602715367774,.049291228212855594],[-.00852866457517732,.04004282165408486,.96848669578755]]}),Sl({id:`CAT02`,toCone_M:[[.7328,.4296,-.1624],[-.7036,1.6975,.0061],[.003,.0136,.9834]],fromCone_M:[[1.0961238208355142,-.27886900021828726,.18274517938277307],[.4543690419753592,.4735331543074117,.07209780371722911],[-.009627608738429355,-.00569803121611342,1.0153256399545427]]}),Sl({id:`CAT16`,toCone_M:[[.401288,.650173,-.051461],[-.250268,1.204414,.045854],[-.002079,.048952,.953127]],fromCone_M:[[1.862067855087233,-1.0112546305316845,.14918677544445172],[.3875265432361372,.6214474419314753,-.008973985167612521],[-.01584149884933386,-.03412293802851557,1.0499644368778496]]}),Object.assign(Na,{A:[1.0985,1,.35585],C:[.98074,1,1.18232],D55:[.95682,1,.92149],D75:[.94972,1,1.22638],E:[1,1,1],F2:[.99186,1,.67393],F7:[.95041,1,1.08747],F11:[1.00962,1,.6435]}),Na.ACES=[.32168/.33767,1,.34065/.33767];var wl=new Ha({id:`acescg`,cssId:`--acescg`,name:`ACEScg`,coords:{r:{range:[0,65504],name:`Red`},g:{range:[0,65504],name:`Green`},b:{range:[0,65504],name:`Blue`}},referred:`scene`,white:Na.ACES,toXYZ_M:[[.6624541811085053,.13400420645643313,.1561876870049078],[.27222871678091454,.6740817658111484,.05368951740793705],[-.005574649490394108,.004060733528982826,1.0103391003129971]],fromXYZ_M:[[1.6410233796943257,-.32480329418479,-.23642469523761225],[-.6636628587229829,1.6153315916573379,.016756347685530137],[.011721894328375376,-.008284441996237409,.9883948585390215]]});const Tl=2**-16,El=-.35828683,Dl=(Math.log2(65504)+9.72)/17.52;var Ol=new Ha({id:`acescc`,cssId:`--acescc`,name:`ACEScc`,coords:{r:{range:[El,Dl],name:`Red`},g:{range:[El,Dl],name:`Green`},b:{range:[El,Dl],name:`Blue`}},referred:`scene`,base:wl,toBase(e){return e.map(function(e){return e<=-.3013698630136986?(2**(e*17.52-9.72)-Tl)*2:e<Dl?2**(e*17.52-9.72):65504})},fromBase(e){return e.map(function(e){return e<=0?(Math.log2(Tl)+9.72)/17.52:e<Tl?(Math.log2(Tl+e*.5)+9.72)/17.52:(Math.log2(e)+9.72)/17.52})}}),kl=Object.freeze({__proto__:null,A98RGB:Lc,A98RGB_Linear:Ic,ACEScc:Ol,ACEScg:wl,CAM16_JMh:gs,HCT:ws,HPLuv:cl,HSL:Nc,HSLuv:al,HSV:Pc,HWB:Fc,ICTCP:qo,JzCzHz:Io,Jzazbz:Fo,LCH:eo,LCHuv:Kc,Lab:Za,Lab_D65:mc,Luv:Gc,OKLCH:Bc,OKLab:fo,P3:Js,P3_Linear:Bs,ProPhoto:zc,ProPhoto_Linear:Rc,REC_2020:zs,REC_2020_Linear:Is,REC_2100_HLG:bl,REC_2100_PQ:hl,XYZ_ABS_D65:bo,XYZ_D50:qa,XYZ_D65:Va,sRGB:qs,sRGB_Linear:Us}),Al=class e{constructor(...e){let t;e.length===1&&(t=J(e[0]));let n,r,i;t?(n=t.space||t.spaceId,r=t.coords,i=t.alpha):[n,r,i]=e,Object.defineProperty(this,`space`,{value:Y.get(n),writable:!1,enumerable:!0,configurable:!0}),this.coords=r?r.slice():[0,0,0],this.alpha=i>1||i===void 0?1:i<0?0:i;for(let e=0;e<this.coords.length;e++)this.coords[e]===`NaN`&&(this.coords[e]=NaN);for(let e in this.space.coords)Object.defineProperty(this,e,{get:()=>this.get(e),set:t=>this.set(e,t)})}get spaceId(){return this.space.id}clone(){return new e(this.space,this.coords,this.alpha)}toJSON(){return{spaceId:this.spaceId,coords:this.coords,alpha:this.alpha}}display(...t){let n=Xs(this,...t);return n.color=new e(n.color),n}static get(t,...n){return t instanceof e?t:new e(t,...n)}static defineFunction(t,n,r=n){let{instance:i=!0,returns:a}=r,o=function(...t){let r=n(...t);if(a===`color`)r=e.get(r);else if(a===`function<color>`){let t=r;r=function(...n){let r=t(...n);return e.get(r)},Object.assign(r,t)}else a===`array<color>`&&(r=r.map(t=>e.get(t)));return r};t in e||(e[t]=o),i&&(e.prototype[t]=function(...e){return o(this,...e)})}static defineFunctions(t){for(let n in t)e.defineFunction(n,t[n],t[n])}static extend(t){if(t.register)t.register(e);else for(let n in t)e.defineFunction(n,t[n])}};Al.defineFunctions({get:Wa,getAll:Ua,set:Ka,setAll:Ga,to:X,equals:Zs,inGamut:mo,toGamut:Ms,distance:go,toString:Fs}),Object.assign(Al,{util:Aa,hooks:ja,WHITES:Na,Space:Y,spaces:Y.registry,parse:Ra,defaults:Ma});for(let e of Object.keys(kl))Y.register(kl[e]);for(let e in Y.registry)jl(e,Y.registry[e]);ja.add(`colorspace-init-end`,e=>{jl(e.id,e),e.aliases?.forEach(t=>{jl(t,e)})});function jl(e,t){let n=e.replace(/-/g,`_`);Object.defineProperty(Al.prototype,n,{get(){let n=this.getAll(e);return typeof Proxy>`u`?n:new Proxy(n,{has:(e,n)=>{try{return Y.resolveCoord([t,n]),!0}catch{}return Reflect.has(e,n)},get:(e,n,r)=>{if(n&&typeof n!=`symbol`&&!(n in e)){let{index:r}=Y.resolveCoord([t,n]);if(r>=0)return e[r]}return Reflect.get(e,n,r)},set:(n,r,i,a)=>{if(r&&typeof r!=`symbol`&&!(r in n)||r>=0){let{index:a}=Y.resolveCoord([t,r]);if(a>=0)return n[a]=i,this.setAll(e,n),!0}return Reflect.set(n,r,i,a)}})},set(t){this.setAll(e,t)},configurable:!0,enumerable:!0})}Al.extend(ks),Al.extend({deltaE:Cc}),Object.assign(Al,{deltaEMethods:ks}),Al.extend(Ec),Al.extend({contrast:vc}),Al.extend(Sc),Al.extend(tc),Al.extend(Mc),Al.extend(_c);const Ml=[`#eb4034`,`#30850f`,`#116da7`,`#4334eb`,`#b134eb`,`#df168e`,`#e8172c`,`#8f2e2b`,`#8f692b`,`#8a8f2b`,`#358f2b`,`#2b8f82`,`#2b678f`,`#2b2b8f`,`#8f2b8f`,`#8f2b55`,`#1eff00`,`#a86800`,`#ff0000`,`#008035`,`#0026ff`,`#bb00ff`,`#d600b6`,`#e60067`,`#137878`];function Nl(e){try{let t=new Al(e);return t.contrastLstar(`white`)>t.contrastLstar(`black`)?`white`:`black`}catch{}}function Pl(e,t){return Math.floor(e+Math.random()*(t-e))}function Fl(e,t,n){return Math.max(e,Math.min(t,n))}var Il=class extends HTMLElement{constructor(){super(),this.$shadow=this.attachShadow({mode:`closed`}),this.styles=[ni],this.on_resize=this.on_window_resize.bind(this)}connectedCallback(){this.$shadow.adoptedStyleSheets=this.styles,this.setAttribute(`popover`,`manual`),this.showPopover&&this.showPopover(),window.addEventListener(`resize`,this.on_window_resize)}disconnectedCallback(){this.hidePopover&&this.hidePopover()&&this.hidePopover&&this.hidePopover(),window.removeEventListener(`resize`,this.on_window_resize)}on_window_resize(){this.$shadow&&window.requestAnimationFrame(()=>{let e=this.$shadow.host.getAttribute(`data-label-id`),[t]=B(`[data-label-id="${e}"]`);t&&(this.position={node_label_id:e,el:t,isFixed:ua(t)})})}set position({el:e,node_label_id:t}){this.$shadow.innerHTML=this.render(e.getBoundingClientRect(),t,ua(e)),this._backdrop&&(this.backdrop={element:this._backdrop.update(e),update:this._backdrop.update})}set backdrop(e){this._backdrop=e;let t=this.$shadow.querySelector(`visbug-boxmodel`);t?this.$shadow.replaceChild(e.element,t):this.$shadow.appendChild(e.element)}render({x:e,y:t,width:n,height:r,top:i,left:a},o,s){return this.$shadow.host.setAttribute(`data-label-id`,o),this.style.setProperty(`--top`,`${i+(s?0:window.scrollY)}px`),this.style.setProperty(`--left`,`${a}px`),this.style.setProperty(`--position`,s?`fixed`:`absolute`),this.style.setProperty(`--width`,`${n}px`),this.style.setProperty(`--height`,`${r}px`),`
      <svg
        class="visbug-handles"
        width="${n}" height="${r}"
        viewBox="0 0 ${n} ${r}"
        version="1.1" xmlns="http://www.w3.org/2000/svg"
      >
        <rect stroke="var(--neon-pink)" fill="none" width="100%" height="100%"></rect>
      </svg>
      <visbug-handle placement="top-start"></visbug-handle>
      <visbug-handle placement="top-center"></visbug-handle>
      <visbug-handle placement="top-end"></visbug-handle>
      <visbug-handle placement="middle-start"></visbug-handle>
      <visbug-handle placement="middle-end"></visbug-handle>
      <visbug-handle placement="bottom-start"></visbug-handle>
      <visbug-handle placement="bottom-center"></visbug-handle>
      <visbug-handle placement="bottom-end"></visbug-handle>
    `}};customElements.define(`visbug-handles`,Il);var Ll=class extends HTMLElement{constructor(){super(),this.$shadow=this.attachShadow({mode:`closed`}),this.styles=[ri]}connectedCallback(){this.$shadow.adoptedStyleSheets=this.styles,this.$shadow.innerHTML=this.render(),this.button=this.$shadow.querySelector(`button`),this.button.addEventListener(`pointerdown`,this.on_element_resize_start.bind(this)),this.placement=this.getAttribute(`placement`)}static get observedAttributes(){return[`placement`]}attributeChangedCallback(e,t,n){e===`placement`&&(this.placement=n)}on_element_resize_start(e){if(e.preventDefault(),e.stopPropagation(),e.button!==0)return;let t=this.placement,[n]=B(`[data-label-id="${e.composedPath().find(e=>e.tagName===`VISBUG-HANDLES`).getAttribute(`data-label-id`)}"]`);if(!n)return;let{x:r,y:i}=e,a=getComputedStyle(n),o=parseFloat(a.width),s=parseFloat(a.height),c=new DOMMatrix(a.transform),l=n.style.transition,u=document.body.style.cursor,d=document.body.style.userSelect;n.style.transition=`none`,document.body.style.cursor=getComputedStyle(this).getPropertyValue(`--cursor`),document.body.style.userSelect=`none`,document.addEventListener(`pointermove`,f);function f(e){e.preventDefault(),e.stopPropagation();let a=Fl(0,e.clientX,document.documentElement.clientWidth),l=Fl(0,e.clientY,document.documentElement.clientHeight),u=a-r,d=l-i;switch(t){case`top-start`:{let e=o-u,t=s-d,r=c.translate(u,d).transformPoint();requestAnimationFrame(()=>{n.style.width=`${e}px`,n.style.height=`${t}px`,n.style.transform=`translate(${r.x}px, ${r.y}px)`});break}case`top-center`:{let e=s-d,t=c.translate(0,d).transformPoint();requestAnimationFrame(()=>{n.style.height=`${e}px`,n.style.transform=`translate(${t.x}px, ${t.y}px)`});break}case`top-end`:{let e=o+u,t=s-d,r=c.translate(0,d).transformPoint();requestAnimationFrame(()=>{n.style.width=`${e}px`,n.style.height=`${t}px`,n.style.transform=`translate(${r.x}px, ${r.y}px)`});break}case`middle-start`:{let e=o-u,t=c.translate(u).transformPoint();requestAnimationFrame(()=>{n.style.width=`${e}px`,n.style.transform=`translate(${t.x}px, ${t.y}px)`});break}case`middle-end`:{let e=o+u;requestAnimationFrame(()=>{n.style.width=`${e}px`});break}case`bottom-start`:{let e=o-u,t=s+d,r=c.translate(u,0).transformPoint();requestAnimationFrame(()=>{n.style.width=`${e}px`,n.style.height=`${t}px`,n.style.transform=`translate(${r.x}px, ${r.y}px)`});break}case`bottom-center`:{let e=s+d;requestAnimationFrame(()=>{n.style.height=`${e}px`});break}case`bottom-end`:{let e=o+u,t=s+d;requestAnimationFrame(()=>{n.style.width=`${e}px`,n.style.height=`${t}px`});break}}}document.addEventListener(`pointerup`,p,{once:!0}),document.addEventListener(`mouseleave`,p,{once:!0});function p(){document.removeEventListener(`pointermove`,f),document.body.style.cursor=u,document.body.style.userSelect=d,n.style.transition=l}}disconnectedCallback(){this.button.removeEventListener(`pointerdown`,this.on_element_resize_start.bind(this))}render(){return`
      <button type="button" aria-label="Resize"></button>
    `}};customElements.define(`visbug-handle`,Ll);var Rl=class extends Il{constructor(){super(),this.styles=[ni,ii]}connectedCallback(){this.$shadow.adoptedStyleSheets=this.styles}disconnectedCallback(){}render({width:e,height:t,top:n,left:r},i,a){return this.style.setProperty(`--top`,`${n+(a?0:window.scrollY)}px`),this.style.setProperty(`--left`,`${r}px`),this.style.setProperty(`--position`,a?`fixed`:`absolute`),`
      <svg
        width="${e}" height="${t}"
        viewBox="0 0 ${e} ${t}"
      >
        <rect fill="none" width="100%" height="100%"></rect>
    `}};customElements.define(`visbug-hover`,Rl),window.addEventListener(`scroll`,zl),document.body.addEventListener(`click`,()=>{Hl()},!0);function zl(){Hl(),document.querySelectorAll(`visbug-label`).forEach(e=>{e.detectOutsideViewport()})}var Bl=class extends HTMLElement{constructor(){super(),this.$shadow=this.attachShadow({mode:`closed`}),this.dispatchQuery=this.dispatchQuery.bind(this)}connectedCallback(){this.$shadow.adoptedStyleSheets=[ui],B(`a`,this.$shadow).on(`click mouseenter`,this.dispatchQuery)}disconnectedCallback(){B(`a`,this.$shadow).off(`click mouseenter`,this.dispatchQuery)}dispatchQuery(e){this.$shadow.host.dispatchEvent(new CustomEvent(`query`,{bubbles:!0,detail:{text:e.target.textContent,activator:e.type}}))}set text(e){this.$shadow.childElementCount?this.$shadow.firstElementChild.textContent=e:this._text=e}set position({boundingRect:e,node_label_id:t,isFixed:n}){this.$shadow.innerHTML=this.render(t),this.update={boundingRect:e,isFixed:n}}set update({boundingRect:e,isFixed:t}){this.style.setProperty(`--top`,`${e.y+(t?0:window.scrollY)}px`),this.style.setProperty(`--left`,`${e.x-1}px`),this.style.setProperty(`--max-width`,`${e.width+(window.innerWidth-e.x-e.width-20)}px`),this.style.setProperty(`--position`,`fixed`)}set count(e){this.$shadow.childElementCount?this.$shadow.firstElementChild.count=e:this._count=e}get count(){return this.$shadow.childElementCount?this.$shadow.firstElementChild.count:this._count}render(e){return this.$shadow.host.setAttribute(`data-label-id`,e||`label_`+Number(new Date)),`<span offscreen-label>${this._text}</span>`}};customElements.define(`visbug-offscreen-label`,Bl);function Vl(e,t,n,r,i,a,o){let s=document.querySelectorAll(`visbug-offscreen-label[id=${t}]`);if(s.length){let c=s[0];c.style.display=``,c.style.setProperty(`--left`,r),c.style.setProperty(`--top`,i),c.style.setProperty(`--position`,`fixed`),a&&c.style.setProperty(`--label-bg`,a),c.seen[e]=!0,c.count=Object.keys(c.seen).length,c.text=t,c.style.setProperty(`--count`,`"\\00a0 ${c.count}"`),c.style.setProperty(`--hover-text`,`"\\00a0 ${n?`offscreen label: `+n:c.count}"`),o&&(r=r.includes(`calc(`)?r.replace(`)`,` - ${c.count.toString().length}ch)`):`${c.count.toString().length}ch`,c.style.setProperty(`--left`,r));return}let c=document.createElement(`visbug-offscreen-label`);c.id=t,c.position={boundingRect:document.body.getBoundingClientRect(),isFixed:!0},c.seen={},c.seen[e]=!0,c.count=1,c.text=t,c.style.display=``,c.style.setProperty(`--left`,r),c.style.setProperty(`--top`,i),c.style.setProperty(`--count`,`"\\00a0 ${c.count}"`),c.style.setProperty(`--hover-text`,`"\\00a0 ${n?`offscreen label: `+n:c.count}"`),a&&c.style.setProperty(`--label-bg`,a),o&&(r=r.includes(`calc(`)?r.replace(`)`,` - 1ch)`):`1ch`,c.style.setProperty(`--left`,r)),document.body.appendChild(c)}function Hl(){document.querySelectorAll(`visbug-offscreen-label`).forEach(e=>{e.seen={},e.count=0,e.text=``,e.style.display=`none`})}var Ul=class extends HTMLElement{constructor(){super(),this.$shadow=this.attachShadow({mode:`closed`}),this.on_resize=this.on_resize.bind(this),this.dispatchQuery=this.dispatchQuery.bind(this)}connectedCallback(){this.$shadow.adoptedStyleSheets=[li],this.setAttribute(`popover`,`manual`),this.showPopover&&this.showPopover(),B(`a`,this.$shadow).on(`click mouseenter`,this.dispatchQuery),window.addEventListener(`resize`,this.on_resize)}disconnectedCallback(){this.hidePopover&&this.hidePopover(),B(`a`,this.$shadow).off(`click mouseenter`,this.dispatchQuery),window.removeEventListener(`resize`,this.on_resize)}on_resize(){window.requestAnimationFrame(()=>{let e=this.$shadow.host.getAttribute(`data-label-id`),[t]=B(`[data-label-id="${e}"]`);t&&(this.position={node_label_id:e,boundingRect:t.getBoundingClientRect(),isFixed:ua(t)})})}dispatchQuery(e){this.$shadow.host.dispatchEvent(new CustomEvent(`query`,{bubbles:!0,detail:{text:e.target.textContent,activator:e.type}}))}set text(e){this.$shadow.childElementCount?this.$shadow.firstElementChild.innerHTML=e:this._text=e}set position({boundingRect:e,node_label_id:t,isFixed:n}){this.$shadow.innerHTML=this.render(t),this.update={boundingRect:e,isFixed:n}}set update({boundingRect:e,isFixed:t}){let n=e.y+(t?0:window.scrollY),r=e.x,i=t?`fixed`:`absolute`;this.style.setProperty(`--top`,`${n}px`),this.style.setProperty(`--left`,`${r}px`),this.style.setProperty(`--max-width`,`${e.width+(window.innerWidth-e.x-e.width-40)}px`),this.style.setProperty(`--position`,i),this.setAttribute(`data-original-top`,n),this.setAttribute(`data-original-left`,r),this.setAttribute(`data-original-position`,i),this.detectOutsideViewport()}render(e){return this.$shadow.host.setAttribute(`data-label-id`,e||`label_`+Number(new Date)),`<span>${this._text}</span>`}detectOutsideViewport(){let e=this.$shadow.firstElementChild.innerText.replace(/\s+/g,` `);if(e===`body`)return;let t=this.$shadow.firstElementChild.getBoundingClientRect(),n=window.getComputedStyle(this),r={top:n.getPropertyValue(`--top`).replace(`px`,``),left:n.getPropertyValue(`--left`).replace(`px`,``)},i={top:this.getAttribute(`data-original-top`),left:this.getAttribute(`data-original-left`),position:this.getAttribute(`data-original-position`)},a=document.body.scrollX||window.pageXOffset,o=document.body.scrollY||window.pageYOffset,s=i.top-t.height-o<0,c=i.top-o>window.innerHeight,l=i.left-a<0,u=i.left-a>window.innerWidth;if(!(s||c||l||u)){this.style.setProperty(`--position`,i.position),this.style.setProperty(`--left`,`${i.left}px`),this.style.setProperty(`--top`,`${i.top}px`);return}let d=this.getAttribute(`data-label-id`),f={position:`fixed`,color:`var(--theme-purple)`,left:r.left,top:r.top,offscreenText:``,hoverText:e};s&&!l&&!u?(f.left=Math.max(t.width,r.left),f.top=t.height,f.offscreenText=`↑`,Vl(d,f.offscreenText,f.hoverText,`calc(50vw - 0.5rem)`,`1rem`,f.color)):s&&l?(f.left=t.width,f.top=t.height,f.offscreenText=`↖`,Vl(d,f.offscreenText,f.hoverText,`0`,`1rem`,f.color)):s&&u?(f.left=Math.max(t.width,r.left),f.top=t.height,f.offscreenText=`↗`,Vl(d,f.offscreenText,f.hoverText,`calc(100vw - 1.5rem)`,`1rem`,f.color,!0)):l&&!s&&!c?(f.left=t.width,f.top=Math.max(t.height,r.top),f.offscreenText=`←`,Vl(d,f.offscreenText,f.hoverText,0,`calc(50vh - 0.5rem)`,f.color)):u&&!s&&!c?(f.left=window.innerWidth-t.width,f.top=Math.max(t.height,r.top),f.offscreenText=`→`,Vl(d,f.offscreenText,f.hoverText,`calc(100vw - 1.5rem)`,`calc(50vh - 0.5rem)`,f.color,!0)):c&&!l&&!u?(f.left=Math.max(t.width,r.left),f.top=window.innerHeight-t.height,f.offscreenText=`↓`,Vl(d,f.offscreenText,f.hoverText,`calc(50vw - 0.5rem)`,`100vh`,f.color)):c&&l?(f.left=t.width,f.top=window.innerHeight-t.height,f.offscreenText=`↙`,Vl(d,f.offscreenText,f.hoverText,0,`100vh`,f.color)):c&&u&&(f.left=Math.max(t.width,r.left),f.top=window.innerHeight-t.height,f.offscreenText=`↘`,Vl(d,f.offscreenText,f.hoverText,`calc(100vw - 1.5rem)`,`100vh`,f.color,!0))}};customElements.define(`visbug-label`,Ul);var Wl=class extends HTMLElement{constructor(){super(),this.$shadow=this.attachShadow({mode:`closed`})}connectedCallback(){this.$shadow.adoptedStyleSheets=[ci],this.setAttribute(`popover`,`manual`),this.showPopover&&this.showPopover()}disconnectedCallback(){this.hidePopover&&this.hidePopover()}set position(e){this.$shadow.innerHTML=this.render(e)}set update({width:e,height:t,top:n,left:r}){let{winHeight:i,winWidth:a}=la(),o=this.$shadow.querySelector(`svg`),[s,c,l,u,d]=o.children;this.$shadow.host.style.display=`block`,o.setAttribute(`viewBox`,`0 0 ${a} ${i}`),s.setAttribute(`width`,e+`px`),s.setAttribute(`x`,r),s.setAttribute(`y`,n),c.setAttribute(`x1`,r),c.setAttribute(`x2`,r),l.setAttribute(`x1`,r+e),l.setAttribute(`x2`,r+e),u.setAttribute(`y1`,n),u.setAttribute(`y2`,n),u.setAttribute(`x2`,a),d.setAttribute(`y1`,n+t),d.setAttribute(`y2`,n+t),d.setAttribute(`x2`,a)}render({x:e,y:t,width:n,height:r,top:i,left:a}){let{winWidth:o,winHeight:s}=la();return`
      <svg
        width="100%"
        viewBox="0 0 ${o} ${s}"
        version="1.1" xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          fill="none"
          width="${n}" height="${r}"
          x="${e}" y="${t}"
          style="display:none;"
        ></rect>
        <line x1="${e}" y1="0" x2="${e}" y2="${s}"></line>
        <line x1="${e+n}" y1="0" x2="${e+n}" y2="${s}"></line>
        <line x1="0" y1="500" x2="${o}" y2="500"></line>
        <line x1="0" y1="${t+r}" x2="${o}" y2="${t+r}"></line>
      </svg>
    `}};customElements.define(`visbug-gridlines`,Wl);var Gl=class extends HTMLElement{constructor(){super(),this.$shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.$shadow.adoptedStyleSheets=[si]}disconnectedCallback(){this.hasAttribute(`popover`)&&this.hidePopover&&this.hidePopover()}set position({line_model:e,node_label_id:t}){this.styleProps=e,this.$shadow.innerHTML=this.render(e,t)}set styleProps({y:e,x:t,d:n,q:r,v:i=!1,color:a}){this.style.setProperty(`--top`,`${Math.round(e+window.scrollY)}px`),this.style.setProperty(`--right`,`auto`),this.style.setProperty(`--left`,`${t}px`),this.style.setProperty(`--direction`,i?`column`:`row`),this.style.setProperty(`--quadrant`,r),r===`left`&&this.style.setProperty(`--justify`,`flex-end`),i?this.style.setProperty(`--distance-h`,`${n}px`):this.style.setProperty(`--distance-w`,`${n}px`),i?this.style.setProperty(`--line-h`,`var(--line-w)`):this.style.setProperty(`--line-w`,`var(--line-w)`),this.style.setProperty(`--line-color`,a===`pink`?`1 0 1`:`.5 0 1`),this.style.setProperty(`--line-base`,a===`pink`?`1 0 1`:`.5 0 1`)}render({q:e,d:t},n){return this.$shadow.host.setAttribute(`data-label-id`,n),`
      <figure quadrant="${e}">
        <div></div>
        <figcaption>${Math.round(t)}</figcaption>
        <div></div>
      </figure>
    `}isPopover(){this.setAttribute(`popover`,`manual`),this.showPopover&&this.showPopover()}};customElements.define(`visbug-distance`,Gl);var Kl=class extends HTMLElement{constructor(){super(),this.$shadow=this.attachShadow({mode:`closed`})}connectedCallback(){this.$shadow.adoptedStyleSheets=[di]}disconnectedCallback(){}set position(e){this.$shadow.innerHTML=this.render(e)}set update({top:e,left:t,width:n,height:r}){let[i]=this.$shadow.children;this.$shadow.host.style.display=`block`,i.style.display=`block`,this.style.setProperty(`--top`,`${e+window.scrollY}px`),this.style.setProperty(`--left`,`${t-1}px`),i.setAttribute(`width`,n+`px`),i.setAttribute(`height`,r+`px`)}render({height:e,width:t}){return`
      <svg class="visbug-overlay"
        width="${t}px" height="${e}px"
        viewBox="0 0 ${t} ${e}"
      >
        <rect></rect>
      </svg>
    `}};customElements.define(`visbug-overlay`,Kl);var ql=class extends HTMLElement{constructor(){super(),this.$shadow=this.attachShadow({mode:`closed`}),this.drawable={}}connectedCallback(){this.$shadow.adoptedStyleSheets=[fi]}disconnectedCallback(){}set position(e){this.$shadow.innerHTML=this.render(e),this.drawable.measurements||this.createMeasurements(e)}render({mode:e,bounds:t,sides:n,color:r=`pink`}){let i=t.height+n.bottom+n.top,a=t.width+n.right+n.left;return e===`padding`?this.drawable={height:t.height-(n.borders.top+n.borders.bottom),width:t.width-(n.borders.right+n.borders.left),top:0+n.borders.top,left:0+n.borders.left,rotation:`rotate(-45)`}:e===`margin`&&(this.drawable={height:i,width:a,top:0-n.top,left:0-n.left,rotation:`rotate(45)`}),r===`pink`?(this.drawable.bg=`color(display-p3 1 0 1 / 15%)`,this.drawable.stripe=`color(display-p3 1 0 1 / 80%)`):(this.drawable.bg=`color(display-p3 .75 0 1 / 15%)`,this.drawable.stripe=`color(display-p3 .75 0 1 / 80%)`),this.styles({sides:n}),`
      <div mask>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="pinstripe" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="${this.drawable.rotation}" class="pattern">
              <line x1="0" y="0" x2="0" y2="10" stroke="${this.drawable.stripe}" stroke-width="1"></line>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pinstripe)"></rect>
        </svg>
      </div>
    `}styles({sides:e}){this.style.setProperty(`--width`,`${this.drawable.width}px`),this.style.setProperty(`--height`,`${this.drawable.height}px`),this.style.setProperty(`--top`,`${this.drawable.top}px`),this.style.setProperty(`--left`,`${this.drawable.left}px`),this.style.setProperty(`--bg`,`${this.drawable.bg}`),this.style.setProperty(`--target-left`,`${e.left}px`),this.style.setProperty(`--target-top`,`${e.top}px`),this.style.setProperty(`--target-right`,`${e.right}px`),this.style.setProperty(`--target-bottom`,`${e.bottom}px`),this.style.setProperty(`--offset-right`,`${this.drawable.width-e.right}px`),this.style.setProperty(`--offset-bottom`,`${this.drawable.height-e.bottom}px`)}createMeasurements({mode:e,bounds:t,sides:n,color:r}){window.innerWidth,e===`margin`?(n.top&&this.createMeasurement({x:t.width/2-3,y:window.scrollY*-1-n.top,d:n.top,q:`top`,v:!0,color:r}),n.bottom&&this.createMeasurement({x:t.width/2-3,y:window.scrollY*-1+t.height,d:n.bottom,q:`bottom`,v:!0,color:r}),n.right&&this.createMeasurement({x:t.width,y:window.scrollY*-1+t.height/2-3,d:n.right,q:`right`,v:!1,color:r}),n.left&&this.createMeasurement({x:n.left*-1,y:window.scrollY*-1+t.height/2-3,d:n.left,q:`left`,v:!1,color:r})):e===`padding`&&(n.top&&this.createMeasurement({x:t.width/2-3,y:window.scrollY*-1+n.borders.top,d:n.top,q:`top`,v:!0,color:r}),n.bottom&&this.createMeasurement({x:t.width/2-3,y:window.scrollY*-1+(t.height-n.bottom-n.borders.bottom),d:n.bottom,q:`bottom`,v:!0,color:r}),n.right&&this.createMeasurement({x:t.width-n.right-n.borders.right,y:window.scrollY*-1+t.height/2-3,d:n.right,q:`right`,v:!1,color:r}),n.left&&this.createMeasurement({x:0+n.borders.left,y:window.scrollY*-1+t.height/2-3,d:n.left,q:`left`,v:!1,color:r}))}createMeasurement(e,t=0){let n=document.createElement(`visbug-distance`);n.position={line_model:e,node_label_id:t},this.$shadow.appendChild(n)}};customElements.define(`visbug-boxmodel`,ql);var Jl=class extends Il{constructor(){super(),this.styles=[ni,ai]}render({width:e,height:t,top:n,left:r}){return this.style.setProperty(`--top`,`${n+window.scrollY}px`),this.style.setProperty(`--left`,`${r}px`),`
      <svg width="${e}" height="${t}">
        <rect></rect>
        <rect></rect>
        <rect></rect>
        <rect></rect>
      </svg>
    `}};customElements.define(`visbug-corners`,Jl);var Yl=class extends Il{constructor(){super(),this.styles=[ni,mi]}toggleHovering({hovering:e}){e?this.$shadow.children[0].setAttribute(`hovering`,!0):this.$shadow.children[0].removeAttribute(`hovering`)}render({width:e,height:t,top:n,left:r}){return this.style.setProperty(`--position`,ua(this.$shadow.host)?`fixed`:`absolute`),this.style.setProperty(`--top`,`${n+window.scrollY}px`),this.style.setProperty(`--left`,`${r}px`),`
      <svg width="${e}" height="${t}">
        <pattern id="stripes" patternUnits="userSpaceOnUse" width="4" height="4">
          <line x="0" y1="0" x2="0" y2="4" style="stroke:hsla(330, 100%, 71%, 50%); stroke-width: 3;" />
        </pattern>
        <g>
          <rect fill="url(#stripes)" />
        </g>
      </svg>
    `}};customElements.define(`visbug-grip`,Yl);const Xl=`up,down,left,right`.split(`,`).reduce((e,t)=>`${e},${t},alt+${t},shift+${t},shift+alt+${t}`,``).substring(1),Zl=`${K}+up,${K}+shift+up,${K}+down,${K}+shift+down`;function Ql(e){return U(Xl,(t,n)=>{t.cancelBubble||(t.preventDefault(),$l(e.selection(),n.key))}),U(Zl,(t,n)=>{t.preventDefault(),eu(e.selection(),n.key)}),e.onSelectedUpdate(tu),()=>{U.unbind(Xl),U.unbind(Zl),U.unbind(`up,down,left,right`),e.removeSelectedCallback(tu),nu(e.selection())}}function $l(e,t){e.map(e=>ta(e)).map(e=>({el:e,style:`margin`+Zi(t),current:parseInt(G(e,`margin`+Zi(t)),10),amount:t.split(`+`).includes(`shift`)?10:1,negative:t.split(`+`).includes(`alt`)})).map(e=>Object.assign(e,{margin:e.negative?e.current-e.amount:e.current+e.amount})).forEach(({el:e,style:t,margin:n})=>e.style[t]=`${n<0?0:n}px`)}function eu(e,t){let n=t.split(`+`),r=``;n.includes(`shift`)&&(r=`shift+`+r),n.includes(`down`)&&(r=`alt+`+r),`up,down,left,right`.split(`,`).forEach(t=>$l(e,r+t))}function tu(e){e.forEach(e=>{let t=e.getAttribute(`data-label-id`);document.querySelector(`visbug-handles[data-label-id="${t}"]`).backdrop={element:ru(e),update:ru}})}function nu(e){e.forEach(e=>{let t=e.getAttribute(`data-label-id`),n=document.querySelector(`visbug-handles[data-label-id="${t}"]`).$shadow.querySelector(`visbug-boxmodel`);n&&n.remove()})}function ru(e,t=!1){let n=e.getBoundingClientRect(),r=G(e,`margin`),i=document.createElement(`visbug-boxmodel`);if(r!==`0px`){let r={top:G(e,`marginTop`),right:G(e,`marginRight`),bottom:G(e,`marginBottom`),left:G(e,`marginLeft`)};Object.entries(r).forEach(([t,n])=>{typeof n!=`number`&&(n=parseInt(G(e,`margin-`+t).slice(0,-2))),r[t]=Math.round(n.toFixed(1)*100)/100}),i.position={mode:`margin`,color:t?`purple`:`pink`,bounds:n,sides:r}}return i}function iu(e,t){ou(e)&&(e=`100%`);var n=su(e);return e=t===360?e:Math.min(t,Math.max(0,parseFloat(e))),n&&(e=parseInt(String(e*t),10)/100),Math.abs(e-t)<1e-6?1:(e=t===360?(e<0?e%t+t:e%t)/parseFloat(String(t)):e%t/parseFloat(String(t)),e)}function au(e){return Math.min(1,Math.max(0,e))}function ou(e){return typeof e==`string`&&e.indexOf(`.`)!==-1&&parseFloat(e)===1}function su(e){return typeof e==`string`&&e.indexOf(`%`)!==-1}function cu(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function lu(e){return e<=1?`${Number(e)*100}%`:e}function uu(e){return e.length===1?`0`+e:String(e)}function du(e,t,n){return{r:iu(e,255)*255,g:iu(t,255)*255,b:iu(n,255)*255}}function fu(e,t,n){e=iu(e,255),t=iu(t,255),n=iu(n,255);var r=Math.max(e,t,n),i=Math.min(e,t,n),a=0,o=0,s=(r+i)/2;if(r===i)o=0,a=0;else{var c=r-i;switch(o=s>.5?c/(2-r-i):c/(r+i),r){case e:a=(t-n)/c+(t<n?6:0);break;case t:a=(n-e)/c+2;break;case n:a=(e-t)/c+4;break;default:break}a/=6}return{h:a,s:o,l:s}}function pu(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*(6*n):n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function mu(e,t,n){var r,i,a;if(e=iu(e,360),t=iu(t,100),n=iu(n,100),t===0)i=n,a=n,r=n;else{var o=n<.5?n*(1+t):n+t-n*t,s=2*n-o;r=pu(s,o,e+1/3),i=pu(s,o,e),a=pu(s,o,e-1/3)}return{r:r*255,g:i*255,b:a*255}}function hu(e,t,n){e=iu(e,255),t=iu(t,255),n=iu(n,255);var r=Math.max(e,t,n),i=Math.min(e,t,n),a=0,o=r,s=r-i,c=r===0?0:s/r;if(r===i)a=0;else{switch(r){case e:a=(t-n)/s+(t<n?6:0);break;case t:a=(n-e)/s+2;break;case n:a=(e-t)/s+4;break;default:break}a/=6}return{h:a,s:c,v:o}}function gu(e,t,n){e=iu(e,360)*6,t=iu(t,100),n=iu(n,100);var r=Math.floor(e),i=e-r,a=n*(1-t),o=n*(1-i*t),s=n*(1-(1-i)*t),c=r%6,l=[n,o,a,a,s,n][c],u=[s,n,n,o,a,a][c],d=[a,a,s,n,n,o][c];return{r:l*255,g:u*255,b:d*255}}function _u(e,t,n,r){var i=[uu(Math.round(e).toString(16)),uu(Math.round(t).toString(16)),uu(Math.round(n).toString(16))];return r&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join(``)}function vu(e,t,n,r,i){var a=[uu(Math.round(e).toString(16)),uu(Math.round(t).toString(16)),uu(Math.round(n).toString(16)),uu(yu(r))];return i&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))&&a[3].startsWith(a[3].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0)+a[3].charAt(0):a.join(``)}function yu(e){return Math.round(parseFloat(e)*255).toString(16)}function bu(e){return xu(e)/255}function xu(e){return parseInt(e,16)}function Su(e){return{r:e>>16,g:(e&65280)>>8,b:e&255}}var Cu={aliceblue:`#f0f8ff`,antiquewhite:`#faebd7`,aqua:`#00ffff`,aquamarine:`#7fffd4`,azure:`#f0ffff`,beige:`#f5f5dc`,bisque:`#ffe4c4`,black:`#000000`,blanchedalmond:`#ffebcd`,blue:`#0000ff`,blueviolet:`#8a2be2`,brown:`#a52a2a`,burlywood:`#deb887`,cadetblue:`#5f9ea0`,chartreuse:`#7fff00`,chocolate:`#d2691e`,coral:`#ff7f50`,cornflowerblue:`#6495ed`,cornsilk:`#fff8dc`,crimson:`#dc143c`,cyan:`#00ffff`,darkblue:`#00008b`,darkcyan:`#008b8b`,darkgoldenrod:`#b8860b`,darkgray:`#a9a9a9`,darkgreen:`#006400`,darkgrey:`#a9a9a9`,darkkhaki:`#bdb76b`,darkmagenta:`#8b008b`,darkolivegreen:`#556b2f`,darkorange:`#ff8c00`,darkorchid:`#9932cc`,darkred:`#8b0000`,darksalmon:`#e9967a`,darkseagreen:`#8fbc8f`,darkslateblue:`#483d8b`,darkslategray:`#2f4f4f`,darkslategrey:`#2f4f4f`,darkturquoise:`#00ced1`,darkviolet:`#9400d3`,deeppink:`#ff1493`,deepskyblue:`#00bfff`,dimgray:`#696969`,dimgrey:`#696969`,dodgerblue:`#1e90ff`,firebrick:`#b22222`,floralwhite:`#fffaf0`,forestgreen:`#228b22`,fuchsia:`#ff00ff`,gainsboro:`#dcdcdc`,ghostwhite:`#f8f8ff`,goldenrod:`#daa520`,gold:`#ffd700`,gray:`#808080`,green:`#008000`,greenyellow:`#adff2f`,grey:`#808080`,honeydew:`#f0fff0`,hotpink:`#ff69b4`,indianred:`#cd5c5c`,indigo:`#4b0082`,ivory:`#fffff0`,khaki:`#f0e68c`,lavenderblush:`#fff0f5`,lavender:`#e6e6fa`,lawngreen:`#7cfc00`,lemonchiffon:`#fffacd`,lightblue:`#add8e6`,lightcoral:`#f08080`,lightcyan:`#e0ffff`,lightgoldenrodyellow:`#fafad2`,lightgray:`#d3d3d3`,lightgreen:`#90ee90`,lightgrey:`#d3d3d3`,lightpink:`#ffb6c1`,lightsalmon:`#ffa07a`,lightseagreen:`#20b2aa`,lightskyblue:`#87cefa`,lightslategray:`#778899`,lightslategrey:`#778899`,lightsteelblue:`#b0c4de`,lightyellow:`#ffffe0`,lime:`#00ff00`,limegreen:`#32cd32`,linen:`#faf0e6`,magenta:`#ff00ff`,maroon:`#800000`,mediumaquamarine:`#66cdaa`,mediumblue:`#0000cd`,mediumorchid:`#ba55d3`,mediumpurple:`#9370db`,mediumseagreen:`#3cb371`,mediumslateblue:`#7b68ee`,mediumspringgreen:`#00fa9a`,mediumturquoise:`#48d1cc`,mediumvioletred:`#c71585`,midnightblue:`#191970`,mintcream:`#f5fffa`,mistyrose:`#ffe4e1`,moccasin:`#ffe4b5`,navajowhite:`#ffdead`,navy:`#000080`,oldlace:`#fdf5e6`,olive:`#808000`,olivedrab:`#6b8e23`,orange:`#ffa500`,orangered:`#ff4500`,orchid:`#da70d6`,palegoldenrod:`#eee8aa`,palegreen:`#98fb98`,paleturquoise:`#afeeee`,palevioletred:`#db7093`,papayawhip:`#ffefd5`,peachpuff:`#ffdab9`,peru:`#cd853f`,pink:`#ffc0cb`,plum:`#dda0dd`,powderblue:`#b0e0e6`,purple:`#800080`,rebeccapurple:`#663399`,red:`#ff0000`,rosybrown:`#bc8f8f`,royalblue:`#4169e1`,saddlebrown:`#8b4513`,salmon:`#fa8072`,sandybrown:`#f4a460`,seagreen:`#2e8b57`,seashell:`#fff5ee`,sienna:`#a0522d`,silver:`#c0c0c0`,skyblue:`#87ceeb`,slateblue:`#6a5acd`,slategray:`#708090`,slategrey:`#708090`,snow:`#fffafa`,springgreen:`#00ff7f`,steelblue:`#4682b4`,tan:`#d2b48c`,teal:`#008080`,thistle:`#d8bfd8`,tomato:`#ff6347`,turquoise:`#40e0d0`,violet:`#ee82ee`,wheat:`#f5deb3`,white:`#ffffff`,whitesmoke:`#f5f5f5`,yellow:`#ffff00`,yellowgreen:`#9acd32`};function wu(e){var t={r:0,g:0,b:0},n=1,r=null,i=null,a=null,o=!1,s=!1;return typeof e==`string`&&(e=ku(e)),typeof e==`object`&&(Au(e.r)&&Au(e.g)&&Au(e.b)?(t=du(e.r,e.g,e.b),o=!0,s=String(e.r).substr(-1)===`%`?`prgb`:`rgb`):Au(e.h)&&Au(e.s)&&Au(e.v)?(r=lu(e.s),i=lu(e.v),t=gu(e.h,r,i),o=!0,s=`hsv`):Au(e.h)&&Au(e.s)&&Au(e.l)&&(r=lu(e.s),a=lu(e.l),t=mu(e.h,r,a),o=!0,s=`hsl`),Object.prototype.hasOwnProperty.call(e,`a`)&&(n=e.a)),n=cu(n),{ok:o,format:e.format||s,r:Math.min(255,Math.max(t.r,0)),g:Math.min(255,Math.max(t.g,0)),b:Math.min(255,Math.max(t.b,0)),a:n}}var Tu=`(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)`,Eu=`[\\s|\\(]+(${Tu})[,|\\s]+(${Tu})[,|\\s]+(${Tu})\\s*\\)?`,Du=`[\\s|\\(]+(${Tu})[,|\\s]+(${Tu})[,|\\s]+(${Tu})[,|\\s]+(${Tu})\\s*\\)?`,Ou={CSS_UNIT:new RegExp(Tu),rgb:RegExp(`rgb`+Eu),rgba:RegExp(`rgba`+Du),hsl:RegExp(`hsl`+Eu),hsla:RegExp(`hsla`+Du),hsv:RegExp(`hsv`+Eu),hsva:RegExp(`hsva`+Du),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function ku(e){if(e=e.trim().toLowerCase(),e.length===0)return!1;var t=!1;if(Cu[e])e=Cu[e],t=!0;else if(e===`transparent`)return{r:0,g:0,b:0,a:0,format:`name`};var n=Ou.rgb.exec(e);return n?{r:n[1],g:n[2],b:n[3]}:(n=Ou.rgba.exec(e),n?{r:n[1],g:n[2],b:n[3],a:n[4]}:(n=Ou.hsl.exec(e),n?{h:n[1],s:n[2],l:n[3]}:(n=Ou.hsla.exec(e),n?{h:n[1],s:n[2],l:n[3],a:n[4]}:(n=Ou.hsv.exec(e),n?{h:n[1],s:n[2],v:n[3]}:(n=Ou.hsva.exec(e),n?{h:n[1],s:n[2],v:n[3],a:n[4]}:(n=Ou.hex8.exec(e),n?{r:xu(n[1]),g:xu(n[2]),b:xu(n[3]),a:bu(n[4]),format:t?`name`:`hex8`}:(n=Ou.hex6.exec(e),n?{r:xu(n[1]),g:xu(n[2]),b:xu(n[3]),format:t?`name`:`hex`}:(n=Ou.hex4.exec(e),n?{r:xu(n[1]+n[1]),g:xu(n[2]+n[2]),b:xu(n[3]+n[3]),a:bu(n[4]+n[4]),format:t?`name`:`hex8`}:(n=Ou.hex3.exec(e),n?{r:xu(n[1]+n[1]),g:xu(n[2]+n[2]),b:xu(n[3]+n[3]),format:t?`name`:`hex`}:!1)))))))))}function Au(e){return!!Ou.CSS_UNIT.exec(String(e))}var ju=function(){function e(t,n){if(t===void 0&&(t=``),n===void 0&&(n={}),t instanceof e)return t;typeof t==`number`&&(t=Su(t)),this.originalInput=t;var r=wu(t);this.originalInput=t,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=n.format??r.format,this.gradientType=n.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok}return e.prototype.isDark=function(){return this.getBrightness()<128},e.prototype.isLight=function(){return!this.isDark()},e.prototype.getBrightness=function(){var e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3},e.prototype.getLuminance=function(){var e=this.toRgb(),t,n,r,i=e.r/255,a=e.g/255,o=e.b/255;return t=i<=.03928?i/12.92:((i+.055)/1.055)**2.4,n=a<=.03928?a/12.92:((a+.055)/1.055)**2.4,r=o<=.03928?o/12.92:((o+.055)/1.055)**2.4,.2126*t+.7152*n+.0722*r},e.prototype.getAlpha=function(){return this.a},e.prototype.setAlpha=function(e){return this.a=cu(e),this.roundA=Math.round(100*this.a)/100,this},e.prototype.isMonochrome=function(){return this.toHsl().s===0},e.prototype.toHsv=function(){var e=hu(this.r,this.g,this.b);return{h:e.h*360,s:e.s,v:e.v,a:this.a}},e.prototype.toHsvString=function(){var e=hu(this.r,this.g,this.b),t=Math.round(e.h*360),n=Math.round(e.s*100),r=Math.round(e.v*100);return this.a===1?`hsv(${t}, ${n}%, ${r}%)`:`hsva(${t}, ${n}%, ${r}%, ${this.roundA})`},e.prototype.toHsl=function(){var e=fu(this.r,this.g,this.b);return{h:e.h*360,s:e.s,l:e.l,a:this.a}},e.prototype.toHslString=function(){var e=fu(this.r,this.g,this.b),t=Math.round(e.h*360),n=Math.round(e.s*100),r=Math.round(e.l*100);return this.a===1?`hsl(${t}, ${n}%, ${r}%)`:`hsla(${t}, ${n}%, ${r}%, ${this.roundA})`},e.prototype.toHex=function(e){return e===void 0&&(e=!1),_u(this.r,this.g,this.b,e)},e.prototype.toHexString=function(e){return e===void 0&&(e=!1),`#`+this.toHex(e)},e.prototype.toHex8=function(e){return e===void 0&&(e=!1),vu(this.r,this.g,this.b,this.a,e)},e.prototype.toHex8String=function(e){return e===void 0&&(e=!1),`#`+this.toHex8(e)},e.prototype.toHexShortString=function(e){return e===void 0&&(e=!1),this.a===1?this.toHexString(e):this.toHex8String(e)},e.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},e.prototype.toRgbString=function(){var e=Math.round(this.r),t=Math.round(this.g),n=Math.round(this.b);return this.a===1?`rgb(${e}, ${t}, ${n})`:`rgba(${e}, ${t}, ${n}, ${this.roundA})`},e.prototype.toPercentageRgb=function(){var e=function(e){return`${Math.round(iu(e,255)*100)}%`};return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}},e.prototype.toPercentageRgbString=function(){var e=function(e){return Math.round(iu(e,255)*100)};return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`},e.prototype.toName=function(){if(this.a===0)return`transparent`;if(this.a<1)return!1;for(var e=`#`+_u(this.r,this.g,this.b,!1),t=0,n=Object.entries(Cu);t<n.length;t++){var r=n[t],i=r[0];if(e===r[1])return i}return!1},e.prototype.toString=function(e){var t=!!e;e??=this.format;var n=!1,r=this.a<1&&this.a>=0;return!t&&r&&(e.startsWith(`hex`)||e===`name`)?e===`name`&&this.a===0?this.toName():this.toRgbString():(e===`rgb`&&(n=this.toRgbString()),e===`prgb`&&(n=this.toPercentageRgbString()),(e===`hex`||e===`hex6`)&&(n=this.toHexString()),e===`hex3`&&(n=this.toHexString(!0)),e===`hex4`&&(n=this.toHex8String(!0)),e===`hex8`&&(n=this.toHex8String()),e===`name`&&(n=this.toName()),e===`hsl`&&(n=this.toHslString()),e===`hsv`&&(n=this.toHsvString()),n||this.toHexString())},e.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},e.prototype.clone=function(){return new e(this.toString())},e.prototype.lighten=function(t){t===void 0&&(t=10);var n=this.toHsl();return n.l+=t/100,n.l=au(n.l),new e(n)},e.prototype.brighten=function(t){t===void 0&&(t=10);var n=this.toRgb();return n.r=Math.max(0,Math.min(255,n.r-Math.round(255*-(t/100)))),n.g=Math.max(0,Math.min(255,n.g-Math.round(255*-(t/100)))),n.b=Math.max(0,Math.min(255,n.b-Math.round(255*-(t/100)))),new e(n)},e.prototype.darken=function(t){t===void 0&&(t=10);var n=this.toHsl();return n.l-=t/100,n.l=au(n.l),new e(n)},e.prototype.tint=function(e){return e===void 0&&(e=10),this.mix(`white`,e)},e.prototype.shade=function(e){return e===void 0&&(e=10),this.mix(`black`,e)},e.prototype.desaturate=function(t){t===void 0&&(t=10);var n=this.toHsl();return n.s-=t/100,n.s=au(n.s),new e(n)},e.prototype.saturate=function(t){t===void 0&&(t=10);var n=this.toHsl();return n.s+=t/100,n.s=au(n.s),new e(n)},e.prototype.greyscale=function(){return this.desaturate(100)},e.prototype.spin=function(t){var n=this.toHsl(),r=(n.h+t)%360;return n.h=r<0?360+r:r,new e(n)},e.prototype.mix=function(t,n){n===void 0&&(n=50);var r=this.toRgb(),i=new e(t).toRgb(),a=n/100;return new e({r:(i.r-r.r)*a+r.r,g:(i.g-r.g)*a+r.g,b:(i.b-r.b)*a+r.b,a:(i.a-r.a)*a+r.a})},e.prototype.analogous=function(t,n){t===void 0&&(t=6),n===void 0&&(n=30);var r=this.toHsl(),i=360/n,a=[this];for(r.h=(r.h-(i*t>>1)+720)%360;--t;)r.h=(r.h+i)%360,a.push(new e(r));return a},e.prototype.complement=function(){var t=this.toHsl();return t.h=(t.h+180)%360,new e(t)},e.prototype.monochromatic=function(t){t===void 0&&(t=6);for(var n=this.toHsv(),r=n.h,i=n.s,a=n.v,o=[],s=1/t;t--;)o.push(new e({h:r,s:i,v:a})),a=(a+s)%1;return o},e.prototype.splitcomplement=function(){var t=this.toHsl(),n=t.h;return[this,new e({h:(n+72)%360,s:t.s,l:t.l}),new e({h:(n+216)%360,s:t.s,l:t.l})]},e.prototype.onBackground=function(t){var n=this.toRgb(),r=new e(t).toRgb(),i=n.a+r.a*(1-n.a);return new e({r:(n.r*n.a+r.r*r.a*(1-n.a))/i,g:(n.g*n.a+r.g*r.a*(1-n.a))/i,b:(n.b*n.a+r.b*r.a*(1-n.a))/i,a:i})},e.prototype.triad=function(){return this.polyad(3)},e.prototype.tetrad=function(){return this.polyad(4)},e.prototype.polyad=function(t){for(var n=this.toHsl(),r=n.h,i=[this],a=360/t,o=1;o<t;o++)i.push(new e({h:(r+o*a)%360,s:n.s,l:n.l}));return i},e.prototype.equals=function(t){return this.toRgbString()===new e(t).toRgbString()},e}();function Mu(e,t){var n=new ju(e),r=new ju(t);return(Math.max(n.getLuminance(),r.getLuminance())+.05)/(Math.min(n.getLuminance(),r.getLuminance())+.05)}function Nu(e,t,n){n===void 0&&(n={level:`AA`,size:`small`});var r=Mu(e,t);switch((n.level??`AA`)+(n.size??`small`)){case`AAsmall`:case`AAAlarge`:return r>=4.5;case`AAlarge`:return r>=3;case`AAAsmall`:return r>=7;default:return!1}}const Pu={active_color:`undefined`,elements:[]};function Fu(e,t){let n=B(`#foreground`,e),r=B(`#background`,e),i=B(`#border`,e),a=B(`input`,n[0]),o=B(`input`,r[0]),s=B(`input`,i[0]),c={active:`0 0 0 2px var(--neon-pink), rgba(0, 0, 0, 0.25) 0px 0.25em 0.5em`,inactive:`0 0 0 2px var(--theme-bg), rgba(0, 0, 0, 0.25) 0px 0.25em 0.5em`};a.on(`input`,({target:{value:e}})=>{Pu.elements.map(t=>t.style.color=e),n[0].style.setProperty(`--contextual_color`,e)}),o.on(`input`,({target:{value:e}})=>{Pu.elements.map(t=>t.style[t instanceof SVGElement?`fill`:`backgroundColor`]=e),r[0].style.setProperty(`--contextual_color`,e)}),s.on(`input`,({target:{value:e}})=>{Pu.elements.map(t=>t.style[t instanceof SVGElement?`stroke`:`borderColor`]=e),i[0].style.setProperty(`--contextual_color`,e)});let l=e=>{Pu.elements=e;let t=!1,l=!1,u=!1,f,p,m;if(Pu.elements.length==1){let e=Pu.elements[0];if(e instanceof SVGElement){f=new ju(`rgb(0, 0, 0)`);var h=G(e,`stroke`);m=new ju(h===`none`?`rgb(0, 0, 0)`:h),p=new ju(G(e,`fill`))}else f=new ju(G(e,`color`)),p=new ju(G(e,`backgroundColor`)),m=G(e,`borderWidth`)===`0px`?new ju(`rgb(0, 0, 0)`):new ju(G(e,`borderColor`));let c=`#`+f.toHex(),g=`#`+p.toHex(),_=`#`+m.toHex();t=f.originalInput!==`rgb(0, 0, 0)`||e.children.length===0&&e.textContent!==``,l=p.originalInput!==`rgba(0, 0, 0, 0)`,u=m.originalInput!==`rgb(0, 0, 0)`,t&&!l?d(`foreground`):(l&&!t||l&&t)&&d(`background`);let v=t?c:``,y=l?g:``,b=u?_:``,x=t?Nl(c):``,S=l?Nl(g):``,C=u?Nl(_):``;a.attr(`value`,c),o.attr(`value`,g),s.attr(`value`,_),a.value=c,o.value=g,s.value=_,n.attr(`style`,`
        --contextual_color: ${v};
        --icon_color: ${x};
      `),r.attr(`style`,`
        --contextual_color: ${y};
        --icon_color: ${S};
      `),i.attr(`style`,`
        --contextual_color: ${b};
        --icon_color: ${C};
      `)}else n.attr(`style`,`
        box-shadow: ${Pu.active_color==`foreground`?c.active:c.inactive};
        --contextual_color: transparent;
        --icon_color: var(--theme-bg);
      `),r.attr(`style`,`
        box-shadow: ${Pu.active_color==`background`?c.active:c.inactive};
        --contextual_color: transparent;
        --icon_color: var(--theme-bg);
      `),i.attr(`style`,`
        box-shadow: ${Pu.active_color==`border`?c.active:c.inactive};
        --contextual_color: transparent;
        --icon_color: var(--theme-bg);
      `)},u=()=>Pu.active_color,d=e=>{f(),Pu.active_color=e,e===`foreground`&&(n[0].style.boxShadow=c.active),e===`background`&&(r[0].style.boxShadow=c.active),e===`border`&&(i[0].style.boxShadow=c.active)},f=()=>[n,r,i].forEach(([e])=>e.style.boxShadow=c.inactive);return t.onSelectedUpdate(l),{getActive:u,setActive:d,foreground:{color:e=>n[0].style.setProperty(`--contextual_color`,e)},background:{color:e=>r[0].style.setProperty(`--contextual_color`,e)}}}const Iu=(e,t)=>{let n=e.startsWith(`rgb`);return t===`hsl`?new Al(e).to(`hsl`).toString({precision:2}):n?new Al(e).toString({format:t,precision:2}):e};let Lu=[],Ru=[],zu;const Bu={watching:!0};function Vu(){Lu=B([...document.images,...B(`picture`),...od(document)]),Wu(Lu),Uu(Lu)}function Hu({watch:e}){Bu.watching=e}const Uu=e=>{e.on(`dragover`,Ju),e.on(`dragleave`,Yu),e.on(`drop`,Xu),B(document.body).on(`dragover`,Ju),B(document.body).on(`dragleave`,Yu),B(document.body).on(`drop`,Xu),B(document.body).on(`dragstart`,Ku),B(document.body).on(`dragend`,qu)},Wu=e=>{e.off(`dragover`,Ju),e.off(`dragleave`,Yu),e.off(`drop`,Xu),B(document.body).off(`dragover`,Ju),B(document.body).off(`dragleave`,Yu),B(document.body).off(`drop`,Xu),B(document.body).off(`dragstart`,Ku),B(document.body).off(`dragend`,qu),e=[]},Gu=e=>new Promise((t,n)=>{let r=new FileReader;r.readAsDataURL(e),r.onloadend=()=>t(r.result)}),Ku=({target:e})=>zu=e,qu=e=>zu=void 0,Ju=async e=>{e.preventDefault(),e.stopPropagation();let t=B(`img[data-selected=true], [data-selected=true] > img`);Lu.some(t=>t===e.target)&&(t.length?(t.some(t=>t==e.target)&&!dd(e)&&t.forEach(e=>sd(e)),t.forEach((e,t)=>id(e,t))):(dd(e)||sd(e.target),id(e.currentTarget,0)))},Yu=e=>{e.stopPropagation();let t=B(`img[data-selected=true], [data-selected=true] > img`);t.some(t=>t===e.target)?t.forEach(e=>ld(e)):ld(e.target),ad()},Xu=async e=>{e.stopPropagation(),e.preventDefault();let t=await Zu(zu,e);if(t.length){let n=Qu(B(`img[data-selected=true], [data-selected=true] > img`),e);n.length?$u(n,t):nd(td(Lu,e),t[0])}ad()},Zu=async(e,t)=>e?[e.currentSrc]:t.dataTransfer.files.length?await Promise.all([...t.dataTransfer.files].filter(e=>e.type.includes(`image`)).map(Gu)):[],Qu=(e,t)=>e.length?e:t.target.nodeName===`IMG`&&!e.length?[t.target]:[],$u=(e,t)=>{let n=0;e.forEach(e=>{ud(e),ed(e,t[n]),n=++n%t.length})},ed=(e,t)=>{e.src=t,e.srcset!==``&&(e.srcset=t);let n=rd(e);n.length&&n.forEach(e=>e.srcset=t)},td=(e,t)=>e.filter(e=>e.contains(t.target)),nd=(e,t)=>e.forEach(e=>{ud(e),window.getComputedStyle(e).backgroundImage!=`none`&&(e.style.backgroundImage=`url(${t})`)}),rd=e=>Array.from(e.parentElement.children).filter(e=>e.nodeName===`SOURCE`).filter(e=>!e.media||window.matchMedia(e.media).matches),id=(e,t)=>{if(!Bu.watching)return;let n=e.getBoundingClientRect(),r=Ru[t];r?r.update=n:(Ru[t]=document.createElement(`visbug-overlay`),Ru[t].position=n,document.body.appendChild(Ru[t]))},ad=()=>{Ru.forEach(e=>e.remove()),Ru=[]},od=e=>{let t=/url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;return B(`*`).reduce((e,n)=>{let r=G(n,`background-image`);return t.exec(r)&&e.push(n),e},[])},sd=async e=>{if(![`lastSrc`,`lastSrcset`,`lastSiblings`,`lastBackgroundImage`].some(t=>e[t])){let t=zu.currentSrc;window.getComputedStyle(e).backgroundImage===`none`?(cd(e),ed(e,t)):(e.lastBackgroundImage=window.getComputedStyle(e).backgroundImage,e.style.backgroundImage=`url(${t})`)}},cd=e=>{e.lastSrc=e.src,e.lastSrcset=e.srcset;let t=rd(e);t.length&&t.forEach(e=>{e.lastSrcset=e.srcset,e.lastSrc=e.src})},ld=e=>{e.lastSrc&&(e.src=e.lastSrc),e.lastSrcset&&(e.srcset=e.lastSrcset);let t=rd(e);t.length&&t.forEach(e=>{e.lastSrcset&&(e.srcset=e.lastSrcset),e.lastSrc&&(e.src=e.lastSrc)}),e.lastBackgroundImage&&(e.style.backgroundImage=e.lastBackgroundImage),ud(e)},ud=e=>{[`lastSrc`,`lastSrcset`,`lastBackgroundImage`].forEach(t=>e[t]=null);let t=rd(e);t&&t.forEach(e=>{e.lastSrcset=null,e.lastSrc=null})},dd=e=>e.dataTransfer.types.some(e=>e===`Files`),fd=`up,down,left,right`,Z={drag:{src:null,parent:null,parent_ui:[],siblings:new Map,swapping:new Map},hover:{dropzones:[],observers:[]}};function pd(e){return U(fd,(t,{key:n})=>{t.cancelBubble||(t.preventDefault(),t.stopPropagation(),e.selection().forEach(e=>{md(e,n),Fd(e)}))}),e.onSelectedUpdate(xd),Hu({watch:!1}),()=>{Hu({watch:!0}),e.removeSelectedCallback(xd),Pd(),U.unbind(fd)}}function md(e,t){if(e)switch(t){case`left`:hd(e)?e.parentNode.insertBefore(e,e.previousElementSibling):$i(e.parentNode);break;case`right`:gd(e)&&e.nextElementSibling.nextSibling?e.parentNode.insertBefore(e,e.nextElementSibling.nextSibling):gd(e)?e.parentNode.appendChild(e):$i(e.parentNode);break;case`up`:yd(e)&&bd({el:e});break;case`down`:vd(e)?bd({el:e,under:!0}):_d(e)&&e.nextElementSibling.prepend(e);break}}const hd=e=>e.previousElementSibling,gd=e=>e.nextElementSibling,_d=e=>e.nextElementSibling&&e.nextElementSibling.children.length,vd=e=>!e.nextElementSibling&&e.parentNode&&e.parentNode.parentNode,yd=e=>e.parentNode&&e.parentNode.parentNode,bd=({el:e,under:t=!1})=>e.parentNode.parentNode.insertBefore(e,e.parentNode.parentNode.children[t?Qi(e)+1:Qi(e)]);function xd(e){if(!e.length)return;Pd();let[t]=e,{parentNode:n}=t,r=[...n.querySelectorAll(`:scope > *`+Yi)],i=e.length!==1,a=r.length<=1,o=t instanceof SVGElement;i||a||o||(r.forEach(e=>Z.drag.siblings.set(e,Md(e))),Z.drag.parent=n,Z.drag.parent_ui=Nd(n),Sd(Z.drag.parent))}const Sd=e=>{let t=B(e);t.on(`mouseleave`,Ed),t.on(`dragstart`,wd),t.on(`drop`,Ed),Z.drag.siblings.forEach((e,t)=>{t.setAttribute(`draggable`,!0),B(t).on(`dragover`,Td),B(t).on(`mouseenter`,Dd),B(t).on(`mouseleave`,Od)})},Cd=e=>{let t=B(e);t.off(`mouseleave`,Ed),t.off(`dragstart`,wd),t.off(`drop`,Ed),Z.drag.siblings.forEach((e,t)=>{t.removeAttribute(`draggable`),B(t).off(`dragover`,Td),B(t).off(`mouseenter`,Dd),B(t).off(`mouseleave`,Od)})},wd=({target:e})=>{Z.drag.siblings.has(e)&&(Z.drag.src=e,Z.hover.dropzones.push(jd(e)),Z.drag.siblings.get(e).style.opacity=.01,e.setAttribute(`visbug-drag-src`,!0),kd(e),B(`visbug-hover`).forEach(e=>!e.hasAttribute(`visbug-drag-container`)&&e.remove()))},Td=e=>{!Z.drag.src||Z.drag.swapping.get(e.target)||e.target.hasAttribute(`visbug-drag-src`)||!Z.drag.siblings.has(e.currentTarget)||e.currentTarget!==e.target||(Z.drag.swapping.set(e.target,!0),sa(Z.drag.src,e.target),setTimeout(()=>Z.drag.swapping.delete(e.target),250))},Ed=e=>{Z.drag.src&&(Z.drag.src.removeAttribute(`visbug-drag-src`),Ad(Z.drag.src),Z.drag.siblings.has(Z.drag.src)&&(Z.drag.siblings.get(Z.drag.src).style.opacity=null),Z.hover.dropzones.forEach(e=>e.remove()),Z.drag.src=null)},Dd=({target:e})=>{Z.drag.siblings.has(e)&&Z.drag.siblings.get(e).toggleHovering({hovering:!0})},Od=({target:e})=>{Z.drag.siblings.has(e)&&Z.drag.siblings.get(e).toggleHovering({hovering:!1})},kd=({style:e})=>{e.transition=`opacity .25s ease-out`,e.opacity=.01},Ad=({style:e})=>{e.transition=null,e.opacity=null},jd=e=>{let t=document.createElement(`visbug-corners`);t.position={el:e},document.body.appendChild(t);let n=new MutationObserver(n=>t.position={el:e});return n.observe(e.parentNode,{childList:!0,subtree:!0}),Z.hover.observers.push(n),t},Md=e=>{let t=document.createElement(`visbug-grip`);t.position={el:e},document.body.appendChild(t);let n=new MutationObserver(n=>t.position={el:e});return n.observe(e.parentNode,{childList:!0,subtree:!0}),Z.hover.observers.push(n),t},Nd=e=>{let t=document.createElement(`visbug-hover`),n=document.createElement(`visbug-label`);t.position={el:e},t.setAttribute(`visbug-drag-container`,!0),n.text=`Drag Bounds`,n.position={boundingRect:e.getBoundingClientRect()},n.style.setProperty(`--label-bg`,`var(--theme-purple)`),document.body.appendChild(t),document.body.appendChild(n);let r=new MutationObserver(r=>{t.position={el:e},n.position={boundingRect:e.getBoundingClientRect()}});return r.observe(e,{childList:!0,subtree:!0}),Z.hover.observers.push(r),[t,n]};function Pd(){Cd(Z.drag.parent),Z.hover.observers.forEach(e=>e.disconnect()),Z.hover.dropzones.forEach(e=>e.remove()),Z.drag.siblings.forEach((e,t)=>e.remove()),Z.drag.parent_ui.forEach(e=>e.remove()),Z.hover.observers=[],Z.hover.dropzones=[],Z.drag.parent_ui=[],Z.drag.siblings.clear()}const Fd=e=>{let t=``;hd(e)&&(t+=`⇠`),gd(e)&&(t+=`⇢`),_d(e)&&(t+=`⇣`),yd(e)&&(t+=`⇡`),t&&console.info(`%c`+t,`font-size: 2rem;`)};function Id(e){function t(){i&&(n.length>0&&/^[~+>]$/.test(n[n.length-1])&&n.push(` `),n.push(i))}var n=[],r,i,a,o=[0],s=0,c,l=/(?:[^\\]|(?:^|[^\\])(?:\\\\)+)$/,u=/^\s+$/,d=[/\s+|\/\*|["'>~+[(]/g,/\s+|\/\*|["'[\]()]/g,/\s+|\/\*|["'[\]()]/g,null,/\*\//g];for(e=e.trim();;)if(i=``,a=d[o[o.length-1]],a.lastIndex=s,r=a.exec(e),r)if(c=s,s=a.lastIndex,c<s-r[0].length&&(i=e.substring(c,s-r[0].length)),o[o.length-1]<3){if(t(),r[0]===`[`)o.push(1);else if(r[0]===`(`)o.push(2);else if(/^["']$/.test(r[0]))o.push(3),d[3]=new RegExp(r[0],`g`);else if(r[0]===`/*`)o.push(4);else if(/^[\])]$/.test(r[0])&&o.length>0)o.pop();else if(/^(?:\s+|[~+>])$/.test(r[0])&&(n.length>0&&!u.test(n[n.length-1])&&o[o.length-1]===0&&n.push(` `),o[o.length-1]===1&&n.length===5&&n[2].charAt(n[2].length-1)===`=`&&(n[4]=` `+n[4]),u.test(r[0])))continue;n.push(r[0])}else n[n.length-1]+=i,l.test(n[n.length-1])&&(o[o.length-1]===4&&(n.length<2||u.test(n[n.length-2])?n.pop():n[n.length-1]=` `,r[0]=``),o.pop()),n[n.length-1]+=r[0];else{i=e.substr(s),t();break}return n.join(``).trim()}function Ld(e,t=document,n=null){return Rd(e,!0,t,n)}function Rd(e,t,n,r=null){e=Id(e);let i=n.querySelector(e);return document.head.createShadowRoot||document.head.attachShadow?!t&&i?i:Bd(e,`,`).reduce((e,i)=>{if(!t&&e)return e;let a=Bd(i.replace(/^\s+/g,``).replace(/\s*([>+~]+)\s*/g,`$1`),` `).filter(e=>!!e).map(e=>Bd(e,`>`)),o=a.length-1,s=a[o][a[o].length-1],c=Ud(s,n,r),l=zd(a,o,n);return t?(e=e.concat(c.filter(l)),e):(e=c.find(l),e||null)},t?[]:null):t?n.querySelectorAll(e):i}function zd(e,t,n){return r=>{let i=t,a=r,o=!1;for(;a&&!Vd(a);){let t=!0;if(e[i].length===1)t=a.matches(e[i]);else{let r=[].concat(e[i]).reverse(),o=a;for(let e of r){if(!o||!o.matches(e)){t=!1;break}o=Hd(o,n)}}if(t&&i===0){o=!0;break}t&&i--,a=Hd(a,n)}return o}}function Bd(e,t){return e.match(/\\?.|^$/g).reduce((e,n)=>(n===`"`&&!e.sQuote?(e.quote^=1,e.a[e.a.length-1]+=n):n===`'`&&!e.quote?(e.sQuote^=1,e.a[e.a.length-1]+=n):!e.quote&&!e.sQuote&&n===t?e.a.push(``):e.a[e.a.length-1]+=n,e),{a:[``]}).a}function Vd(e){return e.nodeType===Node.DOCUMENT_FRAGMENT_NODE||e.nodeType===Node.DOCUMENT_NODE}function Hd(e,t){let n=e.parentNode;return n&&n.host&&n.nodeType===11?n.host:n===t?null:n}function Ud(e=null,t,n=null){let r=[];if(n)r=n;else{let e=function(t){for(let n=0;n<t.length;n++){let i=t[n];r.push(i),i.shadowRoot&&e(i.shadowRoot.querySelectorAll(`*`))}};t.shadowRoot&&e(t.shadowRoot.querySelectorAll(`*`)),e(t.querySelectorAll(`*`))}return e?r.filter(t=>t.matches(e)):r}const Wd=[`empty page`,`blank page`,`clear canvas`];function Gd(){document.querySelectorAll(`body > *:not(vis-bug):not(script)`).forEach(e=>e.remove())}const Kd=[`barrel roll`,`do a barrel roll`];async function qd(){document.body.style.transformOrigin=`center 50vh`,await document.body.animate([{transform:`rotateZ(0)`},{transform:`rotateZ(1turn)`}],{duration:1500}).finished,document.body.style.transformOrigin=``}const Jd=[`tag debugger`,`osmani`];async function Yd(){let e,t;for(e=0;t=document.querySelectorAll(`*`)[e++];)t.style.outline=`solid hsl(${(t+t).length*9},99%,50%) 1px`}const Xd=[`shuffle`];var Zd=async e=>{let t=e=>{let t=[],n=e.firstChild;for(;n;)n.nodeType===1&&n!==e&&t.push(n),n=n.nextSibling;return t},n=e=>{let t=e.length,n,r;for(;t!==0;)r=Math.floor(Math.random()*t),--t,n=e[t],e[t]=e[r],e[r]=n;return e},r=(e,t)=>{e.innerHTML=``;for(let n=0;n<t.length;n++)e.appendChild(t[n])},{selected:i}=e;i.map(e=>{r(e,n(t(e)))})};const Qd=[`zindex`,`z-index`];function $d(){Array.from(document.querySelectorAll(`*`)).filter(e=>window.getComputedStyle(e).getPropertyValue(`z-index`)!==`auto`).filter(e=>e.nodeName!==`VIS-BUG`).forEach(e=>{let t=Ml[Pl(0,Ml.length)],n=window.getComputedStyle(e).getPropertyValue(`z-index`),r=document.createElement(`visbug-label`);r.text=`z-index: ${n}`,r.position={boundingRect:e.getBoundingClientRect(),isFixed:ua(e)},r.style.setProperty(`--label-bg`,t);let i=document.createElement(`visbug-hover`);i.position={el:e},i.style.setProperty(`--hover-stroke`,t),i.style.setProperty(`--position`,ua(e)?`fixed`:`absolute`),document.body.appendChild(r),document.body.appendChild(i)})}const ef=[`remove css`,`disable css`];function tf(){[...document.querySelectorAll(`style`),...document.querySelectorAll(`link`)].forEach(e=>e.remove()),document.querySelectorAll(`[style]:not(vis-bug)`).forEach(e=>e.removeAttribute(`style`))}const nf=[`detect overflows`,`overflow`];var rf=e=>{let t;t=e&&e.selected.length?e.selected:[document.body],document.body.querySelectorAll(`visbug-label`).forEach(e=>e.remove()),t.map(e=>{e.querySelectorAll(`*`).forEach(t=>{let n=t.offsetWidth>e.offsetWidth,r=t.offsetHeight>e.offsetHeight,i=t.tagName===`visbug-label`,a=t.lastChild&&t.lastChild.tagName===`visbug-label`;if((n||r)&&!i&&!a){let i=document.createElement(`visbug-label`);i.text=`overflowing ${n&&r?`x and y`:n?`x`:`y`}`,i.position={boundingRect:t.getBoundingClientRect(),isFixed:ua(t)};let a=Ml[Pl(0,Ml.length)];i.style.setProperty(`--label-bg`,a),e.appendChild(i),t.style.setProperty(`outline`,`1px solid ${a}`)}})})};const af=[`loop through widths`,`loop thru widths`];async function of(){let e=(function(){let e=!0,t,n=screen.width,r=!0;i(),c(),t.onbeforeunload=function(){s(),console.log(`Stopped timer.`)};function i(){t=window.open(location.href,`_blank`,`width=100, top=0, left=0`)}function a(){t.resizeBy(5,0)}function o(){t.resizeBy(-5,0)}function s(){e=!1}function c(){e=!0,console.log(`Popup will start looping thru screen widths in 3 seconds.`),t.focus(),setTimeout(function(){l();let e=`background: black; color: lime;`,t=`background: inherit; color: inherit;`;console.log(`You can run %ctest.stop()%c to stop, and 
%ctest.go()%c to continue.`,e,t,e,t)},3e3)}function l(){let i=setInterval(function(){e||(clearTimeout(i),t.focus()),n<=t.outerWidth?r=!1:t.outerWidth<=152&&(r=!0),r?a():o()},100)}return{stop:s,go:c,popup:t}})();typeof window<`u`&&(window.test=e)}const sf=[`expand-text`];async function cf(){let e={expanded:!0,predictableMode:!1},t=`̟́`;console.log(`Reference expansion table: https://www.w3.org/International/articles/article-text-size`),alert(`Click on the page, then: 

hit the Ctrl key to toggle translation size expansion, or 

hit the Shift key to toggle random insertion of spaces.`),n(),document.body.addEventListener(`keydown`,function(t){t.ctrlKey?(e.expanded=!e.expanded,e.expanded?n():r()):t.shiftKey&&(e.predictableMode=!e.predictableMode,e.predictableMode?alert(`Spaces will NOT be randomly included.`):alert(`Spaces WILL be randomly included.`))});function n(){[...document.querySelectorAll(`body *`)].filter(e=>i(e)).reverse().forEach(e=>s(e))}function r(){[...document.querySelectorAll(`body *`)].filter(e=>i(e)).reverse().forEach(e=>o(e))}function i(e){return e.innerText&&e.innerText.trim()&&a(e)}function a(e){return[...e.childNodes].some(e=>e.nodeType===Node.TEXT_NODE)}function o(e){let t=e.getAttribute(`data-englishToExpectedEuropeanLanguageExpansionSize`);if(t){let n=JSON.parse(t).originalLength,r=JSON.parse(t).expandedLength-n;e.innerHTML=e.innerHTML.slice(0,-r*3)}}function s(e){let t=e.getAttribute(`data-englishToExpectedEuropeanLanguageExpansionSize`);if(t||e.querySelectorAll(`[data-englishToExpectedEuropeanLanguageExpansionSize]`).length){if(e.hasAttribute(`data-englishToExpectedEuropeanLanguageExpansionSize`)){let n=JSON.parse(t).originalLength,r=JSON.parse(t).expandedLength;e.innerHTML=e.innerHTML.slice(0,n),e.innerHTML+=l(r-n)}}else{let t=e.innerHTML.length,n=e.innerText.trim().length,r=c(e.innerText.trim())-n;e.innerHTML+=l(r);let i={originalLength:t,expandedLength:t+r};e.setAttribute(`data-englishToExpectedEuropeanLanguageExpansionSize`,JSON.stringify(i))}}function c(e){let t=e.length;return e.length<=10?t=e.length*3:e.length<=20?t=e.length*2:e.length<=30?t=e.length*1.8:e.length<=50?t=e.length*1.6:e.length<=70?t=e.length*1.7:e.length>70&&(t=e.length*1.3),Math.ceil(t)}function l(n){let r=``,i=e.predictableMode?0:.1,a=0;for(;a<n;){let e=a<n-1,o=a>0&&r[a-1]===` `;e&&!o&&Math.random()>=1-i?r+=` `+t:r+=`abcdefghijklmnopqrstuvwxyz`[a%26]+t,a++}return r}}const lf=(e,t)=>e.reduce((e,n)=>Object.assign(e,{[`/${n}`]:t}),{}),uf=new Map(Object.entries({...lf(Wd,Gd),...lf(Kd,qd),...lf(Jd,Yd),...lf(Xd,Zd),...lf(Qd,$d),...lf(ef,tf),...lf(nf,rf),...lf(af,of),...lf(sf,cf)})),df=[{command:Wd[0],description:`remove all elements on the page (body tag)`},{command:Kd[0],description:`spin the page once`},{command:Jd[0],description:`outline every DOM element with a random color, to visualize layout`},{command:Xd[0],description:`shuffle the direct children of the currently-selected element`},{command:Qd[0],description:`show the z-index values of all elements that have z-index explicitly set (not auto)`},{command:ef[0],description:`remove the style and link tags from the page`},{command:nf[0],description:`find elements that overflow the page body`},{command:af[0],description:`loops through screen widths in a popup`},{command:sf[0],description:`simulate translated text expansion based on a w3.org table`}].map(e=>(e.command=`/${e.command}`,e));let ff;const pf=document.createElement(`div`);pf.classList.add(`search`),pf.innerHTML=`
  <input list="visbug-plugins" type="search" placeholder="ex: images, .btn, button, text, ..."/>
  <datalist id="visbug-plugins">
    ${Ci>0?`<option value="h1, h2, h3, .get-multiple">
          <option value="nav > a:first-child">
          <option value="#get-by-id">
          <option value=".get-by.class-names">
          <option value="images">
          <option value="text">
          <hr>`:`<option value="h1, h2, h3, .get-multiple">example</option>
          <option value="nav > a:first-child">example</option>
          <option value="#get-by-id">example</option>
          <option value=".get-by.class-names">example</option>
          <option value="images">alias</option>
          <option value="text">alias</option>
          <hr>`}

    ${df.reduce((e,t)=>e+=Ci>0?`<option value="${t.command}">`:`<option value="${t.command}">${t.description}`,``)}
  </datalist>
`;const mf=B(pf),hf=B(`input`,pf),gf=()=>mf.attr(`style`,`display:block`),_f=()=>mf.attr(`style`,`display:none`),vf=e=>e.key!=`Escape`&&e.stopPropagation();function yf(e){e&&e[0].appendChild(mf[0]);let t=e=>{e.preventDefault(),e.stopPropagation();let t=e.target.value;window.requestIdleCallback(e=>xf(t))},n=e=>hf[0].focus();return hf.on(`click`,n),hf.on(`input`,t),hf.on(`keydown`,vf),gf(),n(),()=>{_f(),hf.off(`oninput`,t),hf.off(`keydown`,vf),hf.off(`blur`,_f)}}function bf(e){ff=e}function xf(e,t){if(uf.has(e))return uf.get(e)({selected:ff.selection(),query:e});if(e==`links`&&(e=`a`),e==`buttons`&&(e=`button`),e==`images`&&(e=`img`),e==`text`&&(e=`p,caption,a,h1,h2,h3,h4,h5,h6,small,date,time,li,dt,dd`),!e)return ff.unselect_all();if(!(e==`.`||e==`#`||e.trim().endsWith(`,`)))try{let n=Ld(e+Yi);n.length||(n=Ld(e)),n.length&&n.forEach(e=>t?t(e):ff.select(e))}catch{}}const Sf={distances:[],target:null};function Cf({$anchor:e,$target:t}){if(Sf.target==t&&Sf.distances.length)return;Sf.target=t,Sf.distances.length&&wf();let n=e.getBoundingClientRect(),r=t.getBoundingClientRect(),i=[],a=2.5;n.right<r.left&&i.push({x:n.right,y:n.top+n.height/2-a,d:r.left-n.right,q:`right`}),n.right<r.right&&n.right>r.left&&i.push({x:n.right,y:n.top+n.height/2-a,d:r.right-n.right,q:`right`}),n.left>r.right?i.push({x:r.right,y:n.top+n.height/2-a,d:n.left-r.right,q:`left`}):n.left>r.left&&n.left<r.right&&i.push({x:r.left,y:n.top+n.height/2-a,d:n.left-r.left,q:`left`}),n.top>r.bottom&&i.push({x:n.left+n.width/2-a,y:r.bottom,d:n.top-r.bottom,q:`top`,v:!0}),n.top>r.top&&n.top<r.bottom&&i.push({x:n.left+n.width/2-a,y:r.top,d:n.top-r.top,q:`top`,v:!0}),n.bottom<r.top&&i.push({x:n.left+n.width/2-a,y:n.bottom,d:r.top-n.bottom,q:`bottom`,v:!0}),n.bottom<r.bottom&&n.bottom>r.top&&i.push({x:n.left+n.width/2-a,y:n.bottom,d:r.bottom-n.bottom,q:`bottom`,v:!0}),n.right>r.right&&n.left<r.left&&(i.push({x:r.right,y:n.top+n.height/2-a,d:n.right-r.right,q:`left`}),i.push({x:n.left,y:n.top+n.height/2-a,d:r.left-n.left,q:`right`})),n.top<r.top&&n.bottom>r.bottom&&(i.push({x:n.left+n.width/2-a,y:n.top,d:r.top-n.top,q:`bottom`,v:!0}),i.push({x:n.left+n.width/2-a,y:r.bottom,d:n.bottom-r.bottom,q:`top`,v:!0})),i.map(e=>Object.assign(e,{d:Math.round(e.d.toFixed(1)*100)/100})).forEach(e=>{let t=document.createElement(`visbug-distance`);t.position={line_model:e,node_label_id:Sf.distances.length},document.body.appendChild(t),t.isPopover(),Sf.distances[Sf.distances.length]=t})}function wf(){Sf.distances&&=(B(`[data-measuring]`).forEach(e=>e.removeAttribute(`data-measuring`)),Sf.distances.forEach(e=>e.remove()),[])}function Tf(){let e=[...Sf.distances];return Sf.distances=[],e}const Ef=`up,down,left,right`.split(`,`).reduce((e,t)=>`${e},${t},alt+${t},shift+${t},shift+alt+${t}`,``).substring(1),Df=`${K}+up,${K}+shift+up,${K}+down,${K}+shift+down`;function Of(e){return U(Ef,(t,n)=>{t.cancelBubble||(t.preventDefault(),kf(e.selection(),n.key))}),U(Df,(t,n)=>{t.preventDefault(),Af(e.selection(),n.key)}),e.onSelectedUpdate(jf),()=>{U.unbind(Ef),U.unbind(Df),U.unbind(`up,down,left,right`),e.removeSelectedCallback(jf),Mf(e.selection())}}function kf(e,t){e.map(e=>ta(e)).map(e=>({el:e,style:`padding`+Zi(t),current:parseInt(G(e,`padding`+Zi(t)),10),amount:t.split(`+`).includes(`shift`)?10:1,negative:t.split(`+`).includes(`alt`)})).map(e=>Object.assign(e,{padding:e.negative?e.current-e.amount:e.current+e.amount})).forEach(({el:e,style:t,padding:n})=>e.style[t]=`${n<0?0:n}px`)}function Af(e,t){let n=t.split(`+`),r=``;n.includes(`shift`)&&(r=`shift+`+r),n.includes(`down`)&&(r=`alt+`+r),`up,down,left,right`.split(`,`).forEach(t=>kf(e,r+t))}function jf(e){e.forEach(e=>{let t=e.getAttribute(`data-label-id`);document.querySelector(`visbug-handles[data-label-id="${t}"]`).backdrop={element:Nf(e),update:Nf}})}function Mf(e){e.forEach(e=>{let t=e.getAttribute(`data-label-id`),n=document.querySelector(`visbug-handles[data-label-id="${t}"]`).$shadow.querySelector(`visbug-boxmodel`);n&&n.remove()})}function Nf(e,t=!1){let n=e.getBoundingClientRect(),r=G(e,`padding`),i=Vi(G(e,`border-width`)),a=document.createElement(`visbug-boxmodel`);if(r!==`0px`){let r={top:G(e,`paddingTop`),right:G(e,`paddingRight`),bottom:G(e,`paddingBottom`),left:G(e,`paddingLeft`)};Object.entries(r).forEach(([t,n])=>{typeof n!=`number`&&(n=parseInt(G(e,`padding-`+t).slice(0,-2))),r[t]=Math.round(n.toFixed(1)*100)/100}),a.position={mode:`padding`,color:t?`purple`:`pink`,bounds:n,sides:{...r,borders:i}}}return a}const Q={active:{tip:null,target:null},tips:new Map},Pf={};function Ff(e){return Pf.selectors=e.select,Q.restoring=!0,B(`body`).on(`mousemove`,If),e.onSelectedUpdate(qf),U(`esc`,e=>Vf()),zf(),()=>{B(`body`).off(`mousemove`,If),e.removeSelectedCallback(qf),U.unbind(`esc`),Bf()}}const If=e=>{let t=Xi(e.clientX,e.clientY);if(aa(t)||t.nodeName===`VISBUG-METATIP`||t.hasAttribute(`data-metatip`)){Q.active.tip&&(Kf({tip:Q.active.tip,e:{target:Q.active.target}}),Xf());return}Lf(t,e)};function Lf(e,t){if(Q.active.tip)e==Q.active.target?Rf(Q.active.tip,t):(Hf(e,Q.active.tip),Q.active.target=e,Rf(Q.active.tip,t));else{let n=Hf(e);document.body.appendChild(n),n.hidePopover(),n.showPopover(),Rf(n,t),Jf({tip:n,target:e}),Q.active.tip=n,Q.active.target=e}}function Rf(e,t){let{north:n,west:r}=Uf(t),{left:i,top:a}=Wf(e,t,n,r);e.style.left=i,e.style.top=a,e.style.setProperty(`--arrow`,n?`var(--arrow-up)`:`var(--arrow-down)`),e.style.setProperty(`--arrow-top`,n?`100%`:`-8px`),e.style.setProperty(`--arrow-left`,r?`calc(100% - 15px - 15px)`:`15px`),e.style.setProperty(`--is-flipped`,r?`end`:``)}const zf=()=>{Q.tips.forEach(({tip:e},t)=>{e.style.display=`block`,Hf(t,e),Jf({tip:e,target:t})})};function Bf(){Q.tips.forEach(({tip:e},t)=>{e&&(e.style.display=`none`)}),Q.active.tip&&(Q.active.tip.remove(),Xf())}function Vf(){Q.tips.forEach(({tip:e},t)=>{e&&e.remove(),Yf({tip:e,target:t})}),B(`visbug-metatip`).forEach(e=>e.remove()),B(`[data-metatip]`).attr(`data-metatip`,null),Q.tips.clear()}const Hf=(e,t=document.createElement(`visbug-metatip`))=>{let{width:n,height:r}=e.getBoundingClientRect(),i=B(`vis-bug`).attr(`color-mode`),a=ji(e).map(e=>Object.assign(e,{prop:Wi(e.prop)})).filter(t=>t.prop.includes(`font-family`)?e.matches(`h1,h2,h3,h4,h5,h6,p,a,dd,dt,li,ol,pre,abbr,cite,dfn,kbd,q,small,input,label,legend,textarea,blockquote,date,button,figcaption,nav,header,footer,em,b,code,mark,time,summary,details`):!0).map(t=>{if((t.prop.includes(`color`)||t.prop.includes(`background-color`)||t.prop.includes(`border-color`)||t.prop.includes(`Color`)||t.prop.includes(`fill`)||t.prop.includes(`stroke`))&&(t.value=`
          <span color style="background-color:${t.value};"></span>
          <span color-value>${Iu(t.value,i)}</span>
        `),t.prop.includes(`background-image`)&&(t.value=`
          <span color gradient style="--_bg:${t.value};"></span>
          <span color-value>${t.value}</span>
        `),t.prop.includes(`box-shadow`)){let[,e,n,r,a,o]=Li(t.value);t.value=`${Iu(e,i)} ${n} ${r} ${a} ${o}`}if(t.prop.includes(`text-shadow`)){let[,e,n,r,a]=Ri(t.value);t.value=`${Iu(e,i)} ${n} ${r} ${a}`}return t.prop.includes(`font-family`)&&(t.value=`<span string value>${Bi(t.value)}</span>`),t.prop.includes(`grid-template-areas`)&&(t.value=t.value.replace(/" "/g,`"<br>"`)),e.getAttribute(`style`)&&e.getAttribute(`style`).includes(t.prop)&&(t.value=`<span local-change>${t.value}</span>`),t});return t.meta={el:e,width:n,height:r,localModifications:a.filter(t=>e.getAttribute(`style`)&&e.getAttribute(`style`).includes(t.prop)?1:0),notLocalModifications:a.filter(t=>e.getAttribute(`style`)&&e.getAttribute(`style`).includes(t.prop)?0:1)},t},Uf=e=>({north:e.clientY>window.innerHeight/2,west:e.clientX>window.innerWidth/2}),Wf=(e,t,n,r)=>({top:`${n?t.pageY-e.clientHeight-20:t.pageY+25}px`,left:`${r?t.pageX-e.clientWidth+23:t.pageX-21}px`}),Gf=({target:e})=>{e.hasAttribute&&!e.hasAttribute(`data-metatip`)&&Q.tips.has(e)&&Kf(Q.tips.get(e))},Kf=({tip:e,e:{target:t}})=>{e.remove(),Yf({tip:e,target:t}),Q.tips.delete(t)},qf=e=>{if(Q.restoring)return Q.restoring=!1;Q.tips.forEach(t=>{e.includes(t.e.target)||(t.e.target.removeAttribute(`data-metatip`),Kf(Q.tips.get(t.e.target)))}),e.filter(e=>!e.hasAttribute(`data-metatip`)).forEach(e=>{e.setAttribute(`data-metatip`,!0),Q.tips.set(e,{tip:Q.active.tip,e:{target:e}}),Xf()})},Jf=({tip:e,target:t})=>{ca(t,Gf)},Yf=({tip:e,target:t})=>{},Xf=()=>{Q.active.tip=null,Q.active.target=null},$={active:{tip:null,target:null},tips:new Map};function Zf(e){return $.restoring=!0,B(`body`).on(`mousemove`,Qf),e.onSelectedUpdate(up),U(`esc`,e=>rp()),tp(),()=>{B(`body`).off(`mousemove`,Qf),e.removeSelectedCallback(up),U.unbind(`esc`),np()}}const Qf=e=>{let t=Xi(e.clientX,e.clientY);if(aa(t)||t.nodeName.toUpperCase()===`SVG`||t.nodeName===`VISBUG-ALLYTIP`||t.hasAttribute(`data-allytip`)){$.active.tip&&(lp({tip:$.active.tip,e:{target:$.active.target}}),pp());return}$f(t,e)};function $f(e,t){if($.active.tip)e==$.active.target?ep($.active.tip,t):(ip(e,$.active.tip),$.active.target=e,ep($.active.tip,t));else{let n=ip(e);document.body.appendChild(n),ep(n,t),dp({tip:n,target:e}),$.active.tip=n,$.active.target=e}}function ep(e,t){let{north:n,west:r}=op(t),{left:i,top:a}=sp(e,t,n,r);e.style.left=i,e.style.top=a,e.style.setProperty(`--arrow`,n?`var(--arrow-up)`:`var(--arrow-down)`),e.style.setProperty(`--shadow-direction`,n?`var(--shadow-up)`:`var(--shadow-down)`),e.style.setProperty(`--arrow-top`,n?`100%`:`-8px`),e.style.setProperty(`--arrow-left`,r?`calc(100% - 15px - 15px)`:`15px`),e.style.setProperty(`--is-flipped`,r?`end`:``)}const tp=()=>{$.tips.forEach(({tip:e},t)=>{e.style.display=`block`,ip(t,e),dp({tip:e,target:t})})};function np(){$.tips.forEach(({tip:e},t)=>{e&&(e.style.display=`none`)}),$.active.tip&&($.active.tip.remove(),pp())}function rp(){$.tips.forEach(({tip:e},t)=>{e&&e.remove(),fp({tip:e,target:t})}),B(`visbug-allytip`).forEach(e=>e.remove()),B(`[data-allytip]`).attr(`data-allytip`,null),$.tips.clear()}const ip=(e,t=document.createElement(`visbug-ally`))=>{let n=ap(e),r=Hi(e);return r.map(e=>e.prop.includes(`alt`)?e.value=`<span text>${e.value}</span>`:e),r.map(e=>e.prop.includes(`title`)?e.value=`<span text longform>${e.value}</span>`:e),t.meta={el:e,ally_attributes:r,contrast_results:n},t},ap=e=>{let t=e instanceof SVGElement?G(e,`fill`)||G(e,`stroke`):G(e,`color`),n=Ui(e),r=window.getComputedStyle(e,null).getPropertyValue(`font-size`),i=n===`Small`?`AA`:`AA+`,a=Pi(e),o=`
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
  `,s=`
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
    </svg>
  `,c=new Al(t),l=new Al(a),[u,d]=[Nu(l.to(`srgb`).toString({format:`hex`}),c.to(`srgb`).toString({format:`hex`}),{level:`AA`,size:n.toLowerCase()}),Nu(l.to(`srgb`).toString({format:`hex`}),c.to(`srgb`).toString({format:`hex`}),{level:`AAA`,size:n.toLowerCase()})],f=l.contrast(c,`APCA`).toFixed(1),p=Math.abs(f),m=!1;return(parseInt(r)<=24&&p>=75||parseInt(r)>=24&&p>=60||parseInt(r)>=36&&p>=45)&&(m=!0),t===a?`<div contrast-compliance>Foreground matches background</div>`:`
        <div contrast-compliance>
          <span compliance>
            <span title>WCAG Compliance</span>
            <div>
              <span>
                <span value score pass="${u?`true`:`false`}">${u?o:s}</span>
                <span>${i}</span>
              </span>
              <span>
                <span value score pass="${d?`true`:`false`}">${d?o:s}</span>
                <span>A${i}</span>
              </span>
            </div>
          </span>
          <span contrast>
            <span title>WCAG2.1</span>
            <span value>${l.contrast(c,`wcag21`).toFixed(1)}</span>
          </span>
          <span contrast>
            <span title>APCA <span pass="${m?`true`:`false`}">${m?o:s}</span></span>
            <span value>${f}</span>
          </span>
          <span contrast>
            <span title>L*</span>
            <span value>${l.contrast(c,`Lstar`).toFixed(0)}</span>
          </span>
        </div>
      `},op=e=>({north:e.clientY>window.innerHeight/2,west:e.clientX>window.innerWidth/2}),sp=(e,t,n,r)=>({top:`${n?t.pageY-e.clientHeight-20:t.pageY+25}px`,left:`${r?t.pageX-e.clientWidth+23:t.pageX-21}px`}),cp=e=>{e&&!e.target.hasAttribute(`data-allytip`)&&$.tips.has(e.target)&&lp($.tips.get(e.target))},lp=({tip:e,e:{target:t}})=>{e.remove(),fp({tip:e,target:t}),$.tips.delete(t)},up=e=>{if($.restoring)return $.restoring=!1;$.tips.forEach(t=>{e.includes(t.e.target)||(t.e.target.removeAttribute(`data-allytip`),lp($.tips.get(t.e.target)))}),e.filter(e=>!e.hasAttribute(`data-allytip`)).forEach(e=>{e.setAttribute(`data-allytip`,!0),$.tips.set(e,{tip:$.active.tip,e:{target:e}}),pp()})},dp=({tip:e,target:t})=>{ca(t,cp)},fp=({tip:e,target:t})=>{},pp=()=>{$.active.tip=null,$.active.target=null};function mp(e){let t=document.body,n=[],r=[],i=[],a=[],o={target:null,element:null,label:null},s=()=>{t.addEventListener(`click`,l,!0),t.addEventListener(`dblclick`,d,!0),t.addEventListener(`selectstart`,w),t.addEventListener(`mousemove`,D),document.addEventListener(`copy`,_),document.addEventListener(`cut`,v),document.addEventListener(`paste`,y),f(),U(`${K}+alt+c`,b),U(`${K}+alt+v`,e=>x()),U(`esc`,p),U(`${K}+d`,m),U(`backspace,del,delete`,h),U(`alt+del,alt+backspace`,g),U(`${K}+e,${K}+shift+e`,S),U(`${K}+g,${K}+shift+g`,C),U(`tab,shift+tab,enter,shift+enter`,T),U(`${K}+shift+enter`,fe),U(`shift+'`,pe)},c=()=>{t.removeEventListener(`click`,l,!0),t.removeEventListener(`dblclick`,d,!0),t.removeEventListener(`selectstart`,w),t.removeEventListener(`mousemove`,D),document.removeEventListener(`copy`,_),document.removeEventListener(`cut`,v),document.removeEventListener(`paste`,y),U.unbind(`esc,${K}+d,backspace,del,delete,alt+del,alt+backspace,${K}+e,${K}+shift+e,${K}+g,${K}+shift+g,tab,shift+tab,enter,shift+enter`)},l=e=>{let t=Xi(e.clientX,e.clientY);aa(t)&&!n.filter(e=>e==t).length||(e.preventDefault(),e.altKey||e.stopPropagation(),e.shiftKey||(A({silent:!0}),wf()),e.shiftKey&&t.hasAttribute(`data-selected`)?u(t.getAttribute(`data-label-id`)):O(t))},u=e=>{[...i,...a].filter(t=>t.getAttribute(`data-label-id`)===e).forEach(e=>e.remove()),n.filter(t=>t.getAttribute(`data-label-id`)===e).forEach(e=>B(e).attr({"data-selected":null,"data-selected-hide":null,"data-label-id":null,"data-pseudo-select":null,"data-measuring":null,"data-outward":null})),n=n.filter(t=>t.getAttribute(`data-label-id`)!==e),ue()},d=t=>{t.preventDefault(),t.stopPropagation(),!aa(t.target)&&e.toolSelected(`text`)},f=e=>{let t=!1;document.onkeydown=function(e){U.ctrl&&n.length&&(B(`visbug-handles, visbug-label, visbug-hover, visbug-grip`).forEach(e=>e.style.display=`none`),t=!0)},document.onkeyup=function(e){t&&=(B(`visbug-handles, visbug-label, visbug-hover, visbug-grip`).forEach(e=>e.style.display=null),!1)}},p=e=>A(),m=e=>{let t=n[0];if(!t)return;let r=t.cloneNode(!0);r.removeAttribute(`data-selected`),t.parentNode.insertBefore(r,t.nextSibling),e.preventDefault()},h=e=>n.length&&j(),g=e=>n.forEach(e=>e.attr(`style`,null)),_=async e=>{if(!window.getSelection().toString().length&&n[0]&&window.node_clipboard!==n[0]){e.preventDefault();let t=n[0].cloneNode(!0);t.removeAttribute(`data-selected`),window.copy_backup=t.outerHTML,e.clipboardData.setData(`text/html`,window.copy_backup);let{state:r}=await navigator.permissions.query({name:`clipboard-write`});r===`granted`&&await navigator.clipboard.writeText(window.copy_backup)}},v=e=>{if(n[0]&&window.node_clipboard!==n[0]){let t=n[0].cloneNode(!0);t.removeAttribute(`data-selected`),window.copy_backup=t.outerHTML,e.clipboardData.setData(`text/html`,window.copy_backup),n[0].remove()}},y=async(e,t=0)=>{let r=e.clipboardData.getData(`text/html`),i=await navigator.clipboard.readText(),a=r||i||window.copy_backup;n.length&&a&&(e.preventDefault(),n.forEach(e=>e.appendChild(ra(a))))},b=async e=>{e.preventDefault(),window.copied_styles=n.map(e=>ji(e));try{let e=B(`vis-bug`).attr(`color-mode`),t=window.copied_styles[0].map(({prop:t,value:n})=>{if((t.includes(`color`)||t.includes(`background-color`)||t.includes(`border-color`)||t.includes(`Color`)||t.includes(`fill`)||t.includes(`stroke`))&&(n=Iu(n,e)),t.includes(`boxShadow`)){let[,t,r,i,a,o]=Li(n);n=`${Iu(t,e)} ${r} ${i} ${a} ${o}`}if(t.includes(`textShadow`)){let[,t,r,i,a]=Ri(n);n=`${Iu(t,e)} ${r} ${i} ${a}`}return{prop:t,value:n}}).reduce((e,t)=>[...e,`${Wi(t.prop)}: ${t.value};`],[]).join(`
`),{state:n}=await navigator.permissions.query({name:`clipboard-write`});t&&n===`granted`&&await navigator.clipboard.writeText(t)}catch(e){console.warn(e)}},x=async(e,t=0)=>{if(window.copied_styles)n.forEach(e=>{window.copied_styles[t].map(({prop:t,value:n})=>e.style[t]=n),t>=window.copied_styles.length-1?t=0:t++});else{let e=await navigator.clipboard.readText();n.length&&e&&n.forEach(t=>t.style=e)}},S=(e,{key:t})=>{e.preventDefault();let[r]=n;if(!r)return;let i=ee(r);oa(i)&&M({query:i,all:t.includes(`shift`)})},C=(e,{key:t})=>{if(e.preventDefault(),t.split(`+`).includes(`shift`)){let e=[...n];A(),e.reverse().forEach(e=>{for(e.children.length;e.children.length>0;){var t=e.childNodes[e.children.length-1];t.nodeName!==`#text`&&O(t),e.parentNode.prepend(t)}e.parentNode.removeChild(e)})}else{let e=document.createElement(`div`);n[0].parentNode.prepend(n.reverse().reduce((e,t)=>(e.appendChild(t),e),e)),A(),O(e)}},w=e=>!aa(e.target)&&n.length&&n[0].textContent!=e.target.textContent&&e.preventDefault(),T=(e,{key:t})=>{if(!n.length)return;e.preventDefault(),e.stopPropagation();let r=n.reduce((e,n)=>{let r=hd(n),i=gd(n),a=Fi(n),o=Ii(n);return t.includes(`shift`)?t.includes(`tab`)&&r?e.add(r):t.includes(`enter`)&&a?e.add(a):e.add(n):t.includes(`tab`)&&i?e.add(i):t.includes(`enter`)&&o?e.add(o):e.add(n),e},new Set);r.size&&(A({silent:!0}),r.forEach(e=>{O(e),E(e)}))},E=t=>{let n=e.activeTool,r;if(n===`accessibility`?(rp(),r=$f):n===`inspector`&&(Vf(),r=Lf),!r)return;let{top:i,left:a}=t.getBoundingClientRect(),{pageYOffset:o,pageXOffset:s}=window;r(t,{clientY:i,clientX:a,pageY:o+i-10,pageX:s+a+20})},D=t=>{let r=Xi(t.clientX,t.clientY),i=e.activeTool;if(aa(r)||r.hasAttribute(`data-selected`)||r.hasAttribute(`draggable`))return wf(),P();if(N({el:r,no_label:i===`guides`||i===`accessibility`||i===`margin`||i===`padding`||i===`inspector`}),i===`guides`&&n.length>=1&&!n.includes(r)){r.setAttribute(`data-measuring`,!0);let[e]=n;Cf({$anchor:e,$target:r})}else i===`margin`&&!o.element.$shadow.querySelector(`visbug-boxmodel`)?o.element.$shadow.appendChild(ru(o.target,!0)):i===`padding`&&!o.element.$shadow.querySelector(`visbug-boxmodel`)?o.element.$shadow.appendChild(Nf(o.target,!0)):(r.hasAttribute(`data-measuring`)||n.includes(r))&&wf();i===`guides`&&a.forEach(e=>{e.hidePopover&&e.hidePopover(),e.showPopover&&e.showPopover()})},O=t=>{let r=a.length,i=e.activeTool;t.setAttribute(`data-selected`,!0),t.setAttribute(`data-label-id`,r),P(),te({el:t,id:r,no_label:i===`inspector`||i===`guides`||i===`margin`||i===`move`||i===`accessibility`}),B(`visbug-metatip, visbug-ally`).forEach(e=>{e.hidePopover&&e.hidePopover(),e.showPopover&&e.showPopover()}),n.unshift(t),ue()},k=()=>n,A=({silent:e=!1}={})=>{n.forEach(e=>B(e).attr({"data-selected":null,"data-selected-hide":null,"data-label-id":null,"data-pseudo-select":null,"data-outward":null})),B(`[data-pseudo-select]`).forEach(e=>e.removeAttribute(`data-pseudo-select`)),Array.from([...B(`visbug-handles`),...B(`visbug-label`),...B(`visbug-hover`),...B(`visbug-distance`)]).forEach(e=>e.remove()),i=[],a=[],n=[],!e&&ue()},j=()=>{let e=n.map(e=>{if(gd(e))return gd(e);if(hd(e))return hd(e);if(e.parentNode)return e.parentNode});Array.from([...n,...i,...a]).forEach(e=>e.remove()),i=[],a=[],n=[],e.forEach(e=>O(e))},M=({query:e,all:t=!1})=>{if(t)B(e+`:not([data-selected])`).forEach(O);else{let t=B(e);if(!t)return;let[r]=n,i=t.reduce((e,t,n)=>t==r?e=n:e,null);if(i!==null)if(t[i+1])O(t[i+1]);else{let e=t.filter(e=>!e.attr(`data-selected`))[0];e&&O(e)}}},ee=e=>`${e.nodeName.toLowerCase()}${Ki(e)}`,N=({el:t,no_hover:n=!1,no_label:r=!0})=>{o.target!==t&&(o.target=t,o.element=n?null:F(t),o.label=r?null:ae(t,hp(t,e.activeTool)))},P=()=>{o.target&&(o.element&&o.element.remove(),o.label&&o.label.remove(),o.target=null,o.element=null,o.label=null)},te=({el:t,id:n,no_label:r=!0})=>{let i=ie({el:t,id:n}),a=r?null:re({el:t,id:n,template:hp(t,e.activeTool)}),o=se(t,{handle:i,label:a}),s=se(t,{handle:i,label:a});o.observe(t,{attributes:!0}),s.observe(t.parentNode,{childList:!0,subtree:!0}),a!==null&&ca(a,()=>{o.disconnect(),s.disconnect()})},ne=(t,n)=>{n.text=hp(t,e.activeTool),n.update={boundingRect:t.getBoundingClientRect(),isFixed:ua(t)},a.forEach(e=>{e.hidePopover&&e.hidePopover(),e.showPopover&&e.showPopover()})},re=({el:e,id:t,template:n})=>{if(!i[t]){let r=document.createElement(`visbug-label`);return r.text=n,r.position={boundingRect:e.getBoundingClientRect(),node_label_id:t,isFixed:ua(e)},document.body.appendChild(r),B(r).on(`query`,({detail:e})=>{e.text&&(xf(`[data-pseudo-select]`,e=>e.removeAttribute(`data-pseudo-select`)),xf(e.text+`:not([data-selected])`,t=>e.activator===`mouseenter`?t.setAttribute(`data-pseudo-select`,!0):O(t)))}),B(r).on(`mouseleave`,e=>{e.preventDefault(),e.stopPropagation(),xf(`[data-pseudo-select]`,e=>e.removeAttribute(`data-pseudo-select`))}),i[i.length]=r,a.forEach(e=>{e.hidePopover&&e.hidePopover(),e.showPopover&&e.showPopover()}),r}},ie=({el:e,id:t})=>{if(!a[t]){let n=document.createElement(`visbug-handles`);return n.position={el:e,node_label_id:t},document.body.appendChild(n),a[a.length]=n,n}},F=e=>{if(!e.hasAttribute(`data-pseudo-select`)&&!e.hasAttribute(`data-label-id`))return o.element&&o.element.remove(),o.element=document.createElement(`visbug-hover`),document.body.appendChild(o.element),o.element.position={el:e},o.element},ae=(e,t)=>{if(!e.hasAttribute(`data-pseudo-select`)&&!e.hasAttribute(`data-label-id`))return o.label&&o.label.remove(),o.label=document.createElement(`visbug-label`),document.body.appendChild(o.label),o.label.text=t,o.label.position={boundingRect:e.getBoundingClientRect(),node_label_id:`hover`},o.label.style.setProperty(`--label-bg`,`hsl(267, 100%, 58%)`),o.label},oe=(e,t)=>{t.position={el:e,node_label_id:e.getAttribute(`data-label-id`)}},se=(e,{label:t,handle:n})=>new MutationObserver(r=>{t&&ne(e,t),n&&oe(e,n)}),ce=(e,t=!0)=>{r.push(e),t&&e(n)},le=e=>r=r.filter(t=>t!=e),ue=()=>r.forEach(e=>e(n)),de=()=>{A(),c()},fe=(e,{key:t})=>{let r=n.filter(e=>e.children.length).reduce((e,{children:t})=>[...e,...Array.from(t)],[]);r.length&&(e.preventDefault(),e.stopPropagation(),A(),r.forEach(e=>O(e)))},pe=(e,{key:t})=>{let r=n.reduce((e,t)=>{let n=t.parentElement;return n.hasAttribute(`data-outward`)?e:(n.setAttribute(`data-outward`,!0),e.push(n),e)},[]);r.length&&(e.preventDefault(),e.stopPropagation(),r.forEach(e=>{e&&e!==document.body&&O(e)}))};return Vu(),s(),{select:O,selection:k,unselect_all:A,onSelectedUpdate:ce,removeSelectedCallback:le,disconnect:de}}const hp=(e,t)=>{switch(t){case`align`:return G(e,`display`);default:return`
        <a node>${e.nodeName.toLowerCase()}</a>
        <a>${e.id&&`#`+e.id}</a>
        ${Ki(e).split(`.`).filter(e=>e!=``).reduce((e,t)=>`
            ${e}
            <a>.${t}</a>
          `,``)}
      `}},gp=({target:e})=>{e.removeAttribute(`contenteditable`),e.removeAttribute(`spellcheck`),e.removeEventListener(`blur`,gp),e.removeEventListener(`keydown`,_p),U.unbind(`escape,esc`)},_p=e=>e.key!=`Escape`&&e.stopPropagation(),vp=(e,t)=>{B(`[spellcheck="true"]`).forEach(e=>gp({target:e})),window.getSelection().empty()};function yp(e){e.length&&(e.map(e=>{let t=B(e);t.attr({contenteditable:!0,spellcheck:!0}),e.focus(),na(e,!0),t.on(`keydown`,_p),t.on(`blur`,gp)}),U(`escape,esc`,vp))}const bp=`up,down,left,right`.split(`,`).reduce((e,t)=>`${e},${t},shift+${t}`,``).substring(1),xp=`${K}+up,${K}+down`;function Sp({selection:e}){return U(bp,(t,n)=>{if(t.cancelBubble)return;t.preventDefault();let r=e(),i=n.key.split(`+`);i.includes(`left`)||i.includes(`right`)?i.includes(`shift`)?wp(r,n.key):jp(r,n.key):i.includes(`shift`)?Cp(r,n.key):Tp(r,n.key)}),U(xp,(t,n)=>{t.preventDefault();let r=n.key.split(`+`);Op(e(),r.includes(`up`)?`up`:`down`)}),U(`cmd+b`,t=>{e().forEach(e=>e.style.fontWeight=e.style.fontWeight==`bold`?null:`bold`)}),U(`cmd+i`,t=>{e().forEach(e=>e.style.fontStyle=e.style.fontStyle==`italic`?null:`italic`)}),()=>{U.unbind(bp),U.unbind(xp),U.unbind(`cmd+b,cmd+i`),U.unbind(`up,down,left,right`)}}function Cp(e,t){e.map(e=>ta(e)).map(e=>({el:e,style:`lineHeight`,current:parseInt(G(e,`lineHeight`)),amount:1,negative:t.split(`+`).includes(`down`)})).map(e=>Object.assign(e,{current:e.current==`normal`||isNaN(e.current)?1.14*parseInt(G(e.el,`fontSize`)):e.current})).map(e=>Object.assign(e,{value:e.negative?e.current-e.amount:e.current+e.amount})).forEach(({el:e,style:t,value:n})=>e.style[t]=`${n}px`)}function wp(e,t){e.map(e=>ta(e)).map(e=>({el:e,style:`letterSpacing`,current:parseFloat(G(e,`letterSpacing`)),amount:.1,negative:t.split(`+`).includes(`left`)})).map(e=>Object.assign(e,{current:e.current==`normal`||isNaN(e.current)?0:e.current})).map(e=>Object.assign(e,{value:e.negative?(e.current-e.amount).toFixed(2):(e.current+e.amount).toFixed(2)})).forEach(({el:e,style:t,value:n})=>e.style[t]=`${n<=-2?-2:n}px`)}function Tp(e,t){e.map(e=>ta(e)).map(e=>({el:e,style:`fontSize`,current:parseInt(G(e,`fontSize`)),amount:t.split(`+`).includes(`shift`)?10:1,negative:t.split(`+`).includes(`down`)})).map(e=>Object.assign(e,{font_size:e.negative?e.current-e.amount:e.current+e.amount})).forEach(({el:e,style:t,font_size:n})=>e.style[t]=`${n<=6?6:n}px`)}const Ep={normal:2,bold:5,light:0,"":2,100:0,200:1,300:2,400:3,500:4,600:5,700:6,800:7,900:8},Dp=[100,200,300,400,500,600,700,800,900];function Op(e,t){e.map(e=>ta(e)).map(e=>({el:e,style:`fontWeight`,current:G(e,`fontWeight`),direction:t.split(`+`).includes(`down`)})).map(e=>Object.assign(e,{value:e.direction?Ep[e.current]-1:Ep[e.current]+1})).forEach(({el:e,style:t,value:n})=>e.style[t]=Dp[n<0?0:n>=Dp.length?Dp.length:n])}const kp={start:0,left:0,center:1,right:2},Ap=[`left`,`center`,`right`];function jp(e,t){e.map(e=>ta(e)).map(e=>({el:e,style:`textAlign`,current:G(e,`textAlign`),direction:t.split(`+`).includes(`left`)})).map(e=>Object.assign(e,{value:e.direction?kp[e.current]-1:kp[e.current]+1})).forEach(({el:e,style:t,value:n})=>e.style[t]=Ap[n<0?0:n>=2?2:n])}const Mp=`up,down,left,right`.split(`,`).reduce((e,t)=>`${e},${t},shift+${t}`,``).substring(1),Np=`${K}+up,${K}+down,${K}+left,${K}+right,${K}+shift+up,${K}+shift+down,${K}+shift+left,${K}+shift+right`;function Pp({selection:e}){return U(Mp,(t,n)=>{if(t.cancelBubble)return;t.preventDefault();let r=e(),i=n.key.split(`+`);i.includes(`left`)||i.includes(`right`)?i.includes(`shift`)?Gp(r,n.key):Bp(r,n.key):i.includes(`shift`)?Jp(r,n.key):Hp(r,n.key)}),U(Np,(t,n)=>{t.preventDefault();let r=e(),i=n.key.split(`+`);i.includes(`left`)||i.includes(`right`)?i.includes(`shift`)?Zp(r,n.key):Lp(r,`row`):i.includes(`shift`)?em(r,n.key):Lp(r,`column`)}),()=>{U.unbind(Mp),U.unbind(Np),U.unbind(`up,down,left,right`)}}const Fp=e=>(e.style.display=`flex`,e),Ip=(e,t)=>((t==`align`&&e!=`flex-start`&&e!=`center`&&e!=`flex-end`||t==`distribute`&&e!=`space-around`&&e!=`space-between`)&&(e=`normal`),e);function Lp(e,t){e.map(Fp).map(e=>{e.style.flexDirection=t})}const Rp={normal:0,"flex-start":0,center:1,"flex-end":2},zp=[`flex-start`,`center`,`flex-end`];function Bp(e,t){e.map(Fp).map(e=>({el:e,style:`justifyContent`,current:Ip(G(e,`justifyContent`),`align`),direction:t.split(`+`).includes(`left`)})).map(e=>Object.assign(e,{value:e.direction?Rp[e.current]-1:Rp[e.current]+1})).forEach(({el:e,style:t,value:n})=>e.style[t]=zp[n<0?0:n>=2?2:n])}const Vp=[`flex-start`,`center`,`flex-end`];function Hp(e,t){e.map(Fp).map(e=>({el:e,style:`alignItems`,current:G(e,`alignItems`),direction:t.split(`+`).includes(`up`)})).map(e=>Object.assign(e,{value:e.direction?Rp[e.current]-1:Rp[e.current]+1})).forEach(({el:e,style:t,value:n})=>e.style[t]=Vp[n<0?0:n>=2?2:n])}const Up={normal:1,"space-around":0,"":1,"space-between":2},Wp=[`space-around`,``,`space-between`];function Gp(e,t){e.map(Fp).map(e=>({el:e,style:`justifyContent`,current:Ip(G(e,`justifyContent`),`distribute`),direction:t.split(`+`).includes(`left`)})).map(e=>Object.assign(e,{value:e.direction?Up[e.current]-1:Up[e.current]+1})).forEach(({el:e,style:t,value:n})=>e.style[t]=Wp[n<0?0:n>=2?2:n])}const Kp={normal:1,"space-around":0,"":1,"space-between":2},qp=[`space-around`,``,`space-between`];function Jp(e,t){e.map(Fp).map(e=>({el:e,style:`alignContent`,current:G(e,`alignContent`),direction:t.split(`+`).includes(`up`)})).map(e=>Object.assign(e,{value:e.direction?Kp[e.current]-1:Kp[e.current]+1})).forEach(({el:e,style:t,value:n})=>e.style[t]=qp[n<0?0:n>=2?2:n])}const Yp={row:0,"row-reverse":1,column:2,"column-reverse":3},Xp=[`row`,`row-reverse`,`column`,`column-reverse`];function Zp(e,t){e.map(Fp).map(e=>({el:e,style:`flexDirection`,current:G(e,`flexDirection`),direction:t.split(`+`).includes(`left`)})).map(e=>Object.assign(e,{value:e.direction?Yp[e.current]===1||Yp[e.current]===3?Yp[e.current]:Yp[e.current]+1:Yp[e.current]===0||Yp[e.current]===2?Yp[e.current]:Yp[e.current]-1})).forEach(({el:e,style:t,value:n})=>e.style[t]=Xp[n])}const Qp={nowrap:0,wrap:1},$p=[`nowrap`,`wrap`];function em(e,t){e.map(Fp).map(e=>({el:e,style:`flexWrap`,current:G(e,`flexWrap`),direction:t.split(`+`).includes(`up`)})).map(e=>Object.assign(e,{value:e.direction?Qp[e.current]===0?Qp[e.current]:Qp[e.current]-1:Qp[e.current]===1?Qp[e.current]:Qp[e.current]+1})).forEach(({el:e,style:t,value:n})=>e.style[t]=$p[n])}const tm=`up,down,left,right`.split(`,`).reduce((e,t)=>`${e},${t},shift+${t},alt+${t},alt+shift+${t}`,``).substring(1),nm=`${K}+up,${K}+shift+up,${K}+down,${K}+shift+down,${K}+left,${K}+shift+left,${K}+right,${K}+shift+right`;function rm({selection:e}){return U(tm,(t,n)=>{if(t.cancelBubble)return;t.preventDefault();let r=e(),i=n.key.split(`+`);i.includes(`left`)||i.includes(`right`)?i.includes(`alt`)?sm(r,i,`size`):sm(r,i,`x`):i.includes(`alt`)?sm(r,i,`blur`):sm(r,i,`y`)}),U(nm,(t,n)=>{t.preventDefault();let r=n.key.split(`+`);r.includes(`left`)||r.includes(`right`)?sm(e(),r,`opacity`):sm(e(),r,`inset`)}),()=>{U.unbind(tm),U.unbind(nm),U.unbind(`up,down,left,right`)}}const im=e=>((e.style.boxShadow==``||e.style.boxShadow==`none`)&&(e.style.boxShadow=`hsla(0,0%,0%,30%) 0 0 0 0`),e),am={opacity:3,x:4,y:5,blur:6,size:7,inset:8},om=e=>G(e,`boxShadow`).split(` `);function sm(e,t,n){e.map(im).map(e=>ta(e,1500)).map(e=>({el:e,style:`boxShadow`,current:om(e),propIndex:om(e)[0].includes(`rgba`)?am[n]:am[n]-1})).map(e=>{let r=[...e.current],i=n===`opacity`?e.current[e.propIndex]:parseInt(e.current[e.propIndex]);switch(n){case`blur`:case`size`:var a=t.includes(`shift`)?10:1;r[e.propIndex]=t.includes(`down`)||t.includes(`left`)?`${i-a}px`:`${i+a}px`;break;case`inset`:r[e.propIndex]=t.includes(`down`)?`inset`:``;break;case`opacity`:let n=parseFloat(i.slice(0,i.indexOf(`)`)));var a=t.includes(`shift`)?.1:.01;r[e.propIndex]=t.includes(`left`)?n-a+`)`:n+a+`)`;break;default:var a=t.includes(`shift`)?10:1;r[e.propIndex]=t.includes(`left`)||t.includes(`up`)?`${i-a}px`:`${i+a}px`;break}return e.value=r,e}).forEach(({el:e,style:t,value:n})=>e.style[t]=n.join(` `))}const cm=`up,down,left,right`.split(`,`).reduce((e,t)=>`${e},${t},shift+${t}`,``).substring(1),lm=`${K}+up,${K}+shift+up,${K}+down,${K}+shift+down,${K}+left,${K}+shift+left,${K}+right,${K}+shift+right`,um={active_color:void 0,elements:[]};function dm({Color:e,Visbug:t}){return um.active_color=e.getActive(),um.elements=[],t.onSelectedUpdate(t=>{um.elements=t,e.setActive(um.active_color)}),U(cm,(t,n)=>{if(t.cancelBubble)return;t.preventDefault();let r=um.elements,i=n.key.split(`+`);i.includes(`left`)||i.includes(`right`)?fm(r,i,`s`,e):fm(r,i,`l`,e)}),U(lm,(t,n)=>{t.preventDefault();let r=n.key.split(`+`);r.includes(`left`)||r.includes(`right`)?fm(um.elements,r,`a`,e):fm(um.elements,r,`h`,e)}),U(`]`,(t,n)=>{t.preventDefault(),um.active_color==`foreground`?um.active_color=`background`:um.active_color==`background`&&(um.active_color=`border`),e.setActive(um.active_color)}),U(`[`,(t,n)=>{t.preventDefault(),um.active_color==`background`?um.active_color=`foreground`:um.active_color==`border`&&(um.active_color=`background`),e.setActive(um.active_color)}),()=>{U.unbind(cm),U.unbind(lm),U.unbind(`up,down,left,right`)}}function fm(e,t,n,r){e.map(e=>ta(e)).map(e=>{let{foreground:t,background:n,border:i}=pm(e);switch(r.getActive()){case`background`:return{el:e,current:n.color.toHsl(),style:n.style};case`foreground`:return{el:e,current:t.color.toHsl(),style:t.style};case`border`:return e.style.border===``&&(e.style.border=`1px solid black`),{el:e,current:i.color.toHsl(),style:i.style}}}).map(e=>Object.assign(e,{amount:t.includes(`shift`)?10:1,negative:t.includes(`down`)||t.includes(`left`)})).map(e=>((n===`s`||n===`l`||n===`a`)&&(e.amount*=.01),e.current[n]=e.negative?e.current[n]-e.amount:e.current[n]+e.amount,(n===`s`||n===`l`||n===`a`)&&(e.current[n]>1&&(e.current[n]=1),e.current[n]<0&&(e.current[n]=0)),e)).forEach(({el:e,style:t,current:n})=>{let i=new ju(n).setAlpha(n.a);e.style[t]=i.toHslString(),t==`color`&&r.foreground.color(i.toHslString()),t==`backgroundColor`&&r.background.color(i.toHslString())})}function pm(e){if(e instanceof SVGElement){let t=G(e,`stroke`);return{foreground:{style:`stroke`,color:new ju(t===`none`?`rgb(0, 0, 0)`:t)},background:{style:`fill`,color:new ju(G(e,`fill`))},border:{style:`outline`,color:new ju(G(e,`outline`))}}}else return{foreground:{style:`color`,color:new ju(G(e,`color`))},background:{style:`backgroundColor`,color:new ju(G(e,`backgroundColor`))},border:{style:`borderColor`,color:new ju(G(e,`borderColor`))}}}const mm={gridlines:null,measurements:null,stuck:{count:0,measurements:[]}};function hm(e){return B(`body`).on(`mousemove`,gm),B(`body`).on(`mouseout`,vm),window.addEventListener(`scroll`,bm),e.onSelectedUpdate(_m),()=>{B(`body`).off(`mousemove`,gm),B(`body`).off(`mouseout`,vm),window.removeEventListener(`scroll`,bm),e.removeSelectedCallback(_m),wf(),bm()}}const gm=e=>{let t=Xi(e.clientX,e.clientY);aa(t)||ym(t)},_m=e=>{e.length&&(mm.stuck.count>=e.length&&(mm.stuck.measurements.forEach(e=>e.remove()),mm.stuck.measurements=[],mm.stuck.count=0),mm.stuck.count++,e.length>1&&(mm.stuck.measurements=[...mm.stuck.measurements,...Tf()]),mm.gridlines&&mm.gridlines.remove(),mm.gridlines=null)},vm=()=>bm(),ym=e=>{mm.gridlines?(mm.gridlines.style.display=null,mm.gridlines.update=e.getBoundingClientRect()):(mm.gridlines=document.createElement(`visbug-gridlines`),mm.gridlines.position=e.getBoundingClientRect(),document.body.appendChild(mm.gridlines))},bm=()=>{mm.gridlines&&(mm.gridlines.style.display=`none`)};function xm(e,t){return alert(`Coming Soon!`),()=>{}}const Sm=`up,down,left,right`.split(`,`).reduce((e,t)=>`${e},${t},alt+${t},shift+${t},shift+alt+${t}`,``).substring(1);`${K}${K}${K}${K}`;function Cm(){let e={elements:[]};return U(Sm,(t,n)=>{t.cancelBubble||(t.preventDefault(),Tm(e.elements,n.key))}),{onNodesSelected:t=>{e.elements.forEach(e=>e.teardown()),e.elements=t.map(e=>wm({el:e}))},disconnect:()=>{e.elements.forEach(e=>e.teardown()),U.unbind(Sm),U.unbind(`up,down,left,right`)}}}function wm({el:e,surface:t=e,cursor:n=`move`,clickEvent:r}){let i={target:e,surface:t,mouse:{down:!1,x:0,y:0},element:{x:0,y:0},travelDistance:0},a=()=>{e.style.transition=`none`,t.style.cursor=n,t.addEventListener(`mousedown`,s,!0),t.addEventListener(`mouseup`,c,!0),document.addEventListener(`mousemove`,l,!0)},o=()=>{e.style.transition=null,t.style.cursor=null,t.removeEventListener(`mousedown`,s,!0),t.removeEventListener(`mouseup`,c,!0),document.removeEventListener(`mousemove`,l,!0)},s=t=>{if(t.target===i.surface){if(t.preventDefault(),getComputedStyle(e).position==`static`&&(e.style.position=`relative`),e.style.willChange=`top,left`,e instanceof SVGElement){let t=e.getAttribute(`transform`),[n,r]=t?Dm(t):[0,0];i.element.x=n,i.element.y=r}else i.element.x=parseInt(G(e,`left`)),i.element.y=parseInt(G(e,`top`));i.mouse.x=t.clientX,i.mouse.y=t.clientY,i.mouse.down=!0,i.travelDistance=0}},c=t=>{if(t.target!==i.surface)return;if(t.preventDefault(),t.stopPropagation(),i.mouse.down=!1,e.style.willChange=null,e instanceof SVGElement){let t=e.getAttribute(`transform`),[n,r]=t?Dm(t):[0,0];i.element.x=n,i.element.y=r}else i.element.x=parseInt(e.style.left)||0,i.element.y=parseInt(e.style.top)||0;let n=!i.travelDistance||i.travelDistance<5;r&&n&&r(t),i.travelDistance=0},l=t=>{i.mouse.down&&(t.preventDefault(),t.stopPropagation(),e instanceof SVGElement?e.setAttribute(`transform`,`translate(
        ${i.element.x+t.clientX-i.mouse.x},
        ${i.element.y+t.clientY-i.mouse.y}
      )`):(e.style.left=i.element.x+t.clientX-i.mouse.x+`px`,e.style.top=i.element.y+t.clientY-i.mouse.y+`px`),i.travelDistance+=1)};return a(),e.teardown=o,e}function Tm(e,t){e.map(e=>Am(e)).map(e=>ta(e)).map(e=>({el:e,...Em(e,t),amount:t.split(`+`).includes(`shift`)?10:1,negative:km(e,t)})).map(e=>Object.assign(e,{position:e.negative?e.current+e.amount:e.current-e.amount})).forEach(({el:e,style:n,position:r})=>e instanceof SVGElement?Om(e,t,r):e.style[n]=r+`px`)}const Em=(e,t)=>{let n,r;if(e instanceof SVGElement){let i=e.attr(`transform`),[a,o]=i?Dm(i):[0,0];n=`transform`,r=t.includes(`down`)||t.includes(`up`)?o:a}else{let i=Zi(t).toLowerCase();n=i===`top`||i===`bottom`?`top`:`left`,r=G(e,n),r=r===`auto`?0:parseInt(r,10)}return{style:n,current:r}},Dm=e=>e.substring(e.indexOf(`(`)+1,e.indexOf(`)`)).split(`,`).map(e=>parseFloat(e)),Om=(e,t,n)=>{let r=e.attr(`transform`),[i,a]=r?Dm(r):[0,0],o=t.includes(`down`)||t.includes(`up`)?`${i},${n}`:`${n},${a}`;e.attr(`transform`,`translate(${o})`)},km=(e,t)=>t.includes(`right`)||t.includes(`down`),Am=e=>(e instanceof HTMLElement&&(e.style.position=`relative`),e);var jm=class extends HTMLElement{constructor(){super(),this.$shadow=this.attachShadow({mode:`closed`}),this.applyScheme=da(this.$shadow,oi,_i,xi),this.observe=this.observe.bind(this),this.dispatchQuery=this.dispatchQuery.bind(this),this.dispatchUnQuery=this.dispatchUnQuery.bind(this)}connectedCallback(){this.setAttribute(`popover`,`manual`),this.showPopover&&this.showPopover(),this.applyScheme(document.querySelector(`vis-bug`).getAttribute(`color-scheme`)),B(this.$shadow.host).on(`mouseenter`,this.observe)}disconnectedCallback(){this.unobserve(),this.hidePopover&&this.hidePopover()}dispatchQuery(e){this.$shadow.host.dispatchEvent(new CustomEvent(`query`,{bubbles:!0,detail:{text:e.target.textContent,activator:e.type}}))}observe(){B(`h5 > a`,this.$shadow).on(`click mouseenter`,this.dispatchQuery),B(`h5 > a`,this.$shadow).on(`mouseleave`,this.dispatchUnQuery),wm({el:this,surface:this.$shadow.querySelector(`header`),cursor:`grab`})}unobserve(){B(`h5 > a`,this.$shadow).off(`click mouseenter`,this.dispatchQuery),B(`h5 > a`,this.$shadow).off(`mouseleave`,this.dispatchUnQuery)}dispatchUnQuery(e){this.$shadow.host.dispatchEvent(new CustomEvent(`unquery`,{bubbles:!0})),this.unobserve(),this.teardown()}set meta(e){this.$shadow.innerHTML=this.render(e)}render({el:e,width:t,height:n,localModifications:r,notLocalModifications:i}){return`
      <figure>
        <header>
          <h5>
            <a node>${e.nodeName.toLowerCase()}</a>
            <a>${e.id&&`#`+e.id}</a>
            ${Ki(e).split(`.`).filter(e=>e!=``).reduce((e,t)=>`
                ${e}
                <a>.${t}</a>
              `,``)}
          </h5>
          <small>
            <span>${Math.round(t)}</span><span brand>px</span>
            <span divider>×</span>
            <span>${Math.round(n)}</span><span brand>px</span>
          </small>
        </header>

        <code>${i.reduce((e,t)=>`
          ${e}
          <span><span prop>${t.prop}</span>:</span>
          <span value>${t.value}</span>
        `,``)}
        </code>
        ${r.length?`
          <details open>
            <summary>Local Modifications / Inline Styles</summary>
            <code>${r.reduce((e,t)=>`
              ${e}
              <span><span prop>${t.prop}</span>:</span>
              <span value>${t.value}</span>
            `,``)}
            </code>
          </details>
        `:``}
      </figure>
    `}};customElements.define(`visbug-metatip`,jm);var Mm=class extends jm{constructor(){super(),this.copyColorSwatch=this.copyColorSwatch.bind(this)}async copyToClipboard(e){let{state:t}=await navigator.permissions.query({name:`clipboard-write`});t===`granted`&&navigator.clipboard.writeText(e)}copyColorSwatch(e){this.copyToClipboard(e.currentTarget.querySelector(`span`).innerText.trim())}observe(){B(`[color-swatch]`,this.$shadow).on(`click`,this.copyColorSwatch),wm({el:this,surface:this.$shadow.querySelector(`header`),cursor:`grab`})}unobserve(){B(`[color-swatch]`,this.$shadow).off(`click`,this.copyColorSwatch)}render({el:e,ally_attributes:t,contrast_results:n}){let r=B(`vis-bug`).attr(`color-mode`),i=e instanceof SVGElement?G(e,`fill`)||G(e,`stroke`):G(e,`color`),a=Pi(e),o=Nl(i),s=Nl(a);return this.style.setProperty(`--copy-message-left-color`,o),this.style.setProperty(`--copy-message-right-color`,s),`
      <figure visbug-ally>
        <header>
          <h5>&#60;${e.nodeName.toLowerCase()}&#62;${e.id&&`#`+e.id}</h5>
        </header>
        <section>
          <div color-swatches>
            <span color-swatch style="background-color:${i};" tabindex="0">
              <small style="color:${o};">
                Foreground
              </small>
              <span style="color:${o};">
                ${Iu(i,r)}
              </span>
            </span>
            <span color-swatch style="background-color:${a};" tabindex="0">
              <small style="color:${s};">
                Background
              </small>
              <span style="color:${s};">
                ${Iu(a,r)}
              </span>
            </span>
          </div>
          ${n}
        </section>
        ${t.length>0?`<code accessibility>
                <div>
                  ${t.reduce((e,t)=>`
                    ${e}
                    <span prop>${t.prop}:</span>
                    <span value>${t.value}</span>
                  `,``)}
                </div>
              </code>`:``}

      </figure>
    `}};customElements.define(`visbug-ally`,Mm);var Nm=t({accessibility:()=>eh,align:()=>Vm,border:()=>Wm,boxshadow:()=>Km,camera:()=>Jm,color_background:()=>Zm,color_border:()=>Qm,color_text:()=>Xm,cursor:()=>Pm,font:()=>zm,guides:()=>Ym,hueshift:()=>Gm,inspector:()=>qm,margin:()=>Lm,move:()=>Fm,padding:()=>Rm,position:()=>$m,resize:()=>Hm,search:()=>Im,text:()=>Bm,transform:()=>Um});const Pm=`
  <svg class="icon-cursor" version="1.1" viewBox="0 0 32 32">
    <path d="M16.689 17.655l5.311 12.345-4 2-4.646-12.678-7.354 6.678v-26l20 16-9.311 1.655z"></path>
  </svg>
`,Fm=`
  <svg viewBox="0 0 24 24">
    <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"/>
  </svg>
`,Im=`
  <svg viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
`,Lm=`
  <svg viewBox="0 0 24 24">
    <path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z"/>
  </svg>
`,Rm=`
  <svg viewBox="0 0 24 24">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"/>
  </svg>
`,zm=`
  <svg viewBox="0 0 24 24">
    <path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/>
  </svg>
`,Bm=`
  <svg viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
`,Vm=`
  <svg viewBox="0 0 24 24" style="transform:rotateZ(90deg);">
    <path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"/>
  </svg>
`,Hm=`
  <svg viewBox="0 0 24 24">
    <path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/>
  </svg>
`,Um=`
  <svg viewBox="0 0 24 24">
    <path d="M12,7C6.48,7,2,9.24,2,12c0,2.24,2.94,4.13,7,4.77V20l4-4l-4-4v2.73c-3.15-0.56-5-1.9-5-2.73c0-1.06,3.04-3,8-3s8,1.94,8,3
    c0,0.73-1.46,1.89-4,2.53v2.05c3.53-0.77,6-2.53,6-4.58C22,9.24,17.52,7,12,7z"/>
  </svg>
`,Wm=`
  <svg viewBox="0 0 24 24">
    <path d="M13 7h-2v2h2V7zm0 4h-2v2h2v-2zm4 0h-2v2h2v-2zM3 3v18h18V3H3zm16 16H5V5h14v14zm-6-4h-2v2h2v-2zm-4-4H7v2h2v-2z"/>
  </svg>
`,Gm=`
  <svg viewBox="0 0 24 24">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
`,Km=`
  <svg viewBox="0 0 24 24">
    <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"/>
  </svg>
`,qm=`
  <svg viewBox="0 0 24 24">
    <g>
      <rect x="11" y="7" width="2" height="2"/>
      <rect x="11" y="11" width="2" height="6"/>
      <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8
        c0-4.41,3.59-8,8-8s8,3.59,8,8C20,16.41,16.41,20,12,20z"/>
    </g>
  </svg>
`,Jm=`
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3.2"/>
    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
  </svg>
`,Ym=`
  <svg viewBox="0 0 24 24">
    <path d="M21,6H3C1.9,6,1,6.9,1,8v8c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V8C23,6.9,22.1,6,21,6z M21,16H3V8h2v4h2V8h2v4h2V8h2v4h2V8
    h2v4h2V8h2V16z"/>
  </svg>
`,Xm=`
  <svg viewBox="3 -2 19 25">
    <path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>
  </svg>
`,Zm=`
  <svg viewBox="0 0 24 18">
    <path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"/>
  </svg>
`,Qm=`
  <svg viewBox="0 0 24 18">
    <path d="M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96c.39-.39.39-1.02 0-1.41L18.37.29c-.39-.39-1.02-.39-1.41 0L15 2.25 18.75 6l1.96-1.96z"/>
  </svg>
`,$m=`
  <svg viewBox="0 0 24 24">
    <path d="M15.54 5.54L13.77 7.3 12 5.54 10.23 7.3 8.46 5.54 12 2zm2.92 10l-1.76-1.77L18.46 12l-1.76-1.77 1.76-1.77L22 12zm-10 2.92l1.77-1.76L12 18.46l1.77-1.76 1.77 1.76L12 22zm-2.92-10l1.76 1.77L5.54 12l1.76 1.77-1.76 1.77L2 12z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
`,eh=`
  <svg viewBox="0 0 24 24">
    <path d="M12,2c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S10.9,2,12,2z M21,9h-6v13h-2v-6h-2v6H9V9H3V7h18V9z"/>
  </svg>
`;var th=class extends HTMLElement{constructor(){super(),this.keyboard_model={num:["`",`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`0`,`-`,`=`,`delete`],tab:[`tab`,`q`,`w`,`e`,`r`,`t`,`y`,`u`,`i`,`o`,`p`,`[`,`]`,`\\`],caps:[`caps`,`a`,`s`,`d`,`f`,`g`,`h`,`j`,`k`,`l`,`'`,`return`],shift:[`shift`,`z`,`x`,`c`,`v`,`b`,`n`,`m`,`,`,`.`,`/`,`shift`],space:[Ji,K,`spacebar`,K,Ji]},this.key_size_model={num:{12:2},tab:{0:2},caps:{0:3,11:3},shift:{0:6,11:6},space:{2:10}},this.$shadow=this.attachShadow({mode:`closed`}),this._hotkey=``,this._usedkeys=[],this.tool=`hotkeymap`,this.applyScheme=da(this.$shadow,pi,vi,Si)}connectedCallback(){this.applyScheme(document.querySelector(`vis-bug`).getAttribute(`color-scheme`)),this.$shift=B(`[keyboard] > section > [shift]`,this.$shadow),this.$ctrl=B(`[keyboard] > section > [ctrl]`,this.$shadow),this.$alt=B(`[keyboard] > section > [${Ji}]`,this.$shadow),this.$cmd=B(`[keyboard] > section > [${K}]`,this.$shadow),this.$up=B(`[arrows] [up]`,this.$shadow),this.$down=B(`[arrows] [down]`,this.$shadow),this.$left=B(`[arrows] [left]`,this.$shadow),this.$right=B(`[arrows] [right]`,this.$shadow)}disconnectedCallback(){}set tool(e){this._tool=e,this.$shadow.innerHTML=this.render()}show(){this.$shadow.host.style.display=`flex`,U(`*`,(e,t)=>this.watchKeys(e,t))}hide(){this.$shadow.host.style.display=`none`,U.unbind(`*`)}watchKeys(e,t){e.preventDefault(),e.stopImmediatePropagation(),this.$shift.attr(`pressed`,U.shift),this.$alt.attr(`pressed`,U[Ji===`opt`?`alt`:Ji]),this.$cmd.attr(`pressed`,U[K]),this.$up.attr(`pressed`,e.code===`ArrowUp`),this.$down.attr(`pressed`,e.code===`ArrowDown`),this.$left.attr(`pressed`,e.code===`ArrowLeft`),this.$right.attr(`pressed`,e.code===`ArrowRight`);let{negative:n,negative_modifier:r,side:i,amount:a}=this.createCommand({e,hotkeys:U});B(`[command]`,this.$shadow)[0].innerHTML=this.displayCommand({negative:n,negative_modifier:r,side:i,amount:a})}createCommand({e:{code:e},hotkeys:t}){let n=t.shift?10:1,r=t.alt?`Subtract`:`Add`,i=t.alt?`from`:`to`,a=`[arrow key]`;return e===`ArrowUp`&&(a=`the top side`),e===`ArrowDown`&&(a=`the bottom side`),e===`ArrowLeft`&&(a=`the left side`),e===`ArrowRight`&&(a=`the right side`),t[K]&&(a=`all sides`),t[K]&&e===`ArrowDown`&&(r=`Subtract`,i=`from`),{negative:r,negative_modifier:i,amount:n,side:a}}displayCommand({negative:e,negative_modifier:t,side:n,amount:r}){return`
      <span negative>${e} </span>
      <span tool>${this._tool}</span>
      <span light> ${t} </span>
      <span side>${n}</span>
      <span light> by </span>
      <span amount>${r}</span>
    `}render(){return`
      <article>
        <div tool-icon>
          <span>
            ${Nm[this._tool]}
            ${this._tool} Tool
          </span>
        </div>
        <div command>
          ${this.displayCommand({negative:`±[${Ji}] `,negative_modifier:` to `,tool:this._tool,side:`[arrow key]`,amount:1})}
        </div>
        <div card>
          <div keyboard>
            ${Object.entries(this.keyboard_model).reduce((e,[t,n])=>`
              ${e}
              <section ${t}>${n.reduce((e,n,r)=>`
                ${e}
                <span
                  ${n}
                  ${this._hotkey==n?`hotkey title="Tool Shortcut Hotkey"`:``}
                  ${this._usedkeys.includes(n)?`used`:``}
                  style="flex:${this.key_size_model[t][r]||1};"
                >${n}</span>
              `,``)}
              </section>
            `,``)}
          </div>
          <div>
            <section arrows>
              <span up used>↑</span>
              <span down used>↓</span>
              <span left used>←</span>
              <span right used>→</span>
            </section>
          </div>
        </div>
      </article>
    `}};customElements.define(`hotkey-map`,th);var nh=class extends th{constructor(){super(),this._hotkey=`g`,this._usedkeys=[],this.tool=`guides`}show(){this.$shadow.host.style.display=`flex`}render(){return`
      <article>
        <div tool-icon>
          <span>
            ${Ym}
            ${this._tool} Tool
          </span>
        </div>
        <div command>
          coming soon
        </div>
      </article>
    `}};customElements.define(`hotkeys-guides`,nh);var rh=class extends th{constructor(){super(),this._hotkey=`i`,this._usedkeys=[Ji],this.tool=`inspector`}show(){this.$shadow.host.style.display=`flex`}render(){return`
      <article>
        <div tool-icon>
          <span>
            ${qm}
            ${this._tool} Tool
          </span>
        </div>
        <div command>
          coming soon
        </div>
      </article>
    `}};customElements.define(`hotkeys-inspector`,rh);var ih=class extends th{constructor(){super(),this._hotkey=`p`,this._usedkeys=[Ji],this.tool=`accessibility`}show(){this.$shadow.host.style.display=`flex`}render(){return`
      <article>
        <div tool-icon>
          <span>
            ${eh}
            ${this._tool} Tool
          </span>
        </div>
        <div command>
          coming soon
        </div>
      </article>
    `}};customElements.define(`hotkeys-accessibility`,ih);var ah=class extends th{constructor(){super(),this._hotkey=`v`,this.tool=`move`}createCommand({e:{code:e},hotkeys:t}){let n=`[arrow key]`;return e===`ArrowUp`&&(n=`up & out of div`),e===`ArrowDown`&&(n=`down & into next sibling / out & under div`),e===`ArrowLeft`&&(n=`towards the front/top of the stack`),e===`ArrowRight`&&(n=`towards the back/bottom of the stack`),{negative:void 0,negative_modifier:void 0,amount:void 0,side:n}}displayCommand({side:e}){return`
      <span tool>${this._tool}</span>
      <span side>${e}</span>
    `}};customElements.define(`hotkeys-move`,ah);var oh=class extends th{constructor(){super(),this._hotkey=`m`,this._usedkeys=[`shift`,K,Ji],this.tool=`margin`}};customElements.define(`hotkeys-margin`,oh);var sh=class extends th{constructor(){super(),this._hotkey=`p`,this._usedkeys=[`shift`,K,Ji],this.tool=`padding`}};customElements.define(`hotkeys-padding`,sh);const ch=[`left`,`center`,`right`],lh=[`top`,`center`,`bottom`],uh=[`evenly`,`normal`,`between`];var dh=class extends th{constructor(){super(),this._hotkey=`a`,this._usedkeys=[K,`shift`],this._htool=0,this._vtool=0,this._dtool=1,this._side=`top left`,this._direction=`row`,this._distribution=uh[this._dtool],this._wrap=`no wrap`,this.tool=`align`}createCommand({e:{code:e},hotkeys:t}){let n=this._distribution,r=this._direction,i=this._side,a=this._wrap;return t[K]&&t.shift?e===`ArrowUp`?a=`no wrap`:e===`ArrowDown`?a=`wrap`:e===`ArrowLeft`&&(r=`${r}-reverse`):t[K]&&(e===`ArrowRight`||e===`ArrowDown`)?(r=e===`ArrowDown`?`column`:`row`,this._direction=r):(i=e===`ArrowUp`?this.clamp(lh,`_vtool`):e===`ArrowDown`?this.clamp(lh,`_vtool`,!0):lh[this._vtool],e===`ArrowLeft`?i+=` `+this.clamp(ch,`_htool`):e===`ArrowRight`?i+=` `+this.clamp(ch,`_htool`,!0):i+=` `+ch[this._htool],this._side=i,t.shift&&(e===`ArrowRight`||e===`ArrowLeft`)&&(n=this.clamp(uh,`_dtool`,e===`ArrowRight`),this._distribution=n)),{negative:a,negative_modifier:r,amount:n,side:i}}displayCommand({side:e,amount:t,negative:n,negative_modifier:r}){return t==1&&(t=this._distribution),r==` to `&&(r=this._direction),`
      <span tool>${this._tool}</span>
      <span light> as </span>
      <span>${r}:</span>
      <span side>${e}</span>
      <span light>, distributed </span>
      <span amount>${t},</span>
      <span light> with </span>
      <span>${n}</span>
    `}clamp(e,t,n=!1){return n?this[t]<e.length-1&&(this[t]=this[t]+1):this[t]>0&&(this[t]=this[t]-1),e[this[t]]}};customElements.define(`hotkeys-align`,dh);var fh=class extends th{constructor(){super(),this._hotkey=`h`,this._usedkeys=[`shift`,K],this.tool=`hueshift`}createCommand({e:{code:e},hotkeys:t}){let n=t.shift?10:1,r=`[increase/decrease]`,i=`[arrow key]`;return t[K]?(i=`hue`,e===`ArrowDown`&&(r=`decrease`),e===`ArrowUp`&&(r=`increase`)):e===`ArrowLeft`||e===`ArrowRight`?(i=`saturation`,e===`ArrowLeft`&&(r=`decrease`),e===`ArrowRight`&&(r=`increase`)):(e===`ArrowUp`||e===`ArrowDown`)&&(i=`lightness`,e===`ArrowDown`&&(r=`decrease`),e===`ArrowUp`&&(r=`increase`)),{negative:r,negative_modifier:`by`,amount:n,side:i}}displayCommand({negative:e,negative_modifier:t,side:n,amount:r}){return e===`±[${Ji}] `&&(e=`[increase/decrease]`),t===` to `&&(t=` by `),`
      <span negative>${e}</span>
      <span side tool>${n}</span>
      <span light>${t}</span>
      <span amount>${r}</span>
    `}};customElements.define(`hotkeys-hueshift`,fh);var ph=class extends th{constructor(){super(),this._hotkey=`d`,this._usedkeys=[`shift`,K],this.tool=`boxshadow`}show(){this.$shadow.host.style.display=`flex`}render(){return`
      <article>
        <div tool-icon>
          <span>
            ${Km}
            ${this._tool} Tool
          </span>
        </div>
        <div command>
          coming soon
        </div>
      </article>
    `}};customElements.define(`hotkeys-boxshadow`,ph);var mh=class extends th{constructor(){super(),this._hotkey=`l`,this._usedkeys=[`shift`,Ji],this.tool=`position`}show(){this.$shadow.host.style.display=`flex`}render(){return`
      <article>
        <div tool-icon>
          <span>
            ${$m}
            ${this._tool} Tool
          </span>
        </div>
        <div command>
          coming soon
        </div>
      </article>
    `}};customElements.define(`hotkeys-position`,mh);var hh=class extends th{constructor(){super(),this._hotkey=`f`,this._usedkeys=[`shift`,K],this.tool=`font`}createCommand({e:{code:e},hotkeys:t}){let n=t.shift?10:1,r=`[increase/decrease]`,i=`by`,a=`[arrow key]`;return t.shift&&(e===`ArrowLeft`||e===`ArrowRight`)?(a=`kerning`,n=`1px`,e===`ArrowLeft`&&(r=`decrease`),e===`ArrowRight`&&(r=`increase`)):t.shift&&(e===`ArrowUp`||e===`ArrowDown`)?(a=`leading`,n=`1px`,e===`ArrowUp`&&(r=`increase`),e===`ArrowDown`&&(r=`decrease`)):t[K]&&(e===`ArrowUp`||e===`ArrowDown`)?(a=`font weight`,n=``,i=``,e===`ArrowUp`&&(r=`increase`),e===`ArrowDown`&&(r=`decrease`)):e===`ArrowUp`||e===`ArrowDown`?(a=`font size`,n=`1px`,e===`ArrowUp`&&(r=`increase`),e===`ArrowDown`&&(r=`decrease`)):(e===`ArrowRight`||e===`ArrowLeft`)&&(a=`text alignment`,n=``,r=`adjust`,i=``),{negative:r,negative_modifier:i,amount:n,side:a}}displayCommand({negative:e,negative_modifier:t,side:n,amount:r}){return e===`±[${Ji}] `&&(e=`[increase/decrease]`),t===` to `&&(t=` by `),`
      <span negative>${e}</span>
      <span side tool>${n}</span>
      <span light>${t}</span>
      <span amount>${r}</span>
    `}};customElements.define(`hotkeys-font`,hh);var gh=class extends th{constructor(){super(),this._hotkey=`e`,this._usedkeys=[],this.tool=`text`}show(){this.$shadow.host.style.display=`flex`}render(){return`
      <article>
        <div tool-icon>
          <span>
            ${Bm}
            ${this._tool} Tool
          </span>
        </div>
        <div command>
          coming soon
        </div>
      </article>
    `}};customElements.define(`hotkeys-text`,gh);var _h=class extends th{constructor(){super(),this._hotkey=`s`,this._usedkeys=[],this.tool=`search`}show(){this.$shadow.host.style.display=`flex`}render(){return`
      <article>
        <div tool-icon>
          <span>
            ${Im}
            ${this._tool} Tool
          </span>
        </div>
        <div command>
          coming soon
        </div>
      </article>
    `}};customElements.define(`hotkeys-search`,_h);var vh=class extends HTMLElement{constructor(){super(),this.tool_map={guides:document.createElement(`hotkeys-guides`),inspector:document.createElement(`hotkeys-inspector`),accessibility:document.createElement(`hotkeys-accessibility`),move:document.createElement(`hotkeys-move`),margin:document.createElement(`hotkeys-margin`),padding:document.createElement(`hotkeys-padding`),align:document.createElement(`hotkeys-align`),hueshift:document.createElement(`hotkeys-hueshift`),boxshadow:document.createElement(`hotkeys-boxshadow`),position:document.createElement(`hotkeys-position`),font:document.createElement(`hotkeys-font`),text:document.createElement(`hotkeys-text`),search:document.createElement(`hotkeys-search`)},Object.values(this.tool_map).forEach(e=>this.appendChild(e))}connectedCallback(){U(`shift+/`,e=>this.cur_tool?this.hideTool():this.showTool()),U(`esc`,e=>this.hideTool())}disconnectedCallback(){}hideTool(){this.cur_tool&&=(this.cur_tool.hide(),null)}showTool(){this.cur_tool=this.tool_map[B(`vis-bug`)[0].activeTool],this.cur_tool.show()}};customElements.define(`visbug-hotkeys`,vh);const yh={g:{tool:`guides`,icon:Ym,label:`<span><u>G</u>uides</span>`,description:`Verify alignment & measure distances`,instruction:`<div table>
                    <div>
                      <b>Element Guides:</b>
                      <span>hover</span>
                    </div>
                    <div>
                      <b>Measure:</b>
                      <span>click+hover</span>
                    </div>
                    <div>
                      <b>Measure many:</b>
                      <span>shift+click</span>
                    </div>
                    <div>
                      <b>Clear:</b>
                      <span>esc</span>
                    </div>
                  </div>`},i:{tool:`inspector`,icon:qm,label:`<span><u>I</u>nspect</span>`,description:`Inspect the common styles of an element`,instruction:`<div table>
                    <div>
                      <b>Pin it:</b>
                      <span>click</span>
                    </div>
                    <div>
                      <b>Pin many:</b>
                      <span>shift+click</span>
                    </div>
                    <div>
                      <b>Position it:</b>
                      <span>click & drag by the header area</span>
                    </div>
                    <div>
                      <b>Clear:</b>
                      <span>esc</span>
                    </div>
                  </div>`},x:{tool:`accessibility`,icon:eh,label:`Accessibility`,description:`Inspect attributes & contrast compliance`,instruction:`<div table>
                    <div>
                      <b>Pin it:</b>
                      <span>click</span>
                    </div>
                    <div>
                      <b>Pin many:</b>
                      <span>shift+click</span>
                    </div>
                    <div>
                      <b>Clear:</b>
                      <span>esc</span>
                    </div>
                  </div>`},l:{tool:`position`,icon:$m,label:`Position`,description:`Grab and position elements anywhere`,instruction:`<div table>
                    <div>
                      <b>Nudge:</b>
                      <span>◀ ▶ ▲ ▼</span>
                    </div>
                    <div>
                      <b>Place:</b>
                      <span>Click & drag</span>
                    </div>
                    <div>
                      <b>Restore:</b>
                      <span>${Ji} + delete</span>
                    </div>
                  </div>`},m:{tool:`margin`,icon:Lm,label:`<span><u>M</u>argin</span>`,description:`Adjust spacing outside`,instruction:`<div table>
                    <div>
                      <b>+ Margin:</b>
                      <span>◀ ▶ ▲ ▼</span>
                    </div>
                    <div>
                      <b>- Margin:</b>
                      <span>${Ji} + ◀ ▶ ▲ ▼</span>
                    </div>
                    <div>
                      <b>All Sides:</b>
                      <span>${K} +  ▲ ▼</span>
                    </div>
                    <div>
                      <b>Trainer:</b>
                      <span>shift + /</span>
                    </div>
                  </div>`},p:{tool:`padding`,icon:Rm,label:`<span><u>P</u>adding</span>`,description:`Adjust spacing within`,instruction:`<div table>
                    <div>
                      <b>+ Padding:</b>
                      <span>◀ ▶ ▲ ▼</span>
                    </div>
                    <div>
                      <b>- Padding:</b>
                      <span>${Ji} + ◀ ▶ ▲ ▼</span>
                    </div>
                    <div>
                      <b>All Sides:</b>
                      <span>${K} +  ▲ ▼</span>
                    </div>
                    <div>
                      <b>Trainer:</b>
                      <span>shift + /</span>
                    </div>
                  </div>`},a:{tool:`align`,icon:Vm,label:`<span>Flexbox <u>A</u>lign</span>`,description:`Adjust flexbox layout features`,instruction:`<div table>
                    <div>
                      <b>Rows:</b>
                      <span>${K} + ▼</span>
                    </div>
                    <div>
                      <b>Columns:</b>
                      <span>${K} + ▶</span>
                    </div>
                    <div>
                      <b>Alignment:</b>
                      <span>◀ ▶ ▲ ▼</span>
                    </div>
                    <div>
                      <b>Distribution:</b>
                      <span>Shift + ◀ ▶</span>
                    </div>
                    <div>
                      <b>Order:</b>
                      <span>${K} + shift + ◀ ▶</span>
                    </div>
                    <div>
                      <b>Wrapping:</b>
                      <span>${K} + shift + ▲ ▼</span>
                    </div>
                    <div>
                      <b>Trainer:</b>
                      <span>shift + /</span>
                    </div>
                  </div>`},v:{tool:`move`,icon:Fm,label:`<span>Mo<u>v</u>e</span>`,description:`Change the position of elements`,instruction:`<div table>
                    <div>
                      <b>Lateral:</b>
                      <span>click container ⇒ drag child</span>
                    </div>
                    <div>
                      <b>Lateral:</b>
                      <span>◀ ▶</span>
                    </div>
                    <div>
                      <b>Out and above:</b>
                      <span>▲</span>
                    </div>
                    <div>
                      <b>Down+in, out+under:</b>
                      <span>▼</span>
                    </div>
                    <div>
                      <b>Trainer:</b>
                      <span>shift + /</span>
                    </div>
                  </div>`},h:{tool:`hueshift`,icon:Gm,label:`<span><u>H</u>ue Shift</span>`,description:``,instruction:`<div table>
                    <div>
                      <b>Saturation:</b>
                      <span>◀ ▶</span>
                    </div>
                    <div>
                      <b>Brightness:</b>
                      <span>▲ ▼</span>
                    </div>
                    <div>
                      <b>Hue:</b>
                      <span>${K} +  ▲ ▼</span>
                    </div>
                    <div>
                      <b>Opacity:</b>
                      <span>${K} +  ◀ ▶</span>
                    </div>
                    <div>
                      <b>Trainer:</b>
                      <span>shift + /</span>
                    </div>
                  </div>`},d:{tool:`boxshadow`,icon:Km,label:`<span>Box Sha<u>d</u>ows</span>`,description:``,instruction:`<div table>
                    <div>
                      <b>X/Y Position:</b>
                      <span>◀ ▶ ▲ ▼</span>
                    </div>
                    <div>
                      <b>Blur:</b>
                      <span>${Ji} + ▲ ▼</span>
                    </div>
                    <div>
                      <b>Spread:</b>
                      <span>${Ji} + ◀ ▶</span>
                    </div>
                    <div>
                      <b>Opacity:</b>
                      <span>${K} + ◀ ▶</span>
                    </div>
                  </div>`},f:{tool:`font`,icon:zm,label:`<span><u>F</u>ont Styles</span>`,description:``,instruction:`<div table>
                    <div>
                      <b>Size:</b>
                      <span>▲ ▼</span>
                    </div>
                    <div>
                      <b>Alignment:</b>
                      <span>◀ ▶</span>
                    </div>
                    <div>
                      <b>Leading:</b>
                      <span>Shift + ▲ ▼</span>
                    </div>
                    <div>
                      <b>Letter-spacing:</b>
                      <span>Shift + ◀ ▶</span>
                    </div>
                    <div>
                      <b>Weight:</b>
                      <span>${K} + ▲ ▼</span>
                    </div>
                    <div>
                      <b>Trainer:</b>
                      <span>shift + /</span>
                    </div>
                  </div>`},e:{tool:`text`,icon:Bm,label:`<span><u>E</u>dit Text</span>`,description:`Just <b>Double click</b> any text on the page`,instruction:``},s:{tool:`search`,icon:Im,label:`<span><u>S</u>earch</span>`,description:`Select elements programatically by searching for them or use built in plugins with special commands`,instruction:``}};var bh=class extends HTMLElement{constructor(){super(),this.toolbar_model=yh,this.$shadow=this.attachShadow({mode:`closed`}),this.applyScheme=da(this.$shadow,ti,gi,bi)}static get observedAttributes(){return[`color-scheme`]}connectedCallback(){this._tutsBaseURL=this.getAttribute(`tutsBaseURL`)||`tuts`,this.setup(),this.selectorEngine=mp(this),this.colorPicker=Fu(this.$shadow,this.selectorEngine),bf(this.selectorEngine),this.toolSelected(B(`[data-tool="guides"]`,this.$shadow)[0])}disconnectedCallback(){this.deactivate_feature(),this.cleanup(),this.selectorEngine.disconnect(),U.unbind(Object.keys(this.toolbar_model).reduce((e,t)=>e+=`,`+t,``)),U.unbind(`${K}+/`)}attributeChangedCallback(e,t,n){e===`color-scheme`&&this.applyScheme(n)}setup(){this.$shadow.innerHTML=this.render(),this.hasAttribute(`color-mode`)?this.getAttribute(`color-mode`):this.setAttribute(`color-mode`,`hex`),this.hasAttribute(`color-scheme`)?this.getAttribute(`color-scheme`):this.setAttribute(`color-scheme`,`auto`),this.setAttribute(`popover`,`manual`),this.showPopover&&this.showPopover();let e=this.$shadow.querySelector(`ol:not([colors])`),t=B(`li[data-tool], li[data-tool] *`,e),n=e=>{let t=(e.currentTarget||e.target).closest(`[data-tool]`);t&&this.toolSelected(t)&&e.stopPropagation()};Array.from(t).forEach(e=>{wm({el:this,surface:e,cursor:`pointer`,clickEvent:n})}),wm({el:this,surface:e,cursor:`grab`}),Object.entries(this.toolbar_model).forEach(([e,t])=>U(e,e=>{e.preventDefault(),this.toolSelected(B(`[data-tool="${t.tool}"]`,this.$shadow)[0])})),U(`${K}+/,${K}+.`,e=>this.$shadow.host.style.display=this.$shadow.host.style.display===`none`?`block`:`none`)}cleanup(){this.hidePopover&&this.hidePopover(),Array.from(document.body.children).filter(e=>e.nodeName.includes(`VISBUG`)).forEach(e=>e.remove()),this.teardown(),document.querySelectorAll(`[data-pseudo-select=true]`).forEach(e=>e.removeAttribute(`data-pseudo-select`))}toolSelected(e){typeof e==`string`&&(e=B(`[data-tool="${e}"]`,this.$shadow)[0]),!(this.active_tool&&this.active_tool.dataset.tool===e.dataset.tool)&&(this.active_tool&&(this.active_tool.attr(`data-active`,null),this.deactivate_feature()),e.attr(`data-active`,!0),this.active_tool=e,this[e.dataset.tool]())}render(){return`
      <visbug-hotkeys></visbug-hotkeys>
      <ol constructible-support="${Di?`false`:`true`}">
        ${Object.entries(this.toolbar_model).reduce((e,[t,n])=>`
          ${e}
          <li aria-label="${n.label} Tool" aria-description="${n.description}" aria-hotkey="${t}" data-tool="${n.tool}" data-active="${t==`g`}">
            ${n.icon}
            ${this.demoTip({key:t,...n})}
          </li>
        `,``)}
      </ol>
      <ol colors>
        <li class="color" id="foreground" aria-label="Text" aria-description="Change the text color">
          <input type="color">
          ${Xm}
        </li>
        <li class="color" id="background" aria-label="Background or Fill" aria-description="Change the background color or fill of svg">
          <input type="color">
          ${Zm}
        </li>
        <li class="color" id="border" aria-label="Border or Stroke" aria-description="Change the border color or stroke of svg">
          <input type="color">
          ${Qm}
        </li>
      </ol>
    `}demoTip({key:e,tool:t,label:n,description:r,instruction:i}){return`
      <aside ${t}>
        <figure>
          <img src="${this._tutsBaseURL}/${t}.gif" alt="${r}" />
          <figcaption>
            <h2>
              ${n}
              <span hotkey>${e}</span>
            </h2>
            <p>${r}</p>
            ${i}
          </figcaption>
        </figure>
      </aside>
    `}move(){this.deactivate_feature=pd(this.selectorEngine)}margin(){this.deactivate_feature=Ql(this.selectorEngine)}padding(){this.deactivate_feature=Of(this.selectorEngine)}font(){this.deactivate_feature=Sp(this.selectorEngine)}text(){this.selectorEngine.onSelectedUpdate(yp),this.deactivate_feature=()=>this.selectorEngine.removeSelectedCallback(yp)}align(){this.deactivate_feature=Pp(this.selectorEngine)}search(){this.deactivate_feature=yf(B(`[data-tool="search"]`,this.$shadow))}boxshadow(){this.deactivate_feature=rm(this.selectorEngine)}hueshift(){this.deactivate_feature=dm({Color:this.colorPicker,Visbug:this.selectorEngine})}inspector(){this.deactivate_feature=Ff(this.selectorEngine)}accessibility(){this.deactivate_feature=Zf(this.selectorEngine)}guides(){this.deactivate_feature=hm(this.selectorEngine)}screenshot(){this.deactivate_feature=xm()}position(){let e=Cm();this.selectorEngine.onSelectedUpdate(e.onNodesSelected),this.deactivate_feature=()=>{this.selectorEngine.removeSelectedCallback(e.onNodesSelected),e.disconnect()}}execCommand(e){let t=`/${e}`;return uf.has(t)?uf.get(t)({selected:this.selectorEngine.selection(),query:t}):Promise.resolve(Error(`Query not found`))}get activeTool(){return this.active_tool.dataset.tool}};customElements.define(`vis-bug`,bh);function xh(){return document.createElement(`vis-bug`)}const Sh=({isActive:e,isWaitingForFeedback:t,onElementInspected:n})=>{let[r,i]=(0,I.useState)([]),a=(0,I.useRef)(null),o=(0,I.useRef)(null);(0,I.useEffect)(()=>{if(!e||t){o.current=null,a.current&&=(a.current.remove(),null),i([]);return}let n=xh();a.current=n,document.body.appendChild(n);let r=n.selectorEngine;return o.current=r,r.onSelectedUpdate(e=>i([...e])),()=>{o.current=null,a.current===n&&(n.remove(),a.current=null)}},[e,t]);let s=(0,I.useCallback)(()=>{let e=o.current?.selection()??[];if(!e.length)return;let[t,...r]=e,i=$n(t),a=r.map(e=>{let t=$n(e);return{file:t.file,component:t.component,apis:t.apis,line:t.line,column:t.column,elementInfo:t.elementInfo?{tagName:t.elementInfo.tagName,textContent:t.elementInfo.textContent,className:t.elementInfo.className,id:t.elementInfo.id,styles:t.elementInfo.styles||{}}:void 0}});n({...i,relatedElements:a.length>0?a:void 0}),o.current?.unselect_all()},[n]);return(0,I.useEffect)(()=>{if(!e||t)return;let n=e=>{e.key!==`Enter`||!(e.metaKey||e.ctrlKey)||r.length&&(e.preventDefault(),s())};return document.addEventListener(`keydown`,n,!0),()=>document.removeEventListener(`keydown`,n,!0)},[e,t,r,s]),{selection:r,finalizeSelection:s}};var Ch=e(N(),1);function wh(e){if(!e||typeof document>`u`)return;let t=document.head||document.getElementsByTagName(`head`)[0],n=document.createElement(`style`);n.type=`text/css`,t.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}const Th=e=>{switch(e){case`success`:return Oh;case`info`:return Ah;case`warning`:return kh;case`error`:return jh;default:return null}},Eh=Array(12).fill(0),Dh=({visible:e,className:t})=>I.createElement(`div`,{className:[`sonner-loading-wrapper`,t].filter(Boolean).join(` `),"data-visible":e},I.createElement(`div`,{className:`sonner-spinner`},Eh.map((e,t)=>I.createElement(`div`,{className:`sonner-loading-bar`,key:`spinner-bar-${t}`})))),Oh=I.createElement(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 20 20`,fill:`currentColor`,height:`20`,width:`20`},I.createElement(`path`,{fillRule:`evenodd`,d:`M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z`,clipRule:`evenodd`})),kh=I.createElement(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`currentColor`,height:`20`,width:`20`},I.createElement(`path`,{fillRule:`evenodd`,d:`M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z`,clipRule:`evenodd`})),Ah=I.createElement(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 20 20`,fill:`currentColor`,height:`20`,width:`20`},I.createElement(`path`,{fillRule:`evenodd`,d:`M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z`,clipRule:`evenodd`})),jh=I.createElement(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 20 20`,fill:`currentColor`,height:`20`,width:`20`},I.createElement(`path`,{fillRule:`evenodd`,d:`M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z`,clipRule:`evenodd`})),Mh=I.createElement(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`12`,height:`12`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`},I.createElement(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),I.createElement(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})),Nh=()=>{let[e,t]=I.useState(document.hidden);return I.useEffect(()=>{let e=()=>{t(document.hidden)};return document.addEventListener(`visibilitychange`,e),()=>window.removeEventListener(`visibilitychange`,e)},[]),e};let Ph=1;const Fh=new class{constructor(){this.subscribe=e=>(this.subscribers.push(e),()=>{let t=this.subscribers.indexOf(e);this.subscribers.splice(t,1)}),this.publish=e=>{this.subscribers.forEach(t=>t(e))},this.addToast=e=>{this.publish(e),this.toasts=[...this.toasts,e]},this.create=e=>{let{message:t,...n}=e,r=typeof e?.id==`number`||e.id?.length>0?e.id:Ph++,i=this.toasts.find(e=>e.id===r),a=e.dismissible===void 0?!0:e.dismissible;return this.dismissedToasts.has(r)&&this.dismissedToasts.delete(r),i?this.toasts=this.toasts.map(n=>n.id===r?(this.publish({...n,...e,id:r,title:t}),{...n,...e,id:r,dismissible:a,title:t}):n):this.addToast({title:t,...n,dismissible:a,id:r}),r},this.dismiss=e=>(e?(this.dismissedToasts.add(e),requestAnimationFrame(()=>this.subscribers.forEach(t=>t({id:e,dismiss:!0})))):this.toasts.forEach(e=>{this.subscribers.forEach(t=>t({id:e.id,dismiss:!0}))}),e),this.message=(e,t)=>this.create({...t,message:e}),this.error=(e,t)=>this.create({...t,message:e,type:`error`}),this.success=(e,t)=>this.create({...t,type:`success`,message:e}),this.info=(e,t)=>this.create({...t,type:`info`,message:e}),this.warning=(e,t)=>this.create({...t,type:`warning`,message:e}),this.loading=(e,t)=>this.create({...t,type:`loading`,message:e}),this.promise=(e,t)=>{if(!t)return;let n;t.loading!==void 0&&(n=this.create({...t,promise:e,type:`loading`,message:t.loading,description:typeof t.description==`function`?void 0:t.description}));let r=Promise.resolve(e instanceof Function?e():e),i=n!==void 0,a,o=r.then(async e=>{if(a=[`resolve`,e],I.isValidElement(e))i=!1,this.create({id:n,type:`default`,message:e});else if(Lh(e)&&!e.ok){i=!1;let r=typeof t.error==`function`?await t.error(`HTTP error! status: ${e.status}`):t.error,a=typeof t.description==`function`?await t.description(`HTTP error! status: ${e.status}`):t.description,o=typeof r==`object`&&!I.isValidElement(r)?r:{message:r};this.create({id:n,type:`error`,description:a,...o})}else if(e instanceof Error){i=!1;let r=typeof t.error==`function`?await t.error(e):t.error,a=typeof t.description==`function`?await t.description(e):t.description,o=typeof r==`object`&&!I.isValidElement(r)?r:{message:r};this.create({id:n,type:`error`,description:a,...o})}else if(t.success!==void 0){i=!1;let r=typeof t.success==`function`?await t.success(e):t.success,a=typeof t.description==`function`?await t.description(e):t.description,o=typeof r==`object`&&!I.isValidElement(r)?r:{message:r};this.create({id:n,type:`success`,description:a,...o})}}).catch(async e=>{if(a=[`reject`,e],t.error!==void 0){i=!1;let r=typeof t.error==`function`?await t.error(e):t.error,a=typeof t.description==`function`?await t.description(e):t.description,o=typeof r==`object`&&!I.isValidElement(r)?r:{message:r};this.create({id:n,type:`error`,description:a,...o})}}).finally(()=>{i&&(this.dismiss(n),n=void 0),t.finally==null||t.finally.call(t)}),s=()=>new Promise((e,t)=>o.then(()=>a[0]===`reject`?t(a[1]):e(a[1])).catch(t));return typeof n!=`string`&&typeof n!=`number`?{unwrap:s}:Object.assign(n,{unwrap:s})},this.custom=(e,t)=>{let n=t?.id||Ph++;return this.create({jsx:e(n),id:n,...t}),n},this.getActiveToasts=()=>this.toasts.filter(e=>!this.dismissedToasts.has(e.id)),this.subscribers=[],this.toasts=[],this.dismissedToasts=new Set}},Ih=(e,t)=>{let n=t?.id||Ph++;return Fh.addToast({title:e,...t,id:n}),n},Lh=e=>e&&typeof e==`object`&&`ok`in e&&typeof e.ok==`boolean`&&`status`in e&&typeof e.status==`number`,Rh=Ih;Object.assign(Rh,{success:Fh.success,info:Fh.info,warning:Fh.warning,error:Fh.error,custom:Fh.custom,message:Fh.message,promise:Fh.promise,dismiss:Fh.dismiss,loading:Fh.loading},{getHistory:()=>Fh.toasts,getToasts:()=>Fh.getActiveToasts()}),wh(`[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}`);function zh(e){return e.label!==void 0}const Bh=4e3;function Vh(...e){return e.filter(Boolean).join(` `)}function Hh(e){let[t,n]=e.split(`-`),r=[];return t&&r.push(t),n&&r.push(n),r}const Uh=e=>{let{invert:t,toast:n,unstyled:r,interacting:i,setHeights:a,visibleToasts:o,heights:s,index:c,toasts:l,expanded:u,removeToast:d,defaultRichColors:f,closeButton:p,style:m,cancelButtonStyle:h,actionButtonStyle:g,className:_=``,descriptionClassName:v=``,duration:y,position:b,gap:x,expandByDefault:S,classNames:C,icons:w,closeButtonAriaLabel:T=`Close toast`}=e,[E,D]=I.useState(null),[O,k]=I.useState(null),[A,j]=I.useState(!1),[M,ee]=I.useState(!1),[N,P]=I.useState(!1),[te,ne]=I.useState(!1),[re,ie]=I.useState(!1),[F,ae]=I.useState(0),[oe,se]=I.useState(0),ce=I.useRef(n.duration||y||Bh),le=I.useRef(null),ue=I.useRef(null),de=c===0,fe=c+1<=o,pe=n.type,me=n.dismissible!==!1,he=n.className||``,ge=n.descriptionClassName||``,_e=I.useMemo(()=>s.findIndex(e=>e.toastId===n.id)||0,[s,n.id]),ve=I.useMemo(()=>n.closeButton??p,[n.closeButton,p]),ye=I.useMemo(()=>n.duration||y||Bh,[n.duration,y]),be=I.useRef(0),xe=I.useRef(0),Se=I.useRef(0),Ce=I.useRef(null),[we,Te]=b.split(`-`),L=I.useMemo(()=>s.reduce((e,t,n)=>n>=_e?e:e+t.height,0),[s,_e]),Ee=Nh(),De=n.invert||t,Oe=pe===`loading`;xe.current=I.useMemo(()=>_e*x+L,[_e,L]),I.useEffect(()=>{ce.current=ye},[ye]),I.useEffect(()=>{j(!0)},[]),I.useEffect(()=>{let e=ue.current;if(e){let t=e.getBoundingClientRect().height;return se(t),a(e=>[{toastId:n.id,height:t,position:n.position},...e]),()=>a(e=>e.filter(e=>e.toastId!==n.id))}},[a,n.id]),I.useLayoutEffect(()=>{if(!A)return;let e=ue.current,t=e.style.height;e.style.height=`auto`;let r=e.getBoundingClientRect().height;e.style.height=t,se(r),a(e=>e.find(e=>e.toastId===n.id)?e.map(e=>e.toastId===n.id?{...e,height:r}:e):[{toastId:n.id,height:r,position:n.position},...e])},[A,n.title,n.description,a,n.id,n.jsx,n.action,n.cancel]);let ke=I.useCallback(()=>{ee(!0),ae(xe.current),a(e=>e.filter(e=>e.toastId!==n.id)),setTimeout(()=>{d(n)},200)},[n,d,a,xe]);I.useEffect(()=>{if(n.promise&&pe===`loading`||n.duration===1/0||n.type===`loading`)return;let e;return u||i||Ee?(()=>{if(Se.current<be.current){let e=new Date().getTime()-be.current;ce.current-=e}Se.current=new Date().getTime()})():ce.current!==1/0&&(be.current=new Date().getTime(),e=setTimeout(()=>{n.onAutoClose==null||n.onAutoClose.call(n,n),ke()},ce.current)),()=>clearTimeout(e)},[u,i,n,pe,Ee,ke]),I.useEffect(()=>{n.delete&&(ke(),n.onDismiss==null||n.onDismiss.call(n,n))},[ke,n.delete]);function Ae(){return w?.loading?I.createElement(`div`,{className:Vh(C?.loader,n?.classNames?.loader,`sonner-loader`),"data-visible":pe===`loading`},w.loading):I.createElement(Dh,{className:Vh(C?.loader,n?.classNames?.loader),visible:pe===`loading`})}let je=n.icon||w?.[pe]||Th(pe);return I.createElement(`li`,{tabIndex:0,ref:ue,className:Vh(_,he,C?.toast,n?.classNames?.toast,C?.default,C?.[pe],n?.classNames?.[pe]),"data-sonner-toast":``,"data-rich-colors":n.richColors??f,"data-styled":!(n.jsx||n.unstyled||r),"data-mounted":A,"data-promise":!!n.promise,"data-swiped":re,"data-removed":M,"data-visible":fe,"data-y-position":we,"data-x-position":Te,"data-index":c,"data-front":de,"data-swiping":N,"data-dismissible":me,"data-type":pe,"data-invert":De,"data-swipe-out":te,"data-swipe-direction":O,"data-expanded":!!(u||S&&A),"data-testid":n.testId,style:{"--index":c,"--toasts-before":c,"--z-index":l.length-c,"--offset":`${M?F:xe.current}px`,"--initial-height":S?`auto`:`${oe}px`,...m,...n.style},onDragEnd:()=>{P(!1),D(null),Ce.current=null},onPointerDown:e=>{e.button!==2&&(Oe||!me||(le.current=new Date,ae(xe.current),e.target.setPointerCapture(e.pointerId),e.target.tagName!==`BUTTON`&&(P(!0),Ce.current={x:e.clientX,y:e.clientY})))},onPointerUp:()=>{if(te||!me)return;Ce.current=null;let e=Number(ue.current?.style.getPropertyValue(`--swipe-amount-x`).replace(`px`,``)||0),t=Number(ue.current?.style.getPropertyValue(`--swipe-amount-y`).replace(`px`,``)||0),r=new Date().getTime()-le.current?.getTime(),i=E===`x`?e:t,a=Math.abs(i)/r;if(Math.abs(i)>=45||a>.11){ae(xe.current),n.onDismiss==null||n.onDismiss.call(n,n),k(E===`x`?e>0?`right`:`left`:t>0?`down`:`up`),ke(),ne(!0);return}else{var o,s;(o=ue.current)==null||o.style.setProperty(`--swipe-amount-x`,`0px`),(s=ue.current)==null||s.style.setProperty(`--swipe-amount-y`,`0px`)}ie(!1),P(!1),D(null)},onPointerMove:t=>{var n,r;if(!Ce.current||!me||window.getSelection()?.toString().length>0)return;let i=t.clientY-Ce.current.y,a=t.clientX-Ce.current.x,o=e.swipeDirections??Hh(b);!E&&(Math.abs(a)>1||Math.abs(i)>1)&&D(Math.abs(a)>Math.abs(i)?`x`:`y`);let s={x:0,y:0},c=e=>1/(1.5+Math.abs(e)/20);if(E===`y`){if(o.includes(`top`)||o.includes(`bottom`))if(o.includes(`top`)&&i<0||o.includes(`bottom`)&&i>0)s.y=i;else{let e=i*c(i);s.y=Math.abs(e)<Math.abs(i)?e:i}}else if(E===`x`&&(o.includes(`left`)||o.includes(`right`)))if(o.includes(`left`)&&a<0||o.includes(`right`)&&a>0)s.x=a;else{let e=a*c(a);s.x=Math.abs(e)<Math.abs(a)?e:a}(Math.abs(s.x)>0||Math.abs(s.y)>0)&&ie(!0),(n=ue.current)==null||n.style.setProperty(`--swipe-amount-x`,`${s.x}px`),(r=ue.current)==null||r.style.setProperty(`--swipe-amount-y`,`${s.y}px`)}},ve&&!n.jsx&&pe!==`loading`?I.createElement(`button`,{"aria-label":T,"data-disabled":Oe,"data-close-button":!0,onClick:Oe||!me?()=>{}:()=>{ke(),n.onDismiss==null||n.onDismiss.call(n,n)},className:Vh(C?.closeButton,n?.classNames?.closeButton)},w?.close??Mh):null,(pe||n.icon||n.promise)&&n.icon!==null&&(w?.[pe]!==null||n.icon)?I.createElement(`div`,{"data-icon":``,className:Vh(C?.icon,n?.classNames?.icon)},n.promise||n.type===`loading`&&!n.icon?n.icon||Ae():null,n.type===`loading`?null:je):null,I.createElement(`div`,{"data-content":``,className:Vh(C?.content,n?.classNames?.content)},I.createElement(`div`,{"data-title":``,className:Vh(C?.title,n?.classNames?.title)},n.jsx?n.jsx:typeof n.title==`function`?n.title():n.title),n.description?I.createElement(`div`,{"data-description":``,className:Vh(v,ge,C?.description,n?.classNames?.description)},typeof n.description==`function`?n.description():n.description):null),I.isValidElement(n.cancel)?n.cancel:n.cancel&&zh(n.cancel)?I.createElement(`button`,{"data-button":!0,"data-cancel":!0,style:n.cancelButtonStyle||h,onClick:e=>{zh(n.cancel)&&me&&(n.cancel.onClick==null||n.cancel.onClick.call(n.cancel,e),ke())},className:Vh(C?.cancelButton,n?.classNames?.cancelButton)},n.cancel.label):null,I.isValidElement(n.action)?n.action:n.action&&zh(n.action)?I.createElement(`button`,{"data-button":!0,"data-action":!0,style:n.actionButtonStyle||g,onClick:e=>{zh(n.action)&&(n.action.onClick==null||n.action.onClick.call(n.action,e),!e.defaultPrevented&&ke())},className:Vh(C?.actionButton,n?.classNames?.actionButton)},n.action.label):null)};function Wh(){if(typeof window>`u`||typeof document>`u`)return`ltr`;let e=document.documentElement.getAttribute(`dir`);return e===`auto`||!e?window.getComputedStyle(document.documentElement).direction:e}function Gh(e,t){let n={};return[e,t].forEach((e,t)=>{let r=t===1,i=r?`--mobile-offset`:`--offset`,a=r?`16px`:`24px`;function o(e){[`top`,`right`,`bottom`,`left`].forEach(t=>{n[`${i}-${t}`]=typeof e==`number`?`${e}px`:e})}typeof e==`number`||typeof e==`string`?o(e):typeof e==`object`?[`top`,`right`,`bottom`,`left`].forEach(t=>{e[t]===void 0?n[`${i}-${t}`]=a:n[`${i}-${t}`]=typeof e[t]==`number`?`${e[t]}px`:e[t]}):o(a)}),n}const Kh=I.forwardRef(function(e,t){let{id:n,invert:r,position:i=`bottom-right`,hotkey:a=[`altKey`,`KeyT`],expand:o,closeButton:s,className:c,offset:l,mobileOffset:u,theme:d=`light`,richColors:f,duration:p,style:m,visibleToasts:h=3,toastOptions:g,dir:_=Wh(),gap:v=14,icons:y,containerAriaLabel:b=`Notifications`}=e,[x,S]=I.useState([]),C=I.useMemo(()=>n?x.filter(e=>e.toasterId===n):x.filter(e=>!e.toasterId),[x,n]),w=I.useMemo(()=>Array.from(new Set([i].concat(C.filter(e=>e.position).map(e=>e.position)))),[C,i]),[T,E]=I.useState([]),[D,O]=I.useState(!1),[k,A]=I.useState(!1),[j,M]=I.useState(d===`system`?typeof window<`u`&&window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`:d),ee=I.useRef(null),N=a.join(`+`).replace(/Key/g,``).replace(/Digit/g,``),P=I.useRef(null),te=I.useRef(!1),ne=I.useCallback(e=>{S(t=>(t.find(t=>t.id===e.id)?.delete||Fh.dismiss(e.id),t.filter(({id:t})=>t!==e.id)))},[]);return I.useEffect(()=>Fh.subscribe(e=>{if(e.dismiss){requestAnimationFrame(()=>{S(t=>t.map(t=>t.id===e.id?{...t,delete:!0}:t))});return}setTimeout(()=>{Ch.flushSync(()=>{S(t=>{let n=t.findIndex(t=>t.id===e.id);return n===-1?[e,...t]:[...t.slice(0,n),{...t[n],...e},...t.slice(n+1)]})})})}),[x]),I.useEffect(()=>{if(d!==`system`){M(d);return}if(d===`system`&&(window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).matches?M(`dark`):M(`light`)),typeof window>`u`)return;let e=window.matchMedia(`(prefers-color-scheme: dark)`);try{e.addEventListener(`change`,({matches:e})=>{M(e?`dark`:`light`)})}catch{e.addListener(({matches:e})=>{try{M(e?`dark`:`light`)}catch(e){console.error(e)}})}},[d]),I.useEffect(()=>{x.length<=1&&O(!1)},[x]),I.useEffect(()=>{let e=e=>{if(a.every(t=>e[t]||e.code===t)){var t;O(!0),(t=ee.current)==null||t.focus()}e.code===`Escape`&&(document.activeElement===ee.current||ee.current?.contains(document.activeElement))&&O(!1)};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[a]),I.useEffect(()=>{if(ee.current)return()=>{P.current&&(P.current.focus({preventScroll:!0}),P.current=null,te.current=!1)}},[ee.current]),I.createElement(`section`,{ref:t,"aria-label":`${b} ${N}`,tabIndex:-1,"aria-live":`polite`,"aria-relevant":`additions text`,"aria-atomic":`false`,suppressHydrationWarning:!0},w.map((t,n)=>{let[i,a]=t.split(`-`);return C.length?I.createElement(`ol`,{key:t,dir:_===`auto`?Wh():_,tabIndex:-1,ref:ee,className:c,"data-sonner-toaster":!0,"data-sonner-theme":j,"data-y-position":i,"data-x-position":a,style:{"--front-toast-height":`${T[0]?.height||0}px`,"--width":`356px`,"--gap":`${v}px`,...m,...Gh(l,u)},onBlur:e=>{te.current&&!e.currentTarget.contains(e.relatedTarget)&&(te.current=!1,P.current&&=(P.current.focus({preventScroll:!0}),null))},onFocus:e=>{e.target instanceof HTMLElement&&e.target.dataset.dismissible===`false`||te.current||(te.current=!0,P.current=e.relatedTarget)},onMouseEnter:()=>O(!0),onMouseMove:()=>O(!0),onMouseLeave:()=>{k||O(!1)},onDragEnd:()=>O(!1),onPointerDown:e=>{e.target instanceof HTMLElement&&e.target.dataset.dismissible===`false`||A(!0)},onPointerUp:()=>A(!1)},C.filter(e=>!e.position&&n===0||e.position===t).map((n,i)=>I.createElement(Uh,{key:n.id,icons:y,index:i,toast:n,defaultRichColors:f,duration:g?.duration??p,className:g?.className,descriptionClassName:g?.descriptionClassName,invert:r,visibleToasts:h,closeButton:g?.closeButton??s,interacting:k,position:t,style:g?.style,unstyled:g?.unstyled,classNames:g?.classNames,cancelButtonStyle:g?.cancelButtonStyle,actionButtonStyle:g?.actionButtonStyle,closeButtonAriaLabel:g?.closeButtonAriaLabel,removeToast:ne,toasts:C.filter(e=>e.position==n.position),heights:T.filter(e=>e.position==n.position),setHeights:E,expandByDefault:o,gap:v,expanded:D,swipeDirections:e.swipeDirections}))):null}))}),qh=({...e})=>{let{resolvedTheme:t}=P(),n=Xh();return(0,z.jsx)(Kh,{theme:t,className:`toaster group`,icons:{success:(0,z.jsx)(T,{className:`size-4`}),info:(0,z.jsx)(yn,{className:`size-4`}),warning:(0,z.jsx)(Dn,{className:`size-4`}),error:(0,z.jsx)(Sn,{className:`size-4`}),loading:(0,z.jsx)(ae,{className:`size-4 animate-spin`})},style:{"--normal-bg":`var(--popover)`,"--normal-text":`var(--popover-foreground)`,"--normal-border":`var(--border)`,"--border-radius":`var(--radius)`},container:n,...e})},Jh=(0,I.createContext)(null),Yh=()=>(0,I.useContext)(Jh),Xh=Yh,Zh=`inspector-inspection-items`;function Qh(){let[e,t]=(0,I.useState)(()=>{try{let e=localStorage.getItem(Zh);return e?JSON.parse(e):[]}catch{return[]}});return(0,I.useEffect)(()=>{function e(e){let{plan:n,inspectionId:r}=e.detail;t(e=>e.map(e=>e.id===r?{...e,status:`in-progress`,progress:n}:e))}function n(e){let{status:n,result:r,inspectionId:i}=e.detail;t(e=>e.map(e=>e.id===i?{...e,status:n,result:r?.message||r,progress:void 0}:e))}function r(e){let{inspectionId:n}=e.detail;t(e=>e.filter(e=>e.id!==n))}return window.addEventListener(`plan-progress-reported`,e),window.addEventListener(`inspection-result-received`,n),window.addEventListener(`inspection-deleted`,r),()=>{window.removeEventListener(`plan-progress-reported`,e),window.removeEventListener(`inspection-result-received`,n),window.removeEventListener(`inspection-deleted`,r)}},[]),(0,I.useEffect)(()=>{try{localStorage.setItem(Zh,JSON.stringify(e))}catch{console.warn(`Failed to save inspections to localStorage`)}},[e]),{inspections:e,setInspections:t}}function $h(e,t){if(e.match(/^[a-z]+:\/\//i))return e;if(e.match(/^\/\//))return window.location.protocol+e;if(e.match(/^[a-z]+:/i))return e;let n=document.implementation.createHTMLDocument(),r=n.createElement(`base`),i=n.createElement(`a`);return n.head.appendChild(r),n.body.appendChild(i),t&&(r.href=t),i.href=e,i.href}const eg=(()=>{let e=0,t=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(e+=1,`u${t()}${e}`)})();function tg(e){let t=[];for(let n=0,r=e.length;n<r;n++)t.push(e[n]);return t}let ng=null;function rg(e={}){return ng||(e.includeStyleProperties?(ng=e.includeStyleProperties,ng):(ng=tg(window.getComputedStyle(document.documentElement)),ng))}function ig(e,t){let n=(e.ownerDocument.defaultView||window).getComputedStyle(e).getPropertyValue(t);return n?parseFloat(n.replace(`px`,``)):0}function ag(e){let t=ig(e,`border-left-width`),n=ig(e,`border-right-width`);return e.clientWidth+t+n}function og(e){let t=ig(e,`border-top-width`),n=ig(e,`border-bottom-width`);return e.clientHeight+t+n}function sg(e,t={}){return{width:t.width||ag(e),height:t.height||og(e)}}function cg(){let e,t;try{t=process}catch{}let n=t&&t.env?t.env.devicePixelRatio:null;return n&&(e=parseInt(n,10),Number.isNaN(e)&&(e=1)),e||window.devicePixelRatio||1}const lg=16384;function ug(e){(e.width>lg||e.height>lg)&&(e.width>lg&&e.height>lg?e.width>e.height?(e.height*=lg/e.width,e.width=lg):(e.width*=lg/e.height,e.height=lg):e.width>lg?(e.height*=lg/e.width,e.width=lg):(e.width*=lg/e.height,e.height=lg))}function dg(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>{r.decode().then(()=>{requestAnimationFrame(()=>t(r))})},r.onerror=n,r.crossOrigin=`anonymous`,r.decoding=`async`,r.src=e})}async function fg(e){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then(e=>`data:image/svg+xml;charset=utf-8,${e}`)}async function pg(e,t,n){let r=`http://www.w3.org/2000/svg`,i=document.createElementNS(r,`svg`),a=document.createElementNS(r,`foreignObject`);return i.setAttribute(`width`,`${t}`),i.setAttribute(`height`,`${n}`),i.setAttribute(`viewBox`,`0 0 ${t} ${n}`),a.setAttribute(`width`,`100%`),a.setAttribute(`height`,`100%`),a.setAttribute(`x`,`0`),a.setAttribute(`y`,`0`),a.setAttribute(`externalResourcesRequired`,`true`),i.appendChild(a),a.appendChild(e),fg(i)}const mg=(e,t)=>{if(e instanceof t)return!0;let n=Object.getPrototypeOf(e);return n===null?!1:n.constructor.name===t.name||mg(n,t)};function hg(e){let t=e.getPropertyValue(`content`);return`${e.cssText} content: '${t.replace(/'|"/g,``)}';`}function gg(e,t){return rg(t).map(t=>`${t}: ${e.getPropertyValue(t)}${e.getPropertyPriority(t)?` !important`:``};`).join(` `)}function _g(e,t,n,r){let i=`.${e}:${t}`,a=n.cssText?hg(n):gg(n,r);return document.createTextNode(`${i}{${a}}`)}function vg(e,t,n,r){let i=window.getComputedStyle(e,n),a=i.getPropertyValue(`content`);if(a===``||a===`none`)return;let o=eg();try{t.className=`${t.className} ${o}`}catch{return}let s=document.createElement(`style`);s.appendChild(_g(o,n,i,r)),t.appendChild(s)}function yg(e,t,n){vg(e,t,`:before`,n),vg(e,t,`:after`,n)}const bg=`application/font-woff`,xg=`image/jpeg`,Sg={woff:bg,woff2:bg,ttf:`application/font-truetype`,eot:`application/vnd.ms-fontobject`,png:`image/png`,jpg:xg,jpeg:xg,gif:`image/gif`,tiff:`image/tiff`,svg:`image/svg+xml`,webp:`image/webp`};function Cg(e){let t=/\.([^./]*?)$/g.exec(e);return t?t[1]:``}function wg(e){return Sg[Cg(e).toLowerCase()]||``}function Tg(e){return e.split(/,/)[1]}function Eg(e){return e.search(/^(data:)/)!==-1}function Dg(e,t){return`data:${t};base64,${e}`}async function Og(e,t,n){let r=await fetch(e,t);if(r.status===404)throw Error(`Resource "${r.url}" not found`);let i=await r.blob();return new Promise((e,t)=>{let a=new FileReader;a.onerror=t,a.onloadend=()=>{try{e(n({res:r,result:a.result}))}catch(e){t(e)}},a.readAsDataURL(i)})}const kg={};function Ag(e,t,n){let r=e.replace(/\?.*/,``);return n&&(r=e),/ttf|otf|eot|woff2?/i.test(r)&&(r=r.replace(/.*\//,``)),t?`[${t}]${r}`:r}async function jg(e,t,n){let r=Ag(e,t,n.includeQueryParams);if(kg[r]!=null)return kg[r];n.cacheBust&&(e+=(/\?/.test(e)?`&`:`?`)+new Date().getTime());let i;try{i=Dg(await Og(e,n.fetchRequestInit,({res:e,result:n})=>(t||=e.headers.get(`Content-Type`)||``,Tg(n))),t)}catch(t){i=n.imagePlaceholder||``;let r=`Failed to fetch resource: ${e}`;t&&(r=typeof t==`string`?t:t.message),r&&console.warn(r)}return kg[r]=i,i}async function Mg(e){let t=e.toDataURL();return t===`data:,`?e.cloneNode(!1):dg(t)}async function Ng(e,t){if(e.currentSrc){let t=document.createElement(`canvas`),n=t.getContext(`2d`);return t.width=e.clientWidth,t.height=e.clientHeight,n?.drawImage(e,0,0,t.width,t.height),dg(t.toDataURL())}let n=e.poster;return dg(await jg(n,wg(n),t))}async function Pg(e,t){try{if(e?.contentDocument?.body)return await Wg(e.contentDocument.body,t,!0)}catch{}return e.cloneNode(!1)}async function Fg(e,t){return mg(e,HTMLCanvasElement)?Mg(e):mg(e,HTMLVideoElement)?Ng(e,t):mg(e,HTMLIFrameElement)?Pg(e,t):e.cloneNode(Lg(e))}const Ig=e=>e.tagName!=null&&e.tagName.toUpperCase()===`SLOT`,Lg=e=>e.tagName!=null&&e.tagName.toUpperCase()===`SVG`;async function Rg(e,t,n){if(Lg(t))return t;let r=[];return r=Ig(e)&&e.assignedNodes?tg(e.assignedNodes()):mg(e,HTMLIFrameElement)&&e.contentDocument?.body?tg(e.contentDocument.body.childNodes):tg((e.shadowRoot??e).childNodes),r.length===0||mg(e,HTMLVideoElement)||await r.reduce((e,r)=>e.then(()=>Wg(r,n)).then(e=>{e&&t.appendChild(e)}),Promise.resolve()),t}function zg(e,t,n){let r=t.style;if(!r)return;let i=window.getComputedStyle(e);i.cssText?(r.cssText=i.cssText,r.transformOrigin=i.transformOrigin):rg(n).forEach(n=>{let a=i.getPropertyValue(n);n===`font-size`&&a.endsWith(`px`)&&(a=`${Math.floor(parseFloat(a.substring(0,a.length-2)))-.1}px`),mg(e,HTMLIFrameElement)&&n===`display`&&a===`inline`&&(a=`block`),n===`d`&&t.getAttribute(`d`)&&(a=`path(${t.getAttribute(`d`)})`),r.setProperty(n,a,i.getPropertyPriority(n))})}function Bg(e,t){mg(e,HTMLTextAreaElement)&&(t.innerHTML=e.value),mg(e,HTMLInputElement)&&t.setAttribute(`value`,e.value)}function Vg(e,t){if(mg(e,HTMLSelectElement)){let n=t,r=Array.from(n.children).find(t=>e.value===t.getAttribute(`value`));r&&r.setAttribute(`selected`,``)}}function Hg(e,t,n){return mg(t,Element)&&(zg(e,t,n),yg(e,t,n),Bg(e,t),Vg(e,t)),t}async function Ug(e,t){let n=e.querySelectorAll?e.querySelectorAll(`use`):[];if(n.length===0)return e;let r={};for(let i=0;i<n.length;i++){let a=n[i].getAttribute(`xlink:href`);if(a){let n=e.querySelector(a),i=document.querySelector(a);!n&&i&&!r[a]&&(r[a]=await Wg(i,t,!0))}}let i=Object.values(r);if(i.length){let t=`http://www.w3.org/1999/xhtml`,n=document.createElementNS(t,`svg`);n.setAttribute(`xmlns`,t),n.style.position=`absolute`,n.style.width=`0`,n.style.height=`0`,n.style.overflow=`hidden`,n.style.display=`none`;let r=document.createElementNS(t,`defs`);n.appendChild(r);for(let e=0;e<i.length;e++)r.appendChild(i[e]);e.appendChild(n)}return e}async function Wg(e,t,n){return!n&&t.filter&&!t.filter(e)?null:Promise.resolve(e).then(e=>Fg(e,t)).then(n=>Rg(e,n,t)).then(n=>Hg(e,n,t)).then(e=>Ug(e,t))}const Gg=/url\((['"]?)([^'"]+?)\1\)/g,Kg=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,qg=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function Jg(e){let t=e.replace(/([.*+?^${}()|\[\]\/\\])/g,`\\$1`);return RegExp(`(url\\(['"]?)(${t})(['"]?\\))`,`g`)}function Yg(e){let t=[];return e.replace(Gg,(e,n,r)=>(t.push(r),e)),t.filter(e=>!Eg(e))}async function Xg(e,t,n,r,i){try{let a=n?$h(t,n):t,o=wg(t),s;return s=i?Dg(await i(a),o):await jg(a,o,r),e.replace(Jg(t),`$1${s}$3`)}catch{}return e}function Zg(e,{preferredFontFormat:t}){return t?e.replace(qg,e=>{for(;;){let[n,,r]=Kg.exec(e)||[];if(!r)return``;if(r===t)return`src: ${n};`}}):e}function Qg(e){return e.search(Gg)!==-1}async function $g(e,t,n){if(!Qg(e))return e;let r=Zg(e,n);return Yg(r).reduce((e,r)=>e.then(e=>Xg(e,r,t,n)),Promise.resolve(r))}async function e_(e,t,n){let r=t.style?.getPropertyValue(e);if(r){let i=await $g(r,null,n);return t.style.setProperty(e,i,t.style.getPropertyPriority(e)),!0}return!1}async function t_(e,t){await e_(`background`,e,t)||await e_(`background-image`,e,t),await e_(`mask`,e,t)||await e_(`-webkit-mask`,e,t)||await e_(`mask-image`,e,t)||await e_(`-webkit-mask-image`,e,t)}async function n_(e,t){let n=mg(e,HTMLImageElement);if(!(n&&!Eg(e.src))&&!(mg(e,SVGImageElement)&&!Eg(e.href.baseVal)))return;let r=n?e.src:e.href.baseVal,i=await jg(r,wg(r),t);await new Promise((r,a)=>{e.onload=r,e.onerror=t.onImageErrorHandler?(...e)=>{try{r(t.onImageErrorHandler(...e))}catch(e){a(e)}}:a;let o=e;o.decode&&=r,o.loading===`lazy`&&(o.loading=`eager`),n?(e.srcset=``,e.src=i):e.href.baseVal=i})}async function r_(e,t){let n=tg(e.childNodes).map(e=>i_(e,t));await Promise.all(n).then(()=>e)}async function i_(e,t){mg(e,Element)&&(await t_(e,t),await n_(e,t),await r_(e,t))}function a_(e,t){let{style:n}=e;t.backgroundColor&&(n.backgroundColor=t.backgroundColor),t.width&&(n.width=`${t.width}px`),t.height&&(n.height=`${t.height}px`);let r=t.style;return r!=null&&Object.keys(r).forEach(e=>{n[e]=r[e]}),e}const o_={};async function s_(e){let t=o_[e];return t??(t={url:e,cssText:await(await fetch(e)).text()},o_[e]=t,t)}async function c_(e,t){let n=e.cssText,r=/url\(["']?([^"')]+)["']?\)/g,i=(n.match(/url\([^)]+\)/g)||[]).map(async i=>{let a=i.replace(r,`$1`);return a.startsWith(`https://`)||(a=new URL(a,e.url).href),Og(a,t.fetchRequestInit,({result:e})=>(n=n.replace(i,`url(${e})`),[i,e]))});return Promise.all(i).then(()=>n)}function l_(e){if(e==null)return[];let t=[],n=e.replace(/(\/\*[\s\S]*?\*\/)/gi,``),r=RegExp(`((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})`,`gi`);for(;;){let e=r.exec(n);if(e===null)break;t.push(e[0])}n=n.replace(r,``);let i=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,a=RegExp(`((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})`,`gi`);for(;;){let e=i.exec(n);if(e===null){if(e=a.exec(n),e===null)break;i.lastIndex=a.lastIndex}else a.lastIndex=i.lastIndex;t.push(e[0])}return t}async function u_(e,t){let n=[],r=[];return e.forEach(n=>{if(`cssRules`in n)try{tg(n.cssRules||[]).forEach((e,i)=>{if(e.type===CSSRule.IMPORT_RULE){let a=i+1,o=e.href,s=s_(o).then(e=>c_(e,t)).then(e=>l_(e).forEach(e=>{try{n.insertRule(e,e.startsWith(`@import`)?a+=1:n.cssRules.length)}catch(t){console.error(`Error inserting rule from remote css`,{rule:e,error:t})}})).catch(e=>{console.error(`Error loading remote css`,e.toString())});r.push(s)}})}catch(i){let a=e.find(e=>e.href==null)||document.styleSheets[0];n.href!=null&&r.push(s_(n.href).then(e=>c_(e,t)).then(e=>l_(e).forEach(e=>{a.insertRule(e,a.cssRules.length)})).catch(e=>{console.error(`Error loading remote stylesheet`,e)})),console.error(`Error inlining remote css file`,i)}}),Promise.all(r).then(()=>(e.forEach(e=>{if(`cssRules`in e)try{tg(e.cssRules||[]).forEach(e=>{n.push(e)})}catch(t){console.error(`Error while reading CSS rules from ${e.href}`,t)}}),n))}function d_(e){return e.filter(e=>e.type===CSSRule.FONT_FACE_RULE).filter(e=>Qg(e.style.getPropertyValue(`src`)))}async function f_(e,t){if(e.ownerDocument==null)throw Error(`Provided element is not within a Document`);return d_(await u_(tg(e.ownerDocument.styleSheets),t))}function p_(e){return e.trim().replace(/["']/g,``)}function m_(e){let t=new Set;function n(e){(e.style.fontFamily||getComputedStyle(e).fontFamily).split(`,`).forEach(e=>{t.add(p_(e))}),Array.from(e.children).forEach(e=>{e instanceof HTMLElement&&n(e)})}return n(e),t}async function h_(e,t){let n=await f_(e,t),r=m_(e);return(await Promise.all(n.filter(e=>r.has(p_(e.style.fontFamily))).map(e=>{let n=e.parentStyleSheet?e.parentStyleSheet.href:null;return $g(e.cssText,n,t)}))).join(`
`)}async function g_(e,t){let n=t.fontEmbedCSS==null?t.skipFonts?null:await h_(e,t):t.fontEmbedCSS;if(n){let t=document.createElement(`style`),r=document.createTextNode(n);t.appendChild(r),e.firstChild?e.insertBefore(t,e.firstChild):e.appendChild(t)}}async function __(e,t={}){let{width:n,height:r}=sg(e,t),i=await Wg(e,t,!0);return await g_(i,t),await i_(i,t),a_(i,t),await pg(i,n,r)}async function v_(e,t={}){let{width:n,height:r}=sg(e,t),i=await dg(await __(e,t)),a=document.createElement(`canvas`),o=a.getContext(`2d`),s=t.pixelRatio||cg(),c=t.canvasWidth||n,l=t.canvasHeight||r;return a.width=c*s,a.height=l*s,t.skipAutoScale||ug(a),a.style.width=`${c}`,a.style.height=`${l}`,t.backgroundColor&&(o.fillStyle=t.backgroundColor,o.fillRect(0,0,a.width,a.height)),o.drawImage(i,0,0,a.width,a.height),a}async function y_(e,t={}){return(await v_(e,t)).toDataURL()}async function b_(e,t={}){let{quality:n=.95,maxWidth:r=1200,maxHeight:i=800}=t;try{let t=e.getBoundingClientRect();return await y_(e,{quality:n,pixelRatio:Math.min(1,r/t.width,i/t.height)*(window.devicePixelRatio||1),cacheBust:!0,width:t.width,height:t.height,style:{margin:`0`,transform:`none`},filter:e=>{if(e instanceof HTMLElement){let t=e.tagName.toLowerCase();if(t===`iframe`||t===`script`||t===`link`||t===`video`||t===`audio`||t===`object`||t===`embed`)return!1;if(t===`img`){let t=e;if(!t.complete||t.naturalWidth===0)return!1}}return!0},fontEmbedCSS:``})}catch(e){return console.error(`[screenshot] Failed to capture element:`,e),``}}const x_=`inspector-inspection-items`;function S_(){try{let e=localStorage.getItem(x_);return e?JSON.parse(e):[]}catch{return[]}}function C_(e){try{localStorage.setItem(x_,JSON.stringify(e))}catch{console.warn(`Failed to save inspection items`)}}var w_=e(ie());const T_={inspections:{text:`text-fuchsia-500 dark:text-fuchsia-400`,gradient:`from-violet-600 to-fuchsia-500`,badge:`bg-fuchsia-500`},console:{text:`text-emerald-500 dark:text-emerald-400`,gradient:`from-emerald-500 to-teal-500`,badge:`bg-emerald-500`},network:{text:`text-blue-500 dark:text-blue-400`,gradient:`from-blue-500 to-cyan-500`,badge:`bg-blue-500`},page:{text:`text-cyan-500 dark:text-cyan-400`,gradient:`from-cyan-500 to-sky-500`,badge:`bg-cyan-500`},stdio:{text:`text-violet-500 dark:text-violet-400`,gradient:`from-violet-500 to-purple-500`,badge:`bg-violet-500`}},E_=({request:e,client:t,isClientReady:n})=>{let[r,i]=(0,I.useState)(!1),[a,o]=(0,I.useState)(null),[s,c]=(0,I.useState)(!1),l=async()=>{if(a===null){c(!0);try{let r=typeof window<`u`?window.__DOM_INSPECTOR_CONFIG__:null;if(r&&!r.disableChrome&&r.isAutomated&&t&&n)try{o(((await t.callTool({name:`chrome_devtools`,arguments:{useTool:`chrome_get_network_request`,hasDefinitions:[`chrome_get_network_request`],chrome_get_network_request:{reqid:e.reqid}}}))?.content)?.map(e=>e.text).join(`
`)||`No details`);return}catch{console.log(`[ContextDialog] Chrome DevTools failed, using local storage`)}let i=r?(()=>{let e=r.baseUrl||`http://${r.host}:${r.port}${r.base||`/`}`;return e.endsWith(`/`)?e.slice(0,-1):e})():``,a=await fetch(`${i}/__inspector__/request-details/${e.reqid}`);if(a.ok)o(await a.text());else throw Error(`Failed to fetch: ${a.status} ${a.statusText}`)}catch(e){o(`Failed to fetch details: ${e instanceof Error?e.message:String(e)}`)}finally{c(!1)}}};return(0,z.jsxs)(`div`,{className:`rounded-md bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/[0.1] transition-colors overflow-hidden`,children:[(0,z.jsxs)(`button`,{onClick:()=>{r||l(),i(!r)},className:`w-full p-3 text-left flex items-start gap-3`,children:[(0,z.jsx)(`span`,{className:`mt-0.5 flex-shrink-0`,children:r?(0,z.jsx)(g,{className:`w-4 h-4 text-neutral-500 dark:text-neutral-400`}):(0,z.jsx)(fn,{className:`w-4 h-4 text-neutral-500 dark:text-neutral-400`})}),(0,z.jsx)(`span`,{className:b(`px-2 py-0.5 text-xs font-medium rounded flex-shrink-0`,(e=>{switch(e.toUpperCase()){case`GET`:return`bg-green-500/20 text-green-600`;case`POST`:return`bg-blue-500/20 text-blue-500`;case`PUT`:return`bg-yellow-500/20 text-yellow-600`;case`DELETE`:return`bg-red-500/20 text-red-500`;case`PATCH`:return`bg-purple-500/20 text-purple-500`;default:return`bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400`}})(e.method)),children:e.method}),(0,z.jsxs)(`div`,{className:`flex-1 min-w-0 overflow-hidden`,children:[(0,z.jsx)(`div`,{className:`text-sm text-neutral-900 dark:text-neutral-50 font-mono truncate`,title:e.url,children:e.url}),(0,z.jsxs)(`div`,{className:b(`text-xs mt-1`,(e=>{let t=e.match(/\b(\d{3})\b/),n=t?parseInt(t[1]):0;return n>=200&&n<300?`text-green-600`:n>=300&&n<400?`text-yellow-600`:n>=400?`text-red-500`:e.includes(`success`)?`text-green-600`:e.includes(`failed`)?`text-red-500`:e.includes(`pending`)?`text-yellow-600`:`text-neutral-500 dark:text-neutral-400`})(e.status)),children:[`Status: `,e.status]})]})]}),r&&(0,z.jsx)(`div`,{className:`px-3 pb-3 pl-10`,children:(()=>{if(s)return(0,z.jsxs)(`div`,{className:`flex items-center gap-2 py-2 text-sm text-neutral-500 dark:text-neutral-400`,children:[(0,z.jsx)(ae,{className:`w-4 h-4 animate-spin`}),`Loading...`]});if(!a)return null;let e=a,t=null;try{let n=a.split(`
`).find(e=>e.trim().startsWith(`//# sourceMappingURL=data:application/json;base64,`));if(n){let r=n.trim().substring(50),i=atob(r);t=JSON.parse(i),e=`**Source Map (Decoded):**
\`\`\`json
${JSON.stringify(t,null,2)}
\`\`\`

**Raw Content:**
\`\`\`
${a}
\`\`\`
`}}catch{}return!t&&!a.includes(`###`)&&(a.trim().startsWith(`{`)||a.trim().startsWith(`[`))&&(e=`\`\`\`json\n${a}\n\`\`\``),(0,z.jsx)(`div`,{className:`text-xs text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 p-3 rounded overflow-x-auto max-h-[400px] overflow-y-auto`,children:(0,z.jsx)(j,{children:e})})})()})]})},D_=({open:e,onOpenChange:t,inspectionItems:n,onRemoveInspection:r,client:i,isClientReady:a})=>{let[o,s]=(0,I.useState)(`inspections`),[c,l]=(0,I.useState)(``),[u,f]=(0,I.useState)(``),[h,g]=(0,I.useState)(``),[v,y]=(0,I.useState)(!1),[C,w]=(0,I.useState)(new Set),[T,E]=(0,I.useState)(new Set),[D,O]=(0,I.useState)(new Set),k=Vn(),{consoleMessages:j,networkRequests:M,stdioMessages:ee,loading:N,error:P,refresh:te}=Ln(i,a),ne=c?j.filter(e=>e.text.toLowerCase().includes(c.toLowerCase())||e.level.toLowerCase().includes(c.toLowerCase())):j,re=u?M.filter(e=>e.url.toLowerCase().includes(u.toLowerCase())||e.method.toLowerCase().includes(u.toLowerCase())):M,ie=h?ee.filter(e=>e.data.toLowerCase().includes(h.toLowerCase())||e.stream.toLowerCase().includes(h.toLowerCase())):ee,F=(e,t)=>{t(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},oe=async()=>{let e=[],t=C.size>0?j.filter(e=>C.has(e.msgid)):j;t.length>0&&e.push(`## Console (${t.length})\n${t.map(e=>`[${e.level}] ${e.text}`).join(`
`)}`);let n=T.size>0?M.filter(e=>T.has(e.reqid)):M;n.length>0&&e.push(`## Network (${n.length})\n${n.map(e=>`${e.method} ${e.url} (${e.status})`).join(`
`)}`);let r=D.size>0?ee.filter(e=>D.has(e.stdioid)):ee;r.length>0&&e.push(`## Terminal (${r.length})\n${r.map(e=>`[${e.stream}] ${e.data}`).join(`
`)}`),k&&e.push(`## Page\nURL: ${k.url}\nTitle: ${k.title}\nViewport: ${k.viewport.width} × ${k.viewport.height}\nLanguage: ${k.language}`);let i=e.join(`

`);i&&(await navigator.clipboard.writeText(i),y(!0),setTimeout(()=>y(!1),2e3))},se=()=>C.size+T.size+D.size;(0,I.useEffect)(()=>{e&&te()},[e,te]);let ce=[{id:`inspections`,label:`Inspections`,count:n.length},{id:`console`,label:`Console`,count:j.length},{id:`network`,label:`Network`,count:M.length},{id:`page`,label:`Page`},{id:`stdio`,label:`Terminal`,count:ee.length}];return(0,z.jsx)(m,{open:e,onOpenChange:t,children:(0,z.jsxs)(_,{className:`w-[70vw] max-w-[70vw] h-[80vh] max-h-[80vh] flex flex-col`,onClose:()=>t(!1),children:[(0,z.jsx)(x,{className:`flex-shrink-0 pr-8`,children:(0,z.jsxs)(`div`,{className:`flex items-center justify-between gap-4`,children:[(0,z.jsx)(d,{children:`Full Page Context`}),(0,z.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,z.jsxs)(`button`,{type:`button`,onClick:oe,disabled:N,className:b(`flex items-center gap-1.5 px-3 h-8 text-xs font-semibold rounded-full transition-all disabled:opacity-50 text-white shadow-sm`,v?`bg-emerald-500 shadow-emerald-500/30`:`bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 shadow-fuchsia-500/30 hover:shadow-md hover:shadow-fuchsia-500/40 hover:scale-[1.03]`),title:se()>0?`Copy ${se()} selected items`:`Copy all context`,children:[v?(0,z.jsx)(dn,{className:`w-3.5 h-3.5`}):(0,z.jsx)(gn,{className:`w-3.5 h-3.5`}),(0,z.jsx)(`span`,{children:se()>0?`Copy (${se()})`:`Copy All`})]}),(0,z.jsx)(`button`,{type:`button`,onClick:()=>te(),disabled:N,className:`flex items-center justify-center w-8 h-8 text-sm text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-white/15 bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 hover:text-neutral-900 dark:hover:text-white rounded-md transition-colors disabled:opacity-50`,title:`Refresh Data`,children:(0,z.jsx)(p,{className:b(`w-3.5 h-3.5`,N&&`animate-spin`)})})]})]})}),(0,z.jsx)(`div`,{className:`flex gap-1 border-b border-neutral-200 dark:border-neutral-700 flex-shrink-0`,children:ce.map(e=>{let t=T_[e.id];return(0,z.jsxs)(`button`,{onClick:()=>s(e.id),className:b(`px-4 py-2 text-sm font-medium transition-colors relative`,o===e.id?t.text:`text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50`),children:[e.label,e.count!==void 0&&e.count>0&&(0,z.jsx)(`span`,{className:b(`ml-2 px-1.5 py-0.5 text-xs font-medium text-white rounded-full`,t.badge),children:e.count}),o===e.id&&(0,z.jsx)(`div`,{className:b(`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r`,t.gradient)})]},e.id)})}),(0,z.jsxs)(`div`,{className:`flex-1 overflow-auto min-h-0`,children:[P&&(0,z.jsxs)(`div`,{className:`flex items-center gap-2 p-4 text-sm text-red-600 dark:text-red-400 bg-red-500/10 rounded-md m-4`,children:[(0,z.jsx)(mn,{className:`w-4 h-4 flex-shrink-0`}),(0,z.jsx)(`span`,{className:`break-all`,children:P})]}),o===`inspections`&&(0,z.jsx)(`div`,{className:`h-full overflow-auto`,children:n.length===0?(0,z.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-12 text-neutral-500 dark:text-neutral-400`,children:[(0,z.jsx)(`p`,{className:`text-sm`,children:`No inspections`}),(0,z.jsx)(`p`,{className:`text-xs mt-1`,children:`Use ⌥I to inspect elements`})]}):(0,z.jsx)(A,{items:n,onRemove:r})}),o===`console`&&(0,z.jsxs)(`div`,{className:`p-4 space-y-2 h-full overflow-auto`,children:[(0,z.jsxs)(`div`,{className:`relative mb-2`,children:[(0,z.jsx)(wn,{className:`absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400`}),(0,z.jsx)(`input`,{type:`text`,value:c,onChange:e=>l(e.target.value),placeholder:`Filter logs...`,className:`w-full pl-7 pr-7 py-1.5 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-ring`}),c&&(0,z.jsx)(`button`,{type:`button`,onClick:()=>l(``),className:`absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50`,children:(0,z.jsx)(S,{className:`w-3.5 h-3.5`})})]}),N&&(0,z.jsx)(`div`,{className:`flex items-center justify-center py-12`,children:(0,z.jsx)(ae,{className:`w-6 h-6 animate-spin text-neutral-500 dark:text-neutral-400`})}),!N&&ne.length===0&&(0,z.jsx)(`div`,{className:`flex flex-col items-center justify-center py-12 text-neutral-500 dark:text-neutral-400`,children:(0,z.jsx)(`p`,{className:`text-sm`,children:c?`No matching logs`:`No console logs`})}),!N&&ne.map(e=>(0,z.jsxs)(`label`,{className:`flex items-start gap-2 p-3 rounded-md bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/[0.1] transition-colors cursor-pointer`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:C.has(e.msgid),onChange:()=>F(e.msgid,w),className:`mt-0.5 rounded border-neutral-200 dark:border-neutral-700`}),(0,z.jsx)(`span`,{className:b(`px-2 py-0.5 text-xs font-medium rounded flex-shrink-0`,e.level===`error`&&`bg-red-500/20 text-red-500`,e.level===`warn`&&`bg-yellow-500/20 text-yellow-600`,e.level===`info`&&`bg-blue-500/20 text-blue-500`,e.level===`log`&&`bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400`,e.level===`debug`&&`bg-purple-500/20 text-purple-500`),children:e.level}),(0,z.jsx)(`span`,{className:`text-sm text-neutral-900 dark:text-neutral-100 flex-1 font-mono break-all overflow-hidden`,children:e.text})]},e.msgid))]}),o===`network`&&(0,z.jsxs)(`div`,{className:`p-4 space-y-2 h-full overflow-auto`,children:[(0,z.jsxs)(`div`,{className:`relative mb-2`,children:[(0,z.jsx)(wn,{className:`absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400`}),(0,z.jsx)(`input`,{type:`text`,value:u,onChange:e=>f(e.target.value),placeholder:`Filter requests...`,className:`w-full pl-7 pr-7 py-1.5 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-ring`}),u&&(0,z.jsx)(`button`,{type:`button`,onClick:()=>f(``),className:`absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50`,children:(0,z.jsx)(S,{className:`w-3.5 h-3.5`})})]}),N&&(0,z.jsx)(`div`,{className:`flex items-center justify-center py-12`,children:(0,z.jsx)(ae,{className:`w-6 h-6 animate-spin text-neutral-500 dark:text-neutral-400`})}),!N&&re.length===0&&(0,z.jsx)(`div`,{className:`flex flex-col items-center justify-center py-12 text-neutral-500 dark:text-neutral-400`,children:(0,z.jsx)(`p`,{className:`text-sm`,children:u?`No matching requests`:`No network requests`})}),!N&&re.map(e=>(0,z.jsxs)(`div`,{className:`flex items-start gap-2`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:T.has(e.reqid),onChange:()=>F(e.reqid,E),className:`mt-3 rounded border-neutral-200 dark:border-neutral-700 flex-shrink-0`}),(0,z.jsx)(`div`,{className:`flex-1 min-w-0`,children:(0,z.jsx)(E_,{request:e,client:i,isClientReady:a})})]},e.reqid))]}),o===`stdio`&&(0,z.jsxs)(`div`,{className:`p-4 space-y-2 h-full overflow-auto`,children:[(0,z.jsxs)(`div`,{className:`relative mb-2`,children:[(0,z.jsx)(wn,{className:`absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400`}),(0,z.jsx)(`input`,{type:`text`,value:h,onChange:e=>g(e.target.value),placeholder:`Filter terminal...`,className:`w-full pl-7 pr-7 py-1.5 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-ring`}),h&&(0,z.jsx)(`button`,{type:`button`,onClick:()=>g(``),className:`absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50`,children:(0,z.jsx)(S,{className:`w-3.5 h-3.5`})})]}),N&&(0,z.jsx)(`div`,{className:`flex items-center justify-center py-12`,children:(0,z.jsx)(ae,{className:`w-6 h-6 animate-spin text-neutral-500 dark:text-neutral-400`})}),!N&&ie.length===0&&(0,z.jsx)(`div`,{className:`flex flex-col items-center justify-center py-12 text-neutral-500 dark:text-neutral-400`,children:(0,z.jsx)(`p`,{className:`text-sm`,children:h?`No matching messages`:`No terminal messages`})}),!N&&ie.map(e=>(0,z.jsxs)(`label`,{className:`flex items-start gap-2 p-3 rounded-md bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/[0.1] transition-colors cursor-pointer`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:D.has(e.stdioid),onChange:()=>F(e.stdioid,O),className:`mt-0.5 rounded border-neutral-200 dark:border-neutral-700`}),(0,z.jsx)(`span`,{className:b(`px-2 py-0.5 text-xs font-medium rounded flex-shrink-0 uppercase`,e.stream===`stderr`?`bg-red-500/20 text-red-500`:`bg-blue-500/20 text-blue-500`),children:e.stream}),(0,z.jsx)(`pre`,{className:`text-sm text-neutral-900 dark:text-neutral-100 flex-1 font-mono break-all overflow-hidden whitespace-pre-wrap`,children:e.data})]},e.stdioid))]}),o===`page`&&(0,z.jsx)(`div`,{className:`p-4 h-full overflow-auto`,children:k?(0,z.jsx)(`div`,{className:`space-y-4`,children:(0,z.jsxs)(`div`,{className:`flex items-start gap-3 p-3 rounded-md bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10`,children:[(0,z.jsx)(vn,{className:`w-5 h-5 text-primary mt-0.5 flex-shrink-0`}),(0,z.jsxs)(`div`,{className:`flex-1 min-w-0 space-y-3`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`div`,{className:`text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1`,children:`URL`}),(0,z.jsx)(`div`,{className:`text-sm text-neutral-900 dark:text-neutral-50 font-mono break-all`,children:k.url})]}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`div`,{className:`text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1`,children:`Title`}),(0,z.jsx)(`div`,{className:`text-sm text-neutral-900 dark:text-neutral-50`,children:k.title})]}),(0,z.jsxs)(`div`,{className:`grid grid-cols-2 gap-3`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`div`,{className:`text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1`,children:`Viewport`}),(0,z.jsxs)(`div`,{className:`text-sm text-neutral-900 dark:text-neutral-50`,children:[k.viewport.width,` × `,k.viewport.height]})]}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`div`,{className:`text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1`,children:`Language`}),(0,z.jsx)(`div`,{className:`text-sm text-neutral-900 dark:text-neutral-50`,children:k.language})]})]})]})]})}):(0,z.jsx)(`div`,{className:`flex items-center justify-center py-12`,children:(0,z.jsx)(ae,{className:`w-6 h-6 animate-spin text-neutral-500 dark:text-neutral-400`})})})]})]})})};function O_({initialOffset:e={x:0,y:0}}={}){let t=(0,I.useRef)(null),[n,r]=(0,I.useState)(!1),i=(0,I.useRef)(e),a=(0,I.useRef)({x:0,y:0}),o=(0,I.useRef)({x:0,y:0}),s=(0,I.useCallback)(()=>{if(t.current){let{x:e,y:n}=i.current;t.current.style.transform=`translate3d(calc(-50% + ${e}px), ${n}px, 0)`}},[]),c=(0,I.useCallback)(e=>{e.target.closest(`button, input, a, [data-no-drag]`)||(e.preventDefault(),r(!0),a.current={x:e.clientX,y:e.clientY},o.current={...i.current})},[]);return(0,I.useEffect)(()=>{let e=e=>{if(!n)return;let t=e.clientX-a.current.x,r=e.clientY-a.current.y;i.current={x:o.current.x+t,y:o.current.y+r},s()},t=()=>{r(!1)};return n&&(window.addEventListener(`mousemove`,e,{passive:!0}),window.addEventListener(`mouseup`,t)),()=>{window.removeEventListener(`mousemove`,e),window.removeEventListener(`mouseup`,t)}},[n,s]),(0,I.useEffect)(()=>{s()},[s]),{elementRef:t,isDragging:n,handleMouseDown:c}}const k_=({prompts:e,onSelect:t,visible:n})=>!n||e.length===0?null:(0,z.jsx)(`div`,{className:b(`absolute bottom-full left-0 pb-3 ml-1 flex flex-wrap gap-2 max-w-[480px]`,`origin-bottom-left`),children:e.map((e,n)=>(0,z.jsx)(`button`,{onClick:n=>{n.stopPropagation(),t(e)},style:{animationDelay:`${n*50}ms`,opacity:0,animation:`prompt-fade-in 0.3s ease-out ${n*50}ms forwards`},className:b(`flex items-center gap-1.5 px-3 py-1.5 rounded-full`,`bg-muted/90 backdrop-blur-md border border-border shadow-sm`,`text-xs font-medium text-foreground`,`hover:bg-accent hover:border-accent-foreground/20 hover:scale-105 active:scale-95`,`transition-all duration-200`),title:e.description||e.title||e.name,children:(0,z.jsx)(`span`,{children:e.title||e.name})},e.name))}),A_=({isActive:e,onToggleInspector:t,onSubmitAgent:n,onCancel:r,isAgentWorking:i,messages:a,status:o,inspectionCount:s=0,inspectionItems:c=[],onRemoveInspection:l=()=>{},toolsReady:p=!0,mcpClient:h=null,onAgentChange:g,selectionCount:v=0,onCapture:y=()=>{}})=>{let[S,w]=(0,I.useState)(!1),[D,A]=(0,I.useState)(``),[j,N]=(0,I.useState)(`none`),[P,te]=(0,I.useState)(!0),[re,ie]=(0,I.useState)(!1),{agent:F,setAgent:ae,isReady:ce}=oe(ee),[de,fe]=(0,I.useState)(se),[he,ge]=(0,I.useState)(!1),[_e,ve]=(0,I.useState)(null),[ye,be]=(0,I.useState)(!1),{prompts:xe}=ne(h||null);(0,I.useEffect)(()=>{k().then(e=>{fe(e)})},[]),(0,I.useEffect)(()=>{ce&&F&&g?.(F)},[F,ce,g]);let{uiState:Se,chatStatus:Ce,toolName:we,displayText:Te}=M(a,o,S),L=Ce===`submitted`||Ce===`streaming`,Ee=Se===`expanded`&&!L,De=a.length>0&&Ce!==`error`||L,[Oe,ke]=(0,I.useState)(null),Ae=(0,I.useRef)(null),je=(0,I.useRef)(!1),Me=e=>{let t=`${ue()}/api/acp/cleanup-session`,n=JSON.stringify({sessionId:e});try{if(navigator.sendBeacon){let e=new Blob([n],{type:`application/json`});navigator.sendBeacon(t,e);return}}catch{}fetch(t,{method:`POST`,headers:{"Content-Type":`application/json`},body:n,keepalive:!0}).catch(()=>{})};(0,I.useEffect)(()=>{if(!ce||!p)return;let e=!0,t=de.find(e=>e.name===F)||de[0]||se[0];return(async()=>{if(Ae.current){try{await fetch(`${ue()}/api/acp/cleanup-session`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({sessionId:Ae.current})})}catch(e){console.warn(`[InspectorBar] Failed to cleanup previous session:`,e)}Ae.current=null,e&&ke(null)}console.log(`[InspectorBar] Initializing session for ${t.name}...`);try{let n=await fetch(`${ue()}/api/acp/init-session`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({agent:t,envVars:{}})});if(!n.ok)throw Error(`Failed to init session`);let r=await n.json();e&&r.sessionId&&(console.log(`[InspectorBar] Session initialized: ${r.sessionId}`),ke(r.sessionId),Ae.current=r.sessionId,je.current=!1)}catch(e){console.error(`[InspectorBar] Failed to initialize session:`,e)}})(),()=>{e=!1}},[F,ce,p,de]),(0,I.useEffect)(()=>{let e=()=>{let e=Ae.current;!e||je.current||(je.current=!0,Me(e))};return window.addEventListener(`pagehide`,e),()=>{window.removeEventListener(`pagehide`,e)}},[]),(0,I.useEffect)(()=>()=>{let e=Ae.current;!e||je.current||(je.current=!0,console.log(`[InspectorBar] Cleaning up session on unmount: ${e}`),Me(e))},[]);let Ne=de.find(e=>e.name===F)||de[0]||se[0],{elementRef:Pe,isDragging:Fe,handleMouseDown:Ie}=O_(),[R,Le]=(0,I.useState)(null),Re=(0,I.useRef)(null);(0,I.useEffect)(()=>{S&&Re.current&&Re.current.focus()},[S]),(0,I.useEffect)(()=>{if(!L&&!P){let e=setTimeout(()=>{te(!0)},2e3);return()=>clearTimeout(e)}},[L,P]),(0,I.useEffect)(()=>{function e(e){let{plan:t,inspectionId:n}=e.detail;if(t?.steps){let e=t.steps.find(e=>e.status===`in-progress`),r=t.steps.filter(e=>e.status===`completed`).length;Le({id:n,status:`in-progress`,currentStep:e?{title:e.title,index:r+1,total:t.steps.length}:void 0})}}function t(e){let{status:t,result:n,inspectionId:r}=e.detail;Le({id:r,status:t,message:n?.message||n})}return window.addEventListener(`plan-progress-reported`,e),window.addEventListener(`inspection-result-received`,t),()=>{window.removeEventListener(`plan-progress-reported`,e),window.removeEventListener(`inspection-result-received`,t)}},[]);let[ze,Be]=(0,I.useState)(null),Ve=async(e,t={})=>{if(h)try{let n=(await h.request({method:`prompts/get`,params:{name:e.name,arguments:t}},O)).messages?.[0];if(n?.content?.type===`text`&&n.content.text){A(n.content.text),Re.current?.focus();return}}catch(e){console.error(`Failed to execute prompt:`,e)}A(e.template||e.description||e.name),Re.current?.focus()},He=async e=>{if(e.arguments&&e.arguments.length>0){Be(e);return}await Ve(e)},Ue=e=>{ze&&(Ve(ze,e),Be(null))},We=e=>{e.preventDefault(),D.trim()&&(Le(null),n(D,de.find(e=>e.name===F)||de[0]||se[0],Oe||void 0),A(``),N(`chat`))},Ge=e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),We(e)),e.key===`Escape`&&(w(!1),Re.current?.blur())},Ke=o===`error`;return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(le,{prompt:ze,isOpen:!!ze,onOpenChange:e=>!e&&Be(null),onSubmit:Ue}),(S||j!==`none`)&&(0,z.jsx)(`div`,{className:`fixed inset-0 z-[999998] bg-transparent`,onClick:()=>{!L&&!re&&(w(!1),N(`none`))}}),(0,z.jsxs)(`div`,{ref:Pe,className:b(`fixed bottom-8 left-1/2 z-[999999]`,`transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]`,S?`w-[480px]`:De?`w-auto min-w-[200px] max-w-[480px]`:`w-[190px]`,Fe?`cursor-grabbing`:`cursor-grab`),onMouseDown:Ie,onMouseEnter:()=>{!Fe&&P&&w(!0)},onMouseLeave:()=>{re||(!D.trim()&&!Fe&&(w(!1),N(`none`)),te(!0))},children:[(0,z.jsx)(k_,{prompts:xe,visible:S&&!L&&j===`none`&&xe.length>0,onSelect:He}),(0,z.jsxs)(`div`,{className:b(`relative flex items-center backdrop-blur-xl shadow-2xl border border-border`,`transition-[width,height,padding,background-color,border-color] duration-200 ease-out`,S?`h-12 p-2 pl-4`:`h-9 px-2 py-1`,j===`none`?`bg-muted/90 rounded-full`:`bg-muted/95 rounded-b-lg rounded-t-none border-t-0`,Ke&&!S&&`bg-destructive/10 border-destructive/20`),children:[(0,z.jsxs)(`div`,{className:b(`flex items-center transition-opacity duration-150 w-full relative`,Ee?`absolute left-3 opacity-0 pointer-events-none`:`relative opacity-100`),children:[a.length===0&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`div`,{className:`flex items-center justify-center w-6 h-6 rounded-full bg-accent flex-shrink-0`,children:(0,z.jsx)(`img`,{src:Ne?.meta?.icon,alt:F,className:`w-3.5 h-3.5`})}),(0,z.jsx)(`span`,{className:`text-xs text-muted-foreground/70 ml-3 whitespace-nowrap`,children:`⌥I or hover to inspect`})]}),De&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`div`,{className:`flex items-center gap-3 flex-shrink-0`,children:[(0,z.jsx)(`div`,{className:`relative flex items-center justify-center w-6 h-6 rounded-full bg-accent flex-shrink-0`,children:L?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`div`,{className:`absolute inset-1 rounded-full border-2 border-current opacity-20 animate-ping text-foreground`}),(0,z.jsx)(`img`,{src:Ne?.meta?.icon,alt:F,className:`w-3.5 h-3.5 animate-pulse`})]}):R?R.status===`in-progress`?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`div`,{className:`absolute inset-1 rounded-full border-2 border-current opacity-20 animate-ping text-blue-500`}),(0,z.jsx)(u,{className:`w-3.5 h-3.5 animate-pulse text-blue-500`})]}):R.status===`completed`?(0,z.jsx)(T,{className:`w-5 h-5 text-green-500`}):(0,z.jsx)(C,{className:`w-5 h-5 text-red-500`}):Ke?(0,z.jsx)(C,{className:`w-5 h-5 text-red-500`}):(0,z.jsx)(T,{className:`w-5 h-5 text-green-500`})}),(0,z.jsx)(`div`,{className:`w-px h-4 bg-border flex-shrink-0`})]}),(0,z.jsx)(`div`,{className:`flex-1 flex justify-center min-w-0 pl-2`,children:(0,z.jsx)(`div`,{className:`flex flex-col min-w-0 max-w-full pr-2 max-h-[24px] overflow-hidden`,children:R&&R.status===`in-progress`&&R.currentStep?(0,z.jsxs)(`div`,{className:`flex items-center gap-1.5 text-sm font-medium text-foreground min-w-0`,children:[(0,z.jsx)(u,{className:`w-4 h-4 flex-shrink-0`}),(0,z.jsxs)(`span`,{className:`truncate min-w-0`,children:[`Step `,R.currentStep.index,`/`,R.currentStep.total,`: `,R.currentStep.title]})]}):R?.message?(0,z.jsx)(`div`,{className:`text-sm font-medium leading-[1.4] text-foreground truncate min-w-0`,children:R.message}):we?(0,z.jsxs)(`div`,{className:`flex items-center gap-1.5 text-sm font-medium text-foreground min-w-0`,children:[(0,z.jsx)(u,{className:`w-4 h-4 flex-shrink-0`}),(0,z.jsx)(`span`,{className:`truncate min-w-0`,children:we})]}):(0,z.jsx)(`div`,{className:`text-sm font-medium leading-[1.4] text-foreground truncate min-w-0`,children:L&&!Te?(0,z.jsx)(pe,{duration:2,spread:2,children:o===`submitted`&&Ne?.command===`npx`?`Starting ${Ne.name}... This may take a moment.`:`Thinking...`}):Te||`Processing...`})})}),(0,z.jsxs)(`div`,{className:`flex items-center gap-2 flex-shrink-0`,children:[(0,z.jsx)(`button`,{type:`button`,onClick:()=>N(e=>e===`chat`?`none`:`chat`),className:b(`flex items-center justify-center w-7 h-7 rounded-full transition-all flex-shrink-0`,j===`chat`?`bg-foreground text-background`:`bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground`),title:j===`chat`?`Collapse`:`Expand messages`,children:(0,z.jsx)(pn,{className:b(`w-3.5 h-3.5 transition-transform duration-300`,j===`chat`&&`rotate-180`)})}),L&&(0,z.jsx)(`button`,{type:`button`,onClick:r,className:`flex items-center justify-center w-7 h-7 rounded-full bg-destructive text-destructive-foreground transition-all flex-shrink-0 hover:bg-destructive/90`,title:`Cancel request`,children:(0,z.jsx)(En,{className:`w-3 h-3`})})]})]})]}),(0,z.jsxs)(`div`,{className:b(`flex items-center w-full gap-3 transition-all duration-150`,Ee?`opacity-100 translate-y-0 relative pointer-events-auto`:`opacity-0 translate-y-4 pointer-events-none absolute top-2 left-4 right-2`),onClick:e=>e.stopPropagation(),children:[(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`button`,{type:`button`,onClick:()=>be(!0),className:b(`relative flex items-center justify-center w-7 h-7 rounded-full transition-colors flex-shrink-0`,`hover:bg-accent/50`,ye&&`bg-accent/50 text-foreground`),title:`Context`,children:[(0,z.jsx)(f,{className:`w-3.5 h-3.5`}),s>0&&(0,z.jsx)(`span`,{className:`absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[12px] h-[12px] px-0.5 text-[8px] font-bold text-white bg-red-500 rounded-full border border-background shadow-sm leading-none`,children:s>99?`99+`:s})]}),(0,z.jsx)(`div`,{className:`w-px h-4 bg-border flex-shrink-0`})]}),e&&v>0&&(0,z.jsxs)(`button`,{type:`button`,onClick:y,className:`relative flex items-center justify-center w-7 h-7 rounded-full bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-colors flex-shrink-0`,title:`Capture ${v} selected element${v>1?`s`:``} (⌘/Ctrl+Enter)`,children:[(0,z.jsx)(dn,{className:`w-3.5 h-3.5`}),(0,z.jsx)(`span`,{className:`absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[12px] h-[12px] px-0.5 text-[8px] font-bold text-white bg-blue-500 rounded-full border border-background shadow-sm leading-none`,children:v>99?`99+`:v})]}),(0,z.jsx)(`button`,{onClick:t,className:b(`relative flex items-center justify-center w-7 h-7 rounded-full transition-colors flex-shrink-0`,e?`bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]`:`bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground`),title:`Toggle Inspector (⌥I)`,children:(0,z.jsx)(_n,{className:`w-3.5 h-3.5`})}),(0,z.jsx)(`div`,{className:`w-px h-4 bg-border flex-shrink-0`}),(0,z.jsxs)(`form`,{onSubmit:We,className:`flex-1 flex items-center gap-2 min-w-0`,onClick:e=>e.stopPropagation(),children:[(0,z.jsxs)(`div`,{className:`relative flex-shrink-0`,children:[(0,z.jsx)(`button`,{type:`button`,onClick:()=>ge(!he),className:`flex items-center justify-center w-7 h-7 rounded-full hover:bg-accent/50 transition-colors`,title:`Select Agent`,children:(0,z.jsx)(`img`,{src:de.find(e=>e.name===F)?.meta?.icon,alt:F,className:`w-3.5 h-3.5`})}),he&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`div`,{className:`fixed inset-0 z-[999998]`,onClick:()=>ge(!1)}),(0,z.jsx)(`div`,{className:`absolute bottom-full left-0 mb-2 w-64 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-[999999] animate-in fade-in zoom-in-95 duration-200`,children:de.map(e=>(0,z.jsxs)(`div`,{className:b(`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors group`,F===e.name&&`bg-accent/50 font-medium`),children:[(0,z.jsxs)(`button`,{onClick:()=>{ae(e.name),ge(!1)},className:`flex items-center gap-2 flex-1 text-left`,children:[e.meta?.icon&&(0,z.jsx)(`img`,{src:e.meta.icon,alt:``,className:`w-4 h-4 flex-shrink-0`}),(0,z.jsx)(`span`,{className:`flex-1`,children:e.name})]}),(e.configHint||e.configLink)&&(0,z.jsx)(`button`,{onClick:t=>{t.stopPropagation(),ve(e.name)},className:`p-1 rounded hover:bg-accent-foreground/10 transition-colors`,title:`Configuration info`,children:(0,z.jsx)(yn,{className:`w-3.5 h-3.5 text-muted-foreground`})})]},e.name))})]})]}),(0,z.jsx)(`input`,{ref:Re,type:`text`,value:D,onChange:e=>A(e.target.value),onKeyDown:Ge,placeholder:`Ask ${F}...`,className:`w-full bg-transparent border-none outline-none text-foreground placeholder-muted-foreground text-sm h-7 disabled:opacity-50`,tabIndex:0,disabled:L}),(a.length>0||L)&&(0,z.jsx)(`button`,{type:`button`,onClick:()=>N(e=>e===`chat`?`none`:`chat`),className:b(`flex items-center justify-center w-7 h-7 rounded-full transition-all flex-shrink-0`,j===`chat`?`bg-foreground text-background`:`bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground`),title:j===`chat`?`Collapse`:`Expand messages`,children:(0,z.jsx)(pn,{className:b(`w-3.5 h-3.5 transition-transform duration-300`,j===`chat`&&`rotate-180`)})}),L?(0,z.jsx)(`button`,{type:`button`,onClick:r,className:`flex items-center justify-center w-7 h-7 rounded-full bg-destructive text-destructive-foreground transition-all flex-shrink-0 hover:bg-destructive/90`,title:`Cancel request`,children:(0,z.jsx)(En,{className:`w-3 h-3`})}):(0,z.jsx)(`button`,{type:`submit`,disabled:!D.trim(),className:b(`flex items-center justify-center w-7 h-7 rounded-full transition-all flex-shrink-0`,D.trim()?`bg-foreground text-background scale-100`:`bg-accent text-muted-foreground/50 scale-90`),children:(0,z.jsx)(un,{className:`w-3.5 h-3.5`})})]})]})]}),j!==`none`&&(0,z.jsx)(`div`,{className:`absolute bottom-full left-0 right-0 pointer-events-auto max-w-[480px] mx-auto animate-panel-in`,children:(0,z.jsxs)(`div`,{className:`bg-muted/95 backdrop-blur-xl rounded-t-xl border border-border border-b-0 shadow-2xl overflow-hidden relative`,children:[De&&(0,z.jsx)(`button`,{onClick:e=>{e.stopPropagation(),ie(!re)},className:b(`absolute top-3 left-3 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all`,re?`bg-black text-white shadow-md hover:bg-gray-800`:`bg-muted/80 text-muted-foreground hover:bg-accent hover:text-foreground`),title:re?`Unpin inspector`:`Pin inspector`,children:re?(0,z.jsx)(Cn,{className:`w-3.5 h-3.5 fill-current`}):(0,z.jsx)(Cn,{className:`w-3.5 h-3.5`})}),j===`chat`&&(0,z.jsx)(`div`,{className:`h-[500px]`,children:(0,z.jsx)(E,{messages:a,status:o,selectedAgent:F})})]})})]}),(0,z.jsx)(D_,{open:ye,onOpenChange:be,inspectionItems:c,onRemoveInspection:l,client:h,isClientReady:p}),_e&&(()=>{let e=de.find(e=>e.name===_e);return e?(0,z.jsx)(m,{open:!!_e,onOpenChange:()=>ve(null),children:(0,z.jsxs)(_,{onClose:()=>ve(null),className:`w-80`,children:[(0,z.jsxs)(x,{children:[(0,z.jsxs)(d,{className:`flex items-center gap-3`,children:[e.meta?.icon&&(0,z.jsx)(`img`,{src:e.meta.icon,alt:``,className:`w-6 h-6`}),e.name]}),e.configHint&&(0,z.jsx)(me,{children:e.configHint})]}),e.configLink&&(0,z.jsx)(`a`,{href:e.configLink,target:`_blank`,rel:`noopener noreferrer`,className:`inline-flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 underline`,children:`View ACP Documentation →`})]})}):null})()]})},j_=({shadowRoot:e,mountPoint:t})=>{let{client:n,isClientReady:r}=de(),{resolvedTheme:i}=P(),a=re(),[o,s]=(0,I.useState)(!1),[c,l]=(0,I.useState)(null),[u,d]=(0,I.useState)(``),[f,p]=(0,I.useState)(null),{inspections:m,setInspections:h}=Qh(),[g,_]=(0,I.useState)([]),[v,x]=(0,I.useState)(null),{messages:S,sendMessage:C,status:w,stop:T}=fe({transport:new y({api:`${ue()}/api/acp/chat`})}),E=()=>{T()},{notification:D,showNotif:O}=Xn();(0,I.useEffect)(()=>{e&&e.host&&(i===`dark`?e.host.classList.add(`dark`):e.host.classList.remove(`dark`))},[i,e]),(0,I.useEffect)(()=>{let e=sessionStorage.getItem(`inspector-current-inspection-id`);e&&(m.some(t=>t.id===e)||sessionStorage.removeItem(`inspector-current-inspection-id`))},[m]);let k=(0,I.useCallback)(()=>{let e=!o;s(e),document.body.style.cursor=e?`crosshair`:``,p(null),O(e?`Inspector ON`:`Inspector OFF`)},[o,O]),A=(0,I.useCallback)(()=>{p(null),s(!1),document.body.style.cursor=``},[]);(0,I.useEffect)(()=>{let e=e=>{if(e.key===`Escape`&&o){A();return}e.altKey&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&e.code===`KeyI`&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),k())};return window.addEventListener(`keydown`,e,!0),()=>window.removeEventListener(`keydown`,e,!0)},[o,k,A]),(0,I.useEffect)(()=>{let e=()=>{o||(s(!0),document.body.style.cursor=`crosshair`,p(null),O(`Inspector ON`))};return window.addEventListener(`activate-inspector`,e),()=>window.removeEventListener(`activate-inspector`,e)},[o,O]),(0,I.useEffect)(()=>{let e=()=>{s(!0),p(null),document.body.style.cursor=`crosshair`,O(`Area Mode: shift+click to select multiple elements`)};return window.addEventListener(`activate-area-select`,e),()=>window.removeEventListener(`activate-area-select`,e)},[O]),(0,I.useEffect)(()=>{let e=async e=>{let{selector:t,containerSelector:n,bounds:r}=e.detail||{},i=[],a=null;try{if(t){let e=document.querySelector(t);e&&(a=e,i=[e])}else if(n){let e=document.querySelector(n);if(e){a=e;let t=e.querySelectorAll(`*`);i=[e,...Array.from(t).filter(e=>{let t=e.tagName.toLowerCase(),n=[`button`,`a`,`input`,`select`,`textarea`,`img`,`video`,`audio`].includes(t),r=e.textContent?.trim(),i=e.id,a=e.className;return n||r||i||a}).slice(0,50)]}}else if(r){let{x:e,y:t,width:n,height:o}=r,s=document.querySelectorAll(`*`);i=Array.from(s).filter(r=>{let i=r.getBoundingClientRect();return i.left<e+n&&i.right>e&&i.top<t+o&&i.bottom>t&&i.width>0&&i.height>0}).slice(0,50),a=i[0]||null}if(!a||i.length===0){window.dispatchEvent(new CustomEvent(`element-inspected`,{detail:{error:`No elements found matching the criteria`}}));return}let e=$n(a),o=i.slice(1).map(e=>{let t=$n(e);return{file:t.file,component:t.component,line:t.line,column:t.column,elementInfo:t.elementInfo}}),s;a.isConnected&&(s=await b_(a));let c=`inspection-${Date.now()}`,l=t?`Auto-captured: ${t}`:n?`Auto-captured container: ${n} (${i.length} elements)`:`Auto-captured bounds: ${r?.width}x${r?.height} at (${r?.x}, ${r?.y}) (${i.length} elements)`,u={id:c,sourceInfo:{file:e.file,component:e.component,line:e.line,column:e.column,elementInfo:e.elementInfo,relatedElements:o.length>0?o:void 0},description:l,status:`pending`,timestamp:Date.now(),selectedContext:{includeElement:!0,includeStyles:!1,consoleIds:[],networkIds:[],screenshot:s}};h(e=>[...e,u]),C_([...S_(),u]),window.dispatchEvent(new CustomEvent(`element-inspected`,{detail:{inspections:[u]}}))}catch(e){let t=e instanceof Error?e.message:String(e);window.dispatchEvent(new CustomEvent(`element-inspected`,{detail:{error:`Automated capture failed: ${t}`}}))}};return window.addEventListener(`automated-capture`,e),()=>window.removeEventListener(`automated-capture`,e)},[h]);let j=async e=>{if(e.element){let t=e.element;await new Promise(e=>{requestAnimationFrame(()=>{setTimeout(e,50)})}),t.isConnected?d(await b_(t)):d(``)}if(l(e),e.automated){let t={id:`inspection-${Date.now()}`,sourceInfo:{file:e.file,component:e.component,line:e.line,column:e.column,elementInfo:e.elementInfo},description:`Auto-captured via automation`,status:`pending`,timestamp:Date.now()};h(e=>[...e,t]),window.dispatchEvent(new CustomEvent(`element-inspected`,{detail:{inspections:[t]}})),s(!1),document.body.style.cursor=``}else p(`input`)};(0,I.useEffect)(()=>{let e=e=>{let t=e;if(t.detail){let e=t.detail.info||t.detail;e&&e.file&&j({...e,automated:!0})}};return window.addEventListener(`dom-inspector:inspect-element`,e),()=>window.removeEventListener(`dom-inspector:inspect-element`,e)},[]);let{selection:M,finalizeSelection:ee}=Sh({isActive:o,isWaitingForFeedback:f!==null,onElementInspected:j});return(0,z.jsx)(`div`,{className:b(`font-sans antialiased w-full h-full pointer-events-none fixed inset-0`,i===`dark`&&`dark`),children:(0,z.jsxs)(Jh.Provider,{value:t||null,children:[(0,z.jsx)(`div`,{className:`pointer-events-auto`,children:a&&(0,z.jsx)(A_,{toolsReady:r,mcpClient:n,isActive:o,onToggleInspector:k,onSubmitAgent:(e,t,n)=>{C({text:e},{body:{agent:t,envVars:{},sessionId:n}})},onCancel:E,isAgentWorking:w===`streaming`||w===`submitted`,messages:S,status:w,inspectionCount:m.length,inspectionItems:m,onRemoveInspection:e=>{h(t=>t.filter(t=>t.id!==e))},onAgentChange:x,selectionCount:M.length,onCapture:ee})}),D&&(0,z.jsx)(ln,{message:D}),f&&c&&(0,z.jsx)(`div`,{className:`pointer-events-auto`,children:(0,z.jsx)(Yn,{sourceInfo:c,screenshot:u,mode:f,onSubmit:(e,t=!1,n)=>{if(!c)return;let r=c.relatedElements&&c.relatedElements.length>0,i=e;!i&&r&&(i=`Region: ${(c.relatedElements?.length||0)+1} elements (primary: ${c.elementInfo?.tagName.toLowerCase()||`element`})${c.note||c.relatedElements?.some(e=>e.note)?`. Please read notes on these elements.`:``}`);let a=i||e,o={id:`inspection-${Date.now()}`,sourceInfo:{file:c.file,component:c.component,line:c.line,column:c.column,elementInfo:c.elementInfo,relatedElements:c.relatedElements?.map(e=>({file:e.file,component:e.component,line:e.line,column:e.column,elementInfo:e.elementInfo?{tagName:e.elementInfo.tagName,textContent:e.elementInfo.textContent,className:e.elementInfo.className,id:e.elementInfo.id,styles:e.elementInfo.styles||{}}:void 0,note:e.note}))},description:a,status:`pending`,timestamp:Date.now(),selectedContext:n};h(e=>[...e,o]);let l=[...g,o];_(l),p(null),t?(s(!0),document.body.style.cursor=`crosshair`,O(`Saved (${l.length})`)):(C_([...S_(),...l]),window.dispatchEvent(new CustomEvent(`element-inspected`,{detail:{inspections:l}})),_([]),s(!1),document.body.style.cursor=``,O(`${l.length} inspection${l.length>1?`s`:``} saved`))},onClose:A,client:n,isClientReady:r,selectedAgent:v||void 0})}),(0,z.jsx)(qh,{})]})})};var M_=class extends HTMLElement{connectedCallback(){this.style.cssText=`
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none !important;
      z-index: 2147483647 !important;
    `;let e=this.attachShadow({mode:`open`}),t=document.createElement(`style`);t.textContent=ce,e.appendChild(t);let n=document.createElement(`div`);e.appendChild(n),w_.createRoot(n).render(I.createElement(D,null,I.createElement(j_,{shadowRoot:e,mountPoint:n})));let r=window.__DOM_INSPECTOR_CONFIG__;cn({disableChrome:r?.disableChrome})}};function N_(){customElements.get(`dom-inspector-mcp`)||customElements.define(`dom-inspector-mcp`,M_)}N_();export{Jh as InspectorContainerContext,N_ as registerDomInspector,Yh as useInspectorContainer,Xh as useShadowRoot};