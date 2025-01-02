function solve(input) {


    const riderCount = Number(input.shift());

    const riders = {};

    for (let i = 0; i < riderCount; i++) {
        const riderLine = input.shift();


        const [name, fuel, position] = riderLine.split('|');

        riders[name] = {
            fuel: Number(fuel),
            position: Number(position)
        };

    }
    let commandLine = input.shift();

    while (commandLine !== 'Finish') {
        commandLine = commandLine.split(' - ');
        const command = commandLine.shift();

        switch (command) {
            case 'StopForFuel':{
                const riderName = commandLine.shift();
                const minimumFule = Number(commandLine.shift());
                const changedPosition = Number(commandLine.shift());

                if (riders[riderName].fuel < minimumFule) {
                    riders[riderName].position = changedPosition;
                    console.log(`${riderName} stopped to refuel but lost his position, now he is ${changedPosition}`);

                } else {
                    console.log(`${riderName} does not need to stop for fuel!`);

                }
            }
                break;
            case 'Overtaking': {
                const firstRider = commandLine.shift();
                const secondRider = commandLine.shift();
                const lapsLeft = Number(commandLine.shift());

                const firstRiderPosition = riders[firstRider].position;
                const secondRiderPosition = riders[secondRider].position;

                if (firstRiderPosition < secondRiderPosition) {
                    riders[firstRider].position = secondRiderPosition;
                    riders[secondRider].position = firstRiderPosition;
                   
                    console.log(`${firstRider} overtook ${secondRider}!`);

                }
            }

                break;
            case 'EngineFail':

                const riderName = commandLine.shift();
                const lapsLeft = Number(commandLine.shift());

                delete riders[riderName];

                console.log(`${riderName} is out of the race because of a technical issue,
                     ${lapsLeft} laps before the finish.`);


                break;
            default:
                break;
        }

        commandLine = input.shift();

    }
for (const riderName in riders) {
   console.log(
    `${riderName}\n  Final position: ${riders[riderName].position}`
   );
   
}

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

solve(input);