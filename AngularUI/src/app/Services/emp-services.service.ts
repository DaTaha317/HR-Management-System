import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from '../interfaces/IEmployee';
import { environment } from 'src/environments/environment';
import { ICountry } from '../interfaces/ICountry';


@Injectable({
  providedIn: 'root',
})
export class EmpServicesService {

  allCountriesList: string[] = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Rep", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo {Democratic Rep}", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland {Republic}", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar, {Burma}", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "St Kitts & Nevis", "St Lucia", "Saint Vincent & the Grenadines", "Samoa", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  addEmployee(employee: IEmployee): Observable<IEmployee> {
    
    return this.http.post<any>(`${this.baseUrl}/employee`, employee);
  }
  getEmployees() {
    return this.http.get(`${this.baseUrl}/employee`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/employee/${id}`);
  }
  getById(id: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.baseUrl}/employee/${id}`);
  }
  updateEmployee(id: number, employeeData: IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(
      `${this.baseUrl}/employee/${id}`,
      employeeData
    );
  }

}
