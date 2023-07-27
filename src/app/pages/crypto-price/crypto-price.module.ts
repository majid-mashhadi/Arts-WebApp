import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoPriceComponent } from './crypto-price.component';
import { CryptoPriceRoutingModule } from './crypto-price-routing.module';

@NgModule({
  declarations: [CryptoPriceComponent],
  imports: [CommonModule, CryptoPriceRoutingModule],
})
export class CryptoPriceModule {}
