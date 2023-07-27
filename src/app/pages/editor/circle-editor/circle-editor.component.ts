import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { fabric } from 'fabric';
import { BaseEditorComponent } from '../base-editor/base-editor.component';

@Component({
  selector: 'app-image-circle-editor',
  templateUrl: './circle-editor.component.html',
  styleUrls: ['./circle-editor.component.scss'],
})
export class CircleEditorComponent extends BaseEditorComponent {
  circleForm: FormGroup;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.circleForm = this.fb.group({
      radius: [100, Validators.required],
    });

    this.editorService.selectedObject
      .pipe(
        filter(
          (selectedObject: any) =>
            !selectedObject || this.editorService.isCircleObject(selectedObject)
        )
      )
      .subscribe({
        next: (selectedObject: any) => {
          this.selectedObject = selectedObject;
          const shape = this.selectedObject?.get('type') || this.selectedShape;
          this.form.patchValue({
            shape,
          });
          if (this.selectedObject) {
            this.updateProperties();
          }
        },
      });
  }

  updateProperties() {
    this.updateFormProperties();
    const scaleX = this.selectedObject.scaleX || 1;
    this.circleForm.patchValue({
      radius: this.selectedObject.radius * scaleX,
    });
  }

  apply() {
    const { value } = this.form;
    const { radius } = this.circleForm.value;

    if (this.selectedObject) {
      const properties = {
        left: +value.left,
        top: +value.top,
        radius: +radius,
        fill: value.fill || 'transparent',
        stroke: value.strokeColor,
        strokeWidth: +value.strokeWidth,
      };
      this.editorService.UpdateObjectAndCanvas(
        this.canvas,
        this.selectedObject,
        properties
      );
    } else {
      const shape = new fabric.Circle({
        left: value.left,
        top: value.top,
        radius: +radius,
        fill: value.fill || 'transparent',
        stroke: value.strokeColor,
        strokeWidth: +value.strokeWidth,
      });
      this.canvas.add(shape);
    }
  }
}
