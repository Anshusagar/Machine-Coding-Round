function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    }
}

function throttle(func, delay) {
    let lastCallTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCallTime >= delay) {
            func.apply(this, args);
            lastCallTime = now;
        }
    }
}
function throttle(func, delay) {
    let status = false;
    return function(...args) {
        if (!status) {
            status = true;
            func.apply(this, args);
            setTimeout(() => {
                status = false;
            }, delay);
        }
    }
}
