class ExercisesController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update]
  before_action :set_exercise, only: [:show, :edit, :update]

  def index
    @exercises = Exercise.filter_body_part(params[:filter])
  end

  def show; end

  def new
    @exercise = Exercise.new
  end

  def create
    @exercise = Exercise.new(exercise_params)
    if @exercise.save
      redirect_to exercise_path(@exercise)
    else
      render :new
    end
  end

  def edit; end

  def update
    if @exercise.update(exercise_params)
      redirect_to exercise_path(@exercise)
    else
      render :edit
    end
  end

  private

  def exercise_params
    params.require(:exercise).permit(:name, :bodypart)
  end

  def set_exercise
    @exercise = Exercise.find(params[:id])
  end
end
