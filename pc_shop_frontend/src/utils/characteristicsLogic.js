function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function characteristicsLogic(props) {
    let characteristics = {
        computer: [],
        monitor: [],
        keyboard: [],
    };
    let typeOfProduct = props.product.type;

    switch (typeOfProduct) {
        case 'computer':
            characteristics[typeOfProduct].push(
                props.product.processor,
                props.product.graphics,
                props.product.memory,
                props.product.storage
            );
            break;
        case 'monitor':
            characteristics[typeOfProduct].push(
                props.product.resolution,
                props.product.refresh_rate,
                props.product.size,
                props.product.panel_type
            );
            break;
        case 'keyboard':
            characteristics[typeOfProduct].push(
                capitalizeFirstLetter(props.product.key_switch_type),
                props.product.backlight ? 'Backlit' : 'Not Backlit',
                props.product.color,
                props.product.wireless ? 'Wireless' : 'Wired'
            );
            break;
        default:
            break;
    }
    return characteristics;
}

// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

// const getComputerCharacteristics = (product) => {
//     const { processor, graphics, memory, storage } = product;
//     return [processor, graphics, memory, storage];
// };

// const getLaptopCharacteristics = (product) => {
//     const { processor, graphics, memory, storage } = product;
//     return [processor, graphics, memory, storage];
// };

// const getMonitorCharacteristics = (product) => {
//     const { resolution, refresh_rate, size, panel_type } = product;
//     return [resolution, refresh_rate, size, panel_type];
// };

// const getKeyboardCharacteristics = (product) => {
//     const { key_switch_type, backlight, color, wireless } = product;
//     return [
//         capitalizeFirstLetter(key_switch_type),
//         backlight ? 'Backlit' : 'Not Backlit',
//         color,
//         wireless ? 'Wireless' : 'Wired'
//     ];
// };

// export function characteristicsLogic({ product }) {
//     const characteristics = {
//         computer: [],
//         monitor: [],
//         keyboard: [],
//         laptop: [],
//     };

//     const characteristicsMap = {
//         computer: getComputerCharacteristics,
//         monitor: getMonitorCharacteristics,
//         keyboard: getKeyboardCharacteristics,
//         laptop: getLaptopCharacteristics,
//     };

//     const { type } = product;
//     const getCharacteristics = characteristicsMap[type];

//     if (getCharacteristics) {
//         characteristics[type] = getCharacteristics(product);
//     }

//     return characteristics;
// }
