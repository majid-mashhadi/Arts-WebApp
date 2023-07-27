import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { AppHttpService } from 'src/app/library/components/services/http.service';
import { ICanvasConfig } from '../interfaces/canvas-config.interface';
import { BaseObject } from '../interfaces/base-object.class';
import { SelectItem } from 'src/app/library/components/select/select-item.interface';
import { ShapeType } from '../interfaces/editor-types.type';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  selectedObject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  selectedArt: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  shapeItems: SelectItem[] = [
    { option: 'Rectangle', value: 'rect' },
    { option: 'Circle', value: 'circle' },
  ];
  validShapes: ShapeType[] = ['circle', 'rect'];

  // selectedObject: BehaviorSubject<BaseObject | null> =
  //   new BehaviorSubject<BaseObject | null>(null);

  // selectedText: BehaviorSubject<TextItem | null> =
  //   new BehaviorSubject<TextItem | null>(null);

  // selectedImage: BehaviorSubject<ImageItem | null> =
  //   new BehaviorSubject<ImageItem | null>(null);

  constructor(private httpService: AppHttpService) {}

  setObjectItem(item: any) {
    this.selectedObject.next(item);
  }

  // setTextItem(item: TextItem | null) {
  //   this.selectedText.next(item);
  // }

  // setImageItem(item: ImageItem | null) {
  //   this.selectedImage.next(item);
  // }

  typeof(item: any) {
    return item?.get('type');
  }

  isTextItem(item: any) {
    return this.typeof(item) === 'textbox';
  }

  isImageItem(item: any) {
    return this.typeof(item) === 'image';
  }

  isCircleObject(object: any) {
    return this.typeof(object) === 'circle';
  }

  isRectObject(object: any) {
    return this.typeof(object) === 'rect';
  }

  isShapeObject(item: any) {
    return item && this.validShapes.includes(item.get('type'));
  }

  uploadImage(config: ICanvasConfig) {
    return this.httpService.post('/image', {
      config,
    });
  }

  UpdateObjectAndCanvas(canvas: any, selectedObject: any, properties: any) {
    selectedObject.set(properties);
    selectedObject.dirty = true;
    canvas.renderAll();
  }

  listArt() {
    return this.httpService.get('/Art/List');
  }

  saveArt(
    artId: string,
    artSource: string,
    artName: string,
    canvasHeight: number,
    canvasWidth: number
  ) {
    const body = {
      artSource,
      artName,
      canvasHeight,
      canvasWidth,
      artId,
    };
    return this.httpService.post('/Art/Save', body);
  }

  loadArt(id: number) {
    return this.httpService.get(`/Art/${id}`);
  }
}
