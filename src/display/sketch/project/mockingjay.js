import PIXI from 'pixi.js';

export default class Mockingjay {

  constructor(canvas){

    this.Renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
    canvas.appendChild(this.Renderer.view);

    var stage = new PIXI.Container();
    
    var texture = PIXI.Texture.fromImage('./assets/images/projects/mockingjay/bunny.png');
    var bunny = new PIXI.Sprite(texture);
    bunny.position.x = 200;
    bunny.position.y = 150;

    stage.addChild(bunny);

    this.Renderer.render(stage);
   } 

   destroy() {

    console.log('mockingjay destroy')

    this.Renderer.destroy();
   }
}