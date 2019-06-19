import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Rhino extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.RHINO_RUN_LEFT1;
    speed = Constants.RHINO_STARTING_SPEED;

    constructor(x, y) {
        super(x, y);
    }

    updateAsset() {
        this.assetName = Constants.RHINO_DIRECTION_ASSET[this.direction];
    }

    move() {
        switch(this.direction) {
            case Constants.RHINO_DIRECTION.LEFT_DOWN:
                this.moveRhinoLeftDown();
                break;
            case Constants.RHINO_DIRECTION.DEFAULT:
                this.moveRhinoDown();
                break;
            case Constants.RHINO_DIRECTION.RIGHT_DOWN:
                this.moveRhinoRightDown();
                break;
            case Constants.RHINO_DIRECTION.JUMP_ONE:
                this.moveRhinoDown();
                break;
        }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    };

    moveRhinoLeftDown() {
        this.x -= this.speed;
        this.y += this.speed;
    };

    moveRhinoDown() { 
        this.y += this.speed;
    }

    moveRhinoRightDown() {
        this.x += this.speed;
        this.y += this.speed;
    }

    turnRhinoLeft() {
        if(this.direction === Constants.RHINO_DIRECTION.LEFT) {
            this.moveSkierLeft();
        } else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRhinoRight() {
        if(this.direction === Constants.RHINO_DIRECTION.RIGHT) {
            this.moveSkierRight();
        } else {
            this.setDirection(this.direction + 1);
        }  
    }

    turnRhinoDown() {
        this.setDirection(Constants.RHINO_DIRECTION.DEFAULT);
    }

}