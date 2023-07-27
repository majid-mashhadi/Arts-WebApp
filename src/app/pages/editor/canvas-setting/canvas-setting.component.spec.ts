import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasSettingComponent } from './canvas-setting.component';

describe('CanvasSettingComponent', () => {
  let component: CanvasSettingComponent;
  let fixture: ComponentFixture<CanvasSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasSettingComponent]
    });
    fixture = TestBed.createComponent(CanvasSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
