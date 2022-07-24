type ButtonProps = {
  label: string
  onClick: (e: any) => void
  disabled: boolean
}

const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer hover:text-white disabled:bg-gray-200 disabled:text-gray-400 text-yellow-800 py-2 px-4 rounded"
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
