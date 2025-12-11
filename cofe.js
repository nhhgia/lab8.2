const sp = [
    {img: "img/images (12).jpg", name:"Cà phê sữa", price:"25.000",type:"cafe",link:"/asm/detail/cafesua.html"},
    {img: "img/images (13).jpg", name:"Cà phê gói", price:"60.000",type:"cafe",link:"/asm/detail/cafegoi.html"},
    {img: "img/images (14).jpg", name:"Cà phê đen", price:"25.000",type:"cafe",link:"/asm/detail/cafeden.html"},
    {img: "img/vi-dang-cafe-3.jpg", name:"Cà phê rang xay", price:"25.000",type:"cafe",link:"/asm/detail/rangxay.html"},
]
let cafe= "";
for (let i = 0; i < sp.length; i++){
        
    
    cafe += ` <div>
    <a href="${sp[i].link}">
    <img src="${sp[i].img}" alt="">
    <p>${sp[i].name}</p>
    <p>${sp[i].price} đ</p>
    </a>
    </div>`
}
document.getElementById("cafe").innerHTML = cafe;

