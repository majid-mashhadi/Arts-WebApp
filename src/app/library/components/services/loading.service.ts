import { Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoadingComponent } from '../loading/loading.component';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private overlayRef: OverlayRef;
  private loadingPortal: ComponentPortal<any>;
  private defaultConfig: OverlayConfig;
  public defaultMessge : string = 'Loading...';
  public message : string;
  constructor(
    private overlay: Overlay,
  ) {
    this.defaultConfig = {
      minWidth: '100%',
      minHeight: '100%',
      disposeOnNavigation: true,
      panelClass: 'overlay-content-center'
    }
    this.overlayRef = this.overlay.create(this.defaultConfig);
    this.loadingPortal = new ComponentPortal(LoadingComponent);
  }

  open(message: string = this.defaultMessge) {
    this.message = message;
    this.overlayRef.attach(this.loadingPortal);
  }
  
  close() { 
    this.overlayRef.detach();
  }
  openConfig(config: OverlayConfig = this.defaultConfig) {
    const overlayRef = this.overlay.create(config);
    overlayRef.attach(this.loadingPortal);
    return overlayRef;
  }
}
