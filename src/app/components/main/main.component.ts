import { Component } from '@angular/core';
import { ClassesComponent } from '../classes/classes.component';
import { PerkDisplayComponent } from '../perk-display/perk-display.component';
import { PerkSelectorComponent } from '../perk-selector/perk-selector.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ClassesComponent, PerkDisplayComponent, PerkSelectorComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
