import { Injectable } from '@angular/core';
import { AppHttpService } from 'src/app/library/components/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private httpService: AppHttpService) {}
  getPrice(coin: string) {
    return this.httpService.get(
      'https://api.coindesk.com/v1/bpi/currentprice.json'
      // 'https://www.boredapi.com/api/activity'
    );
  }
}
