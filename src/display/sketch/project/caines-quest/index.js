export default class CainesQuest  {

  constructor(domElement) {
  	
  	this.domElement = domElement
  	this.isLoaded = false;
  }

  load() {

    console.log('caines-quest -- load');

    this.isLoaded = true;
  }

  unload() {

  	this.isLoaded = false;	
    console.log('caines-quest -- unload');
  }
}

