import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'app-canvas-setting',
  templateUrl: './canvas-setting.component.html',
  styleUrls: ['./canvas-setting.component.scss'],
})
export class CanvasSettingComponent {
  @Input() canvas: any;
  get backgroundColor(): string {
    const { value } = this.form;
    return value.backgroundColor;
  }
  set backgroundColor(color: string) {
    this.form.patchValue({
      backgroundColor: color,
    });
  }

  form: FormGroup;
  /**
   *
   */
  constructor(private fb: FormBuilder, private editorService: EditorService) {}
  ngOnInit() {
    const { width, height, backgroundColor } = this.canvas;
    this.form = this.fb.group({
      width: [
        width || 400,
        [Validators.required, Validators.min(100), Validators.max(1200)],
      ],
      height: [
        height || 600,
        [Validators.required, Validators.min(100), Validators.max(1200)],
      ],
      backgroundColor: [backgroundColor || 'transparent'],
    });
    this.editorService.selectedArt.subscribe({
      next: (art: any) => {
        this.selectArt(art);
      },
    });
  }
  onApplyClick() {
    const { value } = this.form;
    this.canvas.setWidth(+value.width || this.canvas.width);
    this.canvas.setHeight(+value.height || this.canvas.height);
    this.canvas.setBackgroundColor(
      value.backgroundColor || this.canvas.backgroundColor
    );
    this.canvas.renderAll();
  }
  selectArt(art: any) {
    if (art) {
      this.form.patchValue({
        width: art.canvasWidth,
        height: art.canvasHeight,
        backgroundColor: this.canvas.backgroundColor,
      });
    }
  }
}
