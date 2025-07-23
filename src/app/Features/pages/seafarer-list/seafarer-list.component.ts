import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { IDataSeafarer } from '../../../shared/interface/data-seafarer';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seafarer-list',
  imports: [NgxPaginationModule, RouterLink],
  templateUrl: './seafarer-list.component.html',
  styleUrl: './seafarer-list.component.scss',
})
export class SeafarerListComponent implements OnInit {
  currentPage = 1;
  DataSeafarerList: IDataSeafarer[] = [];
  isActive = false;
  allUsers: any[] = [];
  filteredUsers: any[] = [];
  constructor(
    private _usersService: UsersService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  // display Data
  getAll() {
    this._usersService.getAllSeafarers().subscribe({
      next: (res) => {
        this.allUsers = res.Data ?? [];
        this.filteredUsers = [...this.allUsers];
      },
      error: (err) => {
        this._toastrService.error('Sorry!', err.ErrorMessage);
      },
    });
  }

  // active or inactive
  toggleStatus(Id: number, status: number, EmpId: number) {
    const newStatus = status === 1 ? 2 : 1;
    this._usersService.statusSeafarer(Id, newStatus, EmpId).subscribe({
      next: (res) => {
        this._toastrService.success(res.ErrorMessage, 'Done');
      },
      error: (err) => {
        this._toastrService.error('Sorry!', err.ErrorMessage);
      },
      complete: () => {
        const target = this.allUsers.find(
          (item) => item.Id === Id && item.EmpId === EmpId
        );
        if (target) {
          target.Status = newStatus;
        }
      },
    });
  }
  // search
  searchByEmpName(name: string) {
    const searchTerm = name?.toLowerCase() || '';
    this.filteredUsers = this.allUsers.filter((user) => {
      const empName = user?.EmployeeName || '';
      return empName.toLowerCase().includes(searchTerm);
    });
  }
}
