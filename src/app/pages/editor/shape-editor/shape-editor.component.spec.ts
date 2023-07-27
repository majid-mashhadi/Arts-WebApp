import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeEditorComponent } from './shape-editor.component';

describe('ShapeEditorComponent', () => {
  let component: ShapeEditorComponent;
  let fixture: ComponentFixture<ShapeEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShapeEditorComponent],
    });
    fixture = TestBed.createComponent(ShapeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
