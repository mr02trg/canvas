import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor() { }

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;


  ngOnInit() {
    this.initCanvas();

    // this.first_draw();

    // this.initCircles();
    // this.animate_circle();
  }



  first_draw() {
    // rect
    this.context.fillStyle = 'lightgrey';
    this.context.fillRect(10, 10, 100, 100);
    this.context.fillRect(300, 100, 100, 100);
    this.context.fillRect(100, 200, 100, 100);


    // line
    this.context.beginPath();
    this.context.moveTo(40, 500);
    this.context.lineTo(300, 100);
    this.context.lineTo(400, 500);
    this.context.lineTo(40, 500);
    this.context.strokeStyle = 'red';
    this.context.stroke();


    // circle
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.context.beginPath();
      this.context.arc(x, y, 50, 0, Math.PI * 2, false);
      this.context.strokeStyle = this.getRandomColor();
      this.context.stroke();
    }
  }

  initCanvas() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = document.documentElement.clientHeight;
    this.context = this.canvas.getContext("2d");
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
