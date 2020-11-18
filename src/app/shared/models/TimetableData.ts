export interface TimetableData {
  slots: Array<{
    day: number;
    timeSlot: number;
    data: string;
  }>;
}
