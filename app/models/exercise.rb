class Exercise < ApplicationRecord
  BODY_PARTS = [
    'Shoulders', 'Chest', 'Arms', 'Biceps', 'Triceps', 'Forearm',
    'Abs', 'Back', 'Legs', 'Full Body'
  ].freeze

  has_many :exercise_workouts
  has_many :workouts, through: :exercise_workouts

  validates :name, presence: true
  validates_uniqueness_of :name, scope: :bodypart
  validates :bodypart, presence: true
  validates :bodypart, inclusion: { in: BODY_PARTS,
                                    message: '%{value} is not a valid' }

  def self.filter_body_part(body_part)
    if body_part.blank?
      order('name ASC')
    else
      where(bodypart: body_part).order('name ASC')
    end
  end

  def self.body_parts
    Exercise::BODY_PARTS
  end
end
