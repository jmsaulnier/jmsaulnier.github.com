import THREE from 'three'

import AbstractTarget from './AbstractTarget'
import ModelTarget from './ModelTarget'
import ImageTarget from './ImageTarget'
import Utils from './Utils'

export default class MultiTarget extends AbstractTarget {

  /*
  @param {Array.object} targetData - the list of target data objects.
  */
  constructor (targetData, options) {

    super(targetData, options)

    this.targetData = targetData

    /**
    this.load = this.load.bind(this);
    this.onTargetLoad = this.onTargetLoad.bind(this);
    this.prepareParticles = this.prepareParticles.bind(this);
    this.getTargetOffsets = this.getTargetOffsets.bind(this);
    this.resize = this.resize.bind(this);
    this.getParticles = this.getParticles.bind(this);
    **/

    this.targets = []
    this.particles
    this.container = this.targetData.container
    this.numTargetsLoaded = 0
    this.opts = {
      color: {
        r: 1,
        g: 1,
        b: 1
      },
      respondsToMouse: false,
      size: 1.0,
      sort: null
    }

    Utils.extend(this.opts, options)
  }

  // Load all nested target assets
  load (callback) {

    super(callback)

    return (() => {
      var result = []
      var iterable = this.targetData.targets
      for (var i = 0, target; i < iterable.length; i++) {
        target = iterable[i]
        if (!(target.container != null)) { target.container = this.container }
        if (!(target.options != null)) { target.options = target.options || {} }
        if (target.type !== ModelTarget) {
          target.options.numParticles = this.opts.numParticles
        }
        var opts = {}
        Utils.extend(opts, this.opts)
        Utils.extend(opts, target.options)

        if (target.type === ModelTarget) {
          this.targets.push(new ModelTarget(target, opts))
        } else {
          this.targets.push(new ImageTarget(target, opts))
        }

        this.targets[i].init()
        result.push(this.targets[i].load(this.onTargetLoad))
      }
      return result
    })()
  }

  onTargetLoad () {

    this.numTargetsLoaded++

    if (this.numTargetsLoaded > 0 && this.numTargetsLoaded === this.targetData.targets.length) {
      this.resize()
      this.onLoad()
    }
  }

  // Create particle system by merging nested targets'
  prepareParticles () {

    var geometry = new THREE.Geometry()
    var iterable = this.targets

    for (var i = 0, target; i < iterable.length; i++) {

      target = iterable[i]
      var targetData = this.targetData.targets[i]
      var targetOffsets = this.getTargetOffsets(targetData)
      var targetParticles = target.getParticles()

      for (var j = 0; j < targetParticles.geometry.vertices.length; j++) {

        var vertex = targetParticles.geometry.vertices[j]
        // var userData = vertex.userData
        var v = vertex.clone()
        v.userData = vertex.userData
        v.x += targetOffsets.x
        v.y += targetOffsets.y
        geometry.vertices.push(v)
      }
    }
    if ((this.opts.sort != null)) {
      geometry.vertices.sort(this.opts.sort)
    }

    var material = new THREE.PointsMaterial({size: this.opts.size})
    this.particles = new THREE.Points(geometry, material)
  }

  // Returns 3D scene x/y coords based on nested targets' container positions
  getTargetOffsets (targetData) {

    var halfW = 0
    var halfH = 0
    var offsetY = 0
    halfW = this.container.offsetWidth / 2
    halfH = this.container.offsetHeight / 2
    var el = targetData.container
    var x = (el.offsetLeft + 0.5 * el.offsetWidth) - halfW
    var y = halfH - (el.offsetTop + offsetY + 0.5 * el.offsetHeight)

    return {x: x, y: y}
  }

  resize () {

    return this.prepareParticles()
  }

  getParticles () {

    return this.particles
  }
}