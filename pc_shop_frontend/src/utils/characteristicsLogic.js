function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function characteristicsLogic(props){
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
            characteristics[typeOfProduct].push(props.product.resolution, props.product.size);
            break;
        case 'keyboard':
            characteristics[typeOfProduct].push(
                capitalizeFirstLetter(props.product.key_switch_type),
                props.product.backlight ? 'Backlit' : 'Not Backlit',
                props.product.color
            );
            break;
        default:
            break;
    }
    return characteristics;
}