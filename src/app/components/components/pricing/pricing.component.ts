import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  pricing = [
    {
      title: 'Free',
      price: 0,
      content1: 'Shorten url',
      content2: 'URL History',
      content3: 'Link Analytics',
      action: 'Sign up'
    },
    {
      title: 'Personal',
      price: 19,
      content1: 'Customer Domain Include',
      content2: 'Redirects',
      content3: 'Conects Subdomain',
      action: 'Buy now'
    },
    {
      title: 'Team',
      price: 32,
      content1: '2 active teamates',
      content2: '1 extra workspace',
      content3: '24/7 support',
      action: 'Buy now'
    },
  ];
}
