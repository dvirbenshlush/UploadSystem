import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface FileUpload {
  id: string;
  name: string;
//   url: string;
}

export interface FileUploadState extends EntityState<FileUpload, string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'file-upload' })
export class FileUploadStore extends EntityStore<FileUploadState> {
  constructor() {
    super();
  }
}
