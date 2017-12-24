$(document).ready(function () {
    attachListeners()
});

function attachListeners() {
    newExercise()
}


function newExercise() {
    $('#new_exercise').submit(function (e) {
        e.preventDefault();

        var values = $(this).serialize();
        var posting = $.post('/exercises', values);
        this.reset();

        posting.fail(function () {
            alert("error")
        });

        posting.done(function (data) {
            var exercise = data["data"];
            var name = exercise.attributes["name"];
            var bodypart = exercise.attributes["bodypart"];

            var exerciseURL = '<li><a href = "/exercises/' + exercise["id"] + '"  data-id="' + exercise["id"] + '">' + name + '</a>' + " | " + bodypart + ' </li>';

            $('ul#exerciseList').append(exerciseURL);

        });

    })
}