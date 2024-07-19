import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

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

  constructor(
    // private http: HttpClient
  ) {}

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
    // this.http.post('/api/upload', formData).subscribe(
    //   () => {
        this.uploadMessage = 'הקובץ הועלה בהצלחה';
        this.uploadedFiles.push(this.selectedFile!);
    //   },
    //   () => {
    //     this.uploadMessage = 'פעולת ההעלאת הקובץ נכשלה';
    //   }
    // );
  }
}
