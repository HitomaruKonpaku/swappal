import { Injectable } from '@angular/core';


@Injectable()
export class ValidationService{



  constructor(){}

  EmailValidation(email: any){
    var Emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Emailvalidation.test(email);
  }
  PasswordValidation(password: any){
    var Passwordvalidation = /^.{8,}$/;
    return Passwordvalidation.test(password);
  }
  FullNameValidation(fullname: any){
    var fullnamevalidation = /[^!@#$%^&*()\[\]][a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/;
    return fullnamevalidation.test(fullname);
  }
  MessageValidation(message: any ){
    var messagevalidation = /^.{8,}$/;
    return messagevalidation.test(message);
  }

}
