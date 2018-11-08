import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { FileUploadModule } from 'ng2-file-upload';

import { UsersRoutingModule } from './users-routing.module';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';

import { DataService } from './data.service';
import { RestApiService } from '../services/rest-api.service';
import { DataServiceService } from '../services/data-service.service';
import { ProfileComponent } from './profile/profile.component';
import { OnboardComponent } from './onboard/onboard.component';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ProfilePersonalComponent } from './profile/children/profile-personal/profile-personal.component';
import { JobDetailsComponent } from './profile/children/job-details/job-details.component';
import { CareerDetailsComponent } from './profile/children/career-details/career-details.component';
import { SocialDetailsComponent } from './profile/children/social-details/social-details.component';
import { CompensationDetailsComponent } from './profile/children/compensation-details/compensation-details.component';
import { BenefitsDetailsComponent } from './profile/children/benefits-details/benefits-details.component';
import { ImmigrationDetailsComponent } from './profile/children/immigration-details/immigration-details.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule,
    TextMaskModule,
    FormsModule,
    FileUploadModule,
    ImageCropperModule
  ],
  declarations: [HomeComponent, EmployeesComponent, ProfileComponent, OnboardComponent, ProfilePersonalComponent, JobDetailsComponent, CareerDetailsComponent, SocialDetailsComponent, CompensationDetailsComponent, BenefitsDetailsComponent, ImmigrationDetailsComponent, EditprofileComponent],
  providers: [DataService, RestApiService, DataServiceService]
})
export class UsersModule { }
