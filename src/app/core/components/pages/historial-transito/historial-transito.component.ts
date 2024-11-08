import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from "primeng/fileupload";
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from "primeng/toolbar";

@Component({
  selector: 'app-historial-transito',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DialogModule, FileUploadModule, ToastModule, ToolbarModule],
  templateUrl: './historial-transito.component.html',
  styleUrls: ['./historial-transito.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class HistorialTransitoComponent implements OnInit {

  public products: any[] = [];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {}



}
