import {useEffect, useState} from 'react'
import Device from './Device'
import Server from './Server'


const defaultFilters = [{name: "Smart-Lights"}]

const defaultOptions = {
  acceptAllDevices: false,
  filters: defaultFilters,
  optionalServices: [
    '0000001f-0000-1000-8000-00805f9b34fb',
  ],
}


export default function LightStrip() {
  const [device, setDevice] = useState()
  const [filters, setFilters] = useState(defaultFilters)
  const [options, setOptions] = useState(defaultOptions)
  const [server, setServer] = useState()


  const connectDevice = async()=>{
    try {
      const result = await device.gatt.connect()
      
      setServer(result)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  const pairDevice = async()=>{
    try {
      if (!options.acceptAllDevices) options.filters = filters
      
      const device = await navigator.bluetooth.requestDevice(options)
      setDevice(device)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  useEffect(()=>{
    if (device) connectDevice().then(console.log).catch(console.error)
  }, [device])


  return <>
    <button onClick={pairDevice}>Pair Device</button>
    
    {device? <> <Device device={device} /> </>: null}
    
    {server?.connected? <>
      <Server server={server} />
    </>: null}
  </>
}
