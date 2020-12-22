$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');
    function getParams() {
        var idx = document.URL.indexOf('?');
        var params = new Array();
        if (idx != -1) {
            var pairs = document.URL.substring(idx + 1, document.URL.length).split('&');
            for (var i = 0; i < pairs.length; i++) {
                nameVal = pairs[i].split('=');
                params[nameVal[0]] = nameVal[1];
            }
        }
        return params;
    }
    params = getParams();
    var postId = unescape(params.id);
    var addComment = function(){
        $.ajax({
            url:"http://localhost:3989/api/post/"+postId+"/comments",
            method:"POST",
            header:"Content-Type:application/json",
            data:{
                userId: id,
                commentDescription : $('#comment').val()
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                    loadPostInfo();
                    $('#comment').val("");
                }
                else
                {
                    $("#smsg").html("Something Went Wrong!!!");
                }
            }
        });
    };

    $("#deletepost").click(function(){
        deletePost();
    });

    var deletePost = function(){
        $.ajax({
            url:"http://localhost:3989/api/post/"+postId,
            method:"DELETE",
            header:"Content-Type:application/json",
            complete:function(xmlhttp,status){
                if(xmlhttp.status==204)
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

    var loadPostInfo = function(){
        $.ajax({
            url:"http://localhost:3989/api/post/"+postId,
            method:"GET",
            header:"Content-Type:application/json",
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                   
                    if(data.userID != id){
                        $('#deletepost').hide();
                    }

                    str +='<h2><b class="text">'+data.postDescription+'</b></h2>';
                    for(var i=0;i<data.comments.length;i++){
                        str +='<h5 class="add-to-cart" style="margin-top: 10%; margin-bottom: 0%;">'+data.comments[i].user.username+'</h5>';
                        str +='<h4 class="text">'+data.comments[i].commentDescription+'</h4>';
                    }
                    $('#postInfo').html(str);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadPostInfo();
    $("#addcmnt").click(function(){
       addComment(); 
    });
});