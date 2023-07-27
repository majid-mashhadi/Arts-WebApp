import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorService } from '../services/editor.service';
import { ServiceInjector } from 'src/app/library/components/services/injector.service';

@Component({
  selector: 'app-base-editor',
  templateUrl: './base-editor.component.html',
  styleUrls: ['./base-editor.component.scss'],
})
export class BaseEditorComponent {
  @Input() canvas: any;

  get fillColor(): string {
    const { value } = this.form;
    return value.fill;
  }
  set fillColor(color: string) {
    this.form.patchValue({
      fill: color,
    });
  }

  get strokeColor(): string {
    const { value } = this.form;
    return value.fill;
  }
  set strokeColor(color: string) {
    this.form.patchValue({
      strokeColor: color,
    });
  }
  selectedShape: string;
  selectedObject: any;
  form: FormGroup;
  shapeForm: FormGroup;

  fb: FormBuilder;
  editorService: EditorService;

  constructor() {
    this.fb = ServiceInjector.injector.get(FormBuilder);
    this.editorService = ServiceInjector.injector.get(EditorService);
  }
  ngOnInit() {
    this.form = this.fb.group({
      shape: [this.selectedShape, Validators.required],
      left: [100],
      top: [100],
      fill: ['transparent'],
      strokeColor: ['black', Validators.required],
      strokeWidth: [1, [Validators.required]],
    });
  }

  updateFormProperties() {
    this.form.patchValue({
      left: +this.selectedObject.left,
      top: +this.selectedObject.top,
      fill: this.selectedObject.fill,
      strokeColor: this.selectedObject.stroke,
      strokeWidth: +this.selectedObject.strokeWidth,
    });
  }

  onRemoveClick() {
    this.canvas.remove(this.canvas.getActiveObject());
    this.editorService.setObjectItem(null);
  }
}
