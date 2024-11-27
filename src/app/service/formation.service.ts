import { Theme } from './../model/theme.model';
import { Injectable } from '@angular/core';
import { Formation } from '../model/formation.model';
import {  Observable } from 'rxjs';
import { ThemeWrapper } from '../model/ThemeWrapped.model';

import { HttpClient, HttpHeaders } from '@angular/common/http'; 
const httpOptions = {  headers: new HttpHeaders( {'Content-Type': 'application/json'} ) 
}; 

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  formations ! : Formation [];
  themes!:Theme[];
  formationRecherche!: Formation[];

  apiURLCat: string = 'http://localhost:5000/Formations/thm';
  
  apiUrl: string = 'http://localhost:5000/Formations/api';
 

  constructor(private http: HttpClient) {
      /*this.themes =[{idTheme :1 ,nomTheme:"Informatique et technologie"},
                 {idTheme :2 ,nomTheme:"Marketing et communication"},
                 {idTheme :3 ,nomTheme:"Création artistique et design"}
    ]
    this.formations = [  { idFormation: 1, nomFormation: "Formation Développement Web", prixFormation: 1000, datedebut: new Date("2025-06-01"), datefin: new Date("2025-03-31"), modeFormation: "en ligne", theme:{idTheme :1 ,nomTheme:"Informatique et technologie"} },
      { idFormation: 2, nomFormation: "Développeur Front End - React JS", prixFormation: 500, datedebut: new Date("2025-10-02"), datefin: new Date("2025-05-10"), modeFormation: "en ligne" ,theme:{idTheme :1 ,nomTheme:"Informatique et technologie"}},
      { idFormation: 3, nomFormation: "Formation UX UI Design", prixFormation: 600, datedebut: new Date("2025-07-06"), datefin: new Date("2025-08-25"), modeFormation: "En personne",theme:{idTheme :3 ,nomTheme:"Création artistique et design"} },
      { idFormation: 4, nomFormation: "Formation Design Graphique", prixFormation: 450, datedebut: new Date("2025-07-24"), datefin: new Date("2025-09-15"), modeFormation: "en ligne" ,theme:{idTheme :3 ,nomTheme:"Création artistique et design"}}
    ];*/

  }
 /*  listeFormation():Formation[] {
    return this.formations;
} */
    
  listeFormation(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.apiUrl);
  } 

getAllFormations(): Formation[] {
  return this.formations;
}
/* ajouterFormation( form: Formation){
this.formations.push(form);
} */
ajouterFormation(f: Formation): Observable<Formation> {
 
  return this.http.post<Formation>(this.apiUrl,f, httpOptions); 
}
/* supprimerFormation( form: Formation){
 
  const index = this.formations.indexOf(form, 0);
  if (index > -1) {
  this.formations.splice(index, 1);
  }
 
  }
  consulterformation(id: number): Formation {
    return this.formations.find(f => f.idFormation == id)!;
     
} */

    supprimerFormation(id : number) { 
      const url = `${this.apiUrl}/${id}`; 
       return this.http.delete(url, httpOptions); 
           } 


trierFormation(){
  this.formations = this.formations.sort((n1,n2) => {
  if (n1.idFormation! > n2.idFormation!) {
  return 1;
  }
  if (n1.idFormation! < n2.idFormation!) {
  return -1;
  }
  return 0;
  });
  }
  /* updateFormation(f:Formation)
  {

  this.supprimerFormation(f);
  this.ajouterFormation(f);
  this.trierFormation();
  } */

  updateFormation(f:Formation) : Observable<Formation> 
{   
return this.http.put<Formation>(this.apiUrl,f, httpOptions); 
} 

  consulterFormation(id: number): Observable<Formation> { 
    const url = `${this.apiUrl}/${id}`; 
    return this.http.get<Formation>(url); 
    }
  

 /*  listerTheme():Theme[]
  {
    return this.themes;
  } */

    listerTheme():Observable<ThemeWrapper> {
        return  this.http.get<ThemeWrapper>(this.apiURLCat);
      }
    
    
    
  consulterTheme(id :number):Theme{
    return this.themes.find(them => them.idTheme == id)!;
  }
  rechercherParTheme(idTheme: number): 
    Observable<Formation[]> {
      const url = `${this.apiUrl}/formthem/${idTheme}`;
      return this.http.get<Formation[]>(url);

  
    }


    rechercherParNom(nom: string): Observable<Formation[]> {
      const url = `${this.apiUrl}/formsByName/${nom}`;
      return this.http.get<Formation[]>(url);
    }

   /*  ajouterTheme(Theme: Theme): Theme {
      const newId =
        this.themes.length > 0
          ? Math.max(...this.themes.map((thm) => thm.idTheme ?? 0)) + 1
          : 1;
      Theme.idTheme = newId;
      this.themes.push(Theme);
      return Theme ;
    } */
    
    
      ajouterTheme(cat: Theme):Observable<Theme>{ 
 /*  const id = this.themes.length +1
  cat.idTheme=id;
  this.themes.push({...cat}); // ... pour faire un copie de objet cat
  return cat; */
  return this.http.post<Theme>(this.apiURLCat, cat, httpOptions); 
}
      
mettreAJourTheme(theme: Theme): void {
  const index = this.themes.findIndex((g) => g.idTheme=== theme.idTheme);
  if (index !== -1) {
    this.themes[index] = theme;
  }
}
 

updateCategorie(cat:Theme): Observable<void> {
  const url = `${this.apiUrl}/${cat.idTheme}`; // Assurez-vous que `id` est une propriété existante
  return this.http.put<void>(url, cat);
}

}
