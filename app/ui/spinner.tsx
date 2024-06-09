interface Params {
  text?: string
}

const Spinner = (params: Params) => {
  const { text } = params

  return (
    <div className="flex flex-col gap-4 items-center">
      {text && (<span className='text-gray-900'>{text}</span>)}
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin">
        </div>
      </div>
    </div>
  )
}

export default Spinner