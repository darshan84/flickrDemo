(function(document, window) {
   'use strict';

   var gallery,
	   lastSearch = 'London',
	   page;

   function searchPhotos(text) {
      if (text.length === 0) {
         alert('Error: the field is required');
		 return false;
      }

      Flickr.searchText({
		 per_page: 10,
         text: text,
         jsoncallback: 'Website.Homepage.showPhotos'
      });
	  
	  $('#headerTitle').text("Search Term : "+text);
   }
   
   function getPublicPhotos(page) {
      
      page = page > 0 ? page : 1;
	  
      Flickr.getPublicPhotos({
         per_page: 10,
         jsoncallback: 'Website.Homepage.showPhotos',
         page: page
      });
   }   

   function showPhotos(data) {	 
      gallery = new Gallery(data.photos.photo, $('#myModal'));
      gallery.createThumbnailsGallery($("#imgList"));
   }

   function init() {      
      // Kickstart the page      
	  
	  _bindUIAction();
	  
	  getPublicPhotos(1);
	  
	  page = 1;
   }
   
   function _bindUIAction(){
	    $('#searchBtn').on('click', function(){
			searchPhotos($('#searchText').val());
		});
		
		$("#nextPage").on('click', function(){
			page = page+1;
			getPublicPhotos(page);
		});
		
		$("#prevPage").on('click', function(){
			page = page-1;
			getPublicPhotos(page);
		});
		
		
   }

   window.Website = Utility.extend(window.Website || {}, {
      Homepage: {
         init: init,
         showPhotos: showPhotos,
		 getPublicPhotos: getPublicPhotos
      }
   });
})(document, window);

$(function(){	
	Website.Homepage.init();	
});
