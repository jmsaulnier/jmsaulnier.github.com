export default class Particles {

  constructor ($el, opts) {

    this.$el = $el

    this.color = opts.color || '#fff'
    this.hoverColor = opts.hoverColor || '#88f'
    this.gap = opts.gap || 0
    this.radius = opts.radius || 1
    this.hoverColor = opts.hoverColor || 10
    this.monochrome = opts.monochrome || !1
    this.mouseForce = opts.mouseForce || 1e4
    this.restless = opts.restless || !0

    this.width = this.$el.offsetWidth
    this.height = this.$el.offsetHeight
    this.images = []

    this.$slides = this.$el.querySelectorAll('.slides .slide')
    this.$canvas = this.$el.querySelector('.draw')
    this.$srcCanvas = document.createElement('canvas')
    this.$srcCanvas.style.display = 'none'
    this.$el.appendChild(this.$srcCanvas)
    this.$prevCanvas = document.createElement('canvas')
    this.$prevCanvas.style.display = 'none'
    this.$el.appendChild(this.$prevCanvas)
    this.$nextCanvas = document.createElement('canvas')
    this.$nextCanvas.style.display = 'none'
    this.$el.appendChild(this.$nextCanvas)
    this.$overlay = this.$el.createElement('p')
    this.$el.appendChild(this.$overlay)

    this.mouseDownArea = 0
    this.mouseX = -1
    this.mouseY = -1
    this.swipeOffset = 0
    this.frame = 0
    this.currentImage = 0
    this.lastImage = 0
    this.pxlBuffer = { first: null }
    this.recycleBuffer = { first: null }

    this.ctx = this.$canvas.getContext('2d')
    this.srcCtx = this.$srcCanvas.getContext('2d')
    this.prevCtx = this.$prevCanvas.getContext('2d')
    this.nextCtx = this.$nextCanvas.getContext('2d')
  }
}
