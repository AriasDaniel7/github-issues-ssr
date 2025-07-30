import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GitHubIssue, State } from '@issues/interfaces/github-issue.interface';

@Component({
  selector: 'issue-item',
  imports: [NgStyle, RouterLink],
  templateUrl: './issue-item.component.html',
  styleUrl: './issue-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItemComponent {
  issue = input.required<GitHubIssue>();

  get isOpen() {
    return this.issue().state === State.Open;
  }
}
