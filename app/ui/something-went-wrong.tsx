const DEFAULT_MESSAGE = 'Something went wrong. Please try again later.'

interface Props {
  message?: string | null
}

const SomethingWentWrong = (props: Props) => {
  const { message = DEFAULT_MESSAGE } = props

  return (
    <div className="flex justify-center px-5 py-3">
      <p>{message}</p>
    </div>
  )
}

export default SomethingWentWrong