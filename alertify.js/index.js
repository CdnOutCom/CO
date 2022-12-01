(function(c,d){var a=c.document,b;b=function(){var r={},s={},i=false,k={ENTER:13,ESC:27,SPACE:32},n=[],g,l,t,m,q,h,u,p,o,e,f,j,v;s={buttons:{holder:'<nav class="alertify-buttons">{{buttons}}</nav>',submit:'<button type="submit" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',ok:'<button class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',cancel:'<button class="alertify-button alertify-button-cancel" id="alertify-cancel">{{cancel}}</button>'},input:'<div class="alertify-text-wrapper"><input type="text" class="alertify-text" id="alertify-text"></div>',message:'<p class="alertify-message">{{message}}</p>',log:'<article class="alertify-log{{class}}">{{message}}</article>'};v=function(){var x,z,w=false,y=a.createElement("fakeelement"),A={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"};for(x in A){if(y.style[x]!==d){z=A[x];w=true;break}}return{type:z,supported:w}};g=function(w){return a.getElementById(w)};r={labels:{ok:"OK",cancel:"Cancel"},delay:5000,buttonReverse:false,buttonFocus:"ok",transition:d,addListeners:function(z){var C=(typeof t!=="undefined"),G=(typeof l!=="undefined"),D=(typeof j!=="undefined"),w="",F=this,A,E,y,B,x;A=function(H){if(typeof H.preventDefault!=="undefined"){H.preventDefault()}y(H);if(typeof j!=="undefined"){w=j.value}if(typeof z==="function"){if(typeof j!=="undefined"){z(true,w)}else{z(true)}}return false};E=function(H){if(typeof H.preventDefault!=="undefined"){H.preventDefault()}y(H);if(typeof z==="function"){z(false)}return false};y=function(H){F.hide();F.unbind(a.body,"keyup",B);F.unbind(m,"focus",x);if(C){F.unbind(t,"click",A)}if(G){F.unbind(l,"click",E)}};B=function(H){var I=H.keyCode;if((I===k.SPACE&&!D)||(D&&I===k.ENTER)){A(H)}if(I===k.ESC&&G){E(H)}};x=function(H){if(D){j.focus()}else{if(!G||F.buttonReverse){t.focus()}else{l.focus()}}};this.bind(m,"focus",x);this.bind(q,"focus",x);if(C){this.bind(t,"click",A)}if(G){this.bind(l,"click",E)}this.bind(a.body,"keyup",B);if(!this.transition.supported){this.setFocus()}},bind:function(x,y,w){if(typeof x.addEventListener==="function"){x.addEventListener(y,w,false)}else{if(x.attachEvent){x.attachEvent("on"+y,w)}}},handleErrors:function(){if(typeof c.onerror!=="undefined"){var w=this;c.onerror=function(z,y,x){w.error("["+z+" on line "+x+" of "+y+"]",0)};return true}else{return false}},appendButtons:function(w,x){return this.buttonReverse?x+w:w+x},build:function(A){var x="",y=A.type,z=A.message,w=A.cssClass||"";x+='<div class="alertify-dialog">';x+='<a id="alertify-resetFocusBack" class="alertify-resetFocus" href="#">Reset Focus</a>';if(r.buttonFocus==="none"){x+='<a href="#" id="alertify-noneFocus" class="alertify-hidden"></a>'}if(y==="prompt"){x+='<div id="alertify-form">'}x+='<article class="alertify-inner">';x+=s.message.replace("{{message}}",z);if(y==="prompt"){x+=s.input}x+=s.buttons.holder;x+="</article>";if(y==="prompt"){x+="</div>"}x+='<a id="alertify-resetFocus" class="alertify-resetFocus" href="#">Reset Focus</a>';x+="</div>";switch(y){case"confirm":x=x.replace("{{buttons}}",this.appendButtons(s.buttons.cancel,s.buttons.ok));x=x.replace("{{ok}}",this.labels.ok).replace("{{cancel}}",this.labels.cancel);break;case"prompt":x=x.replace("{{buttons}}",this.appendButtons(s.buttons.cancel,s.buttons.submit));x=x.replace("{{ok}}",this.labels.ok).replace("{{cancel}}",this.labels.cancel);break;case"alert":x=x.replace("{{buttons}}",s.buttons.ok);x=x.replace("{{ok}}",this.labels.ok);break;default:break}o.className="alertify alertify-"+y+" "+w;p.className="alertify-cover";return x},close:function(y,A){var B=(A&&!isNaN(A))?+A:this.delay,w=this,z,x;this.bind(y,"click",function(){z(y)});x=function(C){C.stopPropagation();w.unbind(this,w.transition.type,x);e.removeChild(this);if(!e.hasChildNodes()){e.className+=" alertify-logs-hidden"}};z=function(C){if(typeof C!=="undefined"&&C.parentNode===e){if(w.transition.supported){w.bind(C,w.transition.type,x);C.className+=" alertify-log-hide"}else{e.removeChild(C);if(!e.hasChildNodes()){e.className+=" alertify-logs-hidden"}}}};if(A===0){return}setTimeout(function(){z(y)},B)},dialog:function(A,z,y,B,x){u=a.activeElement;var w=function(){if((e&&e.scrollTop!==null)&&(p&&p.scrollTop!==null)){return}else{w()}};if(typeof A!=="string"){throw new Error("message must be a string")}if(typeof z!=="string"){throw new Error("type must be a string")}if(typeof y!=="undefined"&&typeof y!=="function"){throw new Error("fn must be a function")}this.init();w();n.push({type:z,message:A,callback:y,placeholder:B,cssClass:x});if(!i){this.setup()}return this},extend:function(w){if(typeof w!=="string"){throw new Error("extend method must have exactly one paramter")}return function(x,y){this.log(x,w,y);return this}},hide:function(){var x,w=this;n.splice(0,1);if(n.length>0){this.setup(true)}else{i=false;x=function(y){y.stopPropagation();w.unbind(o,w.transition.type,x)};if(this.transition.supported){this.bind(o,this.transition.type,x);o.className="alertify alertify-hide alertify-hidden"}else{o.className="alertify alertify-hide alertify-hidden alertify-isHidden"}p.className="alertify-cover alertify-cover-hidden";u.focus()}},init:function(){a.createElement("nav");a.createElement("article");a.createElement("section");if(g("alertify-cover")==null){p=a.createElement("div");p.setAttribute("id","alertify-cover");p.className="alertify-cover alertify-cover-hidden";a.body.appendChild(p)}if(g("alertify")==null){i=false;n=[];o=a.createElement("section");o.setAttribute("id","alertify");o.className="alertify alertify-hidden";a.body.appendChild(o)}if(g("alertify-logs")==null){e=a.createElement("section");e.setAttribute("id","alertify-logs");e.className="alertify-logs alertify-logs-hidden";a.body.appendChild(e)}a.body.setAttribute("tabindex","0");this.transition=v()},log:function(y,x,z){var w=function(){if(e&&e.scrollTop!==null){return}else{w()}};this.init();w();e.className="alertify-logs";this.notify(y,x,z);return this},notify:function(y,x,z){var w=a.createElement("article");w.className="alertify-log"+((typeof x==="string"&&x!=="")?" alertify-log-"+x:"");w.innerHTML=y;e.appendChild(w);setTimeout(function(){w.className=w.className+" alertify-log-show"},50);this.close(w,z)},set:function(x){var w;if(typeof x!=="object"&&x instanceof Array){throw new Error("args must be an object")}for(w in x){if(x.hasOwnProperty(w)){this[w]=x[w]}}},setFocus:function(){if(j){j.focus();j.select()}else{h.focus()}},setup:function(x){var z=n[0],w=this,y;i=true;y=function(A){A.stopPropagation();w.setFocus();w.unbind(o,w.transition.type,y)};if(this.transition.supported&&!x){this.bind(o,this.transition.type,y)}o.innerHTML=this.build(z);m=g("alertify-resetFocus");q=g("alertify-resetFocusBack");t=g("alertify-ok")||d;l=g("alertify-cancel")||d;h=(r.buttonFocus==="cancel")?l:((r.buttonFocus==="none")?g("alertify-noneFocus"):t),j=g("alertify-text")||d;f=g("alertify-form")||d;if(typeof z.placeholder==="string"&&z.placeholder!==""){j.value=z.placeholder}if(x){this.setFocus()}this.addListeners(z.callback)},unbind:function(x,y,w){if(typeof x.removeEventListener==="function"){x.removeEventListener(y,w,false)}else{if(x.detachEvent){x.detachEvent("on"+y,w)}}}};return{alert:function(y,x,w){r.dialog(y,"alert",x,"",w);return this},confirm:function(y,x,w){r.dialog(y,"confirm",x,"",w);return this},extend:r.extend,init:r.init,log:function(x,w,y){r.log(x,w,y);return this},prompt:function(y,x,z,w){r.dialog(y,"prompt",x,z,w);return this},success:function(w,x){r.log(w,"success",x);return this},error:function(w,x){r.log(w,"error",x);return this},set:function(w){r.set(w)},labels:r.labels,debug:r.handleErrors}};if(typeof define==="function"){define([],function(){return new b()})}else{if(typeof c.alertify==="undefined"){c.alertify=new b()}}}(this));