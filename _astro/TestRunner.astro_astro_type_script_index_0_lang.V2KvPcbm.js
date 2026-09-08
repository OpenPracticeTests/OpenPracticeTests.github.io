import{i as e,r as t,t as n}from"./eliminator.CnRb2FKU.js";var r=`￼`,i=[`.tr-passage`,`.tr-stem`],a=new WeakMap;function o(e){let t=[];return i.forEach((n,r)=>{let i=e.querySelector(n);i&&t.push([r,i])}),t}function s(e){let t=[],n=``,i=e=>{if(e.nodeType===Node.ELEMENT_NODE){let a=e;if(a.classList.contains(`katex`)){t.push({kind:`katex`,node:a,start:n.length,len:1}),n+=r;return}for(let e of Array.from(a.childNodes))i(e);return}if(e.nodeType===Node.TEXT_NODE){let r=e;if(r.data.length===0)return;t.push({kind:`text`,node:r,start:n.length,len:r.data.length}),n+=r.data}};for(let t of Array.from(e.childNodes))i(t);return{units:t,text:n}}function c(e,t,n,r,i){for(let t of e){let e=document.createRange();e.selectNode(t.node);let a;try{a=e.comparePoint(n,r)}catch{continue}if(a<0)return t.start;if(a===0)return t.kind===`text`&&n===t.node?t.start+Math.min(r,t.len):i?t.start+t.len:t.start}return t}function l(e){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return null;let n=t.getRangeAt(0);for(let[t,r]of o(e)){if(!r.contains(n.startContainer)||!r.contains(n.endContainer))continue;let{units:e,text:i}=s(r),a=c(e,i.length,n.startContainer,n.startOffset,!1),o=c(e,i.length,n.endContainer,n.endOffset,!0);for(o<a&&([a,o]=[o,a]);a<o&&/\s/.test(i[a]);)a++;for(;o>a&&/\s/.test(i[o-1]);)o--;return o<=a?null:{c:t,s:a,e:o}}return null}function u(e,t,n){let r=[...e.highlights[t]??[],n];e.highlights[t]=m(r)}function d(e,t,n){let r=e.highlights[t];!r||n<0||n>=r.length||(r.splice(n,1),r.length===0&&delete e.highlights[t])}function f(e,t){return(e.highlights[t]??[]).length>0}function p(e,t){delete e.highlights[t]}function m(e){let t=[];for(let n of[0,1]){let r=e.filter(e=>e.c===n&&e.e>e.s).sort((e,t)=>e.s-t.s||e.e-t.e);for(let e of r){let r=t[t.length-1];r&&r.c===n&&e.s<=r.e?r.e=Math.max(r.e,e.e):t.push({...e})}}return t}function h(e,t){let n=document.createElement(`mark`);n.className=`tr-hl`,n.dataset.hl=String(t),e.parentNode.insertBefore(n,e),n.appendChild(e)}function g(e,t){let n=JSON.stringify(t);if(e.dataset.hlSig!==n){e.dataset.hlSig=n;for(let[n,r]of o(e)){if(a.has(r)||a.set(r,r.innerHTML),r.innerHTML=a.get(r),!t.some(e=>e.c===n))continue;let{units:e,text:i}=s(r),o=new Map;t.forEach((t,r)=>{if(t.c!==n)return;let a=Math.max(0,Math.min(t.s,i.length)),s=Math.max(a,Math.min(t.e,i.length));if(!(s<=a))for(let t of e){let e=Math.max(a,t.start),n=Math.min(s,t.start+t.len);if(n<=e)continue;let i=o.get(t)??[];i.push([e-t.start,n-t.start,r]),o.set(t,i)}});for(let[e,t]of o){if(e.kind===`katex`){h(e.node,t[0][2]);continue}let n=e.node;t.sort((e,t)=>t[0]-e[0]);for(let[e,r,i]of t){r<n.data.length&&n.splitText(r);let t=e>0?n.splitText(e):n;if(/\S/.test(t.data)&&h(t,i),e===0)break}}}}}var _=`opt.tools.panels`,v=16,y=48;function b(e){try{let t=JSON.parse(localStorage.getItem(_)??`{}`)?.[e];if(t&&[`left`,`top`,`width`,`height`].every(e=>typeof t[e]==`number`))return t}catch{}return null}function ee(e,t){try{let n=JSON.parse(localStorage.getItem(_)??`{}`);n[e]=t,localStorage.setItem(_,JSON.stringify(n))}catch{}}function x(e){let{panel:t,head:n,move:r,close:i,id:a}=e,o=e.sheetBelowPx??768,s=null,c=()=>window.innerWidth<o;function l(){let e=t.getBoundingClientRect();return{left:e.left,top:e.top,width:e.width,height:e.height}}function u(e,n){if(c())return;let r=t.offsetWidth,i=window.innerWidth-y,a=window.innerHeight-y;t.style.left=`${Math.round(Math.max(y-r,Math.min(e,i)))}px`,t.style.top=`${Math.round(Math.max(0,Math.min(n,a)))}px`}function d(e){c()||(t.style.width=`${Math.round(e.width)}px`,t.style.height=`${Math.round(e.height)}px`,u(e.left,e.top))}function f(){let e=Math.min(460,Math.max(320,window.innerWidth-64)),t=Math.min(560,Math.max(280,window.innerHeight-160));return{left:window.innerWidth-e-32,top:96,width:e,height:t}}function p(){c()||ee(a,l())}let m=0,h=0;n.addEventListener(`pointerdown`,e=>{if(c())return;let i=e.target.closest(`button`);if(i&&i!==r)return;let a=t.getBoundingClientRect();m=e.clientX-a.left,h=e.clientY-a.top,n.setPointerCapture(e.pointerId),n.dataset.dragging=`1`,e.preventDefault()}),n.addEventListener(`pointermove`,e=>{n.dataset.dragging===`1`&&u(e.clientX-m,e.clientY-h)});let g=e=>{if(n.dataset.dragging===`1`){delete n.dataset.dragging;try{n.releasePointerCapture(e.pointerId)}catch{}p()}};n.addEventListener(`pointerup`,g),n.addEventListener(`pointercancel`,g),r.addEventListener(`keydown`,e=>{let t=e.key===`ArrowLeft`?-16:e.key===`ArrowRight`?v:0,n=e.key===`ArrowUp`?-16:e.key===`ArrowDown`?v:0;if(!t&&!n)return;e.preventDefault();let r=l();u(r.left+t,r.top+n),p()});let _=0;new ResizeObserver(()=>{t.hidden||(window.clearTimeout(_),_=window.setTimeout(p,250))}).observe(t),window.addEventListener(`resize`,()=>{t.hidden||d(b(a)??f())}),t.addEventListener(`keydown`,e=>{e.key===`Escape`&&(e.stopPropagation(),e.preventDefault(),x.close())}),i.addEventListener(`click`,()=>x.close());let x={el:t,isOpen:()=>!t.hidden,open(e){t.hidden&&(s=e,t.hidden=!1,d(b(a)??f()),t.focus({preventScroll:!0}))},close(){t.hidden||(t.hidden=!0,s&&document.contains(s)&&s.focus(),s=null)}};return x}var te=`// @ts-check
/**
 * The script that ships INSIDE a downloaded report.
 *
 * \`archive.ts\` reads this file's text (\`?raw\`) and bakes it into every archive, so it
 * has to stay standalone: no imports, nothing from \`test-engine.ts\`, no \`localStorage\`,
 * no \`fetch\`. An archive is opened from \`file://\`, where the last two would be blocked
 * or would throw, and where there is no engine, no saved attempt and no \`#opt-test-meta\`
 * to read.
 *
 * It restores exactly two behaviors from the live results screen: the tooltip on a time
 * chart's bars and its table's rows, and the click that takes you to a question. On the
 * site that click enters review; here it scrolls, because the archive has no review mode
 * and needs none, the whole transcript being on the page already.
 *
 * The tooltip's three lines arrive pre-composed in \`data.tips\`, written by the engine
 * from the same \`tipLines\` the live site uses. Composing them here would be a second
 * copy of the wording, and the phrase "% of answering time" has already been wrong once.
 *
 * @typedef {{ h: string, p: string, m: string }} ArchiveTip
 *   h heading line, p stem preview (may be empty), m the time/share/result line
 */

/** @param {{ tips: Record<string, ArchiveTip>, cta: string }} data */
function optArchiveRuntime(data) {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // qid -> its article in the transcript. Walked rather than looked up with a
  // \`[data-qid="..."]\` selector, so a qid holding a character the selector grammar
  // reserves needs no escaping. Scoped to \`.tr-question\` because bars, rows and
  // articles all carry \`data-qid\` and only the article is a scroll target.
  /** @type {Element[]} */
  var articles = [].slice.call(document.querySelectorAll(".tr-question[data-qid]"));
  /** @type {Record<string, Element>} */
  var byQid = Object.create(null);
  articles.forEach(function (a) {
    byQid[String(a.getAttribute("data-qid"))] = a;
  });

  [].forEach.call(document.querySelectorAll(".tr-chart-block"), wireBlock);

  /** @param {Element} block */
  function wireBlock(block) {
    var found = block.querySelector(".tr-chart-tip");
    if (!(found instanceof HTMLElement)) return;
    // \`const\`, so the narrowing above survives into every closure below.
    const tip = found;
    // Bars and rows rove separately, each its own single tab stop, as on the site.
    /** @type {Element[][]} */
    var groups = [
      [].slice.call(block.querySelectorAll(".tr-bar")),
      [].slice.call(block.querySelectorAll(".tr-time-row")),
    ];
    // The gap between an anchor and its tooltip lives in CSS (\`--tr-tip-gap\`, which
    // both tooltip transforms use); read it once so the "room above?" test cannot
    // drift from the transform that actually places the tooltip.
    var gap = parseFloat(getComputedStyle(tip).getPropertyValue("--tr-tip-gap")) || 8;

    /**
     * The hoverable thing under an event, and only within this block: three kinds of
     * element carry \`data-qid\`, and a document-wide lookup would find the wrong one.
     * @param {EventTarget | null} t
     */
    function targetOf(t) {
      if (!(t instanceof Element)) return null;
      var el = t.closest(".tr-bar, .tr-time-row");
      return el && block.contains(el) ? el : null;
    }

    function hide() {
      tip.hidden = true;
    }

    /**
     * @param {string} cls
     * @param {string} text
     */
    function line(cls, text) {
      var el = document.createElement("div");
      el.className = cls;
      el.textContent = text; // the preview is content, not markup
      return el;
    }

    /** The element that takes focus: a bar is focusable, a row's button is. */
    /** @param {Element} el */
    function focusableOf(el) {
      return el.classList.contains("tr-bar") ? el : el.querySelector(".tr-row-btn");
    }

    /** @param {Element} el */
    function show(el) {
      var t = data.tips[String(el.getAttribute("data-qid"))];
      if (!t) return;
      var lines = [line("tr-tip-head", t.h)];
      if (t.p) lines.push(line("tr-tip-text", t.p));
      lines.push(line("tr-tip-meta", t.m), line("tr-tip-cta", data.cta));
      tip.replaceChildren.apply(tip, lines);

      // The same measurement the site's \`placeTip\` makes, with the origin box read
      // from \`offsetParent\` rather than named. Today that resolves to \`.tr-chart-block\`,
      // which is what the site positions against too.
      tip.hidden = false;
      var box = tip.offsetParent;
      if (!(box instanceof HTMLElement)) return;
      var boxRect = box.getBoundingClientRect();
      // getBoundingClientRect is a border box, but an absolutely positioned child is
      // offset from its containing block's PADDING box, so discount the border rather
      // than landing 1px off.
      var originX = boxRect.left + box.clientLeft;
      var originY = boxRect.top + box.clientTop;
      var innerW = box.clientWidth;
      var anchor = el.classList.contains("tr-bar")
        ? el.querySelector(".tr-bar-rect") || el
        : el;
      var r = anchor.getBoundingClientRect();
      var half = tip.offsetWidth / 2;
      var center = r.left + r.width / 2 - originX;
      var min = half + 4;
      var max = innerW - half - 4;
      // A tooltip wider than its own box cannot be clamped; center it instead.
      tip.style.left =
        (min > max ? innerW / 2 : Math.min(Math.max(center, min), max)) + "px";
      tip.style.top = r.top - originY + "px";
      tip.classList.toggle("is-below", r.top - tip.offsetHeight - gap < 0);
    }

    /** @param {Element} el */
    function jump(el) {
      var q = byQid[String(el.getAttribute("data-qid"))];
      if (!q) return;
      articles.forEach(function (a) {
        a.classList.remove("is-archive-target");
      });
      q.classList.add("is-archive-target");
      q.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      // Scrolling moves the viewport but not focus, which would leave a keyboard user
      // on a control now far off screen. The article is not focusable on the site;
      // it is made so here, and only here.
      q.setAttribute("tabindex", "-1");
      /** @type {HTMLElement} */ (q).focus({ preventScroll: true });
    }

    /**
     * @param {Element[]} targets
     * @param {Element | null} next
     */
    function rove(targets, next) {
      targets.forEach(function (t) {
        var f = focusableOf(t);
        if (f) f.setAttribute("tabindex", t === next ? "0" : "-1");
      });
    }

    /**
     * @param {Element[]} targets
     * @param {number} i
     */
    function focusAt(targets, i) {
      var next = targets[Math.min(targets.length - 1, Math.max(0, i))];
      if (!next) return;
      rove(targets, next);
      var f = focusableOf(next);
      if (f instanceof HTMLElement || f instanceof SVGElement) f.focus();
    }

    /** @param {Element} el */
    function groupOf(el) {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].indexOf(el) >= 0) return groups[i];
      }
      return null;
    }

    block.addEventListener("pointerover", function (e) {
      // Ignore moves between children of the same target, or crossing a bar's four
      // child nodes rebuilds and re-measures the tooltip each time.
      var el = targetOf(e.target);
      if (el && el !== targetOf(/** @type {PointerEvent} */ (e).relatedTarget)) show(el);
    });
    block.addEventListener("pointerout", function (e) {
      var el = targetOf(e.target);
      if (el && el !== targetOf(/** @type {PointerEvent} */ (e).relatedTarget)) hide();
    });
    block.addEventListener("mouseleave", hide);
    block.addEventListener("focusin", function (e) {
      var el = targetOf(e.target);
      if (!el) return;
      var g = groupOf(el);
      if (g) rove(g, el);
      show(el);
    });
    block.addEventListener("focusout", hide);
    block.addEventListener("click", function (e) {
      var el = targetOf(e.target);
      if (el) jump(el);
    });
    block.addEventListener("keydown", function (e) {
      var el = targetOf(e.target);
      if (!el) return;
      var g = groupOf(el);
      if (!g) return;
      var i = g.indexOf(el);
      var key = /** @type {KeyboardEvent} */ (e).key;
      if (key === "Enter" || key === " ") {
        e.preventDefault(); // Space would otherwise scroll the page
        jump(el);
      } else if (key === "ArrowRight" || key === "ArrowDown") {
        e.preventDefault();
        focusAt(g, i + 1);
      } else if (key === "ArrowLeft" || key === "ArrowUp") {
        e.preventDefault();
        focusAt(g, i - 1);
      } else if (key === "Home") {
        e.preventDefault();
        focusAt(g, 0);
      } else if (key === "End") {
        e.preventDefault();
        focusAt(g, g.length - 1);
      }
    });
  }
}
`,S=class extends Error{reason;constructor(e){super(e),this.name=`ArchiveError`,this.reason=e}};function ne(e){return e.replace(/@media\s+print\s*\{/gi,`@media all{`)}var C=/,\s*url\(\s*["']?[^)"']*["']?\s*\)\s*format\(\s*["'](?:woff|truetype|opentype)["']\s*\)/g;function w(e){return e.replace(C,``)}var T=/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)"'\s][^)]*?))\s*\)/gi;function E(e){return(e[1]??e[2]??e[3]??``).trim()}function D(e){let t=[],n=/@font-face\s*\{/gi,r;for(;r=n.exec(e);){let i=1,a=``,o=r.index+r[0].length;for(;o<e.length&&i>0;o+=1){let t=e[o];a?t===`\\`?o+=1:t===a&&(a=``):t===`"`||t===`'`?a=t:t===`{`?i+=1:t===`}`&&--i}t.push(e.slice(r.index,o)),n.lastIndex=o}return t}function O(e){let t=e.split(/[?#]/)[0],n=t.lastIndexOf(`.`);return n<0?``:t.slice(n+1).toLowerCase()}var k={woff2:`font/woff2`,woff:`font/woff`,ttf:`font/ttf`,otf:`font/otf`};function re(e){let t=O(e),n=k[t];if(!n)throw new S(`A font file has an unknown type (.${t}).`);return n}function A(e){return!/^(data:|#)/i.test(e.trim())}function ie(e){let t=new Set;for(let n of D(e))for(let e of n.matchAll(T)){let n=E(e);n&&A(n)&&t.add(n)}return[...t]}function j(e,t){let n=e=>e.replace(T,(e,n,r,i)=>{let a=(n??r??i??``).trim(),o=t.get(a);return o?`url(${o})`:e}),r=``,i=0;for(let t of D(e)){let a=e.indexOf(t,i);a<0||(r+=e.slice(i,a)+n(t),i=a+t.length)}return r+e.slice(i)}function ae(e){let t=e.replace(/\/\*[\s\S]*?\*\//g,``);if(/@import\b/i.test(t))throw new S(`A stylesheet uses @import.`);for(let e of t.matchAll(T)){let t=E(e);if(t&&A(t))throw new S(`A stylesheet still references ${t.slice(0,60)}.`)}}function oe(e){if(/<\/style/i.test(e))throw new S(`A stylesheet could not be embedded.`)}function M(e){if(/<\/|<!--/.test(e))throw new S(`The archive script could not be embedded.`)}function se(e){return JSON.stringify(e).replace(/</g,`\\u003c`)}var N=8*1024*1024,P=[`.site-header`,`.site-footer`,`.tr-noprint`,`.tr-panel`,`.tr-modal`,`.tr-start-overlay`,`.tr-pause-overlay`,`.tr-checkwork`,`.tr-sidebar`,`.tr-storage-warning`,`.tr-hl-popover`].join(`, `);async function F(e){let t=null;try{t=await fetch(e,{cache:`force-cache`})}catch{t=null}return t?.ok?t:fetch(e,{cache:`reload`})}function ce(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(String(r.result)),r.onerror=()=>n(new S(`A font file could not be encoded.`)),r.readAsDataURL(e)})}async function I(e){let t=ie(e),n=new Map;return await Promise.all(t.map(async e=>{let t=re(e),r;try{r=await F(new URL(e,location.href).href)}catch{throw new S(`A font file did not load (${e.slice(0,60)}).`)}if(!r.ok)throw new S(`A font file did not load (${r.status} on ${e.slice(0,60)}).`);n.set(e,await ce(new Blob([await r.arrayBuffer()],{type:t})))})),j(e,n)}async function L(){let e=[];for(let t of Array.from(document.styleSheets)){let n=t.ownerNode;if(n instanceof HTMLStyleElement){e.push(n.textContent??``);continue}if(t.href)try{let n=await F(t.href);if(!n.ok)throw Error(String(n.status));e.push(await n.text())}catch{try{e.push(Array.from(t.cssRules,e=>e.cssText).join(`
`))}catch{throw new S(`A stylesheet did not load.`)}}}return e.join(`
`)}var le=`
@media screen {
  .site-main { max-width: 21cm; padding: 1.5cm; margin: 0 auto; }
  /* Nothing sticky sits above a question here, so a jump would land it flush
     against the viewport edge. */
  .tr-question { scroll-margin-top: 1rem; }
  .tr-question.is-archive-target { outline: 2px solid var(--color-accent); outline-offset: 4px; }
  .tr-question:focus { outline: none; }
}
@media print {
  /* The tooltip is live on screen here and no longer carries .tr-noprint, so say this
     rather than trusting it to be hidden when the print dialog opens. */
  .tr .tr-chart-tip { display: none !important; }
}
`;function R(){let e=new Date,t=e=>String(e).padStart(2,`0`);return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`}async function ue(e){let t=document.documentElement.cloneNode(!0);for(let e of Array.from(t.querySelectorAll(`script`)))e.remove();for(let e of Array.from(t.querySelectorAll(`link[rel="stylesheet"], link[rel="preload"], link[rel="icon"], link[rel="canonical"], meta[property="og:url"]`)))e.remove();for(let e of Array.from(t.querySelectorAll(`.tr-chart-tip`)))e.classList.remove(`tr-noprint`),e.removeAttribute(`aria-hidden`);for(let e of Array.from(t.querySelectorAll(P)))e.remove();let n=t.querySelector(`#test-runner`);if(!n)throw new S(`The results could not be read.`);n.dataset.printing=`report`;let r=n.querySelector(`[data-role="print-subtitle"]`);r&&(r.textContent=e.subtitle);for(let n of Array.from(t.querySelectorAll(`[aria-label]`))){let t=n.getAttribute(`aria-label`);t.endsWith(`Activate to review this question.`)&&n.setAttribute(`aria-label`,`${t.slice(0,-33)}${e.cta}.`)}let i=w(ne(await L()));i=await I(i),ae(i);let a=`${i}\n${le}`;oe(a);let o=t.querySelector(`head`),s=t.querySelector(`body`);if(!o||!s)throw new S(`The page could not be read.`);let c=t.ownerDocument.createElement(`style`);c.textContent=a,o.appendChild(c),M(te);let l=se({tips:e.tips,cta:e.cta}),u=t.ownerDocument.createElement(`script`);u.textContent=`${te}\noptArchiveRuntime(${l});\n`,s.appendChild(u);let d=`<!DOCTYPE html>\n${t.outerHTML}`,f=new Blob([d],{type:`text/html;charset=utf-8`});if(f.size>N)throw new S(`The file came out larger than ${Math.round(N/1024/1024)} MB.`);return{blob:f,filename:`${e.testId}-report-${R()}.html`}}function de(e,t){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,r.click(),window.setTimeout(()=>URL.revokeObjectURL(n),6e4)}function z(){return{correct:0,incorrect:0,unanswered:0,total:0}}function B(e,t){e.total++,e[t]++}function fe(e,t){let n=t[e.id];return n==null?`unanswered`:n===e.correctChoiceId?`correct`:`incorrect`}function pe(e){return e.total<=0?null:Math.round(e.correct/e.total*100)}function me(e){let t=z(),n=[],r=new Map,i=[],a=new Map,o=[],s=new Set(e.lockedParts),c=[],l=0;for(let u of e.parts){s.has(u.partId)||c.push(`${u.sectionTitle} ${u.partTitle}`);let d={sectionTitle:u.sectionTitle,partTitle:u.partTitle,...z()};o.push(d);let f=r.get(u.sectionId);f||(f={id:u.sectionId,title:u.sectionTitle,...z()},r.set(u.sectionId,f),n.push(f));for(let n of u.questions){let r=fe(n,e.answers);B(t,r),B(f,r),B(d,r);let o=a.get(n.category);o||(o={name:n.category,...z()},a.set(n.category,o),i.push(o)),B(o,r),l+=e.timeMs[n.id]??0}}return i.sort((e,t)=>(pe(e)??-1)-(pe(t)??-1)),{overall:t,sections:n,categories:i,parts:o,timeMs:l,complete:c.length===0,unsubmittedParts:c}}var he=4,ge=500,_e=ge*4,ve=300*1e3,ye=8e3,be=44,xe=736,Se=340;function V(e,t){return e.querySelector(t)}function H(e,t){return Array.from(e.querySelectorAll(t))}function U(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Ce(){let r=document.getElementById(`test-runner`);if(!r||r.dataset.initialized===`1`)return;r.dataset.initialized=`1`;let i=V(r,`#opt-test-meta`);if(!i||!i.textContent)return;let a=JSON.parse(i.textContent);if(!a.parts.length)return;let o=r.dataset.mode===`browse`,s=r.dataset.testsHref||`/`,c=`opt.test.${a.id}.${o?`browse.`:``}state`,m=[`opt.test.${a.id}.state`,`opt.test.${a.id}.browse.state`],h=!0;function _(e){if(!e||typeof e!=`object`)return!1;let t=e;return typeof t.v==`number`&&t.v>=1&&typeof t.partIndex==`number`&&typeof t.currentQid==`string`&&!!t.answers&&typeof t.answers==`object`&&Array.isArray(t.flags)&&!!t.timeMs&&typeof t.timeMs==`object`&&!!t.partTimerMs&&typeof t.partTimerMs==`object`&&Array.isArray(t.lockedParts)&&typeof t.completed==`boolean`}function v(e){if((!e.eliminated||typeof e.eliminated!=`object`)&&(e.eliminated={}),(typeof e.eliminatorOn!=`boolean`||e.v<4)&&(e.eliminatorOn=!0),e.v<4)for(let[t,r]of Object.entries(e.answers))n(e,t,r);return(!e.highlights||typeof e.highlights!=`object`)&&(e.highlights={}),typeof e.timerHidden!=`boolean`&&(e.timerHidden=!1),Array.isArray(e.warnedParts)||(e.warnedParts=[]),Array.isArray(e.seenSections)||(e.seenSections=[]),Array.isArray(e.revealed)||(e.revealed=[]),e.v<he&&(e.v=he),e}function y(){try{let e=localStorage.getItem(c);if(!e)return null;let t=JSON.parse(e);return _(t)?v(t):null}catch{return null}}function b(){if(!(k||re))try{localStorage.setItem(c,JSON.stringify(C))}catch{if(h){h=!1;let e=V(r,`[data-role="storage-warning"]`);e&&(e.hidden=!1)}}}function ee(e){e.partIndex=Math.max(0,Math.min(e.partIndex,a.parts.length-1));let t=a.parts[e.partIndex];return t.questions.some(t=>t.id===e.currentQid)||(e.currentQid=t.questions[0].id),e}let te=a.parts[0],ne=y(),C=ne?ee(ne):{v:he,partIndex:0,currentQid:te.questions[0].id,answers:{},flags:[],timeMs:{},partTimerMs:{},lockedParts:[],paused:!1,completed:!1,startedAt:Date.now(),eliminated:{},eliminatorOn:!0,highlights:{},timerHidden:!1,warnedParts:[],seenSections:[],revealed:[]},w=!1,T=C.partIndex,E=!1,D=!1,O=!1,k=!o&&ne===null,re=!1;function A(e){return w||o&&C.revealed.includes(e)}function ie(){return w||o}let j={partTitle:V(r,`[data-role="part-title"]`),timer:V(r,`[data-role="timer"]`),timerToggle:V(r,`[data-action="hide-timer"]`),live:V(r,`[data-role="live"]`),toast:V(r,`[data-role="toast"]`),pauseBtn:V(r,`[data-action="pause"]`),printBlankBtn:V(r,`[data-action="print-blank"]`),printSubtitle:V(r,`[data-role="print-subtitle"]`),pauseOverlay:V(r,`[data-role="pause-overlay"]`),resumeBtn:V(r,`[data-action="resume"]`),startOverlay:V(r,`[data-role="start-overlay"]`),browseProgress:V(r,`[data-role="browse-progress"]`),startBody:V(r,`[data-role="start-body"]`),startBtn:V(r,`[data-action="start"]`),grid:V(r,`[data-role="grid"]`),toolbar:V(r,`[data-role="toolbar"]`),elimBtn:V(r,`[data-action="eliminator"]`),clearHlBtn:V(r,`[data-action="clear-highlights"]`),refBtn:V(r,`[data-action="reference"]`),refPanel:V(r,`[data-role="ref-panel"]`),dirBtn:V(r,`[data-action="directions"]`),dirPanel:V(r,`[data-role="dir-panel"]`),checkwork:V(r,`[data-role="checkwork"]`),checkworkTitle:V(r,`[data-role="checkwork-title"]`),checkworkSummary:V(r,`[data-role="checkwork-summary"]`),checkworkGrid:V(r,`[data-role="checkwork-grid"]`),backToQuestionsBtn:V(r,`[data-action="back-to-questions"]`),nextLabel:V(r,`[data-role="next-label"]`),nextArrow:V(r,`[data-role="next-arrow"]`),questionArea:V(r,`.tr-question-area`),hlPopover:V(r,`[data-role="hl-popover"]`),hlAction:V(r,`[data-role="hl-action"]`),flagBtn:V(r,`[data-action="flag"]`),prevBtn:V(r,`[data-action="prev"]`),nextBtn:V(r,`[data-action="next"]`),submitBtn:V(r,`[data-role="submit"]`),submitSideBtn:V(r,`[data-role="submit-side"]`),progress:V(r,`[data-role="progress"]`),stepper:V(r,`[data-role="stepper"]`),results:V(r,`[data-role="results"]`),body:V(r,`.tr-body`),navbar:V(r,`.tr-navbar`),navbarTop:V(r,`.tr-navbar-top`),sidebar:V(r,`.tr-sidebar`),topbar:V(r,`.tr-topbar`),modal:V(r,`[data-role="modal"]`),modalTitle:V(r,`[data-role="modal-title"]`),modalBody:V(r,`[data-role="modal-body"]`),modalConfirm:V(r,`[data-role="modal-confirm"]`),modalCancel:V(r,`[data-role="modal-cancel"]`)},ae=H(r,`.tr-question`),oe=H(r,`.tr-step`),M=new Map,se=new Map;a.parts.forEach((e,t)=>{for(let n of e.questions)M.set(n.id,n),se.set(n.id,t)});function N(){return a.parts[C.partIndex]}function P(){return a.parts[T]}function F(){return C.partIndex>=a.parts.length-1}function ce(e){return(e.timeLimitMinutes??0)*6e4}function I(e){return C.partTimerMs[e.partId]??(C.partTimerMs[e.partId]=a.timerMode===`countdown`?ce(e):0),C.partTimerMs[e.partId]}let L=null;function le(){return!o&&!k&&!C.paused&&!C.completed&&!w&&!D}function R(e=document.visibilityState===`visible`){if(L==null)return;let t=Date.now(),n=t-L;if(L=t,n<=0)return;if(e){let e=C.currentQid;C.timeMs[e]=(C.timeMs[e]??0)+Math.min(n,_e)}let r=N();I(r),a.timerMode===`countdown`?C.partTimerMs[r.partId]=Math.max(0,C.partTimerMs[r.partId]-n):C.partTimerMs[r.partId]+=n}function z(){le()?L??=Date.now():(R(),L=null)}function B(e,t){let n=t===`ceil`?Math.ceil(e/1e3):Math.floor(e/1e3),r=Math.floor(n/3600),i=Math.floor(n%3600/60),a=n%60,o=r>0?String(i).padStart(2,`0`):String(i),s=String(a).padStart(2,`0`);return r>0?`${r}:${o}:${s}`:`${o}:${s}`}function Ce(){if(w||o){j.timer.textContent=``,j.timer.hidden=!0;return}j.timer.hidden=C.timerHidden;let e=I(N());a.timerMode===`countdown`?(j.timer.textContent=B(e,`ceil`),j.timer.classList.toggle(`is-low`,e<=6e4)):j.timer.textContent=B(e,`floor`)}function we(e){return a.timerMode===`countdown`&&ce(e)>0}let Te=0,Ee=0,W=null;function De(e,t=``){t!==``&&W!==null&&W!==t||(window.clearTimeout(Ee),W=t,j.live.textContent=``,Ee=window.setTimeout(()=>{j.live.textContent=e,W=null},30))}function Oe(e){W===e&&(window.clearTimeout(Ee),W=null,j.live.textContent=``)}function ke(e){j.toast.textContent=e,j.toast.hidden=!1,window.clearTimeout(Te),Te=window.setTimeout(()=>{j.toast.hidden=!0},ye)}let Ae=Date.now();function je(){if(R(),Ce(),le()&&we(N())){let e=N(),t=C.partTimerMs[e.partId]??0;if(document.visibilityState===`visible`&&t>0&&t<=ve&&ce(e)>ve&&!C.warnedParts.includes(e.partId)&&(C.warnedParts.push(e.partId),b(),De(`Five minutes remain in this module.`),ke(`5 minutes remaining`)),t<=0){Je(!0);return}}let e=Date.now();e-Ae>=2e3&&(Ae=e,le()&&b())}function Me(e){return ae.find(t=>t.dataset.qid===e)}function Ne(){return P().questions.findIndex(e=>e.id===C.currentQid)}function Pe(e,n,r=w){let i=C.answers[n],a=r?M.get(n)?.correctChoiceId:void 0;H(e,`.tr-choice`).forEach((e,t)=>{let n=e.dataset.choiceId;e.setAttribute(`aria-checked`,i===n?`true`:`false`),e.classList.remove(`is-correct`,`is-wrong`);let s=w||o&&r;e.disabled=s,s?e.tabIndex=-1:e.tabIndex=(i?i===n:t===0)?0:-1,r&&(n===a?e.classList.add(`is-correct`):n===i&&e.classList.add(`is-wrong`))}),t(e,C,n,C.eliminatorOn&&!r)}function Fe(e){let t=C.answers[e.id],n=`Correct answer: ${e.correctChoiceId}.`;return o?t==null?n:`${n} ${Ie(e,t)}`:`${n} ${Ie(e,t)} Time on this question: ${B(C.timeMs[e.id]??0,`floor`)}.`}function Ie(e,t){return t==null?`You did not answer this question.`:t===e.correctChoiceId?`Correct.`:`Incorrect. You chose ${t}.`}function Le(e,t,n){e.innerHTML=``,t.questions.forEach((t,r)=>{let i=document.createElement(`button`);i.type=`button`,i.className=`tr-grid-cell`,i.textContent=String(r+1),i.dataset.qid=t.id;let a=C.answers[t.id]!=null,o=C.flags.includes(t.id),s=`Question ${r+1}`;if(a&&A(t.id)){let e=C.answers[t.id]===t.correctChoiceId;i.classList.add(e?`is-correct`:`is-incorrect`),s+=e?`, correct`:`, incorrect`}else a?(i.classList.add(`is-answered`),s+=`, answered`):s+=`, not answered`;o&&(i.classList.add(`is-flagged`),s+=`, flagged`),n&&t.id===C.currentQid&&(i.classList.add(`is-current`),s+=`, current`),i.setAttribute(`aria-label`,s),i.addEventListener(`click`,()=>{R(),E=!1,C.currentQid=t.id,G(),b()}),e.appendChild(i)})}function Re(){Le(j.grid,P(),!0)}function ze(){let e=P().partId;oe.forEach((t,n)=>{let r=a.parts[n],i=!o&&C.lockedParts.includes(r.partId),s=r.partId===e;t.classList.toggle(`is-locked`,i),t.classList.toggle(`is-current`,s),t.classList.toggle(`is-upcoming`,!o&&!i&&!s),s?t.setAttribute(`aria-current`,`step`):t.removeAttribute(`aria-current`);let c=[];i&&c.push(`submitted`),s&&c.push(`current`),!o&&!i&&!s&&c.push(`not started yet`);let l=w?`Review: `:o?`Go to `:``,u=V(t,`[data-role="step-state"]`);u&&(u.textContent=`${l}${r.sectionTitle}, ${r.partTitle}, step ${n+1} of ${a.parts.length}`+(c.length?`, ${c.join(`, `)}`:``));let d=V(t,`.tr-step-num`);d&&(d.textContent=i?`✓`:d.dataset.num??String(n+1))})}function Be(){let e=N();j.checkworkTitle.textContent=`Check your work: ${e.sectionTitle}, ${e.partTitle}`;let t=e.questions.length,n=e.questions.filter(e=>C.answers[e.id]!=null).length,r=e.questions.filter(e=>C.flags.includes(e.id)).length;j.checkworkSummary.textContent=`${n} of ${t} answered, ${r} flagged. Select a question to go back to it, or submit this module.`,Le(j.checkworkGrid,e,!1)}function Ve(){if(!j.dirPanel)return;let e=P().sectionId;for(let t of H(j.dirPanel,`.tr-directions`))t.hidden=t.dataset.section!==e}function G(){let e=P();Z(),j.checkwork.hidden=!E,j.questionArea.hidden=E,j.sidebar.hidden=E,E&&Be(),ae.forEach(e=>{e.hidden=e.dataset.qid!==C.currentQid});let t=Me(C.currentQid);if(t){g(t,C.highlights[C.currentQid]??[]);let e=A(C.currentQid);Pe(t,C.currentQid,e);let n=V(t,`[data-role="explanation"]`);if(n&&(n.hidden=!e,e)){let e=M.get(C.currentQid),t=V(n,`[data-role="answer-line"]`);t&&(t.textContent=Fe(e))}let r=V(t,`[data-action="reveal"]`);r&&(r.textContent=e?`Reset this question`:`Show solution`)}if(j.browseProgress){let t=e.questions.filter(e=>C.answers[e.id]!=null).length;j.browseProgress.textContent=`${t} of ${e.questions.length} answered in this module`}j.partTitle.textContent=w?`Review: ${e.sectionTitle}, ${e.partTitle}`:`${e.sectionTitle}, ${e.partTitle}`,Ce();let n=w||o;j.timerToggle.hidden=n,j.timerToggle.textContent=C.timerHidden?`Show timer`:`Hide timer`,j.pauseBtn.hidden=n;let r=C.flags.includes(C.currentQid);j.flagBtn.setAttribute(`aria-pressed`,r?`true`:`false`),j.flagBtn.textContent=r?`Flagged`:`Flag for review`,j.submitSideBtn.hidden=n,j.elimBtn.hidden=w||E,j.elimBtn.setAttribute(`aria-pressed`,C.eliminatorOn?`true`:`false`),j.clearHlBtn.hidden=w||E||!f(C,C.currentQid),j.refBtn&&(j.refBtn.hidden=!e.referenceSheet),j.dirBtn&&(j.dirBtn.hidden=!e.hasDirections),Ve(),j.toolbar.hidden=j.elimBtn.hidden&&j.clearHlBtn.hidden&&(!j.refBtn||j.refBtn.hidden)&&(!j.dirBtn||j.dirBtn.hidden);let i=Ne();if(E){j.progress.textContent=`Check your work`,j.prevBtn.disabled=!1,j.nextBtn.disabled=!0,j.nextLabel.textContent=`Next`,j.nextArrow.hidden=!1,ze(),He(e);return}j.progress.textContent=`Question ${i+1} of ${e.questions.length}`;let s=i===e.questions.length-1,c=!w&&!o&&s;if(j.nextLabel.textContent=c?`Review your work`:`Next`,j.nextArrow.hidden=c,ie()){let t=T===0&&i===0,n=T===a.parts.length-1&&i===e.questions.length-1;j.prevBtn.disabled=t,j.nextBtn.disabled=n}else j.prevBtn.disabled=i===0,j.nextBtn.disabled=!1;j.navbar.hidden=!w,Re(),ze(),He(e)}function He(e){!jt||!j.dirBtn||w||o||k||C.completed||C.paused||!e.hasDirections||C.seenSections.includes(e.sectionId)||(C.seenSections.push(e.sectionId),b(),jt.open(j.dirBtn))}let K=null;function Ue(){w||o||E||(R(),K=C.currentQid,E=!0,G(),Y(j.checkworkTitle))}function We(){E&&(E=!1,K&&M.has(K)&&(C.currentQid=K),K=null,G(),Y(j.partTitle))}function Ge(e){let t=P(),n=Ne()+e;R();let r=null;if(n>=0&&n<t.questions.length)C.currentQid=t.questions[n].id;else if(ie()){let t=T+e;if(t>=0&&t<a.parts.length){r=document.activeElement,Mt(),T=t;let n=a.parts[t].questions;C.currentQid=e>0?n[0].id:n[n.length-1].id,o&&(C.partIndex=t)}}G(),r&&(r.focus(),document.activeElement!==r&&Y(j.partTitle)),b()}function Ke(e){if(w)return;let t=e.target.closest(`.tr-choice`);if(!t)return;let r=e.key;if(r!==`ArrowDown`&&r!==`ArrowRight`&&r!==`ArrowUp`&&r!==`ArrowLeft`)return;let i=Me(C.currentQid);if(!i)return;let a=H(i,`.tr-choice`),o=a.indexOf(t);if(o<0)return;e.preventDefault();let s=a[(o+(r===`ArrowDown`||r===`ArrowRight`?1:-1)+a.length)%a.length],c=s.dataset.choiceId;C.answers[C.currentQid]=c,n(C,C.currentQid,c),Oe(`answer-cleared`),G(),s.focus(),b()}function qe(){return N().questions.filter(e=>C.answers[e.id]==null).length}function Je(e=!1){if(o)return;let t=N();if(R(),Mt(),C.lockedParts.includes(t.partId)||C.lockedParts.push(t.partId),F()){Ze();return}C.partIndex+=1,T=C.partIndex,E=!1,C.currentQid=N().questions[0].id,I(N()),L=null,z(),G(),Xe(),b(),e&&Kt(`Time is up`,`Time expired for that part, so it was submitted automatically. Now starting ${N().sectionTitle}, ${N().partTitle}.`)}function Ye(){let e=qe(),t=F(),n=(e>0?`You have ${e} unanswered question${e===1?``:`s`} in this module. `:``)+`A submitted module cannot be reopened.`+(t?` This is the final module, so you will see your results next.`:``);Gt(t?`Submit and see results?`:`Submit this module?`,n,t?`Submit and see results`:`Submit this module`,()=>Je(!1))}function Xe(){let e=F()?`Submit and see results`:`Submit this module`;j.submitBtn.textContent=e,j.submitSideBtn.textContent=e}function Ze(){C.completed=!0,L=null,b(),ut()}function Qe(){return me({parts:a.parts,answers:C.answers,lockedParts:C.lockedParts,timeMs:C.timeMs})}function $e(e){let t=pe(e);return t===null?`n/a`:`${t}%`}function et(e){return fe(e,C.answers)}function tt(e){return e===`correct`?`Correct`:e===`incorrect`?`Incorrect`:`Unanswered`}function nt(e){let t=e.questions.map(e=>C.timeMs[e.id]??0),n=t.reduce((e,t)=>e+t,0);return e.questions.map((e,r)=>({q:e,idx:r,ms:t[r],status:et(e),pct:n>0?Math.round(t[r]/n*100):0}))}let rt=`answering time`;function it(e){let t=e.q.preview?`${e.q.preview} `:``;return`Question ${e.idx+1}, ${e.q.category}. ${t}Time ${B(e.ms,`floor`)}, ${tt(e.status)}, ${e.pct}% of ${rt}. Activate to review this question.`}function at(e,t,n,r){return{h:`Question ${t+1}, ${e.category}`,p:e.preview??``,m:`${B(r,`floor`)}, ${n}% of ${rt}, ${tt(et(e))}`}}function ot(e,t,n,r){let i=at(e,t,n,r),a=(e,t)=>{let n=document.createElement(`div`);return n.className=e,n.textContent=t,n},o=[a(`tr-tip-head`,i.h)];return i.p&&o.push(a(`tr-tip-text`,i.p)),o.push(a(`tr-tip-meta`,i.m),a(`tr-tip-cta`,`Click to review`)),o}function st(e,t,n){let r=parseFloat(getComputedStyle(e).getPropertyValue(`--tr-tip-gap`))||8,i=t.getBoundingClientRect(),a=i.left+t.clientLeft,o=i.top+t.clientTop,s=t.clientWidth,c=e.offsetWidth/2,l=n.left+n.width/2-a,u=c+4,d=s-c-4;e.style.left=`${u>d?s/2:Math.min(Math.max(l,u),d)}px`,e.style.top=`${n.top-o}px`,e.classList.toggle(`is-below`,n.top-e.offsetHeight-r<0)}function ct(e,t){let n=t.length;if(n===0)return``;let r=Math.max(1,...t.map(e=>e.ms)),i=Math.min(xe-44-8,Math.max(Se-44-8,n*58)),a=44+i+8,o=i/n,s=Math.max(.75,Math.min(be,o-1)),c=n>20?7:n>10?8.5:10,l=n>20?7.5:n>10?9:11,u=e=>e===`correct`?`var(--color-correct)`:e===`incorrect`?`var(--color-incorrect)`:`var(--color-unanswered)`,d=t.map((e,t)=>{let n=e.q,i=e.ms/r*150,a=44+t*o,d=a+(o-s)/2,f=178-i,p=a+o/2,m=e.pct,h=f-6,g=e.status===`unanswered`?` stroke="var(--color-border)" stroke-width="1"`:``,_=it(e),v=`<rect class="tr-bar-hit" x="${a.toFixed(2)}" y="28" width="${o.toFixed(2)}" height="150" />`,y=`<rect class="tr-bar-rect" x="${d.toFixed(2)}" y="${f.toFixed(2)}" width="${s.toFixed(2)}" height="${i.toFixed(2)}" fill="${u(e.status)}"${g} />`,b=`<text x="${p.toFixed(2)}" y="${h.toFixed(2)}" text-anchor="middle" font-size="${l}" fill="var(--color-muted)">${m}%</text>`,ee=`<text x="${p.toFixed(2)}" y="${190 .toFixed(2)}" text-anchor="middle" font-size="${c}" fill="var(--color-muted)">${t+1}</text>`;return`<g class="tr-bar" role="button" tabindex="${t===0?`0`:`-1`}" data-qid="${U(n.id)}" data-idx="${t}" data-pct="${m}" aria-label="${U(_)}">${v}${y}${b}${ee}</g>`}).join(``);return`<svg width="${a}" height="204" viewBox="0 0 ${a} 204" role="group" aria-label="${U(`Per-question time for ${e.sectionTitle}, ${e.partTitle}, colored by whether the answer was correct, incorrect, or left unanswered`)}">
      <line x1="44" y1="178" x2="${a-8}" y2="178" stroke="var(--color-border)" stroke-width="1" aria-hidden="true" />
      <text x="38" y="32" text-anchor="end" font-size="11" fill="var(--color-muted)" aria-hidden="true">${B(r,`ceil`)}</text>
      <text x="38" y="178" text-anchor="end" font-size="11" fill="var(--color-muted)" aria-hidden="true">0:00</text>
      ${d}
    </svg>`}function lt(e){return e.map(e=>{let t=`<button type="button" class="tr-row-btn" tabindex="${e.idx===0?`0`:`-1`}" aria-label="${U(it(e))}">${e.idx+1}</button>`;return`<tr class="tr-time-row" data-qid="${U(e.q.id)}" data-idx="${e.idx}" data-pct="${e.pct}"><td>${t}</td><td>${U(e.q.category)}</td><td>${tt(e.status)}</td><td class="num">${B(e.ms,`floor`)}</td></tr>`}).join(``)}function ut(){w=!1,E=!1,Mt(),j.checkwork.hidden=!0,j.questionArea.hidden=!1,j.sidebar.hidden=!1;let{overall:e,sections:t,categories:n,parts:r,timeMs:i,complete:o,unsubmittedParts:s}=Qe();j.topbar.hidden=!0,j.stepper.hidden=!0,j.toolbar.hidden=!0,j.navbarTop.hidden=!0,j.body.hidden=!0,j.navbar.hidden=!0,j.results.hidden=!1;let c=(e,t)=>`<tr><td>${U(e)}</td><td class="num">${t.correct}</td><td class="num">${t.incorrect}</td><td class="num">${t.unanswered}</td><td class="num">${t.total}</td><td class="num">${$e(t)}</td></tr>`,l=t.map(e=>c(e.title,e)).join(``),u=n.map(e=>c(e.name,e)).join(``),d=r.map(e=>`
          <div class="tr-score-module">
            <div class="tr-score-module-name">${U(e.sectionTitle)}, ${U(e.partTitle)}</div>
            <div class="tr-score-module-score">${e.correct} / ${e.total}</div>
            <div class="tr-score-module-pct">${$e(e)}</div>
            ${e.unanswered>0?`<div class="tr-score-module-skip">${e.unanswered} unanswered</div>`:``}
          </div>`).join(``),f=`
        <div class="tr-score-big">${e.correct} / ${e.total}</div>
        <div class="tr-score-sub">${$e(e)} correct</div>
        <ul class="tr-score-split" role="list">
          <li><span class="tr-swatch is-correct" aria-hidden="true"></span>${e.correct} correct</li>
          <li><span class="tr-swatch is-incorrect" aria-hidden="true"></span>${e.incorrect} incorrect</li>
          <li><span class="tr-swatch is-unanswered" aria-hidden="true"></span>${e.unanswered} unanswered</li>
        </ul>
        <div class="tr-score-caption">Total active time ${B(i,`floor`)}</div>`,p=o?``:`<p class="tr-score-note" role="status">This attempt is not finished. ${U(s.join(`, `))} ${s.length===1?`was`:`were`} never submitted. The counts below still cover every question in the test, so
        anything you did not reach is counted as unanswered.</p>`,m=a.lessonLinks??{},h=n.filter(e=>e.incorrect+e.unanswered>0&&m[e.name]).slice(0,3).map(e=>{let t=[e.incorrect>0?`${e.incorrect} wrong`:``,e.unanswered>0?`${e.unanswered} unanswered`:``].filter(Boolean).join(` and `);return`
          <li class="tr-next-item">
            <a class="tr-btn" href="${U(m[e.name].href)}">${U(m[e.name].label)}</a>
            <span class="tr-next-why">${t} of ${e.total} in ${U(e.name)}.</span>
          </li>`}).join(``),g=e.total>0&&e.correct===e.total?`<div><h2>Review next</h2>
             <p class="tr-score-note">You answered every question correctly.</p></div>`:h?`<div><h2>Review next</h2>
               <ul class="tr-next-list" role="list">${h}</ul></div>`:``,_=`
      <div class="tr-modal-actions tr-results-actions tr-noprint">
        <button type="button" class="tr-btn tr-btn-primary" data-role="review">Review answers</button>
        <button type="button" class="tr-btn" data-role="print-report">
          <svg class="tr-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>Generate PDF report
        </button>
        <button type="button" class="tr-btn" data-role="archive">
          <svg class="tr-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg><span data-role="archive-label">${Tt}</span>
        </button>
        <button type="button" class="tr-btn" data-role="reset">Reset this test</button>
      </div>
    `;j.results.innerHTML=`
      <div class="tr-score-hero" tabindex="-1">
        ${f}
        <div class="tr-score-modules">${d}</div>
        ${p}
        <p class="tr-score-note">The three levels are not the same difficulty, so
       the same percentage on an introductory test and on an advanced one does not mean the same
       thing.</p>
      </div>
      ${_}
      ${g}
      <div>
        <h2 id="tr-h-section">By section</h2>
        <div class="tr-table-scroll" tabindex="0" role="region" aria-labelledby="tr-h-section">
          <table class="tr-table">
            <thead><tr><th>Section</th><th class="num">Correct</th><th class="num">Incorrect</th><th class="num">Unanswered</th><th class="num">Questions</th><th class="num">Percent</th></tr></thead>
            <tbody>${l}</tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 id="tr-h-category">By category</h2>
        <div class="tr-table-scroll" tabindex="0" role="region" aria-labelledby="tr-h-category">
          <table class="tr-table">
            <thead><tr><th>Category</th><th class="num">Correct</th><th class="num">Incorrect</th><th class="num">Unanswered</th><th class="num">Questions</th><th class="num">Percent</th></tr></thead>
            <tbody>${u}</tbody>
          </table>
        </div>
        <p class="tr-score-note">Read the question count beside each percentage. A category with
          only a few questions on this test cannot tell you much on its own.</p>
      </div>
      <div>
        <h2>Time per question</h2>
        <ul class="tr-legend tr-chart-legend">
          <li><span class="tr-swatch is-correct" aria-hidden="true"></span> Correct</li>
          <li><span class="tr-swatch is-incorrect" aria-hidden="true"></span> Incorrect</li>
          <li><span class="tr-swatch is-unanswered" aria-hidden="true"></span> Unanswered</li>
        </ul>
        <div class="tr-chart-list">
          ${a.parts.map(e=>{let t=nt(e);return`
            <div class="tr-chart-block">
              <h3 class="tr-chart-title">${U(e.sectionTitle)}, ${U(e.partTitle)}</h3>
              <div class="tr-chart">${ct(e,t)}</div>
              <table class="tr-table">
                <thead><tr><th>#</th><th>Category</th><th>Result</th><th class="num">Time</th></tr></thead>
                <tbody>${lt(t)}</tbody>
              </table>
              <div class="tr-chart-tip tr-noprint" aria-hidden="true" hidden></div>
            </div>
          `}).join(``)}
        </div>
      </div>
      ${_}
    `;for(let e of H(j.results,`.tr-chart-block`))ht(e);for(let e of H(j.results,`[data-role="review"]`))e.addEventListener(`click`,()=>gt());for(let e of H(j.results,`[data-role="print-report"]`))e.addEventListener(`click`,St);for(let e of H(j.results,`[data-role="archive"]`))e.addEventListener(`click`,()=>{Dt(e)});for(let e of H(j.results,`[data-role="reset"]`))e.addEventListener(`click`,vt);dt()}function dt(){for(let e of H(j.results,`[data-role="archive"]`))e.disabled=O,V(e,`[data-role="archive-label"]`).textContent=O?Et:Tt}function q(e){return e instanceof Element?e.closest(`.tr-bar, .tr-time-row`):null}function ft(e){return(e.classList.contains(`tr-bar`)?V(e,`.tr-bar-rect`)??e:e).getBoundingClientRect()}function pt(e){return e.classList.contains(`tr-bar`)?e:V(e,`.tr-row-btn`)}function mt(e){let t=se.get(e);t!=null&&gt({partIndex:t,qid:e})}function ht(e){let t=V(e,`.tr-chart-tip`);if(!t)return;let n=[H(e,`.tr-bar`),H(e,`.tr-time-row`)],r=()=>{t.hidden=!0},i=(e,t)=>{for(let n of e){let e=pt(n);e&&e.setAttribute(`tabindex`,n===t?`0`:`-1`)}},a=(e,t)=>{let n=e[Math.min(e.length-1,Math.max(0,t))];n&&(i(e,n),pt(n)?.focus())},o=n=>{let r=n.dataset.qid,i=r==null?void 0:M.get(r);if(!i)return;let a=Number(n.dataset.idx??0),o=Number(n.dataset.pct??0);t.replaceChildren(...ot(i,a,o,C.timeMs[i.id]??0)),t.hidden=!1,st(t,e,ft(n))};e.addEventListener(`click`,e=>{let t=q(e.target)?.dataset.qid;t&&mt(t)}),e.addEventListener(`keydown`,e=>{let t=q(e.target);if(!t)return;let r=n.find(e=>e.includes(t));if(!r)return;let i=r.indexOf(t),o=t.dataset.qid;e.key===`Enter`||e.key===` `?(e.preventDefault(),o&&mt(o)):e.key===`ArrowRight`||e.key===`ArrowDown`?(e.preventDefault(),a(r,i+1)):e.key===`ArrowLeft`||e.key===`ArrowUp`?(e.preventDefault(),a(r,i-1)):e.key===`Home`?(e.preventDefault(),a(r,0)):e.key===`End`&&(e.preventDefault(),a(r,r.length-1))}),e.addEventListener(`pointerover`,e=>{let t=q(e.target);t&&t!==q(e.relatedTarget)&&o(t)}),e.addEventListener(`pointerout`,e=>{let t=q(e.target);t&&t!==q(e.relatedTarget)&&r()}),e.addEventListener(`focusin`,e=>{let t=q(e.target);if(!t)return;let r=n.find(e=>e.includes(t));r&&i(r,t),o(t)}),e.addEventListener(`focusout`,r),e.addEventListener(`mouseleave`,r)}let J=null;function Y(e){e?.focus({preventScroll:!0})}function gt(e){w=!0,E=!1,T=e?e.partIndex:0,C.currentQid=e?e.qid:a.parts[0].questions[0].id,j.results.hidden=!0,j.topbar.hidden=!1,j.stepper.hidden=!1,j.navbarTop.hidden=!1,j.body.hidden=!1,j.navbar.hidden=!1,j.timer.hidden=!0,j.flagBtn.hidden=!0,J||(J=document.createElement(`button`),J.type=`button`,J.className=`tr-btn tr-btn-primary`,J.textContent=`Back to results`,J.addEventListener(`click`,_t),j.navbar.appendChild(J)),J.hidden=!1,G(),Y(j.partTitle),window.scrollTo(0,0)}function _t(){w=!1,j.timer.hidden=!1,j.flagBtn.hidden=!1,J&&(J.hidden=!0),ut(),Y(V(j.results,`.tr-score-hero`)),window.scrollTo(0,0)}function vt(){Gt(`Reset this test?`,`This clears your answers, flags, timing, and results for this test and cannot be undone. If you want a copy, use Generate PDF report or Download interactive report first. You will go back to the tests page.`,`Clear and reset`,()=>{re=!0;try{for(let e of m)localStorage.removeItem(e)}catch{}window.location.assign(s)})}function yt(){for(let e of a.parts)for(let t of e.questions){let e=Me(t.id);if(!e)continue;Pe(e,t.id,!0);let n=V(e,`[data-role="explanation"]`),r=n&&V(n,`[data-role="answer-line"]`);r&&(r.textContent=Fe(t))}}let bt=`Blank test, no answers`;function xt(){return`Results report, generated ${new Date().toLocaleDateString(void 0,{year:`numeric`,month:`long`,day:`numeric`})}`}function St(){yt(),j.printSubtitle.textContent=xt(),r.dataset.printing=`report`,window.print()}function Ct(){let e={};for(let t of a.parts)for(let n of nt(t))e[n.q.id]=at(n.q,n.idx,n.pct,n.ms);return e}let wt=`Could not build the report file. Generate PDF report still works.`,Tt=`Download interactive report`,Et=`Building`;async function Dt(e){if(O)return;let t=H(j.results,`[data-role="archive"]`).indexOf(e);O=!0;try{dt(),yt();let{blob:e,filename:n}=await ue({subtitle:xt(),testId:a.id,cta:`Click to jump to this question`,tips:Ct()});if(de(e,n),O=!1,dt(),D){let e=`Report sent to your downloads as ${n}.`;ke(e),De(e)}else H(j.results,`[data-role="archive"]`)[t]?.focus(),Kt(`Report sent to your downloads`,`Your browser is saving it as ${n}. If it asks where to put the file, pick a folder. It holds the whole attempt: every question, your answer against the correct one, the explanations, and the timing charts. Open it in any browser, online or off.`)}catch(e){let t=e instanceof S?` ${e.reason}`:``;ke(wt+t),De(wt+t)}finally{O=!1,dt()}}function Ot(){j.printSubtitle.textContent=bt,delete r.dataset.printing,window.print()}let kt=[];function At(e,t,n,r){let i=x({panel:e,head:V(e,`[data-role="${r}-head"]`),move:V(e,`[data-role="${r}-move"]`),close:V(e,`[data-role="${r}-close"]`),id:n});return kt.push(i),t.addEventListener(`click`,()=>{i.isOpen()?i.close():i.open(t)}),new MutationObserver(()=>t.setAttribute(`aria-expanded`,i.isOpen()?`true`:`false`)).observe(e,{attributes:!0,attributeFilter:[`hidden`]}),i}j.refPanel&&j.refBtn&&At(j.refPanel,j.refBtn,`reference`,`ref`);let jt=j.dirPanel&&j.dirBtn?At(j.dirPanel,j.dirBtn,`directions`,`dir`):null;function Mt(){for(let e of kt)e.close()}let X=null;function Z(){j.hlPopover.hidden||(j.hlPopover.hidden=!0,X=null)}function Nt(e,t,n,r){X=n,j.hlAction.textContent=t,j.hlPopover.hidden=!1;let i=j.questionArea.getBoundingClientRect(),a=j.hlPopover.offsetWidth,o=j.hlPopover.offsetHeight,s=Math.max(0,Math.min(e.left+e.width/2-i.left-a/2,j.questionArea.clientWidth-a)),c=e.top-o-6<0?e.bottom-i.top+6:e.top-i.top-o-6;j.hlPopover.style.left=`${s}px`,j.hlPopover.style.top=`${c}px`,r&&j.hlAction.focus()}function Pt(e){if(w){Z();return}let t=Me(C.currentQid),n=t&&l(t);if(!n){Z();return}Nt(window.getSelection().getRangeAt(0).getBoundingClientRect(),`Highlight`,{kind:`add`,range:n},e)}j.body.addEventListener(`pointerup`,e=>{let t=e.target;if(j.hlPopover.contains(t))return;let n=t.closest(`mark.tr-hl`),r=window.getSelection();if(n&&(!r||r.isCollapsed)){if(w)return;Nt(n.getBoundingClientRect(),`Remove highlight`,{kind:`remove`,index:Number(n.dataset.hl)},!1);return}Pt(!1)}),j.body.addEventListener(`keyup`,e=>{e.key===`Shift`?Pt(!0):e.shiftKey&&Pt(!1)}),j.hlPopover.addEventListener(`keydown`,e=>{e.key===`Escape`&&(e.stopPropagation(),e.preventDefault(),Z(),Y(j.partTitle))}),j.hlAction.addEventListener(`click`,()=>{if(!X)return;let e=C.currentQid,t=j.hlPopover.contains(document.activeElement);X.kind===`add`?u(C,e,X.range):d(C,e,X.index),Z(),window.getSelection()?.removeAllRanges(),G(),b(),t&&Y(j.clearHlBtn.hidden?j.partTitle:j.clearHlBtn)}),j.clearHlBtn.addEventListener(`click`,()=>{p(C,C.currentQid),Z(),G(),b(),Y(j.partTitle)});let Ft=V(document,`.site-header`),It=V(document,`.site-footer`),Lt=[...Ft?[Ft]:[],...It?[It]:[],j.topbar,j.stepper,j.toolbar,j.navbarTop,j.body,j.navbar,j.results,...j.refPanel?[j.refPanel]:[],...j.dirPanel?[j.dirPanel]:[]];function Rt(e){for(let t of Lt)e?t.setAttribute(`inert`,``):t.removeAttribute(`inert`)}let Q=null,zt=null;function $(e,t){Q=document.activeElement,Rt(!0),zt=t,e.focus()}function Bt(){Rt(!1),zt=null,Q&&document.contains(Q)&&Q.focus(),Q=null}function Vt(){if(!j.startOverlay||!j.startBody||!j.startBtn)return;let e=a.parts[0],t=a.timerMode===`countdown`?e.timeLimitMinutes??0:0;j.startBody.textContent=t?`The first module is ${t} minutes, and the clock starts when you press "Start the test". You can pause any time.`:`The clock starts when you press "Start the test". You can pause any time.`,j.startOverlay.hidden=!1,$(j.startBtn,()=>{})}function Ht(){k&&(k=!1,j.startOverlay&&(j.startOverlay.hidden=!0),Bt(),C.startedAt=Date.now(),z(),Y(j.partTitle),He(N()),b())}function Ut(e){e!==C.paused&&(R(),C.paused=e,j.pauseOverlay.hidden=!e,e?(z(),$(j.resumeBtn,()=>Ut(!1))):(Bt(),z()),b())}function Wt(){j.modalConfirm.replaceWith(j.modalConfirm.cloneNode(!0)),j.modalCancel.replaceWith(j.modalCancel.cloneNode(!0)),j.modalConfirm=V(r,`[data-role="modal-confirm"]`),j.modalCancel=V(r,`[data-role="modal-cancel"]`)}function Gt(e,t,n,r){Wt(),j.modalTitle.textContent=e,j.modalBody.textContent=t,j.modalConfirm.textContent=n,j.modalCancel.hidden=!1,D=!0,z(),j.modal.hidden=!1;let i=()=>{j.modal.hidden=!0,D=!1,Bt(),z()};j.modalConfirm.addEventListener(`click`,()=>{i(),r()}),j.modalCancel.addEventListener(`click`,i),$(j.modalConfirm,i)}function Kt(e,t){Wt(),j.modalTitle.textContent=e,j.modalBody.textContent=t,j.modalConfirm.textContent=`OK`,j.modalCancel.hidden=!0,D=!0,z(),j.modal.hidden=!1;let n=()=>{j.modal.hidden=!0,D=!1,Bt(),z()};j.modalConfirm.addEventListener(`click`,n),$(j.modalConfirm,n)}j.body.addEventListener(`click`,t=>{let r=t.target,i=r.closest(`[data-action="reveal"]`);if(i){let e=i.dataset.qid;if(!o||e!==C.currentQid)return;let t=C.revealed.indexOf(e);t>=0?(C.revealed.splice(t,1),delete C.answers[e]):C.revealed.push(e),G(),b();return}let a=r.closest(`.tr-elim`);if(a){if(w)return;let t=a.dataset.qid;if(t!==C.currentQid)return;let n=a.dataset.choiceId;Oe(`answer-cleared`),e(C,t,n)&&C.answers[t]===n&&(delete C.answers[t],De(`Choice ${n} crossed out. Your answer is cleared.`,`answer-cleared`)),G(),b();return}let s=r.closest(`.tr-choice`);if(!s||w)return;let c=s.dataset.qid;if(c!==C.currentQid)return;let l=s.dataset.choiceId;if(o&&C.answers[c]===l){delete C.answers[c],G(),b();return}C.answers[c]=l,n(C,c,l),Oe(`answer-cleared`),G(),b()}),j.body.addEventListener(`keydown`,Ke),j.prevBtn.addEventListener(`click`,()=>{if(E){We();return}Ge(-1)}),j.nextBtn.addEventListener(`click`,()=>{if(E)return;let e=Ne();if(!w&&!o&&e===P().questions.length-1){Ue();return}Ge(1)}),j.backToQuestionsBtn.addEventListener(`click`,We),o&&j.stepper.addEventListener(`click`,e=>{let t=e.target.closest(`.tr-step-btn`);if(!t)return;let n=a.parts.findIndex(e=>e.partId===t.dataset.part);n<0||n===T||(Mt(),T=n,C.partIndex=n,C.currentQid=a.parts[n].questions[0].id,G(),Y(j.partTitle),b())}),j.timerToggle.addEventListener(`click`,()=>{C.timerHidden=!C.timerHidden,G(),b()}),j.flagBtn.addEventListener(`click`,()=>{let e=C.currentQid,t=C.flags.indexOf(e);t>=0?C.flags.splice(t,1):C.flags.push(e),G(),b()}),j.elimBtn.addEventListener(`click`,()=>{C.eliminatorOn=!C.eliminatorOn,G(),b()}),j.submitBtn.addEventListener(`click`,Ye),j.submitSideBtn.addEventListener(`click`,Ye),j.pauseBtn.addEventListener(`click`,()=>Ut(!0)),j.resumeBtn.addEventListener(`click`,()=>Ut(!1)),j.startBtn?.addEventListener(`click`,Ht),j.printBlankBtn.addEventListener(`click`,Ot);let qt=()=>{R(document.visibilityState!==`visible`),document.visibilityState===`visible`?je():b()},Jt=e=>{e.key===`Escape`&&zt&&(e.preventDefault(),zt())},Yt=()=>{let e=r.dataset.printing===`report`;delete r.dataset.printing,j.printSubtitle.textContent=bt,e&&Kt(`Your report went to the print dialog`,`If you picked Save as PDF, the file is wherever your browser puts downloads. If you closed the dialog, or sent it to a printer by mistake, press Generate PDF report again.`)};document.addEventListener(`visibilitychange`,qt),document.addEventListener(`keydown`,Jt),window.addEventListener(`afterprint`,Yt),o?(C.paused=!1,C.completed=!1,G()):(I(N()),Xe(),C.completed?ut():(G(),k?Vt():C.paused&&(j.pauseOverlay.hidden=!1,$(j.resumeBtn,()=>Ut(!1))),z())),b();let Xt=o?0:window.setInterval(je,ge),Zt=()=>{o||(R(),b()),window.clearInterval(Xt),window.clearTimeout(Te),document.removeEventListener(`visibilitychange`,qt),document.removeEventListener(`keydown`,Jt),window.removeEventListener(`afterprint`,Yt)};window.addEventListener(`pagehide`,Zt,{once:!0}),document.addEventListener(`astro:before-swap`,Zt,{once:!0})}Ce();