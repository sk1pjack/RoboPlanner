import { Pipe, PipeTransform } from '@angular/core';
import { Perk } from '../models/perk.model';

@Pipe({
  pure: false,
  standalone: true,
  name: 'filterClassPerks'
})
export class ClassPerkPipe implements PipeTransform {

  private perkType: string = "class";

  transform(perks: Perk[] | null, args?: any): any {
    if (!perks) {
      return perks;
    }
    return perks.filter(perk => perk.type === this.perkType);
  }

}
