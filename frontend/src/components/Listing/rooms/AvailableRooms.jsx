import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React from 'react'
const IMAGE_URL = "https://cdn.prod.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp"
export const AvailableRooms = () => {
  return (
    <div>
        
        <Card >

        <div className="px-2 bg-gray-100 py-2 rounded-md">

        <img src={IMAGE_URL} alt='room' className='w-full h-48 object-cover' />

        <div className="flex items-center justify-between px-2 py-2">
        <Button className='bg-blue-500 text-xs   text-white'>Book Now</Button>
        <p className='text-sm font-semibold'>$100/Night</p>
        </div>
        </div>
        </Card>
        </div>
  )
}
