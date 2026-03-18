import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TicketService } from './services/ticket.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { ModalService } from '../../_shared/services/modal/modal.service';
import {LoadingService} from '../../_shared/services/loading/loading.service';
import { SkeletonComponent } from '../../_shared/components/loading/skeleton.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tickets',
  imports: [CommonModule,SkeletonComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent implements OnInit {
  private readonly ticketService = inject(TicketService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly modalService = inject(ModalService);
  protected readonly loadingService = inject(LoadingService);
  tickets = this.ticketService.tickets;

  ngOnInit() {
    this.fetchTickets();
  }

  fetchTickets() {
    this.loadingService.show('fetch-tickets');
    this.ticketService
      .getTickets()
       .pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.loadingService.hide('fetch-tickets')) //  Hide it when done
    )
    .subscribe();
  }

  openCreateTicketModal() {
    this.modalService.open(TicketFormComponent,{size:'md'});
  }
}
