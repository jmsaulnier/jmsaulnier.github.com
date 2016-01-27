export default class Mockingjay {

  constructor (domElement) {

    this.domElement = domElement
    this.isLoaded = false
  }

  load () {

    console.log('mockingjay -- load')
    this.isLoaded = true
  }

  unload () {

    this.isLoaded = false
    console.log('mockingjay -- unload')
  }
}
