import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArtComponent } from './list-art.component';

describe('ListArtComponent', () => {
  let component: ListArtComponent;
  let fixture: ComponentFixture<ListArtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListArtComponent]
    });
    fixture = TestBed.createComponent(ListArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
