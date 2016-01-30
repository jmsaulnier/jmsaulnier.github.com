import THREE from 'three'

import AbstractTarget from './AbstractTarget'
import Utils from './Utils'

export default class ModelTarget extends AbstractTarget {

  constructor (targetData, options) {

    super(targetData, options)

    this.targetData = targetData

    this.particles
    this.container = this.targetData.container

    this.opts = {
      color: {
        r: 1,
        g: 1,
        b: 1
      },
      initialMatrices: [],
      respondsToMouse: false,
      scale: 1.0,
      size: 1.0,
      sort: null
    }

    Utils.extend(this.opts, options)
  }

  load (callback) {

    super.load(callback)

    if ((this.targetData.preloadedVertices != null)) {

      var geometry = new THREE.Geometry()
      var verts = this.targetData.preloadedVertices

      for (var i = 0; i < verts.length; i += 3) {

        geometry.vertices.push(new THREE.Vector3(verts[i], verts[i + 1], verts[i + 2]))
      }
      this.onLoad(geometry)

    } else {

      var loader = new THREE.JSONLoader()
      loader.load(this.targetData.url, this.onLoad.bind(this))
    }
  }

  onLoad (geometry) {

    this.processGeometry(geometry)
    super.onLoad(geometry)
  }

  // Prepares a particle system based on some geometry
  processGeometry (geometry) {

    geometry.mergeVertices()

    for (var i = 0, vertex; i < geometry.vertices.length; i++) {
      vertex = geometry.vertices[i]
      vertex.userData = {color: this.opts.color}
    }

    var iterable = this.opts.initialMatrices
    for (var j = 0, matrix; j < iterable.length; j++) {

      matrix = iterable[j]
      geometry.applyMatrix(matrix)
    }

    geometry.applyMatrix(new THREE.Matrix4().makeScale(this.opts.scale, this.opts.scale, this.opts.scale))

    if ((this.opts.sort != null)) {
      geometry.vertices.sort(this.opts.sort)
    }

    var material = new THREE.PointsMaterial({size: this.opts.size})
    this.particles = new THREE.Points(geometry, material)
  }

  getParticles () {

    return this.particles
  }
}

