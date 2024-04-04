import React from 'react'

export default function Server({server}) {
  // console.log('Server', server)
  
  return <div>
    {server?.connected? <>
      <h3>BLE Server Connected</h3>
    </>
    : null}
  </div>
}
