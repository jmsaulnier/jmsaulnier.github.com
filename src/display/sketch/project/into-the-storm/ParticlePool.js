import THREE from 'three'

import Utils from './Utils'

export default class ParticlePool {

  constructor (options) {

	/**
	this.destroy = this.destroy.bind(this);
    this.setTarget = this.setTarget.bind(this);
    this.resize = this.resize.bind(this);
    this.createParticles = this.createParticles.bind(this);
    this.getParticles = this.getParticles.bind(this);
    this.makeRandomVertex = this.makeRandomVertex.bind(this);
    this.nextIndexForPool = this.nextIndexForPool.bind(this);
    this.morph = this.morph.bind(this);
    this.getRotationY = this.getRotationY.bind(this);
    this.setRotationY = this.setRotationY.bind(this);
   	**/

    this.particles
    this.respondingToMouse = false
    this.morphing = false
    this.morphStartTime
    this.currentTargetIndex
    this.targets = []
    this.halfW = 0
    this.halfH = 0
    this.halfZ = 0
    this.opts = {
      numFloatingParticles: 40,
      numParticles: 10000,
      particleRevertDelay: 0.008,
      revertDuration: 1000,
      sizeAttenuation: true
    }

    Utils.extend(this.opts, options)
  }

  init () {
    this.createParticles()
  }

  // Drops applicable references
  destroy () {

    this.particles.geometry.dispose()
    this.particles.material.dispose()
    this.particles = null
    this.opts = null
  }

  // Morph particles to specific target
  setTarget (targetParticles, animated = true) {

    targetParticles = targetParticles.clone()
    this.particles.material.size = targetParticles.material.size
    var iterable = this.particles.geometry.vertices

    for (var i = 0, vertex; i < iterable.length; i++) {

      vertex = iterable[i]
      var duration = animated ? this.opts.revertDuration : 0
      vertex.userData.morph.duration = duration
      vertex.userData.morph.delay = i * this.opts.particleRevertDelay
      // Morph target attributes
      vertex.userData.prevV = vertex.clone()
      vertex.userData.prevC = this.particles.geometry.colors[i].clone()
      var nextVertexIndex = this.nextIndexForPool(i, targetParticles)
      var nextVertex = targetParticles.geometry.vertices[nextVertexIndex]
      vertex.userData.nextV = nextVertex.clone()

      if (vertex.userData.alwaysFloating) {
        var randomV = this.makeRandomVertex()
        vertex.userData.nextV.set(randomV.x, randomV.y, randomV.z)
      }
      var color = nextVertex.userData.color
      if (!color) {
        color.r = color.b = color.g = 0
      }
      vertex.userData.nextC.setRGB(color.r, color.g, color.b)
    }
    this.morphStartTime = new Date()
    this.morphing = true
  }

  resize (halfW, halfH, halfZ) {

    this.halfW = halfW
    this.halfH = halfH
    this.halfZ = halfZ
  }

  // Construct initial particle system
  createParticles () {

    var geometry = new THREE.Geometry()

    if (this.opts.numFloatingParticles > 0) {

      var floatingVertexOffset = Math.floor(this.opts.numParticles / this.opts.numFloatingParticles)
    }

    var end = this.opts.numParticles

    for (var i = 0; i < end; i++) {
      var material
      geometry.vertices.push(new THREE.Vector3(0, 0, 0))

      if ((typeof floatingVertexOffset !== 'undefined' && floatingVertexOffset !== null)) {
        var isAlwaysFloating = i % floatingVertexOffset === 0
      }

      geometry.vertices[i].userData = {
        alwaysFloating: isAlwaysFloating,
        prevV: geometry.vertices[i].clone(),
        nextV: geometry.vertices[i].clone(),
        prevC: new THREE.Color(1, 1, 1),
        nextC: new THREE.Color(1, 1, 1),
        morph: {
          delay: 0,
          duration: 0
        }
      }

      geometry.colors.push(new THREE.Color(1, 1, 1))

      material = new THREE.PointsMaterial({
        vertexColors: true,
        transparent: true,
        depthTest: false,
        sizeAttenuation: this.opts.sizeAttenuation
      })
    }
    this.particles = new THREE.Points(geometry, material)
    this.particles.sortParticles = false
  }

  getParticles () {

    return this.particles
  }

  // Returns A vertex with random but visible coordinates
  makeRandomVertex () {

    var vert = new THREE.Vector3(0, 0, 0)
    vert.x = Math.random() * 2 * this.halfW - this.halfW
    vert.y = Math.random() * 2 * this.halfH - this.halfH
    vert.z = Math.random() * 2 * this.halfZ / 3 - this.halfZ / 3

    return vert
  }

  /*
   * Used to evenly distribute particles over the target's vertices
   * @param poolIndex - The current pool particle's index
   * @param targetParticles - The target's particle system
   * @return The target particle vertex index that should map to i
   */
  nextIndexForPool (poolIndex, targetParticles) {

    var numTargetParticles = targetParticles.geometry.vertices.length
    var ratio = numTargetParticles / this.opts.numParticles

    return Math.floor(poolIndex * ratio)
  }

  morph () {

    var now = new Date()
    var deltaT = now - this.morphStartTime
    var complete = true
    var iterable = this.particles.geometry.vertices

    for (var i = 0, v; i < iterable.length; i++) {

      v = iterable[i]
      var progress = 1
      if (v.userData.morph.duration > 0) {

        progress = Math.max(0, deltaT - v.userData.morph.delay)
        progress = Math.min(1, progress / v.userData.morph.duration)
        progress = 1 - (--progress * progress * progress * progress)
      }
      // Color
      var r = v.userData.prevC.r + progress * (v.userData.nextC.r - v.userData.prevC.r)
      var g = v.userData.prevC.g + progress * (v.userData.nextC.g - v.userData.prevC.g)
      var b = v.userData.prevC.b + progress * (v.userData.nextC.b - v.userData.prevC.b)
      this.particles.geometry.colors[i].setRGB(r, g, b)
      // Position
      var x = v.userData.prevV.x + progress * (v.userData.nextV.x - v.userData.prevV.x)
      var y = v.userData.prevV.y + progress * (v.userData.nextV.y - v.userData.prevV.y)
      var z = v.userData.prevV.z + progress * (v.userData.nextV.z - v.userData.prevV.z)
      v.set(x, y, z)

      if (progress < 1) {
        complete = false
      }
    }

    if (complete) {
      this.morphing = false
    }

    this.particles.geometry.verticesNeedUpdate = true
    this.particles.geometry.colorsNeedUpdate = true
  }

  getRotationY () {

    return this.particles.rotation.y
  }

  setRotationY (theta) {

    this.particles.rotation.y = theta
  }
}
