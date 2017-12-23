class AddRepsToExerciseWorkouts < ActiveRecord::Migration[5.1]
  def change
    add_column :exercise_workouts, :reps, :integer
  end
end
