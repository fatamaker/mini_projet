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
    this.chargerTheme(); //this ONNE
    
  }


  ajouterTheme(nouveauTheme: Theme): void {
    this.FormationService.ajouterTheme(nouveauTheme);
    this.chargerTheme(); // Actualise l'affichage de la liste après l'ajout
  }


  ThemeUpdated(theme: Theme) {
    console.log('Équipe reçue du composant updatedequipe:', theme);
    this.FormationService.ajouterTheme(theme);
    this.chargerTheme();

    
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
    

  updateTheme(theme: Theme) {
    this.updatedThm = theme;
    this.ajout = false;
  }

  
}


