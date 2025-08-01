export interface GitHubIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: State;
  locked: boolean;
  assignee: null;
  assignees: any[];
  milestone: Milestone;
  comments: number;
  created_at: Date;
  updated_at: Date;
  closed_at: null;
  author_association: AuthorAssociation;
  type: TypeClass | null;
  active_lock_reason: null;
  draft?: boolean;
  pull_request?: PullRequest;
  body: null | string;
  closed_by: User | null;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null;
  sub_issues_summary?: SubIssuesSummary;
}

export enum AuthorAssociation {
  Collaborator = 'COLLABORATOR',
  Contributor = 'CONTRIBUTOR',
  Member = 'MEMBER',
  None = 'NONE',
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: TypeEnum;
  user_view_type: UserViewType;
  site_admin: boolean;
}

export enum TypeEnum {
  User = 'User',
}

export enum UserViewType {
  Public = 'public',
}

export interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export interface Milestone {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: NodeID;
  number: number;
  title: Title;
  description: null | string;
  creator: User;
  open_issues: number;
  closed_issues: number;
  state: State;
  created_at: Date;
  updated_at: Date;
  due_on: null;
  closed_at: null;
}

export enum NodeID {
  MDk6TWlsZXN0B25LMzA0NTk2Nw = 'MDk6TWlsZXN0b25lMzA0NTk2Nw==',
  MDk6TWlsZXN0B25LMzE0Mzg4MA = 'MDk6TWlsZXN0b25lMzE0Mzg4MA==',
  MIKwDOAXExC84Aw8Zh = 'MI_kwDOAXExC84Aw8zh',
}

export enum State {
  Open = 'open',
  Closed = 'closed',
  All = 'all',
}

export enum Title {
  Backlog = 'Backlog',
  NeedsTriage = 'needsTriage',
  V21Candidate = 'v21 Candidate',
}

export interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at: null;
}

export interface Reactions {
  url: string;
  total_count: number;
  '+1': number;
  '-1': number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface SubIssuesSummary {
  total: number;
  completed: number;
  percent_completed: number;
}

export interface TypeClass {
  id: number;
  node_id: string;
  name: string;
  description: string;
  color: string;
  created_at: Date;
  updated_at: Date;
  is_enabled: boolean;
}
