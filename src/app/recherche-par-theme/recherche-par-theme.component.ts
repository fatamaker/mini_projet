import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from '../model/formation.model';
import { FormationService } from '../service/formation.service';
import { Theme } from '../model/theme.model';

@Component({
  selector: 'app-recherche-par-theme',
  templateUrl: './recherche-par-theme.component.html',
  styles: ``
})
export class RechercheParThemeComponent implements OnInit {
  formations!: Formation[];
  themes!: Theme[];
  idTheme!: number;
  
  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
   private formationService : FormationService) { }

   ngOnInit(): void {
    
    this.formationService.listerTheme().subscribe((f) => {
      this.themes =f._embedded.themes;
      console.log(f);
    });


    
}

  onChange(){
    this.formationService.rechercherParTheme(this.idTheme).subscribe((f) => {
      this.formations =f;
    });
  }
  supprimerFormation(form: Formation) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.formationService.supprimerFormation(form.idFormation!).subscribe(() => {
        // Met à jour la liste des chansons après la suppression
        this.formations = this.formations.filter(
          (c) => c.idFormation !== form.idFormation
        );
        console.log('Chanson supprimée');
      });
    }
  }

}
