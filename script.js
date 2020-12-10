function generateRandomLevel(stepCount = 10) {
    let steps = [];

    let cr = 0, cc = 0;
    let end = [4, 4];
    let lastR = 0, r, tempCr, tempCc;
//    -1 => cr +1, 1 => cr -1, -2 => cc+1, 2=> cc-1
    // cr < 5 && cr > 0 && cc < 5 && cc > 0
    steps.push([0, 0]);
    for (let i = 0; i < stepCount; i++) {
        do {
            tempCr = cr;
            tempCc = cc;
            do {
                r = random(-2, 2);
            } while (r === 0 || r === -lastR || (r === -1 && cr >= 4)
            || (r === -2 && cc >= 4) || (r === 1 && cr <= 0)
            || (r === 2 && cc <= 0));
            if (r === -1 && tempCr < 4) tempCr += 1;
            if (r === 1 && tempCr > 0) tempCr -= 1;
            if (r === -2 && tempCc < 4) tempCc += 1;
            if (r === 2 && tempCc > 0) tempCc -= 1;
            console.log(tempCr, tempCc, end, r, lastR, i);
        } while ((tempCr === end[0] && (tempCc + 1 === end[1]) || (tempCc - 1 === end[1])) ||
        (tempCc === end[1] && (tempCr + 1 === end[0]) || (tempCr - 1 === end[0])) || (tempCr === 0 && tempCc === 0));
        cr = tempCr;
        cc = tempCc;
        lastR = r;
        steps.push([cr, cc]);
    }
    console.log("DONE");
    let lastStep = steps[steps.length - 1];
    while (lastStep[0] !== end[0]) {
        steps.push([lastStep[0] + 1, lastStep[1]]);
        lastStep = steps[steps.length - 1];
    }
    while (lastStep[1] !== end[1]) {
        steps.push([lastStep[0], lastStep[1] + 1]);
        lastStep = steps[steps.length - 1];
    }
    return steps;
}

function appendLevel(steps) {
    $('.center').append('<input type="checkbox" id="custom-level"><div class="level" level="1"></div>');
    $('div[level="1"]').append('<div class="start step" row="' + steps[0][0] + '" col="' + steps[0][1] + '"></div>');
    for (let i = 1; i < steps.length - 1; i++) {
        $('div[level="1"]').append('<div class="step" row="' + steps[i][0] + '" col="' + steps[i][1] + '"></div>')
    }
    $('div[level="1"]').append('<div class="step finish" row="' + steps[steps.length - 1][0] + '" col="' + steps[steps.length - 1][1] + '"><label class="goal" for="custom-level"></label></div>')
}

function random(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}