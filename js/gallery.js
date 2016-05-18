(function(document, window) {
   'use strict';

   function Gallery(photos, modal) {
      this.currentIndex = 0;
      this.photos = photos;
	  this.modal = modal;

      //this.showPhoto(this.currentIndex);
   }

   Gallery.prototype.showPhoto = function(index) {
	  
	  var me = this;
      if (index >= 0 && index < this.photos.length) {		 
         this.currentIndex = index;
		 this.modal.find('.modal-header').html('<p>'+Flickr.getTitle(this.photos[this.currentIndex])+'</p>');
		 var bigImg = $('<img/>', {src: Flickr.buildPhotoLargeUrl(this.photos[this.currentIndex])});
         this.modal.find('.modal-body').empty().append(bigImg);
		 this.modal.find('#next').on('click', function(){me.showNext();});
		 this.modal.find('#prev').on('click', function(){me.showPrevious();});
		 this.modal.modal();
      }
   };

   Gallery.prototype.showPrevious = function() {
      if (this.currentIndex > 0) {
         this.currentIndex--;
      }

      this.showPhoto(this.currentIndex);
   };

   Gallery.prototype.showNext = function() {	   
      if (this.currentIndex < this.photos.length - 1) {
         this.currentIndex++;
      }

      this.showPhoto(this.currentIndex);
   };

   Gallery.prototype.createThumbnailsGallery = function(container) {      
	  
	  function clickHandler(index, gallery) {		  
         return function (event) {
            event.preventDefault();
            gallery.showPhoto(index);
         };
      }	
   
	  $("#imgList").empty();
      for (var i = 0; i < this.photos.length; i++) {
		 
		 var  row = $('<div/>', {  class: 'row' }),
			imgcol = $('<div/>', {  class: 'col-sm-4' }),
	        well = $('<div/>', {  class: 'well', style: 'height:180px;' }),
			well1 = $('<div/>', {  class: 'well', text: Flickr.getTitle(this.photos[i]), style: 'height:180px;' }),
		    desc = $('<div/>', {  class: 'col-sm-8' }),
			img = $('<img/>', {src: Flickr.buildThumbnailUrl(this.photos[i])}),
			anchorTag = $('<a/>', {id: Flickr.getId(this.photos[i])});
			
			anchorTag.on('click', clickHandler(i, this)); 			
            anchorTag.append(img);			
			well.append(anchorTag);
			imgcol.append(well);
			desc.append(well1);
			row.append(imgcol).append(desc);
			
			$("#imgList").append(row);
      }
   };

   window.Gallery = Gallery;
})(document, window);