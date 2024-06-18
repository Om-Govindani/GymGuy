import React from 'react'

export default function Button(props) {
    const { text, func } = props
    return (
        <button onClick={func} className='px-8 mx-auto py-4 rounded-md border-[2px] bg-sky-850 border-zinc-400 border-solid skyShadow duration-200'>
            <p>{text}</p>
        </button>
    )
}