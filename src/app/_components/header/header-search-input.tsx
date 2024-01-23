import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Input, Kbd } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function useController() {
  const router = useRouter()

  const onDoSearch = () => router.push('/search')

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        onDoSearch()
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  })

  return { onDoSearch }
}

export default function HeaderSearchInput() {
  const { onDoSearch } = useController()

  return (
    <>
      <Input
        readOnly
        classNames={{
          base: 'max-w-full sm:max-w-[14rem] h-10 hidden md:flex',
          input: 'text-small',
          inputWrapper:
            'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          mainWrapper: 'h-full',
        }}
        placeholder="Búsqueda rápida..."
        size="sm"
        startContent={<MagnifyingGlassIcon width={24} height={25} />}
        endContent={<Kbd keys={['command']}>K</Kbd>}
        type="search"
        radius="full"
        onClick={() => onDoSearch()}
      />
    </>
  )
}
