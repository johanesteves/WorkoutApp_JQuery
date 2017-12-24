$(document).ready(function () {
    attachListeners()
});

function attachListeners() {
    getWorkoutExercises()
}

function getWorkoutExercises() {
    $('.js-next').click(function (e) {
        e.preventDefault();
        var currentId = this.dataset.id;

        var allWorkout = $.get('/workouts.json', function () {
        });

        allWorkout.done(function(workoutsData){
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

                debugger;
                var workoutList = $('ul#workoutList');
                workoutList.empty();

                if(data.exercises.length > 0){
                    for (i = 0; i < data.exercises.length; i++) {
                    workoutList.append('<li><a href="/exercises/' + data.exercises[i].id + '">' + data.exercises[i].name + '</a> </li>' )
                    }
                }else{
                    workoutList.append('No exercises just yet. Add one above!')
                }

                $('.js-next').attr('data-id', nextId)
            });
        });
    })
}