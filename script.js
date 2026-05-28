
const grid=document.getElementById('productsGrid');
const search=document.getElementById('searchInput');
let products=[];

Papa.parse('data/products.csv',{
download:true,
header:true,
complete:(r)=>{products=r.data;render(products);}
});

function render(arr){
grid.innerHTML='';
arr.forEach(p=>{
if(!p.name)return;
grid.innerHTML+=`
<div class="card">
<img src="Assets/${p.image}">
<div class="info">
<h3>${p.name}</h3>
<p>${p.description}</p>
<div class="price">${p.price} EGP</div>
<a class="btn" target="_blank" href="https://wa.me/201000000000?text=I want ${p.name}">
WhatsApp Order
</a>
</div>
</div>`;
});
}

search.addEventListener('input',()=>{
const k=search.value.toLowerCase();
render(products.filter(p=>p.name && (p.name.toLowerCase().includes(k)||p.category.toLowerCase().includes(k))));
});
