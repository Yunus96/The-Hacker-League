//"Select teams" option functionality
function setValue(event, n) {  
      // User input
      const userinput = event.target.value; 
      // Get nth typeOf <option>
      const option = document.getElementsByClassName('dropdown-item')[n];  
      // Set value
      option.value = option.innerHTML = userinput;
      }

//"Select Teams" sending request to server

    
// Table functionality
      $(document).ready( function () {
        var t = $('#myTable').DataTable( {
        "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        } ],
        "order": [[ 5, 'desc' ]]
    } );
 
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

      } );

// "Add Team" option functionality
      const addTeam = () =>{
        var teamname = document.getElementById('team_name').value
        const req = new XMLHttpRequest();
        req.open('GET', '/add-team?team_name='+teamname, true);
        req.send();
        req.onload = () => {
          const json = JSON.parse(req.responseText);
          if( json.message == 'team exist'){
            document.getElementById('team_exist').style.display = 'block';
          } 
          else {
            document.getElementById('loginModal').style.display = 'none';
            document.getElementById('addTeam').style.display = 'block';
          }
        }
        req.onerror = ()=>{
          alert('something went wrong')
        }
      }
    