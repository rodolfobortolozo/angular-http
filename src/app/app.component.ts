import { Component } from '@angular/core';
import { User } from './Models/User';
import { UserService } from './Services/user.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{
  user = {} as User;
  users: User[];
  formUser : FormGroup;
  
  constructor(private formBuilder: FormBuilder, private userService : UserService){ }
  
  ngOnInit() : void{
    this.getAllUser();
      this.createForm(this.user);
  }
  
  onSubmit() {
    this.saveUser(this.formUser.value);

  }
  
  getAllUser() : void{
    this.userService.getUser()
    .subscribe((users : User[])=>this.users = users);

  }

  saveUser(user : User){
    if(!this.formUser.valid){
      return console.log("Campos Inválidos");
    }
    console.log(user);
    if(user.id!==null){
      this.userService.UpdateUser(user)
      .subscribe(()=>this.clearForm());

    }else{
      this.userService.saveUser(user)
      .subscribe(()=>this.clearForm());
    }

  }

  editUser(user : User){
    this.user = {...user};
    this.formUser.patchValue(this.user);

  }

  deleteUser(user : User){
    this.userService.deleteUser(user)
    .subscribe(()=>this.getAllUser());

  }

  // createForm(user : User) : void{
  //   this.formUser = new FormGroup({
  //     id : new FormControl(user.id),
  //     name : new FormControl(user.name),
  //     user : new FormControl(user.user),
  //     password : new FormControl(user.password),
  //     status : new FormControl(user.status)

  // })
  // }

  createForm(user: User){
    this.formUser = this.formBuilder.group({
      id : user.id,
      name : [user.name, Validators.required],
      user : user.user,
      password : user.password,
      status : user.status

    })
  }

  clearForm(){
    this.getAllUser();
    this.formUser.reset();
    this.user = {} as User;
    console.log("Rodolfo");
  }

}
