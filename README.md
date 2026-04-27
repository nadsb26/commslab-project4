# comms_lab_exam

**A gamified "day in the life" web experience built for Communications Lab, NYU Abu Dhabi.**

📹 [Project Recording](https://youtu.be/E6SfCQfY8DU)

---

## What is it?

You have an exam in one week. Every few days, you're asked: *what would you do?*

The options range from studying and grinding past papers to going on a road trip, watching a pipe organ performance on an island, or pulling an all-nighter finishing a show. Whatever you pick, a first-person video plays showing you living that choice. At the end of the week, you swipe to reveal your grade.

The grading is intentionally a little unpredictable — if you pick the same option every time, the outcome is the opposite of what you'd expect. It's meant to feel less like a quiz and more like a story with a twist ending.

The design leans into the studying theme: handwritten fonts, sticky note cards, a graph-paper background, and a grade reveal interaction inspired by the Pulse app (used at NYUAD to check grades on Brightspace).

---

## How it works

### Structure

The experience is split into two screens:

- **Folder screen** — a folder animation plays on click and transitions into the game
- **Sticky screen** — a stack of cards that flip one by one as you progress

Each "round" is two cards: a question card where you pick an option, then a video card that plays the clip matching your choice.

### Scoring

Each question has 4 options worth 100, 75, 50, and 25 points respectively (top to bottom). Your total is accumulated across all 4 questions.

Final grade is calculated in `getGrade()`:

| Score | Grade |
|-------|-------|
| 301–400 | A |
| 201–300 | B |
| 101–200 | C |
| 0–100 | D |

**Special cases** (same option picked every round):

| Pattern | Grade | Reason |
|---------|-------|--------|
| AAAA | B | Too much studying, not enough fresh air |
| BBBB | PASS | Your uni got listed as an attack target, exams cancelled |
| CCCC | B+ | Professor curved the exam down |
| DDDD | A | You had so much fun you hit flow state |

### Grade reveal

On the final card, a sticky-note-style cover sits over the grade. You swipe it left to reveal. It supports both mouse drag and touch. If you've moved it more than 60px, it auto-completes the reveal and shows your result text.

---

## File structure

```
commslab-project4/
├── index.html       # all cards and layout
├── style.css        # sticky note styling, animations, card colors
├── script.js        # card navigation, scoring logic, swipe reveal
├── folder.png       # folder asset for landing screen
└── videos/          # first-person POV clips (hosted on GitHub)
    ├── video_games.mp4
    ├── arcade.mp4
    ├── birthday.mp4
    └── ...
```

---

## Who made what

**Nada** — initial design and theme (sticky notes, handwritten font, graph-paper background, folder animation), filmed roadtrip, study café, shopping, and procrastinate videos

**Ruxuan** — filmed complete assignments, stay up finishing a show, organ performance, and cram all night videos; came up with the special B/C/PASS grade outcomes

**Geetika** — filmed start making notes, read a book, study session with friend, and go for a run videos; helped wire up the correct video per option in the code

**Dasha** — card flip navigation, grading system, swipe reveal mechanic (mouse + touch), filmed video games, arcades, birthday, and solve past papers videos

---

## References

- Adobe Premiere Pro transitions tutorial — [youtu.be/-ctmmRdr60M](https://youtu.be/-ctmmRdr60M?si=yTLEyCUPkeJEg3qR)
- Background music for study_cafe.mp4 — [youtu.be/4yiEbIeCOA4](https://youtu.be/4yiEbIeCOA4?si=MS8Gn-QfNdY3D-Wa)
- Elevator music for procrastinate.mp4 — [youtu.be/jj0ChLVTpaA](https://youtu.be/jj0ChLVTpaA?si=wvcD850zuoYNBTyH)
- Spongebob "5 hours later" timecard — [youtu.be/sVoZBCwftb4](https://youtu.be/sVoZBCwftb4?si=SvX2Xd9c0tYXmDNc)
- Adding transitions in Adobe Premiere Pro — [youtube.com/watch?v=MtJYWrhKMYY](https://www.youtube.com/watch?v=MtJYWrhKMYY)
