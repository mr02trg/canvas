import { IPosition } from '../models/IPosition';
import { UpperCasePipe } from '@angular/common';

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

    draw(canvas: HTMLCanvasElement) {
        const context = canvas.getContext("2d");
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        context.strokeStyle = this.color;
        context.stroke();
        context.fill();
    }

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
