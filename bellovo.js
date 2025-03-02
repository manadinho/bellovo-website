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

function openModal() {
    document.getElementById("customModal").style.display = "flex";
}

// Close Modal
function closeModal() {
    document.getElementById("customModal").style.display = "none";
}

// Update bell quantity based on area input (1 bell = 3 canals)
function updateBellWithArea() {
    const areaInput = document.getElementById('area_input').value;
    const bellQuantityElement = document.getElementById('bell_qty');

    if (!areaInput || isNaN(areaInput)) {
        bellQuantityElement.innerText = 0;
        return;
    }

    const areaPerBell = 3;
    const recommendedBells = Math.ceil(areaInput / areaPerBell);
    bellQuantityElement.innerText = recommendedBells;
}

// Update area based on bell quantity (1 bell = 3 canals)
function updateArea() {
    const bellQty = parseInt(document.getElementById('bell_qty').innerText);
    const areaInput = document.getElementById('area_input');
    const area = bellQty * 3;
    areaInput.value = area;
}

// Update bell quantity and area
function updateBellQuantity(change) {
    const bellQtyElement = document.getElementById('bell_qty');
    let bellQty = parseInt(bellQtyElement.innerText);

    // Update bell quantity
    bellQty += change;
    if (bellQty < 1) bellQty = 1;
    bellQtyElement.innerText = bellQty;

    // Update area based on the new bell quantity
    updateArea();
}

// Initialize area on page load
function initializeArea() {
    updateArea();
}

document.getElementById('area_input').addEventListener('input', updateBellWithArea);
initializeArea();