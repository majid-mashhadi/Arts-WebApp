import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BaseComponent } from './base-component/base-component.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';
import { BasePageComponent } from './base-page/base-page.component';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ShowErrorComponent } from './show-error/show-error.component';
import { FontSelectorComponent } from './font-selector/font-selector.component';
import { SelectComponent } from './select/select.component';
import { NumberOnly } from './directives/numbers-only.directive';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    BaseComponent,
    InputBoxComponent,
    EmailComponent,
    PasswordComponent,
    BasePageComponent,
    LoadingComponent,
    CheckboxComponent,
    DialogComponent,
    ShowErrorComponent,
    FontSelectorComponent,
    SelectComponent,
    NumberOnly,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  exports: [
    BaseComponent,
    BasePageComponent,
    InputBoxComponent,
    EmailComponent,
    PasswordComponent,
    CheckboxComponent,
    ShowErrorComponent,
    SelectComponent,
    FontSelectorComponent,
    NumberOnly,
    MatSlideToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  providers: [
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
})
export class ComponentsModule {}
