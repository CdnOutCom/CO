var aragonite=function(){var e=null,t={alphaNumeric:{value:/^[A-Z,a-z,0-9, -_]+$/,message:"This alphanumeric string is invalid"},string:{value:/^[A-Z,a-z ,.'-]+$/,message:"This string is invalid"},email:{value:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,message:"This is not a valid email address"},phone:{value:/^[0-9]{10,15}/,message:"Wrong phone number format"},required:"",visa:{value:/^4[0-9]{12}(?:[0-9]{3})?$/,message:"This credit card number is invalid"},masterCard:{value:/^5[1-5][0-9]{14}$/,message:"This credit card number is invalid"},amex:{value:/^3[47][0-9]{13}$/,message:"This credit card number is invalid"},discover:{value:/^6(?:011|5[0-9]{2})[0-9]{12}$/,message:"This credit card number is invalid"},cvv:{value:/^[0-9]{3,4}$/,message:"This securit code is invalid"}},a={validate:function(e){var n=new RegExp("(\\s|^)"+e.className+"(\\s|$)"),i=e.field.className;if(e.value.match(t[e.dataType].value)){a.getLabel(e.field.getAttribute("name"),"");var s=function(e,t){return e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))};s(e.field,e.className)&&(e.field.className=i.replace(n,""))}else i.indexOf(e.className)<0&&(e.field.setAttribute("class",i+" "+e.className),a.getLabel(e.field.getAttribute("name"),t[e.dataType].message));e.optional&&e.value.length>0&&(e.field.className=i.replace(n,""))},submit:function(e,t){var n,i;i?n=i.length:(this.elements=document.getElementsByTagName("input"),i=this.elements,n=i.length);for(var s=0;n>s;s++)a.validate({field:i[s],parent:i[s].parentElement,value:i[s].value,dataType:i[s].getAttribute("data-type"),optional:i[s].getAttribute("data-optional")});return document.getElementsByClassName(t.className).length?!1:void e.submit(this.form)},getRegex:function(e){for(var a=e,n=a.length,i=0;n>i;i++){var s=a[i].regex.value.toString(),r=s.substr(0,1),l=s.substr(s.length-1,s.length);"object"==typeof a[i].regex&&"/"===r&&"/"===l&&(t[a[i].name]={value:a[i].regex.value,message:a[i].regex.message})}},bind:function(e,t,n){e.addEventListener?e.addEventListener(t,function(e){var t,i;e.target?(t=e.target,i=e.target.parentElement):e.srcElement&&(t=e.srcElement,i=e.srcElement.parentElement),a.validate({field:t,parent:i,className:n,value:t.value,dataType:t.getAttribute("data-type"),optional:t.getAttribute("data-optional")})}):e.attachEvent&&e.attachEvent(t,function(e){var t;e.target?t=e.target:e.srcElement&&(t=e.srcElement),a.validate({field:t,parent:e.parentElement,className:n,value:t.value,dataType:t.getAttribute("data-type"),optional:t.getAttribute("data-optional")})})},getLabel:function(e,t){for(var a=document.getElementsByTagName("label"),n=0;n<a.length;n++)a[n].htmlFor===e+"-error"&&(a[n].innerHTML=t)}},n=function(t,n){var i=null,s=null;n&&n.regex&&a.getRegex(n.regex),i=n&&n.className?n.className:"required",s=n&&n.messages?n.messages:!1,e=document.getElementById(t);for(var r=[],l=e.children,u=0;u<l.length;u++)r.push(l[u]);var d=r.length,m=function(){for(var e=0;d>e;e++)for(var t=["keyup","blur"],n=0;n<t.length;n++)a.bind(r[e],t[n],i,s)};m(),e.addEventListener?(e.addEventListener("keyup",function(t){return 32===t.which?!1:void(13===t.which?a.submit(e,n):9===t.which&&m())}),e.addEventListener("submit",function(t){t.preventDefault(),a.submit(e,n)})):e.attachEvent&&(e.attachEvent("keyup",function(t){return 32===t.which?!1:void(13===t.which?a.submit(e,n):9===t.which&&m())}),e.attachEvent("submit",function(t){t.preventDefault(),a.submit(e,n)}))};return"undefined"!=typeof module&&"undefined"!=typeof module.exports?{init:n,regex:t}:{init:n}}();"undefined"!=typeof module&&"undefined"!=typeof module.exports?module.exports=aragonite:window.aragonite=aragonite;