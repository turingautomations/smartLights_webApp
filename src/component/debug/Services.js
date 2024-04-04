import React from 'react'
import Service from './Service'


export default function Services({services}) {
    // console.log('services', services)
    
    return <div>
    <h3>Services</h3>
    {services.map((service, index)=><Service key={index} service={service} />)}
  </div>
}
