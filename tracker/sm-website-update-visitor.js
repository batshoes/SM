$('document').ready(function(){
  sm.getApi({version:'v1'}).then(
    function(api){
      window.salemoveApi = api;
      getHeaders();
      getCurrentVisitor();

      // List of listeners for various events.

      // Type 1:
        // Updates the current custom attributes
        // Then submits the object nested in custom attributes
      $('#preview').submit(function(){
        url = $('#cookieValue').val();
        currentCustomAttributes["previewUrl"] = url
        updateVisitorDetails("custom_attributes", currentCustomAttributes);
      });
      
      $('.resource, .home-persona-block').click(function(){
        personaType = this.dataset.persona;
        currentCustomAttributes["persona"] = personaType
        updateVisitorDetails("custom_attributes", currentCustomAttributes);
      });

      $('.home-video-colomn > .w-embed').click(function(){
        currentCustomAttributes["videoWatched"] = "true"
        updateVisitorDetails("custom_attributes", currentCustomAttributes);
      });

      $('#First-Name, #Last-Name').change(function(){
        if ($(this).val() === "") {
          return
        } else {
          name = $('#First-Name').val() + " " + $('#Last-Name').val()
          updateVisitorDetails("name", name);
        };
      });

      $('#First-Name-3, #Last-Name-3').change(function(){
        if ($(this).val() === "") {
          return
        } else {
          name = $('#First-Name-3').val() + " " + $('#Last-Name-3').val()
          updateVisitorDetails("name", name);
        }
      });

      $('#First-Name-2, #Last-Name-2').change(function(){
        if ($(this).val() === "") {
          return
        } else {
          name = $('#First-Name-2').val() + " " + $('#Last-Name-2').val()
          updateVisitorDetails("name", name);
        }
      });
      
      $('#Company-Name, #Company-Name-3, #Company-2').change(function(){
        if ($(this).val() === "") {
          return
        } else {
          company = $(this).val();
          currentCustomAttributes["companyName"] = company
          updateVisitorDetails("custom_attributes", currentCustomAttributes);;
        }
      });

     $('#Job-Title-2').change(function(){
        if ($(this).val() === "") {
          return
        } else {
          JobPosition = $(this).val();
          currentCustomAttributes["JobTitle"] = JobPosition
          updateVisitorDetails("custom_attributes", currentCustomAttributes);
        };
      });

      $('#Email-2, #Email-5, #email-4, #email').change(function(){
        if ($(this).val() === "") {
          return
        } else {
          email = $(this).val();
          updateVisitorDetails("email", email)
        };
      });

      $('#Phone-2').change(function(){
        if ($(this).val() === "") {
          return
        } else {
          phone = $(this).val();
          updateVisitorDetails("phone", phone);
        };
      });
    }
  ); 
});
  
function getHeaders(){
  // Set request headers to get current visitor information
  window.requestHeadersAuth = salemoveApi.getRequestHeaders()['Authorization']
  window.requestHeadersSession = salemoveApi.getRequestHeaders()['X-Salemove-Visit-Session-Id']
};

function updateVisitorDetails(attributeType, attributeData){
  dataAttributes[attributeType] = attributeData
  $.ajax({
      type: "POST",
      beforeSend: function (request)
        {
            request.setRequestHeader('Authorization',
                      requestHeadersAuth);
            request.setRequestHeader('Accept',
                      'application/vnd.salemove.v1+json');
            request.setRequestHeader('X-Salemove-Visit-Session-Id',
                      requestHeadersSession);
        },
      url: "https://api.salemove.com/visitor",
      data: dataAttributes
    });
}

function getCurrentVisitor(){
// Get details of current visitor
  $.ajax({
      type: "GET",
      beforeSend: function (request)
        {
            request.setRequestHeader('Authorization',
                      requestHeadersAuth);
            request.setRequestHeader('Accept',
                      'application/vnd.salemove.v1+json');
            request.setRequestHeader('X-Salemove-Visit-Session-Id',
                      requestHeadersSession);
        },
      url: "https://api.salemove.com/visitor",
      success: function(e){
        // Set empty object to update visitor
        dataAttributes = {}

        if (e.custom_attributes == null || undefined) {
          // Set empty object for custom attributes
          window.currentCustomAttributes = {}
        } else {          
          // Set custom attributes to any existing custom attributes.
          window.currentCustomAttributes = e.custom_attributes  
        }
      }
    });
}