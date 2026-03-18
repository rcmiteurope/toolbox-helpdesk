import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActiveModal } from '../../../_shared/models/modal/active-modal';
import { LoadingService } from '../../../_shared/services/loading/loading.service';
import { TrainingService } from '../services/training.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-training-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './training-form-modal.component.html',
  styleUrl: './training-form-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingFormModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly activeModal = inject(ActiveModal);
  private readonly loadingService = inject(LoadingService);
  private readonly trainingService = inject(TrainingService);

  @Output() userSaved = new EventEmitter<any>();

  trainingForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['Developer', Validators.required],
  });

  isSubmitting = false;

  onSubmit() {
    if (this.trainingForm.invalid) {
      this.trainingForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.loadingService.show('save-user');

    this.trainingService
      .saveUser(this.trainingForm.value)
      .pipe(
        finalize(() => {
          this.loadingService.hide('save-user');
          this.isSubmitting = false;
        }),
      )
      .subscribe((newUser) => {
       this.userSaved.emit(newUser);
        this.activeModal.close(newUser);
      });
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
