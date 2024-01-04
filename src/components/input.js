
import React from 'react'

export default function Input({label,value,onSet}) {
  return (
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
    {label}
    <input className="mb-6 bg-gray-100 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-gray-500 focus:border-red-300 block w-full p-2.5 dark:bg-with-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-gray-800 dark:focus:ring-gray-500 dark:focus:border-gray-500" 
    type="text" value={value} onChange={(e) => onSet(e.target.value)} />
  </label>
  )
}


