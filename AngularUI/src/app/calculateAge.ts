export function calculateAge(birthDate: Date, currentDate: Date): number {
    const random = currentDate.getTime() - birthDate.getTime();
    const ageDate = new Date(random); 
    const age = Math.abs(ageDate.getUTCFullYear() - 1970); 
    return age;
  }