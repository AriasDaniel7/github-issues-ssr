import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'issues',
    loadComponent: () => import('@issues/pages/issues/issues-page.component'),
  },
  {
    path: 'issue/:number',
    loadComponent: () => import('@issues/pages/issue/issue-page.component'),
  },
  {
    path: '**',
    redirectTo: 'issues',
  },
];
