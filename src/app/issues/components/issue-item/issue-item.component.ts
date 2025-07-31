import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { GitHubIssue, State } from '@issues/interfaces/github-issue.interface';
import { IssueService } from '@issues/services/issue.service';

@Component({
  selector: 'issue-item',
  imports: [NgStyle, RouterLink],
  templateUrl: './issue-item.component.html',
  styleUrl: './issue-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItemComponent {
  issue = input.required<GitHubIssue>();
  private issueService = inject(IssueService);

  get isOpen() {
    return this.issue().state === State.Open;
  }

  prefecthData() {
    this.issueService.setIssueData(this.issue());
    this.issueService.prefetchIssueComments(this.issue().number.toString());
  }
}
