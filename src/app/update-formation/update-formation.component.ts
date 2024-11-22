import { Theme } from './../model/theme.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from '../model/formation.model';
import { FormationService } from '../service/formation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';


@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styles: []
})
export class UpdateFormationComponent implements OnInit {
  currentFormation = new Formation();
  themes: Theme[] = [];
  updatedThemId: number | undefined = 0;
  myForm!: FormGroup;
  public user = new User();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formationService: FormationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    //this.themes = this.formationService.listerTheme();

    this.formationService.listerTheme().subscribe((f) => {
      console.log(f);
      this.themes = f._embedded.themes;
    });
  
    
  
      this.formationService.consulterFormation(this.activatedRoute.snapshot.params['id']). 
      subscribe((f) => {
        this.currentFormation = f;
        }) ; 
      

  
    /* this.currentFormation = this.formationService.consulterFormation(this.activatedRoute.snapshot.params['id']);
    this.updatedThemId = this.currentFormation.theme?.idTheme || 0; */

    this.myForm = this.formBuilder.group({
      idFormation: [this.currentFormation.idFormation],
      nomFormation: [this.currentFormation.nomFormation, Validators.required],
      prixFormation: [this.currentFormation.prixFormation, Validators.required],
      datedebut: [this.currentFormation.datedebut, Validators.required],
      datefin: [this.currentFormation.datefin, Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      modeFormation: [this.currentFormation.modeFormation, Validators.required],
      idTheme: [this.updatedThemId, Validators.required]
    });


  }

  updateFormation() {
    /* if (this.myForm.valid) {
      this.currentFormation.theme = this.formationService.consulterTheme(this.updatedThemId);
      this.formationService.updateFormation(this.currentFormation);
      this.router.navigate(['formation']);
        ( error: any) => console.error('Error updating formation:', error)
      ;
    } */

      this.currentFormation.theme = this.themes!.find(
        (f) => f.idTheme == this.updatedThemId
      )!;

      this.formationService.updateFormation(this.currentFormation).subscribe((f) => { 
        this.router.navigate(['formations']); }  
        );
  }
  

  OnRegister() {
    console.log(this.user);
  }
}
