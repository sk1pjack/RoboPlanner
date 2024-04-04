import { Component } from '@angular/core';
import { ClassComponent } from '../class/class.component';
import { Robot } from '../../models/classes.enum';
import { RobotService } from '../../services/robot.service';
import { PerkService } from '../../services/perk.service';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [ClassComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {
  guardian = Robot.Guardian;
  commando = Robot.Commando;
  recon = Robot.Recon;
  ranger = Robot.Ranger;
  engineer = Robot.Engineer;
  elementalist = Robot.Elementalist;

  selectedRobot: Robot | null;

  constructor(private robotService: RobotService, private perkService: PerkService) {
    robotService.selectedRobot$.subscribe(value => this.selectedRobot = value);
  }

  removeClick() {
    this.robotService.setSelectedRobot(null);
    this.perkService.removeAllPerks();
  }
}

