import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormationComponent } from './formation/formation.component';
import { AddFormationComponent } from './add-formation/add-formation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UpdateFormationComponent } from './update-formation/update-formation.component';
import { RechercheParThemeComponent } from './recherche-par-theme/recherche-par-theme.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListeThemeComponent } from './liste-theme/liste-theme.component';
import { UpdateThemeComponent } from './update-theme/update-theme.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormationComponent,
    AddFormationComponent,
  
    UpdateFormationComponent,
        RechercheParThemeComponent,
        RechercheParNomComponent,
        SearchFilterPipe,
        LoginComponent,
        ForbiddenComponent,
        ListeThemeComponent,
        UpdateThemeComponent,
        UpdateThemeComponent,
        
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
