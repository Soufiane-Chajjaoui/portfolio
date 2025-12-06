import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, map } from 'rxjs';
import { Project, BlogPost } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private projectsCache$: Observable<Project[]> | null = null;
  private blogCache$: Observable<BlogPost[]> | null = null;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    if (!this.projectsCache$) {
      this.projectsCache$ = this.http.get<any>('/assets/data/projects.json').pipe(
        map(response => {
          console.log('Raw projects response:', response);
          console.log('Type of response:', typeof response);
          console.log('Is array?', Array.isArray(response));
          
          if (response && response.projects && Array.isArray(response.projects)) {
            console.log('Using response.projects:', response.projects);
            return response.projects;
          }
          if (Array.isArray(response)) {
            console.log('Using response directly:', response);
            return response;
          }
          console.log('Returning empty array');
          return [];
        }),
        shareReplay(1)
      );
    }
    return this.projectsCache$;
  }

  getBlogPosts(): Observable<BlogPost[]> {
    if (!this.blogCache$) {
      this.blogCache$ = this.http.get<BlogPost[]>('/assets/data/blog.json').pipe(
        shareReplay(1)
      );
    }
    return this.blogCache$;
  }

  getBlogPostHtml(filename: string): Observable<string> {
    return this.http.get(`/assets/blog/${filename}`, { responseType: 'text' });
  }

  getPersonalInfo(): Observable<any> {
    return this.http.get('/assets/data/personal.json').pipe(shareReplay(1));
  }

  getSkills(): Observable<any> {
    return this.http.get('/assets/data/skills.json').pipe(shareReplay(1));
  }

  getEducation(): Observable<any> {
    return this.http.get('/assets/data/education.json').pipe(shareReplay(1));
  }
}
