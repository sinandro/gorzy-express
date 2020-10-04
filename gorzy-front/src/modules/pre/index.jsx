import React, { useEffect } from 'react'
import { apiCall } from './../../Helper'

const Page = () => {

  useEffect(() => {
    apiCall({ url: '/' })
  }, [])

  return (<div>eyy</div>);
}

export default Page;
