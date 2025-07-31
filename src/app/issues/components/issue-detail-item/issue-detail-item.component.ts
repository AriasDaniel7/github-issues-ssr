import { DatePipe, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { GitHubIssue, State } from '@issues/interfaces/github-issue.interface';
import { IssueService } from '@issues/services/issue.service';
import { MarkdownModule } from 'ngx-markdown';
import { IssueCommentComponent } from "../issue-comment/issue-comment.component";

@Component({
  selector: 'issue-detail-item',
  imports: [DatePipe, NgStyle, MarkdownModule, IssueCommentComponent],
  templateUrl: './issue-detail-item.component.html',
  styleUrl: './issue-detail-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueDetailItemComponent {
  issue = input.required<GitHubIssue>();
  issueComments = input.required<GitHubIssue[]>();

  get isOpen() {
    return this.issue().state === State.Open;
  }
}
