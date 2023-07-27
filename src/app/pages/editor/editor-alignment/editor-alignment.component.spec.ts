import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorAlignmentComponent } from './editor-alignment.component';

describe('EditorAlignmentComponent', () => {
  let component: EditorAlignmentComponent;
  let fixture: ComponentFixture<EditorAlignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorAlignmentComponent]
    });
    fixture = TestBed.createComponent(EditorAlignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
