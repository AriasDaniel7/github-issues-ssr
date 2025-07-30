import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GitHubIssue, State } from '@issues/interfaces/github-issue.interface';
import { GitHubLabel } from '@issues/interfaces/github-label.interface';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private http = inject(HttpClient);
  private BASE_URL = environment.baseUrl;
  private GITHUB_TOKEN = environment.gitHubToken;
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.GITHUB_TOKEN}`,
  });

  selectedState = signal<State>(State.All);
  selectedLabels = signal(new Set<string>());

  private getIssues(state: State = State.All, selectedLabels: string[] = []) {
    const params = new HttpParams({
      fromObject: {
        state: state,
        labels: selectedLabels.join(','),
      },
    });

    return firstValueFrom(
      this.http.get<GitHubIssue[]>(`${this.BASE_URL}/issues`, {
        headers: this.headers,
        params,
      })
    );
  }

  private getLabels() {
    return this.http.get<GitHubLabel[]>(`${this.BASE_URL}/labels`, {
      headers: this.headers,
    });
  }

  issuesQuery = injectQuery(() => ({
    queryKey: [
      'issues',
      {
        state: this.selectedState(),
        selectedLabels: [...this.selectedLabels()],
      },
    ],
    queryFn: () =>
      this.getIssues(this.selectedState(), [...this.selectedLabels()]),
  }));

  labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => firstValueFrom(this.getLabels()),
  }));

  toggleLabel(label: string) {
    const labels = this.selectedLabels();

    if (labels.has(label)) {
      labels.delete(label);
    } else {
      labels.add(label);
    }

    this.selectedLabels.set(new Set(labels));
  }
}
