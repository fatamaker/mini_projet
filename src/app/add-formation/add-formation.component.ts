import { FormationService } from './../service/formation.service';
import { Theme } from './../model/theme.model';
import { Component ,OnInit } from '@angular/core';
import { Formation } from '../model/formation.model';

import { Router } from '@angular/router';


@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrl: './add-formation.component.css'
})
export class AddFormationComponent implements OnInit {
  newFormation= new Formation();
  themes! : Theme[];
  newIdThem! : number;
  newTheme! : Theme;

  constructor(private formationService:  FormationService , private router :Router,){
    
  }


  
  ngOnInit(): void {

    this.formationService.listerTheme().subscribe((f) => {
      console.log(f)
      this.themes = f._embedded.themes;
    });
   
  }
        
  




 /*  addFormation(){
    //console.log(this.newFormation);
    this.newTheme=this.formationService.consulterTheme(this.newIdThem);
    this.newFormation.theme=this.newTheme;
    this.formationService.ajouterFormation(this.newFormation);
    this.router.navigate(['formation']);
    } */

    addFormation() {

      this.newFormation.theme= this.themes.find(
        (gen) => gen.idTheme == this.newIdThem
      )!;
      this.formationService.ajouterFormation(this.newFormation)
      .subscribe(f => { 
        console.log(f); 
        this.router.navigate(['formation']);
        }); 
    }

   


}



