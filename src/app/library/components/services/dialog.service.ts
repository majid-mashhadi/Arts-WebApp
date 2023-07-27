import { ComponentRef, Injectable, TemplateRef, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActionButtons, AppDialogConfig } from './dialog-config';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogConfig, DialogModule } from '@angular/cdk/dialog';

@Injectable({
  providedIn: DialogModule,
})
export class DialogService {
  dialogComponentRef: ComponentRef<DialogComponent>;
  defaultConfig: AppDialogConfig;

  constructor(private dialog: MatDialog) {
    this.defaultConfig = {
      minHeight: '150px',
      minWidth: '640px',
      hasBackdrop: true,
      hasCloseButton: true,
      closeOnNavigation: true,
      enterAnimationDuration: 500,
      exitAnimationDuration: 100,
    };
  }

  closeAll() {
    // this.dialog.closeAll();
  }

  openComponentWithTemplates(
    headerTemplate: TemplateRef<any> | null,
    contentTemplate: TemplateRef<any> | null,
    actionsTemplate: TemplateRef<any> | null,
    config: AppDialogConfig
  ) {
    const dialogConfig: AppDialogConfig = {
      ...this.defaultConfig,
      ...config,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.componentInstance.headerTemplate = headerTemplate;
    dialogRef.componentInstance.contentTemplate = contentTemplate;
    dialogRef.componentInstance.actionsTemplate = actionsTemplate;
    dialogRef.componentInstance.config = dialogConfig;
    return dialogRef;
  }

  openComponentModal(componentType: Type<any>, config: AppDialogConfig) {
    const dialogConfig: AppDialogConfig = {
      ...this.defaultConfig,
      ...config,
    };
    const dialogRef = this.dialog.open(componentType, dialogConfig);
    dialogRef.componentInstance.config = dialogConfig;
    return dialogRef;
  }

  private openModal(title: string, content?: any, config?: AppDialogConfig) {
    const dialogConfig: AppDialogConfig = {
      ...this.defaultConfig,
      ...config,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.componentInstance.config = config;
    return dialogRef;
  }

  openYesNoModal(
    title: string = 'Confirmation',
    content?: any,
    config?: AppDialogConfig
  ) {
    const dialogConfig: AppDialogConfig = {
      ...this.defaultConfig,
      hasCloseButton: false,
      hasBackdrop: false,
      data: {
        title,
        content,
        buttons: [ActionButtons.Yes, ActionButtons.No],
      },
      ...config,
    };
    return this.openModal(title, content, dialogConfig);
  }

  openOkCancelModal(
    title: string = 'Confirmation',
    content: any,
    config?: AppDialogConfig
  ) {
    const dialogConfig: AppDialogConfig = {
      ...this.defaultConfig,
      hasCloseButton: false,
      hasBackdrop: false,
      data: {
        title,
        content,
        buttons: [ActionButtons.Cancel, ActionButtons.Ok],
        hasCloseButton: true,
      },
      ...config,
    };

    return this.openModal(title, content, dialogConfig);
  }
  openMessageModel(title: string, content: any, config: AppDialogConfig) {
    const dialogConfig: AppDialogConfig = {
      ...this.defaultConfig,
      hasCloseButton: false,
      hasBackdrop: false,
      data: {
        title,
        content,
        buttons: [ActionButtons.Close],
        hasCloseButton: true,
      },
      ...config,
    };

    return this.openModal(title, content, dialogConfig);
  }
}
