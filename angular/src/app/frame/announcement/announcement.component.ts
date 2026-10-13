import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/** One entry in assets/site-constants/announcements.json. */
export interface Announcement {
  id: string;
  enabled?: boolean;
  endDate?: string;
  dismissible?: boolean;
  badge?: string;
  message?: string;
  cta?: { text?: string; href?: string; target?: string };
  /** Optional per-announcement colors. Any omitted field falls back to the default amber theme.
   *  `bar` is the solid base background; `wash` is the color that fades across the center gradient
   *  (and the bottom border); `badge` is the badge background; `link` is the call-to-action color. */
  colors?: { bar?: string; wash?: string; badge?: string; link?: string };
}

/** Config-driven announcement bar: shows the first eligible entry (enabled, before endDate, not
 *  dismissed). Reusable for any announcement by editing the config. */
@Component({
  selector: 'sdp-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  private static readonly PREFIX = 'announce:';
  current: Announcement | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ announcements?: Announcement[] }>('assets/site-constants/announcements.json').subscribe({
      next: (cfg) => { this.current = ((cfg && cfg.announcements) || []).find((a) => this.eligible(a)) || null; },
      error: () => { this.current = null; }
    });
  }

  private eligible(a: Announcement): boolean {
    if (!a || a.enabled === false || !a.id) return false;
    if (a.endDate) {
      const end = new Date(a.endDate).getTime();
      if (!isNaN(end) && Date.now() > end) return false;
    }
    return !this.dismissed(a.id);
  }

  private dismissed(id: string): boolean {
    try { return localStorage.getItem(AnnouncementComponent.PREFIX + id) === '1'; } catch { return false; }
  }

  dismiss(): void {
    if (!this.current) return;
    try { localStorage.setItem(AnnouncementComponent.PREFIX + this.current.id, '1'); } catch { /* private mode */ }
    this.current = null;
  }

  @HostListener('document:keydown.escape')
  onEsc(): void { if (this.current && this.current.dismissible !== false) this.dismiss(); }
}
