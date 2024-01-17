import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../components/homeviews/navbar/navbar.component';
import { FooterComponent } from '../components/homeviews/footer/footer.component';
import { AboutComponent } from '../components/homeviews/about/about.component';
import { PricingComponent } from '../components/homeviews/pricing/pricing.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    PricingComponent,
    RouterModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
