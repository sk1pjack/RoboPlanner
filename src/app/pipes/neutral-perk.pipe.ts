import { Pipe, PipeTransform } from '@angular/core';
import { Perk } from '../models/perk.model';

@Pipe({
  name: 'filterNeutralPerks',
  standalone: true,
  pure: false
})
export class NeutralPerkPipe implements PipeTransform {

  private perkTypeNeutral: string = "neutral";
  private perkTypeCommon: string = "common";

  transform(perks: Perk[] | null, args?: any): any {
    if (!perks) {
      return perks;
    }
    return perks.filter(perk => (perk.type === this.perkTypeNeutral) ||  (perk.type === this.perkTypeCommon));
  }

}
