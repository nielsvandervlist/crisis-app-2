import {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Filter = ({value, setValue, className}) => <div className={'filter'}>
    <input
        type={'text'}
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder={'Search in the list'}
    />
    <span className={'btn btn--round'}><FontAwesomeIcon icon="search"/></span>
</div>

export function useFilter(items){

    const [value, setValue] = useState('')
    const [sortedItems, setSortedItems] = useState()

    function filterValues(arr, searchKeys) {

        return arr.filter(function(obj) {
            let match = true;

            // Check if the object has all the search keys
            for (let key in searchKeys) {
                if (!obj.hasOwnProperty(key) || obj[key] !== searchKeys[key]) {
                    match = false;
                    break;
                }
            }

            // Check nested objects
            if (!match) {
                for (let nestedKey in obj) {
                    if (typeof obj[nestedKey] === "object") {
                        match = filterValues(obj[nestedKey], searchKeys);
                        if (match) {
                            break;
                        }
                    }
                }
            }

            return match;
        });
    }

    useEffect(() => {
        if(value !== ''){
            setSortedItems(filterValues(items, {name: value, title: value}))
        }
    }, [value])

    return [
        <Filter value={value} setValue={setValue}/>,
        sortedItems
    ]
}
