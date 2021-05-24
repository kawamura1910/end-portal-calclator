function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
}

function degToRad(deg) {
    return (deg * Math.PI) / 180;
}

function validateInputs() {
    return $$('input').every((input) => input.validity.valid);
}

function getInputs() {
    return {
        x1: parseFloat($('#x1').value),
        z1: parseFloat($('#z1').value),
        a1: degToRad(parseFloat($('#a1').value)),
        x2: parseFloat($('#x2').value),
        z2: parseFloat($('#z2').value),
        a2: degToRad(parseFloat($('#a2').value)),
    };
}

function getEndPortalPosition({ x1, z1, a1, x2, z2, a2 }) {
    const h = ((z2 - z1) * Math.sin(a2) + (x2 - x1) * Math.cos(a2)) / Math.sin(a2 - a1);
    return {
        x: x1 - h * Math.sin(a1),
        z: z1 + h * Math.cos(a1),
    };
}

function showResult({ x, z }) {
    $('.result-x').textContent = `x 座標: ${Math.round(x)}`;
    $('.result-z').textContent = `z 座標: ${Math.round(z)}`;
}

document.querySelector('.main-form').addEventListener('input', () => {
    if (!validateInputs()) return;
    const inputs = getInputs();
    const result = getEndPortalPosition(inputs);
    showResult(result);
});
