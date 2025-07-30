import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'issue-page',
  imports: [],
  templateUrl: './issue-page.component.html',
  styleUrl: './issue-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuePageComponent {}
