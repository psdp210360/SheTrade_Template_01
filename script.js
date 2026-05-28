
const productsGrid = document.getElementById('productsGrid');
const basketItems = document.getElementById('basketItems');
const basketTotal = document.getElementById('basketTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

const images = [
'product1.jpeg',
'product2.jpeg',
'product3.jpeg',
'product6.jpeg',
'product7.jpeg',
'product8.jpeg',
'product9.jpeg',
'product10.jpeg',
'product11.jpeg',
'product12.jpeg',
'product16.jpeg',
'product17.jpeg'
];

const names = [
'Luxury Lamp',
'Decor Tree',
'Boho Pillow',
'Luxury Lantern',
'Turquoise Ring',
'Golden Lamp',
'Stone Decor',
'Modern Pillow',
'Copper Ring',
'Textured Lamp',
'Blue Earrings',
'Colorful Vase'
];

let basket = [];

images.forEach((img,index)=>{

const price = 450 + (index+1)*140;

const card = document.createElement('div');
card.classList.add('product-card');

card.innerHTML = `
<img src="Assets/${img}" loading="lazy">

<div class="product-info">

<h3>${names[index]}</h3>

<p>
Premium handmade artistic decor with elegant modern styling.
</p>

<div class="price">
${price} EGP
</div>

<button class="add-btn" onclick="addToBasket('${names[index]}',${price})">
Add to Basket
</button>

</div>
`;

productsGrid.appendChild(card);

});

function addToBasket(name,price){

basket.push({name,price});

renderBasket();

}

function renderBasket(){

basketItems.innerHTML='';

let total = 0;
let msg = 'Hello, I want to order:%0A';

basket.forEach(item=>{

total += item.price;

msg += `- ${item.name} (${item.price} EGP)%0A`;

basketItems.innerHTML += `
<div class="basket-item">
<span>${item.name}</span>
<strong>${item.price} EGP</strong>
</div>
`;

});

basketTotal.innerHTML = `Total: ${total} EGP`;

msg += `%0ATotal: ${total} EGP`;

checkoutBtn.href =
`https://wa.me/201001234433?text=${msg}`;

}
