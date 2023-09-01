import React from 'react'

const TextArea = ({ title, placeholder, value, handleChange, name, helpertext, isError, errorMessage }) => {
    return (
        <div className='mb-3'>
            <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-900">{title} <span className='text-red-600'>*</span></label>
            <p className=' text-slate-400 text-xs'>{helpertext}</p>
            <textarea id={name} name={name} value={value} onChange={handleChange} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder={placeholder} required></textarea>
            {isError ? <p className="mt-2 text-sm text-red-600">{errorMessage}</p> : null}
        </div>
    )
}

export default TextArea