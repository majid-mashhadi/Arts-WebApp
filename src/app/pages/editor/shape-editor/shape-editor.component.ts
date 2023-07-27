import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { EditorService } from '../services/editor.service';
import { SelectItem } from 'src/app/library/components/select/select-item.interface';
import { ShapeType } from '../interfaces/editor-types.type';
import { fabric } from 'fabric';

@Component({
  selector: 'app-image-shape-editor',
  templateUrl: './shape-editor.component.html',
  styleUrls: ['./shape-editor.component.scss'],
})
export class ShapeEditorComponent {
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

  selectedObject: any;
  circleForm: FormGroup;
  rectangleForm: FormGroup;
  form: FormGroup;

  shapeItems: SelectItem[] = this.editorService.shapeItems;
  selectedShape: ShapeType = 'rect';
  selectedForm: FormGroup;
  constructor(private fb: FormBuilder, private editorService: EditorService) {}

  ngOnInit() {
    this.form = this.fb.group({
      shape: [this.selectedShape, Validators.required],
      left: [100],
      top: [100],
      fill: ['transparent'],
      strokeColor: ['black', Validators.required],
      strokeWidth: [1, [Validators.required]],
    });

    this.circleForm = this.fb.group({
      radius: [100, Validators.required],
    });

    this.rectangleForm = this.fb.group({
      height: [100, [Validators.min(1), Validators.max(600)]],
      width: [100, [Validators.min(1), Validators.max(600)]],
    });

    this.editorService.selectedObject
      .pipe(
        filter(
          (selectedObject: any) =>
            !selectedObject || this.editorService.isShapeObject(selectedObject)
        )
      )
      .subscribe({
        next: (selectedObject: any) => {
          this.selectedObject = selectedObject;
          const shape = this.selectedObject?.get('type') || this.selectedShape;
          console.log(shape);
          this.form.patchValue({
            shape,
          });
          if (this.selectedObject) {
            this.updateProperties();
          }
        },
      });
    // const height = this.form.get('height');
    // const width = this.form.get('width');
    // const radius = this.form.get('radius');

    this.form.get('shape')?.valueChanges.subscribe({
      next: (type: string) => {
        this.setSelectedForm(type as ShapeType);
        //     radius?.clearValidators();
        //     height?.clearValidators();
        //     width?.clearValidators();
        //     this.selectedShape = type as ShapeType;
        //     if (type === 'circle') {
        //       radius?.setValidators([
        //         Validators.required,
        //         Validators.min(1),
        //         Validators.max(Math.min(this.canvas.height, this.canvas.width) / 2),
        //       ]);
        //       radius?.updateValueAndValidity();
        //     } else if (type === 'rectangle') {
        //       height?.setValidators([
        //         Validators.required,
        //         Validators.min(1),
        //         Validators.max(this.canvas.height),
        //       ]);
        //       width?.setValidators([
        //         Validators.required,
        //         Validators.min(1),
        //         Validators.max(this.canvas.width),
        //       ]);
        //       height?.updateValueAndValidity();
        //       width?.updateValueAndValidity();
        //     }
      },
    });
  }

  updateProperties() {
    this.form.patchValue({
      left: +this.selectedObject.left,
      top: +this.selectedObject.top,
      fill: this.selectedObject.fill,
      strokeColor: this.selectedObject.stroke,
      strokeWidth: +this.selectedObject.strokeWidth,
    });
    const { shape } = this.form.value;
    if (shape === 'circle') {
      const scaleX = this.selectedObject.scaleX || 1;
      this.circleForm.patchValue({
        radius: this.selectedObject.radius * scaleX,
      });
    }
    if (shape === 'rect') {
      this.rectangleForm.patchValue({
        width: +this.selectedObject.width,
        height: +this.selectedObject.height,
      });
    }
  }

  setSelectedForm(type: ShapeType) {
    this.selectedShape = type;
    if (type === 'circle') {
      this.selectedForm = this.circleForm;
    }
    if (type === 'rect') {
      this.selectedForm = this.rectangleForm;
    }
  }

  isFormValid() {
    return this.form.valid && this.selectedForm.valid;
  }

  apply() {
    if (this.selectedShape === 'circle') {
      this.updateCircle();
    }
    if (this.selectedShape === 'rect') {
      this.updateRectangle();
    }
  }

  updateCircle() {
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

  updateRectangle() {
    const { value } = this.form;
    const { value: rectangle } = this.rectangleForm;
    console.log(rectangle);

    if (this.selectedObject) {
      const properties = {
        left: +value.left,
        top: +value.top,
        width: +rectangle.width,
        height: +rectangle.height,
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
        width: +rectangle.width,
        height: +rectangle.height,
        fill: value.fill || 'transparent',
        stroke: value.strokeColor,
        strokeWidth: +value.strokeWidth,
      });
      this.canvas.add(shape);
    }
  }

  onRemoveClick() {
    this.canvas.remove(this.canvas.getActiveObject());
    this.editorService.setObjectItem(null);
  }
}
