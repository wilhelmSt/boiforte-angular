import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-stats',
  templateUrl: './card-stats.component.html',
  styleUrls: ['./card-stats.component.scss'],
})
export class CardStatsComponent {
  @Input() value: number = 0;
  @Input() title: string = '';
  @Input() color: 'green' | 'black' | 'red' = 'black';
}
