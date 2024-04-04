import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerkDisplayComponent } from './perk-display.component';

describe('PerkDisplayComponent', () => {
  let component: PerkDisplayComponent;
  let fixture: ComponentFixture<PerkDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerkDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerkDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
