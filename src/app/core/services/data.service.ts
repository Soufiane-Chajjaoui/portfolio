import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, map } from 'rxjs';
import { Project, BlogPost } from '../models/data.models';
import { PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private projectsCache$: Observable<Project[]> | null = null;
  private blogCache$: Observable<BlogPost[]> | null = null;

  constructor(private http: HttpClient, private platformLocation: PlatformLocation) { }

  private getAssetUrl(path: string): string {
    const baseHref = this.platformLocation.getBaseHrefFromDOM();
    // Remove leading slash from path if present to avoid double slashes with baseHref
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    const fullUrl = `${baseHref}${cleanPath}`;
    console.log(`Constructed asset URL: ${fullUrl} (baseHref: ${baseHref}, path: ${path})`);
    return fullUrl;
  }

  getProjects(): Observable<Project[]> {
    if (!this.projectsCache$) {
      this.projectsCache$ = this.http.get<any>(this.getAssetUrl('assets/data/projects.json')).pipe(
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
      this.blogCache$ = this.http.get<BlogPost[]>(this.getAssetUrl('assets/data/blog.json')).pipe(
        shareReplay(1)
      );
    }
    return this.blogCache$;
  }

  getBlogPostHtml(filename: string): Observable<string> {
    return this.http.get(this.getAssetUrl(`assets/blog/${filename}`), { responseType: 'text' });
  }

  getPersonalInfo(): Observable<any> {
    return this.http.get(this.getAssetUrl('assets/data/personal.json')).pipe(shareReplay(1));
  }

  getSkills(): Observable<any> {
    return this.http.get(this.getAssetUrl('assets/data/skills.json')).pipe(shareReplay(1));
  }

  getEducation(): Observable<any> {
    return this.http.get(this.getAssetUrl('assets/data/education.json')).pipe(shareReplay(1));
  }
}
