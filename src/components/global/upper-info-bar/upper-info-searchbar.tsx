import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className='min-w-[60%] relative flex items-center border rounded-full bg-accent'>
        <Button type='submit' size={"sm"} variant={"ghost"} className='absolute left-0 h-full rounded-l-none  rounded-full bg-transparent hover:bg-transparent'>
            <Search className='size-4' />
            <span className='sr-only'>Search</span>
        </Button>
        <Input type="text" placeholder='Search by title' className='flex-grow hover:bg-transparent bg-transparent dark:bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 ml-6 w-full rounded-full rounded-l-none'/>
    </div>
  )
}

export default SearchBar