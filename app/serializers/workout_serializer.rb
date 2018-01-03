class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :date
  has_many :exercises #,through: :exercise_workouts, serializer: ExerciseWorkoutSerializer
end
