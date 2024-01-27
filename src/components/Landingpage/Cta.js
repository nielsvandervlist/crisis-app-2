import React from 'react'

function Grid(){
    return (
        <div className="grid grid-cols-6 gap-4 row-gap-20">
            <div className="col-span-3">Column 1</div>
            <div className="col-span-3">Column 2</div>
            <div className="col-span-3">Column 3</div>
            <div className="col-span-3">Column 4</div>
            <div className="col-span-3">Column 5</div>
            <div className="col-span-3">Column 6</div>
        </div>
    )
}

export default Grid
