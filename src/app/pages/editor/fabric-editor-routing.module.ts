import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FabricEditorComponent } from './fabric-editor/fabric-editor.component';

const routes: Routes = [{ path: '', component: FabricEditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FabricEditorRoutingModule {}
