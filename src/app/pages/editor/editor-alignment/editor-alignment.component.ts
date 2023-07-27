import { Component, Input } from '@angular/core';
import { EditorService } from '../services/editor.service';
import { BaseComponent } from 'src/app/library/components/base-component/base-component.component';
import { ICanvasSize } from '../interfaces/canvas-config.interface';

@Component({
  selector: 'app-editor-alignment-control',
  templateUrl: './editor-alignment.component.html',
  styleUrls: ['./editor-alignment.component.scss'],
})
export class EditorAlignmentComponent {
  selectedObject: any;
  @Input() canvas: any;
  width: 0;
  height: 0;

  /**
   *
   */
  constructor(private editorService: EditorService) {}
  ngOnInit() {
    this.editorService.selectedObject.subscribe({
      next: (newObject: any) => {
        this.selectedObject = newObject;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
      },
    });
  }
  sendToBack() {
    if (this.selectedObject) {
      this.selectedObject.sendToBack();
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
      // this.editorService.setObjectItem(null);
    }
  }

  bringToFront() {
    if (this.selectedObject) {
      this.selectedObject.bringToFront();
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
      // this.editorService.setObjectItem(null);
    }
  }

  alignObjectVertically(align: string) {
    if (!this.selectedObject) return;
    if (align === 'start') {
      this.selectedObject.top = 0;
    }
    if (align === 'center') {
      this.selectedObject.top = (this.height - this.selectedObject.height!) / 2;
    }
    if (align === 'end') {
      this.selectedObject.top = this.height - this.selectedObject.height!;
    }
    this.canvas.renderAll();
  }
  alignObjectHorizontaly(align: string) {
    if (!this.selectedObject) return;
    if (align === 'start') {
      this.selectedObject.left = 0;
    }
    if (align === 'center') {
      this.selectedObject.left = (this.width - this.selectedObject.width!) / 2;
    }
    if (align === 'end') {
      this.selectedObject.left = this.width - this.selectedObject.width!;
    }
    this.canvas.renderAll();
  }
  horizontalMove(unit: number) {
    if (!this.selectedObject) return;
    this.selectedObject.left = Math.max(0, this.selectedObject.left + unit);
    const width = this.selectedObject.width || 0;
    if (this.selectedObject.left + width > this.width) {
      this.selectedObject.left = this.width - width;
    }
    this.canvas.renderAll();
  }
  verticalMove(unit: number) {
    if (!this.selectedObject) return;
    this.selectedObject.top = Math.max(0, this.selectedObject.top + unit);
    const height = this.selectedObject.height || 0;
    if (this.selectedObject.top + height > this.height) {
      this.selectedObject.top = this.height - height;
    }
    this.canvas.renderAll();
  }
}
