import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'translate',
    standalone: true
})
class MockTranslatePipe implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

describe('ContactComponent', () => {
    let component: ContactComponent;
    let fixture: ComponentFixture<ContactComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContactComponent],
        })
            .overrideComponent(ContactComponent, {
                remove: { imports: [TranslatePipe] },
                add: { imports: [MockTranslatePipe] }
            })
            .compileComponents();

        fixture = TestBed.createComponent(ContactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should construct correct mailto link', () => {
        // Arrange
        component.name = 'Test User';
        component.email = 'test@example.com';
        component.message = 'Hello World';

        // Spy on the protected method. We cast to any to access it.
        const openMailtoLinkSpy = spyOn<any>(component, 'openMailtoLink');

        // Act
        component.sendEmail();

        // Assert
        const expectedSubject = encodeURIComponent('Contact from Test User');
        const expectedBody = encodeURIComponent('Name: Test User\nEmail: test@example.com\n\nMessage:\nHello World');
        const expectedUrl = `mailto:schajjaoui@gmail.com?subject=${expectedSubject}&body=${expectedBody}`;

        expect(openMailtoLinkSpy).toHaveBeenCalledWith(expectedUrl);
    });
});
