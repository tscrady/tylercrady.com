



$(document).ready(function(){
   
   
   //Initializing jquery datepicker, it's on admin/post and admin/portfolio
   //I'm the only one seeing this and I don't really care about the format, so, yeah
    $(function(){
        $( "#datepicker" ).datepicker({
            dateFormat: 'yy-mm-dd'
        });
    });
    
    
    //Creating/editing new post(s) 
    //Creating/editing new post(s) 
    //Creating/editing new post(s) 
    //Creating/editing new post(s) 
    //Creating/editing new post(s) 
    $("#create_new_post").click(function(event){
        
        //We all know what this does
        event.preventDefault();
        
        //Lets grab our values
        var title   = $("#post_title").val();
        var cat     = $("#post_category").val();
        var body    = $("#post_body").val();
        var m_type  = $("#media_type").val();
        var m_url   = $("#media_url").val();
        var date    = $("#datepicker").val();
        var post_id = $("#post_id").val();
        
        
        //Even though I should be the only one inputting anything, justin case.
        body  = body.replace("<script>", "");
        body  = body.replace("</script>", "");
        title = title.replace("<script>", "");
        title = title.replace("</script>", "");
        m_url = m_url.replace("<script>", "");
        m_url = m_url.replace("</script>", "");
        
        //So it is easy to manage on the other side
        var data = {                
            title   : title,
            cat     : cat,
            body    : body,
            m_type  : m_type,
            m_url   : m_url,
            date    : date,
            post_id : post_id
        };
        
        if(post_id == 0){//If id is 0 we are creating a new post
            $.ajax({
                type: 'POST',
                url: 'https://tylercrady.com/php/ajax.php',
                dataType: 'json',
                data: ({
                    request: "create_post",
                    data: data
                }),
                success: function(response){ 
                    if(response.status === "success"){
                        show_message("normal", "Post Created");
                        setTimeout(function(){
                            window.location.href = "https://tylercrady.com/admin/post/"+response.new_post_id;
                        }, 2000);
                        
                    }
                    else{

                    }
                }//end ajax success
            });//end ajax
        }//end if
        else{// if id is not 0, it's already a post, lets just update it
            $.ajax({
                type: 'POST',
                url: 'https://tylercrady.com/php/ajax.php',
                dataType: 'json',
                data: ({
                    request: "edit_post",
                    data: data
                }),
                success: function(response){ 
                    if(response === "success"){
                        show_message("normal", "Post Saved");
                    }
                    else{
                        show_message("error", "Error Saving Post");
                    }
                }
            });//end ajax
        }//end else
    });//end creat new post
    
    
    
    //Creating/editing new portolio items
    //Creating/editing new portolio items
    //Creating/editing new portolio items
    //Creating/editing new portolio items
    //Creating/editing new portolio items
    $("#create_new_portfolio").click(function(event){
       
        event.preventDefault();
        
        //Lets grab all our values - we will grab images in just a sec
        var title        = $("#portfolio_title").val();
        var project_type = $("#project_type").val();
        var body         = $("#portfolio_body").val();
        var date         = $("#datepicker").val();
        var technology   = $("#technologies").val();
        var portfolio_id = $("#portfolio_id").val();
        
        body  = body.replace("<script>", "");
        body  = body.replace("</script>", "");
        title = title.replace("<script>", "");
        title = title.replace("</script>", "");
        
        
        //Grab all the image paths, descriptions, id, and current place. 
        //Soon I will be able to swap the image order around somehow.
        var images = new Array();
        $(".image_container").each(function(){
            var description = $(this).children("div").children(".description").val();
            var image_path  = $(this).children("div").children(".portfolio_file").attr("data-image_path");
            var id          = $(this).children("div").children(".portfolio_file").attr("data-id");
            var image_num   = $(this).children("div").children(".portfolio_file").attr("data-image_number");
            
            //I went the array route just for ease. Merging objects was getting weird
            //Soooooo, on the other side just have to remember the position in the array for each value. 
            var temp = new Array(description, image_path, image_num, id);
            images.push(temp);
        });
        
        //At least this will be nice on the other side
        var data = {                
            title        : title,
            technology   : technology,
            project_type : project_type,
            body         : body,
            date         : date,
            portfolio_id : portfolio_id,
            images       : images
        };
        
        if(portfolio_id == 0){//if id is 0, we are creating a new portfoli item
            $.ajax({
                type: 'POST',
                url: 'https://tylercrady.com/php/ajax.php',
                dataType: 'json',
                data: ({
                    request: "create_portfolio",
                    data: data
                }),
                success: function(response){ 
                    if(response.status === "success"){
                        show_message("normal", "Portfolio Created");
                        setTimeout(function(){
                            window.location.href = "https://tylercrady.com/admin/portfolio/"+response.new_portfolio_id;
                        }, 2000);
                        
                    }
                    else{

                    }
                }//end success
            });//end ajax
        }//end if
        else{// if the id is not 0, we are editing a portfolio item
            $.ajax({
                type: 'POST',
                url: 'https://tylercrady.com/php/ajax.php',
                dataType: 'json',
                data: ({
                    request: "edit_portfolio",
                    data: data
                }),
                success: function(response){ 
                    if(response.status === "success"){
                        show_message("normal", "Portfolio Saved");
                    }
                    else{
                        show_message("error", "Error Saving Portfolio");
                    }
                }//end success
            });//end ajax
        }//end else
    });//end creat new post
    
    
    
    //Uploading an image from the portfolio admin page
    //Uploading an image from the portfolio admin page
    //Uploading an image from the portfolio admin page
    $(document).on("change", ".portfolio_file", function(event){
        
        //typical...
        event.preventDefault();
        
        var curr_image  = $(this).attr("data-image_number");
        var $this       = $(this);
        
        if(typeof $('input[type=file]')[curr_image-1].files[0] !== 'undefined'){
           
            //Show loading
            $("#loading"+curr_image).show();
            
            //Create formData var and append data
            var formData = new FormData();
            formData.append('image', $('input[type=file]')[curr_image-1].files[0]);
            formData.append("image_number", curr_image);
            
            // make ajax call to upload the photo, 
            $.ajax({
                url: "https://tylercrady.com/admin/upload_portfolio_images.php",
                type: "POST",
                data: formData,
                contentType: false,
                      cache: false,
                processData: false,
                success: function(data)
                {
                    //all these checks came from another script, might as well leave 'em in.
                    //I'm running a photoshop action on portfolio images anyways
                    if(data==='invalid file'){
                        $("#loading"+curr_image).hide();
                        show_message("error", "There was an error when uploading that image.");
                    }
                    else if(data === "too small"){
                        $("#loading"+curr_image).hide();
                        show_message("error", "The image you are trying to upload is too small.");
                    }
                    else if(data === "too big"){
                        $("#loading"+curr_image).hide();
                        show_message("error", "The image you are trying to upload is too big.");
                    }
                    else{
                        $this.attr("data-image_path", data).css("background-image","url('"+data+"')");
                        $("#loading"+curr_image).hide();
                        $("#success"+curr_image).show();
                    }
                }
            });
        }
    });//end image upload
    
    
    
    
    
    
    //Change the status of a post, active/inactive
    //Change the status of a post, active/inactive
    //Change the status of a post, active/inactive
    //Change the status of a post, active/inactive
    //Change the status of a post, active/inactive
    $(".change_post_status").click(function(){
       var status = $(this).data('status');
       var id     = $(this).data('id');
       var data = {
           status : status,
           id     : id
       };
       var $this = $(this);//so I can access this in the ajax callback
       $.ajax({
            type: 'POST',
            url: 'https://tylercrady.com/php/ajax.php',
            dataType: 'json',
            data: ({
                request: "change_status",
                data: data
            }),
            success: function(response){ 
                if(response.status === "success"){
                    $this.data("status", response.new_status);
                    $this.text(response.status_text);
                }
                else{
                    show_message("error", "Error changing status");
                }
            }
        });//end ajax
        
    });
    
    
    //Change the status of a portfolio, active/inactive
    //Change the status of a portfolio, active/inactive
    //Change the status of a portfolio, active/inactive
    //Change the status of a portfolio, active/inactive
    //Change the status of a portfolio, active/inactive
    $(".change_portfolio_status").click(function(){
       var status = $(this).data('status');
       var id     = $(this).data('id');
       var data = {
           status : status,
           id     : id
       };
       var $this = $(this);//so I can access this in the ajax callback
       $.ajax({
            type: 'POST',
            url: 'https://tylercrady.com/php/ajax.php',
            dataType: 'json',
            data: ({
                request: "change_portfolio_status",
                data: data
            }),
            success: function(response){ 
                if(response.status === "success"){
                    $this.data("status", response.new_status);
                    $this.text(response.status_text);
                }
                else{
                    show_message("error", "Error changing status");
                }
            }
        });//end ajax
        
    });
    
    
    //This is the function to show messages to the user --------------------------
    //This is the function to show messages to the user --------------------------
    //This is the function to show messages to the user --------------------------
    //This is the function to show messages to the user --------------------------
    //This is the function to show messages to the user --------------------------
    var timer;
    function show_message(type, message){
        clearTimeout(timer);
        var bg_color;
        if(type === 'error'){
            bg_color = "#4d0000";
        }else{
            bg_color = "#14272E";
        }
        $("#message p").text(message);
        $("#message").css("background-color",bg_color).fadeIn();
        timer = setTimeout(function(){
            $("#message").fadeOut();
        }, 5000);
    }//end function
    
    
    
    
    
    
    
    //Adding an image group to the portfolio admin page
    //Adding an image group to the portfolio admin page
    //Adding an image group to the portfolio admin page
    //Adding an image group to the portfolio admin page
    //Adding an image group to the portfolio admin page
    var image_count = $(".image_container").size();//starts at 1 ( not 0 )if there are no images yet
    $("#add_image").click(function(){
        image_count++;
        var image_div  = '<div class="image_container">';
            image_div += '<div class="col-xs-12 col-sm-6"><p class="input_label">Image Description '+image_count+'</p><textarea class="description"></textarea></div>';
            image_div += "<div class='col-xs-12 col-sm-6 file_box'><p class='input_label'>Image "+image_count+"</p><input data-id='0' data-image_number='"+image_count+"' data-image_path='' type='file' class='portfolio_file'>";
            image_div += "<image class='loading portfolio_loading' id='loading"+image_count+"' src='https://tylercrady.com/images/loading.gif'/>";
            image_div += "<image class='loading portfolio_loading' id='success"+image_count+"' src='https://tylercrady.com/images/upload_success.png'/>";
            image_div += "</div>";
            image_div += "</div>";
        $("#portfolio_images").append(image_div);
    });
    
    
});//End jquery document ready


