import { Component, signal } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslatePipe, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-20 max-w-2xl text-center">
      <h1 class="text-4xl font-bold mb-8 dark:text-white">{{ 'contact.title' | translate }}</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-12">
        {{ 'contact.description' | translate }}
      </p>

      <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <form class="space-y-6 text-left" (ngSubmit)="sendEmail()">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ 'contact.name' | translate }}</label>
            <input type="text" [(ngModel)]="name" name="name" required
                   class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ 'contact.email' | translate }}</label>
            <input type="email" [(ngModel)]="email" name="email" required
                   class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ 'contact.message' | translate }}</label>
            <textarea rows="4" [(ngModel)]="message" name="message" required
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"></textarea>
          </div>
          <button type="submit" class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-indigo-600/20">
            {{ 'contact.send' | translate }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';

  sendEmail() {
    const subject = encodeURIComponent(`Contact from ${this.name}`);
    const body = encodeURIComponent(`Name: ${this.name}\nEmail: ${this.email}\n\nMessage:\n${this.message}`);
    const url = `mailto:schajjaoui@gmail.com?subject=${subject}&body=${body}`;
    this.openMailtoLink(url);
  }

  protected openMailtoLink(url: string) {
    window.location.href = url;
  }
}
