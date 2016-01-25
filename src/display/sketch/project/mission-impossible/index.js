import THREE from 'three'

export default class MissionImpossible {

  constructor (domElement) {

    this.domElement = domElement
    this.isLoaded = false
  }

  load () {

    console.log('mission-impossible -- load')

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.domElement.appendChild(this.renderer.domElement)

    var geometry = new THREE.BoxGeometry(1, 1, 1)
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)

    this.camera.position.z = 5

    this.isLoaded = true
    this.render()
  }

  render () {

    console.log('mission-impossible -- render')

    if (this.isLoaded) {

      requestAnimationFrame(this.render.bind(this))

      this.cube.rotation.x += 0.1
      this.cube.rotation.y += 0.1

      this.renderer.render(this.scene, this.camera)
    }
  }

  unload () {

    this.isLoaded = false
    console.log('mission-impossible -- unload')
  }
}
