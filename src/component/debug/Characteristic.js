import {useEffect, useState} from 'react'

/*
  Characteristics
    getDescriptor
    getDescriptors
    readValue
    startNotifications
    stopNotifications
    writeValue
    writeValueWithoutResponse
    writeValueWithResponse
*/


export default function Characteristic({characteristic}) {
  const [descriptors, setDescriptors] = useState([])
  const [properties, setProperties] = useState({})


  const getDescriptors = async()=>{
    try {
      const result = await characteristic.getDescriptors()
      console.log('descriptors', result)
      setDescriptors(result)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  const readValue = async()=>{
    try {
      const result = await characteristic.readValue()
      console.log('readValue', result)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  const startNotifications = async()=>{
    try {
      const result = await characteristic.startNotifications()
      console.log('startNotifications', result)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  const stopNotifications = async()=>{
    try {
      const result = await characteristic.stopNotifications()
      console.log('stopNotifications', result)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  const writeValue = async(val)=>{
    try {
      const result = await characteristic.writeValue(val)
      console.log('writeValue', result)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  const writeValueWithoutResponse = async(val)=>{
    try {
      const result = await characteristic.writeValueWithoutResponse(val)
      console.log('writeValueWithoutResponse', result)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  const writeValueWithResponse = async(val)=>{
    try {
      const result = await characteristic.writeValueWithResponse(val)
      console.log('writeValueWithResponse', result)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    // console.log('Characteristic', characteristic)
    if (characteristic?.properties) {
      // console.log('properties', characteristic.properties)
      setProperties({
        authenticatedSignedWrites: characteristic.properties.authenticatedSignedWrites,
        broadcast: characteristic.properties.broadcast,
        indicate: characteristic.properties.indicate,
        notify: characteristic.properties.notify,
        read: characteristic.properties.read,
        reliableWrite: characteristic.properties.reliableWrite,
        writableAuxiliaries: characteristic.properties.writableAuxiliaries,
        write: characteristic.properties.write,
        writeWithoutResponse: characteristic.properties.writeWithoutResponse,
      })
    }
  }, [characteristic])


  return <>
    <div> {characteristic.uuid} </div>
    <div> {characteristic.value} </div>
    
    {properties? <>
      {properties.authenticatedSignedWrites? 'Authenticated Signed Writes': null}
      {properties.broadcast? 'Broadcast': null}
      {properties.indicate? 'Indicate': null}
      {properties.notify? 'Notify': null}
      {properties.read? 'Read': null}
      {properties.reliableWrite? 'Reliable Write': null}
      {properties.writableAuxiliaries? 'Writable Auxiliaries': null}
      {properties.write? 'Write': null}
      {properties.writeWithoutResponse? 'Write Without Response': null}
    </>: null}
    
    <button onClick={getDescriptors}>Get Descriptors</button>

    {properties?.notify? <>
      <button onClick={startNotifications}>Start Notifications</button>
      <button onClick={stopNotifications}>Stop Notifications</button>
    </>:null}
  </>
}
