import{a as p,S as y,i as n}from"./assets/vendor-BLPZKqeQ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const f="50342970-c77e3a3b99b31ba7a45091d0e",g="https://pixabay.com/api/";function h(a){return p.get(g,{params:{key:f,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data).catch(t=>{throw console.error("Sorry, there are no images matching your search query. Please try again!",t),t})}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),b=new y(".gallery a",{captionsData:"alt",captionDelay:250});function L(a){const t=a.map(({webformatURL:i,largeImageURL:o,tags:e,likes:r,views:s,comments:d,downloads:m})=>`
    <div class="photo-card">
      <a class="gallery__item" href="${o}">
        <img class="gallery__image" src="${i}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${r}</p>
        <p><b>Views:</b> ${s}</p>
        <p><b>Comments:</b> ${d}</p>
        <p><b>Downloads:</b> ${m}</p>
      </div>
    </div>
  `).join("");c.insertAdjacentHTML("beforeend",t),b.refresh()}function q(){c.innerHTML=""}function S(){l.classList.remove("hidden")}function v(){l.classList.add("hidden")}const u=document.querySelector("#search-form"),P=u.querySelector('input[name="search-text"]');u.addEventListener("submit",async a=>{a.preventDefault();const t=P.value.trim();if(!t){n.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}q(),S();try{const o=(await h(t)).hits;o.length===0?n.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):L(o)}catch(i){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),console.error(i)}finally{v()}});
//# sourceMappingURL=index.js.map
