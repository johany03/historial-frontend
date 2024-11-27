export interface HistorialTransitoModel {
  id?:                   number;
  placas?:               string;
  recibe?:               string;
  fecha_de_entrega?:     Date | string;
  quien_entrega?:        string;
  tramite?:              string;
  observaciones?:        string;
  fecha_de_archivo?:     Date | string;
  archivo?:              string;
  fecha_de_importacion?: Date;
  created_at?:           Date;
  updated_at?:           Date;
  deleted_at?:           null;
}
