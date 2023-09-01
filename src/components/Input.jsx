import React from 'react'

const Input = ({ type, name, title, isError,placeholder ,errorMessage, value,handleChange}) => {
    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{title} <span className='text-red-600'>*</span></label>
            <input type={type} id={name} name={name}  value={value} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
            {isError ? <p className="mt-2 text-sm text-red-600">{errorMessage}</p> : null}
        </div>

    )
}

export default Input