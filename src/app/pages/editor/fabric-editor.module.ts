import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricEditorComponent } from './fabric-editor/fabric-editor.component';
import { FabricEditorRoutingModule } from './fabric-editor-routing.module';
import { ComponentsModule } from 'src/app/library/components/components.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { ObjectEditorComponent } from './object-picker/object-picker.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import { EditorAlignmentComponent } from './editor-alignment/editor-alignment.component';
import { CanvasSettingComponent } from './canvas-setting/canvas-setting.component';
import { ShapeEditorComponent } from './shape-editor/shape-editor.component';
import { CircleEditorComponent } from './circle-editor/circle-editor.component';
import { BaseEditorComponent } from './base-editor/base-editor.component';
import { RectangleEditorComponent } from './rectangle-editor/rectangle-editor.component';
import { ListArtComponent } from './list-art/list-art.component';

@NgModule({
  declarations: [
    FabricEditorComponent,
    ObjectEditorComponent,
    TextEditorComponent,
    ImageEditorComponent,
    EditorAlignmentComponent,
    CanvasSettingComponent,
    ShapeEditorComponent,
    CircleEditorComponent,
    BaseEditorComponent,
    RectangleEditorComponent,
    ListArtComponent,
  ],
  imports: [
    CommonModule,
    FabricEditorRoutingModule,
    ComponentsModule,
    ColorPickerModule,
  ],
  exports: [FabricEditorRoutingModule],
})
export class FabricEditorModule {}
