!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t){var n=AFRAME.utils.debug,o=n("aframe-text-component:error"),r=new THREE.FontLoader;AFRAME.registerComponent("text",{schema:{bevelEnabled:{default:!1},bevelSize:{default:8,min:0},bevelThickness:{default:12,min:0},curveSegments:{default:12,min:0},font:{type:"asset",default:"https://rawgit.com/ngokevin/kframe/master/components/text/lib/helvetiker_regular.typeface.json"},height:{default:.05,min:0},size:{default:.5,min:0},style:{default:"normal",oneOf:["normal","italics"]},text:{default:""},weight:{default:"normal",oneOf:["normal","bold"]}},update:function(e){var t=this.data,n=this.el,a=n.getOrCreateObject3D("mesh",THREE.Mesh);t.font.constructor===String?r.load(t.font,function(e){var n=AFRAME.utils.clone(t);n.font=e,a.geometry=new THREE.TextGeometry(t.text,n)}):t.font.constructor===Object?a.geometry=new THREE.TextGeometry(t.text,t):o("Must provide `font` (typeface.json) or `fontPath` (string) to text component.")}})}]);