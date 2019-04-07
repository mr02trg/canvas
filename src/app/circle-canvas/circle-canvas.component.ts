import { Component, OnInit, HostListener } from '@angular/core';
import { forEach } from 'lodash';

import { IPosition } from '../models/IPosition';
import { Circle } from '../shape/circle';

@Component({
  selector: 'app-circle-canvas',
  templateUrl: './circle-canvas.component.html',
  styleUrls: ['./circle-canvas.component.scss']
})
export class CircleCanvasComponent implements OnInit {

  constructor() { }

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  circleArray: Circle[] = [];

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    forEach(this.circleArray, c => {
      const currPos: IPosition = c.getPos();
      if (Math.abs(currPos.x - e.clientX) <= 60 && Math.abs(currPos.y - e.clientY) <= 60) {
        c.grow(1);
      } else {
        c.shrink(1);
      }
    })
  }

  ngOnInit() {
    this.initCanvas();
    this.initCircles();
    this.animate_circle();
  }

  initCanvas() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = document.documentElement.clientHeight;
    this.context = this.canvas.getContext("2d");
    
  }

  initCircles() {
    for(let i = 0; i < 100; i++) {
      const r = Circle.LOWER_LIMIT;
      const x = Math.random() * (this.canvas.width - r*2) + r;
      const y = Math.random() * (this.canvas.height - r*2) + r;
      const color = 'white';
      const dx = Math.random();
      const dy = Math.random();

      const circle = new Circle(x, y, r, color, dx, dy );
      this.circleArray.push(circle);
    }
  }

  animate_circle() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    forEach(this.circleArray, x => x.update(this.canvas));

    window.requestAnimationFrame(() => this.animate_circle());
  }

  getRandomColor() {
    const text = "0123456789ABCDEF";
    let color = "#";

    for(let i  = 0; i < 6; i++) {
      color += text[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
