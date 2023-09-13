import React from 'react'

const Profile = ({params}:any) => {
  return (
    <div className='flex text-center justify-center min-h-screen flex-col text-xl py-4'>profile {params.id}</div>
  )
}

export default Profile;