import React from 'react'


export default function Device({device}) {
  // console.log('Device', device)
  return <div>
    <h2>Device {device.name}</h2>
    id: {device.id}
    <br />
    <button onClick={E=>device.gatt.connect()}>
      {device.gatt.connected? 'Reconnect': 'Connect'}
    </button>
  </div>
}
