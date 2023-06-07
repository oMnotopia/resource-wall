$(document).ready(function() {
  $("#copyLink").click(function(event) {
    event.preventDefault();
    const currentUrl = window.location.href;
    //copy the reference of this into $link so that it can be carried on 
    var $link = $(this);
    
    navigator.clipboard.writeText(currentUrl)
      .then(function() {
        console.log('URL has been copied');
        $link.text("Copied!");
      })
      .catch(function(err) {
        console.error("Error copying URL to clipboard:", err);
      });
  });
});
