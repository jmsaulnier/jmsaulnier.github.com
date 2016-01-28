import Particles from './Particles'

export default class Mockingjay {

  constructor (domElement) {

    this.domElement = domElement
    this.isLoaded = false
  }

  load () {

    console.log('mockingjay -- load')
    this.isLoaded = true

    this.particles = new Particles(this.domElement, {
      gap: 0,
      size: 2
    })
  }

  unload () {

    this.particles = null
    this.isLoaded = false
    console.log('mockingjay -- unload')
  }
}
