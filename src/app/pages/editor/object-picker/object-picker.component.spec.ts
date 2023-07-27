import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectEditorComponent } from './object-picker.component';

describe('ObjectPickerComponent', () => {
  let component: ObjectEditorComponent;
  let fixture: ComponentFixture<ObjectEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectEditorComponent],
    });
    fixture = TestBed.createComponent(ObjectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
