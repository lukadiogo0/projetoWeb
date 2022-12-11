import {GAME_DURATION} from '../../constants/game.js';

export class StatusBar{
  constructor(fighters){
    this.image = document.querySelector('img[alt="overlay"]');

    this.time = GAME_DURATION;
    this.timeTimer = 0;
    this.fighters = fighters;
    this.result = -2;
    this.frames = new Map([
      ['health-bar', [16,18,145,11]],

      ['ko-white', [161,16,32,14]],

      ['time-0', [16,32,14,16]],
      ['time-1', [32,32,14,16]],
      ['time-2', [48,32,14,16]],
      ['time-3', [64,32,14,16]],
      ['time-4', [80,32,14,16]],
      ['time-5', [96,32,14,16]],
      ['time-6', [112,32,14,16]],
      ['time-7', [128,32,14,16]],
      ['time-8', [144,32,14,16]],
      ['time-9', [160,32,14,16]],

      ['fight', [16,168,63,18]],
      ['time-over', [352,112,65,30]],
      ['draw-game', [427,114,59,26]],
      ['number-1', [29, 101,10,10]],
      ['number-2', [41,101,10,10]],
      ['letter-p',[17,125,11,10]],
      ['letter-w', [101,125,11,10]],
      ['letter-i', [127,113,5,10]],
      ['letter-n', [185, 113, 11,10]],
      ['letter-k', [149,113,10,10]],
      ['letter-a', [29,113,11,10]],
      ['letter-r', [41,125,11,10]],
      ['letter-u', [77,125,10,10]],
      ['letter-t', [65,125,10,10]],
      ['letter-o', [197,113,10,10]],
      ['letter-s', [53,125,10,10]],
      ['letter-h', [113,113,10,10]],
      
    ]);
  }

  drawFrame(context,frameKey, x, y, direction = 1 ){
    const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);

    context.scale(direction, 1);
    context.drawImage(
      this.image,
      sourceX, sourceY, sourceWidth, sourceHeight,
      x * direction, y, sourceWidth, sourceHeight,
    );
    context.setTransform(1, 0, 0, 1, 0, 0)
  }

  updateTime(time){
    if(time.previous > this.timeTimer + 664){
      if(this.time >  0) {
        this.time -= 1
      }
      this.timeTimer = time.previous
      
    }
  }

  update(time){
    this.updateTime(time);
  }

  drawHealthBars(context){
    this.drawFrame(context,'health-bar',31,20);
    this.drawFrame(context,'ko-white',176,18);
    this.drawFrame(context,'health-bar',353 ,20 ,-1);
  }

  drawTime(context){
    if(this.time > 0){
      const timeString = String(this.time).padStart(2, '00');
      this.drawFrame(context, `time-${timeString.charAt(0)}`, 178,33);
      this.drawFrame(context, `time-${timeString.charAt(1)}`, 194,33);
    }
  }

  drawResult(context){
    if(this.result === -1){
      this.drawFrame(context, `draw-game`, 163, 107)
    }
    else if(this.result === 0){
      this.drawFrame(context, `letter-p`, 163, 107);
      this.drawFrame(context, `number-1`, 173,107);
      this.drawFrame(context, `letter-w`, 195, 107);
      this.drawFrame(context, `letter-i`, 207, 107);
      this.drawFrame(context, `letter-n`, 214, 107);
    }else{
      this.drawFrame(context, `letter-p`, 163, 107);
      this.drawFrame(context, `number-2`, 175,107);
      this.drawFrame(context, `letter-w`, 195, 107);
      this.drawFrame(context, `letter-i`, 207, 107);
      this.drawFrame(context, `letter-n`, 214, 107);
    }
  }
  
  draw(context){
    this.drawHealthBars(context);
    this.drawTime(context);
    if(this.time <= 0){
      this.drawFrame(context, `time-over`, 161, 33)
    }

    if(this.time >= GAME_DURATION - 1){
      this.drawFrame(context, `fight`, 163, 106)
    }

    if (this.result != -2){
      this.drawResult(context)
    }
  }

  changeGameResult(playerId){
    this.result = playerId
  }
}