class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :date
  has_many :exercises
end
