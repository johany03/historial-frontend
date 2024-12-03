import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HistorialTransitoModel } from '../models/historial-transito.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistorialTransitoService {

  public url = environment.url;
  public token = localStorage.getItem("ACCESS_TOKEN");
  public headers: any;

  constructor(private http: HttpClient) {}

  //Index
  getDatatable(event: any) {
    return this.http.post<HistorialTransitoModel>(`${this.url}historial-transito-data`,  event);
  }


  deleteCarpeta(id: any) {
    return this.http.delete<HistorialTransitoModel>(`${this.url}historial-transito/${id}`);
  }

  importData(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // Realiza la solicitud POST para enviar el archivo
    return this.http.post(`${this.url}historial-transito/import` , formData);
  }

  export() {
    return this.http.post(`${this.url}historial-transito/export`,{}, { responseType: 'blob' })
      .subscribe((res: Blob) => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'historial_transito.xlsx';
      link.click();
    });
  }

  save(data: any) {
    return this.http.post<HistorialTransitoModel>(`${this.url}historial-transito`, data);
  }

  show(id: any) {
    return this.http.get<HistorialTransitoModel>(`${this.url}historial-transito/${id}`);
  }

  edit(id: any, data: HistorialTransitoModel) {
    return this.http.put<HistorialTransitoModel>(`${this.url}historial-transito/${id}`, data);
  }

}
