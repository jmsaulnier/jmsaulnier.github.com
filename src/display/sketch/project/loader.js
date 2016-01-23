import Mockingjay from './mockingjay'
import MissionImpossible from './mission-impossible'
import IntoTheStorm from './into-the-storm'
import MagicMirror from './magic-mirror'
import CainesQuest from './caines-quest'
import EdgeOfTomorrow from './edge-of-tomorrow'

export default function loader(project, domElement) {

	let sketch = null

	// Dirty...
    // no dynamic require() with Browserify v1(?) --  available with v2?  https://gist.github.com/substack/5012401
	
	// TODO {PRIORITY} Low [Webpack?]

	switch (project) {
	  case "mockingjay":
	    sketch = new Mockingjay(domElement);
	    break;
	  case "mission-impossible":
	    sketch = new MissionImpossible(domElement);
	    break;
	  case "into-the-storm":
	    sketch = new IntoTheStorm(domElement);
	    break;
	  case "magic-mirror":
	    sketch = new MagicMirror(domElement);
	    break;  
	  case "caines-quest":
	    sketch = new CainesQuest(domElement);
	    break;
	  case "edge-of-tomorrow":
	    sketch = new EdgeOfTomorrow(domElement);
	    break;
    }

    return sketch
}