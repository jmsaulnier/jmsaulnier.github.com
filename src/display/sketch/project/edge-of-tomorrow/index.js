export default class EdgeOfTomorrow {

  constructor (domElement) {

    this.domElement = domElement
    this.isLoaded = false
  }

  load () {

    console.log('edge-of-tomorrow -- load')
    this.isLoaded = true
  }

  unload () {

    this.isLoaded = false
    console.log('edge-of-tomorrow -- unload')
  }
}
