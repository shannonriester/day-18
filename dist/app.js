function liContainer() {
  return $(`
    <li class="li-list-item" data-id="">
      <div class="checkbox" role="checkbox"></div>
      <div class="li-list-item div-li-list">
        <div class="container-li-elements">
          <p class="to-do-content"></p>
          <div class="interactive-btn-container">
            <i class="fa fa-trash trash-icon" data-id="" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </li>`);
};

var $userInput = $('.user-input');
var $parentListItems = $('.list-container');
var $parentCompleted = $('.completed-container');
var $addBtn = $('.add-btn');
var $deleteBtn = $('.trash-icon');

$('.completed').css({'display': 'block'});
$('.to-do-items').css({'display': 'none'});
$('.deleted').css({'display': 'none'});

$.ajax({
    url: 'http://tiny-za-server.herokuapp.com/collections/day18-todolist-shannon',
    type: 'GET',
    dataType: 'JSON',
    success: function(response) {
      response.forEach(function(toDoItem, i) {
        var $liContainer = liContainer();

        $liContainer.attr('data-id', toDoItem._id);
        $liContainer.find('p').text(toDoItem.listItem);

        $liContainer.find('.interactive-btn-container').children('i').attr('data-id', toDoItem._id);
        $parentListItems.append($liContainer);
      });
        //run delete function in GET bc the trash-icon doesn't exist yet (only in on-click function)
      $('.trash-icon').on('click', deleteItem);
      $('.checkbox').on('click', checkBox);
    }
});

function deleteItem() {
    var $clickedTrashcan = $(this);
    console.log($clickedTrashcan);
    var listItemID = $clickedTrashcan[0].dataset.id;
    var targetedLI = $('li');
    $.ajax({
        url: 'http://tiny-za-server.herokuapp.com/collections/day18-todolist-shannon/' + listItemID,
        type: 'DELETE',
        dataType: 'JSON',
        success: function(response) {
            $('li[data-id=' + listItemID + ']').remove();
        }
    });
}

$addBtn.on('click', function() {
    var newListItem = $userInput.val();
    $.ajax({
        url: 'http://tiny-za-server.herokuapp.com/collections/day18-todolist-shannon',
        type: 'POST',
        dataType: 'JSON',
        data: {
            "listItem": newListItem
        },
        success: function(response) {
            newListItem = newListItem.trim();
            if (newListItem === '' || newListItem === ' ' || newListItem === '  ') {
            } else {
              var $liContainer = liContainer();

              $liContainer.find('p').text(newListItem);
              $('ol').append($liContainer);
            }
        },
    });
});

function checkBox(evt) {
  // var $completedItem = $(this);
  console.log();
    var $parentLi = $(this).parent();
    $(this).css({'background': '#473BF0'});
    window.setTimeout(function() {
      // $.ajax({
      //     url: 'http://tiny-za-server.herokuapp.com/collections/day18-todolist-shannon',
      //     type: 'DELETE',
      //     dataType: 'JSON',
      //     success: function(response) {
      //       $('.completed-container').append($parentLi);
      //
      //       }
      // }).then()
    }, 1000);


  }


$('.completed-btn').on('click', function(){
  $('#completed').css({'display': 'block'});
  $('#to-do-items').css({'display': 'none'});
  $('#deleted').css({'display': 'none'});
});

$('.to-do-items-btn').on('click', function(){
  $('#completed').css({'display': 'none'});
  $('#to-do-items').css({'display': 'block'});
  $('#deleted').css({'display': 'none'});
});

$('.deleted-nav-btn').on('click', function(){
  $('#completed').css({'display': 'none'});
  $('#to-do-items').css({'display': 'block'});
  $('#deleted').css({'display': 'none'});
});
