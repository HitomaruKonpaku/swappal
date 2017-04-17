import { Component, } from '@angular/core';
declare var $: any;
@Component({
    moduleId: module.id,
    templateUrl: 'faqs.component.html'
})

export class FAQsComponent {
    constructor(){
      $(document).ready(function(){
        $("#flip").click(function(){
            $("#panel").slideToggle("fast");
        });
    });
    $(document).ready(function(){
      $("#flip2").click(function(){
          $("#panel2").slideToggle("fast");
      });
    });
    $(document).ready(function(){
      $("#flip3").click(function(){
          $("#panel3").slideToggle("fast");
      });
    });
    }
}
