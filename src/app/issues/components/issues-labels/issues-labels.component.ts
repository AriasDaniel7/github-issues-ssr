import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { GitHubLabel } from '@issues/interfaces/github-label.interface';
import { IssuesService } from '@issues/services/issues.service';

@Component({
  selector: 'issues-labels',
  imports: [NgStyle],
  templateUrl: './issues-labels.component.html',
  styleUrl: './issues-labels.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesLabelsComponent {
  private issuesService = inject(IssuesService);

  labels = input.required<GitHubLabel[]>();

  onToggleLabel(label: string) {
    this.issuesService.toggleLabel(label);
  }

  isSelected(label: string) {
    return this.issuesService.selectedLabels().has(label);
  }

  get selectedLabelsSize() {
    return this.issuesService.selectedLabels().size;
  }

  onDeleteLabels() {
    this.issuesService.selectedLabels.set(new Set<string>());
  }
}
