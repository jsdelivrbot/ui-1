import { Component, OnInit, ViewChild } from '@angular/core';
import $ from 'jquery';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { DataServiceService } from '../../services/data-service.service';
import { RestApiService } from '../../services/rest-api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpRequest, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent implements OnInit {

  firstName = '';
  middleName = '';
  lastName = '';
  legalName = '';
  emailId = '';
  mobileNumber = '';
  ssn = '';
  dateOfBirth = '';
  gender = '';
  profileImage = '';
  primaryEmail = '';
  secondaryEmail = '';
  homePhoneNumber = '';
  workPhoneNumber = '';
  primaryContact = '';
  primaryContactRelation = '';
  primaryContactPhone = '';
  primaryContactAltPhone = '';
  secondaryContact = '';
  secondaryContactRelation = '';
  secondaryContactPhone = '';
  secondaryContactAltPhone = '';
  hireDate = '';
  terminationDate = '';
  employmentLastDate = '';
  clientName = '';
  currentStatus = '';
  jobTitle = '';
  organisation = '';
  department = '';
  empSalary = '';
  employmentType = '';
  employmentStatus = '';
  reportingManager = '';
  active = '';
  pathFile: File;
  input=new FormData();


  empForm: NgForm;


  data: any;
  cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  public phonemask: Array<string | RegExp>;
  public ssnmask: Array<string | RegExp>;
  public datemask: Array<string | RegExp>;

  constructor(private rest: RestApiService, private router: Router, private dataService: DataServiceService, private datep: DatePipe, private http: HttpClient) {
    this.phonemask = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    this.ssnmask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    this.datemask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.noFileInput = true;

    this.data = {};
  }


  // async saveOnboard() {
  //   try {
  //     const dataService = await this.rest.post('http://localhost:8080/employee/addNewEmployee', {
  //       firstName: this.firstName,
  //       middleName: this.middleName,
  //       lastName: this.lastName,
  //       legalName: this.legalName,
  //       emailid: this.emailid,
  //       mobileNumber: this.mobileNumber,
  //       ssn: this.ssn,
  //       dateOfBirth: this.dateOfBirth,
  //       gender: this.gender
  //     },);
  //     if (dataService['success']) {
  //       this.dataService.success(dataService['message']);
  //     } else {
  //       this.dataService.error(dataService['message']);
  //     }
  //   } catch{
  //     this.dataService.error(['message']);
  //   }
  // }


  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
   // var myWritet: FileWriter = new FileWriter();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
      that.pathFile=file;
    };


    myReader.readAsDataURL(file);
    
    
  }

  async saveOnboard() {

     const input1 = new FormData();
     var dto={
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      legalName: this.legalName,
      emailId: this.emailId,
      mobileNumber: this.mobileNumber,
      ssn: this.ssn,
      dateOfBirth: this.datep.transform(this.dateOfBirth,"yyyy-MM-dd"),
      gender: this.gender,
     
      primaryEmail : this.primaryEmail,
      secondaryEmail : this.secondaryEmail,
      homePhoneNumber : this.homePhoneNumber,
      workPhoneNumber : this.workPhoneNumber,
      primaryContact : this.primaryContact,
      primaryContactRelation : this.primaryContactRelation,
      primaryContactPhone : this.primaryContactPhone,
      primaryContactAltPhone : this.primaryContactAltPhone,
      secondaryContact : this.secondaryContact,
      secondaryContactRelation : this.secondaryContactRelation,
      secondaryContactPhone : this.secondaryContactPhone,
      secondaryContactAltPhone : this.secondaryContactAltPhone,
      hireDate : this.datep.transform(this.hireDate,"yyyy-MM-dd"),
      terminationDate : this.datep.transform(this.terminationDate,"yyyy-MM-dd"),
      employmentLastDate : this.datep.transform(this.employmentLastDate,"yyyy-MM-dd"),
      client : this.clientName,
      currentStatus : this.currentStatus,
      jobTitle : this.jobTitle,
      organisation : this.organisation,
      department : this.department,
      empSalary : this.empSalary,
      employmentType : this.employmentType,
      employmentStatus : this.employmentStatus,
      reportingManager : this.reportingManager,
      active : this.active
    };

    input1.append('dto',JSON.stringify(dto));
    input1.append('profileImage',this.pathFile);
    
console.log(input1);
const req = new HttpRequest('POST', 'http://localhost:8080/employee/create', input1, {
  reportProgress: true,
  responseType: 'text'
}
);

    const onboardData = await this.http.request(req).subscribe(res=>{console.log(onboardData)});
    if (onboardData['success']) {
      this.dataService.success(this.dataService['message']);
      //var myReader: FileReader = new FileReader();
     // Blob y=new Blob(onboardData['pathfile']);
      
     // this.data1.image=onboardData['pathfile'];
     console.log("hi");
      console.log(onboardData);
    } else {
      this.dataService.error(this.dataService['message']);
      console.log(onboardData);
    }
  }
 

   // enter code here

 

  ngOnInit() {
    $(document).ready(function () {
      var navListItems = $('div.setup-panel div a'),
        allWells = $('.panel-content'),
        allNextBtn = $('.nextBtn');
      allWells.hide();
      navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
          $item = $(this);
        if (!$item.hasClass('disabled')) {
          navListItems.removeClass('panel-active').addClass('btn-default');
          $item.addClass('panel-active');
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
        }
      });
      allNextBtn.click(function () {
        var curStep = $(this).closest(".panel-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url']"),
          isValid = true;
        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
          if (!curInputs[i].validity.valid) {
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
          }
        }
        if (isValid)
          nextStepWizard.removeAttr('disabled').trigger('click');
      });
      $('div.setup-panel div a.panel-active').trigger('click');
    });
    $(document).ready(function () {
      $('input[type="file"]').change(function () {
        var value = $("input[type='file']").val();
        $('.js-value').text(value);
      });
    });

  }


}
