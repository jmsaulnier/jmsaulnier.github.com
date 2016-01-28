import THREE from 'three'
import { EffectComposer, RenderPass, GlitchPass } from 'postprocessing'
// import { EffectComposer, RenderPass, GlitchPass, ShaderPass } from 'postprocessing'
// import { DotScreenShader } from '../../../../3d/shaders/DotScreenShader'
// import { RGBShiftShader } from '../../../../3d/shaders/RGBShiftShader'

const COLOR = '#000'

export default class EdgeOfTomorrow {

  constructor (domElement) {

    this.domElement = domElement
    this.isLoaded = false

    this.xSpeed = 0.005
    this.ySpeed = 0.007
  }

  load () {

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(COLOR, 0.001)

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)

    this.camera.position.z = 100

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(COLOR, 1)
    this.domElement.appendChild(this.renderer.domElement)

    // instantiate a loader
    var loader = new THREE.TextureLoader()

    // load a resource
    loader.load(
      // resource URL
      'assets/images/projects/Mockingjay_Hero2.jpg',
      // Function when resource is loaded
      function (texture) {
        // do something with the texture

        this.geometry = new THREE.SphereGeometry(35, 5, 5)
        this.material = new THREE.MeshPhongMaterial({
          color: '#fff',
          shading: THREE.FlatShading,
          map: texture
        })

        this.cube = new THREE.Mesh(this.geometry, this.material)
        this.cube.rotation.set(Math.random(), Math.random(), Math.random())
        this.scene.add(this.cube)
      }.bind(this),
      // Function called when download progresses
      function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      // Function called when download errors
      function (xhr) {

        console.log('An error happened')
      }
    )

    this.light1 = new THREE.DirectionalLight('#fff')
    this.light1.position.set(-50, 50, 50)
    this.scene.add(this.light1)

    this.light2 = new THREE.AmbientLight('#fff')
    this.light2.color.multiplyScalar(0.2)
    this.scene.add(this.light2)

    // postprocessing
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))

    /**
    let dotscreen = new ShaderPass(DotScreenShader)
    dotscreen.uniforms['scale'].value = 3
    this.composer.addPass(dotscreen)

    let rgbshift = new ShaderPass(RGBShiftShader)
    rgbshift.uniforms['amount'].value = 0.0015
    this.composer.addPass(rgbshift)
    **/

    let glitch = new GlitchPass()
    this.composer.addPass(glitch)
    glitch.renderToScreen = true

    console.log('edge-of-tomorrow -- load')
    this.isLoaded = true

    this.render()
  }

  render () {

    if (this.isLoaded) {

      requestAnimationFrame(this.render.bind(this))

      if (this.cube) {

        this.cube.rotation.y += this.xSpeed
        this.cube.rotation.x += this.ySpeed
      }

      this.camera.lookAt(this.scene.position)
      // this.renderer.render(this.scene, this.camera)
      this.composer.render()
    }
  }

  unload () {

    this.isLoaded = false
    console.log('edge-of-tomorrow -- unload')
  }
}
