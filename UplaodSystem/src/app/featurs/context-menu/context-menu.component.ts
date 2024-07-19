import { Component, input } from '@angular/core';

@Component({
  selector: 'context-menu',
  standalone: true,
  imports: [],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {
  uploadedFiles = input<File[]>([]);

  downloadFile(file: File) {
    // Implement file download logic here
  }
}
