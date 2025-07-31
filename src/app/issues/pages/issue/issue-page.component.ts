import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IssueService } from '@issues/services/issue.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { IssueDetailItemComponent } from '@issues/components/issue-detail-item/issue-detail-item.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'issue-page',
  imports: [RouterLink, IssueDetailItemComponent],
  templateUrl: './issue-page.component.html',
  styleUrl: './issue-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuePageComponent {
  private issueService = inject(IssueService);
  private title = inject(Title);
  private meta = inject(Meta);

  route = inject(ActivatedRoute);

  issueNumber = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('number') ?? ''),
      tap((number) => {
        this.issueService.setIssueNumber(number);
      })
    )
  );

  issueCommentsQuery = this.issueService.issueCommentsQuery;
  issueQuery = this.issueService.issueQuery;

  metaTagsEffect = effect(() => {
    const issue = this.issueQuery.data();

    if (issue) {
      this.title.setTitle(`Issue #${issue.number}`);

      this.meta.updateTag({
        name: 'description',
        content: `Details of issue #${issue.number} - ${issue.title}`,
      });

      this.meta.updateTag({
        name: 'og:title',
        content: `Issue #${issue.number} - ${issue.title}`,
      });

      this.meta.updateTag({
        name: 'og:description',
        content: `Details of issue #${issue.number} - ${issue.title}`,
      });

      this.meta.updateTag({
        name: 'keywords',
        content: `issue, ${issue.number}, ${issue.title}`,
      });

      this.meta.updateTag({
        name: 'og:image',
        content: issue.user.avatar_url,
      });
    }
  });
}
