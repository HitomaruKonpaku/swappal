import { Component, OnInit} from '@angular/core';
import { APIService } from '../_services/index';
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  profile : any = {}
  constructor(
    private APIService : APIService,
  ){}
  ngOnInit(){
  }
}
