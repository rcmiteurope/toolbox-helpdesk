import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { ToastService } from '../../../_shared/services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TicketPriority, TicketStatus } from '../models/ticket.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActiveModal } from '../../../_shared/models/modal/active-modal';
@Component({
  selector: 'app-ticket-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css',
})
export class TicketFormComponent {
  private readonly ticketService = inject(TicketService);
  private readonly activeModal = inject(ActiveModal);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);

  ticketForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required]],
    priority: ['Medium' as TicketPriority, [Validators.required]],
    category: ['General', [Validators.required]],
  });

  priorities: TicketPriority[] = ['Low', 'Medium', 'High', 'Urgent'];
  onSubmit() {
    this.toastService.info('Creating ticket...');
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    const formValue = this.ticketForm.getRawValue();
    this.ticketService.createTicket(formValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.ticketForm.reset({
            priority: 'Medium',
            category: 'General'
          });
          this.activeModal.close();
          this.toastService.success('Ticket created successfully');
        },
        error: (err) => {
          console.error('Failed to create ticket', err)
          this.toastService.error('Failed to create ticket');
        }
      });
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
