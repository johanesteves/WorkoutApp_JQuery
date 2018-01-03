class ExercisesController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update]
  before_action :set_exercise, only: [:show, :edit, :update]

  def index
    @exercises = Exercise.filter_body_part(params[:filter])
    @exercise = Exercise.new
    #render json: @exercises
  end

  def show
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @exercise }
    end
  end

  def new
    @exercise = Exercise.new
  end

  def create
    @exercise = Exercise.new(exercise_params)
    if @exercise.save
      # @exercises = Exercise.filter_body_part("")
      render json: @exercise, status: 201
    else
      render json: { errors: @exercise.errors.full_messages }, status: 422
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
