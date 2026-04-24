const folder = document.querySelector('.folder');
const folderScreen = document.querySelector('.folder-screen');
const stickyScreen = document.querySelector('.sticky-screen');
const cards = document.querySelectorAll('.sticky-card');
const nextBtns = document.querySelectorAll('.next-btn');

// when folder is clicked, folder animation plays and sticky screen shown
folder.addEventListener('click', () => {
    folder.style.animation = 'folderOpen 0.5s ease-in forwards';
    document.querySelector('.folder-label').style.animation = 'folderOpen 0.5s ease-in forwards';

    // short delay before sticky screen is shown
    setTimeout(() => {
        folderScreen.style.display = 'none';
        stickyScreen.style.display = 'flex';
        document.body.classList.add('sticky-active');
    }, 450);
});

// radio-style checkboxes, so only one selectable per card
document.querySelectorAll('.options-list').forEach(list => {
    list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            list.querySelectorAll('input[type="checkbox"]').forEach(other => {
                if (other !== cb) other.checked = false;
            });
            // show next button when an option is selected
            const nextBtn = list.closest('.sticky-card').querySelector('.next-btn');
            nextBtn.classList.toggle('visible', cb.checked);
        });
    });
});

// next button navigation
nextBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        const current = document.querySelector('.sticky-card.active');
        const next = cards[i + 1];
        if (!next) return;

        // play animation of current card going out
        current.classList.add('card-exiting');
        setTimeout(() => {
            current.classList.remove('active', 'card-exiting');
            next.classList.add('active', 'card-entering');
            setTimeout(() => next.classList.remove('card-entering'), 500);
        }, 340);
    });
});