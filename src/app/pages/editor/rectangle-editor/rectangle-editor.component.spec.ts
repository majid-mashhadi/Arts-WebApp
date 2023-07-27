import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleEditorComponent } from './rectangle-editor.component';

describe('RectangleEditorComponent', () => {
  let component: RectangleEditorComponent;
  let fixture: ComponentFixture<RectangleEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RectangleEditorComponent]
    });
    fixture = TestBed.createComponent(RectangleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
