import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IssueItemComponent } from '@issues/components/issue-item/issue-item.component';
import { State } from '@issues/interfaces/github-issue.interface';
import { IssuesService } from '@issues/services/issues.service';
import { IssuesLabelsComponent } from '@issues/components/issues-labels/issues-labels.component';

@Component({
  selector: 'issues-page',
  imports: [IssueItemComponent, IssuesLabelsComponent],
  templateUrl: './issues-page.component.html',
  styleUrl: './issues-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuesPageComponent {
  private issuesService = inject(IssuesService);

  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }

  get selectedState() {
    return this.issuesService.selectedState();
  }

  onChangeState(newState: string) {
    const state =
      {
        all: State.All,
        open: State.Open,
        closed: State.Closed,
      }[newState] ?? State.All;

    this.issuesService.selectedState.set(state);
  }
}
