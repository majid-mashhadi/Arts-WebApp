import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { BasePageComponent } from 'src/app/library/components/base-page/base-page.component';
import { TextItem } from '../editor/interfaces/text-object.class';
import { EditorService } from '../editor/services/editor.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseObject } from '../editor/interfaces/base-object.class';
import { ImageItem } from '../editor/interfaces/image-object.class';
import { ICanvasSize } from '../editor/interfaces/canvas-config.interface';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { EditorTools } from '../editor/interfaces/tools.types';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent extends BasePageComponent {
  @ViewChild('canvasRef', { static: true }) canvasRef: ElementRef;
  @ViewChild('previewImage', { static: false }) previewImage: TemplateRef<any>;
  @ViewChild('previewActions', { static: false })
  previewActions: TemplateRef<any>;
  private context: CanvasRenderingContext2D;
  preview: string = '';

  textItems: TextItem[] = [
    {
      id: 1,
      text: 'Hello ',
      x: 10,
      y: 50,
      width: 200,
      height: 100,
      backgroundColor: 'red',
      color: 'white',
      zIndex: 1,
    },
  ];

  imageItems: ImageItem[] = [];

  // text: string = '';
  // fileName: string = '';

  tool: EditorTools = undefined;

  dialogRef: MatDialogRef<any>;

  canvasSize: ICanvasSize = {
    width: 600,
    height: 600,
  };
  selectedObject: BaseObject | undefined;
  defaultObject: string = 'text';

  constructor(private editorService: EditorService) {
    super();
  }

  override ngOnInit() {
    // this.context = this.canvasRef.nativeElement.getContext('2d');
    // this.draw();
  }

  startDrawing(event: MouseEvent) {
    // this.isDrawing = true;
    this.context.beginPath();
    this.context.moveTo(event.offsetX, event.offsetY);
  }

  draw(event?: MouseEvent) {
    this.context.clearRect(
      0,
      0,
      this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height
    );

    // this.textItems.forEach((item) => {
    //   // if (item === this.activeTextItem) {
    //   //   this.context.font = '20px Arial';
    //   //   this.context.fillStyle = 'red';
    //   // } else {
    //   //   this.context.font = '20px Arial';
    //   //   this.context.fillStyle = 'black';
    //   // }
    //   this.context.fillText(item.text, item.x, item.y);
    // });

    // if (event && this.isDrawing && this.activeTextItem) {
    //   this.activeTextItem.x = event.offsetX;
    //   this.activeTextItem.y = event.offsetY;
    //   this.draw();
    // }
  }

  stopDrawing() {
    // this.isDrawing = false;
  }

  clearCanvas() {
    this.textItems = [];
    this.draw();
  }

  // addText() {
  //   if (this.selectedObject) {
  //     (this.selectedObject as TextItem).text = this.text;
  //   }
  //   this.draw();
  // }

  selectTextItem(item: TextItem) {
    this.draw();
  }

  updateObject(newItem: BaseObject) {
    if ('text' in newItem) this.updateText(newItem);
    if ('src' in newItem) this.updateImage(newItem);
  }

  updateText(newItem: BaseObject) {
    if (newItem.id < 0) {
      this.textItems = this.textItems.filter(
        (t: TextItem) => t.id === Math.abs(newItem.id)
      );
      this.editorService.setObjectItem(null);
      return;
    }
    const cast = newItem as TextItem;
    const item = this.textItems.find((t: TextItem) => t.id === newItem.id);
    if (item) {
      item.text = cast.text;
      item.color = cast.color;
      item.backgroundColor = cast.backgroundColor;
      item.font = cast.font;
      item.fontSize = cast.fontSize;
      item.zIndex = cast.zIndex;
      item.height = cast.height;
      item.width = cast.width;
      console.log(this.textItems);
    } else {
      newItem.id = this.textItems.length + 1;
      this.textItems.push(newItem as TextItem);
    }
  }

  selectText(div: HTMLElement, event: any, id: number) {
    const item = this.textItems.find((i: TextItem) => i.id === +id);
    this.setTool('picker', item);
    this.defaultObject = 'text';
    this.updatePosition(div, item!, false);
  }

  selectShape(event: any, id: number) {
    const item = this.textItems.find((i: TextItem) => i.id === +id);
    this.setTool('picker', item);
    this.defaultObject = 'shape';
  }

  getOffset(child: HTMLElement) {
    const canvas = document.getElementById('main-canvas');
    const canvasRect = canvas!.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    const border = 2; // 2 is the border of canvas
    const x = Math.max(0, childRect.left - canvasRect.left - border);
    const y = Math.max(0, childRect.top - canvasRect.top - border);
    return { x, y, width: childRect.width, height: childRect.height };
  }

  updatePosition(elm: HTMLElement, item: BaseObject, dispatch: boolean = true) {
    const rect = this.getOffset(elm);
    if (rect.x + rect.width > this.canvasSize.width) {
      rect.x = Math.max(0, this.canvasSize.width - rect.width);
    }
    if (rect.y + rect.height > this.canvasSize.height) {
      rect.y = Math.max(0, this.canvasSize.height - rect.height);
    }
    item.x = rect.x;
    item.y = rect.y;

    item.width = Math.min(rect.width, this.canvasSize.width);
    item.height = Math.min(rect.height, this.canvasSize.height);

    if (dispatch) {
      this.editorService.setObjectItem(item);
    }
  }

  dispatch(item?: BaseObject) {
    if (!item) {
      this.editorService.setObjectItem(null);
      return;
    }

    this.selectedObject = item;
    // if (this.editorService.isImageItem(item)) {
    //   const div = document.getElementById(`image-edit-${item.id}`);
    //   const size = div?.getBoundingClientRect();
    //   item.width = size?.width;
    //   item.height = size?.height;
    // }
    this.editorService.setObjectItem(item);
  }
  setTool(tool: EditorTools, item?: BaseObject) {
    this.tool = tool;
    setTimeout(() => {
      this.dispatch(item);
    }, 0);
  }

  sendBack() {
    if (this.selectedObject) {
      this.selectedObject.zIndex = Math.max(1, this.selectedObject.zIndex - 1);
      this.updateObject(this.selectedObject);
    }
  }

  bringFront() {
    if (this.selectedObject) {
      this.selectedObject.zIndex = 1 + (this.selectedObject.zIndex || 0);
      this.updateObject(this.selectedObject);
    }
  }

  onSaveClick() {
    // for (const item of this.textItems) {
    //   const div = document.getElementById(`text-edit-${item.id}`);
    //   const pos = this.getOffset(div!);
    //   item.x = Math.max(0, item.x + (item.offsetX || 0)); // pos.x;
    //   item.y = Math.max(0, item.y + (item.offsetY || 0)); // pos.y;
    //   item.width = pos.width;
    //   item.height = pos.height;
    //   console.log(item);
    // }
    // for (const item of this.imageItems) {
    //   const div = document.getElementById(`image-edit-${item.id}`);
    //   const pos = this.getOffset(div!);
    //   item.x = pos.x; // Math.max(0, item.x + (item.offsetX || 0)); // pos.x;
    //   item.y = pos.y; // Math.max(0, item.y + (item.offsetY || 0)); // pos.y;
    //   item.width = pos.width;
    //   item.height = pos.height;
    // }
    this.uploadCanvas();
  }

  uploadCanvas() {
    // this.loadingService.open('Refreshing the image');
    this.sbr.add(
      this.editorService
        .uploadImage({
          canvasSize: this.canvasSize,
          items: {
            textItems: this.textItems,
            imageItems: this.imageItems,
          },
        })
        .subscribe({
          next: (response: any) => {
            this.loadingService.close();
            this.preview = response.data;
            this.dialogRef = this.dialogService.openComponentWithTemplates(
              null,
              this.previewImage,
              this.previewActions,
              {
                width: this.canvasSize.width.toString(),
                height: this.canvasSize.height.toString(),
                contentClass:
                  'd-flex align-items-center justify-content-center',
              }
            );
          },
        })
    );
  }

  closeRefreshDialog() {
    this.dialogRef?.close();
  }

  downloadImage() {
    const link = document.createElement('a');
    link.href = this.preview;
    link.download = 'image.png';
    link.click();
  }

  setItemLocationOnCanvas(item: BaseObject) {
    const transformValue: string = `translate3d(${item.x}px, ${item.y}px, 0)`;
    return transformValue;
  }

  updateImage(newItem: BaseObject) {
    if (newItem.id < 0) {
      this.imageItems = this.imageItems.filter(
        (t: ImageItem) => t.id === Math.abs(newItem.id)
      );
      this.editorService.setObjectItem(null);
      return;
    }
    const item = this.imageItems.find(
      (t: ImageItem) => t.id === Math.abs(newItem.id)
    );
    if (item) {
      item.src = (newItem as ImageItem).src;
      item.width = (newItem as ImageItem).width;
      item.height = (newItem as ImageItem).height;

      item.zIndex = newItem.zIndex;
    } else {
      newItem.id = this.textItems.length + 1;
      this.imageItems.push(newItem as ImageItem);
    }
  }
  selectImage(img: HTMLElement, event: any, id: number) {
    const item = this.imageItems.find((i: ImageItem) => i.id === +id);
    this.setTool('picker', item);
    this.defaultObject = 'image';
  }

  findItem(item: BaseObject) {
    const items: BaseObject[] = this.editorService.isImageItem(item)
      ? this.imageItems
      : this.textItems;
    return items.find((i: BaseObject) => i.id === item.id);
  }
  onObjectResize(event: any, item: BaseObject) {
    const findItem = this.findItem(item);
    console.log(event);
  }

  dragEnd(elm: HTMLElement, $event: CdkDragEnd, item: BaseObject) {
    const pos = $event.source.getFreeDragPosition();
    const items: BaseObject[] = this.editorService.isImageItem(item)
      ? this.imageItems
      : this.textItems;

    const findItem = items.find((i: BaseObject) => i.id === item.id);
    if (findItem) {
      findItem.offsetX = pos.x;
      findItem.offsetY = pos.y;
    }
    this.updatePosition(elm, findItem!);
  }
  alignObjectVertically(align: string) {
    if (!this.selectedObject) return;
    console.log(this.selectedObject);
    if (align === 'start') {
      this.selectedObject.y = 0;
    }
    if (align === 'center') {
      this.selectedObject.y =
        (this.canvasSize.height - this.selectedObject.height!) / 2;
    }
    if (align === 'end') {
      this.selectedObject.y =
        this.canvasSize.height - this.selectedObject.height!;
    }
  }
  alignObjectHorizontaly(align: string) {
    if (!this.selectedObject) return;
    if (align === 'start') {
      this.selectedObject.x = 0;
    }
    if (align === 'center') {
      this.selectedObject.x =
        (this.canvasSize.width - this.selectedObject.width!) / 2;
    }
    if (align === 'end') {
      this.selectedObject.x =
        this.canvasSize.width - this.selectedObject.width!;
    }
  }
  horizontalMove(unit: number) {
    if (!this.selectedObject) return;
    this.selectedObject.x = Math.max(0, this.selectedObject.x + unit);
    const width = this.selectedObject.width || 0;
    if (this.selectedObject.x + width > this.canvasSize.width) {
      this.selectedObject.x = this.canvasSize.width - width;
    }
  }
  verticalMove(unit: number) {
    if (!this.selectedObject) return;
    this.selectedObject.y = Math.max(0, this.selectedObject.y + unit);
    const height = this.selectedObject.height || 0;
    if (this.selectedObject.y + height > this.canvasSize.height) {
      this.selectedObject.y = this.canvasSize.height - height;
    }
  }
}
