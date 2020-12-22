$(document).ready(function(){

    $("#userName").focus(function(){
        $("#msg").html("");
    });
    
    $("#password").focus(function(){
        $("#msg").html("");
    });
    
    $("#login").click(function(){
        Validate();
    });
    
    var Validate = function(){
        $.ajax({
            url:"http://localhost:3989/api/user/login",
            method:"POST",
            header:"Content-Type:application/json",
            data:{
                userName:$("#userName").val(),
                password:$("#password").val()
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    Cookies.set("uname",$("#userName").val());
                    //var cookieVal = Cookies.get('uname');
                    Cookies.set("pass",$("#password").val());
                    Cookies.set("id",xmlhttp.responseJSON);
                    window.location.href = "index.html";
                }
                else
                {
                    $("#msg").html("Wrong User Name or password!!");
                }
            }
        });
    };
    
    
    $("#signup").click(function(){
        SignUp();
    });
    
    var SignUp = function(){
        $.ajax({
            url:"http://localhost:3989/api/user",
            method:"POST",
            header:"Content-Type:application/json",
            data:{
                userName:$("#user").val(),
                password:$("#pass").val(),
                Name:$("#name").val()
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                    alert("Account Created Successfully now you can login");
                    window.location.href = "login.html";
                }
                else
                {
                    $("#smsg").html("Something Went Wrong!!!");
                }
            }
        });
    };
    });