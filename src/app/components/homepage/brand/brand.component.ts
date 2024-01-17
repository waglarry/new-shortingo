import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {
  brandImageUrl: string = '../../../assets/images/Shortingo.svg';
  size: string = 'small';
}
