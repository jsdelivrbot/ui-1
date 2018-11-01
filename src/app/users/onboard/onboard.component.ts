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


     const input1 = new FormData();
     input1.append('firstName',JSON.stringify(this.firstName));
    input1.append('middleName',this.middleName);
    input1.append('lastName',this.lastName);
    input1.append('legalName',this.legalName);
    input1.append('emailId',this.emailId);
    input1.append('mobileNumber',this.mobileNumber);
    input1.append('ssn',this.ssn);
    input1.append('dateOfBirth',this.dateOfBirth);
    input1.append('gender',this.gender);
    input1.append('profileImage',JSON.stringify(this.profileImage));
    input1.append('primaryEmail',this.primaryEmail);
    input1.append('secondaryEmail',this.secondaryEmail);
    input1.append('homePhoneNumber',this.homePhoneNumber);
    input1.append('workPhoneNumber',this.workPhoneNumber);
    input1.append('primaryContact',this.primaryContact);
    input1.append('primaryContactRelation',this.primaryContactRelation);
    input1.append('primaryContactPhone',this.primaryContactPhone);
    input1.append('primaryContactAltPhone',this.primaryContactAltPhone);
    input1.append('secondaryContact',this.secondaryContact);
    input1.append('secondaryContactRelation',this.secondaryContactRelation);
    input1.append('secondaryContactPhone',this.secondaryContactPhone);
    input1.append('secondaryContactAltPhone',this.secondaryContactAltPhone);
    input1.append('hireDate',this.hireDate);
    input1.append('terminationDate',this.terminationDate);
    input1.append('employmentLastDate',this.employmentLastDate);
    input1.append('clientName',this.clientName);
    input1.append('currentStatus',this.currentStatus);
    input1.append('jobTitle',this.jobTitle);
    input1.append('organisation',this.organisation);
    input1.append('department',this.department);
    input1.append('empSalary',this.empSalary);
    input1.append('employmentType',this.employmentType);
    input1.append('employmentStatus',this.employmentStatus);
    input1.append('reportingManager',this.reportingManager);
    input1.append('active',this.active);

    
    input1.append('profileImage',this.pathFile);

    

    
console.log(input1);
const req = new HttpRequest('POST', 'http://localhost:8080/employee/create', input1, {
  reportProgress: true,
  responseType: 'text'
}
);

    
    await this.rest.postForm('http://localhost:8080/employee/create',input1).subscribe(res=>{this.onboardData=res, console.log(this.onboardData.body)},error=>{console.log(error)});
  if(this.onboardData.body!=null){
console.log('ji');
    console.log(this.onboardData.body);
  }
     
   // console.log("hi"+JSON.stringify(onboardData));
    // if(this.onboardData['data']){
    //   console.log("inside");
    // }
    // if (this.onboardData['success']) {
    //   this.dataService.success(this.dataService['message']);
    //   //var myReader: FileReader = new FileReader();
    //  // Blob y=new Blob(onboardData['pathfile']);
      
    //  // this.data1.image=onboardData['pathfile'];
    //  console.log("hi");
    //   console.log(this.onboardData);
    // } else {
    //   this.dataService.error(this.dataService['message']);
    //   console.log(this.onboardData);
    // }
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
