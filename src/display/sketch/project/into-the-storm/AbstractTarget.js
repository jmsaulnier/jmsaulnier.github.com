export default class AbstractTarget {

  constructor (targetData, options) {

    this.targetData = targetData

    /**
    this.init = this.init.bind(this)
    this.load = this.load.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.destroy = this.destroy.bind(this)
    this.resize = this.resize.bind(this)
    this.getParticles = this.getParticles.bind(this)
	**/

    this.onLoadCallback
  }

  init () {}
    // Typically required for targets that need to be size aware.

  load (callback) {

    this.onLoadCallback = callback
  }

  // Called after target has loaded
  onLoad () {
    if ((this.onLoadCallback != null)) {
      this.onLoadCallback()
    }
  }

  destroy () {

    if ((this.particles != null)) {

      this.particles.geometry.dispose()
      this.particles.material.dispose()
      this.particles = null
    }
  }

  resize () {}

  /*
   * Must return a THREE.ParticleSystem - this is needed by the pool to maps
   * vertices to this target
   */
  getParticles () {

    return null
  }
}
