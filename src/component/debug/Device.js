import React from 'react'


export default function Device({device}) {
  const connect = async()=>{
    try {
      const result = await device.gatt.connect()
      
      console.log('connect', result)
    } catch (error) {
      console.error(error)
    }
  }


  return <div>
    <h2>Device {device.name}</h2>
    id: {device.id}
    <br />
    <button onClick={connect}>
      {device.gatt.connected? 'Reconnect': 'Connect'}
    </button>
  </div>
}
