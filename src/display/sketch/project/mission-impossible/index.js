export default class MissionImpossible {

  constructor (domElement) {

    this.domElement = domElement
    this.isLoaded = false
  }

  load () {

    console.log('mission-impossible -- load')
    this.isLoaded = true
  }

  unload () {

    this.isLoaded = false
    console.log('mission-impossible -- unload')
  }
}
