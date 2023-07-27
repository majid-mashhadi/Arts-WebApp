import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorService } from '../services/editor.service';
import { fabric } from 'fabric';
import { filter } from 'rxjs';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent {
  @Input() canvas: any;

  get textColor(): string {
    const { value } = this.form;
    return value.color;
  }
  set textColor(color: string) {
    this.form.patchValue({
      color,
    });
  }
  get backgroundColor(): string {
    const { value } = this.form;
    return value.backgroundColor;
  }
  set backgroundColor(color: string) {
    this.form.patchValue({
      backgroundColor: color,
    });
  }

  selectedObject: any;
  form: FormGroup;

  constructor(private fb: FormBuilder, private editorService: EditorService) {}

  ngOnInit() {
    this.form = this.fb.group({
      text: ['', Validators.required],
      left: [0],
      top: [0],
      height: [0, [Validators.min(1), Validators.max(600)]],
      width: [0, [Validators.min(1), Validators.max(600)]],
      fontSize: [24],
      font: ['Arial'],
      color: ['fff'],
      backgroundColor: ['transparent'],
      zIndex: [1],
    });

    this.editorService.selectedObject
      .pipe(
        filter(
          (selectedObject: any) =>
            !selectedObject || this.editorService.isTextItem(selectedObject)
        )
      )
      .subscribe({
        next: (selectedObject: any) => {
          this.selectedObject = selectedObject;
          this.updateProperties();
        },
      });
  }

  updateProperties() {
    if (!this.form) return;
    if (this.selectedObject) {
      this.form.patchValue({
        text: this.selectedObject.text,
        left: this.selectedObject?.left,
        top: this.selectedObject?.top,
        height: +this.selectedObject.height,
        width: +this.selectedObject.width,
        fontSize: this.selectedObject.fontSize,
        font: this.selectedObject.font,
        color: this.selectedObject.fill,
        backgroundColor: this.selectedObject.backgroundColor,
        zIndex: this.selectedObject.zIndex || 1,
      });
    } else {
      this.form.patchValue({
        text: '',
        height: 20,
        width: 100,
        color: 'black',
        backgroundColor: 'transparent',
      });
    }
  }

  apply() {
    const { value } = this.form;
    const height =
      +value.height > 0 ? +value.height : this.selectedObject?.height || 0;
    const width =
      +value.width > 0 ? +value.width : this.selectedObject?.width || 0;
    if (this.selectedObject) {
      const properties = {
        text: value.text,
        backgroundColor: value.backgroundColor,
        fill: value.color || 'fff',
        fontSize: +value.fontSize || 24,
        width,
        height,
      };
      this.editorService.UpdateObjectAndCanvas(
        this.canvas,
        this.selectedObject,
        properties
      );
      this.updateProperties();
    } else {
      this.addText(value.text, {
        width: width || 200,
        height: height || 100,
        fontSize: +value.fontSize || 24,
        cursorColor: 'blue',
        left: 50,
        top: 50,
        backgroundColor: 'transparent',
      });
    }
  }

  addText(text: string, options?: fabric.ITextboxOptions) {
    const textbox = new fabric.Textbox(text, options);
    this.canvas.add(textbox);
    this.canvas.renderAll();
  }

  delete() {
    this.canvas.remove(this.canvas.getActiveObject());
    this.editorService.setObjectItem(null);
  }

  decreaseHeight() {
    const { value } = this.form;

    if (+value.height > 1) {
      value.height = +value.height - 1;
    }
    this.form.patchValue({
      height: value.height,
    });
  }
}
