import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as helpers from '@/helpers'
import {useFilter} from '@/hooks/useFilter'
import {useEffect, useState} from 'react'
import {del} from '@/hooks/methods'
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'

export default function List({items, setItems, type}) {

    const [Filter, sortedItems] = useFilter(items.data)
    const [errors, setErrors] = useState()

    useEffect(() => {
        if(sortedItems && sortedItems.length > 0){
            setItems({data: sortedItems})
        }
    }, [sortedItems])

    function submitDelete(id) {
        del(`/api/${type}/${id}`, setErrors).then(res => removeItem(id))
    }

    function removeItem(id) {
        const filtered = items.data.filter(item => {
            return item.id !== id
        })

        setItems({loading: false, data: filtered})
    }

    if (!items.data.length || items.loading) {
        return <></>
    }

    const firstItem = Object.values(items.data)[0]
    let headings = Object.keys(firstItem)

    return <div className={'table-overview col-span-12 bg-white flex flex-col'}>

        <div className={'table-overview__heading flex p-6'}>
            <h2>{helpers.uppercaseLetter(type)} List</h2>
            <div className={'ml-auto'}>{Filter}</div>
        </div>

        <table className={'w-full'}>
            <thead>
            <tr>
                {
                    headings.map((heading, index) => {
                        return <th className={'text-left p-6'} key={index}>{helpers.uppercaseLetter(heading)}</th>
                    })
                }
                <th/><th/>
            </tr>
            </thead>
            <tbody>
            {
                items.data.map((item, index) => {
                    let values = Object.values(item)
                    return <tr key={index}>
                        {
                            values.map((value, index) => {
                                return <td className={'p-6'} key={index}>{value}</td>
                            })
                        }
                        <td className={'p-6 cursor-pointer flex'}>
                            <div className={'flex ml-auto'}>
                                <Link
                                    className={'btn btn--primary btn--label btn--icon mr-4'}
                                    href={`/${type}/${item.id}`}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                </Link>
                                <div
                                    onClick={() => submitDelete(item.id)}
                                    className={'btn btn--primary btn--label btn--icon'}
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </div>
                            </div>
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>
    </div>
}
