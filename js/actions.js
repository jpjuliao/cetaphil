function toggle_visibility(id) {
    var e = document.getElementById(id);
    console.log(e);
    $('.flip-content-box').removeClass('flip');
    $('.scroller').removeClass('hidden');       
    if(e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}

function box_flip_show(el) {
    $('.flip-content-box').addClass('flip');
    // if ($(el).closest('.popup').attr('id') == 'clinical-data_popup') {
    //     return;
    // }
    // $('.scroller').addClass('hidden');           
};
function box_flip_hide(el) {
    $('.flip-content-box').removeClass('flip');
    // setTimeout(function(){ $('.scroller').removeClass('hidden')},200)
};   

$(function(){   
    var _currentBackground = "default";
    
    $(document).on("click touchstart", ".popup-close", function(){
        var id = $(this).data("videoid");
        if (typeof id === "undefined") return;
        $("#" + id).get(0).pause();
        
        toggle_visibility(id + '_popup');
    });
    
    $(".nav-cell").click(function(){ 
        
        var filterType = $(this).data("filter");
        
        if (filterType == "current") {
            M3.Pivot.Asset.OpenPDF("2017 Current Promotions for iVis_JB.pdf");
            //window.location = "Q4_2016_Current_Promotions_for_iVis_ver_2.pdf";
        }
        else {
            $(".secondary-product").remove();
            
            // style the buttons
            $(".nav-cell").removeClass("active");
            $(this).addClass("active");
            
            // hide all possible content
            $(".headline").hide();
            $(".content").hide();
            $(".product").hide();
            $(".products").show();
            
            // show the title
            $("#headline-" + filterType).fadeIn();
            
            // filter the product images
            var $productList = $(".product." + filterType);
            var $secondaryProductList = $(".product.secondary-" + filterType);
            $secondaryProductList.clone(true, true).addClass("secondary-product").appendTo(".products");
            
            if ($productList.length > 0) {
                $(".secondary-product:first").css("margin-left", "75px");
            }
            
            var $fullList = $(".product." + filterType + ", .secondary-product");
            
            if ($fullList.length > 0) {
                $fullList.stop().animate({width:'toggle'},350, "swing", function() {
                    // show the content text after the animation completes
                    $(".content").hide(); //  verify that the content was hidden - fixes issues when quickly clicking around
                    $("#content-" + filterType).stop().fadeIn();
                });
            }
            else {
                $("#content-" + filterType).stop().fadeIn();
            }

            //toggle for smaller products container
            if (filterType == "cleansers") {
                $('#ultra_gentle_body_wash').show()
                $('#ultra_gentle_soothing_body_wash').show()
                $(".products").removeClass("large-container");
            }
            else {
                $('#ultra_gentle_body_wash').hide()
                $('#ultra_gentle_soothing_body_wash').hide()
                $(".products").addClass("large-container");
            }
            
            // extra baby product filter
            if (filterType == "baby") {
                $(".product.eczema-baby").clone(true, true).addClass("secondary-product").appendTo("#baby-eczema-list");
                $("#baby-eczema-list .product").fadeIn();
                
                $(".product.sensitive").clone(true, true).addClass("secondary-product").appendTo("#baby-sensitive-list");
                $("#baby-sensitive-list .product").fadeIn();
            }

            // baby logo swap 
            if (filterType == "baby") {
                $("#cetaphil-logo").hide();
                $("#baby-logo").fadeIn();
            }
            else {
                $("#baby-logo").hide();
                $("#cetaphil-logo").fadeIn();
            }
            
            // change up the background for baby filter
            if (filterType == "baby" && _currentBackground == "default") {
                $("#background-default").hide();
                $("#background-baby").stop().fadeIn();
                _currentBackground = "baby";
            }
            else if (filterType != "baby" && _currentBackground == "baby") {
                $("#background-baby").hide();
                $("#background-default").stop().fadeIn();
                _currentBackground = "default";
            }
        }
           });
    $("#home").trigger("click"); 
});