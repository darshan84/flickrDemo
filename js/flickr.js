(function(document, window) {
   'use strict';

   var apiKey = 'a5e95177da353f58113fd60296e1d250';
   var apiURL = 'https://api.flickr.com/services/rest/';
   var userId = '24662369@N07';

   function searchText(parameters) {
      var requestParameters = Utility.extend(parameters, {
         method: 'flickr.photos.search',
         api_key: apiKey,
         format: 'json',
		 nojsoncallback:1
      });

      
	  var url = Utility.buildUrl(apiURL, requestParameters);
	  
	  $.ajax(url, { dataType: 'jsonp', jsonp: 'jsoncallback' })
			.then(function(data, status, xhr) {				
				Website.Homepage.showPhotos(data);
		}, function(xhr, status, error) {
			console.log('failed (promises): ' + error);
		});
   }
   
   function getPublicPhotos(parameters){
	   
	   var requestParameters =  Utility.extend(parameters, {
		 method: 'flickr.people.getPublicPhotos',
		 api_key: apiKey,
		 user_id: userId,
		 format: 'json',
		 nojsoncallback:1,
	  });
        
	  var url = Utility.buildUrl(apiURL, requestParameters);
	  
	  $.ajax(url, { dataType: 'jsonp', jsonp: 'jsoncallback' })
			.then(function(data, status, xhr) {		
				Website.Homepage.showPhotos(data);
		}, function(xhr, status, error) {
			console.log('failed (promises): ' + error);
		});
	   
   }

   function buildThumbnailUrl(photo) {
      return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
      '/' + photo.id + '_' + photo.secret + '_q.jpg';
   }

   function buildPhotoUrl(photo) {
      return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
             '/' + photo.id + '_' + photo.secret + '.jpg';
   }

   function buildPhotoLargeUrl(photo) {
      return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
      '/' + photo.id + '_' + photo.secret + '_b.jpg';
   }
   
   function getTitle(photo) {
	   return photo.title
   }
   
   function getId(photo){
	   return photo.id;
   }

   window.Flickr = Utility.extend(window.Flickr || {}, {
      buildThumbnailUrl: buildThumbnailUrl,
      buildPhotoUrl: buildPhotoUrl,
      buildPhotoLargeUrl: buildPhotoLargeUrl,
      searchText: searchText,
	  getPublicPhotos: getPublicPhotos,
	  getTitle: getTitle,
	  getId: getId
   });
})(document, window);