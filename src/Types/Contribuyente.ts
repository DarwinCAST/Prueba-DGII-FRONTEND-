import { Comprobante } from "./Comprobante";

export interface Contribuyente {
  id: number;
  rncCedula: string;
  nombre: string;
  tipo: string;
  estatus: string;
  cantidadComprobantes: number;
}

export interface ContribuyenteDetalle {
  rncCedula: string;
  nombre: string;
  totalITBIS: number;
  comprobantes: Comprobante[];
}
