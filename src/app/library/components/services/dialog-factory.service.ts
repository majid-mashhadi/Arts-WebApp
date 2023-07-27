import { DialogModule } from '@angular/cdk/dialog';
import { Injectable, TemplateRef } from '@angular/core';
import { DialogPosition, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: DialogModule,
})
export class DialogFactoryService {
  dialogRef: MatDialogRef<any>;
  constructor() {}

  updateHeaderTemplate(template: TemplateRef<any>) {
    this.dialogRef.componentInstance.headerTemplate = template;
  }

  updateConentTemplate(template: TemplateRef<any>) {
    this.dialogRef.componentInstance.contentTemplate = template;
  }

  updateActionsTemplate(template: TemplateRef<any>) {
    this.dialogRef.componentInstance.actionsTemplate = template;
  }

  updateSize(width?: string | undefined, height?: string | undefined) {
    this.dialogRef.updateSize(width, height);
    this.dialogRef.componentInstance.config = {
      ...this.dialogRef.componentInstance.config,
      height,
      width,
    };
  }
  updatePosition(position: DialogPosition | undefined) {
    this.dialogRef.updatePosition(position);
  }
}
