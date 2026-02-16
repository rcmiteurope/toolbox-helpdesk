import { ChangeDetectionStrategy, Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../_shared/services/modal/modal.service';
import { LoadingService } from '../../_shared/services/loading/loading.service';
import { TrainingUser } from './models/user.model';
import { TrainingFormModalComponent } from './training-form-modal/training-form-modal.component';
import { TrainingService } from './services/training.service';
import { SkeletonComponent } from '../../_shared/components/loading/skeleton.component';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingComponent implements OnInit {
  private readonly modalService = inject(ModalService);
  protected readonly loadingService = inject(LoadingService);
  private readonly trainingService = inject(TrainingService);

  users = signal<TrainingUser[]>([]);

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.loadingService.show('training-data');
    this.trainingService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loadingService.hide('training-data');
      },
      error: () => this.loadingService.hide('training-data'),
    });
  }

  openAddUserModal() {
    const modalRef = this.modalService.open(TrainingFormModalComponent, {
      size: 'md',
    });

    // Subscribing to component instance event emitter as part of exercise
    const componentInstance = modalRef.componentInstance as TrainingFormModalComponent;
    if (componentInstance) {
      componentInstance.userSaved.subscribe((newUser) => {
        console.log('User saved event captured in parent:', newUser);
        // Usually, we just refresh from API
        this.users.update((prev) => [newUser, ...prev]);
      });
    }
  }
}
