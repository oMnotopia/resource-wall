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

  //validating the updating-profile-form.
  $('.update-profile-form').submit(function(event) {
    console.log('clicked');
    const oldPassword = $('.oldPassword').val();
    const newPassword = $('.newPassword').val();
    
    if ((!oldPassword && newPassword) || (oldPassword && !newPassword)) {
      event.preventDefault();
      if (!oldPassword) {
        $('.oldPassword').attr('placeholder', 'Cannot be empty.').css({
          'color': 'darkred',
          'font-weight': 'bold',
        });
      } 
      else {
        $('.newPassword').attr('placeholder', 'Cannot be empty.').css({
          'color': 'darkred',
          'font-weight': 'bold',
        });
      }
    }
  });

});
