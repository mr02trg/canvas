import { Component, OnInit, HostListener } from '@angular/core';
import { Circle } from '../shape/circle';
import { IPosition } from '../models/IPosition';
import { fromEvent } from 'rxjs';
import { CollisionService } from './collision.service';

@Component({
  selector: 'app-collision',
  templateUrl: './collision.component.html',
  styleUrls: ['./collision.component.scss']
})
export class CollisionComponent implements OnInit {

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  circle1: Circle;
  circle2: Circle;

  mousePosition: IPosition = {
    x: 0,
    y: 0
  };

  @HostListener('click', ['$event.target'])
  onClick() {
    this.initCircle();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mousePosition.x = event.clientX;
    this.mousePosition.y = event.clientY;
  }

  /**
   *
   */
  constructor(
    private service: CollisionService
  ) {}

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
    this.circle1 = new Circle(this.canvas.width/2, 
                              this.canvas.height/2, 
                              50, 'black', 7, 2);
    this.circle2 = new Circle(200, 200, 20, 'red', 5, 1);
  }

  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.circle1.draw(this.canvas);
    this.circle2.setPos(this.mousePosition, this.canvas);

    if (this.service
            .getDistance( this.circle1.getPos(),
                          this.circle2.getPos()) 
              <= (this.circle1.getRadius() + this.circle2.getRadius()) ) {

      console.log('collision');
    }

    window.requestAnimationFrame(() => this.animate());
  }
}
