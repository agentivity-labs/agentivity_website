/* Agentivity — animated team graph (hero), studio-hexagon style */
(function(){
  const VB={w:720,h:560};
  const N={
    orch:{x:360,y:64,label:"Orchestrator",role:"manager",orch:true},
    research:{x:152,y:198,label:"Research",role:"AI Agent"},
    analysis:{x:360,y:202,label:"Analysis",role:"AI Agent"},
    strategy:{x:568,y:198,label:"Strategy",role:"AI Agent"},
    data:{x:86,y:340,label:"Data Miner",role:"Tool"},
    search:{x:636,y:324,label:"Web Search",role:"Tool"},
    writer:{x:300,y:346,label:"Writer",role:"AI Agent"},
    reviewer:{x:520,y:346,label:"Reviewer",role:"AI Agent"},
    qa:{x:238,y:488,label:"QA",role:"AI Agent"},
    summary:{x:470,y:488,label:"Delivery",role:"AI Agent"}
  };
  const E=[["orch","research",2],["orch","analysis",2],["orch","strategy",2],["research","data",1],["research","analysis",1],["strategy","search",1],["strategy","reviewer",1],["analysis","writer",2],["data","writer",1],["writer","reviewer",1],["writer","qa",1],["reviewer","summary",2],["qa","summary",1]];
  const COLORS=["#00CFFF","#FF0A30","#6D00F5","#00C896"];
  function hexPath(cx,cy,R){let p="";for(let i=0;i<6;i++){const a=Math.PI/180*(60*i);p+=(i?"L":"M")+(cx+R*Math.cos(a)).toFixed(1)+" "+(cy+R*Math.sin(a)).toFixed(1);}return p+"Z";}
  function edgePath(a,b){const my=(a.y+b.y)/2;return `M${a.x} ${a.y} C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;}
  function chatGlyph(cx,cy,col){return `<g stroke="${col}" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="${cx-12}" y="${cy-12}" width="24" height="18" rx="5"/><path d="M${cx-5} ${cy+6} l0 6 l7 -6"/></g>`;}
  function toolGlyph(cx,cy,col){return `<g transform="translate(${cx-10},${cy-10})" stroke="${col}" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17 L11 9"/><path d="M10 5.5a4 4 0 0 0 5.2 5.2l-2.4-2.4 0-1.9 1.9 0 2.4 2.4A4 4 0 0 0 11.6 2.4l2.3 2.3"/></g>`;}
  function node(n){
    const R=n.orch?44:34;
    const accent=n.orch?"#FF0A30":(n.role==="Tool"?"#00C896":"#00CFFF");
    const glyph=n.role==="Tool"?toolGlyph(n.x,n.y,accent):chatGlyph(n.x,n.y,accent);
    const ring=n.orch?`<path class="orch-ring" d="${hexPath(n.x,n.y,R+7)}"/>`:"";
    return `<g class="node">
      <circle class="port" cx="${n.x-R}" cy="${n.y}" r="3.2"/><circle class="port" cx="${n.x+R}" cy="${n.y}" r="3.2"/>
      ${ring}
      <path class="hex ${n.orch?'orch':''}" d="${hexPath(n.x,n.y,R)}"/>
      ${glyph}
      <text class="node-label ${n.orch?'is-orch':''}" x="${n.x}" y="${n.y+R+18}">${n.label}</text>
      <text class="node-sub" x="${n.x}" y="${n.y+R+32}">${n.role}</text>
    </g>`;
  }
  function build(){
    const stage=document.querySelector("[data-team-stage]");if(!stage)return;
    let edges="",packets="";
    E.forEach((e,i)=>{const a=N[e[0]],b=N[e[1]],d=edgePath(a,b),w=e[2];edges+=`<path class="edge" d="${d}"/>`;for(let s=0;s<w;s++){const col=COLORS[(i+s)%COLORS.length];const dur=(2.2+(i%4)*0.25).toFixed(2);const delay=((i*0.17)+s*(dur/w)).toFixed(2);packets+=`<circle class="pkt" r="3.4" fill="${col}" style="color:${col};offset-path:path('${d}');animation-duration:${dur}s;animation-delay:-${delay}s"/>`;}});
    const nodes=Object.values(N).map(node).join("");
    stage.innerHTML=`<svg viewBox="0 0 ${VB.w} ${VB.h}" preserveAspectRatio="xMidYMid meet" aria-label="An Agentivity AI team: an orchestrator coordinating ten specialist agents that collaborate and pass work between each other."><g class="edges">${edges}</g><g class="packets">${packets}</g><g class="nodes">${nodes}</g></svg>`;
  }
  if(document.readyState!=="loading")build();else document.addEventListener("DOMContentLoaded",build);
})();
