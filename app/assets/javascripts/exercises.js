document.addEventListener("turbolinks:load",function () {
    attachExerciseListeners();
});

function attachExerciseListeners() {
    newExercise()
}

class Exercise{
    constructor(name, bodypart, id){
        this.name = name;
        this.bodypart = bodypart;
        this.id = id;
    }

    mergeExerciseUrl() {
        return '<a href = "/exercises/' + this.id + '"  data-id="' + this.id + '">' + this.name + '</a>' + " | " + this.bodypart
    }
}

function newExercise() {
    $('#new_exercise').submit(function (e) {
        e.preventDefault();

        var values = $(this).serialize();
        var posting = $.post('/exercises', values);
        this.reset();

        posting.fail(function (data) {
            // alert("error")
        });

        posting.done(function (data) {
            $('#submitExercise').removeAttr('disabled');

            var exercise = data;
            var newExercise = new Exercise(exercise.name, exercise.bodypart, exercise.id);
            var exerciseURL = '<li>'+ newExercise.mergeExerciseUrl() + ' </li>';

            $('ul#exerciseList').prepend(exerciseURL);
        });

    })
}