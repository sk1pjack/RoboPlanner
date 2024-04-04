import { Component } from '@angular/core';
import { RobotService } from '../../services/robot.service';
import { Robot } from '../../models/classes.enum';
import { PerkService } from '../../services/perk.service';
import { Perk } from '../../models/perk.model';
import { NeutralPerkPipe } from '../../pipes/neutral-perk.pipe';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { ClassPerkPipe } from '../../pipes/class-perk.pipe';

@Component({
  selector: 'app-perk-display',
  standalone: true,
  imports: [NeutralPerkPipe, NgbPopoverModule, ClassPerkPipe],
  templateUrl: './perk-display.component.html',
  styleUrl: './perk-display.component.scss'
})
export class PerkDisplayComponent {
  private placeholderImageUrl = "assets/images/placeholder.jpg"
  selectedRobot: Robot | null;
  selectedClassPerks: Perk[] | null;
  selectedSupportPerks: Perk[] | null;
  selectedNeutralPerks: Perk[] | null;

  hasSelectedSupportPerks = (perk: Perk) => this.selectedSupportPerks?.map(supPerk => supPerk.supports).includes(perk.name);
  supportPerks = (perk: Perk) => this.selectedSupportPerks?.filter(selectedSupPerk => selectedSupPerk.supports === perk.name);

  constructor(robotService: RobotService, private perkService: PerkService) {
    robotService.selectedRobot$.subscribe(value => this.selectedRobot = value);
    perkService.selectedClassPerks$.subscribe(value => this.selectedClassPerks = value);
    perkService.selectedSupportPerks$.subscribe(value => this.selectedSupportPerks = value);
    perkService.selectedNeutralPerks$.subscribe(value => this.selectedNeutralPerks = value);
  }

  onPerkClick(index: number, perk: Perk): void {
    if (perk.type === "support") {
      this.perkService.removePerkByNameAndType(perk.name, "support")
      return
    }
    this.perkService.removePerk(index, perk);
    if(perk.type === "class") {
      this.removeSupportPerksFromClassPerk(perk);
    }
  }

  removeSupportPerksFromClassPerk(perk: Perk): void {
    perk.supportedBy?.forEach(supPerk => this.perkService.removePerkByNameAndType(supPerk.toString(), "support"))
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.placeholderImageUrl;
  }
}
