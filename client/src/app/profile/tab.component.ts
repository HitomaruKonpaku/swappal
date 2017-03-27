import { Component, Input } from '@angular/core';

@Component({
  selector: 'tab',
  styles: [`
    .pane{
      padding: 30px;
    }
  `],
  template: `
    <div [hidden]="!active" class="tab-content pane">
        <ng-content></ng-content>
    </div>
  `
})
export class Tab {
  @Input('tabTitle') title: string;
  @Input() active = false;
}
