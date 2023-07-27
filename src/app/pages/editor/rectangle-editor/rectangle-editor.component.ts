import { Component } from '@angular/core';
import { BaseEditorComponent } from '../base-editor/base-editor.component';
import { fabric } from 'fabric';
import { Validators } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-image-rectangle-editor',
  templateUrl: './rectangle-editor.component.html',
  styleUrls: ['./rectangle-editor.component.scss'],
})
export class RectangleEditorComponent extends BaseEditorComponent {
  override ngOnInit(): void {
    super.ngOnInit();
    this.shapeForm = this.fb.group({
      height: [100, [Validators.min(1), Validators.max(600)]],
      width: [100, [Validators.min(1), Validators.max(600)]],
    });

    this.editorService.selectedObject
      .pipe(
        filter(
          (selectedObject: any) =>
            !selectedObject || this.editorService.isRectObject(selectedObject)
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
    this.shapeForm.patchValue({
      width: +this.selectedObject.width,
      height: +this.selectedObject.height,
    });
  }

  apply() {
    const { value } = this.form;
    const { value: shapeValue } = this.shapeForm;

    if (this.selectedObject) {
      const properties = {
        left: +value.left,
        top: +value.top,
        width: +shapeValue.width,
        height: +shapeValue.height,
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
      const shape = new fabric.Rect({
        left: value.left,
        top: value.top,
        width: +shapeValue.width,
        height: +shapeValue.height,
        fill: value.fill || 'transparent',
        stroke: value.strokeColor,
        strokeWidth: +value.strokeWidth,
      });
      this.canvas.add(shape);
    }
  }
}
