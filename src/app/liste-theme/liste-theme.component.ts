import { FormationService } from './../service/formation.service';
import { Component ,OnInit } from '@angular/core';
import { Theme } from '../model/theme.model';

@Component({
  selector: 'app-liste-theme',
  templateUrl: './liste-theme.component.html',
  
})

export class ListeThemeComponent implements OnInit{
  themes!: Theme[];
 

  updatedThm: Theme = { idTheme: 0, nomTheme: '' };
  ajout: boolean = true;

  constructor(private FormationService: FormationService) {}
  ngOnInit(): void {
    this.FormationService.listerTheme(). 
subscribe(cats => {this.themes = cats._embedded.themes; 
console.log(cats); 
}); 
    
  }


  ajouterTheme(nouveauTheme: Theme): void {
    this.FormationService.ajouterTheme(nouveauTheme);
    this.chargerTheme(); // Actualise l'affichage de la liste après l'ajout
  }

  ThemeUpdated(theme: Theme) {
    console.log('Équipe reçue du composant updatedequipe:', theme);
    
   /*  if (this.ajout) {
      this.FormationService.ajouterTheme(theme);
    } else {
      this.FormationService.mettreAJourTheme(theme);
      this.ajout = true; 
    }
    this.chargerTheme(); */
    this.FormationService.ajouterTheme(theme).subscribe(()=> this.chargerTheme());
    
  }

/*   chargerTheme(): void {
    this.themes = this.FormationService.listerTheme();
    console.log(this.themes);
  } */

    chargerTheme(): void {
    
      this.FormationService.listerTheme().subscribe((f) => {
        console.log(f);
        this.themes = f._embedded.themes;
      });
      console.log(this.themes);

    }
    

/*   updateTheme(theme: Theme) {
    this.updatedThm = theme;
    this.ajout = false;
  }
 */
  updateCat(cat: Theme) {
    console.log("Cat updated event", cat); // Journal pour déboguer
    this.FormationService.updateCategorie(cat) // Appel API pour mettre à jour la catégorie
      .subscribe(
        () => {
          this.chargerTheme(); // Recharge la liste des catégories après mise à jour
          this.ajout = false; // Cache le formulaire d'ajout
          console.log("Catégorie mise à jour avec succès");
        },
        (error) => {
          console.error("Erreur lors de la mise à jour de la catégorie", error);
        }
      );
  }

  
}


