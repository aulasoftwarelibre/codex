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

export function HeaderSearchInput() {
  const { onDoSearch } = useController()

  return (
    <>
      <Input
        classNames={{
          base: 'max-w-full sm:max-w-[14rem] h-10 hidden md:flex',
          input: 'text-small',
          inputWrapper:
            'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          mainWrapper: 'h-full',
        }}
        endContent={<Kbd keys={['command']}>K</Kbd>}
        onClick={() => onDoSearch()}
        placeholder="Búsqueda rápida..."
        radius="full"
        readOnly
        size="sm"
        startContent={<MagnifyingGlassIcon height={25} width={24} />}
        type="search"
      />
    </>
  )
}
