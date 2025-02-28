let totalPrice = 10600;
let bellQty = 1;
let bellPrice = 2900;
let controllerQty = 1;
let controllerPrice = 7700;

setPrice();

function setPrice() {
    document.getElementById('price_section').textContent = formatNumber(totalPrice) +" قیمت ";
}

function updateControllerQuantity(change) {
    const qtyElement = document.getElementById('controller_qty');
    controllerQty = Math.max(1, controllerQty + change);
    qtyElement.textContent = controllerQty;
    calculatePrice();
}

function updateBellQuantity(change) {
    const qtyElement = document.getElementById('bell_qty');
    let currentQty = parseInt(qtyElement.textContent);
    bellQty = Math.max(1, bellQty + change);
    qtyElement.textContent = bellQty;
    calculatePrice();
}

function calculatePrice() {
    totalPrice = (controllerQty * controllerPrice) + (bellQty * bellPrice);
    setPrice();
}

function formatNumber(amount) {
    return amount.toLocaleString('en-US');
}
