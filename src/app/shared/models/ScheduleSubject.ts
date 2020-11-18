export interface ScheduleSubject {
  sesi: string;
  semester: number;
  kod_subjek: string;
  seksyen: number;
  dailySchedule: Array<{
    ruang: {
      kod_ruang: string;
      nama_ruang_singkatan: string;
      nama_ruang: string;
    };
    hari: number;
    masa: number;
    seksyen: number;
    kod_subjek: string;
    id_jws: string;
  }>;
}
