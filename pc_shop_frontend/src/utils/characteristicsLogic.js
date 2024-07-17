function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getComputerCharacteristics = (product) => {
    const { processor, graphics, memory, storage } = product;
    return [processor, graphics, memory, storage];
};

const getLaptopCharacteristics = (product) => {
    const { processor, graphics, memory, storage } = product;
    return [processor, graphics, memory, storage];
};

const getMonitorCharacteristics = (product) => {
    const { resolution, refresh_rate, size, panel_type } = product;
    return [resolution, refresh_rate, size, panel_type];
};

const getKeyboardCharacteristics = (product) => {
    const { key_switch_type, backlight, color, wireless } = product;
    return [
        capitalizeFirstLetter(key_switch_type),
        backlight ? 'Backlit' : 'Not Backlit',
        color,
        wireless ? 'Wireless' : 'Wired'
    ];
};

export function characteristicsLogic({ product }) {
    const characteristicsMap = {
        computer: getComputerCharacteristics,
        monitor: getMonitorCharacteristics,
        keyboard: getKeyboardCharacteristics,
        laptop: getLaptopCharacteristics,
    };

    const { type } = product;
    const getCharacteristics = characteristicsMap[type];

    if (getCharacteristics) {
        return {
            [type]: getCharacteristics(product)
        };
    }

    return {};
}