import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css',
})
export class ResetpasswordComponent {
  brandImageUrl: string = '../../../assets/images/Shortingo.svg';
  loginIllusion: string = '../../../assets/images/Shortingo.svg';
}
