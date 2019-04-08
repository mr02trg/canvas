import { Component, OnInit, HostListener } from '@angular/core';
import { Circle } from '../shape/circle';

@Component({
  selector: 'app-gravity',
  templateUrl: './gravity.component.html',
  styleUrls: ['./gravity.component.scss']
})
export class GravityComponent implements OnInit {

  constructor() { }

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  circle: Circle;

  @HostListener('click', ['$event.target'])
  onClick() {
    this.initCircle();
  }

  ngOnInit() {
    this.initCanvas();
    this.initCircle();

    this.animate();
  }

  initCanvas() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = document.documentElement.clientHeight;
    this.context = this.canvas.getContext("2d");
  }

  initCircle() {
    this.circle = new Circle(50, 50, 30, 'black', 10, 2);
  }

  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.circle.gravityUpdate(this.canvas);

    window.requestAnimationFrame(() => this.animate());
  }


}
