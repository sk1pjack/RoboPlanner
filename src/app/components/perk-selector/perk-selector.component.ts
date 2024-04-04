import { Component } from '@angular/core';
import { RobotService } from '../../services/robot.service';
import { Robot } from '../../models/classes.enum';
import jsonCommonPerks from '../../../assets/perks/common.json';
import jsonCommandoPerks from '../../../assets/perks/Commando.json';
import { Perk } from '../../models/perk.model';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { ClassPerkPipe } from '../../pipes/class-perk.pipe';
import { NeutralPerkPipe } from '../../pipes/neutral-perk.pipe';
import { PerkService } from '../../services/perk.service';

@Component({
  selector: 'app-perk-selector',
  standalone: true,
  imports: [NgbPopoverModule, ClassPerkPipe, NeutralPerkPipe],
  templateUrl: './perk-selector.component.html',
  styleUrl: './perk-selector.component.scss'
})
export class PerkSelectorComponent {

  private placeholderImageUrl = "assets/images/placeholder.jpg";
  private PERK_TYPE_CLASS = "class";
  private PERK_TYPE_SUPPORT = "support";
  private PERK_TYPE_NEUTRAL = ["neutral", "common"];
  selectedRobot: Robot | null;
  selectedClassPerks: Perk[] | null;
  availableSupportPerks: Perk[] | null;
  selectedSupportPerks: Perk[] | null;
  commonPerks: Perk[];
  classPerks: Perk[];

  isPerkSelected = (perkName: string, perks: Perk[] | null) => perks?.map(perk => perk.name).includes(perkName);

  constructor(robotService: RobotService, private perkService: PerkService) {
    robotService.selectedRobot$.subscribe(value => {
      this.selectedRobot = value
      switch(value) {
        case Robot.Commando:
          this.classPerks = jsonCommandoPerks as Perk[];
          break;
        default:
          break;
      }
    });
    this.perkService.selectedClassPerks$.subscribe(value => {
      this.selectedClassPerks = value
      let supportPerks = this.selectedClassPerks?.flatMap(perk => perk.supportedBy);
      this.availableSupportPerks = this.classPerks?.filter(perk => supportPerks?.includes(perk.name));
    });
    this.perkService.selectedSupportPerks$.subscribe(value => this.selectedSupportPerks = value);
    this.commonPerks = jsonCommonPerks as Perk[];
  }

  onPerkClick(perk: Perk): void {
    if (this.checkForClass(perk) || this.PERK_TYPE_NEUTRAL.includes(perk.type) || this.checkForSupport(perk)) {
        this.perkService.addPerk(perk);
    }
}

  checkForClass(perk: Perk): boolean {
    return perk.type === this.PERK_TYPE_CLASS &&
    (!this.selectedClassPerks || this.selectedClassPerks.length < 4) &&
    !this.selectedClassPerks?.some(p => p.name === perk.name);
  }

  checkForSupport(perk: Perk): boolean {
    return perk.type === this.PERK_TYPE_SUPPORT &&
    !this.selectedSupportPerks?.some(p => p.name === perk.name);
  }


  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.placeholderImageUrl;
  }

}
