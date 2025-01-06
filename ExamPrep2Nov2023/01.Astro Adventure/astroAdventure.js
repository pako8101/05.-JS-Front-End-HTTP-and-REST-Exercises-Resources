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
const [action,name,value] = command.split(' - ');
switch (action) {
    case 'Explore':
        const energyNeeded = Number(value);
        const astronaut = astronauts.find(astronaut => astronauts.name ===name);

        if (astronaut.energy >= value) {
            console.log();
            
        }
        
        break;
        case 'Refuel':
        
        break;
        case 'Breath':
        
        break;
    default:
        break;
}

}



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