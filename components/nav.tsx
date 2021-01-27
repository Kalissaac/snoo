import Link from 'next/link'
import { Transition } from '@tailwindui/react'
import { useState } from 'react'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav>
        <ul className="flex justify-between items-center p-8">
          <li>
            <Link href="/">
              <a className="text-blue-500 no-underline text-xl">Snoo</a>
            </Link>
          </li>
          <ul className="flex justify-between items-center space-x-4">
            <li key="preferences">
              <button className="btn-blue no-underline focus:shadow-outline" onClick={() => setIsOpen(!isOpen)}>
                Preferences
              </button>
            </li>
          </ul>
        </ul>
      </nav>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <Transition
            show={isOpen}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {(ref) => (
              <div ref={ref} className="absolute inset-0 bg-darker-gray bg-opacity-75 transition-opacity pointer-events-auto" onClick={() => setIsOpen(!isOpen)}></div>
            )}
          </Transition>
          <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex pointer-events-auto">
            <Transition
              show={isOpen}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              {(ref) => (
                <div ref={ref} className="relative w-screen max-w-md">
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button aria-label="Close panel" onClick={() => setIsOpen(!isOpen)} className="text-gray-100 hover:text-gray-500 transition ease-in-out duration-150">
                      {/* Heroicon name: x */}
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="h-full flex flex-col space-y-6 py-6 bg-black shadow-xl overflow-y-scroll">
                    <header className="px-4 sm:px-6">
                      <h2 className="text-lg leading-7 font-medium">
                        Preferences
                      </h2>
                    </header>
                    <div className="relative flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div className="h-full border-2 border-dashed border-gray-200"></div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
          </section>
        </div>
      </div>
    </>
  )
}
