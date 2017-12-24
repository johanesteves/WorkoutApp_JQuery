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

        posting.fail(function (data) {
            debugger;
            // alert("error")
        });

        posting.done(function (data) {
            $('#submitExercise').removeAttr('disabled');

            var exercise = data;
            var name = exercise["name"];
            var bodypart = exercise["bodypart"];

            var exerciseURL = '<li><a href = "/exercises/' + exercise["id"] + '"  data-id="' + exercise["id"] + '">' + name + '</a>' + " | " + bodypart + ' </li>';

            $('ul#exerciseList').append(exerciseURL);
        });

    })
}