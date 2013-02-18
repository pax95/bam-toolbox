$(function () {
    $("#adapter-dd").change(function(){
	    var selectedAdapter = $("#adapter-dd option:selected").text();
			triggerCollect();
	});
    //$("#service-dd").ufd({log:true});
    //$("#operation-dd").ufd({log:true});
    $("#clearSelectionBtn").click(function(){
        $("#adapter-dd option:first-child").attr("selected", "selected");
        triggerCollect();
    });
    $("#timely-dd button").click(function(){
        $("#timely-dd button").removeClass('btn-primary');
        $(this).addClass('btn-primary');
        triggerCollect();
    });
});
function triggerCollect(){
        var selectedAdapter = $("#adapter-dd").find('option:selected').text();
        var timeGrouping = $("#timely-dd button.btn-primary").text();   
        reloadIFrame({adapter:selectedAdapter, timeGroup:timeGrouping});
};
function reloadIFrame(param){
    var params = param || {};
    var adapter = param.adapter || "";
    var t = param.timeGroup || "";
    $("iframe").each(function(){
        //var id = $(this).attr('id');
        var currentUrl = $(this).attr('src');
        if(currentUrl.indexOf('?')){
            var absUrl = currentUrl.split('?');
            currentUrl = absUrl[0];
        }   
        var newUrl = currentUrl+"?adapter="+encodeURI(adapter)+"&t="+t;
        $(this).attr('src',newUrl);
    });
};

$(document).ready(function(){
	$.ajax({
       		url:'populate_combos_ajaxprocessor.jag',
		dataType:'json', 
		success:function(result){
			
			var options = "<option value='__default__'></option>";
			for(var i=0;i<result.length;i++){
				var data = result[i];
				for(var key in data){
					options = options + "<option>"+data[key]+"</option>"
				}
			}
            $("#adapter-dd").find('option').remove();
            $("#adapter-dd").append(options);
		    //$("#server-dd").ufd({log:true,addEmphasis: true});
  	    }
		
	});
    /*$.getJSON("populate_combos_ajaxprocessor.jag?server=10.150.3.174:9443",
        function(data){
          alert(data);
        });*/
});



