import {useEffect, useRef} from 'react'

function Item({ onMount, onUnmount, columnHeights, children }) {
    const ref = useRef(null);
    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    const startRow = columnHeights[shortestColumnIndex] + 1;
    const gridColumn = `${shortestColumnIndex + 1} / span 1`;

    useEffect(() => {

        console.log(ref.current.clientHeight)

        onMount(shortestColumnIndex, ref.current.clientHeight);
        return () => {
            onUnmount(shortestColumnIndex, ref.current.clientHeight);
        };
    }, []);

    return (
        <div
            className="item"
            ref={ref}
            style={{
                gridColumn: gridColumn,
                gridRow: `${startRow} / span 1`,
            }}
        >
            {children}
        </div>
    );
}


export default Item
