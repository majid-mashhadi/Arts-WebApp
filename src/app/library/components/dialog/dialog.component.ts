import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActionButtons, AppDialogConfig } from '../services/dialog-config';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild('component', { read: ViewContainerRef, static: true })
  componentTarget: ViewContainerRef;

  headerTemplate: TemplateRef<any> | null;
  contentTemplate: TemplateRef<any> | null;
  actionsTemplate: TemplateRef<any> | null;
  title: string = '';
  config?: AppDialogConfig;
  childComponentType: Type<any>;
  data: any;

  get hasNoButton(): boolean {
    return this.hasButton(ActionButtons.No);
  }
  get hasYesButton(): boolean {
    return this.hasButton(ActionButtons.Yes);
  }
  get hasOkButton(): boolean {
    return this.hasButton(ActionButtons.Ok);
  }
  get hasCancelButton(): boolean {
    return this.hasButton(ActionButtons.Cancel);
  }
  get hasCloseButton(): boolean {
    return this.hasButton(ActionButtons.Close);
  }
  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.title = data?.title || '';
    this.data = data;
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}

  hasButton(button: ActionButtons) {
    return this.data?.buttons?.includes(button);
  }

  onClose() {
    this.onAction();
  }

  onAction(action?: string) {
    this.dialogRef.close(action);
  }
}
