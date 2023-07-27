import { Component } from '@angular/core';
import { fabric } from 'fabric';
import { BasePageComponent } from 'src/app/library/components/base-page/base-page.component';
import { ICanvasSize } from '../interfaces/canvas-config.interface';
import { EditorService } from '../services/editor.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fabric-editor',
  templateUrl: './fabric-editor.component.html',
  styleUrls: ['./fabric-editor.component.scss'],
})
export class FabricEditorComponent extends BasePageComponent {
  canvasSize: ICanvasSize = {
    width: 600,
    height: 600,
  };

  canvas: any;
  selectedObject: any;
  // x: any = null;

  tool: string;
  selectedArt: any;

  constructor(private editorService: EditorService) {
    super();
  }
  override ngOnInit() {
    this.canvas = new fabric.Canvas('design-studio', {
      width: this.canvasSize.width,
      height: this.canvasSize.height,
      backgroundColor: 'red',
    });

    this.canvas.on('mouse:up', (event: any) => {
      this.selectedObject =
        !event || !event.currentTarget ? null : event.target;
      this.editorService.setObjectItem(this.selectedObject);
      this.tool = '';
    });

    this.editorService.selectedArt.subscribe({
      next: (art: any) => {
        this.selectArt(art);
      },
    });
    // this.canvas.on('mouse:up', (event)=> { this.mouseUp(event));

    // this.addText('This is an example', {
    //   width: 200,
    //   height: 100,
    //   fontSize: 24,
    //   cursorColor: 'blue',
    //   left: 50,
    //   top: 50,
    //   backgroundColor: 'yellow',
    // });
    // this.addText('This is an example 2 in green', {
    //   width: 200,
    //   height: 100,
    //   fontSize: 24,
    //   cursorColor: 'blue',
    //   left: 80,
    //   top: 60,
    //   backgroundColor: 'green',
    // });
  }

  selectArt(art: any) {
    this.selectedArt = art;
    const artSource = art?.artSource || '';
    this.canvas.loadFromJSON(artSource, () => {
      this.canvas.setWidth(art.canvasWidth);
      this.canvas.setHeight(art.canvasHeight);
      this.canvas.renderAll();
    });
  }

  addText(text: string, options?: fabric.ITextboxOptions) {
    const textbox = new fabric.Textbox(text, options);
    this.canvas.add(textbox);
  }

  onSaveClick() {
    const artSource = JSON.stringify(this.canvas.toJSON());
    this.editorService
      .saveArt(
        this.selectedArt?.artId || '',
        artSource,
        this.selectedArt?.artName || 'my_art',
        this.canvas.height,
        this.canvas.width
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    // const link = document.createElement('a');
    // link.href = this.canvas.toDataURL('jpeg');
    // link.download = 'image.png';
    // link.click();
  }
  openExisting() {
    this.setTool('load');
    // this.editorService.listArt().subscribe({
    //   next: (response: any) => {
    //     this.canvas.loadFromJSON(response.imageSource, () => {
    //       this.canvas.renderAll();
    //     });
    //     // console.log(response);
    //     // fabric.loadSVGFromString(response.imageSource, (objects, options) => {
    //     //   var obj = fabric.util.groupSVGElements(objects, options);
    //     //   this.canvas.add(obj).centerObject(obj).renderAll();
    //     //   console.log(obj);
    //     //   obj.setCoords();
    //     // });
    //   },
    // });
  }
  // mouseUp(event: any) {
  //   this.x = { ...this.canvasSize };
  //   if (!event || !event.currentTarget) {
  //     this.selectedObject = null;
  //     return;
  //   }
  //   console.log(event);
  //   this.selectedObject = event?.currentTarget;
  //   this.print();
  //   // console.log(this.selectedObject);
  //   // this.editorService.setObjectItem(this.selectedObject);
  // }

  // print() {
  //   console.log(this.selectedObject);
  // }
  /****** */
  updateObject() {}
  setTool(tool: string) {
    this.selectedObject = null;
    this.editorService.setObjectItem(this.selectedObject);
    this.tool = tool;
  }
  onSettingsClick() {}
}
