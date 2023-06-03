export default function LoadMoreButton({
  setSize,
  isLoading
}: {
  setSize: (size: number | ((_size: number) => number)) => Promise<any[]>
  isLoading: boolean
}): JSX.Element {
  return (
    <button
      onClick={() => setSize(s => s + 1)}
      className='w-full p-2 text-gray-600 transition-opacity border border-gray-200 rounded-md shadow-sm bg-gray-50 hover:opacity-80'
      disabled={isLoading}
    >
      {isLoading ? 'loading...' : 'load more posts'}
    </button>
  )
}
