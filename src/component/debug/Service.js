import {useEffect, useState} from 'react'
import Characteristic from './Characteristic'


export default function Service({service}) {
  const [characteristics, setCharacteristics] = useState()
  // console.log('Service', service)


  const gleanCharacteristics = async(serv)=>{
    const chars = await service.getCharacteristics()
    
    setCharacteristics(chars)
  }


  useEffect(() => {
    if (service) gleanCharacteristics(service).then(console.log).catch(console.error)
  }, [service])


  return <div>
    <div>
      {service?.isPrimary? 'Primary': null}
      {service.uuid}
    </div>
    
    {characteristics? <>
      <h2>Characteristics</h2>

      {characteristics.map((X, i)=><Characteristic key={i} characteristic={X} />)}
    </>: null}
  </div>
}
