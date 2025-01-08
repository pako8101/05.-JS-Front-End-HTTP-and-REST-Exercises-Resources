function solve(input) {

    const astronauts = [];

    const astronautsCount = Number(input.shift());

    for (let currentAstronaut = 1; currentAstronaut <= astronautsCount; currentAstronaut++) {
        const [name, oxygen, energy] = input.shift().split(' ');
        astronauts.push({
            name,
            oxygen: Number(oxygen),
            energy: Number(energy),
        });


    }
    while (input.length > 0) {
        const command = input.shift();

        if (command === 'End') {
            break;
        }
        const [action, name, value] = command.split(' - ');
        switch (action) {
            case 'Explore':
                const energyNeeded = Number(value);
                const astronaut = astronauts.find(astronaut => astronaut.name === name);

                if (astronaut && astronaut.energy >= energyNeeded) {

                    astronaut.energy -= value;
                    console.log(`${name}has successfully explored a new area and now has ${astronaut.energy} energy`);

                } else if (astronaut) {
                    console.log(`${name} does not have enough energy to explore!`);

                }

                break;
            case 'Refuel':
                const amount = Number(value);
                const astronautToRefuel = astronauts.find(astronaut => astronaut.name === name);
                if (astronautToRefuel) {
                    const energyRecovered = Math.min(amount, 200 - astronautToRefuel.energy);
                    astronautToRefuel.energy += energyRecovered;

                    console.log(`${name} refueled their energy by ${energyRecovered}!`);

                    // astronautToRefuel.energy += amount;
                    // if (astronautToRefuel.energy > 200) {
                    //     astronautToRefuel.energy = 200;
                    // }
                }

                break;
            case 'Breathe':
                const amountOxygen = Number(value);
                const astronautToBreath = astronauts.find(astronaut => astronaut.name === name);
                if (astronautToBreath) {
                    const oxygenRecovered = Math.min(amountOxygen, 100 - astronautToBreath.oxygen);
                    astronautToBreath.oxygen += oxygenRecovered;

                    console.log(`${name} took a breath and recoverd ${oxygenRecovered} oxygen!`);

                }

                break;
            default:
                break;
        }

    }
astronauts.forEach(astronaut => {
    console.log(`Astronaut: ${astronaut.name}, Oxygen: ${astronaut.oxygen}, Energy: ${astronaut.energy}`);
})


}

const input = [
    '3',
    'Alice 60 100',
    'Bob 40 80',
    'Charlie 70 150',
    'Explore - Bob - 100',
    'Refuel - Alice - 30',
    'Breathe - Charlie - 50',
    'Breathe - Charlie - 30',
    'Explore - Alice - 40',
    'End'
];

solve(input);