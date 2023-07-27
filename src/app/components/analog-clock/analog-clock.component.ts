import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss'],
})
export class AnalogClockComponent implements OnInit {
  @ViewChild('sec', { static: false }) sec: ElementRef;
  @ViewChild('min', { static: false }) min: ElementRef;
  @ViewChild('hour', { static: false }) hour: ElementRef;

  @Input()
  top: number = 0;
  @Input()
  left: number = 0;
  borderRadius: string = '50%';
  @Input() set shape(val: ClockType) {
    this.borderRadius = val === 'circle' ? '50%' : '0%';
  }

  hours: any[] = [];
  currentHour: string = '';
  currentMinute: string = '';

  constructor() {}

  ngOnInit(): void {
    for (let i = 1; i <= 12; i++) {
      this.hours.push(i);
    }
    this.updateClock();
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  fixLen(val: string) {
    return val.length < 2 ? '0' + val : val;
  }

  updateClock() {
    const date = new Date();

    const second = date.getSeconds();
    const minute = date.getMinutes();
    const hour = date.getHours();

    this.currentHour = this.fixLen(hour.toString());
    this.currentMinute = this.fixLen(minute.toString());

    const hourRadian = (hour * 30 + (minute * 1.0) / 2) % 360;
    const minRadian = minute * 6 + (second * 1.0) / 10;
    const secRadian = second * 6;
    if (this.sec && this.min && this.hour) {
      this.sec.nativeElement.style.transform = `rotate(${secRadian}deg)`;
      this.min.nativeElement.style.transform = `rotate(${minRadian}deg)`;
      this.hour.nativeElement.style.transform = `rotate(${hourRadian}deg)`;
    }
  }
}

export type ClockType = 'circle' | 'rectangle';
