import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/library/components/components.module';
import { TextEditorComponent } from '../editor/text-editor/text-editor.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ImageEditorComponent } from '../editor/image-editor/image-editor.component';
@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    FormsModule,
    CdkDrag,
    ComponentsModule,
    ColorPickerModule,
  ],
})
export class EditorModule {}
