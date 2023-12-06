function addToSidebar(button) {
    var card = button.closest('.card');
    var title = card.querySelector('.card-title').innerText;
    var price = parseFloat(card.querySelector('.card-text').innerText.replace('Rp. ', ''));

    // Mengecek apakah item sudah ada di sidebar
    var existingItem = findCartItem(title);

    if (existingItem) {
        // Jika item sudah ada, tingkatkan quantity
        existingItem.quantity++;
        updateCartItem(existingItem);
    } else {
        // Jika item belum ada, tambahkan ke sidebar
        var listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${title}</strong> - Rp. ${price.toFixed(3)} x<span class="quantity"> 1</span>`;
        listItem.classList.add('cart-item');
        document.getElementById('cart-items').appendChild(listItem);
    }

    // Update Total
    updateTotal(price);
    // Update Total di footer
    updateFooterTotal(price);
}

function findCartItem(title) {
    var cartItems = document.querySelectorAll('.cart-item');
    for (var i = 0; i < cartItems.length; i++) {
        var itemTitle = cartItems[i].querySelector('strong').innerText;
        if (itemTitle === title) {
            return {
                element: cartItems[i],
                quantity: parseInt(cartItems[i].querySelector('.quantity').innerText)
            };
        }
    }
    return null;
}

function updateCartItem(cartItem) {
    var price = parseFloat(cartItem.element.innerText.split(' - ')[1].replace('Rp. ', '').split(' x')[0]);

    // Jumlahkan harga dengan quantitya
    var newTotal = price * cartItem.quantity;

    cartItem.element.innerHTML = `<strong>${cartItem.element.querySelector('strong').innerText}</strong> - Rp. ${price.toFixed(3)} x<span class="quantity"> ${cartItem.quantity}</span>`;
}

function updateTotal(itemPrice) {
    var currentTotal = parseFloat(document.getElementById('total').innerText.replace('Rp. ', ''));
    var newTotal = currentTotal + itemPrice;
    document.getElementById('total').innerText = 'Rp. ' + newTotal.toFixed(3);
}

function updateFooterTotal(itemPrice) {
    var currentFooterTotal = parseFloat(document.getElementById('footer-total').innerText.replace('Rp. ', ''));
    var newFooterTotal = currentFooterTotal + itemPrice;
    document.getElementById('footer-total').innerText = 'Rp. ' + newFooterTotal.toFixed(3);
}

document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            filterMenuItems(this.value.toLowerCase());
        });
    }
});

function resetCart() {
    var cartItems = document.getElementById('cart-items');
    while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
    }
    document.getElementById('total').innerText = 'Rp. 0.00';
    document.getElementById('footer-total').innerText = 'Rp. 0.00';
}

function placeOrder() {
    // Mengambil Total footer
    var currentFooterTotal = parseFloat(document.getElementById('footer-total').innerText.replace('Rp. ', ''));

    // Calculate Tax
    var taxRate = 0.1; // Assuming tax rate is 10%
    var taxAmount = currentFooterTotal * taxRate;

    // Calculate Total including Tax
    var totalWithTax = currentFooterTotal + taxAmount;

    // Membuat Alert Apa bila memesan
    var orderMessage = "===========================================\n";
    orderMessage += "Terimakasih Sudah Memesan Di Toko kami!\n";
    orderMessage += "Silahkan Lanjutkan Pembayaran \n";
    orderMessage += "ke Nomer Rekening Berikut :\n";
    orderMessage += "081312351124 (AL BACUNK)\n\n";
    orderMessage += "Total Belanja: Rp. " + currentFooterTotal.toFixed(3) + "\n";
    orderMessage += "Pajak (10%): Rp. " + taxAmount.toFixed(3) + "\n";
    orderMessage += "Total Setelah Pajak: Rp. " + totalWithTax.toFixed(3) + "\n";
    orderMessage += "===========================================";

    alert(orderMessage);

    var thankYouMessage = "Terimakasih Sudah Berbelanja Di Starbhak Mart !";
    alert(thankYouMessage);

    // Reset Keranjang/sidebar
    resetCart();
}

function resetCart() {
    // Menghapus Semua Barang di keranjang/sidebar
    var cartItems = document.getElementById('cart-items');
    while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
    }

    // Mereset Menghapus Semua total di sidebar mau pun
    document.getElementById('total').innerText = 'Rp. 0.00';
    document.getElementById('footer-total').innerText = 'Rp. 0.00';
}

document.addEventListener('DOMContentLoaded', function () {
    // Fungsi untuk search
    var searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            filterMenuItems(this.value.toLowerCase());
        });
    }
});

function filterMenuItems(searchTerm) {
    // Mendapatkan data barang dengan id card
    var menuItems = document.querySelectorAll('.card');

    // Iterate through each menu item
    menuItems.forEach(function (menuItem) {
        // Get the title of the menu item
        var title = menuItem.querySelector('.card-title').innerText.toLowerCase();

        // Check if the title contains the search term
        if (title.includes(searchTerm)) {
            // If it matches, show the menu item
            menuItem.style.display = 'block';
        } else {
            // If it doesn't match, hide the menu item
            menuItem.style.display = 'none';
        }
    });
}
