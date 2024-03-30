import ComputerFilters from "../Filters/ComputerFilters/ComputerFilters";
import KeyboardFilters from "../Filters/KeyboardFilters/KeyboardFilters";
import MonitorFilters from "../Filters/MonitorFilters/MonitorFilters";

const CatalogFilters = (category, setItems, startLoading, stopLoading) => {
    switch (category) {
        case 'computers':
            return <ComputerFilters
                setComputers={setItems}
                startLoading={startLoading}
                stopLoading={stopLoading}
            />
        case 'monitors':
            return <MonitorFilters
                setMonitors={setItems}
                startLoading={startLoading}
                stopLoading={stopLoading}
            />
        case 'keyboards':
            return <KeyboardFilters
                setKeyboards={setItems}
                startLoading={startLoading}
                stopLoading={stopLoading}
            />
        default:
            <h1>No filters found!</h1>

    }

}

export default CatalogFilters;