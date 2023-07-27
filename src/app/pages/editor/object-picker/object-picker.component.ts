import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'src/app/library/components/select/select-item.interface';
import { EditorService } from '../services/editor.service';
import { ObjectType } from '../interfaces/editor-types.type';

@Component({
  selector: 'app-object-editor',
  templateUrl: './object-picker.component.html',
  styleUrls: ['./object-picker.component.scss'],
})
export class ObjectEditorComponent {
  @Input() canvas: any;
  private _object: any;
  type: ObjectType = 'textbox';

  @Input() set selectedObject(v: any) {
    this._object = v;
  }

  get defaultObject(): any {
    return this._object;
  }

  objectForm: FormGroup;
  objectItems: SelectItem[] = [];

  constructor(private fb: FormBuilder, private editorService: EditorService) {}
  ngOnInit() {
    this.objectForm = this.fb.group({
      type: [this.type],
    });

    this.editorService.selectedObject.subscribe({
      next: (selectedObject: any) => {
        this.type = selectedObject?.get('type') || '';
        // if (this.editorService.isShapeObject(selectedObject)) {
        //   this.type = 'shape';
        // }
        this.objectForm.patchValue({
          type: this.type,
        });
      },
    });

    this.objectForm.get('type')?.valueChanges.subscribe({
      next: (t: string) => {
        this.type = t as ObjectType;
      },
    });
    this.objectItems = [
      { value: 'textbox', option: 'Text' },
      { value: 'circle', option: 'Circle' },
      { value: 'rect', option: 'Rectangle' },
      { value: 'image', option: 'Image' },
    ];
  }
}
