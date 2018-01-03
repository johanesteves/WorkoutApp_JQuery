document.addEventListener("turbolinks:load",function () {
    attachExerciseListeners();
});

function attachExerciseListeners() {
    newExercise();
    // showExercise()
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
            $('#submitExercise').removeAttr('disabled');

            var errorHtml = [];

            data.responseJSON.errors.map((error)=> {
                errorHtml.push('<li>'+ error +'</li>')
            });

            $('#errorMsg').html('<ul>'+ errorHtml.join('') +'</ul>')
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

// function showExercise() {
//     $('.showExercise').click(function (e) {
//         e.preventDefault();
//     })
// }