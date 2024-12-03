import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from "primeng/fileupload";
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from "primeng/toolbar";
import { HistorialTransitoService } from './service/historial-transito.service';
import { HistorialTransitoModel } from './models/historial-transito.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-historial-transito',
  standalone: true,
  imports: [CommonModule,
            TableModule,
            ButtonModule,
            DialogModule,
            FileUploadModule,
            ToastModule,
            ToolbarModule,
            ConfirmDialogModule,
            InputTextModule,
            InputTextareaModule,
            ReactiveFormsModule,
            CalendarModule
          ],
  templateUrl: './historial-transito.component.html',
  styleUrls: ['./historial-transito.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class HistorialTransitoComponent implements OnInit {

  public products: any[] = [];
  public data : HistorialTransitoModel[] = [];
  public importedData: any[] = [];
  public loading: boolean = false;
  public query: string = '';
  public totalRecords: number = 0;
  public historialTransitoDialog: boolean = false;
  public submitted: boolean = false;
  public historialTransitoForm!: FormGroup;
  public id?: number;

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private historialTransitoService: HistorialTransitoService,
              private fb: FormBuilder
            ) {}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    const DATE = new Date();
    this.historialTransitoForm = this.fb.group({
      id: [null],
      placas: ['', Validators.required],
      recibe: ['', Validators.required],
      fecha_de_entrega: [DATE, Validators.required],
      quien_entrega: ['', Validators.required],
      tramite: [null, Validators.required],
      observaciones: [''],
      fecha_de_archivo: [DATE, Validators.required],
      archivo: ['', Validators.required],
    });
  }

  loadTable(event?: TableLazyLoadEvent) {
    this.loading = true;
    event = event || {};
    this.historialTransitoService.getDatatable(event).subscribe((data: any) => {
      this.data = data.data;
      this.totalRecords = data.recordsTotal;
      this.loading = false;
    });
  }

  loadData(id?:number){
      this.historialTransitoService.show(id).subscribe((data: any) => {
        const fechaEntrega = data.fecha_de_entrega ? new Date(data.fecha_de_entrega) : null;
        const fechaArchivo = data.fecha_de_archivo ? new Date(data.fecha_de_archivo) : null;
        this.historialTransitoForm.patchValue({
          ...data,
          fecha_de_entrega: fechaEntrega,
          fecha_de_archivo: fechaArchivo
        });
      })
  }

  editCarpeta(rowData: HistorialTransitoModel) {
    this.historialTransitoDialog = true;
    this.id = rowData.id;
    this.loadData(this.id);
  }

  deleteCarpeta(id: any) {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar la carpeta seleccionada?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle custom-icon',
      accept: () => {
        this.historialTransitoService.deleteCarpeta(id).subscribe((res: any) => {
          this.messageService.add({ severity: 'success', summary: 'Exitosa', detail: res.message, life: 3000 });
          this.loadTable();
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Tú has rechazado', life: 3000 });
            break;
        }
      },

    });
  }

  onFileImport(event: any, fileUploader: any): void {
    const file: File = event.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      // Llama al servicio para enviar el archivo al backend
      this.historialTransitoService.importData(file).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Exitosa', detail: response.message, life: 3000 });
          fileUploader.clear();
          this.loadTable();
        },
        (error) => {
          console.error('Error al importar el archivo:', error.error);
          fileUploader.clear();
        }
      );
    } else {
      console.error('No se seleccionó un archivo válido.');
    }
  }

  openNew() {
    this.historialTransitoDialog = true;
    this.submitted = false;
    this.historialTransitoForm.reset();
    this.id = undefined;
  }

  hideDialog() {
    this.historialTransitoDialog = false;
    this.submitted = false;
  }

  saveHistorial() {

   this.submitted = true;
   if (this.historialTransitoForm.valid) {
    // Clona los valores del formulario
    const formData = { ...this.historialTransitoForm.value };

    // Formatea las fechas
    formData.fecha_de_entrega = this.formatDate(formData.fecha_de_entrega);
    formData.fecha_de_archivo = this.formatDate(formData.fecha_de_archivo);

    if (this.id) {
      // Si existe un ID, significa que estamos editando
      this.historialTransitoService.edit(this.id, formData).subscribe(
        (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Exitosa',
            detail: res.message,
            life: 3000
          });
          this.historialTransitoDialog = false;
          this.loadTable();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo editar el registro.',
            life: 3000
          });
          console.error(error);
        }
      );
    } else {
      // Si no hay ID, significa que estamos creando un nuevo registro
      this.historialTransitoService.save(formData).subscribe(
        (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Exitosa',
            detail: res.message,
            life: 3000
          });
          this.historialTransitoDialog = false;
          this.loadTable();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el registro.',
            life: 3000
          });
          console.error(error);
        }
      );
    }
  } else {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Por favor, complete todos los campos.',
      life: 3000
    });
  }
  }

  // Método para formatear la fecha
  formatDate(date: Date | string): string {
    if (!date) {
      return '';
    }
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  export(){
    this.historialTransitoService.export();
  }
}
