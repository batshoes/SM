(function(sm) {

  updateVisitorCustomAttributes = function(attributeName, attributeValue){
    getCurrentVisitor(salemove).then(function(visitor) {
      visitor.custom_attributes[attributeName] = attributeValue
      $.ajax({
        type: "POST",
        beforeSend: function (request)
          {
            requestHeaders = sm.salemoveApi.getRequestHeaders();
              Object.keys(requestHeaders).forEach(function(key) {
              request.setRequestHeader(key, requestHeaders[key]);
            });
          },
        url: "https://api.salemove.com/visitor",
        data:
          {
            // 'note_update_method': 'append',
            'custom_attributes': visitor.custom_attributes
          }
        });
      }, function(error) {
        console.log('An error occurred: ', error);
      }
    );
  }

  updateVisitorInformation = function(attributeName, attributeValue){
    getCurrentVisitor(salemove).then(function(visitor) {
      visitor[attributeName] = attributeValue;
      delete visitor.id;
      delete visitor.href;
      $.ajax({
        type: "POST",
        beforeSend: function (request)
          {
            requestHeaders = sm.salemoveApi.getRequestHeaders();
              Object.keys(requestHeaders).forEach(function(key) {
              request.setRequestHeader(key, requestHeaders[key]);
            });
          },
        url: "https://api.salemove.com/visitor",
        data: visitor
        });
      }, function(error) {
        console.log('An error occurred: ', error);
      }
    );
  }


  getCurrentVisitor = function() {

    return new Promise(function(resolve, reject) {
     var xhr = new XMLHttpRequest();
     var API_DOMAIN = "api.salemove.com"
     var GET_CURRENT_VISIT_ENDPOINT = "https://" + API_DOMAIN + "/visitor";
     xhr.open('GET', GET_CURRENT_VISIT_ENDPOINT);

      requestHeaders = sm.salemoveApi.getRequestHeaders();
        Object.keys(requestHeaders).forEach(function(key) {
        xhr.setRequestHeader(key, requestHeaders[key]);
     });

      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
         parsedResponse = JSON.parse(xhr.responseText);
         resolve(parsedResponse);
        } else {
         reject(xhr.statusText);
        }
      };
      xhr.onerror = function() { reject(xhr.statusText); };

     xhr.send();
    });
  }

  sm.getApi({version:'v1'}).then(
    function(api){
      sm.salemoveApi = api;

        // List of listeners for various events.

        // Type 1:
        // Updates the current custom attributes
        // Then submits the object nested in custom attributes
      $('#preview').submit(function(){
        url = $('#cookieValue').val();
        updateVisitorCustomAttributes("previewUrl", url);
      });

      $('.resource, .home-persona-block').click(function(){
        personaType = this.dataset.persona;
        updateVisitorCustomAttributes("persona", personaType);
      });

      $('.home-video-colomn > .w-embed').click(function(){
        updateVisitorCustomAttributes("videoWatched","yes")
      });

      $('#First-Name, #Last-Name').change(function(){
        if ($(this).val().length > 0) {
           name = $('#First-Name').val() + " " + $('#Last-Name').val()
           updateVisitorInformation("name", name);
        };
      });

      $('#First-Name-3, #Last-Name-3').change(function(){
        if ($(this).val().length > 0 ) {
          name = $('#First-Name-3').val() + " " + $('#Last-Name-3').val()
          updateVisitorInformation("name", name);
        }
      });

      $('#First-Name-2, #Last-Name-2').change(function(){
        if ($(this).val() > 0 ) {
          name = $('#First-Name-2').val() + " " + $('#Last-Name-2').val()
          updateVisitorInformation("name", name);
        }
      });

      $('#Company-Name, #Company-Name-3, #Company-2').change(function(){
        if ($(this).val() > 0) {
          companyName = $(this).val();
          updateVisitorCustomAttributes("companyName", companyName);
        }
      });

      $('#Job-Title-2').change(function(){
        if ($(this).val().length > 0 ) {
          jobTitle = $(this).val();
          updateVisitorCustomAttributes("jobTitle", jobTitle);
        };
      });

      $('#Email-2, #Email-5, #email-4, #email').change(function(){
        if ($(this).val().length > 0 ) {
          email = $(this).val();
          updateVisitorInformation("email", email);
        };
      });

      $('#Phone-2').change(function(){
        if ($(this).val().length > 0) {
          phone = $(this).val();
          updateVisitorInformation("phone", phone);
        };
      });
    }
 );
}
)(sm);
