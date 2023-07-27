import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricEditorComponent } from './fabric-editor.component';

describe('FabricEditorComponent', () => {
  let component: FabricEditorComponent;
  let fixture: ComponentFixture<FabricEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabricEditorComponent]
    });
    fixture = TestBed.createComponent(FabricEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
