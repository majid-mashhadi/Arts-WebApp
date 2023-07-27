import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InputBoxComponent } from 'src/app/library/components/input-box/input-box.component';
import { appRoutes } from 'src/app/library/utility/app-routes';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @ViewChild('input') inputControl: InputBoxComponent;

  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
    });
  }
  onSearch() {
    const { value } = this.form;
    this.form.patchValue({
      search: '',
    });
    this.router.navigate(['/' + appRoutes.crypto], {
      queryParams: { coin: value.search },
    });
  }
}
