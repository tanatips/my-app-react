// src/types/division.ts

export interface Division {
    id: string;
    division_code: string;
    division_name_th: string;
    division_name_en: string;
    division_type: string;
    phone: string;
    email: string;
    address: string;
    division_name_th_short: string;
    parent_id: string | null;
    created_date?: string;
    updated_date?: string;
  }
  
  export interface DivisionFormData {
    division_code: string;
    division_name_th: string;
    division_name_en: string;
    division_type: string;
    phone: string;
    email: string;
    address: string;
    division_name_th_short: string;
    parent_id: string;
  }