import { MatDialogConfig } from '@angular/material/dialog';

export class AppDialogConfig extends MatDialogConfig {
  hasCloseButton?: boolean | undefined;
  title?: string;
  contentClass?: string | undefined;
}
export enum ActionButtons {
  Yes,
  No,
  Ok,
  Cancel,
  Close,
}
