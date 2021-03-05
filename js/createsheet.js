function createSheet() {
    console.clear()
    let checkboxes = Array.from(document.getElementsByClassName('rythm-type'));
    let errorContainer = document.getElementById('errorContainer');
    if (pickedScale == undefined) {
        errorContainer.innerHTML = '<p>* You must select a scale first (use Pick or Pick random button)</p>';
    }
    else if (checkboxes.every(box => box.checked == false)) {
        errorContainer.innerHTML += '<p>* You must select at least one rythm</p>';
    }

    let selectGroupParent = document.getElementById('selectDeg');
    let select_arr = [];
    let romanNums_arr = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    let selectRomanNums_arr = [];

    let bar_arr = [];
    let clefs = ['&#119074', '&#119070'];
    let regex = /[𝄻𝄼𝄽𝄾𝄿]/gum;

    let binaryCheckbox = document.getElementById('binaryCheckbox');
    let ternaryCheckbox = document.getElementById('ternaryCheckbox');

    if (document.getElementById('randDegCheckbox').checked) {
        for (i = 0; i < selectGroupParent.childNodes.length; i++) {
            if (i == 0) {
                select_arr.push(0);
                selectRomanNums_arr.push(romanNums_arr[0]);
            }
            else {
                let random = randomInt(0, selectGroupParent.childNodes.length)
                select_arr.push(random);
                selectRomanNums_arr.push(romanNums_arr[random]);
            }
        };
    }
    else {
        for (i = 0; i < selectGroupParent.childNodes.length; i++) {
            select_arr.push(selectGroupParent.childNodes[i].selectedIndex);
            selectRomanNums_arr.push(romanNums_arr[selectGroupParent.childNodes[i].selectedIndex]);
        };
    };
    let timeSignatureType;
    if (ternaryCheckbox.checked) { timeSignatureType = 8 }
    else if (binaryCheckbox.checked) { timeSignatureType = 4 };

    for (k = 0; k < 4; k++) {
        let newRythmInstance = createRythm();
        let rythm = Object.values(newRythmInstance)[0];
        let timeSignature = Object.values(newRythmInstance)[1];
        let bar = [];
        let octaves = [0, 1];
        for (j = 0; j < rythm[0].length; j++) {
            let firstNote = pickedScale[select_arr[k]].toLowerCase();
            let randNote = pickedScale[randomInt(0, pickedScale.length - 1)].toLowerCase();
            let secondRegex = /[♯♮♭]/gum;
            let firstNoteSliced = firstNote.replace(secondRegex, '');
            let randNoteSliced = randNote.replace(secondRegex, '');

            if (j == 0) {
                bar.push(
                    `<div class="time-signaure">
                        <span>${timeSignature}</span>
                        <span>${timeSignatureType}</span>
                    </div>`
                );

                if (rythm[1][j].match(regex)) {
                    bar.push(
                        `<div class="rest rest-container">
                            ${rythm[1][j]}
                        </div>`);
                }
                else {
                    let newOctave = octaves[randomInt(0, 1)];
                    bar.push(
                        `<div class="${firstNote} ${firstNoteSliced}${newOctave} ${firstNoteSliced} octave${newOctave} note-container">
                            <span class="note">${rythm[1][j]}</span>
                        </div>`
                    );
                }
            }
            else {
                if (rythm[1][j].match(regex)) {
                    bar.push(
                        `<div class="rest rest-container">
                            ${rythm[1][j]}
                        </div>`);
                }
                else {
                    let newOctave = octaves[randomInt(0, 1)];
                    bar.push(
                        `<div class="${randNote} ${randNoteSliced}${newOctave} ${randNoteSliced} octave${newOctave} note-container">
                            <span class="note">${rythm[1][j]}</span>
                        </div>`);
                }
            };
        };
        bar_arr.push(
            `<div class="sheetlines"><hr><hr><hr><hr><hr></div>
            <div class="bar">${bar.join('')}</div>`
        );
    };

    //create armor at the beginning of the sheet
    let armor_arr = [];
    let sharp_arr = ['f', 'c', 'g', 'd', 'a', 'e', 'b'];
    let flat_arr = ['b', 'e', 'a', 'd', 'g', 'c', 'f']

    for (i = 0; i < pickedScale_arr[3].length; i++) {
        if (pickedScale_arr[3][0] == '♯') {
            let div = `<div class="${sharp_arr[i]}♯">${pickedScale_arr[3][i]}</div>`;
            armor_arr.push(div);
        }
        if (pickedScale_arr[3][0] == '♭') {
            let div = `<div class="${flat_arr[i]}♭">${pickedScale_arr[3][i]}</div>`;
            armor_arr.push(div);
        }
    }

    barsGlobal_arr.push(
        `<li class="info">
            ${pickedScale_arr[0]} ${pickedScale_arr[1]} <span>${selectRomanNums_arr.join(' - ')}</span>
        </li>
        <div class="bar-group">
            <div class="bass-clef clef">${clefs[0]}</div>
            <div class="armor">${armor_arr.join('')}</div>
            ${bar_arr.join(' <span class="bar-separator"><hr></span>')}
        </div>
        <hr class="bar-group-separator">`
    );
    document.getElementById('sheet').innerHTML = barsGlobal_arr.join('');
    document.getElementById('screenShotBtnCont').innerHTML = '';
    document.getElementById('screenShotBtnCont').innerHTML +=
        `<button id="takeScreenShot" onclick="takeScreenShot()">Screenshot</button>`;

    showAlterations();
    placeNotes();
};

function placeNotes() {
    let notesLowerCased = notes.map(x => x.toLowerCase());
    for (i = 0; i < notesLowerCased.length; i++) {
        let octave = 35;
        let notes = document.querySelectorAll(`.${notesLowerCased[i]}`);
        for (note of notes) {
            if (note.classList.contains('octave1')) {
                note.childNodes[1].style.transform = `translateY(${-octave - (5 * i)}px)`
                if (note.childNodes.length > 3) {
                    note.childNodes[3].style.transform = `translateY(${-octave - (5 * i)}px)`
                }
            }
            else {
                note.childNodes[1].style.transform = `translateY(${- (5 * i)}px)`
                if (note.childNodes.length > 3) {
                    note.childNodes[3].style.transform = `translateY(${- (5 * i)}px)`
                }
            }
        }
    }
};

function showAlterations() {
    let noteContainer = document.querySelectorAll('.note-container');
    let alteration = pickedScale_arr[4].toLowerCase();
    let alterationSliced = alteration.replace(alteration[0], '');

    for (noteCont of noteContainer) {
        if (noteCont.classList.contains(alteration)) {
            let span = document.createElement('span')
            span.className = 'alteration';
            span.innerHTML = alterationSliced;
            noteCont.appendChild(span)
        }
    };
};