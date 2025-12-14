// =========================
// CONFIG
// =========================
const WHATSAPP_NUMBER = "524445817329";

const LINKS = {
  instagram: "https://www.instagram.com/retrosportmx",
  facebook: "https://m.facebook.com/ElRetrosportMX/?",
  linkedin: "https://www.linkedin.com/company/retrosport/",
  x: "https://x.com/retrosportmx?s=21",
  threads: "https://www.threads.com/@retrosportmx?igshid=NTc4MTIwNjQ2YQ=="
};

const $ = (q)=>document.querySelector(q);
const $$ = (q)=>Array.from(document.querySelectorAll(q));

$("#year").textContent = new Date().getFullYear();

// Social links wiring
$("#linkLinkedIn").href = LINKS.linkedin;
$("#linkLinkedIn2").href = LINKS.linkedin;
$("#linkX").href = LINKS.x;
$("#linkX2").href = LINKS.x;
$("#linkThreads").href = LINKS.threads;
$("#linkThreads2").href = LINKS.threads;

// WhatsApp CTAs
function waLink(text){
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
}
const quickMsg = "Hola! Vengo de la pagina de Retro Sport. Quiero hacer un pedido 🙌";
$("#ctaWaTop").href = waLink(quickMsg);
$("#ctaWaHero").href = waLink(quickMsg);
$("#ctaWaWelcome").href = waLink(quickMsg);

// Mobile menu toggle
const btnMenu = $("#btnMenu");
const mobilePanel = $("#mobilePanel");
btnMenu.addEventListener("click", ()=> mobilePanel.classList.toggle("show"));
$$("#mobilePanel a").forEach(a=>{
  a.addEventListener("click", ()=> mobilePanel.classList.remove("show"));
});

// Smooth scroll
$$(".links a, .mobile-panel a").forEach(a=>{
  a.addEventListener("click", (e)=>{
    const href = a.getAttribute("href");
    if(href && href.startsWith("#")){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
});

// Fix iconos Safari iOS
document.querySelectorAll("use").forEach(u=>{
  const h = u.getAttribute("href");
  if(h && !u.getAttribute("xlink:href")){
    u.setAttribute("xlink:href", h);
  }
});

// Autoplay seguro iOS
function forcePlayVideos(){
  document.querySelectorAll("video[autoplay]").forEach(v=>{
    v.muted = true;
    v.playsInline = true;
    v.setAttribute("playsinline","");
    v.setAttribute("webkit-playsinline","");
    const p = v.play();
    if(p && typeof p.catch === "function"){ p.catch(()=>{}); }
  });
}
document.addEventListener("DOMContentLoaded", forcePlayVideos);
document.addEventListener("visibilitychange", ()=>{ if(!document.hidden) forcePlayVideos(); });

// Countries
const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
  "Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica",
  "Cote d'Ivoire","Croatia","Cuba","Cyprus","Czechia","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador",
  "Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon",
  "Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti",
  "Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein",
  "Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania",
  "Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia",
  "Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman",
  "Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia",
  "Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia",
  "South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan",
  "Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan",
  "Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City",
  "Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];
const countrySel = $("#country");
const defaultCountry = "Mexico";
countrySel.innerHTML = countries.map(c => {
  const sel = (c === defaultCountry) ? "selected" : "";
  return `<option value="${c}" ${sel}>${c}</option>`;
}).join("");

// Choice components
function setupChoices(containerId, {single=false, groupAttr=null} = {}){
  const container = document.getElementById(containerId);
  const items = Array.from(container.querySelectorAll(".choice"));
  items.forEach(item=>{
    item.addEventListener("click", ()=>{
      if(single){
        items.forEach(i=>{
          if(groupAttr){
            if(i.dataset[groupAttr] === item.dataset[groupAttr]) i.classList.remove("selected");
          }else i.classList.remove("selected");
        });
        item.classList.add("selected");
      }else{
        item.classList.toggle("selected");
      }
    });
  });
  return ()=> items.filter(i=>i.classList.contains("selected")).map(i=>i.dataset.value);
}
const getPatches = setupChoices("patches", {single:false});
const getDelivery = setupChoices("delivery", {single:true, groupAttr:"group"});

$$("#delivery .choice").forEach(ch=>{
  ch.addEventListener("click", ()=>{
    const val = ch.dataset.value || "";
    $("#deliveryHint").textContent = "Seleccionado: " + val;
  });
});

// Color preview
const colorInput = $("#colorName");
const swatch = $("#swatch");
const swatchText = $("#swatchText");

function colorToCss(name){
  if(!name) return "";
  const t = name.trim().toLowerCase();
  const map = {
    "rojo":"red","azul":"dodgerblue","azul marino":"navy","marino":"navy","amarillo":"gold",
    "negro":"black","blanco":"white","gris":"gray","verde":"green","morado":"purple",
    "naranja":"orange","rosa":"hotpink","vino":"maroon","beige":"beige","cafe":"saddlebrown","café":"saddlebrown"
  };
  if(map[t]) return map[t];
  return t;
}
colorInput.addEventListener("input", ()=>{
  const v = colorInput.value;
  const css = colorToCss(v);
  const test = document.createElement("div");
  test.style.color = css;
  const ok = test.style.color !== "";
  swatch.style.background = ok ? css : "rgba(255,255,255,.10)";
  swatchText.textContent = ok ? `Color: ${v}` : "Vista previa del color";
  swatch.style.borderColor = ok ? "rgba(255,255,255,.25)" : "rgba(255,255,255,.16)";
});

// Guia de tallas tabs
const tabAdulto = $("#tabAdulto");
const tabNino = $("#tabNino");
const panelAdulto = $("#panelAdulto");
const panelNino = $("#panelNino");

tabAdulto.addEventListener("click", ()=>{
  tabAdulto.classList.add("active");
  tabNino.classList.remove("active");
  panelAdulto.style.display = "block";
  panelNino.style.display = "none";
});
tabNino.addEventListener("click", ()=>{
  tabNino.classList.add("active");
  tabAdulto.classList.remove("active");
  panelAdulto.style.display = "none";
  panelNino.style.display = "block";
});

// Submit => WhatsApp message
$("#orderForm").addEventListener("submit", (e)=>{
  e.preventDefault();

  const data = {
    country: $("#country").value,
    postal: $("#postal").value.trim(),
    email: $("#email").value.trim(),
    fullName: $("#fullName").value.trim(),
    product: $("#product").value.trim(),
    size: $("#size").value,
    manga: document.querySelector('input[name="manga"]:checked')?.value || "Manga corta",
    cityState: $("#cityState").value.trim(),
    qty: $("#qty").value,
    playerName: $("#playerName").value.trim(),
    playerNumber: $("#playerNumber").value.trim(),
    colorName: $("#colorName").value.trim(),
    notes: $("#notes").value.trim(),
    patches: getPatches(),
    delivery: getDelivery()[0] || ""
  };

  if(!data.delivery){
    alert("Selecciona un tipo de entrega.");
    return;
  }

  const lines = [];
  lines.push("Hola Retro Sport! Quiero hacer un pedido:");
  lines.push("");
  lines.push("DATOS DEL CLIENTE");
  lines.push(`- Nombre: ${data.fullName}`);
  lines.push(`- Correo: ${data.email}`);
  lines.push(`- Pais: ${data.country}`);
  lines.push(`- Codigo Postal: ${data.postal}`);
  lines.push(`- Ciudad/Estado: ${data.cityState}`);
  lines.push("");
  lines.push("PRODUCTO");
  lines.push(`- Producto/Camisa: ${data.product}`);
  lines.push(`- Talla: ${data.size}`);
  lines.push(`- Tipo de manga: ${data.manga}`);
  lines.push(`- Cantidad: ${data.qty}`);
  if(data.colorName) lines.push(`- Color/Variacion: ${data.colorName}`);
  if(data.playerName) lines.push(`- Jugador: ${data.playerName}`);
  if(data.playerNumber) lines.push(`- Numero: ${data.playerNumber}`);
  if(data.patches.length) lines.push(`- Parches: ${data.patches.join(", ")}`);
  lines.push("");
  lines.push("ENTREGA");
  lines.push(`- Tipo: ${data.delivery}`);
  lines.push("");
  if(data.notes) {
    lines.push("DETALLES");
    lines.push(`- ${data.notes}`);
    lines.push("");
  }
  lines.push("Gracias! 🙌");

  window.open(waLink(lines.join("\n")), "_blank", "noopener");
});
