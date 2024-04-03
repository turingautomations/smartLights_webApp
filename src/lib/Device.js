class Device {
  connected = false
  deviceName = ''
  device = {}
  filters = []
  notified = false
  options = {}
  server = {}
  service = {}
  serviceUUID = ''
  state = 0


  constructor(config) {
    try {
      this.options = {}
      
      if (config.deviceName || config.deviceNamePrefix) {
        this.filters = []
        this.deviceName = config.deviceName
        this.deviceNamePrefix = config.deviceNamePrefix
        this.filters.name = this.deviceName
        
        if (this.deviceName) {
          this.filters.push({name: [this.deviceName]})
        }
        
        if (this.deviceNamePrefix) {
          this.filters.push({namePrefix: [this.deviceNamePrefix]})
        }
      }


      if (!(this.deviceName || this.deviceNamePrefix)) {
        this.options.acceptAllDevices = true
      } else if (this.filters) {
        this.options.filters = this.filters
      }

      console.log('BLE options', this.options)

      this.serviceUUID = config.uuid

      if (this.serviceUUID) this.options.optionalServices = [this.serviceUUID]


      if (this.serviceUUID) {
        this.filters.push({services: [this.serviceUUID]})
      }
    } catch (error) {
      console.error('connect BT', error)
    }
  }
  
  
  async connect() {
    try {
      console.log('Device THIS', this)
      this.connected = false
      this.notified = false


      this.device = await navigator.bluetooth.requestDevice(this.options)

      this.device.addEventListener('advertisementreceived', event=>{
        console.log('DEVICE ADVERT', event)
      })

      this.device.addEventListener('gattserverdisconnected', event=>{
        console.log('DEVICE DISCONX', event)
      })
      
      console.log('BLE DEVICE', this.device)


      this.server = await this.device.gatt.connect()

      console.log('BLE SERVER', this.server, this.serviceUUID)

      this.service = await this.server.getPrimaryService(this.serviceUUID)


      console.log('BLE SERVICE')

      this.connected = true

      return this.service
    } catch (error) {
      console.error('Bluetooth connection error', error)
      this.cancel()
    }
  }


  cancel() {
    this.connected = false
    this.notified = false
  }


  async characteristic(uuid) {
    try {
      const result = await this.service.getCharacteristic(uuid)
      
      return result
    } catch (error) {
      console.error(error)
      this.cancel()
    }
  }
}


export default Device