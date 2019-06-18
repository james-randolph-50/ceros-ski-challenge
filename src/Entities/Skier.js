import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        console.log(`updating direction: ${direction}`);
        this.direction = direction;
        this.updateAsset();
    }

    updateAsset() {
        console.log(`updating asset to direction: ${this.direction}`);
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

  

    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
            //  case Constants.SKIER_DIRECTIONS.JUMP_ONE:
            //      this.jump();
            //      break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() { 
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    turnLeft() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        } else if (this.direction === Constants.SKIER_DIRECTIONS.JUMP_ONE) {
            this.setDirection(this.direction - 4);
        } else if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
            this.setDirection(this.direction + 1);
        }
        else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        } else if (this.direction === Constants.SKIER_DIRECTIONS.JUMP_ONE) {
            this.setDirection(this.direction - 2);
        }
        else {
            this.setDirection(this.direction + 1);
        }  
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    jump() {
        console.log("wut")
        for (var i = 0; i < 60; i++) {
            console.log(i);
            setTimeout(this.setDirection(Constants.SKIER_DIRECTIONS.JUMP_ONE, 2000));
        }
        this.turnDown();
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        console.log(`asset name: ${this.assetName}`)
        const asset = assetManager.getAsset(this.assetName);
        console.log(`asset: ${asset}`)
        //console.log(skierBounds);
        console.log(`asset width: ${asset.width}, height: ${asset.height}`);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
            );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();
            console.log(`obstacle width: ${obstacleAsset.width}, height: ${obstacleAsset.height}`);
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );

            return intersectTwoRects(skierBounds, obstacleBounds);
        });

        if(collision &&  this.setDirection(Constants.SKIER_DIRECTIONS.JUMP_ONE) != true) {
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);

        }
    };
     
}