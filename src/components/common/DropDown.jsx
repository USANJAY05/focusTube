import React from 'react'

const DropDown = ({shareLink, setToggle, id}) => {

    const share = async() => {
        setToggle(false)
        await navigator.clipboard.writeText(shareLink)
        alert('Link copied')
    }
    const commingSoon = () => {
        setToggle(false)
        alert('Comming Soon')
    }
    const embedLink =async() =>{
        setToggle(false)
        await navigator.clipboard.writeText(`
      <iframe
        className="w-full sm:h-[calc(100vh-400px)] h-[37vh] xl:h-[calc(100vh-300px)] rounded-lg"
        src={'https://www.youtube.com/embed/${id}?autoplay=1&controls=1&loop=0&rel=0&fs=1'} // Make sure fs=1 allows fullscreen
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" // Make sure fullscreen is allowed
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>`)
        alert('Copied code')
    }
  return (
    <div>
        
    <div className="absolute top-5 right-5 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
      <ul className="py-2">
        <li
            onClick={() => share()}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Copy Link
        </li>
        <li 
            onClick={() => commingSoon()}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Save to watch later
        </li>
        <li 
            onClick={() => commingSoon()}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Save to playlist
        </li>
        <li 
            onClick={() => embedLink()}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            copy embed link
        </li>
      </ul>
    </div>
    </div>
  )
}

export default DropDown