import { ImageItem } from './image-object.class';
import { TextItem } from './text-object.class';

export interface ICanvasSize {
  width: number;
  height: number;
}

export interface ICanvasConfig {
  canvasSize: ICanvasSize;
  items: {
    textItems: TextItem[];
    imageItems: ImageItem[];
  };
}
