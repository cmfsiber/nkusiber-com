var l={chrome:"Google Chrome",brave:"Brave",crios:"Google Chrome",edge:"Microsoft Edge",edg:"Microsoft Edge",edgios:"Microsoft Edge",fennec:"Mozilla Firefox",jsdom:"JsDOM",mozilla:"Mozilla Firefox",fxios:"Mozilla Firefox",msie:"Microsoft Internet Explorer",opera:"Opera",opios:"Opera",opr:"Opera",opt:"Opera",rv:"Microsoft Internet Explorer",safari:"Safari",samsungbrowser:"Samsung Browser",electron:"Electron"},p={android:"Android",androidTablet:"Android Tablet",cros:"Chrome OS",fennec:"Android Tablet",ipad:"IPad",ipod:"IPod",iphone:"IPhone",jsdom:"JsDOM",linux:"Linux",mac:"Macintosh",tablet:"Android Tablet",win:"Windows","windows phone":"Windows Phone",xbox:"Microsoft Xbox"};var k=(d,r=-1)=>{let e=new RegExp(`^-?\\d+(?:.\\d{0,${r}})?`),s=Number(d).toString().match(e);return s?s[0]:null},w={toFixed:k};var m="4.1.0";var u=()=>typeof window<"u"?window.navigator:null,c=class{userAgent;constructor(r){this.userAgent=r||u()?.userAgent||null}static get VERSION(){return m}parseUserAgent(r){let e={},s=r||this.userAgent||"",o=s.toLowerCase().replace(/\s\s+/g," "),t=/(edge)\/([\w.]+)/.exec(o)||/(edg)[/]([\w.]+)/.exec(o)||/(opr)[/]([\w.]+)/.exec(o)||/(opt)[/]([\w.]+)/.exec(o)||/(fxios)[/]([\w.]+)/.exec(o)||/(edgios)[/]([\w.]+)/.exec(o)||/(jsdom)[/]([\w.]+)/.exec(o)||/(samsungbrowser)[/]([\w.]+)/.exec(o)||/(electron)[/]([\w.]+)/.exec(o)||/(chrome)[/]([\w.]+)/.exec(o)||/(crios)[/]([\w.]+)/.exec(o)||/(opios)[/]([\w.]+)/.exec(o)||/(version)(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(o)||/(webkit)[/]([\w.]+).*(version)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(o)||/(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(o)||/(webkit)[/]([\w.]+)/.exec(o)||/(opera)(?:.*version|)[/]([\w.]+)/.exec(o)||/(msie) ([\w.]+)/.exec(o)||/(fennec)[/]([\w.]+)/.exec(o)||o.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(o)||o.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(o)||[],b=/(ipad)/.exec(o)||/(ipod)/.exec(o)||/(iphone)/.exec(o)||/(jsdom)/.exec(o)||/(windows phone)/.exec(o)||/(xbox)/.exec(o)||/(win)/.exec(o)||/(tablet)/.exec(o)||/(android)/.test(o)&&/(mobile)/.test(o)===!1&&["androidTablet"]||/(android)/.exec(o)||/(mac)/.exec(o)||/(linux)/.exec(o)||/(cros)/.exec(o)||[],i=t[5]||t[3]||t[1]||null,n=b[0]||null,a=t[4]||t[2]||null,g=u();i==="chrome"&&typeof g?.brave?.isBrave=="function"&&(i="brave"),i&&(e[i]=!0),n&&(e[n]=!0);let x=!!(e.tablet||e.android||e.androidTablet),f=!!(e.ipad||e.tablet||e.androidTablet),h=!!(e.android||e.androidTablet||e.tablet||e.ipad||e.ipod||e.iphone||e["windows phone"]),v=!!(e.cros||e.mac||e.linux||e.win),y=!!(e.brave||e.chrome||e.crios||e.opr||e.safari||e.edg||e.electron),B=!!(e.msie||e.rv),M=!!(e.chrome||e.crios),j=!!(e.fxios||e.fennec||e.mozilla),E=!!e.safari,K=!!(e.opera||e.opios||e.opr||e.opt),A=!!(e.edg||e.edge||e.edgios);return{name:l[i]??null,platform:p[n]??null,userAgent:s,version:a,shortVersion:a?w.toFixed(parseFloat(a),2):null,isAndroid:x,isTablet:f,isMobile:h,isDesktop:v,isWebkit:y,isIE:B,isChrome:M,isFireFox:j,isSafari:E,isOpera:K,isEdge:A}}getBrowserInfo(){let r=this.parseUserAgent();return{name:r.name,platform:r.platform,userAgent:r.userAgent,version:r.version,shortVersion:r.shortVersion}}};var C=c;export{c as BrowserDetector,l as KnownBrowsers,p as KnownPlatforms,C as default};
//# sourceMappingURL=browser-dtector.js.map
