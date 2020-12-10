function generateRandomLevel() {
    let stepCount = random(20, 40);
    let steps = [];

    let cr = 0, cc = 0;
    for (let i = 0; i < stepCount; i++) {
        //0 => cr +1, 1 => cr -1, 2 => cc+1, 3=> cc-1
        do {
            let r = random(0, 3);
            if (r === 0 && cr < 4) cr += 1;
            if (r === 1 && cr > 0) cr -= 1;
            if (r === 2 && cc < 4) cc += 1;
            if (r === 3 && cc > 0) cc -= 1;
        }
        while (steps[steps.length - 1] && (steps[steps.length - 1][0] === cr && steps[steps.length - 1][1] === cc));
        let step = [cr, cc];
        steps.push(step);
    }

    console.log(steps);
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