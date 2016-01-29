import ModelTarget from '../display/3d/project/ModelTarget'
import ImageTarget from '../display/3d/project/ImageTarget'

export const data = {

  'mockingjay': {
    backgroundColor: '#630b0c',
    title: 'Mockingjay - Part II',
    client: 'Lionsgate',
    category: 'Interactive poster creator',
    description: 'Mockingjay...',
    sketch: {
      type: ModelTarget,
      url: 'assets/images/projects/helmet.json',
      options: {
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        scale: 80,
        size: 1,
        respondsToMouse: true
      }
    }
  },
  'mission-impossible': {
    backgroundColor: '#c21a1a',
    title: 'Mission Impossible',
    client: 'Paramount pictures',
    category: 'Official website',
    description: 'Mission Impossible... [DESC]',
    sketch: {
      type: ImageTarget,
      url: 'assets/images/projects/griffin.png',
      options: {
        size: 3,
        respondsToMouse: true
      }
    }
  },
  'into-the-storm': {
    backgroundColor: '#006cff',
    title: 'Go #IntoTheStorm',
    client: 'Warner Bros.',
    category: 'Oculus Rift 4D Experience',
    description: 'Into The Storm... [DESC]',
    sketch: {
      type: ImageTarget,
      url: 'assets/images/projects/Mockingjay-logo.png',
      options: {
        size: 2,
        respondsToMouse: true
      }
    }
  },
  'magic-mirror': {
    backgroundColor: '#ffde00',
    title: 'Magic Mirror',
    client: 'Porsche',
    category: 'Live vehicle transformation',
    description: 'Porsche... [DESC]',
    sketch: {
      type: ModelTarget,
      url: 'assets/images/projects/helmet.json',
      options: {
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        scale: 80,
        size: 1,
        respondsToMouse: true
      }
    }
  },
  'caines-quest': {
    backgroundColor: '#756d39',
    title: "Caine's quest",
    client: 'Warner Bros.',
    category: 'First-person WebGL game',
    description: 'Jupiter Ascending... [DESC]',
    sketch: {
      type: ImageTarget,
      url: 'assets/images/projects/griffin.png',
      options: {
        size: 3,
        respondsToMouse: true
      }
    }
  },
  'edge-of-tomorrow': {
    backgroundColor: '#000000',
    title: 'Edge of Tomorrow',
    client: 'Warner Bros.',
    category: 'Motion poster creator',
    description: 'Edge of Tomorrow... [DESC]',
    sketch: {
      type: ImageTarget,
      url: 'assets/images/projects/Mockingjay-logo.png',
      options: {
        size: 2,
        respondsToMouse: true
      }
    }
  }
}
/**
 * [getProject description]
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */
export function getProject (index) {
  var i = 0
  var project = ''

  if (index > Object.keys(data).length) {
    index = 0
  }

  if (index < 0) {
    index = Object.keys(data).length - 1
  }

  Object.keys(data).forEach(function (key) {
    if (index === i) { project = key }
    i++
  })

  return project
}
/**
 * [getIndex description]
 * @param  {[type]} project [description]
 * @return {[type]}         [description]
 */
export function getIndex (project) {

  var i = 0
  var index = 0

  Object.keys(data).forEach(function (key) {
    if (project === key) { index = i }
    i++
  })

  return index
}

