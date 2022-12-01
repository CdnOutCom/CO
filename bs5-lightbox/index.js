/*!
 * Lightbox for Bootstrap 5 v1.8.0 (https://trvswgnr.github.io/bs5-lightbox/)
 * Copyright 2022 Travis Aaron Wagner (https://github.com/trvswgnr/)
 * Licensed under MIT (https://github.com/trvswgnr/bs5-lightbox/blob/main/LICENSE)
 */!function(){"use strict";var t={d:function(e,s){for(var a in s)t.o(s,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:s[a]})},o:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}},e={};t.d(e,{default:function(){return i}});var s=window.bootstrap;const a={Modal:s.Modal,Carousel:s.Carousel};class o{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.hash=this.randomHash(),this.settings=Object.assign(Object.assign(Object.assign({},a.Modal.Default),a.Carousel.Default),{interval:!1,target:'[data-toggle="lightbox"]',gallery:"",size:"xl"}),this.modalOptions=(()=>this.setOptionsFromSettings(a.Modal.Default))(),this.carouselOptions=(()=>this.setOptionsFromSettings(a.Carousel.Default))(),"string"==typeof t&&(this.settings.target=t,t=document.querySelector(this.settings.target)),this.settings=Object.assign(Object.assign({},this.settings),e),this.el=t,this.type=t.dataset.type||"",this.src=this.getSrc(t),this.sources=this.getGalleryItems(),this.createCarousel(),this.createModal()}show(){document.body.appendChild(this.modalElement),this.modal.show()}hide(){this.modal.hide()}setOptionsFromSettings(t){return Object.keys(t).reduce(((t,e)=>Object.assign(t,{[e]:this.settings[e]})),{})}getSrc(t){let e=t.dataset.src||t.dataset.remote||t.href||"http://via.placeholder.com/1600x900";if("html"===t.dataset.type)return e;/\:\/\//.test(e)||(e=window.location.origin+e);const s=new URL(e);return(t.dataset.footer||t.dataset.caption)&&s.searchParams.set("caption",t.dataset.footer||t.dataset.caption),s.toString()}getGalleryItems(){let t;if(this.settings.gallery){if(Array.isArray(this.settings.gallery))return this.settings.gallery;t=this.settings.gallery}else this.el.dataset.gallery&&(t=this.el.dataset.gallery);return t?[...new Set(Array.from(document.querySelectorAll('[data-gallery="'.concat(t,'"]')),(t=>"".concat(t.dataset.type?t.dataset.type:"").concat(this.getSrc(t)))))]:["".concat(this.type?this.type:"").concat(this.src)]}getYoutubeId(t){if(!t)return!1;const e=t.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);return!(!e||11!==e[2].length)&&e[2]}getInstagramEmbed(t){if(/instagram/.test(t))return t+=/\/embed$/.test(t)?"":"/embed",'<iframe src="'.concat(t,'" class="start-50 translate-middle-x" style="max-width: 500px" frameborder="0" scrolling="no" allowtransparency="true"></iframe>')}isEmbed(t){const e=new RegExp("("+o.allowedEmbedTypes.join("|")+")").test(t),s=/\.(png|jpe?g|gif|svg|webp)/i.test(t)||"image"===this.el.dataset.type;return e||!s}createCarousel(){const t=document.createElement("template"),e=o.allowedMediaTypes.join("|"),s=this.sources.map(((t,s)=>{t=t.replace(/\/$/,"");const a=new RegExp("^(".concat(e,")"),"i"),o=/^html/.test(t),i=/^image/.test(t);a.test(t)&&(t=t.replace(a,""));let n='<img src="'.concat(t,'" class="d-block w-100 h-100 img-fluid" style="z-index: 1; object-fit: contain;" />'),l="";const r=this.getInstagramEmbed(t),c=this.getYoutubeId(t);this.isEmbed(t)&&!i&&(c&&(t="https://www.youtube.com/embed/".concat(c),l='title="YouTube video player" frameborder="0" allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"'),n=r||'<iframe src="'.concat(t,'" ').concat(l," allowfullscreen></iframe>")),o&&(n=t);const d=new URLSearchParams(t.split("?")[1]);let h="";return d.get("caption")&&(h='<p class="lightbox-caption m-0 p-2 text-center text-white small"><em>'.concat(d.get("caption"),"</em></p>")),'\n\t\t\t\t<div class="carousel-item '.concat(s?"":"active",'" style="min-height: 100px">\n\t\t\t\t\t').concat('<div class="position-absolute top-50 start-50 translate-middle text-white"><div class="spinner-border" style="width: 3rem height: 3rem" role="status"></div></div>','\n\t\t\t\t\t<div class="ratio ratio-16x9" style="background-color: #000;">').concat(n,"</div>\n\t\t\t\t\t").concat(h,"\n\t\t\t\t</div>")})).join(""),i=this.sources.length<2?"":'\n\t\t\t<button id="#lightboxCarousel-'.concat(this.hash,'-prev" class="carousel-control carousel-control-prev h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-').concat(this.hash,'" data-bs-slide="prev">\n\t\t\t\t<span class="carousel-control-prev-icon" aria-hidden="true"></span>\n\t\t\t\t<span class="visually-hidden">Previous</span>\n\t\t\t</button>\n\t\t\t<button id="#lightboxCarousel-').concat(this.hash,'-next" class="carousel-control carousel-control-next h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-').concat(this.hash,'" data-bs-slide="next">\n\t\t\t\t<span class="carousel-control-next-icon" aria-hidden="true"></span>\n\t\t\t\t<span class="visually-hidden">Next</span>\n\t\t\t</button>');let n="lightbox-carousel carousel";"fullscreen"===this.settings.size&&(n+=" position-absolute w-100 translate-middle top-50 start-50");const l='\n\t\t\t<div id="lightboxCarousel-'.concat(this.hash,'" class="').concat(n,'" data-bs-ride="carousel" data-bs-interval="').concat(this.carouselOptions.interval,'">\n\t\t\t\t<div class="carousel-inner">\n\t\t\t\t\t').concat(s,"\n\t\t\t\t</div>\n\t\t\t\t").concat(i,"\n\t\t\t</div>");t.innerHTML=l.trim(),this.carouselElement=t.content.firstChild;const r=Object.assign(Object.assign({},this.carouselOptions),{keyboard:!1});this.carousel=new a.Carousel(this.carouselElement,r);const c=this.type&&"image"!==this.type?this.type+this.src:this.src;return this.carousel.to(this.findGalleryItemIndex(this.sources,c)),!0===this.carouselOptions.keyboard&&document.addEventListener("keydown",(t=>{if("ArrowLeft"===t.code){const t=document.getElementById("#lightboxCarousel-".concat(this.hash,"-prev"));return t&&t.click(),!1}if("ArrowRight"===t.code){const t=document.getElementById("#lightboxCarousel-".concat(this.hash,"-next"));return t&&t.click(),!1}})),this.carousel}findGalleryItemIndex(t,e){let s=0;for(const a of t){if(a.includes(e))return s;s++}return 0}createModal(){const t=document.createElement("template"),e='\n\t\t\t<div class="modal lightbox fade" id="lightboxModal-'.concat(this.hash,'" tabindex="-1" aria-hidden="true">\n\t\t\t\t<div class="modal-dialog modal-dialog-centered modal-').concat(this.settings.size,'">\n\t\t\t\t\t<div class="modal-content border-0 bg-transparent">\n\t\t\t\t\t\t<div class="modal-body p-0">\n\t\t\t\t\t\t\t<button type="button" class="btn-close position-absolute top-0 end-0 p-3" data-bs-dismiss="modal" aria-label="Close" style="z-index: 2; background: none;">').concat('<svg xmlns="http://www.w3.org/2000/svg" style="position: relative; top: -5px;" viewBox="0 0 16 16" fill="#fff"><path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"/></svg>',"</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>");return t.innerHTML=e.trim(),this.modalElement=t.content.firstChild,this.modalElement.querySelector(".modal-body").appendChild(this.carouselElement),this.modalElement.addEventListener("hidden.bs.modal",(()=>this.modalElement.remove())),this.modalElement.querySelector("[data-bs-dismiss]").addEventListener("click",(()=>this.modal.hide())),this.modal=new a.Modal(this.modalElement,this.modalOptions),this.modal}randomHash(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:8;return Array.from({length:t},(()=>Math.floor(36*Math.random()).toString(36))).join("")}}o.allowedEmbedTypes=["embed","youtube","vimeo","instagram","url"],o.allowedMediaTypes=[...o.allowedEmbedTypes,"image","html"],o.defaultSelector='[data-toggle="lightbox"]',o.initialize=function(t){t.preventDefault();new o(this).show()},document.querySelectorAll(o.defaultSelector).forEach((t=>t.addEventListener("click",o.initialize))),"undefined"!=typeof window&&window.bootstrap&&(window.bootstrap.Lightbox=o);var i=o;window.Lightbox=e.default}();
//# sourceMappingURL=index.bundle.min.js.map