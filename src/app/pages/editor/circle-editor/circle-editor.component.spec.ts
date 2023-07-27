import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleEditorComponent } from './circle-editor.component';

describe('CircleEditorComponent', () => {
  let component: CircleEditorComponent;
  let fixture: ComponentFixture<CircleEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircleEditorComponent]
    });
    fixture = TestBed.createComponent(CircleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
