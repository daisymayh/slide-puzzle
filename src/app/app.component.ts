import { Component, ViewChild, ElementRef } from '@angular/core';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'assignment';
  tiles = {
    0: {
      tileNumber: 1,
      position: 1,
      top: 0,
      left: 0,
    },
    1: {
      tileNumber: 2,
      position: 2,
      top: 0,
      left: 100 * 1,
    },
    2: {
      tileNumber: 3,
      position: 3,
      top: 0,
      left: 100 * 2,
    },
    3: {
      tileNumber: 4,
      position: 4,
      top: 0,
      left: 100 * 3,
    },
    4: {
      tileNumber: 5,
      position: 5,
      top: 100,
      left: 0,
    },
    5: {
      tileNumber: 6,
      position: 6,
      top: 100,
      left: 100 * 1,
    },
    6: {
      tileNumber: 7,
      position: 7,
      top: 100,
      left: 100 * 2,
    },
    7: {
      tileNumber: 8,
      position: 8,
      top:  100,
      left: 100 * 3,
    },
    8: {
      tileNumber: 9,
      position: 9,
      top: 100 * 2,
      left: 0,
    },
    9: {
      tileNumber: 10,
      position: 10,
      top: 100 * 2,
      left: 100 ,
    },
    10: {
      tileNumber: 11,
      position: 11,
      top: 100 * 2,
      left: 100 * 2,
    },
    11: {
      tileNumber: 12,
      position: 12,
      top: 100 * 2,
      left: 100 * 3,
    },
    12: {
      tileNumber: 13,
      position: 13,
      top: 100 * 3,
      left: 0,
    },
    13: {
      tileNumber: 14,
      position: 14,
      top: 100 * 3,
      left: 100,
    },
    14: {
      tileNumber: 15,
      position: 15,
      top: 100 * 3,
      left: 100 * 2,
    },
    15: {
      tileNumber: 16,
      position: 16,
      top: 300,
      left: 300,
    }
  }

  emptyTile = {
      tileNumber: 16,
      position: 16,
      top: 300,
      left: 300,
  }

  piece: any = (<HTMLElement>this.el.nativeElement).getElementsByClassName("puzzle-piece");
  locatedTile = 0;
  lastShuffled = 0;

  constructor(
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.resetPositions();
  }


  movementMap(position) {
    switch(position) {
      case 1: 
        return [2, 5];
        break;
      case 2:
        return [1, 3, 6];
        break;
      case 3: 
        return [2, 4, 7];
        break;
      case 4:
        return [3, 8];
        break;
      case 5: 
        return [1, 6, 9];
        break;
      case 6:
        return [2, 5, 7, 10];
        break;
      case 7: 
        return [3, 6, 8, 11];
        break;
      case 8:
        return [4, 7, 12];
        break;
      case 9: 
        return [5, 10, 13];
        break;
      case 10:
        return [6, 9, 11, 14];
        break;
      case 11:
        return [7, 10, 12, 15];
        break;
      case 12: 
        return [8, 11, 16];
        break;
      case 13:
        return [9, 14];
        break;
      case 14: 
        return [10, 13, 15];
        break;
      case 15:
        return [11, 14, 16];
        break;
      case 16:
        return [12, 15];
        break;
    }
  }

  showSolution() {
    if (this.emptyTile.position !== 16) return false;
    let i = 0;
    do {
      return true;
    } 
    while(this.tiles[i].tileNumber !== this.tiles[i].position) {
      i++;
    }
  }
  
  resetPositions() {
    for(let key in this.tiles)  {
      let number = this.tiles[key].tileNumber - 1;
      let xMovement = (this.tiles[number].left);
      let yMovement = (this.tiles[number].top);
      if (number < 15){
        this.piece[number].style.webkitTransform = "translateX(" + xMovement + "px) " + "translateY(" + yMovement + "px)"
      }
    }
  }
    
  movePiece(pieceNumber: number) {
    if (!this.isPieceMovable(pieceNumber)) {
      console.log("Tile " + pieceNumber + " can't be moved.");
      return;
    }

    //swap piece
    let emptyTop = this.emptyTile.top;
    let emptyLeft =this.emptyTile.left;
    let emptyPosition = this.emptyTile.position;

    this.emptyTile.top = this.tiles[pieceNumber].top;
    this.emptyTile.left = this.tiles[pieceNumber].left;
    this.emptyTile.position = this.tiles[pieceNumber].position;

    let xMovement = (emptyLeft);
    let yMovement = (emptyTop);

    this.piece[pieceNumber].style.webkitTransform = "translateX(" + xMovement + "px) " + "translateY(" + yMovement + "px)"

    this.tiles[pieceNumber].top = emptyTop;
    this.tiles[pieceNumber].left = emptyLeft;
    this.tiles[pieceNumber].position = emptyPosition;  

    this.showSolution();
  }

  isPieceMovable(pieceNumber: number) {
    let selectedPiece = this.tiles[pieceNumber];
    let movablePiece = this.movementMap(this.emptyTile.position);

    if (movablePiece.includes(selectedPiece.position)) {
      return true;
    } else {
      return false;
    }
  }

  
  shuffle() {
    let shuffleTimeouts = [];
    let shuffleDelay = 200;
    this.shuffleLoop();

    let shuffleCounter = 0;
    while (shuffleCounter < 20) {
      shuffleDelay += 200;
      // shuffleTimeouts.push(setTimeout(this.shuffleLoop, shuffleDelay));
      this.shuffleLoop();
      shuffleCounter++;
    }
  }

  shuffleLoop() {
    let shuffleTiles = this.movementMap(this.emptyTile.position);
    let tilePosition = shuffleTiles[Math.floor(Math.floor(Math.random()*shuffleTiles.length))];    

    for(let i = 0; i < 15; i++) {
      if (this.tiles[i].position === tilePosition) {
        var locatedTileNumber = this.tiles[i].tileNumber-1;
        this.locatedTile = this.tiles[locatedTileNumber-1].tileNumber;      
      }
    }
    
    if (this.lastShuffled != this.locatedTile) {
      this.movePiece(this.locatedTile);
      this.lastShuffled = this.locatedTile;
    } else {
      this.shuffleLoop();
    }
  }
}
