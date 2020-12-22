$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');

    $("#addpost").click(function(){
        addPost();
    });

    var addPost = function(){
        $.ajax({
            url:"http://localhost:3989/api/post",
            method:"POST",
            header:"Content-Type:application/json",
            data:{
                userID : id,
                postDescription : $("#description").val()
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                    window.location.href = "post.html";
                }
                else
                {
                    $("#smsg").html("Something Went Wrong!!!");
                }
            }
        });
    };

    var loadPosts = function(){
        $.ajax({
            url:"http://localhost:3989/api/post",
            method:"GET",
            header:"Content-Type:application/json",
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
    
                        var str='';
                        var likeflag = false;
                        for (var i = 0; i < data.length; i++) {
                            str += '<div id="post" class="col-md-12">';
	                        str += '<b class="add-to-cart">'+data[i].user.username+'</b></br>';
	                        str += '<b class="text">'+data[i].postDescription+'</b>'
	                        str +='<div class="add-to-cart"><a class="btn btn-success" style="width:185px;font-family:consolas;margin-top:5px;" href="singlepost.html?id='+data[i].postID+'">View the post</a></span></div>';
                            str +='</div>';
                        }
                        
                        $('#posts').html(str);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadPosts();
});