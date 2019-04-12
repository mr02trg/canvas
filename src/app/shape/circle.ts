
// circle class

import { IPosition } from '../models/IPosition';

export class Circle {
    private x = 0;
    private y = 0;
    private r = 0;
    private dx = 0;
    private dy = 0;
    private color = '';

    static readonly UPPER_LIMIT = 80;
    static readonly LOWER_LIMIT = 30;

    constructor(x: number, y: number, 
                r: number, color: string,
                dx: number, dy: number) {
        this.x = x;
        this.y = y;  
        this.r = r;
        this.color = color; 
        this.dx = dx; 
        this.dy = dy;    
    }

    getPos(): IPosition {
        const pos: IPosition = {
            x: this.x,
            y: this.y
        }
        return pos;
    }

    getRadius(): number {
        return this.r;
    }

    setPos(newPos: IPosition, canvas: HTMLCanvasElement) {
        this.x = newPos.x;
        this.y = newPos.y

        this.draw(canvas);
    }

    draw(canvas: HTMLCanvasElement) {
        const context = canvas.getContext("2d");
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        context.strokeStyle = this.color;
        context.stroke();
        context.fillStyle = this.color;
        context.fill();
    }

    // linear motion (no acceleration) effect 
    // bounce off the screen
    update(canvas: HTMLCanvasElement) {
        const width = canvas.width;
        const height = canvas.height;
        if (this.x + this.r > width || this.x - this.r < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.r > height || this.y - this.r < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw(canvas);
    }

    // simulate gravitational effect
    gravityUpdate(canvas: HTMLCanvasElement) {
        // gravity of 0.5
        const gravity = 0.5;

        // friction - amount of energy loss in speed everytime ball touchs ground
        const friction = 0.95;

        if (this.y + this.r >= canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            // acceleration
            // velocity is increment/ accerlerate by gravity everytime the frame refresh
            this.dy += gravity;
        }

        if (this.x + this.r >= canvas.width || this.x - this.r <= 0) {
            this.dx = -this.dx;
        }

        this.y += this.dy;
        this.x += this.dx;
        this.draw(canvas);

    }

    grow(n: number) {
        if (this.r < Circle.UPPER_LIMIT) {
            this.r += n;
        }
    }

    shrink(n: number) {
        if (this.r > Circle.LOWER_LIMIT) {
            this.r -= n;
        }
    }
}
