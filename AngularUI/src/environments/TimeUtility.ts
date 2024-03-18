export class TimeUtility {
  static formatTime(timeValue: string): string {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeValue.split(':');

    // Format the time in HH:mm:ss format
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  }
}
