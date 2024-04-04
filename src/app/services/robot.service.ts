import { Injectable } from '@angular/core';
import { Robot } from '../models/classes.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RobotService {

  private selectedRobotSubject = new BehaviorSubject<Robot | null>(null);
  selectedRobot$ = this.selectedRobotSubject.asObservable();

  constructor() { }

  setSelectedRobot(robot: Robot | null) {
    this.selectedRobotSubject.next(robot);
  }
}
