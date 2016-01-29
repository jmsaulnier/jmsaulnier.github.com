import THREE from 'three'
import Resize from 'brindille-resize'

import ModelTarget from './ModelTarget'
import ImageTarget from './ImageTarget'
import ParticlePool from './ParticlePool'

export default class Sketch {

  constructor (context, targetData) {

    this.context = context
    this.targetData = targetData

    this.respondingToMouse = false
    this.numTargetsLoaded = 0
    this.currentTargetIndex
    this.targets = []
    this.halfW = this.context.offsetWidth / 2
    this.halfH = this.context.offsetHeight / 2
    this.mouseX = 0
    this.sceneReady = false
    this.destinationSceneRotationY = 0
    this.dirty = true
    this.slideshowInterval = null
    this.onAssetsLoad = null
    this.opts = {
      fov: 45,
      maxMouseRotation: Math.PI / 4,
      mouseRotationFriction: 0.2,
      numFloatingParticles: 40,
      numParticles: 20000,
      particleRevertDelay: 0.01,
      revertDuration: 800,
      sizeAttenuation: true,
      slideshowDuration: 5000,
      sort: null
    }
  }

  load (index) {

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(this.opts.fov, this.halfW / this.halfH, 1, 2000)
    this.camera.position.z = 2 * this.halfH / (2 * Math.tan(this.opts.fov / 2 * (Math.PI / 180)))

    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setSize(2 * this.halfW, 2 * this.halfH)

    this.context.appendChild(this.renderer.domElement)

    document.addEventListener('mousemove', this.onMouseMove.bind(this))

    this.setup(() => {
      this.setTarget(index)
       // this.startSlideshow()
    })
  }

  unload () {

    this.stop()
    Resize.removeListener(this.resize.bind(this))
    document.removeEventListener('mousemove', this.onMouseMove.bind(this))

    var start = this.scene.children.length - 1

    for (var i = start; start < 0 ? i <= 0 : i >= 0; start < 0 ? i-- : i--) {

      this.scene.children[i].geometry.dispose()
      this.scene.children[i].material.dispose()
      this.scene.remove(this.scene.children[i])
    }

    var iterable = this.targets

    for (var j = 0, target; j < iterable.length; j++) {

      target = iterable[j]
      target.destroy()
    }

    this.renderer = null
    this.scene = null
    this.camera = null
    this.pool.destroy()
    this.pool = null
    this.targets = null
    this.opts = null
  }

  setTarget (index, animated = true) {

    this.currentTargetIndex = index
    if (!this.sceneReady || typeof this.currentTargetIndex === 'undefined') {
      return
    }
    if (this.targets[this.currentTargetIndex].opts.respondsToMouse) {
      this.respondingToMouse = true
      this.setSceneMouseRotation(this.mouseX)
    } else {
      this.respondingToMouse = false
      this.setSceneMouseRotation(this.halfW)
    }
    var targetParticles = this.targets[index].getParticles()
    this.pool.setTarget(targetParticles, animated)
  }

  nextTarget (animated = true) {

    this.resetSlideshow()
    var index = this.currentTargetIndex
    index++

    if (index >= this.targets.length) {
      index = 0
    }

    this.setTarget(index, animated)
  }

  prevTarget (animated = true) {

    this.resetSlideshow()
    var index = this.currentTargetIndex
    index--

    if (index < 0) {
      index = this.targets.length - 1
    }

    this.setTarget(index, animated)
  }

  resetSlideshow () {

    if ((this.slideshowInterval != null)) {

      this.startSlideshow()
    }
  }

  startSlideshow () {

    clearInterval(this.slideshowInterval)
    this.slideshowInterval = setInterval(this.nextTarget.bind(this), this.opts.slideshowDuration)
  }

  stopSlideshow () {

    clearInterval(this.slideshowInterval)
    this.slideshowInterval = null
  }

  resize () {

    this.dirty = true
    this.halfW = this.context.offsetWidth / 2
    this.halfH = this.context.offsetHeight / 2
    this.camera.aspect = (2 * this.halfW) / (2 * this.halfH)
    this.camera.updateProjectionMatrix()
    this.camera.position.z = 2 * this.halfH / (2 * Math.tan(this.opts.fov / 2 * (Math.PI / 180)))
    this.renderer.setSize(2 * this.halfW, 2 * this.halfH)
    this.pool.resize(this.halfW, this.halfH, this.camera.position.z)
    var iterable = this.targets

    for (var i = 0, target; i < iterable.length; i++) {

      target = iterable[i]
      target.resize()
    }

    this.setTarget(this.currentTargetIndex, false)
  }

  stop () {

    cancelAnimationFrame(this.raf)
  }

  animate () {

    if (!this.sceneReady) {
      return
    }
    this.raf = requestAnimationFrame(this.animate.bind(this))
    this.render()
  }

  // Load initial targetData
  setup (onAssetsLoad) {

    var t, _i, _len, _ref, _results
    this.onAssetsLoad = onAssetsLoad
    _ref = this.targetData
    _results = []
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      t = _ref[_i]
      _results.push(this.loadTarget(t, this.onTargetLoad.bind(this)))
    }

    return _results
  }

  /*
   * Load an individual target (safe to use for targets beyond the initial ones)
   * @param target {PlainObject} - The target object description
   * @param onLoad {Function} - Optional callback
   */
  loadTarget (target, onLoad) {

    var particleTarget

    if (!(target.container != null)) { target.container = this.context }
    if (!(target.options != null)) { target.options = {} }
    if (target.type !== ModelTarget) {
      target.options.numParticles = this.opts.numParticles
    }
    target.options.sort = this.opts.sort

    if (target.type === ModelTarget) {
      particleTarget = new ModelTarget(target, target.options)
    } else {
      particleTarget = new ImageTarget(target, target.options)
    }

    this.targets.push(particleTarget)
    particleTarget.init()
    particleTarget.load(onLoad)

    this.resetSlideshow()
  }

  // Load callback used for initial load
  onTargetLoad () {

    this.numTargetsLoaded++

    if (this.numTargetsLoaded > 0 && this.numTargetsLoaded === this.targetData.length) {
      this.onTargetsReady()
    }
  }

  // Begins animations when initial assets have loaded
  onTargetsReady () {

    this.setupPool()
    Resize.addListener(this.resize.bind(this))
    this.animate()

    if (typeof this.onAssetsLoad === 'function') {
      this.onAssetsLoad()
    }
  }

  setupPool () {

    this.pool = new ParticlePool(this.opts)
    this.pool.resize(this.halfW, this.halfH, this.camera.position.z)
    this.pool.init()
    this.scene.add(this.pool.getParticles())
    this.sceneReady = true

    if ((this.currentTargetIndex != null)) {
      this.setTarget(this.currentTargetIndex)
    }
  }

  render () {

    var oldTheta = this.pool.getRotationY()
    this.setSceneMouseRotation(this.mouseX)

    if (oldTheta !== this.pool.getRotationY() || this.pool.morphing) {
      this.dirty = true
    }
    if (this.pool.morphing) {
      this.pool.morph()
    }
    if (this.dirty) {
      this.dirty = false
      this.renderer.render(this.scene, this.camera)
    }
  }

  onMouseMove (event) {

    this.mouseX = event.clientX
  }

  setSceneMouseRotation (mouseX) {

    this.destinationSceneRotationY = 0
    var theta = this.pool.getRotationY()

    if (this.halfW > 0 && this.respondingToMouse) {

      var mouseXProportion = (mouseX - this.halfW) / this.halfW
      this.destinationSceneRotationY = this.opts.maxMouseRotation * mouseXProportion
    }

    if (Math.abs(theta - this.destinationSceneRotationY) < 0.01) {

      return this.pool.setRotationY(this.destinationSceneRotationY)

    } else {

      var deltaRY = this.destinationSceneRotationY - theta
      var newTheta = theta + this.opts.mouseRotationFriction * deltaRY
      this.pool.setRotationY(newTheta)
    }
  }
}
