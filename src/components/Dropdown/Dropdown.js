import React, { useState } from "react";

function Dropdown({children, small, title}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`dropdown-container col-span-6 card cursor-pointer ${small ? 'dropdown-container--small' : ''}`}>
            <div className="dropdown-selected-option btn btn--soft mb-4 w-full" onClick={() => setIsOpen(!isOpen)}>
                <h3 className={'w-full'}>{title}</h3>
            </div>
            {isOpen && (
                <div className="dropdown-options">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
