import THREE from 'three'

import AbstractTarget from './AbstractTarget'
import Utils from './Utils'

export default class ImageTarget extends AbstractTarget {

  constructor (targetData, options) {

    super(targetData, options)

    this.targetData = targetData

    this.centerVertex = this.centerVertex.bind(this)
    this.scalevertex = this.scalevertex.bind(this)
    this.getParticles = this.getParticles.bind(this)
    this.particles
    this.container = this.targetData.container
    this.validPixelArrayOffsets = []
    this.maxW = 0
    this.maxH = 0
    this.offsetX = 0
    this.offsetY = 0
    this.imageData
    this.aspectFillImageScaleX = 1
    this.aspectFillImageScaleY = 1
    this.opts = {
      numParticles: 10000,
      respondsToMouse: false,
      size: 1.0,
      sort: null
    }

    Utils.extend(this.opts, options)
  }

  init () {

    return this.resize()
  }

  resize () {

    this.maxW = this.container.offsetWidth
    this.maxH = this.container.offsetHeight

    if (this.imageData) {
      this.updatePositionAdjustments()

      if (this.particles) {
        this.updateParticlePositions()
      }
    }
  }

  // Calculates sizing data needed to position the image particles
  updatePositionAdjustments () {

    var width = this.maxW
    var height = this.maxH
    var outerRatio = this.maxW / this.maxH
    var innerRatio = this.imageData.width / this.imageData.height

    if (outerRatio > innerRatio) {
      width = this.maxW
      height = width / innerRatio
    } else {
      height = this.maxH
      width = height * innerRatio
    }

    this.aspectFillImageScaleX = width / this.imageData.width
    this.aspectFillImageScaleY = height / this.imageData.height
    this.offsetX = (this.maxW - this.imageData.width) / 2
    this.offsetY = -(this.maxH - this.imageData.height) / 2
  }

  // Updates particle positions after a resize
  updateParticlePositions () {

    var iterable = this.particles.geometry.vertices

    for (var i = 0; i < iterable.length; i++) {
      var vertex = iterable[i]
      var v = this.getVertexForPixelDataOffset(vertex.userData.pixelOffset)
      vertex.x = v.x
      vertex.y = v.y
      vertex.z = v.z
    }
  }

  load (callback) {

    super.load(callback)

    var loader = new THREE.ImageLoader()
    loader.load(this.targetData.url, this.onLoad.bind(this))
  }

  onLoad (img) {

    this.processImage(img)
    super.onLoad(img)
  }
    // super()

  /*
   * Generate particles for an image
   * @param img - A loaded img element
   */
  processImage (img) {

    this.imageData = this.getImageDataFromImg(img)
    this.updatePositionAdjustments()

    // Store valid pixel data offsets if alpha > 0
    var end = this.imageData.data.length
    for (var i = 3; i < end; i += 4) {
      if (this.imageData.data[i] > 0) {
        this.validPixelArrayOffsets.push(i - 3)
      }
    }

    var geometry = new THREE.Geometry()
    var end1 = this.opts.numParticles

    for (var j = 0; j < end1; j++) {
      var vertex = this.randomVertexInImage()
      geometry.vertices.push(vertex)
    }

    if ((this.opts.sort != null)) {
      geometry.vertices.sort(this.opts.sort)
    }

    var material = new THREE.PointsMaterial({size: this.opts.size})
    this.particles = new THREE.Points(geometry, material)
  }

  /*
   * Extracts image data object from an image
   * @param img - A loaded img element
   */
  getImageDataFromImg (img) {

    var canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    return ctx.getImageData(0, 0, img.width, img.height)
  }

  // Returns a vertex that corresponds with a random, visible pixel
  randomVertexInImage () {

    var randomIndex = Math.floor(Math.random() * this.validPixelArrayOffsets.length)
    var pixelOffset = this.validPixelArrayOffsets[randomIndex]
    var vertex = this.getVertexForPixelDataOffset(pixelOffset)

    return vertex
  }

  /*
   * Returns a vertex based on the index of a visible red component in the pixel
   * data array
   */
  getVertexForPixelDataOffset (pixelOffset) {

    var r = this.imageData.data[pixelOffset]
    var g = this.imageData.data[pixelOffset + 1]
    var b = this.imageData.data[pixelOffset + 2]
    var compsPerRow = 4 * this.imageData.width
    var x = Math.ceil((pixelOffset % compsPerRow) / 4)
    var y = Math.ceil(pixelOffset / compsPerRow)

    var vertex = new THREE.Vector3(x, y, 0)
    vertex.userData = {
      color: {
        r: r / 255,
        g: g / 255,
        b: b / 255
      },
      pixelOffset: pixelOffset
    }

    this.centerVertex(vertex)
    this.scalevertex(vertex)

    return vertex
  }
  // Centers a vertex based on current sizing information
  centerVertex (vertex) {

    // Convert coordinates centered about origin
    vertex.x -= this.maxW / 2
    vertex.y = -vertex.y + this.maxH / 2
    // Apply aspect-fill derived offsets
    vertex.x += this.offsetX
    vertex.y += this.offsetY
  }

  scalevertex (vertex) {

    vertex.x *= this.aspectFillImageScaleX
    vertex.y *= this.aspectFillImageScaleY
  }

  getParticles () {

    return this.particles
  }
}
