$(function() {

   $('#menu').on('click','li', function(){
       console.log('click');
       $('#show-menu').prop( "checked", false );;
   })

});