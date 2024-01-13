import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-createnewpassword',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './createnewpassword.component.html',
  styleUrl: './createnewpassword.component.css',
})
export class CreatenewpasswordComponent {
  isLoading: boolean = false;
}
