import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GitHubIssue } from '@issues/interfaces/github-issue.interface';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private http = inject(HttpClient);
  private BASE_URL = environment.baseUrl;
  private GITHUB_TOKEN = environment.gitHubToken;
  private queryClient = inject(QueryClient);

  private issueNumber = signal<string>('');
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.GITHUB_TOKEN}`,
  });

  private getIssueByNumber(issueNumber: string) {
    return firstValueFrom(
      this.http.get<GitHubIssue>(`${this.BASE_URL}/issues/${issueNumber}`, {
        headers: this.headers,
      })
    );
  }

  private getIssueComments(issueNumber: string) {
    return firstValueFrom(
      this.http.get<GitHubIssue[]>(
        `${this.BASE_URL}/issues/${issueNumber}/comments`,
        { headers: this.headers }
      )
    );
  }

  setIssueNumber(issueNumber: string) {
    this.issueNumber.set(issueNumber);
  }

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => this.getIssueByNumber(this.issueNumber()),
    enabled: this.issueNumber() !== '',
    staleTime: 1000 * 60 * 5,
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => this.getIssueComments(this.issueNumber()),
    enabled: this.issueNumber() !== '',
    staleTime: 1000 * 60 * 5,
  }));

  prefetchIssueComments(issueNumber: string) {
    return this.queryClient.prefetchQuery({
      queryKey: ['issue', issueNumber, 'comments'],
      queryFn: () => this.getIssueComments(issueNumber),
      staleTime: 1000 * 60 * 5,
    });
  }

  setIssueData(issue: GitHubIssue) {
    this.queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60 * 5,
    });
  }
}
