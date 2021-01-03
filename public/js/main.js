//"Select teams" option functionality
function setValue(event, n) {  

      // User input
      const userinput = event.target.value; 
      // Get nth typeOf <option>
      const option = document.getElementsByClassName('dropdown-item')[n];  
      // Set value
      option.value = option.innerHTML = `${userinput}`;
      //validating same team name
      var team_a = document.getElementById('team_a').value;
      var team_b = document.getElementById('team_b').value;      
      if(team_a == team_b){
          document.getElementsByClassName('sameTeam')[0].style.display="block";
      }
    }
 
const disableTie = ()=>{
  document.getElementById('match_tie_div').style.display = 'none';
}

//"Select Teams" sending request to server
const matchResult = () => {
  
  var team_a = document.getElementById('team_a').value;
  var team_b = document.getElementById('team_b').value;
  var winning_team = document.getElementById('inputGroupSelect01').value;
  var match_tie = document.getElementById('match_tie').value;

  //making request to backend
  let url = `/select-teams?team_a=${team_a}&team_b=${team_b}&winning_team=${winning_team}&tie=${match_tie}`
  const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onload = () => {
      const json = JSON.parse(xhr.responseText);
      if( json.message == '"Match Result Updated"'){
        document.getElementById('result').style.display = 'block';
      } 
      else {
        document.getElementById('loginModal').style.display = 'none';
      }
    }
    xhr.onerror = ()=>{
      alert('something went wrong')
    }
}
    
    
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

//disabling winner option
      function turnTrue() {
        return document.getElementById("match_tie").value = 'true';
      }
    