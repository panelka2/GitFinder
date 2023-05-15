export interface Owner {
    pushed_at: string,
    avatar_url: string,
    login: string,
    html_url: string,
} 
export interface IGit {
    name: string,
    stargazers_count: number,
    pushed_at: string,
    html_url: string,
    id: number,
    languages_url: string, 
    description: string,
    owner: Owner
}
export interface RepoLanguages {
    [key: string]: number;
}
