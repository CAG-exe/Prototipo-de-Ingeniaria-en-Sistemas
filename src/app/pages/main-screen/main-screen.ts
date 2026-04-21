import { Component, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  imports: [RouterLink],
  templateUrl: './main-screen.html',
  styleUrl: './main-screen.css',
})
export class MainScreen {
  protected readonly searchTerm = signal('');

  constructor(private router: Router) {}

  protected onSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  protected onSearch(): void {
    this.router.navigate(['/search-results'], {
      queryParams: { q: this.searchTerm() },
    });
  }
}
