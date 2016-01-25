export default class MagicMirror {

  constructor (domElement) {

    this.domElement = domElement
    this.isLoaded = false
  }

  load () {

    console.log('magic-mirror -- load')
    this.isLoaded = true
  }

  unload () {

    this.isLoaded = false
    console.log('magic-mirror -- unload')
  }
}
