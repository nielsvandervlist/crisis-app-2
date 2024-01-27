import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Fetcher} from 'ra-fetch'
import * as helpers from '@/helpers'
import {useFilter} from '@/hooks/useFilter'
import {useEffect} from 'react'

export default function DownloadList({items, setItems, type}) {

    const [Filter, sortedItems] = useFilter(items.data)

    useEffect(() => {
        if(sortedItems && sortedItems.length > 0){
            setItems({data: sortedItems})
        }
    }, [sortedItems])

    function submitDelete(id) {
        Fetcher.api('backend').delete(type, {id: id})
            .then(response => removeItem(id))
            .catch(errors => console.log(errors))
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
                                <a target={'__blank'} href={`${process.env.NEXT_PUBLIC_SPACE}/${item.url}`}>
                                    <span
                                        className={'btn btn--primary btn--label btn--icon mr-4'}>
                                        <FontAwesomeIcon icon="fa-solid fa-download" />
                                    </span>
                                </a>
                                <Link href={`/${type}/${item.id}`} className={'btn btn--primary btn--label btn--icon mr-4'}>
                                        <FontAwesomeIcon icon="pen-to-square"/>
                                </Link>
                                <div
                                    onClick={() => submitDelete(item.id)}
                                    className={'btn btn--primary btn--label btn--icon'}
                                >
                                    <FontAwesomeIcon icon="trash-can"/>
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
