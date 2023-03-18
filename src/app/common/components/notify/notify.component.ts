import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotifyDto } from '../../dtos/notify.dto';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'in-notify',
  templateUrl: './notify.component.html',
  providers: [NotifyService]
})
export class NotifyComponent implements OnInit {
  @ViewChild('toast', { static: false }) toast!: ElementRef;
  notify: NotifyDto | null = null;

  constructor(private notifyService: NotifyService) {
  }

  ngOnInit() {
    this.notifyService.notify$.subscribe((notifyData) => {
      this.showNotify(notifyData);
    });
  }
  showNotify(notifyData: NotifyDto) {
    this.notify = notifyData;
  }
  hideNotify() {
    this.notify = null;
    if (this.toast && this.toast.nativeElement) {
      this.toast.nativeElement.hidden = true;
    }
  }
}
