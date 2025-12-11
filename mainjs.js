import { sp } from './product.js';

const menu = [
    { name: "Trang chủ", link: "main.html" },
    { name: "Trà sữa", link: "tea.html" },
    { name: "Cà phê", link: "cafe.html" },
    { name: "Menu", submenu: ["Trà sữa", "Cà phê", "Tất cả"], link: "menu.html" },
];

function Product(cate, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const products = [...sp];

    const filteredProducts = products.filter(item => cate === "" || item.type === cate);

    const [firstProduct, ...otherProducts] = filteredProducts;

    let html = "";

    if (firstProduct) {
        html += `
            <div class="product-item">
                <a href="detail.html?id=${firstProduct.id}" class="product-link">
                    <img src="${firstProduct.img}" alt="${firstProduct.name}">
                    <div class="product-info">
                        <h3>${firstProduct.name}</h3>
                        <p class="price">${firstProduct.price}đ</p>
                    </div>
                </a>
                <div class="product-actions">
                    <span class="btn-buy" onclick="event.stopPropagation(); addToCart(${firstProduct.id})">
                        Thêm giỏ hàng
                    </span>
                    <a href="detail.html?id=${firstProduct.id}" class="btn-buy">Xem thêm</a>
                </div>
            </div>
        `;
    }

    otherProducts.forEach(item => {
        html += `
            <div class="product-item">
                <a href="detail.html?id=${item.id}" class="product-link">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="product-info">
                        <h3>${item.name}</h3>
                        <p class="price">${item.price}đ</p>
                    </div>
                </a>
                <div class="product-actions">
                    <span class="btn-buy" onclick="event.stopPropagation(); addToCart(${item.id})">
                        Thêm giỏ hàng
                    </span>
                    <a href="detail.html?id=${item.id}" class="btn-buy">Xem thêm</a>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}


function getProductById(id) {
    return sp.find(p => p.id === id);
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
    const cart = getCart();
    const prod = sp.find(p => p.id === id);
    if (!prod) return;

    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity++;
    else cart.push({ id: prod.id, name: prod.name, price: prod.price, image: prod.img, quantity: 1 });

    saveCart(cart);
    updateCartCount();
}

function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (!countEl) return;
    const total = getCart().reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = total;
}

// --- HEADER ---
function renderHeader() {
    const header = document.getElementById("header");
    if (!header) return;

    const isLoginPage = window.location.pathname.includes("login.html") || window.location.pathname.includes("register.html");
    const userId = sessionStorage.getItem("userId");
    const loggedIn = userId !== null;

    if (isLoginPage) {
        header.innerHTML = `
            <p>Hơn 40 cửa hàng khắp cả nước — Phone: 0911223344</p>
            <div class="login">
                <li><a href="login.html">Đăng nhập</a></li>
                <li><a href="register.html">Đăng ký</a></li>
            </div>
        `;
        return;
    }

    const accountMenu = loggedIn
        ? `<li><a href="user.html">Tài khoản</a></li>`
        : `<li><a href="login.html">Đăng nhập</a></li>
           <li><a href="register.html">Đăng ký</a></li>`;

    header.innerHTML = `
        <div class="wrapper">
            <div class="info-center">
                Hơn 40 cửa hàng khắp cả nước — Phone: 0911223344
            </div>
            <ul class="login">
                ${accountMenu}
                <li><a href="cart.html">Giỏ hàng (<span id="cart-count">0</span>)</a></li>
            </ul>
        </div>
    `;

    updateCartCount();
}

// --- MENU ---
function renderMenu() {
    const menuEl = document.getElementById("menu");
    if (!menuEl) return;

    let menuHTML = "";
    menu.forEach(m => {
        menuHTML += `<li><a href="${m.link}">${m.name}</a></li>`;
    });
    menuEl.innerHTML = `<div class="nav-wrapper"><ul class="mainmenu">${menuHTML}</ul></div>`;
}

// --- FOOTER ---
function renderFooter() {
    const footer = document.getElementById("footer");
    if (!footer) return;

    footer.innerHTML = `
        <div class="nd">
            <div><h4>Liên hệ</h4><a href="">Về chúng tôi</a><a href="">Sản phẩm</a><a href="">Cửa hàng</a><a href="">Khuyến mãi</a></div>
            <div><h4>Điều khoản</h4><a href="">Điều khoản sử dụng</a><a href="">Chính sách bảo mật</a></div>
            <div><h4>Hỗ trợ</h4><a href="">Liên hệ</a><a href="">Địa chỉ</a></div>
            <div><h4>Logo</h4><img src="img/images (8).jpg" width="90"></div>
        </div>
        <div class="trachnhiem">Công ty trách nhiệm hữu hạn một thành viên :P</div>
    `;
}

// --- PRODUCT DETAIL ---
function renderProductDetail() {
    const detailEl = document.getElementById("product-detail");
    if (!detailEl) return;

    const id = parseInt(new URLSearchParams(window.location.search).get("id"));
    const detail = sp.find(item => item.id === id);

    if (!detail) {
        detailEl.innerHTML = `
            <h2 style="color: red; text-align: center;">Không tìm thấy sản phẩm!</h2>
            <p style="text-align:center;"><a href="main.html">Quay lại trang chủ</a></p>
        `;
        return;
    }

    document.title = detail.name;

    detailEl.innerHTML = `
        <div class="detail-img">
            <img src="${detail.img}" alt="${detail.name}">
        </div>
        <div class="detail-info">
            <h1>${detail.name}</h1>
            <p class="price-big">${detail.price}đ</p>
            <!-- Các phần mô tả, size, topping, nút mua -->
            <div class="option-group">
                <p class="option-title">Kích thước:</p>
                <div class="size-options">
                    <input type="radio" id="size-m" name="size" checked>
                    <label for="size-m" class="size-btn">M</label>
                    <input type="radio" id="size-l" name="size">
                    <label for="size-l" class="size-btn">L (+5.000đ)</label>
                </div>
            </div>
            <div class="option-group">
                <p class="option-title">Topping thêm:</p>
                <div class="topping-options">
                    <input type="checkbox" id="topping1">
                    <label for="topping1" class="topping-btn">Trân châu</label>
                    <input type="checkbox" id="topping2">
                    <label for="topping2" class="topping-btn">Thạch</label>
                    <input type="checkbox" id="topping3">
                    <label for="topping3" class="topping-btn">Pudding</label>
                    <input type="checkbox" id="topping4">
                    <label for="topping4" class="topping-btn">Kem cheese</label>
                </div>
                <div><button class="btn-buy" onclick="alert('Đã mua hàng thành công!')">Mua ngay</button></div>
            </div>
            <a href="main.html">Quay về home</a>
        </div>
    `;
}

function Banner() {
    const el = document.getElementById("banner");
    if (!el) return;

    el.innerHTML = `
        <a href="menu.html">
            <img src="img/banner-quang-cao-tra-sua-1_1623309813.jpg" alt="Khuyến mãi">
        </a>
    `;
}

function About() {
    const el = document.getElementById("cuahang");
    if (!el) return;

    el.innerHTML = `
        <div>
            <h1>Nơi trò chuyện cà phê</h1>
            <p>Phục vụ cafe và ý tưởng sáng tạo cho bạn</p>
            <a href="" class="button">Tìm hiểu thêm</a>
        </div>
        <img src="img/3-tiem-cafe-binh-duong-ivivu.jpg" alt="Cửa hàng">
    `;
}

function QC() {
    const el = document.getElementById("qc");
    if (!el) return;

    el.innerHTML = `
        <a href="menu.html">
            <img src="img/banner-quang-cao-tra-sua-1_1623309813.jpg" alt="Khuyến mãi">
        </a>
    `;
}


// --- DOMContentLoaded ---
window.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderMenu();
    Product('cafe','row1');
    renderFooter();
    About();
    QC();
    Product('trasua','row2');
});

// --- Export ra window để dùng onclick trong HTML string ---
window.Product = Product;
window.addToCart = addToCart;
window.getProductById = getProductById;
window.renderHeader = renderHeader;
window.renderMenu = renderMenu;
window.renderFooter = renderFooter;

window.renderProductDetail = renderProductDetail;
