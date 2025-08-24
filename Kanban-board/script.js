const boards = document.querySelectorAll('.board');
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('dragstart', (e) => {

        card.classList.add('is-dragging');

    });
    card.addEventListener('dragend', () => {
        card.classList.remove('is-dragging');

    });

})

boards.forEach(board => {
    board.addEventListener('dragover', (e) => {
        e.preventDefault();
        const card = document.querySelector('.is-dragging');
        board.appendChild(card);
    })
})
function findClosetElement(element, selector) {
    const elements = element.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('is-dragging')) {
            return elements[i];
        }
    }
    return null;
}