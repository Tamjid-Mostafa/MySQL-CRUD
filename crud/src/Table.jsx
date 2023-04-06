import React, { useState } from 'react'
import LoadingDots from './LoadingDots/LoadingDots'
const Table = ({ handleDelete, data, refetch, first, setFirst, setUserId, isLoading }) => {


    return (
        <div className="flex flex-col w-[70vw]">

            <div className="p-1.5 w-full inline-block align-middle">

                {
                    isLoading ? <div className='flex justify-center h-20 items-center'>
                        <LoadingDots />
                    </div>
                        :
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        Edit
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    data.map((item, i) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                {item.id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {item.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => {
                                                        setFirst({
                                                            ...first,
                                                            name: item.name,
                                                            email: item.email
                                                        }),
                                                            setUserId(item.id)
                                                    }}
                                                    className="text-green-500 hover:text-green-700"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => { handleDelete(item.id), refetch() }}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>

        </div>
    )
}

export default Table