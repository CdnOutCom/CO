!function(){function t(t){for(n=0;t>n;++n)a.shg_table.push(e);++e}for(var r=1,a={mul_table:[256,256,200,256,72,200,79,256,149,72,15,200,132,79,36,256,198,149,108,72,42,15,240,200,164,132,104,79,56,36,17,256,226,198,172,149,127,108,89,72,56,42,28,15,3,240,219,200,181,164,148,132,118,104,91,79,67,56,46,36,26,17,9,256,241,226,212,198,185,172,161,149,138,127,117,108,98,89,81,72,64,56,49,42,35,28,22,15,9,3,251,240,229,219,209,200,190,181,172,164,156,148,140,132,125,118,111,104,98,91,85,79,73,67,62,56,51,46,41,36,31,26,22,17,13,9,5,256,249,241,233,226,219,212,205,198,191,185,179,172,166,161,155,149,143,138,133,127,122,117,112,108,103,98,94,89,85,81,76,72,68,64,60,56,53,49,45,42,38,35,31,28,25,22,18,15,12,9,6,3,1,251,245,240,235,229,224,219,214,209,204,200,195,190,186,181,177,172,168,164,160,156,152,148,144,140,136,132,129,125,121,118,114,111,107,104,101,98,94,91,88,85,82,79,76,73,70,67,64,62,59,56,54,51,48,46,43,41,38,36,33,31,29,26,24,22,19,17,15,13,11,9,7,5,3],shg_table:[9,11,12,13,13,14,14],processImage:function(t,e,n){var s=document.createElement("canvas"),g=new Image;g.onload=function(){w=t.width,h=t.height,s.style.width=w+"px",s.style.height=h+"px",s.width=w,s.height=h;var e=s.getContext("2d");e.clearRect(0,0,w,h),e.drawImage(g,0,0,w,h);var u=n||r;if(radius=Math.sqrt(w*h)/Math.sqrt(g.naturalWidth*g.naturalHeight)*u,!(isNaN(radius)||radius<1)){radius|=0;var l,o,i,d,b,f,c,x,m,v,p,I,_,C,D,q,y,M,N,R,A=s.getContext("2d").getImageData(0,0,w,h),E=A.data,H=radius+radius+1,L=(w<<2,w-1),U=h-1,W=radius+1,j=W*(W+1)/2,k={r:0,g:0,b:0,a:0,next:null},z=k;for(i=1;H>i;i++)if(z=z.next={r:0,g:0,b:0,a:0,next:null},i==W)var B=z;z.next=k;var F=null,G=null;c=f=0;var J=a.mul_table[radius],K=a.shg_table[radius];for(o=0;o<h;o++){for(C=D=q=x=m=v=0,p=W*(y=E[f]),I=W*(M=E[f+1]),_=W*(N=E[f+2]),x+=j*y,m+=j*M,v+=j*N,z=k,i=0;W>i;i++)z.r=y,z.g=M,z.b=N,z=z.next;for(i=1;W>i;i++)d=f+((i>L?L:i)<<2),x+=(z.r=y=E[d])*(R=W-i),m+=(z.g=M=E[d+1])*R,v+=(z.b=N=E[d+2])*R,C+=y,D+=M,q+=N,z=z.next;for(F=k,G=B,l=0;l<w;l++)E[f]=x*J>>K,E[f+1]=m*J>>K,E[f+2]=v*J>>K,x-=p,m-=I,v-=_,p-=F.r,I-=F.g,_-=F.b,d=c+((d=l+radius+1)<L?d:L)<<2,C+=F.r=E[d],D+=F.g=E[d+1],q+=F.b=E[d+2],x+=C,m+=D,v+=q,F=F.next,p+=y=G.r,I+=M=G.g,_+=N=G.b,C-=y,D-=M,q-=N,G=G.next,f+=4;c+=w}for(l=0;l<w;l++){for(D=q=C=m=v=x=0,f=l<<2,p=W*(y=E[f]),I=W*(M=E[f+1]),_=W*(N=E[f+2]),x+=j*y,m+=j*M,v+=j*N,z=k,i=0;W>i;i++)z.r=y,z.g=M,z.b=N,z=z.next;for(b=w,i=1;i<=radius;i++)f=b+l<<2,x+=(z.r=y=E[f])*(R=W-i),m+=(z.g=M=E[f+1])*R,v+=(z.b=N=E[f+2])*R,C+=y,D+=M,q+=N,z=z.next,U>i&&(b+=w);for(f=l,F=k,G=B,o=0;o<h;o++)d=f<<2,E[d]=x*J>>K,E[d+1]=m*J>>K,E[d+2]=v*J>>K,x-=p,m-=I,v-=_,p-=F.r,I-=F.g,_-=F.b,d=l+((d=o+W)<U?d:U)*w<<2,x+=C+=F.r=E[d],m+=D+=F.g=E[d+1],v+=q+=F.b=E[d+2],F=F.next,p+=y=G.r,I+=M=G.g,_+=N=G.b,C-=y,D-=M,q-=N,G=G.next,f+=w}var O=t.getAttribute("src");if(null!=O&&""!=O){var P=new Image;P.onload=function(){t.src=O},P.src=O}s.getContext("2d").putImageData(A,0,0),t.src=s.toDataURL()}},g.src=e}},e=15,n=0;n<a.mul_table.length;)a.mul_table[n++]+=256;t(4),t(4),t(7),t(9),t(14),t(18),t(27),t(37),t(54),t(74);var s={process:a.processImage};module.exports=s}();
//# sourceMappingURL=antimoderate.min.js.map