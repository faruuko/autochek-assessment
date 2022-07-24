import { useEffect } from 'react'
import Router from 'next/router'

const Comp = () => {
  useEffect(() => {
    const { pathname } = Router
    if (pathname === '/') {
      Router.push('/cars')
    }
  })

  return (
    <div className="container mx-20 h-screen items-center flex justify-center">
      <p className="text-center text-[90px] font-mono">Redirecting ...</p>
    </div>
  )
}

export default Comp
