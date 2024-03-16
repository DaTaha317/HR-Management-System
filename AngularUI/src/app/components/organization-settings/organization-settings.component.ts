import { Component, OnInit } from '@angular/core';
import { IOrganizationSettings } from 'src/app/interfaces/IOrganizationSettings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.css']
})


export class OrganizationSettingsComponent implements OnInit{
  settings: IOrganizationSettings | undefined;

  constructor(private organization : SettingsService){}
  
  getSettings(){
    this.organization.GetOrganization().subscribe(
      (data : IOrganizationSettings) =>{
        this.settings = data
        console.log(data);
      } 
    );

  }

  onSubmit(): void{
    console.log("data after update" + this.settings?.commissionDTO.type);
    this.organization.UpdateOrganization(this.settings as IOrganizationSettings).subscribe(
      (response) => {
        console.log(' added successfully:', response);

        // this.getSettings();
      },
      (error) => {
        console.error('Error ', error);
      }
    )
  }
  ngOnInit(): void {
    this.getSettings();
  }




}
