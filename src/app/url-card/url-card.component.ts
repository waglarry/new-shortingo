import { Component, WritableSignal, inject, signal } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

interface UpdateDetails {
  modelId?: string;
  title: string;
}

interface MediaPlaforms {
  name: string;
  icon: string;
  color: string;
  url: string;
}
@Component({
  selector: 'app-url-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './url-card.component.html',
  styleUrl: './url-card.component.css',
})
export class UrlCardComponent {
  constructor(public _dashboardData: DashboardComponent) {}

  modalDialog: string = 'share';

  updateModel: UpdateDetails = {
    title: '',
  };

  setModelId(item: any) {
    this.modalDialog = 'edit';

    this.updateModel.modelId = item._id;
    this.updateModel.title = item.title;
  }

  url!: string;
  modalIndex!: number;
  handleShare(index: number, shortenedUrlElementRef: any) {
    this.modalDialog = 'share';
    this.url = shortenedUrlElementRef.value;
    this.modalIndex = index;
  }

  mediaPlatforms: MediaPlaforms[] = [
    {
      name: 'Facebook',
      icon: 'facebook',
      color: '#4267B2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${
        this.url !== undefined && this.url
      }&amp;src=sdkpreparse`,
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      color: '#E1306C',
      url: 'https://www.instagram.com/',
    },
    {
      name: 'WhatsApp',
      icon: 'whatsapp',
      color: '#25D366',
      url: `https://web.whatsapp.com/send?text=${
        this.url !== undefined && this.url
      }`,
    },
    {
      name: 'Pinterest',
      icon: 'pinterest',
      color: '#E60023',
      url: 'https://www.pinterest.com/',
    },
  ];
}
