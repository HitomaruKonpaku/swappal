import { Component } from '@angular/core';


@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  constructor(){}
  type = 'line';
  UserData = {
    labels: ["January", "February", "March", "April", "May", "June", "July","August","Sep"],
    datasets: [
      {
        label: "USER",
        data: [65, 59, 80, 81, 56, 55, 0,40],
        backgroundColor:[
          'rgba(239, 104, 99, 0.7)',
        ],
      }
    ]
  };
  FeedbackData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "FEEDBACK",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor:[
          'rgba(208, 168, 224, 0.7)',
        ],
      }
    ]
  };
  SkillData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "SKILL",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor:[
          'rgba(162, 210, 0, 0.7)',
        ],
      }
    ]
  };
  RequestData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "REQUEST",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor:[
          'rgba(34, 190, 239, 0.7)',
        ],
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

}
