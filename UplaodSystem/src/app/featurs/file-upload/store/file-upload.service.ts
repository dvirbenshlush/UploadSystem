import { Injectable } from '@angular/core';
import { FileUploadStore } from './file-upload.state';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { guid } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { FileUploadQuery } from './file-upload.query';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
    private url = environment.apiUrl;

  constructor(
    private fileUploadStore: FileUploadStore, 
    private fileUploadQuery: FileUploadQuery, 
    private http: HttpClient
    ) {}

  uploadFile(file: File, fileName: string): Observable<any> {

    const existingFile = this.fileUploadQuery.getAll().find(f => f.name === fileName);
    if (existingFile) {
      alert('קובץ עם שם זה כבר קיים');
    //   return 'קובץ עם שם זה כבר קיים';
    }

    const formData = new FormData();
    formData.append('file', file, fileName);

    return this.http.post(this.url + '/api/Upload', formData).pipe(
      tap(response => {
        const fileUpload = {
          id: guid(),
          name: fileName,
        //   url: response.url
        };
        this.fileUploadStore.add(fileUpload);
      })
    );
  }

  removeFile(fileId: string) {
    this.fileUploadStore.remove(fileId);
  }


  
  downloadFile(fileName: string) :Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.url + '/api/upload'}/${fileName}`, { headers, responseType: 'blob' });
  }
}
