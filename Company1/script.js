
const BASE='https://psdp-my.sharepoint.com/personal/hassan_psdp_onmicrosoft_com/Documents/shetrade/company01/assets/';

logo.src=BASE+'logo.png';
banner.src=BASE+'banner.jpg';

let PRODUCTS=[];

async function loadSiteInfo(){
 try{
   const txt=await fetch(BASE+'siteinfo.csv').then(r=>r.text());
   console.log(txt);
 }catch(e){console.log('siteinfo fetch failed',e);}
}

async function loadProductsCSV(){
 try{
   const txt=await fetch(BASE+'products.csv').then(r=>r.text());
   const rows=txt.trim().split(/\r?\n/);
   if(rows.length<2) throw 'csv empty';

   rows.slice(1).forEach(row=>{
      const c=row.split(',');
      PRODUCTS.push({
       id:c[0]||'',
       name:c[1]||('Product '+c[0]),
       price:c[2]||'',
       category:c[3]||'',
       description:c[4]||'',
       image:c[5]||('product'+c[0]+'.jpeg')
      });
   });

   renderProducts();
 }
 catch(err){
   console.log('CSV failed, fallback image scan',err);
   imageFallback();
 }
}

function renderProducts(){
 products.innerHTML='';
 PRODUCTS.forEach((p,i)=>{
   const card=document.createElement('div');
   card.className='card';
   card.innerHTML=`
   <img src="${BASE}${p.image}" onerror="this.src='${BASE}product${p.id}.jpeg'">
   <div class="info">
     <h3>${p.name}</h3>
     <div>${p.price}</div>
   </div>`;
   card.onclick=()=>openModal(i);
   products.appendChild(card);
 });
}

function imageFallback(){
 for(let i=1;i<=99;i++){
   let img=new Image();
   img.src=BASE+'product'+i+'.jpeg';
   img.onload=function(){
      const card=document.createElement('div');
      card.className='card';
      card.innerHTML=`<img src="${img.src}"><div class="info"><h3>Product ${i}</h3></div>`;
      products.appendChild(card);
   }
 }
}

function openModal(i){
 const p=PRODUCTS[i];
 if(!p) return;
 modal.style.display='block';
 modalImg.src=BASE+p.image;
 modalTitle.innerText=p.name;
 modalDesc.innerText=p.description;
 modalPrice.innerText=p.price;
 waBtn.href='https://wa.me/201001234433?text='+encodeURIComponent('Interested in '+p.name);
}

function closeModal(){modal.style.display='none';}

loadSiteInfo();
loadProductsCSV();
