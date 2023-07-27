import { Component, Input } from '@angular/core';
import { FadeInOut } from '../animations/fadeInOut.animation';

@Component({
  selector: 'app-show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.scss'],
  animations: [FadeInOut(300, 100, true)],
})
export class ShowErrorComponent {
  @Input() error: any;

  clear() {
    this.error = '';
  }
}
