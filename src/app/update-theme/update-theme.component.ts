import { Theme } from './../model/theme.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-update-theme',
  templateUrl: './update-theme.component.html',
  styles: [],
})
export class UpdateThemeComponent {
  @Input()
  theme!: Theme;
  @Input()
  ajout!: boolean;
  @Output()
  themeUpdated = new EventEmitter<Theme>();
  constructor() {}
  ngOnInit(): void {
    console.log('ngOnInit du composant UpdateCategorie ', this.theme);
  }
  saveGenre() {
    this.themeUpdated.emit(this.theme);
  }
  
}
