import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoPriceComponent } from './crypto-price.component';

const routes: Routes = [{ path: '', component: CryptoPriceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptoPriceRoutingModule {}
