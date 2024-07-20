import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FileUploadStore, FileUploadState } from './file-upload.state';

@Injectable({ providedIn: 'root' })
export class FileUploadQuery extends QueryEntity<FileUploadState> {
  constructor(protected override store: FileUploadStore) {
    super(store);
  }
}
