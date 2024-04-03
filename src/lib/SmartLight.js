import fullConfiguration from '../config'
import Device from './Device'

const config = fullConfiguration.SmartLight

const UUID = {
  read: config.READ,
  write: config.WRITE,
  service: config.SERVICE,
}


console.log('SmartLight Config', UUID)


class SmartLight extends Device {
  encoder = new TextEncoder('utf-8')
  readChannel = {}
  writeChannel = {}


  constructor() {
    console.log('SmartLight Config', UUID)

    super({
      deviceName: 'Smart-Light',
      uuid: UUID.service,
    })
  }


  async initialize() {
    this.connected = false
    this.notified = false

    await this.connect()

    this.connected = true

    this.readChannel = await this.characteristic(UUID.read)
    this.writeChannel = await this.characteristic(UUID.write)

    this.readChannel.addEventListener('characteristicvaluechanged', data=>{
      console.log(data)
    })

    this.readChannel.startNotifications()

    this.notified = true

    console.log('Smart-Light intialized')
  }


  activate(value) {
    const msg = this.encoder.encode(`activate=${+value}\r\n`)
    this.writeChannel.writeValue(msg)
  }

  deactivate(value) {
    const msg = this.encoder.encode(`deactivate=${+value}\r\n`)
    this.writeChannel.writeValue(msg)
  }
}


export default SmartLight