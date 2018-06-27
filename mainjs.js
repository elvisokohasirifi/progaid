function preview(event){
	var reader = new FileReader();
	reader.onload = function () {
		var output = document.getElementById('view');
		output.style.display = 'block';
		document.getElementById('imageget').style.padding = "10px 0px";
		output.src = reader.result;
	}
	reader.readAsDataURL(event.target.files[0]);
}

function validate(){
	name = document.getElementById('prodname').value;
	category = document.getElementById('category').value;
	brand = document.getElementById('brand').value;
	price = document.getElementById('price').value;
	desc = document.getElementById('description').value;
	key = document.getElementById('keywords').value;
	if(name == '' || category == '' || brand == '' || price == '' || desc == '' || key == ''){
		alert('Please enter all the details');
		return false;
	}
	else if(isNaN(parseFloat(price)) || !isFinite(price)){
		alert('Price must be a decimal or an integer');
		return false;
	}
	else
		return true;
}

$(document).ready(function(e){
    $("#insertform").on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'uploadproduct.php',
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('#submitbut').attr("disabled","disabled");
                $('#insertform').css("opacity",".5");
            },
            success: function(msg){
                $('#status').html('');
                if(msg == 'ok'){
                    $('#insertform')[0].reset();
                    $('#status').html('<span style="font-size:18px;color:#34A853">Product was successfully inserted.</span>');
                }else{
                    $('#status').html('<span style="font-size:18px;color:#EA4335">Some problem occurred, please try again.</span>');
                }
                $('#insertform').css("opacity","");
                $("#submitbut").removeAttr("disabled");
            }
        });
    });
    
    //file type validation
    $("#file").change(function() {
        var file = this.files[0];
        var imagefile = file.type;
        var match= ["image/jpeg","image/png","image/jpg"];
        if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))){
            alert('Please select a valid image file (JPEG/JPG/PNG).');
            $("#imageget").val('');
            return false;
        }
    });
});
