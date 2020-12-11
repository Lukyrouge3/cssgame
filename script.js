function generateRandomLevel(stepCount = 10, pathCount = 1, pathLength = 10) {
    let steps = [];

    let cr = 0, cc = 0;
    let end = [4, 4];
    let lastR = 0;
//    -1 => cr +1, 1 => cr -1, -2 => cc+1, 2=> cc-1
    // cr < 5 && cr > 0 && cc < 5 && cc > 0
    steps.push([0, 0]);
    for (let i = 0; i < stepCount; i++) {
        let move = generateMove(steps, cr, cc, lastR, end, pathCount, pathLength);
        cr = move[0];
        cc = move[1];
        // console.log(move, lastR);
        lastR = move[2];
        // steps.push([cr, cc]);
    }
    let lastStep = steps[steps.length - 1];
    while (lastStep[0] !== end[0]) {
        steps.push([lastStep[0] + 1, lastStep[1]]);
        lastStep = steps[steps.length - 1];
    }
    while (lastStep[1] !== end[1]) {
        steps.push([lastStep[0], lastStep[1] + 1]);
        lastStep = steps[steps.length - 1];
    }
    console.log("DONE");
    return steps;
}

async function generateMove(steps, cr, cc, lastR, end, pathCount, pathLength) {
    let tempCr, tempCc, r;
    do {
        tempCr = cr;
        tempCc = cc;
        do {
            r = random(-2, 2);
        } while ((r === 0 && pathCount <= 0) || r === -lastR || (r === -1 && cr >= 4)
        || (r === -2 && cc >= 4) || (r === 1 && cr <= 0)
        || (r === 2 && cc <= 0));
        if (r === -1 && tempCr < 4) tempCr += 1;
        if (r === 1 && tempCr > 0) tempCr -= 1;
        if (r === -2 && tempCc < 4) tempCc += 1;
        if (r === 2 && tempCc > 0) tempCc -= 1;
        // console.log(r, tempCr, tempCc);
        if (r === 0) {
            pathCount--;
            await generatePath(steps, [tempCr, tempCc], pathLength, pathCount);
        }
    } while ((end && end[0] && end[1]) && ((tempCr === end[0] && (tempCc + 1 === end[1]) || (tempCc - 1 === end[1])) ||
        (tempCc === end[1] && (tempCr + 1 === end[0]) || (tempCr - 1 === end[0])) || (tempCr === 0 && tempCc === 0)));
    if (r !== 0) {
        console.log("s");
        steps.push([tempCr, tempCc]);
    }
    return [tempCr, tempCc, r];
}

async function generatePath(steps, start, pathLength, pathCount) {
    console.log("PATTTFG");
    let r = 0;
    for (let i = 0; i < pathLength; i++) {
        console.log("p");
        let move = generateMove(steps, start[0], start[1], r, null, pathCount, pathLength);
        steps.push([move[0], move[1], 1]);
    }
}

function appendLevel(steps) {
    $('.center').append('<input type="checkbox" id="custom-level"><div class="level" level="1"></div>');
    $('div[level="1"]').append('<div class="level-title">Random generated level</div><div class="start step" row="' + steps[0][0] + '" col="' + steps[0][1] + '"></div>');
    let p;
    for (let i = 1; i < steps.length - 1; i++) {
        // console.log(steps[i], p);
        if (steps[i][2]) {
            //ITS A PATH
            if (p !== undefined) {
                $('#' + steps[i][2]).append('<div class="step" row="' + steps[i][0] + '" col="' + steps[i][1] + '"></div>');
            } else {
                $('div[level="1"]').append('<div class="path" id="' + steps[i][2] + '"><div class="step" row="'
                    + steps[i][0] + '" col="' + steps[i][1] + '"></div></div>');
                p = steps[i][2];
                console.log("PATH");
            }
        } else {
            p = undefined;
            $('div[level="1"]').append('<div class="step" row="' + steps[i][0] + '" col="' + steps[i][1] + '"></div>')
        }
    }
    $('div[level="1"]').append('<div class="step finish" row="' + steps[steps.length - 1][0] + '" col="' + steps[steps.length - 1][1] + '"><label class="goal" for="custom-level"></label></div>')
}

function random(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}