import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_jlc54lk', 'template_8z8orm8', e.target as HTMLFormElement, '4MHutAdVwgaCx2KQa')
      .then((result: EmailJSResponseStatus) => {
        alert('Message is successfully sent!')
        console.log(result.text);
        
      }, (error) => {
        console.log(error.text);
        alert(error?.text)
      });
  }

}
