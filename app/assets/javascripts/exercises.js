document.addEventListener("turbolinks:load",function () {
    attachExerciseListeners();
});

function attachExerciseListeners() {
    newExercise();
    showExercise()
}

class Exercise{
    constructor(exercise){
        this.name = exercise.name;
        this.bodypart = exercise.bodypart;
        this.id = exercise.id;
    }

    mergeExerciseUrl() {
        return '<a href = "/exercises/' + this.id + '"  data-id="' + this.id + '">' + this.name + '</a>' + " | " + this.bodypart
    }

    exerciseCard() {
        return '<h2>'+ this.name +'<small> | '+ this.bodypart +'</small>' +'</h2>' +
            '<a class="btn btn-secondary" href="/exercises/' + this.id + '/edit">Edit</a>'
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
            var newExercise = new Exercise(exercise);
            var exerciseURL = '<li>'+ newExercise.mergeExerciseUrl() + ' </li>';

            $('ul#exerciseList').prepend(exerciseURL);
        });
    })
}

function showExercise() {
    $('.showExercise').click(function (e) {
        e.preventDefault();
        var id = $(this).attr('data_id');

        $.get('/exercises/' + id + '.json', function (data) {
            var exercise = new Exercise(data);
            var exerciseHTML = exercise.exerciseCard();
            $('#app-container').html(exerciseHTML);
        });
    })
}