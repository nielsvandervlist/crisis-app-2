import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Fetcher} from 'ra-fetch'
import * as helpers from '@/helpers'
import {useFilter} from '@/hooks/useFilter'
import {useEffect} from 'react'

export default function DownloadListParticipant({items, setItems, type}) {

    const [Filter, sortedItems] = useFilter(items.data)

    useEffect(() => {
        if(sortedItems && sortedItems.length > 0){
            setItems({data: sortedItems})
        }
    }, [sortedItems])

    if (!items.data.length || items.loading) {
        return <></>
    }

    return <div className={'table-overview col-span-6 bg-white flex flex-col'}>

        <div className={'table-overview__heading flex p-6'}>
            <h2>{helpers.uppercaseLetter(type)} List</h2>
            <div className={'ml-auto'}>{Filter}</div>
        </div>

        <table className={'w-full'}>
            <thead>
            <tr>
                <th className={'text-left p-6'}>Name</th>
                <th/><th/>
            </tr>
            </thead>
            <tbody>
            {
                items.data.map((item, index) => {
                    return <tr key={index}>
                        <td className={'p-6'}>{item.name}</td>
                        <td className={'p-6 cursor-pointer flex'}>
                            <div className={'flex ml-auto'}>
                                <a target={'__blank'} href={`${process.env.NEXT_PUBLIC_SPACE}/${item.url}`}>
                                    <span
                                        className={'btn btn--primary btn--label btn--icon mr-4'}>
                                        <FontAwesomeIcon icon="fa-solid fa-download" />
                                    </span>
                                </a>
                            </div>
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>
    </div>
}
