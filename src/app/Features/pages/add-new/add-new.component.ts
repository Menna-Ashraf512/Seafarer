import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  IFillEmployee,
  IFillVendor,
} from '../../../shared/interface/ifill-employee';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.scss',
})
export class AddNewComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService,
    private _router:Router
  ) {
    this.userId = this.activatedRoute.snapshot.params['id'];
  }
  userId: string | null = null;
  isNone = false;
  steps = [1, 2, 3, 4, 5, 6];
  currentStep = 1;

  FillVendor: IFillVendor[] = [];
  FillEmployee: IFillEmployee[] = [];

  ngOnInit(): void {
    this.getFillEmployee();
    this.getFillVendor();

    if (this.userId) {
      this.loadDataForEdit();
    }
  }

  AddForm = new FormGroup({
    // Entity
    entity: new FormGroup({
      PassPortIssueDate: new FormControl(null),
      IDExPiryDate: new FormControl(null),
      SeamanBookNO: new FormControl(null),
      Remarks: new FormControl(null),
      EmpId: new FormControl(null),
      VisaSponsorId: new FormControl(null),
      NameOfSpouse: new FormControl(null),
      VisaIssueDate: new FormControl(null),
      VisaExpiryDate: new FormControl(null),
      NoOfChildren: new FormControl(null),
      BodyWeight: new FormControl(null),
      Height: new FormControl(null),
      VisaUAEIdNO: new FormControl(null),
      NearestAirport: new FormControl(null),
      ResidenceNumber: new FormControl(null),
      SkypeID: new FormControl(null),
      PermanentAddressHomeCountry: new FormControl(null),
      ContactNumberHomeCountry: new FormControl(null),
      ContactNameAndNumberDuringEmergenciesUAE: new FormControl(null),
      ContactNameAndNumberDuringEmergenciesHome: new FormControl(null),
      SeamanIssueDate: new FormControl(null),
      SeamanExpiryDate: new FormControl(null),
      CicpaNO: new FormControl(null),
      CicpaIssueDate: new FormControl(null),
      CicpaExpiryDate: new FormControl(null),
      Declaration: new FormControl(null),
      SignedOffFromAShipDueToMedicalReason: new FormControl(false),
      SignedOffFromAShipDueToMedicalReasonComment: new FormControl(''),
      UndergoneAnyMdicalOperation: new FormControl(null),
      UndergoneAnyMdicalOperationComment: new FormControl(null),
      DoctorConsultation: new FormControl(null),
      DoctorConsultationComment: new FormControl(null),
      HealthOrDisabilityProblem: new FormControl(null),
      HHealthOrDisabilityProblemComment: new FormControl(null),
      InquiryOrInvolvedMaritimeAccident: new FormControl(null),
      InquiryOrInvolvedMaritimeAccidentComment: new FormControl(null),
      LicenseSuspendedOrRevoked: new FormControl(null),
      LicenseSuspendedOrRevokedComment: new FormControl(null),
    }),

    //Reference
    References: new FormArray([this.createReferenceGroup()]),

    // Qualifications
    Qualifications: new FormArray([this.createQualificationGroup()]),

    // Certificate
    Certificates: new FormArray([this.createCertificateGroup()]),

    // WorkExperience
    WorkExperiences: new FormArray([this.createWorkExperienceGroup()]),

    // Language
    Languages: new FormArray([this.createLanguageGroup()]),
  });

  //---------------------------------------------------------//
  // handel FormArray

  //Qualification
  createQualificationGroup(): FormGroup {
    return new FormGroup({
      DegreeOrCourse: new FormControl(null),
      CourseIssueDate: new FormControl(null),
      ExpiryDate: new FormControl(null),
      MajorOrSubject: new FormControl(null),
      University: new FormControl(null),
      Country: new FormControl(null),
      Type: new FormControl(null),
    });
  }

  //Certificate
  createCertificateGroup(): FormGroup {
    return new FormGroup({
      Capacity: new FormControl(null),
      Regulation: new FormControl(null),
      ExpiryDate: new FormControl(null),
      IssueDate: new FormControl(null),
      IssuingAuthority: new FormControl(null),
      Limitations: new FormControl(null),
      Country: new FormControl(null),
      Type: new FormControl(null),
    });
  }

  //WorkExperience
  createWorkExperienceGroup(): FormGroup {
    return new FormGroup({
      VesselName: new FormControl(null),
      VesselType: new FormControl(null),
      Rank: new FormControl(null),
      From: new FormControl(null),
      To: new FormControl(null),
      GRT: new FormControl(null),
      BHP: new FormControl(null),
      CompanyName: new FormControl(null),
    });
  }

  //Language
  createLanguageGroup(): FormGroup {
    return new FormGroup({
      Capacity: new FormControl(null),
      Regulation: new FormControl(null),
      IssueDate: new FormControl(null),
      ExpiryDate: new FormControl(null),
      IssuingAuthority: new FormControl(null),
      Limitations: new FormControl(null),
      Country: new FormControl(null),
    });
  }

  //Reference
  createReferenceGroup(): FormGroup {
    return new FormGroup({
      PersonName: new FormControl(null),
      CompanyName: new FormControl(null),
      Country: new FormControl(null),
      Fax: new FormControl(null),
      EmailId: new FormControl(null),
    });
  }
  //---------------------------------------------------------//

  // add new formArray

  //qualifications
  get qualifications(): FormArray {
    return this.AddForm.get('Qualifications') as FormArray;
  }
  addQualification() {
    this.qualifications.push(this.createQualificationGroup());
  }

  //Certificates
  get Certificates(): FormArray {
    return this.AddForm.get('Certificates') as FormArray;
  }
  addCertificate() {
    this.Certificates.push(this.createCertificateGroup());
  }

  //WorkExperience
  get WorkExperiences(): FormArray {
    return this.AddForm.get('WorkExperiences') as FormArray;
  }
  addWorkExperience() {
    this.WorkExperiences.push(this.createWorkExperienceGroup());
  }

  //Language
  get Languages(): FormArray {
    return this.AddForm.get('Languages') as FormArray;
  }
  addLanguage() {
    this.Languages.push(this.createLanguageGroup());
  }

  //Reference
  get References(): FormArray {
    return this.AddForm.get('References') as FormArray;
  }
  addReference() {
    this.References.push(this.createReferenceGroup());
  }

  //---------------------------------------------------------//

  setStep(step: number) {
    this.currentStep = step;
  }

  sendForm(AddForm: any) {
    this.usersService.AddNew(AddForm.value).subscribe({
      next: (res) => {
        this._toastrService.success(res.ErrorMessage, 'Done');
      },
      error: (err) => {
        this._toastrService.error('Sorry!', err.ErrorMessage);
      },
      complete:()=>{
        this._router.navigate(['/dashboard/seafarerList'])
      }
    });
  }

  getFillEmployee() {
    this.usersService.FillEmployee().subscribe({
      next: (res) => {
        this.FillEmployee = res;
      },
    });
  }

  getFillVendor() {
    this.usersService.FillVendor().subscribe({
      next: (res) => {
        this.FillVendor = res;
      },
    });
  }

  loadDataForEdit() {
    this.usersService.getAllSeafarers().subscribe({
      next: (data: any) => {
        const allUsers = data?.Data;
        const userId = Number(this.userId);
        if (!Array.isArray(allUsers)) {
          this._toastrService.error('Sorry!', 'Invalid data format');
          return;
        }

        const selectedUser = allUsers.find((user: any) => user?.Id === userId);

        if (!selectedUser) {
          this._toastrService.error(
            'Sorry!',
            `No user found with Id:${userId}`
          );
          return;
        }

        // Patch entity data
        this.AddForm.patchValue({
          entity: {
            PassPortIssueDate: selectedUser.PassPortIssueDate,
            IDExPiryDate: selectedUser.IDExPiryDate,
            SeamanBookNO: selectedUser.SeamanBookNO,
            Remarks: selectedUser.Remarks,
            EmpId: selectedUser.EmpId,
            VisaSponsorId: selectedUser.VisaSponsorId,
            NameOfSpouse: selectedUser.NameOfSpouse,
            VisaIssueDate: selectedUser.VisaIssueDate,
            VisaExpiryDate: selectedUser.VisaExpiryDate,
            NoOfChildren: selectedUser.NoOfChildren,
            BodyWeight: selectedUser.BodyWeight,
            Height: selectedUser.Height,
            VisaUAEIdNO: selectedUser.VisaUAEIdNO,
            NearestAirport: selectedUser.NearestAirport,
            ResidenceNumber: selectedUser.ResidenceNumber,
            SkypeID: selectedUser.SkypeID,
            PermanentAddressHomeCountry:
              selectedUser.PermanentAddressHomeCountry,
            ContactNumberHomeCountry: selectedUser.ContactNumberHomeCountry,
            ContactNameAndNumberDuringEmergenciesUAE:
              selectedUser.ContactNameAndNumberDuringEmergenciesUAE,
            ContactNameAndNumberDuringEmergenciesHome:
              selectedUser.ContactNameAndNumberDuringEmergenciesHome,
            SeamanIssueDate: selectedUser.SeamanIssueDate,
            SeamanExpiryDate: selectedUser.SeamanExpiryDate,
            CicpaNO: selectedUser.CicpaNO,
            CicpaIssueDate: selectedUser.CicpaIssueDate,
            CicpaExpiryDate: selectedUser.CicpaExpiryDate,
            Declaration: selectedUser.Declaration,
            SignedOffFromAShipDueToMedicalReason:
              selectedUser.SignedOffFromAShipDueToMedicalReason,
            SignedOffFromAShipDueToMedicalReasonComment:
              selectedUser.SignedOffFromAShipDueToMedicalReasonComment,
            UndergoneAnyMdicalOperation:
              selectedUser.UndergoneAnyMdicalOperation,
            UndergoneAnyMdicalOperationComment:
              selectedUser.UndergoneAnyMdicalOperationComment,
            DoctorConsultation: selectedUser.DoctorConsultation,
            DoctorConsultationComment: selectedUser.DoctorConsultationComment,
            HealthOrDisabilityProblem: selectedUser.HealthOrDisabilityProblem,
            HHealthOrDisabilityProblemComment:
              selectedUser.HHealthOrDisabilityProblemComment,
            InquiryOrInvolvedMaritimeAccident:
              selectedUser.InquiryOrInvolvedMaritimeAccident,
            InquiryOrInvolvedMaritimeAccidentComment:
              selectedUser.InquiryOrInvolvedMaritimeAccidentComment,
            LicenseSuspendedOrRevoked: selectedUser.LicenseSuspendedOrRevoked,
            LicenseSuspendedOrRevokedComment:
              selectedUser.LicenseSuspendedOrRevokedComment,
          },
        });

        const userCertificates =
          data.Certificates?.filter((c: any) => c.SeaFarerId === userId) || [];
        const userLanguages =
          data.Languages?.filter((l: any) => l.SeaFarerId === userId) || [];
        const userReferences =
          data.References?.filter((r: any) => r.SeaFarerId === userId) || [];
        const userWorkExperiences =
          data.WorkExperiences?.filter((w: any) => w.SeaFarerId === userId) ||
          [];
        const userQualifications =
          data.QualificationDetails?.filter(
            (q: any) => q.SeaFarerId === userId
          ) || [];

        this.patchFormArray(
          this.qualifications,
          userQualifications ?? [],
          this.createQualificationGroup
        );
        this.patchFormArray(
          this.Certificates,
          userCertificates ?? [],
          this.createCertificateGroup
        );
        this.patchFormArray(
          this.WorkExperiences,
          userReferences ?? [],
          this.createWorkExperienceGroup
        );
        this.patchFormArray(
          this.Languages,
          userWorkExperiences ?? [],
          this.createLanguageGroup
        );
        this.patchFormArray(
          this.References,
          userLanguages ?? [],
          this.createReferenceGroup
        );
      },
      error: (err: any) => {
        this._toastrService.error('Sorry!', `Error loading data:${err}`);
      },
    });
  }

  patchFormArray(
    formArray: FormArray,
    dataArray: any[],
    createGroupFn: () => FormGroup
  ) {
    formArray.clear();
    dataArray?.forEach((item) => {
      const group = createGroupFn();
      group.patchValue(item);
      formArray.push(group);
    });
  }
}
