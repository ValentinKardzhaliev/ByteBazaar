import React, { useState } from 'react';

const Checkbox = ({ graphics, setComputers }) => {
    const [isChecked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setChecked(newCheckedState);

        if (isChecked) {
            // TODO: push to queries array when the current 'graphics' is checked
        } else {
            // TODO: remove from queries array when the current 'graphics' is not checked
        }


    };



    return (
        <div>
            <label>
                {graphics}
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </label>
        </div>
    );
};

export default Checkbox;