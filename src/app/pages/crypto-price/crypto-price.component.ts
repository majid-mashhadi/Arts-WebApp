import { Component } from '@angular/core';
import { BasePageComponent } from 'src/app/library/components/base-page/base-page.component';
import { CryptoService } from './crypto.service';

@Component({
  selector: 'app-crypto-price',
  templateUrl: './crypto-price.component.html',
  styleUrls: ['./crypto-price.component.scss'],
})
export class CryptoPriceComponent extends BasePageComponent {
  price: any;
  rates: any[] = [];
  coin: string;
  constructor(private cryptoService: CryptoService) {
    super();
  }

  override ngOnInit() {
    this.route.queryParams.subscribe({
      next: (params: any) => {
        this.coin = params['coin'] || 'btc';
        this.rates = [];
        this.cryptoService.getPrice(this.coin).subscribe({
          next: (price: any) => {
            this.price = price;
            for (const key of Object.keys(price.bpi)) {
              this.rates.push(price.bpi[key]);
            }
          },
        });
      },
    });
  }
  override ngOnDestroy(): void {}
}
