export interface ScheduleRoom {
  subjek: {
    seksyen: number;
    kod_subjek: string;
  };
  tarikh_tamat: string;
  catatan: string;
  tarikh_mula: string;
  hari: string;
  masa: string;
  id_jws: number;
  kod_perkara: string;
}
