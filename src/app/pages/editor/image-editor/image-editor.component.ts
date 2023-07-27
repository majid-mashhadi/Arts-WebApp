import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorService } from '../services/editor.service';
import { ImageItem } from '../interfaces/image-object.class';
import { filter } from 'rxjs';
import { fabric } from 'fabric';
import { BaseEditorComponent } from '../base-editor/base-editor.component';

@Component({
  selector: 'app-image-object-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss'],
})
export class ImageEditorComponent extends BaseEditorComponent {
  fileName: string = '';
  src: string;
  defaultWidth: number = 100;
  defaultHeight: number = 100;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.shapeForm = this.fb.group({
      src: [''],
      height: [100, [Validators.min(1), Validators.max(600)]],
      width: [100, [Validators.min(1), Validators.max(600)]],
    });
    this.editorService.selectedObject
      .pipe(
        filter((item: any) => !item || this.editorService.isImageItem(item))
      )
      .subscribe({
        next: (selectedObject: any) => {
          this.selectedObject = selectedObject;
          this.shapeForm.patchValue({
            src: this.selectedObject?.src,
            width: this.selectedObject?.width || this.defaultWidth,
            height: this.selectedObject?.height || this.defaultHeight,
          });
          this.form.patchValue({
            left: this.selectedObject?.left,
            top: this.selectedObject?.top,
          });
        },
      });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = reader.result;
        this.shapeForm.patchValue({
          src: imageSrc,
        });
        this.insertImage(imageSrc?.toString());
      };
      reader.readAsDataURL(file);
      this.fileName = file.name;
    }
  }
  insertImage(src: string | undefined) {
    if (!src) return;
    const imgElement = new Image();
    imgElement.onload = () => {
      const img = new fabric.Image(imgElement, {
        left: 250,
        top: 250,
        opacity: 1,
      });
      img.scaleToHeight(100);
      img.scaleToWidth(100);
      this.canvas.add(img);
    };
    imgElement.src = src;
  }

  apply() {
    const { value } = this.form;
    const { value: shapeValue } = this.shapeForm;
    if (this.selectedObject) {
      const properties = {
        left: +value.left,
        top: +value.top,
        width: +shapeValue.width || this.defaultWidth,
        height: +shapeValue.height || this.defaultHeight,
      };
      this.editorService.UpdateObjectAndCanvas(
        this.canvas,
        this.selectedObject,
        properties
      );
    }
  }
}
