import { Component, OnInit } from '@angular/core';
import { Formation } from '../model/formation.model';
import { FormationService } from '../service/formation.service';


@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit {
  nomFormation!: string;
  formations!: Formation[];       
  allFormations!: Formation[]; 
  searchTerm! : string
  
  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
   
  /*   this.formations = this.formationService.listeFormation();
    this.allFormations = this.formations; */

    this.formationService.listeFormation().subscribe((chans) => {
      console.log(chans);
      this.allFormations = chans;
      this. formations = chans; // Pour que le tableau soit affiché par défaut
    });
    
    
  }
 
   onKeyUp(filterText : string){
    
    this.formations = this.allFormations.filter(item =>
    item.nomFormation!.toLowerCase().includes(filterText.toLowerCase()));
    }
   
}
