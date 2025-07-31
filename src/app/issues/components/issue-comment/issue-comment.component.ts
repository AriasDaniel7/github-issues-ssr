import { MarkdownModule } from 'ngx-markdown';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GitHubIssue } from '@issues/interfaces/github-issue.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'issue-comment',
  imports: [MarkdownModule, DatePipe],
  templateUrl: './issue-comment.component.html',
  styleUrl: './issue-comment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueCommentComponent {
  issue = input.required<GitHubIssue>();
}
