import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  features = [
    {
      icon: '../../../assets/icons/link.svg',
      title: 'Link management',
      content1: 'Link search',
      content2: 'Link tags',
      content3: 'Custom URL slugs',
      content4: 'High Volume links',
    },
    {
      icon: '../../../assets/icons/thread.svg',
      title: 'Traffic routing',
      content1: 'Link with emoji',
      content2: 'Mobile deep linkung',
      content3: 'Link retargrting',
      content4: 'Link retargrting',
    },
    {
      icon: '../../../assets/icons/sales.svg',
      title: 'Analytics',
      content1: 'Link analytics',
      content2: 'UTM builder',
      content3: 'Private/pupblic report',
      content4: 'Your logo in reports',
    },
  ];
}
