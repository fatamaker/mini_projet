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
  updatedThemId!: number;
  myForm!: FormGroup;
  idtheme!:number;
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
        this.updatedThemId=this.currentFormation.theme?.idTheme!;
        }) ; 
      

  
    /* this.currentFormation = this.formationService.consulterFormation(this.activatedRoute.snapshot.params['id']);
    this.updatedThemId = this.currentFormation.theme?.idTheme || 0; */

    this.myForm = this.formBuilder.group({
      idFormation: [''],
      nomFormation: ['', Validators.required],
      prixFormation: ['', Validators.required],
      datedebut: ['', Validators.required],
      datefin: ['', Validators.required],
      modeFormation: ['', Validators.required],
      Theme: ['', Validators.required],
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
        this.router.navigate(['formation']); }  
        );
  }
  

  OnRegister() {
    console.log(this.user);
  }
}
