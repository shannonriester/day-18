var $parentListItems = $('ol');
var $addBtn = $('#addBtn');
var $userInput = $('#userInput');

// the GET section needs to go first...get all items that are stored in the object arry and display them onto the DOM
var settingsGET = {
    url: 'http://tiny-za-server.herokuapp.com/collections/day18-todolist-shannon',
    type: 'GET',
    dataType: 'JSON',
    success: function(response) {

      //grab each list-item-object
      response.forEach(function(listItemObject){
        var $liContainer = $('<li><div data-id="#"><p>Finish laundry...</p><i class="fa fa-trash" aria-hidden="true"></i></div></li>');
        //give each list-item the text that it is associated with
        $liContainer.children('div').children('p').text(listItemObject.listItem);
        //append to <ol>
        $parentListItems.append($liContainer);
      });
      console.log($userInput.value);
    }
};
$.ajax(settingsGET);

//adding new item to <ol>
//this is the POST part!
//include data property(as JS element) in the ajax settings obj
// data : {
//
// }
//on.CLICK, make whatever is in the text-input be ADDED to the listitems-OBJECT


//this clears the input-text area
$userInput.focus(function(evt) {
    $(evt.target).val('');
});

//add eventListener to "add to list" button...
//make sure this happens surrounding the POST or it will post new items on each webpage refresh
// $addBtn.on('click', function(evt) {
//     $.ajax({
//         url: 'http://tiny-za-server.herokuapp.com/collections/day18-todolist-shannon',
//         type: 'POST',
//         dataType: 'JSON',
//         success: function(response) {
//             //on click, get/save the NEW value of input
//             var newListItem = $userInput.val();
//             //if new value does not === '' or ' ' or '.'
//             if (newListItem === '' || newListItem === ' ' || newListItem === ' ') {
//                 // console.log('that wont work!');
//             } else {
//                 //append to <ol></ol>
//             }
//         }
//     });
// });



//<ol> should already be in html file as it loaded
//li elements can be stored in JSON object, then already include them in the HTML once it loads
//this way, the user can delete those <li>s if he/she feels like it
//this is the DELETE request!
//name-space li's with "data"
