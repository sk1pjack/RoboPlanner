/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PerkService } from './perk.service';

describe('Service: Perk', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerkService]
    });
  });

  it('should ...', inject([PerkService], (service: PerkService) => {
    expect(service).toBeTruthy();
  }));
});
