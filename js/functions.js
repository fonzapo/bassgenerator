let pickedScale;
let pickedScaleObj;
let pickedScale_arr = [];
let barsGlobal_arr = [];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function createDegreesSelects() {
    let romanNums = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    let div = document.createElement('div');
    div.id = 'selectDeg';
    for (i = 0; i < 4; i++) {
        let select = document.createElement('select');
        div.appendChild(select);
        for (j = 0; j < 7; j++) {
            let option = document.createElement('option');
            option.value = j;
            option.innerHTML = romanNums[j];
            select.appendChild(option);
        };
    };
    return div;
};

function displayResult(arg1, arg2, arg3, arg4, arg5) {
    let spanContent;
    let div = document.getElementById('pickedScale');

    if (arg4 !== '' && arg5 !== '') {
        spanContent = `<span>${arg2}</span> <span>${arg4}</span> <span>${arg5}</span>`
    }
    else if (arg4 == '' && arg5 !== '') {
        spanContent = `<span>${arg2}</span> <span>${arg5}</span>`
    }
    else if (arg4 !== '' && arg5 == '') {
        spanContent = `<span>${arg2}</span> <span>${arg4}</span>`
    }
    else {
        spanContent = `<span>${arg2}</span>`
    };

    div.innerHTML =
        `<hr>
            <div id="displayScaleCont">
                <p>${arg1} ${spanContent}</p>
                <hr>
                <p>${arg3.join(' - ')}</p><hr>
                <div>
                    <button id='relativeBtn' title="Gives relative scale (major if minor and vice versa)" onclick='relativeScale()'>Relative</button>
                    <button id='primaryBtn' onclick='primaryScale()'>Primary</button>
                    <button id='secondaryBtn' onclick='secondaryScale()'>Secondary</button>
                </div>
            </div>
            <hr>
            <div id="degContainer">
                <div id="degFormat"><h5>Degrees: </h5></div>
                <div id="randDegCheckboxCont">
                    <label for="randDegCheckbox">Random</label>
                    <h5><input id="randDegCheckbox" name="randDegCheckbox" type="checkbox"></h5>
                </div>
            </div>`

    document.getElementById('degFormat').appendChild(createDegreesSelects());
};

let isAllChecked = true;

function uncheckAll() {
    let checkboxes = document.getElementsByClassName('rythm-type');
    if (isAllChecked) {
        for (box of checkboxes) {
            box.checked = false;
        }
        isAllChecked = false;
        document.getElementById('uncheckAll').innerText = 'Check All';
    }
    else {
        for (box of checkboxes) {
            box.checked = true;
        }
        isAllChecked = true;
        document.getElementById('uncheckAll').innerText = 'Uncheck All';
        document.getElementById('errorContainer').innerText = '';
    }
};

function pickFromSelected() {
    let errorCont = document.getElementById('errorContainer');
    errorCont.innerHTML = '';

    let checkedRadioBtn;
    let checkedRadioBtnIndex;
    let selectIndex;

    for (i = 0; i < radioBtn_arr.length; i++) {
        if (radioBtn_arr[i].checked) {
            checkedRadioBtn = radioBtn_arr[i].value;
            selectIndex = radioBtn_arr[i].parentNode.childNodes[2].childNodes[0].selectedIndex;
        };
    };
    switch (checkedRadioBtn) {
        case 'Major':
            checkedRadioBtnIndex = 0;
            pickedScaleObj = allScales_arr[checkedRadioBtnIndex][selectIndex];
            break;
        case 'Minor natural':
            checkedRadioBtnIndex = 1;
            pickedScaleObj = allScales_arr[checkedRadioBtnIndex][selectIndex];
            break;
        case 'Minor harmonic':
            checkedRadioBtnIndex = 2;
            pickedScaleObj = allScales_arr[checkedRadioBtnIndex][selectIndex];
            break;
    }
    displayResult(
        pickedScaleObj[0][0]['gamme'][0],
        pickedScaleObj[0][0]['type'],
        pickedScaleObj[0][0]['gamme'],
        pickedScaleObj[1],
        pickedScaleObj[0][0]['alterations']
    )
    pickedScale = pickedScaleObj[0][0]['gamme'];
    pickedScale_arr = [
        pickedScaleObj[0][0]['gamme'][0],
        pickedScaleObj[0][0]['type'],
        pickedScaleObj[0][0]['gamme'],
        pickedScaleObj[1],
        pickedScaleObj[0][0]['alterations']
    ];
};

function chooseRandScale() {
    let errorCont = document.getElementById('errorContainer');
    errorCont.innerHTML = '';

    pickedScaleObj = allScales_arr[randomInt(0, 2)][randomInt(0, 14)];
    pickedScale = pickedScaleObj[0][0]['gamme'];
    pickedScale_arr = [
        pickedScaleObj[0][0]['gamme'][0],
        pickedScaleObj[0][0]['type'],
        pickedScaleObj[0][0]['gamme'],
        pickedScaleObj[1],
        pickedScaleObj[0][0]['alterations']
    ];
    displayResult(
        pickedScaleObj[0][0]['gamme'][0],
        pickedScaleObj[0][0]['type'],
        pickedScaleObj[0][0]['gamme'],
        pickedScaleObj[1],
        pickedScaleObj[0][0]['alterations']
    );
};

function relativeScale() {
    pickedScale = pickedScaleObj[0][1]['gamme'];
    displayResult(
        pickedScaleObj[0][1]['gamme'][0],
        pickedScaleObj[0][1]['type'],
        pickedScaleObj[0][1]['gamme'],
        pickedScaleObj[1],
        pickedScaleObj[0][1]['alterations']
    );
    pickedScale_arr = [
        pickedScaleObj[0][1]['gamme'][0],
        pickedScaleObj[0][1]['type'],
        pickedScaleObj[0][1]['gamme'],
        pickedScaleObj[1],
        pickedScaleObj[0][1]['alterations']
    ];
};
function primaryScale() {
    pickedScale = pickedScaleObj[0][0]['gamme'];
    displayResult(
        pickedScaleObj[0][0]['gamme'][0],
        pickedScaleObj[0][0]['type'],
        pickedScaleObj[0][0]['gamme'],
        pickedScaleObj[1],
        pickedScaleObj[0][0]['alterations']
    )
    pickedScale_arr = [
        pickedScaleObj[0][0]['gamme'][0],
        pickedScaleObj[0][0]['type'],
        pickedScaleObj[0][0]['gamme'],
        pickedScaleObj[1],
        pickedScaleObj[0][0]['alterations']
    ];
}
function secondaryScale() {
    pickedScale = pickedScaleObj[0][2]['gamme'];
    displayResult(
        pickedScaleObj[0][2]['gamme'][0],
        pickedScaleObj[0][2]['type'],
        pickedScaleObj[0][2]['gamme'],
        pickedScaleObj[1],
        pickedScaleObj[0][2]['alterations']
    )
    pickedScale_arr = [
        pickedScaleObj[0][2]['gamme'][0],
        pickedScaleObj[0][2]['type'],
        pickedScaleObj[0][2]['gamme'],
        pickedScaleObj[1],
        pickedScaleObj[0][2]['alterations']
    ];
}

function createScaleSelects() {
    radioBtn_arr = []
    for (i = 0; i < scaleTypesNames_arr.length; i++) {
        let inputGroup = document.getElementById('inputGroup');
        let radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.value = scaleTypesNames_arr[i];
        radioBtn.name = 'choice';
        radioBtn_arr.push(radioBtn);

        if (i == 0) radioBtn.checked = true;

        let label = document.createElement('label');
        label.innerText = scaleTypesNames_arr[i];
        label.for = scaleTypesNames_arr[i];

        let div = document.createElement('div');
        div.className = 'radio-btn';

        let selectDiv = document.createElement('div');
        let select = document.createElement('select');

        for (j = 0; j < allScales_arr[i].length; j++) {
            let option = document.createElement('option');
            option.innerHTML = allScales_arr[i][j][0][0]['gamme'][0];
            option.value = allScales_arr[i][j][0][0]['gamme']
            select.appendChild(option);
        };

        inputGroup.appendChild(div);
        div.appendChild(label);
        div.appendChild(radioBtn);
        div.appendChild(selectDiv);
        selectDiv.appendChild(select);
    };
};

function removeLastBar() {
    barsGlobal_arr.pop();
    document.getElementById('sheet').innerHTML = barsGlobal_arr.join('');
    showAlterations();
    placeNotes();
    if (barsGlobal_arr.length == 0) {
        reset();
    }
};
function createRythm() {
    let rythmFinal_arr = [];
    let errorCont = document.getElementById('errorContainer')
    let silenceChanceVal = document.getElementById('silenceChanceInput').value;

    if (silenceChanceVal == '') { silenceChanceVal = 10 }
    else if (silenceChanceVal.match(/[^0-9]/)) {
        errorCont.innerHTML =
            '<P>* Silent note chance must be a number, putting anything else will result in a 50% chance</p>';
        document.getElementById('silenceChanceInput').style.border = '3px solid red'
    }
    else { document.getElementById('silenceChanceInput').style.border = '2px solid #1C2321' }

    let symbolsBinary_obj = {
        double: ['𝅘𝅥𝅯', '𝄿', .25],
        doublePointee: ['𝅘𝅥𝅯.', '𝄿.', .25 + (.25 / 2)],
        croche: ['𝅘𝅥𝅮', '𝄾', .5],
        crochePointee: ['𝅘𝅥𝅮.', '𝄾.', .5 + (.5 / 2)],
        noire: ['𝅘𝅥', '𝄽', 1],
        noirePointee: ['𝅘𝅥.', '𝄽.', 1 + (1 / 2)],
        blanche: ['𝅗𝅥', '𝄼', 2],
        blanchePointee: ['𝅗𝅥.', '𝄼.', 2 + (2 / 2)],
        ronde: ['𝅝', '𝄻', 4]
    }

    let symbolsTernary_obj = {
        double: ['𝅘𝅥𝅯', '𝄿', 1 / 2],
        doublePointee: ['𝅘𝅥𝅯.', '𝄿.', 1 / 2 + ((1 / 2) / 2)],
        croche: ['𝅘𝅥𝅮', '𝄾', 1],
        crochePointee: ['𝅘𝅥𝅮.', '𝄾.', 1 + (1 / 2)],
        noire: ['𝅘𝅥', '𝄽', 2],
        noirePointee: ['𝅘𝅥.', '𝄽.', 3],
        blanche: ['𝅗𝅥', '𝄼', 4],
        blanchePointee: ['𝅗𝅥.', '𝄼.', 4 + (4 / 2)],
        ronde: ['𝅝', '𝄻', 8]
    };

    for (i = 0; i < Object.values(symbolsBinary_obj).length; i++) {
        for (j = 0; j < silenceChanceVal - 2; j++) {
            Object.values(symbolsBinary_obj)[i].push(Object.values(symbolsBinary_obj)[i][0]);
            Object.values(symbolsBinary_obj)[i].sort();
            Object.values(symbolsBinary_obj)[i].reverse();
            //
            Object.values(symbolsTernary_obj)[i].push(Object.values(symbolsTernary_obj)[i][0]);
            Object.values(symbolsTernary_obj)[i].sort();
            Object.values(symbolsTernary_obj)[i].reverse();
        }
    }

    let pickedRythms = Array.from(document.getElementsByClassName('rythm-type'));
    let pickedRythms_arr = [];

    let binaryCheckbox = document.getElementById('binaryCheckbox');
    let ternaryCheckbox = document.getElementById('ternaryCheckbox');

    for (rythm of pickedRythms) {
        if (rythm.checked) {
            if (binaryCheckbox.checked) {
                pickedRythms_arr.push(symbolsBinary_obj[rythm.name]);
            }
            else if (ternaryCheckbox.checked) {
                pickedRythms_arr.push(symbolsTernary_obj[rythm.name])
            }
        }
    }

    //needs an initial value for reduce() to work
    let rythm_arr = [0];
    let rythmSymbols_arr = [];

    let timeSignature = document.getElementById('timeSignatureInput').value;
    //if blank --> default value for time signature is 4
    if (timeSignature == '') {
        if (binaryCheckbox.checked) {
            timeSignature = 4;
        }
        else if (ternaryCheckbox.checked) {
            timeSignature = 6;
        }
    }
    else if (timeSignature.match(/[^0-9]/)) {
        errorCont.innerHTML = '<p>* Time signature must be a number</p>'
        document.getElementById('timeSignatureInput').style.border = '3px solid red'
    }
    else { document.getElementById('timeSignatureInput').style.border = '2px solid #1C2321' }

    if (document.getElementById('randTimeCheckbox').checked) {
        timeSignature = randomInt(2, 12);
    }
    let regex = /[𝄻𝄼𝄽𝄾𝄿]/gum;
    //console.log(pickedRythms_arr)
    while (rythm_arr.reduce((a, c) => a + c) < timeSignature) {
        let random = randomInt(0, pickedRythms_arr.length - 1)
        let len = pickedRythms_arr[random].length - 1;

        rythm_arr.push(pickedRythms_arr[random][len]);
        rythmSymbols_arr.push(pickedRythms_arr[random][randomInt(0, len - 1)]);
        //if first note is a silence then remove it and go again
        if (rythmSymbols_arr[0].match(regex)) {
            rythm_arr.pop();
            rythmSymbols_arr.pop();
        }
        if (rythm_arr.reduce((a, c) => a + c) > timeSignature) {
            rythm_arr = [0];
            rythmSymbols_arr = [];
        };
    };
    //remove the 0 value
    rythm_arr = rythm_arr.filter(x => x !== 0);
    rythmFinal_arr.push(rythm_arr, rythmSymbols_arr);

    let obj = {
        rythm: rythmFinal_arr,
        metric: timeSignature
    };

    return obj;
};

function reset() {
    document.getElementById('sheet').innerHTML = '';
    barsGlobal_arr = [];
    document.getElementById('screenShotBtnCont').innerHTML = '';
    console.clear()
};

let screenshotModal = document.getElementById('modalScreenShot');

function takeScreenShot() {
    screenshotModal.classList.add('popModal');
    screenshotModal.innerHTML =
        `<div id="closeBtn" onclick="closeModal()">X</div>`
    html2canvas(document.querySelector("#sheet")).then(canvas => {
        screenshotModal.appendChild(canvas)
        canvas.id = "screenShotCanvas";
        let closeBtn = document.getElementById('closeBtn');
        let width = canvas.width;
        let height = canvas.height;
        closeBtn.style.left = `${window.innerWidth / 2 + width / 2 - closeBtn.clientWidth - 5}px`
        closeBtn.style.top = `${window.innerHeight / 2 - height / 2 + 5}px`
    })
}
function closeModal() {
    screenshotModal.classList.remove('popModal');
    screenshotModal.innerHTML = '';
}