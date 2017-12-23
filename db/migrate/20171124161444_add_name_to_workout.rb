class AddNameToWorkout < ActiveRecord::Migration[5.1]
  def change
    add_column :workouts, :name, :string
  end
end
