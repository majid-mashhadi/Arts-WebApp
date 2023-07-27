import { Injectable } from '@angular/core';
import { AppHttpService } from 'src/app/library/components/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpService: AppHttpService) {}
  getRandom() {
    return this.httpService.get('https://dog.ceo/api/breeds/image/random');
  }
  getRandomText() {
    return this.httpService.get(
      'https://official-joke-api.appspot.com/random_joke'
    );
  }
}
