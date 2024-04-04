import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Perk } from '../models/perk.model';

@Injectable({
  providedIn: 'root'
})
export class PerkService {

  private selectedPerks = new BehaviorSubject<Perk[] | null>([]);
  private selectedClassPerks = new BehaviorSubject<Perk[] | null>([]);
  private selectedSupportPerks = new BehaviorSubject<Perk[] | null>([]);
  private selectedNeutralPerks = new BehaviorSubject<Perk[] | null>([]);
  selectedPerks$ = this.selectedPerks.asObservable();
  selectedClassPerks$ = this.selectedClassPerks.asObservable();
  selectedSupportPerks$ = this.selectedSupportPerks.asObservable();
  selectedNeutralPerks$ = this.selectedNeutralPerks.asObservable();

  constructor() { }

  addPerk(perk: Perk) {
    this.addToBehaviorSubject(this.retrieveBehaviorSubject(perk.type), perk)
  }

  removePerk(index: number, perk: Perk) {
    this.removeFromBehaviorSubject(this.retrieveBehaviorSubject(perk.type), index)
  }

  removePerkByNameAndType(name: string, type: string) {
    this.removeFromBehaviorSubjectByName(this.retrieveBehaviorSubject(type), name)
  }

  private removeFromBehaviorSubject(behavSub: BehaviorSubject<Perk[] | null>, index: number): void {
    const currentPerks = behavSub.getValue();
    if (currentPerks !== null) {
      currentPerks.splice(index, 1);
      behavSub.next(currentPerks);
    }
  } 

  
  private removeFromBehaviorSubjectByName(behavSub: BehaviorSubject<Perk[] | null>, name: string): void {
    const currentPerks = behavSub.getValue();
    if (currentPerks?.map(perks => perks.name).includes(name)) {
      behavSub.next(currentPerks.filter(perk => perk.name !== name));
    }
  } 

  private addToBehaviorSubject(behavSub: BehaviorSubject<Perk[] | null>, perk: Perk) {
    const currentPerks = behavSub.getValue();
    if (currentPerks !== null) {
      const newPerks= [...currentPerks, perk]
      behavSub.next(newPerks)
    } else {
      behavSub.next([perk]);
    }
  }

  removeAllPerks(): void {
    this.selectedClassPerks.next([]);
    this.selectedNeutralPerks.next([]);
    this.selectedSupportPerks.next([]);
  }

  private retrieveBehaviorSubject(type: String): BehaviorSubject<Perk[] | null> {
    switch(type) {
      case "class":
        return this.selectedClassPerks
      case "support":
        return this.selectedSupportPerks
      case "neutral":
        return this.selectedNeutralPerks
      case "common":
        return this.selectedNeutralPerks
      default:
    }
    return new BehaviorSubject<Perk[] | null>(null);
  }

}
