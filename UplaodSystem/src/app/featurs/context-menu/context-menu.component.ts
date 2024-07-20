import { Component, input, signal } from '@angular/core';
import { FileUploadQuery } from '../file-upload/store/file-upload.query';
import { FileUploadService } from '../file-upload/store/file-upload.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'context-menu ',
  standalone: true,
  imports: [],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {

  uploadedFiles$: Observable<any[]>;
  filesArray = signal<File[]>([]);

  constructor(private fileUploadService: FileUploadService, private fileUploadQuery: FileUploadQuery) {
    this.uploadedFiles$ = this.fileUploadQuery.selectAll();
    this.uploadedFiles$.subscribe((files: File[])=> {
      this.filesArray.update(() => files);
    })
  }
  downloadFile(file: File): void {
    let fileName = file.name;
    this.fileUploadService.downloadFile(fileName).subscribe((blob: any) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('File download failed:', error);
    });
;
  }
  
}
