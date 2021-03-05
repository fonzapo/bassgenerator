let notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

let allScales_arr = [];

let scaleTypesNames_arr = ['Major', 'Minor natural', 'Minor harmonic']

function createScales() {
    let sharp_str = '';
    let flat_str = '';

    let sharpIndex = 3
    let sharpIndex_arr = [];
    let flatIndex = 6;
    let flatIndex_arr = [];

    let sharpScale = [];
    let flatScale = [];

    let majorScales = [];
    let minNatScales = [];
    let minHarScales = [];

    for (i = 0; i < notes.length + 1; i++) {
        sharpScale[i] = [];
        flatScale[i] = [];
        sharpScale[i][0] = notes.slice((i * 4) % notes.length, notes.length).
            concat(notes.slice(0, (i * 4) % notes.length));
        flatScale[i][0] = notes.slice((i * 3) % notes.length, notes.length).
            concat(notes.slice(0, (i * 3) % notes.length));

        if (i == 0) {
            sharpIndex_arr.push('')
            flatIndex_arr.push('')
        }
        else {
            sharpIndex_arr.push(notes[sharpIndex % notes.length]);
            sharpIndex += 4;
            flatIndex_arr.push(notes[flatIndex % notes.length]);
            flatIndex += 3;
        }
        sharpScale[i][1] = sharp_str;
        sharp_str += '♯';
        flatScale[i][1] = flat_str;
        flat_str += '♭';

        let slicedSharps_arr = sharpIndex_arr.slice(1, i + 1);
        sharpScale[i][2] = slicedSharps_arr;
        
        let slicedFlats_arr = flatIndex_arr.slice(1, i + 1);
        flatScale[i][2] = slicedFlats_arr;
        

        for (j = 0; j < slicedSharps_arr.length; j++) {
            sharpScale[i][0] = sharpScale[i][0].map(note => note.match(slicedSharps_arr[j]) ? `${note}♯` : note);
            flatScale[i][0] = flatScale[i][0].map(note => note.match(slicedFlats_arr[j]) ? `${note}♭` : note);
        }
        majorScales.push(sharpScale[i], flatScale[i]);
    }
    majorScales.shift();

    for (k = 0; k < majorScales.length; k++) {
        minNatScales[k] = [];
        minHarScales[k] = [];
        minNatScales[k][0] = majorScales[k][0].slice(5, majorScales[k][0].length)
            .concat(majorScales[k][0].slice(0, 5));
        minHarScales[k][0] = majorScales[k][0].slice(5, majorScales[k][0].length)
            .concat(majorScales[k][0].slice(0, 5));

        minNatScales[k][1] = minHarScales[k][1] = majorScales[k][1];
        minNatScales[k][2] = minHarScales[k][2] = majorScales[k][2];

        if (minHarScales[k][0][6].length > 1) {
            minHarScales[k][0][6] = minHarScales[k][0][6].split('');
            if (minHarScales[k][0][6][1] == '♭') {
                minHarScales[k][0][6][1] = '♮';
            }
            if (minHarScales[k][0][6][1] == '♯') {
                minHarScales[k][0][6][1] += '♯';
            }
            minHarScales[k][0][6] = minHarScales[k][0][6].join('');
        }
        else {
            minHarScales[k][0][6] += '♯'
        }
        majorScales[k][0] = [
            {
                gamme: majorScales[k][0],
                type: 'Major',
                alterations: ''
            },
            {
                gamme: minNatScales[k][0],
                type: 'Minor natural',
                alterations: ''
            },
            {
                gamme: minHarScales[k][0],
                type: 'Minor harmonic',
                alterations: minHarScales[k][0][6]
            }
        ];
        minNatScales[k][0] = [
            {
                gamme: minNatScales[k][0],
                type: 'Minor natural',
                alterations: ''
            },
            {
                gamme: majorScales[k][0][0]['gamme'],
                type: 'Major',
                alterations: ''
            },
            {
                gamme: minHarScales[k][0],
                type: 'Minor harmonic',
                alterations: minHarScales[k][0][6]
            },
        ];
        minHarScales[k][0] = [
            {
                gamme: minHarScales[k][0],
                type: 'Minor harmonic',
                alterations: minHarScales[k][0][6]
            },
            {
                gamme: majorScales[k][0][0]['gamme'],
                type: 'Major',
                alterations: ''
            },
            {
                gamme: minNatScales[k][0][0]['gamme'],
                type: 'Minor natural',
                alterations: ''
            },
        ];
    }
    allScales_arr.push(majorScales, minNatScales, minHarScales)
}