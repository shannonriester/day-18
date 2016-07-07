var $parentListItems = $('ol');
var $userInput = $('#userInput');


//this clears the input-text area
$userInput.focus(function(evt) {
    $(evt.target).val('');
});


// the GET section needs to go first...get all items that are stored in the object arry and display them onto the DOM
//this needs to show the current list items for the entire time
//no click-handlers/eventListeners for this part...
var settingsGET = {
    url: 'http://tiny-za-server.herokuapp.com/collections/day18-todolist-shannon',
    type: 'GET',
    dataType: 'JSON',
    success: function(response) {
        //grab each list-item-object
        response.forEach(function(listItemObject) {
            var $liContainer = $('<li data-id=""><div><p></p><i class="fa fa-trash trashIcon" data-id="" aria-hidden="true"></i></div></li>');
            //give each list-item the text that it is associated with
            $liContainer.children('div').children('p').text(listItemObject.listItem);
            $liContainer.attr('data-id', listItemObject._id);
            $liContainer.children('div').children('i').attr('data-id', listItemObject._id);
            var $deleteBtn = $('.trashIcon');
            //append to <ol>
            $parentListItems.append($liContainer);
        });

        //have to run delete function in GET bc the trash icon technically doesn't exist just in my delete function...
        $('.trashIcon').on('click', deleteItem);
    }
};
$.ajax(settingsGET);



//this is the POST part!
//adding new item to <ol>
//include data property(as JS element) in the ajax settings obj
//make sure this happens surrounding the POST or it will post new items on each webpage refresh
var $addBtn = $('#addBtn');
$addBtn.on('click', function() {
    //create new li element with new input value
    //this needs to be outside the success function
    var newListItem = $userInput.val();
    var settingsPOST = {
        url: 'http://tiny-za-server.herokuapp.com/collections/day18-todolist-shannon',
        type: 'POST',
        dataType: 'JSON',
        success: function(response) {
            //on click, get/save the NEW value of input
            newListItem = newListItem.trim();
            //if new value does not === '' or ' ' or '.'
            if (newListItem === '' || newListItem === ' ' || newListItem === 'What to do...') {
                console.log('nothing to do bc you didnt put anything good in your input box! ;P');
            } else {
                var $liContainer = $('<li data-id=""><div><p></p><i class="fa fa-trash" aria-hidden="true"></i></div></li>');
                //give each list-item the text that it is associated with
                $liContainer.children('div').children('p').text(newListItem);
                //append to <ol>
                $parentListItems.append($liContainer);
            }
        },
        data: {
            "listItem": newListItem
        }
    };
    $.ajax(settingsPOST);

});




//this is the DELETE request!
//target the list item that was clicked
//name-space li's with "data"
function deleteItem(itemID) {
    var clickedTrashcan = $(this);
    var listItemID = clickedTrashcan[0].dataset.id;
    var targetedLI = $('li');
    console.log(targetedLI);
    var settingsDELETE = {
        url: 'http://tiny-za-server.herokuapp.com/collections/day18-todolist-shannon/' + listItemID,
        type: 'DELETE',
        dataType: 'JSON',
        success: function(response) {
          $('li[data-id='+ listItemID +']').remove();
        }
    };
    $.ajax(settingsDELETE);

}
