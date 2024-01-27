import React, {useEffect, useState} from 'react'
import {Fetcher} from 'ra-fetch'

function DragAndDrop({data, rounds}) {

    const shown = data.filter(item => item.inserted)
    const hidden = data.filter(item => !item.inserted)

    const [items, setItems] = useState(hidden)
    const [draggedItem, setDraggedItem] = useState(null)
    const [droppedItems, setDroppedItems] = useState(shown)
    const [params, setParams] = useState()
    const [response, setResponse] = useState()
    const [errors, setErrors] = useState()

    function submit() {
        Fetcher.api('backend').update('documents', params)
            .then(response => setResponse(response))
            .catch(errors => setErrors(errors))
    }

    useEffect(() => {
        if(params){
            submit()
        }
    }, [params])

    const handleDragStart = (e, item) => {
        setDraggedItem(item)
        e.dataTransfer.setData('application/json', JSON.stringify(item))
    }

    const handleDragOver = e => {
        e.preventDefault()
    }

    const handleDrop = e => {
        setDraggedItem(null)
        const droppedItem = JSON.parse(e.dataTransfer.getData('application/json'))

        setParams({
            id: droppedItem.id,
            inserted: 1,
        })

        setDroppedItems([...droppedItems, droppedItem])
        setItems(items.filter(i => i.id !== droppedItem.id))
    }

    const handleDragBack = (e, item) => {
        setDraggedItem(item)
        e.dataTransfer.setData('application/json', JSON.stringify(item))
    }

    const handleDropBack = e => {
        setDraggedItem(null)
        const droppedItem = JSON.parse(e.dataTransfer.getData('application/json'))

        setParams({
            id: droppedItem.id,
            inserted: 0,
        })

        setItems([...items, droppedItem])
        setDroppedItems(droppedItems.filter(i => i.id !== droppedItem.id))
    }

    return (
        <div className={'flex flex-1'}>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDropBack}
                className={'border rounded-md border-gray-100 p-4 flex-1 relative'}
            >
                <span className={'btn btn--label absolute right-2 top-2'}>Hidden</span>
                {items.length > 0 ? (
                    <ul>
                        {items.map((item, index) => (
                            <li
                                className={'p-2 border border-gray-100 rounded-md mb-4 last:mb-0'}
                                key={index}
                                draggable
                                onDragStart={e => handleDragBack(e, item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No more items to drag</p>
                )}
            </div>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={'border rounded-md border-gray-100 p-4 flex-1 ml-4 relative'}
            >
                <span className={'btn btn--label absolute right-2 top-2'}>Shown</span>
                {droppedItems.length > 0 ? (
                    <ul>
                        {droppedItems.map((item, index) => (
                            <li
                                className={'p-2 border border-gray-100 rounded-md mb-4 last:mb-0'}
                                key={index}
                                draggable
                                onDragStart={e => handleDragStart(e, item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Drop Here</p>
                )}
            </div>
        </div>
    )
}

export default DragAndDrop
