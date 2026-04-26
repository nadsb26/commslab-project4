// dom elements
const folder = document.querySelector('.folder');
const folderScreen = document.querySelector('.folder-screen');
const stickyScreen = document.querySelector('.sticky-screen');
const cards = document.querySelectorAll('.sticky-card');
const nextBtns = document.querySelectorAll('.next-btn');

// score and choice tracking
let result = 0;
let resultChoices = '';

// points per option (descending), letter labels, per-question state
const pointsMap = [100, 75, 50, 25];
const lettersMap = ['A', 'B', 'C', 'D'];
const questionScores = [0, 0, 0, 0];
const questionChoices = ['', '', '', ''];

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
document.querySelectorAll('.options-list').forEach((list, listIndex) => {
    list.querySelectorAll('input[type="checkbox"]').forEach((cb, cbIndex) => {
        cb.addEventListener('change', () => {
            list.querySelectorAll('input[type="checkbox"]').forEach(other => {
                if (other !== cb) other.checked = false;
            });
            // show next button when an option is selected
            const nextBtn = list.closest('.sticky-card').querySelector('.next-btn');
            nextBtn.classList.toggle('visible', cb.checked);

            // update score and letter choice for this question
            questionScores[listIndex] = cb.checked ? pointsMap[cbIndex] : 0;
            questionChoices[listIndex] = cb.checked ? lettersMap[cbIndex] : '';
            result = questionScores.reduce((a, b) => a + b, 0);
            resultChoices = questionChoices.join('');
        });
    });
});
// next button navigation
nextBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        const current = document.querySelector('.sticky-card.active');
        const next = cards[i + 1];
        if (!next) return;

        // load selected video into next card if it has a video element
        const selected = current.querySelector('input[type="checkbox"]:checked');
        if (selected && next.querySelector('video')) {
            const video = next.querySelector('video');
            video.src = selected.dataset.video;
            video.load();
        }

        // play animation of current card going out
        current.classList.add('card-exiting');
        setTimeout(() => {
            current.classList.remove('active', 'card-exiting');
            next.classList.add('active', 'card-entering');
            setTimeout(() => next.classList.remove('card-entering'), 500);

            if (next.id === 'card-9') setupReveal();
        }, 340);
    });
});

// maps total score (or special all-same combos) to a grade letter
function getGrade() {
    if (resultChoices == 'AAAA') return 'B';
    else if (resultChoices == 'BBBB') return 'PASS';
    else if (resultChoices == 'CCCC') return 'B+';
    else if (resultChoices == 'DDDD') return 'A';
    else {
        if (result >= 301) return 'A';
        if (result >= 201) return 'B';
        if (result >= 101) return 'C';
        return 'D';
    }
}

// wires up the swipe-to-reveal box on card 9
function setupReveal() {
    const cover = document.getElementById('reveal-cover');
    document.getElementById('reveal-letter').textContent = getGrade();

    let startX = 0;
    let dragging = false;

    // slides cover away and fades in result text
    function doReveal() {
        dragging = false;
        cover.style.transition = '';
        cover.style.transform = '';
        requestAnimationFrame(() => cover.classList.add('revealed'));
        const resultEl = document.getElementById('result-text');
        resultEl.textContent = showResults();
        setTimeout(() => resultEl.classList.add('visible'), 600);
    }

    // mouse drag support
    cover.addEventListener('mousedown', e => {
        startX = e.clientX;
        dragging = true;
        cover.style.transition = 'none';
    });

    document.addEventListener('mousemove', e => {
        if (!dragging) return;
        const delta = Math.max(0, startX - e.clientX);
        cover.style.transform = `translateX(-${delta}px)`;
    });

    document.addEventListener('mouseup', e => {
        if (!dragging) return;
        dragging = false;
        cover.style.transition = '';
        if (startX - e.clientX > 60) doReveal();
        else cover.style.transform = '';
    });

    // touch support
    cover.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        dragging = true;
        cover.style.transition = 'none';
    }, { passive: true });

    cover.addEventListener('touchmove', e => {
        if (!dragging) return;
        const delta = Math.max(0, startX - e.touches[0].clientX);
        cover.style.transform = `translateX(-${delta}px)`;
    }, { passive: true });

    cover.addEventListener('touchend', e => {
        if (!dragging) return;
        dragging = false;
        cover.style.transition = '';
        if (startX - e.changedTouches[0].clientX > 60) doReveal();
        else cover.style.transform = '';
    });
}

// returns outcome text based on choices and total score
function showResults() {
    if (resultChoices === 'AAAA') return "You didn't get enough fresh air outside so you felt dizzy and was struggling on your exams...";
    else if (resultChoices === 'BBBB') return "Your uni got listed as attack target and your exams got cancelled!";
    else if (resultChoices === 'CCCC') return "You are lucky, your professor curved the exam down.";
    else if (resultChoices === 'DDDD') return "You had so much fun that you reached the flow state and aced all of your exams!";
    else {
        if (result >= 0 && result <= 100) return "You had a fun time but your results are not as fun. Well, grades don't define you as a person!";
        else if (result >= 101 && result <= 200) return "You studied but seems it wasn't enough... Well, good try.";
        else if (result >= 201 && result <= 300) return "You had a pretty balanced week, with enough studying and enough fun. Good job!";
        else if (result >= 301 && result <= 400) return "Wow, you really were locked in. You did so much studying, and your effort paid off.";
    }
};