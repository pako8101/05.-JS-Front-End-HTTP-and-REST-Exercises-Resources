function motoGP(input) {
    const riders = {};

    function stopForFuel(rider, minFuel, changedPosition) {
        if (riders[rider].fuel < minFuel) {
            console.log(`${rider} stopped to refuel but lost his position, now he is ${changedPosition}.`);
            riders[rider].position = changedPosition;
        } else {
            console.log(`${rider} does not need to stop for fuel!`);
        }
    }

    function overtake(rider1, rider2) {
        if (riders[rider1].position < riders[rider2].position) {
            const tempPosition = riders[rider1].position;
            riders[rider1].position = riders[rider2].position;
            riders[rider2].position = tempPosition;

            console.log(`${rider1} overtook ${rider2}!`);
        }
    }

    function engineFail(rider, lapsLeft) {
        console.log(`${rider} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`);
        delete riders[rider];
    }

    const commands = {
        'StopForFuel': stopForFuel,
        'Overtaking': overtake,
        'EngineFail': engineFail,
    };

    // Reading riders details
    const n = Number(input.shift());
    for (let i = 0; i < n; i++) {
        const [rider, fuel, position] = input.shift().split('|');
        riders[rider] = { fuel: Number(fuel), position: Number(position) };
    }

    // Processing commands
    while (true) {
        const line = input.shift();
        if (line === 'Finish') {
            break;
        }

        const [command, ...args] = line.split(' - ');
        commands[command](...args);
    }

    // Print final positions
    Object.entries(riders)
        .sort((a, b) => a[1].position - b[1].position)
        .forEach(([rider, details], index) => {
            console.log(`${rider}\n  Final position: ${details.position}`);
        });
}

// Example usage
const input = ["3",
"Valentino Rossi|100|1",
"Marc Marquez|90|2",
"Jorge Lorenzo|80|3",
"StopForFuel - Valentino Rossi - 50 - 1",
"Overtaking - Marc Marquez - Jorge Lorenzo",
"EngineFail - Marc Marquez - 10",
"Finish"];

motoGP(input);
