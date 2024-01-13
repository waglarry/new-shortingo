import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTinyUrlService } from 'ng-tiny-url';
import { ShortenedUrlsService } from '../services/shortened-urls.service';
import { UrlCardComponent } from '../url-card/url-card.component';
import { Router } from '@angular/router';

export interface URLData {
  _id: string;
  title: string;
  shortLink: string;
  ogLink: string;
  starred: boolean;
  date: string;
  copied?: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, UrlCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  title = 'Shortingo';
  brandImageUrl: string = 'assets/images/Shortingo.svg';
  linkIconUrl: string = 'assets/images/link.svg';

  currentDate = new Date();
  date: string = `${this.currentDate.getUTCFullYear()}-${(
    this.currentDate.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, '0')}${this.currentDate
    .getUTCDate()
    .toString()
    .padStart(2, '0')} ${this.currentDate
    .getUTCHours()
    .toString()
    .padStart(2, '0')}:${this.currentDate
    .getUTCMinutes()
    .toString()
    .padStart(2, '0')}:${this.currentDate
    .getUTCSeconds()
    .toString()
    .padStart(2, '0')} UTC`;
  isFormSubmitted: boolean = false;
  isLoading: boolean = false;
  gettingData: boolean = false;
  searchTerm: string = '';
  filterStaredUrls: boolean = false;
  userId = sessionStorage.getItem('userId');
  email = sessionStorage.getItem('email');
  username = sessionStorage.getItem('username');

  noDataTitle = 'No URLs Saved Yet.';
  noDataSubTitle = 'Start pasting your long URLs to shorten it!';

  model: URLData = {
    title: `Untitled ${this.date}`,
    shortLink: '',
    ogLink: '',
    starred: false,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    _id: '',
  };

  urlsData: Array<URLData> = [];

  constructor(
    private _ngTinyUrlService: NgTinyUrlService,
    private _saveUrl: ShortenedUrlsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getSavedUrls();
    this.urlsData?.reverse();
  }

  handleOnSubmit() {
    this.isLoading = true;
    if (this.model.ogLink !== '') {
      this._ngTinyUrlService.shorten(this.model.ogLink).subscribe({
        next: (shortUrl) => {
          this.model.shortLink = shortUrl;
          this.isFormSubmitted = true;
          this.isLoading = false;

          this._saveUrl.saveUrl(this.model).subscribe({
            next: () => {
              this.model.ogLink = '';
              this.getSavedUrls();
            },
            error: (error) => {
              console.log(error.message);
            },
          });
        },
        error: () => {
          this.isLoading = false;
          alert('Something went wrong! Please, check your url and try again.');
        },
      });
    } else {
      this.isLoading = false;
      alert('Please enter or paste a URL');
    }
  }

  getSavedUrls() {
    if (this.userId !== null) {
      this.gettingData = true;
      this._saveUrl.getAllUserUrls(this.userId).subscribe({
        next: (response: Array<URLData>) => {
          this.gettingData = false;
          this.urlsData = response?.map((item: any) => {
            return { ...item, copied: false };
          });
          this.urlsData.reverse();
        },
        error: (error) => {
          this.gettingData = false;

          if (error?.status === 404) {
            alert(
              'Something went wrong, please check your internet and try again!'
            );
          } else if (error?.status === 403) {
            alert('Session expired, re-login to connect to the server!');
            this._router.navigate(['login']);
          }
        },
      });
    }
  }

  handleFilterUrls(event: any) {
    this.searchTerm = event.target.value;

    let searchResult = this.urlsData.filter(
      (obj) =>
        obj.title?.toLowerCase().includes(this.searchTerm?.toLowerCase()) ||
        obj.shortLink?.toLowerCase().includes(this.searchTerm?.toLowerCase()) ||
        obj.ogLink?.toLowerCase().includes(this.searchTerm?.toLowerCase())
    );

    if (!this.searchTerm || this.searchTerm === '') {
      this.getSavedUrls();
      this.noDataTitle = 'No URLs Saved Yet.';
      this.noDataSubTitle = 'Start pasting your long URLs to shorten it!';
    } else {
      this.urlsData = searchResult;
      this.noDataTitle = 'URL not found!';
      this.noDataSubTitle = '';
    }
  }

  handleDeleteUrl(id: string) {
    this._saveUrl.deleteUrl(id).subscribe({
      next: (response) => {
        alert(response.message);
      },
      error: (error) => {
        alert('Network issue, please try again!');
      },
      complete: () => {
        this.getSavedUrls();
      },
    });
  }

  handleUpdateUrl(id: string, inputValue: string) {
    let validInputValue =
      inputValue !== undefined && inputValue !== null && inputValue !== ''
        ? inputValue
        : 'Untitled ---';

    const updateObject = { title: validInputValue };

    this._saveUrl.updateUrl(id, updateObject).subscribe({
      next: () => {
        this.getSavedUrls();
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  handleCopyUrl(shortenedUrlElementRef: any, index: number) {
    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('value', shortenedUrlElementRef?.innerHTML);
    inputElement.select();
    inputElement.setSelectionRange(0, 999999); // This is for mobile selection.

    try {
      navigator.clipboard.writeText(inputElement.value);
      this.urlsData[index].copied = true;

      setTimeout(() => {
        this.urlsData[index].copied = false;
      }, 2000);
    } catch (error) {
      this.urlsData[index].copied = false;
      alert('An error occurred while copying. Please, try again!');
    }
  }

  handleStarUrl(id: string) {
    this.model.starred = !this.model.starred;

    const updateObject = { starred: this.model.starred };

    this._saveUrl.updateUrl(id, updateObject).subscribe({
      next: () => {
        this.getSavedUrls();
      },
      error: () => {
        alert('Network issue, please try again!');
      },
    });
  }

  handleFilterUrlsByStared() {
    this.filterStaredUrls = !this.filterStaredUrls;
    let urlsDataCopied = [...this.urlsData];

    const staredUrls = urlsDataCopied?.filter((url) => url.starred);

    if (this.filterStaredUrls) {
      this.noDataTitle = 'No URLs starred yet.';
      this.noDataSubTitle = 'Start starring your favorite short URLs!';
      [...this.urlsData] = staredUrls;
    } else {
      this.getSavedUrls();
      this.noDataTitle = 'No URLs Saved Yet.';
      this.noDataSubTitle = 'Start pasting your long URLs to shorten it!';
    }
  }

  handleSignout() {
    sessionStorage.removeItem('username');
    this._router.navigate(['login']);
  }
}
