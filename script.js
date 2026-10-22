const $=id=>document.getElementById(id),fmt=n=>"UGX "+Number(n).toLocaleString("en-US");
$("yr").textContent=new Date().getFullYear();
// typing tagline
const L=["Quality teaching and strong values","Pay school fees online","Learn. Grow. Lead."];let li=0,ci=0,dl=false;
(function ty(){const t=L[li];$("tag").textContent=t.slice(0,ci);if(!dl&&ci===t.length){dl=true;return setTimeout(ty,1600)}if(dl&&ci===0){dl=false;li=(li+1)%L.length}ci+=dl?-1:1;setTimeout(ty,dl?35:65)})();
// menu
$("burger").onclick=()=>{const o=$("nav").classList.toggle("open");$("burger").setAttribute("aria-expanded",o)};
// routing
const API_URL = "https://script.google.com/macros/s/AKfycbwF-zJV3p7VMeqA11Rn1H2KP7TTdndbtye13jGWPpXFtlDYNUsiW3s23DnMeJKTIyiW/exec";
const pages=[...document.querySelectorAll(".page")],links=[...document.querySelectorAll("nav a")];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);e.target.querySelectorAll("[data-to]").forEach(c=>{const to=+c.dataset.to;let n=0;const s=Math.max(1,Math.ceil(to/50)),i=setInterval(()=>{n=Math.min(to,n+s);c.textContent=n+"+";if(n>=to)clearInterval(i)},30)})}}),{threshold:.15});
function show(){const id=(location.hash||"#home").slice(1),p=pages.find(x=>x.id===id)||pages[0];
  pages.forEach(x=>x.classList.toggle("on",x===p));links.forEach(a=>a.classList.toggle("on",a.hash==="#"+p.id));
  $("nav").classList.remove("open");$("burger").setAttribute("aria-expanded","false");window.scrollTo({top:0});
  p.querySelectorAll(".rv").forEach(e=>{e.classList.remove("in");io.observe(e)});document.title=(p.querySelector("h1,h2")?.textContent||"Home")+" | Luru Secondary School"}
addEventListener("hashchange",show);show();
// validation helpers
function chk(rules,id){const ok=rules[id]($(id).value);$(id).classList.toggle("invalid",!ok);document.querySelector(`.err[data-for="${id}"]`).classList.toggle("show",!ok);return ok}
function wire(rules){Object.keys(rules).forEach(id=>$(id).addEventListener("blur",()=>chk(rules,id)))}
// payment
const R={fname:v=>v.trim().length>1,lname:v=>v.trim().length>1,sid:v=>/^LSS-\d{4}-\d{3,4}$/i.test(v.trim()),cls:v=>!!v,term:v=>!!v,type:v=>!!v,phone:v=>/^(\+?256|0)7\d{8}$/.test(v.replace(/\s|-/g,"")),amount:v=>+v>=1000,txn:v=>/^[A-Za-z0-9]{6,20}$/.test(v.trim())};
wire(R);
function total(){const b=$("totalShow");b.textContent=fmt($("amount").value||0);b.classList.add("bump");setTimeout(()=>b.classList.remove("bump"),250)}
$("type").onchange=e=>{if(e.target.value){$("amount").value=e.target.value;total()}};$("amount").oninput=total;
$("payForm").onsubmit=e=>{e.preventDefault();
  if(Object.keys(R).map(k=>chk(R,k)).includes(false)){document.querySelector(".invalid").focus();return}
  const rows=[["Reference","LSS"+Date.now().toString().slice(-8)],["Student",$("fname").value.trim()+" "+$("lname").value.trim()],["Student ID",$("sid").value.trim().toUpperCase()],["Class / Term",$("cls").value+" · "+$("term").value],["Payment for",$("type").selectedOptions[0].text],["Method",document.querySelector("input[name=method]:checked").value],["Transaction ID",$("txn").value.trim().toUpperCase()],["Paid to","Equity Bank 1050103320267 / +256 767 715 491"],["Date",new Date().toLocaleString("en-GB")],["Amount paid",fmt($("amount").value)]];
  $("rt").innerHTML=rows.map(r=>`<div><span>${r[0]}</span><span>${r[1]}</span></div>`).join("");
  $("formView").style.display="none";$("receipt").classList.add("show")};
$("again").onclick=()=>{$("payForm").reset();total();$("receipt").classList.remove("show");$("formView").style.display="block"};
// contact
const M={mn:v=>v.trim().length>1,mp:v=>v.trim().length>4,mm:v=>v.trim().length>4};wire(M);
$("msgForm").onsubmit=e=>{e.preventDefault();if(Object.keys(M).map(k=>chk(M,k)).includes(false))return;$("sent").classList.add("show");$("msgForm").reset()};
