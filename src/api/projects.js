export const data = {

  'mockingjay': {
    backgroundColor: '#c3cca6',
    title: 'Mockingjay - Part II',
    client: 'Lionsgate',
    category: 'Interactive poster creator',
    description: 'Mockingjay...'
  },
  'mission-impossible': {
    backgroundColor: '#00ff00',
    title: 'Mission Impossible',
    client: 'Paramount pictures',
    category: 'Official website',
    description: 'Mission Impossible... [DESC]'
  },
  'into-the-storm': {
    backgroundColor: '#0000ff',
    title: 'Go #IntoTheStorm',
    client: 'Warner Bros.',
    category: 'Oculus Rift 4D Experience',
    description: 'Into The Storm... [DESC]'
  },
  'magic-mirror': {
    backgroundColor: '#ff00ff',
    title: 'Magic Mirror',
    client: 'Porsche',
    category: 'Live vehicle transformation',
    description: 'Porsche... [DESC]'
  },
  'caines-quest': {
    backgroundColor: '#ffff00',
    title: "Caine's quest",
    client: 'Warner Bros.',
    category: 'First-person WebGL game',
    description: 'Jupiter Ascending... [DESC]'
  },
  'edge-of-tomorrow': {
    backgroundColor: '#000000',
    title: 'Edge of Tomorrow',
    client: 'Warner Bros.',
    category: 'Motion poster creator',
    description: 'Edge of Tomorrow... [DESC]'
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

