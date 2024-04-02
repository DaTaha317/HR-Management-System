import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IApplicationUser } from 'src/app/interfaces/IApplicationUser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: IApplicationUser[] = [];
  modalRef?: BsModalRef; // this is a reference to bootstrap modal

  totalLength: any;
  page: number = 1;
  searchText: any;
  deleteuser: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data as IApplicationUser[];
    });
  }
  addUser() {
    this.router.navigate(['/users/add']);
  }
  deleteUser(id: string): void {
    this.modalRef?.hide();

    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }

  trackByFn(index: number, user: IApplicationUser) {
    return user.id;
  }

  decline(): void {
    this.modalRef?.hide();
  }
  openModal(template: TemplateRef<void>, id: string) {
    this.deleteuser = id;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
}
