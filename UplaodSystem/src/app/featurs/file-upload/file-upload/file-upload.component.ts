import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ContextMenuComponent } from '../../context-menu/context-menu.component';
import { Observable } from 'rxjs';
import { FileUploadQuery } from '../store/file-upload.query';
import { FileUploadService } from '../store/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [ContextMenuComponent, FormsModule]
})
export class FileUploadComponent {
  fileName: string = '';
  selectedFile: File | null = null;
  contextMenuVisible: boolean = false;
  uploadMessage: string = '';
  uploadedFiles: File[] = [];
  numberOfFiles: number = 0;
  uploadedFiles$: Observable<any[]>;
  classList: string[] = ['file-upload', 'context-menu', 'inner-circle', 'file-name'];

  constructor(private fileUploadService: FileUploadService, private fileUploadQuery: FileUploadQuery) {
    this.uploadedFiles$ = this.fileUploadQuery.selectAll();
  }

  toggleContextMenu() {
    this.contextMenuVisible = !this.contextMenuVisible;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile?.name || this.fileName;
  }

  uploadFile() {
    if (!this.selectedFile) {
      this.uploadMessage = 'No file selected';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.fileName || this.selectedFile.name);
    this.uploadedFiles.push(this.selectedFile!);
    this.fileUploadService.uploadFile(this.selectedFile, this.fileName || this.selectedFile.name)
    .subscribe(
      () => {
        this.uploadMessage = 'הקובץ הועלה בהצלחה';
        this.numberOfFiles = this.uploadedFiles.length;
      },
      () => {
        this.uploadMessage = 'פעולת ההעלאת הקובץ נכשלה';
      }
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.classList.includes(target.className)) {
      this.contextMenuVisible = false;
    }
  }
}
