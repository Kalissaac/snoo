import Link from 'next/link'
import { Transition } from '@tailwindui/react'
import { useState } from 'react'
import { ChevronLeft, Cloud, Menu } from 'react-feather'
import { useRouter } from 'next/router'

export default function Nav({ showBack }: { showBack?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <nav className='flex items-center justify-between p-8'>
        <Link href='/' className='flex items-center text-lg text-orange-500' title='Return home'>
          <Cloud className='mr-4' /> snoo
        </Link>
        <button className='text-xl' title='Open menu' onClick={() => setIsOpen(!isOpen)}>
          <Menu />
        </button>
      </nav>
      {showBack && (
        <div className='pl-8 -mt-4 text-gray-600 dark:text-gray-400'>
          <button className='flex' onClick={() => router.back()}>
            <ChevronLeft className='mr-2' /> Return
          </button>
        </div>
      )}

      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute inset-0 overflow-hidden'>
          <Transition
            show={isOpen}
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            {ref => (
              <div
                ref={ref}
                className='absolute inset-0 transition-opacity bg-opacity-75 pointer-events-auto bg-darker-gray'
                onClick={() => setIsOpen(!isOpen)}
              ></div>
            )}
          </Transition>
          <section className='absolute inset-y-0 right-0 flex max-w-full pl-10 pointer-events-auto'>
            <Transition
              show={isOpen}
              enter='transform transition ease-in-out duration-500 sm:duration-700'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-500 sm:duration-700'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              {ref => (
                <div ref={ref} className='relative w-screen max-w-md'>
                  <div className='absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4'>
                    <button
                      aria-label='Close panel'
                      onClick={() => setIsOpen(!isOpen)}
                      className='text-gray-100 transition duration-150 ease-in-out hover:text-gray-500'
                    >
                      {/* Heroicon name: x */}
                      <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </button>
                  </div>
                  <div className='flex flex-col h-full py-6 space-y-6 overflow-y-scroll bg-black shadow-xl'>
                    <header className='px-4 sm:px-6'>
                      <h2 className='text-lg font-medium leading-7'>Preferences</h2>
                    </header>
                    <div className='relative flex-1 px-4 sm:px-6'>
                      {/* Replace with your content */}
                      <div className='absolute inset-0 px-4 sm:px-6'>
                        <div className='h-full border-2 border-gray-200 border-dashed'></div>
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
