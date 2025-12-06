import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { LocalizedString } from '../../core/models/data.models';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // Impure to react to signal changes in service
})
export class TranslatePipe implements PipeTransform {
  private i18n = inject(I18nService);

  transform(value: string | LocalizedString | undefined | null): string {
    if (!value) return '';

    const lang = this.i18n.currentLang();

    if (typeof value === 'object' && 'en' in value && 'fr' in value) {
      return value[lang];
    }

    if (typeof value === 'string') {
      return this.i18n.translate(value);
    }

    return String(value);
  }
}
