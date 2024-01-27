import React, {useEffect, useRef, useState} from 'react'

export default function PinterestLayout({ children, rowHeight }) {
    const childRefs = useRef(new Map());
    const [layout, setLayout] = useState([]);

    useEffect(() => {
        const layout = [];
        let row = [];
        let rowHeight = 0;
        let rowWidth = 0;
        React.Children.map(children, (child, index) => {
            const ref = childRefs.current.get(child);
            if (ref) {
                const { clientWidth, clientHeight } = ref;
                if (rowWidth + clientWidth > window.innerWidth) {
                    layout.push(row);
                    row = [];
                    rowWidth = 0;
                    rowHeight = 0;
                }
                row.push({ child, width: clientWidth, height: clientHeight });
                rowWidth += clientWidth;
                rowHeight = Math.max(rowHeight, clientHeight);
            }
        });
        layout.push(row);
        setLayout(layout);
    }, [children]);

    return (
        <div>
            {layout.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((column, columnIndex) => (
                        <div key={columnIndex} ref={ref => childRefs.current.set(column.child, ref)}>
                            {column.child}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
