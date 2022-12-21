import { Component } from '@angular/core';
import { User } from './Models/User';
import { UserService } from './Services/user.service';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{
  user = {} as User;
  users: User[];
  formUser : FormGroup;
  
  constructor(private userService : UserService){ }
  
  ngOnInit() : void{
    this.getAllUser();
      this.createForm(User());
  }

  getAllUser() : void{
    this.userService.getUser().subscribe((users : User[])=>this.users = users);

  }
    
  createForm(user : User) : void{
    this.formUser = new FormGroup({
      id : new FormControl(user.id),
      name : new FormControl(user.name),
      user : new FormControl(user.password),
      passsword : new FormControl(user.password),
      status : new FormControl(user.status)
  })
  }

  onSubmit() {
    // aqui você pode implementar a l ogica para fazer seu formulário salvar
    console.log(this.formUser.value);
  }
}
