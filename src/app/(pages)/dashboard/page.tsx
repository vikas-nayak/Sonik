import React from 'react'
import { checkUser } from '@/lib/chekckUser';

async function page() {
  await checkUser();

  return (
    <div></div>
  )
}

export default page