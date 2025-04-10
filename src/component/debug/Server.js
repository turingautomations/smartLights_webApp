import {useState} from 'react'
import Services from './Services'


export default function Server({server}) {
  const [services, setServices] = useState([])
  
  
  const setupServer = async()=>{
    try {
      const result = await server.getPrimaryServices()
      
      setServices(result)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  return <div>
    {server?.connected? <>
      <h3>BLE Server Connected</h3>
      <button onClick={setupServer}>Setup Server</button>
    </>
    : null}
    
    {services.length? <>
      <Services services={services} />
    </>: null}
  </div>
}
