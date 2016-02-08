    <script type="text/javascript">
      /**
      * This page will be called from a Python script in App Engine that uses
      * Jinja templates to pass information from the script to the web page.
      * Here we get the mapid and token for the map tiles that were generated
      * by Earth Engine using the Python script ee_appengine.py.
      */

      var MAPID = "{{ mapid }}";
      var TOKEN = "{{ token }}";

      /**
      * The Google Maps API calls getTileUrl when it tries to display a maps
      * tile.  This is a good place to swap in the mapid and token we got from
      * the Python script. The other values describe other properties of the
      * custom map type.
      */
      var eeMapOptions = {
        getTileUrl: function(tile, zoom) {
          var url = ['https://earthengine.googleapis.com/map',
                     MAPID, zoom, tile.x, tile.y].join("/");
          url += '?token=' + TOKEN
          return url;
        },
        tileSize: new google.maps.Size(256, 256)
      };

      // Create the map type.
      var mapType = new google.maps.ImageMapType(eeMapOptions);

       // jQuery detects this state of readiness for you. Code included inside $( document ).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.       
      $(document).ready(function () {
        var city = new google.maps.LatLng(39.5272,-119.8219);
        var mapOptions = { zoom:8,center: city, mapTypeId: google.maps.MapTypeId.ROADMAP, clickable:true}
        map = new google.maps.Map($('#map').get(0), mapOptions)
        map.overlayMapTypes.push(null); // create empty overlay entry
        map.overlayMapTypes.setAt("0",mapType);
  
        var marker = new google.maps.Marker({position:new google.maps.LatLng(39.5272,-119.8219), map: map, draggable: true});

        google.maps.event.addListener(marker, 'dragend', function(a) {
          var div = document.createElement('div');
          var longitude=a.latLng.lng().toFixed(4) 
          var latitude=a.latLng.lat().toFixed(4)     
          document.getElementById('UserLatLong').value = longitude+','+latitude;
        });
      })

      google.maps.event.addDomListener(window, 'load', initialize);
    </script>
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.11.0/jquery-ui.js"></script>
            
