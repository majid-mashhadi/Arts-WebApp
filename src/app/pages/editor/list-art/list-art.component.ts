import { Component, Input } from '@angular/core';
import { EditorService } from '../services/editor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from 'src/app/library/components/services/loading.service';

@Component({
  selector: 'app-editor-list-art',
  templateUrl: './list-art.component.html',
  styleUrls: ['./list-art.component.scss'],
})
export class ListArtComponent {
  @Input() canvas: any;
  list: any[] = [];

  constructor(
    private editorService: EditorService,
    private loadingService: LoadingService
  ) {}
  ngOnInit() {
    this.loadingService.open('loading Arts.');
    this.editorService.listArt().subscribe({
      next: (response: any) => {
        this.list = response;
        this.selectArt(this.list[0].artId);
        this.loadingService.close();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.loadingService.close();
      },
    });
  }

  selectArt(artId: string) {
    const art = this.list.find((art: any) => art.artId === artId);
    this.editorService.selectedArt.next(art);
  }
}
