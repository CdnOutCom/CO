/*! angular-fontselect v0.13.4 */
!function(a,b){"use strict";function c(a){return a.toLowerCase().replace(/[^a-z]+/g,"-")}function d(a){for(var b=a.replace("-"," ").split(" "),c=0,d=b.length;c<d;c++)b[c]=b[c].charAt(0).toUpperCase()+b[c].slice(1);return b.join(" ")}function e(a){var b,c=0;for(b in a)a.hasOwnProperty(b)&&c++;return c}function f(a,b){for(var c=b;null!==c;){if(c===a)return!0;c=c.parentNode}return!1}function g(){for(var a=this,b=0,c=la.length;b<c;b++)a[la[b]]=arguments[b];return a._init(),a}var h=a.module("jdFontselect",[]),i="websafe",j="google",k={};k[i]=!0,k[j]=!0;var l="sansserif",m="serif",n="handwriting",o="display",p="other",q=10,r="Controller",s="jdFontselectFonts",t="jdFontselectEventClose",u="jdFontselectEventDoClose",v="jdFontselectEventOpen",w=[{name:"Arial",key:"arial",category:l,stack:'Arial, "Helvetica Neue", Helvetica, sans-serif',popularity:3,lastModified:"2014-01-28"},{name:"Consolas",key:"consolas",category:l,stack:'Consolas, "Lucida Console", Monaco, monospace',popularity:1,lastModified:"2014-02-04"},{name:"Courier New",key:"couriernew",category:m,stack:'"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace',popularity:1,lastModified:"2014-01-28"},{name:"Georgia",key:"georgia",category:m,stack:'Georgia, Palatino, "Palatino Linotype", Times, "Times New Roman", serif',popularity:2,lastModified:"2014-02-04"},{name:"Helvetica",key:"helvetica",category:l,stack:'Helvetica, "Helvetica Neue", Arial, sans-serif',popularity:3,lastModified:"2014-02-04"},{name:"Impact",key:"impact",category:o,stack:'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',popularity:3,lastModified:"2014-02-04"},{name:"Lucida Sans",key:"lucidasans",category:l,stack:'"Lucida Sans", "Lucida Grande", "Lucida Sans Unicode", sans-serif',popularity:3,lastModified:"2014-02-04"},{name:"Palatino",key:"palatino",category:m,stack:'Palatino, "Palatino Linotype", Georgia, Times, "Times New Roman", serif',popularity:2,lastModified:"2014-02-04"},{name:"Tahoma",key:"tahoma",category:l,stack:"Tahoma, Verdana, Geneva, sans-serif",popularity:6,lastModified:"2014-02-04"},{name:"Trebuchet",key:"trebuchet",category:l,stack:'"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif',popularity:6,lastModified:"2014-02-04"},{name:"Verdana",key:"verdana",category:l,stack:"Verdana, Geneva, sans-serif",popularity:6,lastModified:"2014-01-28"},{name:"Times New Roman",key:"timesnewroman",category:m,stack:'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif',popularity:2,lastModified:"2014-01-28"},{name:"Brush Script",key:"brushscript",category:n,stack:'"Brush Script MT", cursive',popularity:5,lastModified:"2014-01-29"}],x={};x[l]={key:l,fallback:"sans-serif"},x[m]={key:m,fallback:"serif"},x[n]={key:n,fallback:"cursive"},x[o]={key:o,fallback:"fantasy"},x[p]={key:p,fallback:"sans-serif"};var y=[x[l],x[m],x[n],x[o],x[p]],z="next",A="prev",B=["name","key","stack"],C="get",D="https://www.googleapis.com/webfonts/v1/webfonts",E="https://fonts.googleapis.com/css",F="cyrillic",G="cyrillic-ext",H="greek",I="greek-ext",J="latin",K="latin-ext",L="vietnamese",M=[J,K,H,I,F,G,L],N=!1,O=["regular","400","300","500"],P=["light","100","200"],Q=["bold","600","700","800","900"],R=["italic","400italic","300italic","500italic"],S=["lightitalic","100italic","200italic"],T=["bolditalic","600italic","700italic","800italic","900italic"],U=O.concat(P,Q,R,S,T),V=27,W=38,X=40,Y=37,Z=39,$=30,_=[{key:"name",dir:!1},{key:"popularity",dir:!0},{key:"lastModified",dir:!0}],aa={sort:{attr:b,direction:!0},providers:k,category:b,font:b,search:"",subsets:{latin:!0}},ba={toggleOpenLabel:"open",toggleCloseLabel:"close",searchToggleLabel:"Search",search:"Search by Fontname",toggleSearchLabel:"Choose Font",providerLabel:"Providers",subsetLabel:"Subsets",styleLabel:"Categories",settingsLabel:"Settings",noResultsLabel:"No Fonts found.",pageLabel:"Page: ",fontFabel:"Fonts: ",closeButton:"Close",allFontsListHeadline:"All Fonts",curatedFontsListHeadline:"Curated Fonts",page:{prev:"▲",next:"▼"},provider:{websafe:"Websafe Fonts",google:"Google Fonts"},category:{serif:"Serif",sansserif:"Sans Serif",display:"Display",handwriting:"Handwriting",other:"Other"},subset:{cyrillic:"Cyrillic","cyrillic-ext":"Cyrillic Extended",greek:"Greek","greek-ext":"Greek Extended",latin:"Latin","latin-ext":"Latin Extended",vietnamese:"Vietnamese",devanagari:"Devanagari",khmer:"Khmer"},sort:{popularity:"Popularity",name:"Alphabet",lastModified:"Latest"},sortdir:{desc:"▼",asc:"▲"}};h.constant("jdFontselectConfig",{googleApiKey:window._jdFontselectGoogleApiKey||!1});var ca="HEADLINE",da="FONT",ea="TEXT",fa={};fa[n]=["Patrick Hand SC","Grand Hotel","Calligraffitti","Coming Soon","Crafty Girls","Homemade Apple","Just Another Hand","Montez","Permanent Marker","Rancho","Redressed","Rochester","Rock Salt","Satisfy","Schoolbell","Sunshiney","Walter Turncoat","Yellowtail","Aguafina Script","Aladin","Alex Brush","Allura","Amatic SC","Annie Use Your Telescope","Architects Daughter","Arizonia","Bad Script","Berkshire Swash","Bilbo","Bilbo Swash Caps","Bonbon","Butterfly Kids","Cedarville Cursive","Clicker Script","Condiment","Cookie","Courgette","Covered By Your Grace","Damion","Dancing Script","Dawning of a New Day","Delius","Delius Swash Caps","Delius Unicase","Devonshire","Dr Sugiyama","Eagle Lake","Engagement","Euphoria Script","Felipa","Fondamento","Give You Glory","Gloria Hallelujah","Gochi Hand","Great Vibes","Handlee","Herr Von Muellerhoff","Indie Flower","Italianno","Jim Nightshade","Julee","Just Me Again Down Here","Kaushan Script","Kristi","La Belle Aurore","League Script","Leckerli One","Loved by the King","Lovers Quarrel","Marck Script","Meddon","Meie Script","Merienda","Merienda One","Mervale Script","Miama","Miss Fajardose","Miss Saint Delafield","Molle","Monsieur La Doulaise","Mr Bedford","Mr Bedfort","Mr Dafoe","Mr De Haviland","Mrs Saint Delafield","Mrs Sheppards","Neucha","Niconne","Norican","Nothing You Could Do","Over the Rainbow","Pacifico","Parisienne","Patrick Hand","Pecita","Petit Formal Script","Pinyon Script","Princess Sofia","Quintessential","Qwigley","Reenie Beanie","Romanesco","Rouge Script","Ruge Boogie","Ruthie","Sacramento","Shadows Into Light","Shadows Into Light Two","Short Stack","Sofia","Stalemate","Sue Ellen Francisco","Swanky and Moo Moo","Tangerine","The Girl Next Door","Vibur","Waiting for the Sunrise","Yesteryear","Zeyada","Domine","Donegal One"],fa[l]=["Wendy One","Tauri","Sintony","Pathway Gothic One","Noto Sans","Monda","Merriweather Sans","Exo 2","Aclonica","Alef","Alegreya Sans","Alegreya Sans SC","Denk One","Droid Sans","Droid Sans Mono","Open Sans","Open Sans Condensed","Roboto","Roboto Condensed","Syncopate","ABeeZee","Abel","Acme","Actor","Advent Pro","Aldrich","Allerta","Allerta Stencil","Amaranth","Anaheim","Andika","Anonymous Pro","Antic","Anton","Archivo Black","Archivo Narrow","Arimo","Armata","Asap","Asul","Average Sans","Basic","Belleza","BenchNine","Bubbler One","Cabin","Cabin Condensed","Cagliostro","Candal","Cantarell","Cantora One","Capriola","Carme","Carrois Gothic","Carrois Gothic SC","Changa","Chau Philomene One","Chivo","Coda Caption","Convergence","Cousine","Cuprum","Days One","Didact Gothic","Doppio One","Dorsa","Dosis","Duru Sans","Economica","Electrolize","Englebert","Exo","Federo","Fjalla One","Francois One","Fresca","Gafata","Galdeano","Geo","Gudea","Hammersmith One","Hermeneus One","Homenaje","Imprima","Inconsolata","Inder","Istok Web","Jockey One","Josefin Sans","Josefin Sans Std Light","Julius Sans One","Jura","Karla","Kite One","Krona One","Lato","Lekton","Magra","Mako","Marmelad","Marvel","Maven Pro","Merge One","Metrophobic","Michroma","Molengo","Montserrat","Montserrat Alternates","Montserrat Subrayada","Mouse Memoirs","Muli","News Cycle","Nobile","Numans","Nunito","Orbitron","Orienta","Oswald","Oxygen","Oxygen Mono","Paytone One","Philosopher","Play","Pontano Sans","Port Lligat Sans","PT Mono","PT Sans","PT Sans Caption","PT Sans Narrow","Puritan","Quantico","Quattrocento Sans","Questrial","Quicksand","Raleway","Rambla","Rationale","Ropa Sans","Rosario","Ruda","Ruluko","Rum Raisin","Russo One","Sansation","Scada","Seymour One","Shanti","Share Tech","Share Tech Mono","Signika","Signika Negative","Six Caps","Snippet","Source Code Pro","Source Sans Pro","Spinnaker","Strait","Strong","Telex","Tenor Sans","Terminal Dosis","Terminal Dosis Light","Text Me One","Titillium Web","Tuffy","Varela","Varela Round","Viga","Voltaire","Wire One","Yanone Kaffeesatz","Ubuntu","Ubuntu Condensed","Ubuntu Mono"],fa[o]=["Rubik One","Rubik Mono One","Vampiro One","Snowburst One","Purple Purse","New Rocker","Milonga","Margarine","Lily Script One","Kavoon","Hanalei","Hanalei Fill","Fruktur","Freckle Face","Elsie","Elsie Swash Caps","Cherry Cream Soda","Chewy","Creepster Caps","Crushed","Fontdiner Swanky","Irish Grover","Irish Growler","Kranky","Luckiest Guy","Maiden Orange","Mountains of Christmas","Slackey","Smokum","Special Elite","Unkempt","Abril Fatface","Akronim","Alfa Slab One","Allan","Almendra Display","Amarante","Arbutus","Asset","Astloch","Atomic Age","Aubrey","Audiowide","Autour One","Averia Gruesa Libre","Averia Libre","Averia Sans Libre","Averia Serif Libre","Bangers","Baumans","Bevan","Bigelow Rules","Bigshot One","Black Ops One","Boogaloo","Bowlby One","Bowlby One SC","Bubblegum Sans","Buda","Butcherman","Butcherman Caps","Cabin Sketch","Caesar Dressing","Carter One","Ceviche One","Changa One","Chango","Chela One","Chelsea Market","Cherry Swash","Chicle","Cinzel Decorative","Clara","Coda","Codystar","Combo","Comfortaa","Concert One","Contrail One","Corben","Creepster","Croissant One","Diplomata","Diplomata SC","Dynalight","Eater","Eater Caps","Emblema One","Emilys Candy","Erica One","Ewert","Expletus Sans","Fascinate","Fascinate Inline","Faster One","Federant","Finger Paint","Flamenco","Flavors","Forum","Fredericka the Great","Fredoka One","Frijole","Fugaz One","Galindo","Geostar","Geostar Fill","Germania One","Glass Antiqua","Goblin One","Gorditas","Graduate","Gravitas One","Griffy","Gruppo","Happy Monkey","Henny Penny","Iceberg","Iceland","Jacques Francois Shadow","Jolly Lodger","Joti One","Keania One","Kelly Slab","Kenia","Knewave","Lancelot","Lemon","Lemon One","Life Savers","Lilita One","Limelight","Lobster","Lobster Two","Londrina Outline","Londrina Shadow","Londrina Sketch","Londrina Solid","Love Ya Like A Sister","Macondo","Macondo Swash Caps","McLaren","MedievalSharp","Medula One","Megrim","Metal Mania","Metamorphous","Miltonian","Miltonian Tattoo","Miniver","Modern Antiqua","Monofett","Monoton","Mystery Quest","Nixie One","Nosifer","Nosifer Caps","Nova Cut","Nova Flat","Nova Mono","Nova Oval","Nova Round","Nova Script","Nova Slim","Nova Square","Offside","Oldenburg","Oleo Script","Oleo Script Swash Caps","Oregano","Original Surfer","Overlock","Overlock SC","Paprika","Passero One","Passion One","Patua One","Peralta","Piedra","Pirata One","Plaster","Playball","Poetsen One","Poiret One","Poller One","Pompiere","Press Start 2P","Prosto One","Racing Sans One","Raleway Dots","Rammetto One","Ranchers","Revalia","Ribeye","Ribeye Marrow","Righteous","Risque","Ruslan Display","Rye","Sail","Salsa","Sancreek","Sansita One","Sarina","Seaweed Script","Sevillana","Share","Shojumaru","Sigmar One","Simonetta","Sirin Stencil","Skranji","Smythe","Sniglet","Sofadi One","Sonsie One","Spicy Rice","Spirax","Squada One","Stalinist One","Stalin One","Stardos Stencil","Stint Ultra Condensed","Stint Ultra Expanded","Supermercado One","Titan One","Trade Winds","Trochut","Tulpen One","Uncial Antiqua","Underdog","Unica One","UnifrakturCook","UnifrakturMaguntia","Unlock","Vast Shadow","Voces","VT323","Wallpoet","Warnes","Wellfleet","Yeseva One"],fa[m]=["Roboto Slab","Noto Serif","Libre Baskerville","Gabriela","Fauna One","Droid Serif","jsMath cmbx10","jsMath cmex10","jsMath cmmi10","jsMath cmr10","jsMath cmsy10","jsMath cmti10","Ultra","Adamina","Alegreya","Alegreya SC","Alice","Alike","Alike Angular","Almendra","Almendra SC","Amethysta","Amiri","Andada","Andada SC","Antic Didone","Antic Slab","Arapey","Arbutus Slab","Artifika","Arvo","Average","Balthazar","Belgrano","Bentham","Bitter","Brawler","Bree Serif","Buenard","Cambo","Cantata One","Cardo","Caudex","Cinzel","Copse","Coustard","Crete Round","Crimson Text","Cutive","Cutive Mono","Della Respira","EB Garamond","Enriqueta","Esteban","Fanwood Text","Fenix","Fjord One","Gentium Basic","Gentium Book Basic","Gilda Display","Glegoo","Goudy Bookletter 1911","Habibi","Headland One","Holtwood One SC","IM Fell Double Pica","IM Fell Double Pica SC","IM Fell DW Pica","IM Fell DW Pica SC","IM Fell English","IM Fell English SC","IM Fell French Canon","IM Fell French Canon SC","IM Fell Great Primer","IM Fell Great Primer SC","Inika","Italiana","Jacques Francois","Josefin Slab","Judson","Junge","Kameron","Kotta One","Kreon","Ledger","Linden Hill","Lora","Lusitana","Lustria","Marcellus","Marcellus SC","Marko One","Mate","Mate SC","Merriweather","Montaga","Neuton","Noticia Text","OFL Sorts Mill Goudy TT","Old Standard TT","Oranienbaum","Ovo","Petrona","Playfair Display","Playfair Display SC","Podkova","Poly","Port Lligat Slab","Prata","Prociono","PT Serif","PT Serif Caption","Quando","Quattrocento","Radley","Rokkitt","Rosarivo","Rufina","Sanchez","Sedan","Sedan SC","Sorts Mill Goudy","Stoke","Tienne","Tinos","Trocchi","Trykker","Unna","Vidaloka","Volkhov","Vollkorn"],fa[p]=["Angkor","Battambang","Bayon","Bokor","Chenla","Content","Dangrek","Fasthand","Freehand","GFS Didot","GFS Neohellenic","Hanuman","Kantumruy","Kdam Thmor","Khmer","Koulen","Metal","Moul","Moulpali","Nokora","Odor Mean Chey","Preahvihear","Siemreap","Suwannaphum","Taprom"],h.directive("jdFontselectCurrentHref",[s,function(a){return{templateUrl:"current-href.html",restrict:"A",replace:!0,controller:["$scope",function(b){b.urls=a.getImports()}]}}]),h.directive("jdFont",[s,function(a){return{scope:{font:"=",current:"="},templateUrl:"font.html",restrict:"E",replace:!0,controller:["$scope",function(b){a.load(b.font)}]}}]);var ga="jdFontlistEntry";h.directive(ga,function(){return{scope:{entry:"=",current:"="},restrict:"E",templateUrl:"fontlist-entry.html",replace:!0,link:function(a){a.isHeadline=a.entry.type===ca,a.isFont=a.entry.type===da,a.isText=a.entry.type===ea}}});var ha="jdFontlist",ia=ha+r;h.directive(ha,function(){return{scope:{id:"=fsid",fonts:"=",meta:"=",current:"=",text:"="},restrict:"E",templateUrl:"fontlist.html",replace:!0,controller:ia}}),h.controller(ia,["$scope","$rootScope","$filter",s,"$element","$document","jdfsCuratedFonts",function(c,d,e,g,h,i,j){function k(a){var b=L.current*L.size;return a>=b&&a<b+L.size}function l(a){function b(){return a.preventDefault(),!1}var d=a.keyCode;if(d===X)return c.keyfocus(z),b();if(d===W)return c.keyfocus(A),b();if("INPUT"!==document.activeElement.tagName||!document.activeElement.value){var e=L.size;return d===Z?(c.current.font||e++,c.keyfocus(z,e),b()):d===Y?(c.keyfocus(A,L.size),b()):void 0}}function m(b){var c=b.wheelDeltaY||b.wheelDelta||b.deltaY*-1;return isFinite(c)||a.isUndefined(b.originalEvent)||(c=m(b.originalEvent)),c}function n(a,b){var d=JSON.stringify(c.current.providers);return(b.forceNext||b.sortCache.providers!==d)&&(b.sortCache.providers=d,b.forceNext=!0,b.fontsInProviders=a.filter(function(a){return c.current.providers[a.provider]})),b.fontsInProviders}function o(a,b){var d=JSON.stringify(c.current.subsets);return(b.forceNext||b.sortCache.subsets!==d)&&(b.sortCache.subsets=d,b.forceNext=!0,b.fontsInSubsets=e("hasAllSubsets")(a,c.current.subsets)),b.fontsInSubsets}function p(a,b){var d=c.current.sort.attr.dir,f=c.current.sort.direction;return(b.forceNext||b.sortCache.sortattr!==c.current.sort.attr.key||b.sortCache.sortdir!==f)&&(b.sortCache.sortattr=c.current.sort.attr.key,b.sortCache.sortdir=f,b.forceNext=!0,b.sortedFonts=e("orderBy")(a,c.current.sort.attr.key,c.current.sort.direction?d:!d)),b.sortedFonts}function r(b,d){var f=c.current.category;return(d.forceNext||d.sortCache.category!==f)&&(d.sortCache.category=f,d.forceNext=!0,a.isUndefined(f)?d.categorizedFonts=b:d.categorizedFonts=e("filter")(b,{category:f},!0)),d.categorizedFonts}function s(a,d){var f=c.current.search||"",g=d.sortCache.search!==f;return(d.forceNext||g)&&(d.sortCache.search=f,d.forceNext=!0,g&&(c.current.category=b),f.length?d.searchedFonts=C(e("fuzzySearch")(a,{name:f}),f.toLowerCase()):d.searchedFonts=a),d.searchedFonts}function u(a,b){b.forceNext=b.sortCache.fontAmount!==a.length,b.sortCache.fontAmount=a.length;for(var c=[n,o,p,s,r],d=a,e=0,f=c.length;e<f;e++)d=c[e](d,b);return d}function w(a){return{type:da,content:a}}function x(a){return{type:ca,content:a}}function y(a){return{type:ea,content:a}}function B(b){return a.isNumber(b)?b:b===A?-1:1}function C(a,b){if(a.length>1){var c=new RegExp("["+b+"]+");a.sort(function(a,d){var e=a.name.toLowerCase(),f=d.name.toLowerCase(),g=e[0],h=f[0];if(g!==h){if(g===b[0])return-1;if(h===b[0])return 1}return e.replace(c,"").length<f.replace(c,"").length?-1:1})}return a}function D(){return G=L.count,a.isArray(c.fonts)?void(F.length&&(L.count=Math.ceil(F.length/L.size))):0}function E(){G!==L.count&&c.setCurrentPage(0)}var F=[],G=0,H=0,I={forceNext:!1,fontsInProviders:[],fontsInSubsets:[],sortedFonts:[],categorizedFonts:[],searchedFonts:[],sortCache:{search:c.current.search}},J=a.copy(I),K={size:q,count:0,current:0,currentAbs:0},L=c.page=c.meta.page=a.extend({},K,c.meta.page),M=c.meta.fonts={total:0,current:0};c.keyfocus=function(b,e){var f,g=-1,h=F.length;for(f=0;f<h;f++)if(F[f].content===c.current.font){g=f;break}var i=L.size*L.current,j=k(g);for(a.isUndefined(e)&&(e=1),g+=b===A?-e:e,!j&&F[g+i]&&(g+=i);F[g]&&F[g].type!==da;)g+=b===A?-1:1;F[g]&&(c.current.font=F[g].content,L.currentAbs=L.current=Math.floor(g/L.size),d.$digest())};var N=function(a){if(a.target&&f(h[0],a.target)){a.preventDefault(),a.stopPropagation();var b=1/L.size,d=m(a),e=Math.abs(d);if(e>1&&e<$){if(H+=d,Math.abs(H)<$)return;H=0}0!==d&&c.paginate(d>0?-b:b)!==!1&&c.$digest()}};c.$on(v,function(){i.on("keydown",l),i.on("wheel",N),i.on("mousewheel",N),i.on("DOMMouseScroll",N)}),c.$on(t,function(){i.off("keydown",l),i.off("wheel",N),i.off("mousewheel",N),i.off("DOMMouseScroll",N)}),c.setCurrentPage=function(a){L.currentAbs=L.current=a},c.paginate=function(b,d){d&&d.preventDefault&&d.preventDefault();var e=b;if(a.isNumber(b)){if(0===b)return!1;e=b<0?A:z}else b=B(e);return!!c.paginationButtonActive(e)&&(L.current+b<0?L.currentAbs=L.current=0:(L.current+=b,L.currentAbs=Math.floor(L.current)),L.current)},c.paginationButtonActive=function(a){return D(),E(),a===z&&(L.current+1)*L.size<F.length||a===A&&L.current>0},c.getPages=function(){D();var a=new Array(L.count);return E(),a.length<=1?[]:a};var O=[],P=new WeakMap;c.getFontlistEntries=function(){var a=u(c.fonts||O,I);if(!P.has(a)){var b=[];if(0===a.length)b.push(y(c.text.noResultsLabel));else if(b=a.map(w),0!==j.length){var d=u(j,J);b=[x(c.text.curatedFontsListHeadline)].concat(d.map(w)).concat([x(c.text.allFontsListHeadline)]).concat(b)}M.total=c.fonts.length,M.current=a.length,F=b,P.set(a,b)}return P.get(a)}}]);var ja=1;h.directive("jdFontselect",[s,function(c){return{scope:{current:"=?state",stack:"=?",name:"=?",rawText:"@?text",text:"=?textObj",onInit:"&?",onOpen:"&?",onClose:"&?",onChange:"&?",idSuffix:"@?"},restrict:"E",templateUrl:"fontselect.html",replace:!0,controller:["$scope","$element","$timeout","$document","$rootScope",function(g,h,i,j,k){function l(b){var d,f;g.current=a.extend(a.copy(aa),b||{}),g.current.sort.attr||(g.current.sort.attr=_[0]),a.isObject(g.current.font)&&(g.stack=g.current.font.stack,g.name=g.current.font.name),d=c.getSubsets(),g.current.subsets=e(d)?d:c.setSubsets(g.current.subsets),f=c.getProviders(),g.current.providers=e(f)?f:c.setProviders(g.current.providers)}function m(a){g.active&&!f(h[0],a.target)&&(g.toggle(),k.$digest())}function n(a){g.active&&a.keyCode===V&&(g.toggle(),k.$digest())}function o(){j.on("click",m),j.on("keyup",n),g.$broadcast(v),a.isFunction(g.onOpen)&&g.onOpen({$scope:g})}function p(){j.off("keyup",n),j.off("click",m),g.$broadcast(t),a.isFunction(g.onClose)&&g.onClose({$scope:g})}if(g.fonts=c.getAllFonts(),g.id=ja++,g.suffixedId=g.idSuffix?g.idSuffix:g.id,g.stylesActive=!0,g.settingsActive=!1,g.active=!1,g.searching=!1,g.categories=c.getCategories(),g.sortAttrs=_,g.name="",g.meta={},a.isUndefined(g.stack)&&(g.stack=N),g.text=a.extend(a.copy(ba),g.text||{}),g.rawText&&(g.text=a.extend(g.text,g.$eval(g.rawText)||{})),g.$on(u,function(){g.active&&(g.toggle(),g.$apply())}),g.reverseSort=function(){var a=g.current.sort;a.direction=!a.direction},g.toggle=function(a){a&&a.preventDefault&&a.preventDefault(),g.active=!g.active,g.active?i(o):(g.searching=!1,p())},g.toggleSearch=function(a){a.preventDefault(),g.active||g.toggle(),g.searching=!g.searching,g.searching&&g.setFocus()},g.tryUnfocusSearch=function(){g.searching&&0===g.current.search.length&&(g.searching=!1)},g.resetSearch=function(a){a.preventDefault(),g.current.search="",g.searching&&g.setFocus()},g.toName=d,g.setFocus=function(){i(function(){h[0].querySelector(".jdfs-search").focus()})},g.setCategoryFilter=function(a,c){c&&c.preventDefault&&c.preventDefault();var d=g.current;d.category===a?d.category=b:d.category=a},g.reset=function(){l()},g._setSelected=function(b){a.isObject(b)?(g.name=b.name,g.stack=b.stack):(g.name="",g.stack=N)},g.toggleSettings=function(){g.settingsActive=!0,g.stylesActive=!1},g.toggleStyles=function(){g.stylesActive=!0,g.settingsActive=!1},g.$on("$destroy",p),c._initGoogleFonts(),a.isObject(g.current)&&l(g.current),g.stack.length)try{var q=c.getFontByStack(g.stack);c.updateUsage(q),c.load(q),l({font:q})}catch(r){c.getFontByStackAsync(g.stack,!1).then(function(b){a.isObject(b)&&l({font:b})})}a.isFunction(g.onInit)&&g.onInit({$scope:g}),g.$watch("current.font",function(b,d){a.isObject(g.current)||g.reset(),d!==b&&(g.tryUnfocusSearch(),a.isObject(g.current.font)&&(b=g.current.font),a.isObject(d)&&d.used&&c.updateUsage(d,!1),a.isObject(b)&&(c.updateUsage(b),c.load(b)),g._setSelected(b),c.updateImports(),a.isFunction(g.onChange)&&g.onChange({font:b}))}),g.$watch("current.subsets",function(a,b){a!==b&&c.updateImports()},!0),g.$watch("stack",function(a,b){var d;if(!(a===b||g.current.font&&a===g.current.font.stack))try{a&&a.length&&(d=c.getFontByStack(a,!1)),d?g.current.font=d:g.reset()}catch(e){g.reset()}})}]}}]);var ka="jdMeta";h.directive(ka,function(){return{restrict:"E",templateUrl:"meta.html",replace:!0}}),h.factory("jdfsWebFont",function(){var a={getFontLoader:function(){if("undefined"==typeof window.WebFont)throw new Error("WebFontLoader is not available.Please include angular-fontselect/dist/libs/webfontloader.js");return window.WebFont}};return a}),h.filter("fuzzySearch",function(){var b={teAmount:0,tePercent:.3};return function(c,d,e){function f(a){return new RegExp(a.replace(/./g,function(a){return"([^"+a+"]*?(?:"+a+"))?"}),"i")}if(!a.isArray(c)||a.isUndefined(d))return c;var g=!0,h=[];e=a.extend(b,e);var i=function(a,b,c){var d=(a.match(b)||[]).filter(function(a,b){return 0!==b&&a}),f=d.length+e.teAmount>=c,g=d.length/c>=1-e.tePercent;return f||g};if(a.isString(d)){var j=f(d);g=!1,a.forEach(c[0],function(a,b){"$"!==b.substring(0,1)&&h.push({key:b,search:j,length:d.length})})}else if(a.isObject(d)){var k=!1;if(a.forEach(d,function(b,c){a.isUndefined(b)||(k=!0,h.push({key:c,search:f(b),length:b.length}))}),!k)return c}return c=c.filter(function(a){for(var b=0,c=h.length;b<c;b++){var d=h[b],e=a[d.key]||"",f=i(e,d.search,d.length);if(g&&!f)return!1;if(f)return!0}return!1})}}),h.filter("hasAllSubsets",function(){return function(b,c){function d(b){var d=!0;return a.forEach(c,function(a,c){a&&d&&b.subsets.indexOf(c)<0&&(d=!1)}),d}return a.isArray(b)?b.filter(function(b){return!!a.isUndefined(b.subsets)||a.isObject(b)&&d(b)}):b}}),h.filter("stackSearch",function(){function b(a){return""+a.length+a[0].key+a[a.length-1].key}function c(e,f){var g,h,i;if(!a.isArray(e)||!e.length)return e;if(!a.isString(f))return[];f=f.toLowerCase(),i=c.normalizeStack(f),g=b(e),h=d[g]?d[g]:d[g]=c.createWeightedFontList(e);for(var j=0,k=i.length;j<k;j++)if(h[i[j]])return h[i[j]].fonts;return[]}var d={};return c.normalizeStack=function(b){var c=[];return a.forEach(b.split(","),function(a){c.push(a.replace(/^[ '"]*|[ '"]*$/g,""))}),c},c.createWeightedFontList=function(a){var b={};return a.forEach(function(a){var d=c.normalizeStack(a.stack.toLowerCase());d.forEach(function(c,d){!b[c]||b[c].pos>d?b[c]={fonts:[a],pos:d}:b[c].pos===d&&b[c].fonts.push(a)})}),b},c}),h.filter("startFrom",function(){return function(b,c){return a.isArray(b)?b.slice(c):b}}),h.provider("jdfsCuratedFonts",function(){function b(b,c){return b.filter(function(a){return c.indexOf(a.provider+"."+a.key)!==-1}).map(function(b){return a.copy(b)})}var c=[];this.setCuratedFontKeys=function(a){c=a},this.$get=[s,function(a){return b(a.getAllFonts(),c)}]});var la=["$http","$q","jdFontselectConfig","$filter","jdfsWebFont"],ma=!1;g.$inject=la,g.prototype={_init:function(){var b=this;b._fonts=b._fonts||[],b._map={},b._subsets=a.copy(aa.subsets),b._providers=a.copy(aa.providers),b._imports={},b._usedProviders={},b._initPromises=[],b._asyncProviderQueue=[],b._fontInitiators={},b.registerProvider(j,a.bind(b,b._loadGoogleFont)),b.registerProvider(i,function(){}),b._addDefaultFonts()},getAllFonts:function(){return this._fonts},ready:function(b){var c=this.$q.all(this._initPromises);return a.isFunction(b)&&c.then(b),c},add:function(b,c){var d=this;if(a.isString(c)||(c=a.isString(b.provider)?b.provider:i),b.provider=c,b.stack+=', "'+c+'"',!d.isValidFontObject(b))throw"Invalid font object.";return a.isObject(d._map[c])||(d._map[c]={}),a.isArray(b.subsets)&&d.setSubsets(b.subsets),d._fonts.push(b),b},searchFonts:function(a){var b=this;return b.$filter("filter")(b._fonts,a)},searchFont:function(a){var b=this,c=b.searchFonts(a);return 1===c.length?c[0]:c.length>0?b._getBestFontForSearch(c,a):void 0},getFontByKey:function(a,b){var c=this;if(!b)throw"Provider is not set.";var d=c.searchFont({key:a,provider:b});if(!d)throw'Font "'+a+'" not found in "'+b+'".';return d},getFontByStack:function(a,b){b="boolean"!=typeof b||b;var c,d=this;if(b){var e=d.searchFont({stack:a});c=e?[e]:[]}else c=d.$filter("stackSearch")(d._fonts,a);if(!c.length)throw new Error('Font with stack "'+a+'" not found.');return c[0]},getFontByStackAsync:function(a,b){b="boolean"!=typeof b||b;var c=this,d=c.$q.defer(),e=null;return c.$q.all(c._asyncProviderQueue).then(function(){try{var f=c.getFontByStack(a,b);d.resolve(f)}catch(g){b?(d.reject(g),delete c._initPromises[e]):d.resolve()}},d.reject),e=c._initPromises.push(d.promise)-1,d.promise},getFontsByStacksAsync:function(b,c){c="boolean"!=typeof c||c;var d=this,e=[];a.forEach(b,function(a){e.push(d.getFontByStackAsync(a,c))});var f=d.$q.all(e);if(c)return f;var g=d.$q.defer();return f.then(function(b){var c=[];a.forEach(b,function(b){a.isObject(b)&&c.push(b)}),g.resolve(c)},g.reject),g.promise},removeFont:function(b,c){var d=this;if(a.isString(b)&&!c)throw"Provider is not set.";try{a.isString(b)&&(b=d.getFontByKey(b,c));var e=d._fonts.indexOf(b),f=0;return e>=0&&(f=d._fonts.splice(e,1).length),f}catch(g){return 0}},isValidFontObject:function(b){if(!a.isObject(b))return!1;var c=!0;return a.forEach(B,function(d){a.isUndefined(b[d])&&(c=!1)}),c},getCategories:function(){return y},getImports:function(){return this._imports},getImportsForStacks:function(b,c){var d=this,e=d.$q.defer();if(a.isArray(b)){var f=[];d.getFontsByStacksAsync(b,c).then(function(a){f=a})["finally"](function(){e.resolve(d.getUrlsFor(f))})}else e.reject(new Error("No stacks given"));return e.promise},getSubsets:function(){return this._subsets},getProviders:function(){return this._providers},getUsage:function(){return this._usedProviders},getUsageForStacks:function(b){var c=this,d=c.$filter("stackSearch").normalizeStack,e=c.getProviders(),f={};return a.isArray(b)?(a.forEach(b,function(b){if(b){var c=d(b),g=c[c.length-1];f[g]||a.isUndefined(e[g])||(f[g]=!0)}}),f):f},setSubsets:function(a,b){var c=this;return c._setSelects(c._subsets,a,c._setSelectOptions(b))},setProviders:function(a,b){var c=this;return c._setSelects(c._providers,a,c._setSelectOptions(b))},setImports:function(a,b){var c=this;return c._setSelects(c._imports,a,c._setSelectOptions(b,{update:!0}))},setUsage:function(a,b){var c=this;return c._setSelects(c._usedProviders,a,c._setSelectOptions(b,{update:!0}))},registerProvider:function(a,b){var c=this,d={};d[a]=!1,c.setProviders(d),c._usedProviders[a]=!1,c._fontInitiators[a]=b},_escapeRegExp:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},_getBestFontForSearch:function(b,c){var d=this;return b.sort(function(b,e){var f=0,g=0;return a.forEach(c,function(c,h){if(a.isString(c)){var i=new RegExp(d._escapeRegExp(c));if(i.test(b[h])&&i.test(e[h])){var j=b[h].replace(c,"").length,k=e[h].replace(c,"").length;return void(j<k?f++:k<j&&g++)}}b[h]===c&&f++,e[h]===c&&g++}),f>g?-1:g>f?1:0}),b[0]},_setSelectOptions:function(b,c){return"boolean"==typeof b&&(b={additive:b}),a.isObject(c)||(c={}),b=a.extend({additive:!0,update:!1},b,c)},_setSelects:function(b,c,d){if(a.isUndefined(c))return b;if(a.isObject(d)||(d=this._setSelectOptions(d)),a.isArray(c)){for(var e={},f=0,g=c.length;f<g;f++)e[c[f]]=!1;c=e}return d.additive||a.forEach(b,function(a,d){c[d]||delete b[d]}),a.forEach(c,function(c,e){(d.update||a.isUndefined(b[e]))&&(b[e]=c)}),b},updateImports:function(){this.setImports(this.getUrls())},load:function(a){a.loaded||(a.loaded=!0,this._fontInitiators[a.provider](a))},getUrls:function(){var a=this,b=a.getGoogleUrl(),c={};return b&&(c[j]=b),c},getUrlsFor:function(a){var b=this,c=b.$filter("filter")(a,{provider:j}),d=b.getGoogleUrlFor(c),e={};return d&&(e[j]=d),e},updateUsage:function(b,c){var d=this;(!a.isNumber(b.used)||b.used<0)&&(b.used=0),b.used+=c===!1?-1:1,d._updateProvicerUsage()},_updateProvicerUsage:function(){var b=this,c=b.$filter("filter"),d=b.getUsedFonts();a.forEach(b._providers,function(a,e){b._usedProviders[e]=!!c(d,{provider:e}).length})},getUsedFonts:function(){var a=this;return a.$filter("filter")(a._fonts,{used:!0},function(a){return!!a})},getGoogleUrl:function(){var a=this,b=a.$filter("filter")(a.getUsedFonts(),{provider:j});return a.getGoogleUrlFor(b)},getGoogleUrlFor:function(b){var c=this,d=[],e=E;if(b.length){for(var f,g=[],h=0,i=b.length;h<i;h++)f=b[h].variants?":"+c._getBestVariantOf(b[h].variants):"",g.push(b[h].name+f);return e+="?family="+window.escape(g.join("|")),a.forEach(c._subsets,function(a,b){a&&d.push(b)}),d.length&&(e+="&subset="+d.join(",")),e}return!1},_remap:function(b,c){var d=this,e=d._fonts[b];a.isNumber(c)||(c=0);for(var f=c,g=e.length;f<g;f++)d._map[b][e[f].key]=f},_getBestOf:function(a,b){for(var c=0,d=b.length;c<d;c++){var e=b[c];if(a.indexOf(e)>=0)return e}return a[0]},_getBestVariantOf:function(a){return this._getBestOf(a,U)},_getBestSubsetOf:function(a){return this._getBestOf(a,M)},_initGoogleFonts:function(b){var d=this;if(d.jdFontselectConfig.googleApiKey&&(b||!ma)){var e=d.jdFontselectConfig.googleApiUrl||D;ma=!0;var f=d.$q.defer();d._initPromises.push(f.promise),d._asyncProviderQueue.push(f.promise),d.$http({method:C,url:e,params:{sort:"popularity",key:d.jdFontselectConfig.googleApiKey}}).success(function(b){var e=b.items.length,g=e-1,h=[];a.forEach(b.items,function(a,b){var i=d._getGoogleFontCat(a.family);h.push(d.add({subsets:a.subsets,variants:a.variants,name:a.family,popularity:e-b,key:c(a.family),lastModified:a.lastModified,stack:'"'+a.family+'", '+i.fallback,category:i.key},j)),g===b&&f.resolve(h)})}).error(f.reject)}},_getGoogleFontCat:function(a){for(var b=this,c=b.getCategories(),d=0,e=c.length;d<e;d++){var f=c[d];if("undefined"!=typeof fa[f.key]&&fa[f.key].indexOf(a)>=0)return f}return x[p]},_addDefaultFonts:function(){var b=this;a.forEach(w,function(a){b.add(a)})},_loadGoogleFont:function(a){var b=this;
try{b.jdfsWebFont.getFontLoader().load({google:{families:[a.name+":"+b._getBestVariantOf(a.variants)],text:a.name,subsets:a.subsets,subset:b._getBestSubsetOf(a.subsets)}})}catch(c){b.removeFont(a,j)}}},h.service(s,g),a.module("jdFontselect").run(["$templateCache",function(a){a.put("current-href.html",'<link ng-href={{url}} ng-repeat="url in urls">'),a.put("font.html",'<label class=jdfs-fontlist-font ng-class="{\'jdfs-active jdfs-highlight\': current.font.name == font.name}" for=jdfs-{{id}}-font-{{font.key}} style="font-family: {{font.stack}}"><input type=radio ng-model=current.font ng-value=font name=jdfs-{{id}}-font id=jdfs-{{id}}-font-{{font.key}}> {{font.name}}</label>'),a.put("fontlist-entry.html","<ng-switch on=entry.type><li ng-switch-when=FONT><jd-font current=current font=entry.content></jd-font></li><li ng-switch-when=HEADLINE class=jdfs-fontlist-headline>{{entry.content}}</li><li ng-switch-when=TEXT class=jdfs-fontlist-text>{{entry.content}}</li></ng-switch>"),a.put("fontlist.html",'<div class=jdfs-fontlistcon ng-class="{\'jdfs-active\': isActive()}"><button class="jdfs-fontpagination jdfs-fontpagination-prev" ng-click="paginate(\'prev\', $event)" ng-class="{\'jdfs-disabled\': !paginationButtonActive(\'prev\')}" ng-disabled="!paginationButtonActive(\'prev\')">{{text.page.prev}}</button><ul class=jdfs-fontlist><jd-fontlist-entry current=current entry=entry ng-repeat="entry in getFontlistEntries() | startFrom: page.current * page.size | limitTo: page.size"></jd-fontlist-entry></ul><button class="jdfs-fontpagination jdfs-fontpagination-next" ng-click="paginate(\'next\', $event)" ng-class="{\'jdfs-disabled\': !paginationButtonActive(\'next\')}" ng-disabled="!paginationButtonActive(\'next\')">{{text.page.next}}</button></div>'),a.put("fontselect.html",'<div class=jdfs-main id=jd-fontselect-{{suffixedId}}><button ng-click=toggleSearch($event) ng-class="{\'jdfs-highlight\': searching}" class=jdfs-search-indicator>{{text.searchToggleLabel}}</button> <button ng-click=toggleSearch($event) class=jdfs-toggle-search id=jd-fontselect-{{suffixedId}}-toggle-search ng-show=!searching><span class=jdfs-font-name style="font-family: {{current.font.stack}}">{{current.font.name || text.toggleSearchLabel}}</span></button> <input class=jdfs-search placeholder={{text.search}} name=jdfs-{{id}}-search ng-show=searching ng-model=current.search> <button class=jdfs-reset-search ng-click=resetSearch($event) ng-show="searching && current.search.length > 0">x</button> <button class=jdfs-toggle ng-click=toggle($event) id=jd-fontselect-{{suffixedId}}-toggle ng-class="{\'jdfs-highlight\': active}">{{active ? text.toggleCloseLabel : text.toggleOpenLabel}}</button><div class=jdfs-window ng-if=active><jd-fontlist fsid=id text=text meta=meta current=current fonts=fonts></jd-fontlist><div class=jdfs-footer-con><a class="jdfs-footer-tab-toggle jdfs-styles-label" ng-click=toggleStyles() ng-class="{\'jdfs-footer-tab-open\': stylesActive}">{{text.styleLabel}}</a> <a class="jdfs-footer-tab-toggle jdfs-settings-label" ng-click=toggleSettings() ng-class="{\'jdfs-footer-tab-open\': settingsActive}">{{text.settingsLabel}}</a><div class=jdfs-footer><div class=jdfs-styles ng-show=stylesActive><button class="jdfs-filterbtn jdfs-fontstyle-{{category.key}}" ng-repeat="category in categories" ng-class="{\'jdfs-active jdfs-highlight\': category.key == current.category}" ng-click="setCategoryFilter(category.key, $event)" ng-model=current.category>{{text.category[category.key] || toName(category.key)}}</button></div><div class=jdfs-settings ng-show=settingsActive><div class=jdfs-provider-list><h4 class=jdfs-settings-headline>{{text.providerLabel}}</h4><div ng-repeat="(provider, active) in current.providers" class=jdfs-provider ng-class="{\'jdfs-active jdfs-highlight\': current.providers[provider]}"><input ng-model=current.providers[provider] type=checkbox id=jdfs-{{id}}-provider-{{provider}}><label for=jdfs-{{id}}-provider-{{provider}}>{{text.provider[provider] || toName(provider)}}</label></div></div><div class=jdfs-subsets><h4 class=jdfs-settings-headline>{{text.subsetLabel}}</h4><div ng-repeat="(key, name) in current.subsets" class=jdfs-subset ng-class="{\'jdfs-active jdfs-highlight\': current.subsets[key]}"><input ng-model=current.subsets[key] type=checkbox id=jdfs-{{id}}-subset-{{key}}><label for=jdfs-{{id}}-subset-{{key}}>{{text.subset[key] || toName(key)}}</label></div></div></div></div></div><jd-meta meta=meta></jd-meta><button ng-click=toggle($event) class=jdfs-close><span>{{text.closeButton}}</span></button></div></div>'),a.put("meta.html",'<div class=jdfs-meta><div class=jdfs-fontcount>{{text.fontFabel}} <span ng-if="meta.fonts.current == meta.fonts.total">{{meta.fonts.total}}</span> <span ng-if="meta.fonts.total && meta.fonts.current != meta.fonts.total">{{meta.fonts.current}}/{{meta.fonts.total}}</span> <span ng-if=!meta.fonts.total>…</span></div><div class=jdfs-pagecon>{{text.pageLabel}} <span class=jdfs-page-current>{{meta.page.currentAbs + 1}}</span>/<span class=jdfs-page-count>{{meta.page.count}}</span></div></div>')}])}(window.angular);