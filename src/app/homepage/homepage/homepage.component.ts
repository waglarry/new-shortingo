import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/components/navbar/navbar.component';
import { FooterComponent } from '../../components/components/footer/footer.component';
import { AboutComponent } from '../../components/components/about/about.component';
import { PricingComponent } from '../../components/components/pricing/pricing.component';
import { RouterModule } from '@angular/router';

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
