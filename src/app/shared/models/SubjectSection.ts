export interface SubjectSection {
  nama_subjek: string;
  kod_subjek: string;
  seksyen_list: Array<{
    pensyarah: string;
    seksyen: number;
    bil_pelajar: number;
  }>;
  bil_seksyen: number;
  bil_pelajar: number;
  bil_pensyarah: number;
}
