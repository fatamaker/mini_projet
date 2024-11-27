import { Component ,OnInit } from '@angular/core';
import { Formation } from '../model/formation.model';
import { FormationService } from '../service/formation.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.css'
})
export class FormationComponent implements OnInit {
  formations ? : Formation [];
  
  constructor(private formationService:  FormationService , public authService: AuthService) {
    
  }
 /*  ngOnInit(): void{
    this.formations = this.formationService.listeFormation();

  } */
    ngOnInit(): void { 
      this.formationService.listeFormation().subscribe((chans) => {
        console.log(chans);
        this.formations = chans;
        this.chargerFormations();
      }); 
      
    } 

/* supprimerFormation(f: Formation)
{

let conf = confirm("Etes-vous sûr ?");
if (conf)
this.formationService.supprimerFormation(f);
} */

chargerFormations(){ 
  this.formationService.listeFormation().subscribe(prods => { 
    console.log(prods); 
    this.formations = prods; 
  });  
} 

supprimerFormation(p: Formation) 
  { 
    let conf = confirm("Etes-vous sûr ?"); 
    if (conf) 
    this.formationService.supprimerFormation(p.idFormation!).subscribe(() => { 
      console.log("formation supprimé"); 
      this.chargerFormations(); 
         }); 
  } 

}
