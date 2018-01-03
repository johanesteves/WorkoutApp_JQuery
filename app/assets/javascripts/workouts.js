document.addEventListener("turbolinks:load",function () {
    attachWorkoutListeners();
});

function attachWorkoutListeners() {
    getWorkoutExercises();
    clearWorkoutReports();
    viewReports();
    getWorkoutReports();
}

function clearWorkoutReports() {
    $('#clearFilter').click(function (e) {
        $(this).data('clicked', true);
    })
}

function getWorkoutReports() {
    $('#filterReport').submit(function (e) {
        e.preventDefault();

        if($('#clearFilter').data('clicked')) {
            this.reset();
        }

        var values = $(this).serialize();
        $.get('/workouts/reports.json?' + values, function (data) {
            var workoutList = $('#reportWorkoutList');
            workoutList.empty();

            var workouts = data;

            if(workouts.length > 0){
                for (i = 0; i < workouts.length; i++) {
                    workoutList.append('<li><a href="/workouts/' + workouts[i].id + '">' + workouts[i].name + '</a>' + " " + workouts[i].date + '</li>')
                }
            }else{
                workoutList.append('No workouts found for the selected date range.')
            }
        });
        $('#clearFilter').removeData('clicked')
    })
}

function getWorkoutExercises() {
    $('.js-next').click(function (e) {
        e.preventDefault();
        var currentId = this.dataset.id;

        var allWorkouts = $.get('/workouts/workout_ids.json');

        allWorkouts.done(function(workoutsData){
            var workoutIds = workoutsData;

            var workoutIndex = workoutIds.findIndex(function(x){
                return x === parseInt(currentId);
            });

            var nextId = "";

            if(workoutIds[workoutIndex + 1]){
                nextId = workoutIds[workoutIndex + 1];
            }else{
                nextId = workoutIds[0];
            }

            $.get('/workouts/' + nextId + '.json', function (data) {
                var workoutList = $('ul#workoutList');
                var workoutName = data["name"];
                var workoutDate = data["date"];

                $('h2').html(workoutName + "<small> | " + workoutDate + "</small>");
                workoutList.empty();

                if(data.exercises.length > 0){
                    for (i = 0; i < data.exercises.length; i++) {
                    workoutList.append('<li><a href="/exercises/' + data.exercises[i].id + '">' + data.exercises[i].name + '</a>' + ' | <em>' + data.exercises[i].bodypart + '</em>' + '</li>' )
                    }
                }else{
                    workoutList.append('No exercises just yet. Add one above!')
                }

                $('.js-next').attr('data-id', nextId);
                $('a#editExercises').attr("href", "/workouts/" + nextId +"/edit");
                $('a#deleteWorkout').attr("href", "/workouts/" + nextId);
                $('a#updateReps').attr("href", "/workouts/" + nextId +"/exercises")

            });
        });
    })
}

function viewReports(values) {

    $('#viewReports').click(function (e) {
        e.preventDefault();

        var form = `
        <h2>Reports</h2> <br>
        <form id="filterReport" action="/workouts/reports" accept-charset="UTF-8" method="get">
          <input name="utf8" type="hidden" value="✓">
          <input type="date" name="date_filter_beg" id="date_filter_beg">
          <input type="date" name="date_filter_end" id="date_filter_end">
          <input type="submit" value="Filter" id="submitFilter">
          <input type="submit" value="Reset" id="clearFilter">
        </form><br>
        <ul id="reportWorkoutList">
        </ul>
        `;

        $.get('/workouts/reports.json?' + values, function (data) {
            var workoutList = $('#reportWorkoutList');
            workoutList.empty();

            var workouts = data;

            if(workouts.length > 0){
                for (i = 0; i < workouts.length; i++) {
                    workoutList.append('<li><a href="/workouts/' + workouts[i].id + '">' + workouts[i].name + '</a>' + " " + workouts[i].date + '</li>')
                }
            }else{
                workoutList.append('No workouts found for the selected date range.')
            }
        });

        $('#app-container').html(form);
        getWorkoutReports();
    })

}