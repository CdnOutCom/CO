!function(t,e){"use strict";var a=[["bold","italic","underline","strikethrough","subscript","superscript"],["format-block"],["font"],["font-size"],["font-color","hilite-color"],["remove-format"],["ordered-list","unordered-list","outdent","indent"],["left-justify","center-justify","right-justify"],["code","quote","paragraph"],["link","image"]];t.module("wysiwyg.module",["colorpicker.module"]).directive("wysiwyg",["$timeout","wysiwgGui","$compile",function(a,n,i){function l(l,s,o,r){function u(){c(),m(),f(),d()}function c(){n.setCustomElements(l.textareaCustomMenu);var t=s.children("div.wysiwyg-menu")[0];t.appendChild(n.createMenu(l.textareaMenu)),i(t)(l)}function m(){l.$watch("disabled",function(e){t.element("div.wysiwyg-menu").find("button").each(function(){t.element(this).attr("disabled",e)}),t.element("div.wysiwyg-menu").find("select").each(function(){t.element(this).attr("disabled",e)})})}function f(){"true"===o.enableBootstrapTitle&&o.enableBootstrapTitle!==e&&s.find("button[title]").tooltip({container:"body"})}function d(){t.element(".wysiwyg-menu").find("button").on("click",function(){var e=t.element(this);l.$emit("wysiwyg.click",e.attr("title")||e.attr("data-original-title"))}),b.on("input keyup paste mouseup",function(){var t=b.html();"<br>"==t&&(t=""),r.$setViewValue(t)}),b.on("keydown",function(t){if(9==t.keyCode){{var e=(b.html(),window.getSelection());e.anchorOffset}t.preventDefault()}}),b.on("click keyup focus mouseup",function(){a(function(){l.isBold=l.cmdState("bold"),l.isUnderlined=l.cmdState("underline"),l.isStrikethrough=l.cmdState("strikethrough"),l.isItalic=l.cmdState("italic"),l.isSuperscript=g("SUP"),l.isSubscript=g("SUB"),l.isRightJustified=l.cmdState("justifyright"),l.isLeftJustified=l.cmdState("justifyleft"),l.isCenterJustified=l.cmdState("justifycenter"),l.isPre="pre"===l.cmdValue("formatblock"),l.isBlockquote="blockquote"===l.cmdValue("formatblock"),l.isOrderedList=l.cmdState("insertorderedlist"),l.isUnorderedList=l.cmdState("insertunorderedlist"),l.fonts.forEach(function(t){return l.cmdValue("fontname").indexOf(t)>-1?(l.font=t,!1):void 0}),l.cmdValue("formatblock").toLowerCase(),l.formatBlocks.forEach(function(t){return l.cmdValue("formatblock").toLowerCase()===t.value.toLowerCase()?(l.formatBlock=t,!1):void 0}),l.fontSizes.forEach(function(t){return l.cmdValue("fontsize")===t.value?(l.fontSize=t,!1):void 0}),l.hiliteColor=v(),s.find("button.wysiwyg-hiliteColor").css("background-color",l.hiliteColor),l.fontColor=l.cmdValue("forecolor"),s.find("button.wysiwyg-fontcolor").css("color",l.fontColor),l.isLink=g("A")},0)})}function g(t){var e=window.getSelection().getRangeAt(0);return e&&(e.startContainer.parentNode.tagName===t.toUpperCase()||e.endContainer.parentNode.tagName===t.toUpperCase())?!0:!1}function v(){var e=window.getSelection().getRangeAt(0);if(e){var a=t.element(e.startContainer.parentNode).attr("style");if(!t.isDefined(a))return!1;for(var n=a.split(";"),i=0;i<n.length;i++){var l=n[i].split(":");if("background-color"===l[0])return l[1]}return"#fff"}return"#fff"}var b=s.find("div.wysiwyg-textarea");l.isLink=!1,l.fontSizes=[{value:"1",size:"10px"},{value:"2",size:"13px"},{value:"3",size:"16px"},{value:"4",size:"18px"},{value:"5",size:"24px"},{value:"6",size:"32px"},{value:"7",size:"48px"}],l.formatBlocks=[{name:"Heading Blocks",value:"div"},{name:"Heading 1",value:"h1"},{name:"Heading 2",value:"h2"},{name:"Heading 3",value:"h3"},{name:"Heading 4",value:"h4"},{name:"Heading 5",value:"h5"},{name:"Heading 6",value:"h6"}],l.formatBlock=l.formatBlocks[0],l.fontSize=l.fontSizes[1],t.isArray(l.cssClasses)&&(l.cssClasses.unshift("css"),l.cssClass=l.cssClasses[0]),l.fonts=["Georgia","Palatino Linotype","Times New Roman","Arial","Helvetica","Arial Black","Comic Sans MS","Impact","Lucida Sans Unicode","Tahoma","Trebuchet MS","Verdana","Courier New","Lucida Console","Helvetica Neue"].sort(),l.font=l.fonts[6],u(),r.$render=function(){b.html(r.$viewValue)},l.format=function(t,e){document.execCommand(t,!1,e)},l.cmdState=function(t){return document.queryCommandState(t)},l.cmdValue=function(t){return document.queryCommandValue(t)},l.createLink=function(){var t=prompt("Enter the link URL");t&&t!==e&&l.format("createlink",t)},l.insertImage=function(){var t=prompt("Enter the image URL");t&&t!==e&&l.format("insertimage",t)},l.setFont=function(){l.format("fontname",l.font)},l.setFontSize=function(){l.format("fontsize",l.fontSize.value)},l.setFormatBlock=function(){l.format("formatBlock",l.formatBlock.value)},l.setFontColor=function(){l.format("forecolor",l.fontColor)},l.setHiliteColor=function(){l.format("hiliteColor",l.hiliteColor)},l.format("enableobjectresizing",!0),l.format("styleWithCSS",!0)}return{template:'<div><style>   .wysiwyg-textarea[contentEditable="false"] { background-color:#eee}   .wysiwyg-btn-group-margin { margin-right:5px; }   .wysiwyg-select { height:30px;margin-bottom:1px;}   .wysiwyg-colorpicker { font-family: arial, sans-serif !important;font-size:16px !important; padding:2px 10px !important;}</style><div class="wysiwyg-menu"></div><div id="{{textareaId}}" ng-attr-style="resize:vertical;height:{{textareaHeight || \'80px\'}}; overflow:auto" contentEditable="{{!disabled}}" class="{{textareaClass}} wysiwyg-textarea" rows="{{textareaRows}}" name="{{textareaName}}" required="{{textareaRequired}}" placeholder="{{textareaPlaceholder}}" ng-model="value"></div></div>',restrict:"E",scope:{value:"=ngModel",textareaHeight:"@textareaHeight",textareaName:"@textareaName",textareaClass:"@textareaClass",textareaRequired:"@textareaRequired",textareaId:"@textareaId",textareaMenu:"=textareaMenu",textareaCustomMenu:"=textareaCustomMenu",fn:"&",disabled:"=?disabled"},replace:!0,require:"ngModel",link:l,transclude:!0}}]).factory("wysiwgGui",["wysiwgGuiElements",function(e){function n(t){var e;if(t.tag)e=document.createElement(t.tag);else{if(!t.text)return console.log("cannot create this element."),e=document.createElement("span");e=document.createElement("span")}if(t.text&&document.all?e.innerText=t.text:e.textContent=t.text,t.classes&&(e.className=t.classes),t.html&&(e.innerHTML=t.html),t.attributes&&t.attributes.length)for(var a in t.attributes){var i=t.attributes[a];i.name&&i.value&&e.setAttribute(i.name,i.value)}if(t.data&&t.data.length)for(var l in t.data)e.appendChild(n(t.data[l]));return e}var i=e,l={},s=function(t){l=t},o=function(){return{tag:"div",classes:"btn-group btn-group-sm wysiwyg-btn-group-margin"}},r=function(t){return i[t]||{}},u=function(e){t.extend(i,l),e=t.isDefined(e)&&""!==e?e:a;for(var s,u=document.createElement("div"),c=0;c<e.length;c++){for(var m=n(o()),f=0;f<e[c].length;f++)"link"===e[c][f]&&(s=n(r("unlink")),m.appendChild(s)),s=n(r(e[c][f])),m.appendChild(s);u.appendChild(m)}return u};return{createMenu:u,setCustomElements:s}}]).value("wysiwgGuiElements",{bold:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Bold"},{name:"ng-click",value:"format('bold')"},{name:"ng-class",value:"{ active: isBold }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-bold"}]},italic:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Italic"},{name:"ng-click",value:"format('italic')"},{name:"ng-class",value:"{ active: isItalic }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-italic"}]},underline:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Underline"},{name:"ng-click",value:"format('underline')"},{name:"ng-class",value:"{ active: isUnderlined }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-underline"}]},strikethrough:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Strikethrough"},{name:"ng-click",value:"format('strikethrough')"},{name:"ng-class",value:"{ active: isStrikethrough }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-strikethrough"}]},subscript:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Subscript"},{name:"ng-click",value:"format('subscript')"},{name:"ng-class",value:"{ active: isSubscript }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-subscript"}]},superscript:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Superscript"},{name:"ng-click",value:"format('superscript')"},{name:"ng-class",value:"{ active: isSuperscript }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-superscript"}]},"remove-format":{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Remove Formatting"},{name:"ng-click",value:"format('removeFormat')"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-eraser"}]},"ordered-list":{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Ordered List"},{name:"ng-click",value:"format('insertorderedlist')"},{name:"ng-class",value:"{ active: isOrderedList }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-list-ol"}]},"unordered-list":{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Unordered List"},{name:"ng-click",value:"format('insertunorderedlist')"},{name:"ng-class",value:"{ active: isUnorderedList }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-list-ul"}]},outdent:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Outdent"},{name:"ng-click",value:"format('outdent')"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-outdent"}]},indent:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Indent"},{name:"ng-click",value:"format('indent')"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-indent"}]},"left-justify":{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Left Justify"},{name:"ng-click",value:"format('justifyleft')"},{name:"ng-class",value:"{ active: isLeftJustified }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-align-left"}]},"center-justify":{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Center Justify"},{name:"ng-click",value:"format('justifycenter')"},{name:"ng-class",value:"{ active: isCenterJustified }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-align-center"}]},"right-justify":{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Right Justify"},{name:"ng-click",value:"format('justifyright')"},{name:"ng-class",value:"{ active: isRightJustified }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-align-right"}]},code:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Code"},{name:"ng-click",value:"format('formatblock', 'pre')"},{name:"ng-class",value:"{ active: isPre }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-code"}]},quote:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Quote"},{name:"ng-click",value:"format('formatblock', 'blockquote')"},{name:"ng-class",value:"{ active: isBlockquote }"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-quote-right"}]},paragraph:{tag:"button",classes:"btn btn-default",text:"P",attributes:[{name:"title",value:"Paragragh"},{name:"ng-click",value:"format('insertParagraph')"},{name:"ng-class",value:"{ active: isParagraph }"},{name:"type",value:"button"}]},image:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Image"},{name:"ng-click",value:"insertImage()"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-picture-o"}]},"font-color":{tag:"button",classes:"btn btn-default wysiwyg-colorpicker wysiwyg-fontcolor",text:"A",attributes:[{name:"title",value:"Font Color"},{name:"colorpicker",value:"rgba"},{name:"colorpicker-position",value:"top"},{name:"ng-model",value:"fontColor"},{name:"ng-change",value:"setFontColor()"},{name:"type",value:"button"}]},"hilite-color":{tag:"button",classes:"btn btn-default wysiwyg-colorpicker wysiwyg-fontcolor",text:"H",attributes:[{name:"title",value:"Hilite Color"},{name:"colorpicker",value:"rgba"},{name:"colorpicker-position",value:"top"},{name:"ng-model",value:"hiliteColor"},{name:"ng-change",value:"setHiliteColor()"},{name:"type",value:"button"}]},font:{tag:"select",classes:"form-control wysiwyg-select",attributes:[{name:"title",value:"Image"},{name:"ng-model",value:"font"},{name:"ng-options",value:"f for f in fonts"},{name:"ng-change",value:"setFont()"}]},"font-size":{tag:"select",classes:"form-control wysiwyg-select",attributes:[{name:"title",value:"Image"},{name:"ng-model",value:"fontSize"},{name:"ng-options",value:"f.size for f in fontSizes"},{name:"ng-change",value:"setFontSize()"}]},"format-block":{tag:"select",classes:"form-control wysiwyg-select",attributes:[{name:"title",value:"Format Block"},{name:"ng-model",value:"formatBlock"},{name:"ng-options",value:"f.name for f in formatBlocks"},{name:"ng-change",value:"setFormatBlock()"}]},link:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Link"},{name:"ng-click",value:"createLink()"},{name:"ng-show",value:"!isLink"}],data:[{tag:"i",classes:"fa fa-link"},{name:"type",value:"button"}]},unlink:{tag:"button",classes:"btn btn-default",attributes:[{name:"title",value:"Unlink"},{name:"ng-click",value:"format('unlink')"},{name:"ng-show",value:"isLink"},{name:"type",value:"button"}],data:[{tag:"i",classes:"fa fa-unlink"}]}})}(angular);