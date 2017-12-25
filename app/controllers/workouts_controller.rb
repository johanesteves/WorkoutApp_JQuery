class WorkoutsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_workout, only: [:show, :edit, :update, :destroy, :exercises]

  def index
    @workouts = current_user.workouts.sorted_by_date
    # current_user.workouts.all.order('date DESC').pluck('id')
    @workout = Workout.new
    respond_to do |format|
      format.html { render :index }
      format.json { render json: current_user.workouts.pluck('id') }
    end
  end

  def new
    @workout = Workout.new
    4.times{ |i| @workout.exercise_workouts.build }
    @exercise = @workout.exercises.build
  end

  def show
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @workout }
    end
  end

  def current_week
    @workouts = current_user.workouts.current_week.sorted_by_date
  end

  def create
    @workout = current_user.workouts.build(workout_params)
    if @workout.save
      flash[:success] = 'Workout created successfully.'
    else
      flash[:danger] = @workout.errors.full_messages.join('. ')
      return redirect_to new_workout_path if params[:workout][:exercise_ids]
    end
    redirect_to workouts_path
  end

  def edit; end

  def update
    if @workout.update(workout_params)
      flash[:success] = 'Workout updated successfully.'
      redirect_to workout_path(@workout)
    else
      render :edit
    end
  end

  def destroy
    if @workout.destroy
      flash[:success] = 'Workout deleted successfully.'
      redirect_to workouts_path
    else
      render :show
    end
  end

  def exercises
    @exercise = @workout.exercises.build
  end

  def reports
    @workouts = current_user.workouts.date_filter(params[:date_filter_beg], params[:date_filter_end])
    respond_to do |format|
      format.html { render :reports }
      format.json { render json: @workouts }
    end
  end

  private

  def workout_params
    params.require(:workout).permit(:name, :date, exercise_ids: [], exercises_attributes: [:name, :bodypart, :exercise_id, :reps, exercise_workout: [:reps]])
  end

  def set_workout
    @workout = current_user.workouts.find_by(id: params[:id])
  end
end
