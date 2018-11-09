import { Component, OnInit, ViewChild } from '@angular/core';
import $ from 'jquery';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { DataServiceService } from '../../services/data-service.service';
import { RestApiService } from '../../services/rest-api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';


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
  onboardData=new HttpResponse;

  empForm: NgForm;


  data: any;
  cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  public phonemask: Array<string | RegExp>;
  public ssnmask: Array<string | RegExp>;
  public datemask: Array<string | RegExp>;

  constructor(private rest: RestApiService, private router: Router, private dataService: DataServiceService, private datePipe: DatePipe, private http: HttpClient) {
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

    const formData = new FormData();
    formData.append('firstName', JSON.stringify(this.firstName));
    formData.append('middleName', this.middleName);
    formData.append('lastName', this.lastName);
    formData.append('legalName', this.legalName);
    formData.append('emailId', this.emailId);
    formData.append('mobileNumber', this.mobileNumber);
    formData.append('ssn', this.ssn);
    formData.append('dateOfBirth', this.dateOfBirth);
    formData.append('gender', this.gender);
    formData.append('profileImage', JSON.stringify(this.profileImage));
    formData.append('primaryEmail', this.primaryEmail);
    formData.append('secondaryEmail', this.secondaryEmail);
    formData.append('homePhoneNumber', this.homePhoneNumber);
    formData.append('workPhoneNumber', this.workPhoneNumber);
    formData.append('primaryContact', this.primaryContact);
    formData.append('primaryContactRelation', this.primaryContactRelation);
    formData.append('primaryContactPhone', this.primaryContactPhone);
    formData.append('primaryContactAltPhone', this.primaryContactAltPhone);
    formData.append('secondaryContact', this.secondaryContact);
    formData.append('secondaryContactRelation', this.secondaryContactRelation);
    formData.append('secondaryContactPhone', this.secondaryContactPhone);
    formData.append('secondaryContactAltPhone', this.secondaryContactAltPhone);
    formData.append('hireDate', this.hireDate);
    formData.append('terminationDate', this.terminationDate);
    formData.append('employmentLastDate', this.employmentLastDate);
    formData.append('clientName', this.clientName);
    formData.append('currentStatus', this.currentStatus);
    formData.append('jobTitle', this.jobTitle);
    formData.append('organisation', this.organisation);
    formData.append('department', this.department);
    formData.append('empSalary', this.empSalary);
    formData.append('employmentType', this.employmentType);
    formData.append('employmentStatus', this.employmentStatus);
    formData.append('reportingManager', this.reportingManager);
    formData.append('active', this.active);
    formData.append('profileImage', this.pathFile);

//    console.log(formData);
    const req = new HttpRequest('POST', 'http://localhost:8080/employee/create', formData, {
      reportProgress: true,
      responseType: 'text'
    }
    );

    await this.rest.postForm('http://localhost:8080/employee/create', formData).subscribe(res => { this.onboardData = res, console.log(this.onboardData.body) }, error => { console.log(error) });
    if (this.onboardData.body != null) {

//      console.log('hi');
//      console.log(this.onboardData.body);
    }
  }
 

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
