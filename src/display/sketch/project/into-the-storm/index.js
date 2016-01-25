export default class IntoTheStorm {

  constructor (domElement) {

    this.domElement = domElement
    this.isLoaded = false
  }

  load () {

    console.log('into-the-storm -- load')
    this.isLoaded = true
  }

  unload () {

    this.isLoaded = false
    console.log('into-the-storm -- unload')
  }
}
