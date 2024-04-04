import {useEffect, useState} from 'react'
import useLight from '../hook/useBLEUART'


export default function LightStrip() {
  const [device, setDevice] = useState()
  const [filters, setFilters] = useState([{"name":"Smart-Lights"}])
  const [info, setInfo] = useState()
  const [options, setOptions] = useState({filters:filters})
  const [server, setServer] = useState()
  const [services, setServices] = useState([])


  const connect = async()=>{
    const result = await server.getPrimaryServices()

    const newServices = result.map(X=>{
      return {
        uuid: X.uuid,
        name: X.name,
        type: X.type,
        device: X.device,
        includedServices: X.includedServices,
        characteristics: X.characteristics
      }
    })
    console.log('services', result)
    setServices(newServices)
  }


  const getDevice = async()=>{
    options.filters = filters
    const device = await navigator.bluetooth.requestDevice(options)
    setDevice(device)
  }
  
  
  const getInfo = async()=>{
    options.filters = filters
    
    const result = await navigator.bluetooth.requestDevice(options)
    
    setInfo({
      name: result.name,
      id: result.id,
      connected: result.gatt.connected,
    })
  }
  
  
  useEffect(()=>{
    if (device) {
      console.log('device', device)
      device.gatt.connect()
      .then(serv=>{
        console.log('server', serv)
        setServer(serv)
      })
      .catch(console.error)
    }
  }, [device])


  return <>
    <button onClick={getInfo}>Get Device Info</button>

    <button onClick={getDevice}>Pair Device</button>

    {info? <>
      <h2>Info</h2>
      <pre>
        {JSON.stringify(info, null, 2)}
      </pre>
    </>: null}

    {device? <>
      <h2>Device</h2>
      <pre>
        {JSON.stringify(device, null, 2)}
      </pre>
    </>: null}

    {server?.connected? <>
      <h2>Server</h2>
      <pre>
        {JSON.stringify(server, null, 2)}
      </pre>
      <button onClick={connect}>Connect Device</button>
    </>: null}

    {services.length? <>
      <h2>Services</h2>
      <pre>
        {JSON.stringify(services, null, 2)}
      </pre>
    </>: null}
  </>
}
