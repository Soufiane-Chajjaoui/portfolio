import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 transition-colors duration-300">
      <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {{ year }} Soufiane Portfolio. All rights reserved.</p>
        <div class="flex justify-center gap-6 mt-4">
          <a href="https://github.com/Soufiane-Chajjaoui" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/soufiane-chajjaoui-ba2b1a236/" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
    year = new Date().getFullYear();
}
