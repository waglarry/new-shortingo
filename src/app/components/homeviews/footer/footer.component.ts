import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  public sendEmail(e: Event) {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    emailjs
      .sendForm(
        `${environment.SERVICE_ID}`,
        `${environment.TEMPLATE_ID}`,
        formElement,
        `${environment.PUBLIC_KEY}`
      )
      .then(
        (result: EmailJSResponseStatus) => {
          alert('Message is successfully sent!');
          console.log(result.text);
          formElement.reset();
        },
        (error) => {
          console.log(error.text);
          alert(error?.text);
        }
      );
  }
}
