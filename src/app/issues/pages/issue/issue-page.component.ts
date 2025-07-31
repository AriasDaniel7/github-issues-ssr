import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IssueService } from '@issues/services/issue.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { IssueDetailItemComponent } from '@issues/components/issue-detail-item/issue-detail-item.component';

@Component({
  selector: 'issue-page',
  imports: [RouterLink, IssueDetailItemComponent],
  templateUrl: './issue-page.component.html',
  styleUrl: './issue-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuePageComponent {
  private issueService = inject(IssueService);
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
}
