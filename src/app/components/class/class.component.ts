import { Component, Input } from '@angular/core';
import { Robot } from '../../models/classes.enum';
import { RobotService } from '../../services/robot.service';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss'
})
export class ClassComponent {
  
  @Input() robot: Robot;

  constructor(private robotService: RobotService) { }

  selectClass() {
    this.robotService.setSelectedRobot(this.robot);
  }

}
