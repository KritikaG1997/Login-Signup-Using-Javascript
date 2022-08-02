const readline = require("readline-sync");
const validator = require("validator");
const fs = require("fs");

user_choice_input = readline.question("Enter your choice what you want to do login or sign-up: ");
if(user_choice_input==="signup"){
    var User_data = {};
    var userDataInjson = {};
    var user_first_name  = readline.question("Enter your first name from which you want to creat your account: ");
    var user_last_name = readline.question("Enter your last name from which you want to creat your account: ");
    var user_EmailId = readline.question("Enter your valid Email_id: ");
    var user_set_password = readline.question("Enter a strong password it should have one special corector,one capoital Word and Small, one number from 1 to 9 and alphabate: ");
    var confirm_password = readline.question(" Re Enter your password for confirm: ");
    if(validator.isEmail(user_EmailId)){
      if(user_set_password==confirm_password){
        function isUpper(str) {
            return /[A-Z]/.test(str);
        };
        function hasLowerCase(str) {
            return (/[a-z]/.test(str));
        };
        function hasSpecialcorrector(myString){
            return (/[@,#,$,&]/.test(myString));
        };
        function hasNumber(myString){
            return (/[0-9]/.test(myString));
        };      
        function checkYourPassword(Your_Paasword){
            if(Your_Paasword.length>=8 && Your_Paasword.length<=12){
        
                if(hasLowerCase(Your_Paasword)){
        
                    if(isUpper(Your_Paasword)){
        
                        if(hasSpecialcorrector(Your_Paasword)){
        
                            if(hasNumber(Your_Paasword)){
                                
                                console.log("wow finally you created a strong and secure password for your account: ")

                                User_data["Firstname"]=user_first_name;
                                User_data["lastName"] =user_last_name;
                                User_data["EmailId"]=user_EmailId;
                                User_data["password"] = confirm_password;
                                userDataInjson = JSON.stringify(User_data);
                                fs.writeFile("user_data.json",userDataInjson,(err)=>{
                                  console.log("Account Created: ")
                                })
                            }else{
                                console.log("in it one numeric also should be there: ")
                            };
                        }else{
                            console.log("There should be one special corrector for making your password more secure: ")
                        };
                    }else{
                        console.log("your password should be have one capital letter: ")
                    };
                }else{
                    console.log("it should be have small corrector: ");
                };
            }else{
                console.log("Password Length should be maximum 8 and lessthan 12: ");
            };
        };
        checkYourPassword(confirm_password);
      }else{
        console.log("You both password are not same try again")
      };
    }else{
        console.log("Emain id is not valid try again: ");
    };
}else if (user_choice_input==="login"){
    var user_data_obj = {};
    var user_mailID = readline.question("Enter your valid Email id: ");
    var user_password = readline.question("Enter your account password: ")
    var convertInObj = {};
    fs.readFile("user_data.json","utf-8",(err,data)=>{
        const value = data.includes(user_mailID);
        const value2 = data.includes(user_password);
        if(value==true && value2==true){
            console.log("yes")
        }else{
            console.log("no");
        };
    });
      
};