import React from 'react'
import { checkUser } from '@/lib/chekckUser';
import DashboardPage from '@/components/global/dashboard-page'

async function page() {
  await checkUser();

  return (
    <div>
      <DashboardPage />
    </div>
  )
}

export default page