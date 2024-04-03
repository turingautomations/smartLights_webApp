import { useState} from 'react'
import {BLE} from 'conx_client_api'


const UUID = {
  service: '0000001f-0000-1000-8000-00805f9b34fb',
  input: '000007c5-0000-1000-8000-00805f9b34fb',
  output: '000007c6-0000-1000-8000-00805f9b34fb',
}

const ble = new BLE({
  deviceName: 'Smart-Lights',
  uuid: UUID.service,
})


export default function SmartLight() {
  const [connected, setConnected] = useState(false)
  const [notified, setNotified] = useState(false)
  const [input, setInput] = useState()
  const [output, setOutput] = useState()
  
  let service


  async function connect() {
    try {    
      service = await ble.connect()
      
      setConnected(true)
      
      const newInput = await ble.characteristic(UUID.input)
      const newOutput = await ble.characteristic(UUID.output)
      
      setInput(newInput)
      setOutput(newOutput)
      
      setNotified(true)
      
      console.log(`SmartLight BLE connected`)
    } catch (error) {
      console.error(error)
    }
  }


  return {
    connect,
    connected,
    notified,
    input,
    output,
  }
}